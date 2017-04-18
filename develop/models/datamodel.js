'use strict';

var DataModel = function (getJSON, map) {   // used dependency injection DataModel($.getJSON, $.map)
    var self = this;

    self.categories = function (jsonFileUrl, categoriesArray) {
        getJSON(jsonFileUrl, function (json) {
            var firstJSON = json.categories;
            map(firstJSON, function (elem) {
                categoriesArray.push(elem.title);
                self.isCategoriesReady(true);

            });
        });
    };

    self.items = function (jsonFileUrl, categoriesArray) {
        getJSON(jsonFileUrl, function (json) {
            var firstJSON = json.products;
            map(firstJSON, function (elem) {
                categoriesArray.push(elem);
                self.isProductReady(true);
            });
        });
    };

    self.isCategoriesReady = ko.observable(false);
    self.isProductReady = ko.observable(false);
    self.isDetReady = ko.observable(false);
};
