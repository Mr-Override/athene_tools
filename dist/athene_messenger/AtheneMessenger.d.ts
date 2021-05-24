declare class AtheneMessenger {
    private dom;
    private win;
    private state;
    constructor();
    send(message: string, data?: any): void;
    receive(cb: Function, message: string): void;
    private execute;
    eventListen(to: string | HTMLElement | any, type: string, message: string): void;
}
declare const _default: AtheneMessenger;
export { _default as default };
