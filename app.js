const express = require("express")
const app = express()
const db = require('./config/database')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const passportSetup = require('./config/passport-setup')
const loc = require ('./models/Evnet.js')
let cors = require("cors");
app.use(cors());
// bring ejs template

app.set('view engine', 'ejs')
// bring body parser 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//bring static

app.use(express.static('public'))
app.use(express.static('node_modules'))
// session and flash config .
app.use(session({
    secret: 'lorem ipsum',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60000 * 15}
}))
app.use(flash())
// bring passport 
app.use(passport.initialize())
app.use(passport.session())

app.get('/getloc', (req,res)=> {

    loc.find({},(err,loc)=>{
        res.json(loc)
    })
})
app.get('/getloc/lan/:lan/lon/:lon/lanb/:lanb/lonb/:lonb', async(req,res)=> {

   //var count= loc.find({}, (err,doc)=> {
    var cnt = await loc.countDocuments({},(err,cnt)=>{ })
        console.log(cnt)
        var lan = req.params.lan.toString()
        var lon = req.params.lon.toString()
        var lanb = req.params.lanb.toString()
        var lonb = req.params.lonb.toString()
        let newitm = new loc({
            loc: [lan,lon],
            lanb: lanb,
            lonb: lonb,
            count:parseInt(cnt) +1,
            date:Date.now()

        })
            newitm.save((err) => {
                if (!err) {
                    console.log('itm added ')
                } else {
                    console.log(err)
                }

            })
    

    })
app.get('/deleteall',(req,res)=>{

    loc.remove({}, function(err, result){
        // handle the error if any
        if (err) throw err;
        console.log("Collection is deleted! "+result);
    });


})
app.post('/getlocD',(req,res)=>{
    
    loc.aggregate([{"$match":{"$expr":{"$gte":["$date",{"$dateFromString":{"dateString":req.body.start}}]},"$expr":{"$lt":["$date",{"$dateFromString":{"dateString":req.body.end}}]}}}
],(err,loc)=>{
    res.render('map_view/map',{loc:loc})
})
})


// bring events routes

const map = require('./routes/main')
app.use('/map', map)

// bring user routes
const users = require('./routes/user-routes')
app.use('/users', users)
// listen to port 3000

app.listen(process.env.PORT || 3000, ()=> {

    console.log(' app is wokring on port 3000')
})
