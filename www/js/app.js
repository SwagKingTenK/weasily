// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngResource', 'angular-skycons'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      // Each tab has its own nav history stack:

      .state('tab.summary', {
        url: '/summary',
        views: {
          'tab-summary': {
            templateUrl: 'templates/tab-summary.html',
            controller: 'SummaryCtrl'
          }
        }
      })

      .state('tab.forecast', {
        url: '/forecast',
        views: {
          'tab-forecast': {
            templateUrl: 'templates/tab-forecast.html',
            controller: 'ForecastCtrl'
          }
        }
      })

      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/summary');

  });


//TODO move this filter into its own module
app.filter("camelToNormal", function(){
  return function(text) {
    var newText = text.replace(/([A-Z])/g, ' $1');
    newText.replace(/^./, function (str) {
      return str.toUpperCase();
    });
    return newText.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };
});

app.filter("utcToDay", function () {
  return function (timestamp) {
    var dow = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return dow[new Date(timestamp * 1000).getDay()];
  }
});

app.filter("utcToTime", function () {
  return function (timestamp) {
// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(timestamp * 1000);
// Hours part from the timestamp
    var hours = date.getHours();
// Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  }
});

app.filter("decToPercent", function () {
  return function (dec) {
    return dec * 100 + "%";
  }
});

app.filter("locToCity", function ($http) {
  return function (loc) {
    var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + loc[0] + ',' + loc[1] + '&sensor=true';
    $http.get(url)
      .success(function (data) {
        return data;
      })
  }
});

app.config(['$ionicConfigProvider', function($ionicConfigProvider){
  $ionicConfigProvider.tabs.position('bottom'); // other values: top
}]);
