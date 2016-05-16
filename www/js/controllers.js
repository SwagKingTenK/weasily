angular.module('starter.controllers', ['starter.services'])

  .controller('SummaryCtrl', function ($scope, Location, Weather) {

    //Start of location shit
    //TODO move all of this shit into a service somehow
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
        .success(function(data){
          $scope.currentWeatherData = data.currently;
          // formulateWeather(data);
        })
    }
    
    // function formulateWeather(data){
    // }

    function Error(error) {
      //TODO catch error w/ pretty popup..
      // $ionicPopup.show({
      
      //   title: "No location availabe..",
      //   subTitle: "Please enable location services for the application.",
      //   scope: $scope,
      //   buttons: {text: "Okay"}
      // });
    }

    //End of location shit

  })

  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
