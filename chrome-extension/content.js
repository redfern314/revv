

var current_text = '';
var current_area = null;
var showReplacements = function(data) {
        console.log(data);
        /*chrome.runtime.sendMessage(data, function(response) {
          console.log(response);
        });*/
        words = []
        for (var i = 0; i < data.words.length; i++) {
            words.push(data.words[i].old)
        };
            
        $(current_area).highlightTextarea({
              words: words
        })
}
var getMessageFromBackground = function(request, sender, sendResponse) {
    console.log(request);
    if (request.message == "refresh") {
        sendResponse('Refresh request acknowledged')
        $.post('http://localhost:5000/synon',{text: current_text},showReplacements);
    }
}

chrome.runtime.onMessage.addListener(getMessageFromBackground);

$(
    function(){
        if (window.location.href.indexOf("facebook.com") != -1) {
            $("body").keyup(function(event) {
                text = $(event.target).context.value
                console.log(text);
                console.log($(event.target))
                current_text = text;
                $.post('http://localhost:5000/synon',{text: text},showReplacements)
            });
        } else if (window.location.pathname.indexOf("twitter.com") != -1) {
            $("body").keyup(function(event) {
                text = $(event.target).context.value
                console.log(text);
                current_text = text;
                $.post('http://localhost:5000/synon',{text: text},showReplacements)
            });
        }
    }
);
