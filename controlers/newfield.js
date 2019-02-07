const handleNewField = (db) => (req, res) =>{
    const { number, area, soil, soilclass, userid } = req.body;
    db('fields')
    .insert({
        number: number,
        area: area,
        soil: soil,
        soilclass: soilclass,
        userid: userid
    })
    .then(data => res.json(data))    
    .catch(err => {
        res.status(400).json(err);
    })
}

module.exports = {
    handleNewField: handleNewField
}