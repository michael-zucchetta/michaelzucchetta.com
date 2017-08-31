import mz from 'domains';

export class PostsDao implements mz.IPostsDao {

	constructor(private RestProxy: mz.IRestProxy){
	}

	public getPostByUuid(postUuid: string): ng.IPromise<any> {
		// geoplugin.com
		return this.RestProxy.handleGetCall(`/services/blog/get_by_uuid?post_uuid=${postUuid}`);
	}

}

let PostsDaoFactory: Function = (RestProxy: mz.IRestProxy): mz.IPostsDao => {
	return new PostsDao(RestProxy);
};

PostsDaoFactory.$inject = ['RestProxy'];

export default PostsDaoFactory;
