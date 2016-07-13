import 'js/services/utils';
import mz from 'domains';

class FormatJsonCtrl {

	private unformattedJson: string;

	constructor(private UtilitiesService: mz.IUtils) {
	}

	public unformatJson(): void {
		let formattedJson: string = this.UtilitiesService.removeFormattationFromString(this.unformattedJson);
		this.unformattedJson = JSON.stringify(formattedJson);
	}
}

FormatJsonCtrl.$inject = ['UtilitiesService'];

export default angular.module('FormatJson', []).
	controller('FormatJsonCtrl', FormatJsonCtrl)
	.name;
