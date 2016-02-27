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


$(document).ready(function () {
	$.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=40", 
		function(a) {
			console.log(a)
		}
	);
	
	function printQuote (quote) {
		$('#quote').text()
	}
	function printError () {
		// body...
	}
	function assignColors ($domElement, colors) {
		background = 'rgb(';
			//colorChar = cssProp === 'border' ? 300 : 50
		for(var i = 0; i < colors.length; i++){
			background += (colors[i]+50) + ',';
		}
		background = background.slice(0, -1) + ')';
		//$domElement.animate({backgroundColor: background }, 2000);
		$domElement.animate({backgroundColor : background}, 500);
		$domElement.animate({'border' : background}, 500);
	}
	$('#quote-btn').on('click', function(){
		var backgroundColors = Array.apply(null,Array(3)).map(function(number){return Math.floor(Math.random() * 800)})
			assignColors($('body'), backgroundColors);
			assignColors($('.color-change'), backgroundColors);
	});
});
