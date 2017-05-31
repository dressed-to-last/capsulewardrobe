var styleApp = {};

styleApp.weatherKey = "62166a9499478fb8";
styleApp.key = 'uid9849-39423043-50';

styleApp.init = function(){
	styleApp.getStylePieces();
	styleApp.getWeatherPieces();
};

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

	$.ajax({
		url: 'http://api.shopstyle.com/api/v2/products',
		method: 'GET',
		dataType: 'json',
		data: {
			pid: styleApp.key
		}
	}).then(function(res){
		console.log(res);
		styleApp.displayClothesPieces(res);
	});
};

styleApp.displayClothesPieces = function(styleData){
	styleData.products.forEach(function(clothesData){
		clothesData.categories.forEach(function(catData){
			const catEl= $('<h5>').text(catData.id);
			
		clothesData.alternateImages.forEach(function(imgData){
			const imgEl= $('<img>').attr('src', imgData.sizes.Large.url);

		$("#clothes").append(catEl, imgEl);

		});
		});

	});
};




$(function(){
	styleApp.init();
});