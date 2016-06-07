import 'angular';
class FocusClass {
	
	public setActive: Function;
	
	constructor(private $compile) {

	}

	public link(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) {
		tElement.attr('ng-focus', 'setActive()');
		return tElement;

	}

	public controller() {
		this.setActive = () => {
			alert("ciao");
		};
	}

	public static Factory() {
		let directive = ($compile) => {
			return new FocusClass($compile);
		};
		directive.$inject = ['$compile'];
		return directive;
	}
}


export default angular.module('focusClass', [])
	.directive('focusClass', FocusClass.Factory())
	.name;
