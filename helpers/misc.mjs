import './stylus.min.js';

const delay = ms => new Promise(res => setTimeout(res, ms));

const alreadyAppended = {};
const appendScript = (url) => {
		if(alreadyAppended[url]){ return; }
		return new Promise((resolve, reject) => {
				alreadyAppended[url] = true;
				const script = document.createElement('script');
				script.crossOrigin = "anonymous";
				script.onload = resolve;
				script.src = url;
				document.head.appendChild(script);
		});
};
const appendStyleSheet = (url) => {
		if(alreadyAppended[url]){ return; }
		return new Promise((resolve, reject) => {
				alreadyAppended[url] = true;
				const style = document.createElement('link');
				style.rel = "stylesheet";
				style.crossOrigin = "anonymous";
				style.onload = resolve;
				style.href = url;
				document.head.appendChild(style);
		});
};
const appendCompiledStyleSheet = (url) => {
		if(alreadyAppended[url]) return;
		return new Promise(async (resolve, reject) => {
				alreadyAppended[url] = true;
				const cssBody = await (await fetch(url)).text();
				const style = document.createElement('style');
				style.id = 'foo-'+Math.random().toString().replace('0.','')
				style.textContent = stylus.render(cssBody);
				document.head.appendChild(style);
				resolve();
		});
};
const appendUrls = async (urls=[]) => {
	const queue = Array.isArray(urls)
		? [ ...urls ]
		: [ urls ];

	for(var i=0; i<queue.length; i++){
		let url = queue[i];
		if(url[0] === '/'){
			url = location.origin + url;
		}
		if(["css"].includes(url.split('.').pop()) ){
			await appendStyleSheet(url);
			continue;
		}
		if(["styl"].includes(url.split('.').pop()) ){
			await appendCompiledStyleSheet(url);
			continue;
		}
		if(url.split('.').pop() === "js"){
			await appendScript(url);
			continue;
		}
		console.error('error appendUrl: ' + url);
	}
}
const importCSS = async (url) => await appendUrls([url]);

// like append, but in parallel except when nested
const addUrls = async (urls=[]) => {
	const queue = Array.isArray(urls)
		? [ ...urls ]
		: [ urls ];

	const promisedQueue = queue.map(url => {
		if(url[0] === '/'){
			url = location.origin + url;
		}
		if(Array.isArray(url)) return window.appendUrls(url);

		if(["css"].includes(url.split('.').pop()) ){
			return appendStyleSheet(url);
		}
		if(["styl"].includes(url.split('.').pop()) ){
			return appendCompiledStyleSheet(url);
		}
		if(url.split('.').pop() === "js"){
			return appendScript(url);
		}
	})
	return Promise.all(promisedQueue);
}

const htmlToElement = function htmlToElement(html) {
	var template = document.createElement('template');
	html = html.trim(); // Never return a text node of whitespace as the result
	template.innerHTML = html;
	//also would be cool to remove indentation from all lines
	return template.content.firstChild;
}

// this relies on dependency being present in hosting page: see js.html
function prism(lang, code, classList){
	const codeEl = document.createElement('code');
	codeEl.innerHTML = code.trim();
	codeEl.className = "language-" + lang;

	const preEl = document.createElement('pre');
	preEl.className = (classList ? classList : '');
	preEl.appendChild(codeEl);
	document.body.appendChild(preEl);

	Prism.highlightElement(codeEl);
}

function consoleHelper(){
	console.bak = console.log;
	console.log = (...args) => {
		const text = args[0];
		const el = document.createElement('pre');
		el.innerText = text;
		document.body.appendChild(el);
		console.bak(...args);
	};

	console.bakInfo = console.info;
	console.info = (...args) => {
		const text = args[0];
		const el = document.createElement('pre');
		el.innerText = text;
		el.className = "info";
		document.body.appendChild(el);
		console.bakInfo(...args);
	};

	console.bakError = console.error;
	console.error = (...args) => {
		const text = args[0];
		const el = document.createElement('pre');
		el.innerHTML = typeof text === 'object'
			? JSON.stringify(text, null, 2)
			: text;
		el.className = "error";
		document.body.appendChild(el);
		console.bakError(...args);
	};
}

export class Stepper {
	current = 0;
	constructor(steps, onStep){
		this.steps = steps;
		this.onStep = () => onStep(this.current, this.steps[this.current]);
		this.onStep();
		
		const keyHandler = event => ({
			ArrowLeft: this.prev,
			ArrowRight: this.next
		}[event.key]);
		document.onkeydown = (e) => keyHandler(e) && keyHandler(e)(e);
	}
	next = () => {
		if(this.current + 1 >= this.steps.length) return
		this.current++;
		this.onStep()
	}
	prev = () => {
		if(this.current - 1 < 0) return
		this.current--;
		this.onStep();
	}
}

// modded from https://www.sitepoint.com/cache-fetched-ajax-requests/
const cachedFetch = (options) => (url, fetchOpts) => {
	let expiry = 5 * 60 // 5 min default
	if (typeof options === 'number') {
		expiry = options
		options = undefined
	} else if (typeof options === 'object') {
		expiry = options.seconds || expiry
	}
	let cacheKey = url
	let cached = localStorage.getItem(cacheKey)
	let whenCached = localStorage.getItem(cacheKey + ':ts')
	if (cached !== null && whenCached !== null) {
		let age = (Date.now() - whenCached) / 1000
		if (age < expiry) {
			let response = new Response(new Blob([cached]))
			return Promise.resolve(response)
		} else {
			sessionStorage.removeItem(cacheKey)
			sessionStorage.removeItem(cacheKey + ':ts')
		}
	} 

	return fetch(url, fetchOpts)
		.then(response => {
			if (response.status !== 200) return response;
			let ct = response.headers.get('Content-Type');
			const isJson =ct && (ct.match(/application\/json/i) || ct.match(/text\//i));
			if (isJson) {
				response.clone().text()
					.then(content => {
						sessionStorage.setItem(cacheKey, content)
						sessionStorage.setItem(cacheKey+':ts', Date.now())
					});
			}
			return response
		});
}


export {
	delay,
	importCSS,
	htmlToElement,
	prism,
	consoleHelper,
	cachedFetch,

	//DEPRECATE exporting these?
	appendUrls,
	addUrls
};
