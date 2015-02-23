$(function(){
// YOUR CODE HERE:
// var message = "This is a test. Of REST. The best."

// var postMessages = function() {
//   $.ajax({
//     // always use this url
//     url: 'https://api.parse.com/1/classes/chatterbox',
//     type: 'POST',
//     data: JSON.stringify(message),
//     contentType: 'application/json',
//     success: function (data) {
//       console.log('chatterbox: Message sent');
//     },
//     error: function (data) {
//       // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//       console.error('chatterbox: Failed to send message');
//     }
//   });
// };
var currentRoom = "";
var app = {};
var friends = [];
app.init = function(){};
app.send = function(message){
  var dataMessage = {
    username : window.location.search.slice(10),
    text : message,
    roomname : currentRoom
  };
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(dataMessage),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};
app.fetch = function(room){

  var messageIds = [];
  var rooms = [];
  if (room) {
    $('.current-room-name').append("<h2> <i class='fa fa-angle-right'></i>" + currentRoom + "</h2>");
  }
  setInterval(function(){
    $.ajax({
        // always use this url
      url: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        for (var i = data.results.length-1; i >= 0; i--){
          if (!_.contains(rooms, data.results[i].roomname)){
            rooms.push(data.results[i].roomname);
            // console.log(rooms);
            $("#roomList").empty();
            for (var j = 0; j < rooms.length; j++){
                $("#roomList").append("<option value=" + rooms[j] + ">" + rooms[j] + "</option>");
            }
          }
          if (data.results[i].roomname === room || room === undefined) {
            if (!_.contains( messageIds, data.results[i].objectId )){
              var msg = _.escape(data.results[i].text);
              var user = _.escape(data.results[i].username);
              if (_.contains(friends, user)) {
                $(".messages").prepend("<li>" + "<span class='user friend'>" + user + "</span>" + "<span class='message'>" + msg + "</span>" + "</li>");
              } else {
                $(".messages").prepend("<li>" + "<span class='user'>" + user + "</span>" + "<span class='message'>" + msg + "</span>" + "</li>");
              }
              messageIds.push(data.results[i].objectId);

            }
          }
        }
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to get messages.');
      }
    });
  }, 500);
};

app.fetch();

$('.messages').on("click", ".user", function() {
  // var $(this).text() = $(this).text();
  if (_.contains(friends, $(this).text())){
    friends = _.without(friends, $(this).text());
    // Traverse DOM and remove class from matching elements
    app.fetch();
  } else {
    friends.push($(this).text());
    // Traverse Dom and add class
    app.fetch();
  }
  console.log(friends);
  console.log(friends[0]);
});

// POST
$('.submit-btn').on('click', function() {
  app.send($(".submission-input").val());
  $('.submission-input').val('');
});

$('.all-rooms').on('click', function() {
  app.fetch();
  $('.messages').empty();
  $('.current-room-name').empty();
  console.log("test");
});

// Fetches room name based on change in dropdown
$('#roomList').change(function(){
  $('.messages').empty();
  $('.current-room-name').empty();
  currentRoom = $(this).val();
  app.fetch($(this).val());
});

// Add/Remove friends
// $('.messages').find("li").on('click', function() {
//   console.log("testing");
//   // if (_.contains(app.friends, $(this).val())){
//   //   // if friend is already in array, remove friend
//   //   app.friends = _.without(app.friends, $(this).val());

//   // } else {
//   //   // else add friend
//   //   app.friends.push($(this).val());
//   // }
// });


// Fin.
});
