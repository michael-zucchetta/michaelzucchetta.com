import IMenuEl from 'domains/menu';

export default class GlobalCtrl {

	private myLinks;

	private menu: IMenuEl[];

	public dateString: string;

	private userIP: string;

	private regionIP: string;

	constructor(private BasicInfoDao, private DaoFacade, private $interval) {
		this.myLinks = [];
		this.menu = [];
		this.$interval(() => this.getTodayDate(), 1000);
	}

	public $onInit(): void {
		this.BasicInfoDao.getLinks()
			.then(links => this.myLinks = links);

		this.DaoFacade.getMenu()
			.then(menuEls => {
			this.menu = menuEls;
		});
		
		this.BasicInfoDao.getIP()
			.then((ipData) => {
			this.userIP = ipData.geoplugin_request;
			this.regionIP = ipData.geoplugin_region;
		});
		
		var body: any = document.querySelector('body');
		body.style.visibility = 'visible';
	  
    let websiteContent: any = document.querySelector('.website-content');
    websiteContent.style.animationPlayState = 'running';
    websiteContent.addEventListener('animationend', () => {
      console.log('ciao');
      setTimeout(() => {
        let line1: any = document.querySelector('.line1 .terminal-text');
        line1.style.animationPlayState = 'running';
      }, 0);
    });
  }

	public getClass() {
		return 'forforOAa';
	}

	private getTodayDate(): void {
		let todayDate = new Date().toISOString();
		this.dateString = todayDate.substring(0, 10) + '  ' + todayDate.substring(11, 19);
	}
}

GlobalCtrl.$inject = ['BasicInfoDao', 'DaoFacade', '$interval'];
