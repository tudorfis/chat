define(['app'], function(app){
    'use strict';
    app.directive('alertLabel',
        ['$compile', '$rootScope', '$timeout',
        function($compile, $rootScope, $timeout) {
            return {
                restrict: 'E',
                compile: function(el, atts) {
                    return function (s, el, atts) {
                        var rs = $rootScope;

                        rs.setAlert = function(alert_id, alert_class, alert_text) {
                            rs.alert_class = alert_class;
                            rs.alert_text = alert_text;
                            rs[alert_id] = 0;
                            $timeout(function(){
                                rs[alert_id] = 1;
                            }, 3000);
                        };

                        rs[atts.id] = 1;
                        var temp =
                                '<div id="'+ atts.id +'" class="alert" ng-class="$root.alert_class" ng-hide="$root.'+ atts.id +'">' +
                                    '<span ng-bind="$root.alert_text"></span>' +
                                    '<a href="" class="pull-right" ng-click="$root.'+ atts.id +' = 1">'+
                                        '<i class="fa fa-close"></i>'+
                                    '</a>'+
                                '</div>';

                        el.replaceWith($compile(temp)(s));

                    }
                }
            }
        }
    ])
});

