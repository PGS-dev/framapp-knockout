var DataModel = function (getJSON, map) {   // used dependency injection DataModel($.getJSON, $.map)


    var getCategories = function (jsonFile, ourArray) {
        getJSON(jsonFile, function (json) {
            var firstJSON = json.categories;
            map(firstJSON, function (elem) {
                ourArray.push(elem.title);
                DataModel.prototype.isCatReady(true);
            });
            // console.log(ourArray());
        });
    };

    var filterCategories = function () {

    };

    var getProducts = function (jsonFile, ourArray) {
        getJSON(jsonFile, function (json) {
            var firstJSON = json.products;
            map(firstJSON, function (elem) {
                ourArray.push(elem);
                DataModel.prototype.isProdReady(true);
            });
            // console.log(ourArray());
        });
    };

    return {
        getCategories: getCategories,
        getProducts: getProducts,
        filterProducts: filterProducts
        //getDetails: getDetails
    }
};

DataModel.prototype.isCatReady = ko.observable(false);
DataModel.prototype.isProdReady = ko.observable(false);
DataModel.prototype.isDetReady = ko.observable(false);

