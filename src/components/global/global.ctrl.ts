import IMenuEl from 'domains/menu';

export default class GlobalCtrl {

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
                var body: any = document.querySelector('body');
                body.style.visibility = 'visible';
        }
	
	public getClass() {
		return 'forforOAa';
	}
}

GlobalCtrl.$inject = ['BasicInfoDao', 'DaoFacade'];
