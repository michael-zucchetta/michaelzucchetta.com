interface IAuth {
	login(username: string, password: string): ng.IPromise<any>;
}
