var AtheneMessenger = (function () {
    function AtheneMessenger() {
        this.state = {
            serverSide: false,
            devMode: false,
            stack: {
                eventListeners: [],
                listeners: []
            },
            version: "0.2.4"
        };
        if (document === undefined || document === null || window === undefined || window === null) {
            this.state.serverSide = true;
        }
        else {
            this.dom = document;
            this.win = window;
        }
        if (this.state.serverSide) {
            console.log("Athene-Messenger is now running in Server Mode");
            console.log("Current Athene-Messenger version: {" + this.state.version + "}");
        }
        else {
            this.dom.documentElement.setAttribute("athene-messenger", "online");
            this.dom.documentElement.setAttribute("athene-messenger-version", this.state.version);
        }
    }
    AtheneMessenger.prototype.send = function (message, data) {
        if (data === void 0) { data = undefined; }
        this.execute(message, data);
    };
    AtheneMessenger.prototype.receive = function (cb, message) {
        this.state.stack.listeners.push({
            id: this.state.stack.listeners.length.toString() + "-" + message + "-" + Math.random().toString(),
            cb: cb,
            message: message
        });
    };
    AtheneMessenger.prototype.execute = function (message, data) {
        var listeners = this.state.stack.listeners;
        listeners.forEach(function (i) {
            if (i.message === message) {
                i.cb(data);
            }
        });
    };
    AtheneMessenger.prototype.eventListen = function (to, type, message) {
        this.state.stack.eventListeners.push({
            id: this.state.stack.eventListeners.length.toString() + "-" + message + "-" + Math.random().toString()
        });
    };
    return AtheneMessenger;
}());
var index = new AtheneMessenger();

export default index;
