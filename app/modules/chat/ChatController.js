define(['app'], function(app){
    'use strict';
    app.controller('ChatController',
        ['$scope', '$rootScope', '$timeout', 'focus', 'identityService', 'timeService', 'designService', 'apiService',
        function($scope, $rootScope, $timeout, focus, identityService, timeService, designService, apiService) {

            var s = $scope,
                rs = $rootScope;

            var _initPmUsername = function(username) {
                if (!s.pm_users[username]) {
                    s.pm_users[username] = {
                        is_visible: true,
                        messages: []
                    }
                } else {
                    s.pm_users[username].is_visible = true;
                }
            };

            s.checkIdentity = function() {
                identityService.getIdentity();
                return (rs.identity !== null);
            };

            s.checkActiveUser = function(username) {
                return (Object.keys(s.users).indexOf(username) != -1);
            };

            s.checkCurrentUser = function(username) {
                if (rs.identity) {
                    return (username == rs.identity.username);            
                }
                return false;
            };

            s.saveIdentity = function() {
                if (!s.identityData.username) {
                    rs.setAlert("alert1", "alert-danger", "Introduceti nume de utilizator !");
                } else if (!s.identityData.username.match(/^[a-zA-Z0-9-_]+$/g)) {
                    rs.setAlert("alert1", "alert-danger", "Numele poate contine doar litere si numere, fara bara de spatiu sau alte caractere speciale");
                } else {
                    s.identityData.username = s.identityData.username.toLowerCase();
                    rs.socket.emit('saveIdentity', s.identityData, function(data){
                        if (data.is_error && data.error_type == 'is_taken') {
                            rs.setAlert("alert1", "alert-danger", "Acest nume este deja luat ! Incearca alta combinatie, eventual foloseste si cifre precum: 'andrei143'");
                        } else {
                            identityService.setIdentity(s.identityData);
                            focus('dataMsg.message');
                            s.scrollBottomMessages()
                        }
                    });
                }
            };

            s.scrollBottomMessages = function() {
                var csPm = $('.current_state_pm'),
                    csP = $('.current_state_public');
                csPm.scrollTop(csPm.prop('scrollHeight'));
                csP.scrollTop(csP.prop('scrollHeight'));
            };

            s.uiUsers = function() {
                var $pmUsers = $('.pm_users');
                if (!$pmUsers.data('sortable')) {
                    $pmUsers.sortable();
                }
            };

            s.randomDesign = function() {
                rs.fontFamily = designService.randomFont();
            };

            s.sendMessage = function() {
                if (s.dataMsg.message || s.dataMsg.image_id) {
                    s.dataMsg = Object.assign(s.dataMsg, {
                        time: timeService.getTimeObj(),
                        time_str: timeService.getTimeStr(),
                        username: rs.identity.username,
                        identity: rs.identity,
                        pm_username: s.pm_username,
                        current_state: s.current_state
                    });
                    rs.socket.emit('setChatMessage', s.dataMsg);
                    s.dataMsg = {};
                }
            };

            s.openPrivateMessage = function(username) {
                _initPmUsername(username);
                s.pm_username = username;
                s.current_state = 'pm';
                focus('dataMsg.message');
                s.uiUsers();
            };

            s.closePrivateMessage = function(username) {
                s.pm_users[username].is_visible = false;
                if (s.pm_username == username) {
                    s.current_state = 'public';
                }
            };

            s.setPublicMessages = function(){
                s.current_state = 'public';
                s.pm_username = '';
                s.scrollBottomMessages();
            };

            s.init = function() {

                s.randomDesign();

                identityService.init();
                identityService.getIdentity();

                rs.socket.emit('getUsers');
                rs.socket.emit('getMessages');

                apiService.collection('cities');
                apiService.collection('counties');

                if (!rs.identity) {
                    focus('username');
                } else {
                    rs.socket.emit('saveUsername', rs.identity, function(){});
                    focus('dataMsg.message');
                }

                $timeout(function(){
                    s.scrollBottomMessages();
                }, 1000);
            };
            s.init();

            rs.socket.on('sendUsers', function(data){
                s.users = data;
                s.$apply();
            });

            rs.socket.on('sendMessages', function(data){
                s.messages = [];
                s.pm_users = {};
                s.current_state = 'public';
                angular.forEach(data, function(msg){
                    if (msg.current_state == 'public') {
                        s.messages.push(msg);
                    } else if (msg.current_state == 'pm') {

                        if (rs.identity) {
                            /** was written to me */
                            if (msg.pm_username == rs.identity.username) {
                                _initPmUsername(msg.username);
                                s.pm_users[msg.username].messages.push(msg);

                            /** I written to */
                            } else if (msg.username == rs.identity.username) {
                                _initPmUsername(msg.pm_username);
                                s.pm_users[msg.pm_username].messages.push(msg);
                            }
                        }
                        
                    }
                });
                s.$apply();
            });

            rs.socket.on('getChatMessage', function(data){
                var current_state_temp = s.current_state;
                s.current_state = data.current_state;
                if (s.current_state == 'public') {
                    s.messages.push(data);
                } else if (s.current_state == 'pm') {

                    /** if received message from */
                    if (s.checkCurrentUser(data.pm_username)) {
                        s.pm_username = data.username;
                        s.openPrivateMessage(s.pm_username);
                        s.pm_users[s.pm_username].messages.push(data);

                    /** if sent message to */
                    } else if (s.checkCurrentUser(data.username)) {
                        s.openPrivateMessage(data.pm_username);
                        s.pm_users[data.pm_username].messages.push(data);

                    /** cary on */
                    } else {
                        s.current_state = current_state_temp;
                    }
                }
                s.$apply();
                s.scrollBottomMessages();
            });

        }]);
});