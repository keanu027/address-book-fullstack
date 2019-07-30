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
            res.status(500).end();
        } else {
            argon2
            .hash(password)
            .then(hash => {
                return db.users.insert(
                {
                    username,password: hash,
                    user_profiles: [
                        {
                        userId: undefined, fname: fname, lname: lname,
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

module.exports ={
    create
}