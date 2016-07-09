console.log('hahahaha');
const filesContext = require.context('.', true, /^\.\/(domains)\/[^\/]+\.ts$/);
let keys = filesContext.keys();
for (let i = 0; i < keys.length; ++i) {
	let key = keys[i];
	if (key.indexOf('domains') !== -1 || key.indexOf('dao-facade') !== -1) {
		delete filesContext[key];
	}
}
filesContext.keys().forEach(filesContext);
