/*growingInput*/
function gFocusFunc(event) {
    var firingInputText = event.getSource();
    var sourceId = event.getSource().getClientId();
    var inputId = firingInputText.getProperty('inputId');
    var promptId = firingInputText.getProperty('promptId');
    var realPromptId = sourceId.replace(inputId, promptId);
    var prompt = $('span[id*=' + realPromptId + ']')
    var realInputId = realPromptId.replace(promptId, inputId);
    realInputId = realInputId+'::content';
    var firingInputText1 = $('textarea[id*=' + realInputId + ']');

    if (firingInputText1.val() == '') {
        prompt.removeClass('PromptedTextLabelUnfocused').addClass('PromptedTextLabelFocused');    
    }

}

function gLabelFocusFunc(event) {
    var firingInputText = event.getSource();
    firingInputText.className = 'PromptedTextLabelFocused';

}

function gBlurFunc(event) {
    var firingInputText = event.getSource();
    var sourceId = event.getSource().getClientId();
    var inputId = firingInputText.getProperty('inputId');
    var promptId = firingInputText.getProperty('promptId');
    var realPromptId = sourceId.replace(inputId, promptId);
    var prompt = $('span[id*=' + realPromptId + ']')
    var realInputId = realPromptId.replace(promptId, inputId);
    realInputId = realInputId+'::content';
    var firingInputText1 = $('textarea[id*=' + realInputId + ']');
    if (firingInputText1.val() == '') {
        prompt.removeClass('PromptedTextLabelFocused').addClass('PromptedTextLabelUnfocused');
    }
    var ximageId = firingInputText.getProperty('ximageId');
    var realXimageId = sourceId.replace(inputId, ximageId);
    var ximage = firingInputText.findComponent(realXimageId);
    if (firingInputText1.val() == '') {
        ximage.setSource('/images/xempty.png');
    }
}


  
  function findId(obj){
    var objString = obj.toString();
    var objId = objString.substring(objString.indexOf('id=',0)+3);
    return objId;
  }
	
   
    //var inputTextGrowingOriginalHeight;
    function mosInputTextGrowingFocus(event){
        /*var firingInputText=event.getSource();       
        var localId = firingInputText.getClientId();
        var maxHeight = firingInputText.getProperty('maxHeight');
        var minHeight = firingInputText.getProperty('minHeight');
        var inputTextObj = document.getElementById(localId+'::content');
        inputTextGrowingOriginalHeight = parseInt(inputTextObj.style.height);        
        if(isNaN(inputTextGrowingOriginalHeight)) {
          inputTextGrowingOriginalHeight = inputTextObj.clientHeight;
        }
        grow(inputTextObj, minHeight, maxHeight,firingInputText);*/
    }
    
    function mosInputTextGrowingBlurFunc(event){/*
        var firingInputText = event.getSource();       
        var localId = firingInputText.getClientId();
        var inputTextObj = document.getElementById(localId+'::content');
        var minHeight = firingInputText.getProperty('minHeight');
        if (inputTextObj.value == "") {
            inputTextObj.style.height = minHeight+'px';
        } */
    }
    function mosInputTextGrowingKeyDown(event){          
        var firingInputText=event.getSource();       
        var localId = firingInputText.getClientId();
        var counterStart = firingInputText.getProperty('counterStart');
        var maxHeight = firingInputText.getProperty('maxHeight');
        var minHeight = firingInputText.getProperty('minHeight');
        var rows = (firingInputText.getRows()< 2?2:firingInputText.getRows());          
        var maxLength = firingInputText.getProperty('maximumLength');
        var inputTextObj = $(document.getElementById(localId+'::content'));
        grow(inputTextObj, minHeight, maxHeight,firingInputText);
        toCount(inputTextObj,'{CHAR}',maxLength,rows,maxLength,counterStart,firingInputText); 
    }     
    
    function growOnResize(event){
        var firingDialog=event.getSource();
        var inputId = firingDialog.getProperty('inputId');
        var intxtgrwId = firingDialog.getProperty('intxtgrwId');
        var maxHeight = firingDialog.getProperty('maxHeight');
        var minHeight = firingDialog.getProperty('minHeight');
        var inputRealId = intxtgrwId+':'+inputId;
        var txtArea = $('textarea[id$="'+inputRealId+'::content"]');
        var txtAreaId = txtArea.attr('id');
        var firingInputText = AdfPage.PAGE.findComponent(inputRealId);
        grow(txtArea, minHeight, maxHeight, firingInputText);
        var someThingElse = 'som';
    }
    
    function grow(txtArea, minHeight, maxHeight, firingInputText) {
      var sizeToPopup = firingInputText.getProperty('sizeToPopup');
      var sizeToPopupHeightOffset = firingInputText.getProperty('sizeToPopupHeightOffset');
      var sizeToPopupWidthOffset = firingInputText.getProperty('sizeToPopupWidthOffset');
      var firingInputTextId = firingInputText.getClientId();
      //var label = $('label[for='+firingInputTextId+'::content]')
      //var labelp = label.closest('td');
      //var parentTableHeight = txtArea.closest('div');
      var parentTableHeight = null;
      var parentDivWidth = null;
      var parentHeight = null;
      var parentWidth = null;
      if (sizeToPopup){
          parentTableHeight = txtArea.closest('div[id$=mosPopupId::content]');
          parentDivWidth = txtArea.closest('div[id$=mosPopupId::content]');
          //var labelpWidth = labelp[0].clientWidth;
          parentHeight = parentTableHeight[0].clientHeight;
          parentWidth = parentDivWidth[0].clientWidth;
      }
      //var labelWidth = ((parentWidth-labelpWidth)-35);
      if (!document.all) {
        //txtArea.style.height = '0px';
        txtArea.height(0);
      }
      //var h = txtArea.scrollHeight + 12;
      var h = txtArea[0].scrollHeight + 12;
      if(h < minHeight) {
        h = minHeight;
      } else if(h > maxHeight) {
        h = maxHeight;
      }
      if (sizeToPopup && h > (parentHeight-sizeToPopupHeightOffset)){
        h = parentHeight-sizeToPopupHeightOffset;
      }
      
      //txtArea.style.height = h+'px';
      txtArea.height(h+'px');
      if (sizeToPopup){
          txtArea.width(parentWidth-sizeToPopupWidthOffset);
          //if (lablep){
          //labelp.width = '1%';}
          //txtArea[0].parentNode.width('100%');
      }
      var th = h+10;
      var currentStyle = firingInputText.getInlineStyle();
      firingInputText.setInlineStyle(currentStyle+';height:'+th+'px;display: inline-block;');
      if (sizeToPopup){
        firingInputText.setInlineStyle(currentStyle+';width:'+parentWidth-sizeToPopupWidthOffset+'px');
      }
    }
      
    function toCount(entranceObja,text,characters,rows,maxLength,counterStart,firingInputText) {  
        var sizeToPopup = firingInputText.getProperty('sizeToPopup');
        var entranceObj = document.getElementById(entranceObja[0].id);
        var length=characters - getUTF8Length(entranceObj.value); 
        var oNewDiv;
        var isNew = true;
        for (var i = 0;i < entranceObj.parentNode.childNodes.length;i++){
            if (entranceObj.parentNode.childNodes[i].nodeName == "SPAN"){
                isNew = false;
                continue;
            }
        }
        if (isNew) {
            oNewDiv = document.createElement("span");
            oNewDiv.setAttribute('style','position:absolute;top: 0;');
            oNewDiv.setAttribute('title', firingInputText.getProperty('counterDesc'));
            if (sizeToPopup){
                oNewDiv.setAttribute('style','position:absolute;top: 0;right:-30px;');
            }
            var parentTable = entranceObja.closest('table');
            parentTable.css("position","relative");
            entranceObj.parentNode.setAttribute('nowrap','nowrap')
            entranceObj.parentNode.appendChild(oNewDiv);
            
        } else {
            for (var j = 0;j < entranceObj.parentNode.childNodes.length;j++){
                if (entranceObj.parentNode.childNodes[j].nodeName == "SPAN"){
                    oNewDiv = entranceObj.parentNode.childNodes[j];
                    continue;
                }
            }
        }
        if(length <= 0) {                   
          length=0;                   
          text='<span style=color:red> '+text+' </span>';                   
          subcharacters = characters - entranceObj.value.length;
          if (subcharacters == 0){subcharacters = characters;}
          entranceObj.value=entranceObj.value.substr(0,subcharacters);
        }
        if(counterStart == maxLength || (maxLength - length) > counterStart){
          oNewDiv.style.visibility = "visible";
          oNewDiv.innerHTML = text.replace('{CHAR}',length);
        } else {
          oNewDiv.style.visibility = "hidden";
        }
        if(maxLength == length){
          oNewDiv.style.visibility = "hidden";
        }
        
    }
    
    function getUTF8Length(string) {
    var utf8length = 0;
    for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
            utf8length++;
        }
        else if((c > 127) && (c < 2048)) {
            utf8length = utf8length+2;
        }
        else {
            utf8length = utf8length+3;
        }
     }
     return utf8length;
     }

    function showToolTip(event){
        event.cancel();
        var source = event.getSource();
        var popupId = ('mitg1:noteWindow');
        var popup = AdfPage.PAGE.findComponentByAbsoluteId(popupId);
        if (!popup.isPopupVisible()) {
            var hints = {
            };
            hints[AdfRichPopup.HINT_LAUNCH_ID] = source.getClientId();
            hints[AdfRichPopup.HINT_ALIGN] = AdfRichPopup.ALIGN_BEFORE_END;
            popup.show(hints);
        }
    }
    function hideToolTip(event){
        var dialog = event.getSource();
        var popup = dialog.findComponent('noteWindow'); 
        popup.hide();
        event.cancel();
    }
/* promptedInput*/
function ptTypedInField(event) {
    var firingInputText = event.getSource();
    var sourceId = event.getSource().getClientId();
    var inputId = firingInputText.getProperty('inputId');
    var ximageId = firingInputText.getProperty('ximageId');
    var realXimageId = sourceId.replace(inputId, ximageId);
    var ximage = firingInputText.findComponent(realXimageId);
    var input = $('input[id*=' + sourceId + ']');
    if (input.val && input.val != '') {
        ximage.setSource('/images/xactive.png');
    }

}

function ptFocusFunc(event) {
    var firingInputText = event.getSource();
    var sourceId = event.getSource().getClientId();
    var inputId = firingInputText.getProperty('inputId');
    var promptId = firingInputText.getProperty('promptId');
    var realPromptId = sourceId.replace(inputId, promptId);
    var prompt = document.getElementById(realPromptId);
    /*var firingInputTextl = AdfPage.PAGE.findComponent(sourceId);*/

    var realInputId = realPromptId.replace(promptId, inputId);
    var firingInputText1 = $('input[id*=' + realInputId + ']');
    var val = firingInputText1.val();
    if (firingInputText1.val() == '') {
        prompt.className = 'PromptedTextLabelFocused';
    }

}

function ptLabelFocusFunc(event) {
    var prompObj = event.getSource();
    var inputId = prompObj.getProperty('inputId');
    var sourceId = event.getSource().getClientId();
    var realPromptId = sourceId.replace('opt', 'pnl');
    realPromptId = realPromptId.replace('opl', 'pnl');
    var realInputId = sourceId.replace('opt', inputId);
    realInputId = realInputId + '::content';
    var input = $('span[id*=' + realInputId + ']');
    input.focus();
    var prompt = $('span[id*=' + realPromptId + ']');
    prompt.removeClass('PromptedTextLabelUnfocused').addClass('PromptedTextLabelFocused');

}

function ptBlurFunc(event) {
    var firingInputText = event.getSource();
    var sourceId = event.getSource().getClientId();
    var inputId = firingInputText.getProperty('inputId');
    var promptId = firingInputText.getProperty('promptId');
    var realPromptId = sourceId.replace(inputId, promptId);
    var prompt = $('span[id*=' + realPromptId + ']');
    /*var prompt = document.getElementById(realPromptId);*/
    /*var firingInputTextl = AdfPage.PAGE.findComponent(sourceId);*/

    var realInputId = realPromptId.replace(promptId, inputId);
    var firingInputText1 = $('input[id*=' + realInputId + ']');

    if (firingInputText1.val() == '') {
        prompt.removeClass('PromptedTextLabelFocused').addClass('PromptedTextLabelUnfocused');
    }
    var ximageId = firingInputText.getProperty('ximageId');
    var realXimageId = sourceId.replace(inputId, ximageId);
    var ximage = firingInputText.findComponent(realXimageId);
    if (firingInputText1.val() == '') {
        ximage.setSource('/images/xempty.png');
    }
}

function ptClearField(event) {
    var xicon = event.getSource();
    var sourceId = event.getSource().getClientId()
    var inputId = xicon.getProperty('inputId');
    var realInputId = sourceId.replace(xicon.getId(), inputId);
    var adfInput = AdfPage.PAGE.findComponent(realInputId);
    realInputId = realInputId + '::content';
    var input = $('input[id*=' + realInputId + ']');

    adfInput.setValue('');
    input.val('');
    adfInput.setValid(true);
    xicon.setSource('/images/xclick.png');

}

function ptSetFocus(event) {
    var xicon = event.getSource();
    var sourceId = event.getSource().getClientId()
    var inputId = xicon.getProperty('inputId');
    var realInputId = sourceId.replace(xicon.getId(), inputId);
    realInputId = realInputId + '::content';
    var input = $('input[id*=' + realInputId + ']');
    input.focus();
    xicon.setSource('/images/xempty.png');
}

/* Generic */
function hoverXImage(event) {
    var xicon = event.getSource();
    if (xicon.getSource() != '/images/xempty.png') {
        xicon.setSource('/images/xhover.png');
    }
}

function unHoverXImage(event) {
    var xicon = event.getSource();
    if (xicon.getSource() != '/images/xempty.png') {
        xicon.setSource('/images/xactive.png');
    }
}

function clickXImage(event) {
    var xicon = event.getSource();
    xicon.setSource('/images/xclick.png');
}

/*multiSelect*/
function multiTypedInField(event) {
    var firingInputText = event.getSource()
    var sourceId = event.getSource().getClientId()
    var ximageId = sourceId.replace("msl_input", "ximage1");
    ximageId = ximageId.replace("::content", "");
    var ximage = AdfPage.PAGE.findComponent(ximageId);
    if (firingInputText.getValid() && (!firingInputText.getValue() || firingInputText.getValue() == '')) {
        ximage.setSource('/images/xactive.png');
    }
}

function multiClearField(event) {
    var xicon = event.getSource();
    var sourceId = event.getSource().getClientId()
    var inputId = sourceId.replace("ximage1", "msl_input");
    inputId = inputId + '::content';
    var input = $('input[id*=' + inputId + ']')
    input.val('');
    xicon.setSource('/images/xclick.png');
}

function multiSetFocus(event) {
    var xicon = event.getSource();
    var sourceId = event.getSource().getClientId()
    var inputId = sourceId.replace("ximage1", "msl_input");
    inputId = inputId + '::content';
    var input = $('input[id*=' + inputId + ']')
    input.focus();
    xicon.setSource('/images/xempty.png');
}
multiFocusFunc = function (event) {
    var firingInputText = event.getSource()
    var sourceId = event.getSource().getClientId()
    var labelId = sourceId.replace("msl_input", "labelContainer");
    var label = $('span[id*=' + labelId + ']');
    if (!firingInputText.getValue() || firingInputText.getValue() == '') {
        label.removeClass('MultiPromptedTextLabelUnfocused').addClass('MultiPromptedTextLabelFocused');
    }
}
multiBlurFunc = function (event) {
    var firingInputText = event.getSource()
    var sourceId = event.getSource().getClientId()
    var labelId = sourceId.replace("msl_input", "labelContainer");
    var label = $('span[id*=' + labelId + ']')

    if (!label) {
        labelId = sourceId.replace("ssl_inputComboboxListOfValues", "labelContainer");
        label = $('span[id*=' + labelId + ']')
    }
    if (firingInputText.getValid() && (!firingInputText.getValue() || firingInputText.getValue() == '')) {
        label.removeClass('MultiPromptedTextLabelFocused').addClass('MultiPromptedTextLabelUnfocused');
    }
}

function detectEnterKey(event) {
    var inputText = event.getSource();
    var value = inputText.getSubmittedValue();
    if (event.getKeyCode() == AdfKeyStroke.ENTER_KEY) {
        /*notify server*/
        AdfCustomEvent.queue(inputText, "notifyServer", 
        {
            element : value
        },
true);
    }
    typedInField(event);
}

function multiPopupOpened(event) {
    var inputText = event.getSource();/*notify server*/
    AdfCustomEvent.queue(inputText, "notifyServer", null, true);
}
/*singleSelect*/
singleFocusFunc = function (event) {
    var firingInputText = event.getSource()
    var sourceId = event.getSource().getClientId()
    var labelId = sourceId.replace("ssl_inputComboboxListOfValues", "labelContainer1");
    labelId = labelId.replace("ssl_clShowPopup", "labelContainer2");
    labelId = labelId.replace("ssl_input", "labelContainer2");
    var label = $('span[id*=' + labelId + ']')
    if (!firingInputText.getValue() || firingInputText.getValue() == '') {
        label.removeClass('Single1PromptedTextLabelUnfocused');
        label.removeClass('Single2PromptedTextLabelUnfocused');
        if (labelId.search("labelContainer1") > 0) {
            label.addClass('Single1PromptedTextLabelFocused');
        }
        else {
            label.addClass('Single2PromptedTextLabelFocused');
        }
    }
}
singleBlurFunc = function (event) {
    var firingInputText = event.getSource()
    var sourceId = event.getSource().getClientId()
    var labelId = sourceId.replace("ssl_inputComboboxListOfValues", "labelContainer1");
    labelId = labelId.replace("ssl_clShowPopup", "labelContainer2");
    labelId = labelId.replace("ssl_input", "labelContainer2");

    var label = $('span[id*=' + labelId + ']')

    if (!label) {
        labelId = sourceId.replace("ssl_inputComboboxListOfValues", "labelContainer2");
        label = $('span[id*=' + labelId + ']')
    }
    if (firingInputText.getValid() && (!firingInputText.getValue() || firingInputText.getValue() == '')) {
        label.removeClass('Single1PromptedTextLabelFocused');
        label.removeClass('Single2PromptedTextLabelFocused');
        if (labelId.search("labelContainer1") > 0) {
            label.addClass('Single1PromptedTextLabelUnfocused');
        }
        else {
            label.addClass('Single2PromptedTextLabelUnfocused');
        }
    }
}

function singleTypedInField(event) {
    var firingInputText = event.getSource()
    var sourceId = event.getSource().getClientId()
    var labelId = sourceId.replace("ssl_inputComboboxListOfValues", "labelContainer1");
    labelId = labelId.replace("ssl_clShowPopup", "labelContainer2");
    labelId = labelId.replace("ssl_input", "labelContainer2");
    var label = $('span[id*=' + labelId + ']')
    if (!label) {
        labelId = sourceId.replace("ssl_inputComboboxListOfValues", "labelContainer2");
        label = $('span[id*=' + labelId + ']')
    }
    if (firingInputText.getValue() && firingInputText.getValue() != '') {
        label.removeClass('Single1PromptedTextLabelUnfocused');
        label.removeClass('Single2PromptedTextLabelUnfocused');
        if (labelId.search("labelContainer1") > 0) {
            label.addClass('Single1PromptedTextLabelFocused');
        }
        else {
            label.addClass('Single2PromptedTextLabelFocused');
        }
    }
    var ximageId = sourceId.replace("ssl_inputComboboxListOfValues", "ximage1");
    ximageId = ximageId.replace("ssl_clShowPopup", "ximage2");
    ximageId = ximageId.replace("ssl_input", "ximage2");
    ximageId = ximageId.replace("::content", "");
    var ximage = AdfPage.PAGE.findComponent(ximageId);
    if (firingInputText.getValid() && (!firingInputText.getValue() || firingInputText.getValue() == '')) {
        ximage.setSource('/images/xactive.png');
    }
}

function singleClearField(event) {
    var xicon = event.getSource();
    var sourceId = event.getSource().getClientId()
    var inputId = sourceId.replace("ximage1", "ssl_inputComboboxListOfValues");
    inputId = inputId.replace("ximage2", "ssl_input");
    inputId = inputId + '::content';
    var input = $('input[id*=' + inputId + ']')
    input.val('');
    xicon.setSource('/images/xclick.png');
}

function singleSetFocus(event) {
    var xicon = event.getSource();
    var sourceId = event.getSource().getClientId()
    var inputId = sourceId.replace("ximage1", "ssl_inputComboboxListOfValues");
    inputId = inputId.replace("ximage2", "ssl_input");
    inputId = inputId + '::content';
    var input = $('input[id*=' + inputId + ']')
    input.focus();
    xicon.setSource('/images/xempty.png');
}