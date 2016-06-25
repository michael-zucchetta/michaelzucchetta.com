import BasicInfoDao from 'js/services/basic-info-dao';
import UtilitiesService from 'js/services/utils';

class DaoFacade {

	constructor(private BasicInfoDao, private $state) {
	}

	public getMenu() {
		return this.BasicInfoDao.getMenu().then((menu) => {
			this.$state.setRouteDinamically(menu);
			return UtilitiesService.initializeMenu(menu);
		});
	}

}

let daoFacadeFactory: Function = (BasicInfoDao, $state) => {
	return new DaoFacade(BasicInfoDao, $state);
};

daoFacadeFactory.$inject = ['BasicInfoDao', '$state'];

export default daoFacadeFactory;
