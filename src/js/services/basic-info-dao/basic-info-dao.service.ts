import mz from 'domains';
export class BasicInfoDao {

	private linksEndpoint: string = 'js/mocks/links.json';

	private menuEndpoint: string = '/services/pub/get_menu'; 
	//'js/mocks/menu.json';

	// geoplugin.com
	private ipInfoEndpoint: string = '/services/pub/get_geo_data';

	constructor(private RestProxy: mz.IRestProxy) {
	}

	public getLinks(): ng.IPromise<any> {
		return this.RestProxy.handleGetCall(this.linksEndpoint);
	}

	public getMenu(): ng.IPromise<any> {
		return this.RestProxy.handleGetCall(this.menuEndpoint);
	}

	public getIP(): ng.IPromise<any> {
		// geoplugin.com
		return this.RestProxy.handleGetCall(`${this.ipInfoEndpoint}`);
	}

}

let basicInfoDaoFactory: Function = (RestProxy: mz.IRestProxy): mz.IBasicInfoDao => {
	return new BasicInfoDao(RestProxy);
};

basicInfoDaoFactory.$inject = ['RestProxy'];

export default basicInfoDaoFactory;
