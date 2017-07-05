import mz from 'domains';

export default class BlogDao implements mz.IBlogDao {
	
	private endpoint: string = '/services/blog';

	private insertPostEndpoint: string = `${this.endpoint}/new_post`

	private postTitle: string;

	private postText: string;

	constructor(private http: ng.IHttpService) {
	
	}

	public insertNewPost() {
		const newPostRequest = {
			postTitle: this.postTitle,
			postText: this.postText
		};
		return this.http.post(this.insertPostEndpoint, newPostRequest).then((response) => {
			if (response.status) {
				console.error('something wrong', response.status);
			}
		});
	}

}

BlogDao.$inject = ['$http'];
