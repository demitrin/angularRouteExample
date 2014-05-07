var app = angular.module('testApp', ['ngRoute'])
app.config(
    function ($controllerProvider, $provide, $compileProvider, $routeProvider) {

// Since the "shorthand" methods for component
// definitions are no longer valid, we can just
// override them to use the providers for post-
// bootstrap loading.
        console.log("Config method executed.");

// Let's keep the older references.
        app._controller = app.controller;
        app._service = app.service;
        app._factory = app.factory;
        app._value = app.value;
        app._directive = app.directive;

// Provider-based controller.
        app.controller = function (name, constructor) {

            $controllerProvider.register(name, constructor);
            return( this );

        };

// Provider-based service.
        app.service = function (name, constructor) {

            $provide.service(name, constructor);
            return( this );

        };

// Provider-based factory.
        app.factory = function (name, factory) {

            $provide.factory(name, factory);
            return( this );

        };

// Provider-based value.
        app.value = function (name, value) {

            $provide.value(name, value);
            return( this );

        };

// Provider-based directive.
        app.directive = function (name, factory) {

            $compileProvider.directive(name, factory);
            return( this );

        };

// NOTE: You can do the same thing with the "filter"
// and the "$filterProvider"; but, I don't really use
// custom filters.

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
    }
);
var initTestApp = function (accessToken) {

    app.value('accessToken', accessToken);
    app.value('name', 'Demitri Nava')
    app.factory('simpleFactory', ['accessToken', 'name', function (accessToken, name) {
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

    app.controller('testController', function ($scope, simpleFactory) {
        $scope.service = simpleFactory;
    });
    window.location = '#/accessToken';
};
