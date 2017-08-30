interface IBlogDao {
	insertNewPost(postTitle: string, postText: string, postType: string, menuUuid: string, postPublished: boolean): ng.IPromise<any>;
}
