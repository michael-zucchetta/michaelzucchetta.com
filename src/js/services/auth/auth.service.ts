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
		}, {
			headers: {'Content-Type': 'application/json; charset=utf-8'}
		}).then((response: any) => {
			console.log(response);
			let headers = response.headers;
			let authorizationHeader = headers('Authorization');
			console.log(`login successfull with headers ${authorizationHeader}`);
			// according to the Oauth2, this call should be done in another moment when the user confirms 
			// again. But as it is a user password login, it should be fine
			let redirectionUrl: string = response.data.redirection_url;
			let http: any = this.http;
			return http.post(redirectionUrl, undefined);
		}).then((response: any) => {
			console.log('real authentication', response);
		});;
	}
}

let authFactory: Function = (http: ng.IHttpService): mz.IAuth => {
	return new Auth(http);
};

authFactory.$inject = ['$http'];

export default authFactory;
