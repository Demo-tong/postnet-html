/**
 * Created by tong on 16-8-6.
 */
'use strict';

function isLegalBarcode(barcodeString) {
  return /^\| [:| ]+\|$/.test(barcodeString);
}

function isFormatString(postCodeString) {
  let result = /^\d{5}$|^\d{9}$|^\d{5}-\d{4}$/.test(postCodeString);
  if (!result) {
    result = "the letter or the length of number is illegal(the length should be 5/9/10 contain' - ')";
  }

  return result;
}

function sendRequest(input) {
  $.get('http://localhost:3000/express/to-Zipcode?cmd=' + input)
          .done(function (data) {
            if (data.error == '') {
              $('#result-info').html(data.data).css('visibility', 'visible');
            } else {
              $('#error-message').html(data.error).css('visibility', 'visible');
            }
          })
          .fail(function (error) {
            $('#error-message').html(error.error).css('visibility', 'visible');
          })
}

function handleCode($input) {
  let $transform = $("input[type='radio']:checked").val();
  if ($transform === 'to-Zipcode') {
    alert("to-Zipcode");
    let checkResult = isLegalBarcode($input);
    if (checkResult) {
      sendRequest($input);
    } else {
      $('#error-message').html("error input(only '|'':'' 'can be accepted and ' 'is must)");
    }
  } else {
    alert("to-Barcode");
    let checkResult = isFormatString($input);
    if (checkResult === true) {
      $.get('http://localhost:3000/express/to-Barcode?cmd=' + $input)
              .done(function (data) {
                if (data.error == '') {
                  $('#result-info').html(data.data).css('visibility', 'visible');
                } else {
                  $('#error-message').html(data.error).css('visibility', 'visible');
                }
              })
              .fail(function (error) {
                $('#error-message').html(error.error).css('visibility', 'visible');
              })
    } else {
      $('#error-message').html(checkResult).css('visibility', 'visible');
    }
  }
}

$(document).ready(function () {
  $('#button-ok').click(function () {
    let input = $('input#input-code').val();

    if (input === '') {
      $('#error-message').html("请输入您需要转换的数据");
    } else {
      handleCode(input);
    }
  });
  
  $('#input-code').focus(function () {
    $('#error-message').css("visibility", "hidden");
    $('#result-info').css('visibility', 'hidden');
  });
})
;
