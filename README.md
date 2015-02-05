# Backbone OpenWeatherMap
Simple Backbone library to connect [OpenWeatherMap](http://openweathermap.org/current)'s API

## Installation

### bower

```
bower install backbone.openweathermap
```

## Methods

### setUnitsFormat( units )
Set the measuring unit

- **units** is the unit of measurement. It may be *internal*, *metric*, *imperial*. Default is *metric*.

### setLanguage( lang )
Set the language for obtain output in your language.

- **lang**. Default is *en*

### fetchFromCity( cityName, [options])
Asks the weather information from the city name.

- **cityName** is the name of city. (Ex. New York)
- **options** is [Backbone options](http://backbonejs.org/#Model-fetch).

```javascript
  owm.fetchFromCity("New York");
```

### fetchFromLatLon( lat, lon, [options])
Asks the weather information from the latitude and longitude.

- **lat** is the latitude.
- - **lat** is the longitude.
- **options** is [Backbone options](http://backbonejs.org/#Model-fetch).

```javascript
  owm.fetchFromLatLon(40.712784,-74.005941);
```

### fetchFromLatLng( lat, lon, [options])
Is the alias name for *fetchFromLatLon*

### getWeather()
A quick way to get the information of the weather.

```javascript
  owm.getWeather();
```

### startWatch(options)
Start monitoring the weather at time intervals.
The options param contain:

- **minutes** is the interval for checking
- **city** is the name of city. This parameter is required if you are not set *lat* and *lon*
- **lat** is the latitude. This parameter is required if you are not set *city*.
- **lon** is the longitude. This parameter is required if you are not set *city*.
- [Backbone options](http://backbonejs.org/#Model-fetch)

```javascript
  own.startWatch({
    minutes: 60, // Interval for checking
    city: "New York",
    success: function(model){
      console.log("Success");
      console.log(model.toJSON());
    },
    error: function(model, res, opt){
      console.log("Error in fetch!");
    }
  });
```


## Full example

```javascript

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
