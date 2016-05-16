angular.module('starter.controllers', ['starter.services'])

  .controller('SummaryCtrl', function ($scope, Location, Weather) {

    //Start of location shit
    //TODO move all of this shit into a service somehow
    var defaultCoords = [28.2527, 85.7585]; // default coords is Louisville L&L
    var posOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
      navigator.geolocation.getCurrentPosition(onSuccess, Error, posOptions);
    }

    function onSuccess(pos) {

      $scope.lat = pos.coords.latitude;
      $scope.lng = pos.coords.longitude;

      //TODO cache this
      Weather.getCurrent($scope.lat, $scope.lng)
        .success(function (data) {
          $scope.currentWeatherData = data.currently;
        })
        .error(function (error) {
          //TODO handle error fetch forecast.io crap  
        })
    }

    function Error(error) {
      console.log('error');
      Weather.getCurrent(defaultCoords[0], defaultCoords[1])
        .success(function (data) {
          $scope.currentWeatherData = data.currently;
        })
        .error(function (error) {
          //TODO catch error w/ pretty popup..
        })
    }

    //End of location shit

  })

  .controller('ForecastCtrl', function ($scope, Location, Weather) {
    //Start of location shit
    function timestampToDay(timestamp) {
      return new Date(timestamp * 1000).getDay();
    }
    
    //TODO move all of this shit into a service somehow
    var defaultCoords = [28.2527, 85.7585]; // default coords is Louisville L&L
    console.log('crtl');

    var posOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
      console.log("dr");
      navigator.geolocation.getCurrentPosition(onSuccess, Error, posOptions);
    }

    function onSuccess(pos) {

      console.log("success");
      $scope.lat = pos.coords.latitude;
      $scope.lng = pos.coords.longitude;

      //TODO cache this
      Weather.getCurrent($scope.lat, $scope.lng)
        .success(function (data) {
          $scope.currentWeatherData = data.daily.data;
        })
        .error(function (error) {
          //TODO handle error fetch forecast.io crap  
        })
    }

    function Error(error) {
      console.log('error');
      Weather.getCurrent(defaultCoords[0], defaultCoords[1])
        .success(function (data) {
          $scope.currentWeatherData = data.daily;
        })
        .error(function (error) {
          //TODO catch error w/ pretty popup..
        })
    }

    //End of location shit
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
