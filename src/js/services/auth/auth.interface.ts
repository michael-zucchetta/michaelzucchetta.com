interface IAuth {
	login(username: string, password: string): ng.IPromise<any>;
	isAuthenticated(): ng.promise<any>;
}
