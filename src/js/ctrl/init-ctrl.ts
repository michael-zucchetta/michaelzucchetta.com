// json-editor is temporary. css attribute in directives is not working for directives bootstrapped later
import Constants from 'js/services/Constants';
import 'js/services/basic-info-dao';
import animateText from 'directives/animate-text/animate-text';
import dropdownMenu from 'directives/dropdown-menu/dropdown-menu';
import jsonEditor from 'directives/json-editor/json-editor';

class InitCtrl {
	private myLinks;

	private menu;

	constructor(BasicInfoDao) {
		this.myLinks = [];
		this.menu = [];

		(() => {
			BasicInfoDao.getLinks().then((links) => {
				this.myLinks = links;
			});
		})();
	}
}

InitCtrl.$inject = ['BasicInfoDao'];

export default angular.module(Constants.MAIN_MODULE).controller('InitCtrl', InitCtrl);
