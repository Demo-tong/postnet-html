/**
 * Created by tong on 16-8-6.
 */
'use strict';
//| :::|| ::|:| ::||: :|::| :|:|: :::|| ::|:| ::||: :|::| :|:|: |
function sendRequest(transform, input) {
  $.get('/express/' + transform + '?cmd=' + input)
          .done(function (data) {
            if (data.error === '') {
              $('#result-info').html(data.data).css('visibility', 'visible');
              $(`<tr><td>${input}</td><td>${data.data}</td></tr>`).insertAfter($('tr.table-head'));
            } else {
              $('#error-message').html(data.error).css('visibility', 'visible');
            }
          })
          .fail(function (error) {
            $('#error-message').html(error.error).css('visibility', 'visible');
          })
}

$(document).ready(function () {
  $('#button-ok').click(function () {
    $('#result-info').html('');
    $('#error-message').html('');

    let input = $('input#input-code').val();
    if (input === '') {
      $('#error-message').html("请输入您需要转换的数据");
    } else {
      let transform = $("input[type='radio']:checked").val();
      sendRequest(transform, input);
    }
  });

  $('#input-code').focus(function () {

    $('#error-message').css("visibility", "hidden");
    $('#result-info').css('visibility', 'hidden');
  });
});