import mz from 'domains';

export default class PageAdminCtrl {

	private tinymceOptions: any;

	private isAuthenticated: boolean = false;

	private menuUuid: string;

	private pageType: string;

	private post: mz.IPost;

	private postPublished: boolean = true;

	constructor(private $scope: any, private $window: ng.IWindowService, private BlogDao: mz.IBlogDao, private $stateParams: any) {
		this.$scope = $scope;
		console.log(this.$stateParams);
		this.menuUuid = this.$stateParams.menuUuid;
		this.pageType = this.$scope.pageType;
		this.post = this.$scope.post;
		console.log("Window service", this.$window);
	}

	savePost() {
		console.log('Saving post', this.pageType);
		if (this.post.postTitle && this.post.postText) { 
			// change parameters
			this.BlogDao.insertNewPost(this.post.postTitle, this.post.postText, this.pageType, this.menuUuid, this.postPublished);
		}
	}

	getPost() {
		
	}
}

PageAdminCtrl.$inject = ['$scope', '$window', 'BlogDao', '$stateParams']
