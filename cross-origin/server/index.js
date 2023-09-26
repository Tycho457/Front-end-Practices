const express = require('express');
const app = express();

// 虚拟的数据，模拟从服务器获取的数据
const responseData = {
    name: 'John Doe',
    age: 30,
    profession: 'Web Developer'
};

// 定义JSONP路由
app.get('/api/data', (req, res) => {
    const callback = req.query.callback;
    if (!callback) {
        return res.status(400).json({ error: 'Callback parameter is required' });
    }

    // 将数据包装在回调函数中，并返回给客户端
    const jsonpData = `${callback}(${JSON.stringify(responseData)})`;
    res.send(jsonpData);
});

// 启动服务器
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
