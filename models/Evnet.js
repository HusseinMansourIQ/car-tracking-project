const mongoose = require('mongoose')
const locSchema = new mongoose.Schema({
    lan: {
        type: String,
        required: true
    },
    lon: {
        type: String,
        required: true
    }
})

let Loc = mongoose.model('loc', locSchema, 'loc')

module.exports = Loc
