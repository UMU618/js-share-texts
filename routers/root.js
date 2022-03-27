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
    if (req.session.secret === conf.secret) {
     res.sendFile(path.join(__dirname, '../views', 'index.html'))
    } else {
      res.sendFile(path.join(__dirname, '../views', 'login.html'))
    }
  })

module.exports = router
