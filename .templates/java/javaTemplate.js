/*
	use?: http://teavm.org/sandbox/
	use?: https://plasma-umass.org/doppio-demo/
	todo: https://github.com/plasma-umass/doppio/tree/master/docs
*/

const inputEl = document.querySelector('textarea.input')
const outputEl = document.querySelector('pre.output');

// Wrap in a closure; don't pollute the global namespace.
const setupBrowserFS = () => {
	const mfs = new BrowserFS.FileSystem.MountableFileSystem();
	const fs = BrowserFS.BFSRequire('fs');

	BrowserFS.initialize(mfs);
	mfs.mount('/tmp', new BrowserFS.FileSystem.InMemory());
	mfs.mount('/home', new BrowserFS.FileSystem.LocalStorage());
	// The first argument is the filename of the listings file
	// The second argument is the relative URL to the folder containing the listings file
	// and the data it indexes.
	// In this example, the listings file and DoppioJVM's data is at
	// <thiswebpage>/doppio/listings.json
	mfs.mount('/sys', new BrowserFS.FileSystem.XmlHttpRequest('listings.json'));
};



(async () => {
	const code = inputEl.textContent;
	console.log({ code })
	const output = `
		WIP:
		see https://github.com/plasma-umass/doppio/tree/master/docs
		supports Java 8 SDK
			- java
			- scala
			- kotlin?
			- groovy?
			- clojure?
			- frege? (mostly compliant with Haskell)
	`.trim().replace(/^\t\t/gm, '');

	outputEl.textContent = output;
	
	setupBrowserFS();
})();

