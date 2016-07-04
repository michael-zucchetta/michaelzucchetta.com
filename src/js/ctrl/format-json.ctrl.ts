import 'js/services/utils';
import Constants from 'js/services/constants';
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

export default angular.module(Constants.MAIN_MODULE).
	controller('FormatJsonCtrl', FormatJsonCtrl);
