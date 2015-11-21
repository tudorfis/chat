define(['app'], function(app){
    'use strict';
    app.service('apiService', ['$http', '$q', '$rootScope', function($http, $q, $rootScope) {

        var self = this,
            rs = $rootScope;

        this.get = function(method, data, headers) {
            var deffered = $q.defer();
            $http({
                method: 'GET',
                url: '/' + method,
                headers: headers,
                data: data
            }).then(function (res) {
                deffered.resolve(res);
            }, function (err_res) {
                console.error(err_res);
            });
            return deffered.promise;
        };

        this.post = function(method, data, headers) {
            var deffered = $q.defer();
            $http({
                method: 'POST',
                url: '/' + method,
                headers: headers,
                data: data
            }).then(function (res) {
                deffered.resolve(res);
            }, function (err_res) {
                console.error(err_res);
            });
            return deffered.promise;
        };

        this.collection = function(collection) {
            if (!localStorage[collection]) {
                self.get('api/collection/'+collection).then(function(res){
                    rs[collection] = res.data;
                    localStorage[collection] = JSON.stringify(rs[collection]);
                });
            } else {
                rs[collection] = JSON.parse(localStorage[collection]);
            }
        }

    }]);
});