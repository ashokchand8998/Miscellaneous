chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    chrome.runtime.sendMessage({
        tabId: msg.tabId,
        deg: msg.deg
    });
    sendResponse("done")
})