interface IBasicInfoDao {

	getLinks(): ng.IPromise<any>;

	getMenu(): ng.IPromise<any>;

	getIP(): ng.IPromise<any>;
}
