import 'js/services/utils';
import Constants from 'js/services/Constants';

class FormatJsonCtrl {

	private unformattedJson: string;

	constructor(private UtilitiesService) {
	}

	public unformatJson() {
		let formattedJson = this.UtilitiesService.removeFormattationFromString(this.unformattedJson);
		this.unformattedJson = JSON.stringify(formattedJson);
	}
}

FormatJsonCtrl.$inject = ['UtilitiesService'];

export default angular.module(Constants.MAIN_MODULE).
	controller('FormatJsonCtrl', FormatJsonCtrl);
