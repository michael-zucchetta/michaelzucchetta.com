import Constants from 'js/services/constants';
import mz from 'domains';

interface IMyScope extends ng.IScope {
  activeClass: string;

  unactiveClass: string;
}

class DropdownMenuCtrl {

	private prefix: string;

	private showMenu: boolean;

	// add ng-click to the element that has the directive
	public showHideMenu(): void {
		this.showMenu = !this.showMenu;
	}

	constructor() {
		this.prefix = Constants.FUNCTION_PREFIX;
	}
}

class DropdownMenuDirective implements ng.IDirective {

	public scope: any;

	constructor(private $http: ng.IHttpService, private $compile: ng.ICompileService, private $timeout: ng.ITimeoutService, private DaoFacade) {
		this.scope = {
			menuEls: '=dropdownMenu',
		};
	}

	restrict = 'A';

	template = (element: ng.IAugmentedJQuery) => {
		element.attr('ng-click', 'showHideMenu()');
		return require('directives/dropdown-menu/dropdown-menu.html');
	};

	css = require('directives/dropdown-menu/dropdown-menu.scss');

	controller = DropdownMenuCtrl;

	controllerAs = '$ctrl';

	link = (scope: any, element: ng.IAugmentedJQuery) => {
		this.$timeout(() => {
			// +1 is the border of the menu
			// let newTop = $(element).outerHeight() + 1;
			// $(element).children().css('right', 0);
			// $(element).children().css('top', newTop + 1);
			// $(element).children().css('z-index', 100);
		});
	};

	static factory(): ng.IDirectiveFactory {
		const directive = ($http: ng.IHttpService, $compile: ng.ICompileService,
					$timeout: ng.ITimeoutService, DaoFacade: mz.IDaoFacade) => new DropdownMenuDirective($http, $compile, $timeout, DaoFacade);
		directive.$inject = ['$http', '$compile', '$timeout', 'DaoFacade'];
		return directive;
	}
}

export default DropdownMenuDirective;
