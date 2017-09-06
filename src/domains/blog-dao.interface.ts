interface IBlogDao {
	upsertPost(post: IPost, postType: string, menuUuid: string, postPublished: boolean): ng.IPromise<any>;
}
