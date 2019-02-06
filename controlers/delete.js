const handleDelete = (db) => (req, res) => {
    let i = 0;
    database.fields.forEach(field => {
        if (field.id === req.params.id) {
            i = database.fields.indexOf(field);
            database.fields.splice(i,1);
            return res.json({ message: 'ok' });
        }
    }), function (err) {
        if (err) return res.send(err);
    }
    res.json({ message: 'no data' });
}


module.exports = {
    handleDelete: handleDelete
}