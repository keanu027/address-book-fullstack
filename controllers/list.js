
function data(req, res) {
    const db = req.app.get('db');
    const {userId}=req.params;
    
    if(userId){
    db.address_book.find({userId: userId})
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

function del(req, res) {
    const db = req.app.get('db');
    const {userId}=req.params;
    
    if(userId){
    db.address_book.destroy({id: userId})
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
    data,del
}