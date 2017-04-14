'use strict';

var NavViewModel = function () {
    var self = this;
    self.categoriesList = ko.observableArray();
    self.categoriesKeys = ko.observableArray();
    self.categoriesJson = 'https://frammapp-knockout.firebaseio.com/.json'; //'https://project-5613440220430148247.firebaseio.com/api/v1/categories.json';
    var dm = new DataModel($.getJSON, $.map);
    dm.categories(self.categoriesJson, self.categoriesList, self.categoriesKeys);

    self.ourCategory = ko.observable(); // message variable which want to pass to another view model (admin-product)
    self.ourCategoryId = ko.observable(); ///// extra
    self.ourKeyCategory = ko.observable();

    self.ourCategory.subscribe(function(newValue){  // send observable variable to
        shouter.notifySubscribers(newValue, 'clickedCategory'); // the 'topic' named shouter post-box
    });

    self.getCategory = function () {
        self.ourCategory(this); // in case of 'this' use this title (cause ...getCategory.bind($date) in html)
        // self.ourCategoryId(this.id);
        // self.categoriesKeys();
        console.log('key is named '+ self.categoriesKeys()[this.id]);
    };
};