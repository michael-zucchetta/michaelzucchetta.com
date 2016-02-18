/// <reference path="../../../lib/DefinitelyTyped/jquery/jquery.d.ts" />
/// <reference path="../../../lib/DefinitelyTyped/requirejs/require.d.ts" />

var jquery = define('jQuery');
module BaseImports {
	class CarelPos {
		public left: number;
		public top: number;
	}
	class TextEditor {
		private display: HTMLElement;
		private textarea: HTMLElement;
		private container: HTMLElement;
		private cellWidth: number = 8;
		private cellHeight: number = 16;
		private editorWidth: number;
		private editorHeight: number;
		private colsNumber: number;
		private rowsNumber: number;
		private statusMatrix: number[][];
		private textValue: string = "";
		private cellX: number = 0;
		private cellY: number = 0;
		private carelPos: CarelPos = {
			left: 0,
			top: 0
		};

		constructor(displayQuery: string, textareaQuery: string, containerQuery: string, rowSuffix: string) {
			/**
			 * rowSuffix is the name of the single row class, such as cell html elements
			 * display is where the text is displayed
			 * textarea is the textarea itself (not visible)
			 * container is the html element containing the editor
			 */
			this.display = $(displayQuery)[0];
			this.textarea = $(textareaQuery)[0];
			this.container = $(containerQuery)[0];
			
		}
	}
}
