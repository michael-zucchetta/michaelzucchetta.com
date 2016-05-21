import Constants from 'js/services/Constants';
import BasicInfoDao from 'js/services/basic-info-dao';
import UtilitiesService from 'js/services/utils';

export default class DaoFacade {

	constructor(private BasicInfoDao, private UtilitiesService) {
	}

	private getMenu() {
		return BasicInfoDao.getMenu().then((menu) => {
			UtilitiesService.setRouteDinamically(menu)
			return UtilitiesService.initializeMenu(menu);
		});
	}

}

let daoFacadeFactory: Function = (BasicInfoDao, UtilitiesService) => {
	return new DaoFacade(BasicInfoDao, UtilitiesService);
}

daoFacadeFactory.$inject = ['BasicInfoDao', 'UtilitiesService'];

angular.module(Constants.MAIN_MODULE).factory(daoFacadeFactory);
