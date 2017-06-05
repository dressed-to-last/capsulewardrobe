var styleApp = {};

styleApp.weatherKey = "62166a9499478fb8";
styleApp.key = 'uid9849-39423043-50';


styleApp.init = function(){
	styleApp.getWeatherPieces();
	styleApp.getStylePieces();
	// styleApp.reloadButton();
	// styleApp.countProducts(); //this is being called somewhere else



};

//when user clicked "create my wardrobe" in the header, go to the library section.
//when user location is activated, display weather data.
//display clothes according to user's location temperature (above 20 degrees show summer clothes, below 20 degrees show autumn clothes).
//when user select a product, counter of 30 decreases by 1; when user unclicked the product, the counter increases.


//user selects products from library and product is stored in their personal capsule wardrobe.
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

//end of ajax call



//after getting data from getWeatherPieces, display elements needed on the page.
styleApp.displayWeatherPieces = function(weather) {
	var weatherData = weather.current_observation;
	const weatherImgEl = $("<img>").attr("src", weatherData.icon_url);
	const cityEl = $("<p>").text(weatherData.observation_location.city);
	const tempEl = $("<p>").text(weatherData.temp_c + " °C");
	const temp = weatherData.temp_c;

	$("#weather").append(weatherImgEl, tempEl, cityEl);

	// styleApp.getStylePieces();
	styleApp.displayClothesByTemp(temp);
}



styleApp.getStylePieces = function() {
//requesting list of 50 products from shopstyle
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
		styleApp.filterClothesPieces(res);

	});

//requesting list of 50 products from shopstyle with an offset of 50 to request the next 50 products
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
		styleApp.filterClothesPieces(res);
	});

//requesting list of 50 products from shopstyle with an offset of 100 to request the next 50 products
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
		styleApp.filterClothesPieces(res);
	});

	//requesting list of 50 products from shopstyle with an offset of 150 to request the next 50 products
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
		styleApp.filterClothesPieces(res);
	});

	//requesting list of 50 products from shopstyle with an offset of 200 to request the next 50 products
	$.ajax({
		url: 'http://api.shopstyle.com/api/v2/products',
		method: 'GET',
		dataType: 'json',
		data: {
			pid: styleApp.key,
			offset: 200, 
			limit: 50
		}
	}).then(function(res){
		styleApp.filterClothesPieces(res);
	});

	//requesting list of 50 products from shopstyle with an offset of 250 to request the next 50 products
	$.ajax({
		url: 'http://api.shopstyle.com/api/v2/products',
		method: 'GET',
		dataType: 'json',
		data: {
			pid: styleApp.key,
			offset: 250, 
			limit: 50
		}
	}).then(function(res){
		styleApp.filterClothesPieces(res);
	});

	//requesting list of 50 products from shopstyle with an offset of 300 to request the next 50 products
	$.ajax({
		url: 'http://api.shopstyle.com/api/v2/products',
		method: 'GET',
		dataType: 'json',
		data: {
			pid: styleApp.key,
			offset: 300, 
			limit: 50
		}
	}).then(function(res){
		styleApp.filterClothesPieces(res);
	});

	//requesting list of 50 products from shopstyle with an offset of 350 to request the next 50 products
	$.ajax({
		url: 'http://api.shopstyle.com/api/v2/products',
		method: 'GET',
		dataType: 'json',
		data: {
			pid: styleApp.key,
			offset: 350, 
			limit: 50
		}
	}).then(function(res){
		styleApp.filterClothesPieces(res);
	});

	//requesting list of 50 products from shopstyle with an offset of 400 to request the next 50 products
	$.ajax({
		url: 'http://api.shopstyle.com/api/v2/products',
		method: 'GET',
		dataType: 'json',
		data: {
			pid: styleApp.key,
			offset: 400, 
			limit: 50
		}
	}).then(function(res){
		styleApp.filterClothesPieces(res);
	});

	//requesting list of 50 products from shopstyle with an offset of 540 to request the next 50 products
	$.ajax({
		url: 'http://api.shopstyle.com/api/v2/products',
		method: 'GET',
		dataType: 'json',
		data: {
			pid: styleApp.key,
			offset: 450, 
			limit: 50
		}
	}).then(function(res){
		styleApp.filterClothesPieces(res);
	});
};


});

//reload button that will reload the page
styleApp.reloadButton = function(){
	$('#reloadButton').on('click', function(){
		// console.log(reloadButton);
		location.reload();
	});
};

