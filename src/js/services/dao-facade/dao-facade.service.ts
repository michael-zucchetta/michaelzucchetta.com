import UtilitiesService from 'js/services/utils';

class DaoFacade {

	constructor(private BasicInfoDao, private $state) {
	}

	resolveMenu(menu) {
		this.$state.setRouteDinamically(menu);
		return UtilitiesService.initializeMenu(menu);
	}

	public getMenu() {
		return this.BasicInfoDao.getMenu()
			.then((menu) => this.resolveMenu(menu));
	}

}

let daoFacadeFactory: Function = (BasicInfoDao, $state) => {
	return new DaoFacade(BasicInfoDao, $state);
};

daoFacadeFactory.$inject = ['BasicInfoDao', '$state'];

export default daoFacadeFactory;
