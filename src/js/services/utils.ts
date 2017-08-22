import StringUtils from 'js/services/string-utils';
import mz from 'domains';

export default class Utils {

	public static addElementToMenu(menuCollector: mz.IMenuEl[], element: mz.IMenuEl): mz.IMenuEl[] {
		if (element && !element.parentUuid) {
			menuCollector[element.menuUuid] = angular.copy(element);
		} else {
			if (!menuCollector[element.parentUuid].children) {
				menuCollector[element.parentUuid].children = [];
			}
			menuCollector[element.parentUuid].children.push(element);
		}
		console.log('menuCollector', menuCollector);
		return  menuCollector;//Object.keys(menuCollector).map((k) => menuCollector[k]);
	}

	public static initializeMenu(rawMenu: mz.IMenuEl[]): mz.IMenuEl[] {
		let menu: mz.IMenuEl[] = [];
		_.reduce(rawMenu, Utils.addElementToMenu, menu);
		let menuArray: any = Object.keys(menu).map(key => menu[key]);
		return menuArray;
	}

	public static removeFormattationFromString(inputString: string): string {
		let newString: string = StringUtils.removeTabs(inputString);
		newString = StringUtils.removeSpaces(newString);
		newString = StringUtils.removeNewLines(newString);
		newString = StringUtils.removeEscapes(newString);
		return newString;
	}
}
