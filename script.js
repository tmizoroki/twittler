$(document).ready(function(){

  var numFollowing = Object.keys(streams.users).length.toString();
  $('.following-count').text(numFollowing);

  var $twits = $('.display-twits');
  $twits.html('');

  var lastLength = 0;

  var findNewTweets = function(username) {
    var numNewTwits, newTwits;
    if (username === undefined) {
      if (streams.home.length > lastLength) {
        numNewTwits = streams.home.length - lastLength;
        lastLength = streams.home.length;
        newTwits = streams.home.slice(-numNewTwits);
        return newTwits;
      } 
    } else {
      if (streams.users[username].length > lastLength) {
        numNewTwits = streams.users[username].length - lastLength;
        lastLength = streams.users[username].length;
        newTwits = streams.users[username].slice(-numNewTwits);
        return newTwits;
      }
    }
  };
  
  var addNewTweets = function(username) {

    var newTweets = findNewTweets(username);
    if (newTweets !== undefined){
      console.log(newTweets);
      newTweets.forEach(function(tweet) {
        var $tweet = $('<div class="twit-body group"></div>');
        $tweet.attr('data-username', tweet.user);
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
    }
  };

  var intervalId = setInterval(addNewTweets, 1000);

  $('.display-twits').on('click', '.username' || 'img', function() {
    $('.twit-body').hide();
    lastLength = 0;
    clearInterval(intervalId);
    $username = $(this).closest('.twit-body').data('username');
    setInterval(addNewTweets, 1000, $username);

    $('.visitor h2').text('@' + $username);
    $('.visitor img').attr('src', 'assets/images/' + $username + '.jpg');
  });

});