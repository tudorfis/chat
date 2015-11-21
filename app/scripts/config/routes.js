define([], function(){
    'use strict';
    return {
        defaultRoutePath: '/',
        routes: {
            '/': {
                templateUrl: '../modules/chat/chat.html',
                dependencies: [
                    '../modules/chat/ChatController',
                    '../modules/chat/excludeCurrentUsername',
                    '../modules/identity/identityService',
                    'services/timeService',
                    'services/designService',
                    'services/apiService',
                    'filters/arrayFilter',
                    'directives/app-color',
                    'directives/event-focus',
                    'directives/alert-label',
                    'directives/file-reader'

                ]
            }
        }
    };
});