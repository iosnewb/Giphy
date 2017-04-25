'use strict'



var topics = ['bmw', 'mercedes', 'honda'];
var queryURL = "http://api.giphy.com/v1/gifs/search?q=";
var limit = "&limit=1"
var apiKey = "&api_key=dc6zaTOxFJmzC";


function renderGifs() {

	$("#gif-btns").empty();

	for(var i = 0; i < topics.length; i++){
		var a = $("<button>");
		a.addClass('btn btn-default get-gif');
		a.attr("gif-buttons", topics[i]);
		a.text(topics[i]);
		$("#gif-btns").append(a);
		console.log(topics[i]);
	}
}

$(".add-gif").on("click", function(event) {
	event.preventDefault();

	var topic = $("#giphy-input").val().trim();
	console.log(topic);

	topics.push(topic);
	console.log(topics);

	renderGifs();
});


$(document).on("click", ".get-gif", function() {
	var gif = $(this).attr("gif-buttons");

	$.ajax({
		url: queryURL+gif+apiKey+limit,
		method: 'GET'
	}).done(function(json) {
		console.log(JSON.stringify(json));
	}).fail(function(err){
		console.log(err);
		console.log("System failed to retrieve the requested API");
	});

	// add html code here to display images
});





renderGifs();