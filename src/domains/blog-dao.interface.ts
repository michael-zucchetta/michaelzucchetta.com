interface IBlogDao {
	insertNewPost(postTitle: string, postText: string, postType: string, menuUuid: string): ng.IPromise<any>;
}
