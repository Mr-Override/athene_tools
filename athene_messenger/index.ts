class AtheneMessenger {
	private dom;
	private win;
	private state: any = {
		serverSide: false,
		devMode: false,
		stack: {
			eventListeners: [],
			listeners: [],
		},
		version: '0.2.4',
	};

	constructor() {
		if (
			document === undefined ||
			document === null ||
			window === undefined ||
			window === null
		) {
			this.state.serverSide = true;
		} else {
			this.dom = document;
			this.win = window;
		}

		if (this.state.serverSide) {
			console.log('Athene-Messenger is now running in Server Mode');
			console.log(
				'Current Athene-Messenger version: {' + this.state.version + '}'
			);
		} else {
			this.dom.documentElement.setAttribute('athene-messenger', 'online');
			this.dom.documentElement.setAttribute(
				'athene-messenger-version',
				this.state.version
			);
		}
	}

	send(message: string, data: any = undefined) {
		this.execute(message, data);
	}

	receive(cb: Function, message: string) {
		this.state.stack.listeners.push({
			id:
				this.state.stack.listeners.length.toString() +
				'-' +
				message +
				'-' +
				Math.random().toString(),
			cb,
			message,
		});
	}

	private execute(message: string, data: any) {
		const listeners = this.state.stack.listeners;
		listeners.forEach((i) => {
			if (i.message === message) {
				i.cb(data);
			}
		});
	}

	eventListen(to: string | HTMLElement | any, type: string, message: string) {
		this.state.stack.eventListeners.push({
			id:
				this.state.stack.eventListeners.length.toString() +
				'-' +
				message +
				'-' +
				Math.random().toString(),
		});
	}
}

export default new AtheneMessenger();
