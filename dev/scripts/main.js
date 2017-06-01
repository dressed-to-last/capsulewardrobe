var styleApp = {};

styleApp.weatherKey = "62166a9499478fb8";
styleApp.key = 'uid9849-39423043-50';

styleApp.init = function(){
	styleApp.getStylePieces();
	styleApp.getWeatherPieces();
};

//when user clicked "create my wardrobe" in the header, go to the library section.
//when user location is activated, display weather data.
//display clothes according to user's location temperature (above 20 degrees show summer clothes, below 20 degrees show autumn clothes).
//user select from library and stored in their personal capsule wardrobe.
//when user select a product, counter of 30 decreases by 1; when user unclicked the product, the counter increases.
//when user clicks the filter button (eg. all, top, bottom, jackets, selected products) display the library according to the clicked button.
//the flickity top section will show shirts/jackets, and bottom section shows pants/skirts, etc.



//ajax call to get weather data
styleApp.getWeatherPieces = function() {
	$.ajax({
		url:`http://api.wunderground.com/api/${styleApp.weatherKey}/conditions/q/autoip.json`,
		method:"GET",
		dataType:"jsonp"
	})
	.then(function(res){
		styleApp.displayWeatherPieces(res);
	});
};

//after getting data from getWeatherPieces, display elements needed on the page.
styleApp.displayWeatherPieces = function(weather) {
	var weatherData = weather.current_observation;
	const weatherConditionEl = $("<p>").text(weatherData.icon);
	const weatherImgEl = $("<img>").attr("src", weatherData.icon_url);
	const cityEl = $("<p>").text(weatherData.observation_location.city);
	const tempEl = $("<p>").text(weatherData.temp_c + "°C");

	$("#weather").append(weatherImgEl, weatherConditionEl, tempEl, cityEl);
};




styleApp.getStylePieces = function() {
	// $.ajax({
	// 	url: 'http://api.shopstyle.com/api/v2/categories',
	// 	method: 'GET',
	// 	dataType: 'json',
	// 	data: {
	// 		pid: styleApp.key
	// 	}
	// }).then(function(res){
	// 	console.log(res);
	// });


//grabbing products data from shopstyle with offset of 50 products in the first round
	$.ajax({
		url: 'http://api.shopstyle.com/api/v2/products',
		method: 'GET',
		dataType: 'json',
		data: {
			pid: styleApp.key,
			offset: 0,
			limit: 50
		}
	}).then(function(res){
		// console.log(res);
		styleApp.filterClothesPieces(res);
	});


//grabbing products data from shopstyle with offset of 50 products in the second round
	$.ajax({
		url: 'http://api.shopstyle.com/api/v2/products',
		method: 'GET',
		dataType: 'json',
		data: {
			pid: styleApp.key,
			offset: 50, 
			limit: 50
		}
	}).then(function(res){
		// console.log(res);
		styleApp.filterClothesPieces(res);
	});


	$.ajax({
		url: 'http://api.shopstyle.com/api/v2/products',
		method: 'GET',
		dataType: 'json',
		data: {
			pid: styleApp.key,
			offset: 100, 
			limit: 50
		}
	}).then(function(res){
		// console.log(res);
		styleApp.filterClothesPieces(res);
	});

	$.ajax({
		url: 'http://api.shopstyle.com/api/v2/products',
		method: 'GET',
		dataType: 'json',
		data: {
			pid: styleApp.key,
			offset: 150, 
			limit: 50
		}
	}).then(function(res){
		// console.log(res);
		styleApp.filterClothesPieces(res);
	});
};



styleApp.filterClothesPieces = function(styleData){
	const category = ["womens-tops", "shortsleeve-tops", "cropped-jeans", "skinny-jeans", "stretch-jeans", "day-dresses", "evening-dresses", "dresses", "casual-jackets", "denim-jackets", "leggings", "distressed-jeans", "classic-jeans", "longsleeve-tops", "sleeveless-tops", "tees-and-tshirts", "tank-tops", "tunic-tops", "mini-skirts", "mid-length-skirts", "long-skirts", "coats", "fur-and-shearling-coats", "leather-andsuede-coats"];
	// console.log('styledata before', styleData);
	styleData.products.forEach(function(product){
		var productCategory = product.categories[0].id;

		var filteredCategoryNum = category.indexOf(productCategory);
		if (filteredCategoryNum > -1) {
			// then display on page 
			styleApp.displayClothesPieces(product);
		}
	});
};


styleApp.displayClothesPieces = function(product) {
	var img = product.image.sizes.Large.url;
	var name = product.name;
	const imgEl = $('<img>').attr('src', img);
	const nameEl = $('<h4>').text(name);


	$("#clothes").append(imgEl, nameEl);
}




//smooth scroll so results display on screen in a more obvious manner
	$(".submitButton").on('click', function() {
	    $('html,body').animate({
	        scrollTop: $("#clothes").offset().top},
	        'slow');
	});

	//reload button that will reload the page
	//reload button that will reload the page
	function reloadButton(){
		$('#reloadButton').on('click', function(){
			console.log(reloadButton);
			location.reload();
		});
	};

	//must add reload button to this function:
	$(function(){
	styleApp.init();
	reloadButton();
	});
