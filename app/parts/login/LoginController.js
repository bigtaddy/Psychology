/**
 * Created by Mike on 16.08.15.
 */

(function (global, ng) {
    'use strict';

    function LoginController($scope, $location) {

        $scope.role = 'user';
        $scope.userData = {
            password: '',
            fullName: '',
            group: ''
        };

        $scope.login = function login() {
            if($scope.role === 'admin') {
                if(AdminAccount.password === $scope.userData.password) {
                    $scope.userData.fullName = 'администратор';
                    authorize();
                }
            } else {
                authorize();
            }

        };


        function authorize() {
            global.Permissions.userData = $scope.userData;
            global.Permissions.role = $scope.role;
            global.sessionStorage = global.Permissions.role;
            $location.url('/');
        }


    }


    app.controller('LoginController', LoginController);


}(window, angular));