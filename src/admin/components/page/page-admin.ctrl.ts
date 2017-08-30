import mz from 'domains';

export default class PageAdminCtrl {

	private tinymceOptions: any;

	private isAuthenticated: boolean = false;

	private postTitle: string;

	private postText: string;

	private menuUuid: string;

	private pageType: string;

	private postPublished: boolean = true;

	constructor(private $scope: any, private $window: ng.IWindowService, private BlogDao: mz.IBlogDao, private $stateParams: any) {
		this.$scope = $scope;
		console.log(this.$stateParams);
		this.menuUuid = this.$stateParams.menuUuid;
		this.pageType = this.$scope.pageType;
		console.log("Window service", this.$window);
	}

	savePost() {
		console.log('Saving post', this.pageType);
		if (this.postTitle && this.postText) { 
			this.BlogDao.insertNewPost(this.postTitle, this.postText, this.pageType, this.menuUuid, this.postPublished);
		}
	}

	getPost() {
		
	}
}

PageAdminCtrl.$inject = ['$scope', '$window', 'BlogDao', '$stateParams']
