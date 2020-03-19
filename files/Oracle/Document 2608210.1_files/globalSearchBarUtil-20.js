searchFieldFocus = function (event) {
  var searchTerm=$('input[id*="pt_itG"]').val();
  var selectedSrc=$('input[id$="sel_srcG"]').val(); 
  if(selectedSrc==searchTerm)
     $('input[id*="pt_itG"]').val('');

}
searchFieldBlur = function (event) {
    var searchTerm=$('input[id*="pt_itG"]').val();
    var selectedSrc=$('input[id$="sel_srcG"]').val();
    if(searchTerm==''){
      $('input[id*="pt_itG"]').val(selectedSrc);
      $('input[id$="srchTG"]').val(''); 
    }
}
function setFocusId(id) {
    $('input[id*="pt_itG"]').focus();
  var srchTerm=$('input[id$="srchTG"]').val();
  $('input[id*="pt_itG"]').val(srchTerm);
}

saveSearchTerm = function (event) {
    var searchTerm=$('input[id*="pt_itG"]').val();
    var selectedSrc=$('input[id$="sel_srcG"]').val();
    if(selectedSrc!=searchTerm)
            $('input[id$="srchTG"]').val(searchTerm);
        
    clearSourceSelection();
    
    var sourceId = event.getSource().getClientId();
    var source = AdfPage.PAGE.findComponent(sourceId);
    source.setInlineStyleProperty('font-weight','bold');
    $('input[id$="selSrcG"]').val(sourceId);
    
    var imgUrl = event.getSource().getProperty("icon");
    setSourceSelectionImag(imgUrl);
    
    var shortName = event.getSource().getProperty('shortName');
    $('input[id$="selSrcShNaG"]').val(shortName);
    
    var sourceTip = event.getSource().getProperty('sourceTip');
    if (searchTerm.length == 0) {
        $('input[id$="sel_srcG"]').val(sourceTip);
        $('input[id*="pt_itG"]').val(sourceTip);
    } else if (searchTerm == selectedSrc) {
        $('input[id$="sel_srcG"]').val(sourceTip);
        $('input[id*="pt_itG"]').val(sourceTip);
    } else {
        $('input[id$="sel_srcG"]').val(sourceTip);
    }
    
    $('input[id*="pt_itG"]').focus();
    
    event.cancel();
}

function clearSourceSelection() {
    var sourceCount = $('input[id$="srcCntG"]').val();
    var currentSelectedSource = $('input[id$="selSrcG"]').val();    
    var originalSource = AdfPage.PAGE.findComponent(currentSelectedSource);
    if (originalSource == undefined) {
        for (i = 0; i < sourceCount; i++) {
            var selectedSource;
            var selectedSourceId;
            if (i == 0) {
                selectedSourceId = "pt1:svMenu:gsb:cmi1";
                selectedSource = AdfPage.PAGE.findComponent(selectedSourceId);
                if(!selectedSource){
                    selectedSourceId = "kmPgTpl:svMenu:gsb:cmi1";
                    selectedSource = AdfPage.PAGE.findComponent(selectedSourceId);
                }
            } else {
                selectedSourceId = "pt1:svMenu:gsb:cmi1j_id_" + i;
                selectedSource = AdfPage.PAGE.findComponent(selectedSourceId);
                if(!selectedSource){
                    selectedSourceId = "kmPgTpl:svMenu:gsb:cmi1j_id_" + i;
                    selectedSource = AdfPage.PAGE.findComponent(selectedSourceId);
                }
            }
            
            if (selectedSource != undefined) {
                selectedSource.setInlineStyleProperty('font-weight','normal');
            }
        }
    } else {
        originalSource.setInlineStyleProperty('font-weight','normal');
    }
}

function setSourceSelectionImag(imgUrl) {
    var sourceButton = document.getElementById("pt1:svMenu:gsb:cb1");
    if(!sourceButton)
        sourceButton = document.getElementById("kmPgTpl:svMenu:gsb:cb1");
    var sourceImage = sourceButton.children[0];
    var newImgUrl;
    newImgUrl=imgUrl.replace(".png","_menuarrow.png");
    sourceImage.src = newImgUrl; 
}

function selectSourceByShortName(shortName) {
    var sourceCount = $('input[id$="srcCntG"]').val();
    for (i = 0; i < sourceCount; i++) {
        var selectedSource;
        var selectedSourceId;
        if (i == 0) {
            selectedSourceId = "pt1:svMenu:gsb:cmi1";
            selectedSource = AdfPage.PAGE.findComponent(selectedSourceId);
                if(!selectedSource){
                    selectedSourceId = "kmPgTpl:svMenu:gsb:cmi1";
                    selectedSource = AdfPage.PAGE.findComponent(selectedSourceId);
                }
        } else {
            selectedSourceId = "pt1:svMenu:gsb:cmi1j_id_" + i;
            selectedSource = AdfPage.PAGE.findComponent(selectedSourceId);
                if(!selectedSource){
                    selectedSourceId = "kmPgTpl:svMenu:gsb:cmi1j_id_" + i;
                    selectedSource = AdfPage.PAGE.findComponent(selectedSourceId);
                }
        }
        if (selectedSource != undefined) {
            var sourceShortName = selectedSource.getProperty('shortName');  
            if ( (sourceShortName != undefined) && (sourceShortName == shortName) ) {
                selectedSource.setInlineStyleProperty('font-weight','bold');   
                $('input[id$="selSrcG"]').val(selectedSourceId);
            }
        }
    }
}

saveRecentSearchTerm = function (event) {
    var recentSearchString = event.getSource().getProperty('recentSearchString');
    $('input[id*="clickStreamParameters"]').val("RecentSearches");
    $('input[id*="pt_itG"]').val(recentSearchString);
    event.cancel();
    //use suggest mechanism to generate search
    var searchButtonId = $('a[id*="menu_pt_cil2"]').attr('id');
    var searchButton = AdfPage.PAGE.findComponent(searchButtonId);
    if (searchButton != undefined) {
        if (searchButton != null) {
            var partialSubmit = false;
            AdfActionEvent.queue(searchButton, partialSubmit); 
        }
    }
}
