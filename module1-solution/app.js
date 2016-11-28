(function () {
'use strict';

angular.module('LunchCheckerApp', [])
.controller('LunchCheckerController', LunchCheckerController);

LunchCheckerController.$inject = ['$scope'];

function LunchCheckerController($scope) {
  $scope.lunchItem = "";
  $scope.customStyle = {};
  $scope.displayMsg = function () {
    var state = findMsg($scope.lunchItem);
    $scope.lunchItem = state.message;
    $scope.customStyle.style = {"color":state.color};
  };
}

function findMsg(string){
  var state = "";
  if(string!=null && string.length>0)
  {
    var noOfItem = string.split(",").length;
    if(noOfItem <= 3 )
    {
      state = {
             message: "Enjoy!",
             color: 'green'
            };
    }
    else if(noOfItem > 3)
    {
      state = {
             message: "Too much!",
             color: 'red'
            };
    }
  }
  else
  {
    state = {
           message: "Please enter data first",
           color: ''
          };
  }
  return state;
}

})();
