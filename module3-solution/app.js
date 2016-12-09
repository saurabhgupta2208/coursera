(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundList.html',
    scope: {
      found: '<foundItem',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };
  return ddo;
}

FoundItemsDirectiveController.$inject = ['$scope'];
function FoundItemsDirectiveController($scope) {
  var list = this;

  list.isEmpty = function () {
    if(angular.isUndefined($scope.$parent.term) || (list.found!=null && list.found.length>0)){
      return false;
    }else{
      return true;
    }
  };
}

NarrowItDownController.$inject = ['$scope','MenuSearchService'];
function NarrowItDownController($scope, MenuSearchService) {
  var list = this;
  list.term = "";
  list.found = null;
  list.searchTerm = function (){
      $scope.term = list.term;
      MenuSearchService.clear();
      if(null != list.term && list.term !=""){
        var promise = MenuSearchService.getMatchedMenuItems(list.term.trim());
        promise.then(function (response) {
          list.found = response;
        })
      }else{
        list.found = null;
      }
  }

  list.removeItem = function (itemIndex) {
    MenuSearchService.removeItem(itemIndex);
  };
}


// If not specified, maxItems assumed unlimited
MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;

  var foundItems1 = [];
  service.getMatchedMenuItems = function (searchTerm) {
    var response = $http({
        method: "GET",
        url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
        }).then(function (result) {
            // process result and only keep items that match
            for (var i = 0; i < result.data.menu_items.length; i++) {
                  var items = result.data.menu_items[i];
                  var description = items.description;
                  if (description.toLowerCase().indexOf(searchTerm) !== -1) {
                    var item = {
                      short_name: items.short_name,
                      description: description
                    };
                    foundItems1.push(item);
                  }
            }
            // return processed items
            return foundItems1;
        });
  return response;
  }

  service.removeItem = function (itemIndex) {
    foundItems1.splice(itemIndex, 1);
  };

  service.clear = function () {
    foundItems1 = [];
  };
}
})();
