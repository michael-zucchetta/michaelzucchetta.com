import mz from 'domains';

export default class PageAdminCtrl {

	private tinymceOptions: any;

	private isAuthenticated: boolean = false;

	private postTitle: string;

	private postText: string;

	private menuUuid: string;

	private postType: string;

	constructor(private $scope: any, private $window: ng.IWindowService, private BlogDao: mz.IBlogDao) {
		this.$scope = $scope;
		if (!this.postType) {
			this.postType = 'page';
		}
		console.log("Window service", this.$window);
	}

	savePost() {
		console.log('Saving post');
		if (this.postTitle && this.postText) { 
			this.BlogDao.insertNewPost(this.postTitle, this.postText, this.postType, this.menuUuid);
		}
	}
}

PageAdminCtrl.$inject = ['$scope', '$window', 'BlogDao']
