interface IPosts {

	getPostByUuid(postUuid: string): ng.IPromise<any>;
}
