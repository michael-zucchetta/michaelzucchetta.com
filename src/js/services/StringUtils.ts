import RegexUtils from 'js/services/RegexUtils';
import Utils from 'js/services/utils';

class StringUtils {

	public static removeNewLines(inputString: string): string {
		let newString: string = inputString.replace(RegexUtils.newLines, '');
		return newString;
	}

	public static removeSpaces(inputString: string): string {
		let newString: string = inputString.replace(RegexUtils.spaces, '');
		return newString;
	}

	public static removeTabs(inputString: string): string {
		let newString: string = inputString.replace(RegexUtils.tabs, '');
		return newString;
	}

	public static removeEscapes(inputString: string): string {
		let newString: string = inputString.replace(RegexUtils.backslashes, '');
		return newString;
	}

}

export default StringUtils;
