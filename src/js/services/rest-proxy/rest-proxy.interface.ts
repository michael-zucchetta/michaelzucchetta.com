interface IRestProxy {

	handleGetCall(args: any): ng.IPromise<any>;

	handleGetCall(args: any): ng.IPromise<any>;

	handleJsonpCall(args: any): ng.IPromise<any>;

	deferredCall(args: any[]): ng.IPromise<any>;
}
