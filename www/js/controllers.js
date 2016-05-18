var app = angular.module('starter.controllers', ['starter.services']);


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
