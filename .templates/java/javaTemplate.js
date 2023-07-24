/*
	use?: http://teavm.org/sandbox/
	use?: https://plasma-umass.org/doppio-demo/
	todo: https://github.com/plasma-umass/doppio/tree/master/docs
*/

const inputEl = document.querySelector('textarea.input')
const outputEl = document.querySelector('pre.output');

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
})();

