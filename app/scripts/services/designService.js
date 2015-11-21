define(['app'], function(app) {
    'use strict';
    app.service('designService', ['$rootScope', function ($rootScope) {

        var self = this,
            rs = $rootScope,
            _fonts = ["Helvetica", "Roboto Mono", "tinymce-small", "Arial", "Calibri", "Consolas", "courier", "Tahoma", "cursive", "Glyphicons Halfling"];

        this.randomFont = function() {
            return _fonts[Math.floor(Math.random()*_fonts.length)];
        };
    }])
});