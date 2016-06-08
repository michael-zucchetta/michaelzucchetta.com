import 'angular';

class FocusCtrl {

	public setActive() {
		alert('ciao');
	}

}

class FocusClass implements angular.IDirective {

	constructor(private $compile) {
	}

	transclude = true;

	replace = true;

	restrict = 'A';

	template = '<div ng-mouseover="$ctrl.setActive()" ng-transclude></div>';

	controller = FocusCtrl;

	controllerAs = '$ctrl';

	static factory(): ng.IDirectiveFactory {
		const directive = ($compile: ng.ICompileService) => new FocusClass($compile);
		directive.$inject = ['$compile'];
		return directive;
	}


}


export default angular.module('focusClass', [])
.directive('focusClass', FocusClass.factory())
.name;
