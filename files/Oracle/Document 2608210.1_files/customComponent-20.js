function disableTypingInLov(event) {
    var inputText = event.getSource();
    var disableAutoSuggest = inputText.getProperty("disableAutoSuggest");
    //alert("disableAutoSuggest: " + disableAutoSuggest);
    if (disableAutoSuggest == true || disableAutoSuggest == 'true') {
        //alert("client id: " + inputText.getClientId());
        var inputDom = document.getElementById(inputText.getClientId() + '::content');
        if (inputDom) {
            inputDom.readOnly = true;
        }
    }
}

function detectLovEnterKey(event) {
    var inputText = event.getSource();
    var value = inputText.getSubmittedValue();
    if (event.getKeyCode() == AdfKeyStroke.ENTER_KEY || event.getKeyCode() == 188) { //support enter and comma as separator
        /*notify server*/
        AdfCustomEvent.queue(inputText, "notifyServer", { element : value }, true);
    }
    //typedInField(event);
}

function lovPopupOpened(event) {
    var inputText = event.getSource();//notify server
    AdfCustomEvent.queue(inputText, "notifyServer", null, true);
    
}

function showContextBar(event, popupId, titleId, oneRowTitle, multipleRowsTitle) {
  var theTable = event.getSource();
  var selectedRows = theTable.getSelectedRowKeys();
  var selectedRowsNo = 0;
  for(row in selectedRows)
    selectedRowsNo++;
  if(selectedRowsNo == 0)
    hideContextBar(event, popupId);
  else {
    var titleElem = jQuery(document.getElementById(titleId));
    var titleText = selectedRowsNo == 1 ? oneRowTitle : multipleRowsTitle;
    titleElem.html(titleText.replace("{0}", selectedRowsNo));
    
    var thePopup = jQuery(document.getElementById(popupId));
    var tableElem = jQuery(document.getElementById(theTable.getClientId()));
    var tableParent = tableElem.parent();
    thePopup.appendTo(tableParent);
    thePopup.css("visibility", "hidden");
    thePopup.css("display", "block");
    var focusedRows = tableElem.find('tr.p_AFFocused');
    var focusedRow = null;
    if (focusedRows.length > 0)
      focusedRow = jQuery(focusedRows[0]);
    else { 
      var focusedCells = tableElem.find('td.p_AFFocused');
      if (focusedCells.length > 0)
        focusedRow = jQuery(focusedCells[0]).parent();
    }
    if (focusedRow != null) {
      var viewportWidth = Math.min(tableParent.outerWidth(), focusedRow.outerWidth());
      var viewportLeft = tableParent.position().left;
      var popupLeft = viewportLeft + (viewportWidth - thePopup.outerWidth())/2;
      thePopup.css("left", popupLeft < 0 ? 20 : popupLeft);
      var top = focusedRow.offset().top - tableParent.offset().top + focusedRow.outerHeight();
      if(top + thePopup.outerHeight() > tableParent.height())
        top = tableParent.height() - thePopup.outerHeight();
      else if(top < 0)
        top = 0;
      thePopup.css("top", top);
    }
    thePopup.css("visibility", "visible");
  }
}

function hideContextBar(event, popupId) {
  var thePopup = jQuery(jQuery(document.getElementById(popupId))[0]);
  thePopup.css("display", "none");
}

function hideContextBars(event) {
  jQuery(".contextBar").css("display", "none");
}

function setListeners(tableId, showMethodName, hideMethodName) {
  AdfPage.PAGE.findComponent(tableId).addEventListener('click', showMethodName);
  AdfPage.PAGE.findComponent(tableId).addEventListener('selection', showMethodName);
  AdfPage.PAGE.findComponent(tableId).addEventListener('sort', hideMethodName);
}

function removeListeners(tableId, showMethodName, hideMethodName) {
  try { AdfPage.PAGE.findComponent(tableId).removeEventListener('click', showMethodName); } catch(e) {;}
  try { AdfPage.PAGE.findComponent(tableId).removeEventListener('selection', showMethodName); } catch(e) {;}
  try { AdfPage.PAGE.findComponent(tableId).removeEventListener('sort', hideMethodName); } catch(e) {;}
}
function setScrollListener (scrollId, popupId){
  var scroller = $(scrollId.replace(/([ ;&,.+*~\':"!^$[\]()=>|\/])/g,'\\$1'));
  if (!scroller.data("has-scroll")) {
    scroller.data("has-scroll", true);
  }
  scroller.one("scroll", function(){
     var thePopup = jQuery(jQuery(document.getElementById(popupId))[0]);
     thePopup.css("display", "none");
  });
}

function detectItemDelimiter(event) {
    var inputText = event.getSource();
    var value = inputText.getSubmittedValue();
    if (event.getKeyCode() == 188) { //support comma as separator
        /*notify server*/
        AdfCustomEvent.queue(inputText, "notifyServer", { element : value }, true);
    }
    //typedInField(event);
}

function quickQueryInputKeyDown(event){
    var inputText = event.getSource();
    var value = inputText.getSubmittedValue();
    if (event.getKeyCode() == AdfKeyStroke.ENTER_KEY) { 
        //generate query event
        if(value != null && value.length > 0){
            new AdfQueryEvent(event.getSource()).queue();  
        }
        event.cancel(); //don't bubble up as that would close the dialog
    }
}

function clearGlobalMessage() {  
    AdfPage.PAGE.clearMessages(null);  
}

function blockNoteWindow(event) {
    var src = event.getSource();
    src.getPeer().ShouldShowHint = function() { 
        return false;
    }
}

function spinBack(event) {
    var source = event.getSource();
    var component = source.findComponent('c1');
    var percent = component.getPeer()._currentPercent;
    if (percent == 0){
        component.getPeer()._initiateSpinPercentAnimation(1);
    } else {
        component.getPeer()._initiateSpinPreviousAnimation();    
    }
    
}

function spinUp(event) {
    var source = event.getSource();
    var component = source.findComponent('c1');
    var percent = component.getPeer()._currentPercent;
    if (percent == 1){
        component.getPeer()._initiateSpinPercentAnimation(0);
    } else {
        component.getPeer()._initiateSpinNextAnimation();    
    }
    
}
function spinClientAction(event){
    var source = event.getSource();
    /*var prevarrowena = source.findComponent('cm1a');
    var prevarrowdis = source.findComponent('cm1');
    var nextarrowena = source.findComponent('cm2a');
    var nextarrowdis = source.findComponent('cm2');*/
    var component = source.findComponent('c1');
    var dot1 = component.getParent().getDescendantComponents();
    var dots = new Array();
    var clientIdsForList = dot1.length;
    if (event._newItemKey < event._oldItemKey){
        var j = 0;
        //Build the array of dots
        for (var i = 0;i< dot1.length;i++){
            var dotter = dot1[i];
            var dotterClientId = dotter.getClientId()
            if (dotterClientId.indexOf('dot') != -1){
                clientIdsForList=clientIdsForList+', '+dotter.getClientId();
                dots[j] = dotter;
                j++;
            }
        }
        for (var a = 0;a< dots.length;a++){
            var commandDot = dots[a];
            var dotToChange = document.getElementById(commandDot.getClientId().replace(':dot2',':dot2im'));//+'::icon');
            if (parseFloat(component.getPeer()._currentItemKey) == a){
                dotToChange.src = dotToChange.src.replace('/noncurrentdot','/currentdot');//('/images/currentdot.png');
            } else {// if (parseFloat(component.getPeer()._currentItemKey) != 1) {
                dotToChange.src = dotToChange.src.replace('/currentdot','/noncurrentdot');//('/images/noncurrentdot.png');
            }
        }
        /*var percent = component.getPeer()._currentPercent;
        if (percent == 0 || percent == 1) {
          //prevarrow.setIcon('/images/prevArrow_tip_dis.png');
          prevarrowdis.setInlineStyle("display:inline;cursor:default");//prevarrowdis.getInlineStyle().replace('none','inline'));
          prevarrowena.setInlineStyle("display:none;cursor:pointer");//prevarrowena.getInlineStyle().replace('inline','none'));
        }
        else {
          //prevarrow.setIcon('/images/prevArrow_tip_ena.png');
          prevarrowena.setInlineStyle("display:inline;cursor:pointer");//prevarrowdis.getInlineStyle().replace('none','inline'));
          prevarrowdis.setInlineStyle("display:none;cursor:default");//prevarrowena.getInlineStyle().replace('inline','none'));
        }
        if (percent == 1) {
          //nextarrow.setIcon('/images/nextArrow_tip_dis.png');
          nextarrowdis.setInlineStyle("display:inline;cursor:default");//prevarrowdis.getInlineStyle().replace('none','inline'));
          nextarrowena.setInlineStyle("display:none;cursor:pointer");//prevarrowena.getInlineStyle().replace('inline','none'));
          nextarrow.setDisabled(true);
        }
        else {
          //nextarrow.setIcon('/images/nextArrow_tip_ena.png');
          nextarrowena.setInlineStyle("display:inline;cursor:pointer");//prevarrowdis.getInlineStyle().replace('none','inline'));
          nextarrowdis.setInlineStyle("display:none;cursor:default");//prevarrowena.getInlineStyle().replace('inline','none'));
          nextarrow.setDisabled(false);
        }*/
    } else {
        var j = 0;
        //Build the array of dots
        for (var i = 0;i< dot1.length;i++){
            var dotter = dot1[i];
            var dotterClientId = dotter.getClientId()
            if (dotterClientId.indexOf('dot') != -1){
                clientIdsForList=clientIdsForList+', '+dotter.getClientId();
                dots[j] = dotter;
                j++;
            }
        }
        for (var a = 0;a< dots.length;a++){
            var commandDot = dots[a];
            var dotToChange = document.getElementById(commandDot.getClientId().replace(':dot2',':dot2im'));//+'::icon');
            if (parseFloat(component.getPeer()._currentItemKey) == a){
                dotToChange.src = dotToChange.src.replace('/noncurrentdot','/currentdot');//('/images/currentdot.png');
            } else if (parseFloat(component.getPeer()._currentItemKey) != dots.length) {
                dotToChange.src = dotToChange.src.replace('/currentdot','/noncurrentdot');//('/images/noncurrentdot.png');
            }
        }
        /*percent = component.getPeer()._currentPercent;
        if (percent == 0) {
          //prevarrow.setIcon('/images/prevArrow_tip_dis.png');
          prevarrowdis.setInlineStyle("display:inline;cursor:default");//prevarrowdis.getInlineStyle().replace('none','inline'));
          prevarrowena.setInlineStyle("display:none;cursor:pointer");//prevarrowena.getInlineStyle().replace('inline','none'));
        }
        else {
          //prevarrow.setIcon('/images/prevArrow_tip_ena.png');
          prevarrowena.setInlineStyle("display:inline;cursor:pointer");//prevarrowdis.getInlineStyle().replace('none','inline'));
          prevarrowdis.setInlineStyle("display:none;cursor:default");//prevarrowena.getInlineStyle().replace('inline','none'));
        }
        if (percent == 1) {
          //nextarrow.setIcon('/images/nextArrow_tip_dis.png');
          nextarrowdis.setInlineStyle("display:inline;cursor:default");//prevarrowdis.getInlineStyle().replace('none','inline'));
          nextarrowena.setInlineStyle("display:none;cursor:pointer");//prevarrowena.getInlineStyle().replace('inline','none'));
          nextarrow.setDisabled(true);
        }
        else {
          //nextarrow.setIcon('/images/nextArrow_tip_ena.png');
          nextarrowena.setInlineStyle("display:inline;cursor:pointer");//prevarrowdis.getInlineStyle().replace('none','inline'));
          nextarrowdis.setInlineStyle("display:none;cursor:default");//prevarrowena.getInlineStyle().replace('inline','none'));
          nextarrow.setDisabled(false);
        }*/
    }
}
function spinFromDot(event){
    var source = event.getSource();
    var dotNumber = source.getProperty('dotNumber');
    var dotCount = source.getProperty('dotCount');
    var component = source.findComponent('c1');
    var clickToPercent = parseFloat(dotNumber)/(parseFloat(dotCount)-1);
    component.getPeer()._initiateSpinPercentAnimation(clickToPercent);
}

