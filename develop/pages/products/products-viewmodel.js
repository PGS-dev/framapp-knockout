var ProductsViewModel = function () {
    var self = this;
    self.products = [];
    self.productsList = ko.observableArray(self.products);
    self.productsJson = 'https://frammapp-knockout.firebaseio.com/.json'; //'https://project-5613440220430148247.firebaseio.com/api/v1/categories.json';
    var dm = new DataModel($.getJSON, $.map);
    dm.getProducts(self.productsJson, self.productsList);

<<<<<<< HEAD
    self.filteredProductsList = ko.observableArray();
    // self.filter = ko.observable('promoted');
    // dm.filterProducts(self.filter(), self.productsList);

    self.chosenProduct = ko.observable();
    self.getProduct = function (elem) {
        self.chosenProduct(elem.title);
=======

    self.categorizedProducts = ko.observableArray();
    self.chosenCategory = ko.observable(); // this variable will be able to get message from other through 'shouter' post-box

    shouter.subscribe(function (newValue) { // with global defined 'shouter' we can receive message from other view model
        self.chosenCategory(newValue); // passing message into value observable here...
    }, self, "clickedCategory"); // using 'topic' named when defining message to passing - in other viewModel -> nav

    self.productByCategory = function () {
        self.categorizedProducts.removeAll(); // clean observable array from other

        for (var i = 0; i < self.productsList().length; i++) {

            if (self.productsList()[i].category === self.chosenCategory()) {
                self.categorizedProducts.push(self.productsList()[i]);
            }
        }
        self.chosenProduct(null); // chosing category, delete Details from UI
        return self.categorizedProducts;
>>>>>>> c3ba1bc32a1aef6da729405a36270df3b55a8105
    };

    self.chosenProduct = ko.observable();
    self.getProduct = function () {
        self.chosenProduct(this.title);
        self.categorizedProducts.removeAll(); // removes categorized ProductCards from UI, Details of product stays in UI
    };
};
