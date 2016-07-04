import UtilitiesService from 'js/services/utils';
import mz from 'domains';

class DaoFacade implements mz.IDaoFacade {

	constructor(private BasicInfoDao: mz.IBasicInfoDao, private $state: mz.IState) {
	}

	public resolveMenu(menu: any): mz.IMenuEl[] {
		this.$state.setRouteDinamically(menu);
		return UtilitiesService.initializeMenu(menu);
	}

	public getMenu(): ng.IPromise<mz.IMenuEl[]> {
		return this.BasicInfoDao.getMenu()
			.then((menu: any) => this.resolveMenu(menu));
	}

}

let daoFacadeFactory: Function = (BasicInfoDao: mz.IBasicInfoDao, $state: mz.IState) => {
	return new DaoFacade(BasicInfoDao, $state);
};

daoFacadeFactory.$inject = ['BasicInfoDao', '$state'];

export default daoFacadeFactory;
