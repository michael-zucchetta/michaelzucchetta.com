let trustHtmlFilter: Function = ($sce: ng.ISCEService): Function => {
	return (value: string, type: string) => $sce.trustAs(type || 'html', value);
};

trustHtmlFilter.$inject = ['$sce'];

export default angular.module('TrustHtmlFilter', [])
	.filter('TrustHtmlFilter', trustHtmlFilter)
	.name;
