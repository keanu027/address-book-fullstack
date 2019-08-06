    const argon2 = require('argon2');
    const jwt = require('jsonwebtoken');
    const secret = require('../secret.js');

    function create(req, res) {
    const db = req.app.get('db');
  
    const { username, password,fname,lname } = req.body;

    db.users.findOne({
        username: username
    }).then( data =>{
        if(data){
            res.status(201).json({error:"Already have Account"});
        } else {
            argon2
            .hash(password)
            .then(hash => {
                return db.users.insert(
                {
                    username,password: hash,
                    user_profiles: [
                        {
                        user_id: undefined, fname: fname, lname: lname,
                        },
                    ],
                },
                {
                    deepInsert: true,
                },
                {
                    fields: ['id', 'username'], 
                }
                );
            })
            .then(user => {
                const token = jwt.sign({ userId: user.id }, secret); 
                res.status(201).json({ ...user, token });
            })
            .catch(err => {
                console.error(err);
                res.status(500).end();
            });
        }
    })
  }

  function login(req, res) {
    const db = req.app.get('db');
    const { username, password } = req.body;
  
    db.users
      .findOne(
        {
          username,
        },
        {
          fields: ['id', 'username', 'password'],
        }
      )
      .then(user => {
        if (!user) {
          throw new Error('Invalid username');
        }

        return argon2.verify(user.password, password).then(valid => {
          if (!valid) {
            throw new Error('Incorrect password');
          }
  
          const token = jwt.sign({ userId: user.id }, secret);
          delete user.password; 
          res.status(200).json({ ...user, token });
        });
      })
      .catch(err => {
        if (
          ['Invalid username', 'Incorrect password'].includes(err.message)
        ) {
          res.status(200).json({ error: err.message });
        } else {
          console.error(err);
          res.status(500).end();
        }
      });
  }
module.exports ={
    create,
    login
}