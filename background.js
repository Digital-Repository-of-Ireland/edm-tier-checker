document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('submit');
    btn.addEventListener('click', function() {
        var url;
        var string;
        var tier = document.getElementById('tier').value;
        if (tier[0] == "M") {
            qstring = "&qf=metadataTier:"+tier[tier.length - 1];
        } else {
            qstring = "&qf=contentTier:"+tier[tier.length - 1]
        }
        chrome.tabs.query({ active: true, currentWindow: true}, function(tabs) {
            let url = tabs[0].url
            if (url.includes("europeana.eu") || url.includes("metis-sandbox")) {
                url = url.replace(/&qf=(metadata|content)Tier%3A./, "");
                let newUrl = url+qstring
                chrome.tabs.update(undefined, { url: newUrl });
            }
        });
    });
});

