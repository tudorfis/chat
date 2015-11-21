
define([
    'config/config',
    'config/routes',
    'services/dependencyResolverFor'
], function(configConstant, routesConfig, dependencyResolverFor){
    'use strict';

    var app = angular.module('app', [
        'ngRoute',
        'ui.bootstrap',
        'angular-nicescroll'
    ]);

    app.constant('config', configConstant);
    app.config([
        '$routeProvider',
        '$locationProvider',
        '$controllerProvider',
        '$compileProvider',
        '$filterProvider',
        '$provide',

        function($routeProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {

            app.controller = $controllerProvider.register;
            app.directive  = $compileProvider.directive;
            app.filter     = $filterProvider.register;
            app.factory    = $provide.factory;
            app.service    = $provide.service;

            if (routesConfig.routes !== undefined) {
                angular.forEach(routesConfig.routes, function(route, path) {
                    $routeProvider.when(path, {
                        templateUrl: route.templateUrl,
                        resolve: dependencyResolverFor(route.dependencies)
                    });
                });
            }

            if (routesConfig.defaultRoutePaths !== undefined) {
                $routeProvider.otherwise({
                    redirectTo: routesConfig.defaultRoutePaths
                });
            }
        }
    ]);

    app.run(function($rootScope, config){
        var rs = $rootScope;
        rs.socket = io(config.socketUrl);
        rs.niceOptions = {
            cursorcolor: '#337AB7',
            cursorwidth: '10px',
            cursoropacitymin: '0.2',
            cursoropacitymax: '0.5'
        };
    });

    return app;
});