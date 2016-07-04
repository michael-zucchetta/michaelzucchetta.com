interface IRestProxy {
	handleGetCall(args: any): ng.IPromise<any>;

	handleJsonpCall(args: any): ng.IPromise<any>;

}
