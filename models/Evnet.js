const mongoose = require('mongoose')
const locSchema = new mongoose.Schema({
    loc: {
        type: Array,
        required: true
    },

    locb: {
        type: Array,
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
