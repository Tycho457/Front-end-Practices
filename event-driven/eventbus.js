class EventBus {
    constructor() {
      this.events = {}; // 存储事件及其对应的回调函数列表
    }
  
    // 订阅事件
    subscribe(eventName, callback) {
      this.events[eventName] = this.events[eventName] || []; // 如果事件不存在，创建一个空的回调函数列表
      this.events[eventName].push(callback); // 将回调函数添加到事件的回调函数列表中
    }
  
    // 发布事件
    publish(eventName, data) {
      if (this.events[eventName]) {
       this.events[eventName].forEach(callback => {
          callback(data); // 执行回调函数，并传递数据作为参数
        });
      }
    }
  
    // 取消订阅事件
    unsubscribe(eventName, callback) {
      if (this.events[eventName]) {
        this.events[eventName] = this.events[eventName].filter(cb => cb !== callback); // 过滤掉要取消的回调函数
      }
    }
  }
  
  // 使用
  
  // 创建全局事件总线对象
  const eventBus = new EventBus();
  
  const callback1 = data => {
    console.log('Callback 1:', data);
  };
  
  const callback2 = data => {
    console.log('Callback 2:', data);
  };
  
  // 订阅事件
  eventBus.subscribe('event1', callback1);
  eventBus.subscribe('event1', callback2);
  
  // 发布事件
  eventBus.publish('event1', 'Hello, world!');
  
  // 输出：
  // Callback 1: Hello, world!
  // Callback 2: Hello, world!
  
  // 取消订阅事件
  eventBus.unsubscribe('event1', callback1);
  
  // 发布事件
  eventBus.publish('event1', 'Goodbye!');
  
  // 输出：
  // Callback 2: Goodbye!
  
  