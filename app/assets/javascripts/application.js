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


$(function () {	
	
	function getQuotes() {
		$.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=40", 
			function(response) {
				printQuote(response);
			}
		);
	}
	
	function printQuote (quotes) {
		var randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
		var quote = randomQuote.content.slice(3,randomQuote.content.length-5);  // the string comes with html <p> tags 
		var author = randomQuote.title;
		if(quote.indexOf('&#82') != -1){  // Some quotes have unwanted characters
			quote = cleanQuoteFromCharSigns(quote);
		}
		$('.clock').removeClass('animate');
		$('#quote').text(quote);
		$('#author').text(author);
	}

	function cleanQuoteFromCharSigns(quote) { // removes the unwanted characters returned by the API
		var firstChunk = quote.split('&#82')[0];
		var secondChunk = quote.split('&#82')[1].split(';');
		switch (secondChunk[0]) {
			case '11':
				secondChunk.shift();
				return firstChunk + ' ' + secondChunk; 
			case '17':
				secondChunk.shift();
				return firstChunk + "'" + secondChunk; 
			case '30':
				secondChunk.shift();
				return firstChunk + '' + secondChunk; 
		}		
	}

	function assignColors ($domElement, colors) {
		var background = 'rgb(';
		for(var i = 0; i < colors.length; i++){
			background += (colors[i]+50) + ',';
		}
		background = background.slice(0, -1) + ')';
		$domElement.animate({backgroundColor : background}, 500);
		$domElement.animate({'border' : background}, 500);
	}

	function makeAppRun () {
		$('.clock').addClass('animate');
		setTimeout(function () {getQuotes()},2000);
		var backgroundColors = Array.apply(null,Array(3)).map(function(number){return Math.floor(Math.random() * 800)});
			assignColors($('body'), backgroundColors);
			assignColors($('.color-change'), backgroundColors);	
	}
	function hide ($domElement) {
		$domElement.addClass('hidden');
	}

	function show ($domElement) {
		$domElement.removeClass('hidden');
	}

	var autoPilot;

	$('#quote-btn').on('click', function() {
		clearInterval(autoPilot);
		hide($('#auto-stop'));
		show($('#auto'));
		makeAppRun();
	});
	$('#auto').on('click', function() {
		autoPilot = setInterval(makeAppRun, 4000);
		hide($('#auto'));
		show($('#auto-stop'));
	});
	$('#auto-stop').on('click', function() {
		clearInterval(autoPilot);
		hide($('#auto-stop'));
		show($('#auto'));
	});
})();
