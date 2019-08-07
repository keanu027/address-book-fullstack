
function ascfname(req, res) {
    const db = req.app.get('db');
    const {userId}=req.params;
    
    if(userId){
     db.query(`select * from address_book,contacts 
     where address_book.contact_id = contacts.id and address_book.user_id = ${userId}  order by contacts.fname asc`)
     .then(list => res.status(201).json(list) )
    } else {
        res.status(201).json('error ung params') 
    }

}

function descfname(req, res) {
    const db = req.app.get('db');
    const {userId}=req.params;
    
    if(userId){
     db.query(`select * from address_book,contacts 
     where address_book.contact_id = contacts.id and address_book.user_id = ${userId}  order by contacts.fname desc`)
     .then(list => res.status(201).json(list) )
    } else {
        res.status(201).json('error ung params') 
    }

}
function asclname(req, res) {
    const db = req.app.get('db');
    const {userId}=req.params;
    
    if(userId){
     db.query(`select * from address_book,contacts 
     where address_book.contact_id = contacts.id and address_book.user_id = ${userId}  order by contacts.lname asc`)
     .then(list => res.status(201).json(list) )
    } else {
        res.status(201).json('error ung params') 
    }

}

function desclname(req, res) {
    const db = req.app.get('db');
    const {userId}=req.params;
    
    if(userId){
     db.query(`select * from address_book,contacts 
     where address_book.contact_id = contacts.id and address_book.user_id = ${userId}  order by contacts.lname desc`)
     .then(list => res.status(201).json(list) )
    } else {
        res.status(201).json('error ung params') 
    }

}



module.exports ={
    ascfname,descfname,asclname,desclname
}