var showReplacements = function(data) {
        console.log(data);
}
$(
    function(){
        if (window.location.href.indexOf("facebook.com") != -1) {
            $("body").keyup(function(event) {
                text = $(event.target).context.value
                console.log(text);
                $.post('http://localhost:5000/synon',{text: text},showReplacements)
            });
        } else if (window.location.pathname.indexOf("twitter.com") != -1) {
            $("body").keyup(function(event) {
                console.log($(event.target.context.value));
            });
        }
    }
);
