'use strict';

var NavigationDataModel = function (getJSON, map) {   // used dependency injection DataModel($.getJSON, $.map)
    var self = this;

    self.categories = function (jsonFileUrl, categoriesArray) {
        getJSON(jsonFileUrl, function (json) {
            var firstJSON = json.categories;
            map(firstJSON, function (elem) {
                categoriesArray.push(elem.title);
            });
            self.isCategoriesReady(true);
        });
    };

    self.isCategoriesReady = ko.observable(false);
    //self.isDetailReady = ko.observable(false);
};
