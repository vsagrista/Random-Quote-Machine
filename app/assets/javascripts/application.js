// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap
//= require jquery-ui
//= require turbolinks
//= require_tree .

$(function() {

  function wrapTweet() {
    var tweeterUrl = 'https://twitter.com/intent/tweet?text=';
    var quote = $('#quote').text();
    var author = ' - ' + $('#author').text() + ' - ';
    var codingHashtags = 'codingquotes,freecodecamp';
    var tweet = makeItTweetable(quote, author, codingHashtags);
    $('#tweet-content').attr('href', tweeterUrl + tweet);
  }

  function makeItTweetable(quote, author, codingHashtags) {
    if (quote.length + author.length + codingHashtags.length + 2 > 140) {
      var quoteAllowance = 110 - author.length; // codingHashtag.lengh is 26 plus 3 ...
      var toA = quote.slice(0, quoteAllowance).split(' '); // remove last word, in case it's been cut
      toA.pop();
      return toA.join(' ') + '...' + author + '&hashtags=' + codingHashtags;
    } else {
      return quote + author + '&hashtags=' + codingHashtags;
    }
  }

  function getQuotes(mode) {
    var url =
      'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous';
    $.ajax({
      type: "POST",
      url: url,
      headers: {
        "X-Mashape-Key": "w7jsuza4KZmshXfUcZOqNVTVuaMkp1LDvOfjsnNJaXdbzSvqXc",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
      },
      success: function(response) {
        printQuote(response, mode);
      },
      error: function(response) {
        printQuote(response);
      },
    });
  }

  function printQuote(quote, mode) {
    var randomQuote = JSON.parse(quote).quote;
    var author = JSON.parse(quote).author;
    $('#quote').text(randomQuote);
    $('#author').text(author);
    wrapTweet();
    prepareColors();
    if (mode) stopSpinner();
  }

  function prepareColors() {
    var backgroundColors = Array.apply(null, Array(3)).map(function(number) {
      return Math.floor(Math.random() * 800);
    });
    paintItPretty($('body'), backgroundColors);
  }

  function paintItPretty($domElement, colors) {
    var background = 'rgb(';
    for (var i = 0; i < colors.length; i++) {
      background += (colors[i] + 50) + ',';
    }
    background = background.slice(0, -1) + ')';
    $domElement.animate({
      backgroundColor: background
    }, 500);
    $domElement.animate({
      'border': background
    }, 500);
  }

  function hide($domElement) {
    $domElement.addClass('hidden');
  }

  function show($domElement) {
    $domElement.removeClass('hidden');
  }

  function runSpinner() {
    $('.clock').addClass('animate');
  }

  function stopSpinner() {
    $('.clock').removeClass('animate');
  }

  function makeAppRun(mode) {
    $('.clock').addClass('animate');
    if (mode === 'manual') {
      setTimeout(function() {
        getQuotes('manual')
      }, 2000);
    } else {
      getQuotes();
    }
  }

  wrapTweet();
  var autoPilot;

  $('#quote-btn').on('click', function() {
    clearInterval(autoPilot);
    hide($('#auto-stop'));
    show($('#auto'));
    makeAppRun('manual');
  });
  $('#auto').on('click', function() {
    makeAppRun();
    autoPilot = setInterval(makeAppRun, 6000);
    hide($('#auto'));
    show($('#auto-stop'));
  });
  $('#auto-stop').on('click', function() {
    stopSpinner();
    clearInterval(autoPilot);
    hide($('#auto-stop'));
    show($('#auto'));
  });
})();
