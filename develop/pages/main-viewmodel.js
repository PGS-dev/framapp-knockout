'use strict';

var MainViewModel = function () {
    var self = this;
    self.navigation = new NavigationViewModel();
    self.products = new ProductsViewModel();

    /* -- SAMMY - PLUGIN FOR ROUTING -- */
    Sammy(function(){
        this.get('#:home-promoted', function(){
            self.products.categorizedProducts.removeAll(); // clear collection of product by category
            self.products.chosenProduct(null); // hide chosen product view
            self.products.isPromoVisible(true); // show promoted products from all categories
        });

        this.get('#:category', function(){
            self.products.categorizedProducts.removeAll(); // clean observable array from other
            self.products.pcdm = new ProductsCategorizedDataModel($.getJSON, $.map);
            self.products.pcdm.items(self.products.productsJson, self.products.categorizedProducts, this.params.category);
            self.products.chosenProduct(null); // category is chosen so delete Details from UI
            self.products.isPromoVisible(false); // make home-promoted view invisible
        });

        this.get('#:category/:title', function(){
            self.products.categorizedProducts.removeAll(); // removes categorized ProductCards from UI, Details of product stays in UI
            self.products.chosenProduct(this.params.title); // shows card with chosen product title
            self.products.isPromoVisible(false); // make home-promoted view invisible
        });

        this.get('', function() {
            this.app.runRoute('get', '#home-promoted');
            var injectedURL = '#home-promoted';
            window.history.pushState({page: 'default'}, injectedURL, injectedURL);
        });
    }).run();
};
