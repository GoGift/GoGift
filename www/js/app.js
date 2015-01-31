// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('main', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.factory('Friends', function(){
  //for dealing with local storage
  return  {
    all: function(){
      //get friends list
      var friendsList = window.localStorage['friends'];
      if (friendsList)  {
        return angular.fromJson(friendsList);
      }
      return [];
    },
    save: function(friends)  {
      //saves list of friends
      window.localStorage['friends'] = angular.toJson(friends);
    },
    newFriend: function(f, l, m, d, y){
      return {
        fname: f,
        lname: l,
        month: m,
        day: d,
        year: y
      }
    }
  }
})
.controller('contactsCtrl', ['$scope', 'Friends', '$ionicModal', function($scope, Friends, $ionicModal){
  $scope.contacts = Friends.all();
  $ionicModal.fromTemplateUrl('templates/newFriend.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal
    });
  $scope.openFriendModal = function() {
    $scope.modal.show();
  }
  $scope.closeFriendModal = function()  {
    $scope.modal.hide();
  }
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
}]);
