$(function() {

  function messageBuild(message){
    var html = `<div class="message" data-id=${message.id}>
                  <div class="chat">
                    <div class="chat__user">
                    ${message.user_name}
                    </div>
                    <div class="chat__datetime">
                    ${message.created_at}
                    </div>
                  </div>
                  <div class="message__text"></div>
                  <p class="message__text--body">
                  ${message.body}
                  </p>
                  <img class="message__text--image" src = ${message.image.url}>
                </div>`
    return html;
  }
  $("#new_message").on("submit", function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $("this").attr("action");
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message) {
      var html = messageBuild(message);
      $(".messages").append(html);
      $(".message__text--image[src=null]").hide();
      $(".messages").animate({ scrollTop: $(".messages")[0].scrollHeight});
      $("form")[0].reset();
      $(".submit-btn").removeAttr("disabled");
    })
    .fail(function(error) {
      alert("メッセージを入力してください");
      $(".submit-btn").removeAttr("disabled");
    })
  });

  if (document.URL.match('/messages')) {
  var reloadMessages = function() {
    last_message_id = $(".message").last().data('id');
    $.ajax ({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message) {
      insertHTML = messageBuild(message);
      $(".messages").append(insertHTML);
      $(".message__text--image[src=null]").hide();
      $(".messages").animate({ scrollTop: $(".messages")[0].scrollHeight});
      });
    })
    .fail(function() {
      alert("error");
    });
  }
  } 
  setInterval(reloadMessages, 5000);
});
