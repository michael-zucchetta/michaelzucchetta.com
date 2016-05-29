import Constants from 'js/services/Constants';
import BasicInfoDao from 'js/services/basic-info-dao';
import UtilitiesService from 'js/services/utils';

class DaoFacade {

	constructor(private BasicInfoDao, private $route) {
	}

	private getMenu() {
		return this.BasicInfoDao.getMenu().then((menu) => {
			this.$route.route.setRouteDinamically(menu);
			return UtilitiesService.initializeMenu(menu);
		});
	}

}

let daoFacadeFactory: Function = (BasicInfoDao, UtilitiesService) => {
	return new DaoFacade(BasicInfoDao, UtilitiesService);
};

daoFacadeFactory.$inject = ['BasicInfoDao', '$route'];

export default angular.module(Constants.MAIN_MODULE).factory(daoFacadeFactory);
