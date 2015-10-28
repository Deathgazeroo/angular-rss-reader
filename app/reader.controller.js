(function() {
    'use strict';

    angular
        .module('reader')
        .controller('ReaderController', ReaderController);

    ReaderController.$inject = ['feedFactory'];

    /* @ngInject */
    function ReaderController(feedFactory) {
        var vm = this;

    	vm.load = function () {
        	feedFactory.getFeed(vm.url)
        		.then(function (res) {
            		vm.feeds = res.data.responseData.feed.entries;
        		});
    	}
    }

})();