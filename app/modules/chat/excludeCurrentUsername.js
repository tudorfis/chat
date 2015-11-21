define(['app'], function(app) {
    'use strict';
    app.filter('excludeCurrentUsername', ['$rootScope',
        function($rootScope){
            return function(users) {
                var rs = $rootScope,
                    filtered = {};
                angular.forEach(users, function(u, username) {
                    if (rs.identity && (username != rs.identity.username)) {
                        filtered[username] = u;
                    }
                });
                return filtered;
            };
        }
    ])
});
