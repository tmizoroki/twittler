$(document).ready(function(){

  var numFollowing = Object.keys(streams.users).length.toString();
  $('.following-count').text(numFollowing);

  var $twits = $('.display-twits');
  $twits.html('');

  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div></div>');
    $tweet.text('@' + tweet.user + ': ' + tweet.message);
    $tweet.appendTo($twits);
    index -= 1;
  }

});