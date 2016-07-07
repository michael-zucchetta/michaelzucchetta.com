interface IBasicInfoDao {

	linksEndpoint: string;

	menuEndpoint: string;

	ipInfoEndpoint: string;

	getLinks(): ng.IPromise<any>;

	getMenu(): ng.IPromise<any>;

	getIP(): ng.IPromise<any>;
}
