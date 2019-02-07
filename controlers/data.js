const handleData = (db) => (req, res) =>{
    const { id } = req.body;
    db('fields')
    .where('userid', '=', id)
    .select('*')
    .then(data => {
        res.json(data);
    })    
    .catch(err => {
        res.status(400).json(err);
    })
}

module.exports = {
    handleData: handleData
}