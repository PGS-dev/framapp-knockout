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

    /* -- SHOW DETAILS OF CHOSEN PRODUCT -- */
    self.chosenProduct = ko.observable();
    self.getProduct = function () {
        location.hash = this.category + '/' + this.title;
    };
};
