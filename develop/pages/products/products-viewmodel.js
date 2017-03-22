var ProductsViewModel = function (filter) {
    var self = this;
    self.products = [];
    self.productsList = ko.observableArray(self.products);
    self.productsJson = 'https://frammapp-knockout.firebaseio.com/.json'; //'https://project-5613440220430148247.firebaseio.com/api/v1/categories.json';

    self.filter = ko.observable('promoted');
    var dm = new DataModel($.getJSON, $.map);
    dm.getProducts(self.productsJson, self.productsList);
    dm.getProductsFiltered(self.filter(), true);

    self.chosenProduct = ko.observable();
    self.getProduct = function(elem) {
        self.chosenProduct(elem.guid);
    };

 
    
    self.resetFilter = function() {
        self.filter = ko.observable('');
        dm.getProducts(self.productsJson, self.productsList);
        dm.getProductsFiltered(self.filter(), true);
    };

};
