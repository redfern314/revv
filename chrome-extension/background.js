$(
    var showReplacements = function() {
        
    }
    function(){
        if (window.location.href.indexOf("facebook.com") != -1) {
            $("body").keyup(function(event) {
                console.log($(event.target).context.value);
                //$.post('http://localhost:5000/test','hello',showReplacements)
            });
        } else if (window.location.pathname.indexOf("twitter.com") != -1) {
            $("body").keyup(function(event) {
                console.log($(event.target.context.value));
            });
        }
    }
);