const express = require("express")
const router = express.Router()
const Event = require('../models/Evnet')
const { check, validationResult } = require('express-validator/check')
const moment = require('moment');
moment().format();

// middleware to check if user is loogged in

isAuthenticated = (req,res,next) => {
    if (req.isAuthenticated()) return next()
    res.redirect('/users/login')
}
// route to home events
router.get('/', (req,res)=> {   

         res.render('map_view/map')

})


module.exports = router 