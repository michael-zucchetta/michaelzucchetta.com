// json-editor is temporary. css attribute in directives is not working for directives bootstrapped later
// import 'directives/animate-text/animate-text';
// import 'directives/dropdown-menu/dropdown-menu';
// import 'directives/json-editor/json-editor';
import IMenuEl from 'domains/menu';

class HomeCtrl {
	private myLinks;

	private menu: IMenuEl[];

	constructor(private BasicInfoDao, private DaoFacade) {
		this.myLinks = [];
		this.menu = [];
	}

	public $onInit() {
		this.BasicInfoDao.getLinks()
			.then(links => this.myLinks = links);

		this.DaoFacade.getMenu()
			.then(menuEls => {
			this.menu = menuEls;
		});
	}
}

HomeCtrl.$inject = ['BasicInfoDao', 'DaoFacade'];

export default HomeCtrl;
