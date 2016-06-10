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

export default AnimateTextCtrl;
