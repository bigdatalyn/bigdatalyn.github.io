// presence.js

'use strict';

var PRESENCE = (function($) {

    var me = {};
    
    // Public parameters (should be overridden in the calling page)
    me.DEFAULT_ACTIVE_POLL_INTERVAL = 30000; // (30 sec) default poll interval when active in ms
    me.MAX_POLLING_TIME = 900000; // (15 min) default value for how long the polling should continue in ms
    me.MAX_POLL_ERRORS_ALLOWED = 2; //number of errors after it stops polling 
    me.TAKE_OVER_INTERVAL = 45000; // (45 sec) how much a tab should give the currently polling tab to do its next poll before taking over.
    me.APP_NAME = null; // Application name to differentiate between presence in MOSCP, MOSEP and ISP. Use one of 'MOSCP' , 'MOSEP' or 'ISP'
    me.CROSS_DOMAIN = false;  // set this to true to allow Ajax cross domain calls
    
    /**
     * The root context where the keepalive will be sent
     * 
     * If this is not set it runs in the application root context 
     * in which the script was included
     */
    me.ROOT_CONTEXT = null;
    
    // Timer for polling. This variable is used to control the interval of the polling
    // depending on the user's status.
    var pollInterval = me.DEFAULT_ACTIVE_POLL_INTERVAL;
    
    // This variable is to check at the JS level whether there's polling going on or not.
    var pollingStopped = false;
    
    // This is saved in the cookie and read from it. It's part of the single tab polling logic.
    var lastPollTimestamp = null;
    
    var totalPollingTime = 0;
    var userPresenceStatus = 'active'; // active/idle/away
    var presenceTimeout = null;
    var errorCount = 0;
    var iAmActive = false;
    var oldClientX, oldClientY;
    
    
    /**
     * Recursive function that does the actual polling
     * 
     * @param overridePollInterval number of milliseconds after which this polll should execute. 
     *                             If this is null, it will execute by default at the private variable <pollInterval>
     */
    function doPresencePoll(overrideInterval) {
        // default the polling interval to the private variable
        var internalInterval = pollInterval;
        
        // if a non-null override value was provided, use that
        if(overrideInterval != null)
            internalInterval = overrideInterval;

        if(internalInterval >= 0) {
            presenceTimeout = setTimeout(function () {
                if( checkAndPrepareXHR() ) {
                    pollingStopped = false;
                    var pollData = {status: userPresenceStatus, tabguid: tabGuid};
                    if (me.APP_NAME) {
                       pollData.application = me.APP_NAME; 
                    }
                    $.ajax({
                        type: 'GET',
                        dataType: 'html',
                        url: me.ROOT_CONTEXT + 'presence.keepalive',
                        contentType: 'text/plain',
                        data: pollData,
                        crossDomain: me.CROSS_DOMAIN,
                        xhrFields: {
                          withCredentials: me.CROSS_DOMAIN
                        },
                        success: function (data, textStatus, jqXHR){
                            presencePollSuccess(data, textStatus, jqXHR);
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            presencePollError(jqXHR, textStatus, errorThrown);
                        },
                        complete: function() {
                            // recursively call this function again, but only if the total polling time hasn't been exceeded.
                            totalPollingTime += internalInterval;
                            if(totalPollingTime < me.MAX_POLLING_TIME) {
                                clearTimeout(presenceTimeout);
                                doPresencePoll();
                            }
                            else {
                                pollingStopped = true;
                            }
                        }
                    });
                }
                else { // skipping a poll and reentering the function
                    clearTimeout(presenceTimeout);
                    me.resetPollingTotalDuration();
                    doPresencePoll();
                }
            }, internalInterval);
        }
    };
    
    /**
     * Called when the polling returns successful. Will execute javascript callbacks sent by the presence servlet, if any,
     * else:
     *  - wihtdraw all chat invitations (this is called in presence to diminuate the network traffic)
     * 
     * @param data the response content
     * @param textStatus the status
     * @param jqXHR the XMLHttpRequest object that was used for the AJAX call
     */
    function presencePollSuccess(data, textStatus, jqXHR) {
        if(data && data.indexOf('[script]') > -1) {
            executeCallbackScript(data);
        } else {
            // if there is no response from server then withdraw all invitations
            // from user's browser because they are no longer valid
            withdrawAllInvitations();
        }
    }
    
    /**
     * Use the invitations API to withdraw all active invitations.
     */
    function withdrawAllInvitations() {
      try {
        if (INVITATION) {
          INVITATION.withdrawAllInvitations();
        }            
      } catch (err) {
        reportPollError(err);
      }
    }
    
    /**
     * Called when the AJAX polling returns an error (e.g. 500, or 404). Will increase the polling interval so that we 
     * don't flood the server. After this limit is reached, polling stops for good and will ony be reset on navigation.
     * 
     * @param jqXHR the XMLHttpRequest object that was used for the AJAX call
     * @param textStatus the status
     * @param errorThrown the exception object
     */
    function presencePollError(jqXHR, textStatus, errorThrown) {
        if(errorCount <= me.MAX_POLL_ERRORS_ALLOWED) {
            pollInterval += me.DEFAULT_ACTIVE_POLL_INTERVAL;
            errorCount++;
        }
        else {
            me.stopPolling();
        }
    }
    
    /**
     * Callback function to do something if there was a server error from a presence poll. Right now, it does nothing.
     * 
     * @param callbackError 
     */
    function reportPollError(callbackError) {
      if (console && console.log) {
        try {
          console.log("Presence poll error: " + callbackError);
        } catch (e) {;}
      }
    }
    
    /**
     * Extracts and executes javascript contained in [script]...[/script] tags.
     * 
     * @param data 
     */
    function executeCallbackScript(data) {
        try{
            var callbackScript = data.substring(data.indexOf('[script]') + 8, data.indexOf('[/script]'));
            eval(callbackScript);
        }
        catch(callbackError){
            reportPollError(callbackError);
        }
    }

    /**
     * Special handler for mouse move events.
     * Makes sure that there was real movement when the event was triggered, as some browsers (e.g. Chrome) 
     * will trigger the mousemove event on various other happenings in the page (tooltip, cursor change), even on some invisible ones.
     * If real movement happened, it sets the status to active and resets the counter for how long it polled so far (or tried to).
     * 
     * @param event
     */
    function _mouseMoveActive(event)
    {
        if(oldClientX == null || oldClientY == null) {
            oldClientX = event.clientX;
            oldClientY = event.clientY;
        }
        else {
            if(oldClientX != event.clientX || oldClientY != event.clientY) {
                oldClientX = event.clientX;
                oldClientY = event.clientY;
                _active(event);
            }
        }
    }
    
    /**
     * Handler that will be called on any user event captured at the document level.
     * Sets the status to active and resets the counter for how long it polled (or tried to).
     * 
     * @param event
     */
    function _active(event)
    {
        try {
            if(!iAmActive) {
              iAmActive = true;
              continueCookiePollReport();
            }
            me.resetPollingTotalDuration();
            
            // reactivate if polling stopped
            if (pollingStopped && document.onActive) {
                pollingStopped = false;
                document.onActive();
            }
        } catch (err) {}
    }
    
    /**
     * Handler that will be called on any user event captured at the document level.
     * Sets the status to active and resets the counter for how long it polled (or tried to).
     * 
     * @param event
     */
    function _inactive(event)
    {
        try {
            iAmActive = false;
        } catch (err) {
            if(typeof(console) != 'undefined')
              console.log('Error deactivating tab' + err);
        }
    }

    /**
     * Public method that sets the presence events and some extra methods at the document level
     * 
     * Also sets the root context for the keepalive if it wasn't set.
     */
    me.initPresence = function() {
        if (!me.ROOT_CONTEXT) {
          // get the URL where the presence polls will go
          var pathArray = window.location.pathname.split( '/' );
          if(pathArray.length>1) {
              me.ROOT_CONTEXT = "/" + pathArray[1] + "/";
          }
        }
        
        // setup events at the document level
        document.onActive = function() {me.setActive();}
        document.stopPoll = function() {me.stopPolling();}
        document.startPoll = function() {me.startPolling();}
    
        var doc = $(document);
        var docWindow = $(window);
        doc.ready(function(){
            doc.mousemove(_mouseMoveActive);
            try {
                doc.mouseenter(_active);
            } catch (err) {}
            try {
                doc.scroll(_active);
            } catch (err) {}
            try {
                doc.keydown(_active);
            } catch (err) {}
            try {
                doc.click(_active);
            } catch (err) {}
            try {
                doc.dblclick(_active);
            } catch (err) {}
            try {
                docWindow.focus(_active);
            } catch (err) {}
            try {
                docWindow.blur(_inactive);
            } catch (err) {}
        });
    }
    
    /**
     * Event handler for when the user becomes active
     */
    me.setActive = function() {
        if(me.userAvailable) {
            me.configurePolling(me.DEFAULT_ACTIVE_POLL_INTERVAL);
            me.resetPollingTotalDuration();
            doPresencePoll();
        }
    }
    
    /**
     * public convenience function (for callbacks, mainly) that sets a new polling interval.
     * 
     * @param interval 
     */
    me.configurePolling = function(interval) {
        pollInterval = interval;
    }
    
    /**
     * Public convenience function that resets the inactivity timeout.
     */
    me.resetPollingTotalDuration = function() {
        totalPollingTime = 0;
    }
    
    /**
     * Generates a GUID for the current tab
     */
    function guid() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
    
    /**
     * Helps computing GUID's parts
     */
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };
    
    /**
     * Logs to the console if available
     * 
     * @param message 
     */
    function consoleLog(message) {
        if(typeof(console) != 'undefined')
            console.log(message);
    }
    
    /**
     * Checks whether this tab should execute a poll.
     * Will execute the poll if:
     * - this tab was in charge of executing the polls previously or
     * - the last tab polled more than DEFAULT_ACTIVE_POLL_INTERVAL millis ago.
     */
    function checkAndPrepareXHR() {
        // this prevents spamming the server in case there's events flurry
        if(new Date().getTime() - lastPollTimestamp < me.DEFAULT_ACTIVE_POLL_INTERVAL) {
            return false;
        }
        
        var pCookie = COOKIES.getCookieValue(COOKIES.PRESENCE_COOKIE_NAME);
        
        // this is the first tab executing a poll
        if(pCookie==null) {
            writeCookiePollReport();
            return true;
        }
        else {
            var idxSeparator = pCookie.indexOf('|');
            if(idxSeparator > 0) { // cookie contents are ok
                var lastPollTab = pCookie.substring(0,pCookie.indexOf('|'));
                var lastPollMillis = pCookie.substring(pCookie.indexOf('|') + 1);
                
                if(lastPollTab == tabGuid) { // this tab was also executing the poll previously
                    writeCookiePollReport();
                    return true;
                }
                else {
                    // Some other tab was executing the poll previously. Will take over if:
                    // - longer time has passed than me.TAKE_OVER_INTERVAL since the last tab polled.
                    if(new Date().getTime() - lastPollMillis > me.TAKE_OVER_INTERVAL) { // last poll was longer than me.TAKE_OVER_INTERVAL milliseconds ago
                        writeCookiePollReport();
                        return true;                    
                    }
                    else {
                        // Let the other tab poll
                        return false;
                    }
                }
            }
            else {  // cookie content is badly formatted. Rewrite it and take over.
                writeCookiePollReport();
                return true;   
            }
        }
    }
    
    /**
     * Writes the results of the last poll into the tabs communication cookie.
     */
    function writeCookiePollReport() {
        customCookiePollReport(tabGuid, new Date().getTime());
    }
	
    /**
     * Writes the time of the previous poll into the tabs communication cookie if less than DEFAULT_ACTIVE_POLL_INTERVAL has passed. 
     * Otherwise, writes a new cookie.
     * Used for writing the cookie when first entering a page.
     */
    function continueCookiePollReport() {
        var previousPollMillis = getLastPollFromCookie();
        if(previousPollMillis == null) { // no cookie or invalid timestamp value in it: write a new one
            writeCookiePollReport();
        }
        else {
            customCookiePollReport(tabGuid, previousPollMillis);
        }
        
        return;
    }
    
    function customCookiePollReport(aTabGuid, aTimeStamp) {
        COOKIES.setCookieValue(COOKIES.PRESENCE_COOKIE_NAME, aTabGuid + '|' + aTimeStamp, null);
    }
    
    /*
     * Tries to read the cookie and return how many milliseconds should pass before the next poll. 
     * If the cookie does not exist or is invalid, returns null.
     */
    function getNextPollFromCookie() {
        var retNextPollInterval;
        var previousPollMillis = getLastPollFromCookie();
        if(previousPollMillis != null) { // valid previous cookie and timestamp
            var nowMillis = new Date().getTime();
            retNextPollInterval = me.DEFAULT_ACTIVE_POLL_INTERVAL - (nowMillis - previousPollMillis);
            if(retNextPollInterval < 0) {
                retNextPollInterval = 0;
            }
            else {
                if(retNextPollInterval > me.DEFAULT_ACTIVE_POLL_INTERVAL) {
                    retNextPollInterval = me.DEFAULT_ACTIVE_POLL_INTERVAL;
                }
            }
        }
        return retNextPollInterval;
    }
    
    /**
     * This method returns from the cookie an int containing the millis when the last poll was executed.
     * It returns null if the cookie doesn't exist or it can't extract the value from it.
     */
    function getLastPollFromCookie() {
        var pCookie = COOKIES.getCookieValue(COOKIES.PRESENCE_COOKIE_NAME);
        if(pCookie == null || pCookie.indexOf('|') < 0) {
            return;
        } 
        else {
            var previousPollMillis = pCookie.substring(pCookie.indexOf('|') + 1);
            try {
                return parseInt(previousPollMillis, 10);
            }
            catch(err) {
                return;
            }
        }
        return;
    }
    
    /**
     * This method is called when the user changes its status in the menu or
     * when the page is loaded.
     */
    me.startPolling = function() {
        me.userAvailable = true;
        pollInterval = me.DEFAULT_ACTIVE_POLL_INTERVAL;
        pollingStopped = false;
        if(!document.onActive)
            me.initPresence();
        // try to resume polling from where it was left
        var nextPollInterval = getNextPollFromCookie();
        
        // Need to take over the polling and make sure that when the poll comes it won't think it was another tab doing the poll.
        if(nextPollInterval == null){
            writeCookiePollReport();
        }
        else {
            continueCookiePollReport();
        }
        
        doPresencePoll(nextPollInterval);
    }
    
    /**
     * This function is used to stop the polling
     */
    me.stopPolling = function () {
        me.userAvailable = false;
        pollInterval = -1;
        clearTimeout(presenceTimeout);
        pollingStopped = true;
    }
    
    // generate the tab's guid
    var tabGuid = guid();   // each tab has its own identifier. Will be regenerated on refresh
    
    return me;
}(jQuery));
