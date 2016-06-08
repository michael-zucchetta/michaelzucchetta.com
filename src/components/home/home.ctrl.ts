import IMenuEl from 'domains/menu';

class HomeCtrl {
	private myLinks;

	private menu: IMenuEl[];

	constructor(private BasicInfoDao, private DaoFacade) {
		this.myLinks = [];
		this.menu = [];
	}

	public $onInit(): void {
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
