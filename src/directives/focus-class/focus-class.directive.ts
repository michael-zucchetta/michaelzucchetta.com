interface IMyScope extends ng.IScope {

	activeClass: string;

	unactiveClass: string;
}

class FocusCtrl {

	private active: boolean;

	static $inject = ["$scope"]
	constructor(private $scope: IMyScope) {
	}

	public setActive(): void {
		this.active = true;
	}

	public setUnactive(): void{
		this.active = false;
	}

	public getClass() {
		return this.active? this.$scope.activeClass : this.$scope.unactiveClass;
	}
}

class FocusClass implements ng.IDirective {

	transclude = true;

	replace = true;

	restrict = 'A';

	public scope: any;

	constructor() {
		this.scope = {
			activeClass: '@active',
			unactiveClass: '@unactive',
		};
	}

	template: any = require('./focus-class.html');

	controller = FocusCtrl;

	controllerAs = '$ctrl';

	link = (scope: IMyScope) => {
	}

	static factory(): ng.IDirectiveFactory {
		const directive = () => new FocusClass();
		return directive;
	}

}

export default angular.module('focusClass', [])
.directive('focusClass', FocusClass.factory())
.name;
