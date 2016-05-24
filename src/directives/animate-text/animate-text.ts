import Constants from 'js/services/Constants';

class AnimateTextCtrl {
	
	constructor($interval) {	
		let vm = this;
		vm.letters = [];
		vm.lettersBuffer = scope.dataText.split('');
		let pushLetters = () => {
			vm.letters.push(scope.lettersBuffer.shift());
		       	if (vm.lettersBuffer.length === 0) {
				$interval.cancel(vm.endInterval);
			}
		};
		vm.endInterval = $interval(pushLetters, 100);
	}
}

AnimateTextCtrl.$inject = ['$interval'];

interface IComponentOptionsCss extends ng.IComponentOptions {
	        css: string;
};

let animateTextOpts: IComponentOptionsCss = {
	bindings: {
		dataText: '@animateText'
	},
	templateUrl: '/directives/animate-text/animate-text.html',
	css: '/directives/animate-text/animate-text.css',
	controller: AnimateTextCtrl
}

export default angular.module(Constants.MAIN_MODULE).component('animateText', animateTextOpts);
