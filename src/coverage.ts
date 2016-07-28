const filesContext = require.context('./js/initialisation', true, /^((?![\\/]domains|interface[\\/]).)*\.ts$/)
filesContext.keys().forEach(filesContext);
console.log(filesContext.keys());
