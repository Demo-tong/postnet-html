/**
 * Created by tong on 16-8-2.
 */
'use strict';

const express = require('express');
const BarcodeToPostcode = require('./transfomer/BarcodeToPostcode');
const PostcodeToBarcode = require('./transfomer/PostcodeToBarcode');

let app = express();
let barcodeToPostcode = new BarcodeToPostcode();
let postcodeToBarcode = new PostcodeToBarcode();

app.use(express.static('postnet'));

app.get('/express/toZipcode', function (req, res) {
  res.send(barcodeToPostcode.transferToPostCode(req.query.cmd));
});

app.get('/express/toBarcode', function (req, res) {
  res.send(postcodeToBarcode.transferToBarcode(req.query.cmd));
});

app.listen(3000, function () {
  console.log("listening on port 3000");
});

module.exports = app;