(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];

function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;

  toBuy.toBuyItems = ShoppingListCheckOffService.getTOBuyItems();

  toBuy.buyItem = function (itemName, itemQuantity, index) {
    console.log(itemName);
    ShoppingListCheckOffService.buyItem(itemName, itemQuantity, index);
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

function AlreadyBoughtController(ShoppingListCheckOffService){
  var boughtItemList = this;

  boughtItemList.boughtItems = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService() {
  var service = this;

  var toBuyItems = [
    {
      name: 'cookies',
      quantity: 11
    },
    {
      name: 'biscut',
      quantity: 110
    },
    {
      name: 'apricot',
      quantity: 10
    },
    {
      name: 'mango',
      quantity: 10
    },
    {
      name: 'currant',
      quantity: 10
    }
  ];
  var boughtItems = [];

  service.buyItem = function (itemName, quantity, itemIndex) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      boughtItems.push(item);
      toBuyItems.splice(itemIndex, 1);
    };
  service.getTOBuyItems = function () {
      return toBuyItems;
  };
  service.getBoughtItems = function () {
        return boughtItems;
  };
}
})();
