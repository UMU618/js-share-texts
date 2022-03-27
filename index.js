#!/usr/bin/env node

/**
 * @author UMU618 <umu618@hotmail.com>
 * @copyright UMU618 2022
 * @description Use block-always-using-brace npm-coding-style.
 */

'use strict'

const conf = require('./conf')

const express = require('express')
const app = express()
const session = require('express-session')
app.options("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  res.send(200)
})
app.use(session({
  secret: 'secret'
  , resave: true
  , saveUninitialized: false
  , cookie: {
    maxAge : 5 * 60 * 1000
  }
}))

// only if you're behind a reverse proxy
app.enable('trust proxy')

const compression = require('compression')
app.use(compression())

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  req.setEncoding('utf8')
  res.setHeader('X-Powered-By', 'UMU618.com')

  next()
})

const path = require('path')
app.use(express.static(path.join(__dirname, 'static')))

app.use('/', require('./routers/root'))
app.use('/login', require('./routers/login'))
app.use('/texts', require('./routers/texts'))

app.use('/*', function (req, res, next) {
  console.log('Unhandled:', req.originalUrl)
  next()
})

app.use(function(err, req, res, next) {
  res.status(500)
  res.end(JSON.stringify(err))
})

global.sharedTexts = []

app.listen(conf.port)
