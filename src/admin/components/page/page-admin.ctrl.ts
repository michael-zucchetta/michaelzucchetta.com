import mz from 'domains';

export default class PageAdminCtrl {

	private tinymceOptions: any;

	private isAuthenticated: boolean = false;

	constructor(private $scope: any, private $window: ng.IWindowService, private BlogDao: mz.IBlogDao) {
		this.$scope = $scope;
		console.log("Window service", this.$window);
			
	}
}

PageAdminCtrl.$inject = ['$scope', '$window', 'BlogService']
