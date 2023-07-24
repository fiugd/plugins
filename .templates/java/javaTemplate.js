/*
	use?: http://teavm.org/sandbox/
	use?: https://plasma-umass.org/doppio-demo/
	todo: https://github.com/plasma-umass/doppio/tree/master/docs
*/

const inputEl = document.querySelector('textarea.input')
const outputEl = document.querySelector('pre.output');

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

const getJVM = (args) => {
	return new Promise((resolve, reject) => {
		const callback = function(err, jvmObject) {
			if(err) return reject(err);
			return jvmObject;
		};
		new Doppio.VM.JVM(args, callback);
	});
}

const runCompiled = async () => {

	const jvm = await getJVM({
		// '/sys' is the path to a directory in the BrowserFS file system with:
		// * vendor/java_home/*
		doppioHomePath: '/sys',
		// Add the paths to your class and JAR files in the BrowserFS file system
		classpath: ['.', '/sys/myStuff.jar', '/sys/classes']
	});
	console.log({ jvm })

	// Run a particular class!
	// foo.bar.Baz *must* contain a public static void main method.
	jvm.runClass('foo.bar.Baz', ['argument1', 'argument2'], function(exitCode) {
		if (exitCode === 0) {
			// Execution terminated successfully
		} else {
			// Execution failed. :(
		}
	});

	// If you'd rather run a JAR file, you can do that, too! Put the JAR file as the only item in the
	// classpath, and then:
	// jvmObject.runJar(['argument1', 'argument2'], function(exitCode) {
	// 	// etc.
	// });
	// The JAR must have a manifest that specifies a main class,
	// and that class must have a public static void main method.

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
	runCompiled();
})();

