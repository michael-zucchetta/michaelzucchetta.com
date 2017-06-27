import mz from 'domains';

class Auth {
	private authPrefix: string = '/services/auth';
	private loginEndpoint: string = `${this.authPrefix}/login`;
	
	constructor(private http: ng.IHttpService) {
	}

	public login(username: string, password: string): ng.IPromise<any> {
		return this.http.post(this.loginEndpoint, {
			username: username,
			password: password,
		}).success((data: any, status, headers) => {
			let authorizationHeader = headers['Authorization'];
			console.log(`login successfull with headers ${headers}`);
			// according to the Oauth2, this call should be done in another moment when the user confirms 
			// again. But as it is a user password login, it should be fine
			this.http ({
				method: 'POST',
				url: data.redirectionUrl,
				headers: { 'Authorization': authorizationHeader },
			});
		});
	}
}

let authFactory: Function = (http: ng.IHttpService): mz.IAuth => {
	return new Auth(http);
};

authFactory.$inject = ['$http'];

export default authFactory;
