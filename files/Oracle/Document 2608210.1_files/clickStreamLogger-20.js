String.prototype.startsWith = function(str){ return (this.match("^"+str)==str); }
var XMLHttpArray = [
        function() {return new XMLHttpRequest()},
        function() {return new ActiveXObject("Msxml2.XMLHTTP")},
        function() {return new ActiveXObject("Msxml2.XMLHTTP")},
        function() {return new ActiveXObject("Microsoft.XMLHTTP")}
];

function createXMLHTTPObject(){
        var xmlhttp = false;
        for(var i=0; XMLHttpArray.length>i; i++){
                try{
                        xmlhttp = XMLHttpArray[i]();
                }catch(e){
                        continue;
                }
                break;
        }
        return xmlhttp;
}
function logActionClickstream(docId, activityInfo){
//    alert('click stream logging for tool'); 
    var req = createXMLHTTPObject();
    var requestParameters = '';
    var postUrl = getUrl();
    requestParameters += 'operation=logClickStream&category=KM&type=TOOL&p1=';
    requestParameters += docId + '&p15=';
    requestParameters += activityInfo;
    
//    alert(postUrl);
//    alert(requestParameters);
    postUrl += requestParameters;
//    req.onreadystatechange= function(){
//            if(req.readyState != 4) return;
//            if(req.status != 200) return;
//            callback(req);
//    }
    req.open('GET',postUrl,true);
    //req.setRequestHeader('User-Agent', 'My XMLHTTP Agent');
    req.send(null);
//    alert('done!');
}
function LogAdvisorClickStream(postArray){
//    alert('click stream logging for advisor'); 
    var req = createXMLHTTPObject();
    var postUrl = getUrl();
    var advisorId = postArray['advisorId'];
    var widgetType = postArray['widgetType'];
    var widgetId = postArray['widgetId'];
    var destinationId = postArray['destinationId'];
    var url = postArray['url'];
    var requestParameters = '';
    
    requestParameters += 'operation=logClickStream&category=KM&type=KM_ADV_LINK';
    
    if(advisorId) requestParameters += '&p1=' + advisorId;
    if(widgetType) requestParameters += '&p2=' + widgetType;
    if(widgetId) requestParameters += '&p3=' + widgetId;
    if(url) requestParameters += '&p11=' + url;
    if(destinationId) requestParameters += '&id=' + destinationId;
    
//    alert(postUrl);
//    alert(requestParameters);
    postUrl += requestParameters;
//    req.onreadystatechange= function(){
//            if(req.readyState != 4) return;
//            if(req.status != 200) return;
//            callback(req);
//    }
    req.open("GET",postUrl,true);
    //req.setRequestHeader('User-Agent', 'My XMLHTTP Agent');
    req.send(null);
//    alert('done!!!');
}
function getUrl(){
    var portalPath = window.location.pathname;
    
    var baseUrl = window.location.protocol + '//' + window.location.host;
    if (portalPath.startsWith('/cloud'))
        baseUrl += '/cloud/main/kmservlet?';
    else    
        baseUrl += '/epmos/main/kmservlet?';
    
    return baseUrl;
}

function callBackFunction(req){
        var respHTML=req.responseText;
	//alert(respHTML);
}