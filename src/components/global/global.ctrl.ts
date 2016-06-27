import IMenuEl from 'domains/menu';

export default class GlobalCtrl {

	private myLinks;

	private menu: IMenuEl[];

	public dateString: string;

	private userIP: string;

	private regionIP: string;

	constructor(private BasicInfoDao, private DaoFacade, private $interval, private $timeout) {
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

		let line1: any = document.querySelector('.line1 .terminal-text');
		let line1Cursor: any = document.querySelector('.line1 .white-cursor');
		let websiteContent: any = document.querySelector('.website-content');
		websiteContent.style.animationPlayState = 'running';
		websiteContent.addEventListener('animationend', () => {
			console.log('ciao');
			setTimeout(() => {
				line1.style.animationPlayState = 'running';
			}, 200);
		});

		let line2: any = document.querySelector('.line2');
		let line2Text: any = document.querySelector('.line2 .terminal-text');
		line1.addEventListener('animationend', () => {
			setTimeout(() => {
				line1Cursor.style.visibility = 'hidden';
				line2.style.display = 'block';
				line2Text.style.animationPlayState = 'running';
			}, 200);
		});

		let line2Cursor: any = document.querySelector('.line2 .white-cursor');
		let line3: any = document.querySelector('.line3');
		let line3Text: any = document.querySelector('.line3 .terminal-text');
		line2.addEventListener('animationend', () => {
			setTimeout(() => {
				line2Cursor.style.visibility = 'hidden';
				line3.style.display = 'block';
				line3Text.style.animationPlayState = 'running';
			}, 200);
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

GlobalCtrl.$inject = ['BasicInfoDao', 'DaoFacade', '$interval', '$timeout'];
