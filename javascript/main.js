'use strict'



var topics = ['bmw', 'mercedes', 'audi', 'lexus'];
var queryURL = "http://api.giphy.com/v1/gifs/search?q=";
var limit = "&limit=20"
var apiKey = "&api_key=dc6zaTOxFJmzC";


// this function creates the intial buttons
function renderGifs() {

	$("#gif-btns").empty();

	for(var i = 0; i < topics.length; i++){
		var a = $("<button>"); 									//creates a button for each loop
		a.addClass('btn btn-default get-gif'); 					//adds a class to the button
		a.attr("gif-buttons", topics[i]); 						//creates an attribute with a value from each array
		a.text(topics[i]); 										//displays text of array on the button
		$("#gif-btns").append(a); 								//appends the buttons onto the gif-btns id
	}
}

// this event extracts user input from the text form to create a new gif button
$(".add-gif").on("click", function(event) {
	event.preventDefault();

	var topic = $("#giphy-input").val().trim(); 				//extracts the value from the user
	topics.push(topic);											//pushes new value into the topics array
	renderGifs();												//calling this function so that it recreates all the buttons
	$(".form-control").val("");
});


// this event performs the ajax call to receive the json request from giphy
$(document).on("click", ".get-gif", function() {
	$("#gif-container").empty();

	var gif = $(this).attr("gif-buttons");						//this code extracts the value from the attribute

	$.ajax({													//ajax call to giphy with queryURL and api key			
		url: queryURL+gif+apiKey+limit,
		method: 'GET'
	}).done(function(json) {

		for(var i = 0; i < json.data.length; i++){				//for loop to loop over all the objects returned from giphy

		var rating = json.data[i].rating;						//extracts the rating value from the json object		
		var r = $("<p>").text("Rated: " +rating);				//creates a p element to store and display the rating

		var stillURL = json.data[i].images.fixed_height_still.url;  //assign the still gif to a variable
		var animateURL = json.data[i].images.fixed_height.url;		//assign the animated gif to a variable

		var gifImg = $("<img>").attr("src", stillURL);  		//creates an image element to store the animated url
		gifImg.attr("data-state", "still");						//creates an attr to store the value 'still'
		gifImg.attr("data-animate", animateURL);				//creates a data attr to store animated url
		gifImg.attr("data-still", stillURL);					//creates a data attr to store still 	url
		gifImg.addClass("theGif col-md-4");
		$("#gif-container").append(gifImg);						//appends the final div to the gif-container
		}

	}).fail(function(err){										//catches an error if the api call fails
		console.log(err);
		console.log("System failed to retrieve the requested API");
	});

});


$(document).on("click", ".theGif", function() {					//event to access data attributes and control gif status
	var state = $(this).attr("data-state");
	console.log(state);

        if(state === 'still'){
          var url = $(this).attr('src');
          $(this).attr('src', $(this).attr('data-animate'));
          $(this).attr('data-animate', url);
          $(this).attr('data-state', 'animate');
        }else{
          var url = $(this).attr('src');
          $(this).attr('src', $(this).attr('data-animate'));
          $(this).attr('data-animate', url);
          $(this).attr('data-state', 'still');
	};

});



renderGifs();