$(function() {

  var user_list = $("#user-search-result");

  function appendUsers(user) {
     var html = `<div class="chat-group-user clearfix">
                   <p class="chat-group-user__name">${user.name}</p>
                   <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
                 </div>`
    user_list.append(html);
  }

  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`
    user_list.append(html);
  }
   
  var group_users_list = $(".js-add-user");

  function appendGroupUsers(id, name) {
    var html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    group_users_list.append(html);
  }
  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    
    $.ajax({
      type: 'GET',
      url:'/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
      users.forEach(function(user) {
        appendUsers(user);
      });
      }
      else {
        appendErrMsgToHTML("一致するユーザーはいません");
      }
      $(".clearfix").on("click", ".chat-group-user__btn--add",function() {
        $(this).parent().remove();
        var id = $(this).attr("data-user-id");
        var name = $(this).attr("data-user-name");
        appendGroupUsers(id, name);
      });
      $(".js-add-user").on("click", ".chat-group-user__btn", function() {
        $(this).parent().remove();
      });
    })
    .fail(function() {
      alert("ユーザー検索に失敗しました");
    })
  });
  
  $(".chat-group-user__btn").on("click", function(){
    $(this).parent().remove();
  });
});