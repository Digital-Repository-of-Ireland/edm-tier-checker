document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('submit');
    btn.addEventListener('click', function() {
        var qstring = "";
        var mtier = document.getElementById('metadata').value;
        if (mtier != "-") {
            qstring += "&qf=metadataTier:"+mtier[mtier.length - 1];
        }            
        var ctier = document.getElementById('content').value
        if (ctier != "-") {
            qstring += "&qf=contentTier:"+ctier[ctier.length - 1];
        }

        chrome.tabs.query({ active: true, currentWindow: true}, function(tabs) {
            let url = tabs[0].url
            if (url.includes("europeana.eu") || url.includes("metis")) {
                url = url.replace(/&qf=metadataTier%3A./, "");
                url = url.replace(/&qf=contentTier%3A./, "");
                let newUrl = url+qstring
                chrome.tabs.update(undefined, { url: newUrl });
            }
        });
    });
});

