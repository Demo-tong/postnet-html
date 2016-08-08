/**
 * Created by tong on 16-8-2.
 */
'use strict';

const express = require('express');
const BarcodeToPostcode = require('./transfomer/BarcodeToPostcode');
const PostcodeToBarcode = require('./transfomer/PostcodeToBarcode');
//const bodyParser = require('body-parser');
const cors = require('cors');

let app = express();
let barcodeToPostcode = new BarcodeToPostcode();
let postcodeToBarcode = new PostcodeToBarcode();

//app.use(bodyParser.urlencoded({extend: true}));
app.use(cors());

app.get('/express/to-Zipcode', function (req, res) {
  res.send(barcodeToPostcode.transferToPostCode(req.query.cmd));
});

app.get('/express/to-Barcode', function (req, res) {
  res.send(postcodeToBarcode.transferToBarcode(req.query.cmd));
});

app.listen(3000, function () {
  console.log("listening on port 3000");
});