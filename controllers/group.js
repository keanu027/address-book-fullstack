function data(req, res) {
    const db = req.app.get('db');
    const {userId}=req.params;
    
    if(userId){
        db.query(`select group_names.name,
        groups.group_id, groups.user_id, groups.contact_id, 
        contacts.fname, contacts.lname, contacts.email, contacts.city, contacts.province, contacts.postal_code, contacts.country,
        contacts.home_phone, contacts.mobile_phone, contacts.work_phone
        from group_names,groups,contacts 
        where contacts.id = groups.contact_id and groups.group_id = group_names.id and groups.user_id = ${userId} order by contacts.fname asc `)
        .then(book =>
            res.status(201).json(book)
        )
    } else {
        res.status(201).json('error  params') 
    }

}
module.exports ={
    data
}