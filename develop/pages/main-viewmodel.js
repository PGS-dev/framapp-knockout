'use strict';

var MainViewModel = function () {
    var self = this;
    self.nav = new NavViewModel();
    self.products = new ProductsViewModel(self.nav);
};
