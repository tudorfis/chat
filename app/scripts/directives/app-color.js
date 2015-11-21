define(['app'], function(app){
    'use strict';
    app.directive('appColor', [
        function() {
            return function(s, el, atts) {
                el.css({'color': atts.appColor});
            }
        }
    ])
});