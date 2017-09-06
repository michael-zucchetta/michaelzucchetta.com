import mz from 'domains';

export default class BlogDao implements mz.IBlogDao {
	
	private endpoint: string = '/services/blog';

	private insertPostEndpoint: string = `${this.endpoint}/upsert_post`

	constructor(private http: ng.IHttpService) {
	
	}

	public upsertPost(post: mz.IPost, postType: string, menuUuid: string, postPublished: boolean) {
		const newPostRequest = {
			postTitle: post.postTitle,
			postText: post.postText,
			postUuid: post.postUuid,
			postType: postType,
			menuUuid: menuUuid,
			postPublished: postPublished,
		};
		return this.http.post(this.insertPostEndpoint, newPostRequest).then((response) => {
			if (response.status !== 200) {
				console.error('something wrong', response.status);
			}
			return response.data;
		});
	}

}

BlogDao.$inject = ['$http'];
