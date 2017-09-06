import mz from 'domains';

export default class PageAdminCtrl {

	private tinymceOptions: any;

	private isAuthenticated: boolean = false;

	private menuUuid: string;

	private pageType: string;

	private post: mz.IPost;
	
	private postPublished: boolean = true;

	constructor(private $window: ng.IWindowService, private BlogDao: mz.IBlogDao, private $stateParams: any, private $timeout: ng.ITimeoutService, private $sce: ng.ISCEService, private $state: any) {
		console.log(this.$stateParams);
		this.menuUuid = this.$stateParams.menuUuid;
		// this.post.postUuid = this.$stateParams.postUuid;
		console.log(this.pageType);
		console.log("Window service", this.$window);
	}

	savePost() {
		console.log('Saving post', this.pageType);
		if (this.post.postTitle && this.post.postText) { 
			// change parameters
			this.BlogDao.upsertPost(this.post, this.pageType, this.menuUuid, this.postPublished).then((result) => {
				console.log('post saved successfully', result);
				this.post.postUuid = result.postUuid;
				this.$state.reload();
			});
		}
	}

	getPost() {
		
	}
}

PageAdminCtrl.$inject = ['$window', 'BlogDao', '$stateParams', '$timeout', '$sce', '$state'];
