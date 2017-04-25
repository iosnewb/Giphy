'use strict'



var topics = ['bmw', 'mercedes', 'audi', 'lexus'];
var queryURL = "http://api.giphy.com/v1/gifs/search?q=";
var limit = "&limit=20"
var apiKey = "&api_key=dc6zaTOxFJmzC";


function renderGifs() {

	$("#gif-btns").empty();

	for(var i = 0; i < topics.length; i++){
		var a = $("<button>");
		a.addClass('btn btn-default get-gif');
		a.attr("gif-buttons", topics[i]);
		a.text(topics[i]);
		$("#gif-btns").append(a);
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
	$("#gif-container").empty();

	var gif = $(this).attr("gif-buttons");

	$.ajax({
		url: queryURL+gif+apiKey+limit,
		method: 'GET'
	}).done(function(json) {

		for(var i = 0; i < json.data.length; i++){

		var gifImage = $("<div>");
		gifImage.addClass("col-md-4 theGif");

		var rating = json.data[i].rating;
		var r = $("<p>").text("Rated: " +rating);
		gifImage.append(r);
		$("#gif-container").append(gifImage);

		var stillURL = json.data[i].images.fixed_height_still.url;
		var animateURL = json.data[i].images.fixed_height.url;

		var gifImg = $("<img>").attr("src", animateURL);
		gifImg.attr("data-state", "still");
		gifImg.attr("data-animate", animateURL);
		gifImg.attr("data-still", stillURL);
		gifImage.append(gifImg);
		$("#gif-container").append(gifImage);

		}

	}).fail(function(err){
		console.log(err);
		console.log("System failed to retrieve the requested API");
	});

});


$(document).on("click", ".theGif", function() {
	var state = $(this).attr("data-still");
	console.log(state);

})






renderGifs();