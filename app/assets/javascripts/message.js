$(function(){
  function buildHTML(message) {
    var content = message.text ? `${ message.text }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html =`<div class="message", data-id= "${message.id}"}>
                    <div class="message__upper-info">
                      <p class="message__upper-info__talker">
                      ${message.user_name}
                      </p>
                      <p class="message__upper-info__date">
                      ${message.date}
                      </p>
                    </div>
                    <p class="message__text">
                    ${content}
                    </p>
                  ${img}
                </div>`
  return html;
  }

  $(".new_message").on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $("form")[0].reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(data){
      $('.submit-btn').prop('disabled', false);
    })
  })

  var reloadMessages = function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data("id")
      $.ajax({
        url: "api/messages",
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages){
        var insertHTML = ''
        messages.forEach(function (message){
        insertHTML = buildHTML(message);
        $('.messages').append(insertHTML)
        })
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight},'fast');
      })
      .fail(function(){
        alert("自動更新に失敗しました")
      })
    }
  }
  setInterval(reloadMessages, 5000);
});