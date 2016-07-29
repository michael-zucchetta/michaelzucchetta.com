import RegexUtils from 'js/services/regex-utils';

export default class HexRgbConverterController {

	private inputHexValue: string;

	constructor() {
		this.inputHexValue = '#';
	}

	public pasteHexValue($event: any) {
		this.inputHexValue = '#' + $event.clipboardData.getData('text').replace(RegexUtils.notHexadecimal, '');
		$event.preventDefault();
	}
}
