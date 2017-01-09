
;if(!dojo._hasResource["lconn.share.widget.StreamPaging"]){
dojo._hasResource["lconn.share.widget.StreamPaging"]=true;
dojo.provide("lconn.share.widget.StreamPaging");






dojo.declare("lconn.share.widget.StreamPaging",null,{checkForMore:false,apiParams:{sI:"sI",page:"page",pageSize:"pageSize",zeroItem:1},constructor:function(_1){
dojo.mixin(this,_1);
if(this.apiType=="cmis"){
this.apiParams={sI:"skipCount",pageSize:"maxItems",zeroItem:0};
}
},detect:function(_2,_3,_4){
var pN=this.apiParams;
var _5,p,_6=-1,_7=-1;
if(_2){
_5=lconn.share.util.uri.parseUri(_2);
p=_5.queryParameters;
_6=lconn.share.util.text.parseInt(p[pN.pageSize],-1);
if(pN.page&&p[pN.page]){
_7=(lconn.share.util.text.parseInt(p[pN.page],1)-1)*_6;
}else{
if(pN.sI&&p[pN.sI]){
_7=lconn.share.util.text.parseInt(p[pN.sI],1)-pN.zeroItem;
}
}
}
var _8,_9,_a,_b;
if(_4=="json"){
_8=(_3.items)?_3.items.length:0;
_9=-1;
if(typeof _3.totalItems=="number"){
_9=_3.totalItems;
}else{
if(typeof _3.totalSize=="number"){
_9=_3.totalSize;
}
}
_a=_3.previousUrl;
_b=_3.nextUrl;
}else{
var _c=lconn.share.util.dom;
_8=dojo.filter(_c.getElementsByTagNameNS(_3,"entry",_c.ATOM_NAMESPACE),function(e){
return e.parentNode==_3;
}).length;
if(this.apiType=="cmis"){
_9=lconn.share.util.text.parseInt(_c.getChildElementTextContentNS(_3,"numItems",_c.CMISRA_NAMESPACE),-1);
}else{
_9=lconn.share.util.text.parseInt(_c.getChildElementTextContentNS(_3,"totalResults",_c.OPENSEARCH_NAMESPACE),-1);
}
_a=_c.getChildElementAttributeMatchingNS(_3,"link",_c.ATOM_NAMESPACE,"rel",null,"previous","href",null);
_b=_c.getChildElementAttributeMatchingNS(_3,"link",_c.ATOM_NAMESPACE,"rel",null,"next","href",null);
this.displayTotal=lconn.share.util.text.parseInt(_c.getChildElementMatchingAttributeTextContentNS(_3,"rank",lconn.share.util.dom.SNX_NAMESPACE,"scheme",null,"http://www.ibm.com/xmlns/prod/sn/item"),0);
}
if(_7==-1&&_6!=-1&&_a){
var _d=lconn.share.util.uri.parseUri(_a);
var _e=_d.queryParameters;
if(pN.page&&_e[pN.page]){
_7=lconn.share.util.text.parseInt(_e[pN.page],1)*_6;
}else{
if(pN.sI&&_e[pN.sI]){
_7=lconn.share.util.text.parseInt(_e[pN.sI],1)-pN.zeroItem+_6;
}
}
}
if(_b&&!_a){
_7=0;
}
if(_7==-1&&this.apiType=="cmis"){
_7=0;
}
this.next=_b;
this.previous=_a;
this.items=_8;
if(_3){
if(_9!=-1){
this.mode="index";
this.total=(_7==0&&_8<_6)?_8:_9;
this.startIndex=_7;
this.uri=_5;
}else{
if(_7==0&&_6!=-1){
this.mode="index";
this.total=(_8<_6)?_8:-1;
this.startIndex=0;
this.uri=_5;
}else{
if(_7!=-1&&_6!=-1){
this.mode="index";
this.total=(_8<=_6)?_8+_7:-1;
this.startIndex=_7;
this.uri=_5;
}
}
}
if(!this.mode){
if(_a||_b){
this.mode="url";
this.startIndex=-1;
this.total=-1;
}else{
this.mode="index";
this.total=(_8<_6)?(_7+_8):-1;
this.startIndex=_7;
this.uri=_5;
}
}
if(!this.mode){
this.mode="unpaged";
this.startIndex=0;
this.total=-1;
}
this.hasMore=(this.total!=-1&&this.startIndex!=-1&&(this.startIndex+_8)<this.total)||this.next||(this.total==-1&&_8==_6);
this.pastEnd=(_8==0&&(this.total>0||this.startIndex>0));
if(_6==-1){
_6=_8;
}else{
if(this.checkForMore&&_6>0){
_6=_6-1;
}
}
this.size=_6;
}else{
if(_6!=-1){
if(this.checkForMore){
_6=_6-1;
}
this.mode="index";
this.startIndex=_7;
this.size=_6;
this.parameters=p;
}else{
this.mode="unpaged";
this.startIndex=0;
this.size=-1;
}
this.total=-1;
this.visible=0;
}
},_setParams:function(p,_f){
var pV=_f||{};
var pN=this.apiParams;
delete p.sI;
delete p.page;
if(pN.sI){
delete p[pN.sI];
}
if(pN.page){
delete p[pN.page];
}
if(pN.sI&&pV.sI){
p[pN.sI]=pV.sI;
}else{
if(pN.page&&pV.page){
p[pN.page]=pV.page;
}
}
if(pN.pageSize&&pV.pageSize){
delete p.pageSize;
p[pN.pageSize]=pV.pageSize;
}
},getPageUrl:function(_10,_11){
if(_10<1){
return null;
}
if(this.mode=="index"){
var _12=this.uri.queryParameters;
var p=dojo.clone(_12);
var _13={page:_10};
if(typeof _10!="undefined"){
_13.sI=this.size*(_10-1)+this.apiParams.zeroItem;
}
if(typeof _11!="undefined"){
_13.pageSize=_11+(this.checkForMore?1:0);
}else{
_13.pageSize=this.size+(this.checkForMore?1:0);
}
this._setParams(p,_13);
this.uri.queryParameters=p;
var url=lconn.share.util.uri.writeUri(this.uri);
this.uri.queryParameters=_12;
return url;
}
return null;
},getNextUrl:function(){
if(this.mode=="url"){
return this.next;
}
if(this.mode=="index"){
var _14=this.uri.queryParameters;
var p=dojo.clone(_14);
this._setParams(p,{sI:this.startIndex+this.size+this.apiParams.zeroItem,page:this.getNextPage()});
this.uri.queryParameters=p;
var url=lconn.share.util.uri.writeUri(this.uri);
this.uri.queryParameters=_14;
return url;
}
return null;
},getNextPage:function(){
if(this.mode=="index"){
var _15=Math.floor(this.startIndex/this.size)+1;
return _15+1;
}
return -1;
},getPreviousUrl:function(){
if(this.mode=="url"){
return this.previous;
}
if(this.mode=="index"){
var _16=this.uri.queryParameters;
var p=dojo.clone(_16);
if(this.startIndex<1){
return null;
}
this._setParams(p,{sI:this.apiParams.zeroItem+Math.max(this.startIndex-this.size,0),page:this.getPreviousPage()});
this.uri.queryParameters=p;
var url=lconn.share.util.uri.writeUri(this.uri);
this.uri.queryParameters=_16;
return url;
}
return null;
},getPreviousPage:function(){
if(this.mode=="index"){
var _17=Math.floor(this.startIndex/this.size)+1;
return (_17>1)?_17-1:-1;
}
return -1;
},getLastPageUrl:function(){
if(this.mode=="url"){
return this.next;
}
if(this.mode=="index"){
var _18,_19;
if(this.total!=-1){
_19=Math.floor((this.total-(this.total%this.size))/this.size);
_18=(_19-1)*this.size;
}else{
_19=1+Math.floor(this.startIndex/this.size);
_18=this.startIndex-this.size;
}
var _1a=this.uri.queryParameters;
var p=dojo.clone(_1a);
this._setParams(p,{sI:Math.max(_18,0)+this.apiParams.zeroItem,page:_19});
this.uri.queryParameters=p;
var url=lconn.share.util.uri.writeUri(this.uri);
this.uri.queryParameters=_1a;
return url;
}
return null;
},getLastPage:function(){
if(this.mode=="index"){
var _1b;
return (this.total!=-1)?Math.ceil(this.total/this.size):Math.floor(this.startIndex/this.size);
}
return -1;
},isPastEnd:function(){
return this.pastEnd;
},hasNext:function(){
return this.hasMore;
},hasPrevious:function(){
if(this.mode=="url"){
return (this.previous&&this.previous!=null);
}
return (this.startIndex>0);
},isFullPage:function(){
return (this.size>0&&this.size==this.items);
}});
}


;if(!dojo._hasResource["lconn.share.widget.Scrollable"]){
dojo._hasResource["lconn.share.widget.Scrollable"]=true;
dojo.provide("lconn.share.widget.Scrollable");
dojo.declare("lconn.share.widget.Scrollable",null,{_element:null,_options:null,_minHeight:0,_windowResizeListener:null,_onScrollListener:null,_suppressPageScroll:true,_modalDialogShowing:false,constructor:function(el,_1){
if(!el){
console.warn("Try to add scroll capability to undefined element");
return;
}
this._element=el;
this._options=_1||{};
this._minHeight=this._options.minHeight||100;
this.configPage();
this._addStyle();
this._onWindowResize();
this._windowResizeListener=dojo.connect(window,"resize",dojo.hitch(this,"_onWindowResize"));
dojo.subscribe("lconn/share/scene/render",this,"_adjustHeight");
dojo.subscribe("lconn/share/scene/updated",this,"_adjustHeight");
dojo.subscribe("lconn/share/message/updated",this,"_adjustHeight");
dojo.subscribe("lconn/share/scene/modal-dialog/shown",this,"_onModalDialogShown");
dojo.subscribe("lconn/share/scene/modal-dialog/closed",this,"_onModalDialogClosed");
dojo.subscribe("lconn/share/scene/loadListData",this,"_adjustHeight");
},configPage:function(){
if(!this._isIndependentScrollbarsEnabled()){
dojo.addClass(document.documentElement,"files-independent-scrollbars-compatible");
}
this._disablePageScrollbar();
},_addStyle:function(){
if(!this._element){
return;
}
this._element.style.overflowY="auto";
this._element.style.overflowX="hidden";
this._element.style.minHeight=this._minHeight+"px";
this._element.style.boxSizing="border-box";
this._element.style.marginBottom=(this._options.marginBottom||10)+"px";
dojo.addClass(this._element,"lotusStyledScroll");
},_isIndependentScrollbarsEnabled:function(){
return dojo.hasClass(document.documentElement,"files-independent-scrollbars-compatible");
},_isPageScrollbarEnabled:function(){
return !dojo.hasClass(document.body,"lconnNonVerticalScrollableBody");
},_enablePageScrollbar:function(){
if(!this._isPageScrollbarEnabled()){
dojo.removeClass(document.body,"lconnNonVerticalScrollableBody");
}
},_disablePageScrollbar:function(){
if(this._isPageScrollbarEnabled()&&!this._modalDialogShowing){
dojo.addClass(document.body,"lconnNonVerticalScrollableBody");
}
},_onModalDialogShown:function(){
this._modalDialogShowing=true;
this._enablePageScrollbar();
},_onModalDialogClosed:function(){
this._modalDialogShowing=false;
this._disablePageScrollbar();
this._adjustHeight();
},_onWindowResize:function(){
console.log("Scrollable received resize event. ");
this._adjustHeight();
},_onScroll:function(){
console.log("Scrollable received onscroll event. ");
this._adjustHeight();
},_adjustHeight:function(){
if(!this._isIndependentScrollbarsEnabled()){
return;
}
var vp=dojo.window.getBox();
console.info("view port: l="+vp.l+", t="+vp.t+", w="+vp.w+", h="+vp.h);
if(this._suppressPageScroll&&vp.t>0){
window.scroll(vp.l,0);
vp=dojo.window.getBox();
console.info("view port: l="+vp.l+", t="+vp.t+", w="+vp.w+", h="+vp.h);
}
var _2=dojo.position(this._element);
var _3=vp.h>_2.y?vp.h-_2.y:0;
console.info(this._element.id+".y="+_2.y+", set height="+_3);
this._element.style.height=_3+"px";
dojo.publish("lconn/share/widget/scrollable/adjusted",[this]);
if(_3<this._minHeight){
this._enablePageScrollbar();
}else{
this._disablePageScrollbar();
}
}});
}


;if(!dojo._hasResource["lconn.share.scenes.AbstractSceneRender"]){
dojo._hasResource["lconn.share.scenes.AbstractSceneRender"]=true;
dojo.provide("lconn.share.scenes.AbstractSceneRender");










dojo.declare("lconn.share.scenes.AbstractSceneRender",null,{isbStatics:{isbSubscriber:null,isbInterval:null,isbListener:null},render:function(_1){
var _2=this.app;
var _3=_2?_2.authenticatedUser:null;
var d=_2.document;
var _4=this.activePivot;
var _5=this.defaultSearchScope;
if(_4&&_4.searchScope){
_5=_4.searchScope;
}
var _6=lconn.share.scenehelper.reuseHomeTemplate(d,_2,this._getOptionsToReuseHomeTemplate(_5));
var c=d.getElementById("lotusMain");
var el;
if(_6){
var _7=d.getElementById("lotusColLeft");
var _8=d.getElementById("lconnSideNavBody");
var _9=d.getElementById("lotusSidenav");
if(!_9||_9.parentNode!=_8){
lconn.share.util.html.removeChildren(_8);
this.renderNavigation(d,_8);
}else{
var _a=d.createElement("div");
_a.style.display="none";
c.appendChild(_a);
var _b=_9.nextSibling;
while(_b){
var _c=_b.nextSibling;
_a.appendChild(_b);
_b=_c;
}
lconn.share.util.html.removeChildren(_a);
c.removeChild(_a);
this.updateNavigation(d,_8);
}
if(!_1){
this.renderFilters(d,_8);
}
el=d.getElementById("lotusContent");
lconn.share.util.html.removeChildren(el);
}else{
var _7=d.createElement("div");
_7.id=_7.className="lotusColLeft";
this.renderNavigationGlobalButtons(d,_7);
var _8=d.createElement("div");
_8.id="lconnSideNavBody";
_8.style.boxSizing="border-box";
this.renderNavigation(d,_8);
if(!_1){
this.renderFilters(d,_8);
}
if(_7.firstChild){
dojo.addClass(_8.firstChild,"lotusFirst");
}
this._makeNavigationScrollable(_8);
_7.appendChild(_8);
c.appendChild(_7);
this.renderNavigationHidden(d,c);
el=d.createElement("div");
el.id=el.className="lotusContent";
dijit.setWaiRole(el,"main");
}
this.renderGlobalMessages(d,el);
window.scroll(0,0);
if(!_1){
this.renderHeader(d,el);
var _d=d.createElement("div");
_d.id="scene-body";
this.renderBody(d,_d);
this.renderBodyFooter(d,_d);
el.appendChild(_d);
this._makeSceneBodyScrollable(_d);
}
dojo.publish("lconn/share/scene/render",[this,el]);
c.appendChild(el);
lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage();
if(!this._isFileViewerOpen()){
this.setDefaultFocus();
}
},renderNavigationGlobalButtons:function(d,_e){
},_makeSceneBodyScrollable:function(_f){
},_makeNavigationScrollable:function(_10){
},_getOptionsToReuseHomeTemplate:function(_11){
return {activeTab:this.activeTab,defaultSearchScope:_11};
},_isFileViewerOpen:function(){
var _12=dojo.getObject("ic-share.fileviewer.FileViewer.isOpen");
return dojo.isFunction(_12)&&_12();
},isIsbCompatible:function(){
return true;
},setResponsivePanel:function(){
if(this.isIsbCompatible()){
this._addIndependentScrollStyles();
}else{
this._revertIndependentScrollStyles();
}
},_addIndependentScrollStyles:function(){
},_revertIndependentScrollStyles:function(){
},setDefaultFocus:function(){
var a=this.focusSceneTitle?this.headerLinkNode:this.getActiveNavigationLink();
if(this.app&&this.app.buttonFocusStatus){
if(this.app.buttonFocusStatus.buttonName=="ToggleFollowingFolder"){
var fs=dojo.query(".lotusBtnContainer .lotusBtn[id^=lconn_files_action_more_]");
if(fs&&fs.length==1){
fs[0].focus();
}
this.app.buttonFocusStatus=undefined;
}else{
if(a){
dijit.focus(a);
}
}
}else{
if(a){
dijit.focus(a);
}
this.app.buttonFocusStatus=undefined;
}
},renderGlobalMessages:function(d,el){
var app=this.app;
this.globalMessageContainer=new lconn.share.widget.MessageContainer({messages:app.messages,nls:app.nls,filter:function(m){
return m.isGlobal;
}},el.appendChild(d.createElement("div")));
},renderHeader:function(d,el){
if(lconn.share.util.configUtil.isTitlebarEnabledForNestedFolder(this.app.authenticatedUser)){
this.renderMessages(d,el);
}
var _13=dojo.exists("app.layout.titleBar.sceneHeader",this)?this.app.layout.titleBar.sceneHeader:null;
if(_13){
dojo.empty(_13.sceneTitleNode);
}
this.renderBreadcrumb(d,_13?_13.domNode:el);
var _14=this.headerNode=d.createElement("div");
_14.className="lotusHeader";
_14.id="lotusContentHeader";
if(_13){
this._populateHeader(d,_13.sceneTitleNode);
this.renderHeaderTitle(d,_13.sceneTitleNode);
this.renderHeaderDecorations(d,_13.sceneTitleNode);
}else{
this._populateHeader(d,_14);
var h1=d.createElement("h1");
h1.id="scene-title";
dijit.setWaiState(h1,"live","polite");
this.renderHeaderTitle(d,h1);
this.renderHeaderDecorations(d,h1);
_14.appendChild(h1);
}
this.renderHeaderFilters(d,_14);
el.appendChild(_14);
dojo.publish("lconn/share/scene/header/complete",[this]);
if(!lconn.share.util.configUtil.isTitlebarEnabledForNestedFolder(this.app.authenticatedUser)){
this.renderMessages(d,el);
}
this.renderSceneActions(d,el);
dojo.publish("lconn/share/scene/actions/complete",[this]);
},_populateHeader:function(d,_15){
},getHeaderLink:function(){
return this.getSceneUrl();
},renderHeaderTitle:function(d,el){
var app=this.app;
var _16=this.getHeaderText();
var a=this.headerLinkNode=d.createElement("a");
a.href=this.getHeaderLink();
lconn.share.util.html.breakString(_16,d,a);
dijit.setWaiState(a,"label",_16);
a.title=app.nls.SCENE_TITLE_TOOLTIP;
dojo.addClass(a,"bidiSTT_URL");
if(dojo.isIE){
el.style.width="95%";
}
el.appendChild(a);
},renderBreadcrumb:function(d,el){
},renderBodyFooter:function(d,el){
},renderMessages:function(d,el){
var app=this.app;
this.messageContainer=new lconn.share.widget.MessageContainer({messages:app.messages,filter:function(m){
return !m.isGlobal;
},nls:app.nls},el.appendChild(d.createElement("div")));
},renderHeaderDecorations:function(d,el){
},renderHeaderFilters:function(d,el){
var nls=this.app.nls;
var _17=this.activeFilters||[];
var _18=this.params;
var div=d.createElement("div");
if(_17.length>0){
div.className="lotusFilters2";
div.style.marginTop="10px";
div.appendChild(d.createTextNode(nls.CONTENT.FILTERED_BY));
for(var i=0;i<_17.length;i++){
var _19;
if(_17[i]&&_17[i].removeAppParams){
_19=dojo.clone(_18);
_17[i].removeAppParams(_19);
}else{
_19={};
}
div.appendChild(d.createTextNode("\xa0"));
var a=d.createElement("a");
a.className="lotusFilter";
a.title=nls.CONTENT.REMOVE_FILTER_TOOLTIP;
a.appendChild(d.createTextNode(_17[i].longName));
a.href=this.getSceneUrl(_19);
var img=d.createElement("img");
img.className="lotusDelete";
img.alt=nls.CONTENT.REMOVE_FILTER_ALT;
img.src=dojo.config.blankGif;
dijit.setWaiRole(img,"presentation");
a.appendChild(img);
var _1a=d.createElement("span");
_1a.className="lotusAccess";
_1a.appendChild(d.createTextNode(nls.CONTENT.REMOVE_DISCRIPTION));
a.appendChild(_1a);
var _1a=d.createElement("span");
_1a.className="lotusAltText";
_1a.appendChild(d.createTextNode(lconn.share.util.html.getDirectionCode()+"X"));
a.appendChild(_1a);
div.appendChild(a);
}
if(this.collection){
var _1b=document.createElement("div");
_1b.className="lotusMeta";
this.renderHeaderDescription(d,_1b);
el.appendChild(_1b);
}
}
div.className="lotusMeta";
this.renderHeaderDescription(d,div);
el.appendChild(div);
},renderHeaderDescription:function(d,el){
var ul=d.createElement("ul");
ul.className="lotusInlinelist";
var _1c=this.getHeaderDescription();
if((typeof _1c=="function")||(typeof _1c=="string")){
var li=d.createElement("li");
li.className="lotusFirst";
if(typeof _1c=="function"){
_1c.apply(this,[d,li]);
}else{
if(typeof _1c=="string"){
li.appendChild(d.createTextNode(this.getHeaderDescription()));
}
}
ul.appendChild(li);
}
el.appendChild(ul);
},renderSceneActions:function(d,el){
var _1d=!!this.activeView;
var _1e=this.renderSceneActionButtons(d,el);
if(_1e&&_1e.firstChild){
var _1f=d.createElement("div");
_1f.id="lotusContentSceneActions";
dojo.addClass(_1f,"lconnContentSceneActions");
if(_1d){
this.renderView(d,_1f);
}
_1f.appendChild(_1e);
el.appendChild(_1f);
}else{
if(_1d){
var _20=this.headerNode;
dojo.addClass(_20,"qkrViewControlHeader");
this.renderView(d,_20,true);
}
}
},setActionContext:function(_21){
this.actionContext=_21;
if(this.actionBar){
this.actionBar.selectionChanged(this.actionSelection,this.actionContext);
}
},setActionSelection:function(_22){
this.actionSelection=_22;
if(this.actionBar){
this.actionBar.selectionChanged(this.actionSelection,this.actionContext);
}
},renderSceneActionButtons:function(d,el){
if(!this.listActions||!this.listActions.length){
return null;
}
var div=d.createElement("div");
div.className="lotusBtnContainer";
this.actionSelection=[];
this.actionBar=new com.ibm.social.layout.widget.ActionBar({actions:this.listActions,selection:this.actionSelection,context:this.actionContext},div);
return div;
},setActionContainerVisibility:function(_23){
if(this.actionBar){
this.actionBar.setActionBarButtonContainerVisibility(_23);
}
},renderNavigationHidden:function(d,el){
var _24=d.createElement("div");
_24.className="lotusHidden leftColBackgroundPlaceholder";
_24.id="leftColBgPlaceholder";
_24.innerHTML="&nbsp;";
el.appendChild(_24);
}});
}


;if(!dojo._hasResource["lconn.share.scenes.AbstractList"]){
dojo._hasResource["lconn.share.scenes.AbstractList"]=true;
dojo.provide("lconn.share.scenes.AbstractList");














dojo.declare("lconn.share.scenes.AbstractList",[lconn.share.scenes.AbstractScene,lconn.share.scenes.AbstractSceneRender],{msgNoData:"Nothing to show",hasVisibleItems:false,showActionButtonsWhenEmpty:false,itemsPerPage:10,showCustomColumns:true,constructor:function(_1,_2){
this.app=_1;
this.sceneInfo=_2;
this.highlightItems={};
this.activeFilters=[];
this.params={};
},_byFilterId:function(_3,id){
if(_3){
for(var i=0;i<_3.length;i++){
if(_3[i]&&_3[i].id==id&&(!_3[i].isValid||_3[i].isValid(this.app,this))){
return _3[i];
}
}
}
},_changed:function(_4,_5){
var c={};
var _6=0;
for(var _7 in _4){
if(!_5[_7]){
c[_7]=null;
_6++;
}
}
var _8=0;
for(var _7 in _5){
var o=_5[_7];
if(_4[_7]!=o){
c[_7]=o||null;
_8++;
}
}
return {removed:_6,changed:_8,keys:c};
},_isInfoEqual:function(a,b){
return a.id==b.id&&a.pivot==b.pivot;
},init:function(_9,_a){
this.initFilters(_9,_a);
this.initPaging(_9,_a);
this.initView(_9,_a);
this.initColumns(_9,_a);
this.initSort(_9,_a);
},initPivot:function(_b,_c){
var p=_c.parameters||{};
if(this.pivots){
var _d=_c.pivot||p.pivot;
var _e=dojo.filter(this.pivots,function(_f){
return (!_f.isValid||_f.isValid(_b,this));
},this);
var _10=dojo.filter(_e,function(_11){
return _11.id==_d;
})[0]||_e[0];
if(_10){
this.activePivot=_10;
this.params.pivot=_10.id;
}
}
},initView:function(app,_12){
var p=_12.parameters||{};
if(this.views&&this.views.length>0){
var _13=_12.view||(app.prefs&&app.prefs.getDefaultView?app.prefs.getDefaultView():null);
var _14=dojo.filter(this.views,function(_15){
return (!_15.isValid||_15.isValid(app,this));
},this);
var _16=dojo.filter(_14,function(_17){
return _17.id==_13;
})[0]||dojo.filter(this.views,function(_18){
return _18.isDefault;
})[0]||_14[0];
if(_16){
this.activeView=_16;
}
}
},initSort:function(app,_19){
var p=_19.parameters||{};
if(this.sorts){
var _1a=p.sort;
var _1b=dojo.filter(this.sorts,this.isSortValid||function(_1c){
return (!_1c.isValid||_1c.isValid(app,this));
},this);
var _1d=dojo.filter(_1b,function(_1e){
return _1e.id==_1a;
})[0]||this.defaultSort||_1b[0];
if(_1d){
this.activeSort=_1d;
this.sortId=_1d.id;
this.sortReversed=(p.reverse=="1");
this.params.sort=_1d.id;
this.params.sortReversed=this.sortReversed?"1":null;
}
}
},initColumns:function(app,_1f){
var arr=this.supportedColumns;
if(arr){
var _20=this.sorts=[];
var _21=this.defaultColumns={};
for(var i=0,col;col=arr[i];i++){
var cid=col.id;
if(col.isDefault){
_21[cid]=1;
}
if(col.isSortable){
var _22=app?app.authenticatedUser:null;
if(lconn.share.util.configUtil.isNestedFolderEnabled(_22)&&_1f.collectionId&&col.sC){
col.sC="all";
}
_20.push(col);
if(cid==this.defaultSortId){
this.defaultSort=col;
}
}
}
}
},initPaging:function(app,_23){
var p=_23.parameters||{};
if(p.page>1){
this.initialPage=this.params.page=p.page;
}else{
this.initialPage=1;
this.params.page=null;
}
this.itemsPerPage=this.getListPageSize()||10;
},initFilters:function(app,_24){
},end:function(_25){
this.list=null;
this.inherited(arguments);
},refresh:function(_26){
var _27=this.sceneInfo;
if(!_26||!this._isInfoEqual(_27,_26)){
return false;
}
var p=_26?_26.parameters:null;
if(p){
var c=this._changed(_27.parameters,p,1);
var d=c.changed+c.removed;
if(d>1){
return false;
}
if(d==0){
this.sceneInfo=_26;
this.update();
return true;
}
if(typeof c.keys.page!="undefined"){
this.sceneInfo=_26;
this.initPaging(this.app,_26);
this.update();
return true;
}
return false;
}
this.sceneInfo=_26;
this.update();
return true;
},update:function(_28){
},updateList:function(url){
if(this.activeView!=null&&typeof this.activeView!=undefined&&this.activeView.id=="grid"){
url=url+"&preview=true";
}
this.app.net.get({url:url,handle:dojo.hitch(this,this.loadListData),timeout:this.timeout,auth:{preventLogin:this.preventListLogin,secured:this.listSecured},handleAs:this.handleAs||"xml"});
},handlePastLastPage:function(_29){
if(_29.isPastEnd()){
var url=_29.getLastPageUrl();
this.updateList(url);
return true;
}
return false;
},loadListData:function(_2a,_2b){
if(_2a instanceof Error){
this.loadListError(_2a,_2b);
}else{
var _2c=this.listData={xml:_2a.documentElement,url:_2b.url};
var _2d=_2c.paging=new lconn.share.widget.StreamPaging({apiType:this.apiType});
_2d.detect(_2b.url,_2a.documentElement);
if(_2d.isPastEnd()){
var p=dojo.clone(this.params);
p.page=_2d.getLastPage();
this.update(p);
}else{
this.loadListSuccess(_2c,_2a,_2b);
}
}
dojo.publish("lconn/share/scene/loadListData",[this]);
},loadListSuccess:function(_2e,_2f,_30){
if(this.list){
this.list.update(_2e);
}
},loadListError:function(_31,_32){
var _33;
if(_31.code=="cancel"){
_33={message:this.app.nls.CONTENT.ERROR_REQUEST_CANCELLED,type:"requestCancelled"};
}else{
if(_31.code=="timeout"){
_33={message:this.app.nls.CONTENT.ERROR_REQUEST_TIMEOUT,type:"serverNotResponding"};
}else{
if(_31.code=="ItemNotFound"){
_33={message:this.msgNoData,type:"noFiles"};
}else{
_33={message:this.app.nls.CONTENT.ERROR_REQUEST_UNKNOWN,type:"unknown"};
}
}
}
this.listData={error:_33,url:_32.url};
if(this.list){
this.list.update(this.listData);
}
},onListUpdate:function(_34){
var _35=!!this.hasVisibleItems;
var _36=(_34.paging.total!=0);
if(_35!=_36){
this.hasVisibleItems=_36;
this.onListItemsVisible(_36);
}
},onListItemsVisible:function(_37){
if(this.setActionContainerVisibility){
this.setActionContainerVisibility(_37);
}
var _38=_37?"":"none";
dojo.query("._qkrHideWhenEmpty").forEach(function(el){
el.style.display=_38;
});
this.addPanelClassWhenEmpty(_37);
},hideElementWhenEmpty:function(el){
if(this.setActionContainerVisibility){
this.setActionContainerVisibility(this.hasVisibleItems);
}
dojo.addClass(el,"_qkrHideWhenEmpty");
el.style.display=this.hasVisibleItems?"":"none";
},addPanelClassWhenEmpty:function(_39){
dojo.query(".lotusContent").toggleClass("filesListFilled",_39);
},_findById:function(id){
var map=dojo.getObject("list.data.itemById",false,this);
return map?map[id]:null;
},getListUrl:function(_3a){
return null;
},getListOptions:function(_3b){
var p={};
_3b=_3b||{};
var _3c=_3b.unpaged;
if(_3c){
p.format=null;
p.basicAuth=true;
p.nonPersonal=true;
}else{
p.page=Math.max(_3b.page||this.initialPage||1,1);
p.pageSize=(_3b.items)?_3b.items:this.getListPageSize();
}
if(this.activeSort&&!_3b.noSort){
p.sortKey=this.activeSort.sK;
var _3d=!this.activeSort.lowToHigh;
if(this.sortReversed){
_3d=!_3d;
}
p.sortDescending=_3d;
if(this.activeSort.sC){
p.sortCategory=this.activeSort.sC;
}
}
for(var i=0;i<this.activeFilters.length;i++){
var _3e=this.activeFilters[i];
if(_3e.setServiceOptions){
_3e.setServiceOptions(p,this);
}
}
if(this.activePivot&&this.activePivot.setServiceOptions){
this.activePivot.setServiceOptions(p,this);
}
return p;
},getListPageSize:function(){
if(this.app.prefs&&this.app.prefs.getListPageSize){
return this.app.prefs.getListPageSize();
}
return this.itemsPerPage;
},setListPageSize:function(_3f){
if(this.app.prefs&&this.app.prefs.setListPageSize){
this.app.prefs.setListPageSize(_3f);
}else{
this.itemsPerPage=_3f;
}
},renderView:function(d,el,_40){
var _41=this.views;
var _42=this.activeView;
var app=this.app;
var _43=this;
var _44=dojo.filter(_41,function(_45){
return !_45.isValid||_45.isValid(app,_43);
});
if(_44.length<=1){
return;
}
var _46=d.getElementById("qkrViewControl");
if(_46){
lconn.share.util.html.removeChildren(_46);
}
if(_46){
_40=dojo.hasClass(_46,"qkrViewControlInline");
}
var _47=_46?_46:d.createElement("table");
_47.id="qkrViewControl";
dijit.setWaiRole(_47,"presentation");
_47.cellPadding="0";
_47.className="lotusViewControl";
if(_40){
dojo.addClass(_47,"qkrViewControlInline");
if(dojo.hasClass(dojo.body(),"dijit_a11y")){
dojo.addClass(_47,"lotusRight");
}else{
_47.style.position="absolute";
_47.style.bottom="0";
_47.style[dojo._isBodyLtr()?"right":"left"]="0";
}
}else{
dojo.addClass(_47,"lotusRight");
}
var _48=d.createElement("tbody");
var _49=this.app.nls.CONTENT.VIEW_SELECTION;
var tr=d.createElement("tr");
var td=d.createElement("td");
td.appendChild(d.createTextNode(_49+"\xa0"));
tr.appendChild(td);
var _4a;
var td=d.createElement("td");
var div=d.createElement("div");
dijit.setWaiRole(div,"toolbar");
dijit.setWaiState(div,"label",_49);
var _4b=null;
var _4c=-1;
for(var i=0;i<_44.length;i++){
var _4d=_44[i];
if(_4d.customize){
_4a=_4d;
}
var _4e=(_4d==_42);
var a=d.createElement("a");
a.className="lotusSprite lotusView lotus"+_4d.img+(_4e?"On":"Off");
a.title=_4d.tooltip;
a.href="javascript:;";
dojo.connect(a,"onclick",dojo.hitch(this,this.changeView,_4d.id));
dijit.setWaiRole(a,"button");
if(_4e){
dijit.setWaiState(a,"disabled",true);
_4b=a;
_4c=i;
}
dijit.setWaiState(a,"label",_4d.name);
var _4f=d.createElement("span");
_4f.className="lotusAltText "+(_4e?"lotusBold":"");
_4f.appendChild(d.createTextNode(_4d.name));
a.appendChild(_4f);
div.appendChild(a);
}
new lconn.core.aria.Toolbar(div,{selIdx:_4c});
td.appendChild(div);
tr.appendChild(td);
if(_4a&&this.customizeViews&&this.activeView.id=="summary"){
var td=d.createElement("td");
var a=d.createElement("a");
a.title=_4a.cTooltip;
a.className="lotusIndent10 lotusAction";
a.href="javascript:;";
a.appendChild(d.createTextNode(this.app.nls.CONTENT.VIEW_SELECTION_CUSTOMIZE));
dijit.setWaiRole(a,"button");
td.appendChild(a);
this.connect(a,"onclick",this,"customizeViews");
tr.appendChild(td);
}
_48.appendChild(tr);
_47.appendChild(_48);
dijit.focus(_4b);
this.hideElementWhenEmpty(_47);
if(!_46){
el.appendChild(_47);
}
this.addPanelClassWhenEmpty(this.hasVisibleItems);
},onViewOptionsChanged:function(_50){
if(_50.isValid&&!_50.isValid(this.app,this)){
return;
}
var _51=(_50==this.activeView);
if(!_51){
this.changeView(_50.id);
}else{
if(this.listData._isUpdated){
this.update();
}else{
this.list.update(this.listData);
}
}
},_setView:function(_52){
if(this.list){
this.list.view=_52;
if(this.list.renderer){
this.list.renderer.view=_52;
}
}
},onKeypress:function(e){
if(this.list){
if(this.qkPreviousPage&&e.keyChar==this.qkPreviousPage){
this.list.previous();
}else{
if(this.qkNextPage&&e.keyChar==this.qkNextPage){
this.list.next();
}else{
if(this.qkFirstPage&&e.keyChar==this.qkFirstPage){
this.list.page(1);
}else{
if(this.qkLastPage&&e.keyChar==this.qkLastPage){
this.list.lastPage();
}
}
}
}
}
},changeView:function(_53,e){
if(e){
dojo.stopEvent(e);
}
if(this.activeView&&this.activeView.id==_53){
return;
}
if(this.views&&this.views.length>0){
if(this.app.prefs&&this.app.prefs.setDefaultView){
this.app.prefs.setDefaultView(_53);
}
var _54=_53;
this.activeView=lconn.share.util.misc.indexById(this.views,"id",_54);
if(!this.activeView||(this.activeView.isValid&&!this.activeView.isValid(this.app,this))){
this.activeView=dojo.filter(this.views,function(_55){
return _55.isDefault;
})[0]||this.views[0];
}
this._setView(this.activeView.id);
this.renderView(this.app.d);
}else{
return;
}
if(this.listData._isUpdated){
this.update();
}else{
this.list.update(this.listData,{dataInited:true});
}
},setPageSize:function(_56,e){
if(e){
dojo.stopEvent(e);
}
if(_56<1){
return;
}
this.setListPageSize(_56);
this.update();
},page:function(_57,e){
if(e){
dojo.stopEvent(e);
}
if(_57<1||_57!=parseInt(_57)){
_57=1;
}
var p=dojo.clone(this.params);
p.page=_57!=1?_57:null;
this.update(p);
},nextPage:function(e){
if(e){
dojo.stopEvent(e);
}
if(this.listData.paging.hasNext()){
var _58=this.listData.paging.getNextPage();
var p=dojo.clone(this.params);
p.page=_58!=1?_58:null;
this.update(p);
}
},previousPage:function(e){
if(e){
dojo.stopEvent(e);
}
if(this.listData.paging.hasPrevious()){
var _59=this.listData.paging.getPreviousPage();
var p=dojo.clone(this.params);
p.page=_59!=1?_59:null;
this.update(p);
}
}});
}


;if(!dojo._hasResource["lconn.share.widget.QuotaText"]){
dojo._hasResource["lconn.share.widget.QuotaText"]=true;
dojo.provide("lconn.share.widget.QuotaText");






dojo.declare("lconn.share.widget.QuotaText",[dijit._Widget],{defer:false,labelDefer:null,delayClick:200,size:NaN,totalSize:NaN,buildRendering:function(){
var d=document;
var el=this.domNode=this.srcNodeRef;
lconn.share.util.html.removeChildren(el);
this.updateText();
},onClick:function(e){
if(this.defer){
this.load();
}
this.defer=false;
if(!this._clickDelay){
if(isNaN(this.size)){
this._clickDelay=setTimeout(dojo.hitch(this,"updateText"),this.delayClick);
}else{
this.updateText();
}
}
},clearTimer:function(){
clearTimeout(this._clickDelay);
this._clickDelay=null;
},update:function(_1,_2){
this.clearTimer();
this.size=_1;
this.totalSize=_2;
this.showError=false;
this.updateText();
},error:function(_3){
this.clearTimer();
this.size=this.totalSize=NaN;
this.err=_3;
this.showError=true;
this.updateText();
},updateText:function(){
this.clearTimer();
var d=document;
var _4=this._strings;
var _5=this.size;
var _6=this.totalSize;
var el=this.domNode;
var _4=this._strings;
lconn.share.util.html.removeChildren(el);
if(!isNaN(_5)){
if(_6>0){
if(_5<=_6){
s=dojo.string.substitute(_4.LABEL_QUOTA,{person:this.userName,size:lconn.share.util.text.formatSize(this._sizeStrings,_6-_5),total:lconn.share.util.text.formatSize(this._sizeStrings,_6)});
}else{
s=dojo.string.substitute(_4.LABEL_QUOTA_EXCEEDED,{person:this.userName,size:lconn.share.util.text.formatSize(this._sizeStrings,_5-_6),total:lconn.share.util.text.formatSize(this._sizeStrings,_6)});
}
el.appendChild(d.createTextNode(s));
}else{
if(!this.hideUnlimited){
s=dojo.string.substitute(_4.LABEL_UNLIMITED,{person:this.userName,size:lconn.share.util.text.formatSize(this._sizeStrings,_5)});
el.appendChild(d.createTextNode(s));
}
}
}else{
if(this.showError){
el.appendChild(d.createTextNode(_4.LABEL_ERROR));
}else{
if(this.defer){
var a=d.createElement("a");
a.href="javascript:;";
a.appendChild(d.createTextNode(this.labelDefer));
this.connect(a,"onclick","onClick");
el.appendChild(a);
}else{
el.appendChild(d.createTextNode(_4.LOADING));
}
}
}
}});
}


;if(!dojo._hasResource["lconn.files.scenes.AbstractUserLibraryScene"]){
dojo._hasResource["lconn.files.scenes.AbstractUserLibraryScene"]=true;
dojo.provide("lconn.files.scenes.AbstractUserLibraryScene");


dojo.declare("lconn.files.scenes.AbstractUserLibraryScene",null,{handleChannelError:function(_1,_2){
if(!_1||!this.isCurrentScene()){
return;
}
if(_1=="InvalidUser"||_1=="ItemNotFound"){
this.showPlaceDoesNotExist();
}else{
if(_1=="CanNotProvisionItem"){
if(!_2){
this.showError();
return;
}
this.user=_2;
this.user.hasPersonalPlace=false;
this.showNoPersonalFiles(this.user);
}else{
if(_1=="ItemNotYetProvisioned"){
if(!_2){
this.showError();
return;
}
this.user=_2;
this.user.hasPersonalPlace=null;
this.showNotLoggedInPlace(this.user);
}else{
if(_1=="AccessDenied"){
if(!_2){
var _3=this.userId;
if(!_3){
this.showError();
return;
}
_2={"id":_3};
}
this.app.navigate(this.app.routes.getUserSharesUrl({pivot:"withme",byuser:_2}));
}else{
if(_1=="unauthenticated"){
this.app.login();
}else{
this.showError();
}
}
}
}
}
},showNoPersonalFiles:function(_4){
var _5=this.app;
var d=_5.document;
var _6=this.isPersonalHome;
var _7=_5.authenticatedUser;
this.user=_4;
var _8,_9;
_8=dojo.string.substitute(_5.nls.PIVOTS.MEDIA_WINDOWTITLE,{name:_4.name,user:_4.name,possessive:lconn.share.util.text.possessive(_4.name)});
_9=dojo.string.substitute(_5.nls.PIVOTS.MEDIA_LONG,{name:_4.name,user:_4.name,possessive:lconn.share.util.text.possessive(_4.name)});
d.title=_8;
this.render(true);
var el=d.getElementById("lotusContent");
var _a=d.createElement("div");
_a.className="lotusHeader";
if(lconn.share.util.configUtil.isNestedFolderEnabled(this.app.authenticatedUser)&&!lconn.share.util.configUtil.isTitlebarEnabledForNestedFolder(this.app.authenticatedUser)){
var _b=d.createElement("div");
dojo.addClass(_b,"lotusTitleBar");
lconn.share.scenehelper.applySearchBox(d,_b,this.app,{});
_a.appendChild(_b);
}
var h1=d.createElement("h1");
h1.id="scene-title";
h1.appendChild(d.createTextNode(_9));
_a.appendChild(h1);
el.appendChild(_a);
var _c=(_6)?_5.nls.CONTENT.YOU_HAVE_NO_PLACE:_5.nls.CONTENT.USER_HAS_NO_PLACE;
var _d=d.createElement("div");
var p=d.createElement("p");
p.appendChild(d.createTextNode(dojo.string.substitute(_c.MSG1,[_4.name])));
_d.appendChild(p);
if(_c.MSG2){
var p=d.createElement("p");
p.appendChild(d.createTextNode(_c.MSG2));
_d.appendChild(p);
}
el.appendChild(_d);
},showPlaceDoesNotExist:function(){
var _e=this.app.authenticatedUser;
var d=this.app.document;
d.title=this.app.nls.WINDOWTITLE.USERHOMEERROR;
var _f=this.app.nls.CONTENT.PLACE_NOT_FOUND;
lconn.files.scenehelper.applyGenericWarning(this.app,_f.TITLE,_f.MESSAGES,[[this.app.nls.USERSEARCH.ERROR_LINK,this.app.routes.getUserSearchUrl()]]);
},showLogoutWarning:function(){
var app=this.app;
lconn.files.scenehelper.applyLogoutWarning(app);
},showUserSearch:function(){
var app=this.app;
var d=app.document;
var _10,_11,_12;
_10=app.nls.PIVOTS.MEDIA;
_11=app.nls.PIVOTS.MEDIA;
_12=app.nls.CONTENT.SEARCH_FOR_USER.FILES;
d.title=_10;
this.render(true);
var el=d.getElementById("lotusContent");
var _13=d.createElement("div");
_13.className="lotusHeader";
var h1=d.createElement("h1");
h1.id="scene-title";
h1.appendChild(d.createTextNode(_11));
_13.appendChild(h1);
el.appendChild(_13);
var div=d.createElement("div");
var p=d.createElement("p");
p.appendChild(d.createTextNode(_12));
div.appendChild(p);
el.appendChild(div);
},showNotLoggedInPlace:function(_14){
var app=this.app;
var d=app.document;
var _15=app.authenticatedUser;
this.user=_14;
var _16,_17;
var s=_14.name;
var _18=false;
if(s&&s[s.length-1]=="s"){
_18=true;
}
_16=dojo.string.substitute(_18?app.nls.PIVOTS.MEDIA_WINDOWTITLE_X:app.nls.PIVOTS.MEDIA_WINDOWTITLE,{possessive:_14.name});
_17=dojo.string.substitute(_18?app.nls.PIVOTS.MEDIA_LONG_X:app.nls.PIVOTS.MEDIA_LONG,{possessive:_14.name});
d.title=_16;
this.render(true);
var el=d.getElementById("lotusContent");
var _19=d.createElement("div");
_19.className="lotusHeader";
var h1=d.createElement("h1");
h1.id="scene-title";
h1.appendChild(d.createTextNode(_17));
_19.appendChild(h1);
el.appendChild(_19);
var div=d.createElement("div");
var p=d.createElement("p");
p.appendChild(d.createTextNode(dojo.string.substitute(app.nls.CONTENT.USER_NEVER_LOGGED_IN.MSG1,[_14.name])));
div.appendChild(p);
var p=d.createElement("p");
p.appendChild(d.createTextNode(app.nls.CONTENT.USER_NEVER_LOGGED_IN.MSG2));
div.appendChild(p);
el.appendChild(div);
},renderQuota:function(d,el){
var app=this.app;
var _1a=this.user;
var _1b=app.authenticatedUser;
var _1c=(_1a.hasPersonalPlace==true);
var _1d=(_1b&&_1b.id==_1a.id);
var _1e=(_1b&&dojo.indexOf(_1b.roles,"admin")!=-1);
var _1f=_1c&&(_1d||_1e);
if(_1f){
var q=app.getQuota();
var nls=app.nls.QUOTA;
var _20=_1d?nls.INFO_OWNER:nls.INFO_ADMIN;
var _21=d.createElement("div");
_21.className="qkrQuota";
dijit.setWaiRole(_21,"complementary");
dijit.setWaiState(_21,"label",_20);
el.appendChild(_21);
if(_1d){
var qw=new lconn.share.widget.QuotaText({_strings:nls.POPUP_PERSONAL,_sizeStrings:app.nls.SIZE,defer:false,labelDefer:_20,size:q.size,totalSize:q.totalSize,trashSize:q.trashSize,hideUnlimited:!_1e},_21.appendChild(d.createElement("span")));
qw.connect(q,"onUpdate","update");
qw.connect(q,"onError","error");
dojo.connect(qw,"onClick",q,"load");
if(q.isExpired()){
q.load();
}
}else{
var qw=new lconn.share.widget.QuotaText({_strings:nls.POPUP,_sizeStrings:app.nls.SIZE,defer:true,labelDefer:_20,userName:_1a.name,load:function(){
app.net.getXml({url:app.routes.getLibraryEntryServiceUrl(_1a.id),handle:dojo.hitch(this,"handleLoad")});
},handleLoad:function(_22,_23){
if(_22 instanceof Error){
this.error(_22);
return;
}
var _24=new lconn.share.bean.Library(_22.documentElement);
this.update(_24.getSize(),_24.getQuota(),_24.getTrashSize());
}},_21.appendChild(d.createElement("span")));
}
if(_1e&&!_1d){
return;
}
this.hideElementWhenEmpty(_21);
}
},setQuotaAlert:function(_25,_26,_27){
var app=this.app;
var _28=dojo.getObject("lconn.files.config.services.quota.thresholdAlert")||0;
if(!isNaN(_26)&&_26>0&&_28>0&&(_26-_25<_28)&&!app.usercache["_prevent_quota_alert"]){
var s;
if(dojo.getObject("lconn.files.config.features.trash")&&_27>(dojo.getObject("lconn.files.config.services.quota.trashThreshold")||500*1000)){
s=dojo.string.substitute(app.nls.QUOTA.ALERT_WARN_TRASH,[lconn.share.util.text.formatSize(_25),lconn.share.util.text.formatSize(_26),lconn.share.util.text.formatSize(_26-_25),lconn.share.util.text.formatSize(_27)]);
}else{
s=dojo.string.substitute(app.nls.QUOTA.ALERT_WARN,[lconn.share.util.text.formatSize(_25),lconn.share.util.text.formatSize(_26),lconn.share.util.text.formatSize(_26-_25)]);
}
app.messages.add({message:s,onClose:function(){
console.log("closed");
app.usercache["_prevent_quota_alert"]=true;
}});
}
}});
}


;if(!dojo._hasResource["lconn.files.scenes.TagWidget"]){
dojo._hasResource["lconn.files.scenes.TagWidget"]=true;
dojo.provide("lconn.files.scenes.TagWidget");








dojo.declare("lconn.files.scenes.TagWidget",[lconn.core.CommonTags.TagWidget],{disableRelated:true,multiSelected:true,tagDialogEnabled:false,redirectWhenClickTag:false,postCreate:function(){
this.inherited(arguments);
var _1=dojo.getObject("app.nls.TAGLIST.NO_TAGS",false,this);
if(_1){
this._noTags.innerHTML="";
this._noTags.appendChild(document.createTextNode(_1));
}
},_createTypeAhead:function(){
lconn.share.util.misc.destroy(dijit.byId(this.id+"commonTagsTypeAhead"));
var _2=this.app;
var _3=this._typeAheadDom;
var _4=dojo.mixin({hideEmptyResults:true,hint:this.rs_searchInputDefault,_strings:_2.nls.TAGGER,store:_2.getTagStore(),"name":this.id+"commonTagsTypeAhead","id":this.id+"commonTagsTypeAhead",selectOnTab:false},this.tagScope||{});
var _5=new lconn.share.widget.TagTypeAhead(_4,_3);
},createAjaxCall:function(){
var _6=this.inherited(arguments);
var _7=this.tagStore;
var _8=this.tagScope;
this.disableRelated=_7.isRelatedTagsDisabled?_7.isRelatedTagsDisabled(_8):this.disableRelated;
_6.getTags=function(_9){
_7.fetch({queryOptions:_8,count:50,key:"weight",order:"dsc",onComplete:_9,onError:_9});
};
return _6;
},createFeedConverter:function(){
return new lconn.files.scenes.TagFeedConverter();
}});
dojo.declare("lconn.files.scenes.TagFeedConverter",[lconn.core.CommonTags.FeedConverter],{parseFeed:function(_a){
if(_a&&!_a.addedWeights){
_a.addedWeights=true;
for(var i=0,_b;_b=_a[i++];){
_b.frequency=_b.weight;
}
}
return _a||[];
},generateTagObject:function(_c){
return _c;
}});
}


;if(!dojo._hasResource["lconn.share.widget.tree.dnd.Source"]){
dojo._hasResource["lconn.share.widget.tree.dnd.Source"]=true;
dojo.provide("lconn.share.widget.tree.dnd.Source");


dojo.declare("lconn.share.widget.tree.dnd.Source",dojo.dnd.Source,{customCanDrop:false,_markTargetAnchor:function(_1){
if(this.current&&this.current.id){
var _2=this.getItem(this.current.id);
if((_2&&_2.type&&_2.type[0]!="folder")){
this.disableDrop();
return;
}
var _3=this.current.parentNode;
var _4=dijit.byId(_3.id);
var _5=dojo.dnd.manager().nodes;
var _6=dojo.dnd.manager().source;
for(var i=0;i<_5.length;i++){
var _7=_5[i];
var _8=(_7&&_7.id)?_6.getItem(_7.id,true):null;
var _9=(_8&&(_8.type[0]=="folder"))?_8.data:null;
if(this.disableDropForItem(_4,_9)){
this.disableDrop();
return;
}
}
this.customCanDrop=true;
}
this.inherited(arguments);
},disableDropForItem:function(_a,_b){
return false;
},disableDrop:function(){
if(this.targetAnchor){
this._removeItemClass(this.targetAnchor,this.before?"Before":"After");
}
this.customCanDrop=false;
},onMouseMove:function(e){
if(dojo.dnd.manager().avatar){
this.inherited(arguments);
}
if(!this.customCanDrop){
var m=dojo.dnd.manager();
if(m&&m.avatar){
m.canDrop(false);
}
}
}});
}


;if(!dojo._hasResource["lconn.files.widget.Navigation"]){
dojo._hasResource["lconn.files.widget.Navigation"]=true;
dojo.provide("lconn.files.widget.Navigation");












dojo.declare("lconn.files.widget.Navigation",dijit._Widget,{baseClass:"lotusMenu",navigation:[],active:null,args:null,loadingDelay:150,initialOpenDelay:400,reopenDelay:3000,jawsWarningMsg:"Page focus will be moved to the main region after selecting this button.",destroy:function(){
this.inherited(arguments);
clearTimeout(this._toOpen);
lconn.share.util.misc.destroy(this.navigation);
this.navigation=null;
lconn.share.util.misc.destroy(this.ariaHelpers);
this.ariaHelpers=null;
},postMixInProperties:function(){
this.activeIds=this.activeIds||{};
this.openIds=this.openIds||{};
},buildRendering:function(){
var el=this.domNode=this.srcNodeRef;
if(this.baseClass){
dojo.addClass(el,this.baseClass);
}
dijit.setWaiRole(el,"navigation");
dijit.setWaiState(el,"label",this.msgNavigationLabel);
this.update();
},update:function(){
var d=document;
var el=this.domNode;
var _1=this.navigation;
var _2=this.active;
var _3=this.args;
this.connect(el,"onclick","onClick");
lconn.share.util.html.removeChildren(el);
lconn.share.util.misc.destroy(this.ariaHelpers);
this.ariaHelpers=[];
var _4=d.createElement("div");
_4.className="lotusBottomCorner";
var _5=d.createElement("div");
_5.className="lotusInner";
var _6=d.createElement("div");
var ul=d.createElement("ul");
for(var i=0;i<_1.length;i++){
var _7=_1[i];
if(_7==null){
_6.className="lotusMenuSection";
if(ul.firstChild){
_6.appendChild(ul);
this._attachHelpers(ul);
}
if(_6.firstChild){
_5.appendChild(_6);
}
_6=d.createElement("div");
ul=d.createElement("ul");
continue;
}
if(_7.hidden){
continue;
}
var _8;
if(_7.loadChildren||_7.control_css){
if(ul.firstChild){
_6.appendChild(ul);
this._attachHelpers(ul);
_5.appendChild(_6);
_6=d.createElement("div");
ul=d.createElement("ul");
}
_8=_6.appendChild(d.createElement("div"));
_8.className="lotusClickable lotusHeading";
dojo.attr(_8,"onselectstart","return false;");
}else{
_8=ul.appendChild(d.createElement("li"));
}
this.createLink(d,_8,_7,i);
}
if(ul.firstChild){
_6.appendChild(ul);
this._attachHelpers(ul);
}
if(_6.firstChild){
_5.appendChild(_6);
}
_4.appendChild(_5);
el.appendChild(_4);
this._tOpen=setTimeout(dojo.hitch(this,"_open"),this.initialOpenDelay);
},_attachHelpers:function(ul){
dijit.setWaiRole(ul,"toolbar");
dijit.setWaiState(ul,"controls","lotusContent");
dijit.setWaiState(ul,"label",this.msgToolbarLabel);
if(ul.firstChild!=ul.lastChild){
this.ariaHelpers.push(new lconn.core.aria.Toolbar(ul,{_isSelected:function(_9){
return _9.parentNode&&dojo.hasClass(_9.parentNode,"lotusSelected");
}}));
}
},_open:function(){
dojo.forEach(this.navigation,function(n){
if(n&&n.control&&this.openIds[n.id]){
n.control.open();
}
},this);
},open:function(_a){
this.openIds=_a||{};
this._open();
},setActive:function(_b){
this.activeIds=_b||{};
var f=function(n){
var _c=!!(n._id&&this.activeIds[n._id]);
if(_c==dojo.hasClass(n,"lotusSelected")){
return;
}
if(_c){
dojo.addClass(n,"lotusSelected");
}else{
dojo.removeClass(n,"lotusSelected");
}
var _d=n.getElementsByTagName("a");
for(var i=0,_e=null;_e=_d[i];i++){
if(_c){
this.activeLink=_e;
var _f="selected. ";
if(_e&&_e.firstChild&&_e.firstChild.innerHTML){
_f="selected "+_e.firstChild.innerHTML+". ";
}
dijit.setWaiState(_e,"label",_f+this.jawsWarningMsg);
}else{
dijit.setWaiState(_e,"label",this.jawsWarningMsg);
}
}
};
dojo.forEach(this.domNode.getElementsByClassName("lotusHeading"),f,this);
dojo.forEach(this.domNode.getElementsByTagName("li"),f,this);
},getActiveLink:function(){
return this.activeLink;
},createLink:function(d,_10,_11,i){
_10._id=_11.id;
if(_11.className){
dojo.addClass(_10,_11.className);
}
var _12=!!this.activeIds[_11.id];
var a=d.createElement("a");
dijit.setWaiRole(a,"button");
if(i>=0){
a._index=i;
}
if(_11.loadChildren){
if(_12){
dojo.addClass(_10,"lotusSelected");
}
var id=_10.id=_11.isExpandable?dijit.getUniqueId("menu"):dijit.getUniqueId("label");
if(_11.isExpandable){
_11.control=new lconn.files.widget.NavigationControl(this,_11,a);
var _13=true;
a._titleClosed=_11.msgOpen;
a._titleOpen=_11.msgCollapse;
var s=_13?a._titleClosed:a._titleOpen;
a.title=s;
a.href="javascript:;";
a.className="lotusSprite lotusArrow"+(_13?" lotusTwistyClosed":" lotusTwistyOpen");
dijit.setWaiRole(a,"button");
dijit.setWaiState(a,"expanded",!_13);
dijit.setWaiState(a,"label",s);
var _14=d.createElement("span");
_14.className="lotusHidden";
_14.appendChild(d.createTextNode(s));
a.appendChild(_14);
var _15=a.altNode=d.createElement("span");
_15.className="lotusAltText";
_15.appendChild(d.createTextNode(_13?(dojo._isBodyLtr()?"\u25ba":"\u25c4"):"\u25bc"));
dijit.setWaiRole(_15,"presentation");
a.appendChild(_15);
_10.appendChild(a);
_10._expands=a._expands=true;
_10._index=a._index;
var _16=_11.control.getContainer();
a.id=id+"_expandLink";
_16.id=id+"_childContainer";
_11.domNode=_16;
dijit.setWaiState(_10,"label",_11.name);
dijit.setWaiState(a,"controls",_16.id);
}
var url=(_11.getUrl)?_11.getUrl.apply(_11,args):_11.url;
var _17=d.createElement((url)?"a":"span");
if(_11.tooltip){
_17.title=_11.tooltip;
}
if(url){
_17.href=_11.url;
dijit.setWaiRole(_17,"button");
if(_12){
this.activeLink=_17;
dijit.setWaiState(_17,"label","selected "+_11.name+". "+this.jawsWarningMsg);
}else{
dijit.setWaiState(_17,"label",this.jawsWarningMsg);
}
}
_17._index=a._index;
_17.name="title";
lconn.share.util.html.breakString(_11.name,d,_17);
_10.appendChild(_17);
_17.id=id+"_label";
if(dojo.isIE<9){
_17.style.paddingLeft="14px";
}
}else{
if(_12){
dojo.addClass(_10,"lotusSelected");
}
if(_11.tooltip){
a.title=_11.tooltip;
}else{
if(_11.description){
a.title=_11.description;
}
}
var url=(_11.getUrl)?_11.getUrl.apply(_11,args):_11.url;
a.href=url||"javascript:;";
if(_12){
dijit.setWaiState(a,"label","selected "+_11.name+". "+this.jawsWarningMsg);
}else{
dijit.setWaiState(a,"label",this.jawsWarningMsg);
}
if(_12){
this.activeLink=a;
}
var _17=d.createElement("span");
lconn.share.util.html.breakString(_11.name,d,_17);
a.appendChild(_17);
_17.className="bidiAware";
_10.appendChild(a);
}
if(typeof _11.decorate=="function"){
_11.decorate(_11,a,this);
}
_10.appendChild(d.createTextNode(" "));
if(_11.dndEnabled){
this.setupDnd(_11,_10);
}
},onClick:function(e){
var el=e.target;
if(!el){
return;
}
if(el.nodeName){
var nn=el.nodeName.toLowerCase();
var _18=el;
while(!(nn=="a"||nn=="h3"||nn=="div")){
if(!_18.parentNode){
return;
}
_18=_18.parentNode;
nn=_18.nodeName.toLowerCase();
}
if(_18._expands){
dojo.stopEvent(e);
var _19=this.navigation[_18._index];
_19.control.toggle();
}else{
if(typeof _18._loadArg!="undefined"){
dojo.stopEvent(e);
var _19=this.navigation[_18._index];
_19.control.load(_18._loadArg);
}
}
}
},setupDnd:function(_1a,_1b){
if(!lconn.core.config.features("files-tree-dnd")||!lconn.core.auth.isAuthenticated()){
return;
}
var _1c=document.createElement("div");
dojo.addClass(_1c,"dojoDndItem");
dojo.attr(_1c,"dndType","folder");
var _1d=_1b.childElementCount;
for(var i=0;i<_1d;i++){
_1c.appendChild(_1b.children[0]);
}
_1b.appendChild(_1c);
var _1e=lconn.core.config.features("files-tree-dnd-accepts-folders")?["folder"]:[];
var _1f=this._dndSource=new lconn.share.widget.tree.dnd.Source(_1b,{accept:_1e,selfAccept:true,copyOnly:true,onDrop:dojo.hitch(this,function(_20,_21,_22){
_1a.dropFile(null,_20,_21,_22);
}),disableDropForItem:dojo.hitch(this,function(_23,_24){
if(_24.getParentId()){
return false;
}else{
return true;
}
})});
}});
dojo.declare("lconn.files.widget.NavigationControl",null,{isOpen:false,_hasTree:false,lastClosed:0,constructor:function(nav,_25,_26){
this.item=_25;
this.nav=nav;
this.domNode=_26;
},toggle:function(){
if(!this.isOpen){
this.open();
}else{
this.isOpen=false;
var el=this.getContainer();
el.style.display="none";
lconn.files.scenehelper.toggleSection.apply(this.domNode,[true,false]);
this.lastClosed=new Date().getTime();
}
},open:function(){
if(this.isOpen){
return;
}
this.isOpen=true;
if(this.isExpired()){
this.load();
}
var el=this.getContainer();
el.style.display="";
lconn.files.scenehelper.toggleSection.apply(this.domNode,[true,false]);
if(!this.getContainer().firstChild&&this.req){
setTimeout(dojo.hitch(this,this.loading),this.nav.loadingDelay);
}
},isExpired:function(){
var _27=(new Date().getTime()-this.lastClosed)<this.nav.reopenDelay;
return !this.loaded||_27||(this.item.isExpired?this.item.isExpired(this.lastUpdate,this):false);
},expire:function(){
this.lastUpdate=0;
},load:function(_28){
if(this.req){
return;
}
if(typeof _28!="undefined"){
this.loadArg=_28;
}
var dfd=this.req=this.item.loadChildren(this.loadArg);
if(dfd){
dfd.addBoth(this,"handleLoad");
}
},handleLoad:function(_29){
this.req=null;
this.loaded=false;
this.lastUpdate=new Date().getTime();
if(_29 instanceof Error){
this.error(_29);
}else{
this.loaded=true;
this.update(_29||[]);
}
lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage();
},getContainer:function(){
if(!this.containerNode){
var d=document;
var div=this.containerNode=d.createElement("div");
div.className="lotusMenuSubsection";
div.style.display="none";
dojo.place(div,this.domNode.parentNode,"after");
}
return this.containerNode;
},update:function(_2a){
if(_2a.length==0){
this.empty();
return;
}
var d=document;
var _2b=this.item;
var el=this.getContainer();
var _2c={};
var _2d={};
var _2e=this.previousChildren||{};
var _2f=this.previousItems||{};
var ul=el.firstChild;
if(!ul||!ul.nodeName||ul.nodeName.toLowerCase()!="ul"){
ul=d.createElement("ul");
lconn.share.util.html.removeChildren(el);
}
if(this.item.listClass){
dojo.addClass(ul,this.item.listClass);
}
var _30=_2a.hasMore||typeof this.loadArg!="undefined";
var _31;
if(ul.lastChild&&ul.lastChild._more){
_31=ul.lastChild;
var a=_31.firstChild;
a.removeChild(a.firstChild);
ul.removeChild(_31);
}else{
if(_30){
var li=_31=d.createElement("li");
li._more=true;
var a=d.createElement("a");
a.className="lotusAction";
a.title=_2b.msgToggleTooltip||this.nav.msgToggleTooltip;
a.href="javascript:;";
a._index=this.domNode._index;
li.appendChild(a);
}
}
for(var i=0,_32=_2a.length;i<_32;i++){
var _33=_2a[i];
var id=_33.id;
var old=_2e[id];
var _34=_2f[id];
_2d[id]=_33;
if(old&&(!_33.equals||_33.equals(_34))){
_2c[id]=old;
delete _2e[id];
}else{
var li=d.createElement("li");
this.nav.createLink(d,li,_33);
_2c[id]=li;
}
}
for(var id in _2e){
var li=_2e[id];
li.parentNode.removeChild(li);
}
for(var i=0,_32=_2a.length;i<_32;i++){
var _33=_2a[i];
var id=_33.id;
var old=_2c[id];
var _35=old.parentNode;
if(_35){
_35.removeChild(old);
}
ul.appendChild(old);
}
if(_30){
var a=_31.firstChild;
a._loadArg=!(this.loadArg);
a.appendChild(d.createTextNode(this.loadArg?(_2b.msgLess||this.nav.msgLess):(_2b.msgMore||this.nav.msgMore)));
ul.appendChild(_31);
dijit.setWaiRole(a,"button");
dijit.setWaiState(a,"expanded",!!this.loadArg);
dijit.setWaiState(a,"label",this.loadArg?(_2b.msgLessAlt||this.nav.msgLessAlt):(_2b.msgMoreAlt||this.nav.msgMoreAlt));
}
if(!ul.parentNode||ul.parentNode.nodeType==11){
el.appendChild(ul);
}
this.previousChildren=_2c;
this.previousItems=_2d;
this.item.attachDragTarget(ul,_2a);
},loading:function(){
var el=this.getContainer();
if(!el.firstChild){
var div=document.createElement("div");
div.className="XlotusSubsectionInfo";
div.appendChild(document.createTextNode(this.nav.msgLoading));
el.appendChild(div);
el.style.display="";
}
},empty:function(){
var el=this.getContainer();
this.previousChildren=this.previousItems=null;
lconn.share.util.html.removeChildren(el);
var div=document.createElement("div");
div.className="XlotusSubsectionInfo";
var _36=this.item;
if(_36.renderEmpty){
_36.renderEmpty(div);
}else{
div.appendChild(document.createTextNode(_36.msgEmpty||this.nav.msgEmpty));
}
el.appendChild(div);
},error:function(_37){
this._hasTree=false;
var el=this.getContainer();
this.previousChildren=this.previousItems=null;
var msg=_37?_37.navMessage:null;
msg=msg||this.msgError||this.nav.msgError;
lconn.share.util.html.removeChildren(el);
var div=document.createElement("div");
div.className="XlotusSubsectionInfo";
div.appendChild(document.createTextNode(msg));
el.appendChild(div);
}});
}


;if(!dojo._hasResource["lconn.files.scenes.share"]){
dojo._hasResource["lconn.files.scenes.share"]=true;
dojo.provide("lconn.files.scenes.share");


lconn.files.scenes.share={getVisibility:function(_1){
var _2;
if((!_1.isPublic()&&_1.getLibraryType&&(_1.getLibraryType()=="communityFiles"||_1.getLibraryType()=="communityECMFiles"))||(_1.getType&&_1.getType()=="community")){
_2="community";
}else{
_2=_1.getVisibility();
}
return _2;
},getMessage:function(_3,_4){
var _5=lconn.files.scenes.share;
var _6=_5.getVisibility(_3);
var _7=_3.getOrgName();
if(_3.getShareCount){
var _8=_3.getShareCount();
if(_3.getAllSharesCount&&_3.getAllSharesCount()!=_8){
_8=0;
}
return _5.formatShareMessage(_4,_6,_8,{company:_7});
}
return _5.formatShareMessage(_4,_6,0,{company:_7});
},getFileMessage:function(_9,_a){
var _b=lconn.files.scenes.share;
var _c=_b.getVisibility(_9);
var _d=_9.getShareCount();
var _e=_9.getOrgName();
if(_9.getAllSharesCount()!=_d){
_d=0;
}
return _b.formatShareMessage(_a,_c,_d,{company:_e});
},getFolderMessage:function(_f,nls){
var _10=lconn.files.scenes.share;
var _11=_10.getVisibility(_f);
var _12=_f.getShareCount();
var _13=_f.getOrgName();
if(_f.getAllSharesCount()!=_12){
_12=0;
}
return _10.formatShareMessage(nls,_11,_12,{company:_13});
},formatShareMessage:function(nls,_14,_15,opt){
var _16,_17,_18,_19;
if(_14=="community"){
nls=nls.SHARED.COMMUNITY;
_18=nls.ALT;
_16=nls.BASE;
_19="lconnSprite lconnSprite-iconCommunities16";
}else{
if(_14=="private"){
_18=_16=nls.PRIVATE;
_19="lconnSprite lconnSprite-iconPrivate16";
}else{
if(_14=="public"){
nls=nls.PUBLIC;
_18=nls.BASE;
if(opt&&opt.company!=undefined){
_18=dojo.string.substitute(_18,opt);
}
_19="lconnSprite lconnSprite-iconPublic16";
_16="${0}";
_17=_18;
}else{
nls=nls.SHARED;
_18=nls.BASE;
_19="lconnSprite lconnSprite-iconShared16";
if(_15>1){
_16=nls.MANY;
_17=dojo.string.substitute(nls.MANY_1,[dojo.number.format(_15)]);
}else{
if(_15==1){
_16=nls.ONE;
_17=nls.ONE_1;
}else{
_16="${0}";
_17=nls.BASE;
}
}
}
}
}
return {s:_16,c:_17,i:_19,a:_18};
}};
}


;if(!dojo._hasResource["lconn.files.widget.FolderNavigation"]){
dojo._hasResource["lconn.files.widget.FolderNavigation"]=true;
dojo.provide("lconn.files.widget.FolderNavigation");














dojo.declare("lconn.files.widget.FolderNavigation",null,{initialItems:10,initialExtra:5,allItems:30,maxAge:30*1000,listClass:"lotusIcons",domNode:null,constructor:function(_1,_2){
this.app=_1;
dojo.mixin(this,_2);
this.subscribe();
},subscribe:function(){
this._subFolders=dojo.subscribe("lconn/files/folders/changed",this,"onChange");
},destroy:function(){
dojo.unsubscribe(this._subFolders);
lconn.share.util.misc.destroy(this.dndTarget);
this.dndTarget=null;
},loadChildren:function(_3){
return this.app.net.getJson({url:this.app.routes.getCollectionsListServiceUrl(dojo.mixin({pageSize:(_3?this.allItems:(this.initialItems+this.initialExtra)),includeCount:false,format:"json"},this.serviceArgs)),background:true}).addCallback(dojo.hitch(this,"_handle",_3));
},_handle:function(_4,_5){
var _6;
try{
_6=this.getChildren(_5,_4);
}
catch(e){
return e instanceof Error?e:new Error(e);
}
return _6;
},getChildren:function(_7,_8){
var _9=dojo.map(_7.items,function(e){
return new lconn.share.bean.CollectionFromJson(e);
});
var _a=Math.min(_7.pageSize,_7.items.length)+(_7.hasMore?1:0);
var _b=_9.length;
if(_a>(this.initialItems+this.initialExtra)){
if(!_8){
_b=Math.min(_b,this.initialItems);
var _c=Math.max(0,_9.length-this.initialItems);
if(_c>0){
var _d=[];
for(var i=0,c;c=_9[i];i++){
_d.push({id:c.getId(),date:c.getUpdated().getTime(),index:i});
}
_d.sort(function(a,b){
return a.date-b.date;
});
for(var i=0;i<_c;i++){
_9[_d[i].index]=null;
}
_9=dojo.filter(_9,function(c){
return !!c;
});
}
}
}
var _e=this.createNavItems(_9,_b);
_e.hasMore=(this.allItems>_9.length&&_a>_9.length);
return _e;
},createNavItems:function(_f,_10){
var _11=lconn.share.util.date;
var app=this.app;
var nls=app.nls;
var _12=[];
for(var i=0;i<_10;i++){
var _13=_f[i];
var _14=_13.getId();
var m=lconn.files.scenes.share.formatShareMessage(app.nls.CONTENT,_13.getVisibility());
var _15=new lconn.files.widget.FolderNavItem("folder/"+_14,_13.getName(),_13,_13.getName(),this.getFolderIconTooltip(_13.getVisibility(),app.nls.CONTENT.FOLDER.ICON_TOOLTIP),app.routes.getCollectionUrl(_14));
_12.push(_15);
}
return _12;
},getFolderIconTooltip:function(_16,nls){
if(!nls){
return null;
}
if(_16=="community"){
return nls.COMMUNITY;
}else{
if(_16=="public"){
return nls.PUBLIC;
}else{
if(_16=="shared"){
return nls.SHARE;
}else{
return nls.PRIVATE;
}
}
}
},attachDragTarget:function(ul,_17){
if(!this.app.isAuthenticated()){
return;
}
dojo.addClass(ul,"qkrDropTarget");
if(this.dndTarget){
this.dndTarget.sync();
return;
}
this.dndTarget=new dojo.dnd.Target(ul,{accept:["file"],onDropExternal:dojo.hitch(this,"dropFile",ul)});
},dropFile:function(el,_18,_19,_1a){
var _1b=null;
var _1c=null;
if(el&&(el.declaredClass=="lconn.share.widget.Node"||el.declaredClass=="lconn.share.widget.Tree")){
_1b=el.declaredClass=="lconn.share.widget.Tree"?el.getParenNode().getBean():el.getBean();
}else{
var _1d=dojo.query(".dojoDndItemBefore,.dojoDndItemAfter",el);
if(_1d.length==1&&_1d[0].dndData){
_1b=_1d[0].dndData;
}
}
var _1e=[];
for(var i=0;i<_19.length;i++){
var _1f=_18.getItem(_19[i].id,true).data;
_1e.push(_1f);
}
if(_1e.length>0){
this._dropFile(_1b,_1e);
}
},_dropFile:function(_20,_21){
var _22=((this.app.scene&&this.app.scene.collection)||dojo.filter(_21,function(_23){
return _23.isFolder();
}).length>0)?true:false;
if(_21.length==1){
var _24=_21[0];
if(_24.isFolder()){
lconn.share.requireAsync("lconn.files.action.impl.HeadlessMoveCollection").addCallback(this,function(){
if(!this.moveFolderAction){
this.moveFolderAction=new lconn.files.action.impl.HeadlessMoveCollection(this.app,null,{});
}
this.moveFolderAction.execute(_20,_24);
});
}else{
if(_20){
if(_22){
lconn.share.requireAsync("lconn.files.action.impl.MoveFile").addCallback(this,function(){
if(!this.moveFileAction){
this.moveFileAction=new lconn.files.action.impl.HeadlessMoveFile(this.app,null,{});
}
this.moveFileAction.execute(_20,_24);
});
}else{
lconn.share.requireAsync("lconn.files.action.impl.HeadlessAddToCollection").addCallback(this,function(){
if(!this.addToCollectionAction){
this.addToCollectionAction=new lconn.files.action.impl.HeadlessAddToCollection(this.app,null,{});
}
this.addToCollectionAction.execute(_20,_24);
});
}
}
}
}else{
lconn.share.requireAsync("lconn.files.action.impl.HeadlessBulkAction").addCallback(this,function(){
var _25={isMove:_22};
if(_22){
if(!this.bulkMoveAction){
this.bulkMoveAction=new lconn.files.action.impl.HeadlessBulkAction(this.app,null,_25);
}
this.bulkMoveAction.execute(_20,_21);
}else{
if(!this.bulkAddAction){
this.bulkAddAction=new lconn.files.action.impl.HeadlessBulkAction(this.app,null,_25);
}
this.bulkAddAction.execute(_20,_21);
}
});
}
},isExpired:function(_26){
var now=new Date().getTime();
return ((now-_26)>this.maxAge);
},onChange:function(e){
var _27=this.control;
if(!_27){
return;
}
if(_27.isOpen){
_27.load(_27.loadArg);
}else{
if(this.openOnCreate&&e&&e.collectionCreate){
_27.open();
}else{
_27.expire();
}
}
}});
dojo.declare("lconn.files.widget.FolderNavItem",null,{constructor:function(id,_28,_29,_2a,_2b,url){
this.id=id;
this.name=_28;
this.collection=_29;
this.tooltip=_2a;
this.altText=_2b;
this.url=url;
},equals:function(_2c){
return _2c==this||(_2c.id==this.id&&_2c.name==this.name&&_2c.tooltip==this.tooltip&&_2c.altText==this.altText);
},decorate:function(_2d,a,nav){
var li=a.parentNode;
dojo.addClass(li,"dojoDndItem lconnTitle");
li.dndData=this.collection;
var _2e=_2d.collection;
var _2f=a.firstChild;
var d=document;
var img=d.createElement("img");
img.src=dojo.config.blankGif;
if(_2e.isPublic()){
img.className="lconnSprite-iconFolderClose24 lconnSprite-iconFolderPublic24";
}else{
if(_2e.isShared()){
img.className="lconnSprite-iconFolderClose24 lconnSprite-iconFolderShared24";
}else{
if(_2e.isPrivate()){
img.className="lconnSprite-iconFolderClose24 lconnSprite-iconFolderPrivate24";
}else{
img.className="lconnSprite lconnSprite-iconFolderClose16";
}
}
}
img.alt=img.title=this.altText;
a.insertBefore(img,_2f);
var _30=d.createElement("span");
_30.className="lotusAltText";
_30.appendChild(d.createTextNode(" ["+this.altText+"]"));
a.appendChild(_30);
a.innerHTML=a.innerHTML.replace(/<wbr>/g,"");
}});
}


;if(!dojo._hasResource["lconn.files.widget.FavoriteFolderNavigation"]){
dojo._hasResource["lconn.files.widget.FavoriteFolderNavigation"]=true;
dojo.provide("lconn.files.widget.FavoriteFolderNavigation");






dojo.declare("lconn.files.widget.FavoriteFolderNavigation",lconn.files.widget.FolderNavigation,{subscribe:function(){
this._subFav=dojo.subscribe("lconn/files/folders/myfavorites/changed",this,"onFavoritesChange");
},destroy:function(){
this.inherited(arguments);
dojo.unsubscribe(this._subFav);
},isExpired:function(){
return true;
},loadChildren:function(_1){
var _2=this.app.favorites.folders.getDfd();
_2.addCallback(dojo.hitch(this,"onSuccess",_1));
return _2;
},onSuccess:function(_3,_4){
this._loadedOnce=true;
var _5=[].concat(_4);
_5.sort(function(a,b){
a=a.getName();
b=b.getName();
return (a<b?-1:(a>b?1:0));
});
var _6=_5.length-this.initialItems;
var _7=false;
if(!_3&&_6>0){
_5.splice(this.initialItems,_6);
_7=true;
}
var _8=this.createNavItems(_5,_5.length);
_8.hasMore=_7;
return _8;
},onFavoritesChange:function(_9){
if(this._loadedOnce){
var c=this.control;
var _a=this.onSuccess(c.loadArg,_9);
c.update(_a);
}
}});
}


;if(!dojo._hasResource["lconn.share.widget.tree.dnd.Avatar"]){
dojo._hasResource["lconn.share.widget.tree.dnd.Avatar"]=true;
dojo.provide("lconn.share.widget.tree.dnd.Avatar");


dojo.declare("lconn.share.widget.tree.dnd.Avatar",dojo.dnd.Avatar,{construct:function(){
if(this.manager.nodes.length){
var _1=this.manager.source.anchor.parentNode;
var _2=dijit.byId(this.manager.source.anchor.parentNode.id);
var d=dojo.doc.createElement("div");
d.id="treeAvatar";
dojo.addClass(d,"filesTreeDropAvatar");
dojo.addClass(d,"dojoDndAvatar");
dojo.style(d,{position:"absolute",zIndex:1999,margin:"0px"});
if(_2){
var _3=dojo.query("img",_2.iconDiv).length?dojo.query("img",_2.iconDiv)[0]:null;
if(_3){
dojo.place(dojo.clone(_3),d,"first");
}
}
dojo.place("<span class='bidiAware'>"+(_2?" "+_2.getTitle():" ???")+"</span>",d,"append");
this.node=d;
this.update();
}
}});
}


;if(!dojo._hasResource["lconn.share.widget.KeyNavigatable"]){
dojo._hasResource["lconn.share.widget.KeyNavigatable"]=true;
dojo.provide("lconn.share.widget.KeyNavigatable");
dojo.declare("lconn.share.widget.KeyNavigatable",null,{_onKeydown:function(_1){
if(!_1){
return;
}
var _2=_1.target;
if(!_2){
return;
}
switch(_1.keyCode){
case dojo.keys.UP_ARROW:
if(typeof this._onUpArrow=="function"){
this._onUpArrow(_1);
dojo.stopEvent(_1);
}
break;
case dojo.keys.DOWN_ARROW:
if(typeof this._onDownArrow=="function"){
this._onDownArrow(_1);
dojo.stopEvent(_1);
}
break;
case dojo.keys.LEFT_ARROW:
if(dojo.isBodyLtr()){
if(typeof this._onLeftArrow=="function"){
this._onLeftArrow(_1);
dojo.stopEvent(_1);
}
}else{
if(typeof this._onRightArrow=="function"){
this._onRightArrow(_1);
dojo.stopEvent(_1);
}
}
break;
case dojo.keys.RIGHT_ARROW:
if(dojo.isBodyLtr()){
if(typeof this._onRightArrow=="function"){
this._onRightArrow(_1);
dojo.stopEvent(_1);
}
}else{
if(typeof this._onLeftArrow=="function"){
this._onLeftArrow(_1);
dojo.stopEvent(_1);
}
}
break;
case dojo.keys.SPACE:
if(typeof this._onSpace=="function"){
this._onSpace(_1);
dojo.stopEvent(_1);
}
break;
case dojo.keys.ENTER:
if(typeof this._onEnter=="function"){
this._onEnter(_1);
dojo.stopEvent(_1);
}
break;
case dojo.keys.HOME:
if(typeof this._onHome=="function"){
this._onHome(_1);
dojo.stopEvent(_1);
}
break;
case dojo.keys.END:
if(typeof this._onEnd=="function"){
this._onEnd(_1);
dojo.stopEvent(_1);
}
break;
case dojo.keys.ESCAPE:
if(typeof this._onEscape=="function"){
this._onEscape(_1);
}
break;
default:
return;
}
}});
}

dojo.provide("lconn.share.nls.Tree")._built=true;
dojo.provide("lconn.share.nls.Tree.en_us");
lconn.share.nls.Tree.en_us={"file_shared":"This file {0} is shared","folder_expand":"Expand folder {0}","gen_disabled":"{0} is disabled","file_public":"This file {0} is visible to everyone in your organization","folder_private_ext":"This folder {0} is private. This folder can be shared outside of your organization","gen_private":"Private","gen_shared_ext":"Shared externally","file_shared_gen":"A Shared File","file_public_gen":"A Public File","file_select":"Select file {0}","file_private_ext":"This file {0} is private. This file can be shared outside of your organization","folder_private_gen_ext":"Private folder. This folder can be shared outside of your organization","gen_public_shared_ext":"Visible to everyone in your organization. Can be shared outside of your organization","folder_private":"This folder {0} is private","gen_shared_shared_ext":"Shared. Can be shared outside of your organization","file_private_gen_ext":"Private file. This file can be shared outside of your organization","gen_shared":"Shared","folder_shared_ext":"This folder {0} is shared. This folder can be shared outside of your organization","gen_public":"Visible to everyone in your organization","folder_community_ext":"This folder {0} is a community folder. This folder can be shared outside of your organization","folder_public_ext":"This folder {0} is visible to everyone in your organization. This folder can be shared outside of your organization","gen_collapse":"Collapse {0}","file_private":"This file {0} is private","folder_private_gen":"A Private Folder","folder_shared_gen_ext":"Shared folder. This folder can be shared outside of your organization","folder_community_gen_ext":"Community folder. This folder can be shared outside of your organization","gen_select":"Select {0}","folder_public_gen_ext":"Folder visible to everyone in your organization. This folder can be shared outside of your organization","file_private_gen":"A Private File","gen_private_shared_ext":"Private. Can be shared outside of your organization","folder_shared":"This folder {0} is shared","folder_community":"This folder {0} is a community folder","folder_public":"This folder {0} is visible to everyone in your organization","gen_click_to_select":"Click {0} to select it","folder_collapse":"Collapse folder {0}","folder_shared_gen":"A Shared Folder","folder_community_gen":"A Community Folder","gen_expand":"Expand {0}","file_shared_ext":"This file {0} is shared. This file can be shared outside of your organization","folder_public_gen":"A Public Folder","folder_select":"Select folder {0}","file_public_ext":"This file {0} is visible to everyone in your organization. This file can be shared outside of your organization","gen_click_to_expand":"Click {0} to expand it","file_shared_gen_ext":"Shared file. This file can be shared outside of your organization","file_public_gen_ext":"File visible to everyone in your organization. This file can be shared outside of your organization"};

;dojo.cache("lconn.share", "widget/templates/Tree.html", "<div class=\"${classFilesTree}\" role=\"${ariaRoleFilesTree}\" aria-label=\"File or folder selection\" style=\"box-sizing: border-box; height:${initHeight};\" tabindex=\"-1\"> <div dojoAttachPoint=\"containerNode\" class=\"${classTreeDiv}\" role = \"region\" id = \"${id}_containerNode\" dojoAttachEvent=\"onkeydown:_onKeydown\" tabindex=\"-1\" style=\"box-sizing: border-box;\"> <div name=\"loading\" dojoAttachPoint=\"loadingDiv\" style=\"display:none;\"> <img src=\"${blankGif}\" class=\"lotusLoading\" alt=\"\" role=\"presentation\" style=\"margin:0 5px;\"> ${_strings.rs_loading} </div> <div name=\"more\" dojoAttachPoint=\"moreDiv\" style=\"display:none; margin:5px\"> <a href=\"javascript:;\" dojoAttachEvent=\"onclick:_loadMore\" style=\"margin:5px;\" title=\"${_strings.rs_more}\">${_strings.rs_more}</a> </div> </div></div>");

;dojo.cache("lconn.share", "widget/templates/Node.html", "<div name=\"node\" id=\"node_${id}\" role=\"presentation\" class=\"${classNodeDiv}\" dojoAttachEvent=\"onkeydown:_onKeydown\" tabindex=\"-1\" title=\"${altNode}\" style=\"box-sizing: border-box;\"> <div name=\"headerOuter\" role=\"presentation\" dojoAttachPoint=\"headerOuterDiv\" class=\"${classHeaderOuterDiv}\"> <div name=\"headerSelector\" role=\"${ariaRoleNode}\" dojoAttachPoint=\"headerSelectorDiv\" aria-expanded=false aria-selected=false aria-checked=false class=\"${classHeaderSelectorDiv}\" id=\"${id}_headerselector\" tabindex=\"-1\" > <div name=\"header\" role=\"presentation\" dojoAttachPoint=\"headerDiv\" dojoAttachEvent=\"onclick:_onclickHeader,onmouseenter:_onmouseenterHeader,onmouseleave:_onmouseleaveHeader,onchange:_onchangeHeader\" class=\"${classHeaderDiv}\" style=\"display:none;\" title=\"${altHeader}\"> <div name=\"checkbox\" role=\"presentation\" dojoAttachPoint=\"checkboxDiv\" class=\"${classCheckboxDiv}\" style=\"display:none;\" title=\"${altCheckbox}\"> <input id=\"${id}_checkbox\" name=\"treeNodeCheckbox\" type=\"checkbox\" dojoAttachPoint=\"checkbox\" dojoAttachEvent=\"onclick:_onclickCheckbox\" style=\"display:none;\" tabindex=\"-1\" aria-labelledby=\"${id}_title\" /> <input id=\"${id}_radio\" name=\"treeNodeRadio\" type=\"radio\" dojoAttachPoint=\"radio\" dojoAttachEvent=\"onclick:_onclickCheckbox,onfocus:_onfocusRadio\" style=\"display:none;\" tabindex=\"-1\" aria-labelledby=\"${id}_title\" /> </div> <div name=\"twisty\" dojoAttachPoint=\"twistyDiv\" class=\"${classTwistyDiv}\" style=\"display:none;\" title=\"${altTwisty}\"> <a role=\"button\" class=\"lotusSprite lotusArrow lotusTwistyClosed\" aria-label=\"${altTwisty}\" href=\"javascript:;\" tabindex=\"-1\" dojoAttachPoint=\"twistyAnchor\" dojoAttachEvent=\"onclick:_onclickTwisty\" style=\"display:none;\"> <span class=\"lotusAltText\" role=\"presentation\" dojoAttachPoint=\"twistySymbol\">&gt; </span> </a> <span>&nbsp;</span> </div> <div name=\"icon\" dojoAttachPoint=\"iconDiv\" dojoAttachEvent=\"onclick:_onclickIcon\" class=\"${classIconDiv}\" style=\"display:none;\" title=\"${altIcon}\"> </div> <div name=\"title\" id=\"${id}_title\" dojoAttachPoint=\"titleDiv\" dojoAttachEvent=\"onclick:_onclickTitle,onkeypress:_onclickTitle\" class=\"${classTitleDiv}\" style=\"display:none;\" title=\"${altTitle}\" role=\"button\" aria-pressed=\"false\" aria-label=\"${ariaLabelTitle}\"> </div> <div name=\"extIcon\" dojoAttachPoint=\"externalDiv\" class=\"${classExternalDiv}\" style=\"display:none;\" title=\"${altExternal}\"></div> <div name=\"share\" dojoAttachPoint=\"visibilityDiv\" class=\"${classVisibilityDiv}\" style=\"display:none;\" title=\"${altVisibility}\"></div> </div> </div> </div></div>");

;if(!dojo._hasResource["lconn.share.widget.Tree"]){
dojo._hasResource["lconn.share.widget.Tree"]=true;
dojo.provide("lconn.share.widget.Tree");






































dojo.requireLocalization("lconn.share","Tree");
dojo.declare("lconn.share.widget.Tree",[dijit._Widget,dijit._Templated,lconn.share.widget.KeyNavigatable],{templatePath:dojo.moduleUrl("lconn.share","widget/templates/Tree.html"),classFilesTree:"lconnFilesTree",ariaRoleFilesTree:"tree",ariaRoleNode:"treeitem",ariaRoleNodeCheckbox:"treeitem",ariaRoleNodeRadio:"treeitem",indentNodePx:10,classTreeDiv:"tree",rootTree:null,parentNode:null,selectedNode:null,initHeight:"auto",containerNode:null,firstChildNode:null,_nextPageUri:null,constructor:function(_1){
this._initVars();
dojo.safeMixin(this,_1||{});
dojo.safeMixin(this.cfg.ds,this.datastore);
this._mergeObj(this.cfg.opts,this.features);
this._mergeObj(this.cfg.cb,this.callbacks);
var _2=lconn.core.config.services;
var _3=location.protocol=="https:";
this.webresources=lconn.core.url.getServiceUrl(_2.webresources,_3&&_2.webresources.secureEnabled).uri;
this.blankGif=(dojo.config.blankGif?dojo.config.blankGif:this.webresources+"/web/com.ibm.lconn.core.styles.oneui3/images/blank.gif");
},_initVars:function(){
this.cfg={ds:{beans:[],feed:null,predefined:null,uri:null,apiParams:null,apiParamsOnUri:true,xhrSync:true,lazyLoad:true,nextPageUri:null,isAuthed:null,onError:null},opts:{isDndTarget:false,isDndSource:false,isCached:false,isBreadcrumb:false,indentNodePx:10,isRecalcedOnResize:true,prefix:null,rootName:null,folder:{show:true,aria:{LABEL_CONTENT_IN_ROOT:"",LABEL_CONTENT_IN_FOLDER:""},render:{checkbox:false,twisty:true,icon:true,title:true,externalIcon:true,visibilityIcon:true},behavior:{isSelectable:true,isTitleAnchored:true,isHighlightedOnSelect:true,isCheckedOnSelect:true,isMultiSelectable:false,titleWidthCalcConsidersSuffixedElements:true},maxDepth:0},file:{show:true,render:{checkbox:true,twisty:false,icon:true,title:true,externalIcon:true,visibilityIcon:true},behavior:{isSelectable:true,isTitleAnchored:false,isHighlightedOnSelect:true,isCheckedOnSelect:true,isMultiSelectable:false,titleWidthCalcConsidersSuffixedElements:true}}},cb:{onError:null,treeLoaded:null,onDrop:null,filterNode:null,disableDropForItem:null,node:{rendered:null,selected:null,unselected:null,beforeexpanded:null,expanded:null,beforecollapsed:null,collapsed:null,preselect:null,disable:null,tooltip:null,header:{onchange:null,onclick:null,onclickchildexcludelist:{checkbox:true,twisty:true,icon:true,title:true},onmouseenter:null,onmouseleave:null,checkbox:{onclick:null},twisty:{onclick:null},icon:{onclick:null},title:{onclick:null}}}}};
this.rootTree=null;
this.parentNode=null;
this.selectedNode=null;
this.firstChildNode=null;
this._dndSource=null;
this._nextPageUri=null;
this._nodes={};
this._nNodes=0;
this._strings={};
},_swapTabIndexable:function(_4){
if(_4){
if(this.rootTree.lastTabIndexable){
dojo.attr(this.rootTree.lastTabIndexable,"tabindex","-1");
}
dojo.attr(_4,"tabindex","0");
this.rootTree.lastTabIndexable=_4;
dijit.setWaiState(this.rootTree.domNode,"activedescendant",_4.id);
}
},_mergeObj:function(_5,_6){
if(typeof _5!=="object"){
_5={};
}
for(var _7 in _6){
if(_6.hasOwnProperty(_7)){
var _8=_6[_7];
if(typeof _8==="object"){
_5[_7]=this._mergeObj(_5[_7],_8);
continue;
}
_5[_7]=_8;
}
}
for(var i=2,l=arguments.length;i<l;i++){
this._mergeObj(_5,arguments[i]);
}
return _5;
},postMixInProperties:function(){
this.inherited(arguments);
dojo.mixin(this._strings,dojo.i18n.getLocalization("lconn.core","strings"));
dojo.mixin(this._strings,dojo.i18n.getLocalization("lconn.share","Tree"));
if(this._isRoot()){
this.rootTree=this;
this._setLevel(1);
if(this.cfg.opts.isRecalcedOnResize){
this._resizeListener=dojo.connect(window,"resize",dojo.hitch(this,function(_9){
this.recalcNodeWidths(true);
}));
}
}else{
this._setLevel(this.parentNode._getLevel()+1);
}
},postCreate:function(){
this.inherited(arguments);
},startup:function(){
this._renderNodes(this.cfg.ds);
},destroy:function(){
this._destroyed=true;
this._clearNodes();
this._clearDatastore();
if(this._resizeListener){
dojo.disconnect(this._resizeListener);
}
this.inherited(arguments);
},hasScrollBar:function(){
var _a=false;
if(this.containerNode){
_a=this.containerNode.clientHeight<this.containerNode.scrollHeight;
}
return _a;
},queryByDomId:function(_b){
var _c=null;
for(id in this._nodes){
var _d=this._nodes[id];
if(_d.domNode.id==_b){
_c=_d;
break;
}
}
return _c;
},setTabindexable:function(_e){
if(_e){
this.rootTree._swapTabIndexable(_e);
}
},_clearNodes:function(){
for(id in this._nodes){
if(this._nodes[id].destroyRecursive){
this._nodes[id].destroyRecursive();
}
}
this._nNodes=0;
},_clearDatastore:function(){
if(this._datastore){
dojo.destroy(this._datastore);
}
},_isRoot:function(){
return (!this.parentNode);
},_getLevel:function(){
return (this.level);
},_setLevel:function(_f){
this.level=_f;
},_renderNodes:function(_10){
var _11=function(_12){
return (_12&&dojo.query("link[rel='next']",_12).length?dojo.query("link[rel='next']",_12)[0].getAttribute("href"):null);
};
this.loadingDiv.style.display="block";
if(_10.beans.length){
this._createNodes(_10.beans);
this._nextPageUri=_10.nextPageUri;
if(_10.lazyLoad){
this._loadMore(this._nextPageUri);
}else{
if(this._nextPageUri){
this._showLoadMore();
}
}
this.loadingDiv.style.display="none";
}else{
if(_10.feed){
this._createNodes(_10.feed);
this._nextPageUri=_10.nextPageUri||_11(_10.feed);
if(_10.lazyLoad){
this._loadMore(this._nextPageUri);
}else{
if(this._nextPageUri){
this._showLoadMore();
}
}
this.loadingDiv.style.display="none";
}else{
if(_10.uri||_10.predefined){
this._clearDatastore();
this._datastore=new lconn.share.widget.datastore(_10);
this._datastore.load(dojo.hitch(this,function(_13,_14){
if(this._destroyed){
return;
}
this._createNodes(_13);
this._nextPageUri=_11(_13);
if(this._datastore.cfg.lazyLoad){
this._loadMore(this._nextPageUri);
}else{
if(this._nextPageUri){
this._showLoadMore();
}
}
this.loadingDiv.style.display="none";
}));
}
}
}
},_loadMore:function(_15){
if(this._destroyed){
return;
}
this._hideLoadMore();
var _16=(typeof (_15)==="string"?_15:null);
if(!_16&&!this._nextPageUri){
return;
}
var ds=dojo.clone(this.cfg.ds);
ds.feed=null;
ds.beans=[];
ds.apiParamsOnUri=false;
ds.uri=_16||this._nextPageUri;
ds.xhrSync=false;
this._renderNodes(ds);
},_showLoadMore:function(){
this.moreDiv.style.display="block";
},_hideLoadMore:function(){
this.moreDiv.style.display="none";
},_createNodes:function(_17){
if(typeof (_17)!="object"){
return null;
}
var _18=[];
if(!dojo.isArray(_17)){
_18=dojo.query("entry",_17);
}else{
if(dojo.isArray(_17)){
_18=_17;
}
}
var _19=null;
dojo.forEach(_18,dojo.hitch(this,function(_1a,i){
_19=this._createNode(_1a);
if(_19){
this._addNode(_19);
}
}));
if(this.getRoot()){
this.getRoot().recalcNodeWidths(true);
}
if(!this.getParentNode()){
dojo.attr(this.containerNode,"aria-label",this.cfg.opts.folder.aria.LABEL_CONTENT_IN_ROOT+this.cfg.opts.rootName);
}else{
dojo.attr(this.containerNode,"aria-label",this.cfg.opts.folder.aria.LABEL_CONTENT_IN_FOLDER+this.getParentNode().getTitle());
}
dojo.publish("lconn/share/widget/Tree/treeLoaded",[this]);
if(this.cfg.cb.treeLoaded){
this.cfg.cb.treeLoaded.call(this,this);
}
return this._nodes;
},_createNode:function(_1b){
if(typeof (_1b)!="object"){
return null;
}
var _1c=function(_1d,_1e){
if(!_1d.cfg.opts.file.show&&!_1e.isFolder()){
return true;
}
if(!_1d.cfg.opts.folder.show&&_1e.isFolder()){
return true;
}
if(typeof (_1d.cfg.cb.filterNode)=="function"&&_1d.cfg.cb.filterNode.call(_1d,_1e.getBean())){
return true;
}
return false;
};
var _1f=null;
if(lconn.share.widget.nodebean.isSupportedBean(_1b)){
_1f=lconn.share.widget.nodebean.createNodeBean(_1b);
}else{
var _20=new lconn.share.bean.File(_1b);
if(_20&&!_20.isFolder()){
_1f=lconn.share.widget.nodebean.createNodeBean(_20);
}else{
_1f=lconn.share.widget.nodebean.createNodeBean(new lconn.share.bean.Collection(_1b));
}
}
if(_1c(this,_1f)){
return null;
}
return (new lconn.share.widget.Node({pTree:this,_strings:this._strings,nodebean:_1f,ariaRoleNode:this.ariaRoleNode,ariaRoleNodeCheckbox:this.ariaRoleNodeCheckbox,ariaRoleNodeRadio:this.ariaRoleNodeRadio,indentNodePx:this.cfg.opts.indentNodePx}));
},_addNode:function(_21){
if(_21){
this._addNodeRef(_21);
_21.pTree=this;
_21.placeAt(this.loadingDiv,"before");
_21.startup();
this._setupDnd();
return _21;
}
return null;
},_addNodeRef:function(_22){
if(!_22||typeof (_22)!="object"||_22.declaredClass!="lconn.share.widget.Node"){
return null;
}
if(this._nodes[_22.data.entryId]==undefined){
this._nNodes++;
if(this._nNodes==1){
this.firstChildNode=_22;
}
var _23=this.getParentNode();
if(_23){
_23.data.childrenCount++;
_23._displayTwisty();
}
}
this._nodes[_22.data.entryId]=_22;
},_removeNodeRef:function(_24){
if(!_24||typeof (_24)!="object"||_24.declaredClass!="lconn.share.widget.Node"){
return null;
}
if(this._nodes[_24.data.entryId]){
delete this._nodes[_24.data.entryId];
this._nNodes--;
var _25=this.getParentNode();
if(_25){
_25.data.childrenCount--;
_25._displayTwisty();
}
return true;
}
return null;
},_setupDnd:function(){
if(!lconn.core.config.features("files-tree-dnd")){
return;
}
if(!lconn.core.auth.isAuthenticated()){
return;
}
var _26=this.cfg.opts.isDndSource&&lconn.core.config.features("files-tree-dnd-source");
if(this.cfg.opts.isDndTarget||_26){
if(this._isRoot()){
var _27=[];
if(lconn.core.config.features("files-tree-dnd-accepts-files")){
_27.push("file");
}
if(lconn.core.config.features("files-tree-dnd-accepts-folders")){
_27.push("folder");
}
this._dndSource=new lconn.share.widget.tree.dnd.Source(this.domNode,{isSource:_26,accept:_27,selfAccept:true,singular:true,copyOnly:true,allowNested:true,dropParent:this.containerNode,createAvatar:dojo.hitch(this,this._createAvatar),onDrop:dojo.hitch(this,this._onDrop),disableDropForItem:dojo.hitch(this,this._disableDrop)});
setTimeout(dojo.hitch(this,function(){
this.getDnd().sync();
}),500);
}else{
if(this.getDnd()){
this.getDnd().sync();
}
}
if(this.cfg.opts.isDndSource&&this._dndSource){
if(typeof (dojo.dnd.manager().makeAvatar)=="function"&&dojo.dnd.manager().makeAvatar!=this._dndSource.makeAvatar){
dojo.dnd.manager().previousMakeAvatarFunc=dojo.dnd.manager().makeAvatar;
}
dojo.dnd.manager().makeAvatar=this._dndSource.createAvatar;
}
}
},_disableDrop:function(_28,_29){
var _2a=false;
if(_29){
if(_29.getId()==_28.getId()){
_2a=true;
}
if(_29.getParentId()&&_29.getParentId()==_28.getId()){
_2a=true;
}
}
if(!_2a&&this.cfg.cb.disableDropForItem){
_2a=this.cfg.cb.disableDropForItem.call(this,this,_28);
}
return _2a;
},_createAvatar:function(){
var _2b=dijit.byId(dojo.dnd.manager().source.node.id);
var _2c=(_2b&&(_2b.declaredClass=="lconn.share.widget.Node"||_2b.declaredClass=="lconn.share.widget.Tree"));
if(!_2c){
if(dojo.dnd.manager().previousMakeAvatarFunc){
return dojo.dnd.manager().previousMakeAvatarFunc();
}else{
return new dojo.dnd.Avatar(dojo.dnd.manager());
}
}else{
return new lconn.share.widget.tree.dnd.Avatar(dojo.dnd.manager());
}
},_onDrop:function(_2d,_2e,_2f){
try{
var _30=this.getDnd().targetAnchor;
if(_30){
if(dojo.getAttr(_30,"name")==="headerOuter"){
_30=_30.parentNode;
}
if(typeof (this.cfg.cb.onDrop)=="function"){
this.cfg.cb.onDrop.call(this,this,_30,_2d,_2e,_2f);
}
}
}
catch(ex){
dojo.publish("/dnd/cancel",[target]);
throw new Error("Exception: something went wrong during drag and drop operation: "+ex);
}
},_onDownArrow:function(evt){
var _31=this.getChildren();
if(_31&&_31.length>0){
_31[0].focus(false);
}
},getDatastore:function(){
return (this._datastore);
},isBreadcrumb:function(){
return (this.cfg.opts.isBreadcrumb);
},getRoot:function(){
return (this.rootTree);
},getDnd:function(){
return (this.getRoot()?this.getRoot()._dndSource:null);
},getParentNode:function(){
return (this.parentNode);
},getSelectedNode:function(){
return (this.getRoot().selectedNode);
},getNodeById:function(id,_32){
if(typeof (_32)=="undefined"){
_32=false;
}
return this.getNodes(_32)[id];
},getNodeByTitle:function(_33,_34){
if(typeof (_34)=="undefined"){
_34=false;
}
var _35=null;
var _36=this.getNodes(_34);
for(id in _36){
if(_36[id].data.title==_33){
_35=_36[id];
break;
}
}
return _35;
},getNodeByBean:function(_37){
if(typeof (_37)!="object"||!lconn.share.widget.nodebean.isSupportedBean(_37)){
return null;
}
var _38=lconn.share.widget.nodebean.createNodeBean(_37);
var _39=this.getNodeById(_38.getId());
if(!_39){
_39=this.getNodeById(_38.getId(),true);
}
if(!_39){
_39=this.getRoot().getNodeById(_38.getId(),true);
}
return _39;
},getNodes:function(_3a){
if(typeof (_3a)=="undefined"){
_3a=false;
}
var _3b=this._nodes;
if(_3a){
var _3c={};
for(id in _3b){
var _3d=_3b[id];
if(_3d.tree&&_3d.tree.getNodes()){
_3c[id]=_3d;
var _3e=_3d.tree.getNodes(_3a);
for(id2 in _3e){
_3c[id2]=_3e[id2];
}
}else{
_3c[id]=this.getNodeById(id);
}
}
return _3c;
}
return _3b;
},getNodesCount:function(){
return this._nNodes;
},getDepth:function(){
return (this.level);
},addNode:function(_3f){
if(!_3f){
return null;
}
if(typeof (_3f)!="object"){
return null;
}
if(_3f.declaredClass!="lconn.share.widget.Node"&&!lconn.share.widget.nodebean.isSupportedBean(_3f)){
return null;
}
var _40=lconn.share.widget.nodebean.isSupportedBean(_3f)?this.addNodeFromBean(_3f):this._addNode(_3f);
return (_40);
},addNodeFromBean:function(_41){
if(typeof (_41)!="object"||!lconn.share.widget.nodebean.isSupportedBean(_41)){
return null;
}
if(this.getNodeByBean(_41)){
return null;
}
var _42=this._createNode(_41);
if(_42){
this._addNode(_42);
}
return (_42);
},addNodeFromURI:function(uri){
var _43=new lconn.share.widget.datastore({uri:uri,beans:[],feed:null,predefined:null,apiParams:null,isAuthed:this.cfg.ds.isAuthed,onError:this.cfg.ds.onError});
var _44=null;
_43.load(dojo.hitch(this,function(_45,_46){
_44=this._createNodes(_45);
}));
return _44;
},removeNode:function(_47){
if(!_47||typeof (_47)!="object"||_47.declaredClass!="lconn.share.widget.Node"){
return false;
}
if(this.getNodeById(_47.getId(),false)){
if(_47.remove()){
return true;
}
}
return false;
},sortNodes:function(_48){
if(typeof (_48)==="undefined"){
_48={};
_48.ascending=true;
}
var _49=[];
var _4a=this.getNodes();
if(_4a&&this.getNodesCount()>1){
var i=0;
for(id in _4a){
_49[i++]=_4a[id];
}
}
_49.sort(dojo.hitch(_48,function(a,b){
return (this.ascending?a.getTitle()>b.getTitle():a.getTitle()<b.getTitle());
}));
for(i=_49.length-1;i>=0;i--){
dojo.place(_49[i].domNode,this.containerNode,"first");
}
this.firstChildNode=_49[0];
},updateNode:function(_4b){
if(typeof (_4b)!="object"||!lconn.share.widget.nodebean.isSupportedBean(_4b)){
return null;
}
var _4c=this.getNodeByBean(_4b);
if(_4c){
return (_4c.update(_4b));
}else{
return null;
}
},updateNodesVisibility:function(_4d,_4e){
if(typeof (_4d)!="object"||!lconn.share.widget.nodebean.isSupportedBean(_4d)){
return null;
}
if(typeof (_4e)=="undefined"){
_4e=false;
}
var _4f=this.getNodes(_4e);
for(id in _4f){
var _50=_4f[id];
_50.updateVisibility(_4d);
}
},recalcNodeWidths:function(_51){
if(typeof (_51)=="undefined"){
_51=false;
}
var _52=this.getNodes(_51);
for(id in _52){
var _53=_52[id];
_53.recalcWidths();
}
},replaceNode:function(_54){
if(typeof (_54)!="object"||!lconn.share.widget.nodebean.isSupportedBean(_54)){
return null;
}
var _55=this.getNodeByBean(_54);
if(_55){
_55.destroy();
}
return (this.addNodeFromBean(_54));
},expandNodes:function(_56){
if(typeof (_56)==="undefined"){
_56=false;
}
if(_56){
var _57=this.cfg.ds.xhrSync;
this.cfg.ds.xhrSync=true;
}
for(id in this._nodes){
this._nodes[id].expand();
}
if(_56){
for(id in this._nodes){
if(this._nodes[id].tree){
this._nodes[id].tree.expandNodes(_56);
}
}
}
this.cfg.ds.xhrSync=_57;
},expandByPath:function(_58,_59){
if(typeof (_58)!="string"){
return null;
}
if(typeof (_59)==="undefined"){
_59="/";
}
var _5a=this.cfg.ds.xhrSync;
this.cfg.ds.xhrSync=true;
var _5b=_58.split(_59);
if(!_5b.length){
return null;
}
var _5c=null;
var _5d=this;
for(var i=0;i<_5b.length;i++){
var _5e=_5b[i];
if(!_5e){
continue;
}
if(_5d&&_5d.getNodeByTitle){
_5c=_5d.getNodeByTitle(_5e);
if(_5c){
_5c.expand(true);
_5d=_5c.tree;
}
}
}
this.cfg.ds.xhrSync=_5a;
return _5c;
},expandByPathId:function(_5f,_60){
if(typeof (_5f)!="string"){
return null;
}
if(typeof (_60)==="undefined"){
_60="/";
}
var _61=this.cfg.ds.xhrSync;
this.cfg.ds.xhrSync=true;
var _62=_5f.split(_60);
if(!_62.length){
return null;
}
var _63=null;
var _64=this;
for(var i=0;i<_62.length;i++){
var id=_62[i];
if(!id){
continue;
}
if(_64&&_64.getNodeById){
_63=_64.getNodeById(id);
if(_63){
_63.expand(true);
_64=_63.tree;
}
}
}
this.cfg.ds.xhrSync=_61;
return _63;
},collapseNodes:function(){
for(id in this._nodes){
this._nodes[id].collapse();
}
},reset:function(){
this.collapseNodes();
for(id in this._nodes){
if(this._nodes[id].tree&&this._nodes[id].tree.destroy){
this._nodes[id].tree.destroy();
}
}
},reloadNodes:function(_65){
if(typeof (_65)=="undefined"){
_65=false;
}
var _66=this.getNodes(_65);
for(id in _66){
var _67=_66[id];
if(_67.isExpanded()){
_67.render();
_67.expand(true);
}else{
_67.render();
}
}
},updateNodes:function(){
var _68=this._nodes;
this._nodes=[];
this.startup();
for(id in _68){
if(!this._nodes[id]){
_68[id].destroy();
}
}
for(id in this._nodes){
if(_68[id]){
this._nodes[id].destroy();
this._nodes[id]=_68[id];
}
}
this.sortNodes();
}});
dojo.declare("lconn.share.widget.Node",[dijit._Widget,dijit._Templated,lconn.share.widget.KeyNavigatable],{templatePath:dojo.moduleUrl("lconn.share","widget/templates/Node.html"),pTree:null,tree:null,nodebean:null,headerOuterDiv:null,headerSelectorDiv:null,headerDiv:null,checkboxDiv:null,checkbox:null,twistyDiv:null,twistyAnchor:null,iconDiv:null,titleDiv:null,titleAnchor:null,externalDiv:null,visibilityDiv:null,classNodeDiv:"node",classNodeHighlighted:"highlight",classNodeSelected:"selected",classNodeDisabled:"disabled",classHeaderOuterDiv:"headerOuter",classHeaderSelectorDiv:"headerSelector",classHeaderDiv:"header",classCheckboxDiv:"checkbox",classTwistyDiv:"twisty",classIconDiv:"icon",classTitleDiv:"title",classExternalDiv:"external",classVisibilityDiv:"visibility",classContainerDiv:"container",altNode:"",altHeader:"",altCheckbox:"",altTwisty:"",altIcon:"",altTitle:"",altExternal:"",altVisibility:"",ariaLabelTitle:"",imgFolderClosedHtml:null,imgFolderPrivateHtml:null,imgFolderPublicHtml:null,imgFolderSharedHtml:null,imgFolderCommunityHtml:null,imgFileHtml:null,imgExternalHtml:null,imgVisSharedHtml:null,imgVisPublicHtml:null,imgVisPrivateHtml:null,imgVisCommunityHtml:null,data:{entryId:null,title:null,feed:null},_isFlatDepth:function(){
return (this.cfg.opts.folder.maxDepth==1);
},_isLessThanMaxDepth:function(){
return (this.cfg.opts.folder.maxDepth==0||this.pTree.level<this.cfg.opts.folder.maxDepth);
},_isTwistyOpen:false,_isContainerLoaded:false,indentNodePx:10,_DOCMIMETYPE:{JPEG:"image/jpeg"},constructor:function(_69){
dojo.safeMixin(this,_69||{});
this.cfg=dojo.clone(this.pTree.cfg);
this._initNodeData();
this._initImgHtml();
if(dojo.isIE==8){
this.canHaveChildren=true;
}
},_initNodeData:function(){
this.data={};
if(!this.nodebean){
throw "Invalid arguments used to create a lconn.share.widget.Node object";
}
this.data.entryId=this.nodebean.getId();
this.data.title=this.nodebean.getTitle();
this.data._titleForHTML=this.isFile()?lconn.core.util.html.formatFilename(this.getTitle()):this.getTitle();
this.data.feed=this.nodebean.getUrlFeed();
this._initChildNodeData();
this._initTooltip();
},_initTooltip:function(){
this._setTitleAltText();
this.altCheckbox=this.altTitle;
this.altIcon=this._getExtendedAltText(null,null,null,"_gen");
this.altExternal=this._strings["gen_shared_ext"];
this.altVisibility=this._getExtendedAltText(null,null,null,"_gen");
this._setTwistyAltText();
if(this.iconDiv&&this.iconDiv.title){
this.iconDiv.title=this.altIcon;
span=dojo.query("img+span",this.iconDiv).length?dojo.query("img+span",this.iconDiv)[0]:null;
if(span){
span.innerHTML=this.ariaLabelTitle;
}
}
if(this.checkboxDiv&&this.checkboxDiv.title){
this.checkboxDiv.title=this.altCheckbox;
}
},_initChildNodeData:function(){
if(this.isFolder()){
this.data.childrenCount=0;
if(this.cfg.opts.folder.show){
this.data.childrenCount+=this.getCollBean().getCollectionCount();
}
if(this.cfg.opts.file.show){
this.data.childrenCount+=this.getCollBean().getMediaCount();
}
}else{
this.data.childrenCount=0;
}
},_initImgHtml:function(){
var _6a=function(str){
return "<span class=\"lotusAltText\" style=\"display:none\">"+str+"</span>";
};
this.blankGif=this.pTree.blankGif;
this.imgFolderClosedHtml="<img name=\"closedFolder\"    alt=\"\" src=\""+this.blankGif+"\" class=\"lconnSprite-iconFolderClose24\">";
this.imgFolderPublicHtml="<img name=\"publicFolder\"    alt=\"\" src=\""+this.blankGif+"\" class=\"lconnSprite-iconFolderClose24 lconnSprite-iconFolderPublic24\">"+_6a(this._getExtendedAltText("folder","_public"));
this.imgFolderPrivateHtml="<img name=\"privateFolder\"   alt=\"\" src=\""+this.blankGif+"\" class=\"lconnSprite-iconFolderClose24 lconnSprite-iconFolderPrivate24\">"+_6a(this._getExtendedAltText("folder","_private"));
this.imgFolderSharedHtml="<img name=\"sharedFolder\"    alt=\"\" src=\""+this.blankGif+"\" class=\"lconnSprite-iconFolderClose24 lconnSprite-iconFolderShared24\">"+_6a(this._getExtendedAltText("folder","_shared"));
this.imgFolderCommunityHtml="<img name=\"communityFolder\" alt=\"\" src=\""+this.blankGif+"\" class=\"lconnSprite-iconFolderClose24 lconnSprite-iconFolderCommunity24\">"+_6a(this._getExtendedAltText("folder","_community"));
var _6b=lconn.core.utilities.getFileIconClassName(this.getTitle(),16);
this.imgFileHtml="<img name=\"genericFileIcon\" alt=\"\" src=\""+this.blankGif+"\" class=\""+_6b+"\">"+_6a(this._getExtendedAltText("file"))+"</img>";
this.imgExternalHtml="<img name=\"externalIcon\" alt=\"\" src=\""+this.blankGif+"\" class=\"lconnIconListSharedExternal\">"+_6a(this._strings["gen_shared_ext"]);
this.imgVisPublicHtml="<img name=\"publicIcon\"      alt=\"\" src=\""+this.blankGif+"\" class=\"lconnSprite lconnSprite-iconPublic16\">"+_6a(this._strings["gen_public"]);
this.imgVisPrivateHtml="<img name=\"privateIcon\"     alt=\"\" src=\""+this.blankGif+"\" class=\"lconnSprite lconnSprite-iconPrivate16\">"+_6a(this._strings["gen_private"]);
this.imgVisSharedHtml="<img name=\"sharedIcon\"      alt=\"\" src=\""+this.blankGif+"\" class=\"lconnSprite lconnSprite-iconShared16\">"+_6a(this._strings["gen_shared"]);
this.imgVisCommunityHtml="<img name=\"communityFolder\" alt=\"\" src=\""+this.blankGif+"\" class=\"lconnSprite lconnSprite-iconCommunities16\">"+_6a(this._strings["gen_community_folder"]);
},_getExtendedAltText:function(_6c,vis,ext,gen){
_6c=typeof (_6c)=="string"?_6c:this.isFolder()?"folder":"file";
vis=typeof (vis)=="string"?vis:(_6c=="folder"&&this.isCommunityFolder())?"_community":this.isPublic()?"_public":this.isShared()?"_shared":"_private";
ext=typeof (ext)=="string"?ext:this.isExternal()?"_ext":"";
gen=typeof (gen)=="string"?gen:this.getTitle()?"":"_gen";
var str=this._strings[_6c+vis+gen+ext];
return (str.indexOf("{0}")>-1?dojo.replace(str,{0:this._getTitleForHTML()}):str);
},postMixInProperties:function(){
this.inherited(arguments);
},postCreate:function(){
this.inherited(arguments);
},startup:function(){
this.render();
},destroy:function(){
this.pTree._removeNodeRef(this);
if(this.pTree.rootTree.selectedNode===this){
this.pTree.rootTree.selectedNode=null;
}
this.inherited(arguments);
return true;
},getElHeader:function(){
return (this.headerDiv);
},getElCheckbox:function(){
return (this.checkboxDiv);
},getElTwisty:function(){
return (this.twistyDiv);
},getElIcon:function(){
return (this.iconDiv);
},getElTitle:function(){
return (this.titleDiv);
},getElExternalIcon:function(){
return (this.externalDivDiv);
},getElVisibility:function(){
return (this.visibilityDivDiv);
},getParentTree:function(){
return (this.pTree);
},getChildTree:function(){
return (this.tree);
},getParentNode:function(){
return (this.getParentTree().parentNode);
},getRoot:function(){
if(this.getParentTree()){
return (this.getParentTree().getRoot());
}
return null;
},getDnd:function(){
return (this.getRoot()?this.getRoot().getDnd():null);
},getNodes:function(_6d){
if(typeof (_6d)=="undefined"){
_6d=false;
}
if(this.getChildTree()){
return this.getChildTree().getNodes(_6d);
}else{
return null;
}
},getFileBean:function(){
return (this.nodebean.getFileBean());
},getCollBean:function(){
return (this.nodebean.getCollBean());
},getBean:function(){
return ((this.isFolder()?this.getCollBean():this.getFileBean()));
},getId:function(){
return (this.data.entryId);
},getTitle:function(){
return (this.data.title);
},getFeedURI:function(){
return (this.data.feed);
},isFolder:function(){
return (this.nodebean.isFolder());
},isFile:function(){
return (!this.nodebean.isFolder());
},isExternal:function(){
return (this.nodebean.isExternal());
},isPrivate:function(){
return (this.nodebean.isPrivate());
},isPublic:function(){
return (this.nodebean.isPublic());
},isShared:function(){
return (this.nodebean.isShared());
},isCommunityFolder:function(){
return (this.nodebean.isCommunityFolder());
},isCommunity:function(){
return (this.nodebean.isCommunity());
},isDirty:function(){
return (this.nodebean.isDirty());
},isBreadcrumb:function(){
return (this.getParentTree()&&this.getParentTree().isBreadcrumb());
},select:function(_6e){
if(typeof (_6e)==="undefined"){
_6e=false;
}
this._selectNode(_6e);
},focus:function(_6f){
if(typeof (_6f)==="undefined"){
_6f=false;
}
this._focusNode(_6f);
},unselect:function(_70){
if(typeof (_70)==="undefined"){
_70=false;
}
this._deselectNode(_70);
},selectToggle:function(_71){
if(typeof (_71)==="undefined"){
_71=false;
}
this._toggleSelectNode(_71);
},isSelectable:function(){
return this._isSelectable();
},isSelected:function(){
return this._isSelected();
},disable:function(){
this._disableNode();
},enable:function(){
this._enableNode();
},isDisabled:function(){
return this._isDisabled();
},expand:function(_72){
if(typeof (_72)==="undefined"){
_72=false;
}
var _73=this.cfg.ds.xhrSync;
this.cfg.ds.xhrSync=true;
this._expandNode(_72);
this.cfg.ds.xhrSync=_73;
},isExpandable:function(){
var _74=this.getRoot();
return (this.isFolder()&&!this.isDisabled()&&!this._isFlatDepth()&&this._isLessThanMaxDepth()&&(this.hasChildren()||_74.cfg.opts.isBreadcrumb));
},isExpanded:function(){
return this._isTwistyOpen;
},isNavigatable:function(){
return (this.isFolder()?this.cfg.opts.folder.behavior.isTitleAnchored:this.cfg.opts.file.behavior.isTitleAnchored);
},collapse:function(_75){
if(typeof (_75)==="undefined"){
_75=false;
}
this._collapseNode(_75);
},isTreeLoaded:function(){
return this._isContainerLoaded;
},reloadTree:function(){
if(this.tree){
this.tree.destroy();
}
this._loadTree();
},hasChildren:function(){
return (this.data.childrenCount>0||(this.getChildTree()&&this.getChildTree().getNodesCount()>0));
},addChildNode:function(_76,_77){
if(!_76){
return null;
}
if(typeof (_76)!="object"){
return null;
}
if(_76.declaredClass!="lconn.share.widget.Node"&&!lconn.share.widget.nodebean.isSupportedBean(_76)){
return null;
}
if(typeof (_77)=="undefined"){
_77=true;
}
if(!this.getChildTree()){
if(_77){
var _78=this.cfg.ds.xhrSync;
this.cfg.ds.xhrSync=true;
this._loadTree();
this.cfg.ds.xhrSync=_78;
}else{
this._createTree();
this.collapse();
}
}
return (this.getChildTree()?this.getChildTree().addNode(_76):null);
},update:function(_79){
if(typeof (_79)!="object"||!lconn.share.widget.nodebean.isSupportedBean(_79)){
return null;
}
var _7a=lconn.share.widget.nodebean.createNodeBean(_79);
if(this.getChildTree()&&this.nodebean.visibilityDiffers(_7a)){
this.getChildTree().updateNodesVisibility(_7a,true);
}
this.nodebean=_7a;
this._initNodeData();
this._initImgHtml();
this._displayHeader();
return this;
},updateVisibility:function(_7b){
if(typeof (_7b)=="undefined"){
_7b=this.nodebean;
}
if(typeof (_7b)!="object"||!lconn.share.widget.nodebean.isSupportedBean(_7b)){
return null;
}
this.nodebean.setNodeVisibilityData(_7b);
this._initTooltip();
this._initImgHtml();
this._displayHeader();
},move:function(_7c,_7d){
if(!_7c||typeof (_7c)!="object"){
return null;
}
if(_7c.declaredClass!="lconn.share.widget.Tree"&&_7c.declaredClass!="lconn.share.widget.Node"){
return null;
}
if(typeof (_7d)=="undefined"){
_7d=true;
}
if(this==_7c){
return null;
}
var _7e=(_7c.declaredClass=="lconn.share.widget.Node");
var _7f=this.pTree;
var _80=_7f.getParentNode();
var _81=(_7e?_7c.getChildTree():_7c);
var _82=(_7e?_7c:_7c.getParentNode());
if(!_81){
_82._createTree();
if(!_7d){
_82.collapse();
}
_81=_7c.getChildTree();
}
if(_81){
var _83=_81.getNodeById(this.getId());
if(_83){
_83.remove();
}
if(_81.addNode(this)){
if(_7f._removeNodeRef(this)){
var _84=this.getNodes(true);
for(id in _84){
var _85=_84[id];
var _86=_85.getParentNode();
if(_86){
_85._setLevel(_86._getLevel()+1);
}
_84[id]._indent();
}
if(_82){
_82.render();
}
if(_80){
_80.render();
}
return this;
}
}
}
return null;
},remove:function(){
this.destroyRecursive();
var _87=this.getParentNode();
if(_87&&!_87.hasChildren()){
_87.collapse(true);
}
},sortNodes:function(_88){
if(this.getChildTree()){
this.getChildTree().sortNodes(_88);
}
},isRadioed:function(){
return ((this.isFolder()&&this.cfg.opts.folder.render.checkbox&&!this.cfg.opts.folder.behavior.isMultiSelectable)||(this.isFile()&&this.cfg.opts.file.render.checkbox&&!this.cfg.opts.file.behavior.isMultiSelectable));
},recalcWidths:function(){
this._calcAndApplyWidths();
},isVisible:function(){
if(!this.headerDiv){
return;
}
return (!((dojo.exists("domNode.offsetParent",this)&&this.domNode.offsetParent===null)||(dojo.contentBox(this.headerDiv).w==0)));
},render:function(){
try{
var _89=this.getRoot();
var _8a=false;
if(_89){
_8a=_89.hasScrollBar();
}
this._displayHeader();
this._addDnd();
if(_89&&_8a!=_89.hasScrollBar()){
_89.recalcNodeWidths(true);
}
if(typeof (this.cfg.cb.node.preselect)=="function"&&this.cfg.cb.node.preselect.call(this,this)){
this._selectNode();
}
if(typeof (this.cfg.cb.node.disable)=="function"&&this.cfg.cb.node.disable.call(this,this)){
this._disableNode();
}
dojo.publish("lconn/share/widget/Node/rendered",[this]);
if(typeof (this.cfg.cb.node.rendered)=="function"){
this.cfg.cb.node.rendered.call(this,this);
}
}
catch(ex){
throw new Error(ex);
}
},_isDisabled:function(){
if(!this.headerOuterDiv){
return null;
}
return (dojo.hasClass(this.headerOuterDiv,this.classNodeDisabled));
},_enableNode:function(){
if(this.headerOuterDiv){
dojo.removeClass(this.headerOuterDiv,this.classNodeDisabled);
}
if(this.titleAnchor){
dojo.style(this.titleAnchor,"cursor","auto");
}
},_disableNode:function(){
if(this.headerOuterDiv){
dojo.addClass(this.headerOuterDiv,this.classNodeDisabled);
}
if(this.titleAnchor){
dojo.style(this.titleAnchor,"cursor","default");
}
},_isSelectable:function(){
return (this.isFolder()&&this.cfg.opts.folder.behavior.isSelectable)||(this.isFile()&&this.cfg.opts.file.behavior.isSelectable);
},_isSelected:function(){
if(!this.headerSelectorDiv){
return null;
}
return (dojo.hasClass(this.headerSelectorDiv,this.classNodeSelected));
},_onUpArrow:function(evt){
if(this.cfg.opts.isBreadcrumb&&this.isExpanded()){
return;
}
var _8b=dojo.query("div[name='node']",this.pTree.containerNode);
var _8c=_8b[0];
if(_8c.id==this.domNode.id){
if(!this.cfg.opts.isBreadcrumb){
var _8d=this.getParentNode();
if(_8d){
_8d.focus(false);
}
}
}else{
var _8e=this.domNode.previousElementSibling||this.domNode.previousSibling;
if(!this.cfg.opts.isBreadcrumb){
_8b=dojo.query("div[name='node']",_8e);
for(var i=_8b.length-1;i>=0;i--){
if(_8b[i].offsetHeight>0){
_8e=_8b[i];
break;
}
}
this._focusNodeByDOMNode(_8e);
}else{
this._focusNodeByDOMNode(_8e);
}
}
},_onDownArrow:function(evt){
if(this.isExpanded()){
var e=dojo.query("div[name='node']",this.tree.containerNode)[0];
if(e){
this._focusNodeByDOMNode(e);
}
}else{
var _8f=null;
var _90=this.getRoot();
if(_90.cfg.opts.isBreadcrumb){
_8f=dojo.query("div[name='node']",this.pTree.containerNode);
}else{
_8f=dojo.query("div[name='node']");
}
if(_8f&&_8f.length>0){
var _91=null;
for(var i=0,_92=false;i<_8f.length;i++){
if(_8f[i].id==this.domNode.id){
_92=true;
continue;
}
if(_92){
if(_8f[i].offsetHeight){
_91=_8f[i];
break;
}
}
}
if(_91){
this._focusNodeByDOMNode(_91);
}
}
}
},_onRightArrow:function(evt){
if(!this.isExpandable()){
return;
}
if(this.isExpanded()){
}else{
this.expand(false);
}
},_onLeftArrow:function(evt){
if(this.isExpanded()){
this.collapse(false);
}else{
parent=this.getParentNode();
if(!this.cfg.opts.isBreadcrumb){
if(parent){
parent.focus();
}
}else{
if(parent){
parent.collapse(false);
}
}
}
},_onSpace:function(evt){
if(this._isSelectable()){
this._toggleSelectNode(false);
}
},_onEnter:function(evt){
this._onclickTitle(null);
},_onHome:function(evt){
var e=dojo.query("div[name='node']",this.pTree.containerNode)[0];
if(e){
this._focusNodeByDOMNode(e);
}
},_onEnd:function(evt){
var _93=dojo.query("div[name='node']",this.pTree.containerNode);
var e=_93[_93.length-1];
if(e){
this._focusNodeByDOMNode(e);
}
},_focusNodeByDOMNode:function(_94){
if(!_94){
return;
}
var e=dojo.query("[name='headerSelector']",_94)[0];
if(e){
e.focus();
}
},_focusNode:function(_95){
if(this.headerSelectorDiv){
this.headerSelectorDiv.focus();
this.getRoot().setTabindexable(this.headerSelectorDiv);
}
},_selectNode:function(_96){
if(typeof (_96)==="undefined"){
_96=false;
}
if(this.isDisabled()){
return;
}
if(this.isFolder()&&!this.cfg.opts.folder.behavior.isMultiSelectable){
this._deselectSelectedNode(_96);
}
if(this.isFile()&&!this.cfg.opts.file.behavior.isMultiSelectable){
this._deselectSelectedNode(_96);
}
dojo.attr(this.domNode,"aria-selected","true");
if(this.headerSelectorDiv){
dojo.addClass(this.headerSelectorDiv,this.classNodeSelected);
dojo.addClass(this.headerSelectorDiv,"lotusSelected");
}
if(this.titleDiv){
dojo.attr(this.titleDiv,"aria-pressed","true");
}
if(this.isFolder()){
if(this.cfg.opts.folder.behavior.isHighlightedOnSelect){
this._highlightNode();
}
if(this.cfg.opts.folder.behavior.isCheckedOnSelect){
this._checkboxNode();
}
}else{
if(this.isFile()){
if(this.cfg.opts.file.behavior.isHighlightedOnSelect){
this._highlightNode();
}
if(this.cfg.opts.file.behavior.isCheckedOnSelect){
this._checkboxNode();
}
}
}
this.pTree.rootTree.selectedNode=(!this.cfg.opts.folder.behavior.isMultiSelectable&&!this.cfg.opts.file.behavior.isMultiSelectable)?this:null;
if(!_96){
dojo.publish("lconn/share/widget/Node/selected",[this]);
if(typeof (this.cfg.cb.node.selected)=="function"){
this.cfg.cb.node.selected.call(this,this);
}
}
},_deselectNode:function(_97){
if(typeof (_97)==="undefined"){
_97=false;
}
if(this.isDisabled()){
return;
}
dojo.attr(this.domNode,"aria-selected","false");
if(this.headerSelectorDiv){
dojo.removeClass(this.headerSelectorDiv,this.classNodeSelected);
dojo.removeClass(this.headerSelectorDiv,"lotusSelected");
}
if(this.titleDiv){
dojo.attr(this.titleDiv,"aria-pressed","false");
}
this._dehighlightNode();
this._decheckboxNode();
this.pTree.rootTree.selectedNode=null;
if(!_97){
dojo.publish("lconn/share/widget/Node/unselected",[this]);
if(typeof (this.cfg.cb.node.unselected)=="function"){
this.cfg.cb.node.unselected.call(this,this);
}
}
},_deselectSelectedNode:function(_98){
if(typeof (_98)==="undefined"){
_98=false;
}
if(this.pTree.rootTree.selectedNode){
this.pTree.rootTree.selectedNode._deselectNode();
}
},_toggleSelectNode:function(_99){
if(typeof (_99)==="undefined"){
_99=false;
}
if(this.isDisabled()){
return;
}
if(this._isSelected(_99)){
this._deselectNode(_99);
}else{
this._selectNode(_99);
}
},_highlightNode:function(){
if(this.headerSelectorDiv){
dojo.addClass(this.headerSelectorDiv,this.classNodeHighlighted);
}
},_dehighlightNode:function(){
if(this.headerSelectorDiv){
dojo.removeClass(this.headerSelectorDiv,this.classNodeHighlighted);
}
},_checkboxNode:function(){
this.checkbox.checked=true;
this.radio.checked=true;
},_decheckboxNode:function(){
this.checkbox.checked=false;
this.radio.checked=false;
},_onfocusRadio:function(){
if(this.isRadioed()&&!this.isSelected()&&!this.getParentTree().getSelectedNode()){
this.select();
}
},_collapseNode:function(_9a){
if(typeof (_9a)==="undefined"){
_9a=false;
}
if(!_9a){
if(typeof (this.cfg.cb.node.beforecollapsed)=="function"){
this.cfg.cb.node.beforecollapsed.call(this,this);
}
}
this._isTwistyOpen=false;
this._setTwistyAltText();
this._displayTwisty();
this._hideContainer();
dojo.attr(this.domNode,"aria-expanded","false");
if(!_9a){
dojo.publish("lconn/share/widget/Node/collapsed",[this]);
if(typeof (this.cfg.cb.node.collapsed)=="function"){
this.cfg.cb.node.collapsed.call(this,this);
}
}
},_expandNode:function(_9b){
if(typeof (_9b)==="undefined"){
_9b=false;
}
if(!_9b){
if(typeof (this.cfg.cb.node.beforeexpanded)=="function"){
this.cfg.cb.node.beforeexpanded.call(this,this);
}
}
this._isTwistyOpen=true;
this._setTwistyAltText();
this._displayTwisty();
dojo.attr(this.domNode,"aria-expanded","true");
if(this._isContainerLoaded&&this.cfg.opts.isCached&&!this.isDirty()){
this._showContainer();
}else{
this._loadTree();
}
if(!_9b){
dojo.publish("lconn/share/widget/Node/expanded",[this]);
if(typeof (this.cfg.cb.node.expanded)=="function"){
this.cfg.cb.node.expanded.call(this,this);
}
}
},_addDnd:function(){
if(!lconn.core.config.features("files-tree-dnd")){
return;
}
if(!lconn.core.auth.isAuthenticated()){
return;
}
var _9c=this.cfg.opts.isDndSource&&lconn.core.config.features("files-tree-dnd-source");
if(this.cfg.opts.isDndTarget||_9c){
dojo.addClass(this.headerOuterDiv,"dojoDndItem");
dojo.attr(this.headerOuterDiv,"dndType",this.isFolder()?"folder":"file");
}
},_displayHeader:function(){
this._displayCheckbox();
this._displayTwisty();
this._displayIcon();
this._displayTitle();
this._displayExternal();
this._displayVisibility();
this._indent();
this.headerDiv.style.display="";
this._calcAndApplyWidthsWhenVisible();
lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage(this.domNode);
},_indent:function(){
this._indentHeader(this._getIndentPx());
},_indentHeader:function(_9d){
if(typeof _9d==="undefined"){
_9d=0;
}
if(dojo._isBodyLtr()){
this.headerDiv.style.marginLeft=_9d+"px";
}else{
this.headerDiv.style.marginRight=_9d+"px";
}
},_getIndentPx:function(){
return ((this._getLevel()-1)*this.indentNodePx);
},_getLevel:function(){
return (this.getParentTree()._getLevel());
},_setLevel:function(_9e){
this.getParentTree()._setLevel(_9e);
},_calcAndApplyWidthsWhenVisible:function(){
if(this.isVisible()){
this._calcAndApplyWidths();
}else{
var _9f=this;
setTimeout(function(){
_9f._calcAndApplyWidthsWhenVisible();
},500);
}
},_calcAndApplyWidths:function(){
if(!this.isVisible()){
return;
}
var _a0=10;
var _a1=this._calcAndApplyMaxWidthForTitle(_a0);
var _a2=(_a1!=null&&_a1<_a0);
if(_a2){
dojo.style(this.domNode,"display","none");
}else{
if(dojo.style(this.domNode,"display")=="none"){
dojo.style(this.domNode,"display","block");
}
}
},_calcAndApplyMaxWidthForTitle:function(_a3){
if(typeof _a3=="undefined"){
_a3=10;
}
var _a4=this.getRoot();
var _a5=null;
if(_a4&&_a4.domNode.parentNode){
_a5=dojo.contentBox(_a4.domNode.parentNode).w;
if(_a4.hasScrollBar()){
_a5-=dojo.marginBox(_a4.containerNode).w-dojo.contentBox(this.domNode).w;
}
_a5-=dojo.marginBox(this.headerOuterDiv).w-dojo.contentBox(this.headerOuterDiv).w;
_a5-=dojo.marginBox(this.headerSelectorDiv).w-dojo.contentBox(this.headerSelectorDiv).w;
_a5-=dojo.marginBox(this.headerDiv).w-dojo.contentBox(this.headerDiv).w;
_a5-=dojo.marginBox(this.checkboxDiv).w;
_a5-=dojo.marginBox(this.twistyDiv).w;
_a5-=dojo.marginBox(this.iconDiv).w;
var _a6=((this.isFolder()&&this.cfg.opts.folder.behavior.titleWidthCalcConsidersSuffixedElements)||(this.isFile()&&this.cfg.opts.file.behavior.titleWidthCalcConsidersSuffixedElements));
if(_a6){
_a5-=dojo.marginBox(this.externalDiv).w;
_a5-=dojo.marginBox(this.visibilityDiv).w;
}
_a5-=dojo.marginBox(this.titleDiv).w-dojo.contentBox(this.titleDiv).w;
_a5-=2;
_a5-=4;
_a5-=Math.max(1,this._getLevel())*4;
dojo.style(this.titleDiv,"maxWidth",Math.max(_a5,_a3)+"px");
}
return _a5;
},_onchangeHeader:function(evt){
if(typeof (this.cfg.cb.node.header.onchange)=="function"){
this.cfg.cb.node.header.onchange.call(this,this,evt);
}
},_isClickedTargetExcludedChild:function(_a7){
var _a8=((this.cfg.cb.node.header.onclickchildexcludelist.checkbox&&(_a7==this.checkbox||_a7==this.radio))||(this.cfg.cb.node.header.onclickchildexcludelist.twisty&&_a7==this.twistyAnchor)||(this.cfg.cb.node.header.onclickchildexcludelist.icon&&(_a7==this.iconDiv||_a7.parentElement==this.iconDiv))||(this.cfg.cb.node.header.onclickchildexcludelist.title&&(_a7==this.titleDiv||_a7==this.titleAnchor)));
return _a8;
},_onclickHeader:function(evt){
if(this.isDisabled()){
return;
}
if(typeof (this.cfg.cb.node.header.onclick)=="function"){
if(!evt||!this._isClickedTargetExcludedChild(evt.target)){
this.cfg.cb.node.header.onclick.call(this,this,evt);
}
}
if(evt&&evt.target&&(evt.target==this.checkbox||evt.target==this.radio||evt.target==this.twistyAnchor||evt.target==this.iconDiv||evt.target.parentElement==this.iconDiv||evt.target==this.titleDiv||evt.target==this.titleAnchor)){
return;
}
if(evt){
dojo.stopEvent(evt);
}
if(this._isSelectable()){
this._toggleSelectNode();
}
},_onmouseenterHeader:function(evt){
if(typeof (this.cfg.cb.node.header.onmouseenter)=="function"){
this.cfg.cb.node.header.onmouseenter.call(this,this,evt);
}
},_onmouseleaveHeader:function(evt){
if(typeof (this.cfg.cb.node.header.onmouseleave)=="function"){
this.cfg.cb.node.header.onmouseleave.call(this,this,evt);
}
},_displayCheckbox:function(){
if((this.isFolder()&&this.cfg.opts.folder.render.checkbox)||(this.isFile()&&this.cfg.opts.file.render.checkbox)){
this.checkboxDiv.style.display="";
var _a9=this.headerSelectorDiv;
if(this.isRadioed()){
this.radio.style.display="";
dojo.attr(_a9,"role",this.ariaRoleNodeRadio);
}else{
this.checkbox.style.display="";
dojo.attr(_a9,"role",this.ariaRoleNodeCheckbox);
}
}
},_onclickCheckbox:function(evt){
if(typeof (this.cfg.cb.node.header.checkbox.onclick)=="function"){
this.cfg.cb.node.header.checkbox.onclick.call(this,this,evt);
}
if(this.isDisabled()){
this._decheckboxNode();
return;
}
if(this.isRadioed()){
if(!this.isSelected()){
this.select();
}
}else{
this._toggleSelectNode();
}
},_displayTwisty:function(){
if(this.isFolder()&&!this.cfg.opts.folder.render.twisty){
return;
}
if(this.isFile()&&!this.cfg.opts.file.render.twisty){
return;
}
if(this._isFlatDepth()){
return;
}
this.twistyDiv.style.display="";
if(this._isLessThanMaxDepth()){
if(this.hasChildren()){
if(this.isFolder()){
if(this._isTwistyOpen){
dojo.replaceClass(this.twistyAnchor,"lotusTwistyOpen","lotusTwistyClosed");
dojo.attr(this.twistySymbol,"innerHTML","V");
}else{
dojo.replaceClass(this.twistyAnchor,"lotusTwistyClosed","lotusTwistyOpen");
dojo.attr(this.twistySymbol,"innerHTML",">");
}
this.twistyAnchor.style.display="";
}
}else{
this.twistyAnchor.style.display="none";
}
}
},_getTwistyAltText:function(){
var s="";
if(this.isFolder()){
s=(this.isExpanded()?this._strings["folder_collapse"]:this._strings["folder_expand"]);
s=(s&&s.indexOf("{0}")>-1?dojo.replace(s,{0:this._getTitleForHTML()}):s);
}
return (s||null);
},_setTwistyAltText:function(){
this.altTwisty=this._getTwistyAltText();
if(this.twistyDiv&&this.twistyDiv.title){
this.twistyDiv.title=this.altTwisty;
if(this.twistyAnchor&&dojo.attr(this.twistyAnchor,"aria-label")){
dojo.attr(this.twistyAnchor,"aria-label",this.altTwisty);
}
}
},_onclickTwisty:function(evt){
if(typeof (this.cfg.cb.node.header.twisty.onclick)=="function"){
this.cfg.cb.node.header.twisty.onclick.call(this,this,evt);
}
if(this.isDisabled()){
return;
}
if(this._isFlatDepth()){
return;
}
if(this._isTwistyOpen){
this._collapseNode();
}else{
this._expandNode();
}
},_displayIcon:function(){
if(this.isFolder()&&!this.cfg.opts.folder.render.icon){
return;
}
if(this.isFile()&&!this.cfg.opts.file.render.icon){
return;
}
dojo.place("<span class=\"imgVAlignHelper\"></span>"+this._getHtmlIcon(),this.iconDiv,"only");
this.iconDiv.style.display="";
},_getHtmlIcon:function(){
if(this.isFolder()){
return this._getFolderIconHtml();
}else{
return this._getDocIconHtml();
}
},_getFolderIconHtml:function(){
if(this.isCommunityFolder()){
return this.imgFolderCommunityHtml;
}
if(this.isPrivate()){
return this.imgFolderPrivateHtml;
}
if(this.isPublic()){
return this.imgFolderPublicHtml;
}
if(this.isShared()){
return this.imgFolderSharedHtml;
}
return this.imgFolderClosedHtml;
},_getDocIconHtml:function(){
return this.imgFileHtml;
},_onclickIcon:function(evt){
if(typeof (this.cfg.cb.node.header.icon.onclick)=="function"){
this.cfg.cb.node.header.icon.onclick.call(this,this,evt);
}
if(this.isDisabled()){
return;
}
if(this.isFolder()){
if(this.isExpandable()){
this._onclickTwisty(evt);
}else{
if(this._isSelectable()){
this._toggleSelectNode();
}
}
}
},_displayTitle:function(){
if((this.isFolder()&&this.cfg.opts.folder.render.checkbox)||(this.isFile()&&this.cfg.opts.file.render.checkbox)){
dojo.attr(this.titleDiv,"for",this.id+(this.cfg.opts.folder.behavior.isMultiSelectable?"_checkbox":"_radio"));
}
if(this.isNavigatable()){
dojo.attr(this.titleDiv,"tabindex","-1");
}
this._insertHtmlTitle(this.titleDiv);
if(this.isFolder()&&!this.cfg.opts.folder.render.title){
return;
}
if(this.isFile()&&!this.cfg.opts.file.render.title){
return;
}
this.titleDiv.style.display="";
},_getTitleForHTML:function(){
return this.data._titleForHTML;
},_getHtmlTitle:function(){
var _aa=dojo.doc.createElement("span");
dojo.addClass(_aa,"bidiAware");
var _ab=dojo.doc.createTextNode(lconn.core.util.html.encodeHtml(this._getTitleForHTML()));
dojo.place(_ab,_aa);
return _aa;
},_insertHtmlTitle:function(_ac){
var _ad=this._getHtmlTitle();
dojo.addClass(_ad,"lconnTextA11yHidden");
dojo.place(_ad,_ac,"only");
var _ae=dojo.doc.createElement("a");
dojo.attr(_ae,"tabindex","-1");
dojo.attr(_ae,"href","javascript:;");
dijit.setWaiRole(_ae,"presentation");
dojo.addClass(_ae,"lotusAltText");
var _af=this._getHtmlTitle();
dojo.place(_af,_ae,"only");
dojo.place(_ae,_ac);
},_getTitleAltText:function(){
var _b0=null;
if(typeof (this.cfg.cb.node.tooltip)=="function"){
_b0=this.cfg.cb.node.tooltip.call(this,this);
}
return ((_b0&&_b0.length>0)?_b0:this._getTitleForHTML());
},_getTitleAriaText:function(){
var s=(this.isDisabled()?this._strings["gen_disabled"]:(this._isSelectable()?this._strings["gen_click_to_select"]:this._strings["gen_click_to_expand"]));
s=(s&&s.indexOf("{0}")>-1?dojo.replace(s,{0:this.getTitle()}):s);
return (s||null);
},_setTitleAltText:function(){
this.altTitle=this._getTitleAltText();
this.ariaLabelTitle=this._getTitleAriaText();
if(this.titleDiv&&this.titleDiv.title){
this.titleDiv.title=this.altTitle;
if(dojo.attr(this.titleDiv,"aria-label")){
dojo.attr(this.titleDiv,"aria-label",this.ariaLabelTitle);
}
}
},_onclickTitle:function(evt){
if(evt){
if(evt.type!="click"&&(evt.type!="keypress"||evt.keyCode!=dojo.keys.ENTER)){
return;
}
dojo.stopEvent(evt);
}
if(this.isDisabled()){
return;
}
if(typeof (this.cfg.cb.node.header.title.onclick)=="function"){
this.cfg.cb.node.header.title.onclick.call(this,this,evt);
}
if(this._isSelectable()){
this._toggleSelectNode();
}
},_displayExternal:function(){
if(this.isFolder()&&!this.cfg.opts.folder.render.externalIcon){
return;
}
if(this.isFile()&&!this.cfg.opts.file.render.externalIcon){
return;
}
if(this._getHtmlExternal()){
dojo.place(this._getHtmlExternal(),this.externalDiv,"only");
this.externalDiv.style.display="";
}
},_getHtmlExternal:function(){
return (this.isExternal()?this.imgExternalHtml:null);
},_displayVisibility:function(){
if(this.isFolder()&&!this.cfg.opts.folder.render.visibilityIcon){
return;
}
if(this.isFile()&&!this.cfg.opts.file.render.visibilityIcon){
return;
}
if(this._getHtmlVisibility()){
dojo.place(this._getHtmlVisibility(),this.visibilityDiv,"only");
this.visibilityDiv.style.display="";
}
},_getHtmlVisibility:function(){
if(this.isCommunity()){
return this.imgVisCommunityHtml;
}
if(this.isPrivate()){
return this.imgVisPrivateHtml;
}
if(this.isPublic()){
return this.imgVisPublicHtml;
}
if(this.isShared()){
return this.imgVisSharedHtml;
}
},_createTree:function(){
if(this.tree){
this.tree.destroy();
}
var _b1={};
_b1.datastore=dojo.clone(this.cfg.ds);
_b1.callbacks=dojo.clone(this.cfg.cb);
_b1.features=dojo.clone(this.cfg.opts);
_b1.datastore.uri=this.data.feed;
_b1.datastore.apiParamsOnUri=true;
_b1.datastore.feed=null;
_b1.datastore.beans=[];
_b1.parentNode=this;
_b1.rootTree=this.getRoot();
_b1._nodes=[];
_b1.ariaRoleFilesTree="presentation";
_b1.initHeight=_b1.rootTree.initHeight;
this.data.childrenCount=0;
this.tree=new lconn.share.widget.Tree(_b1);
if(this.tree){
this.tree.placeAt(this.domNode,"last");
}
return this.tree;
},_loadTree:function(){
if(this._createTree()){
this.tree.startup();
this._isContainerLoaded=true;
this._isTwistyOpen=true;
this._displayTwisty();
return true;
}
return false;
},_hideContainer:function(){
if(this.tree&&this.tree.containerNode){
dojo.style(this.tree.containerNode,"display","none");
}
},_showContainer:function(){
if(this.tree&&this.tree.containerNode){
dojo.style(this.tree.containerNode,"display","");
}
}});
dojo.declare("lconn.share.widget.datastore",null,{cfg:{predefined:"files",uri:null,apiParams:null,apiParamsOnUri:true,xhrSync:true,lazyLoad:true,nextPageUri:null,isAuthed:null,onError:null},xhr:{uri:null,contentType:"xml",sync:false,xhrTimeout:5000},constructor:function(_b2){
dojo.safeMixin(this.cfg,_b2||{});
try{
this.xhr.sync=this.cfg.xhrSync;
if(this.cfg.uri){
this.xhr.uri=(this.cfg.apiParamsOnUri?this._addParams(this.cfg.uri,this.cfg.apiParams):this.cfg.uri);
}else{
if(this.cfg.predefined==="files"){
this.xhr.uri=(this.cfg.apiParamsOnUri?this._addParams(this._getFilesAPI(),this.cfg.apiParams):this._getFilesAPI());
}else{
if(this.cfg.predefined==="ecm"){
this.xhr.uri=(this.cfg.apiParamsOnUri?this._addParams(this._getEcmAPI(),this.cfg.apiParams):this._getEcmAPI());
}
}
}
}
catch(ex){
throw new Error(ex.message);
}
},_addParams:function(uri,_b3){
if(!uri){
return null;
}
if(!_b3){
return uri;
}
_b3=(_b3[0]=="?"||_b3[0]=="&")?_b3.substring(1):_b3;
return (uri+(uri.indexOf("?")>-1?"&":"?")+_b3);
},_isAuthenticated:function(){
return (this.cfg.isAuthed||(this.cfg.isAuthed==null&&(lconn.core.auth.isAuthenticated()||(dojo.cookie("X-IC-Container-Token")&&dojo.cookie("X-IC-Container-Token").indexOf("$anonymous")==-1))));
},_getFilesAPI:function(){
var _b4=ic_comm_communityUuid?ic_comm_communityUuid:null;
var _b5=_b4!=null;
var _b6=location.protocol=="https:";
var _b7=lconn.core.config.services;
var _b8=lconn.core.url.getServiceUrl(_b7.files,_b6&&_b7.files.secureEnabled).uri;
return (_b8+"/form"+(this._isAuthenticated()?"":"/anonymous")+"/api"+(_b5?"/communitycollection/"+_b4:"/collections")+"/feed");
},_getEcmAPI:function(){
return null;
var _b9=location.protocol=="https:";
var _ba=lconn.core.config.services;
var _bb=lconn.core.url.getServiceUrl(_ba.ecm_files,_b9&&_ba.ecm_files.secureEnabled).uri;
var _bc="1CEE4C0B-5FEE-4C7B-8257-12E217740499;2442D594-24B0-4BA1-B169-39ED57E1096D";
return (_bb+"/atom"+(this._isAuthenticated()?"":"/anonymous")+"library/"+_bc+"/feed");
},load:function(cb){
this._xhrGet({url:com.ibm.oneui.util.proxy(this.xhr.uri),handleAs:this.xhr.contentType,timeout:this.xhr.xhrTimeout,sync:this.xhr.sync,error:dojo.hitch(this,function(_bd,_be){
if(this.cfg.onError){
this.cfg.onError.apply(this,arguments);
}
if(_bd.alreadyHandled){
return _bd.response;
}
this._xhrError(_bd,_be);
return _bd.response;
}),load:dojo.hitch(this,function(_bf,_c0){
cb.apply(this,arguments);
})});
},_xhrGet:function(_c1){
return this._xhr("GET",_c1);
},_xhrPost:function(_c2){
return this._xhr("POST",_c2);
},_xhrDelete:function(_c3){
return this._xhr("DELETE",_c3);
},_xhrPut:function(_c4){
return this._xhr("PUT",_c4);
},_xhr:function(_c5,_c6){
if(dojo.getObject("com.ibm.ajax.auth")){
com.ibm.ajax.auth.prepareSecure(_c6);
}
return dojo.xhr(_c5,_c6);
},_xhrError:function(_c7,_c8){
if(typeof (_c8)=="undefined"){
_c8="";
}
if(_c7){
if(_c7.status!=401&&_c7.dojoType!="cancel"){
throw new Error(_c7.message?_c7.message:_c7);
}
}
}});
dojo.declare("lconn.share.widget.nodebean",null,{_bean:null,_isFile:false,_isFolder:false,_isExternal:false,_isPublic:false,_isPrivate:false,_isShared:false,_isCommunityFolder:false,_isCommunity:false,_isDirty:false,constructor:function(_c9){
if(!lconn.share.widget.nodebean.isSupportedBean(_c9)){
throw "Invalid arguments used to create a lconn.share.widget.nodebean object";
}
this._bean=_c9;
switch(_c9.declaredClass){
case "lconn.share.bean.File":
this._isFile=true;
break;
case "lconn.share.bean.Collection":
this._isFolder=true;
break;
case "lconn.share.bean.CollectionFromFeed":
this._isFolder=true;
break;
}
this._initNodeVisibilityData(this.getBean());
this._isDirty=false;
},_initNodeVisibilityData:function(_ca){
if(typeof (_ca)!="object"||!lconn.share.widget.nodebean.isSupportedBean(_ca)){
return null;
}
this._isExternal=_ca.isExternal();
this._isPublic=_ca.isPublic();
this._isPrivate=_ca.isPrivate();
this._isShared=_ca.isShared();
this._isCommunityFolder=(_ca.isCommunityFolder?_ca.isCommunityFolder():this._calcIsCommunityFolder());
this._isCommunity=this._isCommunityFolder||(this.isFolder()?false:(this.getBean().getLibraryType()=="communityFiles"?true:false));
},getBean:function(){
return this._bean;
},getFileBean:function(){
return this.isFolder()?null:this.getBean();
},getCollBean:function(){
return this.isFolder()?this.getBean():null;
},isFolder:function(){
return this._isFolder;
},getId:function(){
return this.getBean().getId();
},getTitle:function(){
return this.isFolder()?this.getBean().getName():this.getBean().getTitle();
},getUrlFeed:function(){
return this.isFolder()?this.getBean().getUrlFeed():null;
},isExternal:function(){
return this._isExternal;
},isPrivate:function(){
return this._isPrivate;
},isPublic:function(){
return this._isPublic;
},isShared:function(){
return this._isShared;
},getMimeType:function(){
return this.isFolder()?null:this.getBean().getMimeType();
},isCommunityFolder:function(){
return this._isCommunityFolder;
},isCommunity:function(){
return this._isCommunity;
},_calcIsCommunityFolder:function(){
if(!this.isFolder()){
return false;
}
return ((!this.isPublic()&&this.getBean().getLibraryType&&(this.getBean().getLibraryType()=="communityFiles"||this.getBean().getLibraryType()=="communityECMFiles"))||(this.getBean().getType&&this.getBean().getType()=="community"));
},setNodeVisibilityData:function(_cb){
if(typeof (_cb)=="undefined"){
_cb=this.getBean();
}
if(typeof (_cb)!="object"||!lconn.share.widget.nodebean.isSupportedBean(_cb)){
return null;
}
this._isDirty=this.visibilityDiffers(_cb)?true:false;
this._initNodeVisibilityData(_cb);
},visibilityDiffers:function(_cc){
if(typeof (_cc)=="undefined"){
_cc=this.getBean();
}
if(typeof (_cc)!="object"||!lconn.share.widget.nodebean.isSupportedBean(_cc)){
return null;
}
return (this.isExternal()!=_cc.isExternal()||this.isPublic()!=_cc.isPublic()||this.isPrivate()!=_cc.isPrivate()||this.isShared()!=_cc.isShared()||(_cc._isCommunityFolder&&this.isCommunityFolder()!=_cc.isCommunityFolder()));
},isDirty:function(){
return this._isDirty;
}});
lconn.share.widget.nodebean.isSupportedBean=function(_cd){
return _cd.declaredClass=="lconn.share.bean.File"||_cd.declaredClass=="lconn.share.bean.Collection"||_cd.declaredClass=="lconn.share.bean.CollectionFromFeed"||_cd.declaredClass=="lconn.share.widget.nodebean";
};
lconn.share.widget.nodebean.createNodeBean=function(_ce){
if(lconn.share.widget.nodebean.isSupportedBean(_ce)){
return new lconn.share.widget.nodebean(_ce);
}
return null;
};
}


;if(!dojo._hasResource["lconn.files.widget.FolderTreeNavigation"]){
dojo._hasResource["lconn.files.widget.FolderTreeNavigation"]=true;
dojo.provide("lconn.files.widget.FolderTreeNavigation");
















dojo.declare("lconn.files.widget.FolderTreeNavigation",[lconn.files.widget.FolderNavigation],{_treeBeans:"xml",_apiType:"qcs",_tree:null,_listenerHashChange:null,subscribe:function(){
this.inherited(arguments);
if(!this._sceneRenderedHandle){
this._sceneRenderedHandle=dojo.subscribe("lconn/share/scene/render",this,"_onSceneRendered");
}
if(!this._listenerHashChange){
this._listenerHashChange=dojo.connect(window,"hashchange",dojo.hitch(this,function(_1){
if(location.hash.indexOf("/folder/")==-1&&this._treeWidget&&this._treeWidget.getSelectedNode()){
this._treeWidget.getSelectedNode().unselect();
}
}));
}
if(!this.navScrollChangeListener){
this.navScrollChangeListener=dojo.subscribe("lconn/share/widget/scrollable/adjusted",this,"_onScrollChange");
}
},destroy:function(){
this.inherited(arguments);
dojo.unsubscribe(this._sceneRenderedHandle);
if(this.navScrollChangeListener){
dojo.unsubscribe(this.navScrollChangeListener);
}
},_clearTreeWidget:function(){
if(this._tree){
this._tree.destroy();
dojo.destroy(this._tree);
}
this._tree=null;
},_toggleMyFolderEmptyMessage:function(_2){
if(_2.getRoot().getNodesCount()==0){
if(dojo.byId("myFolderEmptyMsg")){
dojo.removeClass(dojo.byId("myFolderEmptyMsg"),"lotusHidden");
}else{
dojo.place("<div class=\"XlotusSubsectionInfo\" aria-live=\"assertive\" id=\"myFolderEmptyMsg\">"+this.app.nls.COLLECTION_PICKER.MY_COLLECTIONS.EMPTY.ANY+"</div>",_2.domNode,"before");
}
}else{
if(dojo.byId("myFolderEmptyMsg")){
dojo.addClass(dojo.byId("myFolderEmptyMsg"),"lotusHidden");
}
if(dojo.exists("firstChildNode.headerSelectorDiv",_2)){
_2.setTabindexable(_2.firstChildNode.headerSelectorDiv);
}
}
},getTree:function(_3,_4,el){
if(this._tree){
return this._tree;
}
var _5=new lconn.share.widget.Tree({callbacks:{treeLoaded:dojo.hitch(this,this._toggleMyFolderEmptyMessage),onDrop:dojo.hitch(this,function(_6,_7,_8,_9,_a){
this.dropFile(dijit.byId(_7.id),_8,_9,_a);
}),node:{header:{title:{onclick:dojo.hitch(this,"_onNodeClicked")},onclick:dojo.hitch(this,"_onNodeClicked")},expanded:dojo.hitch(this,"_onNodeExpanded")},disableDropForItem:dojo.hitch(this,function(_b,_c){
var _d=(this.app&&this.app.scene&&this.app.scene.collection)?this.app.scene.collection:null;
if(_d&&_d.getId()==_c.getId()){
return true;
}
return false;
})},datastore:{predefined:"files",lazyLoad:true,xhrSync:true,onErrorCallback:function(ex){
throw ex.message;
},apiParams:"?category=collection&sK=name&sO=asc&creator="+this.app.authenticatedUser.id},features:{isCached:false,isDndSource:false,isDndTarget:true,folder:{render:{externalIcon:false,visibilityIcon:false},behavior:{isSelectable:false}},file:{show:false}}});
this._tree=_5;
this._tree.placeAt(el,"only");
dojo.addClass(el,"lconnFilesLeftNavTree");
this._tree.startup();
return this._tree;
},_onNodeClicked:function(_e,_f){
if(_f){
dojo.stopEvent(_f);
}
if(_e.isFolder()){
var _10=_e.getCollBean();
if(_10){
this.app.navigate(_10.getUrlAlternate());
}else{
console.warn("getCollBean() returns null.");
}
}
},loadChildren:function(all){
this.getTree(all,null,this.domNode);
},findNode:function(id){
if(this._tree){
return this._tree.getNodeById(id,true);
}
return null;
},unSelectNode:function(){
if(this._tree){
if(this._tree.selectedNode){
this._tree.selectedNode.unselect(true);
}
}
},findParentNode:function(e){
var _11=this.findParentId(e);
if(_11){
return this.findNode(_11);
}
return null;
},findParentId:function(e){
return e.collection.getParent()?e.collection.getParentId():null;
},onCreate:function(e){
var id=e.collection.getId();
var _12=this.findParentId(e);
var _13=this.findParentNode(e);
if(!_12){
this._tree.addNodeFromBean(e.collection,true);
this._tree.sortNodes();
this._toggleMyFolderEmptyMessage(this._tree);
}else{
if(_13){
if(_13.tree){
_13.tree.addNodeFromBean(e.collection,true);
_13.tree.sortNodes();
}else{
_13.addChildNode(e.collection,false);
}
}
}
},onUpdate:function(e){
if(this._tree){
this._tree.updateNode(e.collection);
}
},moveCollection:function(_14,_15){
if(!_14.isFolder()){
return;
}
var _16=_14.getId();
var _17=this.findNode(_16);
var _18=_15?this.findNode(_15.getId()):this._tree;
var _19=_17?_17.isSelected():false;
if(_17){
if(_18){
if(_19){
this.unSelectNode();
}
_17.update(_14);
_17.move(_18);
_18.sortNodes();
if(_19){
_17.select(true);
}
}else{
_17.destroy();
}
}else{
if(_18){
var _1a=_14.getParentId();
var _1b=this.findNode(_1a);
if(_1b){
_1b.data.childrenCount--;
_1b._displayTwisty();
}
if(_15){
if(_18.tree){
_18.tree.addNode(_14,true);
_18.tree.sortNodes();
}else{
_18.data.childrenCount++;
_18._displayTwisty();
}
}else{
_18.addNode(_14,true);
_18.sortNodes();
}
}
}
},onMove:function(e){
if(dojo.isArray(e.file)){
for(var i=0;i<e.file.length;i++){
this.moveCollection(e.file[i],e.collection);
}
}else{
this.moveCollection(e.file,e.collection);
}
this._toggleMyFolderEmptyMessage(this._tree);
},_selectNode:function(_1c,_1d){
var _1e=_1c?_1c.getChildTree().getNodeById(_1d):this._tree.getNodeById(_1d);
if(_1e&&!_1e.isSelected()){
_1e.selectToggle();
}
},_onSceneRendered:function(e){
if(!e||!e.sceneInfo||!this._tree){
return;
}
var _1f=e.sceneInfo;
var _20=this.selectedCollectionId;
if(_1f.collection){
this.selectedCollectionId=_1f.collection.getId();
}else{
this.selectedCollectionId=null;
}
if(!this.selectedCollectionId){
var _21=this._tree.getSelectedNode();
if(_21){
_21.unselect();
}
return;
}
var _22=_1f.collection.getParentId();
if(_22){
var _23=this.findNode(_22);
if(_23){
if(_23.isExpanded()){
this._selectNode(_23,this.selectedCollectionId);
}else{
_23.expand();
}
}else{
var _21=this._tree.getSelectedNode();
if(_21){
_21.unselect();
}
}
}else{
if(this.control.isOpen){
var _21=this._tree.getSelectedNode();
if(_21){
_21.unselect();
}
this._selectNode(null,this.selectedCollectionId);
}
}
},onDelete:function(e){
if(this._tree){
var _24=this._tree.getNodeById(e.collection.getId(),true);
var _25=_24?_24.isSelected():false;
if(_24){
_24.remove();
}
if(_25){
var _26=this.findParentNode(e);
if(_26){
_26.select(true);
}
}
this._toggleMyFolderEmptyMessage(this._tree);
}
},onChange:function(e){
if(!e){
return;
}
var _27=this.control;
if(!_27.isOpen&&this.openOnCreate&&e&&e.collectionCreate){
if(!this._tree){
_27.open();
return;
}else{
_27.open();
}
}
if(!this._tree){
return;
}
if(e.collectionCreate){
this.onCreate(e);
}
if(e.collectionDelete){
this.onDelete(e);
}
if(e.collectionChange){
if(e.collectionMove){
this.onMove(e);
}else{
this.onUpdate(e);
}
}
},_onNodeExpanded:function(_28){
if(this.selectedCollectionId){
this._selectNode(_28,this.selectedCollectionId);
}
},_onScrollChange:function(e){
if(this._tree){
this._tree.recalcNodeWidths(true);
}
}});
}


;if(!dojo._hasResource["lconn.files.scenes.Navigation"]){
dojo._hasResource["lconn.files.scenes.Navigation"]=true;
dojo.provide("lconn.files.scenes.Navigation");














dojo.declare("lconn.files.scenes.Navigation",null,{defaultSearchScope:"files",activeTab:"files",renderNavigation:function(d,el){
var _1=this.app;
var _2=_1.routes;
var _3=_1.nls;
var _4=_1.authenticatedUser;
var _5=_1.getUserPermissions().canShareWithPublic();
if(_4){
var _6=_4.id;
var _7=_4.orgName||_3.ORGNAME_DEFAULT;
}
var _8={};
var _9=[{id:"pinnedfiles",name:_3.PIVOTS.FAVORITE_FILES,tooltip:_3.PIVOTS.FAVORITE_FILES_TOOLTIP,url:_2.getFavoriteFilesUrl()},{id:"myfiles",name:_3.PIVOTS.MY_MEDIA,tooltip:_3.PIVOTS.MY_MEDIA_TOOLTIP,url:(_1.authenticatedUser)?_2.getUserChannelUrl(_1.authenticatedUser.id):_2.getPersonalUserChannelUrl()},{id:"withme",name:_3.PIVOTS.SHARED_WITH_ME,tooltip:_3.PIVOTS.SHARED_WITH_ME_TOOLTIP,url:_2.getUserSharesUrl({pivot:"withme"})}];
if(lconn.share.util.configUtil.isSharedByMeViewEnabled(_4)){
_9.push({id:"byme",name:_3.PIVOTS.SHARED_BY_ME,tooltip:_3.PIVOTS.SHARED_BY_ME_TOOLTIP,url:_2.getUserSharesUrl({pivot:"byme"})});
}
if(lconn.share.util.configUtil.canSyncPersonalFile(_4)){
_9.push({id:"fileSync",name:_3.PIVOTS.SYNCABLE_FILES,tooltip:_3.PIVOTS.SYNCABLE_FILES_TOOLTIP,url:_2.getFileSyncUrl()});
}
if(lconn.share.util.configUtil.canViewcommunities(_4)){
_9.push({id:"communityFiles",name:_3.PIVOTS.COMMUNITY_FILES,tooltip:_3.PIVOTS.COMMUNITY_FILES_TOOLTIP,url:_2.getCommunityFilesUrl()});
}
if(lconn.share.util.configUtil.canViewPublicFiles(_4)){
_9.push({id:"public",name:dojo.string.substitute(_3.PIVOTS.PUBLIC_MEDIA,{company:_7}),tooltip:dojo.string.substitute(_3.PIVOTS.PUBLIC_MEDIA_TOOLTIP,{company:_7}),url:_2.getPublicFilesUrl()});
}
if(dojo.getObject("lconn.share.config.features.trash")){
_9.push({id:"trash",name:_3.PIVOTS.DELETED_FILES,tooltip:_3.PIVOTS.DELETED_FILES_TOOLTIP,url:_2.getDeletedFilesUrl()});
}
_9.push(null);
var _a="lconn.share.config.services.folderNavigation.";
var _b=_3.PIVOTS.FAVORITE_COLLECTIONS;
var _c={id:"favoritefolders",name:_b.T,tooltip:_b.TT,url:_2.getCollectionsUrl({pivot:"pinned"}),renderEmpty:function(_d){
lconn.share.util.html.substitute(document,_d,this.msgEmpty,{icon:function(){
var _e=document.createElement("img");
_e.src=dijit._Widget.prototype._blankGif;
_e.alt="";
dijit.setWaiRole(_e,"presentation");
_e.className="lconnSprite lconnSprite-iconPinned16-off";
return _e;
}});
},msgEmpty:_3.CONTENT.EMPTY.FAVORITE_COLLECTIONS.SHORT,msgOpen:_b.EXP,msgCollapse:_b.COL,initialItems:(dojo.getObject(_a+"favorites")||20),serviceArgs:{byuser:_6,sortKey:"name",sortDescending:false},isExpandable:lconn.share.util.configUtil.isFileLeftNavigationPinnedExpandableEnabled(_4)};
_9.push(_6?new lconn.files.widget.FavoriteFolderNavigation(_1,_c):_c);
var _f={};
if(lconn.share.util.configUtil.isNestedFolderEnabled(_4)){
_f={byuser:_6,sortKey:"name",sortDescending:false};
}else{
_f={byuser:_6,sortKey:"updatedByName",sortDescending:true};
}
_c={id:"myfolders",name:_3.PIVOTS.MY_COLLECTIONS,authenticatedUser:_4,tooltip:_3.PIVOTS.MY_COLLECTIONS_TOOLTIP,url:_2.getCollectionsUrl({pivot:"personal"}),msgEmpty:_3.CONTENT.EMPTY.MY_COLLECTIONS.NORMAL,msgOpen:_3.PIVOTS.MY_COLLECTIONS_EXP,msgCollapse:_3.PIVOTS.MY_COLLECTIONS_COL,initialItems:(dojo.getObject(_a+"initial")||10),initialExtra:(dojo.getObject(_a+"peek")||5),allItems:(dojo.getObject(_a+"max")||30),serviceArgs:_f,openOnCreate:true,isExpandable:true,dndEnabled:true};
_9.push(_6?(lconn.share.util.configUtil.isNestedFolderEnabled(_4)?new lconn.files.widget.FolderTreeNavigation(_1,_c):new lconn.files.widget.FolderNavigation(_1,_c)):_c);
_c={id:"sharedfolders",name:_3.PIVOTS.COLLECTIONS,tooltip:_3.PIVOTS.COLLECTIONS_TOOLTIP,url:_2.getCollectionsUrl({pivot:"shared"}),msgEmpty:_3.CONTENT.EMPTY.COLLECTIONS.NORMAL,msgOpen:_3.PIVOTS.COLLECTIONS_EXP,msgCollapse:_3.PIVOTS.COLLECTIONS_COL,initialItems:(dojo.getObject(_a+"initial")||10),initialExtra:(dojo.getObject(_a+"peek")||5),allItems:(dojo.getObject(_a+"max")||30),serviceArgs:{sharedWithMe:true,sortKey:"updatedByName",sortDescending:true},isExpandable:lconn.share.util.configUtil.isFileLeftNavigationShareFolderExpandableEnabled(_4)};
_9.push(_6?new lconn.files.widget.FolderNavigation(_1,_c):_c);
if(lconn.share.util.configUtil.canViewPublicFolders(_4)&&lconn.share.util.configUtil.isPublicFoldersViewEnabled(_4)){
_9.push({id:"publicfolders",name:dojo.string.substitute(_3.PIVOTS.COLLECTIONS_PUBLIC,{company:_7}),tooltip:dojo.string.substitute(_3.PIVOTS.COLLECTIONS_PUBLIC_TOOLTIP,{company:_7}),url:_2.getCollectionsUrl({pivot:"public"}),control_css:_6?true:false});
}
var _10={};
_10[this.activeNavigationId]=1;
new lconn.files.widget.Navigation({id:"lotusSidenav",navigation:_9,activeIds:_10,openIds:_8,msgNavigationLabel:_3.NAVIGATION_ALT,msgToolbarLabel:_3.TOOLBAR_ALT,msgMore:_b.MORE,msgMoreAlt:_b.MORE_ALT,msgLess:_b.LESS,msgLessAlt:_b.LESS_ALT,msgToggleTooltip:_b.TOGGLE,msgError:_3.ERROR_OCCURRED,msgLoading:_3.LOADING,msgEmpty:_3.COLLECTIONS.EMPTY,msgViewAll:_3.VIEW_ALL},el.appendChild(document.createElement("div")));
},updateNavigation:function(d,el){
var w=dijit.byId("lotusSidenav");
if(!w){
this.renderNavigation(d,el);
}
var _11={};
_11[this.activeNavigationId]=1;
w.setActive(_11);
},getActiveNavigationLink:function(){
var w=dijit.byId("lotusSidenav");
return w?w.getActiveLink():null;
}});
}


;if(!dojo._hasResource["lconn.share.widget.StreamRenderer"]){
dojo._hasResource["lconn.share.widget.StreamRenderer"]=true;
dojo.provide("lconn.share.widget.StreamRenderer");










dojo.declare("lconn.share.widget.StreamRenderer",null,{minimalPaging:false,isPaging:true,emptyClass:"lconnEmpty",loadingClass:"qkrLoading",errorClass:"qkrError",constructor:function(_1){
this.widgets=[];
this.sorts=[];
dojo.mixin(this,_1);
},postMixInProperties:function(){
},destroy:function(){
this.cleanup();
},cleanup:function(){
lconn.share.util.misc.destroy(this.widgets);
this.widgets=[];
},isPagedRenderer:function(){
return this.isPaging;
},setMaxRendererHeight:function(_2){
},_getItems:function(_3){
return dojo.filter(lconn.share.util.dom.getElementsByTagNameNS(_3,"entry",lconn.share.util.dom.NAMESPACES.ATOM),function(e){
return e.parentNode==_3;
});
},_buildItem:function(_4){
return _4;
},initData:function(_5){
if(_5._init){
dojo.forEach(_5.itemByPosition,function(_6){
_6._isExpanded=_6._isRendered=null;
});
return _5.itemByPosition;
}
var _7=_5.itemById={};
var _8=_5.itemByPosition=[];
var _9=(_5.json)?_5.json.items:this._getItems(_5.xml);
var _a=(_5.paging)?Math.min(_5.paging.size,_9.length):_9.length;
for(var i=0;i<_a;i++){
var _b=_9[i];
var _c=undefined;
_b=this._buildItem(_b);
_8.push(_b);
if(typeof _b.getId=="function"){
_7[_b.getId()]=_b;
}else{
if(_b.id){
_7[_b.id]=_b;
}
}
try{
_b._position=i;
_b._qualifier=_c;
_b.feedItems=_5;
}
catch(e){
}
}
this.selectionUpdateItems(_8);
_5._init=true;
return _8;
},selectionChanged:function(_d){
},selectionUpdateItem:function(_e,_f){
},selectionUpdateItems:function(_10){
},updateItem:function(_11,_12,el,_13,_14){
if(_12.itemByPosition&&typeof _13=="number"){
_13=_12.itemByPosition[_13];
}
if(typeof _13._position=="undefined"){
_13=_12.itemById[_13.getId()];
}
if(!_13){
throw "Can't determine what row item was in";
}
if(_13){
if(_14){
_14=this.replaceItem(_12,_13,_14);
this.updateItemFinal(_11,_12,el,_13,_14);
}else{
this.net.getXml({url:this.getUrlExpand(_13),handle:dojo.hitch(this,this.updateItemComplete,_11,_12,el,_13),timeout:_11.timeoutRetrieve*1000});
}
}
},updateItemComplete:function(_15,_16,el,_17,_18,_19){
if(_18 instanceof Error){
}else{
var _1a=this.replaceItem(_16,_17,_18.documentElement);
this.updateItemFinal(_15,_16,el,_17,_1a);
}
},updateItemFinal:function(_1b,_1c,el,_1d,_1e){
_1c._isUpdated=true;
var _1f=_1d._position;
this.animations=[];
this._updateItem(_1b,_1c,el,_1e,_1d,_1f);
for(var i=0;i<this.animations.length;i++){
this.animations[i].play();
}
},render:function(_20,el,_21){
this.cleanup();
_21._init=false;
var _22=this.initData(_21);
var _23=_22.length;
if(_23==0){
this.renderEmpty(_20,el,_21);
}else{
this.updatePaging(_20,el,_21);
lconn.share.util.html.removeChildren(el);
this.renderSorting(_20,el,_21);
this.renderItems(_20,el,_21,_22,_23);
}
lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage();
},createA11NMessage:function(s,_24){
var _25=dojo.byId("scene-title");
var _26=dojo.query("a",_25)[0];
if(_25&&_26){
dijit.setWaiState(_26,"describedby",_24);
}
},renderAsTable:function(_27,el,_28,_29){
this.cleanup();
_28._init=false;
var _2a=this.feedAdapter;
var _2b=null;
if(_2a){
_2b=_2a.parse(_28);
}else{
_2b=this.initData(_28);
}
if(this.showRoot){
_2b.unshift(this.rootItem);
}
var _2c=_2b.length;
if(_2c>0){
var d=document;
var _2d=d.createDocumentFragment();
var _2e=d.createElement("th");
var a_t=d.createElement("a");
var _2f=d.createElement("span");
dijit.setWaiState(el,"live","assertive");
var _30=d.createElement("TABLE");
dijit.setWaiRole(_30,"presentation");
_30.className="lotusTable";
_30.style.fontSize="inherit";
_30.cellSpacing=_30.cellPadding=0;
this.decorateTable(_30);
var _31=this.getSortInfo(_27,_28);
if(_31){
var _32=_31.list;
var _33=_31.active;
var _34=_31.reversed;
var _35=d.createElement("THEAD");
var tr=d.createElement("TR");
tr.className="lotusSort";
for(var i=0,_36;_36=_32[i];i++){
var th=_2e.cloneNode(true);
if(_36.width){
th.width=_36.width;
}
if(_36.className){
th.className=_36.className;
}
if(_36.isSortable!=false){
var a=a_t.cloneNode(true);
dijit.setWaiRole(a,"button");
dijit.setWaiState(a,"pressed",_36==_33);
var asc=false;
if(_36==_33){
asc=((_36.lowToHigh)?!_34:_34);
dojo.addClass(a,asc?"lotusAscending":"lotusDescending");
}
this.generateSortLink(_27,_36,((_33?_33.id!=_36.id:true)||_34)?true:false,a);
a.appendChild(d.createTextNode(_36.name));
if(_36==_33){
var _37=_2f.cloneNode(true);
_37.className="lotusAltText";
_37.appendChild(d.createTextNode(asc?" \u25b2 ":" \u25bc "));
a.appendChild(_37);
}
th.appendChild(a);
}else{
th.appendChild(d.createTextNode(_36.name));
}
tr.appendChild(th);
}
_35.appendChild(tr);
_30.appendChild(_35);
}
var _38=d.createElement("TBODY");
for(var i=0;i<_2c;i++){
this.renderItem(_27,_38,_28,_2b[i],i,i==0,(i==_2c-1));
}
_30.appendChild(_38);
setTimeout(dojo.hitch(this,this.attachDragSource,_30,_27,_28),2000);
_2d.appendChild(_30);
this.updatePaging(_27,el,_28);
var _39=dojo._toArray(el.childNodes);
for(var _3a,i=0;_3a=_39[i];i++){
_3a.style.display="none";
}
el.replaceChild(_2d,_39[0]);
for(var _3a,i=0;_3a=_39[i];i++){
lconn.share.util.html.destroyWidgets(_3a);
if(_3a.parentNode){
_3a.parentNode.removeChild(_3a);
}
}
}else{
this.renderEmpty(_27,el,_28);
}
},decorateTable:function(_3b){
},attachDragSource:function(_3c,_3d,_3e){
},renderItems:function(_3f,el,_40,_41,_42){
for(var i=0;i<_42;i++){
this.renderItem(_3f,el,_40,_41[i],i,i==0,(i==_42-1));
}
},isSortValid:function(_43){
return true;
},getSortInfo:function(_44,_45){
var _46=this.sortId;
var _47=this.sortReversed;
var _48=dojo.filter(this.getSorts(_46,_47,_44,_45),dojo.hitch(this,this.isSortValid));
if(_48&&_48.length>0){
var _49=lconn.share.util.misc.indexById(_48,"id",_46);
if(!_46&&!_49){
for(var i=0;i<_48.length;i++){
if(_48[i].isDefault){
_49=_48[i];
break;
}
}
if(!_49){
_49=_48[0];
}
_47=false;
}
return {list:_48,active:_49,reversed:_47};
}
},renderSorting:function(_4a,el,_4b){
var _4c=this.getSortInfo(_4a,_4b);
if(_4c){
var _4d=_4c.list;
var _4e=_4c.active;
var _4f=_4c.reversed;
var d=document;
var div=d.createElement("div");
el.appendChild(div);
el=div;
var div=d.createElement("div");
div.className="lotusLeft lconnSelectAllContainer";
this.renderSelectAll(_4a,div,_4b,d);
el.appendChild(div);
var div=d.createElement("div");
div.className="lotusSort";
var ul=d.createElement("ul");
ul.className="lotusInlinelist";
dijit.setWaiRole(ul,"toolbar");
dijit.setWaiState(ul,"label",_4a._strings.SORT_BY);
var li=d.createElement("li");
li.className="lotusFirst";
li.appendChild(d.createTextNode(_4a._strings.SORT_BY));
ul.appendChild(li);
for(var i=0,_50;_50=_4d[i];i++){
if(!_50.id||_50.isSortable==false){
continue;
}
var li=d.createElement("li");
var a=d.createElement("a");
dijit.setWaiRole(a,"button");
dijit.setWaiState(a,"pressed",_50==_4e);
var asc=false;
if(_50==_4e){
asc=((_50.lowToHigh)?!_4f:_4f);
dojo.addClass(a,"lotusActiveSort");
dojo.addClass(a,asc?"lotusAscending":"lotusDescending");
setTimeout(dojo.hitch(this,function(_51){
if(_51&&lconn.share.widget.StreamRenderer.prototype.updateFromSorting){
lconn.share.widget.StreamRenderer.prototype.updateFromSorting=false;
dijit.focus(_51);
}
},a),120);
}else{
asc=!_50.lowToHigh;
}
var nls=_4a._strings;
var _52=asc?nls.SORTING_DESC:nls.SORTING_ASC;
if(_50.tooltip){
a.title=_50.tooltip;
_52=asc?dojo.string.substitute(nls.SORTING_DESC_LONG,[_50.tooltip]):dojo.string.substitute(nls.SORTING_ASC_LONG,[_50.tooltip]);
}
dijit.setWaiState(a,"label",_52);
this.generateSortLink(_4a,_50,((_4e?_4e.id!=_50.id:true)||_4f)?true:false,a);
a.appendChild(d.createTextNode(_50.name));
dojo.connect(a,"onclick",function(){
lconn.share.widget.StreamRenderer.prototype.updateFromSorting=true;
});
if(_50==_4e){
var _53=d.createElement("span");
_53.className="lotusAltText";
_53.appendChild(d.createTextNode(asc?" \u25b2 ":" \u25bc "));
a.appendChild(_53);
}
li.appendChild(a);
ul.appendChild(li);
}
if(ul.firstChild.nextSibling){
dojo.addClass(ul.firstChild.nextSibling,"lotusFirst");
}
var tb=new lconn.core.aria.Toolbar(ul,{_isSelected:function(_54){
return dojo.hasClass(_54,"lotusActiveSort");
}});
if(this.widgets){
this.widgets.push(tb);
}
div.appendChild(ul);
el.appendChild(div);
}
},renderSelectAll:function(_55,el,_56,d){
},renderItem:function(_57,el,_58,_59,_5a,_5b,_5c){
},renderLoading:function(_5d,el){
var d=document;
lconn.share.util.html.removeChildren(el);
var div=d.createElement("DIV");
div.className=this.loadingClass||"";
var img=d.createElement("IMG");
img.className="lotusLoading";
img.alt="";
img.src=dojo.config.blankGif;
div.appendChild(img);
div.appendChild(d.createTextNode("\xa0"));
div.appendChild(d.createTextNode(_5d._strings.LOADING));
el.appendChild(div);
},renderError:function(_5e,el,_5f,_60){
if(_60.type!="noFiles"){
var d=document;
lconn.share.util.html.removeChildren(el);
this.updatePaging(_5e,el,{});
this.renderSorting(_5e,el,_5f);
var div=d.createElement("DIV");
div.className=this.errorClass||"";
div.appendChild(d.createTextNode(_60.message));
dijit.setWaiState(div,"live","assertive");
el.appendChild(div);
}else{
this.renderEmpty(_5e,el,_5f);
}
},renderEmpty:function(_61,el,_62){
var d=document;
lconn.share.util.html.removeChildren(el);
this.updatePaging(_61,el,_62);
var div=d.createElement("DIV");
div.className=this.emptyClass||"";
var _63=_61.msgNoData||"Empty";
if(typeof _63=="string"){
_63=d.createTextNode(_63);
}else{
_63=_63.cloneNode(true);
}
div.appendChild(_63);
dijit.setWaiState(div,"live","assertive");
el.appendChild(div);
var _64=div.id="emptyMsg";
this.createA11NMessage(_61,_64);
},renderTypes:function(_65,el,_66){
var d=document;
if(this.types){
var div=d.createElement("div");
div.className="lotusSort";
var ul=d.createElement("ul");
ul.className="lotusInlinelist";
var li=d.createElement("li");
li.className="lotusFirst";
li.appendChild(d.createTextNode(_65.typeLabel));
ul.appendChild(li);
for(var i=0,_67;_67=this.types[i];i++){
var li=d.createElement("li");
if(i==0){
li.className="lotusFirst";
}
var a=d.createElement("a");
if(_67==this.activeType){
dojo.addClass(a,"lotusActiveSort");
}
this.generateLinkToTypes(_65,_67,a);
a.appendChild(d.createTextNode(_67.name));
li.appendChild(a);
ul.appendChild(li);
}
div.appendChild(ul);
el.appendChild(div);
}
},allowMultipleExpand:function(_68){
return true;
},forceExpandItem:function(_69,_6a,e){
if(e){
dojo.stopEvent(e);
}
var _6b=_69.data.itemByPosition[_6a];
if(!_6b._isExpanded){
this.toggleItem(_69,_6a);
}
},toggleItem:function(_6c,_6d,e){
if(e){
dojo.stopEvent(e);
}
var _6e=_6c.data.itemByPosition[_6d];
if(_6e._expanding){
return;
}
if(_6e._isExpanded){
this.collapseItem(_6c,_6c.data,_6e,_6d);
_6e._isExpanded=false;
if(!this.allowMultipleExpand()){
_6c._expandItem=null;
}
}else{
if(!_6e._isRendered){
if(!this.allowMultipleExpand()&&_6c._expandItem){
this.collapseItem(_6c,_6c.data,_6c._expandItem,_6c._expandItem._position);
_6c._expandItem._isExpanded=false;
_6c._expandItem=null;
}
this.renderItemExpand(_6c,_6c.data,_6e,_6d);
_6e._isRendered=true;
_6e._isExpanded=true;
if(!this.allowMultipleExpand()){
_6c._expandItem=_6e;
}
}else{
if(!this.allowMultipleExpand()&&_6c._expandItem){
this.collapseItem(_6c,_6c.data,_6c._expandItem,_6c._expandItem._position);
_6c._expandItem._isExpanded=false;
_6c._expandItem=null;
}
this.expandItem(_6c,_6c.data,_6e,_6d);
_6e._isExpanded=true;
if(!this.allowMultipleExpand()){
_6c._expandItem=_6e;
}
}
}
},updatePaging:function(s,el,_6f,opt){
var d=document;
opt=opt||{};
if(s.topPageNode){
s.topPageNode.className="lotusPaging";
}
if(s.bottomPageNode){
s.bottomPageNode.className="lotusPaging";
}
var _70=_6f.paging;
if(this.isPagedRenderer()&&_70&&_70.size>0&&_70.total!=0){
var _71=_70.hasPrevious();
var _72=_70.hasNext();
if(this.minimalPaging&&!_72&&!_71){
this._h(s.topPageNode);
this._h(s.bottomPageNode);
}else{
if(s.pageSizeListNode){
var _73=null;
var _74=s.pageSizeListNode.getElementsByTagName("A");
dojo.forEach(_74,function(_75){
_75.parentNode.style.display="";
_75.value=parseInt(_75.innerHTML);
var _76=s["pageSize_"+_75.value.toString()];
_76.style.display="none";
});
for(var i=0;i<_74.length;i++){
var _77=_74[i];
if(_77.value==_70.size){
_77.parentNode.style.display="none";
var _78=s["pageSize_"+_77.value.toString()];
_78.style.display="";
if(i==_74.length-1){
_73=_74[0];
}else{
_73=_74[i+1];
}
}else{
if(_77.value!=-1){
dijit.setWaiState(_77,"pressed",false);
dojo.connect(_77,"onclick",dojo.hitch(this,this.setPageSize,_77.value));
}
}
}
setTimeout(dojo.hitch(this,function(){
if(_73&&lconn.share.widget.StreamRenderer.prototype.updateFromPageSize){
lconn.share.widget.StreamRenderer.prototype.updateFromPageSize=false;
dijit.focus(_73);
}
}),120);
new lconn.core.aria.Toolbar(s.pageSizeListNode);
}
this._d(s.tPreviousLinkNode,_71);
this._d(s.bPreviousLinkNode,_71);
this._d(s.tNextLinkNode,_72);
this._d(s.bNextLinkNode,_72);
this._d(s.tPreviousTextNode,!_71&&_72);
this._d(s.bPreviousTextNode,!_71&&_72);
this._d(s.tNextTextNode,!_72&&_71);
this._d(s.bNextTextNode,!_72&&_71);
var _79=null;
if(!opt.dataInited){
if(!_71&&_72){
if(_79=s.tNextLinkNode||s.bNextLinkNode){
dijit.focus(_79.firstChild);
}
}
if(!_72&&_71){
if(_79=s.tPreviousLinkNode||s.bPreviousLinkNode){
dijit.focus(_79.firstChild);
}
}
}
if(this.minimalPaging){
var _7a=(_72||_71)?"":"none";
this._s(s.topPageNode,_7a);
this._s(s.bottomPageNode,_7a);
}else{
this._s(s.topPageNode);
this._s(s.bottomPageNode);
}
this._s(s.topPageNavigateNode);
this._s(s.bottomPageNavigateNode);
this.createPageCount(d,s,s.pageInfoNode,_70);
if(_70.total!=-1){
var _7b=Math.floor((_70.startIndex)/_70.size)+1;
var _7c=Math.ceil(_70.total/_70.size);
this.createPageList(d,s,s.pageListNode,_7b,_7c);
this.createJumpTo(d,s,s.jumpPageNode,_7b,_7c);
}else{
this._h(s.pageListNode);
}
this._d(s.pageSizeListNode,_70.size!=-1);
var _7d=s.pageInfoNode.id="_paging_";
this.createA11NMessage(s,_7d);
}
}else{
this._h(s.topPageNode);
this._h(s.bottomPageNode);
this._h(s.topPageNavigateNode);
this._h(s.bottomPageNavigateNode);
this._h(s.pageSizeListNode);
this._h(s.pageInfoNode);
this._h(s.pageListNode);
this._h(s.jumpPageNode);
}
},_d:function(el,_7e){
if(!el){
return;
}
el.style.display=_7e?"":"none";
},_h:function(el){
if(!el){
return;
}
el.style.display="none";
},_s:function(el,_7f){
if(!el){
return;
}
el.style.display=_7f||"";
},createPageCount:function(d,s,el,_80){
if(!el){
return;
}
if(_80.startIndex!=-1){
var _81=_80.total!=-1?dojo.number.format(_80.total):"-1";
if(_80.displayTotal>0){
_81=dojo.number.format(_80.displayTotal);
}
var _82=_80.startIndex+1;
var end=_80.size+_80.startIndex;
if(_80.total!=-1){
end=Math.min(end,_80.total);
}
while(el.firstChild){
el.removeChild(el.firstChild);
}
var _83=[dojo.number.format(_82),dojo.number.format(end),_81];
var _84=_81==-1?dojo.string.substitute(s._strings.COUNT2,_83):dojo.string.substitute(s._strings.COUNT,_83);
var _85=_81==-1?dojo.string.substitute(s._strings.COUNT2,_83):dojo.string.substitute(s._strings.COUNT_ALT,_83);
el.appendChild(d.createTextNode(_84));
el.title=_85;
dijit.setWaiState(el,"label",_85);
if(s.msgCap&&!_80.hasNext()&&_80.total!=-1&&_80.displayTotal>_80.total){
var img=d.createElement("img");
img.alt=img.title=dojo.string.substitute(s.msgCap,[dojo.number.format(_80.total)]);
img.className="lconnSprite lconnSprite-iconAttention16";
img.style.margin="0 4px";
img.src=dojo.config.blankGif;
el.appendChild(img);
}
el.style.display="";
}else{
el.style.display="none";
}
},createJumpTo:function(d,s,el,_86,_87){
if(!el){
return;
}
if(_87>1){
while(el.firstChild){
el.removeChild(el.firstChild);
}
var _88=d.createElement("label");
_88.appendChild(d.createTextNode(s._strings.JUMP_TO_PAGE));
el.appendChild(_88);
var _89=d.createElement("input");
_89.id=s.id+"_ij";
_89.type="text";
_89.value=_86;
_89.setAttribute("autocomplete","OFF");
var _8a=dojo.string.substitute(s._strings.JUMP_TO_PAGE_ALT,[dojo.number.format(1),dojo.number.format(_87)]);
_89.title=_8a;
dijit.setWaiState(_89,"label",_8a);
el.appendChild(_89);
el.appendChild(d.createTextNode(dojo.string.substitute(s._strings.OF_PAGES,[dojo.number.format(_87)])));
dojo.attr(_88,"for",_89.id);
el.style.display="";
dojo.connect(_89,"onkeypress",function(e){
if(e.charOrCode==dojo.keys.ENTER){
dojo.stopEvent(e);
s.page(this.value>=_87?_87:this.value);
}
});
dojo.connect(_89,"onfocus",function(e){
dijit.selectInputText(this);
});
}else{
el.style.display="none";
}
},createPageList:function(d,s,el,_8b,_8c){
if(!el){
return;
}
el.style.display="none";
if(_8c>1){
while(el.firstChild){
el.removeChild(el.firstChild);
}
var li=d.createElement("li");
li.className="lotusFirst";
li.appendChild(d.createTextNode(s._strings.PAGE));
el.appendChild(li);
var _8d=3;
this.createSpecificPageLinks(d,s,el,1,1,_8b,_8c);
var _8e=_8b-_8d;
if(_8e<=3){
_8e=2;
}
var _8f=_8b+_8d;
if(_8f>=_8c-2){
_8f=_8c-1;
}
if(_8e>2){
var li=d.createElement("li");
li.appendChild(d.createTextNode(s._strings.ELLIPSIS));
el.appendChild(li);
}
for(var i=_8e;i<=_8f;i++){
this.createSpecificPageLinks(d,s,el,i,i,_8b,_8c);
}
if(_8f<_8c-1){
var li=d.createElement("li");
li.appendChild(d.createTextNode(s._strings.ELLIPSIS));
el.appendChild(li);
}
this.createSpecificPageLinks(d,s,el,_8c,_8c,_8b,_8c);
el.style.display="";
}else{
el.style.display="none";
}
},createSpecificPageLinks:function(d,_90,el,_91,_92,_93,_94){
for(var i=_91;i<=_92;i++){
var li=d.createElement("li");
if(i==1){
li.className="lotusFirst";
}
var _95=dojo.string.substitute(_90._strings.PAGE_ALT,[dojo.number.format(i),dojo.number.format(_94)]);
if(i!=_93){
var a=d.createElement("a");
this.generatePagingLink(_90,i,a);
a.appendChild(d.createTextNode(i));
a.title=_95;
dijit.setWaiState(a,"label",_95);
li.appendChild(a);
}else{
var _96=d.createElement("span");
_96.appendChild(d.createTextNode(dojo.number.format(i)));
_96.title=_95;
dijit.setWaiState(_96,"label",_95);
li.appendChild(_96);
}
el.appendChild(li);
}
},getSorts:function(_97,_98){
return this.sorts;
},changeSort:function(_99,_9a){
if(this.sortId){
this.sortReversed=(this.sortId==_9a)?!this.sortReversed:false;
}else{
this.sortReversed=false;
}
this.sortId=_9a;
if(this.getSortUrl){
_99.url=this.getSortUrl(_99,_9a,!this.sortReversed);
_99.refresh();
}
},generateSortLink:function(_9b,_9c,_9d,a){
a.href="javascript:;";
dojo.connect(a,"onclick",dojo.hitch(this,this.changeSort,_9b,_9c.id));
},generatePagingLink:function(_9e,_9f,a){
a.href="javascript:;";
dojo.connect(a,"onclick",dojo.hitch(_9e,_9e.page,_9f));
}});
}


;dojo.cache("lconn.share", "widget/templates/Stream.html", "<div class=\"${baseClass}\"> <div class=\"lotusPaging\" role=\"navigation\" aria-label=\"${_strings.PAGING_TOP_LABEL}\" dojoAttachPoint=\"topPageNode\" style=\"${_initPageStyle}\"> <div class=\"lotusLeft\" style=\"display:none;\" dojoAttachPoint=\"pageInfoNode\"></div> <ul class=\"lotusRight lotusInlinelist\" dojoAttachPoint=\"topPageNavigateNode\" style=\"display:none;\"> <li dojoAttachPoint=\"tPreviousLinkNode\" class=\"lotusFirst\"><a href=\"javascript:;\" dojoAttachEvent=\"onclick:previous\" title=\"${_strings.PREVIOUS_T}\">${_strings.PREVIOUS}</a></li> <li dojoAttachPoint=\"tPreviousTextNode\" class=\"lotusFirst\">${_strings.PREVIOUS}</li> <li dojoAttachPoint=\"tNextLinkNode\"><a href=\"javascript:;\" dojoAttachEvent=\"onclick:next\" title=\"${_strings.NEXT_T}\">${_strings.NEXT}</a></li> <li dojoAttachPoint=\"tNextTextNode\">${_strings.NEXT}</li> </ul> <ul class=\"lotusInlinelist\" style=\"display:none\" dojoAttachPoint=\"pageListNode\"><li class=\"lotusFirst\">${_strings.PAGE}</li></ul> </div> <div dojoAttachPoint=\"streamNode\"></div> <div class=\"lotusPaging\" role=\"navigation\" aria-label=\"${_strings.PAGING_BOTTOM_LABEL}\" dojoAttachPoint=\"bottomPageNode\" style=\"${_initPageStyle}\"> <ul class=\"lotusLeft lotusInlinelist\" dojoAttachPoint=\"pageSizeListNode\" role=\"toolbar\" aria-label=\"${_strings.SHOW}\" style=\"display: none;\"> <li class=\"lotusFirst\">${_strings.SHOW}</li> <li class=\"lotusFirst\"><a href=\"javascript:;\" role=\"button\">10</a></li> <li class=\"lotusFirst\" style=\"display: none;\" dojoAttachPoint=\"pageSize_10\" aria-disabled=\"true\">10</li> <li><a href=\"javascript:;\" role=\"button\">25</a></li> <li style=\"display: none;\" dojoAttachPoint=\"pageSize_25\" aria-disabled=\"true\">25</li> <li><a href=\"javascript:;\" role=\"button\">50</a></li> <li style=\"display: none;\" dojoAttachPoint=\"pageSize_50\" aria-disabled=\"true\">50</li> <li class=\"lotusLast\">${_strings.ITEMS_PER_PAGE}</li> </ul> <ul class=\"lotusRight lotusInlinelist\" dojoAttachPoint=\"bottomPageNavigateNode\" style=\"display: none;\"> <li dojoAttachPoint=\"bPreviousLinkNode\" class=\"lotusFirst\"><a href=\"javascript:;\" dojoAttachEvent=\"onclick:previous\" title=\"${_strings.PREVIOUS_T}\">${_strings.PREVIOUS}</a></li> <li dojoAttachPoint=\"bPreviousTextNode\" class=\"lotusFirst\">${_strings.PREVIOUS}</li> <li dojoAttachPoint=\"bNextLinkNode\"><a href=\"javascript:;\" dojoAttachEvent=\"onclick:next\" title=\"${_strings.NEXT_T}\">${_strings.NEXT}</a></li> <li dojoAttachPoint=\"bNextTextNode\">${_strings.NEXT}</li> </ul> <div style=\"display:none;\" dojoAttachPoint=\"jumpPageNode\"></div> </div> </div>");

;if(!dojo._hasResource["lconn.share.widget.Stream"]){
dojo._hasResource["lconn.share.widget.Stream"]=true;
dojo.provide("lconn.share.widget.Stream");












dojo.declare("lconn.share.widget.Stream",[dijit._Widget,dijit._Templated],{templatePath:dojo.moduleUrl("lconn.share","widget/templates/Stream.html"),renderer:null,renderers:{},net:null,url:null,data:null,view:"summary",baseClass:"",timeoutRetrieve:10,noStatus:false,proxyServlet:null,msgNoData:null,_strings:{},postMixInProperties:function(){
if(this.oldWidget){
var _1=this.oldWidget.data;
if(_1&&_1.fromUrl&&(_1.xml||_1.json)){
this.data={fromUrl:_1.fromUrl,xml:_1.xml,json:_1.json,paging:_1.paging};
}
delete this.oldWidget;
}
var r=this.getRenderer();
if(r){
this._initPageStyle=(r.minimalPaging)?"display: none":"";
if(r.templatePath){
this.templatePath=r.templatePath;
}
if(r.templateString){
this.templateString=r.templateString;
}
}else{
throw "Streams must be passed a renderer during initialization or have one statically defined";
}
},postCreate:function(){
this.msgNoData=this.msgNoData||this._strings.EMPTY;
this.inherited(arguments);
if(this.labelledBy){
dijit.setWaiRole(this.streamNode,"region");
dijit.setWaiState(this.streamNode,"labelledby",this.labelledBy);
}
if(this.pageSizeListNode){
var _2=this.pageSizeListNode.getElementsByTagName("A");
for(var i=0;i<_2.length;i++){
var _3=_2[i];
var _4=lconn.share.util.text.parseInt(_3.innerHTML,-1);
if(_4!=-1){
dojo.connect(_3,"onclick",dojo.hitch(this,function(_5){
lconn.share.widget.StreamRenderer.prototype.updateFromPageSize=true;
this.setPageSize(_5);
},_4));
var _6=this["pageSize_"+_4.toString()];
_6.title=_3.title=dojo.string.substitute(this._strings.SHOW_ALT,[dojo.number.format(_4)]);
}
}
}
this.getRenderer().renderLoading(this,this.streamNode);
},destroy:function(){
if(this.req&&!this.req.ioArgs._finished){
this.req.cancel();
}
if(this.renderer){
lconn.share.util.misc.destroy(this.renderer);
}
var rs=this.renderers||{};
for(var r in rs){
if(rs.hasOwnProperty(r)){
lconn.share.util.misc.destroy(rs[r]);
}
}
this.renderer=this.renderers=null;
this.inherited(arguments);
},getRenderer:function(){
return this.renderers[this.view]||this.renderer;
},setPageSize:function(_7,e){
if(e){
dojo.stopEvent(e);
}
if(this.data){
if(this.data.paging&&this.data.fromUrl){
var _8=this.data.paging;
if(_8.size!=_7&&_7>0){
var _9=_8.getPageUrl(1,_7);
if(_9){
this.url=_9;
this.refresh();
}
}
}
}
},page:function(_a,e){
if(e){
dojo.stopEvent(e);
}
if(_a<1||_a!=parseInt(_a)){
_a=1;
}
if(this.data){
if(this.data.paging&&this.data.fromUrl){
var _b=this.data.paging;
var _c=_b.getPageUrl(_a);
if(_c){
this.url=_c;
this.refresh();
}
}
}
},lastPage:function(e){
if(e){
dojo.stopEvent(e);
}
if(this.data&&this.data.paging){
this.page(this.data.paging.getLastPage());
}
},next:function(e){
if(e){
dojo.stopEvent(e);
}
if(this.data){
if(this.data.paging&&this.data.fromUrl){
var _d=this.data.paging;
var _e=_d.getNextUrl();
if(_e){
this.url=_e;
this.refresh();
}
}
}
},previous:function(e){
if(e){
dojo.stopEvent(e);
}
if(this.data){
if(this.data.paging&&this.data.fromUrl){
var _f=this.data.paging;
var url=_f.getPreviousUrl();
if(url){
this.refresh(url);
}
}
}
},refresh:function(url){
if(this.data){
if(this.data.fromUrl){
this.data=null;
if(typeof url=="string"){
this.url=url;
this.updated=false;
}
this.update();
}else{
this.update();
}
}
},update:function(_10,_11){
_11=_11||{};
var _12=_11.dataInited||false;
if(_10){
if(!_10.paging&&(_10.xml||_10.json)){
_10.paging=this.getPaging();
if(_10.xml){
_10.paging.detect(_10.url,_10.xml);
}else{
if(_10.json){
_10.paging.detect(_10.url,_10.json,"json");
}
}
if(this.handlePastLastPage(_10.paging)){
return;
}
}
}
if(arguments.length>0){
this.data=_10;
}else{
if(this.data&&this.data.rendered){
return;
}
}
if(!this.data&&this.url){
this._loadFromUrl(this.url);
}else{
if(this.data.error){
if(typeof this.data.error.message!="undefined"){
this.handleLoadError([this.data.error]);
}else{
this.handleLoadError([{type:"unknown",message:this._strings.ERROR}]);
}
}else{
if(this.data.xml){
this.getRenderer().render(this,this.streamNode,this.data,{dataInited:_12});
this.data.rendered=true;
this.onUpdate(this.data);
}else{
if(this.data.json){
this.getRenderer().render(this,this.streamNode,this.data,{dataInited:_12});
this.data.rendered=true;
this.onUpdate(this.data);
}else{
if(!this.data.rendered){
this.getRenderer().renderEmpty(this,this.streamNode,this.data);
this.data.rendered=true;
this.onUpdate(this.data);
}
}
}
}
}
},updateItem:function(_13,_14){
this.getRenderer().updateItem(this,this.data,this.streamNode,_13,_14);
lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage(this.domNode);
},handleLoadError:function(_15){
this.data={fromUrl:true,error:_15[0]};
this.onLoadError(_15);
if(_15&&_15.skip){
return;
}
this._updateWithError(_15[0]);
},onLoadError:function(_16){
},_updateWithError:function(_17){
this.getRenderer().renderError(this,this.streamNode,this.data,_17);
},_loadFromUrl:function(url){
if(!url||url==""){
this._updateWithError({message:"No URL specified",type:"noUrl"});
}else{
if(this.req&&!this.req.ioArgs._finished){
this.req.cancel();
}
var _18=this.handleAs||"xml";
this.req=this.net.get({noStatus:this.noStatus,url:(this.getProxyUrl?this.getProxyUrl(url):url),handleAs:_18,timeout:this.timeoutRetrieve*1000,auth:this.retryAfterLogin?{preventReload:true,onLogin:dojo.hitch(this,this._loadFromUrl,url)}:null,handle:dojo.hitch(this,this._loadFromUrlComplete)});
}
},getPaging:function(){
return new lconn.share.widget.StreamPaging({checkForMore:this.checkForMore,apiType:this.apiType});
},resetData:function(){
if(this.data){
delete this.data.xml;
delete this.data.json;
}
},_loadFromUrlComplete:function(_19,_1a){
_1a=_1a||{};
_1a._finished=true;
if(_19 instanceof Error){
var nls=this._strings;
var _1b=nls.ERROR_REQUEST_UNKNOWN||nls.ERROR_REQUEST||nls.ERROR;
console.error(_19);
var _1c=_19;
if(_19.code=="cancel"){
_1c.message=nls.ERROR_REQUEST_CANCELLED;
_1c.type="requestCancelled";
}else{
if(_19.code=="timeout"){
_1c.message=nls.ERROR_REQUEST_TIMEOUT;
_1c.type="serverNotResponding";
}else{
if(_19.code=="ItemNotFound"){
_1c.message=this.msgNoData||nls.EMPTY;
_1c.type="noFiles";
}else{
if(_19.code=="unauthenticated"){
_1c.message=nls.ERROR_REQUEST_UNAUTHENTICATED;
_1c.type="unauthenticated";
}else{
_1c.message=_1b;
_1c.type="unknown";
}
}
}
}
_1c.message=_1c.message||_1b;
this.handleLoadError([_1c]);
}else{
var _1d={url:_1a.url,fromUrl:true};
_1d.paging=this.getPaging();
if(_1a.handleAs=="xml"){
_1d.xml=_19.documentElement;
_1d.paging.detect(_1a.url,_19.documentElement);
}else{
if(_1a.handleAs=="json"){
_1d.json=_19;
_1d.paging.detect(_1a.url,_19,"json");
}
}
if(this.handlePastLastPage(_1d.paging)){
return;
}
this.data=_1d;
this.getRenderer().render(this,this.streamNode,_1d);
this.onUpdate(this.data);
}
this.req=null;
return _19;
},handlePastLastPage:function(_1e){
if(_1e.isPastEnd()){
var url=_1e.getLastPageUrl();
this.url=url;
this.update();
return true;
}
return false;
},onUpdate:function(_1f){
if(_1f&&(_1f.xml||_1f.json)){
if(!this.updated){
this.updated=true;
this.onFirstUpdate(_1f);
}
}
},onFirstUpdate:function(_20){
}});
}


;if(!dojo._hasResource["lconn.share.util.xsl"]){
dojo._hasResource["lconn.share.util.xsl"]=true;
dojo.provide("lconn.share.util.xsl");
dojo.declare("lconn.share.util.xsl.IEProcessor",null,{IS_XML:/^<\?xml /,constructor:function(_1){
if(!_1){
throw "Must specify an XSL uri";
}
var _2=["Msxml2.DOMDocument.6.0","Msxml2.DOMDocument.3.0","MSXML2.DOMDocument","MSXML.DOMDocument","Microsoft.XMLDOM"];
var _3=["Msxml2.FreeThreadedDOMDocument.6.0","MSXML2.FreeThreadedDOMDocument.3.0"];
var _4=["Msxml2.XSLTemplate.6.0","MSXML2.XSLTemplate.3.0"];
function _5(_6){
for(var i=0;i<_6.length;i++){
try{
var _7=new ActiveXObject(_6[i]);
if(_7){
return _6[i];
}
}
catch(e){
}
}
};
var _8=new ActiveXObject(_5(_3));
_8.async=false;
if(this.IS_XML.exec(_1)){
_8.loadXML(_1);
}else{
_8.load(_1);
}
var _9=new ActiveXObject(_5(_4));
_9.stylesheet=_8;
this.processor=_9.createProcessor();
},transform:function(_a,_b){
var _c;
var p=this.processor;
try{
var _d=new ActiveXObject(getActiveXImpl(ACTIVEX_DOMS));
_d.async=false;
_d.validateOnParse=false;
if(_b){
for(var i in _b){
p.addParameter(i,_b[i]);
}
}
p.input=_a;
p.output=_d;
p.transform();
if(_d.parseError.errorCode!=0){
throw outDoc.parseError;
}
_c=_d;
}
finally{
if(_b){
for(var i in _b){
p.addParameter(i,"");
}
}
}
return _c;
},transformToString:function(_e,_f){
var _10;
var p=this.processor;
try{
if(_f){
for(var i in _f){
p.addParameter(i,_f[i]);
}
}
p.input=_e;
p.transform();
_10=p.output;
}
finally{
if(_f){
for(var i in _f){
p.addParameter(i,"");
}
}
}
return _10;
},transformToHtml:function(_11,_12,_13){
var s=this.transformToString(_11,_13);
if(s){
var _14=document.createDocumentFragment();
var div=document.createElement("div");
div.innerHTML=s;
while(div.firstChild){
_14.appendChild(div.firstChild);
}
return _14;
}
return null;
}});
dojo.declare("lconn.share.util.xsl.Processor",null,{IS_XML:/^<\?xml /,constructor:function(uri,_15){
if(!uri){
throw "Must specify an XSL uri";
}
var _16=this.processor=new XSLTProcessor();
if(this.IS_XML.exec(uri)){
try{
var doc=new DOMParser().parseFromString(uri,"text/xml");
if(dojo.isFF==2&&doc.baseURI.indexOf("#")!=-1){
var _15=_15||lconn.share.util.xsl.Processor.documentImplementation;
if(!_15){
throw "quickr util.xsl.Processor requires a documentImplementation object if Firefox 2 is used";
}
var _17=_15.createDocument("","",null);
_17.appendChild(doc.documentElement);
doc=_17;
}
this.template=doc;
}
catch(e){
throw e;
}
}else{
var _18=document.implementation.createDocument("","",null);
_18.addEventListener("load",function(){
this.template=_18;
},false);
_18.async=false;
_18.load(uri);
}
_16.importStylesheet(this.template);
},setParams:function(p,_19){
if(_19){
for(var i in _19){
var _1a=_19[i];
if(dojo.isWebKit){
if(_1a===true){
_1a="true";
}else{
if(_1a===false){
_1a="false";
}
}
}
p.setParameter(null,i,_1a);
}
}
},transform:function(_1b,_1c){
var _1d;
var p=this.processor;
try{
this.setParams(p,_1c);
_1d=p.transformToDocument(_1b);
}
finally{
p.clearParameters();
}
return _1d;
},transformToHtml:function(_1e,_1f,_20){
var _21;
var p=this.processor;
try{
this.setParams(p,_20);
_21=p.transformToFragment(_1e,_1f);
if(!_21){
throw "XSLT transformation returned null";
}
}
finally{
p.clearParameters();
}
return _21;
}});
lconn.share.util.xsl.createProcessor=function(uri){
var _22=function(){
try{
return !!(window.ActiveXObject||window.ActiveXObject.prototype);
}
catch(e){
return false;
}
};
return (_22())?new lconn.share.util.xsl.IEProcessor(uri):new lconn.share.util.xsl.Processor(uri);
};
}


;if(!dojo._hasResource["lconn.share.widget.FileRendererCoreDndSource"]){
dojo._hasResource["lconn.share.widget.FileRendererCoreDndSource"]=true;
dojo.provide("lconn.share.widget.FileRendererCoreDndSource");




dojo.declare("lconn.share.widget.FileRendererCoreDndSource",dojo.dnd.Source,{customCanDrop:false,allowNested:true,_markTargetAnchor:function(_1){
if(this.current&&this.current.id){
var _2=this.getItem(this.current.id,true);
var _3=dojo.dnd.manager().nodes;
if(this.disableDropItem(_2,_3)||(this.current.id in this.selection)){
if(this.targetAnchor){
this._removeItemClass(this.targetAnchor,this.before?"Before":"After");
}
this.customCanDrop=false;
return;
}else{
this.customCanDrop=true;
}
}
this.inherited(arguments);
},disableDropItem:function(_4,_5){
var _6=(_4&&_4.type&&_4.type[0]=="folder");
if(!_6){
return true;
}
var _7=lconn.share.util.configUtil.isSingleFolderDndRightToRightEnabled(this.app.authenticatedUser);
var _8=lconn.share.util.configUtil.isSingleFileDndRightToRightEnabled(this.app.authenticatedUser);
for(var i=0;i<_5.length;i++){
var _9=this.getItem(_5[i].id,true);
if(_9&&_9.type){
switch(_9.type[0]){
case "folder":
if(!_7||_4.data.getId()===_9.data.getParentId()){
return true;
}
break;
case "file":
if(!_8){
return true;
}
break;
default:
break;
}
}
}
return false;
},onMouseMove:function(e){
this.inherited(arguments);
var m=dojo.dnd.manager();
if(!this.customCanDrop&&m&&m.avatar){
m.canDrop(false);
}
},onMouseDown:function(e){
if(!this.current){
return;
}
this.inherited(arguments);
var _a=lconn.share.util.configUtil.isMultipleFileAndFolderDndEnabled(this.app.authenticatedUser);
var _b=this.getAllNodes();
this._removeSelection();
for(var i=0;i<_b.length;i++){
if(_b[i].style.display=="none"){
continue;
}
var _c=this.getItem(_b[i].id,true);
if(_c&&_c.data._isSelected){
this.selection[_b[i].id]=1;
this._addItemClass(_b[i],"Selected");
}
}
var _d=Object.getOwnPropertyNames(this.selection).length;
if(this.current.id in this.selection){
if(_d>1&&_a||_d==1){
return;
}else{
this._removeSelection();
}
}else{
if(_d==0){
this.selection[this.current.id]=1;
}else{
this._removeSelection();
}
}
},onDndCancel:function(){
this.inherited(arguments);
var _e=dojo.dnd.manager();
for(var i=0;i<_e.nodes.length;i++){
if(dojo.hasClass(_e.nodes[i],"DndItemMoving")){
dojo.removeClass(_e.nodes[i],"DndItemMoving");
}
}
setTimeout(function(){
if(_e.mouseDrag){
_e.mouseDrag=false;
}
},100);
},onDndStart:function(){
this.inherited(arguments);
var _f=dojo.dnd.manager();
_f.mouseDrag=true;
for(var i=0;i<_f.nodes.length;i++){
if(!dojo.hasClass(_f.nodes[i],"DndItemMoving")){
dojo.addClass(_f.nodes[i],"DndItemMoving");
}
}
}});
}


;if(!dojo._hasResource["lconn.share.bean.StreamPermissions"]){
dojo._hasResource["lconn.share.bean.StreamPermissions"]=true;
dojo.provide("lconn.share.bean.StreamPermissions");
dojo.declare("lconn.share.bean.StreamPermissions",null,{constructor:function(_1){
if(_1){
dojo.mixin(this,_1);
}
},canFollow:function(_2){
return this._policyAllow(_2,"contentFollowing");
},canSync:function(_3){
return this._policyAllow(_3,"contentSync");
},canShareWithPublic:function(_4){
return this._policyAllow(_4,"organizationPublic");
},_policyAllow:function(_5,_6){
if(dojo.isArray(_5)){
for(var i=0;i<_5.length;i++){
if(!this._policyAllow(_5[i],_6)){
return false;
}
}
return true;
}
var _7;
if(_5){
_7=_5.getPolicy&&_5.getPolicy()||(this.policy?_5.getOrgId&&this.policy[_5.getOrgId()]||this.policy:null);
}else{
_7=this.policy;
}
return (!this.guest)&&(_7?_7[_6]!=false:true)&&(!_5||_5.getOrgId()==this.orgId||!_5.getOrgId());
},canShareInternal:function(){
return !this.guest&&dojo.getObject("lconn.share.config.features.sharingIntent")==true;
},canMakeInternal:function(_8){
return !this.guest&&_8;
},canTag:function(_9){
return this.canEdit(_9);
},canRate:function(_a){
return this.isAuthenticated();
},canEdit:function(_b){
if(!_b.hasFullPermissions()){
throw "Caller did not load permissions with this object, cannot check edit permissions";
}
return _b.getPermissions().Edit;
},canShare:function(_c){
if(!_c.hasFullPermissions()){
throw "Caller did not load permissions with this object, cannot check share permissions";
}
return this.isAuthenticated()&&_c.getPermissions().GrantAccessView;
},canDelete:function(_d){
if(!_d.hasFullPermissions()){
throw "Caller did not load permissions with this object, cannot check delete permissions";
}
return _d.getPermissions().Delete;
},canChangeVisibility:function(_e){
return this.canDemote(_e);
},canDemote:function(_f){
if(!_f.hasFullPermissions()){
throw "Caller did not load permissions with this object, cannot check grant permissions";
}
return _f.getPermissions().GrantAccess;
},canPromote:function(_10){
return this.canShareWithEdit(_10);
},canShareWithEdit:function(_11){
return this.canShare(_11)&&_11.getPermissions().GrantAccessEdit;
},canDeleteShare:function(_12){
return this.canDemote(_12);
},isAuthenticated:function(s){
return (s!==undefined?(s==this.authenticatedId):(typeof this.authenticatedId=="string"));
}});
lconn.share.bean.StreamPermissions.ANONYMOUS=new lconn.share.bean.StreamPermissions();
}


;if(!dojo._hasResource["lconn.share.util.Html5Util"]){
dojo._hasResource["lconn.share.util.Html5Util"]=true;
(function(){
dojo.mixin(dojo.provide("lconn.share.util.Html5Util"),{allowHTML5:function(){
var _1=dojo.doc.createElement("input");
_1.type="file";
return ("files" in _1)&&window.FormData;
}});
})();
}


;if(!dojo._hasResource["lconn.share.widget.CustomizeAvatar"]){
dojo._hasResource["lconn.share.widget.CustomizeAvatar"]=true;
dojo.provide("lconn.share.widget.CustomizeAvatar");


dojo.declare("lconn.share.widget.CustomizeAvatar",dojo.dnd.Avatar,{construct:function(){
if(this.manager.nodes.length){
var _1=this.manager.source;
var d=document;
var _2=d.createElement("div");
dojo.addClass(_2,"qkrDropAvatar");
dojo.style(_2,{position:"absolute",zIndex:1999,margin:"0px"});
var _3=_1._normalizedCreator(_1.getItem(this.manager.nodes[0].id,true),"avatar").node;
var _4=d.createElement("div");
_4.className="DropAvatarBadge";
_4.appendChild(d.createElement("div"));
_4.firstChild.appendChild(d.createTextNode(this.manager.nodes.length));
_2.appendChild(_4);
var _5=d.createElement("div");
_5.className="DropAvatarContainer topPostion";
_5.appendChild(_3);
_2.appendChild(_5);
if(this.manager.nodes.length>1){
var _6=d.createElement("div");
_6.className="DropAvatarContainer bottomPosition";
_2.appendChild(_6);
dojo.addClass(_5,"border");
}
this.node=_2;
}
},update:function(){
}});
}


;if(!dojo._hasResource["lconn.share.widget.FileRendererCore"]){
dojo._hasResource["lconn.share.widget.FileRendererCore"]=true;
dojo.provide("lconn.share.widget.FileRendererCore");


























dojo.declare("lconn.share.widget.FileRendererCore",[lconn.share.widget.StreamRenderer],{dnd:true,permissions:new lconn.share.bean.StreamPermissions(),_strings:{},useXslt:dojo.getObject("lconn.share.config.features.useXslt"),destroy:function(){
this.actions=[];
this.inherited(arguments);
lconn.share.util.misc.destroy(this.dndSource);
this.dndSource=null;
},apiType:"qcs",_buildItem:function(_1,_2){
if(_1 instanceof lconn.share.bean.PartialFile){
dojo.mixin(_2,_1);
return _2;
}
return lconn.share.bean.File.createBean(_1,{apiType:this.apiType});
},attachDragSource:function(_3,_4,_5){
if(!this.dnd){
return;
}
if(!this.permissions.isAuthenticated()){
return;
}
this.getItembyPosition=this.initData(_5);
if(this.dndSource&&this.dndSource.node==_3){
this.dndSource.sync();
return;
}
lconn.share.util.misc.destroy(this.dndSource);
this.dndSource=null;
dojo.dnd.manager().OFFSET_Y=-10;
var _6;
dojo.dnd.manager().makeAvatar=this._createCustomizeAvatar;
var _7=dojo.hitch(this,function(_8){
var _9=_8.data;
var _a=this._renderAvatar(_9);
return {node:_a,type:_8.type};
});
if(_3){
_6=this.dndSource=new lconn.share.widget.FileRendererCoreDndSource(_3,{app:this.app,copyOnly:true,selfAccept:true,accept:["file"],singular:true,withHandles:true,creator:_7,getItem:dojo.hitch(this,function(id,_b){
var _c=this.dndSource.map[id];
if(!_c){
return;
}
this.selectionUpdateItems(this.getItembyPosition);
var _d=this.getItembyPosition[_c.data];
return {data:_b?_d:_c.data,type:_d?(_d.isFolder()?["folder"]:["file"]):_c.type};
}),onDrop:dojo.hitch(this,function(_e,_f,_10){
try{
var _11=_e.targetAnchor;
var _12=_e.getItem(_11.id,true);
var _13=_12&&_12.data||null;
var _14=[];
dojo.forEach(_f,dojo.hitch(this,function(n,i){
var _15=n;
var _16=_e.getItem(_15.id,true);
var _17=_16&&_16.data||null;
_14.push(_17);
}));
if(_14.length>0&&_13&&_13.isFolder()){
if(typeof this._dropFile=="function"){
this._dropFile(_14,_13);
}
}else{
return;
}
}
catch(ex){
dojo.publish("/dnd/cancel",[_e]);
throw new Error("Exception: something went wrong during drag and drop operation: "+ex);
}
})});
}
},_createCustomizeAvatar:function(){
return new lconn.share.widget.CustomizeAvatar(dojo.dnd.manager());
},_renderAvatar:function(_18){
var d=document;
var _19=_18.isFolder()?null:_18.getExtension();
if(_19){
var img=d.createElement("img");
this.generateFileTypeImage(img,_19,16,_18);
}
var div=d.createElement("div");
if(img){
div.appendChild(img);
}
var _1a=d.createElement("span");
_1a.className="DropAvatarItem";
_1a.appendChild(d.createTextNode(lconn.share.util.text.trimToLength(lconn.share.util.html.formatFilename(_18.getName()),50)));
div.appendChild(_1a);
if(_18.isFolder()){
dojo.place(this._getFolderIcon(_18),div,"first");
}
return div;
},_getFolderIcon:function(_1b){
var _1c=dojo.config.blankGif;
if(_1b.type=="community"){
return "<img name=\"communityFolder\" src=\""+_1c+"\" class=\"lconnSprite-iconFolderClose24 lconnSprite-iconFolderCommunity24 dndFolderIcon\">";
}else{
if(_1b.isPrivate()){
return "<img name=\"privateFolder\" src=\""+_1c+"\" class=\"lconnSprite-iconFolderClose24 lconnSprite-iconFolderPrivate24 dndFolderIcon\">";
}else{
if(_1b.isPublic()){
return "<img name=\"publicFolder\" src=\""+_1c+"\" class=\"lconnSprite-iconFolderClose24 lconnSprite-iconFolderPublic24 dndFolderIcon\">";
}else{
if(_1b.isShared()){
return "<img name=\"sharedFolder\" src=\""+_1c+"\" class=\"lconnSprite-iconFolderClose24 lconnSprite-iconFolderShared24 dndFolderIcon\">";
}else{
return "<img name=\"closedFolder\" src=\""+_1c+"\" class=\"lconnSprite-iconFolderClose24 dndFolderIcon\">";
}
}
}
}
},render:function(_1d,el,_1e,_1f){
_1f=_1f||{};
var _20=new Date().getTime();
this.cleanup();
_1e._init=_1e._initXslt=false||_1f.dataInited;
this.animations=[];
this._render(_1d,el,_1e,_1f);
this.addDropPrompts(el,_1e);
for(var i=0;i<this.animations.length;i++){
this.animations[i].play();
}
var end=new Date().getTime();
if(!window["stats"]){
window.stats={};
}
if(!window.stats.jsRender){
window.stats.jsRender=[];
}
window.stats.jsRender.push(end-_20);
},addDropPrompts:function(el,_21){
var _22=this._getItems(_21.xml);
if(this.app.enableDnDPrompts&&this.app.isPersonalFiles&&lconn.share.util.Html5Util.allowHTML5()){
var _23=false;
var _24=this.app.scene.activePivot.navigationId;
if(_24=="myfiles"||_24=="pinnedfiles"){
_23=true;
}
if(this.app.scene&&this.app.scene.collection&&this.app.scene.collection.getPermissions().AddChild){
_23=true;
}
if(_23){
if(_22.length==0){
var d=document;
var _25=d.createElement("div");
dojo.addClass(_25,"tallDropfilesPrompt");
_25.style.width="9999px";
var _26=d.createElement("img");
_26.src=dojo.config.blankGif;
_26.alt="";
dojo.addClass(_26,"dropfilesIcon64");
_25.appendChild(_26);
var _27=d.createElement("p");
_27.appendChild(d.createTextNode(this._appstrings.DRAG_DROP.TITLE));
dojo.addClass(_27,"filesDnDTitle");
_27.id=dijit.getUniqueId("fileDropTitle");
var _28=d.createElement("p");
_28.appendChild(d.createTextNode(this._appstrings.DRAG_DROP.DESCRIPTION));
dojo.addClass(_28,"filesDnDDesc");
_25.appendChild(_27);
_25.appendChild(_28);
dijit.setWaiState(_25,"labelledby",_27.id);
dijit.setWaiRole(_25,"region");
el.appendChild(_25);
}
dojo.body().addEventListener("dragover",dojo.hitch(this,"addDropHighlights"),false);
dojo.body().addEventListener("drop",dojo.hitch(this,"removeDropHighlights"),false);
dojo.body().addEventListener("dragleave",dojo.hitch(this,"removeDropHighlights"),false);
}else{
dojo.body().addEventListener("dragover",dojo.hitch(this,"removeDropHighlights"),false);
}
}
},addDropHighlights:function(e){
e.stopPropagation();
e.preventDefault();
if(dojo.indexOf(e.dataTransfer.types,"Files")<0){
return;
}
dojo.addClass(dojo.byId("body"),"filesDropAvatar");
var _29=dojo.byId("lotusContent");
if(_29.clientWidth<770){
dojo.addClass(dojo.byId("body"),"filesDropAvatarSmallScreen");
}
},removeDropHighlights:function(e){
e.stopPropagation();
e.preventDefault();
dojo.removeClass(dojo.byId("body"),"filesDropAvatar");
dojo.removeClass(dojo.byId("body"),"filesDropAvatarSmallScreen");
},replaceItem:function(_2a,_2b,_2c){
var _2d=this._buildItem(_2c,_2b);
_2a.itemByPosition[_2b._position]=_2d;
_2a.itemById[_2b.getId()]=_2d;
_2d.author=_2d.getAuthor();
_2d.element=_2b.element;
_2d.elementExtra=_2b.elementExtra;
_2d.elementDetails=_2b.elementDetails;
_2d.elementMenu=_2b.elementMenu;
_2d._isExpanded=_2b._isExpanded;
_2d._isRendered=_2b._isRendered;
_2d._isEcmFile=_2b._isEcmFile;
_2d._position=_2b._position;
_2d._ratingImage=_2b._ratingImage;
_2d._ratingText=_2b._ratingText;
_2d._recommender=_2b._recommender;
_2d._libraryType=_2d.getLibraryType()||_2b.getLibraryType();
this.selectionUpdateItem(_2d,_2b);
return _2d;
},xsltAction:function(act,_2e,e){
var r=this.getRenderer();
r.initXsltData(this.data,this.streamNode);
r[act](this,_2e,e);
},hoverTime:function(_2f,_30,e){
var t=e.target;
if(!t._time){
if(!t.title){
t=t.parentNode;
}
t.onmouseover=null;
t._time=dojo.date.stamp.fromISOString(t.title);
t.title=new lconn.share.util.DateFormat(t._time).format(this._appstrings.DATE.FULL);
}
},hoverDownload:function(_31,_32,e){
var _33=_31.data.itemByPosition[_32];
var el=_33.element;
if(el&&!el._tooltip&&this.renderDownloadWarning){
var t=e.target;
t.onmouseover=null;
var _34=dojo.query(".lconnDownloadable",el)[0];
if(_34&&_34.nodeName.toLowerCase()=="a"){
var w=el._tooltip=this.renderDownloadWarning(_33.getName(),document,el.lastChild,_34);
w.onMouseEnter(e);
}
}
},getActions:function(_35){
return this.actions;
},getUrlExpand:function(_36){
var url;
if(this.permissions.isAuthenticated()){
url=_36.getUrlEdit();
}
if(!url){
url=_36.getUrlEntry();
}
var _37={acls:true,includeNotification:true,includeTags:true,includePolicy:true};
if(this.app&&this.app.scene&&this.app.scene.collection){
_37.collectionId=this.app.scene.collection.getId();
}
return lconn.share.util.uri.rewriteUri(url,_37);
},getUrlEditTags:function(_38){
return _38.getUrlEdit();
},decorateFileName:function(doc,h4,a){
this._configFileViewer(doc,h4,a);
},_configFileViewer:function(doc,h4,a){
if(lconn.core.config.features("fileviewer-detailspage")&&a&&!doc.isFolder()){
this._attachFileNameAction(doc,a);
}else{
if(a&&a._fileNameClickHandle){
dojo.disconnect(a._fileNameClickHandle);
}
}
},_attachFileNameAction:function(doc,a){
if(this.fileNameAction===undefined){
this.fileNameAction=dojo.filter(this.getActions(doc),function(a){
return a.declaredClass=="lconn.files.action.PreviewFile";
})[0]||null;
}
if(!this.fileNameAction){
return;
}
dojo.disconnect(a._fileNameClickHandle);
a._fileNameClickHandle=dojo.connect(a,"click",dojo.hitch(this,function(e){
e.stopPropagation();
e.preventDefault();
this.fileNameAction.execute(doc,{});
}));
},generateLinkToFile:function(doc,a){
a.href=doc.getUrlAlternate();
dojo.addClass(a,"lconnDownloadable");
},generateLinkToPerson:function(_39,a){
},generateLinkToTag:function(tag,a){
},generateFileTypeImage:function(img,ext,_3a){
},generateActionIcon:function(img,_3b,_3c){
},getLinkToUserTemplate:function(_3d){
return "javascript:;";
},getShareMessage:function(doc,nls){
return {};
},renderShareLink:function(el,_3e,_3f,_40,_41,_42){
var d=document;
if(_3e&&_3e.nodeType==1){
el.appendChild(_3e);
}else{
if(_3f){
el.appendChild(d.createTextNode(dojo.string.substitute(_3e,[_3f])));
}else{
el.appendChild(d.createTextNode(_3e));
}
}
},highlight:function(el){
this.animations.push(dojo.animateProperty(lconn.share.util.misc.animateBackground({duration:this.highlightDuration||2000,rate:this.highlightRate||100,node:el},this.highlightColorStart||"#e0e0e0",this.highlightColorEnd||"white")));
}});
}


;if(!dojo._hasResource["lconn.share.widget.AbstractRendererSocial"]){
dojo._hasResource["lconn.share.widget.AbstractRendererSocial"]=true;
dojo.provide("lconn.share.widget.AbstractRendererSocial");
dojo.declare("lconn.share.widget.AbstractRendererSocial",null,{allowMultipleExpand:function(_1){
return true;
},renderItemExpand:function(_2,_3,_4,_5){
var d=document;
var tr=_4.element;
var _6=_4.elementDetails||_4.elementExtra;
var td=_6.lastChild;
var _7=d.createElement("div");
_7.className="_qkrMessage";
td.appendChild(_7);
this.renderLoadingLink(_2,tr);
_4._expanding=true;
this.net.getXml({url:_4._isEcmFile?this.routes.getProxiedUrl(this.getUrlExpand(_4),{commonProxy:true}):this.getUrlExpand(_4),handle:dojo.hitch(this,this.completeItemExpand,_2,_3,_4,_5,arguments),timeout:_2.timeoutRetrieve*1000,auth:{preventReload:true,onLogin:dojo.hitch(this,this.renderItemExpand,_2,_3,_4,_5)}});
},completeItemExpand:function(_8,_9,_a,_b,_c,_d,_e){
var d=document;
var tr=_a.element;
var _f=_a.elementDetails||_a.elementExtra;
var td=_f.lastChild;
_a._expanding=false;
for(var _10,el=_f.lastChild.firstChild;el;){
_10=el.nextSibling;
if(dojo.hasClass(el,"_qkrMessage")){
el.parentNode.removeChild(el);
}
el=_10;
}
if(_d instanceof Error){
var _11=this._appstrings.FILE.EXPAND_ERROR;
var _12=_d.code;
var _13;
if(_12=="cancel"){
_13=_11.CANCEL;
}else{
if(_12=="timeout"){
_13=_11.TIMEOUT;
}else{
if(_12=="ItemNotFound"||_12=="AccessDenied"){
_13=_11.NOT_FOUND;
}else{
_13=_11.GENERIC;
}
}
}
var _14=d.createElement("div");
_14.className="lotusFormError _qkrMessage";
_14.appendChild(d.createTextNode(_13));
td.appendChild(_14);
this.renderHideLink(tr);
_f.style.display="";
}else{
var _15=dojo._toArray(_c);
_a=_15[2]=this.replaceItem(_9,_a,_d.documentElement);
this._renderItemExpand.apply(this,_15);
}
},toggleByElement:function(_16,e){
if(!e||e.button>(dojo.isIE?1:0)){
return;
}
var t=e.target;
var _17={td:1,th:1};
if(t&&t.nodeName){
if(dojo.indexOf(["div","ul","h4","td","th"],t.nodeName.toLowerCase())!=-1){
while(!_17[t.nodeName.toLowerCase()]){
t=t.parentNode;
}
var tr=t.parentNode;
if(dojo.hasClass(t,"dojoDndHandle")&&dojo.hasClass(tr,"dojoDndItemOver")){
return;
}
if(tr.style.cursor=="pointer"||t.style.cursor=="pointer"){
var i=dojo.indexOf(tr.parentNode.childNodes,tr);
i=Math.floor(i/2);
if(_16.xsltAct){
_16.xsltAct("toggleItem",i,e);
}else{
this.toggleItem(_16,i);
}
}
}
}
},expandItem:function(_18,_19,_1a,_1b){
var el=_1a.element;
var trd=_1a.elementDetails;
el.style.cursor=trd.style.cursor="";
this.renderHideLink(el);
this.showNodes(trd,"");
var _1c=el.firstChild.nextSibling.lastChild.childNodes;
for(var i=0;i<_1c.length;i++){
if(this.isSkipNode(_1c[i])){
var s=_1c[i].previousSibling;
while(s){
s.style.display="";
s=s.nextSibling;
}
break;
}
}
},collapseItem:function(_1d,_1e,_1f,_20){
var el=_1f.element;
var trd=_1f.elementDetails;
el.style.cursor=trd.style.cursor="pointer";
this.renderShowLink(el);
this.showNodes(trd,"none");
var _21=el.firstChild.nextSibling.lastChild.childNodes;
for(var i=0;i<_21.length;i++){
if(this.isSkipNode(_21[i])){
var s=_21[i].previousSibling;
while(s){
s.style.display="none";
s=s.nextSibling;
}
break;
}
}
},isSkipNode:function(el){
return false;
},_updateItem:function(_22,_23,el,_24,_25,_26){
var d=document;
var div=_25.element;
var _27=_25.elementDetails;
this.renderItem(_22,el,_23,_24,_26,_26==0,_26==_23.itemByPosition.length-1,div,_27);
if(_25._isExpanded){
_24._isRendered=true;
_24._isExpanded=true;
this._renderItemExpand(_22,_23,_24,_26);
}
},renderHideLink:function(tr){
var a=tr.lastChild.firstChild;
dojo.addClass(a,"qkrMoreLinkOpen");
a.removeChild(a.firstChild);
a.appendChild(document.createTextNode(this._strings.HIDE));
a.title=this._appstrings.CONTENT.HIDE_EXTRA;
dijit.setWaiRole(a,"button");
dijit.setWaiState(a,"expanded",true);
},renderShowLink:function(tr,trd){
var a=tr.lastChild.firstChild;
dojo.removeClass(a,"qkrMoreLinkOpen");
a.removeChild(a.firstChild);
a.appendChild(document.createTextNode(this._strings.MORE));
a.title=this._strings.VIEW_EXTRA;
dijit.setWaiRole(a,"button");
dijit.setWaiState(a,"expanded",false);
},renderLoadingLink:function(_28,tr){
var a=tr.lastChild.firstChild;
dojo.removeClass(a,"qkrMoreLinkOpen");
a.removeChild(a.firstChild);
a.title="";
var img=document.createElement("IMG");
img.className="lotusLoading";
img.alt=_28._strings.MORE_LOAD;
img.src=dojo.config.blankGif;
a.appendChild(img);
},renderDivider:function(d,el){
var _29=d.createElement("span");
_29.className="lotusDivider";
_29.appendChild(d.createTextNode("|"));
dijit.setWaiState(_29,"hidden",true);
dijit.setWaiRole(_29,"img");
el.appendChild(_29);
},showNodes:function(trd,_2a){
if(!trd.lastChild.firstChild){
trd.style.display="none";
}else{
trd.style.display=_2a;
}
},renderExternalIcon:function(el,_2b,msg,_2c){
if(dojo.isIE<9&&el.nodeName.toLowerCase()=="td"){
el=el.firstChild;
}
if(el&&dojo.getObject("lconn.share.config.features.sharingIntent")&&_2b&&_2b.isExternal()){
if(this.app&&this.app.isCommunityScene&&this.app.isExternalCommunity){
return;
}else{
var img=document.createElement("img");
img.src=dojo.config.blankGif;
img.className="lconnIconListSharedExternal";
img.title=img.alt=msg;
img.style.marginTop="1px";
img.style[dojo._isBodyLtr()?"marginLeft":"marginRight"]="5px";
el.appendChild(img);
var alt=document.createElement("span");
alt.className="lotusAltText";
alt.appendChild(document.createTextNode(", "+_2c));
el.appendChild(alt);
}
}
}});
}


;if(!dojo._hasResource["lconn.share.widget.FileRendererPostProcessor"]){
dojo._hasResource["lconn.share.widget.FileRendererPostProcessor"]=true;
dojo.provide("lconn.share.widget.FileRendererPostProcessor");




dojo.declare("lconn.share.widget.FileRendererPostProcessor",null,{postProcessDownloadLink:function(_1,_2,_3,_4){
var d=dojo.doc;
var _5=_1.length;
var _6=_2?2:1;
for(var i=0;i<_5;i+=_6){
var tr=_1[i];
if(!tr){
continue;
}
var _7=tr.childNodes[0];
if(!_7){
continue;
}
var _8=_7.firstChild;
var _9=_8.href;
var _a=_8.getAttribute("version");
if(!_a){
continue;
}
var _b={getUrlDownload:dojo.partial(function(_c){
return _c;
},_9),getLatestVersionLabel:dojo.partial(function(v){
return v;
},_a)};
var _d={"app":_3};
_8.href="javascript:;";
dojo.connect(_8,"onclick",dojo.partial(_4,_b,_d));
}
},postProcessTimestamps:function(_e,_f,_10,_11,_12){
var d=document;
var _13=_e.length;
var qud=lconn.share.util.date;
var _14=new Date();
_14.setHours(0);
_14.setMinutes(0);
_14.setSeconds(0);
_14.setMilliseconds(0);
var _15=_14.getFullYear();
_14=_14.getTime();
var _16=86400000;
var _17=_14-_16;
var _18=_14-6*_16;
var _19=dojo.date.stamp.fromISOString;
var _1a=_11?2:1;
for(var i=0;i<_13;i+=_1a){
var tr=_e[i];
if(!tr){
continue;
}
var _1b=tr.childNodes[1];
if(!_1b){
continue;
}
var _1c=_1b.childNodes[1];
if(!_1c){
continue;
}
var _1d=_1c.childNodes[0];
if(!_1d){
continue;
}
var _1e=_1d.title;
var _1f=_19(_1e);
if(!_1f){
continue;
}
var _20=_1f.getTime();
var a=_1d.firstChild;
if(a){
a.parentNode.removeChild(a);
}
var cls=_1d.className;
var _21=_10[cls];
var _22;
if(_20>_14){
_22=_21.TODAY;
}else{
if(_20>_17){
_22=_21.YESTERDAY;
}else{
if(_20>_18){
_22=_21.DAY;
}else{
if(_1f.getFullYear()==_15){
_22=_21.MONTH;
}else{
_22=_21.YEAR;
}
}
}
}
_22=qud.format(_1f,_22,_f);
lconn.share.util.html.substitute(d,_1d,_22,{user:function(){
return a;
}});
if(_12){
_1d.title=qud.format(_1f,_21.FULL,_f);
}
}
},getUserFragmentXsltStrings:function(){
var s=this.RENDER_USERDATE_XSLT;
if(!s){
var nls=this._appstrings.DOCUMENTCONTENT;
s=this.RENDER_USERDATE_XSLT={_added_other:nls.LABEL_ADDED_OTHER,_added_self:nls.LABEL_ADDED,_added_to_other:nls.LABEL_ADDED_TO_OTHER,_added_to_self:nls.LABEL_ADDED_TO,_updated_other:nls.LABEL_UPDATED_OTHER,_updated_self:nls.LABEL_UPDATED,_shared_self:nls.LABEL_SHARED,_shared_other:nls.LABEL_SHARED_BY};
}
return s;
}});
}


;if(!dojo._hasResource["lconn.share.widget.Tagger"]){
dojo._hasResource["lconn.share.widget.Tagger"]=true;
dojo.provide("lconn.share.widget.Tagger");




















dojo.declare("lconn.share.widget.Tagger",[dijit._Widget],{inline:false,editable:true,_strings:{},highlightNew:"#FFFF75",tags:null,highlightTags:{},labelText:null,docId:null,libraryId:null,userLibrary:null,uninitialize:function(){
this.addNode=null;
this.errNode=null;
this.formNode=null;
this.inputField=null;
this.tagCombo=null;
},buildRendering:function(){
var d=document;
var el=this.domNode=this.srcNodeRef;
while(el.firstChild){
el.removeChild(el.firstChild);
}
if(this.baseClass){
dojo.addClass(el,this.baseClass);
}
if(this.editable){
var a=this.addNode=d.createElement("a");
a.style.display="none";
a.href="javascript:;";
dijit.setWaiRole(a,"button");
dojo.connect(a,"onclick",dojo.hitch(this,this.editTags));
a.appendChild(d.createTextNode(this.getLinkText()));
a.title=this.getLinkTooltip();
el.appendChild(a);
}
if(!this.tags){
this.loadTags();
}
this.update();
},clearErrors:function(){
if(this.errNode){
this.domNode.removeChild(this.errNode);
this.errNode=null;
}
},setErrors:function(_1){
var _2=document.createElement("div");
_2.className="lotusFormError";
dojo.forEach(_1,function(_3){
_2.appendChild(_3);
});
if(this.errNode){
this.domNode.replaceChild(_2,this.errNode);
}else{
this.domNode.insertBefore(_2,this.domNode.firstChild);
}
dijit.setWaiState(_2,"live","assertive");
this.errNode=_2;
},update:function(_4){
var d=document;
var el=this.domNode;
var _5=this.addNode;
this.clearErrors();
if(this.inputField){
this.tagCombo.staticClass="lotusText";
dojo.removeClass(this.inputField,"lotusFormErrorField");
}
if(_5){
var _6=_5;
while(_6.previousSibling){
if(dojo.hasClass(_6.previousSibling,"lotusFormError")){
_6=_6.previousSibling;
}else{
el.removeChild(_6.previousSibling);
}
}
}else{
while(el.lastChild){
el.removeChild(el.lastChild);
}
}
if(this.tags){
if(!_4&&this.tags.length==0){
if(this.editable){
_5.style.display="";
}else{
lconn.share.util.dom.insertBefore(el,d.createTextNode(this._strings.NOTAGS),_5);
}
}else{
if(!_4&&_5){
_5.style.display="";
}
if(this.labelText){
lconn.share.util.dom.insertBefore(el,d.createTextNode(this.labelText),_5);
}
var _7=d.createElement("span");
dijit.setWaiRole(_7,"list");
lconn.share.util.dom.insertBefore(el,_7,_5);
var _8=d.createElement("span");
dijit.setWaiRole(_8,"separator");
dijit.setWaiState(_8,"hidden",true);
_8.appendChild(document.createTextNode(lconn.share.util.html.getDirectionCode()+", "));
for(var i=0;i<this.tags.length;i++){
var _9=this.tags[i];
if(i>0){
_7.appendChild(_8.cloneNode(true));
}
var _a=d.createElement("span");
dijit.setWaiRole(_a,"listitem");
if(_4){
_a.appendChild(d.createTextNode(_9));
_a.appendChild(d.createTextNode(" "));
_a.appendChild(d.createTextNode(lconn.share.util.html.getDirectionCode()));
var a=d.createElement("a");
dijit.setWaiRole(a,"button");
a.className="lotusDelete";
a.href="javascript:;";
a.title=this._strings.REMOVE;
var _b=d.createElement("img");
_b.alt=this._strings.REMOVE;
_b.title=this._strings.REMOVE;
_b.src=dojo.config.blankGif;
dojo.style(_b,"verticalAlign","middle");
dijit.setWaiRole(_b,"presentation");
a.appendChild(_b);
var _c=d.createElement("span");
_c.className="lotusAltText";
_c.appendChild(d.createTextNode("X"));
a.appendChild(_c);
dojo.connect(a,"onclick",dojo.hitch(this,this.deleteTag,_9));
_a.appendChild(a);
}else{
var a=d.createElement("a");
this.generateTagLink(_9,a);
a.appendChild(d.createTextNode(_9));
dojo.addClass(a,"bidiAware");
_a.appendChild(a);
}
_7.appendChild(_a);
if(this.highlightTags[_9]&&this.highlightNew){
dojo.animateProperty(lconn.share.util.misc.animateBackground({duration:2000,rate:100,node:a},this.highlightNew,"white")).play();
}
}
}
if(_5){
while(_5.lastChild){
_5.removeChild(_5.lastChild);
}
_5.appendChild(d.createTextNode(this.getLinkText()));
_5.title=this.getLinkTooltip();
if(this.tags.length==0){
dojo.removeClass(_5,"lotusIndent10");
}else{
lconn.share.util.dom.insertBefore(el,d.createTextNode(" "),_5);
dojo.addClass(_5,"lotusIndent10");
}
}
}else{
if(_5){
_5.style.display="none";
}
lconn.share.util.dom.insertBefore(el,d.createTextNode(this._strings.ERROR_LOADING),_5);
}
this.highlightTags={};
},onTagChange:function(_d,_e){
},loadTags:function(){
this.net.getXml({url:lconn.share.util.uri.rewriteUri(this.url,{includeTags:true}),handle:dojo.hitch(this,this.handleLoad)});
},handleLoad:function(_f,_10){
if(_f instanceof Error){
this.onLoadError(_f.code);
}else{
var doc=_f.documentElement;
var _11=doc.getElementsByTagName("entry");
var _12=[];
for(var i=0,_13;_13=_11[i];i++){
_12.push(lconn.share.util.dom.getChildElementTextContent(_13,"title"));
}
this.tags=_12;
}
this.update();
},onLoadError:function(_14){
var d=document;
this.tags=[];
var _15;
if(_14=="cancel"){
_15=this._strings.LOADERROR_CANCEL;
}else{
if(_14=="timeout"){
_15=this._strings.LOADERROR_TIMEOUT;
}else{
_15=this._strings.ERROR_LOADING;
}
}
lconn.share.util.dom.insertBefore(this.domNode,d.createTextNode(_15),this.addNode);
},editTags:function(e){
if(e){
dojo.stopEvent(e);
}
if(!this.editable){
return;
}
if(!this.formNode){
var d=document;
var el=this.domNode;
var _16=this.formNode=d.createElement("FORM");
_16.style.display="inline";
var _17=d.createElement("input");
_17.type="text";
_17.className="lotusText";
_17.name="_tags";
_16.appendChild(_17);
var _18=this.tagCombo=new lconn.share.widget.TagTypeAhead({id:this.id+"_selectTag",name:"_shareTaggerTypeAhead",size:"30",multipleValues:true,token:" ",_strings:this._strings,hideEmptyResults:true,autoSelectChars:[],libraryId:this.libraryId,userLibrary:this.userLibrary,store:this.tagStore},_17);
this.inputField=_18.textbox;
lconn.core.globalization.bidiUtil.inputRTLProcessing(_18.textbox);
dojo.connect(_18.textbox,"onkeyup",function(){
lconn.core.globalization.bidiUtil.inputRTLProcessing(_18.textbox);
});
if(this.labelText){
this.inputField.title=this.labelText;
}
dojo.connect(_16.firstChild,"onkeydown",this,function(e){
if(e&&!e.cancelBubble&&e.keyCode==dojo.keys.ESCAPE){
dojo.stopEvent(e);
this.cancelEdit();
}
});
var _17=d.createElement("input");
_17.style.marginLeft=_17.style.marginRight="5px";
_17.type="submit";
_17.className="lotusBtnSmall";
_17.value=this._strings.OK;
_16.appendChild(_17);
var a=d.createElement("a");
dijit.setWaiRole(a,"button");
a.href="javascript:;";
a.className="lotusBtnSmallGray";
dojo.connect(a,"onclick",dojo.hitch(this,this.cancelEdit));
a.appendChild(d.createTextNode(this._strings.CANCEL));
a.title=this._strings.CANCEL_TOOLTIP;
_16.appendChild(a);
dojo.connect(_16,"onsubmit",dojo.hitch(this,this.createTags));
el.appendChild(_16);
}else{
this.formNode.firstChild.value="";
}
this.update(true);
this.formNode.style.display="inline";
this.addNode.style.display="none";
this.clearErrors();
var _17=this.formNode.firstChild;
if(dojo.isIE){
setTimeout(function(){
_17.focus();
},0);
}else{
_17.focus();
}
},cancelEdit:function(e){
if(e){
dojo.stopEvent(e);
}
this.update();
this.clearErrors();
if(this.formNode){
this.formNode.style.display="none";
}
if(this.inputField){
this.inputField.value="";
}
if(this.addNode){
this.addNode.style.display="";
this.addNode.focus();
}
},createTags:function(e){
if(e){
dojo.stopEvent(e);
}
if(!this.editable){
return;
}
this.clearErrors();
this.tagCombo.staticClass="lotusText";
dojo.removeClass(this.inputField,"lotusFormErrorField");
var _19=this.formNode.firstChild.value;
var _1a=this.validateTags(_19);
if(!this.validateTagLength(_1a)){
return;
}
if(_1a&&_1a.length>0){
var _1b=lconn.share.util.uri.rewriteUri(this.urlEdit||this.url,{tag:_1a});
var doc=lconn.share.util.dom.newXMLDocument("entry",lconn.share.util.dom.ATOM_NAMESPACE,[lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE]);
var _1c=doc.documentElement;
var _1d=lconn.share.util.dom.createElementNS(doc,"category",lconn.share.util.dom.ATOM_NAMESPACE);
_1d.setAttribute("term","document");
_1d.setAttribute("label","document");
_1d.setAttribute("scheme","tag:ibm.com,2006:td/type");
_1c.appendChild(_1d);
var _1e=lconn.share.util.dom.createElementNS(doc,"id",lconn.share.util.dom.ATOM_NAMESPACE);
_1e.appendChild(doc.createTextNode(this.docId));
_1c.appendChild(_1e);
var _1f=lconn.share.util.dom.serializeXMLDocument(doc,true);
this.net.putXml({url:_1b,postData:_1f,contentType:"application/atom+xml",handle:dojo.hitch(this,this.handleCreate,_1a)});
}else{
this.cancelEdit();
}
},validateTagLength:function(_20){
var _21=true;
var d=document;
var el=this.inputField;
var _22=[];
var _23=this._strings.WARN_LONG_TAG;
dojo.forEach(_20,function(tag,i){
if(!lconn.share.util.validation.validateTextLength(tag,lconn.share.util.validation.TAG_LENGTH)){
_22.push(d.createTextNode(dojo.string.substitute(_23,[lconn.share.util.text.trimToLength(tag,30)])));
_21=false;
}
});
if(!_21){
var _24=_22.length>1;
if(_24){
_22=[d.createTextNode(this._strings.WARN_LONG_TAGS)];
}
_22.push(d.createTextNode(" "));
var a=d.createElement("a");
a.href="javascript:;";
dojo.connect(a,"onclick",this,"trimTags");
a.appendChild(d.createTextNode(_24?this._strings.TRIM_TAGS:this._strings.TRIM_TAG));
dijit.setWaiRole(a,"button");
_22.push(a);
this.tagCombo.staticClass="lotusText lotusFormErrorField";
dojo.addClass(el,"lotusFormErrorField");
this.setErrors(_22);
}
return _21;
},trimTags:function(){
var el=this.inputField;
var _25=lconn.share.bean.File.splitTags(el.value);
_25=dojo.map(_25,function(tag){
var i=lconn.share.util.text.getCharIndexForUtf8Index(tag,lconn.share.util.validation.TAG_LENGTH);
if(i!=-1){
tag=tag.substring(0,i);
}
return tag;
});
el.value=_25.join(" ");
this.clearErrors();
this.tagCombo.staticClass="lotusText";
dojo.removeClass(el,"lotusFormErrorField");
},handleCreate:function(_26,_27,_28){
if(_27 instanceof Error){
this.onCreateError(_27);
return;
}
var _29=this.tags||[];
var _2a=this.tags=new lconn.share.bean.File(_27.documentElement).getTags().sort();
var _2b=[];
var _2c=[];
var i=0;
var j=0;
var _2d=_29[i];
var _2e=_2a[j];
while(_2d||_2e){
if(_2d&&(!_2e||_2e>_2d)){
_2c.push(_2d);
i++;
}else{
if(_2e&&(!_2d||_2d>_2e)){
_2b.push(_2e);
j++;
}else{
i++;
j++;
}
}
_2d=_29[i];
_2e=_2a[j];
}
var _2f=this.highlightTags={};
dojo.forEach(_2b,function(tag){
_2f[tag]=1;
});
dojo.forEach(_26,function(tag){
_2f[tag]=1;
});
dojo.publish("lconn/files/tags/changed");
this.onTagChange(_2b,_2c);
this.cancelEdit();
},onCreateError:function(_30){
var msg;
if(_30.code=="cancel"){
msg=this._strings.CREATEERROR_CANCEL;
}else{
if(_30.code=="timeout"){
msg=this._strings.CREATEERROR_TIMEOUT;
}else{
if(_30.code=="ItemNotFound"){
msg=this._strings.CREATEERROR_NOT_FOUND;
}else{
if(_30.code=="AccessDenied"){
msg=this._strings.CREATEERROR_ACCESS_DENIED;
}else{
if(_30.code=="unauthenticated"){
}else{
if(_30.code=="ItemExists"){
}else{
if(_30.code=="InvalidTagCharacters"){
this.setInvalidCharError(_30.message);
}else{
msg=this._strings.CREATEERROR;
}
}
}
}
}
}
}
if(msg){
lconn.share.util.html.alert(msg);
}
},deleteTag:function(tag,e){
if(e){
dojo.stopEvent(e);
}
if(!this.editable){
return;
}
this.tags=dojo.filter(this.tags,function(a){
return a!=tag;
});
this.update(true);
this.inputField.focus();
var _31=lconn.share.util.uri.rewriteUri(this.urlFeed,this.isEcmFile?{removeTag:tag}:{category:"tag",tag:tag});
var opt={url:_31,handle:dojo.hitch(this,this.handleDelete,tag)};
this.isEcmFile?this.net.putXml(opt):this.net.deleteXml(opt);
},handleDelete:function(tag,_32,_33){
if(_32 instanceof Error){
var _34=_32.code;
if(_34=="ItemNotFound"){
}else{
this.onDeleteError(_34);
this.tags.push(tag);
this.tags=this.tags.sort();
this.update(true);
return;
}
}
dojo.publish("lconn/files/tags/changed");
this.onTagChange(null,[tag]);
},onDeleteError:function(_35){
var msg;
if(_35=="cancel"){
msg=this._strings.REMOVEERROR_CANCEL;
}else{
if(_35=="timeout"){
msg=this._strings.REMOVEERROR_TIMEOUT;
}else{
if(_35=="AccessDenied"){
msg=this._strings.REMOVEERROR_ACCESS_DENIED;
}else{
if(_35=="unauthenticated"){
}else{
msg=this._strings.REMOVEERROR;
}
}
}
}
if(msg){
lconn.share.util.html.alert(msg);
}
},generateTagLink:function(tag,a){
a.href="javascript:;";
a.onclick=function(){
return false;
};
},getLinkText:function(){
var _36=(this.tags?this.tags.length:0);
return ((_36>0)?this._strings.ADD_REMOVE_TAGS:this._strings.ADD_TAGS);
},getLinkTooltip:function(){
var _37=(this.tags?this.tags.length:0);
return ((_37>0)?this._strings.ADD_REMOVE_TAGS_TOOLTIP:this._strings.ADD_TAGS_TOOLTIP);
},validateTags:function(_38){
return lconn.share.bean.File.splitTags(_38);
},setInvalidCharError:function(_39){
this.tagCombo.staticClass="lotusText lotusFormErrorField";
dojo.addClass(this.inputField,"lotusFormErrorField");
this.setErrors([document.createTextNode(_39)]);
}});
lconn.share.widget.Tagger.updateFile=function(_3a,_3b,_3c){
if(_3a){
var _3d=_3a.getTags();
if(_3c){
var _3e={};
dojo.forEach(_3c,function(_3f){
_3e[_3f]=true;
});
_3d=dojo.filter(_3d,function(tag){
return !_3e[tag];
});
}
if(_3b){
var _40={};
dojo.forEach(_3d,function(tag){
_40[tag]=true;
});
dojo.forEach(_3b,function(_41){
if(!_40[_41]){
_3d.push(_41);
}
});
}
_3a.tags=_3d.sort();
}
};
}


;if(!dojo._hasResource["lconn.share.widget.StreamRendererMultiSelection"]){
dojo._hasResource["lconn.share.widget.StreamRendererMultiSelection"]=true;
dojo.provide("lconn.share.widget.StreamRendererMultiSelection");
dojo.declare("lconn.share.widget.StreamRendererMultiSelection",null,{constructor:function(){
this.selection=[];
this.selectionListeners=[];
},renderSelectAll:function(_1,el,_2,d){
var _3=this.selectAllElement=this.createCheckbox(d);
_3.id=_1.id+"_selectall";
this.selectionListeners.push(dojo.connect(_3,"onclick",dojo.hitch(this,"onSelectAll",_2,_3,el)));
el.appendChild(_3);
this.selectAllElement.checked=this.isAllSelected(_2);
this.updateSelectAllTitle();
},isAllSelected:function(_4){
_4=_4||this.scene.listData||{};
var _5=_4.itemByPosition||[];
return _5.length==this.selection.length;
},updateSelectAllTitle:function(){
var _6=this.selectAllElement;
if(_6){
_6.title=this._appstrings.DOCUMENTCONTENT[_6.checked?"UNSELECT_ALL":"SELECT_ALL"];
}
},onSelectAll:function(_7,_8,el){
if(!_7||!_7.itemByPosition){
return;
}
var _9=_7.itemByPosition;
var _a=_8.checked;
var _b=[];
dojo.forEach(_9,function(_c){
_c._isSelected=_c.checkElement.checked=_a;
if(_a){
_b.push(_c);
}
});
this.selection=_b;
this.selectionChanged(this.selection);
this.updateSelectAllTitle();
},onSelectItem:function(_d,_e,el){
_d=_e.item||_d;
var _f=_d._isSelected=_e.checked;
var _10=this.selection;
if(_f){
_10.push(_d);
}else{
var id=_d.getId?_d.getId():_d.id;
_10=this.selection=dojo.filter(_10,function(s){
if(s==_d){
return false;
}
var sId=s.getId?s.getId():s.id;
if(sId&&id&&sId==id){
return false;
}
return true;
});
}
if(this.selectAllElement){
this.selectAllElement.checked=this.isAllSelected();
}
this.selectionChanged(this.selection);
this.updateSelectAllTitle();
},selectionUpdateItem:function(_11,_12){
_11._isSelected=_12._isSelected;
var _13=_11.checkElement=_12.checkElement;
_12.checkElement=null;
if(_13){
_13.item=_11;
}
if(_11._isSelected){
var i=-1;
var _14=_12.getId?_12.getId():_12.id;
for(var n=0;n<this.selection.length;n++){
var _15=this.selection[n];
if(_15==_12){
i=n;
break;
}
var _16=_15.getId?_15.getId():_15.id;
if(_16&&_14&&_16==_14){
i=n;
break;
}
}
if(i!=-1){
this.selection[i]=_11;
}else{
this.selection.push(_11);
}
}
},selectionUpdateItems:function(_17){
var _18={};
var _19=this.selection;
dojo.forEach(_19,function(_1a){
if(_1a&&_1a.getId){
_18[_1a.getId()]=true;
}
});
this.selection=dojo.filter(_17,function(_1b){
var id=_1b.getId?_1b.getId():_1b.id;
return _1b._isSelected=_18[id];
});
if(this.isAllSelected()){
if(this.selectAllElement){
this.selectAllElement.checked=true;
}
}
if(_19.length!=this.selection.length){
this.selectionChanged(this.selection);
}
},createCheckbox:function(d){
var d=d||document;
var _1c=(dojo.isIE<9)?d.createElement("<input type=\"checkbox\">"):d.createElement("input");
_1c.type="checkbox";
_1c.className="lotusCheckbox";
return _1c;
},destroy:function(){
this.inherited(arguments);
this.selection=[];
this.selectAllElement=null;
dojo.forEach(this.selectionListeners,dojo.disconnect);
this.selectionListeners=[];
}});
lconn.share.widget.StreamRendererMultiSelection.renderSelection=function(x,_1d,r,d,el,doc,_1e){
while(el.firstChild){
el.removeChild(el.firstChild);
}
if(!doc){
return;
}
var _1f=doc._isSelected;
var _20=_1d.id;
var _21=doc.checkElement=r.createCheckbox();
_21.id=_20+"_"+_1e;
_21.checked=_21.defaultChecked=_1f;
if(doc.getName){
_21.title=doc.getName();
}
el.appendChild(_21);
r.selectionListeners.push(dojo.connect(_21,"onclick",dojo.hitch(r,"onSelectItem",doc,_21,el)));
};
}


;if(!dojo._hasResource["lconn.share.widget.FileRendererSocial"]){
dojo._hasResource["lconn.share.widget.FileRendererSocial"]=true;
dojo.provide("lconn.share.widget.FileRendererSocial");
























dojo.declare("lconn.share.widget.FileRendererSocial",[lconn.share.widget.FileRendererCore,lconn.share.widget.AbstractRendererSocial,lconn.share.widget.FileRendererPostProcessor,lconn.share.widget.StreamRendererMultiSelection],{showTags:true,showComments:true,showDownloads:true,showRecommendations:true,downloadFilesNodes:"<a><img alt=\"\"><span class=\"lotusAltText\"></span></a>",metas:[],constructor:function(){
var _1=[];
_1.push({id:"owner",isValid:dojo.hitch(this,function(_2){
var _3=_2.getAuthor();
return this.displayOwner&&_3&&_3.name;
}),render:dojo.hitch(this,function(_4,_5,d,el,_6){
var a=el;
this.generateLinkToPerson(_5.getAuthor(),a);
a.appendChild(d.createTextNode(_5.getAuthor().name));
})});
_1.push({id:"modifier",isValid:dojo.hitch(this,function(_7){
var _8=(_7.getUpdated().getTime()!=_7.getPublished().getTime());
var _9=_8?_7.getModifier():_7.getAuthor();
return !_7.getConfiguration().hideListTime&&_9&&_9.name;
}),render:dojo.hitch(this,function(_a,_b,d,el,_c){
var d=document;
var _d=(_b.getUpdated().getTime()!=_b.getPublished().getTime());
var _e=_d?_b.getModifier():_b.getAuthor();
var _f=this._appstrings.DOCUMENTCONTENT;
var _10=_d?_f.LABEL_UPDATED_OTHER:_f.LABEL_ADDED_OTHER;
var df=new lconn.share.util.DateFormat(_b.getUpdated());
var _11=df.formatByAge(_10);
lconn.share.util.html.substitute(d,el,_11,{user:function(){
var a=d.createElement("a");
a.className="lotusPerson";
a.appendChild(d.createTextNode(_e.name));
this.generateLinkToPerson(_e,a);
return a;
}},null,this);
el.title=df.format(_10.FULL);
})});
_1.push({id:"timesDownloaded",render:dojo.hitch(this,function(app,_12,d,el,_13){
var nls=this._strings;
var _14=_12.getTimesDownloaded();
if(_14>0){
el.appendChild(d.createTextNode(dojo.string.substitute((_14!=1)?nls.DOWNLOAD_TOOLTIP_MANY:nls.DOWNLOAD_TOOLTIP_ONE,[dojo.number.format(_14)])));
}else{
dojo.style(el,{"display":"none"});
}
})});
_1.push({id:"commentCount",render:dojo.hitch(this,function(app,_15,d,el,_16){
var _17=_15.getCommentCount();
var nls=this._appstrings;
if(_17>0){
el.appendChild(d.createTextNode(dojo.string.substitute((_17!=1)?nls.COMMENTS.COMMENT_COUNT_MANY:nls.COMMENTS.COMMENT_COUNT_ONE,[dojo.number.format(_17)])));
}else{
dojo.style(el,{"display":"none"});
}
})});
this.metas=_1;
},_updateItem:function(_18,_19,el,_1a,_1b,_1c){
var tr=_1b.element;
var _1d=tr.parentNode;
var _1e=_1d.parentNode;
var _1f=this.inherited(arguments);
return _1f;
},_render:function(_20,el,_21,opt){
var _22=this._getItems(_21.xml);
var _23=(_21.paging)?Math.min(_21.paging.size,_22.length):_22.length;
if(this.useXslt&&_23>0&&_22[0].nodeName){
this.xsltDetails=this.xsltDetails||dojo.getObject("lconn.share.config.xslt.list.fileDetails");
if(this.xsltDetails&&dojo.getObject("xml.ownerDocument.documentElement",false,_21)){
this.renderXslt(_20,el,_21);
return;
}
}
var d=document;
var _22=this.initData(_21);
this.selection=[];
for(var i=0;_22!=null&&i<_22.length;i++){
if(_22[i]._isSelected){
this.selection.push(_22[i]);
}
}
var max=(_21.paging)?_21.paging.size:_23;
var _24=el.lastChild;
if(_24&&(_24._view!="details"||_24.nodeName.toLowerCase()!="table"||_24.firstChild.childNodes.length!=max*2)){
dojo.empty(el);
_24=null;
}
if(!_24){
var a=[];
a.push("<tr style=\"display: none;\"><td class=\"lotusFirstCell\" style=\"width:2%;\"/><td class=\"lotusNowrap\" style=\"width:");
a.push("3%");
a.push("\">"+this.downloadFilesNodes+"</td>");
a.push("<td><h4 class=\"lotusBreakWord lotusLeft\"><a class=\"entry-title bidiSTT_URL\" rel=\"bookmark\"><img title=\"\" alt=\"\"></img></a></h4><div class=\"lotusMeta lotusClear\" role=\"list\">");
if(this.displayOwner){
a.push("<a class=\"lotusPerson\" role=\"listitem\"></a><span class=\"lotusDivider\" role=\"img\" aria-hidden=\"true\">|</span>");
}
a.push("<span role=\"listitem\"></span></div></td>");
a.push("<td></td>");
if(this.createFavoriteToggle){
a.push("<td></td>");
}
a.push("<td></td>");
a.push("<td class=\"lotusAlignRight lotusLastCell lotusNowrap lotusTiny\" style=\"cursor:default;width:10%\"><a href=\"javascript:;\"></a></td>");
a.push("</tr>");
a.push("<tr class=\"lotusDetails\" style=\"display: none;\"><td class=\"lotusFirstCell\" colSpan=\"2\"><!-- IE --></td><td colSpan=\"");
a.push(this.createFavoriteToggle?5:4);
a.push("\"></td></tr>");
var t=a.join("");
a=["<table cellpadding=\"0\" cellspacing=\"0\" style=\"display:none;\" class=\"lotusTable qkrIcon32\"><tbody>"];
for(var i=0;i<max;i++){
a.push(t);
}
a.push("</tbody></table>");
var t=a.join("");
el.innerHTML=t;
_24=el.firstChild;
_24._view="details";
dojo.connect(_24,"onmousedown",dojo.hitch(this,"toggleByElement",_20));
var _25=_24.firstChild;
dojo.addClass(_25.firstChild,"lotusFirst");
var _26=dojo._isBodyLtr()?"paddingRight":"paddingLeft";
for(var i=0;i<max;i++){
var tr=_25.childNodes[i*2];
var _27=tr.nextSibling;
_27.id=dijit.getUniqueId("detailsRow");
var td=tr.lastChild;
var a=td.firstChild;
a.title=this._strings.VIEW_EXTRA;
if(a.lastChild){
a.removeChild(a.lastChild);
}
a.appendChild(d.createTextNode(this._strings.MORE));
dojo.connect(a,"onclick",dojo.hitch(this,this.toggleItem,_20,i));
dijit.setWaiRole(a,"button");
dijit.setWaiState(a,"expanded",false);
dijit.setWaiState(a,"controls",_27.id);
var _28=tr.childNodes;
_28[1].style[_26]="8px";
if(i==0){
var c=2;
_28[c++].style.width="60%";
if(this.showRecommendations){
td=_28[c++];
td.style[_26]="25px";
td.style.width="5%";
dojo.addClass(td,"lotusNowrap");
}
if(this.createFavoriteToggle){
td=_28[c++];
td.style[_26]="25px";
td.style.width="5%";
}
td=_28[c++];
td.style[_26]="25px";
td.style.width="5%";
}
}
}
dijit.setWaiRole(_24,"presentation");
if(_23>0){
var _29=d.createDocumentFragment();
this.renderSorting(_20,_29,_21);
if(el.firstChild!=_24){
var old=el.replaceChild(_29,el.firstChild);
lconn.share.util.html.destroyWidgets(old);
}else{
el.insertBefore(_29,el.firstChild);
}
_24.style.display="";
_24.style.cursor="default";
var _25=_24.firstChild;
for(var i=0;i<_23;i++){
var tr=_25.childNodes[i*2];
var _27=tr.nextSibling;
this.renderItem(_20,_25,_21,_22[i],i,i==0,(i==_23-1),tr,_27);
tr.style.display="";
lconn.share.scenehelper.applyDndProperty(tr,i,_22[i]);
}
for(var i=_23;i<max;i++){
var tr=_25.childNodes[i*2];
var _27=tr.nextSibling;
tr.style.display=_27.style.display="none";
}
lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage(_20.domNode);
this.updatePaging(_20,el,_21,opt);
this.attachDragSource(_24,_20,_21);
}else{
this.renderEmpty(_20,el,_21);
}
},renderXslt:function(_2a,el,_2b){
try{
var p=lconn.share.widget.FileRendererSocial._detailsXslt;
if(!p){
lconn.share.util.xsl.Processor.documentImplementation=_2b.xml.ownerDocument.implementation;
p=lconn.share.widget.FileRendererSocial._detailsXslt=lconn.share.util.xsl.createProcessor(this.xsltDetails);
}
if(!_2a.xsltAct){
_2a.xsltAct=lconn.share.widget.FileRendererSocial.prototype.xsltAction;
}
var _2c=new Date().getTime();
var _2d={widgetId:_2a.id,currentUserId:this.permissions.authenticatedId||"",userUrlTemplate:this.getLinkToUserTemplate("{userId}"),showFavorite:!!this.createFavoriteToggle,noBreak:dojo.isIE<8,_blankGif:dojo.config.blankGif.toString(),newline:"\n"};
if(this.xsltDetailsParams){
dojo.mixin(_2d,this.xsltDetailsParams);
}
var _2e=p.transformToHtml(_2b.xml.ownerDocument,document,_2d);
var d=document;
var _2f=new Date().getTime();
var _30=_2e.firstChild;
dojo.connect(_30,"onmousedown",dojo.hitch(this,"toggleByElement",_2a));
var _31=_30.lastChild.childNodes;
var _32=_31.length;
if(_32>0){
var _33=dojo._isBodyLtr()?"paddingRight":"paddingLeft";
var _34=_31[0].childNodes;
var i=1;
_34[i++].style.width="100%";
if(this.showRecommendations){
var td=_34[i++];
td.style[_33]="25px";
dojo.addClass(td,"lotusNowrap");
}
if(this.createFavoriteToggle){
_34[i++].style[_33]="25px";
}
_34[i++].style[_33]="25px";
for(var i=0;i<_32;i+=2){
_31[i].childNodes[0].style[_33]="8px";
}
if(this.createFavoriteToggle){
for(var i=0;i<_32;i+=2){
var r=_31[i];
var td=r.childNodes[3];
var t=this.createFavoriteToggle(dojo.attr(td,"_uid"));
td.appendChild(t);
}
}
}
this.postProcessTimestamps(_31,this._appstrings.DATE,this.getUserFragmentXsltStrings(),true);
var old=[];
var _35=new Date().getTime();
var _36=d.createDocumentFragment();
this.renderSorting(_2a,_36,_2b);
if(_36.firstChild){
if(el.firstChild){
old.push(el.replaceChild(_36.firstChild,el.firstChild));
}else{
el.appendChild(_36);
}
}else{
if(el.firstChild){
old.push(el.removeChild(el.firstChild));
}
}
var _37=new Date().getTime();
this.updatePaging(_2a,el,_2b);
var _38=new Date().getTime();
if(el.childNodes[1]){
old.push(el.replaceChild(_30,el.childNodes[1]));
}else{
el.appendChild(_30);
}
while(_30.nextSibling){
old.push(el.removeChild(_30.nextSibling));
}
var end=new Date().getTime();
setTimeout(function removeOldNodes(){
dojo.forEach(old,dojo.empty);
},0);
if(this.highlightItems){
var _39=false;
for(var id in this.highlightItems){
if(!_39){
this.initXsltData(_2b,el);
_39=true;
}
var _3a=_2b.itemById[id];
if(_3a){
this.highlight(_3a.element);
this.highlight(_3a.elementDetails);
}
delete this.highlightItems[id];
}
}
if(dojo.isIE&&window.stats){
var _3b=window.stats.xslt=window.stats.xslt||{xsltRender:[],xsltPostProcess:[],domHeaderUpdate:[],domPagingUpdate:[],domReplace:[],all:[]};
if(!window.stats.avg){
window.stats.avg=function(arr){
var avg=0;
for(var i=0;i<arr.length;i++){
avg+=arr[i];
}
return avg/arr.length;
};
}
_3b.xsltRender.push(_2f-_2c);
_3b.xsltPostProcess.push(_35-_2f);
_3b.domHeaderUpdate.push(_37-_35);
_3b.domPagingUpdate.push(_38-_37);
_3b.domReplace.push(end-_38);
_3b.all.push(end-_2c);
}
this.attachDragSource(_30,_2a,_2b);
}
catch(e){
console.error(e);
this.renderError(_2a,el,_2b,{message:this._appstrings.ERROR_OCCURRED});
}
},initXsltData:function(_3c,el){
this.initData(_3c);
if(_3c._initXslt){
return;
}
_3c._initXslt=true;
var _3d=(el.childNodes[1]||el.firstChild).lastChild;
for(var i=0;i<_3c.itemByPosition.length;i++){
var _3e=_3c.itemByPosition[i];
_3e.element=_3d.childNodes[i*2];
_3e.elementDetails=_3d.childNodes[i*2+1];
}
if(dojo.getObject("SemTagSvc.onTagChanged")){
SemTagSvc.onTagChanged(el,true);
}
},renderItem:function(_3f,el,_40,doc,_41,_42,_43,_44,_45){
var d=document;
var app=this.app;
doc._isEcmFile=doc.getLibraryType()=="communityECMFiles";
var _46=d.createElement("td");
var a_t=d.createElement("a");
var _47=d.createElement("span");
var _48=d.createElement("img");
var _49=d.createElement("div");
var _4a=!doc.getConfiguration().disableDownload;
var _4b=_4a?lconn.core.globalization.bidiUtil.substituteWithSTT(this._appstrings.DOCUMENTCONTENT.DOWNLOAD_TOOLTIP,[doc.getTitle(),lconn.share.util.text.formatSize(doc.getSize())]):null;
if(doc.getLibraryType()=="personalFiles"&&doc.isSyncable()){
if(_4a){
_4b=lconn.core.globalization.bidiUtil.substituteWithSTT(this._appstrings.DOCUMENTCONTENT.DOWNLOAD_WITH_FILE_SYNC_TOOLTIP,[doc.getTitle(),lconn.share.util.text.formatSize(doc.getSize())]);
}else{
_4b=this._appstrings.DOCUMENTCONTENT.DOWNLOAD_DISABLED_WITH_FILE_SYNC_TOOLTIP;
}
}
var _4c;
var a1,a2;
var tr=_44;
var trd=_45;
tr.style.cursor="default";
tr.itemPosition=_41;
lconn.share.widget.StreamRendererMultiSelection.renderSelection(null,_3f,this,d,tr.firstChild,doc,_41);
if(doc.checkElement){
doc.checkElement.setAttribute("aria-label",this._appstrings.FILES_CHECKED_ALERT);
}
var td=_4c=tr.firstChild.nextSibling;
lconn.share.util.html.destroyWidgets(td);
td.innerHTML=this.downloadFilesNodes;
var a=a1=td.firstChild;
a.firstChild.alt="";
a.firstChild.title="";
dojo.addClass(a,"lconnIconContainer");
if(_4a){
dojo.addClass(a,"lconnDownloadable");
a.firstChild.title=_4b;
a.firstChild.alt=_4b;
a.lastChild.appendChild(d.createTextNode(doc.getExtension()||this._appstrings.CONTENT.DOWNLOAD_ALT));
}else{
if(doc.isSyncable()){
a.firstChild.title=_4b;
a.firstChild.alt=doc.getExtension();
}
}
this.generateFileTypeImage(a.firstChild,lconn.share.util.text.getExtension(doc.getName()),32,doc);
if(this.applyDownloadLink){
this.applyDownloadLink(app,doc,a,d,{isIcon:true});
}
var img=a.childNodes[1];
img.src=dojo.config.blankGif;
img.alt="";
if(doc.isSyncable()&&doc.getLibraryType()=="personalFiles"){
var _4d=d.createElement("img");
_4d.className="iconsMessages32 iconsMessages32-myFileSync32";
_4d.src=dojo.config.blankGif;
dojo.addClass(_4d,"lconnFileSyncOverlay");
_4d.alt="";
a.appendChild(_4d);
var _4e=d.createElement("span");
_4e.appendChild(d.createTextNode(app.nls.FILE_SYNC_ICON.ALT));
_4e.className="lotusAltText";
a.appendChild(_4e);
}
if(td.lastChild.nodeName.toLowerCase()=="span"){
var old=td.removeChild(td.lastChild);
lconn.share.util.html.destroyWidgets(old);
}
td=td.nextSibling;
var a=td.firstChild.firstChild;
a.innerHTML="";
var _4f=lconn.share.util.html.formatFilename(doc.getName());
lconn.share.util.html.breakString(_4f,d,a,10);
if(!dojo._isBodyLtr()){
a.innerHTML+="&rlm;";
}
a.title=_4f;
this.generateLinkToFile(doc,a);
while(a.nextSibling){
td.firstChild.removeChild(a.nextSibling);
}
if(doc.isLocked()&&this.generateLockIcon){
this.generateLockIcon(d,td.firstChild,doc,app.getAuthenticatedUserId(),{nls:app.nls.CONTENT});
}
this.decorateFileName(doc,td.firstChild,a);
var div=td.firstChild.nextSibling;
div.removeAttribute("role");
dojo.empty(div);
var _50=this.metas;
var _51={app:app,file:doc,className:"lotusInlinelist",renderer:this,nls:dojo.mixin({},this._appstrings,this._strings)};
if(this.applyFileDescriptions){
this.applyFileDescriptions(app,doc,_50,d,div,_51);
}
var _52=doc.getRatingCount();
td=td.nextSibling;
dojo.empty(td);
var top=td.appendChild(_49.cloneNode(true));
this.buildRecommendation(doc,top);
if(this.createFavoriteToggle){
td=td.nextSibling;
dojo.empty(td);
if(doc.getLibraryType()!="communityFiles"&&doc.getLibraryType()!="communityECMFiles"){
var t=this.createFavoriteToggle(doc.getId());
td.appendChild(t);
}else{
td.appendChild(d.createTextNode("\xa0"));
}
}
var m=this.getShareMessage(doc,this._strings);
td=td.nextSibling;
dojo.addClass(td,"lotusNowrap");
td.innerHTML="";
var img=_48.cloneNode(true);
img.src=dojo.config.blankGif;
img.className=m.i;
img.alt="";
img.style.marginTop="1px";
this.renderShareLink(td,img,null,m.a,doc);
var _53=img.parentNode;
if(_53){
_53.title=dojo.string.substitute(m.s,[m.c]);
}
this.renderExternalIcon(_53||td,doc,this._strings.SHARE_INTENT,this._strings.SHARE_INTENT_T);
trd.style.cursor="default";
trd.style.display="none";
var td=trd.lastChild;
dojo.empty(td);
this.renderShowLink(tr);
if(_4a&&this.renderDownloadWarning){
this.renderDownloadWarning(doc.getLabel(),d,_4c,a1);
}
doc.element=tr;
doc.elementDetails=trd;
if(this.highlightItems&&this.highlightItems[doc.getId()]){
this.highlight(tr);
this.highlight(trd);
delete this.highlightItems[doc.getId()];
}
},renderUserFragment:function(_54,_55,_56,_57,_58){
var d=document;
var _59=(_56.getUpdated().getTime()!=_56.getPublished().getTime());
var _5a=_59?_56.getModifier():_56.getAuthor();
var _5b=this.permissions.isAuthenticated()?this.permissions.isAuthenticated(_5a.id):false;
var nls=this._appstrings.DOCUMENTCONTENT;
var _5c=_59?(_5b?nls.LABEL_UPDATED:nls.LABEL_UPDATED_OTHER):(_5b?nls.LABEL_ADDED:nls.LABEL_ADDED_OTHER);
var df=new lconn.share.util.DateFormat(_56.getUpdated());
var _5d=df.formatByAge(_5c);
lconn.share.util.html.substitute(d,_58,_5d,{user:function(){
var a=d.createElement("a");
a.className="lotusPerson";
a.appendChild(d.createTextNode(_5a.name));
this.generateLinkToPerson(_5a,a);
return a;
}},null,this);
_58.title=df.format(_5c.FULL);
},_renderItemExpand:function(_5e,_5f,_60,_61){
var d=document;
var doc=_60;
var tr=doc.element;
var trd=doc.elementDetails;
var _62=d.createElement("div");
var _63=d.createElement("span");
tr.style.cursor=trd.style.cursor="";
var _64=this.getActions(_60);
var _65=dojo.filter(_64,function(a){
return a.declaredClass=="lconn.files.action.UnlockFile";
})[0];
var _66=false;
if(this.showTags){
var _67=this.permissions.canTag(_60);
var _68=doc.getTags();
if(_67||_68.length>0){
_66=true;
var _69=new lconn.share.widget.Tagger({labelText:this._strings.TAGS_LABEL,baseClass:"lotusTags lotusMeta",editable:_67,docId:doc.getAtomId(),net:this.net,isEcmFile:doc._isEcmFile,urlEdit:this.routes.getProxiedUrl(this.getUrlEditTags(doc),{commonProxy:true}),urlFeed:this.routes.getProxiedUrl(doc._isEcmFile?doc.getUrlEntry():doc.getUrlFeed(),{commonProxy:true}),tagStore:this.tagStore,tags:_68,generateTagLink:dojo.hitch(this,this.generateLinkToTag),renderPopup:this.renderPopup,_strings:this._appstrings.TAGGER},trd.lastChild.insertBefore(_62.cloneNode(true),trd.lastChild.firstChild));
dojo.connect(_69,"onTagChange",dojo.hitch(this,lconn.share.widget.Tagger.updateFile,doc));
}
}
if(_60.isLocked()){
_66=true;
var _6a=this;
var _6b=_60.getLock();
var _6c=_62.cloneNode(true);
_6c.className="lotusMeta";
dojo.attr(_6c,"aria-live","assertive");
var img=_6c.appendChild(d.createElement("IMG"));
img.src=dojo.config.blankGif;
img.className=(_60.getPermissions().Unlock?"lconnSprite lconnSprite-iconCheckedOutMe":"lconnSprite lconnSprite-iconCheckedOut");
dojo.attr(img,{title:"",alt:"",role:"presentation"});
var _6d=_6b.getOwner().id==this.app.getAuthenticatedUserId()?this._appstrings.DOCUMENTCONTENT.LABEL_LOCKED:this._appstrings.DOCUMENTCONTENT.LABEL_LOCKED_BY;
var _6e=new lconn.share.util.DateFormat(_6b.getLockTime()).formatByAge(_6d);
var _6f=_6b.getOwner().id==this.app.getAuthenticatedUserId();
dojo.attr(img,"alt",_6f?this._appstrings.CONTENT.LOCKED_BY_YOU:this._appstrings.CONTENT.LOCKED);
lconn.share.util.html.substitute(d,_6c,_6e,{user:function(){
var a=d.createElement("a");
a.className="lotusPerson";
_6a.generateLinkToPerson(_6b.getOwner(),a);
a.appendChild(d.createTextNode(_6b.getOwner().name));
return a;
},unlock:function(){
if(_60.getPermissions().Unlock&&_65){
var opt={};
var a=d.createElement("a");
a.href="javascript:;";
dijit.setWaiRole(a,"button");
a.appendChild(d.createTextNode(_65.getName()));
a.title=_65.getTooltip();
dojo.connect(a,"onclick",function(_70){
if(_70){
dojo.stopEvent(_70);
}
_65.execute(_60,opt);
});
return a;
}
return null;
}});
trd.lastChild.insertBefore(_6c,trd.lastChild.firstChild);
}
var td=trd.lastChild;
var _71=d.createElement("div");
_71.className="entry-summary";
lconn.share.util.html.createTextNode(d,_71,_60.getDescription());
var _72=!!_71.firstChild;
if(_72){
td.appendChild(_71);
}
this.renderActionList(td,_5e,_5f,_60,_64);
if(td.firstChild){
dojo.addClass(td.firstChild,"lotusFirst");
}
this.showNodes(trd,"");
this.renderHideLink(tr);
},isSkipNode:function(_73){
return _73.className=="lotusTags"||_73.className=="lotusRecommend";
},getSorts:function(_74,_75){
var nls=this._appstrings.COLUMN.FILE;
var _76=[{id:"name",name:nls.NAME,lowToHigh:true,tooltip:nls.NAME_L},{id:"modified",name:nls.MODIFIED,isDefault:true,tooltip:nls.MODIFIED_L}];
if(this.showDownloads){
_76.push({id:"downloads",name:nls.DOWNLOADS,tooltip:nls.DOWNLOADS_L});
}
if(this.showComments){
_76.push({id:"comments",name:nls.COMMENTS,tooltip:nls.COMMENTS_L});
}
if(this.showRecommendations){
_76.push({id:"recommendations",name:nls.RECOMMENDATIONS,tooltip:nls.RECOMMENDATIONS_L});
}
return _76;
},buildXsltRecommendation:function(doc,a){
},_xsltRecommender:function(_77,_78,_79,e){
var _7a=_77.data.itemByPosition[_78];
var r=_7a._recommender;
if(!r){
var a=_7a.element.childNodes[2].firstChild;
r=_7a._recommender=this.buildXsltRecommendation(_7a,a);
if(r!=null){
r[_79](e);
}
}
},clickRecommendation:function(_7b,_7c,e){
this._xsltRecommender(_7b,_7c,"onClick",e);
},hoverRecommendation:function(_7d,_7e,e){
this._xsltRecommender(_7d,_7e,"onMouseEnter",e);
},buildRecommendation:function(doc,a){
},generateLockIcon:function(d,el,doc,_7f,opt){
}});
}


;if(!dojo._hasResource["lconn.share.util.ActionUtil"]){
dojo._hasResource["lconn.share.util.ActionUtil"]=true;
(function(){
dojo.mixin(dojo.provide("lconn.share.util.ActionUtil"),{buildActions:function(_1){
var _2=dojo.filter(_1,function(_3){
return _3.hasChildren;
});
for(var i=0;i<_2.length;i++){
delete _2[i].actions;
_2[i].actions=[];
}
_1=dojo.filter(_1,function(_4){
return !_4.hasChildren;
});
for(var i=0;i<_2.length;i++){
var _5=_1.length;
var _6=[];
for(var j=0;j<_5;j++){
if(_1[j].parentId&&(_1[j].parentId.toLowerCase()==_2[i].getId())){
_2[i].actions.push(_1[j]);
_6.push(j);
}
}
var f=_6[0];
var l=_6.length;
if(l>1){
_1.splice(f,0,_2[i]);
_1=dojo.filter(_1,function(_7){
return !_7.parentId||(_7.parentId&&_7.parentId.toLowerCase()!=_2[i].getId());
});
if(_2[i].actions[0].isPrimary){
_2[i].isPrimary=true;
}
}
}
return _1;
},renderMenu:function(d,_8,_9,_a,_b,_c,_d){
if(!_a.hasChildren){
return;
}
_b.id=dijit.getUniqueId(_a.getId());
_b.title=_a.getTooltip();
dijit.setWaiState(_b,"haspopup",true);
_b.appendChild(d.createTextNode(" "));
var _e=d.createElement("img");
_e.alt="";
_e.className="lotusArrow lotusDropDownSprite";
_e.src=dojo.config.blankGif;
_b.appendChild(_e);
var _f=d.createElement("span");
_f.className="lotusAltText";
_f.appendChild(d.createTextNode("\u25bc"));
_b.appendChild(_f);
if(!_c.useButton){
_b=_9(d,_b,!_8.firstChild,true);
}
var _10=new dijit.Menu();
dojo.addClass(_10.domNode,"lotusActionMenu");
dojo.addClass(_10.domNode,"lotusPlain");
for(var i=0,a;a=_a.actions[i];i++){
var _11={};
dojo.mixin(_11,_c);
_10.addChild(new dijit.MenuItem({label:a.getName(_d,_11),title:a.getTooltip(_d,_11),id:dijit.getUniqueId(a.getId()),onClick:dojo.hitch(a,a.execute,_d,_11)}));
}
lconn.core.MenuUtility.attachListeners(_10,_c.useButton?_b:_b.firstChild);
var _12=dojo.body().appendChild(d.createElement("span"));
_12.style.display="none";
_12.setAttribute("widgetid",_10.id);
},renderSubMenu:function(_13,_14,_15,_16){
var _17=new dijit.Menu();
var _18=_14.actions;
for(var j=0,act;act=_18[j];j++){
var _19=act.isDisabled==false||(typeof act.isDisabled=="function"?act.isDisabled(_15,_16):false);
_17.addChild(new dijit.MenuItem({disabled:_19,label:act.getName(_15,_16),title:act.getTooltip(_15,_16),id:dijit.getUniqueId(act.getId()),onClick:dojo.hitch(act,act.execute,_15,_16)}));
}
dojo.addClass(_17.domNode,"lotusActionMenu");
dojo.addClass(_17.domNode,"lotusPlain");
_13.addChild(new dijit.PopupMenuItem({label:_14.getName(),title:_14.getTooltip(),popup:_17}));
},reOrgActions:function(_1a,app,_1b,_1c,_1d,opt){
var _1e=false;
for(var i=0;i<_1a.length;i++){
if(_1a[i] instanceof Array){
_1e=true;
break;
}
}
var _1f=new Array();
if(_1e){
if(_1b){
for(var i=0;i<_1a.length;i++){
for(var j=0;j<_1a[i].length;j++){
var _20={};
_1a[i][j].selectionChanged(_20,[app.authenticatedUser],{});
if(!_20.visible){
_1a[i][j]=undefined;
}
}
}
}else{
for(var i=0;i<_1a.length;i++){
for(var j=0;j<_1a[i].length;j++){
if(!_1a[i][j].isValid(_1d,opt)){
_1a[i][j]=undefined;
}
}
}
}
for(var i=0;i<_1a.length;i++){
_1a[i]=dojo.filter(_1a[i],function(_21){
return _21!=undefined;
});
for(var j=0;j<_1a[i].length;j++){
if(_1c&&(j==(_1a[i].length-1))&&(i!=_1a.length-1)){
_1a[i][j].addDivider=true;
}
_1f.push(_1a[i][j]);
}
}
return _1f;
}else{
if(!_1b){
_1a=dojo.filter(_1a,function(_22){
return _22.isValid(_1d,opt);
});
}
return _1a;
}
},reOrgActionsWithDivider:function(_23,app,_24,_25,opt){
return lconn.share.util.ActionUtil.reOrgActions(_23,app,_24,true,_25,opt);
}});
})();
}


;if(!dojo._hasResource["lconn.share.scenes.actions"]){
dojo._hasResource["lconn.share.scenes.actions"]=true;
dojo.provide("lconn.share.scenes.actions");














lconn.share.scenes.actions={renderGridButton:function(d,el,_1,_2,_3,_4,_5,_6,_7){
var _8=lconn.share.scenes.actions;
var _9=d.createElement("div");
_9.className="grid-bottom";
_8._render(d,_9,_8._buttonIcon,_1,_2,_3,_4,dojo.mixin({useButtonIcon:true},_5),_6,_7);
if(el){
el.appendChild(_9);
}
return _9;
},renderButtons:function(d,el,_a,_b,_c,_d,_e){
var _f=lconn.share.scenes.actions;
var div=d.createElement("div");
div.className="lotusBtnContainer";
_f._render(d,div,_f._buttonSpan,_a,_b,_c,_d,dojo.mixin({useButton:true},_e));
if(el){
el.appendChild(div);
}
return div;
},renderList:function(d,el,_10,_11,_12,_13,opt,_14){
var _15=lconn.share.scenes.actions;
var ul=d.createElement("ul");
ul.className="lotusActions lotusInlinelist";
_15._render(d,ul,_15._li,_10,_11,_12,_13,opt,null,_14);
if(el){
el.appendChild(ul);
}
return ul;
},renderDropdown:function(d,el,_16,_17,_18,_19,opt,_1a){
var _1b=lconn.share.scenes.actions;
var _1c=_1b.renderDropdownGetAllElements(d,el,_16,_17,_18,_19,opt,_1a);
return _1c.toolbarElement;
},renderDropdownGetAllElements:function(d,el,_1d,_1e,_1f,_20,opt,_21){
var _22=lconn.share.scenes.actions;
var _23=d.createElement("div");
dojo.attr(_23,"role","toolbar");
if(opt.addActionDivider==undefined){
opt.addActionDivider=true;
}
var _24=_22._renderDropdownActions(d,_23,_1d,_1e,_1f,_20,opt,null,_21);
if(el){
el.appendChild(_23);
}
return {toolbarElement:_23,menuElements:_24};
},renderImage:function(d,el,_25,_26,opt){
var a=d.createElement("a");
a.href="javascript:;";
a.title=_26.getTooltip(_25,opt);
if(opt.linkClass){
a.className=opt.linkClass;
}
dojo.connect(a,"onclick",dojo.hitch(_26,_26.execute,_25,opt));
dijit.setWaiRole(a,"button");
var img=d.createElement("img");
img.alt=img.title=a.title;
img.src=dojo.config.blankGif;
dijit.setWaiRole(img,"presentation");
a.appendChild(img);
if(opt.linkAlt){
img.alt=opt.linkAlt;
var _27=d.createElement("span");
_27.className="lotusAltText";
_27.appendChild(d.createTextNode(opt.linkAlt));
a.appendChild(_27);
}
el.appendChild(a);
},_buttonSpan:function(d,a,_28,_29){
var _2a=d.createElement("span");
_2a.className="lotusBtn";
if(_28){
dojo.addClass(_2a,"lotusFirst");
}
_2a.appendChild(a);
return _2a;
},_li:function(d,a,_2b,_2c){
var li=d.createElement("li");
if(_2b){
dojo.addClass(li,"lotusFirst");
}
li.appendChild(a);
return li;
},_buttonIcon:function(d,a,_2d,_2e){
var _2f=d.createElement("span");
if(_2d){
dojo.addClass(_2f,"lotusFirst");
}
_2f.appendChild(a);
return _2f;
},_deferredName:function(el,_30){
if(el.firstChild){
el.removeChild(el.firstChild);
}
el.appendChild(document.createTextNode(_30));
},_render:function(d,_31,_32,_33,_34,_35,_36,opt,app,_37){
opt=opt||{};
var _38=opt.useButton;
var _39=opt.useButtonIcon;
var _3a=opt.visibleActions||3;
var _3b=dojo.filter(_34,function(_3c){
return _3c.isValid(_33,opt);
});
if(_3b.length==0&&opt.msgEmpty){
var _3d=d.createTextNode(opt.msgEmpty);
var _3e=_32(d,_3d,!_31.firstChild);
_31.appendChild(_3e);
return;
}
this.replaceViewWithPreview(_34,_3b);
_3b=lconn.share.util.ActionUtil.buildActions(_3b);
var _3f=[];
var _40=[];
for(var i=0,a;a=_3b[i];i++){
var f=a.isPrimary;
if((typeof f=="function")?a.isPrimary():!!f){
_40.push(a);
}else{
_3f.push(a);
}
}
while(_40.length<_3a&&_3f.length>0){
_40.push(_3f.shift());
}
if(_3f.length==1){
_40.push(_3f.shift());
}
for(var i=0,_41;_41=_40[i];i++){
var _42={};
dojo.mixin(_42,opt,app);
if(_37!=undefined&&_37!=null){
dojo.mixin(_33,{feedItems:_37});
}
var url=_41.getUrlResource?_41.getUrlResource(_33,_42):null;
var _43=_41.getName(_33,opt);
if(_39){
var a=d.createElement("imag");
a.href=url||"javascript:;";
a.src=dojo.config.blankGif;
app.generateActionIcon(a,_43,64,d);
dijit.setWaiRole(a,"button");
lconn.share.util.ActionUtil.renderMenu(d,_31,_32,_41,a,opt,_33);
var _44=dojo.hitch(_41,_41.execute,_33,_42);
}else{
if(_38){
var a=d.createElement("button");
a.className="lotusBtn";
a.appendChild(d.createTextNode(_43));
lconn.share.util.ActionUtil.renderMenu(d,_31,_32,_41,a,opt,_33);
var _44=url?dojo.partial(function(url){
window.location=url;
},url):dojo.hitch(_41,_41.execute,_33,_42);
}else{
var a=d.createElement("a");
a.href=url||"javascript:;";
a.appendChild(d.createTextNode(_43));
lconn.share.util.ActionUtil.renderMenu(d,_31,_32,_41,a,opt,_33);
var _44=dojo.hitch(_41,_41.execute,_33,_42);
dijit.setWaiRole(a,"button");
}
}
a.id=dijit.getUniqueId(_41.getId());
dojo.connect(a,"onclick",_44);
if(_43 instanceof dojo.Deferred){
a.appendChild(d.createTextNode(_35));
var _45=lconn.share.scenes.actions;
_43.addCallback(dojo.partial(_45._deferredName,a));
}
a.title=_41.getTooltip(_33,_42);
if(_41.addExtra){
_41.addExtra(_33,a);
}
if(!_38){
a=_32(d,a,!_31.firstChild);
}
_31.appendChild(a);
}
if(_3f.length>0){
if(_38){
var a=d.createElement("button");
a.className="lotusBtn";
}else{
var a=d.createElement("a");
a.href="javascript:;";
dijit.setWaiRole(a,"button");
}
a.id=dijit.getUniqueId("lconn_files_action_more");
a.appendChild(d.createTextNode(_36));
a.title=_36;
dijit.setWaiState(a,"haspopup",true);
a.appendChild(d.createTextNode(" "));
var img=d.createElement("img");
img.alt="";
img.className="lotusArrow lotusDropDownSprite";
img.src=dojo.config.blankGif;
a.appendChild(img);
var _46=d.createElement("span");
_46.className="lotusAltText";
_46.appendChild(d.createTextNode("\u25bc"));
a.appendChild(_46);
if(!_38){
a=_32(d,a,!_31.firstChild,true);
}
_31.appendChild(a);
var _47=new dijit.Menu();
dojo.addClass(_47.domNode,"lotusActionMenu");
dojo.addClass(_47.domNode,"lotusPlain");
for(var i=0,_41;_41=_3f[i];i++){
var _42={};
dojo.mixin(_42,opt);
if(_41.hasChildren){
lconn.share.util.ActionUtil.renderSubMenu(_47,_41,_33,_42);
}else{
_47.addChild(new dijit.MenuItem({label:_41.getName(_33,_42),title:_41.getTooltip(_33,_42),id:dijit.getUniqueId(_41.getId()),onClick:dojo.hitch(_41,_41.execute,_33,_42)}));
}
}
lconn.core.MenuUtility.attachListeners(_47,_38?a:a.firstChild);
var _48=dojo.body().appendChild(d.createElement("span"));
_48.style.display="none";
_48.setAttribute("widgetid",_47.id);
}
},_renderDropdownActions:function(d,_49,_4a,_4b,_4c,_4d,opt,app,_4e){
opt=opt||{};
var _4f=opt.useButton;
var _50=lconn.share.util.ActionUtil.reOrgActions(_4b,app,false,opt.addActionDivider,_4a,opt);
var _51=dojo.filter(_50,function(_52){
return _52.isValid(_4a,opt);
});
if(_51.length==0&&opt.msgEmpty){
var _53=d.createTextNode(opt.msgEmpty);
_49.appendChild(_53);
return {};
}
this.replaceViewWithPreview(_4b,_51);
_51=lconn.share.util.ActionUtil.buildActions(_51);
var _54=[];
for(var i=0,a;a=_51[i];i++){
_54.push(a);
}
if(_54.length>0){
var _55=null;
if(_4f){
_55=d.createElement("button");
_55.className="lotusBtn";
}else{
_55=d.createElement("div");
dojo.attr(_55,"tabindex","0");
}
dijit.setWaiRole(_55,"button");
dojo.attr(_55,"aria-haspopup","true");
_55.id=dijit.getUniqueId("lconn_files_action_title_more");
if(opt.title){
dojo.attr(_55,"title",opt.title);
}
if(opt.innerElement){
_55.appendChild(opt.innerElement);
}
var img=d.createElement("img");
img.alt="";
img.className="lotusArrow lotusDropDownSprite";
img.src=dojo.config.blankGif;
_55.appendChild(img);
var _56=d.createElement("span");
_56.className="lotusAltText";
_56.appendChild(d.createTextNode("\u25bc"));
_55.appendChild(_56);
_49.appendChild(_55);
var _57=new dijit.Menu();
dojo.addClass(_57.domNode,"lotusActionMenu");
dojo.addClass(_57.domNode,"lotusPlain");
dojo.addClass(_57.domNode,"lconnContentTitleDropdownBody");
for(var i=0,_58;_58=_54[i];i++){
var _59={};
dojo.mixin(_59,opt);
if(_58.hasChildren){
lconn.share.util.ActionUtil.renderSubMenu(_57,_58,_4a,_59);
}else{
_57.addChild(new dijit.MenuItem({label:_58.getName(_4a,_59),title:_58.getTooltip(_4a,_59),id:dijit.getUniqueId(_58.getId()),onClick:dojo.hitch(_58,_58.execute,_4a,_59)}));
}
if(_58.addDivider){
_57.addChild(new dijit.MenuSeparator({}));
}
}
var _5a=opt.openMenuHandler?dojo.partial(opt.openMenuHandler,_57,_55):null;
lconn.core.MenuUtility.attachListeners(_57,_55,_5a,true);
var _5b=dojo.body().appendChild(d.createElement("span"));
_5b.style.display="none";
_5b.setAttribute("widgetid",_57.id);
return {span:_5b,menu:_57};
}
return {};
},replaceViewWithPreview:function(_5c,_5d){
var _5e=dojo.filter(_5c,function(_5f){
return _5f.declaredClass==="com.ibm.viewer.lcext.CCDView";
})[0];
var _60=dojo.filter(_5c,function(_61){
return _61.declaredClass==="lconn.files.action.PreviewFile";
})[0];
var _62=dojo.indexOf(_5d,_5e);
var _63=dojo.indexOf(_5d,_60);
if(_5e&&_60&&_62!==-1&&_63===-1){
_5d[_62]=_60;
}
},_previewGrid:function(_64,_65,opt,app,_66){
opt=opt||{};
var _67=opt.useButton;
var _68=opt.useButtonIcon;
var _69=opt.visibleActions||3;
var _6a=dojo.filter(_65,function(_6b){
return _6b.isValid(_64,opt);
});
if(_6a.length==0&&opt.msgEmpty){
return null;
}
var _6c=[];
var _6d=[];
var _6e=false;
var _6f="";
var _70=false;
for(var i=0,a;a=_6a[i];i++){
var f=a.isPrimary;
if((typeof f=="function")?a.isPrimary():!!f){
_6d.push(a);
if(_70&&a.declaredClass=="com.ibm.viewer.lcext.CCDView"){
_6e=true;
_6f=a;
}
}else{
_6c.push(a);
}
}
while(_6d.length<_69&&_6c.length>0){
_6d.push(_6c.shift());
}
if(_6c.length==1){
_6d.push(_6c.shift());
}
var _71=new Array();
var _72=lconn.core.config.features("fileviewer-detailspage");
for(var i=0,_73;_73=_6d[i];i++){
var _74={};
dojo.mixin(_74,opt,app);
dojo.mixin(_64,{feedItems:_66});
var _75=null;
var _76={};
if(_73.declaredClass=="lconn.files.action.DownloadFile"){
_75="Download";
}else{
if(_73.declaredClass=="lconn.files.action.PreviewFile"){
if(_72){
_75="Summary";
_76.hideButton=true;
}else{
_75="Preview";
if(_6e){
_73=_6f;
_75="View";
}
}
}else{
if(!_72&&_73.declaredClass=="lconn.files.action.JumpToDetailsPage"){
_75="Summary";
}
}
}
if(_68&&_75){
var _77=new Object(_76);
_77.name=_75;
var _78=dojo.hitch(_73,_73.execute,_64,_74);
_77.callback=_78;
_71.push(_77);
}
}
return _71;
}};
}


;if(!dojo._hasResource["lconn.share.widget.AbstractRecommendInfo"]){
dojo._hasResource["lconn.share.widget.AbstractRecommendInfo"]=true;
dojo.provide("lconn.share.widget.AbstractRecommendInfo");






dojo.declare("lconn.share.widget.AbstractRecommendInfo",lconn.core.widget.MenuLauncher,{openDelay:250,preloadDelay:150,hideDelay:400,hesitateToggleDelay:800,userRecommended:false,timesRated:-1,countOnly:false,_strings:{},postMixInProperties:function(){
this.nls=this._strings=this.nls||this._strings;
},buildRendering:function(){
var d=document;
if(this.srcNodeRef.nodeName.toLowerCase()!="a"){
throw "AbstractRecommendInfo requires an 'A' element passed as the dom node";
}
this.inherited(arguments);
var el=this.domNode;
if(this.baseClass){
dojo.addClass(el,this.baseClass);
}
dijit.setWaiRole(el,"button");
if(!this._rendered){
this.update();
}
},getIconUrl:function(){
return dojo.config.blankGif;
},getIconClassName:function(){
var _1="lconnSprite lconnSprite-iconRating";
_1+=this.small?"11":(this.large?"16":"14");
_1+=(this.timesRated>0?"-on":"-off");
return _1;
},_initMenu:function(){
},update:function(){
var d=document;
var el=this.domNode;
var _2=this.countOnly;
var _3=this._strings;
var _4=dojo.number.format(this.timesRated);
if(!el.firstChild){
dojo.attr(this.domNode,"aria-owns",this.menuId);
var _5=this.imgNode=el.appendChild(d.createElement("img"));
_5.src=this.getIconUrl();
if(_2){
var _6=el.appendChild(d.createElement("span"));
_6.className="lotusAltText";
_6.appendChild(d.createTextNode(_3.ALT_TEXT));
_6.appendChild(d.createTextNode(" "));
}
var _7=this.labelNode=el.appendChild(d.createElement("span"));
_7.className="lotusMeta";
}
var _5=this.imgNode;
_5.className=this.getIconClassName();
_5.alt=_2?_3.ALT_TEXT:"";
var _7=this.labelNode;
while(_7.firstChild){
_7.removeChild(_7.firstChild);
}
var _8;
if(_2){
_8="\xa0"+_4;
}else{
dijit.setWaiState(el,"pressed",this.userRecommended);
if(this.timesRated<=0){
if(this.userRecommended){
_8=_3.ERROR_RETRIEVE;
}else{
_8=_3.NOT_RECOMMENDED;
}
}else{
if(this.userRecommended){
if(this.timesRated==1){
_8=_3.YOU_HAVE_RECOMMENDED;
}else{
if(this.timesRated==2){
_8=_3.YOU_AND_ONE_HAVE_RECOMMENDED;
}else{
_8=dojo.string.substitute(_3.YOU_AND_X_HAVE_RECOMMENDED,[_4-1]);
}
}
}else{
if(this.timesRated==1){
_8=_3.ONE_HAS_RECOMMENDED;
}else{
_8=dojo.string.substitute(_3.X_HAVE_RECOMMENDED,[_4]);
}
}
}
}
_7.appendChild(d.createTextNode(_8));
},onrecommend:function(_9,_a){
this.userRecommended=_9;
this.timesRated=_a;
this.update();
},onBeforeOpen:function(_b){
var _c=(_b=="click");
var _d=this.menu;
var _e=false;
if(!this.countOnly){
if(_d.info&&(_d.info.timesRated-_d.info.isUserRecommended?1:0)<1){
var r=_d.recommender;
if(r&&_c){
r.toggleRecommend();
}
_e=!!(!_c||r);
}
}else{
if(_d.info&&_d.info.timesRated==0&&!_c){
_e=true;
}
}
if(_e){
var s;
if(_d.recommender){
s=this.nls.RECOMMEND_TOOLTIP;
}else{
if(_d.info&&_d.info.timesRated==0){
s=this.nls.NOT_RECOMMENDED;
}
}
this.domNode.title=s;
}else{
dojo.removeAttr(this.domNode,"title");
}
return _e;
},onOpen:function(_f){
var _10=(_f=="click");
if(_10){
this.focusMenu();
}
var _11=this.menu;
if(_11&&_11.recommender&&_10){
var r=_11.recommender;
if(this._openedLong||!this.countOnly){
r.toggleRecommend();
}else{
r.recommend(true);
}
}
if(!this._ot){
this._ot=setTimeout(dojo.hitch(this,function(){
this._openedLong=true;
}),this.hesitateToggleDelay);
}
},onClose:function(){
clearTimeout(this._ot);
this._ot=null;
this._openedLong=false;
}});
}


;if(!dojo._hasResource["lconn.files.widget.RecommendInfo"]){
dojo._hasResource["lconn.files.widget.RecommendInfo"]=true;
dojo.provide("lconn.files.widget.RecommendInfo");




dojo.declare("lconn.files.widget.RecommendInfo",lconn.share.widget.AbstractRecommendInfo,{_initMenu:function(e){
return lconn.share.requireAsync("lconn.share.widget.tooltip.Recommend").addCallback(this,"_initMenuFinal");
},_initMenuFinal:function(e){
var _1=this.app;
var _2=this.doc;
var _3=lconn.files.scenehelper;
var _4=_1.routes;
var _5=_1.getAuthenticatedUserId();
this.menu=new lconn.share.widget.tooltip.Recommend({net:_1.net,id:this.menuId,title:this.nls.ALT_TEXT,label:_1.nls.LOADING,baseUri:dojo.getObject("lconn.share.config.baseUri")||"/",canRecommend:!!_5,authenticatedUserId:_5,href:_4.getFileUrl(_2,"recommendedby/feed",{pageSize:lconn.share.widget.tooltip.Recommend.prototype.limitPeopleList+1,includeRecommendation:true,format:"JSON",_anonymous:!_5,sK:"createdByName"}),generateLinkToPerson:dojo.hitch(_3,_3.generateUserLink,_1,_4),toggleArgs:{urlRecommendation:(_5?_4.getFileUrl(_2,"recommendation/"+encodeURIComponent(_5)+"/entry",{_anonymous:false}):null),urlFeed:_4.getFileUrl(_2,"feed",{_anonymous:!_5}),nls:_1.nls.RECOMMEND},nls:_1.nls.RECOMMEND},document.createElement("div"));
}});
}

dojo.provide("com.ibm.oneui.controls.nls.HoverPopup")._built=true;
dojo.provide("com.ibm.oneui.controls.nls.HoverPopup.en_us");
com.ibm.oneui.controls.nls.HoverPopup.en_us={"help":"Help","close":"Close","popup":"Popup","closeHint":"Click here to close this pop-up window"};

;dojo.cache("com.ibm.oneui", "controls/templates/HoverPopup.html", "<div class=\"dijitPopup\" style=\"display: none;\" role=\"presentation\"> <div dojoAttachPoint=\"wrapper\" class=\"lotusPopup\" role=\"dialog\" aria-hidden=\"true\"> <div dojoAttachPoint=\"documentWrapper\"> <a dojoAttachPoint=\"closeNode\" class=\"lotusPopupClose\" href=\"#\" dojoAttachEvent=\"click:clickClose\" role=\"button\" title=\"${messages.close}\" role=\"button\" aria-label=\"Close\"><img src=\"${_blankGif}\" alt=\"${messages.close}\"><span class=\"lotusAltText\">X</span></a> <div dojoAttachPoint=\"contentWrapper\" role=\"presentation\"> <div dojoAttachPoint=\"content\" class=\"lotusPopupContent\" id=\"${id}_content\"> </div> </div> </div> <div dojoAttachPoint=\"arrow\" class=\"lotusPopupConnector\" role=\"presentation\"></div> </div></div>");

;if(!dojo._hasResource["com.ibm.oneui.controls.HoverPopup"]){
dojo._hasResource["com.ibm.oneui.controls.HoverPopup"]=true;
dojo.provide("com.ibm.oneui.controls.HoverPopup");




(function(){


dojo.requireLocalization("com.ibm.oneui.controls","HoverPopup");
var _1=500;
var _2=350;
var _3=2;
var _4=50;
var _5=20;
var _6=10;
var _7=dojo.isIE?200:500;
var _8=dojo.i18n.getLocalization("com.ibm.oneui.controls","HoverPopup");
var _9;
dojo.declare("com.ibm.oneui.controls.HoverPopup",dijit._Widget,{content:null,around:null,html:null,onOpen:null,onClose:null,onVisible:null,openDelay:600,closeDelay:800,maxWidth:_1,maxHeight:_2,fixedMaxHeight:false,persist:true,enabled:true,programmatic:false,orientation:null,dialogTitle:_8.popup,dialogLabelledBy:false,offset:0,hideCSS:false,open:function(_a){
if(!this.isEnabled()){
return;
}
if(!_a){
if(this._aroundNodes&&this._aroundNodes.length==1){
_a=this._aroundNodes[0];
}else{
return;
}
}
if(this._openTimer){
clearTimeout(this._openTimer);
delete this._openTimer;
}
var m=this._getMasterPopup();
if(m._showing&&m._showing.programmatic==="block"){
return;
}
if(m._showing===this){
if(this._target===_a){
if(dojo.isFunction(this.onVisible)){
this.onVisible(this);
}
return;
}
this.close();
}
if(this.persist){
this._events=[];
this._events.push(this.connect(m.domNode,"onmouseover",this._hoverPopup));
this._events.push(this.connect(m.domNode,"onmouseout",this._mouseOutPopup));
this._events.push(this.connect(m.domNode,"onhover",this._hoverPopup));
this._events.push(this.connect(m.domNode,"onunhover",this._unHoverPopup));
}
this._isOpen=true;
this._target=_a;
if(this._lastOpen==-1&&this.createContents){
this.content=this.createContents(this);
if(!this.content){
console.error("HoverPopup: The createContents function must return a valid dom node.");
this.close();
return;
}
}
if(this.onOpen&&dojo.isFunction(this.onOpen)){
this.onOpen(this,this._lastOpen);
}
this._lastOpen=new Date().getTime();
m.setContent(this.content);
if(this.onContentSet&&dojo.isFunction(this.onContentSet)){
this.onContentSet();
}
var _b=m.closeNode;
if(_b){
_b.style.display=this.hideClose?"none":"";
dojo.attr(_b,"tabIndex",this.closeTabIndex||0);
}
this._doManagedConnects();
m.show(_a,this);
dijit.setWaiState(_a,"owns",this.id+"_popup");
this._validate();
},close:function(e,_c){
if(!_c&&this.clickToClose){
return;
}
this.clickToClose=false;
if(this._closeTimer){
clearTimeout(this._closeTimer);
delete this._closeTimer;
}
if(this._validateTimeout){
clearTimeout(this._validateTimeout);
delete this._validateTimeout;
}
if(this._events){
while(this._events.length>0){
this.disconnect(this._events.pop());
}
}
var m=this._getMasterPopup();
if(m._showing!==this){
return;
}
this._doManagedDisconnects();
this._isOpen=false;
if(this.onClose&&dojo.isFunction(this.onClose)){
this.onClose(this);
}
this._target=null;
m.hide();
},clickClose:function(e){
if(e){
dojo.stopEvent(e);
}
this.close(e,true);
},isOpen:function(_d){
if(!this._isOpen){
return false;
}
if(_d){
return _d===this._target;
}
return true;
},managedConnect:function(_e,_f,_10,_11,_12){
var _13={arg1:_e,arg2:_f,arg3:_10,arg4:_11,arg5:_12};
this._mConnects.push(_13);
if(this._isOpen){
this._doManagedConnect(_13);
}
},isEnabled:function(){
return this.enabled;
},updateDimensions:function(_14,_15,_16){
},position:function(_17){
var _18=this._getMasterPopup();
if(!_17){
if(!this._isOpen||!this._target){
return;
}
_17=this._target;
}
var _19=dojo.position(_17,true);
var _1a=dojo.position(_17,false);
var _1b=dojo.position(document.body);
var _1c=_1b.w;
var _1d=_19.x;
var _1e=_19.y;
var _1f=_1a.x;
var _20=_1a.y;
var _21=_1a.w;
var _22=_1a.h;
var _23=dijit.getViewport();
var _24=_23.w;
var _25=_23.h;
var _26=_23.l;
var _27=_23.t;
this.updateDimensions(_23,_19,_1a);
var _28=this.effectiveMaxWidth=Math.min(this.maxWidth,_24-60);
var _29=this.effectiveMaxHeight=Math.min(this.maxHeight,_25-30);
var _2a=_18.contentWrapper;
var _2b=_18.content;
var _2c=_18.wrapper;
var _2d=_18.domNode;
var _2e=_18.arrow;
var _2f=_2d.style;
var _30=this._dimArrow;
if(!_30){
_30=this._dimArrow={};
var _31=_2c.className;
_2c.className=_31+" lotusPopupLeft";
_30.left=dojo.marginBox(_2e);
_2c.className=_31+" lotusPopupBottom";
_2e.className=_2e.className+" ";
_30.bottom=dojo.marginBox(_2e);
_2c.className=_31;
}
var _32=this._dimBorders;
if(!_32){
var _33=dojo.position(_2b);
var _34=dojo.position(_2d);
var _35=_33.x-_34.x;
var top=_33.y-_34.y;
_32=this._dimBorders={l:_35,t:top,r:_34.w-_33.w-_35,b:_34.h-_33.h-top};
}
if(!dojo.isIE||dojo.isIE>=8){
_2a.style.maxWidth=_28==_1?"":(_28+"px");
}
if(!this.fixedMaxHeight){
_2a.style.maxHeight=_29==_2?"":(_29+"px");
}
var _36=this.orientation;
switch(_36){
case "L":
case "l":
var _35=true;
break;
case "R":
case "r":
var _35=false;
break;
default:
var l=_1f;
var r=_24-_1f-_21;
var _35=l>r;
}
if("BbTt".indexOf(_36)!=-1){
var _37=Math.min(_28,_2c.scrollWidth);
var _38=_36=="t"||_36=="T";
dojo.addClass(_2c,"lotusPopupBottom");
var _39=_1d+_21/2;
var _3a=_30.bottom.w/2;
var _3b=_37/2;
_2f.top=(_27+_20+_22+this.offset)+"px";
if(_35){
var _3c=Math.min(_1c-_6-_37,_39-_3b);
_2f.left=_3c+"px";
}else{
var _3c=Math.max(_6,_39-_3b);
_2f.left=_3c+"px";
}
_2e.style.left=Math.max(_39-_3a-_3c-_32.l,0)+"px";
_2e.style.right="auto";
}else{
var _3d=_30.left;
var _3e=_35?{"TL":"TR","BL":"BR"}:{"TR":"TL","BR":"BL"};
var _3f=dijit.placeOnScreenAroundRectangle(_2d,{x:_1d-_3d.w-this.offset+_32.l,y:_1e,width:_21+(_3d.w+this.offset-_32.l)*2,height:_22},_3e);
var _40=_3f.aroundCorner;
var _41=("R"==_40.charAt(1));
var _38=("T"==_40.charAt(0));
if(!this.hideCSS){
if(dojo._isBodyLtr()){
dojo.addClass(_2c,_41?"lotusPopupRight":"lotusPopupLeft");
}else{
dojo.addClass(_2c,_41?"lotusPopupLeft":"lotusPopupRight");
}
}
var _42=_3f.h;
var _43=_3f.y;
var _44=_22/2;
var _45=_3d.h/2;
var _46=Math.round(_45-_44);
var _47=_38?(_43-_27):(_27+_25-_43-_42);
if(_22>_42){
var _48=_42/2;
var _49=Math.round(_44-_48);
var _4a=Math.round(_48-_45);
}else{
var _49=Math.min(_47,_45);
var _4a=Math.round(_49-_46);
}
if(_3f.overflow>0){
var _4b=_3f.overflow;
if(_38){
_49+=_4b;
}
_4a+=_4b;
}
_2e.style[_38?"top":"bottom"]=Math.max(_4a-_32[_38?"t":"b"],0)+"px";
_2e.style[_38?"bottom":"top"]="auto";
_2f.top=_43+((_38?-1:1)*_49)+"px";
if(_35){
_2f.right=(_1c-_3f.x-_3f.w+(dojo._isBodyLtr()?0:_1b.x))+"px";
_2f.left="auto";
}
}
_2a.scrollTop=1;
_2a.scrollTop=0;
if(dojo.isIE<8){
_2b.className=_2b.className;
}
},destroy:function(){
if(this._isOpen){
this.close();
}
this.content=null;
this._doManagedDisconnects();
this.inherited(arguments);
},_getMasterPopup:function(){
if(!_9){
_9=new com.ibm.oneui.controls.internal._MasterPopup();
}
return _9;
},postCreate:function(){
this._lastOpen=-1;
this._aroundNodes=[];
this._aConnects=[];
this._mConnects=[];
this._mHandlers=[];
this._attachArounds();
this.createManagedConnects();
},createManagedConnects:function(){
},createContents:function(tip){
var d=dojo.create("div");
if(this.html){
d.innerHTML=this.html;
}
return d;
},_attachArounds:function(){
var a=this.around;
if(dojo.isArray(a)){
for(var i=0;i<a.length;i++){
this._attachAround(a[i]);
}
}else{
this._attachAround(a);
}
delete this.around;
},_attachAround:function(c){
if(!c){
return;
}
if(c.nodeType){
var _4c=c;
}else{
var _4c=dojo.byId(c);
}
if(_4c){
var _4d=this._aConnects;
this._aroundNodes.push(_4c);
dijit.setWaiRole(_4c,"button");
_4d.push(this.connect(_4c,"onmouseover",this._hover));
_4d.push(this.connect(_4c,"onmouseout",this._mouseOut));
_4d.push(this.connect(_4c,"onhover",this._hover));
_4d.push(this.connect(_4c,"onunhover",this._unHover));
if(this._clickAround){
_4d.push(this.connect(_4c,"onclick",this._clickAround));
}
}
},setAround:function(_4e){
this._aroundNodes=[];
dojo.forEach(this._aConnects,this.disconnect,this);
this._aConnects=[];
this.around=_4e;
if(this._isOpen&&this._target&&dojo.indexOf(_4e,this._target)==-1){
this.close();
}
this._attachArounds();
},_doManagedConnects:function(){
for(var i=0;i<this._mConnects.length;i++){
this._doManagedConnect(this._mConnects[i]);
}
},_doManagedConnect:function(_4f){
this._mHandlers.push(dojo.connect(_4f.arg1,_4f.arg2,_4f.arg3,_4f.arg4,_4f.arg5));
},_doManagedDisconnects:function(){
while(this._mHandlers.length>0){
dojo.disconnect(this._mHandlers.pop());
}
},_validate:function(){
if(dojo.isDescendant(this._target,document.body)==true){
if(dojo.isIE<8){
var m=this._getMasterPopup();
var c=m.content;
var cw=m.contentWrapper;
cw.style.width=(c.clientWidth>=(this.effectiveMaxWidth-1)-(m._scrollbarSize||0))?this.effectiveMaxWidth+"px":"";
if(!m._scrollbarSize&&cw.clientWidth!=cw.offsetWidth){
m._scrollbarSize=cw.offsetWidth-cw.clientWidth;
}
}
this._validateTimeout=setTimeout(dojo.hitch(this,this._validate),_7);
return;
}
this.close();
},_mouseOut:function(e){
if(dojo.isDescendant(e.relatedTarget,e.target)==true){
return;
}
this._unHover(e);
},_hover:function(e){
if(this.programmatic){
return;
}
if(this._closeTimer){
clearTimeout(this._closeTimer);
delete this._closeTimer;
}
if(!this._isOpen&&!this._openTimer){
var _50=e.target;
this._openTimer=setTimeout(dojo.hitch(this,function(){
this.open(this._determineTarget(_50));
}),this.openDelay);
}
},_unHover:function(e){
if(this.programmatic){
return;
}
if(this._openTimer){
clearTimeout(this._openTimer);
delete this._openTimer;
}
this._closeTimer=setTimeout(dojo.hitch(this,function(){
if(!this._isTipHovered){
this.close();
}
}),this.closeDelay);
},_hoverPopup:function(e){
this._isTipHovered=true;
},_mouseOutPopup:function(e){
if(dojo.isDescendant(e.relatedTarget,this._getMasterPopup().domNode)==true){
return;
}
this._unHoverPopup(e);
},_unHoverPopup:function(e){
this._isTipHovered=false;
if(e.relatedTarget==this._target||dojo.isDescendant(e.relatedTarget,this._target)==true){
return;
}
this._unHover(e);
},_determineTarget:function(_51){
if(!_51){
return _51;
}
var _52=null;
for(var i=0;i<this._aroundNodes.length;i++){
if(!this._aroundNodes[i]){
continue;
}
if(this._aroundNodes[i]==_51){
return _51;
}
if(dojo.isDescendant(_51,this._aroundNodes[i])==true&&(!_52||dojo.isDescendant(this._aroundNodes[i],_52)==true)){
_52=this._aroundNodes[i];
}
}
return _52?_52:_51;
}});
var _53=[];
dojo.declare("com.ibm.oneui.controls.internal._MasterPopup",[dijit._Widget,dijit._Templated],{zIndex:10000,templatePath:dojo.moduleUrl("com.ibm.oneui","controls/templates/HoverPopup.html"),messages:_8,postCreate:function(){
dojo.style(this.domNode,{display:"none",zIndex:this.zIndex});
var _54=dojo.query(".dijitPopup",document.body)[0];
var _55=this.place;
if(!_54||!_55){
_54=dojo.body();
_55=null;
}
dojo.place(this.domNode,_54,_55);
},show:function(_56,_57){
if(this._showing){
this._showing.close();
}
this._showing=_57;
var _58=this.domNode;
var _59=this.wrapper;
var _5a=this.documentWrapper;
_59.id=_57.id+"_popup";
if(!this._showing.dialogLabelledBy){
dijit.setWaiState(_59,"label",_57.dialogTitle!==null?_57.dialogTitle:_57.title||"");
if(_5a){
dijit.setWaiState(_5a,"label",_57.dialogTitle!==null?_57.dialogTitle:_57.title||"");
}
}
if(_57.customClass){
dojo.addClass(_59,_57.customClass);
}
_58.style.visibility="hidden";
_58.style.display="block";
if(this.zIndex&&!_58.style.zIndex){
_58.style.zIndex=this.zIndex;
}
try{
_57.position(_56);
_58.style.visibility="";
if(dojo.isFunction(_57.onVisible)){
_57.onVisible(_57);
}
dijit.setWaiState(_59,"hidden","false");
_53.push(this);
}
catch(e){
_57.close();
if(dojo.config.isDebug){
console.error(e);
}
}
},hide:function(){
for(var i=0;i<_53.length;i++){
if(_53[i]==this){
var _5b=_53[i+1];
if(_5b&&_5b._showing){
_5b._showing.close();
}
_53.pop();
}
}
var _5c=this.domNode.style;
_5c.cssText="";
_5c.display="none";
this.arrow.style.cssText="";
this.contentWrapper.style.cssText="";
var _5d=this.wrapper;
dijit.setWaiState(_5d,"hidden","true");
if(!this._showing.dialogLabelledBy){
dijit.setWaiState(_5d,"label","");
}
dojo.removeClass(_5d,["lotusPopupLeft","lotusPopupRight","lotusPopupBottom"]);
if(this._showing&&this._showing.customClass){
dojo.removeClass(_5d,this._showing.customClass);
}
this._showing=null;
},setContent:function(_5e){
if(this.content.firstChild){
this.content.replaceChild(_5e,this.content.firstChild);
}else{
this.content.appendChild(_5e);
}
},clickClose:function(_5f){
if(this._showing){
this._showing.clickClose(_5f);
}
}});
com.ibm.oneui.controls.internal._getPopupForNode=function(_60){
for(var i=0,l=_53.length;i<l;i++){
var _61=_53[i];
if(dojo.isDescendant(_60,_61.domNode)){
return _61._showing;
}
}
};
})();
}


;if(!dojo._hasResource["com.ibm.oneui.controls._HoverDialogMixin"]){
dojo._hasResource["com.ibm.oneui.controls._HoverDialogMixin"]=true;
(function(){
dojo.provide("com.ibm.oneui.controls._HoverDialogMixin");






dojo.requireLocalization("com.ibm.oneui.controls","HoverPopup");
var _1=dojo.i18n.getLocalization("com.ibm.oneui.controls","HoverPopup");
dojo.declare("com.ibm.oneui.controls._HoverDialogMixin",dijit._DialogMixin,{underlay:false,_hasF:false,createManagedConnects:function(){
this.managedConnect(dojo.body(),"onkeypress",this,"_onKeyPress");
this.managedConnect(dojo.body(),"onclick",this,"_onBodyClick");
var _2=this.underlay;
if(_2===true){
var _3=true;
_2=this.underlay=new dijit.DialogUnderlay({dialogId:this.id,"class":_3?"lotusPopupUnderlayFixed":""});
if(_3){
_2.layout=function(){
};
}else{
this.managedConnect(window,"onscroll",_2,"layout");
this.managedConnect(window,"onresize",_2,"layout");
}
_2.domNode.title=_1.closeHint;
}
},openWithFocus:function(_4){
this._takeF=true;
this.open(_4);
this._takeF=false;
},_onKeyPress:function(_5){
var _6=_5.target;
var dk=dojo.keys;
if(_5.charOrCode===dk.TAB){
this._getFocusItems(this._getDomNode());
}
var _7=(this._firstFocusItem==this._lastFocusItem);
if(_5.charOrCode==dk.ESCAPE){
if(_5._cancelled){
return;
}
_5._cancelled=true;
var _8=com.ibm.oneui.controls.internal._getPopupForNode(_6)||this;
setTimeout(dojo.hitch(_8,"close"),0);
dojo.stopEvent(_5);
}else{
if(_6==this._firstFocusItem&&_5.shiftKey&&_5.charOrCode===dk.TAB){
if(!_7){
dijit.focus(this._lastFocusItem);
}
dojo.stopEvent(_5);
}else{
if(_6==this._lastFocusItem&&_5.charOrCode===dk.TAB&&!_5.shiftKey){
if(!_7){
dijit.focus(this._firstFocusItem);
}
dojo.stopEvent(_5);
}else{
if(_5.charOrCode===dk.TAB){
_5.stopPropagation();
}
}
}
}
},_onBodyClick:function(e){
var _9=e&&e.target;
if(_9&&!dojo.isDescendant(_9,this._getDomNode())&&(!this._target||!dojo.isDescendant(_9,this._target))){
this._hasF=false;
this.close();
}
},_onStopEvent:function(e){
if(e.type=="click"){
this._onBodyClick(e);
}
},onVisible:function(){
if(this._takeF){
this._hasF=true;
this._getFocusItems(this._getDomNode());
dijit.focus(this._firstFocusItem);
}
},onOpen:function(){
if(this.underlay){
this.underlay.show();
}
},onClose:function(){
if(this.underlay){
this.underlay.hide();
}
if(this._hasF){
dijit.focus(this._target);
}
this._hasF=false;
},_targetClickAround:function(e){
dojo.stopEvent(e);
this.openWithFocus(this._determineTarget(e.target));
},_getDomNode:function(){
return this._getMasterPopup().domNode;
}});
})();
}


;if(!dojo._hasResource["com.ibm.oneui.controls.HoverDialog"]){
dojo._hasResource["com.ibm.oneui.controls.HoverDialog"]=true;
(function(){
dojo.provide("com.ibm.oneui.controls.HoverDialog");




var _1;
dojo.declare("com.ibm.oneui.controls.HoverDialog",[com.ibm.oneui.controls.HoverPopup,com.ibm.oneui.controls._HoverDialogMixin],{programmatic:true,_getMasterPopup:function(){
if(!_1){
_1=new com.ibm.oneui.controls.internal._MasterPopup({place:"before"});
}
return _1;
}});
})();
}


;if(!dojo._hasResource["com.ibm.oneui.Logger"]){
dojo._hasResource["com.ibm.oneui.Logger"]=true;
(function(){
dojo.provide("com.ibm.oneui.Logger");
dojo.declare("com.ibm.oneui.Logger",null,{constructor:function(){
return;
},error:function(_1){
try{
if(dojo.isIE){
console.log("ERROR: "+_1);
}else{
console.error.apply(console,arguments);
}
}
catch(ignore){
}
},warn:function(_2){
try{
if(dojo.isIE){
console.log("WARNING: "+_2);
}else{
console.warn.apply(console,arguments);
}
}
catch(ignore){
}
},info:function(_3){
try{
if(dojo.isIE){
console.log("INFO: "+_3);
}else{
console.info.apply(console,arguments);
}
}
catch(ignore){
}
},log:function(_4){
try{
if(dojo.isIE){
console.log(_4);
}else{
console.log.apply(console,arguments);
}
}
catch(ignore){
}
},debug:function(_5){
try{
if(dojo.isIE){
console.log("DEBUG: "+_5);
}else{
if(dojo.config.isDebug){
console.debug.apply(console,arguments);
}
}
}
catch(ignore){
}
}});
}());
}


;if(!dojo._hasResource["com.ibm.oneui._base"]){
dojo._hasResource["com.ibm.oneui._base"]=true;
dojo.provide("com.ibm.oneui._base");


dojo.declare("com.ibm.oneui._base",[dijit._Widget],{ctx:"",debug:false,_controlinit:null,strings:null,isBidi:null,locale:null,getControlInit:function(){
return this._controlinit;
},setControlInit:function(_1){
this._controlinit=_1;
},constructor:function(){
this.strings=null;
var _2=this;
this.debug=(!!this.debug)||dojo.config.isDebug||dojo.config.debugAtAllCosts;
this.EventHandler={_instance:{_sep:"__",publish:function(_3,_4,_5){
dojo.publish(_3+this._sep+_4,_5);
},subscribe:function(_6,_7,_8,_9){
dojo.subscribe(_6+this._sep+_7,_8,_9);
},unsubscribe:function(_a,_b){
dojo.unsubscribe(_b);
}},getInstance:function(){
return this._instance;
}};
this.Logger={_instance:{_logger:null,log:function(){
if(!!_2.debug&&this._logger&&typeof this._logger.log==="function"){
this._logger.log.apply(this._logger,arguments);
}
},error:function(){
if(!!_2.debug&&this._logger&&typeof this._logger.error==="function"){
this._logger.error.apply(this._logger,arguments);
}
},warn:function(){
if(!!_2.debug&&this._logger&&typeof this._logger.warn==="function"){
this._logger.warn.apply(this._logger,arguments);
}
},info:function(){
if(!!_2.debug&&this._logger&&typeof this._logger.info==="function"){
this._logger.info.apply(this._logger,arguments);
}
},debug:function(){
if(!!_2.debug&&this._logger&&typeof this._logger.debug==="function"){
this._logger.debug.apply(this._logger,arguments);
}
}},getInstance:function(){
if(!!_2.debug&&!this._instance._logger){


this._instance._logger=new com.ibm.oneui.Logger();
}
return this._instance;
},setSystemLogger:function(_c){
if(!!_c){
var _d;
if(typeof _c==="function"){
_d=new _c;
}else{
_d=_c;
}
this._instance._logger=_d;
}
}};
},_getStateObject:function(){
this._stateObj=this._stateObj||[];
var _e=this._stateIndex||this.id;
if(!_e||_e==""){
this._stateIndex=_e="ctrl_"+new Date().getTime();
}
var _f=this;
_f.StateObject=function(_10){
var _11={strings:{},connects:[],widgets:[],styles:[]};
_11=_f._mixin(_11,_10);
return _11;
};
if(!this._stateObj[_e]){
var obj=new this.StateObject(((arguments.length>0)?arguments[0]:{}));
this._stateObj[_e]=obj;
}
return this._stateObj[_e];
},_getValue:function(idx,nam){
var _12=this._getStateObject();
var _13;
if(typeof (idx)==="number"){
_13=this.getItem(idx);
}else{
_13=idx;
}
var ret=null;
if(_13){
try{
ret=_12.store.data.getValue(_13,nam);
}
catch(ee){
}
if(!ret){
try{
ret=_12.store.data.getValue(_13,_12.store.attributes[nam]);
}
catch(ee){
}
}
if(!ret){
try{
ret=_12.store.data.getValue(_13,_12.store.attributes[nam+"Attr"]);
}
catch(ee){
}
}
if(!ret){
ret=null;
}
}
return ret;
},_getStringResource:function(str,def,_14){
var ret=def||"";
var _15=_14||this._getStateObject().strings;
if(_15){
var _16=str.split(".");
var _17=_16.length;
for(var ii=0;ii<_17;ii++){
if(_15){
_15=_15[_16[ii]];
}
}
if(typeof _15==="string"){
ret=_15;
}
}
return _15;
},_connect:function(){
var _18=this._getStateObject();
var cn=dojo.connect.apply(dojo,arguments);
_18.connects.unshift(cn);
},_addWidgetStyle:function(url){
var _19=this._getStateObject();
var css=dojo.create("link",{type:"text/css",rel:"stylesheet",href:url});
dojo.doc.getElementsByTagName("head")[0].appendChild(css);
_19.styles.unshift(css);
},_mixin:function(_1a,_1b){
var ret=dojo.clone(_1a);
for(ii in ret){
if(_1b[ii]&&typeof ret[ii]===typeof _1b[ii]){
if(typeof ret[ii]==="object"){
ret[ii]=this._mixin(ret[ii],_1b[ii]);
}else{
ret[ii]=_1b[ii];
}
}
}
for(ii in _1b){
if(typeof ret[ii]==="undefined"){
ret[ii]=_1b[ii];
}
}
return ret;
},destroy:function(){
var _1c=this._getStateObject();
try{
dojo.forEach(_1c.connects,dojo.disconnect);
}
catch(ee){
}
try{
_1c.connects.length=0;
}
catch(ee){
}
try{
dojo.forEach(_1c.widgets,function(itm){
itm.destroy();
});
}
catch(ee){
}
try{
_1c.widgets.length=0;
}
catch(ee){
}
try{
dojo.forEach(_1c.styles,function(itm){
if(itm&&itm.parentNode){
itm.parentNode.removeChild(itm);
}
});
}
catch(ee){
}
try{
_1c.styles.length=0;
}
catch(ee){
}
this.inherited(arguments);
},postMixInProperties:function(){
var obj;
var _1d=this;
if(!this.locale){
if(dojo.locale){
this.locale=dojo.locale;
}else{
this.locale="en";
}
}
if(!this.isBidi){
this.isBidi=((dojo.hasAttr(dojo.body(),"dir")&&dojo.attr(dojo.body(),"dir").toLowerCase()=="rtl")||dojo.indexOf(["ar","he"],dojo.locale)>-1);
}
if(typeof this.strings==="string"&&this.strings.length>0){
var str=this.strings;
this.strings=null;
try{
this.strings=dojo.fromJson(str);
}
catch(ee1){
}
}
if(this.strings==null){
this.strings={};
}
var _1e=this.srcNodeRef;
if(!!_1e){
dojo.forEach(_1e.childNodes,function(_1f){
var _20=_1f.nodeValue;
if(_20&&_20.indexOf("[CDATA[")==0){
try{
_20=dojo.trim(_20.substring(0,_20.length-2).substring(7).replace(/\n/g," ").replace(/\r/g," "));
var _21={};
try{
_21=dojo.fromJson(_20);
}
catch(ee2){
}
obj=dojo.mixin(obj,_21);
}
catch(ee1){
console.error("Error reading CDATA for control ("+_1d.declaredClass+"): "+ee1.message,ee1);
}
}
});
}
this._controlinit=obj;
if(this._controlinit&&this._controlinit.strings){
this.strings=dojo.mixin(this.strings,this._controlinit.strings);
}
},_getIsBidi:function(){
return this.isBidi;
},getWidgetLocation:function(){
var _22=dojo.moduleUrl((this.coreWidgetClass||this.declaredClass)).path.split("/");
_22.pop();
_22.pop();
return _22.join("/")+"/";
},getWidgetLocationDojoRelative:function(){
var _23="dojo/dojo/";
var url=this.getWidgetLocation();
var ix=url.indexOf(_23);
if(ix!=-1){
url=url.substr(ix+_23.length);
}
return url;
},parseInt:function(val){
return parseInt(val,10);
},publish:function(_24,_25){
this.EventHandler.getInstance().publish(this.ctx,_24,_25);
},subscribe:function(_26,_27,_28){
this.EventHandler.getInstance().subscribe(this.ctx,_26,_27,_28);
},unsubscribe:function(_29){
this.EventHandler.getInstance().unsubscribe(this.ctx,_29);
},logEnter:function(_2a){
if(!!this.debug){
var _2b=((_2a&&_2a.callee&&_2a.callee.nom)?_2a.callee.nom:_2a);
this.Logger.getInstance().debug("Entering: "+this.declaredClass+"."+_2b+" ("+this.id+")");
}
},logExit:function(_2c){
if(!!this.debug){
var _2d=((_2c&&_2c.callee&&_2c.callee.nom)?_2c.callee.nom:_2c);
this.Logger.getInstance().debug("Exiting: "+this.declaredClass+"."+_2d+" ("+this.id+")");
}
},logError:function(e){
var _2e=this.Logger.getInstance();
_2e.error("Error: "+this.declaredClass+((e.callee)?"."+e.callee:"")+" ("+this.id+") - "+e.message);
_2e.error(e);
}});
}

dojo.provide("com.ibm.oneui.recommend.nls.Recommender")._built=true;
dojo.provide("com.ibm.oneui.recommend.nls.Recommender.en_us");
com.ibm.oneui.recommend.nls.Recommender.en_us={"ERROR":{"TITLE":"Alert","RECOMMEND_LOAD_FAILED":"This item has been deleted or is no longer visible."},"INLINE":{"RECOMMENDED_BYMANY":{"TEXT":"${recommendCount}","TOOLTIP":"${recommendCount} people like this","READONLYTEXT":"${recommendCount}"},"UNRECOMMENDED":{"TEXT":"\x3ca class=\'lotusLikeAction\' role=\'button\' href=\'javascript:;\' id=\'TOGGLE_${id}\'\x3eLike\x3c/a\x3e","TOOLTIP":"Like this","READONLYTEXT":""},"RECOMMENDED_BYONE":{"TEXT":"${recommendCount}","TOOLTIP":"1 person likes this","READONLYTEXT":"${recommendCount}"},"RECOMMENDED_BYNONE":{"TEXT":"${recommendCount}","TOOLTIP":"0 people like this","READONLYTEXT":"${recommendCount}"},"RECOMMENDED":{"TEXT":"\x3cspan class=\'lotusLikeDescription\'\x3eYou like this\x3c/span\x3e \x3cspan class=\'lotusDivider\' role=\'separator\'\x3e-\x3c/span\x3e \x3ca class=\'lotusLikeAction\' role=\'button\' aria-label=\'You like this\' href=\'javascript:;\' id=\'TOGGLE_${id}\'\x3eUnlike\x3c/a\x3e","TOOLTIP":"Unlike","READONLYTEXT":"\x3cspan class=\'lotusLikeDescription\'\x3eYou like this\x3c/span\x3e"}},"POPUP":{"RECOMMENDED_ME_MANY":{"TEXT":"\x3cspan class=\'lotusLikeDescription\'\x3eYou like this\x3c/span\x3e\x3cspan class=\'lotusDivider\' role=\'separator\'\x3e-\x3c/span\x3e\x3ca class=\'lotusLikeAction\' role=\'button\' aria-label=\'You like this\' href=\'javascript:;\' id=\'TOGGLE_${id}\'\x3eUnlike\x3c/a\x3e","TOOLTIP":"Unlike","READONLYTEXT":"\x3cspan class=\'lotusLikeDescription\'\x3eYou like this\x3c/span\x3e"},"RECOMMENDED_ME_ONE":{"TEXT":"\x3cspan class=\'lotusLikeDescription\'\x3eYou like this\x3c/span\x3e\x3cspan class=\'lotusDivider\' role=\'separator\'\x3e-\x3c/span\x3e\x3ca class=\'lotusLikeAction\' role=\'button\' aria-label=\'You like this\' href=\'javascript:;\' id=\'TOGGLE_${id}\'\x3eUnlike\x3c/a\x3e","TOOLTIP":"Unlike","READONLYTEXT":"\x3cspan class=\'lotusLikeDescription\'\x3eYou like this\x3c/span\x3e"},"RECOMMENDED_NOTME_MANY":{"TEXT":"\x3ca class=\'lotusLikeAction\' role=\'button\' href=\'javascript:;\' id=\'TOGGLE_${id}\'\x3eLike\x3c/a\x3e","TOOLTIP":"Like this","READONLYTEXT":""},"RECOMMENDED_HEADER_SHOWING_ALL":"People who like this...","RECOMMENDED_HEADER_SHOWING_SOME":"People who like this... (sorted by name)","RECOMMENDED_CLOSE_TITLE":"Close list of people who like this.","RECOMMENDED_NOTME_ONE":{"TEXT":"\x3ca class=\'lotusLikeAction\' role=\'button\' href=\'javascript:;\' id=\'TOGGLE_${id}\'\x3eLike\x3c/a\x3e","TOOLTIP":"Like this","READONLYTEXT":""},"RECOMMENDED_ME_ONLY":{"TEXT":"\x3cspan class=\'lotusLikeDescription\'\x3eYou like this\x3c/span\x3e\x3cspan class=\'lotusDivider\' role=\'separator\'\x3e-\x3c/span\x3e\x3ca class=\'lotusLikeAction\' role=\'button\' aria-label=\'You like this\' href=\'javascript:;\' id=\'TOGGLE_${id}\'\x3eUnlike\x3c/a\x3e","TOOLTIP":"Unlike","READONLYTEXT":"\x3cspan class=\'lotusLikeDescription\'\x3eYou like this\x3c/span\x3e"}},"LOADING":"Loading...","TEMPLATE_STRINGS":{"LIKES":"Likes"}};

;if(!dojo._hasResource["com.ibm.oneui.recommend._base"]){
dojo._hasResource["com.ibm.oneui.recommend._base"]=true;
(function(){
dojo.provide("com.ibm.oneui.recommend._base");


dojo.declare("com.ibm.oneui.recommend._base",[com.ibm.oneui._base],{loadIndividualStyles:false,loadDefaultStrings:true,currentUserId:null,dataStore:null,displayNameAttr:"displayName",userIdAttr:"userId",mailAttr:"mail",editable:true,size:-1,ERROR:{ITEM_NOT_FOUND:0,ITEM_LOAD_FAILURE:2,DATASTORE_NOT_FOUND:3},_getDefaultStateObject:function(){
return {store:{data:this.dataStore,request:{count:this.count},attributes:{displayNameAttr:this.displayNameAttr,userIdAttr:this.userIdAttr,mailAttr:this.mailAttr}}};
},postMixInProperties:function(){
this._loadSupplementalDojo();
var _1=this;
_1.toggleFocus=false;
var _2=this._getStateObject(this._getDefaultStateObject());
for(sAttr in _2.store.attributes){
if(sAttr){
this[sAttr]=_2.store.attributes[sAttr];
}
}
if(this.loadDefaultStrings){
dojo.requireLocalization("com.ibm.oneui.recommend","Recommender");
_2.strings=dojo.i18n.getLocalization("com.ibm.oneui.recommend","Recommender");
}
if(this.strings!==null&&typeof this.strings==="object"){
if(!_2.strings){
_2.strings=this.strings;
}else{
_2.strings=this._mixin(_2.strings,this.strings);
}
}
try{
if(typeof this.around==="string"){
this.around=dojo.byId(this.around);
}
}
catch(ee){
}
if(this.currentUserId==null||this.currentUserId==""||this.currentUserId.toLowerCase()=="anonymous"){
this.editable=false;
}
setTimeout(function(){
if(typeof _2.store.data=="undefined"||_2.store.data==null){
_1.onError({code:_1.ERROR.DATASTORE_NOT_FOUND,message:"DataStore or Request object not set.",callee:arguments.callee.nom});
}
},1);
this.inherited(arguments);
},populateRecommend:function(){
},_toggleRecommend:function(){
this.toggleFocus=true;
this.logEnter(arguments);
var _3=this;
this._setRecommend(!this._getRecommend(),function(){
setTimeout(function(){
_3.populateRecommend();
},1);
});
this.logExit(arguments);
},_isUserRecommended:false,_currentUserItem:null,_setRecommend:function(yn,_4){
var _5=this._isUserRecommended;
this._isUserRecommended=!!yn;
var _6=this;
var _7;
var ds=this._getStateObject().store.data;
if(!ds){
this.onError({code:this.ERROR.DATASTORE_NOT_FOUND,message:"Data store not found.",callee:arguments.callee.nom});
return;
}
if(this._currentUserItem==null&&this._isUserRecommended){
var _8={};
_8[ds._getIdentifierAttribute()]=this.currentUserId;
try{
_7=ds.newItem(_8);
}
catch(ee){
_7=true;
}
if(_7){
this._isPopulateLoaded=false;
}
}else{
if(this._currentUserItem!=null&&!this._isUserRecommended){
this._currentUserItem._node_=null;
try{
_7=ds.deleteItem(this._currentUserItem);
}
catch(ee){
_7=true;
}
if(_7){
this._isPopulateLoaded=false;
}
}
}
if(ds.isDirty()){
ds.save({onComplete:function(){
if(dojo.isFunction(_4)){
_4();
}
},onError:function(_9){
ds.revert();
_6._isUserRecommended=_5;
_6._onError({code:_6.ERROR.ITEM_LOAD_FAILURE},_9);
}});
}else{
if(dojo.isFunction(_4)){
_4();
}
}
this.logExit(arguments);
},_getRecommend:function(){
return !!this._isUserRecommended;
},_getWidgetClassName:function(_a){
return _a||this.coreWidgetClass||this.declaredClass;
},_loadSupplementalDojo:function(){
this.logEnter(arguments);
if(this.loadDefaultStrings){


}




this.logExit(arguments);
},_onError:function(e,_b){
this.logEnter(arguments);
this.onError.apply(this,arguments);
this.logExit(arguments);
},onError:function(e,_c){
this.logError(e);
}});
})();
}


;dojo.cache("com.ibm.oneui", "recommend/templates/personNode.html", "<div> <div class=\"lotusLikeAvatar\"> <img dojoAttachPoint=\"personImage\" alt=\"\" src=\"../../oneUI/imageLibrary/OtherImages/People/NoPhotoPerson32.png\"/> </div> <div class=\"lotusPerson\"> ${displayName} </div></div> ");

;dojo.cache("com.ibm.oneui", "recommend/templates/PopupContents.html", "<div class=\"lotusLikeLightBox\"> <div class=\"lotusLikeHeader\"> <div class=\"lotusLike\"> <a class=\"lotusLikeCount lotusDisabled\" aria-label=\"\" dojoAttachPoint=\"popupSmiley\"> <img dojoAttachPoint=\"inlineSmiley\" class=\"lotusIconLike\" src=\"${_blankGif}\" alt=\"\"/> <span class=\"lotusAltText\" dojoAttachPoint=\"likeAltAP\"></span> <div dojoAttachPoint=\"popupLikeCount\" class=\"lotusLikeText\" role=\"presentation\">&nbsp;</div> <div class=\"lotusLikeConnector lotusHidden\"></div> </a> <span aria-live=\"assertive\" dojoAttachPoint=\"recommendMessage\">&nbsp;&nbsp;&nbsp;</span> </div> <span class=\"lotusLikeHeaderText\" dojoAttachPoint=\"popupHeaderCountMessage\"></span> </div> <ul class=\"lotusList\" dojoAttachPoint=\"recommendNames\" class=\"lotusLikeLightBox\"> </ul></div>");

;if(!dojo._hasResource["com.ibm.oneui.recommend.Popup"]){
dojo._hasResource["com.ibm.oneui.recommend.Popup"]=true;
(function(){
dojo.provide("com.ibm.oneui.recommend.Popup");










var _1=dojo.i18n.getLocalization("com.ibm.oneui.recommend","Recommender").POPUP.RECOMMENDED_HEADER_SHOWING_ALL;
dojo.declare("com.ibm.oneui.recommend.Popup",[com.ibm.oneui.controls.HoverDialog,com.ibm.oneui.recommend._base],{orient:{"TR":"TL","TL":"TR","BR":"BL","BL":"BR"},orientRTL:{"TL":"TR","TR":"TL","BL":"BR","BR":"BL"},coreWidgetClass:"com.ibm.oneui.recommend.Popup",showActions:true,count:25,start:0,ds:null,popupLikeNamesNode:null,popupWidth:300,dialogLabelledBy:true,dialogTitle:"",constructor:function(){
this.offset=10;
},onError:function(){
lconn.core.DialogUtil.alert(this._getStringResource("ERROR.TITLE"),this._getStringResource("ERROR.RECOMMEND_LOAD_FAILED"));
},_clickAround:function(e){
var _2=this;
setTimeout(function(){
_2.containerNode=_2._getDomNode();
_2.openWithFocus(_2._determineTarget(e.target));
},100);
},openWithFocus:function(_3){
var _4=new dojo.Deferred();
var _5=arguments;
var _6=this;
var _7=this._getMasterPopup();
var _8=_7.domNode;
var _9=dojo.create("a",{role:"button",className:"backTopHidden",href:"javascript:;","aria-hidden":"true"},_8);
dojo.style(_9,{top:"-9999px",position:"absolute"});
dojo.connect(_9,"onfocus",this,"backToTop");
_4.addCallback(function(){
_6.inherited(_5);
});
dojo.publish("com/ibm/oneui/recommend/popup/onOpen",[_6]);
this.populateRecommend(_4);
this.focusFirstLink(this.content);
},destroy:function(){
this.logEnter(arguments);
this.inherited(arguments);
this.logExit(arguments);
},postMixInProperties:function(){
this.logEnter(arguments);
this.inherited(arguments);
if(!this._getStateObject().store.data){
this._onError({code:this.ERROR.DATASTORE_NOT_FOUND,message:"Data store not found.",callee:arguments.callee.nom});
}
this.logExit(arguments);
},postCreate:function(){
this.logEnter(arguments);
this.inherited(arguments);
var _a=this._getMasterPopup();
if(_a){
dojo.requireLocalization("lconn.core","strings");
this.commonStrings=dojo.i18n.getLocalization("lconn.core","strings");
dojo.attr(_a.closeNode,{"title":this._getStringResource("rs_close","",this.commonStrings),"aria-label":this._getStringResource("rs_close","",this.commonStrings)});
}
this.logExit(arguments);
},backToTop:function(e){
this.focusFirstLink();
return;
},focusFirstLink:function(el){
var _b=dojo.query("a",el?el:this.domNode);
var _c=[];
dojo.forEach(_b,function(_d,i){
if(dojo.style(_d,"display")!=="none"&&!dojo.hasClass(_d,"lotusAltText")&&!dojo.hasClass(_d,"backTopHidden")&&dojo.hasClass(_d,"fn")&&dojo.hasClass(_d,"url")){
_c.push(_d);
}
});
var _e=null;
if(_c.length>0){
_e=_c[0];
dijit.focus(_e);
}else{
var _f=this._getMasterPopup();
_e=_f.closeNode;
dijit.focus(_e);
}
this._firstFocusItem=_e;
},position:function(){
this.inherited(arguments);
var _10=this._getMasterPopup();
if(_10){
var _11=_10.domNode;
var _12=this.id+"__popupHeaderCountMessage";
_11.children[0].setAttribute("aria-labelledby",_12);
var pos=dojo.position(_11,true);
var _13=pos.x-5;
if(_13<0){
_13=0;
}
dojo.style(_11,"left",_13+"px");
}
},_isPopulateLoaded:false,_editableLink:null,populateRecommend:function(dfd){
this.logEnter(arguments);
if(!this._isPopulateLoaded){
var _14=this;
var ds=this._getStateObject().store.data;
var _15=function(nam){
return dojo.byId(_14.id+"__"+nam);
};
var _16=function(_17){
if(_14._getRecommend()){
try{
var _18=ds._getIdentifierAttribute();
var _19=ds.getValue(_17,_18,null);
}
catch(ee){
}
}
if(_17._node_&&_17._node_[0]){
var _1a=_17._node_[0];
dojo.place(_14.createPersonNode(_17),_1a,"last");
}
};
var _1b=function(_1c){
ds.revert();
_14._onError({code:_14.ERROR.ITEM_LOAD_FAILURE,message:"Error loading item: "+arguments[0],callee:arguments.callee.nom},_1c);
};
var _1d=function(_1e,_1f){
for(var i=0;i<_1e.length;i++){
if(_1e[i].userId==_1f){
var cu=_1e.splice(i,1);
_1e.unshift(cu[0]);
break;
}
}
return (_1e);
};
var _20=function(_21){
if(dfd){
dfd.callback();
}
_21=_1d(_21,_14.currentUserId);
var _22=_15("recommendMessage");
var _23=_15("recommendNames");
var _24=_15("popupLikeCount");
var _25=_15("popupSmiley");
if(_14.showActions==false){
if(_22!=null){
dojo.destroy(_22);
}
_22=null;
if(_25!=null){
dojo.destroy(_25);
}
_25=null;
}
var _26=_15("popupHeaderCountMessage");
dojo.publish("p_likeSizeUpdate",[_14]);
var _27=_14.size;
if(_27<0){
_27=_21.length;
}
if(_27==0&&_25!=null){
var _28=dojo.attr(_25,"class");
dojo.attr(_25,"class",_28+" lotusNoLikes");
}else{
if(_25!=null){
var _28=dojo.attr(_25,"class");
dojo.attr(_25,"class",_28.replace("lotusNoLikes",""));
}
}
var str="POPUP.";
if(_27<=0){
str+="RECOMMENDED_NOTME_MANY";
}else{
if(_14._getRecommend()){
if(_27==1){
str+="RECOMMENDED_ME_ONLY";
}else{
if(_27==2){
str+="RECOMMENDED_ME_ONE";
}else{
str+="RECOMMENDED_ME_MANY";
}
}
}else{
if(_27==1){
str+="RECOMMENDED_NOTME_ONE";
}else{
str+="RECOMMENDED_NOTME_MANY";
}
}
}
var _29={recommendCount:_27,numshown:_14.count,total:_27,id:_14.id};
var _2a="";
if(_14.showActions){
_2a=_14._getStringResource(str+".TOOLTIP");
_2a=dojo.string.substitute(_2a,_29);
}
var _2b=_14._getStringResource(str+".TEXT");
_2b=dojo.string.substitute(_2b,_29);
if(_22!=null&&_14.showActions!==false){
dojo.html.set(_22,_2b);
_14.containerNode.children[0].setAttribute("aria-labelledby",_22.id);
}
var _2c=(_27==0)?"&nbsp;":_27.toString();
if(_24!=null){
dojo.html.set(_24,_2c);
}
var _2d="INLINE.RECOMMENDED_";
if(_27==0){
_2d+="BYNONE";
}else{
if(_27==1){
_2d+="BYONE";
}else{
_2d+="BYMANY";
}
}
_2d+=".TOOLTIP";
var _2e=dojo.string.substitute(_14._getStringResource(_2d),_29);
var _2f=dojo.byId("TOGGLE_"+_14.id);
if(_2f!=null){
dojo.attr(_2f,{"title":_2e,"aria-label":_2e});
}
if(_25!=null){
dojo.attr(_25,{title:_2e,alt:_2e});
}
if(_14.showActions==false){
if(_22!=null){
dojo.destroy(_22);
}
_22=null;
}
var _30="";
if(_27>_14.count){
}else{
_30=_14._getStringResource("POPUP.RECOMMENDED_HEADER_SHOWING_ALL");
}
if(_14.showActions==true){
_30="";
}
_30=dojo.string.substitute(_30,_29);
dojo.html.set(_26,_30);
dojo.attr(_26,"role","presentation");
var _2f=dojo.byId("TOGGLE_"+_14.id);
if(_2f==null){
_2f=dojo.byId("TOGGLE_["+_14.id+"]");
}
if(_2f){
dojo.attr(_2f,"title",_2a);
_14._connect(_2f,"onclick",_14,"_toggleRecommend");
}
dojo.empty(_23);
for(var ii=0;ii<_21.length;ii++){
if(_14.count==ii){
break;
}
_21[ii].id=_21[ii].id||ds.getValue(_21[ii],ds._getIdentifierAttribute(),null);
if(ds._getNameAttribute){
_21[ii].name=_21[ii].name||ds.getValue(_21[ii],ds._getNameAttribute(),null);
}
if(ds._getUserStateAttribute){
_21[ii].userState=_21[ii].userState||ds.getValue(_21[ii],ds._getUserStateAttribute(),null);
}
_21[ii]._node_=[dojo.create("li",{id:_23.id+"__"+ii})];
dojo.place(_21[ii]._node_[0],_23,"last");
}
if(_21.length==0){
var _31=dojo.create("li",{id:_23.id+"__"+"0"});
dojo.html.set(_31,_14._getStringResource("INLINE.RECOMMENDED_BYNONE.TOOLTIP"));
dojo.place(_31,_23,"last");
}
dojo.forEach(_21,function(_32,idx){
if(ds.isItem(_32)){
if(ds.isItemLoaded(_32)){
_16(_32);
}else{
ds.loadItem({item:_32,onItem:function(_33){
_16(_33);
}});
}
}else{
_14._onError({code:_14.ERROR.ITEM_LOAD_FAILURE,message:"Error loading item: "+arguments[0],callee:arguments.callee.nom});
}
});
var _34=_14._getMasterPopup();
if(_34){
var _35=_34.domNode;
dojo.style(_35,"zIndex",800);
dijit.byId(_34.closeNode).focus();
}
_2f=dojo.byId("TOGGLE_"+_14.id);
if(_2f!=null&&_14.toggleFocus){
_2f.focus();
}
};
var el=_15("recommendMessage");
if(el!=null&&_14.showActions!==false){
dojo.html.set(el,_14._getStringResource("LOADING"));
}
var _36=function(_37,req){
_14.size=_37;
};
if(ds&&ds!=null){
ds.fetchItemByIdentity({identity:this.currentUserId,onItem:function(_38){
_14._currentUserItem=_38;
_14._setRecommend((_38!=null),function(){
ds.fetch({onBegin:_36,onComplete:_20,onError:_1b,count:_14.count});
});
},onError:function(){
if(_14.onError&&dojo.isFunction(_14.onError)){
_14.onError.apply(_14,arguments);
}
}});
}else{
}
}
this.logExit(arguments);
},createPersonNode:function(_39){
this.logEnter(arguments);
var _3a=dijit.byId(_39.id);
if(_3a!=null){
_3a.destroy();
}
_3a=new com.ibm.oneui.recommend.internal.PersonNode(_39);
this._getStateObject().widgets.push(_3a);
this.logExit(arguments);
return _3a.domNode;
},createContents:function(tip){
this.logEnter(arguments);
var _3b=this;
var _3c=new com.ibm.oneui.recommend.internal.PopupContents({currentUserId:this.currentUserId,width:this.popupWidth});
this.popupLikeNamesNode=_3c.recommendNames;
var _3d="dojoattachpoint";
dojo.query("*["+_3d+"!='']",_3c.domNode).forEach(function(_3e,idx,arr){
if((!_3e.id||_3e.id.length==0)&&dojo.hasAttr(_3e,_3d)){
dojo.attr(_3e,"id",_3b.id+"__"+dojo.attr(_3e,_3d));
dojo.removeAttr(_3e,_3d);
}
});
this._getStateObject().widgets.push(_3c);
this.logExit(arguments);
return _3c.domNode;
}});
dojo.declare("com.ibm.oneui.recommend.internal.PersonNode",[com.ibm.oneui._base,dijit._Templated],{templatePath:dojo.moduleUrl("com.ibm.oneui","recommend/templates/personNode.html"),mail:null,cn:null,dn:null,displayName:null});
dojo.declare("com.ibm.oneui.recommend.internal.PopupContents",[com.ibm.oneui._base,dijit._Templated],{mail:null,cn:null,dn:null,displayName:null,templatePath:dojo.moduleUrl("com.ibm.oneui","recommend/templates/PopupContents.html"),widgetsInTemplate:true,isAuthenticated:true,strings:null,postMixInProperties:function(){
this.isAuthenticated=(this.currentUserId!=null);
},buildRendering:function(){
this.inherited(arguments);
dojo.requireLocalization("com.ibm.oneui.recommend","Recommender");
this.strings=dojo.i18n.getLocalization("com.ibm.oneui.recommend","Recommender");
}});
})();
}


;dojo.cache("com.ibm.oneui", "recommend/templates/Inline.html", "<div class=\"lotusLike\" role=\"presentation\"> <a class=\"lotusLikeCount\" dojoAttachPoint=\"inlineLaunchPopup\" href=\"javascript:;\" role=\"button\" aria-haspopup=\"true\" title=\"\"> <img dojoAttachPoint=\"inlineSmiley\" class=\"lotusIconLike\" src=\"${_blankGif}\" alt=\"\"/> <span class=\"lotusAltText\" dojoAttachPoint=\"likeAltAP\"></span> <div dojoAttachPoint=\"inlineLikeCount\" class=\"lotusLikeText\" role=\"presentation\">&nbsp;</div> <div class=\"lotusLikeConnector lotusHidden\"></div> </a> <span role=\"presentation\" aria-live=\"assertive\" dojoAttachPoint=\"inlineLikeActions\">&nbsp;&nbsp;&nbsp;</span></div>");

;if(!dojo._hasResource["com.ibm.oneui.recommend.Inline"]){
dojo._hasResource["com.ibm.oneui.recommend.Inline"]=true;
(function(){
dojo.provide("com.ibm.oneui.recommend.Inline");






dojo.declare("com.ibm.oneui.recommend.Inline",[com.ibm.oneui.recommend._base,dijit._Templated],{coreWidgetClass:"com.ibm.oneui.recommend.Inline",templatePath:dojo.moduleUrl("com.ibm.oneui","recommend/templates/Inline.html"),strings:null,_popup:null,likeSizeSubHandle:null,disableBackground:false,disablePopup:false,destroy:function(){
this.logEnter(arguments);
this.inherited(arguments);
if(this.likeSizeSubHandle){
dojo.unsubscribe(this.likeSizeSubHandle);
}
if(this._popup!=null){
this._popup.destroy();
}
this.logExit(arguments);
},postMixInProperties:function(){
this.logEnter(arguments);
dojo.requireLocalization("com.ibm.oneui.recommend","Recommender");
this.strings=dojo.i18n.getLocalization("com.ibm.oneui.recommend","Recommender");
this.inherited(arguments);
this.logExit(arguments);
},postCreate:function(){
this.logEnter(arguments);
this.inherited(arguments);
if(this.editable){
dojo.query(".lotusLikeConnector",this.domNode).forEach(function(_1){
if(dojo.hasClass(_1,"lotusHidden")){
dojo.removeClass(_1,"lotusHidden");
}
});
}
this.likeSizeSubHandle=dojo.subscribe("p_likeSizeUpdate",this,"updateSizeInline");
this.populateRecommend();
this.logExit(arguments);
},_isPopupDirty:false,updateSizeInline:function(_2){
if(this._popup&&_2&&_2.id==this._popup.id){
var _3=_2.size;
var _4=_2.dataStore.id;
if(typeof (_4)!="undefined"&&_4!=this.dataStore.id){
return;
}
if(this.inlineLikeCount!=null){
dojo.empty(this.inlineLikeCount);
}
var _5={recommendCount:_3,id:this.id};
var _6="INLINE.";
var _7=".TEXT";
if(!this.editable){
_7=".READONLYTEXT";
}
var _6="INLINE.";
if(_3==0){
_6+="RECOMMENDED_BYNONE";
}else{
if(_3==1){
_6+="RECOMMENDED_BYONE";
}else{
_6+="RECOMMENDED_BYMANY";
}
}
var _8=dojo.string.substitute(this._getStringResource(_6+_7),_5);
var _9=dojo.body();
if(!this.disablePopup){
dojo.attr(this.inlineLaunchPopup,"href","javascript:;");
dojo.attr(this.inlineLaunchPopup,"role","button");
dojo.attr(this.inlineLaunchPopup,"aria-haspopup","true");
}
if(_3>0){
if(this.inlineLikeCount!=null){
dojo.html.set(this.inlineLikeCount,_8);
if(!this.disablePopup){
dojo.attr(this.inlineLaunchPopup,"class","lotusLikeCount");
}else{
dojo.attr(this.inlineLaunchPopup,"class","lotusLikeCount lotusDisabled");
}
}
}else{
if(dojo.hasClass(_9,"dijit_a11y")){
dojo.html.set(this.inlineLikeCount,_8);
}else{
dojo.html.set(this.inlineLikeCount,"&nbsp;");
}
}
if(dojo.hasClass(_9,"dijit_a11y")){
this.inlineLikeCount.innerHTML="";
}
}
},populateRecommend:function(){
var _a=this;
dojo.addClass(_a.domNode,"inlineLoading");
var ds=this._getStateObject().store.data;
var _b=function(_c,_d){
_a.size=_c;
};
var _e=function(){
dojo.removeClass(_a.domNode,"inlineLoading");
if(_a.inlineLikeActions!=null){
dojo.empty(_a.inlineLikeActions);
}
if(_a.inlineLikeCount!=null){
dojo.empty(_a.inlineLikeCount);
}
var _f="INLINE.";
var _10=".TEXT";
if(!_a.editable){
_10=".READONLYTEXT";
}
if(_a._getRecommend()){
_f+="RECOMMENDED";
}else{
_f+="UNRECOMMENDED";
}
var _11=_a.size;
if(_a.prev_iNumNames==undefined){
_a.prev_iNumNames=0;
}else{
_a.prev_iNumNames=_11;
}
if(_11==0||_a.disablePopup){
dojo.removeAttr(_a.inlineLaunchPopup,"href");
dojo.removeAttr(_a.inlineLaunchPopup,"role");
dojo.removeAttr(_a.inlineLaunchPopup,"title");
dojo.removeAttr(_a.inlineLaunchPopup,"aria-haspopup");
dojo.removeAttr(_a.inlineLaunchPopup,"aria-label");
var _12="";
if(_a.disableBackground){
_12="lconnLikeCountNoBackground lotusDisabled";
}else{
_12="lotusLikeCount lotusDisabled";
}
dojo.attr(_a.inlineLaunchPopup,"class",_12);
}else{
if(_a.prev_iNumNames==0){
dojo.attr(_a.inlineLaunchPopup,"aria-haspopup",true);
}
}
var _13={recommendCount:_11,id:_a.id};
var _14=dojo.string.substitute(_a._getStringResource(_f+_10),_13);
if(_a.inlineLikeActions!=null&&_a.currentUserId!=null){
dojo.html.set(_a.inlineLikeActions,_14);
}
var _15=dojo.string.substitute(_a._getStringResource(_f+".TOOLTIP"),_13);
var _16=dojo.byId("TOGGLE_"+_a.id);
if(_16!=null){
dojo.attr(_16,{"title":_15,"aria-label":_15});
}
_f="INLINE.";
if(_11==0){
_f+="RECOMMENDED_BYNONE";
}else{
if(_11==1){
_f+="RECOMMENDED_BYONE";
}else{
_f+="RECOMMENDED_BYMANY";
}
}
var _15=dojo.string.substitute(_a._getStringResource(_f+".TOOLTIP"),_13);
dojo.attr(_a.inlineLaunchPopup,{"title":_15});
dojo.attr(_a.inlineSmiley,"alt","");
_14=dojo.string.substitute(_a._getStringResource(_f+_10),_13);
var _17=dojo.body();
if(!_a.disablePopup){
dojo.attr(_a.inlineLaunchPopup,"href","javascript:;");
dojo.attr(_a.inlineLaunchPopup,"role","button");
dojo.attr(_a.inlineLaunchPopup,"aria-haspopup","true");
}
if(_11>0){
if(_a.inlineLikeCount!=null){
dojo.html.set(_a.inlineLikeCount,_14);
if(!this._disablePopup){
dojo.attr(_a.inlineLaunchPopup,"class","lotusLikeCount");
}else{
dojo.attr(_a.inlineLaunchPopup,"class","lotusLikeCount lotusDisabled");
}
}
}else{
if(dojo.hasClass(_17,"dijit_a11y")){
dojo.html.set(_a.inlineLikeCount,_14);
}else{
dojo.html.set(_a.inlineLikeCount,"&nbsp;");
}
}
if(dojo.hasClass(_17,"dijit_a11y")){
_a.inlineLikeCount.innerHTML="";
}
_a.likeAltAP.innerHTML=_15;
var _16=dojo.byId("TOGGLE_"+_a.id);
if(_16==null){
_16=dojo.byId("TOGGLE_["+_a.id+"]");
}
if(_16){
_a._connect(_16,"onclick",_a,"_toggleRecommend");
}
_16=_a.inlineLaunchPopup;
if(_16&&!_a.disablePopup){


var _18=_a._getStateObject();
var _19=_a._getPopup(_16,_18,_13);
_a.connect(_19,"onError",_a,"onError");
_a.connect(_19,"_toggleRecommend",function(){
_a._isPopupDirty=_a._getRecommend()!=_19._getRecommend();
});
_a.connect(_19,"onClose",function(){
if(_a._isPopupDirty){
setTimeout(function(){
_a.populateRecommend();
_a._isPopupDirty=false;
},100);
}
});
_18.widgets.push(_19);
}
_16=dojo.byId("TOGGLE_"+_a.id);
if(_16!=null&&_a.toggleFocus){
_16.focus();
}
if(_a.disablePopup){
dojo.attr(_a.inlineLaunchPopup,"class","lotusLikeCount lotusDisabled");
}
dojo.publish("com/ibm/oneui/recommend/inline/likeActionComplete",{recommendationsNode:_a.domNode});
};
var _1a=function(){
ds.revert();
this._onError(arguments[0]);
};
if(ds&&ds!=null){
ds.fetchItemByIdentity({identity:this.currentUserId,onItem:function(_1b){
_a._currentUserItem=_1b;
_a._setRecommend((_1b!=null),function(){
ds.fetch({onBegin:_b,onComplete:_e,onError:_1a,count:_a.count});
});
}});
}else{
}
this.logExit(arguments);
},_getPopup:function(_1c,_1d,_1e){
return this.getPopup({debug:this.debug,editable:this.editable,around:_1c,currentUserId:this.currentUserId,dataStore:_1d.store.data,showActions:false});
},getPopup:function(_1f){
if(this._popup==null){
this._popup=new com.ibm.oneui.recommend.Popup(_1f);
}
return (this._popup);
}});
})();
}


;dojo.cache("com.ibm.oneui", "controls/templates/LikePerson.html", "<div> <div class=\"lotusLikeAvatar\"> <a href=\"${profileURL}\" target=\"_blank\" tabindex=\"-1\"><img class=\"lotusProfilePicture\" alt=\"\" src=\"${photoURL}\" style=\"width:32px; height:32px\"/></a> </div> <div class=\"vcard lotusLikeAvatarLink\" dojoAttachPoint=\"personLinkAP\"></div></div>");

;if(!dojo._hasResource["com.ibm.oneui.controls.Like"]){
dojo._hasResource["com.ibm.oneui.controls.Like"]=true;
dojo.provide("com.ibm.oneui.controls.Like");
(function(){
var _1={inline:{templatePath:dojo.moduleUrl("com.ibm.oneui","recommend/templates/Inline.html")},popup:{templatePath:dojo.moduleUrl("com.ibm.oneui","recommend/templates/PopupContents.html")}};




dojo.declare("com.ibm.oneui.controls.Like",[com.ibm.oneui.recommend.Inline],{getPopup:function(_2){
if(!this._popup){
_2.dataStore=this.popupDataStore||this.dataStore;
_2.getUserProfileUrl=this.getUserProfileUrl;
_2.getUserPhotoUrl=this.getUserPhotoUrl;
this._popup=new com.ibm.oneui.controls.LikePopup(_2);
}
return this._popup;
},getUserProfileUrl:function(id){
return "";
},getUserPhotoUrl:function(id){
return "";
}});
dojo.declare("com.ibm.oneui.controls.LikePopup",[com.ibm.oneui.recommend.Popup],{popupWidth:300,fixedMaxHeight:true,createPersonNode:function(_3){
_3.profileURL=this.getUserProfileUrl(_3.id);
if(!_3.photoURL||_3.photoURL==""){
_3.photoURL=this.getUserPhotoUrl(_3.id);
}
var _4=new com.ibm.oneui.controls.LikePerson(_3);
this._getStateObject().widgets.push(_4);
dojo.publish("com/ibm/oneui/likePopup/personAdded",[_4]);
return _4.domNode;
}});
dojo.declare("com.ibm.oneui.controls.LikePerson",[dijit._Widget,dijit._Templated],{displayName:null,photoURL:null,profileURL:null,templatePath:dojo.moduleUrl("com.ibm.oneui","controls/templates/LikePerson.html"),constructor:function(_5){
this.profileURL=_5.profileURL;
this.photoURL=_5.photoURL;
this.displayName=_5.name;
this.inherited(arguments,[null]);
},postscript:function(_6,_7){
this.inherited(arguments,[null,_7]);
var _8=com.ibm.lconn.layout.people.createLink({name:_6.name,userid:_6.id,email:_6.email,state:_6.userState});
if(!_8){
_8=dojo.create("span",{"aria-describedby":"semtagmenu",className:"fn lotusBold",href:_6.profileURL,innerHTML:_6.name+"<span style='display: none;' class='x-lconn-userid'>"+_6.id+"</span>"});
}
_8.target="_blank";
this.personLinkAP.appendChild(_8);
if(window.SemTagSvc&&SemTagSvc.parseDom){
SemTagSvc.parseDom(0,this.personLinkAP);
}
}});
})();
}


;if(!dojo._hasResource["lconn.share.widget.LikeInfo"]){
dojo._hasResource["lconn.share.widget.LikeInfo"]=true;
dojo.provide("lconn.share.widget.LikeInfo");


dojo.declare("lconn.share.widget.LikeInfo",null,{popupArgs:null,count:null,domNode:null,nls:null,constructor:function(_1){
dojo.mixin(this,_1);
this.hasPopup=(this.popupArgs!=null);
var _2=this.count;
if(_2==0){
this.nls.LIKES=this.nls.NOT_RECOMMENDED;
}else{
this.nls.LIKES=_2>1?dojo.string.substitute(this.nls.LABEL_A_MANY,[_2]):this.nls.LABEL_A_ONE;
}
},update:function(){
var _3=this.domNode;
var d=document;
var _4=this.inlineLaunchPopup;
var _5=(this.hasPopup&&this._popup)?this._popup.dataStore.recommendationsCount:this.count;
if(_5==0){
this.nls.LIKES=this.nls.NOT_RECOMMENDED;
}else{
this.nls.LIKES=_5>1?dojo.string.substitute(this.nls.LABEL_A_MANY,[_5]):this.nls.LABEL_A_ONE;
}
if(!_4){
dojo.empty(_3);
var _6=_3.appendChild(d.createElement("div"));
dojo.addClass(_6,"lotusLike");
var _4=this.hasPopup?_6.appendChild(d.createElement("a")):_6.appendChild(d.createElement("div"));
}
_4.className="lotusLikeCount lotusLikeSimple";
_4.title=this.nls.LIKES;
_4.href="javascript:;";
dojo.attr(_4,"role","button");
dojo.attr(_4,"aria-haspopup","true");
if(this.hasPopup){
_4.role="button";
dijit.setWaiState(_4,"label",this.nls.LIKES);
}else{
dojo.addClass(_4,"lotusDisabled");
}
this.inlineLaunchPopup=_4;
this._getPopup(this.inlineLaunchPopup);
dojo.empty(_4);
var _7=_4.appendChild(d.createElement("img"));
_7.src=dojo.config.blankGif;
_7.className="lotusIconLike";
_7.alt=this.nls.LIKES;
var _8=_4.appendChild(d.createElement("span"));
_8.className="lotusAltText";
_8.appendChild(d.createTextNode(this.nls.LIKES));
var _9=d.getElementsByTagName("body")[0];
if(!dojo.hasClass(_9,"dijit_a11y")){
_4.appendChild(d.createTextNode(_5));
}
return this.domNode;
},openPopup:function(){
this._getPopup(this.inlineLaunchPopup).open();
},_getPopup:function(_a){
if(!this._popup){
var _b=this.popupArgs;
var _c=_b.currentUserId;
var _d=_b.createPopup;
var _e=_b.handlerMethodName||"handleRecommend";
if(_d){
this._popup=_d(_a);
}else{
_b=dojo.mixin({showActions:!!_c,loadIndividualStyles:false,recommendationsCount:this.count,around:_a},_b);
this._popup=new com.ibm.oneui.controls.LikePopup(_b);
}
dojo.connect(this._popup.dataStore,_e,dojo.hitch(this,this.update));
}
return this._popup;
}});
}


;if(!dojo._hasResource["lconn.files.scenes.AbstractFileRenderer"]){
dojo._hasResource["lconn.files.scenes.AbstractFileRenderer"]=true;
dojo.provide("lconn.files.scenes.AbstractFileRenderer");














dojo.declare("lconn.files.scenes.AbstractFileRenderer",null,{showShares:false,allowFastUpdates:true,constructor:function(_1,_2,_3){
this._strings=_2.nls.CONTENT;
this._appstrings=_2.nls;
this.tagStore=_2.getTagStore();
this.permissions=_2.getUserPermissions();
this.app=_2;
this.scene=_3;
this.net=_2.net;
this.routes=_2.routes;
this.s=lconn.files.scenehelper;
this.sa=lconn.share.scenes.actions;
this.favorites=((_2.isAuthenticated()&&_2.favorites)?_2.favorites.files:null);
if(!this.favorites){
this.createFavoriteToggle=null;
}
this.supportedColumns=_3.supportedColumns;
this.DEFAULT_COLUMNS=_3.defaultColumns||this.DEFAULT_COLUMNS||{};
this.params=_3.params;
this.highlightItems=_3.highlightItems;
this.sortId=_3.sortId;
this.sortReversed=_3.sortReversed;
this.actions=_3.actions;
this.actionOpts={permissions:this.permissions,msgEmpty:_2.nls.CONTENT.EMPTY_MENU,allowFastUpdates:true};
this.loadColumns();
},isSortValid:function(_4){
if(this.scene&&this.scene.isSortValid){
return this.scene.isSortValid(_4);
}
return true;
},selectionChanged:function(_5){
var _6=this.inherited(arguments);
if(this.scene&&this.scene.setActionSelection){
this.scene.setActionSelection(_5);
}
return _6;
},loadColumns:function(){
var _7=this.app.prefs.getDefaultColumns();
var sc=this.supportedColumns;
if(_7&&sc){
for(var i=0,c;c=sc[i];i++){
if(c.ref&&_7[c.ref]){
_7[c.id]=1;
}
}
}
this.showColumns=_7;
},createFavoriteToggle:function(id){
return this.favorites.createToggle(id);
},renderPopup:function(el,a,_8){
return this.s.applyGenericPopup(this.app,el,a,_8);
},renderDownloadWarning:function(_9,d,el,a){
return this.s.applyDownloadWarning(this.app,_9,d,a);
},renderShareLink:function(el,_a,_b,_c,_d){
return this.s.applyShareLink(this.app,el,_a,_b,_c,_d);
},renderActionList:function(el,_e,_f,_10,_11){
var _12={};
var app={};
dojo.mixin(_10,{feedItems:_f});
dojo.mixin(this.actionOpts,{app:this.app});
this.sa.renderList(document,el,_10,_11,this._appstrings.LOADING,this._strings.MORE_ACTIONS,this.actionOpts);
},renderGridButton:function(el,_13,_14,_15,_16,app){
this.sa.renderGridButton(document,el,_15,_16,this._appstrings.LOADING,this._strings.MORE_ACTIONS,this.actionOpts,app,_14);
},previewGridActionButton:function(_17,_18,_19,_1a,app){
return this.sa._previewGrid(_19,_1a,dojo.mixin({useButtonIcon:true},this.actionOpts),app,_18);
},getShareMessage:lconn.files.scenes.share.getFileMessage,buildXsltRecommendation:function(doc,a){
return new lconn.files.widget.RecommendInfo({app:this.app,doc:doc,nls:this.app.nls.RECOMMEND,countOnly:true,large:true,_rendered:true,imgNode:a.firstChild,labelNode:a.lastChild},a);
},buildRecommendation:function(doc,div){
var app=this.app;
var nls=app.nls;
var _1b=this.app.routes;
var _1c=app.getAuthenticatedUserId();
var _1d={createPopup:function(_1e){
var _1f={dataStore:app.getRecommendationsDataStore(doc),recommendationsCount:doc.getRatingCount(),getUserPhotoUrl:dojo.hitch(_1b,_1b.getUserPhotoUrl),getUserProfileUrl:dojo.hitch(_1b,_1b.getUrlToUser),currentUserId:_1c,displayNameAttr:"name",userIdAttr:"id",mailAttr:"email",showActions:true,loadIndividualStyles:false,around:_1e,onError:function(err){
var msg=null;
if(err&&err.status){
var _20=err.status;
if(_20==401){
}else{
if(_20==404){
msg=nls.SAVE_ERROR_NOT_FOUND;
}else{
msg=nls.SAVE_ERROR;
}
}
}
if(msg){
lconn.share.util.html.alert(msg);
}
}};
return new com.ibm.oneui.controls.LikePopup(_1f);
},handlerMethodName:"handleRecommend"};
new lconn.share.widget.LikeInfo({domNode:div,nls:this.app.nls.RECOMMEND,count:doc.getRatingCount(),popupArgs:_1d}).update();
},getLinkToUserTemplate:function(_21){
return this.routes._getUserChannelUrlTemplate(_21);
},generateLinkToPerson:function(_22,a){
return this.s.generateUserLink(this.app,this.routes,_22,a);
},generateLinkToFile:function(_23,a,opt){
return this.s.generateFileLink(this.app,this.routes,_23,a,opt);
},generateFileTypeImage:function(img,_24,_25,_26){
return this.routes.generateFileTypeImage(img,_24,_25,_26);
},getUserRecommendationUrl:function(_27,_28,opt){
return this.routes.getRecommendServiceUrl(_27,_28,opt);
},generateActionIcon:function(img,_29,_2a,_2b){
return this.routes.generateActionIcon(img,_29,_2a);
}});
}


;if(!dojo._hasResource["lconn.files.util.CollectionHelper"]){
dojo._hasResource["lconn.files.util.CollectionHelper"]=true;
dojo.provide("lconn.files.util.CollectionHelper");






dojo.declare("lconn.files.util.CollectionHelper",null,{});
lconn.files.util.CollectionHelper.createPageLink=function(_1,_2,_3,_4,_5,el,_6){
var p=dojo.clone(_4);
p[_5]=(_6)?_6.id:null;
var _7=_2.getCollectionUrl(_3,p);
lconn.files.scenehelper.setOnClick(el,_1,_7);
};
lconn.files.util.CollectionHelper.getCollectionIcon=function(_8){
var d=document;
var _9=d.createElement("td");
var _a=d.createElement("a");
var _b=d.createElement("span");
var _c=d.createElement("img");
var _d=d.createElement("div");
var _e=_c.cloneNode(true);
_e.src=dojo.config.blankGif;
_e.className="lconnSprite lconnSprite-iconFolderClose32";
if(_8){
if(_8=="private"){
_e.className="lconnSprite-iconFolderClose32 lconnSprite-iconFolderPrivate32";
}
if(_8=="shared"){
_e.className="lconnSprite-iconFolderClose32 lconnSprite-iconFolderShared32";
}
if(_8=="public"){
_e.className="lconnSprite-iconFolderClose32 lconnSprite-iconFolderPublic32";
}
if(_8=="community"){
_e.className="lconnSprite-iconFolderClose32 lconnSprite-iconFolderCommunity32";
}
}
_e.alt="";
dijit.setWaiRole(_e,"presentation");
return _e;
};
lconn.files.util.CollectionHelper.generateCollectionLink=function(_f,_10,_11,a,opt){
lconn.files.scenehelper.generateCollectionLink(_f,_10,_11,a,opt);
};
lconn.files.util.CollectionHelper.generateSortLink=function(app,_12,_13,_14,_15,_16,_17,a){
var p=dojo.clone(_14);
p.sort=_16.id;
p.sortReversed=!_17;
delete p.page;
var url=_12.getCollectionUrl(_13,p);
lconn.files.scenehelper.setOnClick(a,app,url);
};
lconn.files.util.CollectionHelper.generatePagingLink=function(app,_18,_19,_1a,_1b,_1c,a){
var p=dojo.clone(_1a);
p.page=_1c;
var url=_18.getCollectionUrl(_19,p);
lconn.files.scenehelper.setOnClick(a,app,url);
};
lconn.files.util.CollectionHelper.navigateToTag=function(app,_1d,_1e,_1f,_20,tag){
var _21=lconn.share.bean.File.splitTags(tag||"");
var p=dojo.clone(_1f);
delete p.search;
p.tag=p.tag||[];
dojo.forEach(_21,function(tag){
var _22=dojo.indexOf(p.tag,tag);
if(_20&&_22==-1){
p.tag.push(tag);
}else{
if(!_20&&_22!=-1){
delete p.tag[_22];
}
}
});
app.navigate(_1d.getCollectionUrl(_1e,p));
};
lconn.files.util.CollectionHelper.generateTagLink=function(app,_23,_24,_25,_26,tag,a){
var p=dojo.clone(_25);
p.tag=p.tag||[];
var _27=dojo.indexOf(p.tag,tag);
if(_26&&_27==-1){
p.tag.push(tag);
}else{
if(!_26&&_27!=-1){
delete p.tag[_27];
}
}
lconn.files.scenehelper.setOnClick(a,app,_23.getCollectionUrl(_24,p));
};
}


;if(!dojo._hasResource["lconn.files.scenes.Renderer"]){
dojo._hasResource["lconn.files.scenes.Renderer"]=true;
dojo.provide("lconn.files.scenes.Renderer");




dojo.declare("lconn.files.scenes.Renderer",[lconn.files.scenes.AbstractFileRenderer],{constructor:function(_1,_2,_3){
this.collectionId=_3.collectionId;
this.cs=lconn.files.util.CollectionHelper;
},replaceItem:function(_4,_5,_6){
var _7=this.inherited(arguments);
if(_5.getAdded){
_7.added=_5.getAdded();
}
if(_5.getAddedBy){
_7.addedBy=_5.getAddedBy();
}
var p=_7.getPermissions();
var p2=_5.getPermissions();
p.DeleteFromCollection=p.DeleteFromCollection||p2.Delete||p2.DeleteFromCollection;
return _7;
},generateLinkToTag:function(_8,a){
return this.cs.generateTagLink(this.app,this.routes,this.collectionId,this.params,true,_8,a);
},generatePagingLink:function(_9,_a,a){
return this.cs.generatePagingLink(this.app,this.routes,this.collectionId,this.params,_9,_a,a);
},generateSortLink:function(_b,_c,_d,a){
return this.cs.generateSortLink(this.app,this.routes,this.collectionId,this.params,_b,_c,_d,a);
}});
}


;if(!dojo._hasResource["lconn.files.widget.FileDndCore"]){
dojo._hasResource["lconn.files.widget.FileDndCore"]=true;
dojo.provide("lconn.files.widget.FileDndCore");
dojo.declare("lconn.files.widget.FileDndCore",null,{_dropFile:function(_1,_2){
if(!_1||!_2){
return;
}
if(_1.length==1){
var _3=_1[0];
if(!_3.isFolder()){
lconn.share.requireAsync("lconn.files.action.impl.MoveFile").addCallback(this,function(){
if(!this.moveFileAction){
this.moveFileAction=new lconn.files.action.impl.HeadlessMoveFile(this.app,null,{});
}
this.moveFileAction.execute(_2,_3);
});
}else{
lconn.share.requireAsync("lconn.files.action.impl.HeadlessMoveCollection").addCallback(this,function(){
if(!this.moveFolderAction){
this.moveFolderAction=new lconn.files.action.impl.HeadlessMoveCollection(this.app,null,{});
}
this.moveFolderAction.execute(_2,_3);
});
}
}else{
lconn.share.requireAsync("lconn.files.action.impl.HeadlessBulkAction").addCallback(this,function(){
if(!this.bulkAction){
var _4={isMove:true};
this.bulkAction=new lconn.files.action.impl.HeadlessBulkAction(this.app,null,_4);
}
this.bulkAction.execute(_2,_1);
});
}
}});
}


;if(!dojo._hasResource["lconn.files.scenes.AbstractSocialRenderer"]){
dojo._hasResource["lconn.files.scenes.AbstractSocialRenderer"]=true;
dojo.provide("lconn.files.scenes.AbstractSocialRenderer");
























dojo.declare("lconn.files.scenes.AbstractSocialRenderer",[lconn.share.widget.FileRendererSocial,lconn.files.widget.FileDndCore],{getSorts:function(_1,_2){
var _3=this.inherited(arguments);
for(var i=0;i<_3.length;i++){
if(_3[i].id=="modified"){
_3[i].isDefault=true;
break;
}
}
return _3;
},getUrlExpand:function(_4){
var _5;
if(this.permissions.isAuthenticated()){
_5=_4.getUrlEdit();
}
if(!_5){
_5=_4.getUrlEntry();
}
var _6={acls:true,includeNotification:true,includeTags:true,includePolicy:true};
if(this.app&&this.app.scene&&this.app.scene.collection){
_6.collectionId=this.app.scene.collection.getId();
}
return lconn.share.util.uri.rewriteUri(_5,_6);
},_initCollectionsMetas:function(){
var _7=[];
_7.push({id:"owner",isValid:dojo.hitch(this,function(_8){
var _9=_8.getAuthor();
return this.displayOwner&&_9&&_9.name;
}),render:dojo.hitch(this,function(_a,_b,d,el,_c){
var a=el;
this.generateLinkToPerson(_b.getAuthor(),a);
a.appendChild(d.createTextNode(_b.getAuthor().name));
})});
_7.push({id:"modifier",isValid:dojo.hitch(this,function(_d){
var _e=(_d.getUpdated().getTime()!=_d.getPublished().getTime());
var _f=_e?_d.getModifier():_d.getAuthor();
return _f&&_f.name;
}),render:dojo.hitch(this,function(app,_10,d,el,_11){
var d=document;
var _12=(_10.getUpdated().getTime()!=_10.getPublished().getTime());
var _13=_12?_10.getModifier():_10.getAuthor();
var nls=this._appstrings.DOCUMENTCONTENT;
var _14=_12?nls.LABEL_UPDATED_OTHER:nls.LABEL_ADDED_OTHER;
var df=new lconn.share.util.DateFormat(_10.getUpdated());
var _15=df.formatByAge(_14);
lconn.share.util.html.substitute(d,el,_15,{user:function(){
var a=d.createElement("a");
a.className="lotusPerson";
a.appendChild(d.createTextNode(_13.name));
this.generateLinkToPerson(_13,a);
return a;
}},null,this);
el.title=df.format(_14.FULL);
})});
_7.push({id:"subfolderscount",render:dojo.hitch(this,function(app,_16,d,el,_17){
var nls=this._appstrings.COLLECTIONS;
var _18=_16.getCollectionCount();
if(!_18&&_18>0){
el.appendChild(d.createTextNode(dojo.string.substitute((_18!=1)?nls.FOLDERS_LABEL_MANY:nls.FOLDERS_LABEL_1,[dojo.number.format(_18)])));
}else{
dojo.style(el,{"display":"none"});
}
})});
_7.push({id:"filescount",render:dojo.hitch(this,function(app,_19,d,el,_1a){
var _1b=_19.getMediaCount();
var nls=this._appstrings.COLLECTIONS;
if(_1b>0){
el.appendChild(d.createTextNode(dojo.string.substitute((_1b!=1)?nls.FILES_LABEL_MANY:nls.FILES_LABEL_1,[dojo.number.format(_1b)])));
}else{
dojo.style(el,{"display":"none"});
}
})});
this.collectionMetas=_7;
},renderUserFragment:function(_1c,_1d,_1e,_1f,_20){
if(this.showAdded){
var d=document;
var _21=_1e.getAddedBy();
var _22=this.permissions.isAuthenticated()?this.permissions.isAuthenticated(_21.id):false;
var _23=_22?this.getUserFragmentXsltStrings()._added_to_self:this.getUserFragmentXsltStrings()._added_to_other;
var df=new lconn.share.util.DateFormat(_1e.getAdded());
var _24=df.formatByAge(_23);
lconn.share.util.html.substitute(d,_20,_24,{user:function(){
var a=d.createElement("a");
a.className="lotusPerson";
a.appendChild(d.createTextNode(_21.name));
this.generateLinkToPerson(_21,a);
return a;
}},null,this);
_20.title=df.format(_23.FULL);
}else{
this.inherited(arguments);
}
},_buildItem:function(_25,_26){
if(_25 instanceof lconn.share.bean.PartialFile){
dojo.mixin(_26,_25);
return _26;
}
if(_25 instanceof lconn.share.bean.PartialCollection){
dojo.mixin(_26,_25);
return _26;
}
var _27=lconn.share.bean.File.createBean(_25,{apiType:this.apiType});
if(_27.getCategory()=="collection"){
_27=lconn.share.bean.Collection.createBean(_25,{apiType:this.apiType});
}
return _27;
},renderItem:function(_28,el,_29,doc,_2a,_2b,_2c,_2d,_2e){
if(!doc.isFolder()){
this.inherited(arguments);
}else{
this._renderCollectionItem(_28,el,_29,doc,_2a,_2b,_2c,_2d,_2e);
}
},_renderCollectionItem:function(_2f,el,_30,doc,_31,_32,_33,_34,_35){
var d=document;
var app=this.app;
var _36=d.createElement("td");
var a_t=d.createElement("a");
var _37=d.createElement("span");
var _38=d.createElement("img");
var _39=d.createElement("div");
var _3a=lconn.files.util.CollectionHelper;
var _3b;
var a1,a2;
var tr=_34;
var trd=_35;
var _3c=doc.isPrivate()?"private":(doc.isPublic()?"public":(doc.isShared()?"shared":null));
if(doc.getType()=="community"){
_3c="community";
}
tr.style.cursor="default";
tr.itemPosition=_31;
lconn.share.widget.StreamRendererMultiSelection.renderSelection(null,_2f,this,d,tr.firstChild,doc,_31);
var td=_3b=tr.firstChild.nextSibling;
lconn.share.util.html.destroyWidgets(td);
td.innerHTML="";
td.appendChild(_3a.getCollectionIcon(_3c));
td=td.nextSibling;
var a=td.firstChild.firstChild;
a.innerHTML="";
var _3d=lconn.share.util.html.formatFilename(doc.getName());
lconn.share.util.html.breakString(_3d,d,a,10);
if(!dojo._isBodyLtr()){
a.innerHTML+="&rlm;";
}
a.title=_3d;
_3a.generateCollectionLink(app,app.routes,doc,a,{});
while(a.nextSibling){
td.firstChild.removeChild(a.nextSibling);
}
this.decorateFileName(doc,td.firstChild,a);
var div=td.firstChild.nextSibling;
div.removeAttribute("role");
dojo.empty(div);
var _3e=this.metas;
var _3f={app:app,file:doc,className:"lotusInlinelist",renderer:this,nls:dojo.mixin({},this._appstrings,this._strings)};
var _40=app.nls.COLLECTIONS;
var _41=app.nls;
_40.SORTING_DESC=_41.CONTENT.SORTING_DESC;
_40.SORTING_ASC=_41.CONTENT.SORTING_ASC;
_40.SORTING_DESC_LONG=_41.CONTENT.SORTING_DESC_LONG;
_40.SORTING_ASC_LONG=_41.CONTENT.SORTING_ASC_LONG;
var _3e=this.collectionMetas;
lconn.files.scenehelper.applyFileDescriptions(app,doc,_3e,d,div,_3f);
if(!this.hideRating){
td=td.nextSibling;
dojo.empty(td);
var top=td.appendChild(_39.cloneNode(true));
top.appendChild(d.createTextNode("---"));
}
if(this.createFavoriteToggle){
td=td.nextSibling;
dojo.empty(td);
var top=td.appendChild(_39.cloneNode(true));
if((app.favorites&&app.scene.collection&&app.scene.collection.getType()!="community")||this.showFavorite){
if(doc.canSetFavorite()){
var t=app.favorites.folders.createToggle(doc.getId());
}else{
var t=d.createTextNode("---");
}
}else{
var t=d.createTextNode("\xa0");
}
top.appendChild(t);
}
var m=lconn.files.scenes.share.getFolderMessage(doc,this._strings);
td=td.nextSibling;
dojo.addClass(td,"lotusNowrap");
td.innerHTML="";
var img=_38.cloneNode(true);
img.src=dojo.config.blankGif;
img.className=m.i;
img.alt="";
img.style.marginTop="1px";
this._renderShareCollectionLink(td,img,null,m.a,doc);
var _42=img.parentNode;
if(_42){
_42.title=dojo.string.substitute(m.s,[m.c]);
}
this.renderExternalIcon(_42||td,doc,this._strings.SHARE_INTENT,this._strings.SHARE_INTENT_T);
trd.style.cursor="default";
trd.style.display="none";
var td=trd.lastChild;
dojo.empty(td);
this.renderShowLink(tr);
doc.element=tr;
doc.elementDetails=trd;
if(this.highlightItems&&this.highlightItems[doc.getId()]){
this.highlight(tr);
this.highlight(trd);
delete this.highlightItems[doc.getId()];
}
},_renderShareCollectionLink:function(el,_43,_44,_45,_46){
return lconn.files.scenehelper.applyShareCollectionLink(this.app,el,_43,_44,_45,_46);
},_renderItemExpand:function(_47,_48,_49,_4a){
var d=document;
var doc=_49;
var tr=doc.element;
var trd=doc.elementDetails;
var _4b=d.createElement("div");
var _4c=d.createElement("span");
tr.style.cursor=trd.style.cursor="";
var _4d=this.getActions(_49);
var _4e=this.scene?this.scene.collectionActions:[];
var _4f=dojo.filter(_4d,function(a){
return a.declaredClass=="lconn.files.action.UnlockFile";
})[0];
this._renderTag(_47,_48,_49,_4a,trd);
this._renderLock(_47,_48,_49,_4a,trd,d,_4f);
this._renderMoreActionList(_47,_48,_49,_4a,trd,d,_4e,_4d);
if(trd.firstChild){
dojo.addClass(trd.firstChild,"lotusFirst");
}
this.showNodes(trd,"");
this.renderHideLink(tr);
},replaceItem:function(_50,_51,_52){
var _53=this._buildItem(_52,_51);
_50.itemByPosition[_51._position]=_53;
_50.itemById[_51.getId()]=_53;
_53.element=_51.element;
_53.elementExtra=_51.elementExtra;
_53.elementDetails=_51.elementDetails;
_53.elementMenu=_51.elementMenu;
_53._isExpanded=_51._isExpanded;
_53._isRendered=_51._isRendered;
if(!_53.isFolder()){
_53._isEcmFile=_51._isEcmFile;
}
_53._position=_51._position;
_53._ratingImage=_51._ratingImage;
_53._ratingText=_51._ratingText;
_53._recommender=_51._recommender;
if(!_53.isFolder()){
_53._libraryType=_53.getLibraryType()||_51.getLibraryType();
}
this.selectionUpdateItem(_53,_51);
if(_51.getAdded){
_53.added=_51.getAdded();
}
if(_51.getAddedBy){
_53.addedBy=_51.getAddedBy();
}
var p=_53.getPermissions();
var p2=_51.getPermissions();
p.DeleteFromCollection=p.DeleteFromCollection||p2.Delete||p2.DeleteFromCollection;
return _53;
},_renderLock:function(_54,_55,_56,_57,trd,d,_58){
if(!_56.isFolder()&&_56.isLocked()){
var d=document;
var _59=d.createElement("div");
var _5a=this;
var _5b=_56.getLock();
var _5c=_59.cloneNode(true);
_5c.className="lotusMeta";
dojo.attr(_5c,"aria-live","assertive");
var img=_5c.appendChild(d.createElement("IMG"));
img.src=dojo.config.blankGif;
img.className=(_56.getPermissions().Unlock?"lconnSprite lconnSprite-iconCheckedOutMe":"lconnSprite lconnSprite-iconCheckedOut");
dojo.attr(img,{title:"",alt:"",role:"presentation"});
var _5d=_5b.getOwner().id==this.app.getAuthenticatedUserId()?this._appstrings.DOCUMENTCONTENT.LABEL_LOCKED:this._appstrings.DOCUMENTCONTENT.LABEL_LOCKED_BY;
var _5e=new lconn.share.util.DateFormat(_5b.getLockTime()).formatByAge(_5d);
var _5f=_5b.getOwner().id==this.app.getAuthenticatedUserId();
dojo.attr(img,"alt",_5f?this._appstrings.CONTENT.LOCKED_BY_YOU:this._appstrings.CONTENT.LOCKED);
lconn.share.util.html.substitute(d,_5c,_5e,{user:function(){
var a=d.createElement("a");
a.className="lotusPerson";
_5a.generateLinkToPerson(_5b.getOwner(),a);
a.appendChild(d.createTextNode(_5b.getOwner().name));
return a;
},unlock:function(){
if(_56.getPermissions().Unlock&&_58){
var opt={};
var a=d.createElement("a");
a.href="javascript:;";
dijit.setWaiRole(a,"button");
a.appendChild(d.createTextNode(_58.getName()));
a.title=_58.getTooltip();
dojo.connect(a,"onclick",function(_60){
if(_60){
dojo.stopEvent(_60);
}
_58.execute(_56,opt);
});
return a;
}
return null;
}});
trd.lastChild.insertBefore(_5c,trd.lastChild.firstChild);
}
},_renderTag:function(_61,_62,_63,_64,trd){
if(!_63.isFolder()&&this.showTags){
var d=document;
var _65=d.createElement("div");
var doc=_63;
var _66=this.permissions.canTag(_63);
var _67=doc.getTags();
if(_66||_67.length>0){
hasContent=true;
var _68=new lconn.share.widget.Tagger({labelText:this._strings.TAGS_LABEL,baseClass:"lotusTags lotusMeta",editable:_66,docId:doc.getAtomId(),net:this.net,isEcmFile:doc._isEcmFile,urlEdit:this.routes.getProxiedUrl(this.getUrlEditTags(doc),{commonProxy:true}),urlFeed:this.routes.getProxiedUrl(doc._isEcmFile?doc.getUrlEntry():doc.getUrlFeed(),{commonProxy:true}),tagStore:this.tagStore,tags:_67,generateTagLink:dojo.hitch(this,this.generateLinkToTag),renderPopup:this.renderPopup,_strings:this._appstrings.TAGGER},trd.lastChild.insertBefore(_65.cloneNode(true),trd.lastChild.firstChild));
dojo.connect(_68,"onTagChange",dojo.hitch(this,lconn.share.widget.Tagger.updateFile,doc));
}
}
},_renderMoreActionList:function(_69,_6a,_6b,_6c,trd,d,_6d,_6e){
var d=document;
var td=trd.lastChild;
var _6f=d.createElement("div");
_6f.className="entry-summary";
lconn.share.util.html.createTextNode(d,_6f,_6b.getDescription());
var _70=!!_6f.firstChild;
if(_70){
td.appendChild(_6f);
}
if(!_6b.isFolder()){
this.renderActionList(td,_69,_6a,_6b,_6e);
}else{
this.renderActionList(td,_69,_6a,_6b,_6d);
}
},applyDownloadLink:function(app,doc,a,d,opt){
lconn.files.scenehelper.applyDownloadLink(app,doc,a,d,opt);
},applyFileDescriptions:function(app,doc,_71,d,div,_72){
lconn.files.scenehelper.applyFileDescriptions(app,doc,_71,d,div,_72);
},generateLockIcon:function(d,el,doc,_73,opt){
var img=lconn.files.scenehelper.generateLockIcon(d,el,doc,_73,opt);
img.style.marginLeft="5px";
return img;
},buildXsltRecommendation:function(doc,a){
return new lconn.files.widget.RecommendInfo({_rendered:true,imgNode:a.firstChild,labelNode:a.lastChild},a);
},buildRecommendation:function(doc,a){
return new lconn.files.widget.RecommendInfo({nls:this._appstrings.RECOMMEND,countOnly:true,timesRated:doc.getRatingCount(),large:true},top);
}});
}


;if(!dojo._hasResource["lconn.share.widget.FileRendererMenu"]){
dojo._hasResource["lconn.share.widget.FileRendererMenu"]=true;
dojo.provide("lconn.share.widget.FileRendererMenu");












dojo.declare("lconn.share.widget.FileRendererMenu",[lconn.share.widget.FileRendererCore],{actionOpts:{},replaceItem:function(){
var _1=this.inherited(arguments);
_1._menu=null;
return _1;
},toggleByElementSummary:function(_2,e){
if(!e||e.button>(dojo.isIE?1:0)){
return;
}
var t=e.target;
var _3={td:1,th:1};
if(t&&t.nodeName){
if(dojo.indexOf(["h4","td","th"],t.nodeName.toLowerCase())!=-1){
while(!_3[t.nodeName.toLowerCase()]){
t=t.parentNode;
}
if(t.style.cursor=="pointer"){
var tr=t.parentNode;
var i=dojo.indexOf(tr.parentNode.childNodes,tr);
this.mousedownMenu(_2,i,e);
if(_2.xsltAct){
_2.xsltAct("showMenu",i,e);
}else{
this.showMenu(_2,i,e);
}
}
}
}
},mousedownMenu:function(_4,_5,e){
if(!_4||!_4.data||!_4.data.itemByPosition){
return;
}
var _6=_4.data.itemByPosition[_5];
if(_6&&_6._menu){
_6._menu.wasShowing=_6._menu.isShowingNow;
}
},showMenu:function(_7,_8,e){
if(e){
dojo.stopEvent(e);
}
var _9=_7.data.itemByPosition[_8];
if(_9._menuLoading){
return;
}
dijit.focus(_9.elementMenu);
if(!_9._menu||_9._menu.error){
_9._menuLoading=true;
var f=dojo.hitch(this,this.completeMenuLoad,_7,_7.data,_9,_8);
this.net.getXml({url:_9._isEcmFile?this.routes.getProxiedUrl(this.getUrlExpand(_9),{commonProxy:true}):this.getUrlExpand(_9),handle:f,timeout:_7.timeoutRetrieve*1000,auth:{preventReload:true,onLogin:dojo.hitch(this,this.showMenu,_7,_8,null)}});
return;
}
lconn.core.MenuUtility.openAround(_9._menu,_9.elementMenu,{orient:(dojo._isBodyLtr()?{"BR":"TR","TR":"BR"}:{"BL":"TL","TL":"BL"})});
},completeMenuLoad:function(_a,_b,_c,_d,_e,_f){
var d=document;
_c._menuLoading=false;
var _10=new dijit.Menu();
dojo.addClass(_10.domNode,"lotusActionMenu");
dojo.addClass(_10.domNode,"lotusPlain");
if(_e instanceof Error){
_10.error=true;
if(_e.code=="ItemNotFound"||_e.code=="AccessDenied"){
_10.addChild(new dijit.MenuItem({label:_a._strings.EMPTY_MENU}));
}else{
_10.addChild(new dijit.MenuItem({label:_a._strings.ERROR_MENU}));
}
}else{
_10.error=false;
_c=this.replaceItem(_b,_c,_e.documentElement);
var opt=this.actionOpts;
var _11=this.getActions(_c);
var _12=dojo.filter(_11,function(_13){
return _13.isValid(_c,opt);
});
lconn.share.scenes.actions.replaceViewWithPreview(_11,_12);
_12=lconn.share.util.ActionUtil.buildActions(_12);
for(var i=0;i<_12.length;i++){
var _14=_12[i];
var _15={};
dojo.mixin(_15,opt,{noLink:true});
var _16=_14.isDisabled==false||(typeof _14.isDisabled=="function"?_14.isDisabled(_c,_15):false);
if(_14.declaredClass=="lconn.files.action.PreviewFile"){
var app={};
var _17={};
dojo.mixin(_c,{feedItems:_b});
dojo.mixin(_15,{app:this.app});
}
if(_14.hasChildren){
lconn.share.util.ActionUtil.renderSubMenu(_10,_14,_c,_15);
}else{
var _18=new dijit.MenuItem({disabled:_16,label:_14.getName(_c,_15),title:_14.getTooltip(_c,_15),onClick:dojo.hitch(_14,_14.execute,_c,_15)});
if(_14.addExtra){
_14.addExtra(_c,_18.containerNode,_15);
}
_10.addChild(_18);
}
}
if(_12.length==0){
_10.addChild(new dijit.MenuItem({iconClass:"lotusHidden",label:_a._strings.EMPTY_MENU}));
}
}
_c._menu=_10;
dojo.connect(_10,"onOpen",_c.elementMenu,function(){
dojo.addClass(this,"hover");
});
dojo.connect(_10,"_onBlur",_c.elementMenu,function(){
dojo.removeClass(this,"hover");
});
var _19=_c.element.firstChild.appendChild(d.createElement("span"));
_19.style.display="none";
_19.setAttribute("widgetid",_10.id);
lconn.core.MenuUtility.openAround(_10,_c.elementMenu,{orient:(dojo._isBodyLtr()?{"BR":"TR","TR":"BR"}:{"BL":"TL","TL":"BL"})});
}});
}


;if(!dojo._hasResource["lconn.share.widget.FileRendererCustom"]){
dojo._hasResource["lconn.share.widget.FileRendererCustom"]=true;
dojo.provide("lconn.share.widget.FileRendererCustom");
















dojo.declare("lconn.share.widget.FileRendererCustom",[lconn.share.widget.FileRendererMenu,lconn.share.widget.StreamRendererMultiSelection],{showColumns:null,supportedColumns:[],preventDownload:false,DEFAULT_COLUMNS:{modified:1,downloads:1,size:1},COLUMN_ALIGN:{number:"lotusAlignRight",size:"lotusAlignRight",privacy:"lotusCenter",favorites:"lotusAlignRight",lock:"lotusAlignRight",bool:"lotusAlignRight"},COLUMN_FRACTION:{number:1,size:1,person:3,string:3,date:2},COLUMN_TYPES:{number:function(s,_1,r,d,el){
el.appendChild(d.createTextNode(dojo.number.format(s||0)));
},size:function(s,_2,r,d,el){
el.appendChild(d.createTextNode(lconn.share.util.text.formatSize(s||0)));
},string:function(s,_3,r,d,el){
if(!s){
return;
}
el.appendChild(d.createTextNode(s));
},person:function(_4,_5,r,d,el){
if(!_4){
return;
}
var a=d.createElement("a");
a.className="lotusPerson";
a.appendChild(d.createTextNode(_4.name));
r.generateLinkToPerson(_4,a);
el.appendChild(a);
},date:function(_6,_7,r,d,el){
if(!_6){
return;
}
el.appendChild(new lconn.share.util.DateFormat(_6).formatByAgeToHtml(r._appstrings.DATE.COMPACT,d));
},fileIcon:function(x,_8,r,d,el,_9){
dojo.addClass(el,"lotusNowrap");
var _a=!_9.getConfiguration().disableDownload;
var _b=_a?lconn.core.globalization.bidiUtil.substituteWithSTT(r._appstrings.DOCUMENTCONTENT.DOWNLOAD_TOOLTIP,[_9.getTitle(),lconn.share.util.text.formatSize(_9.getSize())]):null;
if(_9.isSyncable()){
if(_a){
_b=lconn.core.globalization.bidiUtil.substituteWithSTT(r._appstrings.DOCUMENTCONTENT.DOWNLOAD_WITH_FILE_SYNC_TOOLTIP,[_9.getTitle(),lconn.share.util.text.formatSize(_9.getSize())]);
}else{
_b=r._appstrings.DOCUMENTCONTENT.DOWNLOAD_DISABLED_WITH_FILE_SYNC_TOOLTIP;
}
}
var a=d.createElement("a");
dojo.addClass(a,"lconnIconContainer");
if(_a){
dojo.addClass(a,"lconnDownloadable");
}
var _c=d.createElement("img");
if(_a){
_c.title=_c.alt=_b;
}else{
_c.atl="";
_c.title="";
}
r.generateFileTypeImage(_c,lconn.share.util.text.getExtension(_9.getName()),16,_9);
a.appendChild(_c);
if(_a){
a.title=_b;
var _d=d.createElement("span");
_d.className="lotusAltText";
_d.appendChild(d.createTextNode(_9.getExtension()||r._appstrings.CONTENT.DOWNLOAD_ALT));
a.appendChild(_d);
}else{
if(_9.isSyncable()){
a.title=_b;
}
}
if(r.applyDownloadLink){
r.applyDownloadLink(r.app,_9,a,d,{isIcon:true});
}
if(_9.isSyncable()&&_9.getLibraryType()=="personalFiles"){
var _e=d.createElement("img");
_e.className="iconsMessages16 iconsMessages16-myFileSync16";
_e.src=dojo.config.blankGif;
dojo.addClass(_e,"lconnFileSyncOverlay");
_e.alt="";
a.appendChild(_e);
var _d=d.createElement("span");
_d.appendChild(d.createTextNode(r.app.nls.FILE_SYNC_ICON.ALT));
_d.className="lotusAltText";
a.appendChild(_d);
}
el.appendChild(a);
if(_a){
if(r.renderDownloadWarning){
r.renderDownloadWarning(_9.getLabel(),d,el,a);
}
}
},fileName:function(x,_f,r,d,el,doc){
dojo.addClass(el,"lotusRowHeader");
var h4=d.createElement("H4");
h4.className="lotusBreakWord lotusLeft";
var _10=d.createElement("a");
var _11=lconn.share.util.html.formatFilename(doc.getName());
lconn.share.util.html.breakString(_11,d,_10,10);
if(!dojo._isBodyLtr()){
_10.innerHTML+="&rlm;";
}
_10.title=_11;
_10.className="entry-title";
_10.rel="bookmark";
r.generateLinkToFile(doc,_10);
urlFile=_10.href;
h4.appendChild(_10);
r.decorateFileName(doc,h4,_10);
el.appendChild(h4);
},select:function(x,_12,r,d,el,doc){
dojo.addClass(el,"lotusNowrap");
return lconn.share.widget.StreamRendererMultiSelection.renderSelection.apply(this,arguments);
},contextMenu:function(x,_13,r,d,el,doc,_14){
var _15=doc.elementMenu=d.createElement("a");
_15.title=r._strings.CONTEXT_TITLE;
var img=d.createElement("img");
img.alt=r._strings.CONTEXT_ALT;
img.className="lconnSprite lconnSprite-iconContext";
img.src=dojo.config.blankGif;
_15.appendChild(img);
var _16=d.createElement("span");
_16.className="lotusAltText";
_16.appendChild(d.createTextNode("\u25bc"));
_15.appendChild(_16);
_15.href="javascript:;";
dojo.connect(_15,"onmousedown",dojo.hitch(r,"mousedownMenu",_13,_14));
dojo.connect(_15,"onclick",dojo.hitch(r,"showMenu",_13,_14));
dijit.setWaiRole(_15,"button");
dijit.setWaiState(_15,"haspopup",true);
el.appendChild(_15);
},favorites:function(x,_17,r,d,el,doc){
if(doc.getLibraryType()!="communityFiles"&&doc.getLibraryType()!="communityECMFiles"){
var t=r.createFavoriteToggle(doc.getId());
el.appendChild(t);
}
},bool:function(x,_18,r,d,el){
var nls=r._appstrings.CONTENT;
var msg=x?nls.BOOLEAN_YES:nls.BOOLEAN_NO;
el.appendChild(d.createTextNode(msg));
},lock:function(x,_19,r,d,el,doc){
r.lock(d,el,doc,r.app.getAuthenticatedUserId(),{nls:r._appstrings.CONTENT});
},privacy:function(x,_1a,r,d,el,doc){
var m=r.getShareMessage(doc,r._strings);
var img=d.createElement("img");
img.src=dojo.config.blankGif;
img.className=m.i;
img.alt="";
img.style.marginTop="1px";
r.renderShareLink(el,img,null,m.a,doc);
var _1b=img.parentNode;
if(_1b){
_1b.title=dojo.string.substitute(m.s,[m.c]);
}
if(dojo.getObject("lconn.share.config.features.sharingIntent")){
var _1c=_1b||el;
dojo.addClass(_1c,"lotusNowrap");
var img=d.createElement("img");
img.src=dojo.config.blankGif;
img.className="lconnIconListSharedExternal";
img.title=img.alt="";
img.style.marginTop="1px";
img.style[dojo._isBodyLtr()?"marginLeft":"marginRight"]="3px";
_1c.appendChild(img);
if(r.app&&r.app.isCommunityScene&&r.app.isExternalCommunity){
img.style.visibility="hidden";
}else{
img.style.visibility=doc.isExternal()?"visible":"hidden";
}
img.title=img.alt=r._strings.SHARE_INTENT;
if(doc.isExternal()){
var alt=d.createElement("span");
alt.className="lotusAltText";
alt.appendChild(d.createTextNode(", "+r._strings.SHARE_INTENT_T));
_1c.appendChild(alt);
}
}
}},ROW_TYPES:{tags:function(_1d,_1e,r,d,el,_1f){
var _20=_1f.getPermissions().Edit;
var _1d=_1d;
if(_20||_1d.length>0){
var _21=new lconn.share.widget.Tagger({labelText:r._strings.TAGS_LABEL,baseClass:"lotusTags lotusMeta",editable:_20,docId:_1f.getAtomId(),net:r.net,urlEdit:r.getUrlEditTags(_1f),urlFeed:_1f.getUrlFeed(),tagStore:r.tagStore,tags:_1d,generateTagLink:dojo.hitch(r,r.generateLinkToTag),renderPopup:r.renderPopup,_strings:r._appstrings.TAGGER},el.appendChild(d.createElement("div")));
dojo.connect(_21,"onTagChange",dojo.hitch(this,lconn.share.widget.Tagger.updateFile,_1f));
}
},description:function(s,_22,r,d,el){
if(!!s){
var div=d.createElement("div");
div.className="lotusBreakWord entry-summary";
lconn.share.util.html.createTextNode(d,div,s);
el.appendChild(div);
}
}},initData:function(_23){
var _24=_23._init;
var ret=this.inherited(arguments);
if(!_24){
this.initColumns(_23);
}
return ret;
},initColumns:function(_25){
var _26=[];
var _27=[];
var _28=0;
var _29=this.supportedColumns;
var _2a=this.DEFAULT_COLUMNS;
var _2b=this.showColumns||_2a;
var _2c={};
var _2d;
var _2e=function(){
};
var _2f=true;
for(var i=0,l=_29.length;i<l;i++){
var _30=_29[i];
var id=_30.id;
if(_2b[id]||_30.vis){
if(id=="favorites"&&!this.createFavoriteToggle){
continue;
}
var _31=_30.render||this.COLUMN_TYPES[_30.type];
var _32=_30.rowRender||this.ROW_TYPES[_30.type];
if(_32){
_27.push(_30);
}else{
var w=_30.wf;
var _33=this.COLUMN_ALIGN[_30.type]||"";
var c={className:_33,c:_30,r:_31,acc:_30.accessor,header:_30.header};
if(w==-1){
w=0;
_2d=c;
}
if(!(w>=0)){
w=this.COLUMN_FRACTION[_30.type];
}
if(!(w>=0)){
w=1;
}
_28+=w;
c.wf=w;
_26.push(c);
}
_2c[id]=1;
if(!_2a[id]){
_2f=false;
}
}
}
if(_2f){
for(var id in _2a){
if(!_2c[id]){
_2f=false;
break;
}
}
}
if(_2d){
var _34=(_28<3)?12:(_28>12?6:(14-2/3*_28));
_2d.wf=_34;
_28+=_34;
}
_26.widthTotal=_28;
_25.columns=_26;
_25.details=_27;
_25.hasDefaultColumns=_2f;
},_render:function(_35,el,_36,opt){
var _37=this._getItems(_36.xml);
var _38=(_36.paging)?Math.min(_36.paging.size,_37.length):_37.length;
var d=document;
var _39=this.initData(_36);
this.selection=[];
for(var i=0;_39!=null&&i<_39.length;i++){
if(_39[i]._isSelected){
this.selection.push(_39[i]);
}
}
if(_38<1){
this.renderEmpty(_35,el,_36);
return;
}
this.initColumns(_36);
if(_36.hasDefaultColumns&&this.useXslt&&_37[0].nodeName){
this.xsltSummary=this.xsltSummary||dojo.getObject("lconn.share.config.xslt.list.fileSummary");
if(this.xsltSummary&&dojo.getObject("xml.ownerDocument.documentElement",false,_36)){
this.renderXslt(_35,el,_36);
return;
}
}
var _3a=el.style;
_3a.width="100%";
_3a.overflowX="auto";
_3a.overflowY="hidden";
var _3b=d.createDocumentFragment();
var _3c=dojo._toArray(arguments);
_3c[1]=_3b;
var _3d=d.createElement("TABLE");
dijit.setWaiRole(_3d,"presentation");
_3d.className="lotusTable";
_3d.cellSpacing=_3d.cellPadding=0;
dojo.connect(_3d,"onmousedown",dojo.hitch(this,"toggleByElement",_35,_36.details.length>0));
var _3e=this.renderHeader(_35,el,_36,d);
if(_3e){
_3d.appendChild(_3e);
}
for(var i=0;i<_38;i++){
this.renderItem(_35,_3e,_36,_39[i],i,i==0,(i==_38-1));
}
_3d.appendChild(_3e);
this.attachDragSource(_3d,_35,_36);
_3b.appendChild(_3d);
this.updatePaging(_35,el,_36,opt);
var _3f=dojo._toArray(el.childNodes);
for(var _40,i=0;_40=_3f[i];i++){
_40.style.display="none";
}
el.replaceChild(_3b,_3f[0]);
for(var _40,i=0;_40=_3f[i];i++){
lconn.share.util.html.destroyWidgets(_40);
if(_40.parentNode){
_40.parentNode.removeChild(_40);
}
}
},renderHeader:function(_41,el,_42,d){
var _43=_42.columns;
var _44=_43.widthTotal;
var a_t=d.createElement("a");
var _45=d.createElement("td");
var _46=d.createElement("span");
var _47=this.sortId;
var _48=this.sortReversed;
var _49=d.createElement("tbody");
var tr=_49.appendChild(d.createElement("TR"));
tr.className="lotusSort lotusFirst";
for(var i=0,_4a;_4a=_43[i];i++){
var c=_4a.c;
var th=_45.cloneNode(true);
th.className=_4a.className;
if(c){
if(c.isSortable&&this.isSortValid(c)){
var a=th.appendChild(a_t.cloneNode(true));
var _4b=c.name;
dijit.setWaiRole(a,"button");
dijit.setWaiState(a,"pressed",c.id==_47);
if(c.id==_47){
var asc=((c.lowToHigh)?!_48:_48);
dojo.addClass(a,asc?"lotusAscending":"lotusDescending");
setTimeout(dojo.hitch(this,function(_4c){
if(_4c&&lconn.share.widget.StreamRenderer.prototype.updateFromSorting){
lconn.share.widget.StreamRenderer.prototype.updateFromSorting=false;
dijit.focus(_4c);
}
},a),20);
}else{
var asc=!c.lowToHigh;
}
var nls=_41._strings;
var _4d=asc?nls.SORTING_DESC:nls.SORTING_ASC;
if(c.tooltip){
a.title=c.tooltip;
_4d=asc?dojo.string.substitute(nls.SORTING_DESC_LONG,[c.tooltip]):dojo.string.substitute(nls.SORTING_ASC_LONG,[c.tooltip]);
}
dijit.setWaiState(a,"label",_4d);
if(_4b&&!/[\s\u3000]/.exec(_4b)){
dojo.addClass(a,"lotusNowrap");
}
this.generateSortLink(_41,c,((_47?_47!=c.id:true)||_48)?true:false,a);
a.appendChild(d.createTextNode(_4b));
dojo.connect(a,"onclick",function(){
lconn.share.widget.StreamRenderer.prototype.updateFromSorting=true;
});
if(c.id==_47){
var _4e=_46.cloneNode(true);
_4e.className="lotusAltText";
_4e.appendChild(d.createTextNode(asc?" \u25b2 ":" \u25bc "));
a.appendChild(_4e);
}
}else{
var _4f=th.appendChild(d.createElement("span"));
if(c.tooltip){
_4f.title=c.tooltip;
}
_4f.appendChild(d.createTextNode(c.name));
if(c.name&&!/[\s\u3000]/.exec(c.name)){
dojo.addClass(_4f,"lotusNowrap");
}
}
}
if(_4a.wf){
var _50=(_4a.wf/_44)*100;
th.style.width=(Math.floor(_50*10)/10)+"%";
}else{
th.style.width="1%";
}
if(c.id=="contextMenu"){
th.style.paddingRight="30px";
}
if(c.id=="select"){
this.renderSelectAll(_41,th,_42,d);
}
if(i==0){
dojo.addClass(th,"lotusFirstCell");
if(dojo._isBodyLtr()){
th.style.paddingLeft="10px";
}else{
th.style.paddingRight="10px";
}
}
tr.appendChild(th);
}
return _49;
},renderSorting:function(_51,el,_52){
},renderItem:function(_53,el,_54,doc,_55,_56,_57,_58,_59){
var d=document;
doc._isEcmFile=doc.getLibraryType()=="communityECMFiles";
var _5a;
var _5b=this.permissions;
var _5c=d.createElement("td");
var _5d=d.createElement("th");
var a_t=d.createElement("a");
var _5e=d.createElement("span");
var _5f=d.createElement("img");
var _60=d.createElement("div");
var tr=d.createElement("TR");
tr.className="hentry"+(false&&doc.isFolder()?"":" dojoDndItem");
tr.style.cursor="default";
tr.itemPosition=_55;
lconn.share.scenehelper.applyDndProperty(tr,_55,doc);
if(_56){
dojo.addClass(tr,"lotusFirst");
}
var _61=_54.columns;
for(var i=0,_62;_62=_61[i];i++){
var td=_5c.cloneNode(true);
td.className=_62.className;
if(_62.header){
dojo.addClass(td,"lotusRowHeader");
}
var acc=_62.acc;
var _63;
if(typeof acc=="function"){
_63=acc(doc);
}else{
if(typeof doc[acc]=="function"){
_63=doc[acc]();
}
}
_62.r(_63,_53,this,d,td,doc,_55);
if(doc.checkElement){
doc.checkElement.setAttribute("aria-label",this._appstrings.FILES_CHECKED_ALERT);
}
tr.appendChild(td);
}
dojo.addClass(tr.firstChild,"lotusFirstCell");
if(!dojo.hasClass(tr.lastChild,"lotusCenter")){
dojo.addClass(tr.lastChild,"lotusLastCell");
}
doc.element=tr;
var _64=_54.details;
if(_64.length>0){
var trd=d.createElement("TR");
trd.itemPosition=_55;
trd.className="lotusDetails";
var td=trd.appendChild(d.createElement("TD"));
td.className="lotusFirst";
var td=trd.appendChild(d.createElement("TD"));
dojo.attr(td,"colSpan",(this.createFavoriteToggle?4:3)+_61.length);
for(var i=0,row;row=_64[i];i++){
var acc=row.accessor;
var f=this.ROW_TYPES[row.type];
if(typeof acc=="function"){
var _63=acc(doc);
f(_63,_53,this,d,td,doc);
}else{
if(typeof doc[acc]=="function"){
var _63=doc[acc]();
f(_63,_53,this,d,td,doc);
}
}
}
trd.style.display=!!td.firstChild?"":"none";
doc.elementDetails=trd;
}
if(_58){
el.replaceChild(tr,_58);
if(trd){
el.replaceChild(trd,_59);
lconn.share.util.html.removeChildren(_59);
}
lconn.share.util.html.removeChildren(_58);
}else{
el.appendChild(tr);
if(trd){
el.appendChild(trd);
}
}
if(this.highlightItems&&this.highlightItems[doc.getId()]){
this.highlight(doc.element);
if(doc.elementDetails){
this.highlight(doc.elementDetails);
}
delete this.highlightItems[doc.getId()];
}
},initXsltData:function(_65,el){
this.initData(_65);
if(_65._initXslt){
return;
}
_65._initXslt=true;
var _66=el.firstChild.lastChild;
var _67=(_65.details.length>0)?2:1;
var _68=-1;
for(var i=0,c;c=_65.columns[i];i++){
if(c.c&&c.c.id=="contextMenu"){
_68=i;
break;
}
}
for(var i=0;i<_65.itemByPosition.length;i++){
var _69=_65.itemByPosition[i];
_69.element=_66.childNodes[(i+1)*_67];
if(_68!=-1){
_69.elementMenu=_69.element.childNodes[_68].firstChild;
}
}
},renderXslt:function(_6a,el,_6b){
try{
var p=lconn.share.widget.FileRendererCustom._summaryXslt;
if(!p){
lconn.share.util.xsl.Processor.documentImplementation=_6b.xml.ownerDocument.implementation;
p=lconn.share.widget.FileRendererCustom._summaryXslt=lconn.share.util.xsl.createProcessor(this.xsltSummary);
}
if(!_6a.xsltAct){
_6a.xsltAct=lconn.share.widget.FileRendererCustom.prototype.xsltAction;
}
var _6c=new Date().getTime();
var _6d={widgetId:_6a.id,currentUserId:this.permissions.authenticatedId||"",showFavorite:!!this.createFavoriteToggle,noBreak:dojo.isIE<8,_blankGif:dojo.config.blankGif.toString(),newline:"\n"};
if(this.xsltSummaryParams){
dojo.mixin(_6d,this.xsltSummaryParams);
}
var _6e=p.transformToHtml(_6b.xml.ownerDocument,document,_6d);
var d=document;
var _6f=new Date().getTime();
var _70=_6e.firstChild;
dojo.connect(_70,"onmousedown",dojo.hitch(this,"toggleByElement",_6a,_6b.details.length>0));
var qud=lconn.share.util.dom;
var _71=qud.DOCUMENTS_ATOM_NAMESPACE;
var _72=dojo.date.stamp.fromISOString;
var _73=86400000;
var _74=new Date();
_74.setHours(0);
_74.setMinutes(0);
_74.setSeconds(0);
_74.setMilliseconds(0);
var _75=_74.getFullYear();
_74=_74.getTime();
var _76=_74-_73;
var _77=_74-6*_73;
var _78=this._appstrings.DATE;
var _79=_78.TODAY_U;
var _7a=_78.YESTERDAY_U;
var _7b=dojo.date.locale.getNames("days","wide");
var _7c={selector:"date",formatLength:"short"};
var _7d={selector:"time",formatLength:"short"};
var _7e=lconn.share.util.date;
var _7f=_70.firstChild.childNodes;
var _80=_7f.length;
for(var i=0;i<_80;i++){
var tr=_7f[i];
var _81=tr.childNodes[3].firstChild;
var _82=_81.title;
var _83=_72(_82);
if(!_83){
continue;
}
var _84=_83.getTime();
var s;
if(_84>_74){
s=dojo.date.locale.format(_83,_7d);
}else{
if(_84>_76){
s=_7a;
}else{
if(_83.getFullYear()==_75){
s=_7e.format(_83,_78.COMPACT.MONTH,_78);
}else{
s=dojo.date.locale.format(_83,_7c);
}
}
}
_81.appendChild(d.createTextNode(s));
if(this.createFavoriteToggle){
var td=tr.childNodes[6];
var t=this.createFavoriteToggle(dojo.attr(td,"_uid"));
td.appendChild(t);
}
}
var _85=new Date().getTime();
var _86=this.renderHeader(_6a,el,_6b,d);
if(_86){
_70.insertBefore(_86,_70.firstChild);
}
var _87=new Date().getTime();
this.updatePaging(_6a,el,_6b);
var _88=new Date().getTime();
var _89=el.replaceChild(_70,el.firstChild);
var old=[_89];
while(_70.nextSibling){
old.push(el.removeChild(_70.nextSibling));
}
var end=new Date().getTime();
setTimeout(function removeOldNodes(){
dojo.forEach(old,lconn.share.util.html.removeChildren);
},0);
if(this.highlightItems){
var _8a=false;
for(var id in this.highlightItems){
if(!_8a){
this.initXsltData(_6b,el);
_8a=true;
}
var _8b=_6b.itemById[id];
if(_8b){
this.highlight(_8b.element);
}
delete this.highlightItems[id];
}
}
if(dojo.isIE&&window.stats){
var _8c=window.stats.xslt=window.stats.xslt||{xsltRender:[],xsltPostProcess:[],domHeaderUpdate:[],domPagingUpdate:[],domReplace:[],all:[]};
if(!window.stats.avg){
window.stats.avg=function(arr){
var avg=0;
for(var i=0;i<arr.length;i++){
avg+=arr[i];
}
return avg/arr.length;
};
}
_8c.xsltRender.push(_6f-_6c);
_8c.xsltPostProcess.push(_85-_6f);
_8c.domHeaderUpdate.push(_87-_85);
_8c.domPagingUpdate.push(_88-_87);
_8c.domReplace.push(end-_88);
_8c.all.push(end-_6c);
}
}
catch(e){
console.error(e);
this.renderError(_6a,el,_6b,{message:this._appstrings.ERROR_OCCURRED});
}
},toggleByElement:function(_8d,_8e,e){
if(!e||e.button>(dojo.isIE?1:0)){
return;
}
var t=e.target;
var _8f={td:1,th:1};
if(t&&t.nodeName){
if(dojo.indexOf(["h4","td","th"],t.nodeName.toLowerCase())!=-1){
while(!_8f[t.nodeName.toLowerCase()]){
t=t.parentNode;
}
var tr=t.parentNode;
if(t.style.cursor=="pointer"){
var i=dojo.indexOf(tr.parentNode.childNodes,tr)-1;
if(_8e){
i=Math.floor(i/2);
}
this.mousedownMenu(_8d,i,e);
if(_8d.xsltAct){
_8d.xsltAct("showMenu",i,e);
}else{
this.showMenu(_8d,i,e);
}
}
}
}
},_updateItem:function(_90,_91,el,_92,_93,_94){
var d=document;
var tr=_93.element;
var trd=_93.elementDetails;
_93.element=_93.elementDetails=null;
var _95=tr.parentNode;
var _96=_95.parentNode;
this.renderItem(_90,_95,_91,_92,_94,_94==0,_94==_91.itemByPosition.length-1,tr,trd);
this.attachDragSource(_96,_90,_91);
},getSorts:function(){
throw "Not implemented";
}});
}


;if(!dojo._hasResource["lconn.files.scenes.AbstractCustomRenderer"]){
dojo._hasResource["lconn.files.scenes.AbstractCustomRenderer"]=true;
dojo.provide("lconn.files.scenes.AbstractCustomRenderer");






dojo.declare("lconn.files.scenes.AbstractCustomRenderer",[lconn.share.widget.FileRendererCustom,lconn.files.widget.FileDndCore],{_render:function(_1,el,_2,_3){
this.inherited(arguments);
},applyDownloadLink:function(_4,_5,a,d,_6){
lconn.files.scenehelper.applyDownloadLink(_4,_5,a,d,_6);
},lock:function(d,el,_7,_8,_9){
lconn.files.scenehelper.generateLockIcon(d,el,_7,_8,_9);
}});
}


;if(!dojo._hasResource["com.ibm.social.layout.Action"]){
dojo._hasResource["com.ibm.social.layout.Action"]=true;
dojo.provide("com.ibm.social.layout.Action");
dojo.declare("com.ibm.social.layout.Action",null,{selectionChanged:function(_1,_2,_3){
_1.name=this.getName(_2,_3);
_1.tooltip=this.getTooltip(_2,_3);
_1.visible=!!this.isVisible(_2,_3);
_1.enabled=_1.visible&&!!this.isEnabled(_2,_3);
},getName:function(_4,_5){
return this.name||"";
},getTooltip:function(_6,_7){
return this.tooltip||"";
},getId:function(_8){
var id=this.declaredClass.toLowerCase().replace(/\./g,"_");
if(_8&&_8.length>0){
id+="_"+_8;
}
return id;
},hasEnableDisableActionString:function(){
if(this.nls!==undefined&&this.nls.ACTION_ENABLED!=undefined&&this.nls.ACTION_DISABLED!==undefined){
return true;
}
return false;
},getEnableActionString:function(){
return this.nls!==undefined?this.nls.ACTION_ENABLED:undefined;
},getDisableActionString:function(){
return this.nls!==undefined?this.nls.ACTION_DISABLED:undefined;
},isVisible:function(_9,_a){
if(this.visibleFor){
return this._isInRange(_9.length,this.visibleFor);
}
return true;
},isEnabled:function(_b,_c){
if(this.enabledFor){
return this._isInRange(_b.length,this.enabledFor);
}
return true;
},_isInRange:function(_d,_e){
return _d>=_e[0]&&(_e[1]=="*"||_d<=_e[1]);
},canHaveChildren:function(_f,_10){
return this.hasChildren;
},isLoaded:function(){
return true;
},load:function(){
if(!this.loadDeferred){
this.loadDeferred=new dojo.Deferred();
this.loadDeferred.callback(this);
}
return this.loadDeferred;
},mixin:function(_11){
if(_11){
dojo.mixin(this,_11);
}
return this;
},execute:function(_12,_13){
}});
}


;if(!dojo._hasResource["com.ibm.social.layout.DeferredAction"]){
dojo._hasResource["com.ibm.social.layout.DeferredAction"]=true;
dojo.provide("com.ibm.social.layout.DeferredAction");




(function(){
function _1(_2){
return function(){
var d=this.delegate;
if(d&&d[_2]){
return d[_2].apply(d,arguments);
}
return this.inherited(arguments);
};
};
dojo.declare("com.ibm.social.layout.DeferredAction",[com.ibm.social.layout.Action],{constructor:function(){
this._args=dojo._toArray(arguments);
},selectionChanged:_1("selectionChanged"),getName:_1("getName"),getTooltip:_1("getTooltip"),isVisible:_1("isVisible"),isEnabled:_1("isEnabled"),canHaveChildren:_1("canHaveChildren"),destroy:_1("destroy"),isLoaded:function(){
return !!this.delegate;
},load:function(){
var _3=this;
var _4=this.loadDeferred;
if(!_4){
_4=this.loadDeferred=new dojo.Deferred();
if(this.delegate){
_4.callback(this.delegate);
}else{
if(!this.actionClass){
console.error("Must provide actionClass that is an instance of com.ibm.social.layout.Action");
throw "Must provide actionClass that is an instance of com.ibm.social.layout.Action";
}
var _5=this.actionClass;
var _6=this.actionBundle;
net.jazz.ajax.xdloader.batch_load_async([_6||_5],function(){
var _7=dojo.getObject(_5);
if(_7){
try{
_3.delegate=_3.create(_7);
_4.callback(_3.delegate);
}
catch(e){
console.error("Error instantiating "+_3.actionClass);
_4.errback(e);
_3.loadDeferred=null;
}
}else{
console.error("Error loading "+_3.actionClass);
_4.errback(new Error("Error loading "+_3.actionClass));
_3.loadDeferred=null;
}
});
}
}
return _4;
},create:function(f){
var a=this._args;
if(a.length<=6){
return new f(a[0],a[1],a[2],a[3],a[4],a[5]);
}
var i,_8=[];
for(i=0;i<a.length;i++){
_8.push("a["+i+"]");
}
var _9="new f("+_8.join(",")+")";
return eval(_9);
},execute:function(_a,_b){
var _c=this;
var _d=new dojo.Deferred();
this.load().addCallback(function(_e){
try{
var _f=_e.execute(_a,_b);
_d.callback(_f);
}
catch(e){
console.error("Error executing "+_c.actionClass);
_d.errback(e);
}
}).addErrback(function(_10){
_d.errback(_10);
});
return _d;
}});
}());
}


;if(!dojo._hasResource["lconn.files.action.DownloadBulkFiles"]){
dojo._hasResource["lconn.files.action.DownloadBulkFiles"]=true;
dojo.provide("lconn.files.action.DownloadBulkFiles");






dojo.declare("lconn.files.action.DownloadBulkFiles",com.ibm.social.layout.DeferredAction,{visibleFor:[0,"*"],enabledFor:[1,"*"],actionClass:"lconn.files.action.impl.DownloadBulkFiles",constructor:function(_1,_2,_3){
this.app=_1;
this.routes=_1.routes;
this.nls=_1.nls.ZIP_DOWNLOAD;
},getName:function(_4,_5){
return this.nls.ACTION;
},getTooltip:function(_6,_7){
return _6.length==1?this.nls.ACTION_TOOLTIP_1:this.nls.ACTION_TOOLTIP_X;
},isVisible:function(){
return dojo.getObject("lconn.files.config.features.zipDownload")&&lconn.share.util.configUtil.isFileZipDownloadEnabled(this.app.authenticatedUser)&&this.inherited(arguments);
},isEnabled:function(_8,_9){
if(!dojo.getObject("lconn.files.config.features.zipDownload")){
return false;
}
if(!lconn.share.util.configUtil.isFolderZipDownloadEnabled(this.app.authenticatedUser)){
var _a=arguments[0];
if(null!=_a){
for(var i=0;i<_a.length;i++){
if(_a[i].declaredClass==="lconn.share.bean.Collection"){
return false;
}
}
}
}
return this.inherited(arguments);
},execute:function(_b,_c){
var _d=new dojo.Deferred();
_d.callback(true);
if((!_b||_b.length==0)&&!_c.urlDownload){
return _d;
}
if(_b.length==1){
lconn.files.scenehelper.downloadFile(_b[0],{app:this.app,nls:this.app.nls});
return _d;
}
return this.inherited(arguments);
}});
}


;if(!dojo._hasResource["lconn.files.FilesAbstractSceneRender"]){
dojo._hasResource["lconn.files.FilesAbstractSceneRender"]=true;
dojo.provide("lconn.files.FilesAbstractSceneRender");












dojo.declare("lconn.files.FilesAbstractSceneRender",[lconn.share.scenes.AbstractSceneRender],{renderBodyFooter:function(d,el){
if(lconn.share.util.configUtil.isNestedFolderEnabled(this.app.authenticatedUser)){
lconn.share.scenehelper.moveLotusFooter(el);
}
this.inherited(arguments);
},renderNavigationGlobalButtons:function(d,_1){
if(lconn.share.util.configUtil.isNestedFolderEnabled(this.app.authenticatedUser)){
lconn.share.scenehelper.applyGlobalActions(d,_1,this.app);
}
},_makeNavigationScrollable:function(_2){
if(lconn.share.util.configUtil.isNestedFolderEnabled(this.app.authenticatedUser)){
_2.scrollable=new lconn.share.widget.Scrollable(_2);
}
},_makeSceneBodyScrollable:function(_3){
if(lconn.share.util.configUtil.isNestedFolderEnabled(this.app.authenticatedUser)){
_3.scrollable=new lconn.share.widget.Scrollable(_3);
}
},_populateHeader:function(d,_4){
this.inherited(arguments);
if(lconn.share.util.configUtil.isNestedFolderEnabled(this.app.authenticatedUser)&&!lconn.share.util.configUtil.isTitlebarEnabledForNestedFolder(this.app.authenticatedUser)&&"lconn.files.comm.scenes.ref.List"!=this.sceneInfo.id&&"lconn.files.comm.scenes.ref.FolderList"!=this.sceneInfo.id&&"lconn.files.comm.scenes.ref.DeletedFiles"!=this.sceneInfo.id){
var _5=d.createElement("div");
dojo.addClass(_5,"lotusTitleBar");
lconn.share.scenehelper.applySearchBox(d,_5,this.app,{defaultSearchScope:this.defaultSearchScope});
_4.appendChild(_5);
}
},_getOptionsToReuseHomeTemplate:function(){
var _6=this.inherited(arguments);
if(_6){
_6.hidePlaceBar=lconn.share.util.configUtil.isNestedFolderEnabled(this.app.authenticatedUser);
_6.titleBar=!lconn.share.util.configUtil.isNestedFolderEnabled(this.app.authenticatedUser)||lconn.share.util.configUtil.isTitlebarEnabledForNestedFolder(this.app.authenticatedUser);
}
return _6;
}});
}


;if(!dojo._hasResource["lconn.files.scenes.AbstractFileList"]){
dojo._hasResource["lconn.files.scenes.AbstractFileList"]=true;
dojo.provide("lconn.files.scenes.AbstractFileList");






dojo.declare("lconn.files.scenes.AbstractFileList",[lconn.files.FilesAbstractSceneRender],{getViews:function(){
var _1=this.app;
var _2=[];
_2.push({id:"grid",name:_1.nls.VIEWS.GRID,tooltip:_1.nls.VIEWS.GRID_TOOLTIP,img:"Tile",isDefault:lconn.share.util.configUtil.isPreviewEnabled(_1.authenticatedUser)?true:false,isValid:function(_3,_4){
return lconn.share.util.configUtil.isPreviewEnabled(_3.authenticatedUser);
}});
_2.push({id:"details",name:_1.nls.VIEWS.DETAILS,tooltip:_1.nls.VIEWS.DETAILS_TOOLTIP,isDefault:lconn.share.util.configUtil.isPreviewEnabled(_1.authenticatedUser)?false:true,img:"Details"});
if(!(_1&&_1.features&&_1.features.customColumns==false)&&!this.disableSummaryView&&lconn.share.util.configUtil.isCustomViewEnabled(_1.authenticatedUser)){
_2.push({id:"summary",name:_1.nls.VIEWS.SUMMARY,tooltip:_1.nls.VIEWS.SUMMARY_TOOLTIP,img:"Summary",customize:true,cName:_1.nls.VIEWS.CUSTOMIZE_SUMMARY,cTooltip:_1.nls.VIEWS.CUSTOMIZE_SUMMARY_TOOLTIP});
}
return _2;
},customizeViews:function(e){
if(e){
dojo.stopEvent(e);
}
var _5=this.activeView;
lconn.share.requireAsync("lconn.files.widget.CustomizeTableForm").addCallback(this,function(){
var _6=dijit.byId("listcustomizer");
if(!_6){
var _7=document.createElement("form");
_7.style.display="none";
dojo.place(_7,this.list.id,"before");
_6=new lconn.files.widget.CustomizeTableForm({id:"listcustomizer",baseClass:"lotusForm2 lotusChunk10",view:_5,columns:this.app.getColumns().file,_strings:this.app.nls.COLUMN.CUSTOMIZE.FILE,app:this.app},_7);
}else{
_6.view=_5;
}
_6.show(true);
});
},onDownloadScene:function(e){
if(e){
dojo.stopEvent(e);
}
var _8=this.ref(new lconn.files.action.DownloadBulkFiles(this.app,this));
var _9=_8.execute([],{urlDownload:this.getZipDownloadUrl()});
},renderDownloadScene:function(d,el,_a){
if(this.getZipDownloadUrl&&dojo.getObject("lconn.files.config.features.zipDownload")&&lconn.share.util.configUtil.isFileZipDownloadEnabled(this.app.authenticatedUser)){
var _b=this.getZipDownloadUrl();
if(_b){
if(el.firstChild){
lconn.files.scenehelper.applyLotusDivider(el);
if(dojo.isIE||dojo.isSafari){
el.appendChild(d.createElement("wbr"));
}else{
el.appendChild(d.createTextNode("\u200b"));
}
}
var _c=_a.L;
var _d=_a.T||_a.L;
var d=document;
var _e=el.appendChild(d.createElement("span"));
_e.className="lotusNowrap";
var _f=_e.appendChild(d.createElement("img"));
_f.className="lconnSprite lconnSprite-iconCompressed16";
_f.src=dojo.config.blankGif;
_f.alt="";
dijit.setWaiRole(_f,"presentation");
var a=_e.appendChild(d.createElement("a"));
a.className="lconnDownloadable lotusAction";
dijit.setWaiRole(a,"button");
a.href=_b;
a.title=_d;
a.appendChild(d.createTextNode(_c));
this.connect(a,"onclick",this,"onDownloadScene");
}
}
}});
}


;dojo.mixin(dojo.provide("lconn.share.previewConfig"),{"galleryViewHeight":73,"galleryViewWidth":73,"gridViewHeight":132,"gridViewTextHeight":30,"gridViewWidth":200,"previewViewHeight":450,"previewViewWidth":450,"validPhotoExts":"jpg,jpeg,gif,png","validVideoExts":"mp4,mov,flv"});


;if(!dojo._hasResource["lconn.share.widget.PreviewDialog"]){
dojo._hasResource["lconn.share.widget.PreviewDialog"]=true;
dojo.provide("lconn.share.widget.PreviewDialog");




dojo.declare("lconn.share.widget.PreviewDialog",[dijit.Dialog],{initialFocusNode:null,hPad:20,viewTop:null,draggable:false,setContent:function(_1){
this.inherited(arguments);
if(dojo.isObject(_1)&&_1.nodeType){
this._contentSetter.parseResults=dojo.query("[widgetId]",_1).map(dijit.byNode);
}
},isOpen:function(){
return this.open;
},show:function(){
var _2=this.autofocus;
this.autofocus=false;
this.inherited(arguments);
this.autofocus=_2;
if(this.autofocus){
this._getFocusItems(this.domNode);
setTimeout(dojo.hitch(this,"focus"),50);
}
},onOpen:function(_3){
this.orient(this.domNode,_3.aroundCorner,_3.corner);
this._loadCheck();
if(this.autofocus){
this._getFocusItems(this.containerNode);
this.focus();
}
if(this._moveable){
var _4=this._moveable.onDragDetected;
this._moveable.onDragDetected=function(e){
var _5=e.target;
while(_5&&_5.nodeName!="A"){
_5=_5.parentNode;
}
if(_5&&_5.nodeName=="A"&&dojo.hasClass(_5,"lotusDialogClose")){
return;
}
if(_4){
return _4.apply(this,arguments);
}
};
var _6=this._moveable.onMoving;
this._moveable.onMoving=function(_7,_8){
_8.l=Math.max(_8.l,_7.marginBox.l+5);
_8.t=Math.max(_8.t,_7.marginBox.t+5);
if(_6){
return _6.apply(this,arguments);
}
};
}
},focus:function(){
dijit.focus((dojo.isFunction(this.initialFocusNode)?this.initialFocusNode():this.initialFocusNode)||this._firstFocusItem);
},_setup:function(){
this.inherited(arguments);
if(this.zIndex>0){
this._underlay.domNode.style.zIndex=this.zIndex;
this.domNode.style.zIndex=this.zIndex+1;
}
},_size:function(){
},_position:function(){
var _9=dijit.getViewport();
var mb=dojo.marginBox(this.domNode);
if(this._compact){
this._compact(_9,mb);
mb=dojo.marginBox(this.domNode);
}
if(!dojo.hasClass(dojo.body(),"dojoMove")){
var p=this._relativePosition;
var _a=Math.floor(_9.l+(p?p.l:(_9.w-mb.w)/2));
if(isNaN(p.t)){
if(!this.viewTop){
this.viewTop=_9.t;
var _b=Math.floor(this.viewTop);
}else{
var _b=Math.floor(this.viewTop);
}
}else{
var _b=Math.floor(_9.t+(p?p.t:(_9.h-mb.h)/2));
}
if(!p){
_a=Math.max(_a,0);
_b=Math.max(_b,0);
}
dojo.style(this.domNode,{left:_a+"px",top:_b+"px"});
}
},_compact:function(_c,md){
var el=dojo.query("div.lotusDialogContent",this.domNode)[0];
if(el){
var _d;
el.style.width="";
if(!dojo.hasClass(el,"_qkrDialogCompact")){
_d=dojo.doc.createElement("div");
el.parentNode.insertBefore(_d,el);
el.parentNode.removeChild(el);
_d.appendChild(el);
dojo.addClass(el,"_qkrDialogCompact");
}else{
_d=el.parentNode;
}
var ms=dojo.marginBox(_d);
var mc=dojo.marginBox(el);
if(ms.h==0||md.h==0){
return;
}
var _e=md.h-ms.h;
var _f=false;
if((_e+mc.h)>(_c.h-this.hPad)){
_f=true;
}
var _10=dojo.query("div.lotusDialogBorder",this.domNode)[0];
if(_10&&el.firstChild){
var _11=dojo.marginBox(_10).w;
var _12=this.savedBorderPadding;
if(!_12){
this.savedBorderPadding=_12=Math.min(20,_11-dojo.marginBox(_d).w);
}
var _13=this.savedContentPadding;
if(!_13){
this.savedContentPadding=_13=_11-_12-dojo.contentBox(el).w;
}
var _14=0;
var _15=0;
if(this.dontCheckChildWidth){
_15=dojo.contentBox(el).w;
}else{
while(el.childNodes[_14]){
var _16=el.childNodes[_14++];
var _17=dojo.marginBox(_16).w;
if(_16.tagName.toLowerCase()!="table"){
var _18=dojo.query("table",_16);
for(var i=0;i<_18.length;i++){
_17=Math.max(_17,dojo.marginBox(_18[i]).w);
}
}
_15=Math.max(_15,_17);
}
}
if(_11==0||_15==0){
return;
}
var _19=_15+_13+_12;
if(_f&&dojo.isIE&&dojo.isIE<7&&!this.dontCheckChildWidth){
_12+=16;
}
var _1a=dojo.hasClass(_d,"qkrDialogScrolledY");
var _1b=(_1a&&!_f)||(!_1a&&_f);
if(_f){
var _1c=Math.max(_c.h-this.hPad,185);
dojo.addClass(_d,"qkrDialogScrolledY");
dojo.marginBox(_d,{h:_1c-_e});
dojo.marginBox(this.domNode,{h:_1c});
}else{
dojo.removeClass(_d,"qkrDialogScrolledY");
_d.style.height="";
this.domNode.style.height="";
}
if(_11<_19||(dojo.isIE&&dojo.isIE<7&&_1b)){
dojo.marginBox(_d,{w:_19-_12});
dojo.marginBox(_10,{w:_19});
dojo.marginBox(this.domNode,{w:_19});
}
}
}
},_onKey:function(evt){
this.inherited(arguments);
this.enforceTextDir(evt);
if(evt.keyCode===dojo.keys.BACKSPACE){
var _1d=evt.target;
var tag=_1d.tagName.toLowerCase();
if(tag=="input"){
var _1e=_1d.type.toLowerCase();
if(_1e!="text"&&_1e!="file"){
dojo.stopEvent(evt);
}
}else{
if(tag!="textarea"){
dojo.stopEvent(evt);
}
}
}
},enforceTextDir:function(evt){
var _1f=evt.target;
if(_1f.className.indexOf("bidiAware")){
lconn.core.globalization.bidiUtil.inputRTLProcessing(_1f);
}
},destroy:function(){
this._firstFocusItem=null;
this._lastFocusItem=null;
this.initialFocusNode=null;
this.inherited(arguments);
if(this._contentSetter){
this._contentSetter=null;
}
if(this._fadeIn){
this._fadeIn=null;
}
if(this._fadeOut){
this._fadeOut=null;
}
}});
}

dojo.provide("lconn.share.nls.PreviewString")._built=true;
dojo.provide("lconn.share.nls.PreviewString.en_us");
lconn.share.nls.PreviewString.en_us={"DIALOG_TITLE":"Preview","FILEVIEW_NO_FOUND":"A preview is not available for this file.","DETAILS":"View file details.","NODESCRIPFILE":"No description available","NEXT_TITLE":"View the next file in the gallery.","PREV_TITLE":"View the previous file in the gallery.","NO_IMG_PREV":"Preview currently not available.","PLAY_VIDEO_TOOLTIP":"Play ${0}","DETAILS_A11Y":"Activating this link will close the gallery preview dialog and direct you to the gallery details page for this file.","REQUIRED_A11Y":"A * indicates a required field.","A11Y":"${description}.  Your video maight take a few minutes to download.","CANCEL":"Cancel","DETAILS_TITLE":"Open the file details page."};

;if(!dojo._hasResource["lconn.share.action.DialogAction"]){
dojo._hasResource["lconn.share.action.DialogAction"]=true;
dojo.provide("lconn.share.action.DialogAction");




dojo.requireLocalization("lconn.share","PreviewString");
dojo.declare("lconn.share.action.DialogAction",[lconn.share.action.Action],{constructor:function(_1,_2){
this.nls=dojo.i18n.getLocalization("lconn.share","PreviewString");
this.listeners=[];
this.isLtr=dojo._isBodyLtr();
if(!_2){
this.app={nls:dojo.i18n.getLocalization("lconn.files","community")};
}else{
this.app=_2;
}
},preExecute:function(_3,_4,e,_5){
_5(_3,_4,e);
},execute:function(_6,_7,e){
if(e){
dojo.stopEvent(e);
}
if(this.scene){
this.scene.clearMessages();
}
this.preExecute(_6,_7,e,dojo.hitch(this,this.finishExecute));
},finishExecute:function(_8,_9,e){
var _a=this.dialog;
if(!_a){
var d=dojo.doc;
var _b=dojo.create("DIV",null,d.body);
var _c="lotusui qkrDialog";
if(this.iw&&this.iw.wEnvSprt&&this.iw.wEnvSprt.mumTheme){
_c+=" qkrMumTheme";
}
if(dojo.isIE&&dojo.isIE<8){
_c+=(dojo.isIE<7)?" lotusui_ie lotusui_ie6":" lotusui_ie lotusui_ie7";
}
if(dojo.isFF&&(dojo.isFF<3)){
_c+=" lotus_ff2";
}
var _d=d.getElementsByTagName("body")[0];
if(dojo.hasClass(_d,"dijit_a11y")){
_c+=" lotusImagesOff";
}
var _a=new lconn.share.widget.PreviewDialog({"class":_c,duration:100,_position:function(){
var _e=this.domNode,_f=dijit.getViewport(),bb=dojo.position(_e,true),l=(_f.w-bb.w)/2,t=(_f.h-bb.h)/2;
if(!this._relativePosition){
bb.y=0;
}
this._relativePosition={l:l>=0?l:bb.l-_f.l,t:t>=0?t:bb.y-_f.t};
this.inherited("_position",arguments);
}},_b);
_a.domNode.setAttribute("aria-label",this.nls.DIALOG_TITLE);
this.dialog=_a;
if(this.createDialog){
this.createDialog(_8,_9,_a);
}
dojo.addClass(this.dialog.containerNode,"qkrDialog");
}else{
if(this.updateDialog){
this.updateDialog(_8,_9,_a);
}
}
var _10=_a.domNode.childNodes;
for(var i=0;i<_10.length;i++){
var _11=_10[i];
if(_11.className=="dijitDialogTitleBar"){
_11.style.display="none";
}
if(_11.className=="dijitDialogPaneContent"){
_11.style.padding="0";
_11.style.borderWidth="0px";
_11.style.marginTop="0px";
}
}
_a.domNode.style.padding="0px";
_a.show();
setTimeout(dojo.hitch(_a,function(){
this.focus();
}),200);
this.onDialogExecute();
},onDialogExecute:function(e){
},cancelDialog:function(e){
if(e){
dojo.stopEvent(e);
}
var d=this.dialog;
if(d){
this.skipCancelCleanupWork=true;
d.onCancel();
if(this.alwaysRecreate){
d.cancel();
d.hide();
}
this.skipCancelCleanupWork=false;
this.cleanupCancel();
}
},onDialogCancel:function(_12){
if(_12!==true){
this.cleanupCancel();
}
},cleanupCancel:function(){
var d=this.dialog;
if(d&&this.alwaysRecreate&&!this.skipCancelCleanupWork){
this.destroy();
}
if(!this.skipCancelCleanupWork){
this.onDialogCancelComplete();
}
},onDialogCancelComplete:function(){
},destroy:function(){
this.title=null;
this.inherited(arguments);
if(this.dialog){
var d=this.dialog;
this.cleanupDialog(d);
}
},cleanupDialog:function(d){
dojo.forEach(dojo.query(".qkrHelpIcon",d.domNode),function(_13){
var _14=dijit.byId(_13.id);
_14.destroy();
});
d.destroyRecursive();
if(this.moveable){
this.moveable.destroy();
this.moveable=null;
}
this.dialog=null;
},enableInput:function(_15){
this.toggleInput(_15,true);
},disableInput:function(_16,_17){
this.toggleInput(_16,false,_17);
},toggleInput:function(_18,_19,_1a){
_18=_18||this.dialog;
dojo.forEach(dojo.query("INPUT",_18.domNode),function(el){
if(el.type!="file"&&el.type!="hidden"){
el.disabled=!_19;
if(el.type=="submit"){
_19?dojo.removeClass(el,"lotusBtnDisabled"):dojo.addClass(el,"lotusBtnDisabled");
}
}
});
dojo.forEach(dojo.query("TEXTAREA",_18.domNode),function(el){
el.disabled=!_19;
});
dojo.forEach(dojo.query("BUTTON",_18.domNode),function(el){
if(!dojo.hasClass(el,"qkrCancelBtn")){
el.disabled=!_19;
_19?dojo.removeClass(el,"lotusBtnDisabled"):dojo.addClass(el,"lotusBtnDisabled");
}
});
if(_18.progressNode){
_18.progressNode.style.display=(!_19&&!_1a)?"":"none";
}
},enableSubmitInput:function(_1b){
this.toggleSubmitInput(_1b,true);
},disableSubmitInput:function(_1c){
this.toggleSubmitInput(_1c,false);
},toggleSubmitInput:function(_1d,_1e){
dojo.query("input[type='submit']",(_1d||this.dialog).domNode).forEach(function(el){
if(el.type!="file"&&el.type!="hidden"){
el.disabled=!_1e;
if(el.type=="submit"){
_1e?dojo.removeClass(el,"lotusBtnDisabled"):dojo.addClass(el,"lotusBtnDisabled");
}
}
});
},resize:function(){
if(this.dialog){
this.dialog._position();
}
},complete:function(_1f,_20){
if(_1f instanceof Error){
this.onerror("unknown");
}else{
this.onsuccess();
}
},onsuccess:function(){
this.cancelDialog();
},createHeader:function(el,_21,_22){
var d=dojo.doc;
dojo.addClass(el,"lotusDraggable");
var h1=dojo.create("h1",{className:"lotusHeading"},el);
var _23=this.title=dojo.create("span",null,h1);
_23.appendChild(d.createTextNode(_21));
var _24=this.closeId=dijit.getUniqueId("share_action_dialogclose");
var _25=dojo.create("label",{"for":this.dialog.id,"class":"lotusOffScreen"},el);
_25.appendChild(d.createTextNode("X"));
var a=dojo.create("a",{href:"javascript:;",role:"button",className:"lotusDialogClose",id:_24,title:this.nls.CANCEL},el);
a.style.lineHeight="16px";
dojo.connect(a,"onclick",this,"cancelDialog");
var img=dojo.create("img",{alt:"",src:dijit._Widget.prototype._blankGif},a);
var _26=dojo.create("span",{className:"lotusAltText"},a);
_26.appendChild(d.createTextNode("X"));
if(_22){
this.moveable=(dojo.isIE==6)?new dojo.dnd.TimedMoveable(this.dialog.domNode,{handle:el}):new dojo.dnd.Moveable(this.dialog.domNode,{handle:el,timeout:0});
}
},validateAndFocus:function(_27,e){
if(e){
dojo.stopEvent(e);
}
var _28=true;
if(typeof this[_27]=="function"){
_28=this[_27]();
}
if(!_28){
var _29=dojo.query(".lotusFormErrorField",this.dialog.domNode)[0];
setTimeout(function(){
dijit.focus(_29);
},10);
}
return _28;
},resourcesUrl:function(){
var _2a=dijit._Widget.prototype._blankGif;
var _2b=_2a.substring(0,_2a.indexOf("blank.gif"));
return _2b;
}});
}


;if(!dojo._hasResource["lconn.share.action.AbstractDialog"]){
dojo._hasResource["lconn.share.action.AbstractDialog"]=true;
dojo.provide("lconn.share.action.AbstractDialog");


dojo.declare("lconn.share.action.AbstractDialog",[lconn.share.action.DialogAction],{alwaysRecreate:true,appendFooter:function(el,_1,_2,_3){
var _4=this.dialog;
var d=dojo.doc;
var _5=dojo.create("div",{className:"lotusDialogFooter"},el);
if(_2){
var _6=_4.progressNode=dojo.create("span",{className:"qkrStatus"},_5);
_6.style.display="none";
var _7=dojo.create("img",{alt:this.nls.BUSY,className:"lotusLoading",src:dijit._Widget.prototype._blankGif},_6);
_6.appendChild(d.createTextNode(this.nls.BUSY));
}else{
if(_3){
var _8=_4.progressNode=dojo.create("div",{className:"lotusLeft qkrStatus"},_5);
_8.style.display="none";
var _9=dojo.create("div",null,_8);
var _a=this.progress=new dijit.ProgressBar({},_9);
}
}
if(_1){
var _b=this.backButton=dojo.create("button",{className:"lotusFormButton",type:"button"},_5);
_b.style.display="none";
_b.appendChild(d.createTextNode(this.nls.BACK));
this.connect(_b,"onclick",this,"back");
}
var _c=this.okButton=_4.saveNode=dojo.create("input",{type:"submit",value:this.nls.OK,className:"lotusFormButton"},_5);
var _d=this.confirmButton=_4.confirmBtnNode=dojo.create("button",{className:"lotusFormButton"},_5);
_d.style.display="none";
_d.appendChild(d.createTextNode(this.nls.CONFIRM_CHANGE));
if(!this.noCancel){
var _e=this.cancelButton=dojo.create("button",{className:"lotusFormButton qkrCancelBtn"},_5);
_e.appendChild(d.createTextNode(this.nls.CANCEL));
this.connect(_e,"onclick",this,"cancelDialog");
}
},destroy:function(){
this.backButton=this.okButton=this.secondButton=this.confirmButton=this.cancelButton=null;
this.inherited(arguments);
},cleanupDialog:function(d){
d.progressNode=null;
d.saveNode=null;
d.secondSaveNode=null;
d.confirmBtnNode=null;
this.inherited(arguments);
},appendHeader:function(el){
var _f=dojo.create("div",{className:"lotusDialogHeader"},el);
this.createHeader(_f,this.nls.DIALOG_TITLE,true);
},getFormNodeClassName:function(){
return "lotusDialog lotusForm";
},getContentNodeClassName:function(){
return "lotusDialog";
},appendA11yRequiredInstruction:function(el){
var d=dojo.doc;
var _10=dojo.create("span",{className:"lotusAccess"},el);
_10.appendChild(d.createTextNode(this.nls.REQUIRED_A11Y));
}});
}


;if(!dojo._hasResource["lconn.share.util.MediaUri"]){
dojo._hasResource["lconn.share.util.MediaUri"]=true;
dojo.provide("lconn.share.util.MediaUri");










(function(){
lconn.share.util.MediaUri.parseUri=function(_1){
if(!_1){
return null;
}
_1=new dojo._Url(_1);
var _2=lconn.share.util.MediaUri.getRequestParameters(_1);
_1.queryParameters=_2;
return _1;
};
lconn.share.util.MediaUri.writeUri=function(_3){
if(!_3){
return null;
}
var _4="";
if(_3.scheme){
_4+=_3.scheme+":";
}
if(_3.authority){
_4+="//"+_3.authority;
}
if(_3.path){
_4+=_3.path;
}
if(_3.queryParameters){
_4+=lconn.share.util.MediaUri.writeParameters(_3.queryParameters);
}else{
if(_3.query){
_4+=((_3.query.charAt(0)!="?")?"?":"")+_3.query;
}
}
if(_3.fragment){
_4+="#"+_3.fragment;
}
return _4;
};
lconn.share.util.MediaUri.makeAtomUrlIESafe=function(_5){
if(dojo.isIE&&_5){
_5=lconn.share.util.MediaUri.parseUri(_5);
_5.queryParameters.format="xml";
_5=lconn.share.util.MediaUri.writeUri(_5);
}
return _5;
};
lconn.share.util.MediaUri.rewriteUriProxyOnly=function(iw,_6){
if(iw&&!iw.overrideCommonProxy&&((iw.communitiesSvcRef||ic_comm_communitiesSvcRef)&&iw.useCommonProxy||iw.isDocSummary&&iw.isDocSummary())){
var _7=function(_8){
return _8=="https"?443:80;
};
var _9=lconn.core.url.getServiceUrl(lconn.core.config.services.deploymentConfig,window.location.protocol=="https:"&&lconn.core.config.services.deploymentConfig.secureEnabled).uri;
var _a=_9+"/proxy/commonProxy";
var _b=lconn.share.util.MediaUri.parseUri(_a).path;
if(_b.charAt(_b.length-1)=="/"){
_b=_b.substring(0,_b.length-1);
}
var _c=window.location;
var _d=_c.hostname.toLowerCase()||localhost;
var _e=(_c.protocol||"http").replace(":","");
var _f=_c.port||_7(_e);
var uri=new dojo._Url(_6);
var _10=uri.host;
if(_10){
_10=_10.toLowerCase();
var _11=uri.scheme||_e;
var _12=uri.port||_7(_11);
if(_11!=_e||_12!=_f||_10!=_d){
return (iw.useFullCommonProxyPath?_a:_b)+"/"+_11+"/"+encodeURIComponent(_10+":"+_12)+(uri.path||"")+(uri.query?("?"+uri.query):"");
}
}
return _6;
}else{
_6=iw.iContext.io.rewriteURI(_6);
}
return _6;
};
lconn.share.util.MediaUri.rewriteUri=function(url,p,_13,iw){
if(url&&p){
url=lconn.share.util.MediaUri.parseUri(url);
dojo.mixin(url.queryParameters,p);
url=lconn.share.util.MediaUri.writeUri(url);
}
if(_13&&url){
if(iw){
url=lconn.share.util.MediaUri.rewriteUriProxyOnly(iw,url);
}else{
console.log("Missing iw param in rewriteUri: "+url);
}
}
return url;
};
lconn.share.util.MediaUri.splitQuery=function(_14){
var _15={};
if(!_14){
return _15;
}
if(_14.charAt(0)=="?"){
_14=_14.substring(1);
}
var _16=_14.split("&");
for(var i=0;i<_16.length;i++){
if(_16[i].length>0){
var _17=_16[i].indexOf("=");
if(_17==-1){
var key=decodeURIComponent(_16[i]);
var _18=_15[key];
if(dojo.isArray(_18)){
_18.push("");
}else{
if(_18){
_15[key]=[_18,""];
}else{
_15[key]="";
}
}
}else{
if(_17>0){
var key=decodeURIComponent(_16[i].substring(0,_17));
var _19=decodeURIComponent(_16[i].substring(_17+1));
var _18=_15[key];
if(dojo.isArray(_18)){
_18.push(_19);
}else{
if(_18){
_15[key]=[_18,_19];
}else{
_15[key]=_19;
}
}
}
}
}
}
return _15;
};
lconn.share.util.MediaUri.removeQuery=function(uri){
if(uri){
var ind=uri.indexOf("?");
if(ind>0){
uri=uri.substring(0,ind);
}
}
return uri;
};
lconn.share.util.MediaUri.getRequestParameters=function(uri){
var _1a={};
if(!uri){
return _1a;
}
if(typeof uri=="string"){
uri=new dojo._Url(uri);
}
return lconn.share.util.MediaUri.splitQuery(uri.query);
};
lconn.share.util.MediaUri.writeParameters=function(map){
var out=[];
for(var key in map){
var _1b=map[key];
if(typeof _1b!="undefined"&&_1b!=null){
key=encodeURIComponent(key);
if(dojo.isArray(_1b)){
for(var i=0;i<_1b.length;i++){
lconn.share.util.MediaUri.writeParam(key,_1b[i],out);
}
}else{
lconn.share.util.MediaUri.writeParam(key,_1b,out);
}
}
}
return out.join("");
};
lconn.share.util.MediaUri.writeParam=function(key,_1c,out){
if(typeof _1c!="undefined"&&_1c!=null){
out.push(out.length==0?"?":"&");
out.push(key);
if(!(_1c==="")){
out.push("=");
out.push(encodeURIComponent(_1c));
}
}
};
lconn.share.util.MediaUri.getHost=function(_1d){
var uri=new dojo._Url(_1d);
uri.query=null;
uri.path=null;
return lconn.share.util.MediaUri.writeUri(uri);
};
lconn.share.util.MediaUri.getPath=function(_1e){
var uri=new dojo._Url(_1e);
uri.queryParameters=null;
uri.query=null;
return lconn.share.util.MediaUri.writeUri(uri);
};
})();
}

if(typeof define!=="undefined"&&typeof define._packages!=="undefined")define._packages["quickr.lw"]=true;

;if(!dojo._hasResource["quickr.lw.widget.VideoPlayer"]){
dojo._hasResource["quickr.lw.widget.VideoPlayer"]=true;
dojo.provide("quickr.lw.widget.VideoPlayer");
dojo.declare("quickr.lw.widget.VideoPlayer",null,{playVideo:function(_1,_2,_3,_4,_5,_6,_7){
if(!_6){
_6="";
}
if(!_7){
_7="";
}
var _8=_2.getValue(_3,"urlDownload");
var _9=(dojo.getObject("quickr.lw.config.baseUri")||"/")+"sn_media_video_player/SnMediaVideoPlayer.swf";
var _a=1.5;
var _b=_4/_a;
var _c=_4;
var _d=["pt-br","zh-tw"];
var _e=/([^\-]*\-[^\-]*)\-/;
var _f=_e.exec(dojo.locale.toLowerCase()[1]);
if(!_f){
_f=dojo.locale;
}
var nls=dojo.locale.split("-")[0];
if(dojo.indexOf(_d,_f)!=-1){
if(_f=="pt-br"){
nls="pt_BR";
}else{
if(_f=="zh-tw"){
nls="zh_TW";
}
}
}
if(nls=="he"){
nls="iw";
}
var _10=dijit.getUniqueId("qkr_lw_VideoPlayer");
var _11=quickr.lw.util.uri.rewriteUri(_9,{videoSource:_8,nls:nls,height:_b,width:_c,ie:dojo.isIE,prevId:_6,nextId:_7,elementId:_10});
var _12=(window.location.protocol||"http").replace(":","");
var _13=(_12==="https");
var _14=(_13?"https":"http")+"://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0";
if(dojo.isIE){
_1.innerHTML="<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" "+"codebase=\""+_14+"\" "+"width=\""+_c+"\" height=\""+_b+"\" id=\""+_10+"\">"+"<param name=\"movie\" value=\""+_11+"\">"+"<param name=\"allowFullScreen\" value=\"true\">"+"<param name=\"tabIndex\" value=\"0\">"+"</object>";
}else{
_1.innerHTML="<embed"+" width=\""+_c+"\" height=\""+_b+"\""+"tabindex=\"0\" allowfullscreen=\"true\" pluginspage=\"http://www.adobe.com/go/getflashplayer\" "+"allownetworking=\"all\" allowscriptaccess=\"sameDomain\" swliveconnect=\"true\" wmode=\"Transparent\""+"id=\""+_10+"\" name=\""+_10+"\" "+"src=\""+_11+"\" type=\"application/x-shockwave-flash\">";
}
if(!dojo.isIE){
dojo.connect(dojo.byId(_10),"onfocus",function(){
var obj=dojo.byId(_10);
if(obj){
obj.focusReceived();
}
});
}
}});
quickr.lw.widget.VideoPlayer.alertVideoMessage=function(_15,msg){
var _16=dojo.byId(_15),div;
if(_16){
div=dojo.create("div",{className:"lotusAccess qkrVideoMsgAlert",role:"alert"},_16.parentNode);
div.appendChild(dojo.doc.createTextNode(msg));
}
};
quickr.lw.widget.VideoPlayer.moveFocus=function(_17){
var el=dojo.byId(_17);
if(el){
setTimeout(dojo.hitch(this,function(el){
el.focus();
},el),0);
}
};
}


;if(!dojo._hasResource["lconn.share.widget.FlashVideoPlayer"]){
dojo._hasResource["lconn.share.widget.FlashVideoPlayer"]=true;
dojo.provide("lconn.share.widget.FlashVideoPlayer");


if(dojo.getObject("quickr.lw.widget.VideoPlayer")){


}
dojo.declare("lconn.share.widget.FlashVideoPlayer",null,{playVideo:function(_1,_2,_3,_4,_5,_6){
if(!_5){
_5="";
}
if(!_6){
_6="";
}
var _7=_2.getUrlDownload();
var _8=require.toUrl("lconn.share")+"/sn_media_video_player/SnMediaVideoPlayer.swf";
var _9=1.5;
var _a=_3/_9;
var _b=_3;
var _c=["pt-br","zh-tw"];
var _d=/([^\-]*\-[^\-]*)\-/;
var _e=_d.exec(dojo.locale.toLowerCase()[1]);
if(!_e){
_e=dojo.locale;
}
var _f=dojo.locale.split("-")[0];
if(dojo.indexOf(_c,_e)!=-1){
if(_e=="pt-br"){
_f="pt_BR";
}else{
if(_e=="zh-tw"){
_f="zh_TW";
}
}
}
if(_f=="he"){
_f="iw";
}
var _10=dijit.getUniqueId("qkr_lw_VideoPlayer");
var _11=lconn.share.util.MediaUri.rewriteUri(_8,{videoSource:_7,nls:_f,height:_a,width:_b,ie:dojo.isIE,prevId:_5,nextId:_6,elementId:_10});
var _12=(window.location.protocol||"http").replace(":","");
var _13=(_12==="https");
var _14=(_13?"https":"http")+"://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0";
if(dojo.isIE){
_1.innerHTML="<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" "+"codebase=\""+_14+"\" "+"width=\""+_b+"\" height=\""+_a+"\" id=\""+_10+"\">"+"<param name=\"movie\" value=\""+_11+"\">"+"<param name=\"allowFullScreen\" value=\"true\">"+"<param name=\"tabIndex\" value=\"0\">"+"</object>";
}else{
_1.innerHTML="<embed"+" width=\""+_b+"\" height=\""+_a+"\""+"tabindex=\"0\" allowfullscreen=\"true\" pluginspage=\"http://www.adobe.com/go/getflashplayer\" "+"allownetworking=\"all\" allowscriptaccess=\"sameDomain\" swliveconnect=\"true\" wmode=\"Transparent\""+"id=\""+_10+"\" name=\""+_10+"\" "+"src=\""+_11+"\" type=\"application/x-shockwave-flash\">";
}
if(!dojo.isIE){
dojo.connect(dojo.byId(_10),"onfocus",function(){
var obj=dojo.byId(_10);
if(obj){
obj.focusReceived();
}
});
}
}});
lconn.share.widget.FlashVideoPlayer.alertVideoMessage=function(_15,msg){
var _16=dojo.byId(_15),div;
if(_16){
div=dojo.create("div",{className:"lotusAccess qkrVideoMsgAlert",role:"alert"},_16.parentNode);
div.appendChild(dojo.doc.createTextNode(msg));
}
};
lconn.share.widget.FlashVideoPlayer.moveFocus=function(_17){
var el=dojo.byId(_17);
if(el){
setTimeout(dojo.hitch(this,function(el){
el.focus();
},el),0);
}
};
}


;define("dojo/NodeList-traverse",["./query","./_base/lang","./_base/array"],function(_1,_2,_3){
var _4=_1.NodeList;
_2.extend(_4,{_buildArrayFromCallback:function(_5){
var _6=[];
for(var i=0;i<this.length;i++){
var _7=_5.call(this[i],this[i],_6);
if(_7){
_6=_6.concat(_7);
}
}
return _6;
},_getUniqueAsNodeList:function(_8){
var _9=[];
for(var i=0,_a;_a=_8[i];i++){
if(_a.nodeType==1&&_3.indexOf(_9,_a)==-1){
_9.push(_a);
}
}
return this._wrap(_9,null,this._NodeListCtor);
},_getUniqueNodeListWithParent:function(_b,_c){
var _d=this._getUniqueAsNodeList(_b);
_d=(_c?_1._filterResult(_d,_c):_d);
return _d._stash(this);
},_getRelatedUniqueNodes:function(_e,_f){
return this._getUniqueNodeListWithParent(this._buildArrayFromCallback(_f),_e);
},children:function(_10){
return this._getRelatedUniqueNodes(_10,function(_11,ary){
return _2._toArray(_11.childNodes);
});
},closest:function(_12,_13){
return this._getRelatedUniqueNodes(null,function(_14,ary){
do{
if(_1._filterResult([_14],_12,_13).length){
return _14;
}
}while(_14!=_13&&(_14=_14.parentNode)&&_14.nodeType==1);
return null;
});
},parent:function(_15){
return this._getRelatedUniqueNodes(_15,function(_16,ary){
return _16.parentNode;
});
},parents:function(_17){
return this._getRelatedUniqueNodes(_17,function(_18,ary){
var _19=[];
while(_18.parentNode){
_18=_18.parentNode;
_19.push(_18);
}
return _19;
});
},siblings:function(_1a){
return this._getRelatedUniqueNodes(_1a,function(_1b,ary){
var _1c=[];
var _1d=(_1b.parentNode&&_1b.parentNode.childNodes);
for(var i=0;i<_1d.length;i++){
if(_1d[i]!=_1b){
_1c.push(_1d[i]);
}
}
return _1c;
});
},next:function(_1e){
return this._getRelatedUniqueNodes(_1e,function(_1f,ary){
var _20=_1f.nextSibling;
while(_20&&_20.nodeType!=1){
_20=_20.nextSibling;
}
return _20;
});
},nextAll:function(_21){
return this._getRelatedUniqueNodes(_21,function(_22,ary){
var _23=[];
var _24=_22;
while((_24=_24.nextSibling)){
if(_24.nodeType==1){
_23.push(_24);
}
}
return _23;
});
},prev:function(_25){
return this._getRelatedUniqueNodes(_25,function(_26,ary){
var _27=_26.previousSibling;
while(_27&&_27.nodeType!=1){
_27=_27.previousSibling;
}
return _27;
});
},prevAll:function(_28){
return this._getRelatedUniqueNodes(_28,function(_29,ary){
var _2a=[];
var _2b=_29;
while((_2b=_2b.previousSibling)){
if(_2b.nodeType==1){
_2a.push(_2b);
}
}
return _2a;
});
},andSelf:function(){
return this.concat(this._parent);
},first:function(){
return this._wrap(((this[0]&&[this[0]])||[]),this);
},last:function(){
return this._wrap((this.length?[this[this.length-1]]:[]),this);
},even:function(){
return this.filter(function(_2c,i){
return i%2!=0;
});
},odd:function(){
return this.filter(function(_2d,i){
return i%2==0;
});
}});
return _4;
});

dojo.provide("lconn.share.html5_video_player.nls.html5VideoPlayerStrings")._built=true;
dojo.provide("lconn.share.html5_video_player.nls.html5VideoPlayerStrings.en_us");
lconn.share.html5_video_player.nls.html5VideoPlayerStrings.en_us={"videoPlayer":{"fullScreenButtonCloseAction":"Exit full screen mode by pressing ESC","timeDuration":"Length of video","videoDownload":"Your video is downloading.","scrubBar":"Go to a different place within the video.","invalidVideo":"An error has occurred. The video cannot be played.","playButton":"Play the video","pauseButton":"Pause the video","muteButton":"Unmute the video","volumeButton":"Mute the video","fullScreenButton":"Enter full screen mode","volumeBar":"Change the volume","videoPlayer":"Video Player","currentTimeDisplay":"Current time","collapseButton":"Exit full screen mode"}};

;if(!dojo._hasResource["lconn.share.widget.HTML5VideoPlayer"]){
dojo._hasResource["lconn.share.widget.HTML5VideoPlayer"]=true;
dojo.provide("lconn.share.widget.HTML5VideoPlayer");




dojo.requireLocalization("lconn.share.html5_video_player","html5VideoPlayerStrings");
dojo.declare("lconn.share.widget.HTML5VideoPlayer",[dijit._Widget],{isA11y:dojo.hasClass(dojo.doc.getElementsByTagName("body")[0],"dijit_a11y"),nls:dojo.i18n.getLocalization("lconn.share.html5_video_player","html5VideoPlayerStrings"),prevId:null,nextId:null,isMini:null,originalVideoHeight:0,originalVideoWidth:0,initVolume:0.67,lastVolumeValue:0.67,volumeWidth:28,focused:false,controlsTimedOut:null,timeOutHandle:null,isMuted:false,isPlaying:false,isFullScreen:false,allowFullScreen:true,constructor:function(){
this.handles={};
this.volumeListeners={};
this.fullscreenListeners={};
},formatTime:function(_1){
var _2=Math.floor(_1/60);
var _3=Math.floor(_1-(_2*60));
var _4=_3>9?_3:"0"+_3;
var _5=0;
if(!dojo.isIE){
_5+=dojo.style(this.handles.fullScreen,"width")+dojo.style(this.handles.fullScreen,"marginRight")+dojo.style(this.handles.fullScreen,"marginLeft");
}
_5+=dojo.style(this.handles.volumeBar,"width")+dojo.style(this.handles.volumeBar,"marginRight")+dojo.style(this.handles.volumeBar,"marginLeft");
_5+=dojo.style(this.handles.volume,"width")+dojo.style(this.handles.volume,"marginRight")+dojo.style(this.handles.volume,"marginLeft");
_5+=dojo.style(this.handles.durationTime,"width")+dojo.style(this.handles.durationTime,"marginRight")+dojo.style(this.handles.durationTime,"marginLeft");
_5+=dojo.style(this.handles.controlsLineBreak,"width")+dojo.style(this.handles.controlsLineBreak,"marginRight")+dojo.style(this.handles.controlsLineBreak,"marginLeft");
_5+=dojo.style(this.handles.currentTime,"width")+dojo.style(this.handles.currentTime,"marginRight")+dojo.style(this.handles.currentTime,"marginLeft");
dojo.style(this.handles.rightColumn,"width",_5+10+"px");
dojo.style(this.handles.centerColumn,"marginRight",_5+20+"px");
return _2+":"+_4;
},ariaTimeFormat:function(_6){
var m=Math.floor(_6/60)<10?""+Math.floor(_6/60):Math.floor(_6/60);
var s=Math.floor(_6-(m*60))<10?""+Math.floor(_6-(m*60)):Math.floor(_6-(m*60));
var _7;
var _8="minutes";
var _6="seconds";
if(m==1){
_8="minute";
}
if(s==1){
_6="second";
}
if(m!=0){
_7=m+" "+_8+" "+s+" "+_6;
}else{
_7=s+" "+_6;
}
return _7;
},play:function(){
dojo.style(this.handles.playButton,"display","none");
dojo.style(this.handles.pauseButton,"display","block");
if(this.handles.html5vid.currentTime==this.handles.html5vid.duration){
this.handles.html5vid.currentTime=0;
}
if(this.handles.poster){
dojo.destroy(this.handles.poster);
this.handles.poster=null;
}
this.handles.html5vid.play();
this.isPlaying=true;
},pause:function(){
dojo.style(this.handles.playButton,"display","block");
dojo.style(this.handles.pauseButton,"display","none");
this.handles.html5vid.pause();
this.isPlaying=false;
},mute:function(){
var _9=this;
dojo.style(_9.handles.volumeSlideKnob,"width",0+"px");
_9.lastVolumeValue=_9.handles.html5vid.volume;
_9.handles.html5vid.volume=0;
dojo.style(_9.handles.volume,"display","none");
dojo.style(_9.handles.mute,"display","block");
this.isMuted=true;
},unmute:function(){
var _a=this;
var _b=this.lastVolumeValue*this.volumeWidth;
dojo.style(_a.handles.volumeSlideKnob,"width",_b+"px");
_a.handles.html5vid.volume=_a.lastVolumeValue;
dojo.style(_a.handles.mute,"display","none");
dojo.style(_a.handles.volume,"display","block");
this.isMuted=false;
},fullScreen:function(){
if(dojo.isIE){
return;
}
if(this.handles.poster){
this.play();
}
dojo.style(this.handles.fullScreen,"display","none");
dojo.style(this.handles.collapse,"display","block");
if(this.isMini){
var _c=window.parent.dojo.query("iframe")[0];
dojo.attr(_c,"allowFullScreen","true");
var _d=dojo.byId("HTML5Video-styles");
_d.setAttribute("href",require.toUrl("lconn.share")+"/html5_video_player/css/VideoStyles.css");
dojo.addClass(this.handles.playButton,"otherHTML5Player24 otherHTML5Player24-play-16");
dojo.addClass(this.handles.pauseButton,"otherHTML5Player24 otherHTML5Player24-pause-16");
dojo.addClass(this.handles.volume,"   otherHTML5Player24 otherHTML5Player24-volume-16");
dojo.addClass(this.handles.collapse,"otherHTML5Player24 otherHTML5Player24-collapse-16");
}
if(this.handles.videoWrapper.requestFullScreen){
this.handles.videoWrapper.requestFullScreen();
}else{
if(this.handles.videoWrapper.webkitRequestFullScreen){
this.handles.videoWrapper.webkitRequestFullScreen(this.handles.videoWrapper.ALLOW_KEYBOARD_INPUT);
dojo.style(this.handles.videoWrapper,{"position":"fixed","width":screen.width+"px","height":screen.height+"px"});
}else{
if(this.handles.videoWrapper.mozRequestFullScreen){
this.handles.videoWrapper.mozRequestFullScreen();
}
}
}
dojo.style(this.handles.html5vid,{"width":screen.width+"px","height":screen.height+"px"});
dojo.style(this.handles.controlBar,"width","100%");
this.formatTime(this.handles.html5vid.currentTime);
var _e=Math.floor((this.handles.html5vid.currentTime/this.handles.html5vid.duration)*dojo.style(this.handles.seekContainer,"width"));
dojo.style(this.handles.seekBar,"width",_e+"px");
var _f=Math.floor((this.handles.html5vid.buffered.end(0)/this.handles.html5vid.duration)*dojo.style(this.handles.seekContainer,"width"));
dojo.style(this.handles.bufferBar,"width",_f+"px");
if(this.isA11y){
var _10=null;
if(!dojo.byId("BarDiv")){
_10=dojo.create("div",{id:"BarDiv"},this.hadles.seekBar);
}else{
_10=dojo.byId("BarDiv");
}
dojo.empty("BarDiv");
var _11=dojo.style(this.handles.seekContainer,"width");
var _12=Math.floor(_11/4.16);
for(var i=1;i<=_12;i++){
var _13=4.16*i;
dojo.create("div",{id:"bar"+i,className:"",style:{position:"absolute",marginLeft:_13+"px",display:"none"},innerHTML:"|"},_10);
}
}
this.isFullScreen=true;
},collapse:function(){
if(dojo.isIE){
return;
}
dojo.style(this.handles.collapse,"display","none");
dojo.style(this.handles.fullScreen,"display","block");
if(this.isMini){
var _14=dojo.byId("HTML5Video-styles");
_14.setAttribute("href",require.toUrl("lconn.share")+"/html5_video_player/css/VideoEE.css");
dojo.addClass(this.handles.playButton,"otherHTML5Player24 otherHTML5Player24-play-16");
dojo.addClass(this.handles.pauseButton,"otherHTML5Player24 otherHTML5Player24-pause-16");
dojo.addClass(this.handles.volume,"otherHTML5Player24 otherHTML5Player24-volume-16");
dojo.addClass(this.handles.fullScreen,"otherHTML5Player24 otherHTML5Player24-fullscreen-16");
}
if(document.cancelFullScreen){
document.cancelFullScreen();
}else{
if(document.webkitCancelFullScreen){
document.webkitCancelFullScreen();
dojo.style(this.handles.videoWrapper,{"position":"relative","width":this.originalVideoWidth+"px","height":this.originalVideoHeight+"px"});
}else{
if(document.mozCancelFullScreen){
document.mozCancelFullScreen();
}
}
}
dojo.style(this.handles.html5vid,{"width":this.originalVideoWidth+"px","height":this.originalVideoHeight+"px"});
dojo.style(this.handles.controlBar,"width","100%");
this.formatTime(this.handles.html5vid.currentTime);
var _15=Math.floor((this.handles.html5vid.currentTime/this.handles.html5vid.duration)*dojo.style(this.handles.seekContainer,"width"));
dojo.style(this.handles.seekBar,"width",_15+"px");
var _16=Math.floor((this.handles.html5vid.buffered.end(0)/this.handles.html5vid.duration)*dojo.style(this.handles.seekContainer,"width"));
dojo.style(this.handles.bufferBar,"width",_16+"px");
if(this.isA11y){
var _17=dojo.style(this.handles.seekContainer,"width");
var _18=Math.floor(_17/4.16);
var _19=null;
if(!dojo.byId("BarDiv")){
_19=dojo.create("div",{id:"BarDiv"},this.hadles.seekBar);
}else{
_19=dojo.byId("BarDiv");
}
dojo.empty("BarDiv");
for(var i=1;i<=_18;i++){
var _1a=4.16*i;
dojo.create("div",{id:"bar"+i,className:"",style:{position:"absolute",marginLeft:_1a+"px",display:"none"},innerHTML:"|"},_19);
}
}
this.isFullScreen=false;
},showControls:function(){
dojo.style(this.handles.controlBar,"opacity","0.9");
var _1b=this;
if(_1b.controlsTimedOut==false){
if(_1b.timeOutHandle!=null){
clearTimeout(_1b.timeOutHandle);
}
_1b.timeOutHandle=setTimeout(function(){
if(!_1b.isFocused&&!_1b.isOverControlBar){
dojo._fade({node:_1b.handles.controlBar,start:0.9,end:0,duration:250}).play();
_1b.controlsTimedOut=true;
_1b.timeOutHandle=null;
}else{
_1b.showControls();
}
},3000);
}else{
dojo._fade({node:_1b.handles.controlBar,start:0,end:0.9,duration:250}).play();
if(_1b.controlsTimedOut==null){
_1b.timeOutHandle=setTimeout(function(){
dojo._fade({node:_1b.handles.controlBar,start:0.9,end:0,duration:250}).play();
_1b.controlsTimedOut=true;
_1b.timeOutHandle=null;
},3000);
}
_1b.controlsTimedOut=false;
}
},loadStyles:function(){
var _1c=document.createElement("link");
_1c.setAttribute("id","HTML5Video-styles");
_1c.setAttribute("rel","stylesheet");
_1c.setAttribute("type","text/css");
if(this.isMini){
_1c.setAttribute("href",require.toUrl("lconn.share")+"/html5_video_player/css/VideoEE.css");
}else{
_1c.setAttribute("href",require.toUrl("lconn.share")+"/html5_video_player/css/VideoStyles.css");
}
document.getElementsByTagName("head")[0].appendChild(_1c);
},connectVideoEventListeners:function(){
var _1d=this;
this.connect(this.handles.html5vid,"loadedmetadata",function(){
var _1e=Math.ceil((_1d.handles.html5vid.videoHeight*_1d.handles.html5vid.width)/_1d.handles.html5vid.videoWidth);
_1d.handles.videoWrapper.parentNode.style.height=_1e+"px";
_1d.handles.html5vid.height=_1e;
_1d.originalVideoHeight=_1d.handles.html5vid.height;
_1d.originalVideoWidth=_1d.handles.html5vid.width;
if(_1d.handles.playOverlay){
_1d.handles.playOverlayWrapper.style.top=(_1e/2)-(dojo.style(_1d.handles.playOverlay,"height")/2)+"px";
}
dojo.style(_1d.handles.videoWrapper,"height",_1e+"px");
if(_1d.handles.html5vid.duration>=0&&_1d.handles.html5vid.duration!=Number.POSITIVE_INFINITY){
var _1f=_1d.formatTime(_1d.handles.html5vid.duration);
_1d.handles.durationTime.innerHTML=_1f;
}
_1d.handles.html5vid.volume=_1d.initVolume;
});
this.connect(this.handles.poster,"click",function(){
_1d.play();
});
this.connect(this.handles.controlBar,"mouseover",function(){
_1d.isOverControlBar=true;
});
this.connect(this.handles.controlBar,"mouseout",function(){
_1d.isOverControlBar=false;
});
this.connect(this.handles.html5vid,"click",function(){
if(!_1d.isPlaying){
_1d.play();
}else{
_1d.pause();
}
});
this.connect(this.handles.videoWrapper,"keypress",function(e){
_1d.showControls();
if(e.keyCode==32){
e.preventDefault();
if(_1d.playing){
dojo.style(_1d.handles.playButton,"display","block");
dojo.style(_1d.handles.pauseButton,"display","none");
_1d.handles.html5vid.pause();
_1d.playing=false;
}else{
dojo.style(_1d.handles.playButton,"display","none");
dojo.style(_1d.handles.pauseButton,"display","block");
if(_1d.handles.html5vid.currentTime==_1d.handles.html5vid.duration){
_1d.handles.html5vid.currentTime=0;
}
_1d.handles.html5vid.play();
_1d.playing=true;
}
}else{
if(e.keyCode==39){
if(_1d.handles.html5vid.duration>=0&&_1d.handles.html5vid.duration!=Number.POSITIVE_INFINITY){
var _20=_1d.handles.html5vid.currentTime+3;
if(_1d.handles.html5vid.duration>_20){
_1d.handles.focusOnSeekContainer.setAttribute("ria-valuenow",parseInt(_20));
if(Number.POSITIVE_INFINITY!=_1d.handles.html5vid.duration){
_1d.handles.focusOnSeekContainer.setAttribute("aria-valuetext","video slider "+(Math.round(_20/_1d.handles.html5vid.duration*100)+"%"));
}else{
_1d.handles.focusOnSeekContainer.setAttribute("aria-valuetext","video slider "+_1d.ariaTimeFormat(_20));
}
_1d.handles.html5vid.currentTime=_20;
}else{
_1d.handles.html5vid.currentTime=_1d.handles.html5vid.duration;
}
e.preventDefault();
}
}else{
if(e.keyCode==37){
var _20=_1d.handles.html5vid.currentTime-3;
if(_20<0){
_20=0;
}
_1d.handles.focusOnSeekContainer.setAttribute("ria-valuenow",parseInt(_20));
if(Number.POSITIVE_INFINITY!=_1d.handles.html5vid.duration){
_1d.handles.focusOnSeekContainer.setAttribute("aria-valuetext","video slider "+(Math.round(_20/_1d.handles.html5vid.duration*100)+"%"));
}else{
_1d.handles.focusOnSeekContainer.setAttribute("aria-valuetext","video slider "+_1d.ariaTimeFormat(_20));
}
_1d.handles.html5vid.currentTime=_20;
e.preventDefault();
}else{
if(e.keyCode==38){
var _21=_1d.handles.html5vid.volume;
_21+=0.05;
if(_21>1){
_21=1;
}
_1d.handles.focusOnVolume.setAttribute("aria-valuetext","volume slider "+(Math.round(_21*100)+"%"));
_1d.handles.html5vid.volume=_21;
dojo.animateProperty({node:_1d.handles.volumeSlideKnob,properties:{width:(_1d.handles.html5vid.volume*_1d.volumeWidth)},duration:100}).play();
if(_1d.isMuted){
dojo.style(_1d.handles.mute,"display","none");
dojo.style(_1d.handles.volume,"display","block");
_1d.isMuted=false;
}
e.preventDefault();
}else{
if(e.keyCode==40){
var _21=_1d.handles.html5vid.volume;
_21-=0.05;
if(_21<=0.075){
_1d.mute();
_1d.handles.focusOnVolume.setAttribute("aria-valuetext","volume slider 0%");
}else{
_1d.handles.focusOnVolume.setAttribute("aria-valuetext","volume slider "+(Math.round(_21*100)+"%"));
_1d.handles.html5vid.volume=_21;
dojo.animateProperty({node:_1d.handles.volumeSlideKnob,properties:{width:(_1d.handles.html5vid.volume*_1d.volumeWidth)},duration:100,onEnd:function(){
dojo.style(_1d.handles.mute,"display","none");
dojo.style(_1d.handles.volume,"display","block");
_1d.isMuted=false;
}}).play();
e.preventDefault();
}
}else{
if(e.keyCode==102){
_1d.fullScreen();
_1d.connectFullScreenListeners();
e.preventDefault();
}
}
}
}
}
}
});
this.connect(this.handles.html5vid,"timeupdate",function(){
try{
var _22=Math.floor((_1d.handles.html5vid.currentTime/_1d.handles.html5vid.duration)*dojo.position(_1d.handles.seekContainer).w);
dojo.animateProperty({node:_1d.handles.seekBar,properties:{width:_22},duration:10}).play();
var _23=Math.floor((_1d.handles.html5vid.buffered.end(0)/_1d.handles.html5vid.duration)*dojo.position(_1d.handles.seekContainer).w);
dojo.animateProperty({node:_1d.handles.bufferBar,properties:{width:_23},duration:10}).play();
if(this.isA11y){
var _24=Math.round(_22/4.16);
var _25=dojo.style(_1d.handles.seekContainer,"width");
var _26=Math.round(_25/4.16);
for(var i=1;i<=_24;i++){
if(dojo.byId("bar"+i)){
dojo.byId("bar"+i).style.display="block";
}else{
var _27=4.16*i;
dojo.create("div",{id:"bar"+i,className:"",style:{position:"absolute",marginLeft:_27+"px",display:"block"},innerHTML:"|"},dojo.byId("BarDiv"));
}
}
for(var i=_24+1;i<_26;i++){
if(dojo.byId("bar"+i)){
dojo.byId("bar"+i).style.display="none";
}else{
var _27=4.16*i;
dojo.create("div",{id:"bar"+i,className:"",style:{position:"absolute",marginLeft:_27+"px",display:"none"},innerHTML:"|"},dojo.byId("BarDiv"));
}
}
}
}
catch(err){
console.log("Time update error: "+err);
}
if(_1d.handles.html5vid.currentTime>=0){
var _28=_1d.formatTime(_1d.handles.html5vid.currentTime);
_1d.handles.currentTime.innerHTML=_28;
}
if(_1d.handles.html5vid.duration>=0&&_1d.handles.html5vid.duration!=Number.POSITIVE_INFINITY){
var _28=_1d.formatTime(_1d.handles.html5vid.duration);
_1d.handles.durationTime.innerHTML=_28;
}
});
this.connect(this.handles.videoWrapper,"mouseout",function(e){
var _29=e.pageX;
var _2a=e.pageY;
var _2b=dojo.position(_1d.handles.videoWrapper,true);
if(_29<=_2b.x||_29>=(_2b.x+_2b.w)||_2a<=_2b.y||_2a>=(_2b.y+_2b.h)){
if(!_1d.isFocused){
dojo._fade({node:_1d.handles.controlBar,start:0.9,end:0,duration:250}).play();
_1d.controlsTimedOut=null;
clearTimeout(_1d.timeOutHandle);
}
if(_1d.handles.playOverlay){
_1d.handles.playOverlay.style.display="block";
_1d.handles.playOverlay_hover.style.display="none";
}
}
});
this.connect(this.handles.videoWrapper,"mousemove",function(e){
_1d.showControls();
if(_1d.handles.playOverlay){
_1d.handles.playOverlay.style.display="none";
_1d.handles.playOverlay_hover.style.display="block";
}
});
this.connect(this.handles.html5vid,"ended",function(){
dojo.style(_1d.handles.playButton,"display","block");
dojo.style(_1d.handles.pauseButton,"display","none");
_1d.playing=false;
});
},connectControlEventListeners:function(){
var _2c=this;
this.firstFocus=false;
if(this.prevId){
this.connect(dojo.byId(this.prevId),"keypress",function(e){
if(e.keyCode==9&&!e.shiftKey){
if(this.firstFocus){
if(_2c.handles.playButton.style.display=="block"){
_2c.handles.playButton.focus();
}else{
_2c.handles.pauseButton.focus();
}
this.firstFocus=false;
}else{
this.firstFocus=true;
}
e.preventDefault();
}
});
}
if(this.nextId){
this.connect(dojo.byId(this.nextId),"keypress",function(e){
if(e.keyCode==9&&e.shiftKey){
if(!_2c.isFullScreen){
_2c.handles.fullScreen.focus();
}else{
_2c.handles.collapse.focus();
}
e.preventDefault();
}
});
}
this.connect(this.handles.playButton,"click",function(){
_2c.play();
_2c.handles.pauseButton.focus();
dojo.attr(this.handles.pauseButton,"aria-pressed",true);
});
this.connect(this.handles.playButton,"mousedown",function(e){
e.preventDefault();
});
this.connect(this.handles.playButton,"keypress",function(e){
if(e.keyCode==13){
_2c.play();
_2c.handles.pauseButton.focus();
dojo.attr(this.handles.pauseButton,"aria-pressed",true);
e.preventDefault();
}else{
if(e.keyCode==9){
if(!e.shiftKey){
if(!_2c.isMuted){
_2c.handles.focusOnSeekContainer.focus();
}else{
_2c.handles.mute.focus();
}
}else{
dojo.byId(_2c.prevId).focus();
}
e.preventDefault();
}
}
});
this.connect(this.handles.playButton,"mouseover",function(){
dojo.addClass(_2c.handles.playButton,"otherHTML5Player24 otherHTML5Player24-play-hover-16");
});
this.connect(this.handles.playButton,"mouseout",function(){
dojo.addClass(_2c.handles.playButton,"otherHTML5Player24 otherHTML5Player24-play-16");
});
this.connect(this.handles.playButton,"focus",function(){
dojo.addClass(_2c.handles.playButton,"otherHTML5Player24 otherHTML5Player24-play-hover-16");
_2c.showControls();
_2c.isFocused=true;
});
this.connect(this.handles.playButton,"blur",function(){
dojo.addClass(_2c.handles.playButton,"otherHTML5Player24 otherHTML5Player24-play-16");
_2c.isFocused=false;
});
this.connect(this.handles.pauseButton,"click",function(){
_2c.pause();
});
this.connect(this.handles.pauseButton,"mousedown",function(e){
e.preventDefault();
});
this.connect(this.handles.pauseButton,"keypress",function(e){
if(e.keyCode==13){
_2c.pause();
_2c.handles.playButton.focus();
dojo.attr(this.handles.pauseButton,"aria-pressed",true);
e.preventDefault();
}else{
if(e.keyCode==9){
if(!e.shiftKey){
if(!_2c.isMuted){
_2c.handles.focusOnSeekContainer.focus();
}else{
_2c.handles.mute.focus();
}
e.preventDefault();
}else{
if(_2c.prevId){
dojo.byId(_2c.prevId).focus();
e.preventDefault();
}
}
}
}
});
this.connect(this.handles.pauseButton,"mouseover",function(){
dojo.addClass(_2c.handles.pauseButton,"otherHTML5Player24 otherHTML5Player24-pause-hover-16");
});
this.connect(this.handles.pauseButton,"mouseout",function(){
dojo.addClass(_2c.handles.pauseButton,"otherHTML5Player24 otherHTML5Player24-pause-16");
});
this.connect(this.handles.pauseButton,"focus",function(){
dojo.addClass(_2c.handles.pauseButton,"otherHTML5Player24 otherHTML5Player24-pause-hover-16");
_2c.showControls();
_2c.isFocused=true;
});
this.connect(this.handles.pauseButton,"blur",function(){
dojo.addClass(_2c.handles.pauseButton,"otherHTML5Player24 otherHTML5Player24-pause-16");
_2c.isFocused=false;
});
this.connect(this.handles.focusOnSeekContainer,"keypress",function(e){
if(e.keyCode==13){
_2c.play();
_2c.handles.pauseButton.focus();
e.preventDefault();
}else{
if(e.keyCode==9){
if(!e.shiftKey){
if(!_2c.isMuted){
_2c.handles.volume.focus();
}else{
_2c.handles.mute.focus();
}
}else{
if(_2c.handles.playButton.style.display=="block"){
_2c.handles.playButton.focus();
}else{
_2c.handles.pauseButton.focus();
}
}
e.preventDefault();
}
}
});
this.connect(this.handles.seekContainer,"click",function(e){
try{
var _2d=e.pageX;
var _2e=e.pageY;
var _2f=dojo.position(_2c.handles.seekContainer,true);
if(_2d>_2f.x&&_2d<(_2f.x+_2f.w)&&_2e>_2f.y&&_2e<(_2f.y+_2f.h)){
var _30=(_2d-_2f.x)/_2f.w;
var _31=(_2c.handles.html5vid.duration*_30);
var _32=Math.floor((_31/_2c.handles.html5vid.duration)*dojo.style(_2c.handles.seekContainer,"width"));
dojo.style(_2c.handles.seekBar,"width",_32+"px");
_2c.handles.html5vid.currentTime=_31;
}
}
catch(err){
console.log("Error during seek: "+err);
}
});
this.connect(this.handles.fullScreen,"click",function(){
_2c.fullScreen();
_2c.handles.collapse.focus();
dojo.attr(this.handles.fullScreen,"aria-pressed",true);
_2c.connectFullScreenListeners();
});
this.connect(this.handles.fullScreen,"keypress",function(e){
if(e.keyCode==102||e.keyCode==13){
_2c.fullScreen();
_2c.handles.collapse.focus();
dojo.attr(this.handles.fullScreen,"aria-pressed",true);
_2c.connectFullScreenListeners();
e.preventDefault();
}else{
if(e.keyCode==9){
if(!e.shiftKey){
if(_2c.nextId){
dojo.byId(_2c.nextId).focus();
e.preventDefault();
}
}else{
_2c.handles.focusOnVolume.focus();
e.preventDefault();
}
}
}
});
this.connect(this.handles.fullScreen,"mousedown",function(e){
e.preventDefault();
});
this.connect(this.handles.fullScreen,"mouseover",function(){
dojo.addClass(_2c.handles.fullScreen,"otherHTML5Player24 otherHTML5Player24-fullscreen-hover-16");
});
this.connect(this.handles.fullScreen,"mouseout",function(){
dojo.addClass(_2c.handles.fullScreen,"otherHTML5Player24 otherHTML5Player24-fullscreen-16");
});
this.connect(this.handles.fullScreen,"focus",function(){
dojo.addClass(_2c.handles.fullScreen,"otherHTML5Player24 otherHTML5Player24-fullscreen-hover-16");
_2c.showControls();
_2c.isFocused=true;
});
this.connect(this.handles.fullScreen,"blur",function(){
dojo.addClass(_2c.handles.fullScreen,"  otherHTML5Player24 otherHTML5Player24-fullscreen-16");
_2c.isFocused=false;
});
this.connect(this.handles.collapse,"click",function(){
_2c.collapse();
_2c.handles.fullScreen.focus();
dojo.attr(this.handles.collapse,"aria-pressed",true);
_2c.disconnectFullScreenListeners();
});
this.connect(this.handles.collapse,"keypress",function(e){
if(e.keyCode==13){
_2c.collapse();
_2c.handles.fullScreen.focus();
dojo.attr(this.handles.collapse,"aria-pressed",true);
_2c.disconnectFullScreenListeners();
e.preventDefault();
}else{
if(e.keyCode==9){
if(!e.shiftKey){
if(_2c.nextId){
dojo.byId(_2c.nextId).focus();
e.preventDefault();
}
}else{
_2c.handles.focusOnVolume.focus();
e.preventDefault();
}
}
}
});
this.connect(this.handles.collapse,"mouseover",function(){
dojo.addClass(_2c.handles.collapse,"otherHTML5Player24 otherHTML5Player24-collapse-hover-16");
});
this.connect(this.handles.collapse,"mouseout",function(){
dojo.addClass(_2c.handles.collapse,"otherHTML5Player24 otherHTML5Player24-collapse-16");
});
this.connect(this.handles.collapse,"mousedown",function(e){
e.preventDefault();
});
this.connect(this.handles.collapse,"focus",function(){
dojo.addClass(_2c.handles.collapse,"otherHTML5Player24 otherHTML5Player24-collapse-hover-16");
_2c.showControls();
_2c.isFocused=true;
});
this.connect(this.handles.collapse,"blur",function(){
dojo.addClass(_2c.handles.collapse,"  otherHTML5Player24 otherHTML5Player24-collapse-16");
_2c.isFocused=false;
});
},connectVolumeEventListeners:function(){
var _33=this;
this.connect(this.handles.volume,"focus",function(){
dojo.addClass(_33.handles.volume,"   otherHTML5Player24 otherHTML5Player24-volume-hover-16");
_33.isFocused=true;
_33.showControls();
});
this.connect(this.handles.mute,"focus",function(){
dojo.addClass(_33.handles.mute,"otherHTML5Player24 otherHTML5Player24-mute-hover-16");
_33.isFocused=true;
_33.showControls();
});
this.connect(this.handles.volume,"blur",function(){
dojo.addClass(_33.handles.volume,"otherHTML5Player24 otherHTML5Player24-volume-16");
_33.isFocused=false;
});
this.connect(this.handles.mute,"blur",function(){
dojo.addClass(_33.handles.mute,"otherHTML5Player24 otherHTML5Player24-mute-16");
_33.isFocused=false;
});
this.connect(this.handles.volume,"mouseover",function(e){
dojo.addClass(_33.handles.volume,"   otherHTML5Player24 otherHTML5Player24-volume-hover-16");
});
this.connect(this.handles.mute,"mouseover",function(e){
dojo.addClass(_33.handles.mute,"otherHTML5Player24 otherHTML5Player24-mute-hover-16");
});
this.connect(this.handles.volume,"mouseout",function(e){
dojo.addClass(_33.handles.volume,"   otherHTML5Player24 otherHTML5Player24-volume-16");
});
this.connect(this.handles.mute,"mouseout",function(e){
dojo.addClass(_33.handles.mute,"otherHTML5Player24 otherHTML5Player24-mute-16");
});
this.connect(this.handles.volume,"click",function(e){
_33.mute();
_33.handles.mute.focus();
dojo.attr(this.handles.volume,"aria-pressed",true);
});
this.connect(this.handles.volume,"mousedown",function(e){
e.preventDefault();
});
this.connect(this.handles.volume,"keypress",function(e){
if(e.keyCode==13){
_33.mute();
_33.handles.mute.focus();
dojo.attr(this.handles.volume,"aria-pressed",true);
e.preventDefault();
}else{
if(e.keyCode==9){
if(!e.shiftKey){
if(dojo.isIE){
dojo.byId(_33.nextId).focus();
}else{
_33.handles.focusOnVolume.focus();
}
}else{
_33.handles.focusOnSeekContainer.focus();
}
e.preventDefault();
}
}
});
this.connect(this.handles.focusOnVolume,"keypress",function(e){
if(e.keyCode==13){
_33.mute();
_33.handles.mute.focus();
dojo.attr(this.handles.focusOnVolume,"aria-pressed",true);
e.preventDefault();
}else{
if(e.keyCode==9){
if(!e.shiftKey){
if(dojo.isIE||!_33.allowFullScreen){
dojo.byId(_33.nextId).focus();
}else{
if(!_33.isFullScreen){
_33.handles.fullScreen.focus();
}else{
_33.handles.collapse.focus();
}
}
}else{
if(!_33.isMuted){
_33.handles.volume.focus();
}else{
_33.handles.mute.focus();
}
}
e.preventDefault();
}
}
});
this.connect(this.handles.mute,"click",function(e){
_33.unmute();
_33.handles.volume.focus();
dojo.attr(this.handles.mute,"aria-pressed",true);
});
this.connect(this.handles.mute,"mousedown",function(e){
e.preventDefault();
});
this.connect(this.handles.mute,"keypress",function(e){
if(e.keyCode==13){
_33.unmute();
_33.handles.volume.focus();
dojo.attr(this.handles.mute,"aria-pressed",true);
e.preventDefault();
}else{
if(e.keyCode==9){
if(!e.shiftKey){
if(dojo.isIE){
_33.nextId.focus();
}else{
_33.handles.focusOnVolume.focus();
}
}else{
_33.handles.focusOnSeekContainer.focus();
}
e.preventDefault();
}
}
});
this.connect(_33.handles.volSlide,"mouseover",function(e){
this.style.cursor="pointer";
});
this.connect(_33.handles.volSlide,"click",function(e){
var _34=e.pageX;
var _35=e.pageY;
var _36=dojo.position(_33.handles.volSlide,true);
if(_34>_36.x&&_34<(_36.x+_36.w)&&_35>_36.y&&_35<(_36.y+_36.h)){
var _37=(_34-_36.x)/_36.w;
if(_37<0.075){
_33.mute();
}else{
_33.isMuted=false;
if(_37>0.925){
_37=1;
}
_33.handles.html5vid.volume=_37;
if(this.isA11y){
var _38=Math.round(_37*10/2);
for(var i=0;i<_38;i++){
var _39=i+1;
dojo.byId("volume"+_39).style.display="block";
}
for(var i=_38;i<5;i++){
var _39=i+1;
dojo.byId("volume"+_39).style.display="none";
}
}
var _3a=_33.handles.html5vid.volume*_33.volumeWidth;
dojo.style(_33.handles.volumeSlideKnob,"width",_3a+"px");
dojo.style(_33.handles.mute,"display","none");
dojo.style(_33.handles.volume,"display","block");
}
}
});
},connectFullScreenListeners:function(){
var _3b=this;
this.fullscreenListeners.fullscreenchange=this.connect(document,"fullscreenchange",function(){
if(dojo.style(_3b.handles.html5vid,"width")>_3b.originalVideoWidth&&!document.fullScreen){
_3b.collapse();
_3b.disconnectFullScreenListeners();
}
});
this.fullscreenListeners.mozfullscreenchange=this.connect(document,"mozfullscreenchange",function(){
if(dojo.style(_3b.handles.html5vid,"width")>_3b.originalVideoWidth&&!document.mozFullScreen){
_3b.collapse();
_3b.disconnectFullScreenListeners();
}
});
this.fullscreenListeners.webkitfullscreenchange=this.connect(document,"webkitfullscreenchange",function(){
if(dojo.style(_3b.handles.html5vid,"width")>_3b.originalVideoWidth&&!document.webkitIsFullScreen){
_3b.collapse();
_3b.disconnectFullScreenListeners();
}
});
},disconnectFullScreenListeners:function(){
if(this.fullscreenListeners.fullscreenchange){
this.disconnect(this.fullscreenListeners.fullscreenchange);
this.fullscreenListeners.fullscreenchange=null;
}
if(this.fullscreenListeners.mozfullscreenchange){
this.disconnect(this.fullscreenListeners.mozfullscreenchange);
this.fullscreenListeners.mozfullscreenchange=null;
}
if(this.fullscreenListeners.webkitfullscreenchange){
this.disconnect(this.fullscreenListeners.webkitfullscreenchange);
this.fullscreenListeners.webkitfullscreenchange=null;
}
},connectPosterEventListeners:function(){
var _3c=this;
var _3d=dojo.byId("HTML5PosterBackground");
this.connect(_3d,"click",function(){
dojo.destroy(_3d);
_3c.play();
});
},playVideo:function(_3e,_3f,_40,_41,_42,_43,_44,_45){
var _46=_41*0.75;
_41<=300?this.isMini=true:this.isMini=false;
this.prevId=_43;
this.nextId=_44;
if(_45!==undefined){
this.allowFullScreen=_45;
}
this.loadStyles();
this.handles.videoWrapper=dojo.create("div",{className:"HTML5VideoWrapper",id:"HTML5VideoWrapper_"+this.id,style:{width:_41+"px",height:_46+"px",position:"relative"}},_3e);
this.handles.html5vid=dojo.create("video",{className:"HTML5Video",id:"HTML5Video_"+this.id,tabIndex:"-1",width:_41+"px",height:_46+"px"},this.handles.videoWrapper);
var _47=dojo.create("source",{src:_3f,type:"video/mp4"},this.handles.html5vid);
this.handles.poster=dojo.create("div",{className:"HTML5VideoPosterWrapper",id:"HTML5VideoPosterWrapper_"+this.id,style:{width:"100%",height:"100%",position:"absolute"}},this.handles.videoWrapper);
if(_40){
var _48=dojo.create("img",{className:"HTML5VideoPosterImage",id:"HTML5VideoPosterImage_"+this.id,src:_40,style:{height:"auto",width:"auto",maxHeight:"100%",maxWidth:"100%",display:"block",margin:"auto"}},this.handles.poster);
}
var _49="otherHTML5Player24 otherHTML5Player24-play-overlay-lg";
var _4a="otherHTML5Player24 otherHTML5Player24-play-overlay-lg-hover";
var _4b=64;
if(this.isMini){
_49="otherHTML5Player16 otherHTML5Player16-play-overlay-sm";
_4a="otherHTML5Player16 otherHTML5Player16-play-overlay-sm-hover";
_4b=36;
}
var _4c=(_41/2)-(_4b/2)+"px";
var _4d=(_46/2)-(_4b/2)+"px";
this.handles.playOverlayWrapper=dojo.create("div",{className:"HTML5VideoPosterPlayWrapper",id:"HTML5VideoPosterPlayWrapper_"+this.id,style:{position:"absolute",left:_4c,top:_4d,cursor:"pointer"}},this.handles.poster);
this.handles.playOverlay=dojo.create("img",{className:"HTML5VideoPosterPlay "+_49,id:"HTML5VideoPosterPlay_"+this.id,style:{height:_4b+"px",width:_4b+"px",display:"block"}},this.handles.playOverlayWrapper);
this.handles.playOverlay_hover=dojo.create("img",{className:"HTML5VideoPosterPlay_hover "+_4a,id:"HTML5VideoPosterPlay_hover_"+this.id,style:{height:_4b+"px",width:_4b+"px",display:"none"}},this.handles.playOverlayWrapper);
this.handles.controlBar=dojo.create("div",{className:"HTML5VideoControlWrapper",id:"HTML5VideoControlWrapper_"+this.id,style:{width:_41+"px"}},this.handles.videoWrapper);
var _4e=dojo.create("div",{className:"HTML5VideoControlsLeft HTML5VideoColumn",id:"HTML5VideoControlsLeft_"+this.id},this.handles.controlBar);
if(this.isA11y){
this.handles.playButton=dojo.create("a",{title:this.nls.videoPlayer.playButton,href:"javascript:;",alt:"Play",role:"button",className:"HTML5VideoPlay HTML5VideoControls otherHTML5Player24 otherHTML5Player24-play-16",id:"HTML5VideoPlay_"+this.id,innerHTML:this.nls.videoPlayer.playButton},_4e);
dojo.attr(this.handles.playButton,"aria-label","Play");
dojo.attr(this.handles.playButton,"aria-pressed",true);
}else{
this.handles.playButton=dojo.create("a",{title:this.nls.videoPlayer.playButton,href:"javascript:;",alt:"Play",role:"button",className:"HTML5VideoPlay HTML5VideoControls otherHTML5Player24 otherHTML5Player24-play-16",id:"HTML5VideoPlay_"+this.id},_4e);
dojo.attr(this.handles.playButton,"aria-label","Play");
dojo.attr(this.handles.playButton,"aria-pressed",true);
}
if(this.isA11y){
this.handles.pauseButton=dojo.create("a",{title:this.nls.videoPlayer.pauseButton,href:"javascript:;",alt:"Pause",role:"button",className:"HTML5VideoPause HTML5VideoControls otherHTML5Player24 otherHTML5Player24-pause-16",id:"HTML5VideoPause_"+this.id,innerHTML:this.nls.videoPlayer.pauseButton},_4e);
dojo.attr(this.handles.pauseButton,"aria-label","Pause");
}else{
this.handles.pauseButton=dojo.create("a",{title:this.nls.videoPlayer.pauseButton,href:"javascript:;",alt:"Pause",role:"button",className:"HTML5VideoPause HTML5VideoControls otherHTML5Player24 otherHTML5Player24-pause-16",id:"HTML5VideoPause_"+this.id},_4e);
dojo.attr(this.handles.pauseButton,"aria-label","Pause");
}
this.handles.rightColumn=dojo.create("div",{className:"HTML5VideoControlsRight HTML5VideoColumn",id:"HTML5VideoControlsRight_"+this.id},this.handles.controlBar);
this.handles.currentTime=dojo.create("span",{title:this.nls.videoPlayer.currentTimeDisplay,className:"HTML5VideoCurrentTime HTML5VideoText",id:"HTML5VideoCurrentTime_"+this.id,innerHTML:"--:--"},this.handles.rightColumn);
this.handles.controlsLineBreak=dojo.create("div",{className:"HTML5VideoControlsLineBreak",id:"HTML5VideoControlsLineBreak_"+this.id},this.handles.rightColumn);
this.handles.durationTime=dojo.create("span",{title:this.nls.videoPlayer.timeDuration,className:"HTML5VideoDuration HTML5VideoText",id:"HTML5VideoDuration_"+this.id,innerHTML:"--:--"},this.handles.rightColumn);
if(this.isA11y){
this.handles.volume=dojo.create("a",{title:this.nls.videoPlayer.volumeButton,href:"javascript:;",alt:"Mute",role:"button",className:"HTML5VideoVolume HTML5VideoControls otherHTML5Player24 otherHTML5Player24-volume-16",id:"HTML5VideoVolume_"+this.id,innerHTML:this.nls.videoPlayer.volumeButton},this.handles.rightColumn);
dojo.style(this.handles.volume,"display","block");
dojo.attr(this.handles.volume,"aria-label","Mute");
}else{
this.handles.volume=dojo.create("a",{title:this.nls.videoPlayer.volumeButton,href:"javascript:;",alt:"Mute",role:"button",className:"HTML5VideoVolume HTML5VideoControls otherHTML5Player24 otherHTML5Player24-volume-16",id:"HTML5VideoVolume_"+this.id},this.handles.rightColumn);
dojo.attr(this.handles.volume,"aria-label","Mute");
}
if(this.isA11y){
this.handles.mute=dojo.create("a",{title:this.nls.videoPlayer.muteButton,href:"javascript:;",alt:"Unmute",role:"button",className:"HTML5VideoMute HTML5VideoControls otherHTML5Player24 otherHTML5Player24-mute-16",id:"HTML5VideoMute_"+this.id,innerHTML:this.nls.videoPlayer.muteButton},this.handles.rightColumn);
dojo.attr(this.handles.mute,"aria-label","Unmute");
}else{
this.handles.mute=dojo.create("a",{title:this.nls.videoPlayer.muteButton,href:"javascript:;",alt:"Unmute",role:"button",className:"HTML5VideoMute HTML5VideoControls otherHTML5Player24 otherHTML5Player24-mute-16",id:"HTML5VideoMute_"+this.id},this.handles.rightColumn);
dojo.attr(this.handles.mute,"aria-label","Unmute");
}
if(!dojo.isIE&&this.allowFullScreen){
if(this.isA11y){
this.handles.fullScreen=dojo.create("a",{title:this.nls.videoPlayer.fullScreenButton,href:"javascript:;",role:"button",alt:"Enter full screen mode",className:"HTML5VideoFullScreen HTML5VideoControls otherHTML5Player24 otherHTML5Player24-fullscreen-16",id:"HTML5VideoFullScreen_"+this.id,innerHTML:this.nls.videoPlayer.fullScreenButton},this.handles.rightColumn);
dojo.style(this.handles.fullScreen,"display","block");
dojo.attr(this.handles.fullScreen,"aria-label","Enter full screen mode");
}else{
this.handles.fullScreen=dojo.create("a",{title:this.nls.videoPlayer.fullScreenButton,href:"javascript:;",role:"button",alt:"Enter full screen mode",className:"HTML5VideoFullScreen HTML5VideoControls otherHTML5Player24 otherHTML5Player24-fullscreen-16",id:"HTML5VideoFullScreen_"+this.id},this.handles.rightColumn);
dojo.attr(this.handles.fullScreen,"aria-label","Enter full screen mode");
}
if(this.isA11y){
this.handles.collapse=dojo.create("a",{title:this.nls.videoPlayer.collapseButton,href:"javascript:;",role:"button",alt:"Exit full screen mode",className:"HTML5VideoCollapse HTML5VideoControls otherHTML5Player24 otherHTML5Player24-collapse-16",id:"HTML5VideoCollapse_"+this.id,innerHTML:this.nls.videoPlayer.collapseButton},this.handles.rightColumn);
dojo.attr(this.handles.collapse,"aria-label","Exit full screen mode");
}else{
this.handles.collapse=dojo.create("a",{title:this.nls.videoPlayer.collapseButton,href:"javascript:;",role:"button",alt:"Exit full screen mode",className:"HTML5VideoCollapse HTML5VideoControls otherHTML5Player24 otherHTML5Player24-collapse-16",id:"HTML5VideoCollapse_"+this.id},this.handles.rightColumn);
dojo.attr(this.handles.collapse,"aria-label","Exit full screen mode");
}
}
this.handles.volumeBar=dojo.create("div",{title:this.nls.videoPlayer.volumeBar,className:"HTML5VideoVolumeBar",id:"HTML5VideoVolumeBar_"+this.id},this.handles.rightColumn);
this.handles.focusOnVolume=dojo.create("a",{className:"HTML5OnFocus",href:"javascript:;",role:"slider",style:"width:100%;height:100%;display:block"},this.handles.volumeBar);
this.handles.focusOnVolume.setAttribute("aria-label","volume slider");
this.handles.volSlide=dojo.create("div",{className:"HTML5VideoVolSlide",id:"HTML5VideoVolSlide_"+this.id},this.handles.focusOnVolume);
this.handles.volumeSlideKnob=dojo.create("div",{className:"HTML5VideoVolumeKnob",id:"HTML5VideoVolumeKnob_"+this.id},this.handles.volSlide);
if(this.isA11y){
var _4f=dojo.create("div",{id:"volume1",className:"",style:{position:"absolute",marginLeft:"5.2px"},innerHTML:"|"},this.handles.volSlide);
var _50=dojo.create("div",{id:"volume2",className:"",style:{position:"absolute",marginLeft:"10.4px"},innerHTML:"|"},this.handles.volSlide);
var _51=dojo.create("div",{id:"volume3",className:"",style:{position:"absolute",marginLeft:"15.6px"},innerHTML:"|"},this.handles.volSlide);
var _52=dojo.create("div",{id:"volume4",className:"",style:{display:"none",position:"absolute",marginLeft:"20.8px"},innerHTML:"|"},this.handles.volSlide);
var _53=dojo.create("div",{id:"volume5",className:"",style:{display:"none",position:"absolute",marginLeft:"26px"},innerHTML:"|"},this.handles.volSlide);
}else{
var _4f=dojo.create("div",{className:"HTML5VideoVolumeWindow"},this.handles.volSlide);
var _54=dojo.create("div",{className:"HTML5VideoVolumeDivider",style:{marginLeft:"3px"}},this.handles.volSlide);
var _50=dojo.create("div",{className:"HTML5VideoVolumeWindow",style:{marginLeft:"5px"}},this.handles.volSlide);
var _55=dojo.create("div",{className:"HTML5VideoVolumeDivider",style:{marginLeft:"8px"}},this.handles.volSlide);
var _51=dojo.create("div",{className:"HTML5VideoVolumeWindow",style:{marginLeft:"10x"}},this.handles.volSlide);
var _56=dojo.create("div",{className:"HTML5VideoVolumeDivider",style:{marginLeft:"13px"}},this.handles.volSlide);
var _52=dojo.create("div",{className:"HTML5VolumeWindow",style:{marginLeft:"15px"}},this.handles.volSlide);
var _57=dojo.create("div",{className:"HTML5VideoVolumeDivider",style:{marginLeft:"18px"}},this.handles.volSlide);
var _53=dojo.create("div",{className:"HTML5VideoVolumeWindow",style:{marginLeft:"20px"}},this.handles.volSlide);
var _58=dojo.create("div",{className:"HTML5VideoVolumeDivider",style:{marginLeft:"23px"}},this.handles.volSlide);
var _59=dojo.create("div",{className:"HTML5VideoVolumeWindow",style:{marginLeft:"25px"}},this.handles.volSlide);
}
this.handles.centerColumn=dojo.create("div",{className:"HTML5VideoControlsCenter HTML5VideoColumn",id:"HTML5VideoControlsCenter_"+this.id},this.handles.controlBar);
this.handles.focusOnSeekContainer=dojo.create("a",{className:"HTML5OnFocus",role:"slider",href:"javascript:;",style:"width:100%;height:100%;display:block"},this.handles.centerColumn);
this.handles.focusOnSeekContainer.setAttribute("aria-label","video slider");
this.handles.seekContainer=dojo.create("div",{title:this.nls.videoPlayer.scrubBar,className:"HTML5VideoSlider HTML5VideoControls",id:"HTML5VideoSlider_"+this.id},this.handles.focusOnSeekContainer);
this.handles.bufferBar=dojo.create("div",{className:"HTML5VideoBuffer",id:"HTML5VideoBuffer_"+this.id},this.handles.seekContainer);
this.handles.seekBar=dojo.create("div",{className:"HTML5VideoKnob",id:"HTML5VideoKnob_"+this.id},this.handles.seekContainer);
if(this.isA11y){
var _5a=dojo.style(this.handles.seekContainer,"width");
var _5b=Math.floor(_5a/4.16);
var _5c=dojo.create("div",{id:"BarDiv"},this.handles.seekBar);
dojo.empty("BarDiv");
for(var i=1;i<=_5b;i++){
var _5d=4.16*i;
dojo.create("div",{id:"bar"+i,className:"",style:{position:"absolute",marginLeft:_5d+"px",display:"none"},innerHTML:"|"},_5c);
}
}
this.connectVideoEventListeners();
this.connectControlEventListeners();
this.connectVolumeEventListeners();
this.play();
}});
}


;if(!dojo._hasResource["lconn.share.widget.FileDateFormatter"]){
dojo._hasResource["lconn.share.widget.FileDateFormatter"]=true;
(function(){
dojo.provide("lconn.share.widget.FileDateFormatter");
















dojo.declare("lconn.share.widget.FileDateFormatter",[dijit._WidgetBase],{profileName:{},date:"",isUpdated:false,showBizCard:false,i18n:{},postCreate:function(){
this.inherited(arguments);
var _1=(this.isUpdated)?this.i18n.nls_dateFormatFileModified:this.i18n.nls_dateFormatFileCreated;
var _2=new lconn.share.util.DateFormat(dojo.date.stamp.fromISOString(this.date)).formatByAge(_1);
var _3=lconn.core.url.rewrite(lconn.core.url.getServiceUrl(lconn.core.config.services.profiles)+"/html/profileView.do",{userid:this.profileName.id});
var _4=dojox.html.entities.encode(this.profileName.name);
var _5=lconn.core.util.text.trimToLength(_4,45);
if(this.showBizCard){
dojo.addClass(this.domNode,"vcard");
var _6="<a class=\"fn url\" href=\""+_3+"\" aria-label=\""+dojo.string.substitute(this.i18n.nls_profile,[_4])+"\">"+_5+"</a><span class=\"x-lconn-userid\" style=\"display: none;\">"+this.profileName.id+"</span>";
dojo.html.set(this.domNode,dojo.string.substitute(_2,{user:_6}));
if(window.SemTagSvc!==undefined){
setTimeout(dojo.hitch(this,function(){
SemTagSvc.parseDom(null,this.domNode);
}),500);
}else{
console.warn("Object \"SemTagSvc\" not found. Business Card not available.");
}
}else{
if(!this.suppressUserLink){
var _7="<a href=\""+_3+"\" aria-label=\""+dojo.string.substitute(this.i18n.nls_profile,[_4])+"\">"+_5+"</a>";
dojo.html.set(this.domNode,dojo.string.substitute(_2,{user:_7}));
}else{
dojo.html.set(this.domNode,_2.replace("${user}",_5));
}
}
}});
}());
}


;if(!dojo._hasResource["ic-share.fileviewer.ConnectionsFileViewer"]){
dojo._hasResource["ic-share.fileviewer.ConnectionsFileViewer"]=true;
dojo.provide("ic-share.fileviewer.ConnectionsFileViewer");






































dojo.requireLocalization("ic-share.fileviewer","FileViewerStrings");
















(function(_1){
"use strict";
var _2=define._modules["ic-share/fileviewer/FileViewer"],_3=dojo.getLocalization("ic-share.fileviewer","FileViewerStrings"),_4,_5,_6;
_1.openFromId=function(_7,_8){
var _9,id;
_9=_1.create(_8);
id=_9.addFile(_7);
var _a=new dojo.Deferred();
_9.on("success",function(){
_a.resolve(_9);
});
_9.on("error",function(_b){
if(_a.isFulfilled()){
return;
}
if(!_8||!_8.preventLoginRedirect){
if(_9._args.isAuthenticated()){
if(_b.code==="Unauthenticated"){
_c();
}
}else{
if(_b.code==="Unauthenticated"||_b.code==="AccessDenied"){
lconn.core.auth.login();
}
}
}
_a.reject(_b);
});
_9.open(id);
return _a;
};
function _c(){
var _d=_3.LOST_AUTHENTICATION_DIALOG;
var _e=dojo.string.substitute(_d.PROMPT,{lineBreaks:"<br/><br/>"});
lconn.core.DialogUtil.prompt(_d.DIALOG_TITLE,_e,_d.OK,_d.CANCEL,function(_f){
if(_f){
lconn.core.auth.login();
}
});
};
_1.openFromUrl=function(url,_10){
var id=define._modules["ic-core/util/connectionsUrlUtil"].getFileId(url);
_1.openFromId(id,_10);
};
_1.create=function(_11){
var _12={},_13=dojo.getObject("com.ibm.lconn.layout.people"),_14=dojo.getObject("SemTagSvc");
if(!_11){
_11={};
}
if(_11.createPersonLink){
_12.createPersonLink=_11.createPersonLink;
}else{
if(_13){
_12.createPersonLink=function(_15){
return _13.createLink(_15);
};
}
}
if(_11.createPersonPhotoLink){
_12.createPersonPhotoLink=_11.createPersonPhotoLink;
}
if(_11.previewOptions){
_12.previewOptions=_11.previewOptions;
}
if(_14){
_12.attachBizCard=function(_16){
dojo.addClass(_16,"vcard");
dojo.addClass(_16,"bidiAware");
_14.onTagChanged(_16,true);
};
}
_12.formatDateByAge=function(_17,_18){
var _19=new lconn.share.util.DateFormat(_17);
return _19.formatByAge(_18);
};
var _1a=dojo.i18n.getLocalization("ic-share.fileviewer","FileViewerStrings").FILE_SIZE;
if(!_1a.B){
_1a.B="${0} B";
_1a.KB="${0} KB";
_1a.MB="${0} MB";
_1a.GB="${0} GB";
_1a.TB="${0} TB";
}
dojo.mixin(_12,{login:lconn.core.auth.login,htmlSubstitute:lconn.core.util.html.substitute,isAuthenticated:lconn.core.auth.isAuthenticated,formatSize:dojo.partial(lconn.share.util.text.formatSize,_1a),properties:lconn.core.config.properties,currentUser:_11.currentUser||lconn.core.auth.getUser()||{},TextBoxWidget:lconn.core.lcTextArea.widgets.BasicTextBox,MentionsDataFormatter:lconn.core.widget.mentions.MentionsDataFormatter,PeopleTypeAhead:lconn.core.PeopleTypeAhead,HybridPeopleDataStoreOpenSocial:lconn.core.HybridPeopleDataStoreOpenSocial,TypeAheadDataStore:lconn.core.TypeAheadDataStore,TagTypeAhead:lconn.share.widget.TagTypeAhead,pickerAuth:lconn.core.auth,coreServices:lconn.core.config.services,coreUrl:lconn.core.url,network:lconn.share.util.Network,textUtil:lconn.share.util.text,validationUtil:lconn.share.util.validation,configUtil:lconn.share.util.configUtil,tracker:com.ibm.lconn.layout.track,loadCurrentUser:_11.loadCurrentUser,tornOff:!!_11.tornOff,isIframePage:!!_11.isIframePage,baseFilesConfig:_22(),layer2:function(){
if(_5){
return _5;
}
_5=new dojo.Deferred();
net.jazz.ajax.xdloader.batch_load_async(["lconn.files.FilesRoutes","lconn.files.comm.Routes","lconn.files.action.impl.AddToCollection","lconn.files.action.impl.MoveToCollection","lconn.files.action.impl.CopyFile","lconn.files.util.LibraryDataStore","lconn.files.util.TagDataStore","lconn.files.util.HtmlMessage"],function(){
_5.resolve({pickerRoutes:dojo.getObject("lconn.files.FilesRoutes"),commRoutes:dojo.getObject("lconn.files.comm.Routes"),addToCollection:dojo.getObject("lconn.files.action.impl.AddToCollection"),moveToCollection:dojo.getObject("lconn.files.action.impl.MoveToCollection"),copyFileAction:dojo.getObject("lconn.files.action.impl.CopyFile"),LibraryDataStore:dojo.getObject("lconn.files.util.LibraryDataStore"),TagDataStore:dojo.getObject("lconn.files.util.TagDataStore"),pickerNLS:dojo.i18n.getLocalization("lconn.files","ui")});
});
return _5;
}});
_12.policy=_11.policy||{};
_12.showErrorInOverlay=_11.showErrorInOverlay;
_12.linkTarget=_11.linkTarget;
_12.openedFromFileViewerEverywhere=_11.openedFromFileViewerEverywhere;
if(_11.showDetailsExternalAction){
_12.showDetailsExternalAction=_11.showDetailsExternalAction;
}
return _2.create(_12);
};
_1._openForFiles=function(_1b){
var _1c=_1.create(_1b),_1d;
dojo.forEach(_1b.allFiles||[_1b.initialFile],function(_1e){
if(!_1e.isFolder()){
try{
_1e._urlDetails=lconn.core.url.ensureQualified(_1b.getUrlForPersonalFileInCommunity(_1e));
}
catch(e){
}
if(_1b.showDetailsExternalAction){
_1e.showDetailsExternalAction=_1b.showDetailsExternalAction;
}
var id=_1c.addFile(_2.createConnectionsFile(_1e));
if(_1b.initialFile.getId()===_1e.getId()){
_1d=id;
}
}
});
_1c.open(_1d);
var _1f=dojo.getObject("lconn.core.globalization.bidiUtil");
if(_1f){
lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage(_1c.impl.domNode);
}
};
function _20(){
if(!_4){
var _21=/etag=([^&]+)/.exec(dojo.getObject("net.jazz.ajax.config.params"));
_4=(_21&&_21[1])||"17";
}
return _4;
};
function _22(){
if(_6){
return _6;
}
if(window._lconn_files_config){
_6=dojo.when(window._lconn_files_config);
}else{
_6=dojo.xhrGet({url:"/files/static/"+_20()+"!en-us/iwidgets/CommunityReferentialWidget/core.js",handleAs:"javascript"}).then(function(){
return window._lconn_files_config;
});
}
return _6;
};
if(!window._fidoStylesLoaded){
setTimeout(function(){
var _23=lconn.core.url.getServiceUrl(lconn.core.config.services.webresources);
dojo.create("link",{rel:"stylesheet",href:_23+"/web/_style?include=ic-share.fileviewer.style.connections.css&etag="+_20()},document.getElementsByTagName("head")[0]);
},1);
}
dojo.getObject("lconn.share.fileviewer",true);
lconn.share.fileviewer.ConnectionsFileViewer=_1;
}(window["ic-share"].fileviewer.ConnectionsFileViewer));
}


;if(!dojo._hasResource["lconn.share.action.impl.fileViewer"]){
dojo._hasResource["lconn.share.action.impl.fileViewer"]=true;
(function(){
dojo.provide("lconn.share.action.impl.fileViewer");




var _1=window["ic-share"].fileviewer.ConnectionsFileViewer;
lconn.share.action.impl.fileViewer.addFileViewer=function(){
var _2=lconn.share.action.impl.FilePreviewDialog.prototype.execute;
function _3(_4,_5){
var _6={document:_4,sceneInfo:{id:"lconn.files.scenes.FilePreview"},fileId:_4.getId(),app:_5};
dojo.publish("lconn/share/scene/render",[_6,{}]);
};
lconn.share.action.impl.FilePreviewDialog.prototype.execute=function(_7){
try{
if(lconn.share.action.impl.fileViewer.isCCM(_7)){
if(!lconn.core.config.features("fileviewer-ccm-preview")){
return _2.apply(this,arguments);
}
}else{
_3(_7,this.app);
}
_1._openForFiles({initialFile:_7,allFiles:this.feedItems,policy:this.app&&this.app.authenticatedUser&&this.app.authenticatedUser.policy,getUrlForPersonalFileInCommunity:dojo.hitch(this,"getUrlForPersonalFileInCommunity"),showDetailsExternalAction:this.showDetailsExternalAction});
}
catch(e){
if(dojoConfig.isDebug){
console.log("Exception caught while instantiating file viewer; debug mode enabled; throwing error to top level so it can be inspected.",e);
throw e;
}else{
console.log("Exception caught while instantiating file viewer; falling back to lightbox.",e);
}
}
};
lconn.share.action.impl.fileViewer.isCCM=function(_8){
return (_8.getLibraryType()==="library");
};
};
})();
}


;if(!dojo._hasResource["lconn.share.util.IBMDocs.ViewerAPI"]){
dojo._hasResource["lconn.share.util.IBMDocs.ViewerAPI"]=true;
(function(){
"use strict";
dojo.provide("lconn.share.util.IBMDocs.ViewerAPI");






var _1=lconn.share.util.IBMDocs.ViewerAPI;
var _2=lconn.share.util.IBMDocs.ThumbnailConstants;
var _3=lconn.share.util.IBMDocs.ViewerRoutes;
_1.sendThumbnailBatchRequest=function(_4,_5,_6,_7){
var _8=[],_9=[],_a,_b,_c,_d;
if(!_4){
return;
}
if(!dojo.isArray(_4)){
_4=[_4];
}
if(!_1.canSendThumbnailBatchRequest(_4)){
return;
}
_2.validateSize(_5);
dojo.forEach(_4,function(_e){
if(!_e){
return;
}
_b=_1._getBatchThumbnailId(_e);
if(_b){
_8.push(_e);
_9.push(_b);
}
});
if(_9.length>0){
_d=_1._getRepositoryNameFromItems(_8);
_a=_9.join(",");
_c={url:_3.getThumbnailBatchURL(_3.serviceNames.ecm,_d,_5),content:{format:"json",vids:_a},handleAs:"json",load:dojo.hitch(_1,"_onThumbnailDataReceived",_8,_5,_6),error:_7};
return _1._get(_c);
}
};
_1.canSendThumbnailBatchRequest=function(_f){
if(!_f){
return false;
}
if(!dojo.isArray(_f)){
_f=[_f];
}
if(!lconn.core.auth.isAuthenticated()){
return false;
}
var _10=dojo.some(_f,function(_11){
return _1._getBatchThumbnailId(_11);
});
var _12=_3.canBuildViewerServiceURL();
var _13=!!(_1._getRepositoryNameFromItems(_f));
return _12&&_10&&_13;
};
_1._onThumbnailDataReceived=function(_14,_15,_16,_17){
if(!_17){
return;
}
_2.validateSize(_15);
var _18,_19;
dojo.forEach(_14,function(_1a){
_18=_1._getBatchThumbnailId(_1a);
if(_18 in _17){
_19=_17[_18];
_1a.setThumbnailData(_15,_1.buildImageBase64DataUri(_19.format,_19.stream));
}
});
if(_16){
_16(_14,_15,_17);
}
};
_1._getBatchThumbnailId=function(_1b){
if(_1b.getBatchThumbnailId){
return _1b.getBatchThumbnailId();
}
};
_1._getRepositoryNameFromItems=function(_1c){
var _1d;
dojo.some(_1c,function(_1e){
var _1f=_1e.getRepositoryName&&_1e.getRepositoryName();
if(_1f){
_1d=_1f;
}
return _1f;
});
return _1d;
};
_1.buildImageBase64DataUri=function(_20,_21){
return "data:image/"+_20+";base64,"+_21;
};
_1._get=function(_22){
return dojo.xhrGet(_22);
};
}());
}

dojo.provide("lconn.share.nls.FileThumbnail")._built=true;
dojo.provide("lconn.share.nls.FileThumbnail.en_us");
lconn.share.nls.FileThumbnail.en_us={"ft_unpinned":"Not pinned","ft_mainThumbnail":"thumbnail picture for the item number ${0}","ft_dateFormatFileCreatedMonth":"${user} created on ${date}","ft_lockedByMe":"Locked by me","ft_dateFormatFileModifiedFull":"${date_long} ${time_long}","ft_dateFormatFileCreatedYesterday":"${user} created yesterday at ${time}","ft_draftRejected":"Rejected","ft_mainThumbnailFolder":"folder icon for the item number ${0}","ft_private":"Private","ft_sharedCommunity":"Community","ft_changeToPinned":"Pin this file","ft_pressToChange1":"currently pinned, press to remove from your pinned files","ft_pressToChange2":"currently not pinned, press to pin this file","ft_pressToChange3":"currently not selected, press to select file","ft_pressToChange4":"currently selected, press to deselect file","ft_locked":"Locked","ft_folder_changeToChecked":"Select folder","ft_folder_changeToUnchecked":"Deselect folder","ft_dateFormatFileCreatedDay":"${user} created on ${date}","ft_dateFormatFileModifiedToday":"Updated today at ${time} by ${user}","ft_createFile":"Create File","ft_sharedExternally":"Shared externally","ft_changeToUnchecked":"Deselect file","ft_summary":"View file details","ft_checked":"Selected","ft_dateFormatFileModifiedYear":"Updated on ${date_long} by ${user}","ft_unchecked":"Not selected","ft_dateFormatFileModifiedDay":"Updated on ${date} by ${user}","ft_folder_changeToPinned":"Pin this folder","ft_folder_pressToChange1":"currently pinned, press to remove from your pinned folders","ft_folder_pressToChange2":"currently not pinned, press to pin this folder","ft_dateFormatFileCreatedFull":"${date_long} ${time_long}","ft_folder_pressToChange3":"currently not selected, press to select folder","ft_folder_pressToChange4":"currently selected, press to deselect folder","ft_dateFormatFileCreatedToday":"${user} created today at ${time}","ft_preview":"Preview","ft_download":"Download","ft_edit":"Edit","ft_folder_changeToUnpinned":"Remove from your pinned folders","ft_mainControls":"controls for the item number ${0}, file name ${1}","ft_backAuthor":"${0}. Click here to view the profile. Press control-enter to view the business card","ft_dateFormatFileModifiedMonth":"Updated on ${date} by ${user}","ft_folder_summary":"View folder details","ft_dateFormatFileModifiedYesterday":"Updated yesterday at ${time} by ${user}","ft_draftReview":"Draft in Review","ft_pinned":"Pinned","ft_openFolder":"Open folder ${0}","ft_changeToChecked":"Select file","ft_sync":"Enabled for sync","ft_changeToUnpinned":"Remove from your pinned files","ft_mainControlsFolder":"controls for the item number ${0}, folder name ${1}","ft_draft":"Draft","ft_previewOffice":"View file","ft_dateFormatFileCreatedYear":"${user} created on ${date_long}","ft_shared":"Shared","ft_view":"View","ft_public":"Public"};
dojo.provide("lconn.files.nls.ui")._built=true;
dojo.provide("lconn.files.nls.ui.en_us");
lconn.files.nls.ui.en_us={"SIZE":{"B":"${0} B","MB":"${0} MB","KB":"${0} KB","GB":"${0} GB"},"APP":{"ERRORS":{"DEFAULT":{"MESSAGE":"Click the browser back button to return to the previous page and try again.  If this error persists, report the problem to your administrator.","TITLE":"We are unable to process your request"},"UNABLE_TO_LOGIN":{"ACT_OUT":"Log Out","TITLE":"Unable to log in","MESSAGES":"An error occurred when logging in to Files.  Please try again or contact your administrator.","ACCESS_DENIED_MESSAGE":"You do not have permission to access this page.  If someone sent you this link, check to see if you have the correct permission.","ACCESS_DENIED_TITLE":"Access Denied"},"INVALID_USER":{"ACT_OUT":"Log Out","TITLE":"Access to IBM Connections is restricted","MESSAGES":"You do not have permission to use IBM Connections.  If this is unexpected or incorrect, report the problem to your administrator.   "},"LOGIN":{"ACT":"Log In","TITLE":"Log In Now","MESSAGES":"Certain portions of Files can only be accessed when you are logged in.  You may browse anonymously, but this page will not be visible until you authenticate."},"DUPLICATE_USER":{"ACT_OUT":"Log Out","TITLE":"Your account has changed","MESSAGES":"You cannot access IBM Connections because your login information has changed. Contact your administrator about resolving this issue.   "}}},"MOVE_TO_TRASH":{"ACTION_TOOLTIP_X":"Put the selected files in the trash","ACTION_DISABLED":"Move to Trash button is disabled","ACTION":"Move to Trash","ACTION_ENABLED":"Move to Trash button is enabled","ACTION_TOOLTIP":"Put this file in the trash"},"DOWNLOAD_INFO":{"SHOW_PEOPLE":"See who has downloaded...","VERSION":{"MONTH":"Version ${0} on ${date}","TODAY":"Version ${0} at ${time}","YESTERDAY":"Version ${0} yesterday","DAY":"Version ${0} on ${date}","YEAR":"Version ${0} on ${date}"},"FILE":{"V_LATEST":"You have the latest version of this file","V_LATEST_NO_DOWNLOAD":"You have accessed the latest version of this file.","ERROR":"Unable to load download information","V_OLDER":"You last downloaded version ${0} of this file","LOADING":"Loading...","EMPTY":"Anonymous users only"},"PAGE":{"ERROR":"Unable to load file view information","LOADING":"Loading...","EMPTY":"Anonymous users only"}},"COPY_FILE":{"ALT_EDIT":"Remove","NAME_HEADER":"File name:","DIALOG_TITLE":"Give Copy to Community","WARN_INVALID_CHARS_IN_NAME":"File names may not contain the following characters: \\ / : * ? \" \x3c \x3e |","WARN_LONG_TAGS":"The specified tags are too long.","COMMUNITY_HEADER":"Community:","WARN_FILE_EXISTS":"A file with that name already exists.","ERROR_QUOTA_VIOLATION":"The file could not be copied because of space restrictions.  To copy this file, ${0} of files or versions would have to be removed.","WARN_NO_FILENAME":"File name is a required field.","TRIM_LONG_FILENAME":"Shorten file name?","WARN_LONG_TAG":"The tag \'${0}\' is too long.","INFO_SUCCESS":"Successfully copied ${link} to community ${community_link}.","TRIM_TAGS":"Shorten tags?","NAME_LABEL_TITLE":"File name","ACTION_TOOLTIP":"Give a copy of this file to a community","OK":"Copy","TRIM_TAG":"Shorten tag?","COMMUNITY_LABEL":"Community:","ERROR_NOT_LOGGED_IN":"The file could not be copied because you were not logged in.  Click \'Copy\' to add this file.","NAME_LABEL":"File name:","WARN_QUOTA_VIOLATION":"The file is larger than the available space. The copy will fail unless ${0} of files or versions are removed.","ACTION_LONG":"Give Copy to Community...","FILE_ALREADY_EXISTS":"A file with the same name already exists. Please choose a different file name.","ERROR":"The file could not be copied.  Please try again later.","FILE_DOES_NOT_EXIST":"This file does not exist. ","ERROR_TIMEOUT":"The file could not be copied because the server could not be contacted.  Click \'Copy\' to try again.","REQUIRED_MARK":"* Required","WARN_NO_COMMUNITY_SELETED":"Type a community name, and then click the community to copy the file to. ","TAGS_LABEL":"Tags:","ERROR_DETAILS_LINK":"Details...","INFO_SUCCESS_PRE_MODERATION":"The file ${name} has been copied to community ${community_link} for review and will be available when approved.","ERROR_DETAILS_TOOLTIP":"Show more details about this error","FIX_INVALID_CHARS_IN_NAME":"Replace invalid characters with \'_\'?","WARN_LONG_FILENAME":"The name is too long.","ERROR_CANCEL":"The file could not be copied because the request was cancelled.  Click \'Copy\' to try again.","TAGS_HEADER":"Tags:","ERROR_FILENAME_INVALID_CHARACTERS":"The file name may not contain the characters: % & \\ \"","ACTION":"Give Copy to Community","ERROR_MAX_CONTENT_SIZE":"The file could not be copied because it is larger than the maximum allowed file size of ${0}","CANCEL":"Cancel","REQUIRED_FIELD":"Required field","ERROR_ACCESS_DENIED":"You do not have permission to edit this file."},"ZIP_DOWNLOAD":{"DIALOG_TITLE":"Download as Compressed File","GLOBAL":"Global (default)","ACTION_DISABLED":"Download button is disabled","QUESTION":"Please select the language your file names will display in when they are downloaded as a compressed file:","ACTION_TOOLTIP_1":"Download the selected file","REMEMBER":"Use this setting for all future compressed downloads","NOTE":"Change this setting only if you are experiencing problems viewing the file names. The language you select will be applied to all file names in the compressed file.","ACTION_TOOLTIP_X":"Download the selected files as a compressed file","ACTION":"Download","FILES":{"T":"Download all of the files in the current view as a compressed file","L":"Download All Files"},"ACTION_ENABLED":"Download button is enabled","BUSY":"Downloading...","CANCEL":"Cancel","OK":"Download","SHARED_FILES":{"T":"Download shared files as a compressed file","L":"Download shared files"},"COLLECTION":{"T":"Download all files in this folder as a compressed file","L":"Download This Folder"}},"A11Y_MANAGER_ADDED":"Selected ${0} as an owner","EXTERNAL_WARNING":"External","INVITE_SHARE":{"PARTIAL":"Some invitations were sent and content was shared, but one or more errors occured and the content was not shared with all guests.","SUCCESS":"Guest invitations were sent and content was shared.","NOUSERS":"No emails were selected to invite and share with.","NOTFOUND_SINGLE":"The file was deleted and could not be shared.","NOTFOUND_MULTI":"${0} files were deleted and could not be shared.","FAILURE":"One or more errors occured inviting guests and sharing content with them.","NOITEMS":"Invitations were sent, but no items were selected to be shared."},"FILEPICKER":{"PUBLIC_FILES":{"TEXT":"${company} Files"},"BREADCRUMB":{"ROOT":{"FOLDERS_SHARED_WITH_ME":"Folders Shared With Me","MY_FOLDERS":"My Folders"},"PREFIX":{"ADD_TO":"Add to:","MOVE_TO":"Move to:"}},"COMPACT":{"UPLOAD":"Upload","RADIO_LABEL_1":"Select where you want to pick the file from.","INSERT_LINKS":{"SAVE":"Insert Links"},"SHARE_AS_EDITOR_COMMUNITY":"Allow community members to edit the selected files","MY_FILES":{"ALT_X":"Select files from your My Files view.","NAME":"My Files","ALT_1":"Select file from your My Files view.","HEADER":{"DESCRIPTION":"Insert links to files and share with members."}},"NESTED_FOLDER":{"MY_FILES":{"ALT_X":"Select files from your My Files view.","NAME":"Files","ALT_1":"Select file from your My Files view.","HEADER":{"DESCRIPTION":"Insert links to files and share with members."}}},"THIS_COMMUNITY":{"ALT_X":"Select files from this community.","NAME":"This Community","ALT_1":"Select file from this community.","HEADER":{"DESCRIPTION":"Insert link to files."}},"RADIO_LABEL_X":"Select where you want to pick the files from.","ADD_TO_COMMUNITY_FOLDER":{"HEADER":{"DESCRIPTION":"Select the files you want to add to the ${0}. Files that are currently in another community folder will be moved to the ${1}."}},"WARNING":{"PUBLIC":"Files shared with this community will become public."},"HEADER":{"DESCRIPTION_LABEL":"Choose files from: "},"MY_COMPUTER":{"ALT_X":"Select files from your computer.","NAME":"My Computer","ALT_1":"Select file from your computer.","HEADER":{"DESCRIPTION":{"FILES":"Upload selected files to My Files and insert links to them.","COMMUNITY":"Upload selected files to this community and insert links to them."}}}},"MY_FILES":{"EMPTY_PUBLIC":"You have not uploaded any files that are shared with everyone in your organization.","EMPTY_EXTERNAL":"You have not uploaded any files that can be shared outside of your organization.","TEXT":"My Files","EMPTY":"You have not uploaded any files."},"SEARCH_SCOPED":"Filter this list...","NEXT_T":"Next page","SELECTED_0":"No files selected","PREVIOUS_T":"Previous page","SELECTED_1":"1 file selected","PINNED_COLLECTIONS":{"ERROR":"An error has occurred","TEXT":"Pinned Folders","EMPTY":"None available"},"PAGE":"Page","PAGING_BOTTOM_LABEL":"Paging options","EXTERNAL_ALT":"Shared externally","ERROR_NEVER_LOGGED_IN":"This person has never logged in to Files.","LIBRARY":{"EXPIRED":"This library is not available because you do not have access or you must log in to view content."},"SHARED_COLLECTIONS":{"ERROR":"An error has occurred","EMPTY":"None available","TEXT":"Folders Shared With Me"},"WARN_PUBLIC_X":"Files shared with this community will become public.","LOADING":"Loading...","COLLECTION":{"EMPTY_PUBLIC":"No files were found.","EMPTY":"No files were found."},"UNSELECTABLE_SHAREABLE_ONLY":"You are not able to share this file.","COUNT2":"Showing ${0}-${1}","NO_FOLDERS":"No folders here!","SEARCH":"Filter","POSITION":"You are in: ","EMPTY":"None available","SEARCH_ALL_LINK":"Filter all files.","UNSELECTABLE":"This file cannot be selected.","PINNED_FILES":{"EMPTY_PUBLIC":"You have not pinned any files that is shared with everyone in your organization.","EMPTY":"You have not pinned any files.","TEXT":"Pinned Files"},"ERROR_CANCEL":"The request was cancelled.","UNSELECTABLE_PUBLIC_ONLY":"This file is not shared with everyone in your organization.","SELECTED_X":"${0} files selected","COUNT_ALT":"Showing files ${0} through ${1} of ${2}","UNSHAREABLE_FILE":"Only the file owner can add this file to a folder.","ERROR_UNAUTHENTICATED":"You must log in again.","OTHER_FILES":{"NO_RESULTS":"No results found for \'${0}\'","EMPTY_PUBLIC":"This person has not uploaded any files.","DESCRIPTION":"To view another person\'s files, type a name in the search field above.","EMPTY":"This person has not shared any files with you.","TEXT":"Other People\'s Files","SEARCH_HINT":"Name or email..."},"EXTERNAL":"Shared externally","ELLIPSIS":"...","SEARCH_EMPTY":"No results were found.","PAGING_TOP_LABEL":"Paging","PAGE_ALT":"Page ${0} of ${1}","COMMUNITY_FILES":{"TOOLTIP":"Files in this community","EMPTY2":"There are no files for this view.","LIBRARY":{"EMPTY":"There are no files for this library."},"EMPTY":"There are no files for this community.","TEXT":"Community Files"},"MY_COLLECTIONS":{"ERROR":"An error has occurred","EMPTY":"None available","TEXT":"My Folders"},"DIALOG_TITLE_DEFAULT":"Select Files","UNSELECTABLE_NOT_EXTERNAL":"This file cannot be shared with people outside of your organization.","ERROR":"An error has occurred.","SEARCH_ALL":"Filter all files...","ERROR_TIMEOUT":"The server could not be contacted.","COUNT":"${0}-${1} of ${2}","SEARCH_CANCEL":"Clear filter","NEXT":"Next","RECENT_FILES":{"RECENTLY_UPLOADED":"Your Recent Uploads","RECENTLY_SHARED":"Recently Shared With Me","TEXT":"Recent Files","VIEW_MORE":"View More"},"WARN_PUBLIC_1":"File shared with this community will become public.","PREVIOUS":"Previous","SHARED_FILES":{"EMPTY_PUBLIC":"No file that is shared with everyone in your organization have been shared with you.","EMPTY":"No files have been shared with you.","TEXT":"Shared With Me"}},"APP_NAME_TITLE_BAR_LABEL":"Navigate to home page of Files app","LEGEND":"* Required","JAVASCRIPT_DISABLED":{"0":"JavaScript has been disabled in your web browser. Files requires JavaScript in order to function. Once you have enabled Javascript in your browser, refresh the page.","1":"Refresh the page to continue."},"ABOUT_FILE":{"ADDED":"Created: ","TIMES_DOWNLOADED":"Downloads: ","SIZE":"Size: ","TIMES_RECOMMENDED":"Likes: ","TOTAL_SIZE_HINT":"${0} (${1} including all versions)","DOWNLOADS":"${0} (${1} anonymously)","NO_DOWNLOADS":"None","DOWNLOADED_BY":"Downloaded by: ","PREVIEW_LINK":"Link to preview image:","DOWNLOADED_LINK":"Link to this file:","SECURITY_LABEL":"Security:","ENCRYPT_FILE":"File content is encrypted. Encrypted file content is not searchable. File content cannot be viewed and cannot be edited with IBM Docs.","TIMESTAMP":{"MONTH":"${EEEE}, ${date} by ${user}","TODAY":"${EEEE}, Today at ${time} by ${user}","YESTERDAY":"${EEEE}, Yesterday at ${time} by ${user}","DAY":"${EEEE}, ${date} by ${user}","YEAR":"${EEEE}, ${date_long} by ${user}","FULL":"${EEEE}, ${date_long} ${time_long} by ${user}"},"TITLE":"About this File","CONTENTS":"File contents updated:","LINK":"More information","UPDATED":"Any update: ","DESCRIPTION":"Description:","NO_DESCRIPTION":"There is no description for this file."},"LOCK_FILE":{"ERROR_CANCEL":"The file could not be locked because the request was cancelled. Please try again.","STATUS":"Locking...","INFO_SUCCESS":"The file is now locked.","ACTION":"Lock File","ERROR":"The file could not be locked. Please try again later.","ERROR_ALREADY_LOCKED":"This file was already locked.","ACTION_TOOLTIP":"Lock this file","ERROR_TIMEOUT":"The file could not be locked because the server could not be contacted. Please try again.","ERROR_ALREADY_LOCKED_BY_USER":"This file was already locked by ${user} on ${date_long} ${time_long}.","ERROR_ACCESS_DENIED":"You do not have access to lock this file.","ERROR_NOT_LOGGED_IN":"The file could not be locked because you were not logged in. Please log in and try again.","ERROR_NOT_FOUND":"The file could not be locked because it has been deleted or is no longer shared with you."},"ADD_ITEM":{"ACTION":"Add","ACTION_TOOLTIP":"Create a new file or folder or share one with this community","COLLECTION_ACTION_TOOLTIP":"Create a file or folder in this folder","DISABLED_ACTION_TOOLTIP":"You don\'t have permission to create content in this folder"},"MAKE_PRIVATE":{"ACTION":"Remove public access","ACTION_TOOLTIP":"Remove your organization\'s access"},"A11Y_EDITOR_ADDED":"Selected ${0} as an editor","ADD_TAGS":{"ACTION_TOOLTIP_X":"Add tags to the selected files","ACTION_DISABLED":"Add Tags button is disabled","ACTION":"Add Tags","ACTION_ENABLED":"Add Tags button is enabled","ACTION_TOOLTIP":"Add tags to this file"},"SESSION_TIMEOUT_CUSTOM":"Your SmartCloud session has timed out. Click OK to log back in or Cancel to close this dialog. \n\nNote: If you click OK, unsaved changes you have made will be lost.","TAGLIST":{"ALL":"all","ERROR":"Error loading tags","NEXT_T":"Next page","ERROR_REQUEST_CANCELLED":"Tags could not be loaded because the request was cancelled.","VIEW_AS":"View as","PREVIOUS_T":"Previous page","POPUPTITLE":"All Tags","EMPTY":"No tags found","CLOUD_TITLE":"View a tag cloud of the most popular tags.","NEXT":"Next","PAGING_BOTTOM_LABEL":"Paging options","CLOUD":"cloud","SHOW_MORE":"Show less popular tags","PREVIOUS":"Previous","PAGING_TOP_LABEL":"Paging","NO_TAGS":"No tags found","LIST_TITLE":"View a list of the most popular tags.","ALL_TITLE":"View all tags.","ERROR_REQUEST_TIMEOUT":"Tags could not be loaded because the server could not be contacted.","LOADING":"Loading...","LIST":"list"},"DRAG_DROP":{"TITLE":"Drop files anywhere to upload","DESCRIPTION":"Drag and drop files from your desktop directly into the browser to upload to Files"},"LOADING":"Loading...","SHARE_COLLECTION":{"ACTION_LONG":"Share...","ACTION":"Share","ACTION_TOOLTIP":"Give others access to this folder"},"APP_LOAD_BLURB":"Please wait while the application loads...","ABOUT_PAGE":{"TIMESTAMP":"${EEEE}, ${date_long} ${time_long} by ${user}"},"PREVIEWFILE":{"ACTION":"Preview","ACTION_TOOLTIP":"Files Preview Page","NAME":"Preview"},"ERROR_COLON":"Error:","CONTINUE_LOGIN_TITLE":"You have logged in","MOVE_FILE":{"DIALOG_TITLE":"Move to...","WARN_PUBLIC":"Adding the selected file to this folder will make the file public (shared with everyone).","CROSS_COMMUNITY_MOVE_NOT_ALLOWED":"The file cannot be moved the a folder in another community.","INFO_SUCCESS_1":"The file was moved to ${target}.","CANNOT_MOVE_PERSONALFILE_TO_COMMUNITYFOLDER":"You cannot move a personal file into a community folder.","ACTION_LONG":"Move to...","COLLECTION_TYPE_MISSMATCH":"It is not allowed to move personal file to community owned folder or move community owned file to personal folder.","SOURCE_PARENT_NOT_FOUND":"The folder that contains the file you want to move does not exist any more.","CANNOT_MOVE_COMMUNITYFILE_TO_PERSONALFOLDER":"You cannot move a community file into a personal folder.","ERROR":"The file was not moved to ${target} due to an error.","ITEM_NOT_FOUND_IN_SOURCE_PARENT":"The selected file does not exist in the source folder any more.","ITEM_NOT_FOUND":"The selected file does not exist any more.","INFO":"Moving the file will cause other people to lose access to the file.","TARGET_PARENT_NOT_FOUND":"The target folder you want to move to does not exist any more.","EXTERNAL_COLLECTION":"The file was not moved into this folder because the folder can be shared outside of your organization and the file cannot.","ACTION":"Move to","ACCESS_DENIED":"You do not have permission to move file to the selected folder.","BUSY":"Moving...","ACTION_TOOLTIP":"Move this file","CANCEL":"Cancel","OK_MOVE_HERE":"Move Here","SOURCE_NOT_MOVEABLE":"The selected file cannot be moved.","OK":"Move","WARNING":"${item} is in the ${collection} folder. Some people will lose access to this file if you remove it."},"DELETE_SHARE":{"ACTION":"Remove share","ACTION_TOOLTIP_PERSON":"Remove all shares with ${0}","ACTION_TOOLTIP":"Remove all shares with this person"},"STOP_RESHARING":{"ACTION":"Remove my previous shares...","ACTION_TOOLTIP":"Remove shares you have previously made"},"SHARE_INFO":{"PROPAGATE_TITLE":"Disabling this option will prevent others from sharing this file or adding it to a private folder.","ERROR":"Unable to load share information","SHOW_INVOLVED":"Show more details...","SHOW_GRAPH":"See Who Has Shared...","PAGE":{"DOWNLOADED_CURRENT":"${0} has viewed the most recent version of this file.","DOWNLOADED_NEVER":"${0} has not yet viewed this file.","DOWNLOADED_OLDER":"${0} has viewed an older version of this file."},"PROPAGATE_SUCCESS_ON":"Other people can now share this file","NO_SHARES":"No shares on this file","PROPAGATE_ERROR":"The sharing for this file could not be changed due to an error.  Please try again later.","PROPAGATE_OTHER":"Only the owner can share this file","FILE":{"DOWNLOADED_CURRENT":"${0} has downloaded the most recent version of this file.","DOWNLOADED_NEVER":"${0} has not yet downloaded this file.","DOWNLOADED_OLDER_ALT":"An older version","DOWNLOADED_CURRENT_ALT":"Most recent version","DOWNLOADED_OLDER":"${0} has downloaded an older version of this file.","DOWNLOADED_NEVER_ALT":"Never downloaded"},"LOADING":"Loading...","PROPAGATE_SUCCESS_OFF":"Only the owner can share this file","PROPAGATE_LABEL":"Allow others to share this file","SHOW_ALL":"Hide details"},"WARNING_ACCESS_MESSAGE":"You do not have permission to access this page. If someone sent you this link, check to see if you have the correct permission.","ORGNAME_DEFAULT":"My organization","USERSEARCH":{"SEARCH_USERS_BUTTON":"Search","PERSON_SOURCE":"a Person","GROUP_HINT_TEXT":"Group name...","USER_EMAIL":"Email","INACTIVE":"(inactive)","ERROR_LINK":"Search for People","TITLE_BLURB":"Need to find someone\'s files?  Enter their name or email address in the search field, below.  As you type, we\'ll show you a list of possible matches. If you can\'t find the person you are searching for in the list, just click the Search button to see a list of all the possible matches in the directory.","INVITATION_TIP":"Entry must be an email address","NO_MATCHES":"No matches","SEARCH_DIRECTORY":"Person not listed? Use full search...","NO_RESULTS":"No results for \'${0}\'","TITLE":"Search Results","INVITATION":"Share using email address","QUERY_TOO_SHORT":"Enter a longer search query to view results","PERSON_HINT_TEXT":"Person name or email...","GROUP_SOURCE":"a Group","LOADING":"Loading...","USER_NAME":"Name"},"MENUBAR":{"HELP":"Help","HELP_TITLE":"Help"},"A11Y_CONTRIBUTOR_ADDED":"Selected ${0} as a contributor","A11Y_EDITOR_REMOVED":"Removed ${0} as an editor","ADD_FILES_TO_FILESYNC":{"ERROR_X":"${count} files were not added to Sync due to errors.","DIALOG_TITLE":"Add Files","INFO_SUCCESS_1":"Sync is enabled for ${item}. Large files might take a few moments before appearing on your computer.","ACTION_X":"Add to Sync","ERROR_1_NOT_LOGGED_IN":"${item} was not added to Sync because you were not logged in. Please log in and try again.","INFO_SUCCESS":"${0} was added to Sync.","OK_TITLE":"Add the selected files to Sync","ACTION_TOOLTIP":"Add to Sync","ERROR_1":"${item} was not added to Sync due to an error.","ERROR_1_TIMEOUT":"${item} was not added to Sync because the server could not be contacted.","OK":"Add Files","ERROR_1_EXISTS":"Cannot add ${item} because Sync already includes a different file with that name.","ACTION_LONG":"Add Files...","INFO_SUCCESS_X":"${count} files were added to Sync.","ERROR_1_ACCESS_DENIED":"${item} was not added to Sync because you do not have permission to add this file.","ACTION_ENABLED_X":"Add Files button is enabled","ERROR_1_NOT_FOUND":"${item} already has been added to Sync.","STATUS":"Adding...","ACTION_TOOLTIP_X":"Add ${0} files to Sync","ACTION":"Add Files","ERROR_X_CANCEL":"Some files might not have been added to Sync because the request was cancelled. ","BUSY":"Adding...","CANCEL":"Cancel","ACTION_DISABLED_X":"Add Files button is disabled","ERROR_1_CANCEL":"${item} cannot be added to Sync because the request was cancelled."},"DELETE_ATTACHMENT":{"ACTION":"Delete","ACTION_TOOLTIP":"Delete this attachment"},"TIPS":{"P1":"You can collaborate with colleagues by sharing files with them. To share a file, click the file name in any list and then click Share. ","OLDER":"Older","HIDE_TIPS":"Hide Tips","ERROR":"Unable to load help","H":"Share important content with your colleagues","NEWER":"Newer"},"ALERT":{"DIALOG_TITLE":"Alert","BUSY":"Busy...","OK":"OK"},"ADD_FILES_TO_COLLECTION":{"ACTION_LONG":"Add Files...","ACTION":"Add Files","ACTION_TOOLTIP":"Add files to this folder"},"STOP_SHARING_FILE":{"ACTION":"Stop Sharing this File","ACTION_TOOLTIP":"Remove all shares for this file and remove from all shared folders or folders that are visible to everyone in your organization"},"INVITE_DIALOG":{"DIALOG_TITLE":"Content Was Not Shared","MESSAGE_0":"The following users do not have an account and no content was shared with them.","MESSAGE_1":"Invite these users as guests to share the content with them.","BUSY":"Please wait...","CANCEL":"Cancel","OK":"Proceed with invitations"},"JAVASCRIPT_DISABLED_REGION":"Warning messages for JavaScript have been disabled in your web browser.","REPLACE_FILE":{"ACTION_LONG":"Upload New Version...","ACTION":"Upload New Version","ACTION_TOOLTIP":"Update the contents of this file"},"EXTERNAL_WARNING_COLON":"External:","SCENE_TITLE_FOLDER":"Folder: ${0}","WINDOWTITLE":{"WELCOME":"Welcome to Files","OFFLINE":"Offline","STATISTICS":"Files Metrics","PAGESHOME":"${0}","OFFLINEERROR":"Error","NORMAL":"${0} - ${1}","FINDPEOPLE":"Search Results","LOGIN":"Log in","COLLECTIONERROR":"Error","FILEERROR":"Error","ABOUT":"About Files","FOLDER":"${0} - Folder","WHATSNEW":"Recent Updates","COLLECTIONS":"Folders","FAQ":"Help","USERCHANNEL":"${0}","PAGEERROR":"Error","DOCUMENTHOME":"${0}","TOOLS":"Tools","FILE":"${0} - File","USERHOMEERROR":"Error"},"SCENE_TITLE_TOOLTIP":"Click to refresh the page ","LOGIN":{"ACTION":"Log In and Start Sharing!","ACTION_TOOLTIP":"Log in to upload and share files, comment, and create folders."},"INVITE_GUEST_NO_INVITE":"You cannot share with others as a guest. The following people were not shared with: ${0}","BACK_TO_PARENT_COLLECTIONS":"Back to parent folders: ${0}","BACK_TO_MY_COLLECTIONS":"Back to my folders","EDIT_FILESYNC_PREFERENCE":{"DIALOG_TITLE":"Preferences","PIN_FILE":"When I pin a file","ERROR_1_NOT_LOGGED_IN":"The preferences were not saved because you were not logged in. Please log in and try again.","INFO_SUCCESS":"The preferences were saved successfully.","OK_TITLE":"Enable Sync automatically.","ACTION":"Edit Preferences","CANCEL":"Cancel","ERROR_1":"The preferences were not saved due to an error.","ADD_FILE":"When I add a file to My Files","ACTION_TOOLTIP":"Edit Preferences to enable or disable adding files to Sync automatically.","OK":"OK","ERROR_1_TIMEOUT":"The preferences were not saved because the server could not be contacted.","ADD_TO_FILE_SYNC_AUTOMATICALLY":"Add to Sync automatically:"},"VIEWS":{"DETAILS":"List","DETAILS_TOOLTIP":"Include the description and social metadata for each file","SUMMARY":"Customizable","GRID":"Grid View","SUMMARY_TOOLTIP":"Fully customizable display of information about each file","CUSTOMIZE_SUMMARY":"Customize","GRID_TOOLTIP":"Show thumbnails in a grid format.","CUSTOMIZE_SUMMARY_TOOLTIP":"Change the columns displayed below"},"COLLECTION_PICKER":{"BREADCRUMB":{"PREFIX":{"ADD_TO":"Add to:","MOVE_TO":"Move to:"},"ROOT":{"MY_FOLDERS":"My Folders","SHARED_WITH_ME":"Shared With Me","PINNED":"Pinned","RECENT":"Recent"}},"COMPACT":{"RADIO_LABEL_WITH_CREATE_FOLDER_X":"Create a new folder, or select where you want to pick the folders from.","CREATE_FOLDER":{"NAME":"Create Folder"},"MY_FOLDERS":{"NAME":"Share from Files"},"RADIO_LABEL_1":"Select where you want to pick the folder from.","INSERT_LINKS":"Insert Links","COMMUNITY_FOLDER":{"NO_ITEM_MSG":"There are no folders for this view.","TOOLTIP":"Folders in this community","TITLE":"Community Folders","NAME":"This Community","DESCRIPTION":"Community-owned items can only be added/moved to community-owned folders."},"RADIO_LABEL_X":"Select where you want to pick the folders from.","RADIO_LABEL_WITH_CREATE_FOLDER_1":"Create a new folder, or select where you want to pick the folder from.","HEADER":{"DESCRIPTION_LABEL":"Choose folders from:"}},"RECENTLY_UPDATED":{"TEXT":"Recently Updated Folders","EMPTY":{"READER":{"PRIVATE":"There are no private folders available.","PUBLIC":"There are no available folders visible to everyone in your organization.","ANY":"There are no folders available."},"CONTRIBUTOR":{"PRIVATE":"There are no private folders you can add files to.","PUBLIC":"There are no folders you can add files to that are shared with you.","ANY":"There are no folders you can add files to."},"MANAGER":{"PRIVATE":"There are no private folders you own.","PUBLIC":"There are no folders you own that are visible to everyone in your organization.","ANY":"There are no folders you own."}}},"SEARCH_SCOPED":"Filter these folders...","NEXT_T":"Next page","UNSELECTABLE_NOT_EDITOR":"You are not an editor of this folder.","PREVIOUS_T":"Previous page","SELECTED_0":"No folders selected","SELECTED_1":"1 folder selected","PAGE":"Page","RECENT_COLLECTIONS":{"TOOLTIP":"Created ${0} by ${1}"},"PAGING_BOTTOM_LABEL":"Paging options","EXTERNAL_ALT":"Shared externally","UNSELECTABLE_PRIVATE_ONLY":"This folder cannot be selected because it is not shared with you.","ERROR_NEVER_LOGGED_IN":"This person has never logged in to Files.","ALL_FILES":"All Community Files","SHARED_COLLECTIONS":{"TEXT_TREE_RENDERER":"Shared with Me","TEXT":"Folders Shared With Me","EMPTY":{"READER":{"PRIVATE":"No private folders have been shared with you yet.","PUBLIC":"No folders have been shared with you yet.","ANY":"No folders have been shared with you yet."},"CONTRIBUTOR":{"PRIVATE":{"ADD":"There are no private folders shared with you that you can add files to.","MOVE":"There are no private folders shared with you that you can move files or folders to."},"PUBLIC":"There are no folders that have been shared with you that you can add files to.","ANY":{"ADD":"There are no folders shared with you that you can add files to.","MOVE":"There are no folders shared with you that you can move files or folders to."}},"MANAGER":{"PRIVATE":"No private folders have been shared with you as an owner.","PUBLIC":"No folders have been shared with you as an owner.","ANY":"No folders have been shared with you as an owner."}}},"LOADING":"Loading...","PUBLIC_COLLECTIONS":{"TEXT":"${company} Folders","EMPTY":{"READER":"There are no folders visible to everyone in your organization.","CONTRIBUTOR":"There are no folders visible to everyone in your organization that you can add files to.","MANAGER":"There are no folders visible to everyone in your organization that you own."}},"UNSELECTABLE_NOT_CONTRIBUTOR":"You are not a contributor for this folder.","NO_FOLDERS":"No folders here!","SEARCH":"Filter","EMPTY":"None available","UNSELECTABLE":"This folder cannot be selected.","SEARCH_ALL_LINK":"Filter all folders.","ERROR_CANCEL":"The request was cancelled.","UNSELECTABLE_PUBLIC_ONLY":"This folder cannot be selected because it is not shared with you.","SELECTED_X":"${0} folders selected","COUNT_ALT":"Showing folders ${0} through ${1} of ${2}","ERROR_UNAUTHENTICATED":"You must log in again.","RECENT_FOLDERS":{"TEXT_TREE_RENDERER":"Recent","TEXT":"Recent Folders","VIEW_MORE":"View More"},"EXTERNAL":"Shared externally","ELLIPSIS":"...","FAVORITE_COLLECTIONS":{"TEXT_TREE_RENDERER":"Pinned","TOOLTIP":"Created ${0} by ${1}","TEXT":"Pinned Folders","EMPTY":{"READER":{"PRIVATE":"You have not pinned any private folders yet.","PUBLIC":"You have not pinned any folders visible to everyone in your organization yet.","ANY":"You have not pinned any folders yet."},"CONTRIBUTOR":{"PRIVATE":{"MOVE":"You do not have any private pinned folders you can move files or folders to.","ADD":"You do not have any private pinned folders you can add files to."},"PUBLIC":"You do not have any pinned folders visible to everyone in your organization you can add files to.","ANY":{"ADD":"You do not have any pinned folders you can add files to. ","MOVE":"You do not have any pinned folders you can move files or folders to. "}},"MANAGER":{"PRIVATE":"You do not have any private pinned folders you own.","PUBLIC":"You do not have any pinned folders visible to everyone in your organization you own.","ANY":"You do not have any pinned folders you own. "}}},"SEARCH_EMPTY":"No results were found.","PAGING_TOP_LABEL":"Paging","UNSELECTABLE_NOT_INTERNAL":"This folder cannot be selected because it can be shared outside of your organization.","PAGE_ALT":"Page ${0} of ${1}","RECENTLY_CONTRIBUTED":{"TEXT":"Folders I Recently Added To","EMPTY":{"READER":{"PRIVATE":"You have not added files to any private folders yet.","PUBLIC":"You have not added files to any folders that are shared with everyone in your organization.","ANY":"You have not added files to any folders yet."},"CONTRIBUTOR":{"PRIVATE":"You have not added files to any private folders yet.","PUBLIC":"You have not added files to any folders that are shared with everyone in your organization.","ANY":"You have not added files to any folders yet."},"MANAGER":{"PRIVATE":"You have not added files to any private folders you own yet.","PUBLIC":"You have not added files to any folders that are shared with everyone in your organization.","ANY":"You have not added files to any folders you own yet."}}},"MY_COLLECTIONS":{"TEXT":"My Folders","EMPTY":{"PRIVATE":"You have not created any private folders yet.","PUBLIC":"You have not created any folders that are visible to everyone in your organization yet.","EXTERNAL":"You do not have any folders that can be shared outside of your organization.","ANY":"You have not created any folders yet."}},"DIALOG_TITLE_DEFAULT":"Select Folders","UNSELECTABLE_NOT_EXTERNAL":"This folder cannot be shared with people outside of your organization.","ERROR":"An error has occurred.","SEARCH_ALL":"Filter all folders...","ERROR_TIMEOUT":"The server could not be contacted.","COUNT":"${0}-${1} of ${2}","UNSELECTABLE_NOT_MANAGER":"This folder cannot be selected because you do not own it.","SEARCH_CANCEL":"Clear filter","NEXT":"Next","PREVIOUS":"Previous","COMMUNITY_COLLECTIONS":{"COLLECTION_LONG_X":"${possessive}\' Folders","DESCRIPTION":"To view a community\'s folders, type a name in the search field above.","TEXT":"A Community\'s Folders","COLLECTION_LONG":"${possessive}\'s Folders","EMPTY":{"ANY":"You cannot add files to this community because either you do not have editor access to it or no folders exist in this community to add a file to."},"SEARCH_HINT":"Community name..."}},"WHATS_NEW":{"DATE":"${EEee}, ${MMMM} ${d}"},"NOTIFY_COLLECTION":{"UNSUBSCRIBE":{"ALL":"You have stopped following this folder."},"ERROR":"Your following settings on this folder were not changed due to an error.  Please try again.","SUBSCRIBE":{"ALL":"You are now following this folder."}},"A11Y_CONTRIBUTOR_REMOVED":"Removed ${0} as a contributor","COLUMN":{"CUSTOMIZE":{"FILE":{"G_FILEINFO":"File Properties","DEFAULTS":"Show Default Columns","G_INFO":"Number Of","G_PEOPLE":"People","G_OTHER":"Other","TITLE":"Customize File Columns","CANCEL":"Cancel","DESCRIPTION":"Select columns to display in lists of files.","OK":"Show","EMPTY":"No columns are available for this view.","G_DATES":"Dates"}},"FILE":{"PEOPLESHARED_L":"People the file is shared with","SIZE":"Size","PEOPLESHARED_M":"People shared with","ENCRYPTION":"Encrypted","VERSION_L":"The current version number","DELETED_L":"Date the file was deleted","VERSION_M":"Current version number","RECOMMENDATIONS_L":"Number of likes","NAME":"Name","COLLECTEDBY_L":"Person that added the file to the folder","COLLECTEDBY_M":"Added by","SIZE_L":"Size of the file contents","SIZE_M":"Size of current version","DELETEDBY":"Deleted By","ENCRYPTION_L":"Encryption status","ENCRYPTION_M":"Encryption","NAME_L":"The name of this file","TAGS":"Tags","COLLECTIONSSHARED":"Folders","VERSIONS":"Versions","TOTALSIZE":"Total Size","TAGS_L":"Tags","VERSIONS_L":"Number of saved versions","COLLECTED":"Added","DESCRIPTION_L":"Description","SHAREDWITH":"Shared With","LOCK":"Locked","ADDED_L":"Date the file was uploaded","MODIFIEDBY_L":"Person that last updated the file contents","MODIFIEDBY_M":"Updated by","TOTALSIZE_L":"Size of file including versions","TOTALSIZE_M":"Total size of all versions","PEOPLESHARED":"People","PRIVACY_L":"Who can see this file","COLLECTED_L":"Date the file was added to the folder","ADDEDBY":"Created By","VERSION":"Version","LOCK_L":"Lock status","SHAREDWITH_M":"Shared with","LOCK_M":"Lock","RECOMMENDATIONS":"Likes","COMMUNITYSHARED_L":"Date the file was shared with the community","COLLECTEDBY":"Added By","COMMENTS_L":"Number of comments on this file","ADDEDBY_L":"Person that uploaded this file","COMMUNITYSHAREDBY":"Shared By","SYSTEMMODIFIED_L":"Date when comments, shares, versions, tags, or contents changed.","ADDEDBY_M":"Created by","SYSTEMMODIFIED_M":"Any update","MODIFIED":"Updated","SHAREDBY_M":"Shared by","DOWNLOADS":"Views","COMMUNITYSHAREDBY_L":"Person that shared the file with the community","COMMUNITYSHAREDBY_M":"Shared by","MODIFIED_L":"Date the file contents were last updated","DOWNLOADS_L":"Number of file downloads and views","DESCRIPTION":"Description","DELETEDBY_L":"Person that deleted this file","DELETEDBY_M":"Deleted by","MODIFIEDBY":"Updated By","ADDED":"Created","SHARED":"Shared","COLLECTIONSSHARED_L":"Folders the file is in","PRIVACY":"Sharing","COMMUNITYSHARED":"Shared","SHARED_L":"Date the file was last shared ","COMMENTS":"Comments","SYSTEMMODIFIED":"Any Update","DELETED":"Deleted","SHAREDBY":"Shared By"},"COLLECTION":{"ADDED":"Created","ADDEDBY_L":"Person that created this folder","PRIVACY":"Sharing","UPDATED_L":"Date when a folder was last updated","NAME":"Name","ADDED_L":"Date the folder was created","COUNT":"Files","OWNER":"Owner","PRIVACY_L":"Who can see this folder","ADDEDBY":"Created By","NAME_L":"The name of this folder","UPDATED":"Updated","COUNT_L":"Number of files in this folder"},"COMMENT":{"ADDED":"Date","ADDED_L":"Date the comment was created"}},"QUOTA":{"ALERT_WARN_TRASH":"You have only ${2} remaining out of ${1}. If you need more room, empty your trash to reclaim ${3} or delete old versions and unused files.","INFO_OWNER":"How much space am I using?","POPUP_PERSONAL":{"UNLIMITED":"Unlimited","LABEL_QUOTA_EXCEEDED":"You are using ${size} more than the ${total} limit.","ERROR":"Unable to retrieve total file size at this time.","LABEL_QUOTA":"You have ${size} of free space remaining (${total} limit).","LABEL_CURRENT":"Current size:","NEVER_LOGGED_IN":"Your files do not exist.  Contact your administrator.","LABEL_UNLIMITED":"You are using ${size}.","TITLE":"Space used by your files","LABEL_MAX":"Maximum allowed:","LOADING":"Loading...","LABEL_REMAINS":"Available:","SORT_BY_TOTAL":"Sort by total size","LABEL_ERROR":"Your free space could not be retrieved, please try again later."},"POPUP_COMMUNITY":{"LABEL_QUOTA_EXCEEDED":"This community is using ${size} more than the ${total} limit.","LABEL_UNLIMITED":"This community is using ${size}.","LOADING":"Loading...","LABEL_QUOTA":"This community has ${size} of free space remaining (${total} limit).","SEE_DELETED":"View Trash","LABEL_ERROR":"The community free space could not be retrieved, please try again later."},"ALERT_OVER":"You are over the maximum size for your files.  You have used ${0} of the allowed ${1}.","INFO_COMMUNITY":"How much space is this community using?","ALERT_WARN":"You have only ${2} remaining out of ${1}. If you need more room, delete old versions or unused files.","LOTUSLIVE":{"REMOVED_SIZE":"Trashed Size: ${0}","HELP":"Help","REMAINED_SIZE":"${0} of ${1} remaining","LIBRARY_SIZE":"Library Size: ${0}","TOTAL_USED_SIZE":"Total Used: ${0}","TITLE":"File Storage","CLOSE":"Close","TOTAL_AVAIL_SIZE":"Total Available: ${0}","MAX_SIZE":"Maximum: ${0}"},"POPUP":{"UNLIMITED":"Unlimited","LABEL_QUOTA_EXCEEDED":"${person} is using ${size} more than the ${total} limit.","ERROR":"Unable to retrieve total file size at this time.","SEE_DELETED":"See this person\'s trash","LABEL_QUOTA":"${person} has ${size} of free space remaining (${total} limit).","LABEL_CURRENT":"Current size:","NEVER_LOGGED_IN":"This person has never logged in.","LABEL_UNLIMITED":"${person} is using ${size}.","TITLE":"Space used for files","LABEL_MAX":"Maximum allowed:","LOADING":"Loading...","LABEL_REMAINS":"Available:","LABEL_ERROR":"The information about free space could not be retrieved.","SORT_BY_TOTAL":"Sort by total size"},"INFO_ADMIN":"How much space is this person using?"},"CONTINUE_LOGIN_MESSAGE":"You have successfully logged in to IBM Connections.","CONTENT":{"USER_HAS_NO_PLACE":{"MSG1":"${0} has not been given permission to upload or create files."},"ERROR_REQUEST_UNKNOWN":"An unknown error has occurred.","NEXT_T":"Next page","EDIT":"Edit","LOCKED":"Locked","PREVIOUS_T":"Previous page","BOOLEAN_YES":"Yes","ERROR_REQUEST_TIMEOUT":"The server could not be contacted.","LOADING":"Loading... ","SHARE_INTENT":"Shared externally","FILE_TYPE":"File Type","REMOVE_DISCRIPTION":"Click to remove","TAG_TOOLTIP":"Filter by tag \'${0}\'","SEARCH_FILES_COMMUNITY_FILES":"Community Files","COUNT2":"Showing ${0}-${1}","SORTING_ASC_LONG":"Click to sort by ascending order according to ${0}","EMPTY":{"SEARCH_FILES":{"FILTERED_TAGS":"No search results found because no files match the selected tags.","NORMAL":"There are no files that match your search.","FILTERED":"There are no files that match your keyword and filters."},"COMMUNITY_FILES":{"FILTERED_TAGS":"There are no community files match your keyword with the tags you selected.","FILTERED":"There are no community files that match your keyword and filters.","NORMAL":"There are no community files. "},"DEFAULT":"There are no files from this person","MY_COLLECTIONS":{"FILTERED":"You have no folders that match your filters.","NORMAL":"You have not created any folders."},"MEDIA":{"FILTERED_TAGS":"There are no files from this person that have the tags you selected.","FILTERED":"There are no files from this person that match your filters.","NORMAL":"There are no files from this person."},"SHARED_BY_ME":{"FILTERED_TAGS":"None of the files you have shared have the tags you selected.","NORMAL":"There are no files shared by you.","FILTERED":"There are no files shared by you that match your filters."},"SYNCABLE_FILES":{"FILTERED_TAGS":"You have no synchronizable files with the selected tags.","NORMAL":"You have not synchronized any files yet.","FILTERED":"You have no synchronizable files matching these filters."},"PUBLIC_MEDIA":{"FILTERED_TAGS":"There are no files with the tags you selected.","FILTERED":"There are no files that match your filters.","NORMAL":"There are no files that are shared with your organization."},"DELETED_FILES":{"FILTERED":"There are no deleted files from this person that match your filters.","NORMAL":"There are no deleted files from this person."},"MY_MEDIA":{"FILTERED_TAGS":"You have no files matching the tags you selected.","NORMAL":"You have not uploaded any files.","FILTERED":"You have no files that match these filters."},"FAVORITE_COLLECTIONS":{"FILTERED":"There are no pinned folders that match your filters.","NORMAL":"Keep your frequently-used folders readily available by pinning them to this list. You can add any file to this list by clicking the pin icon ${icon}. ","SHORT":"Add frequently-used folders here by clicking the pin icon ${icon}."},"COLLECTIONS_PUBLIC":{"FILTERED":"There are no folders visible to everyone in your organization that match your filters.","NORMAL":"There are no folders visible to everyone in your organization."},"FAVORITE_FILES":{"FILTERED_TAGS":"You have no pinned files with the selected tags.","NORMAL":"Keep the files you are working on readily available by pinning them to this list.  You can add any file to this list by clicking the pin icon ${icon}.","FILTERED":"You have no pinned files matching these filters."},"COLLECTIONS":{"FILTERED":"There are no folders shared with you that match your filters.","NORMAL":"There are no folders shared with you."},"ALL_COLLECTIONS":{"NORMAL":"There are no folders.","FILTERED":"There are no folders that match your filters."},"SHARED_WITH_ME":{"FILTERED_TAGS":"None of the files shared with you have the tags you selected.","NORMAL":"There are no files shared with you.","FILTERED":"There are no files shared with you that match your filters."},"COLLECTION_CONTRIBUTOR":{"NORMAL":"To add a file to this folder,click \'Add Files\' or  open a file and click \'Add to Folders\'.","FILTERED":"There are no files in this folder that match your filters."},"COLLECTION":{"NORMAL":"There are no files in this folder.","FILTERED":"There are no files in this folder that match your filters."},"MY_DELETED_FILES":{"NORMAL":"There are no files in your trash.","FILTERED":"There are no files in your trash that match your filters."},"SEARCH_COLLECTIONS":{"NORMAL":"There are no folders that match your search."}},"TAGS_LABEL":"Tags: ","EMPTY_MENU":"No actions","FROM_A_COMMUNITY":"From a Community","REMOVE_FILTER_TOOLTIP":"Remove this filter","COUNT_ALT":"Showing items ${0} through ${1} of ${2}","OF_PAGES":"\xa0 of ${0}.","SECTION_COLLAPSED":"Collapsed section","GLOBAL_ACTIONS":"Global actions","HIDE":"Hide","SHOW_ALT":"Show ${0} items per page","SORTING_DESC_LONG":"Click to sort by descending order according to ${0}","ITEMS_PER_PAGE":" items per page","DOWNLOAD_ALT":"Download","VIEW_SELECTION":"Display:","MORE":"More","ERROR_MENU":"An error has occurred","PAGING_TOP_LABEL":"Paging","BOOLEAN_NO":"No","SEARCH_FOR_USER":{"MSG1":"Use the search box at the top of the page to search for a person and view their files. You can also log in to view your own files.     ","FILES":"Use the search box at the top of the page to search for a person and view their files. You can also log in to view your own files."},"OTHER_PEOPLE_FILE":"Other people who have shared this file","NO_DESCRIPTION":"No description provided","ONE_DOWNLOAD":"1","SHARE_TOOLTIP":"Allow others to read or edit this file","PRIVATE":"Private","SHARED":{"BASE":"Shared","MANY_1":"Shared with ${0}","ONE":"${0}","ONE_1":"Shared with 1","COMMUNITY":{"BASE":"Shared with anyone who can see this community","ALT":"Community"},"MANY":"${0}"},"SHARE_MESSAGE":{"LIST_SEP":",\xa0"},"PUBLIC":{"MANY_1":"shared with ${0}","BASE":"Visible to everyone in ${company}","WITH":{"MANY_1":"shared with ${0}","ONE":"Organization access and ${0}","ONE_1":"shared with 1","MANY":"Organization access and ${0}"},"ONE":"Organization access and ${0}","ONE_1":"shared with 1","MANY":"Organization access and ${0}"},"DOWNLOAD_TOOLTIP_ONE_COMMENT_COUNT_ONE":"${0} download, ${0} comment","FOLDER":{"ICON_TOOLTIP":{"PRIVATE":"A Private Folder","COMMUNITY":"A Community Folder","PUBLIC":"A Public Folder","SHARE":"A Shared Folder"}},"USER_HAS_NO_FILES":"There are no files from this person","NOT_LOGGED_IN":{"ACT_IN":"Log In","TITLE":"Log In Now","MESSAGES":"This feature can not be accessed until you are logged in."},"VIEW_SELECTION_CUSTOMIZE":"Customize","USER_NEVER_LOGGED_IN":{"MSG1":"${0} has never logged in to Files.","MSG2":"If you know people who haven\'t started using Files, it\'s easy to get them interested.  Just share a file with them!  They\'ll receive an email letting them know about your file and how to log in."},"DOWNLOAD_TOOLTIP_MANY_COMMENT_COUNT_MANY":"${0} downloads, ${0} comments","PLACE_NOT_FOUND":{"TITLE":"We can\'t find that person","MESSAGES":"The files for this person could not be loaded - click the back button and try again.  If this doesn\'t work the person may no longer be available."},"FILTERED_BY":"Matching: ","DOWNLOAD":"Download","CONTEXT_TITLE":"All actions for this file","DOWNLOAD_TOOLTIP_MANY_COMMENT_COUNT_ONE":"${0} downloads, ${0} comment","SORTING_DESC":"Click to sort by descending order","JUMP_TO_PAGE_ALT":"Jump to a page between ${0} and ${1}","EDIT_PAGE_ERROR":"The file could not be edited due to an error.","PAGE":"Page","MORE_LOAD":"Loading","DOWNLOAD_TOOLTIP_MANY":"${0} views","PAGING_BOTTOM_LABEL":"Paging options","PUBLIC_CAPPED":"Only the first ${0} files that is shared with everyone in your organization are shown here.  Filter or change your sort order to see other files.","REPLACE":"Replace","SORT_BY":"Sort by: ","SEARCH_FILES_ALL_FILES":"All Files","SHARED_FROM_FILES":"Shared from Files","RECOMMEND":"Like","NOHYPHENCOUNT":"${0} of ${1}","YOU_HAVE_NO_PLACE":{"MSG1":"You have not been given permission to upload or create files.  You may still view other people\'s files and collaborate on their files.     ","MSG2":"Administrators determine who is allowed to upload files.  Please contact your administrator if you should have this ability.     "},"SHOWING":"Showing ","VIEW":"View","DOWNLOAD_TOOLTIP_ONE":"${0} view","SHARE_PAGE_TOOLTIP":"Allow others to read or edit this file","HIDE_EXTRA":"Hide extra information","SEARCH_FILES_PERSONAL_FILES":"Personal Files","REMOVE_ITEM_ALT":"Remove ${0}","TAGGED_WITH":"Tagged with \'${0}\' ","DOWNLOAD_TOOLTIP_ONE_COMMENT_COUNT_MANY":"${0} download, ${0} comments","USER_HAS_NO_PAGES":"There are no files from this person","JUMP_TO_PAGE":"Jump to page \xa0","ERROR_REQUEST_CANCELLED":"The request was cancelled.","DOWNLOADS":"${0}","ELLIPSIS":"...","CONTEXT_TITLE_FILE":"Actions for the file ${0}","VIEW_EXTRA":"View more information","CONTEXT_ALT":"Actions","PAGE_ALT":"Page ${0} of ${1}","SEARCH_FILES_SHOW":"Filter by: ","REMOVE_FILTER_ALT":"Remove","REVERT":"Restore","ERROR":"An unknown error has occurred.","LOCKED_BY_YOU":"Locked by you","ERROR_REQUEST_UNAUTHENTICATED":"You must log in again.","COUNT":"${0}-${1} of ${2}","SHARE_INTENT_T":"Shared externally","NEXT":"Next","SECTION_EXPANDED":"Expanded section","MORE_ACTIONS":"More Actions","SORTING_ASC":"Click to sort by ascending order","PREVIOUS":"Previous","SHOW":"Show ","USERERROR":"The person you have requested is no longer available or has been removed from the directory."},"REMOVE_FROM_HIDDEN_COLLECTIONS":{"ACTION":"Remove","ACTION_TOOLTIP":"Remove from folders and communities that you do not have permission to see"},"REMOVE_COLLECTION_MEMBER":{"ACTION_TOOLTIP_COMMUNITY":"Remove this community from the folder","ACTION":"Remove","ACTION_TOOLTIP":"Remove this person from the folder","ACTION_TOOLTIP_GROUP":"Remove this group from the folder"},"CHANGE_PROPAGATE_FILE":{"ERROR_CANCEL":"The file was not updated because the request was cancelled.  Click the checkbox to try again.","ERROR":"The file was not updated due to an error.","ERROR_TIMEOUT":"The file was not updated because the server could not be contacted.  Click the checkbox to try again."},"SUBSCRIBE_TO_PAGE_TOOLTIP":"Follow changes to this page through your feed reader","APP_LOAD":"Welcome to Files","SHARE_TO_COMMUNITY_FOLDER":{"DIALOG_TITLE":"Share Folder with this Community","ACTION":"Share Folder with Community...","ACTION_TOOLTIP":"See folders Community have shared with you ","OK":"Share Folders"},"MOVE_FILES":{"RESHARE_NOT_ALLOWED_FOLDERS_1":"Folder ${item} was not moved to ${target}, because the owner does not allow others to share it.","DIALOG_TITLE":"Move to...","INFO_SUCCESS_FILES_X_FOLDERS_X":"${succeedfilescount} files and ${succeedfolderscount} folders were successfully moved to ${target}.","TOP_LEVEL_DENIED_FOLDER_X":"${count} folders were not moved, because only folder owner can move the top level folders.","NOT_FOUND_FILES_X":"${count} files were not moved to ${target}, because they do not exist anymore.","NOT_FOUND_IN_SOURCE_PARENT_FILES_1":"File ${item} was not moved to ${target}, because it does not exist in the source folder anymore.","PRIVATE_NOT_ALLOWED_IN_PUBLIC_COLLECTION_FILES_X":"${count} files were not moved to ${target}, because they are not visible to everyone in your organization. ","EXIST_AT_TARGET_FOLDERS_1":"Folder ${item} was not moved to ${target}, because there exists already a folder with the same name in the new location.","NOT_FOUND_ITEMS_X":"${count} items were not moved to ${target}, because they do not exist anymore.","ACCESS_DENIED_FOLDER_X":"${count} folders were not moved, because you do not have permission to move them into ${target}.","INFO_SUCCESS_X_FOLDERS":"${succeedfolderscount} folders were successfully moved to ${target}.","PRIVATE_NOT_ALLOWED_IN_PUBLIC_COLLECTION_ITEMS_X":"${count} items were not moved to ${target}, because they are not visible to everyone in your organization. ","NOT_FOUND_FOLDERS_X":"${count} folders were not moved to ${target}, because they do not exist anymore.","INTERNAL_EXTRENAL_RESTRICTION_ITEM_X":"${count} items were not moved to ${target}, because you can not move internal files and folders into a folder that can be shared outside of your organization.","COMMUNITY_TO_PERSONAL_FILES_1":"File ${item} was not moved to ${target}, because you can not move a community owned file into a personal folder.","ACTION_ENABLED":"Move to button is enabled","INFO_SUCCESS_FILES_1_FOLDERS_X":"${succeedfilescount} file and ${succeedfolderscount} folders were successfully moved to ${target}.","TARGET_PARENT_NOT_FOUND_FILES_X":"${count} files were not moved to ${target}, because ${target} does not exist anymore.","SOURCE_PARENT_NOT_FOUND_FOLDERS_X":"${count} folders were not moved to ${target}, because the folder that contains these folders does not exist anymore.","INVALID_TARGET_FOLDER_1":"Folder ${item} was not moved, because you cannot move it into its subfolder.","COMMUNITY_TO_PERSONAL_FOLDERS_1":"Folder ${item} was not moved to ${target}, because you can not move a community owned folder into a personal folder.","RESHARE_NOT_ALLOWED_FOLDERS_X":"${count} folders were not moved to ${target}, because the owner does not allow others to share them.","TARGET_PARENT_NOT_FOUND_ITEMS_X":"${count} items were not moved to ${target}, because ${target} does not exist anymore.","INFO":"Moving these files and folders will cause other people to lose access to the files and folders.","PERSONAL_TO_COMMUNITY_FILES_1":"File ${item} was not moved to ${target}, because you can not move a personal owned file into a community folder.","NOT_FOUND_IN_SOURCE_PARENT_FILES_X":"${count} files were not moved to ${target}, because they do not exist in the source folder anymore.","SOURCE_PARENT_NOT_FOUND_FILES_1":"File ${item} was not moved to ${target}, because the folder that contains this file does not exist anymore.","PRIVATE_NOT_ALLOWED_IN_PUBLIC_COLLECTION_FOLDERS_1":"Folder ${item} was not moved to ${target}, because they are not visible to everyone in your organization. ","RESHARE_NOT_ALLOWED_FILES_1":"File ${item} was not moved to ${target}, because the owner does not allow others to share it.","EXIST_AT_TARGET_FOLDERS_X":"${count} folders were not moved to ${target}, because there exist already folders with the same names in the new location.","ACCESS_DENIED_ITEM_X":"${count} items were not moved, because you do not have permission to move them into ${target}.","ACTION":"Move to","ACCESS_DENIED_FILE_1":"File ${item} was not moved, because you do not have permission to move it into ${target}.","NOT_FOUND_IN_SOURCE_PARENT_ITEMS_X":"${count} items were not moved to ${target}, because they do not exist in the source folder anymore.","PERSONAL_TO_COMMUNITY_FOLDERS_1":"Folder ${item} was not moved to ${target}, because you can not move a personal owned folder into a community folder.","INTERNAL_EXTRENAL_RESTRICTION_FILES_1":"File ${item} was not moved to ${target}, because you can not move an internal file into a folder that can be shared outside of your organization.","EXIST_AT_TARGET_FILES_1":"File ${item} was not moved to ${target}, because there exists already a file with the same name in the new location.","COMMUNITY_TO_PERSONAL_FILES_X":"${count} files were not moved to ${target}, because you can not move a community owned file into a personal folder.","INFO_SUCCESS_X_FILES":"${succeedfilescount} files were successfully moved to ${target}.","TARGET_PARENT_NOT_FOUND_FOLDERS_1":"Folder ${item} was not moved to ${target}, because ${target} does not exist anymore.","COMMUNITY_TO_PERSONAL_ITEMS_X":"${count} items were not moved to ${target}, because you can not move community owned files and folders into a personal folder.","INTERNAL_EXTRENAL_RESTRICTION_FOLDER_1":"Folder ${item} was not moved to ${target}, because you can not move an internal folder into a folder that can be shared outside of your organization.","INVALID_TARGET_FOLDER_X":"${count} folders were not moved, because you cannot move them into their own subfolder.","COMMUNITY_TO_PERSONAL_FOLDERS_X":"${count} folders were not moved to ${target}, because you can not move community owned folders into a personal folder.","PERSONAL_TO_COMMUNITY_FILES_X":"${count} files were not moved to ${target}, because you can not move a personal owned file into a community folder.","NOT_FOUND_IN_SOURCE_PARENT_FOLDERS_1":"Folder ${item} was not moved to ${target}, because it does not exist in the source folder anymore.","SOURCE_PARENT_NOT_FOUND_FILES_X":"${count} files were not moved to ${target}, because the folder that contains these files does not exist anymore.","PRIVATE_NOT_ALLOWED_IN_PUBLIC_COLLECTION_FOLDERS_X":"${count} folders were not moved to ${target}, because they are not visible to everyone in your organization. ","RESHARE_NOT_ALLOWED_FILES_X":"${count} files were not moved to ${target}, because the owner does not allow others to share them.","ACTION_TOOLTIP":"Move these files and folders","INFO_SUCCESS_FILES_X_FOLDERS_1":"${succeedfilescount} files and ${succeedfolderscount} folder were successfully moved to ${target}.","OK":"Move","INFO_SUCCESS_1_FILES":"File ${succeeditem} was successfully moved to ${target}.","ACCESS_DENIED_FILE_X":"${count} files were not moved, because you do not have permission to move them into ${target}.","PERSONAL_TO_COMMUNITY_ITEMS_X":"${count} items were not moved to ${target}, because you can not move personal owned files and folders into a community folder.","TOP_LEVEL_DENIED_FOLDER_1":"Folder ${item} was not moved, because only folder owner can move the top level folder.","SOURCE_PARENT_NOT_FOUND_ITEMS_X":"${count} items were not moved to ${target}, because the folder that contains these items does not exist anymore.","NOT_FOUND_FILES_1":"File ${item} was not moved to ${target}, because it does not exist anymore.","PRIVATE_NOT_ALLOWED_IN_PUBLIC_COLLECTION_FILES_1":"File ${item} was not moved to ${target}, because they are not visible to everyone in your organization. ","PERSONAL_TO_COMMUNITY_FOLDERS_X":"${count} folders were not moved to ${target}, because you can not move personal owned folders into a community folder.","RESHARE_NOT_ALLOWED_ITEMS_X":"${count} items were not moved to ${target}, because the owner does not allow others to share them.","INTERNAL_EXTRENAL_RESTRICTION_FILES_X":"${count} files were not moved to ${target}, because you can not move internal files into a folder that can be shared outside of your organization.","ACTION_DISABLED":"Move to button is disabled","ACTION_LONG":"Move to...","EXIST_AT_TARGET_FILES_X":"${count} files were not moved to ${target}, because there exist already files with the same names in the new location.","ERROR":"These files and folders were not moved to ${target} due to an error.","ACCESS_DENIED_FOLDER_1":"Folder ${item} was not moved, because you do not have permission to move it into ${target}.","INFO_SUCCESS_1_FOLDERS":"Folder ${succeeditem} was successfully moved to ${target}.","TARGET_PARENT_NOT_FOUND_FOLDERS_X":"${count} folders were not moved to ${target}, because ${target} does not exist anymore.","NOT_FOUND_FOLDERS_1":"Folder ${item} was not moved to ${target}, because it does not exist anymore.","EXIST_AT_TARGET_ITEMS_X":"${count} items were not moved to ${target}, because there exist already items with the same names in the new location.","INTERNAL_EXTRENAL_RESTRICTION_FOLDER_X":"${count} folders were not moved to ${target}, because you can not move internal folders into a folder that can be shared outside of your organization.","INFO_SUCCESS_FILES_1_FOLDERS_1":"${succeedfilescount} file and ${succeedfolderscount} folder were successfully moved to ${target}.","TARGET_PARENT_NOT_FOUND_FILES_1":"File ${item} was not moved to ${target}, because ${target} does not exist anymore.","BUSY":"Moving...","CANCEL":"Cancel","OK_MOVE_HERE":"Move Here","WARNING":"${item} is in the ${collection} folder. Some people will lose access to this file if you remove it.","NOT_FOUND_IN_SOURCE_PARENT_FOLDERS_X":"${count} folders were not moved to ${target}, because they do not exist in the source folder anymore.","SOURCE_PARENT_NOT_FOUND_FOLDERS_1":"Folder ${item} was not moved to ${target}, because the folder that contains this folder does not exist anymore."},"DISMISS":"Hide this message","UPLOAD_PREVIEW":{"DIALOG_TITLE":"Upload Video Thumbnail","SUCCESS":"Change Thumbnail Preview Success","REPLACE_LABEL":"Image File:","REQUIRED_MARK":"* Required","REPLACE_CONFIRM":"Select a file with one of the following supported extensions:","ACTION":"Change Thumbnail","BUSY":"Saving...","ACTION_TOOLTIP":"Change Thumbnail Preview file","REQUIRED_FIELD":"Required field","CANCEL":"Cancel","ERROR_UNKNOW":"Unknow ERROR.","OK":"Upload","SELECT_FILE":"Please select a file to upload","ERROR_ACCESS_DENIED":"You cannot upload new versions. Either this file was locked or the owner removed your editor access.","ERROR_NOT_FOUND":"The file could not be edited because it has been deleted or is no longer shared with you."},"FLAG_COMMENT":{"ERROR_CANCEL":"This comment was not flagged because the request was canceled.  Click \'Flag\' to try again.","DIALOG_TITLE":"Flag Comment","INFO_SUCCESS":"The comment has been flagged and submitted for review.","QUESTION":"Provide a reason for flagging this comment (optional):","ACTION":"Flag as Inappropriate","ERROR":"This comment could could not be flagged.","CANCEL":"Cancel","ERROR_TIMEOUT":"This comment was not flagged because the server could not be contacted.  Click \'Flag\' to try again.","ACTION_TOOLTIP":"Flag this comment as inappropriate","OK":"Flag","ERROR_ACCESS_DENIED":"You do not have permission to flag this comment.","ERROR_NOT_FOUND":"This comment was not flagged because it has been deleted or is no longer shared with you."},"MAKE_COLLECTION_INTERNAL":{"DIALOG_TITLE":"Make Internal?","SUCCESS":"This folder can no longer be shared with people outside of your organization.","QUESTION":"Making this folder internal will mean it can no longer be shared with people outside of your organization.\n\nAny shares with external people or communities will be removed.\n\nMaking a folder internal is permanent and cannot be undone.","ERROR":"The folder could not be changed. Please try again later.","ERROR_TIMEOUT":"The folder could not be changed because the server could not be contacted. Please try again.","QUESTION_E":"Making this folder internal will mean it can no longer be shared with people outside of your organization.\n\nAny shares with external people will be removed.\n\nMaking a folder internal is permanent and cannot be undone.","ERROR_CANCEL":"The folder could not be changed because the request was cancelled. Please try again.","ACTION":"Change","BUSY":"Saving...","CANCEL":"Cancel","ACTION_TOOLTIP":"Stop allowing this folder to be shared outside of your organization","ERROR_SHARED_EXTERNALLY":"The folder could not be changed because it is currently shared externally. Remove external shares and try again.","OK":"Make Internal","ERROR_NOT_LOGGED_IN":"The folder could not be changed because you were not logged in. Please log in and try again."},"INFO_COLON":"Info:","FLAG_FILE":{"DIALOG_TITLE":"Flag File","QUESTION":"Provide a reason for flagging this file (optional):","ERROR":"This file could could not be flagged.","ERROR_TIMEOUT":"This file was not flagged because the server could not be contacted.  Click \'Flag\' to try again.","ERROR_CANCEL":"This file was not flagged because the request was canceled.  Click \'Flag\' to try again.","INFO_SUCCESS":"The file has been flagged and submitted for review.","AUTOQUARANTINE_INFO_SUCCESS":"The file has been flagged and has been quarantined successfully.","ACTION":"Flag as Inappropriate","CANCEL":"Cancel","ACTION_TOOLTIP":"Flag this file as inappropriate","OK":"Flag","ERROR_ACCESS_DENIED":"You do not have permission to flag this file.","ERROR_NOT_FOUND":"This file was not flagged because it has been deleted or is no longer shared with you."},"PIVOTS":{"SEARCH_FILES":"Search Results","MY_COLLECTIONS_COL":"Collapse your recent folders","SYNCABLE_FILES_DESC":"Files that are marked for synchronization to one of your computers or mobile devices. If you have not already, download the  ${0}IBM Connections Plug-ins${1} to start synchronizing these files.","COMMUNITY_FILES_TOOLTIP":"See community files","COLLECTIONS_LONG":"Folders Shared With Me ","MY_COLLECTIONS_TOOLTIP":"See your folders ","SEARCH_FILES_WINDOWTITLE":"Search Results from All Files","SHARED_BY_ME_DESC":"Files that you have shared with other people.","MY_MEDIA_LONG":"My Files ","SYNCABLE_FILES":"Sync","SYNCABLE_FILES_WELCOME":"Welcome to Sync","DELETED_FILES":"Trash","ANON_MEDIA":"Files","PUBLIC_MEDIA_TOOLTIP":"See ${company} files","MY_MEDIA_TOOLTIP":"See your files","SYNCABLE_FILES_WINDOWTITLE":"Sync","COLLECTIONS_COL":"Collapse recent shared folders","MEDIA_LONG":"${possessive}\'s Files","COLLECTIONS_PUBLIC_TOOLTIP":"See ${company} folders ","FAVORITE_FILES_TOOLTIP":"See files you pinned ","COLLECTIONS_TOOLTIP":"See folders people have shared with you ","DELETED_FILES_WINDOWTITLE":"Trash","COMMUNITY_FILES_LONG":"Community Files","ANON_MEDIA_WINDOWTITLE":"${possessive}\'s Files","COLLECTIONS_DESC":"Folders that people have shared with you.","COLLECTION":"${0}","MY_MEDIA_DESC":"Files that you own.","MY_COLLECTIONS_EXP":"Expand your recent folders","SEARCH_FILES_TOOLTIP":"See search results","SYNCABLE_FILES_BUTTON":"Add Files","SHARED_BY_ME":"Shared By Me","MEDIA_DESC":"Files owned by this person that are visible to everyone in ${company} or shared with you.","PUBLIC_MEDIA_LONG":"${company} Files","COMMUNITY_FILES_DESC":"Files in communities that you are a member of.","SHARED_BY_ME_WINDOWTITLE":"Files Shared By Me","MEDIA_LONG_X":"${possessive}\' Files","SYNCABLE_FILES_TOOLTIP":"See files that can be synchronized","COLLECTIONS_EXP":"Expand recent shared folders","DELETED_FILES_TOOLTIP":"See files that have been deleted","ANON_MEDIA_TOOLTIP":"See this person\'s files","MY_COLLECTIONS_LONG":"My Folders ","COMMUNITY_FILES_DESC_ANONYMOUS":"All public community files. ","MY_DELETED_FILES":"Trash","SEARCH_FILES_WINDOWTITLE_NO_KEYWORD":"Search Results for all the files shared with you","PUBLIC_MEDIA_DESC":"Files owned by individuals that everyone in ${company} can see. ","COLLECTION_TOOLTIP":"${visibility} | ${updated} | ${files}","SYNCABLE_FILES_WELCOME_1":"Connections Sync allows you to view and edit all of your files from your desktop. All your edits are automatically synchronized so your collaborators always have access to the latest. If you haven\'t already, install Sync now!","ANON_MEDIA_LONG_X":"${possessive}\' Files","SYNCABLE_FILES_WELCOME_2":"Get Sync","MEDIA":"Files","SYNCABLE_FILES_WELCOME_3":"Already have sync?","MY_DELETED_FILES_WINDOWTITLE":"Trash","COLLECTIONS_PUBLIC_LONG":"${company} Folders ","SHARED_BY_ME_TOOLTIP":"See files you shared with people ","MEDIA_WINDOWTITLE":"${possessive}\'s Files","SYNCABLE_FILES_DESC_DISABLE_LINK":"Files available in your desktop Sync folder.","MY_COLLECTIONS_DESC":"Folders that you have created.","FAVORITE_COLLECTIONS":{"COL":"Collapse pinned folders","TT":"See folders you pinned ","LESS_ALT":"Show fewer folders","D":"Add folders to this list by clicking the pin icon next to a folder.","T":"Pinned Folders","TOGGLE":"Change how many of the most recent folders are shown","MORE":"More...","LESS":"Less...","L":"Pinned Folders ","EXP":"Expand pinned folders","WT":"Pinned Folders","MORE_ALT":"Show more folders"},"SHARED_WITH_ME":"Shared With Me","SEARCH_FILES_LONG":"All Files","COLLECTIONS_PUBLIC_DESC":"Folders that everyone in ${company} can see.","MY_DELETED_FILES_LONG":"Trash (${size})","SHARED_WITH_ME_WINDOWTITLE":"Files Shared With Me","COMMUNITY_FILES":"Community Files","MY_COLLECTIONS":"My Folders","MY_DELETED_FILES_TOOLTIP":"See deleted files","SHARED_WITH_ME_LONG":"Files Shared With Me ","MEDIA_WINDOWTITLE_X":"${possessive}\' Files","FAVORITE_FILES_LONG":"Pinned Files ","MEDIA_TOOLTIP":"View this person\'s files","ANON_MEDIA_LONG":"${possessive}\'s Files","COMMUNITY_FILES_WINDOWTITLE":"Community Files","DELETED_FILES_LONG":"Trash for ${name} (${size})","MY_COLLECTIONS_WINDOWTITLE":"My Folders","SYNCABLE_FILES_LONG":"Sync","PUBLIC_MEDIA":"${company} Files","SEARCH_FILES_DESC":"Files matching \'${0}\'","MY_MEDIA":"My Files","MY_DELETED_FILES_DESC":"Only you can see files in your trash. Click the arrow next to a file to restore or permanently delete the file.","ANON_MEDIA_WINDOWTITLE_X":"${possessive}\' Files","COLLECTIONS_PUBLIC":"${company} Folders","FAVORITE_FILES":"Pinned Files","SHARED_BY_ME_LONG":"Files Shared By Me ","COLLECTIONS":"Folders Shared With Me","PUBLIC_MEDIA_WINDOWTITLE":"${company} Files","SHARED_WITH_ME_DESC":"Files that other people have shared with you.","SEARCH_FILES_DESC_NO_KEYWORD":"Files shared with you","MY_MEDIA_WINDOWTITLE":"My Files","SHARED_WITH_ME_TOOLTIP":"See files people have shared with you","COLLECTIONS_PUBLIC_WINDOWTITLE":"${company} Folders","FAVORITE_FILES_DESC":"Add files to this list by clicking the pin icon next to a file.","FAVORITE_FILES_WINDOWTITLE":"Pinned Files","COLLECTIONS_WINDOWTITLE":"Folders Shared With Me","DELETED_FILES_DESC":"Only you can see files in your trash. Click the arrow next to a file to restore or permanently delete the file.","ANON_MEDIA_DESC":"All files visible to everyone in ${company} owned by this person."},"HISTORY":{"TITLE":"Recent Updates"},"CHANGE_PROPAGATE_PAGE":{"ERROR_CANCEL":"The file was not updated because the request was cancelled.  Click the checkbox to try again.","ERROR":"The file was not updated due to an error.","ERROR_TIMEOUT":"The file was not updated because the server could not be contacted.  Click the checkbox to try again."},"SORTS":{"MOSTRECENT_TOOLTIP":"Sort from most recently updated to least recently updated","AGE_TOOLTIP":"Sort from oldest to newest","ADDED_TOOLTIP":"Sort from most recently added to least recently added","MOSTRECENT_TOOLTIP_REVERSE":"Sort from least recently updated to most recently updated","AGE_TOOLTIP_REVERSE":"Sort from newest to oldest","ADDED_TOOLTIP_REVERSE":"Sort from least recently added to most recently added","MOSTDOWNLOADED_TOOLTIP":"Sort from most downloaded to least downloaded","FILE_COUNT_TOOLTIP":"Sort from folders with the most files to the least files","MOSTDOWNLOADED_TOOLTIP_REVERSE":"Sort from least downloaded to most downloaded","FILE_COUNT_TOOLTIP_REVERSE":"Sort from folders with the least files to the most files","HIGHESTRECOMMENDED_TOOLTIP":"Sort from most liked to least liked","TITLE_TOOLTIP":"Sort by name in alphabetical order","SHARED_ON_TOOLTIP":"Sort from most recently shared to least recently shared","HIGHESTRECOMMENDED_TOOLTIP_REVERSE":"Sort from least liked to most liked","MOSTRECENT":"Updated","MOSTRECENT_SHARE":"Shared","MOSTCOMMENTED_TOOLTIP":"Sort from most commented to least commented","AGE":"Most Recently Added","TITLE_TOOLTIP_REVERSE":"Sort by name in reverse alphabetical order","SHARED_ON_TOOLTIP_REVERSE":"Sort from least recently shared to most recently shared","ADDED":"Added","MOSTCOMMENTED_TOOLTIP_REVERSE":"Sort from least commented to most commented","SIZE_TOOLTIP":"Sort by size from largest to smallest","SIZE_TOOLTIP_REVERSE":"Sort by size from smallest to largest","MOSTDOWNLOADED":"Downloads","HIGHESTRECOMMENDED":"Likes","TITLE":"Name","MOSTCOMMENTED":"Comments"},"FEEDS":{"SEARCH_FILES":{"T":"Follow changes to these files through your feed reader","L":"Feed for these Files"},"PUBLIC_FILES":{"T":"Follow changes to files visible to everyone in ${company} through your feed reader","L":"Feed for ${company} public files"},"FAVORITE_FILES":{"T":"Follow changes to your pinned files through your feed reader","L":"Feed for Pinned Files"},"COLLECTIONS":{"T":"Follow changes to these folders through your feed reader","L":"Feed for these Folders"},"FILES":{"T":"Follow changes to these files through your feed reader","L":"Feed for these Files"},"SEARCH_FILES_NO_KEYWORD":{"L":"Feed for All Visible Files"},"UPDATES":{"T":"Follow changes to Files through your feed reader","L":"Feed for these Updates"},"FILE":{"T":"Follow changes to this file through your feed reader","L":"Feed for this File"},"SHARED_FILES":{"T":"Follow changes to shared files through your feed reader","L":"Feed for Shared Files"},"SYNCABLE_FILES":{"T":"Follow changes to your synchronizable files through your feed reader","L":"Feed for Sync"},"COLLECTION":{"T":"Follow changes to this folder through your feed reader","L":"Feed for this Folder"}},"COLLECTIONS":{"JUMP_TO_PAGE":"Jump to page \xa0","HIDE":"Hide","ERROR_REQUEST_UNKNOWN":"An unknown error has occurred.","FOLDERS_LABEL_MANY":"${0} subfolders","FOLDERS_LABEL_1_FILES_LABEL_MANY":"1 subfolder, ${0} files","SHOW_ALT":"Show ${0} items per page","NEXT_T":"Next page","ERROR_REQUEST_CANCELLED":"The request was cancelled.","FOLDERS_LABEL_1_FILES_LABEL_1":"1 subfolder, 1 file","PREVIOUS_T":"Previous page","JUMP_TO_PAGE_ALT":"Jump to a page between ${0} and ${1}","PAGE":"Page","MORE_LOAD":"Loading","ITEMS_PER_PAGE":" items per page","ELLIPSIS":"...","FILES_LABEL_MANY":"${0} files","PAGING_BOTTOM_LABEL":"Paging options","MORE":"More","VIEW_EXTRA":"View more information","PAGING_TOP_LABEL":"Paging","SORT_BY":"Sort by:","PAGE_ALT":"Page ${0} of ${1}","ERROR_REQUEST_TIMEOUT":"The server could not be contacted.","SHARE_INTENT":"Shared externally","LOADING":"Loading folders...","NOHYPHENCOUNT":"${0} of ${1}","FILES_LABEL_0":"No files","FILES_LABEL_1":"1 file","FOLDERS_LABEL_MANY_FILES_LABEL_1":"${0} subfolders, 1 file","LOADING_ONE":"Loading folder...","SEARCH":{"DEFAULT":"Enter a folder name","NAME":"Folders"},"FOLDERS_LABEL_1":"${0} subfolder","FOLDERS_LABEL_MANY_FILES_LABEL_MANY":"${0} subfolders, ${1} files","EMPTY":"There are no folders","ERROR_REQUEST_UNAUTHENTICATED":"You must log in again.","COUNT":"${0}-${1} of ${2}","SHARE_INTENT_T":"Shared externally","HIDE_EXTRA":"Hide extra information","NEXT":"Next","PREVIOUS":"Previous","COUNT_ALT":"Showing folders ${0} through ${1} of ${2}","SHARING":"Sharing","OF_PAGES":"\xa0 of ${0}.","SHOW":"Show"},"TOGGLE_SYNC_FILE":{"ERROR":"The file could not be updated. Please try again later.","ERROR_TIMEOUT":"The file could not be updated because the server could not be contacted. Please try again.","ACTION_REMOVE":"Remove from Sync","UNAVAILABLE":"Information about Sync could not be retrieved. Please refresh the page to try again.","ERROR_CANCEL":"The file could not be updated because the request was cancelled. Please try again.","ERROR_EXISTS":"The file cannot be added to Sync because an existing file already uses the same name. ","ACTION_ADD":"Add to Sync","STOP_SYNC":{"INFO_SUCCESS":"${link} was removed from Sync."},"ACTION_TOOLTIP":"Decide whether or not make this file synchronizable.","SYNC":{"INFO_SUCCESS":"${link} was added to Sync."},"ACTION_ERROR":"Error","ERROR_NOT_LOGGED_IN":"The file could not be updated because you were not logged in. Please log in and try again.","ERROR_NOT_FOUND":"The file could not be updated because it has been deleted or is no longer shared with you."},"CREATE_ITEM":{"ACTION":"New","ACTION_TOOLTIP":"Create a new item"},"SESSION_TIMEOUT":"Your SmartCloud session has timed out. Click OK to log back in or Cancel to close this dialog.","CANCEL":"Cancel","TAGGER":{"CREATEERROR_ACCESS_DENIED":"The tag could not be created because you do not have permission to edit this file.","CREATEERROR_NOT_FOUND":"The tag could not be created because the file has been deleted or is no longer visible.","WARN_LONG_TAGS":"The specified tags are too long.","LOADERROR_TIMEOUT":"The tags could not be loaded: request timed out.","REMOVE":"Remove tag","ERROR_LOADING":"An error has occured loading the tags.","SEPARATOR":",","WARN_LONG_TAG":"The tag \'${0}\' is too long.","INVALID_CHAR_WARN_LONG":"One or more tags you have entered contain invalid characters: ${0}","TRIM_TAGS":"Shorten tags?","LOADERROR_CANCEL":"The tags could not be loaded: request cancelled.","ADD_TAGS":"Add Tags","NO_RESULTS":"No results for \'${0}\'","ADD_REMOVE_TAGS_TOOLTIP":"Add or remove tags on this file","NOTAGS":"No tags","REMOVECONFIRM":"Are you sure you want to remove the tag \'${0}\'?","OK":"Save","LOADING":"Loading tags...","TRIM_TAG":"Shorten tag?","CANCEL_TOOLTIP":"Cancel tag editing","REMOVEERROR":"The tag could not be removed.","ADD_TAGS_LONG":"Add Tags...","REMOVEERROR_TIMEOUT":"The tag could not be removed because the server could not be contacted.  Click \'X\' to try again.","INVALID_CHAR_WARN":"!","LOADERROR_NOTFOUND":"The tags could not be loaded: file not found.","CREATEERROR":"The tag could not be created.  Please try again later.","CREATEERROR_CANCEL":"The tag could not be created because the request was cancelled.  Click \'Save\' to try again.","CREATEERROR_TIMEOUT":"The tag could not be created because the server could not be contacted.  Click \'Save\' to try again.","REMOVEERROR_CANCEL":"The tag could not be removed because the request was cancelled.  Click \'X\' to try again.","ADD_REMOVE_TAGS":"Add or Remove Tags","NONE":"None","CANCEL":"Cancel","REMOVEERROR_NOT_FOUND":"The tag could not be removed because the file has been deleted or is no longer visible.","ADD_TAGS_TOOLTIP":"Add tags to this file","REMOVEERROR_ACCESS_DENIED":"The tag could not be removed because you do not have permission to edit this file."},"WELCOMECONTENT_MOD":{"TAKE_TOUR":"View Demo","BLURB1":"{0}Approve or reject content{1} submitted to a blog, community, or forum.","BLURB2":"{0}Review content{1} that users have flagged.","BLURB3":"{0}Find out more{1} about how moderation works.","TITLE":"New to Moderation?","BLURB":"Approve content before it is published or review content that users have flagged as inappropriate. Learn how to:"},"BACK_TO_PAGE":"Back to Page","WARNING":"Warning","FILE":{"EXPAND_ERROR":{"TIMEOUT":"The details of this file could not be loaded because the server could not be contacted.","NOT_FOUND":"The details of this file could not be loaded because file has been deleted or is no longer visible.","GENERIC":"An error prevented the details of this file from being displayed.  Please try again later.","CANCEL":"The details of this file could not be loaded because the request was cancelled."}},"FORCE_DOWNLOAD":{"DIALOG_TITLE":"File(s) Not Scanned","DOWNLOAD_UNSCANNED_ITEMS":"The unscanned file(s) include:","OTHERS":"Add others...","DOWNLOAD_WARNING":"The files you selected will be downloaded as a compressed file. However, at least one of these files has not been scanned for viruses. Unscanned files might be too large, or might be in queue waiting to be scanned.","ACTION":"Force Download","BUSY":"Downloading...","ACTION_TOOLTIP":"Force Download","CANCEL":"Cancel","OK":"Download"},"STATS":{"ERROR_TITLE":"Files Metrics are Unavailable","ERROR_MSG":"Files metrics are not available at this time.  Access to files metrics may be restricted to administrators."},"WARNING_ACCESS_TITLE":"Access Denied","DELETE_MY_SHARE":{"ACTION":"Remove my share","ACTION_TOOLTIP_PERSON":"Remove my share with ${0}","ACTION_TOOLTIP":"Remove my share with this person"},"ADD_COMMENT":{"ACTION":"Add Comment","ACTION_TOOLTIP":"Add a comment to this file"},"EMPTY_TRASH":{"ACTION":"Empty Trash","ACTION_TOOLTIP":"Permanently delete all files in the trash"},"TOGGLE_FAVORITE_FOLDER":{"A_REMOVE":"Unpin","A_ADD":"Pin","A_REMOVE_SUCCESS":"Pinned folder ${link} was removed successfully. ","A_ADD_SUCCESS":"${link} was pinned successfully.","ERROR":"The folder could not be updated. Please try again later.","ERROR_TIMEOUT":"The folder could not be updated because the server could not be contacted. Please try again.","UNAVAILABLE":"Information about your pinned folders could not be retrieved.  Please refresh the page to try again.","LOADING_T":"Please wait while your pinned folders load","ERROR_CANCEL":"The folder could not be updated because the request was cancelled. Please try again.","A_REMOVE_T":"Remove from your pinned folders","A_ADD_T":"Pin this folder","LOADING":"Loading...","ERROR_NOT_LOGGED_IN":"The folder could not be updated because you were not logged in. Please log in and try again.","ERROR_NOT_FOUND":"The folder could not be updated because it has been deleted or is no longer shared with you."},"TOGGLE_FOLLOWING_FOLDER":{"FOLLOW":{"INFO_SUCCESS":"You are now following this folder: ${0}."},"ERROR_CANCEL":"The folder could not be updated because the request was cancelled. Please try again.","STOP_FOLLOWING":{"INFO_SUCCESS":"You have stopped following this folder: ${0}. "},"ERROR":"The folder could not be updated. Please try again later.","ACTION_ADD":"Follow","ACTION_TOOLTIP":"Toggle whether you will receive updates about this folder","ERROR_TIMEOUT":"The folder could not be updated because the server could not be contacted. Please try again.","ACTION_REMOVE":"Stop Following","ERROR_NOT_LOGGED_IN":"The folder could not be updated because you were not logged in. Please log in and try again.","ACTION_ERROR":"Error","ERROR_NOT_FOUND":"The folder could not be updated because it has been deleted or is no longer shared with you."},"CREATE_COMMUNITY_FOLDER":{"DIALOG_TITLE":"New Folder","ACTION":"New Folder...","ACTION_TOOLTIP":"Create a new folder to put files into","OK":"Create"},"REAUTHENTICATE":{"NAME_LABEL":"User name:","PASSWORD_LABEL":"Password:","DIALOG_TITLE":"Log In Again","GO_TO_LOGIN_PAGE":"Or, discard any unsaved changes and go to the full log in page.","ERROR":"The username or password was not valid.","BUSY":"Authenticating...","CANCEL":"Cancel","OK":"Log In","INFO":"You are no longer logged in to IBM Connections.  To continue your current work and preserve any input you have entered please reauthenticate. "},"A11Y_READER_REMOVED":"Removed ${0} as a reader","PAGING":{"COUNT2":"Showing ${0}-${1}","NEXT":"Next","PAGING_BOTTOM_LABEL":"Paging options","PREVIOUS":"Previous","PAGING_TOP_LABEL":"Paging","NEXT_T":"Next page","COUNT_ALT":"Showing items ${0} through ${1} of ${2}","PAGE_ALT":"Page ${0} of ${1}","PREVIOUS_T":"Previous page","COUNT":"${0}-${1} of ${2} "},"HEADER":{"PEOPLE_TITLE":"Files","PEOPLE":"Files"},"REMOVE_FROM_COMMUNITY":{"ACTION_TOOLTIP_COLLECTION":"Remove from the community ${0}","ACTION":"Remove","ACTION_TOOLTIP":"Remove from community"},"PAGE":{"EXPAND_ERROR":{"TIMEOUT":"The details of this file could not be loaded because the server could not be contacted.","NOT_FOUND":"The details of this file could not be loaded because the file has been deleted or is no longer visible.","GENERIC":"An error prevented the details of this file from being displayed.  Please try again later.","CANCEL":"The details of this file could not be loaded because the request was cancelled"}},"MAKE_FILE_INTERNAL":{"DIALOG_TITLE":"Make Internal?","SUCCESS":"This file can no longer be shared with people outside of your organization.","QUESTION":"Making this file internal will mean it can no longer be shared with people outside of your organization.\n\nAny shares with external people, communities or folders will be removed.\n\nMaking a file internal is permanent and cannot be undone.","ERROR":"The file could not be changed. Please try again later.","ERROR_TIMEOUT":"The file could not be changed because the server could not be contacted. Please try again.","QUESTION_E":"Making this file internal will mean it can no longer be shared with people outside of your organization.\n\nAny shares with external people or folders will be removed.\n\nMaking a file internal is permanent and cannot be undone.","ERROR_CANCEL":"The file could not be changed because the request was cancelled. Please try again.","ACTION":"Change","BUSY":"Saving...","CANCEL":"Cancel","ACTION_TOOLTIP":"Stop allowing this file to be shared outside of your organization","ERROR_SHARED_EXTERNALLY":"The file could not be changed because it is currently shared externally. Remove external shares and folders and try again.","OK":"Make Internal","ERROR_NOT_LOGGED_IN":"The file could not be changed because you were not logged in. Please log in and try again."},"ATTACHMENTS":{"DATE":{"RELATIVE_TIME":{"MONTH":"${MMM} ${d}","DAY":"${EEee} at ${time}","FULL":"${EEEE}, ${date_long} ${time_long}"},"UPDATED":{"MONTH":"Updated ${MMM} ${d}","DAY":"Updated ${EEee} at ${time}","FULL":"${EEEE}, ${date_long} ${time_long}"}}},"DELETE_FILE":{"ACTION_TOOLTIP_X":"Permanently delete the selected files","ACTION":"Delete","ACTION_TOOLTIP":"Permanently delete this file"},"EDIT_FILE":{"ACTION_LONG":"Edit Properties...","ACTION":"Edit Properties","ACTION_TOOLTIP":"Change the file name and description"},"REMOVE_FROM_FILESYNC":{"DIALOG_TITLE":"Remove from Sync","ERROR_X":"${count} files were not removed from Sync due to errors.","INFO_SUCCESS_1":"Sync is no longer enabled for ${item}.","ACTION_DISABLED":"Remove button is disabled","QUESTION":"Are you sure you want to remove this file from Sync?\n\n${0}","INFO_SUCCESS_X":"${count} files were removed from Sync.","ERROR_1_NOT_FOUND":"${item} already has been removed from Sync.","ERROR_1_NOT_LOGGED_IN":"${item} was not removed from Sync because you were not logged in. Please log in and try again.","ERROR_1_ACCESS_DENIED":"${item} was not removed from Sync because you do not have permission to remove this file.","INFO_SUCCESS":"${0} was removed from Sync.","ACTION_TOOLTIP_X":"Remove the selected files from Sync","ACTION":"Remove","ACTION_ENABLED":"Remove button is enabled","ERROR_X_CANCEL":"Some files might not have been removed from Sync because the request was cancelled.","BUSY":"Removing...","ACTION_TOOLTIP":"Remove from Sync","CANCEL":"Cancel","ERROR_1":"${item} was not removed from Sync due to an error.","OK":"OK","ERROR_1_TIMEOUT":"${item} was not removed from Sync because the server could not be contacted.","ERROR_1_CANCEL":"${item} cannot be removed from Sync because the request was cancelled.","QUESTION_X":"Are you sure you want to remove the selected files from Sync?\n\n${0}"},"BACK_TO_COMMUNITY_COLLECTIONS":"Back to community folders","TOGGLE_FAVORITE_FILE":{"A_REMOVE":"Unpin","A_ADD":"Pin","A_REMOVE_SUCCESS":"Pinned file ${link} was removed successfully. ","A_ADD_SUCCESS":"${link} was pinned successfully.","ERROR":"The file could not be updated. Please try again later.","PIN_SUCCESS_SYNC_FAILE":"${link} was pinned successfully. The file cannot be added to Sync because an existing file already uses the same name.","ERROR_TIMEOUT":"The file could not be updated because the server could not be contacted. Please try again.","UNAVAILABLE":"Information about your pinned files could not be retrieved.  Please refresh the page to try again.","ERROR_CANCEL":"The file could not be updated because the request was cancelled. Please try again.","LOADING_T":"Please wait while your pinned files load","A_REMOVE_T":"Remove from your pinned files","A_ADD_T":"Pin this file","LOADING":"Loading...","ERROR_NOT_LOGGED_IN":"The file could not be updated because you were not logged in. Please log in and try again.","ERROR_NOT_FOUND":"The file could not be updated because it has been deleted or is no longer shared with you."},"BACK_TO_APP":"Return to Application","UNLOCK_FILE":{"ERROR_ALREADY_UNLOCKED":"This file was already unlocked.","ERROR_CANCEL":"The file could not be unlocked because the request was cancelled. Please try again.","STATUS":"Unlocking...","INFO_SUCCESS":"The file is now unlocked.","ACTION":"Unlock File","ERROR":"The file could not be unlocked. Please try again later.","ACTION_TOOLTIP":"Unlock this file","ERROR_TIMEOUT":"The file could not be unlocked because the server could not be contacted. Please try again.","ERROR_NOT_LOGGED_IN":"The file could not be unlocked because you were not logged in. Please log in and try again.","ERROR_NOT_FOUND":"The file could not be updated because it has been deleted or is no longer shared with you."},"REMOVE_FROM_COLLECTION":{"ACTION_TOOLTIP_COLLECTION":"Remove from the folder ${0}","ACTION":"Remove from Folder","ACTION_TOOLTIP":"Remove this item from this folder"},"LEGEND_L":"Legend","FILE_SYNC_ICON":{"ALT":"This file is enabled for sync."},"VERSIONS":{"REVERT_DESCRIPTION":"Restored from version ${0}","ERROR_REQUEST_UNKNOWN":"An unknown error has occurred.","NEXT_T":"Next page","SHOW_COMPARISON":"Show comparison","PREVIOUS_T":"Previous page","DELETE_CONFIRM":"Are you sure you want to delete version ${0}?","PAGE":"Page","PAGING_BOTTOM_LABEL":"Paging options","COMPARE_RECENT":"Compare to most recent","MOST_RECENT":"(most recent)","ERROR_REQUEST_TIMEOUT":"The server could not be contacted.","LOADING":"Loading versions...","REVERT_TITLE":"Restore Version","DELETE_ERROR_ACCESS_DENIED":"You do not have permission to delete a version on this file.","DELETE":"Delete","DELETE_ERROR_NOT_FOUND":"The version could not be deleted because it has been deleted or is no longer shared with you.","INFO":"Version ${0} created ${1} by ${2}","DATE":{"RELATIVE_TIME":{"MONTH":"${MMM} ${d}","TODAY":"Today at ${time}","YESTERDAY":"Yesterday at ${time}","DAY":"${EEee} at ${time}","YEAR":"${date_long}","FULL":"${EEEE}, ${date_long} ${time_long}"},"CREATED":{"MONTH":"Version ${number} created on ${MMM} ${d} by ${person}","TODAY":"Version ${number} created today at ${time} by ${person}","YESTERDAY":"Version ${number} created yesterday at ${time} by ${person}","DAY":"Version ${number} created on ${date} by ${person}","YEAR":"Version ${number} created on ${date_long} by ${person}"},"AM":"AM"},"VERSION_NUMBER":"Version ${0} ","SUBSCRIBE_TO":"Feed for these Versions","DELETE_ONE":"Delete version ${0}","COUNT_ALT":"Showing versions ${0} through ${1} of ${2}","COMPARE_VERSION":"Compare version","KEY":"Key:","COMPARING":"Comparing wiki text of:","REVERT_CONFIRM":"You are about to replace the current version of this file with version ${0}, which was created ${1} by ${2}.\n\nDo you want to proceed?","DELETE_ERROR_CANCEL":"The version was not deleted because the request was cancelled. Click \'OK\' again to try your request again.","SHOW_ALT":"Show ${0} items per page","ERROR_REQUEST_CANCELLED":"The request was cancelled.","DELETE_ERROR_NOT_LOGGED_IN":"The version was not deleted because you were not logged in. Click \'OK\' to try again.","DELETE_ALL_CONFIRM":"Are you sure you want to delete all versions prior to ${0}?","ITEMS_PER_PAGE":" items per page","ELLIPSIS":"...","SUBSCRIBE_TO_TOOLTIP":"Follow changes to this file through your feed reader","LABEL":"Version ${0}","DELETE_ERROR":"The version was not deleted due to an error.","NEW_CHANGED":"New/Changed","DELETE_ERROR_TIMEOUT":"The version was not deleted because the server could not be contacted. Click \'OK\' again to try your request again.","BY":"by ","PAGING_TOP_LABEL":"Paging","PAGE_ALT":"Page ${0} of ${1}","CONTENT":{"REVERT":"Restore","VIEW":"View","DOWNLOAD":"Download","DELETE":"Delete"},"NO_VERSIONS":"No versions","REVERT_VERSION":"Restore version ${0}","DELETE_DES":"Select which versions to delete","REVERT":{"GENERIC_ERROR":"The version could not be restored because of an unknown error.  Click \'Restore\' again to try your request again.","ERROR_CANCEL":"The version was not restored because the request was cancelled.  Click \'Restore\' again to try your request again.","INFO_SUCCESS":"${link} was restored successfully.","ERROR_QUOTA_VIOLATION":"The version could not be restored because of space restrictions.","ERROR_MAX_CONTENT_SIZE":"The version could not be restored because it is larger than the maximum allowed file size of ${0}","ERROR_NAME_EXISTS":"The version could not be restored because another file has the same name.","ERROR_TIMEOUT":"The version was not restored because the server could not be contacted.  Click \'Restore\' again to try your request again.","ERROR_ACCESS_DENIED":"You do not have permission to restore a version on this file.   ","INFO_SUCCESS_PRE_MODERATION":"The file ${name} has been submitted for review. No versions will be available until the new or updated version is approved.","ERROR_NOT_FOUND":"The version could not be restored because it has been deleted or is no longer shared with you."},"DELETE_ALL_TITLE":"Delete Versions","ERROR":"Unable to load version information.","SUBSCRIBE_TO_TITLE":"Versions for ${0}","DELETE_ALL":"Delete version ${0} and all earlier versions","COUNT":"${0}-${1} of ${2}","NEXT":"Next","PREVIOUS":"Previous","DELETED":"Deleted","TO":"to:","VIEW_MOST_RECENT":"View most recent","SHOW":"Show"},"FILES_CHECKED_ALERT":"selecting checkbox will enable the file-action buttons, press shift and tab to navigate to them","ERROR_OCCURRED":"An error occurred.  Contact your administrator.","RECOMMEND":{"RECOMMEND_TOOLTIP":"Like this","YOU_AND_ONE_HAVE_RECOMMENDED":"You and 1 other","UNRECOMMEND_TOOLTIP":"Undo your like from this","LABEL_FALSE":"Like this file.","LABEL_TRUE":"You like this.","RECOMMEND":"Like","LOADING":"Loading...","LABEL_A_ONE":"1 person likes this","UNRECOMMEND":"Undo","ALT_TEXT":"Likes","YOU_HAVE_RECOMMENDED":"You like this","SAVE_ERROR":"Your like could not be saved.  Please try again later.","SAVE_ERROR_TIMEOUT":"Your like could not be saved because the server could not be contacted.  Click the button to try again.","ERROR":"An error has occurred.","LABEL_A_MANY":"${0} people like this","LABEL_HIDDEN_MANY":"${0} others not shown","X_HAVE_RECOMMENDED":"${0} people like this","LABEL_R_ONE":"1 other person likes this","NOT_RECOMMENDED":"0 people like this","SAVE_ERROR_CANCEL":"Your like could not be saved because the request was cancelled.  Click the button to try again.","YOU_AND_X_HAVE_RECOMMENDED":"You and ${0} others","ERROR_RETRIEVE":"Unable to retrieve likes at this time.","LABEL_R_MANY":"${0} other people like this","CANCEL":"Cancel","LABEL_HIDDEN_ONE":"1 other not shown","SAVE_ERROR_NOT_FOUND":"Your like could not be saved because the file has been deleted or is no longer visible.","SAVE_ERROR_ACCESS_DENIED":"Your like could not be saved because the file has been deleted or is no longer visible.","ONE_HAS_RECOMMENDED":"1 person likes this"},"COLLECTION":{"ACTION_MENU_TITLE":"${0} folder action menu","EXPAND_ERROR":{"TIMEOUT":"The details of this folder could not be loaded because the server could not be contacted.","NOT_FOUND":"The details of this folder could not be loaded because the folder has been deleted or is no longer visible.","GENERIC":"An error prevented the details of this folder from being displayed.  Please try again later.","CANCEL":"The details of this folder could not be loaded because the request was cancelled."},"BROWSE_OTHER":"Browse Folders","ERRORS":{"ACCESS_DENIED_ANON":{"TITLE":"Access Denied","MESSAGES":"You do not have permission to view this folder.  If this is your folder or it has been shared with you, you must log in to Files first. "},"ACCESS_DENIED":{"TITLE":"Access Denied","MESSAGES":"You do not have permission to view this folder.  The folder is not shared with you."},"NOT_FOUND":{"TITLE":"Folder Not Found","MESSAGES":"The folder you have requested has been deleted or moved. If someone sent you this link, check that it is correct."},"LOGIN":"Log in now"}},"CONFIRM":{"DIALOG_TITLE":"Confirm","BUSY":"Busy...","CANCEL":"Cancel","OK":"OK"},"ERROR_DETAILS_INFO":"Contact your administrator and include the information below:","ADD_TO_COLLECTION":{"ACTION_LONG":"Add to Folders...","ACTION":"Add to Folders","ACTION_TOOLTIP":"Add this file to a folder"},"TOOLBAR_ALT":"Files menu","A11Y_MANAGER_REMOVED":"Removed ${0} as an owner","SEARCH":{"SCOPE_PERSON":{"LABEL":"Files belonging to...","HINT":"Name or email","HOVER":"Search for a person"},"HINT":"Search","SCOPE_CONNECTIONS_WIKIS":{"LABEL":"Wikis","HOVER":"Search Wikis"},"SCOPE_ALL_FILES":{"LABEL":"All Files","HINT":"Search","HOVER":"Search all files"},"PEOPLE":"Files belonging to...","SCOPE_CONNECTIONS_DOGEAR":{"LABEL":"Bookmarks","HOVER":"Search Bookmarks"},"SCOPE_CONNECTIONS_COMMUNITIES":{"LABEL":"Communities","HOVER":"Search Communities"},"SCOPE_COMMUNITY_FILES":{"LABEL":"Community files","HINT":"Search","HOVER":"Search community files "},"FILES":"Files belonging to...","SCOPE_CONNECTIONS_ADVANCED":{"LABEL":"Advanced","HOVER":"Go to the advanced search page"},"SCOPE_SHARED_WITH_ME_FILES":{"LABEL":"Files Shared with Me","HINT":"Search","HOVER":"Search files shared with me"},"SCOPE_FOLDERS":{"LABEL":"Folders","HINT":"Folder name","HOVER":"Search all folders"},"SCOPE_CONNECTIONS_BLOGS":{"LABEL":"Blogs","HOVER":"Search Blogs"},"SCOPE_CONNECTIONS_PROFILES":{"LABEL":"Profiles","HOVER":"Search Profiles"},"USER_RESULTS":"People search results for name and email: ${0}","SCOPE_CONNECTIONS_ACTIVITIES":{"LABEL":"Activities","HOVER":"Search Activities"},"COMMUNITIES":"Communities","SCOPE_CONNECTIONS_FORUMS":{"LABEL":"Forums","HOVER":"Search Forums"},"SEARCH":"Search","SCOPE_SHARED_BY_ME_FILES":{"LABEL":"Files Shared by Me","HINT":"Search","HOVER":"Search files shared by me"},"SCOPE_CONNECTIONS_ALL":{"LABEL":"All Content","HOVER":"Search all content"},"SCOPE_PUBLIC_FILES":{"LABEL":"${company} Files","HINT":"Search","HOVER":"Search ${company} files"},"REFINE_OPTIONS":"Refine search options","SCOPE_MY_FILES":{"LABEL":"My Files","HINT":"Search","HOVER":"Search my files"},"SCOPE_THESE_FILES":{"LABEL":"This Person\'s Files","HINT":"Search","HOVER":"Search this person\'s files"},"PEOPLE_DEFAULT":"Name or email","SEARCH_ALT":"Search","FILTER":{"TAGS":{"TITLE":"Tags","EXPAND":"Expand the tag filter","COLLAPSE":"Collapse the tag filter"},"DATE":{"TITLE":"Dates","EXPAND":"Expand the date filter","COLLAPSE":"Collapse the date filter"},"PEOPLE":{"TITLE":"People","EXPAND":"Expand the person filter","COLLAPSE":"Collapse the person filter"}},"TITLE":"Search Results for \'${0}\'"},"RESTORE_FILE":{"ACTION":"Restore","ACTION_TOOLTIP":"Move this file out of the trash"},"INFO":"Info","DATE":{"RELATIVE_TIME":{"MONTH":"${MMM} ${d}","TODAY":"Today at ${time}","YESTERDAY":"Yesterday at ${time}","DAY":"${EEee} at ${time}","YEAR":"${date_long}","FULL":"${EEEE}, ${date_long} ${time_long}"},"TODAY":"today","YESTERDAY":"yesterday","COMPACT":{"MONTH":"${MMM} ${d}","TODAY":"${time}","YESTERDAY":"Yesterday","DAY":"${MMM} ${d}","YEAR":"${date}","FULL":"${EEEE}, ${date_long} ${time_long}"},"TODAY_U":"Today","YESTERDAY_U":"Yesterday","AM":"AM","PM":"PM","MONTHS_ABBR":{"11":"DEC","0":"JAN","1":"FEB","2":"MAR","3":"APR","4":"MAY","5":"JUN","6":"JUL","7":"AUG","8":"SEP","9":"OCT","10":"NOV"},"FULL":"${EEEE}, ${date_long} ${time_long}"},"EDIT_FILE_RT":{"DIALOG_TITLE":"Edit on Desktop","CONNECTOR_DIALOG_MESSAGE":"This feature allows you to edit the file locally.","OK_TITLE":"Edit on Desktop","ACTION":"Edit on Desktop","CONNECTOR_DIALOG_WARNING":": Once you complete editing, you must publish a draft using the desktop file connectors. If the file fails to open, you might need to install the desktop plugins.","CONNECTOR_DIALOG_CHECKBOX":"Don\'t show this message again.","BUSY":"Opening...","CANCEL":"Cancel","ACTION_TOOLTIP":"Edit this document","OK":"Edit on Desktop","CONNECTOR_DIALOG_IMPORTANT":"Important"},"ABOUT_COLLECTION":{"ADDED":"Created: ","ITEM_COUNT":"Files included: ","TIMESTAMP":{"MONTH":"${EEEE}, ${date} by ${user}","TODAY":"${EEEE}, Today at ${time} by ${user}","YESTERDAY":"${EEEE}, Yesterday at ${time} by ${user}","DAY":"${EEEE}, ${date} by ${user}","YEAR":"${EEEE}, ${date_long} by ${user}","FULL":"${EEEE}, ${date_long} ${time_long} by ${user}"},"TITLE":"About this Folder","CONTENTS":"Folder contents updated:","UPDATED":"Any update:","DESCRIPTION":"Description:","NO_DESCRIPTION":"There is no description for this folder."},"COMMUNITYSEARCH":{"HINT_TEXT":"Community name...","NO_RESULTS":"No results for \'${0}\'","SHARE_LINK":"Share with a community...","SOURCE":"a Community"},"DELETE_COLLECTION":{"ACTION":"Delete","ACTION_TOOLTIP":"Delete this folder"},"NOTIFY_FILE":{"UNSUBSCRIBE":{"ALL":"You have stopped following this file.","CONTENT":"You will no longer receive updates when this file is changed.","COMMENT":"You will no longer receive updates when this file is commented on."},"ERROR":"Your following settings on this file were not changed due to an error.  Please try again.","SUBSCRIBE":{"ALL":"You are now following this file.","CONTENT":"You will now receive updates when this file is changed.","COMMENT":"You will now receive updates when comments are made on this file."}},"MAKE_COLLECTION_PRIVATE":{"ACTION":"Remove public access","ACTION_TOOLTIP":"Remove your organization\'s access "},"APP_NAME_TITLE_BAR":"Files","TITLEBAR":{"ALLUSERS_TITLE":"Search for other people","OFFLINE":"Offline","ALLUSERS":"Find People","GO":"Go","SEARCH":"Search","SHARES_TITLE":"All of the shares that you are involved in","COLLECTIONS_TITLE":"See folders of files","MYCHANNEL_TITLE":"All of your files","SHARES":"My Shares","COLLECTIONS":"Folders","MYCHANNEL":"Files","HOME_TITLE":"See what\'s happening in Files","HOME":"Updates"},"WARNING_COLON":"Warning:","SHARING":{"SHARED_WITH":{"MONTH":"Shared with ${user} on ${MMM} ${d}","TODAY":"Shared with ${user} today at ${time}","YESTERDAY":"Shared with ${user} yesterday at ${time}","DAY":"Shared with ${user} on ${EEEE} at ${time}","YEAR":"Shared with ${user} on ${date_long}"},"EXPAND_ERROR":{"TIMEOUT":"The details of this share could not be loaded because the server could not be contacted.","NOT_FOUND":"The details of this share could not be loaded because the file has been deleted or is no longer visible.","GENERIC":"An error prevented the details of this share from being displayed.  Please try again later.","CANCEL":"The details of this share could not be loaded because the request was cancelled."},"USERS_POPUP_FILE":{"ADD":"Add","COMMUNITY_MEMBERS":"${0}","READERS_LABEL":"Readers:\xa0","EMPTY_CONTRIBUTORS":"None","EXTERNAL":"This file is shared with external people or communities:","CONTRIBUTORS_LABEL":"Editors:\xa0","READER_IF_PUBLIC":"Everyone in ${company}","EXTERNAL_E":"This file is shared with external people:","EXTERNAL_COLLECTION":"This folder is shared with external people or communities:","OWNER":"This file is owned by ${user}.","COMMUNITY_OWNERS":"${0} (owners only)","SHOW_MORE":"Show more...","NEVER_SHARED":"You have not shared this file with anyone","ALSO_SHARED_LINK":"folders","ALSO_SHARED":"Other people have access to this file through one or more shared ${0}","EMPTY_READERS":"None","MY_SHARES":"My shares","SHARE_INTENT_COLLECTIONS_T":"Shared externally","OWNER_LABEL":"Owner:\xa0","ERROR":"The server could not be contacted.","ERROR_TIMEOUT":"The server could not be contacted.","COMMUNITY_TOOLTIP":"Shared with members of the community \'${0}\'","EMPTY":"Not shared with anyone","NO_INVOLVED_SHARES":"You have not shared this file or been shared with","ERROR_CANCEL":"The request was cancelled.  Please try again.","SHARE_INTENT_T":"Shared externally","COMMUNITY_TOOLTIP_OWNERS":"Shared with owners of the community \'${0}\'","READER_IF_PUBLIC_TOOLTIP":"This file is visible to everyone in ${company}","ERROR_NOT_FOUND":"This information cannot be displayed because the file has been deleted or is no longer shared with you.","ERROR_ACCESS_DENIED":"This information cannot be displayed because the file has been deleted or is no longer shared with you."},"EVT_VIEW_ONE":{"MONTH":"${user} shared with ${list} on ${MMM} ${d}","TODAY":"${user} shared with ${list} today at ${time}","YESTERDAY":"${user} shared with ${list} yesterday at ${time}","DAY":"${user} shared with ${list} on ${EEEE} at ${time}","YEAR":"${user} shared with ${list} on ${date_long}"},"USERS_POPUP_COLLECTION":{"ERROR_CANCEL":"The request was cancelled.  Please try again.","ADD":"Add","OWNER":"This folder is owned by ${user}.","ERROR":"The server could not be contacted.","ERROR_TIMEOUT":"The server could not be contacted.","GROUP_NAME":"${0} (group)","EMPTY":"Not shared with anyone","ERROR_ACCESS_DENIED":"This information cannot be displayed because the folder has been deleted or is no longer shared with you.","ERROR_NOT_FOUND":"This information cannot be displayed because the folder has been deleted or is no longer shared with you."},"COLLECT":{"EDITOR_LABEL":"Editors:","CONTRIBUTOR_IF_ALL_AUTH":"Everyone in ${company}","ADD_ALL_AUTHED_USERS_AS_EDITOR":"Everyone in ${company} can edit this folder","SHARING_VISIBLE_EXTERNALLY_AND_SHARE_AT_TOP":"Folder may be visible to people outside of your organization. Sharing is set at the top folder.","EDITOR_ROLE":"as Editor","SHARING_VISIBLE_EXTERNALLY":"Folder may be visible to people outside of your organization","CONTRIBUTOR_LABEL_TITLE":"Contributors","VISIBILITY_PUBLIC_LABEL":"Everyone in my organization","SHARE_TYPE_LABEL":"Type","READER_LABEL_TITLE":"Readers","SHARING_VISIBLE_COMMUNITY_MEMBERS":"Folder will be visible to community members only","ADD_MEMBER_HEADER":"Share with:","VISIBILITY_PEOPLE_GROUPS_COMMUNITIES_LABEL":"People, Groups, or Communities","ADD_MEMBER":"Share with:","VISIBILITY_PEOPLE_COMMUNITIES_LABEL":"People or Communities","WARN_OWNER":"You cannot share with the owner of the folder.","ADD_ALL_AUTH_CONTRIBUTOR":"Everyone in ${company} can contribute to this folder","MANAGER_LABEL":"Owners:","SHARING_VISIBLE_ORGANIZATION":"Folder will be visible to your entire organization","ADD_TOOLTIP":"Share with this user","SHARING_VISIBLE_MEMBERS_AND_SHARE_AT_TOP":"Folder will be visible to you and others. Sharing is set at the top folder.","CONTRIBUTOR_EMPTY":"None","VISIBILITY_NO_ONE_LABEL":"No one","VISIBILITY_PEOPLE_GROUPS_LABEL":"People or Groups","SHARING_PRIVATE_AND_SHARE_AT_TOP":"Folder will be visible only to you. Sharing is set at the top folder.","READER_EMPTY":"None","VISIBILITY_PEOPLE_LABEL":"People","VISIBILITY_NO_ONE_DESCRIPTION":"(shared with me only)","WARN_GRANT_ALL_AUTHED_USERS_TO_EDIT_FOLDER":"If you allow everyone to edit this folder, all files that are not visible to your entire organization will be removed.","VISIBILITY_PEOPLE_GROUPS_DESCRIPTION":"(give specific permissions to others)","SELECT_USER_GROUP_DISABLED_ERROR":"Please select a person or community to share with.","EDITOR_LABEL_TITLE":"Editors","SHARING":"Sharing:","SHARE_ROLE_LABEL":"Role","SHARING_VISIBLE_ORGANIZATION_AND_SHARE_AT_TOP":"Folder will be visible to your entire organization. Sharing is set at the top folder.","READER_IF_PUBLIC":"Everyone in ${company}","CONTRIBUTOR_LABEL":"Contributors:","ADD_MEMBER_TITLE":"Share with","VISIBILITY_PUBLIC_DESCRIPTION":"","WARN_AUTH_CHANGE_ALL_AUTH":"Adding everyone as contributors will make this folder public.","SHARING_BY_TOP_LEVEL_FOLDER":"Sharing can only be set at the top level folder: ${topFolder}.","READER_LABEL":"Readers: ","SELECT_USER_GROUP_ENABLED_ERROR":"Please select a person, group or community to share with.","EDITOR_EMPTY":"None","MANAGER_LABEL_TITLE":"Owners","SHARING_BY_TOP_FOLDER":"Sharing is set at the top folder.","SELECT_USER_GROUP_ENABLED_ERROR_E":"Please select a person or group to share with.","WARN_ADD_ALL_AUTHED_USERS_AS_EDITOR":"Adding everyone as editors will make this folder visible to your entire organization.","MANAGER_ROLE":"as Owner","SHARING_HEADER":"Sharing:","READER_ROLE":"as Reader","VISIBILITY_PUBLIC_WARNING":"Files which are not visible to everyone in ${company} will be removed from this folder.","CONTRIBUTOR_ROLE":"as Contributor","MANAGER_EMPTY":"None","NO_MEMBERS":"None","SELECT_USER_GROUP_DISABLED_ERROR_E":"Please select a person to share with."},"SHARED_WITH_TWO":{"MONTH":"Shared with ${user} and ${count} on ${MMM} ${d}","TODAY":"Shared with ${user} and ${count} today at ${time}","YESTERDAY":"Shared with ${user} and ${count} yesterday at ${time}","DAY":"Shared with ${user} and ${count} on ${EEEE} at ${time}","YEAR":"Shared with ${user} and ${count} on ${date_long}"},"EVT_EDIT_ONE":{"MONTH":"${user} added ${list} as an editor on ${MMM} ${d}","TODAY":"${user} added ${list} as an editor today at ${time}","YESTERDAY":"${user} added ${list} as an editor yesterday at ${time}","DAY":"${user} added ${list} as an editor on ${EEEE} at ${time}","YEAR":"${user} added ${list} as an editor on ${date_long}"},"SHARED_WITH_MANY_1":"${0} others","SHARED_BY":{"MONTH":"Shared by ${user} on ${MMM} ${d}","TODAY":"Shared by ${user} today at ${time}","YESTERDAY":"Shared by ${user} yesterday at ${time}","DAY":"Shared by ${user} on ${EEEE} at ${time}","YEAR":"Shared by ${user} on ${date_long}"},"RELATED_MICROBLOG":"This file is associated with one or more status updates.","EVT_EDIT_MANY":{"MONTH":"${user} added ${list} as editors on ${MMM} ${d}","TODAY":"${user} added ${list} as editors today at ${time}","YESTERDAY":"${user} added ${list} as editors yesterday at ${time}","DAY":"${user} added ${list} as editors on ${EEEE} at ${time}","YEAR":"${user} added ${list} as editors on ${date_long}"},"EVT_VIEW_MANY":{"MONTH":"${user} shared with ${list} on ${MMM} ${d}","TODAY":"${user} shared with ${list} today at ${time}","YESTERDAY":"${user} shared with ${list} yesterday at ${time}","DAY":"${user} shared with ${list} on ${EEEE} at ${time}","YEAR":"${user} shared with ${list} on ${date_long}"},"SHARED_WITH_MANY":{"MONTH":"Shared with ${user} and ${count} on ${MMM} ${d}","TODAY":"Shared with ${user} and ${count} today at ${time}","YESTERDAY":"Shared with ${user} and ${count} yesterday at ${time}","DAY":"Shared with ${user} and ${count} on ${EEEE} at ${time}","YEAR":"Shared with ${user} and ${count} on ${date_long}"},"SHARED_WITH_TWO_1":"one other"},"SUBSCRIBE_TO_PAGE":"Feed for this Page","EXTERNAL_USER":"External user","CREATE_COLLECTION":{"ACTION_IN_MENU":"Folder...","ACTION_TOOLTIP_SUB_COLLECTION":"Create a new folder to put files into","ACTION":"New Folder","ACTION_SUB_COLLECTION":"New Folder...","ACTION_TOOLTIP":"Create a new folder to put files into"},"VERSIONCOMPARISON":{"ERRORS":{"DEFAULT":{"TITLE":"Unable to show version comparison","MESSAGES":"Version ${0} cannot be used for a comparison because there is a problem converting it to wiki text.  Return to the file and try comparing other versions."},"TWO":{"TITLE":"Unable to show version comparison","MESSAGES":"Versions ${0} and ${1} cannot be used for a comparison because there is a problem converting them to wiki text.  Return to the file and try comparing other versions."}}},"SERVICETITLE":"Atom Publishing Protocol Service Document","FORCE_MOVE":{"DIALOG_TITLE":"Force Move","OK_HERE":"Move Here","ACTION":"Force Move","BUSY":"Moving...","ACTION_TOOLTIP":"Force Move","CANCEL":"Cancel","MULTI_ITEMS":{"VISIBILITY_CHANGE_FILE_1":"File ${item} will be made to visible to everyone in your organization.","VISIBILITY_FOLDER_FILE_1":"Files in folder ${item} will be removed because they are not visible to everyone. All other files will become visible to everyone in your organization.","VISIBILITY_CHANGE_FOLDER_1":"Folder ${item} contains one or more files are not visible to everyone in your organization. These files will be removed.","RESHAREOFF_FOLDER_FILE_1":"Files in folder ${item} will be removed because the owner does not allow others to share. All other files will become visible to everyone in your organization.","RESHARE_OFF_FOLDER_1":"Folder ${item} contains one or more files that the owner does not allow others to share. These files will be removed.","VISIBILITY_CHANGE_FILE_X":"${filecount} files will be made to visible to everyone in your organization.","VISIBILITY_FOLDER_FILE_X":"Files in ${foldercount} folders will be removed because they are not visible to everyone. All other files will become visible to everyone in your organization.","VISIBILITY_CHANGE_FOLDER_X":"${foldercount} folders contains one or more files are not visible to everyone in your organization. These files will be removed.","RESHAREOFF_FOLDER_FILE_X":"Files in ${foldercount} folders will be removed because the owner does not allow others to share. All other files will become visible to everyone in your organization.","RESHARE_OFF_FOLDER_X":"${foldercount} folders contain one or more files that the owner does not allow others to share. These files will be removed."},"OK":"Move","FILE":{"VISIBILITY_CHANGE_MESSAGE_FOLDER_X":"These folders contain one or more files that the owner does not allow others to share. These files will be removed.","INFO_SUCCESS":"The file was moved to ${target}.","SOURCE_PARENT_NOT_FOUND":"The folder that contains the file you want to move does not exist any more.","VISIBILITY_CHANGE_MESSAGE":"This file will be made to visible to everyone in your organization","ACCESS_DENIED":"You do not have permission to move the file into ${target}.","ERROR":"The file was not moved to ${target} due to an error.","ITEM_NOT_FOUND_IN_SOURCE_PARENT":"The selected file does not exist in the source folder any more.","ITEM_NOT_FOUND":"The selected file does not exist any more.","FILE":{"SOURCE_NOT_MOVEABLE":"The selected file cannot be moved."},"VISIBILITY_CHANGE_MESSAGE_X":"These files will be made to visible to everyone in your organization","TARGET_PARENT_NOT_FOUND":"The target folder you want to move the selected file to does not exist any more."},"FOLDER":{"INFO_SUCCESS":"The folder was moved to ${target}.","VISIBILITY_CHANGE_MESSAGE":"Files that are not visible to everyone in your organization will be removed from this folder","SOURCE_PARENT_NOT_FOUND":"The folder that contains this folder you want to move does not exist any more.","ERROR":"The folder was not moved to ${target} due to an error.","ITEM_NOT_FOUND_IN_SOURCE_PARENT":"The selected folder does not exist in the source folder any more.","ITEM_NOT_FOUND":"The selected folder does not exist any more.","RESHARE_OFF_CHANGE_MESSAGE":"This folder contains one or more files that the owner does not allow others to share.  These files will be removed.","SOURCE_NOT_MOVEABLE":"The selected folder cannot be moved.","TARGET_PARENT_NOT_FOUND":"The target folder you want to move the selected folder to does not exist any more."}},"ERROR_IN_APP_MESSAGE":"Click the browser back button to return to the previous page and try again.  If this error persists, report the problem to your administrator.","JAVASCRIPT_DISABLED_TITLE":"Turn on JavaScript","JUMPT_TO_SUMMARYPAGE":{"ACTION":"Summary","ACTION_TOOLTIP":"Go to the detailed page of this file","NAME":"Summary"},"ERROR_DETAILS":"Report this problem to your administrator.","MOVE_COLLECTION":{"DIALOG_TITLE":"Move to...","WARN_PUBLIC":"Adding this folder to the selected folder will make the folder public (shared with everyone).","CROSS_COMMUNITY_MOVE_NOT_ALLOWED":"The folder cannot be moved the a folder in another community.","INFO_SUCCESS_1":"The folder was moved to ${target}.","ACCESS_DENIED_1":"Only folder owners can move the top level folder.","INTERNAL_FOLDER_TO_EXTERNAL_FOLDER":"The move failed because ${collection} is an internal folder and ${target} can be shared outside of your organization.","ACCESS_DENIED":"You do not have permission to move the folder to ${target}.","ITEM_EXISTS_SUBFOLDER":"There is already a folder named ${collection} in this folder. Rename one of the folders if you want to try again.","ACTION_TOOLTIP":"Move this folder","SOURCE_NOT_MOVEABLE":"The selected folder cannot be moved.","OK":"Move","ACTION_LONG":"Move to...","SOURCE_PARENT_NOT_FOUND":"The folder that contains the folder you want to move does not exist any more.","COLLECTION_TYPE_MISSMATCH":"It is not allowed to move personal folder to community owned folder or move community owned folder to personal folder.","ERROR":"The folder was not moved to ${target} due to an error.","ITEM_NOT_FOUND_IN_SOURCE_PARENT":"The selected folder does not exist in the source folder any more.","ITEM_NOT_FOUND":"The selected folder you want to move does not exist any more.","ITEM_EXISTS_TOPFOLDER":"You already own a top level folder named ${collection}. Rename one of the folders if you want to try again.","INFO":"Moving the folder will cause other people to lose access to the folder and its content.","TARGET_PARENT_NOT_FOUND":"The target folder you want to move to does not exist any more.","CANNOT_MOVE_PERSONALFOLDER_TO_COMMUNITYFOLDER":"You cannot move a personal folder into a community folder.","ACTION":"Move","CANNOT_MOVE_COMMUNITYFOLDER_TO_PERSONALFOLDER":"You cannot move a community folder into a personal folder.","INVALID_TARGET":"Folders cannot be moved into their own subfolders.","BUSY":"Moving...","CANCEL":"Cancel","OK_MOVE_HERE":"Move Here"},"ELLIPSIS":"...","TOGGLE_FOLLOWING_FILE":{"FOLLOW":{"INFO_SUCCESS":"You are now following this file: ${0}."},"ERROR_CANCEL":"The file could not be updated because the request was cancelled. Please try again.","STOP_FOLLOWING":{"INFO_SUCCESS":"You have stopped following this file: ${0}. "},"ERROR":"The file could not be updated. Please try again later.","ACTION_ADD":"Follow","ERROR_TIMEOUT":"The file could not be updated because the server could not be contacted. Please try again.","ACTION_TOOLTIP":"Toggle whether you will receive updates about this file","ACTION_REMOVE":"Stop Following","ERROR_NOT_FOUND":"The file could not be updated because it has been deleted or is no longer shared with you.","ACTION_ERROR":"Error","ERROR_NOT_LOGGED_IN":"The file could not be updated because you were not logged in. Please log in and try again."},"CONTINUE_TO_APP":"Continue to Files","CREATE_COMMUNITY_FILE":{"DIALOG_TITLE":"Upload Files","ACTION":"New Upload...","ACTION_TOOLTIP":"Upload files from your computer","OK":"Upload"},"SCENE_TITLE_FILE":"File: ${0}","ERROR_IN_APP_TITLE":"We are unable to process your request","WELCOMECONTENT":{"BLURB_LOG_IN":"Log in to start using Files.","BLURB_HELP":"Tip: Click ${helpLink} to see help on a specific feature or click Help to view all help topics.","BLURB_UPLOAD":"Click \"Upload Files\" to add a file.","HELP_ALT":"Help","TAKE_TOUR":"View Demo","LEARN_MORE":"Learn More","BLURB1":"{0}Add your own files{1}.","BLURB2":"{0}Find files{1} by searching or looking in different views.","BLURB3":"{0}Edit, comment on, and \"like\" {1} files to recommend to others.","CLOSE":"Close Files Welcome Panel","TITLE":"New to Files?","BLURB4":"Download {0}IBM Connections Plug-ins{1} and use Sync.","BLURB":"Create and collaborate on content with colleagues. Learn how to:"},"CLOSE":"Close","RECENT_SHARES":{"TITLE":"People recently shared with","ERROR":"Server could not be contacted.","ALT":"Recent People","EMPTY":"You have not shared with anyone yet."},"TOGGLE_SECTION":"Expand and collapse this section","FILTERS":{"SHARED_WITH":{"OPTION_EMPTY":"With a specific person:","NOT_PUBLIC_LONG":"Shared with you and not visible to everyone in the owner\'s organization","OPTION_EMPTY_TOOLTIP":"Only show files that were shared with a specific person","PUBLIC":"and everyone in my organization","PUBLIC_TOOLTIP":"Files that are shared with you and visible to everyone in the owner\'s organization","COLLAPSE":"Collapse the shared with filter","PUBLIC_LONG":"Shared with you and visible to everyone in the owner\'s organization","NOT_PUBLIC":"and not everyone in my organization","OPTION":"With ${0}","TITLE":"Shared With","FILTER":"Shared with ${0}","NOT_PUBLIC_TOOLTIP":"Files that shared with you but that are not visible to everyone in the owner\'s organization","EXPAND":"Expand the shared with filter"},"SEARCH":{"TITLE":"Search for \"${0}\""},"COLLECTION_CREATOR":{"OPTION_ME":"Me","OPTION_EMPTY":"Enter a person directly:","OPTION":"by ${0}","OPTION_EMPTY_TOOLTIP":"Only show folders created by a specific person","TITLE":"Created By","FILTER":"Created by ${0}","EXPAND":"Expand the creator filter","HEADER":"Created By:","COLLAPSE":"Collapse the creator filter"},"COLLECTION_NAME":{"OPTION":"contains \'${0}\'","FILTER":"Name contains \'${0}\'","TITLE":"Folder name","EXPAND":"Expand the folder name filter","COLLAPSE":"Collapse the folder name filter"},"MY_TAGS":{"TITLE":"Tags","EXPAND":"Expand the tags filter","COLLAPSE":"Collapse the tags filter","HEADER":"Tags:"},"USER_TAGS":{"TITLE":"Tags","EXPAND":"Expand the tags filter","COLLAPSE":"Collapse the tags filter","HEADER":"Tags:"},"DATE":{"TODAY":{"TOOLTIP":"Only updated since midnight today","NAME":"Today","LONG":"Only updated since midnight today "},"LASTYEAR":{"TOOLTIP":"Only updated in the last 365 days","NAME":"Last 365 days","LONG":"Only updated in the last 365 days "},"TITLE":"Date Updated","EXPAND":"Expand the date updated filter","LASTWEEK":{"TOOLTIP":"Only updated in the last 7 days","NAME":"Last 7 days","LONG":"Only updated in the last 7 days "},"LASTMONTH":{"TOOLTIP":"Only updated in the last 30 days ","NAME":"Last 30 days","LONG":"Only updated in the last 30 days "},"HEADER":"Date Updated:","COLLAPSE":"Collapse the date updated filter"},"PERMISSION":{"OUTBOUND":{"EDIT_LONG":"Shared with as an editor","VIEW_LONG":"Files other people can read but not edit","TITLE":"Role","VIEW_TOOLTIP":"Files other people can read but not edit","EXPAND":"Expand the role filter","HEADER":"Role:","COLLAPSE":"Collapse the role filter","EDIT_TOOLTIP":"Show only files other people can edit"},"VIEW":"Reader","INBOUND":{"EDIT_LONG":"Shared as an editor","VIEW_LONG":"Files you can read but not edit","TITLE":"Role","VIEW_TOOLTIP":"Files you can read but not edit","EXPAND":"Expand the role filter","HEADER":"Role:","COLLAPSE":"Collapse the role filter","EDIT_TOOLTIP":"Show only files I can edit"},"EDIT":"Editor"},"SHARED_BY":{"OPTION_EMPTY":"By a specific person:","NOT_PUBLIC_LONG":"Shared by you and not visible to everyone in the owner\'s organization","OPTION_EMPTY_TOOLTIP":"Only show files that were shared by a specific person","PUBLIC":"and everyone in my organization","COLLAPSE":"Collapse the shared by filter","PUBLIC_TOOLTIP":"Files that are shared by you and visible to everyone in the owner\'s organization","PUBLIC_LONG":"Shared by you and visible to everyone in the owner\'s organization","NOT_PUBLIC":"and not everyone in my organization","OPTION":"by ${0}","FILTER":"Shared by ${0}","TITLE":"Shared By","NOT_PUBLIC_TOOLTIP":"Files that are shared by you but are not visible to everyone in the owner\'s organization","EXPAND":"Expand the shared by filter"},"DATE_SHARED":{"TODAY":{"TOOLTIP":"Only shared since midnight today","NAME":"Today","LONG":"Only shared since midnight today "},"LASTYEAR":{"TOOLTIP":"Only shared in the last 365 days","NAME":"Last 365 days","LONG":"Only shared in the last 365 days "},"TITLE":"Date Shared","EXPAND":"Expand the date shared filter","LASTWEEK":{"TOOLTIP":"Only shared in the last 7 days","NAME":"Last 7 days","LONG":"Only shared in the last 7 days "},"LASTMONTH":{"TOOLTIP":"Only shared in the last 30 days ","NAME":"Last 30 days","LONG":"Only shared in the last 30 days "},"HEADER":"Date Shared:","COLLAPSE":"Collapse the date shared filter"},"ALL_TAGS":{"TITLE":"${company} tags","EXPAND":"Expand the tags filter","COLLAPSE":"Collapse the tags filter","HEADER":"Public Tags:"},"DATE_CREATED":{"TODAY":{"TOOLTIP":"Only created since midnight today ","NAME":"Today","LONG":"Only created since midnight today "},"LASTYEAR":{"TOOLTIP":"Only created in the last 365 days","NAME":"Last 365 days","LONG":"Only created in the last 365 days"},"TITLE":"Date Created","EXPAND":"Expand the date created filter","LASTWEEK":{"TOOLTIP":"Only created in the last 7 days ","NAME":"Last 7 days","LONG":"Only created in the last 7 days "},"LASTMONTH":{"TOOLTIP":"Only created in the last 30 days ","NAME":"Last 30 days","LONG":"Only created in the last 30 days "},"HEADER":"Date Created:","COLLAPSE":"Collapse the date created filter"},"COLLECTION_ROLE":{"CONTRIBUTOR_LONG":"Shared with as contributor","HEADER":"Role:","COLLAPSE":"Collapse the folder role filter","EDITOR":"Editor","MANAGER":"Owner","EDITOR_LONG":"Shared with as editor","MANAGER_LONG":"Shared with as owner","EDITOR_TOOLTIP":"Show only the folders to which I can edit","MANAGER_TOOLTIP":"Show only the folders I can share with other people","TITLE":"Role","EXPAND":"Expand the folder role filter","CONTRIBUTOR":"Contributor","CONTRIBUTOR_TOOLTIP":"Show only the folders to which I can add files"},"COLLECTION_SHARED_WITH_ME":{"PUBLIC_LONG":"Folders visible to everyone in the owner\'s organization","NOT_PUBLIC_SHORT":"but not my entire organization","NOT_PUBLIC":"and not visible to everyone in your organization","NOT_PUBLIC_LONG":"Folders that aren\'t visible to everyone in the owner\'s organization","PUBLIC_SHORT":"and my entire organization","NOT_PUBLIC_TOOLTIP":"Folders that aren\'t visible to everyone in your organization but are shared with one or more people","PUBLIC":"and organization","PUBLIC_TOOLTIP":"Folders that are shared with you and your organization"},"EVENT":{"SHARED_WITH":"Shared with","COMMENTS":"Comments","TITLE":"Events","PEOPLE_JOINED":"People joined","RECOMMENDATIONS":"Likes","MEDIA_UPDATES":"File updates"},"TYPE":{"FILES_LONG":"Uploaded files only","PAGES":"rich-text files","PAGES_LONG":"Rich-text files only","FILES":"uploaded files","PAGES_TOOLTIP":"All rich-text files created by this person","TITLE":"Type","EXPAND":"Expand the type filter","FILES_TOOLTIP":"Any file that was uploaded from a computer","COLLAPSE":"Collapse the type filter"},"COLLECTION_TYPE":{"PUBLIC_LONG":"Folders shared with everyone in your organization","PRIVATE":"With no one (private)","SHARED":"With specific people","SHARED_LONG":"Shared Folders","PRIVATE_TOOLTIP":"Folders that only I can see","PRIVATE_LONG":"Private to me","TITLE":"Sharing","SHARED_TOOLTIP":"Visible only to members but can contain any type of file","PUBLIC":"With an organization","EXPAND":"Expand the sharing filter","PUBLIC_TOOLTIP":"Visible to everyone in your organization and can only contain files with organization access.","COLLAPSE":"Collapse the sharing filter"},"SHARE":{"SELECTIVE_TOOLTIP":"Files that are not shared with everyone in your organization but are shared with one or more people","PRIVATE":"With no one (private)","NOT_PUBLIC_LONG":"Files that are not shared with everyone in your organization but are shared with one or more people","PRIVATE_TOOLTIP":"Files that only I can see","PUBLIC":"With an organization","HEADER":"Sharing:","PUBLIC_TOOLTIP":"Files that are visible to everyone in the owner\'s organization","COLLAPSE":"Collapse the sharing filter","PUBLIC_LONG":"Files that are visible to everyone in the owner\'s organization","NOT_PUBLIC":"With one or more people","PRIVATE_LONG":"Private to me","TITLE":"Sharing","NOT_PUBLIC_TOOLTIP":"Files that are not shared with everyone in your organization but are shared with one or more people","EXPAND":"Expand the sharing filter","SELECTIVE":"With one or more people","SELECTIVE_LONG":"Files that are not shared with everyone in your organization but are shared with one or more people"}},"OK":"OK","ADD_FILE_TO_COLLECTION":{"BULK_INFO_FAIL_X_IN_OTHER_FOLDERS":"${count} files were added to ${collectionlink}. Some files were failed due to permission limitation or reshare is off. Some files are also in other folders. View sharing tab of each file for details.","BULK_WARN_FAIL_SUCCESS_EXIST_INTERNAL_EXTERNAL_1":"${filelink} was added in ${collectionlink}. Some files were already added in the folder. Some files were not added because ${collectionlink} is a folder that can be shared outside of your organization and the files cannot.","BULK_WARN_FAIL_INTERNAL_EXTERNAL_1":"${filelink} was added in ${collectionlink}. Some files were not added because ${collectionlink} is a folder that can be shared outside of your organization and the files cannot.","NO_FILTERED_COLLECTIONS":"You are not a contributor or owner of any folder with the specified name.","BULK_WARN_FAIL_SUCCESS_EXIST_ACCESS_DENIED_1":"${filelink} was added in ${collectionlink}. Some files were already added in the folder. Some files were not added because you do not have permission.","BULK_INFO_FAIL_X_EXIST_RESHAREOFF":"${count} files were added to ${collectionlink}. Some files have existed in the folder. Some files were not added because the owner does not allow others to share them.","BULK_WARN_FAIL_ACCESS_DENIED_1":"${filelink} was added in ${collectionlink}. Some files were not added because you do not have permission.","OK_TITLE":"Add this file to the selected folder","BULK_INFO_FAIL_ITEM_EXISTS_X_IN_OTHER_FOLDERS":"${count} files were added to ${collectionlink}. Some files are already in this folder. Some files are also in other folders. View sharing tab of each file for details.","INFO_SUCCESS_1_IN_OTHER_FOLDERS":"${filelink} was added to ${collectionlink}. ${undolink}. It is also in other folders. View the sharing tab of this file for details.","ACTION_ENABLED":"Add to folder button is enabled","NO_PRIVATE_COLLECTIONS":"You cannot add a shared or private file to a public folder. You do not have a private folder at this time.","FILTER_TOOLTIP":"Enter a folder name","WARN_PUBLIC_XX":"Adding these files to the selected folder will make the file public.","BULK_ERROR_FAIL_INTERNAL_EXTERNAL_1":"${filelink} was not added because ${collectionlink} is a folder that can be shared outside of your organization and the file cannot.","INFO_SUCCESS_SHARED_1":"${filelink} was added to ${collectionlink} and is now shared. ${undolink}","INFO_SUCCESS_PUBLIC_1":"${filelink} was added to ${collectionlink} and is now public. ${undolink}","BULK_ERROR_FAIL_ACCESS_DENIED_1":"${filelink} was not added because you do not have permission.","BULK_WARN_FAIL_SUCCESS_EXIST_INTERNAL_EXTERNAL_X":"${succeedcount} files were added in ${collectionlink}. Some files were already added in the folder. Some files were not added because ${collectionlink} is a folder that can be shared outside of your organization and the files cannot.","BULK_INFO_FAIL_PERMISSION_DENIED":"You do not have permission to add files to ${collectionlink}.","BULK_WARN_FAIL_INTERNAL_EXTERNAL_X":"${succeedcount} files were added in ${collectionlink}. Some files were not added because ${collectionlink} is a folder that can be shared outside of your organization and the files cannot.","ERROR_NOT_FOUND_1":"The file was not added because the selected folder has been deleted or is no longer shared with you.","ACTION_TOOLTIP_X":"Add ${0} files to a folder","LABEL_PUBLIC":"You are allowed to contribute to the following folders","BULK_INFO_FAIL_X_EXIST_COM":"${count} files were added to ${collectionlink}. Some files have existed in the folder. Some community files were not added into a personal folder.","BULK_WARN_FAIL_SUCCESS_EXIST_ACCESS_DENIED_X":"${succeedcount} files were added in ${collectionlink}. Some files were already added in the folder. Some files were not added because you do not have permission.","ACTION":"Add to Folder","BULK_WARN_FAIL_ACCESS_DENIED_X":"${succeedcount} files were added in ${collectionlink}. Some files were not added because you do not have permission.","BULK_WARN_FAIL_SUCCESS_EXIST_CONSTRAINTVIOLATION_1":"${filelink} was added in ${collectionlink}. Some files were already added in the folder. Some files were not added because ${collectionlink} is visibile to everyone in your organization. Only the owner can make this move.","BULK_WARN_FAIL_CONSTRAINTVIOLATION_1":"${filelink} was added in ${collectionlink}. some files were not added because ${collectionlink} is visibile to everyone in your organization. Only the owner can make this move.","MOST_RECENT_COLLECTION":"The last folder selected was ${collectionName}","BULK_INFO_FAIL_PERSONAL_TO_COMMUNITY":"You cannot move personal files shared with the community into a community folder.","BULK_WARN_FAIL_SUCCESS_EXIST_COMMUNITY_TO_PERSONAL_1":"${filelink} was added in ${collectionlink}. Some files were already added in the folder. Some files were not added because community files can not added in a personal folder.","INTERNAL_FOLDERS_ONLY":"This file cannot be added to folder that can be shared outside of your organization.","BULK_ERROR_FAIL_INTERNAL_EXTERNAL_X":"${count} files were not added to this folder because ${collectionlink} is a folder that can be shared outside of your organization and the files cannot.","BULK_INFO_FAIL_COMMUNITY_TO_PERSONAL_X":"${count} files were added to ${collectionlink}. Some community files were not added into a personal folder.","BULK_WARN_FAIL_COMMUNITY_TO_PERSONAL_1":"${filelink} was added in ${collectionlink}. Some files were not added because community files can not added in a personal folder.","INFO_SUCCESS_SHARED_X":"${filelink} was added to ${count} folders and is now shared. ${undolink}","BULK_ERROR_FAIL_EXISTS_1":"${filelink} was already in ${collectionlink}.","SHOW_ONLY_SOME_FOLDERS":"Showing only folders to which you can add this content.","INFO_SUCCESS_PUBLIC_X":"${filelink} was added to ${count} folders and is now public. ${undolink}","BULK_INFO_FAIL_VISIBILITY":"Files were not added because ${collectionlink} is visibile to everyone in your organization, only the owner can add files to public folder.","BULK_ERROR_FAIL_ACCESS_DENIED_X":"${count} files were not added because you do not have permission.","BULK_INFO_SUCCESS_X_IN_OTEHR_FOLDER":"${count} files were added to ${collectionlink}. Some files are also in other folders. View sharing tab of each file for details.","ERROR_NOT_FOUND_X":"The file was not added because one or more of the selected folders have been deleted or are no longer shared with you.","BULK_ERROR_FAIL_CONSTRAINTVIOLATION_1":"${filelink} was not added because ${collectionlink} is visibile to everyone in your organization. Only the owner can make this move.","BULK_WARN_FAIL_SUCCESS_EXIST_PERSONAL_TO_COMMUNITY_1":"${filelink} was moved in ${collectionlink}. Some files were already in the folder. Some files were not added because personal files can not added in a community folder.","BULK_INFO_FAIL_ITEM_EXISTS_1":"${count} file was added to ${collectionlink}. Some files are already in this folder.","BULK_INFO_FAIL_ITEM_EXISTS_1_IN_OTHER_FOLDERS":"${count} file was added to ${collectionlink}. Some files are already in this folder. Some files are also in other folders. View sharing tab of each file for details.","ERROR_NOT_LOGGED_IN":"The file was not added because you were not logged in.  Click \'Add to Folder\' to add the file.","BULK_INFO_FAIL_PERSONAL_TO_COMMUNITY_X":"${count} files were added to ${collectionlink}. Some personal files were not added into a community folder.","BULK_WARN_FAIL_PERSONAL_TO_COMMUNITY_1":"${filelink} was moved in ${collectionlink}. Some files were not added because personal files can not added in a community folder.","PRIVATE_FOLDERS_ONLY":"Only the file owner can add this file to a public folder.","BULK_WARN_FAIL_EXIST_INTERNAL_EXTERNAL_1":"${filelink} was already added in ${collectionlink}. Some files were not added because ${collectionlink} is a folder that can be shared outside of your organization and the files cannot.","BULK_ERROR_FAIL_COMMUNITY_TO_PERSONAL_1":"${filelink} was not added because community files were not added in a personal folder.","BULK_WARN_FAIL_EXISTS_1":"${filelink} was added in ${collectionlink}. ${existcount} files were already in the folder.","ACTION_DISABLED":"Add to folder button is disabled","BULK_WARN_FAIL_SUCCESS_EXIST_CONSTRAINTVIOLATION_X":"${succeedcount} files were added in ${collectionlink}. Some files were already added in the folder. Some files were not added because ${collectionlink} is visibile to everyone in your organization. Only the owner can make this move.","BULK_WARN_FAIL_EXIST_ACCESS_DENIED_1":"${filelink} was already added in ${collectionlink}. Some files were not added because you do not have permission.","BULK_WARN_FAIL_CONSTRAINTVIOLATION_X":"${succeedcount} files were added in ${collectionlink}. Some files were not added because ${collectionlink} is visibile to everyone in your organization. Only the owner can make this move.","BULK_WARN_FAIL_SUCCESS_EXIST_COMMUNITY_TO_PERSONAL_X":"${succeedcount} files were added in ${collectionlink}. Some files were already added in the folder. Some files were not added because community files can not added in a personal folder.","BULK_WARN_FAIL_COMMUNITY_TO_PERSONAL_X":"${succeedcount} files were added in ${collectionlink}. Some files were not added because community files can not added in a personal folder.","BULK_ERROR_FAIL_EXISTS_X":"${existcount} files were already in ${collectionlink}.","WARN_PUBLIC_1":"Adding this file to the selected folder will make the file public (shared with everyone).","BULK_WARN_FAIL_SUCCESS_EXIST_RESHARE_OFF_1":"${filelink} was added in ${collectionlink}. Some files were already added in the folder. Some files were not added because the owner does not allow others to share them.","FILTER":"Folders named \'${0}\'","BULK_INFO_SUCCESS_X":"${count} files were added to ${collectionlink}.","BULK_WARN_FAIL_RESHARE_OFF_1":"${filelink} was added in ${collectionlink}. Some files were not added because the owner does not allow others to share them.","HEADLESS":{"ERROR_CANCEL":"${filelink} was not added because the request was cancelled.","ERROR_ACCESS_DENIED_1":"You do not have permission to add files to ${collectionlink}.","ERROR_NOT_FOUND_1":"${filelink} was not added because ${filelink} or ${collectionlink} has been deleted or is no longer shared with you.","ERROR_UNSHAREABLE_FILE":"Only the file owner can add ${filelink} to a folder.","ERROR_NOT_FOUND_2":"Community-owned files cannot be added to a personal folder.","ERROR_ACCESS_DENIED_X":"You do not have permission to add files to one or more of the selected folders.","ERROR":"${filelink} was not added to ${collectionlink} due to an error.","ERROR_NOT_FOUND_X":"${filelink} was not added because ${filelink} or one or more of the selected folders have been deleted or are no longer shared with you.","ERROR_TIMEOUT":"${filelink} was not added because the server could not be contacted.","ERROR_EXTERNAL_COLLECTION":"${filelink} was not added because the folder can be shared outside of your organization and the file cannot.","ERROR_PUBLIC_COLLECTION":"Only the file owner can add ${filelink} to a public folder.","ERROR_NOT_LOGGED_IN":"${filelink} was not added because you were not logged in. Please log in and try again."},"BULK_ERROR_FAIL_PERSONAL_TO_COMMUNITY_1":"${filelink} was not added because personal files were not added in a community folder.","CANCEL":"Cancel","BULK_INFO_FAIL_X":"${count} files were added to ${collectionlink}. Some files were failed due to permission limitation or reshare is off.","INFO_EXISTS_1":"${filelink} was already in ${collectionlink}.","DIALOG_TITLE":"Add to Folder","BULK_ADD_COMMUNITY_ADD_MOVE_1":"${additem} was added to ${collectionlink}, ${movecount} files were moved to ${collectionlink}.","BULK_ERROR_FAIL_CONSTRAINTVIOLATION_X":"${count} files were not added because because ${collectionlink} is visibile to everyone in your organization. Only the owner can make this move.","BULK_WARN_FAIL_SUCCESS_EXIST_PERSONAL_TO_COMMUNITY_X":"${succeedcount} files were moved in ${collectionlink}. Some files were already in the folder. Some files were not added because personal files can not added in a community folder.","BULK_INFO_FAIL_ITEM_EXISTS_X":"${count} files were added to ${collectionlink}. Some files are already in this folder.","INFO_SUCCESS_1":"${filelink} was added to ${collectionlink}. ${undolink}","BULK_WARN_FAIL_PERSONAL_TO_COMMUNITY_X":"${succeedcount} files were moved in ${collectionlink}. Some files were not added because personal files can not added in a community folder.","BULK_WARN_FAIL_EXIST_INTERNAL_EXTERNAL_X":"${existcount} files were already added in ${collectionlink}. Some files were not added because ${collectionlink} is a folder that can be shared outside of your organization and the files cannot.","BULK_ERROR_FAIL_COMMUNITY_TO_PERSONAL_X":"${count} files were not added because community files were not added in a personal folder.","BULK_WARN_FAIL_EXISTS_X":"${succeedcount} files were added in ${collectionlink}. ${existcount} files were already in the folder.","ACTION_X":"Add to Folder","BULK_ERROR_FAIL_RESHARE_OFF_1":"${filelink} was not added because the owner does not allow others to share it.","BULK_WARN_FAIL_EXIST_ACCESS_DENIED_X":"${existcount} files were already added in ${collectionlink}. Some files were not added because you do not have permission.","SHARE_AS_EDITOR":"Allow members of the selected folder to edit this file","WARN_PUBLIC_X":"Adding this file to the selected folders will make the file public (shared with everyone).","BULK_WARN_FAIL_SUCCESS_EXIST_RESHARE_OFF_X":"${succeedcount} files were added in ${collectionlink}. Some files were already added in the folder. Some files were not added because the owner does not allow others to share them.","ERROR_PUBLIC_COLLECTION":"Only the file owner can add this file to a public folder.","BULK_WARN_FAIL_EXIST_CONSTRAINTVIOLATION_1":"${filelink} was already added in ${collectionlink}. Some files were not added because ${collectionlink} is visibile to everyone in your organization. Only the owner can make this move.","BULK_WARN_FAIL_RESHARE_OFF_X":"${succeedcount} files were added in ${collectionlink}. Some files were not added because the owner does not allow others to share them.","BULK_INFO_FAIL_RESHAREOFF":"The files cannot be moved here because the owner does not allow others to share them.","BULK_ERROR_FAIL_PERSONAL_TO_COMMUNITY_X":"${count} files were not added because personal files were not added in a community folder.","BULK_WARN_FAIL_EXIST_COMMUNITY_TO_PERSONAL_1":"${filelink} was already added in ${collectionlink}. Some files were not added because community files can not added in a personal folder.","INTERNAL_PRIVATE_FOLDERS_ONLY":"This file cannot be added to public folder or folders that can be shared outside of your organization.","INFO_EXISTS_X":"${filelink} was already in the selected folders.","BULK_ADD_COMMUNITY_ADD_MOVE_X":"${addcount} files were added to ${collectionlink}, ${movecount} files were moved to ${collectionlink}.","INFO_SUCCESS_X":"${filelink} was added to ${count} folders. ${undolink}","BULK_ADD_COMMUNITY_MOVE_X":"${count} files were moved to ${collectionlink}.","DESCRIPTION_LABEL":"Description: ","ERROR_ACCESS_DENIED_1":"You do not have permission to add files to the selected folder.","ERROR_CANCEL":"The file was not added because the request was cancelled.  Click \'Add to Folder\' to try your request again.","BULK_INFO_FAIL_COMMUNITY_TO_PERSONAL":"You cannot move community files into a personal folder that is shared with the community.","ERROR_UNSHAREABLE_FILE":"Only the file owner can add this file to a folder.","BULK_ERROR_FAIL_RESHARE_OFF_X":"${count} files were not added because the owner does not allow others to share them.","FIND":"Find","BULK_WARN_FAIL_EXIST_PERSONAL_TO_COMMUNITY_1":"${filelink} was already in ${collectionlink}. Some files were not added because personal files can not added in a community folder.","ERROR_EXTERNAL_COLLECTION":"The file was not added to this folder because the folder can be shared outside of your organization and the file cannot. ","ALLOW_EDITORS_TO_EDIT_THIS_FILE":"Allow folder editors to edit this file","SELECT_COLLECTION":"You must select a folder that this file will be added to.","BULK_WARN_FAIL_EXIST_CONSTRAINTVIOLATION_X":"${existcount} files were already added in ${collectionlink}. Some files were not added because ${collectionlink} is visibile to everyone in your organization. Only the owner can make this move.","BULK_ADD_COMMUNITY_MOVE_ADD_1":"${additem} was added to ${collectionlink}, ${moveitem} was moved to ${collectionlink}.","BULK_INFO_FAIL_ALL_ITEM_EXISTS_X":"All the selected files were already in ${collectionlink}. ","BULK_WARN_FAIL_EXIST_COMMUNITY_TO_PERSONAL_X":"${existcount} files were already added in ${collectionlink}. Some files were not added because community files can not added in a personal folder.","BULK_INFO_FAIL_X_EXIST_PER":"${count} files were added to ${collectionlink}. Some files have existed in the folder. Some personal files were not added into a community folder.","BULK_WARN_FAIL_EXIST_RESHARE_OFF_1":"${filelink} was already added in ${collectionlink}. Some files were not added because the owner does not allow others to share them.","ERROR_ACCESS_DENIED_X":"You do not have permission to add files to one or more of the selected folders.","ACTION_TOOLTIP":"Add this file to a folder","OK":"Add to Folder","BULK_WARN_FAIL_EXIST_PERSONAL_TO_COMMUNITY_X":"${existcount} files were already in ${collectionlink}. Some files were not added because personal files can not added in a community folder.","UNDO":{"ERROR_PUBLIC":{"CANCEL_ONE":"${filelink} was not removed from ${collectionlink} and is still public because the request was cancelled.","TIMEOUT":"Public access to ${filelink} was not removed because the server could not be contacted.","UNKNOWN_ONE":"${filelink} was not removed from ${collectionlink} and is still public due to an error.","CANCEL_MANY":"${filelink} was not removed from ${count} folders and is still public because the request was cancelled.","UNKNOWN_MANY":"${filelink} was not removed from ${count} folders and is still public due to an error.","TIMEOUT_ONE":"${filelink} was not removed from ${collectionlink} and is still public because the server could not be contacted.","UNKNOWN":"Public access to ${filelink} was not removed due to an error.","CANCEL":"Public access to ${filelink} was not removed because the request was cancelled.","TIMEOUT_MANY":"${filelink} was not removed from ${count} folders and is still public because the server could not be contacted."},"STATUS":"Removing...","INFO_SUCCESS_SHARED_1":"${filelink} was removed from ${collectionlink} and is no longer shared.","INFO_SUCCESS_1":"${filelink} was removed from ${collectionlink}.","ACTION":"Undo","INFO_SUCCESS_PUBLIC_1":"${filelink} was removed from ${collectionlink} and is no longer public.","ERROR_BASE":{"CANCEL_ONE":"${filelink} was not removed from ${collectionlink} because the request was cancelled.","TIMEOUT":"${filelink} was not removed because the server could not be contacted.","UNKNOWN_ONE":"${filelink} was not removed from ${collectionlink} due to an error.","UNKNOWN_MANY":"${filelink} was not removed from ${count} folders due to an error.","CANCEL_MANY":"${filelink} was not removed from ${count} folders because the request was cancelled.","TIMEOUT_ONE":"${filelink} was not removed from ${collectionlink} because the server could not be contacted.","UNKNOWN":"${filelink} was not removed due to an error.","CANCEL":"${filelink} was not removed because the request was cancelled.","TIMEOUT_MANY":"${filelink} was not removed from ${count} folders because the server could not be contacted."},"INFO_SUCCESS_SHARED_X":"${filelink} was removed from ${count} folders and is no longer shared.","INFO_SUCCESS_X":"${filelink} was removed from ${count} folders.","INFO_SUCCESS_PUBLIC_X":"${filelink} was removed from ${count} folders and is no longer public."},"ACTION_LONG":"Add to Folder...","ERROR":"The file was not added due to an error.","ERROR_TIMEOUT":"The file was not added because the server could not be contacted.  Click \'Add to Folder\' to try your request again.","MOST_RECENT_COLLECTION_TOOLTIP":"Add file to this folder","NO_COLLECTIONS_FOR_EDITOR_OR_OWNER":"You are not an editor or owner of any folders.","BULK_ADD_COMMUNITY_MOVE_ADD_X":"${addcount} files were added to ${collectionlink}, ${moveitem} was moved to ${collectionlink}.","OK_ADD_HERE":"Add Here","STATUS":"Adding...","NO_COLLECTIONS":"You are not a contributor or owner of any folders.","BULK_WARN_FAIL_EXIST_RESHARE_OFF_X":"${existcount} files were already added in ${collectionlink}. Some files were not added because the owner does not allow others to share them.","LABEL_PRIVATE":"You are allowed to contribute to the following private folders","BUSY":"Adding...","NO_FILTERED_COLLECTIONS_FOR_EDITOR_OR_OWNER":"You are not an editor or owner of any folder with the specified name."},"NAVIGATION_ALT":"Main navigation","DOCUMENTCONTENT":{"DOWNLOAD_WITH_FILE_SYNC_TOOLTIP":"This file is enabled for sync. Click to manually download ${0} (${1}).","LABEL_LOCKED_BY":{"MONTH":"Locked on ${date} by ${user}. ${unlock}","TODAY":"Locked at ${time} by ${user}. ${unlock}","YESTERDAY":"Locked yesterday at ${time} by ${user}. ${unlock}","DAY":"Locked on ${date} by ${user}. ${unlock}","YEAR":"Locked on ${date_long} by ${user}. ${unlock}","FULL":"Locked on ${date_long} ${time_long} by ${user}. ${unlock}"},"DOWNLOAD_HTML":"Download as HTML","DOWNLOAD_TOOLTIP_V":"${0} Download this version (${1})","DOWNLOAD":"Download (${0})","NAME":"Filename:","DOWNLOAD_RTF":"RTF","SHAREDWITH_LINK":"Sharing","BROWSE_OTHER_UNK":"Browse Files","ATTACHMENTS":"Attachments (${0})","UNSELECT_ALL":"Unselect all items","SHARE_PROPAGATE_OFF":"Only the owner can share this file.","DOWNLOAD_PDF":"PDF","VERSIONS":"Versions (${0})","SHARE_INTENT":"Shared externally","DOWNLOAD_WARN_LONG":"This file may not download properly because it has a long file name.  To ensure a successful download, use your browser\'s Save As feature to download this file.","LABEL_UPDATED_OTHER":{"MONTH":"${user} updated on ${MMM} ${d}","TODAY":"Updated today at ${time} by ${user}","YESTERDAY":"Updated yesterday at ${time} by ${user}","DAY":"${user} updated on ${EEee} at ${time}","YEAR":"Updated on ${date_long} by ${user}","FULL":"${EEEE}, ${date_long} ${time_long}"},"PREVIEW":"Preview","REQUIRED_NAME":"*Name: ","SHAREDWITH":"Sharing","DOWNLOAD_TOOLTIP":"Download ${0} (${1})","OPEN_APP_TOOLTIP":"Open this file in the Files application","LABEL_SHARED":{"MONTH":"Shared ${MMM} ${d}","TODAY":"Shared today at ${time}","YESTERDAY":"Shared yesterday at ${time}","DAY":"Shared ${EEee}","YEAR":"Shared ${date_long}","FULL":"${EEEE}, ${date_long} ${time_long}"},"LABEL_UPDATED":{"MONTH":"Updated ${MMM} ${d}","TODAY":"Updated today at ${time}","YESTERDAY":"Updated yesterday at ${time}","DAY":"Updated ${EEee} at ${time}","YEAR":"Updated ${date_long}","FULL":"${EEEE}, ${date_long} ${time_long}"},"LABEL_ADDED":{"MONTH":"Created ${MMM} ${d}","TODAY":"Created today at ${time}","YESTERDAY":"Created yesterday at ${time}","DAY":"Created ${EEee} at ${time}","YEAR":"Created ${date_long}","FULL":"${EEEE}, ${date_long} ${time_long}"},"PICKER_WITH_FILE_SYNC_TOOLTIP":"${0} This file is enabled for sync.","SELECT_ALL":"Select all items","DOWNLOAD_NEW_VERSION":"(new version available) ","LABEL_ADDED_TO":{"MONTH":"Added ${MMM} ${d}","TODAY":"Added today at ${time}","YESTERDAY":"Added yesterday at ${time}","DAY":"Added ${EEee} at ${time}","YEAR":"Added ${date_long}","FULL":"${EEEE}, ${date_long} ${time_long}"},"LABEL_SHARED_BY":{"MONTH":"Shared by ${user} on ${MMM} ${d}","TODAY":"Shared by ${user} today at ${time}","YESTERDAY":"Shared by ${user} yesterday at ${time}","DAY":"Shared by ${user} on ${EEee}","YEAR":"Shared by ${user} on ${date_long}","FULL":"${EEEE}, ${date_long} ${time_long}"},"CREATE_NEW_PAGE":"Create Rich-text File ","DOWNLOAD_PAGE_AS_RTF_TOOLTIP":"Download this file as rich text (${0})","DOWNLOAD_DISABLED_WITH_FILE_SYNC_TOOLTIP":"This file is enabled for sync.","LABEL_LOCKED":{"MONTH":"Locked on ${date}. ${unlock}","TODAY":"Locked at ${time}. ${unlock}","YESTERDAY":"Locked yesterday at ${time}. ${unlock}","DAY":"Locked on ${date}. ${unlock}","YEAR":"Locked on ${date_long}. ${unlock}","FULL":"Locked on ${date_long} ${time_long}. ${unlock}"},"SHARE_PROPAGATE_ON":"All readers can share this file.","NO_CONTENT":"No content","DESCRIPTION":"Description:","DOWNLOAD_LABEL":"Download as: ","SHARE_PROPAGATE_OWNER":"Allow other people to share this file?  When checked, everyone who can see the file will be able to share it.","DOWNLOAD_WARN":"!","SHARE_PROPAGATE_PUBLIC":"Everyone can share this file.","PREVIEW_TITLE":"Preview this file in a new window.","DOWNLOAD_PAGE_AS_PDF_TOOLTIP":"Download this file as a PDF (${0})","NODESCRIPFILE":"No description for this file","DOWNLOAD_PAGE_AS_HTML_TOOLTIP":"Download this file as html (${0})","LABEL_ADDED_OTHER":{"MONTH":"${user} created on ${MMM} ${d}","TODAY":"${user} created today at ${time}","YESTERDAY":"${user} created yesterday at ${time}","DAY":"${user} created on ${EEee} at ${time} ","YEAR":"${user} created on ${date_long}","FULL":"${EEEE}, ${date_long} ${time_long}"},"ERRORS":{"AUTH_REQUIRED_ANON":{"TITLE":"Log in to Files","MESSAGES":"To change whether you are following this file you must be logged in to Files. "},"ACCESS_DENIED_ANON":{"TITLE":"Access Denied","MESSAGES":"You do not have permission to view this file.  If this is your file or it has been shared with you, you must log in to Files first. "},"ACCESS_DENIED":{"TITLE":"Access Denied","MESSAGES":"You do not have permission to view this file.  The file is not shared with you."},"NOT_FOUND":{"TITLE":"File Not Found","MESSAGES":"The file you have requested has been deleted or moved or quarantined. If someone sent you this link, check that it is correct."},"LOGIN":"Log in now","VERSION_NOT_FOUND":"The version you requested does not exist."},"OPEN_TOOLTIP":"View this file in the browser","SHARE_INTENT_T":"Shared externally","OPEN_THIS":"Open this file","COMMENTS":"Comments (${0})","DOWNLOAD_THIS":"Download this file ","NODESCRIPPAGE":"No description for this file","LABEL_ADDED_TO_OTHER":{"MONTH":"${user} added on ${MMM} ${d}","TODAY":"Added by ${user} today at ${time}","YESTERDAY":"Added by ${user} yesterday at ${time}","DAY":"${user} added on ${EEee} at ${time} ","YEAR":"Added by ${user} on ${date_long}","FULL":"${EEEE}, ${date_long} ${time_long}"},"BROWSE_OTHER":"Browse Files from ${0}"},"ADD_TO_COMMUNITYCOLLECTION":{"SELECT_COLLECTION":"You must select a folder that this file will be added to.","DIALOG_TITLE":"Add to Folder","INFO_SUCCESS_1":"${filelink} has been successfully added to ${collectionlink}.","ACTION_LONG":"Add to Folder...","INFO_SUCCESS_2":"${filelink} has been successfully moved to ${collectionlink}.","HINT":"Add ${0} to one of the following Community folders.","ERROR":"The file was not added due to an error.","ERROR_TIMEOUT":"The file was not added because the server could not be contacted.  Click \'Add to Folder\' to try your request again.","ERROR_CANNOT_MOVE_PERSONALFILE_TO_COMMUNITYFOLDER":"You cannot move a personal file into a community folder.","ERROR_CANNOT_MOVE_COMMUNITYFILE_TO_PERSONALFOLDER":"You cannot move a community file into a personal folder.","ERROR_NOT_FOUND_1":"The file was not added because the selected folder has been deleted.","ERROR_CANCEL":"The file was not added because the request was cancelled.  Click \'Add to Folder\' to try your request again.","OK_ADD_HERE":"Add Here","ERROR_ACCESS_DENIED_1":"You do not have permission to add the file to the selected folder.","OK_TITLE":"Add this file to the selected folder","ACTION":"Add to Folder","BUSY":"Adding...","CANCEL":"Cancel","ACTION_TOOLTIP":"Add this file to a folder","OK":"Add to Folder","ERROR_NOT_LOGGED_IN":"The file was not added because you were not logged in.  Click \'Add to Folder\' to add the file.","INFO_EXISTS_1":"${filelink} was already in ${collectionlink}."},"FILE_FOLDERS":{"EMPTY_COLLECTIONS":"None","ERROR":"Unable to load folder information","EXTERNAL":"This file is in the external folder:","HDNCLCT":"This file is in ${0} folder or community you do not have access to.","SHARE_INTENT_T":"Share Externally","HDNCLCT_MANY":"This file is in ${0} folders or communities you do not have access to.","EXTERNAL_MANY":"This file is in these external folders:","LABEL":"Shared with Folders: ","NO_COLLECTIONS":"This file has not been added to any folders yet.","SHOW_MORE":"Show more folders...","TITLE":"Folders","PRIVATE_LABEL":"Private:","SHARED_LABEL":"Shared:","SHARE_AS_EDITOR":"${0} (with edit)","NOT_ALLOW_SHARE_WARNING":"This file cannot be shared to individuals or other communities.","NO_COLLECTION":"This file has not been added to any folder yet.","LOADING":"Loading...","COMMUNITY_LABEL":"Community: ","PUBLIC_LABEL":"Public: "},"SUCCESS":"Success","SUCCESS_COLON":"Success:","VIEW_ALL":"View All","ERROR":"Error","EDIT_GROUP":{"ACTION":"Edit","ACTION_TOOLTIP":"Edit this document"},"A11Y_READER_ADDED":"Selected ${0} as a reader","BACK_TO_FILES":"Back to Files","EDIT_COLLECTION":{"ACTION_LONG":"Edit Properties...","ACTION":"Edit Properties","ACTION_TOOLTIP":"Edit this folder"},"COMMENTS":{"ADD_COMMENT":"Add a comment...","ERROR_EDIT":"Your comment could not be updated.  Please try again later.","ERROR_EDIT_TIMEOUT":"Your comment could not be updated because the server could not be contacted.  Click \'Save\' to try again.","ERROR_CREATE_CANCEL":"Your comment could not be saved because the request was cancelled.  Click \'Save\' to try again.","NEXT_T":"Next page","EXTERNAL_WARNING":"Comments might be seen by people external to your organization.","EDIT":"Edit","PREVIOUS_T":"Previous page","PAGE":"Page","ERROR_NO_CONTENT":"Enter your comment and click \'Save\'.  If you no longer want to leave a comment click \'Cancel\'.","PAGING_BOTTOM_LABEL":"Paging options","DELETECONFIRM":"Are you sure you want to delete this comment?","WARN_LONG_COMMENT":"The comment is too long.","ERROR_NO_CONTENT_EDIT":"Enter your comment and click \'Save\'.  If you no longer want to edit your comment click \'Cancel\'.","ERROR_EDIT_ACCESS_DENIED":"Your comment could not be updated because the file has been deleted or is no longer shared with you.","ERROR_MENTIONS_NO_PERMISSION_COMMUNITY":"The following people that you mentioned cannot view the comment because they are not members of the community.","ERROR_EDIT_NOT_FOUND":"Your comment could not be updated because the file has been deleted or is no longer shared with you.","SORT_BY":"Sort by:","ERROR_REQUEST_TIMEOUT":"The server could not be contacted.","LOADING":"Loading comments...","NOHYPHENCOUNT":"${0} of ${1}","COMMENT_EDITED":{"MONTH":"Edited on ${MMM} ${d}","TODAY":"Edited today at ${time}","YESTERDAY":"Edited yesterday at ${time}","DAY":"Edited on ${EEEE}","YEAR":"Edited on ${date_long}"},"DELETE":"Delete","EMPTY":"There are no comments.","COMMENT_COUNT_MANY":"${0} comments","DELETEREASON":"Reason for deleting this comment:","SUBSCRIBE_TO":"Feed for these Comments","ERROR_CREATE":"Your comment could not be saved.  Please try again later.","DELETECOMMENT":"Delete Comment","ERROR_CREATE_TIMEOUT":"Your comment could not be saved because the server could not be contacted.  Click \'Save\' to try again.","ERROR_MENTIONS_VALIDATE":"Your mentioned user in comment could not be validated. Please try again later.","ERROR_MENTIONS_VALIDATE_TIMEOUT":"Your mentioned user in comment could not be validated because the server could not be contacted. Please try again later.","ERROR_EDIT_NOT_LOGGED_IN":"Your comment could not be updated because you were not logged in.  Click \'Save\' to update your comment.","ERROR_DELETE_NOT_FOUND":"Your comment could not be deleted because the file has been deleted or is no longer shared with you.","ERROR_DELETE_ACCESS_DENIED":"Your comment could not be deleted because the file has been deleted or is no longer shared with you.","COUNT_ALT":"Showing comments ${0} through ${1} of ${2}","ADD_COMMENT_SUCCESS_PRE_MODERATION":"The comment has been submitted for review and will be available when approved. ","DELETE_T":"Permanently delete this comment","FLAG_T":"Flag this comment as inappropriate","ERROR_MENTIONS_VALIDATE_CANCEL":"Your mentioned user in comment could not be validated because the request was cancelled. Please try again later.","SHOW_ALT":"Show ${0} items per page","COMMENT_CREATED":{"MONTH":"${user} commented on ${timestamp} (version ${version})","TODAY":"${user} commented ${timestamp} (version ${version})","YESTERDAY":"${user} commented ${timestamp} (version ${version})","DAY":"${user} commented on ${timestamp} (version ${version})","YEAR":"${user} commented on ${timestamp} (version ${version})"},"JUMP_TO_LAST":"Most recent","ERROR_CREATE_ACCESS_DENIED":"Your comment could not be saved because the file has been deleted or is no longer shared with you.","ERROR_REQUEST_CANCELLED":"The request was cancelled.","ERROR_CREATE_NOT_FOUND":"Your comment could not be saved because the file has been deleted or is no longer shared with you.","ERROR_MENTIONS_VALIDATE_ACCESS_DENIED":"Your mentioned user in comment could not be validated because the file has been deleted or is no longer visible to you.","ERROR_MENTIONS_VALIDATE_NOT_FOUND":"Your mentioned user in comment could not be validated because the file has been deleted or is no longer visible to you.","VIEW_COMMENTS_FILE":"View comments on this file","ERROR_MENTIONS_NO_PERMISSION":"The following people that you mentioned cannot view the comment because they do not have access to the content.","ITEMS_PER_PAGE":" items per page","ELLIPSIS":"...","COMMENT_LABEL":"Enter your comment:","SUBSCRIBE_TO_TOOLTIP":"Follow changes to these comments through your feed reader","COMMENT_QUARANTINED":{"MONTH":"This comment was removed by ${user} on ${date}","TODAY":"This comment was removed by ${user} today at ${time}","YESTERDAY":"This comment was removed by ${user} yesterday at ${time}","DAY":"This comment was removed by ${user} on ${date}","YEAR":"This comment was removed by ${user} on ${date_long}"},"PAGING_TOP_LABEL":"Paging","ERROR_DELETE_NOT_LOGGED_IN":"Your comment was not deleted because you were not logged in.  Click \'Delete\' to delete your comment.","PAGE_ALT":"Page ${0} of ${1}","TRIM_LONG_COMMENT_CONFIRM":"Shortening will remove the text beyond the comment limit.  Click \'OK\' to shorten or \'Cancel\' to edit the comment yourself.","NOTIFY_LABEL":"Follow this file to get notified when comments or updates are posted","EDIT_T":"Edit this comment","VIEW_COMMENTS_PAGE":"View comments on this file","ERROR_DELETE":"Your comment could not be deleted.  Please try again later.","ERROR_DELETE_TIMEOUT":"Your comment could not be deleted because the server could not be contacted.  Click \'Delete\' to try again.","COMMENT_CREATED_TIME":{"MONTH":"${MMM} ${d}","TODAY":"today at ${time}","YESTERDAY":"yesterday at ${time}","DAY":"${EEEE} at ${time}","YEAR":"${date_long}"},"ERROR":"An unknown error has occurred.","SUBSCRIBE_TO_TITLE":"Comments for ${0}","ERROR_CREATE_NOT_LOGGED_IN":"Your comment was not saved because you were not logged in.  Click \'Save\' to add your comment.","FLAG":"Flag as Inappropriate","MENTIONS_TOOLTIP":"Note: Only people that have access to the content will see the comment.","COUNT":"${0}-${1} of ${2}","NEXT":"Next","COMMENT_COUNT_ONE":"${0} comment","PREVIOUS":"Previous","ERROR_DELETE_CANCEL":"Your comment could not be deleted because the request was cancelled.  Click \'Delete\' to try again.","COMMENT_PENDING":"This comment is pending review.","ERROR_EDIT_CANCEL":"Your comment could not be updated because the request was cancelled.  Click \'Save\' to try again.","TRIM_LONG_COMMENT":"Shorten comment?","COMMENT_DELETED":{"MONTH":"Comment deleted by ${user} on ${MMM} ${d}","TODAY":"Comment deleted by ${user} today at ${time}","YESTERDAY":"Comment deleted by ${user} yesterday at ${time}","DAY":"Comment deleted by ${user} on ${EEEE} at ${time}","YEAR":"Comment deleted by ${user} on ${date_long}"},"LINK":"Link","CANCEL":"Cancel","SAVE":"Save","COMMENT_REJECTED":{"MONTH":"This comment was rejected by ${user} on ${date}","TODAY":"This comment was rejected by ${user} today at ${time}","YESTERDAY":"This comment was rejected by ${user} yesterday at ${time}","DAY":"This comment was rejected by ${user} on ${date}","YEAR":"This comment was rejected by ${user} on ${date_long}"}},"MOVE_TO_COLLECTION":{"DIALOG_TITLE":"Move to Folder","SELECT_COLLECTION":"You must select a folder that this file will be moved to.","INFO_SUCCESS_1":"${filelink} has been successfully moved to ${collectionlink}.","HINT":"Move ${0} from ${1} to a different Community folder.","ERROR":"The file was not moved due to an error.","ERROR_TIMEOUT":"The file was not moved because the server could not be contacted.  Click \'Move to Folder\' to try your request again.","ERROR_CANCEL":"The file was not moved because the request was cancelled.  Click \'Move to Folder\' to try your request again.","ERROR_NOT_FOUND_1":"The file was not moved because the selected folder has been deleted.","ERROR_ACCESS_DENIED_1":"You do not have permission to move the file to the selected folder.","OK_TITLE":"Move this file to the selected folder","ACTION":"Move to Folder","BUSY":"Moving...","CANCEL":"Cancel","ACTION_TOOLTIP":"Move this file to a folder","OK_MOVE_HERE":"Move Here","OK":"Move to Folder","ERROR_NOT_LOGGED_IN":"The file was not moved because you were not logged in.  Click \'Move to Folder\' to move the file.","INFO_EXISTS_1":"${filelink} was already in ${collectionlink}."},"BACK_TO_COMMUNITY_FILES":"Back to community files","SHARE_TO_COMMUNITY_FILE":{"DIALOG_TITLE":"Share File with this Community","ACTION":"Share File with Community...","ACTION_TOOLTIP":"See files Community have shared with you ","OK":"Share Files"},"SAVING":"Saving...","UPLOAD_FILE":{"ACTION_IN_MENU":"Upload...","ACTION":"Upload Files","ACTION_TOOLTIP":"Upload files from your computer","ACTION_KEY_SHORTCUT":"u"},"SHARE_FILE":{"DIALOG_TITLE":"Share File","EDITOR_LABEL":"Editors: ","INFO_SUCCESS_1":"${item} was shared successfully.","MESSAGE_TEXT":"Add an optional message","SHARE_PRI":"This file is private.","EXTERNAL_WARNING":"You can share this file with people external to your organization.","EDITOR_ROLE":"as Editor","SHARE_COMMUNITY_VISIBLE_WARN":"Sharing with this community \'${0}\' will make this file visible to your entire organization.","ACCESS_DENIED_ERROR_LOCKED":"The file was not shared because the file is locked by another user, try again later.","VISIBILITY_PUBLIC_LABEL":"Everyone in my organization","EXTERNAL_SHARES_ERROR_MANY":"${item} can only be shared inside your organization.","SHARE_SHR_0":"This file is shared.","SHARE_TYPE_LABEL":"Type","SHARE_SHR_1":"This file is shared with 1 person.","ERROR_1_NOT_LOGGED_IN":"${item} could not be shared because you were not logged in. Log in and share again.","READER_LABEL_TITLE":"Readers","SHARE_COL_1":"It is also in a folder or community.","ERROR_1_MAX_SHARES":"${item} was not shared because the maximum number of shares has been exceeded.","SELECT_USER_ERROR":"Please select a person or community to share with.","ACTION_ENABLED":"Share button is enabled","VISIBILITY_PEOPLE_COMMUNITIES_LABEL":"People or Communities","DIALOG_TITLE_X":"Share Files","ERROR_1":"${item} could not be shared due to an error.","ERROR_1_TIMEOUT":"${item} was not shared because the server could not be contacted.","SELECT_USER_ERROR_E":"Please select a person to share with.","TRIM_LONG_MESSAGE":"Shorten message?","SELECTED_FILES_1":"1 file selected to share.","ADD_TOOLTIP":"Share with this user","SHARE_WITH_HEADER":"Share with:","SHARE_COL_E":"It is also in a folder.","SHARE_COL_F":"It is also in ${collections} folders.","OWNER_REFERENCE_ERROR":"You cannot share with the owner of the file.","VISIBILITY_NO_ONE_LABEL":"No one","SHARE_SHR_M":"This file is shared with ${people} people.","INFO_SUCCESS_X":"${count} files were shared successfully.","SHARE_COL_M":"It is also in ${collections} folders or communities.","VISIBILITY_PEOPLE_LABEL":"People","VISIBILITY_NO_ONE_DESCRIPTION":"(shared with me only)","ACTION_TOOLTIP_X":"Give others access to the selected files","ACTION":"Share","ERROR_X_CANCEL":"Some files may not have been shared because the request was cancelled.","EDITOR_LABEL_TITLE":"Editors","SHARE_COMMUNITY_WARN":"Sharing with the community \'${0}\' will make this file visible to everyone in your organization.","WARN_LONG_MESSAGE":"The message is too long.","NOT_FOUND_ERROR":"This file has been deleted or is no longer shared with you.","ERROR_1_CANCEL":"${item} may not have been shared because the request was cancelled.","ACCESS_DENIED_ERROR":"You no longer have permission to share this file.","ERROR_X":"${count} files could not be shared due to errors.","INVITATION_ERROR":"Content was not shared with the following people because you do not have permission to share with them: ${0}.","ERROR_1_VISIBILITY_RESTRICTION":"${item} was not shared because the file is restricted and may not be made visible to everyone in your organization.","SHARE_WITH":"Share with:","SHARE_ROLE_LABEL":"Role","SEARCH_TOOLTIP":"Person not listed? Use full search...","SELECTED_FILES_X":"${0} files selected to share.","SHARE_PUB_0":"This file is visible to ${company}. ","VISIBILITY_COMMUNITIES_LABEL":"Communities","SHARE_PUB_1":"This file is visible to ${company} and shared with 1 person.","EXTERNAL_SHARES_ERROR":"The file can only be shared inside your organization.","ADD_FROM_RECENT":"Recent shares","INFO_SUCCESS":"The file was shared successfully.","VISIBILITY_PUBLIC_DESCRIPTION":"","READER_LABEL":"Readers: ","ACTION_TOOLTIP":"Give others access to this file","OK":"Share","NOT_LOGGED_IN_ERROR":"The file was not shared because you were not logged in.  Click \'Share\' to share the file.","SELF_REFERENCE_ERROR":"You cannot share with yourself.","CANCEL_ERROR":"The file was not shared because the request was cancelled.  Click \'Share\' to try again.","ACTION_DISABLED":"Share button is disabled","ACTION_LONG":"Share...","ERROR":"The file could not be shared.  Please try again later.","TIMEOUT_ERROR":"The file was not shared because the server could not be contacted.  Click \'Share\' to try again.","SHARE_PUB_M":"This file is visible to ${company} and shared with ${people} people.","ERROR_1_ACCESS_DENIED":"${item} was not shared because you do not have permission to share this file.","ERROR_1_NOT_FOUND":"${item} has been deleted or is no longer shared with you.","READER_ROLE":"as Reader","MAX_SHARES_ERROR":"The maximum number of shares has been exceeded.","VISIBILITY_PEOPLE_DESCRIPTION":"(give specific file permissions to others)","BUSY":"Sharing...","CANCEL":"Cancel","NO_MEMBERS":"None","MESSAGE_LABEL":"Message:","SHARE_WITH_TITLE":"Share with"},"VISIBILITY_RESTRICTION":{"ERROR_EDIT":"A file that is visible to everyone in your organization may not be made restricted.","LABEL":"Restricted","ERROR_ADD_FILES_1":"A file that is restricted may not be made visible to everyone in your organization.","ERROR_SHARE":"A file that is restricted may not be made visible to everyone in your organization.","ERROR_UPLOAD":"A file that is restricted may not be made visible to everyone in your organization.","ERROR_ADD_FILES_X":"A file that is restricted may not be made visible to everyone in your organization.","ERROR_ADD_TO_FOLDER":"A file that is restricted may not be made visible to everyone in your organization."}};
dojo.provide("lconn.files.nls.community")._built=true;
dojo.provide("lconn.files.nls.community.en_us");
lconn.files.nls.community.en_us={"SIZE":{"B":"${0} B","MB":"${0} MB","KB":"${0} KB","GB":"${0} GB"},"APP":{"ERRORS":{"DEFAULT":{"MESSAGE":"Click the browser back button to return to the previous page and try again.  If this error persists, report the problem to your administrator.","TITLE":"We are unable to process your request"},"UNABLE_TO_LOGIN":{"ACT_OUT":"Log Out","TITLE":"Unable to log in","MESSAGES":"An error occurred when logging in to Files.  Please try again or contact your administrator.","ACCESS_DENIED_MESSAGE":"You do not have permission to access this page.  If someone sent you this link, check to see if you have the correct permission.","ACCESS_DENIED_TITLE":"Access Denied"},"INVALID_USER":{"ACT_OUT":"Log Out","TITLE":"Access to IBM Connections is restricted","MESSAGES":"You do not have permission to use IBM Connections.  If this is unexpected or incorrect, report the problem to your administrator.   "},"LOGIN":{"ACT":"Log In","TITLE":"Log In Now","MESSAGES":"Certain portions of Files can only be accessed when you are logged in.  You may browse anonymously, but this page will not be visible until you authenticate."},"DUPLICATE_USER":{"ACT_OUT":"Log Out","TITLE":"Your account has changed","MESSAGES":"You cannot access IBM Connections because your login information has changed. Contact your administrator about resolving this issue.   "}}},"MOVE_TO_TRASH":{"ERROR_X":"${count} files were not moved to the trash due to errors.","DIALOG_TITLE":"Move to Trash","INFO_SUCCESS_1":"${item} was moved to the trash.","QUESTION_RELATED_X":"Are you sure you want to move these files to the trash?\n\n${0}\n\nMoving these files to the trash makes them unavailable to anyone with whom they are presently shared.","ERROR_1_NOT_LOGGED_IN":"${item} was not moved to the trash because you were not logged in. Please log in and try again.","QUESTION_RELATED_X_E":"Are you sure you want to move these files to the trash?\n\n${0}\n\nMoving these files to the trash makes them unavailable to anyone with whom they are presently shared.","INFO_SUCCESS":"${item} was moved to the trash.","ACTION_ENABLED":"Move to Trash button is enabled","ERROR_1":"${item} was not moved to the trash due to an error.","ACTION_TOOLTIP":"Put this file in the trash","ERROR_1_TIMEOUT":"${item} was not moved to the trash because the server could not be contacted.","OK":"OK","ERROR_NOT_LOGGED_IN":"The file was not moved to the trash because you were not logged in.  Click \'OK\' to try again.","ACTION_DISABLED":"Move to Trash button is disabled","QUESTION":"Are you sure you want to move this file to the trash?\n\n${0}","ERROR":"The file was not moved to the trash due to an error.","ERROR_TIMEOUT":"The file was not moved to the trash because the server could not be contacted.  Click \'OK\' to try again.","INFO_SUCCESS_X":"${count} files were moved to the trash.","ERROR_1_ACCESS_DENIED":"${item} was not moved to the trash because you do not have permission to delete this file.","ERROR_1_NOT_FOUND":"${item} has already been moved to the trash or is no longer shared with you.","ERROR_CANCEL":"The file was not moved to the trash because the request was cancelled.  Click \'OK\' to try again.","QUESTION_RELATED":"Are you sure you want to move this file to the trash?\n\n${0}\n\nMoving this file to the trash makes it unavailable to anyone with whom it is presently shared.","ACTION_TOOLTIP_X":"Put the selected files in the trash","ACTION":"Move to Trash","ERROR_X_CANCEL":"Some files may not have been moved to the trash because the request was cancelled.","QUESTION_RELATED_E":"Are you sure you want to move this file to the trash?\n\n${0}\n\nMoving this file to the trash makes it unavailable to anyone with whom it is presently shared.","BUSY":"Moving...","TRASH_LINK_TITLE":"View trash","CANCEL":"Cancel","PERSONALFILES_INFO_SUCCESS":"${item} was moved to personal trash, ${link}.","ERROR_NOT_FOUND":"This file has already been moved to the trash or is no longer shared with you.","QUESTION_X":"Are you sure you want to move these files to the trash?\n\n${0}","ERROR_1_CANCEL":"${item} may not have been moved to the trash because the request was cancelled."},"DOWNLOAD_INFO":{"SHOW_PEOPLE":"See who has downloaded...","VERSION":{"MONTH":"Version ${0} on ${date}","TODAY":"Version ${0} at ${time}","YESTERDAY":"Version ${0} yesterday","DAY":"Version ${0} on ${date}","YEAR":"Version ${0} on ${date}"},"FILE":{"V_LATEST":"You have the latest version of this file","V_LATEST_NO_DOWNLOAD":"You have accessed the latest version of this file.","ERROR":"Unable to load download information","V_OLDER":"You last downloaded version ${0} of this file","LOADING":"Loading...","EMPTY":"Anonymous users only"},"PAGE":{"ERROR":"Unable to load file view information","LOADING":"Loading...","EMPTY":"Anonymous users only"}},"COPY_FILE":{"ALT_EDIT":"Remove","NAME_HEADER":"File name:","DIALOG_TITLE":"Give Copy to Community","WARN_INVALID_CHARS_IN_NAME":"File names may not contain the following characters: \\ / : * ? \" \x3c \x3e |","WARN_LONG_TAGS":"The specified tags are too long.","COMMUNITY_HEADER":"Community:","WARN_FILE_EXISTS":"A file with that name already exists.","ERROR_QUOTA_VIOLATION":"The file could not be copied because of space restrictions.  To copy this file, ${0} of files or versions would have to be removed.","WARN_NO_FILENAME":"File name is a required field.","TRIM_LONG_FILENAME":"Shorten file name?","WARN_LONG_TAG":"The tag \'${0}\' is too long.","INFO_SUCCESS":"Successfully copied ${link} to community ${community_link}.","TRIM_TAGS":"Shorten tags?","NAME_LABEL_TITLE":"File name","ACTION_TOOLTIP":"Give a copy of this file to a community","OK":"Copy","TRIM_TAG":"Shorten tag?","COMMUNITY_LABEL":"Community:","ERROR_NOT_LOGGED_IN":"The file could not be copied because you were not logged in.  Click \'Copy\' to add this file.","NAME_LABEL":"File name:","WARN_QUOTA_VIOLATION":"The file is larger than the available space. The copy will fail unless ${0} of files or versions are removed.","ACTION_LONG":"Give Copy to Community...","FILE_ALREADY_EXISTS":"A file with the same name already exists. Please choose a different file name.","ERROR":"The file could not be copied.  Please try again later.","FILE_DOES_NOT_EXIST":"This file does not exist. ","ERROR_TIMEOUT":"The file could not be copied because the server could not be contacted.  Click \'Copy\' to try again.","REQUIRED_MARK":"* Required","WARN_NO_COMMUNITY_SELETED":"Type a community name, and then click the community to copy the file to. ","TAGS_LABEL":"Tags:","ERROR_DETAILS_LINK":"Details...","INFO_SUCCESS_PRE_MODERATION":"The file ${name} has been copied to community ${community_link} for review and will be available when approved.","ERROR_DETAILS_TOOLTIP":"Show more details about this error","FIX_INVALID_CHARS_IN_NAME":"Replace invalid characters with \'_\'?","WARN_LONG_FILENAME":"The name is too long.","ERROR_CANCEL":"The file could not be copied because the request was cancelled.  Click \'Copy\' to try again.","TAGS_HEADER":"Tags:","ERROR_FILENAME_INVALID_CHARACTERS":"The file name may not contain the characters: % & \\ \"","ACTION":"Give Copy to Community","ERROR_MAX_CONTENT_SIZE":"The file could not be copied because it is larger than the maximum allowed file size of ${0}","CANCEL":"Cancel","REQUIRED_FIELD":"Required field","ERROR_ACCESS_DENIED":"You do not have permission to edit this file."},"ZIP_DOWNLOAD":{"DIALOG_TITLE":"Download as Compressed File","GLOBAL":"Global (default)","ACTION_DISABLED":"Download button is disabled","QUESTION":"Please select the language your file names will display in when they are downloaded as a compressed file:","ACTION_TOOLTIP_1":"Download the selected file","REMEMBER":"Use this setting for all future compressed downloads","NOTE":"Change this setting only if you are experiencing problems viewing the file names. The language you select will be applied to all file names in the compressed file.","ACTION_TOOLTIP_X":"Download the selected files as a compressed file","ACTION":"Download","FILES":{"T":"Download all of the files in the current view as a compressed file","L":"Download All Files"},"ACTION_ENABLED":"Download button is enabled","BUSY":"Downloading...","CANCEL":"Cancel","OK":"Download","SHARED_FILES":{"T":"Download shared files as a compressed file","L":"Download shared files"},"COLLECTION":{"T":"Download all files in this folder as a compressed file","L":"Download This Folder"}},"A11Y_MANAGER_ADDED":"Selected ${0} as an owner","EXTERNAL_WARNING":"External","FILEPICKER":{"PUBLIC_FILES":{"TEXT":"${company} Files"},"BREADCRUMB":{"ROOT":{"FOLDERS_SHARED_WITH_ME":"Folders Shared With Me","MY_FOLDERS":"My Folders"},"PREFIX":{"ADD_TO":"Add to:","MOVE_TO":"Move to:"}},"COMPACT":{"UPLOAD":"Upload","RADIO_LABEL_1":"Select where you want to pick the file from.","INSERT_LINKS":{"SAVE":"Insert Links"},"SHARE_AS_EDITOR_COMMUNITY":"Allow community members to edit the selected files","MY_FILES":{"ALT_X":"Select files from your My Files view.","NAME":"My Files","ALT_1":"Select file from your My Files view.","HEADER":{"DESCRIPTION":"Insert links to files and share with members."}},"NESTED_FOLDER":{"MY_FILES":{"ALT_X":"Select files from your My Files view.","NAME":"Files","ALT_1":"Select file from your My Files view.","HEADER":{"DESCRIPTION":"Insert links to files and share with members."}}},"THIS_COMMUNITY":{"ALT_X":"Select files from this community.","NAME":"This Community","ALT_1":"Select file from this community.","HEADER":{"DESCRIPTION":"Insert link to files."}},"RADIO_LABEL_X":"Select where you want to pick the files from.","ADD_TO_COMMUNITY_FOLDER":{"HEADER":{"DESCRIPTION":"Select the files you want to add to the ${0}. Files that are currently in another community folder will be moved to the ${1}."}},"WARNING":{"PUBLIC":"Files shared with this community will become public."},"HEADER":{"DESCRIPTION_LABEL":"Choose files from: "},"MY_COMPUTER":{"ALT_X":"Select files from your computer.","NAME":"My Computer","ALT_1":"Select file from your computer.","HEADER":{"DESCRIPTION":{"FILES":"Upload selected files to My Files and insert links to them.","COMMUNITY":"Upload selected files to this community and insert links to them."}}}},"MY_FILES":{"EMPTY_PUBLIC":"You have not uploaded any files that are shared with everyone in your organization.","EMPTY_EXTERNAL":"You have not uploaded any files that can be shared outside of your organization.","TEXT":"My Files","EMPTY":"You have not uploaded any files."},"SEARCH_SCOPED":"Filter this list...","NEXT_T":"Next page","SELECTED_0":"No files selected","PREVIOUS_T":"Previous page","SELECTED_1":"1 file selected","PINNED_COLLECTIONS":{"ERROR":"An error has occurred","TEXT":"Pinned Folders","EMPTY":"None available"},"PAGE":"Page","PAGING_BOTTOM_LABEL":"Paging options","EXTERNAL_ALT":"Shared externally","ERROR_NEVER_LOGGED_IN":"This person has never logged in to Files.","LIBRARY":{"EXPIRED":"This library is not available because you do not have access or you must log in to view content."},"SHARED_COLLECTIONS":{"ERROR":"An error has occurred","EMPTY":"None available","TEXT":"Folders Shared With Me"},"WARN_PUBLIC_X":"Files shared with this community will become public.","LOADING":"Loading...","COLLECTION":{"EMPTY_PUBLIC":"No files were found.","EMPTY":"No files were found."},"UNSELECTABLE_SHAREABLE_ONLY":"You are not able to share this file.","COUNT2":"Showing ${0}-${1}","NO_FOLDERS":"No folders here!","SEARCH":"Filter","POSITION":"You are in: ","EMPTY":"None available","SEARCH_ALL_LINK":"Filter all files.","UNSELECTABLE":"This file cannot be selected.","PINNED_FILES":{"EMPTY_PUBLIC":"You have not pinned any files that is shared with everyone in your organization.","EMPTY":"You have not pinned any files.","TEXT":"Pinned Files"},"ERROR_CANCEL":"The request was cancelled.","UNSELECTABLE_PUBLIC_ONLY":"This file is not shared with everyone in your organization.","SELECTED_X":"${0} files selected","COUNT_ALT":"Showing files ${0} through ${1} of ${2}","UNSHAREABLE_FILE":"Only the file owner can add this file to a folder.","ERROR_UNAUTHENTICATED":"You must log in again.","OTHER_FILES":{"NO_RESULTS":"No results found for \'${0}\'","EMPTY_PUBLIC":"This person has not uploaded any files.","DESCRIPTION":"To view another person\'s files, type a name in the search field above.","EMPTY":"This person has not shared any files with you.","TEXT":"Other People\'s Files","SEARCH_HINT":"Name or email..."},"EXTERNAL":"Shared externally","ELLIPSIS":"...","SEARCH_EMPTY":"No results were found.","PAGING_TOP_LABEL":"Paging","PAGE_ALT":"Page ${0} of ${1}","COMMUNITY_FILES":{"TOOLTIP":"Files in this community","EMPTY2":"There are no files for this view.","LIBRARY":{"EMPTY":"There are no files for this library."},"EMPTY":"There are no files for this community.","TEXT":"Community Files"},"MY_COLLECTIONS":{"ERROR":"An error has occurred","EMPTY":"None available","TEXT":"My Folders"},"DIALOG_TITLE_DEFAULT":"Select Files","UNSELECTABLE_NOT_EXTERNAL":"This file cannot be shared with people outside of your organization.","ERROR":"An error has occurred.","SEARCH_ALL":"Filter all files...","ERROR_TIMEOUT":"The server could not be contacted.","COUNT":"${0}-${1} of ${2}","SEARCH_CANCEL":"Clear filter","NEXT":"Next","RECENT_FILES":{"RECENTLY_UPLOADED":"Your Recent Uploads","RECENTLY_SHARED":"Recently Shared With Me","TEXT":"Recent Files","VIEW_MORE":"View More"},"WARN_PUBLIC_1":"File shared with this community will become public.","PREVIOUS":"Previous","SHARED_FILES":{"EMPTY_PUBLIC":"No file that is shared with everyone in your organization have been shared with you.","EMPTY":"No files have been shared with you.","TEXT":"Shared With Me"}},"APP_NAME_TITLE_BAR_LABEL":"Navigate to home page of Files app","LEGEND":"* Required","ABOUT_FILE":{"ADDED":"Created: ","TIMES_DOWNLOADED":"Downloads: ","SIZE":"Size: ","TIMES_RECOMMENDED":"Likes: ","TOTAL_SIZE_HINT":"${0} (${1} including all versions)","DOWNLOADS":"${0} (${1} anonymously)","NO_DOWNLOADS":"None","DOWNLOADED_BY":"Downloaded by: ","PREVIEW_LINK":"Link to preview image:","DOWNLOADED_LINK":"Link to this file:","SECURITY_LABEL":"Security:","ENCRYPT_FILE":"File content is encrypted. Encrypted file content is not searchable. File content cannot be viewed and cannot be edited with IBM Docs.","TIMESTAMP":{"MONTH":"${EEEE}, ${date} by ${user}","TODAY":"${EEEE}, Today at ${time} by ${user}","YESTERDAY":"${EEEE}, Yesterday at ${time} by ${user}","DAY":"${EEEE}, ${date} by ${user}","YEAR":"${EEEE}, ${date_long} by ${user}","FULL":"${EEEE}, ${date_long} ${time_long} by ${user}"},"TITLE":"About this File","CONTENTS":"File contents updated:","LINK":"More information","UPDATED":"Any update: ","DESCRIPTION":"Description:","NO_DESCRIPTION":"There is no description for this file."},"LOCK_FILE":{"ERROR_CANCEL":"The file could not be locked because the request was cancelled. Please try again.","STATUS":"Locking...","INFO_SUCCESS":"The file is now locked.","ACTION":"Lock File","ERROR":"The file could not be locked. Please try again later.","ERROR_ALREADY_LOCKED":"This file was already locked.","ACTION_TOOLTIP":"Lock this file","ERROR_TIMEOUT":"The file could not be locked because the server could not be contacted. Please try again.","ERROR_ALREADY_LOCKED_BY_USER":"This file was already locked by ${user} on ${date_long} ${time_long}.","ERROR_ACCESS_DENIED":"You do not have access to lock this file.","ERROR_NOT_LOGGED_IN":"The file could not be locked because you were not logged in. Please log in and try again.","ERROR_NOT_FOUND":"The file could not be locked because it has been deleted or is no longer shared with you."},"ADD_ITEM":{"ACTION":"Add","ACTION_TOOLTIP":"Create a new file or folder or share one with this community","COLLECTION_ACTION_TOOLTIP":"Create a file or folder in this folder","DISABLED_ACTION_TOOLTIP":"You don\'t have permission to create content in this folder"},"MAKE_PRIVATE":{"ACTION":"Remove public access","ACTION_TOOLTIP":"Remove your organization\'s access"},"A11Y_EDITOR_ADDED":"Selected ${0} as an editor","SESSION_TIMEOUT_CUSTOM":"Your SmartCloud session has timed out. Click OK to log back in or Cancel to close this dialog. \n\nNote: If you click OK, unsaved changes you have made will be lost.","LOADING":"Loading...","SHARE_COLLECTION":{"SHARE_PUB_0_1":"This folder is visible to everyone in ${company} and shared with 1 group.","SHARE_PUB_1_0":"This folder is visible to everyone in ${company} and shared with 1 person.","SHARE_SHR_0_1":"This folder is shared with 1 group.","SHARE_SHR_1_0":"This folder is shared with 1 person.","SHARE_PUB_1_1":"This folder is visible to everyone in ${company} and shared with 1 person and 1 group.","SHARE_ALL":"Everyone can contribute to this folder.","DIALOG_TITLE":"Share Folder","SHARE_SHR_1_1":"This folder is shared with 1 person and 1 group.","INVITATION_ERROR":"Content was not shared with the following people because you do not have permission to share with them: ${0}.","SHARE_COMMUNITY_WARN_HAS_FILE":"Sharing with the community \'${0}\' will make this folder visible to everyone in your organization. \n\nAll files which are not visible to everyone in your organization will be removed from this folder.","SHARE_PRI":"This folder is private.","EXTERNAL_WARNING":"You can share this folder with people external to your organization.","EXTERNAL_SHARES_ERROR":"The folder was not shared because it can be only shared inside of your company.","INFO_SUCCESS":"The folder was shared successfully.","ACTION_TOOLTIP":"Give others access to this folder","SHARE_PUB_0_M":"This folder is visible to everyone in ${company} and shared with ${groups} groups.","SHARE_SHR_0_M":"This folder is shared with ${groups} groups.","OK":"Share","SHARE_SHR_M_0":"This folder is shared with ${people} people.","SHARE_PUB_M_0":"This folder is visible to everyone in ${company} and shared with ${people} people.","SHARE_PUB_1_M":"This folder is visible to everyone in ${company} and shared with 1 person and ${groups} groups.","SHARE_SHR_M_1":"This folder is shared with ${people} people and 1 group. ","ERROR_LOAD":"Information about this folder could not be retrieved. Please try again later.","SHARE_PUB_M_1":"This folder is visible to everyone in ${company} and shared with ${people} people and 1 group.","SHARE_SHR_1_M":"This folder is shared with 1 person and ${groups} groups.","ERROR_NOT_LOGGED_IN":"The folder was not shared because you were not logged in.  Click \'Share\' to share this folder.","ACTION_LONG":"Share...","ERROR":"The folder was not shared due to an error.","ERROR_TIMEOUT":"The folder was not shared because the server could not be contacted.  Click \'Share\' to try your request again.","GROUP_NAME":"${0} (group)","GROUP_MARK":"(group)","DESCRIPTION_LABEL":"Description: ","ERROR_CANCEL":"The folder was not shared because the request was cancelled.  Click \'Share\' to try your request again.","ACTION":"Share","BUSY":"Saving...","SHARE_SHR_M_M":"This folder is shared with ${people} people and ${groups} groups.","SHARE_PUB_M_M":"This folder is visible to everyone in ${company} and shared with ${people} people and ${groups} groups.","CANCEL":"Cancel","SHARE_COMMUNITY_WARN":"Sharing with the community \'${0}\' will make this folder visible to everyone in your organization.","SHARE_PUB_0_0":"This folder is visible to everyone in ${company}. ","ERROR_NOT_FOUND":"The folder was not shared because it has been deleted or is no longer shared with you.","SHARE_SHR_0_0":"This folder is shared.","ERROR_ACCESS_DENIED":"The folder was not shared because you are not an owner of this folder."},"APP_LOAD_BLURB":"Please wait while the application loads...","PREVIEWFILE":{"ACTION":"Preview","ACTION_TOOLTIP":"Files Preview Page","NAME":"Preview"},"ERROR_COLON":"Error:","CONTINUE_LOGIN_TITLE":"You have logged in","MOVE_FILE":{"DIALOG_TITLE":"Move to...","WARN_PUBLIC":"Adding the selected file to this folder will make the file public (shared with everyone).","CROSS_COMMUNITY_MOVE_NOT_ALLOWED":"The file cannot be moved the a folder in another community.","INFO_SUCCESS_1":"The file was moved to ${target}.","CANNOT_MOVE_PERSONALFILE_TO_COMMUNITYFOLDER":"You cannot move a personal file into a community folder.","ACTION_LONG":"Move to...","COLLECTION_TYPE_MISSMATCH":"It is not allowed to move personal file to community owned folder or move community owned file to personal folder.","SOURCE_PARENT_NOT_FOUND":"The folder that contains the file you want to move does not exist any more.","CANNOT_MOVE_COMMUNITYFILE_TO_PERSONALFOLDER":"You cannot move a community file into a personal folder.","ERROR":"The file was not moved to ${target} due to an error.","ITEM_NOT_FOUND_IN_SOURCE_PARENT":"The selected file does not exist in the source folder any more.","ITEM_NOT_FOUND":"The selected file does not exist any more.","INFO":"Moving the file will cause other people to lose access to the file.","TARGET_PARENT_NOT_FOUND":"The target folder you want to move to does not exist any more.","EXTERNAL_COLLECTION":"The file was not moved into this folder because the folder can be shared outside of your organization and the file cannot.","ACTION":"Move to","ACCESS_DENIED":"You do not have permission to move file to the selected folder.","BUSY":"Moving...","ACTION_TOOLTIP":"Move this file","CANCEL":"Cancel","OK_MOVE_HERE":"Move Here","SOURCE_NOT_MOVEABLE":"The selected file cannot be moved.","OK":"Move","WARNING":"${item} is in the ${collection} folder. Some people will lose access to this file if you remove it."},"DELETE_SHARE":{"ACTION":"Remove share","ACTION_TOOLTIP_PERSON":"Remove all shares with ${0}","ACTION_TOOLTIP":"Remove all shares with this person"},"CMW":{"SHARE_WITH_COMMUNITY":{"EXTERNAL_FILES_ONLY_ALTERNATE":"This community can have members who are external to your organization. You can only select files that can be shared outside of your organization.","INFO_SUCCESS_1":"1 file was successfully shared with this community","ACTION_FIRST":"Add Your First File","EXTERNAL_FILES_ONLY":"This community can have members who are external to your organization. Only files that can be shared outside of your organization are displayed.","ERROR":"An error occurred while sharing the selected files.","ERROR_FILE_EXISTS":"The file already is shared with the community.","CONFIRM_BROWSE":"Are you sure you want to discard the current selection and upload a file from your computer?","PUBLIC_FILES_ONLY":"Only files that are shared with everyone in your organization can be shared with this community.","ERROR_TIMEOUT":"The server could not be contacted.","INFO_SUCCESS_X":"${0} files were successfully shared with this community","ERROR_CANCEL":"The request was cancelled.","PUBLIC_EXTERNAL_FILES_ONLY":"Only files that are shared with everyone in your organization and can be shared outside of your organization can be shared with this community.","WARN_PUBLIC_1":"Sharing the selected file with this community will make the file visible to everyone in your organization.","OK_TITLE":"Select files to share with this community","SHARE_AS_EDITOR_MIXED":"Allow community members to edit the selected files that I own","ACTION":"Add Files","TITLE":"Add Files to this Community","BROWSE_MY_COMPUTER":"Browse Files on My Computer...","SHARE_AS_EDITOR":"Allow community members to edit the selected files","ACTION_TOOLTIP":"Add files to this Community","WARN_PUBLIC_X":"Sharing the selected files with this community will make them visible to everyone in your organization.","OK":"Share Files","ERROR_UNAUTHENTICATED":"You must log in again."},"SHARE_COLLECTION_WITH_COMMUNITY":{"INFO_SUCCESS_1":"1 folder was successfully shared with this community","ADD_ACTION_FIRST":"Add Your First Folder","ACTION_FIRST":"Share Your First Folder","SHARE_MEMBER_AS_HELP":"Specify community member access to the selected folders. Readers can see files in the folders. Contributors can add and remove files from the folders. Owners can add and remove files from the folders, and share and delete the folders. ","AS_OWNERS":"as Owners","ADD_OK_TITLE":"Add folders to this Community","OK_TITLE":"Select folders to share with this community","ADD_ACTION_TOOLTIP":"Add folders to this Community","AS_EDITOR":"as Editors","ADD_OK":"Add Folders","SHARE_AS_EDITOR":"Allow community members to contribute to the selected folders","ACTION_TOOLTIP":"Share folders with this Community","PUBLIC_FOLDERS_ONLY":"Only folders that are shared with everyone in your organization can be shared with this community.","OK":"Share Folders","AS_READERS":"as Readers","PUBLIC_EXTERNAL_FOLDERS_ONLY":"Only folders that are shared with everyone in your organization and can be shared outside of your organization can be shared with this community.","AS_CONTRIBUTORS":"as Contributors","ERROR":"An error occurred while sharing the selected folders.","ERROR_TIMEOUT":"The server could not be contacted.","INFO_SUCCESS_X":"${0} folders were successfully shared with this community","ERROR_CANCEL":"The request was cancelled.","ADD_ACTION":"Add Folders","ACTION":"Share Folders","SHARE_MEMBER_AS":"Community members can access the selected folders  ${role}","TITLE":"Share Folders with this Community","EXTERNAL_FOLDERS_ONLY":"This community can have members who are external to your organization. You can only select folders that can be shared outside of your organization.","ADD_TITLE":"Add Folders","SHARE_MEMBER_AS_READER_EDTITOR_OWNER_HELP":"Specify community member rights for this folder.  Readers can see the folder contents. Editors can add and remove files and folders.  Owners can add and remove content and can share and delete the folder.","ERROR_UNAUTHENTICATED":"You must log in again."},"SOCIAL_MEDIA":{"UPLOADED_PHOTO":"This photo has also been uploaded to the Media Gallery.","REMOVE":{"MSG1":"The Community Files widget may not be removed because it is required by the Media Gallery widget. To remove the Files widget and delete all content stored in the Files library, you must first remove the Media Gallery widget.","WARNING_TEXT":"The Media Gallery widget requires the Files widget to work.","MSG2":"You can choose to hide the Files widget instead. All of the widget content will be kept intact. If you want to restore the Files widget, you may add it again from the Community\'s \"Add Apps\" menu.","OK_BUTTON":"Hide Widget","CANCEL_BUTTON":"Cancel","TITLE":"Hide Widget","WARNING":"Warning:"},"UPLOAD_MESSAGE":"Upload photos and videos using the Media Gallery if you want them to appear in the Media Gallery widget.","UPLOADED_VIDEO":"This video has also been uploaded to the Media Gallery.","VIEW_IN_MEDIA_WIDGET":"View the content in the Media Gallery widget."},"WARNING_PRIVATE_PUBLIC":"Files that are not shared with everyone in your organization will be removed when changing from a restricted community to an open or moderated community. ","TRASH":{"EMPTY_NORMAL_TRASH":"There are no files in the trash for this community.","VIEW_ALL":"View All","TITLE":"Trash","DESCRIPTION":"Community members can see files in Trash. Community owners and file owners can restore or permanently delete files in Trash.","EMPTY":"Share information and collaborate with others.","FEED":{"T":"Follow changes to these files through your feed reader","L":"Feed for these Files"}},"UPLOAD_FILE":{"DIALOG_TITLE":"Upload Files to this Community"},"EDIT":{"UPLOAD":{"READER_WITH_SHARE":"Reader: (Share, view files and folders in this community)","READER":"Reader: (Share and view files in this community)","LABEL":"Upload role: ","EDITOR":"Editor: (Share, upload and edit community files)"},"VIEW":{"SUCCESS":"The changes to the default view have been saved.","FOLDERS":"Folders","FILES":"Files","ERROR":"The changes to the default view have not been saved due to an error."},"MANAGER":"Owner (share and remove files)","HEADER":"Edit Files Settings","MEMBERS_LABEL":"Members have the role of:","INFO_SUCCESS":"Your changes for Files have been saved. ","ROLE":{"SUCCESS":"The role change has been saved.","ERROR":"The role change has not been saved due to an error."},"SAVE_CLOSE":"Save and Close","UPLOAD_FILES_FOLDRES":{"READER":"Reader: (View files and folders in this community)","EDITOR":"Editor: (Share, upload, and edit community files and folders)"},"CANCEL":"Cancel","VIEW_LABEL":"Show by default:","SAVE":"Save","SHARE":{"READER":"Reader","LABEL":"Share role: ","CONTRIBUTOR":"Contributor (share files)","MANAGER":"Owner (share and remove files)"}},"REMOVE_COLLECTION_FROM_COMMUNITY":{"ERROR_CANCEL":"The community was not updated because the request was cancelled.  Click \'OK\' to try again.","INFO_SUCCESS":"The folder was removed from the community.","QUESTION":"Are you sure you want to remove this folder from this community?\n\n${0}","ACTION":"Remove from Community","ERROR":"The community could not be updated due to an error.","ACTION_TOOLTIP":"Remove this folder from the community","ERROR_TIMEOUT":"The community was not updated because the server could not be contacted.  Click \'OK\' to try again.","ERROR_NOT_FOUND":"This community has been deleted or you are no longer a member.","ERROR_ACCESS_DENIED":"You do not have permission to remove this item from the community.","ERROR_NOT_LOGGED_IN":"The community was not updated because you were not logged in.  Click \'OK\' to try again."},"LIST":{"DESCRIPTION_OWNED":"Files owned by this community","FOLDERS":{"TITLE":"Folders"},"ZIP_DOWNLOAD":{"T":"Download all files as a compressed file","L":"Download All Files"},"VIEW_ALL":"View All","COMMUNITY_FOLDERS_TITLE":"Community Folders","DESCRIPTION_SHARED":"Files shared with this community","EMPTY_NORMAL_SHARED":"There are no files shared with this community.","PIVOT_LABEL_SHARED":"Shared","EMPTY":"Share information and collaborate with others.","EMPTY_NORMAL_TRASH":"There are no files in the trash for this community.","FILES":{"TITLE":"Files"},"PIVOT_LABEL":"All","TITLE":"Files","EMPTY_NORMAL":"There are no files for this community.","COMMUNITY_FILES_TITLE":"All Community Files","DESCRIPTION":"Files and Folders for This Community","PIVOT_LABEL_OWNED":"Owned","FEED":{"T":"Follow changes to these files through your feed reader","L":"Feed for these Files"},"EMPTY_NORMAL_OWNED":"There are no files owned by this community.","EMPTY_NORMAL_FOLDERS":"There are no folders shared with this community."},"REMOVE_FROM_COMMUNITY":{"ERROR_CANCEL":"The community was not updated because the request was cancelled.  Click \'OK\' to try again.","INFO_SUCCESS":"The file was removed from the community.","QUESTION":"Are you sure you want to remove this file from this community?\n\n${0}","ACTION":"Remove from Community ","ERROR":"The community could not be updated due to an error.","ACTION_TOOLTIP":"Remove this file from the community","ERROR_TIMEOUT":"The community was not updated because the server could not be contacted.  Click \'OK\' to try again.","ERROR_NOT_FOUND":"This community has been deleted or you are no longer a member.","ERROR_ACCESS_DENIED":"You do not have permission to remove this item from the community.","ERROR_NOT_LOGGED_IN":"The community was not updated because you were not logged in.  Click \'OK\' to try again."}},"SHARE_INFO":{"PROPAGATE_TITLE":"Disabling this option will prevent others from sharing this file or adding it to a private folder.","ERROR":"Unable to load share information","SHOW_INVOLVED":"Show more details...","SHOW_GRAPH":"See Who Has Shared...","PAGE":{"DOWNLOADED_CURRENT":"${0} has viewed the most recent version of this file.","DOWNLOADED_NEVER":"${0} has not yet viewed this file.","DOWNLOADED_OLDER":"${0} has viewed an older version of this file."},"PROPAGATE_SUCCESS_ON":"Other people can now share this file","NO_SHARES":"No shares on this file","PROPAGATE_ERROR":"The sharing for this file could not be changed due to an error.  Please try again later.","PROPAGATE_OTHER":"Only the owner can share this file","FILE":{"DOWNLOADED_CURRENT":"${0} has downloaded the most recent version of this file.","DOWNLOADED_NEVER":"${0} has not yet downloaded this file.","DOWNLOADED_OLDER_ALT":"An older version","DOWNLOADED_CURRENT_ALT":"Most recent version","DOWNLOADED_OLDER":"${0} has downloaded an older version of this file.","DOWNLOADED_NEVER_ALT":"Never downloaded"},"LOADING":"Loading...","PROPAGATE_SUCCESS_OFF":"Only the owner can share this file","PROPAGATE_LABEL":"Allow others to share this file","SHOW_ALL":"Hide details"},"WARNING_ACCESS_MESSAGE":"You do not have permission to access this page. If someone sent you this link, check to see if you have the correct permission.","ORGNAME_DEFAULT":"My organization","USERSEARCH":{"SEARCH_USERS_BUTTON":"Search","PERSON_SOURCE":"a Person","GROUP_HINT_TEXT":"Group name...","USER_EMAIL":"Email","INACTIVE":"(inactive)","ERROR_LINK":"Search for People","TITLE_BLURB":"Need to find someone\'s files?  Enter their name or email address in the search field, below.  As you type, we\'ll show you a list of possible matches. If you can\'t find the person you are searching for in the list, just click the Search button to see a list of all the possible matches in the directory.","INVITATION_TIP":"Entry must be an email address","NO_MATCHES":"No matches","SEARCH_DIRECTORY":"Person not listed? Use full search...","NO_RESULTS":"No results for \'${0}\'","TITLE":"Search Results","INVITATION":"Share using email address","QUERY_TOO_SHORT":"Enter a longer search query to view results","PERSON_HINT_TEXT":"Person name or email...","GROUP_SOURCE":"a Group","LOADING":"Loading...","USER_NAME":"Name"},"MENUBAR":{"HELP":"Help","HELP_TITLE":"Help"},"A11Y_CONTRIBUTOR_ADDED":"Selected ${0} as a contributor","A11Y_EDITOR_REMOVED":"Removed ${0} as an editor","ADD_FILES_TO_FILESYNC":{"ERROR_X":"${count} files were not added to Sync due to errors.","DIALOG_TITLE":"Add Files","INFO_SUCCESS_1":"Sync is enabled for ${item}. Large files might take a few moments before appearing on your computer.","ACTION_X":"Add to Sync","ERROR_1_NOT_LOGGED_IN":"${item} was not added to Sync because you were not logged in. Please log in and try again.","INFO_SUCCESS":"${0} was added to Sync.","OK_TITLE":"Add the selected files to Sync","ACTION_TOOLTIP":"Add to Sync","ERROR_1":"${item} was not added to Sync due to an error.","ERROR_1_TIMEOUT":"${item} was not added to Sync because the server could not be contacted.","OK":"Add Files","ERROR_1_EXISTS":"Cannot add ${item} because Sync already includes a different file with that name.","ACTION_LONG":"Add Files...","INFO_SUCCESS_X":"${count} files were added to Sync.","ERROR_1_ACCESS_DENIED":"${item} was not added to Sync because you do not have permission to add this file.","ACTION_ENABLED_X":"Add Files button is enabled","ERROR_1_NOT_FOUND":"${item} already has been added to Sync.","STATUS":"Adding...","ACTION_TOOLTIP_X":"Add ${0} files to Sync","ACTION":"Add Files","ERROR_X_CANCEL":"Some files might not have been added to Sync because the request was cancelled. ","BUSY":"Adding...","CANCEL":"Cancel","ACTION_DISABLED_X":"Add Files button is disabled","ERROR_1_CANCEL":"${item} cannot be added to Sync because the request was cancelled."},"TIPS":{"P1":"You can collaborate with colleagues by sharing files with them. To share a file, click the file name in any list and then click Share. ","OLDER":"Older","HIDE_TIPS":"Hide Tips","ERROR":"Unable to load help","H":"Share important content with your colleagues","NEWER":"Newer"},"ALERT":{"DIALOG_TITLE":"Alert","BUSY":"Busy...","OK":"OK"},"STOP_SHARING_FILE":{"DIALOG_TITLE":"Stop Sharing File","QUESTION_PUBLIC":"Are you sure you want to stop sharing this file?\n\nThis file will no longer be visible to everyone in your organization, or shared with people, folders, or communities.  This operation cannot be undone.","QUESTION":"Are you sure you want to stop sharing this file?\n\nThe file will no longer be shared with people or communities, and will be removed from all folders except your private folders. This action cannot be undone.","QUESTION_PUBLIC_E":"Are you sure you want to stop sharing this file?\n\nThis file will no longer be visible to everyone in your organization, or shared with people or folders. This operation cannot be undone.","ERROR":"The shares on this file could not be removed.  Please try again later.","ERROR_TIMEOUT":"The shares on this file could not be removed because the server could not be contacted.  Click \'OK\' to try again.","QUESTION_E":"Are you sure you want to stop sharing this file?\n\nThe file will no longer be shared with people, and will be removed from all folders except your private folders. This action cannot be undone.","ERROR_CANCEL":"The shares on this file were not removed because the request was cancelled.  Click \'OK\' to try again.","INFO_SUCCESS":"This file is now private.","ACTION":"Stop Sharing this File","BUSY":"Removing shares...","ACTION_TOOLTIP":"Remove all shares for this file and remove from all shared folders or folders that are visible to everyone in your organization","CANCEL":"Cancel","OK":"OK","ERROR_NOT_FOUND":"The file has been deleted or is no longer shared with you."},"ADD_FILES_TO_COLLECTION":{"DIALOG_TITLE":"Add Files","COMM_SHARE_AS_EDITOR_MIXED":"Allow members of this community to edit the selected files that I own ","INFO_SUCCESS_1":"${filelink} was added to ${collectionlink}. ${undolink}","EXTERNAL_FILES_ONLY":"This folder can be shared with people external to your organization. You can only select files that can be shared outside of your organization.","CONFIRM_BROWSE":"Are you sure you want to discard the current selection and upload a file from your computer?","INFO_SUCCESS_NOUNDO_X":"${count} files were added to ${collectionlink}.","OK_TITLE":"Add the selected files to this folder","BROWSE_MY_COMPUTER":"Browse Files on My Computer...","ERROR_1":"The file was not added due to an error.","SHARE_AS_EDITOR_FOR_MEMBERS_MIXED":"Allow members of this folder to edit the selected files that I own","SHARE_AS_EDITOR":"Allow editors of this folder to edit the selected files","WARN_PUBLIC_X":"Adding the selected files to this folder will share the file with everyone in your organization.","ERROR_TIMEOUT_1":"The file was not added because the server could not be contacted.  Click \'Add Files\' to try your request again.","ERROR_CANCEL_1":"The file was not added because the request was cancelled.  Click \'Add Files\' to try your request again.","INFO_SUCCESS_SHARED_1":"${filelink} was added to ${collectionlink} and is now shared. ${undolink}","INFO_EXISTS_X":"The selected files were already in this folder.","INFO_SUCCESS_PUBLIC_1":"${filelink} was added to ${collectionlink} and is now shared with everyone in your organization. ${undolink}","PUBLIC_FILES_ONLY":"Only files shared with everyone in your organization can be added to this folder.","INFO_SUCCESS_X":"${count} files were added to ${collectionlink}. ${undolink}","ERROR_ACCESS_DENIED_1":"You do not have permission to add the selected file to this folder.","ERROR_NOT_FOUND_1":"This folder or the selected file has been deleted or is no longer shared with you.","PUBLIC_EXTERNAL_FILES_ONLY":"This folder is shared with everyone in your organization, and can also be shared with people external to your organization. You can only select files that can be shared publically and externally.","ACTION":"Add Files","UNSHAREABLE_FILE":"Only the file owner can add this file to a folder.","ERROR_EXTERNAL_COLLECTION":"The file was not added to this folder because the folder can be shared outside of your organization and the file cannot.","SHARE_AS_EDITOR_FOR_MEMBERS":"Allow members of this folder to edit the selected files","ERROR_X":"The files were not added due to an error.","ERROR_TIMEOUT_X":"The files were not added because the server could not be contacted.  Click \'Add Files\' to try your request again.","ERROR_CANCEL_X":"The files were not added because the request was cancelled.  Click \'Add Files\' to try your request again.","INFO_SUCCESS_SHARED_X":"${count} files were added to ${collectionlink} and are now shared. ${undolink}","INFO_SUCCESS_PUBLIC_X":"${count} files were added to ${collectionlink} and are now shared with everyone in your organization. ${undolink}","ERROR_NOT_LOGGED_IN_1":"The file was not added because you were not logged in.  Click \'Add Files\' to add the file.","SHARE_AS_EDITOR_MIXED_INFO":"Files that you do not own cannot be shared with edit access.","ERROR_ACCESS_DENIED_X":"You do not have permission to add the selected files to this folder.","ERROR_NOT_FOUND_X":"This folder or some of the selected files have been deleted or are no longer shared with you.","ACTION_TOOLTIP":"Add files to this folder","OK":"Add Files","INFO_SUCCESS_NOUNDO_1":"${filelink} was added to ${collectionlink}.","UNDO":{"ERROR_PUBLIC":{"UNKNOWN_X":"${count} files are still shared with everyone in your organization due to an error.","TIMEOUT_1":"${filelink} is still shared with everyone in your organization because the server could not be contacted.","CANCEL_X":"${count} files are still shared with everyone in your organization because the request was cancelled.","TIMEOUT_X":"${count} files are still shared with everyone in your organization because the server could not be contacted.","UNKNOWN_1":"${filelink} is still shared with everyone in your organization due to an error.","CANCEL_1":"${filelink} is still shared with everyone in your organization because the request was cancelled."},"STATUS":"Removing...","INFO_SUCCESS_1":"${filelink} was removed from ${collectionlink}.","ACTION":"Undo","ERROR_BASE":{"TIMEOUT_1":"${filelink} was not removed from ${collectionlink} because the server could not be contacted.","UNKNOWN_X":"${count} files were not removed from ${collectionlink} due to an error.","CANCEL_X":"${count} files were not removed from ${collectionlink} because the request was cancelled.","TIMEOUT_X":"${count} files were not removed from ${collectionlink} because the server could not be contacted.","UNKNOWN_1":"${filelink} was not removed from ${collectionlink} due to an error.","CANCEL_1":"${filelink} was not removed from ${collectionlink} because the request was cancelled."},"INFO_SUCCESS_X":"${count} files were removed from ${collectionlink}."},"ACTION_LONG":"Add Files...","COMM_SHARE_AS_EDITOR":"Allow members of this community to edit the selected files","PRIVATE_FILES_ONLY":"Only public files can be added to this folder.","STATUS":"Adding...","WARN_PUBLIC_1":"Adding the selected file to this folder will share the file with everyone in your organization.","SHARE_AS_EDITOR_MIXED":"Allow editors of this folder to edit the selected files that I own","ERROR_NOT_LOGGED_IN_X":"The files were not added because you were not logged in.  Click \'Add Files\' to add the file.","BUSY":"Adding...","CANCEL":"Cancel","INFO_EXISTS_1":"${filelink} was already in ${collectionlink}."},"INVITE_DIALOG":{"DIALOG_TITLE":"Content Was Not Shared","MESSAGE_0":"The following users do not have an account and no content was shared with them.","MESSAGE_1":"Invite these users as guests to share the content with them.","BUSY":"Please wait...","CANCEL":"Cancel","OK":"Proceed with invitations"},"JAVASCRIPT_DISABLED_REGION":"Warning messages for JavaScript have been disabled in your web browser.","REPLACE_FILE":{"DIALOG_TITLE":"Upload New Version","ERROR_FILE_REMOVED_FROM_DISK":"An error occurred and the file was removed from the disk following the upload.","ERROR_QUOTA_VIOLATION":"The file could not be replaced because of space restrictions.  To replace with this file, ${0} of files or versions would have to be removed.","ERROR_EXTENSION_VIOLATION":"Files with the extension \'${0}\' are not allowed.","TRIM_LONG_DESCRIPTION":"Shorten change summary?","PROPAGATE_LABEL":"Allow others to share this file","TRANSFER_TIME":{"SEC":"${0} seconds remaining - ${1} (${2}/s)","MIN":"${0} minutes remaining - ${1} (${2}/s)","HOUR":"${0} hours remaining - ${1} (${2}/s)"},"WARN_QUOTA_VIOLATION":"The file is larger than the available space. The upload will fail unless ${0} of files or versions are removed.","FILE_DOES_NOT_EXIST":"This file does not exist.  Please select a file using the browse button.","ERROR_VIRUS_FOUND":"A virus was detected in your new version.  Please run a local virus scan on this file before uploading it again.","INFO_SUCCESS_NOVERSION":"${link} updated.","ERROR_CANCEL":"The file was not edited because the request was cancelled. Click \'Upload\' to try your request again.","ERROR_ITEM_EXISTS":"A file already exists named \'${0}\'.  You must rename the other file before changing this file\'s extension.","WARN_LONG_DESCRIPTION":"The change summary is too long. ","ERROR_FILENAME_INVALID_CHARACTERS":"The file name may not contain the characters: % & \\ \"","ACTION":"Upload New Version","ERROR_QUOTA_VIOLATION_OTHER":"The file could not be replaced because of space restrictions.  To replace with this file, ${0} of files or versions belonging to ${1} would have to be removed.","PERMISSIONS_LABEL":"Permissions:","ERROR_MAX_CONTENT_SIZE":"The file could not be replaced because it is larger than the maximum allowed file size of ${0}","REQUIRED_FIELD":"Required field","WARN_PRE_MODERATION":"This file may be unavailable until the changes are approved by a moderator.","ERROR_EXTENSION_VIOLATION_EMPTY":"Files without an extension are not allowed.","ERROR_ACCESS_DENIED":"You cannot upload new versions. Either this file was locked or the owner removed your editor access.","ERROR_NOT_FOUND":"The file could not be edited because it has been deleted or is no longer shared with you.","ERROR_NAME_TOO_LONG":"Changing the extension of the file to the new extension would make the name of this file too long.  Please shorten the filename by editing the properties of the file.","ERROR_CONCURRENT_MODIFICATION":"This file was edited by ${user} on ${EEEE}, ${date_long} ${time_long}. Clicking \'Upload\' will overwrite the changes.   ","CHANGE_EXTENSION":"Change Extension","INFO_SUCCESS":"${link} updated to version ${version}.","REPLACEERROR":"The file\'s contents were not replaced due to an error.","ACTION_TOOLTIP":"Update the contents of this file","OK":"Upload","ERROR_LOAD":"Information about this file could not be retrieved. Please try again later.","SELECT_FILE":"Please select a file to upload","ERROR_NOT_LOGGED_IN":"The file was not edited because you were not logged in. Click \'Upload\' to try your request again.","ACTION_LONG":"Upload New Version...","LIMIT_HELP":"You can replace the contents of this file by selecting a different file.  You must choose a file that is smaller than ${limit} - files above this size are not allowed.","ERROR":"The file could not be edited due to an error.","REPLACE_LABEL":"New version: ","ERROR_TIMEOUT":"The file was not edited because the server could not be contacted. Click \'Upload\' to try your request again.","TRANSFER":"Uploading ${0} @ ${1}/s ","REQUIRED_MARK":"* Required","ERROR_DETAILS_LINK":"Details...","ERROR_DETAILS_TOOLTIP":"Show more details about this error","INFO_SUCCESS_PRE_MODERATION":"The file ${name} has been submitted for review. No versions will be available until the new or updated version is approved.","UPDATE_MESSAGE":{"BASE":{"MONTH":"This file was last updated by ${user} on ${MMM} ${d}.","TODAY":"This file was last updated by ${user} today at ${time}.","YESTERDAY":"This file was last updated by ${user} yesterday at ${time}.","DAY":"This file was last updated by ${user} on ${EEEE} at ${time}.","YEAR":"This file was last updated by ${user} on ${date_long}."},"WARNING_PUBLIC":{"MONTH":"This file was last updated by ${user} on ${MMM} ${d}.  Check that you have downloaded the latest version of this file.","TODAY":"This file was last updated by ${user} today at ${time}.  Check that you have downloaded the latest version of this file.","YESTERDAY":"This file was last updated by ${user} yesterday at ${time}.  Check that you have downloaded the latest version of this file.","DAY":"This file was last updated by ${user} on ${EEEE} at ${time}.  Check that you have downloaded the latest version of this file.","YEAR":"This file was last updated by ${user} on ${date_long}.  Check that you have downloaded the latest version of this file."},"WARNING":{"MONTH":"You have not downloaded the latest version of this file. ${user} updated this file on ${MMM} ${d}.","TODAY":"You have not downloaded the latest version of this file. ${user} updated this file today at ${time}.","YESTERDAY":"You have not downloaded the latest version of this file. ${user} updated this file yesterday at ${time}.","DAY":"You have not downloaded the latest version of this file. ${user} updated this file on ${EEEE} at ${time}.","YEAR":"You have not downloaded the latest version of this file. ${user} updated this file on ${date_long}."}},"REPLACE_CONFIRM":"The file you have selected has a different extension than the current file.  Click \'Change Extension\' to change the extension from \'${0}\' to \'${1}\'. ","CHANGE_SUMMARY":"Change summary:","BUSY":"Saving...","CANCEL":"Cancel","PUBLIC_LABEL":"Share this file with everyone in your organization"},"EXTERNAL_WARNING_COLON":"External:","SCENE_TITLE_FOLDER":"Folder: ${0}","WINDOWTITLE":{"WELCOME":"Welcome to Files","OFFLINE":"Offline","STATISTICS":"Files Metrics","PAGESHOME":"${0}","OFFLINEERROR":"Error","NORMAL":"${0} - ${1}","FINDPEOPLE":"Search Results","LOGIN":"Log in","COLLECTIONERROR":"Error","FILEERROR":"Error","ABOUT":"About Files","FOLDER":"${0} - Folder","WHATSNEW":"Recent Updates","COLLECTIONS":"Folders","FAQ":"Help","USERCHANNEL":"${0}","PAGEERROR":"Error","DOCUMENTHOME":"${0}","TOOLS":"Tools","FILE":"${0} - File","USERHOMEERROR":"Error"},"SCENE_TITLE_TOOLTIP":"Click to refresh the page ","LOGIN":{"ACTION":"Log In and Start Sharing!","ACTION_TOOLTIP":"Log in to upload and share files, comment, and create folders."},"INVITE_GUEST_NO_INVITE":"You cannot share with others as a guest. The following people were not shared with: ${0}","BACK_TO_PARENT_COLLECTIONS":"Back to parent folders: ${0}","BACK_TO_MY_COLLECTIONS":"Back to my folders","VIEWS":{"DETAILS":"List","DETAILS_TOOLTIP":"Include the description and social metadata for each file","SUMMARY":"Customizable","GRID":"Grid View","SUMMARY_TOOLTIP":"Fully customizable display of information about each file","CUSTOMIZE_SUMMARY":"Customize","GRID_TOOLTIP":"Show thumbnails in a grid format.","CUSTOMIZE_SUMMARY_TOOLTIP":"Change the columns displayed below"},"COLLECTION_PICKER":{"BREADCRUMB":{"PREFIX":{"ADD_TO":"Add to:","MOVE_TO":"Move to:"},"ROOT":{"MY_FOLDERS":"My Folders","SHARED_WITH_ME":"Shared With Me","PINNED":"Pinned","RECENT":"Recent"}},"COMPACT":{"RADIO_LABEL_WITH_CREATE_FOLDER_X":"Create a new folder, or select where you want to pick the folders from.","CREATE_FOLDER":{"NAME":"Create Folder"},"MY_FOLDERS":{"NAME":"Share from Files"},"RADIO_LABEL_1":"Select where you want to pick the folder from.","INSERT_LINKS":"Insert Links","COMMUNITY_FOLDER":{"NO_ITEM_MSG":"There are no folders for this view.","TOOLTIP":"Folders in this community","TITLE":"Community Folders","NAME":"This Community","DESCRIPTION":"Community-owned items can only be added/moved to community-owned folders."},"RADIO_LABEL_X":"Select where you want to pick the folders from.","RADIO_LABEL_WITH_CREATE_FOLDER_1":"Create a new folder, or select where you want to pick the folder from.","HEADER":{"DESCRIPTION_LABEL":"Choose folders from:"}},"RECENTLY_UPDATED":{"TEXT":"Recently Updated Folders","EMPTY":{"READER":{"PRIVATE":"There are no private folders available.","PUBLIC":"There are no available folders visible to everyone in your organization.","ANY":"There are no folders available."},"CONTRIBUTOR":{"PRIVATE":"There are no private folders you can add files to.","PUBLIC":"There are no folders you can add files to that are shared with you.","ANY":"There are no folders you can add files to."},"MANAGER":{"PRIVATE":"There are no private folders you own.","PUBLIC":"There are no folders you own that are visible to everyone in your organization.","ANY":"There are no folders you own."}}},"SEARCH_SCOPED":"Filter these folders...","NEXT_T":"Next page","UNSELECTABLE_NOT_EDITOR":"You are not an editor of this folder.","PREVIOUS_T":"Previous page","SELECTED_0":"No folders selected","SELECTED_1":"1 folder selected","PAGE":"Page","RECENT_COLLECTIONS":{"TOOLTIP":"Created ${0} by ${1}"},"PAGING_BOTTOM_LABEL":"Paging options","EXTERNAL_ALT":"Shared externally","UNSELECTABLE_PRIVATE_ONLY":"This folder cannot be selected because it is not shared with you.","ERROR_NEVER_LOGGED_IN":"This person has never logged in to Files.","ALL_FILES":"All Community Files","SHARED_COLLECTIONS":{"TEXT_TREE_RENDERER":"Shared with Me","TEXT":"Folders Shared With Me","EMPTY":{"READER":{"PRIVATE":"No private folders have been shared with you yet.","PUBLIC":"No folders have been shared with you yet.","ANY":"No folders have been shared with you yet."},"CONTRIBUTOR":{"PRIVATE":{"ADD":"There are no private folders shared with you that you can add files to.","MOVE":"There are no private folders shared with you that you can move files or folders to."},"PUBLIC":"There are no folders that have been shared with you that you can add files to.","ANY":{"ADD":"There are no folders shared with you that you can add files to.","MOVE":"There are no folders shared with you that you can move files or folders to."}},"MANAGER":{"PRIVATE":"No private folders have been shared with you as an owner.","PUBLIC":"No folders have been shared with you as an owner.","ANY":"No folders have been shared with you as an owner."}}},"LOADING":"Loading...","PUBLIC_COLLECTIONS":{"TEXT":"${company} Folders","EMPTY":{"READER":"There are no folders visible to everyone in your organization.","CONTRIBUTOR":"There are no folders visible to everyone in your organization that you can add files to.","MANAGER":"There are no folders visible to everyone in your organization that you own."}},"UNSELECTABLE_NOT_CONTRIBUTOR":"You are not a contributor for this folder.","NO_FOLDERS":"No folders here!","SEARCH":"Filter","EMPTY":"None available","UNSELECTABLE":"This folder cannot be selected.","SEARCH_ALL_LINK":"Filter all folders.","ERROR_CANCEL":"The request was cancelled.","UNSELECTABLE_PUBLIC_ONLY":"This folder cannot be selected because it is not shared with you.","SELECTED_X":"${0} folders selected","COUNT_ALT":"Showing folders ${0} through ${1} of ${2}","ERROR_UNAUTHENTICATED":"You must log in again.","RECENT_FOLDERS":{"TEXT_TREE_RENDERER":"Recent","TEXT":"Recent Folders","VIEW_MORE":"View More"},"EXTERNAL":"Shared externally","ELLIPSIS":"...","FAVORITE_COLLECTIONS":{"TEXT_TREE_RENDERER":"Pinned","TOOLTIP":"Created ${0} by ${1}","TEXT":"Pinned Folders","EMPTY":{"READER":{"PRIVATE":"You have not pinned any private folders yet.","PUBLIC":"You have not pinned any folders visible to everyone in your organization yet.","ANY":"You have not pinned any folders yet."},"CONTRIBUTOR":{"PRIVATE":{"MOVE":"You do not have any private pinned folders you can move files or folders to.","ADD":"You do not have any private pinned folders you can add files to."},"PUBLIC":"You do not have any pinned folders visible to everyone in your organization you can add files to.","ANY":{"ADD":"You do not have any pinned folders you can add files to. ","MOVE":"You do not have any pinned folders you can move files or folders to. "}},"MANAGER":{"PRIVATE":"You do not have any private pinned folders you own.","PUBLIC":"You do not have any pinned folders visible to everyone in your organization you own.","ANY":"You do not have any pinned folders you own. "}}},"SEARCH_EMPTY":"No results were found.","PAGING_TOP_LABEL":"Paging","UNSELECTABLE_NOT_INTERNAL":"This folder cannot be selected because it can be shared outside of your organization.","PAGE_ALT":"Page ${0} of ${1}","RECENTLY_CONTRIBUTED":{"TEXT":"Folders I Recently Added To","EMPTY":{"READER":{"PRIVATE":"You have not added files to any private folders yet.","PUBLIC":"You have not added files to any folders that are shared with everyone in your organization.","ANY":"You have not added files to any folders yet."},"CONTRIBUTOR":{"PRIVATE":"You have not added files to any private folders yet.","PUBLIC":"You have not added files to any folders that are shared with everyone in your organization.","ANY":"You have not added files to any folders yet."},"MANAGER":{"PRIVATE":"You have not added files to any private folders you own yet.","PUBLIC":"You have not added files to any folders that are shared with everyone in your organization.","ANY":"You have not added files to any folders you own yet."}}},"MY_COLLECTIONS":{"TEXT":"My Folders","EMPTY":{"PRIVATE":"You have not created any private folders yet.","PUBLIC":"You have not created any folders that are visible to everyone in your organization yet.","EXTERNAL":"You do not have any folders that can be shared outside of your organization.","ANY":"You have not created any folders yet."}},"DIALOG_TITLE_DEFAULT":"Select Folders","UNSELECTABLE_NOT_EXTERNAL":"This folder cannot be shared with people outside of your organization.","ERROR":"An error has occurred.","SEARCH_ALL":"Filter all folders...","ERROR_TIMEOUT":"The server could not be contacted.","COUNT":"${0}-${1} of ${2}","UNSELECTABLE_NOT_MANAGER":"This folder cannot be selected because you do not own it.","SEARCH_CANCEL":"Clear filter","NEXT":"Next","PREVIOUS":"Previous","COMMUNITY_COLLECTIONS":{"COLLECTION_LONG_X":"${possessive}\' Folders","DESCRIPTION":"To view a community\'s folders, type a name in the search field above.","TEXT":"A Community\'s Folders","COLLECTION_LONG":"${possessive}\'s Folders","EMPTY":{"ANY":"You cannot add files to this community because either you do not have editor access to it or no folders exist in this community to add a file to."},"SEARCH_HINT":"Community name..."}},"NOTIFY_COLLECTION":{"UNSUBSCRIBE":{"ALL":"You have stopped following this folder."},"ERROR":"Your following settings on this folder were not changed due to an error.  Please try again.","SUBSCRIBE":{"ALL":"You are now following this folder."}},"A11Y_CONTRIBUTOR_REMOVED":"Removed ${0} as a contributor","COLUMN":{"CUSTOMIZE":{"FILE":{"G_FILEINFO":"File Properties","DEFAULTS":"Show Default Columns","G_INFO":"Number Of","G_PEOPLE":"People","G_OTHER":"Other","TITLE":"Customize File Columns","CANCEL":"Cancel","DESCRIPTION":"Select columns to display in lists of files.","OK":"Show","EMPTY":"No columns are available for this view.","G_DATES":"Dates"}},"FILE":{"PEOPLESHARED_L":"People the file is shared with","SIZE":"Size","PEOPLESHARED_M":"People shared with","ENCRYPTION":"Encrypted","VERSION_L":"The current version number","DELETED_L":"Date the file was deleted","VERSION_M":"Current version number","RECOMMENDATIONS_L":"Number of likes","NAME":"Name","COLLECTEDBY_L":"Person that added the file to the folder","COLLECTEDBY_M":"Added by","SIZE_L":"Size of the file contents","SIZE_M":"Size of current version","DELETEDBY":"Deleted By","ENCRYPTION_L":"Encryption status","ENCRYPTION_M":"Encryption","NAME_L":"The name of this file","TAGS":"Tags","COLLECTIONSSHARED":"Folders","VERSIONS":"Versions","TOTALSIZE":"Total Size","TAGS_L":"Tags","VERSIONS_L":"Number of saved versions","COLLECTED":"Added","DESCRIPTION_L":"Description","SHAREDWITH":"Shared With","LOCK":"Locked","ADDED_L":"Date the file was uploaded","MODIFIEDBY_L":"Person that last updated the file contents","MODIFIEDBY_M":"Updated by","TOTALSIZE_L":"Size of file including versions","TOTALSIZE_M":"Total size of all versions","PEOPLESHARED":"People","PRIVACY_L":"Who can see this file","COLLECTED_L":"Date the file was added to the folder","ADDEDBY":"Created By","VERSION":"Version","LOCK_L":"Lock status","SHAREDWITH_M":"Shared with","LOCK_M":"Lock","RECOMMENDATIONS":"Likes","COMMUNITYSHARED_L":"Date the file was shared with the community","COLLECTEDBY":"Added By","COMMENTS_L":"Number of comments on this file","ADDEDBY_L":"Person that uploaded this file","COMMUNITYSHAREDBY":"Shared By","SYSTEMMODIFIED_L":"Date when comments, shares, versions, tags, or contents changed.","ADDEDBY_M":"Created by","SYSTEMMODIFIED_M":"Any update","MODIFIED":"Updated","SHAREDBY_M":"Shared by","DOWNLOADS":"Views","COMMUNITYSHAREDBY_L":"Person that shared the file with the community","COMMUNITYSHAREDBY_M":"Shared by","MODIFIED_L":"Date the file contents were last updated","DOWNLOADS_L":"Number of file downloads and views","DESCRIPTION":"Description","DELETEDBY_L":"Person that deleted this file","DELETEDBY_M":"Deleted by","MODIFIEDBY":"Updated By","ADDED":"Created","SHARED":"Shared","COLLECTIONSSHARED_L":"Folders the file is in","PRIVACY":"Sharing","COMMUNITYSHARED":"Shared","SHARED_L":"Date the file was last shared ","COMMENTS":"Comments","SYSTEMMODIFIED":"Any Update","DELETED":"Deleted","SHAREDBY":"Shared By"},"COLLECTION":{"ADDED":"Created","ADDEDBY_L":"Person that created this folder","PRIVACY":"Sharing","UPDATED_L":"Date when a folder was last updated","NAME":"Name","ADDED_L":"Date the folder was created","COUNT":"Files","OWNER":"Owner","PRIVACY_L":"Who can see this folder","ADDEDBY":"Created By","NAME_L":"The name of this folder","UPDATED":"Updated","COUNT_L":"Number of files in this folder"},"COMMENT":{"ADDED":"Date","ADDED_L":"Date the comment was created"}},"QUOTA":{"POPUP_COMMUNITY":{"LABEL_QUOTA_EXCEEDED":"This community is using ${size} more than the ${total} limit.","LABEL_UNLIMITED":"This community is using ${size}.","LOADING":"Loading...","LABEL_QUOTA":"This community has ${size} of free space remaining (${total} limit).","SEE_DELETED":"View Trash","LABEL_ERROR":"The community free space could not be retrieved, please try again later."},"INFO_COMMUNITY":"How much space is this community using?"},"CONTINUE_LOGIN_MESSAGE":"You have successfully logged in to IBM Connections.","CONTENT":{"USER_HAS_NO_PLACE":{"MSG1":"${0} has not been given permission to upload or create files."},"ERROR_REQUEST_UNKNOWN":"An unknown error has occurred.","NEXT_T":"Next page","EDIT":"Edit","LOCKED":"Locked","PREVIOUS_T":"Previous page","BOOLEAN_YES":"Yes","ERROR_REQUEST_TIMEOUT":"The server could not be contacted.","LOADING":"Loading... ","SHARE_INTENT":"Shared externally","FILE_TYPE":"File Type","REMOVE_DISCRIPTION":"Click to remove","TAG_TOOLTIP":"Filter by tag \'${0}\'","SEARCH_FILES_COMMUNITY_FILES":"Community Files","COUNT2":"Showing ${0}-${1}","SORTING_ASC_LONG":"Click to sort by ascending order according to ${0}","EMPTY":{"SEARCH_FILES":{"FILTERED_TAGS":"No search results found because no files match the selected tags.","NORMAL":"There are no files that match your search.","FILTERED":"There are no files that match your keyword and filters."},"COMMUNITY_FILES":{"FILTERED_TAGS":"There are no community files match your keyword with the tags you selected.","FILTERED":"There are no community files that match your keyword and filters.","NORMAL":"There are no community files. "},"DEFAULT":"There are no files from this person","MY_COLLECTIONS":{"FILTERED":"You have no folders that match your filters.","NORMAL":"You have not created any folders."},"MEDIA":{"FILTERED_TAGS":"There are no files from this person that have the tags you selected.","FILTERED":"There are no files from this person that match your filters.","NORMAL":"There are no files from this person."},"SHARED_BY_ME":{"FILTERED_TAGS":"None of the files you have shared have the tags you selected.","NORMAL":"There are no files shared by you.","FILTERED":"There are no files shared by you that match your filters."},"SYNCABLE_FILES":{"FILTERED_TAGS":"You have no synchronizable files with the selected tags.","NORMAL":"You have not synchronized any files yet.","FILTERED":"You have no synchronizable files matching these filters."},"PUBLIC_MEDIA":{"FILTERED_TAGS":"There are no files with the tags you selected.","FILTERED":"There are no files that match your filters.","NORMAL":"There are no files that are shared with your organization."},"DELETED_FILES":{"FILTERED":"There are no deleted files from this person that match your filters.","NORMAL":"There are no deleted files from this person."},"MY_MEDIA":{"FILTERED_TAGS":"You have no files matching the tags you selected.","NORMAL":"You have not uploaded any files.","FILTERED":"You have no files that match these filters."},"FAVORITE_COLLECTIONS":{"FILTERED":"There are no pinned folders that match your filters.","NORMAL":"Keep your frequently-used folders readily available by pinning them to this list. You can add any file to this list by clicking the pin icon ${icon}. ","SHORT":"Add frequently-used folders here by clicking the pin icon ${icon}."},"COLLECTIONS_PUBLIC":{"FILTERED":"There are no folders visible to everyone in your organization that match your filters.","NORMAL":"There are no folders visible to everyone in your organization."},"FAVORITE_FILES":{"FILTERED_TAGS":"You have no pinned files with the selected tags.","NORMAL":"Keep the files you are working on readily available by pinning them to this list.  You can add any file to this list by clicking the pin icon ${icon}.","FILTERED":"You have no pinned files matching these filters."},"COLLECTIONS":{"FILTERED":"There are no folders shared with you that match your filters.","NORMAL":"There are no folders shared with you."},"ALL_COLLECTIONS":{"NORMAL":"There are no folders.","FILTERED":"There are no folders that match your filters."},"SHARED_WITH_ME":{"FILTERED_TAGS":"None of the files shared with you have the tags you selected.","NORMAL":"There are no files shared with you.","FILTERED":"There are no files shared with you that match your filters."},"COLLECTION_CONTRIBUTOR":{"NORMAL":"To add a file to this folder,click \'Add Files\' or  open a file and click \'Add to Folders\'.","FILTERED":"There are no files in this folder that match your filters."},"COLLECTION":{"NORMAL":"There are no files in this folder.","FILTERED":"There are no files in this folder that match your filters."},"MY_DELETED_FILES":{"NORMAL":"There are no files in your trash.","FILTERED":"There are no files in your trash that match your filters."},"SEARCH_COLLECTIONS":{"NORMAL":"There are no folders that match your search."}},"TAGS_LABEL":"Tags: ","EMPTY_MENU":"No actions","FROM_A_COMMUNITY":"From a Community","REMOVE_FILTER_TOOLTIP":"Remove this filter","COUNT_ALT":"Showing items ${0} through ${1} of ${2}","OF_PAGES":"\xa0 of ${0}.","SECTION_COLLAPSED":"Collapsed section","GLOBAL_ACTIONS":"Global actions","HIDE":"Hide","SHOW_ALT":"Show ${0} items per page","SORTING_DESC_LONG":"Click to sort by descending order according to ${0}","ITEMS_PER_PAGE":" items per page","DOWNLOAD_ALT":"Download","VIEW_SELECTION":"Display:","MORE":"More","ERROR_MENU":"An error has occurred","PAGING_TOP_LABEL":"Paging","BOOLEAN_NO":"No","SEARCH_FOR_USER":{"MSG1":"Use the search box at the top of the page to search for a person and view their files. You can also log in to view your own files.     ","FILES":"Use the search box at the top of the page to search for a person and view their files. You can also log in to view your own files."},"OTHER_PEOPLE_FILE":"Other people who have shared this file","NO_DESCRIPTION":"No description provided","ONE_DOWNLOAD":"1","SHARE_TOOLTIP":"Allow others to read or edit this file","PRIVATE":"Private","SHARED":{"BASE":"Shared","MANY_1":"Shared with ${0}","ONE":"${0}","ONE_1":"Shared with 1","COMMUNITY":{"BASE":"Shared with anyone who can see this community","ALT":"Community"},"MANY":"${0}"},"SHARE_MESSAGE":{"LIST_SEP":",\xa0"},"PUBLIC":{"MANY_1":"shared with ${0}","BASE":"Visible to everyone in ${company}","WITH":{"MANY_1":"shared with ${0}","ONE":"Organization access and ${0}","ONE_1":"shared with 1","MANY":"Organization access and ${0}"},"ONE":"Organization access and ${0}","ONE_1":"shared with 1","MANY":"Organization access and ${0}"},"DOWNLOAD_TOOLTIP_ONE_COMMENT_COUNT_ONE":"${0} download, ${0} comment","FOLDER":{"ICON_TOOLTIP":{"PRIVATE":"A Private Folder","COMMUNITY":"A Community Folder","PUBLIC":"A Public Folder","SHARE":"A Shared Folder"}},"USER_HAS_NO_FILES":"There are no files from this person","NOT_LOGGED_IN":{"ACT_IN":"Log In","TITLE":"Log In Now","MESSAGES":"This feature can not be accessed until you are logged in."},"VIEW_SELECTION_CUSTOMIZE":"Customize","USER_NEVER_LOGGED_IN":{"MSG1":"${0} has never logged in to Files.","MSG2":"If you know people who haven\'t started using Files, it\'s easy to get them interested.  Just share a file with them!  They\'ll receive an email letting them know about your file and how to log in."},"DOWNLOAD_TOOLTIP_MANY_COMMENT_COUNT_MANY":"${0} downloads, ${0} comments","PLACE_NOT_FOUND":{"TITLE":"We can\'t find that person","MESSAGES":"The files for this person could not be loaded - click the back button and try again.  If this doesn\'t work the person may no longer be available."},"FILTERED_BY":"Matching: ","DOWNLOAD":"Download","CONTEXT_TITLE":"All actions for this file","DOWNLOAD_TOOLTIP_MANY_COMMENT_COUNT_ONE":"${0} downloads, ${0} comment","SORTING_DESC":"Click to sort by descending order","JUMP_TO_PAGE_ALT":"Jump to a page between ${0} and ${1}","EDIT_PAGE_ERROR":"The file could not be edited due to an error.","PAGE":"Page","MORE_LOAD":"Loading","DOWNLOAD_TOOLTIP_MANY":"${0} views","PAGING_BOTTOM_LABEL":"Paging options","PUBLIC_CAPPED":"Only the first ${0} files that is shared with everyone in your organization are shown here.  Filter or change your sort order to see other files.","REPLACE":"Replace","SORT_BY":"Sort by: ","SEARCH_FILES_ALL_FILES":"All Files","SHARED_FROM_FILES":"Shared from Files","RECOMMEND":"Like","NOHYPHENCOUNT":"${0} of ${1}","YOU_HAVE_NO_PLACE":{"MSG1":"You have not been given permission to upload or create files.  You may still view other people\'s files and collaborate on their files.     ","MSG2":"Administrators determine who is allowed to upload files.  Please contact your administrator if you should have this ability.     "},"SHOWING":"Showing ","VIEW":"View","DOWNLOAD_TOOLTIP_ONE":"${0} view","SHARE_PAGE_TOOLTIP":"Allow others to read or edit this file","HIDE_EXTRA":"Hide extra information","SEARCH_FILES_PERSONAL_FILES":"Personal Files","REMOVE_ITEM_ALT":"Remove ${0}","TAGGED_WITH":"Tagged with \'${0}\' ","DOWNLOAD_TOOLTIP_ONE_COMMENT_COUNT_MANY":"${0} download, ${0} comments","USER_HAS_NO_PAGES":"There are no files from this person","JUMP_TO_PAGE":"Jump to page \xa0","ERROR_REQUEST_CANCELLED":"The request was cancelled.","DOWNLOADS":"${0}","ELLIPSIS":"...","CONTEXT_TITLE_FILE":"Actions for the file ${0}","VIEW_EXTRA":"View more information","CONTEXT_ALT":"Actions","PAGE_ALT":"Page ${0} of ${1}","SEARCH_FILES_SHOW":"Filter by: ","REMOVE_FILTER_ALT":"Remove","REVERT":"Restore","ERROR":"An unknown error has occurred.","LOCKED_BY_YOU":"Locked by you","ERROR_REQUEST_UNAUTHENTICATED":"You must log in again.","COUNT":"${0}-${1} of ${2}","SHARE_INTENT_T":"Shared externally","NEXT":"Next","SECTION_EXPANDED":"Expanded section","MORE_ACTIONS":"More Actions","SORTING_ASC":"Click to sort by ascending order","PREVIOUS":"Previous","SHOW":"Show ","USERERROR":"The person you have requested is no longer available or has been removed from the directory."},"REMOVE_FROM_HIDDEN_COLLECTIONS":{"ACTION":"Remove","ACTION_TOOLTIP":"Remove from folders and communities that you do not have permission to see"},"REMOVE_COLLECTION_MEMBER":{"DIALOG_TITLE":"Stop Sharing","ACTION_TOOLTIP_COMMUNITY":"Remove this community from the folder","QUESTION":"Are you sure you want to stop sharing the folder with this person?\n\n${0}","GROUP_QUESTION":"Are you sure you want to stop sharing the folder with this group?\n\n${0}","ERROR":"The folder could not be updated due to an error.","COMMUNITY_INFO_SUCCESS":"The folder is no longer shared with the community ${0}.","ERROR_TIMEOUT":"The folder was not updated because the server could not be contacted.  Click \'OK\' to try again.","NAME":"Remove","ERROR_CANCEL":"The folder was not updated because the request was cancelled.  Click \'OK\' to try again.","GROUP_INFO_SUCCESS":"The folder is no longer shared with the group ${0}.","INFO_SUCCESS":"The folder is no longer shared with ${0}.","ACTION":"Remove","BUSY":"Removing...","CANCEL":"Cancel","ACTION_TOOLTIP_GROUP":"Remove this group from the folder","ACTION_TOOLTIP":"Remove this person from the folder","COMMUNITY_QUESTION":"Are you sure you want to stop sharing the folder with this community?\n\n${0}","OK":"OK","ERROR_ACCESS_DENIED":"You do not have permission to remove this person from the folder.","ERROR_NOT_FOUND":"This folder has already been deleted or is no longer shared with you.","ERROR_NOT_LOGGED_IN":"The folder was not updated because you were not logged in.  Click \'OK\' to try again."},"SUBSCRIBE_TO_PAGE_TOOLTIP":"Follow changes to this page through your feed reader","APP_LOAD":"Welcome to Files","SHARE_TO_COMMUNITY_FOLDER":{"DIALOG_TITLE":"Share Folder with this Community","ACTION":"Share Folder with Community...","ACTION_TOOLTIP":"See folders Community have shared with you ","OK":"Share Folders"},"MOVE_FILES":{"RESHARE_NOT_ALLOWED_FOLDERS_1":"Folder ${item} was not moved to ${target}, because the owner does not allow others to share it.","DIALOG_TITLE":"Move to...","INFO_SUCCESS_FILES_X_FOLDERS_X":"${succeedfilescount} files and ${succeedfolderscount} folders were successfully moved to ${target}.","TOP_LEVEL_DENIED_FOLDER_X":"${count} folders were not moved, because only folder owner can move the top level folders.","NOT_FOUND_FILES_X":"${count} files were not moved to ${target}, because they do not exist anymore.","NOT_FOUND_IN_SOURCE_PARENT_FILES_1":"File ${item} was not moved to ${target}, because it does not exist in the source folder anymore.","PRIVATE_NOT_ALLOWED_IN_PUBLIC_COLLECTION_FILES_X":"${count} files were not moved to ${target}, because they are not visible to everyone in your organization. ","EXIST_AT_TARGET_FOLDERS_1":"Folder ${item} was not moved to ${target}, because there exists already a folder with the same name in the new location.","NOT_FOUND_ITEMS_X":"${count} items were not moved to ${target}, because they do not exist anymore.","ACCESS_DENIED_FOLDER_X":"${count} folders were not moved, because you do not have permission to move them into ${target}.","INFO_SUCCESS_X_FOLDERS":"${succeedfolderscount} folders were successfully moved to ${target}.","PRIVATE_NOT_ALLOWED_IN_PUBLIC_COLLECTION_ITEMS_X":"${count} items were not moved to ${target}, because they are not visible to everyone in your organization. ","NOT_FOUND_FOLDERS_X":"${count} folders were not moved to ${target}, because they do not exist anymore.","INTERNAL_EXTRENAL_RESTRICTION_ITEM_X":"${count} items were not moved to ${target}, because you can not move internal files and folders into a folder that can be shared outside of your organization.","COMMUNITY_TO_PERSONAL_FILES_1":"File ${item} was not moved to ${target}, because you can not move a community owned file into a personal folder.","ACTION_ENABLED":"Move to button is enabled","INFO_SUCCESS_FILES_1_FOLDERS_X":"${succeedfilescount} file and ${succeedfolderscount} folders were successfully moved to ${target}.","TARGET_PARENT_NOT_FOUND_FILES_X":"${count} files were not moved to ${target}, because ${target} does not exist anymore.","SOURCE_PARENT_NOT_FOUND_FOLDERS_X":"${count} folders were not moved to ${target}, because the folder that contains these folders does not exist anymore.","INVALID_TARGET_FOLDER_1":"Folder ${item} was not moved, because you cannot move it into its subfolder.","COMMUNITY_TO_PERSONAL_FOLDERS_1":"Folder ${item} was not moved to ${target}, because you can not move a community owned folder into a personal folder.","RESHARE_NOT_ALLOWED_FOLDERS_X":"${count} folders were not moved to ${target}, because the owner does not allow others to share them.","TARGET_PARENT_NOT_FOUND_ITEMS_X":"${count} items were not moved to ${target}, because ${target} does not exist anymore.","INFO":"Moving these files and folders will cause other people to lose access to the files and folders.","PERSONAL_TO_COMMUNITY_FILES_1":"File ${item} was not moved to ${target}, because you can not move a personal owned file into a community folder.","NOT_FOUND_IN_SOURCE_PARENT_FILES_X":"${count} files were not moved to ${target}, because they do not exist in the source folder anymore.","SOURCE_PARENT_NOT_FOUND_FILES_1":"File ${item} was not moved to ${target}, because the folder that contains this file does not exist anymore.","PRIVATE_NOT_ALLOWED_IN_PUBLIC_COLLECTION_FOLDERS_1":"Folder ${item} was not moved to ${target}, because they are not visible to everyone in your organization. ","RESHARE_NOT_ALLOWED_FILES_1":"File ${item} was not moved to ${target}, because the owner does not allow others to share it.","EXIST_AT_TARGET_FOLDERS_X":"${count} folders were not moved to ${target}, because there exist already folders with the same names in the new location.","ACCESS_DENIED_ITEM_X":"${count} items were not moved, because you do not have permission to move them into ${target}.","ACTION":"Move to","ACCESS_DENIED_FILE_1":"File ${item} was not moved, because you do not have permission to move it into ${target}.","NOT_FOUND_IN_SOURCE_PARENT_ITEMS_X":"${count} items were not moved to ${target}, because they do not exist in the source folder anymore.","PERSONAL_TO_COMMUNITY_FOLDERS_1":"Folder ${item} was not moved to ${target}, because you can not move a personal owned folder into a community folder.","INTERNAL_EXTRENAL_RESTRICTION_FILES_1":"File ${item} was not moved to ${target}, because you can not move an internal file into a folder that can be shared outside of your organization.","EXIST_AT_TARGET_FILES_1":"File ${item} was not moved to ${target}, because there exists already a file with the same name in the new location.","COMMUNITY_TO_PERSONAL_FILES_X":"${count} files were not moved to ${target}, because you can not move a community owned file into a personal folder.","INFO_SUCCESS_X_FILES":"${succeedfilescount} files were successfully moved to ${target}.","TARGET_PARENT_NOT_FOUND_FOLDERS_1":"Folder ${item} was not moved to ${target}, because ${target} does not exist anymore.","COMMUNITY_TO_PERSONAL_ITEMS_X":"${count} items were not moved to ${target}, because you can not move community owned files and folders into a personal folder.","INTERNAL_EXTRENAL_RESTRICTION_FOLDER_1":"Folder ${item} was not moved to ${target}, because you can not move an internal folder into a folder that can be shared outside of your organization.","INVALID_TARGET_FOLDER_X":"${count} folders were not moved, because you cannot move them into their own subfolder.","COMMUNITY_TO_PERSONAL_FOLDERS_X":"${count} folders were not moved to ${target}, because you can not move community owned folders into a personal folder.","PERSONAL_TO_COMMUNITY_FILES_X":"${count} files were not moved to ${target}, because you can not move a personal owned file into a community folder.","NOT_FOUND_IN_SOURCE_PARENT_FOLDERS_1":"Folder ${item} was not moved to ${target}, because it does not exist in the source folder anymore.","SOURCE_PARENT_NOT_FOUND_FILES_X":"${count} files were not moved to ${target}, because the folder that contains these files does not exist anymore.","PRIVATE_NOT_ALLOWED_IN_PUBLIC_COLLECTION_FOLDERS_X":"${count} folders were not moved to ${target}, because they are not visible to everyone in your organization. ","RESHARE_NOT_ALLOWED_FILES_X":"${count} files were not moved to ${target}, because the owner does not allow others to share them.","ACTION_TOOLTIP":"Move these files and folders","INFO_SUCCESS_FILES_X_FOLDERS_1":"${succeedfilescount} files and ${succeedfolderscount} folder were successfully moved to ${target}.","OK":"Move","INFO_SUCCESS_1_FILES":"File ${succeeditem} was successfully moved to ${target}.","ACCESS_DENIED_FILE_X":"${count} files were not moved, because you do not have permission to move them into ${target}.","PERSONAL_TO_COMMUNITY_ITEMS_X":"${count} items were not moved to ${target}, because you can not move personal owned files and folders into a community folder.","TOP_LEVEL_DENIED_FOLDER_1":"Folder ${item} was not moved, because only folder owner can move the top level folder.","SOURCE_PARENT_NOT_FOUND_ITEMS_X":"${count} items were not moved to ${target}, because the folder that contains these items does not exist anymore.","NOT_FOUND_FILES_1":"File ${item} was not moved to ${target}, because it does not exist anymore.","PRIVATE_NOT_ALLOWED_IN_PUBLIC_COLLECTION_FILES_1":"File ${item} was not moved to ${target}, because they are not visible to everyone in your organization. ","PERSONAL_TO_COMMUNITY_FOLDERS_X":"${count} folders were not moved to ${target}, because you can not move personal owned folders into a community folder.","RESHARE_NOT_ALLOWED_ITEMS_X":"${count} items were not moved to ${target}, because the owner does not allow others to share them.","INTERNAL_EXTRENAL_RESTRICTION_FILES_X":"${count} files were not moved to ${target}, because you can not move internal files into a folder that can be shared outside of your organization.","ACTION_DISABLED":"Move to button is disabled","ACTION_LONG":"Move to...","EXIST_AT_TARGET_FILES_X":"${count} files were not moved to ${target}, because there exist already files with the same names in the new location.","ERROR":"These files and folders were not moved to ${target} due to an error.","ACCESS_DENIED_FOLDER_1":"Folder ${item} was not moved, because you do not have permission to move it into ${target}.","INFO_SUCCESS_1_FOLDERS":"Folder ${succeeditem} was successfully moved to ${target}.","TARGET_PARENT_NOT_FOUND_FOLDERS_X":"${count} folders were not moved to ${target}, because ${target} does not exist anymore.","NOT_FOUND_FOLDERS_1":"Folder ${item} was not moved to ${target}, because it does not exist anymore.","EXIST_AT_TARGET_ITEMS_X":"${count} items were not moved to ${target}, because there exist already items with the same names in the new location.","INTERNAL_EXTRENAL_RESTRICTION_FOLDER_X":"${count} folders were not moved to ${target}, because you can not move internal folders into a folder that can be shared outside of your organization.","INFO_SUCCESS_FILES_1_FOLDERS_1":"${succeedfilescount} file and ${succeedfolderscount} folder were successfully moved to ${target}.","TARGET_PARENT_NOT_FOUND_FILES_1":"File ${item} was not moved to ${target}, because ${target} does not exist anymore.","BUSY":"Moving...","CANCEL":"Cancel","OK_MOVE_HERE":"Move Here","WARNING":"${item} is in the ${collection} folder. Some people will lose access to this file if you remove it.","NOT_FOUND_IN_SOURCE_PARENT_FOLDERS_X":"${count} folders were not moved to ${target}, because they do not exist in the source folder anymore.","SOURCE_PARENT_NOT_FOUND_FOLDERS_1":"Folder ${item} was not moved to ${target}, because the folder that contains this folder does not exist anymore."},"DISMISS":"Hide this message","UPLOAD_PREVIEW":{"DIALOG_TITLE":"Upload Video Thumbnail","SUCCESS":"Change Thumbnail Preview Success","REPLACE_LABEL":"Image File:","REQUIRED_MARK":"* Required","REPLACE_CONFIRM":"Select a file with one of the following supported extensions:","ACTION":"Change Thumbnail","BUSY":"Saving...","ACTION_TOOLTIP":"Change Thumbnail Preview file","REQUIRED_FIELD":"Required field","CANCEL":"Cancel","ERROR_UNKNOW":"Unknow ERROR.","OK":"Upload","SELECT_FILE":"Please select a file to upload","ERROR_ACCESS_DENIED":"You cannot upload new versions. Either this file was locked or the owner removed your editor access.","ERROR_NOT_FOUND":"The file could not be edited because it has been deleted or is no longer shared with you."},"FLAG_COMMENT":{"ACTION":"Flag as Inappropriate","ACTION_TOOLTIP":"Flag this comment as inappropriate"},"MAKE_COLLECTION_INTERNAL":{"DIALOG_TITLE":"Make Internal?","SUCCESS":"This folder can no longer be shared with people outside of your organization.","QUESTION":"Making this folder internal will mean it can no longer be shared with people outside of your organization.\n\nAny shares with external people or communities will be removed.\n\nMaking a folder internal is permanent and cannot be undone.","ERROR":"The folder could not be changed. Please try again later.","ERROR_TIMEOUT":"The folder could not be changed because the server could not be contacted. Please try again.","QUESTION_E":"Making this folder internal will mean it can no longer be shared with people outside of your organization.\n\nAny shares with external people will be removed.\n\nMaking a folder internal is permanent and cannot be undone.","ERROR_CANCEL":"The folder could not be changed because the request was cancelled. Please try again.","ACTION":"Change","BUSY":"Saving...","CANCEL":"Cancel","ACTION_TOOLTIP":"Stop allowing this folder to be shared outside of your organization","ERROR_SHARED_EXTERNALLY":"The folder could not be changed because it is currently shared externally. Remove external shares and try again.","OK":"Make Internal","ERROR_NOT_LOGGED_IN":"The folder could not be changed because you were not logged in. Please log in and try again."},"INFO_COLON":"Info:","FLAG_FILE":{"ACTION":"Flag as Inappropriate","ACTION_TOOLTIP":"Flag this file as inappropriate"},"PIVOTS":{"SEARCH_FILES":"Search Results","MY_COLLECTIONS_COL":"Collapse your recent folders","SYNCABLE_FILES_DESC":"Files that are marked for synchronization to one of your computers or mobile devices. If you have not already, download the  ${0}IBM Connections Plug-ins${1} to start synchronizing these files.","COMMUNITY_FILES_TOOLTIP":"See community files","COLLECTIONS_LONG":"Folders Shared With Me ","MY_COLLECTIONS_TOOLTIP":"See your folders ","SEARCH_FILES_WINDOWTITLE":"Search Results from All Files","SHARED_BY_ME_DESC":"Files that you have shared with other people.","MY_MEDIA_LONG":"My Files ","SYNCABLE_FILES":"Sync","SYNCABLE_FILES_WELCOME":"Welcome to Sync","DELETED_FILES":"Trash","ANON_MEDIA":"Files","PUBLIC_MEDIA_TOOLTIP":"See ${company} files","MY_MEDIA_TOOLTIP":"See your files","SYNCABLE_FILES_WINDOWTITLE":"Sync","COLLECTIONS_COL":"Collapse recent shared folders","MEDIA_LONG":"${possessive}\'s Files","COLLECTIONS_PUBLIC_TOOLTIP":"See ${company} folders ","FAVORITE_FILES_TOOLTIP":"See files you pinned ","COLLECTIONS_TOOLTIP":"See folders people have shared with you ","DELETED_FILES_WINDOWTITLE":"Trash","COMMUNITY_FILES_LONG":"Community Files","ANON_MEDIA_WINDOWTITLE":"${possessive}\'s Files","COLLECTIONS_DESC":"Folders that people have shared with you.","COLLECTION":"${0}","MY_MEDIA_DESC":"Files that you own.","MY_COLLECTIONS_EXP":"Expand your recent folders","SEARCH_FILES_TOOLTIP":"See search results","SYNCABLE_FILES_BUTTON":"Add Files","SHARED_BY_ME":"Shared By Me","MEDIA_DESC":"Files owned by this person that are visible to everyone in ${company} or shared with you.","PUBLIC_MEDIA_LONG":"${company} Files","COMMUNITY_FILES_DESC":"Files in communities that you are a member of.","SHARED_BY_ME_WINDOWTITLE":"Files Shared By Me","MEDIA_LONG_X":"${possessive}\' Files","SYNCABLE_FILES_TOOLTIP":"See files that can be synchronized","COLLECTIONS_EXP":"Expand recent shared folders","DELETED_FILES_TOOLTIP":"See files that have been deleted","ANON_MEDIA_TOOLTIP":"See this person\'s files","MY_COLLECTIONS_LONG":"My Folders ","COMMUNITY_FILES_DESC_ANONYMOUS":"All public community files. ","MY_DELETED_FILES":"Trash","SEARCH_FILES_WINDOWTITLE_NO_KEYWORD":"Search Results for all the files shared with you","PUBLIC_MEDIA_DESC":"Files owned by individuals that everyone in ${company} can see. ","COLLECTION_TOOLTIP":"${visibility} | ${updated} | ${files}","SYNCABLE_FILES_WELCOME_1":"Connections Sync allows you to view and edit all of your files from your desktop. All your edits are automatically synchronized so your collaborators always have access to the latest. If you haven\'t already, install Sync now!","ANON_MEDIA_LONG_X":"${possessive}\' Files","SYNCABLE_FILES_WELCOME_2":"Get Sync","MEDIA":"Files","SYNCABLE_FILES_WELCOME_3":"Already have sync?","MY_DELETED_FILES_WINDOWTITLE":"Trash","COLLECTIONS_PUBLIC_LONG":"${company} Folders ","SHARED_BY_ME_TOOLTIP":"See files you shared with people ","MEDIA_WINDOWTITLE":"${possessive}\'s Files","SYNCABLE_FILES_DESC_DISABLE_LINK":"Files available in your desktop Sync folder.","MY_COLLECTIONS_DESC":"Folders that you have created.","FAVORITE_COLLECTIONS":{"COL":"Collapse pinned folders","TT":"See folders you pinned ","LESS_ALT":"Show fewer folders","D":"Add folders to this list by clicking the pin icon next to a folder.","T":"Pinned Folders","TOGGLE":"Change how many of the most recent folders are shown","MORE":"More...","LESS":"Less...","L":"Pinned Folders ","EXP":"Expand pinned folders","WT":"Pinned Folders","MORE_ALT":"Show more folders"},"SHARED_WITH_ME":"Shared With Me","SEARCH_FILES_LONG":"All Files","COLLECTIONS_PUBLIC_DESC":"Folders that everyone in ${company} can see.","MY_DELETED_FILES_LONG":"Trash (${size})","SHARED_WITH_ME_WINDOWTITLE":"Files Shared With Me","COMMUNITY_FILES":"Community Files","MY_COLLECTIONS":"My Folders","MY_DELETED_FILES_TOOLTIP":"See deleted files","SHARED_WITH_ME_LONG":"Files Shared With Me ","MEDIA_WINDOWTITLE_X":"${possessive}\' Files","FAVORITE_FILES_LONG":"Pinned Files ","MEDIA_TOOLTIP":"View this person\'s files","ANON_MEDIA_LONG":"${possessive}\'s Files","COMMUNITY_FILES_WINDOWTITLE":"Community Files","DELETED_FILES_LONG":"Trash for ${name} (${size})","MY_COLLECTIONS_WINDOWTITLE":"My Folders","SYNCABLE_FILES_LONG":"Sync","PUBLIC_MEDIA":"${company} Files","SEARCH_FILES_DESC":"Files matching \'${0}\'","MY_MEDIA":"My Files","MY_DELETED_FILES_DESC":"Only you can see files in your trash. Click the arrow next to a file to restore or permanently delete the file.","ANON_MEDIA_WINDOWTITLE_X":"${possessive}\' Files","COLLECTIONS_PUBLIC":"${company} Folders","FAVORITE_FILES":"Pinned Files","SHARED_BY_ME_LONG":"Files Shared By Me ","COLLECTIONS":"Folders Shared With Me","PUBLIC_MEDIA_WINDOWTITLE":"${company} Files","SHARED_WITH_ME_DESC":"Files that other people have shared with you.","SEARCH_FILES_DESC_NO_KEYWORD":"Files shared with you","MY_MEDIA_WINDOWTITLE":"My Files","SHARED_WITH_ME_TOOLTIP":"See files people have shared with you","COLLECTIONS_PUBLIC_WINDOWTITLE":"${company} Folders","FAVORITE_FILES_DESC":"Add files to this list by clicking the pin icon next to a file.","FAVORITE_FILES_WINDOWTITLE":"Pinned Files","COLLECTIONS_WINDOWTITLE":"Folders Shared With Me","DELETED_FILES_DESC":"Only you can see files in your trash. Click the arrow next to a file to restore or permanently delete the file.","ANON_MEDIA_DESC":"All files visible to everyone in ${company} owned by this person."},"SORTS":{"MOSTRECENT_TOOLTIP":"Sort from most recently updated to least recently updated","AGE_TOOLTIP":"Sort from oldest to newest","ADDED_TOOLTIP":"Sort from most recently added to least recently added","MOSTRECENT_TOOLTIP_REVERSE":"Sort from least recently updated to most recently updated","AGE_TOOLTIP_REVERSE":"Sort from newest to oldest","ADDED_TOOLTIP_REVERSE":"Sort from least recently added to most recently added","MOSTDOWNLOADED_TOOLTIP":"Sort from most downloaded to least downloaded","FILE_COUNT_TOOLTIP":"Sort from folders with the most files to the least files","MOSTDOWNLOADED_TOOLTIP_REVERSE":"Sort from least downloaded to most downloaded","FILE_COUNT_TOOLTIP_REVERSE":"Sort from folders with the least files to the most files","HIGHESTRECOMMENDED_TOOLTIP":"Sort from most liked to least liked","TITLE_TOOLTIP":"Sort by name in alphabetical order","SHARED_ON_TOOLTIP":"Sort from most recently shared to least recently shared","HIGHESTRECOMMENDED_TOOLTIP_REVERSE":"Sort from least liked to most liked","MOSTRECENT":"Updated","MOSTRECENT_SHARE":"Shared","MOSTCOMMENTED_TOOLTIP":"Sort from most commented to least commented","AGE":"Most Recently Added","TITLE_TOOLTIP_REVERSE":"Sort by name in reverse alphabetical order","SHARED_ON_TOOLTIP_REVERSE":"Sort from least recently shared to most recently shared","ADDED":"Added","MOSTCOMMENTED_TOOLTIP_REVERSE":"Sort from least commented to most commented","SIZE_TOOLTIP":"Sort by size from largest to smallest","SIZE_TOOLTIP_REVERSE":"Sort by size from smallest to largest","MOSTDOWNLOADED":"Downloads","HIGHESTRECOMMENDED":"Likes","TITLE":"Name","MOSTCOMMENTED":"Comments"},"COLLECTIONS":{"JUMP_TO_PAGE":"Jump to page \xa0","HIDE":"Hide","ERROR_REQUEST_UNKNOWN":"An unknown error has occurred.","FOLDERS_LABEL_MANY":"${0} subfolders","FOLDERS_LABEL_1_FILES_LABEL_MANY":"1 subfolder, ${0} files","SHOW_ALT":"Show ${0} items per page","NEXT_T":"Next page","ERROR_REQUEST_CANCELLED":"The request was cancelled.","FOLDERS_LABEL_1_FILES_LABEL_1":"1 subfolder, 1 file","PREVIOUS_T":"Previous page","JUMP_TO_PAGE_ALT":"Jump to a page between ${0} and ${1}","PAGE":"Page","MORE_LOAD":"Loading","ITEMS_PER_PAGE":" items per page","ELLIPSIS":"...","FILES_LABEL_MANY":"${0} files","PAGING_BOTTOM_LABEL":"Paging options","MORE":"More","VIEW_EXTRA":"View more information","PAGING_TOP_LABEL":"Paging","SORT_BY":"Sort by:","PAGE_ALT":"Page ${0} of ${1}","ERROR_REQUEST_TIMEOUT":"The server could not be contacted.","SHARE_INTENT":"Shared externally","LOADING":"Loading folders...","NOHYPHENCOUNT":"${0} of ${1}","FILES_LABEL_0":"No files","FILES_LABEL_1":"1 file","FOLDERS_LABEL_MANY_FILES_LABEL_1":"${0} subfolders, 1 file","LOADING_ONE":"Loading folder...","SEARCH":{"DEFAULT":"Enter a folder name","NAME":"Folders"},"FOLDERS_LABEL_1":"${0} subfolder","FOLDERS_LABEL_MANY_FILES_LABEL_MANY":"${0} subfolders, ${1} files","EMPTY":"There are no folders","ERROR_REQUEST_UNAUTHENTICATED":"You must log in again.","COUNT":"${0}-${1} of ${2}","SHARE_INTENT_T":"Shared externally","HIDE_EXTRA":"Hide extra information","NEXT":"Next","PREVIOUS":"Previous","COUNT_ALT":"Showing folders ${0} through ${1} of ${2}","SHARING":"Sharing","OF_PAGES":"\xa0 of ${0}.","SHOW":"Show"},"FEEDS":{"SEARCH_FILES":{"T":"Follow changes to these files through your feed reader","L":"Feed for these Files"},"PUBLIC_FILES":{"T":"Follow changes to files visible to everyone in ${company} through your feed reader","L":"Feed for ${company} public files"},"FAVORITE_FILES":{"T":"Follow changes to your pinned files through your feed reader","L":"Feed for Pinned Files"},"COLLECTIONS":{"T":"Follow changes to these folders through your feed reader","L":"Feed for these Folders"},"FILES":{"T":"Follow changes to these files through your feed reader","L":"Feed for these Files"},"SEARCH_FILES_NO_KEYWORD":{"L":"Feed for All Visible Files"},"UPDATES":{"T":"Follow changes to Files through your feed reader","L":"Feed for these Updates"},"FILE":{"T":"Follow changes to this file through your feed reader","L":"Feed for this File"},"SHARED_FILES":{"T":"Follow changes to shared files through your feed reader","L":"Feed for Shared Files"},"SYNCABLE_FILES":{"T":"Follow changes to your synchronizable files through your feed reader","L":"Feed for Sync"},"COLLECTION":{"T":"Follow changes to this folder through your feed reader","L":"Feed for this Folder"}},"TOGGLE_SYNC_FILE":{"ERROR":"The file could not be updated. Please try again later.","ERROR_TIMEOUT":"The file could not be updated because the server could not be contacted. Please try again.","ACTION_REMOVE":"Remove from Sync","UNAVAILABLE":"Information about Sync could not be retrieved. Please refresh the page to try again.","ERROR_CANCEL":"The file could not be updated because the request was cancelled. Please try again.","ERROR_EXISTS":"The file cannot be added to Sync because an existing file already uses the same name. ","ACTION_ADD":"Add to Sync","STOP_SYNC":{"INFO_SUCCESS":"${link} was removed from Sync."},"ACTION_TOOLTIP":"Decide whether or not make this file synchronizable.","SYNC":{"INFO_SUCCESS":"${link} was added to Sync."},"ACTION_ERROR":"Error","ERROR_NOT_LOGGED_IN":"The file could not be updated because you were not logged in. Please log in and try again.","ERROR_NOT_FOUND":"The file could not be updated because it has been deleted or is no longer shared with you."},"CREATE_ITEM":{"ACTION":"New","ACTION_TOOLTIP":"Create a new item"},"SESSION_TIMEOUT":"Your SmartCloud session has timed out. Click OK to log back in or Cancel to close this dialog.","CANCEL":"Cancel","TAGGER":{"CREATEERROR_ACCESS_DENIED":"The tag could not be created because you do not have permission to edit this file.","CREATEERROR_NOT_FOUND":"The tag could not be created because the file has been deleted or is no longer visible.","WARN_LONG_TAGS":"The specified tags are too long.","LOADERROR_TIMEOUT":"The tags could not be loaded: request timed out.","REMOVE":"Remove tag","ERROR_LOADING":"An error has occured loading the tags.","SEPARATOR":",","WARN_LONG_TAG":"The tag \'${0}\' is too long.","INVALID_CHAR_WARN_LONG":"One or more tags you have entered contain invalid characters: ${0}","TRIM_TAGS":"Shorten tags?","LOADERROR_CANCEL":"The tags could not be loaded: request cancelled.","ADD_TAGS":"Add Tags","NO_RESULTS":"No results for \'${0}\'","ADD_REMOVE_TAGS_TOOLTIP":"Add or remove tags on this file","NOTAGS":"No tags","REMOVECONFIRM":"Are you sure you want to remove the tag \'${0}\'?","OK":"Save","LOADING":"Loading tags...","TRIM_TAG":"Shorten tag?","CANCEL_TOOLTIP":"Cancel tag editing","REMOVEERROR":"The tag could not be removed.","ADD_TAGS_LONG":"Add Tags...","REMOVEERROR_TIMEOUT":"The tag could not be removed because the server could not be contacted.  Click \'X\' to try again.","INVALID_CHAR_WARN":"!","LOADERROR_NOTFOUND":"The tags could not be loaded: file not found.","CREATEERROR":"The tag could not be created.  Please try again later.","CREATEERROR_CANCEL":"The tag could not be created because the request was cancelled.  Click \'Save\' to try again.","CREATEERROR_TIMEOUT":"The tag could not be created because the server could not be contacted.  Click \'Save\' to try again.","REMOVEERROR_CANCEL":"The tag could not be removed because the request was cancelled.  Click \'X\' to try again.","ADD_REMOVE_TAGS":"Add or Remove Tags","NONE":"None","CANCEL":"Cancel","REMOVEERROR_NOT_FOUND":"The tag could not be removed because the file has been deleted or is no longer visible.","ADD_TAGS_TOOLTIP":"Add tags to this file","REMOVEERROR_ACCESS_DENIED":"The tag could not be removed because you do not have permission to edit this file."},"BACK_TO_PAGE":"Back to Page","WARNING":"Warning","FILE":{"EXPAND_ERROR":{"TIMEOUT":"The details of this file could not be loaded because the server could not be contacted.","NOT_FOUND":"The details of this file could not be loaded because file has been deleted or is no longer visible.","GENERIC":"An error prevented the details of this file from being displayed.  Please try again later.","CANCEL":"The details of this file could not be loaded because the request was cancelled."}},"WARNING_ACCESS_TITLE":"Access Denied","DELETE_MY_SHARE":{"DIALOG_TITLE":"Remove My Share","QUESTION":"Are you sure you want to remove your share with ${0}?","ERROR":"The file was not updated due to an error.","INFO_DEMOTE_SUCCESS":"Changed ${0} from an editor to a reader on this file.","ERROR_TIMEOUT":"Your share was not removed because the server could not be contacted.  Click \'Remove Share\' to try again.","ERROR_CANCEL":"Your share was not removed because the request was cancelled.  Click \'Remove Share\' to try again.","INFO_SUCCESS":"You have removed your share with ${0}.","QUESTION_DUPLICATE":"Are you sure you want to remove your share with ${0}?\n\nNote: Another person has also shared with ${0}, so ${0} will still be able to access the file.","DEMOTE":"Demote to Reader","ACTION":"Remove my share","BUSY":"Removing share...","ACTION_TOOLTIP":"Remove my share with this person","CANCEL":"Cancel","ACTION_TOOLTIP_PERSON":"Remove my share with ${0}","OK":"Remove Share","ERROR_NOT_FOUND":"Your share was not removed because the file has been deleted or is no longer shared with you.","ERROR_NOT_LOGGED_IN":"Your share was not removed because you were not logged in.  Click \'Remove Share\' to try again."},"ADD_COMMENT":{"ACTION":"Add Comment","ACTION_TOOLTIP":"Add a comment to this file"},"EMPTY_TRASH":{"ACTION":"Empty Trash","ACTION_TOOLTIP":"Permanently delete all files in the trash"},"TOGGLE_FAVORITE_FOLDER":{"A_REMOVE":"Unpin","A_ADD":"Pin","A_REMOVE_SUCCESS":"Pinned folder ${link} was removed successfully. ","A_ADD_SUCCESS":"${link} was pinned successfully.","ERROR":"The folder could not be updated. Please try again later.","ERROR_TIMEOUT":"The folder could not be updated because the server could not be contacted. Please try again.","UNAVAILABLE":"Information about your pinned folders could not be retrieved.  Please refresh the page to try again.","LOADING_T":"Please wait while your pinned folders load","ERROR_CANCEL":"The folder could not be updated because the request was cancelled. Please try again.","A_REMOVE_T":"Remove from your pinned folders","A_ADD_T":"Pin this folder","LOADING":"Loading...","ERROR_NOT_LOGGED_IN":"The folder could not be updated because you were not logged in. Please log in and try again.","ERROR_NOT_FOUND":"The folder could not be updated because it has been deleted or is no longer shared with you."},"TOGGLE_FOLLOWING_FOLDER":{"FOLLOW":{"INFO_SUCCESS":"You are now following this folder: ${0}."},"ERROR_CANCEL":"The folder could not be updated because the request was cancelled. Please try again.","STOP_FOLLOWING":{"INFO_SUCCESS":"You have stopped following this folder: ${0}. "},"ERROR":"The folder could not be updated. Please try again later.","ACTION_ADD":"Follow","ACTION_TOOLTIP":"Toggle whether you will receive updates about this folder","ERROR_TIMEOUT":"The folder could not be updated because the server could not be contacted. Please try again.","ACTION_REMOVE":"Stop Following","ERROR_NOT_LOGGED_IN":"The folder could not be updated because you were not logged in. Please log in and try again.","ACTION_ERROR":"Error","ERROR_NOT_FOUND":"The folder could not be updated because it has been deleted or is no longer shared with you."},"CREATE_COMMUNITY_FOLDER":{"DIALOG_TITLE":"New Folder","ACTION":"New Folder...","ACTION_TOOLTIP":"Create a new folder to put files into","OK":"Create"},"A11Y_READER_REMOVED":"Removed ${0} as a reader","REMOVE_FROM_COMMUNITY":{"ACTION_TOOLTIP_COLLECTION":"Remove from the community ${0}","ACTION":"Remove","ACTION_TOOLTIP":"Remove from community"},"MAKE_FILE_INTERNAL":{"DIALOG_TITLE":"Make Internal?","SUCCESS":"This file can no longer be shared with people outside of your organization.","QUESTION":"Making this file internal will mean it can no longer be shared with people outside of your organization.\n\nAny shares with external people, communities or folders will be removed.\n\nMaking a file internal is permanent and cannot be undone.","ERROR":"The file could not be changed. Please try again later.","ERROR_TIMEOUT":"The file could not be changed because the server could not be contacted. Please try again.","QUESTION_E":"Making this file internal will mean it can no longer be shared with people outside of your organization.\n\nAny shares with external people or folders will be removed.\n\nMaking a file internal is permanent and cannot be undone.","ERROR_CANCEL":"The file could not be changed because the request was cancelled. Please try again.","ACTION":"Change","BUSY":"Saving...","CANCEL":"Cancel","ACTION_TOOLTIP":"Stop allowing this file to be shared outside of your organization","ERROR_SHARED_EXTERNALLY":"The file could not be changed because it is currently shared externally. Remove external shares and folders and try again.","OK":"Make Internal","ERROR_NOT_LOGGED_IN":"The file could not be changed because you were not logged in. Please log in and try again."},"ATTACHMENTS":{"DATE":{"RELATIVE_TIME":{"MONTH":"${MMM} ${d}","DAY":"${EEee} at ${time}","FULL":"${EEEE}, ${date_long} ${time_long}"},"UPDATED":{"MONTH":"Updated ${MMM} ${d}","DAY":"Updated ${EEee} at ${time}","FULL":"${EEEE}, ${date_long} ${time_long}"}}},"DELETE_FILE":{"DIALOG_TITLE":"Delete File","ERROR_X":"${count} files were not deleted due to errors.","INFO_SUCCESS_1":"${item} was deleted.","QUESTION_RELATED_X":"Are you sure you want to permanently delete these files?\n\n${0}\n\nDeleting these files makes them unavailable to all people, groups, status updates, and communities with whom they have been shared.","ERROR_1_NOT_LOGGED_IN":"${item} was not deleted because you were not logged in. Please log in and try again.","QUESTION_RELATED_X_E":"Are you sure you want to permanently delete these files?\n\n${0}\n\nDeleting these files makes them unavailable to all people, groups, and status updates with whom they have been shared.","INFO_SUCCESS":"${0} was deleted.","ERROR_1":"${item} was not deleted due to an error.","ACTION_TOOLTIP":"Permanently delete this file","OK":"Delete","ERROR_1_TIMEOUT":"${item} was not deleted because the server could not be contacted.","ERROR_NOT_LOGGED_IN":"The file was not deleted because you were not logged in.  Click \'OK\' to delete the file.","QUESTION":"Are you sure you want to permanently delete this file?\n\n${0}","ERROR":"The file was not deleted due to an error.","ERROR_TIMEOUT":"The file was not deleted because the server could not be contacted.  Click \'OK\' to try again.","INFO_SUCCESS_X":"${count} files were deleted.","ERROR_1_ACCESS_DENIED":"${item} was not deleted because you do not have permission to delete this file.","ERROR_CANCEL":"The file was not deleted because the request was cancelled.  Click \'OK\' to try again.","ERROR_1_NOT_FOUND":"${item} has already been deleted or is no longer shared with you.","QUESTION_RELATED":"Are you sure you want to permanently delete this file?\n\n${0}\n\nDeleting the file makes it unavailable to all people, groups, status updates, and communities with whom it has been shared.","ACTION_TOOLTIP_X":"Permanently delete the selected files","ACTION":"Delete","QUESTION_RELATED_E":"Are you sure you want to permanently delete this file?\n\n${0}\n\nDeleting the file makes it unavailable to all people, groups, and status updates with whom it has been shared.","ERROR_X_CANCEL":"Some files may not have been deleted because the request was cancelled.","BUSY":"Deleting...","CANCEL":"Cancel","ERROR_1_CANCEL":"${item} may not have been deleted because the request was cancelled.","QUESTION_X":"Are you sure you want to permanently delete these files?\n\n${0}","ERROR_NOT_FOUND":"This file has already been deleted or is no longer shared with you."},"EDIT_FILE":{"ACTION_LONG":"Edit Properties...","ACTION":"Edit Properties","ACTION_TOOLTIP":"Change the file name and description"},"REMOVE_FROM_FILESYNC":{"DIALOG_TITLE":"Remove from Sync","ERROR_X":"${count} files were not removed from Sync due to errors.","INFO_SUCCESS_1":"Sync is no longer enabled for ${item}.","ACTION_DISABLED":"Remove button is disabled","QUESTION":"Are you sure you want to remove this file from Sync?\n\n${0}","INFO_SUCCESS_X":"${count} files were removed from Sync.","ERROR_1_NOT_FOUND":"${item} already has been removed from Sync.","ERROR_1_NOT_LOGGED_IN":"${item} was not removed from Sync because you were not logged in. Please log in and try again.","ERROR_1_ACCESS_DENIED":"${item} was not removed from Sync because you do not have permission to remove this file.","INFO_SUCCESS":"${0} was removed from Sync.","ACTION_TOOLTIP_X":"Remove the selected files from Sync","ACTION":"Remove","ACTION_ENABLED":"Remove button is enabled","ERROR_X_CANCEL":"Some files might not have been removed from Sync because the request was cancelled.","BUSY":"Removing...","ACTION_TOOLTIP":"Remove from Sync","CANCEL":"Cancel","ERROR_1":"${item} was not removed from Sync due to an error.","OK":"OK","ERROR_1_TIMEOUT":"${item} was not removed from Sync because the server could not be contacted.","ERROR_1_CANCEL":"${item} cannot be removed from Sync because the request was cancelled.","QUESTION_X":"Are you sure you want to remove the selected files from Sync?\n\n${0}"},"BACK_TO_COMMUNITY_COLLECTIONS":"Back to community folders","TOGGLE_FAVORITE_FILE":{"A_REMOVE":"Unpin","A_ADD":"Pin","A_REMOVE_SUCCESS":"Pinned file ${link} was removed successfully. ","A_ADD_SUCCESS":"${link} was pinned successfully.","ERROR":"The file could not be updated. Please try again later.","PIN_SUCCESS_SYNC_FAILE":"${link} was pinned successfully. The file cannot be added to Sync because an existing file already uses the same name.","ERROR_TIMEOUT":"The file could not be updated because the server could not be contacted. Please try again.","UNAVAILABLE":"Information about your pinned files could not be retrieved.  Please refresh the page to try again.","ERROR_CANCEL":"The file could not be updated because the request was cancelled. Please try again.","LOADING_T":"Please wait while your pinned files load","A_REMOVE_T":"Remove from your pinned files","A_ADD_T":"Pin this file","LOADING":"Loading...","ERROR_NOT_LOGGED_IN":"The file could not be updated because you were not logged in. Please log in and try again.","ERROR_NOT_FOUND":"The file could not be updated because it has been deleted or is no longer shared with you."},"BACK_TO_APP":"Return to Application","UNLOCK_FILE":{"ERROR_ALREADY_UNLOCKED":"This file was already unlocked.","ERROR_CANCEL":"The file could not be unlocked because the request was cancelled. Please try again.","STATUS":"Unlocking...","INFO_SUCCESS":"The file is now unlocked.","ACTION":"Unlock File","ERROR":"The file could not be unlocked. Please try again later.","ACTION_TOOLTIP":"Unlock this file","ERROR_TIMEOUT":"The file could not be unlocked because the server could not be contacted. Please try again.","ERROR_NOT_LOGGED_IN":"The file could not be unlocked because you were not logged in. Please log in and try again.","ERROR_NOT_FOUND":"The file could not be updated because it has been deleted or is no longer shared with you."},"REMOVE_FROM_COLLECTION":{"DIALOG_TITLE":"Remove from Folder","ACTION_TOOLTIP_COLLECTION":"Remove from the folder ${0}","QUESTION":"Are you sure you want to remove this file from the folder?\n\n${0}","ERROR":"The folder could not be updated due to an error.","ERROR_TIMEOUT":"The folder was not updated because the server could not be contacted.  Click \'OK\' to try again.","ERROR_CANCEL":"The folder was not updated because the request was cancelled.  Click \'OK\' to try again.","INFO_SUCCESS":"The file was removed from the folder.","ACTION":"Remove from Folder","BUSY":"Removing...","CANCEL":"Cancel","ACTION_TOOLTIP":"Remove this item from this folder","OK":"OK","ERROR_ACCESS_DENIED":"You do not have permission to remove this item from the folder.","ERROR_NOT_LOGGED_IN":"The folder was not updated because you were not logged in.  Click \'OK\' to try again.","ERROR_NOT_FOUND":"This folder has been deleted or is no longer shared with you."},"LEGEND_L":"Legend","FILE_SYNC_ICON":{"ALT":"This file is enabled for sync."},"VERSIONS":{"REVERT_DESCRIPTION":"Restored from version ${0}","ERROR_REQUEST_UNKNOWN":"An unknown error has occurred.","NEXT_T":"Next page","SHOW_COMPARISON":"Show comparison","PREVIOUS_T":"Previous page","DELETE_CONFIRM":"Are you sure you want to delete version ${0}?","PAGE":"Page","PAGING_BOTTOM_LABEL":"Paging options","COMPARE_RECENT":"Compare to most recent","MOST_RECENT":"(most recent)","ERROR_REQUEST_TIMEOUT":"The server could not be contacted.","LOADING":"Loading versions...","REVERT_TITLE":"Restore Version","DELETE_ERROR_ACCESS_DENIED":"You do not have permission to delete a version on this file.","DELETE":"Delete","DELETE_ERROR_NOT_FOUND":"The version could not be deleted because it has been deleted or is no longer shared with you.","INFO":"Version ${0} created ${1} by ${2}","DATE":{"RELATIVE_TIME":{"MONTH":"${MMM} ${d}","TODAY":"Today at ${time}","YESTERDAY":"Yesterday at ${time}","DAY":"${EEee} at ${time}","YEAR":"${date_long}","FULL":"${EEEE}, ${date_long} ${time_long}"},"CREATED":{"MONTH":"Version ${number} created on ${MMM} ${d} by ${person}","TODAY":"Version ${number} created today at ${time} by ${person}","YESTERDAY":"Version ${number} created yesterday at ${time} by ${person}","DAY":"Version ${number} created on ${date} by ${person}","YEAR":"Version ${number} created on ${date_long} by ${person}"},"AM":"AM"},"VERSION_NUMBER":"Version ${0} ","SUBSCRIBE_TO":"Feed for these Versions","DELETE_ONE":"Delete version ${0}","COUNT_ALT":"Showing versions ${0} through ${1} of ${2}","COMPARE_VERSION":"Compare version","KEY":"Key:","COMPARING":"Comparing wiki text of:","REVERT_CONFIRM":"You are about to replace the current version of this file with version ${0}, which was created ${1} by ${2}.\n\nDo you want to proceed?","DELETE_ERROR_CANCEL":"The version was not deleted because the request was cancelled. Click \'OK\' again to try your request again.","SHOW_ALT":"Show ${0} items per page","ERROR_REQUEST_CANCELLED":"The request was cancelled.","DELETE_ERROR_NOT_LOGGED_IN":"The version was not deleted because you were not logged in. Click \'OK\' to try again.","DELETE_ALL_CONFIRM":"Are you sure you want to delete all versions prior to ${0}?","ITEMS_PER_PAGE":" items per page","ELLIPSIS":"...","SUBSCRIBE_TO_TOOLTIP":"Follow changes to this file through your feed reader","LABEL":"Version ${0}","DELETE_ERROR":"The version was not deleted due to an error.","NEW_CHANGED":"New/Changed","DELETE_ERROR_TIMEOUT":"The version was not deleted because the server could not be contacted. Click \'OK\' again to try your request again.","BY":"by ","PAGING_TOP_LABEL":"Paging","PAGE_ALT":"Page ${0} of ${1}","CONTENT":{"REVERT":"Restore","VIEW":"View","DOWNLOAD":"Download","DELETE":"Delete"},"NO_VERSIONS":"No versions","REVERT_VERSION":"Restore version ${0}","DELETE_DES":"Select which versions to delete","REVERT":{"GENERIC_ERROR":"The version could not be restored because of an unknown error.  Click \'Restore\' again to try your request again.","ERROR_CANCEL":"The version was not restored because the request was cancelled.  Click \'Restore\' again to try your request again.","INFO_SUCCESS":"${link} was restored successfully.","ERROR_QUOTA_VIOLATION":"The version could not be restored because of space restrictions.","ERROR_MAX_CONTENT_SIZE":"The version could not be restored because it is larger than the maximum allowed file size of ${0}","ERROR_NAME_EXISTS":"The version could not be restored because another file has the same name.","ERROR_TIMEOUT":"The version was not restored because the server could not be contacted.  Click \'Restore\' again to try your request again.","ERROR_ACCESS_DENIED":"You do not have permission to restore a version on this file.   ","INFO_SUCCESS_PRE_MODERATION":"The file ${name} has been submitted for review. No versions will be available until the new or updated version is approved.","ERROR_NOT_FOUND":"The version could not be restored because it has been deleted or is no longer shared with you."},"DELETE_ALL_TITLE":"Delete Versions","ERROR":"Unable to load version information.","SUBSCRIBE_TO_TITLE":"Versions for ${0}","DELETE_ALL":"Delete version ${0} and all earlier versions","COUNT":"${0}-${1} of ${2}","NEXT":"Next","PREVIOUS":"Previous","DELETED":"Deleted","TO":"to:","VIEW_MOST_RECENT":"View most recent","SHOW":"Show"},"ERROR_OCCURRED":"An error occurred.  Contact your administrator.","RECOMMEND":{"RECOMMEND_TOOLTIP":"Like this","YOU_AND_ONE_HAVE_RECOMMENDED":"You and 1 other","UNRECOMMEND_TOOLTIP":"Undo your like from this","LABEL_FALSE":"Like this file.","LABEL_TRUE":"You like this.","RECOMMEND":"Like","LOADING":"Loading...","LABEL_A_ONE":"1 person likes this","UNRECOMMEND":"Undo","ALT_TEXT":"Likes","YOU_HAVE_RECOMMENDED":"You like this","SAVE_ERROR":"Your like could not be saved.  Please try again later.","SAVE_ERROR_TIMEOUT":"Your like could not be saved because the server could not be contacted.  Click the button to try again.","ERROR":"An error has occurred.","LABEL_A_MANY":"${0} people like this","LABEL_HIDDEN_MANY":"${0} others not shown","X_HAVE_RECOMMENDED":"${0} people like this","LABEL_R_ONE":"1 other person likes this","NOT_RECOMMENDED":"0 people like this","SAVE_ERROR_CANCEL":"Your like could not be saved because the request was cancelled.  Click the button to try again.","YOU_AND_X_HAVE_RECOMMENDED":"You and ${0} others","ERROR_RETRIEVE":"Unable to retrieve likes at this time.","LABEL_R_MANY":"${0} other people like this","CANCEL":"Cancel","LABEL_HIDDEN_ONE":"1 other not shown","SAVE_ERROR_NOT_FOUND":"Your like could not be saved because the file has been deleted or is no longer visible.","SAVE_ERROR_ACCESS_DENIED":"Your like could not be saved because the file has been deleted or is no longer visible.","ONE_HAS_RECOMMENDED":"1 person likes this"},"FILES_CHECKED_ALERT":"selecting checkbox will enable the file-action buttons, press shift and tab to navigate to them","COLLECTION":{"ACTION_MENU_TITLE":"${0} folder action menu","EXPAND_ERROR":{"TIMEOUT":"The details of this folder could not be loaded because the server could not be contacted.","NOT_FOUND":"The details of this folder could not be loaded because the folder has been deleted or is no longer visible.","GENERIC":"An error prevented the details of this folder from being displayed.  Please try again later.","CANCEL":"The details of this folder could not be loaded because the request was cancelled."},"BROWSE_OTHER":"Browse Folders","ERRORS":{"ACCESS_DENIED_ANON":{"TITLE":"Access Denied","MESSAGES":"You do not have permission to view this folder.  If this is your folder or it has been shared with you, you must log in to Files first. "},"ACCESS_DENIED":{"TITLE":"Access Denied","MESSAGES":"You do not have permission to view this folder.  The folder is not shared with you."},"NOT_FOUND":{"TITLE":"Folder Not Found","MESSAGES":"The folder you have requested has been deleted or moved. If someone sent you this link, check that it is correct."},"LOGIN":"Log in now"}},"CONFIRM":{"DIALOG_TITLE":"Confirm","BUSY":"Busy...","CANCEL":"Cancel","OK":"OK"},"ERROR_DETAILS_INFO":"Contact your administrator and include the information below:","ADD_TO_COLLECTION":{"DIALOG_TITLE":"Add to Folders","INFO_SUCCESS_1":"${filelink} was added to ${collectionlink}. ${undolink}","NO_FILTERED_COLLECTIONS":"You are not a contributor or owner of any folder with the specified name.","ERROR_CANNOT_MOVE_PERSONALFILE_TO_COMMUNITYFOLDER":"You cannot move a personal file into a community folder.","OK_TITLE":"Add this file to the selected folders","SHARE_AS_EDITOR":"Allow members of the selected folders to edit this file","NO_PRIVATE_COLLECTIONS":"You cannot add a shared or private file to a folder that is shared with everyone in your organization. You do not have a private folder at this time.","WARN_PUBLIC_X":"Adding this file to the selected folders will share the file with everyone in your organization.","FILTER_TOOLTIP":"Enter a folder name","ERROR_PUBLIC_COLLECTION":"Only the file owner can add this file to a folder shared with everyone in your organization.","INTERNAL_PRIVATE_FOLDERS_ONLY":"This file cannot be added to folders that are shared with everyone in your organization or that can be shared outside of your organization.","INFO_SUCCESS_SHARED_1":"${filelink} was added to ${collectionlink} and is now shared. ${undolink}","INFO_EXISTS_X":"${filelink} was already in the selected folders.","INFO_SUCCESS_PUBLIC_1":"${filelink} was added to ${collectionlink} and is now shared with everyone in your organization. ${undolink}","INFO_SUCCESS_X":"${filelink} was added to ${count} folders. ${undolink}","ERROR_CANCEL":"The file was not added because the request was cancelled.  Click \'Add to Folders\' to try your request again.","ERROR_ACCESS_DENIED_1":"You do not have permission to add files to the selected folder.","ERROR_NOT_FOUND_1":"The file was not added because the file or the selected folder has been deleted or is no longer shared with you.","DESCRIPTION_LABEL":"Description: ","ERROR_UNSHAREABLE_FILE":"Only the file owner can add this file to a folder.","LABEL_PUBLIC":"You are allowed to contribute to the following folders","ACTION":"Add to Folders","FIND":"Find","ERROR_EXTERNAL_COLLECTION":"The file was not added to this folder because the folder can be shared outside of your organization and the file cannot. ","ALLOW_EDITORS_TO_EDIT_THIS_FILE":"Allow folder editors to edit this file","SELECT_COLLECTION":"You must select a folder that this file will be added to.","MOST_RECENT_COLLECTION":"The last folder selected was ${collectionName}","INTERNAL_FOLDERS_ONLY":"This file cannot be added to folders that can be shared outside of your organization.","INFO_SUCCESS_SHARED_X":"${filelink} was added to ${count} folders and is now shared. ${undolink}","SHOW_ONLY_SOME_FOLDERS":"Showing only folders to which you can add this content.","INFO_SUCCESS_PUBLIC_X":"${filelink} was added to ${count} folders and is now shared with everyone in your organization. ${undolink}","ERROR_ACCESS_DENIED_X":"You do not have permission to add files to one or more of the selected folders.","ERROR_NOT_FOUND_X":"The file was not added because the file or one or more of the selected folders have been deleted or are no longer shared with you.","ACTION_TOOLTIP":"Add this file to a folder","OK":"Add to Folders","ERROR_NOT_LOGGED_IN":"The file was not added because you were not logged in.  Click \'Add to Folders\' to add the file.","PRIVATE_FOLDERS_ONLY":"Only the file owner can add this file to a folder that is shared with everyone in your organization.","UNDO":{"ERROR_PUBLIC":{"TIMEOUT":"${filelink} is still shared with everyone in your organization because the server could not be contacted.","UNKNOWN_ONE":"${filelink} was not removed from ${collectionlink} and is still shared with everyone in your organization due to an error.","CANCEL_ONE":"${filelink} was not removed from ${collectionlink} and is still shared with everyone in your organization because the request was cancelled.","CANCEL_MANY":"${filelink} was not removed from ${count} folders and is still shared with everyone in your organization because the request was cancelled.","UNKNOWN_MANY":"${filelink} was not removed from ${count} folders and is still shared with everyone in your organization due to an error.","TIMEOUT_ONE":"${filelink} was not removed from ${collectionlink} and is still shared with everyone in your organization because the server could not be contacted.","UNKNOWN":"${filelink} is still shared with everyone in your organization due to an error.","CANCEL":"${filelink} is still shared with everyone in your organization because the request was cancelled.","TIMEOUT_MANY":"${filelink} was not removed from ${count} folders and is still shared with everyone in your organization because the server could not be contacted."},"STATUS":"Removing...","INFO_SUCCESS_1":"${filelink} was removed from ${collectionlink}.","INFO_SUCCESS_SHARED_1":"${filelink} was removed from ${collectionlink} and is no longer shared.","ACTION":"Undo","INFO_SUCCESS_PUBLIC_1":"${filelink} was removed from ${collectionlink} and is no longer shared with everyone in your organization.","ERROR_BASE":{"CANCEL_ONE":"${filelink} was not removed from ${collectionlink} because the request was cancelled.","UNKNOWN_ONE":"${filelink} was not removed from ${collectionlink} due to an error.","TIMEOUT":"${filelink} was not removed because the server could not be contacted.","CANCEL_MANY":"${filelink} was not removed from ${count} folders because the request was cancelled.","UNKNOWN_MANY":"${filelink} was not removed from ${count} folders due to an error.","TIMEOUT_ONE":"${filelink} was not removed from ${collectionlink} because the server could not be contacted.","CANCEL":"${filelink} was not removed because the request was cancelled.","UNKNOWN":"${filelink} was not removed due to an error.","TIMEOUT_MANY":"${filelink} was not removed from ${count} folders because the server could not be contacted."},"INFO_SUCCESS_X":"${filelink} was removed from ${count} folders.","INFO_SUCCESS_SHARED_X":"${filelink} was removed from ${count} folders and is no longer shared.","INFO_SUCCESS_PUBLIC_X":"${filelink} was removed from ${count} folders and is no longer shared with everyone in your organization."},"ACTION_LONG":"Add to Folders...","ERROR":"The file was not added due to an error.","MOST_RECENT_COLLECTION_TOOLTIP":"Add file to this folder","ERROR_TIMEOUT":"The file was not added because the server could not be contacted.  Click \'Add to Folders\' to try your request again.","NO_COLLECTIONS_FOR_EDITOR_OR_OWNER":"You are not an editor or owner of any folders.","ERROR_CANNOT_MOVE_COMMUNITYFILE_TO_PERSONALFOLDER":"You cannot move a community file into a personal folder.","OK_ADD_HERE":"Add Here","STATUS":"Adding...","WARN_PUBLIC_1":"Adding this file to the selected folder will share the file with everyone in your organization.","NO_COLLECTIONS":"You are not a contributor or owner of any folders.","FILTER":"Folders named \'${0}\'","LABEL_PRIVATE":"You are allowed to contribute to the following private folders","HEADLESS":{"ERROR_CANCEL":"${filelink} was not added because the request was cancelled.","ERROR_NOT_FOUND_1":"${filelink} was not added because ${filelink} or ${collectionlink} has been deleted or is no longer shared with you.","ERROR_ACCESS_DENIED_1":"You do not have permission to add files to ${collectionlink}.","ERROR_UNSHAREABLE_FILE":"Only the file owner can add ${filelink} to a folder.","ERROR_NOT_FOUND_2":"Community-owned files cannot be added to a personal folder.","ERROR":"${filelink} was not added to ${collectionlink} due to an error.","ERROR_NOT_FOUND_X":"${filelink} was not added because ${filelink} or one or more of the selected folders have been deleted or are no longer shared with you.","ERROR_ACCESS_DENIED_X":"You do not have permission to add files to one or more of the selected folders.","ERROR_TIMEOUT":"${filelink} was not added because the server could not be contacted.","ERROR_EXTERNAL_COLLECTION":"${filelink} was not added because the folder can be shared outside of your organization and the file cannot.","ERROR_PUBLIC_COLLECTION":"Only the file owner can add ${filelink} to a folder shared with everyone in your organization.","ERROR_NOT_LOGGED_IN":"${filelink} was not added because you were not logged in. Please log in and try again."},"BUSY":"Adding...","CANCEL":"Cancel","NO_FILTERED_COLLECTIONS_FOR_EDITOR_OR_OWNER":"You are not an editor or owner of any folder with the specified name.","INFO_EXISTS_1":"${filelink} was already in ${collectionlink}."},"TOOLBAR_ALT":"Files menu","A11Y_MANAGER_REMOVED":"Removed ${0} as an owner","SEARCH":{"SCOPE_PERSON":{"LABEL":"Files belonging to...","HINT":"Name or email","HOVER":"Search for a person"},"HINT":"Search","SCOPE_CONNECTIONS_WIKIS":{"LABEL":"Wikis","HOVER":"Search Wikis"},"SCOPE_ALL_FILES":{"LABEL":"All Files","HINT":"Search","HOVER":"Search all files"},"PEOPLE":"Files belonging to...","SCOPE_CONNECTIONS_DOGEAR":{"LABEL":"Bookmarks","HOVER":"Search Bookmarks"},"SCOPE_CONNECTIONS_COMMUNITIES":{"LABEL":"Communities","HOVER":"Search Communities"},"SCOPE_COMMUNITY_FILES":{"LABEL":"Community files","HINT":"Search","HOVER":"Search community files "},"FILES":"Files belonging to...","SCOPE_CONNECTIONS_ADVANCED":{"LABEL":"Advanced","HOVER":"Go to the advanced search page"},"SCOPE_SHARED_WITH_ME_FILES":{"LABEL":"Files Shared with Me","HINT":"Search","HOVER":"Search files shared with me"},"SCOPE_FOLDERS":{"LABEL":"Folders","HINT":"Folder name","HOVER":"Search all folders"},"SCOPE_CONNECTIONS_BLOGS":{"LABEL":"Blogs","HOVER":"Search Blogs"},"SCOPE_CONNECTIONS_PROFILES":{"LABEL":"Profiles","HOVER":"Search Profiles"},"USER_RESULTS":"People search results for name and email: ${0}","SCOPE_CONNECTIONS_ACTIVITIES":{"LABEL":"Activities","HOVER":"Search Activities"},"COMMUNITIES":"Communities","SCOPE_CONNECTIONS_FORUMS":{"LABEL":"Forums","HOVER":"Search Forums"},"SEARCH":"Search","SCOPE_SHARED_BY_ME_FILES":{"LABEL":"Files Shared by Me","HINT":"Search","HOVER":"Search files shared by me"},"SCOPE_CONNECTIONS_ALL":{"LABEL":"All Content","HOVER":"Search all content"},"SCOPE_PUBLIC_FILES":{"LABEL":"${company} Files","HINT":"Search","HOVER":"Search ${company} files"},"REFINE_OPTIONS":"Refine search options","SCOPE_MY_FILES":{"LABEL":"My Files","HINT":"Search","HOVER":"Search my files"},"SCOPE_THESE_FILES":{"LABEL":"This Person\'s Files","HINT":"Search","HOVER":"Search this person\'s files"},"PEOPLE_DEFAULT":"Name or email","SEARCH_ALT":"Search","FILTER":{"TAGS":{"TITLE":"Tags","EXPAND":"Expand the tag filter","COLLAPSE":"Collapse the tag filter"},"DATE":{"TITLE":"Dates","EXPAND":"Expand the date filter","COLLAPSE":"Collapse the date filter"},"PEOPLE":{"TITLE":"People","EXPAND":"Expand the person filter","COLLAPSE":"Collapse the person filter"}},"TITLE":"Search Results for \'${0}\'"},"RESTORE_FILE":{"ACTION":"Restore","ACTION_TOOLTIP":"Move this file out of the trash"},"INFO":"Info","DATE":{"RELATIVE_TIME":{"MONTH":"${MMM} ${d}","TODAY":"Today at ${time}","YESTERDAY":"Yesterday at ${time}","DAY":"${EEee} at ${time}","YEAR":"${date_long}","FULL":"${EEEE}, ${date_long} ${time_long}"},"TODAY":"today","YESTERDAY":"yesterday","COMPACT":{"MONTH":"${MMM} ${d}","TODAY":"${time}","YESTERDAY":"Yesterday","DAY":"${MMM} ${d}","YEAR":"${date}","FULL":"${EEEE}, ${date_long} ${time_long}"},"TODAY_U":"Today","YESTERDAY_U":"Yesterday","AM":"AM","PM":"PM","MONTHS_ABBR":{"11":"DEC","0":"JAN","1":"FEB","2":"MAR","3":"APR","4":"MAY","5":"JUN","6":"JUL","7":"AUG","8":"SEP","9":"OCT","10":"NOV"},"FULL":"${EEEE}, ${date_long} ${time_long}"},"EDIT_FILE_RT":{"DIALOG_TITLE":"Edit on Desktop","CONNECTOR_DIALOG_MESSAGE":"This feature allows you to edit the file locally.","OK_TITLE":"Edit on Desktop","ACTION":"Edit on Desktop","CONNECTOR_DIALOG_WARNING":": Once you complete editing, you must publish a draft using the desktop file connectors. If the file fails to open, you might need to install the desktop plugins.","CONNECTOR_DIALOG_CHECKBOX":"Don\'t show this message again.","BUSY":"Opening...","CANCEL":"Cancel","ACTION_TOOLTIP":"Edit this document","OK":"Edit on Desktop","CONNECTOR_DIALOG_IMPORTANT":"Important"},"ABOUT_COLLECTION":{"ADDED":"Created: ","ITEM_COUNT":"Files included: ","TIMESTAMP":{"MONTH":"${EEEE}, ${date} by ${user}","TODAY":"${EEEE}, Today at ${time} by ${user}","YESTERDAY":"${EEEE}, Yesterday at ${time} by ${user}","DAY":"${EEEE}, ${date} by ${user}","YEAR":"${EEEE}, ${date_long} by ${user}","FULL":"${EEEE}, ${date_long} ${time_long} by ${user}"},"TITLE":"About this Folder","CONTENTS":"Folder contents updated:","UPDATED":"Any update:","DESCRIPTION":"Description:","NO_DESCRIPTION":"There is no description for this folder."},"COMMUNITYSEARCH":{"HINT_TEXT":"Community name...","NO_RESULTS":"No results for \'${0}\'","SHARE_LINK":"Share with a community...","SOURCE":"a Community"},"DELETE_COLLECTION":{"DIALOG_TITLE":"Delete Folder","QUESTION":"Are you sure you want to delete this folder?\n\n${0}","ERROR":"The folder was not deleted due to an error.","ERROR_TIMEOUT":"The folder was not deleted because the server could not be contacted.  Click \'OK\' to try again.","ERROR_CANCEL":"The folder was not deleted because the request was cancelled.  Click \'OK\' to try again.","INFO_SUCCESS":"The folder was deleted.","CONFIRMATION":"This folder and all subfolders will be permanently deleted. Files will be removed, but will not be deleted.","ACTION":"Delete","BUSY":"Deleting...","ACTION_TOOLTIP":"Delete this folder","CANCEL":"Cancel","OK":"Delete","ERROR_NOT_LOGGED_IN":"The folder was not deleted because you were not logged in.  Click \'OK\' to delete the folder.","ERROR_NOT_FOUND":"This folder has already been deleted or is no longer shared with you.","ERROR_ACCESS_DENIED":"You do not have permission to delete this folder."},"NOTIFY_FILE":{"UNSUBSCRIBE":{"ALL":"You have stopped following this file.","CONTENT":"You will no longer receive updates when this file is changed.","COMMENT":"You will no longer receive updates when this file is commented on."},"ERROR":"Your following settings on this file were not changed due to an error.  Please try again.","SUBSCRIBE":{"ALL":"You are now following this file.","CONTENT":"You will now receive updates when this file is changed.","COMMENT":"You will now receive updates when comments are made on this file."}},"MAKE_COLLECTION_PRIVATE":{"DIALOG_TITLE":"Remove your organization\'s access","QUESTION":"Are you sure you want to remove your organization\'s access to this folder?\n\nIf access is removed, only the owner and people with whom it has been shared can view and work with it. ","ERROR":"Organization access to the folder could not be removed.","ERROR_TIMEOUT":"Organization access to the folder was not removed because the server could not be contacted.  Click \'OK\' to try again.","ERROR_CANCEL":"Organization access to the folder was not removed because the request was cancelled.  Click \'OK\' to try again.","INFO_SUCCESS":"The folder is now only visible through direct shares.","ACTION":"Remove public access","BUSY":"Removing...","CANCEL":"Cancel","ACTION_TOOLTIP":"Remove your organization\'s access ","OK":"OK","ERROR_NOT_LOGGED_IN":"Organization access to the folder was not removed because you were not logged in.","ERROR_NOT_FOUND":"Organization access to the folder was not removed because the folder has been deleted or is no longer visible to you."},"APP_NAME_TITLE_BAR":"Files","WARNING_COLON":"Warning:","SHARING":{"SHARED_BY":{"MONTH":"Shared by ${user} on ${MMM} ${d}","TODAY":"Shared by ${user} today at ${time}","YESTERDAY":"Shared by ${user} yesterday at ${time}","DAY":"Shared by ${user} on ${EEEE} at ${time}","YEAR":"Shared by ${user} on ${date_long}"},"USERS_POPUP_FILE":{"ADD":"Add","COMMUNITY_MEMBERS":"${0}","READERS_LABEL":"Readers:\xa0","EMPTY_CONTRIBUTORS":"None","EXTERNAL":"This file is shared with external people or communities:","CONTRIBUTORS_LABEL":"Editors:\xa0","READER_IF_PUBLIC":"Everyone in ${company}","EXTERNAL_E":"This file is shared with external people:","EXTERNAL_COLLECTION":"This folder is shared with external people or communities:","OWNER":"This file is owned by ${user}.","COMMUNITY_OWNERS":"${0} (owners only)","SHOW_MORE":"Show more...","NEVER_SHARED":"You have not shared this file with anyone","ALSO_SHARED_LINK":"folders","ALSO_SHARED":"Other people have access to this file through one or more shared ${0}","EMPTY_READERS":"None","MY_SHARES":"My shares","SHARE_INTENT_COLLECTIONS_T":"Shared externally","OWNER_LABEL":"Owner:\xa0","ERROR":"The server could not be contacted.","ERROR_TIMEOUT":"The server could not be contacted.","COMMUNITY_TOOLTIP":"Shared with members of the community \'${0}\'","EMPTY":"Not shared with anyone","NO_INVOLVED_SHARES":"You have not shared this file or been shared with","ERROR_CANCEL":"The request was cancelled.  Please try again.","SHARE_INTENT_T":"Shared externally","COMMUNITY_TOOLTIP_OWNERS":"Shared with owners of the community \'${0}\'","READER_IF_PUBLIC_TOOLTIP":"This file is visible to everyone in ${company}","ERROR_NOT_FOUND":"This information cannot be displayed because the file has been deleted or is no longer shared with you.","ERROR_ACCESS_DENIED":"This information cannot be displayed because the file has been deleted or is no longer shared with you."},"COLLECT":{"EDITOR_LABEL":"Editors:","CONTRIBUTOR_IF_ALL_AUTH":"Everyone in ${company}","ADD_ALL_AUTHED_USERS_AS_EDITOR":"Everyone in ${company} can edit this folder","SHARING_VISIBLE_EXTERNALLY_AND_SHARE_AT_TOP":"Folder may be visible to people outside of your organization. Sharing is set at the top folder.","EDITOR_ROLE":"as Editor","SHARING_VISIBLE_EXTERNALLY":"Folder may be visible to people outside of your organization","CONTRIBUTOR_LABEL_TITLE":"Contributors","VISIBILITY_PUBLIC_LABEL":"Everyone in my organization","SHARE_TYPE_LABEL":"Type","READER_LABEL_TITLE":"Readers","SHARING_VISIBLE_COMMUNITY_MEMBERS":"Folder will be visible to community members only","ADD_MEMBER_HEADER":"Share with:","VISIBILITY_PEOPLE_GROUPS_COMMUNITIES_LABEL":"People, Groups, or Communities","ADD_MEMBER":"Share with:","VISIBILITY_PEOPLE_COMMUNITIES_LABEL":"People or Communities","WARN_OWNER":"You cannot share with the owner of the folder.","ADD_ALL_AUTH_CONTRIBUTOR":"Everyone in ${company} can contribute to this folder","MANAGER_LABEL":"Owners:","SHARING_VISIBLE_ORGANIZATION":"Folder will be visible to your entire organization","ADD_TOOLTIP":"Share with this user","SHARING_VISIBLE_MEMBERS_AND_SHARE_AT_TOP":"Folder will be visible to you and others. Sharing is set at the top folder.","CONTRIBUTOR_EMPTY":"None","VISIBILITY_NO_ONE_LABEL":"No one","VISIBILITY_PEOPLE_GROUPS_LABEL":"People or Groups","SHARING_PRIVATE_AND_SHARE_AT_TOP":"Folder will be visible only to you. Sharing is set at the top folder.","READER_EMPTY":"None","VISIBILITY_PEOPLE_LABEL":"People","VISIBILITY_NO_ONE_DESCRIPTION":"(shared with me only)","WARN_GRANT_ALL_AUTHED_USERS_TO_EDIT_FOLDER":"If you allow everyone to edit this folder, all files that are not visible to your entire organization will be removed.","VISIBILITY_PEOPLE_GROUPS_DESCRIPTION":"(give specific permissions to others)","SELECT_USER_GROUP_DISABLED_ERROR":"Please select a person or community to share with.","EDITOR_LABEL_TITLE":"Editors","SHARING":"Sharing:","SHARE_ROLE_LABEL":"Role","SHARING_VISIBLE_ORGANIZATION_AND_SHARE_AT_TOP":"Folder will be visible to your entire organization. Sharing is set at the top folder.","READER_IF_PUBLIC":"Everyone in ${company}","CONTRIBUTOR_LABEL":"Contributors:","ADD_MEMBER_TITLE":"Share with","VISIBILITY_PUBLIC_DESCRIPTION":"","WARN_AUTH_CHANGE_ALL_AUTH":"Adding everyone as contributors will make this folder public.","SHARING_BY_TOP_LEVEL_FOLDER":"Sharing can only be set at the top level folder: ${topFolder}.","READER_LABEL":"Readers: ","SELECT_USER_GROUP_ENABLED_ERROR":"Please select a person, group or community to share with.","EDITOR_EMPTY":"None","MANAGER_LABEL_TITLE":"Owners","SHARING_BY_TOP_FOLDER":"Sharing is set at the top folder.","SELECT_USER_GROUP_ENABLED_ERROR_E":"Please select a person or group to share with.","WARN_ADD_ALL_AUTHED_USERS_AS_EDITOR":"Adding everyone as editors will make this folder visible to your entire organization.","MANAGER_ROLE":"as Owner","SHARING_HEADER":"Sharing:","READER_ROLE":"as Reader","VISIBILITY_PUBLIC_WARNING":"Files which are not visible to everyone in ${company} will be removed from this folder.","CONTRIBUTOR_ROLE":"as Contributor","MANAGER_EMPTY":"None","NO_MEMBERS":"None","SELECT_USER_GROUP_DISABLED_ERROR_E":"Please select a person to share with."}},"SUBSCRIBE_TO_PAGE":"Feed for this Page","EXTERNAL_USER":"External user","CREATE_COLLECTION":{"PRIVATE_DESCRIPTION":"(shared with me only)","DIALOG_TITLE":"New Folder","WARN_INVALID_CHARS_IN_NAME":"Folder names may not contain the following characters: \\ / : * ? \" \x3c \x3e |","INVITATION_ERROR":"Content was not shared with the following people because you do not have permission to share with them: ${0}.","PUBLIC_DESCRIPTION":"","ACTION_SUB_COLLECTION":"New Folder...","TRIM_LONG_FILENAME":"Shorten name?","INFO_SUCCESS":"Successfully created ${link}.","EXTERNAL_ACCESS_HEADER":"External access:","TRIM_LONG_DESCRIPTION":"Shorten description?","WARN_INTERNAL":"Once a folder is created, it is not possible to change permissions to share with others outside of your organization.","NAME_LABEL_TITLE":"Name","ACTION_TOOLTIP":"Create a new folder to put files into","SHARE_WITH_LABEL":"Share with: ","OK":"Create","ERROR_NOT_LOGGED_IN":"The folder was not created because you were not logged in.  Click \'Save\' to create the folder.","NAME_LABEL":"Name: ","WARN_SPECIFY_NAME":"Name is a required field.","ACTION_TOOLTIP_SUB_COLLECTION":"Create a new folder to put files into","ADD_TOOLTIP":"Share with this user","ERROR":"The folder was not created due to an error.","ERROR_TIMEOUT":"The folder was not created because the server could not be contacted.  Click \'Save\' to try your request again.","WARN_CANT_MAKE_INTERNAL":"This setting is disabled because you chose to share with people outside of your organization.","REQUIRED_MARK":"* Required","WARN_CANT_ADD_SUB_FOLDER":"As a reader, you don\'t have permission to add to this folder. If you create a folder, it will appear in \"My Folders\".","EXTERNAL_ACCESS_LABEL":"External access:","ACTION_IN_MENU":"Folder...","WARN_LONG_FILENAME":"The name is too long.","FIX_INVALID_CHARS_IN_NAME":"Replace invalid characters with \'_\'?","ERROR_CANCEL":"The folder was not created because the request was cancelled.  Click \'Save\' to try your request again.","DESCRIPTION_LABEL":"Description: ","WARN_LONG_DESCRIPTION":"The description you entered is too long. ","ERROR_FILENAME_INVALID_CHARACTERS":"The folder name cannot include the following characters: \\ / : * ?  \x3c \x3e |\"","ACTION":"New Folder","SUB_FODLER_ERROR_NAME_EXISTS":"There is already a folder named \'${folder}\' in this folder. Try another name.","PRIVATE_LABEL":"No one","ERROR_NAME_EXISTS":"Another folder with the same name already exists.","BUSY":"Saving...","REQUIRED_FIELD":"Required field","CANCEL":"Cancel","SHARE_COMMUNITY_WARN":"Sharing with the community \'${0}\' will share this folder with everyone in your organization.","TOP_LEVEL_FODLER_ERROR_NAME_EXISTS":"You already own a top level folder named \'${folder}\'. Try another name.","PUBLIC_LABEL":"Everyone in ${company}","SHARING_INTENT":"Folder can be shared with people external to my organization","ERROR_NOT_FOUND":"The folder was not created because it has been deleted or is no longer shared with you.","ERROR_ACCESS_DENIED":"You do not have permission to create a folder.","EXTERNAL_ACCESS_ALLY":"External access help"},"SERVICETITLE":"Atom Publishing Protocol Service Document","FORCE_MOVE":{"DIALOG_TITLE":"Force Move","OK_HERE":"Move Here","ACTION":"Force Move","BUSY":"Moving...","ACTION_TOOLTIP":"Force Move","CANCEL":"Cancel","MULTI_ITEMS":{"VISIBILITY_CHANGE_FILE_1":"File ${item} will be made to visible to everyone in your organization.","VISIBILITY_FOLDER_FILE_1":"Files in folder ${item} will be removed because they are not visible to everyone. All other files will become visible to everyone in your organization.","VISIBILITY_CHANGE_FOLDER_1":"Folder ${item} contains one or more files are not visible to everyone in your organization. These files will be removed.","RESHAREOFF_FOLDER_FILE_1":"Files in folder ${item} will be removed because the owner does not allow others to share. All other files will become visible to everyone in your organization.","RESHARE_OFF_FOLDER_1":"Folder ${item} contains one or more files that the owner does not allow others to share. These files will be removed.","VISIBILITY_CHANGE_FILE_X":"${filecount} files will be made to visible to everyone in your organization.","VISIBILITY_FOLDER_FILE_X":"Files in ${foldercount} folders will be removed because they are not visible to everyone. All other files will become visible to everyone in your organization.","VISIBILITY_CHANGE_FOLDER_X":"${foldercount} folders contains one or more files are not visible to everyone in your organization. These files will be removed.","RESHAREOFF_FOLDER_FILE_X":"Files in ${foldercount} folders will be removed because the owner does not allow others to share. All other files will become visible to everyone in your organization.","RESHARE_OFF_FOLDER_X":"${foldercount} folders contain one or more files that the owner does not allow others to share. These files will be removed."},"OK":"Move","FILE":{"VISIBILITY_CHANGE_MESSAGE_FOLDER_X":"These folders contain one or more files that the owner does not allow others to share. These files will be removed.","INFO_SUCCESS":"The file was moved to ${target}.","SOURCE_PARENT_NOT_FOUND":"The folder that contains the file you want to move does not exist any more.","VISIBILITY_CHANGE_MESSAGE":"This file will be made to visible to everyone in your organization","ACCESS_DENIED":"You do not have permission to move the file into ${target}.","ERROR":"The file was not moved to ${target} due to an error.","ITEM_NOT_FOUND_IN_SOURCE_PARENT":"The selected file does not exist in the source folder any more.","ITEM_NOT_FOUND":"The selected file does not exist any more.","FILE":{"SOURCE_NOT_MOVEABLE":"The selected file cannot be moved."},"VISIBILITY_CHANGE_MESSAGE_X":"These files will be made to visible to everyone in your organization","TARGET_PARENT_NOT_FOUND":"The target folder you want to move the selected file to does not exist any more."},"FOLDER":{"INFO_SUCCESS":"The folder was moved to ${target}.","VISIBILITY_CHANGE_MESSAGE":"Files that are not visible to everyone in your organization will be removed from this folder","SOURCE_PARENT_NOT_FOUND":"The folder that contains this folder you want to move does not exist any more.","ERROR":"The folder was not moved to ${target} due to an error.","ITEM_NOT_FOUND_IN_SOURCE_PARENT":"The selected folder does not exist in the source folder any more.","ITEM_NOT_FOUND":"The selected folder does not exist any more.","RESHARE_OFF_CHANGE_MESSAGE":"This folder contains one or more files that the owner does not allow others to share.  These files will be removed.","SOURCE_NOT_MOVEABLE":"The selected folder cannot be moved.","TARGET_PARENT_NOT_FOUND":"The target folder you want to move the selected folder to does not exist any more."}},"ERROR_IN_APP_MESSAGE":"Click the browser back button to return to the previous page and try again.  If this error persists, report the problem to your administrator.","JAVASCRIPT_DISABLED_TITLE":"Turn on JavaScript","JUMPT_TO_SUMMARYPAGE":{"ACTION":"Summary","ACTION_TOOLTIP":"Go to the detailed page of this file","NAME":"Summary"},"ERROR_DETAILS":"Report this problem to your administrator.","MOVE_COLLECTION":{"DIALOG_TITLE":"Move to...","WARN_PUBLIC":"Adding this folder to the selected folder will make the folder public (shared with everyone).","CROSS_COMMUNITY_MOVE_NOT_ALLOWED":"The folder cannot be moved the a folder in another community.","INFO_SUCCESS_1":"The folder was moved to ${target}.","ACCESS_DENIED_1":"Only folder owners can move the top level folder.","INTERNAL_FOLDER_TO_EXTERNAL_FOLDER":"The move failed because ${collection} is an internal folder and ${target} can be shared outside of your organization.","ACCESS_DENIED":"You do not have permission to move the folder to ${target}.","ITEM_EXISTS_SUBFOLDER":"There is already a folder named ${collection} in this folder. Rename one of the folders if you want to try again.","ACTION_TOOLTIP":"Move this folder","SOURCE_NOT_MOVEABLE":"The selected folder cannot be moved.","OK":"Move","ACTION_LONG":"Move to...","SOURCE_PARENT_NOT_FOUND":"The folder that contains the folder you want to move does not exist any more.","COLLECTION_TYPE_MISSMATCH":"It is not allowed to move personal folder to community owned folder or move community owned folder to personal folder.","ERROR":"The folder was not moved to ${target} due to an error.","ITEM_NOT_FOUND_IN_SOURCE_PARENT":"The selected folder does not exist in the source folder any more.","ITEM_NOT_FOUND":"The selected folder you want to move does not exist any more.","ITEM_EXISTS_TOPFOLDER":"You already own a top level folder named ${collection}. Rename one of the folders if you want to try again.","INFO":"Moving the folder will cause other people to lose access to the folder and its content.","TARGET_PARENT_NOT_FOUND":"The target folder you want to move to does not exist any more.","CANNOT_MOVE_PERSONALFOLDER_TO_COMMUNITYFOLDER":"You cannot move a personal folder into a community folder.","ACTION":"Move","CANNOT_MOVE_COMMUNITYFOLDER_TO_PERSONALFOLDER":"You cannot move a community folder into a personal folder.","INVALID_TARGET":"Folders cannot be moved into their own subfolders.","BUSY":"Moving...","CANCEL":"Cancel","OK_MOVE_HERE":"Move Here"},"ELLIPSIS":"...","CONTINUE_TO_APP":"Continue to Files","CREATE_COMMUNITY_FILE":{"DIALOG_TITLE":"Upload Files","ACTION":"New Upload...","ACTION_TOOLTIP":"Upload files from your computer","OK":"Upload"},"TOGGLE_FOLLOWING_FILE":{"FOLLOW":{"INFO_SUCCESS":"You are now following this file: ${0}."},"ERROR_CANCEL":"The file could not be updated because the request was cancelled. Please try again.","STOP_FOLLOWING":{"INFO_SUCCESS":"You have stopped following this file: ${0}. "},"ERROR":"The file could not be updated. Please try again later.","ACTION_ADD":"Follow","ERROR_TIMEOUT":"The file could not be updated because the server could not be contacted. Please try again.","ACTION_TOOLTIP":"Toggle whether you will receive updates about this file","ACTION_REMOVE":"Stop Following","ERROR_NOT_FOUND":"The file could not be updated because it has been deleted or is no longer shared with you.","ACTION_ERROR":"Error","ERROR_NOT_LOGGED_IN":"The file could not be updated because you were not logged in. Please log in and try again."},"SCENE_TITLE_FILE":"File: ${0}","ERROR_IN_APP_TITLE":"We are unable to process your request","CLOSE":"Close","TOGGLE_SECTION":"Expand and collapse this section","FILTERS":{"SHARED_WITH":{"OPTION_EMPTY":"With a specific person:","NOT_PUBLIC_LONG":"Shared with you and not visible to everyone in the owner\'s organization","OPTION_EMPTY_TOOLTIP":"Only show files that were shared with a specific person","PUBLIC":"and everyone in my organization","PUBLIC_TOOLTIP":"Files that are shared with you and visible to everyone in the owner\'s organization","COLLAPSE":"Collapse the shared with filter","PUBLIC_LONG":"Shared with you and visible to everyone in the owner\'s organization","NOT_PUBLIC":"and not everyone in my organization","OPTION":"With ${0}","TITLE":"Shared With","FILTER":"Shared with ${0}","NOT_PUBLIC_TOOLTIP":"Files that shared with you but that are not visible to everyone in the owner\'s organization","EXPAND":"Expand the shared with filter"},"SEARCH":{"TITLE":"Search for \"${0}\""},"COLLECTION_CREATOR":{"OPTION_ME":"Me","OPTION_EMPTY":"Enter a person directly:","OPTION":"by ${0}","OPTION_EMPTY_TOOLTIP":"Only show folders created by a specific person","TITLE":"Created By","FILTER":"Created by ${0}","EXPAND":"Expand the creator filter","HEADER":"Created By:","COLLAPSE":"Collapse the creator filter"},"COLLECTION_NAME":{"OPTION":"contains \'${0}\'","FILTER":"Name contains \'${0}\'","TITLE":"Folder name","EXPAND":"Expand the folder name filter","COLLAPSE":"Collapse the folder name filter"},"MY_TAGS":{"TITLE":"Tags","EXPAND":"Expand the tags filter","COLLAPSE":"Collapse the tags filter","HEADER":"Tags:"},"USER_TAGS":{"TITLE":"Tags","EXPAND":"Expand the tags filter","COLLAPSE":"Collapse the tags filter","HEADER":"Tags:"},"DATE":{"TODAY":{"TOOLTIP":"Only updated since midnight today","NAME":"Today","LONG":"Only updated since midnight today "},"LASTYEAR":{"TOOLTIP":"Only updated in the last 365 days","NAME":"Last 365 days","LONG":"Only updated in the last 365 days "},"TITLE":"Date Updated","EXPAND":"Expand the date updated filter","LASTWEEK":{"TOOLTIP":"Only updated in the last 7 days","NAME":"Last 7 days","LONG":"Only updated in the last 7 days "},"LASTMONTH":{"TOOLTIP":"Only updated in the last 30 days ","NAME":"Last 30 days","LONG":"Only updated in the last 30 days "},"HEADER":"Date Updated:","COLLAPSE":"Collapse the date updated filter"},"PERMISSION":{"OUTBOUND":{"EDIT_LONG":"Shared with as an editor","VIEW_LONG":"Files other people can read but not edit","TITLE":"Role","VIEW_TOOLTIP":"Files other people can read but not edit","EXPAND":"Expand the role filter","HEADER":"Role:","COLLAPSE":"Collapse the role filter","EDIT_TOOLTIP":"Show only files other people can edit"},"VIEW":"Reader","INBOUND":{"EDIT_LONG":"Shared as an editor","VIEW_LONG":"Files you can read but not edit","TITLE":"Role","VIEW_TOOLTIP":"Files you can read but not edit","EXPAND":"Expand the role filter","HEADER":"Role:","COLLAPSE":"Collapse the role filter","EDIT_TOOLTIP":"Show only files I can edit"},"EDIT":"Editor"},"SHARED_BY":{"OPTION_EMPTY":"By a specific person:","NOT_PUBLIC_LONG":"Shared by you and not visible to everyone in the owner\'s organization","OPTION_EMPTY_TOOLTIP":"Only show files that were shared by a specific person","PUBLIC":"and everyone in my organization","COLLAPSE":"Collapse the shared by filter","PUBLIC_TOOLTIP":"Files that are shared by you and visible to everyone in the owner\'s organization","PUBLIC_LONG":"Shared by you and visible to everyone in the owner\'s organization","NOT_PUBLIC":"and not everyone in my organization","OPTION":"by ${0}","FILTER":"Shared by ${0}","TITLE":"Shared By","NOT_PUBLIC_TOOLTIP":"Files that are shared by you but are not visible to everyone in the owner\'s organization","EXPAND":"Expand the shared by filter"},"DATE_SHARED":{"TODAY":{"TOOLTIP":"Only shared since midnight today","NAME":"Today","LONG":"Only shared since midnight today "},"LASTYEAR":{"TOOLTIP":"Only shared in the last 365 days","NAME":"Last 365 days","LONG":"Only shared in the last 365 days "},"TITLE":"Date Shared","EXPAND":"Expand the date shared filter","LASTWEEK":{"TOOLTIP":"Only shared in the last 7 days","NAME":"Last 7 days","LONG":"Only shared in the last 7 days "},"LASTMONTH":{"TOOLTIP":"Only shared in the last 30 days ","NAME":"Last 30 days","LONG":"Only shared in the last 30 days "},"HEADER":"Date Shared:","COLLAPSE":"Collapse the date shared filter"},"ALL_TAGS":{"TITLE":"${company} tags","EXPAND":"Expand the tags filter","COLLAPSE":"Collapse the tags filter","HEADER":"Public Tags:"},"DATE_CREATED":{"TODAY":{"TOOLTIP":"Only created since midnight today ","NAME":"Today","LONG":"Only created since midnight today "},"LASTYEAR":{"TOOLTIP":"Only created in the last 365 days","NAME":"Last 365 days","LONG":"Only created in the last 365 days"},"TITLE":"Date Created","EXPAND":"Expand the date created filter","LASTWEEK":{"TOOLTIP":"Only created in the last 7 days ","NAME":"Last 7 days","LONG":"Only created in the last 7 days "},"LASTMONTH":{"TOOLTIP":"Only created in the last 30 days ","NAME":"Last 30 days","LONG":"Only created in the last 30 days "},"HEADER":"Date Created:","COLLAPSE":"Collapse the date created filter"},"COLLECTION_ROLE":{"CONTRIBUTOR_LONG":"Shared with as contributor","HEADER":"Role:","COLLAPSE":"Collapse the folder role filter","EDITOR":"Editor","MANAGER":"Owner","EDITOR_LONG":"Shared with as editor","MANAGER_LONG":"Shared with as owner","EDITOR_TOOLTIP":"Show only the folders to which I can edit","MANAGER_TOOLTIP":"Show only the folders I can share with other people","TITLE":"Role","EXPAND":"Expand the folder role filter","CONTRIBUTOR":"Contributor","CONTRIBUTOR_TOOLTIP":"Show only the folders to which I can add files"},"COLLECTION_SHARED_WITH_ME":{"PUBLIC_LONG":"Folders visible to everyone in the owner\'s organization","NOT_PUBLIC_SHORT":"but not my entire organization","NOT_PUBLIC":"and not visible to everyone in your organization","NOT_PUBLIC_LONG":"Folders that aren\'t visible to everyone in the owner\'s organization","PUBLIC_SHORT":"and my entire organization","NOT_PUBLIC_TOOLTIP":"Folders that aren\'t visible to everyone in your organization but are shared with one or more people","PUBLIC":"and organization","PUBLIC_TOOLTIP":"Folders that are shared with you and your organization"},"EVENT":{"SHARED_WITH":"Shared with","COMMENTS":"Comments","TITLE":"Events","PEOPLE_JOINED":"People joined","RECOMMENDATIONS":"Likes","MEDIA_UPDATES":"File updates"},"TYPE":{"FILES_LONG":"Uploaded files only","PAGES":"rich-text files","PAGES_LONG":"Rich-text files only","FILES":"uploaded files","PAGES_TOOLTIP":"All rich-text files created by this person","TITLE":"Type","EXPAND":"Expand the type filter","FILES_TOOLTIP":"Any file that was uploaded from a computer","COLLAPSE":"Collapse the type filter"},"COLLECTION_TYPE":{"PUBLIC_LONG":"Folders shared with everyone in your organization","PRIVATE":"With no one (private)","SHARED":"With specific people","SHARED_LONG":"Shared Folders","PRIVATE_TOOLTIP":"Folders that only I can see","PRIVATE_LONG":"Private to me","TITLE":"Sharing","SHARED_TOOLTIP":"Visible only to members but can contain any type of file","PUBLIC":"With an organization","EXPAND":"Expand the sharing filter","PUBLIC_TOOLTIP":"Visible to everyone in your organization and can only contain files with organization access.","COLLAPSE":"Collapse the sharing filter"},"SHARE":{"SELECTIVE_TOOLTIP":"Files that are not shared with everyone in your organization but are shared with one or more people","PRIVATE":"With no one (private)","NOT_PUBLIC_LONG":"Files that are not shared with everyone in your organization but are shared with one or more people","PRIVATE_TOOLTIP":"Files that only I can see","PUBLIC":"With an organization","HEADER":"Sharing:","PUBLIC_TOOLTIP":"Files that are visible to everyone in the owner\'s organization","COLLAPSE":"Collapse the sharing filter","PUBLIC_LONG":"Files that are visible to everyone in the owner\'s organization","NOT_PUBLIC":"With one or more people","PRIVATE_LONG":"Private to me","TITLE":"Sharing","NOT_PUBLIC_TOOLTIP":"Files that are not shared with everyone in your organization but are shared with one or more people","EXPAND":"Expand the sharing filter","SELECTIVE":"With one or more people","SELECTIVE_LONG":"Files that are not shared with everyone in your organization but are shared with one or more people"}},"OK":"OK","ADD_FILE_TO_COLLECTION":{"BULK_INFO_FAIL_X_IN_OTHER_FOLDERS":"${count} files were added to ${collectionlink}. Some files were failed due to permission limitation or reshare is off. Some files are also in other folders. View sharing tab of each file for details.","BULK_WARN_FAIL_SUCCESS_EXIST_INTERNAL_EXTERNAL_1":"${filelink} was added in ${collectionlink}. Some files were already added in the folder. Some files were not added because ${collectionlink} is a folder that can be shared outside of your organization and the files cannot.","BULK_WARN_FAIL_INTERNAL_EXTERNAL_1":"${filelink} was added in ${collectionlink}. Some files were not added because ${collectionlink} is a folder that can be shared outside of your organization and the files cannot.","NO_FILTERED_COLLECTIONS":"You are not a contributor or owner of any folder with the specified name.","BULK_WARN_FAIL_SUCCESS_EXIST_ACCESS_DENIED_1":"${filelink} was added in ${collectionlink}. Some files were already added in the folder. Some files were not added because you do not have permission.","BULK_INFO_FAIL_X_EXIST_RESHAREOFF":"${count} files were added to ${collectionlink}. Some files have existed in the folder. Some files were not added because the owner does not allow others to share them.","BULK_WARN_FAIL_ACCESS_DENIED_1":"${filelink} was added in ${collectionlink}. Some files were not added because you do not have permission.","OK_TITLE":"Add this file to the selected folder","BULK_INFO_FAIL_ITEM_EXISTS_X_IN_OTHER_FOLDERS":"${count} files were added to ${collectionlink}. Some files are already in this folder. Some files are also in other folders. View sharing tab of each file for details.","INFO_SUCCESS_1_IN_OTHER_FOLDERS":"${filelink} was added to ${collectionlink}. ${undolink}. It is also in other folders. View the sharing tab of this file for details.","ACTION_ENABLED":"Add to folder button is enabled","NO_PRIVATE_COLLECTIONS":"You cannot add a shared or private file to a public folder. You do not have a private folder at this time.","FILTER_TOOLTIP":"Enter a folder name","WARN_PUBLIC_XX":"Adding these files to the selected folder will make the file public.","BULK_ERROR_FAIL_INTERNAL_EXTERNAL_1":"${filelink} was not added because ${collectionlink} is a folder that can be shared outside of your organization and the file cannot.","INFO_SUCCESS_SHARED_1":"${filelink} was added to ${collectionlink} and is now shared. ${undolink}","INFO_SUCCESS_PUBLIC_1":"${filelink} was added to ${collectionlink} and is now public. ${undolink}","BULK_ERROR_FAIL_ACCESS_DENIED_1":"${filelink} was not added because you do not have permission.","BULK_WARN_FAIL_SUCCESS_EXIST_INTERNAL_EXTERNAL_X":"${succeedcount} files were added in ${collectionlink}. Some files were already added in the folder. Some files were not added because ${collectionlink} is a folder that can be shared outside of your organization and the files cannot.","BULK_INFO_FAIL_PERMISSION_DENIED":"You do not have permission to add files to ${collectionlink}.","BULK_WARN_FAIL_INTERNAL_EXTERNAL_X":"${succeedcount} files were added in ${collectionlink}. Some files were not added because ${collectionlink} is a folder that can be shared outside of your organization and the files cannot.","ERROR_NOT_FOUND_1":"The file was not added because the selected folder has been deleted or is no longer shared with you.","ACTION_TOOLTIP_X":"Add ${0} files to a folder","LABEL_PUBLIC":"You are allowed to contribute to the following folders","BULK_INFO_FAIL_X_EXIST_COM":"${count} files were added to ${collectionlink}. Some files have existed in the folder. Some community files were not added into a personal folder.","BULK_WARN_FAIL_SUCCESS_EXIST_ACCESS_DENIED_X":"${succeedcount} files were added in ${collectionlink}. Some files were already added in the folder. Some files were not added because you do not have permission.","ACTION":"Add to Folder","BULK_WARN_FAIL_ACCESS_DENIED_X":"${succeedcount} files were added in ${collectionlink}. Some files were not added because you do not have permission.","BULK_WARN_FAIL_SUCCESS_EXIST_CONSTRAINTVIOLATION_1":"${filelink} was added in ${collectionlink}. Some files were already added in the folder. Some files were not added because ${collectionlink} is visibile to everyone in your organization. Only the owner can make this move.","BULK_WARN_FAIL_CONSTRAINTVIOLATION_1":"${filelink} was added in ${collectionlink}. some files were not added because ${collectionlink} is visibile to everyone in your organization. Only the owner can make this move.","MOST_RECENT_COLLECTION":"The last folder selected was ${collectionName}","BULK_INFO_FAIL_PERSONAL_TO_COMMUNITY":"You cannot move personal files shared with the community into a community folder.","BULK_WARN_FAIL_SUCCESS_EXIST_COMMUNITY_TO_PERSONAL_1":"${filelink} was added in ${collectionlink}. Some files were already added in the folder. Some files were not added because community files can not added in a personal folder.","INTERNAL_FOLDERS_ONLY":"This file cannot be added to folder that can be shared outside of your organization.","BULK_ERROR_FAIL_INTERNAL_EXTERNAL_X":"${count} files were not added to this folder because ${collectionlink} is a folder that can be shared outside of your organization and the files cannot.","BULK_INFO_FAIL_COMMUNITY_TO_PERSONAL_X":"${count} files were added to ${collectionlink}. Some community files were not added into a personal folder.","BULK_WARN_FAIL_COMMUNITY_TO_PERSONAL_1":"${filelink} was added in ${collectionlink}. Some files were not added because community files can not added in a personal folder.","INFO_SUCCESS_SHARED_X":"${filelink} was added to ${count} folders and is now shared. ${undolink}","BULK_ERROR_FAIL_EXISTS_1":"${filelink} was already in ${collectionlink}.","SHOW_ONLY_SOME_FOLDERS":"Showing only folders to which you can add this content.","INFO_SUCCESS_PUBLIC_X":"${filelink} was added to ${count} folders and is now public. ${undolink}","BULK_INFO_FAIL_VISIBILITY":"Files were not added because ${collectionlink} is visibile to everyone in your organization, only the owner can add files to public folder.","BULK_ERROR_FAIL_ACCESS_DENIED_X":"${count} files were not added because you do not have permission.","BULK_INFO_SUCCESS_X_IN_OTEHR_FOLDER":"${count} files were added to ${collectionlink}. Some files are also in other folders. View sharing tab of each file for details.","ERROR_NOT_FOUND_X":"The file was not added because one or more of the selected folders have been deleted or are no longer shared with you.","BULK_ERROR_FAIL_CONSTRAINTVIOLATION_1":"${filelink} was not added because ${collectionlink} is visibile to everyone in your organization. Only the owner can make this move.","BULK_WARN_FAIL_SUCCESS_EXIST_PERSONAL_TO_COMMUNITY_1":"${filelink} was moved in ${collectionlink}. Some files were already in the folder. Some files were not added because personal files can not added in a community folder.","BULK_INFO_FAIL_ITEM_EXISTS_1":"${count} file was added to ${collectionlink}. Some files are already in this folder.","BULK_INFO_FAIL_ITEM_EXISTS_1_IN_OTHER_FOLDERS":"${count} file was added to ${collectionlink}. Some files are already in this folder. Some files are also in other folders. View sharing tab of each file for details.","ERROR_NOT_LOGGED_IN":"The file was not added because you were not logged in.  Click \'Add to Folder\' to add the file.","BULK_INFO_FAIL_PERSONAL_TO_COMMUNITY_X":"${count} files were added to ${collectionlink}. Some personal files were not added into a community folder.","BULK_WARN_FAIL_PERSONAL_TO_COMMUNITY_1":"${filelink} was moved in ${collectionlink}. Some files were not added because personal files can not added in a community folder.","PRIVATE_FOLDERS_ONLY":"Only the file owner can add this file to a public folder.","BULK_WARN_FAIL_EXIST_INTERNAL_EXTERNAL_1":"${filelink} was already added in ${collectionlink}. Some files were not added because ${collectionlink} is a folder that can be shared outside of your organization and the files cannot.","BULK_ERROR_FAIL_COMMUNITY_TO_PERSONAL_1":"${filelink} was not added because community files were not added in a personal folder.","BULK_WARN_FAIL_EXISTS_1":"${filelink} was added in ${collectionlink}. ${existcount} files were already in the folder.","ACTION_DISABLED":"Add to folder button is disabled","BULK_WARN_FAIL_SUCCESS_EXIST_CONSTRAINTVIOLATION_X":"${succeedcount} files were added in ${collectionlink}. Some files were already added in the folder. Some files were not added because ${collectionlink} is visibile to everyone in your organization. Only the owner can make this move.","BULK_WARN_FAIL_EXIST_ACCESS_DENIED_1":"${filelink} was already added in ${collectionlink}. Some files were not added because you do not have permission.","BULK_WARN_FAIL_CONSTRAINTVIOLATION_X":"${succeedcount} files were added in ${collectionlink}. Some files were not added because ${collectionlink} is visibile to everyone in your organization. Only the owner can make this move.","BULK_WARN_FAIL_SUCCESS_EXIST_COMMUNITY_TO_PERSONAL_X":"${succeedcount} files were added in ${collectionlink}. Some files were already added in the folder. Some files were not added because community files can not added in a personal folder.","BULK_WARN_FAIL_COMMUNITY_TO_PERSONAL_X":"${succeedcount} files were added in ${collectionlink}. Some files were not added because community files can not added in a personal folder.","BULK_ERROR_FAIL_EXISTS_X":"${existcount} files were already in ${collectionlink}.","WARN_PUBLIC_1":"Adding this file to the selected folder will make the file public (shared with everyone).","BULK_WARN_FAIL_SUCCESS_EXIST_RESHARE_OFF_1":"${filelink} was added in ${collectionlink}. Some files were already added in the folder. Some files were not added because the owner does not allow others to share them.","FILTER":"Folders named \'${0}\'","BULK_INFO_SUCCESS_X":"${count} files were added to ${collectionlink}.","BULK_WARN_FAIL_RESHARE_OFF_1":"${filelink} was added in ${collectionlink}. Some files were not added because the owner does not allow others to share them.","HEADLESS":{"ERROR_CANCEL":"${filelink} was not added because the request was cancelled.","ERROR_ACCESS_DENIED_1":"You do not have permission to add files to ${collectionlink}.","ERROR_NOT_FOUND_1":"${filelink} was not added because ${filelink} or ${collectionlink} has been deleted or is no longer shared with you.","ERROR_UNSHAREABLE_FILE":"Only the file owner can add ${filelink} to a folder.","ERROR_NOT_FOUND_2":"Community-owned files cannot be added to a personal folder.","ERROR_ACCESS_DENIED_X":"You do not have permission to add files to one or more of the selected folders.","ERROR":"${filelink} was not added to ${collectionlink} due to an error.","ERROR_NOT_FOUND_X":"${filelink} was not added because ${filelink} or one or more of the selected folders have been deleted or are no longer shared with you.","ERROR_TIMEOUT":"${filelink} was not added because the server could not be contacted.","ERROR_EXTERNAL_COLLECTION":"${filelink} was not added because the folder can be shared outside of your organization and the file cannot.","ERROR_PUBLIC_COLLECTION":"Only the file owner can add ${filelink} to a public folder.","ERROR_NOT_LOGGED_IN":"${filelink} was not added because you were not logged in. Please log in and try again."},"BULK_ERROR_FAIL_PERSONAL_TO_COMMUNITY_1":"${filelink} was not added because personal files were not added in a community folder.","CANCEL":"Cancel","BULK_INFO_FAIL_X":"${count} files were added to ${collectionlink}. Some files were failed due to permission limitation or reshare is off.","INFO_EXISTS_1":"${filelink} was already in ${collectionlink}.","DIALOG_TITLE":"Add to Folder","BULK_ADD_COMMUNITY_ADD_MOVE_1":"${additem} was added to ${collectionlink}, ${movecount} files were moved to ${collectionlink}.","BULK_ERROR_FAIL_CONSTRAINTVIOLATION_X":"${count} files were not added because because ${collectionlink} is visibile to everyone in your organization. Only the owner can make this move.","BULK_WARN_FAIL_SUCCESS_EXIST_PERSONAL_TO_COMMUNITY_X":"${succeedcount} files were moved in ${collectionlink}. Some files were already in the folder. Some files were not added because personal files can not added in a community folder.","BULK_INFO_FAIL_ITEM_EXISTS_X":"${count} files were added to ${collectionlink}. Some files are already in this folder.","INFO_SUCCESS_1":"${filelink} was added to ${collectionlink}. ${undolink}","BULK_WARN_FAIL_PERSONAL_TO_COMMUNITY_X":"${succeedcount} files were moved in ${collectionlink}. Some files were not added because personal files can not added in a community folder.","BULK_WARN_FAIL_EXIST_INTERNAL_EXTERNAL_X":"${existcount} files were already added in ${collectionlink}. Some files were not added because ${collectionlink} is a folder that can be shared outside of your organization and the files cannot.","BULK_ERROR_FAIL_COMMUNITY_TO_PERSONAL_X":"${count} files were not added because community files were not added in a personal folder.","BULK_WARN_FAIL_EXISTS_X":"${succeedcount} files were added in ${collectionlink}. ${existcount} files were already in the folder.","ACTION_X":"Add to Folder","BULK_ERROR_FAIL_RESHARE_OFF_1":"${filelink} was not added because the owner does not allow others to share it.","BULK_WARN_FAIL_EXIST_ACCESS_DENIED_X":"${existcount} files were already added in ${collectionlink}. Some files were not added because you do not have permission.","SHARE_AS_EDITOR":"Allow members of the selected folder to edit this file","WARN_PUBLIC_X":"Adding this file to the selected folders will make the file public (shared with everyone).","BULK_WARN_FAIL_SUCCESS_EXIST_RESHARE_OFF_X":"${succeedcount} files were added in ${collectionlink}. Some files were already added in the folder. Some files were not added because the owner does not allow others to share them.","ERROR_PUBLIC_COLLECTION":"Only the file owner can add this file to a public folder.","BULK_WARN_FAIL_EXIST_CONSTRAINTVIOLATION_1":"${filelink} was already added in ${collectionlink}. Some files were not added because ${collectionlink} is visibile to everyone in your organization. Only the owner can make this move.","BULK_WARN_FAIL_RESHARE_OFF_X":"${succeedcount} files were added in ${collectionlink}. Some files were not added because the owner does not allow others to share them.","BULK_INFO_FAIL_RESHAREOFF":"The files cannot be moved here because the owner does not allow others to share them.","BULK_ERROR_FAIL_PERSONAL_TO_COMMUNITY_X":"${count} files were not added because personal files were not added in a community folder.","BULK_WARN_FAIL_EXIST_COMMUNITY_TO_PERSONAL_1":"${filelink} was already added in ${collectionlink}. Some files were not added because community files can not added in a personal folder.","INTERNAL_PRIVATE_FOLDERS_ONLY":"This file cannot be added to public folder or folders that can be shared outside of your organization.","INFO_EXISTS_X":"${filelink} was already in the selected folders.","BULK_ADD_COMMUNITY_ADD_MOVE_X":"${addcount} files were added to ${collectionlink}, ${movecount} files were moved to ${collectionlink}.","INFO_SUCCESS_X":"${filelink} was added to ${count} folders. ${undolink}","BULK_ADD_COMMUNITY_MOVE_X":"${count} files were moved to ${collectionlink}.","DESCRIPTION_LABEL":"Description: ","ERROR_ACCESS_DENIED_1":"You do not have permission to add files to the selected folder.","ERROR_CANCEL":"The file was not added because the request was cancelled.  Click \'Add to Folder\' to try your request again.","BULK_INFO_FAIL_COMMUNITY_TO_PERSONAL":"You cannot move community files into a personal folder that is shared with the community.","ERROR_UNSHAREABLE_FILE":"Only the file owner can add this file to a folder.","BULK_ERROR_FAIL_RESHARE_OFF_X":"${count} files were not added because the owner does not allow others to share them.","FIND":"Find","BULK_WARN_FAIL_EXIST_PERSONAL_TO_COMMUNITY_1":"${filelink} was already in ${collectionlink}. Some files were not added because personal files can not added in a community folder.","ERROR_EXTERNAL_COLLECTION":"The file was not added to this folder because the folder can be shared outside of your organization and the file cannot. ","ALLOW_EDITORS_TO_EDIT_THIS_FILE":"Allow folder editors to edit this file","SELECT_COLLECTION":"You must select a folder that this file will be added to.","BULK_WARN_FAIL_EXIST_CONSTRAINTVIOLATION_X":"${existcount} files were already added in ${collectionlink}. Some files were not added because ${collectionlink} is visibile to everyone in your organization. Only the owner can make this move.","BULK_ADD_COMMUNITY_MOVE_ADD_1":"${additem} was added to ${collectionlink}, ${moveitem} was moved to ${collectionlink}.","BULK_INFO_FAIL_ALL_ITEM_EXISTS_X":"All the selected files were already in ${collectionlink}. ","BULK_WARN_FAIL_EXIST_COMMUNITY_TO_PERSONAL_X":"${existcount} files were already added in ${collectionlink}. Some files were not added because community files can not added in a personal folder.","BULK_INFO_FAIL_X_EXIST_PER":"${count} files were added to ${collectionlink}. Some files have existed in the folder. Some personal files were not added into a community folder.","BULK_WARN_FAIL_EXIST_RESHARE_OFF_1":"${filelink} was already added in ${collectionlink}. Some files were not added because the owner does not allow others to share them.","ERROR_ACCESS_DENIED_X":"You do not have permission to add files to one or more of the selected folders.","ACTION_TOOLTIP":"Add this file to a folder","OK":"Add to Folder","BULK_WARN_FAIL_EXIST_PERSONAL_TO_COMMUNITY_X":"${existcount} files were already in ${collectionlink}. Some files were not added because personal files can not added in a community folder.","UNDO":{"ERROR_PUBLIC":{"CANCEL_ONE":"${filelink} was not removed from ${collectionlink} and is still public because the request was cancelled.","TIMEOUT":"Public access to ${filelink} was not removed because the server could not be contacted.","UNKNOWN_ONE":"${filelink} was not removed from ${collectionlink} and is still public due to an error.","CANCEL_MANY":"${filelink} was not removed from ${count} folders and is still public because the request was cancelled.","UNKNOWN_MANY":"${filelink} was not removed from ${count} folders and is still public due to an error.","TIMEOUT_ONE":"${filelink} was not removed from ${collectionlink} and is still public because the server could not be contacted.","UNKNOWN":"Public access to ${filelink} was not removed due to an error.","CANCEL":"Public access to ${filelink} was not removed because the request was cancelled.","TIMEOUT_MANY":"${filelink} was not removed from ${count} folders and is still public because the server could not be contacted."},"STATUS":"Removing...","INFO_SUCCESS_SHARED_1":"${filelink} was removed from ${collectionlink} and is no longer shared.","INFO_SUCCESS_1":"${filelink} was removed from ${collectionlink}.","ACTION":"Undo","INFO_SUCCESS_PUBLIC_1":"${filelink} was removed from ${collectionlink} and is no longer public.","ERROR_BASE":{"CANCEL_ONE":"${filelink} was not removed from ${collectionlink} because the request was cancelled.","TIMEOUT":"${filelink} was not removed because the server could not be contacted.","UNKNOWN_ONE":"${filelink} was not removed from ${collectionlink} due to an error.","UNKNOWN_MANY":"${filelink} was not removed from ${count} folders due to an error.","CANCEL_MANY":"${filelink} was not removed from ${count} folders because the request was cancelled.","TIMEOUT_ONE":"${filelink} was not removed from ${collectionlink} because the server could not be contacted.","UNKNOWN":"${filelink} was not removed due to an error.","CANCEL":"${filelink} was not removed because the request was cancelled.","TIMEOUT_MANY":"${filelink} was not removed from ${count} folders because the server could not be contacted."},"INFO_SUCCESS_SHARED_X":"${filelink} was removed from ${count} folders and is no longer shared.","INFO_SUCCESS_X":"${filelink} was removed from ${count} folders.","INFO_SUCCESS_PUBLIC_X":"${filelink} was removed from ${count} folders and is no longer public."},"ACTION_LONG":"Add to Folder...","ERROR":"The file was not added due to an error.","ERROR_TIMEOUT":"The file was not added because the server could not be contacted.  Click \'Add to Folder\' to try your request again.","MOST_RECENT_COLLECTION_TOOLTIP":"Add file to this folder","NO_COLLECTIONS_FOR_EDITOR_OR_OWNER":"You are not an editor or owner of any folders.","BULK_ADD_COMMUNITY_MOVE_ADD_X":"${addcount} files were added to ${collectionlink}, ${moveitem} was moved to ${collectionlink}.","OK_ADD_HERE":"Add Here","STATUS":"Adding...","NO_COLLECTIONS":"You are not a contributor or owner of any folders.","BULK_WARN_FAIL_EXIST_RESHARE_OFF_X":"${existcount} files were already added in ${collectionlink}. Some files were not added because the owner does not allow others to share them.","LABEL_PRIVATE":"You are allowed to contribute to the following private folders","BUSY":"Adding...","NO_FILTERED_COLLECTIONS_FOR_EDITOR_OR_OWNER":"You are not an editor or owner of any folder with the specified name."},"NAVIGATION_ALT":"Main navigation","DOCUMENTCONTENT":{"DOWNLOAD_WITH_FILE_SYNC_TOOLTIP":"This file is enabled for sync. Click to manually download ${0} (${1}).","LABEL_LOCKED_BY":{"MONTH":"Locked on ${date} by ${user}. ${unlock}","TODAY":"Locked at ${time} by ${user}. ${unlock}","YESTERDAY":"Locked yesterday at ${time} by ${user}. ${unlock}","DAY":"Locked on ${date} by ${user}. ${unlock}","YEAR":"Locked on ${date_long} by ${user}. ${unlock}","FULL":"Locked on ${date_long} ${time_long} by ${user}. ${unlock}"},"DOWNLOAD_HTML":"Download as HTML","DOWNLOAD_TOOLTIP_V":"${0} Download this version (${1})","DOWNLOAD":"Download (${0})","NAME":"Filename:","DOWNLOAD_RTF":"RTF","SHAREDWITH_LINK":"Sharing","BROWSE_OTHER_UNK":"Browse Files","ATTACHMENTS":"Attachments (${0})","UNSELECT_ALL":"Unselect all items","SHARE_PROPAGATE_OFF":"Only the owner can share this file.","DOWNLOAD_PDF":"PDF","VERSIONS":"Versions (${0})","SHARE_INTENT":"Shared externally","DOWNLOAD_WARN_LONG":"This file may not download properly because it has a long file name.  To ensure a successful download, use your browser\'s Save As feature to download this file.","LABEL_UPDATED_OTHER":{"MONTH":"${user} updated on ${MMM} ${d}","TODAY":"Updated today at ${time} by ${user}","YESTERDAY":"Updated yesterday at ${time} by ${user}","DAY":"${user} updated on ${EEee} at ${time}","YEAR":"Updated on ${date_long} by ${user}","FULL":"${EEEE}, ${date_long} ${time_long}"},"PREVIEW":"Preview","REQUIRED_NAME":"*Name: ","SHAREDWITH":"Sharing","DOWNLOAD_TOOLTIP":"Download ${0} (${1})","OPEN_APP_TOOLTIP":"Open this file in the Files application","LABEL_SHARED":{"MONTH":"Shared ${MMM} ${d}","TODAY":"Shared today at ${time}","YESTERDAY":"Shared yesterday at ${time}","DAY":"Shared ${EEee}","YEAR":"Shared ${date_long}","FULL":"${EEEE}, ${date_long} ${time_long}"},"LABEL_UPDATED":{"MONTH":"Updated ${MMM} ${d}","TODAY":"Updated today at ${time}","YESTERDAY":"Updated yesterday at ${time}","DAY":"Updated ${EEee} at ${time}","YEAR":"Updated ${date_long}","FULL":"${EEEE}, ${date_long} ${time_long}"},"LABEL_ADDED":{"MONTH":"Created ${MMM} ${d}","TODAY":"Created today at ${time}","YESTERDAY":"Created yesterday at ${time}","DAY":"Created ${EEee} at ${time}","YEAR":"Created ${date_long}","FULL":"${EEEE}, ${date_long} ${time_long}"},"PICKER_WITH_FILE_SYNC_TOOLTIP":"${0} This file is enabled for sync.","SELECT_ALL":"Select all items","DOWNLOAD_NEW_VERSION":"(new version available) ","LABEL_ADDED_TO":{"MONTH":"Added ${MMM} ${d}","TODAY":"Added today at ${time}","YESTERDAY":"Added yesterday at ${time}","DAY":"Added ${EEee} at ${time}","YEAR":"Added ${date_long}","FULL":"${EEEE}, ${date_long} ${time_long}"},"LABEL_SHARED_BY":{"MONTH":"Shared by ${user} on ${MMM} ${d}","TODAY":"Shared by ${user} today at ${time}","YESTERDAY":"Shared by ${user} yesterday at ${time}","DAY":"Shared by ${user} on ${EEee}","YEAR":"Shared by ${user} on ${date_long}","FULL":"${EEEE}, ${date_long} ${time_long}"},"CREATE_NEW_PAGE":"Create Rich-text File ","DOWNLOAD_PAGE_AS_RTF_TOOLTIP":"Download this file as rich text (${0})","DOWNLOAD_DISABLED_WITH_FILE_SYNC_TOOLTIP":"This file is enabled for sync.","LABEL_LOCKED":{"MONTH":"Locked on ${date}. ${unlock}","TODAY":"Locked at ${time}. ${unlock}","YESTERDAY":"Locked yesterday at ${time}. ${unlock}","DAY":"Locked on ${date}. ${unlock}","YEAR":"Locked on ${date_long}. ${unlock}","FULL":"Locked on ${date_long} ${time_long}. ${unlock}"},"SHARE_PROPAGATE_ON":"All readers can share this file.","NO_CONTENT":"No content","DESCRIPTION":"Description:","DOWNLOAD_LABEL":"Download as: ","SHARE_PROPAGATE_OWNER":"Allow other people to share this file?  When checked, everyone who can see the file will be able to share it.","DOWNLOAD_WARN":"!","SHARE_PROPAGATE_PUBLIC":"Everyone can share this file.","PREVIEW_TITLE":"Preview this file in a new window.","DOWNLOAD_PAGE_AS_PDF_TOOLTIP":"Download this file as a PDF (${0})","NODESCRIPFILE":"No description for this file","DOWNLOAD_PAGE_AS_HTML_TOOLTIP":"Download this file as html (${0})","LABEL_ADDED_OTHER":{"MONTH":"${user} created on ${MMM} ${d}","TODAY":"${user} created today at ${time}","YESTERDAY":"${user} created yesterday at ${time}","DAY":"${user} created on ${EEee} at ${time} ","YEAR":"${user} created on ${date_long}","FULL":"${EEEE}, ${date_long} ${time_long}"},"ERRORS":{"AUTH_REQUIRED_ANON":{"TITLE":"Log in to Files","MESSAGES":"To change whether you are following this file you must be logged in to Files. "},"ACCESS_DENIED_ANON":{"TITLE":"Access Denied","MESSAGES":"You do not have permission to view this file.  If this is your file or it has been shared with you, you must log in to Files first. "},"ACCESS_DENIED":{"TITLE":"Access Denied","MESSAGES":"You do not have permission to view this file.  The file is not shared with you."},"NOT_FOUND":{"TITLE":"File Not Found","MESSAGES":"The file you have requested has been deleted or moved or quarantined. If someone sent you this link, check that it is correct."},"LOGIN":"Log in now","VERSION_NOT_FOUND":"The version you requested does not exist."},"OPEN_TOOLTIP":"View this file in the browser","SHARE_INTENT_T":"Shared externally","OPEN_THIS":"Open this file","COMMENTS":"Comments (${0})","DOWNLOAD_THIS":"Download this file ","NODESCRIPPAGE":"No description for this file","LABEL_ADDED_TO_OTHER":{"MONTH":"${user} added on ${MMM} ${d}","TODAY":"Added by ${user} today at ${time}","YESTERDAY":"Added by ${user} yesterday at ${time}","DAY":"${user} added on ${EEee} at ${time} ","YEAR":"Added by ${user} on ${date_long}","FULL":"${EEEE}, ${date_long} ${time_long}"},"BROWSE_OTHER":"Browse Files from ${0}"},"ADD_TO_COMMUNITYCOLLECTION":{"SELECT_COLLECTION":"You must select a folder that this file will be added to.","DIALOG_TITLE":"Add to Folder","INFO_SUCCESS_1":"${filelink} has been successfully added to ${collectionlink}.","ACTION_LONG":"Add to Folder...","INFO_SUCCESS_2":"${filelink} has been successfully moved to ${collectionlink}.","HINT":"Add ${0} to one of the following Community folders.","ERROR":"The file was not added due to an error.","ERROR_TIMEOUT":"The file was not added because the server could not be contacted.  Click \'Add to Folder\' to try your request again.","ERROR_CANNOT_MOVE_PERSONALFILE_TO_COMMUNITYFOLDER":"You cannot move a personal file into a community folder.","ERROR_CANNOT_MOVE_COMMUNITYFILE_TO_PERSONALFOLDER":"You cannot move a community file into a personal folder.","ERROR_NOT_FOUND_1":"The file was not added because the selected folder has been deleted.","ERROR_CANCEL":"The file was not added because the request was cancelled.  Click \'Add to Folder\' to try your request again.","OK_ADD_HERE":"Add Here","ERROR_ACCESS_DENIED_1":"You do not have permission to add the file to the selected folder.","OK_TITLE":"Add this file to the selected folder","ACTION":"Add to Folder","BUSY":"Adding...","CANCEL":"Cancel","ACTION_TOOLTIP":"Add this file to a folder","OK":"Add to Folder","ERROR_NOT_LOGGED_IN":"The file was not added because you were not logged in.  Click \'Add to Folder\' to add the file.","INFO_EXISTS_1":"${filelink} was already in ${collectionlink}."},"FILE_FOLDERS":{"EMPTY_COLLECTIONS":"None","ERROR":"Unable to load folder information","EXTERNAL":"This file is in the external folder:","HDNCLCT":"This file is in ${0} folder or community you do not have access to.","SHARE_INTENT_T":"Share Externally","HDNCLCT_MANY":"This file is in ${0} folders or communities you do not have access to.","EXTERNAL_MANY":"This file is in these external folders:","LABEL":"Shared with Folders: ","NO_COLLECTIONS":"This file has not been added to any folders yet.","SHOW_MORE":"Show more folders...","TITLE":"Folders","PRIVATE_LABEL":"Private:","SHARED_LABEL":"Shared:","SHARE_AS_EDITOR":"${0} (with edit)","NOT_ALLOW_SHARE_WARNING":"This file cannot be shared to individuals or other communities.","NO_COLLECTION":"This file has not been added to any folder yet.","LOADING":"Loading...","COMMUNITY_LABEL":"Community: ","PUBLIC_LABEL":"Public: "},"SUCCESS":"Success","SUCCESS_COLON":"Success:","VIEW_ALL":"View All","ERROR":"Error","EDIT_GROUP":{"ACTION":"Edit","ACTION_TOOLTIP":"Edit this document"},"A11Y_READER_ADDED":"Selected ${0} as a reader","BACK_TO_FILES":"Back to Files","EDIT_COLLECTION":{"NAME_HEADER":"Name: ","DIALOG_TITLE":"Edit Folder Properties","WARN_INVALID_CHARS_IN_NAME":"Folder names may not contain the following characters: \\ / : * ? \" \x3c \x3e |","WARN_CHANGE_VISIBILITY":"Making this folder public will remove any private or shared files.","TRIM_LONG_FILENAME":"Shorten name?","ERROR_CONCURRENT_MODIFICATION":"This folder was edited by ${user} on ${EEEE}, ${date_long} ${time_long}. Clicking \'Save\' will overwrite the changes.   ","INFO_SUCCESS":"${link} was saved successfully.","TRIM_LONG_DESCRIPTION":"Shorten description?","NAME_LABEL_TITLE":"Name","ACTION_TOOLTIP":"Edit this folder","OK":"Save","ERROR_NOT_LOGGED_IN":"The folder was not modified because you were not logged in.  Click \'Save\' to update the folder.","NAME_LABEL":"Name:","WARN_SPECIFY_NAME":"Name is a required field.","ACTION_LONG":"Edit Properties...","ERROR":"The folder was not modified due to an error.","ERROR_TIMEOUT":"The folder was not modified because the server could not be contacted.  Click \'Save\' to try your request again.","REQUIRED_MARK":"* Required","DESCRIPTION_LABEL":"Description: ","ERROR_CANCEL":"The folder was not modified because the request was cancelled.  Click \'Save\' to try your request again.","FIX_INVALID_CHARS_IN_NAME":"Replace invalid characters with \'_\'?","WARN_LONG_FILENAME":"The name is too long. ","WARN_LONG_DESCRIPTION":"The description you entered is too long. ","ERROR_FILENAME_INVALID_CHARACTERS":"The folder name cannot include the following characters: \\ / : * ?  \x3c \x3e |\"","ACTION":"Edit Properties","SUB_FODLER_ERROR_NAME_EXISTS":"There is already a folder named \'${folder}\' in this folder. Try another name.","ERROR_NAME_EXISTS":"The folder cannot be renamed because another folder has the same name.","BUSY":"Saving...","REQUIRED_FIELD":"Required field","CANCEL":"Cancel","TOP_LEVEL_FODLER_ERROR_NAME_EXISTS":"You already own a top level folder named \'${folder}\'. Try another name.","PUBLIC_LABEL":"Make this folder public","ERROR_NOT_FOUND":"The folder was not modified because it has been deleted or is no longer shared with you.","ERROR_ACCESS_DENIED":"You do not have permission to edit this folder."},"COMMENTS":{"ADD_COMMENT":"Add a comment...","ERROR_EDIT":"Your comment could not be updated.  Please try again later.","ERROR_EDIT_TIMEOUT":"Your comment could not be updated because the server could not be contacted.  Click \'Save\' to try again.","ERROR_CREATE_CANCEL":"Your comment could not be saved because the request was cancelled.  Click \'Save\' to try again.","NEXT_T":"Next page","EXTERNAL_WARNING":"Comments might be seen by people external to your organization.","EDIT":"Edit","PREVIOUS_T":"Previous page","PAGE":"Page","ERROR_NO_CONTENT":"Enter your comment and click \'Save\'.  If you no longer want to leave a comment click \'Cancel\'.","PAGING_BOTTOM_LABEL":"Paging options","DELETECONFIRM":"Are you sure you want to delete this comment?","WARN_LONG_COMMENT":"The comment is too long.","ERROR_NO_CONTENT_EDIT":"Enter your comment and click \'Save\'.  If you no longer want to edit your comment click \'Cancel\'.","ERROR_EDIT_ACCESS_DENIED":"Your comment could not be updated because the file has been deleted or is no longer shared with you.","ERROR_MENTIONS_NO_PERMISSION_COMMUNITY":"The following people that you mentioned cannot view the comment because they are not members of the community.","ERROR_EDIT_NOT_FOUND":"Your comment could not be updated because the file has been deleted or is no longer shared with you.","SORT_BY":"Sort by:","ERROR_REQUEST_TIMEOUT":"The server could not be contacted.","LOADING":"Loading comments...","NOHYPHENCOUNT":"${0} of ${1}","COMMENT_EDITED":{"MONTH":"Edited on ${MMM} ${d}","TODAY":"Edited today at ${time}","YESTERDAY":"Edited yesterday at ${time}","DAY":"Edited on ${EEEE}","YEAR":"Edited on ${date_long}"},"DELETE":"Delete","EMPTY":"There are no comments.","COMMENT_COUNT_MANY":"${0} comments","DELETEREASON":"Reason for deleting this comment:","SUBSCRIBE_TO":"Feed for these Comments","ERROR_CREATE":"Your comment could not be saved.  Please try again later.","DELETECOMMENT":"Delete Comment","ERROR_CREATE_TIMEOUT":"Your comment could not be saved because the server could not be contacted.  Click \'Save\' to try again.","ERROR_MENTIONS_VALIDATE":"Your mentioned user in comment could not be validated. Please try again later.","ERROR_MENTIONS_VALIDATE_TIMEOUT":"Your mentioned user in comment could not be validated because the server could not be contacted. Please try again later.","ERROR_EDIT_NOT_LOGGED_IN":"Your comment could not be updated because you were not logged in.  Click \'Save\' to update your comment.","ERROR_DELETE_NOT_FOUND":"Your comment could not be deleted because the file has been deleted or is no longer shared with you.","ERROR_DELETE_ACCESS_DENIED":"Your comment could not be deleted because the file has been deleted or is no longer shared with you.","COUNT_ALT":"Showing comments ${0} through ${1} of ${2}","ADD_COMMENT_SUCCESS_PRE_MODERATION":"The comment has been submitted for review and will be available when approved. ","DELETE_T":"Permanently delete this comment","FLAG_T":"Flag this comment as inappropriate","ERROR_MENTIONS_VALIDATE_CANCEL":"Your mentioned user in comment could not be validated because the request was cancelled. Please try again later.","SHOW_ALT":"Show ${0} items per page","COMMENT_CREATED":{"MONTH":"${user} commented on ${timestamp} (version ${version})","TODAY":"${user} commented ${timestamp} (version ${version})","YESTERDAY":"${user} commented ${timestamp} (version ${version})","DAY":"${user} commented on ${timestamp} (version ${version})","YEAR":"${user} commented on ${timestamp} (version ${version})"},"JUMP_TO_LAST":"Most recent","ERROR_CREATE_ACCESS_DENIED":"Your comment could not be saved because the file has been deleted or is no longer shared with you.","ERROR_REQUEST_CANCELLED":"The request was cancelled.","ERROR_CREATE_NOT_FOUND":"Your comment could not be saved because the file has been deleted or is no longer shared with you.","ERROR_MENTIONS_VALIDATE_ACCESS_DENIED":"Your mentioned user in comment could not be validated because the file has been deleted or is no longer visible to you.","ERROR_MENTIONS_VALIDATE_NOT_FOUND":"Your mentioned user in comment could not be validated because the file has been deleted or is no longer visible to you.","VIEW_COMMENTS_FILE":"View comments on this file","ERROR_MENTIONS_NO_PERMISSION":"The following people that you mentioned cannot view the comment because they do not have access to the content.","ITEMS_PER_PAGE":" items per page","ELLIPSIS":"...","COMMENT_LABEL":"Enter your comment:","SUBSCRIBE_TO_TOOLTIP":"Follow changes to these comments through your feed reader","COMMENT_QUARANTINED":{"MONTH":"This comment was removed by ${user} on ${date}","TODAY":"This comment was removed by ${user} today at ${time}","YESTERDAY":"This comment was removed by ${user} yesterday at ${time}","DAY":"This comment was removed by ${user} on ${date}","YEAR":"This comment was removed by ${user} on ${date_long}"},"PAGING_TOP_LABEL":"Paging","ERROR_DELETE_NOT_LOGGED_IN":"Your comment was not deleted because you were not logged in.  Click \'Delete\' to delete your comment.","PAGE_ALT":"Page ${0} of ${1}","TRIM_LONG_COMMENT_CONFIRM":"Shortening will remove the text beyond the comment limit.  Click \'OK\' to shorten or \'Cancel\' to edit the comment yourself.","NOTIFY_LABEL":"Follow this file to get notified when comments or updates are posted","EDIT_T":"Edit this comment","VIEW_COMMENTS_PAGE":"View comments on this file","ERROR_DELETE":"Your comment could not be deleted.  Please try again later.","ERROR_DELETE_TIMEOUT":"Your comment could not be deleted because the server could not be contacted.  Click \'Delete\' to try again.","COMMENT_CREATED_TIME":{"MONTH":"${MMM} ${d}","TODAY":"today at ${time}","YESTERDAY":"yesterday at ${time}","DAY":"${EEEE} at ${time}","YEAR":"${date_long}"},"ERROR":"An unknown error has occurred.","SUBSCRIBE_TO_TITLE":"Comments for ${0}","ERROR_CREATE_NOT_LOGGED_IN":"Your comment was not saved because you were not logged in.  Click \'Save\' to add your comment.","FLAG":"Flag as Inappropriate","MENTIONS_TOOLTIP":"Note: Only people that have access to the content will see the comment.","COUNT":"${0}-${1} of ${2}","NEXT":"Next","COMMENT_COUNT_ONE":"${0} comment","PREVIOUS":"Previous","ERROR_DELETE_CANCEL":"Your comment could not be deleted because the request was cancelled.  Click \'Delete\' to try again.","COMMENT_PENDING":"This comment is pending review.","ERROR_EDIT_CANCEL":"Your comment could not be updated because the request was cancelled.  Click \'Save\' to try again.","TRIM_LONG_COMMENT":"Shorten comment?","COMMENT_DELETED":{"MONTH":"Comment deleted by ${user} on ${MMM} ${d}","TODAY":"Comment deleted by ${user} today at ${time}","YESTERDAY":"Comment deleted by ${user} yesterday at ${time}","DAY":"Comment deleted by ${user} on ${EEEE} at ${time}","YEAR":"Comment deleted by ${user} on ${date_long}"},"LINK":"Link","CANCEL":"Cancel","SAVE":"Save","COMMENT_REJECTED":{"MONTH":"This comment was rejected by ${user} on ${date}","TODAY":"This comment was rejected by ${user} today at ${time}","YESTERDAY":"This comment was rejected by ${user} yesterday at ${time}","DAY":"This comment was rejected by ${user} on ${date}","YEAR":"This comment was rejected by ${user} on ${date_long}"}},"MOVE_TO_COLLECTION":{"DIALOG_TITLE":"Move to Folder","SELECT_COLLECTION":"You must select a folder that this file will be moved to.","INFO_SUCCESS_1":"${filelink} has been successfully moved to ${collectionlink}.","HINT":"Move ${0} from ${1} to a different Community folder.","ERROR":"The file was not moved due to an error.","ERROR_TIMEOUT":"The file was not moved because the server could not be contacted.  Click \'Move to Folder\' to try your request again.","ERROR_CANCEL":"The file was not moved because the request was cancelled.  Click \'Move to Folder\' to try your request again.","ERROR_NOT_FOUND_1":"The file was not moved because the selected folder has been deleted.","ERROR_ACCESS_DENIED_1":"You do not have permission to move the file to the selected folder.","OK_TITLE":"Move this file to the selected folder","ACTION":"Move to Folder","BUSY":"Moving...","CANCEL":"Cancel","ACTION_TOOLTIP":"Move this file to a folder","OK_MOVE_HERE":"Move Here","OK":"Move to Folder","ERROR_NOT_LOGGED_IN":"The file was not moved because you were not logged in.  Click \'Move to Folder\' to move the file.","INFO_EXISTS_1":"${filelink} was already in ${collectionlink}."},"BACK_TO_COMMUNITY_FILES":"Back to community files","SHARE_TO_COMMUNITY_FILE":{"DIALOG_TITLE":"Share File with this Community","ACTION":"Share File with Community...","ACTION_TOOLTIP":"See files Community have shared with you ","OK":"Share Files"},"SAVING":"Saving...","UPLOAD_FILE":{"ACTION_IN_MENU":"Upload...","ACTION":"Upload Files","ACTION_TOOLTIP":"Upload files from your computer","ACTION_KEY_SHORTCUT":"u"},"SHARE_FILE":{"DIALOG_TITLE":"Share File","EDITOR_LABEL":"Editors: ","INFO_SUCCESS_1":"${item} was shared successfully.","MESSAGE_TEXT":"Add an optional message","SHARE_PRI":"This file is private.","EXTERNAL_WARNING":"You can share this file with people external to your organization.","EDITOR_ROLE":"as Editor","SHARE_COMMUNITY_VISIBLE_WARN":"Sharing with this community \'${0}\' will make this file visible to your entire organization.","ACCESS_DENIED_ERROR_LOCKED":"The file was not shared because the file is locked by another user, try again later.","VISIBILITY_PUBLIC_LABEL":"Everyone in my organization","EXTERNAL_SHARES_ERROR_MANY":"${item} can only be shared inside your organization.","SHARE_SHR_0":"This file is shared.","SHARE_TYPE_LABEL":"Type","SHARE_SHR_1":"This file is shared with 1 person.","ERROR_1_NOT_LOGGED_IN":"${item} could not be shared because you were not logged in. Log in and share again.","READER_LABEL_TITLE":"Readers","SHARE_COL_1":"It is also in a folder or community.","ERROR_1_MAX_SHARES":"${item} was not shared because the maximum number of shares has been exceeded.","SELECT_USER_ERROR":"Please select a person or community to share with.","ACTION_ENABLED":"Share button is enabled","VISIBILITY_PEOPLE_COMMUNITIES_LABEL":"People or Communities","DIALOG_TITLE_X":"Share Files","ERROR_1":"${item} could not be shared due to an error.","ERROR_1_TIMEOUT":"${item} was not shared because the server could not be contacted.","SELECT_USER_ERROR_E":"Please select a person to share with.","TRIM_LONG_MESSAGE":"Shorten message?","SELECTED_FILES_1":"1 file selected to share.","ADD_TOOLTIP":"Share with this user","SHARE_WITH_HEADER":"Share with:","SHARE_COL_E":"It is also in a folder.","SHARE_COL_F":"It is also in ${collections} folders.","OWNER_REFERENCE_ERROR":"You cannot share with the owner of the file.","VISIBILITY_NO_ONE_LABEL":"No one","SHARE_SHR_M":"This file is shared with ${people} people.","INFO_SUCCESS_X":"${count} files were shared successfully.","SHARE_COL_M":"It is also in ${collections} folders or communities.","VISIBILITY_PEOPLE_LABEL":"People","VISIBILITY_NO_ONE_DESCRIPTION":"(shared with me only)","ACTION_TOOLTIP_X":"Give others access to the selected files","ACTION":"Share","ERROR_X_CANCEL":"Some files may not have been shared because the request was cancelled.","EDITOR_LABEL_TITLE":"Editors","SHARE_COMMUNITY_WARN":"Sharing with the community \'${0}\' will make this file visible to everyone in your organization.","WARN_LONG_MESSAGE":"The message is too long.","NOT_FOUND_ERROR":"This file has been deleted or is no longer shared with you.","ERROR_1_CANCEL":"${item} may not have been shared because the request was cancelled.","ACCESS_DENIED_ERROR":"You no longer have permission to share this file.","ERROR_X":"${count} files could not be shared due to errors.","INVITATION_ERROR":"Content was not shared with the following people because you do not have permission to share with them: ${0}.","ERROR_1_VISIBILITY_RESTRICTION":"${item} was not shared because the file is restricted and may not be made visible to everyone in your organization.","SHARE_WITH":"Share with:","SHARE_ROLE_LABEL":"Role","SEARCH_TOOLTIP":"Person not listed? Use full search...","SELECTED_FILES_X":"${0} files selected to share.","SHARE_PUB_0":"This file is visible to ${company}. ","VISIBILITY_COMMUNITIES_LABEL":"Communities","SHARE_PUB_1":"This file is visible to ${company} and shared with 1 person.","EXTERNAL_SHARES_ERROR":"The file can only be shared inside your organization.","ADD_FROM_RECENT":"Recent shares","INFO_SUCCESS":"The file was shared successfully.","VISIBILITY_PUBLIC_DESCRIPTION":"","READER_LABEL":"Readers: ","ACTION_TOOLTIP":"Give others access to this file","OK":"Share","NOT_LOGGED_IN_ERROR":"The file was not shared because you were not logged in.  Click \'Share\' to share the file.","SELF_REFERENCE_ERROR":"You cannot share with yourself.","CANCEL_ERROR":"The file was not shared because the request was cancelled.  Click \'Share\' to try again.","ACTION_DISABLED":"Share button is disabled","ACTION_LONG":"Share...","ERROR":"The file could not be shared.  Please try again later.","TIMEOUT_ERROR":"The file was not shared because the server could not be contacted.  Click \'Share\' to try again.","SHARE_PUB_M":"This file is visible to ${company} and shared with ${people} people.","ERROR_1_ACCESS_DENIED":"${item} was not shared because you do not have permission to share this file.","ERROR_1_NOT_FOUND":"${item} has been deleted or is no longer shared with you.","READER_ROLE":"as Reader","MAX_SHARES_ERROR":"The maximum number of shares has been exceeded.","VISIBILITY_PEOPLE_DESCRIPTION":"(give specific file permissions to others)","BUSY":"Sharing...","CANCEL":"Cancel","NO_MEMBERS":"None","MESSAGE_LABEL":"Message:","SHARE_WITH_TITLE":"Share with"},"VISIBILITY_RESTRICTION":{"ERROR_EDIT":"A file that is visible to everyone in your organization may not be made restricted.","LABEL":"Restricted","ERROR_ADD_FILES_1":"A file that is restricted may not be made visible to everyone in your organization.","ERROR_SHARE":"A file that is restricted may not be made visible to everyone in your organization.","ERROR_UPLOAD":"A file that is restricted may not be made visible to everyone in your organization.","ERROR_ADD_FILES_X":"A file that is restricted may not be made visible to everyone in your organization.","ERROR_ADD_TO_FOLDER":"A file that is restricted may not be made visible to everyone in your organization."}};

;if(!dojo._hasResource["lconn.share.action.impl.FilePreviewDialog"]){
dojo._hasResource["lconn.share.action.impl.FilePreviewDialog"]=true;
(function(){
dojo.provide("lconn.share.action.impl.FilePreviewDialog");












dojo.requireLocalization("lconn.share","FileThumbnail");
dojo.requireLocalization("lconn.files","ui");
dojo.requireLocalization("lconn.files","community");












var _1=lconn.share.util.IBMDocs.ThumbnailConstants;
var _2=lconn.share.util.IBMDocs.ViewerAPI;
var _3=lconn.share.util.IBMDocs.ViewerRoutes;
dojo.declare("lconn.share.action.impl.FilePreviewDialog",[lconn.share.action.AbstractDialog],{previewConfig:lconn.share.previewConfig,feedItems:null,nls:null,constructor:function(_4){
this.iw=null;
this.scene=null;
this.feedItems=_4;
},videoConfig:{filePreviewBackgroundHeight:400,filePreviewBackgroundWidth:400,playArrowWidth:75,playArrowHeight:75},createDialog:function(_5,_6,_7){
var d=dojo.doc;
var _8=this.imgWidthSize=this.previewConfig.previewViewWidth;
var _9=this.imgHeightSize=this.previewConfig.previewViewHeight;
var _a;
if(this.feedItems){
_a=this.getPositionInFeed(this.feedItems,_5);
}
var _b=dojo.create("div",{className:"lotusDialogBorder"});
_b.style.width=dojo.number.parse(_8)+175+"px";
var el=dojo.create("form",{className:this.getFormNodeClassName()},_b);
this.appendHeader(el);
var _c=dojo.create("div",{className:"galleryLightBox "+this.getContentNodeClassName()},el);
var _d=dojo.create("table",{className:"lotusTable qkrFixedWidth",cellPadding:0,role:"presentation"},_c);
var _e=dojo.create("tbody",null,_d);
var tr=dojo.create("tr",{className:"lotusFirst"},_e);
this.renderLightBoxNav(tr,true);
var _f=dojo.create("td",{className:"qkrGalleryPreview",role:"alert",id:"qkrGalleryPreview"},tr);
_f.style.width=_8+"px";
_f.style.height=_9+"px";
_f.style.textAlign="center";
_f.style.verticalAlign="middle";
this.renderLightBoxNav(tr);
tr=dojo.create("tr",{className:"lotusFirst"},_e);
dojo.create("td",{},tr);
this.desc=dojo.create("td",{},tr);
dojo.create("td",{},tr);
this.renderMediaPreview(_f,_5);
_7.setContent(_b);
_7.file=_5;
_7.img=_f;
_7.desc=this.desc;
_7.position=_a;
_7.fixedOffsetHeight=100;
if(_a!=null){
_7.itemsLength=this.feedItems.length;
if(_a==0){
this.updateLightBoxNav(true,true);
}
if(_a==this.feedItems.length-1){
this.updateLightBoxNav(true,false);
}
}else{
this.updateLightBoxNav(true,true);
this.updateLightBoxNav(true,false);
}
dojo.connect(_c,"onkeypress",this,"keyEvent");
},_renderFileLink:function(_10,_11,_12){
var d=document;
var _13=this.fileLinkId=dijit.getUniqueId("share_action_fileLink");
var _14=dojo.create("a",{id:_13,className:"lotusAction",title:this.nls.DETAILS_TITLE,href:"javascript:;"},_10);
_14.setAttribute("role","button");
_14.appendChild(d.createTextNode(this.nls.DETAILS));
var _15=dojo.create("span",{className:"lotusAccess"},_14);
_15.style.width="200px";
_15.appendChild(d.createTextNode(this.nls.DETAILS_A11Y));
dojo.connect(_14,"onclick",dojo.hitch(this,this.showDetails,_11));
},showDetails:function(doc,e){
if(e){
dojo.stopEvent(e);
}
if(this.showDetailsExternalAction&&dojo.isFunction(this.showDetailsExternalAction)){
this.showDetailsExternalAction(this,doc,e);
}else{
var url=this.getUrlForPersonalFileInCommunity(doc);
window.location=url;
this.cancelDialog();
}
},getUrlForPersonalFileInCommunity:function(_16,opt){
var _17=this.app.routes;
var _18=_16.getId();
var url=_16.getUrlAlternate?_16.getUrlAlternate():null;
if(_16.isLibraryContext()){
url=url||_16.getUrlVia?_16.getUrlVia():null;
}
if(_17){
url=url||_17.getFileSummaryUrl(null,_18,{section:(opt)?opt.section:null});
if(this.app.restrictUserInComm&&this.app.isCommunityScene&&_16.getLibraryType()!="communityFiles"){
url=_17.getFileSummaryUrl(null,_18,{section:(opt)?opt.section:null});
}
}
return url;
},keyEvent:function(e){
switch(e.charOrCode){
case dojo.keys.LEFT_ARROW:
if(e.target.className!="HTML5VideoCollapse HTML5VideoControls otherHTML5Player24 otherHTML5Player24-collapse-16 otherHTML5Player24-collapse-hover-16"+""&&e.target.className!="HTML5VideoMute HTML5VideoControls otherHTML5Player24 otherHTML5Player24-mute-16 otherHTML5Player24-mute-hover-16"+""&&e.target.className!="HTML5VideoPause HTML5VideoControls otherHTML5Player24 otherHTML5Player24-pause-16 otherHTML5Player24-pause-hover-16"+""&&e.target.className!="HTML5VideoPlay HTML5VideoControls otherHTML5Player24 otherHTML5Player24-play-16 otherHTML5Player24-play-hover-16"+""&&e.target.className!="HTML5VideoVolume HTML5VideoControls otherHTML5Player24 otherHTML5Player24-volume-16 otherHTML5Player24-volume-hover-16"+""&&e.target.className!="HTML5VideoFullScreen HTML5VideoControls otherHTML5Player24 otherHTML5Player24-fullscreen-16 otherHTML5Player24-fullscreen-hover-16"+""&&e.target.className!="HTML5OnFocus"){
this.updateImage(true);
}
break;
case dojo.keys.RIGHT_ARROW:
if(e.target.className!="HTML5VideoCollapse HTML5VideoControls otherHTML5Player24 otherHTML5Player24-collapse-16 otherHTML5Player24-collapse-hover-16"+""&&e.target.className!="HTML5VideoMute HTML5VideoControls otherHTML5Player24 otherHTML5Player24-mute-16 otherHTML5Player24-mute-hover-16"+""&&e.target.className!="HTML5VideoPause HTML5VideoControls otherHTML5Player24 otherHTML5Player24-pause-16 otherHTML5Player24-pause-hover-16"+""&&e.target.className!="HTML5VideoPlay HTML5VideoControls otherHTML5Player24 otherHTML5Player24-play-16 otherHTML5Player24-play-hover-16"+""&&e.target.className!="HTML5VideoVolume HTML5VideoControls otherHTML5Player24 otherHTML5Player24-volume-16 otherHTML5Player24-volume-hover-16"+""&&e.target.className!="HTML5VideoFullScreen HTML5VideoControls otherHTML5Player24 otherHTML5Player24-fullscreen-16 otherHTML5Player24-fullscreen-hover-16"+""&&e.target.className!="HTML5OnFocus"){
this.updateImage(false);
}
break;
}
},updateImage:function(_19){
var _1a=_19?-1:1;
if(this.dialog.position==1&&_1a==-1){
this.updateLightBoxNav(true,true);
this.focusOther=true;
}
if(this.dialog.position==0&&_1a==1){
this.updateLightBoxNav(false,true);
}
if(this.dialog.itemsLength-2==this.dialog.position&&_1a==1){
this.updateLightBoxNav(true,false);
this.focusOther=true;
}
if(this.dialog.itemsLength-1==this.dialog.position&&_1a==-1){
this.updateLightBoxNav(false,false);
}
if(!(this.dialog.position==0&&_1a==-1)&&!(this.dialog.itemsLength-1==this.dialog.position&&_1a==1)){
var _1b=this.dialog.position+_1a;
var _1c=this.feedItems[_1b];
var _1d=this.dialog.img;
_1d.className="lotusFirst";
this.renderMediaPreview(_1d,_1c);
this.dialog.position=_1b;
}
this.updateFocus(_19);
},updateFocus:function(_1e){
if(this.focusOther){
var el=_1e?dojo.byId("galleryLightBoxNavnextLink"):dojo.byId("galleryLightBoxNavpreviousLink");
if(el){
el.focus();
}
this.focusOther=false;
}
},getPositionInFeed:function(_1f,_20){
dojo.forEach(_1f,function(_21,i){
if((_21._position)==_20._position){
position=i;
}
});
return position;
},renderLightBoxNav:function(el,_22){
var _23;
var _24=dojo._isBodyLtr();
_24?(_23=_22?" \u25c0 ":" \u25b6 "):(_23=_22?" \u25b6 ":" \u25c0 ");
var _25=(_24?_22:!_22)?"file-preview-back-arrow-lg":"file-preview-next-arrow-lg";
var _26=_25+"-hover";
var id=_22?"galleryLightBoxNavprevious":"galleryLightBoxNavnext";
var _27=_22?this.nls.PREV_TITLE:this.nls.NEXT_TITLE;
var _28=_22?"lotusLeft":"lotusRight";
var _29=_22?"galleryLightBoxNavpreviousLink":"galleryLightBoxNavnextLink";
var d=dojo.doc;
var td=dojo.create("td",{id:id},el);
td.style.cursor="pointer";
td.style.verticalAlign="middle";
var a=dojo.create("a",{href:"javascript:;",title:_27,id:_29},td);
a.setAttribute("role","button");
dojo.addClass(a,_28);
var img=dojo.create("img",{src:dijit._Widget.prototype._blankGif,alt:"",className:"qkrHideA11yImg"},a);
img.setAttribute("aria-hidden","true");
img.setAttribute("role","presentation");
dojo.addClass(img,_25);
dojo.addClass(img,"file-preview");
dojo.connect(td,"onclick",dojo.hitch(this,this.updateImage,_22));
dojo.connect(td,"onmouseover",dojo.hitch(this,function(img,_2a,_2b){
dojo.removeClass(img,_2a);
dojo.addClass(img,_2b);
},img,_25,_26));
dojo.connect(td,"onmouseout",dojo.hitch(this,function(img,_2c,_2d){
dojo.removeClass(img,_2d);
dojo.addClass(img,_2c);
},img,_25,_26));
var _2e=dojo.create("span",{className:"lotusAltText"},a);
_2e.appendChild(d.createTextNode(_23));
},updateLightBoxNav:function(_2f,_30){
var _31=_2f?"hidden":"visible";
var id=_30?"galleryLightBoxNavprevious":"galleryLightBoxNavnext";
dojo.byId(id).style.visibility=_31;
},isVideo:function(_32){
var ext=_32.getExtension();
var _33=this.previewConfig.validVideoExts;
var _34=_33.split(",");
var _35=dojo.indexOf(_34,ext);
return (_35!=-1)?true:false;
},isImg:function(_36){
var ext=_36.getExtension();
var _37=this.previewConfig.validPhotoExts;
var _38=_37.split(",");
var _39=dojo.indexOf(_38,ext);
return (_39!=-1)?true:false;
},isHTML5Ready:function(_3a){
var _3b=false;
var _3c=new RegExp((".mp4$"),"i");
if(_3c.test(_3a)){
_3b=true;
dojo.byId("qkrGalleryPreview").removeAttribute("role");
}
return _3b;
},playVideo:function(el,_3d){
dojo.empty(el);
el.style.height="";
var _3e=dojo.byId("galleryLightBoxNavprevious").style.visibility=="hidden"?this.closeId:"galleryLightBoxNavpreviousLink";
var _3f=dojo.byId("galleryLightBoxNavnext").style.visibility=="hidden"?this.fileLinkId:"galleryLightBoxNavnextLink";
var _40=_3d.getUrlDownload();
var _41=_3d.getName();
if((dojo.isFF>=21||dojo.isChrome||dojo.isIE>=9)&&this.isHTML5Ready(_41)){
var _42=dojo.getObject("lconn.share.widget.HTML5VideoPlayer");
var _43=new _42();
_43.playVideo(el,_40,null,this.imgWidthSize,this.imgHeightSize,_3e,_3f);
}else{
var _42=dojo.getObject("lconn.share.widget.FlashVideoPlayer");
var _43=new _42();
_43.playVideo(el,_3d,this.imgWidthSize,this.imgHeightSize,_3e,_3f);
}
},renderMediaPreview:function(el,_44){
dojo.empty(el);
var _45=el;
var _46=false;
var _47=_44.getDescription();
if(!_47){
_47=this.nls.NODESCRIPFILE;
}
var _48="thumbnailLarge";
var _49=_44.getName();
if(this.isVideo(_44)&&!this.disableVideoPreview){
el=dojo.create("div",null,el);
el.title=dojo.string.substitute(this.nls.PLAY_VIDEO_TOOLTIP,[lconn.core.util.text.trimToLength(_49,24)]);
el.style.position="relative";
el.style.height=this.imgHeightSize+"px";
el.style.width=this.imgWidthSize+"px";
var _4a=dojo.create("a",{href:"javascript:;",title:""},el);
dojo.connect(_4a,"onclick",null,dojo.hitch(this,this.playVideo,el,_44));
_45=_4a;
_46=true;
}
var _4b=dojo.hasClass(dojo.doc.getElementsByTagName("body")[0],"dijit_a11y");
var _4c=dojo.create("img",{title:_49,className:"lotusLTR",style:"border:1px solid #ccc"},_45);
dojo.connect(_4c,"onerror",dojo.hitch(this,this.pendingIcon,_45,_44));
if(!_46){
var _4d=false;
_4d=this.previewThumbnail(_44,_4c,_48,this.imgWidthSize,this.imgHeightSize);
if(!_4d){
this.pendingIcon(_45,_44);
}
}else{
var _4e=false;
_4c.setAttribute("aria-label",dojo.string.substitute(this.nls.A11Y,{description:_47}));
dojo.addClass(_4c,"previewThumbnail");
if(_4b){
dojo.style(_4c,"left","auto");
dojo.style(_4c,"bottom","auto");
}
if(_46&&_44.getUrlThumbnail()){
this.previewThumbnail(_44,_4c,_48,this.imgWidthSize,this.imgHeightSize);
_4e=true;
this.createVideoRenditionOverlay(this.imgHeightSize,this.imgWidthSize,_45,_4e);
}else{
this.previewNoThumbnail(this.imgWidthSize,this.imgHeightSize,_45,_4c,_44.getExtension());
this.createVideoRenditionOverlay(this.imgHeightSize,this.imgWidthSize,_45,_4e);
}
}
this.renderDesc(_44);
},previewThumbnail:function(_4f,img,_50,_51,_52){
if(this.disableThumbnail){
return false;
}
var _53=lconn.share.action.impl.FilePreviewDialog.DEFAULT_THUMBNAIL_SIZE;
var _54=false;
var url=_4f.getUrlThumbnail();
if(url){
url=url.replace("mediumview","largeview")+"&etag=";
if(this.isVideo(_4f)){
url=url+new Date(_4f.getSystemLastModified()).getTime();
}else{
url=url+new Date(_4f.getUpdated()).getTime();
}
}else{
if(_2.canSendThumbnailBatchRequest(_4f)){
var _55=img.parentNode;
_2.sendThumbnailBatchRequest(_4f,_53,dojo.hitch(this,function(_56,_57,_58){
var uri=this._getSingleUriFromBatchThumbnailData(_56,_57,_58);
this.setThumbnailData(img,_51,_52,uri);
this.reAttachImage(_55,img);
}));
_54=true;
}
if(!_54&&_3.canBuildViewerServiceURL()){
url=_4f.getThumbnailUrl(_53);
}
}
if(url){
this.setThumbnailData(img,_51,_52,url);
return true;
}
return false;
},_getSingleUriFromBatchThumbnailData:function(_59,_5a,_5b){
if(!_59){
return;
}
var _5c=_59[0];
var uri=_5c.getThumbnailData(_5a);
return uri;
},setThumbnailData:function(img,_5d,_5e,url){
img.src=url;
if(!dojo.hasClass(dojo.doc.body,"lotusImagesOff")){
if(_5d){
img.style.maxWidth=_5d+"px";
}
if(_5e){
img.style.maxHeight=_5e+"px";
}
}
},reAttachImage:function(_5f,img){
dojo.empty(_5f);
dojo.place(img,_5f);
},previewNoThumbnail:function(_60,_61,el,img,_62){
el.style.position="absolute";
el.style.top=((_60/2)-(this.videoConfig.filePreviewBackgroundWidth/2))+"px";
el.style.right=((_61/2)-(this.videoConfig.filePreviewBackgroundHeight/2))+"px";
el.style.textAlign="center";
el.style.verticalAlign="middle";
el.style.display="block";
el.style.backgroundColor="rgb(0, 0, 0)";
el.className="file-preview-background";
el.setAttribute("role","button");
img.src=dijit._Widget.prototype._blankGif;
},pendingIcon:function(el,_63){
dojo.empty(el);
var _64=_63.getName();
var _65=dojo.create("div",{className:"file-preview-background"},el);
var _66=dojo.create("div",{title:_64,className:"file-preview-ics-icon"},_65);
var img=dojo.create("img",{title:_64},_66);
var _67=dojo.isFunction(this.getFileIconClassName)?this.getFileIconClassName(_63,64):lconn.core.utilities.getFileIconClassName("."+_63.getExtension(),64);
dojo.addClass(img,_67);
var _68=new Object();
_68=lconn.share.scenehelper.customizeViewObject(_63,_68,64);
if(_68.fileTypeIconPath){
dojo.style(img,"backgroundImage","url("+dijit._Widget.prototype._blankGif+")");
img.src=_68.fileTypeIconPath;
}else{
img.src=dijit._Widget.prototype._blankGif;
}
var _69=dojo.create("span",{title:"",className:"file-preview-icon-span"},_65);
_69.innerHTML=this.nls.FILEVIEW_NO_FOUND;
_69.setAttribute("aria-label",this.nls.FILEVIEW_NO_FOUND);
_69.setAttribute("tabindex",0);
},renderDesc:function(_6a){
dojo.empty(this.desc);
var d=dojo.doc;
var div=dojo.create("div",{id:"galleryLightDesc",className:"lotusClear"},this.desc);
div.style.paddingTop="15px";
div.style.paddingLeft="5px";
div.style.wordBreak="break-all";
var _6b=dojo.create("div",null,div);
var h4=dojo.create("h4",null,_6b);
h4.style.display="inline";
h4.dir="ltr";
h4.setAttribute("aria-label",_6a.getName());
h4.setAttribute("tabindex",0);
this.breakString(_6a.getName(),d,h4);
var _6c=dojo.create("div",null,div);
_6c.setAttribute("role","list");
this.renderAuthorAndDate(this.app,_6a,d,_6c);
if(this.feedItems&&!this.hideFileDetailsLink){
this._renderFileLink(div,_6a,this.scene);
}
},renderAuthorAndDate:function(app,_6d,d,el){
var _6e=(_6d.getUpdated().getTime()!=_6d.getPublished().getTime());
var _6f=_6e?_6d.getModifier():_6d.getAuthor();
var _70=app.nls.DOCUMENTCONTENT;
var _71=_6e?_70.LABEL_UPDATED_OTHER:_70.LABEL_ADDED_OTHER;
var df=new lconn.share.util.DateFormat(_6d.getUpdated());
dojo.mixin(this,dojo.i18n.getLocalization("lconn.share","FileThumbnail"));
var _72=dojo.i18n.getLocalization("lconn.files","ui");
var _73={nls_profile:this.ft_backAuthor,nls_dateFormatFileCreated:_72.DOCUMENTCONTENT.LABEL_ADDED_OTHER,nls_dateFormatFileModified:_72.DOCUMENTCONTENT.LABEL_UPDATED_OTHER};
var _74=new lconn.share.widget.FileDateFormatter({isUpdated:_6e,date:_6d.getUpdated().toJSON(),profileName:_6d.getModifier(),showBizCard:true,domNode:el,i18n:_73});
el.title=df.format(_71.FULL);
if(el.children[0]){
var a=el.children[0];
this.generateUserLink(this.app,_6f,a);
}
return el;
},getOptionAuthor:function(_75){
var _76=_75.getPublished();
var _77=_75.getUpdated();
var _78=(dojo.date.difference(_76,_77,"second")!=0);
if(_78){
return _75.getModifier();
}
return _75.getAuthor();
},getDateInfo:function(_79){
var _7a=_79.getPublished();
var _7b=_79.getUpdated();
var _7c=(dojo.date.difference(_7a,_7b,"second")!=0);
var df=new lconn.share.util.DateFormat(_7a);
var _7d=df.MMMM()+" "+df.dd()+", "+df.YYYY();
var d=document;
var _7e=d.createElement("SPAN");
if(_7b){
_7e.appendChild(d.createTextNode(_7d?"created "+_7d:"date unavailable"));
}else{
_7e.appendChild(d.createTextNode(_7d?"updated "+_7d:"date unavailable"));
}
return _7e;
},createVideoRenditionOverlay:function(_7f,_80,_81,_82){
var _83=dojo.create("img",{className:"previewLgPlayIcon otherHTML5Player24 otherHTML5Player24-play-overlay-lg"},_81);
var _84=dojo.create("span",{className:"lotusAltText",style:"font-size:78px;float:right"},_81);
_84.style.lineHeight=((_7f)-(this.videoConfig.playArrowHeight/2))+"px";
_84.style.paddingRight=((_80/2)-(this.videoConfig.playArrowWidth/2))+"px";
_84.innerHTML="&#9654";
if(_82){
_83.style.top=((_7f/2)-(this.videoConfig.playArrowHeight/2))+"px";
_83.style.right=((_80/2)-(this.videoConfig.playArrowWidth/2))+"px";
}else{
dojo.addClass(_83,"noThumbnailPlayIcon");
}
_83.alt="";
_83.src=dijit._Widget.prototype._blankGif;
_83.setAttribute("aria-hidden",true);
_83.setAttribute("role","button");
_83.style.position="absolute";
},breakString:function(s,d,el,_85,_86){
if(!s){
return;
}
_85=_85||10;
var _87=function(el,s){
if(_86){
var br=/\n/g;
if(br.test(s)){
el.innerHTML+=quickr.lw.util.html.newLineToBR(s);
}else{
el.appendChild(d.createTextNode(s));
}
}else{
el.appendChild(d.createTextNode(s));
}
};
var b=new RegExp("[^\\s]{"+(_85+1)+"}","g");
var r;
var _88=0,end;
if(dojo.isIE||dojo.isSafari||dojo.isChrome){
while(r=b.exec(s)){
end=--b.lastIndex;
var _89=s.charCodeAt(end-1);
if(_89>=55296&&_89<56192){
end++;
}
_87(el,s.substring(_88,end));
el.appendChild(d.createElement("wbr"));
_88=end;
}
}else{
while(r=b.exec(s)){
end=--b.lastIndex;
var _89=s.charCodeAt(end-1);
if(_89>=55296&&_89<56192){
end++;
}
_87(el,s.substring(_88,end)+"\u200b");
_88=end;
}
}
_87(el,s.substring(end));
},generateUserLink:function(app,_8a,a){
a.title=dojo.isIE?"":" ";
if(dojo.getObject("lconn.core.config.services.profiles")){
var _8b={userid:_8a.id,name:_8a.name,state:_8a.userState,email:_8a.email};
com.ibm.lconn.layout.people.createLink(_8b,null,a);
var _8c=a.childNodes;
for(var i=_8c.length-1;i>=0;i--){
var _8d=_8c[i];
if(_8d.nodeType==3&&_8d.nodeValue==_8a.name){
a.removeChild(_8d);
break;
}
}
}else{
dojo.addClass(a,"lotusPerson");
if(_8a&&window["SemTagSvc"]){
dojo.addClass(a,"vcard");
dojo.addClass(a,"fn");
if(lconn.share.util.text.trim(_8a.email).length>0){
var _8e=document.createElement("span");
_8e.className="email";
_8e.style.display="none";
_8e.appendChild(document.createTextNode(_8a.email));
a.appendChild(_8e);
}
var _8e=document.createElement("span");
_8e.className="x-lconn-userid";
_8e.style.display="none";
_8e.appendChild(document.createTextNode(_8a.id));
a.appendChild(_8e);
}
}
if(dojo.getObject("SemTagSvc.onTagChanged")){
SemTagSvc.onTagChanged(a,true);
}
}});
lconn.share.action.impl.FilePreviewDialog.DEFAULT_THUMBNAIL_SIZE=_1.thumbnailSizes.large;
})();
(function(){
dojo.addOnLoad(function(){
lconn.share.action.impl.fileViewer.addFileViewer();
});
})();
}


;if(!dojo._hasResource["lconn.files.action.PreviewFile"]){
dojo._hasResource["lconn.files.action.PreviewFile"]=true;
dojo.provide("lconn.files.action.PreviewFile");






dojo.declare("lconn.files.action.PreviewFile",[lconn.share.action.DeferredAction],{isPrimary:true,constructor:function(_1,_2,_3){
this.app=_1;
var _4=_1.nls.PREVIEWFILE;
this.name=_4.ACTION;
this.tooltip=_4.ACTION_TOOLTIP;
},isValid:function(_5,_6){
if(this.app.scene.activeView&&this.app.scene.activeView.id=="grid"){
return true;
}
if(lconn.core.config.features("fileviewer-detailspage")){
return false;
}
var _7=lconn.share.previewConfig;
var _8=_7.validPhotoExts.split(",");
var _9=_7.validVideoExts.split(",");
for(var i=0;i<_8.length;i++){
if(_5.getExtension()==_8[i]){
return true;
}
}
for(var i=0;i<_9.length;i++){
if(_5.getExtension()==_9[i]){
return true;
}
}
return false;
}});
}


;if(!dojo._hasResource["lconn.share.widget.Icon"]){
dojo._hasResource["lconn.share.widget.Icon"]=true;
dojo.provide("lconn.share.widget.Icon");




dojo.declare("lconn.share.widget.Icon",[dijit._WidgetBase],{spriteImages:{locked:"iconsStates16 iconsStates16-CheckedOut",lockedByMe:"iconsStates16 iconsStates16-CheckedOutMe","private":"lotusHidden","public":"iconsStates16 iconsStates16-Public",shared:"iconsStates16 iconsStates16-Shared",sharedExternally:"iconsMessages16 iconsMessages16-msgExternal16",sharedCommunity:"iconsComponentsGray16 iconsComponentsGray16-CommunitiesGray16",sync:"iconsMessages16 iconsMessages16-myFileSync-16"},domNodeType:"img",type:null,alt:"",buildRendering:function(){
if(!this.domNode){
if(this.srcNodeRef){
this.domNode=this.srcNodeRef;
}else{
this.domNode=dojo.create(this.domNodeType);
}
}
this.inherited(arguments);
},postCreate:function(){
this.applyImage();
this.applyAlternativeText();
},applyImage:function(){
if(this._contains(dojox.lang.functional.keys(this.spriteImages),this.type)){
dojo.addClass(this.domNode,this.spriteImages[this.type]);
return true;
}
return false;
},applyAlternativeText:function(){
if(this.domNode.tagName==="IMG"){
dojo.setAttr(this.domNode,"alt",this.alt);
}else{
if(this.alt){
dojo.place(dojo.doc.createTextNode(this.alt),this.domNode,"only");
}
}
},_contains:function(_1,_2){
return dojo.indexOf(_1,_2)!=-1;
}});
}


;if(!dojo._hasResource["lconn.core.util.imagechecker"]){
dojo._hasResource["lconn.core.util.imagechecker"]=true;
dojo.provide("lconn.core.util.imagechecker");


(function(){
function _1(_2,i,_3,d,_4,_5,_6){
if(_6){
_4.push(_2);
}else{
_5.push(_2);
}
_3.splice(dojo.indexOf(_3,_2),1);
if(!_3.length){
if(_4.length>0){
d.resolve(_4);
}else{
d.reject(_5);
}
}
};
lconn.core.util.imagechecker={checkExist:function(_7){
if(!dojo.isArray(_7)){
_7=[_7];
}
var d=new dojo.Deferred(),_8=[],_9=[];
if(_7.length){
dojo.forEach(_7,function(_a,i,_b){
var _c=new Image();
_c.onload=dojo.partial(_1,_a,i,_b,d,_8,_9,true);
_c.onerror=dojo.partial(_1,_a,i,_b,d,_8,_9,false);
_c.src=_a;
});
}else{
d.reject(_7);
}
return d;
}};
}());
}


;if(!dojo._hasResource["lconn.share.widget.FilePreview"]){
dojo._hasResource["lconn.share.widget.FilePreview"]=true;
dojo.provide("lconn.share.widget.FilePreview");






(function(){
dojo.declare("lconn.share.widget.FilePreview",[lconn.share.widget.Icon],{spriteImages:{},size:null,filePreviewParentNode:"filePreviewParentNode",imagePath:null,iconPath:null,iconClass:null,imageAvailable:false,hcModeText:true,draftLabel:null,fileImageBinary:null,_maxSize:{small:{maxWidth:"73px",maxHeight:"73px"},medium:{maxWidth:"200px",maxHeight:"132px"},large:{maxWidth:"450px",maxHeight:"450px"}},postCreate:function(){
this.checkImagePath();
},handlePreview:function(){
if(this.size){
dojo.addClass(this.domNode.parentNode,this.filePreviewParentNode);
dojo.setStyle(this.domNode.parentNode,"width",this._maxSize[this.size].maxWidth);
dojo.setStyle(this.domNode.parentNode,"height",this._maxSize[this.size].maxHeight);
if(this.imageAvailable){
dojo.removeAttr(this.domNode,"src");
dojo.setAttr(this.domNode,"src",this.imagePath);
dojo.setStyle(this.domNode,"maxWidth",this._maxSize[this.size].maxWidth);
dojo.setStyle(this.domNode,"maxHeight",this._maxSize[this.size].maxHeight);
}
if(!this.isVideo()&&!this.imageAvailable){
var _1=_2(this.widgetData);
if(_1){
this.iconClass=_1;
}
if(this.iconPath){
dojo.setAttr(this.domNode,"src",this.iconPath);
}else{
if(this.iconClass){
dojo.addClass(this.domNode,this.iconClass);
}else{
dojo.addClass(this.domNode,lconn.core.utilities.getFileIconClassName("."+this.type,64));
}
}
}
if(this.draftLabel&&this.size==="medium"){
dojo.create("span",{role:"note",innerHTML:this.draftLabel},this.domNode,"after");
}
}
this.applyAlternativeText();
if(this.hcModeText){
var _3=dojo.create("span",{"class":"hcModeText"},this.domNode.parentNode,"last");
dojo.place(dojo.doc.createTextNode(this.alt),_3,"only");
}
},isVideo:function(){
if(!this.disableVideoPreviewIcon&&this._contains(["mp4","mov","flv"],this.type)){
if(!this.imageAvailable){
dojo.setStyle(this.domNode,"width","64px");
dojo.setStyle(this.domNode,"height","64px");
dojo.setStyle(this.domNode.parentNode,"backgroundColor","#000");
dojo.setStyle(this.domNode,"color","#fff");
}
dojo.create("img",{src:this._blankGif,"class":"otherHTML5Player16 otherHTML5Player16-play-overlay-sm",alt:""},this.domNode,"after");
return true;
}
return false;
},checkImagePath:function(){
if(this.imagePath){
lconn.core.util.imagechecker.checkExist(this.imagePath).then(dojo.hitch(this,function(){
this.imageAvailable=true;
this.handlePreview();
}),dojo.hitch(this,function(){
this.imageAvailable=false;
this.handlePreview();
}));
}else{
this.handlePreview();
}
},applyImageBase64:function(_4){
dojo.removeClass(this.domNode);
dojo.removeAttr(this.domNode,"src");
this.connect(this.domNode,"onerror",function(){
setTimeout(dojo.hitch(this,function(){
dojo.removeAttr(this.domNode,"src");
dojo.setAttr(this.domNode,"src",this.fileImageBinary);
},0));
});
dojo.setAttr(this.domNode,"src",_4);
dojo.setStyle(this.domNode,"maxWidth",this._maxSize[this.size].maxWidth);
dojo.setStyle(this.domNode,"maxHeight",this._maxSize[this.size].maxHeight);
}});
function _2(_5){
if(!_5||!_5.isFolder||!_5.folderType||!_5.visibility){
return;
}
var _6="ic-thumb-folder";
if(_5.folderType==="community"){
_6+=" ic-thumb-folder-community";
}else{
switch(_5.visibility){
case "shared":
_6+=" ic-thumb-folder-shared";
break;
case "public":
_6+=" ic-thumb-folder-public";
break;
}
}
return _6;
};
lconn.share.widget.FilePreview._getFolderIconClass=_2;
}());
}


;dojo.cache("lconn.share", "widget/templates/AbstractThumbnail.html", " <div class=\"ic-thumb-widget-flip-card\" data-dojo-attach-event=\"onmouseout: onBlur\"> <div class=\"card-front\" data-dojo-attach-point=\"cardFront\"> <div><img data-dojo-type=\"lconn.share.widget.FilePreview\" data-dojo-attach-point=\"imageThumb\" data-dojo-props=\"type: this.value.fileType, alt: this.altThumbnail, size: 'medium', imagePath: this.value.fileImagePath, iconPath: this.value.fileTypeIconPath, iconClass: this.value.fileTypeIconClass, draftLabel: this.draftLabel, hcModeText: false, fileImageBinary: this.value.fileImageBinary, disableVideoPreviewIcon: this.value.disableVideoPreviewIcon, widgetData: this.value\" src=\"${_blankGif}\" /></div> <span class=\"iconsOther48 ${pinTriangleClass} trianglePin\"></span> <span class=\"check ${hcClass} ${spriteCheckOn}\" data-dojo-attach-point=\"frontCheck\" aria-hidden=\"true\"></span> <span class=\"pin ${hcClass} ${spritePinOn}\" data-dojo-attach-point=\"frontPin\" aria-hidden=\"true\"></span> <div class=\"summary\" data-dojo-attach-point=\"folderSummary\"><span data-dojo-attach-point=\"frontFileName\" class=\"text\"></span><span data-dojo-type=\"lconn.share.widget.Icon\" data-dojo-props=\"type: (this.value.isFolder ? null : this.value.fileVisibilityLocking), alt: this.altStatusImage\" class=\"icon ${hcClass}\" data-dojo-attach-point=\"thumbnailIcon\"></span></div> </div> <div class=\"card-back\" data-dojo-attach-event=\"onclick: previewCardBack\"> <span class=\"iconsOther48 ${pinTriangleClass} trianglePin\" data-dojo-attach-event=\"onclick: pinToggleTriangle\" data-dojo-attach-point=\"backTriangle\"></span> <a href=\"javascript:;\" class=\"check ${hcClass}\" data-dojo-attach-event=\"ondijitclick: checkToggle\" role=\"button\" data-dojo-attach-point=\"backCheck\"></a> <a href=\"javascript:;\" class=\"pin ${hcClass}\" data-dojo-attach-event=\"ondijitclick: pinToggle\" role=\"button\" data-dojo-attach-point=\"backPin\"></a> <h4 class=\"title\"><a href=\"${ft_href}\" data-dojo-attach-point=\"backFileName\" data-dojo-attach-event=\"onclick: summary\" title=\"${ft_summary}\"></a></h4> <span data-dojo-type=\"lconn.share.widget.FileDateFormatter\" class=\"desc\" data-dojo-props=\"profileName: this.value.fileModifier, date: this.value.fileDateModified, isUpdated: (this.value.fileDatePublished !== this.value.fileDateModified), showBizCard: this.showBizCard, suppressUserLink: this.suppressUserLink, i18n: this.nlsProfileDateFormatter\" ></span> <div class=\"actions\" data-dojo-attach-point=\"backActions\"></div> </div> </div>");

;if(!dojo._hasResource["lconn.share.widget.AbstractThumbnail"]){
dojo._hasResource["lconn.share.widget.AbstractThumbnail"]=true;
(function(){
dojo.provide("lconn.share.widget.AbstractThumbnail");






















dojo.requireLocalization("lconn.share","FileThumbnail");
var _1="ic-thumb-widget-flip-card-a11y-h";
var _2="ic-thumb-widget-flip-card-is-checked";
var _3="ic-thumb-widget-flip-card-is-pinned";
var _4=null;
var _5=lconn.share.util.IBMDocs.ThumbnailConstants;
dojo.declare("lconn.share.widget.AbstractThumbnail",[dijit._WidgetBase,dijit._TemplatedMixin,dijit._WidgetsInTemplateMixin,dijit._FocusMixin],{templatePath:dojo.moduleUrl("lconn.share","widget/templates/AbstractThumbnail.html"),value:null,selected:false,nlsProfileDateFormatter:null,altThumbnail:null,altStatusImage:null,backSideAction:null,showBizCard:true,suppressUserLink:false,spritePinOn:"lconnSprite lconnSprite-iconPinned16-on",spritePinOff:"lconnSprite lconnSprite-iconPinned16-off",spriteCheckOn:"iconsOther16 iconsOther16-thumbnail-checkbox-sel16",spriteCheckOff:"iconsOther16 iconsOther16-thumbnail-checkbox16",pinTriangleClass:"iconsOther48-thumbnail-pinTriangle",hcClass:"hc",postMixInProperties:function(){
this.inherited(arguments);
dojo.mixin(this,dojo.i18n.getLocalization("lconn.share","FileThumbnail"));
this.nlsProfileDateFormatter={nls_profile:this.ft_backAuthor,nls_dateFormatFileCreated:{MONTH:this.ft_dateFormatFileCreatedMonth,TODAY:this.ft_dateFormatFileCreatedToday,YESTERDAY:this.ft_dateFormatFileCreatedYesterday,YEAR:this.ft_dateFormatFileCreatedYear,DAY:this.ft_dateFormatFileCreatedDay,FULL:this.ft_dateFormatFileCreatedFull},nls_dateFormatFileModified:{MONTH:this.ft_dateFormatFileModifiedMonth,TODAY:this.ft_dateFormatFileModifiedToday,YESTERDAY:this.ft_dateFormatFileModifiedYesterday,YEAR:this.ft_dateFormatFileModifiedYear,DAY:this.ft_dateFormatFileModifiedDay,FULL:this.ft_dateFormatFileModifiedFull}};
if(!this.value.isFolder){
this.altStatusImage=this["ft_"+this.value.fileVisibilityLocking];
}
if(!dojo._isBodyLtr()){
this.pinTriangleClass+="-rtl";
}
if(lconn.core.config.features("fileviewer-detailspage")){
this.showBizCard=false;
this.suppressUserLink=true;
}
this.ft_href=this.value.filePath;
},postCreate:function(){
this.inherited(arguments);
if(this.value.isFolder){
this.cardFront.style.backgroundColor="transparent";
}
_4={};
this.set("selected",false);
this.pinToggleUpdateUI();
if(this.value.context==="communityFiles"){
dojo.setStyle(this.backPin,"display","none");
dojo.setStyle(this.backTriangle,"display","none");
}else{
if(this.value.context==="library"){
dojo.setStyle(this.backCheck,"display","none");
dojo.setStyle(this.backPin,"display","none");
dojo.setStyle(this.backTriangle,"display","none");
}
}
this.manageFileName();
if(this.value.role){
dojo.setAttr(this.domNode,"role",this.value.role);
}
},onFocus:function(){
dojo.addClass(this.domNode,_1);
},onBlur:function(){
dojo.removeClass(this.domNode,_1);
},checkToggle:function(){
this.set("selected",!this.selected);
},pinToggleUpdateUI:function(){
if(this.value.filePinned){
dojo.addClass(this.domNode,_3);
dojo.place(dojo.doc.createTextNode(this.ft_pinned),this.backPin,"only");
dojo.removeClass(this.backPin,this.spritePinOff);
dojo.addClass(this.backPin,this.spritePinOn);
dojo.setAttr(this.backPin,"aria-pressed","true");
if("dir"==this.value.fileType){
dojo.setAttr(this.backPin,"aria-label",this.ft_folder_pressToChange1);
dojo.setAttr(this.backPin,"title",this.ft_folder_changeToUnpinned);
}else{
dojo.setAttr(this.backPin,"aria-label",this.ft_pressToChange1);
dojo.setAttr(this.backPin,"title",this.ft_changeToUnpinned);
}
dojo.place(dojo.doc.createTextNode(this.ft_pinned),this.frontPin,"only");
}else{
dojo.removeClass(this.domNode,_3);
dojo.place(dojo.doc.createTextNode(this.ft_unpinned),this.backPin,"only");
dojo.removeClass(this.backPin,this.spritePinOn);
dojo.addClass(this.backPin,this.spritePinOff);
dojo.setAttr(this.backPin,"aria-pressed","false");
if("dir"==this.value.fileType){
dojo.setAttr(this.backPin,"aria-label",this.ft_folder_pressToChange2);
dojo.setAttr(this.backPin,"title",this.ft_folder_changeToPinned);
}else{
dojo.setAttr(this.backPin,"aria-label",this.ft_pressToChange2);
dojo.setAttr(this.backPin,"title",this.ft_changeToPinned);
}
dojo.place(dojo.doc.createTextNode(this.ft_unpinned),this.frontPin,"only");
}
},pinToggleTriangle:function(e){
if((typeof (e.offsetX)==="undefined")?(e.layerX>e.layerY):(e.offsetX>e.offsetY)){
this.pinToggle();
}else{
this.backSideAction();
}
dojo.stopEvent(e);
},pinToggle:function(){
this.value.pinnedAction.callback(this);
},_setValueAttr:function(_6){
this._set("value",dojo.mixin(_4,_6));
},manageFileName:function(){
if(this.value.fileName){
dojo.place(dojo.doc.createTextNode(this.value.fileName),this.frontFileName,"only");
setTimeout(dojo.hitch(this,function(){
var _7=this.value.fileName.split(" ");
var _8="";
for(var i1=0;i1<_7.length;i1++){
var _9=_7[i1];
_8+=(_9+" ");
dojo.place(dojo.doc.createTextNode(_8),this.backFileName,"only");
if(this.backFileName.offsetWidth<this.backFileName.scrollWidth){
break;
}
}
if(_8.length>40){
dojo.place(dojo.doc.createTextNode(lconn.core.util.text.trimToLength(_8,40)),this.backFileName,"only");
}
}),0);
}
},previewCardBack:function(e){
if(dojo.dnd.manager().mouseDrag){
return;
}
var _a=((e.originalTarget)?e.originalTarget:e.srcElement).tagName;
if(_a!=="A"){
var _b=this.backSideAction||this.summaryAction;
_b();
}
},_setSelectedAttr:function(_c){
if(!_c){
dojo.removeClass(this.domNode,_2);
dojo.place(dojo.doc.createTextNode(this.ft_unchecked),this.backCheck,"only");
dojo.removeClass(this.backCheck,this.spriteCheckOn);
dojo.addClass(this.backCheck,this.spriteCheckOff);
dojo.setAttr(this.backCheck,"aria-pressed","false");
if("dir"==this.value.fileType){
dojo.setAttr(this.backCheck,"aria-label",this.ft_folder_pressToChange3);
dojo.setAttr(this.backCheck,"title",this.ft_folder_changeToChecked);
}else{
dojo.setAttr(this.backCheck,"aria-label",this.ft_pressToChange3);
dojo.setAttr(this.backCheck,"title",this.ft_changeToChecked);
}
this._set("selected",false);
dojo.place(dojo.doc.createTextNode(this.ft_unchecked),this.frontCheck,"only");
}else{
dojo.addClass(this.domNode,_2);
dojo.place(dojo.doc.createTextNode(this.ft_checked),this.backCheck,"only");
dojo.removeClass(this.backCheck,this.spriteCheckOff);
dojo.addClass(this.backCheck,this.spriteCheckOn);
dojo.setAttr(this.backCheck,"aria-pressed","true");
if("dir"==this.value.fileType){
dojo.setAttr(this.backCheck,"aria-label",this.ft_folder_pressToChange4);
dojo.setAttr(this.backCheck,"title",this.ft_folder_changeToUnchecked);
}else{
dojo.setAttr(this.backCheck,"aria-label",this.ft_pressToChange4);
dojo.setAttr(this.backCheck,"title",this.ft_changeToUnchecked);
}
this._set("selected",true);
dojo.place(dojo.doc.createTextNode(this.ft_checked),this.frontCheck,"only");
}
}});
lconn.share.widget.AbstractThumbnail.DEFAULT_EXPECTED_THUMBNAIL_SIZE=_5.thumbnailSizes.medium;
})();
}


;if(!dojo._hasResource["lconn.share.widget.FileThumbnail"]){
dojo._hasResource["lconn.share.widget.FileThumbnail"]=true;
(function(){
dojo.provide("lconn.share.widget.FileThumbnail");




var _1="sync";
var _2="iconsOther16 iconsOther16-thumbnail-details16";
var _3="iconsOther16 iconsOther16-thumbnail-download16";
var _4="iconsOther16 iconsOther16-thumbnail-edit16";
var _5="iconsOther16 iconsOther16-thumbnail-view16";
var _6=lconn.share.widget.AbstractThumbnail;
dojo.declare("lconn.share.widget.FileThumbnail",[lconn.share.widget.AbstractThumbnail],{draftLabel:null,handleItems:null,postMixInProperties:function(){
this.inherited(arguments);
this.altThumbnail=dojo.string.substitute(this.ft_mainThumbnail,[this.value.index]);
if(this.value.fileDraft){
this.draftLabel=this["ft_"+this.value.fileDraft];
}
},postCreate:function(){
this.inherited(arguments);
this.handleItems=[];
this.manageSyncIcon();
this.manageActions();
dojo.setAttr(this.domNode,"aria-label",dojo.string.substitute(this.ft_mainControls,[this.value.index,this.value.fileName]));
},manageSyncIcon:function(){
if(this.value.fileSync){
dojo.addClass(this.frontFileName,_1);
var _7=new lconn.share.widget.Icon({type:"sync",alt:this.ft_sync,domNodeType:"span"});
dojo.addClass(_7.domNode,_1);
dojo.addClass(_7.domNode,this.hcClass);
dojo.addClass(_7.domNode,"icon");
dojo.place(_7.domNode,this.frontFileName,"after");
}
},manageActions:function(){
dojo.forEach(this.value.actionListValue,dojo.hitch(this,function(_8){
this.createActionUI(_8);
}));
},createActionUI:function(_9){
var _a,_b,_c,_d;
if(_9.name==="Download"){
_a=_3;
_b=this.ft_download;
_c=_9.callback;
_d=true;
}else{
if(_9.name==="Preview"||_9.name==="View"){
if(_9.name==="Preview"){
_b=this.ft_preview;
_d=true;
}else{
_b=this.ft_view;
_d=false;
}
_c=_9.callback;
_a=_5;
this.backSideAction=_9.callback;
}else{
if(_9.name==="Edit"||_9.name==="CreateTemplate"){
if(_9.name==="Edit"){
_b=this.ft_edit;
}else{
if(_9.name==="CreateTemplate"){
_b=this.ft_createFile;
this.backSideAction=_9.callback;
}
}
_c=_9.callback;
_d=false;
_a=_4;
}else{
if(_9.name==="Summary"){
_a=_2;
_b=this.ft_summary;
_d=false;
this.summaryAction=_c=_9.callback;
}
}
}
}
if(_9.hideButton){
return;
}
var _e={href:_9.href||"javascript:;",title:_b,"class":_a+" "+this.hcClass};
if(_d){
_e.role="button";
}
var _f=dojo.create("a",_e,this.backActions);
dojo.place(dojo.doc.createTextNode(_b),_f,"only");
this.handleItems.push(dojo.connect(_f,"onclick",_c));
},summary:function(){
this.summaryAction();
},applyImageBase64:function(_10){
this.imageThumb.applyImageBase64(_10);
},destroy:function(){
for(var _11=null;_11=(this.handleItems||[]).pop();){
dojo.disconnect(_11);
}
}});
lconn.share.widget.FileThumbnail.DEFAULT_EXPECTED_THUMBNAIL_SIZE=_6.DEFAULT_EXPECTED_THUMBNAIL_SIZE;
})();
}


;if(!dojo._hasResource["lconn.share.widget.FileRendererGrid"]){
dojo._hasResource["lconn.share.widget.FileRendererGrid"]=true;
dojo.provide("lconn.share.widget.FileRendererGrid");




































dojo.declare("lconn.share.widget.FileRendererGrid",[lconn.share.widget.FileRendererCore,lconn.share.widget.AbstractRendererSocial,lconn.share.widget.FileRendererPostProcessor,lconn.share.widget.StreamRendererMultiSelection],{showTags:true,showComments:true,showDownloads:true,showRecommendations:true,downloadFilesNodes:"<a><img alt=\"\"><span class=\"lotusAltText\"></span></a>",metas:[],play:null,fileThumbnailWidgets:[],constructor:function(){
var _1=[];
_1.push({id:"owner",isValid:dojo.hitch(this,function(_2){
var _3=_2.getAuthor();
return this.displayOwner&&_3&&_3.name;
}),render:dojo.hitch(this,function(_4,_5,d,el,_6){
var a=el;
this.generateLinkToPerson(_5.getAuthor(),a);
a.appendChild(d.createTextNode(_5.getAuthor().name));
})});
_1.push({id:"modifier",isValid:dojo.hitch(this,function(_7){
var _8=(_7.getUpdated().getTime()!=_7.getPublished().getTime());
var _9=_8?_7.getModifier():_7.getAuthor();
return !_7.getConfiguration().hideListTime&&_9&&_9.name;
}),render:dojo.hitch(this,function(_a,_b,d,el,_c){
var d=document;
var _d=(_b.getUpdated().getTime()!=_b.getPublished().getTime());
var _e=_d?_b.getModifier():_b.getAuthor();
var _f=this._appstrings.DOCUMENTCONTENT;
var _10=_d?_f.LABEL_UPDATED_OTHER:_f.LABEL_ADDED_OTHER;
var df=new lconn.share.util.DateFormat(_b.getUpdated());
var _11=df.formatByAge(_10);
lconn.share.util.html.substitute(d,el,_11,{user:function(){
var a=d.createElement("a");
a.className="lotusPerson";
a.appendChild(d.createTextNode(_e.name));
this.generateLinkToPerson(_e,a);
return a;
}},null,this);
el.title=df.format(_10.FULL);
})});
this.metas=_1;
},_updateItem:function(_12,_13,el,_14,_15,_16){
var div=_15.element.parentNode;
var _17=this.inherited(arguments);
this.attachDragSource(div,_12,_13);
return _17;
},constructWidgetData:function(_18,_19){
var _1a={isSelectedstatus:_18._isSelected,fileId:_18.getId(),fileSync:_18.isSyncable()&&_18.getLibraryType()=="personalFiles",fileName:lconn.share.util.html.formatFilename(_18.getName()),fileType:lconn.share.util.text.getExtension(_18.getName()),fileAuthor:_18.getAuthor(),fileDatePublished:_18.getPublished().toJSON(),fileModifier:_18.getModifier(),fileDateModified:_18.getUpdated().toJSON(),filePath:this.getUrlForPersonalFileInCommunity(_18,this.app)};
if(!this.app.isCommunityScene&&_18.getLibraryType()!="communityFiles"&&_18.getLibraryType()!="communityECMFiles"){
_1a.context="files";
}else{
_1a.context="communityFiles";
}
var _1b=_19?_19.files:null;
if(_1b){
if(!this.app.isCommunityScene&&_18.getLibraryType()!="communityFiles"&&_18.getLibraryType()!="communityECMFiles"){
_1a.filePinned=_1b.isPinned(_18.getId());
var _1c=new Object();
_1c.callback=_1b.gridOnToggle;
_1c.that=_1b;
_1a.pinnedAction=_1c;
}
}
if(_18.isExternal()&&((this.app&&this.app.isCommunityScene&&!this.app.isExternalCommunity)||!this.app.isCommunityScene)){
_1a.fileVisibilityLocking="sharedExternally";
}else{
if(_18.isLocked()){
var _1d=_18.getLock();
var _1e=this.app.getAuthenticatedUserId();
var _1f=_1e==_1d.getOwner().id;
_1a.fileVisibilityLocking=_1f?"lockedByMe":"locked";
}else{
_1a.fileVisibilityLocking=lconn.files.scenes.share.getVisibility(_18);
_1a.fileVisibilityLocking=_1a.fileVisibilityLocking=="community"?"sharedCommunity":_1a.fileVisibilityLocking;
}
}
_1a=lconn.share.scenehelper.customizeViewObject(_18,_1a,64);
var url=_18.getUrlThumbnail();
if(url){
url=url+"&preventCache=";
if(this.isVideo(_18)){
_1a.fileImagePath=url+new Date(_18.getSystemLastModified()).getTime();
}else{
_1a.fileImagePath=url+new Date(_18.getUpdated()).getTime();
}
}
_1a.fileSystemLastModified=_18.getSystemLastModified().toJSON();
return _1a;
},getActionListForItem:function(_20,_21,_22){
if(!this.actions){
if(!this.app.isCommunityScene){
this.actions=lconn.files.actions.get("grid",this.app,this);
}else{
this.actions=lconn.files.actions.get("communityGrid",this.app,this);
}
}
return this.previewGridActionButton(_21,_22,_20,this.actions,this);
},getItemThumbnailWidget:function(_23){
return new lconn.share.widget.FileThumbnail({value:_23});
},_addGridItem:function(_24,_25){
var _26=dojo.create("div",null,_24);
dojo.addClass(_26,"lconnFilesGridItem");
_26.appendChild(_25);
},_render:function(_27,el,_28,opt){
var _29=this._getItems(_28.xml);
var _2a=(_28.paging)?Math.min(_28.paging.size,_29.length):_29.length;
var d=document;
var _29=this.initData(_28);
this.selection=[];
for(var i=0;_29!=null&&i<_29.length;i++){
if(_29[i]._isSelected){
this.selection.push(_29[i]);
}
}
var max=(_28.paging)?_28.paging.size:_2a;
var _2b=el.lastChild;
if(_2b&&(_2b._view!="grid"||_2b.nodeName.toLowerCase()!="table"||_2b.firstChild.childNodes.length!=max*2)){
dojo.empty(el);
_2b=null;
}
_2b=dojo.create("table",{role:"presentation"},el);
if(dojo.isSafari){
_2b.width=el.clientWidth+"px";
}
_2b._view="grid";
dojo.connect(_2b,"onmousedown",dojo.hitch(this,"toggleByElement",_27));
var _2c=dojo.create("tbody",{},_2b);
var tr=dojo.create("tr",{},_2c);
var td=dojo.create("td",{role:"list"},tr);
if(_2a>0){
this.actions=null;
var _2d=d.createDocumentFragment();
this.renderSorting(_27,_2d,_28);
if(el.firstChild!=_2b){
var old=el.replaceChild(_2d,el.firstChild);
lconn.share.util.html.destroyWidgets(old);
}else{
el.insertBefore(_2d,el.firstChild);
}
var _2e=new Array();
this.favorites=((this.app.isAuthenticated()&&this.app.favorites)?this.app.favorites:null);
for(var _2f=0;_2f<_2a;_2f++){
var _30=_29[_2f];
var _31=this.constructWidgetData(_30,this.favorites);
_31.actionListValue=this.getActionListForItem(_30,_27,_28);
_31._itemIndex=_2f;
_2e.push(_31);
}
this.fileThumbnailWidgets=[];
var _32=dojo.create("div",null,td,"first");
dojo.addClass(_32,"dojoDndSource dojoDndTarget dojoDndContainer");
dojo.forEach(_2e,dojo.hitch(this,function(_33,i){
dojo.mixin(_33,{role:"listitem",index:i+1});
var _34=this.getItemThumbnailWidget(_33);
if(_33.isSelectedstatus){
_34._setSelectedAttr(true);
}
this.fileThumbnailWidgets.push(_34);
this.addStateful(_34,_29[_33._itemIndex]);
lconn.share.scenehelper.applyDndProperty(_34.domNode,_33._itemIndex,_29[_33._itemIndex]);
this._addGridItem(_32,_34.domNode);
}));
var _35=this.favorites?this.favorites.files:null;
if(_35){
if(!_35.def.isCanceled()){
_35.def.resolve(this.fileThumbnailWidgets);
_35.def.cancel();
}
}
lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage(_27.domNode);
this.updatePaging(_27,el,_28,opt);
this.attachDragSource(_32,_27,_28);
}else{
this.renderEmpty(_27,el,_28);
}
},renderItemGrid:function(_36,el,_37,doc,_38){
var _39=lconn.share.previewConfig;
var _3a=_39.gridViewTextHeight;
var _3b=_39.gridViewHeight;
var _3c=_39.gridViewWidth;
var _3d=parseInt(_3b)+parseInt(_3a);
var px="px";
var _3e=this;
var app=this.app;
var _3f=dojo.create("div",{className:"grid-ics-tile"},el);
_3f.style.width=_3c+px;
_3f.style.height=_3d+px;
doc.checkElement=_3f;
this.selectionListeners.push(dojo.connect(_3f,"onclick",dojo.hitch(this,"onSelectItem",doc)));
this.selectionListeners.push(dojo.connect(_3f,"onmouseenter",dojo.hitch(this,"onMouseEnter",doc,doc.getId())));
this.selectionListeners.push(dojo.connect(_3f,"onmouseleave",dojo.hitch(this,"onMouseLeave",doc,doc.getId())));
var _40=dojo.create("div",{className:"grid-ics-wrapper"},_3f);
var _41=dojo.create("div",{className:"grid-ics-inner"},_40);
var _42=dojo.create("div",{id:"grid-front"+doc.getId(),className:"grid-ics-tile-front"},_41);
_42.style.width=_3c+px;
_42.style.height=_3d+px;
var _43=dojo.create("div",{className:"grid-ics-tile-img"},_42);
_43.style.width=_3c+px;
_43.style.height=_3b+px;
_43.style.position="relative";
var _44=lconn.share.util.html.formatFilename(doc.getName());
var _45=_44;
var _46=_44;
var url=doc.getUrlThumbnail();
var _47=dojo.create("A",{href:"javascript:;"},_43);
_47.setAttribute("role","button");
var _48=null;
var img=null;
if(url!=""){
_48=dojo.create("div",{className:"grid-ics-tile-img"},_47);
img=dojo.create("img",{title:_44,className:"grid-img",style:"max-height:"+_3b+px+";max-width:"+_3c+px,src:url},_48);
if(_39.validVideoExts.indexOf(lconn.share.util.text.getExtension(doc.getName()))>-1){
dojo.create("span",{className:"grid-ics-videoimg"},_48);
}
dojo.connect(img,"onerror",function(_49){
dojo.empty(_48);
_48.className="grid-ics-tile-img  grid-ics-tile-icon";
var _4a=dojo.create("img",{title:_44},_48);
_3e.generateFileTypeImage(_4a,lconn.share.util.text.getExtension(doc.getName()),64,doc);
if(_39.validVideoExts.indexOf(lconn.share.util.text.getExtension(doc.getName()))>-1){
dojo.create("span",{className:"grid-ics-playimg"},_48);
}
});
}else{
_48=dojo.create("div",{className:"grid-ics-tile-img  grid-ics-tile-icon"},_47);
img=dojo.create("img",{title:_44},_48);
this.generateFileTypeImage(img,lconn.share.util.text.getExtension(doc.getName()),64,doc);
if((doc.getExtension()!="")&&_39.validVideoExts.indexOf(lconn.share.util.text.getExtension(doc.getName()))>-1){
dojo.create("span",{className:"grid-ics-playimg"},_48);
}
}
var _4b=dojo.create("div",{className:"grid-ics-tile-summary",style:"line-height:"+_3a+px},_42);
_4b.style.width=_3c+px;
_4b.style.height=_3a+px;
var _4c=parseInt(_3c)-20;
var _4d=null;
if(!dojo._isBodyLtr()){
_46=this.trimToLength(_44,27);
_4d=dojo.create("div",{className:"grid-ics-tile-summary-text",style:"line-height:"+_3a+px,dir:"ltr"},_4b);
}else{
_4d=dojo.create("div",{className:"grid-ics-tile-summary-text",style:"line-height:"+_3a+px},_4b);
}
_4d.style.width=_4c+px;
_4d.style.height=_3a+px;
var _4e=dojo.create("span",{},_4d);
_4e.innerHTML=_46;
var m=this.getShareMessage(doc,this._strings);
var d=document;
var _4f=d.createElement("img");
var img=_4f.cloneNode(true);
img.src=dojo.config.blankGif;
img.className=m.i;
img.title=img.alt=dojo.string.substitute(m.s,[m.c]);
img.style.marginTop="1px";
var _50=dojo.create("span",{className:"grid-span-right"},_4b);
_50.style.top="5px";
if(this.applyShareLink){
this.applyShareLink(this.app,_50,img,null,m.a,doc);
}
var _51=dojo.create("div",{id:"grid-back"+doc.getId(),className:"grid-ics-tile-back"},_41);
dojo.create("span",{className:"grid-ics-tile-uncheck"},_51);
_51.style.width=_3c+px;
_51.style.height=_3d+px;
var _52="";
if(dojo._isBodyLtr()){
_52=dojo.create("h4",{className:"grid-h4-padding-left grid-ics-tile-summary-text"},_51);
}else{
_52=dojo.create("h4",{className:"grid-h4-padding-left grid-ics-tile-summary-text",dir:"ltr"},_51);
}
var _53=dojo.create("a",{className:"",href:doc.getUrlAlternate(),title:_45},_52);
_53.innerHTML=dojo._isBodyLtr()?_45:_46;
dojo.connect(_53,"onclick",function(evt){
if(evt){
dojo.stopEvent(evt);
}
window.location=doc.getUrlAlternate();
});
var _54=dojo.create("div",{className:"grid-div-pading-left"},_51);
dojo.connect(_54,"onclick",function(evt){
if(evt.target.href!=undefined){
if(evt){
dojo.stopEvent(evt);
}
window.location=evt.target.href;
}
});
var _55=this.metas;
var _56={app:app,file:doc,renderer:this,nls:dojo.mixin({},this._appstrings,this._strings)};
if(this.applyFileDescriptions){
this.applyFileDescriptions(app,doc,_55,d,_54,_56);
}
dojo.create("div",{className:"grid-bottom"},_51);
this.renderGridButton(_51,_36,_37,doc,_38,this);
dojo.create("span",{className:"grid-ics-tile-check"},_40);
if(this.createFavoriteToggle){
if(doc.getLibraryType()!="communityFiles"&&doc.getLibraryType()!="communityECMFiles"){
this.favorites=((app.isAuthenticated()&&app.favorites)?app.favorites.files:null);
var _57=this.favorites.createToggle(doc.getId());
var _58=this.favorites.createToggle(doc.getId());
var _59=null;
var _5a=null;
_59=dojo.create("div",{id:"grid-pinnedDiv"+"-"+doc.getId(),className:"grid-a-pinned "},_40);
_5a=dojo.create("div",{id:"grid-pinnedDiv2"+"-"+doc.getId(),className:"grid-a-back-pinned "},_51);
_59.appendChild(_57);
_5a.appendChild(_58);
this.selectionListeners.push(dojo.connect(_59,"onclick",dojo.hitch(this,"onPinnedDivClick",this,doc)));
this.selectionListeners.push(dojo.connect(_5a,"onclick",dojo.hitch(this,"onPinnedBackDivClick",this,doc)));
}
}
var _5b=doc._isSelected;
if(_5b){
doc.checkElement.className="grid-ics-tile grid-ics-is-selected ";
}
},generateLockIcon:function(d,el,doc,_5c,opt){
},renderUserFragment:function(_5d,_5e,_5f,_60,_61){
var d=document;
var _62=(_5f.getUpdated().getTime()!=_5f.getPublished().getTime());
var _63=_62?_5f.getModifier():_5f.getAuthor();
var _64=this.permissions.isAuthenticated()?this.permissions.isAuthenticated(_63.id):false;
var nls=this._appstrings.DOCUMENTCONTENT;
var _65=_62?(_64?nls.LABEL_UPDATED:nls.LABEL_UPDATED_OTHER):(_64?nls.LABEL_ADDED:nls.LABEL_ADDED_OTHER);
var df=new lconn.share.util.DateFormat(_5f.getUpdated());
var _66=df.formatByAge(_65);
lconn.share.util.html.substitute(d,_61,_66,{user:function(){
var a=d.createElement("a");
a.className="lotusPerson";
a.appendChild(d.createTextNode(_63.name));
this.generateLinkToPerson(_63,a);
return a;
}},null,this);
_61.title=df.format(_65.FULL);
},isSkipNode:function(_67){
return _67.className=="lotusTags"||_67.className=="lotusRecommend";
},getSorts:function(_68,_69){
var nls=this._appstrings.COLUMN.FILE;
var _6a=[{id:"name",name:nls.NAME,lowToHigh:true,tooltip:nls.NAME_L},{id:"modified",name:nls.MODIFIED,isDefault:true,tooltip:nls.MODIFIED_L}];
if(this.showDownloads){
_6a.push({id:"downloads",name:nls.DOWNLOADS,tooltip:nls.DOWNLOADS_L});
}
if(this.showComments){
_6a.push({id:"comments",name:nls.COMMENTS,tooltip:nls.COMMENTS_L});
}
if(this.showRecommendations){
_6a.push({id:"recommendations",name:nls.RECOMMENDATIONS,tooltip:nls.RECOMMENDATIONS_L});
}
return _6a;
},buildXsltRecommendation:function(doc,a){
return new lconn.files.widget.RecommendInfo({_rendered:true,imgNode:a.firstChild,labelNode:a.lastChild},a);
},clickRecommendation:function(_6b,_6c,e){
this._xsltRecommender(_6b,_6c,"onClick",e);
},hoverRecommendation:function(_6d,_6e,e){
this._xsltRecommender(_6d,_6e,"onMouseEnter",e);
},buildRecommendation:function(doc,a){
return new lconn.files.widget.RecommendInfo({nls:this._appstrings.RECOMMEND,countOnly:true,timesRated:doc.getRatingCount(),large:true},top);
},onSelectAll:function(_6f,_70,el){
if(!_6f||!_6f.itemByPosition){
return;
}
var _71=_6f.itemByPosition;
var _72=_70.checked;
var _73=[];
dojo.forEach(_71,function(_74){
if(_72){
_74._isSelected=true;
}else{
_74._isSelected=false;
}
if(_72){
_73.push(_74);
}
});
dojo.forEach(this.fileThumbnailWidgets,function(_75){
if(_72){
_75._setSelectedAttr(true);
}else{
_75._setSelectedAttr(false);
}
});
this.selection=_73;
this.selectionChanged(this.selection);
this.updateSelectAllTitle();
},onSelectItem:function(_76,_77){
if(!_77){
var id=_76.getId?_76.getId():_76.id;
this.selection=dojo.filter(this.selection,function(s){
if(s==_76){
return false;
}
var sId=s.getId?s.getId():s.id;
if(sId&&id&&sId==id){
return false;
}
return true;
});
_76._isSelected=false;
}else{
_76._isSelected=true;
this.selection.push(_76);
}
if(this.selectAllElement){
this.selectAllElement.checked=this.isAllSelected();
}
this.selectionChanged(this.selection);
this.updateSelectAllTitle();
},onMouseEnter:function(_78,id){
if(dojo.isIE){
var _79=dojo.fadeOut({node:"grid-front"+id,duration:1000});
dojo.connect(_79,"onEnd",function(){
var _7a=dojo.byId("grid-front"+id);
_7a.style.display="none";
_78.checkElement.className=_78.checkElement.className+"  grid-ics-hover";
var _7b=dojo.byId("grid-back"+id);
_7b.checkElement.className=_78.checkElement.className+"  grid-ics-tile-back-show";
});
_79.play();
play=_79;
}else{
var _7c=dojo.byId("grid-front"+id);
if(_78.checkElement==null||_78.checkElement==""){
_78.checkElement=_7c.parentNode.parentNode.parentNode;
}
_78.checkElement.className=_78.checkElement.className+"  grid-ics-hover";
}
},onMouseLeave:function(_7d,id){
if(dojo.isIE){
play.stop();
var _7e=dojo.byId("grid-front"+id);
_7e.style.display="block";
var _7f=dojo.fadeIn({node:"grid-front"+id,duration:1000});
dojo.connect(_7f,"onEnd",function(){
var _80=dojo.byId("grid-back"+id);
_80.checkElement.className="grid-ics-tile-back";
});
_7f.play();
}else{
var _7e=dojo.byId("grid-front"+id);
if(_7d.checkElement==null||_7d.checkElement==""){
_7d.checkElement=_7e.parentNode.parentNode.parentNode;
}
_7d.checkElement.className=_7d.checkElement.className.replace("grid-ics-hover"," ");
}
},onPinnedDivClick:function(_81,doc,evt){
if(evt){
dojo.stopEvent(evt);
}
var _82=dojo.byId("grid-pinnedDiv"+"-"+doc.getId()).firstChild;
var _83=dojo.byId("grid-pinnedDiv2"+"-"+doc.getId()).firstChild;
dojo.publish(dojo.attr(_82,"topic"),[_82,evt]);
if(_83.firstChild.className.indexOf("lconnSprite-iconPinned16-on")>0){
dojo.publish(dojo.attr(_83,"topic"),[_83,evt]);
}
dojo.byId("grid-pinnedDiv2"+"-"+doc.getId()).className="grid-pinned-show";
},onPinnedBackDivClick:function(_84,doc,evt){
if(evt){
dojo.stopEvent(evt);
}
var _85=dojo.byId("grid-pinnedDiv"+"-"+doc.getId()).firstChild;
dojo.publish(dojo.attr(_85,"topic"),[_85,evt]);
dojo.byId("grid-pinnedDiv2"+"-"+doc.getId()).className="grid-pinned-hidden";
},trimToLength:function(s,_86){
var _87=this;
if(!s){
return "";
}
var _88="...";
if(s.length>_86){
s=_88+_87.trimEnd(s.substring(0,_86-_88.length));
}
return s;
},addStateful:function(_89,_8a){
var _8b=this;
_89.watch("selected",function(){
_8b.onSelectItem(_8a,_89.selected);
});
},trimEnd:function(s){
if(!s){
return "";
}
s+="";
s=/^(.*?)\s*$/.exec(s)[1];
return s;
},isVideo:function(_8c){
var ext=_8c.getExtension();
var _8d=lconn.share.previewConfig.validVideoExts;
var _8e=_8d.split(",");
var _8f=dojo.indexOf(_8e,ext);
return (_8f!=-1)?true:false;
},getUrlForPersonalFileInCommunity:function(_90,app,opt){
var _91=app.routes;
var _92=_90.getId();
var url=_90.getUrlAlternate?_90.getUrlAlternate():null;
if(_90.getLibraryType()=="communityECMFiles"){
url=url||_90.getUrlVia?_90.getUrlVia():null;
}
url=url||_91.getFileSummaryUrl(null,_92,{section:(opt)?opt.section:null});
if(this.app.restrictUserInComm&&this.app.isCommunityScene&&_90.getLibraryType()!="communityFiles"){
url=_91.getFileSummaryUrl(null,_92,{section:(opt)?opt.section:null});
}
return url;
}});
}


;if(!dojo._hasResource["lconn.share.widget.FolderThumbnail"]){
dojo._hasResource["lconn.share.widget.FolderThumbnail"]=true;
(function(){
dojo.provide("lconn.share.widget.FolderThumbnail");


var _1=lconn.share.widget.AbstractThumbnail;
dojo.declare("lconn.share.widget.FolderThumbnail",[lconn.share.widget.AbstractThumbnail],{postMixInProperties:function(){
this.inherited(arguments);
this.altThumbnail=this.ft_mainThumbnailFolder.replace("%0",this.value.index);
this.value.fileType="dir";
this.ft_summary=this.ft_folder_summary;
},postCreate:function(){
this.inherited(arguments);
if(this.value.actionListValue.length===1&&this.value.actionListValue[0].name==="Open"){
this.backSideAction=this.value.actionListValue[0].callback;
}
dojo.setAttr(this.domNode,"aria-label",this.ft_mainControlsFolder.replace("%0",this.value.index).replace("%1",this.value.fileName));
},summary:function(){
this.backSideAction();
}});
lconn.share.widget.FolderThumbnail.DEFAULT_EXPECTED_THUMBNAIL_SIZE=_1.DEFAULT_EXPECTED_THUMBNAIL_SIZE;
})();
}


;if(!dojo._hasResource["lconn.files.scenes.AbstractGridRenderer"]){
dojo._hasResource["lconn.files.scenes.AbstractGridRenderer"]=true;
dojo.provide("lconn.files.scenes.AbstractGridRenderer");
























dojo.declare("lconn.files.scenes.AbstractGridRenderer",[lconn.share.widget.FileRendererGrid,lconn.files.widget.FileDndCore],{getSorts:function(_1,_2){
var _3=this.inherited(arguments);
for(var i=0;i<_3.length;i++){
if(_3[i].id=="modified"){
_3[i].isDefault=true;
break;
}
}
return _3;
},gotoFolder:function(_4,_5){
_5.navigate(_5.routes.getCollectionUrl(_4,{}));
},_buildItem:function(_6,_7){
if(_6 instanceof lconn.share.bean.PartialFile){
dojo.mixin(_7,_6);
return _7;
}
if(_6 instanceof lconn.share.bean.PartialCollection){
dojo.mixin(_7,_6);
return _7;
}
var _8=lconn.share.bean.File.createBean(_6,{apiType:this.apiType});
if(_8.getCategory()=="collection"){
_8=lconn.share.bean.Collection.createBean(_6,{apiType:this.apiType});
}
return _8;
},constructWidgetData:function(_9,_a){
var _b={isSelectedstatus:_9._isSelected,fileId:_9.getId(),fileName:lconn.share.util.html.formatFilename(_9.getName()),fileAuthor:_9.getAuthor(),fileDatePublished:_9.getPublished().toJSON(),fileModifier:_9.getModifier(),fileDateModified:_9.getUpdated().toJSON(),fileSystemLastModified:_9.getSystemLastModified().toJSON(),fileSync:_9.isFolder()?false:_9.isSyncable()&&_9.getLibraryType()=="personalFiles",isFolder:_9.isFolder(),visibility:_9.getVisibility&&_9.getVisibility(),folderType:_9.getType&&_9.getType()};
if(_9.isFolder()){
if(_9.getType()!="community"&&!this.app.isCommunityScene){
_b.context="folders";
}else{
_b.context="communityFiles";
}
}else{
if(!this.app.isCommunityScene&&_9.getLibraryType()!="communityFiles"&&_9.getLibraryType()!="communityECMFiles"){
_b.context="files";
}else{
_b.context="communityFiles";
}
}
if(!_9.isFolder()){
_b.fileType=_9.getExtension();
}
if(_a&&!this.app.isCommunityScene&&_b.context!="communityFiles"){
if(_a.files&&!_9.isFolder()){
_b.filePinned=_a.files.isPinned(_9.getId());
var _c=new Object();
_c.callback=_a.files.gridOnToggle;
_c.that=_a.files;
_b.pinnedAction=_c;
}else{
if(_a.folders&&_9.isFolder()){
_b.filePinned=_a.folders.isPinned(_9.getId());
var _c=new Object();
_c.callback=_a.folders.gridOnToggle;
_c.that=_a.folders;
_b.pinnedAction=_c;
}
}
}
if(_9.isExternal()&&((this.app&&this.app.isCommunityScene&&!this.app.isExternalCommunity)||!this.app.isCommunityScene)){
_b.fileVisibilityLocking="sharedExternally";
}else{
if(!_9.isFolder()&&_9.isLocked()){
var _d=_9.getLock();
var _e=this.app.getAuthenticatedUserId();
var _f=_e==_d.getOwner().id;
_b.fileVisibilityLocking=_f?"lockedByMe":"locked";
}else{
_b.fileVisibilityLocking=lconn.files.scenes.share.getVisibility(_9);
_b.fileVisibilityLocking=_b.fileVisibilityLocking=="community"?"sharedCommunity":_b.fileVisibilityLocking;
}
}
var url=null;
if(!_9.isFolder()){
url=_9.getUrlThumbnail();
}
if(url){
url=url+"&preventCache=";
if(this.isVideo(_9)){
_b.fileImagePath=url+new Date(_9.getSystemLastModified()).getTime();
}else{
_b.fileImagePath=url+new Date(_9.getUpdated()).getTime();
}
}
if(!_9.isFolder()){
_b.filePath=this.getUrlForPersonalFileInCommunity(_9,this.app);
}else{
if(this.app.routes.getCollectionSummaryUrl){
_b.filePath=this.app.routes.getCollectionSummaryUrl(null,_9.getId(),null);
}else{
if(this.app.routes.getCollectionUrl){
_b.filePath=this.app.routes.getCollectionUrl(_9.getId(),null);
}
}
}
return _b;
},getActionListForItem:function(_10,_11,_12){
var _13=[];
if(_10.isFolder()){
var _14={name:"Open",callback:dojo.hitch(this,this.gotoFolder,_10.getId(),this.app)};
_13.push(_14);
}else{
_13=this.inherited(arguments);
}
return _13;
},getItemThumbnailWidget:function(_15){
var _16=null;
if(_15.isFolder){
_16=new lconn.share.widget.FolderThumbnail({value:_15});
}else{
_16=new lconn.share.widget.FileThumbnail({value:_15});
}
return _16;
},renderItemGrid:function(_17,el,_18,doc,_19){
var _1a=lconn.share.previewConfig;
var _1b=_1a.gridViewTextHeight;
var _1c=_1a.gridViewHeight;
var _1d=_1a.gridViewWidth;
var _1e=parseInt(_1c)+parseInt(_1b);
var px="px";
var _1f=this;
var app=this.app;
var _20=dojo.create("div",{className:"grid-ics-tile"},el);
_20.style.width=_1d+px;
_20.style.height=_1e+px;
doc.checkElement=_20;
this.selectionListeners.push(dojo.connect(_20,"onclick",dojo.hitch(this,"onSelectItem",doc)));
this.selectionListeners.push(dojo.connect(_20,"onmouseenter",dojo.hitch(this,"onMouseEnter",doc,doc.getId())));
this.selectionListeners.push(dojo.connect(_20,"onmouseleave",dojo.hitch(this,"onMouseLeave",doc,doc.getId())));
var _21=dojo.create("div",{className:"grid-ics-wrapper"},_20);
var _22=dojo.create("div",{className:"grid-ics-inner"},_21);
var _23=dojo.create("div",{id:"grid-front"+doc.getId(),className:"grid-ics-tile-front"},_22);
_23.style.width=_1d+px;
_23.style.height=_1e+px;
var _24=dojo.create("div",{className:"grid-ics-tile-img"},_23);
_24.style.width=_1d+px;
_24.style.height=_1c+px;
_24.style.position="relative";
var _25=lconn.share.util.html.formatFilename(doc.getName());
var _26=_25;
var _27=_25;
var url=doc.getUrlThumbnail();
var _28=dojo.create("A",{href:"javascript:;"},_24);
_28.setAttribute("role","button");
var _29=null;
var img=null;
if(url!=""){
_29=dojo.create("div",{className:"grid-ics-tile-img"},_28);
img=dojo.create("img",{title:_25,className:"grid-img",style:"max-height:"+_1c+px+";max-width:"+_1d+px,src:url},_29);
if(_1a.validVideoExts.indexOf(lconn.share.util.text.getExtension(doc.getName()))>-1){
dojo.create("span",{className:"grid-ics-videoimg"},_29);
}
dojo.connect(img,"onerror",function(_2a){
dojo.empty(_29);
_29.className="grid-ics-tile-img  grid-ics-tile-icon";
var _2b=dojo.create("img",{title:_25},_29);
if(!doc.isFolder()){
_1f.generateFileTypeImage(_2b,lconn.share.util.text.getExtension(doc.getName()),64,doc);
}else{
_2b.className="lconn-ftype32 lconn-ftype32-dir";
}
if(_1a.validVideoExts.indexOf(lconn.share.util.text.getExtension(doc.getName()))>-1){
dojo.create("span",{className:"grid-ics-playimg"},_29);
}
});
}else{
_29=dojo.create("div",{className:"grid-ics-tile-img  grid-ics-tile-icon"},_28);
img=dojo.create("img",{title:_25},_29);
if(!doc.isFolder()){
this.generateFileTypeImage(img,lconn.share.util.text.getExtension(doc.getName()),64,doc);
}else{
img.className="lconnSprite lconnSprite-iconFolderClose32";
}
if((doc.getExtension()!="")&&_1a.validVideoExts.indexOf(lconn.share.util.text.getExtension(doc.getName()))>-1){
dojo.create("span",{className:"grid-ics-playimg"},_29);
}
}
var _2c=dojo.create("div",{className:"grid-ics-tile-summary",style:"line-height:"+_1b+px},_23);
_2c.style.width=_1d+px;
_2c.style.height=_1b+px;
var _2d=parseInt(_1d)-20;
var _2e=null;
if(!dojo._isBodyLtr()){
_27=this.trimToLength(_25,27);
_2e=dojo.create("div",{className:"grid-ics-tile-summary-text",style:"line-height:"+_1b+px,dir:"ltr"},_2c);
}else{
_2e=dojo.create("div",{className:"grid-ics-tile-summary-text",style:"line-height:"+_1b+px},_2c);
}
_2e.style.width=_2d+px;
_2e.style.height=_1b+px;
var _2f=dojo.create("span",{},_2e);
_2f.innerHTML=_27;
var m=this.getShareMessage(doc,this._strings);
var d=document;
var _30=d.createElement("img");
var img=_30.cloneNode(true);
img.src=dojo.config.blankGif;
img.className=m.i;
img.title=img.alt=dojo.string.substitute(m.s,[m.c]);
img.style.marginTop="1px";
var _31=dojo.create("span",{className:"grid-span-right"},_2c);
_31.style.top="5px";
lconn.files.scenehelper.applyShareLink(this.app,_31,img,null,m.a,doc);
var _32=dojo.create("div",{id:"grid-back"+doc.getId(),className:"grid-ics-tile-back"},_22);
dojo.create("span",{className:"grid-ics-tile-uncheck"},_32);
_32.style.width=_1d+px;
_32.style.height=_1e+px;
var _33="";
if(dojo._isBodyLtr()){
_33=dojo.create("h4",{className:"grid-h4-padding-left grid-ics-tile-summary-text"},_32);
}else{
_33=dojo.create("h4",{className:"grid-h4-padding-left grid-ics-tile-summary-text",dir:"ltr"},_32);
}
var _34=dojo.create("a",{className:"",href:doc.getUrlAlternate(),title:_26},_33);
_34.innerHTML=dojo._isBodyLtr()?_26:_27;
dojo.connect(_34,"onclick",function(evt){
if(evt){
dojo.stopEvent(evt);
}
window.location=doc.getUrlAlternate();
});
var _35=dojo.create("div",{className:"grid-div-pading-left"},_32);
dojo.connect(_35,"onclick",function(evt){
if(evt.target.href!=undefined){
if(evt){
dojo.stopEvent(evt);
}
window.location=evt.target.href;
}
});
dojo.create("div",{className:"grid-bottom"},_32);
this.renderGridButton(_32,_17,_18,doc,_19,this);
dojo.create("span",{className:"grid-ics-tile-check"},_21);
if(this.createFavoriteToggle){
if(!doc.isFolder()&&doc.getLibraryType()!="communityFiles"&&doc.getLibraryType()!="communityECMFiles"&&this.isCommunityScene){
this.favorites=((app.isAuthenticated()&&app.favorites)?app.favorites.files:null);
var _36=this.favorites.createToggle(doc.getId());
var _37=this.favorites.createToggle(doc.getId());
var _38=null;
var _39=null;
_38=dojo.create("div",{id:"grid-pinnedDiv"+"-"+doc.getId(),className:"grid-a-pinned "},_21);
_39=dojo.create("div",{id:"grid-pinnedDiv2"+"-"+doc.getId(),className:"grid-a-back-pinned "},_32);
_38.appendChild(_36);
_39.appendChild(_37);
this.selectionListeners.push(dojo.connect(_38,"onclick",dojo.hitch(this,"onPinnedDivClick",this,doc)));
this.selectionListeners.push(dojo.connect(_39,"onclick",dojo.hitch(this,"onPinnedBackDivClick",this,doc)));
}
}
var _3a=doc._isSelected;
if(_3a){
doc.checkElement.className="grid-ics-tile grid-ics-is-selected ";
}
},applyShareLink:function(app,el,_3b,_3c,_3d,_3e){
lconn.files.scenehelper.applyShareLink(app,el,_3b,_3c,_3d,_3e);
},applyFileDescriptions:function(app,doc,_3f,d,div,_40){
lconn.files.scenehelper.applyFileDescriptions(app,doc,_3f,d,div,_40);
},generateLockIcon:function(d,el,doc,_41,opt){
var img=lconn.files.scenehelper.generateLockIcon(d,el,doc,_41,opt);
img.style.marginLeft="5px";
return img;
}});
}


;if(!dojo._hasResource["lconn.files.scenes.UserChannel"]){
dojo._hasResource["lconn.files.scenes.UserChannel"]=true;
dojo.provide("lconn.files.scenes.UserChannel");








































dojo.declare("lconn.files.scenes.UserChannel",[lconn.share.scenes.AbstractList,lconn.files.scenes.AbstractFileList,lconn.files.scenes.AbstractUserLibraryScene,lconn.files.scenes.Navigation],{preventListLogin:true,timeout:(dojo.getObject("lconn.share.config.services.timeout.retrieveFiles")||10)*1000,constructor:function constructor(_1,_2){
this.userId=_2.userId;
this.isPersonalHome=(_1.authenticatedUser&&_1.authenticatedUser.id==this.userId);
this.hasPrivateFiles=this.isPersonalHome;
this.hints={userLikelyToDelete:this.isPersonalHome,userLikelyToTag:this.isPersonalHome,userLikelyToShare:true,userLikelyToFileSync:true,userLikelyToAddToCollection:true,hasPublicContent:this.isPersonalHome&&_1.getUserPermissions().canShareWithPublic(),hasDnDPrompt:true};
this.typeFilters=lconn.files.scenehelper.getChannelFilters(_1).TYPE;
this.dateFilters=lconn.files.scenehelper.getChannelFilters(_1).DATE;
this.sharingFilters=lconn.files.scenehelper.getChannelFilters(_1).SHARE;
this.views=this.getViews();
this.supportedColumns=lconn.files.columns.get("file/library",_1,this);
this.defaultSortId="modified";
this.subscribe("lconn/files/tags/changed","onTagChange");
this.init(_1,_2);
},_isInfoEqual:function(a,b){
return this.inherited(arguments)&&a.userId==b.userId;
},initPivot:function(){
if(this.activePivot){
return this.activePivot;
}
var _3=this.app;
var _4=_3.nls;
var _5=dojo.getObject("authenticatedUser.orgName",false,_3)||_4.ORGNAME_DEFAULT;
var _6=!!_3.authenticatedUser;
var _7;
if(!_6){
_7={searchScope:"thisuser",name:_4.PIVOTS.ANON_MEDIA,tooltip:_4.PIVOTS.ANON_MEDIA_TOOLTIP,longName:_4.PIVOTS.ANON_MEDIA_LONG,longName_x:_4.PIVOTS.ANON_MEDIA_LONG_X,description:_4.PIVOTS.ANON_MEDIA_DESC,windowTitle:_4.PIVOTS.ANON_MEDIA_WINDOWTITLE,windowTitle_x:_4.PIVOTS.ANON_MEDIA_WINDOWTITLE_X,msgNoData:_4.CONTENT.EMPTY.MEDIA};
}else{
if(!this.isPersonalHome){
_7={searchScope:"thisuser",name:_4.PIVOTS.MEDIA,tooltip:_4.PIVOTS.MEDIA_TOOLTIP,longName:_4.PIVOTS.MEDIA_LONG,longName_x:_4.PIVOTS.MEDIA_LONG_X,description:dojo.string.substitute(_4.PIVOTS.MEDIA_DESC,{company:_5}),windowTitle:_4.PIVOTS.MEDIA_WINDOWTITLE,windowTitle_x:_4.PIVOTS.MEDIA_WINDOWTITLE_X,msgNoData:_4.CONTENT.EMPTY.MEDIA};
}else{
_7={navigationId:"myfiles",searchScope:"myfiles",name:_4.PIVOTS.MY_MEDIA,tooltip:_4.PIVOTS.MY_MEDIA_TOOLTIP,longName:_4.PIVOTS.MY_MEDIA_LONG,longName_x:_4.PIVOTS.MEDIA_LONG_X,description:_4.PIVOTS.MY_MEDIA_DESC,windowTitle:_4.PIVOTS.MY_MEDIA_WINDOWTITLE,windowTitle_x:_4.PIVOTS.MEDIA_WINDOWTITLE_X,msgNoData:_4.CONTENT.EMPTY.MY_MEDIA};
}
}
this.activeNavigationId=_7.navigationId;
this.msgNoData=lconn.files.scenehelper.getStandardMsgNoData(this,_7.msgNoData);
this.activePivot=_7;
return _7;
},initFilters:function(_8,_9){
var p=_9.parameters;
var _a=true;
if(p.tag){
var _b=dojo.isArray(p.tag)?p.tag:[p.tag];
var _c=this.activeTags={};
var _d=this.activeFilters;
dojo.forEach(_b,function(_e){
_d.push({id:"tags",longName:_e,setServiceOptions:function(_f){
(_f.tag=_f.tag||[]).push(_e);
},removeAppParams:function(_10){
if(_10.tag){
var _11=dojo.indexOf(_10.tag,_e);
if(_11!=-1){
delete _10.tag[_11];
}
}
}});
_c[_e]=1;
});
this.params.tag=_b;
}
if(p.date){
_a=false;
var _12=lconn.share.util.misc.indexById(this.dateFilters,"id",p.date);
if(_12){
this.activeFilters.push(_12);
}
this.params.date=p.date;
}
if(p.sharing){
_a=false;
var _12=lconn.share.util.misc.indexById(this.sharingFilters,"id",p.sharing);
if(_12){
this.activeFilters.push(_12);
}
this.params.sharing=p.sharing;
}
if(p.type){
_a=false;
var _12=lconn.share.util.misc.indexById(this.typeFilters,"id",p.type);
if(_12){
this.activeFilters.push(_12);
}
this.params.type=p.type;
}
if(p.search&&_a){
this.activeFilters.push({id:"search",longName:p.search,setServiceOptions:function(_13){
_13.search=p.search;
},removeAppParams:function(_14){
delete _14.search;
}});
this.params.search=p.search;
}
},isSortValid:function(_15){
if(this.params.search||this.activeView.id=="details"){
return !!{"name":1,"modified":1,"recommendations":1,"comments":1,"downloads":1}[_15.id];
}
return true;
},begin:function(_16){
var _17=this.userId;
if(!this.userId){
var _18=this.app.authenticatedUser;
if(_18){
return this.app.routes.getUserChannelUrl(_18.id);
}else{
return this.app.routes.getPublicFilesUrl();
}
}
if(_16&&_16.highlightItems){
this.highlightItems=_16.highlightItems;
}
this.update();
},end:function(_19){
this.visible=false;
this.widgets=[];
this.taglist=null;
this.tagConnect=null;
lconn.share.util.misc.destroy(this.actions);
this.actions=[];
this.listActions=[];
this.user=null;
this.inherited(arguments);
},loadListSuccess:function(_1a,_1b,_1c){
this.preventListLogin=false;
var _1d=this.library=new lconn.share.bean.LibraryFromFeed(_1b.documentElement);
var q=this.app.getQuota();
if(q&&!isNaN(_1d.getQuota())&&this.isPersonalHome){
q.update(_1d.getSize(),_1d.getQuota(),_1d.getTrashSize());
}
if(!this.user&&_1b.documentElement){
var _1e=lconn.share.util.dom.getChildElement(_1b.documentElement,"author");
if(_1e){
this.user=this.app.createUser(new lconn.share.bean.User(_1e));
this.user.hasPersonalPlace=true;
}
}
if(!this.user){
this.showError();
}
if(!this.visible){
this.show();
}else{
if(this.list){
this.list.update(_1a);
}
}
var _1f=this.user;
var d=this.app.document;
var s=_1f.name;
var _20=false;
if(s&&s[s.length-1]=="s"){
_20=true;
}
d.title=dojo.string.substitute(_20?this.activePivot.windowTitle_x:this.activePivot.windowTitle,{possessive:_1f.name});
this.renderHeaderTitle(d,dojo.byId("scene-title"));
this.renderQuota(d,this.quotaDiv);
},loadListError:function(_21,_22){
if(this.visible){
this.inherited(arguments);
return;
}
var _23=this.user;
if(!_23&&_21.el){
var _24=lconn.share.util.dom.getChildElementNS(_21.el,"user",lconn.share.util.dom.NAMESPACES.DOCUMENTS_ATOM);
if(_24){
_23=this.app.createUser(new lconn.share.bean.User(_24));
}
}
this.handleChannelError(_21.code,_23);
},update:function(p){
if(p){
this.app.navigate(this.app.routes.getUserChannelUrl(this.userId,p||this.params));
}else{
var app=this.app;
var d=app.document;
var _25=this.initPivot();
this.listActions=lconn.files.actions.get("files",this.app,this);
var _26=this.sceneInfo;
var id=_26.id;
dojo.publish("lconn/share/scene/begin",[id,this,_26,app]);
this.render();
var _27=this.actions=lconn.files.actions.get("file",app,this);
var _28=this.list=new lconn.share.widget.Stream({id:"list",labelledBy:"scene-title",baseClass:"lotusChunk10 filesList",view:this.activeView.id,renderers:{details:new lconn.files.scenes.UserChannel.SocialRenderer({},app,this),summary:new lconn.files.scenes.UserChannel.CustomRenderer({},app,this),grid:new lconn.files.scenes.UserChannel.GridRenderer({},app,this)},msgNoData:this.msgNoData,_strings:app.nls.CONTENT,setPageSize:dojo.hitch(this,this.setPageSize),net:app.net,page:dojo.hitch(this,this.page),next:dojo.hitch(this,this.nextPage),previous:dojo.hitch(this,this.previousPage)},d.getElementById("scene-list"));
this.connect(_28,"onUpdate",this,"onListUpdate");
d.body.style.visibility="visible";
this._updateList();
}
},_updateList:function(){
var _29=this.getListUrl();
this.updateList(_29);
},show:function(){
this.visible=true;
if(this.listData){
this.list.update(this.listData);
}
},onViewOptionsChanged:function(_2a){
this.list.renderers.summary.loadColumns();
this.inherited(arguments);
},onTagChange:function(_2b){
if(this.taglist&&!(!this.isPersonalHome&&_2b)){
setTimeout(dojo.hitch(this.taglist,"reload"),1);
}
},onActionSuccess:function(e){
this.app.messages.add(e.messages);
if(this.actionSelection&&this.actionSelection.length==0){
this.actionBar.selectionChanged(this.actionSelection,null);
}
var _2c;
if(e.file){
_2c=e.file;
var h=this.highlightItems;
for(var i in h){
delete h[i];
}
if(!(e.fileFollowingChange||e.fileFavoriteChange)&&_2c&&_2c.getId){
h[_2c.getId()]=true;
}
}
if(e.fileChange&&_2c){
this.list.updateItem(_2c,e.newFile);
}else{
if(!e.fileFavoriteChange){
this._updateList();
}
}
},find:function(_2d,_2e,id){
if(_2d=="file"&&_2e=="byId"&&id){
return this._findById(id);
}
},getListUrl:function(_2f){
var p=this.getListOptions(_2f);
_2f=_2f||{};
var _30=_2f.unpaged;
if(!_30&&this.isPersonalHome&&this.app.getQuota().isExpired()){
p.includeQuota=true;
}
var url=this.app.routes.getFileListServiceUrl(this.userId,p);
return url;
},getZipDownloadUrl:function(_31){
var p=this.getListOptions(_31);
if(p.search){
return null;
}
_31=_31||{};
var _32=_31.unpaged;
if(!_32&&this.isPersonalHome&&this.app.getQuota().isExpired()){
p.includeQuota=true;
}
var url=this.app.routes.getFileListDownloadUrl(this.userId,p);
return url;
},getSceneUrl:function(_33){
return this.app.routes.getUserChannelUrl(this.userId,_33);
},getHeaderText:function(){
var _34=this.activePivot;
var _35=this.user;
if(!_35){
return "";
}
return dojo.string.substitute((_34.getLongName)?_34.getLongName(this):_34.longName,{name:_35.name,user:_35.name,possessive:lconn.share.util.text.possessive(_35.name)});
},getHeaderVariableText:function(){
var _36=this.activePivot;
var _37=this.user;
if(!_37){
return "";
}
var s=_37.name;
var _38=false;
if(s&&s[s.length-1]=="s"){
_38=true;
}
return _36.getLongName?_36.getLongName(this):_38?_36.longName_x:_36.longName;
},getHeaderDescription:function(){
var _39=this.activePivot;
if(lconn.share.util.configUtil.isFilesViewDescriptionHidden(this.authenticatedUser)){
return null;
}else{
return _39.description;
}
},renderHeader:function(d,el){
var app=this.app;
if(this.isPersonalHome){
lconn.files.scenehelper.applyWelcome(app,el,this);
}
this.inherited(arguments);
},renderHeaderTitle:function(d,el){
if(el){
dojo.empty(el);
}
if(this.isPersonalHome){
this.inherited(arguments);
}else{
var app=this.app;
var _3a=this.user;
if(!_3a){
return;
}
var _3b=this.getHeaderVariableText();
_3a.state=_3a.state||_3a.userState;
if(_3a.photoURL){
var img=com.ibm.lconn.layout.people.createImage(_3a,22,_3a.photoURL);
if(img){
el.appendChild(img);
}
}
var a=this.headerLinkNode=d.createElement("a");
lconn.share.util.html.substitute(d,a,_3b,{possessive:function(){
var a=d.createElement("a");
var _3c=com.ibm.lconn.layout.people.createLink(_3a,null,a);
if(!_3c){
lconn.share.util.html.breakString(_3a.name,d,a);
lconn.files.scenehelper.generateInactiveUserLink(app,app.routes,_3a,a);
}
dojo.addClass(a,"bidiSTT_URL");
return a;
}});
a.href=this.getHeaderLink();
el.appendChild(a);
}
},renderMessages:function(d,el){
var app=this.app;
var _3d=this.isPersonalHome;
if(_3d){
var q=app.getQuota();
if(q){
if(!q.isExpired()){
this.setQuotaAlert(q.size,q.totalSize,q.trashSize);
}else{
this.connect(q,"onUpdate",this,"setQuotaAlert");
}
}
}
this.inherited(arguments);
},renderBody:function(d,el){
var app=this.app;
var _3e=this.getListUrl({unpaged:true});
div=d.createElement("div");
div.id="scene-list";
el.appendChild(div);
this.quotaDiv=el.appendChild(d.createElement("div"));
var div=lconn.files.scenehelper.applyFeedLink(el,_3e,app.nls.FEEDS.FILES.L,app.nls.FEEDS.FILES.T,this.getHeaderText());
this.hideElementWhenEmpty(div);
this.renderDownloadScene(d,div,app.nls.ZIP_DOWNLOAD.FILES);
},renderQuota:function(d,el){
dojo.empty(el);
this.inherited(arguments);
if(dojo.getObject("lconn.share.config.features.trash")){
var app=this.app;
var _3f=app.authenticatedUser;
var _40=this.user;
if(_3f&&(dojo.indexOf(_3f.roles,"admin")!=-1)&&(_40.hasPersonalPlace==true)&&_3f.id!=_40.id){
var div=el.lastChild;
var _41=div.appendChild(d.createElement("span"));
_41.className="lotusDivider";
_41.appendChild(d.createTextNode("|"));
dijit.setWaiState(_41,"hidden",true);
dijit.setWaiRole(_41,"img");
var a=div.appendChild(d.createElement("a"));
a.href=app.routes.getDeletedFilesUrl(_40.id);
a.appendChild(d.createTextNode(app.nls.QUOTA.POPUP.SEE_DELETED));
}
}
},renderFilters:function(d,el){
var app=this.app;
var _42=lconn.files.scenehelper;
var lfs=lconn.files.scenes;
var _43=dojo.filter(this.dateFilters,function(_44){
if(_44.isValid){
return _44.isValid(app,this);
}
return true;
},this);
var _45=dojo.filter(this.typeFilters,function(_46){
if(_46.isValid){
return _46.isValid(app,this);
}
return true;
},this);
var _47=dojo.filter(this.sharingFilters,function(_48){
if(_48.isValid){
return _48.isValid(app,this);
}
return true;
},this);
var _49=this.userId;
var _4a=dojo.clone(this.params);
delete _4a.page;
var _4b=this.activeFilters;
var _4c=app.routes;
var _4d=_4a.search?true:false;
var _4e=true;
var _4f=(this.isPersonalHome)?app.nls.FILTERS.MY_TAGS:app.nls.FILTERS.USER_TAGS;
var div=_42.createFilterFrame(app,el,_4f,"files.filter.tag",_4e,{id:"lconnTagCloudFilter",contentId:"lconnTagCloudContent"});
var _50=this.divtags=d.createElement("div");
div.appendChild(_50);
this.taglist=null;
if(!this.tagConnect){
this.tagConnect=dojo.connect(this,"updateList",this,function(){
if(this.taglist){
return;
}
var app=this.app;
var _51=app.routes;
var _52=this.userId;
this.taglist=new lconn.files.scenes.TagWidget({app:app,selectedTags:this.params.tag?this.params.tag.join(" "):"",tagStore:app.getTagStore(),tagScope:{userLibrary:_52,type:"personalFiles",queryFilter:this.params.search,tagsFilter:this.params.tag},_addSelectedTag:dojo.hitch(null,lfs.UserChannel.navigateToTag,app,_51,_52,this.params,true),_removeSelectedTag:dojo.hitch(null,lfs.UserChannel.navigateToTag,app,_51,_52,this.params,false)},this.divtags);
});
}
var _53=_42.findFilter(_4b,_45);
var f=dojo.hitch(null,lfs.UserChannel.createPageLink,app,_4c,_49,_4a,"type");
_42.createFilterSection(app,el,app.nls.FILTERS.TYPE,"files.filter.type",_45,f,_53,true);
var _53=_42.findFilter(_4b,_47);
var f=dojo.hitch(null,lfs.UserChannel.createPageLink,app,_4c,_49,_4a,"sharing");
_42.createFilterSection(app,el,app.nls.FILTERS.SHARE,"files.filter.share",_47,f,_53,true);
var _53=_42.findFilter(_4b,_43);
var f=dojo.hitch(null,lfs.UserChannel.createPageLink,app,_4c,_49,_4a,"date");
_42.createFilterSection(app,el,app.nls.FILTERS.DATE,"files.filter.date",_43,f,_53,true);
},showError:function(){
lconn.files.scenehelper.applyApplicationError(this.app);
}});
lconn.files.scenes.UserChannel.createPageLink=function(app,_54,_55,_56,_57,el,_58){
var p=dojo.clone(_56);
if(_58&&typeof _58.getExternalUrl=="function"){
el.href=_58.getExternalUrl(app,_54,_55);
}else{
p[_57]=(_58)?_58.id:null;
var url=_54.getUserChannelUrl(_55,p);
lconn.files.scenehelper.setOnClick(el,app,url);
}
};
lconn.files.scenes.UserChannel.generateTagLink=function(app,_59,_5a,_5b,_5c,tag,a){
var p=dojo.clone(_5b);
p.tag=p.tag||[];
var _5d=dojo.indexOf(p.tag,tag);
if(_5c&&_5d==-1){
p.tag.push(tag);
}else{
if(!_5c&&_5d!=-1){
delete p.tag[_5d];
}
}
lconn.files.scenehelper.setOnClick(a,app,_59.getUserChannelUrl(_5a,p));
};
lconn.files.scenes.UserChannel.generatePagingLink=function(app,_5e,_5f,_60,_61,_62,a){
var p=dojo.clone(_60);
p.page=_62;
var url=_5e.getUserChannelUrl(_5f,p);
lconn.files.scenehelper.setOnClick(a,app,url);
};
lconn.files.scenes.UserChannel.generateSortLink=function(app,_63,_64,_65,_66,_67,_68,a){
var p=dojo.clone(_65);
p.sort=_67.id;
p.sortReversed=!_68;
delete p.page;
var url=_63.getUserChannelUrl(_64,p);
lconn.files.scenehelper.setOnClick(a,app,url);
};
lconn.files.scenes.UserChannel.navigateToTag=function(app,_69,_6a,_6b,_6c,tag){
var _6d=lconn.share.bean.File.splitTags(tag||"");
var p=dojo.clone(_6b);
p.tag=p.tag||[];
dojo.forEach(_6d,function(tag){
var _6e=dojo.indexOf(p.tag,tag);
if(_6c&&_6e==-1){
p.tag.push(tag);
}else{
if(!_6c&&_6e!=-1){
delete p.tag[_6e];
}
}
});
app.navigate(_69.getUserChannelUrl(_6a,p));
};
dojo.declare("lconn.files.scenes.UserChannel.Renderer",[lconn.files.scenes.AbstractFileRenderer],{constructor:function(opt,app,_6f){
this.userId=_6f.userId;
},generateLinkToTag:function(tag,a){
return this.s.generateTagLink(this.app,this.routes,this.userId,this.params,tag,a);
},generatePagingLink:function(_70,_71,a){
return lconn.files.scenes.UserChannel.generatePagingLink(this.app,this.routes,this.userId,this.params,_70,_71,a);
},generateSortLink:function(_72,_73,_74,a){
return lconn.files.scenes.UserChannel.generateSortLink(this.app,this.routes,this.userId,this.params,_72,_73,_74,a);
}});
dojo.declare("lconn.files.scenes.UserChannel.SocialRenderer",[lconn.files.scenes.AbstractSocialRenderer,lconn.files.scenes.UserChannel.Renderer],{});
dojo.declare("lconn.files.scenes.UserChannel.CustomRenderer",[lconn.files.scenes.AbstractCustomRenderer,lconn.files.scenes.UserChannel.Renderer],{});
dojo.declare("lconn.files.scenes.UserChannel.GridRenderer",[lconn.files.scenes.AbstractGridRenderer,lconn.files.scenes.UserChannel.Renderer],{useXslt:false});
}


window['_js_modules']=(window['_js_modules']||[]).concat(["lconn.files.scenes.UserChannel"]);
