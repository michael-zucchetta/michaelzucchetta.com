// json-editor is temporary. css attribute in directives is not working for directives bootstrapped later
import 'js/services/basic-info-dao';
import 'directives/animate-text/animate-text';
import 'directives/dropdown-menu/dropdown-menu';
import 'directives/json-editor/json-editor';
import IMenuEl from 'domains/menu';
import 'js/services/dao-facade';

class HomeCtrl {
	private myLinks;

	private menu: IMenuEl[];

	constructor(BasicInfoDao, DaoFacade, $state) {
		this.myLinks = [];
		this.menu = [];

		(() => {
			BasicInfoDao.getLinks()
				.then(links => this.myLinks = links);

			DaoFacade.getMenu()
				.then(menuEls => {
					this.menu = menuEls;
			});
		})();
	}
}

HomeCtrl.$inject = ['BasicInfoDao', 'DaoFacade', '$state'];

export default HomeCtrl;
