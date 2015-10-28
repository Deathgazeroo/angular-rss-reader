(function() {
    'use strict';

    angular
        .module('reader')
        .directive('reader', reader);

    /* @ngInject */
    function reader() {
        // Usage:
        // <div data-reader></div>
        // Creates:
        // RSS feed reader
        var directive = {
            bindToController: true,
            controller: 'ReaderController',
            controllerAs: 'vm',
            templateUrl: 'app/templates/reader.html',
            restrict: 'EA',
            scope: {
            }
        };
        return directive;
    }
})();