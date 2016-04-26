export default class Utils {
	
	public setKey: Function = (keyEvent: KeyboardEvent, key: number) : void => {
                keyEvent.key = Number(key).toString();
        };	
}
