let {Dep} = require('./observer')
function Watcher(vm, exp, cb) {
    this.vm = vm;
    this.exp = exp;
    this.cb = cb;
    this.value = this.get();  // 将自己添加到订阅器的操作
}

Watcher.prototype = {
    update: function() {
        this.run();
    },
    // 检测表达式的值是否发生变化，如果发生变化，则执行回调函数 cb，同时将新值和旧值传递给回调函数。
    run: function() {
        let value = this.vm.data[this.exp];
        let oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal);
        }
    },
    // 用于获取表达式的当前值，它在内部会执行一系列操作来实现数据的依赖收集。
    get: function() {
        Dep.target = this;  // 标记当前正在进行的依赖收集操作
        let value = this.vm.data[this.exp]  // 强制执行监听器里的get函数
        Dep.target = null;  // 释放自己
        return value;
    }
};
module.exports = Watcher;