var Builder = (function () {
    function Builder(type, config, elems) {
        this.config = undefined;
        this.elem = document.createElement(type);
        this.config = config;
        this.elems = elems;
    }
    Builder.prototype.build = function () {
        if (this.config !== undefined) {
            this.configure();
        }
        if (this.elems.length > 0) {
            this.appendElems();
        }
        return this.elem;
    };
    Builder.prototype.configure = function () {
        for (var attr in this.config) {
            if (attr === "innerText") {
                this.elem.innerText = this.config[attr];
            }
            else if (attr === "$on") {
                this.elem.addEventListener(this.config[attr].listenFor, this.config[attr].thenDo);
            }
            else {
                this.elem.setAttribute(attr, this.config[attr]);
            }
        }
    };
    Builder.prototype.appendElems = function () {
        var _this = this;
        this.elems.forEach(function (i) {
            _this.elem.appendChild(i);
        });
    };
    return Builder;
}());
var typeOfHTMLElements = [
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
];
var scaffold = function () {
    var elems = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        elems[_i] = arguments[_i];
    }
    document.body.appendChild(new Builder("div", { id: "app" }, elems).build());
};
var finishedElems = {
    scaffold: scaffold
};
typeOfHTMLElements.forEach(function (i) {
    finishedElems[i] = function (config) {
        if (config === void 0) { config = undefined; }
        var elems = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            elems[_i - 1] = arguments[_i];
        }
        var newElem;
        if (config === undefined) {
            newElem = new Builder(i, undefined, elems);
        }
        else if (config.localName === undefined) {
            newElem = new Builder(i, config, elems);
        }
        else {
            var newElemsArr_1 = [config];
            elems.forEach(function (i) {
                newElemsArr_1.push(i);
            });
            newElem = new Builder(i, undefined, newElemsArr_1);
        }
        return newElem.build();
    };
});

export default finishedElems;
