define(['app'], function(app){
    'use strict';
    app.directive('fileReader', ['$q', 'apiService', function($q, apiService){
        var slice = Array.prototype.slice;
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function(s, el, atts, ngModel) {
                if (!ngModel) return;
                el.bind('change', function(e) {
                    var el = e.target;

                    slice.call(el.files, 0).map(function(file){
                        var reader = new FileReader();
                        reader.onload = function(e){
                            apiService.post('save-image', {data: e.target.result}).then(function(res){
                                ngModel.$setViewValue(res.data._id);
                            });
                        };
                        reader.readAsBinaryString(file);
                    });
                });
            }
        }
    }]);
});