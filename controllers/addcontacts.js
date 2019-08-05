
function create(req, res) {
    const db = req.app.get('db');
    const { userId,fname, lname, email, city, province, postal_code, country,
        home_phone, mobile_phone, work_phone } = req.body;
        
    db.contacts.insert({
        fname, lname, email, city, province, postal_code, country,
        home_phone, mobile_phone, work_phone,
        
    },{
        fields: ['id', 'fname','lname','email','city','province','postal_code','home_phone','mobile_phone','work_phone'], 
    })
    .then(book =>{
        db.address_book.insert({
            userId:userId,contactId:book.id
        },{
            fields: ['id', 'userId','contactId'], 
        })
        .then(data =>{
            res.status(201).json({book,data})
        })
        .catch(err => {
              res.status(200).json({ error: err.message });
              console.error(err);
              res.status(500).end();
          });
        
        
    })
    .catch(err => {
          res.status(200).json({ error: err.message });
          console.error(err);
          res.status(500).end();
      });
}

module.exports ={
    create,
}