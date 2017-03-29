var MainViewModel = function () {

    var self = this;

    self.nav = new NavViewModel();
    self.products = new ProductsViewModel(self.nav);

    self.goToHome = function () { // back to home-promoted view (by clicking logo)
        self.products.categorizedProducts.removeAll(); // clear collection of product by category
        self.products.chosenProduct(null); // hide chosen product view
        self.products.isPromoVisible(true); // show promoted products from all categories
    };
};
