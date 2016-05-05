(() => {
	let module = angular.module('michaelzucchetta', ['ngRoute', 'angularCSS']);
	class AngularBootstrap implements ng.IAngularBootstrapConfig {
		constructor($routeProvider, $locationProvider, $controllerProvider, $provide, $compileProvider, $componentProvider) {
			let app: ng.IModule = module;
			// http://www.bennadel.com/blog/2554-loading-angularjs-components-with-requirejs-after-application-bootstrap.htm
                        // keep the older references.
			// app._controller = app.controller;
                        // app._service = app.service;
                        // app._factory = app.factory;
                        // app._value = app.value;
                        // app._directive = app.directive;
			angular.extend(app, {
				controller: (name: string, constructorController: Function) => {
					$controllerProvider.register(name, constructorController);
					return app;
				}
			});
				/*
                        // Provider-based controller.
                        app.controller = (name: string, constructorController: Function) => {
                                $controllerProvider.register(name, constructorController);
                                return app;
			};

                        // Provider-based service.
                        app.service = (name: string, constructor: Function) => {
                                $provide.service(name, constructor);
                                return app;
			};

                        // Provider-based factory.
                        app.factory = (name: string, factory: any[]) => {
                                $provide.factory(name, factory);
                                return app;
			};

                        // Provider-based value.
                        app.value = (name: string, value: any) => {
                                $provide.value(name, value);
                                return app;
			};

                        // Provider-based directive.
                        app.directive = (name: string, factory: ng.IDirectiveFactory) => {
                                $compileProvider.directive(name, factory);
                                return app;
			};

			app.component = (name: string, options: ng.IComponentOptions) => {
				$componentProvider.component(name, options);
				return app;
			};

                        // NOTE: You can do the same thing with the "filter"
                        // and the "$filterProvider"; but, I don't really use
                        // custom filters.
			*/
		}
	};
	
	AngularBootstrap.$inject = ['$routeProvider', '$locationProvider', '$controllerProvider', '$provide', '$compileProvider', '$componentProvider'];

	module.run([() => {
	}]);
})();
