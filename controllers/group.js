function data(req, res) {
    const db = req.app.get('db');
        /* db.query(`select group_names.name,
        groups.group_id, groups.user_id, groups.contact_id, 
        contacts.fname, contacts.lname, contacts.email, contacts.city, contacts.province, contacts.postal_code, contacts.country,
        contacts.home_phone, contacts.mobile_phone, contacts.work_phone
        from group_names,groups,contacts 
        where contacts.id = groups.contact_id and groups.group_id = group_names.id and groups.user_id = ${userId} order by contacts.fname asc `)*/
        
        //db.group_names.find()
        
        //db.query(`select DISTINCT name from groups order by name asc`)
        db.query(`select name from groups group by name`)
        .then(book =>
            res.status(201).json(book)
        )
        .catch(err => {
            res.status(200).json({ error: err.message });
            console.error(err);
            res.status(500).end();
        });
}

function del(req, res) {
    const db = req.app.get('db');
    const {userId}=req.params;
    
    if(userId){
    db.query(`DELETE FROM groups WHERE name='${userId}' `)
    .then(book =>{
            res.status(201).json(book)
    })
    .catch(err => {
          res.status(200).json({ error: err.message });
          console.error(err);
          res.status(500).end();
      });
    } else {
        res.status(201).json('error ung params') 
    }

}

function dellist(req, res) {
    const db = req.app.get('db');
    const {userId}=req.params;
    
    if(userId){
    db.group_names.destroy({group_id: userId})
    .then(book =>{
            res.status(201).json(book)
    })
    .catch(err => {
          res.status(200).json({ error: err.message });
          console.error(err);
          res.status(500).end();
      });
    } else {
        res.status(201).json('error ung params') 
    }

}

function grouplist(req, res) {
    const db = req.app.get('db');
    const { props,userId}=req.body;
    
    if(userId){

    db.query(` SELECT contacts.fname,contacts.lname,contacts.mobile_phone,groups.name 
       FROM groups,contacts WHERE groups.user_id = ${userId} and groups.name= '${props}' and groups.contact_id =contacts.id order by contacts.fname asc;`)
    .then(book =>{
            res.status(201).json(book)
    })
    .catch(err => {
          res.status(200).json({ error: err.message });
          console.error(err);
          res.status(500).end();
      });
    } else {
        res.status(201).json('error ung params') 
    }

}
module.exports ={
    data,del,dellist,grouplist
}