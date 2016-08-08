/**
 * Created by tong on 16-8-8.
 */
'use strict';

function isLegalBarcode(barcodeString) {
  let barcode = barcodeString.slice(1, -1);
  barcode.split('').map((item)=>{
    return item.length === 5;
  });
  return /^\| [:| ]+\|$/.test(barcodeString);
}