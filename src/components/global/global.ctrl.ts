import Constants from 'js/classes/Constants';
import mz from 'domains';

export default class GlobalCtrl {

	private myLinks;

	private menu: mz.IMenuEl[];

	public dateString: string;

	private userIP: string;

	private regionIP: string;

	private countryIP: string;

	private title;

	private animation;

	private websiteContent;

	private showWholeMenu: boolean;

	constructor(private BasicInfoDao: mz.IBasicInfoDao, private DaoFacade: mz.IDaoFacade,
			private $interval: ng.IIntervalService, private $timeout: ng.ITimeoutService, private $state: angular.ui.IStateService, private $location: ng.ILocationService, private $scope: any) {
		this.myLinks = [];
		this.menu = [];
		this.$interval(() => this.getTodayDate(), 1000);
		this.showWholeMenu = false;
		const menuContainer: any = document.querySelector('.menu-container');
		$scope.$watch(() => this.showWholeMenu, () => {
			if (!this.showWholeMenu) {
				menuContainer.classList.remove('menu-visible');
			} else {
				menuContainer.classList.add('menu-visible');
			}
		});

	}

	private findMenuEl(menu: mz.IMenuEl[], url: string): mz.IMenuEl {
		let found: mz.IMenuEl;
		_.each(menu, (el: mz.IMenuEl) => {
			if (el.children) {
				const child = this.findMenuEl(el.children, url);
				if (child) {
					found = child;
				}
			}
			if (el.definition && el.definition.url === url) {
				found = el;
			}
		});
		return found;
	}

	public $onInit(): void {
		this.title = document.querySelector('.title.terminal');
		this.animation = document.querySelector('.website-content.terminal');
		this.websiteContent = document.querySelector('.website-content');

		this.BasicInfoDao.getLinks()
			.then(links => this.myLinks = links);

		this.DaoFacade.getMenu()
			.then((menuEls: mz.IMenuEl[]) => {
			this.menu = menuEls;
			if (this.$location.url() === '') {
				this.$state.go('Home');
				return;
			}
			const state: mz.IMenuEl = this.findMenuEl(this.menu, this.$location.url());
			const menuContainer: any = document.querySelector('.menu-container');
			// tmp for development
			menuContainer.classList.add("menu-visible");
			this.$state.go(state.definition.name);
		});

		this.BasicInfoDao.getIP()
			.then((ipData: any) => {
			this.userIP = ipData.geoplugin_request;
			this.regionIP = ipData.geoplugin_region;
			this.countryIP = ipData.geoplugin_countryName;
		});
		
		let body: any = document.querySelector('body');
		body.style.visibility = 'visible';
		
		if(this.$location.url() !== '') {
			this.showRealContent();
			return;
		}

		let line1Text: any = document.querySelector('.line1 .terminal-text');
		setTimeout(() => {
			// for safari
			this.websiteContent.style.animationPlayState = 'running';
			this.websiteContent.style.webkitAnimationPlayState = 'running';
			// for IE11
			this.websiteContent.style.mzAnimationPlayState = 'running';
		});

		this.websiteContent.addEventListener('animationend', () => {
			setTimeout(() => {
				line1Text.style.animationPlayState = 'running';
				line1Text.style.webkitAnimationPlayState = 'running';
			}, 200);
		});
		this.setAnimationListener('line', 2);
		this.setAnimationListener('line', 3);

		let line3: any = document.querySelector('.line3');

		let line4: any = document.querySelector('.line4');
		let line3Cursor: any = document.querySelector('.line3 .white-cursor');
		let line4Text: any = document.querySelector('.line4 .terminal-text');
		line3.addEventListener('animationend', () => {
			setTimeout(() => {
				line3Cursor.style.visibility = 'hidden';
				line4.style.display = 'block';
				this.animation.setAttribute('class', this.animation.getAttribute('class') + ' command-init');
				this.title.setAttribute('class', this.title.getAttribute('class') + ' command-init');
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
				this.showRealContent();
			}, 200);
		});
	}

	private setAnimationListener(suffix: string, lineNumber: number): void {
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

	private hideLine(lineNumber: number): void {
		const lineClass = '.line' + lineNumber;
		let element: any = document.querySelector(lineClass);
		element.style.display = 'none';
	}

	public getClass(): string {
		return 'forforOAa';
	}

	private getTodayDate(): void {
		let todayDate: Date = new Date();
		this.dateString = `${todayDate.getFullYear()}-${this.getTwoDigits(todayDate.getMonth())}-${this.getTwoDigits(todayDate.getDate())} - ` +
			`${this.getTwoDigits(todayDate.getHours())}:${this.getTwoDigits(todayDate.getMinutes())}:` +
			`${this.getTwoDigits(todayDate.getSeconds())}`;
	}

	private getTwoDigits(digit: number): string {
		let digitString: string = digit.toString();
		return digitString.length === 1 && '0' + digitString || digitString;
	}

	private showRealContent(): void {
		let list: NodeListOf<Element>  = document.querySelectorAll('.command-init');
		_.each(list, (el: Element) => {
		      	el.classList.remove('command-init');
		});
		this.animation.style.display = 'none';
		let websiteContainer: any = document.querySelector('.website-container');
		websiteContainer.style.visibility = 'visible';
		this.websiteContent = document.querySelector('.website-container .website-content');
		this.websiteContent.style.visibility = 'visible';
		this.title.style.visibility = 'visible';
		let animationContainer: any = document.querySelector('.animation-initial');
		animationContainer.classList.remove('animation-initial');
		this.websiteContent.classList.add('active');
	}
}

GlobalCtrl.$inject = ['BasicInfoDao', 'DaoFacade', '$interval', '$timeout', '$state', '$location', '$scope'];
