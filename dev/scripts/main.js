var styleApp = {};

styleApp.weatherKey = "62166a9499478fb8";
styleApp.key = 'uid9849-39423043-50';


styleApp.init = function(){
	styleApp.getWeatherPieces();
	styleApp.getStylePieces();
	

	reloadButton();
	styleApp.countProducts();
};

//when user clicked "create my wardrobe" in the header, go to the library section.
//when user location is activated, display weather data.
//display clothes according to user's location temperature (above 20 degrees show summer clothes, below 20 degrees show autumn clothes).
//user selects products from library and product is stored in their personal capsule wardrobe.
//when user select a product, counter of 30 decreases by 1; when user unclicked the product, the counter increases.
//when user clicks the filter button (eg. all, top, bottom, jackets, selected products) display the library according to the clicked button.
//the flickity top section will show shirts/jackets, and bottom section shows pants/skirts, etc.






//count number of products user has left
styleApp.countProducts = function(){
	var counter = 10;
	$(".counterButton").click(function() {

		$("#userCounterClicks").empty();
		counter = counter - 1;
		const counterNum = $("<p>").text(counter);
		$("#userCounterClicks").append(counterNum);

		if (counter <= 0) {
			return;
		}
	});
}


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
	const weatherConditionEl = $("<p>").text(weatherData.icon);
	const weatherImgEl = $("<img>").attr("src", weatherData.icon_url);
	const cityEl = $("<p>").text(weatherData.observation_location.city);
	const tempEl = $("<p>").text(weatherData.temp_c + "°C");

	const temp = weatherData.temp_c;

	$("#weather").append(weatherImgEl, weatherConditionEl, tempEl, cityEl);

	styleApp.displayClothesByTemp(temp);

};




styleApp.getStylePieces = function() {
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
		styleApp.filterClothesPieces(res);

	});


//grabbing products data from shopstyle with offset of 50 more products in the second round
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
		// console.log(res);
		styleApp.filterClothesPieces(res);
	});

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
		// console.log(res);
		styleApp.filterClothesPieces(res);
	});

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
		// console.log(res);
		styleApp.filterClothesPieces(res);
	});

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
		// console.log(res);
		styleApp.filterClothesPieces(res);
	});
};





styleApp.filterClothesPieces = function(styleData){
    const warmCategory = ["womens-tops", "polo-tops", "cashmere-tops", "button-front-tops", "casual-pants", "shortsleeve-tops", "cropped-jeans", "relaxed-jeans", "skinny-jeans", "cropped-pants", "dress-pants", "stretch-jeans", "straight-leg-jeans", "day-dresses", "evening-dresses", "dresses", "casual-jackets", "denim-jackets", "leggings", "distressed-jeans", "classic-jeans", "longsleeve-tops", "sleeveless-tops", "tees-and-tshirts", "tank-tops", "tunic-tops", "mini-skirts", "mid-length-skirts", "shorts"];

    const coldCategory = ["skinny-jeans", "tunic-tops", "halter-tops", "cashmere-tops", "tees-and-tshirts", "camisole-tops", "button-front-tops", "casual-pants", "stretch-jeans", "leggings", "distressed-jeans", "bootcut-jeans", "cropped-pants", "cropped-jeans", "straight-leg-jeans", "relaxed-jeans", "flared-jeans", "classic-jeans", "dress-pants", "longsleeve-tops", "cardigan-sweaters", "sweatshirts", "turleneck-sweaters", "v-neck-sweaters", "cashmere-sweaters", "crewneck-sweaters", "coats", "casual-jackets", "denim-jackets", "fur-and-shearling-coats", "leather-andsuede-coats", "raincoats-and-trenchcoats"];

    styleApp.displayClothesByTemp = function(tempResults){
    	console.log("the current temp is ", tempResults);

	// if temperature is above 20C display WarmClothesPieces,
	// if temperature is below 20C display ColdClothesPieces,

	    styleData.products.forEach(function(product){
	        var productCategory = product.categories[0].id;
	        var filteredCategoryNum = warmCategory.indexOf(productCategory);

	        if (filteredCategoryNum > -1 && tempResults > 10) {
	            // then display on page 
	            // styleApp.displayWarmClothesPieces(product);
	            var img = product.image.sizes.Large.url;
	            var name = product.name;
	            const imgEl = $('<img>').attr('src', img);
	            const nameEl = $('<h4>').text(name);
	            $("#clothes").append(imgEl, nameEl);
	            console.log("temp is above 20!")
	        }
	    });


	    styleData.products.forEach(function(product){
	        var productCategory = product.categories[0].id;
	        var filteredCategoryNum = coldCategory.indexOf(productCategory);

	        if (filteredCategoryNum > -1 && tempResults < 10) {
	            // then display on page 
	            // styleApp.displayColdClothesPieces(product);
	            var img = product.image.sizes.Large.url;
	            var name = product.name;
	            const imgEl = $('<img>').attr('src', img);
	            const nameEl = $('<h4>').text(name);
	            $("#clothes").append(imgEl, nameEl);
	            console.log("temp is below 20!")
	        }
	    });
	}
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
});




//got cold and warm functions working
//got images printing to page
//issue is both cold and warm are printing at once - maybe review if else statement

