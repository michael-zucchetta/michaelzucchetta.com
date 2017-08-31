interface IPostsDao {

	getPostByUuid(postUuid: string): ng.IPromise<any>;
}
