define(['app'], function(app) {
    'use strict';
    app.filter('array', [
        function(){
            return function(items) {
                var filtered = [];
                angular.forEach(items, function(item, item_id) {
                    filtered.push(item);
                });
                return filtered;
            };
        }
    ])
});
