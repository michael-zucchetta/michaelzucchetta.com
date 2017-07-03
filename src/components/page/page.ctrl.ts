
export default class PageCtrl {

	private isAuthenticated: boolean = false;

	constructor(private $scope: any, private $window: ng.IWindowService) {
		// tmp, to be put in something global
		let token = this.$window.localStorage['token'];
		console.log('OHIIII', token);
		if (token) {
			this.isAuthenticated = true;
		}
	}
}
