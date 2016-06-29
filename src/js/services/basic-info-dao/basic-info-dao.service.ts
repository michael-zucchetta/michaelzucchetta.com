import Constants from 'js/services/constants';

export class BasicInfoDao {

	private linksEndpoint: string = 'js/mocks/links.json';

	private menuEndpoint: string = 'js/mocks/menu.json';

	// geoplugin.com
	private ipInfoEndpoint: string = 'http://www.geoplugin.net  /json.gp?jsoncallback=angular.callbacks._0';

	constructor(private RestProxy) {
	}

	public getLinks() {
		return this.RestProxy.handleGetCall(this.linksEndpoint);
	}
	
	public getMenu() {
		return this.RestProxy.handleGetCall(this.menuEndpoint);
	}
	
	public getIP(): string {
		// geoplugin.com
		return this.RestProxy.handleJsonpCall(this.ipInfoEndpoint);
	}

}

let basicInfoDaoFactory: Function = (RestProxy) => {
	return new BasicInfoDao(RestProxy);
};

basicInfoDaoFactory.$inject = ['RestProxy'];

export default basicInfoDaoFactory;
