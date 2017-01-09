
;if(!dojo._hasResource["lconn.files.widget.CompactPicker"]){
dojo._hasResource["lconn.files.widget.CompactPicker"]=true;
dojo.provide("lconn.files.widget.CompactPicker");












dojo.declare("lconn.files.widget.CompactPicker",[dijit._Widget,lconn.share.widget.Resizable],{multi:true,enableHeader:false,enableCommunityArea:false,enableFooter:false,descriptionAreaClasses:"lotusChunk10",_sourceSwitchStyleRadio:"radio",_sourceSwitchStyleTabbed:"tab",_sourceSwitchContainerClass:"",_sourceSwitchContentClass:"",_sourceSwitchRadioButtonClass:"",_sourceSwitchLabelClass:"",_sourceSwitchLabelSpanClass:"",_sourceSwitchLabelSpanCheckedClass:"",preRenderCallback:function(){
},onCreateHeader:function(_1){
},onCreateCommunityArea:function(_2){
},onCreateFooter:function(_3){
},onSourceChange:function(_4){
},onSourceLoaded:function(_5){
},onResize:function(){
},onSelectionChange:function(){
},onInputChange:function(_6){
},onMenuSelectionChange:function(_7){
},enableInput:function(){
},updateHeaderDescription:function(_8){
},scope:null,constructor:function(_9){
this.useCompact=true;
if(_9.onSourceLoaded){
this.onSourceLoaded=_9.onSourceLoaded;
}
this.hideCheckbox=_9.hideCheckbox;
this.hideBreadcrumbWithRootOnly=_9.hideBreadcrumbWithRootOnly;
this.breadcrumbPrefix=_9.breadcrumbPrefix;
this.setDefaultWidth(540);
this.setDefaultInnerWidth("header",540);
this.setDefaultInnerWidth("global-message",500);
this.setDefaultInnerWidth("global-description",500);
this.setDefaultInnerWidth("switch-pane",540);
this.setDefaultInnerWidth("sources",500);
this.setDefaultInnerWidth("footer",500);
var _a=0;
if(dojo.exists("app.scene.app.communityId",_9)){
_a=2;
}
this.adjustWidths((_9.width?_9.width:this.getDefaultWidth())-_a);
var _b=this.isLTR=dojo._isBodyLtr();
this.ltr={left:_b?"left":"right",right:_b?"right":"left",paddingLeft:_b?"paddingLeft":"paddingRight",paddingRight:_b?"paddingRight":"paddingLeft"};
},getSourceSwitchStyle:function(){
if(this.isTabbedSourceSwitchStyle()){
return this.sourceSwitchStyle;
}else{
return this._sourceSwitchStyleRadio;
}
},getSourceSwitchStyleClass:function(){
if(this.isTabbedSourceSwitchStyle()){
return "tabbedSwitch";
}else{
return "radioSwitch";
}
},isTabbedSourceSwitchStyle:function(){
return this.sourceSwitchStyle==this._sourceSwitchStyleTabbed;
},isSubCollectionEnabled:function(){
return this.user?this.user.policy.subCollection:lconn.share.util.configUtil.isNestedFolderEnabled(this.user);
},isSubmitButtonEnabled:function(){
if(this.activeSource&&this.activeSource.widget){
if(dojo.isFunction(this.activeSource.widget.isSubmitButtonEnabled)){
return this.activeSource.widget.isSubmitButtonEnabled();
}
}
return true;
},postMixInProperties:function(){
if(!this.sourceSwitchStyle){
this.sourceSwitchStyle=this.isSubCollectionEnabled()?this._sourceSwitchStyleTabbed:this._sourceSwitchStyleRadio;
}
},buildRendering:function(){
this.inherited(arguments);
var d=document;
if(dojo.isFunction(this.preRenderCallback)){
this.preRenderCallback.apply(this.scope||dojo.global,[this]);
}
this._initSourceSwitchingAreaStyling();
var _c=this.domNode;
var _d=_c.style;
_d.overflow="hidden";
_d.position="relative";
_d.top="0px";
_d.margin="0px";
_d.width=this.getWidthInPx();
_d[this.ltr.right]="0px";
if(typeof (this.containerStyle)=="object"){
for(var _e in this.containerStyle){
_d[_e]=this.containerStyle[_e];
}
}
dojo.addClass(_c,"lconnRightSide lotusDialog lotusForm");
dojo.addClass(_c,this.getSourceSwitchStyleClass());
if(this.sourceOptions){
for(var _e in this.sourceOptions){
var sp=this.getProviderById(_e);
if(sp){
sp.initParams(this.sourceOptions[_e]);
}
}
}
if(this.enableHeader){
var _f=d.createElement("div");
_f.style.margin="0px 20px";
_f.style.width=this.getInnerWidthInPx("header");
if(this.onCreateHeader){
this.onCreateHeader.apply(this.scope||dojo.global,[_f]);
}
_c.appendChild(_f);
}
var _10=d.createElement("div");
dojo.addClass(_10,"switchPane");
_10.style.width=this.getInnerWidthInPx("switch-pane");
var div=this._createSourceSwitcher(d,this.sources);
div.style.margin="0px 20px";
div.style.width=this.getInnerWidthInPx("sources");
_10.appendChild(div);
_c.appendChild(_10);
var _11=d.createElement("div");
_11.className="lconnCompactMessage";
_11.style.margin="0px 20px";
_11.style.width=this.getInnerWidthInPx("global-message");
this.mc=new lconn.share.widget.MessageContainer({nls:this.app.nls},_c.appendChild(_11));
var _12=this._createDesArea(d);
_12.style.width=this.getInnerWidthInPx("global-description");
_12.style.margin="0px 20px";
_c.appendChild(_12);
this.connect(this,"onSourceChange",dojo.hitch(this,"updateHeaderDescription",_12));
var _13=this.getInnerWidthInPx("sources");
var _14=this.isTabbedSourceSwitchStyle()&&this.sources.length>1;
var _15=this.id;
dojo.forEach(this.sources,function(_16,idx){
var div=_16.domNode=d.createElement("div");
var _17=div.style;
_17.margin="0px 20px";
_17.minHeight="180px";
_17.display="none";
_17.width=_13;
dojo.addClass(div,"lconnPickerSourceArea");
if(_14){
dojo.attr(div,"role","tabpanel");
dojo.attr(div,"id",_15+"_sourcetabpanel_"+idx);
dojo.attr(div,"aria-labelledby",_15+"_sourcetab_"+idx);
}
_c.appendChild(div);
});
if(this.enableCommunityArea){
var tr=d.createElement("tr");
var td=tr.appendChild(d.createElement("td"));
var _18=d.createElement("div");
_18.style.margin="0px 20px";
if(dojo.isFunction(this.onCreateCommunityArea)){
this.onCreateCommunityArea(_18);
}
_c.appendChild(_18);
}
if(this.enableFooter){
var _19=d.createElement("div");
_19.style.margin="0px 20px";
_19.style.width=this.getInnerWidthInPx("footer");
if(this.onCreateFooter){
this.onCreateFooter.apply(this.scope||dojo.global,[_19]);
}
_c.appendChild(_19);
}
var _1a=this.defaultSourceId;
var _1b=this.sources;
var _1c=dojo.filter(_1b,function(_1d){
return _1d.id==_1a;
})[0]||_1b[0];
if(_1c&&_1c.option){
_1c.option.checked=true;
}
this.switchHandler(_1c,true);
},postCreate:function(){
this.inherited(arguments);
dojo.removeAttr(this.domNode,"role");
},_initSourceSwitchingAreaStyling:function(){
this._sourceSwitchContainerClass="switchContainer";
this._sourceSwitchContentClass="lconnPickerSourceSwitchingContentArea";
this._sourceSwitchRadioButtonClass="lotusCheckbox IECheckbox lconnPickerSourceRadioButtonHiddenInTabbedSwitch";
this._sourceSwitchLabelClass=this.isTabbedSourceSwitchStyle()?"lconnPickerSourceLabel":"lotusCheckbox";
this._sourceSwitchLabelSpanClass="lconnPickerSourceLabelSpan";
this._sourceSwitchLabelSpanCheckedClass="lconnPickerSourceLabelSpanChecked";
},_createDesArea:function(d){
var _1e=d.createElement("div");
_1e.id=this.id+"_desp";
dojo.addClass(_1e,this.descriptionAreaClasses);
_1e.style.paddingTop="4px";
_1e.style.display="none";
return _1e;
},_createSourceSwitcher:function(d,_1f){
var _20=d.createElement("div");
if(_1f.length>1){
dojo.addClass(_20,this._sourceSwitchContainerClass);
var _21=d.createElement("div");
dijit.setWaiRole(_21,"group");
dojo.addClass(_21,this._sourceSwitchContentClass);
var _22=_21.appendChild(d.createElement("fieldset"));
var _23=_22.appendChild(d.createElement("legend"));
_23.appendChild(d.createTextNode(this.multi?this.nls.COMPACT.RADIO_LABEL_X:this.nls.COMPACT.RADIO_LABEL_1));
_23.className="lotusAccess";
switch(this.sourceSwitchStyle){
case this._sourceSwitchStyleRadio:
this._createSourceSwitcherRadio(_22,_1f);
break;
case this._sourceSwitchStyleTabbed:
this._createSourceSwitcherTabbed(_22,_1f);
break;
}
_20.appendChild(_21);
}
return _20;
},_createSourceSwitcherRadio:function(_24,_25){
var d=document;
for(var i=0;i<_25.length;i++){
var _26=_25[i];
var div=d.createElement("div");
_26.baseNode=div;
var _27=_26.option=d.createElement("input");
_27.type="radio";
_27.id=this.id+"_option_"+_26.id;
_27.name=this.id+"_sources";
dojo.addClass(_27,this._sourceSwitchRadioButtonClass);
div.appendChild(_27);
var _28=d.createElement("label");
dojo.attr(_28,"for",_27.id);
dojo.addClass(_28,this._sourceSwitchLabelClass);
var _29=d.createElement("span");
dojo.addClass(_29,this._sourceSwitchLabelSpanClass);
_29.appendChild(d.createTextNode(lconn.core.HTMLUtil.escapeText(_26.provider.getName())));
_28.appendChild(_29);
div.appendChild(_28);
_24.appendChild(div);
div.style.display="inline";
dojo.addClass(div,"lconnPickerSourceToCheck");
dojo.connect(_27,"onclick",dojo.hitch(this,"switchHandler",_26));
}
},_createSourceSwitcherTabbed:function(_2a,_2b){
var d=document;
var _2c=d.createElement("div");
dojo.attr(_2c,"role","tablist");
_2a.appendChild(_2c);
for(var i=0;i<_2b.length;i++){
var _2d=_2b[i];
var _2e=lconn.core.HTMLUtil.escapeText(_2d.provider.getName());
var div=d.createElement("div");
_2d.baseNode=div;
dojo.style(div,"display","inline");
dojo.addClass(div,"lconnPickerSourceToCheck");
var tab=d.createElement("div");
_2d.tabNode=tab;
dojo.style(tab,"display","inline");
dojo.attr(tab,"id",this.id+"_sourcetab_"+i);
dojo.attr(tab,"role","tab");
dojo.attr(tab,"aria-selected","false");
dojo.attr(tab,"aria-controls",this.id+"_sourcetabpanel_"+i);
dojo.attr(tab,"tabindex","-1");
dojo.addClass(tab,this._sourceSwitchLabelClass);
var img=d.createElement("img");
dojo.attr(img,"src",dojo.config.blankGif);
dojo.addClass(img,_2d.provider.getSwitcherIconCss("unchecked"));
tab.appendChild(img);
var _2f=d.createElement("span");
dojo.addClass(_2f,this._sourceSwitchLabelSpanClass);
_2f.appendChild(d.createTextNode(_2e));
tab.appendChild(_2f);
div.appendChild(tab);
_2c.appendChild(div);
dojo.connect(tab,"onclick",dojo.hitch(this,this._onClickSourceTab,_2d));
dojo.connect(tab,"onfocus",dojo.hitch(this,this._onFocusSourceTab,_2d));
dojo.connect(tab,"onkeypress",dojo.hitch(this,this._onKeypressSourceTab,_2d,i));
}
},_onClickSourceTab:function(_30,evt){
dojo.stopEvent(evt);
this.switchHandler(_30);
},_onFocusSourceTab:function(_31,evt){
dojo.stopEvent(evt);
this.switchHandler(_31);
},_onKeypressSourceTab:function(_32,_33,_34){
var _35=_33;
var _36=_34&&_34.charOrCode;
switch(_36){
case dojo.keys.RIGHT_ARROW:
case dojo.keys.DOWN_ARROW:
_35++;
if(_35==this.sources.length){
_35=0;
}
break;
case dojo.keys.LEFT_ARROW:
case dojo.keys.UP_ARROW:
_35--;
if(_35<0){
_35=this.sources.length-1;
}
break;
default:
return;
break;
}
dojo.stopEvent(_34);
if(_32.tabNode){
dojo.attr(_32.tabNode,"tabindex","-1");
dojo.attr(_32.tabNode,"aria-selected","false");
}
var _37=this.sources[_35];
if(_37.tabNode){
dojo.attr(_37.tabNode,"tabindex","0");
dojo.attr(_37.tabNode,"aria-selected","true");
dijit.focus(_37.tabNode);
}else{
this.switchHandler(_37);
}
},showMessage:function(_38,msg){
if(!this.activeSource){
console.warn("no active source");
}
this.activeSource.provider.showMessage(_38,msg);
},hideMessage:function(_39){
if(!this.activeSource){
console.warn("no active source");
}
this.activeSource.provider.hideMessage(_39);
},_updateUIOnSourceSelection:function(_3a){
if(!_3a){
return;
}
var _3b=this.preActiveSource;
if(_3b){
if(_3b.baseNode){
dojo.removeClass(_3b.baseNode,"pickerSourceChecked");
}
if(_3b.tabNode){
dojo.attr(_3b.tabNode,"tabindex","-1");
dojo.attr(_3b.tabNode,"aria-selected","false");
}
}
if(_3a.baseNode){
dojo.addClass(_3a.baseNode,"pickerSourceChecked");
}
if(_3a.tabNode){
dojo.attr(_3a.tabNode,"tabindex","0");
dojo.attr(_3a.tabNode,"aria-selected","true");
}
},_contains:function(a,obj){
var i=a.length;
while(i--){
if(a[i]===obj){
return true;
}
}
return false;
},switchHandler:function(_3c,_3d){
if(!_3c){
return;
}
if(this.activeSource&&this.activeSource.id==_3c.id){
return;
}
this._updateUIOnSourceSelection(_3c);
this.getMsgContainer().removeAll();
if(!_3c.widget||_3c.alwaysRecreate){
var div=_3c.domNode;
div.innerHTML="";
div.appendChild(document.createTextNode(this.app.nls.LOADING));
this._sourceChange(_3c);
var _3e=window["_js_modules"]||[];
if(this._contains(_3e,"lconn.files.picker.amd.bootstrap")){
if(!this._contains(_3e,"lconn.files.picker.impl.excludes")){
_3e.push("lconn.files.picker.impl.excludes");
}
}
net.jazz.ajax.xdloader.batch_load_async(_3c.dependences,dojo.hitch(this,function(){
this.createSourceWidget(_3c);
if(_3c.widget&&typeof _3d!="undefined"&&_3d&&_3c.widget.initialFocusNode){
dijit.focus(_3c.widget.initialFocusNode);
}
this._sourceLoad(_3c);
}));
}else{
this._sourceChange(_3c);
this.createSourceWidget(_3c);
}
this.onSelectionChange();
this.preActiveSource=this.activeSource;
this.activeSource=_3c;
},_sourceChange:function(_3f){
var _40=this.activeSource;
if(_40&&(_40.id!=_3f.id)){
_40.active=false;
_40.domNode.style.display="none";
}
_3f.active=true;
_3f.domNode.style.display="";
this.activeSource=_3f;
if(this.onSourceChange){
this.onSourceChange(_3f,this);
}
},createSourceWidget:function(_41){
if(_41.widget){
_41.widget.destroy();
}
var div=_41.domNode;
div.innerHTML="";
if(typeof (_41.provider)==="object"){
var _42=_41.widget=_41.provider.render(this,div.appendChild(dojo.doc.createElement("div")),this.app.files);
this.connect(_42,"onSelectionChange",dojo.hitch(this,"onSelectionChange"));
this.connect(_42,"onInputChange",dojo.hitch(this,"onInputChange"));
this.connect(_42,"resize",dojo.hitch(this,"onResize"));
this.connect(_42,"_changeSource",dojo.hitch(this,"onMenuSelectionChange"));
this.connect(_42,"enableInput",dojo.hitch(this,"enableInput"));
_41.provider.onWidgetCreate();
}
},_sourceLoad:function(_43){
if(this.onSourceLoaded){
this.onSourceLoaded.apply(this.scope||dojo.global,[_43]);
}
},getSelectedItems:function(){
if(this.activeSource&&this.activeSource.widget){
var _44=this.activeSource.widget;
if(_44.getSelectedItems){
return _44.getSelectedItems.apply(_44,arguments);
}
}
return [];
},getInitialFocusNode:function(){
if(this.activeSource&&this.activeSource.widget){
var _45=this.activeSource.widget;
if(_45.initialFocusNode){
return _45.initialFocusNode;
}
}
return null;
},getMsgContainer:function(){
return this.mc;
},getProviderById:function(id){
var _46=null;
var _47=this.sources;
for(var i=0;i<_47.length;i++){
if(_47[i].id==id){
_46=_47[i].provider;
break;
}
}
return _46;
},submit:function(_48){
var _49=false;
if(_48&&_48.provider&&dojo.isFunction(_48.provider.save)){
_49=_48.provider.save();
}
return _49;
}});
}


;if(!dojo._hasResource["lconn.files.picker.sp.Base"]){
dojo._hasResource["lconn.files.picker.sp.Base"]=true;
dojo.provide("lconn.files.picker.sp.Base");


dojo.declare("lconn.files.picker.sp.Base",[lconn.share.widget.Resizable],{nls:null,_innerWidget:null,_passedInParams:{},_switcherIconCSS:{"checked":"","unchecked":""},_sourceSwitchStyleRadio:"radio",_sourceSwitchStyleTabbed:"tab",constructor:function(_1){
this.nls=_1.nls;
if(_1.innerRenderer){
this.innerRenderer=_1.innerRenderer;
}
this.updateMessage=_1.updateMessage;
this._configLayout(_1);
this.adjustWidths(_1.width?_1.width:this.getDefaultWidth());
},getSwitcherIconCss:function(_2){
return this._switcherIconCSS[_2];
},_configLayout:function(_3){
},initParams:function(_4){
this._passedInParams=_4;
},getName:function(){
return this._passedInParams.name||(this.nls?this.nls.NAME:"");
},getDesp:function(){
if(this._passedInParams.desp!=null&&typeof (this._passedInParams.desp)!="undefined"){
return this._passedInParams.desp;
}else{
return (this.nls?this.nls.DESCRIPTION:"");
}
},render:function(_5,el){
return null;
},showMessage:function(_6,_7){
if(this._innerWidget&&dojo.isFunction(this._innerWidget.showMessage)){
this._innerWidget.showMessage(_6,_7);
}
},hideMessage:function(_8){
if(this._innerWidget&&dojo.isFunction(this._innerWidget.hideMessage)){
this._innerWidget.hideMessage(_8);
}
},onWidgetCreate:function(){
},destroy:function(){
if(this._innerWidget){
this._innerWidget.destroy();
}
}});
}


;if(!dojo._hasResource["lconn.files.picker.sp.PersonalCollections"]){
dojo._hasResource["lconn.files.picker.sp.PersonalCollections"]=true;
dojo.provide("lconn.files.picker.sp.PersonalCollections");


dojo.declare("lconn.files.picker.sp.PersonalCollections",[lconn.files.picker.sp.Base],{_configLayout:function(_1){
this.setDefaultWidth(620);
this.setDefaultInnerWidth("personal-collections-widget",620);
if(_1.sourceSwitchStyle==this._sourceSwitchStyleTabbed){
this._switcherIconCSS={"checked":"lconnPickerSourceLabelIconCloudChecked","unchecked":"lconnPickerSourceLabelIconCloud"};
}
},render:function(_2,el){
var _3=_2.app;
var _4=new lconn.files.picker.adapter.qcs.PersonalCollections({app:_3,user:_2.user,visibility:_2.visibility,externalOnly:_2.externalOnly,internalOnly:_2.internalOnly,role:_2.role,topLevelCollectionOnly:dojo.exists("_passedInParams.topLevelCollectionOnly",this)?this._passedInParams.topLevelCollectionOnly:false,nls:_3.nls.COLLECTION_PICKER,useCompact:_2.useCompact,hideBreadcrumbWithRootOnly:_2.hideBreadcrumbWithRootOnly,hideCheckbox:_2.hideCheckbox,menuOptions:this._passedInParams?{"favoriteCollections":this._passedInParams.favoriteCollections,"recentFolders":this._passedInParams.recentFolders}:{},addAction:_2.addAction});
var _5={app:_3,adapter:_4,userSearchAdapter:_2.userSearchAdapter,communitySearchAdapter:_2.communitySearchAdapter,apiType:_2.apiType,user:_2.user,nls:_2.nls,net:_2.net,showMenu:false,showImage:_2.showImage,showVisibility:_2.showVisibility,oneuiVersion:_2.oneuiVersion,visibilityStrings:_3.nls.CONTENT,width:this.getInnerWidth("personal-collections-widget"),hideBreadcrumbWithRootOnly:_2.hideBreadcrumbWithRootOnly,hideCheckbox:_2.hideCheckbox,breadcrumbPrefix:_2.breadcrumbPrefix,publicOnly:_2.publicOnly,shareableOnly:_2.shareableOnly,externalOnly:_2.externalOnly};
if(_2.login){
_5.login=_2.login;
}
if(typeof _2.multi!="undefined"){
_5.multi=_2.multi;
}
if(_2.excludeMenu){
_5.excludeMenu=_2.excludeMenu;
}
if(dojo.exists("treeRendererCallbacks",_2)){
_5.treeRendererCallbacks=_2.treeRendererCallbacks;
}
if(this._passedInParams){
dojo.mixin(_5,this._passedInParams);
}
this._innerWidget=new lconn.files.widget.PersonalFolderPicker(_5,el);
return this._innerWidget;
}});
}


;if(!dojo._hasResource["lconn.files.picker.sp.CreateCollection"]){
dojo._hasResource["lconn.files.picker.sp.CreateCollection"]=true;
dojo.provide("lconn.files.picker.sp.CreateCollection");


dojo.declare("lconn.files.picker.sp.CreateCollection",[lconn.files.picker.sp.Base],{_configLayout:function(_1){
this.setDefaultWidth(620);
this.setDefaultInnerWidth("create-collection-widget",620);
if(_1.sourceSwitchStyle==this._sourceSwitchStyleTabbed){
this._switcherIconCSS={"checked":"lconnPickerSourceLabelCreateFolderChecked","unchecked":"lconnPickerSourceLabelCreateFolder"};
}
},getFolderName:function(){
return lconn.share.util.text.trim(this._innerWidget.nameNode.value);
},getFolderDesp:function(){
return lconn.share.util.text.trim(this._innerWidget.descriptionNode.value);
},render:function(_2,el){
var _3=_2.app;
var _4={app:_3,nls:_2.nls};
var _5=lconn.core.config.services.files;
var _3=new lconn.files.collection.CollectionApp({service:_5,osConfig:_2.osConfig,authenticatedUser:this.authenticatedUser});
_3.start();
var _4={app:_3,visibility:_2.visibility,externalOnly:_2.externalOnly,role:_2.role,isCommOwned:_2.isCommOwned,commId:_2.commId,width:this.getInnerWidth("create-collection-widget")};
if(this._passedInParams){
dojo.mixin(_4,this._passedInParams);
}
this._innerWidget=new lconn.files.widget.CreateCollection(_4,el);
return this._innerWidget;
},validate:function(){
return this._innerWidget.validate();
},save:function(){
return this._innerWidget.save();
}});
}


;if(!dojo._hasResource["lconn.files.picker.sp.CommCollections"]){
dojo._hasResource["lconn.files.picker.sp.CommCollections"]=true;
dojo.provide("lconn.files.picker.sp.CommCollections");


dojo.declare("lconn.files.picker.sp.CommCollections",[lconn.files.picker.sp.Base],{_configLayout:function(_1){
this.setDefaultWidth(620);
this.setDefaultInnerWidth("community-collection-widget",620);
if(_1.sourceSwitchStyle==this._sourceSwitchStyleTabbed){
this._switcherIconCSS={"checked":"lconnPickerSourceLabelIconCommunityChecked","unchecked":"lconnPickerSourceLabelIconCommunity"};
}
},render:function(_2,el){
var _3=_2.app;
this.collectionsNls=_2.nls;
var _4=new lconn.files.picker.adapter.qcs.CommCollections({app:_3,user:_2.user,visibility:_2.visibility,internalOnly:_2.internalOnly,role:_2.role,nls:_3.nls.COLLECTION_PICKER,community:_2.community,type:_2.type,includeLinkedLibrary:_2.includeLinkedLibrary,onlyIncludeFilesIfAdded:_2.onlyIncludeFilesIfAdded,canSearchLibraries:_2.canSearchLibraries,useCompact:_2.useCompact,hideBreadcrumbWithRootOnly:_2.hideBreadcrumbWithRootOnly,hideCheckbox:_2.hideCheckbox});
if(typeof (_2.includeLinkedLibrary)=="undefined"){
_2.includeLinkedLibrary=_3.communityId&&_3.file&&_3.file.getLibraryType()=="communityFiles"?false:true;
}
var _5={app:_3,adapter:_4,userSearchAdapter:_2.userSearchAdapter,apiType:_2.apiType,user:_2.user,nls:_2.nls,net:_2.net,multi:_2.multi,keepSelected:_2.keepSelected,showMenu:false,showImage:_2.showImage,showVisibility:_2.showVisibility,oneuiVersion:_2.oneuiVersion,visibilityStrings:_3.nls.CONTENT,includeLinkedLibrary:_2.includeLinkedLibrary,width:this.getInnerWidth("community-collection-widget"),hideBreadcrumbWithRootOnly:_2.hideBreadcrumbWithRootOnly,hideCheckbox:_2.hideCheckbox,breadcrumbPrefix:_2.breadcrumbPrefix};
if(_2.selectedItems){
_5.selectedItems=_2.selectedItems;
}
if(_2.login){
_5.login=_2.login;
}
if(_2.showRoot){
_5.showRoot=_2.showRoot;
_5.rootName=_2.rootName;
_5.showRootInBreadcrumb=_2.showRootInBreadcrumb;
}
if(this.innerRenderer){
_5._renderer=this.innerRenderer;
}
_5.canSearchAll=_2.canSearchAll;
if(dojo.exists("treeRendererCallbacks",_2)){
_5.treeRendererCallbacks=_2.treeRendererCallbacks;
}
if(this._passedInParams){
dojo.mixin(_5,this._passedInParams);
}
if(_2.onMenuSelectionChange){
_5.onMenuSelectionChangeInit=_2.onMenuSelectionChange;
}
this._innerWidget=new lconn.files.widget.PersonalFolderPicker(_5,el);
return this._innerWidget;
}});
}


;if(!dojo._hasResource["lconn.files.picker.sp.CommCollectionsFiles"]){
dojo._hasResource["lconn.files.picker.sp.CommCollectionsFiles"]=true;
dojo.provide("lconn.files.picker.sp.CommCollectionsFiles");


dojo.declare("lconn.files.picker.sp.CommCollectionsFiles",[lconn.files.picker.sp.Base],{_configLayout:function(_1){
this.setDefaultWidth(620);
this.setDefaultInnerWidth("community-collections-file-widget",620);
if(_1.sourceSwitchStyle==this._sourceSwitchStyleTabbed){
this._switcherIconCSS={"checked":"lconnPickerSourceLabelIconCommunityChecked","unchecked":"lconnPickerSourceLabelIconCommunity"};
}
},render:function(_2,el){
var _3=_2.app;
this.collectionsNls=_2.nls;
var _4=new lconn.files.picker.adapter.qcs.CommCollectionsFiles({app:_3,user:_2.user,visibility:_2.visibility,internalOnly:_2.internalOnly,role:_2.role,nls:_3.nls.COLLECTION_PICKER,community:_2.community,type:_2.type,hideBreadcrumbWithRootOnly:_2.hideBreadcrumbWithRootOnly,hideCheckbox:_2.hideCheckbox});
var _5={app:_3,adapter:_4,userSearchAdapter:_2.userSearchAdapter,apiType:_2.apiType,user:_2.user,nls:_2.nls,net:_2.net,multi:_2.multi,keepSelected:_2.keepSelected,showMenu:false,showImage:_2.showImage,showVisibility:_2.showVisibility,oneuiVersion:_2.oneuiVersion,visibilityStrings:_3.nls.CONTENT,width:this.getInnerWidth("community-collections-file-widget"),hideBreadcrumbWithRootOnly:_2.hideBreadcrumbWithRootOnly,hideCheckbox:_2.hideCheckbox,breadcrumbPrefix:_2.breadcrumbPrefix};
if(_2.selectedItems){
_5.selectedItems=_2.selectedItems;
}
if(_2.login){
_5.login=_2.login;
}
if(_2.showRoot){
_5.showRoot=_2.showRoot;
}
if(this.innerRenderer){
_5._renderer=this.innerRenderer;
}
_5.canSearchAll=_2.canSearchAll;
if(this._passedInParams){
dojo.mixin(_5,this._passedInParams);
}
this._innerWidget=new lconn.files.widget.PersonalFolderPicker(_5,el);
return this._innerWidget;
}});
}


;if(!dojo._hasResource["lconn.files.picker.sp.ExistingCollections"]){
dojo._hasResource["lconn.files.picker.sp.ExistingCollections"]=true;
dojo.provide("lconn.files.picker.sp.ExistingCollections");


dojo.declare("lconn.files.picker.sp.ExistingCollections",[lconn.files.picker.sp.Base],{_configLayout:function(_1){
this.setDefaultWidth(620);
this.setDefaultInnerWidth("existing-collections-widget",620);
if(_1.sourceSwitchStyle==this._sourceSwitchStyleTabbed){
this._switcherIconCSS={"checked":"lconnPickerSourceLabelIconCloudChecked","unchecked":"lconnPickerSourceLabelIconCloud"};
}
},render:function(_2,el){
var _3=_2.app;
var _4=null;
var _4=new lconn.files.picker.adapter.qcs.ExistingCollections({app:_3,user:_2.user,visibility:_2.visibility,externalOnly:_2.externalOnly,internalOnly:_2.internalOnly,role:_2.role,nls:_3.nls.COLLECTION_PICKER,hideBreadcrumbWithRootOnly:_2.hideBreadcrumbWithRootOnly,hideCheckbox:_2.hideCheckbox});
var _5={app:_3,adapter:_4,userSearchAdapter:_2.userSearchAdapter,communitySearchAdapter:_2.communitySearchAdapter,apiType:_2.apiType,user:_2.user,nls:_2.nls,net:_2.net,showMenu:false,showImage:_2.showImage,showVisibility:_2.showVisibility,oneuiVersion:_2.oneuiVersion,visibilityStrings:_3.nls.CONTENT,width:this.getInnerWidth("existing-collection-widget"),hideBreadcrumbWithRootOnly:_2.hideBreadcrumbWithRootOnly,hideCheckbox:_2.hideCheckbox,breadcrumbPrefix:_2.breadcrumbPrefix};
if(_2.login){
_5.login=_2.login;
}
if(typeof _2.multi!="undefined"){
_5.multi=_2.multi;
}
if(this._passedInParams){
dojo.mixin(_5,this._passedInParams);
}
this._innerWidget=new lconn.files.widget.PersonalFolderPicker(_5,el);
return this._innerWidget;
}});
}


;if(!dojo._hasResource["lconn.files.widget.CompactFolderPicker"]){
dojo._hasResource["lconn.files.widget.CompactFolderPicker"]=true;
dojo.provide("lconn.files.widget.CompactFolderPicker");












dojo.declare("lconn.files.widget.CompactFolderPicker",[lconn.files.widget.CompactPicker],{sourceSet:["personalFolders"],postMixInProperties:function(){
this.inherited(arguments);
var _1=this.sources=[];
var _2=this.sourceSet;
var _3=this.app.communityFolderEnabled;
for(var i=0;i<_2.length;i++){
if(_2[i]=="createFolder"&&_3){
_1.push({id:"createFolder",dependences:["lconn.files.widget.CreateCollection","lconn.share.util.text","lconn.core.config.services.files","lconn.files.collection.CollectionApp"],provider:new lconn.files.picker.sp.CreateCollection({width:this.getInnerWidth("sources"),nls:this.nls.COMPACT.CREATE_FOLDER,sourceSwitchStyle:this.sourceSwitchStyle})});
this.nls.COMPACT.RADIO_LABEL_1=this.nls.COMPACT.RADIO_LABEL_WITH_CREATE_FOLDER_1;
this.nls.COMPACT.RADIO_LABEL_X=this.nls.COMPACT.RADIO_LABEL_WITH_CREATE_FOLDER_X;
}else{
if(_2[i]=="personalFolders"){
_1.push({id:"personalFolders",alwaysRecreate:true,dependences:["lconn.files.widget.PersonalFolderPicker","lconn.files.picker.adapter.qcs.PersonalCollections"],provider:new lconn.files.picker.sp.PersonalCollections({width:this.getInnerWidth("sources"),nls:this.nls.COMPACT.MY_FOLDERS,innerRenderer:this.renderer?this.renderer["personalFolders"]:null,sourceSwitchStyle:this.sourceSwitchStyle,useCompact:true,hideCheckbox:this.hideCheckbox,hideBreadcrumbWithRootOnly:this.hideBreadcrumbWithRootOnly,breadcrumbPrefix:this.breadcrumbPrefix})});
}else{
if(_2[i]=="thisCommunity"&&_3){
_1.push({id:"thisCommunity",alwaysRecreate:true,dependences:["lconn.files.widget.PersonalFolderPicker","lconn.files.picker.adapter.qcs.CommCollections"],provider:new lconn.files.picker.sp.CommCollections({width:this.getInnerWidth("sources"),nls:this.nls.COMPACT.COMMUNITY_FOLDER,innerRenderer:this.renderer?this.renderer["thisCommunity"]:null,sourceSwitchStyle:this.sourceSwitchStyle,useCompact:true,hideCheckbox:this.hideCheckbox,hideBreadcrumbWithRootOnly:this.hideBreadcrumbWithRootOnly,breadcrumbPrefix:this.breadcrumbPrefix})});
}else{
if(_2[i]=="thisCommunityFiles"&&_3){
_1.push({id:"thisCommunityFiles",alwaysRecreate:true,dependences:["lconn.files.widget.PersonalFolderPicker","lconn.files.picker.adapter.qcs.CommCollectionsFiles"],provider:new lconn.files.picker.sp.CommCollectionsFiles({width:this.getInnerWidth("sources"),nls:this.nls.COMPACT.COMMUNITY_FOLDER,innerRenderer:this.renderer?this.renderer["thisCommunityFiles"]:null,sourceSwitchStyle:this.sourceSwitchStyle,useCompact:true,hideCheckbox:this.hideCheckbox,hideBreadcrumbWithRootOnly:this.hideBreadcrumbWithRootOnly,breadcrumbPrefix:this.breadcrumbPrefix})});
}else{
if(_2[i]=="existingFolders"){
_1.push({id:"existingFolders",alwaysRecreate:true,dependences:["lconn.files.widget.PersonalFolderPicker","lconn.files.picker.adapter.qcs.ExistingCollections"],provider:new lconn.files.picker.sp.ExistingCollections({width:this.getInnerWidth("sources"),nls:this.nls.COMPACT.MY_FOLDERS,innerRenderer:this.renderer?this.renderer["existingFolders"]:null,sourceSwitchStyle:this.sourceSwitchStyle,useCompact:true,hideCheckbox:this.hideCheckbox,hideBreadcrumbWithRootOnly:this.hideBreadcrumbWithRootOnly,breadcrumbPrefix:this.breadcrumbPrefix})});
}
}
}
}
}
}
},updateHeaderDescription:function(_4){
var _5=this.activeSource;
dojo.empty(_4);
_4.style.display="none";
if(dojo.isFunction(_5.provider.getDesp)){
var _6=_5.provider.getDesp();
if(_5&&_6&&_4){
lconn.share.util.html.append(_4,_6);
if(_5.id&&_5.option){
_4.id=_5.id+"_description";
dijit.setWaiState(_5.option,"describedby",_4.id);
}
_4.style.display="";
}
}
}});
}


;if(!dojo._hasResource["lconn.files.action.impl.AddToCollection"]){
dojo._hasResource["lconn.files.action.impl.AddToCollection"]=true;
dojo.provide("lconn.files.action.impl.AddToCollection");




















dojo.requireLocalization("lconn.files","action");
dojo.declare("lconn.files.action.impl.AbstractAddToCollection",null,{isGlobal:false,isHeadless:false,getSaveOpts:function(_1,_2,_3){
_3=_3||{};
if(!dojo.isArray(_1)){
_1=[_1];
}
var _4=dojo.some(_1,function(_5){
return _5.isShared();
});
var _6=dojo.some(_1,function(_7){
return _7.isPublic();
});
var _8=_6?"public":_2.getVisibility();
var _9=this.app.getAuthenticatedUserId();
var _a=(_2.getLibraryType()=="communityFiles");
var _b=_2.getPermissions().GrantAccess;
_b=_b||(_2.getAuthor().id==_9);
_b=_b||(_2.getLibraryAuthor()&&_2.getLibraryAuthor().id==_9);
_b=_b&&!_a;
var _c=_2.isPrivate()&&_4&&!_a;
var _d=!_2.isPublic()&&_6&&_b&&!_a;
var _e=_3.shareEditor;
var _f=lconn.share.util.dom.newXMLDocument("feed",lconn.share.util.dom.ATOM_NAMESPACE,[lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE,lconn.share.util.dom.SNX_NAMESPACE]);
for(var i=0;i<_1.length;i++){
var _10=lconn.share.util.dom.createElementNS(_f,"entry",lconn.share.util.dom.ATOM_NAMESPACE);
var _11=lconn.share.util.dom.createElementNS(_f,"category",lconn.share.util.dom.ATOM_NAMESPACE);
_11.setAttribute("term","collection");
_11.setAttribute("label","collection");
_11.setAttribute("scheme","tag:ibm.com,2006:td/type");
_10.appendChild(_11);
if(_e){
var _12=lconn.share.util.dom.createElementNS(_f,"sharePermission",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
_12.appendChild(_f.createTextNode("Edit"));
_10.appendChild(_12);
}
var _13=lconn.share.util.dom.createElementNS(_f,"itemId",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
_13.appendChild(_f.createTextNode(_1[i].getId()));
_10.appendChild(_13);
_f.documentElement.appendChild(_10);
}
var _14=lconn.share.util.dom.serializeXMLDocument(_f,true);
var _15=(_a&&this.community)?this.app.routes.getFileCommColServiceUrl(this.community.id,_2.getId()):this.app.routes.getFileBulkShareListServiceUrl(_2.getAuthor().id,_2.getId());
if(_d){
_15=lconn.share.util.uri.rewriteUri(_15,{visibility:_8});
}
return {url:_15,postData:_14,madeShared:_c,madePublic:_d,headers:{"Content-Type":"application/atom+xml;charset=\"UTF-8\""},auth:{preventReload:true},handle:dojo.hitch(this,this.complete,_1,_2,_c,_d)};
},complete:function(_16,_17,_18,_19,_1a){
var _1b=_16.length>1;
var _1c=_1b?null:_16[0];
var _1d=false;
if(_1a instanceof Error){
if(_1a.code!="ItemExists"){
var _1e=dojo.some(_16,function(c){
return c.isPublic();
});
if(_1a.code=="ConstraintViolation"){
if(_1e&&!_17.isPublic()){
_1a.code="PublicCollection";
}else{
if(!_17.isViralShareAllowed()){
_1a.code="UnshareableFile";
}
}
}
this.onError(_16,_17,_18,_19,_1a);
return false;
}
_1d=true;
}
var _1f={success:true,count:dojo.number.format(_16.length),file:_17,collection:_1c,collectionlink:lconn.files.util.HtmlMessage.prototype.COLLECTION_LINK,filelink:lconn.files.util.HtmlMessage.prototype.FILE_LINK,undolink:dojo.hitch(this,"_buildUndoLink",_16,_17,_18,_19),isGlobal:this.isGlobal};
var nls=this.nls;
var m=null;
if(_1d){
_1f.success=false;
_1f.info=true;
m=new lconn.files.util.HtmlMessage(_1b?nls.INFO_EXISTS_X:nls.INFO_EXISTS_1,this.app,_1f);
}else{
_1f.success=true;
var msg;
if(_19){
msg=_1b?nls.INFO_SUCCESS_PUBLIC_X:nls.INFO_SUCCESS_PUBLIC_1;
}else{
if(_18){
msg=_1b?nls.INFO_SUCCESS_SHARED_X:nls.INFO_SUCCESS_SHARED_1;
}else{
msg=_1b?nls.INFO_SUCCESS_X:(this.getVisibleCollectionCount(_1a)>1?nls.INFO_SUCCESS_1_IN_OTHER_FOLDERS:nls.INFO_SUCCESS_1);
}
}
m=new lconn.files.util.HtmlMessage(msg,this.app,_1f);
}
var e={fileChange:true,collectionChange:true,collectionContentsChange:true,collection:_1c,file:_17,messages:m};
this.onSuccess(_16,_17,_18,_19,e);
return true;
},getVisibleCollectionCount:function(_20){
var _21=lconn.share.util.configUtil.isNestedFolderEnabled(this.app.authenticatedUser);
var _22=0;
if(_21&&_20){
var _23=lconn.share.bean.File.createBean(_20.documentElement);
_22=_23.getVisibleCollectionCount();
}
return _22;
},_buildUndoLink:function(_24,_25,_26,_27){
var a=document.createElement("a");
a.appendChild(document.createTextNode(this.nls.UNDO.ACTION));
a.href="javascript:;";
dojo.connect(a,"onclick",dojo.hitch(this,"_undo",a,_24,_25,_26,_27));
return a;
},_undo:function(a,_28,_29,_2a,_2b,e){
if(e){
dojo.stopEvent(e);
}
if(a){
a.style.display="none";
}
var _2c=[];
for(var i=0,_2d;_2d=_28[i];i++){
_2c.push(this.net.deleteXml({auth:{preventReload:true},url:this.app.routes.getCollectionListServiceUrl(_2d.getId?_2d.getId():_2d.id,{fileId:_29.getId()}),statusText:this.nls.UNDO.STATUS}));
}
if(_2b){
var doc=lconn.share.util.dom.newXMLDocument("entry",lconn.share.util.dom.ATOM_NAMESPACE,[lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE]);
var _2e=doc.documentElement;
var _2f=lconn.share.util.dom.createElementNS(doc,"category",lconn.share.util.dom.ATOM_NAMESPACE);
_2f.setAttribute("term",_29.getCategory());
_2f.setAttribute("label",_29.getCategory());
_2f.setAttribute("scheme","tag:ibm.com,2006:td/type");
_2e.appendChild(_2f);
var _30=lconn.share.util.dom.createElementNS(doc,"id",lconn.share.util.dom.ATOM_NAMESPACE);
_30.appendChild(doc.createTextNode(_29.getAtomId()));
_2e.appendChild(_30);
var _31=lconn.share.util.dom.createElementNS(doc,"visibility",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
_31.appendChild(doc.createTextNode("private"));
_2e.appendChild(_31);
_2c.push(this.net.putXml({auth:{preventReload:true},url:lconn.share.util.uri.rewriteUri(_29.getUrlEntry(),{submit:true}),postData:lconn.share.util.dom.serializeXMLDocument(doc,true),headers:{"Content-Type":"application/atom+xml;charset=\"UTF-8\""},statusText:this.nls.UNDO.STATUS}));
}
new dojo.DeferredList(_2c).addBoth(dojo.hitch(this,"_undoComplete",a,_28,_29,_2a,_2b));
},_undoComplete:function(a,_32,_33,_34,_35,_36){
for(var i=0;i<_32.length;i++){
_36[i][2]=_32[i];
}
var _37=_32.length>1;
var _38=dojo.filter(_36,function(r){
return r[1] instanceof Error&&r[1].code!="ItemNotFound";
});
var _39={count:dojo.number.format(_32.length),file:_33,collection:_37?null:_32[0],collectionlink:lconn.files.util.HtmlMessage.prototype.COLLECTION_LINK,filelink:lconn.files.util.HtmlMessage.prototype.FILE_LINK,isGlobal:this.isGlobal};
var msg=null;
var nls=this.nls.UNDO;
if(_38.length){
var _3a=dojo.filter(_38,function(r){
return !!r[2];
});
var _3b=null;
if(_35){
var _3c=_36[_36.length-1][1];
if(_3c instanceof Error){
_3b=_3c;
}
}
_39.count=dojo.number.format(_3a.length);
_39.collection=_3a.length==1?_3a[0][2]:null;
var _3d=_38[0][1].code;
for(var i=0,_3e;_3e=_38[i];i++){
if(_3d!=_3e[1].code){
_3d="unknown";
break;
}
}
if(_3d=="unauthenticated"){
if(a){
a.style.display="";
}
return;
}
if(_35&&_3b){
nls=nls.ERROR_PUBLIC;
}else{
nls=nls.ERROR_BASE;
}
var any=_3a.length>0;
_37=_3a.length>1;
_39.error=true;
if(_3d=="cancel"){
msg=any?_37?nls.CANCEL_MANY:nls.CANCEL_ONE:nls.CANCEL;
}else{
if(_3d=="timeout"){
msg=any?_37?nls.TIMEOUT_MANY:nls.TIMEOUT_ONE:nls.TIMEOUT;
}else{
msg=any?_37?nls.UNKNOWN_MANY:nls.UNKNOWN_ONE:nls.UNKNOWN;
}
}
}else{
_39.info=true;
if(_35){
msg=_37?nls.INFO_SUCCESS_PUBLIC_X:nls.INFO_SUCCESS_PUBLIC_1;
}else{
if(_34){
msg=_37?nls.INFO_SUCCESS_SHARED_X:nls.INFO_SUCCESS_SHARED_1;
}else{
msg=_37?nls.INFO_SUCCESS_X:nls.INFO_SUCCESS_1;
}
}
}
var m=new lconn.files.util.HtmlMessage(msg,this.app,_39);
var e={collectionChange:true,collectionContentsChange:true,messages:m};
dojo.publish("lconn/share/action/completed",[e,this]);
},onSuccess:function(_3f,_40,_41,_42,_43){
dojo.publish("lconn/share/action/completed",[_43,this]);
},onError:function(_44,_45,_46,_47,_48){
if(typeof _48=="string"){
_48={code:_48};
}
var nls=this.nls;
var _49=_44.length>1;
var msg=nls.ERROR;
if(_48.code=="AccessDenied"){
msg=_49?nls.ERROR_ACCESS_DENIED_X:nls.ERROR_ACCESS_DENIED_1;
}else{
if(_48.code=="ItemNotFound"){
if(_44.length==1&&_44[0].d&&_44[0].d.collectionType=="personal"&&_45.getLibraryType()=="communityFiles"){
msg=nls.ERROR_NOT_FOUND_2;
}else{
msg=_49?nls.ERROR_NOT_FOUND_X:nls.ERROR_NOT_FOUND_1;
}
}else{
if(_48.code=="SharingIntentRestriction"){
msg=nls.ERROR_EXTERNAL_COLLECTION;
}else{
if(_48.code=="PublicCollection"){
msg=_45.isShared()?nls.ERROR_ACCESS_DENIED_1:nls.ERROR_PUBLIC_COLLECTION;
}else{
if(_48.code=="RestrictionViolation"){
msg=this.app.nls.VISIBILITY_RESTRICTION.ERROR_ADD_TO_FOLDER;
}else{
if(_48.code=="UnshareableFile"){
msg=nls.ERROR_UNSHAREABLE_FILE;
}else{
if(_48.code=="cancel"){
msg=nls.ERROR_CANCEL;
}else{
if(_48.code=="timeout"){
msg=nls.ERROR_TIMEOUT;
}else{
if(_48.code=="unauthenticated"){
msg=nls.ERROR_NOT_LOGGED_IN;
}
}
}
}
}
}
}
}
}
if(_45._libraryType=="personalFiles"&&_44[0].type=="community"){
msg=nls.ERROR_CANNOT_MOVE_PERSONALFILE_TO_COMMUNITYFOLDER;
}
if(_45._libraryType=="communityFiles"&&_44[0].type=="personal"){
msg=nls.ERROR_CANNOT_MOVE_COMMUNITYFILE_TO_PERSONALFOLDER;
}
return msg;
}});
dojo.declare("lconn.files.action.impl.AddToCollection",[lconn.files.action.DialogAction,lconn.files.action.impl.AbstractAddToCollection],{wDialog:"660px",alwaysRecreate:true,pages:false,constructor:function(app,_4a,_4b){
this.app=app;
this.net=app.net;
if(_4b){
dojo.mixin(this,_4b);
}
this.currentOpenCollection=null;
this._requests=[];
this.isGrantFileEditPermissionToFolderEditorOnlyEnabled=lconn.share.util.configUtil.isGrantFileEditPermissionToFolderEditorOnlyEnabled(app.getAuthenticatedUser());
},createDialog:function(_4c,opt,_4d){
var _4e=(_4c.getLibraryType()=="communityFiles");
this.nls=_4e?dojo.i18n.getLocalization("lconn.files","action").ADD_TO_COMMUNITYCOLLECTION:(this.app.isNestedFolderEnabled?this.app.nls.ADD_FILE_TO_COLLECTION:dojo.i18n.getLocalization("lconn.files","action").ADD_TO_COLLECTION);
this.renderContent(_4c,opt,_4d);
},renderContent:function(_4f,opt,_50){
opt=opt||{};
var d=document;
_50.file=_4f;
_50._size=function(){
};
var _51=this;
var app=this.app;
var nls=this.nls;
var _52=app.getAuthenticatedUser();
var _53=_52.orgName||app.nls.ORGNAME_DEFAULT;
var _54=(_4f.getLibraryType()=="communityFiles");
var _55=!_4f.isPublic()&&!_4f.getPermissions().GrantAccess&&!_54;
var _56=!_4f.isPublic()&&_4f.getPermissions().GrantAccess&&!_54;
var _57=_4f.getPermissions().GrantAccessEdit&&!_54;
var _58=lconn.share.util.configUtil.isSharingIntentEnabled(_52)&&!_4f.isExternal();
if(!_54){
_50.notAllDisplayedMessage={message:this.nls.SHOW_ONLY_SOME_FOLDERS,info:true};
}
var _59={app:app,communitySearchAdapter:app.getCommunitySearchAdapter?app.getCommunitySearchAdapter():null,user:_52,nls:app.nls.COLLECTION_PICKER,net:app.net,role:"contributor",showImage:false,showVisibility:true,showExternal:true,internalOnly:_58,visibility:_55?"private":null,visibilityStrings:app.nls.CONTENT,width:550,breadcrumbPrefix:opt.breadcrumbPrefix?opt.breadcrumbPrefix:app.nls.FILEPICKER.BREADCRUMB.PREFIX.ADD_TO,hideBreadcrumbWithRootOnly:true,hideCheckbox:this.app.isNestedFolderEnabled,addAction:true};
_59.sourceSet=this.sourceSet;
var _5a=dojo.filter(this.sourceSet,function(r){
return r=="thisCommunity";
});
var _5b=(_5a.length>0);
if(_5b){
_59.community=this.community;
_59.type="community";
}
if(this.singleSelection||this.app.isNestedFolderEnabled){
_59.multi=false;
}
if(opt){
if(opt.initPickerParams){
_59.sourceOptions=opt.initPickerParams;
}
if(opt.selectedItems&&opt.keepSelected){
_59.sourceOptions=opt.selectedItems;
_59.sourceOptions=opt.keepSelected;
}
}
_50.picker=new lconn.files.widget.CompactFolderPicker(_59);
var _5c=_50.picker;
this.wDialog=_5c.width+"px";
var _5d=this.createDialogFrame(d,_50,{saveArguments:[null],btnOk:opt.btnOk?opt.btnOk:this.nls.OK_ADD_HERE,resizeDialog:true});
dojo.addClass(_50.domNode,"lconnPicker");
dojo.attr(_50.domNode,"aria-describedby",_5c.id+"_desp");
_51.setSubmitButtonEnabled(_50,false);
dojo.connect(_5c,"onSelectionChange",dojo.hitch(this,this._onPickerSelectionChange));
dojo.connect(_5c,"onMenuSelectionChange",dojo.hitch(this,function(_5e){
if(_57){
this.updateFooterLabel();
}
_50.resize();
}));
dojo.connect(_5c,"onSourceLoaded",function(){
if(_50.notAllDisplayedMessage){
_50.picker.showMessage("INFO_ADD_TO_COLLECTION",_50.notAllDisplayedMessage);
}
_50.resize();
});
_5d.content.className="";
_5d.content.appendChild(_5c.domNode);
_5c.startup();
if(_50.notAllDisplayedMessage){
_50.picker.showMessage("INFO_ADD_TO_COLLECTION",_50.notAllDisplayedMessage);
}
if(_57){
var div=d.createElement("div");
div.className="lotusDialogFooter";
div.style.borderTopWidth="0";
div.style.paddingTop="7px";
div.style.paddingBottom="7px";
var _5f=_50.isEditorNode=d.createElement("input");
_5f.type="checkbox";
_5f.id=_50.id+"_shareAsEditor";
_5f.className="lotusCheckbox";
_5f.name="_shareAsEditor";
_50.isEditorNode.checked=true;
div.appendChild(_5f);
var _60=this.footerLabel=d.createElement("label");
dojo.attr(_60,"for",_5f.id);
_60.className="lotusCheckbox";
_60.appendChild(d.createTextNode(this.isGrantFileEditPermissionToFolderEditorOnlyEnabled?nls.ALLOW_EDITORS_TO_EDIT_THIS_FILE:nls.SHARE_AS_EDITOR));
div.appendChild(_60);
_5d.content.appendChild(div);
}
_50.setContent(_5d.border);
},_onPickerSelectionChange:function(_61,_62,_63,_64,_65){
var _66=this,_67=this.dialog;
_66.currentOpenCollection=_65&&_65.getCurrentShownCollection?_65.getCurrentShownCollection():null;
_66.setSubmitButtonEnabled(_67,_66.getSubmitEnablement(_67));
if(_67.notAllDisplayedMessage){
_67.picker.showMessage("INFO_ADD_TO_COLLECTION",_67.notAllDisplayedMessage);
}
_67.resize();
},_getSelectionsInPicker:function(_68){
if(!_68){
return null;
}
var _69=(typeof _68.getSelectedItems=="function")?_68.getSelectedItems():[];
if(_69.length==0){
if(this.currentOpenCollection){
_69.push(this.currentOpenCollection);
}
}
return _69;
},getSubmitEnablement:function(_6a){
return this._getSelectionsInPicker(_6a.picker).length>0;
},setDialogMessage:function(_6b,_6c,_6d){
this.inherited(arguments);
var _6e=this._getDialogMessageContainer();
_6e.style.marginBottom=_6b&&_6b.length>0?"15px":"0px";
},updateDialog:function(_6f,opt,_70){
this._requests=[];
_70.file=_6f;
_70.dataLoaded=false;
_70.totalPages=-1;
lconn.share.util.validation.removeFormErrors(_70.formNode);
_70.list.update();
},updateFooterLabel:function(){
var d=document;
var nls=this.nls;
dojo.empty(this.footerLabel);
this.footerLabel.appendChild(d.createTextNode(this.isGrantFileEditPermissionToFolderEditorOnlyEnabled?nls.ALLOW_EDITORS_TO_EDIT_THIS_FILE:nls.SHARE_AS_EDITOR));
},validate:function(){
return true;
},save:function(_71,e){
if(e){
dojo.stopEvent(e);
}
var _72=this.dialog;
var _73=_72.file;
var _74=this._getSelectionsInPicker(_72.picker);
if(!_74||!_74.length){
return false;
}
var opt={};
if(_72.isEditorNode){
opt.shareEditor=_72.isEditorNode.checked;
}
var _75=this.getSaveOpts(_74,_73,opt);
_75.noStatus=true;
_75.handle=dojo.hitch(this,this.protectedComplete,_74,_73,_75.madeShared,_75.madePublic);
if(_75.madePublic){
this.app.confirm(this.nls.WARN_PUBLIC_1,dojo.hitch(this.net,"postXml",_75),this.close());
}else{
this._requests.push(this.net.postXml(_75));
}
return true;
},clearErrors:function(){
},onSuccess:function(_76,_77,_78,_79,_7a){
this.close();
return this.inherited(arguments);
},onError:function(_7b,_7c,_7d,_7e,_7f){
var msg=this.inherited(arguments);
var _80={collectionlink:lconn.share.util.text.trimToLength(_7b[0].getName(),50),filelink:lconn.share.util.text.trimToLength(_7c.getName(),50)};
msg=dojo.string.substitute(msg,_80);
if(this.dialog.notAllDisplayedMessage){
this.dialog.picker.showMessage("INFO_ADD_TO_COLLECTION",{message:msg,error:true});
}else{
this.dialog.mc.update([{message:msg,error:true}]);
}
},onListUpdate:function(_81){
var _82=this.dialog;
if(_82.totalPages==-1){
_82.totalPages=_81.paging.getLastPage();
if(_82.totalPages>2){
_82.searchFormNode.style.display="";
}
}
if(!_82.dataLoaded){
_82.dataLoaded=true;
_82._position();
}
},getCollectionsUrl:function(_83){
var _84=!this.dialog.file.isPublic();
var url=this.app.routes.getCollectionsListServiceUrl({sortKey:"title",visibility:(_84?"private":null),name:_83,role:"contributor",page:1,pageSize:10});
return url;
}});
}


;if(!dojo._hasResource["lconn.files.action.AbstractFilename"]){
dojo._hasResource["lconn.files.action.AbstractFilename"]=true;
dojo.provide("lconn.files.action.AbstractFilename");
dojo.declare("lconn.files.action.AbstractFilename",null,{checkExistingFile:true,initFilename:function(){
if(this.checkExistingFile){
this.filenameCheck=new lconn.filesCheckFilenameExists(dojo.hitch(this,"getFilenameCheckUrl"),this.app.net);
dojo.connect(this.filenameCheck,"onChecked",this,"onFilenameChecked");
}
},updateDialogFilename:function(_1,_2,_3){
if(_3.fileNode){
_3.fileNode.value="";
}
if(_3.filenameNode){
_3.filenameNode.value="";
}
delete _3.originalExtension;
delete _3.editingExtension;
this.validateFile();
this.validateFilename();
if(_1){
this.setOriginalFilename(_1.getName());
}
},createFileField:function(_4){
var d=document;
var _5=_4.fileNode=d.createElement(dojo.isIE<9?"<input type=\"file\">":"input");
_5.type="file";
dojo.connect(_5,"onchange",dojo.hitch(this,this.onFileChange));
return _5;
},getFileField:function(){
return this.dialog.fileNode;
},onFileChange:function(){
var _6=this.dialog.fileNode;
var _7=lconn.share.util.text.trim(_6.value);
var _8=lconn.share.util.text.getFilename(_7);
this.setOriginalFilename(_8);
if(this.validateFilename(false)){
this.checkFilename(_8);
}
},createFilenameField:function(_9){
var d=document;
var _a=_9.filenameNode=d.createElement("input");
dojo.attr(_a,"autocomplete","off");
dojo.connect(_a,"onfocus",dojo.hitch(this,this.onFilenameFocus));
dojo.connect(_a,"onchange",dojo.hitch(this,this.onFilenameChange));
dojo.connect(_a,"onkeypress",dojo.hitch(this,this.onFilenameKeypress,_a));
return _a;
},getFilenameField:function(){
return this.dialog.filenameNode;
},onFilenameFocus:function(){
if(!this.dialog._uploadFilenameChanged){
this.dialog.filenameNode.select();
}
},onFilenameChange:function(){
if(!this.dialog){
return;
}
this.dialog._uploadFilenameChanged=true;
if(this.validateFilename(false)){
this.checkFilename();
}
},onFilenameKeypress:function(_b,e){
if(e&&e.keyChar==""&&dojo.indexOf([dojo.keys.DELETE,dojo.keys.BACKSPACE],e.keyCode)==-1){
return;
}
if(_b._hasExistError){
_b._hasExistError=false;
lconn.share.util.validation.removeInlineErrorRow(_b.parentNode.parentNode,_b,"exists");
}
if(this.filenameCheckTimeout){
clearTimeout(this.filenameCheckTimeout);
}
this.filenameCheckTimeout=setTimeout(dojo.hitch(this,"onFilenameChange",null),500);
},checkFilename:function(_c){
if(this.checkExistingFile&&this.filenameCheck){
this.filenameCheck.check(_c||this.getFilename());
}
},onFilenameChecked:function(_d,_e){
if(_e&&this.checkExistingFile){
if(this.getFilename()==_d){
var el=this.getFilenameField();
lconn.share.util.validation.addInlineErrorRow(el.parentNode.parentNode,el,"exists",this.nls.WARN_FILE_EXISTS);
el._hasExistError=true;
}
}else{
var el=this.getFilenameField();
lconn.share.util.validation.removeInlineErrorRow(el.parentNode.parentNode,el,"exists");
el._hasExistError=false;
}
},createEditExtensionLink:function(_f,_10){
var d=document;
var a=_f.editExtensionLink=d.createElement("a");
dijit.setWaiRole(a,"button");
a.href="javascript:;";
a.title=this.nls.CHANGE_EXT||"";
a.appendChild(d.createTextNode(this.nls.CHANGE_EXT||""));
dojo.connect(a,"onclick",dojo.hitch(this,this.editExtension));
_f.editExtensionLinkVisibilityNode=_10||a;
return a;
},updateEditExtensionLinkVisibility:function(){
var _11=this.dialog;
var el=_11.editExtensionLinkVisibilityNode;
if(el){
el.style.display=_11.editingExtension?"none":"";
}
},editExtension:function(){
var _12=this.getFilename();
this.setEditingExtension(true);
var _13=this.dialog;
if(_13.filenameNode){
_13.filenameNode.value=_12;
_13.filenameNode.focus();
}
},createExtensionDescriptionNode:function(_14,_15){
var d=document;
var _14=this.dialog;
var _16=_14.extensionDescriptionNode=d.createElement("span");
this.updateExtensionDescriptionVisibility();
this.updateExtensionDescription();
_14.extensionDescriptionVisibilityNode=_15||_16;
return _16;
},updateExtensionDescriptionVisibility:function(){
var _17=this.dialog;
var el=_17.extensionDescriptionVisibilityNode;
if(el){
el.style.display=_17.editingExtension?"":"none";
}
},updateExtensionDescription:function(){
var d=document;
var _18=this.dialog;
var el=_18.extensionDescriptionNode;
if(el){
lconn.share.util.html.removeChildren(el);
el.title=this.getExtensionDescription(false);
el.appendChild(d.createTextNode(this.getExtensionDescription(true)));
}
},getExtensionDescription:function(_19){
var _1a="";
var _1b=this.dialog;
if(!_1b.originalExtension){
_1a=this.nls.NO_EXT||"";
}else{
var ext=_1b.originalExtension;
if(_19&&ext.length>16){
ext=lconn.share.util.text.trimToLength(ext,16);
}
_1a=dojo.string.substitute(this.nls.ORIGINAL_EXT||"",[ext]);
}
return _1a;
},getFilename:function(){
var _1c="";
var _1d=this.dialog;
if(_1d&&_1d.filenameNode){
var _1c=lconn.share.util.text.trim(_1d.filenameNode.value);
if(!_1d.editingExtension&&_1d.originalExtension){
_1c+="."+_1d.originalExtension;
}
}
return _1c;
},validateFile:function(_1e){
_1e=_1e==true;
var _1f=true;
var _20=this.dialog;
if(_20&&_20.fileNode){
var el=_20.fileNode;
var _21=lconn.share.util.text.trim(el.value);
if(_1e&&_21.length==0){
lconn.share.util.validation.addInlineErrorRow(el.parentNode.parentNode,el,"empty",this.nls.SELECT_FILE);
_1f=false;
}else{
lconn.share.util.validation.removeInlineErrorRow(el.parentNode.parentNode,el,"empty");
}
}
return _1f;
},validateFilename:function(_22){
_22=_22==true;
var _23=true;
var _24=this.dialog;
if(_24&&_24.filenameNode){
var el=_24.filenameNode;
var d=document;
var _25=lconn.share.util.text.trim(el.value);
var _26=this.getFilename();
if(_22&&_25==""){
lconn.share.util.validation.addInlineErrorRow(el.parentNode.parentNode,el,"empty",this.nls.WARN_NO_FILENAME);
_23=false;
}else{
if(_26.match(lconn.share.util.validation.EMPTY_FILENAME)){
lconn.share.util.validation.addInlineErrorRow(el.parentNode.parentNode,el,"empty",this.nls.WARN_NO_FILENAME);
_23=false;
}else{
lconn.share.util.validation.removeInlineErrorRow(el.parentNode.parentNode,el,"empty");
}
}
if(!lconn.share.util.validation.validateTextLength(_26,lconn.share.util.validation.FILENAME_LENGTH)){
var _27=d.createElement("div");
_27.appendChild(d.createTextNode(this.nls.WARN_LONG_FILENAME));
_27.appendChild(d.createTextNode(" "));
var a=d.createElement("a");
a.href="javascript:;";
dijit.setWaiRole(a,"button");
dojo.connect(a,"onclick",this,"trimFilename");
a.appendChild(d.createTextNode(this.nls.TRIM_LONG_FILENAME));
_27.appendChild(a);
lconn.share.util.validation.addInlineErrorRow(el.parentNode.parentNode,el,"length",_27);
_23=false;
}else{
lconn.share.util.validation.removeInlineErrorRow(el.parentNode.parentNode,el,"length");
}
if(_26.match(lconn.share.util.validation.INVALID_FILENAME_CHARS)){
var _27=d.createElement("div");
_27.appendChild(d.createTextNode(this.nls.WARN_INVALID_CHARS_IN_NAME));
_27.appendChild(d.createTextNode(" "));
var a=d.createElement("a");
a.href="javascript:;";
dijit.setWaiRole(a,"button");
dojo.connect(a,"onclick",this,"fixFilenameCharacters");
a.appendChild(d.createTextNode(this.nls.FIX_INVALID_CHARS_IN_NAME));
_27.appendChild(a);
lconn.share.util.validation.addInlineErrorRow(el.parentNode.parentNode,el,"chars",_27);
_23=false;
}else{
lconn.share.util.validation.removeInlineErrorRow(el.parentNode.parentNode,el,"chars");
}
}
return _23;
},trimFilename:function(){
var _28=this.dialog;
if(_28&&_28.filenameNode){
var el=_28.filenameNode;
var _29=_28.originalExtension||"";
var _2a=_28.editingExtension;
var _2b=lconn.share.util.text.trim(el.value);
var _2c=_2b;
var ext=_29;
if(_2a){
_2c=lconn.share.util.text.trimExtension(_2b);
ext=lconn.share.util.text.getExtension(_2b);
}
var _2d=lconn.share.util.text.lengthUtf8(_2c);
var _2e=lconn.share.util.text.lengthUtf8(ext);
var dot="";
var _2f=0;
if(_2e>0){
dot=".";
_2f=1;
}
var _30=lconn.share.util.validation.FILENAME_LENGTH-_2e-_2f;
if(_30<=0){
_2c="";
var _31=lconn.share.util.validation.FILENAME_LENGTH-_2f;
ext=lconn.share.util.trimToByteLength(ext,_31);
if(!_2a){
this.setOriginalExtension(ext);
}
}else{
_2c=lconn.share.util.text.trimToByteLength(_2c,_30);
}
if(_2c==""){
this.setEditingExtension(_2a=true);
}
el.value=_2a?(_2c+dot+ext):(_2c);
lconn.share.util.validation.removeInlineErrorRow(el.parentNode.parentNode,el,"length");
el.focus();
this.onFilenameChange();
}
},fixFilenameCharacters:function(){
if(this.dialog&&this.dialog.filenameNode){
var _32=this.dialog;
var el=_32.filenameNode;
el.value=el.value.replace(lconn.share.util.validation.INVALID_FILENAME_CHARS,"_");
lconn.share.util.validation.removeInlineErrorRow(el.parentNode.parentNode,el,"chars");
el.focus();
if(!_32.editingExtension){
this.setOriginalExtension(_32.originalExtension.replace(lconn.share.util.validation.INVALID_FILENAME_CHARS,"_"));
}
this.onFilenameChange();
}
},setOriginalFilename:function(_33){
var _34=this.dialog;
if(_34.formNode){
lconn.share.util.validation.removeFormErrors(_34.formNode);
}
_34._uploadFilenameChanged=false;
var _35=lconn.share.util.text.getExtension(_33);
var _36=lconn.share.util.text.trimExtension(_33);
var _37=(_36==""||_35=="");
this.setOriginalExtension(_35);
this.setEditingExtension(_37);
if(_34.filenameNode){
_34.filenameNode.value=_37?_33:_36;
}
},setOriginalExtension:function(ext){
this.dialog.originalExtension=ext;
this.updateExtensionDescription();
},setEditingExtension:function(_38){
this.dialog.editingExtension=_38;
this.updateEditExtensionLinkVisibility();
this.updateExtensionDescriptionVisibility();
}});
dojo.declare("lconn.filesCheckFilenameExists",null,{constructor:function(url,net){
if(typeof url=="function"){
this.getUrl=url;
}else{
this.url=url;
}
this.net=net;
},getUrl:function(_39){
if(this.url==null){
return null;
}
return this.url.replace("{name}",encodeURIComponent(_39));
},check:function(_3a,_3b){
if(!_3a||_3a==""){
return this.onChecked(_3a,false);
}
this.cancel();
if(_3b>0){
this.timeout=setTimeout(dojo.hitch(this,"check",_3a),_3b);
return;
}
var url=this.getUrl(_3a);
if(!url){
return;
}
this.pending=this.net.headXml({url:url,noStatus:true,auth:{preventReload:true,preventLogin:true},handle:dojo.hitch(this,"handle",_3a)});
},handle:function(_3c,_3d,_3e){
var _3f;
try{
_3f=_3e.xhr.status;
}
catch(e){
}
if(_3d instanceof Error){
if(_3d.code=="ItemNotFound"){
this.onChecked(_3c,false);
}
}else{
if(_3f==200){
this.onChecked(_3c,true);
}
}
},onChecked:function(_40,_41){
},cancel:function(){
if(this.timeout){
clearTimeout(this.timeout);
this.timeout=null;
}
if(this.pending){
this.pending.cancel();
}
}});
}


;if(!dojo._hasResource["lconn.files.action.AbstractTag"]){
dojo._hasResource["lconn.files.action.AbstractTag"]=true;
dojo.provide("lconn.files.action.AbstractTag");






dojo.declare("lconn.files.action.AbstractTag",null,{showTags:true,initTag:function(){
if(this.showTags&&this.app.getTagStore){
this.tagStore=this.app.getTagStore();
}
},createTagField:function(_1,_2){
var d=document;
var _3=_1.tagsNode=d.createElement("input");
_3.type="text";
_3.className="lotusText";
_3.name=_1.id+"_tags";
_2.appendChild(_3);
var _4=_1.tagsCombo=new lconn.share.widget.TagTypeAhead({name:"uploadFileTaggerTypeAhead",multipleValues:true,token:" ",_strings:this.app.nls.TAGGER,"class":"lotusText",hideEmptyResults:true,autoSelectChars:[],store:this.tagStore},_3);
if(dojo.isIE){
_4.textbox.style.width=this.wInput;
}
lconn.core.globalization.bidiUtil.inputRTLProcessing(_4.textbox);
dojo.connect(_4.textbox,"onkeyup",function(){
lconn.core.globalization.bidiUtil.inputRTLProcessing(_4.textbox);
});
},setTagFieldLabel:function(_5,_6){
dojo.attr(_6,"for",_5.tagsCombo.textbox.id);
},setOriginalTags:function(_7){
var _8="";
var _9=this.dialog;
if(_9){
_9.tagsCombo.textbox.value=_7.join(" ");
}
},getTags:function(){
var _a=this.dialog;
if(_a){
var _b=_a.tagsCombo.textbox.value;
var _c=lconn.share.bean.File.splitTags(_b);
return _c;
}
return [];
},destroyTag:function(){
this.tagStore=null;
},validateTags:function(){
var _d=true;
if(this.dialog&&this.dialog.tagsCombo){
var d=document;
var el=this.dialog.tagsCombo.textbox;
var _e=this.getTags();
var _f=d.createElement("div");
var _10=this.nls.WARN_LONG_TAG;
dojo.forEach(_e,function(tag,i){
if(!lconn.share.util.validation.validateTextLength(tag,lconn.share.util.validation.TAG_LENGTH)){
_f.appendChild(d.createTextNode(dojo.string.substitute(_10,[lconn.share.util.text.trimToLength(tag,10)])));
_d=false;
}
});
this.dialog.tagsCombo.staticClass="lotusText";
lconn.share.util.validation.removeInlineErrorRow(el.parentNode.parentNode,el,"length");
if(!_d){
var _11=_f.childNodes.length>1;
if(_11){
_f=d.createTextNode("div");
_f.appendChild(d.createTextNode(this.nls.WARN_LONG_TAGSE));
}
_f.appendChild(d.createTextNode(" "));
var a=d.createElement("a");
a.href="javascript:;";
dojo.connect(a,"onclick",this,"trimTags");
a.appendChild(d.createTextNode(_11?this.nls.TRIM_TAGS:this.nls.TRIM_TAG));
_f.appendChild(a);
this.dialog.tagsCombo.staticClass="lotusText lotusFormErrorField";
lconn.share.util.validation.addInlineErrorRow(el.parentNode.parentNode,el,"length",_f);
}
}
return _d;
},trimTags:function(){
if(this.dialog&&this.dialog.tagsCombo){
var el=this.dialog.tagsCombo.textbox;
var _12=lconn.share.bean.File.splitTags(el.value);
_12=dojo.map(_12,function(tag){
var i=lconn.share.util.text.getCharIndexForUtf8Index(tag,lconn.share.util.validation.TAG_LENGTH);
if(i!=-1){
tag=tag.substring(0,i);
}
return tag;
});
el.value=_12.join(" ");
this.dialog.tagsCombo.staticClass="lotusText";
lconn.share.util.validation.removeInlineErrorRow(el.parentNode.parentNode,el,"length");
}
}});
}


;if(!dojo._hasResource["lconn.files.action.impl.CopyFile"]){
dojo._hasResource["lconn.files.action.impl.CopyFile"]=true;
dojo.provide("lconn.files.action.impl.CopyFile");


















dojo.requireLocalization("lconn.files","action");
dojo.declare("lconn.files.action.impl.CopyFile",[lconn.files.action.DialogAction,lconn.files.action.AbstractFilename,lconn.files.action.AbstractTag],{wInput:"340px",wInputUser:"280px",wInputUserOneRole:"280px",wDialog:"500px",wDialogTotal:"650px",inlinePageSize:15,focusBeforeDialog:null,community:null,showPublicCommunities:true,_blankGif:(dojo.getObject("dojo.config.blankGif")||"blank.gif").toString(),constructor:function(_1,_2){
this.app=_1;
var _3=this.nls=dojo.i18n.getLocalization("lconn.files","action").COPY_FILE;
this._stringsCommunity=this._stringsCommunity||this.app.nls.COMMUNITYSEARCH;
this.communitiesStore=this.communitiesStore||this.app.getLibraryTypeAheadStore();
this.initFilename();
this.initTag();
},onClose:function(){
dijit.focus(this.focusBeforeDialog);
},save:function(e){
if(e){
dojo.stopEvent(e);
}
if(!this.validate()){
return false;
}
var _4=this.getTags();
var _5=this.getFilename();
var _6=this.community.externalContainerId;
var _7=this.dialog.file.getId();
var _8=this.app.routes.getCommunityLibraryListServiceUrl(_6);
var ns=lconn.share.util.dom.NAMESPACES;
var _9=lconn.share.util.dom.newXMLDocument("entry",lconn.share.util.dom.ATOM_NAMESPACE,[lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE]);
var _a=_9.documentElement;
var _b=lconn.share.util.dom.createElementNS(_9,"category",lconn.share.util.dom.ATOM_NAMESPACE);
_b.setAttribute("term","document");
_b.setAttribute("label","document");
_b.setAttribute("scheme","tag:ibm.com,2006:td/type");
_a.appendChild(_b);
var _c=lconn.share.util.dom.createElementNS(_9,"uuid",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
_c.appendChild(_9.createTextNode(_7));
_a.appendChild(_c);
var _d=lconn.share.util.dom.createElementNS(_9,"label",ns.DOCUMENTS_ATOM);
_d.appendChild(_9.createTextNode(_5));
_a.appendChild(_d);
dojo.forEach(_4,function(_e){
var _f=lconn.share.util.dom.createElementNS(_9,"category",lconn.share.util.dom.ATOM_NAMESPACE);
_f.setAttribute("term",_e);
_f.setAttribute("label",_e);
_a.appendChild(_f);
});
var _10=lconn.share.util.dom.serializeXMLDocument(_9,true);
this.app.net.postXml({noStatus:true,url:_8,postData:_10,requireData:false,headers:{"Content-Type":"application/atom+xml;charset=\"UTF-8\""},handle:dojo.hitch(this,this.protectedComplete)});
},complete:function(_11,_12){
if(_11 instanceof Error){
this.onError(_11.code);
return false;
}
this.close();
var _13=lconn.share.bean.File.createBean(_11.documentElement,{apiType:this.app.apiType});
var _14=_13.isPending();
var msg=this.nls.INFO_SUCCESS;
var c=this.community;
if(_14){
var m=new lconn.files.util.HtmlMessage(this.nls.INFO_SUCCESS_PRE_MODERATION,this.app,{success:true,file:_13,name:lconn.share.util.html.formatFilename(_13.getName()),community:{name:c.title,id:c.externalContainerId},community_link:lconn.files.util.HtmlMessage.prototype.COMMUNITY_LINK});
}else{
var m=new lconn.files.util.HtmlMessage(msg,this.app,{success:true,file:_13,link:lconn.files.util.HtmlMessage.prototype.FILE_LINK,community:{name:c.title,id:c.externalContainerId},community_link:lconn.files.util.HtmlMessage.prototype.COMMUNITY_LINK});
}
var e={fileCopy:true,file:_13,messages:m};
dojo.publish("lconn/share/action/completed",[e,this]);
return true;
},validate:function(){
var _15=true;
_15&=this.validateCommunity(true);
_15&=this.validateFilename(true);
_15&=this.validateTags();
return _15;
},onError:function(_16){
if(typeof _16=="string"){
_16={code:_16};
}
if(_16.code=="InvalidPath"){
this.setFormError(this.nls.ERROR_FILENAME_INVALID_CHARACTERS);
}else{
if(_16.code=="AccessDenied"){
this.setFormError(this.nls.ERROR_ACCESS_DENIED);
}else{
if(_16.code=="ItemNotFound"){
this.setFormError(this.nls.FILE_DOES_NOT_EXIST);
}else{
if(_16.code=="ItemExists"){
this.setFormError(this.nls.FILE_ALREADY_EXISTS);
}else{
if(_16.code=="InvalidNonceValue"){
this.setFormError(this.nls.ERROR_TIMEOUT);
}else{
if(_16.code=="QuotaViolation"){
var _17=lconn.share.util.text.parseInt(_16.uploadSize,0);
var _18=lconn.share.util.text.parseInt(_16.libraryQuota,0);
if(_17>_18){
this.setFormError(dojo.string.substitute(this.nls.ERROR_MAX_CONTENT_SIZE,[lconn.share.util.text.formatSize(_18)]));
}else{
var _19=lconn.share.util.text.parseInt(_16.uploadSize-(_16.libraryQuota-_16.librarySize),"??");
this.setFormError(dojo.string.substitute(this.nls.ERROR_QUOTA_VIOLATION,[lconn.share.util.text.formatSize(_19)]));
}
}else{
if(_16.code=="InvalidTagCharacters"){
this.setFormError(_16.message);
}else{
if(_16.code=="cancel"){
this.setFormError(this.nls.ERROR_CANCEL);
}else{
if(_16.code=="timeout"){
this.setFormError(this.nls.ERROR_TIMEOUT);
}else{
if(_16.code=="unauthenticated"){
this.setFormError(this.nls.ERROR_NOT_LOGGED_IN);
}else{
if(_16.code=="ContentMaxSizeExceeded"){
var _1a=dojo.string.substitute(this.nls.ERROR_MAX_CONTENT_SIZE,[lconn.share.util.text.formatSize(this.maxFileSize)]);
this.setFormError(_1a);
}else{
this.setFormError(this.nls.ERROR,_16);
}
}
}
}
}
}
}
}
}
}
}
},createDialog:function(_1b,opt,_1c){
var d=document;
var app=this.app;
this.id=this.id||dijit.getUniqueId("CopyFile");
this.focusBeforeDialog=document.activeElement;
var _1d=this.createDialogFrame(d,_1c,{});
var _1e=_1d.border;
var _1f=_1d.content;
var _20=d.createElement("table");
dijit.setWaiState(_20,"presentation");
var _21=d.createElement("colgroup");
_21.appendChild(d.createElement("col"));
var col=d.createElement("col");
col.width="100%";
_21.appendChild(col);
_21.appendChild(d.createElement("col"));
_20.appendChild(_21);
_20.className="lotusFormTable";
_20.cellPadding=_20.cellPadding=0;
var _22=d.createElement("tbody");
var tr=d.createElement("tr");
tr.className="lotusFormFieldRow";
var td=d.createElement("td");
td.className="lotusFormLabel lotusNowrap";
var _23=_1c.copyCommunityInputLabel=d.createElement("label");
var _24=_23.appendChild(d.createElement("span"));
dojo.attr(_24,"title",this.nls.REQUIRED_FIELD);
dojo.attr(_24,"class","lotusFormRequired");
_24.appendChild(d.createTextNode("*"));
_23.appendChild(d.createTextNode(this.nls.COMMUNITY_LABEL));
_23.id=_1c.id+"_communityLabel";
td.appendChild(_23);
var _24=_23.appendChild(d.createElement("span"));
dijit.setWaiRole(_24,"presentation");
dojo.html.set(_24,"&nbsp;");
this.createHelpLink(this.app,_23,"copyoptions.copytocommunity",{label:this.nls.COMMUNITY_LABEL,header:this.nls.COMMUNITY_HEADER});
tr.appendChild(td);
var td=d.createElement("td");
var _25=d.createElement("INPUT");
_25.value="";
_25.className="lotusText";
_25.setAttribute("aria-invalid",false);
td.appendChild(_25);
var _26=this.communities=new lconn.share.widget.TypeAhead({minChars:3,_strings:this._stringsCommunity,id:this.id+"_communities",name:this.name+"_copyCommunityInput","class":"lotusText",orient:dojo._isBodyLtr()?{"BL":"TL"}:{"BR":"TR"},store:this.communitiesStore,nameAttr:"title",searchOpts:{role:"contributor",type:"communityFiles"},decorateItem:function(el,_27){
var _28=this.formatItem(_27);
if(_28.length>60){
el.title=_28;
_28=lconn.share.util.text.trimToLength(_28,60);
lconn.share.util.html.removeChildren(el);
el.appendChild(document.createTextNode(_28));
}
},hintText:this._stringsCommunity.HINT_TEXT},_25);
if(dojo.isIE){
_26.textbox.style.width=this.wInput;
}
_1c.communityInput=_26.textbox;
_23.setAttribute("for",_26.id);
dijit.setWaiState(_26.textbox,"required",true);
dojo.connect(_26,"onSelect",this,"selectCommunity");
lconn.core.globalization.bidiUtil.inputRTLProcessing(_26.textbox);
dojo.connect(_26.textbox,"onkeyup",function(){
lconn.core.globalization.bidiUtil.inputRTLProcessing(_26.textbox);
});
dojo.connect(_26.textbox,"onblur",function(){
if(dojo.string.trim(_26.textbox.value)==""){
_26.textbox.setAttribute("aria-invalid",true);
}else{
_26.textbox.setAttribute("aria-invalid",false);
}
});
tr.appendChild(td);
_22.appendChild(tr);
var tr=d.createElement("tr");
tr.className="lotusFormFieldRow";
var td=d.createElement("td");
td.className="lotusFormLabel lotusNowrap";
var _23=d.createElement("label");
var _24=_23.appendChild(d.createElement("span"));
dojo.attr(_24,"title",this.nls.REQUIRED_FIELD);
dojo.attr(_24,"class","lotusFormRequired");
_24.appendChild(d.createTextNode("*"));
_23.appendChild(d.createTextNode(this.nls.NAME_LABEL));
td.appendChild(_23);
var _24=_23.appendChild(d.createElement("span"));
dijit.setWaiRole(_24,"presentation");
dojo.html.set(_24,"&nbsp;");
this.createHelpLink(this.app,_23,"upload.filename",{label:this.nls.NAME_LABEL,header:this.nls.NAME_HEADER});
tr.appendChild(td);
var td=d.createElement("td");
var _25=this.createFilenameField(_1c);
_25.id=_1c.id+"_name";
dojo.attr(_23,"for",_25.id);
_25.className="lotusText lotusLTR lotusLeft";
_25.name="_label";
_25.setAttribute("aria-invalid",false);
if(dojo.isIE){
_25.style.width=this.wInput;
}
dijit.setWaiState(_25,"required",true);
lconn.core.globalization.bidiUtil.inputRTLProcessing(_25);
dojo.connect(_25,"onkeyup",function(){
lconn.core.globalization.bidiUtil.inputRTLProcessing(_25);
});
dojo.connect(_25,"onblur",function(){
if(dojo.string.trim(_25.value)==""){
_25.setAttribute("aria-invalid",true);
}else{
_25.setAttribute("aria-invalid",false);
}
});
td.appendChild(_25);
tr.appendChild(td);
_22.appendChild(tr);
if(this.showTags){
var tr=d.createElement("tr");
tr.className="lotusFormFieldRow";
var td=d.createElement("td");
td.className="lotusFormLabel lotusNowrap";
var _23=d.createElement("label");
_23.appendChild(d.createTextNode(this.nls.TAGS_LABEL));
td.appendChild(_23);
var _24=_23.appendChild(d.createElement("span"));
dijit.setWaiRole(_24,"presentation");
dojo.html.set(_24,"&nbsp;");
this.createHelpLink(this.app,_23,"upload.tags",{label:this.nls.TAGS_LABEL,header:this.nls.TAGS_HEADER});
tr.appendChild(td);
var td=d.createElement("td");
this.createTagField(_1c,td);
this.setTagFieldLabel(_1c,_23);
tr.appendChild(td);
_22.appendChild(tr);
}
var tr=_22.appendChild(d.createElement("tr"));
tr.className="lotusFormFieldRow";
var td=tr.appendChild(d.createElement("td"));
td.className="lotusFormLabel lotusNowrap";
dojo.attr(tr,"colspan","3");
td.appendChild(d.createTextNode(this.nls.REQUIRED_MARK));
_20.appendChild(_22);
_1f.appendChild(_20);
_1c.setContent(_1e);
_1c.initialFocusNode=_1c.initialCopyFocusNode;
this.updateDialogCopy(_1b,opt,_1c);
},selectCommunity:function(_29){
var _2a=this.dialog;
var el=this.dialog.communityInput;
this.communities.setValue("");
lconn.share.util.validation.removeInlineErrorRow(el.parentNode.parentNode,el,"empty");
this.checkExistingFile=true;
var d=document;
var _2b=this.community=_29;
if(!_2b||!_2b.title){
return;
}
dojo.style(this.dialog.communityInput,"display","none");
var td=el.parentNode;
var div=_2a.communityDiv=d.createElement("div");
div.className="lotusFilters2";
var a=d.createElement("a");
a._id=_2b.id;
a.className="lotusFilter";
dijit.setWaiRole(a,"button");
a.appendChild(d.createTextNode(lconn.share.util.text.trimToLength(_2b.title,60)));
a.href="javascript:;";
a.title=this.nls.ALT_EDIT;
var img=d.createElement("img");
img.alt=this.nls.ALT_EDIT;
img.className="lotusDelete";
img.src=dojo.config.blankGif;
a.appendChild(img);
var _2c=d.createElement("span");
_2c.appendChild(d.createTextNode(this.nls.ALT_EDIT));
_2c.className="lotusAltText";
a.appendChild(_2c);
dojo.connect(a,"onclick",dojo.hitch(this,this.removeCommunity));
div.appendChild(a);
td.appendChild(div);
},removeCommunity:function(){
var _2d=this.dialog;
this.checkExistingFile=false;
if(this.communities){
this.communities.setValue("");
}
this.community=null;
this.dialog.communityInput.style.display="";
if(_2d.communityDiv){
_2d.communityInput.parentNode.removeChild(_2d.communityDiv);
_2d.communityDiv=null;
}
dijit.focus(this.dialog.communityInput);
},createMessageContainer:function(_2e,_2f,opt,_30){
var d=document;
var tr=d.createElement("tr");
var td=tr.appendChild(d.createElement("td"));
var td=tr.appendChild(d.createElement("td"));
_30.mc=new lconn.share.widget.MessageContainer({nls:this.app.nls},td.appendChild(d.createElement("div")));
_2e.appendChild(tr);
},getFilenameCheckUrl:function(_31){
return this.app.routes.getFileInfoServiceUrl(_31,{byLabel:true,communityId:this.community.externalContainerId});
},updateDialog:function(_32,opt,_33){
var d=document;
_33.file=_32;
this.updateDialogCopy(_32,opt,_33);
_33.initialFocusNode=_33.initialCopyFocusNode;
lconn.share.util.validation.removeFormErrors(_33.formNode);
},updateDialogCopy:function(_34,opt,_35){
_35.file=_34;
var _36=_34.getTags();
this.setOriginalTags(_36);
this.setOriginalFilename(_34.getName());
this.removeCommunity();
},validateCommunity:function(_37){
_37=_37==true;
var _38=this.dialog;
var _39=true;
if(_38&&_38.communityInput){
var el=_38.communityInput;
if(_37&&this.community==null){
lconn.share.util.validation.addInlineErrorRow(el.parentNode.parentNode,el,"empty",this.nls.WARN_NO_COMMUNITY_SELETED);
_39=false;
}else{
lconn.share.util.validation.removeInlineErrorRow(el.parentNode.parentNode,el,"empty");
}
}
return _39;
}});
lconn.files.action.impl.CopyFile.decodeSpecialHtmlChars=function(_3a){
return _3a.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");
};
}


;if(!dojo._hasResource["lconn.share.util.AsyncLoader"]){
dojo._hasResource["lconn.share.util.AsyncLoader"]=true;
dojo.provide("lconn.share.util.AsyncLoader");
dojo.declare("lconn.share.util.AsyncLoader",null,{constructor:function(_1){
dojo.mixin(this,_1);
this._requests=[];
this._plannedRequests=[];
this._errors=[];
this._runningRequests=0;
},add:function(){
this._plannedRequests.push(arguments);
},size:function(){
return this._plannedRequests.length;
},isEmpty:function(){
return this._plannedRequests.length==0;
},cancel:function(){
dojo.forEach(this._requests,function(_2){
if(_2&&_2.dojoRequest){
_2.dojoRequest.cancel();
}
});
this._requests=[];
this._plannedRequests=[];
this._runningRequests=0;
},handleRequest:function(_3,_4){
var _5=this._runningRequests;
for(var i=0;i<this._requests.length;i++){
var r=this._requests[i];
if(r&&r.originalHandler==_4.args.originalHandler){
_5=--this._runningRequests;
this._requests[i]=null;
var _6=(this.scope||this);
var f=typeof _4.args.originalHandler=="function"?_4.args.originalHandler:_6[_4.args.originalHandler];
var _7=f.apply(_6,arguments);
if(_7){
this._errors.push(_7);
if(this.onRequestCompleted(_7)){
this.cancel();
}
}
break;
}
}
if(_5<1){
var _8=this._errors;
this._errors=[];
this._requests=[];
this._plannedRequests=[];
this._runningRequests=0;
this.onRequestsCompleted(_8);
}
},start:function(){
if(this._runningRequests>0){
throw "Requests already running, call cancel() first";
}
if(this._plannedRequests){
this._runningRequests=this._plannedRequests.length;
for(var i=0;i<this._plannedRequests.length;i++){
this._requestSingle.apply(this,this._plannedRequests[i]);
}
}
},_requestSingle:function(_9,_a,_b,_c){
var _d={originalHandler:_a};
this._requests.push(_d);
var _e={originalHandler:_a,url:_9,handle:dojo.hitch(this,this.handleRequest),timeout:_c,handleAs:_b||"xml"};
if(this.ioArgs){
dojo.mixin(_e,this.ioArgs);
}
_d.dojoRequest=this.net.get(_e);
},onRequestsCompleted:function(_f){
if(this.scope&&this.scope.onRequestsCompleted){
this.scope.onRequestsCompleted(_f);
}
},onRequestCompleted:function(_10){
if(this.scope&&this.scope.onRequestCompleted){
return this.scope.onRequestCompleted(_10);
}
return false;
}});
}


;if(!dojo._hasResource["lconn.files.action.impl.MoveToCollection"]){
dojo._hasResource["lconn.files.action.impl.MoveToCollection"]=true;
dojo.provide("lconn.files.action.impl.MoveToCollection");




dojo.requireLocalization("lconn.files","action");
dojo.declare("lconn.files.action.impl.MoveToCollection",[lconn.files.action.impl.AddToCollection],{wDialog:"660px",constructor:function(_1,_2,_3){
this.app=_1;
this.net=_1.net;
this.nls=dojo.i18n.getLocalization("lconn.files","action").MOVE_TO_COLLECTION;
if(_3){
dojo.mixin(this,_3);
}
},execute:function(_4,_5,e){
var _6=dojo.hitch(this,this.getInherited(arguments),_4,_5,e);
var _7=this.app;
var _8=_7.authenticatedUser;
var _9=_7.routes.getFileCollectionsListServiceUrl(_8.id,_4.getId(),{type:"community",format:"json",includeSubCollections:true});
var _a=new lconn.share.util.AsyncLoader({net:this.app.net});
_a.add(_9,dojo.hitch(this,function(_b,_c,_d){
this.folderResponse=_c;
this.folderIoArgs=_d;
_b();
},_6),"json");
_a.start();
},createDialog:function(_e,_f,_10){
dojo.mixin(_f,{breadcrumbPrefix:this.app.nls.COLLECTION_PICKER.BREADCRUMB.PREFIX.MOVE_TO,btnOk:this.nls.OK_MOVE_HERE});
this.handleFolders(_e,_f,_10,this.folderResponse,this.folderIoArgs);
},handleFolders:function(_11,opt,_12,_13,_14){
if(!_13||_13 instanceof Error){
console.log("error occurred when load the document feed");
this.renderContent(_11,opt,_12);
}else{
var _15=this.selectedFolder=_13.items[0];
opt=opt||{};
opt.initPickerParams={"thisCommunity":{desp:dojo.string.substitute(this.nls.HINT,[_11.getName(),_15.title])}};
opt.selectedItems={};
opt.selectedItems[_15.id]=true;
opt.keepSelected=true;
this.renderContent(_11,opt,_12);
}
if(_12.closeIconNode){
dijit.focus(_12.closeIconNode);
}
},getSubmitEnablement:function(_16){
var _17=this._getSelectionsInPicker(_16.picker);
if(_17.length>0){
if(this.selectedFolder){
var _18=this.selectedFolder.id;
return _17[0].getId()!=_18;
}
}
return false;
},setSubmitButtonEnabled:function(_19,_1a){
this.inherited(arguments);
if(_1a){
dojo.removeAttr(_19.saveNode,"disabled");
}else{
dojo.attr(_19.saveNode,"disabled","disabled");
}
}});
}

if(typeof define!=="undefined"&&typeof define._packages!=="undefined")define._packages["lconn.files.comm"]=true;

;if(!dojo._hasResource["lconn.files.comm.Routes"]){
dojo._hasResource["lconn.files.comm.Routes"]=true;
dojo.provide("lconn.files.comm.Routes");










dojo.declare("lconn.files.comm.Routes",[lconn.files.FilesServiceRoutes],{cmisParams:{sI:"skipCount",sK:"orderBy",pageSize:"maxItems",acls:"includeAllowableActions",collectionAcls:"includeAllowableActions",includeViaResource:"includeViaResource",zeroItem:0,asc:"ASC",dsc:"DESC"},cmisCollectionColumns:{added:"cmis:creationDate",title:"cmis:name",label:"cmis:name",length:"cmis:contentStreamLength",created:"cmis:creationDate",modified:"cmis:lastModificationDate",updated:"cmis:lastModificationDate",commented:"snx:commentCount",recommended:"snx:recommendationsCount",downloaded:"snx:downloadCount"},constructor:function(_1){
dojo.mixin(this,_1);
if(this.apiType=="cmis"){
this.apiParams=this.cmisParams;
}
if(this.basePath&&this.basePath.charAt(this.basePath.length-1)!="/"){
this.basePath+="/";
}
this._app=this.basePath+"app";
this.maxTagFilters=dojo.getObject("lconn.files.config.services.maxTagFilters")||3;
},getMyServiceDoc:function(_2){
return this._getSB("my/servicedoc",_2);
},getFragment:function(p){
var s=this.getQueryString(p);
return s.length>0?("#"+s.substring(1)):"";
},getListUrl:function(_3){
var p={};
if(_3){
var _4=this.maxTagFilters;
if(_3.page&&_3.page>1){
p.page=_3.page;
}
if(_3.sort&&_3.sort!="updated"){
p.sort=_3.sort;
}
if(_3.sortReversed){
p.reverse="1";
}
if(_3.pivot){
p.pivot=_3.pivot;
}
if(_3.section){
p.section=_3.section;
}
if(_3.tag){
if(dojo.isArray(_3.tag)&&_3.tag.length>_4&&_4>=1){
p.tag=_3.tag.slice(0,_4-1).concat([_3.tag[_3.tag.length-1]]);
}else{
p.tag=_3.tag;
}
}
}
return this._comUri+this.getFragment(p);
},getCommCollectionUrl:function(_5,_6){
var p={};
if(_6){
var _7=this.maxTagFilters;
if(_6.page&&_6.page>1){
p.page=_6.page;
}
if(_6.sort&&_6.sort!="updated"){
p.sort=_6.sort;
}
if(_6.sortReversed){
p.reverse="1";
}
if(_6.pivot){
p.pivot=_6.pivot;
}
if(_6.section){
p.section=_6.section;
}
if(_6.tag){
if(dojo.isArray(_6.tag)&&_6.tag.length>_7&&_7>=1){
p.tag=_6.tag.slice(0,_7-1).concat([_6.tag[_6.tag.length-1]]);
}else{
p.tag=_6.tag;
}
}
}
p.folder=_5;
return this._comUri+this.getFragment(p);
},getCommonResourceUrl:function(){
return this._comPath+"/nav/common/";
},getHelpTopicUrl:function(_8){
var p={topic:_8};
return this._static+"service/tip"+this.getQueryString(p);
},getUrlToUser:function(_9,_a){
if(dojo.isArray(_9)){
_9=_9[0];
}
var _b=(typeof _9=="object")?_9.id:_9;
if(dojo.getObject("lconn.core.config.services")){
var _c=lconn.core.config.services.profiles;
if(_c){
var _d=com.ibm.oneui.util.Url.secure;
var _e=com.ibm.social.incontext.util.url;
var _f=lconn.core.url.getServiceUrl(_c,_d).uri;
return _e.rewrite(_f+"/html/profileView.do",{userid:_b});
}
}
return this.getUserChannelUrl(_b,_a);
},getCookiePath:function(){
return this._app;
},getAppPath:function(){
return this._app;
},getUserChannelUrl:function(_10,opt){
if(this._userChannelUrlTemplate){
return this._userChannelUrlTemplate.replace(/\{userId\}/g,encodeURIComponent(_10));
}
var _11=this._app+"/person/"+encodeURIComponent(_10);
var p={};
if(opt){
var _12=this.maxTagFilters;
if(opt.type){
p.type=opt.type;
}
if(opt.page&&opt.page>1){
p.page=opt.page;
}
if(opt.sort&&opt.sort!="updated"){
p.sort=opt.sort;
}
if(opt.sortReversed){
p.reverse="1";
}
if(opt.search){
p.search=opt.search;
}
if(dojo.indexOf(["public","private","shared"],opt.sharing)!=-1){
p.sharing=opt.sharing;
}
if(opt.tag){
if(dojo.isArray(opt.tag)&&opt.tag.length>_12&&_12>=1){
p.tag=opt.tag.slice(0,_12-1).concat([opt.tag[opt.tag.length-1]]);
}else{
p.tag=opt.tag;
}
}
if(opt.date){
p.date=opt.date;
}
}
return _11+this.getQueryString(p);
},getWelcomeUrl:function(){
return this._comUri+this.getFragment({});
},_getUserChannelUrlTemplate:function(_13){
if(this._userChannelUrlTemplate){
return this._userChannelUrlTemplate;
}
return this.basePath+"app/person/"+_13;
},getFilesResourceUrl:function(){
return this.basePath;
},generateFileTypeImage:function(img,_14,_15){
_15=_15||16;
_14=_14.toLowerCase().replace(/[^a-z0-9]/g,"-");
var _16;
if(_15==16){
_16=this._fileTypeClassName16;
}else{
if(_15==32){
_16=this._fileTypeClassName32;
}else{
if(_15==64){
_16=this._fileTypeClassName64;
}
}
}
_16=_16||"lconn-ftype{size} lconn-ftype{size}-{ext}";
var _17=_16.replace(/\{size\}/g,_15).replace(/\{ext\}/g,_14);
img.src=dojo.config.blankGif;
img.className=_17;
img.width=img.height=_15;
},getCommunityLibraryListServiceUrl:function(_18,opt){
var url=this._getSB("communitylibrary/{communityId}/feed",opt);
url=url.replace("{communityId}",encodeURIComponent(this._cId));
var p=this._getListOptions(opt);
if(opt){
if(opt.fetchAcl){
p.acls=true;
}
if(opt.title){
p.title=opt.title;
}
}
return url+lconn.share.util.uri.writeParameters(p);
},getCommunityLibraryEntryUrl:function(_19,opt){
var url=this._getSB("communitylibrary/{communityId}/entry",opt);
url=url.replace("{communityId}",encodeURIComponent(this._cId));
var p={};
if(opt){
if(opt.fetchAcl){
p.acls=true;
}
}
return url+lconn.share.util.uri.writeParameters(p);
},getCommunityDeletedFileListServiceUrl:function(_1a,_1b,opt){
var url=this._getSB(this._deletedFilesFeedUrl,opt);
url=url.replace(/\{(communityId|resourceId)\}/g,encodeURIComponent(_1a)).replace(/\{widgetId\}/g,encodeURIComponent(_1b));
var _1c=this.apiType=="cmis";
var pN=this.apiParams;
if(_1c){
opt.apiSortKeys=this.cmisCollectionColumns;
opt.apiParams=pN=this.cmisParams;
}
var p=this._getListOptions(opt);
if(opt){
if(pN.acls&&opt.fetchAcl){
p[pN.acls]=true;
}
if(pN.collectionAcls&&opt.collectionAcls){
if(pN.includeViaResource){
p[pN.includeViaResource]=true;
}
p[pN.collectionAcls]=true;
}
if(pN.libraryAcls&&opt.libraryAcls){
if(pN.includeViaResource){
p[pN.includeViaResource]=true;
}
p[pN.libraryAcls]=true;
}
if(!_1c){
if(dojo.indexOf(["public","private"],opt.visibility)!=-1){
p.visibility=opt.visibility;
}
if(opt.tag){
p.tag=opt.tag;
}
if(opt.category){
p.category=opt.category;
}
if(opt.fileId){
p.itemId=opt.fileId;
}
if(opt.startDate){
p.dF=opt.startDate;
}
if(opt.itemId){
p.itemId=opt.itemId;
}
if(opt.type){
p.type=opt.type;
}
if(opt.reloadAcl){
p.syncCommunityMembershipCache=true;
}
}
}
return url+lconn.share.util.uri.writeParameters(p);
},getCommunityCollectionsListServiceUrl:function(_1d,_1e,opt){
var url=this._getSB(this._sharedFoldersFeedUrl,opt);
url=url.replace(/\{(communityId|resourceId)\}/g,encodeURIComponent(_1d)).replace(/\{widgetId\}/g,encodeURIComponent(_1e));
var pN=this.apiParams;
if(this.apiType=="cmis"){
opt.apiSortKeys=this.cmisCollectionColumns;
opt.apiParams=pN=this.cmisParams;
}
var p=this._getListOptions(opt);
if(this.apiType!="cmis"){
p.sharedWithCommunity=_1d;
}
if(opt){
if(pN.acls&&opt.fetchAcl){
p[pN.acls]=true;
}
if(pN.collectionAcls&&opt.collectionAcls){
if(pN.includeViaResource){
p[pN.includeViaResource]=true;
}
p[pN.collectionAcls]=true;
}
if(pN.libraryAcls&&opt.libraryAcls){
if(pN.includeViaResource){
p[pN.includeViaResource]=true;
}
p[pN.libraryAcls]=true;
}
}
return url+lconn.share.util.uri.writeParameters(p);
},getCommunityCollectionRoleServiceUrl:function(_1f,_20,opt){
var url=this._getSB("collection/{collectionId}/members/{memberId}",opt);
url=url.replace("{collectionId}",encodeURIComponent(opt.collectionId));
var _21=("owners"==opt.role?"owners":"members");
url=url.replace("{memberId}",encodeURIComponent(_21+"@"+this._cId));
return url;
},getCommunityCollectionListDownloadUrl:function(_22,_23,opt){
var url=this._getSB(this._sharedDownloadUrl,opt);
url=url.replace("{zipName}",encodeURIComponent(opt.zipName||"files.zip"));
url=url.replace(/\{(communityId|resourceId)\}/g,encodeURIComponent(_22)).replace(/\{widgetId\}/g,encodeURIComponent(_23));
var p=this._getDownloadOptions(opt);
if(opt.created){
p.created=opt.created;
}
if(opt.added){
p.added=opt.added;
}
if(opt.addedBy){
p.addedBy=opt.addedBy;
}
if(opt.category){
p.category=opt.category;
}
if(opt.type){
p.type=opt.type;
}
return url+lconn.share.util.uri.writeParameters(p);
},getCommunityCollectionListServiceUrl:function(_24,_25,opt){
var url=this._getSB(this._sharedFeedUrl,opt);
url=url.replace(/\{(communityId|resourceId)\}/g,encodeURIComponent(_24)).replace(/\{widgetId\}/g,encodeURIComponent(_25));
var _26=this.apiType=="cmis";
var pN=this.apiParams;
if(_26){
opt.apiSortKeys=this.cmisCollectionColumns;
opt.apiParams=pN=this.cmisParams;
}
var p=this._getListOptions(opt);
if(opt){
if(pN.acls&&opt.fetchAcl){
p[pN.acls]=true;
}
if(pN.collectionAcls&&opt.collectionAcls){
if(pN.includeViaResource){
p[pN.includeViaResource]=true;
}
p[pN.collectionAcls]=true;
}
if(pN.libraryAcls&&opt.libraryAcls){
if(pN.includeViaResource){
p[pN.includeViaResource]=true;
}
p[pN.libraryAcls]=true;
}
if(!_26){
if(dojo.indexOf(["public","private"],opt.visibility)!=-1){
p.visibility=opt.visibility;
}
if(opt.tag){
p.tag=opt.tag;
}
if(opt.category){
p.category=opt.category;
}
if(opt.fileId){
p.itemId=opt.fileId;
}
if(opt.startDate){
p.dF=opt.startDate;
}
if(opt.itemId){
p.itemId=opt.itemId;
}
if(opt.type){
p.type=opt.type;
}
if(opt.reloadAcl){
p.syncCommunityMembershipCache=true;
}
if(opt.category){
p.category=opt.category;
}
if(opt.type){
p.type=opt.type;
}
if(opt.sK){
p.sK=opt.sK;
}
if(opt.sO){
p.sO=opt.sO;
}
if(opt.sC){
p.sC=opt.sC;
}
}
}
return url+lconn.share.util.uri.writeParameters(p);
},getFileCollectionsListServiceUrl:function(_27,_28,opt){
if(this.restrictUserInComm){
if(opt&&opt.isPersonalFilesInCommunity){
return this.inherited(arguments);
}
}
var url=(_27)?this._getUSB(_27,"userlibrary/{userId}/document/{fileId}/collections/feed","myuserlibrary/document/{fileId}/collections/feed",opt):this._getSB("document/{fileId}/collections/feed",opt);
var url=this._getSB("communitylibrary/{communityId}/document/{fileId}/collections/feed",opt);
url=url.replace("{communityId}",encodeURIComponent(this._cId));
url=url.replace("{fileId}",encodeURIComponent(_28));
var p={};
if(opt){
if(typeof opt.format!="undefined"){
p.format=opt.format;
}
if(opt.access&&{none:1,view:1}[opt.access]){
p.access=opt.access;
}
if(opt.type){
p.type=opt.type;
}
if(opt.includeSubCollections){
p.includeSubCollections=opt.includeSubCollections;
}
}
if(dojo.isIE){
p.format=p.format||"xml";
}
return url+lconn.share.util.uri.writeParameters(p);
},getUserSharesUrl:function(opt){
var _29=this._app+"/shares";
var p={};
if(opt){
var _2a=this.maxTagFilters;
if(opt.type){
p.type=opt.type;
}
if(dojo.indexOf(["withme","byme"],opt.pivot)!=-1){
p.pivot=opt.pivot;
}
if(opt.page&&opt.page>1){
p.page=opt.page;
}
if(opt.sort&&opt.sort!="sharedAt"){
p.sort=opt.sort;
}
if(opt.sortReversed){
p.reverse="1";
}
if(opt.search){
p.search=opt.search;
}
if(dojo.indexOf(["public","private","shared"],opt.sharing)!=-1){
p.sharing=opt.sharing;
}
if(dojo.indexOf(["view","edit"],opt.sharePermission)!=-1){
p.sharePermission=opt.sharePermission;
}
if(opt.tag){
if(dojo.isArray(opt.tag)&&opt.tag.length>_2a&&_2a>=1){
p.tag=opt.tag.slice(0,_2a-1).concat([opt.tag[opt.tag.length-1]]);
}else{
p.tag=opt.tag;
}
}
if(opt.date){
p.date=opt.date;
}
if(opt.byuser&&opt.byuser.id){
p.byuser=opt.byuser.id;
if(opt.byuser.name){
p.byusername=opt.byuser.name;
}
}
}
return _29+this.getQueryString(p);
},getPublicFilesUrl:function(opt){
var _2b=this._app+"/public";
var p={};
if(opt){
var _2c=this.maxTagFilters;
if(opt.type){
p.type=opt.type;
}
if(opt.page&&opt.page>1){
p.page=opt.page;
}
if(opt.sort&&opt.sort!="added"){
p.sort=opt.sort;
}
if(opt.sortReversed){
p.reverse="1";
}
if(opt.search){
p.search=opt.search;
}
if(opt.tag){
if(dojo.isArray(opt.tag)&&opt.tag.length>_2c&&_2c>=1){
p.tag=opt.tag.slice(0,_2c-1).concat([opt.tag[opt.tag.length-1]]);
}else{
p.tag=opt.tag;
}
}
if(opt.date){
p.date=opt.date;
}
}
return _2b+this.getQueryString(p);
},getFileSummaryUrl:function(_2d,_2e,opt){
if(this.restrictUserInComm){
if(opt&&opt.isPersonalFilesInCommunity){
opt={};
return this.inherited(arguments);
}
}
var p=opt?dojo.clone(opt):{};
p.file=_2e;
return this._comUri+this.getFragment(p);
},getCollectionSummaryUrl:function(_2f,_30,opt){
var p=opt?dojo.clone(opt):{};
p.folder=_30;
return this._comUri+this.getFragment(p);
},getCommentListServiceUrl:function(_31,_32,opt){
if(this.restrictUserInComm){
if(opt&&opt.isPersonalFilesInCommunity){
return this.inherited(arguments);
}
}
var url=this._getSB("communitylibrary/{communityId}/document/{fileId}/feed",opt);
url=url.replace("{communityId}",encodeURIComponent(this._cId));
url=url.replace("{fileId}",encodeURIComponent(_32));
var p={};
if(opt){
if(opt.fetchAcl){
p.acls=true;
}
if(opt.pageSize){
p.pageSize=opt.pageSize;
}
if(opt.page){
p.page=opt.page;
}else{
if(opt.start){
p.sI=opt.start;
}
}
if(opt.sortKey){
p.sK=opt.sortKey;
p.sO=opt.sortDescending?"dsc":"asc";
}
if(opt.category){
p.category=opt.category;
}
if(opt.fileType){
p.fileType=opt.fileType;
}
if(typeof opt.format!="undefined"){
p.format=opt.format;
}
}
if(dojo.isIE){
p.format=p.format||"xml";
}
if(opt.contentFormat){
p.contentFormat=opt.contentFormat;
}
return url+lconn.share.util.uri.writeParameters(p);
},_getPersonRoot:function(_33){
return this._app+"/person/"+encodeURIComponent(_33);
},getCommunityTaggedMediaUrl:function(tag,opt){
var p=opt?dojo.clone(opt):{};
p.tag=(tag)?[tag]:null;
p.pivot=p.pivot||"all";
return this.getListUrl(p);
},getLibraryEntryServiceUrl:function(_34,opt){
var url=this._getSB("communitylibrary/{communityId}/entry",opt);
url=url.replace("{communityId}",encodeURIComponent(this._cId));
var p={};
if(dojo.isIE){
p.format="xml";
}
return url+lconn.share.util.uri.writeParameters(p);
},setNonceServiceUrl:function(url){
this._nonceServiceUrl=url;
},getNonceServiceUrl:function(){
return this._nonceServiceUrl||this._getSB("nonce");
},getCollectionUrl:function(id,opt){
var _35=this._comUri+"#fullpageWidgetId="+this._wId;
var p={};
p.folder=encodeURIComponent(id);
if(opt){
var _36=this.maxTagFilters;
if(opt.page&&opt.page>1){
p.page=opt.page;
}
if(opt.sort){
p.sort=opt.sort;
}
if(opt.sortReversed){
p.reverse="1";
}
if(opt.section){
p.section=opt.section;
}
if(opt.tag){
if(dojo.isArray(opt.tag)&&opt.tag.length>_36&&_36>=1){
p.tag=opt.tag.slice(0,_36-1).concat([opt.tag[opt.tag.length-1]]);
}else{
p.tag=opt.tag;
}
}
if(dojo.indexOf(["public","private","shared"],opt.sharing)!=-1){
p.sharing=opt.sharing;
}
if(opt.date){
p.date=opt.date;
}
if(opt.type){
p.type=opt.type;
}
}
return _35+"&"+lconn.share.util.uri.writeParameters(p).substring(1);
},getCollectionsUrl:function(opt){
var _37=this._app+"/collections";
var p={};
if(opt){
if(dojo.indexOf(["personal","shared","public"],opt.pivot)!=-1){
_37+="/"+opt.pivot;
}
if(opt.page&&opt.page>1){
p.page=opt.page;
}
if(opt.sort){
p.sort=opt.sort;
}
if(opt.sortReversed){
p.reverse="1";
}
if(dojo.indexOf(["public","shared","private"],opt.type)!=-1){
p.type=opt.type;
}
if(opt.date){
p.date=opt.date;
}
if(opt.permission){
p.permission=opt.permission;
}
if(opt.name){
p.name=opt.name;
}
if(opt.byuser&&opt.byuser.id){
p.byuser=opt.byuser.id;
if(opt.byuser.name){
p.byusername=opt.byuser.name;
}
}
}
return _37+this.getQueryString(p);
},getVersionListServiceUrl:function(_38,_39,opt){
if(this.restrictUserInComm){
if(opt&&opt.isPersonalFilesInCommunity){
return this.inherited(arguments);
}
}
var url=this._getUSB(_38,"userlibrary/{userId}/document/{fileId}/feed","myuserlibrary/document/{fileId}/feed",opt);
url=this._getSB("communitylibrary/{communityId}/document/{fileId}/feed");
url=url.replace("{communityId}",encodeURIComponent(this._cId));
url=url.replace("{fileId}",encodeURIComponent(_39));
var p={category:"version"};
if(opt){
if(opt.page){
p.page=opt.page;
}else{
if(opt.start){
p.sI=opt.start;
}
}
if(opt.pageSize){
p.pageSize=opt.pageSize;
}
if(opt.category){
p.category=opt.category;
}
if(typeof opt.format!="undefined"){
p.format=opt.format;
}
if(opt.deleteFrom){
p.deleteFrom=opt.deleteFrom;
}
if(opt.fetchAcl){
p.acls=true;
}
}
if(dojo.isIE){
p.format=p.format||"xml";
}
return url+lconn.share.util.uri.writeParameters(p);
},getCommunityLibraryRolesListServiceUrl:function(_3a,opt){
var url=this._getSB("communitylibrary/{communityId}/roles",opt);
url=url.replace("{communityId}",encodeURIComponent(_3a));
var p={};
if(opt){
if(opt.includeMembers){
p["resolve-membership"]=true;
}
}
if(dojo.isIE){
p.format=p.format||"xml";
}
return url+lconn.share.util.uri.writeParameters(p);
},getCommunityLibraryRoleMemberListServiceUrl:function(_3b,_3c,opt){
var url=this._getSB("communitylibrary/{communityId}/roles/{roleId}/members",opt);
url=url.replace("{communityId}",encodeURIComponent(_3b));
url=url.replace("{roleId}",encodeURIComponent(_3c));
var p={};
if(dojo.isIE){
p.format=p.format||"xml";
}
return url+lconn.share.util.uri.writeParameters(p);
},getCommunityCollectionRolesListServiceUrl:function(_3d,_3e,opt){
var url=this._getSB("communitycollection/{communityId}/roles",opt);
url=url.replace("{communityId}",encodeURIComponent(_3d));
var p={};
if(opt){
if(opt.includeMembers){
p["resolve-membership"]=true;
}
}
if(dojo.isIE){
p.format=p.format||"xml";
}
return url+lconn.share.util.uri.writeParameters(p);
},getCommunityCollectionRoleMemberListServiceUrl:function(_3f,_40,_41,opt){
var url=this._getSB("communitycollection/{communityId}/roles/{roleId}/members",opt);
url=url.replace("{communityId}",encodeURIComponent(_3f));
url=url.replace("{roleId}",encodeURIComponent(_41));
var p={};
if(dojo.isIE){
p.format=p.format||"xml";
}
return url+lconn.share.util.uri.writeParameters(p);
},getFileListDownloadUrl:function(_42,opt){
if(_42){
var url=this._getUSB(_42,"userlibrary/{userId}/media/{zipName}","myuserlibrary/media/{zipName}",opt);
}else{
var url=this._getSB("communitylibrary/{communityId}/media/{zipName}",opt);
url=url.replace("{communityId}",this._cId);
}
url=url.replace("{zipName}",encodeURIComponent(opt.zipName||"files.zip"));
var p=this._getDownloadOptions(opt);
if(opt.title){
p.title=opt.name;
}
if(dojo.indexOf(["public","shared","private"],opt.visibility)!=-1){
p.visibility=opt.visibility;
}
if(p.visibility!="public"&&dojo.indexOf(["true","false"],opt.shared)!=-1){
p.shared=opt.shared;
}
if(opt.fileType){
p.fileType=opt.fileType;
}
if(opt.favorites){
p.onlyFavorite=opt.favorites=="true";
}
return url+lconn.share.util.uri.writeParameters(p);
},getFileListServiceUrl:function(_43,opt){
if(_43){
var url=this._getUSB(_43,"userlibrary/{userId}/feed","myuserlibrary/feed",opt);
}else{
var url=this._getSB("communitylibrary/{communityId}/feed",opt);
url=url.replace("{communityId}",this._cId);
}
var p=this._getListOptions(opt);
if(opt){
if(opt.fetchAcl){
p.acls=true;
}
if(opt.search){
p.search=opt.search;
}
if(opt.tag){
if(typeof opt.tag=="string"){
p.tag=[opt.tag];
}else{
p.tag=opt.tag;
}
}
if(opt.sharing=="withme"){
p.direction="inbound";
}else{
if(opt.sharing=="byme"){
p.direction="outbound";
}
}
if(opt.visibility=="public"){
p.visibility=opt.visibility;
}else{
if(opt.visibility=="private"){
p.visibility="private";
p.shared=false;
}else{
if(opt.visibility=="shared"){
p.visibility="private";
p.shared=true;
}
}
}
if(dojo.indexOf(["view","edit"],opt.sharePermission)!=-1){
p.sharePermission=opt.sharePermission;
}
if(opt.startDate){
p.dF=opt.startDate;
}
if(opt.notification===true||opt.notification=="on"){
p.notification="on";
}else{
if(opt.notification===false||opt.notification=="off"){
p.notification="off";
}
}
if(opt.includeQuota){
p.includeQuota=true;
}
if(opt.category){
p.category=opt.category;
}
if(opt.fileType){
p.fileType=opt.fileType;
}
if(typeof opt.format!="undefined"){
p.format=opt.format;
}
if(opt.createVersion){
p.createVersion=true;
}
if(opt.source){
p.source=opt.source;
}
if(opt.draft){
p.draft=opt.draft;
}
if(opt.title){
p.title=opt.title;
}
}
if(dojo.isIE){
p.format=p.format||"xml";
}
return url+lconn.share.util.uri.writeParameters(p);
},getFileDownloadInfoServiceUrl:function(_44,_45,opt){
if(this.restrictUserInComm){
if(opt&&opt.isPersonalFilesInCommunity){
return this.inherited(arguments);
}
}
var url=this._getSB("communitylibrary/{communityId}/document/{fileId}/downloadedby/feed",opt);
url=url.replace("{fileId}",encodeURIComponent(_45));
url=url.replace("{communityId}",encodeURIComponent(this._cId));
var p=this._getListOptions(opt);
p.format="json";
return url+lconn.share.util.uri.writeParameters(p);
},getBasePath:function(){
return this.basePath;
},getBaseCommPath:function(){
return this._comPath;
}});
lconn.files.comm.Routes.forIWidget=function(_46){
var _47=_46.getiWidgetAttributes();
var _48=window.location;
var _49=_48.pathname;
var _4a=dojo.getObject("lconn.share.config.formattingLanguageParam")||dojo.getObject("djConfig.locale")||"en";
var _4b=_47.getItemValue("filesRoot");
var _4c=_46.io.rewriteURI(_4b);
if(_4c.indexOf("/")==0){
_4c=_48.protocol+"//"+_48.host+_4c;
}
var _4d=_47.getItemValue("contextRoot");
var _4e=_47.getItemValue("resourceId");
var _4f=new lconn.files.comm.Routes({restrictUserInComm:!!dojo.getObject("lconn.files.config.communityFiles.restrictUserInComm"),lang:_4a,globalParameters:{fullpageWidgetId:_46.widgetId},basePath:_4b,proxyBasePath:_4c,_basic:_4c+(_47.getItemValue("basicSvc")||"/basic/api/"),_basicAnon:_4c+(_47.getItemValue("basicAnonSvc")||"/basic/anonymous/api/"),_form:_4c+(_47.getItemValue("formSvc")||"/form/api/"),_formAnon:_4c+(_47.getItemValue("formAnonSvc")||"/form/anonymous/api/"),_comPath:_4d,_comUri:_49+window.location.search,_static:_47.getItemValue("staticLanguageRoot"),apiType:_47.getItemValue("apiType"),_userChannelUrlTemplate:_47.getItemValue("userLink.url")||"",_sharedFeedUrl:_47.getItemValue("sharedFeedUrl")||"communitycollection/{resourceId}/feed",_sharedFoldersFeedUrl:_47.getItemValue("sharedFoldersFeedUrl")||"collections/feed",_deletedFilesFeedUrl:_47.getItemValue("deletedFilesFeedUrl")||"communitylibrary/{resourceId}/view/recyclebin/feed",_sharedDownloadUrl:_47.getItemValue("sharedDownloadUrl")||"communitycollection/{resourceId}/media/{zipName}",_wId:_46.widgetId,_cId:_4e,_fileTypeClassName16:_47.getItemValue("fileTypeIcon.className16")||"",_fileTypeClassName32:_47.getItemValue("fileTypeIcon.className32")||"",_fileTypeClassName64:_47.getItemValue("fileTypeIcon.className64")||""});
_4f.getAuthenticatedUser=function(){
var _50=_46.getUserProfile();
if(_50){
var id=_50.getItemValue("userId");
if(id){
return {id:id};
}
}
};
return _4f;
};
}


window['_js_modules']=(window['_js_modules']||[]).concat(["lconn.files.action.impl.AddToCollection","lconn.files.action.impl.CopyFile","lconn.files.action.impl.MoveToCollection","lconn.files.comm.Routes"]);
