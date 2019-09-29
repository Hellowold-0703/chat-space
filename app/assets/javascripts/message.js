$(function() {

  function messageBuild(message){
  if (message.image.url != null) {
    var html = '<div class="message" data-id=' + message.id +  '>' +
                  '<div class="chat">' +
                    '<div class="chat__user">' +
                      message.user_name +
                    '</div>' +
                    '<div class="chat__datetime">' +
                      message.created_at +
                    '</div>' +
                  '</div>' +
                  '<div class="message__text">' +
                    '<p class="message__text--body">' +
                      message.body +
                    '</p>' +
                    '<img src="' + message.image.url + '" class="message__text--image" >' +
                  '</div>' +
                '</div>'
    }else {
      var html = '<div class="message" data-id=' + message.id +  '>' +
      '<div class="chat">' +
        '<div class="chat__user">' +
          message.user_name +
        '</div>' +
        '<div class="chat__datetime">' +
          message.created_at +
        '</div>' +
      '</div>' +
      '<div class="message__text">' +
        '<p class="message__text--body">' +
          message.body +
        '</p>' +
      '</div>' +
    '</div>'
  } 
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
      $(".messages").animate({ scrollTop: $(".messages")[0].scrollHeight}, 'fast');
      $("form")[0].reset();
      $(".submit-btn").removeAttr("disabled");
    })
    .fail(function(error) {
      alert("メッセージを入力してください");
      $(".submit-btn").removeAttr("disabled");
    })
  });

  var reloadMessages = function() {
  if (document.URL.match('/messages')) {
    last_message_id = $(".message").data('id');
    $.ajax ({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log("success");
      var insertHTML = '';
      messages.forEach(function(message) {
      var html = insertHTML + messageBuild(message)
      $(".messages").append(html);

      $(".messages").animate({ scrollTop: $(".messages")[0].scrollHeight}, 'fast');
      });
    })
    .fail(function() {
      console.log("error");
    });
  }
} 
  setInterval(reloadMessages, 5000);
});
