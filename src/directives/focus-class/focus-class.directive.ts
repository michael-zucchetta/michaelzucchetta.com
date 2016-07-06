interface IMyScope extends ng.IScope {

	activeClass: string;

	unactiveClass: string;
}

class FocusCtrl {

	private active: boolean;

	public static $inject: string[] = ['$scope'];

	constructor(private $scope: IMyScope) {
	}

	public setActive(): void {
		this.active = true;
	}

	public setUnactive(): void {
		this.active = false;
	}

	public getClass(): string {
		return this.active ? this.$scope.activeClass : this.$scope.unactiveClass;
	}
}

class FocusClass implements ng.IDirective {

	public scope: any;

	public transclude: boolean;

	public replace: boolean;

	public restrict: string;

	public template: any = require('./focus-class.html');

	public controller: Function = FocusCtrl;

	public controllerAs: string = '$ctrl';

	constructor() {
		this.scope = {
			activeClass: '@active',
			unactiveClass: '@unactive',
		};
		this.transclude = true;
		this.replace = true;
		this.restrict = 'A';
	}

	public link: Function = (scope: IMyScope) => {
		// temporary comment for tslint
	}

	public static factory(): ng.IDirectiveFactory {
		const directive: ng.IDirectiveFactory = () => new FocusClass();
		return directive;
	}

}

export default angular.module('focusClass', [])
.directive('focusClass', FocusClass.factory())
.name;
