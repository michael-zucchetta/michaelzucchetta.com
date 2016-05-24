import Constants from 'js/services/constants';
import RestProxyFun from 'js/services/rest-proxy';

export default class BasicInfoDao {

	public constructor(private RestProxy) {
		
	}

	// temporary
	public getLinks() {
		return this.RestProxy.handleGetCall('/js/mocks/links.json');
	}

	public getMenu() {
		return this.RestProxy.handleGetCall('/js/mocks/menu.json');
	}

}

let basicInfoDaoFactory: Function = (RestProxy) => {
	return new BasicInfoDao(RestProxy);
};

basicInfoDaoFactory.$inject = ['RestProxy'];


angular.module(Constants.MAIN_MODULE).factory(basicInfoDaoFactory);

