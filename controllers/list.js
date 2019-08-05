
function data(req, res) {
    const db = req.app.get('db');
    const {userId}=req.params;
    
    if(userId){
    /*
    db.address_book.find({userId: userId})
    .then(book =>{
        book.map(data =>{
            db.contacts.find({id: data.contactId})
            .then(contact_data =>
                res.status(201).json({contact_data,data})
                ).catch(err => {
                    res.status(200).json({ error: err.message });
                    console.error(err);
                    res.status(500).end();
                });
        })

        //res.status(201).json({book})
    })
    .catch(err => {
          res.status(200).json({ error: err.message });
          console.error(err);
          res.status(500).end();
      }); */
    db.address_book.find({userId: userId})
    .then(book => res.status(201).json(book)
    )

    } else {
        res.status(201).json('error ung params') 
    }

}

function getlist(req, res) {
    const db = req.app.get('db');
    const {userId}=req.params;
    
    if(userId){

    db.contacts.find({id: userId})
    .then(list => res.status(201).json(list)
    )

    } else {
        res.status(201).json('error ung params') 
    }

}

function persondata(req, res) {
    const db = req.app.get('db');
    const {id}=req.params;
    
    if(id){
    db.contacts.find({id: id})
    .then(persondatabase =>{
        
        res.status(201).json(persondatabase)

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

function update_persondata(req, res) {
    const db = req.app.get('db');
    const {id}=req.params;
    const { fname,lname,email,postal_code,city,
        province,country, home_phone, mobile_phone, work_phone} =req.body;
    
    if(id){
    db.contacts
    .update(
        {id: id},
        {
            fname,lname,email,postal_code,city,
            province,country, home_phone, mobile_phone, work_phone
        })
    .then(persondatabase =>{
        res.status(201).json(persondatabase)
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

function del(req, res) {
    const db = req.app.get('db');
    const {userId}=req.params;
    
    if(userId){
    db.address_book.destroy({contactId: userId})
    .then(book =>{
        db.contacts.destroy({id: userId}).then(data =>{
            res.status(201).json({book,data})
        })
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
    data,del,persondata,update_persondata,getlist
}