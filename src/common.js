
export function byId_(element, id) {
	return element.getElementById(id);
}

export function byId(id) {
    return document.getElementById(id);
}

export function byCl0_(element, name) {
	return element.getElementsByClassName(name)[0];
}

export function byCl0(name) {
    return byCl0_(document, name);
}

export function asciiChar(base, offset) {
	return String.fromCharCode(base.charCodeAt(0) + offset);
}

export function integerSequence(size) {
	let ret = new Array(size);
	for(var i=0; i<size; i++)
		ret[i] = i;
	return ret;
}

export function numClamp(x, min, max) {
	return Math.max(min, Math.min(x, max));
}

export function randomPermutation(num) {
	let ret = integerSequence(num);
	for(var i=num-1; i>=1; i--) {
		let k = Math.floor(Math.random() * (i+1));
		//[ret[k], ret[i]] = [ret[i], ret[k]];
		let tmp = ret[k];
		ret[k] = ret[i];
		ret[i] = tmp;
	}
	return ret;
}

export function inversePermutation(input) {
	let len = input.length;
	let ret = new Array(len);
	for(var i=0; i<len; i++) {
		ret[input[i]] = i;
	}
	return ret;
}

export function setIntersection(A, B) {
	return new Set([...A].filter(x => B.has(x)));
}

export function setDifference(A, B) {
	return new Set([...A].filter(x => !B.has(x)));
}

export function createElementWithText(tagName, txt) {
	let ret = document.createElement(tagName);
	ret.innerText = txt;
	return ret;
}

export function createElementWithInnerHTML(tagName, txt) {
	let ret = document.createElement(tagName);
	ret.innerHTML = txt;
	return ret;
}

export function createLinkWithURLText(url) {
	let ret = createElementWithText("a", url);
	ret.href = url;
	return ret;
}

export function timestampToSeconds(ts) {
	var ret = 0;
	var tmp = 0;
	for(var i=0; i<ts.length; i++) {
		if(isNaN(ts[i])) {
			switch(ts[i]) {
				case 'h': tmp *= 3600; break;
				case 'm': tmp *= 60; break;
				case 's': tmp *= 1; break;
				default:
					console.error("unexpected character "+ts[i]+" in timestamp");
			}
			ret += tmp;
			tmp = 0;
		} else {
			tmp *= 10;
			tmp += parseInt(ts[i]);
		}
	}
	return ret;
}