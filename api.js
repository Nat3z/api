var webhook = $s().getUrlValues("webhook");
var content = $s().getUrlValues("content");

if (webhook != null && content != null) {
    const msg = {
        "content": content
    }

    fetch(webhook,
        {
            "method": "POST", 
            "headers": {
                "content-type": "application/json"
            },
            "body": JSON.stringify(msg)
        }
    )
    $s("body").add("<p>2</p>");
} else {
    $s("body").add("<p>-1</p>");
}