import Constants from 'js/services/Constants';

export default class RestProxy {

	constructor(private $q: ng.IQService, private $http: ng.IHttpService) {
	}

	private data(response) {
		return response.data && response.data.data || response.data;
	}
		
	private deferredCall = () => {
		let fn = Array.prototype.shift.call(arguments, 0);
		let deferred = this.$q.defer();
		fn.apply(null, arguments).then((response) => {
			response.status && deferred.resolve(this.data(response)) || deferred.reject(data(response));
		});
		return deferred.promise;
	}

	private getCall() {
		return this.$http.get
	}
	
	public handleGetCall() {
		let newArgs = Array.prototype.concat.apply([this.getCall()], arguments);
	}
}

let restProxyFactory: Function = ($q, $http) => {
	return new RestProxy($q, $http);
};

restProxyFactory.$inject = ['$q', '$http'];

angular.module(Constants.MAIN_MODULE).factory(restProxyFactory);
