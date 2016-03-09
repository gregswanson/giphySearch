
// initial movie list
var movies = ['the royal tenenbaums', 'the life aquatic with steve zissou', 'moonrise kingdom', 'taxi driver', 'jaws', 'the ring', 'inception', 'back to the future'];

//create initial movie buttons
//replace " " with "+" for address 
for (var i = 0; i < movies.length; i++){
		var b = $('<button>');
		b.addClass('movie btn btn-default')
		var movieSpace = movies[i].replace(/ /g, "+");
		b.attr('data-name', movieSpace);
		b.text(movies[i]);
		$('#buttonHolder').append(b);
	}


//create buttons
function createBTN (){
	$('#buttonHolder').empty();
	for (var i = 0; i < movies.length; i++){
		var b = $('<button>');
		b.addClass('movie btn btn-default')
		var movieSpace = movies[i].replace(/ /g, "+");
		b.attr('data-name', movieSpace);
		b.text(movies[i]);
		$('#buttonHolder').append(b);
	}
}

//on search: push new movies to array, create new button and clear value
$('#movieSearchBTN').on('click', function(){
	if ($('#movieSearch').val() != ""){
		var movieTXT = $('#movieSearch').val().trim();
		var newMovie = movieTXT.toLowerCase();
		movies.push(newMovie);
		createBTN();
		$('#movieSearch').val("");
        return false;
	}
});


//send request for gifs
$('#buttonHolder').on('click', '.movie', function(){
	$('#gifDiv').empty();
	var movieData = $(this).data('name');
    var movieURL = "http://api.giphy.com/v1/gifs/search?q=" + movieData + "+movie&api_key=dc6zaTOxFJmzC&limit=10";


    $.ajax({url: movieURL, method: 'GET'}).done(function(response) {
    	var results = response.data;
//create div
    	for (var i = 0; i < results.length; i++){
    		var movieDiv = $('<div>');
    		movieDiv.addClass('movieHolder');
//get movie rating
    		var movieRating = $('<div>');
    		movieRating.addClass('movieHeading');
    		movieRating.text('Rating: ' + results[i].rating);
//get movie images
    		var movieImg = $('<img>');
    		movieImg.addClass('gifClass');
    		movieImg.attr('src', results[i].images.fixed_height.url);
    		movieImg.attr('data-still', results[i].images.fixed_height_still.url);
    		movieImg.attr('data-animate', results[i].images.fixed_height.url);
    		movieImg.attr('data-state', 'animate');
    		movieImg.attr('alt', 'movie gif');
//append elements to movie div
    		movieDiv.append(movieRating);
    		movieDiv.append(movieImg);
	    	$('#gifDiv').append(movieDiv);
    	}
//warning message if no gifs exist
    	if(results.length == 0) {
    		$('#gifDiv').append("<p class='warning'>I'm Sorry. No gifs currently exist for this search</p><p class='warning'>Please try another movie<p>");
    	}
    });
//add active class to buttons
    $(this).siblings().removeClass('active1')
    $(this).addClass('active1');
  });

//pause image on click
  $('#gifDiv').on('click', '.gifClass', function(){
  	var state = $(this).attr('data-state'); 
  	if (state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
	});


