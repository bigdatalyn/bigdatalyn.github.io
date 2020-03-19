function sendContentLinkEmail(event)
{
    event.cancel();
    var source = event.getSource();
    var contentType = source.getProperty("contentType");
    var contentTitle = source.getProperty("contentTitle");
    var id = source.getProperty("contentId");
    var userEmail = source.getProperty("email");
    var contentId = contentType + " " + id;
    var subj = "Oracle Support " + contentId + " (" + contentTitle + ")";
    var url = encodeURI(document.location);
    var jspx_pos = url.indexOf(".jspx");
    url = url.substring(0, jspx_pos + 5) + "?id=" + id;
    var body = subj + " can be found at: " + url;
    // Somehow body of email does not get set in Firefox when this function is referenced in an external JS file.
    // If this function is copied to the same file in which it's referenced, then it works fine.
    // No issues in IE.
    window.location = "mailto:" + userEmail + "?subject=" + subj + "&body=" + body;
}

function toggleFavImageOn(event) {
    event.cancel();
    var source = event.getSource();
    source.setSource("/ui/images/favorites_qualifier.png");
}

function toggleFavImageOff(event) {
    event.cancel();
    var source = event.getSource();
    source.setSource("/ui/images/favorites_qualifier_notsel.png");
}

function toggleFavImageDown(event) {
    event.cancel();
    var source = event.getSource();
    source.setSource("/ui/images/favorites_dwn.png");
}

function openDocumentStatistics(event)
{
    event.cancel();
    var source = event.getSource();
    var docId = source.getProperty("docId");
    var url = source.getProperty("url");
    if (url != null && docId != null)
        window.open(url + docId, 'DocumentStatistics', 'width=850,height=600,location=no,toolbar=no,menubar=no,scrollbars=yes,resizable=yes');
}

var lastKmLinkShown;
var shouldShowKMLinks = false;
openPopup = function (event) {
    if (shouldShowKMLinks) {
        var source = event.getSource();
        var popupId = source.getProperty('popupId');
        var initialId = popupId;
        var sourceId = "";
        var popupLinkClientId = source.findComponent("popupLink").getClientId();
        var cb1Client = source.findComponent("cb1");
        var cb1ClientId = null;
        if (cb1Client != null) {
            cb1ClientId = cb1Client.getClientId();  
        } else {
            cb1Client = source.findComponent("cl1");
            cb1ClientId = cb1Client.getClientId();  
        }
        
        if (popupId == 0) {
            popupId = popupLinkClientId;
            sourceId = cb1ClientId;
        }
        else {
            popupId = popupLinkClientId + "j_id_" + popupId;
            sourceId = cb1ClientId + "j_id_" + popupId;
        }

        var popup = AdfPage.PAGE.findComponentByAbsoluteId(popupId);
        var count = 1;
        while ((popup == null) && (count <= 4)) {        
            var popupNo = count * (initialId + 5);
            popupId = popupLinkClientId + "j_id_" + popupNo;
            sourceId = cb1ClientId + "j_id_" + popupNo;
            
            popup = AdfPage.PAGE.findComponentByAbsoluteId(popupId);
            if (popup != null) break;
            count = count + 1;
        }
        if (!popup.isPopupVisible()) {
            if (lastKmLinkShown != undefined) {
                var lastPopup = AdfPage.PAGE.findComponentByAbsoluteId(lastKmLinkShown);
                lastPopup.hide();
            }
            var hints = {
            };
            hints[AdfRichPopup.HINT_ALIGN_ID] = source._clientId;
            hints[AdfRichPopup.HINT_ALIGN] = AdfRichPopup.ALIGN_END_BEFORE;
            popup.show(hints);
            lastKmLinkShown = popupId;
        }
    }
}

togglePopupOpening = function (event) {    
    if (shouldShowKMLinks == false) {
        shouldShowKMLinks = true;        
    }
    openPopup(event);        
    event.cancel();
}

function printClicked(event) {
    var source = event.getSource();
    var idValue = source.getProperty('itemId');
    var typeValue = source.getProperty('itemType');
    AdfCustomEvent.queue(source, "printClicked",
     {
        itemId : idValue,
        itemType : typeValue
     }, true);
}
function openInNewWindow(event) {
  event.cancel();
  var source = event.getSource();
  var url = source.getProperty("url");
  window.open(url);
}
function printClicked1(event) {
    var source = event.getSource();
    var idValue = source.getProperty('itemId');
    var typeValue = source.getProperty('itemType');
    AdfCustomEvent.queue(source, "printClicked",
    {
        itemId : idValue,
        itemType : typeValue
     }, true);
}
    function sendContentLinkEmailBug(event) {
      event.cancel();
      var source = event.getSource();
      var id = source.getProperty("bugId");
      var type = source.getProperty("type");
      var bugTitle = source.getProperty("bugTitle");
      var currentContext = source.getProperty("appContext");
      var bugDisplayPath = source.getProperty("bugDisplayPath");
      var userEmail = source.getProperty("email");
      var url = encodeURI(document.location);
      var ctx_pos = url.indexOf(currentContext);     
      url = url.substring(0, ctx_pos);
      url = url + currentContext + bugDisplayPath;  
      var subj = "Oracle Support "+ type + " " + id + " (" + bugTitle + ")";
      var body = subj + " can be found at: " + url;
      window.location = "mailto:" + userEmail + "?subject=" + subj + "&body=" + body;
    }
    function sendContentLinkEmailDoc(event) {
      event.cancel();
      var source = event.getSource();
      var type = source.getProperty("type");
      var documentTitle = source.getProperty("documentTitle");
      var documentId = source.getProperty("documentId");
      var appContext = source.getProperty("appContext");
      var documentDisplayPath = source.getProperty("documentDisplayPath");
      var userEmail = source.getProperty("email");
      var url = encodeURI(document.location);      
      var ctx_pos = url.indexOf(appContext);       
      url = url.substring(0, ctx_pos);      
      url = url + appContext + documentDisplayPath; 
      var subj = "Oracle Support " + type + " " + documentId + " (" + documentTitle + ")";
      var body = subj + " can be found at: " + url;      
      window.location = "mailto:" + userEmail + "?subject=" + subj + "&body=" + body;      
    }
function animateFacet(event){     
    var facetId = event.getSource().getProperty("facetId");
    var refTargetId = facetId+':refPanel';
    //var refImgId = facetId+':refArwImg::icon';
    var refTargetObj = $('div[id$="'+refTargetId+'"]');
    if(refTargetObj.css("display") == "block"){
       // $('img[id$="'+refImgId+'"]').attr("src","/epmos/ui/images/menu_bar_right_arrow.png");
        refTargetObj.hide("fast");          
    }else if(refTargetObj.css("display") == "none"){
       // $('img[id$="'+refImgId+'"]').attr("src","/epmos/ui/images/menu_bar_down_arrow.png");
        refTargetObj.show("fast");  
    }
}
function collapseRefinePanel(event){
   var refId = ':refPanel';   
   $('div[id$="'+refId+'"]').hide(200,"swing");  
}
function expandRefinePanel(){
   var refId = ':refPanel';
   $('div[id$="'+refId+'"]').show(200,"swing");
}
function expandResultPanel(){
   var resultId = ':resPanel';
   $('div[id$="'+resultId+'"]').show(200,"swing"); 
}
function collapseResultPanel(){
   var resultId = ':resPanel';
   $('div[id$="'+resultId+'"]').hide(200,"swing"); 
}
function collapseAll(){
   var refId = ':refPanel';
   $('div[id$="'+refId+'"]').hide(200,"swing");
   var resultId = ':resPanel';
   $('div[id$="'+resultId+'"]').hide(200,"swing");
}
function externalLinkClicked(event) {
    var inputText = event.getSource();
    var value = inputText.getProperty('linkName');
    AdfCustomEvent.queue(inputText, "logClickExternalLink",
    {
        element : value
    }, true);
}
saveRecentSearchTerm = function (event) {
    var localRecentSearchString = event.getSource().getProperty('localRecentSearchString');
    $('input[id$="srchInputTxt"]').val(localRecentSearchString);
}
function onSearchEnter(inputEvent){    
    if (inputEvent.getKeyCode() == AdfKeyStroke.ENTER_KEY) {  
//      var inputTextField = inputEvent.getSource();      
//      var searchButton = inputTextField.findComponent('cmisrch'); 
//      AdfActionEvent.queue(searchButton, false);
      collapseAll();
      event.cancel();
   }
}
function expandAlrtProducts(event) {
event.cancel();
var e = event.getSource().getClientId();
e= e.replace('alrtprd4:0:artLinkMoreOn','artMorelink');
var link= document.getElementById(e);
link.style.display = "none";
e= e.replace('artMorelink','artMoreProducts');
var component = document.getElementById(e);
component.style.display = "inline";        
}
function collapseAlrtProduct(event) {
event.cancel();
var e = event.getSource().getClientId();
e= e.replace('artlinkLess','artMoreProducts');
var link= document.getElementById(e);
link.style.display = "none";
e= e.replace('artMoreProducts','artMorelink');
var component = document.getElementById(e);
component.style.display = "inline";
}
function expandReupdProducts(event) {
event.cancel();
var e = event.getSource().getClientId();
e= e.replace('alrtprd4:0:reupdLinkMoreOn','reupdmorelink');
var link= document.getElementById(e);
link.style.display = "none";
e= e.replace('reupdmorelink','reupdMoreProducts');
var component = document.getElementById(e);
component.style.display = "inline";        
}
function collapseReupdProduct(event) {
event.cancel();
var e = event.getSource().getClientId();
e= e.replace('reupdlinkLess','reupdMoreProducts');
var link= document.getElementById(e);
link.style.display = "none";
e= e.replace('reupdMoreProducts','reupdmorelink');
var component = document.getElementById(e);
component.style.display = "inline";
}
function loadDocumentScripts(isAdvisor, advisorFnName){                    
  $("span[id*='ot71'] script").each(function() {
      try{
          if(this.src == 'undefined' || this.src==''){                
              jQuery.globalEval(this.text);
           }else{
              externalJSLoad(this.src);
           }
       }catch(Exception){
           
       }
    });           
   
   if(isAdvisor){
      initialiseAdvisor(advisorFnName);
   }     
}
function externalJSLoad(extUrl){
  jQuery.ajax({
      type: 'GET',
      url: extUrl,                  
      dataType: 'script',
      cache: true,
      async: false
    });
}
function initialiseAdvisor(advisorFnName){           
   initFnName = window[advisorFnName];
   if(typeof initFnName === 'function'){              
      initFnName();
   }
}