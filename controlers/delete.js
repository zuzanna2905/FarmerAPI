const handleDelete = (db) => (req, res) => {
    const { userid } = req.body;
    db('fields')
    .del()
    .where({
        id : req.params.id,
        userid : userid
    })
    .then(res.json({ message: 'ok' }))
    .catch(err => res.status(400).json(err))
}

module.exports = {
    handleDelete: handleDelete
}