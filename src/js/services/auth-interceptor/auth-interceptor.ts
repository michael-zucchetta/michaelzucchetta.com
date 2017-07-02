'use strict';
import mz from 'domains';

class AuthenticationInterceptor {

	constructor(private $q: ng.IQService, private $window: ng.IWindowService, private $location: ng.ILocationService) {
	}

	public request = (config) => {
		console.log(config.headers);
		config.headers = config.headers || {};
		let localStorage: any = this.$window.localStorage;
		if (localStorage['token']) {
			config.headers.Authorization = localStorage.token;
		}
		let authorizationHeader = config.headers['Authorization'];
		if (authorizationHeader && authorizationHeader.indexOf('Basic') !== -1) {
			console.log('Setting timeout');
			config.timeout = 10000000;
		}
		return config;
	}

	public response = (response: any) => {
		if (response.headers && response.headers('Authorization')) {
			console.log('storing');
			let localStorage: any = this.$window.localStorage;
			localStorage.token = response.headers('Authorization');
		}
		return response;
	}

	public responseError = (rejection, response) => {
		console.log(rejection.status);
		if (response.status === 401) {
			this.$window.localStorage.removeItem('token');
			this.$location.path('/');
			return;
		}
		// Otherwise, default behavior
		return this.$q.reject(rejection);
	}
}

let factory: Function = ($q: ng.IQService, $window: ng.IWindowService, $location: ng.ILocationService): mz.IAuthenticationInterceptor => {
	return new AuthenticationInterceptor($q, $window, $location);
}

factory.$inject = ['$q', '$window', '$location'];

export default factory;
