// 事件调用栈
const callStack = [];
// 注入crossRequest方法可以正常使用YApi的跨域请求
window.crossRequest = function (data) {
    const event = new CustomEvent('yapi-tester-send-message', {
        'detail': {
            module: 'request',
            url: data.url,
            method: data.method,
            headers: data.headers,
            data: data.data,
            timeout: data.timeout
        }
    });
    callStack.push({
        id: event.timeStamp,
        callback: {
            success: data.success,
            error: data.error
        }
    })
    window.dispatchEvent(event)
}
// 监听消息
window.addEventListener('yapi-tester-send-message-result', e => {
    const {
        id,
        type,
        data
    } = e.detail;
    const callItem = callStack.find(item => item.id === id);
    if (callItem) {
        callItem.callback[type](data.body, data.headers, {res: data});
    }

})
console.log('injected!')