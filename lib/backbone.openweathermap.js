;(function (window, factory) {

	"use strict";

	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery', 'underscore', 'backbone'], function(){
			return factory.apply(window, arguments);
		});
	} else if (typeof module === 'object' && module.exports) {
		// CommonJS
		module.exports = factory.call(window, require('jquery'), require('underscore'), require('backbone'));
	} else {
		// Browser globals
		window.BackboneOpenWeatherMap = factory.call(window, window.$, window._, window.Backbone);
	}
}(typeof global === 'object' ? global : this, function ($, _, Backbone) {

	
	var OpenWeatherMap = Backbone.Model.extend({

		url: "http://api.openweathermap.org/data/2.5/weather",

		initialize: function initialize(options){
			OpenWeatherMap.__super__.initialize.apply(this, arguments);

			if ( typeof options == "undefined" )
				options = {};
			
			this.apiKey = options.apiKey || "";
			this.units = options.units || "metric";
			this.lang  = options.lang  || "en";
			
			this.interval = null;
		},

		// Set Units format
		// Value acepts: internal, metric, imperial
		setUnitsFormat: function setUnitsFormat(units){
			if ( ["internal", "metric", "imperial"].indexOf(units) > -1  ){
				this.units = units;
			}

			return this;
		},

		setLanguage: function setLanguage(lang){
			if ( typeof lang !== "undefined" )
				this.lang = lang;

			return this;
		},

		// Search by Geo code
		fetchFromLatLon: function fetchFromLatLon( lat, lon, options ){

			if ( typeof options.data == "undefined" )
				options.data = {};

			options.data.lat   = lat;
			options.data.lon   = lon;
			options.data.units = this.units;
			options.data.lang  = this.lang;
			options.data.appid = this.apiKey || "";

			return this.fetch(options);
		},

		// Search weather by city name
		fetchFromCity: function fetchFromCity(name, options){
			if ( typeof options.data == "undefined" )
				options.data = {};

			options.data.q     = name;
			options.data.units = this.units;
			options.data.lang  = this.lang;
			options.data.appid = this.apiKey || "";

			return this.fetch(options);
		},

		getWeather: function getWeather(){
			var weather = this.get("weather");

			if ( _.isUndefined(weather) || _.isNull(weather) || _.isEmpty(weather) || weather.length == 0 )
				return {};

			// Select first element
			weather = weather[0];
			
			// Normalize 
			if ( weather.id ){

				// clear sky
				if ( [800, 951, 904, 903, 952].indexOf(weather.id) > -1 ){
					weather.category = "sunny";
				}

				// Snow
				if ( Math.trunc(weather.id/100) == 6 ){
					weather.category = "snow";
				}

				// rain
				if ( Math.trunc(weather.id/100) == 3 || Math.trunc(weather.id/100) == 5 ){
					weather.category = "rain";
				}

				// thunderstorm
				if ( Math.trunc(weather.id/100) == 2 || [771, 781, 906, 902, 901, 900, 960, 961, 962].indexOf(weather.id) > -1  ){
					weather.category = "thunderstorm";
				}

				//Fog
				if ( [701, 711, 721, 741, 751, 761, 762].indexOf(weather.id) > -1 ){
					weather.category = "fog";
				}

				// partly-cloudy
				if ( [801, 802].indexOf(weather.id) > -1 ){
					weather.category = "partly-cloudy";
				}
				
				// cloudy
				if ( [804, 803].indexOf(weather.id) > -1 ){
					weather.category = "cloudy";
				}

				// windy
				if ( [731, 905, 953, 954, 955, 956, 957, 958, 959].indexOf(weather.id) > -1 ){
					weather.category = "windy";
				}
			
			}

			// Url icon
			weather.iconUrl = "";
			if ( weather.icon )
				weather.iconUrl = "http://openweathermap.org/img/w/"+weather.icon+".png";
				
			// Set info

			var main = this.get("main");
			if ( main ){
				_(main).each(function(value, key){
					weather[key] = value;
				});
			}

			return weather;

		},

		// Start watch
		startWatch: function startWatch( options ){

			if ( typeof options == "undefined" ){
				return this;
			}

			var bCanValid = false;
			if ( typeof options.lat !== "undefined" && typeof options.lon !== "undefined" ){
				bCanValid = true;
			}
			if ( !bCanValid &&  typeof options.city !== "undefined" ){
				bCanValid = true;	
			}

			if ( bCanValid == false ){
				throw new Error("Where do you want to check the weather?");
			}


			if ( typeof options.minutes == "undefined" )
				options.minutes = 60;

			var self = this;
			clearInterval( self.internal );
			self.internal = setInterval(function(){
				
				if ( options.city ){
					self.fetchFromCity( options.city, options );
				}else{
					sel.fetchFromLatLon( options.lat, options.lon, options );
				}
				
			}, options.minutes * 1000 * 60 );

		}

	});



	OpenWeatherMap.middleware = function middleware(options) {
		return function (context, next) {
			context.openWeatherMap = new OpenWeatherMap(options);
			return next();
		}
	}



	return OpenWeatherMap;

}));