var testApp = angular.module('testApp', ['ngRoute']).
    config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'templates/loginWithFacebook.html'
            })
            .when('/accessToken', {
                templateUrl: 'templates/subView1.html',
            })
            .when('/name', {
                templateUrl: 'templates/subView2.html',
            })
            .otherwise({redirectTo: '/'});
    });

var initTestApp = function (accessToken) {

    testApp.value('accessToken', accessToken);
    testApp.value('name', 'Demitri Nava')
    testApp.factory('simpleFactory', function (accessToken, name) {
        var accessToken = accessToken
        var name = name;
        var service = {};

        service.accessToken = function () {
            return accessToken
        };

        service.name = function () {
            return name;
        };
        return service
    });

    testApp.controller('testController', function ($scope, simpleFactory) {
        $scope.service = simpleFactory;
    });
    window.location = '#/accessToken';
};
