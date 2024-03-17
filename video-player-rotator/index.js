"use strict"
const updateOrientation = (deg) => {
    console.log("button click", deg)
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {deg: deg, tabId: tabs[0].id}, (response) => {
            console.log("updated roation:", deg, 'degree')
        })
    })
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("90").addEventListener('click', () => updateOrientation(90));
    document.getElementById("-90").addEventListener('click', () => updateOrientation(-90));
    document.getElementById("180").addEventListener('click', () => updateOrientation(180));
    document.getElementById("0").addEventListener('click', () => updateOrientation(0));
})