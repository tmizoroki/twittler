$(document).ready(function(){

  var numFollowing = Object.keys(streams.users).length.toString();
  $('.following-count').text(numFollowing);

  var $twits = $('.display-twits');
  $twits.html('');

  /*var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div class="twit-body group"></div>');
    var $profilepic = $('<img src=\"assets/images/' + tweet.user + '.jpg\">');
    $profilepic.appendTo($tweet);
    var $user = $('<div class="username"></div>');
    $user.text('@' + tweet.user);
    var $time = $('<div class="date">' + tweet.created_at + '</div>');
    var $message = $('<div class="user-message"></div>');
    $message.text(tweet.message);
    $user.appendTo($tweet);
    $time.appendTo($tweet);
    $message.appendTo($tweet);
    $tweet.appendTo($twits);
    index -= 1;
  }*/

  var lastLength = 0;

  function findNewTweets(username) {
    if (user === undefined) {
      if (streams.home.length > lastLength) {
        var numNewTwits = streams.home.length - lastLength;
        lastLength = streams.home.length;
        var newTwits = streams.home.slice(-numNewTwits);
        console.log(newTwits);
        newTwits.forEach(function(tweet) {
          var $tweet = $('<div class="twit-body group"></div>');
          var $profilepic = $('<img src=\"assets/images/' + tweet.user + '.jpg\">');
          $profilepic.appendTo($tweet);
          var $user = $('<div class="username"></div>');
          $user.text('@' + tweet.user);
          var $time = $('<div class="date">' + tweet.created_at + '</div>');
          var $message = $('<div class="user-message"></div>');
          $message.text(tweet.message);
          $user.appendTo($tweet);
          $time.appendTo($tweet);
          $message.appendTo($tweet);
          $tweet.prependTo($twits);
        });
      } else {

      }
    }
  }

  setInterval(findNewTweets, 1000);

});