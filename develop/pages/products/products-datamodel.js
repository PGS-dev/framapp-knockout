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
        });
    };

    self.isProductReady = ko.observable(false);
    //self.isDetailReady = ko.observable(false); // for future spinner
};
