console.log('hahahaha');
// const filesContext = require.context('.', true, /!(interface)\.ts$/);
// const filesContext = require.context('./components', true, /\.ts/);
//filesContext.keys().forEach(filesContext);
//require.context('./js/initialisation', false, 'main.ts');
// const filesContext = require.context(".", true, /\.*!(interface)\.ts/)
const filesContext = require.context("./js/initialisation", true, /^((?![\\/]domains|interface[\\/]).)*\.ts$/)
filesContext.keys().forEach(filesContext);
console.log(filesContext.keys());
