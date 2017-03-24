var MainViewModel = function () {

    var self = this;

    self.nav = new NavViewModel();
    self.products = new ProductsViewModel(self.nav);

    // self.isVisibleNow = ko.observable(true);
    // self.showDetails = function() {
    //     console.log('root function OK');
    //     self.isVisibleNow(false);
    // }



};







