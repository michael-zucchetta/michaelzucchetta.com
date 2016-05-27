import Constants from 'js/services/Constants';

class AnimateTextCtrl {

	private letters: string[];

	private lettersBuffer: string[];

	private dataText: string;

	constructor($interval: ng.IIntervalService) {
		this.letters = [];
		this.lettersBuffer = this.dataText.split('');
		let endInterval: ng.IPromise<any>;
		let pushLetters: Function = (): void => {
			this.letters.push(this.lettersBuffer.shift());
			if (this.lettersBuffer.length === 0) {
				$interval.cancel(endInterval);
			}
		};
		endInterval = $interval(pushLetters, 100);
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
};

export default angular.module(Constants.MAIN_MODULE)
	.component('animateText', animateTextOpts);
