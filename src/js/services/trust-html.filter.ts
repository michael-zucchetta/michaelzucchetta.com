import Constants from 'Constants';

let trustHtmlFilter = ($sce) => {
	return (value, type) => {
		return $sce.trustAs(type || 'html', value);
	};
};

export default angular.module(Constants.MAIN_MODULE)
	.filter('TrustHtmlFilter', trustHtmlFilter);
