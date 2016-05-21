import Constants from 'js/services/Constants';
import DaoFacade from 'js/serivces/dao-facade';

export default class DropdownMenuCtrl {

	constructor() {
		let vm: any = this;
		vm.prefix = Constants.FUNCTION_PREFIX;
		// add ng-click to the element that has the directive
		vm.showHideMenu = (): void => vm.showMenu = !vm.showMenu;
	}
}

let dropDownMenuDirective: Function = ($http, $compile, $timeout, DaoFacade) => {
	return {
		restrict: 'A',
		template: (element, attrs) => {
					element.attr("ng-click", "showHideMenu()");
		},
		css: '/directives/dropdown-menu/dropdown-menu.css',
		controller: DropdownMenuCtrl,	
		link: (element) => { 
			$http.get('/directives/dropdown-menu/dropdown-menu.html').then((template) => {
				let templateHtml = $(template.data);
				let compiledTemplate = $compile(templateHtml)(scope);
				element.after(compiledTemplate);
				element.removeAttr("dropdown-menu");
				$compile(element)(scope);
				
				$timeout(() => {
					// +1 is the border of the menu
					let newTop = $(element).outerHeight() + 1;
					$(compiledTemplate).css("right", 0);
					$(compiledTemplate).css("top", newTop + 1);
					$(compiledTemplate).css("z-index", 100);
				});
					
				// init the menu
				DaoFacade.getMenu().then((response) => {
					scope.menuEls = response;
				});
			});
		}
	};
};
dropDownMenuDirective.$inject = ['$http', '$compile', '$timeout', 'DaoFacade'];

angular.module(Constants.MAIN_MODULE).directive(dropDownMenuDirective);
