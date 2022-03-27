/**
 * @author UMU618 <umu618@hotmail.com>
 * @copyright MEET.ONE 2019
 * @description Use block-always-using-brace npm-coding-style.
 */

'use strict'

const conf = require('../conf')

const crypto = require("crypto")
const express = require('express')
const router = express.Router()

function htmlEncode(str) {
  var s = ""
  if (str.length == 0) return ""
  s = str.replace(/&/g, "&amp;")
  s = s.replace(/</g, "&lt;")
  s = s.replace(/>/g, "&gt;")
  s = s.replace(/ /g, "&nbsp;")
  s = s.replace(/\'/g, "&#39;")
  s = s.replace(/\"/g, "&quot;")
  s = s.replace(/\n/g, "<br/>")
  return s;
}

router.route(["/"])
  .get((req, res, next) => {
    if (req.session.secret === conf.secret
      || (req.query.secret
        && crypto.createHash("sha256").update(conf.secret).digest("hex")
        == req.query.secret)) {
      let result = ''
      for (let i = 0; i < global.sharedTexts.length; ++i) {
        result += '<div id="line_' + i + '" width="100%"><button onclick="setText(' + i
          + ')">Set</button><textarea id="text_' + i + '" cols="24" rows="3">'
          + global.sharedTexts[i] + '</textarea><button onclick="removeText('
          + i + ')">Remove</button></div>'
      }
      res.end(result)
    } else {
      res.end('Not logged in yet!')
    }
  })
  .post((req, res, next) => {
    if (req.session.secret === conf.secret) {
      if (req.body && req.body.action) {
        switch (req.body.action) {
          case 'add':
            global.sharedTexts.push(req.body.text)
            //console.log('Add', req.body.text)
            break
          case 'set':
            if (req.body.id) {
              global.sharedTexts[req.body.id] = req.body.text
              console.log('Set', req.body.id, 'as', req.body.text)
            }
            break
          case 'remove':
            if (req.body.id) {
              let removedItem = global.sharedTexts.splice(req.body.id, 1)
              console.log('Remove', removedItem)
            }
            break
        }
        res.end('{}')
        return
      }
    }
    res.redirect('/')
  })

module.exports = router
