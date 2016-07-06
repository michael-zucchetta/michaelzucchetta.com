interface IClipboardEvent extends Event {
	originalEvent: IClipboardEvent;

	clipboardData?: DataTransfer;
}
