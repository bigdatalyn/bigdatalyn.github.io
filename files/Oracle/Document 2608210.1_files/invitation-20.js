var INVITATION = (function($) {

  var me = {};
  
  me.config = {};
  me.config.isScreenReaderMode = false;
  me.config.tabbedChatLoader = "";
  me.config.messageForAnInvitationActionAlreadyProcessed = "";
  me.config.genericError = "";
  me.config.messageForPopupBlockerEnabled = "";
  me.config.invitationAsPlainText = "";
  me.config.invitationAsHtmlElement = "";
  me.config.recoverNotificationAsPlainText = "";
  me.config.recoverNotificationAsHtmlElement = "";
  me.config.invitationHeaderForHtmlElement = "";
  me.config.declineMessage = "";
  me.config.declineMessageSubmit = "";
  me.config.unreadMessage = "";
  me.config.unreadMessages = "";
  me.config.ROOT_CONTEXT = null;
  me.config.CROSS_DOMAIN = false;
  
  me.config.isFirefox = typeof InstallTrigger !== 'undefined'; 
  me.config.FIREFOX_NOTIFICATION_COUNT = 4;
  me.config.FIREFOX_NOTIFICATION_INTERVAL = 4000;

  me.originalDocTitle = document.title;
  
  me.closeAllTriggered = false;
  
  // PC object is defined only in ISP to sideload all the JS files from EP to run directly in ISP
  me.MODULE_LOADED_FROM_ISP = typeof PC !== 'undefined' && PC !== null; // typeof null is 'object'
  
  var IE_REGEX = /(?:MSIE |Trident\/.*; rv:)(\d+)/;
  
  var MAX_DISPLAY_TIME = 600;
  
  var recoverNotificationIsAlreadyDisplayed = false;

  var ADF_CHAT_WINDOW_URL           = 'faces/tabbedChat',
      ADF_DEFAULT_CHAT_WINDOW_NAME  = 'chatWndName';
  
  var JET_JERSEY_ROOT            = '/mossp/',
      JET_REST_VERSION           = '1.0',
      JET_FWK_RESOURCES          = 'mosFwkResources/',
      JET_SOCIAL_RESOURCES       = 'mosSocialResources/',
      JET_SOCIAL_ROOT            = JET_JERSEY_ROOT + JET_SOCIAL_RESOURCES + JET_REST_VERSION,
      JET_FWK_ROOT               = JET_JERSEY_ROOT + JET_FWK_RESOURCES + JET_REST_VERSION,
      JET_SITEPARAMS             = JET_FWK_ROOT + '/spSiteparameters',
      JET_API_INIT               = JET_SOCIAL_ROOT + '/chat/initialize',
      JET_RESPOND_TO_INVITE      = JET_SOCIAL_ROOT + '/chat/conversations/{0}/respond',
      JET_RECOVER_CHAT           = JET_SOCIAL_ROOT + '/chat/conversations/recover',
      JET_DISCARD_CHAT           = JET_SOCIAL_ROOT + '/chat/conversations/dont-recover',
      JET_CHAT_WINDOW_URL        = '/mosspui/src/social/chat/chatWindow.html',
      JET_CHAT_WINDOW_NAME       = 'MOS Chat - Support Portal',
      JET_USE_JET_CHAT_SITEPARAM = 'fwk-ui.UseJetChatWindow';

  me.config.USE_JET = false;
  me.openNotificationObj = undefined; //19.1LGH
    
  /**
   * Default config.ROOT_CONTEXT to application context path if it wasn't set already.
   */
  me.init = function() {
  
    if (!me.config.ROOT_CONTEXT) {
      var pathArray = window.location.pathname.split('/');
      if (pathArray.length > 1) {
        me.config.ROOT_CONTEXT = "/" + pathArray[1] + "/";
      }
    }
    if (me.MODULE_LOADED_FROM_ISP) {
      // switch to jet in ISP if it is enabled
      me.switchToJetInISP();
    } else {
      if (me.config.USE_JET) {
        me.initializeJet();
      }
    }
  }

  /**
   * Returns API context.
   */
  me.getJetContext = function () {
    var rootContext = me.config.ROOT_CONTEXT.replace(/(\/?)epmos(\/?)/, ''); // for compatibility
    if (rootContext.length === 0) {
      rootContext = window.location.protocol + "//" + window.location.host;
    }
    return rootContext;
  }
  
  /**
   * Switch to JET chat window.
   */
  me.switchToJet = function () {
    me.config.USE_JET = true;
    me.initializeJet();
  }
  
  /**
   * Switch to ADF chat window.
   */
  me.switchToAdf = function () {
    me.config.USE_JET = false;
  }
  
  /**
   * Returns true if JET chat window is used.
   */
  me.isJet = function () {
    return me.config.USE_JET === true;
  }
  
  /**
   * Initialize chat services for JET chat window.
   */
  me.initializeJet = function () {
    var isAsync = me.config.CROSS_DOMAIN && me.config.isFirefox ? true : false;

    jQuery.ajax( {
        type: 'GET',
        dataType: 'json',
        async: isAsync,
        url : me.getJetContext() + JET_API_INIT,
        crossDomain: me.config.CROSS_DOMAIN,
        xhrFields: {
          withCredentials: me.config.CROSS_DOMAIN
        },
        error: function(error) {
          if (error.status !== 204) { // JET API returns 204 on successful PUT
            me.log('Error initializing JET REST API: ' + error.status)
          }
        }
    });
  }
  
  /**
   * Switch to JET in ISP by checking also the siteparam
   */
  me.switchToJetInISP = function() {
    // Check if JET based Chat is enabled with an ajax request
    jQuery.ajax( {
      type: 'GET',
      dataType: 'json',
      async: true,
      url : me.getJetContext() + JET_SITEPARAMS,
      crossDomain: me.config.CROSS_DOMAIN,
      xhrFields: {
        withCredentials: me.config.CROSS_DOMAIN
      },
      success: function(data) {
        var siteparams = data.data.entry,
            i, keyValuePair;
        for (i = 0; i < siteparams.length; i++) {
          keyValuePair = siteparams[i];
          if (keyValuePair.key === JET_USE_JET_CHAT_SITEPARAM &&
              keyValuePair.value === 'true') {
            me.switchToJet();
          }
        }
      }
    });
  }
  
  /**
   * Small logging utility to guard against window.console not being available.
   */
  me.log = function (message) {
    if (window.console) {
      console.log(message);
    }
  }

  /**
   * Returns chat window URL according to config.CHAT_WINDOW_TYPE.
   */
  me.getChatWindowUrl = function () {
    if (me.config.USE_JET) {
      return me.getJetContext() + JET_CHAT_WINDOW_URL;
    } else {
      return me.config.ROOT_CONTEXT + ADF_CHAT_WINDOW_URL;
    }    
  }
  
  /**
   * Returns respond to invitation API URL accoding to config.CHAT_WINDOW_TYPE.
   */
  me.getRespondToInvitationApiUrl = function (conversationId) {
    if (me.config.USE_JET) {
      return me.getRespondToInvitationApiUrlForJet(conversationId);
    } else {
      return me.getRespondToInvitationApiUrlForAdf();
    }
  }  
  
  /**
   * Respond to invite for JET chat window.
   */
  me.getRespondToInvitationApiUrlForJet = function (conversationId) {
    return me.getJetContext() + JET_RESPOND_TO_INVITE.replace('{0}', conversationId);
  }
  
  /**
   * Respond to invite for ADF chat window.
   */
  me.getRespondToInvitationApiUrlForAdf = function () {
    return me.config.ROOT_CONTEXT + 'rest/mos/chat/1.0/respond-to-invitation.jsp';    
  }

  /**
   * Returns recover chat window API URL according to config.CHAT_WINDOW_TYPE.
   */
  me.getRecoverChatWindowApiUrl = function (recoverResponse) {
    if (me.config.USE_JET) {
      return me.getRecoverChatWindowApiUrlForJet(recoverResponse);
    }
    return me.getRecoverChatWindowApiUrlForAdf();
  }

  /**
   * Returns the JET API for recovering chat window.
   */
  me.getRecoverChatWindowApiUrlForJet = function (recoverResponse) {
    return me.getJetContext() + (recoverResponse ? JET_RECOVER_CHAT : JET_DISCARD_CHAT);
  }

  /**
   * Returns the Adf API for recovering chat window.
   */
  me.getRecoverChatWindowApiUrlForAdf = function () {
    return me.config.ROOT_CONTEXT  + 'rest/mos/chat/1.0/recover-conversations.jsp';
  }
  
  /**
   * Returns contentType for jQuery.ajax POST/PUT calls according to config.CHAT_WINDOW_TYPE.
   */
  me.getContentType = function () {
    if (me.config.USE_JET) {
      // this can not be application/json because the browser will do a preflight in cross domain
      return 'text/plain; charset=UTF-8';
    }
    return 'application/x-www-form-urlencoded; charset=UTF-8';
  }

  /**
   * Pack data to POST or PUT to API according to config.CHAT_WINDOW_TYPE.
   */
  me.packData = function (jsonData) {
    if (me.config.USE_JET) {
      return JSON.stringify(jsonData);
    }
    return jsonData;
  }

  /**
   * Opens the chat window according to config.CHAT_WINDOW_TYPE.
   * 
   * @return {Window} chat window handle or null if the chat window cannot be opened because of the pop-up blocker.
   */
  me.openChatWindow = function () {
      var chatWindowName,
          chatWindowLocation = me.getChatWindowLocation();
          
      if (me.config.USE_JET) {
        chatWindowName = JET_CHAT_WINDOW_NAME;
      } else {
        // ADF
        if (me.config.CROSS_DOMAIN && !me.config.isFirefox) {
          me.getChatWindowNameForCrossDomain();
        }
        chatWindowName = COOKIES.getCookieValue(COOKIES.CHAT_WND_NAME);
        if (!chatWindowName) {
          chatWindowName = ADF_DEFAULT_CHAT_WINDOW_NAME;
          COOKIES.setCookieValue(COOKIES.CHAT_WND_NAME, chatWindowName);
        }
      }
      
      var chatWindow = window.open('', chatWindowName, 'width=650,height=650,location=0,status=0,resizable=1,left=' + chatWindowLocation.left + ',top=' + chatWindowLocation.top);
      if (!chatWindow) {
        alert(me.config.messageForPopupBlockerEnabled);
        return null;
      }
      
      me.moveWindow(chatWindow, chatWindowLocation);
      
      if (!me.config.USE_JET) {
        me.displayLoadingIndicator(chatWindow);                
      }
      
      chatWindow.focus();
      
      return chatWindow;
  }

  /**
   * Display the unread notification count in the document title.
   */
  me.showUnreadNotificationCount = function() {
    var notificationCount = me.countActiveNotifications();
    if (notificationCount == 0) {
      document.title = me.originalDocTitle;
    } else {
      var messagesText = notificationCount == 1 ? me.config.unreadMessage : me.config.unreadMessages;
      document.title = "(" + notificationCount + " " + messagesText + ") " + me.originalDocTitle;
    }
  }
  
  /**
   * Function to parse a String into JSON Object
   * 
   * @param json String containing json data
   */
  me.parseJSON = function(json) { 
    if (typeof JSON != 'undefined' && typeof JSON.parse === 'function') {
      return JSON.parse(json); 
    } else {
      return eval('(' + json + ')'); 
    }
  }

  // array of active notification elements
  me.activeNotifications = [];
  
  /**
   * Function that counts active notifications
   */
  me.countActiveNotifications = function() {
    var name, count = 0;
    for (name in me.activeNotifications) {
      if (me.activeNotifications.hasOwnProperty(name)) {
        count++;
      }
    }
    return count;
  }
  
  /**
   * Function that handles the event of receving invitations
   * 
   * @param invitations Array containing invitations as JSON Objects
   */
  me.onChatInvitations = function (invitations) {
    var length = invitations.length;
    me.withdrawInvitationsNoLongerValid(invitations); 
    for (var i = 0; i < length; i++) {
      var invitation = invitations[i];
      if (invitation.invite) {
        if (!(invitation.conversation in me.activeNotifications)) {
          me.displayInvitation(invitation);          
        }
      } else {
        me.withdrawInvitation(invitation.conversation);
      }
    }
    if (length > 1) {
      registerCloseAllEvent();
    }
  }
  
  /**
   * Function that handles the notifications related to the recovery of the chat sessions after a browser/system crash
   */
  me.onRecoverNotification = function () {
    var chatWndName = COOKIES.getCookieValue(COOKIES.CHAT_WND_NAME);
    
    if (chatWndName || recoverNotificationIsAlreadyDisplayed) { //chat window is not open
      return;
    }
    
    me.displayRecoverNotification();          
  }

  /**
   * Show a notification to allow user to recover or discard active chats.
   * The notification is displayed only once per session at login 
   * if there are active chats and the chat window is not opened.
   */
  me.displayRecoverNotification = function() {
  
    recoverNotificationIsAlreadyDisplayed = true;
  
    if (me.config.isScreenReaderMode) {
      if (confirm(me.config.recoverNotificationAsPlainText)) {
        me.respondToRecoverNotification(true);
      } else {
        me.respondToRecoverNotification(false);
      }
    } else {      
      $.jGrowl.defaults.closeTemplate = "";
      $.jGrowl(me.config.recoverNotificationAsHtmlElement, 
      {
        header : me.config.invitationHeaderForHtmlElement, 
        closeDuration: 100,
        sticky: true,
        beforeOpen : function (notificationWindow, m, o) {
          $(notificationWindow).width("500px");
        },
        afterOpen : function (notificationWindow, m, o) { 
          $(notificationWindow).find("#acceptRecoverNotification").click(function () {
            me.respondToRecoverNotification(true, notificationWindow);
          });
          $(notificationWindow).find("#declineRecoverNotification").click(function () {
            me.respondToRecoverNotification(false, notificationWindow);
          });
          $(notificationWindow).children("div.jGrowl-close").click(function () {
            me.respondToRecoverNotification(false, notificationWindow);
          });
        }
      });
      
    }
  }

  /**
   * Recover chat window.
   */
  me.respondToRecoverNotification = function(recoverResponse, notificationWindow) {

    recoverNotificationIsAlreadyDisplayed = false;
    
    if(!me.config.isScreenReaderMode)
      $(notificationWindow).hide();
    
    var isAsync = me.config.CROSS_DOMAIN && me.config.isFirefox ? true : false;

    var onError = function() {
      alert(me.config.genericError);
    }
    
    var url  = me.getRecoverChatWindowApiUrl(recoverResponse),
        type = me.config.USE_JET ? 'PUT' : 'POST',
        data = me.packData({recover: recoverResponse});
    
    jQuery.ajax({
        type: type,
        dataType: 'json',
        async: isAsync,
        url : url,
        crossDomain: me.config.CROSS_DOMAIN,
        xhrFields: {
          withCredentials: me.config.CROSS_DOMAIN
        },
        data: data,
        complete: function() {
          if(!me.config.isScreenReaderMode)
            $(notificationWindow).trigger('jGrowl.close');
        },
        error: function(error) {
          if (error.status !== 204) { // JET API returns 204 on successful PUT
            onError();            
          }
        },
        success : function (jsonResult) {
          if (!jsonResult || !jsonResult.success) {
            onError();
          }
        }
    });

    if (recoverResponse) {
      var chatWindow = me.openChatWindow();
      
      if (!chatWindow) return;
      
      if (me.isAboutBlankChatWindow(chatWindow)) {
        chatWindow.location = me.getChatWindowUrl();
      } else {
        me.reloadWindow(chatWindow);
      }
      
      chatWindow.focus();
    }
  }
  
  me.moveWindow = function(chatWindow, windowLocation) {
    if (me.config.CROSS_DOMAIN && !me.config.USE_JET) {
      try {
        chatWindow.postMessage('({"cmd": "moveTo", "left":' + windowLocation.left + ', "top":' + windowLocation.top + '})', '*');
      } catch (exception) {
        me.log("Cannot postMesage: moveTo");
      }
    } else {      
      try {
        if (me.config.isFirefox)
            chatWindow.moveTo(0, 0);
        else
            chatWindow.moveTo(windowLocation.left, windowLocation.top);
      } catch (e) {
        // Firefox does not support moving a window from another window
        me.log('Cannot move the chat window to saved location');
      }
    }
  }
  
  me.reloadWindow = function(chatWindow) {
    if (me.config.CROSS_DOMAIN || me.config.USE_JET) {
      try {
        chatWindow.postMessage('({"cmd": "reload"})', '*');
      } catch (e) {
        me.log("Cannot postMesage: reload");
      }
    } else {
      chatWindow.ignorePageUnload = true;
      chatWindow.location.reload();
    }
  }
  
  /**
   * Function used to silently withdraw all invitation 
   * that are no longer valid without any alert message
   * 
   * @param invitations Array of json chat invitations still valid on the server
   */
  me.withdrawInvitationsNoLongerValid = function (invitations) {
    if (invitations && invitations.length > 0) {
      var length = invitations.length;
      for (var conversation in me.activeNotifications) {
        if (me.activeNotifications.hasOwnProperty(conversation)) {
          var withdrawThisInvitation = true;
          for (var i = 0; i < length; i++) {
            var invitation = invitations[i];
            if (conversation == invitation.conversation) {
              withdrawThisInvitation = false;
              break;
            }
          }
          // withdraw this invitation if it was not found in specified array
          if (withdrawThisInvitation) {
            me.withdrawInvitation(conversation);
          }          
        }
      }
    } else {
      // if no arguments were specified than withdraw all invitations displayed
      me.withdrawAllInvitations();
    }
  }
  
  /**
   * Function that gets the timerTicks available for invitation timestamp
   * 
   * @param utcTimestamp Invitation timestamp
   */
  me.getTimerTicks = function(utcTimestamp) {
    var invitationDate = new Date(utcTimestamp);
    var nowDate = new Date();
    var timeWhileInvitationIsAvailable = nowDate.getTime() - invitationDate.getTime();
    
    // ticking once per second => max 10 minutes
    var maxDisplayTimeForInvitation = MAX_DISPLAY_TIME;
    var timerTicks = maxDisplayTimeForInvitation - Math.floor(timeWhileInvitationIsAvailable/1000);
    
    if (timerTicks < 0) {
      timerTicks =  0;
    } else if (timerTicks > MAX_DISPLAY_TIME) {
      // ensure that the timerTicks value
      // is 10 minutes max
      timerTicks = MAX_DISPLAY_TIME;
    }
    
    return timerTicks;
  }
  
  /**
   * This replaces:
   * {0} with support engineer
   * {1} with sr number
   * {2} with summary
   * 
   * @param message The message to be searched for {0}, {1} and {2}
   * @param invitation Invitation containing the invormation to be replaced with:
   *                   supportEngineer, srNumber, summary
   */
  var completeWithInvitationDetails = function(message, invitation) {
    var messageReturned = message.replace("{0}", invitation.suppEng);
    messageReturned = messageReturned.split("{1}").join(invitation.sr);
    messageReturned = messageReturned.replace("{2}", invitation.summary);
    
    return messageReturned;
  }
  
  /**
   * Function used to display a invitation
   * 
   * @param invitation The invitation to be displayed
   */
  me.displayInvitation = function(invitation) {
    if (me.config.CROSS_DOMAIN && me.config.isFirefox) {
      me.getChatWindowNameForCrossDomain();
    }  
    if (me.config.isScreenReaderMode) {
      var msg = completeWithInvitationDetails(me.config.invitationAsPlainText, invitation);
      if (confirm(msg)) {
        me.respondToInvitation(invitation, "ACCEPTED");
      } else {
        me.respondToInvitation(invitation, "REJECTED");
      }
    } else {      
      var timerHandler = null;
      var msg = completeWithInvitationDetails(me.config.invitationAsHtmlElement, invitation);

      $.jGrowl.defaults.closeTemplate = "";
      $.jGrowl(msg, 
      {
        header : me.config.invitationHeaderForHtmlElement, 
        closeDuration: 100,
        sticky: true,
        beforeOpen : function (notificationWindow, m, o) {
          notificationWindow.supportEngineer = invitation.suppEng;
          notificationWindow.SR = invitation.sr;          
          me.activeNotifications[invitation.conversation] = notificationWindow;
          $(notificationWindow).width("500px");
                    
          var tick = function() {
            var timerTicks = me.getTimerTicks(invitation.timestamp);
            $(notificationWindow).find(".chatInvitationCountDown").html(Math.ceil(timerTicks/60));
            if (timerTicks == 0) {
              me.respondToInvitation(invitation, "EXPIRED", notificationWindow);
            } else {
              me.updateInvitationMargin();
              timerHandler = setTimeout(tick, 1000);
            }
          };
          tick();
        },
        afterOpen : function (notificationWindow, m, o) { 
          $(notificationWindow).addClass('unselectable');
          var notificationHeader = $(notificationWindow).children('.jGrowl-header');
          $(notificationWindow).css('margin-right', "0px");
          $(notificationWindow).css('margin-top', "0px");
          notificationHeader.css('cursor', 'move');
          notificationHeader.mousedown( function(e) {
            e.stopPropagation();
            INVITATION.moveInvitation = true;
            if (typeof(me.currentMousePosition) === 'undefined') {
              INVITATION.currentMousePosition = {};
            }
            INVITATION.currentMousePosition.x = e.pageX;
            INVITATION.currentMousePosition.y = e.pageY;
          });
          notificationHeader.mouseout( function(e) {
            e.stopPropagation();
            if (INVITATION.moveInvitation) {
              INVITATION.dragInvitation(e);
            }
          });
          notificationHeader.mouseup( function(e) {
            e.stopPropagation();
            INVITATION.moveInvitation = false;
            // store top & right margins and also width and height of the window
            // in cookie and use the next time an invitation is displayed
            var marginRight = INVITATION.getActualMargin('right');
            var marginTop = INVITATION.getActualMargin('top');
            INVITATION.storeInvitationLocationInCookie(marginRight, marginTop, $(window).width(), $(window).height());
          });
          
          $(notificationWindow).find("#acceptInvitation").click(function () {
            me.respondToInvitation(invitation, "ACCEPTED", notificationWindow);
          });
          
          if (invitation.inviteFromCustomer) {
            var closeAll = $('.jGrowl-closer');
            if (closeAll) {
              closeAll.css('display', 'none');
            }
            $(notificationWindow).find(".jGrowl-close").css('display', 'none');
            $(notificationWindow).find("#declineInvitation").click(function () {
              var declineReasonElement = '<div id="inputDeclineReasonToChat">'
                                        + '<textarea id="declineReasonToChat">' + me.config.declineMessage + '</textarea>'
                                        + '<button id="declineInvitationWithReason">' + me.config.declineMessageSubmit + '</button>'
                                        + '</div>';
              $(declineReasonElement).insertBefore( $(notificationWindow).find("#commandButtonBar") );
              $(notificationWindow).find("#declineReasonToChat").focus(function() { 
                if ($(this).val() === me.config.declineMessage) { 
                  $(this).css('color', 'black');
                  $(this).val('');
                } 
              });
              $(notificationWindow).find("#declineReasonToChat").blur(function() {
                if ($(this).val() === '' || $(this).val() === me.config.declineMessage) { 
                  $(this).css('color', 'gray');
                  $(this).val(me.config.declineMessage);
                } else {
                  $(this).css('color', 'black');
                }
              });
              $(notificationWindow).find("#commandButtonBar").css('display', 'none');
              $(notificationWindow).find("#declineInvitationWithReason").click(function () {
                var textareaDeclineReaon = $(notificationWindow).find("#declineReasonToChat");
                var currentDeclineReasonMessage = $(textareaDeclineReaon).val();
                if ($.trim(currentDeclineReasonMessage) && 
                    currentDeclineReasonMessage !== me.config.declineMessage) {
                  me.respondToInvitation(invitation, "REJECTED", notificationWindow);
                } else {
                  $(textareaDeclineReaon).val(me.config.declineMessage);
                }
              });
            });
          } else {
            $(notificationWindow).find("#declineInvitation").click(function () {
              me.respondToInvitation(invitation, "REJECTED", notificationWindow);
            });
          }
          $(notificationWindow).children("div.jGrowl-close").click(function () {
            me.respondToInvitation(invitation, "REJECTED", notificationWindow);
          });
          me.showUnreadNotificationCount();
          me.showDesktopNotificationsForUnreadInvitations();
        },
        close : function () {
          delete INVITATION.activeNotifications[invitation.conversation];
          if (timerHandler != null) { 
            clearTimeout(timerHandler);
            timerHandler = null;
          }
          me.showUnreadNotificationCount();
        }
      });
    }
  }
  
  me.storeInvitationLocationInCookie = function(marginRight, marginTop, windowWidth, windowHeight) {
    var uiConfig = '({"marginRight":' + marginRight + ', "marginTop":' + marginTop + ', "windowWidth":' + windowWidth + ', "windowHeight":' + windowHeight + '})';
    COOKIES.setCookieValue(COOKIES.CHAT_UI_CONFIG, uiConfig);
  }
  
  me.getFirstTopMostNotification = function()  {
    for (var conversation in me.activeNotifications) {
      if (me.activeNotifications.hasOwnProperty(conversation)) {
        var notification = me.activeNotifications[conversation];
        return notification;
      }
    }
  }
  
  me.getActualMargin = function(margin) {
    if (margin && (margin == 'top' || margin == 'right')) {
      var actualMargin = $('#jGrowl').css(margin);
      if (actualMargin && actualMargin.indexOf("px") != -1) {
        actualMargin = actualMargin.substring(0, actualMargin.length-2);
      }
      actualMargin = new Number(actualMargin);
      return actualMargin;
    }
    return 0;
  }
  
  me.setInvitationMarginTop = function(value) {
    var actualHeight = $(window).height();
    var firstTopMostNotification = me.getFirstTopMostNotification();
    var notificationHeight = me.getActualSize(firstTopMostNotification, 'height');
    if (actualHeight - value < notificationHeight) {
      value = actualHeight - notificationHeight;
    } else if (value < 0) {
      value = 0;
    }
    $('#jGrowl').css('top', value + 'px');
  }
  
  me.setInvitationMarginRight = function(value) {
    var actualWidth = $(window).width();
    var firstTopMostNotification = me.getFirstTopMostNotification();
    var notificationWidth = me.getActualSize(firstTopMostNotification, 'width');
    if (actualWidth - value < notificationWidth) {
      value = actualWidth - notificationWidth;
    } else if (value < 0) {
      value = 0;
    }
    $('#jGrowl').css('right', value + 'px');
  }
  
  /**
   * Returns the actual size of the specified notification by checking the given attribute
   * 
   * @param notification Notification element to check for property
   * @param widthOrHeight The attribute to get
   *                      'width' or 'height'
   */
  me.getActualSize = function(notification, widthOrHeight) {
    if (widthOrHeight && (widthOrHeight == 'width' || widthOrHeight == 'height')) {
      var notificationWidth ;
      try{  
        notificationWidth = $(notification).css(widthOrHeight);
      }catch(ex){
        console.log("Exception encountered in me.getActualSize:\n" + ex);
      }
      if (notificationWidth && notificationWidth.indexOf('px') != -1) {
        notificationWidth = notificationWidth.substring(0, notificationWidth.length-2);
      }
      notificationWidth = new Number(notificationWidth);
      return notificationWidth;
    }
    return 0;
  }
  
  me.updateInvitationMargin = function() {
    me.updateMarginRight();
    me.updateMarginTop();
  }
  
  me.updateMarginRight = function() {
    if (!me.moveInvitation) {
      var uiConfig = COOKIES.getCookieValue(COOKIES.CHAT_UI_CONFIG);
      if (uiConfig) {
        uiConfig = eval(uiConfig);
        var cookieMarginRight = uiConfig.marginRight;
        var cookieWindowWidth = uiConfig.windowWidth;
        var actualMarginRight = me.getActualMargin('right');
        var actualWidth = $(window).width();
        
        if (cookieWindowWidth != actualWidth || cookieMarginRight != actualMarginRight) {
          if (cookieMarginRight) {
            // calculate percentage
            var widthPercent = actualWidth / cookieWindowWidth;
            var rightMarginValue = cookieMarginRight * widthPercent;
            me.setInvitationMarginRight(rightMarginValue);
          }
        }
      }
    }
  }
  
  me.updateMarginTop = function() {
    if (!me.moveInvitation) {
      var uiConfig = COOKIES.getCookieValue(COOKIES.CHAT_UI_CONFIG);
      if (uiConfig) {
        uiConfig = eval(uiConfig);
        var cookieMarginTop = uiConfig.marginTop;
        var cookieWindowHeight = uiConfig.windowHeight;
        var actualHeight = $(window).height();
        var actualMarginTop = me.getActualMargin('top');
        if (cookieWindowHeight != actualHeight || cookieMarginTop != actualMarginTop) {
          // only for the first one!
          if (cookieMarginTop) {
            // calculate percentage
            var heightPercent = actualHeight / cookieWindowHeight;
            var topMarginValue = cookieMarginTop * heightPercent;
            me.setInvitationMarginTop(topMarginValue);
          }
        }
      }
    }
  }

  me.showDesktopNotificationsForUnreadInvitations = function () {
    me.doShowDesktopNotificationsForUnreadInvitations();
    if (me.config.isFirefox) {
      for (var i = 1; i <= me.config.FIREFOX_NOTIFICATION_COUNT - 1; i++) {
        setTimeout(function () {
          INVITATION.doShowDesktopNotificationsForUnreadInvitations();
        }, i * me.config.FIREFOX_NOTIFICATION_INTERVAL);
      }
    }
  }  
  
  me.doShowDesktopNotificationsForUnreadInvitations = function () {
    if (typeof notify !== 'undefined') {
      if (notify.isSupported && 
          (notify.permissionLevel() === notify.PERMISSION_GRANTED)) {
        var notificationContent = "";
        for (var conversation in me.activeNotifications) {
          if (me.activeNotifications.hasOwnProperty(conversation)) {
            var notification = me.activeNotifications[conversation];
            notificationContent += notification.supportEngineer + ' ' + me.config.notificationTextAboutSR + ' ' + notification.SR + '\n';            
          }
        }
        if (notificationContent) {
         // check if an existing Notication is still open, if so then close it first. 
         // necessary to avoid issue in Chrome where the notification click event doesnt do whatis in the event handler
         if (me.openNotificationObj && me.openNotificationObj.close){
            me.openNotificationObj.close(); 
         }
         me.openNotificationObj = notify.createNotification(me.config.notificationTitleForInvitations, {
            body: notificationContent,
            icon: me.config.notificationIcon,
            autoCloseInterval: me.config.notificationAutoCloseInterval,
            tag: me.config.notificationTitleForInvitations
          });          
        }
      }
    }
  }
  
  /**
   * Registers the event containing the functionality of the [CloseAll] notifications button
   */
  var registerCloseAllEvent = function() {
    var closeAll = $('.jGrowl-closer');
    if (closeAll && !closeAll.hasClass('closeAllEvent')) {
      closeAll.addClass('closeAllEvent');
      closeAll.unbind('click');
      closeAll.bind( 'click', function(event) {
        event.preventDefault();
        INVITATION.closeAllTriggered = true;
        for (var conversation in INVITATION.activeNotifications) {
          if (INVITATION.activeNotifications.hasOwnProperty(conversation)) {
            var notification = INVITATION.activeNotifications[conversation];
            $(notification).children("div.jGrowl-close").click();            
          }
        }
        INVITATION.closeAllTriggered = false;
      });
    }
  }
  
  /**
   * Function used to withdraw an invitation silently without any alert message
   * 
   * @param conversation The conversation for which the invitation should be withdrawn
   */
  me.withdrawInvitation = function(conversation) {
    if (conversation in me.activeNotifications) {
      if (me.activeNotifications.hasOwnProperty(conversation)) {
        var notification = me.activeNotifications[conversation];
        $(notification).trigger('jGrowl.close');        
      }
    }
  }
  
  /**
   * Function used to withdraw all invitation silently without any alert message
   */
  me.withdrawAllInvitations = function() {
    for (var conversation in me.activeNotifications) {
      if (me.activeNotifications.hasOwnProperty(conversation)) {
        var notification = me.activeNotifications[conversation];
        $(notification).trigger('jGrowl.close');        
      }
    }
  }
  
  /**
   * Function that displays the loading indicator while chat is loading.
   * 
   * Used only for ADF based chat window.
   * 
   * @param browserWindow The window in which to display the loading indicator
   */
  me.displayLoadingIndicator = function(browserWindow) {
    try {
      if (me.isAboutBlankChatWindow(browserWindow)) {
        browserWindow.document.write('<img src="' + me.config.tabbedChatLoader + 
                                     '" style="position: absolute; left: 50%; top: 50%; width: 32px; height: 32px; margin: -16px 0 0 -16px;" />');
      }
    } catch (e) { ; }
  }
  
  /**
   * Function to test if the ChatWindow is loading and currently displaying 
   * an 'about:blank' page containing the loading indicator
   */
  me.isAboutBlankChatWindow = function(chatWindow) {
    if (me.config.CROSS_DOMAIN) {
      var chatWndName = COOKIES.getCookieValue(COOKIES.CHAT_WND_NAME);
      return chatWndName && chatWndName === ADF_DEFAULT_CHAT_WINDOW_NAME;
    } else {
      return !chatWindow.document.title;
    }
  }
  
  /**
   * Returns the position where the ChatWindow should be located on the screen
   */
  me.getChatWindowLocation = function() {
    var windowPosition = {};
    windowPosition.top = 0;
    windowPosition.left = 0;
    var uiConfig = COOKIES.getCookieValue(COOKIES.CHAT_UI_CONFIG);
    var firstTopMostNotification = me.getFirstTopMostNotification();
    if (uiConfig) {
      uiConfig = eval(uiConfig);
      var cookieMarginTop = uiConfig.marginTop;
      var cookieMarginRight = uiConfig.marginRight;
      windowPosition.left = window.screenX + ($(document).width() - cookieMarginRight - $(firstTopMostNotification).width());
      windowPosition.top = window.screenY + cookieMarginTop;
    } else {
      windowPosition.left = window.screenX + ($(document).width() - $(firstTopMostNotification).width());
      windowPosition.top = window.screenY;
    }
    return windowPosition;
  }
  
  /**
   * Test if the ChatWindow exists by verifying the value of the chat window name stored in cookie
   */
  me.isChatWindowAvailable = function() {
    var chatWndName = COOKIES.getCookieValue(COOKIES.CHAT_WND_NAME);
    if (chatWndName) {
      return true;
    }
    return false;
  }
  
  /**
   * Function used to respond to an invitation
   * 
   * @param invitation The invitation to be responded to
   * @param invitationResponse The invitationResponse to be sent
   * @param notificationWindow The notification element to be closed after the invitationResponse was processed
   */
  me.respondToInvitation = function(invitation, invitationResponse, notificationWindow) {
    // hide invitation only if the user is not using screan reader mode, otherwise, the invitation is just a confirm dialog
    if (!me.config.isScreenReaderMode) {
      $(notificationWindow).hide();
    }
    
    var showChatWindow          = invitationResponse === "ACCEPTED";
    var isExpired               = invitationResponse === "EXPIRED";
    var conversationIdentifier  = invitation.conversation;
    var isAsync                 = me.config.CROSS_DOMAIN && me.config.isFirefox ? true : false;
  
    var chatWindow = null;
    
    if (showChatWindow) {
      chatWindow = me.openChatWindow();
      if (!chatWindow) return;
    }
    
    /**
     * Error handling in POST and PUT request.
     * 
     * @param arguments Arguments object which contains an error message
     *                  If it's null then it uses the INVITATION.genericError message
     */
    var onError = function(arguments) {
      if (chatWindow && !chatWindow.document.title) { // about:blank
        chatWindow.close();
      }
      if (arguments && arguments.result && arguments.result.notAllowed) {
        alert(me.config.messageForAnInvitationActionAlreadyProcessed);
      } else {
        alert(me.config.genericError);
      }
    }
  
    /**
     * Open the chat window on ACCEPT invite.
     */
    var onSuccess = function (jsonResult) {
      if (jsonResult && jsonResult.success) {
        if (showChatWindow) {
          if (me.config.USE_JET) {
            // we can not decide whether the jet chat window is about:blank or loaded with jet chat
            // because the window.name is always the same and the document.title can not be accessed from crossdomain
            // we try to reload the chat window by accessing the ignorePageUnload property
            // if it fails then the window is loaded from a crossdomain and 
            // we will use the postMessage API to send a reload message to the jet chat window.
            try {
              // if the chat window is about:blank than this code won't fail and the chat will be loaded
              // otherwise will fail and use the postMessage API
              chatWindow.ignorePageUnload = true;
              chatWindow.location = me.getChatWindowUrl();  
            } catch (ex) {
              me.reloadWindow(chatWindow);
            }
          } else if (me.isAboutBlankChatWindow(chatWindow)) {
            chatWindow.location = me.getChatWindowUrl();
          } else {
            me.reloadWindow(chatWindow);
          }
          chatWindow.focus();
        }
      } else {
        if (!isExpired && !me.closeAllTriggered) {
          onError({ result: jsonResult });
        }
      }
    }      
    
    var jsonData;
    if (invitation.inviteFromCustomer && !isExpired) {
      var declineReasonMessage = $(notificationWindow).find("#declineReasonToChat").val();

      jsonData = { conversationIdentifier: conversationIdentifier, 
                   invitationResponse: invitationResponse,
                   srNumber: invitation.sr,
                   inviteFromCustomer: invitation.inviteFromCustomer,
                   declineReason: declineReasonMessage };
    } else {
      jsonData = { conversationIdentifier: conversationIdentifier, 
                   invitationResponse: invitationResponse,
                   srNumber: invitation.sr,
                   inviteFromCustomer: invitation.inviteFromCustomer };
    }

    var url         = me.getRespondToInvitationApiUrl(conversationIdentifier),
        contentType = me.getContentType(),
        data        = me.packData(jsonData);
    
    if (me.config.USE_JET) {
      var params = "?isInvitationFromCustomer=" + invitation.inviteFromCustomer + 
                   "&invitationResponse=" + invitationResponse + 
                   "&declineReason=" + (declineReasonMessage ? encodeURIComponent(declineReasonMessage) : "");
      jQuery.ajax({
        type: 'GET',
        dataType: 'json',
        contentType: 'text/plain; charset=utf-8',
        async: isAsync,
        url: url + params,
        crossDomain: me.config.CROSS_DOMAIN,
        xhrFields: {
          withCredentials: me.config.CROSS_DOMAIN
        },
        complete: function() {
          $(notificationWindow).trigger('jGrowl.close');
        },
        error: function(error) {
          if (error.status === 204) { // JET API returns 204 on successful PUT
            onSuccess({success: true});
          } else {
            onError();            
          }
        },
        success: function () {
          onSuccess({success: true});
        }
      });
    } else {
      jQuery.ajax({
        type: 'POST',
        dataType: 'json',
        contentType: contentType,
        async: isAsync,
        url: url,
        crossDomain: me.config.CROSS_DOMAIN,
        xhrFields: {
          withCredentials: me.config.CROSS_DOMAIN
        },
        data: data,
        complete: function() {
          $(notificationWindow).trigger('jGrowl.close');
        },
        error: function(error) {
          if (error.status === 204) { // JET API returns 204 on successful PUT
            onSuccess({success: true});
          } else {
            onError();            
          }
        },
        success : function (jsonResult) {
          onSuccess(jsonResult);
        }
      });
    }
      
      if (me.config.USE_JET) {
        // Discard the invite from Adf session
        jsonData.discardInvite = true;
        jQuery.ajax({
            type: 'POST',
            dataType: 'json',
            url: me.getRespondToInvitationApiUrlForAdf(),
            crossDomain: me.config.CROSS_DOMAIN,
            xhrFields: {
              withCredentials: me.config.CROSS_DOMAIN
            },
            data: jsonData,
            error: function() {
              me.log("Error discarding invitation for conversation " + conversationIdentifier);
            }
          });          
      }
  }
  
  /**
   * Used when current page and the chat window have different domains.
   */
  me.getChatWindowNameForCrossDomain = function() {
    var isAsync = me.config.isFirefox ? true : false;
    
    jQuery.ajax({
      type: 'GET',
      async: isAsync,
      dataType: 'json',
      url: me.config.ROOT_CONTEXT + 'rest/mos/chat/1.0/get-chat-window-name.jsp',
      crossDomain: true,
      xhrFields: {
        withCredentials: true
      },
      success: function (jsonResult){
        if (jsonResult && jsonResult.chatWindowName) {
          COOKIES.setCookieValue(COOKIES.CHAT_WND_NAME, jsonResult.chatWindowName);  
        }
      },
      error: function () {
        me.log('Unable to get chat window name');
      }
    });
  }
  
  /**
   * Calculates the position of the invitation when it is dragged
   */
  me.dragInvitation = function(e) {
    if (typeof(INVITATION.currentMousePosition) !== 'undefined') {
      var marginRight = INVITATION.currentMousePosition.x - e.pageX;
      var marginTop = INVITATION.currentMousePosition.y - e.pageY;
      
      var actualMarginTop = INVITATION.getActualMargin('top');
      var topMarginValue = actualMarginTop - marginTop;
      INVITATION.setInvitationMarginTop(topMarginValue);
      
      var actualMarginRight = INVITATION.getActualMargin('right');
      var rightMarginValue = actualMarginRight + marginRight;
      INVITATION.setInvitationMarginRight(rightMarginValue);
    } else {
      INVITATION.currentMousePosition = {};
    }
    INVITATION.currentMousePosition.x = e.pageX;
    INVITATION.currentMousePosition.y = e.pageY;
  }
  
  me.lastSize = { width: 0, height: 0 };
  
  me.enableDesktopNotifications = function() {
    var elementFound = $('#enableDesktopNotifications').length;
    if (!elementFound) {
      var enableDesktopNotificationsElementHeader = 'Enable Notifications from Oracle Support',
          enableDesktopNotificationsElement = '<div id="enableDesktopNotifications" > ' +
          '  <p>Oracle Support might want to chat with you about your open service requests. While you are signed into My Oracle Support, we can pop-up a message to let you know your engineer wants to chat. To allow these pop-up notifications, do two things: <br></p><ol><li>Click Enable Notifications below</li><li>When the browser offers a second prompt for you to allow/show notifications, click that button too.</li></ol>Once this is done, you will see a notification whenever Oracle Support attempts to contact you by chat while you are logged into My Oracle Support.</p> ' +
          '  <div id="commandButtonBarDesktopNotifications"> ' +
          '    <button id="rejectDesktopNotifications">Don\'t Enable</button> ' +
          '    <button id="learnMoreDesktopNotifications" onclick="window.open(\'http://www.oracle.com/pls/topic/lookup?ctx=mos_en&id=MOSHP1498\', \'_blank\'); return false;">Learn More</button> ' +
          '    <button id="acceptDesktopNotifications">Enable Notifications</button> ' +
          '  </div>' +
          '</div>',
          newChatImageUrl = "common/images/new_chat_invite.png";
      
      me.config.notificationIcon                = me.config.ROOT_CONTEXT ? me.config.ROOT_CONTEXT + newChatImageUrl : './' + newChatImageUrl;
      me.config.notificationAutoCloseInterval   = 20000;
      me.config.notificationTitleForInvitations = 'New Chat Invitation[s] from:';
      me.config.notificationTextAboutSR         = 'about SR';
      me.config.NOTIFICATIONS_COOKIE_NAME       = "mos.notifications";
      me.config.NOTIFICATIONS_COOKIE_EXPIRE     = 365 * 5;
      
      if (COOKIES.getCookieValue(me.config.NOTIFICATIONS_COOKIE_NAME)) {
        return;
      }
      if ((typeof notify !== 'undefined') && notify.isSupported) {
        if (notify.permissionLevel() === notify.PERMISSION_DEFAULT) {
          var rejected = true,
              elementToGetFocus = false ? '.jGrowl-header > h3' : '#acceptDesktopNotifications';
          $.jGrowl.defaults.closeTemplate = "";
          $.jGrowl(enableDesktopNotificationsElement, {
            theme: 'desktop-notifications',
            // make JAWS happy with an h3 element
            header : '<h3>' + enableDesktopNotificationsElementHeader + '</h3>', 
            closeDuration: 100,
            sticky: true,
            beforeOpen : function (notificationWindow, m, o) {
              $(notificationWindow).width("500px");
            },
            afterOpen: function (notificationWindow, m, o) { 
      
              $(notificationWindow).find("#acceptDesktopNotifications").click(function () {
                rejected = false;              
                $(notificationWindow).trigger('jGrowl.beforeClose');
                notify.requestPermission();
              });
              $(notificationWindow).find("#rejectDesktopNotifications").click(function () {
                $(notificationWindow).trigger('jGrowl.beforeClose');               
              });
              // hide close button
              $(notificationWindow).find('.jGrowl-close').hide();
              // focus on header if screen reader, otherwise on enable notifications button
              $(notificationWindow).find(elementToGetFocus).attr('tabindex', 0);
              $(notificationWindow).find(elementToGetFocus).focus();
            },
            close: function() {
              if (rejected) {
                COOKIES.setCookieValue(me.config.NOTIFICATIONS_COOKIE_NAME, false, me.config.NOTIFICATIONS_COOKIE_EXPIRE);
              }
            }
          });
        }
      }
    }
  };
  
  me.bindEvent = function(element, event, callback) {
    if (element.addEventListener) {
      element.addEventListener(event, callback, false);
    } else {
      element.attachEvent('on'+event, callback);
    }
  };
  
  me.checkBrowser = function() {
    var match = navigator.userAgent.match(IE_REGEX);
    return match ? { isIE: true, version: parseInt(match[1]) } : { isIE: false };
  };
  
  me.afterload = function() {
    // IE does not support Desktop Notifications
    if (!me.checkBrowser().isIE) {
      // have to do this workaround because window onload event is not triggered in iframe in Chrome
      // for this will use jquery's document ready event, which is triggered before some resources are loaded
      // with a setTimeout we checkif jgrowl was loaded and only then we can trigger 
      // the popup to show for enabling desktop notifications
      var jGrowlTimer = undefined;
      me.enableNotificationsWhenJGrowlIsLoaded = function() {
        if ($.jGrowl) {
          // show enable desktop notifications popup in ISP
          if (me.MODULE_LOADED_FROM_ISP) {
            me.enableDesktopNotifications();
          }
          if (jGrowlTimer) clearTimeout(jGrowlTimer);
        } else {
          jGrowlTimer = setTimeout(me.enableNotificationsWhenJGrowlIsLoaded, 1000);
        }
      };
      me.enableNotificationsWhenJGrowlIsLoaded();
    }
    me.bindEvent(window, 'mousemove', function(e) { 
      if (me.moveInvitation) {
        me.dragInvitation(e);
      }
    });
    
    me.lastSize.width = $(window).width();
    me.lastSize.height = $(window).height();
    me.bindEvent(window, 'resize', function() {
      var windowObject = $(window);
      var actualWidth = windowObject.width();
      var actualHeight = windowObject.height();
      var widthPercent = actualWidth / me.lastSize.width;
      var heightPercent = actualHeight / me.lastSize.height;
        
      var actualMarginTop = me.getActualMargin('top');
      var topMarginValue = actualMarginTop * heightPercent;
      me.setInvitationMarginTop(topMarginValue);
        
      var actualMarginRight = me.getActualMargin('right');
      var rightMarginValue = actualMarginRight * widthPercent;
      me.setInvitationMarginRight(rightMarginValue);
            
      me.lastSize.width = actualWidth;
      me.lastSize.height = actualHeight;
    });
    
    me.bindEvent(window, 'mouseout', function(e) {
      if (me.moveInvitation) {
        me.moveInvitation = false;
        var windowObject = $(window);
        var actualWidth = windowObject.width();
        var actualHeight = windowObject.height();
        var widthPercent = actualWidth / me.lastSize.width;
        var heightPercent = actualHeight / me.lastSize.height;
          
        var actualMarginRight = me.getActualMargin('right');
        var rightMarginValue = actualMarginRight * widthPercent;
          
        var actualMarginTop = me.getActualMargin('top');
        var topMarginValue = actualMarginTop * heightPercent;
          
        me.storeInvitationLocationInCookie(rightMarginValue, topMarginValue, $(window).width(), $(window).height());
      }
    });
    
    if (me.config.CROSS_DOMAIN) {
      me.bindEvent(window, "message", function(event) {
        if (event.data) {
          var messageData = eval(event.data);
          if (messageData.cmd === 'closeWindow') {
            COOKIES.setCookieValue(COOKIES.CHAT_WND_NAME, "");
          } else if (messageData.cmd === "storeWindowNameCookie") {
            COOKIES.setCookieValue(COOKIES.CHAT_WND_NAME, messageData.windowName);
          }
        }
      });
    }
  };
  
  $(document).ready(me.afterload);
  
  return me;
}($));
