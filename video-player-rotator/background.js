function rotateVideo(deg) {
    let video = document.querySelector("video");
    video.style.transform = `rotate(${deg}deg)`
    video.style.transformOrigin = 'center';
    if (deg === 90 || deg === -90) {
        let width = video.style.width;
        let height = video.style.height;
        if (width.includes('px') && height.includes('px')) {
            chrome.storage.sync.get(['height', 'width'], function (items) {
                if (!items.height && !items.width) {
                    chrome.storage.sync.set({ 'height': height, 'width': width });
                }
            });
            let minLen = Math.min(Number(width.split('px')[0]), Number(height.split('px')[0]));
            video.style.width = minLen + 'px';
            video.style.height = minLen + 'px'
            video.style.objectFit = 'contain'
        }
    } else {
        chrome.storage.sync.get(['height', 'width'], function (items) {
            if (items.height && items.width) {
                video.style.width = items.width;
                video.style.height = items.height;
                chrome.storage.sync.clear();
            }
        })
    }
}

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    const frames = (await chrome.webNavigation.getAllFrames({
        tabId: message.tabId
    })).filter((frame) => frame.url.includes("https://youtube.googleapis.com"));

    try {
        await chrome.scripting
            .executeScript({
                target: { tabId: message.tabId, frameIds: frames.map((frame) => frame.frameId) },
                func: rotateVideo,
                args: [message.deg],
            })
    } catch (err) {
        console.log("error occured:", err)
    }
});