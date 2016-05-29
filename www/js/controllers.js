var app = angular.module('starter.controllers', ['starter.services']);


app.controller('SummaryCtrl', function ($scope, $rootScope, $ionicPopup, Weather, Location) {
    //TODO cache this

    var loadingPopup = $ionicPopup.show({
      title: "Loading...",
      subTitle: "We are loading your most updated weather information.",
      scope: $scope,
    });

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
          $scope.loc = loc;
          $scope.city = $scope.loc[2];
          setupWeather();
        });
    }

    $scope.refreshWeather = function () {
      Location.setPosition()
        .then(function () {
          Weather.setCurrent(Location.getPosition()[0], Location.getPosition()[1])
            .then(function () {
              setupData(Weather.getCurrent().currently);
              $scope.city = Location.getPosition()[2];
              $scope.$broadcast('scroll.refreshComplete');
            });
        });
    };

  function setupWeather() {
      if (Weather.getCurrent() == null) {
        Weather.setCurrent($scope.loc[0], $scope.loc[1])
          .then(function () {
            setupData(Weather.getCurrent().currently);
          });
      }
      else {
        setupData(Weather.getCurrent().currently);
      }
      loadingPopup.close(); //End the popup scree after the data has been loaded.
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


  }
)
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
    if (Weather.getCurrent() != null) {
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


app.controller('AccountCtrl', function ($scope) {

});
