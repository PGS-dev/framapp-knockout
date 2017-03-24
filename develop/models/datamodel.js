var DataModel = function (getJSON, map) {   // used dependency injection DataModel($.getJSON, $.map)

    // self.isReady = ko.observable(false);

    // self.getIsReady = function() {
    //     self.isReady();
    // };

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

    var filterProducts = function (filter, ourArray) {
        var outArr = [];
        map(ourArray, function (elem) {
            if (elem == filter) {
                outArr.push(elem);
            };
        });
        return outArr;
    };

    // var getDetails = function (jsonFile, ourArray) {
    //     getJSON(jsonFile, function (json) {
    //         var firstJSON = json.products.guid;
    //         map(firstJSON, function (elem) {
    //             ourArray.push(elem);
    //             DataModel.prototype.isDetReady(true);
    //         });
    //         // console.log(ourArray());
    //     });
    // };

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