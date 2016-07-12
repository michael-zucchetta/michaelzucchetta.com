console.log('hahahaha');
// const filesContext = require.context('.', true, /!(interface)\.ts$/);
// const filesContext = require.context('./components', true, /\.ts/);
//filesContext.keys().forEach(filesContext);
require.context('./js/initialisation', false, 'main.ts');
require.context("./js", true, /\.*\.ts$/)
