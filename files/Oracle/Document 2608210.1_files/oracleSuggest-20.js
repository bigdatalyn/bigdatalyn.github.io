var t;
var currIndex =  - 1;
var currSuggestion = "";
var ctr = 0;
var suggestion = "";
var score = "";
var searchSuggestions = "";
var suggestionCount = "";
var ulTagStart = "<ul>";
var ulTagEnd = "</ul>";
var textBoxContent = "";
var osUrl = "";
var osUrlTemplate = "";
var queryString = "queryString";
//var xmlHttp;
var lastRequestTime = 0;
var suggestionInterval = 200;
var timer;
var timer_is_on = 0;
var lastBufferType = "";
var bufferType = "";
var browseCall = "";
var textBoxID = "pt_itG";
var plainSuggestionList;
var inputTextFieldSource;
/*
 * Following variables are needed for click stream logging of KM_SUGGEST
 */
var suggestedTextSelected;  // selected suggestion
var selectedTextIndex;      // index of suggestion selected
var finalSearchTerm;        // search term actually used
var type='KEYBOARD';        // default type is keyboard. Is changed to 'CLICK' in fillText(...) method
var totalnumberOfSuggestions;// number of suggestions got from timesten. If the count is 0, then the last non zero value will be stored here.
var userTypedText;          // this will hold the term user has typed BEFORE selecting the suggestion

$(document).ready(function () {    
    $(document.body).prepend('<div id="searchBar__searchSuggestions" class="searchBar__searchSuggestionsStyle">');
    positionSuggestions();
    $('input[id*="pt_itG"]').attr("autocomplete", "off");
    setAutoComplete();
    setProductAutoComplete();
    $(window).resize(function () {
        positionSuggestions();
    });
    $('input[id*="pt_itG"]').mouseleave(function (e) {
        t = setTimeout("$('div[id*=\"searchBar__searchSuggestions\"]').fadeOut('slow');", 1000);
    });
    $('input[id*="bk_srchTxt"]').mouseleave(function (e) {
        t = setTimeout("$('div[id*=\"searchBar__searchSuggestions\"]').fadeOut('slow');", 1000);
    });
    $('div[id*="searchBar__searchSuggestions"]').mouseleave(function (e) {
        t = setTimeout("$('div[id*=\"searchBar__searchSuggestions\"]').fadeOut('slow');", 1000);
    });
    $('input[id*="pt_itG"]').mouseenter(function (e) {
        clearTimeout(t);
    });
    $('input[id*="bk_srchTxt"]').mouseenter(function (e) {
        clearTimeout(t);
    });
    $('div[id*="searchBar__searchSuggestions"]').mouseenter(function (e) {
        clearTimeout(t);
    });
});
$(document.body).click(function() {      
    $('div[id*="searchBar__searchSuggestions"]').hide();   
});

function checkKey(keycode) {
    switch (keycode) {
        case 38:
            //up arrow 
            if (ctr == 0)
                break;
            handleUpArrow();
            break;
        case 40:
            //down arrow 
            if (ctr == 0)
                break;
            handleDownArrow();
            break;
        case 13:
            //enter
            if (timer_is_on == 1) {
                timer_is_on = 0;
                clearTimeout(t);
            }
            hideSuggestions();
            break;
    }
}

function hideSuggestions() {
    currIndex =  - 1;
    ctr = 0;
    $('div[id*="searchBar__searchSuggestions"]').hide();
}

function positionSuggestions() {
 
    var pos = {top: 0 , left: 0}; 
    var elem = $('input[id*="'+textBoxID+'"]');
    if(elem != undefined ){
     pos = elem.offset();
    }
    var height = $('input[id*="'+textBoxID+'"]').outerHeight();

    var borderWidth = $('input[id*="'+textBoxID+'"]').outerWidth();
    var paddingWidth = $('input[id*="'+textBoxID+'"]').innerWidth();
    var contentWidth = $('input[id*="'+textBoxID+'"]').width();
    var padding = paddingWidth - contentWidth;
    var borders = borderWidth - paddingWidth;    
    $('div[id*="searchBar__searchSuggestions"]').css( {
        "left" : ((pos.left-4)  - ((borders) / 2)) + "px", "top" : (pos.top + height) + "px", "width" : (contentWidth + 29) + "px"
    });
}

function handleDownArrow() {

    totalnumberOfSuggestions=suggestionCount;
    userTypedText = textBoxContent;
    if (currIndex == (ctr - 1)) {
        //we are on the last suggestion
        $('div[id*="searchBar__searchSuggestions"] li').eq(currIndex).removeClass("searchBar__searchSuggestionsArrowOver");
        currIndex =  - 1;
        currSuggestion = textBoxContent;
//        suggestedTextSelected = '';
    }
    else if (currIndex ==  - 1) {
        $('div[id*="searchBar__searchSuggestions"] li').eq(++currIndex).addClass("searchBar__searchSuggestionsArrowOver");
        currSuggestion = plainSuggestionList[currIndex];
//        suggestedTextSelected=currSuggestion;
    }
    else {
        $('div[id*="searchBar__searchSuggestions"] li').eq(currIndex).removeClass("searchBar__searchSuggestionsArrowOver");
        currSuggestion = plainSuggestionList[++currIndex];
        $('div[id*="searchBar__searchSuggestions"] li').eq(currIndex).addClass("searchBar__searchSuggestionsArrowOver");
//        suggestedTextSelected=currSuggestion;
    }
    
    $('input[id*="'+textBoxID+'"]').val(currSuggestion);
    suggestedTextSelected=currSuggestion;
    selectedTextIndex=currIndex+1;
    type='KEYBOARD';
}

function handleUpArrow() {

    totalnumberOfSuggestions=suggestionCount;
    userTypedText = textBoxContent;
    if (currIndex > 0) {
        $('div[id*="searchBar__searchSuggestions"] li').eq(currIndex).removeClass("searchBar__searchSuggestionsArrowOver");
        currSuggestion = plainSuggestionList[--currIndex];
        $('div[id*="searchBar__searchSuggestions"] li').eq(currIndex).addClass("searchBar__searchSuggestionsArrowOver");
//        suggestedTextSelected=currSuggestion;
    }
    else if (currIndex == 0) {
        $('div[id*="searchBar__searchSuggestions"] li').eq(currIndex--).removeClass("searchBar__searchSuggestionsArrowOver");
        currSuggestion = textBoxContent;
//        suggestedTextSelected = '';
    }
    else {
        //highlight the last suggestion in the box
        currIndex = ctr - 1;
        currSuggestion = plainSuggestionList[currIndex];
        $('div[id*="searchBar__searchSuggestions"] li').eq(currIndex).addClass("searchBar__searchSuggestionsArrowOver");
//        suggestedTextSelected=currSuggestion;
    }

    $('input[id*="'+textBoxID+'"]').val(currSuggestion);
    suggestedTextSelected=currSuggestion;
    selectedTextIndex=currIndex+1;
    type='KEYBOARD';
}

function fill(textValue,index) {
    userTypedText = textBoxContent;
    $('input[id*="'+textBoxID+'"]').val(textValue);
    hideSuggestions();
    suggestedTextSelected=textValue;
    selectedTextIndex=index;
    totalnumberOfSuggestions=suggestionCount;
//    alert(index+'::'+textValue);
    type='CLICK';
    /*
     * Bug 14794959 - PICKING A SUGGESTION FROM SEARCH SUGGESTIONS DOESN'T LAUNCH SEARCH
     * inputTextFieldSource represents the search text field. Using it, do a relative search for 
     * the search command button and then submit it.
     */
    
    var requestParameters = fillClickStreamParameters();
    $('input[id*="clickStreamParameters"]').val(requestParameters);
    $('input[id*="clickStreamParametersLocal"]').val(requestParameters);
    
    var button = inputTextFieldSource.findComponent('::menu_pt_cil2');
    var partialSubmit = false;
    if(button != undefined && button != null){
        AdfActionEvent.queue(button, partialSubmit); 
    } else {
        button = inputTextFieldSource.findComponent('::sr_cil');
        if(button != undefined && button != null){
            AdfActionEvent.queue(button, partialSubmit);
        }
    }
}

function countSuggestions() {
    return $('div[id*="searchBar__searchSuggestions"] li').length;
}

function parse(xmlData) {
    var data = xmlData;
    var boldSuggestion;
    plainSuggestionList=new Array();
    searchSuggestions = "";
    ctr = 0;
    var searchTermForBold;
    if(data.options.correctedUserQuery != undefined && data.options.correctedUserQuery != null){
        searchTermForBold = data.options.correctedUserQuery;
    }else{
        searchTermForBold = inputString;
    }
    if(data.options.count == 0){
        if(suggestionCount != 0){
            totalnumberOfSuggestions=suggestionCount; // save the previous suggestionCount for clickstream logging
        }
    }
    suggestionCount = data.options.count;// Number of Suggestions as returned by TimesTen 
    for (var i = 0;i < suggestionCount;i++) {
        ctr++;
        suggestion = data.options.option[i].literal;
        boldSuggestion = searchTermForBold+'<b>'+suggestion.substring(searchTermForBold.length)+'</b>';
        searchSuggestions = searchSuggestions + "<li onClick=\"fill('" + suggestion + "','" + ctr + "')\">" + boldSuggestion + "</li>";

        plainSuggestionList[i] = suggestion;
        
    }
    if (ctr > 0) {
        $('div[id*="searchBar__searchSuggestions"]').html(ulTagStart + searchSuggestions + ulTagEnd).show();
        currIndex = -1;
        positionSuggestions();
    }
    else {
        hideSuggestions();
    }
}

function lookupSuggestions() {    
    inputString = $('input[id*="'+textBoxID+'"]').val();
    textBoxContent = inputString;    
    if (osUrlTemplate.length > 0) {
        var shortName = $('input[id*="selSrcShNaG"]').val();
        if(browseCall == "1"){
            shortName = "";
        }
        if ((shortName == "") || (shortName == "KB") || (shortName == "OKB") || (shortName == "KBARCH") || (shortName == "All Knowledge")) {
            osUrl = osUrlTemplate.replace("queryString", inputString);

            lastRequestTime = new Date().getTime();
            
            jQuery.getJSON(osUrl + "&callback=?", function (data) {
                parse(data);
            });

            if (timer_is_on == 0) {
                timer_is_on = 1;
                lastBufferType = inputString;
                timer = setTimeout("onTimer()", suggestionInterval);
                //console.log("timer started");
            }
        } else {
            hideSuggestions();
        }
    }
    else {
        //If the length is 0 then Oracle Suggests is disabled   
        hideSuggestions();
    }
}

function onTimer() {    
    if (lastBufferType != bufferType) {
        //console.log("requesting (on timer): " + $('input[id*="pt_itG"]').val() + " at " + new Date().getTime());
        lookupSuggestions();
    }
    if (timer_is_on == 1) {
        clearTimeout(timer);
        timer_is_on = 0;
        //console.log("timer stopped");
    }    
}

// lookupSuggestions	
function createXMLHttpRequest() {
    var xmlHttp = false;
    if (window.ActiveXObject) {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }else if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    }
    return xmlHttp;
}

function callbackSuggestions() {
    if (xmlHttp.readyState == 4) {
        if (xmlHttp.status == 200) {
            parse(xmlHttp.responseXML);
        }
    }
}

function searchNameHandleKeyPress(event) {
    if (event.getKeyCode() == AdfKeyStroke.ENTER_KEY) {
        var source = event.getSource();
        AdfCustomEvent.queue(source, "enterPressedOnSearch", 
        {
        },
false);
    }
}

function setOracleSuggestsOrigin(event) {
    //This is called when the onfocus event occurs on the search input text field  
    browseCall = event.getSource().getProperty("browseOrigin");    
    if(browseCall == "1"){
        textBoxID = "bk_srchTxt";
    }else{
        textBoxID = "pt_itG";
    }
}
/*
 * This method is called via ExtendedRenderKit to set the context path for oracle suggests.
 */
function setOSContextPath(osURL){
	osUrlTemplate = osURL;
}
/* For making first call to Timesten on pageLoad*/
function initialiseSuggest(osUrlInit){
    if(osUrlInit!=""){
        var osBaseUrl = osUrlInit.replace("queryString", "server");        
        jQuery.getJSON(osBaseUrl + "&callback=?");
    }
}
function showSuggestions(event) {    
    switch (event.getKeyCode()) {
        //with jquery e.which works on both FF and IE
        case 38:
        //up arrow
            checkKey(38);
            event.stopImmediatePropagation();
            break;
        case 40:
        //down arrow
            checkKey(40);
            event.stopImmediatePropagation();
            break;
        case 13:
        //enter key
            checkKey(13);
//            alert('totalnumberOfSuggestions = ' + totalnumberOfSuggestions + ' suggestionCount = '+suggestionCount);
            event.stopImmediatePropagation();
            event.preventDefault();
            break;
        case 37:
        //left arrow
            event.stopImmediatePropagation();
            break;
        case 39:
        //right arrow
            event.stopImmediatePropagation();
            break;
        default :
            if (textBoxID == "") {
                setOracleSuggestsOrigin(event);
            }
            searchTerm = $('input[id*="'+textBoxID+'"]').val();  
            if (searchTerm != bufferType) {
                var currentTime = new Date().getTime();
                if (currentTime - lastRequestTime >= suggestionInterval) {
                    if (searchTerm.length >= 2) {  
                        // setup inputTextFieldSource which will be used in the "fill" method
                        inputTextFieldSource = event.getSource();
                        lookupSuggestions();
                    }
                }
                
                if (searchTerm.length < 2) {
                    hideSuggestions();
                }
                bufferType = searchTerm;
            }
    }
}

function clearSuggestions(event) {
    //alert('clearing suggestion');
    $('div[id*="searchBar__searchSuggestions"]').fadeOut("slow");
}

function logOracleSuggestClickStream(event){
    var xmlHttp;
    var shortName = $('input[id*="selSrcShNaG"]').val();
    
    if ( (event.getKeyCode() == AdfKeyStroke.ENTER_KEY || event.isLeftButtonPressed() ) && ((shortName == "") || (shortName == "KB") || (shortName == "OKB") || (shortName == "KBARCH") || (shortName == "All Knowledge")) ){
        xmlHttp = createXMLHttpRequest();
        var requestParameters = '';
        var url = getUrl();
        var proceed = true;
        /*
         * 2 cases to be handled:
         * 1. when we have some suggestion, totalnumberOfSuggestions is undefined. So use suggestionCount.
         * 2. when there is no suggestion, suggestionCount will be zero. We need the last last term typed by user that did provide some suggestion.
         * UPDATE: These scenarios will not be handled now. If business asks for it, then we will uncomment below code.
         */
//        if(totalnumberOfSuggestions==undefined){
//            if(suggestionCount==undefined || suggestionCount == 0){
//                suggestionCount=0;
//            }
//            totalnumberOfSuggestions=suggestionCount;
//        }
//        if(selectedTextIndex==undefined){
//            selectedTextIndex=0;
//        }
        if(suggestedTextSelected==undefined){
            suggestedTextSelected='';
            proceed = false;
        }

        if(suggestionCount==undefined || suggestionCount == 0){
            proceed = false;
        }
        
        if(proceed === true){
            requestParameters = fillClickStreamParameters();
            if(type === 'KEYBOARD'){
                $('input[id*="clickStreamParameters"]').val('');
                url += requestParameters;
                xmlHttp.open('GET',url,true);
                xmlHttp.send(null);
            }else{
                $('input[id*="clickStreamParameters"]').val(requestParameters);
            }
        }else{
            $('input[id*="clickStreamParameters"]').val('');
        }
    }
}

function fillClickStreamParameters() {
    var clickStreamRequestParameters = '';
    clickStreamRequestParameters += 'operation=logClickStream&category=KM&type=KM_SUGGESTS&id=';
    clickStreamRequestParameters += type + '&p1=';
    clickStreamRequestParameters += type + '&p2=';
    clickStreamRequestParameters += selectedTextIndex + '&p3=';
    clickStreamRequestParameters += totalnumberOfSuggestions + '&p11=';
    clickStreamRequestParameters += userTypedText + '&p15=';
    clickStreamRequestParameters += suggestedTextSelected + '&searchSource=';
    if(textBoxID == "bk_srchTxt"){
        clickStreamRequestParameters += 'LocalSearch';
    }else if(textBoxID == "pt_itG"){
        clickStreamRequestParameters += 'GlobalSearch';
    }
    
    return clickStreamRequestParameters;
}

function getUrl(){
    var baseUrl = window.location.protocol + '//' + window.location.host;
    baseUrl += '/epmos/main/kmservlet?';
    
    return baseUrl;
}
function setAutoComplete(){
    $('input[id*="bk_srchTxt"]').attr("autocomplete", "off");
}
function setProductAutoComplete(){
    $('input[id*="productSelector:ssl_inputComboboxListOfValues::content"]').attr("autocomplete", "off");
}

