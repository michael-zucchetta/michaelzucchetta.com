import mz from 'domains';

export default class PageCtrl {

	private isAuthenticated: boolean = false;

	private post: any;

	constructor(private $scope: any, private $window: ng.IWindowService, private PostsDao: mz.IPostsDao, private $stateParams: any, private $timeout: ng.ITimeoutService, private $sce: ng.ISceService) {
		this.post = {};
		let post = this.post;
		// tmp, to be put in something global
		let token = this.$window.localStorage['token'];
		console.log('OHIIII', token);
		if (token) {
			this.isAuthenticated = true;
		}
		if (this.$stateParams.postUuid) {
				this.PostsDao.getPostByUuid(this.$stateParams.postUuid).then((postResponse: mz.IPost) => {
					console.info('POST ARRIVED', post);
                                	post.postUuid = postResponse.postUuid;
                                	post.postTitle = postResponse.postTitle;
					post.postText = $sce.trustAsHtml(postResponse.postText);
				})
		}
	}
}

PageCtrl.$inject = ['$scope', '$window', 'PostsDao', '$stateParams', '$timeout', '$sce'];
