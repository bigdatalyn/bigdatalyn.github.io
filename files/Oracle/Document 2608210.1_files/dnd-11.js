function AdfDhtmlDnDContext(){this.Init()}AdfObject.createSubclass(AdfDhtmlDnDContext,AdfDnDContext);AdfDhtmlDnDContext.prototype.Init=function(){AdfDhtmlDnDContext.superclass.Init.call(this);this._clearDrag();this._dropTargetComponents=[];this._isAndroid=AdfAgent.AGENT.getOS()==AdfAgent.ANDROID_OS};
AdfDhtmlDnDContext.InitClass=function(){var a=AdfAgent.AGENT;this._NOT_ALLOWED_CURSOR=a.getCursor("not-allowed");this._LINK_CURSOR=a.getCursor("alias");this._COPY_CURSOR=a.getCursor("copy");this._MOVE_CURSOR=a.getCursor("default");this._INHERIT_CURSOR=a.getCursor("inherit")};
AdfDhtmlDnDContext.prototype.__addComponentTarget=function(a){AdfAssert.assertPrototype(a,AdfUIComponent);AdfAssert.assertPrototype(a.getDropTarget(),AdfDropTarget);this._dropTargetComponents.push(a);AdfLogger.LOGGER.finer("Add drop component",a," New count:",this._dropTargetComponents.length)};
AdfDhtmlDnDContext.prototype.__removeComponentTarget=function(a){AdfAssert.assertPrototype(a,AdfUIComponent);var b=AdfCollections.removeArrayValue(this._dropTargetComponents,a);AdfLogger.LOGGER.finer("Remove drop component",a," New count:",this._dropTargetComponents.length);AdfAssert.assert(b!=-1,"Could not find component in components array");if((b=this._lastDropTarget)&&b.getComponent()===a)this._lastDropTarget=null};
AdfDhtmlDnDContext.prototype.__removeDragSource=function(a){AdfAssert.assertPrototype(a,AdfUIComponent);var b=this._dragSource;if(b&&b.getComponent()==a)this._dragSource=null};AdfDhtmlDnDContext.prototype.isDragging=function(){return this._draggingContext!=null};AdfDhtmlDnDContext.prototype.__isDragPrepped=function(){return this._prepContext!=null};AdfDhtmlDnDContext.prototype.getDragSource=function(){return this._dragSource};
AdfDhtmlDnDContext.prototype.getTransferable=function(){var a=this._draggingContext;return a?a._transferable:null};AdfDhtmlDnDContext.prototype.getSourceActions=function(){var a=this._draggingContext;return a?a._sourceActions:AdfDnDContext.ACTION_NONE};AdfDhtmlDnDContext.prototype.getUserAction=function(){var a=this._draggingContext;return a?a._userAction:AdfDnDContext.ACTION_NONE};
AdfDhtmlDnDContext.prototype.setDropTargetProperty=function(a,b){AdfAssert.assertString(a);var c=this._draggingContext;AdfAssert.assert(c,"setDropTargetProperty only allowed when dragging");AdfAssert.assertString(a);c=c._currDropProperties;AdfAssert.assert(c,"setAdfDropTargetProperty only allowed when we have a possible DropTarget");c[a]=b};
AdfDhtmlDnDContext.prototype.getDropTargetProperty=function(a){AdfAssert.assertString(a);var b=this._draggingContext;AdfAssert.assert(b,"getDropTargetProperty only allowed when dragging");b=b._currDropProperties;AdfAssert.assert(b,"getAdfDropTargetProperty only allowed when we have a possible DropTarget");return b[a]};AdfDhtmlDnDContext.prototype.getTriggerEvent=function(){var a=this._draggingContext;return a?a._triggerEvent:null};
AdfDhtmlDnDContext.prototype.startDrag=function(a,b,c,d,e,f,g,h){AdfAssert.assertPrototype(a,AdfDomUIInputEvent);AdfAssert.assertPrototype(b,AdfTransferable);AdfAssert.assert(this._draggingContext==null,"Already dragging");AdfAssert.assertNumeric(c);AdfAssert.assert(c!=AdfDnDContext.ACTION_NONE,"At least one action must be allowed");AdfAssert.assert((c&~AdfDnDContext.ACTIONS_ALL)==0,"allowedActions includes an undefined action flag");this._dragSourceObj=this._dragSource.applyDragSourceState(a);d==
void 0&&(d=c&AdfDnDContext.ACTION_MOVE?AdfDnDContext.ACTION_MOVE:c&AdfDnDContext.ACTION_COPY?AdfDnDContext.ACTION_COPY:AdfDnDContext.ACTION_LINK);AdfAssert.assert(d==AdfDnDContext.ACTION_MOVE||d==AdfDnDContext.ACTION_COPY||d==AdfDnDContext.ACTION_LINK,"defaultAction contains an invalid value");AdfAssert.assert((c&d)!=0,"Default action not an allowed action");AdfAssert.assertNumeric(f);AdfAssert.assertNumeric(g);h=="auto"&&(h=null);var k={};k._triggerEvent=a;k._transferable=b;k._sourceActions=c;k._cursor=
h;k._userAction=AdfDnDContext.ACTION_NONE;k._defaultAction=d;k._autoscrollTimerID=null;k._dropTarget=null;k._lastDropTarget=null;k._dropProperties={};k._currDropProperties=null;k._lastMousePage=null;this._draggingContext=k;AdfAssert.assert(!this._pendingMouseUp);this._pendingMouseUp=!1;AdfLogger.LOGGER.finer("start drag: transferable:",b);if(e){a=this._getDragDiv();b=AdfPage.PAGE;if(!e.dir&&b.getLocaleContext().isRightToLeft())e.dir="rtl";b.showFloatingDiv(a,e);b=e.offsetWidth;e=e.offsetHeight;k._dragWidth=
b;k._dragHeight=e;k._originX=f<0?0:b<f?b:f;k._originY=g<0?0:e<g?e:g}else a=null,k._dragWidth=0,k._dragHeight=0,k._originX=0,k._originY=0;k._dragger=a;AdfPage.PAGE.showGlassPane(this._getCaptureMap(),"no-drop")};
AdfDhtmlDnDContext.prototype._abortDrag=function(){AdfAssert.assert(this._dragSource,"Aborting drag from an invalid drag state");AdfLogger.LOGGER.fine("Abort drag of:",this._dragSource);var a=this._draggingContext;if(a){a._userAction=AdfDnDContext.ACTION_NONE;if(a=a._dropTarget){try{a.dragExit(this)}catch(b){AdfLogger.LOGGER.logErrorAsWarning(b,"DropTarget.dragExit() failed")}this._changeActiveDropCSSClass(a,!1)}this._dragComplete(!1)}else this._prepContext&&this._clearDrag()};
AdfDhtmlDnDContext.prototype.__handleInputEvent=function(a){AdfAssert.assertPrototype(a,AdfUIInputEvent);var b=AdfLogger.LOGGER;if(!this._draggingContext){if(!this._prepContext&&AdfAgent.AGENT.isDragPrepEvent(a))this._dragSource=this._findDragSource(a);var c=this._dragSource;if(c){var d=c.getDragRecognizer();if(k=this._prepContext){AdfPage.PAGE.getGlassPane();var e=!0;try{e=d.abortPrep(k,a)}catch(f){b.logErrorAsWarning(f,"Recognizer abort prep failed")}if(e)this._abortDrag(),a=k.triggerEvent.getNativeEventTarget(),
AdfFocusUtils.isFocusable(a)&&!AdfFocusUtils.containsFocus()&&AdfFocusUtils.focusElement(a);else{b.finest("recognize drag for ",k," ",a);e=null;try{e=d.recognizeDrag(k,a)}catch(g){b.logErrorAsWarning(g,"Drag recognition failed")}if(e){this._prepContext=null;b.fine("initiate drag of ",c," for event:",e);AdfAgent.AGENT.disableUserSelect(AdfPage.PAGE.getDocument().body);try{c.initiateDrag(this,e)}catch(h){throw b.logErrorAsWarning(h,"Drag initiation failed"),h;}this._draggingContext!=null&&this._trackDrag(a.getNativeEvent())}}}else{var k=
null;try{k=d.prepDrag(this,c,a)}catch(l){b.logErrorAsWarning(l,"Drag prep failed")}if(k)b.finer("drag prep context:",k),this._prepContext=k}}}};AdfDhtmlDnDContext.prototype._setCursor=function(a){AdfAssert.assertString(a);AdfLogger.LOGGER.finer("Set cursor to:",a);AdfAgent.AGENT.setCursor(AdfPage.PAGE.getGlassPane(),a)};
AdfDhtmlDnDContext.prototype._findDragSource=function(a){AdfAssert.assertPrototype(a,AdfUIInputEvent);a=this._findContainingDragSource(a);AdfAssert.assertPrototypeOrNull(a,AdfDragSource);var b=this._dragSource;AdfAssert.assertPrototypeOrNull(a,AdfDragSource);if(a!=b)return AdfLogger.LOGGER.finest("Change drag source from:",b," to ",a),a;return b};
AdfDhtmlDnDContext.prototype._findContainingDragSource=function(a){AdfAssert.assertPrototype(a,AdfUIInputEvent);var b=a.getSource();for(AdfAssert.assertPrototype(b,AdfUIComponent);b!=null&&"oracle.adf.RichPopup"!==b.getComponentType();){var c=b.getDragSource();if(c)try{if(c.isAvailable(this,a))return c}catch(d){AdfLogger.LOGGER.logErrorAsWarning(d,"dragSource.isAvailable() failed")}b=b.getParent()}return null};
AdfDhtmlDnDContext.prototype._findDropTarget=function(a,b,c){for(var a=this._dropTargetComponents,d=a.length-1;d>=0;d--){var e=a[d];if(AdfDhtmlDnDContext._pointInDropTarget(e,b,c))return e.getDropTarget()}return null};AdfDhtmlDnDContext._pointInDropTarget=function(a,b,c){return(a=AdfRichUIPeer.getDomElementForComponent(a))?AdfAgent.AGENT.pointInElementOrChildBounds(a,b,c):!1};
AdfDhtmlDnDContext.prototype._getDragDiv=function(){if(!this._dragDiv){var a=AdfPage.PAGE,b=AdfDhtmlZOrderManager.getMaxZIndex();this._dragDiv=a.createFloatingDiv(a.getDocument().body,b,"DragContent");this._dragDiv.dir="ltr"}return this._dragDiv};AdfDhtmlDnDContext.prototype._clearDrag=function(){AdfAgent.AGENT.enableUserSelect(AdfPage.PAGE.getDocument().body);this._draggingContext=this._prepContext=this._dragSource=null};
AdfDhtmlDnDContext.prototype.toDebugString=function(){return AdfDhtmlDnDContext.superclass.toDebugString.call(this)+"[ dragSource:"+this._dragSource+" prepContext:"+this._prepContext+" drag context:"+this._draggingContext+" drag div:"+this._dragDiv+"]"};
AdfDhtmlDnDContext.prototype._trackDrag=function(a){if(!this._pendingMouseUp){var b=this._draggingContext;AdfAssert.assert(b,"Not in dragging state");var c=AdfAgent.AGENT,d=c.getMousePosition(a);b._lastMousePage=d;var e=b._dropTarget,f=this._lastDropTarget,f=this._findDropTarget(e?e:f?f:null,d.x,d.y);AdfAssert.assertPrototypeOrNull(f,AdfDropTarget);var g=this._dragSource,h=AdfLogger.LOGGER;if(f!=e){if(h.finest("Attempt to change drop target changed from:",e," to ",f),e&&this._setUserAction(AdfDnDContext.ACTION_NONE,
!1),f){this._lastDropTarget=f;var e=f.getComponent().getClientId(),k=b._dropProperties,l=k[e];l||(l={},k[e]=l);b._currDropProperties=l;this._acceptDrag(f,a,"acceptDragEnter",d);if(b._userAction!=AdfDnDContext.ACTION_NONE){AdfAssert.DEBUG&&h.finest("New drop target:",f);b._dropTarget=f;this._changeActiveDropCSSClass(f,!0);try{g.dragEnter(this)}catch(m){h.logErrorAsWarning(m,"dragSource.isAvailable() failed")}}}}else if(f&&(this._acceptDrag(f,a,"acceptDragOver",d),b._userAction!=AdfDnDContext.ACTION_NONE))try{g.dragOver(this)}catch(n){h.logErrorAsWarning(n,
"dragSource.dragOver() failed")}a=d.x-b._originX;a<0&&(a=0);d=d.y-b._originY;d<0&&(d=0);if(b._dragger)f=b._dragger.style,g=a+b._dragWidth,h=d+b._dragHeight,e=c.getDomWindow(),g-=c.getWindowScrollWidth(e),h-=c.getWindowScrollHeight(e),g>0&&(a-=g),h>0&&(d-=h),f.left=a+"px",f.top=d+"px";b._dragPageX=a;b._dragPageY=d}};
AdfDhtmlDnDContext.prototype._acceptDrag=function(a,b,c,d){AdfAssert.assertPrototype(a,AdfDropTarget);d==null&&(d=AdfAgent.AGENT.getMousePosition(b));var e=AdfDnDContext.ACTION_NONE,f=this._draggingContext;AdfAssert.assert(f,"No dragging context");if(b.ctrlKey&&b.shiftKey)e=AdfDnDContext.ACTION_LINK;else if(b.ctrlKey)e=AdfDnDContext.ACTION_COPY;else if(b.shiftKey)e=AdfDnDContext.ACTION_MOVE;e&=f._sourceActions;if(e==AdfDnDContext.ACTION_NONE)e=f._defaultAction;b=AdfLogger.LOGGER;b.finest("Initial Proposed action:",
e);f=AdfDnDContext.ACTION_NONE;try{f=a[c](this,e,d.x,d.y),AdfAssert.DEBUG&&AdfDnDContext.assertUserAction(f)}catch(g){b.logErrorAsWarning(g,"DropTarget."+c+"() failed")}b.finest("User action:",f);this._setUserAction(f,"acceptDropActionChanged"==c)};
AdfDhtmlDnDContext.prototype._setUserAction=function(a,b){AdfAssert.DEBUG&&AdfDnDContext.assertUserAction(a);var c=this._draggingContext,d=c._userAction;if(a!=d){var e=AdfLogger.LOGGER;c._userAction=a;var f="auto";switch(a){case AdfDnDContext.ACTION_NONE:f=AdfDhtmlDnDContext._NOT_ALLOWED_CURSOR;break;case AdfDnDContext.ACTION_LINK:f=AdfDhtmlDnDContext._LINK_CURSOR;break;case AdfDnDContext.ACTION_COPY:f=AdfDhtmlDnDContext._COPY_CURSOR;break;case AdfDnDContext.ACTION_MOVE:f=AdfDhtmlDnDContext._MOVE_CURSOR}e.finer("New cursor:",
f);this._setCursor(f);if(a!=AdfDnDContext.ACTION_NONE){if(b)try{this._dragSource.dropActionChanged(this)}catch(g){e.logErrorAsWarning(g,"dragSource.dropActionChanged() failed")}}else if(d!=AdfDnDContext.ACTION_NONE){try{this._dragSource.dragExit(this)}catch(h){e.logErrorAsWarning(h,"dragSource.dragExit() failed")}d=c._dropTarget;AdfAssert.assert(d,"Must have drop target if had user action");try{d.dragExit(this)}catch(k){e.logErrorAsWarning(k,"dropTarget.dragExit() failed")}e.finer("Clear out old dropTarget:",
d);this._changeActiveDropCSSClass(d,!1);c._dropTarget=null;c._currDropProperties=null}}};AdfDhtmlDnDContext.prototype._changeActiveDropCSSClass=function(a,b){AdfAssert.assertPrototype(a,AdfDropTarget);var c=a.getComponent(),d=c.getPeer();d!=null?(d.bind(c),(b?AdfDomUtils.addCSSClassName:AdfDomUtils.removeCSSClassName)(d.getDomElement(),AdfRichUIPeer.DROP_TARGET_STYLECLASS)):AdfAssert.assert(b===!1,"Orphanned component when adding CSS style")};
AdfDhtmlDnDContext.prototype._doDrop=function(a){if(this._pendingMouseUp)AdfPage.PAGE.hideGlassPane(this._getCaptureMap()),this._pendingMouseUp=!1;else{var b=this._draggingContext;AdfAssert.assert(b,"Not in dragging state");if(b._userAction!=AdfDnDContext.ACTION_NONE){var c=b._dropTarget;AdfAssert.assert(c,"Must have a valid drop target to drop");var a=AdfAgent.AGENT.getMousePosition(a),d=AdfDnDContext.ACTION_NONE;try{d=c.drop(this,b._userAction,a.x,a.y),this._changeActiveDropCSSClass(c,!1),AdfAssert.DEBUG&&
AdfDnDContext.assertUserAction(d)}catch(e){AdfLogger.LOGGER.logErrorAsWarning(e,"dropTarget.drop() failed")}this._setUserAction(d,!1)}this._dragComplete(!0)}};
AdfDhtmlDnDContext.prototype._dragComplete=function(a){AdfAssert.assert(this._draggingContext,"Not in dragging state");var b=this._dragSource;if(b!=null){b.clearDragSourceState(this._dragSourceObj);delete this._dragSourceObj;try{b.dragDropEnd(this,this.getUserAction())}catch(c){AdfLogger.LOGGER.logErrorAsWarning(c,"dragSource.dragDropEnd() failed")}}var b=AdfAgent.AGENT,d=AdfPage.PAGE;d.hideFloatingDiv(this._getDragDiv());this._clearDrag();b.getPlatform()==AdfAgent.IE_PLATFORM&&!a?this._pendingMouseUp=
!0:d.hideGlassPane(this._getCaptureMap())};AdfDhtmlDnDContext.prototype._abortEvent=function(a){this._pendingMouseUp||(this._abortDrag(),AdfAgent.eatEventCallback(a))};AdfDhtmlDnDContext.prototype._checkAbort=function(a){if(!this._pendingMouseUp)if(AdfAssert.assert(this._draggingContext,"Not in dragging state"),a.keyCode==27)this._abortEvent(a);else{var b=this._draggingContext,c=b._dropTarget;c&&this._acceptDrag(c,a,"acceptDropActionChanged",b._lastMousePage)}};
AdfDhtmlDnDContext._trackDragCallback=function(a){AdfPage.PAGE.getDnDContext()._trackDrag(a);AdfAgent.eatEventCallback(a);return!1};AdfDhtmlDnDContext._doDropCallback=function(a){AdfPage.PAGE.getDnDContext()._doDrop(a);AdfAgent.eatEventCallback(a);return!1};AdfDhtmlDnDContext._checkAbortCallback=function(a){return AdfPage.PAGE.getDnDContext()._checkAbort(a)};AdfDhtmlDnDContext._abortCallback=function(a){return AdfPage.PAGE.getDnDContext()._abortEvent(a)};
AdfDhtmlDnDContext._updateDragOptionsCallback=function(a){var b=AdfPage.PAGE.getDnDContext(),c=b._dropTarget;c&&b._acceptDrag(c,a,"acceptDropActionChanged",this._lastMousePage)};AdfDhtmlDnDContext._autoscrollCallback=function(){AdfPage.PAGE.getDnDContext()._autoscroll()};
AdfDhtmlDnDContext._abortIfOutsideWindowCallback=function(a){if(a.pageX===void 0)return!0;var b=document.documentElement;if(b.offsetHeight==0)b=document.body;return AdfAgent.AGENT.pointInElementBounds(b,a.clientX,a.clientY)?!0:(AdfPage.PAGE.getDnDContext()._abortEvent(a),!1)};
AdfDhtmlDnDContext.prototype._getCaptureMap=function(){if(AdfDhtmlDnDContext._CAPTURE_MAP==null)AdfDhtmlDnDContext._CAPTURE_MAP=AdfAgent.AGENT.getCapabilities()[AdfAgent.CAP_TOUCH_SCREEN]!=AdfAgent.CAP_TOUCH_SCREEN_NONE?this._isAndroid?{touchmove:AdfDhtmlDnDContext._trackDragCallback,touchend:AdfDhtmlDnDContext._doDropCallback,touchstart:AdfDhtmlDnDContext._abortCallback}:{touchmove:AdfDhtmlDnDContext._trackDragCallback,touchend:AdfDhtmlDnDContext._doDropCallback,touchcancel:AdfDhtmlDnDContext._abortCallback,
touchstart:AdfDhtmlDnDContext._abortCallback}:{mouseout:AdfDhtmlDnDContext._abortIfOutsideWindowCallback,mousemove:AdfDhtmlDnDContext._trackDragCallback,mouseup:AdfDhtmlDnDContext._doDropCallback,keydown:AdfDhtmlDnDContext._checkAbortCallback,keyup:AdfDhtmlDnDContext._updateDragOptionsCallback};return AdfDhtmlDnDContext._CAPTURE_MAP};AdfDhtmlDnDContext._CAPTURE_MAP=null;AdfPage.PAGE.__clearDnDContext();
function AdfAttributeDragSource(a){this.Init(a,AdfDnDContext.ACTION_COPY,AdfDnDContext.ACTION_COPY)}AdfObject.createSubclass(AdfAttributeDragSource,AdfDragSource);AdfAttributeDragSource.prototype.Init=function(a,b,c){AdfAttributeDragSource.superclass.Init.call(this,b,c);AdfAssert.assertString(a);this._propertyName=a;this._checkIfNeedsValidate="value"==a};AdfAttributeDragSource.prototype.toDebugString=function(){return AdfAttributeDragSource.superclass.toDebugString.call(this)+" propertyName:"+this._propertyName};
AdfAttributeDragSource.prototype.isAvailable=function(a,b){AdfAssert.assertPrototype(a,AdfDnDContext);AdfAssert.assertPrototype(b,AdfUIInputEvent);var c=this.getComponent();return c?c.getProperty(this._propertyName)!=null:!1};
AdfAttributeDragSource.prototype.GetDragTransferable=function(){var a=null,b=this.getComponent();b&&(this._checkIfNeedsValidate&&AdfUIEditableValue.prototype.isPrototypeOf(b)&&b.validate(),b=b.getProperty(this._propertyName),b!=null&&(AdfLogger.LOGGER.finer("Create Transferable for AdfAttributeDragSource with attr=",this._propertyName,", value=",b),a=AdfObjectTransferable.createSingleObjectTransferable(b)));return a};
function AdfAttributeDropTarget(a){this.Init(a,AdfDnDContext.ACTION_COPY)}AdfObject.createSubclass(AdfAttributeDropTarget,AdfDropTarget);AdfAttributeDropTarget.prototype.Init=function(a,b,c){AdfAttributeDropTarget.superclass.Init.call(this,b,c);AdfAssert.assertString(a);this._propertyName=a;this._checkIfNeedsValidate="value"==a};AdfAttributeDropTarget.prototype.toDebugString=function(){return AdfAttributeDropTarget.superclass.toDebugString.call(this)+" propertyName:"+this._propertyName};
AdfAttributeDropTarget.prototype.drop=function(a,b){AdfAssert.assert(b==AdfDnDContext.ACTION_COPY);AdfLogger.LOGGER.finer("drop:",this);var c=a.getTransferable().getTransferData(this._getTargetFlavor());if(c!=null&&c.length==1){var d=this.getComponent();this._checkIfNeedsValidate&&AdfUIEditableValue.prototype.isPrototypeOf(d)&&d.validate();var c=c[0],f=this._propertyName;AdfLogger.LOGGER.finer("drop type:",typeof c);AdfLogger.LOGGER.finer("drop: on ",d," set property '",f,"' to '",c,"'");try{return d.setProperty(f,
c),AdfDnDContext.ACTION_COPY}catch(g){AdfLogger.LOGGER.info("drop failed with:",g)}}return AdfDnDContext.ACTION_NONE};AdfAttributeDropTarget.prototype.GetAllowedActions=function(){return AdfDnDContext.ACTION_COPY};AdfAttributeDropTarget.prototype.GetAllowedFlavors=function(){var a=this._getTargetFlavor();return a!=null?[a]:null};
AdfAttributeDropTarget.prototype._getTargetFlavor=function(){var a=this.getComponent(),b=this._propertyName,c=a.getPropertyKeys()[b];return c?AdfDataFlavor.getDataFlavorForClassName(c.type):(a=a.getProperty(b),a!=null?AdfDataFlavor.getObjectFlavor(a):AdfDataFlavor.ANY_FLAVOR)};
function AdfComponentDragSource(a){this.Init(a)}AdfObject.createSubclass(AdfComponentDragSource,AdfDragSource);AdfComponentDragSource._UICOMPONENT_FLAVOR=AdfDataFlavor.getDataFlavorForClass(AdfUIComponent);AdfComponentDragSource.prototype.Init=function(a){AdfComponentDragSource.superclass.Init.call(this,AdfDnDContext.ACTION_MOVE,AdfDnDContext.ACTION_MOVE);this._dataFlavor=a?AdfDataFlavor.getDataFlavorForClass(AdfUIComponent,a):AdfComponentDragSource._UICOMPONENT_FLAVOR};
AdfComponentDragSource.prototype.isAvailable=function(a,b){AdfAssert.assertPrototype(a,AdfDnDContext);AdfAssert.assertPrototype(b,AdfUIInputEvent);return this.getComponent()!=null};AdfComponentDragSource.prototype.GetDragTransferable=function(){var a=null,b=this.getComponent();b&&(a=AdfObjectTransferable.createSingleObjectTransferable(b,this._dataFlavor));return a};
function AdfStampedDragSource(a,b,c){arguments.length&&this.Init(a,b,c)}AdfObject.createSubclass(AdfStampedDragSource,AdfDragSource);AdfStampedDragSource.prototype.Init=function(a,b,c){AdfStampedDragSource.superclass.Init.call(this,a,b);this._modelName=c};AdfStampedDragSource.prototype.getModelName=function(){return this._modelName};
AdfStampedDragSource.prototype.isAvailable=function(a,b){AdfAssert.assertPrototype(a,AdfDnDContext);AdfAssert.assertPrototype(b,AdfUIInputEvent);AdfAssert.DEBUG&&AdfDnDContext.assertUserAction(a.getUserAction());this.getComponent().getPeer();return this.AreDraggedRowKeysAvailable(b)?!0:AdfStampedDragSource.superclass.GetDragTransferable.call(this,b)!=null};AdfStampedDragSource.prototype.getRowKeyDataFlavor=function(){if(this.getComponent()){var a=this._modelName;if(a)return AdfDataFlavor.getRowKeyDataFlavor(a)}return null};
AdfStampedDragSource.prototype.GetDragTransferable=function(a){var b=AdfStampedDragSource.superclass.GetDragTransferable.call(this,a);this.getComponent();var c=this._modelName;if(c&&c.length&&(a=this._getRowKeys(a),AdfAssert.assertArrayOrNull(a),a)){var d=[],e=[];if(b!=null)for(var f=b.getTransferDataFlavors(),g=f.length,h=0;h<g;h++){var k=f[h];d.push(k);e.push(b.getTransferData(k))}b=AdfDataFlavor.getRowKeyDataFlavor(c);e.push(a);d.push(b);return new AdfObjectTransferable(e,d)}return b};
AdfStampedDragSource.prototype.GetDragOffset=function(a){var b=this._getRowKeys(a);return b?this.GetDragOffsetForRowKeys(a,b):{x:a.getOffsetX(),y:a.getOffsetY()}};AdfStampedDragSource.prototype.GetDragOffsetForRowKeys=function(a,b){AdfAssert.assertArray(b);return this.getComponent().getPeer().getDragOffsetForRowKeys(a,b)};
AdfStampedDragSource.prototype.GetDragOverFeedback=function(a){AdfAssert.assertPrototype(a,AdfUIInputEvent);var b=this._getRowKeys(a);return b?this.GetDragOverFeedbackForRowKeys(b):AdfStampedDragSource.superclass.GetDragOverFeedback.call(this,a)};AdfStampedDragSource.prototype.applyDragReadyState=function(a){AdfAssert.assertPrototype(a,AdfUIInputEvent);var b=this._getRowKeys(a);return b?this.ApplyDragReadyStateForRowKeys(a,b):AdfStampedDragSource.superclass.applyDragReadyState.call(this,a)};
AdfStampedDragSource.prototype.ApplyDragReadyStateForRowKeys=function(a,b){AdfAssert.assertArray(b);var c=this.getComponent(),d=c.getPeer();return d.applyDragReadyStateForRowKeys?d.applyDragReadyStateForRowKeys(c,a,b):AdfStampedDragSource.superclass.applyDragReadyState.call(this,a)};
AdfStampedDragSource.prototype.applyDragSourceState=function(a){AdfAssert.assertPrototype(a,AdfDomUIInputEvent);var b=this._getRowKeys(a);return b?this.ApplyDragSourceStateForRowKeys(a,b):AdfStampedDragSource.superclass.applyDragSourceState.call(this,a)};
AdfStampedDragSource.prototype.ApplyDragSourceStateForRowKeys=function(a,b){AdfAssert.assertArray(b);var c=this.getComponent(),d=c.getPeer();return d.applyDragSourceStateForRowKeys?d.applyDragSourceStateForRowKeys(c,a,b):AdfStampedDragSource.superclass.applyDragSourceState.call(this,a)};AdfStampedDragSource.prototype.GetDragOverFeedbackForRowKeys=function(a){AdfAssert.assertArray(a);return this.getComponent().getPeer().getDragNodeForRowKeys(a)};
AdfStampedDragSource.prototype.GetDraggedRowKeys=function(a){AdfAssert.assert(a);return[a]};AdfStampedDragSource.prototype.AreDraggedRowKeysAvailable=function(a){return this._getRowKeys(a)!=null};AdfStampedDragSource.prototype._getRowKeys=function(a){return(a=this.getComponent().getPeer().getRowKeyForEvent(a))?this.GetDraggedRowKeys(a):null};
function AdfTableDragSource(a,b,c){arguments.length&&this.Init(a,b,c)}AdfObject.createSubclass(AdfTableDragSource,AdfStampedDragSource);AdfTableDragSource.prototype.GetDraggedRowKeys=function(a){AdfAssert.assert(a);var b=this.getComponent().getSelectedRowKeys();if(b!=null&&b.afrSelectAll==null&&b[a]!=null){var a=[],c;for(c in b)a.push(c);return a}else return[a]};AdfTableDragSource.prototype.AreDraggedRowKeysAvailable=function(a){return this.getComponent().getPeer().getRowKeyForEvent(a)!=null};
function AdfStampedDropTarget(a,b){arguments.length&&this.Init(a,b)}AdfObject.createSubclass(AdfStampedDropTarget,AdfDropTarget);AdfStampedDropTarget.prototype.Init=function(a,b){AdfStampedDropTarget.superclass.Init.call(this);AdfAssert.assertNumber(a);AdfAssert.assert(a!=AdfDnDContext.ACTION_NONE,"allowedActions must be specified");AdfAssert.assert((a&~AdfDnDContext.ACTIONS_ALL)==0,"Invalid allowedActions:"+a);this._allowedActions=a;this._modelName=b};
AdfStampedDropTarget.prototype.toDebugString=function(){AdfAssert.assertNumber(this._allowedActions);return AdfStampedDropTarget.superclass.toDebugString.call(this)+" allowedActions:"+this._allowedActions.toString(2)};AdfStampedDropTarget.prototype.dragExit=function(a){AdfLogger.LOGGER.finer("dragExit:",this);this._cleanUpDragFeedback(a,!0)};
AdfStampedDropTarget.prototype.drop=function(a,b,c,d){AdfLogger.LOGGER.finer("drop:",this);this._cleanUpDragFeedback(a,!1);var e=this.getComponent().getPeer(),f=a.getDropTargetProperty(AdfStampedDropTarget._ROWKEY_HINTS);f==null&&(f={},a.setDropTargetProperty(AdfStampedDropTarget._ROWKEY_HINTS,f));e.getRowKeyAndOrientationFromHints(c,d,f);return this.DropOnRowKey(a,b,c,d,f[AdfStampedDropTarget.ROW_KEY],f[AdfStampedDropTarget.DROP_ORIENTATION])};
AdfStampedDropTarget.prototype.DropOnRowKey=function(a,b,c,d,e,f){AdfLogger.LOGGER.fine("Queing Drop Event with row key:",e);(new AdfDropEvent(this.getComponent(),a.getDragSource(),a.getTransferable(),b,c,d,f,e)).queue();return b};AdfStampedDropTarget.prototype.getRowKeyDataFlavor=function(){if(this.getComponent()){var a=this._modelName;if(a)return AdfDataFlavor.getRowKeyDataFlavor(a)}return null};
AdfStampedDropTarget.prototype.AcceptDrag=function(a,b,c,d,e){var f=AdfDnDContext.ACTION_NONE,g=c,h=null,k=null,k=null,c=AdfStampedDropTarget.superclass.AcceptDrag.call(this,a,b,c,d,e);c==AdfDnDContext.ACTION_NONE&&(c=this.AcceptDragOverrideIfRejectedByFlavor(a,g));if(c!=AdfDnDContext.ACTION_NONE){f=this.getComponent();b=f.getPeer();g=a.getDropTargetProperty(AdfStampedDropTarget._ROWKEY_HINTS);g==null&&(g={},a.setDropTargetProperty(AdfStampedDropTarget._ROWKEY_HINTS,g));var l=g.lastRowKey;b.getRowKeyAndOrientationFromHints(d,
e,g);k=h=g.rowKey;if(k==null)k=AdfStampedDropTarget._NULL_ROW_KEY;var m=g[k],n,o=AdfStampedDropTarget._ACTION_KEYS[c];m==null?(m={},g[k]=m,k=b.getRowKeyBounds(h),m[AdfStampedDropTarget._BOUNDS_KEY]=k,n=null):(n=m[o],k=m[AdfStampedDropTarget._BOUNDS_KEY]);if(n!=null)f=n;else{AdfLogger.LOGGER.finer("Check AdfStampedDropTarget rowKey:",h);n=a.getDragSource();if((n!=null?n.getComponent():null)===f&&this.NeedsRowKeyCollectionCheck()&&c==AdfDnDContext.ACTION_MOVE)if(f=a.getTransferable())if(f=f.getTransferData(this.getRowKeyDataFlavor()),
AdfCollections.indexOf(f,h)!=-1)c=AdfDnDContext.ACTION_NONE;f=c;m[o]=f}b.showDragFeedback(a,h,f,l,d,e,!1);g[AdfStampedDropTarget.HINT_LAST_ROWKEY]=h;g[AdfStampedDropTarget.HINT_LAST_ROWKEY_BOUNDS]=k;g[AdfStampedDropTarget.HINT_LAST_DROP_ORIENTATION]=g[AdfStampedDropTarget.DROP_ORIENTATION]}return f};AdfStampedDropTarget.prototype.NeedsRowKeyCollectionCheck=function(){return!0};AdfStampedDropTarget.prototype.AcceptDragOverrideIfRejectedByFlavor=function(){return AdfDnDContext.ACTION_NONE};
AdfStampedDropTarget.prototype.GetAllowedFlavors=function(){var a=null,b=this.getRowKeyDataFlavor();b&&(a=[],a.push(b));return a};AdfStampedDropTarget.prototype.GetAllowedActions=function(){return this._allowedActions};
AdfStampedDropTarget.prototype._cleanUpDragFeedback=function(a,b){var c=a.getDropTargetProperty(AdfStampedDropTarget._ROWKEY_HINTS),d=c?c[AdfStampedDropTarget.HINT_LAST_ROWKEY]:null;b&&c&&(c[AdfStampedDropTarget.HINT_LAST_ROWKEY]=null);this.getComponent().getPeer().showDragFeedback(a,null,AdfDnDContext.ACTION_NONE,d,null,null,b)};AdfStampedDropTarget._ROWKEY_HINTS="StampedDropTarget:hints";AdfStampedDropTarget.HINT_LAST_ROWKEY="lastRowKey";AdfStampedDropTarget.HINT_LAST_ROWKEY_BOUNDS="lastRowKeyBounds";
AdfStampedDropTarget.HINT_LAST_DROP_ORIENTATION="lastDropOrientation";AdfStampedDropTarget.DROP_ORIENTATION="dropOrientation";AdfStampedDropTarget.ROW_KEY="rowKey";AdfStampedDropTarget._BOUNDS_KEY="bounds";AdfStampedDropTarget._NULL_ROW_KEY="null_rk";AdfStampedDropTarget._ACTION_KEYS=[null,"COPY","MOVE",null,"LINK"];
function AdfTableDropTarget(a,b){arguments.length&&this.Init(a,b)}AdfObject.createSubclass(AdfTableDropTarget,AdfStampedDropTarget);
function AdfBasicDropTarget(a,b,c){AdfCollections.isArray(c)||(AdfAssert.assertPrototype(c,AdfDataFlavor),c=[c]);this.Init(a,b,c)}AdfObject.createSubclass(AdfBasicDropTarget,AdfDropTarget);
AdfBasicDropTarget.prototype.Init=function(a,b,c){AdfBasicDropTarget.superclass.Init.call(this);AdfAssert.assertFunctionOrNull(a,"dropHandler function required");AdfAssert.assertNumber(b);AdfAssert.assert(b!=AdfDnDContext.ACTION_NONE,"allowedActions must be specified");AdfAssert.assert((b&~AdfDnDContext.ACTIONS_ALL)==0,"Invalid allowedActions:"+b);AdfAssert.assertArray(c,"At least one flavor must be allowed");AdfAssert.assertPrototype(c[0],AdfDataFlavor);this._dropHandler=a;this._allowedActions=b;
this._allowedFlavors=c};AdfBasicDropTarget.prototype.drop=function(a,b,c,d){var f=this._dropHandler,b=f!=null?f.call(this,a,b,c,d):b;AdfAssert.assertNumber(b);if(b==AdfDnDContext.ACTION_NONE)return b;AdfAssert.assert((b&~AdfDnDContext.ACTIONS_ALL)==0,"Invalid userAction:"+b);return AdfBasicDropTarget.superclass.drop.call(this,a,b,c,d)};
AdfBasicDropTarget.prototype.toDebugString=function(){var a=AdfBasicDropTarget.superclass.toDebugString.call(this),b=this._allowedActions;b&&(a+=" allowedActions:"+b.toString(2));a+=" allowedFlavors:"+this._allowedFlavors;return a};AdfBasicDropTarget.prototype.GetAllowedFlavors=function(){return this._allowedFlavors};AdfBasicDropTarget.prototype.GetAllowedActions=function(){return this._allowedActions};