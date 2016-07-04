import mz from 'domains';

class RestProxy implements  mz.IRestProxy {

	private getCall: Function = this.$http.get;

	private jsonpCall: Function = this.$http.jsonp;

	constructor(private $q: ng.IQService, private $http: ng.IHttpService) {
	}

	public handleGetCall(args: any): ng.IPromise<any> {
		return this.deferredCall(Array.prototype.concat.apply([this.getCall], arguments));
	}

	public handleJsonpCall(args: any): ng.IPromise<any> {
		return this.deferredCall(Array.prototype.concat.apply([this.jsonpCall], arguments));
	}

	private data(response: any): any {
		return response.data && response.data.data || response.data;
	}

	private deferredCall(args: any[]): ng.IPromise<any> {
		let fn: any = Array.prototype.shift.call(args);
		let deferred: ng.IDeferred<any> = this.$q.defer();
		fn.apply(undefined, args).then((response: any) => {
			return response.status && deferred.resolve(this.data(response)) || deferred.reject(this.data(response));
		});
		return deferred.promise;
	}
}

let restProxyFactory: Function = ($q: ng.IQService, $http: ng.IHttpService) => {
	return new RestProxy($q, $http);
};

restProxyFactory.$inject = ['$q', '$http'];

export default restProxyFactory;
