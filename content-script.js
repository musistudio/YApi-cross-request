const script = document.createElement("script");
script.src = chrome.runtime.getURL('inject.js')
document.head.appendChild(script);
window.addEventListener('yapi-tester-send-message', async e => {
    const res = await chrome.runtime.sendMessage(e.detail);
    const event = new CustomEvent('yapi-tester-send-message-result', {
        'detail': {
            id: e.timeStamp,
            type: res.ok ? 'success' : 'error',
            data: res
        }
    });
    window.dispatchEvent(event)
});