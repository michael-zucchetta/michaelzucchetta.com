'use strict';
import mz from 'domains';

class AuthenticationInterceptor {

	constructor(private $q: ng.IQService, private $window: ng.IWindowService, private $location: ng.ILocationService, private $rootScope: ng.IRootScopeService) {
	}

	public request = (config) => {
		console.log(config.headers);
		config.headers = config.headers || {};
		let localStorage: any = this.$window.localStorage;
		console.log('EHI', localStorage);
		console.log('EHI2', localStorage['token']);
		if (localStorage['token']) {
			console.log("DIO BON");
			config.headers.Authorization = localStorage.token;
		} else {
			delete config.headers.Authorization;
		}
		let authorizationHeader = config.headers['Authorization'];
		console.log('authorizationHeader', authorizationHeader, localStorage, config.headers);
		if (authorizationHeader && authorizationHeader.indexOf('Basic') !== -1) {
			console.log('Setting timeout');
			config.timeout = 10000000;
		}
		return config;
	}

	public response = (response: any) => {
		if (response.headers && response.headers('Authorization')) {
			console.log('storing');
			this.$rootScope.$emit('userAuthenticated');
			let localStorage: any = this.$window.localStorage;
			localStorage.token = response.headers('Authorization');
		} 
		return response;
	}

	public responseError = (rejection, response) => {
		console.log(rejection.status);
		if (rejection.status === 401) {
			console.log('Redirecting');
			this.$window.localStorage.removeItem('token');
			this.$window.location.href = '/index.html#/home.html';
			return;
		}
		// Otherwise, default behavior
		return this.$q.reject(rejection);
	}
}

let factory: Function = ($q: ng.IQService, $window: ng.IWindowService, $location: ng.ILocationService, $rootScope: ng.IRootScopeService): mz.IAuthenticationInterceptor => {
	return new AuthenticationInterceptor($q, $window, $location, $rootScope);
}

factory.$inject = ['$q', '$window', '$location', '$rootScope'];

export default factory;
