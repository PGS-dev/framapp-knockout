var ProductsViewModel = function (filter) {
    var self = this;
    self.products = [];
    self.productsList = ko.observableArray(self.products);
    self.productsJson = 'https://frammapp-knockout.firebaseio.com/.json'; //'https://project-5613440220430148247.firebaseio.com/api/v1/categories.json';
    var dm = new DataModel($.getJSON, $.map);
    dm.getProducts(self.productsJson, self.productsList);

    self.filteredProductsList = ko.observableArray();
    // self.filter = ko.observable('promoted');
    // dm.filterProducts(self.filter(), self.productsList);

    self.chosenProduct = ko.observable();
    self.getProduct = function (elem) {
        self.chosenProduct(elem.title);
    };

};
