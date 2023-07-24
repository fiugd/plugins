/*
	use?: http://teavm.org/sandbox/
	use?: https://plasma-umass.org/doppio-demo/
	todo: https://github.com/plasma-umass/doppio/tree/master/docs
*/

const inputEl = document.querySelector('textarea.input')
const outputEl = document.querySelector('pre.output');

const constructPersistantFs = () => {
	return new Promise((cb) => {
		if (BrowserFS.FileSystem.IndexedDB.isAvailable()) {
			const idbfs = new BrowserFS.FileSystem.IndexedDB((e, fs) => {
				if (e) {
					cb(new BrowserFS.FileSystem.InMemory());
				} else {
					cb(idbfs);
				}
			}, 'doppio-cache');
		} else if (BrowserFS.FileSystem.HTML5FS.isAvailable()) {
			const html5fs = new BrowserFS.FileSystem.HTML5FS(100*1024*1024);
			html5fs.allocate((e) => {
				if (e) {
					cb(new BrowserFS.FileSystem.InMemory());
				} else {
					cb(html5fs);
				}
			});
		} else {
			cb(new BrowserFS.FileSystem.InMemory());
		}
	});
};

const checkFileSystem = async (path = '/') => {
	const fs = BrowserFS.BFSRequire('fs');
	const files = await new Promise((resolve) => {
		fs.readdir(path, (err, files) => {
			resolve(files);
		});
	});
	console.log({ [path]: files });
}

var stdout = [];
var stderr = [];
const setupOutput = () => {
	var stdoutBuffer = '';
	var stderrBuffer = '';
	const process = BrowserFS.BFSRequire('process');
	process.initializeTTYs();

	process.stdout.on('data', function(data) {
		stdoutBuffer += data.toString();
		var newlineIdx;
		while ((newlineIdx = stdoutBuffer.indexOf("\n")) > -1) {
			stdout.push(stdoutBuffer.slice(0, newlineIdx));
			stdoutBuffer = stdoutBuffer.slice(newlineIdx + 1);
		}
	});
	process.stderr.on('data', function(data) {
		stderrBuffer += data.toString();
		var newlineIdx;
		while ((newlineIdx = stderrBuffer.indexOf("\n")) > -1) {
			stderr.push(stderrBuffer.slice(0, newlineIdx));
			stderrBuffer = stderrBuffer.slice(newlineIdx + 1);
		}
	});
}

const setupBrowserFS = async () => {
	console.log('Setting up Doppio...')
	const fs = BrowserFS.BFSRequire('fs');
	const { Buffer } = BrowserFS.BFSRequire('buffer');
	const mfs = new BrowserFS.FileSystem.MountableFileSystem();
	BrowserFS.initialize(mfs);

	const zipData = await fetch('https://plasma-umass.org/doppio-demo/doppio_home.zip')
		.then(function(response) {
			return response.arrayBuffer();
		});
	//const persistentFs = await constructPersistantFs();
	fs.mkdirSync('/mnt');
	const persistentFs = new BrowserFS.FileSystem.ZipFS(new Buffer(zipData));
	mfs.mount('/persist', persistentFs);
	mfs.mount('/home', persistentFs);
	mfs.mount('/tmp', new BrowserFS.FileSystem.InMemory());
	mfs.mount('/mnt/localStorage', new BrowserFS.FileSystem.LocalStorage());
	mfs.mount('/doppio_home', new BrowserFS.FileSystem.ZipFS(new Buffer(zipData)));

	BrowserFS.initialize(mfs);
	//await setupFileSystem(persistentFs);
	
	//await checkFileSystem('/persist');
	//await checkFileSystem('/home/classes');

	setupOutput();
};

const getJVM = (args) => {
	return new Promise((resolve, reject) => {
		const callback = function(err, jvmObject) {
			if(err) return reject(err);
			resolve(jvmObject);
		};
		new Doppio.VM.JVM(args, callback);
	});
};

const runCommand = (args) => {
	return new Promise((resolve, reject) => {
		Doppio.VM.CLI(
			// Arguments to the 'java' command.
			args,
		{
			doppioHomePath: '/home'
		}, function(exitCode) {
			resolve(exitCode);
		});
	});
};

const runClass = async ({ classpath, classname, args }) => {
	console.log(`Running (${classpath}/${classname} ${args}) ...`)
	const jvm = await getJVM({
		// '/sys' is the path to a directory in the BrowserFS file system with:
		// * vendor/java_home/*
		doppioHomePath: '/home',
		// Add the paths to your class and JAR files in the BrowserFS file system
		//classpath: ['.', '/doppio_home/myStuff.jar', '/doppio_home/classes']
		classpath: ['.', classpath]
	});
	//console.log({ jvm })
	return new Promise((resolve) => {
		jvm.runClass(classname, args, function(exitCode) {
			let output = ''
			if (exitCode === 0) {
				output = stdout.join('\n');
			} else {
				output = 'ERROR: ' + stderr.join('\n')
			}
			stdout = [];
			stderr = [];
			resolve(output);
		});
	})
};

const compile = async (path) => {
	console.log(`Compiling Java (${path})...`)
	//console.log({ path})
	const args = [
		'-classpath', '/home/classes/util',
		"Javac",
		path
		//"myFib.java"
	];
	return await runCommand(args)
}

const runCompiled = async () => {
	//runCommand(['-classpath', '/home/classes/demo', 'Fib', '9'])
	//Doppio.VM.CLI(['-h'])
	// ^^^ should work but does not
};

const writeFile = ({ name, data }) => {
	const fs = BrowserFS.BFSRequire('fs');
	return new Promise((resolve) => {
		fs.writeFile(name, data, (err) => {
			if(err) console.log({ err })
			resolve()
		});
	});
}

(async () => {
	await setupBrowserFS();

	let code = inputEl.textContent;
	if(code.includes("template_input")){
		code = `
			public class Main {
				public static void main(String[] args) {
					System.out.println("hello, world (java)");
				}
			}`.trim().replace(/^\t\t\t/gm, '')
	}
	//console.log({ code });

	await writeFile({ 
		name:'/mnt/localStorage/Main.java',
		data: code
	});
	await compile('/mnt/localStorage/Main.java');
	// console.log({ stderr, stdout })
	// await checkFileSystem('/mnt/localStorage');

	const runOutput = await runClass({
		classpath: '/mnt/localStorage',
		classname: 'Main',
		args: []
	});

	// const runOutput = await runClass({
	// 	classpath: '/home/classes/demo',
	// 	classname: 'Fib',
	// 	args: ['9']
	// });

// 	const output = `
// 		WIP:
// 		see https://github.com/plasma-umass/doppio/tree/master/docs
// 		supports Java 8 SDK
// 			- java
// 			- scala
// 			- kotlin?
// 			- groovy?
// 			- clojure?
// 			- frege? (mostly compliant with Haskell)

// 		${runOutput}
// 	`.trim().replace(/^\t\t/gm, '');

	outputEl.textContent = runOutput;
})();

