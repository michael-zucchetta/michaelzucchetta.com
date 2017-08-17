import mz from 'domains';

export default class BlogDao implements mz.IBlogDao {
	
	private endpoint: string = '/services/blog';

	private insertPostEndpoint: string = `${this.endpoint}/new_post`

	constructor(private http: ng.IHttpService) {
	
	}

	public insertNewPost(postTitle: string, postText: string, postType: string, menuUuid: string) {
		const newPostRequest = {
			postTitle: postTitle,
			postText: postText,
			postUuid: null,
			postType: postType,
			menuUuid: menuUuid, 
		};
		return this.http.post(this.insertPostEndpoint, newPostRequest).then((response) => {
			if (response.status !== 200) {
				console.error('something wrong', response.status);
			}
		});
	}

}

BlogDao.$inject = ['$http'];
