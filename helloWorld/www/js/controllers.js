angular.module('starter.controllers', ['ionic','ngCordova'])

.controller('DashCtrl', function($scope, $cordovaGeolocation, $ionicLoading, $ionicPlatform) {  
 
        $ionicLoading.show({
            template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
        });
         
        var posOptions = {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0
        };
 
        $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
            $scope.lat  = position.coords.latitude;
            $scope.long = position.coords.longitude;
             $scope.speed = position.coords.speed;
            $ionicLoading.hide(); 
          }, function(err) {
            $ionicLoading.hide();
            console.log(err);
        });
         var watchOptions = {timeout : 3000, enableHighAccuracy: false};
        var watch = $cordovaGeolocation.watchPosition(watchOptions);
  
        watch.then(
              null,
    
            function(err) {
             console.log(err)
            },
    
          function(position) {
              $scope.lat  = position.coords.latitude;
              $scope.long = position.coords.longitude;
             $scope.speed = position.coords.speed;
      }
   );

   watch.clearWatch();
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
