var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const hash = require('password-hash')
const jwt = require('jsonwebtoken')

mongoose.connect('mongodb://localhost/cms')
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('Database connected')
})

var index = require('./routes/index')
var users = require('./routes/users')
const apiUser = require('./routes/usersRoutes')
const apiData = require('./routes/datasRoutes')
const apiDataDate = require('./routes/dataDatesRoutes')

const usersModel = require('./models/usersModel')

var app = express()

passport.use('login', new LocalStrategy(
  function (username, password, done) {
    usersModel.findOne({ username: username }, function (err, user) {
      console.log(user)
      if (!user) {
        done()
      } else {
        if (hash.verify(password, user.password)) {
          done(null, user)
        } else {
          done()
        }
      }
    })
  }
))

passport.serializeUser(function (user, cb) {
  cb(null, user)
})
app.use(passport.initialize())
app.use(passport.session())

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

app.use('/', index)
app.use('/users', users)
app.use('/api/users', apiUser)
app.use('/api/datas', apiData)
app.use('/api/datadates', apiDataDate)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
})

module.exports = app
