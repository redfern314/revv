
var tabid
function contextMenuClicked(){
     console.log("Clicked Test");
  
}

    // {"words": [ {"old": "big", "new": [ {"word": "huge", "def": "extremely large"}, {"word": "vast", "def": "very large; wide in range"} ] } ] }

function replaceword(info, tab, o){
    console.log("Lets replace some words!");
    console.log(info);
    var pair = info.menuItemId.split("_");
    chrome.tabs.sendMessage(tabid, {message: "replace", oldword: pair[0], newword: pair[1]}, function(response) {
    console.log(response);
  });
}
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    tabid = parseInt(sender.tab.id);
    chrome.contextMenus.removeAll()
    var oldword;
    var betterword;
    var definition;
    words = request.message.words;
    for (word in words){
        oldword = words[word].old
        chrome.contextMenus.create({type: "normal",
         title: oldword, id: oldword, contexts: ["editable"],
          onclick: contextMenuClicked}, function(){console.log("Added oldword")});
    
        for (newword in words[word].new){
            betterword = words[word].new[newword].word
            definition = words[word].new[newword].def
            
            chrome.contextMenus.create({type: "normal", 
                title: definition, id: definition, parentId: oldword, 
                contexts: ["editable"]});
            
            chrome.contextMenus.create({type: "separator", parentId: oldword, contexts: ["editable"]})


            var sendData = function(info, tab){replaceword(info, tab, betterword)}
            chrome.contextMenus.create({type: "normal", 
                title: betterword, parentId: definition, id: oldword + "_" + betterword ,
                contexts: ["editable"], onclick: sendData});
            chrome.contextMenus.create({type: "separator", parentId: definition, contexts: ["editable"]})
            
        }     
    }
    // request = {message: "replace", oldword: "big", newword: "huge"}

    chrome.contextMenus.create({type: "separator", contexts: ["editable"]})

    chrome.contextMenus.create({type: "normal", title: "Refresh", contexts: ["editable"], onclick: contextMenuClicked}, function(){})
    
});

