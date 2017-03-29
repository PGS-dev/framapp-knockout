var NavViewModel = function () {
    var self = this;
    self.categoriesList = ko.observableArray();
    self.categoriesJson = 'https://frammapp-knockout.firebaseio.com/.json'; //'https://project-5613440220430148247.firebaseio.com/api/v1/categories.json';
    var dm = new DataModel($.getJSON, $.map);
    dm.categories(self.categoriesJson, self.categoriesList);

    self.ourCategory = ko.observable(); // message variable which want to pass to another view model (products)

    self.ourCategory.subscribe(function(newValue){  // send observable variable to
        shouter.notifySubscribers(newValue, 'clickedCategory'); // the 'topic' named shouter post-box
    });

    self.getCategory = function () {
        self.ourCategory(this.toLowerCase());
    };
};