"use strict";

module.exports = ({_am,_ng} = __APP)=>{
    _am.controller('HomePageController',function ($scope,$http) {

        $scope.homePageString = 'Home Page';

        var authToken;

        $http.get('/auth.py').then(function(response) {
            authToken = response.headers('A-Token');
            $scope.user = response.data;
        }, function () {
            $scope.status = 'Failed...';
        });

        $scope.saveMessage = function(message) {
            var headers = { 'Authorization': authToken };
            $scope.status = 'Saving...';

            $http.post('/add-msg.py', message, { headers: headers } ).then(function(response) {
                $scope.status = '';
            }).catch(function() {
                $scope.status = 'Failed...';
            });
        };
    });
};
