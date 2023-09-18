class EventEmitter {
    constructor() {
        this.events = {};
    }

    // 订阅事件
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }

    // 发布事件
    emit(eventName, data) {
        const callbacks = this.events[eventName];
        if (callbacks) {
            for (const callback of callbacks) {
                callback(data);
            }
        }
    }

    // 取消订阅事件
    off(eventName, callback) {
        const callbacks = this.events[eventName];
        if (callbacks) {
            this.events[eventName] = callbacks.filter(cb => cb !== callback);
        }
    }

    // 一次性订阅事件
    once(eventName, callback) {
        const onceCallback = data => {
            callback(data);
            this.off(eventName, onceCallback);
        };
        this.on(eventName, onceCallback);
    }
}

// 示例用法：
const emitter = new EventEmitter();

const logHello = () => console.log("Hello!");
const logWorld = () => console.log("World!");

emitter.on("greet", logHello);
emitter.once("greet", logWorld);

emitter.emit("greet", null); // 输出 "Hello!" 和 "World!"
emitter.emit("greet", null); // 只输出 "Hello!"
