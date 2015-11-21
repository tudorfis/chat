define([], function(){
    'use strict';
    var isDev = (window.location.hostname.indexOf('localhost') != -1);
    return (isDev ?
        {
            socketUrl: 'localhost:3000',
            defaultLanguage: 'en'
        }
            :
        {
            socketUrl: '',
            defaultLanguage: ''
        }
    )
});