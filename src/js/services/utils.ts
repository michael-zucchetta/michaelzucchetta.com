import StringUtils from 'js/services/string-utils';
import mz from 'domains';

export default class Utils {

	public static addElementToMenu(menuCollector: mz.IMenuEl[], element: mz.IMenuEl): mz.IMenuEl[] {
		if (element && !element.parentId) {
			menuCollector[element.id] = angular.copy(element);
		} else {
			if (!menuCollector[element.parentId].children) {
				menuCollector[element.parentId].children = [];
			}
			menuCollector[element.parentId].children.push(element);
		}

		return menuCollector;
	}

	public static initializeMenu(rawMenu: mz.IMenuEl[]): mz.IMenuEl[] {
		let menu: mz.IMenuEl[] = [];
		_.reduce(rawMenu, Utils.addElementToMenu, menu);
		return _.compact(menu);
	}

	public static removeFormattationFromString(inputString: string): string {
		let newString: string = StringUtils.removeTabs(inputString);
		newString = StringUtils.removeSpaces(newString);
		newString = StringUtils.removeNewLines(newString);
		newString = StringUtils.removeEscapes(newString);
		return newString;
	}
}
