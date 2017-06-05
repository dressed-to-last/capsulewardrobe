var styleApp = {};

styleApp.weatherKey = "1decf782403e5b0c";
styleApp.key = "uid9849-39423043-50";

styleApp.init = function() {
  styleApp.getWeatherPieces();
  styleApp.getStylePieces();
};

//when user clicked "create my wardrobe" in the header, go to the library section.
//when user location is activated, display weather data.
//display clothes according to user's location temperature (above 10 degrees show summer clothes, below 10 degrees show autumn clothes).
//when user selects a product, counter of 30 decreases by 1; when user unclick the product, the counter increases.
//user selects products from library and products will be stored in their personal capsule wardrobe.
//when user clicks the filter button (eg. all, top, bottom, jackets, selected products) display the library according to the clicked button.
//the flickity top section will show shirts/jackets, and bottom section shows pants/skirts, etc.


//ajax call to get weather data
styleApp.getWeatherPieces = function() {
  $.ajax({
    url: `https://api.wunderground.com/api/${styleApp.weatherKey}/conditions/q/autoip.json`,
    method: "GET",
    dataType: "jsonp"
  }).then(function(res) {
    styleApp.displayWeatherPieces(res);
  });
};



//after getting data from getWeatherPieces, display elements needed on the page.
styleApp.displayWeatherPieces = function(weather) {
  var weatherData = weather.current_observation;
  const weatherImgEl = $("<img>").attr("src", weatherData.icon_url);
  const cityEl = $("<p>").text(weatherData.observation_location.city);
  const tempEl = $("<p>").text(weatherData.temp_c + " °C");
  const temp = weatherData.temp_c;

  $("#weather").append(weatherImgEl, tempEl, cityEl);

  styleApp.displayClothesByTemp(temp);
};



styleApp.getStylePieces = function() {
  //requesting list of 50 products from shopstyle
  $.ajax({
    url: "https://api.shopstyle.com/api/v2/products",
    method: "GET",
    dataType: "json",
    data: {
      pid: styleApp.key,
      offset: 0,
      limit: 50
    }
  }).then(function(res) {
    styleApp.filterClothesPieces(res);
  });

  //requesting list of 50 products from shopstyle with an offset of 50 to request the next 50 products
  $.ajax({
    url: "https://api.shopstyle.com/api/v2/products",
    method: "GET",
    dataType: "json",
    data: {
      pid: styleApp.key,
      offset: 50,
      limit: 50
    }
  }).then(function(res) {
    styleApp.filterClothesPieces(res);
  });

  //requesting list of 50 products from shopstyle with an offset of 100 to request the next 50 products
  $.ajax({
    url: "https://api.shopstyle.com/api/v2/products",
    method: "GET",
    dataType: "json",
    data: {
      pid: styleApp.key,
      offset: 100,
      limit: 50
    }
  }).then(function(res) {
    styleApp.filterClothesPieces(res);
  });

  //requesting list of 50 products from shopstyle with an offset of 150 to request the next 50 products
  $.ajax({
    url: "https://api.shopstyle.com/api/v2/products",
    method: "GET",
    dataType: "json",
    data: {
      pid: styleApp.key,
      offset: 150,
      limit: 50
    }
  }).then(function(res) {
    styleApp.filterClothesPieces(res);
  });

  //requesting list of 50 products from shopstyle with an offset of 200 to request the next 50 products
  $.ajax({
    url: "https://api.shopstyle.com/api/v2/products",
    method: "GET",
    dataType: "json",
    data: {
      pid: styleApp.key,
      offset: 200,
      limit: 50
    }
  }).then(function(res) {
    styleApp.filterClothesPieces(res);
  });

  //requesting list of 50 products from shopstyle with an offset of 250 to request the next 50 products
  $.ajax({
    url: "https://api.shopstyle.com/api/v2/products",
    method: "GET",
    dataType: "json",
    data: {
      pid: styleApp.key,
      offset: 250,
      limit: 50
    }
  }).then(function(res) {
    styleApp.filterClothesPieces(res);
  });

  //requesting list of 50 products from shopstyle with an offset of 300 to request the next 50 products
  $.ajax({
    url: "https://api.shopstyle.com/api/v2/products",
    method: "GET",
    dataType: "json",
    data: {
      pid: styleApp.key,
      offset: 300,
      limit: 50
    }
  }).then(function(res) {
    styleApp.filterClothesPieces(res);
  });
};



styleApp.filterClothesPieces = function(styleData) {
  const warmCategory = [
    "womens-tops",
    "polo-tops",
    "cashmere-tops",
    "button-front-tops",
    "casual-pants",
    "shortsleeve-tops",
    "cropped-jeans",
    "relaxed-jeans",
    "skinny-jeans",
    "cropped-pants",
    "dress-pants",
    "stretch-jeans",
    "straight-leg-jeans",
    "day-dresses",
    "evening-dresses",
    "dresses",
    "casual-jackets",
    "denim-jackets",
    "leggings",
    "distressed-jeans",
    "classic-jeans",
    "longsleeve-tops",
    "sleeveless-tops",
    "tees-and-tshirts",
    "tank-tops",
    "tunic-tops",
    "mini-skirts",
    "mid-length-skirts",
    "shorts"
  ];

  const coldCategory = [
    "skinny-jeans",
    "tunic-tops",
    "halter-tops",
    "cashmere-tops",
    "tees-and-tshirts",
    "camisole-tops",
    "button-front-tops",
    "casual-pants",
    "stretch-jeans",
    "leggings",
    "distressed-jeans",
    "bootcut-jeans",
    "cropped-pants",
    "cropped-jeans",
    "straight-leg-jeans",
    "relaxed-jeans",
    "flared-jeans",
    "classic-jeans",
    "dress-pants",
    "longsleeve-tops",
    "cardigan-sweaters",
    "sweatshirts",
    "turleneck-sweaters",
    "v-neck-sweaters",
    "cashmere-sweaters",
    "crewneck-sweaters",
    "coats",
    "casual-jackets",
    "denim-jackets",
    "fur-and-shearling-coats",
    "leather-andsuede-coats",
    "raincoats-and-trenchcoats"
  ];

  styleApp.displayClothesByTemp = function(tempResults) {
    // if temperature is above 10C display WarmClothesPieces.
    styleData.products.forEach(function(product) {
      var productCategory = product.categories[0].id;
      var filteredCategoryNum = warmCategory.indexOf(productCategory);

      if (filteredCategoryNum > -1 && tempResults > 10) {
        var img = product.image.sizes.Large.url;
        var name = product.name;
        const imgEl = $("<img>").attr("src", img);
        const nameEl = $("<h4>").text(name);
        var heart = $('<i>').addClass("fa").addClass("fa-heart").addClass("favoriteHeart");
        let container = "";
        let warmClassNames = "";

        //filter products in #clothes div based on tops, bottoms, dress, coats
        const topsFilter = [
          "womens-tops",
          "polo-tops",
          "cashmere-tops",
          "button-front-tops",
          "shortsleeve-tops",
          "longsleeve-tops",
          "sleeveless-tops",
          "tees-and-tshirts",
          "tank-tops",
          "tunic-tops",
          "tunic-tops",
          "halter-tops",
          "cashmere-tops",
          "tees-and-tshirts",
          "camisole-tops",
          "button-front-tops",
          "longsleeve-tops",
          "cardigan-sweaters",
          "sweatshirts",
          "turleneck-sweaters",
          "v-neck-sweaters",
          "cashmere-sweaters",
          "crewneck-sweaters"
        ];

        const bottomsFilter = [
          "skinny-jeans",
          "casual-pants",
          "stretch-jeans",
          "leggings",
          "distressed-jeans",
          "bootcut-jeans",
          "cropped-pants",
          "cropped-jeans",
          "shorts",
          "straight-leg-jeans",
          "relaxed-jeans",
          "flared-jeans",
          "classic-jeans",
          "dress-pants",
          "mid-length-skirts"
        ];

        const dressesFilter = ["day-dresses", "evening-dresses", "dresses"];

        const coatsFilter = [
          "coats",
          "casual-jackets",
          "denim-jackets",
          "fur-and-shearling-coats",
          "leather-andsuede-coats",
          "raincoats-and-trenchcoats"
        ];

        //if product has a category ID related to tops, add class of .tops
        var filteredTopsNum = topsFilter.indexOf(productCategory);
        if (filteredTopsNum > -1) {
          warmClassNames += "tops";
          // this is the shorthand way of saying classNames = classNames + 'top';
        }

        //if product has a category ID related to bottoms, add class of .bottoms
        var filteredBottomsNum = bottomsFilter.indexOf(productCategory);
        if (filteredBottomsNum > -1) {
          warmClassNames += "bottoms";
          // this is the shorthand way of saying classNames = classNames + 'bottoms';
        }

        //if product has a category ID related to dresses, add class of dresses
        var filteredDressesNum = dressesFilter.indexOf(productCategory);
        if (filteredDressesNum > -1) {
          warmClassNames += "dresses";
          // this is the shorthand way of saying classNames = classNames + 'dresses';
        }

        //if product has a category ID related to coats, add class of coats
        var filteredCoatsNum = coatsFilter.indexOf(productCategory);
        if (filteredCoatsNum > -1) {
          warmClassNames += "coats";
          // this is the shorthand way of saying classNames = classNames + 'coats';
        }

        //if the categories[0].id include the strings stated below, add a class of top to div.element-item.
        container = $(
          '<div class="element-item ' +
            warmClassNames +
            ' " data-id=' +
            product.categories[0].id +
            ">"
        ).append(imgEl, nameEl, heart);

        $("#clothes").append(container);
      } //closes temperature filter if statement
    }); //closes styleData.products.forEach for warm clothes


    // if temperature is below 10C display ColdClothesPieces.
    styleData.products.forEach(function(product) {
      var productCategory = product.categories[0].id;
      var filteredCategoryNum = coldCategory.indexOf(productCategory);

      if (filteredCategoryNum > -1 && tempResults < 10) {
        var img = product.image.sizes.Large.url;
        var name = product.name;
        const imgEl = $("<img>").attr("src", img);
        const nameEl = $("<h4>").text(name);
        var heart = $('<i>').addClass("fa").addClass("fa-heart").addClass("favoriteHeart");
        let container = "";
        let coldClassNames = "";

        //filter products in #clothes div based on tops, bottoms, dress, coats
        const topsFilter = [
          "womens-tops",
          "polo-tops",
          "cashmere-tops",
          "button-front-tops",
          "shortsleeve-tops",
          "longsleeve-tops",
          "sleeveless-tops",
          "tees-and-tshirts",
          "tank-tops",
          "tunic-tops",
          "tunic-tops",
          "halter-tops",
          "cashmere-tops",
          "tees-and-tshirts",
          "camisole-tops",
          "button-front-tops",
          "longsleeve-tops",
          "cardigan-sweaters",
          "sweatshirts",
          "turleneck-sweaters",
          "v-neck-sweaters",
          "cashmere-sweaters",
          "crewneck-sweaters"
        ];

        const bottomsFilter = [
          "skinny-jeans",
          "casual-pants",
          "stretch-jeans",
          "leggings",
          "distressed-jeans",
          "bootcut-jeans",
          "cropped-pants",
          "cropped-jeans",
          "shorts",
          "straight-leg-jeans",
          "relaxed-jeans",
          "flared-jeans",
          "classic-jeans",
          "dress-pants",
          "mid-length-skirts"
        ];

        const dressesFilter = ["day-dresses", "evening-dresses", "dresses"];

        const coatsFilter = [
          "coats",
          "casual-jackets",
          "denim-jackets",
          "fur-and-shearling-coats",
          "leather-andsuede-coats",
          "raincoats-and-trenchcoats"
        ];

        //if product has a category ID related to tops, add class of .tops
        var filteredTopsNum = topsFilter.indexOf(productCategory);
        if (filteredTopsNum > -1) {
          coldClassNames += "tops";
          // this is the shorthand way of saying classNames = classNames + 'top';
        }

        //if product has a category ID related to bottoms, add class of .bottoms
        var filteredBottomsNum = bottomsFilter.indexOf(productCategory);
        if (filteredBottomsNum > -1) {
          coldClassNames += "bottoms";
          // this is the shorthand way of saying classNames = classNames + 'bottoms';
        }

        //if product has a category ID related to dresses, add class of dresses
        var filteredDressesNum = dressesFilter.indexOf(productCategory);
        if (filteredDressesNum > -1) {
          coldClassNames += "dresses";
          // this is the shorthand way of saying classNames = classNames + 'dresses';
        }

        //if product has a category ID related to coats, add class of coats
        var filteredCoatsNum = coatsFilter.indexOf(productCategory);
        if (filteredCoatsNum > -1) {
          coldClassNames += "coats";
          // this is the shorthand way of saying classNames = classNames + 'coats';
        }

        container = $(
          '<div class="element-item ' +
            coldClassNames +
            ' " data-id=' +
            product.categories[0].id +
            ">"
        ).append(imgEl, nameEl, heart);

        $("#clothes").append(container);
      } //closes if statement that filters by temperature
    }); //closes styleData.products.forEach for cold clothing
    styleApp.isotopeFeatures();
    styleApp.countProducts();
  }; //closes styleApp.displayClothesByTemp
}; //closes filterClothesPieces function



//count number of products user has left
styleApp.countProducts = function() {
  var counterNum = 30;

  $(".element-item").click(function() {
    $("#userCounterClicks").empty();
    $(this).toggleClass("favorite");

    counterNum = counterNum - 1;
    const counter = $("<span>").text(counterNum);
    $("#userCounterClicks").append(counter);

    if (counterNum <= 0) {
      counterNum = 1;
    }
  });
};



//smooth scroll
$('a[href*="#"]:not([href="#"])').click(function() {
  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top - 200
      }, 1000);
      return false;
    }
  }
});



styleApp.isotopeFeatures = function(){
    var $grid = $('#clothes').isotope({
    	columnWidth: 5,
    	resizable: false
    });
    // filter items on button click
    $('.buttonFilter').on( 'click', function() {
      var filterValue = $(this).attr('data-filter');
      $grid.isotope({ filter: filterValue });
    });
}



$(function() {
  styleApp.init();
});