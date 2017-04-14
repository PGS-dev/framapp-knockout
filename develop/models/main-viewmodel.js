'use strict';

var MainViewModel = function () {

    var self = this;

    self.nav = new NavViewModel();
    self.products = new ProductsViewModel(self.nav);

    self.goToHome = function () { // back to home-promoted view (by clicking logo)
        location.hash = 'home-promoted';
    };

    // self.chosenCategoryId = ko.observable();


    self.updateCategory = function(model) {
        var idOfChoosen = self.nav.ourCategoryId(),
            changedCategoryTitle = self.products.chosenCategory();


        $.ajax({
            url: 'https://frammapp-knockout.firebaseio.com/categories/'+changedCategoryTitle+'.json',
            type: "PUT",
            dataType: "json",
            contentType: "application/json",
            data: ko.toJSON(model),
            success: function (data) {
                console.log('succes in editing Category id: '+idOfChoosen+', category title: '+changedCategoryTitle);
                // model.isEdit(false);
            },
            error: function (err) {
                alert('Error');
            }
        });
    };

    self.updateProduct = function(model) {
        $.ajax({
            url: 'https://frammapp-knockout.firebaseio.com/categories/'+self.products.chosenProduct()+'.json',
            type: "PUT",
            dataType: "json",
            contentType: "application/json",
            data: ko.toJSON(model),
            success: function (data) {
                console.log('succes in editing Product');
                // model.isEdit(false);
            },
            error: function (err) {
                alert('Error');
            }
        });
    };


};
