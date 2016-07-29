export default class RegexUtils {

	public static newLines: RegExp = new RegExp('\\n', 'g');

	public static spaces: RegExp = new RegExp('\\ ', 'g');

	public static tabs: RegExp = new RegExp('\\t', 'g');

	public static backslashes: RegExp = new RegExp('\\\\', 'g');

	public static hexadecimal: RegExp = new RegExp('[#]?[0-9a-fA-F]{3}', 'g');
	
	public static notHexadecimal: RegExp = new RegExp('[^0-9a-fA-F]', 'g');
}
