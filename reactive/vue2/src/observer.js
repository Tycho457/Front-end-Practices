function Observer(data) {
    this.data = data;
    this.walk(data);
}

Observer.prototype = {
    // 遍历对象的所有属性，为每个属性定义响应式属性
    walk: function(data) {
        let self = this;
        Object.keys(data).forEach(function(key) {
            self.defineReactive(data, key, data[key]);
        });
    },
    // 定义响应式属性
    defineReactive: function(data, key, val) {
        // 依赖实例，管理订阅者
        let dep = new Dep();
        let childObj = observe(val);
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: function getter () {
                // 如果存在当前订阅者，则将其添加到依赖中
                if (Dep.target) {
                    dep.addSub(Dep.target);
                }
                return val;
            },
            set: function setter (newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                // 通知所有订阅者数据发生变化了
                dep.notify();
            }
        });
    }
};

// 用于创建Observer实例
function observe(value, vm) {
    if (!value || typeof value !== 'object') {
        return;
    }
    return new Observer(value);
};

// 依赖构造函数
function Dep () {
    this.subs = [];
}
Dep.prototype = {
    // 添加订阅者
    addSub: function(sub) {
        this.subs.push(sub);
    },
    // 通知所有订阅者数据发生变化
    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};
// 设置一个全局变量，用于存储当前的订阅者
Dep.target = null;

exports.observe = observe;
exports.Dep = Dep;