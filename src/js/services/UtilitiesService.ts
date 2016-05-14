import angular = require('angular');
import StringUtils from 'js/services/StringUtils';
import Constants from 'js/services/Constants';

class UtilsFactory {

	// constructor(private $route: ng.route.IRouteService) {
	constructor(private $route) {
	}

	public initializeMenu(rawMenu) {
		let menu = {};
		_.each(rawMenu, (element) => {
			if (element.id in menu) {
				return;
			}
			if (!element.parentId) {
				if (!menu[element.id]) {
					menu[element.id] = {};
				}
				_.each(element, (attr, key) => {
					menu[element.id][key] = attr;
				});
			}
			else {
				if (!menu[element.parentId].children) {
					menu[element.parentId].children = [];
				}
				menu[element.parentId].children.push(element);
			}
		});
		return menu;
	}

	public setRouteDinamically(menu): void {
		let route = this.$route.route;
		_.each(menu, (menuItem) => {
			if (menuItem.active) {
				this.$route.when('/' + Constants.FUNCTIONS_PREFIX + '/' + menuItem.id, route.resolve(menuItem.name)); 
			}
		});
		this.$route.otherwise(Constants.DEFAULT_PAGE);
		this.$route.reload();
	}

	public removeFormattationFromString(inputString: string): string {
		let newString = StringUtils.removeTabs(inputString);
		newString = StringUtils.removeSpaces(newString);
		newString = StringUtils.removeNewLines(newString);
		newString = StringUtils.removeEscapes(newString);
		return newString;
	}
}

function UtilitiesServiceFactory ($route) {
	return new UtilsFactory($route);
}

UtilitiesServiceFactory.$inject = ['$route'];

angular.module('common', ['ngRoute'])
	.factory('UtilitiesService', UtilitiesServiceFactory);


export default UtilsFactory;
