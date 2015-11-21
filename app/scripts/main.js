
'use strict';
require.config({
    baseUrl: 'scripts',
    paths: {
        'app': 'app',
        'angular': '../lib/angular/angular',
        'angular-route': '../lib/angular-route/angular-route',
        'angular-bootstrap': '../lib/angular-bootstrap/ui-bootstrap-tpls',
        'angular-nicescroll': '../lib/angular-nicescroll/angular-nicescroll',
        'jquery': '../lib/jquery/dist/jquery',
        'jquery-nicescroll': '../lib/jquery.nicescroll/jquery.nicescroll',
        'jquery-ui': '../lib/jquery-ui/jquery-ui',
        'bootstrap': '../lib/bootstrap/dist/js/bootstrap'
    },
    shim: {
        'app': {
            deps: ['angular', 'angular-route', 'angular-bootstrap', 'angular-nicescroll', 'bootstrap', 'jquery-ui']
        },
        'angular-route': {
            deps: ['angular']
        },
        'angular-bootstrap': {
            deps: ['angular']
        },
        'angular-nicescroll': {
            deps: ['angular', 'jquery', 'jquery-nicescroll']
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'jquery-ui': {
            deps: ['jquery']
        },
        'jquery-fancybox': {
            deps: ['jquery']
        }
    }
});

require(['app'], function(app){
    angular.bootstrap(document, ['app']);
});
