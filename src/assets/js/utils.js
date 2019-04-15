export function addCssByLink(url) { 
    let doc=document; 
    let link=doc.createElement("link"); 
    link.setAttribute("rel", "stylesheet"); 
    link.setAttribute("type", "text/css"); 
    link.setAttribute("href", url); 
    console.log(link)
    var heads = doc.getElementsByTagName("head"); 
    if(heads.length) 
        heads[0].appendChild(link); 
    else 
        doc.documentElement.appendChild(link); 
} 


export function removeCss(href) {
    var links = document.getElementsByTagName("link");
    for (var i = 0; i < links.length; i++) {
        var _href = links[i].href;
        if (links[i] && links[i].href && links[i].href.indexOf(href) != -1) {
            links[i].parentNode.removeChild(links[i]);
        }
    }
}

export function getScrollHeight() {
    let scrollHeight = document.documentElement.scrollHeight ? document.documentElement.scrollHeight : document.body.scrollHeight;
    return scrollHeight;
}


export function getWindowHeight() {
    let windowHeight = 0;
    if(document.compatMode === 'CSS1Compat') {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}