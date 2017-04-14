'use strict';

var DataModel = function (getJSON, map) {   // used dependency injection DataModel($.getJSON, $.map)

    var categories = function (jsonFileUrl, categoriesArray, categoriesNames) {
        getJSON(jsonFileUrl, function (json) {
            var firstJSON = json.categories;
            categoriesNames.push(Object.keys(firstJSON));

            map(firstJSON, function (elem) {
                categoriesArray.push(elem);

            });
            console.log(categoriesArray());
            // console.log('keys dta...  '+ categoriesNames());
        })
            .done(function () {
                // console.log("first 'category' success");
            })
            .fail(function (jqxhr, textStatus, error) {
                console.log("Request Failed: " + error);
            });
    };

    var items = function (jsonFileUrl, itemsArray) {
        getJSON(jsonFileUrl, function (json) {
            var firstJSON = json.products;
            map(firstJSON, function (elem) {
                itemsArray.push(elem);
            });
            // console.log(ourArray());
        })
            .done(function () {
                // console.log("second 'products' success");
            })
            .fail(function (jqxhr, textStatus, error) {
                console.log("Request Failed: " + error);
            });

    };

    return {
        categories: categories,
        items: items
    }
};

DataModel.isCategoriesReady = ko.observable(false);
DataModel.isProductReady = ko.observable(false);
DataModel.isDetReady = ko.observable(false);

