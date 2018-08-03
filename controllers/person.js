// models
const Person = require('../models/Person')

exports.get_persons = (req, res, next) => {
    Person.find()
    .exec()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
}
