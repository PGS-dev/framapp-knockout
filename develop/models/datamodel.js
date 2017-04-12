'use strict';

var DataModel = function (getJSON, map) {   // used dependency injection DataModel($.getJSON, $.map)
    var self = this;

    self.categories = function (jsonFileUrl, categoriesArray) {
        getJSON(jsonFileUrl, function (json) {
            var firstJSON = json.categories;
            map(firstJSON, function (elem) {
                categoriesArray.push(elem.title);
                //DataModel.isCategoriesReady(true);
                self.isCategoriesReady(true);
            });
            // console.log(ourArray());
        });
    };

    self.items = function (jsonFileUrl, categoriesArray) {
        getJSON(jsonFileUrl, function (json) {
            var firstJSON = json.products;
            map(firstJSON, function (elem) {
                categoriesArray.push(elem);
                //DataModel.isProductReady(true);
                self.isProductReady(true);
            });
            // console.log(ourArray());
        });
    };

    // return {
    //     categories: categories,
    //     items: items
    // }

    // self.isCategoriesReady = ko.observable(false);
    // self.isProductReady = ko.observable(false);
    // self.isDetReady = ko.observable(false);
};

// DataModel.isCategoriesReady = ko.observable(false);
// DataModel.isProductReady = ko.observable(false);
// DataModel.isDetReady = ko.observable(false);

