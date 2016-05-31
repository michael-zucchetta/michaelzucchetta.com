import Constants from 'js/services/Constants';
import 'js/services/rest-proxy';

export class BasicInfoDao {

	constructor(private RestProxy) {
	}

	public getLinks() {
		// temporary
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

export default angular.module(Constants.MAIN_MODULE)
	.factory('BasicInfoDao', basicInfoDaoFactory);
