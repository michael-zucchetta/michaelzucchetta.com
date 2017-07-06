interface IBlogDao {
	insertNewPost(postTitle: string, postText: string): ng.IPromise<any>;
}
