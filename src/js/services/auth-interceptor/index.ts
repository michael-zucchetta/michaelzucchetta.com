import AuthInterceptor from './auth-interceptor.ts';

let authInterceptorModule = angular.module('authinterceptor', []);

export default authInterceptorModule
	.service('AuthInterceptor', AuthInterceptor)
	.name;

authInterceptorModule.config(['$httpProvider', function ($httpProvider: ng.IHttpProvider) {
	$httpProvider.interceptors.push('AuthInterceptor');
}]);
