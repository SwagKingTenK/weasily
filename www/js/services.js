angular.module('starter.services', [])

  .service('Location', function ($ionicPlatform, $q, $http) {
    var positionOptions = {timeout: 10000, enableHighAccuracy: true, maximumAge: 0};
    var loc;

    this.getPosition = function () {
      return loc;
    };

    this.setPosition = function () {
      var locSet = $q.defer();

      return $ionicPlatform.ready()
        .then(function () {
          navigator.geolocation.getCurrentPosition(onSuccess, onError, positionOptions);
          return locSet.promise;
        });

      function onSuccess(coords) {
        loc = [coords.coords.latitude, coords.coords.longitude, ""];
        //On success, we get the city name from Google API
        var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + loc[0] + ',' + loc[1] + '&sensor=true';
        $http.get(url)
          .success(function (data) {
            if (data.results.length > 1) {
              loc[2] = data.results[1].formatted_address;
            }
            else {
              loc[2] = "The Middle of Nowhere..";
            }
            locSet.resolve();
          })
          .error(function (data) {
            loc[2] = loc[0] + "," + loc[1];
            locSet.resolve();
          })
      }

      function onError(error) {
        loc = [38.2527, 85.7585, "(Error) Louisville, KY"];
        locSet.resolve();
      }
    };
  })

  .service('Weather', function ($http, $q, Storage) {

    var data;
    var baseUrl = "https://api.forecast.io/forecast/bbdee2e597ea20b7dab870ccf6851838/";

    this.setCurrent = function (lat, lng) {
      var url = baseUrl + lat + "," + lng + "?units=" + Storage.getMetricOption();
      return $http.get(url)
        .success(function (weatherData) {
          data = weatherData;
        });
    };

    this.getCurrent = function () {
      return data;
    };

    // function getForecast(lat, lng) {
    //   var baseUrl = "https://api.forecast.io/forecast/bbdee2e597ea20b7dab870ccf6851838/";
    //   //TODO work on these damn responses
    //   var request = $http({
    //     method: 'get',
    //     url: baseUrl + lat + "," + lng,
    //     params: {}
    //   });
    //   return request;
    // }

  })

  .service("Storage", function () {

    this.setMetricOption = function (val) {
      if (typeof (Storage) != "undefined") {
        window.localStorage.setItem("metricSystem", val);
      }
    };

    this.getMetricOption = function () {
      if (typeof (Storage) != "undefined") {
        if (window.localStorage.getItem("metricSystem") == "us" || window.localStorage.getItem("metricSystem") == "ca")
          return window.localStorage.getItem("metricSystem");
      }
      return "us";
      //The default option is USA system.
    }

  })
;
