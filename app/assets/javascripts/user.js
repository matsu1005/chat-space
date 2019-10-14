$(document).ready(function(){

  var search_list = $("#user-search-result");
  var selected_list = $(".chat-group-users");

  function add_User_id(user_ids){
    $('.chat-group-user.clearfix.js-chat-member').each(function(){
      var user_id = $(this).attr('id');
      user_ids.push(user_id);
    });
    return user_ids;
  }

  function appendUser(user){
    var html =`<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id= ${user.id} data-user-name=${user.name}>追加</div>
              </div>`
    search_list.append(html);
  }

  function appendErrUserToHTML() {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">一致するユーザーが見つかりません</p>
                </div>`
    search_list.append(html);
  }

  function addUser(id,name){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='${ id }'>
                  <input name='group[user_ids][]' type='hidden' value='${ id }'>
                  <p class='chat-group-user__name'>${ name }</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    selected_list.append(html);
  }

    function resetHTML(){
      $("#user-search-result").empty();
}

  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();
    var user_ids =[];
    add_User_id(user_ids);
    if (input!=""){

      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input, user_ids: user_ids },
        dataType: 'json'
      })

      .done(function(users){
        resetHTML()
        if ( users.length !== 0 ) {
          users.forEach(function(user){
            appendUser(user);
          });
        }
        else {
          appendErrUserToHTML()
        }
      })
      .fail(function(){
        alert('ユーザー検索に失敗しました');
      });
    }
    else{
      resetHTML()
    }
  });
  
  $("#user-search-result").on("click", `.user-search-add`, function() {
    var id = $(this).attr('data-user-id');
    var name = $(this).attr('data-user-name');
    console.log(id);
    addUser(id,name);
    $(this).parent().remove();
  });

  $(document).on('click', '.chat-group-user__btn--remove', function () {
    $(this).parent().remove();
  });
});