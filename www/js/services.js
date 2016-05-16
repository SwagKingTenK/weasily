angular.module('starter.services', [])

  .service('Location', function () {
     this.getLoc = function () {
      this.posOptions = {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0
      };
      navigator.geolocation.getCurrentPosition(onSuccess, Error, this.posOptions);
      function onSuccess(pos) {
        loc.push(pos.coords.latitude);
        loc.push(pos.coords.longitude);
        console.log(loc);
      }

      function Error(error) {
        console.log(error);
      }


      return loc;
    }
  })

  .service('Weather', function($http){
    
    return({
      getCurrent: getCurrent
    });
    
 

    function getCurrent(lat, lng) {
      var baseUrl = "https://api.forecast.io/forecast/bbdee2e597ea20b7dab870ccf6851838/";
      //TODO work on these damn responses
      var request = $http({
        method: 'get',
        url: baseUrl + lat + "," + lng,
        params: {
        } 
      });
      return request;
    }
    
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
