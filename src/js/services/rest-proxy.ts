import Constants from 'js/services/Constants';

class RestProxy {

	constructor(private $q: ng.IQService, private $http: ng.IHttpService) {
	}
	
	public handleGetCall(endpoint) {
		return this.getCall(endpoint);
		// Array.prototype.concat.apply([this.getCall()], arguments);
	}

	private data(response): any {
		return response.data && response.data.data || response.data;
	}

	private deferredCall(...args) {
		let fn = Array.prototype.shift.call(args, 0);
		let deferred = this.$q.defer();
		fn.apply(undefined, args).then((response) => {
			return response.status && deferred.resolve(this.data(response)) || deferred.reject(this.data(response));
		});
		return deferred.promise;
	}

	private getCall: Function = this.$http.get;
	
}

let restProxyFactory: Function = ($q: ng.IQService, $http: ng.IHttpService) => {
	return new RestProxy($q, $http);
};

restProxyFactory.$inject = ['$q', '$http'];

export default angular.module(Constants.MAIN_MODULE)
	.factory('RestProxy', restProxyFactory);
