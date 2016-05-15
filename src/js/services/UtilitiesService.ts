import StringUtils from 'js/services/StringUtils';

class UtilsFactory {

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

	public removeFormattationFromString(inputString: string): string {
		let newString = StringUtils.removeTabs(inputString);
		newString = StringUtils.removeSpaces(newString);
		newString = StringUtils.removeNewLines(newString);
		newString = StringUtils.removeEscapes(newString);
		return newString;
	}
}


export default UtilsFactory;
