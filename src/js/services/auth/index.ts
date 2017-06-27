import Auth from './auth.service.ts';

export default angular.module('auth', [])
	.service('Auth', Auth)
	.name;
