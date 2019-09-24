$(function() {

  function messageBuild(message){
    var html = `<div class="message">
                 <div class="chat">
                 <div class="chat__user">
                 ${message.name}
                 </div>
                 <div class="chat__datetime">
                 ${message.created_at}
                 </div>
                 </div>
                 <div class="message__text"></div>
                 <p class="message__text--body">
                 ${message.body}
                 </p>
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
      $(".input-box__text").val('');
      $(".submit-btn").removeAttr("disabled");
    })
    .fail(function(error) {
      alert("メッセージを入力してください");
    })
  })
});