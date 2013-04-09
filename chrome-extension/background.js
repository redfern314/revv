function isSocialMediaSite(tabID, changeInfo, tab) {
    if (tab.url.indexOf("facebook.com") != -1) {
        chrome.pageAction.show(tabID);
    } else if (tab.url.indexOf("twitter.com") != -1) {
        chrome.pageAction.show(tabID);
    }
}

chrome.tabs.onUpdated.addListener(isSocialMediaSite);