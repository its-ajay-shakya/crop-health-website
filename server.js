const express=require('express')
const app=express()
const mongoose = require('mongoose')
const connectDB=require('./config/database')
const homeRoutes=require('./routes/home')
const newsRoutes=require('./routes/news')
const monitorRoutes=require('./routes/monitor')
// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const { urlencoded } = require('body-parser')
const passport = require('passport')
//Note Session data is not saved in the cookie itself, 
// just the session ID. Session data is stored server-side. 

const session = require('express-session')
// MongoDB session store for Connect and Express written in Typescript.

const MongoStore = require('connect-mongo')
// Flash is an extension of connect-flash with the ability to 
// define a flash message and render it without redirecting the request.
const flash = require('express-flash')
// Morgan is a powerful tool that allows you to generate unique logging formats for your 
// Express.js applications
const logger = require('morgan')

require('./config/passport')(passport)


require('dotenv').config({path:'./config/.env'})
connectDB()
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(logger('dev'))

let store = new MongoStore({
  mongoUrl: process.env.DB_STRING,
  collection: "sessions"
});

app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      // so we are gonna have our session info in our mongo database
      // store: new MongoStore({ mongooseConnection: mongoose.connection }),
      store:store,
    })
  )
  

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use('/',homeRoutes)
app.use('/news',newsRoutes)
app.use('/monitor',monitorRoutes)

let PORT=8000
app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`)
})
