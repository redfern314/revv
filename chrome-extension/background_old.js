function isSocialMediaSite(tabID, changeInfo, tab) {
    $("body").html("testing jQuery");
    if ((tab.url.indexOf("facebook.com") != -1) || (tab.url.indexOf("twitter.com") != -1)) {
        chrome.pageAction.show(tabID);
        //console.log($('img',document))
        //alert("test: "+JSON.stringify($('#u_0_t')));
        //alert("test");
        
        console.log("!!!");
    } else {

    }
}

chrome.tabs.onUpdated.addListener(isSocialMediaSite);