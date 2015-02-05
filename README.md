# Backbone OpenWeatherMap
Simple Backbone library to connect OpenWeatherMap's API


## Example

```js

var OpenWeatherMap = require("OpenWeatherMap");

var owm = new OpenWeatherMap({
  apiKey: "=aaQQAa", // Optional. Default is empty
  units: "metric", // internal, metric, imperial. Default: metric
  lang: "en" // Default: en
});

// Get weather with name of city
owm.fetchFromCity( 
  "New York", 
  { 
    success: function(model){
      console.log("Success");
      console.log(model.toJSON());
    },
    error: function(model, res, opt){
      console.log("Error in fetch!");
    }
  }
);

// Get weather with latitude and longitude
owm.fetchFromLatLon( 
  40.712784,  // latitude
  -74.005941, // longitude
  { 
    success: function(model){
      console.log("Success");
      console.log(model.toJSON());
    },
    error: function(model, res, opt){
      console.log("Error in fetch!");
    }
  }
);

// Start watching
own.startWatch({
  minutes: 60, // Interval for checking
  city: "New York",
  // lat: 40.712784,  // latitude
  // lon: -74.005941, // longitude
  success: function(model){
    console.log("Success");
    console.log(model.toJSON());
  },
  error: function(model, res, opt){
    console.log("Error in fetch!");
  }
});

// Obtain Weather object
var weather = own.getWeather();
console.log( weather );

```
