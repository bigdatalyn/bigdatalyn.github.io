(function (win) {
    
  var PERMISSION_DEFAULT = "default",
      PERMISSION_GRANTED = "granted",
      PERMISSION_DENIED  = "denied",
      PERMISSION         = [PERMISSION_GRANTED, PERMISSION_DEFAULT, PERMISSION_DENIED],

      isSupported = (function () {
        try {
          return !!(win.Notification || 
                    win.webkitNotifications || 
                    navigator.mozNotification /* || Disable IE for now
                    (win.external && win.external.msIsSiteMode() !== undefined) */);
        } catch (e) {
            return false;
        }
      }());
        
  /**
   * Request permission from user to use the HTML5 Notifications API.
   * 
   * If the HTML 5 notifications API is not supported by current browser this method does nothing.
   */
  function requestPermission() {
    if (!isSupported) { return; }
    if (win.webkitNotifications && win.webkitNotifications.checkPermission) {
      win.webkitNotifications.requestPermission();
    } else if (win.Notification && win.Notification.requestPermission) {
      win.Notification.requestPermission();
    }
  }
  
  /**
   * Returns the current permission level for HTML 5 Notifications API.
   * 
   * @returns {String} one of PERMISSION values or {undefined} if the HTML 5 Notifications API is not supported by the current browser.
   */
  function permissionLevel() {
    var permission;
    if (!isSupported) { return; }
    if (win.Notification && win.Notification.permissionLevel) {
      permission = win.Notification.permissionLevel();
    } else if (win.webkitNotifications && win.webkitNotifications.checkPermission) {
        permission = PERMISSION[win.webkitNotifications.checkPermission()];
    } else if (navigator.mozNotification) {
        permission = PERMISSION_GRANTED;
    } else if (win.Notification && win.Notification.permission) {
        permission = win.Notification.permission;
    } else if (win.external && (win.external.msIsSiteMode() !== undefined)) {
        permission = win.external.msIsSiteMode() ? PERMISSION_GRANTED : PERMISSION_DEFAULT;
    }
    return permission;
  }
  
  /**
   * Creates a new notification.
   * 
   * @param title   {String} the notification title.
   * @param options {Object} the notification options (see HTML 5 Notifications API for available options).
   * 
   * @returns {Object} the notification or {undefined} if the HTML 5 Notifications API is not supported by the current browser.
   */
  function createNotification(title, options) {
    var notification;
    if (isSupported && (permissionLevel() === PERMISSION_GRANTED)) {
      notification = _notification(title, options);
    }
    if (options.autoCloseInterval && notification && !notification.isIE && notification.addEventListener) {
      notification.addEventListener("show", function () {
        win.setTimeout(function () {
            if (notification.close) {
              notification.close();
            }
        }, options.autoCloseInterval);
      });
      
      
       //LGH 19.1 MOS-73041 Toast pop up does not pop up the chat accept/chat window in Chrome
       notification.addEventListener("click", function () {
            win.focus();
            if (notification.close) {
                notification.close();
            }
       });     
    }
    return notification;
  }

  /**
   * Returns a notification {Object} according to browser's support of HTML 5 Notifications API.
   * 
   * @param title   {String} the notification title.
   * @param options {Object} the notification options (see HTML 5 Notifications API for available options).
   * @returns       {Object} the notification object.
   */
  function _notification(title, options) {
      var notification;
      if (win.Notification) {
        notification =  new win.Notification(title, {
          icon: options.icon,
          body: options.body || "",
          tag: options.tag || ""
        });
      } else if (win.webkitNotifications) {
          notification = win.webkitNotifications.createNotification(options.icon, title, options.body);
          notification.show();
      } else if (navigator.mozNotification) {
          notification = navigator.mozNotification.createNotification(title, options.body, options.icon);
          notification.show();
      } else if (win.external && win.external.msIsSiteMode()) {
          win.external.msSiteModeClearIconOverlay();
          win.external.msSiteModeSetIconOverlay(options.icon, title);
          win.external.msSiteModeActivate();
          notification = {"isIE": true};
      }
      return notification;
  }  
  
  // Wrap it all 

  win.notify = {
    PERMISSION_DEFAULT: PERMISSION_DEFAULT,
    PERMISSION_GRANTED: PERMISSION_GRANTED,
    PERMISSION_DENIED: PERMISSION_DENIED,
    isSupported: isSupported,
    createNotification: createNotification,
    permissionLevel: permissionLevel,
    requestPermission: requestPermission
  };

}(window));