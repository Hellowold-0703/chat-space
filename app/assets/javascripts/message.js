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
      console.log(message)
      $(".messages").append(html);
      $(".message__text--image[src=null]").hide();
      $(".imessage__text--image:not([src=null])").show();
      $(".messages").animate({ scrollTop: $(".messages")[0].scrollHeight});
      $("form")[0].reset();
      $(".submit-btn").removeAttr("disabled");
    })
    .fail(function(error) {
      alert("メッセージを入力してください");
      $(".submit-btn").removeAttr("disabled");
    })
  });
});
