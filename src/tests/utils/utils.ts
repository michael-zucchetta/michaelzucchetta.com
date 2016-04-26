export default class Utils {
	
	public static setKey: Function = (keyEvent: KeyboardEvent, key: number) : void => {
                keyEvent.key = Number(key).toString();
        };	
}
