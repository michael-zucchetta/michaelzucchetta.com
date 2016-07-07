import mz from 'domains';

export default class GlobalCtrl {

	private myLinks;

	private menu: mz.IMenuEl[];

	public dateString: string;

	private userIP: string;

	private regionIP: string;

	private countryIP: string;

	constructor(private BasicInfoDao: mz.IBasicInfoDao, private DaoFacade: mz.IDaoFacade,
			private $interval: ng.IIntervalService, private $timeout: ng.ITimeoutService) {
		this.myLinks = [];
		this.menu = [];
		this.$interval(() => this.getTodayDate(), 1000);
	}

	public $onInit(): void {
		this.BasicInfoDao.getLinks()
			.then(links => this.myLinks = links);

		this.DaoFacade.getMenu()
			.then((menuEls: mz.IMenuEl[]) => {
			this.menu = menuEls;
		});

		this.BasicInfoDao.getIP()
			.then((ipData: any) => {
			this.userIP = ipData.geoplugin_request;
			this.regionIP = ipData.geoplugin_region;
			this.countryIP = ipData.geoplugin_countryName;
		});

		let body: any = document.querySelector('body');
		body.style.visibility = 'visible';

		let line1: any = document.querySelector('.line1');
		let line1Text: any = document.querySelector('.line1 .terminal-text');
		let line1Cursor: any = document.querySelector('.line1 .white-cursor');
		let websiteContent: any = document.querySelector('.website-content');
		setTimeout(() => {
			// for safari	
			websiteContent.style.animationPlayState = 'running';
			websiteContent.style.webkitAnimationPlayState = 'running';
		});

		websiteContent.addEventListener('animationend', () => {
			setTimeout(() => {
				line1Text.style.animationPlayState = 'running';
				line1Text.style.webkitAnimationPlayState = 'running';
			}, 200);
		});
		this.setAnimationListener('line', 2);
		this.setAnimationListener('line', 3);

		let line3: any = document.querySelector('.line3');
		let line3Text: any = document.querySelector('.line3 .terminal-text');

		let animation: any = document.querySelector('.website-content.terminal');
		let title: any = document.querySelector('.title.terminal');
		let line4: any = document.querySelector('.line4');
		let line3Cursor: any = document.querySelector('.line3 .white-cursor');
		let line4Text: any = document.querySelector('.line4 .terminal-text');
		line3.addEventListener('animationend', () => {
			setTimeout(() => {
				line3Cursor.style.visibility = 'hidden';
				line4.style.display = 'block';
				animation.setAttribute('class', animation.getAttribute('class') + ' command-init');
				title.setAttribute('class', title.getAttribute('class') + ' command-init');
				line4Text.style.animationPlayState = 'running';
			}, 200);
		});

		let line5: any = document.querySelector('.line5');
		let line5Text: any = document.querySelector('.line5 .terminal-text');
		line4.addEventListener('animationend', () => {
			setTimeout(() => {
				this.hideLine(1);
				this.hideLine(2);
				this.hideLine(3);
				this.hideLine(4);
				line5.style.display = 'block';
				line5Text.style.animationPlayState = 'running';
			}, 100);
		});

		line5.addEventListener('animationend', () => {
			setTimeout(() => {
				let list: NodeListOf<Element>  = document.querySelectorAll('.command-init');
				_.each(list, (el: Element) => {
					el.classList.remove('command-init');
				});
				animation.style.display = 'none';
				let websiteContainer: any = document.querySelector('.website-container');
				websiteContainer.style.visibility = 'visible';
				websiteContent = document.querySelector('.website-container .website-content');
				websiteContent.style.visibility = 'visible';
				title.style.visibility = 'visible';
				let animationContainer: any = document.querySelector('.animation-initial');
				animationContainer.classList.remove('animation-initial');
				websiteContent.classList.add('active');
			}, 200);
		});
	}

	setAnimationListener(suffix: string, lineNumber: number): void {
		const lineClass: string = '.' + suffix + lineNumber;
		const prevLineClass: string = '.' + suffix + (lineNumber - 1);
		let line: any = document.querySelector(lineClass);
                let lineText: any = document.querySelector(lineClass + ' .terminal-text');
		let prevLine: any = document.querySelector(prevLineClass);
                let prevLineCursor: any = document.querySelector(prevLineClass + ' .white-cursor');
		prevLine.addEventListener('animationend', () => {
			setTimeout(() => {
				prevLineCursor.style.visibility = 'hidden';
				line.style.display = 'block';
				lineText.style.animationPlayState = 'running';
		  	}, 200);
		});
	}

	hideLine(lineNumber: number): void {
		const lineClass = '.line' + lineNumber;
		let element: any = document.querySelector(lineClass);
		element.style.display = 'none';
	}

	public getClass(): string {
		return 'forforOAa';
	}

	private getTodayDate(): void {
		let todayDate: Date = new Date();
		this.dateString = `${todayDate.getFullYear()}-${this.getTwoDigits(todayDate.getMonth())}-${this.getTwoDigits(todayDate.getDate())}` +
			`${this.getTwoDigits(todayDate.getHours())}:${this.getTwoDigits(todayDate.getMinutes())}:` +
			`${this.getTwoDigits(todayDate.getSeconds())}`;
	}

	private getTwoDigits(digit: number): string {
		let digitString: string = digit.toString();
		return digitString.length === 1 && '0' + digitString || digitString;
	}
}

GlobalCtrl.$inject = ['BasicInfoDao', 'DaoFacade', '$interval', '$timeout'];
