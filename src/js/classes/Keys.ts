class Keys {
	public static leftKey: number = 37;
	public static upKey: number = 38;
	public static rightKey: number = 39;
	public static downKey: number = 40;
	public static delKey1: number = 8;
	public static delKey2: number = 46;
	public static newLineKey1: number = 10;
	public static newLineKey2: number = 13;
	public static tabKey: number = 9;
	public static charA: number = 65;
	public static charX: number = 88;

	public static isDelKey(key: number) {
		return key === Keys.delKey1 || key === Keys.delKey2;
	}

	public static isNewLineKey(key: number) {
		return key === Keys.newLineKey1 || key === Keys.newLineKey2;
	}

	public static isArrowKey(key: number) {
		return [Keys.leftKey, Keys.upKey, Keys.rightKey, Keys.downKey].indexOf(key) !== -1;
	}

	public static getKeyFromEvent($event: KeyboardEvent) {
		//key is the unimplemented new version, the others are deprecated
                let key = $event.key || $event.keyCode || $event.charCode || $event.which;
		if (typeof key === "string") {
			return parseInt(key);
		} else {	
			return key;
		}
	}
}
