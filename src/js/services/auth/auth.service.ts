import mz from 'domains';

class Auth {
	private authPrefix: string = '/services/auth';
	private loginEndpoint: string = `${this.authPrefix}/login`;
	
	constructor(private http: ng.IHttpService, private window: ng.IWindowService) {
	}

	public login(username: string, password: string): ng.IPromise<any> {
		return this.http.post(this.loginEndpoint, {
			username: username,
			password: password,
		}, {
			headers: {'Content-Type': 'application/json; charset=utf-8'}
		}).then((response: any) => {
			console.log(response);
			let headers = response.headers;
			let authorizationHeader = headers('Authorization');
			console.log(`login successful with headers ${authorizationHeader}`);
			// according to the Oauth2, this call should be done in another moment when the user confirms 
			// again. But as it is a user password login, it should be fine
			let redirectionUrl: string = response.data.redirectionUrl;
			return this.http.post(redirectionUrl, {});
		}).then((response: any) => {
			console.log('real authentication', response);
			if (response.status === 200) {
				console.log('redirecting');
				this.window.location.href = '/admin.html#/home.html';
			}
		});
	}
}

let authFactory: Function = (http: ng.IHttpService, window: ng.IWindowService): mz.IAuth => {
	return new Auth(http, window);
};

authFactory.$inject = ['$http', '$window'];

export default authFactory;
