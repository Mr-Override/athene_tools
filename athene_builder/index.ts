class Builder {
	private elem;
	private config = undefined;
	private elems;

	constructor(type: string, config: any, elems: HTMLElement[]) {
		this.elem = document.createElement(type);
		this.config = config;
		this.elems = elems;
	}

	build() {
		if (this.config !== undefined) {
			this.configure();
		}
		if (this.elems.length > 0) {
			this.appendElems();
		}
		return this.elem;
	}

	private configure() {
		// @ts-ignore
		for (let attr in this.config) {
			if (attr === "innerText") {
				// @ts-ignore
				this.elem.innerText = this.config[attr];
			} else if (attr === "$on") {
				// @ts-ignore
				this.elem.addEventListener(this.config[attr].listenFor, this.config[attr].thenDo);
			} else {
				//@ts-ignore
				this.elem.setAttribute(attr, this.config[attr]);
			}
		}
	}

	private appendElems() {
		this.elems.forEach((i) => {
			this.elem.appendChild(i);
		});
	}
}

const typeOfHTMLElements = [
	"article",
	"section",
	"nav",
	"aside",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"header",
	"main",
	"footer",
	"hr",
	"p",
	"span",
	"div",
	"a",
	"strong",
	"small",
	"br",
	"img",
	"iframe",
	"form",
	"label",
	"input",
	"button",
	"select",
	"option",
	"textarea",
	"canvas"
]

const scaffold = (...elems: HTMLElement[]) => {
	document.body.appendChild(new Builder("div", {id: "app"}, elems).build());
}

let finishedElems: any = {
	scaffold
};

typeOfHTMLElements.forEach((i) => {
	finishedElems[i] = (config: any = undefined, ...elems: HTMLElement[]) => {
		let newElem;
		if (config === undefined) {
			newElem = new Builder(i, undefined, elems);
		} else if (config.localName === undefined) {
			newElem = new Builder(i, config, elems);
		} else {
			let newElemsArr = [config];
			elems.forEach((i) => {
				newElemsArr.push(i);
			});
			newElem = new Builder(i, undefined, newElemsArr);
		}
		return newElem.build();
	}
})


export default finishedElems;
