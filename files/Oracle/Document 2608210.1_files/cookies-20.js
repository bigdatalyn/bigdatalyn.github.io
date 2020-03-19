function Cookies() {
  this.CHAT_WND_NAME = "mos.chatWndName";
  this.PRESENCE_COOKIE_NAME = 'mos.presence';
  this.CHAT_UI_CONFIG = 'mos.chatUiConfig';

  /**
   * Returns the value of a cookie
   * @param cName name of the cookie
   */
  this.getCookieValue = function (cName) {
    var cValue = document.cookie;
    var cStart = cValue.indexOf(' ' + cName + '=');
    if (cStart ==  - 1) {
      cStart = cValue.indexOf(cName + '=');
    }
    if (cStart ==  - 1) {
      cValue = null;
    }
    else {
      cStart = cValue.indexOf('=', cStart) + 1;
      var cEnd = cValue.indexOf(';', cStart);
      if (cEnd ==  - 1) {
        cEnd = cValue.length;
      }
      cValue = unescape(cValue.substring(cStart, cEnd));
    }
    return cValue;
  }

  /**
   * Writes a value into a cookie
   * @param cName cookie name
   * @param value
   * @param exdays days before cookie expiry. If null, cookie will be a session cookie.
   */
  this.setCookieValue = function (cName, value, exdays) {
    var cookieDomain = document.domain;
    var cookiePath = '/';
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var cValue = escape(value) + ((exdays == null) ? '' : '; expires=' + exdate.toUTCString()) + ';domain=' + cookieDomain + ';path=' + cookiePath;
    document.cookie = cName + '=' + cValue;
  }
}

COOKIES = new Cookies();