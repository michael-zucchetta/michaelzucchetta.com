import Constants from 'js/services/constants';
import 'js/services/rest-proxy';

export class BasicInfoDao {

	constructor(private RestProxy) {
	}

	public getLinks() {
		// temporary
		return this.RestProxy.handleGetCall('js/mocks/links.json');
	}

	public getMenu() {
		return this.RestProxy.handleGetCall('js/mocks/menu.json');
	}
	
	public getIP(): string {
		// geoplugin.com
		let endpoint = 'http://www.geoplugin.net/json.gp?jsoncallback=angular.callbacks._0';
		return this.RestProxy.handleJsonpCall(endpoint);
	}

}

let basicInfoDaoFactory: Function = (RestProxy) => {
	return new BasicInfoDao(RestProxy);
};

basicInfoDaoFactory.$inject = ['RestProxy'];

export default basicInfoDaoFactory;
