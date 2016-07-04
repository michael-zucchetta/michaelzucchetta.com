interface IMyScope extends ng.IScope {

	activeClass: string;

	unactiveClass: string;
}

class FocusCtrl {

	private active: boolean;

	static $inject: string[] = ['$scope'];

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

	public scope: any;

	public transclude: boolean;

	public replace: boolean;

	public restrict: string; 	

	constructor() {
		this.scope = {
			activeClass: '@active',
			unactiveClass: '@unactive',
		};
		this.transclude = true;
		this.replace = true;
		this.restrict = 'A';
	}

	template: any = require('./focus-class.html');

	controller = FocusCtrl;

	controllerAs = '$ctrl';

	link = (scope: IMyScope) => {
		// temporary comment for tslint
	}

	static factory(): ng.IDirectiveFactory {
		const directive = () => new FocusClass();
		return directive;
	}

}

export default angular.module('focusClass', [])
.directive('focusClass', FocusClass.factory())
.name;
