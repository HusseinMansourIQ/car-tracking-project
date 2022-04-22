const mongoose = require('mongoose')
const locSchema = new mongoose.Schema({
    lan: {
        type: String,
        required: true
    },
    lon: {
        type: String,
        required: true
    },
    lanb: {
        type: String,
        required: true
    },
    lonb: {
        type: String,
        required: true
    },
    count: {
    },
    date:{
        type:Date
    }
})

let Loc = mongoose.model('loc', locSchema, 'loc')

module.exports = Loc
