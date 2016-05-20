angular.module('starter.services', [])

  .factory('Location', function ($ionicPlatform, $q) {

    var positionOptions = {timeout: 10000, enableHighAccuracy: true, maximumAge: 0};

    return {
      getPosition: function () {
        var loc = [null, null];
        var locSet = $q.defer();
        return $ionicPlatform.ready()
          .then(function () {
            navigator.geolocation.getCurrentPosition(onSuccess, onError, positionOptions);
            return locSet.promise.then(function () {
              return loc;
            })
          });
        function onSuccess(coords) {
          loc[0] = coords.coords.latitude;
          loc[1] = coords.coords.longitude;
          locSet.resolve();
        }

        function onError(error) {
          loc = [38, 85];
          locSet.resolve();
        }
      },
      
      setPosition: function () {
         
      }
    }
  })

  .service('Weather', function ($http) {

    return ({
      getCurrent: getCurrent
    });


    function getCurrent(lat, lng) {
      var baseUrl = "https://api.forecast.io/forecast/bbdee2e597ea20b7dab870ccf6851838/";
      //TODO work on these damn responses
      var request = $http({
        cache: true,
        method: 'get',
        url: baseUrl + lat + "," + lng,
        params: {
          exclude: ['minutely', 'hourly'],
        }
      });
      return request;
    }

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

  .factory('Chats', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
      id: 0,
      name: 'Ben Sparrow',
      lastText: 'You on your way?',
      face: 'img/ben.png'
    }, {
      id: 1,
      name: 'Max Lynx',
      lastText: 'Hey, it\'s me',
      face: 'img/max.png'
    }, {
      id: 2,
      name: 'Adam Bradleyson',
      lastText: 'I should buy a boat',
      face: 'img/adam.jpg'
    }, {
      id: 3,
      name: 'Perry Governor',
      lastText: 'Look at my mukluks!',
      face: 'img/perry.png'
    }, {
      id: 4,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/mike.png'
    }];

    return {
      all: function () {
        return chats;
      },
      remove: function (chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function (chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      }
    };
  });
