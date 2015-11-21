define(['app'], function(app){
    app.service('identityService', ['$rootScope', function($rootScope) {

        var self = this,
            rs = $rootScope,
            _storage = null;

        this.getIdentity = function() {
            rs.identity = null;
            if (_storage.getItem('identity')) {
                rs.identity = JSON.parse(_storage.identity)
            }
        };

        this.setIdentity = function(identity) {
            rs.identity = identity;
            _storage.setItem('identity', JSON.stringify(identity));
        };

        this.deleteIdentity = function() {
            rs.identity = null;
            _storage.removeItem('identity');
        };

        this.init = function() {
            _storage = sessionStorage;
        };

    }]);
});

