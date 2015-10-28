(function() {
    'use strict';

    angular
        .module('reader')
        .factory('feedFactory', feedFactory);

    feedFactory.$inject = ['$http'];

    /* @ngInject */
    function feedFactory($http) {
        var feeds = {
        	getFeed : getData
    	}
        return feeds;

        function getData(url) {
        	return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
        }
    }
})();