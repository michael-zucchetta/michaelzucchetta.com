import StringUtils from 'js/services/string-utils';
import mz from 'domains';

export default class Utils {

	public static initializeMenu(rawMenu: mz.IMenuEl[]): mz.IMenuEl[] {
		let menu: mz.IMenuEl[] = [];
		rawMenu.forEach((element: mz.IMenuEl) => {
			if (!element.parentId) {
				menu[element.id] = angular.copy(element);
			} else {
				if (!menu[element.parentId].children) {
					menu[element.parentId].children = [];
				}
				menu[element.parentId].children.push(element);
			}

			if (element.id in menu) {
				return;
			}
		});
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
