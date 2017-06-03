var styleApp = {};

styleApp.weatherKey = "62166a9499478fb8";
styleApp.key = 'uid9849-39423043-50';


styleApp.init = function(){
	styleApp.getWeatherPieces();
	styleApp.getStylePieces();
	// styleApp.reloadButton();
	styleApp.countProducts();
};

//when user clicked "create my wardrobe" in the header, go to the library section.
//when user location is activated, display weather data.
//display clothes according to user's location temperature (above 20 degrees show summer clothes, below 20 degrees show autumn clothes).
//when user select a product, counter of 30 decreases by 1; when user unclicked the product, the counter increases.


//user selects products from library and product is stored in their personal capsule wardrobe.
//when user clicks the filter button (eg. all, top, bottom, jackets, selected products) display the library according to the clicked button.
//the flickity top section will show shirts/jackets, and bottom section shows pants/skirts, etc.






//count number of products user has left
styleApp.countProducts = function(){
	var counter = 30;

	$(".counterButton").click(function(){

		$("#userCounterClicks").empty();
		counter = counter - 1;
		const counterNum = $("<p>").text(counter);
		$("#userCounterClicks").append(counterNum);

		if (counter <= 0) {
			counter = 1;
			console.log("no more products left!");
		}
	})
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





styleApp.filterClothesPieces = function(styleData){

	const warmCategory = ["womens-tops", "polo-tops", "cashmere-tops", "button-front-tops", "casual-pants", "shortsleeve-tops", "cropped-jeans", "relaxed-jeans", "skinny-jeans", "cropped-pants", "dress-pants", "stretch-jeans", "straight-leg-jeans", "day-dresses", "evening-dresses", "dresses", "casual-jackets", "denim-jackets", "leggings", "distressed-jeans", "classic-jeans", "longsleeve-tops", "sleeveless-tops", "tees-and-tshirts", "tank-tops", "tunic-tops", "mini-skirts", "mid-length-skirts", "shorts"];

    const coldCategory = ["skinny-jeans", "tunic-tops", "halter-tops", "cashmere-tops", "tees-and-tshirts", "camisole-tops", "button-front-tops", "casual-pants", "stretch-jeans", "leggings", "distressed-jeans", "bootcut-jeans", "cropped-pants", "cropped-jeans", "straight-leg-jeans", "relaxed-jeans", "flared-jeans", "classic-jeans", "dress-pants", "longsleeve-tops", "cardigan-sweaters", "sweatshirts", "turleneck-sweaters", "v-neck-sweaters", "cashmere-sweaters", "crewneck-sweaters", "coats", "casual-jackets", "denim-jackets", "fur-and-shearling-coats", "leather-andsuede-coats", "raincoats-and-trenchcoats"];

    styleApp.displayClothesByTemp = function(tempResults){
    	console.log("the current temp is ", tempResults);

	// if temperature is above 10C display WarmClothesPieces.
	    styleData.products.forEach(function(product){
	        var productCategory = product.categories[0].id;
	        var filteredCategoryNum = warmCategory.indexOf(productCategory);

	        if (filteredCategoryNum > -1 && tempResults > 10) {
	            var img = product.image.sizes.Large.url;
	            var name = product.name;
	            const imgEl = $('<img>').attr('src', img);
	            const nameEl = $('<h4>').text(name);
	            const heart = $('<i class="fa fa-heart-o" aria-hidden="true"></i>');
	            let container= '';
	            let warmClassNames = '';
		     
		        
		        //filter products in #clothes div based on tops, bottoms, dress, coats
		        const topsFilter = ["womens-tops", "polo-tops", "cashmere-tops", "button-front-tops", "shortsleeve-tops","longsleeve-tops", "sleeveless-tops", "tees-and-tshirts", "tank-tops", "tunic-tops","tunic-tops", "halter-tops", "cashmere-tops", "tees-and-tshirts", "camisole-tops", "button-front-tops","longsleeve-tops", "cardigan-sweaters", "sweatshirts", "turleneck-sweaters", "v-neck-sweaters", "cashmere-sweaters", "crewneck-sweaters"]

		        const bottomsFilter = ["skinny-jeans","casual-pants", "stretch-jeans", "leggings", "distressed-jeans", "bootcut-jeans", "cropped-pants", "cropped-jeans", "shorts", "straight-leg-jeans", "relaxed-jeans", "flared-jeans", "classic-jeans", "dress-pants", "mid-length-skirts"]

		       	const dressesFilter = ["day-dresses", "evening-dresses", "dresses"]

		       	const coatsFilter = ["coats", "casual-jackets", "denim-jackets", "fur-and-shearling-coats", "leather-andsuede-coats", "raincoats-and-trenchcoats"]


		       //if product has a category ID related to tops, add class of .tops
		        var filteredTopsNum = topsFilter.indexOf(productCategory);
		        if (filteredTopsNum > -1) {
		        	warmClassNames += 'tops';
		        	// this is the shorthand way of saying classNames = classNames + 'top';
		        }

		        //if product has a category ID related to bottoms, add class of .bottoms
		        var filteredBottomsNum = bottomsFilter.indexOf(productCategory);
		        if (filteredBottomsNum > -1) {
		        	warmClassNames += 'bottoms';
		        	// this is the shorthand way of saying classNames = classNames + 'bottoms';
		        }

		        //if product has a category ID related to dresses, add class of dresses
		        var filteredDressesNum = dressesFilter.indexOf(productCategory);
		        if (filteredDressesNum > -1) {
		        	warmClassNames += 'dresses';
		        	// this is the shorthand way of saying classNames = classNames + 'dresses';
		        }

		        //if product has a category ID related to coats, add class of coats
		        var filteredCoatsNum = coatsFilter.indexOf(productCategory);
		        if (filteredCoatsNum > -1) {
		        	warmClassNames += 'coats';
		        	// this is the shorthand way of saying classNames = classNames + 'coats';
		        }

		        //if the categories[0].id include the strings stated below, add a class of top to div.element-item.
		        console.log('classNames', warmClassNames)
		    	container = $('<div class="element-item '+ warmClassNames +' " data-id='+ product.categories[0].id +'>').append(imgEl, nameEl, heart);
	             

	            $('#clothes').append(container);
	        }//closes temperature filter if statement
	    }); //closes styleData.products.forEach for warm clothes

		// if temperature is below 10C display ColdClothesPieces.
	    styleData.products.forEach(function(product){
	        var productCategory = product.categories[0].id;
	        var filteredCategoryNum = coldCategory.indexOf(productCategory);

	        if (filteredCategoryNum > -1 && tempResults < 10) {

	            var img = product.image.sizes.Large.url;
	            var name = product.name;
	            const imgEl = $('<img>').attr('src', img);
	            const nameEl = $('<h4>').text(name);

	            let container= '';
	            let coldClassNames = '';

	             
	            //filter products in #clothes div based on tops, bottoms, dress, coats
	            const topsFilter = ["womens-tops", "polo-tops", "cashmere-tops", "button-front-tops", "shortsleeve-tops","longsleeve-tops", "sleeveless-tops", "tees-and-tshirts", "tank-tops", "tunic-tops","tunic-tops", "halter-tops", "cashmere-tops", "tees-and-tshirts", "camisole-tops", "button-front-tops","longsleeve-tops", "cardigan-sweaters", "sweatshirts", "turleneck-sweaters", "v-neck-sweaters", "cashmere-sweaters", "crewneck-sweaters"]

	            const bottomsFilter = ["skinny-jeans","casual-pants", "stretch-jeans", "leggings", "distressed-jeans", "bootcut-jeans", "cropped-pants", "cropped-jeans", "shorts", "straight-leg-jeans", "relaxed-jeans", "flared-jeans", "classic-jeans", "dress-pants", "mid-length-skirts"]

	            const dressesFilter = ["day-dresses", "evening-dresses", "dresses"]

	            const coatsFilter = ["coats", "casual-jackets", "denim-jackets", "fur-and-shearling-coats", "leather-andsuede-coats", "raincoats-and-trenchcoats"]


	            //if product has a category ID related to tops, add class of .tops
	             var filteredTopsNum = topsFilter.indexOf(productCategory);
	             if (filteredTopsNum > -1) {
	             	coldClassNames += 'tops';
	             	// this is the shorthand way of saying classNames = classNames + 'top';
	             }

	             //if product has a category ID related to bottoms, add class of .bottoms
	             var filteredBottomsNum = bottomsFilter.indexOf(productCategory);
	             if (filteredBottomsNum > -1) {
	             	coldClassNames += 'bottoms';
	             	// this is the shorthand way of saying classNames = classNames + 'bottoms';
	             }

	             //if product has a category ID related to dresses, add class of dresses
	             var filteredDressesNum = dressesFilter.indexOf(productCategory);
	             if (filteredDressesNum > -1) {
	             	coldClassNames += 'dresses';
	             	// this is the shorthand way of saying classNames = classNames + 'dresses';
	             }

	             //if product has a category ID related to coats, add class of coats
	             var filteredCoatsNum = coatsFilter.indexOf(productCategory);
	             if (filteredCoatsNum > -1) {
	             	coldClassNames += 'coats';
	             	// this is the shorthand way of saying classNames = classNames + 'coats';
	             }		    
		    } //closes if statement that filters by temperature

		    	console.log('coldClassNames', coldClassNames)
		    	container = $('<div class="element-item '+ coldClassNames +' " data-id='+ product.categories[0].id +'>').append(imgEl, nameEl);
	             
	            $('#clothes').append(container);
	    }); //closes styleData.products.forEach for cold clothing


	} //closes styleApp.displayClothesByTemp
}//closes filterClothesPieces function

//smooth scroll so results display on screen in a more obvious manner
$(".submitButton").on('click', function() {
    $('html,body').animate({
        scrollTop: $("#clothes").offset().top},
        'slow');
});


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

