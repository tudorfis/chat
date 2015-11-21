define(['app'], function(app){
    'use strict';
    app.factory('focus', ['$timeout', '$window', function($timeout, $window) {
        return function (id) {
            $timeout(function () {
                var element = $window.document.getElementById(id);
                if (element)
                    element.focus();
            });
        };
    }]);
    app.directive('eventFocus', ['focus', function(focus) {
        return function (scope, elem, attr) {
            elem.on(attr.eventFocus, function () {
                focus(attr.eventFocusId);
            });
            scope.$on('$destroy', function () {
                element.off(attr.eventFocus);
            });
        };
    }]);
});