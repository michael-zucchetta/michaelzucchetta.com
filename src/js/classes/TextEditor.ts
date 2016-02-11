/// <reference path="../../../lib/DefinitelyTyped/jquery/jquery.d.ts" />

import * as keys from "./KeyConstants";
export class TextEditor {
	private display: HTMLElement;
	private textarea: HTMLElement;
	private container: HTMLElement;

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
