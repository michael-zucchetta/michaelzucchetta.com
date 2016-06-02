// json-editor is temporary. css attribute in directives is not working for directives bootstrapped later
import 'js/services/basic-info-dao';
import 'directives/animate-text/animate-text';
import 'directives/dropdown-menu/dropdown-menu';
import 'directives/json-editor/json-editor';
import IMenuEl from 'domains/menu';

class InitCtrl {
	private myLinks;

	private menu: IMenuEl[];

	constructor(BasicInfoDao, $state) {
		this.myLinks = [];
		this.menu = [];

		(() => {
			BasicInfoDao.getLinks()
				.then(links => this.myLinks = links);

			BasicInfoDao.getMenu()
				.then(menuEls => {
					this.menu = menuEls;
					this.menu.forEach((menuEl: IMenuEl) => {
						if (menuEl.active) {
							$state.state(menuEl.name, menuEl.definition);
						}
					});
				});
		})();
	}
}

InitCtrl.$inject = ['BasicInfoDao', '$state'];

export default InitCtrl;
