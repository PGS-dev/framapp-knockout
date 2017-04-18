'use strict';

var NavigationViewModel = function () {
    var self = this;

    self.ndm = new NavigationDataModel($.getJSON, $.map);
    self.categoriesList = ko.observableArray();
    self.categoriesJson = 'https://frammapp-knockout.firebaseio.com/.json'; //'https://project-5613440220430148247.firebaseio.com/api/v1/categories.json';
    self.ndm.categories(self.categoriesJson, self.categoriesList);
    self.ourCategory = ko.observable(); // message variable which want to pass to another view model (products)
    // Shouter - wzor wysylania zmiennej
    self.ourCategory.subscribe(function(selectedCategory) {  // send observable variable to
        shouter.notifySubscribers(selectedCategory, 'clickedCategory'); // the 'topic' named shouter post-box
    });
    self.getCategory = function () {
        self.ourCategory(this.toLowerCase());
    };
};

