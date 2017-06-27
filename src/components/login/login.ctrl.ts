import mz from 'domains';

export default class LoginCtrl {

	private username: string;
	private password: string;

	constructor(private Auth: mz.IAuth) {
	
	}

	public login() {
		this.Auth.login(this.username, this.password);
	}
}

LoginCtrl.$inject = ['Auth'];
