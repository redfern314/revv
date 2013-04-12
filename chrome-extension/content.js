
var current_text = '';
var current_area = null;
var facebook = (window.location.href.indexOf("facebook.com") != -1);
var twitter = (window.location.href.indexOf("twitter.com") != -1);
var timeout = null;
var showReplacements = function(data) {
        console.log(data);
        chrome.runtime.sendMessage({message:data}, function(response) {
          console.log(response);
        });
}

var getMessageFromBackground = function(request, sender, sendResponse) {
    console.log(request);
    if (request.message == "refresh") { // request = {message: "refresh"}
        sendResponse('Refresh request acknowledged')
        $.post('http://prolix.herokuapp.com/synon',{text: current_text},showReplacements);
    } else if (request.message == "replace") { // request = {message: "replace", oldword: "big", newword: "huge"}
        replaceWord(request.oldword,request.newword);
    }
}

var replaceWord = function(oldword,newword) {
    if (facebook) {
        text = $(current_area).context.value;
        newtext = text.replace(oldword,newword);
        $(current_area).context.value = newtext;
    } else if (twitter) {
        text = $(current_area).context.textContent;
        newtext = text.replace(oldword,newword);
        $(current_area).context.textContent = newtext;
    }
}

chrome.extension.onMessage.addListener(getMessageFromBackground);

$(
    function(){
        chrome.extension.sendMessage({
            'message':     {"words": [ {"old": "big", "new": [ {"word": "huge", "def": "extremely large"}, {"word": "vast", "def": "very large; wide in range"} ] } ] }, 
            'selection': true});
        if (facebook) {     
            $("body").keyup(function(event) {
                text = $(event.target).context.value
                console.log(text);
                current_text = text;
                current_area = event.target;
                if (timeout) {
                    clearTimeout(timeout);
                }
                timeout = setTimeout(function() {
                    $.post('http://prolix.herokuapp.com/synon',{text: text},showReplacements)
                }, 1000);
            });
        } else if (twitter) {
            $("body").keyup(function(event) {
                text = $(event.target).context.textContent
                console.log(text);
                current_text = text;
                current_area = event.target;
                if (timeout) {
                    clearTimeout(timeout);
                }
                timeout = setTimeout(function() {
                    $.post('http://prolix.herokuapp.com/synon',{text: text},showReplacements)
                }, 1000);
            });
        }
    }
);


