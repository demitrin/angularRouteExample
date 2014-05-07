var testApp = angular.module('testApp', ['ngRoute']).
    config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'templates/loginWithFacebook.html'
            })
            .when('/accessToken', {
                templateUrl: 'templates/subView1.html'
            })
            .when('/name', {
                templateUrl: 'templates/subView2.html'
            })
            .otherwise({redirectTo: '/'});
    });

var initTestApp = function (accessToken) {

    testApp2 = angular.module('testApp2', []);
    testApp2.value('accessToken', accessToken);
    testApp2.value('name', 'Demitri Nava')
    testApp2.factory('simpleFactory', ['accessToken', 'name', function (accessToken, name) {
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
    }]);

    testApp2.controller('testController', function ($scope, simpleFactory) {
        $scope.service = simpleFactory;
    });
    window.location = '#/accessToken';
};
