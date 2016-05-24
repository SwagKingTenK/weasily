var app = angular.module('starter.controllers', ['starter.services']);


app.controller('SummaryCtrl', function ($scope, $rootScope, Weather, Location) {
  //TODO cache this
  if (Location.getPosition() != null) {
    var loc = Location.getPosition();
    $scope.loc = loc;
    $scope.city = $scope.loc[2];
    setupWeather();
  }
  else {
    Location.setPosition()
      .then(function () {
        var loc = Location.getPosition();
        // $scope.loc[0] = loc[0], $scope.loc[1] = loc[1], $scope.city = loc[2];
        $scope.loc = loc;
        $scope.city = $scope.loc[2]; 
        setupWeather();
      });
  }

  function setupWeather() {
    if(Weather.getCurrent() == null) {
      Weather.setCurrent($scope.loc[0], $scope.loc[1])
        .then(function () {
          setupData(Weather.getData().currently);
        });
    }
    else{
      setupData(Weather.getCurrent().currently);
    }
  }


  function setupData(data) {
    $scope.currentWeatherData = {
      time: data.time,
      summary: data.summary,
      icon: data.icon,
      precipProb: data.precipProbability,
      temperature: data.temperature,
      humidity: data.humidity,
      windSpeed: data.windSpeed,
      vis: data.visibility,
    };
    $rootScope.time = $scope.currentWeatherData.time;

  }


})
;

app.controller('ForecastCtrl', function ($scope, $rootScope, Location, Weather) {

  //TODO cache this
   if (Location.getPosition() != null) {
    var loc = Location.getPosition();
    $scope.loc = loc;
    $scope.city = $scope.loc[2];
    setupWeather();
  }
  else {
    Location.setPosition()
      .then(function () {
        var loc = Location.getPosition();
        // $scope.loc[0] = loc[0], $scope.loc[1] = loc[1], $scope.city = loc[2];
        $scope.loc = loc;
        $scope.city = $scope.loc[2]; 
        setupWeather();
      });
  }

  function setupWeather() {
    if(Weather.getCurrent() != null){
      $scope.forecastWeatherData = Weather.getCurrent().daily.data;
    }
    else {
      Weather.setCurrent($scope.loc[0], $scope.loc[1])
        .then(function () {
          $scope.forecastWeatherData = Weather.getCurrent().daily.data;
        })
    }
  }
 

});

app.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
});

app.controller('AccountCtrl', function ($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
