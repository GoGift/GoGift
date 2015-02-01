// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
app = angular.module('main', ['ionic']);

app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        delete $httpProvider.defaults.headers.common['Content-type'];
    }
])
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
    },
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
  $scope.checkValidity = function()  {
    for(var x = 0; x < arguments.length; x++) {
      if(!(arguments[x])) {
        return false;
      }
    }
    return true;
  }
  $scope.addFriend = function(friend) {
    if ($scope.checkValidity(friend.fname, friend.lname, friend.month, friend.day, friend.year)) {
      $scope.contacts.push(friend);
      Friends.save($scope.contacts);
      $scope.friendmodal.hide();
    };
  }
  $scope.getShipmentData = function(s) {
    console.log(s);
    if($scope.checkValidity(s.l, s.w, s.h, s.weight, s.origin, s.destination, s.value)) {
      var url ='https://stage.shiphawk.com/api/v1/rates/full?api_key=00d73e3f71e1eba908f23e4eb2689d3d';
      var data = '{"from_zip":' + s.origin
      +',"from_type": "residential", "to_zip":"93101", "to_type": "residential", "items":[{"width":"10", "length":"10", "height":"10", "weight": "10", "value":"100", "packed": "true", "id": "50"}]}';
      console.log(data);
       $.post('https://jsonp.nodejitsu.com/?url=' + url, data, function(response){
          alert('pretty awesome, eh? ');
        });
    }
    else  {
      console.log(data);
    }
  }
  //Modal Controls
  $ionicModal.fromTemplateUrl('templates/newFriend.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.friendmodal = modal
    });
  $ionicModal.fromTemplateUrl('templates/ship.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.shippingmodal = modal
    });
  $scope.openFriendModal = function() {
    $scope.friendmodal.show();
  }
  $scope.closeFriendModal = function()  {
    $scope.friendmodal.hide();
  }
  $scope.openShippingModal = function(contact)  {
    $scope.activeContact = contact;
    $scope.shippingmodal.show();
  }
  $scope.closeShippingModal = function()  {
    $scope.shippingmodal.hide();
  }
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
}]);
