//function used in productSelector
function allProductsSearchKeyDown(event){
    var inputText = event.getSource();
    
    if (event.getKeyCode() == AdfKeyStroke.ENTER_KEY){
        //alert("value: "+inputText.getSubmittedValue());
        if(inputText.getSubmittedValue() != null && inputText.getSubmittedValue().length > 0){
            var buttonComponent = inputText.getParent().getParent().findComponent("cbFilter");
            queueActionEvent(buttonComponent, event);
        }
    }
}

function allProductsSelectDblClick(event){
    var table = event.getSource();
    var buttonComponent = table.getParent().getParent().findComponent("dc_ctbOKButton");
    queueActionEvent(buttonComponent, event);
}


function allProductsSelectKeyDown(event){
    var inputText = event.getSource();
    if (event.getKeyCode() == AdfKeyStroke.ENTER_KEY){
        var buttonComponent = inputText.getParent().getParent().findComponent("dc_ctbOKButton");
        queueActionEvent(buttonComponent, event);
    }
}

function queueActionEvent(component, event){
    if(component != null){
        AdfActionEvent.queue(component, component.getPartialSubmit());
        event.cancel();
    }
}

function popupLaunched(event) {
    var inputText = event.getSource();//notify server
    AdfCustomEvent.queue(inputText, "notifyServer", null, true);
    
}

if (!oracle) var oracle = {};
if (!oracle.mos) oracle.mos = {};
if (!oracle.mos.suggester) oracle.mos.suggester = {};

oracle.mos.suggester.pv = {
    prodChecked: function (event){
        var chckbx = event.getSource();//notify server
        AdfCustomEvent.queue(chckbx, "prodChecked", null, true);
    },

    prodLineChecked: function (event){
        var chckbx = event.getSource();//notify server
        AdfCustomEvent.queue(chckbx, "prodLineChecked", null, true);
    },
    prodItemClicked: function(event){
        var source = event.getSource();
        var listItem = source.getParent();
        var chkbx = listItem.findComponent("msl_sbc1");
        var idArray = listItem.getClientId().split(":"); //split to determine the index of the current selected item.
        
        if(chkbx){
            var value = chkbx.getValue();
            chkbx.setValue(!value); //toggle selection
        }
    },
    prodLineItemClicked: function(event){
        var source = event.getSource();
        var listItem = source.getParent();
        var chkbx = listItem.findComponent("msl_sbc1ln");
        var idArray = listItem.getClientId().split(":"); //split to determine the index of the current selected item.
        var indexListItem = idArray[idArray.length-2];
        
        if(chkbx){
            var value = chkbx.getValue();
            chkbx.setValue(!value); //toggle selection
        }
    }
}

//function used in hwAddressSearch
function addrComp_openPopup(event) {
  var source = event.getSource();
  AdfCustomEvent.queue(source, 'onOpenHwAddrSearchPopup', {}, false); 
}

//function used in hwAddressSearch
function addrComp_selectRow(event) {
  var source = event.getSource();
  AdfCustomEvent.queue(source, "selectOnDblClick", {}, false);
}

//function used in hwAddressSearch
function addrComp_handleSingleClick(event) {
  var source = event.getSource();
  AdfCustomEvent.queue(source, "setCurrentLocation", {}, false);
}
