define(['app'], function(app){
    'use strict';
    app.service('timeService', ['$rootScope', function($rootScope) {

        var self = this,
            rs = $rootScope;

        this.getTimeObj = function() {
            var now = new Date();
            return {
                h: now.getHours(),
                m: now.getMinutes(),
                s: now.getSeconds()
            };
        };

        this.getTimeStr = function() {
            var timeObj = self.getTimeObj(),
                h = timeObj.h,
                m = timeObj.m;
            if (h.toString().length == 1) {
                h = '0' + h;
            }
            if (m.toString().length == 1) {
                m = '0' + m;
            }
            return h + ':' + m;
        }

        this.init = function() {};

    }]);
});