'use strict';

var ProductsCategorizedDataModel = function (getJSON, map) {   // used dependency injection DataModel($.getJSON, $.map)
    var self = this;

    self.items = function (jsonFileUrl, categorizedProductsArray, selectedCategory) {
        getJSON(jsonFileUrl, function (json) {
            var firstJSON = json.products;
            map(firstJSON, function (elem) {
                if (elem.category === selectedCategory) {
                    categorizedProductsArray.push(elem);
                }
            });
            self.isProductReady(true);

            console.log("-" + self.isProductReady().toString());
            console.log("-" + categorizedProductsArray().length);
            console.debug(Date.now());
        });
    };

    self.isProductReady = ko.observable(false);
    //self.isDetailReady = ko.observable(false); // for future spinner
};
