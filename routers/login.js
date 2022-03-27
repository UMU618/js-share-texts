/**
 * @author UMU618 <umu618@hotmail.com>
 * @copyright UMU618 2022
 * @description Use block-always-using-brace npm-coding-style.
 */

'use strict'

const conf = require('../conf')

const express = require('express')
const router = express.Router()
const path = require('path')

router.route(["/"])
  .get((req, res, next) => {
    res.sendFile(path.join(__dirname, '../views', 'login.html'))
  })
  .post((req, res, next) => {
    if (req.body.secret === conf.secret) {
      req.session.secret = req.body.secret
      res.redirect('/')
    } else {
      res.end('Wrong secret!')
    }
  })

module.exports = router
