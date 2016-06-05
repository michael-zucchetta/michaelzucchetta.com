import StringUtils from 'js/services/string-utils';
import IMenuEl from 'domains/menu';

class Utils {

	public static initializeMenu(rawMenu: IMenuEl[]): IMenuEl[] {
		let menu: IMenuEl[] = [];
		rawMenu.forEach((element: IMenuEl) => {
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
		return menu;
	}

	public static removeFormattationFromString(inputString: string): string {
		let newString: string = StringUtils.removeTabs(inputString);
		newString = StringUtils.removeSpaces(newString);
		newString = StringUtils.removeNewLines(newString);
		newString = StringUtils.removeEscapes(newString);
		return newString;
	}
}

export default Utils;
