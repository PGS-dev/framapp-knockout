'use strict';

var MainViewModel = function () {
    var self = this;
    self.navigation = new NavigationViewModel();
    self.products = new ProductsViewModel();
};
