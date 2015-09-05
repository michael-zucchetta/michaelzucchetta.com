define(['premain'], function(app) {
	'use strict';
	app.config(['$routeProvider', '$locationProvider', '$controllerProvider', '$provide', '$compileProvider', function($routeProvider, $locationProvider, $controllerProvider, $provide, $compileProvider) {
	 
		//http://www.bennadel.com/blog/2554-loading-angularjs-components-with-requirejs-after-application-bootstrap.htm
  		// Let's keep the older references.
		app._controller = app.controller;
		app._service = app.service;
		app._factory = app.factory;
		app._value = app.value;
		app._directive = app.directive;

		// Provider-based controller.
		app.controller = function( name, constructor ) {
		
		    $controllerProvider.register( name, constructor );
		    return( this );

                };

                // Provider-based service.
                app.service = function( name, constructor ) {

                    $provide.service( name, constructor );
                    return( this );

                };

                // Provider-based factory.
                app.factory = function( name, factory ) {

                    $provide.factory( name, factory );
                    return( this );

                };

                // Provider-based value.
                app.value = function( name, value ) {

                    $provide.value( name, value );
                    return( this );

                };

                // Provider-based directive.
                app.directive = function( name, factory ) {

                    $compileProvider.directive( name, factory );
                    return( this );

                };

                // NOTE: You can do the same thing with the "filter"
                // and the "$filterProvider"; but, I don't really use
                // custom filters.
		
	}]);


	angular.element().ready(function() {
		angular.bootstrap(document, ['common']);
	});
	
	return app;
});
