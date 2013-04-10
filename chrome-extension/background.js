

function contextMenuClicked(){
    chrome.pageAction.show("Clicked");
    console.log("Clicked");
}


var opt = {
        title: 'Add to station',
        documentUrlPatterns: ['http://*.jamendo.com/*/album/*']
}
albumMenu = chrome.contextMenus.create(opt);
chrome.contextMenus.create({title: 'New station...', parentId: albumMenu, onclick: function(e) { addAlbumStation(e.pageUrl); } });

chrome.contextMenus.create({type: "separator", title: "Prolix", contexts: ["editable"], onclick: contextMenuClicked});
