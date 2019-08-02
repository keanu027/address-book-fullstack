
const express = require('express');
const massive = require('massive');
const path = require('path');
const signup = require('../controllers/signup.js');
const contacts = require('../controllers/addcontacts.js');
const list = require('../controllers/list.js');
const secret = require('../secret.js');
const jwt = require('jsonwebtoken');
const cors = require("cors");

massive({
  host: 'localhost',
  port: 5432,
  database: 'fullstacks',
  user: 'postgres',
  password: 'fullstacks',
}).then(db => {
  const app = express();

  app.set('db', db);
  app.use(cors());
  app.use(express.json());
  
 /* app.get('/debug',function(req,res){
    res.status(200).json(req.app.get('db'))
  }) */

  app.post('/api/registration',signup.create)
  app.post('/api/login',signup.login)

  app.post('/home',contacts.create)

  app.get('/create/:userId',list.data)

  app.delete('/delete/:userId',list.del)


  app.get('/api/protected/data',function(req, res){
    if (!req.headers.authorization) {
        return res.status(401).end();
      }
     
      try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, secret); 
        res.status(200).json({ data: 'here is the protected data' });
      } catch (err) {
        console.error(err);
        res.status(401).end();
      }
})
  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}); 
