function AdfRichPlainTextEditor(a){this.Init(a)}AdfObject.createSubclass(AdfRichPlainTextEditor,AdfRichInlineEditor);AdfRichPlainTextEditor._extraWidth=0;AdfRichPlainTextEditor.prototype.Init=function(a){AdfAssert.assertString(a);AdfRichPlainTextEditor.superclass.Init.call(this);this._propertyName=a};AdfRichPlainTextEditor.prototype.PreEdit=function(){return this.GetEditedDomElement()!=null};AdfRichPlainTextEditor.prototype.getEditedProperty=function(){return this._propertyName};
AdfRichPlainTextEditor.prototype.startEdit=function(a,b){AdfRichPlainTextEditor.superclass.startEdit.call(this,a,b);var c=this.GetEditedPeer().getDomDocument(),d=c.createElement("input");d.type="text";var f=AdfAgent.AGENT,g=a.getProperty(this._propertyName);d.value=g;a._orgininalEditValue=g;g=this.GetEditedDomElement();f.copyStyle(g,d);var h=d.style;h.position="absolute";if(h.MozBoxSizing)h.MozBoxSizing=null;h.zIndex=1;AdfRichPlainTextEditor._textArea=d;AdfRichPlainTextEditor._extraWidth=h.textAlign==
"left"?20:0;c=c.body;c.insertBefore(d,c.firstChild);this._updateTextAreaPosition(d,g);g.style.visibility="hidden";AdfFocusUtils.focusElementDelayed(d,1);c=AdfRichPlainTextEditor._commitEditStub;f.addBubbleEventListener(d,"keyup",c);f.addBubbleEventListener(d,"keypress",c);a.addEventListener("propertyChange",this._syncFromPropertyChange,this);f.addEventBubbles(d,AdfRichPlainTextEditor._handleEditorEventStub)};
AdfRichPlainTextEditor.prototype.stopEdit=function(){this._commitEdit();this._finishEdit();AdfRichPlainTextEditor.superclass.stopEdit.call(this)};
AdfRichPlainTextEditor.prototype._handleEditorEvent=function(a){if(a.type=="blur")AdfPage.PAGE.setEditedComponent(null,a);else if(a.type=="keyup")switch(AdfAgent.AGENT.getKeyCode(a)){case AdfKeyStroke.ESC_KEY:var b=this.getEditedComponent();AdfRichPlainTextEditor._textArea.value=b._orgininalEditValue;AdfPage.PAGE.setEditedComponent(null,a);break;case AdfKeyStroke.ENTER_KEY:(a.altKey||!a.ctrlKey&&!a.shiftKey)&&AdfPage.PAGE.setEditedComponent(null,a);break;case AdfKeyStroke.TAB_KEY:AdfPage.PAGE.setEditedComponent(null,
a)}};AdfRichPlainTextEditor.prototype.GetEditedDomElement=function(){return this.GetEditedPeer().getDomElement()};AdfRichPlainTextEditor.prototype._commitEdit=function(){this.getEditedComponent().setProperty(this._propertyName,AdfRichPlainTextEditor._textArea.value,!0)};
AdfRichPlainTextEditor.prototype._finishEdit=function(){var a=this.getEditedComponent();a._orgininalEditValue=null;a.removeEventListener("propertyChange",this._syncFromPropertyChange,this);var a=AdfRichPlainTextEditor._textArea,b=AdfAgent.AGENT,c=AdfRichPlainTextEditor._commitEditStub;b.removeBubbleEventListener(a,"keypress",c);b.removeBubbleEventListener(a,"keyup",c);b.removeEventBubbles(a,AdfRichPlainTextEditor._handleEditorEventStub);b=this.GetEditedDomElement();b.ownerDocument.body.removeChild(a);
b.style.visibility="visible";AdfRichPlainTextEditor._textArea=null;AdfRichPlainTextEditor._extraWidth=0};AdfRichPlainTextEditor._commitEditStub=function(){var a=AdfPage.PAGE.getEditedComponent();a!=null&&(a=a.getPeer().getInlineEditor(a),a!=null&&(AdfAssert.assertPrototype(a,AdfRichPlainTextEditor),a._commitEdit()))};
AdfRichPlainTextEditor._handleEditorEventStub=function(a){var a=a?a:window.event,b=AdfPage.PAGE.getEditedComponent();b!=null&&(b=b.getPeer().getInlineEditor(b),b!=null&&(AdfAssert.assertPrototype(b,AdfRichPlainTextEditor),b._handleEditorEvent(a)))};
AdfRichPlainTextEditor.prototype._syncFromPropertyChange=function(a){if(a.getPropertyName()==this._propertyName){var b=AdfRichPlainTextEditor._textArea,c=this.GetEditedDomElement();this._updateTextAreaPosition(b,c);a=a.getNewValue();a==null&&(a="");if(b.value!=a)b.value=a}};
AdfRichPlainTextEditor.prototype._updateTextAreaPosition=function(a,b){var c=a.style,d=AdfAgent.AGENT,f=d.getElementPageBounds(b),g=f.left;c.top=f.top+"px";c.left=g+"px";d.setOuterWidth(a,b.offsetWidth+AdfRichPlainTextEditor._extraWidth);d.setOuterHeight(a,b.offsetHeight)};
function AdfDhtmlSimpleLabelEditor(){this.Init("label")}AdfObject.createSubclass(AdfDhtmlSimpleLabelEditor,AdfRichPlainTextEditor);AdfDhtmlSimpleLabelEditor.getInlineEditor=function(){var a=AdfDhtmlSimpleLabelEditor._INLINE_EDITOR;if(a==null)a=new AdfDhtmlSimpleLabelEditor,AdfDhtmlSimpleLabelEditor._INLINE_EDITOR=a;return a};
AdfDhtmlSimpleLabelEditor.prototype.GetEditedDomElement=function(){if(this.getEditedComponent().getProperty("label")==void 0)return null;var a=this.GetEditedPeer().getDomElement();return AdfDomUtils.getFirstDescendentElement(a,"LABEL")};
function AdfDhtmlSimpleTextEditor(a){this.Init(a)}AdfObject.createSubclass(AdfDhtmlSimpleTextEditor,AdfRichPlainTextEditor);AdfDhtmlSimpleTextEditor.prototype.Init=function(a){AdfDhtmlSimpleTextEditor.superclass.Init.call(this,"text");AdfAssert.assertString(a);this._wrapperElementName=a};AdfDhtmlSimpleTextEditor.getInlineEditor=function(){var a=AdfDhtmlSimpleTextEditor._INLINE_EDITOR;if(a==null)a=new AdfDhtmlSimpleTextEditor("span"),AdfDhtmlSimpleTextEditor._INLINE_EDITOR=a;return a};
AdfDhtmlSimpleTextEditor.getAnchorInlineEditor=function(){var a=AdfDhtmlSimpleTextEditor._ANCHOR_INLINE_EDITOR;if(a==null)a=new AdfDhtmlSimpleTextEditor("a"),AdfDhtmlSimpleTextEditor._ANCHOR_INLINE_EDITOR=a;return a};
AdfDhtmlSimpleTextEditor.prototype.GetEditedDomElement=function(){var a=this.getEditedComponent();if(a.getProperty("text")==void 0)return null;var b=this.GetEditedPeer().getDomElement(),c=AdfDomUtils.getFirstDescendentElement(b,this._wrapperElementName);if(c){a=a.getProperty("accessKey",null);if(a!=null)return AdfDomUtils.findAccessKeyDom(b,a)==c?b:c;return c}return b};
function AdfDhtmlNavigationItemTextEditor(){this.Init("text")}AdfObject.createSubclass(AdfDhtmlNavigationItemTextEditor,AdfRichPlainTextEditor);AdfDhtmlNavigationItemTextEditor.getInlineEditor=function(){var a=AdfDhtmlNavigationItemTextEditor._INLINE_EDITOR;if(a==null)a=new AdfDhtmlNavigationItemTextEditor,AdfDhtmlNavigationItemTextEditor._INLINE_EDITOR=a;return a};
AdfDhtmlNavigationItemTextEditor.prototype.GetEditedDomElement=function(){var a=this.getEditedComponent();if(!a.getProperty("text"))return null;var b=this.GetEditedPeer().getDomElement();return AdfDhtmlCommandNavigationItemPeer.getInlineEditableTextElement(a,b)};
function AdfDhtmlSelectBooleanTextEditor(){this.Init("text")}AdfObject.createSubclass(AdfDhtmlSelectBooleanTextEditor,AdfRichPlainTextEditor);AdfDhtmlSelectBooleanTextEditor.prototype.GetEditedDomElement=function(){var a=this.GetEditedPeer().getDomElement();return AdfDhtmlSelectBooleanCheckboxPeer.__getInlineEditableTextElement(a)};