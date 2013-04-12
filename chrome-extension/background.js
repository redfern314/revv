

function contextMenuClicked(){
    console.log("Clicked Test");

    chrome.contextMenus.create({type: "normal", title: "Word1", id: "word1", contexts: ["editable"], onclick: contextMenuClicked}, function(){console.log("started 1")});
    chrome.contextMenus.create({type: "normal", title: "Word2", id: "word2", contexts: ["editable"], onclick: contextMenuClicked}, function(){console.log("started 2")});
    chrome.contextMenus.create({type: "normal", title: "Word3", id: "word3", contexts: ["editable"], onclick: contextMenuClicked}, function(){console.log("started 3")});
    chrome.contextMenus.create({type: "separator", contexts: ["editable"], onclick: contextMenuClicked}, function(){console.log("started 3")});



    chrome.contextMenus.create({type: "normal", title: "Definition1", parentId: "word1", contexts: ["editable"], onclick: contextMenuClicked}, function(){console.log("started 1")});
    chrome.contextMenus.create({type: "normal", title: "Definition2", parentId: "word2", contexts: ["editable"], onclick: contextMenuClicked}, function(){console.log("started 2")});
    chrome.contextMenus.create({type: "normal", title: "Definition3", parentId: "word3", contexts: ["editable"], onclick: contextMenuClicked}, function(){console.log("started 3")});
}


// var opt = {
//         title: 'Add to station',
//         documentUrlPatterns: ['http://*.jamendo.com/*/album/*']
// }
// albumMenu = chrome.contextMenus.create(opt);
// chrome.contextMenus.create({title: 'New station...', parentId: albumMenu, onclick: function(e) { addAlbumStation(e.pageUrl); } });
chrome.contextMenus.create({type: "normal", title: "Refresh", contexts: ["editable"], onclick: contextMenuClicked}, function(){console.log("we can even refresh")});

    chrome.contextMenus.create({type: "normal", title: "Word1", id: "word1", contexts: ["editable"], onclick: contextMenuClicked}, function(){console.log("started 1