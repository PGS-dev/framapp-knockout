var DataModel = function (getJSON, map) {   // used dependency injection DataModel($.getJSON, $.map)


    var categories = function (jsonFileUrl, categoriesArray) {
        getJSON(jsonFileUrl, function (json) {
            var firstJSON = json.categories;
            map(firstJSON, function (elem) {
                categoriesArray.push(elem.title);
                DataModel.isCategoriesReady(true);
            });
            // console.log(ourArray());
        });
    };

    var items = function (jsonFileUrl, categoriesArray) {
        getJSON(jsonFileUrl, function (json) {
            var firstJSON = json.products;
            map(firstJSON, function (elem) {
                categoriesArray.push(elem);
                DataModel.isProductReady(true);
            });
            // console.log(ourArray());
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

