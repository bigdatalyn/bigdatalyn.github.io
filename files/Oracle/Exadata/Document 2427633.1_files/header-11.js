AdfUIComponents.createComponentClass("AdfRichPanelHeader",{componentType:"oracle.adf.RichPanelHeader",propertyKeys:[{name:"inlineStyle",type:"String"},{name:"styleClass",type:"String"},{name:"shortDesc",type:"String"},{name:"unsecure",type:"Object",secured:!0},{name:"visible",type:"Boolean","default":!0},{name:"helpTopicId",type:"String"},{name:"text",type:"String"},{name:"icon",type:"String"},{name:"type",type:"String","default":"default"},{name:"contentStyle",type:"String"},{name:"helpType",type:"String",
"default":"inline"},{name:"messageType",type:"String","default":"none"},{name:"size",type:"Number","default":-1},{name:"headerLevel",type:"Number","default":-1}],superclass:AdfUIPanel});
AdfRichUIPeer.createPeerClass(AdfRichUIPeer,"AdfDhtmlPanelHeaderPeer",!1);AdfDhtmlPanelHeaderPeer.InitSubclass=function(){AdfRichUIPeer.addComponentEventHandlers(this,AdfUIInputEvent.CLICK_EVENT_TYPE,AdfDialogEvent.EVENT_TYPE);this._DYNAMIC_HELP_POPUP="_afrHlpPop";this._DYNAMIC_HELP_DIALOG="_afrHlpCnt";this._TITLE_TEXT_SUBID="_afrTtxt";this._STRETCH_CELL_SUBID="_afrStr";this._ELLIPSIS_SUBID="_afrEps";this._MINIMUM_TITLE_TEXT_WIDTH=0};
AdfDhtmlPanelHeaderPeer.prototype.Init=function(a){AdfDhtmlPanelHeaderPeer.superclass.Init.call(this,a);this._stretchedOnLastResize=!0};AdfDhtmlPanelHeaderPeer.prototype.needsResizeNotify=function(){return!0};AdfDhtmlPanelHeaderPeer.prototype.ComponentRemoved=function(a){delete this._stretchedOnLastResize;delete this._minimumTitleWidth;delete this._preferredTitleTextWidth;delete this._ellipsisWidth;AdfDhtmlPanelHeaderPeer.superclass.ComponentRemoved.call(this,a)};
AdfDhtmlPanelHeaderPeer.prototype.HandleComponentClick=function(a){var b=this.getComponent(),c=b.getClientId(),d=AdfRichUIPeer.CreateSubId(c,"_afrHlpLnk"),e=AdfAgent.AGENT,f=a.getNativeEvent(),g=e.getEventTarget(f),g=g.tagName!="A"?g.parentNode:g;if(a.isLeftButtonPressed()&&g.id==d){a=AdfRichUIPeer.CreateSubId(c,"_afrHlpCtr");if(a=e.getElementById(a)){for(a=a.firstChild;a&&a.nodeType!=1;)a=a.nextSibling;if(a!=null)c={},c[AdfRichPopup.HINT_ALIGN]=AdfRichPopup.ALIGN_AFTER_START,c[AdfRichPopup.HINT_ALIGN_ID]=
d,this.showPopup(b,a,c,AdfDhtmlPanelHeaderPeer._DYNAMIC_HELP_POPUP)}e.preventDefault(f);return!0}};AdfDhtmlPanelHeaderPeer.prototype.HandleComponentDialog=function(a){var b=this.getComponent(),c=b.getClientId();AdfRichUIPeer.CreateSubId(c,AdfDhtmlPanelHeaderPeer._DYNAMIC_HELP_DIALOG)==a.getSource().getClientId()&&(a.cancel(),this.hidePopup(b,AdfDhtmlPanelHeaderPeer._DYNAMIC_HELP_POPUP))};
AdfDhtmlPanelHeaderPeer.prototype.PopupClosed=function(a,b,c){AdfDhtmlPanelHeaderPeer._DYNAMIC_HELP_POPUP==c&&(AdfDhtmlPanelHeaderPeer.superclass.PopupClosed.call(this,a,b),a=a.getClientId(),a=AdfRichUIPeer.CreateSubId(a,"_afrHlpCtr"),(a=AdfAgent.AGENT.getElementById(a))&& CSCOCall_appendChild(a,"appendChild",b))};AdfDhtmlPanelHeaderPeer.prototype.ResizeNotify=function(a,b,c){a=this._minimumTitleWidth;this._minimumTitleWidth==null&&(a=this._calculateMinimumTitleWidth());c>=a?this._stretchTitle():this._truncateTitle(a-c)};
AdfDhtmlPanelHeaderPeer.prototype._calculateMinimumTitleWidth=function(){var a=AdfAgent.AGENT,b=this.getDomElement(),c=0,d=AdfAgent.getCSSLengthAsInt,e=a.getComputedStyle(b),e=d(e.paddingLeft)+d(e.paddingRight);c+=e;var e=AdfDomUtils.getFirstDescendentElement(b,"table"),f=AdfDomUtils.getFirstDescendentElement(e,"tr");if(AdfDomUtils.getChildElements(f).length==3)var g=!0;if(g){g=AdfDomUtils.getFirstDescendentElement(e,"tr");if(g==null)return c;g=AdfDomUtils.getChildElements(g);c+=g[0].offsetWidth;
c+=g[2].offsetWidth;e=g[1];g=AdfDomUtils.getFirstDescendentElement(g[1],"table")}else g=e;e=a.getComputedStyle(e);d=d(e.paddingLeft)+d(e.paddingRight);c+=d;d=this._getTitleTextElement();this._preferredTitleTextWidth=e=AdfDomUtils.getFirstChildElement(d).offsetWidth;c+=e;d.style.width=e+"px";d.style.maxWidth=e+"px";if(a.getPlatform()==AdfAgent.GECKO_PLATFORM&&a.getVersion()==1.8)d.style.overflow="hidden";for(var a=AdfDomUtils.getFirstDescendentElement(g,"tr"),a=AdfDomUtils.getChildElements(a),d=CSCOCall_getAttribute(b,"getAttribute","id"),
b=AdfRichUIPeer.CreateSubId(d,AdfDhtmlPanelHeaderPeer._TITLE_TEXT_SUBID),d=AdfRichUIPeer.CreateSubId(d,AdfDhtmlPanelHeaderPeer._STRETCH_CELL_SUBID),g=a.length,h=0;h<g;h++)e=a[h],f=CSCOCall_getAttribute(e,"getAttribute","id"),b!=f&&d!=f&&(c+=e.offsetWidth);return this._minimumTitleWidth=c};
AdfDhtmlPanelHeaderPeer.prototype._truncateTitle=function(a){var b=this._getEllipsisElement(),c=AdfDomUtils.getFirstChildElement(b),d=this._ellipsisWidth;if(this._stretchedOnLastResize){c.style.display="";if(d==null)this._ellipsisWidth=d=AdfAgent.AGENT.getOuterWidth(b,b.offsetWidth);if(this._preferredTitleTextWidth==0)c.style.display="none"}a=this._preferredTitleTextWidth-(d+a);b=AdfDhtmlPanelHeaderPeer._MINIMUM_TITLE_TEXT_WIDTH;a=a<b?b:a;b=this._getTitleTextElement();b.style.width=a+"px";b.style.maxWidth=
a+"px";this._stretchedOnLastResize=!1};AdfDhtmlPanelHeaderPeer.prototype._stretchTitle=function(){if(!this._stretchedOnLastResize){var a=this._getEllipsisElement();AdfDomUtils.getFirstChildElement(a).style.display="none";var a=this._getTitleTextElement(),b=this._preferredTitleTextWidth;a.style.width=b+"px";a.style.maxWidth=b+"px";this._stretchedOnLastResize=!0}};
AdfDhtmlPanelHeaderPeer.prototype._getTitleTextElement=function(){var a=CSCOCall_getAttribute(this.getDomElement(),"getAttribute","id"),a=AdfRichUIPeer.CreateSubId(a,AdfDhtmlPanelHeaderPeer._TITLE_TEXT_SUBID),a=AdfAgent.AGENT.getElementById(a);return AdfDomUtils.getFirstChildElement(a)};AdfDhtmlPanelHeaderPeer.prototype._getEllipsisElement=function(){var a=CSCOCall_getAttribute(this.getDomElement(),"getAttribute","id"),a=AdfRichUIPeer.CreateSubId(a,AdfDhtmlPanelHeaderPeer._ELLIPSIS_SUBID);return AdfAgent.AGENT.getElementById(a)};
AdfUIComponents.createComponentClass("AdfRichShowDetailHeader",{componentType:"oracle.adf.RichShowDetailHeader",propertyKeys:[{name:"inlineStyle",type:"String"},{name:"styleClass",type:"String"},{name:"shortDesc",type:"String"},{name:"unsecure",type:"Object",secured:!0},{name:"visible",type:"Boolean","default":!0},{name:"helpTopicId",type:"String"},{name:"text",type:"String"},{name:"icon",type:"String"},{name:"type",type:"String","default":"default"},{name:"contentStyle",type:"String"},{name:"helpType",
type:"String","default":"inline"},{name:"messageType",type:"String","default":"none"},{name:"size",type:"Number","default":-1},{name:"headerLevel",type:"Number","default":-1},{name:"persist",type:"Array"},{name:"dontPersist",type:"Array"},{name:"maximized",type:"Boolean","default":!1},{name:"showMaximize",type:"String","default":"auto"},"maximizeListener",{name:"contentDelivery",type:"String","default":"lazyUncached"}],superclass:AdfUIShowDetail});
AdfRichUIPeer.createPeerClass(AdfDhtmlPanelHeaderPeer,"AdfDhtmlShowDetailHeaderPeer",!1);AdfDhtmlShowDetailHeaderPeer._INNER_SD_PEER=AdfRichUIPeer.createInnerPeerClassWithSubId(AdfDhtmlShowDisclosurePeer,"InnerSDHShowDetailPeer","_afrDscl");InnerSDHShowDetailPeer.InitSubclass=function(){AdfDhtmlTogglePeer.Config(this,{toggledStyleClass:"af|showDetailHeader::disclosed-icon-style",untoggledStyleClass:"af|showDetailHeader::undisclosed-icon-style"})};
InnerSDHShowDetailPeer.prototype.HandleClientSideToggle=function(a){return InnerSDHShowDetailPeer.superclass.HandleClientSideToggle.call(this,a)?this.outerThis._handleClientSideDisclosure(a):!1};AdfDhtmlShowDetailHeaderPeer.prototype.Init=function(a){AdfDhtmlShowDetailHeaderPeer.superclass.Init.call(this,a);this._disclosurePeer=new AdfDhtmlShowDetailHeaderPeer._INNER_SD_PEER(a,this)};
AdfDhtmlShowDetailHeaderPeer.prototype.initialize=function(a){AdfDhtmlShowDetailHeaderPeer.superclass.initialize.call(this,a);this._disclosurePeer.initialize(a)};AdfDhtmlShowDetailHeaderPeer.InitSubclass=function(){AdfRichUIPeer.addComponentEventHandlers(this,AdfUIInputEvent.CLICK_EVENT_TYPE,AdfUIInputEvent.KEY_UP_EVENT_TYPE,AdfDisclosureEvent.EVENT_TYPE);AdfRichUIPeer.addComponentPropertyChanges(this,"disclosed")};
AdfDhtmlShowDetailHeaderPeer.prototype.HandleComponentClick=function(a){AdfDhtmlShowDetailHeaderPeer.superclass.HandleComponentClick.call(this,a);this._disclosurePeer.HandleComponentClick(a)};AdfDhtmlShowDetailHeaderPeer.prototype.HandleComponentKeyUp=function(a){this._disclosurePeer.HandleComponentKeyUp(a)};AdfDhtmlShowDetailHeaderPeer.prototype.HandleComponentDisclosure=function(a){this._disclosurePeer.HandleComponentDisclosure(a)};
AdfDhtmlShowDetailHeaderPeer.prototype.ComponentDisclosedChanged=function(a,b,c,d){return this._getContentDomElement()?this._disclosurePeer.ComponentDisclosedChanged(a,b,c,d):!1};AdfDhtmlShowDetailHeaderPeer.prototype._getContentDomElement=function(){return this.getDomElement().childNodes[1]};AdfDhtmlShowDetailHeaderPeer.prototype._handleClientSideDisclosure=function(a){var b=this._getContentDomElement();return b?(b.style.display=a?"":"none",!0):!1};