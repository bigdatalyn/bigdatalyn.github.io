function AdfUserInactivityTimeoutHelper(a){this.Init(a)}AdfObject.createSubclass(AdfUserInactivityTimeoutHelper);AdfUserInactivityTimeoutHelper.prototype.registerPollComponent=function(a){AdfAssert.assertObject(a);this._componentIDsArray.push(a.getClientId());if(a=a.getTimeout())if(this._maxComponentTimeoutInterval==null)this._maxComponentTimeoutInterval=a;else if(a>this._maxComponentTimeoutInterval)this._maxComponentTimeoutInterval=a};
AdfUserInactivityTimeoutHelper.prototype.unregisterPollComponent=function(a){AdfAssert.assertObject(a);a=a.getClientId();AdfCollections.removeArrayValue(this._componentIDsArray,a);this._globalTimeoutInterval=this._calculatePollingTimeoutInterval(this._defaultTimeoutInterval)};AdfUserInactivityTimeoutHelper.prototype.hasTimedOut=function(){return this._hasTimedOut};AdfUserInactivityTimeoutHelper.prototype.isTimeoutEnabled=function(){return this._globalTimeoutInterval!=-1};
AdfUserInactivityTimeoutHelper.prototype.initializeTimeout=function(a){AdfAssert.assertNumberOrNull(a);this._defaultTimeoutInterval=a;var b=this._globalTimeoutInterval;this._globalTimeoutInterval=this._maxComponentTimeoutInterval?this._maxComponentTimeoutInterval:a;this._globalTimeoutInterval!=b&&this._rescheduleOrScheduleTimerIfNeeded()};AdfUserInactivityTimeoutHelper.InitClass=function(){};
AdfUserInactivityTimeoutHelper.prototype.Init=function(){AdfUserInactivityTimeoutHelper.superclass.Init.call(this);this._componentIDsArray=[];this._defaultTimeoutInterval=null;this._globalTimeoutInterval=-1;this._maxComponentTimeoutInterval=null;this._hasTimedOut=!1};
AdfUserInactivityTimeoutHelper.prototype._calculatePollingTimeoutInterval=function(a){var b=this._componentIDsArray,c=AdfPage.PAGE;this._maxComponentTimeoutInterval=null;for(var d=0;d<b.length;d++){var e=c.findComponent(b[d]);if(e&&(e=e.getTimeout()))if(this._maxComponentTimeoutInterval==null)this._maxComponentTimeoutInterval=e;else if(e>this._maxComponentTimeoutInterval)this._maxComponentTimeoutInterval=e}if(this._maxComponentTimeoutInterval!=null)a=this._maxComponentTimeoutInterval;return a};
AdfUserInactivityTimeoutHelper.prototype._forceComponentStop=function(){this._hasTimedOut=!0;this._forcePollingComponentStop();this._forceADSStop();var a=AdfPage.PAGE;if(this._timeoutTimer!=null)a.cancelTimer(this._timeoutTimer),this._timeoutTimer=null};AdfUserInactivityTimeoutHelper.prototype._forcePollingComponentStop=function(){var a=AdfPage.PAGE;a.getComponentIdsUpdatedByPollEvent()!=null&&a.scheduleTimer(this,this._applyPollTimeoutStyle,null,500)};
AdfUserInactivityTimeoutHelper.prototype._forceADSStop=function(){var a=AdfPage.PAGE;if(a.isActiveDataSupported()&&(a.__stopADS(),a=a.__getSessionTimeoutHelper()))a.__cancelSessionTimeoutTimer(),a.__startSessionTimeoutTimer()};
AdfUserInactivityTimeoutHelper.prototype._applyPollTimeoutStyle=function(){for(var a=AdfPage.PAGE.getComponentIdsUpdatedByPollEvent(),b=[],c=AdfAgent.AGENT,d=0;d<a.length;d++){var e=c.getElementById(a[d]);if(e){AdfDomUtils.addCSSClassName(e,"p_AFNoUpdate");var f=this._createPollingTimeoutLayerElement(e);b.push(f);CSCOCall_insertBefore(e.parentNode,"insertBefore",f,e)}}this._timeoutLayers=b};
AdfUserInactivityTimeoutHelper.prototype._createPollingTimeoutLayerElement=function(a){AdfAssert.assertDomElement(a);var b=AdfAgent.AGENT,c=CSCOCall_createElement(AdfPage.PAGE.getDomDocument(),"createElement","div");c.className="p_AFNoUpdateBadge";var d=c.style,e=AdfDomUtils.getRelativePosition(a);d.top=e.y+"px";d.left=e.x+"px";d.width=a.offsetWidth+"px";d.height=a.offsetHeight+"px";d.position="absolute";d.visibility="visible";a=b.getComputedStyle(a);d.zIndex=a.zIndex=="auto"?1:a.zIndex+1;return c};
AdfUserInactivityTimeoutHelper.prototype._removePollingTimeoutLayer=function(){var a=AdfPage.PAGE.getComponentIdsUpdatedByPollEvent(),b=this._timeoutLayers;if(b&&b.length){for(var c=0;c<b.length;c++){var d=b.pop();CSCOCall_removeChild(d.parentNode,"removeChild",d)}b=AdfAgent.AGENT;for(c=0;c<a.length;c++)d=b.getElementById(a.pop()),AdfDomUtils.removeCSSClassName(d,"p_AFNoUpdate")}};
AdfUserInactivityTimeoutHelper.prototype.__resetTimeoutHandler=function(a){if(!(this._globalTimeoutInterval==-1||a.type=="mouseover"||a.type=="mouseout"||a.type=="blur"||a.type=="focus"))if((a=AdfPage.PAGE.__getSessionTimeoutHelper())&&a.getTimeoutWarningWindowState()==AdfSessionTimeoutHelper.TimeoutWarningWindowStates.NONE)this._removePollingTimeoutLayer(),this._rescheduleOrScheduleTimerIfNeeded()};
AdfUserInactivityTimeoutHelper.prototype._rescheduleOrScheduleTimerIfNeeded=function(){var a=AdfPage.PAGE;if(a.isActiveDataSupported()){var b=a.__getSessionTimeoutHelper();b&&b.__cancelSessionTimeoutTimer()}this._timeoutTimer!=null&&a.cancelTimer(this._timeoutTimer);this._timeoutTimer=null;if(this._globalTimeoutInterval&&this._globalTimeoutInterval!=-1)this._timeoutTimer=a.scheduleTimer(this,this._forceComponentStop,null,this._globalTimeoutInterval);this._hasTimedOut=!1};