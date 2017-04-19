'use strict';

var ProductsViewModel = function () {
    var self = this;

    self.pdm = new ProductsDataModel($.getJSON, $.map);
    self.productsList = ko.observableArray();
    self.productsJson = 'https://frammapp-knockout.firebaseio.com/.json'; //'https://project-5613440220430148247.firebaseio.com/api/v1/categories.json';
    self.pdm.items(self.productsJson, self.productsList);
    self.isPromoVisible = ko.observable(true); // to show or hide promoted-home view

    /* -- SHOW COLLECTION OF PRODUCTS BY CATEGORY -- */
    self.categorizedProducts = ko.observableArray();
    self.chosenCategory = ko.observable(); // this variable will be able to get message from other through 'shouter' post-box
    // Shouter - wzor odbierania zmiennej
    shouter.subscribe(function (selectedCategory) { // with global defined 'shouter' we can receive message from other view model
        self.chosenCategory(selectedCategory); // passing message into value observable here...
    }, self, "clickedCategory"); // using 'topic' named when defining message to passing - in other viewModel -> nav
    self.productByCategory = function () {
        location.hash = self.chosenCategory();
    };

    /* -- SHOW DETAILS OF CHOSEN PRODUCT -- */
    self.chosenProduct = ko.observable();
    self.getProduct = function () {
        location.hash = this.category + '/' + this.title; //
    };

    /* -- SAMMY - PLUGIN FOR ROUTING -- */
    Sammy(function(){
        this.get('#:home-promoted', function(){
            self.categorizedProducts.removeAll(); // clear collection of product by category
            self.chosenProduct(null); // hide chosen product view
            self.isPromoVisible(true); // show promoted products from all categories
        });

        this.get('#:category', function(){
            self.categorizedProducts.removeAll(); // clean observable array from other

            // for (var i = 0; i < self.productsList().length; i++) {  // make collection of product from chosen category
            //     if (self.productsList()[i].category === this.params.category) {
            //         self.categorizedProducts.push(self.productsList()[i]);
            //     }
            // }
            self.pcdm = new ProductsCategorizedDataModel($.getJSON, $.map);
            self.pcdm.items(self.productsJson, self.categorizedProducts, this.params.category);

            console.log(self.productsList().length + " - " + Date.now());
            isSammy = true;

            self.chosenProduct(null); // category is chosen so delete Details from UI
            self.isPromoVisible(false); // make home-promoted view invisible
        });

        this.get('#:category/:title', function(){
            self.categorizedProducts.removeAll(); // removes categorized ProductCards from UI, Details of product stays in UI
            self.chosenProduct(this.params.title); // shows card with chosen product title
            self.isPromoVisible(false); // make home-promoted view invisible
        });

        this.get('', function() {
            this.app.runRoute('get', '#home-promoted');
            var injectedURL = '#home-promoted';
            window.history.pushState({page: 'default'}, injectedURL, injectedURL);
        });

    }).run();
};
