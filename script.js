$(document).ready(function(){

  //$('.logo').attr('data-username', '');

  var numFollowing = Object.keys(streams.users).length.toString();
  $('.following-count').text(numFollowing);

  var $twits = $('.display-twits');
  $twits.html('');

  var lastLength = 0;

  /*var updateStats = function() {
    $('.twit-count').text(source.length);
  };*/

  var findNewTweets = function(username) {
    //console.log(username);
    var source = username ? streams.users[username] : streams.home;
    if (source.length > lastLength) {
      numNewTwits = source.length - lastLength;
      lastLength = source.length;
      newTwits = source.slice(-numNewTwits);
      return newTwits;
    }
  };
  
  var addNewTweets = function(username) {
    var newTweets = findNewTweets(username);
    if (newTweets !== undefined){
      console.log(newTweets);
      newTweets.forEach(function(tweet) {
        var $tweet = $('<div></div>').addClass('twit-body group').attr('data-username', tweet.user);
        var $profilepic = $('<img>').addClass('message-pic').attr('src', 'assets/images/' + tweet.user + '.jpg');
        var $user = $('<div></div>').addClass('username').text('@' + tweet.user);
        var $time = $('<div></div>').addClass('date').text(tweet.created_at);
        var $message = $('<div></div>').addClass('user-message').text(tweet.message);
        $profilepic.appendTo($tweet);
        $user.appendTo($tweet);
        $time.appendTo($tweet);
        $message.appendTo($tweet);
        $tweet.prependTo($twits);
      });
    }
  };

  var intervalId = setInterval(addNewTweets, 1000);

  $('body').on('click', '.username, .message-pic, .logo', function() {
    $('.twit-body').hide();
    lastLength = 0;
    clearInterval(intervalId);
    $username = $('[data-username]') ? $(this).closest('[data-username]').data('username') : undefined;
    console.log($username);
    intervalId = setInterval(addNewTweets, 1000, $username);
    if ($username === null) {
      $('.visitor h2').text('@visitor');
      $('.visitor img').attr('src', 'assets/images/user.png');
    } else {
      $('.visitor h2').text('@' + $username);
      $('.visitor img').attr('src', 'assets/images/' + $username + '.jpg');
      $('.twit-count').text(streams.users[$username].length);
    }
  });

});