'use strict';

var MainViewModel = function () {
    var self = this;
    self.navigation = new NavigationViewModel();
    self.products = new ProductsViewModel();
};

/* -- SAMMY - PLUGIN FOR ROUTING -- */
Sammy(function () {

    this.get('#:home-promoted', function () {
        self.categorizedProducts.removeAll(); // clear collection of product by category
        self.chosenProduct(null); // hide chosen product view
        self.isPromoVisible(true); // show promoted products from all categories
    });

    this.get('#:category', function () {
        self.categorizedProducts.removeAll(); // clean observable array from other
        self.pcdm = new ProductsCategorizedDataModel($.getJSON, $.map);
        self.pcdm.items(self.productsJson, self.categorizedProducts, this.params.category);
        self.chosenProduct(null); // category is chosen so delete Details from UI
        self.isPromoVisible(false); // make home-promoted view invisible
    });

    this.get('#:category/:title', function () {
        self.categorizedProducts.removeAll(); // removes categorized ProductCards from UI, Details of product stays in UI
        self.chosenProduct(this.params.title); // shows card with chosen product title
        self.isPromoVisible(false); // make home-promoted view invisible
    });

    this.get('', function () {
        this.app.runRoute('get', '#home-promoted');
        var injectedURL = '#home-promoted';
        window.history.pushState({ page: 'default' }, injectedURL, injectedURL);
    });

}).run();
