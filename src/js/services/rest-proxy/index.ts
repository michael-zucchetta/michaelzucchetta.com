import RestProxy from './rest-proxy.service';

export default angular.module('rest-proxy', [])
	.service('RestProxy', RestProxy)
	.name;
