
const express = require('express');
const massive = require('massive');
const path = require('path');
const signup = require('../controllers/signup.js');
const contacts = require('../controllers/addcontacts.js');
const list = require('../controllers/list.js');
const sort = require('../controllers/sort.js');
const group = require('../controllers/group.js');
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
  app.post('/creategroup',contacts.creategroupname)
  app.post('/creategrouplist',contacts.creategrouplist)

  app.get('/create/:userId',list.data)
  app.get('/getlist/:userId',list.getlist)
  app.get('/data/:id',list.persondata)
  app.patch('/update/:id',list.update_persondata)
  app.delete('/delete/:userId',list.del)

  app.get('/sortascfname/:userId',sort.ascfname)
  app.get('/sortdescfname/:userId',sort.descfname)
  app.get('/sortasclname/:userId',sort.asclname)
  app.get('/sortdesclname/:userId',sort.desclname)

  app.get('/sortascgroupasc/:userId',sort.groupasc)
  app.get('/sortascgroupdesc/:userId',sort.groupdesc)

  app.get('/getgroup',group.data)
  app.get('/deletegroupname/:userId',group.del)
  app.delete('/deletegrouplist/:userId',group.dellist)
  app.post('/grouplist',group.grouplist)

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
