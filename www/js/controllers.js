var app = angular.module('starter.controllers', ['starter.services']);

// app.run(function ($rootScope, $q) {
//   //Start of location shit
//   //TODO move all of this shit into a service somehow
//   var defaultCoords = [28.2527, 85.7585]; // default coords is Louisville L&L
//
//   $rootScope.locationReady = $q.defer();
//
//   var posOptions = {
//     enableHighAccuracy: true,
//     timeout: 5000,
//     maximumAge: 0
//   };
//
//   document.addEventListener("deviceready", onDeviceReady, false);
//
//   function onDeviceReady() {
//     navigator.geolocation.getCurrentPosition(onSuccess, Error, posOptions);
//   }
//
//   function onSuccess(pos) {
//     console.log("fuck");
//     $rootScope.lat = pos.coords.latitude;
//     $rootScope.lng = pos.coords.longitude;
//     $rootScope.locationReady.resolve();
//   }
//
//   function Error(error) {
//     $rootScope.lat = defaultCoords[0];
//     $rootScope.lng = defaultCoords[1];
//     $rootScope.locationReady.resolve();
//   }
//
// });


app.controller('SummaryCtrl', function ($scope, Weather, Location) {
  //TODO cache this
  Location.getPosition()
    .then(function (coords) {
      Weather.getCurrent(coords[0], coords[1])
        .success(function (data) {
          $scope.currentWeatherData = data.currently;
        })
        .error(function (error) {
          //TODO handle error fetch forecast.io crap
        })
    })
});

app.controller('ForecastCtrl', function ($scope, Location, Weather) {

  //TODO cache this
  Location.getPosition()
    .then(function (coords) {
      Weather.getCurrent(coords[0], coords[1])
        .success(function (data) {
          $scope.currentWeatherData = data.daily.data;
        })
        .error(function (error) {
          //TODO handle error fetch forecast.io crap
        })
    })
});

app.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
});

app.controller('AccountCtrl', function ($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
