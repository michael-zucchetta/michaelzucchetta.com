class CharactersCountCtrl {

	public analysedText: string;

	private charactersCount: number;

	private wordsCount: number;

	// load file in word/txt/html
	public countCharsAndWords(): void {
		this.charactersCount = this.analysedText.length;
		this.wordsCount = this.analysedText.split(' ').length;
	}
}

export default angular.module('CharactersCount', [])
	.controller('CharactersCountCtrl', CharactersCountCtrl)
	.name;
