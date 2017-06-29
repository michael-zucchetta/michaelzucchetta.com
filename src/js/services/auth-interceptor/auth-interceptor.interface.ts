interface IAuthenticationInterceptor {
	request(config: any): any;

	responseError(rejection: any, response: any): ng.IPromise<any>;
}
