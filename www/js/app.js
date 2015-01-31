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
  //Table sort function
  $scope.birthdaySort = function(c)  {
    var m = c.month - 1; //month index starts with 0
    var d = c.day;
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    var firstDate = new Date();
    //add one to year if date has already passed
    var secondDate = (m > firstDate.getMonth() || m === firstDate.getMonth() && d > firstDate.getDate() ? new Date(firstDate.getFullYear(), m,d) : new Date(firstDate.getFullYear() + 1, m,d));
    var diffDays = - Math.floor((firstDate.getTime() - 
                   secondDate.getTime())/(oneDay));
    return diffDays;
  }
  //Input validation & adding
  $scope.addFriend = function(friend) {
    $scope.checkValidity = function(){
      if (friend.fname && friend.lname && friend.month && friend.day && friend.year) {
        return true;
      }
      else  {
        return false;
      }
    }
    if ($scope.checkValidity()) {
      $scope.contacts.push(friend);
      Friends.save($scope.contacts);
      $scope.modal.hide();
    };
  }
  //Modal controls
  $ionicModal.fromTemplateUrl('templates/newFriend.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal
    });
  $scope.openFriendModal = function() {
    console.log(Friends.all());
    $scope.modal.show();
  }
  $scope.closeFriendModal = function()  {
    $scope.modal.hide();
  }
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
}]);
