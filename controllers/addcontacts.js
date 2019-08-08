
function create(req, res) {
    const db = req.app.get('db');
    const { userId,fname, lname, email, city, province, postal_code, country,
        home_phone, mobile_phone, work_phone } = req.body;
        
    db.contacts.insert({
        fname, lname, email, city, province, postal_code, country,
        home_phone, mobile_phone, work_phone,
        address_book: [
            {
                user_id:userId, contact_id: undefined,
            },
        ],
    },
    {
        deepInsert: true,
    }
    ,{
        fields: ['id', 'fname','lname','email','city','province','postal_code','home_phone','mobile_phone','work_phone'], 
    })
    .then(book =>{
          res.status(201).json(book)
        
    })
    .catch(err => {
          res.status(200).json({ error: err.message });
          console.error(err);
          res.status(500).end();
      });
}
function creategroupname(req, res) {
    const db = req.app.get('db');
    const { gname } = req.body;
        
    db.group_names.insert({
        name: gname
    })
    .then(book =>{
          res.status(201).json(book)
        
    })
    .catch(err => {
          res.status(200).json({ error: err.message });
          console.error(err);
          res.status(500).end();
      });
}

function creategrouplist(req, res) {
    const db = req.app.get('db');
    const { userId,contactId,groupId} = req.body;
        
    db.groups.insert({
        group_id: groupId,user_id:userId,contact_id:contactId,
    })
    .then(book =>{
          res.status(201).json(book)
        
    })
    .catch(err => {
          res.status(200).json({ error: err.message });
          console.error(err);
          res.status(500).end();
      });
}
module.exports ={
    create,creategroupname,creategrouplist
}