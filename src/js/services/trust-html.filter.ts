import Constants from 'Constants';

let trustHtmlFilter: Function = ($sce: ng.ISCEService): Function => {
	return (value: any, type: string) => {
		return $sce.trustAs(type || 'html', value);
	};
};

export default angular.module(Constants.MAIN_MODULE)
	.filter('TrustHtmlFilter', trustHtmlFilter);
