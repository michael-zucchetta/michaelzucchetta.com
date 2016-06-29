export default class Utils {

	public static setKey: Function = (keyEvent: any, key: number) : void => {
		Object.defineProperty(keyEvent, 'key', {value: Number(key).toString()});
	};

}
