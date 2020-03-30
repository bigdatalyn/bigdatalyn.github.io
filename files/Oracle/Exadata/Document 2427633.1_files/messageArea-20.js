// helper scripts for the message area
function hidePopup(event)
{
    event.cancel();
    var source = event.getSource();
    var popup = source.getParent();
    var elemFound = false;

    while (!elemFound)
    {
        try 
        {
            elemFound = popup.isPopupVisible();
        }
        catch (err)
        {
            popup = popup.getParent();
        }
    }
    popup.hide();
    return false;
}
function applyFadeOut(event)
{
    // Uses CSS transition to fade-out the message. For IE 10 this should work
    // FF, Safari and Opera. Degrades gracefully on unsupported browsers.
    //    
    // Calling setStyleClass() works but introduces a bug - ADF client
    // side propogates the styleclass back to the server. When the PPR response
    // is received, all items have the new style class - instead of just the one
    // we changed. 
    // So we resolve the ADF component to it's id, get the element from the dom tree
    // and manipulate the class directly.
    var item = event.getSource();
    while(item!=null)
    {
	var itemId = item.getClientId();
	if( itemId != null )
	{
            var itemObj = document.getElementById(itemId);
            if(itemObj!=null) 
	    {
		var clazzName = itemObj.className;
		if(clazzName.indexOf('message_area')!=-1)
		{
	                itemObj.className = 'message_area_fade '+clazzName;
			return;
		}
            }
	}
	item=item.getParent();
    }
}

