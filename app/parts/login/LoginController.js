/**
 * Created by Mike on 16.08.15.
 */

(function (global, ng) {
    'use strict';

    function LoginController($scope, $location) {

        $scope.isLoginSubmit = false;
        $scope.role = 'user';
        $scope.userData = {
            password: '',
            fullName: '',
            group: ''
        };

        $scope.login = function login() {
            if($scope.role === 'admin') {
                if($scope.isPasswordValid()){
                    $scope.userData.fullName = 'Admin';
                    authorize();
                }
                $scope.isLoginSubmit = true;
            } else {
                authorize();
            }

        };

        $scope.isPasswordValid = function isPasswordValid () {
            return AdminAccount.password === $scope.userData.password;
        };

        function authorize() {
            global.Permissions.userData = $scope.userData;
            global.Permissions.role = $scope.role;
            global.Permissions.isLoggedIn = true;

           // global.sessionStorage.setItem('role', global.Permissions.role);
            $location.url('/');
        }
    }

    app.controller('LoginController', LoginController);
}(window, angular));