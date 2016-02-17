/// <reference path="../../../lib/DefinitelyTyped/jasmine/jasmine.d.ts" />
/// <reference path="../../../lib/DefinitelyTyped/lodash/lodash.d.ts" />

describe ("Test TextEditor class", () => {

	let editor;
	let display;
	let textarea;
	let container;

	let charEvent: Event;
	let newCharEvent: Event;
	let charEventDel: Event;

	//move events
	let leftArrowEvent: Event;
	let rightArrowEvent: Event;
	let downArrowEvent: Event;
	let upArrowEvent: Event;

	let uselessCharEvent: Event;

	let setInitialStrings = (strings: string[]) => {
		_.each(strings, () => {
			editor.s
		});
	};

});
