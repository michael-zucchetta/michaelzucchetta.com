import Constants from 'js/services/Constants';
import 'js/services/dao-facade';

class DropdownMenuCtrl {

	private prefix: string;

	private showMenu: boolean;
	
	// add ng-click to the element that has the directive
	public showHideMenu(): void {
		this.showMenu = !this.showMenu;
	};

	constructor() {
		this.prefix = Constants.FUNCTION_PREFIX;
	}
}

let dropDownMenuDirective: any = ($http: ng.IHttpService, $compile: ng.ICompileService, $timeout: ng.ITimeoutService, DaoFacade) => {
	return {
		restrict: 'A',
		template: (element: ng.IAugmentedJQuery) => {
			element.attr('ng-click', 'showHideMenu()');
		},
		css: 'directives/dropdown-menu/dropdown-menu.css',
		controller: DropdownMenuCtrl,
		link: (scope: any, element: ng.IAugmentedJQuery) => {
			$http.get('directives/dropdown-menu/dropdown-menu.html').then((template) => {
				let templateHtml = $(template.data);
				let compiledTemplate = $compile(templateHtml)(scope);
				element.after(compiledTemplate);
				element.removeAttr('dropdown-menu');
				$compile(element)(scope);

				$timeout(() => {
					// +1 is the border of the menu
					let newTop = $(element).outerHeight() + 1;
					$(compiledTemplate).css('right', 0);
					$(compiledTemplate).css('top', newTop + 1);
					$(compiledTemplate).css('z-index', 100);
				});

				// init the menu
				// DaoFacade.getMenu().then((response) => {
				//	scope.menuEls = response;
				// });
			});
		}
	};
};

dropDownMenuDirective.$inject = ['$http', '$compile', '$timeout', 'DaoFacade'];

export default angular.module(Constants.MAIN_MODULE)
	.directive('dropDownMenu', dropDownMenuDirective);
