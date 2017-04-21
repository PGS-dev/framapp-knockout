'use strict';

var shouter = new ko.subscribable(); // defined globally 'post-box' to pas messages between different view models
var mvm = new MainViewModel();

ko.applyBindings(mvm);

/* -- SAMMY - PLUGIN FOR ROUTING -- */
Sammy(function () {

    this.get('#:home-promoted', function () {
        mvm.products.categorizedProducts.removeAll(); // clear collection of product by category
        mvm.products.chosenProduct(null); // hide chosen product view
        mvm.products.isPromoVisible(true); // show promoted products from all categories
    });

    this.get('#:category', function () {
        mvm.products.categorizedProducts.removeAll(); // clean observable array from other
        mvm.products.pcdm = new ProductsCategorizedDataModel($.getJSON, $.map);
        mvm.products.pcdm.items(mvm.products.productsJson, mvm.products.categorizedProducts, this.params.category);
        mvm.products.chosenProduct(null); // category is chosen so delete Details from UI
        mvm.products.isPromoVisible(false); // make home-promoted view invisible
    });

    this.get('#:category/:title', function () {
        mvm.products.categorizedProducts.removeAll(); // removes categorized ProductCards from UI, Details of product stays in UI
        mvm.products.chosenProduct(this.params.title); // shows card with chosen product title
        mvm.products.isPromoVisible(false); // make home-promoted view invisible
    });

    this.get('', function () {
        this.app.runRoute('get', '#home-promoted');
        var injectedURL = '#home-promoted';
        window.history.pushState({ page: 'default' }, injectedURL, injectedURL);
    });

}).run();