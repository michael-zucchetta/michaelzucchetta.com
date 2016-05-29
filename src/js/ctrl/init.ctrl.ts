// json-editor is temporary. css attribute in directives is not working for directives bootstrapped later
import Constants from 'js/services/Constants';
import 'js/services/basic-info-dao';
import 'directives/animate-text/animate-text';
import 'directives/dropdown-menu/dropdown-menu';
import 'directives/json-editor/json-editor';
import IMenuEl from 'domains/menu';

class InitCtrl {
	private myLinks;

	private menu: IMenuEl[];

	constructor(BasicInfoDao) {
		this.myLinks = [];
		this.menu = [];

		(() => {
			BasicInfoDao.getLinks()
				.then(links => {
					this.myLinks = links;
				});
		})();
	}
}

InitCtrl.$inject = ['BasicInfoDao'];

export default angular.module(Constants.MAIN_MODULE)
	.controller('InitCtrl', InitCtrl);
