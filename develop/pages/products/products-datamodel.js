'use strict';

var ProductsDataModel = function (getJSON, map) {   // used dependency injection DataModel($.getJSON, $.map)
    var self = this;

    self.items = function (jsonFileUrl, productsArray) {
        getJSON(jsonFileUrl, function (json) {
            var firstJSON = json.products;
            map(firstJSON, function (elem) {
                productsArray.push(elem);
            });
            self.isProductReady(true);

            self.receiver = ko.observable();
            shouter.subscribe(function (val) { // with global defined 'shouter' we can receive message from other view model
                self.receiver(val); // passing message into value observable here...
            }, self, "ravioli");

            console.log(self.receiver());
            if (self.receiver() == true) {
                console.log('done');
            }
            else         {
                console.log('not ravioli');
            }
        });
    };

    self.isProductReady = ko.observable(false);
    //self.isDetailReady = ko.observable(false); // for future spinner
};
