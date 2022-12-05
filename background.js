chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.module === "request") {
            fetch(request.url, {
                method: request.method,
                headers: request.headers,
                body: JSON.stringify(request.body)
            }).then(async res => {
                const body = await res.json()
                sendResponse({
                    headers: res.headers,
                    body,
                    status: res.status,
                    ok: res.ok,
                    statusText: res.statusText
                })
            })
        }
        return true;
    }
);