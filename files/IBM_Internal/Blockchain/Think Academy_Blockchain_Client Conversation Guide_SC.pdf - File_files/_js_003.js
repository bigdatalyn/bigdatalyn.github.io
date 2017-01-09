
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


;if(!dojo._hasResource["lconn.files.util.DataStore"]){
dojo._hasResource["lconn.files.util.DataStore"]=true;
dojo.provide("lconn.files.util.DataStore");
dojo.declare("lconn.files.util.DataStore",null,{constructor:function(_1,_2){
this.queryParam=(_1.queryParam?_1.queryParam:_2.getAttribute("queryParam"));
this.url=_1.url;
this.getUrl=_1.getUrl;
this.net=_1.net;
this.cache={};
},queryParam:"",clear:function(){
this.cache={};
},fetch:function(_3){
var _4={};
var _5=this.cache;
var _6=_3.queryOptions.libraryId;
var _7=_3.queryOptions.userLibrary;
var _8=this._getCacheKey(_3);
if(_5[_8]){
_3.onComplete(_5[_8],_3);
return _3;
}
var _4=this._getParams(_3);
this.getJson(_3,_4,_5,_8);
return _3;
},getJson:function(_9,_a,_b,_c){
var _d=this.getUrl(_a);
this.net.getJson({url:_d,noStatus:true,background:true,auth:{preventLogin:true},handle:dojo.hitch(this,this.handleResponse,_9,_b,_c,_a)});
},handleResponse:function(_e,_f,_10,_11,_12,_13){
if(_12 instanceof Error){
if(_e.onError){
_e.onError();
}else{
console.log(_12);
}
}else{
var _14=this._getResponseItems(_12,_e,_11);
_f[_10]=_14;
if(_e.onComplete){
_e.onComplete(_14,_e);
}
}
},_getResponseItems:function(_15,_16,_17){
return _15.items;
},_getCacheKey:function(_18){
return (_18.key||"")+"\n"+(_18.order||"")+"\n"+(_18.count||"")+"\n"+(_18.start||"")+"\n"+(_18.query||"").toLowerCase();
},_getParams:function(_19){
var _1a={};
if(this.queryParam&&_19.query){
_1a[this.queryParam]=_19.query;
}
if(_19.start){
_1a.start=_19.start+1;
}
if(_19.count&&_19.count!=Infinity){
_1a.pageSize=_19.count+1;
}
return _1a;
},getValue:function(_1b,_1c,_1d){
if(_1b[_1c]){
return _1b[_1c];
}else{
return _1d;
}
},getUrl:function(){
return this.url;
}});
}


;if(!dojo._hasResource["lconn.files.util.CommunityDataStore"]){
dojo._hasResource["lconn.files.util.CommunityDataStore"]=true;
dojo.provide("lconn.files.util.CommunityDataStore");


dojo.declare("lconn.files.util.CommunityDataStore",[lconn.files.util.DataStore],{_getCacheKey:function(_1){
var _2=this.inherited(arguments)+"\n"+(_1.queryOptions.communityType||"")+"\n{internalOnly="+(_1.queryOptions.internalOnly||"false")+"}";
return _2;
},_getParams:function(_3){
var _4=this.inherited(arguments);
_4.communityType=_3.queryOptions.communityType;
_4.orgId=_3.queryOptions.orgId;
_4.internalOnly=_3.queryOptions.internalOnly;
return _4;
},_getResponseItems:function(_5,_6){
var _7=_5.entry||[];
return _7;
}});
}


;if(!dojo._hasResource["lconn.files.AbstractApp"]){
dojo._hasResource["lconn.files.AbstractApp"]=true;
dojo.provide("lconn.files.AbstractApp");




dojo.declare("lconn.files.AbstractApp",[lconn.share.AbstractApp],{getCommunityTypeAheadStore:function(){
var s=this.stores.community;
if(!s){
var _1=dojo.getObject("lconn.share.config.services.communitySearch")||{};
s=this.stores.community=new lconn.files.util.CommunityDataStore({net:this.net,getUrl:dojo.hitch(this.routes,"getCommunitiesListServiceUrl"),queryParam:"name",maxResults:_1.maxResults,pageSize:_1.pageSize});
}
return s;
},_endScene:function(_2){
var s=this.scene;
if(s&&s.end){
try{
lconn.share.scenehelper.moveLotusFooter();
this.inherited(arguments);
}
catch(e){
console.error(e);
}
}
}});
}


;if(!dojo._hasResource["lconn.files.FilesFullScreenApp"]){
dojo._hasResource["lconn.files.FilesFullScreenApp"]=true;
dojo.provide("lconn.files.FilesFullScreenApp");




dojo.declare("lconn.files.FilesFullScreenApp",[lconn.share.FullScreenApp,lconn.files.AbstractApp],{});
}


;if(!dojo._hasResource["lconn.files.util.Preferences"]){
dojo._hasResource["lconn.files.util.Preferences"]=true;
dojo.provide("lconn.files.util.Preferences");
dojo.declare("lconn.files.util.Preferences",null,{name:"qpfs",expiration:40*1000*60*60*24,path:"/",constructor:function(_1){
dojo.mixin(this,_1);
this._init();
},get:function(_2){
return this.prefs[_2];
},put:function(_3,_4){
if(typeof _4=="undefined"||_4==null){
delete this.prefs[_3];
}else{
this.prefs[_3]=_4;
}
this._store(_3);
},_init:function(){
var _5=dojo.cookie(this.name);
try{
this.prefs=dojo.fromJson(_5);
}
catch(e){
}
this.prefs=this.prefs||{};
},_store:function(_6){
dojo.cookie(this.name,dojo.toJson(this.prefs),{expires:30});
},reset:function(){
this.prefs={};
dojo.cookie(this.name,"",{expires:30,path:this.path});
}});
}


;if(!dojo._hasResource["lconn.files.PersonalPreferences"]){
dojo._hasResource["lconn.files.PersonalPreferences"]=true;
dojo.provide("lconn.files.PersonalPreferences");




dojo.declare("lconn.files.PersonalPreferences",[lconn.files.util.Preferences],{_viewS2U:{"Details":"details","Summary":"summary","Grid":"grid"},_viewU2S:{"summary":"Summary","details":"Details","grid":"Grid"},getDefaultColumns:function(_1){
var _2=this.get("list.columns.files");
if(!_2&&this.isAuthenticated()){
var _3=this.getUserPreferences().preferredColumns;
_2=this.deserializeColumns(_3);
}
return _2||_1;
},setDefaultColumns:function(_4){
this.put("list.columns.files",_4);
if(this.isAuthenticated()){
var _5=this.serializeColumns(_4);
this.setUserPreference("preferredColumns",_5);
}
},getDefaultView:function(){
var vw=this.isAuthenticated()?this._viewS2U[this.getUserPreferences().defaultView]:this.get("vw");
return vw;
},setDefaultView:function(_6){
if(this.isAuthenticated()){
var _7=this._viewU2S[_6];
this.setUserPreference("defaultView",_7);
}
this.put("vw",_6);
},getListPageSize:function(){
var i=this.isAuthenticated()?this.getUserPreferences().pageSize:this.get("itemsPerPage");
return (i>0?i:10);
},setListPageSize:function(_8){
if(this.isAuthenticated()){
this.setUserPreference("pageSize",_8);
}
this.put("itemsPerPage",_8);
},hideWelcome:function(){
this.put("nw",true);
},isAuthenticated:function(){
return false;
},getUserPreferences:function(){
return {};
},getColumnMappings:function(){
return {};
},persistedKeys:["nw","zipenc"],_store:function(_9){
var _a=this.persistedKeys;
if(dojo.indexOf(_a,_9)!=-1){
var p={};
for(var i=0,l=_a.length;i<l;i++){
var _b=_a[i];
var _c=this.prefs[_b];
if(_c){
p[_b]=_c;
}
}
dojo.cookie(this.name,dojo.toJson(p),{expires:30});
}
},setUserPreference:function(_d,_e){
var _f=lconn.share.util.dom.newXMLDocument("entry",lconn.share.util.dom.ATOM_NAMESPACE,[lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE]);
var _10=_f.documentElement;
var _11=lconn.share.util.dom.createElementNS(_f,"category",lconn.share.util.dom.ATOM_NAMESPACE);
_11.setAttribute("term","preferences");
_11.setAttribute("label","preferences");
_11.setAttribute("scheme","tag:ibm.com,2006:td/type");
_10.appendChild(_11);
var _12=lconn.share.util.dom.createElementNS(_f,_d,lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
_12.appendChild(_f.createTextNode(typeof _e=="undefined"?"":_e));
_10.appendChild(_12);
var _13=lconn.share.util.dom.serializeXMLDocument(_f,true);
this.getUserPreferences()[_d]=_e;
dojo.rawXhrPost({url:this.urlPreferences,handleAs:"json",timeout:(dojo.getObject("lconn.share.config.services.timeout.update")||10)*1000,postData:_13,headers:{"Content-Type":"application/atom+xml;charset=\"UTF-8\"","X-Method-Override":"PUT"},handle:dojo.hitch(this,this.complete)});
},complete:function(_14,_15){
if(!_14||!_14.items||_14.items.length!=1||!_14.items[0].preferences){
console.log("PersonalPreferences::complete WARN updating preferences failed");
}else{
var p=this.getUserPreferences();
dojo.mixin(p,_14.items[0].preferences);
}
}});
}


;if(!dojo._hasResource["lconn.files.util.SceneTemplates"]){
dojo._hasResource["lconn.files.util.SceneTemplates"]=true;
dojo.provide("lconn.files.util.SceneTemplates");


dojo.declare("lconn.files.util.SceneTemplates",null,{constructor:function(_1,_2){
dojo.mixin(this,_2||{});
this.defaultParameters=this.defaultParameters||{};
var _3=this.cache={};
if(_1){
for(var id in _1){
var _4=_1[id];
if(!_4){
continue;
}
if(typeof _4=="object"&&_4.documentElement){
_3[id]={xml:_4};
}else{
if(typeof _4=="string"){
if(/^<?xml/.exec(_4)){
_3[id]={text:_4};
}else{
if(_4[0]=="/"||/^http/i.exec(_4)){
_3[id]={url:_4};
}else{
_3[id]={url:(dojo.getObject("lconn.share.config.baseUri")||"/")+_4};
}
}
}
}
}
}
},getXhtml:function(id,_5){
var _6;
var _7=this.cache[id];
if(_7){
if(!_7.xml||(_5&&_5.bypassCache)||_7.error){
this.loadXml(_7,_5);
}
_6=_7.xml;
}
return _6;
},loadXml:function(_8,_9){
if(!_8){
return;
}
if(_8.text){
var _a=this.createDocument(_8.text);
_8.xml=_a;
}else{
if(_8.url){
var r,io;
var _b=lconn.share.util.uri.rewriteUri(_8.url,dojo.mixin((_9&&_9.parameters)?_9.parameters:{},this.defaultParameters));
this.net.getXml({url:_b,handle:function(_c,_d){
r=_c;
io=_d;
},sync:true});
if(r instanceof Error){
console.log("SceneTemplates::loadXml DEBUG unable to load template from url");
_8.xml=null;
}else{
_8.xml=r;
}
}
}
if(!_8.xml){
_8.error=true;
}
},getHtml:function(id,_e){
var _f=(id.charAt(0)=="/"||/^http/i.exec(id))?id:(dojo.getObject("lconn.share.config.baseUri")||"/")+id;
var _10={url:_f};
this.loadHtml(_10,_e);
return _10.html;
},loadHtml:function(_11,_12){
if(!_11){
return;
}
if(_11.text){
_11.html=this.createHtmlFragment(_11.text);
}else{
if(_11.url){
var r,io;
var url=lconn.share.util.uri.rewriteUri(_11.url,dojo.mixin((_12&&_12.parameters)?_12.parameters:{},this.defaultParameters));
this.net.getText({url:url,handle:function(_13,_14){
r=_13;
io=_14;
},sync:true});
if(r instanceof Error){
console.log("SceneTemplates::loadXml DEBUG unable to load template from url");
}else{
_11.html=this.createHtmlFragment(r);
}
}
}
if(!_11.html){
_11.error=true;
}
},createHtmlFragment:function(s){
if(dojo.isIE&&s){
s=s.replace(/(\<(link\s|script[\s>]))/ig,"<div class=\"lotusHidden\">&nbsp;</div>$1");
}
var d=document.createDocumentFragment();
var div=document.createElement("div");
div.innerHTML=s;
d.appendChild(div);
return div;
},createDocument:function(s){
var doc;
if(typeof DOMParser!="undefined"){
var _15=new DOMParser();
doc=_15.parseFromString(s,"text/xml");
}else{
if(typeof ActiveXObject!="undefined"){
doc=new ActiveXObject("Microsoft.XMLDOM");
doc.async="false";
doc.loadXML(s);
}
}
return doc;
}});
}


;if(!dojo._hasResource["lconn.share.AbstractRoutes"]){
dojo._hasResource["lconn.share.AbstractRoutes"]=true;
dojo.provide("lconn.share.AbstractRoutes");




dojo.declare("lconn.share.AbstractRoutes",null,{getQueryString:function(_1){
var _2=lconn.share.util.uri;
var _3=this.globalParameters;
if(_1){
if(_3){
var p=dojo.clone(_3);
for(var _4 in _1){
p[_4]=_1[_4];
}
return _2.writeParameters(p);
}
return _2.writeParameters(_1);
}else{
if(_3){
return _2.writeParameters(_3);
}
}
return "";
},getAuthenticatedUser:function(){
return null;
},isAuthenticatedUser:function(_5){
var u=this.getAuthenticatedUser();
if(!_5){
return typeof u=="object"&&u!=null;
}
return u&&u.id==_5;
},_getSB:function(_6,_7,_8){
var _9=_7&&_7.anonymous&&!this.disableAnonymous;
var _a=_7&&_7.basicAuth;
var _b=_7&&_7.nonPersonal;
if(_b){
_8=null;
}
if(_a){
if(!_9&&this.isAuthenticatedUser()){
return this._basic+(_8||_6);
}
return this._basicAnon+_6;
}
if(!_9&&this.isAuthenticatedUser()){
return this._form+(_8||_6);
}
return this._formAnon+_6;
},_getUSB:function(_c,_d,_e,_f){
var _10=_f&&_f.anonymous&&!this.disableAnonymous;
var _11=_f&&_f.basicAuth;
var _12=_f&&_f.nonPersonal;
if(_12){
_e=null;
}
var s;
if(_11){
if(!_10&&this.isAuthenticatedUser()){
if(_e&&this.getAuthenticatedUser().id==_c){
s=this._basic+_e;
}else{
s=this._basic+_d.replace("{userId}",encodeURIComponent(_c));
}
}else{
s=this._basicAnon+_d.replace("{userId}",encodeURIComponent(_c));
}
}else{
if(!_10&&this.isAuthenticatedUser()){
if(_e&&this.getAuthenticatedUser().id==_c){
s=this._form+_e;
}else{
s=this._form+_d.replace("{userId}",encodeURIComponent(_c));
}
}else{
s=this._formAnon+_d.replace("{userId}",encodeURIComponent(_c));
}
}
return s;
},getHostUrl:function(url){
var _13=url;
if(url.indexOf("://")>=0){
var _14=url.substring(0,url.indexOf("://")+3);
_13=url.substring(url.indexOf("://")+3);
var _15=_13.substring(0,_13.indexOf("/"));
return _14+_15;
}
return url;
},getOrganizationURLs:function(url){
if(url){
if(url.indexOf("http://")<0&&url.indexOf("https://")<0){
return url;
}
}
if(this.isAuthenticatedUser()){
if(!(lconn.core.config.multiTenantEnabled&&lconn.core.config.properties.OrganizationURLs=="true")){
return url;
}
}else{
return url;
}
if(!url){
return url;
}
var _16=lconn.core.url.getServiceUrl(lconn.core.config.services.files).uri;
_16=(_16?_16.toString():null)||"/";
return url.replace(this.getHostUrl(url),this.getHostUrl(_16));
},getProxiedUrl:function(url,opt){
var uri=lconn.share.util.uri.parseUri(url);
var _17=lconn.core.url.getServiceUrl(lconn.core.config.services.files).uri;
_17=(_17?_17.toString():null)||"/";
var _18=lconn.share.util.uri.parseUri(this.getOrganizationURLs(_17));
if((uri.scheme==null||uri.scheme==_18.scheme)&&(uri.authority==null||uri.authority==_18.authority)){
return url;
}else{
if(opt&&opt.commonProxy){
var _19=dojo.getObject("lconn.core.config.services.deploymentConfig");
var _1a=_19&&_19.url?lconn.share.util.uri.parseUri(lconn.core.url.getServiceUrl(_19).uri).path:"";
return _1a+"/proxy/commonProxy/"+url.replace("://","/");
}else{
return dojo.getObject("ibmConfig.proxyURL")+url.replace("://","/");
}
}
}});
}


;if(!dojo._hasResource["lconn.files.FilesServiceRoutes"]){
dojo._hasResource["lconn.files.FilesServiceRoutes"]=true;
dojo.provide("lconn.files.FilesServiceRoutes");








dojo.declare("lconn.files.FilesServiceRoutes",[lconn.share.AbstractRoutes],{apiParams:{sI:"sI",sK:"sK",sO:"sO",sC:"sC",page:"page",pageSize:"pageSize",format:"format",acls:"acls",collectionAcls:"collectionAcls",libraryAcls:"libraryAcls",includeRecommendation:"includeRecommendation",includeTags:"includeTags",zeroItem:1,asc:"asc",dsc:"dsc"},getOperationMonitorUrl:function(){
return dojo.getObject("lconn.share.config.services.uploadMonitor.url")||(this._form+"myop/feed?format=json");
},getConnectionsNewsServiceUrl:function(_1){
var _2=dojo.getObject("lconn.share.config.services.connections.uri.news");
if(_2){
var p={source:"files",lang:this.lang,ps:20,excludecommstories:true};
if(_1){
if(_1.page){
p.page=_1.page;
}
if(_1.pageSize){
p.ps=_1.pageSize;
}
if(typeof _1.lang!="undefined"){
p.lang=_1.lang;
}
}
_2+="/atomfba/stories/"+(_1&&_1.personal?"top":"public")+this.getQueryString(p);
_2=this.getProxiedUrl(_2);
}
return _2;
},getFileListDownloadUrl:function(_3,_4){
_4=_4||{};
var _5=this._getUSB(_3,"userlibrary/{userId}/media/{zipName}","myuserlibrary/media/{zipName}",_4);
var _6=_4.zipName||"files.zip";
var _7=".zip";
var _8=_6.lastIndexOf(_7);
if(_8<0||_8!=_6.length-_7.length){
_6=_6+_7;
}
_6=_6.replace(/\//g,"_");
_5=_5.replace("{zipName}",encodeURIComponent(_6));
var p=this._getDownloadOptions(_4);
if(_4.title){
p.title=_4.name;
}
if(_4.visibility=="public"){
p.visibility=_4.visibility;
}else{
if(_4.visibility=="private"){
p.visibility="private";
p.shared=false;
}else{
if(_4.visibility=="shared"){
p.visibility="private";
p.shared=true;
}
}
}
if(_4.search){
p.title=_4.search;
}
if(_4.startDate){
p.dF=_4.startDate;
}
if(_4.fileType){
p.fileType=_4.fileType;
}
if(_4.favorites){
p.onlyFavorite=_4.favorites=="true";
}
return _5+lconn.share.util.uri.writeParameters(p);
},getFileListServiceUrl:function(_9,_a){
var _b=this._getUSB(_9,"userlibrary/{userId}/feed","myuserlibrary/feed",_a);
var p=this._getListOptions(_a);
if(_a){
if(_a.fetchAcl){
p.acls=true;
}
if(_a.search){
p.search=_a.search;
}
if(_a.tag){
if(typeof _a.tag=="string"){
p.tag=[_a.tag];
}else{
p.tag=_a.tag;
}
}
if(_a.sharing=="withme"){
p.direction="inbound";
}else{
if(_a.sharing=="byme"){
p.direction="outbound";
}
}
if(_a.visibility=="public"){
p.visibility=_a.visibility;
}else{
if(_a.visibility=="private"){
p.visibility="private";
p.shared=false;
}else{
if(_a.visibility=="shared"){
p.visibility="private";
p.shared=true;
}
}
}
if(dojo.indexOf(["view","edit"],_a.sharePermission)!=-1){
p.sharePermission=_a.sharePermission;
}
if(_a.startDate){
p.dF=_a.startDate;
}
if(_a.notification===true||_a.notification=="on"){
p.notification="on";
}else{
if(_a.notification===false||_a.notification=="off"){
p.notification="off";
}
}
if(_a.includeQuota){
p.includeQuota=true;
}
if(_a.category){
p.category=_a.category;
}
if(_a.fileType){
p.fileType=_a.fileType;
}
if(_a.createVersion){
p.createVersion=true;
}
if(_a.source){
p.source=_a.source;
}
if(_a.draft){
p.draft=_a.draft;
}
if(_a.title){
p.title=_a.title;
}
}
return _b+lconn.share.util.uri.writeParameters(p);
},getDeletedFileListServiceUrl:function(_c,_d){
var _e=this._getUSB(_c,"userlibrary/{userId}/view/recyclebin/feed","myuserlibrary/view/recyclebin/feed",_d);
var p=this._getListOptions(_d);
if(_d){
if(_d.fetchAcl){
p.acls=true;
}
if(_d.startDate){
p.dF=_d.startDate;
}
if(_d.includeQuota){
p.includeQuota=true;
}
}
return _e+lconn.share.util.uri.writeParameters(p);
},getFavoritesListServiceUrl:function(_f){
var url=this._getSB("myfavorites/feed",_f);
var p=this._getListOptions(_f);
p.format="json:combined";
if(_f){
if(_f.type){
p.type=_f.type;
}
}
return url+lconn.share.util.uri.writeParameters(p);
},getFavoriteFilesListServiceUrl:function(opt){
var url=this._getSB("myfavorites/documents/feed",opt);
var p=this._getListOptions(opt);
if(opt){
if(opt.role){
p.access=opt.role;
}
if(opt.byuser){
p.creator=opt.byuser;
}
if(opt.name){
p.title=opt.name;
}
if(opt.type){
p.type=opt.type;
}
if(opt.ids){
p.itemId=opt.ids;
}
if(opt.tag){
if(typeof opt.tag=="string"){
p.tag=[opt.tag];
}else{
p.tag=opt.tag;
}
}
if(opt.title){
p.title=opt.title;
p.isExact=opt.isExact;
p.wildmatch=opt.wildmatch;
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
if(opt.startDate){
p.dF=opt.startDate;
}
}
return url+lconn.share.util.uri.writeParameters(p);
},getFileSyncListServiceUrl:function(opt){
var url=this._getSB("myfilesync/feed",opt);
var p=this._getListOptions(opt);
if(opt){
if(opt.ids){
p.itemId=opt.ids;
}
if(opt.tag){
if(typeof opt.tag=="string"){
p.tag=[opt.tag];
}else{
p.tag=opt.tag;
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
}
return url+lconn.share.util.uri.writeParameters(p);
},getFilesMediaUrl:function(opt){
opt=opt||{};
var _10=encodeURIComponent(opt.label||"files.zip");
return this._getSB("documents/media/"+_10,opt);
},getAllFilesListServiceUrl:function(opt){
var url=this._getSB("documents/feed",opt);
var p=this._getListOptions(opt);
if(opt){
if(opt.search){
p.search=opt.search;
}else{
p.search="";
}
if(opt.tag){
if(typeof opt.tag=="string"){
p.tag=[opt.tag];
}else{
p.tag=opt.tag;
}
}
if(opt.startDate){
p.dF=opt.startDate;
}
if(opt.category){
p.category=opt.category;
}
if(dojo.indexOf(["all","personalFiles","communityFiles"],opt.type)!=-1){
p.searchType=opt.type;
}
if(opt.memberOnly===true){
p.memberOnly=true;
}
}
return url+lconn.share.util.uri.writeParameters(p);
},getPublicFileListServiceUrl:function(opt){
var opt=dojo.clone(opt)||{};
opt.anonymous=true;
var url=this._getSB("documents/feed",opt);
var p=this._getListOptions(opt);
p.visibility="public";
if(opt){
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
if(opt.startDate){
p.dF=opt.startDate;
}
if(opt.category){
p.category=opt.category;
}
if(opt.fileType){
p.fileType=opt.fileType;
}
}
return url+lconn.share.util.uri.writeParameters(p);
},getLibraryNavigationServiceUrl:function(_11,opt){
var url=this._getUSB(_11,"userlibrary/{userId}/nav/feed","myuserlibrary/nav/feed",opt);
var p={format:"json"};
if(opt){
if(opt.fetchAcl){
p.acls=true;
}
if(opt.navigationId){
p.id=opt.navigationId;
}
if(opt.mediaId){
p.mediaId=opt.mediaId;
}
if(opt.pageSize){
p.pageSize=opt.pageSize;
}
if(typeof opt.format!="undefined"){
p.format=opt.format;
}
}
if(dojo.isIE){
p.format=p.format||"xml";
}
return url+lconn.share.util.uri.writeParameters(p);
},getLibraryEntryServiceUrl:function(_12,opt){
var url=this._getUSB(_12,"userlibrary/{userId}/entry","myuserlibrary/entry",opt);
var p={};
if(dojo.isIE){
p.format="xml";
}
return url+lconn.share.util.uri.writeParameters(p);
},getShareListServiceUrl:function(opt){
var url=(opt&&opt.documents)?this._getSB("documents/shared/feed",opt):this._getSB("shares/feed",opt,"myshares/feed");
var p=this._getListOptions(opt);
if(opt){
if(opt.fetchAcl){
p.acls=true;
}
if(opt.tag){
p.tag=opt.tag;
}
if(opt.sharing=="withme"){
p.direction="inbound";
if(opt.byuser){
p.sharedBy=opt.byuser;
}
if(opt.search){
p.search=opt.search;
}
}else{
if(opt.sharing=="byme"){
p.direction="outbound";
if(opt.byuser){
p.sharedWith=opt.byuser;
}
}
}
if(dojo.indexOf(["public","shared","private"],opt.visibility)!=-1){
p.visibility=opt.visibility;
}
if(dojo.indexOf(["View","Edit"],opt.sharePermission)!=-1){
p.sharePermission=opt.sharePermission;
}
if(opt.startDate){
p.dF=opt.startDate;
}
if(opt.category){
p.category=opt.category;
}
if(opt.fileType){
p.fileType=opt.fileType;
}
}
return url+lconn.share.util.uri.writeParameters(p);
},getShareListDownloadUrl:function(opt){
var url=this._getSB("documents/shared/media/{zipName}");
url=url.replace("{zipName}",encodeURIComponent(opt.zipName||"files.zip"));
var p=this._getDownloadOptions(opt);
if(opt){
if(opt.fileType){
p.fileType=opt.fileType;
}
if(opt.lastUpdatedAfter){
p.lastUpdatedAfter=opt.lastUpdatedAfter;
}
if(opt.search){
p.title=opt.search;
}
if(opt.sharedBy){
p.sharedBy=opt.byuser;
}
if(dojo.indexOf(["View","Edit"],opt.sharePermission)!=-1){
p.sharePermission=opt.sharePermission;
}
if(opt.owner){
p.owner=opt.owner;
}
if(dojo.indexOf(["public","shared","private"],opt.visibility)!=-1){
p.visibility=opt.visibility;
}
if(opt.favorites){
p.onlyFavorite=(opt.favorites=="true");
}
}
return url+lconn.share.util.uri.writeParameters(p);
},getCollectionsListServiceUrl:function(opt){
var url=this._getSB("collections/feed",opt);
var p=this._getListOptions(opt);
if(opt){
if(dojo.indexOf(["public","private"],opt.visibility)!=-1){
p.visibility=opt.visibility;
}
if(dojo.indexOf(["true","false",true,false],opt.shared)!=-1){
p.shared=opt.shared;
}
if(opt.role){
p.access=opt.role;
}
if(opt.byuser){
p.creator=opt.byuser;
}
if(opt.search){
p.title=opt.search;
}
if(opt.sharedWithMe){
p.sharedWithMe=true;
}
if(opt.name){
p.title=opt.name;
p.isExact=false;
p.wildmatch="anywhere";
}
if(opt.type){
p.type=opt.type;
}
if(opt.title){
p.title=opt.title;
p.isExact=opt.isExact;
p.wildmatch=opt.wildmatch;
}
}
return url+lconn.share.util.uri.writeParameters(p);
},getLibrariesListServiceUrl:function(opt){
var url=this._getSB("libraries/feed",opt);
var p=this._getListOptions(opt);
if(opt){
if(opt.role){
p.access=opt.role;
}
if(opt.name){
p.title=opt.name;
if(opt.name.length<3){
p.isExact=true;
}
}
if(opt.type){
p.type=opt.type;
}
}
return url+lconn.share.util.uri.writeParameters(p);
},getRecentCollectionsListServiceUrl:function(opt){
var url=this._getSB("collections/addedto/feed",opt);
var p=this._getListOptions(opt);
if(opt){
if(dojo.indexOf(["public","private"],opt.visibility)!=-1){
p.visibility=opt.visibility;
}
if(dojo.indexOf(["true","false",true,false],opt.shared)!=-1){
p.shared=opt.shared;
}
if(opt.role){
p.access=opt.role;
}
if(opt.byuser){
p.creator=opt.byuser;
}
if(opt.name){
p.title=opt.name;
p.isExact=false;
p.wildmatch="anywhere";
}
if(opt.title){
p.title=opt.title;
p.isExact=opt.isExact;
p.wildmatch=opt.wildmatch;
}
if(opt.type){
p.type=opt.type;
}
if(opt.ids){
p.itemId=opt.ids;
}
if(dojo.exists("includeSubCollections",opt)){
p.includeSubCollections=opt.includeSubCollections;
}
if(opt.excludedAncestorId){
p.excludedAncestorId=opt.excludedAncestorId;
}
}
return url+lconn.share.util.uri.writeParameters(p);
},getFavoriteCollectionsListServiceUrl:function(opt){
var url=this._getSB("myfavorites/collections/feed",opt);
var p=this._getListOptions(opt);
if(opt){
if(dojo.indexOf(["public","private"],opt.visibility)!=-1){
p.visibility=opt.visibility;
}
if(dojo.indexOf(["true","false",true,false],opt.shared)!=-1){
p.shared=opt.shared;
}
if(opt.role){
p.access=opt.role;
}
if(opt.byuser){
p.creator=opt.byuser;
}
if(opt.search){
p.title=opt.search;
}
if(opt.name){
p.title=opt.name;
p.isExact=false;
p.wildmatch="anywhere";
}
if(opt.title){
p.title=opt.title;
p.isExact=opt.isExact;
p.wildmatch=opt.wildmatch;
}
if(opt.type){
p.type=opt.type;
}
if(opt.ids){
p.itemId=opt.ids;
}
if(dojo.exists("includeSubCollections",opt)){
p.includeSubCollections=opt.includeSubCollections;
}
if(opt.excludedAncestorId){
p.excludedAncestorId=opt.excludedAncestorId;
}
}
return url+lconn.share.util.uri.writeParameters(p);
},getCollectionInfoServiceUrl:function(_13,opt){
if(!_13){
console.log("Must provide Collection object or collectionId");
throw "Must provide Collection object or collectionId";
}
opt=opt||{};
var url;
if(typeof _13=="object"&&_13.getUrlEntry){
var _14=_13;
if(!opt.anonymous&&this.isAuthenticatedUser()&&_14.getUrlEdit){
url=_14.getUrlEdit();
}
if(!url){
url=_14.getUrlEntry();
}
}else{
var url=this._getSB("collection/{collectionId}/entry",opt);
url=url.replace("{collectionId}",encodeURIComponent(_13));
}
var p=this._getFileInfoOptions(opt);
return url+lconn.share.util.uri.writeParameters(p);
},getCollectionListDownloadUrl:function(id,opt){
var url=this._getSB("collection/{collectionId}/media/{zipName}",opt);
var _15=opt.zipName||"files.zip";
var end=".zip";
var _16=_15.lastIndexOf(end);
if(_16<0||_16!=_15.length-end.length){
_15=_15+end;
}
_15=_15.replace(/\//g,"_");
url=url.replace("{zipName}",encodeURIComponent(_15));
url=url.replace("{collectionId}",encodeURIComponent(id));
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
},getCollectionListServiceUrl:function(id,opt){
var url=this._getSB("collection/{collectionId}/feed",opt);
url=url.replace("{collectionId}",encodeURIComponent(id));
var p=this._getListOptions(opt);
if(opt){
if(dojo.indexOf(["public","private"],opt.visibility)!=-1){
p.visibility=opt.visibility;
}
if(opt.acls){
p.collectionAcls=p.acls=opt.acls;
}
if(opt.includeNotification){
p.includeNotification=opt.includeNotification;
}
if(opt.includePolicy){
p.includePolicy=true;
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
if(opt.category){
p.category=opt.category;
}
if(opt.includeAncestors){
p.includeAncestors=opt.includeAncestors;
}
}
return url+lconn.share.util.uri.writeParameters(p);
},getCollectionRolesListServiceUrl:function(id,opt){
var url=this._getSB("collection/{collectionId}/roles",opt);
url=url.replace("{collectionId}",encodeURIComponent(id));
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
},getCollectionRoleMemberListServiceUrl:function(_17,_18,opt){
var url=this._getSB("collection/{collectionId}/roles/{roleId}/members",opt);
url=url.replace("{collectionId}",encodeURIComponent(_17)).replace("{roleId}",encodeURIComponent(_18));
var p={};
if(dojo.isIE){
p.format=p.format||"xml";
}
return url+lconn.share.util.uri.writeParameters(p);
},getCollectionMemberEntryServiceUrl:function(_19,_1a,opt){
var url=this._getSB("collection/{collectionId}/members/{memberId}",opt);
url=url.replace("{collectionId}",encodeURIComponent(_19)).replace("{memberId}",encodeURIComponent(_1a));
var p={};
if(dojo.isIE){
p.format=p.format||"xml";
}
return url+lconn.share.util.uri.writeParameters(p);
},getCollectionRoleMemberEntryServiceUrl:function(_1b,_1c,_1d,opt){
var url=this._getSB("collection/{collectionId}/roles/{roleId}/members/{memberId}",opt);
url=url.replace("{collectionId}",encodeURIComponent(_1b)).replace("{memberId}",encodeURIComponent(_1d)).replace("{roleId}",encodeURIComponent(_1c));
var p={};
if(dojo.isIE){
p.format=p.format||"xml";
}
return url+lconn.share.util.uri.writeParameters(p);
},getCollectionsUrl:function(opt){
var _1e=this._app+"/folders";
var p={};
if(opt){
if(dojo.indexOf(["personal","shared","public","pinned"],opt.pivot)!=-1){
_1e+="/"+opt.pivot;
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
if(opt.title){
p.title=opt.title;
p.isExact=opt.isExact;
p.wildmatch=opt.wildmatch;
}
if(opt.byuser&&opt.byuser.id){
p.byuser=opt.byuser.id;
if(opt.byuser.name){
p.byusername=opt.byuser.name;
}
}
}
return _1e+this.getQueryString(p);
},getCollectionUrl:function(id,opt){
var _1f=this._app+"/folder/"+encodeURIComponent(id);
var p={};
var _20=this.maxTagFilters;
if(opt){
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
if(dojo.isArray(opt.tag)&&opt.tag.length>_20&&_20>=1){
p.tag=opt.tag.slice(0,_20-1).concat([opt.tag[opt.tag.length-1]]);
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
return _1f+this.getQueryString(p);
},getCommunityCollectionUrl:function(_21,_22,_23,opt){
var _24=dojo.getObject("lconn.share.config.services.connections.uri.communities");
_24=_24+"/service/html/communityview?communityUuid="+_22+"#fullpageWidgetId="+_21+"&folder="+_23;
return _24;
},getCommunityCollectionsUrl:function(_25,_26,opt){
var _27=dojo.getObject("lconn.share.config.services.connections.uri.communities");
_27=_27+"/service/html/communityview?communityUuid="+_26+"#fullpageWidgetId="+_25+"&section=folders";
return _27;
},_getListOptions:function(opt){
var _28=((opt&&opt.apiParams)?opt.apiParams:this.apiParams)||{};
var _29=(opt&&opt.apiSortKeys)?opt.apiSortKeys:null;
var p={};
if(opt){
if(opt.page&&_28.page){
p[_28.page]=opt.page;
}else{
if(opt.start&&_28.sI){
p[_28.sI]=opt.start;
}else{
if(opt.page&&opt.page>1&&opt.pageSize&&_28.sI){
p[_28.sI]=(opt.page-1)*opt.pageSize+_28.zeroItem;
}
}
}
if(opt.pageSize&&_28.pageSize){
p[_28.pageSize]=opt.pageSize;
}
if(typeof opt.format!="undefined"&&_28.format){
p[_28.format]=opt.format;
}
if(opt.sortKey&&_28.sK){
opt.sortKey=_29?_29[opt.sortKey]:opt.sortKey;
if(opt.sortKey){
if(_28.sO){
p[_28.sK]=opt.sortKey;
p[_28.sO]=opt.sortDescending?_28.dsc:_28.asc;
}else{
p[_28.sK]=opt.sortKey+" "+(opt.sortDescending?_28.dsc:_28.asc);
}
if(_28.sC){
p[_28.sC]=opt.sortCategory;
}
}
}
if(opt.includeCount===false){
p.includeCount=false;
}
if(opt.preventCache){
p.preventCache=new Date().valueOf();
}
if(opt.isExternal){
p.isExternal=opt.isExternal;
}
}
if(dojo.isIE&&_28.format){
p[_28.format]=p.format||"xml";
}
return p;
},_getDownloadOptions:function(opt){
var p={};
if(opt){
if(opt.tag){
p.tag=opt.tag;
}
if(opt.startDate){
p.dF=opt.startDate;
}
}
return p;
},FILE_FRAGMENT:/\/entry$/,getFileUrl:function(doc,_2a,p,opt){
var url;
if(p&&p._anonymous===false){
url=doc.__baseAuthUrl;
if(!url){
var uri=doc.getUrlEdit()||doc.getUrlEntry();
var uri=lconn.share.util.uri.parseUri(uri);
url=doc.__baseAuthUrl=this.getProxiedUrl(uri.uri.replace(this.FILE_FRAGMENT,"/"),opt);
}
}else{
url=doc.__baseUrl;
if(!url){
var uri=lconn.share.util.uri.parseUri(doc.getUrlEntry());
url=doc.__baseUrl=this.getProxiedUrl(uri.uri.replace(this.FILE_FRAGMENT,"/"),opt);
}
}
url+=_2a;
p=p||{};
delete p._anonymous;
if(dojo.isIE){
p.format=p.format||"xml";
}
return url+lconn.share.util.uri.writeParameters(p);
},getAttachmentInfoServiceUrl:function(_2b,_2c,_2d,opt){
var url=this._getSB("document/{fileId}/attachment/{attachmentId}/entry",opt);
url=url.replace("{fileId}",encodeURIComponent(_2c)).replace("{attachmentId}",encodeURIComponent(_2d));
var p={};
if(opt){
if(typeof opt.format!="undefined"){
p.format=opt.format;
}
}
if(dojo.isIE){
p.format=p.format||"xml";
}
return url+lconn.share.util.uri.writeParameters(p);
},getAttachmentListServiceUrl:function(_2e,_2f,opt){
var url=this._getUSB(_2e,"userlibrary/{userId}/document/{fileId}/feed","myuserlibrary/document/{fileId}/feed",opt);
url=url.replace("{fileId}",encodeURIComponent(_2f));
var p=this._getListOptions(opt);
if(opt&&opt.fileType){
p.fileType=opt.fileType;
}
p.category="attachment";
return url+lconn.share.util.uri.writeParameters(p);
},getDraftAttachmentListServiceUrl:function(_30,_31,opt){
var url=this._getUSB(_30,"userlibrary/{userId}/draft/{draftId}/feed","myuserlibrary/draft/{draftId}/feed",opt);
url=url.replace("{draftId}",encodeURIComponent(_31));
var p=this._getListOptions(opt);
if(opt&&opt.fileType){
p.fileType=opt.fileType;
}
p.category="attachment";
return url+lconn.share.util.uri.writeParameters(p);
},getVersionListServiceUrl:function(_32,_33,opt){
var url=this._getUSB(_32,"userlibrary/{userId}/document/{fileId}/feed","myuserlibrary/document/{fileId}/feed",opt);
url=url.replace("{fileId}",encodeURIComponent(_33));
var p=this._getListOptions(opt);
if(opt){
if(opt.deleteFrom){
p.deleteFrom=opt.deleteFrom;
}
if(opt.fetchAcl){
p.acls=true;
}
}
p.category="version";
return url+lconn.share.util.uri.writeParameters(p);
},getCommentListServiceUrl:function(_34,_35,opt){
var url=this._getUSB(_34,"userlibrary/{userId}/document/{fileId}/feed","myuserlibrary/document/{fileId}/feed",opt);
url=url.replace("{fileId}",encodeURIComponent(_35));
var p=this._getListOptions(opt);
if(opt){
if(opt.fetchAcl){
p.acls=true;
}
if(opt.fileType){
p.fileType=opt.fileType;
}
}
if(!p.category){
p.category="comment";
}
if(opt.contentFormat){
p.contentFormat=opt.contentFormat;
}
return url+lconn.share.util.uri.writeParameters(p);
},getPreferencesServiceUrl:function(opt){
var url;
if(opt&&opt.basicAuth){
url=this._basic+"people/entry";
}else{
url=this._form+"people/entry";
}
return url;
},getVersionInfoServiceUrl:function(_36,_37,_38,opt){
var url=this._getSB("document/{fileId}/entry",opt);
url=url.replace("{fileId}",encodeURIComponent(_37));
var p={};
if(opt&&typeof opt.format!="undefined"){
p.format=opt.format;
}
if(opt&&opt.fetchAcl){
p.acls=true;
}
if(opt.inline){
p.inline=true;
}
p.versionLabel=encodeURIComponent(_38);
if(dojo.isIE){
p.format=p.format||"xml";
}
return url+lconn.share.util.uri.writeParameters(p);
},getWorkingDraftsServiceUrl:function(opt){
var url=this._getSB("view/WorkingDrafts/feed",opt);
var p={};
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
}else{
p.pageSize=dojo.getObject("lconn.share.config.autosave.numRetrievedUnsavedChanges");
}
if(opt.sortKey){
p.sK=opt.sortKey;
p.sO=opt.sortDescending?"dsc":"asc";
}
if(opt.includeDocumentAuthorInfo){
p.includeDocumentAuthorInfo=true;
}
if(typeof opt.format!="undefined"){
p.format=opt.format;
}
}
if(dojo.isIE){
p.format=p.format||"xml";
}
return url+lconn.share.util.uri.writeParameters(p);
},getDraftInfoServiceUrl:function(_39,_3a,opt){
var url=this._getUSB(_39,"userlibrary/{userId}/draft/{draftId}/entry","myuserlibrary/draft/{draftId}/entry",opt);
url=url.replace("{draftId}",encodeURIComponent(_3a));
var p={};
if(opt){
if(opt.fetchAcl){
p.acls=true;
}
if(opt.includeNotification){
p.includeNotification=true;
}
if(typeof opt.format!="undefined"){
p.format=opt.format;
}
if(opt.includeRecommendation){
p.includeRecommendation=true;
}
if(opt.includeTags){
p.includeTags=true;
}
if(opt.submit){
p.submit=true;
}
if(opt.inline){
p.inline=true;
}
if(opt.shares){
p.metadata="full";
}
if(opt.includeDocumentModifiedInfo){
p.includeDocumentModifiedInfo=true;
}
if(opt.includeDocumentAuthorInfo){
p.includeDocumentAuthorInfo=true;
}
if(opt.source){
p.source=opt.source;
}
}
if(dojo.isIE){
p.format=p.format||"xml";
}
return url+lconn.share.util.uri.writeParameters(p);
},_getFileInfoOptions:function(opt){
var pN=((opt&&opt.apiParams)?opt.apiParams:this.apiParams)||{};
var p={};
if(opt){
if(opt.collectionId){
p.collectionId=opt.collectionId;
}
if(opt.includeWorkingDraftInfo){
p.includeWorkingDraftInfo=true;
}
if(opt.byLabel){
p.identifier="label";
}
if(opt.checkByLabel){
p.label=opt.fileName;
}
if(opt.fetchAcl&&pN.acls){
p[pN.acls]=true;
}
if(opt.includeNotification){
p.includeNotification=true;
}
if(opt.includePolicy){
p.includePolicy=true;
}
if(typeof opt.format!="undefined"&&pN.format){
p[pN.format]=opt.format;
}
if(opt.includeRecommendation&&pN.includeRecommendation){
p[pN.includeRecommendation]=true;
}
if(opt.includeTags&&pN.includeTags){
p[pN.includeTags]=true;
}
if(opt.includeLibraryInfo){
p.includeLibraryInfo=true;
}
if(opt.includePolicy){
p.includePolicy=true;
}
if(opt.includeDownloadInfo){
p.includeDownloadInfo=true;
}
if(opt.submit){
p.submit=true;
}
if(opt.createVersion){
p.createVersion=true;
}
if(opt.inline){
p.inline=true;
}
if(opt.shares){
p.metadata="full";
}
if(opt.rank){
p.rank=opt.rank;
}
if(opt.category){
p.category=opt.category;
}
p.versionLabel=opt.versionLabel;
}
if(dojo.isIE&&pN.format){
p[pN.format]=p[pN.format]||"xml";
}
return p;
},getFileInfoServiceUrl:function(_3b,opt){
if(!_3b){
console.log("Must provide File object or fileId");
throw "Must provide File object or fileId";
}
opt=opt||{};
var url;
if(typeof _3b=="object"&&_3b.getUrlEntry){
var _3c=_3b;
if(!opt.anonymous&&this.isAuthenticatedUser()&&_3c.getUrlEdit){
url=_3c.getUrlEdit();
}
if(!url){
url=_3c.getUrlEntry();
}
}else{
if(opt.libraryId){
url=this._getSB("library/{libraryId}/document/{fileId}/entry",opt).replace("{libraryId}",encodeURIComponent(opt.libraryId));
}else{
if(opt.userId){
if(opt.collectionId){
url=this._getUSB(opt.userId,"userlibrary/{userId}/document/{fileId}/entry","collection/{collectionId}/feed",opt);
}else{
url=this._getUSB(opt.userId,"userlibrary/{userId}/document/{fileId}/entry","myuserlibrary/document/{fileId}/entry",opt);
}
}else{
if(opt.communityId){
if(opt.collectionId){
url=this._getSB("communitylibrary/{communityId}/document/{fileId}/entry",opt).replace("communitylibrary/{communityId}/document/{fileId}/entry","collection/{collectionId}/feed");
}else{
url=this._getSB("communitylibrary/{communityId}/document/{fileId}/entry",opt).replace("{communityId}",encodeURIComponent(opt.communityId));
}
}else{
url=this._getSB("document/{fileId}/entry",opt);
}
}
}
url=url.replace("{fileId}",encodeURIComponent(_3b));
if(opt.collectionId){
url=url.replace("{collectionId}",encodeURIComponent(opt.collectionId));
}
}
var p=this._getFileInfoOptions(opt);
return url+lconn.share.util.uri.writeParameters(p);
},getFileShareListServiceUrl:function(_3d,opt){
var url=this._getSB(opt.myShares?"myshares/feed":"shares/feed",opt);
var p={};
p.sharedWhat=_3d;
if(opt){
if(typeof opt.format!="undefined"){
p.format=opt.format;
}
if(opt.user){
p.sharedWith=opt.user;
}
if(opt.demote){
p.sharePermission="View";
}
}
if(dojo.isIE){
p.format=p.format||"xml";
}
return url+lconn.share.util.uri.writeParameters(p);
},getFileBulkShareListServiceUrl:function(_3e,_3f,opt){
var url=this._getUSB(_3e,"userlibrary/{userId}/document/{fileId}/feed","myuserlibrary/document/{fileId}/feed",opt);
url=url.replace("{fileId}",encodeURIComponent(_3f));
var p=this._getListOptions(opt);
return url+lconn.share.util.uri.writeParameters(p);
},getFileCommColServiceUrl:function(_40,_41,opt){
var url=this._getSB("communitylibrary/{communityId}/document/{documentId}/feed",opt);
url=url.replace("{communityId}",encodeURIComponent(_40));
url=url.replace("{documentId}",encodeURIComponent(_41));
var p=this._getListOptions(opt);
return url+lconn.share.util.uri.writeParameters(p);
},getFileFeedServiceUrl:function(_42,opt){
var url=this._getSB("document/{documentId}/feed",opt);
url=url.replace("{documentId}",encodeURIComponent(_42));
var p=this._getListOptions(opt);
return url+lconn.share.util.uri.writeParameters(p);
},getFileRecommendedByServiceUrl:function(_43,_44,opt){
var url=this._getUSB(_43,"userlibrary/{userId}/document/{fileId}/recommendedby/feed","myuserlibrary/document/{fileId}/recommendedby/feed",opt);
url=url.replace("{fileId}",encodeURIComponent(_44));
var p=this._getListOptions(opt);
if(opt){
if(opt.includeCurrent){
p.includeRecommendation=true;
}
}
p.format="json";
return url+lconn.share.util.uri.writeParameters(p);
},getFileDownloadInfoServiceUrl:function(_45,_46,opt){
var url=this._getUSB(_45,"userlibrary/{userId}/document/{fileId}/downloadedby/feed","myuserlibrary/document/{fileId}/downloadedby/feed",opt);
url=url.replace("{fileId}",encodeURIComponent(_46));
var p=this._getListOptions(opt);
p.format="json";
return url+lconn.share.util.uri.writeParameters(p);
},getFileUsersSharedWithUrl:function(_47,_48,opt){
var url=this._getUSB(_47,"userlibrary/{userId}/document/{fileId}/permissions/feed","myuserlibrary/document/{fileId}/permissions/feed",opt);
url=url.replace("{fileId}",encodeURIComponent(_48));
var p=this._getListOptions(opt);
if(opt){
if(opt.sharePermission){
p.sharePermission=opt.permission;
}
if(opt.visibility){
p.visibility=opt.visibility;
}
if(opt.type){
p.type=opt.type;
}
}
return url+lconn.share.util.uri.writeParameters(p);
},getMySharedWithUsersServiceListUrl:function(opt){
var url=this._getSB("shares/users/feed",opt,"myshares/users/feed");
var p={format:"json",pageSize:(dojo.getObject("lconn.share.config.services.recentShares.maxResults")||null),sK:"modifiedByName",sO:"desc"};
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
if(opt.internalOnly){
p.internalOnly=opt.internalOnly;
}
}
return url+lconn.share.util.uri.writeParameters(p);
},getPersonalFileShareListServiceUrl:function(_49,opt){
var url=this._getSB("myshares/feed",opt);
var p=this._getListOptions(opt);
p.sharedWhat=_49;
if(opt){
if(dojo.indexOf(["View","Edit"],opt.sharePermission)!=-1){
p.sharePermission=opt.sharePermission;
}
}
return url+lconn.share.util.uri.writeParameters(p);
},getFileShareGraphServiceUrl:function(_4a,_4b,opt){
var url=this._getUSB(_4a,"userlibrary/{userId}/document/{fileId}/sharelinks/feed","myuserlibrary/document/{fileId}/sharelinks/feed",opt);
url=url.replace("{fileId}",encodeURIComponent(_4b));
var p=this._getListOptions(opt);
p.format="json";
if(opt){
if(opt.includeDownload){
p.includeDownload=opt.includeDownload;
}
}
return url+lconn.share.util.uri.writeParameters(p);
},getFileCollectionsListServiceUrl:function(_4c,_4d,opt){
var url=(_4c)?this._getUSB(_4c,"userlibrary/{userId}/document/{fileId}/collections/feed","myuserlibrary/document/{fileId}/collections/feed",opt):this._getSB("document/{fileId}/collections/feed",opt);
url=url.replace("{fileId}",encodeURIComponent(_4d));
var p=this._getListOptions(opt);
if(opt){
if(opt.access&&{none:1,view:1}[opt.access]){
p.access=opt.access;
}
if(opt.type){
p.type=opt.type;
}
}
return url+lconn.share.util.uri.writeParameters(p);
},getUserInfoServiceUrl:function(_4e){
if(_4e){
var url=this._getSB("people/feed",{});
var p={userid:_4e,format:"json"};
return url+this.getQueryString(p);
}
var url=this._form+"people/feed";
var p={self:true,format:"json"};
return url+this.getQueryString(p);
},getUserPhotoUrl:function(_4f){
if(dojo.isArray(_4f)){
_4f=_4f[0];
}
var _50=(typeof _4f=="object")?_4f.id:_4f;
var url=dojo.getObject("lconn.share.config.services.userPhotoUri");
url=this.getOrganizationURLs(url);
if(!url){
return null;
}
if(url.indexOf("{email}")!=-1&&lconn.share.util.text.trim(_4f.email).length==0){
return null;
}
return url.replace("{userId}",encodeURIComponent(_50)).replace("{uid}",encodeURIComponent(_50)).replace("{email}",encodeURIComponent(_4f.email));
},getTypeAheadUserServiceUrl:function(_51,opt){
return this.getUserSearchServiceUrl(_51,opt);
},getActiveTypeAheadUserServiceUrl:function(_52,opt){
if(opt){
opt.activeOnly=true;
}else{
opt={activeOnly:true};
}
return this.getUserSearchServiceUrl(_52,opt);
},getUserSearchServiceUrl:function(_53,opt){
var url=this._getSB("people/feed",opt);
var p=this._getListOptions(opt);
p.searchString=_53;
p.format="json";
p.sK="relevanceByName";
if(opt){
if(opt.directory){
p.searchType="directory";
}
if(opt.includeExtendedAttributes){
p.includeExtendedAttributes=true;
}
if(opt.activeOnly){
p.userState="active";
}
}
return url+this.getQueryString(p);
},getBulkEmailResolutionUrl:function(){
var url=this._getSB("people/feed");
var p={};
p.format="json";
return url+this.getQueryString(p);
},getGroupSearchServiceUrl:function(_54,opt){
var url=this._formAnon+"groups/feed";
var p=this._getListOptions(opt);
p.searchString=_54;
p.format="json";
if(opt){
p.virtualGroup=[];
if(opt.includeAllAuthenticated){
p.virtualGroup.push("all-authenticated-users");
}
if(opt.includeAnonymous){
p.virtualGroup.push("anonymous-user");
}
if(p.virtualGroup.length==0){
p.includeVirtualGroups=false;
}
if(opt.directory){
p.searchType="directory";
}
if(opt.includeExtendedAttributes){
p.includeExtendedAttributes=true;
}
}
return url+this.getQueryString(p);
},getWikiComparisonServiceUrl:function(_55,_56,_57){
var url=this._getSB("diff",opt);
var p={diffParent:_55,input1:_56,input2:_57};
if(dojo.isIE){
p.format="xml";
}
return url+this.getQueryString(p);
},getWikiConversionServiceUrl:function(opt){
var url=this._getSB("convert",opt);
var p={};
if(dojo.isIE){
p.format="xml";
}
return url+this.getQueryString(p);
},getTagServiceUrl:function(opt){
var url="";
if(opt&&opt.userLibrary){
url=this._getUSB(opt.userLibrary,"userlibrary/{userId}/tags/feed","myuserlibrary/tags/feed",opt);
}else{
var opt=dojo.clone(opt)||{};
opt.anonymous=true;
url=this._getSB("tags/feed",opt);
}
var p={format:"json",scope:"document",pageSize:15,sK:"cloud",sO:"dsc"};
if(opt){
if(opt.userLibrary){
url=url.replace("{userId}",encodeURIComponent(opt.userLibrary));
p.scope=null;
}
if(opt.page){
p.page=opt.page;
}else{
if(opt.start){
p.sI=opt.start;
}
}
if(opt.tag){
p.filter=opt.tag;
}
if(opt.pageSize){
p.pageSize=opt.pageSize;
}
}
return url+lconn.share.util.uri.writeParameters(p);
},getRecommendServiceUrl:function(_58,_59,opt){
var url=this._getUSB(_58,"userlibrary/{userId}/document/{fileId}/recommendation/{userId}/entry","myuserlibrary/document/{fileId}/recommendation/{userId}/entry",opt);
url=url.replace("{fileId}",encodeURIComponent(_59)).replace("{userId}",encodeURIComponent(_58));
return url;
},getLockServiceUrl:function(_5a,opt){
var url=this._getSB("document/{fileId}/lock",opt);
url=url.replace("{fileId}",encodeURIComponent(_5a));
var p={};
if(opt&&opt.type){
p.type=opt.type;
}
return url+lconn.share.util.uri.writeParameters(p);
},getRecommendPeopleFeedUrl:function(_5b,_5c,opt){
var url=this._getUSB(_5b,"userlibrary/{userId}/document/{fileId}/recommendations/feed","myuserlibrary/document/{fileId}/recommendations/feed",opt);
url=url.replace("{fileId}",encodeURIComponent(_5c));
var p={format:"json"};
if(opt){
if(opt.sharePermission){
p.sharePermission=opt.permission;
}
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
}
return url+lconn.share.util.uri.writeParameters(p);
},getCommunitiesListServiceUrl:function(opt){
var _5d=this.getCommunitiesBaseUrl();
if(_5d){
var p={};
if(opt.name){
p.filterValue=opt.name;
}
if(opt.pageSize){
p.count=opt.pageSize;
}
if(opt.start){
p.startIndex=opt.start;
}
if(opt.communityType){
p.communityType=opt.communityType;
}
if(opt.orgId){
p.orgId=encodeURIComponent(opt.orgId);
}
if(opt.internalOnly){
p.internalOnly=encodeURIComponent(opt.internalOnly);
}
if(opt.title){
p.title=opt.title;
p.isExact=opt.isExact;
p.wildmatch=opt.wildmatch;
}
var url=_5d+"/service/opensocial/groups/@me"+lconn.share.util.uri.writeParameters(p);
url=this.getProxiedUrl(url);
return url;
}else{
return null;
}
},getCommunityLibraryListServiceUrl:function(_5e,opt){
var url=this._getSB("communitylibrary/{communityId}/feed",opt);
url=url.replace("{communityId}",encodeURIComponent(_5e));
var p=this._getListOptions(opt);
return url+lconn.share.util.uri.writeParameters(p);
},getCommunityOwnCollectionsServiceUrl:function(_5f,opt){
var url=this._getSB("communitycollection/{communityId}/feed",opt);
url=url.replace("{communityId}",encodeURIComponent(_5f));
var p=this._getListOptions(opt);
if(opt){
if(opt.collectionAcls){
p.collectionAcls=true;
}
if(opt.libraryAcls){
p.libraryAcls=true;
}
if(opt.role){
p.access=opt.role;
}
if(opt.type){
p.type=opt.type;
}
if(opt.search){
p.title=opt.search;
}
if(opt.category){
p.category=opt.category;
}
}
return url+lconn.share.util.uri.writeParameters(p);
},getFileModerationReportUrl:function(opt){
var url=this._getSB("reports",opt);
return url;
},getCommunitiesBaseUrl:function(){
if(dojo.getObject("lconn.share.config.services.connections.enabled.communities")){
return dojo.getObject("lconn.share.config.services.connections.uri.communities");
}else{
return null;
}
},getCommunityUrl:function(_60){
var _61=this.getCommunitiesBaseUrl();
if(_61){
return _61+"/service/html/communityview?communityUuid="+_60;
}else{
return null;
}
},getFileSummaryUrl:function(_62,_63,opt){
if(!_62){
return this._app+"/file/"+encodeURIComponent(_63)+this.getQueryString(opt);
}
return this._getPersonRoot(_62)+"/file/"+encodeURIComponent(_63)+this.getQueryString(opt);
},generateActionIcon:function(img,_64,_65){
_65=_65||16;
img.src=dojo.config.blankGif;
img.className=lconn.core.utilities.getGridActionClass("."+_64,_65);
},getFilesACLValidationURL:function(_66,_67,opt){
var url=this._getUSB(_66,"document/{fileId}/entry",opt);
url=url.replace("{fileId}",encodeURIComponent(_67));
return url;
},getDeletedFilesUrl:function(_68,opt){
return this._app+"/trash";
},getInvitePageUrl:function(_69){
return _69+"/subscribers/inviteGuests/input";
},getBasePath:function(){
return this._basePath||this._comPath;
},getInvitePostbackUrl:function(_6a){
var url=this._baseFull+"form/api/provision/share";
return url+this._getNormalizedReturnQuery(_6a);
},getInviteReturnUrl:function(_6b,_6c,_6d){
var url=this._appFull+"/invited/"+encodeURIComponent(_6c);
return url+this._getNormalizedReturnQuery(_6b,{c:!!_6d});
},_getNormalizedReturnQuery:function(rs,opt){
rs=rs||"";
opt=opt||{};
var _6e=lconn.core.url.parse(window.location.href).queryParameters||{};
var _6f=dojo.mixin({},_6e);
for(var p in _6f){
_6f[p]=null;
}
var _70=dojo.mixin(_6f,opt);
var _71={rs:lconn.core.url.rewrite(rs,_70)};
dojo.mixin(_71,_6e);
return this.getQueryString(_71);
},getRoundTripEditingUrl:function(_72,opt){
var _73=lconn.core.url.getServiceUrl(lconn.core.config.services.deploymentConfig).uri;
_73=_73.substring(0,_73.lastIndexOf("/")+1);
return "ibmscp://com.ibm.connections/files?uid="+_72+"&action=Open&accountserver="+_73;
},getUserChannelUrl:function(_74,opt){
var _75=(dojo.getObject("lconn.share.config.baseUri")||"/")+"app/person/"+encodeURIComponent(_74);
var p={};
var _76=this.maxTagFilters;
if(opt){
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
if(dojo.isArray(opt.tag)&&opt.tag.length>_76&&_76>=1){
p.tag=opt.tag.slice(0,_76-1).concat([opt.tag[opt.tag.length-1]]);
}else{
p.tag=opt.tag;
}
}
if(opt.date){
p.date=opt.date;
}
}
return _75+this.getQueryString(p);
}});
}


;if(!dojo._hasResource["lconn.files.FilesRoutes"]){
dojo._hasResource["lconn.files.FilesRoutes"]=true;
dojo.provide("lconn.files.FilesRoutes");














dojo.declare("lconn.files.FilesRoutes",[lconn.files.FilesServiceRoutes],{_root:"app",constructor:function constructor(_1,_2){
this._base=(dojo.getObject("lconn.share.config.baseUri")||"/");
this._baseFull=dojo.getObject("lconn.share.config.applicationUri");
var _3=lconn.share.util.uri.parseUri(this._base);
this._static=lconn.share.config.baseStaticUri;
this._basePath=_3.path;
this._app=this._base+this._root;
this._appFull=this._baseFull+this._root;
this._basic=dojo.getObject("lconn.share.config.services.basic.auth");
this._basicAnon=dojo.getObject("lconn.share.config.services.basic.anon");
this._form=dojo.getObject("lconn.share.config.services.form.auth");
this._formAnon=dojo.getObject("lconn.share.config.services.form.anon");
this.lang=_1;
this.globalParameters=_2;
this.maxTagFilters=dojo.getObject("lconn.files.config.services.maxTagFilters")||3;
},getAppPath:function(){
return this._basePath+this._root;
},getServletRoot:function(){
return this._root;
},getHomeUrl:function(){
return dojo.getObject("lconn.share.config.homeUri");
},getUrlToUser:function(_4,_5){
var _5=_5||{};
if(dojo.isArray(_4)){
_4=_4[0];
}
var _6=(typeof _4=="object")?_4.id:_4;
if(dojo.getObject("lconn.core.config.services")&&!_5.forceUserFiles){
var _7=lconn.core.config.services.profiles;
if(_7){
var _8=com.ibm.oneui.util.Url.secure;
var _9=com.ibm.social.incontext.util.url;
var _a=lconn.core.url.getServiceUrl(_7,_8).uri;
return _9.rewrite(_a+"/html/profileView.do",{userid:_6});
}
}
return this.getUserChannelUrl(_6,_5);
},_getUserChannelUrlTemplate:function(_b){
return this._app+"/person/"+_b;
},getPersonalUserChannelUrl:function(){
var _c=this._app+"/personal";
return _c+this.getQueryString();
},getFavoriteCollectionsUrl:function(){
var _d=this._app+"/folders/pinned";
return _d+this.getQueryString();
},getFavoriteFilesUrl:function(_e){
var _f=this._app+"/pinnedfiles";
var p={};
var _10=this.maxTagFilters;
if(_e){
if(_e.type){
p.type=_e.type;
}
if(_e.page&&_e.page>1){
p.page=_e.page;
}
if(_e.sort&&_e.sort!="updated"){
p.sort=_e.sort;
}
if(_e.sortReversed){
p.reverse="1";
}
if(_e.search){
p.search=_e.search;
}
if(dojo.indexOf(["public","private","shared"],_e.sharing)!=-1){
p.sharing=_e.sharing;
}
if(_e.tag){
if(dojo.isArray(_e.tag)&&_e.tag.length>_10&&_10>=1){
p.tag=_e.tag.slice(0,_10-1).concat([_e.tag[_e.tag.length-1]]);
}else{
p.tag=_e.tag;
}
}
if(_e.date){
p.date=_e.date;
}
}
return _f+this.getQueryString(p);
},getFileSyncUrl:function(opt){
var _11=this._app+"/filesync";
var p={};
var _12=this.maxTagFilters;
if(opt){
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
},getUserSharesUrl:function(opt){
var _13=this._app+"/shares";
var p={};
var _14=this.maxTagFilters;
if(opt){
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
if(dojo.isArray(opt.tag)&&opt.tag.length>_14&&_14>=1){
p.tag=opt.tag.slice(0,_14-1).concat([opt.tag[opt.tag.length-1]]);
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
return _13+this.getQueryString(p);
},getPersonalDeletedFilesUrl:function(opt){
return this.getDeletedFilesUrl(null,opt);
},getDeletedFilesUrl:function(_15,opt){
var _16=this._app+"/trash";
if(_15){
_16+="/"+encodeURIComponent(_15);
}
var p={};
if(opt){
if(opt.page&&opt.page>1){
p.page=opt.page;
}
if(opt.sort&&opt.sort!="deleted"){
p.sort=opt.sort;
}
if(opt.sortReversed){
p.reverse="1";
}
}
return _16+this.getQueryString(p);
},getAllFilesSearchUrl:function(opt){
var _17=this._app+"/search";
var p={};
var _18=this.maxTagFilters;
if(opt){
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
if(dojo.isArray(opt.tag)&&opt.tag.length>_18&&_18>=1){
p.tag=opt.tag.slice(0,_18-1).concat([opt.tag[opt.tag.length-1]]);
}else{
p.tag=opt.tag;
}
}
if(opt.date){
p.date=opt.date;
}
}
return _17+this.getQueryString(p);
},getCommunityFilesUrl:function(opt){
var _19=this._app+"/communityfiles";
var p={};
var _1a=this.maxTagFilters;
if(opt){
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
if(dojo.isArray(opt.tag)&&opt.tag.length>_1a&&_1a>=1){
p.tag=opt.tag.slice(0,_1a-1).concat([opt.tag[opt.tag.length-1]]);
}else{
p.tag=opt.tag;
}
}
if(opt.date){
p.date=opt.date;
}
}
return _19+this.getQueryString(p);
},getPublicFilesUrl:function(opt){
var _1b=this._app+"/public";
var p={};
var _1c=this.maxTagFilters;
if(opt){
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
if(dojo.isArray(opt.tag)&&opt.tag.length>_1c&&_1c>=1){
p.tag=opt.tag.slice(0,_1c-1).concat([opt.tag[opt.tag.length-1]]);
}else{
p.tag=opt.tag;
}
}
if(opt.date){
p.date=opt.date;
}
}
return _1b+this.getQueryString(p);
},getUserChannelTaggedMediaUrl:function(_1d,tag,opt){
var p=opt||{};
p.tag=(tag)?[tag]:null;
p.pivot=p.pivot||"files";
return this.getUserChannelUrl(_1d,p);
},_getPersonRoot:function(_1e){
return this._app+"/person/"+encodeURIComponent(_1e);
},getCreatePageUrl:function(_1f,opt){
return this._getPersonRoot(_1f)+"/create/richtext"+this.getQueryString(opt);
},getFileEditInlineUrl:function(_20,_21){
if(!_20){
return this._app+"/file/"+encodeURIComponent(_21)+this.getQueryString({edit:"true"});
}
return this._getPersonRoot(_20)+"/file/"+encodeURIComponent(_21)+this.getQueryString({edit:"true"});
},getWelcomeUrl:function(){
return this._app+this.getQueryString();
},getGlobalHomeUrl:function(opt){
return this._app+"/"+this.getQueryString();
},getUserSearchUrl:function(_22,opt){
var p={};
if(_22){
p.usersearch=_22;
}
if(opt){
if(opt.page){
p.page=opt.page;
}else{
if(opt.start){
p.sI=opt.start;
}
}
}
return this._app+"/people"+this.getQueryString(p);
},getFilesSearchUrl:function(_23,opt){
var opt=opt||{};
var p={};
p.search=_23;
if(opt.scope=="withme"){
p.scope=opt.scope;
}
return this._app+"/search"+this.getQueryString(p);
},getConnectionsSearchUrl:function(_24,opt){
var p={};
var _25=dojo.getObject("lconn.share.config.services.connections.uri.search");
var _26=(opt&&opt.advanced)?"/web/jsp/advancedSearch.jsp":"/web/search";
if(_24){
p.query=_24;
}
if(opt&&opt.component){
p.component=opt.component;
}
return _25+_26+lconn.share.util.uri.writeParameters(p||{});
},getStatisticsUrl:function(){
return this._app+"/statistics"+this.getQueryString();
},getAboutUrl:function(){
return this._app+"/about"+this.getQueryString();
},getAuthenticationUrl:function(){
return dojo.getObject("lconn.share.config.services.authenticationUri");
},getLoginUrl:function(s){
var url=dojo.getObject("lconn.share.config.services.loginUri");
var uri=lconn.share.util.uri.parseUri(url);
uri.queryParameters.redirect=s||this.getWelcomeUrl();
url=lconn.share.util.uri.writeUri(uri);
return url;
},getLogoutUrl:function(s){
var url=dojo.getObject("lconn.share.config.services.logoutUri");
var uri=lconn.share.util.uri.parseUri(url);
if(!uri.queryParameters.logoutExitPage){
uri.queryParameters.logoutExitPage=s||this.getWelcomeUrl();
url=lconn.share.util.uri.writeUri(uri);
}
return url;
},getCookiePath:function(){
return this.getAppPath();
},getHelpTopicUrl:function(_27){
var p={topic:_27};
return this._static+"service/tip"+this.getQueryString(p);
},generateFileTypeImage:function(img,_28,_29){
_29=_29||16;
img.src=dojo.config.blankGif;
img.className=lconn.core.utilities.getFileIconClassName("."+_28,_29);
},getInvitePostbackUrl:function(_2a){
var url=this._baseFull+"form/api/provision/share";
return url+this._getNormalizedReturnQuery(_2a);
},getInviteReturnUrl:function(_2b,_2c,_2d){
var url=this._appFull+"/invited/"+encodeURIComponent(_2c);
return url+this._getNormalizedReturnQuery(_2b,{c:!!_2d});
},_getNormalizedReturnQuery:function(rs,opt){
rs=rs||"";
opt=opt||{};
var _2e=lconn.core.url.parse(window.location.href).queryParameters||{};
var _2f=dojo.mixin({},_2e);
for(var p in _2f){
_2f[p]=null;
}
var _30=dojo.mixin(_2f,opt);
var _31={rs:lconn.core.url.rewrite(rs,_30)};
dojo.mixin(_31,_2e);
return this.getQueryString(_31);
}});
}


;if(!dojo._hasResource["lconn.files.util.Messages"]){
dojo._hasResource["lconn.files.util.Messages"]=true;
dojo.provide("lconn.files.util.Messages");


dojo.declare("lconn.files.util.Messages",null,{constructor:function(){
this.messages=[];
this.factories=[];
},addFactory:function(o){
if(o&&typeof o.get=="function"){
this.factories.push(o);
}
},getFactory:function(id){
for(var i=0;i<this.factories.length;i++){
if(this.factories[i].id==id){
return this.factories[i];
}
}
return null;
},getMessages:function(){
var _1=[];
for(var i=0;i<this.factories.length;i++){
_1=_1.concat(this.factories[i].get());
}
_1=dojo.filter(_1,this.onlyVisible);
this.messages=dojo.filter(this.messages,this.onlyVisible);
return _1.concat(this.messages);
},onlyVisible:function(m){
if(m.closed){
return false;
}
m.visible=true;
return true;
},_deferSingle:function(m){
if(m.canClose!==false){
m.canClose=true;
}
this.messages.push(m);
},defer:function(m){
if(!m){
return;
}
if(dojo.isArray(m)){
dojo.forEach(m,this._deferSingle,this);
}else{
this._deferSingle(m);
}
},_addSingle:function(m){
if(m.canClose!==false){
m.canClose=true;
}
m._added=new Date().getTime();
return m;
},add:function(m){
if(!m){
return;
}
if(dojo.isArray(m)){
var _2=dojo.map(m,this._addSingle,this);
this.messages=_2;
this.onClear();
dojo.forEach(_2,this.onNew,this);
}else{
this._addSingle(m);
this.messages=[m];
this.onClear();
this.onNew(m);
}
},resetVisible:function(){
this.messages=dojo.filter(this.messages,function(m){
return !m.visible||m._preventClose;
});
},onNew:function(m){
m.visible=true;
},onClear:function(){
}});
}


;if(!dojo._hasResource["lconn.files.util.QuotaCache"]){
dojo._hasResource["lconn.files.util.QuotaCache"]=true;
dojo.provide("lconn.files.util.QuotaCache");


dojo.declare("lconn.files.util.QuotaCache",null,{lastUpdate:-1,expiration:300000,net:null,url:null,size:NaN,trashSize:NaN,totalSize:NaN,constructor:function(_1){
dojo.mixin(this,_1);
},update:function(_2,_3,_4){
clearTimeout(this._lhd);
this._lhd=null;
this.lastUpdate=new Date().getTime();
this.size=_2;
this.totalSize=_3;
this.trashSize=_4;
this.isLoaded=true;
this.onUpdate(_2,_3,_4);
},isExpired:function(){
return (!this.isLoaded||(new Date().getTime()-this.expiration)>this.lastUpdate);
},expire:function(){
this.lastUpdate=-1;
this.size=this.totalSize=this.trashSize=NaN;
var _5=lconn.share.util.misc;
if(_5.hasListeners(this.onUpdate)||_5.hasListeners(this.onError)){
this.loadAfterDelay();
}
},loadAfterDelay:function(){
if(!this._lhd){
this._lhd=setTimeout(dojo.hitch(this,"load"),3000);
}
},load:function(){
if(this.loading){
return;
}
clearTimeout(this._lhd);
this._lhd=null;
this.isLoaded=false;
this.loading=true;
this.net.getXml({url:this.url,background:true,auth:{preventReload:true},handle:dojo.hitch(this,"handleLoad")});
},handleLoad:function(_6,_7){
if(_6 instanceof Error){
this.onError(_6);
return;
}
var _8=new lconn.share.bean.Library(_6.documentElement);
this.libraryId=_8.getId();
this.update(_8.getSize(),_8.getQuota(),_8.getTrashSize());
this.loading=false;
},changeSize:function(_9){
if(!isNaN(this.size)){
this.size+=_9;
this.onUpdate(this.size,this.totalSize,this.trashSize);
}
},onUpdate:function(_a,_b,_c){
},onError:function(_d){
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


;if(!dojo._hasResource["lconn.files.service.FileColumns"]){
dojo._hasResource["lconn.files.service.FileColumns"]=true;
dojo.provide("lconn.files.service.FileColumns");
dojo.declare("lconn.files.service.FileColumns",null,{COLUMNS:[{id:"select",name:"",type:"select",wf:0,vis:true,locked:true},{id:"fileIcon",name:"",type:"fileIcon",wf:0,vis:true,locked:true},{id:"name",type:"fileName",wf:-1,vis:true,locked:true,header:true},{id:"contextMenu",name:"",type:"contextMenu",wf:0,vis:true,locked:true},{id:"added",type:"date",accessor:"getPublished",wf:2,i:5},{id:"addedBy",type:"person",accessor:"getAuthor",wf:3,i:6},{id:"modified",type:"date",accessor:"getUpdated",wf:2,i:2},{id:"modifiedBy",type:"person",accessor:"getModifier",wf:3,i:3},{id:"shared",type:"date",accessor:"getShared",wf:2,x:true,i:24},{id:"sharedBy",type:"person",accessor:"getSharedBy",wf:3,x:true,i:25},{id:"collected",type:"date",accessor:"getAdded",wf:2,x:true,i:20},{id:"collectedBy",type:"person",accessor:"getAddedBy",wf:3,x:true,i:21},{id:"deleted",type:"date",accessor:"getDeleted",wf:2,x:true,locked:true},{id:"deletedBy",type:"person",accessor:"getDeletedBy",wf:3,x:true,locked:true},{id:"communityShared",type:"date",accessor:"getAdded",wf:2,x:true,ref:"shared"},{id:"communitySharedBy",type:"person",accessor:"getAddedBy",wf:3,x:true,ref:"sharedBy"},{id:"systemModified",type:"date",accessor:"getSystemLastModified",wf:2,i:4},{id:"peopleShared",type:"number",accessor:"getShareCount",wf:2,i:7},{id:"comments",type:"number",accessor:"getCommentCount",wf:2,i:9},{id:"recommendations",type:"number",accessor:"getRatingCount",wf:2,i:10},{id:"downloads",type:"number",accessor:"getTimesDownloaded",wf:2,i:11},{id:"version",type:"number",accessor:"getVersionLabel",wf:2,i:12,contentsRelated:true},{id:"size",type:"size",accessor:"getSize",wf:2,i:14,contentsRelated:true},{id:"totalSize",type:"size",accessor:"getTotalSize",wf:2,i:15,contentsRelated:true},{id:"description",type:"description",accessor:"getDescription",i:17},{id:"encryption",type:"bool",accessor:"isEncrypted",wf:2,i:18,disable:function(){
return !dojo.getObject("lconn.files.config.features.encryption");
}},{id:"lock",name:"",type:"lock",wf:1,i:19},{id:"favorites",name:"",type:"favorites",wf:1,vis:true,locked:true},{id:"privacy",type:"privacy",wf:1,vis:true,locked:true}],LIBRARY_SORTABLE:{name:{sK:"label",lth:true},size:{sK:"length"},totalSize:{sK:"totalMediaSize"},added:{sK:"created"},modified:{sK:"modified"},systemModified:{sK:"updated"},comments:{sK:"commented"},recommendations:{sK:"recommended"},downloads:{sK:"downloaded"}},LIBRARY_DEFAULTS:{modified:1,downloads:1,size:1},SHAREDWITH_SORTABLE:{name:{sK:"label",lth:true},size:{sK:"length"},totalSize:{sK:"totalMediaSize"},added:{sK:"created"},modified:{sK:"modified"},comments:{sK:"commented"},recommendations:{sK:"recommended"},downloads:{sK:"downloaded"},shared:{sK:"created",sC:"docshare"}},SHAREDWITH_EXCLUDE:{tags:1},SHAREDWITH_DEFAULTS:{shared:1,sharedBy:1,downloads:1,size:1},SHAREDBY_SORTABLE:{name:{sK:"label",lth:true},size:{sK:"length"},totalSize:{sK:"totalMediaSize"},added:{sK:"created"},modified:{sK:"modified"},comments:{sK:"commented"},recommendations:{sK:"recommended"},downloads:{sK:"downloaded"},shared:{sK:"created",sC:"docshare"}},SHAREDBY_EXCLUDE:{tags:1},SHAREDBY_DEFAULTS:{shared:1,downloads:1,size:1},COLLECTION_SORTABLE:{collected:{sK:"added"},name:{sK:"label",sC:"document",lth:true},size:{sK:"length",sC:"document"},added:{sK:"created",sC:"document"},modified:{sK:"modified",sC:"document"},systemModified:{sK:"updated",sC:"document"},comments:{sK:"commented",sC:"document"},recommendations:{sK:"recommended",sC:"document"},downloads:{sK:"downloaded",sC:"document"}},COLLECTION_EXCLUDE:{tags:1},COLLECTION_DEFAULTS:{collected:1,collectedBy:1,downloads:1,size:1},COMMUNITYSHARED_SORTABLE:{communityShared:{sK:"added"},name:{sK:"label",sC:"document",lth:true},size:{sK:"length",sC:"document"},added:{sK:"created",sC:"document"},modified:{sK:"modified",sC:"document"},systemModified:{sK:"updated",sC:"document"},comments:{sK:"commented",sC:"document"},recommendations:{sK:"recommended",sC:"document"},downloads:{sK:"downloaded",sC:"document"}},COMMUNITYSHARED_EXCLUDE:{tags:1},COMMUNITYSHARED_DEFAULTS:{communityShared:1,communitySharedBy:1,downloads:1,size:1},PUBLIC_SORTABLE:{added:{sK:"created"},comments:{sK:"commented"},recommendations:{sK:"recommended"},downloads:{sK:"downloaded"}},PUBLIC_DEFAULTS:{added:1,downloads:1,size:1},SEARCH_SORTABLE:{name:{sK:"label",lth:true},modified:{sK:"modified"},comments:{sK:"commented"},recommendations:{sK:"recommended"},downloads:{sK:"downloaded"}},SEARCH_DEFAULTS:{modified:1,downloads:1,size:1},DELETED_SORTABLE:{name:{sK:"label",lth:true},totalSize:{sK:"totalMediaSize"},deleted:{sK:"updated"}},DELETED_DEFAULTS:{deleted:1,totalSize:1},DELETED_EXCLUDE:{select:1},constructor:function(_1){
this.nls=_1;
},init:function(){
if(this.byId){
return;
}
var _2=this.nls;
var _3=this.COLUMNS;
var _4=this.DEFAULTS={};
var _5=this.defaultOrder=[];
var _6=this.byId={};
var _7=this._bitMapping=[];
for(var i=0,_8;_8=_3[i];i++){
if(_8.disable&&_8.disable()){
continue;
}
var id=_8.id;
_6[id]=_8;
_5.push(id);
var _9=id.toUpperCase();
if(!_8.name&&_8.name!=""){
_8.name=_2[_9]||("!"+_9);
}
if(!_8.fullName&&_8.fullName!=""){
_8.fullName=_2[_9+"_M"]||_8.name;
}
if(!_8.tooltip&&_8.tooltip!=""){
_8.tooltip=_2[_9+"_L"]||_8.fullName;
}
if(_8.i>=0){
if(_7[_8.i]){
throw "Duplicate bits are used";
}
_7[_8.i]=id;
}
if(_8.vis){
_4[id]=1;
}
}
for(var _a in this){
if(/_DEFAULTS$/.exec(_a)&&typeof this[_a]=="object"){
var _b=this[_a];
for(var id in _b){
_4[id]=1;
}
}
}
},getSerialization:function(){
this.init();
return this._bitMapping;
},getOrInitColumns:function(c,_c,_d,_e,_f){
var _10=this[c];
if(_10){
return _10;
}
this.init();
if(typeof _c=="string"){
var t=_c;
_c=this[t+"_SORTABLE"];
_d=_d||this[t+"_INCLUDE"]||{};
_e=_e||this[t+"_EXCLUDE"]||{};
_f=_f||this[t+"_DEFAULTS"];
}
_10=[];
var arr=this.defaultOrder;
var _11=this.byId;
for(var i=0,id;id=arr[i];i++){
if(_e&&_e[id]){
continue;
}
var col=_11[id];
if(col.x&&!col.vis&&!_d[id]&&!_f[id]){
continue;
}
col=dojo.clone(col);
var s=_c[id];
if(s){
col.isSortable=true;
col.sK=s.sK||id;
col.lowToHigh=s.lth;
col.sC=s.sC;
}
if(col.vis||_f[id]){
col.isDefault=true;
}
_10.push(col);
}
this[c]=_10;
return _10;
},getLibraryFeed:function(){
return this.getOrInitColumns("_lf","LIBRARY");
},getCollectionFeed:function(){
return this.getOrInitColumns("_cf","COLLECTION");
},getPublicFeed:function(){
return this.getOrInitColumns("_pf","PUBLIC");
},getSearchFeed:function(){
return this.getOrInitColumns("_sf","SEARCH");
},getSharedWithMeFeed:function(){
return this.getOrInitColumns("_swmf","SHAREDWITH");
},getSharedByMeFeed:function(){
return this.getOrInitColumns("_sbmf","SHAREDBY");
},getCommunitySharedFeed:function(){
return this.getOrInitColumns("_csf","COMMUNITYSHARED");
},getDeletedFeed:function(){
return this.getOrInitColumns("_df","DELETED");
},getColumns:function(){
this.init();
return [].concat(this.COLUMNS);
},getDefaults:function(){
this.init();
return dojo.mixin({},this.DEFAULTS);
},deserialize:function(_12){
var set;
if(_12>0){
set={};
var _13=this.getSerialization();
for(var i=0,c=_13.length;i<c;i++){
var id=_13[i];
if(id&&_12&(1<<i)){
set[id]=1;
}
}
}
return set;
},serialize:function(_14){
var _15=0;
if(_14){
var _16=this.getSerialization();
for(var i=0,c=_16.length;i<c;i++){
var id=_16[i];
if(_14[id]){
_15|=(1<<i);
}
}
}
return _15;
}});
}


;if(!dojo._hasResource["lconn.share.widget.PeopleDataStore"]){
dojo._hasResource["lconn.share.widget.PeopleDataStore"]=true;
dojo.provide("lconn.share.widget.PeopleDataStore");


dojo.declare("lconn.share.widget.PeopleDataStore",null,{constructor:function(_1,_2){
dojo.mixin(this,_1);
this.queryParam=(_1.queryParam?_1.queryParam:_2.getAttribute("queryParam"));
this.clear();
},minChars:dojo.getObject("lconn.share.config.services.peopleSearch.minChars")||2,searchDelay:dojo.getObject("lconn.share.config.services.peopleSearch.searchDelay")||400,getSearchDelay:function(_3){
_3=_3.toLowerCase();
var _4=0;
if(this.fastCache[_3]){
_4=0;
}else{
if(this.networkUrl&&_3.length<=this.minChars){
_4=0;
}else{
_4=this.searchDelay;
}
}
return _4;
},shouldStartSearch:function(_5){
_5=_5.toLowerCase();
if(this.fastCache[_5]||this.networkUrl){
return true;
}
return undefined;
},queryParam:"",maxResults:100,pageSize:25,fastCache:[],dirCache:[],bothCache:[],clear:function(){
this.fastCache=[];
this.dirCache=[];
this.bothCache=[];
delete this.networkCache;
},fetch:function(_6){
var _7={};
var _8;
var _9=((_6.searchDirectory||_6.queryOptions.searchDirectory)?true:false);
var _a=(_6.queryOptions.searchBoth?true:false);
if(_a){
_8=this.bothCache;
}else{
if(_9){
_8=this.dirCache;
}else{
_8=this.fastCache;
}
}
var _b=_6.start||1;
var _c=this.pageSize;
if(_6.count&&_6.count!=Infinity){
if(_a||_9){
_c=(_6.count+1);
}else{
_c=_6.count;
}
}
var _d=_6.query.toLowerCase();
var _e=(lconn.share.util.text.lengthUtf8(_6.query)>=this.minChars);
_6.hideEmptyResults=!_e;
var _f=_d;
var _10=(_e)?_8[_f]:this.networkCache;
if(_10){
_6.searchType=_e?_10.searchType:"directory";
if(_6.onComplete){
_6.onComplete(this.mergeData(_d,this.networkCache,_10,_b,_c),_6);
}
return _6;
}
if(this.queryParam){
_7[this.queryParam]=_6.query;
}
if(this.orgId){
_7.orgId=this.orgId;
}
if(_a){
_7.searchType=["fastlist","directory"];
}else{
if(_9){
_7.searchType="directory";
}else{
_7.searchType="fastlist";
}
}
if(typeof this.anonymous=="undefined"){
this.anonymous=true;
}
var url=_e?(this.url||this.getUrl(null,{anonymous:this.anonymous})):this.networkUrl;
if(url==null){
console.log("No URL available to call, complete immediately");
if(_6.onError){
_6.onError();
}
return _6;
}
if(_e){
_7.pageSize=this.maxResults;
url=lconn.share.util.uri.rewriteUri(url,{pageSize:null,searchType:null});
if(this.internalOnly){
url=lconn.share.util.uri.rewriteUri(url,{internalOnly:this.internalOnly});
}
}
var _11=this;
this.net.getJson({url:url,content:_7,timeout:5000,noStatus:true,background:true,auth:{secured:false},handle:dojo.hitch(this,function(_12,_13){
if(_12 instanceof Error){
console.log("There was an error");
return;
}
dojo.map(_12.items,function(_14){
_14.userid=_14.id;
_14.type=_14.userState=="active"?"0":"1";
});
if(_e){
_8[_f]=_12;
_12.isServerQuery=_e;
}else{
if(_11.activeOnly){
_12.items=dojo.filter(_12.items,function(i){
return !(i.userState=="inactive");
});
}
_11.networkCache=_12;
}
_6.searchType=_e?_12.searchType:"directory";
if(_6.onComplete){
var _15=_11.mergeData(_d,_11.networkCache,_12,_b,_c);
_6.onComplete(_15,_6);
}
})});
return _6;
},mergeData:function(_16,_17,_18,_19,_1a){
var _1b=[];
var _1c={};
this.filter(_16,_17,_1b,_1c);
if(_18.isServerQuery){
dojo.forEach(_18.items,function(_1d){
if(!_1c[_1d.id]){
_1b.push(_1d);
_1c[_1d.id]=1;
}
});
}
return _1b.slice(_19-1,_19-1+_1a);
},filter:function(_1e,_1f,_20,_21){
var _20=_20||[];
var _21=_21||{};
if(_1f){
var _22=_1e.split(/[\s\u3000",\(\[]+/i);
dojo.forEach(_1f.items,function(_23){
if(!_23.searchText){
_23.searchText=" ";
_23.searchText+=_23.name?(_23.name.toLowerCase()+" "):"";
_23.searchText+=_23.email?(_23.email.toLowerCase()+" "):"";
_23.searchText+=_23.id?(_23.id.toLowerCase()+" "):"";
_23.searchText=_23.searchText.replace(/[\s\u3000",\(\[]+/g,"\n");
}
for(var i=0;i<_22.length;i++){
if(_23.searchText.indexOf("\n"+_22[i])==-1){
return;
}
}
_21[_23.id]=1;
_20.push(_23);
});
}
return _20;
},getValue:function(_24,_25,_26){
if(_24[_25]){
return _24[_25];
}else{
return _26;
}
},getIdentity:function(_27){
return _27.id;
}});
}


;if(!dojo._hasResource["lconn.files.util.CollectionDataStore"]){
dojo._hasResource["lconn.files.util.CollectionDataStore"]=true;
dojo.provide("lconn.files.util.CollectionDataStore");


dojo.declare("lconn.files.util.CollectionDataStore",[lconn.files.util.DataStore],{_getCacheKey:function(_1){
var _2=this.inherited(arguments)+"\n"+(_1.queryOptions.type||"")+"\n"+(_1.queryOptions.visibility||"")+"\n"+(_1.queryOptions.shared||"")+"\n"+(_1.queryOptions.role||"");
return _2;
},_getParams:function(_3){
var _4=this.inherited(arguments);
_4.format="json";
_4.type=_3.queryOptions.type;
_4.visibility=_3.queryOptions.visibility;
_4.shared=_3.queryOptions.shared;
_4.role=_3.queryOptions.role;
return _4;
}});
}


;if(!dojo._hasResource["lconn.files.util.TagDataStore"]){
dojo._hasResource["lconn.files.util.TagDataStore"]=true;
dojo.provide("lconn.files.util.TagDataStore");






dojo.declare("lconn.files.util.TagDataStore",[lconn.files.util.DataStore],{PERSONAL_FILES_TAGS_URL:"/atom/mysearch/facets/tags?components=files",PUBLIC_FILES_TAGS_URL:"/atom/search/facets/tags?components=files",constructor:function(_1,_2){
this.inherited(arguments);
this.isCloudMode=dojo.getObject("lconn.files.config.isCloudMode");
this.searchBase=dojo.getObject("lconn.files.config.services.connections.uri.search");
this.app=_1.app;
},isRelatedTagsDisabled:function(_3){
return _3.isFavorite||_3.sharedByUserId||!this.useSearchAPI(_3);
},_getCacheKey:function(_4){
var _5=[];
_5.push(this.inherited(arguments));
_5.push(_4.queryOptions.libraryId||"");
_5.push(_4.queryOptions.userLibrary||"");
if(this.useSearchAPI(_4)){
_5.push("isPublic="+!!_4.queryOptions.isPublic);
_5.push("userId="+(_4.queryOptions.userId||""));
_5.push("sharedWithUserId="+(_4.queryOptions.sharedWithUserId||""));
_5.push("type="+(_4.queryOptions.type||""));
_5.push("queryFilter="+(_4.queryOptions.queryFilter||""));
_5.push("tagsFilter="+(_4.queryOptions.tagsFilter||[]).join("&"));
}
return _5.join("\n");
},_getParams:function(_6){
var _7=this.inherited(arguments);
var _8=_6.queryOptions.libraryId;
var _9=_6.queryOptions.userLibrary;
if(_8){
_7.libraryId=_8;
}
if(_9){
_7.userId=_7.userLibrary=_9;
}
_7.isPublic=!!_6.queryOptions.isPublic;
_7.isFavorite=!!_6.queryOptions.isFavorite;
if(!_7.userId&&_6.queryOptions.userId){
_7.userId=_6.queryOptions.userId;
}
var _a=_6.queryOptions.sharedWithUserId;
if(_a){
_7.sharedWithUserId=_a;
}
var _b=_6.queryOptions.sharedByUserId;
if(_b){
_7.sharedByUserId=_b;
}
var _c=_6.queryOptions.type;
if(_c){
_7.type=_c;
}
var _d=_6.queryOptions.queryFilter;
if(_d){
_7.queryFilter=_d;
}
var _e=_6.queryOptions.tagsFilter;
if(_e){
_7.tagsFilter=_e;
}
return _7;
},useSearchAPI:function(_f){
var _10=false;
if(_f.tag){
_10=false;
}else{
if(this.isCloudMode){
if(_f.userId){
if(_f.queryFilter||_f.tagsFilter){
_10=true;
}
}else{
_10=true;
}
}
}
return _10;
},getTagsEndpoint:function(_11){
var _12=this.searchBase;
if(this.app.isAuthenticated()&&(!_11.isPublic||this.isCloudMode)){
_12+=this.PERSONAL_FILES_TAGS_URL;
}else{
_12+=this.PUBLIC_FILES_TAGS_URL;
}
var _13={};
if(_11.userId){
_13.userid=_11.userId;
}
if(_11.sharedWithUserId){
_13.fieldvalue="sharedWithUser:"+_11.sharedWithUserId;
}
if(_11.sharedByUserId){
}
if(_11.type){
if(_11.type=="personalFiles"){
_13.parent="none";
}else{
if(_11.type=="communityFiles"){
_13.parent="communities";
}
}
}
if(_11.isPublic&&this.app.isAuthenticated()){
var _14=this.app.authenticatedUser.orgId;
_13.constraint=dojo.toJson({"type":"field","id":"$access:control$","values":[_14]});
}
if(_11.queryFilter){
_13.query=_11.queryFilter;
}
if(_11.tagsFilter){
_13.tag=_11.tagsFilter;
}
return lconn.core.url.rewrite(_12,_13);
},_getResponseItems:function(_15,_16,_17){
if(this.useSearchAPI(_17)){
var xml=_15.documentElement;
var _18=lconn.share.util.dom.getElementsByTagNameNS(xml,"category",lconn.share.util.dom.NAMESPACES.ATOM);
var _19=dojo.map(_18,function(_1a){
return {name:_1a.getAttribute("term"),weight:lconn.share.util.dom.getAttributeNS(_1a,"frequency",lconn.share.util.dom.SNX_NAMESPACE)};
});
return _19;
}
return this.inherited(arguments);
},fetch:function(_1b){
var _1c={};
var _1d=this.cache;
var _1e=this._getCacheKey(_1b);
if(_1d[_1e]){
_1b.onComplete(_1d[_1e],_1b);
return _1b;
}
var _1c=this._getParams(_1b);
if(this.useSearchAPI(_1c)){
this.getXml(_1b,_1c,_1d,_1e);
}else{
this.getJson(_1b,_1c,_1d,_1e);
}
return _1b;
},getXml:function(_1f,_20,_21,_22){
var url=this.getTagsEndpoint(_20);
this.net.getXml({url:url,noStatus:true,background:true,auth:{preventLogin:true},handle:dojo.hitch(this,this.handleResponse,_1f,_21,_22,_20)});
}});
}


;define("dojo/data/ItemFileReadStore",["../_base/kernel","../_base/lang","../_base/declare","../_base/array","../_base/xhr","../Evented","./util/filter","./util/simpleFetch","../date/stamp"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){
var _a=_3("dojo.data.ItemFileReadStore",[_6],{constructor:function(_b){
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=[];
this._loadFinished=false;
this._jsonFileUrl=_b.url;
this._ccUrl=_b.url;
this.url=_b.url;
this._jsonData=_b.data;
this.data=null;
this._datatypeMap=_b.typeMap||{};
if(!this._datatypeMap["Date"]){
this._datatypeMap["Date"]={type:Date,deserialize:function(_c){
return _9.fromISOString(_c);
}};
}
this._features={"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
this._itemsByIdentity=null;
this._storeRefPropName="_S";
this._itemNumPropName="_0";
this._rootItemPropName="_RI";
this._reverseRefMap="_RRM";
this._loadInProgress=false;
this._queuedFetches=[];
if(_b.urlPreventCache!==undefined){
this.urlPreventCache=_b.urlPreventCache?true:false;
}
if(_b.hierarchical!==undefined){
this.hierarchical=_b.hierarchical?true:false;
}
if(_b.clearOnClose){
this.clearOnClose=true;
}
if("failOk" in _b){
this.failOk=_b.failOk?true:false;
}
},url:"",_ccUrl:"",data:null,typeMap:null,clearOnClose:false,urlPreventCache:false,failOk:false,hierarchical:true,_assertIsItem:function(_d){
if(!this.isItem(_d)){
throw new Error(this.declaredClass+": Invalid item argument.");
}
},_assertIsAttribute:function(_e){
if(typeof _e!=="string"){
throw new Error(this.declaredClass+": Invalid attribute argument.");
}
},getValue:function(_f,_10,_11){
var _12=this.getValues(_f,_10);
return (_12.length>0)?_12[0]:_11;
},getValues:function(_13,_14){
this._assertIsItem(_13);
this._assertIsAttribute(_14);
return (_13[_14]||[]).slice(0);
},getAttributes:function(_15){
this._assertIsItem(_15);
var _16=[];
for(var key in _15){
if((key!==this._storeRefPropName)&&(key!==this._itemNumPropName)&&(key!==this._rootItemPropName)&&(key!==this._reverseRefMap)){
_16.push(key);
}
}
return _16;
},hasAttribute:function(_17,_18){
this._assertIsItem(_17);
this._assertIsAttribute(_18);
return (_18 in _17);
},containsValue:function(_19,_1a,_1b){
var _1c=undefined;
if(typeof _1b==="string"){
_1c=_7.patternToRegExp(_1b,false);
}
return this._containsValue(_19,_1a,_1b,_1c);
},_containsValue:function(_1d,_1e,_1f,_20){
return _4.some(this.getValues(_1d,_1e),function(_21){
if(_21!==null&&!_2.isObject(_21)&&_20){
if(_21.toString().match(_20)){
return true;
}
}else{
if(_1f===_21){
return true;
}
}
});
},isItem:function(_22){
if(_22&&_22[this._storeRefPropName]===this){
if(this._arrayOfAllItems[_22[this._itemNumPropName]]===_22){
return true;
}
}
return false;
},isItemLoaded:function(_23){
return this.isItem(_23);
},loadItem:function(_24){
this._assertIsItem(_24.item);
},getFeatures:function(){
return this._features;
},getLabel:function(_25){
if(this._labelAttr&&this.isItem(_25)){
return this.getValue(_25,this._labelAttr);
}
return undefined;
},getLabelAttributes:function(_26){
if(this._labelAttr){
return [this._labelAttr];
}
return null;
},filter:function(_27,_28,_29){
var _2a=[],i,key;
if(_27.query){
var _2b,_2c=_27.queryOptions?_27.queryOptions.ignoreCase:false;
var _2d={};
for(key in _27.query){
_2b=_27.query[key];
if(typeof _2b==="string"){
_2d[key]=_7.patternToRegExp(_2b,_2c);
}else{
if(_2b instanceof RegExp){
_2d[key]=_2b;
}
}
}
for(i=0;i<_28.length;++i){
var _2e=true;
var _2f=_28[i];
if(_2f===null){
_2e=false;
}else{
for(key in _27.query){
_2b=_27.query[key];
if(!this._containsValue(_2f,key,_2b,_2d[key])){
_2e=false;
}
}
}
if(_2e){
_2a.push(_2f);
}
}
_29(_2a,_27);
}else{
for(i=0;i<_28.length;++i){
var _30=_28[i];
if(_30!==null){
_2a.push(_30);
}
}
_29(_2a,_27);
}
},_fetchItems:function(_31,_32,_33){
var _34=this;
if(this._loadFinished){
this.filter(_31,this._getItemsArray(_31.queryOptions),_32);
}else{
if(this._jsonFileUrl!==this._ccUrl){
_1.deprecated(this.declaredClass+": ","To change the url, set the url property of the store,"+" not _jsonFileUrl.  _jsonFileUrl support will be removed in 2.0");
this._ccUrl=this._jsonFileUrl;
this.url=this._jsonFileUrl;
}else{
if(this.url!==this._ccUrl){
this._jsonFileUrl=this.url;
this._ccUrl=this.url;
}
}
if(this.data!=null){
this._jsonData=this.data;
this.data=null;
}
if(this._jsonFileUrl){
if(this._loadInProgress){
this._queuedFetches.push({args:_31,filter:_2.hitch(_34,"filter"),findCallback:_2.hitch(_34,_32)});
}else{
this._loadInProgress=true;
var _35={url:_34._jsonFileUrl,handleAs:"json-comment-optional",preventCache:this.urlPreventCache,failOk:this.failOk};
var _36=_5.get(_35);
_36.addCallback(function(_37){
try{
_34._getItemsFromLoadedData(_37);
_34._loadFinished=true;
_34._loadInProgress=false;
_34.filter(_31,_34._getItemsArray(_31.queryOptions),_32);
_34._handleQueuedFetches();
}
catch(e){
_34._loadFinished=true;
_34._loadInProgress=false;
_33(e,_31);
}
});
_36.addErrback(function(_38){
_34._loadInProgress=false;
_33(_38,_31);
});
var _39=null;
if(_31.abort){
_39=_31.abort;
}
_31.abort=function(){
var df=_36;
if(df&&df.fired===-1){
df.cancel();
df=null;
}
if(_39){
_39.call(_31);
}
};
}
}else{
if(this._jsonData){
try{
this._loadFinished=true;
this._getItemsFromLoadedData(this._jsonData);
this._jsonData=null;
_34.filter(_31,this._getItemsArray(_31.queryOptions),_32);
}
catch(e){
_33(e,_31);
}
}else{
_33(new Error(this.declaredClass+": No JSON source data was provided as either URL or a nested Javascript object."),_31);
}
}
}
},_handleQueuedFetches:function(){
if(this._queuedFetches.length>0){
for(var i=0;i<this._queuedFetches.length;i++){
var _3a=this._queuedFetches[i],_3b=_3a.args,_3c=_3a.filter,_3d=_3a.findCallback;
if(_3c){
_3c(_3b,this._getItemsArray(_3b.queryOptions),_3d);
}else{
this.fetchItemByIdentity(_3b);
}
}
this._queuedFetches=[];
}
},_getItemsArray:function(_3e){
if(_3e&&_3e.deep){
return this._arrayOfAllItems;
}
return this._arrayOfTopLevelItems;
},close:function(_3f){
if(this.clearOnClose&&this._loadFinished&&!this._loadInProgress){
if(((this._jsonFileUrl==""||this._jsonFileUrl==null)&&(this.url==""||this.url==null))&&this.data==null){
console.debug(this.declaredClass+": WARNING!  Data reload "+" information has not been provided."+"  Please set 'url' or 'data' to the appropriate value before"+" the next fetch");
}
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=[];
this._loadFinished=false;
this._itemsByIdentity=null;
this._loadInProgress=false;
this._queuedFetches=[];
}
},_getItemsFromLoadedData:function(_40){
var _41=false,_42=this;
function _43(_44){
return (_44!==null)&&(typeof _44==="object")&&(!_2.isArray(_44)||_41)&&(!_2.isFunction(_44))&&(_44.constructor==Object||_2.isArray(_44))&&(typeof _44._reference==="undefined")&&(typeof _44._type==="undefined")&&(typeof _44._value==="undefined")&&_42.hierarchical;
};
function _45(_46){
_42._arrayOfAllItems.push(_46);
for(var _47 in _46){
var _48=_46[_47];
if(_48){
if(_2.isArray(_48)){
var _49=_48;
for(var k=0;k<_49.length;++k){
var _4a=_49[k];
if(_43(_4a)){
_45(_4a);
}
}
}else{
if(_43(_48)){
_45(_48);
}
}
}
}
};
this._labelAttr=_40.label;
var i,_4b;
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=_40.items;
for(i=0;i<this._arrayOfTopLevelItems.length;++i){
_4b=this._arrayOfTopLevelItems[i];
if(_2.isArray(_4b)){
_41=true;
}
_45(_4b);
_4b[this._rootItemPropName]=true;
}
var _4c={},key;
for(i=0;i<this._arrayOfAllItems.length;++i){
_4b=this._arrayOfAllItems[i];
for(key in _4b){
if(key!==this._rootItemPropName){
var _4d=_4b[key];
if(_4d!==null){
if(!_2.isArray(_4d)){
_4b[key]=[_4d];
}
}else{
_4b[key]=[null];
}
}
_4c[key]=key;
}
}
while(_4c[this._storeRefPropName]){
this._storeRefPropName+="_";
}
while(_4c[this._itemNumPropName]){
this._itemNumPropName+="_";
}
while(_4c[this._reverseRefMap]){
this._reverseRefMap+="_";
}
var _4e;
var _4f=_40.identifier;
if(_4f){
this._itemsByIdentity={};
this._features["dojo.data.api.Identity"]=_4f;
for(i=0;i<this._arrayOfAllItems.length;++i){
_4b=this._arrayOfAllItems[i];
_4e=_4b[_4f];
var _50=_4e[0];
if(!Object.hasOwnProperty.call(this._itemsByIdentity,_50)){
this._itemsByIdentity[_50]=_4b;
}else{
if(this._jsonFileUrl){
throw new Error(this.declaredClass+":  The json data as specified by: ["+this._jsonFileUrl+"] is malformed.  Items within the list have identifier: ["+_4f+"].  Value collided: ["+_50+"]");
}else{
if(this._jsonData){
throw new Error(this.declaredClass+":  The json data provided by the creation arguments is malformed.  Items within the list have identifier: ["+_4f+"].  Value collided: ["+_50+"]");
}
}
}
}
}else{
this._features["dojo.data.api.Identity"]=Number;
}
for(i=0;i<this._arrayOfAllItems.length;++i){
_4b=this._arrayOfAllItems[i];
_4b[this._storeRefPropName]=this;
_4b[this._itemNumPropName]=i;
}
for(i=0;i<this._arrayOfAllItems.length;++i){
_4b=this._arrayOfAllItems[i];
for(key in _4b){
_4e=_4b[key];
for(var j=0;j<_4e.length;++j){
_4d=_4e[j];
if(_4d!==null&&typeof _4d=="object"){
if(("_type" in _4d)&&("_value" in _4d)){
var _51=_4d._type;
var _52=this._datatypeMap[_51];
if(!_52){
throw new Error("dojo.data.ItemFileReadStore: in the typeMap constructor arg, no object class was specified for the datatype '"+_51+"'");
}else{
if(_2.isFunction(_52)){
_4e[j]=new _52(_4d._value);
}else{
if(_2.isFunction(_52.deserialize)){
_4e[j]=_52.deserialize(_4d._value);
}else{
throw new Error("dojo.data.ItemFileReadStore: Value provided in typeMap was neither a constructor, nor a an object with a deserialize function");
}
}
}
}
if(_4d._reference){
var _53=_4d._reference;
if(!_2.isObject(_53)){
_4e[j]=this._getItemByIdentity(_53);
}else{
for(var k=0;k<this._arrayOfAllItems.length;++k){
var _54=this._arrayOfAllItems[k],_55=true;
for(var _56 in _53){
if(_54[_56]!=_53[_56]){
_55=false;
}
}
if(_55){
_4e[j]=_54;
}
}
}
if(this.referenceIntegrity){
var _57=_4e[j];
if(this.isItem(_57)){
this._addReferenceToMap(_57,_4b,key);
}
}
}else{
if(this.isItem(_4d)){
if(this.referenceIntegrity){
this._addReferenceToMap(_4d,_4b,key);
}
}
}
}
}
}
}
},_addReferenceToMap:function(_58,_59,_5a){
},getIdentity:function(_5b){
var _5c=this._features["dojo.data.api.Identity"];
if(_5c===Number){
return _5b[this._itemNumPropName];
}else{
var _5d=_5b[_5c];
if(_5d){
return _5d[0];
}
}
return null;
},fetchItemByIdentity:function(_5e){
var _5f,_60;
if(!this._loadFinished){
var _61=this;
if(this._jsonFileUrl!==this._ccUrl){
_1.deprecated(this.declaredClass+": ","To change the url, set the url property of the store,"+" not _jsonFileUrl.  _jsonFileUrl support will be removed in 2.0");
this._ccUrl=this._jsonFileUrl;
this.url=this._jsonFileUrl;
}else{
if(this.url!==this._ccUrl){
this._jsonFileUrl=this.url;
this._ccUrl=this.url;
}
}
if(this.data!=null&&this._jsonData==null){
this._jsonData=this.data;
this.data=null;
}
if(this._jsonFileUrl){
if(this._loadInProgress){
this._queuedFetches.push({args:_5e});
}else{
this._loadInProgress=true;
var _62={url:_61._jsonFileUrl,handleAs:"json-comment-optional",preventCache:this.urlPreventCache,failOk:this.failOk};
var _63=_5.get(_62);
_63.addCallback(function(_64){
var _65=_5e.scope?_5e.scope:_1.global;
try{
_61._getItemsFromLoadedData(_64);
_61._loadFinished=true;
_61._loadInProgress=false;
_5f=_61._getItemByIdentity(_5e.identity);
if(_5e.onItem){
_5e.onItem.call(_65,_5f);
}
_61._handleQueuedFetches();
}
catch(error){
_61._loadInProgress=false;
if(_5e.onError){
_5e.onError.call(_65,error);
}
}
});
_63.addErrback(function(_66){
_61._loadInProgress=false;
if(_5e.onError){
var _67=_5e.scope?_5e.scope:_1.global;
_5e.onError.call(_67,_66);
}
});
}
}else{
if(this._jsonData){
_61._getItemsFromLoadedData(_61._jsonData);
_61._jsonData=null;
_61._loadFinished=true;
_5f=_61._getItemByIdentity(_5e.identity);
if(_5e.onItem){
_60=_5e.scope?_5e.scope:_1.global;
_5e.onItem.call(_60,_5f);
}
}
}
}else{
_5f=this._getItemByIdentity(_5e.identity);
if(_5e.onItem){
_60=_5e.scope?_5e.scope:_1.global;
_5e.onItem.call(_60,_5f);
}
}
},_getItemByIdentity:function(_68){
var _69=null;
if(this._itemsByIdentity){
if(Object.hasOwnProperty.call(this._itemsByIdentity,_68)){
_69=this._itemsByIdentity[_68];
}
}else{
if(Object.hasOwnProperty.call(this._arrayOfAllItems,_68)){
_69=this._arrayOfAllItems[_68];
}
}
if(_69===undefined){
_69=null;
}
return _69;
},getIdentityAttributes:function(_6a){
var _6b=this._features["dojo.data.api.Identity"];
if(_6b===Number){
return null;
}else{
return [_6b];
}
},_forceLoad:function(){
var _6c=this;
if(this._jsonFileUrl!==this._ccUrl){
_1.deprecated(this.declaredClass+": ","To change the url, set the url property of the store,"+" not _jsonFileUrl.  _jsonFileUrl support will be removed in 2.0");
this._ccUrl=this._jsonFileUrl;
this.url=this._jsonFileUrl;
}else{
if(this.url!==this._ccUrl){
this._jsonFileUrl=this.url;
this._ccUrl=this.url;
}
}
if(this.data!=null){
this._jsonData=this.data;
this.data=null;
}
if(this._jsonFileUrl){
var _6d={url:this._jsonFileUrl,handleAs:"json-comment-optional",preventCache:this.urlPreventCache,failOk:this.failOk,sync:true};
var _6e=_5.get(_6d);
_6e.addCallback(function(_6f){
try{
if(_6c._loadInProgress!==true&&!_6c._loadFinished){
_6c._getItemsFromLoadedData(_6f);
_6c._loadFinished=true;
}else{
if(_6c._loadInProgress){
throw new Error(this.declaredClass+":  Unable to perform a synchronous load, an async load is in progress.");
}
}
}
catch(e){
console.log(e);
throw e;
}
});
_6e.addErrback(function(_70){
throw _70;
});
}else{
if(this._jsonData){
_6c._getItemsFromLoadedData(_6c._jsonData);
_6c._jsonData=null;
_6c._loadFinished=true;
}
}
}});
_2.extend(_a,_8);
return _a;
});


;define("dojo/data/ItemFileWriteStore",["../_base/lang","../_base/declare","../_base/array","../_base/json","../_base/kernel","./ItemFileReadStore","../date/stamp"],function(_1,_2,_3,_4,_5,_6,_7){
return _2("dojo.data.ItemFileWriteStore",_6,{constructor:function(_8){
this._features["dojo.data.api.Write"]=true;
this._features["dojo.data.api.Notification"]=true;
this._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
if(!this._datatypeMap["Date"].serialize){
this._datatypeMap["Date"].serialize=function(_9){
return _7.toISOString(_9,{zulu:true});
};
}
if(_8&&(_8.referenceIntegrity===false)){
this.referenceIntegrity=false;
}
this._saveInProgress=false;
},referenceIntegrity:true,_assert:function(_a){
if(!_a){
throw new Error("assertion failed in ItemFileWriteStore");
}
},_getIdentifierAttribute:function(){
return this.getFeatures()["dojo.data.api.Identity"];
},newItem:function(_b,_c){
this._assert(!this._saveInProgress);
if(!this._loadFinished){
this._forceLoad();
}
if(typeof _b!="object"&&typeof _b!="undefined"){
throw new Error("newItem() was passed something other than an object");
}
var _d=null;
var _e=this._getIdentifierAttribute();
if(_e===Number){
_d=this._arrayOfAllItems.length;
}else{
_d=_b[_e];
if(typeof _d==="undefined"){
throw new Error("newItem() was not passed an identity for the new item");
}
if(_1.isArray(_d)){
throw new Error("newItem() was not passed an single-valued identity");
}
}
if(this._itemsByIdentity){
this._assert(typeof this._itemsByIdentity[_d]==="undefined");
}
this._assert(typeof this._pending._newItems[_d]==="undefined");
this._assert(typeof this._pending._deletedItems[_d]==="undefined");
var _f={};
_f[this._storeRefPropName]=this;
_f[this._itemNumPropName]=this._arrayOfAllItems.length;
if(this._itemsByIdentity){
this._itemsByIdentity[_d]=_f;
_f[_e]=[_d];
}
this._arrayOfAllItems.push(_f);
var _10=null;
if(_c&&_c.parent&&_c.attribute){
_10={item:_c.parent,attribute:_c.attribute,oldValue:undefined};
var _11=this.getValues(_c.parent,_c.attribute);
if(_11&&_11.length>0){
var _12=_11.slice(0,_11.length);
if(_11.length===1){
_10.oldValue=_11[0];
}else{
_10.oldValue=_11.slice(0,_11.length);
}
_12.push(_f);
this._setValueOrValues(_c.parent,_c.attribute,_12,false);
_10.newValue=this.getValues(_c.parent,_c.attribute);
}else{
this._setValueOrValues(_c.parent,_c.attribute,_f,false);
_10.newValue=_f;
}
}else{
_f[this._rootItemPropName]=true;
this._arrayOfTopLevelItems.push(_f);
}
this._pending._newItems[_d]=_f;
for(var key in _b){
if(key===this._storeRefPropName||key===this._itemNumPropName){
throw new Error("encountered bug in ItemFileWriteStore.newItem");
}
var _13=_b[key];
if(!_1.isArray(_13)){
_13=[_13];
}
_f[key]=_13;
if(this.referenceIntegrity){
for(var i=0;i<_13.length;i++){
var val=_13[i];
if(this.isItem(val)){
this._addReferenceToMap(val,_f,key);
}
}
}
}
this.onNew(_f,_10);
return _f;
},_removeArrayElement:function(_14,_15){
var _16=_3.indexOf(_14,_15);
if(_16!=-1){
_14.splice(_16,1);
return true;
}
return false;
},deleteItem:function(_17){
this._assert(!this._saveInProgress);
this._assertIsItem(_17);
var _18=_17[this._itemNumPropName];
var _19=this.getIdentity(_17);
if(this.referenceIntegrity){
var _1a=this.getAttributes(_17);
if(_17[this._reverseRefMap]){
_17["backup_"+this._reverseRefMap]=_1.clone(_17[this._reverseRefMap]);
}
_3.forEach(_1a,function(_1b){
_3.forEach(this.getValues(_17,_1b),function(_1c){
if(this.isItem(_1c)){
if(!_17["backupRefs_"+this._reverseRefMap]){
_17["backupRefs_"+this._reverseRefMap]=[];
}
_17["backupRefs_"+this._reverseRefMap].push({id:this.getIdentity(_1c),attr:_1b});
this._removeReferenceFromMap(_1c,_17,_1b);
}
},this);
},this);
var _1d=_17[this._reverseRefMap];
if(_1d){
for(var _1e in _1d){
var _1f=null;
if(this._itemsByIdentity){
_1f=this._itemsByIdentity[_1e];
}else{
_1f=this._arrayOfAllItems[_1e];
}
if(_1f){
for(var _20 in _1d[_1e]){
var _21=this.getValues(_1f,_20)||[];
var _22=_3.filter(_21,function(_23){
return !(this.isItem(_23)&&this.getIdentity(_23)==_19);
},this);
this._removeReferenceFromMap(_17,_1f,_20);
if(_22.length<_21.length){
this._setValueOrValues(_1f,_20,_22,true);
}
}
}
}
}
}
this._arrayOfAllItems[_18]=null;
_17[this._storeRefPropName]=null;
if(this._itemsByIdentity){
delete this._itemsByIdentity[_19];
}
this._pending._deletedItems[_19]=_17;
if(_17[this._rootItemPropName]){
this._removeArrayElement(this._arrayOfTopLevelItems,_17);
}
this.onDelete(_17);
return true;
},setValue:function(_24,_25,_26){
return this._setValueOrValues(_24,_25,_26,true);
},setValues:function(_27,_28,_29){
return this._setValueOrValues(_27,_28,_29,true);
},unsetAttribute:function(_2a,_2b){
return this._setValueOrValues(_2a,_2b,[],true);
},_setValueOrValues:function(_2c,_2d,_2e,_2f){
this._assert(!this._saveInProgress);
this._assertIsItem(_2c);
this._assert(_1.isString(_2d));
this._assert(typeof _2e!=="undefined");
var _30=this._getIdentifierAttribute();
if(_2d==_30){
throw new Error("ItemFileWriteStore does not have support for changing the value of an item's identifier.");
}
var _31=this._getValueOrValues(_2c,_2d);
var _32=this.getIdentity(_2c);
if(!this._pending._modifiedItems[_32]){
var _33={};
for(var key in _2c){
if((key===this._storeRefPropName)||(key===this._itemNumPropName)||(key===this._rootItemPropName)){
_33[key]=_2c[key];
}else{
if(key===this._reverseRefMap){
_33[key]=_1.clone(_2c[key]);
}else{
_33[key]=_2c[key].slice(0,_2c[key].length);
}
}
}
this._pending._modifiedItems[_32]=_33;
}
var _34=false;
if(_1.isArray(_2e)&&_2e.length===0){
_34=delete _2c[_2d];
_2e=undefined;
if(this.referenceIntegrity&&_31){
var _35=_31;
if(!_1.isArray(_35)){
_35=[_35];
}
for(var i=0;i<_35.length;i++){
var _36=_35[i];
if(this.isItem(_36)){
this._removeReferenceFromMap(_36,_2c,_2d);
}
}
}
}else{
var _37;
if(_1.isArray(_2e)){
_37=_2e.slice(0,_2e.length);
}else{
_37=[_2e];
}
if(this.referenceIntegrity){
if(_31){
var _35=_31;
if(!_1.isArray(_35)){
_35=[_35];
}
var map={};
_3.forEach(_35,function(_38){
if(this.isItem(_38)){
var id=this.getIdentity(_38);
map[id.toString()]=true;
}
},this);
_3.forEach(_37,function(_39){
if(this.isItem(_39)){
var id=this.getIdentity(_39);
if(map[id.toString()]){
delete map[id.toString()];
}else{
this._addReferenceToMap(_39,_2c,_2d);
}
}
},this);
for(var rId in map){
var _3a;
if(this._itemsByIdentity){
_3a=this._itemsByIdentity[rId];
}else{
_3a=this._arrayOfAllItems[rId];
}
this._removeReferenceFromMap(_3a,_2c,_2d);
}
}else{
for(var i=0;i<_37.length;i++){
var _36=_37[i];
if(this.isItem(_36)){
this._addReferenceToMap(_36,_2c,_2d);
}
}
}
}
_2c[_2d]=_37;
_34=true;
}
if(_2f){
this.onSet(_2c,_2d,_31,_2e);
}
return _34;
},_addReferenceToMap:function(_3b,_3c,_3d){
var _3e=this.getIdentity(_3c);
var _3f=_3b[this._reverseRefMap];
if(!_3f){
_3f=_3b[this._reverseRefMap]={};
}
var _40=_3f[_3e];
if(!_40){
_40=_3f[_3e]={};
}
_40[_3d]=true;
},_removeReferenceFromMap:function(_41,_42,_43){
var _44=this.getIdentity(_42);
var _45=_41[this._reverseRefMap];
var _46;
if(_45){
for(_46 in _45){
if(_46==_44){
delete _45[_46][_43];
if(this._isEmpty(_45[_46])){
delete _45[_46];
}
}
}
if(this._isEmpty(_45)){
delete _41[this._reverseRefMap];
}
}
},_dumpReferenceMap:function(){
var i;
for(i=0;i<this._arrayOfAllItems.length;i++){
var _47=this._arrayOfAllItems[i];
if(_47&&_47[this._reverseRefMap]){
console.log("Item: ["+this.getIdentity(_47)+"] is referenced by: "+_4.toJson(_47[this._reverseRefMap]));
}
}
},_getValueOrValues:function(_48,_49){
var _4a=undefined;
if(this.hasAttribute(_48,_49)){
var _4b=this.getValues(_48,_49);
if(_4b.length==1){
_4a=_4b[0];
}else{
_4a=_4b;
}
}
return _4a;
},_flatten:function(_4c){
if(this.isItem(_4c)){
return {_reference:this.getIdentity(_4c)};
}else{
if(typeof _4c==="object"){
for(var _4d in this._datatypeMap){
var _4e=this._datatypeMap[_4d];
if(_1.isObject(_4e)&&!_1.isFunction(_4e)){
if(_4c instanceof _4e.type){
if(!_4e.serialize){
throw new Error("ItemFileWriteStore:  No serializer defined for type mapping: ["+_4d+"]");
}
return {_type:_4d,_value:_4e.serialize(_4c)};
}
}else{
if(_4c instanceof _4e){
return {_type:_4d,_value:_4c.toString()};
}
}
}
}
return _4c;
}
},_getNewFileContentString:function(){
var _4f={};
var _50=this._getIdentifierAttribute();
if(_50!==Number){
_4f.identifier=_50;
}
if(this._labelAttr){
_4f.label=this._labelAttr;
}
_4f.items=[];
for(var i=0;i<this._arrayOfAllItems.length;++i){
var _51=this._arrayOfAllItems[i];
if(_51!==null){
var _52={};
for(var key in _51){
if(key!==this._storeRefPropName&&key!==this._itemNumPropName&&key!==this._reverseRefMap&&key!==this._rootItemPropName){
var _53=this.getValues(_51,key);
if(_53.length==1){
_52[key]=this._flatten(_53[0]);
}else{
var _54=[];
for(var j=0;j<_53.length;++j){
_54.push(this._flatten(_53[j]));
_52[key]=_54;
}
}
}
}
_4f.items.push(_52);
}
}
var _55=true;
return _4.toJson(_4f,_55);
},_isEmpty:function(_56){
var _57=true;
if(_1.isObject(_56)){
var i;
for(i in _56){
_57=false;
break;
}
}else{
if(_1.isArray(_56)){
if(_56.length>0){
_57=false;
}
}
}
return _57;
},save:function(_58){
this._assert(!this._saveInProgress);
this._saveInProgress=true;
var _59=this;
var _5a=function(){
_59._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
_59._saveInProgress=false;
if(_58&&_58.onComplete){
var _5b=_58.scope||_5.global;
_58.onComplete.call(_5b);
}
};
var _5c=function(err){
_59._saveInProgress=false;
if(_58&&_58.onError){
var _5d=_58.scope||_5.global;
_58.onError.call(_5d,err);
}
};
if(this._saveEverything){
var _5e=this._getNewFileContentString();
this._saveEverything(_5a,_5c,_5e);
}
if(this._saveCustom){
this._saveCustom(_5a,_5c);
}
if(!this._saveEverything&&!this._saveCustom){
_5a();
}
},revert:function(){
this._assert(!this._saveInProgress);
var _5f;
for(_5f in this._pending._modifiedItems){
var _60=this._pending._modifiedItems[_5f];
var _61=null;
if(this._itemsByIdentity){
_61=this._itemsByIdentity[_5f];
}else{
_61=this._arrayOfAllItems[_5f];
}
_60[this._storeRefPropName]=this;
for(var key in _61){
delete _61[key];
}
_1.mixin(_61,_60);
}
var _62;
for(_5f in this._pending._deletedItems){
_62=this._pending._deletedItems[_5f];
_62[this._storeRefPropName]=this;
var _63=_62[this._itemNumPropName];
if(_62["backup_"+this._reverseRefMap]){
_62[this._reverseRefMap]=_62["backup_"+this._reverseRefMap];
delete _62["backup_"+this._reverseRefMap];
}
this._arrayOfAllItems[_63]=_62;
if(this._itemsByIdentity){
this._itemsByIdentity[_5f]=_62;
}
if(_62[this._rootItemPropName]){
this._arrayOfTopLevelItems.push(_62);
}
}
for(_5f in this._pending._deletedItems){
_62=this._pending._deletedItems[_5f];
if(_62["backupRefs_"+this._reverseRefMap]){
_3.forEach(_62["backupRefs_"+this._reverseRefMap],function(_64){
var _65;
if(this._itemsByIdentity){
_65=this._itemsByIdentity[_64.id];
}else{
_65=this._arrayOfAllItems[_64.id];
}
this._addReferenceToMap(_65,_62,_64.attr);
},this);
delete _62["backupRefs_"+this._reverseRefMap];
}
}
for(_5f in this._pending._newItems){
var _66=this._pending._newItems[_5f];
_66[this._storeRefPropName]=null;
this._arrayOfAllItems[_66[this._itemNumPropName]]=null;
if(_66[this._rootItemPropName]){
this._removeArrayElement(this._arrayOfTopLevelItems,_66);
}
if(this._itemsByIdentity){
delete this._itemsByIdentity[_5f];
}
}
this._pending={_newItems:{},_modifiedItems:{},_deletedItems:{}};
return true;
},isDirty:function(_67){
if(_67){
var _68=this.getIdentity(_67);
return new Boolean(this._pending._newItems[_68]||this._pending._modifiedItems[_68]||this._pending._deletedItems[_68]).valueOf();
}else{
return !this._isEmpty(this._pending._newItems)||!this._isEmpty(this._pending._modifiedItems)||!this._isEmpty(this._pending._deletedItems);
}
},onSet:function(_69,_6a,_6b,_6c){
},onNew:function(_6d,_6e){
},onDelete:function(_6f){
},close:function(_70){
if(this.clearOnClose){
if(!this.isDirty()){
this.inherited(arguments);
}else{
throw new Error("dojo.data.ItemFileWriteStore: There are unsaved changes present in the store.  Please save or revert the changes before invoking close.");
}
}
}});
});


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


;if(!dojo._hasResource["lconn.share.widget.AbstractLikeDataStore"]){
dojo._hasResource["lconn.share.widget.AbstractLikeDataStore"]=true;
dojo.provide("lconn.share.widget.AbstractLikeDataStore");




dojo.declare("lconn.share.widget.AbstractLikeDataStore",[dojo.data.ItemFileWriteStore,com.ibm.oneui._base],{newItem:function(_1){
if(!_1["name"]){
_1["name"]=this.currentLogin.name;
}
this.recommendAction(true);
this.hasRecommended=true;
return this.inherited(arguments);
},deleteItem:function(_2,_3){
this.recommendAction(false);
this.hasRecommended=false;
return this.inherited(arguments);
},_getItemByIdentity:function(_4){
var _5=this.inherited(arguments);
if(this.hasRecommended){
return _5||this.currentLogin;
}
this.hasRecommended=!!_5;
return _5;
},_getItemsFromLoadedData:function(_6){
this.recommendationsCount=_6.totalRecommendations||_6.totalSize||0;
if(typeof _6.recommended!="undefined"){
this.hasRecommended=_6.recommended;
}
this.inherited(arguments);
},handleRecommend:function(_7,_8,_9){
if(this._request){
this._request=null;
}
if(_8 instanceof Error){
this.hasRecommended=!_7;
this._updateCount(!_7);
this.onError(_8.code);
}else{
this.hasRecommended=_7;
}
},_updateCount:function(_a){
var _b=this.recommendationsCount;
if(_a){
_b++;
}else{
_b--;
}
this.recommendationsCount=_b;
},onError:function(_c){
throw new Error("AbstractLikeDataStore: method 'onError'. Must use a subclass to override this method");
},recommendAction:function(_d){
throw new Error("AbstractLikeDataStore: method 'recommendAction'. Must use a subclass to override this method");
},loadItem:function(_e){
this.logEnter(arguments);
this.inherited(arguments);
var _f=_e.scope?_e.scope:dojo.global;
try{
if(_e.onItem&&_e.item){
_e.onItem.call(_f,_e.item);
}
}
catch(error){
if(_e.onError){
_e.onError.call(_f,error);
}
}
this.logExit(arguments);
}});
}


;if(!dojo._hasResource["lconn.files.util.LikeDataStore"]){
dojo._hasResource["lconn.files.util.LikeDataStore"]=true;
dojo.provide("lconn.files.util.LikeDataStore");






dojo.declare("lconn.files.util.LikeDataStore",[lconn.share.widget.AbstractLikeDataStore],{onError:function(_1){
var _2;
if(_1=="cancel"){
_2=this._strings.SAVE_ERROR_CANCEL;
}else{
if(_1=="timeout"){
_2=this._strings.SAVE_ERROR_TIMEOUT;
}else{
if(_1=="ItemNotFound"){
_2=this._strings.SAVE_ERROR_NOT_FOUND;
}else{
if(_1=="AccessDenied"){
_2=this._strings.SAVE_ERROR_ACCESS_DENIED;
}else{
if(_1=="unauthenticated"){
}else{
_2=this._strings.SAVE_ERROR;
}
}
}
}
}
if(_2){
lconn.share.util.html.alert(_2);
}
},fetch:function(){
var _3=this.recommendationsCount;
var _4=dojo._toArray(arguments)[0].onBegin;
if(_4){
arguments[0].onBegin=dojo.partial(function(_5){
_4(_5);
},_3);
}
this.inherited(arguments);
},recommendAction:function(_6){
if(this._request){
return;
}
this._updateCount(_6);
var _7=lconn.share.util.dom.newXMLDocument("entry",lconn.share.util.dom.ATOM_NAMESPACE,[lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE]);
var _8=_7.documentElement;
var _9=lconn.share.util.dom.createElementNS(_7,"category",lconn.share.util.dom.ATOM_NAMESPACE);
_9.setAttribute("term","recommendation");
_9.setAttribute("scheme","tag:ibm.com,2006:td/type");
_9.setAttribute("label","recommendation");
_8.appendChild(_9);
var _a=lconn.share.util.dom.serializeXMLDocument(_8,true);
if(_6){
this._request=this.net.postXml({url:this.urlFeed,contentType:"application/atom+xml",postData:_a,handle:dojo.hitch(this,this.handleRecommend,_6)});
}else{
this._request=this.net.deleteXml({url:this.urlRecommendation,contentType:"application/atom+xml",postData:_a,handle:dojo.hitch(this,this.handleRecommend,_6)});
}
}});
}


;if(!dojo._hasResource["lconn.files.PromptMixin"]){
dojo._hasResource["lconn.files.PromptMixin"]=true;
dojo.provide("lconn.files.PromptMixin");
dojo.declare("lconn.files.PromptMixin",null,{registerGlobalPrompt:function(){
var p=dojo.getObject("lconn.share.util.html");
if(p){
p.alert=dojo.hitch(this,this.alert);
p.confirm=dojo.hitch(this,this.confirm);
}
},confirm:function(_1,_2,_3,_4,_5){
lconn.share.requireAsync("lconn.files.action.impl.PromptAction").addCallback(this,function(){
if(this.modalAction){
throw "Another modal action is active";
}
var _6=this.modalAction=new lconn.files.action.impl.PromptAction(this,null,{_stringsPrefix:"CONFIRM",question:_1,onCancel:dojo.hitch(this,"_endModal",_3),onSuccess:dojo.hitch(this,"_endModal",_2),wDialog:"350px",zIndex:2000});
_6.execute(null,{focusConfirm:_4,title:_5});
});
},alert:function(_7){
lconn.share.requireAsync("lconn.files.action.impl.PromptAction").addCallback(this,function(){
if(this.modalAction){
throw "Another modal action is active";
}
var f=dojo.hitch(this,"_endModal");
var _8=this.modalAction=new lconn.files.action.impl.PromptAction(this,null,{hideCancel:true,_stringsPrefix:"ALERT",question:_7,wDialog:"350px",zIndex:2000,onCancel:f,onSuccess:f});
_8.execute(null,{focusConfirm:true});
});
},_endModal:function(f){
lconn.share.util.misc.destroy(this.modalAction);
this.modalAction=null;
if(f){
f();
}
}});
}


;if(!dojo._hasResource["lconn.share.widget.Toggle"]){
dojo._hasResource["lconn.share.widget.Toggle"]=true;
dojo.provide("lconn.share.widget.Toggle");


dojo.declare("lconn.share.widget.Toggle",null,{destroy:function(){
if(this._topic){
dojo.unsubscribe(this._topic);
}
},initToggle:function(_1,_2,_3){
this._topic=dojo.subscribe(_1,this,"toggle");
this._templates=[];
this._states=_3;
this._baseClass=_2;
var d=dojo.doc;
var _4=d.createElement("a");
_4.className=_2;
_4.href="javascript:;";
dojo.attr(_4,"topic",_1);
var _5=_4.appendChild(d.createElement("img"));
_5.src=dojo.config.blankGif;
var _6=_4.appendChild(d.createElement("span"));
_6.className="lotusAltText";
dijit.setWaiRole(_4,"button");
for(var i=0,_7;_7=_3[i];i++){
var a=_4.cloneNode(true);
a.title=_7.tooltip;
dijit.setWaiState(a,"label",_7.tooltip);
var _5=a.firstChild;
_5.alt="";
_5.className=_7.className;
var _6=_5.nextSibling;
_6.appendChild(d.createTextNode(_7.altText));
this._templates.push(a);
}
},createToggle:function(_8){
_8=_8||0;
var t=this._templates[_8];
var n=t.cloneNode(true);
n._state=_8;
return n;
},toggle:function(el,e){
if(e){
dojo.stopEvent(e);
}
var _9=el._state;
if(!(_9>0)){
return;
}
if(el.className!=this._baseClass){
return;
}
var _a=(_9==1);
this.updateToggle(el,!_a);
this.onToggle(el,!_a);
},updateToggle:function(el,_b){
var _c=_b?1:2;
var _d=this._states[_c];
el._state=_c;
el.title=_d.tooltip;
dijit.setWaiState(el,"label",_d.tooltip);
var _e=el.firstChild;
_e.className=_d.className;
_e.alt="";
el.replaceChild(this._templates[_c].lastChild.cloneNode(true),el.lastChild);
},onToggle:function(el,_f){
}});
}


;if(!dojo._hasResource["lconn.files.util.HtmlMessage"]){
dojo._hasResource["lconn.files.util.HtmlMessage"]=true;
dojo.provide("lconn.files.util.HtmlMessage");


dojo.declare("lconn.files.util.HtmlMessage",null,{constructor:function(_1,_2,_3){
this.format=_1;
this.app=_2;
dojo.mixin(this,_3);
},message:function(d){
var el=d.createDocumentFragment();
lconn.share.util.html.substitute(d,el,this.format,this,null,this);
return el;
},FILE_LINK:function(){
if(dojo.getObject("lconn.files.scenehelper.generateFileLink")){
var a=document.createElement("a");
lconn.files.scenehelper.generateFileLink(this.app,this.app.routes,this.file,a,{url:this.fileURL?this.fileURL:this.url});
var _4=lconn.share.util.html.formatFilename(this.file.getLabel());
lconn.share.util.html.breakString(_4,document,a,15);
return a;
}
return lconn.share.util.html.formatFilename(this.file.getLabel());
},COLLECTION_LINK:function(){
if(dojo.getObject("lconn.files.scenehelper.generateCollectionLink")){
var a=document.createElement("a");
lconn.files.scenehelper.generateCollectionLink(this.app,this.app.routes,this.collection,a,{url:this.collectionURL?this.collectionURL:this.url});
lconn.share.util.html.breakString(this.collection.getName(),document,a,15);
return a;
}
return this.collection.getName();
},COMMUNITY_LINK:function(){
if(dojo.getObject("lconn.files.scenehelper.generateCommunityLink")){
var a=document.createElement("a");
lconn.files.scenehelper.generateCommunityLink(this.app,this.app.routes,this.community,a);
lconn.share.util.html.breakString(this.community.name,document,a,15);
return a;
}
return this.community.name;
},COMMUNITY_FOLDERS_LINK:function(){
if(dojo.getObject("lconn.files.scenehelper.generateCommunityLink")){
var _5=this.app.nls.CMW.LIST.COMMUNITY_FOLDERS_TITLE;
var a=document.createElement("a");
lconn.files.scenehelper.generateCommunityFoldersLink(this.app,this.app.routes,this.community,this.app.widgetId,a);
lconn.share.util.html.breakString(_5,document,a,15);
return a;
}
return this.community.name;
},USER_LINK:function(){
if(dojo.getObject("lconn.files.scenehelper.generateUserLink")){
var a=document.createElement("a");
lconn.share.util.html.breakString(this.person.name,document,a,15);
lconn.files.scenehelper.generateUserLink(this.app,this.app.routes,this.person,a);
return a;
}
return this.person.name;
},TRASH_LINK:function(){
if(dojo.getObject("lconn.files.scenehelper.generateTrashLink")){
var a=document.createElement("a");
lconn.share.util.html.breakString(this.trash,document,a,15);
lconn.files.scenehelper.generateTrashLink(this.app,a);
return a;
}
return this.trash;
},MYFILES_LINK:function(){
if(dojo.getObject("lconn.files.scenehelper.generateUserChannelLink")){
var a=document.createElement("a");
lconn.share.util.html.breakString(this.viewTitle,document,a,15);
lconn.files.scenehelper.generateUserChannelLink(this.app,a);
return a;
}
return this.viewTitle;
},MYFOLDERS_LINK:function(){
if(dojo.getObject("lconn.files.scenehelper.generateMyCollectionsLink")){
var a=document.createElement("a");
lconn.share.util.html.breakString(this.viewTitle,document,a,15);
lconn.files.scenehelper.generateMyCollectionsLink(this.app,a);
return a;
}
return this.viewTitle;
}});
}


;if(!dojo._hasResource["lconn.files.util.FavoriteFolders"]){
dojo._hasResource["lconn.files.util.FavoriteFolders"]=true;
dojo.provide("lconn.files.util.FavoriteFolders");






dojo.declare("lconn.files.util.FavoriteFolders",lconn.share.widget.Toggle,{net:null,constructor:function(_1){
this.net=_1.net;
this.app=_1;
var _2=this.nls=_1.nls.TOGGLE_FAVORITE_FOLDER;
dojo.subscribe("lconn/files/folders/myfavorites/add",this,"_add");
dojo.subscribe("lconn/files/folders/myfavorites/remove",this,"_remove");
dojo.subscribe("lconn/files/folders/changed",this,"_onFolderChange");
this.initToggle("lconn/files/folders/myfavorites/toggle","lconnPinnedToggle _folderPinned",[{className:"lconnSprite lconnSprite-iconPinned16-off lconnPinnedUnknown",altText:_2.LOADING,tooltip:_2.LOADING_T},{className:"lconnSprite lconnSprite-iconPinned16-on",altText:_2.A_REMOVE,tooltip:_2.A_REMOVE_T},{className:"lconnSprite lconnSprite-iconPinned16-off",altText:_2.A_ADD,tooltip:_2.A_ADD_T}]);
},hasFavorites:function(){
if(!this.isAvailable()){
return undefined;
}
return this._getItems().length>0;
},isAvailable:function(){
return !!this._getItems();
},isFavorite:function(id){
var _3=this._byId();
var _4=this._getItems();
if(_4){
return !!_3[id];
}
return undefined;
},isFavoriteDfd:function(id){
return this.getDfd().addCallback(dojo.hitch(this,"isFavorite",id));
},get:function(){
var _5=this._getItems();
return _5;
},getDfd:function(){
var _6=this.req;
if(!_6){
var _7=this.app;
var _8=_7.getAuthenticatedUser();
var _9=this._getItems();
if(_9||!_8){
var _a=new dojo.Deferred();
_a.callback(_9);
return _a;
}
this.req=_6=_7._loadFavorites("collections");
_6.addCallback(this,"_handleLoad").addErrback(this,"_onError");
}
var _a=new dojo.Deferred();
_6.addBoth(lconn.share.util.misc.hitchDeferred(_a));
return _a;
},createToggle:function(id){
var _b=0;
var _c=this._byId();
if(!_c&&!this.req){
this.getDfd();
_c=this._byId();
}
if(_c){
_b=(id in _c)?1:2;
}
var _d=id;
arguments[0]=_b;
var t=this.inherited(arguments);
dojo.attr(t,"uid",_d);
return t;
},updateToggles:function(el){
var _e=this._byId();
if(_e){
dojo.query("a._folderPinned > img.lconnPinnedUnknown",el).forEach(function(_f){
var a=_f.parentNode;
var id=dojo.attr(a,"uid");
this.updateToggle(a,id&&_e[id]);
},this);
}
},_handleLoad:function(_10,_11){
this.req=null;
var qud=lconn.share.util.dom;
var _12={};
var _13=dojo.map(_10.items,function(e){
var c=new lconn.share.bean.CollectionFromJson(e);
this[c.getId()]=c;
return c;
},_12);
this._setItems(_13,_12);
this.updateToggles();
dojo.publish("lconn/files/folders/myfavorites/changed",[_13]);
return _13;
},_onError:function(_14){
this.req=null;
console.error(_14);
},onToggle:function(el,_15){
var id=dojo.attr(el,"uid");
if(!this.isAvailable()){
var _16=new Error(this.nls.UNAVAILABLE);
_16.code="unavailable";
this._onToggleError(el,id,_15,_16);
return;
}
var app=this.app;
var dfd;
if(_15){
var qud=lconn.share.util.dom;
var _17=qud.ATOM_NAMESPACE;
var _18=qud.DOCUMENTS_ATOM_NAMESPACE;
var doc=qud.newXMLDocument("entry",_17,[_18]);
var _19=doc.documentElement;
var _1a=qud.createElementNS(doc,"category",_17);
_1a.setAttribute("term","collection");
_1a.setAttribute("label","collection");
_1a.setAttribute("scheme","tag:ibm.com,2006:td/type");
_19.appendChild(_1a);
var _1b=qud.createElementNS(doc,"itemId",_18);
_1b.appendChild(doc.createTextNode(id));
_19.appendChild(_1b);
var _1c=qud.serializeXMLDocument(doc,true);
dfd=app.net.postXml({url:app.routes.getFavoriteCollectionsListServiceUrl(),postData:_1c,auth:{preventReload:true},headers:{"Content-Type":"application/atom+xml;charset=\"UTF-8\""}});
}else{
dfd=app.net.deleteXml({auth:{preventReload:true},url:app.routes.getFavoriteCollectionsListServiceUrl({ids:[id]})});
}
dfd.addErrback(dojo.hitch(this,"_onToggleError",el,id,_15)).addCallback(dojo.hitch(this,"_onToggleSuccess",el,id,_15));
},_onToggleSuccess:function(el,id,_1d,_1e,_1f){
var app=this.app;
var _20=app.find("collection","byId",id);
if(!_20){
console.debug("Unable to locate collection, scene does not expose enough info");
}
if(_1d){
var m=new lconn.files.util.HtmlMessage(this.nls.A_ADD_SUCCESS,app,{success:true,collection:_20,link:lconn.files.util.HtmlMessage.prototype.COLLECTION_LINK});
dojo.publish("lconn/files/folders/myfavorites/add",[id,_20]);
}else{
var m=new lconn.files.util.HtmlMessage(this.nls.A_REMOVE_SUCCESS,app,{success:true,collection:_20,link:lconn.files.util.HtmlMessage.prototype.COLLECTION_LINK});
dojo.publish("lconn/files/folders/myfavorites/remove",[id]);
}
var e={collection:_20,collectionFavoriteChange:true,messages:m};
dojo.publish("lconn/share/action/completed",[e,this]);
},_onToggleError:function(el,id,_21,_22){
this.updateToggle(el,!_21);
var _23=_22?_22.code:null;
var msg,_24;
if(_23=="cancel"){
msg=this.nls.ERROR_CANCEL;
}else{
if(_23=="timeout"){
msg=this.nls.ERROR_TIMEOUT;
}else{
if(_23=="ItemNotFound"){
msg=this.nls.ERROR_NOT_FOUND;
}else{
if(_23=="unavailable"){
msg=this.nls.UNAVAILABLE;
}else{
if(_23=="unauthenticated"){
_24=true;
}else{
msg=this.nls.ERROR;
}
}
}
}
}
if(!_24){
var e={messages:{error:true,message:msg}};
dojo.publish("lconn/share/action/completed",[e,this]);
}
},gridOnToggle:function(_25){
var _26=!_25.value.filePinned;
var id=_25.value.fileId;
if(!_25.value.pinnedAction.that.isAvailable()){
var _27=new Error(_25.value.pinnedAction.that.nls.UNAVAILABLE);
_27.code="unavailable";
_25.value.pinnedAction.that._gridOnToggleError(id,_26,_27);
return;
}
var app=_25.value.pinnedAction.that.app;
var dfd;
if(_26){
var qud=lconn.share.util.dom;
var _28=qud.ATOM_NAMESPACE;
var _29=qud.DOCUMENTS_ATOM_NAMESPACE;
var doc=qud.newXMLDocument("entry",_28,[_29]);
var _2a=doc.documentElement;
var _2b=qud.createElementNS(doc,"category",_28);
_2b.setAttribute("term","collection");
_2b.setAttribute("label","collection");
_2b.setAttribute("scheme","tag:ibm.com,2006:td/type");
_2a.appendChild(_2b);
var _2c=qud.createElementNS(doc,"itemId",_29);
_2c.appendChild(doc.createTextNode(id));
_2a.appendChild(_2c);
var _2d=qud.serializeXMLDocument(doc,true);
dfd=app.net.postXml({url:app.routes.getFavoriteCollectionsListServiceUrl(),postData:_2d,auth:{preventReload:true},headers:{"Content-Type":"application/atom+xml;charset=\"UTF-8\""}});
}else{
dfd=app.net.deleteXml({auth:{preventReload:true},url:app.routes.getFavoriteCollectionsListServiceUrl({ids:[id]})});
}
dfd.addErrback(dojo.hitch(_25.value.pinnedAction.that,"_gridOnToggleError",_25,id,_26)).addCallback(dojo.hitch(_25.value.pinnedAction.that,"_gridOnToggleSuccess",_25,id,_26));
},_gridOnToggleError:function(id,_2e,_2f){
var _30=_2f?_2f.code:null;
var msg,_31;
if(_30=="cancel"){
msg=this.nls.ERROR_CANCEL;
}else{
if(_30=="timeout"){
msg=this.nls.ERROR_TIMEOUT;
}else{
if(_30=="ItemNotFound"){
msg=this.nls.ERROR_NOT_FOUND;
}else{
if(_30=="unavailable"){
msg=this.nls.UNAVAILABLE;
}else{
if(_30=="unauthenticated"){
_31=true;
}else{
msg=this.nls.ERROR;
}
}
}
}
}
if(!_31){
var e={messages:{error:true,message:msg}};
dojo.publish("lconn/share/action/completed",[e,this]);
}
},_gridOnToggleSuccess:function(_32,id,_33,_34,_35){
var app=this.app;
var _36=app.find("collection","byId",id);
if(!_36){
console.debug("Unable to locate collection, scene does not expose enough info");
}
if(_33){
var m=new lconn.files.util.HtmlMessage(this.nls.A_ADD_SUCCESS,app,{success:true,collection:_36,link:lconn.files.util.HtmlMessage.prototype.COLLECTION_LINK});
dojo.publish("lconn/files/folders/myfavorites/add",[id,_36]);
_32.value.filePinned=true;
_32.pinToggleUpdateUI();
}else{
var m=new lconn.files.util.HtmlMessage(this.nls.A_REMOVE_SUCCESS,app,{success:true,collection:_36,link:lconn.files.util.HtmlMessage.prototype.COLLECTION_LINK});
dojo.publish("lconn/files/folders/myfavorites/remove",[id]);
_32.value.filePinned=false;
_32.pinToggleUpdateUI();
}
var e={collection:_36,collectionFavoriteChange:true,messages:m};
dojo.publish("lconn/share/action/completed",[e,this]);
},_add:function(id,_37){
var _38=this._getItems();
if(_38){
var _39=this._byId();
if(!_39[id]){
if(_37){
_38.push(_37);
_39[_37.getId()]=_37;
dojo.publish("lconn/files/folders/myfavorites/changed",[_38]);
}else{
console.log("folder not passed");
}
}
}
},_remove:function(id){
var _3a=this._byId();
if(!_3a){
return;
}
var _3b=_3a[id];
if(_3b){
delete _3a[id];
var _3c=this._getItems();
if(!_3c){
console.log("favorite folders not loaded yet");
}else{
for(var i=0,_3d;_3d=_3c[i];i++){
if(_3d==_3b){
_3c.splice(i,1);
break;
}
}
dojo.publish("lconn/files/folders/myfavorites/changed",[_3c]);
}
}
},_onFolderChange:function(e){
if(!e||!e.collectionCreate){
this._setItems(null,null);
this.getDfd();
}
},_byId:function(){
return this.app.usercache[this.declaredClass+"_byid"];
},_getItems:function(){
return this.app.usercache[this.declaredClass+"_items"];
},_setItems:function(_3e,_3f){
this.app.usercache[this.declaredClass+"_items"]=_3e;
this.app.usercache[this.declaredClass+"_byid"]=_3f;
},isPinned:function(id){
var _40=false;
var _41=this._byId();
if(!_41&&!this.req){
this.getDfd();
_41=this._byId();
}
if(_41){
_40=(id in _41)?true:false;
}
return _40;
}});
}


;if(!dojo._hasResource["lconn.files.util.FavoriteFiles"]){
dojo._hasResource["lconn.files.util.FavoriteFiles"]=true;
dojo.provide("lconn.files.util.FavoriteFiles");








dojo.declare("lconn.files.util.FavoriteFiles",lconn.share.widget.Toggle,{net:null,def:null,constructor:function(_1){
this.net=_1.net;
this.app=_1;
var _2=this.nls=_1.nls.TOGGLE_FAVORITE_FILE;
this.def=new dojo.Deferred();
dojo.subscribe("lconn/files/files/myfavorites/add",this,"_add");
dojo.subscribe("lconn/files/files/myfavorites/remove",this,"_remove");
this.initToggle("lconn/files/files/myfavorites/toggle","lconnPinnedToggle _filePinned",[{className:"lconnSprite lconnSprite-iconPinned16-off lconnPinnedUnknown",altText:_2.LOADING,tooltip:_2.LOADING_T},{className:"lconnSprite lconnSprite-iconPinned16-on",altText:_2.A_REMOVE,tooltip:_2.A_REMOVE_T},{className:"lconnSprite lconnSprite-iconPinned16-off",altText:_2.A_ADD,tooltip:_2.A_ADD_T}]);
},hasFavorites:function(){
if(!this.isAvailable()){
return undefined;
}
return this._count>0;
},isAvailable:function(){
return !!this._byId();
},isFavorite:function(id){
var _3=this._byId();
if(_3){
return !!_3[id];
}
return undefined;
},createToggle:function(id){
var _4=0;
var _5=this._byId();
if(!_5&&!this.req){
this.getDfd();
_5=this._byId();
}
if(_5){
_4=(id in _5)?1:2;
}
var _6=id;
arguments[0]=_4;
var t=this.inherited(arguments);
dojo.attr(t,"uid",_6);
return t;
},updateToggles:function(el){
var _7=this._byId();
if(_7){
dojo.query("a._filePinned > img.lconnPinnedUnknown",el).forEach(function(_8){
var a=_8.parentNode;
var id=dojo.attr(a,"uid");
this.updateToggle(a,id&&_7[id]);
},this);
}
},getDfd:function(){
var _9=this.req;
if(!_9){
var _a=this.app;
var _b=_a.getAuthenticatedUser();
var _c=this._byId();
if(_c||!_b){
var _d=new dojo.Deferred();
_d.callback(_c);
return _d;
}
this.req=_9=_a._loadFavorites("documents");
_9.addCallback(this,"_handleLoad").addErrback(this,"_onError");
}
var _d=new dojo.Deferred();
_9.addBoth(lconn.share.util.misc.hitchDeferred(_d));
return _d;
},_handleLoad:function(_e,_f){
this.req=null;
var _10={};
this._count=_e.items.length;
dojo.forEach(_e.items,function(e){
this[e]=1;
},_10);
this._setItems(_10);
this.updatePinneds();
this.updateToggles();
dojo.publish("lconn/files/files/myfavorites/changed",[_10]);
return _10;
},_onError:function(_11){
this.req=null;
console.error(_11);
},onToggle:function(el,_12){
var id=dojo.attr(el,"uid");
if(!this.isAvailable()){
var _13=new Error(this.nls.UNAVAILABLE);
_13.code="unavailable";
this._onToggleError(el,id,_12,_13);
return;
}
var app=this.app;
var dfd;
if(_12){
var qud=lconn.share.util.dom;
var _14=qud.ATOM_NAMESPACE;
var _15=qud.DOCUMENTS_ATOM_NAMESPACE;
var doc=qud.newXMLDocument("entry",_14,[_15]);
var _16=doc.documentElement;
var _17=qud.createElementNS(doc,"category",_14);
_17.setAttribute("term","document");
_17.setAttribute("label","document");
_17.setAttribute("scheme","tag:ibm.com,2006:td/type");
_16.appendChild(_17);
var _18=qud.createElementNS(doc,"itemId",_15);
_18.appendChild(doc.createTextNode(id));
_16.appendChild(_18);
var _19=qud.serializeXMLDocument(doc,true);
dfd=app.net.postXml({url:app.routes.getFavoriteFilesListServiceUrl(),postData:_19,auth:{preventReload:true},headers:{"Content-Type":"application/atom+xml;charset=\"UTF-8\""}});
}else{
dfd=app.net.deleteXml({auth:{preventReload:true},url:app.routes.getFavoriteFilesListServiceUrl({ids:[id]})});
}
dfd.addErrback(dojo.hitch(this,"_onToggleError",el,id,_12)).addCallback(dojo.hitch(this,"_onToggleSuccess",el,id,_12));
},_onToggleSuccess:function(el,id,_1a,_1b,_1c){
var _1d=this.app.find("file","byId",id);
if(!_1d){
console.debug("Unable to locate file, scene does not expose enough info");
}
if(_1a){
var m=new lconn.files.util.HtmlMessage(this.nls.A_ADD_SUCCESS,this.app,{success:true,file:_1d,link:lconn.files.util.HtmlMessage.prototype.FILE_LINK});
dojo.publish("lconn/files/files/myfavorites/add",[id,_1d]);
}else{
var m=new lconn.files.util.HtmlMessage(this.nls.A_REMOVE_SUCCESS,this.app,{success:true,file:_1d,link:lconn.files.util.HtmlMessage.prototype.FILE_LINK});
dojo.publish("lconn/files/files/myfavorites/remove",[id]);
}
var e={file:_1d,fileFavoriteChange:true,messages:m};
dojo.publish("lconn/share/action/completed",[e,this]);
},_onToggleError:function(el,id,_1e,_1f){
this.updateToggle(el,!_1e);
var _20=_1f?_1f.code:null;
var msg,_21;
if(_20=="cancel"){
msg=this.nls.ERROR_CANCEL;
}else{
if(_20=="timeout"){
msg=this.nls.ERROR_TIMEOUT;
}else{
if(_20=="ItemNotFound"){
msg=this.nls.ERROR_NOT_FOUND;
}else{
if(_20=="unavailable"){
msg=this.nls.UNAVAILABLE;
}else{
if(_20=="unauthenticated"){
_21=true;
}else{
msg=this.nls.ERROR;
}
}
}
}
}
if(!_21){
var e={messages:{error:true,message:msg}};
dojo.publish("lconn/share/action/completed",[e,this]);
}
},_add:function(id){
var _22=this._byId();
if(_22){
if(!_22[id]){
_22[id]=1;
this._count=(this._count||0)+1;
dojo.publish("lconn/files/files/myfavorites/changed",[_22]);
}
}
},_remove:function(id){
var _23=this._byId();
if(!_23){
return;
}
var _24=_23[id];
if(_24){
delete _23[id];
this._count=(this._count||0)-1;
dojo.publish("lconn/files/files/myfavorites/changed",[_23]);
}
},_onFolderChange:function(e){
if(!e||!e.fileCreate){
this._setItems(null);
this.getDfd();
}
},_byId:function(){
return this.app.usercache[this.declaredClass+"_byid"];
},_setItems:function(_25){
this.app.usercache[this.declaredClass+"_byid"]=_25;
},updatePinneds:function(el){
var _26=this._byId();
this.def.then(function(_27){
dojo.forEach(_27,function(_28){
if(_28.value.fileId in _26){
_28.value.filePinned=true;
_28.pinToggleUpdateUI();
}
});
});
},isPinned:function(id){
var _29=false;
var _2a=this._byId();
if(!_2a&&!this.req){
this.getDfd();
_2a=this._byId();
}
if(_2a){
_29=(id in _2a)?true:false;
}
return _29;
},gridOnToggle:function(_2b){
var _2c=!_2b.value.filePinned;
var id=_2b.value.fileId;
if(!_2b.value.pinnedAction.that.isAvailable()){
var _2d=new Error(_2b.value.pinnedAction.that.nls.UNAVAILABLE);
_2d.code="unavailable";
_2b.value.pinnedAction.that._gridOnToggleError(id,_2c,_2d);
return;
}
var app=_2b.value.pinnedAction.that.app;
var dfd;
if(_2c){
var qud=lconn.share.util.dom;
var _2e=qud.ATOM_NAMESPACE;
var _2f=qud.DOCUMENTS_ATOM_NAMESPACE;
var doc=qud.newXMLDocument("entry",_2e,[_2f]);
var _30=doc.documentElement;
var _31=qud.createElementNS(doc,"category",_2e);
_31.setAttribute("term","document");
_31.setAttribute("label","document");
_31.setAttribute("scheme","tag:ibm.com,2006:td/type");
_30.appendChild(_31);
var _32=qud.createElementNS(doc,"itemId",_2f);
_32.appendChild(doc.createTextNode(id));
_30.appendChild(_32);
var _33=qud.serializeXMLDocument(doc,true);
dfd=app.net.postXml({url:app.routes.getFavoriteFilesListServiceUrl(),postData:_33,auth:{preventReload:true},headers:{"Content-Type":"application/atom+xml;charset=\"UTF-8\""}});
}else{
dfd=app.net.deleteXml({auth:{preventReload:true},url:app.routes.getFavoriteFilesListServiceUrl({ids:[id]})});
}
dfd.addErrback(dojo.hitch(_2b.value.pinnedAction.that,"_gridOnToggleError",_2b,id,_2c)).addCallback(dojo.hitch(_2b.value.pinnedAction.that,"_gridOnToggleSuccess",_2b,id,_2c));
},_gridOnToggleError:function(id,_34,_35){
var _36=_35?_35.code:null;
var msg,_37;
if(_36=="cancel"){
msg=this.nls.ERROR_CANCEL;
}else{
if(_36=="timeout"){
msg=this.nls.ERROR_TIMEOUT;
}else{
if(_36=="ItemNotFound"){
msg=this.nls.ERROR_NOT_FOUND;
}else{
if(_36=="unavailable"){
msg=this.nls.UNAVAILABLE;
}else{
if(_36=="unauthenticated"){
_37=true;
}else{
msg=this.nls.ERROR;
}
}
}
}
}
if(!_37){
var e={messages:{error:true,message:msg}};
dojo.publish("lconn/share/action/completed",[e,this]);
}
},_gridOnToggleSuccess:function(_38,id,_39,_3a,_3b){
var _3c=this.app.find("file","byId",id);
if(!_3c){
console.debug("Unable to locate file, scene does not expose enough info");
}
if(_39){
var m=new lconn.files.util.HtmlMessage(this.nls.A_ADD_SUCCESS,this.app,{success:true,file:_3c,link:lconn.files.util.HtmlMessage.prototype.FILE_LINK});
dojo.publish("lconn/files/files/myfavorites/add",[id,_3c]);
_38.value.filePinned=true;
_38.pinToggleUpdateUI();
}else{
var m=new lconn.files.util.HtmlMessage(this.nls.A_REMOVE_SUCCESS,this.app,{success:true,file:_3c,link:lconn.files.util.HtmlMessage.prototype.FILE_LINK});
dojo.publish("lconn/files/files/myfavorites/remove",[id]);
_38.value.filePinned=false;
_38.pinToggleUpdateUI();
}
var e={file:_3c,fileFavoriteChange:true,messages:m};
dojo.publish("lconn/share/action/completed",[e,this]);
}});
}


;if(!dojo._hasResource["lconn.files.widget.AbstractSearchAdapter"]){
dojo._hasResource["lconn.files.widget.AbstractSearchAdapter"]=true;
dojo.provide("lconn.files.widget.AbstractSearchAdapter");




dojo.declare("lconn.files.widget.AbstractSearchAdapter",null,{store:{},canCreate:function(){
return false;
},_getStore:function(_1){
return null;
},_createTypeAhead:function(_2,_3){
return null;
},_getDefaultTypeAheadOpt:function(){
return {};
},getStore:function(_4){
var _4=_4||"default";
if(this.store[_4]){
return this.store[_4];
}
var _5=this.store[_4]=this._getStore(_4);
return _5;
},createTypeAhead:function(_6,_7,_8){
var _9=dojo.mixin({},this._getDefaultTypeAheadOpt(),_7);
_8=_8||{};
var _a=_8.allowExternal?"external":(_8.type?_8.type:"");
if(_8.activeOnly){
_a=_a+"_activeOnly";
}
_9.store=this.getStore(_a);
return this._createTypeAhead(_6,_9,_8);
},getSelected:function(_b,_c){
var _d=_b.item;
if(!_d&&_c&&_c[0]){
var _e=_c[0];
if(_e.item){
_d=_e.item;
}
if(!_d&&_e.id&&_e.title){
_d=_e;
}
}
if(_d&&!_d.emptyMsg){
return _d;
}
return null;
},connectOnSelect:function(_f,obj,_10){
if(_f.onSelect){
dojo.connect(_f,"onSelect",obj,_10);
}else{
if(_f._doSelect){
dojo.connect(_f,"_doSelect",obj,_10);
}
}
},changeTypeAheadOpts:function(_11,opt){
},isExternalItem:function(app,_12){
return false;
},doSelectUser:function(_13){
},showAddButton:function(){
return false;
}});
}


;if(!dojo._hasResource["lconn.files.widget.CommunitySearchQCSAdapter"]){
dojo._hasResource["lconn.files.widget.CommunitySearchQCSAdapter"]=true;
dojo.provide("lconn.files.widget.CommunitySearchQCSAdapter");






dojo.declare("lconn.files.widget.CommunitySearchQCSAdapter",lconn.files.widget.AbstractSearchAdapter,{maxNameLength:60,store:{},constructor:function(_1,_2){
this.app=_1;
this.nls=_2;
},_getStore:function(_3){
if(_3=="library"){
return this.app.getLibraryTypeAheadStore();
}
return this.app.getCommunityTypeAheadStore();
},_createTypeAhead:function(_4,_5){
if(_5.internalOnly){
delete _5.orgId;
}
return new lconn.share.widget.TypeAhead(_5,_4);
},canCreate:function(){
return !!this.app&&dojo.getObject("lconn.share.widget.TypeAhead");
},changeTypeAheadOpts:function(_6,_7){
var _8=_6.searchOpts||{};
if((_7.orgId!=_8.orgId||_7.internalOnly!=_8.internalOnly)&&_6.store&&_6.store.clear){
_6.store.clear();
}
if(_7.internalOnly){
_8.internalOnly=true;
}else{
delete _8.internalOnly;
}
if(_7.orgId){
_8.orgId=_7.orgId;
}else{
delete _8.orgId;
}
_6.searchOpts=_8;
},isExternalItem:function(_9,_a){
return !(_a.community.internalOnly===undefined||_a.community.internalOnly);
},_getDefaultTypeAheadOpt:function(){
var _b=this.maxNameLength;
if(this.defaultTypeAheadOpt){
return this.defaultTypeAheadOpt;
}
var _c=this.nls?this.nls.HINT_TEXT:null;
var _d=this.defaultTypeAheadOpt={_strings:this.nls,orient:dojo._isBodyLtr()?{"BL":"TL"}:{"BR":"TR"},nameAttr:"title",decorateItem:function(el,_e){
var _f=this.formatItem(_e);
if(_f.length>_b){
el.title=_f;
_f=lconn.share.util.text.trimToLength(_f,_b);
lconn.share.util.html.removeChildren(el);
el.appendChild(document.createTextNode(_f));
}
},hintText:_c};
return _d;
}});
}


;if(!dojo._hasResource["lconn.files.util.LibraryDataStore"]){
dojo._hasResource["lconn.files.util.LibraryDataStore"]=true;
dojo.provide("lconn.files.util.LibraryDataStore");


dojo.declare("lconn.files.util.LibraryDataStore",[lconn.files.util.DataStore],{_getCacheKey:function(_1){
var _2=this.inherited(arguments)+"\n"+(_1.queryOptions.type||"")+"\n"+(_1.queryOptions.role||"");
return _2;
},_getParams:function(_3){
var _4=this.inherited(arguments);
_4.format="json";
_4.type=_3.queryOptions.type;
_4.role=_3.queryOptions.role;
return _4;
}});
}


;if(!dojo._hasResource["lconn.files.FileSceneMixin"]){
dojo._hasResource["lconn.files.FileSceneMixin"]=true;
dojo.provide("lconn.files.FileSceneMixin");














dojo.declare("lconn.files.FileSceneMixin",null,{initFavorites:function(){
this.favorites={folders:new lconn.files.util.FavoriteFolders(this),files:new lconn.files.util.FavoriteFiles(this)};
},getLibraryTypeAheadStore:function(){
var s=this.stores.library;
if(!s){
var _1=dojo.getObject("lconn.share.config.services.librarySearch")||{};
s=this.stores.library=new lconn.files.util.LibraryDataStore({net:this.net,getUrl:dojo.hitch(this.routes,"getLibrariesListServiceUrl"),queryParam:"name",maxResults:_1.maxResults,pageSize:_1.pageSize});
}
return s;
},getCommunityTypeAheadStore:function(){
var s=this.stores.community;
if(!s){
var _2=dojo.getObject("lconn.share.config.services.communitySearch")||{};
s=this.stores.community=new lconn.files.util.CommunityDataStore({net:this.net,getUrl:dojo.hitch(this.routes,"getCommunitiesListServiceUrl"),queryParam:"name",maxResults:_2.maxResults,pageSize:_2.pageSize});
}
return s;
},getCommunitySearchAdapter:function(){
if(!this.communitySearchAdapter){
this.communitySearchAdapter=new lconn.files.widget.CommunitySearchQCSAdapter(this,this.nls.COMMUNITYSEARCH);
}
return this.communitySearchAdapter;
},_loadFavorites:function(_3){
var _4=this.usercache._bulkFavorites;
if(!_4){
_4=this.usercache._bulkFavorites=this.net.getJson({url:this.routes.getFavoritesListServiceUrl({pageSize:500,format:"json:combined"}),background:true});
}else{
if(_4["exhausted_"+_3]){
this.usercache._bulkFavorites=null;
if(_3=="documents"){
_4=this.net.getJson({url:this.routes.getFavoriteFilesListServiceUrl({pageSize:500,format:"json"}),background:true});
}else{
if(_3=="collections"){
_4=this.net.getJson({url:this.routes.getFavoriteCollectionsListServiceUrl({pageSize:500,format:"json",includeSubCollections:"true"}),background:true});
}
}
return _4;
}
}
var _5=new dojo.Deferred();
_5.addCallback(function(_6){
_4["exhausted_"+_3]=true;
return _6[_3];
});
_4.addBoth(lconn.share.util.misc.hitchDeferred(_5));
return _5;
},getContext:function(_7,_8,_9){
if(_7=="file"){
if(_8=="create"){
if(lconn.share.util.configUtil.isNestedFolderEnabled(this.authenticatedUser)){
if(this.scene&&this.scene.collection){
if((_9&&this.scene.collection.getPermissions().AddChild)||!_9){
return {type:"folder",value:this.scene.collection.getId(),collectionType:this.scene.collection.getType(),visibility:this.scene.collection.getVisibility(),isExternal:this.scene.collection.isExternal()};
}
}
if(this.scene&&this.scene.activeNavigationId=="pinnedfiles"){
return {type:"pinnedfiles",value:true};
}
if(this.scene&&this.scene.activeNavigationId=="favoritefolders"){
return {type:"pinnedfolders",value:true};
}
if(this.scene&&this.scene.activeNavigationId=="fileSync"){
return {type:"sync",value:true};
}
}
}
if(_8=="read"){
}
if(_8=="update"){
}
if(_8=="delete"){
}
if(_8=="move"){
if(lconn.share.util.configUtil.isNestedFolderEnabled(this.authenticatedUser)){
if(this.scene&&this.scene.collection){
if((_9&&this.scene.collection.getPermissions().RemoveChild)||!_9){
return {type:"folder",value:this.scene.collection.getId(),collectionType:this.scene.collection.getType(),visibility:this.scene.collection.getVisibility(),isExternal:this.scene.collection.isExternal()};
}
}
if(this.scene&&this.scene.activeNavigationId=="pinnedfiles"){
return {type:"pinnedfiles",value:true};
}
if(this.scene&&this.scene.activeNavigationId=="favoritefolders"){
return {type:"pinnedfolders",value:true};
}
if(this.scene&&this.scene.activeNavigationId=="fileSync"){
return {type:"sync",value:true};
}
}
}
}else{
if(_8=="move"){
if(lconn.share.util.configUtil.isNestedFolderEnabled(this.authenticatedUser)){
if(this.scene&&this.scene.collection){
if((_9&&this.scene.collection.getPermissions().RemoveChild)||!_9){
return {type:"folder",value:this.scene.collection.getId(),collectionType:this.scene.collection.getType(),visibility:this.scene.collection.getVisibility(),isExternal:this.scene.collection.isExternal()};
}
}
if(this.scene&&this.scene.activeNavigationId=="favoritefolders"){
return {type:"pinnedfolders",value:true};
}
if(this.scene&&this.scene.activeNavigationId=="fileSync"){
return {type:"sync",value:true};
}
}
}
}
return null;
},initServiceApiProxy:function(){
return null;
},getServiceApiProxy:function(){
if(!this._serviceApiProxy){
this._serviceApiProxy=this.initServiceApiProxy();
}
return this._serviceApiProxy;
}});
}


;if(!dojo._hasResource["lconn.files.ServiceApiProxy"]){
dojo._hasResource["lconn.files.ServiceApiProxy"]=true;
dojo.provide("lconn.files.ServiceApiProxy");






dojo.declare("lconn.files.ServiceApiProxy",null,{_net:null,_routes:null,constructor:function(_1,_2){
if(_1==undefined||_1==null){
throw " ServiceApiProxy - missing net";
}
if(typeof _1!="object"||!dojo.isFunction(_1.isInstanceOf)||!_1.isInstanceOf(lconn.share.util.Network)){
throw " ServiceApiProxy - type of net is not supported";
}
if(_2==undefined||_2==null){
throw " ServiceApiProxy - missing routes";
}
if(typeof _2!="object"||!dojo.isFunction(_2.isInstanceOf)||!_2.isInstanceOf(lconn.files.FilesServiceRoutes)){
throw " ServiceApiProxy - type of routes is not supported";
}
this._net=_1;
this._routes=_2;
},getCollectionById:function(_3){
var _4=null;
var _5={url:this._routes.getCollectionInfoServiceUrl(_3),sync:true,handle:function(_6,_7){
if(_6 instanceof Error){
_4=null;
}else{
_4=_6.documentElement;
}
}};
this._net.getXml(_5);
if(_4){
return new lconn.share.bean.Collection(_4);
}
return null;
}});
}


;dojo.cache("lconn.share", "legacytypeahead/templates/ComboBox.html", "<input type=\"text\" autocomplete=\"off\" ${nameAttrSetting} id=\"widget_${id}\" size=\"${size}\" dojoAttachEvent=\"onkeypress:_onKeyPress\" dojoAttachPoint=\"domNode,textbox,focusNode,comboNode\" waiRole=\"combobox\" waiState=\"haspopup-true,autocomplete-list,expanded-false\" />");

;if(!dojo._hasResource["lconn.share.legacytypeahead.PeopleTypeAhead"]){
dojo._hasResource["lconn.share.legacytypeahead.PeopleTypeAhead"]=true;
dojo.deprecated("lconn.share.legacytypeahead.PeopleTypeAhead","Replace with new typeahead.","3.5");
dojo.provide("lconn.share.legacytypeahead.PeopleTypeAhead");










dojo.declare("lconn.share.legacytypeahead.PeopleTypeAhead",[lconn.share.legacytypeahead.TypeAhead],{size:"",pageSize:15,multipleValues:false,templateString:null,templatePath:dojo.moduleUrl("lconn.share","legacytypeahead/templates/ComboBox.html"),postMixInProperties:function(){
this.inherited(arguments);
this._strings=this._strings||dojo.i18n.getLocalization("lconn.files","ui").USERSEARCH;
},getItem:function(){
return (this.item?this.item:null);
},_onKey:function(_1){
this.inherited(arguments);
var _2=dojo.keys;
switch(_1.keyCode){
case _2.PAGE_DOWN:
case _2.DOWN_ARROW:
case _2.PAGE_UP:
case _2.UP_ARROW:
if(this._opened){
this._popupWidget._focusOptionNode(this._popupWidget.getHighlightedOption());
}
break;
case _2.ENTER:
var pw=this._popupWidget;
if(pw.getHighlightedOption()==pw.searchButton){
pw.searchDirectory();
}
break;
}
},formatItem:function(_3,_4){
var _5="";
if(typeof _3=="string"){
return _4?this._htmlify(_3):_3;
}
if(!_3||!_3.name){
return _5;
}
if(_3.name.indexOf(",")!=-1&&_3.name.length>1&&_3.name[0]!="\""&&_3.name[_3.name.length-1]!="\""){
if(_4){
_5+="&quot;"+this._htmlify(_3.name)+"&quot;";
}else{
_5+="\""+_3.name+"\"";
}
}else{
if(_4){
_5+=this._htmlify(_3.name);
}else{
_5+=_3.name;
}
}
if(_3.member){
var _6=(dojo._isBodyLtr()?"":"\u200f");
if(_4){
_5+=" "+_6+"&lt;"+this._htmlify(_3.member)+_6+"&gt;";
}else{
_5+=" "+_6+"<"+_3.member+_6+">";
}
}
if(_3.userState=="inactive"){
_5+=" ";
_5+=this._strings.INACTIVE;
}
return _5;
},_htmlify:function(_7){
return _7.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
},_hideResultList:function(){
if(dojo.version.minor>5){
this.closeDropDown(true);
return;
}
this.inherited(arguments);
},_startSearch:function(_8,_9){
_9=_9||{};
if(!this._popupWidget){
var _a=this.id+"_popup";
this._popupWidget=this.dropDown=new lconn.share.legacytypeahead.PeopleTypeAheadMenu({_strings:this._strings,onChange:dojo.hitch(this,this._selectOption),id:_a});
dijit.removeWaiState(this.focusNode,"activedescendant");
dijit.setWaiState(this.textbox,"owns",_a);
}
this.item=null;
var _b=dojo.clone(this.query);
this._lastInput=_8;
this._lastQuery=_b=_8;
var _c=dojo.hitch(this,function(_d,_e){
var _f={queryOptions:dojo.mixin({ignoreCase:this.ignoreCase,deep:true},_9),query:_d,onComplete:dojo.hitch(this,"_openResultList"),onError:function(_10){
console.error("dijit.form.ComboBox: "+_10);
dojo.hitch(_e,"_hideResultList")();
},start:0,count:this.pageSize};
dojo.mixin(_f,_e.fetchProperties);
var _11=_e.store.fetch(_f);
var _12=function(_13,_14){
_13.start+=_13.count*_14;
_13.direction=_14;
this.store.fetch(_13);
};
this._nextSearch=this._popupWidget.onPage=dojo.hitch(this,_12,_11);
this._popupWidget.searchDirectory=dojo.hitch(this,dojo.hitch(this,function(){
this._startSearch(_8,{searchDirectory:true});
}));
},_b,this);
var _15=_9.searchImmediately?1:this.getSearchDelay(_b);
if(dojo.version.minor>=9){
this.searchTimer=this.defer(_c,_15);
}else{
this.searchTimer=setTimeout(_c,_15);
}
}});
dojo.declare("lconn.share.legacytypeahead.PeopleTypeAheadMenu",[dijit.form._ComboBoxMenu],{rs_searchDirectory:"",templateString:"<ul class='dijitReset dijitMenu lotusui30dojo' dojoAttachPoint='containerNode' dojoAttachEvent='onclick:_onClick,onmousedown:_onMouseDown,onmouseup:_onMouseUp,onmouseover:_onMouseOver,onmouseout:_onMouseOut' waiRole='listbox' tabIndex='-1' style='overflow:\"auto\";'>"+"<li class='dijitMenuItem dijitMenuPreviousButton' dojoAttachPoint='previousButton'></li>"+"<li class='dijitMenuItem dijitMenuItemRtl resultsNode' dojoAttachPoint='resultsNode'></li>"+"<li class='dijitMenuItem dijitMenuItemRtl searchDirectory' role='option' dojoAttachPoint='searchButton'>${_strings.SEARCH_DIRECTORY}</li>"+"<li class='dijitMenuItem dijitMenuNextButton' dojoAttachPoint='nextButton'></li>"+"</ul>",_messages:null,tooltipAroundNode:null,tooltipTimeout:null,tooltipDelay:600,tooltipId:0,popupClosed:true,postCreate:function(){
this.searchButton.selectHandler=dojo.hitch(this,function(evt){
dojo.stopEvent(evt);
this.searchDirectory();
return true;
});
this.resultsNode.selectHandler=dojo.hitch(this,function(evt){
dojo.stopEvent(evt);
return true;
});
this.inherited("postCreate",arguments);
},searchDirectory:function(){
},_setValueAttr:function(_16){
if(_16.target.item){
this.value=_16;
this.onChange(_16);
}
},_createOption:function(_17,_18){
var _19=_18(_17);
var _1a=document.createElement("li");
dijit.setWaiRole(_1a,"option");
if(_17.userid){
dojo.attr(_1a,"exid",_17.userid);
}
if(_19.html){
_1a.innerHTML=_19.label;
}else{
_1a.appendChild(document.createTextNode(_19.label));
}
if(_1a.innerHTML==""){
_1a.innerHTML="&nbsp;";
}
_1a.item=_17;
return _1a;
},createOptions:function(_1b,_1c,_1d){
dojo.publish("lconn/core/typeahead/open");
this.clearResultList();
this.previousButton.style.display=(!_1c.start||_1c.start==0)?"none":"";
dojo.attr(this.previousButton,"id",this.id+"_prev");
dojo.forEach(_1b,function(_1e,i){
if(_1c.count&&i>=_1c.count){
return;
}
var _1f=this._createOption(_1e,_1d);
_1f.className=this.isLeftToRight()?"dijitMenuItem":"dijitMenuItem dijitMenuItemRtl";
dojo.attr(_1f,"id",this.id+i);
this.domNode.insertBefore(_1f,this.nextButton);
},this);
this.nextButton.style.display=(_1c.count&&_1c.count<_1b.length)?"":"none";
dojo.attr(this.nextButton,"id",this.id+"_next");
var el=this.resultsNode;
if(_1b.length==0){
var _20=lconn.share.util.text.trimToLength(dojo.string.substitute(this._strings.NO_RESULTS,[_1c.query]),55);
while(el.firstChild){
el.removeChild(el.firstChild);
}
el.appendChild(document.createTextNode(_20));
el.item=_20;
el.selectHandler=function(){
return false;
};
dojo.attr(el,"id",this.id+0);
dojo.attr(el,"role","option");
this.domNode.insertBefore(el,this.nextButton);
}
if(!_1c.queryOptions.searchDirectory&&_1c.searchType!="directory"){
if(_1b.length==0){
dojo.attr(this.searchButton,"id",this.id+1);
}else{
dojo.attr(this.searchButton,"id",this.id+_1b.length);
}
this.domNode.insertBefore(this.searchButton,this.nextButton);
}
},_onClick:function(evt){
if(evt.target==this.searchButton){
this.searchDirectory();
}else{
if(evt.target!=this.resultsNode){
this.inherited("_onClick",arguments);
}
}
},_onMouseUp:function(evt){
if(evt.target==this.searchButton){
this.searchDirectory();
}else{
if(evt.target!=this.resultsNode){
this.inherited("_onMouseUp",arguments);
}
}
},_onMouseOver:function(evt){
if(evt.target===this.domNode){
return;
}
var tgt=evt.target;
if(!(tgt==this.previousButton||tgt==this.nextButton||tgt==this.searchButton||tgt==this.resultsNode)){
while(!tgt.item){
tgt=tgt.parentNode;
}
}
this._focusOptionNode(tgt);
},_blurOptionNode:function(){
if(this._highlighted_option){
dojo.removeClass(this._highlighted_option,"dijitMenuItemHover");
this._highlighted_option=null;
}
},_focusOptionNode:function(_21){
if(this._highlighted_option!=_21){
this._blurOptionNode();
this._highlighted_option=_21;
dojo.addClass(this._highlighted_option,"dijitMenuItemHover");
var _22=dojo.attr(_21,"exid");
this.closeTooltip();
this.tooltipId++;
this.popupClosed=false;
if(_22&&window.lconn&&dojo.exists("lconn.profiles.bizCard.bizCard.renderMiniBizCard")){
this.tooltipTimeout=setTimeout(dojo.hitch(this,"renderBizCard",_22,dojo.hitch(this,"showTooltip",this.tooltipId,_21)),this.tooltipDelay);
}
}
this.inherited("_focusOptionNode",arguments);
},renderBizCard:function(_23,fn){
if(_23&&window.lconn&&dojo.exists("lconn.profiles.bizCard.bizCard.renderMiniBizCard")){
lconn.profiles.bizCard.bizCard.renderMiniBizCard(_23,fn);
}
},showTooltip:function(id,_24,_25){
if(id==this.tooltipId&&!this.popupClosed){
this.tooltipAroundNode=_24;
dijit.showTooltip(_25,_24,["after","before"]);
}
},closeTooltip:function(){
if(this.tooltipAroundNode){
dijit.hideTooltip(this.tooltipAroundNode);
this.tooltipAroundNode=null;
}
if(this.tooltipTimeout){
clearTimeout(this.tooltipTimeout);
this.tooltipTimeout=null;
}
},onClose:function(){
dojo.publish("lconn/core/typeahead/close");
this.popupClosed=true;
this.closeTooltip();
this._blurOptionNode();
},clearResultList:function(){
var _26=this.previousButton;
var _27=this.nextButton;
while(_26.nextSibling&&_26.nextSibling!=_27){
this.domNode.removeChild(_26.nextSibling);
}
},getListLength:function(){
return this.domNode.childNodes.length-2-(this.searchButton.parentNode?1:0)-(this.resultsNode.parentNode?1:0);
}});
}


;if(!dojo._hasResource["lconn.share.widget.PeopleTypeAhead"]){
dojo._hasResource["lconn.share.widget.PeopleTypeAhead"]=true;
dojo.provide("lconn.share.widget.PeopleTypeAhead");




dojo.declare("lconn.share.widget.PeopleTypeAhead",[lconn.share.legacytypeahead.PeopleTypeAhead],{allowEmail:false,className:"lotusText",nameAttr:"name",minChars:dojo.getObject("lconn.share.config.services.peopleSearch.minChars")||2,searchDelay:dojo.getObject("lconn.share.config.services.peopleSearch.searchDelay")||400,pageSize:25,multipleValues:false,hasDownArrow:false,postMixInProperties:function(){
if(dojo.version.minor>5){
delete this.hasDownArrow;
}
this.inherited(arguments);
this.baseClass=this.className;
},buildRendering:function(){
this.inherited(arguments);
this.connect(this,"onClick","_searchNow");
this.connect(this,"_onFocus","_onFocusSearchNow");
},_onFocusSearchNow:function(_1){
if(_1=="mouse"){
this._searchNow();
}
},_searchNow:function(){
var _2=this.focusNode.value;
_2=dojo.string.trim(_2);
if(_2!=""){
setTimeout(dojo.hitch(this,"_startSearchFromInput",{searchImmediately:true}),1);
}
},formatItem:function(_3){
var _4="";
if(typeof _3=="string"){
return _3;
}
if(!_3||!_3.name){
return _4;
}
if(_3.name.indexOf(",")!=-1&&_3.name.length>1&&_3.name[0]!="\""&&_3.name[_3.name.length-1]!="\""){
_4+="\""+_3.name+"\"";
}else{
_4+=_3.name;
}
if(_3.email){
var _5=lconn.share.util.html.getDirectionCode();
_4+=" "+_5+"<"+_3.email+_5+">";
}
if(_3.userState=="inactive"){
_4+=" ";
_4+=this._strings.INACTIVE;
}
return _4;
},formatItemHtml:function(_6){
var _7="";
if(typeof _6=="string"){
return _6;
}
if(!_6||!_6.name){
return _7;
}
var d=document;
var el=d.createElement("DIV");
if(_6.name.indexOf(",")!=-1&&_6.name.length>1&&_6.name[0]!="\""&&_6.name[_6.name.length-1]!="\""){
el.appendChild(d.createTextNode("\""));
el.appendChild(d.createTextNode(_6.name));
el.appendChild(d.createTextNode("\""));
}else{
el.appendChild(d.createTextNode(_6.name));
}
if(_6.email){
var _8=lconn.share.util.html.getDirectionCode();
el.appendChild(d.createTextNode(" "+_8+"<"));
el.appendChild(d.createTextNode(_6.email));
el.appendChild(d.createTextNode(_8+">"));
}
if(_6.userState=="inactive"){
el.appendChild(d.createTextNode(" "+this._strings.INACTIVE));
}
return el.innerHTML;
},_openResultList:function(){
if(!this._focused){
return;
}
return this.inherited(arguments);
},doSelectUser:function(){
var hl=null;
if(this._isShowingNow){
var pw=this._popupWidget;
hl=pw&&pw.getHighlightedOption();
}
var _9=null;
if(hl){
var id=hl.id.substring(3);
if(id){
this.store.fetchItemByIdentity({identity:id,onItem:dojo.hitch(this,function(_a){
this.item=_a;
_9=[_a];
})});
}
}
if(!_9&&this.allowEmail){
var v=this.focusNode.value;
if(v&&dojox.validate.isEmailAddress(v)){
_9=[{email:v.toLowerCase()}];
}
}
if(_9){
this.onSelect.apply(this,_9);
}
}});
}


;if(!dojo._hasResource["lconn.files.widget.UserSearchQCSAdapter"]){
dojo._hasResource["lconn.files.widget.UserSearchQCSAdapter"]=true;
dojo.provide("lconn.files.widget.UserSearchQCSAdapter");






dojo.declare("lconn.files.widget.UserSearchQCSAdapter",lconn.files.widget.AbstractSearchAdapter,{store:{},constructor:function(_1,_2,_3,_4){
this.emptyMsg=_3;
this.url=_2;
this.net=_1;
this.app=_4;
},canCreate:function(){
return !!this.url||this.app;
},_getStore:function(_5){
var _6={net:this.net,queryParam:"searchString"};
var _7=dojo.getObject("lconn.share.config.services.peopleSearch")||{};
if(_7.maxResults){
_6.maxResults=_7.maxResults;
}
if(_7.pageSize){
_6.pageSize=_7.pageSize;
}
if(this.app){
var _8=this.app;
var _9=dojo.getObject("authenticatedUser.orgId",false,_8);
if(_9){
_6.orgId=_9;
}
var _a=_8.authenticatedUser?_8.authenticatedUser.isExternal:false;
if(_a){
_6.anonymous=false;
}
var _b=_5.indexOf("_activeOnly")>0;
dojo.mixin(_6,{getUrl:dojo.hitch(_8.routes,_b?"getActiveTypeAheadUserServiceUrl":"getTypeAheadUserServiceUrl"),networkUrl:(_8.authenticatedUser?_8.routes.getMySharedWithUsersServiceListUrl({pageSize:_7.pageSize,internalOnly:_5=="internal"}):null),activeOnly:_b});
}else{
_6.url=this.url;
}
dojo.mixin(_6,{internalOnly:_5=="internal"?true:false});
var s=new lconn.share.widget.PeopleDataStore(_6);
dojo.subscribe("lconn/files/users/changed",s,"clear");
return s;
},_createTypeAhead:function(_c,_d){
return new lconn.share.widget.PeopleTypeAhead(_d,_c);
},_getDefaultTypeAheadOpt:function(){
if(this.defaultTypeAheadOpt){
return this.defaultTypeAheadOpt;
}
var _e=this.defaultTypeAheadOpt={orient:dojo._isBodyLtr()?{"BL":"TL"}:{"BR":"TR"}};
if(this.app){
var s=_e._strings=this.app.nls.USERSEARCH;
if(s){
_e.hintText=s.HINT_TEXT;
}
}
return _e;
},createTypeAhead:function(_f,_10,opt){
var _11=this.inherited(arguments);
if(_10.hintText&&_11.updateHintText){
_11.updateHintText(_10.hintText);
_11.allowEmail=!_10.internal;
}
return _11;
},getSelected:function(_12,_13){
var _14=_12.item;
if(!_14&&_13&&_13[0]){
var _15=_13[0];
if(_15.item){
_14=_15.item;
}
if(!_14&&_15.id&&_15.name){
_14=_15;
}
}
if(_14&&!_14.emptyMsg){
return _14;
}
if(_15){
if(_15.email){
return {id:null,name:_15.email,email:_15.email};
}
}
return null;
},showAddButton:function(){
return true;
},doSelectUser:function(_16){
_16.doSelectUser();
},changeTypeAheadOpts:function(_17,opt){
if(!_17||!_17.store){
return;
}
var _18=opt.users==undefined?true:opt.users;
if(_18){
this.internalOnly=!!opt.internal;
_17.store=this._getStore(this.internalOnly?"internal":"all");
}
}});
}


;if(!dojo._hasResource["lconn.share.widget.TooltipDialog"]){
dojo._hasResource["lconn.share.widget.TooltipDialog"]=true;
dojo.provide("lconn.share.widget.TooltipDialog");


dojo.declare("lconn.share.widget.TooltipDialog",dijit.TooltipDialog,{closeOnLinkClick:true,_attachTemplateNodes:function(){
this.inherited(arguments);
this.connect(this.domNode,"onmouseover","onMouseOver");
this.connect(this.domNode,"onmouseout","onMouseOut");
if(this.closeOnLinkClick){
this.connect(this.domNode,"onclick","onTooltipClick");
}
},orient:function(_1,_2,_3){
var s=this["class"]+" dijitTooltipAB"+(_3.charAt(1)=="L"?"Left":"Right");
if(_2.charAt(0)!=_3.charAt(0)){
s+=" dijitTooltip"+(_3.charAt(0)=="T"?"Below":"Above");
}
this.domNode.className=s;
},onTooltipClick:function(e){
var el=e.target;
for(var i=0;el&&i<5;i++){
if(el.nodeName.toLowerCase()=="a"){
this.onCancel();
return;
}else{
el=el.parentNode;
}
}
}});
}


;if(!dojo._hasResource["lconn.share.widget.tooltip.DialogBase"]){
dojo._hasResource["lconn.share.widget.tooltip.DialogBase"]=true;
dojo.provide("lconn.share.widget.tooltip.DialogBase");


dojo.declare("lconn.share.widget.tooltip.DialogBase",lconn.share.widget.TooltipDialog,{"class":"lotusTooltipDialog",placement:{"BL":"TL","TL":"BL","BR":"TR","TR":"BR"},placementRTL:{"BR":"TR","TR":"BR","BL":"TL","TL":"BL"},parseOnLoad:false,loadEarly:true,baseWidth:200,postMixInProperties:function(){
this.inherited(arguments);
this.ioMethod=dojo.hitch(this,this._ioMethod);
this.nls=this._strings=this.nls||this._strings;
},postCreate:function(){
this.inherited(arguments);
if(this.role){
dijit.setWaiRole(this.containerNode,this.role);
}
},destroy:function(){
dijit.popup.close(this);
this.inherited(arguments);
},_ioMethod:function(_1){
_1.handle=dojo.hitch(this,this.handleLoad);
return this.net.get(_1);
},handleLoad:function(_2,_3){
if(_2 instanceof Error){
return _2;
}
if(this.heading&&!_2.title){
_2.title=this.heading;
}
return this.renderHtml(_2,_3);
},renderLoading:function(){
var d=document;
var _4=d.createElement("div");
_4.className="lotusHelp";
if(dojo.isIE){
_4.style.width=this.baseWidth/2+"px";
}
var _5=d.createElement("div");
_5.className="lotusInfoBox";
if(this.header){
var h3=d.createElement("h3");
h3.appendChild(d.createTextNode(this.header));
_5.appendChild(h3);
}
_5.appendChild(d.createTextNode(this.label));
_4.appendChild(_5);
return _4;
},onDownloadStart:function(){
return this.renderLoading();
},onDownloadError:function(_6){
var _7=this.getErrorMessage(_6);
var d=document;
var _8=d.createElement("div");
_8.className="lotusHelp";
if(dojo.isIE){
_8.style.width=this.baseWidth/2+"px";
}
var _9=d.createElement("div");
_9.className="lotusInfoBox";
if(this.header){
var h3=d.createElement("h3");
h3.appendChild(d.createTextNode(this.header));
_9.appendChild(h3);
}
_9.appendChild(d.createTextNode(_7));
_8.appendChild(_9);
return _8;
},getErrorMessage:function(_a){
if(_a.msg){
return _a.msg;
}
var _b;
var _c=_a.code;
if(this.nls){
if(_c=="cancel"){
_b=this.nls.ERROR_CANCEL;
}else{
if(_c=="timeout"){
_b=this.nls.ERROR_TIMEOUT;
}else{
if(_c=="AccessDenied"){
_b=this.nls.ERROR_ACCESS_DENIED;
}else{
if(_c=="ItemNotFound"){
_b=this.nls.ERROR_NOT_FOUND;
}
}
}
}
if(!_b){
_b=this.nls.ERROR;
}
}
return _b||this.msgError;
},updatePosition:function(){
}});
}


;if(!dojo._hasResource["lconn.share.widget.tooltip.AbstractRecommend"]){
dojo._hasResource["lconn.share.widget.tooltip.AbstractRecommend"]=true;
dojo.provide("lconn.share.widget.tooltip.AbstractRecommend");


dojo.declare("lconn.share.widget.tooltip.AbstractRecommend",lconn.share.widget.tooltip.DialogBase,{label:null,width:250,alwaysReload:true,limitPeopleList:25,renderHtml:function(_1,_2){
var _3=this.info=this.getInfo(_1,_2);
var _4=_3.isUserRecommended;
var _5=_3.canRecommend;
var _6=_3.users;
var _7=Math.min(_6.length,this.limitPeopleList);
var _8=_3.timesRated;
var _9=_8-(_4?1:0);
this.onrecommend(_4,_8);
var _a=this.nls;
var d=document;
var el=d.createElement("div");
el.className="lotusHelp";
var _b=el.style;
_b.position="relative";
_b.width="auto";
_b.top="0";
if(this.width){
_b.width=this.width+"px";
}
var _c=d.createElement("div");
_c.className="lotusInfoBox";
var _d=_a.LABEL_A_MANY;
var _e=_a.LABEL_A_ONE;
if(_5){
var _d=_a.LABEL_R_MANY;
var _e=_a.LABEL_R_ONE;
var _f=this.recommender=this.createRecommendToggle(d,_c,_4,_8);
this.connect(_f,"onrecommend","onrecommend");
}else{
if(_9==0){
var _10=_c.appendChild(d.createElement("div"));
_10.appendChild(d.createTextNode(_a.NOT_RECOMMENDED));
}
}
if(_9>0){
var _10=_c.appendChild(d.createElement("div"));
if(_5){
_10.className="lotusChunk";
}
_10.appendChild(d.createTextNode(_9>1?dojo.string.substitute(_d,[dojo.number.format(_9)]):_e));
var ul=d.createElement("ul");
ul.className="lotusList XlotusCompactList";
if(_7>5){
ul.style.overflowY="scroll";
ul.style.height="100px";
}
for(var i=0;i<_7;i++){
var li=ul.appendChild(d.createElement("li"));
var tn=d.createTextNode(_6[i].name);
if(this.generateLinkToPerson){
var a=d.createElement("a");
this.generateLinkToPerson(_6[i],a);
a.appendChild(tn);
li.appendChild(a);
}else{
li.appendChild(tn);
}
}
var _11=_9-_7;
if(_11>0){
var li=ul.appendChild(d.createElement("li"));
li.className="lotusMeta";
li.appendChild(d.createTextNode(_11==1?_a.LABEL_HIDDEN_ONE:dojo.string.substitute(_a.LABEL_HIDDEN_MANY,[dojo.number.format(_11)])));
}
ul.firstChild.className="lotusFirst";
_c.appendChild(ul);
}
el.appendChild(_c);
return el;
},getErrorMessage:function(_12){
return this.nls.ERROR_RETRIEVE;
},onrecommend:function(_13,_14){
var l=this._launcher;
if(l&&l.onrecommend){
l.onrecommend(_13,_14);
}
}});
}


;if(!dojo._hasResource["lconn.share.widget.AbstractRecommend"]){
dojo._hasResource["lconn.share.widget.AbstractRecommend"]=true;
dojo.provide("lconn.share.widget.AbstractRecommend");


dojo.declare("lconn.share.widget.AbstractRecommend",dijit._Widget,{userRecommended:false,timesRated:-1,baseClass:"lotusRecommend",_strings:{},postMixInProperties:function(){
this.nls=this._strings=this.nls||this._strings;
},buildRendering:function(){
var d=document;
var el=this.domNode=this.srcNodeRef;
if(this.baseClass){
dojo.addClass(el,this.baseClass);
}
this.update();
},getIconUrl:function(){
return dojo.config.blankGif;
},getIconClassName:function(){
var _1="lconnSprite lconnSprite-iconRating";
_1+=this.small?"11":(this.large?"16":"14");
_1+=this.userRecommended?"-on":"-off";
return _1;
},update:function(){
var d=document;
var el=this.domNode;
if(!el){
return;
}
dojo.addClass(el,"lotusClickable");
var _2=this._strings;
var _3=this.userRecommended;
if(!el.firstChild){
var _4=this.imgNode=d.createElement("img");
var _5=_4.id=this.id+"_link";
_4.alt="";
el.appendChild(_4);
var _6=this.labelNode=d.createElement("label");
_6.className="lotusClickable";
dojo.attr(_6,"for",_5);
_6.appendChild(d.createTextNode(_2.LABEL_TRUE+" "));
_6.style.display="none";
el.appendChild(_6);
var a=this.linkNode=d.createElement("a");
dijit.setWaiRole(a,"button");
a.className="lotusAction";
a.href="javascript:;";
el.appendChild(a);
dojo.connect(el,"onclick",dojo.hitch(this,this.toggleRecommend));
}
var i=this.imgNode;
i.className=this.getIconClassName();
i.src=this.getIconUrl();
el.title=_3?_2.UNRECOMMEND_TOOLTIP:_2.RECOMMEND_TOOLTIP;
var n=this.labelNode;
n.style.display=_3?"":"none";
var a=this.linkNode;
while(a.firstChild){
a.removeChild(a.firstChild);
}
a.appendChild(d.createTextNode(_3?_2.UNRECOMMEND:_2.LABEL_FALSE));
a.title=el.title;
},toggleRecommend:function(e){
this.recommend(!this.userRecommended,e);
},onrecommend:function(_7,_8){
}});
}


;if(!dojo._hasResource["lconn.share.widget.Recommend"]){
dojo._hasResource["lconn.share.widget.Recommend"]=true;
dojo.provide("lconn.share.widget.Recommend");






dojo.declare("lconn.share.widget.Recommend",lconn.share.widget.AbstractRecommend,{urlRecommendation:null,urlFeed:null,recommend:function(_1,e){
if(e){
dojo.stopEvent(e);
}
if(this._request){
return;
}
var _2=lconn.share.util.dom.newXMLDocument("entry",lconn.share.util.dom.ATOM_NAMESPACE,[lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE]);
var _3=_2.documentElement;
var _4=lconn.share.util.dom.createElementNS(_2,"category",lconn.share.util.dom.ATOM_NAMESPACE);
_4.setAttribute("term","recommendation");
_4.setAttribute("scheme","tag:ibm.com,2006:td/type");
_4.setAttribute("label","recommendation");
_3.appendChild(_4);
var _5=lconn.share.util.dom.serializeXMLDocument(_3,true);
if(_1&&this.urlFeed){
this._request=this.net.postXml({url:this.urlFeed,contentType:"application/atom+xml",postData:_5,handle:dojo.hitch(this,this.handleRecommend,_1,Math.max(1,this.timesRated+1))});
}else{
if(!_1&&this.urlRecommendation){
this._request=this.net.deleteXml({url:this.urlRecommendation,contentType:"application/atom+xml",postData:_5,handle:dojo.hitch(this,this.handleRecommend,_1,Math.max(0,this.timesRated-1))});
}else{
return;
}
}
},handleRecommend:function(_6,_7,_8,_9){
try{
if(_8 instanceof Error){
error=_8.code;
if(_6&&error=="ItemExists"){
_7--;
}else{
if(!_6&&error=="ItemNotFound"){
_7++;
}else{
this.onError(error);
return;
}
}
}
this.userRecommended=_6;
this.timesRated=_7;
this.update();
this.onrecommend(this.userRecommended,this.timesRated);
}
finally{
this._request=null;
}
},onError:function(_a){
var _b;
if(_a=="cancel"){
_b=this._strings.SAVE_ERROR_CANCEL;
}else{
if(_a=="timeout"){
_b=this._strings.SAVE_ERROR_TIMEOUT;
}else{
if(_a=="ItemNotFound"){
_b=this._strings.SAVE_ERROR_NOT_FOUND;
}else{
if(_a=="AccessDenied"){
_b=this._strings.SAVE_ERROR_ACCESS_DENIED;
}else{
if(_a=="unauthenticated"){
}else{
_b=this._strings.SAVE_ERROR;
}
}
}
}
}
if(_b){
lconn.share.util.html.alert(_b);
}
}});
}


;if(!dojo._hasResource["lconn.share.widget.tooltip.Recommend"]){
dojo._hasResource["lconn.share.widget.tooltip.Recommend"]=true;
dojo.provide("lconn.share.widget.tooltip.Recommend");




dojo.declare("lconn.share.widget.tooltip.Recommend",lconn.share.widget.tooltip.AbstractRecommend,{ioArgs:{noStatus:true,handleAs:"json"},handleAs:"json",autofocus:false,getInfo:function(_1,_2){
var _3=dojo.filter(_1.items,function(i){
var b=(i.id==this.authenticatedUserId);
if(b){
_1.recommended=true;
}
return !b;
},this);
_3.length=Math.min(_3.length,this.limitPeopleList);
return {canRecommend:this.canRecommend,isUserRecommended:!!_1.recommended,users:_3,timesRated:_1.totalSize};
},createRecommendToggle:function(d,el,_4,_5){
var _6={baseClass:"lotusRecommend",timesRated:_5,userRecommended:_4,net:this.net};
if(this.toggleArgs){
dojo.mixin(_6,this.toggleArgs);
}
return new lconn.share.widget.Recommend(_6,el.appendChild(d.createElement("label")));
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


;if(!dojo._hasResource["lconn.files.action.CreateCollection"]){
dojo._hasResource["lconn.files.action.CreateCollection"]=true;
dojo.provide("lconn.files.action.CreateCollection");


dojo.declare("lconn.files.action.CreateCollection",com.ibm.social.layout.DeferredAction,{actionClass:"lconn.files.action.impl.CreateCollection",constructor:function(_1,_2,_3){
this.app=_1;
this.nls=_1.nls.CREATE_COLLECTION;
this.name=this.nls.ACTION;
this.nameInMenu=this.nls.ACTION_IN_MENU;
this.tooltip=this.nls.ACTION_TOOLTIP;
},getName:function(_4){
return this.isGrouped?this.nameInMenu:this.name;
},getTooltip:function(_5,_6){
return this.tooltip;
},isVisible:function(_7,_8){
return this.app.authenticatedUser;
}});
}


;if(!dojo._hasResource["lconn.files.action.Login"]){
dojo._hasResource["lconn.files.action.Login"]=true;
dojo.provide("lconn.files.action.Login");


dojo.declare("lconn.files.action.Login",[com.ibm.social.layout.Action],{constructor:function(_1){
this.app=_1;
this.nls=this.app.nls.LOGIN;
this.name=this.nls.ACTION;
this.tooltip=this.nls.ACTION_TOOLTIP;
},getName:function(_2){
return this.name;
},getTooltip:function(_3,_4){
return this.tooltip;
},isValid:function(_5,_6){
return this.isVisible(_5,_6);
},isVisible:function(_7,_8){
return !this.app.authenticatedUser;
},execute:function(_9,_a,e){
if(e){
dojo.stopEvent(e);
}
if(!this.app.authenticatedUser){
this.app.login();
}
}});
}


;if(!dojo._hasResource["lconn.files.action.UploadFile"]){
dojo._hasResource["lconn.files.action.UploadFile"]=true;
dojo.provide("lconn.files.action.UploadFile");


dojo.declare("lconn.files.action.UploadFile",com.ibm.social.layout.DeferredAction,{actionClass:"lconn.files.action.impl.UploadFile",constructor:function(_1,_2){
this.app=_1;
var _3=_1.nls.UPLOAD_FILE;
this.name=_3.ACTION;
this.nameInMenu=_3.ACTION_IN_MENU;
this.tooltip=_3.ACTION_TOOLTIP;
},getName:function(_4){
return this.isGrouped?this.nameInMenu:this.name;
},getTooltip:function(_5,_6){
return this.tooltip;
},isVisible:function(_7,_8){
var _9=_7[0];
return (this.app.authenticatedUser&&_9.id==this.app.authenticatedUser.id);
}});
}


;dojo.mixin(dojo.provide("lconn.share.previewConfig"),{"galleryViewHeight":73,"galleryViewWidth":73,"gridViewHeight":132,"gridViewTextHeight":30,"gridViewWidth":200,"previewViewHeight":450,"previewViewWidth":450,"validPhotoExts":"jpg,jpeg,gif,png","validVideoExts":"mp4,mov,flv"});


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


;if(!dojo._hasResource["lconn.files.action.UploadPreviewThumbnail"]){
dojo._hasResource["lconn.files.action.UploadPreviewThumbnail"]=true;
dojo.provide("lconn.files.action.UploadPreviewThumbnail");




dojo.declare("lconn.files.action.UploadPreviewThumbnail",lconn.share.action.DeferredAction,{constructor:function(_1,_2,_3){
var _4=_1.nls.UPLOAD_PREVIEW;
this.name=_4.ACTION;
this.tooltip=_4.ACTION_TOOLTIP;
},isValid:function(_5,_6){
var _7=lconn.share.previewConfig;
var _8=_7.validVideoExts.split(",");
for(var i=0;i<_8.length;i++){
if(_5.getExtension()==_8[i]){
if(_6&&_6.permissions&&_6.permissions.canEdit){
return _6.permissions.canEdit(_5)||_5.getPermissions().Edit;
}
return _5.getPermissions().Edit;
}
}
return false;
}});
}


;if(!dojo._hasResource["lconn.files.action.JumpToDetailsPage"]){
dojo._hasResource["lconn.files.action.JumpToDetailsPage"]=true;
dojo.provide("lconn.files.action.JumpToDetailsPage");




dojo.declare("lconn.files.action.JumpToDetailsPage",[lconn.share.action.Action],{isPrimary:true,constructor:function(_1,_2,_3){
this.app=_1;
this.nls=_1.nls;
},execute:function(_4,_5,e){
if(e){
dojo.stopEvent(e);
}
window.location=this.getUrlForPersonalFileInCommunity(_4);
},isValid:function(_6,_7){
return true;
},getName:function(_8,_9){
return this.nls.JUMPT_TO_SUMMARYPAGE.NAME;
},getTooltip:function(_a,_b){
return dojo.string.substitute(this.nls.JUMPT_TO_SUMMARYPAGE.ACTION_TOOLTIP,[_a.getTitle(),lconn.share.util.text.formatSize(_a.getSize())]);
},getUrlForPersonalFileInCommunity:function(_c,_d){
var _e=this.app.routes;
var _f=_c.getId();
var url=_c.getUrlAlternate?_c.getUrlAlternate():null;
if(_c.getLibraryType()=="communityECMFiles"){
url=url||_c.getUrlVia?_c.getUrlVia():null;
}
url=url||_e.getFileSummaryUrl(null,_f,{section:(_d)?_d.section:null});
if(this.app.restrictUserInComm&&this.app.isCommunityScene&&_c.getLibraryType()!="communityFiles"){
url=_e.getFileSummaryUrl(null,_f,{section:(_d)?_d.section:null});
}
return url;
}});
}


;if(!dojo._hasResource["lconn.files.action.AddComment"]){
dojo._hasResource["lconn.files.action.AddComment"]=true;
dojo.provide("lconn.files.action.AddComment");




dojo.declare("lconn.files.action.AddComment",[lconn.share.action.Action],{constructor:function(_1,_2){
this.app=_1;
this.scene=_2;
this.nls=this.app.nls.ADD_COMMENT;
this.name=this.nls.ACTION;
this.tooltip=this.nls.ACTION_TOOLTIP;
},isValid:function(_3,_4){
return false;
},execute:function(_5,_6,e){
if(e){
dojo.stopEvent(e);
}
var _7=this.app.scene;
if(_7&&_7.fileId==_5.getId()&&_7.comments&&_7.isExpanded&&_7.isExpanded("comments")){
_7.comments.createComment();
}else{
this.app.navigate(this.app.routes.getFileSummaryUrl(null,_5.getId(),{addcomment:true}));
}
}});
}


;if(!dojo._hasResource["lconn.files.action.AddToCollection"]){
dojo._hasResource["lconn.files.action.AddToCollection"]=true;
dojo.provide("lconn.files.action.AddToCollection");




dojo.declare("lconn.files.action.AddToCollection",lconn.share.action.DeferredAction,{isPrimary:true,constructor:function(_1,_2,_3){
this.nls=(_3&&_3.singleSelection)?_1.nls.ADD_TO_COMMUNITYCOLLECTION:_1.isNestedFolderEnabled?_1.nls.ADD_FILE_TO_COLLECTION:_1.nls.ADD_TO_COLLECTION;
if(_1.isNestedFolderEnabled){
this.name=this.nls.ACTION_LONG;
}else{
this.name=this.nls.ACTION;
}
this.tooltip=this.nls.ACTION_TOOLTIP;
this.app=_1;
},isValid:function(_4,_5){
if(_4.getLibraryType()=="communityFiles"){
if(!this.app.library){
this.app.getLibrary(true);
}
if(this.app.library){
return this.app.library.getPermissions().AddChild&&!_4.isFiledInFolder();
}else{
return false;
}
}else{
var _6=this.app?this.app.authenticatedUser:null;
if(lconn.share.util.configUtil.isNestedFolderEnabled(_6)&&this.app&&this.app.scene&&this.app.scene.collection){
return false;
}
return _4.getPermissions().GrantAccessView;
}
}});
}


;if(!dojo._hasResource["lconn.files.action.AddFilesToCollection"]){
dojo._hasResource["lconn.files.action.AddFilesToCollection"]=true;
dojo.provide("lconn.files.action.AddFilesToCollection");


dojo.declare("lconn.files.action.AddFilesToCollection",lconn.share.action.DeferredAction,{isPrimary:true,constructor:function(_1,_2,_3){
this.nls=_1.nls.ADD_FILES_TO_COLLECTION;
if(_1.isNestedFolderEnabled){
this.name=this.nls.ACTION_LONG;
}else{
this.name=this.nls.ACTION;
}
this.tooltip=this.nls.ACTION_TOOLTIP;
},isValid:function(_4,_5){
return _4.getPermissions().AddChild;
}});
}


;if(!dojo._hasResource["lconn.files.action.CopyFile"]){
dojo._hasResource["lconn.files.action.CopyFile"]=true;
dojo.provide("lconn.files.action.CopyFile");


dojo.declare("lconn.files.action.CopyFile",lconn.share.action.DeferredAction,{constructor:function(_1,_2){
var _3=_1.nls.COPY_FILE;
if(_1.isNestedFolderEnabled){
this.name=_3.ACTION_LONG;
}else{
this.name=_3.ACTION;
}
this.tooltip=_3.ACTION_TOOLTIP;
this.user=_1.authenticatedUser;
},isValid:function(_4,_5){
var _6=lconn.share.util.configUtil.canViewcommunities(this.user);
return _6&&_4.getPermissions().GrantAccess;
}});
}


;if(!dojo._hasResource["lconn.files.action.CreateSubCollection"]){
dojo._hasResource["lconn.files.action.CreateSubCollection"]=true;
dojo.provide("lconn.files.action.CreateSubCollection");


dojo.declare("lconn.files.action.CreateSubCollection",lconn.files.action.CreateCollection,{actionClass:"lconn.files.action.impl.CreateSubCollection",constructor:function(_1,_2,_3){
this.app=_1;
this.nls=_1.nls.CREATE_COLLECTION;
this.name=this.nls.ACTION_SUB_COLLECTION;
this.tooltip=this.nls.ACTION_TOOLTIP_SUB_COLLECTION;
},getName:function(_4){
return this.name;
},getTooltip:function(_5,_6){
return this.tooltip;
},isValid:function(_7,_8){
return this.app.authenticatedUser&&_7.getPermissions().AddChild&&lconn.core.config.features("files-nested-folder");
},isVisible:function(_9,_a){
return this.isValid(_9,_a);
}});
}


;if(!dojo._hasResource["lconn.files.action.DownloadFile"]){
dojo._hasResource["lconn.files.action.DownloadFile"]=true;
dojo.provide("lconn.files.action.DownloadFile");








dojo.declare("lconn.files.action.DownloadFile",[lconn.share.action.Action],{isPrimary:true,_3rdPartyDownload:null,_validatedFiles:{},constructor:function(_1,_2,_3){
this.app=_1;
this.nls=_1.nls;
this._3rdPartyDownload=lconn.share.config.downloadFile;
},isDisabled:function(_4,_5){
var _6=_4.getLabel();
var i=dojo.getObject("lconn.share.config.validation.warnForDownload");
return (i>0&&lconn.share.util.text.lengthUtf8(_6)>i);
},getTooltip:function(_7,_8){
return dojo.string.substitute(this.nls.DOCUMENTCONTENT.DOWNLOAD_TOOLTIP,[_7.getTitle(),lconn.share.util.text.formatSize(_7.getSize())]);
},getName:function(_9,_a){
return this.nls.CONTENT.DOWNLOAD;
},execute:function(_b,_c){
var e=arguments[arguments.length-1];
if(lconn.share.util.html.isEvent(e)){
dojo.stopEvent(e);
}
var _d=_c.app=_c.app||this.app;
_c.nls=_d.nls;
if(this._validateFile(_b,_c)){
lconn.files.scenehelper.downloadFile(_b,_c);
}else{
this._3rdPartyDownload.execute(_b,_c);
}
},_validateFile:function(_e,_f){
var _10=this._validatedFiles[_e.getId()];
if(typeof _10=="undefined"){
var _11=this._3rdPartyDownload;
_10=(!_11||!_11.isValid||!_11.isValid(_e,_f));
this._validatedFiles[_e.getId()]=_10;
}
return _10;
},addExtra:function(_12,el,opt){
if(opt&&opt.noLink){
el.parentNode.title="";
}
if(_12.getConfiguration().disableDownload){
return;
}
var d=document;
dojo.addClass(el,"lconnDownloadable");
lconn.files.scenehelper.applyDownloadWarning(this.app,_12.getLabel(),d,el);
}});
}


;if(!dojo._hasResource["lconn.files.action.OpenFileInline"]){
dojo._hasResource["lconn.files.action.OpenFileInline"]=true;
dojo.provide("lconn.files.action.OpenFileInline");








dojo.declare("lconn.files.action.OpenFileInline",[lconn.share.action.Action],{constructor:function(_1,_2,_3){
this.app=_1;
this.nls=_1.nls;
},getTooltip:function(_4,_5){
return this.nls.DOCUMENTCONTENT.OPEN_TOOLTIP;
},getName:function(_6,_7){
return this.nls.DOCUMENTCONTENT.OPEN_THIS;
},execute:function(_8,_9){
var _a=lconn.core.url.rewrite(_8.getUrlDownload(),{inline:true});
window.open(_a);
},isValid:function(_b,_c){
return !_b.getConfiguration().disableOpenInline&&lconn.share.config.openFromWeb[_b.getExtension()];
}});
}


;if(!dojo._hasResource["lconn.files.action.DeleteAttachment"]){
dojo._hasResource["lconn.files.action.DeleteAttachment"]=true;
dojo.provide("lconn.files.action.DeleteAttachment");


dojo.declare("lconn.files.action.DeleteAttachment",lconn.share.action.DeferredAction,{constructor:function(_1,_2,_3){
var _4=_1.nls.DELETE_ATTACHMENT;
this.name=_4.ACTION;
this.tooltip=_4.ACTION_TOOLTIP;
},isValid:function(_5,_6){
if(_6&&_6.permissions){
return _6.permissions.canDelete(_5)||_5.getPermissions().Delete;
}
return _5.getPermissions().Delete;
}});
}


;if(!dojo._hasResource["lconn.files.action.DeleteCollection"]){
dojo._hasResource["lconn.files.action.DeleteCollection"]=true;
dojo.provide("lconn.files.action.DeleteCollection");


dojo.declare("lconn.files.action.DeleteCollection",lconn.share.action.DeferredAction,{constructor:function(_1,_2,_3){
var _4=_1.nls.DELETE_COLLECTION;
this.name=_4.ACTION;
this.tooltip=_4.ACTION_TOOLTIP;
},isValid:function(_5,_6){
if(!_5.hasFullPermissions()){
throw "Caller did not load permissions with this object, cannot check delete permissions";
}
return _5.getPermissions().Delete;
}});
}


;if(!dojo._hasResource["lconn.files.action.DeleteFile"]){
dojo._hasResource["lconn.files.action.DeleteFile"]=true;
dojo.provide("lconn.files.action.DeleteFile");


dojo.declare("lconn.files.action.DeleteFile",lconn.share.action.DeferredAction,{constructor:function(_1,_2,_3){
var _4=this.getNls(_1);
this.name=_4.ACTION;
this.tooltip=_4.ACTION_TOOLTIP;
},getNls:function(_5){
return dojo.getObject("lconn.share.config.features.trash")?_5.nls.MOVE_TO_TRASH:_5.nls.DELETE_FILE;
},isValid:function(_6,_7){
if(_7&&_7.permissions){
return _7.permissions.canDelete(_6)||_6.getPermissions().Delete;
}
return _6.getPermissions().Delete;
}});
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


;if(!dojo._hasResource["lconn.files.action.EditCollection"]){
dojo._hasResource["lconn.files.action.EditCollection"]=true;
dojo.provide("lconn.files.action.EditCollection");


dojo.declare("lconn.files.action.EditCollection",lconn.share.action.DeferredAction,{constructor:function(_1,_2,_3){
this.nls=_1.nls.EDIT_COLLECTION;
if(_1.isNestedFolderEnabled){
this.name=this.nls.ACTION_LONG;
}else{
this.name=this.nls.ACTION;
}
this.tooltip=this.nls.ACTION_TOOLTIP;
},isValid:function(_4,_5){
if(!_4.hasFullPermissions()){
throw "Caller did not load permissions with this object, cannot check edit permissions";
}
return _4.getPermissions().Edit;
}});
}


;if(!dojo._hasResource["lconn.files.action.EditFile"]){
dojo._hasResource["lconn.files.action.EditFile"]=true;
dojo.provide("lconn.files.action.EditFile");


dojo.declare("lconn.files.action.EditFile",lconn.share.action.DeferredAction,{constructor:function(_1,_2,_3){
this.nls=_1.nls.EDIT_FILE;
if(_1.isNestedFolderEnabled){
this.name=this.nls.ACTION_LONG;
}else{
this.name=this.nls.ACTION;
}
this.tooltip=this.nls.ACTION_TOOLTIP;
},isValid:function(_4,_5){
if(_5&&_5.permissions&&_5.permissions.canEdit){
return _5.permissions.canEdit(_4)||_4.getPermissions().Edit;
}
return _4.getPermissions().Edit;
}});
}


;if(!dojo._hasResource["lconn.files.action.GenericEdit"]){
dojo._hasResource["lconn.files.action.GenericEdit"]=true;
dojo.provide("lconn.files.action.GenericEdit");




dojo.declare("lconn.files.action.GenericEdit",lconn.share.action.Action,{isPrimary:true,constructor:function(_1,_2,_3){
var _4=_1.nls.REPLACE_FILE;
if(_1.isNestedFolderEnabled){
this.name=_4.ACTION_LONG;
}else{
this.name=_4.ACTION;
}
this.actions=lconn.files.actions.get("file/edit",_1,_2,_3);
},destroy:function(){
dojo.forEach(this.actions,function(a){
a.destroy();
});
},_act:function(_5,_6){
for(var i=this.actions.length-1;i>0;i--){
if(this.actions[i].isValid(_5,_6)){
return this.actions[i];
}
}
return this.actions[0];
},isValid:function(_7,_8){
return !_7.getConfiguration().disableGenericEdit&&_7.getPermissions().Edit;
},getName:function(_9,_a){
var a=this._act.apply(this,arguments);
return a.getName.apply(a,arguments);
},getTooltip:function(_b,_c){
var a=this._act.apply(this,arguments);
return a.getTooltip.apply(a,arguments);
},execute:function(_d,_e){
var a=this._act.apply(this,arguments);
return a.execute.apply(a,arguments);
},getUrlResource:function(_f,opt){
var a=this._act.apply(this,arguments);
return a.getUrlResource.apply(a,arguments);
}});
}


;if(!dojo._hasResource["lconn.files.action.LockFile"]){
dojo._hasResource["lconn.files.action.LockFile"]=true;
dojo.provide("lconn.files.action.LockFile");






dojo.declare("lconn.files.action.LockFile",lconn.share.action.Action,{constructor:function(_1,_2,_3){
var _4=this.nls=_1.nls.LOCK_FILE;
this.name=_4.ACTION;
this.tooltip=_4.ACTION_TOOLTIP;
this.app=_1;
},isValid:function(_5,_6){
return this.app.apiType!="cmis"&&this.app.isAuthenticated()&&_5.getPermissions().Lock;
},execute:function(_7,_8){
if(_8._ex){
return;
}
_8._ex=true;
var _9=this.app;
var _a=_9.routes.getLockServiceUrl(_7.getId(),{type:"hard"});
this.req=_9.net.postXml({url:_a,auth:{preventReload:true},statusText:this.nls.STATUS});
this.req.addBoth(dojo.hitch(this,"onComplete",_7,_8));
},onComplete:function(_b,_c,_d,_e){
_c._ex=false;
var _f={};
var e={messages:_f};
if(_d instanceof Error){
_f.error=true;
var _10=_d?_d.code:null;
if(_10=="unauthenticated"){
return;
}
if(_10=="cancel"){
_f.message=this.nls.ERROR_CANCEL;
}else{
if(_10=="timeout"){
_f.message=this.nls.ERROR_TIMEOUT;
}else{
if(_10=="ItemNotFound"){
_f.message=this.nls.ERROR_NOT_FOUND;
}else{
if(_10=="AccessDenied"){
_f.message=this.nls.ERROR_ACCESS_DENIED;
}else{
if(_10=="ItemExists"){
e.fileChange=true;
e.file=_b;
var _11=lconn.share.util.dom.getChildElementNS(_d.el,"lock",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
if(_11){
var _12=new lconn.share.bean.Lock(_11);
var _13=new lconn.share.util.DateFormat(_12.getLockTime()).format(this.nls.ERROR_ALREADY_LOCKED_BY_USER);
var _c={user:lconn.files.util.HtmlMessage.prototype.USER_LINK,person:_12.getOwner(),error:true};
e.messages=[new lconn.files.util.HtmlMessage(_13,this.app,_c)];
}else{
_f.message=this.nls.ERROR_ALREADY_LOCKED;
}
}else{
_f.message=this.nls.ERROR;
}
}
}
}
}
}else{
e.fileChange=true;
e.file=_b;
_f.success=true;
_f.message=this.nls.INFO_SUCCESS;
}
dojo.publish("lconn/share/action/completed",[e,this]);
}});
}


;if(!dojo._hasResource["lconn.files.action.PurgeAll"]){
dojo._hasResource["lconn.files.action.PurgeAll"]=true;
dojo.provide("lconn.files.action.PurgeAll");


dojo.declare("lconn.files.action.PurgeAll",lconn.share.action.DeferredAction,{constructor:function(_1,_2,_3){
var _4=_1.nls.EMPTY_TRASH;
this.name=_4.ACTION;
this.tooltip=_4.ACTION_TOOLTIP;
},isValid:function(_5,_6){
return true;
}});
}


;if(!dojo._hasResource["lconn.files.action.PurgeFile"]){
dojo._hasResource["lconn.files.action.PurgeFile"]=true;
dojo.provide("lconn.files.action.PurgeFile");


dojo.declare("lconn.files.action.PurgeFile",lconn.share.action.DeferredAction,{constructor:function(_1,_2,_3){
var _4=_1.nls.DELETE_FILE;
this.name=_4.ACTION;
this.tooltip=_4.ACTION_TOOLTIP;
},isValid:function(_5,_6){
return _5.getPermissions().Purge;
}});
}


;if(!dojo._hasResource["lconn.files.action.ReplaceFile"]){
dojo._hasResource["lconn.files.action.ReplaceFile"]=true;
dojo.provide("lconn.files.action.ReplaceFile");


dojo.declare("lconn.files.action.ReplaceFile",lconn.share.action.DeferredAction,{constructor:function(_1,_2,_3){
var _4=_1.nls.REPLACE_FILE;
if(_1.isNestedFolderEnabled){
this.name=_4.ACTION_LONG;
}else{
this.name=_4.ACTION;
}
this.tooltip=_4.ACTION_TOOLTIP;
},isValid:function(_5,_6){
if(_5.getConfiguration().disableGenericEdit){
return false;
}
if(_6&&_6.permissions&&_6.permissions.canEdit){
return _6.permissions.canEdit(_5)||_5.getPermissions().Edit;
}
return _5.getPermissions().Edit;
}});
}


;if(!dojo._hasResource["lconn.files.action.RestoreFile"]){
dojo._hasResource["lconn.files.action.RestoreFile"]=true;
dojo.provide("lconn.files.action.RestoreFile");


dojo.declare("lconn.files.action.RestoreFile",lconn.share.action.DeferredAction,{constructor:function(_1,_2,_3){
var _4=_1.nls.RESTORE_FILE;
this.name=_4.ACTION;
this.tooltip=_4.ACTION_TOOLTIP;
},isValid:function(_5,_6){
return _5.getPermissions().Undelete;
}});
}


;if(!dojo._hasResource["lconn.files.action.ShareCollection"]){
dojo._hasResource["lconn.files.action.ShareCollection"]=true;
dojo.provide("lconn.files.action.ShareCollection");


dojo.declare("lconn.files.action.ShareCollection",lconn.share.action.DeferredAction,{isPrimary:true,constructor:function(_1,_2,_3){
var _4=_1.nls.SHARE_COLLECTION;
if(_1.isNestedFolderEnabled){
this.name=_4.ACTION_LONG;
}else{
this.name=_4.ACTION;
}
this.tooltip=_4.ACTION_TOOLTIP;
},isValid:function(_5,_6){
if(!_5.hasFullPermissions()){
throw "Caller did not load permissions with this object, cannot check grant access permissions";
}
return _5.getPermissions().GrantAccess;
}});
}


;if(!dojo._hasResource["lconn.files.action.ShareFile"]){
dojo._hasResource["lconn.files.action.ShareFile"]=true;
dojo.provide("lconn.files.action.ShareFile");


dojo.declare("lconn.files.action.ShareFile",lconn.share.action.DeferredAction,{isPrimary:true,constructor:function(_1,_2){
var _3=_1.nls.SHARE_FILE;
if(_1.isNestedFolderEnabled){
this.name=_3.ACTION_LONG;
}else{
this.name=_3.ACTION;
}
this.tooltip=_3.ACTION_TOOLTIP;
},isValid:function(_4,_5){
return _4.getPermissions().GrantAccessView||_4.getPermissions().GrantAccessEdit;
}});
}


;if(!dojo._hasResource["lconn.files.action.ShowSharingDetails"]){
dojo._hasResource["lconn.files.action.ShowSharingDetails"]=true;
dojo.provide("lconn.files.action.ShowSharingDetails");


dojo.declare("lconn.files.action.ShowSharingDetails",lconn.share.action.Action,{constructor:function(_1,_2,_3){
var _4=this.nls=_1.nls.SHARE_INFO;
},getName:function(_5,_6){
if(!_6.showingGraph){
return this.nls.SHOW_GRAPH;
}
return _6.showingInvolved?this.nls.SHOW_ALL:this.nls.SHOW_INVOLVED;
},isValid:function(_7,_8){
return _8.hasGraph||_8.hasInvolved;
},execute:function(_9,_a){
var _b=_a.widget;
if(!_a.showingGraph){
_b.showGraph();
}else{
if(_a.showingInvolved){
_b.hideInvolved();
}else{
_b.showInvolved();
}
}
}});
}


;if(!dojo._hasResource["lconn.files.action.StopSharing"]){
dojo._hasResource["lconn.files.action.StopSharing"]=true;
dojo.provide("lconn.files.action.StopSharing");


dojo.declare("lconn.files.action.StopSharing",lconn.share.action.DeferredAction,{constructor:function(_1,_2,_3){
var _4=_1.nls.STOP_SHARING_FILE;
var _5=dojo.getObject("authenticatedUser.orgName",false,_1)||_1.nls.ORGNAME_DEFAULT;
this.name=_4.ACTION;
this.tooltip=dojo.string.substitute(_4.ACTION_TOOLTIP,{company:_5});
},isValid:function(_6,_7){
return !_6.isPrivate()&&_6.getPermissions().GrantAccess;
}});
}


;if(!dojo._hasResource["lconn.files.action.ToggleFollowingFile"]){
dojo._hasResource["lconn.files.action.ToggleFollowingFile"]=true;
dojo.provide("lconn.files.action.ToggleFollowingFile");




dojo.declare("lconn.files.action.ToggleFollowingFile",lconn.share.action.Action,{types:["comment","media"],nlsKey:"TOGGLE_FOLLOWING_FILE",constructor:function(_1,_2,_3){
var _4=this.nls=_1.nls[this.nlsKey];
this.tooltip=_4.ACTION_TOOLTIP;
this.app=_1;
},_isFollowing:function(n){
for(var _5 in n){
if(n[_5]){
return true;
}
}
return false;
},isValid:function(_6,_7){
if(lconn.core.config.features("files-nested-folder")){
return this.app.apiType!="cmis"&&this.app.isAuthenticated()&&this.app.getUserPermissions().canFollow(_6)&&(!_6.isFolder()||_6.canFollowing());
}else{
return this.app.apiType!="cmis"&&this.app.isAuthenticated()&&this.app.getUserPermissions().canFollow(_6);
}
},getName:function(_8){
if(!_8.hasNotifications()){
return this.nls.ACTION_ERROR;
}
var _9=this._isFollowing(_8.getNotifications());
return _9?this.nls.ACTION_REMOVE:this.nls.ACTION_ADD;
},execute:function(_a,_b,_c){
if(!_a.hasNotifications()){
var e={messages:{error:true,message:this.nls.UNAVAILABLE}};
dojo.publish("lconn/share/action/completed",[e,this]);
return;
}
if(_c.target){
_b.evtTarget=_c.target;
}
if(_b._ex){
return;
}
_b._ex=true;
var _d=this.app;
var _e=this._isFollowing(_a.getNotifications());
var _f=lconn.share.util.dom;
var _10=_f.ATOM_NAMESPACE;
var _11=_f.DOCUMENTS_ATOM_NAMESPACE;
var doc=_f.newXMLDocument("entry",_10,[_11]);
var _12=doc.documentElement;
var _13=_f.createElementNS(doc,"notifications",_11);
for(var i=0,t;t=this.types[i];i++){
var _14=_f.createElementNS(doc,t,_11);
_14.appendChild(doc.createTextNode(!_e?"on":"off"));
_13.appendChild(_14);
}
_12.appendChild(_13);
var _15=_f.serializeXMLDocument(doc,true);
this.req=_d.net.putXml({url:_a.getUrlEntry(),postData:_15,auth:{preventReload:true},headers:{"Content-Type":"application/atom+xml;charset=\"UTF-8\""}});
this.req.addErrback(dojo.hitch(this,"onError",!_e,_b)).addCallback(dojo.hitch(this,"onSuccess",_a,!_e,_b));
if(_b.allowFastUpdates){
this.onAction(_a,!_e,_b);
}
},onAction:function(_16,_17,opt){
var _18=new lconn.share.bean.PartialFile({notifications:_17?{comment:true,media:true}:{}});
var e={fileChange:true,fileFollowingChange:true,file:_16,newFile:_18,target:opt.evtTarget,response:opt.response};
var msg=dojo.string.substitute(_17?this.nls.FOLLOW.INFO_SUCCESS:this.nls.STOP_FOLLOWING.INFO_SUCCESS,[_16.getName()]);
var _19={success:true,message:msg};
e.messages=_19;
opt._ex=false;
dojo.publish("lconn/share/action/completed",[e,this]);
},onSuccess:function(_1a,_1b,opt,_1c,_1d){
opt.response=_1c;
if(!opt.allowFastUpdates){
this.onAction(_1a,_1b,opt);
}
},onError:function(_1e,opt,_1f){
var _20=_1f?_1f.code:null;
var msg,_21;
if(_20=="cancel"){
msg=this.nls.ERROR_CANCEL;
}else{
if(_20=="timeout"){
msg=this.nls.ERROR_TIMEOUT;
}else{
if(_20=="ItemNotFound"){
msg=this.nls.ERROR_NOT_FOUND;
}else{
if(_20=="unauthenticated"){
_21=true;
}else{
msg=this.nls.ERROR;
}
}
}
}
opt._ex=false;
if(!_21){
var e={messages:{error:true,message:msg}};
dojo.publish("lconn/share/action/completed",[e,this]);
}
}});
}


;if(!dojo._hasResource["lconn.files.action.ToggleSyncFile"]){
dojo._hasResource["lconn.files.action.ToggleSyncFile"]=true;
dojo.provide("lconn.files.action.ToggleSyncFile");








dojo.declare("lconn.files.action.ToggleSyncFile",lconn.share.action.Action,{nlsKey:"TOGGLE_SYNC_FILE",constructor:function(_1,_2,_3){
var _4=this.nls=_1.nls[this.nlsKey];
this.tooltip=_4.ACTION_TOOLTIP;
this.app=_1;
},isValid:function(_5,_6){
return lconn.share.util.configUtil.isFileSyncEnabled(this.app.getAuthenticatedUser())&&this.app.apiType!="cmis"&&this.app.isAuthenticated();
},getName:function(_7){
var _8;
try{
_8=_7.isSyncable();
}
catch(e){
return this.nls.ACTION_ERROR;
}
return _8?this.nls.ACTION_REMOVE:this.nls.ACTION_ADD;
},execute:function(_9,_a,_b){
var _c;
try{
_c=_9.isSyncable();
}
catch(e){
var e={messages:{error:true,message:this.nls.UNAVAILABLE}};
dojo.publish("lconn/share/action/completed",[e,this]);
return;
}
if(_b.target){
_a.evtTarget=_b.target;
}
if(_a._ex){
return;
}
_a._ex=true;
var _d=this.app;
var _e;
if(!_c){
var _f=lconn.share.util.dom;
var _10=_f.ATOM_NAMESPACE;
var _11=_f.DOCUMENTS_ATOM_NAMESPACE;
var doc=_f.newXMLDocument("entry",_10,[_11]);
var _12=doc.documentElement;
var _13=_f.createElementNS(doc,"category",_10);
_13.setAttribute("term","myfilesync");
_13.setAttribute("label","myfilesync");
_13.setAttribute("scheme","tag:ibm.com,2006:td/type");
_12.appendChild(_13);
var _14=_f.serializeXMLDocument(doc,true);
_e=_d.net.postXml({url:_d.routes.getFileFeedServiceUrl(_9.getId()),postData:_14,auth:{preventReload:true},headers:{"Content-Type":"application/atom+xml;charset=\"UTF-8\""}});
}else{
_e=_d.net.deleteXml({auth:{preventReload:true},url:_d.routes.getFileSyncListServiceUrl({ids:[_9.getId()]})});
}
_e.addErrback(dojo.hitch(this,"onError",_c,_a)).addCallback(dojo.hitch(this,"onSuccess",_9,_c,_a));
},onAction:function(_15,_16,opt){
var _17=new lconn.share.bean.PartialFile({syncable:!_16});
var e={fileChange:true,fileSyncChange:true,file:_15,newFile:_17,target:opt.evtTarget,response:opt.response};
var msg=new lconn.files.util.HtmlMessage(_16?this.nls.STOP_SYNC.INFO_SUCCESS:this.nls.SYNC.INFO_SUCCESS,this.app,{success:true,file:_15,item:lconn.files.util.HtmlMessage.prototype.FILE_LINK});
e.messages=msg;
opt._ex=false;
dojo.publish("lconn/share/action/completed",[e,this]);
},onSuccess:function(_18,_19,opt,_1a,_1b){
opt.response=_1a;
this.onAction(_18,_19,opt);
},onError:function(_1c,opt,_1d){
var _1e=_1d?_1d.code:null;
var msg,_1f;
if(_1e=="cancel"){
msg=this.nls.ERROR_CANCEL;
}else{
if(_1e=="timeout"){
msg=this.nls.ERROR_TIMEOUT;
}else{
if(_1e=="ItemNotFound"){
msg=this.nls.ERROR_NOT_FOUND;
}else{
if(_1e=="ItemExists"){
msg=this.nls.ERROR_EXISTS;
}else{
if(_1e=="ItemExistsInLibrary"){
msg=this.nls.ERROR_EXISTS;
}else{
if(_1e=="unauthenticated"){
_1f=true;
}else{
msg=this.nls.ERROR;
}
}
}
}
}
}
opt._ex=false;
if(!_1f){
var e={messages:{error:true,message:msg}};
dojo.publish("lconn/share/action/completed",[e,this]);
}
}});
}


;if(!dojo._hasResource["lconn.files.action.ToggleFollowingFolder"]){
dojo._hasResource["lconn.files.action.ToggleFollowingFolder"]=true;
dojo.provide("lconn.files.action.ToggleFollowingFolder");


dojo.declare("lconn.files.action.ToggleFollowingFolder",lconn.files.action.ToggleFollowingFile,{types:["filesAdded"],nlsKey:"TOGGLE_FOLLOWING_FOLDER",onAction:function(_1,_2,_3){
var _4=new lconn.share.bean.PartialCollection({notifications:_2?{filesAdded:true}:{}});
var e={collectionChange:true,collectionFollowingChange:true,collection:_1,newCollection:_4,target:_3.evtTarget,response:_3.response,focusReset:true,buttonName:"ToggleFollowingFolder"};
var _5=dojo.string.substitute(_2?this.nls.FOLLOW.INFO_SUCCESS:this.nls.STOP_FOLLOWING.INFO_SUCCESS,[_1.getName()]);
var _6={success:true,message:_5};
e.messages=_6;
_3._ex=false;
dojo.publish("lconn/share/action/completed",[e,this]);
}});
}


;if(!dojo._hasResource["lconn.files.action.UnlockFile"]){
dojo._hasResource["lconn.files.action.UnlockFile"]=true;
dojo.provide("lconn.files.action.UnlockFile");


dojo.declare("lconn.files.action.UnlockFile",lconn.share.action.Action,{constructor:function(_1,_2,_3){
var _4=this.nls=_1.nls.UNLOCK_FILE;
_4.ERROR_ACCESS_DENIED=_4.ERROR;
this.name=_4.ACTION;
this.tooltip=_4.ACTION_TOOLTIP;
this.app=_1;
},isValid:function(_5,_6){
return this.app.apiType!="cmis"&&this.app.isAuthenticated()&&_5.getPermissions().Unlock;
},execute:function(_7,_8){
if(_8._ex){
return;
}
_8._ex=true;
var _9=this.app;
var _a=_9.routes.getLockServiceUrl(_7.getId());
this.req=_9.net.deleteXml({url:_a,auth:{preventReload:true},statusText:this.nls.STATUS});
this.req.addBoth(dojo.hitch(this,"onComplete",_7,_8));
},onComplete:function(_b,_c,_d,_e){
_c._ex=false;
var _f={};
var e={messages:_f};
if(_d instanceof Error){
_f.error=true;
var _10=_d?_d.code:null;
if(_10=="unauthenticated"){
return;
}
if(_10=="cancel"){
_f.message=this.nls.ERROR_CANCEL;
}else{
if(_10=="timeout"){
_f.message=this.nls.ERROR_TIMEOUT;
}else{
if(_10=="DocumentNotLocked"){
_f.message=this.nls.ERROR_ALREADY_UNLOCKED;
_f.error=false;
_f.warning=true;
e.fileChange=true;
e.file=_b;
}else{
if(_10=="ItemNotFound"){
_f.message=this.nls.ERROR_NOT_FOUND;
}else{
if(_10=="AccessDenied"){
_f.message=this.nls.ERROR_ACCESS_DENIED;
}else{
_f.message=this.nls.ERROR;
}
}
}
}
}
}else{
e.fileChange=true;
e.file=_b;
_f.success=true;
_f.message=this.nls.INFO_SUCCESS;
}
dojo.publish("lconn/share/action/completed",[e,this]);
}});
}


;if(!dojo._hasResource["lconn.files.action.DeleteFiles"]){
dojo._hasResource["lconn.files.action.DeleteFiles"]=true;
dojo.provide("lconn.files.action.DeleteFiles");


dojo.declare("lconn.files.action.DeleteFiles",[com.ibm.social.layout.DeferredAction],{actionClass:"lconn.files.action.impl.DeleteFiles",constructor:function(_1,_2,_3){
this.app=_1;
this.nls=this.getNls(_1);
this.supportedOnScene=(dojo.getObject("hints.userLikelyToDelete",false,_2));
},getNls:function(_4){
return dojo.getObject("lconn.share.config.features.trash")?_4.nls.MOVE_TO_TRASH:_4.nls.DELETE_FILE;
},getName:function(_5,_6){
return this.nls.ACTION;
},getTooltip:function(_7,_8){
return _7.length==1?this.nls.ACTION_TOOLTIP:this.nls.ACTION_TOOLTIP_X;
},isVisible:function(_9,_a){
return this.supportedOnScene&&this.app.isAuthenticated();
},isEnabled:function(_b,_c){
return !!_b.length;
}});
}


;if(!dojo._hasResource["lconn.files.util.BulkMessageBuilder"]){
dojo._hasResource["lconn.files.util.BulkMessageBuilder"]=true;
dojo.provide("lconn.files.util.BulkMessageBuilder");






dojo.declare("lconn.files.util.BulkMessageBuilder",null,{constructor:function(_1){
dojo.mixin(this,_1);
var _2=null;
if(!this.nls){
_2="BulkMessageBuilder: opts.nls is required";
}else{
if(!this.items){
_2="BulkMessageBuilder: opts.items is required";
}else{
if(!this.results){
_2="BulkMessageBuilder: opts.results is required";
}
}
}
if(_2){
console.error(_2);
throw _2;
}
this.errorFormats=dojo.mixin({"cancel":this.nls.ERROR_1_CANCEL,"timeout":this.nls.ERROR_1_TIMEOUT,"ItemNotFound":this.nls.ERROR_1_NOT_FOUND,"ItemExists":this.nls.ERROR_1_EXISTS,"unauthenticated":this.nls.ERROR_1_NOT_LOGGED_IN,"AccessDenied":this.nls.ERROR_1_ACCESS_DENIED},_1.errorFormats);
this.opts=this.opts||{};
this.messages=[];
try{
this.messages.push(this._buildMessage(this.items,this.results));
}
catch(e){
console.log(e);
}
},test:function(_3){
try{
_3=_3||["cancel","timeout","unauthenticated","ItemNotFound","AccessDenied","unknown"];
var _4=this.items[0];
var _5=[_4,{}];
var _6=function(_7){
var _8=new Error();
_8.code=_7;
return [_4,_8];
};
var _9=this.messages=[];
_9.push(this._buildMessage([_4],[_5]));
_9.push(this._buildMessage([_4,_4],[_5,_5]));
for(var i=0,_a;_a=_3[i];i++){
console.log(_a);
_9.push(this._buildMessage([_4,_4],[_5,_6(_a)],this.opts));
_9.push(this._buildMessage([_4,_4,_4],[_5,_6(_a)],this.opts));
_9.push(this._buildMessage([_4,_4,_4],[_5,_6(_a),_6("cancel")],this.opts));
_9.push(this._buildMessage([_4,_4,_4],[_5,_5,_6(_a)]));
_9.push(this._buildMessage([_4,_4,_4],[_5,_6(_a),_6(_a)]));
_9.push(this._buildMessage([_4,_4,_4,_4],[_5,_5,_6(_a),_6(_a)]));
_9.push(this._buildMessage([_4,_4,_4,_4,_4],[_5,_5,_6(_a)]));
_9.push(this._buildMessage([_4,_4,_4,_4,_4],[_5,_6(_a),_6(_a),_6("cancel")]));
_9.push(this._buildMessage([_4,_4,_4,_4,_4,_4],[_5,_5,_6(_a),_6(_a),_6("cancel"),_6("cancel")]));
_9.push(this._buildMessage([_4],[_6(_a)]));
_9.push(this._buildMessage([_4,_4],[_6(_a),_6(_a)]));
}
}
catch(e){
console.error(e);
}
},isErrorResult:function(_b){
return _b[1] instanceof Error;
},_buildMessage:function(_c,_d){
var _e={};
var _f=this.failedItems=[];
var _10=this.successItems=[];
var _11=this.cancelledItems=[];
for(var i=0;i<_c.length;i++){
if(i>=_d.length){
_11.push({item:_c[i],code:"cancel"});
}else{
if(this.isErrorResult(_d[i])){
if(_d[i][1].code=="cancel"){
_11.push({item:_c[i],code:_d[i][1].code});
}else{
_f.push({item:_c[i],code:_d[i][1].code});
}
}else{
_10.push({item:_c[i]});
}
}
}
var _12=this._getSummaryMessage(_10,_f,_11,_c);
if(_f.length>1){
var d=document;
var _13=d.createElement("div");
var _14=d.createElement("div");
_14.appendChild(_12);
_13.appendChild(_14);
var ol=d.createElement("ol");
var _15=this;
dojo.forEach(_f,function(_16){
var li=d.createElement("li");
li.appendChild(_15._getErrorMessage(_16));
ol.appendChild(li);
});
_13.appendChild(ol);
_e.message=_13;
}else{
_e.message=_12;
}
if(_f.length==0&&_11.length==0&&_10.length==0){
_e.info=true;
}else{
if(_11.length>0){
_e.warning=true;
}else{
if(_10.length>0){
_e.success=true;
}else{
_e.error=true;
}
}
}
return _e;
},formatItem:function(_17){
var div=document.createElement("div");
div.style.display="inline";
var _18=lconn.share.util.html.formatFilename(_17.getLabel());
lconn.share.util.html.breakString(_18,document,div,15);
return div;
},_getSummaryMessage:function(_19,_1a,_1b,_1c){
var _1d=dojo.clone(this.opts);
var d=document;
var _1e=d.createDocumentFragment();
if(_19.length==1){
_1d.item=this.formatItem(_19[0].item);
lconn.share.util.html.substitute(d,_1e,this.nls.INFO_SUCCESS_1,_1d,null,_1d);
}else{
if(_19.length>1){
_1d.count=dojo.number.format(_19.length);
lconn.share.util.html.substitute(d,_1e,this.nls.INFO_SUCCESS_X,_1d,null,_1d);
}
}
_1e.appendChild(document.createTextNode(" "));
if(_1a.length==1){
this._getErrorMessage(_1a[0],_1e);
}else{
if(_1a.length>1){
_1d.count=dojo.number.format(_1a.length);
lconn.share.util.html.substitute(d,_1e,this.nls.ERROR_X,_1d,null,_1d);
}
}
_1e.appendChild(document.createTextNode(" "));
if(_1b.length==1){
this._getErrorMessage(_1b[0],_1e);
}else{
if(_1b.length>1){
_1d.count=dojo.number.format(_1b.length);
lconn.share.util.html.substitute(d,_1e,this.nls.ERROR_X_CANCEL,_1d,null,_1d);
}
}
return _1e;
},_getErrorMessage:function(_1f,_20){
var _21=dojo.clone(this.opts);
_21.item=this.formatItem(_1f.item);
var _22=this.errorFormats[_1f.code];
if(!_22){
_22=this.nls.ERROR_1;
}
return lconn.share.util.html.substitute(document,_20,_22,_21,null,_21);
}});
}

dojo.provide("lconn.files.nls.action")._built=true;
dojo.provide("lconn.files.nls.action.en_us");
lconn.files.nls.action.en_us={"DELETE_MY_SHARE":{"DIALOG_TITLE":"Remove My Share","QUESTION":"Are you sure you want to remove your share with ${0}?","ERROR":"The file was not updated due to an error.","INFO_DEMOTE_SUCCESS":"Changed ${0} from an editor to a reader on this file.","ERROR_TIMEOUT":"Your share was not removed because the server could not be contacted.  Click \'Remove Share\' to try again.","ERROR_CANCEL":"Your share was not removed because the request was cancelled.  Click \'Remove Share\' to try again.","INFO_SUCCESS":"You have removed your share with ${0}.","QUESTION_DUPLICATE":"Are you sure you want to remove your share with ${0}?\n\nNote: Another person has also shared with ${0}, so ${0} will still be able to access the file.","DEMOTE":"Demote to Reader","ACTION":"Remove my share","BUSY":"Removing share...","ACTION_TOOLTIP":"Remove my share with this person","CANCEL":"Cancel","ACTION_TOOLTIP_PERSON":"Remove my share with ${0}","OK":"Remove Share","ERROR_NOT_FOUND":"Your share was not removed because the file has been deleted or is no longer shared with you.","ERROR_NOT_LOGGED_IN":"Your share was not removed because you were not logged in.  Click \'Remove Share\' to try again."},"SIZE":{"B":"${0} B","MB":"${0} MB","KB":"${0} KB","GB":"${0} GB"},"MOVE_TO_TRASH":{"ERROR_X":"${count} files were not moved to the trash due to errors.","DIALOG_TITLE":"Move to Trash","INFO_SUCCESS_1":"${item} was moved to the trash.","QUESTION_RELATED_X":"Are you sure you want to move these files to the trash?\n\n${0}\n\nMoving these files to the trash makes them unavailable to anyone with whom they are presently shared.","ERROR_1_NOT_LOGGED_IN":"${item} was not moved to the trash because you were not logged in. Please log in and try again.","QUESTION_RELATED_X_E":"Are you sure you want to move these files to the trash?\n\n${0}\n\nMoving these files to the trash makes them unavailable to anyone with whom they are presently shared.","INFO_SUCCESS":"${item} was moved to the trash.","ACTION_ENABLED":"Move to Trash button is enabled","ERROR_1":"${item} was not moved to the trash due to an error.","ACTION_TOOLTIP":"Put this file in the trash","ERROR_1_TIMEOUT":"${item} was not moved to the trash because the server could not be contacted.","OK":"OK","ERROR_NOT_LOGGED_IN":"The file was not moved to the trash because you were not logged in.  Click \'OK\' to try again.","ACTION_DISABLED":"Move to Trash button is disabled","QUESTION":"Are you sure you want to move this file to the trash?\n\n${0}","ERROR":"The file was not moved to the trash due to an error.","ERROR_TIMEOUT":"The file was not moved to the trash because the server could not be contacted.  Click \'OK\' to try again.","INFO_SUCCESS_X":"${count} files were moved to the trash.","ERROR_1_ACCESS_DENIED":"${item} was not moved to the trash because you do not have permission to delete this file.","ERROR_1_NOT_FOUND":"${item} has already been moved to the trash or is no longer shared with you.","ERROR_CANCEL":"The file was not moved to the trash because the request was cancelled.  Click \'OK\' to try again.","QUESTION_RELATED":"Are you sure you want to move this file to the trash?\n\n${0}\n\nMoving this file to the trash makes it unavailable to anyone with whom it is presently shared.","ACTION_TOOLTIP_X":"Put the selected files in the trash","ACTION":"Move to Trash","ERROR_X_CANCEL":"Some files may not have been moved to the trash because the request was cancelled.","QUESTION_RELATED_E":"Are you sure you want to move this file to the trash?\n\n${0}\n\nMoving this file to the trash makes it unavailable to anyone with whom it is presently shared.","BUSY":"Moving...","TRASH_LINK_TITLE":"View trash","CANCEL":"Cancel","PERSONALFILES_INFO_SUCCESS":"${item} was moved to personal trash, ${link}.","ERROR_NOT_FOUND":"This file has already been moved to the trash or is no longer shared with you.","QUESTION_X":"Are you sure you want to move these files to the trash?\n\n${0}","ERROR_1_CANCEL":"${item} may not have been moved to the trash because the request was cancelled."},"COPY_FILE":{"ALT_EDIT":"Remove","NAME_HEADER":"File name:","DIALOG_TITLE":"Give Copy to Community","WARN_INVALID_CHARS_IN_NAME":"File names may not contain the following characters: \\ / : * ? \" \x3c \x3e |","WARN_LONG_TAGS":"The specified tags are too long.","COMMUNITY_HEADER":"Community:","WARN_FILE_EXISTS":"A file with that name already exists.","ERROR_QUOTA_VIOLATION":"The file could not be copied because of space restrictions.  To copy this file, ${0} of files or versions would have to be removed.","WARN_NO_FILENAME":"File name is a required field.","TRIM_LONG_FILENAME":"Shorten file name?","WARN_LONG_TAG":"The tag \'${0}\' is too long.","INFO_SUCCESS":"Successfully copied ${link} to community ${community_link}.","TRIM_TAGS":"Shorten tags?","NAME_LABEL_TITLE":"File name","ACTION_TOOLTIP":"Give a copy of this file to a community","OK":"Copy","TRIM_TAG":"Shorten tag?","COMMUNITY_LABEL":"Community:","ERROR_NOT_LOGGED_IN":"The file could not be copied because you were not logged in.  Click \'Copy\' to add this file.","NAME_LABEL":"File name:","WARN_QUOTA_VIOLATION":"The file is larger than the available space. The copy will fail unless ${0} of files or versions are removed.","ACTION_LONG":"Give Copy to Community...","FILE_ALREADY_EXISTS":"A file with the same name already exists. Please choose a different file name.","ERROR":"The file could not be copied.  Please try again later.","FILE_DOES_NOT_EXIST":"This file does not exist. ","ERROR_TIMEOUT":"The file could not be copied because the server could not be contacted.  Click \'Copy\' to try again.","REQUIRED_MARK":"* Required","WARN_NO_COMMUNITY_SELETED":"Type a community name, and then click the community to copy the file to. ","TAGS_LABEL":"Tags:","ERROR_DETAILS_LINK":"Details...","INFO_SUCCESS_PRE_MODERATION":"The file ${name} has been copied to community ${community_link} for review and will be available when approved.","ERROR_DETAILS_TOOLTIP":"Show more details about this error","FIX_INVALID_CHARS_IN_NAME":"Replace invalid characters with \'_\'?","WARN_LONG_FILENAME":"The name is too long.","ERROR_CANCEL":"The file could not be copied because the request was cancelled.  Click \'Copy\' to try again.","TAGS_HEADER":"Tags:","ERROR_FILENAME_INVALID_CHARACTERS":"The file name may not contain the characters: % & \\ \"","ACTION":"Give Copy to Community","ERROR_MAX_CONTENT_SIZE":"The file could not be copied because it is larger than the maximum allowed file size of ${0}","CANCEL":"Cancel","REQUIRED_FIELD":"Required field","ERROR_ACCESS_DENIED":"You do not have permission to edit this file."},"EMPTY_TRASH":{"DIALOG_TITLE":"Empty Trash","QUESTION":"Are you sure you want to permanently delete all files in the trash?","ERROR":"The trash was not emptied due to an error.","ERROR_TIMEOUT":"The trash was not emptied because the server could not be contacted.  Click \'OK\' to try again.","ERROR_CANCEL":"The trash was not emptied because the request was cancelled.  Click \'OK\' to try again.","INFO_SUCCESS":"All files in the trash have been permanently deleted.","ACTION":"Empty Trash","BUSY":"Emptying...","CANCEL":"Cancel","ACTION_TOOLTIP":"Permanently delete all files in the trash","OK":"OK","ERROR_ACCESS_DENIED":"You do not have permission to permanently delete all files.","ERROR_NOT_LOGGED_IN":"The trash was not emptied because you were not logged in.  Click \'OK\' to try again.","ERROR_NOT_FOUND":"You no longer have permission to permanently delete these files."},"CREATE_COMMUNITY_FOLDER":{"DIALOG_TITLE":"New Folder","ACTION":"New Folder...","ACTION_TOOLTIP":"Create a new folder to put files into","OK":"Create"},"REAUTHENTICATE":{"NAME_LABEL":"User name:","PASSWORD_LABEL":"Password:","DIALOG_TITLE":"Log In Again","GO_TO_LOGIN_PAGE":"Or, discard any unsaved changes and go to the full log in page.","ERROR":"The username or password was not valid.","BUSY":"Authenticating...","CANCEL":"Cancel","OK":"Log In","INFO":"You are no longer logged in to IBM Connections.  To continue your current work and preserve any input you have entered please reauthenticate. "},"REMOVE_FROM_COMMUNITY":{"DIALOG_TITLE":"Remove from Community","ACTION_TOOLTIP_COLLECTION":"Remove from the community ${0}","QUESTION":"Are you sure you want to remove this file from the community ${communityLink}?\n\n${fileName}","ERROR":"The community could not be updated due to an error.","ERROR_TIMEOUT":"The community was not updated because the server could not be contacted.  Click \'OK\' to try again.","ERROR_CANCEL":"The community was not updated because the request was cancelled.  Click \'OK\' to try again.","INFO_SUCCESS":"The file was removed from the community.","ACTION":"Remove","BUSY":"Removing...","ACTION_TOOLTIP":"Remove from community","CANCEL":"Cancel","OK":"OK","ERROR_NOT_LOGGED_IN":"The community was not updated because you were not logged in.  Click \'OK\' to try again.","ERROR_ACCESS_DENIED":"You do not have permission to remove this item from the community.","ERROR_NOT_FOUND":"This community has been deleted or you are no longer a member."},"DELETE_FILE":{"DIALOG_TITLE":"Delete File","ERROR_X":"${count} files were not deleted due to errors.","INFO_SUCCESS_1":"${item} was deleted.","QUESTION_RELATED_X":"Are you sure you want to permanently delete these files?\n\n${0}\n\nDeleting these files makes them unavailable to all people, groups, status updates, and communities with whom they have been shared.","ERROR_1_NOT_LOGGED_IN":"${item} was not deleted because you were not logged in. Please log in and try again.","QUESTION_RELATED_X_E":"Are you sure you want to permanently delete these files?\n\n${0}\n\nDeleting these files makes them unavailable to all people, groups, and status updates with whom they have been shared.","INFO_SUCCESS":"${0} was deleted.","ERROR_1":"${item} was not deleted due to an error.","ACTION_TOOLTIP":"Permanently delete this file","OK":"Delete","ERROR_1_TIMEOUT":"${item} was not deleted because the server could not be contacted.","ERROR_NOT_LOGGED_IN":"The file was not deleted because you were not logged in.  Click \'OK\' to delete the file.","QUESTION":"Are you sure you want to permanently delete this file?\n\n${0}","ERROR":"The file was not deleted due to an error.","ERROR_TIMEOUT":"The file was not deleted because the server could not be contacted.  Click \'OK\' to try again.","INFO_SUCCESS_X":"${count} files were deleted.","ERROR_1_ACCESS_DENIED":"${item} was not deleted because you do not have permission to delete this file.","ERROR_CANCEL":"The file was not deleted because the request was cancelled.  Click \'OK\' to try again.","ERROR_1_NOT_FOUND":"${item} has already been deleted or is no longer shared with you.","QUESTION_RELATED":"Are you sure you want to permanently delete this file?\n\n${0}\n\nDeleting the file makes it unavailable to all people, groups, status updates, and communities with whom it has been shared.","ACTION_TOOLTIP_X":"Permanently delete the selected files","ACTION":"Delete","QUESTION_RELATED_E":"Are you sure you want to permanently delete this file?\n\n${0}\n\nDeleting the file makes it unavailable to all people, groups, and status updates with whom it has been shared.","ERROR_X_CANCEL":"Some files may not have been deleted because the request was cancelled.","BUSY":"Deleting...","CANCEL":"Cancel","ERROR_1_CANCEL":"${item} may not have been deleted because the request was cancelled.","QUESTION_X":"Are you sure you want to permanently delete these files?\n\n${0}","ERROR_NOT_FOUND":"This file has already been deleted or is no longer shared with you."},"EDIT_FILE":{"DIALOG_TITLE":"Edit Properties","WARN_INVALID_CHARS_IN_NAME":"File names may not contain the following characters: \\ / : * ? \" \x3c \x3e |","NO_EXT":"This file has no extension.","ERROR_QUOTA_VIOLATION":"The file could not be replaced because of space restrictions.  To replace with this file, ${0} of files or versions would have to be removed. ","SHARE_PROPAGATE":"Sharing:","WARN_NO_FILENAME":"File name is a required field.","TRIM_LONG_FILENAME":"Shorten file name?","ERROR_EXTENSION_VIOLATION":"Files with the extension \'${0}\' are not allowed.","WARN_REMOVE_COLLECTIONS":"This file will be removed from all public folders.","ORIGINAL_EXT":"The original file extension was \'${0}\'.","TRIM_LONG_DESCRIPTION":"Shorten description?","EDITERROR":"The file\'s metadata was not edited due to an error.","PROPAGATE_LABEL":"Allow others to share this file","NAME_LABEL":"Name:","FILE_DOES_NOT_EXIST":"This file does not exist.  Please select a file using the browse button.","FIX_INVALID_CHARS_IN_NAME":"Replace invalid characters with \'_\'?","ERROR_CANCEL":"The file was not edited because the request was cancelled.  Click \'Save\' to try your request again.","DESCRIPTION_LABEL":"Description: ","WARN_LONG_DESCRIPTION":"The description you entered is too long. ","ERROR_FILENAME_INVALID_CHARACTERS":"The file name may not contain the characters: % & \\ \"","ACTION":"Edit Properties","PERMISSIONS_LABEL":"Permissions:","ERROR_NAME_EXISTS":"The file cannot be renamed because another file has the same name.","ERROR_MAX_CONTENT_SIZE":"The file could not be replaced because it is larger than the maximum allowed file size of ${0}","REQUIRED_FIELD":"Required field","WARN_PRE_MODERATION":"This file may be unavailable until the changes are approved by a moderator.","ERROR_EXTENSION_VIOLATION_EMPTY":"Files without an extension are not allowed.","ERROR_ACCESS_DENIED":"You do not have permission to edit this file.","ERROR_NOT_FOUND":"The file could not be edited because it has been deleted or is no longer shared with you.","NAME_HEADER":"Name: ","WARN_FILE_EXISTS":"A file with that name already exists.","ERROR_CONCURRENT_MODIFICATION":"This file was edited by ${user} on ${EEEE}, ${date_long} ${time_long}. Clicking \'Save\' will overwrite the changes.   ","INFO_SUCCESS":"${link} was saved successfully.","NAME_LABEL_TITLE":"Name ","ACTION_TOOLTIP":"Change the file name and description","OK":"Save","SELECT_FILE":"Please select a file to upload","ERROR_NOT_LOGGED_IN":"The file was not edited because you are not logged in.  Click \'Save\' to save your changes.","LIMIT_HELP":"You can replace the contents of this file by selecting a different file.  You must choose a file that is smaller than ${limit} - files above this size are not allowed.","ACTION_LONG":"Edit Properties...","ERROR_TIMEOUT":"The file was not edited because the server could not be contacted.  Click \'Save\' to try your request again.","TRANSFER":"Uploading ${0} @ ${1}/s","REQUIRED_MARK":"* Required","INFO_SUCCESS_PRE_MODERATION":"The file ${name} has been submitted for review. No versions will be available until the new or updated version is approved.","WARN_LONG_FILENAME":"The file name is too long. ","CHANGE_EXT":"Change file extension","BUSY":"Saving...","CANCEL":"Cancel","PUBLIC_LABEL":"Make this file public (shared with everyone)"},"REMOVE_FROM_FILESYNC":{"DIALOG_TITLE":"Remove from Sync","ERROR_X":"${count} files were not removed from Sync due to errors.","INFO_SUCCESS_1":"Sync is no longer enabled for ${item}.","ACTION_DISABLED":"Remove button is disabled","QUESTION":"Are you sure you want to remove this file from Sync?\n\n${0}","INFO_SUCCESS_X":"${count} files were removed from Sync.","ERROR_1_NOT_FOUND":"${item} already has been removed from Sync.","ERROR_1_NOT_LOGGED_IN":"${item} was not removed from Sync because you were not logged in. Please log in and try again.","ERROR_1_ACCESS_DENIED":"${item} was not removed from Sync because you do not have permission to remove this file.","INFO_SUCCESS":"${0} was removed from Sync.","ACTION_TOOLTIP_X":"Remove the selected files from Sync","ACTION":"Remove","ACTION_ENABLED":"Remove button is enabled","ERROR_X_CANCEL":"Some files might not have been removed from Sync because the request was cancelled.","BUSY":"Removing...","ACTION_TOOLTIP":"Remove from Sync","CANCEL":"Cancel","ERROR_1":"${item} was not removed from Sync due to an error.","OK":"OK","ERROR_1_TIMEOUT":"${item} was not removed from Sync because the server could not be contacted.","ERROR_1_CANCEL":"${item} cannot be removed from Sync because the request was cancelled.","QUESTION_X":"Are you sure you want to remove the selected files from Sync?\n\n${0}"},"ADD_ITEM":{"ACTION":"Add","ACTION_TOOLTIP":"Create a new file or folder or share one with this community","COLLECTION_ACTION_TOOLTIP":"Create a file or folder in this folder","DISABLED_ACTION_TOOLTIP":"You don\'t have permission to create content in this folder"},"MAKE_PRIVATE":{"DIALOG_TITLE":"Remove your organization\'s access","QUESTION":"Are you sure you want to remove your organization\'s access to this file?\n\nIf access is removed, then the file is removed from folders and communities allowing organization-level access, and only the owner and people with whom it has been shared can view and work with it.","ERROR":"Organization access to the file could not be removed.","ERROR_ACCESS_DENIED_LOCKED":"Public access to the file was not removed because the file is locked by another user, try again later.","ERROR_TIMEOUT":"Organization access to the file was not removed because the server could not be contacted.  Click \'OK\' to try again.","QUESTION_E":"Are you sure you want to remove your organization\'s access to this file?\n\nIf access is removed, then the file is removed from folders allowing organization-level access, and only the owner and people with whom it has been shared can view and work with it.","ERROR_CANCEL":"Organization access to the file was not removed because the request was canceled.  Click \'OK\' to try again.","INFO_SUCCESS":"The file is now only visible through folders or direct shares.","ACTION":"Remove public access","BUSY":"Removing...","ACTION_TOOLTIP":"Remove your organization\'s access","CANCEL":"Cancel","OK":"OK","ERROR_ACCESS_DENIED":"Public access to the file could not be removed.","ERROR_NOT_FOUND":"Organization access to the file was not removed because the file has been deleted or is no longer visible to you.","ERROR_NOT_LOGGED_IN":"Organization access to the file was not removed because you were not logged in."},"ADD_TAGS":{"DIALOG_TITLE":"Add Tags","ERROR_X":"${count} files were not be tagged due to errors.","WARN_LONG_TAGS":"The specified tags are too long.","INFO_SUCCESS_1":"${item} was tagged with ${tags}.","SELECTED_FILES_X":"${0} files selected.","WARN_LONG_TAG":"The tag \'${0}\' is too long.","ERROR_1_NOT_LOGGED_IN":"${item} could not be tagged because you were not logged in. Please log in and try again.","TRIM_TAGS":"Shorten tags?","ACTION_ENABLED":"Add Tags button is enabled","ACTION_TOOLTIP":"Add tags to this file","ERROR_1":"${item} could not be tagged due to an error.","OK":"Add Tags","ERROR_1_TIMEOUT":"${item} could not be tagged because the server could not be contacted.","WARN_TAG_REQUIRED":"Please enter the tags you want to add.","TRIM_TAG":"Shorten tag?","ACTION_DISABLED":"Add Tags button is disabled","SELECTED_FILES_1":"1 file selected.","INFO_SUCCESS_X":"${count} files were tagged with ${tags}.","TAGS_LABEL":"Tags:","ERROR_1_ACCESS_DENIED":"${item} could not be tagged because you do not have permission to tag this file.","ERROR_1_NOT_FOUND":"${item} could not be tagged because the file has been deleted or is no longer visible.","TAGS_HEADER":"Tags:","ACTION_TOOLTIP_X":"Add tags to the selected files","ACTION":"Add Tags","ERROR_X_CANCEL":"Some files may not have been tagged because the request was cancelled.","BUSY":"Adding tags...","CANCEL":"Cancel","ERROR_1_CANCEL":"${item} may not have been tagged because the request was cancelled."},"REMOVE_FROM_COLLECTION":{"DIALOG_TITLE":"Remove from Folder","ACTION_TOOLTIP_COLLECTION":"Remove from the folder ${0}","QUESTION":"Are you sure you want to remove this file from the folder?\n\n${0}","ERROR":"The folder could not be updated due to an error.","ERROR_TIMEOUT":"The folder was not updated because the server could not be contacted.  Click \'OK\' to try again.","ERROR_CANCEL":"The folder was not updated because the request was cancelled.  Click \'OK\' to try again.","INFO_SUCCESS":"The file was removed from the folder.","ACTION":"Remove from Folder","BUSY":"Removing...","CANCEL":"Cancel","ACTION_TOOLTIP":"Remove this item from this folder","OK":"OK","ERROR_ACCESS_DENIED":"You do not have permission to remove this item from the folder.","ERROR_NOT_LOGGED_IN":"The folder was not updated because you were not logged in.  Click \'OK\' to try again.","ERROR_NOT_FOUND":"This folder has been deleted or is no longer shared with you."},"SHARE_COLLECTION":{"SHARE_PUB_0_1":"This folder is visible to everyone in ${company} and shared with 1 group.","SHARE_PUB_1_0":"This folder is visible to everyone in ${company} and shared with 1 person.","SHARE_SHR_0_1":"This folder is shared with 1 group.","SHARE_SHR_1_0":"This folder is shared with 1 person.","SHARE_PUB_1_1":"This folder is visible to everyone in ${company} and shared with 1 person and 1 group.","SHARE_ALL":"Everyone can contribute to this folder.","DIALOG_TITLE":"Share Folder","SHARE_SHR_1_1":"This folder is shared with 1 person and 1 group.","INVITATION_ERROR":"Content was not shared with the following people because you do not have permission to share with them: ${0}.","SHARE_COMMUNITY_WARN_HAS_FILE":"Sharing with the community \'${0}\' will make this folder visible to everyone in your organization. \n\nAll files which are not visible to everyone in your organization will be removed from this folder.","SHARE_PRI":"This folder is private.","EXTERNAL_WARNING":"You can share this folder with people external to your organization.","EXTERNAL_SHARES_ERROR":"The folder was not shared because it can be only shared inside of your company.","INFO_SUCCESS":"The folder was shared successfully.","ACTION_TOOLTIP":"Give others access to this folder","SHARE_PUB_0_M":"This folder is visible to everyone in ${company} and shared with ${groups} groups.","SHARE_SHR_0_M":"This folder is shared with ${groups} groups.","OK":"Share","SHARE_SHR_M_0":"This folder is shared with ${people} people.","SHARE_PUB_M_0":"This folder is visible to everyone in ${company} and shared with ${people} people.","SHARE_PUB_1_M":"This folder is visible to everyone in ${company} and shared with 1 person and ${groups} groups.","SHARE_SHR_M_1":"This folder is shared with ${people} people and 1 group. ","ERROR_LOAD":"Information about this folder could not be retrieved. Please try again later.","SHARE_PUB_M_1":"This folder is visible to everyone in ${company} and shared with ${people} people and 1 group.","SHARE_SHR_1_M":"This folder is shared with 1 person and ${groups} groups.","ERROR_NOT_LOGGED_IN":"The folder was not shared because you were not logged in.  Click \'Share\' to share this folder.","ACTION_LONG":"Share...","ERROR":"The folder was not shared due to an error.","ERROR_TIMEOUT":"The folder was not shared because the server could not be contacted.  Click \'Share\' to try your request again.","GROUP_NAME":"${0} (group)","GROUP_MARK":"(group)","DESCRIPTION_LABEL":"Description: ","ERROR_CANCEL":"The folder was not shared because the request was cancelled.  Click \'Share\' to try your request again.","ACTION":"Share","BUSY":"Saving...","SHARE_SHR_M_M":"This folder is shared with ${people} people and ${groups} groups.","SHARE_PUB_M_M":"This folder is visible to everyone in ${company} and shared with ${people} people and ${groups} groups.","CANCEL":"Cancel","SHARE_COMMUNITY_WARN":"Sharing with the community \'${0}\' will make this folder visible to everyone in your organization.","SHARE_PUB_0_0":"This folder is visible to everyone in ${company}. ","ERROR_NOT_FOUND":"The folder was not shared because it has been deleted or is no longer shared with you.","SHARE_SHR_0_0":"This folder is shared.","ERROR_ACCESS_DENIED":"The folder was not shared because you are not an owner of this folder."},"PREVIEWFILE":{"ACTION":"Preview","ACTION_TOOLTIP":"Files Preview Page","NAME":"Preview"},"ADD_TO_COLLECTION":{"DIALOG_TITLE":"Add to Folders","INFO_SUCCESS_1":"${filelink} was added to ${collectionlink}. ${undolink}","NO_FILTERED_COLLECTIONS":"You are not a contributor or owner of any folder with the specified name.","ERROR_CANNOT_MOVE_PERSONALFILE_TO_COMMUNITYFOLDER":"You cannot move a personal file into a community folder.","OK_TITLE":"Add this file to the selected folders","SHARE_AS_EDITOR":"Allow members of the selected folders to edit this file","NO_PRIVATE_COLLECTIONS":"You cannot add a shared or private file to a folder that is shared with everyone in your organization. You do not have a private folder at this time.","WARN_PUBLIC_X":"Adding this file to the selected folders will share the file with everyone in your organization.","FILTER_TOOLTIP":"Enter a folder name","ERROR_PUBLIC_COLLECTION":"Only the file owner can add this file to a folder shared with everyone in your organization.","INTERNAL_PRIVATE_FOLDERS_ONLY":"This file cannot be added to folders that are shared with everyone in your organization or that can be shared outside of your organization.","INFO_SUCCESS_SHARED_1":"${filelink} was added to ${collectionlink} and is now shared. ${undolink}","INFO_EXISTS_X":"${filelink} was already in the selected folders.","INFO_SUCCESS_PUBLIC_1":"${filelink} was added to ${collectionlink} and is now shared with everyone in your organization. ${undolink}","INFO_SUCCESS_X":"${filelink} was added to ${count} folders. ${undolink}","ERROR_CANCEL":"The file was not added because the request was cancelled.  Click \'Add to Folders\' to try your request again.","ERROR_ACCESS_DENIED_1":"You do not have permission to add files to the selected folder.","ERROR_NOT_FOUND_1":"The file was not added because the file or the selected folder has been deleted or is no longer shared with you.","DESCRIPTION_LABEL":"Description: ","ERROR_UNSHAREABLE_FILE":"Only the file owner can add this file to a folder.","LABEL_PUBLIC":"You are allowed to contribute to the following folders","ACTION":"Add to Folders","FIND":"Find","ERROR_EXTERNAL_COLLECTION":"The file was not added to this folder because the folder can be shared outside of your organization and the file cannot. ","ALLOW_EDITORS_TO_EDIT_THIS_FILE":"Allow folder editors to edit this file","SELECT_COLLECTION":"You must select a folder that this file will be added to.","MOST_RECENT_COLLECTION":"The last folder selected was ${collectionName}","INTERNAL_FOLDERS_ONLY":"This file cannot be added to folders that can be shared outside of your organization.","INFO_SUCCESS_SHARED_X":"${filelink} was added to ${count} folders and is now shared. ${undolink}","SHOW_ONLY_SOME_FOLDERS":"Showing only folders to which you can add this content.","INFO_SUCCESS_PUBLIC_X":"${filelink} was added to ${count} folders and is now shared with everyone in your organization. ${undolink}","ERROR_ACCESS_DENIED_X":"You do not have permission to add files to one or more of the selected folders.","ERROR_NOT_FOUND_X":"The file was not added because the file or one or more of the selected folders have been deleted or are no longer shared with you.","ACTION_TOOLTIP":"Add this file to a folder","OK":"Add to Folders","ERROR_NOT_LOGGED_IN":"The file was not added because you were not logged in.  Click \'Add to Folders\' to add the file.","PRIVATE_FOLDERS_ONLY":"Only the file owner can add this file to a folder that is shared with everyone in your organization.","UNDO":{"ERROR_PUBLIC":{"TIMEOUT":"${filelink} is still shared with everyone in your organization because the server could not be contacted.","UNKNOWN_ONE":"${filelink} was not removed from ${collectionlink} and is still shared with everyone in your organization due to an error.","CANCEL_ONE":"${filelink} was not removed from ${collectionlink} and is still shared with everyone in your organization because the request was cancelled.","CANCEL_MANY":"${filelink} was not removed from ${count} folders and is still shared with everyone in your organization because the request was cancelled.","UNKNOWN_MANY":"${filelink} was not removed from ${count} folders and is still shared with everyone in your organization due to an error.","TIMEOUT_ONE":"${filelink} was not removed from ${collectionlink} and is still shared with everyone in your organization because the server could not be contacted.","UNKNOWN":"${filelink} is still shared with everyone in your organization due to an error.","CANCEL":"${filelink} is still shared with everyone in your organization because the request was cancelled.","TIMEOUT_MANY":"${filelink} was not removed from ${count} folders and is still shared with everyone in your organization because the server could not be contacted."},"STATUS":"Removing...","INFO_SUCCESS_1":"${filelink} was removed from ${collectionlink}.","INFO_SUCCESS_SHARED_1":"${filelink} was removed from ${collectionlink} and is no longer shared.","ACTION":"Undo","INFO_SUCCESS_PUBLIC_1":"${filelink} was removed from ${collectionlink} and is no longer shared with everyone in your organization.","ERROR_BASE":{"CANCEL_ONE":"${filelink} was not removed from ${collectionlink} because the request was cancelled.","UNKNOWN_ONE":"${filelink} was not removed from ${collectionlink} due to an error.","TIMEOUT":"${filelink} was not removed because the server could not be contacted.","CANCEL_MANY":"${filelink} was not removed from ${count} folders because the request was cancelled.","UNKNOWN_MANY":"${filelink} was not removed from ${count} folders due to an error.","TIMEOUT_ONE":"${filelink} was not removed from ${collectionlink} because the server could not be contacted.","CANCEL":"${filelink} was not removed because the request was cancelled.","UNKNOWN":"${filelink} was not removed due to an error.","TIMEOUT_MANY":"${filelink} was not removed from ${count} folders because the server could not be contacted."},"INFO_SUCCESS_X":"${filelink} was removed from ${count} folders.","INFO_SUCCESS_SHARED_X":"${filelink} was removed from ${count} folders and is no longer shared.","INFO_SUCCESS_PUBLIC_X":"${filelink} was removed from ${count} folders and is no longer shared with everyone in your organization."},"ACTION_LONG":"Add to Folders...","ERROR":"The file was not added due to an error.","MOST_RECENT_COLLECTION_TOOLTIP":"Add file to this folder","ERROR_TIMEOUT":"The file was not added because the server could not be contacted.  Click \'Add to Folders\' to try your request again.","NO_COLLECTIONS_FOR_EDITOR_OR_OWNER":"You are not an editor or owner of any folders.","ERROR_CANNOT_MOVE_COMMUNITYFILE_TO_PERSONALFOLDER":"You cannot move a community file into a personal folder.","OK_ADD_HERE":"Add Here","STATUS":"Adding...","WARN_PUBLIC_1":"Adding this file to the selected folder will share the file with everyone in your organization.","NO_COLLECTIONS":"You are not a contributor or owner of any folders.","FILTER":"Folders named \'${0}\'","LABEL_PRIVATE":"You are allowed to contribute to the following private folders","HEADLESS":{"ERROR_CANCEL":"${filelink} was not added because the request was cancelled.","ERROR_NOT_FOUND_1":"${filelink} was not added because ${filelink} or ${collectionlink} has been deleted or is no longer shared with you.","ERROR_ACCESS_DENIED_1":"You do not have permission to add files to ${collectionlink}.","ERROR_UNSHAREABLE_FILE":"Only the file owner can add ${filelink} to a folder.","ERROR_NOT_FOUND_2":"Community-owned files cannot be added to a personal folder.","ERROR":"${filelink} was not added to ${collectionlink} due to an error.","ERROR_NOT_FOUND_X":"${filelink} was not added because ${filelink} or one or more of the selected folders have been deleted or are no longer shared with you.","ERROR_ACCESS_DENIED_X":"You do not have permission to add files to one or more of the selected folders.","ERROR_TIMEOUT":"${filelink} was not added because the server could not be contacted.","ERROR_EXTERNAL_COLLECTION":"${filelink} was not added because the folder can be shared outside of your organization and the file cannot.","ERROR_PUBLIC_COLLECTION":"Only the file owner can add ${filelink} to a folder shared with everyone in your organization.","ERROR_NOT_LOGGED_IN":"${filelink} was not added because you were not logged in. Please log in and try again."},"BUSY":"Adding...","CANCEL":"Cancel","NO_FILTERED_COLLECTIONS_FOR_EDITOR_OR_OWNER":"You are not an editor or owner of any folder with the specified name.","INFO_EXISTS_1":"${filelink} was already in ${collectionlink}."},"MOVE_FILE":{"DIALOG_TITLE":"Move to...","WARN_PUBLIC":"Adding the selected file to this folder will make the file public (shared with everyone).","CROSS_COMMUNITY_MOVE_NOT_ALLOWED":"The file cannot be moved the a folder in another community.","INFO_SUCCESS_1":"The file was moved to ${target}.","CANNOT_MOVE_PERSONALFILE_TO_COMMUNITYFOLDER":"You cannot move a personal file into a community folder.","ACTION_LONG":"Move to...","COLLECTION_TYPE_MISSMATCH":"It is not allowed to move personal file to community owned folder or move community owned file to personal folder.","SOURCE_PARENT_NOT_FOUND":"The folder that contains the file you want to move does not exist any more.","CANNOT_MOVE_COMMUNITYFILE_TO_PERSONALFOLDER":"You cannot move a community file into a personal folder.","ERROR":"The file was not moved to ${target} due to an error.","ITEM_NOT_FOUND_IN_SOURCE_PARENT":"The selected file does not exist in the source folder any more.","ITEM_NOT_FOUND":"The selected file does not exist any more.","INFO":"Moving the file will cause other people to lose access to the file.","TARGET_PARENT_NOT_FOUND":"The target folder you want to move to does not exist any more.","EXTERNAL_COLLECTION":"The file was not moved into this folder because the folder can be shared outside of your organization and the file cannot.","ACTION":"Move to","ACCESS_DENIED":"You do not have permission to move file to the selected folder.","BUSY":"Moving...","ACTION_TOOLTIP":"Move this file","CANCEL":"Cancel","OK_MOVE_HERE":"Move Here","SOURCE_NOT_MOVEABLE":"The selected file cannot be moved.","OK":"Move","WARNING":"${item} is in the ${collection} folder. Some people will lose access to this file if you remove it."},"DELETE_SHARE":{"DIALOG_TITLE":"Remove Share","QUESTION":"Are you sure you want to stop sharing with ${0}?\n\nIf you stop sharing, ${0} will only be able to access this file through folders or if it is shared with everyone in your organization.","ERROR":"The file was not updated due to an error.","INFO_DEMOTE_SUCCESS":"Changed ${0} from an editor to a reader on this file.","ERROR_TIMEOUT":"The file was not updated because the server could not be contacted.  Click \'Remove Share\' to try again.","ERROR_CANCEL":"The file was not updated because the request was cancelled.  Click \'Remove Share\' to try again.","INFO_SUCCESS":"The file is no longer shared with ${0}.","DEMOTE":"Demote to Reader","ACTION":"Remove share","BUSY":"Removing shares...","ACTION_TOOLTIP":"Remove all shares with this person","CANCEL":"Cancel","ACTION_TOOLTIP_PERSON":"Remove all shares with ${0}","OK":"Remove Share","ERROR_NOT_LOGGED_IN":"The file was not updated because you were not logged in.  Click \'Remove Share\' to try again.","ERROR_NOT_FOUND":"The file was not updated because the file has been deleted or is no longer shared with you."},"STOP_RESHARING":{"ACTION":"Remove my previous shares...","ACTION_TOOLTIP":"Remove shares you have previously made"},"RESTORE_FILE":{"ERROR_CANCEL":"The file was not restored because the request was cancelled.  Click \'Restore\' to try again.","INFO_SUCCESS":"The file ${link} was restored.","ERROR_EXISTS":"The file was not restored because another file with this name already exists.  Rename or delete the existing file before restoring.","ACTION":"Restore","ERROR":"The file was not restored due to an error.","BUSY":"Restoring...","ERROR_TIMEOUT":"The file was not restored because the server could not be contacted.  Click \'Restore\' to try again.","ACTION_TOOLTIP":"Move this file out of the trash","ERROR_NOT_LOGGED_IN":"The file was not restored because you were not logged in.  Click \'Restore\' to try again.","ERROR_NOT_FOUND":"This file has already been restored or has been permanently deleted."},"EDIT_FILE_RT":{"DIALOG_TITLE":"Edit on Desktop","CONNECTOR_DIALOG_MESSAGE":"This feature allows you to edit the file locally.","OK_TITLE":"Edit on Desktop","ACTION":"Edit on Desktop","CONNECTOR_DIALOG_WARNING":": Once you complete editing, you must publish a draft using the desktop file connectors. If the file fails to open, you might need to install the desktop plugins.","CONNECTOR_DIALOG_CHECKBOX":"Don\'t show this message again.","BUSY":"Opening...","CANCEL":"Cancel","ACTION_TOOLTIP":"Edit this document","OK":"Edit on Desktop","CONNECTOR_DIALOG_IMPORTANT":"Important"},"COMMUNITYSEARCH":{"HINT_TEXT":"Community name...","NO_RESULTS":"No results for \'${0}\'","SHARE_LINK":"Share with a community...","SOURCE":"a Community"},"DELETE_COLLECTION":{"DIALOG_TITLE":"Delete Folder","QUESTION":"Are you sure you want to delete this folder?\n\n${0}","ERROR":"The folder was not deleted due to an error.","ERROR_TIMEOUT":"The folder was not deleted because the server could not be contacted.  Click \'OK\' to try again.","ERROR_CANCEL":"The folder was not deleted because the request was cancelled.  Click \'OK\' to try again.","INFO_SUCCESS":"The folder was deleted.","CONFIRMATION":"This folder and all subfolders will be permanently deleted. Files will be removed, but will not be deleted.","ACTION":"Delete","BUSY":"Deleting...","ACTION_TOOLTIP":"Delete this folder","CANCEL":"Cancel","OK":"Delete","ERROR_NOT_LOGGED_IN":"The folder was not deleted because you were not logged in.  Click \'OK\' to delete the folder.","ERROR_NOT_FOUND":"This folder has already been deleted or is no longer shared with you.","ERROR_ACCESS_DENIED":"You do not have permission to delete this folder."},"USERSEARCH":{"SEARCH_USERS_BUTTON":"Search","PERSON_SOURCE":"a Person","GROUP_HINT_TEXT":"Group name...","USER_EMAIL":"Email","INACTIVE":"(inactive)","ERROR_LINK":"Search for People","TITLE_BLURB":"Need to find someone\'s files?  Enter their name or email address in the search field, below.  As you type, we\'ll show you a list of possible matches. If you can\'t find the person you are searching for in the list, just click the Search button to see a list of all the possible matches in the directory.","INVITATION_TIP":"Entry must be an email address","NO_MATCHES":"No matches","SEARCH_DIRECTORY":"Person not listed? Use full search...","NO_RESULTS":"No results for \'${0}\'","TITLE":"Search Results","INVITATION":"Share using email address","QUERY_TOO_SHORT":"Enter a longer search query to view results","PERSON_HINT_TEXT":"Person name or email...","GROUP_SOURCE":"a Group","LOADING":"Loading...","USER_NAME":"Name"},"MAKE_COLLECTION_PRIVATE":{"DIALOG_TITLE":"Remove your organization\'s access","QUESTION":"Are you sure you want to remove your organization\'s access to this folder?\n\nIf access is removed, only the owner and people with whom it has been shared can view and work with it. ","ERROR":"Organization access to the folder could not be removed.","ERROR_TIMEOUT":"Organization access to the folder was not removed because the server could not be contacted.  Click \'OK\' to try again.","ERROR_CANCEL":"Organization access to the folder was not removed because the request was cancelled.  Click \'OK\' to try again.","INFO_SUCCESS":"The folder is now only visible through direct shares.","ACTION":"Remove public access","BUSY":"Removing...","CANCEL":"Cancel","ACTION_TOOLTIP":"Remove your organization\'s access ","OK":"OK","ERROR_NOT_LOGGED_IN":"Organization access to the folder was not removed because you were not logged in.","ERROR_NOT_FOUND":"Organization access to the folder was not removed because the folder has been deleted or is no longer visible to you."},"MENUBAR":{"HELP":"Help","HELP_TITLE":"Help"},"ADD_FILES_TO_FILESYNC":{"ERROR_X":"${count} files were not added to Sync due to errors.","DIALOG_TITLE":"Add Files","INFO_SUCCESS_1":"Sync is enabled for ${item}. Large files might take a few moments before appearing on your computer.","ACTION_X":"Add to Sync","ERROR_1_NOT_LOGGED_IN":"${item} was not added to Sync because you were not logged in. Please log in and try again.","INFO_SUCCESS":"${0} was added to Sync.","OK_TITLE":"Add the selected files to Sync","ACTION_TOOLTIP":"Add to Sync","ERROR_1":"${item} was not added to Sync due to an error.","ERROR_1_TIMEOUT":"${item} was not added to Sync because the server could not be contacted.","OK":"Add Files","ERROR_1_EXISTS":"Cannot add ${item} because Sync already includes a different file with that name.","ACTION_LONG":"Add Files...","INFO_SUCCESS_X":"${count} files were added to Sync.","ERROR_1_ACCESS_DENIED":"${item} was not added to Sync because you do not have permission to add this file.","ACTION_ENABLED_X":"Add Files button is enabled","ERROR_1_NOT_FOUND":"${item} already has been added to Sync.","STATUS":"Adding...","ACTION_TOOLTIP_X":"Add ${0} files to Sync","ACTION":"Add Files","ERROR_X_CANCEL":"Some files might not have been added to Sync because the request was cancelled. ","BUSY":"Adding...","CANCEL":"Cancel","ACTION_DISABLED_X":"Add Files button is disabled","ERROR_1_CANCEL":"${item} cannot be added to Sync because the request was cancelled."},"DELETE_ATTACHMENT":{"DIALOG_TITLE":"Delete Attachment","QUESTION":"Are you sure you want to delete this attachment?\n\n${0}","ERROR":"The attachment was not deleted due to an error.","ERROR_TIMEOUT":"The attachment was not deleted because the server could not be contacted.  Click \'OK\' to try again.","ERROR_CANCEL":"The attachment was not deleted because the request was cancelled.  Click \'OK\' to try again.","INFO_SUCCESS":"The attachment was deleted.","ACTION":"Delete","BUSY":"Saving...","CANCEL":"Cancel","ACTION_TOOLTIP":"Delete this attachment","OK":"OK","ERROR_NOT_FOUND":"This attachment has already been deleted or is no longer shared with you.","ERROR_NOT_LOGGED_IN":"The attachment was not deleted because you were not logged in.  Click \'OK\' to delete the file."},"TIPS":{"P1":"You can collaborate with colleagues by sharing files with them. To share a file, click the file name in any list and then click Share. ","OLDER":"Older","HIDE_TIPS":"Hide Tips","ERROR":"Unable to load help","H":"Share important content with your colleagues","NEWER":"Newer"},"STOP_SHARING_FILE":{"DIALOG_TITLE":"Stop Sharing File","QUESTION_PUBLIC":"Are you sure you want to stop sharing this file?\n\nThis file will no longer be visible to everyone in your organization, or shared with people, folders, or communities.  This operation cannot be undone.","QUESTION":"Are you sure you want to stop sharing this file?\n\nThe file will no longer be shared with people or communities, and will be removed from all folders except your private folders. This action cannot be undone.","QUESTION_PUBLIC_E":"Are you sure you want to stop sharing this file?\n\nThis file will no longer be visible to everyone in your organization, or shared with people or folders. This operation cannot be undone.","ERROR":"The shares on this file could not be removed.  Please try again later.","ERROR_TIMEOUT":"The shares on this file could not be removed because the server could not be contacted.  Click \'OK\' to try again.","QUESTION_E":"Are you sure you want to stop sharing this file?\n\nThe file will no longer be shared with people, and will be removed from all folders except your private folders. This action cannot be undone.","ERROR_CANCEL":"The shares on this file were not removed because the request was cancelled.  Click \'OK\' to try again.","INFO_SUCCESS":"This file is now private.","ACTION":"Stop Sharing this File","BUSY":"Removing shares...","ACTION_TOOLTIP":"Remove all shares for this file and remove from all shared folders or folders that are visible to everyone in your organization","CANCEL":"Cancel","OK":"OK","ERROR_NOT_FOUND":"The file has been deleted or is no longer shared with you."},"SHARING":{"SHARED_WITH":{"MONTH":"Shared with ${user} on ${MMM} ${d}","TODAY":"Shared with ${user} today at ${time}","YESTERDAY":"Shared with ${user} yesterday at ${time}","DAY":"Shared with ${user} on ${EEEE} at ${time}","YEAR":"Shared with ${user} on ${date_long}"},"EXPAND_ERROR":{"TIMEOUT":"The details of this share could not be loaded because the server could not be contacted.","NOT_FOUND":"The details of this share could not be loaded because the file has been deleted or is no longer visible.","GENERIC":"An error prevented the details of this share from being displayed.  Please try again later.","CANCEL":"The details of this share could not be loaded because the request was cancelled."},"USERS_POPUP_FILE":{"ADD":"Add","COMMUNITY_MEMBERS":"${0}","READERS_LABEL":"Readers:\xa0","EMPTY_CONTRIBUTORS":"None","EXTERNAL":"This file is shared with external people or communities:","CONTRIBUTORS_LABEL":"Editors:\xa0","READER_IF_PUBLIC":"Everyone in ${company}","EXTERNAL_E":"This file is shared with external people:","EXTERNAL_COLLECTION":"This folder is shared with external people or communities:","OWNER":"This file is owned by ${user}.","COMMUNITY_OWNERS":"${0} (owners only)","SHOW_MORE":"Show more...","NEVER_SHARED":"You have not shared this file with anyone","ALSO_SHARED_LINK":"folders","ALSO_SHARED":"Other people have access to this file through one or more shared ${0}","EMPTY_READERS":"None","MY_SHARES":"My shares","SHARE_INTENT_COLLECTIONS_T":"Shared externally","OWNER_LABEL":"Owner:\xa0","ERROR":"The server could not be contacted.","ERROR_TIMEOUT":"The server could not be contacted.","COMMUNITY_TOOLTIP":"Shared with members of the community \'${0}\'","EMPTY":"Not shared with anyone","NO_INVOLVED_SHARES":"You have not shared this file or been shared with","ERROR_CANCEL":"The request was cancelled.  Please try again.","SHARE_INTENT_T":"Shared externally","COMMUNITY_TOOLTIP_OWNERS":"Shared with owners of the community \'${0}\'","READER_IF_PUBLIC_TOOLTIP":"This file is visible to everyone in ${company}","ERROR_NOT_FOUND":"This information cannot be displayed because the file has been deleted or is no longer shared with you.","ERROR_ACCESS_DENIED":"This information cannot be displayed because the file has been deleted or is no longer shared with you."},"EVT_VIEW_ONE":{"MONTH":"${user} shared with ${list} on ${MMM} ${d}","TODAY":"${user} shared with ${list} today at ${time}","YESTERDAY":"${user} shared with ${list} yesterday at ${time}","DAY":"${user} shared with ${list} on ${EEEE} at ${time}","YEAR":"${user} shared with ${list} on ${date_long}"},"USERS_POPUP_COLLECTION":{"ERROR_CANCEL":"The request was cancelled.  Please try again.","ADD":"Add","OWNER":"This folder is owned by ${user}.","ERROR":"The server could not be contacted.","ERROR_TIMEOUT":"The server could not be contacted.","GROUP_NAME":"${0} (group)","EMPTY":"Not shared with anyone","ERROR_ACCESS_DENIED":"This information cannot be displayed because the folder has been deleted or is no longer shared with you.","ERROR_NOT_FOUND":"This information cannot be displayed because the folder has been deleted or is no longer shared with you."},"COLLECT":{"EDITOR_LABEL":"Editors:","CONTRIBUTOR_IF_ALL_AUTH":"Everyone in ${company}","ADD_ALL_AUTHED_USERS_AS_EDITOR":"Everyone in ${company} can edit this folder","SHARING_VISIBLE_EXTERNALLY_AND_SHARE_AT_TOP":"Folder may be visible to people outside of your organization. Sharing is set at the top folder.","EDITOR_ROLE":"as Editor","SHARING_VISIBLE_EXTERNALLY":"Folder may be visible to people outside of your organization","CONTRIBUTOR_LABEL_TITLE":"Contributors","VISIBILITY_PUBLIC_LABEL":"Everyone in my organization","SHARE_TYPE_LABEL":"Type","READER_LABEL_TITLE":"Readers","SHARING_VISIBLE_COMMUNITY_MEMBERS":"Folder will be visible to community members only","ADD_MEMBER_HEADER":"Share with:","VISIBILITY_PEOPLE_GROUPS_COMMUNITIES_LABEL":"People, Groups, or Communities","ADD_MEMBER":"Share with:","VISIBILITY_PEOPLE_COMMUNITIES_LABEL":"People or Communities","WARN_OWNER":"You cannot share with the owner of the folder.","ADD_ALL_AUTH_CONTRIBUTOR":"Everyone in ${company} can contribute to this folder","MANAGER_LABEL":"Owners:","SHARING_VISIBLE_ORGANIZATION":"Folder will be visible to your entire organization","ADD_TOOLTIP":"Share with this user","SHARING_VISIBLE_MEMBERS_AND_SHARE_AT_TOP":"Folder will be visible to you and others. Sharing is set at the top folder.","CONTRIBUTOR_EMPTY":"None","VISIBILITY_NO_ONE_LABEL":"No one","VISIBILITY_PEOPLE_GROUPS_LABEL":"People or Groups","SHARING_PRIVATE_AND_SHARE_AT_TOP":"Folder will be visible only to you. Sharing is set at the top folder.","READER_EMPTY":"None","VISIBILITY_PEOPLE_LABEL":"People","VISIBILITY_NO_ONE_DESCRIPTION":"(shared with me only)","WARN_GRANT_ALL_AUTHED_USERS_TO_EDIT_FOLDER":"If you allow everyone to edit this folder, all files that are not visible to your entire organization will be removed.","VISIBILITY_PEOPLE_GROUPS_DESCRIPTION":"(give specific permissions to others)","SELECT_USER_GROUP_DISABLED_ERROR":"Please select a person or community to share with.","EDITOR_LABEL_TITLE":"Editors","SHARING":"Sharing:","SHARE_ROLE_LABEL":"Role","SHARING_VISIBLE_ORGANIZATION_AND_SHARE_AT_TOP":"Folder will be visible to your entire organization. Sharing is set at the top folder.","READER_IF_PUBLIC":"Everyone in ${company}","CONTRIBUTOR_LABEL":"Contributors:","ADD_MEMBER_TITLE":"Share with","VISIBILITY_PUBLIC_DESCRIPTION":"","WARN_AUTH_CHANGE_ALL_AUTH":"Adding everyone as contributors will make this folder public.","SHARING_BY_TOP_LEVEL_FOLDER":"Sharing can only be set at the top level folder: ${topFolder}.","READER_LABEL":"Readers: ","SELECT_USER_GROUP_ENABLED_ERROR":"Please select a person, group or community to share with.","EDITOR_EMPTY":"None","MANAGER_LABEL_TITLE":"Owners","SHARING_BY_TOP_FOLDER":"Sharing is set at the top folder.","SELECT_USER_GROUP_ENABLED_ERROR_E":"Please select a person or group to share with.","WARN_ADD_ALL_AUTHED_USERS_AS_EDITOR":"Adding everyone as editors will make this folder visible to your entire organization.","MANAGER_ROLE":"as Owner","SHARING_HEADER":"Sharing:","READER_ROLE":"as Reader","VISIBILITY_PUBLIC_WARNING":"Files which are not visible to everyone in ${company} will be removed from this folder.","CONTRIBUTOR_ROLE":"as Contributor","MANAGER_EMPTY":"None","NO_MEMBERS":"None","SELECT_USER_GROUP_DISABLED_ERROR_E":"Please select a person to share with."},"SHARED_WITH_TWO":{"MONTH":"Shared with ${user} and ${count} on ${MMM} ${d}","TODAY":"Shared with ${user} and ${count} today at ${time}","YESTERDAY":"Shared with ${user} and ${count} yesterday at ${time}","DAY":"Shared with ${user} and ${count} on ${EEEE} at ${time}","YEAR":"Shared with ${user} and ${count} on ${date_long}"},"EVT_EDIT_ONE":{"MONTH":"${user} added ${list} as an editor on ${MMM} ${d}","TODAY":"${user} added ${list} as an editor today at ${time}","YESTERDAY":"${user} added ${list} as an editor yesterday at ${time}","DAY":"${user} added ${list} as an editor on ${EEEE} at ${time}","YEAR":"${user} added ${list} as an editor on ${date_long}"},"SHARED_WITH_MANY_1":"${0} others","SHARED_BY":{"MONTH":"Shared by ${user} on ${MMM} ${d}","TODAY":"Shared by ${user} today at ${time}","YESTERDAY":"Shared by ${user} yesterday at ${time}","DAY":"Shared by ${user} on ${EEEE} at ${time}","YEAR":"Shared by ${user} on ${date_long}"},"RELATED_MICROBLOG":"This file is associated with one or more status updates.","EVT_EDIT_MANY":{"MONTH":"${user} added ${list} as editors on ${MMM} ${d}","TODAY":"${user} added ${list} as editors today at ${time}","YESTERDAY":"${user} added ${list} as editors yesterday at ${time}","DAY":"${user} added ${list} as editors on ${EEEE} at ${time}","YEAR":"${user} added ${list} as editors on ${date_long}"},"EVT_VIEW_MANY":{"MONTH":"${user} shared with ${list} on ${MMM} ${d}","TODAY":"${user} shared with ${list} today at ${time}","YESTERDAY":"${user} shared with ${list} yesterday at ${time}","DAY":"${user} shared with ${list} on ${EEEE} at ${time}","YEAR":"${user} shared with ${list} on ${date_long}"},"SHARED_WITH_MANY":{"MONTH":"Shared with ${user} and ${count} on ${MMM} ${d}","TODAY":"Shared with ${user} and ${count} today at ${time}","YESTERDAY":"Shared with ${user} and ${count} yesterday at ${time}","DAY":"Shared with ${user} and ${count} on ${EEEE} at ${time}","YEAR":"Shared with ${user} and ${count} on ${date_long}"},"SHARED_WITH_TWO_1":"one other"},"ADD_FILES_TO_COLLECTION":{"DIALOG_TITLE":"Add Files","COMM_SHARE_AS_EDITOR_MIXED":"Allow members of this community to edit the selected files that I own ","INFO_SUCCESS_1":"${filelink} was added to ${collectionlink}. ${undolink}","EXTERNAL_FILES_ONLY":"This folder can be shared with people external to your organization. You can only select files that can be shared outside of your organization.","CONFIRM_BROWSE":"Are you sure you want to discard the current selection and upload a file from your computer?","INFO_SUCCESS_NOUNDO_X":"${count} files were added to ${collectionlink}.","OK_TITLE":"Add the selected files to this folder","BROWSE_MY_COMPUTER":"Browse Files on My Computer...","ERROR_1":"The file was not added due to an error.","SHARE_AS_EDITOR_FOR_MEMBERS_MIXED":"Allow members of this folder to edit the selected files that I own","SHARE_AS_EDITOR":"Allow editors of this folder to edit the selected files","WARN_PUBLIC_X":"Adding the selected files to this folder will share the file with everyone in your organization.","ERROR_TIMEOUT_1":"The file was not added because the server could not be contacted.  Click \'Add Files\' to try your request again.","ERROR_CANCEL_1":"The file was not added because the request was cancelled.  Click \'Add Files\' to try your request again.","INFO_SUCCESS_SHARED_1":"${filelink} was added to ${collectionlink} and is now shared. ${undolink}","INFO_EXISTS_X":"The selected files were already in this folder.","INFO_SUCCESS_PUBLIC_1":"${filelink} was added to ${collectionlink} and is now shared with everyone in your organization. ${undolink}","PUBLIC_FILES_ONLY":"Only files shared with everyone in your organization can be added to this folder.","INFO_SUCCESS_X":"${count} files were added to ${collectionlink}. ${undolink}","ERROR_ACCESS_DENIED_1":"You do not have permission to add the selected file to this folder.","ERROR_NOT_FOUND_1":"This folder or the selected file has been deleted or is no longer shared with you.","PUBLIC_EXTERNAL_FILES_ONLY":"This folder is shared with everyone in your organization, and can also be shared with people external to your organization. You can only select files that can be shared publically and externally.","ACTION":"Add Files","UNSHAREABLE_FILE":"Only the file owner can add this file to a folder.","ERROR_EXTERNAL_COLLECTION":"The file was not added to this folder because the folder can be shared outside of your organization and the file cannot.","SHARE_AS_EDITOR_FOR_MEMBERS":"Allow members of this folder to edit the selected files","ERROR_X":"The files were not added due to an error.","ERROR_TIMEOUT_X":"The files were not added because the server could not be contacted.  Click \'Add Files\' to try your request again.","ERROR_CANCEL_X":"The files were not added because the request was cancelled.  Click \'Add Files\' to try your request again.","INFO_SUCCESS_SHARED_X":"${count} files were added to ${collectionlink} and are now shared. ${undolink}","INFO_SUCCESS_PUBLIC_X":"${count} files were added to ${collectionlink} and are now shared with everyone in your organization. ${undolink}","ERROR_NOT_LOGGED_IN_1":"The file was not added because you were not logged in.  Click \'Add Files\' to add the file.","SHARE_AS_EDITOR_MIXED_INFO":"Files that you do not own cannot be shared with edit access.","ERROR_ACCESS_DENIED_X":"You do not have permission to add the selected files to this folder.","ERROR_NOT_FOUND_X":"This folder or some of the selected files have been deleted or are no longer shared with you.","ACTION_TOOLTIP":"Add files to this folder","OK":"Add Files","INFO_SUCCESS_NOUNDO_1":"${filelink} was added to ${collectionlink}.","UNDO":{"ERROR_PUBLIC":{"UNKNOWN_X":"${count} files are still shared with everyone in your organization due to an error.","TIMEOUT_1":"${filelink} is still shared with everyone in your organization because the server could not be contacted.","CANCEL_X":"${count} files are still shared with everyone in your organization because the request was cancelled.","TIMEOUT_X":"${count} files are still shared with everyone in your organization because the server could not be contacted.","UNKNOWN_1":"${filelink} is still shared with everyone in your organization due to an error.","CANCEL_1":"${filelink} is still shared with everyone in your organization because the request was cancelled."},"STATUS":"Removing...","INFO_SUCCESS_1":"${filelink} was removed from ${collectionlink}.","ACTION":"Undo","ERROR_BASE":{"TIMEOUT_1":"${filelink} was not removed from ${collectionlink} because the server could not be contacted.","UNKNOWN_X":"${count} files were not removed from ${collectionlink} due to an error.","CANCEL_X":"${count} files were not removed from ${collectionlink} because the request was cancelled.","TIMEOUT_X":"${count} files were not removed from ${collectionlink} because the server could not be contacted.","UNKNOWN_1":"${filelink} was not removed from ${collectionlink} due to an error.","CANCEL_1":"${filelink} was not removed from ${collectionlink} because the request was cancelled."},"INFO_SUCCESS_X":"${count} files were removed from ${collectionlink}."},"ACTION_LONG":"Add Files...","COMM_SHARE_AS_EDITOR":"Allow members of this community to edit the selected files","PRIVATE_FILES_ONLY":"Only public files can be added to this folder.","STATUS":"Adding...","WARN_PUBLIC_1":"Adding the selected file to this folder will share the file with everyone in your organization.","SHARE_AS_EDITOR_MIXED":"Allow editors of this folder to edit the selected files that I own","ERROR_NOT_LOGGED_IN_X":"The files were not added because you were not logged in.  Click \'Add Files\' to add the file.","BUSY":"Adding...","CANCEL":"Cancel","INFO_EXISTS_1":"${filelink} was already in ${collectionlink}."},"CREATE_COLLECTION":{"PRIVATE_DESCRIPTION":"(shared with me only)","DIALOG_TITLE":"New Folder","WARN_INVALID_CHARS_IN_NAME":"Folder names may not contain the following characters: \\ / : * ? \" \x3c \x3e |","INVITATION_ERROR":"Content was not shared with the following people because you do not have permission to share with them: ${0}.","PUBLIC_DESCRIPTION":"","ACTION_SUB_COLLECTION":"New Folder...","TRIM_LONG_FILENAME":"Shorten name?","INFO_SUCCESS":"Successfully created ${link}.","EXTERNAL_ACCESS_HEADER":"External access:","TRIM_LONG_DESCRIPTION":"Shorten description?","WARN_INTERNAL":"Once a folder is created, it is not possible to change permissions to share with others outside of your organization.","NAME_LABEL_TITLE":"Name","ACTION_TOOLTIP":"Create a new folder to put files into","SHARE_WITH_LABEL":"Share with: ","OK":"Create","ERROR_NOT_LOGGED_IN":"The folder was not created because you were not logged in.  Click \'Save\' to create the folder.","NAME_LABEL":"Name: ","WARN_SPECIFY_NAME":"Name is a required field.","ACTION_TOOLTIP_SUB_COLLECTION":"Create a new folder to put files into","ADD_TOOLTIP":"Share with this user","ERROR":"The folder was not created due to an error.","ERROR_TIMEOUT":"The folder was not created because the server could not be contacted.  Click \'Save\' to try your request again.","WARN_CANT_MAKE_INTERNAL":"This setting is disabled because you chose to share with people outside of your organization.","REQUIRED_MARK":"* Required","WARN_CANT_ADD_SUB_FOLDER":"As a reader, you don\'t have permission to add to this folder. If you create a folder, it will appear in \"My Folders\".","EXTERNAL_ACCESS_LABEL":"External access:","ACTION_IN_MENU":"Folder...","WARN_LONG_FILENAME":"The name is too long.","FIX_INVALID_CHARS_IN_NAME":"Replace invalid characters with \'_\'?","ERROR_CANCEL":"The folder was not created because the request was cancelled.  Click \'Save\' to try your request again.","DESCRIPTION_LABEL":"Description: ","WARN_LONG_DESCRIPTION":"The description you entered is too long. ","ERROR_FILENAME_INVALID_CHARACTERS":"The folder name cannot include the following characters: \\ / : * ?  \x3c \x3e |\"","ACTION":"New Folder","SUB_FODLER_ERROR_NAME_EXISTS":"There is already a folder named \'${folder}\' in this folder. Try another name.","PRIVATE_LABEL":"No one","ERROR_NAME_EXISTS":"Another folder with the same name already exists.","BUSY":"Saving...","REQUIRED_FIELD":"Required field","CANCEL":"Cancel","SHARE_COMMUNITY_WARN":"Sharing with the community \'${0}\' will share this folder with everyone in your organization.","TOP_LEVEL_FODLER_ERROR_NAME_EXISTS":"You already own a top level folder named \'${folder}\'. Try another name.","PUBLIC_LABEL":"Everyone in ${company}","SHARING_INTENT":"Folder can be shared with people external to my organization","ERROR_NOT_FOUND":"The folder was not created because it has been deleted or is no longer shared with you.","ERROR_ACCESS_DENIED":"You do not have permission to create a folder.","EXTERNAL_ACCESS_ALLY":"External access help"},"FORCE_MOVE":{"DIALOG_TITLE":"Force Move","OK_HERE":"Move Here","ACTION":"Force Move","BUSY":"Moving...","ACTION_TOOLTIP":"Force Move","CANCEL":"Cancel","MULTI_ITEMS":{"VISIBILITY_CHANGE_FILE_1":"File ${item} will be made to visible to everyone in your organization.","VISIBILITY_FOLDER_FILE_1":"Files in folder ${item} will be removed because they are not visible to everyone. All other files will become visible to everyone in your organization.","VISIBILITY_CHANGE_FOLDER_1":"Folder ${item} contains one or more files are not visible to everyone in your organization. These files will be removed.","RESHAREOFF_FOLDER_FILE_1":"Files in folder ${item} will be removed because the owner does not allow others to share. All other files will become visible to everyone in your organization.","RESHARE_OFF_FOLDER_1":"Folder ${item} contains one or more files that the owner does not allow others to share. These files will be removed.","VISIBILITY_CHANGE_FILE_X":"${filecount} files will be made to visible to everyone in your organization.","VISIBILITY_FOLDER_FILE_X":"Files in ${foldercount} folders will be removed because they are not visible to everyone. All other files will become visible to everyone in your organization.","VISIBILITY_CHANGE_FOLDER_X":"${foldercount} folders contains one or more files are not visible to everyone in your organization. These files will be removed.","RESHAREOFF_FOLDER_FILE_X":"Files in ${foldercount} folders will be removed because the owner does not allow others to share. All other files will become visible to everyone in your organization.","RESHARE_OFF_FOLDER_X":"${foldercount} folders contain one or more files that the owner does not allow others to share. These files will be removed."},"OK":"Move","FILE":{"VISIBILITY_CHANGE_MESSAGE_FOLDER_X":"These folders contain one or more files that the owner does not allow others to share. These files will be removed.","INFO_SUCCESS":"The file was moved to ${target}.","SOURCE_PARENT_NOT_FOUND":"The folder that contains the file you want to move does not exist any more.","VISIBILITY_CHANGE_MESSAGE":"This file will be made to visible to everyone in your organization","ACCESS_DENIED":"You do not have permission to move the file into ${target}.","ERROR":"The file was not moved to ${target} due to an error.","ITEM_NOT_FOUND_IN_SOURCE_PARENT":"The selected file does not exist in the source folder any more.","ITEM_NOT_FOUND":"The selected file does not exist any more.","FILE":{"SOURCE_NOT_MOVEABLE":"The selected file cannot be moved."},"VISIBILITY_CHANGE_MESSAGE_X":"These files will be made to visible to everyone in your organization","TARGET_PARENT_NOT_FOUND":"The target folder you want to move the selected file to does not exist any more."},"FOLDER":{"INFO_SUCCESS":"The folder was moved to ${target}.","VISIBILITY_CHANGE_MESSAGE":"Files that are not visible to everyone in your organization will be removed from this folder","SOURCE_PARENT_NOT_FOUND":"The folder that contains this folder you want to move does not exist any more.","ERROR":"The folder was not moved to ${target} due to an error.","ITEM_NOT_FOUND_IN_SOURCE_PARENT":"The selected folder does not exist in the source folder any more.","ITEM_NOT_FOUND":"The selected folder does not exist any more.","RESHARE_OFF_CHANGE_MESSAGE":"This folder contains one or more files that the owner does not allow others to share.  These files will be removed.","SOURCE_NOT_MOVEABLE":"The selected folder cannot be moved.","TARGET_PARENT_NOT_FOUND":"The target folder you want to move the selected folder to does not exist any more."}},"REPLACE_FILE":{"DIALOG_TITLE":"Upload New Version","ERROR_FILE_REMOVED_FROM_DISK":"An error occurred and the file was removed from the disk following the upload.","ERROR_QUOTA_VIOLATION":"The file could not be replaced because of space restrictions.  To replace with this file, ${0} of files or versions would have to be removed.","ERROR_EXTENSION_VIOLATION":"Files with the extension \'${0}\' are not allowed.","TRIM_LONG_DESCRIPTION":"Shorten change summary?","PROPAGATE_LABEL":"Allow others to share this file","TRANSFER_TIME":{"SEC":"${0} seconds remaining - ${1} (${2}/s)","MIN":"${0} minutes remaining - ${1} (${2}/s)","HOUR":"${0} hours remaining - ${1} (${2}/s)"},"WARN_QUOTA_VIOLATION":"The file is larger than the available space. The upload will fail unless ${0} of files or versions are removed.","FILE_DOES_NOT_EXIST":"This file does not exist.  Please select a file using the browse button.","ERROR_VIRUS_FOUND":"A virus was detected in your new version.  Please run a local virus scan on this file before uploading it again.","INFO_SUCCESS_NOVERSION":"${link} updated.","ERROR_CANCEL":"The file was not edited because the request was cancelled. Click \'Upload\' to try your request again.","ERROR_ITEM_EXISTS":"A file already exists named \'${0}\'.  You must rename the other file before changing this file\'s extension.","WARN_LONG_DESCRIPTION":"The change summary is too long. ","ERROR_FILENAME_INVALID_CHARACTERS":"The file name may not contain the characters: % & \\ \"","ACTION":"Upload New Version","ERROR_QUOTA_VIOLATION_OTHER":"The file could not be replaced because of space restrictions.  To replace with this file, ${0} of files or versions belonging to ${1} would have to be removed.","PERMISSIONS_LABEL":"Permissions:","ERROR_MAX_CONTENT_SIZE":"The file could not be replaced because it is larger than the maximum allowed file size of ${0}","REQUIRED_FIELD":"Required field","WARN_PRE_MODERATION":"This file may be unavailable until the changes are approved by a moderator.","ERROR_EXTENSION_VIOLATION_EMPTY":"Files without an extension are not allowed.","ERROR_ACCESS_DENIED":"You cannot upload new versions. Either this file was locked or the owner removed your editor access.","ERROR_NOT_FOUND":"The file could not be edited because it has been deleted or is no longer shared with you.","ERROR_NAME_TOO_LONG":"Changing the extension of the file to the new extension would make the name of this file too long.  Please shorten the filename by editing the properties of the file.","ERROR_CONCURRENT_MODIFICATION":"This file was edited by ${user} on ${EEEE}, ${date_long} ${time_long}. Clicking \'Upload\' will overwrite the changes.   ","CHANGE_EXTENSION":"Change Extension","INFO_SUCCESS":"${link} updated to version ${version}.","REPLACEERROR":"The file\'s contents were not replaced due to an error.","ACTION_TOOLTIP":"Update the contents of this file","OK":"Upload","ERROR_LOAD":"Information about this file could not be retrieved. Please try again later.","SELECT_FILE":"Please select a file to upload","ERROR_NOT_LOGGED_IN":"The file was not edited because you were not logged in. Click \'Upload\' to try your request again.","ACTION_LONG":"Upload New Version...","LIMIT_HELP":"You can replace the contents of this file by selecting a different file.  You must choose a file that is smaller than ${limit} - files above this size are not allowed.","ERROR":"The file could not be edited due to an error.","REPLACE_LABEL":"New version: ","ERROR_TIMEOUT":"The file was not edited because the server could not be contacted. Click \'Upload\' to try your request again.","TRANSFER":"Uploading ${0} @ ${1}/s ","REQUIRED_MARK":"* Required","ERROR_DETAILS_LINK":"Details...","ERROR_DETAILS_TOOLTIP":"Show more details about this error","INFO_SUCCESS_PRE_MODERATION":"The file ${name} has been submitted for review. No versions will be available until the new or updated version is approved.","UPDATE_MESSAGE":{"BASE":{"MONTH":"This file was last updated by ${user} on ${MMM} ${d}.","TODAY":"This file was last updated by ${user} today at ${time}.","YESTERDAY":"This file was last updated by ${user} yesterday at ${time}.","DAY":"This file was last updated by ${user} on ${EEEE} at ${time}.","YEAR":"This file was last updated by ${user} on ${date_long}."},"WARNING_PUBLIC":{"MONTH":"This file was last updated by ${user} on ${MMM} ${d}.  Check that you have downloaded the latest version of this file.","TODAY":"This file was last updated by ${user} today at ${time}.  Check that you have downloaded the latest version of this file.","YESTERDAY":"This file was last updated by ${user} yesterday at ${time}.  Check that you have downloaded the latest version of this file.","DAY":"This file was last updated by ${user} on ${EEEE} at ${time}.  Check that you have downloaded the latest version of this file.","YEAR":"This file was last updated by ${user} on ${date_long}.  Check that you have downloaded the latest version of this file."},"WARNING":{"MONTH":"You have not downloaded the latest version of this file. ${user} updated this file on ${MMM} ${d}.","TODAY":"You have not downloaded the latest version of this file. ${user} updated this file today at ${time}.","YESTERDAY":"You have not downloaded the latest version of this file. ${user} updated this file yesterday at ${time}.","DAY":"You have not downloaded the latest version of this file. ${user} updated this file on ${EEEE} at ${time}.","YEAR":"You have not downloaded the latest version of this file. ${user} updated this file on ${date_long}."}},"REPLACE_CONFIRM":"The file you have selected has a different extension than the current file.  Click \'Change Extension\' to change the extension from \'${0}\' to \'${1}\'. ","CHANGE_SUMMARY":"Change summary:","BUSY":"Saving...","CANCEL":"Cancel","PUBLIC_LABEL":"Share this file with everyone in your organization"},"JUMPT_TO_SUMMARYPAGE":{"ACTION":"Summary","ACTION_TOOLTIP":"Go to the detailed page of this file","NAME":"Summary"},"MOVE_COLLECTION":{"DIALOG_TITLE":"Move to...","WARN_PUBLIC":"Adding this folder to the selected folder will make the folder public (shared with everyone).","CROSS_COMMUNITY_MOVE_NOT_ALLOWED":"The folder cannot be moved the a folder in another community.","INFO_SUCCESS_1":"The folder was moved to ${target}.","ACCESS_DENIED_1":"Only folder owners can move the top level folder.","INTERNAL_FOLDER_TO_EXTERNAL_FOLDER":"The move failed because ${collection} is an internal folder and ${target} can be shared outside of your organization.","ACCESS_DENIED":"You do not have permission to move the folder to ${target}.","ITEM_EXISTS_SUBFOLDER":"There is already a folder named ${collection} in this folder. Rename one of the folders if you want to try again.","ACTION_TOOLTIP":"Move this folder","SOURCE_NOT_MOVEABLE":"The selected folder cannot be moved.","OK":"Move","ACTION_LONG":"Move to...","SOURCE_PARENT_NOT_FOUND":"The folder that contains the folder you want to move does not exist any more.","COLLECTION_TYPE_MISSMATCH":"It is not allowed to move personal folder to community owned folder or move community owned folder to personal folder.","ERROR":"The folder was not moved to ${target} due to an error.","ITEM_NOT_FOUND_IN_SOURCE_PARENT":"The selected folder does not exist in the source folder any more.","ITEM_NOT_FOUND":"The selected folder you want to move does not exist any more.","ITEM_EXISTS_TOPFOLDER":"You already own a top level folder named ${collection}. Rename one of the folders if you want to try again.","INFO":"Moving the folder will cause other people to lose access to the folder and its content.","TARGET_PARENT_NOT_FOUND":"The target folder you want to move to does not exist any more.","CANNOT_MOVE_PERSONALFOLDER_TO_COMMUNITYFOLDER":"You cannot move a personal folder into a community folder.","ACTION":"Move","CANNOT_MOVE_COMMUNITYFOLDER_TO_PERSONALFOLDER":"You cannot move a community folder into a personal folder.","INVALID_TARGET":"Folders cannot be moved into their own subfolders.","BUSY":"Moving...","CANCEL":"Cancel","OK_MOVE_HERE":"Move Here"},"CREATE_COMMUNITY_FILE":{"DIALOG_TITLE":"Upload Files","ACTION":"New Upload...","ACTION_TOOLTIP":"Upload files from your computer","OK":"Upload"},"CONTENT":{"USER_HAS_NO_PLACE":{"MSG1":"${0} has not been given permission to upload or create files."},"ERROR_REQUEST_UNKNOWN":"An unknown error has occurred.","NEXT_T":"Next page","EDIT":"Edit","LOCKED":"Locked","PREVIOUS_T":"Previous page","BOOLEAN_YES":"Yes","ERROR_REQUEST_TIMEOUT":"The server could not be contacted.","LOADING":"Loading... ","SHARE_INTENT":"Shared externally","FILE_TYPE":"File Type","REMOVE_DISCRIPTION":"Click to remove","TAG_TOOLTIP":"Filter by tag \'${0}\'","SEARCH_FILES_COMMUNITY_FILES":"Community Files","COUNT2":"Showing ${0}-${1}","SORTING_ASC_LONG":"Click to sort by ascending order according to ${0}","EMPTY":{"SEARCH_FILES":{"FILTERED_TAGS":"No search results found because no files match the selected tags.","NORMAL":"There are no files that match your search.","FILTERED":"There are no files that match your keyword and filters."},"COMMUNITY_FILES":{"FILTERED_TAGS":"There are no community files match your keyword with the tags you selected.","FILTERED":"There are no community files that match your keyword and filters.","NORMAL":"There are no community files. "},"DEFAULT":"There are no files from this person","MY_COLLECTIONS":{"FILTERED":"You have no folders that match your filters.","NORMAL":"You have not created any folders."},"MEDIA":{"FILTERED_TAGS":"There are no files from this person that have the tags you selected.","FILTERED":"There are no files from this person that match your filters.","NORMAL":"There are no files from this person."},"SHARED_BY_ME":{"FILTERED_TAGS":"None of the files you have shared have the tags you selected.","NORMAL":"There are no files shared by you.","FILTERED":"There are no files shared by you that match your filters."},"SYNCABLE_FILES":{"FILTERED_TAGS":"You have no synchronizable files with the selected tags.","NORMAL":"You have not synchronized any files yet.","FILTERED":"You have no synchronizable files matching these filters."},"PUBLIC_MEDIA":{"FILTERED_TAGS":"There are no files with the tags you selected.","FILTERED":"There are no files that match your filters.","NORMAL":"There are no files that are shared with your organization."},"DELETED_FILES":{"FILTERED":"There are no deleted files from this person that match your filters.","NORMAL":"There are no deleted files from this person."},"MY_MEDIA":{"FILTERED_TAGS":"You have no files matching the tags you selected.","NORMAL":"You have not uploaded any files.","FILTERED":"You have no files that match these filters."},"FAVORITE_COLLECTIONS":{"FILTERED":"There are no pinned folders that match your filters.","NORMAL":"Keep your frequently-used folders readily available by pinning them to this list. You can add any file to this list by clicking the pin icon ${icon}. ","SHORT":"Add frequently-used folders here by clicking the pin icon ${icon}."},"COLLECTIONS_PUBLIC":{"FILTERED":"There are no folders visible to everyone in your organization that match your filters.","NORMAL":"There are no folders visible to everyone in your organization."},"FAVORITE_FILES":{"FILTERED_TAGS":"You have no pinned files with the selected tags.","NORMAL":"Keep the files you are working on readily available by pinning them to this list.  You can add any file to this list by clicking the pin icon ${icon}.","FILTERED":"You have no pinned files matching these filters."},"COLLECTIONS":{"FILTERED":"There are no folders shared with you that match your filters.","NORMAL":"There are no folders shared with you."},"ALL_COLLECTIONS":{"NORMAL":"There are no folders.","FILTERED":"There are no folders that match your filters."},"SHARED_WITH_ME":{"FILTERED_TAGS":"None of the files shared with you have the tags you selected.","NORMAL":"There are no files shared with you.","FILTERED":"There are no files shared with you that match your filters."},"COLLECTION_CONTRIBUTOR":{"NORMAL":"To add a file to this folder,click \'Add Files\' or  open a file and click \'Add to Folders\'.","FILTERED":"There are no files in this folder that match your filters."},"COLLECTION":{"NORMAL":"There are no files in this folder.","FILTERED":"There are no files in this folder that match your filters."},"MY_DELETED_FILES":{"NORMAL":"There are no files in your trash.","FILTERED":"There are no files in your trash that match your filters."},"SEARCH_COLLECTIONS":{"NORMAL":"There are no folders that match your search."}},"TAGS_LABEL":"Tags: ","EMPTY_MENU":"No actions","FROM_A_COMMUNITY":"From a Community","REMOVE_FILTER_TOOLTIP":"Remove this filter","COUNT_ALT":"Showing items ${0} through ${1} of ${2}","OF_PAGES":"\xa0 of ${0}.","SECTION_COLLAPSED":"Collapsed section","GLOBAL_ACTIONS":"Global actions","HIDE":"Hide","SHOW_ALT":"Show ${0} items per page","SORTING_DESC_LONG":"Click to sort by descending order according to ${0}","ITEMS_PER_PAGE":" items per page","DOWNLOAD_ALT":"Download","VIEW_SELECTION":"Display:","MORE":"More","ERROR_MENU":"An error has occurred","PAGING_TOP_LABEL":"Paging","BOOLEAN_NO":"No","SEARCH_FOR_USER":{"MSG1":"Use the search box at the top of the page to search for a person and view their files. You can also log in to view your own files.     ","FILES":"Use the search box at the top of the page to search for a person and view their files. You can also log in to view your own files."},"OTHER_PEOPLE_FILE":"Other people who have shared this file","NO_DESCRIPTION":"No description provided","ONE_DOWNLOAD":"1","SHARE_TOOLTIP":"Allow others to read or edit this file","PRIVATE":"Private","SHARED":{"BASE":"Shared","MANY_1":"Shared with ${0}","ONE":"${0}","ONE_1":"Shared with 1","COMMUNITY":{"BASE":"Shared with anyone who can see this community","ALT":"Community"},"MANY":"${0}"},"SHARE_MESSAGE":{"LIST_SEP":",\xa0"},"PUBLIC":{"MANY_1":"shared with ${0}","BASE":"Visible to everyone in ${company}","WITH":{"MANY_1":"shared with ${0}","ONE":"Organization access and ${0}","ONE_1":"shared with 1","MANY":"Organization access and ${0}"},"ONE":"Organization access and ${0}","ONE_1":"shared with 1","MANY":"Organization access and ${0}"},"DOWNLOAD_TOOLTIP_ONE_COMMENT_COUNT_ONE":"${0} download, ${0} comment","FOLDER":{"ICON_TOOLTIP":{"PRIVATE":"A Private Folder","COMMUNITY":"A Community Folder","PUBLIC":"A Public Folder","SHARE":"A Shared Folder"}},"USER_HAS_NO_FILES":"There are no files from this person","NOT_LOGGED_IN":{"ACT_IN":"Log In","TITLE":"Log In Now","MESSAGES":"This feature can not be accessed until you are logged in."},"VIEW_SELECTION_CUSTOMIZE":"Customize","USER_NEVER_LOGGED_IN":{"MSG1":"${0} has never logged in to Files.","MSG2":"If you know people who haven\'t started using Files, it\'s easy to get them interested.  Just share a file with them!  They\'ll receive an email letting them know about your file and how to log in."},"DOWNLOAD_TOOLTIP_MANY_COMMENT_COUNT_MANY":"${0} downloads, ${0} comments","PLACE_NOT_FOUND":{"TITLE":"We can\'t find that person","MESSAGES":"The files for this person could not be loaded - click the back button and try again.  If this doesn\'t work the person may no longer be available."},"FILTERED_BY":"Matching: ","DOWNLOAD":"Download","CONTEXT_TITLE":"All actions for this file","DOWNLOAD_TOOLTIP_MANY_COMMENT_COUNT_ONE":"${0} downloads, ${0} comment","SORTING_DESC":"Click to sort by descending order","JUMP_TO_PAGE_ALT":"Jump to a page between ${0} and ${1}","EDIT_PAGE_ERROR":"The file could not be edited due to an error.","PAGE":"Page","MORE_LOAD":"Loading","DOWNLOAD_TOOLTIP_MANY":"${0} views","PAGING_BOTTOM_LABEL":"Paging options","PUBLIC_CAPPED":"Only the first ${0} files that is shared with everyone in your organization are shown here.  Filter or change your sort order to see other files.","REPLACE":"Replace","SORT_BY":"Sort by: ","SEARCH_FILES_ALL_FILES":"All Files","SHARED_FROM_FILES":"Shared from Files","RECOMMEND":"Like","NOHYPHENCOUNT":"${0} of ${1}","YOU_HAVE_NO_PLACE":{"MSG1":"You have not been given permission to upload or create files.  You may still view other people\'s files and collaborate on their files.     ","MSG2":"Administrators determine who is allowed to upload files.  Please contact your administrator if you should have this ability.     "},"SHOWING":"Showing ","VIEW":"View","DOWNLOAD_TOOLTIP_ONE":"${0} view","SHARE_PAGE_TOOLTIP":"Allow others to read or edit this file","HIDE_EXTRA":"Hide extra information","SEARCH_FILES_PERSONAL_FILES":"Personal Files","REMOVE_ITEM_ALT":"Remove ${0}","TAGGED_WITH":"Tagged with \'${0}\' ","DOWNLOAD_TOOLTIP_ONE_COMMENT_COUNT_MANY":"${0} download, ${0} comments","USER_HAS_NO_PAGES":"There are no files from this person","JUMP_TO_PAGE":"Jump to page \xa0","ERROR_REQUEST_CANCELLED":"The request was cancelled.","DOWNLOADS":"${0}","ELLIPSIS":"...","CONTEXT_TITLE_FILE":"Actions for the file ${0}","VIEW_EXTRA":"View more information","CONTEXT_ALT":"Actions","PAGE_ALT":"Page ${0} of ${1}","SEARCH_FILES_SHOW":"Filter by: ","REMOVE_FILTER_ALT":"Remove","REVERT":"Restore","ERROR":"An unknown error has occurred.","LOCKED_BY_YOU":"Locked by you","ERROR_REQUEST_UNAUTHENTICATED":"You must log in again.","COUNT":"${0}-${1} of ${2}","SHARE_INTENT_T":"Shared externally","NEXT":"Next","SECTION_EXPANDED":"Expanded section","MORE_ACTIONS":"More Actions","SORTING_ASC":"Click to sort by ascending order","PREVIOUS":"Previous","SHOW":"Show ","USERERROR":"The person you have requested is no longer available or has been removed from the directory."},"REMOVE_FROM_HIDDEN_COLLECTIONS":{"DIALOG_TITLE":"Remove from Folders","QUESTION":"Are you sure you want to remove this file from all folders and communities you do not have permission to see?\n\n${0}","ERROR":"The file could not be removed from folders due to an error.","ERROR_TIMEOUT":"The file was not removed from folders because the server could not be contacted.  Click \'OK\' to try again.","ERROR_CANCEL":"The file was not removed from folders because the request was cancelled.  Click \'OK\' to try again.","INFO_SUCCESS":"The file was removed from folders that you do not have permission to see.","ACTION":"Remove","BUSY":"Removing...","ACTION_TOOLTIP":"Remove from folders and communities that you do not have permission to see","CANCEL":"Cancel","OK":"OK","ERROR_ACCESS_DENIED":"You do not have permission to remove this item from folders.","ERROR_NOT_FOUND":"This file has been deleted or is no longer shared with you.","ERROR_NOT_LOGGED_IN":"The file was not removed from folders because you were not logged in.  Click \'OK\' to try again."},"ADD_FILE_TO_COLLECTION":{"BULK_INFO_FAIL_X_IN_OTHER_FOLDERS":"${count} files were added to ${collectionlink}. Some files were failed due to permission limitation or reshare is off. Some files are also in other folders. View sharing tab of each file for details.","BULK_WARN_FAIL_SUCCESS_EXIST_INTERNAL_EXTERNAL_1":"${filelink} was added in ${collectionlink}. Some files were already added in the folder. Some files were not added because ${collectionlink} is a folder that can be shared outside of your organization and the files cannot.","BULK_WARN_FAIL_INTERNAL_EXTERNAL_1":"${filelink} was added in ${collectionlink}. Some files were not added because ${collectionlink} is a folder that can be shared outside of your organization and the files cannot.","NO_FILTERED_COLLECTIONS":"You are not a contributor or owner of any folder with the specified name.","BULK_WARN_FAIL_SUCCESS_EXIST_ACCESS_DENIED_1":"${filelink} was added in ${collectionlink}. Some files were already added in the folder. Some files were not added because you do not have permission.","BULK_INFO_FAIL_X_EXIST_RESHAREOFF":"${count} files were added to ${collectionlink}. Some files have existed in the folder. Some files were not added because the owner does not allow others to share them.","BULK_WARN_FAIL_ACCESS_DENIED_1":"${filelink} was added in ${collectionlink}. Some files were not added because you do not have permission.","OK_TITLE":"Add this file to the selected folder","BULK_INFO_FAIL_ITEM_EXISTS_X_IN_OTHER_FOLDERS":"${count} files were added to ${collectionlink}. Some files are already in this folder. Some files are also in other folders. View sharing tab of each file for details.","INFO_SUCCESS_1_IN_OTHER_FOLDERS":"${filelink} was added to ${collectionlink}. ${undolink}. It is also in other folders. View the sharing tab of this file for details.","ACTION_ENABLED":"Add to folder button is enabled","NO_PRIVATE_COLLECTIONS":"You cannot add a shared or private file to a public folder. You do not have a private folder at this time.","FILTER_TOOLTIP":"Enter a folder name","WARN_PUBLIC_XX":"Adding these files to the selected folder will make the file public.","BULK_ERROR_FAIL_INTERNAL_EXTERNAL_1":"${filelink} was not added because ${collectionlink} is a folder that can be shared outside of your organization and the file cannot.","INFO_SUCCESS_SHARED_1":"${filelink} was added to ${collectionlink} and is now shared. ${undolink}","INFO_SUCCESS_PUBLIC_1":"${filelink} was added to ${collectionlink} and is now public. ${undolink}","BULK_ERROR_FAIL_ACCESS_DENIED_1":"${filelink} was not added because you do not have permission.","BULK_WARN_FAIL_SUCCESS_EXIST_INTERNAL_EXTERNAL_X":"${succeedcount} files were added in ${collectionlink}. Some files were already added in the folder. Some files were not added because ${collectionlink} is a folder that can be shared outside of your organization and the files cannot.","BULK_INFO_FAIL_PERMISSION_DENIED":"You do not have permission to add files to ${collectionlink}.","BULK_WARN_FAIL_INTERNAL_EXTERNAL_X":"${succeedcount} files were added in ${collectionlink}. Some files were not added because ${collectionlink} is a folder that can be shared outside of your organization and the files cannot.","ERROR_NOT_FOUND_1":"The file was not added because the selected folder has been deleted or is no longer shared with you.","ACTION_TOOLTIP_X":"Add ${0} files to a folder","LABEL_PUBLIC":"You are allowed to contribute to the following folders","BULK_INFO_FAIL_X_EXIST_COM":"${count} files were added to ${collectionlink}. Some files have existed in the folder. Some community files were not added into a personal folder.","BULK_WARN_FAIL_SUCCESS_EXIST_ACCESS_DENIED_X":"${succeedcount} files were added in ${collectionlink}. Some files were already added in the folder. Some files were not added because you do not have permission.","ACTION":"Add to Folder","BULK_WARN_FAIL_ACCESS_DENIED_X":"${succeedcount} files were added in ${collectionlink}. Some files were not added because you do not have permission.","BULK_WARN_FAIL_SUCCESS_EXIST_CONSTRAINTVIOLATION_1":"${filelink} was added in ${collectionlink}. Some files were already added in the folder. Some files were not added because ${collectionlink} is visibile to everyone in your organization. Only the owner can make this move.","BULK_WARN_FAIL_CONSTRAINTVIOLATION_1":"${filelink} was added in ${collectionlink}. some files were not added because ${collectionlink} is visibile to everyone in your organization. Only the owner can make this move.","MOST_RECENT_COLLECTION":"The last folder selected was ${collectionName}","BULK_INFO_FAIL_PERSONAL_TO_COMMUNITY":"You cannot move personal files shared with the community into a community folder.","BULK_WARN_FAIL_SUCCESS_EXIST_COMMUNITY_TO_PERSONAL_1":"${filelink} was added in ${collectionlink}. Some files were already added in the folder. Some files were not added because community files can not added in a personal folder.","INTERNAL_FOLDERS_ONLY":"This file cannot be added to folder that can be shared outside of your organization.","BULK_ERROR_FAIL_INTERNAL_EXTERNAL_X":"${count} files were not added to this folder because ${collectionlink} is a folder that can be shared outside of your organization and the files cannot.","BULK_INFO_FAIL_COMMUNITY_TO_PERSONAL_X":"${count} files were added to ${collectionlink}. Some community files were not added into a personal folder.","BULK_WARN_FAIL_COMMUNITY_TO_PERSONAL_1":"${filelink} was added in ${collectionlink}. Some files were not added because community files can not added in a personal folder.","INFO_SUCCESS_SHARED_X":"${filelink} was added to ${count} folders and is now shared. ${undolink}","BULK_ERROR_FAIL_EXISTS_1":"${filelink} was already in ${collectionlink}.","SHOW_ONLY_SOME_FOLDERS":"Showing only folders to which you can add this content.","INFO_SUCCESS_PUBLIC_X":"${filelink} was added to ${count} folders and is now public. ${undolink}","BULK_INFO_FAIL_VISIBILITY":"Files were not added because ${collectionlink} is visibile to everyone in your organization, only the owner can add files to public folder.","BULK_ERROR_FAIL_ACCESS_DENIED_X":"${count} files were not added because you do not have permission.","BULK_INFO_SUCCESS_X_IN_OTEHR_FOLDER":"${count} files were added to ${collectionlink}. Some files are also in other folders. View sharing tab of each file for details.","ERROR_NOT_FOUND_X":"The file was not added because one or more of the selected folders have been deleted or are no longer shared with you.","BULK_ERROR_FAIL_CONSTRAINTVIOLATION_1":"${filelink} was not added because ${collectionlink} is visibile to everyone in your organization. Only the owner can make this move.","BULK_WARN_FAIL_SUCCESS_EXIST_PERSONAL_TO_COMMUNITY_1":"${filelink} was moved in ${collectionlink}. Some files were already in the folder. Some files were not added because personal files can not added in a community folder.","BULK_INFO_FAIL_ITEM_EXISTS_1":"${count} file was added to ${collectionlink}. Some files are already in this folder.","BULK_INFO_FAIL_ITEM_EXISTS_1_IN_OTHER_FOLDERS":"${count} file was added to ${collectionlink}. Some files are already in this folder. Some files are also in other folders. View sharing tab of each file for details.","ERROR_NOT_LOGGED_IN":"The file was not added because you were not logged in.  Click \'Add to Folder\' to add the file.","BULK_INFO_FAIL_PERSONAL_TO_COMMUNITY_X":"${count} files were added to ${collectionlink}. Some personal files were not added into a community folder.","BULK_WARN_FAIL_PERSONAL_TO_COMMUNITY_1":"${filelink} was moved in ${collectionlink}. Some files were not added because personal files can not added in a community folder.","PRIVATE_FOLDERS_ONLY":"Only the file owner can add this file to a public folder.","BULK_WARN_FAIL_EXIST_INTERNAL_EXTERNAL_1":"${filelink} was already added in ${collectionlink}. Some files were not added because ${collectionlink} is a folder that can be shared outside of your organization and the files cannot.","BULK_ERROR_FAIL_COMMUNITY_TO_PERSONAL_1":"${filelink} was not added because community files were not added in a personal folder.","BULK_WARN_FAIL_EXISTS_1":"${filelink} was added in ${collectionlink}. ${existcount} files were already in the folder.","ACTION_DISABLED":"Add to folder button is disabled","BULK_WARN_FAIL_SUCCESS_EXIST_CONSTRAINTVIOLATION_X":"${succeedcount} files were added in ${collectionlink}. Some files were already added in the folder. Some files were not added because ${collectionlink} is visibile to everyone in your organization. Only the owner can make this move.","BULK_WARN_FAIL_EXIST_ACCESS_DENIED_1":"${filelink} was already added in ${collectionlink}. Some files were not added because you do not have permission.","BULK_WARN_FAIL_CONSTRAINTVIOLATION_X":"${succeedcount} files were added in ${collectionlink}. Some files were not added because ${collectionlink} is visibile to everyone in your organization. Only the owner can make this move.","BULK_WARN_FAIL_SUCCESS_EXIST_COMMUNITY_TO_PERSONAL_X":"${succeedcount} files were added in ${collectionlink}. Some files were already added in the folder. Some files were not added because community files can not added in a personal folder.","BULK_WARN_FAIL_COMMUNITY_TO_PERSONAL_X":"${succeedcount} files were added in ${collectionlink}. Some files were not added because community files can not added in a personal folder.","BULK_ERROR_FAIL_EXISTS_X":"${existcount} files were already in ${collectionlink}.","WARN_PUBLIC_1":"Adding this file to the selected folder will make the file public (shared with everyone).","BULK_WARN_FAIL_SUCCESS_EXIST_RESHARE_OFF_1":"${filelink} was added in ${collectionlink}. Some files were already added in the folder. Some files were not added because the owner does not allow others to share them.","FILTER":"Folders named \'${0}\'","BULK_INFO_SUCCESS_X":"${count} files were added to ${collectionlink}.","BULK_WARN_FAIL_RESHARE_OFF_1":"${filelink} was added in ${collectionlink}. Some files were not added because the owner does not allow others to share them.","HEADLESS":{"ERROR_CANCEL":"${filelink} was not added because the request was cancelled.","ERROR_ACCESS_DENIED_1":"You do not have permission to add files to ${collectionlink}.","ERROR_NOT_FOUND_1":"${filelink} was not added because ${filelink} or ${collectionlink} has been deleted or is no longer shared with you.","ERROR_UNSHAREABLE_FILE":"Only the file owner can add ${filelink} to a folder.","ERROR_NOT_FOUND_2":"Community-owned files cannot be added to a personal folder.","ERROR_ACCESS_DENIED_X":"You do not have permission to add files to one or more of the selected folders.","ERROR":"${filelink} was not added to ${collectionlink} due to an error.","ERROR_NOT_FOUND_X":"${filelink} was not added because ${filelink} or one or more of the selected folders have been deleted or are no longer shared with you.","ERROR_TIMEOUT":"${filelink} was not added because the server could not be contacted.","ERROR_EXTERNAL_COLLECTION":"${filelink} was not added because the folder can be shared outside of your organization and the file cannot.","ERROR_PUBLIC_COLLECTION":"Only the file owner can add ${filelink} to a public folder.","ERROR_NOT_LOGGED_IN":"${filelink} was not added because you were not logged in. Please log in and try again."},"BULK_ERROR_FAIL_PERSONAL_TO_COMMUNITY_1":"${filelink} was not added because personal files were not added in a community folder.","CANCEL":"Cancel","BULK_INFO_FAIL_X":"${count} files were added to ${collectionlink}. Some files were failed due to permission limitation or reshare is off.","INFO_EXISTS_1":"${filelink} was already in ${collectionlink}.","DIALOG_TITLE":"Add to Folder","BULK_ADD_COMMUNITY_ADD_MOVE_1":"${additem} was added to ${collectionlink}, ${movecount} files were moved to ${collectionlink}.","BULK_ERROR_FAIL_CONSTRAINTVIOLATION_X":"${count} files were not added because because ${collectionlink} is visibile to everyone in your organization. Only the owner can make this move.","BULK_WARN_FAIL_SUCCESS_EXIST_PERSONAL_TO_COMMUNITY_X":"${succeedcount} files were moved in ${collectionlink}. Some files were already in the folder. Some files were not added because personal files can not added in a community folder.","BULK_INFO_FAIL_ITEM_EXISTS_X":"${count} files were added to ${collectionlink}. Some files are already in this folder.","INFO_SUCCESS_1":"${filelink} was added to ${collectionlink}. ${undolink}","BULK_WARN_FAIL_PERSONAL_TO_COMMUNITY_X":"${succeedcount} files were moved in ${collectionlink}. Some files were not added because personal files can not added in a community folder.","BULK_WARN_FAIL_EXIST_INTERNAL_EXTERNAL_X":"${existcount} files were already added in ${collectionlink}. Some files were not added because ${collectionlink} is a folder that can be shared outside of your organization and the files cannot.","BULK_ERROR_FAIL_COMMUNITY_TO_PERSONAL_X":"${count} files were not added because community files were not added in a personal folder.","BULK_WARN_FAIL_EXISTS_X":"${succeedcount} files were added in ${collectionlink}. ${existcount} files were already in the folder.","ACTION_X":"Add to Folder","BULK_ERROR_FAIL_RESHARE_OFF_1":"${filelink} was not added because the owner does not allow others to share it.","BULK_WARN_FAIL_EXIST_ACCESS_DENIED_X":"${existcount} files were already added in ${collectionlink}. Some files were not added because you do not have permission.","SHARE_AS_EDITOR":"Allow members of the selected folder to edit this file","WARN_PUBLIC_X":"Adding this file to the selected folders will make the file public (shared with everyone).","BULK_WARN_FAIL_SUCCESS_EXIST_RESHARE_OFF_X":"${succeedcount} files were added in ${collectionlink}. Some files were already added in the folder. Some files were not added because the owner does not allow others to share them.","ERROR_PUBLIC_COLLECTION":"Only the file owner can add this file to a public folder.","BULK_WARN_FAIL_EXIST_CONSTRAINTVIOLATION_1":"${filelink} was already added in ${collectionlink}. Some files were not added because ${collectionlink} is visibile to everyone in your organization. Only the owner can make this move.","BULK_WARN_FAIL_RESHARE_OFF_X":"${succeedcount} files were added in ${collectionlink}. Some files were not added because the owner does not allow others to share them.","BULK_INFO_FAIL_RESHAREOFF":"The files cannot be moved here because the owner does not allow others to share them.","BULK_ERROR_FAIL_PERSONAL_TO_COMMUNITY_X":"${count} files were not added because personal files were not added in a community folder.","BULK_WARN_FAIL_EXIST_COMMUNITY_TO_PERSONAL_1":"${filelink} was already added in ${collectionlink}. Some files were not added because community files can not added in a personal folder.","INTERNAL_PRIVATE_FOLDERS_ONLY":"This file cannot be added to public folder or folders that can be shared outside of your organization.","INFO_EXISTS_X":"${filelink} was already in the selected folders.","BULK_ADD_COMMUNITY_ADD_MOVE_X":"${addcount} files were added to ${collectionlink}, ${movecount} files were moved to ${collectionlink}.","INFO_SUCCESS_X":"${filelink} was added to ${count} folders. ${undolink}","BULK_ADD_COMMUNITY_MOVE_X":"${count} files were moved to ${collectionlink}.","DESCRIPTION_LABEL":"Description: ","ERROR_ACCESS_DENIED_1":"You do not have permission to add files to the selected folder.","ERROR_CANCEL":"The file was not added because the request was cancelled.  Click \'Add to Folder\' to try your request again.","BULK_INFO_FAIL_COMMUNITY_TO_PERSONAL":"You cannot move community files into a personal folder that is shared with the community.","ERROR_UNSHAREABLE_FILE":"Only the file owner can add this file to a folder.","BULK_ERROR_FAIL_RESHARE_OFF_X":"${count} files were not added because the owner does not allow others to share them.","FIND":"Find","BULK_WARN_FAIL_EXIST_PERSONAL_TO_COMMUNITY_1":"${filelink} was already in ${collectionlink}. Some files were not added because personal files can not added in a community folder.","ERROR_EXTERNAL_COLLECTION":"The file was not added to this folder because the folder can be shared outside of your organization and the file cannot. ","ALLOW_EDITORS_TO_EDIT_THIS_FILE":"Allow folder editors to edit this file","SELECT_COLLECTION":"You must select a folder that this file will be added to.","BULK_WARN_FAIL_EXIST_CONSTRAINTVIOLATION_X":"${existcount} files were already added in ${collectionlink}. Some files were not added because ${collectionlink} is visibile to everyone in your organization. Only the owner can make this move.","BULK_ADD_COMMUNITY_MOVE_ADD_1":"${additem} was added to ${collectionlink}, ${moveitem} was moved to ${collectionlink}.","BULK_INFO_FAIL_ALL_ITEM_EXISTS_X":"All the selected files were already in ${collectionlink}. ","BULK_WARN_FAIL_EXIST_COMMUNITY_TO_PERSONAL_X":"${existcount} files were already added in ${collectionlink}. Some files were not added because community files can not added in a personal folder.","BULK_INFO_FAIL_X_EXIST_PER":"${count} files were added to ${collectionlink}. Some files have existed in the folder. Some personal files were not added into a community folder.","BULK_WARN_FAIL_EXIST_RESHARE_OFF_1":"${filelink} was already added in ${collectionlink}. Some files were not added because the owner does not allow others to share them.","ERROR_ACCESS_DENIED_X":"You do not have permission to add files to one or more of the selected folders.","ACTION_TOOLTIP":"Add this file to a folder","OK":"Add to Folder","BULK_WARN_FAIL_EXIST_PERSONAL_TO_COMMUNITY_X":"${existcount} files were already in ${collectionlink}. Some files were not added because personal files can not added in a community folder.","UNDO":{"ERROR_PUBLIC":{"CANCEL_ONE":"${filelink} was not removed from ${collectionlink} and is still public because the request was cancelled.","TIMEOUT":"Public access to ${filelink} was not removed because the server could not be contacted.","UNKNOWN_ONE":"${filelink} was not removed from ${collectionlink} and is still public due to an error.","CANCEL_MANY":"${filelink} was not removed from ${count} folders and is still public because the request was cancelled.","UNKNOWN_MANY":"${filelink} was not removed from ${count} folders and is still public due to an error.","TIMEOUT_ONE":"${filelink} was not removed from ${collectionlink} and is still public because the server could not be contacted.","UNKNOWN":"Public access to ${filelink} was not removed due to an error.","CANCEL":"Public access to ${filelink} was not removed because the request was cancelled.","TIMEOUT_MANY":"${filelink} was not removed from ${count} folders and is still public because the server could not be contacted."},"STATUS":"Removing...","INFO_SUCCESS_SHARED_1":"${filelink} was removed from ${collectionlink} and is no longer shared.","INFO_SUCCESS_1":"${filelink} was removed from ${collectionlink}.","ACTION":"Undo","INFO_SUCCESS_PUBLIC_1":"${filelink} was removed from ${collectionlink} and is no longer public.","ERROR_BASE":{"CANCEL_ONE":"${filelink} was not removed from ${collectionlink} because the request was cancelled.","TIMEOUT":"${filelink} was not removed because the server could not be contacted.","UNKNOWN_ONE":"${filelink} was not removed from ${collectionlink} due to an error.","UNKNOWN_MANY":"${filelink} was not removed from ${count} folders due to an error.","CANCEL_MANY":"${filelink} was not removed from ${count} folders because the request was cancelled.","TIMEOUT_ONE":"${filelink} was not removed from ${collectionlink} because the server could not be contacted.","UNKNOWN":"${filelink} was not removed due to an error.","CANCEL":"${filelink} was not removed because the request was cancelled.","TIMEOUT_MANY":"${filelink} was not removed from ${count} folders because the server could not be contacted."},"INFO_SUCCESS_SHARED_X":"${filelink} was removed from ${count} folders and is no longer shared.","INFO_SUCCESS_X":"${filelink} was removed from ${count} folders.","INFO_SUCCESS_PUBLIC_X":"${filelink} was removed from ${count} folders and is no longer public."},"ACTION_LONG":"Add to Folder...","ERROR":"The file was not added due to an error.","ERROR_TIMEOUT":"The file was not added because the server could not be contacted.  Click \'Add to Folder\' to try your request again.","MOST_RECENT_COLLECTION_TOOLTIP":"Add file to this folder","NO_COLLECTIONS_FOR_EDITOR_OR_OWNER":"You are not an editor or owner of any folders.","BULK_ADD_COMMUNITY_MOVE_ADD_X":"${addcount} files were added to ${collectionlink}, ${moveitem} was moved to ${collectionlink}.","OK_ADD_HERE":"Add Here","STATUS":"Adding...","NO_COLLECTIONS":"You are not a contributor or owner of any folders.","BULK_WARN_FAIL_EXIST_RESHARE_OFF_X":"${existcount} files were already added in ${collectionlink}. Some files were not added because the owner does not allow others to share them.","LABEL_PRIVATE":"You are allowed to contribute to the following private folders","BUSY":"Adding...","NO_FILTERED_COLLECTIONS_FOR_EDITOR_OR_OWNER":"You are not an editor or owner of any folder with the specified name."},"REMOVE_COLLECTION_MEMBER":{"DIALOG_TITLE":"Stop Sharing","ACTION_TOOLTIP_COMMUNITY":"Remove this community from the folder","QUESTION":"Are you sure you want to stop sharing the folder with this person?\n\n${0}","GROUP_QUESTION":"Are you sure you want to stop sharing the folder with this group?\n\n${0}","ERROR":"The folder could not be updated due to an error.","COMMUNITY_INFO_SUCCESS":"The folder is no longer shared with the community ${0}.","ERROR_TIMEOUT":"The folder was not updated because the server could not be contacted.  Click \'OK\' to try again.","NAME":"Remove","ERROR_CANCEL":"The folder was not updated because the request was cancelled.  Click \'OK\' to try again.","GROUP_INFO_SUCCESS":"The folder is no longer shared with the group ${0}.","INFO_SUCCESS":"The folder is no longer shared with ${0}.","ACTION":"Remove","BUSY":"Removing...","CANCEL":"Cancel","ACTION_TOOLTIP_GROUP":"Remove this group from the folder","ACTION_TOOLTIP":"Remove this person from the folder","COMMUNITY_QUESTION":"Are you sure you want to stop sharing the folder with this community?\n\n${0}","OK":"OK","ERROR_ACCESS_DENIED":"You do not have permission to remove this person from the folder.","ERROR_NOT_FOUND":"This folder has already been deleted or is no longer shared with you.","ERROR_NOT_LOGGED_IN":"The folder was not updated because you were not logged in.  Click \'OK\' to try again."},"ADD_TO_COMMUNITYCOLLECTION":{"SELECT_COLLECTION":"You must select a folder that this file will be added to.","DIALOG_TITLE":"Add to Folder","INFO_SUCCESS_1":"${filelink} has been successfully added to ${collectionlink}.","ACTION_LONG":"Add to Folder...","INFO_SUCCESS_2":"${filelink} has been successfully moved to ${collectionlink}.","HINT":"Add ${0} to one of the following Community folders.","ERROR":"The file was not added due to an error.","ERROR_TIMEOUT":"The file was not added because the server could not be contacted.  Click \'Add to Folder\' to try your request again.","ERROR_CANNOT_MOVE_PERSONALFILE_TO_COMMUNITYFOLDER":"You cannot move a personal file into a community folder.","ERROR_CANNOT_MOVE_COMMUNITYFILE_TO_PERSONALFOLDER":"You cannot move a community file into a personal folder.","ERROR_NOT_FOUND_1":"The file was not added because the selected folder has been deleted.","ERROR_CANCEL":"The file was not added because the request was cancelled.  Click \'Add to Folder\' to try your request again.","OK_ADD_HERE":"Add Here","ERROR_ACCESS_DENIED_1":"You do not have permission to add the file to the selected folder.","OK_TITLE":"Add this file to the selected folder","ACTION":"Add to Folder","BUSY":"Adding...","CANCEL":"Cancel","ACTION_TOOLTIP":"Add this file to a folder","OK":"Add to Folder","ERROR_NOT_LOGGED_IN":"The file was not added because you were not logged in.  Click \'Add to Folder\' to add the file.","INFO_EXISTS_1":"${filelink} was already in ${collectionlink}."},"SHARE_TO_COMMUNITY_FOLDER":{"DIALOG_TITLE":"Share Folder with this Community","ACTION":"Share Folder with Community...","ACTION_TOOLTIP":"See folders Community have shared with you ","OK":"Share Folders"},"MOVE_FILES":{"RESHARE_NOT_ALLOWED_FOLDERS_1":"Folder ${item} was not moved to ${target}, because the owner does not allow others to share it.","DIALOG_TITLE":"Move to...","INFO_SUCCESS_FILES_X_FOLDERS_X":"${succeedfilescount} files and ${succeedfolderscount} folders were successfully moved to ${target}.","TOP_LEVEL_DENIED_FOLDER_X":"${count} folders were not moved, because only folder owner can move the top level folders.","NOT_FOUND_FILES_X":"${count} files were not moved to ${target}, because they do not exist anymore.","NOT_FOUND_IN_SOURCE_PARENT_FILES_1":"File ${item} was not moved to ${target}, because it does not exist in the source folder anymore.","PRIVATE_NOT_ALLOWED_IN_PUBLIC_COLLECTION_FILES_X":"${count} files were not moved to ${target}, because they are not visible to everyone in your organization. ","EXIST_AT_TARGET_FOLDERS_1":"Folder ${item} was not moved to ${target}, because there exists already a folder with the same name in the new location.","NOT_FOUND_ITEMS_X":"${count} items were not moved to ${target}, because they do not exist anymore.","ACCESS_DENIED_FOLDER_X":"${count} folders were not moved, because you do not have permission to move them into ${target}.","INFO_SUCCESS_X_FOLDERS":"${succeedfolderscount} folders were successfully moved to ${target}.","PRIVATE_NOT_ALLOWED_IN_PUBLIC_COLLECTION_ITEMS_X":"${count} items were not moved to ${target}, because they are not visible to everyone in your organization. ","NOT_FOUND_FOLDERS_X":"${count} folders were not moved to ${target}, because they do not exist anymore.","INTERNAL_EXTRENAL_RESTRICTION_ITEM_X":"${count} items were not moved to ${target}, because you can not move internal files and folders into a folder that can be shared outside of your organization.","COMMUNITY_TO_PERSONAL_FILES_1":"File ${item} was not moved to ${target}, because you can not move a community owned file into a personal folder.","ACTION_ENABLED":"Move to button is enabled","INFO_SUCCESS_FILES_1_FOLDERS_X":"${succeedfilescount} file and ${succeedfolderscount} folders were successfully moved to ${target}.","TARGET_PARENT_NOT_FOUND_FILES_X":"${count} files were not moved to ${target}, because ${target} does not exist anymore.","SOURCE_PARENT_NOT_FOUND_FOLDERS_X":"${count} folders were not moved to ${target}, because the folder that contains these folders does not exist anymore.","INVALID_TARGET_FOLDER_1":"Folder ${item} was not moved, because you cannot move it into its subfolder.","COMMUNITY_TO_PERSONAL_FOLDERS_1":"Folder ${item} was not moved to ${target}, because you can not move a community owned folder into a personal folder.","RESHARE_NOT_ALLOWED_FOLDERS_X":"${count} folders were not moved to ${target}, because the owner does not allow others to share them.","TARGET_PARENT_NOT_FOUND_ITEMS_X":"${count} items were not moved to ${target}, because ${target} does not exist anymore.","INFO":"Moving these files and folders will cause other people to lose access to the files and folders.","PERSONAL_TO_COMMUNITY_FILES_1":"File ${item} was not moved to ${target}, because you can not move a personal owned file into a community folder.","NOT_FOUND_IN_SOURCE_PARENT_FILES_X":"${count} files were not moved to ${target}, because they do not exist in the source folder anymore.","SOURCE_PARENT_NOT_FOUND_FILES_1":"File ${item} was not moved to ${target}, because the folder that contains this file does not exist anymore.","PRIVATE_NOT_ALLOWED_IN_PUBLIC_COLLECTION_FOLDERS_1":"Folder ${item} was not moved to ${target}, because they are not visible to everyone in your organization. ","RESHARE_NOT_ALLOWED_FILES_1":"File ${item} was not moved to ${target}, because the owner does not allow others to share it.","EXIST_AT_TARGET_FOLDERS_X":"${count} folders were not moved to ${target}, because there exist already folders with the same names in the new location.","ACCESS_DENIED_ITEM_X":"${count} items were not moved, because you do not have permission to move them into ${target}.","ACTION":"Move to","ACCESS_DENIED_FILE_1":"File ${item} was not moved, because you do not have permission to move it into ${target}.","NOT_FOUND_IN_SOURCE_PARENT_ITEMS_X":"${count} items were not moved to ${target}, because they do not exist in the source folder anymore.","PERSONAL_TO_COMMUNITY_FOLDERS_1":"Folder ${item} was not moved to ${target}, because you can not move a personal owned folder into a community folder.","INTERNAL_EXTRENAL_RESTRICTION_FILES_1":"File ${item} was not moved to ${target}, because you can not move an internal file into a folder that can be shared outside of your organization.","EXIST_AT_TARGET_FILES_1":"File ${item} was not moved to ${target}, because there exists already a file with the same name in the new location.","COMMUNITY_TO_PERSONAL_FILES_X":"${count} files were not moved to ${target}, because you can not move a community owned file into a personal folder.","INFO_SUCCESS_X_FILES":"${succeedfilescount} files were successfully moved to ${target}.","TARGET_PARENT_NOT_FOUND_FOLDERS_1":"Folder ${item} was not moved to ${target}, because ${target} does not exist anymore.","COMMUNITY_TO_PERSONAL_ITEMS_X":"${count} items were not moved to ${target}, because you can not move community owned files and folders into a personal folder.","INTERNAL_EXTRENAL_RESTRICTION_FOLDER_1":"Folder ${item} was not moved to ${target}, because you can not move an internal folder into a folder that can be shared outside of your organization.","INVALID_TARGET_FOLDER_X":"${count} folders were not moved, because you cannot move them into their own subfolder.","COMMUNITY_TO_PERSONAL_FOLDERS_X":"${count} folders were not moved to ${target}, because you can not move community owned folders into a personal folder.","PERSONAL_TO_COMMUNITY_FILES_X":"${count} files were not moved to ${target}, because you can not move a personal owned file into a community folder.","NOT_FOUND_IN_SOURCE_PARENT_FOLDERS_1":"Folder ${item} was not moved to ${target}, because it does not exist in the source folder anymore.","SOURCE_PARENT_NOT_FOUND_FILES_X":"${count} files were not moved to ${target}, because the folder that contains these files does not exist anymore.","PRIVATE_NOT_ALLOWED_IN_PUBLIC_COLLECTION_FOLDERS_X":"${count} folders were not moved to ${target}, because they are not visible to everyone in your organization. ","RESHARE_NOT_ALLOWED_FILES_X":"${count} files were not moved to ${target}, because the owner does not allow others to share them.","ACTION_TOOLTIP":"Move these files and folders","INFO_SUCCESS_FILES_X_FOLDERS_1":"${succeedfilescount} files and ${succeedfolderscount} folder were successfully moved to ${target}.","OK":"Move","INFO_SUCCESS_1_FILES":"File ${succeeditem} was successfully moved to ${target}.","ACCESS_DENIED_FILE_X":"${count} files were not moved, because you do not have permission to move them into ${target}.","PERSONAL_TO_COMMUNITY_ITEMS_X":"${count} items were not moved to ${target}, because you can not move personal owned files and folders into a community folder.","TOP_LEVEL_DENIED_FOLDER_1":"Folder ${item} was not moved, because only folder owner can move the top level folder.","SOURCE_PARENT_NOT_FOUND_ITEMS_X":"${count} items were not moved to ${target}, because the folder that contains these items does not exist anymore.","NOT_FOUND_FILES_1":"File ${item} was not moved to ${target}, because it does not exist anymore.","PRIVATE_NOT_ALLOWED_IN_PUBLIC_COLLECTION_FILES_1":"File ${item} was not moved to ${target}, because they are not visible to everyone in your organization. ","PERSONAL_TO_COMMUNITY_FOLDERS_X":"${count} folders were not moved to ${target}, because you can not move personal owned folders into a community folder.","RESHARE_NOT_ALLOWED_ITEMS_X":"${count} items were not moved to ${target}, because the owner does not allow others to share them.","INTERNAL_EXTRENAL_RESTRICTION_FILES_X":"${count} files were not moved to ${target}, because you can not move internal files into a folder that can be shared outside of your organization.","ACTION_DISABLED":"Move to button is disabled","ACTION_LONG":"Move to...","EXIST_AT_TARGET_FILES_X":"${count} files were not moved to ${target}, because there exist already files with the same names in the new location.","ERROR":"These files and folders were not moved to ${target} due to an error.","ACCESS_DENIED_FOLDER_1":"Folder ${item} was not moved, because you do not have permission to move it into ${target}.","INFO_SUCCESS_1_FOLDERS":"Folder ${succeeditem} was successfully moved to ${target}.","TARGET_PARENT_NOT_FOUND_FOLDERS_X":"${count} folders were not moved to ${target}, because ${target} does not exist anymore.","NOT_FOUND_FOLDERS_1":"Folder ${item} was not moved to ${target}, because it does not exist anymore.","EXIST_AT_TARGET_ITEMS_X":"${count} items were not moved to ${target}, because there exist already items with the same names in the new location.","INTERNAL_EXTRENAL_RESTRICTION_FOLDER_X":"${count} folders were not moved to ${target}, because you can not move internal folders into a folder that can be shared outside of your organization.","INFO_SUCCESS_FILES_1_FOLDERS_1":"${succeedfilescount} file and ${succeedfolderscount} folder were successfully moved to ${target}.","TARGET_PARENT_NOT_FOUND_FILES_1":"File ${item} was not moved to ${target}, because ${target} does not exist anymore.","BUSY":"Moving...","CANCEL":"Cancel","OK_MOVE_HERE":"Move Here","WARNING":"${item} is in the ${collection} folder. Some people will lose access to this file if you remove it.","NOT_FOUND_IN_SOURCE_PARENT_FOLDERS_X":"${count} folders were not moved to ${target}, because they do not exist in the source folder anymore.","SOURCE_PARENT_NOT_FOUND_FOLDERS_1":"Folder ${item} was not moved to ${target}, because the folder that contains this folder does not exist anymore."},"UPLOAD_PREVIEW":{"DIALOG_TITLE":"Upload Video Thumbnail","SUCCESS":"Change Thumbnail Preview Success","REPLACE_LABEL":"Image File:","REQUIRED_MARK":"* Required","REPLACE_CONFIRM":"Select a file with one of the following supported extensions:","ACTION":"Change Thumbnail","BUSY":"Saving...","ACTION_TOOLTIP":"Change Thumbnail Preview file","REQUIRED_FIELD":"Required field","CANCEL":"Cancel","ERROR_UNKNOW":"Unknow ERROR.","OK":"Upload","SELECT_FILE":"Please select a file to upload","ERROR_ACCESS_DENIED":"You cannot upload new versions. Either this file was locked or the owner removed your editor access.","ERROR_NOT_FOUND":"The file could not be edited because it has been deleted or is no longer shared with you."},"EDIT_GROUP":{"ACTION":"Edit","ACTION_TOOLTIP":"Edit this document"},"FLAG_COMMENT":{"ERROR_CANCEL":"This comment was not flagged because the request was canceled.  Click \'Flag\' to try again.","DIALOG_TITLE":"Flag Comment","INFO_SUCCESS":"The comment has been flagged and submitted for review.","QUESTION":"Provide a reason for flagging this comment (optional):","ACTION":"Flag as Inappropriate","ERROR":"This comment could could not be flagged.","CANCEL":"Cancel","ERROR_TIMEOUT":"This comment was not flagged because the server could not be contacted.  Click \'Flag\' to try again.","ACTION_TOOLTIP":"Flag this comment as inappropriate","OK":"Flag","ERROR_ACCESS_DENIED":"You do not have permission to flag this comment.","ERROR_NOT_FOUND":"This comment was not flagged because it has been deleted or is no longer shared with you."},"FLAG_FILE":{"DIALOG_TITLE":"Flag File","QUESTION":"Provide a reason for flagging this file (optional):","ERROR":"This file could could not be flagged.","ERROR_TIMEOUT":"This file was not flagged because the server could not be contacted.  Click \'Flag\' to try again.","ERROR_CANCEL":"This file was not flagged because the request was canceled.  Click \'Flag\' to try again.","INFO_SUCCESS":"The file has been flagged and submitted for review.","AUTOQUARANTINE_INFO_SUCCESS":"The file has been flagged and has been quarantined successfully.","ACTION":"Flag as Inappropriate","CANCEL":"Cancel","ACTION_TOOLTIP":"Flag this file as inappropriate","OK":"Flag","ERROR_ACCESS_DENIED":"You do not have permission to flag this file.","ERROR_NOT_FOUND":"This file was not flagged because it has been deleted or is no longer shared with you."},"EDIT_COLLECTION":{"NAME_HEADER":"Name: ","DIALOG_TITLE":"Edit Folder Properties","WARN_INVALID_CHARS_IN_NAME":"Folder names may not contain the following characters: \\ / : * ? \" \x3c \x3e |","WARN_CHANGE_VISIBILITY":"Making this folder public will remove any private or shared files.","TRIM_LONG_FILENAME":"Shorten name?","ERROR_CONCURRENT_MODIFICATION":"This folder was edited by ${user} on ${EEEE}, ${date_long} ${time_long}. Clicking \'Save\' will overwrite the changes.   ","INFO_SUCCESS":"${link} was saved successfully.","TRIM_LONG_DESCRIPTION":"Shorten description?","NAME_LABEL_TITLE":"Name","ACTION_TOOLTIP":"Edit this folder","OK":"Save","ERROR_NOT_LOGGED_IN":"The folder was not modified because you were not logged in.  Click \'Save\' to update the folder.","NAME_LABEL":"Name:","WARN_SPECIFY_NAME":"Name is a required field.","ACTION_LONG":"Edit Properties...","ERROR":"The folder was not modified due to an error.","ERROR_TIMEOUT":"The folder was not modified because the server could not be contacted.  Click \'Save\' to try your request again.","REQUIRED_MARK":"* Required","DESCRIPTION_LABEL":"Description: ","ERROR_CANCEL":"The folder was not modified because the request was cancelled.  Click \'Save\' to try your request again.","FIX_INVALID_CHARS_IN_NAME":"Replace invalid characters with \'_\'?","WARN_LONG_FILENAME":"The name is too long. ","WARN_LONG_DESCRIPTION":"The description you entered is too long. ","ERROR_FILENAME_INVALID_CHARACTERS":"The folder name cannot include the following characters: \\ / : * ?  \x3c \x3e |\"","ACTION":"Edit Properties","SUB_FODLER_ERROR_NAME_EXISTS":"There is already a folder named \'${folder}\' in this folder. Try another name.","ERROR_NAME_EXISTS":"The folder cannot be renamed because another folder has the same name.","BUSY":"Saving...","REQUIRED_FIELD":"Required field","CANCEL":"Cancel","TOP_LEVEL_FODLER_ERROR_NAME_EXISTS":"You already own a top level folder named \'${folder}\'. Try another name.","PUBLIC_LABEL":"Make this folder public","ERROR_NOT_FOUND":"The folder was not modified because it has been deleted or is no longer shared with you.","ERROR_ACCESS_DENIED":"You do not have permission to edit this folder."},"MOVE_TO_COLLECTION":{"DIALOG_TITLE":"Move to Folder","SELECT_COLLECTION":"You must select a folder that this file will be moved to.","INFO_SUCCESS_1":"${filelink} has been successfully moved to ${collectionlink}.","HINT":"Move ${0} from ${1} to a different Community folder.","ERROR":"The file was not moved due to an error.","ERROR_TIMEOUT":"The file was not moved because the server could not be contacted.  Click \'Move to Folder\' to try your request again.","ERROR_CANCEL":"The file was not moved because the request was cancelled.  Click \'Move to Folder\' to try your request again.","ERROR_NOT_FOUND_1":"The file was not moved because the selected folder has been deleted.","ERROR_ACCESS_DENIED_1":"You do not have permission to move the file to the selected folder.","OK_TITLE":"Move this file to the selected folder","ACTION":"Move to Folder","BUSY":"Moving...","CANCEL":"Cancel","ACTION_TOOLTIP":"Move this file to a folder","OK_MOVE_HERE":"Move Here","OK":"Move to Folder","ERROR_NOT_LOGGED_IN":"The file was not moved because you were not logged in.  Click \'Move to Folder\' to move the file.","INFO_EXISTS_1":"${filelink} was already in ${collectionlink}."},"SHARE_TO_COMMUNITY_FILE":{"DIALOG_TITLE":"Share File with this Community","ACTION":"Share File with Community...","ACTION_TOOLTIP":"See files Community have shared with you ","OK":"Share Files"},"UPLOAD_FILE":{"ERROR_FILE_REMOVED_FROM_DISK":"An error occurred and the file was removed from the disk following the upload.","EDITOR_ROLE":"as Editor","TRIM_LONG_FILENAME":"Shorten file name?","ERROR_EXTENSION_VIOLATION":"Files with the extension \'${0}\' are not allowed.","SHARE_TYPE_LABEL":"Type","SECURITY_LABEL":"Security:","TRIM_TAGS":"Shorten tags?","TRIM_LONG_DESCRIPTION":"Shorten description?","DRAG_INFO_SUCCESS_NO_GUEST_INVITE_1":"Successfully uploaded ${link} to ${view}. File was not shared with non-registered user: ${mails}. Click Share on the file details page to share with this user.","PROPAGATE_LABEL":"Allow others to share these files","NAME_LABEL":"Name: ","TRIM_LONG_MESSAGE":"Shorten message?","WARN_QUOTA_VIOLATION":"The file is larger than the available space. The upload will fail unless ${0} of files or versions are removed.","ADD_TOOLTIP":"Share with this user","FILE_DOES_NOT_EXIST":"This file does not exist.  Please select a file using the browse button.","OWNER_REFERENCE_ERROR":"You cannot share with the owner of the file.","WARN_PUBLIC_EXTERNAL":"These files will be visible to everyone in your organization, and shareable with people outside of your organization.","EXTERNAL_ACCESS_LABEL":"External access:","TAGS_LABEL":"Tags:","TARGET_HELP":"Selected files are uploaded to your My Files view and automatically shared with all members of the community.","ACTION_IN_MENU":"Upload...","VISIBILITY_PEOPLE_LABEL":"People","VISIBILITY_NO_ONE_DESCRIPTION":"(shared with me only)","WARN_LONG_DESCRIPTION":"The description you entered is too long. ","ERROR_FILENAME_INVALID_CHARACTERS":"The file name may not contain the characters: % & \\ \"","ACTION":"Upload Files","ENCRYPT_FILE":"Encrypt the contents of these files","REPLACE_SUCCESS":"${link} updated to version ${version}.","PERMISSIONS_LABEL":"Permissions:","REQUIRED_FIELD":"Required field","EDITOR_LABEL_TITLE":"Editors","WARN_LONG_MESSAGE":"The message is too long.","SHARE_AS_EDITOR_FOR_MEMBERS":"Allow members of the folder to edit this file","ADDTIONAL_OPTIONS":"Additional Options","WARN_PUBLIC":"These files will be made visible to everyone in your organization","PROGRESS_STATUS":"Currently uploading ${0}","DRAG_INFO_SUCCESS_NO_GUEST_INVITE_X":"Successfully uploaded ${link} to ${view}. File was not shared with non-registered users: ${mails}. Click Share on the file details page to share with those users.","UPLOAD_SCCESS_SYNC_FAIL_1":"Successfully uploaded ${link}. The file cannot be added to Sync because an existing file already uses the same name.","SHARE_WITH":"Share with:","WARN_FILE_EXISTS":"A file with that name already exists.","NOTE_LABEL":"Note: ","SHARE_ROLE_LABEL":"Role","WARN_ENCRYPT_FILE":"Encrypted file content is not searchable. File content cannot be viewed and cannot be edited with IBM Docs. ","WARN_TIMEOUT_ALT":"Server is not responding","INFO_SUCCESS":"Successfully uploaded ${link}.","VISIBILITY_PUBLIC_DESCRIPTION":"(shared with everyone)","INFO_ADD_TO_COLLECTION":"These files will be added to the folder ${0}.","EXTERNAL_ACCESS_HEADER":"External access:","WARN_INTERNAL":"Once a file is uploaded, you cannot change permission to share with others outside of your organization.","READER_LABEL":"Readers:","ERROR_NOT_LOGGED_IN":"The file could not be uploaded because you were not logged in.  Click \'Upload\' to add this file.","WARN_ADD_TO_COLLECTION_EXTERNAL":"Files you select will be added to the folder ${0}. This folder can be shared with people external to your organization, so any files you upload will also be visible to people external to your organization.","WARN_ANTIVIRUS_TIMEOUT_HOVER":"The antivirus software might take a long time to scan the file. Check periodically to see if the file has uploaded successfully.","CONTENTS_LABEL_1":"File: ","WARN_EXTERNAL":"These files will be shareable with people outside of your organization.","LIMIT_HELP":"Files must be smaller than ${limit}. ","FILE_ALREADY_EXISTS":"A file with the same name already exists. Please choose a different file name.","UPLOAD_SCCESS_SYNC_FAIL_X":"Successfully uploaded ${count} files. Some files cannot be added to Sync because the existing files already use the same names.","SECURITY_HEADER":"Security:","REQUIRED_MARK":"* Required","CONTENTS_LABEL":"Files: ","ERROR_DETAILS_TOOLTIP":"Show more details about this error","WARN_LONG_FILENAME":"The file name is too long. ","READER_ROLE":"as Reader","TAGS_HEADER":"Tags:","LOADING_FILES":"Loading selected files.","WARN_SELECT_QUOTA_VIOLATION":"The selected files exceed the available space by ${0}.  Remove files from the list, or delete existing files.","VISIBILITY_PEOPLE_DESCRIPTION":"","CANCEL":"Cancel","NO_MEMBERS":"None","MESSAGE_LABEL":"Message:","DRAG_INFO_SUCCESS":"Successfully uploaded ${link}. Check it out in your ${view} view.","TARGET_MYFILES":"My Files","PUBLIC_LABEL":"Make these files visible to everyone in your organization","OPTIONS":{"TITLE_MY_FILE":"Upload to My Files and share with this community","TITLE":"Upload to this community"},"SHARING_INTENT":"Files can be shared with people external to my organization","EXTERNAL_ACCESS_ALLY":"External access help","DIALOG_TITLE":"Upload Files","EDITOR_LABEL":"Editors:","WARN_INVALID_CHARS_IN_NAME":"File names may not contain the following characters: \\ / : * ? \" \x3c \x3e |","PROPAGATE_HEADER":"Resharing:","NO_EXT":"This file has no extension.","WARN_LONG_TAGS":"The specified tags are too long.","NAME_TITLE":"Name","MESSAGE_TEXT":"Add an Optional Message","ERROR_QUOTA_VIOLATION":"The file could not be uploaded because of space restrictions.  To upload this file, ${0} of files or versions would have to be removed.","VISIBILITY_PUBLIC_LABEL":"Everyone in my organization","WARN_NO_FILENAME":"File name is a required field.","DRAG_AND_DROP_DESC":"Drag and drop files from your desktop directly into this dialog to upload here.","REPLACE_SUCCESS_NOVERSION":"${link} updated.","READER_LABEL_TITLE":"Readers","ORIGINAL_EXT":"The original file extension was \'${0}\'.","SELECT_USER_ERROR":"Please select a person or community to share with.","VISIBILITY_PEOPLE_COMMUNITIES_LABEL":"People or Communities","MULTI_INFO_SUCCESS_NO_GUEST_INVITE_1":"Successfully uploaded ${count} files. Files were not shared with non-registered user: ${mails}. Click Share on the file details page to share with this user.","ADDTIONAL_OPTIONS_EXPAND":"Expand","SHARE_AS_EDITOR":"Allow editors of the folder to edit this file","TARGET_COMMUNITY":"This community","SELECT_USER_ERROR_E":"Please select a person to share with.","TRANSFER_TIME":{"SEC":"${0} seconds remaining - ${1} (${2}/s)","MIN":"${0} minutes remaining - ${1} (${2}/s)","HOUR":"${0} hours remaining - ${1} (${2}/s)"},"DRAG_MULTI_INFO_SUCCESS":"Successfully uploaded ${count} files. Check them out in your ${view} view.","WARN_TIMEOUT_HOVER":"The server is not responding.  The file upload might still complete, but you will see no progress nor receive a notice of completion.","SHARE_WITH_HEADER":"Share with:","TARGET_LABEL":"Upload to:","ERROR_VIRUS_FOUND":"A virus was detected in the file you are trying to upload.  Please run a local virus scan on this file before uploading it again.","VISIBILITY_NO_ONE_LABEL":"No one","ERROR_TOTAL_QUOTA_VIOLATION":"The selected files exceed the available space by ${0}. Remove files from the list.","ADDTIONAL_OPTIONS_COLLAPSE":"Collapse","ACTION_KEY_SHORTCUT":"u","FIX_INVALID_CHARS_IN_NAME":"Replace invalid characters with \'_\'?","SHARE_WITH_A11Y":"Share with help","DESCRIPTION_LABEL":"Description: ","ERROR_CANCEL":"The file could not be uploaded because the request was cancelled.  Click \'Upload\' to try again.","INFO_SUCCESS_NO_GUEST_INVITE_1":"Successfully uploaded ${link}. File was not shared with non-registered user: ${mails}. Click Share on the file details page to share with this user.","UNABLE_ENCRYPT_WARNING":"${0} cannot be encrypted because they exceed the encryption limit of ${1}. ","MULTI_INFO_SUCCESS":"Successfully uploaded ${count} files","ERROR_MAX_CONTENT_SIZE":"The file could not be uploaded because it is larger than the maximum allowed file size of ${0}","ERROR_EXTENSION_VIOLATION_EMPTY":"Files without an extension are not allowed.","SHARE_COMMUNITY_WARN":"Sharing with the community \'${0}\' will make these files visible to everyone in your organization.","ERROR_ACCESS_DENIED":"You do not have permission to edit this file.","ERROR_EXTERNAL_SHARING":"The file could not be uploaded because the folder or community which contains the file can be shared outside of your organization but the file cannot.","MULTI_INFO_SUCCESS_NO_GUEST_INVITE_X":"Successfully uploaded ${count} files. Files were not shared with non-registered users: ${mails}. Click Share on the file details page to share with those users.","INVITATION_ERROR":"Content was not shared with the following people because you do not have permission to share with them: ${0}.","DRAG_MULTI_INFO_SUCCESS_NO_GUEST_INVITE_1":"Successfully uploaded ${count} files to ${view}. Files were not shared with non-registered user: ${mails}. Click Share on the file details page to share with this user.","TAGS_LABEL_A11Y":"Tags help","MULTI_INFO_SUCCESS_PRE_MODERATION":"${count} files have been submitted for review and will be available when approved.","WARN_ADD_TO_COLLECTION_PUBLIC_EXTERNAL":"Files you select will be added to the folder ${0}. This folder is shared with everyone in your organization and with people external to your organization.  Any files you upload will be available to everyone in your organization, and people outside of your organization with whom the folder is shared.","WARN_LONG_TAG":"The tag \'${0}\' is too long.","PROGRESS_TOOLTIP":"Currently uploading ${0} (${1} of ${2} complete)","ADD_FROM_RECENT":"Recent shares","OPTIONS_LABEL":"Options:","WARN_COMMUNITY_EXTERNAL":"This community can be shared with people outside of your organization, so any files you upload will also be visible to people outside of your organization.","CONFIRM_NEW_VERSION":"A file with the same name already exists.  Click \"Upload new version\" to create a new version of the existing file.","INFO_SUCCESS_NO_GUEST_INVITE_X":"Successfully uploaded ${link}. File was not shared with non-registered users: ${mails}. Click Share on the file details page to share with those users.","ACTION_TOOLTIP":"Upload files from your computer","OK":"Upload","TRIM_TAG":"Shorten tag?","READER_LABEL_A11Y":"Readers help  ","SELECT_FILE":"Please select a file to upload","TARGET_NOTE":"Links will be shared with members","SELF_REFERENCE_ERROR":"You cannot share this file with yourself.","ERROR_OVER_QUOTA":"Your uploaded files exceed the current quota established by your administrator. You must delete ${0} before you can upload additional files.","TAGS_LABEL_TITLE":"Tags","ERROR":"The file could not be uploaded.  Please try again later.","ERROR_TIMEOUT":"The file could not be uploaded because the server could not be contacted.  Click \'Upload\' to try again.","DRAG_MULTI_INFO_SUCCESS_NO_GUEST_INVITE_X":"Successfully uploaded ${count} files to ${view}. Files were not shared with non-registered users: ${mails}. Click Share on the file details page to share with those users.","TRANSFER":"Uploading ${0} @ ${1}/s ","WARN_CANT_MAKE_INTERNAL":"This setting is disabled because you chose to share with people outside of your organization.","ERROR_DETAILS_LINK":"Details...","INFO_SUCCESS_PRE_MODERATION":"The file ${name} has been submitted for review and will be available when approved.","CHANGE_EXT":"Change file extension","EDITOR_LABEL_A11Y":"Editors help","BUSY":"Uploading...","NEW_VERSION":"Upload new version","TARGET_HEADER":"Upload to","WARN_ADD_TO_COLLECTION_PUBLIC":"These files will be added to the folder ${0}, which is visible to everyone in your organization. This will make the files visible to everyone in your organization.","SHARE_WITH_TITLE":"Share with"},"TAGGER":{"CREATEERROR_ACCESS_DENIED":"The tag could not be created because you do not have permission to edit this file.","CREATEERROR_NOT_FOUND":"The tag could not be created because the file has been deleted or is no longer visible.","WARN_LONG_TAGS":"The specified tags are too long.","LOADERROR_TIMEOUT":"The tags could not be loaded: request timed out.","REMOVE":"Remove tag","ERROR_LOADING":"An error has occured loading the tags.","SEPARATOR":",","WARN_LONG_TAG":"The tag \'${0}\' is too long.","INVALID_CHAR_WARN_LONG":"One or more tags you have entered contain invalid characters: ${0}","TRIM_TAGS":"Shorten tags?","LOADERROR_CANCEL":"The tags could not be loaded: request cancelled.","ADD_TAGS":"Add Tags","NO_RESULTS":"No results for \'${0}\'","ADD_REMOVE_TAGS_TOOLTIP":"Add or remove tags on this file","NOTAGS":"No tags","REMOVECONFIRM":"Are you sure you want to remove the tag \'${0}\'?","OK":"Save","LOADING":"Loading tags...","TRIM_TAG":"Shorten tag?","CANCEL_TOOLTIP":"Cancel tag editing","REMOVEERROR":"The tag could not be removed.","ADD_TAGS_LONG":"Add Tags...","REMOVEERROR_TIMEOUT":"The tag could not be removed because the server could not be contacted.  Click \'X\' to try again.","INVALID_CHAR_WARN":"!","LOADERROR_NOTFOUND":"The tags could not be loaded: file not found.","CREATEERROR":"The tag could not be created.  Please try again later.","CREATEERROR_CANCEL":"The tag could not be created because the request was cancelled.  Click \'Save\' to try again.","CREATEERROR_TIMEOUT":"The tag could not be created because the server could not be contacted.  Click \'Save\' to try again.","REMOVEERROR_CANCEL":"The tag could not be removed because the request was cancelled.  Click \'X\' to try again.","ADD_REMOVE_TAGS":"Add or Remove Tags","NONE":"None","CANCEL":"Cancel","REMOVEERROR_NOT_FOUND":"The tag could not be removed because the file has been deleted or is no longer visible.","ADD_TAGS_TOOLTIP":"Add tags to this file","REMOVEERROR_ACCESS_DENIED":"The tag could not be removed because you do not have permission to edit this file."},"SHARE_FILE":{"DIALOG_TITLE":"Share File","EDITOR_LABEL":"Editors: ","INFO_SUCCESS_1":"${item} was shared successfully.","MESSAGE_TEXT":"Add an optional message","SHARE_PRI":"This file is private.","EXTERNAL_WARNING":"You can share this file with people external to your organization.","EDITOR_ROLE":"as Editor","SHARE_COMMUNITY_VISIBLE_WARN":"Sharing with this community \'${0}\' will make this file visible to your entire organization.","ACCESS_DENIED_ERROR_LOCKED":"The file was not shared because the file is locked by another user, try again later.","VISIBILITY_PUBLIC_LABEL":"Everyone in my organization","EXTERNAL_SHARES_ERROR_MANY":"${item} can only be shared inside your organization.","SHARE_SHR_0":"This file is shared.","SHARE_TYPE_LABEL":"Type","SHARE_SHR_1":"This file is shared with 1 person.","ERROR_1_NOT_LOGGED_IN":"${item} could not be shared because you were not logged in. Log in and share again.","READER_LABEL_TITLE":"Readers","SHARE_COL_1":"It is also in a folder or community.","ERROR_1_MAX_SHARES":"${item} was not shared because the maximum number of shares has been exceeded.","SELECT_USER_ERROR":"Please select a person or community to share with.","ACTION_ENABLED":"Share button is enabled","VISIBILITY_PEOPLE_COMMUNITIES_LABEL":"People or Communities","DIALOG_TITLE_X":"Share Files","ERROR_1":"${item} could not be shared due to an error.","ERROR_1_TIMEOUT":"${item} was not shared because the server could not be contacted.","SELECT_USER_ERROR_E":"Please select a person to share with.","TRIM_LONG_MESSAGE":"Shorten message?","SELECTED_FILES_1":"1 file selected to share.","ADD_TOOLTIP":"Share with this user","SHARE_WITH_HEADER":"Share with:","SHARE_COL_E":"It is also in a folder.","SHARE_COL_F":"It is also in ${collections} folders.","OWNER_REFERENCE_ERROR":"You cannot share with the owner of the file.","VISIBILITY_NO_ONE_LABEL":"No one","SHARE_SHR_M":"This file is shared with ${people} people.","INFO_SUCCESS_X":"${count} files were shared successfully.","SHARE_COL_M":"It is also in ${collections} folders or communities.","VISIBILITY_PEOPLE_LABEL":"People","VISIBILITY_NO_ONE_DESCRIPTION":"(shared with me only)","ACTION_TOOLTIP_X":"Give others access to the selected files","ACTION":"Share","ERROR_X_CANCEL":"Some files may not have been shared because the request was cancelled.","EDITOR_LABEL_TITLE":"Editors","SHARE_COMMUNITY_WARN":"Sharing with the community \'${0}\' will make this file visible to everyone in your organization.","WARN_LONG_MESSAGE":"The message is too long.","NOT_FOUND_ERROR":"This file has been deleted or is no longer shared with you.","ERROR_1_CANCEL":"${item} may not have been shared because the request was cancelled.","ACCESS_DENIED_ERROR":"You no longer have permission to share this file.","ERROR_X":"${count} files could not be shared due to errors.","INVITATION_ERROR":"Content was not shared with the following people because you do not have permission to share with them: ${0}.","ERROR_1_VISIBILITY_RESTRICTION":"${item} was not shared because the file is restricted and may not be made visible to everyone in your organization.","SHARE_WITH":"Share with:","SHARE_ROLE_LABEL":"Role","SEARCH_TOOLTIP":"Person not listed? Use full search...","SELECTED_FILES_X":"${0} files selected to share.","SHARE_PUB_0":"This file is visible to ${company}. ","VISIBILITY_COMMUNITIES_LABEL":"Communities","SHARE_PUB_1":"This file is visible to ${company} and shared with 1 person.","EXTERNAL_SHARES_ERROR":"The file can only be shared inside your organization.","ADD_FROM_RECENT":"Recent shares","INFO_SUCCESS":"The file was shared successfully.","VISIBILITY_PUBLIC_DESCRIPTION":"","READER_LABEL":"Readers: ","ACTION_TOOLTIP":"Give others access to this file","OK":"Share","NOT_LOGGED_IN_ERROR":"The file was not shared because you were not logged in.  Click \'Share\' to share the file.","SELF_REFERENCE_ERROR":"You cannot share with yourself.","CANCEL_ERROR":"The file was not shared because the request was cancelled.  Click \'Share\' to try again.","ACTION_DISABLED":"Share button is disabled","ACTION_LONG":"Share...","ERROR":"The file could not be shared.  Please try again later.","TIMEOUT_ERROR":"The file was not shared because the server could not be contacted.  Click \'Share\' to try again.","SHARE_PUB_M":"This file is visible to ${company} and shared with ${people} people.","ERROR_1_ACCESS_DENIED":"${item} was not shared because you do not have permission to share this file.","ERROR_1_NOT_FOUND":"${item} has been deleted or is no longer shared with you.","READER_ROLE":"as Reader","MAX_SHARES_ERROR":"The maximum number of shares has been exceeded.","VISIBILITY_PEOPLE_DESCRIPTION":"(give specific file permissions to others)","BUSY":"Sharing...","CANCEL":"Cancel","NO_MEMBERS":"None","MESSAGE_LABEL":"Message:","SHARE_WITH_TITLE":"Share with"}};

;if(!dojo._hasResource["lconn.files.action.AddFilesToFileSync"]){
dojo._hasResource["lconn.files.action.AddFilesToFileSync"]=true;
dojo.provide("lconn.files.action.AddFilesToFileSync");










dojo.requireLocalization("lconn.files","action");
dojo.declare("lconn.files.action.AddFilesToFileSync",[com.ibm.social.layout.Action],{noSyncItems:[],constructor:function(_1,_2,_3){
this.app=_1;
this.nls=_1.nls.ADD_FILES_TO_FILESYNC;
this.scene=_2;
this.supportedOnScene=(dojo.getObject("hints.userLikelyToFileSync",false,_2));
},isVisible:function(_4,_5){
if(!lconn.core.config.features("files-add-to-sync-in-listview")){
return false;
}
if(!this.app.isAuthenticated()){
return false;
}
if(!this.supportedOnScene){
return false;
}
if(this.app.isPersonalFiles&&!lconn.share.util.configUtil.canSyncPersonalFile(this.app.getAuthenticatedUser())){
return false;
}
var _6;
try{
_6=lconn.share.util.configUtil.isFileSyncEnabled(this.app.getAuthenticatedUser());
}
catch(e){
return false;
}
return _6?true:false;
},isEnabled:function(_7,_8){
return !!_7.length;
},getName:function(_9){
return this.nls.ACTION_X;
},getTooltip:function(_a,_b){
return _a.length>1?dojo.string.substitute(this.nls.ACTION_TOOLTIP_X,[_a.length]):this.nls.ACTION_TOOLTIP;
},hasEnableDisableActionString:function(){
if(this.nls!==undefined&&this.nls.ACTION_ENABLED_X!=undefined&&this.nls.ACTION_DISABLED_X!==undefined){
return true;
}
return false;
},getEnableActionString:function(){
return this.nls!==undefined?this.nls.ACTION_ENABLED_X:undefined;
},getDisableActionString:function(){
return this.nls!==undefined?this.nls.ACTION_DISABLED_X:undefined;
},execute:function(_c,_d){
var _e=lconn.share.util.dom;
var _f=_e.ATOM_NAMESPACE;
var _10=_e.DOCUMENTS_ATOM_NAMESPACE;
var doc=_e.newXMLDocument("entry",_f,[_10]);
var _11=doc.documentElement;
var _12=_e.createElementNS(doc,"category",_f);
_12.setAttribute("term","myfilesync");
_12.setAttribute("label","myfilesync");
_12.setAttribute("scheme","tag:ibm.com,2006:td/type");
_11.appendChild(_12);
var _13=_e.serializeXMLDocument(doc,true);
var app=this.app;
var _14=this;
var _15=[];
var _16=[];
while(this.noSyncItems.length>0){
this.noSyncItems.pop();
}
var _17=null;
var _18=0;
var _19=function(_1a){
var _1b=_c[_18++];
if(_1b){
if(_1b.isSyncable()){
_14.noSyncItems.push(_1b);
_19();
}else{
_16.push(_1b);
var dfd=app.net.postXml({url:app.routes.getFileFeedServiceUrl(_1b.getId()),postData:_13,auth:{preventReload:true},headers:{"Content-Type":"application/atom+xml;charset=\"UTF-8\""}});
_15.push(dfd);
dfd.addBoth(_19);
}
}else{
if(!_17){
require(["lconn/files/util/BulkMessageBuilder"],dojo.hitch(_14,function(_1c){
if(_15.length>0){
_17=new dojo.DeferredList(_15).addBoth(dojo.hitch(_14,"complete",_16));
}else{
var _1d=[];
var _1e=[];
_14.complete(_1d,_1e);
}
}));
}
}
};
_19();
},complete:function(_1f,_20){
for(var i=0;i<_1f.length;i++){
var _21=new lconn.share.bean.PartialFile({syncable:true});
if(_20[i][0]==true){
var _22={fileChange:true,fileSyncChange:true,file:_1f[i],newFile:_21};
dojo.publish("lconn/share/action/completed",[_22,this]);
}
}
while(this.noSyncItems.length>0){
_1f.push(this.noSyncItems.pop());
_20.push([false,this.app.document]);
}
var m=new lconn.files.util.BulkMessageBuilder({nls:this.nls,items:_1f,results:_20});
var _23=true;
if(m.failedItems.length==_20.length){
_23=false;
}
var e={fileSyncChange:true,messages:m.messages};
dojo.publish("lconn/share/action/completed",[e,this]);
return _23;
}});
}


;if(!dojo._hasResource["lconn.files.action.AddTags"]){
dojo._hasResource["lconn.files.action.AddTags"]=true;
dojo.provide("lconn.files.action.AddTags");


dojo.declare("lconn.files.action.AddTags",[com.ibm.social.layout.DeferredAction],{actionClass:"lconn.files.action.impl.AddTags",constructor:function(_1,_2,_3){
this.app=_1;
this.nls=_1.nls.ADD_TAGS;
this.supportedOnScene=(dojo.getObject("hints.userLikelyToTag",false,_2));
},getName:function(_4){
return this.nls.ACTION;
},getTooltip:function(_5,_6){
return _5.length==1?this.nls.ACTION_TOOLTIP:this.nls.ACTION_TOOLTIP_X;
},isVisible:function(_7,_8){
return this.supportedOnScene&&this.app.isAuthenticated();
},isEnabled:function(_9,_a){
return !!_9.length;
}});
}


;if(!dojo._hasResource["lconn.files.action.ShareFiles"]){
dojo._hasResource["lconn.files.action.ShareFiles"]=true;
dojo.provide("lconn.files.action.ShareFiles");


dojo.declare("lconn.files.action.ShareFiles",[com.ibm.social.layout.DeferredAction],{actionClass:"lconn.files.action.impl.ShareFiles",constructor:function(_1,_2,_3){
this.app=_1;
this.nls=_1.nls.SHARE_FILE;
this.scene=_2;
this.supportedOnScene=(dojo.getObject("hints.userLikelyToShare",false,_2));
},getName:function(_4,_5){
if(this.app.isNestedFolderEnabled){
return this.name=this.nls.ACTION_LONG;
}else{
return this.name=this.nls.ACTION;
}
},getTooltip:function(_6,_7){
return _6.length==1?this.nls.ACTION_TOOLTIP:this.nls.ACTION_TOOLTIP_X;
},isValid:function(_8,_9){
var _a=this.app?this.app.authenticatedUser:null;
if(!this.isVisible(_8,_9)){
return false;
}
if(_8.length==0){
return false;
}
var _b=dojo.filter(_8,function(s){
return (s.getAuthor&&_a.id==s.getAuthor().id);
});
var _c=dojo.filter(_8,function(s){
return (s.isViralShareAllowed&&s.isViralShareAllowed());
});
return (_b.length==_8.length)||(_c.length==_8.length);
},isVisible:function(_d,_e){
if(this.scene.useDynamicAction){
return !!_d.length&&this.supportedOnScene&&this.app.isAuthenticated();
}else{
return this.supportedOnScene&&this.app.isAuthenticated();
}
},isEnabled:function(_f,_10){
return this.isValid(_f,_10);
}});
}


;if(!dojo._hasResource["lconn.files.action.RemoveFromFileSync"]){
dojo._hasResource["lconn.files.action.RemoveFromFileSync"]=true;
dojo.provide("lconn.files.action.RemoveFromFileSync");


dojo.declare("lconn.files.action.RemoveFromFileSync",[com.ibm.social.layout.DeferredAction],{actionClass:"lconn.files.action.impl.RemoveFromFileSync",constructor:function(_1,_2,_3){
this.app=_1;
this.nls=_1.nls.REMOVE_FROM_FILESYNC;
this.supportedOnScene=(dojo.getObject("hints.userLikelyToFileSync",false,_2));
},getName:function(_4,_5){
return this.nls.ACTION;
},getTooltip:function(_6,_7){
return _6.length==1?this.nls.ACTION_TOOLTIP:this.nls.ACTION_TOOLTIP_X;
},isVisible:function(_8,_9){
return !!_8.length&&this.supportedOnScene&&this.app.isAuthenticated();
},isEnabled:function(_a,_b){
return !!_a.length;
}});
}


;if(!dojo._hasResource["lconn.files.action.AddToFileSync"]){
dojo._hasResource["lconn.files.action.AddToFileSync"]=true;
dojo.provide("lconn.files.action.AddToFileSync");


dojo.declare("lconn.files.action.AddToFileSync",[com.ibm.social.layout.DeferredAction],{actionClass:"lconn.files.action.impl.AddToFileSync",constructor:function(_1,_2,_3){
this.app=_1;
this.nls=_1.nls.ADD_FILES_TO_FILESYNC;
this.supportedOnScene=(dojo.getObject("hints.userLikelyToFileSync",false,_2));
},getName:function(_4,_5){
if(this.app.isNestedFolderEnabled){
return this.name=this.nls.ACTION_LONG;
}else{
return this.name=this.nls.ACTION;
}
},getTooltip:function(_6,_7){
return this.nls.ACTION_TOOLTIP;
},isVisible:function(_8,_9){
return !_8.length&&this.supportedOnScene&&this.app.isAuthenticated();
},getEnableActionString:function(){
return this.nls!==undefined?this.nls.ACTION_ENABLED_X:undefined;
},getDisableActionString:function(){
return this.nls!==undefined?this.nls.ACTION_DISABLED_X:undefined;
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


;if(!dojo._hasResource["lconn.files.action.CreateItem"]){
dojo._hasResource["lconn.files.action.CreateItem"]=true;
dojo.provide("lconn.files.action.CreateItem");




dojo.declare("lconn.files.action.CreateItem",[com.ibm.social.layout.Action],{constructor:function(_1,_2){
this.app=_1;
this.nls=_1.nls.CREATE_ITEM;
this.hasChildren=true;
this.actions=lconn.share.util.ActionUtil.reOrgActions(_2,_1,true,false,null,null);
dojo.forEach(this.actions,function(_3){
_3.isGrouped=true;
});
},getName:function(_4){
return this.nls.ACTION;
},getTooltip:function(_5,_6){
return this.nls.ACTION_TOOLTIP;
},isVisible:function(_7,_8){
return true;
},execute:function(_9,_a){
var _b=new dojo.Deferred();
_b.callback(this.actions);
return _b;
}});
}


;if(!dojo._hasResource["lconn.files.action.RoundTripEdit"]){
dojo._hasResource["lconn.files.action.RoundTripEdit"]=true;
dojo.provide("lconn.files.action.RoundTripEdit");




dojo.declare("lconn.files.action.RoundTripEdit",lconn.share.action.DeferredAction,{isPrimary:true,parentId:"lconn_files_action_EditGroup",constructor:function(_1,_2,_3){
this.app=_1;
this.nls=_1.nls.EDIT_FILE_RT;
this.name=this.nls.ACTION;
this.tooltip=this.nls.ACTION_TOOLTIP;
},isValid:function(_4,_5){
if(!lconn.share.util.configUtil.isRoundTripEditingEnabled(this.app.authenticatedUser)){
return false;
}
if(!this.isWin()){
return false;
}
if(_4.getConfiguration().disableGenericEdit){
return false;
}
var _6=dojo.getObject("lconn.share.config.features.roundTripEditing.extensions");
var _7=false;
if(_6){
for(var i=0;i<_6.length;i++){
if(("."+_4.getExtension())==_6[i].toLowerCase()){
_7=true;
break;
}
}
}
if(!_7){
return false;
}
if(_4.isLocked()&&_4.getLock().getOwner().id!=this.app.authenticatedUser.id){
return false;
}
if(_5&&_5.permissions&&_5.permissions.canEdit){
return _5.permissions.canEdit(_4)||_4.getPermissions().Edit;
}
return _4.getPermissions().Edit;
},isWin:function(){
return navigator.platform.indexOf("Win")==0;
}});
}


;if(!dojo._hasResource["lconn.files.action.EditGroup"]){
dojo._hasResource["lconn.files.action.EditGroup"]=true;
dojo.provide("lconn.files.action.EditGroup");


dojo.declare("lconn.files.action.EditGroup",[com.ibm.social.layout.Action],{constructor:function(_1,_2){
this.app=_1;
this.nls=_1.nls.EDIT_GROUP;
this.hasChildren=true;
this.actions=_2;
},getName:function(_3){
return this.nls.ACTION;
},getTooltip:function(_4,_5){
return this.nls.ACTION_TOOLTIP;
},isValid:function(_6,_7){
return true;
},execute:function(_8,_9){
var _a=new dojo.Deferred();
_a.callback(this.actions);
return _a;
}});
}


;if(!dojo._hasResource["lconn.files.action.MoveCollection"]){
dojo._hasResource["lconn.files.action.MoveCollection"]=true;
dojo.provide("lconn.files.action.MoveCollection");




dojo.declare("lconn.files.action.MoveCollection",lconn.share.action.DeferredAction,{isPrimary:true,constructor:function(_1,_2,_3){
var _4=_1.nls.MOVE_COLLECTION;
if(_1.isNestedFolderEnabled){
this.name=_4.ACTION_LONG;
}else{
this.name=_4.ACTION;
}
this.tooltip=_4.ACTION_TOOLTIP;
},isValid:function(_5,_6){
if(!lconn.core.config.features("files-nested-folder")){
return false;
}
if(_6&&_6.useButton&&_6.scene&&_6.scene.collection){
if(_6.scene.collection.getId()==_5.getId()){
return false;
}
}
if(!_5.hasFullPermissions()){
throw "Caller did not load permissions with this collection, cannot check move permissions for the collection";
}
var _7=_5.getPermissions();
return _7.Delete;
}});
}


;if(!dojo._hasResource["lconn.files.action.MoveFile"]){
dojo._hasResource["lconn.files.action.MoveFile"]=true;
dojo.provide("lconn.files.action.MoveFile");




dojo.declare("lconn.files.action.MoveFile",lconn.share.action.DeferredAction,{isPrimary:true,constructor:function(_1,_2,_3){
this.app=_1;
var _4=_1.nls.MOVE_FILE;
if(_1.isNestedFolderEnabled){
this.name=_4.ACTION_LONG;
}else{
this.name=_4.ACTION;
}
this.tooltip=_4.ACTION_TOOLTIP;
},isValid:function(_5,_6){
var _7=this.app?this.app.authenticatedUser:null;
if(!lconn.share.util.configUtil.isNestedFolderEnabled(_7)){
return false;
}
if(this.app.scene&&!this.app.scene.collection){
return false;
}
return this.app.scene.collection.getPermissions().RemoveChild;
}});
}


;if(!dojo._hasResource["lconn.files.action.BulkMove"]){
dojo._hasResource["lconn.files.action.BulkMove"]=true;
dojo.provide("lconn.files.action.BulkMove");




dojo.declare("lconn.files.action.BulkMove",[com.ibm.social.layout.DeferredAction],{actionClass:"lconn.files.action.impl.BulkMove",constructor:function(_1,_2,_3){
this.app=_1;
this.nls=_1.nls.MOVE_FILES;
this.scene=_2;
this.supportedOnScene=(dojo.getObject("hints.userLikelyToMove",false,_2));
},getName:function(_4,_5){
if(this.app.isNestedFolderEnabled){
return this.nls.ACTION_LONG;
}else{
return this.nls.ACTION;
}
},getTooltip:function(_6,_7){
return this.nls.ACTION_TOOLTIP;
},isVisible:function(_8,_9){
var _a=this.app?this.app.authenticatedUser:null;
if(!this.app||!lconn.share.util.configUtil.isNestedFolderEnabled(_a)){
return false;
}
var _b=this.scene.activeNavigationId=="myfolders"||this.scene.activeNavigationId=="communityFolders";
if(this.app&&this.app.scene&&!this.app.scene.collection&&this.supportedOnScene&&this.app.isAuthenticated()&&_b){
return true;
}
if(!(this.app&&this.app.scene&&this.app.scene.collection&&this.app.scene.collection.getPermissions().RemoveChild)){
return false;
}
if(this.scene.useDynamicAction){
return !!_8.length&&this.supportedOnScene&&this.app.isAuthenticated();
}else{
return this.supportedOnScene&&this.app.isAuthenticated();
}
},isValid:function(_c,_d){
return this.isVisible(_c,_d);
},isEnabled:function(_e,_f){
return !!_e.length;
}});
}


;if(!dojo._hasResource["lconn.files.action.BulkAddToCollection"]){
dojo._hasResource["lconn.files.action.BulkAddToCollection"]=true;
dojo.provide("lconn.files.action.BulkAddToCollection");




dojo.declare("lconn.files.action.BulkAddToCollection",[com.ibm.social.layout.DeferredAction],{actionClass:"lconn.files.action.impl.BulkAddToCollection",constructor:function(_1,_2,_3){
this.nls=_1.nls.ADD_FILE_TO_COLLECTION;
this.app=_1;
this.scene=_2;
this.supportedOnScene=(dojo.getObject("hints.userLikelyToAddToCollection",false,_2));
},getName:function(_4,_5){
return this.nls.ACTION_X;
},getTooltip:function(_6,_7){
return _6.length>1?dojo.string.substitute(this.nls.ACTION_TOOLTIP_X,[_6.length]):this.nls.ACTION_TOOLTIP;
},isVisible:function(_8,_9){
var _a=this.app?this.app.authenticatedUser:null;
if(!lconn.share.util.configUtil.isNestedFolderEnabled(_a)){
return false;
}
if(this.scene.useDynamicAction){
return !!_8.length&&this.supportedOnScene&&this.app.isAuthenticated();
}else{
return this.supportedOnScene&&this.app.isAuthenticated();
}
},isValid:function(_b,_c){
var _d=this.app?this.app.authenticatedUser:null;
if(!this.isVisible(_b,_c)){
return false;
}
if(_b.length==0){
return false;
}
var _e=false;
var _f=true;
for(var i=0;i<_b.length;i++){
if(_b[i].getAuthor&&_b[i].getAuthor().id==(_d?_d.id:null)){
_e=true;
break;
}
if(_b[i].isViralShareAllowed&&_b[i].isViralShareAllowed()){
_f=false;
break;
}
}
if(_e){
return true;
}else{
return !_f;
}
},isEnabled:function(_10,_11){
return this.isValid(_10,_11);
}});
}


;if(!dojo._hasResource["lconn.files.PersonalFilesExtension"]){
dojo._hasResource["lconn.files.PersonalFilesExtension"]=true;
dojo.provide("lconn.files.PersonalFilesExtension");






































































































var uiext=lconn.core.uiextensions;
uiext.add("lconn/files/columns/file/library",function(_1,s,_2,_3,_4){
var _5=_2.getColumns().file.getLibraryFeed();
for(var i=0,c;c=_5[i];i++){
_1.push(c);
}
});
uiext.add("lconn/files/columns/file/sharedwithme",function(_6,s,_7,_8,_9){
var _a=_7.getColumns().file.getSharedWithMeFeed();
for(var i=0,c;c=_a[i];i++){
_6.push(c);
}
});
uiext.add("lconn/files/columns/file/sharedbyme",function(_b,s,_c,_d,_e){
var _f=_c.getColumns().file.getSharedByMeFeed();
for(var i=0,c;c=_f[i];i++){
_b.push(c);
}
});
uiext.add("lconn/files/columns/file/public",function(_10,s,app,_11,_12){
var arr=app.getColumns().file.getPublicFeed();
for(var i=0,c;c=arr[i];i++){
_10.push(c);
}
});
uiext.add("lconn/files/columns/file/search",function(_13,s,app,_14,_15){
var arr=app.getColumns().file.getSearchFeed();
if(dojo.getObject("lconn.share.config.features.ecmFilesEnabled")){
var _16={select:1,name:1,modified:1,downloads:1,privacy:1,contextMenu:1,fileIcon:1,size:1,recommendations:1,comments:1};
dojo.forEach(arr,function(c){
if(_16[c.id]){
_13.push(c);
}
});
}else{
for(var i=0,c;c=arr[i];i++){
_13.push(c);
}
}
});
uiext.add("lconn/files/columns/file/collection",function(_17,s,app,_18,_19){
var arr=app.getColumns().file.getCollectionFeed();
for(var i=0,c;c=arr[i];i++){
_17.push(c);
}
});
uiext.add("lconn/files/columns/file/deleted",function(_1a,s,app,_1b,_1c){
var arr=app.getColumns().file.getDeletedFeed();
for(var i=0,c;c=arr[i];i++){
_1a.push(c);
}
});
uiext.add("lconn/files/actions/create",function(_1d,s,app,_1e){
var lfa=lconn.files.action;
if(!lconn.share.util.configUtil.isNestedFolderEnabled(app.authenticatedUser)){
_1d.push(new lfa.UploadFile(app,_1e));
var _1f=lconn.files.actions.get("create/new",app,_1e);
_1f=dojo.filter(_1f,function(_20){
return _20.isVisible([app.authenticatedUser],{});
});
if(_1f.length==0){
_1d.push(new lfa.CreateCollection(app,null,_1e));
}else{
if(_1f.length>0){
_1f.unshift(new lfa.CreateCollection(app,null,_1e));
_1d.push(new lfa.CreateItem(app,_1f));
}
}
_1d.push(new lfa.Login(app,_1e));
}else{
var _21=[];
var _22=[];
_22.push(new lfa.CreateCollection(app,null,_1e));
var _23=dojo.filter(_22,function(act){
return act.isVisible([app.authenticatedUser],{});
});
if(_23.length>0){
_21.push(_22);
}
var _24=[];
_24.push(new lfa.UploadFile(app,_1e));
_23=dojo.filter(_24,function(act){
return act.isVisible([app.authenticatedUser],{});
});
if(_23.length>0){
_21.push(_24);
}
var _25=lconn.files.actions.get("create/new",app,_1e);
_25.push(new lfa.Login(app,_1e));
var _23=dojo.filter(_25,function(act){
return act.isVisible([app.authenticatedUser],{});
});
if(_23.length>0){
_21.push(_25);
}
_1d.push(new lfa.CreateItem(app,_21));
}
});
uiext.add("lconn/files/actions/create/new",function(_26,s,app,_27){
});
uiext.add("lconn/files/actions/communityfile",function(_28,s,app,_29,_2a){
if(lconn.core.config.features("fileviewer-detailspage")){
_28.push(new lconn.files.action.PreviewFile(app,_29,_2a));
}
_28.push(new lconn.files.action.DownloadFile(app,_29,_2a));
_28.push(new lconn.files.action.OpenFileInline(app,_29,_2a));
});
uiext.add("lconn/files/actions/files",function(_2b,s,app,_2c,_2d){
_2b.push(new lconn.files.action.DownloadBulkFiles(app,_2c,_2d));
_2b.push(new lconn.files.action.ShareFiles(app,_2c,_2d));
_2b.push(new lconn.files.action.BulkAddToCollection(app,_2c,_2d));
_2b.push(new lconn.files.action.BulkMove(app,_2c,_2d));
_2b.push(new lconn.files.action.AddFilesToFileSync(app,_2c,_2d));
_2b.push(new lconn.files.action.AddTags(app,_2c,_2d));
_2b.push(new lconn.files.action.DeleteFiles(app,_2c,_2d));
});
uiext.add("lconn/files/actions/collections",function(_2e,s,app,_2f,_30){
_2e.push(new lconn.files.action.BulkMove(app,_2f,_30));
});
uiext.add("lconn/files/actions/filesync",function(_31,s,app,_32,_33){
_31.push(new lconn.files.action.RemoveFromFileSync(app,_32,_33));
_31.push(new lconn.files.action.ShareFiles(app,_32,_33));
_31.push(new lconn.files.action.AddToFileSync(app,_32,_33));
});
uiext.add("lconn/files/actions/attachment",function(_34,s,app,_35,_36){
var lfa=lconn.files.action;
_34.push(new lfa.DeleteAttachment(app,_35,_36));
});
uiext.add("lconn/files/actions/collection",function(_37,s,app,_38,_39){
var lfa=lconn.files.action;
_37.push(new lfa.AddFilesToCollection(app,_38,_39));
_37.push(new lfa.ShareCollection(app,_38,_39));
_37.push(new lfa.MoveCollection(app,_38,_39));
var _3a=lconn.share.util.configUtil.isFollowingEnabled(app.getAuthenticatedUser());
if(_3a){
_37.push(new lfa.ToggleFollowingFolder(app,_38,_39));
}
_37.push(new lfa.EditCollection(app,_38,_39));
_37.push(new lfa.DeleteCollection(app,_38,_39));
_37.push(new lfa.Login(app,_39));
});
uiext.add("lconn/files/actions/collection/titlemenu",function(_3b,s,app,_3c,_3d){
var lfa=lconn.files.action;
_3b.push([new lfa.CreateSubCollection(app,_3c,_3d)]);
var _3e=[];
_3e.push(new lfa.AddFilesToCollection(app,_3c,_3d));
_3e.push(new lfa.MoveCollection(app,_3c,_3d));
_3e.push(new lfa.ShareCollection(app,_3c,_3d));
var _3f=lconn.share.util.configUtil.isFollowingEnabled(app.getAuthenticatedUser());
if(_3f){
_3e.push(new lfa.ToggleFollowingFolder(app,_3c,_3d));
}
_3e.push(new lfa.EditCollection(app,_3c,_3d));
_3b.push(_3e);
_3b.push([new lfa.DeleteCollection(app,_3c,_3d)]);
});
uiext.add("lconn/files/actions/file/edit",function(_40,s,app,_41,_42){
var lfa=lconn.files.action;
_40.push(new lfa.ReplaceFile(app,_41,_42));
});
uiext.add("lconn/files/actions/file/deleted",function(_43,s,app,_44,_45){
var lfa=lconn.files.action;
_43.push(new lfa.RestoreFile(app,_44,_45));
_43.push(new lfa.PurgeFile(app,_44,_45));
});
uiext.add("lconn/files/actions/deleted",function(_46,s,app,_47,_48){
var lfa=lconn.files.action;
_46.push(new lfa.PurgeAll(app,_47,_48));
});
uiext.add("lconn/files/actions/grid",function(_49,s,app,_4a,_4b){
var lfa=lconn.files.action;
_49.push(new lfa.DownloadFile(app,_4a,_4b));
_49.push(new lfa.PreviewFile(app,_4a,_4b));
_49.push(new lfa.JumpToDetailsPage(app,_4a,_4b));
});
uiext.add("lconn/files/actions/file",function(_4c,s,app,_4d,_4e){
var lfa=lconn.files.action;
var _4f=lconn.share.util.configUtil.isPreviewEnabled(app.getAuthenticatedUser());
if(_4f){
_4c.push(new lfa.PreviewFile(app,_4d,_4e));
}
_4c.push(new lfa.RoundTripEdit(app,_4d,_4e));
_4c.push(new lfa.EditGroup(app,[],_4e));
_4c.push(new lfa.DownloadFile(app,_4d,_4e));
_4c.push(new lfa.OpenFileInline(app,_4d,_4e));
_4c.push(new lfa.GenericEdit(app,_4d,_4e));
_4c.push(new lfa.ShareFile(app,_4d,_4e));
var _50=_4e?_4e:{};
_50.sourceSet=["personalFolders"];
_4c.push(new lfa.AddToCollection(app,_4d,_50));
_4c.push(new lfa.MoveFile(app,_4d,_4e));
var _51=lconn.share.util.configUtil.isFollowingEnabled(app.getAuthenticatedUser());
if(_51){
_4c.push(new lfa.ToggleFollowingFile(app,_4d,_4e));
}
if(lconn.share.util.configUtil.canSyncPersonalFile(app.getAuthenticatedUser())){
_4c.push(new lfa.ToggleSyncFile(app,_4d,_4e));
}
if(_4f){
_4c.push(new lfa.UploadPreviewThumbnail(app,_4d,_4e));
}
_4c.push(new lfa.EditFile(app,_4d,_4e));
_4c.push(new lfa.AddComment(app,_4d,_4e));
_4c.push(new lfa.LockFile(app,_4d,_4e));
_4c.push(new lfa.UnlockFile(app,_4d,_4e));
_4c.push(new lfa.CopyFile(app,_4d,_4e));
_4c.push(new lfa.DeleteFile(app,_4d,_4e));
_4c.push(new lfa.Login(app,_4e));
});
uiext.add("lconn/files/actions/file/sharing",function(_52,s,app,_53,_54){
var lfa=lconn.files.action;
_52.push(new lfa.StopSharing(app,_53,_54));
_52.push(new lfa.ShowSharingDetails(app,_53,_54));
});
}


;if(!dojo._hasResource["lconn.share.bean.Version"]){
dojo._hasResource["lconn.share.bean.Version"]=true;
dojo.provide("lconn.share.bean.Version");












dojo.declare("lconn.share.bean.Version",lconn.share.bean.ConfigurableFile,{constructor:function(_1){
this.e=_1;
},getEntry:function(){
return this.e;
},getAtomId:function(){
return lconn.share.util.dom.getChildElementTextContent(this.e,"id");
},getId:function(){
return lconn.share.util.dom.getChildElementTextContentNS(this.e,"uuid",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
},getLibraryId:function(){
return lconn.share.util.dom.getChildElementTextContentNS(this.e,"libraryId",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
},getDocumentId:function(){
return lconn.share.util.dom.getChildElementTextContentNS(this.e,"documentUuid",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
},getVersionLabel:function(){
return lconn.share.util.dom.getChildElementTextContentNS(this.e,"versionLabel",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
},getName:function(){
return this.getLabel();
},getTitle:function(){
return lconn.share.util.dom.getChildElementTextContent(this.e,"title");
},getLabel:function(){
var s=lconn.share.util.dom.getChildElementTextContentNS(this.e,"label",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
if(!s||s.length==0){
s=this.getTitle();
}
return s;
},getChangeSummary:function(){
return lconn.share.util.dom.getChildElementTextContent(this.e,"summary");
},getObjectTypeId:function(){
return lconn.share.util.dom.getChildElementTextContentNS(this.e,"objectTypeId",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
},getOwner:function(){
if(!this.author){
this.author=new lconn.share.bean.User(this.e.getElementsByTagName("author")[0]);
}
return this.author;
},getModifier:function(){
if(!this.modifier){
var e=lconn.share.util.dom.getElementsByTagNameNS(this.e,"modifier",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
if(e){
this.modifier=new lconn.share.bean.User(e);
}
}
return this.modifier;
},getUpdated:function(){
if(!this.updated){
this.updated=lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContentNS(this.e,"modified",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE));
this.updated=this.updated||lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContent(this.e,"updated"));
}
return this.updated;
},getPublished:function(){
if(!this.published){
this.published=lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContentNS(this.e,"created",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE));
this.published=this.published||lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContent(this.e,"published"));
}
return this.published;
},getUrlEntry:function(){
return lconn.share.util.uri.makeAtomUrlIESafe(lconn.share.util.dom.getChildElementAttributeMatching(this.e,"link","rel","self","href"));
},getUrlDownload:function(){
if(!this.urlDownload){
this.urlDownload=lconn.share.util.dom.getChildElementAttributeMatching(this.e,"link","rel","enclosure","href");
}
return this.urlDownload;
},getSize:function(){
return lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementAttributeMatching(this.e,"link","rel","enclosure","length"));
},getPermissions:function(){
if(!this.permissions){
var s=lconn.share.util.dom.getChildElementTextContentNS(this.e,"permissions",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
var p={View:true};
if(s){
dojo.forEach(s.split(", "),function(a){
if(a&&a.length>0){
p[a]=true;
}
});
}
this.permissions=p;
}
return this.permissions;
}});
}

if(typeof define!=="undefined"&&typeof define._packages!=="undefined")define._packages["concord"]=true;

;if(!dojo._hasResource["concord.SAMLFrameLogin"]){
dojo._hasResource["concord.SAMLFrameLogin"]=true;
dojo.provide("concord.SAMLFrameLogin");
dojo.declare("concord.SAMLFrameLogin",null,{isLoggedIn:false,src:"/docs/app/doc",samlFrame:null,login:function(_1){
window.setTimeout(dojo.hitch(this,this.initSamlFrame),1000*_1);
window.setInterval(dojo.hitch(this,this.kickSamlCheck),1000*60*25);
},initSamlFrame:function(){
var _2=document.createElement("IFRAME");
_2.name=_2.id="preemptiveSamlFrame";
_2.style.top="-9999px";
_2.style.width=_2.style.height="1px";
_2.style.display="none";
_2.src=this.src;
_2.onload=dojo.hitch(this,this._onload);
document.body.appendChild(_2);
this.samlFrame=_2;
},kickSamlCheck:function(){
this.samlFrame.src=this.src;
if(concord.global.haveDocsLTPA()){
this.removeImmediateSAMLFrame();
}
},removeImmediateSAMLFrame:function(){
var _3=dojo.byId("ImmediateSamlFrame");
if(_3){
document.body.removeChild(_3);
}
},_onload:function(){
}});
}


;if(!dojo._hasResource["concord.DocsPreload"]){
dojo._hasResource["concord.DocsPreload"]=true;
dojo.provide("concord.DocsPreload");
dojo.declare("concord.DocsPreload",null,{staticPath:"",docsDiv:null,staticTimer:null,jsIndex:0,cssIndex:0,jsFiles:["/js/dojo/dojo.js","/js/concord/concord_text.js","/js/concord/concord_sheet.js","/js/concord/concord_pres.js"],cssFiles:["/styles/css/document/document_main.css","/js/concord/text/concord_document.css","/styles/css/websheet/sheet_main.css","/js/wseditor/css/concord_sheet.css","/js/dijit/themes/oneui30/oneui30.css","/styles/css/presentation2/all.css","/styles/css/base.css"],eventArray:[],bContinueLoad:true,timerInterval:300,timerCount:0,preload:function(_1){
if(concord.global.isNeedDocsSAML()&&!concord.global.haveDocsLTPA()){
concord.global.doDocsSSO();
window.setTimeout(dojo.hitch(this,this.preload,_1),1000);
}else{
window.setTimeout(dojo.hitch(this,this._doPreload),1000*_1);
}
},_doPreload:function(){
if(this._initStaticPath()){
var _2=document.createElement("div");
_2.id="DocsPreloadDiv";
_2.style.display="none";
document.body.appendChild(_2);
this.docsDiv=_2;
this.staticTimer=window.setInterval(dojo.hitch(this,this._preloadStatics),this.timerInterval);
}
},_initStaticPath:function(){
var _3,_4;
dojo.xhrGet({url:"/docs/api/version",handleAs:"json",preventCache:true,handle:function(r,io){
_3=r;
_4=io;
},sync:true});
if(_3 instanceof Error){
return false;
}
this.staticPath=_3.timestamp;
return true;
},_preloadStatics:function(){
this.timerCount++;
if((this.timerInterval*this.timerCount)>(1000*60*4)){
this._killTimer();
return;
}
if(this.bContinueLoad){
if(this.jsFiles.length>this.jsIndex){
var _5=this.jsFiles[this.jsIndex++];
if(_5){
this.createPlaceHolder(_5);
}else{
this.jsIndex++;
}
}else{
if(this.cssFiles.length>this.cssIndex){
var _5=this.cssFiles[this.cssIndex++];
if(_5){
this.createPlaceHolder(_5);
}else{
this.cssIndex++;
}
}else{
if(this.staticTimer){
this._killTimer();
}
}
}
}else{
if(this.jsFiles.length<=this.jsIndex&&this.cssFiles.length<=this.cssIndex&&this.staticTimer){
this._killTimer();
}
}
},_killTimer:function(){
if(this.staticTimer){
clearInterval(this.staticTimer);
this.staticTimer=null;
window.setTimeout(dojo.hitch(this,this._clear),1000*25);
}
},createPlaceHolder:function(_6){
var _7="/docs/static/"+this.staticPath+_6;
var o=null;
if(dojo.isIE){
o=document.createElement("script");
o.src=_7;
o.type="text/cache";
}else{
o=document.createElement("object");
o.data=_7;
o.width=0;
o.height=0;
}
this.docsDiv.appendChild(o);
if(dojo.isIE){
this.eventArray.push(dojo.connect(o,"onreadystatechange",dojo.hitch(this,this._onObjStateChange,o)));
}else{
this.eventArray.push(dojo.connect(o,"onload",dojo.hitch(this,this._onObjLoad)));
}
this.bContinueLoad=false;
},_onObjLoad:function(){
this.bContinueLoad=true;
},_onObjStateChange:function(o){
if(o.readyState=="complete"||o.readyState=="loaded"){
this.bContinueLoad=true;
}
},_clear:function(){
if(this.eventArray){
for(var i;i<this.eventArray.length;i++){
dojo.disconnect(this.eventArray[i]);
}
this.eventArray=[];
}
if(this.docsDiv&&this.docsDiv.parentNode){
this.docsDiv.parentNode.removeChild(this.docsDiv);
}
}});
}

dojo.provide("concord.nls.ccdfilesext")._built=true;
dojo.provide("concord.nls.ccdfilesext.en_us");
concord.nls.ccdfilesext.en_us={"downloadAsMS":"Download as Microsoft Office Format","newDocumentDialogDocumentChangeTypeLink":"Change default file extension","DOWNLOAD_EMPTY_OK":"Close","newDocumentName":"Document","LEFT":"Left:","DOWNLOAD_NEWDRAFT_LAST_EDITED":{"MONTH":"last edited on ${date}","TODAY":"last edited today at ${time}","YESTERDAY":"last edited yesterday at ${time}","DAY":"last edited on ${date}","YEAR":"last edited on ${date_long}","FULL":"${date_long} ${time_long}"},"draft_beiing_edited":"This file is currently being edited on the web by ${user}.","INTRODUCTION_BOX_4_6_BLURB_LIST_ITEM1":"{0}Add your own files{1}.","draft_save_action_label":"Publish a version","INTRODUCTION_BOX_4_6_BLURB_LIST_ITEM2":"{0}Start editing online, in real-time, individually or collaboratively{1}.","draft_tab_title":"Draft","INTRODUCTION_BOX_4_6_BLURB_LIST_ITEM3":"{0}Upload and edit documents, spreadsheets, or presentations{1}.","newDocumentDialogTitle":"New Document","LABEL_PUBLISHED":{"MONTH":"Published on ${date}","TODAY":"Published today at ${time}","YESTERDAY":"Published yesterday at ${time}","DAY":"Published on ${date}","YEAR":"Published on ${date_long}","FULL":"${date_long} ${time_long}"},"draft_latest_edit":"Latest edit:","BOTTOM_DESC":"Bottom margin, in centimeters","PAGE_SETUP_TITLE":"Page Setup","LETTER":"Letter","BOTTOM":"Bottom:","draft_unpublished_tip":"There are edits to this draft that have not been published as a version. ${publish_action}","TOP_DESC2":"Top margin, in inches","GRIDLINE":"Grid lines","INTRODUCTION_BOX_BLURB_UPLOAD_DOCS":"Click Upload Files to add a file. Click New to create a file with Docs.","DOWNLOAD_EMPTYVIEW_OK":"Close","storageserver_error_content":"The server is currently unavailable. Your request cannot be processed at this time. Try again later or contact your system administrator.","newTooltip":"Create a document","newFromSheetTip":"Create a spreadsheet (XLS,XLSX or ODS file) from a template file. You can edit these spreadsheets online in Docs.","editaccess_denied_content":"You do not have permission to edit this file. You must be entitled for Docs and the file must be shared with you or you must have editor access to the file.","fileconnect_denied_content":"Docs cannot connect to the file repository. Try again later or contact your system administrator.","draft_created":"${0} based on Version ${1}","newName":"New","newFromDocTip":"Create a document (DOC,DOCX or ODT file) from a template file. You can edit these documents online in Docs.","newDialogProblemidErrMsg":"Report this problem to your administrator. ","SIZE1":"Env. #6 3/4","SIZE2":"Env. Monarch","SIZE3":"Env. #9","SIZE4":"Env. #10","SIZE5":"Env. #11","SIZE6":"Env. #12","WARN_INTERNAL":"Once a file is created, it is not possible to change permission to share with others outside of your organization.","SIZE7":"16 kai","SIZE8":"32 kai","SIZE9":"32 kai large","DOWNLOAD_EMPTYVIEW_CONTENT1":"There is no published version of this file to download.","LABEL_VERSION_PUBLISHED":{"MONTH":"Version published on ${date}","TODAY":"Version published today at ${time}","YESTERDAY":"Version published yesterday at ${time}","DAY":"Version published on ${date}","YEAR":"Version published on ${date_long}","FULL":"${date_long} ${time_long}"},"DOWNLOAD_EMPTYVIEW_CONTENT2":"Ask the file owner to publish a version of this file.","LABEL_CREATED":{"MONTH":"Created on ${date}","TODAY":"Created today at ${time}","YESTERDAY":"Created yesterday at ${time}","DAY":"Created on ${date}","YEAR":"Created on ${date_long}","FULL":"${date_long} ${time_long}"},"LABEL_DRAFT_TAB_EDIT":{"MONTH":"Edited on ${date}","TODAY":"Edited today at ${time}","YESTERDAY":"Edited yesterday at ${time}","DAY":"Edited on ${date}","YEAR":"Edited on ${date_long}","FULL":"${date_long} ${time_long}"},"INTRODUCTION_BOX_CLOSE":"Close the \"Welcome to Files and Docs\" section","DOWNLOAD_EMPTY_CONTENT1":"There is no published version of this file to download.","publish_locked_file":"You cannot publish this file as a new version because it is locked, however, your content is automatically saved in the draft.","DOWNLOAD_EMPTY_CONTENT2":"Versions can be published from the Docs editor.","newDocumentDialogBtnOKTitle":"Create a document","PAGE_SETUP_INVALID_MSG":"The input is invalid and has been rectified automatically. Try another value if you want a different result.","newDialogProblemidErrMsgShow":"Click to show details","conversion_timeout_content":"At this time, the document takes too long to convert. Try again later.","newCommunityInfo":"Community members are able to edit this file.","newDocumentDialogExtensions":{"doc":"Microsoft Word 97-2003(*.doc)","odt":"OpenDocument Text(*.odt)"},"CANCEL":"Cancel","MARGINS_LABEL":"Margins","repository_out_of_space_content":"You do not have enough space to save your new document. Remove other files to free enough space to save this document.","PAPER_FORMAT_LABEL":"Paper format","OPEN_THIS_FILE_TIP":"Open this file","publishErrMsg_NoPermission":"Failed to publish new version because you do not have editor permissions on this file. Contact the file owner to obtain editor permissions and try again.","PAGE_TYPE1":"Top to bottom, then right","PAGE_TYPE2":"Left to right, then down","newDocumentDialogNoNameErrMsg":"Document name is required.","viewaccess_denied_content":"You do not have permission to view this file. The file must be made public or must be shared with you.","HEADER":"Header","LABEL_CREATED_OTHER":{"MONTH":"${user} created on ${date}","TODAY":"${user} created today at ${time}","YESTERDAY":"${user} created yesterday at ${time}","DAY":"${user} created on ${date}","YEAR":"${user} created on ${date_long}","FULL":"${date_long} ${time_long}"},"LABEL_DRAFT_CREATED_OTHER":{"MONTH":"${user} created draft on ${date}","TODAY":"${user} created draft today at ${time}","YESTERDAY":"${user} created draft yesterday at ${time}","DAY":"${user} created draft on ${date}","YEAR":"${user} created draft on ${date_long}","FULL":"${date_long} ${time_long}"},"PAGE_SETUP_BTN_OK":"OK","LABEL_DRAFT_MODIFIED":{"MONTH":"Draft edited on ${date}","TODAY":"Draft edited today at ${time}","YESTERDAY":"Draft edited yesterday at ${time}","DAY":"Draft edited on ${date}","YEAR":"Draft edited on ${date_long}","FULL":"${date_long} ${time_long}"},"editTooltip":"Edit in Docs","LEGAL":"Legal","newPresName":"Presentation","LANDSCAPE":"Landscape","newDocumentDialogServerErrMsg":"The Docs server is not available. Contact the server administrator and try again later.","docTooLargeCancelBtn":"Cancel","editWithDocsDialogTitle":"Start editing online with Docs?","newDocumentTooltip":"New document","HEIGHT_DESC":"Paper height, in centimeters","HEIGHT_DESC2":"Paper height, in inches","BOTTOM_DESC2":"Bottom margin, in inches","newDialogProblemidErrMsgHide":"Click to hide","newDocumentDialogNamepre":"*Name:","FOOTER_DESC":"Footer height, in centimeters","INTRODUCTION_BOX_TITLE":"New to Files and Docs?","CM_LABEL":"cm","VIEW_FILE_DETAILS_LINK":"View File Details","doc_toolarge_content":"The document that you want to access is too large.","newSheetName":"Spreadsheet","viewName":"View","draft_published":"The latest edits in the draft have been published.","newSheetDialogTitle":"New Spreadsheet","TABLOID":"Tabloid","INTRODUCTION_BOX_46_BLURB":"Create and collaborate on content with colleagues. Learn how to:","docTooLargeDescription":"The document that you want to edit is too large. \x3cbr /\x3eMake sure that the size of file in *.odt, *.doc, \x3cbr /\x3eor *.docx format is no greater than 2048 K.","newDocumentDialogDocumentTypePre":"Type:","downloadWithUnsavedDraftReadersDescription":"This version may not contain the latest edits. The version of the document downloaded will be the last saved version by an editor of the document. Do you want to continue?","doc_notfound_content":"The document that you want to access has been deleted or moved. Check that the link is correct.","RIGHT_DESC":"Right margin, in centimeters","newDocumentDialogBtnOK":"Create","newDocumentDialogContent":"Provide a name for this untitled document.","draft_cur_editing":"Current editing:","newFromDialogName":"New from File","service_unavailable_content":"Docs service is not available. Your request cannot be processed at this time. Try again later or contact your system administrator.","LABEL_DRAFT_MODIFIED_OTHER":{"MONTH":"${user} edited draft on ${date}","TODAY":"${user} edited draft today at ${time}","YESTERDAY":"${user} edited draft yesterday at ${time}","DAY":"${user} edited draft on ${date}","YEAR":"${user} edited draft on ${date_long}","FULL":"${date_long} ${time_long}"},"HEADER_DESC":"Header height, in centimeters","INTRODUCTION_BOX_46_BLURB_LIST_ITEM1":"Add your own files.","INTRODUCTION_BOX_46_BLURB_LIST_ITEM2":"Start editing online, in real-time, individually or collaboratively.","INTRODUCTION_BOX_46_BLURB_LIST_ITEM3":"Upload and edit documents, spreadsheets, or presentations.","DISPLAY_OPTION_LABEL":"Display options","DOWNLOAD_NEWDRAFT_TITLE":"Download a Version","newFromName":"Create File","sheetTitle0":"Sheet1","sheetTitle1":"Sheet2","sheetTitle2":"Sheet3","PAGE_LABEL":"Page order","newSheetDialogBtnOKTitle":"Create a spreadsheet","HEIGHT":"Height:","newDialogProblemidErrMsg_tip":"Report this problem to your administrator. ${shown_action}","newDocumentDialogBtnCancel":"Cancel","TOP":"Top:","newFromTooltip":"Create a new file using this file as a template","newSheetDialogExtensions":{"ods":"OpenDocument Spreadsheet(*.ods)","xls":"Microsoft Excel 97-2003(*.xls)"},"INTRODUCTION_BOX_BLURB":"Upload and share your files. Create and edit files individually or collaboratively using Docs. Organize files in folder, follow files to track changes, and pin your favorites.","newDocumentDialog_WARN_LONG_DOCUMENTNAME":"The document name is too long.","convservice_unavailable_content":"Docs conversion service is not available. Your request cannot be processed at this time. Try again later or contact your system administrator.","LABEL_VERSION_PUBLISHED_OTHER":{"MONTH":"${user} published version on ${date}","TODAY":"${user} published version today at ${time}","YESTERDAY":"${user} published version yesterday at ${time}","DAY":"${user} published version on ${date}","YEAR":"${user} published version on ${date_long}","FULL":"${date_long} ${time_long}"},"DOWNLOAD_NEWDRAFT_CONFIRM_CONTENT":"This is the latest downloadable version of a Docs file. To learn if a later version exists in draft format, contact the file owner.","publishErrMsg_Quota_Out":"There is not enough space to publish a new version of this document. Remove other files to free enough space to publish this document.","DOWNLOAD_EMPTYVIEW_TITLE":"Cannot Download the File","TOP_DESC":"Top margin, in centimeters","nonentitlement_docs_indicator_text":"This file is available for online editing only if you have purchased Docs entitlement.","newSheetTooltip":"New spreadsheet","editWithDocsDialogContent1":"Docs lets you collaborate on Files with other people at the same time, and see changes immediately. You can work online privately as well.","editWithDocsDialogContent2":"You do not need to upload new versions of a document. If all editing is done online, both your work and comments are protected. ","DOWNLOAD_EMPTY_TITLE":"Cannot Download the File","newPresDialogInitialName":"Untitled Presentation","newPresDialogBtnOKTitle":"Create a presentation","DOWNLOAD_NEWDRAFT_CONTENT1":{"MONTH":"A newer draft, last edited on ${date}, has been detected.","TODAY":"A newer draft, last edited today at ${time}, has been detected.","YESTERDAY":"A newer draft, last edited yesterday at ${time}, has been detected.","DAY":"A newer draft, last edited on ${date}, has been detected.","YEAR":"A newer draft, last edited on ${date_long}, has been detected.","FULL":"${date_long} ${time_long}"},"TAGGED_PDF":"Tagged PDF","DOWNLOAD_NEWDRAFT_CONTENT2":{"MONTH":"Are you sure you want to continue to download the version that was published on ${date}?","TODAY":"Are you sure you want to continue to download the version that was published today at ${time}?","YESTERDAY":"Are you sure you want to continue to download the version that was published yesterday at ${time}?","DAY":"Are you sure you want to continue to download the version that was published on ${date}?","YEAR":"Are you sure you want to continue to download the version that was published on ${date_long}?","FULL":"${date_long} ${time_long}"},"newFromPresTip":"Create a presentation (PPT,PPTX or ODP file) from a template file. You can edit these presentations online in Docs.","ORIENTATION_LABEL":"Orientation","LEFT_DESC2":"Left margin, in inches","WIDTH_DESC":"Paper width, in centimeters","newPresDialogExtensions":{"ppt":"Microsoft PowerPoint 97-2003(*.ppt)","odp":"OpenDocument Presentation(*.odp)"},"downloadWithUnsavedDraftTitle":"Outstanding Draft","PORTRAIT":"Portrait","FOOTER":"Footer","viewTooltip":"Preview the file in a browser","INTRODUCTION_BOX_BLURB_UPLOAD":"Click \"Upload Files\" to add a file. Click \"New\" to create a file with Docs.","DOWNLOAD_NEWDRAFT_OK":"Download Version","WIDTH":"Width:","newSheetDialogInitialName":"Untitled Spreadsheet","newDocumentDialogIllegalErrMsg":"${0} is an illegal document title, please specify another one.","server_busy_content":"Wait for a while and try again later.","editName":"Edit in Docs","downloadAsPDF":"Download as PDF File","INTRODUCTION_BOX_BLURB_LOG_IN":"Log in to start using Files and Docs.","RIGHT_DESC2":"Right margin, in inches","LEFT_DESC":"Left margin, in centimeters","PAPER_SIZE_LABEL":"Paper size:","USER":"User","publishErrMsg":"The version was not published. The file might be too large, or the server might have timed out. Try again, or cancel and ask your administrator to check the server log to identify the problem.","newDocumentDialogNoPermissionErrMsg":"The file cannot be created because you do not have editor access. Contact the administrator.","newDocumentDialogServerErrMsg2":"The Connections server is not available. Contact the server administrator and try again later.","draft_doctype_valid":"Only files that are Docs documents can be edited.","editWithDocsDialogBtnOKTitle":"Edit Online","LABEL_PUBLISHED_OTHER":{"MONTH":"${user} published on ${date}","TODAY":"${user} published today at ${time}","YESTERDAY":"${user} published yesterday at ${time}","DAY":"${user} published on ${date}","YEAR":"${user} published on ${date_long}","FULL":"${date_long} ${time_long}"},"currentEditing":"Current editing: ","LABEL_DRAFT_CREATED":{"MONTH":"Draft created on ${date}","TODAY":"Draft created today at ${time}","YESTERDAY":"Draft created yesterday at ${time}","DAY":"Draft created on ${date}","YEAR":"Draft created on ${date_long}","FULL":"${date_long} ${time_long}"},"unSupporteBrowserTitle":"Unsupported Browser","newPresDialogTitle":"New Presentation","docs_indicator_text":"This is a Docs file. All edits must be made online.","newDocumentDialog_TRIM_LONG_DOCUMENTNAME":"Shorten the document name?","WIDTH_DESC2":"Paper width, in inches","downloadWithUnsavedDraftReadersOkLabel":"Ok","newDocumentDialogInitialName":"Untitled Document","draft_edit_link":"Edit","unSupporteBrowserContent1":"We\'re sorry, but your browser might  not work properly with Docs. For best results, try using one of these supported browsers.","publishErrMsg_NoFile":"Because this document has been deleted by others, publish failed.","unSupporteBrowserContent2":"Of course, you can continue with your browser but you might not experience all the features of Docs.","newPresTooltip":"New presentation","unSupporteBrowserContent3":"Don\'t show me this message again.","newDocumentDialogDupErrMsg":"A duplicate file name was found. Enter a new name.","draft_not_found":"There are no draft edits for this file.","docTooLargeTitle":"The document is too large.","downloadWithUnsavedDraftDescription":"This version may not contain the latest online edits. Click save to create a new version and download. Click cancel to proceed without saving.","RIGHT":"Right:"};

;if(!dojo._hasResource["concord.global"]){
dojo._hasResource["concord.global"]=true;
dojo.provide("concord.global");


















dojo.requireLocalization("concord","ccdfilesext");
glb_concord_url="/docs";
glb_concord_url_wnd_open="/docs";
EntitlementCheck=false;
concord.global={};
concord.global._getLocalization=function(_1,_2,_3){
var _4=_1+".nls."+_2;
var _5,_6=dojo.getObject(_4),_7=_3.split("-");
for(var i=_7.length;i>0;i--){
var _8=_7.slice(0,i).join("_");
if(dojo.exists(_8,_6)){
_5=_6[_8];
break;
}
}
if(!_5&&_6&&_6.ROOT){
_5=_6.ROOT;
}
return _5;
};
concord.global.lang=dojo.locale.toLowerCase();
if((concord.global.lang.indexOf("en")==0)||(concord.global.lang==="zh-cn")||(concord.global.lang==="zh-tw")||(concord.global.lang==="pt-br")||((concord.global.lang.split("-").length==1)&&(concord.global.lang!="zh")&&(concord.global.lang!="nn")&&(concord.global.lang!="nb")&&(concord.global.lang!="in")&&(concord.global.lang!="id-id")&&(concord.global.lang!="in-id"))){
concord.global.nls=dojo.i18n.getLocalization("concord","ccdfilesext");
}else{
if(dojo.version.major==1&&dojo.version.minor<7){
concord.global._locMap={"zh-hk":"zh-tw","zh-mo":"zh-tw","zh-sg":"zh-cn","zh":"zh-cn","nb":"no","nb-no":"no","nn-no":"no","nn":"no","in":"id","id-id":"id","in-id":"id"};
if(concord.global._locMap[concord.global.lang]){
concord.global.lang=concord.global._locMap[concord.global.lang];
}else{
concord.global.lang=concord.global.lang.split("-")[0];
}
dojo._loadedModules["concord.nls.ccdfilesext"]._built=false;
dojo.requireLocalization("concord","ccdfilesext",concord.global.lang);
concord.global.nls=dojo.i18n.getLocalization("concord","ccdfilesext",concord.global.lang);
}else{
concord.global._locMap={"zh-hk":"zh-tw","zh-mo":"zh-tw","zh-sg":"zh-cn","zh":"zh-cn","nb":"nb","nb-no":"nb","nn-no":"nb","nn":"nb","no":"nb","id-id":"id","in-id":"id"};
var useLocMap=true;
if(dojo.isIE&&concord.global.lang=="id-id"){
useLocMap=false;
}
if(concord.global._locMap[concord.global.lang]&&useLocMap){
concord.global.lang=concord.global._locMap[concord.global.lang];
}
concord.global.nls=concord.global._getLocalization("concord","ccdfilesext",concord.global.lang);
}
}
concord.global._isNeedDocsSAML=null;
concord.global._isEntitlementChecked=null;
concord.global._isUploadNewVersionEnabled=null;
concord.global.IBMDOCID2="00000000-00000-0000-0001-00000000000000";
concord.global.IBMDOCID="00000000-0000-0000-0001-000000000000";
concord.global.xhrGetRetry=function(_9){
var _a=function(_b,_c,_d,_e){
if(_d instanceof Error){
_b.handle=_c;
dojo.xhrGet(_b);
}else{
_c(_d,_e);
}
};
_9.handle=dojo.hitch(this,_a,_9,_9.handle);
return dojo.xhrGet(_9);
};
concord.global.isNeedDocsSAML=function(){
if(concord.global._isNeedDocsSAML===null){
concord.global.showConcordEntry();
}
return concord.global._isNeedDocsSAML;
};
concord.global.showConcordEntry=function(){
concord.global._isNeedDocsSAML=false;
var _f=dojo.cookie("entitlements");
if(_f){
var _10=_f.split("-");
var _11=_10[1];
if(_11){
var _12=dojox.encoding.base64.decode(_11);
var s=[];
dojo.forEach(_12,function(c){
s.push(String.fromCharCode(c));
});
var _13=s.join("");
if(_13.indexOf("bh_docs")>-1){
concord.global._isNeedDocsSAML=true;
return true;
}
}
return false;
}else{
if(concord.global._isEntitlementChecked!=null){
return concord.global._isEntitlementChecked;
}
if(lconn.core.auth.isAuthenticated()){
var url=glb_concord_url+"/api/entitlement";
var _14=null;
concord.global.xhrGetRetry({url:url,handleAs:"json",timeout:30000,sync:true,preventCache:true,handle:function(r,io){
_14=r;
}});
if(_14 instanceof Error){
concord.global._isEntitlementChecked=false;
return false;
}else{
concord.global._isEntitlementChecked=_14.entitlement_allowed;
return _14.entitlement_allowed;
}
}else{
return false;
}
}
};
concord.global.isIBMDocFile=function(_15){
var _16="";
if(_15.declaredClass=="lconn.share.bean.File"||_15.declaredClass=="lconn.share.bean.Version"){
_16=_15.getObjectTypeId();
}
return (_16==concord.global.IBMDOCID2)||(_16==concord.global.IBMDOCID);
};
concord.global.isOwner=function(_17,app){
var id1=app.getAuthenticatedUserId();
var id2=_17.getAuthor().id;
return id1==id2;
};
concord.global.createHelpLink=function(app,el,msg,opt){
if(dojo.getObject("lconn.files.scenehelper.createHelpLink")){
return lconn.files.scenehelper.createHelpLink(app,el,msg,opt);
}else{
return null;
}
};
concord.global.shouldShowExternal=function(app){
if(!app){
return false;
}
if(!(app.declaredClass==="lconn.files.PersonalFiles")){
return false;
}
var _18=true;
try{
if(!app.authenticatedUser.policy.capabilities.canCreate.files.external){
_18=false;
}
}
catch(e){
_18=false;
}
return _18;
};
concord.global.getExternalWidget=function(_19,app,_1a,_1b,_1c){
if(!app){
return null;
}
var _1d=dojo.getObject("policy.isExternalDefault",false,app.authenticatedUser)!=false;
var d=document;
var _1e=d.createElement("div");
var _1f=_19.extChkBox=d.createElement("input");
_1f.type="checkbox";
_1f.id=_19.id+"_setExt";
_1f.className="lotusCheckbox";
_1f.name="_setExt";
_1f.value="true";
_1f.checked=_1f.defaultChecked=_1d;
_1e.appendChild(_1f);
var _20=false;
var _21=app.getContext?app.getContext("file","create",true):null;
if(_21&&_21.type=="folder"&&_21.isExternal){
if(_1c){
_20=false;
}else{
_20=true;
}
}
if((app.authenticatedUser&&app.authenticatedUser.isExternal)||_20){
_1f.checked=true;
_1f.disabled=true;
}
var _22=d.createElement("label");
_22.className="lotusCheckbox";
_22.appendChild(d.createTextNode(_1a));
dojo.attr(_22,"for",_1f.id);
_1e.appendChild(_22);
_1e.appendChild(d.createTextNode("\xa0"));
concord.global.createHelpLink(app,_1e,"upload.external",{inline:true});
_1b.appendChild(_1e);
return _1f;
};
concord.global.isEditor=function(_23){
return !!_23.getPermissions().Edit;
};
concord.global.isReader=function(_24){
return !!_24.getPermissions().View;
};
concord.global.getDocDraftURL=function(_25,_26){
var url=glb_concord_url+"/api/docsvr/lcfiles/"+_25.getId()+"/draft";
if(_26){
url=url+"?respect_cache=true";
}
return url;
};
concord.global.getDocEditURL=function(_27,_28){
if(!_28){
_28="lcfiles";
}
return glb_concord_url_wnd_open+"/app/doc/"+_28+"/"+_27+"/edit/content";
};
concord.global.getDocSettingsUri=function(_29,_2a){
if(!_2a){
_2a="lcfiles";
}
return glb_concord_url_wnd_open+"/api/docsvr/"+_2a+"/"+_29+"/edit/settings";
};
concord.global.getDocViewURL=function(_2b,_2c){
var url=glb_concord_url_wnd_open+"/app/doc/lcfiles/"+_2b+"/view/content";
if(_2c){
url=url+"?asFormat="+_2c;
}
return url;
};
concord.global.getPublishJobQueryURL=function(_2d,_2e){
var url=glb_concord_url+"/api/job/lcfiles/"+_2d.getId()+"/"+_2e;
return url;
};
concord.global.getIconBaseURL=function(){
var _2f=lconn.core.config.services.webresources;
var url=_2f.url+"/web/com.ibm.lconn.core.styles/sprite/";
url=url.replace(/^https?:/i,window.location.protocol);
return url;
};
concord.global.hashWinNameFromId=function(fid){
return fid.replace(/[-\s.@]/g,"_");
};
concord.global.getErrorMessage=function(_30){
var _31=concord.global.nls.service_unavailable_content;
if(_30==1001){
_31=concord.global.nls.viewaccess_denied_content;
}else{
if(_30==1002){
_31=concord.global.nls.publishErrMsg_NoPermission;
}else{
if(_30==1003){
_31=concord.global.nls.doc_notfound_content;
}else{
if(_30==1004){
_31=concord.global.nls.fileconnect_denied_content;
}else{
if(_30==1005){
_31=concord.global.nls.repository_out_of_space_content;
}else{
if(_30==1200){
_31=concord.global.nls.convservice_unavailable_content;
}else{
if(_30==1201||_30==1500){
_31=concord.global.nls.doc_toolarge_content;
}else{
if(_30==1202){
_31=concord.global.nls.conversion_timeout_content;
}else{
if(_30==1208){
_31=concord.global.nls.server_busy_content;
}else{
if(_30==1601||_30==1602){
_31=concord.global.nls.storageserver_error_content;
}else{
if(_30==1706){
_31=concord.global.nls.publish_locked_file;
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
return _31;
};
concord.global.haveDocsLTPA=function(){
var _32=dojo.cookie("LTPADocsFlag");
if(_32){
return true;
}
return false;
};
concord.global.doDocsSSO=function(){
var _33=dojo.byId("ImmediateSamlFrame");
if(!_33){
var _34=document.createElement("IFRAME");
_34.name=_34.id="ImmediateSamlFrame";
_34.style.top="-9999px";
_34.style.width=_34.style.height="1px";
_34.style.display="none";
_34.src="/docs/app/doc";
document.body.appendChild(_34);
}
};
concord.global.getDocsPreferences=function(_35,_36){
var url=glb_concord_url+"/api/people?method=getPreferenceInfo";
if(_35){
url=url+"&docType="+_35;
}
var _37=null;
concord.global.xhrGet({url:url,filesUserId:_36,handleAs:"json",timeout:30000,sync:true,preventCache:true,handle:function(r,io){
_37=r;
}});
if(_37 instanceof Error){
return null;
}
return _37;
};
concord.global.getFilesVersion=function(){
if(window._lconn_files_config){
var _38=window._lconn_files_config.releaseVersion;
if(_38){
var _39=_38.split(".");
if(_39[0]&&_39[1]){
return _39[0]*1+_39[1]*0.1;
}
}
}
return null;
};
concord.global.isUploadNewVersionEnabled=function(){
return !!concord.global._isUploadNewVersionEnabled;
};
concord.global.addCsrfToken=function(_3a){
var ct=new Date().getTime().toString();
var _3b=_3a.filesUserId+"@@"+ct.substring(4,ct.length-1)+"##";
var _3c=dojox.encoding.digests.MD5(_3b,dojox.encoding.digests.outputTypes.Hex);
var _3d={"X-Csrf-Token":_3c,"X-Timestamp":ct};
if(typeof _3a.headers=="undefined"){
_3a.headers={};
}
dojo.mixin(_3a.headers,_3d);
var _3e={"X-DOCS-REPOID":"lcfiles"};
dojo.mixin(_3a.headers,_3e);
};
if(concord.global.isNeedDocsSAML()){
concord.global.xhrGet=function(_3f){
concord.global.addCsrfToken(_3f);
if(concord.global.haveDocsLTPA()){
return dojo.xhrGet(_3f);
}else{
concord.global.doDocsSSO();
setTimeout(dojo.hitch(this,concord.global.xhrGet,_3f),1000);
}
};
}else{
concord.global.xhrGet=function(_40){
concord.global.addCsrfToken(_40);
return dojo.xhrGet(_40);
};
}
concord.global.xhrPost=function(_41){
concord.global.addCsrfToken(_41);
return dojo.xhrPost(_41);
};
concord.global.showMsg=function(){
var _42=dojo.byId("problem_id");
var _43=dojo.style(_42,"display");
console.log(_43);
if(_43&&_43=="none"){
dojo.style(_42,"display","block");
dojo.byId("problem_toggle").innerHTML=concord.global.nls.newDialogProblemidErrMsgHide;
}else{
dojo.style(_42,"display","none");
dojo.byId("problem_toggle").innerHTML=concord.global.nls.newDialogProblemidErrMsgShow;
}
};
(function(){
var _44={disableRevert:true,disableGenericEdit:true,hideUpdateTime:true,disableOpenInline:true};
lconn.core.uiextensions.add("lconn/files/config/file",function(_45,opt){
if(concord.global.showConcordEntry()){
_44.disableDownload=true;
}
var _46=dojo.getObject("lconn.share.config");
var _47=false;
var _48=false;
if(_46&&_46.actionConfig&&_46.actionConfig.isActionAllowed){
_47=_46.actionConfig.isActionAllowed(concord.global.IBMDOCID,null,"uploadNewVersion");
_48=_46.actionConfig.isActionAllowed(concord.global.IBMDOCID,null,"restoreVersion");
concord.global._isUploadNewVersionEnabled=_47;
}
if(concord.global.isIBMDocFile(_45)){
_44.disableGenericEdit=!_47;
_44.disableRevert=!_48;
return _44;
}
});
})();
dojo.addOnLoad(function(){
if(concord.global.isNeedDocsSAML()){
var _49=new concord.SAMLFrameLogin();
_49.login(0);
}
window.setTimeout(function(){
if(concord.global.showConcordEntry()){
var _4a=new concord.DocsPreload();
_4a.preload(0);
}
},5000);
});
}


;dojo.cache("lconn.share", "widget/templates/LotusDialog.html", "<div class=\"dijitDialog\" tabindex=\"-1\" waiRole=\"dialog\" waiState=\"labelledby-${id}_title\" role=\"dialog\" aria-labelledby=\"${id}_title\" widgetid=\"${id}\" > <div class=\"lotusDialogBorder\" dojoAttachPoint=\"dialogBorder\"> <form class=\"lotusDialog lotusForm\" dojoAttachPoint=\"formNode\" \"action=\"javascript:;\" dojoAttachEvent=\"onsubmit: _onSubmit\" method=\"${formMethod}\"> <div dojoAttachPoint=\"titleBar\" class=\"lotusDialogHeader\"> <h1 class=\"lotusHeading\"><span dojoAttachPoint=\"titleNode\" class=\"dijitDialogTitle\" id=\"${id}_title\" style=\"vertical-align: middle;\"></span></h1> <a class=\"lotusDialogClose\" role=\"button\" tabIndex=\"0\" dojoAttachPoint=\"closeButtonNode\" dojoAttachEvent=\"onclick: onCancel\" href=\"javascript:;\" title=\"${buttonClose}\"> <img alt=\"${buttonClose}\" src=\"${_blankGif}\" role=\"presentation\" /> <span class=\"lotusAltText\">X</span> </a> </div> <div dojoAttachPoint=\"containerNode,dialogBodyNode\"></div> <div class=\"lotusDialogFooter\" dojoAttachPoint=\"footerBar\"> <div class=\"lotusRight\" dojoAttachPoint=\"footerStatusNode\"></div> <input id=\"submit_button\" type=\"submit\" role=\"button\" dojoAttachEvent=\"onclick: _onSubmit\" dojoAttachPoint=\"submitButtonNode\" class=\"lotusFormButton\" value=\"${buttonOk}\" title=\"${buttonOkTitle}\"/> <input id=\"cancel_button\" type=\"button\" role=\"button\" dojoAttachEvent=\"onclick: onCancel\" class=\"lotusFormButton\" value=\"${buttonCancel}\"/> </div> </form> </div></div>");

;if(!dojo._hasResource["lconn.share.widget.LotusDialog"]){
dojo._hasResource["lconn.share.widget.LotusDialog"]=true;
dojo.provide("lconn.share.widget.LotusDialog");


dojo.declare("lconn.share.widget.LotusDialog",[dijit.Dialog],{title:"",titleImageSrc:"",contentClass:"lotusDialogContent",formMethod:"post",multipart:false,formEnabled:true,_relativePosition:null,wDialog:"",_resizeDialog:false,_dialogHorizontallyShrunk:false,_dialogVerticallyShrunk:false,attributeMap:dojo.mixin(dojo.clone(dijit.Dialog.prototype.attributeMap),{contentClass:{node:"containerNode",type:"class"}}),templateString:null,templatePath:dojo.moduleUrl("lconn.share","widget/templates/LotusDialog.html"),show:function(){
dojo.publish("lconn/share/scene/modal-dialog/shown",[this]);
if(this._resizeDialog){
dojo.style(this.dialogBodyNode,"overflow","hidden");
if(dojo.isFunction(this.resize)){
dojo.connect(this,"resize",dojo.hitch(this,this._onDialogResize));
}
if(dojo.isFunction(this.layout)){
dojo.connect(this,"layout",dojo.hitch(this,this._onDialogResize));
}
}
return this.inherited(arguments);
},postMixInProperties:function(){
var _1=this.buttonOk;
var _2=this.buttonOkTitle||"";
var _3=this.buttonCancel;
this.inherited(arguments);
this.buttonOk=_1||this.buttonOk;
this.buttonOkTitle=_2||this.buttonOkTitle;
this.buttonCancel=_3||this.buttonCancel;
this.buttonClose=this.buttonClose||this.buttonCancel;
},postCreate:function(){
this.inherited(arguments);
if(this.multipart&&this.formNode){
this.formNode.method="POST";
dojo.attr(this.formNode,"enctype","multipart/form-data");
dojo.attr(this.formNode,"encoding","multipart/form-data");
}
if(this.draggable&&this.titleBar){
this.titleBar.style.cursor="move";
}
if(this.titleTooltip){
dojo.attr(this.titleBar,"title",this.titleTooltip);
}
if(this.resizeDialog){
this._resizeDialog=this.resizeDialog;
}
},_setup:function(){
this.inherited(arguments);
if(this.zIndex>0){
this._underlay.domNode.style.zIndex=this.zIndex;
this.domNode.style.zIndex=this.zIndex+1;
}
if(this._moveable){
var _4=this._moveable.onDragDetected;
this._moveable.onDragDetected=function(e){
var _5=e.target;
while(_5&&_5.nodeName.toLowerCase()!="a"){
_5=_5.parentNode;
}
if(_5&&_5.nodeName.toLowerCase()=="a"&&dojo.hasClass(_5,"lotusClose")){
return false;
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
},_onSubmit:function(e){
dojo.stopEvent(e);
if(this.formEnabled){
this.inherited(arguments);
}
},setSubmitButtonEnabled:function(_9){
this.formEnabled=_9;
dojo[_9?"removeClass":"addClass"].apply(dojo,[this.submitButtonNode,"lotusBtnDisabled"]);
if(dijit.setWaiState){
dijit.setWaiState(this.submitButtonNode,"disabled",!_9);
}
if(dojo.hasClass(dojo.body(),"dijit_a11y")){
if(dojo.isIE){
this.submitButtonNode.style.filter=_9?"":"alpha(opacity=33)";
}else{
this.submitButtonNode.style.opacity=_9?"1":".5";
}
}
if(_9){
dojo.removeAttr(this.submitButtonNode,"disabled");
}else{
dojo.attr(this.submitButtonNode,"disabled","");
}
},keepOpen:function(){
this._keepOpen=true;
},hide:function(){
if(this._keepOpen){
delete this["_keepOpen"];
return;
}
dojo.publish("lconn/share/scene/modal-dialog/closed",[this]);
return this.inherited(arguments);
},_getFocusItems:function(){
this.containerNode=this.formNode;
this.inherited(arguments);
},_updatePositionAfterSizeChange:function(){
this._relativePosition=null;
this._position();
},resize:function(){
if(dojo.version.major==1&&dojo.version.minor<=9){
this.inherited(arguments);
}else{
var _a=false;
if(arguments&&arguments.length>=1){
if(arguments[0]&&arguments[0].type=="scroll"){
_a=true;
}else{
if(arguments[1]&&arguments[1].type=="scroll"){
_a=true;
}
}
}
if(!_a){
this._relativePosition=null;
}
this._position();
}
},_position:function(){
var _b=this.domNode;
var _c=dijit.getViewport();
var bb=dojo.position(_b,true);
if(bb.w==0||bb.h==0){
return;
}
if(!dojo.hasClass(dojo.body(),"dojoMove")){
var _d={l:Math.floor((_c.w-bb.w)/2),t:Math.floor((_c.h-bb.h)/2)};
if(!this._relativePosition){
bb.y=_c.t;
bb.x=(dojo._isBodyLtr()?_c.l:_c.l+(_c.w-bb.w));
}
if(dojo.version.minor>=9){
var _e=2;
var _f=(!this._relativePosition&&_d.l>=-_e)?_d.l:(bb.x-_c.l);
var _10=(!this._relativePosition&&_d.t>=-_e)?_d.t:(bb.y-_c.t);
if(dojo._isBodyLtr()){
if(_f+_c.l<0){
_f=0;
}
}else{
if(_f+_c.l>(_c.w-bb.w)){
_f=(_c.w-bb.w);
}
}
if(_10+_c.t<0){
_10=0;
}
this._relativePosition={x:_f,y:_10};
}else{
this._relativePosition={x:_d.l>=0?_d.l:bb.x-_c.l,y:_d.t>=0?_d.t:bb.y-_c.t};
}
}
this.inherited("_position",arguments);
},_onDialogResize:function(){
if(!this.dialogBorder){
return;
}
var _11=dojo.position(this.domNode,true);
if(this._dialogHorizontallyShrunk){
dojo.style(this.dialogBorder,"width",this.wDialog);
dojo.style(this.dialogBodyNode,"width","");
dojo.style(this.dialogBodyNode,"overflow-x","hidden");
this._dialogHorizontallyShrunk=false;
}
if(this._dialogVerticallyShrunk){
dojo.style(this.dialogBorder,"height","");
dojo.style(this.dialogBodyNode,"height","");
dojo.style(this.dialogBodyNode,"overflow-y","hidden");
this._dialogVerticallyShrunk=false;
}
var _12=dojo.position(this.domNode,true);
var _13=dijit.getViewport();
if(_12.w>_13.w){
dojo.style(this.dialogBorder,"width",_13.w+"px");
dojo.style(this.dialogBodyNode,"width",_13.w+"px");
dojo.style(this.dialogBodyNode,"overflow-x","scroll");
this._dialogHorizontallyShrunk=true;
}
if(_12.h>_13.h){
dojo.style(this.dialogBorder,"height",_13.h+"px");
var _14=_13.h-dojo.position(this.titleBar,true).h-dojo.position(this.footerBar,true).h;
dojo.style(this.dialogBodyNode,"height",_14+"px");
dojo.style(this.dialogBodyNode,"overflow-y","scroll");
this._dialogVerticallyShrunk=true;
}
var _15=dojo.position(this.domNode,true);
if(_11.w!=_15.w||_11.h!=_15.h){
this._updatePositionAfterSizeChange();
}
}});
}


;if(!dojo._hasResource["lconn.share.widget.Dialog"]){
dojo._hasResource["lconn.share.widget.Dialog"]=true;
dojo.provide("lconn.share.widget.Dialog");


dojo.declare("lconn.share.widget.Dialog",[dijit.Dialog],{initialFocusNode:null,onOpen:function(_1){
this.orient(this.domNode,_1.aroundCorner,_1.corner);
this._loadCheck();
if(this.autofocus){
this._getFocusItems(this.containerNode);
var _2=(dojo.isFunction(this.initialFocusNode)?this.initialFocusNode():this.initialFocusNode)||this._firstFocusItem;
dijit.focus(_2);
}
},_setup:function(){
this.inherited(arguments);
if(this.zIndex>0){
var _3=dijit._underlay;
if(!_3){
_3=dijit._underlay=new dijit.DialogUnderlay(this.underlayAttrs);
}else{
_3.attr(this.underlayAttrs);
}
_3.domNode.style.zIndex=this.zIndex;
this.domNode.style.zIndex=this.zIndex+1;
}
if(this._moveable){
var _4=this._moveable.onDragDetected;
this._moveable.onDragDetected=function(e){
var _5=e.target;
while(_5&&_5.nodeName.toLowerCase()!="a"){
_5=_5.parentNode;
}
if(_5&&_5.nodeName.toLowerCase()=="a"&&dojo.hasClass(_5,"lotusClose")){
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
},updatePositionAfterSizeChange:function(){
this._relativePosition=null;
this._position();
},resize:function(){
if(dojo.version.major==1&&dojo.version.minor<=9){
this.inherited(arguments);
}else{
var _9=false;
if(arguments&&arguments.length>=1){
if(arguments[0]&&arguments[0].type=="scroll"){
_9=true;
}else{
if(arguments[1]&&arguments[1].type=="scroll"){
_9=true;
}
}
}
if(!_9){
this._relativePosition=null;
}
this._position();
}
},_size:function(){
},_position:function(){
var _a=this.domNode;
var _b=dijit.getViewport();
var bb=dojo.position(_a,true);
if(this._compact){
this._compact(_b,bb);
bb=dojo.position(_a,true);
}
if(bb.w==0||bb.h==0){
return;
}
if(!dojo.hasClass(dojo.body(),"dojoMove")){
var _c={l:Math.floor((_b.w-bb.w)/2),t:Math.floor((_b.h-bb.h)/2)};
if(!this._relativePosition){
bb.y=_b.t;
bb.x=(dojo._isBodyLtr()?_b.l:_b.l+(_b.w-bb.w));
}
if(dojo.version.minor>=9){
var _d=2;
var _e=(!this._relativePosition&&_c.l>=-_d)?_c.l:(bb.x-_b.l);
var _f=(!this._relativePosition&&_c.t>=-_d)?_c.t:(bb.y-_b.t);
if(dojo._isBodyLtr()){
if(_e+_b.l<0){
_e=0;
}
}else{
if(_e+_b.l>(_b.w-bb.w)){
_e=(_b.w-bb.w);
}
}
if(_f+_b.t<0){
_f=0;
}
this._relativePosition={x:_e,y:_f};
}else{
this._relativePosition={x:_c.l>=0?_c.l:bb.x-_b.l,y:_c.t>=0?_c.t:bb.y-_b.t};
}
}
this.inherited("_position",arguments);
},_compact:function(_10,md){
var el=dojo.query("div.lotusDialogContent",this.domNode)[0];
if(el){
var div;
if(!dojo.hasClass(el,"_qkrDialogCompact")){
div=document.createElement("div");
el.parentNode.insertBefore(div,el);
el.parentNode.removeChild(el);
div.appendChild(el);
dojo.addClass(el,"_qkrDialogCompact");
}else{
div=el.parentNode;
}
var ms=dojo.marginBox(div);
var mc=dojo.marginBox(el);
if(ms.h==0||md.h==0){
return;
}
var _11=md.h-ms.h;
var _12=dojo.query("div.lotusDialogBorder",this.domNode)[0];
if(_12&&el.firstChild){
var _13=dojo.marginBox(_12).w;
var _14=this.savedBorderPadding;
if(!_14){
this.savedBorderPadding=_14=Math.min(20,_13-dojo.marginBox(div).w);
}
var _15=this.savedContentPadding;
if(!_15){
this.savedContentPadding=_15=_13-_14-dojo.contentBox(el).w;
}
var _16=0;
var _17=0;
while(el.childNodes[_16]){
_17=Math.max(_17,dojo.marginBox(el.childNodes[_16++]).w);
}
if(_13==0||_17==0){
return;
}
var _18=_17+_15+_14;
if(_13<_18){
dojo.marginBox(div,{w:_18-_14});
dojo.marginBox(_12,{w:_18});
dojo.marginBox(this.domNode,{w:_18});
}
}
}
},isScrolling:function(){
return !!dojo.query(".qkrDialogScrolledY",this.domNode)[0];
}});
}


;if(!dojo._hasResource["lconn.share.widget.ProtectedAction"]){
dojo._hasResource["lconn.share.widget.ProtectedAction"]=true;
dojo.provide("lconn.share.widget.ProtectedAction");
dojo.declare("lconn.share.widget.ProtectedAction",null,{startAction:function(){
if(this._actionInProgress){
return false;
}
this._actionInProgress=true;
return true;
},endAction:function(){
this._actionInProgress=false;
},isActing:function(){
return this._actionInProgress;
},enableInput:function(el){
this._toggleInput(el,true);
},disableInput:function(el){
this._toggleInput(el,false);
},_toggleInput:function(el,_1){
var _2=!_1;
var _3=el.getElementsByTagName("INPUT");
for(var i=0,a;a=_3[i++];){
if({text:1,password:1}[a.type]){
a.readOnly=_2;
}else{
if(a.type!="hidden"&&a.type!="file"){
a.disabled=_2;
}
}
}
_3=el.getElementsByTagName("TEXTAREA");
for(var i=0,a;a=_3[i++];){
a.readOnly=_2;
}
_3=el.getElementsByTagName("BUTTON");
for(var i=0,a;a=_3[i++];){
a.disabled=_2;
}
_3=el.getElementsByTagName("SELECT");
for(var i=0,a;a=_3[i++];){
a.disabled=_2;
}
}});
}


;if(!dojo._hasResource["lconn.share.widget.Resizable"]){
dojo._hasResource["lconn.share.widget.Resizable"]=true;
dojo.provide("lconn.share.widget.Resizable");
dojo.declare("lconn.share.widget.Resizable",null,{constructor:function(){
this._defaultWidth=400;
this._width=this._defaultWidth;
this._defaultInnerWidths={};
this._innerWidths={};
},setDefaultWidth:function(_1){
if(_1&&_1>=0){
this._defaultWidth=_1;
}else{
console.error("Invalid value: "+_1);
}
},getDefaultWidth:function(){
return this._defaultWidth;
},getDefaultInnerWidth:function(_2){
for(var _3 in this._defaultInnerWidths){
if(_3===_2){
return this._defaultInnerWidths[_3];
}
}
return null;
},setDefaultInnerWidth:function(_4,_5){
if(!_4){
console.warn("Invalid name: "+_4);
return;
}
if(!_5||_5<0){
console.error("Invalid value for "+_4+": "+_5);
return;
}
var _6=true;
for(var _7 in this._defaultInnerWidths){
if(_7===_4){
this._defaultInnerWidths[_7]=_5;
_6=false;
break;
}
}
if(_6){
this._defaultInnerWidths[_4]=_5;
}
},getWidth:function(){
if(!this._width){
this._width=this._defaultWidth;
}
return this._width;
},getWidthInPx:function(){
return this.getWidth()+"px";
},getInnerWidth:function(_8){
for(var _9 in this._innerWidths){
if(_9===_8){
return this._innerWidths[_9];
}
}
return null;
},getInnerWidthInPx:function(_a){
var _b=this.getInnerWidth(_a);
return _b?_b+"px":_b;
},adjustWidths:function(_c){
if(!_c||_c<=0){
console.warn("Invalid new width for "+this.declaredClass+": "+_c);
return;
}
this._width=_c;
var _d=_c/this._defaultWidth;
for(var _e in this._defaultInnerWidths){
var _f=Math.round(this._defaultInnerWidths[_e]*_d);
if(_f<=0){
console.warn("New width for "+_e+"is too small:  "+_f);
_f=1;
}
this._innerWidths[_e]=_f;
}
}});
}

dojo.provide("lconn.files.nls.ui")._built=true;
dojo.provide("lconn.files.nls.ui.en_us");
lconn.files.nls.ui.en_us={"SIZE":{"B":"${0} B","MB":"${0} MB","KB":"${0} KB","GB":"${0} GB"},"APP":{"ERRORS":{"DEFAULT":{"MESSAGE":"Click the browser back button to return to the previous page and try again.  If this error persists, report the problem to your administrator.","TITLE":"We are unable to process your request"},"UNABLE_TO_LOGIN":{"ACT_OUT":"Log Out","TITLE":"Unable to log in","MESSAGES":"An error occurred when logging in to Files.  Please try again or contact your administrator.","ACCESS_DENIED_MESSAGE":"You do not have permission to access this page.  If someone sent you this link, check to see if you have the correct permission.","ACCESS_DENIED_TITLE":"Access Denied"},"INVALID_USER":{"ACT_OUT":"Log Out","TITLE":"Access to IBM Connections is restricted","MESSAGES":"You do not have permission to use IBM Connections.  If this is unexpected or incorrect, report the problem to your administrator.   "},"LOGIN":{"ACT":"Log In","TITLE":"Log In Now","MESSAGES":"Certain portions of Files can only be accessed when you are logged in.  You may browse anonymously, but this page will not be visible until you authenticate."},"DUPLICATE_USER":{"ACT_OUT":"Log Out","TITLE":"Your account has changed","MESSAGES":"You cannot access IBM Connections because your login information has changed. Contact your administrator about resolving this issue.   "}}},"MOVE_TO_TRASH":{"ACTION_TOOLTIP_X":"Put the selected files in the trash","ACTION_DISABLED":"Move to Trash button is disabled","ACTION":"Move to Trash","ACTION_ENABLED":"Move to Trash button is enabled","ACTION_TOOLTIP":"Put this file in the trash"},"DOWNLOAD_INFO":{"SHOW_PEOPLE":"See who has downloaded...","VERSION":{"MONTH":"Version ${0} on ${date}","TODAY":"Version ${0} at ${time}","YESTERDAY":"Version ${0} yesterday","DAY":"Version ${0} on ${date}","YEAR":"Version ${0} on ${date}"},"FILE":{"V_LATEST":"You have the latest version of this file","V_LATEST_NO_DOWNLOAD":"You have accessed the latest version of this file.","ERROR":"Unable to load download information","V_OLDER":"You last downloaded version ${0} of this file","LOADING":"Loading...","EMPTY":"Anonymous users only"},"PAGE":{"ERROR":"Unable to load file view information","LOADING":"Loading...","EMPTY":"Anonymous users only"}},"COPY_FILE":{"ALT_EDIT":"Remove","NAME_HEADER":"File name:","DIALOG_TITLE":"Give Copy to Community","WARN_INVALID_CHARS_IN_NAME":"File names may not contain the following characters: \\ / : * ? \" \x3c \x3e |","WARN_LONG_TAGS":"The specified tags are too long.","COMMUNITY_HEADER":"Community:","WARN_FILE_EXISTS":"A file with that name already exists.","ERROR_QUOTA_VIOLATION":"The file could not be copied because of space restrictions.  To copy this file, ${0} of files or versions would have to be removed.","WARN_NO_FILENAME":"File name is a required field.","TRIM_LONG_FILENAME":"Shorten file name?","WARN_LONG_TAG":"The tag \'${0}\' is too long.","INFO_SUCCESS":"Successfully copied ${link} to community ${community_link}.","TRIM_TAGS":"Shorten tags?","NAME_LABEL_TITLE":"File name","ACTION_TOOLTIP":"Give a copy of this file to a community","OK":"Copy","TRIM_TAG":"Shorten tag?","COMMUNITY_LABEL":"Community:","ERROR_NOT_LOGGED_IN":"The file could not be copied because you were not logged in.  Click \'Copy\' to add this file.","NAME_LABEL":"File name:","WARN_QUOTA_VIOLATION":"The file is larger than the available space. The copy will fail unless ${0} of files or versions are removed.","ACTION_LONG":"Give Copy to Community...","FILE_ALREADY_EXISTS":"A file with the same name already exists. Please choose a different file name.","ERROR":"The file could not be copied.  Please try again later.","FILE_DOES_NOT_EXIST":"This file does not exist. ","ERROR_TIMEOUT":"The file could not be copied because the server could not be contacted.  Click \'Copy\' to try again.","REQUIRED_MARK":"* Required","WARN_NO_COMMUNITY_SELETED":"Type a community name, and then click the community to copy the file to. ","TAGS_LABEL":"Tags:","ERROR_DETAILS_LINK":"Details...","INFO_SUCCESS_PRE_MODERATION":"The file ${name} has been copied to community ${community_link} for review and will be available when approved.","ERROR_DETAILS_TOOLTIP":"Show more details about this error","FIX_INVALID_CHARS_IN_NAME":"Replace invalid characters with \'_\'?","WARN_LONG_FILENAME":"The name is too long.","ERROR_CANCEL":"The file could not be copied because the request was cancelled.  Click \'Copy\' to try again.","TAGS_HEADER":"Tags:","ERROR_FILENAME_INVALID_CHARACTERS":"The file name may not contain the characters: % & \\ \"","ACTION":"Give Copy to Community","ERROR_MAX_CONTENT_SIZE":"The file could not be copied because it is larger than the maximum allowed file size of ${0}","CANCEL":"Cancel","REQUIRED_FIELD":"Required field","ERROR_ACCESS_DENIED":"You do not have permission to edit this file."},"ZIP_DOWNLOAD":{"DIALOG_TITLE":"Download as Compressed File","GLOBAL":"Global (default)","ACTION_DISABLED":"Download button is disabled","QUESTION":"Please select the language your file names will display in when they are downloaded as a compressed file:","ACTION_TOOLTIP_1":"Download the selected file","REMEMBER":"Use this setting for all future compressed downloads","NOTE":"Change this setting only if you are experiencing problems viewing the file names. The language you select will be applied to all file names in the compressed file.","ACTION_TOOLTIP_X":"Download the selected files as a compressed file","ACTION":"Download","FILES":{"T":"Download all of the files in the current view as a compressed file","L":"Download All Files"},"ACTION_ENABLED":"Download button is enabled","BUSY":"Downloading...","CANCEL":"Cancel","OK":"Download","SHARED_FILES":{"T":"Download shared files as a compressed file","L":"Download shared files"},"COLLECTION":{"T":"Download all files in this folder as a compressed file","L":"Download This Folder"}},"A11Y_MANAGER_ADDED":"Selected ${0} as an owner","EXTERNAL_WARNING":"External","INVITE_SHARE":{"PARTIAL":"Some invitations were sent and content was shared, but one or more errors occured and the content was not shared with all guests.","SUCCESS":"Guest invitations were sent and content was shared.","NOUSERS":"No emails were selected to invite and share with.","NOTFOUND_SINGLE":"The file was deleted and could not be shared.","NOTFOUND_MULTI":"${0} files were deleted and could not be shared.","FAILURE":"One or more errors occured inviting guests and sharing content with them.","NOITEMS":"Invitations were sent, but no items were selected to be shared."},"FILEPICKER":{"PUBLIC_FILES":{"TEXT":"${company} Files"},"BREADCRUMB":{"ROOT":{"FOLDERS_SHARED_WITH_ME":"Folders Shared With Me","MY_FOLDERS":"My Folders"},"PREFIX":{"ADD_TO":"Add to:","MOVE_TO":"Move to:"}},"COMPACT":{"UPLOAD":"Upload","RADIO_LABEL_1":"Select where you want to pick the file from.","INSERT_LINKS":{"SAVE":"Insert Links"},"SHARE_AS_EDITOR_COMMUNITY":"Allow community members to edit the selected files","MY_FILES":{"ALT_X":"Select files from your My Files view.","NAME":"My Files","ALT_1":"Select file from your My Files view.","HEADER":{"DESCRIPTION":"Insert links to files and share with members."}},"NESTED_FOLDER":{"MY_FILES":{"ALT_X":"Select files from your My Files view.","NAME":"Files","ALT_1":"Select file from your My Files view.","HEADER":{"DESCRIPTION":"Insert links to files and share with members."}}},"THIS_COMMUNITY":{"ALT_X":"Select files from this community.","NAME":"This Community","ALT_1":"Select file from this community.","HEADER":{"DESCRIPTION":"Insert link to files."}},"RADIO_LABEL_X":"Select where you want to pick the files from.","ADD_TO_COMMUNITY_FOLDER":{"HEADER":{"DESCRIPTION":"Select the files you want to add to the ${0}. Files that are currently in another community folder will be moved to the ${1}."}},"WARNING":{"PUBLIC":"Files shared with this community will become public."},"HEADER":{"DESCRIPTION_LABEL":"Choose files from: "},"MY_COMPUTER":{"ALT_X":"Select files from your computer.","NAME":"My Computer","ALT_1":"Select file from your computer.","HEADER":{"DESCRIPTION":{"FILES":"Upload selected files to My Files and insert links to them.","COMMUNITY":"Upload selected files to this community and insert links to them."}}}},"MY_FILES":{"EMPTY_PUBLIC":"You have not uploaded any files that are shared with everyone in your organization.","EMPTY_EXTERNAL":"You have not uploaded any files that can be shared outside of your organization.","TEXT":"My Files","EMPTY":"You have not uploaded any files."},"SEARCH_SCOPED":"Filter this list...","NEXT_T":"Next page","SELECTED_0":"No files selected","PREVIOUS_T":"Previous page","SELECTED_1":"1 file selected","PINNED_COLLECTIONS":{"ERROR":"An error has occurred","TEXT":"Pinned Folders","EMPTY":"None available"},"PAGE":"Page","PAGING_BOTTOM_LABEL":"Paging options","EXTERNAL_ALT":"Shared externally","ERROR_NEVER_LOGGED_IN":"This person has never logged in to Files.","LIBRARY":{"EXPIRED":"This library is not available because you do not have access or you must log in to view content."},"SHARED_COLLECTIONS":{"ERROR":"An error has occurred","EMPTY":"None available","TEXT":"Folders Shared With Me"},"WARN_PUBLIC_X":"Files shared with this community will become public.","LOADING":"Loading...","COLLECTION":{"EMPTY_PUBLIC":"No files were found.","EMPTY":"No files were found."},"UNSELECTABLE_SHAREABLE_ONLY":"You are not able to share this file.","COUNT2":"Showing ${0}-${1}","NO_FOLDERS":"No folders here!","SEARCH":"Filter","POSITION":"You are in: ","EMPTY":"None available","SEARCH_ALL_LINK":"Filter all files.","UNSELECTABLE":"This file cannot be selected.","PINNED_FILES":{"EMPTY_PUBLIC":"You have not pinned any files that is shared with everyone in your organization.","EMPTY":"You have not pinned any files.","TEXT":"Pinned Files"},"ERROR_CANCEL":"The request was cancelled.","UNSELECTABLE_PUBLIC_ONLY":"This file is not shared with everyone in your organization.","SELECTED_X":"${0} files selected","COUNT_ALT":"Showing files ${0} through ${1} of ${2}","UNSHAREABLE_FILE":"Only the file owner can add this file to a folder.","ERROR_UNAUTHENTICATED":"You must log in again.","OTHER_FILES":{"NO_RESULTS":"No results found for \'${0}\'","EMPTY_PUBLIC":"This person has not uploaded any files.","DESCRIPTION":"To view another person\'s files, type a name in the search field above.","EMPTY":"This person has not shared any files with you.","TEXT":"Other People\'s Files","SEARCH_HINT":"Name or email..."},"EXTERNAL":"Shared externally","ELLIPSIS":"...","SEARCH_EMPTY":"No results were found.","PAGING_TOP_LABEL":"Paging","PAGE_ALT":"Page ${0} of ${1}","COMMUNITY_FILES":{"TOOLTIP":"Files in this community","EMPTY2":"There are no files for this view.","LIBRARY":{"EMPTY":"There are no files for this library."},"EMPTY":"There are no files for this community.","TEXT":"Community Files"},"MY_COLLECTIONS":{"ERROR":"An error has occurred","EMPTY":"None available","TEXT":"My Folders"},"DIALOG_TITLE_DEFAULT":"Select Files","UNSELECTABLE_NOT_EXTERNAL":"This file cannot be shared with people outside of your organization.","ERROR":"An error has occurred.","SEARCH_ALL":"Filter all files...","ERROR_TIMEOUT":"The server could not be contacted.","COUNT":"${0}-${1} of ${2}","SEARCH_CANCEL":"Clear filter","NEXT":"Next","RECENT_FILES":{"RECENTLY_UPLOADED":"Your Recent Uploads","RECENTLY_SHARED":"Recently Shared With Me","TEXT":"Recent Files","VIEW_MORE":"View More"},"WARN_PUBLIC_1":"File shared with this community will become public.","PREVIOUS":"Previous","SHARED_FILES":{"EMPTY_PUBLIC":"No file that is shared with everyone in your organization have been shared with you.","EMPTY":"No files have been shared with you.","TEXT":"Shared With Me"}},"APP_NAME_TITLE_BAR_LABEL":"Navigate to home page of Files app","LEGEND":"* Required","JAVASCRIPT_DISABLED":{"0":"JavaScript has been disabled in your web browser. Files requires JavaScript in order to function. Once you have enabled Javascript in your browser, refresh the page.","1":"Refresh the page to continue."},"ABOUT_FILE":{"ADDED":"Created: ","TIMES_DOWNLOADED":"Downloads: ","SIZE":"Size: ","TIMES_RECOMMENDED":"Likes: ","TOTAL_SIZE_HINT":"${0} (${1} including all versions)","DOWNLOADS":"${0} (${1} anonymously)","NO_DOWNLOADS":"None","DOWNLOADED_BY":"Downloaded by: ","PREVIEW_LINK":"Link to preview image:","DOWNLOADED_LINK":"Link to this file:","SECURITY_LABEL":"Security:","ENCRYPT_FILE":"File content is encrypted. Encrypted file content is not searchable. File content cannot be viewed and cannot be edited with IBM Docs.","TIMESTAMP":{"MONTH":"${EEEE}, ${date} by ${user}","TODAY":"${EEEE}, Today at ${time} by ${user}","YESTERDAY":"${EEEE}, Yesterday at ${time} by ${user}","DAY":"${EEEE}, ${date} by ${user}","YEAR":"${EEEE}, ${date_long} by ${user}","FULL":"${EEEE}, ${date_long} ${time_long} by ${user}"},"TITLE":"About this File","CONTENTS":"File contents updated:","LINK":"More information","UPDATED":"Any update: ","DESCRIPTION":"Description:","NO_DESCRIPTION":"There is no description for this file."},"LOCK_FILE":{"ERROR_CANCEL":"The file could not be locked because the request was cancelled. Please try again.","STATUS":"Locking...","INFO_SUCCESS":"The file is now locked.","ACTION":"Lock File","ERROR":"The file could not be locked. Please try again later.","ERROR_ALREADY_LOCKED":"This file was already locked.","ACTION_TOOLTIP":"Lock this file","ERROR_TIMEOUT":"The file could not be locked because the server could not be contacted. Please try again.","ERROR_ALREADY_LOCKED_BY_USER":"This file was already locked by ${user} on ${date_long} ${time_long}.","ERROR_ACCESS_DENIED":"You do not have access to lock this file.","ERROR_NOT_LOGGED_IN":"The file could not be locked because you were not logged in. Please log in and try again.","ERROR_NOT_FOUND":"The file could not be locked because it has been deleted or is no longer shared with you."},"ADD_ITEM":{"ACTION":"Add","ACTION_TOOLTIP":"Create a new file or folder or share one with this community","COLLECTION_ACTION_TOOLTIP":"Create a file or folder in this folder","DISABLED_ACTION_TOOLTIP":"You don\'t have permission to create content in this folder"},"MAKE_PRIVATE":{"ACTION":"Remove public access","ACTION_TOOLTIP":"Remove your organization\'s access"},"A11Y_EDITOR_ADDED":"Selected ${0} as an editor","ADD_TAGS":{"ACTION_TOOLTIP_X":"Add tags to the selected files","ACTION_DISABLED":"Add Tags button is disabled","ACTION":"Add Tags","ACTION_ENABLED":"Add Tags button is enabled","ACTION_TOOLTIP":"Add tags to this file"},"SESSION_TIMEOUT_CUSTOM":"Your SmartCloud session has timed out. Click OK to log back in or Cancel to close this dialog. \n\nNote: If you click OK, unsaved changes you have made will be lost.","TAGLIST":{"ALL":"all","ERROR":"Error loading tags","NEXT_T":"Next page","ERROR_REQUEST_CANCELLED":"Tags could not be loaded because the request was cancelled.","VIEW_AS":"View as","PREVIOUS_T":"Previous page","POPUPTITLE":"All Tags","EMPTY":"No tags found","CLOUD_TITLE":"View a tag cloud of the most popular tags.","NEXT":"Next","PAGING_BOTTOM_LABEL":"Paging options","CLOUD":"cloud","SHOW_MORE":"Show less popular tags","PREVIOUS":"Previous","PAGING_TOP_LABEL":"Paging","NO_TAGS":"No tags found","LIST_TITLE":"View a list of the most popular tags.","ALL_TITLE":"View all tags.","ERROR_REQUEST_TIMEOUT":"Tags could not be loaded because the server could not be contacted.","LOADING":"Loading...","LIST":"list"},"DRAG_DROP":{"TITLE":"Drop files anywhere to upload","DESCRIPTION":"Drag and drop files from your desktop directly into the browser to upload to Files"},"LOADING":"Loading...","SHARE_COLLECTION":{"ACTION_LONG":"Share...","ACTION":"Share","ACTION_TOOLTIP":"Give others access to this folder"},"APP_LOAD_BLURB":"Please wait while the application loads...","ABOUT_PAGE":{"TIMESTAMP":"${EEEE}, ${date_long} ${time_long} by ${user}"},"PREVIEWFILE":{"ACTION":"Preview","ACTION_TOOLTIP":"Files Preview Page","NAME":"Preview"},"ERROR_COLON":"Error:","CONTINUE_LOGIN_TITLE":"You have logged in","MOVE_FILE":{"DIALOG_TITLE":"Move to...","WARN_PUBLIC":"Adding the selected file to this folder will make the file public (shared with everyone).","CROSS_COMMUNITY_MOVE_NOT_ALLOWED":"The file cannot be moved the a folder in another community.","INFO_SUCCESS_1":"The file was moved to ${target}.","CANNOT_MOVE_PERSONALFILE_TO_COMMUNITYFOLDER":"You cannot move a personal file into a community folder.","ACTION_LONG":"Move to...","COLLECTION_TYPE_MISSMATCH":"It is not allowed to move personal file to community owned folder or move community owned file to personal folder.","SOURCE_PARENT_NOT_FOUND":"The folder that contains the file you want to move does not exist any more.","CANNOT_MOVE_COMMUNITYFILE_TO_PERSONALFOLDER":"You cannot move a community file into a personal folder.","ERROR":"The file was not moved to ${target} due to an error.","ITEM_NOT_FOUND_IN_SOURCE_PARENT":"The selected file does not exist in the source folder any more.","ITEM_NOT_FOUND":"The selected file does not exist any more.","INFO":"Moving the file will cause other people to lose access to the file.","TARGET_PARENT_NOT_FOUND":"The target folder you want to move to does not exist any more.","EXTERNAL_COLLECTION":"The file was not moved into this folder because the folder can be shared outside of your organization and the file cannot.","ACTION":"Move to","ACCESS_DENIED":"You do not have permission to move file to the selected folder.","BUSY":"Moving...","ACTION_TOOLTIP":"Move this file","CANCEL":"Cancel","OK_MOVE_HERE":"Move Here","SOURCE_NOT_MOVEABLE":"The selected file cannot be moved.","OK":"Move","WARNING":"${item} is in the ${collection} folder. Some people will lose access to this file if you remove it."},"DELETE_SHARE":{"ACTION":"Remove share","ACTION_TOOLTIP_PERSON":"Remove all shares with ${0}","ACTION_TOOLTIP":"Remove all shares with this person"},"STOP_RESHARING":{"ACTION":"Remove my previous shares...","ACTION_TOOLTIP":"Remove shares you have previously made"},"SHARE_INFO":{"PROPAGATE_TITLE":"Disabling this option will prevent others from sharing this file or adding it to a private folder.","ERROR":"Unable to load share information","SHOW_INVOLVED":"Show more details...","SHOW_GRAPH":"See Who Has Shared...","PAGE":{"DOWNLOADED_CURRENT":"${0} has viewed the most recent version of this file.","DOWNLOADED_NEVER":"${0} has not yet viewed this file.","DOWNLOADED_OLDER":"${0} has viewed an older version of this file."},"PROPAGATE_SUCCESS_ON":"Other people can now share this file","NO_SHARES":"No shares on this file","PROPAGATE_ERROR":"The sharing for this file could not be changed due to an error.  Please try again later.","PROPAGATE_OTHER":"Only the owner can share this file","FILE":{"DOWNLOADED_CURRENT":"${0} has downloaded the most recent version of this file.","DOWNLOADED_NEVER":"${0} has not yet downloaded this file.","DOWNLOADED_OLDER_ALT":"An older version","DOWNLOADED_CURRENT_ALT":"Most recent version","DOWNLOADED_OLDER":"${0} has downloaded an older version of this file.","DOWNLOADED_NEVER_ALT":"Never downloaded"},"LOADING":"Loading...","PROPAGATE_SUCCESS_OFF":"Only the owner can share this file","PROPAGATE_LABEL":"Allow others to share this file","SHOW_ALL":"Hide details"},"WARNING_ACCESS_MESSAGE":"You do not have permission to access this page. If someone sent you this link, check to see if you have the correct permission.","ORGNAME_DEFAULT":"My organization","USERSEARCH":{"SEARCH_USERS_BUTTON":"Search","PERSON_SOURCE":"a Person","GROUP_HINT_TEXT":"Group name...","USER_EMAIL":"Email","INACTIVE":"(inactive)","ERROR_LINK":"Search for People","TITLE_BLURB":"Need to find someone\'s files?  Enter their name or email address in the search field, below.  As you type, we\'ll show you a list of possible matches. If you can\'t find the person you are searching for in the list, just click the Search button to see a list of all the possible matches in the directory.","INVITATION_TIP":"Entry must be an email address","NO_MATCHES":"No matches","SEARCH_DIRECTORY":"Person not listed? Use full search...","NO_RESULTS":"No results for \'${0}\'","TITLE":"Search Results","INVITATION":"Share using email address","QUERY_TOO_SHORT":"Enter a longer search query to view results","PERSON_HINT_TEXT":"Person name or email...","GROUP_SOURCE":"a Group","LOADING":"Loading...","USER_NAME":"Name"},"MENUBAR":{"HELP":"Help","HELP_TITLE":"Help"},"A11Y_CONTRIBUTOR_ADDED":"Selected ${0} as a contributor","A11Y_EDITOR_REMOVED":"Removed ${0} as an editor","ADD_FILES_TO_FILESYNC":{"ERROR_X":"${count} files were not added to Sync due to errors.","DIALOG_TITLE":"Add Files","INFO_SUCCESS_1":"Sync is enabled for ${item}. Large files might take a few moments before appearing on your computer.","ACTION_X":"Add to Sync","ERROR_1_NOT_LOGGED_IN":"${item} was not added to Sync because you were not logged in. Please log in and try again.","INFO_SUCCESS":"${0} was added to Sync.","OK_TITLE":"Add the selected files to Sync","ACTION_TOOLTIP":"Add to Sync","ERROR_1":"${item} was not added to Sync due to an error.","ERROR_1_TIMEOUT":"${item} was not added to Sync because the server could not be contacted.","OK":"Add Files","ERROR_1_EXISTS":"Cannot add ${item} because Sync already includes a different file with that name.","ACTION_LONG":"Add Files...","INFO_SUCCESS_X":"${count} files were added to Sync.","ERROR_1_ACCESS_DENIED":"${item} was not added to Sync because you do not have permission to add this file.","ACTION_ENABLED_X":"Add Files button is enabled","ERROR_1_NOT_FOUND":"${item} already has been added to Sync.","STATUS":"Adding...","ACTION_TOOLTIP_X":"Add ${0} files to Sync","ACTION":"Add Files","ERROR_X_CANCEL":"Some files might not have been added to Sync because the request was cancelled. ","BUSY":"Adding...","CANCEL":"Cancel","ACTION_DISABLED_X":"Add Files button is disabled","ERROR_1_CANCEL":"${item} cannot be added to Sync because the request was cancelled."},"DELETE_ATTACHMENT":{"ACTION":"Delete","ACTION_TOOLTIP":"Delete this attachment"},"TIPS":{"P1":"You can collaborate with colleagues by sharing files with them. To share a file, click the file name in any list and then click Share. ","OLDER":"Older","HIDE_TIPS":"Hide Tips","ERROR":"Unable to load help","H":"Share important content with your colleagues","NEWER":"Newer"},"ALERT":{"DIALOG_TITLE":"Alert","BUSY":"Busy...","OK":"OK"},"ADD_FILES_TO_COLLECTION":{"ACTION_LONG":"Add Files...","ACTION":"Add Files","ACTION_TOOLTIP":"Add files to this folder"},"STOP_SHARING_FILE":{"ACTION":"Stop Sharing this File","ACTION_TOOLTIP":"Remove all shares for this file and remove from all shared folders or folders that are visible to everyone in your organization"},"INVITE_DIALOG":{"DIALOG_TITLE":"Content Was Not Shared","MESSAGE_0":"The following users do not have an account and no content was shared with them.","MESSAGE_1":"Invite these users as guests to share the content with them.","BUSY":"Please wait...","CANCEL":"Cancel","OK":"Proceed with invitations"},"JAVASCRIPT_DISABLED_REGION":"Warning messages for JavaScript have been disabled in your web browser.","REPLACE_FILE":{"ACTION_LONG":"Upload New Version...","ACTION":"Upload New Version","ACTION_TOOLTIP":"Update the contents of this file"},"EXTERNAL_WARNING_COLON":"External:","SCENE_TITLE_FOLDER":"Folder: ${0}","WINDOWTITLE":{"WELCOME":"Welcome to Files","OFFLINE":"Offline","STATISTICS":"Files Metrics","PAGESHOME":"${0}","OFFLINEERROR":"Error","NORMAL":"${0} - ${1}","FINDPEOPLE":"Search Results","LOGIN":"Log in","COLLECTIONERROR":"Error","FILEERROR":"Error","ABOUT":"About Files","FOLDER":"${0} - Folder","WHATSNEW":"Recent Updates","COLLECTIONS":"Folders","FAQ":"Help","USERCHANNEL":"${0}","PAGEERROR":"Error","DOCUMENTHOME":"${0}","TOOLS":"Tools","FILE":"${0} - File","USERHOMEERROR":"Error"},"SCENE_TITLE_TOOLTIP":"Click to refresh the page ","LOGIN":{"ACTION":"Log In and Start Sharing!","ACTION_TOOLTIP":"Log in to upload and share files, comment, and create folders."},"INVITE_GUEST_NO_INVITE":"You cannot share with others as a guest. The following people were not shared with: ${0}","BACK_TO_PARENT_COLLECTIONS":"Back to parent folders: ${0}","BACK_TO_MY_COLLECTIONS":"Back to my folders","EDIT_FILESYNC_PREFERENCE":{"DIALOG_TITLE":"Preferences","PIN_FILE":"When I pin a file","ERROR_1_NOT_LOGGED_IN":"The preferences were not saved because you were not logged in. Please log in and try again.","INFO_SUCCESS":"The preferences were saved successfully.","OK_TITLE":"Enable Sync automatically.","ACTION":"Edit Preferences","CANCEL":"Cancel","ERROR_1":"The preferences were not saved due to an error.","ADD_FILE":"When I add a file to My Files","ACTION_TOOLTIP":"Edit Preferences to enable or disable adding files to Sync automatically.","OK":"OK","ERROR_1_TIMEOUT":"The preferences were not saved because the server could not be contacted.","ADD_TO_FILE_SYNC_AUTOMATICALLY":"Add to Sync automatically:"},"VIEWS":{"DETAILS":"List","DETAILS_TOOLTIP":"Include the description and social metadata for each file","SUMMARY":"Customizable","GRID":"Grid View","SUMMARY_TOOLTIP":"Fully customizable display of information about each file","CUSTOMIZE_SUMMARY":"Customize","GRID_TOOLTIP":"Show thumbnails in a grid format.","CUSTOMIZE_SUMMARY_TOOLTIP":"Change the columns displayed below"},"COLLECTION_PICKER":{"BREADCRUMB":{"PREFIX":{"ADD_TO":"Add to:","MOVE_TO":"Move to:"},"ROOT":{"MY_FOLDERS":"My Folders","SHARED_WITH_ME":"Shared With Me","PINNED":"Pinned","RECENT":"Recent"}},"COMPACT":{"RADIO_LABEL_WITH_CREATE_FOLDER_X":"Create a new folder, or select where you want to pick the folders from.","CREATE_FOLDER":{"NAME":"Create Folder"},"MY_FOLDERS":{"NAME":"Share from Files"},"RADIO_LABEL_1":"Select where you want to pick the folder from.","INSERT_LINKS":"Insert Links","COMMUNITY_FOLDER":{"NO_ITEM_MSG":"There are no folders for this view.","TOOLTIP":"Folders in this community","TITLE":"Community Folders","NAME":"This Community","DESCRIPTION":"Community-owned items can only be added/moved to community-owned folders."},"RADIO_LABEL_X":"Select where you want to pick the folders from.","RADIO_LABEL_WITH_CREATE_FOLDER_1":"Create a new folder, or select where you want to pick the folder from.","HEADER":{"DESCRIPTION_LABEL":"Choose folders from:"}},"RECENTLY_UPDATED":{"TEXT":"Recently Updated Folders","EMPTY":{"READER":{"PRIVATE":"There are no private folders available.","PUBLIC":"There are no available folders visible to everyone in your organization.","ANY":"There are no folders available."},"CONTRIBUTOR":{"PRIVATE":"There are no private folders you can add files to.","PUBLIC":"There are no folders you can add files to that are shared with you.","ANY":"There are no folders you can add files to."},"MANAGER":{"PRIVATE":"There are no private folders you own.","PUBLIC":"There are no folders you own that are visible to everyone in your organization.","ANY":"There are no folders you own."}}},"SEARCH_SCOPED":"Filter these folders...","NEXT_T":"Next page","UNSELECTABLE_NOT_EDITOR":"You are not an editor of this folder.","PREVIOUS_T":"Previous page","SELECTED_0":"No folders selected","SELECTED_1":"1 folder selected","PAGE":"Page","RECENT_COLLECTIONS":{"TOOLTIP":"Created ${0} by ${1}"},"PAGING_BOTTOM_LABEL":"Paging options","EXTERNAL_ALT":"Shared externally","UNSELECTABLE_PRIVATE_ONLY":"This folder cannot be selected because it is not shared with you.","ERROR_NEVER_LOGGED_IN":"This person has never logged in to Files.","ALL_FILES":"All Community Files","SHARED_COLLECTIONS":{"TEXT_TREE_RENDERER":"Shared with Me","TEXT":"Folders Shared With Me","EMPTY":{"READER":{"PRIVATE":"No private folders have been shared with you yet.","PUBLIC":"No folders have been shared with you yet.","ANY":"No folders have been shared with you yet."},"CONTRIBUTOR":{"PRIVATE":{"ADD":"There are no private folders shared with you that you can add files to.","MOVE":"There are no private folders shared with you that you can move files or folders to."},"PUBLIC":"There are no folders that have been shared with you that you can add files to.","ANY":{"ADD":"There are no folders shared with you that you can add files to.","MOVE":"There are no folders shared with you that you can move files or folders to."}},"MANAGER":{"PRIVATE":"No private folders have been shared with you as an owner.","PUBLIC":"No folders have been shared with you as an owner.","ANY":"No folders have been shared with you as an owner."}}},"LOADING":"Loading...","PUBLIC_COLLECTIONS":{"TEXT":"${company} Folders","EMPTY":{"READER":"There are no folders visible to everyone in your organization.","CONTRIBUTOR":"There are no folders visible to everyone in your organization that you can add files to.","MANAGER":"There are no folders visible to everyone in your organization that you own."}},"UNSELECTABLE_NOT_CONTRIBUTOR":"You are not a contributor for this folder.","NO_FOLDERS":"No folders here!","SEARCH":"Filter","EMPTY":"None available","UNSELECTABLE":"This folder cannot be selected.","SEARCH_ALL_LINK":"Filter all folders.","ERROR_CANCEL":"The request was cancelled.","UNSELECTABLE_PUBLIC_ONLY":"This folder cannot be selected because it is not shared with you.","SELECTED_X":"${0} folders selected","COUNT_ALT":"Showing folders ${0} through ${1} of ${2}","ERROR_UNAUTHENTICATED":"You must log in again.","RECENT_FOLDERS":{"TEXT_TREE_RENDERER":"Recent","TEXT":"Recent Folders","VIEW_MORE":"View More"},"EXTERNAL":"Shared externally","ELLIPSIS":"...","FAVORITE_COLLECTIONS":{"TEXT_TREE_RENDERER":"Pinned","TOOLTIP":"Created ${0} by ${1}","TEXT":"Pinned Folders","EMPTY":{"READER":{"PRIVATE":"You have not pinned any private folders yet.","PUBLIC":"You have not pinned any folders visible to everyone in your organization yet.","ANY":"You have not pinned any folders yet."},"CONTRIBUTOR":{"PRIVATE":{"MOVE":"You do not have any private pinned folders you can move files or folders to.","ADD":"You do not have any private pinned folders you can add files to."},"PUBLIC":"You do not have any pinned folders visible to everyone in your organization you can add files to.","ANY":{"ADD":"You do not have any pinned folders you can add files to. ","MOVE":"You do not have any pinned folders you can move files or folders to. "}},"MANAGER":{"PRIVATE":"You do not have any private pinned folders you own.","PUBLIC":"You do not have any pinned folders visible to everyone in your organization you own.","ANY":"You do not have any pinned folders you own. "}}},"SEARCH_EMPTY":"No results were found.","PAGING_TOP_LABEL":"Paging","UNSELECTABLE_NOT_INTERNAL":"This folder cannot be selected because it can be shared outside of your organization.","PAGE_ALT":"Page ${0} of ${1}","RECENTLY_CONTRIBUTED":{"TEXT":"Folders I Recently Added To","EMPTY":{"READER":{"PRIVATE":"You have not added files to any private folders yet.","PUBLIC":"You have not added files to any folders that are shared with everyone in your organization.","ANY":"You have not added files to any folders yet."},"CONTRIBUTOR":{"PRIVATE":"You have not added files to any private folders yet.","PUBLIC":"You have not added files to any folders that are shared with everyone in your organization.","ANY":"You have not added files to any folders yet."},"MANAGER":{"PRIVATE":"You have not added files to any private folders you own yet.","PUBLIC":"You have not added files to any folders that are shared with everyone in your organization.","ANY":"You have not added files to any folders you own yet."}}},"MY_COLLECTIONS":{"TEXT":"My Folders","EMPTY":{"PRIVATE":"You have not created any private folders yet.","PUBLIC":"You have not created any folders that are visible to everyone in your organization yet.","EXTERNAL":"You do not have any folders that can be shared outside of your organization.","ANY":"You have not created any folders yet."}},"DIALOG_TITLE_DEFAULT":"Select Folders","UNSELECTABLE_NOT_EXTERNAL":"This folder cannot be shared with people outside of your organization.","ERROR":"An error has occurred.","SEARCH_ALL":"Filter all folders...","ERROR_TIMEOUT":"The server could not be contacted.","COUNT":"${0}-${1} of ${2}","UNSELECTABLE_NOT_MANAGER":"This folder cannot be selected because you do not own it.","SEARCH_CANCEL":"Clear filter","NEXT":"Next","PREVIOUS":"Previous","COMMUNITY_COLLECTIONS":{"COLLECTION_LONG_X":"${possessive}\' Folders","DESCRIPTION":"To view a community\'s folders, type a name in the search field above.","TEXT":"A Community\'s Folders","COLLECTION_LONG":"${possessive}\'s Folders","EMPTY":{"ANY":"You cannot add files to this community because either you do not have editor access to it or no folders exist in this community to add a file to."},"SEARCH_HINT":"Community name..."}},"WHATS_NEW":{"DATE":"${EEee}, ${MMMM} ${d}"},"NOTIFY_COLLECTION":{"UNSUBSCRIBE":{"ALL":"You have stopped following this folder."},"ERROR":"Your following settings on this folder were not changed due to an error.  Please try again.","SUBSCRIBE":{"ALL":"You are now following this folder."}},"A11Y_CONTRIBUTOR_REMOVED":"Removed ${0} as a contributor","COLUMN":{"CUSTOMIZE":{"FILE":{"G_FILEINFO":"File Properties","DEFAULTS":"Show Default Columns","G_INFO":"Number Of","G_PEOPLE":"People","G_OTHER":"Other","TITLE":"Customize File Columns","CANCEL":"Cancel","DESCRIPTION":"Select columns to display in lists of files.","OK":"Show","EMPTY":"No columns are available for this view.","G_DATES":"Dates"}},"FILE":{"PEOPLESHARED_L":"People the file is shared with","SIZE":"Size","PEOPLESHARED_M":"People shared with","ENCRYPTION":"Encrypted","VERSION_L":"The current version number","DELETED_L":"Date the file was deleted","VERSION_M":"Current version number","RECOMMENDATIONS_L":"Number of likes","NAME":"Name","COLLECTEDBY_L":"Person that added the file to the folder","COLLECTEDBY_M":"Added by","SIZE_L":"Size of the file contents","SIZE_M":"Size of current version","DELETEDBY":"Deleted By","ENCRYPTION_L":"Encryption status","ENCRYPTION_M":"Encryption","NAME_L":"The name of this file","TAGS":"Tags","COLLECTIONSSHARED":"Folders","VERSIONS":"Versions","TOTALSIZE":"Total Size","TAGS_L":"Tags","VERSIONS_L":"Number of saved versions","COLLECTED":"Added","DESCRIPTION_L":"Description","SHAREDWITH":"Shared With","LOCK":"Locked","ADDED_L":"Date the file was uploaded","MODIFIEDBY_L":"Person that last updated the file contents","MODIFIEDBY_M":"Updated by","TOTALSIZE_L":"Size of file including versions","TOTALSIZE_M":"Total size of all versions","PEOPLESHARED":"People","PRIVACY_L":"Who can see this file","COLLECTED_L":"Date the file was added to the folder","ADDEDBY":"Created By","VERSION":"Version","LOCK_L":"Lock status","SHAREDWITH_M":"Shared with","LOCK_M":"Lock","RECOMMENDATIONS":"Likes","COMMUNITYSHARED_L":"Date the file was shared with the community","COLLECTEDBY":"Added By","COMMENTS_L":"Number of comments on this file","ADDEDBY_L":"Person that uploaded this file","COMMUNITYSHAREDBY":"Shared By","SYSTEMMODIFIED_L":"Date when comments, shares, versions, tags, or contents changed.","ADDEDBY_M":"Created by","SYSTEMMODIFIED_M":"Any update","MODIFIED":"Updated","SHAREDBY_M":"Shared by","DOWNLOADS":"Views","COMMUNITYSHAREDBY_L":"Person that shared the file with the community","COMMUNITYSHAREDBY_M":"Shared by","MODIFIED_L":"Date the file contents were last updated","DOWNLOADS_L":"Number of file downloads and views","DESCRIPTION":"Description","DELETEDBY_L":"Person that deleted this file","DELETEDBY_M":"Deleted by","MODIFIEDBY":"Updated By","ADDED":"Created","SHARED":"Shared","COLLECTIONSSHARED_L":"Folders the file is in","PRIVACY":"Sharing","COMMUNITYSHARED":"Shared","SHARED_L":"Date the file was last shared ","COMMENTS":"Comments","SYSTEMMODIFIED":"Any Update","DELETED":"Deleted","SHAREDBY":"Shared By"},"COLLECTION":{"ADDED":"Created","ADDEDBY_L":"Person that created this folder","PRIVACY":"Sharing","UPDATED_L":"Date when a folder was last updated","NAME":"Name","ADDED_L":"Date the folder was created","COUNT":"Files","OWNER":"Owner","PRIVACY_L":"Who can see this folder","ADDEDBY":"Created By","NAME_L":"The name of this folder","UPDATED":"Updated","COUNT_L":"Number of files in this folder"},"COMMENT":{"ADDED":"Date","ADDED_L":"Date the comment was created"}},"QUOTA":{"ALERT_WARN_TRASH":"You have only ${2} remaining out of ${1}. If you need more room, empty your trash to reclaim ${3} or delete old versions and unused files.","INFO_OWNER":"How much space am I using?","POPUP_PERSONAL":{"UNLIMITED":"Unlimited","LABEL_QUOTA_EXCEEDED":"You are using ${size} more than the ${total} limit.","ERROR":"Unable to retrieve total file size at this time.","LABEL_QUOTA":"You have ${size} of free space remaining (${total} limit).","LABEL_CURRENT":"Current size:","NEVER_LOGGED_IN":"Your files do not exist.  Contact your administrator.","LABEL_UNLIMITED":"You are using ${size}.","TITLE":"Space used by your files","LABEL_MAX":"Maximum allowed:","LOADING":"Loading...","LABEL_REMAINS":"Available:","SORT_BY_TOTAL":"Sort by total size","LABEL_ERROR":"Your free space could not be retrieved, please try again later."},"POPUP_COMMUNITY":{"LABEL_QUOTA_EXCEEDED":"This community is using ${size} more than the ${total} limit.","LABEL_UNLIMITED":"This community is using ${size}.","LOADING":"Loading...","LABEL_QUOTA":"This community has ${size} of free space remaining (${total} limit).","SEE_DELETED":"View Trash","LABEL_ERROR":"The community free space could not be retrieved, please try again later."},"ALERT_OVER":"You are over the maximum size for your files.  You have used ${0} of the allowed ${1}.","INFO_COMMUNITY":"How much space is this community using?","ALERT_WARN":"You have only ${2} remaining out of ${1}. If you need more room, delete old versions or unused files.","LOTUSLIVE":{"REMOVED_SIZE":"Trashed Size: ${0}","HELP":"Help","REMAINED_SIZE":"${0} of ${1} remaining","LIBRARY_SIZE":"Library Size: ${0}","TOTAL_USED_SIZE":"Total Used: ${0}","TITLE":"File Storage","CLOSE":"Close","TOTAL_AVAIL_SIZE":"Total Available: ${0}","MAX_SIZE":"Maximum: ${0}"},"POPUP":{"UNLIMITED":"Unlimited","LABEL_QUOTA_EXCEEDED":"${person} is using ${size} more than the ${total} limit.","ERROR":"Unable to retrieve total file size at this time.","SEE_DELETED":"See this person\'s trash","LABEL_QUOTA":"${person} has ${size} of free space remaining (${total} limit).","LABEL_CURRENT":"Current size:","NEVER_LOGGED_IN":"This person has never logged in.","LABEL_UNLIMITED":"${person} is using ${size}.","TITLE":"Space used for files","LABEL_MAX":"Maximum allowed:","LOADING":"Loading...","LABEL_REMAINS":"Available:","LABEL_ERROR":"The information about free space could not be retrieved.","SORT_BY_TOTAL":"Sort by total size"},"INFO_ADMIN":"How much space is this person using?"},"CONTINUE_LOGIN_MESSAGE":"You have successfully logged in to IBM Connections.","CONTENT":{"USER_HAS_NO_PLACE":{"MSG1":"${0} has not been given permission to upload or create files."},"ERROR_REQUEST_UNKNOWN":"An unknown error has occurred.","NEXT_T":"Next page","EDIT":"Edit","LOCKED":"Locked","PREVIOUS_T":"Previous page","BOOLEAN_YES":"Yes","ERROR_REQUEST_TIMEOUT":"The server could not be contacted.","LOADING":"Loading... ","SHARE_INTENT":"Shared externally","FILE_TYPE":"File Type","REMOVE_DISCRIPTION":"Click to remove","TAG_TOOLTIP":"Filter by tag \'${0}\'","SEARCH_FILES_COMMUNITY_FILES":"Community Files","COUNT2":"Showing ${0}-${1}","SORTING_ASC_LONG":"Click to sort by ascending order according to ${0}","EMPTY":{"SEARCH_FILES":{"FILTERED_TAGS":"No search results found because no files match the selected tags.","NORMAL":"There are no files that match your search.","FILTERED":"There are no files that match your keyword and filters."},"COMMUNITY_FILES":{"FILTERED_TAGS":"There are no community files match your keyword with the tags you selected.","FILTERED":"There are no community files that match your keyword and filters.","NORMAL":"There are no community files. "},"DEFAULT":"There are no files from this person","MY_COLLECTIONS":{"FILTERED":"You have no folders that match your filters.","NORMAL":"You have not created any folders."},"MEDIA":{"FILTERED_TAGS":"There are no files from this person that have the tags you selected.","FILTERED":"There are no files from this person that match your filters.","NORMAL":"There are no files from this person."},"SHARED_BY_ME":{"FILTERED_TAGS":"None of the files you have shared have the tags you selected.","NORMAL":"There are no files shared by you.","FILTERED":"There are no files shared by you that match your filters."},"SYNCABLE_FILES":{"FILTERED_TAGS":"You have no synchronizable files with the selected tags.","NORMAL":"You have not synchronized any files yet.","FILTERED":"You have no synchronizable files matching these filters."},"PUBLIC_MEDIA":{"FILTERED_TAGS":"There are no files with the tags you selected.","FILTERED":"There are no files that match your filters.","NORMAL":"There are no files that are shared with your organization."},"DELETED_FILES":{"FILTERED":"There are no deleted files from this person that match your filters.","NORMAL":"There are no deleted files from this person."},"MY_MEDIA":{"FILTERED_TAGS":"You have no files matching the tags you selected.","NORMAL":"You have not uploaded any files.","FILTERED":"You have no files that match these filters."},"FAVORITE_COLLECTIONS":{"FILTERED":"There are no pinned folders that match your filters.","NORMAL":"Keep your frequently-used folders readily available by pinning them to this list. You can add any file to this list by clicking the pin icon ${icon}. ","SHORT":"Add frequently-used folders here by clicking the pin icon ${icon}."},"COLLECTIONS_PUBLIC":{"FILTERED":"There are no folders visible to everyone in your organization that match your filters.","NORMAL":"There are no folders visible to everyone in your organization."},"FAVORITE_FILES":{"FILTERED_TAGS":"You have no pinned files with the selected tags.","NORMAL":"Keep the files you are working on readily available by pinning them to this list.  You can add any file to this list by clicking the pin icon ${icon}.","FILTERED":"You have no pinned files matching these filters."},"COLLECTIONS":{"FILTERED":"There are no folders shared with you that match your filters.","NORMAL":"There are no folders shared with you."},"ALL_COLLECTIONS":{"NORMAL":"There are no folders.","FILTERED":"There are no folders that match your filters."},"SHARED_WITH_ME":{"FILTERED_TAGS":"None of the files shared with you have the tags you selected.","NORMAL":"There are no files shared with you.","FILTERED":"There are no files shared with you that match your filters."},"COLLECTION_CONTRIBUTOR":{"NORMAL":"To add a file to this folder,click \'Add Files\' or  open a file and click \'Add to Folders\'.","FILTERED":"There are no files in this folder that match your filters."},"COLLECTION":{"NORMAL":"There are no files in this folder.","FILTERED":"There are no files in this folder that match your filters."},"MY_DELETED_FILES":{"NORMAL":"There are no files in your trash.","FILTERED":"There are no files in your trash that match your filters."},"SEARCH_COLLECTIONS":{"NORMAL":"There are no folders that match your search."}},"TAGS_LABEL":"Tags: ","EMPTY_MENU":"No actions","FROM_A_COMMUNITY":"From a Community","REMOVE_FILTER_TOOLTIP":"Remove this filter","COUNT_ALT":"Showing items ${0} through ${1} of ${2}","OF_PAGES":"\xa0 of ${0}.","SECTION_COLLAPSED":"Collapsed section","GLOBAL_ACTIONS":"Global actions","HIDE":"Hide","SHOW_ALT":"Show ${0} items per page","SORTING_DESC_LONG":"Click to sort by descending order according to ${0}","ITEMS_PER_PAGE":" items per page","DOWNLOAD_ALT":"Download","VIEW_SELECTION":"Display:","MORE":"More","ERROR_MENU":"An error has occurred","PAGING_TOP_LABEL":"Paging","BOOLEAN_NO":"No","SEARCH_FOR_USER":{"MSG1":"Use the search box at the top of the page to search for a person and view their files. You can also log in to view your own files.     ","FILES":"Use the search box at the top of the page to search for a person and view their files. You can also log in to view your own files."},"OTHER_PEOPLE_FILE":"Other people who have shared this file","NO_DESCRIPTION":"No description provided","ONE_DOWNLOAD":"1","SHARE_TOOLTIP":"Allow others to read or edit this file","PRIVATE":"Private","SHARED":{"BASE":"Shared","MANY_1":"Shared with ${0}","ONE":"${0}","ONE_1":"Shared with 1","COMMUNITY":{"BASE":"Shared with anyone who can see this community","ALT":"Community"},"MANY":"${0}"},"SHARE_MESSAGE":{"LIST_SEP":",\xa0"},"PUBLIC":{"MANY_1":"shared with ${0}","BASE":"Visible to everyone in ${company}","WITH":{"MANY_1":"shared with ${0}","ONE":"Organization access and ${0}","ONE_1":"shared with 1","MANY":"Organization access and ${0}"},"ONE":"Organization access and ${0}","ONE_1":"shared with 1","MANY":"Organization access and ${0}"},"DOWNLOAD_TOOLTIP_ONE_COMMENT_COUNT_ONE":"${0} download, ${0} comment","FOLDER":{"ICON_TOOLTIP":{"PRIVATE":"A Private Folder","COMMUNITY":"A Community Folder","PUBLIC":"A Public Folder","SHARE":"A Shared Folder"}},"USER_HAS_NO_FILES":"There are no files from this person","NOT_LOGGED_IN":{"ACT_IN":"Log In","TITLE":"Log In Now","MESSAGES":"This feature can not be accessed until you are logged in."},"VIEW_SELECTION_CUSTOMIZE":"Customize","USER_NEVER_LOGGED_IN":{"MSG1":"${0} has never logged in to Files.","MSG2":"If you know people who haven\'t started using Files, it\'s easy to get them interested.  Just share a file with them!  They\'ll receive an email letting them know about your file and how to log in."},"DOWNLOAD_TOOLTIP_MANY_COMMENT_COUNT_MANY":"${0} downloads, ${0} comments","PLACE_NOT_FOUND":{"TITLE":"We can\'t find that person","MESSAGES":"The files for this person could not be loaded - click the back button and try again.  If this doesn\'t work the person may no longer be available."},"FILTERED_BY":"Matching: ","DOWNLOAD":"Download","CONTEXT_TITLE":"All actions for this file","DOWNLOAD_TOOLTIP_MANY_COMMENT_COUNT_ONE":"${0} downloads, ${0} comment","SORTING_DESC":"Click to sort by descending order","JUMP_TO_PAGE_ALT":"Jump to a page between ${0} and ${1}","EDIT_PAGE_ERROR":"The file could not be edited due to an error.","PAGE":"Page","MORE_LOAD":"Loading","DOWNLOAD_TOOLTIP_MANY":"${0} views","PAGING_BOTTOM_LABEL":"Paging options","PUBLIC_CAPPED":"Only the first ${0} files that is shared with everyone in your organization are shown here.  Filter or change your sort order to see other files.","REPLACE":"Replace","SORT_BY":"Sort by: ","SEARCH_FILES_ALL_FILES":"All Files","SHARED_FROM_FILES":"Shared from Files","RECOMMEND":"Like","NOHYPHENCOUNT":"${0} of ${1}","YOU_HAVE_NO_PLACE":{"MSG1":"You have not been given permission to upload or create files.  You may still view other people\'s files and collaborate on their files.     ","MSG2":"Administrators determine who is allowed to upload files.  Please contact your administrator if you should have this ability.     "},"SHOWING":"Showing ","VIEW":"View","DOWNLOAD_TOOLTIP_ONE":"${0} view","SHARE_PAGE_TOOLTIP":"Allow others to read or edit this file","HIDE_EXTRA":"Hide extra information","SEARCH_FILES_PERSONAL_FILES":"Personal Files","REMOVE_ITEM_ALT":"Remove ${0}","TAGGED_WITH":"Tagged with \'${0}\' ","DOWNLOAD_TOOLTIP_ONE_COMMENT_COUNT_MANY":"${0} download, ${0} comments","USER_HAS_NO_PAGES":"There are no files from this person","JUMP_TO_PAGE":"Jump to page \xa0","ERROR_REQUEST_CANCELLED":"The request was cancelled.","DOWNLOADS":"${0}","ELLIPSIS":"...","CONTEXT_TITLE_FILE":"Actions for the file ${0}","VIEW_EXTRA":"View more information","CONTEXT_ALT":"Actions","PAGE_ALT":"Page ${0} of ${1}","SEARCH_FILES_SHOW":"Filter by: ","REMOVE_FILTER_ALT":"Remove","REVERT":"Restore","ERROR":"An unknown error has occurred.","LOCKED_BY_YOU":"Locked by you","ERROR_REQUEST_UNAUTHENTICATED":"You must log in again.","COUNT":"${0}-${1} of ${2}","SHARE_INTENT_T":"Shared externally","NEXT":"Next","SECTION_EXPANDED":"Expanded section","MORE_ACTIONS":"More Actions","SORTING_ASC":"Click to sort by ascending order","PREVIOUS":"Previous","SHOW":"Show ","USERERROR":"The person you have requested is no longer available or has been removed from the directory."},"REMOVE_FROM_HIDDEN_COLLECTIONS":{"ACTION":"Remove","ACTION_TOOLTIP":"Remove from folders and communities that you do not have permission to see"},"REMOVE_COLLECTION_MEMBER":{"ACTION_TOOLTIP_COMMUNITY":"Remove this community from the folder","ACTION":"Remove","ACTION_TOOLTIP":"Remove this person from the folder","ACTION_TOOLTIP_GROUP":"Remove this group from the folder"},"CHANGE_PROPAGATE_FILE":{"ERROR_CANCEL":"The file was not updated because the request was cancelled.  Click the checkbox to try again.","ERROR":"The file was not updated due to an error.","ERROR_TIMEOUT":"The file was not updated because the server could not be contacted.  Click the checkbox to try again."},"SUBSCRIBE_TO_PAGE_TOOLTIP":"Follow changes to this page through your feed reader","APP_LOAD":"Welcome to Files","SHARE_TO_COMMUNITY_FOLDER":{"DIALOG_TITLE":"Share Folder with this Community","ACTION":"Share Folder with Community...","ACTION_TOOLTIP":"See folders Community have shared with you ","OK":"Share Folders"},"MOVE_FILES":{"RESHARE_NOT_ALLOWED_FOLDERS_1":"Folder ${item} was not moved to ${target}, because the owner does not allow others to share it.","DIALOG_TITLE":"Move to...","INFO_SUCCESS_FILES_X_FOLDERS_X":"${succeedfilescount} files and ${succeedfolderscount} folders were successfully moved to ${target}.","TOP_LEVEL_DENIED_FOLDER_X":"${count} folders were not moved, because only folder owner can move the top level folders.","NOT_FOUND_FILES_X":"${count} files were not moved to ${target}, because they do not exist anymore.","NOT_FOUND_IN_SOURCE_PARENT_FILES_1":"File ${item} was not moved to ${target}, because it does not exist in the source folder anymore.","PRIVATE_NOT_ALLOWED_IN_PUBLIC_COLLECTION_FILES_X":"${count} files were not moved to ${target}, because they are not visible to everyone in your organization. ","EXIST_AT_TARGET_FOLDERS_1":"Folder ${item} was not moved to ${target}, because there exists already a folder with the same name in the new location.","NOT_FOUND_ITEMS_X":"${count} items were not moved to ${target}, because they do not exist anymore.","ACCESS_DENIED_FOLDER_X":"${count} folders were not moved, because you do not have permission to move them into ${target}.","INFO_SUCCESS_X_FOLDERS":"${succeedfolderscount} folders were successfully moved to ${target}.","PRIVATE_NOT_ALLOWED_IN_PUBLIC_COLLECTION_ITEMS_X":"${count} items were not moved to ${target}, because they are not visible to everyone in your organization. ","NOT_FOUND_FOLDERS_X":"${count} folders were not moved to ${target}, because they do not exist anymore.","INTERNAL_EXTRENAL_RESTRICTION_ITEM_X":"${count} items were not moved to ${target}, because you can not move internal files and folders into a folder that can be shared outside of your organization.","COMMUNITY_TO_PERSONAL_FILES_1":"File ${item} was not moved to ${target}, because you can not move a community owned file into a personal folder.","ACTION_ENABLED":"Move to button is enabled","INFO_SUCCESS_FILES_1_FOLDERS_X":"${succeedfilescount} file and ${succeedfolderscount} folders were successfully moved to ${target}.","TARGET_PARENT_NOT_FOUND_FILES_X":"${count} files were not moved to ${target}, because ${target} does not exist anymore.","SOURCE_PARENT_NOT_FOUND_FOLDERS_X":"${count} folders were not moved to ${target}, because the folder that contains these folders does not exist anymore.","INVALID_TARGET_FOLDER_1":"Folder ${item} was not moved, because you cannot move it into its subfolder.","COMMUNITY_TO_PERSONAL_FOLDERS_1":"Folder ${item} was not moved to ${target}, because you can not move a community owned folder into a personal folder.","RESHARE_NOT_ALLOWED_FOLDERS_X":"${count} folders were not moved to ${target}, because the owner does not allow others to share them.","TARGET_PARENT_NOT_FOUND_ITEMS_X":"${count} items were not moved to ${target}, because ${target} does not exist anymore.","INFO":"Moving these files and folders will cause other people to lose access to the files and folders.","PERSONAL_TO_COMMUNITY_FILES_1":"File ${item} was not moved to ${target}, because you can not move a personal owned file into a community folder.","NOT_FOUND_IN_SOURCE_PARENT_FILES_X":"${count} files were not moved to ${target}, because they do not exist in the source folder anymore.","SOURCE_PARENT_NOT_FOUND_FILES_1":"File ${item} was not moved to ${target}, because the folder that contains this file does not exist anymore.","PRIVATE_NOT_ALLOWED_IN_PUBLIC_COLLECTION_FOLDERS_1":"Folder ${item} was not moved to ${target}, because they are not visible to everyone in your organization. ","RESHARE_NOT_ALLOWED_FILES_1":"File ${item} was not moved to ${target}, because the owner does not allow others to share it.","EXIST_AT_TARGET_FOLDERS_X":"${count} folders were not moved to ${target}, because there exist already folders with the same names in the new location.","ACCESS_DENIED_ITEM_X":"${count} items were not moved, because you do not have permission to move them into ${target}.","ACTION":"Move to","ACCESS_DENIED_FILE_1":"File ${item} was not moved, because you do not have permission to move it into ${target}.","NOT_FOUND_IN_SOURCE_PARENT_ITEMS_X":"${count} items were not moved to ${target}, because they do not exist in the source folder anymore.","PERSONAL_TO_COMMUNITY_FOLDERS_1":"Folder ${item} was not moved to ${target}, because you can not move a personal owned folder into a community folder.","INTERNAL_EXTRENAL_RESTRICTION_FILES_1":"File ${item} was not moved to ${target}, because you can not move an internal file into a folder that can be shared outside of your organization.","EXIST_AT_TARGET_FILES_1":"File ${item} was not moved to ${target}, because there exists already a file with the same name in the new location.","COMMUNITY_TO_PERSONAL_FILES_X":"${count} files were not moved to ${target}, because you can not move a community owned file into a personal folder.","INFO_SUCCESS_X_FILES":"${succeedfilescount} files were successfully moved to ${target}.","TARGET_PARENT_NOT_FOUND_FOLDERS_1":"Folder ${item} was not moved to ${target}, because ${target} does not exist anymore.","COMMUNITY_TO_PERSONAL_ITEMS_X":"${count} items were not moved to ${target}, because you can not move community owned files and folders into a personal folder.","INTERNAL_EXTRENAL_RESTRICTION_FOLDER_1":"Folder ${item} was not moved to ${target}, because you can not move an internal folder into a folder that can be shared outside of your organization.","INVALID_TARGET_FOLDER_X":"${count} folders were not moved, because you cannot move them into their own subfolder.","COMMUNITY_TO_PERSONAL_FOLDERS_X":"${count} folders were not moved to ${target}, because you can not move community owned folders into a personal folder.","PERSONAL_TO_COMMUNITY_FILES_X":"${count} files were not moved to ${target}, because you can not move a personal owned file into a community folder.","NOT_FOUND_IN_SOURCE_PARENT_FOLDERS_1":"Folder ${item} was not moved to ${target}, because it does not exist in the source folder anymore.","SOURCE_PARENT_NOT_FOUND_FILES_X":"${count} files were not moved to ${target}, because the folder that contains these files does not exist anymore.","PRIVATE_NOT_ALLOWED_IN_PUBLIC_COLLECTION_FOLDERS_X":"${count} folders were not moved to ${target}, because they are not visible to everyone in your organization. ","RESHARE_NOT_ALLOWED_FILES_X":"${count} files were not moved to ${target}, because the owner does not allow others to share them.","ACTION_TOOLTIP":"Move these files and folders","INFO_SUCCESS_FILES_X_FOLDERS_1":"${succeedfilescount} files and ${succeedfolderscount} folder were successfully moved to ${target}.","OK":"Move","INFO_SUCCESS_1_FILES":"File ${succeeditem} was successfully moved to ${target}.","ACCESS_DENIED_FILE_X":"${count} files were not moved, because you do not have permission to move them into ${target}.","PERSONAL_TO_COMMUNITY_ITEMS_X":"${count} items were not moved to ${target}, because you can not move personal owned files and folders into a community folder.","TOP_LEVEL_DENIED_FOLDER_1":"Folder ${item} was not moved, because only folder owner can move the top level folder.","SOURCE_PARENT_NOT_FOUND_ITEMS_X":"${count} items were not moved to ${target}, because the folder that contains these items does not exist anymore.","NOT_FOUND_FILES_1":"File ${item} was not moved to ${target}, because it does not exist anymore.","PRIVATE_NOT_ALLOWED_IN_PUBLIC_COLLECTION_FILES_1":"File ${item} was not moved to ${target}, because they are not visible to everyone in your organization. ","PERSONAL_TO_COMMUNITY_FOLDERS_X":"${count} folders were not moved to ${target}, because you can not move personal owned folders into a community folder.","RESHARE_NOT_ALLOWED_ITEMS_X":"${count} items were not moved to ${target}, because the owner does not allow others to share them.","INTERNAL_EXTRENAL_RESTRICTION_FILES_X":"${count} files were not moved to ${target}, because you can not move internal files into a folder that can be shared outside of your organization.","ACTION_DISABLED":"Move to button is disabled","ACTION_LONG":"Move to...","EXIST_AT_TARGET_FILES_X":"${count} files were not moved to ${target}, because there exist already files with the same names in the new location.","ERROR":"These files and folders were not moved to ${target} due to an error.","ACCESS_DENIED_FOLDER_1":"Folder ${item} was not moved, because you do not have permission to move it into ${target}.","INFO_SUCCESS_1_FOLDERS":"Folder ${succeeditem} was successfully moved to ${target}.","TARGET_PARENT_NOT_FOUND_FOLDERS_X":"${count} folders were not moved to ${target}, because ${target} does not exist anymore.","NOT_FOUND_FOLDERS_1":"Folder ${item} was not moved to ${target}, because it does not exist anymore.","EXIST_AT_TARGET_ITEMS_X":"${count} items were not moved to ${target}, because there exist already items with the same names in the new location.","INTERNAL_EXTRENAL_RESTRICTION_FOLDER_X":"${count} folders were not moved to ${target}, because you can not move internal folders into a folder that can be shared outside of your organization.","INFO_SUCCESS_FILES_1_FOLDERS_1":"${succeedfilescount} file and ${succeedfolderscount} folder were successfully moved to ${target}.","TARGET_PARENT_NOT_FOUND_FILES_1":"File ${item} was not moved to ${target}, because ${target} does not exist anymore.","BUSY":"Moving...","CANCEL":"Cancel","OK_MOVE_HERE":"Move Here","WARNING":"${item} is in the ${collection} folder. Some people will lose access to this file if you remove it.","NOT_FOUND_IN_SOURCE_PARENT_FOLDERS_X":"${count} folders were not moved to ${target}, because they do not exist in the source folder anymore.","SOURCE_PARENT_NOT_FOUND_FOLDERS_1":"Folder ${item} was not moved to ${target}, because the folder that contains this folder does not exist anymore."},"DISMISS":"Hide this message","UPLOAD_PREVIEW":{"DIALOG_TITLE":"Upload Video Thumbnail","SUCCESS":"Change Thumbnail Preview Success","REPLACE_LABEL":"Image File:","REQUIRED_MARK":"* Required","REPLACE_CONFIRM":"Select a file with one of the following supported extensions:","ACTION":"Change Thumbnail","BUSY":"Saving...","ACTION_TOOLTIP":"Change Thumbnail Preview file","REQUIRED_FIELD":"Required field","CANCEL":"Cancel","ERROR_UNKNOW":"Unknow ERROR.","OK":"Upload","SELECT_FILE":"Please select a file to upload","ERROR_ACCESS_DENIED":"You cannot upload new versions. Either this file was locked or the owner removed your editor access.","ERROR_NOT_FOUND":"The file could not be edited because it has been deleted or is no longer shared with you."},"FLAG_COMMENT":{"ERROR_CANCEL":"This comment was not flagged because the request was canceled.  Click \'Flag\' to try again.","DIALOG_TITLE":"Flag Comment","INFO_SUCCESS":"The comment has been flagged and submitted for review.","QUESTION":"Provide a reason for flagging this comment (optional):","ACTION":"Flag as Inappropriate","ERROR":"This comment could could not be flagged.","CANCEL":"Cancel","ERROR_TIMEOUT":"This comment was not flagged because the server could not be contacted.  Click \'Flag\' to try again.","ACTION_TOOLTIP":"Flag this comment as inappropriate","OK":"Flag","ERROR_ACCESS_DENIED":"You do not have permission to flag this comment.","ERROR_NOT_FOUND":"This comment was not flagged because it has been deleted or is no longer shared with you."},"MAKE_COLLECTION_INTERNAL":{"DIALOG_TITLE":"Make Internal?","SUCCESS":"This folder can no longer be shared with people outside of your organization.","QUESTION":"Making this folder internal will mean it can no longer be shared with people outside of your organization.\n\nAny shares with external people or communities will be removed.\n\nMaking a folder internal is permanent and cannot be undone.","ERROR":"The folder could not be changed. Please try again later.","ERROR_TIMEOUT":"The folder could not be changed because the server could not be contacted. Please try again.","QUESTION_E":"Making this folder internal will mean it can no longer be shared with people outside of your organization.\n\nAny shares with external people will be removed.\n\nMaking a folder internal is permanent and cannot be undone.","ERROR_CANCEL":"The folder could not be changed because the request was cancelled. Please try again.","ACTION":"Change","BUSY":"Saving...","CANCEL":"Cancel","ACTION_TOOLTIP":"Stop allowing this folder to be shared outside of your organization","ERROR_SHARED_EXTERNALLY":"The folder could not be changed because it is currently shared externally. Remove external shares and try again.","OK":"Make Internal","ERROR_NOT_LOGGED_IN":"The folder could not be changed because you were not logged in. Please log in and try again."},"INFO_COLON":"Info:","FLAG_FILE":{"DIALOG_TITLE":"Flag File","QUESTION":"Provide a reason for flagging this file (optional):","ERROR":"This file could could not be flagged.","ERROR_TIMEOUT":"This file was not flagged because the server could not be contacted.  Click \'Flag\' to try again.","ERROR_CANCEL":"This file was not flagged because the request was canceled.  Click \'Flag\' to try again.","INFO_SUCCESS":"The file has been flagged and submitted for review.","AUTOQUARANTINE_INFO_SUCCESS":"The file has been flagged and has been quarantined successfully.","ACTION":"Flag as Inappropriate","CANCEL":"Cancel","ACTION_TOOLTIP":"Flag this file as inappropriate","OK":"Flag","ERROR_ACCESS_DENIED":"You do not have permission to flag this file.","ERROR_NOT_FOUND":"This file was not flagged because it has been deleted or is no longer shared with you."},"PIVOTS":{"SEARCH_FILES":"Search Results","MY_COLLECTIONS_COL":"Collapse your recent folders","SYNCABLE_FILES_DESC":"Files that are marked for synchronization to one of your computers or mobile devices. If you have not already, download the  ${0}IBM Connections Plug-ins${1} to start synchronizing these files.","COMMUNITY_FILES_TOOLTIP":"See community files","COLLECTIONS_LONG":"Folders Shared With Me ","MY_COLLECTIONS_TOOLTIP":"See your folders ","SEARCH_FILES_WINDOWTITLE":"Search Results from All Files","SHARED_BY_ME_DESC":"Files that you have shared with other people.","MY_MEDIA_LONG":"My Files ","SYNCABLE_FILES":"Sync","SYNCABLE_FILES_WELCOME":"Welcome to Sync","DELETED_FILES":"Trash","ANON_MEDIA":"Files","PUBLIC_MEDIA_TOOLTIP":"See ${company} files","MY_MEDIA_TOOLTIP":"See your files","SYNCABLE_FILES_WINDOWTITLE":"Sync","COLLECTIONS_COL":"Collapse recent shared folders","MEDIA_LONG":"${possessive}\'s Files","COLLECTIONS_PUBLIC_TOOLTIP":"See ${company} folders ","FAVORITE_FILES_TOOLTIP":"See files you pinned ","COLLECTIONS_TOOLTIP":"See folders people have shared with you ","DELETED_FILES_WINDOWTITLE":"Trash","COMMUNITY_FILES_LONG":"Community Files","ANON_MEDIA_WINDOWTITLE":"${possessive}\'s Files","COLLECTIONS_DESC":"Folders that people have shared with you.","COLLECTION":"${0}","MY_MEDIA_DESC":"Files that you own.","MY_COLLECTIONS_EXP":"Expand your recent folders","SEARCH_FILES_TOOLTIP":"See search results","SYNCABLE_FILES_BUTTON":"Add Files","SHARED_BY_ME":"Shared By Me","MEDIA_DESC":"Files owned by this person that are visible to everyone in ${company} or shared with you.","PUBLIC_MEDIA_LONG":"${company} Files","COMMUNITY_FILES_DESC":"Files in communities that you are a member of.","SHARED_BY_ME_WINDOWTITLE":"Files Shared By Me","MEDIA_LONG_X":"${possessive}\' Files","SYNCABLE_FILES_TOOLTIP":"See files that can be synchronized","COLLECTIONS_EXP":"Expand recent shared folders","DELETED_FILES_TOOLTIP":"See files that have been deleted","ANON_MEDIA_TOOLTIP":"See this person\'s files","MY_COLLECTIONS_LONG":"My Folders ","COMMUNITY_FILES_DESC_ANONYMOUS":"All public community files. ","MY_DELETED_FILES":"Trash","SEARCH_FILES_WINDOWTITLE_NO_KEYWORD":"Search Results for all the files shared with you","PUBLIC_MEDIA_DESC":"Files owned by individuals that everyone in ${company} can see. ","COLLECTION_TOOLTIP":"${visibility} | ${updated} | ${files}","SYNCABLE_FILES_WELCOME_1":"Connections Sync allows you to view and edit all of your files from your desktop. All your edits are automatically synchronized so your collaborators always have access to the latest. If you haven\'t already, install Sync now!","ANON_MEDIA_LONG_X":"${possessive}\' Files","SYNCABLE_FILES_WELCOME_2":"Get Sync","MEDIA":"Files","SYNCABLE_FILES_WELCOME_3":"Already have sync?","MY_DELETED_FILES_WINDOWTITLE":"Trash","COLLECTIONS_PUBLIC_LONG":"${company} Folders ","SHARED_BY_ME_TOOLTIP":"See files you shared with people ","MEDIA_WINDOWTITLE":"${possessive}\'s Files","SYNCABLE_FILES_DESC_DISABLE_LINK":"Files available in your desktop Sync folder.","MY_COLLECTIONS_DESC":"Folders that you have created.","FAVORITE_COLLECTIONS":{"COL":"Collapse pinned folders","TT":"See folders you pinned ","LESS_ALT":"Show fewer folders","D":"Add folders to this list by clicking the pin icon next to a folder.","T":"Pinned Folders","TOGGLE":"Change how many of the most recent folders are shown","MORE":"More...","LESS":"Less...","L":"Pinned Folders ","EXP":"Expand pinned folders","WT":"Pinned Folders","MORE_ALT":"Show more folders"},"SHARED_WITH_ME":"Shared With Me","SEARCH_FILES_LONG":"All Files","COLLECTIONS_PUBLIC_DESC":"Folders that everyone in ${company} can see.","MY_DELETED_FILES_LONG":"Trash (${size})","SHARED_WITH_ME_WINDOWTITLE":"Files Shared With Me","COMMUNITY_FILES":"Community Files","MY_COLLECTIONS":"My Folders","MY_DELETED_FILES_TOOLTIP":"See deleted files","SHARED_WITH_ME_LONG":"Files Shared With Me ","MEDIA_WINDOWTITLE_X":"${possessive}\' Files","FAVORITE_FILES_LONG":"Pinned Files ","MEDIA_TOOLTIP":"View this person\'s files","ANON_MEDIA_LONG":"${possessive}\'s Files","COMMUNITY_FILES_WINDOWTITLE":"Community Files","DELETED_FILES_LONG":"Trash for ${name} (${size})","MY_COLLECTIONS_WINDOWTITLE":"My Folders","SYNCABLE_FILES_LONG":"Sync","PUBLIC_MEDIA":"${company} Files","SEARCH_FILES_DESC":"Files matching \'${0}\'","MY_MEDIA":"My Files","MY_DELETED_FILES_DESC":"Only you can see files in your trash. Click the arrow next to a file to restore or permanently delete the file.","ANON_MEDIA_WINDOWTITLE_X":"${possessive}\' Files","COLLECTIONS_PUBLIC":"${company} Folders","FAVORITE_FILES":"Pinned Files","SHARED_BY_ME_LONG":"Files Shared By Me ","COLLECTIONS":"Folders Shared With Me","PUBLIC_MEDIA_WINDOWTITLE":"${company} Files","SHARED_WITH_ME_DESC":"Files that other people have shared with you.","SEARCH_FILES_DESC_NO_KEYWORD":"Files shared with you","MY_MEDIA_WINDOWTITLE":"My Files","SHARED_WITH_ME_TOOLTIP":"See files people have shared with you","COLLECTIONS_PUBLIC_WINDOWTITLE":"${company} Folders","FAVORITE_FILES_DESC":"Add files to this list by clicking the pin icon next to a file.","FAVORITE_FILES_WINDOWTITLE":"Pinned Files","COLLECTIONS_WINDOWTITLE":"Folders Shared With Me","DELETED_FILES_DESC":"Only you can see files in your trash. Click the arrow next to a file to restore or permanently delete the file.","ANON_MEDIA_DESC":"All files visible to everyone in ${company} owned by this person."},"HISTORY":{"TITLE":"Recent Updates"},"CHANGE_PROPAGATE_PAGE":{"ERROR_CANCEL":"The file was not updated because the request was cancelled.  Click the checkbox to try again.","ERROR":"The file was not updated due to an error.","ERROR_TIMEOUT":"The file was not updated because the server could not be contacted.  Click the checkbox to try again."},"SORTS":{"MOSTRECENT_TOOLTIP":"Sort from most recently updated to least recently updated","AGE_TOOLTIP":"Sort from oldest to newest","ADDED_TOOLTIP":"Sort from most recently added to least recently added","MOSTRECENT_TOOLTIP_REVERSE":"Sort from least recently updated to most recently updated","AGE_TOOLTIP_REVERSE":"Sort from newest to oldest","ADDED_TOOLTIP_REVERSE":"Sort from least recently added to most recently added","MOSTDOWNLOADED_TOOLTIP":"Sort from most downloaded to least downloaded","FILE_COUNT_TOOLTIP":"Sort from folders with the most files to the least files","MOSTDOWNLOADED_TOOLTIP_REVERSE":"Sort from least downloaded to most downloaded","FILE_COUNT_TOOLTIP_REVERSE":"Sort from folders with the least files to the most files","HIGHESTRECOMMENDED_TOOLTIP":"Sort from most liked to least liked","TITLE_TOOLTIP":"Sort by name in alphabetical order","SHARED_ON_TOOLTIP":"Sort from most recently shared to least recently shared","HIGHESTRECOMMENDED_TOOLTIP_REVERSE":"Sort from least liked to most liked","MOSTRECENT":"Updated","MOSTRECENT_SHARE":"Shared","MOSTCOMMENTED_TOOLTIP":"Sort from most commented to least commented","AGE":"Most Recently Added","TITLE_TOOLTIP_REVERSE":"Sort by name in reverse alphabetical order","SHARED_ON_TOOLTIP_REVERSE":"Sort from least recently shared to most recently shared","ADDED":"Added","MOSTCOMMENTED_TOOLTIP_REVERSE":"Sort from least commented to most commented","SIZE_TOOLTIP":"Sort by size from largest to smallest","SIZE_TOOLTIP_REVERSE":"Sort by size from smallest to largest","MOSTDOWNLOADED":"Downloads","HIGHESTRECOMMENDED":"Likes","TITLE":"Name","MOSTCOMMENTED":"Comments"},"FEEDS":{"SEARCH_FILES":{"T":"Follow changes to these files through your feed reader","L":"Feed for these Files"},"PUBLIC_FILES":{"T":"Follow changes to files visible to everyone in ${company} through your feed reader","L":"Feed for ${company} public files"},"FAVORITE_FILES":{"T":"Follow changes to your pinned files through your feed reader","L":"Feed for Pinned Files"},"COLLECTIONS":{"T":"Follow changes to these folders through your feed reader","L":"Feed for these Folders"},"FILES":{"T":"Follow changes to these files through your feed reader","L":"Feed for these Files"},"SEARCH_FILES_NO_KEYWORD":{"L":"Feed for All Visible Files"},"UPDATES":{"T":"Follow changes to Files through your feed reader","L":"Feed for these Updates"},"FILE":{"T":"Follow changes to this file through your feed reader","L":"Feed for this File"},"SHARED_FILES":{"T":"Follow changes to shared files through your feed reader","L":"Feed for Shared Files"},"SYNCABLE_FILES":{"T":"Follow changes to your synchronizable files through your feed reader","L":"Feed for Sync"},"COLLECTION":{"T":"Follow changes to this folder through your feed reader","L":"Feed for this Folder"}},"COLLECTIONS":{"JUMP_TO_PAGE":"Jump to page \xa0","HIDE":"Hide","ERROR_REQUEST_UNKNOWN":"An unknown error has occurred.","FOLDERS_LABEL_MANY":"${0} subfolders","FOLDERS_LABEL_1_FILES_LABEL_MANY":"1 subfolder, ${0} files","SHOW_ALT":"Show ${0} items per page","NEXT_T":"Next page","ERROR_REQUEST_CANCELLED":"The request was cancelled.","FOLDERS_LABEL_1_FILES_LABEL_1":"1 subfolder, 1 file","PREVIOUS_T":"Previous page","JUMP_TO_PAGE_ALT":"Jump to a page between ${0} and ${1}","PAGE":"Page","MORE_LOAD":"Loading","ITEMS_PER_PAGE":" items per page","ELLIPSIS":"...","FILES_LABEL_MANY":"${0} files","PAGING_BOTTOM_LABEL":"Paging options","MORE":"More","VIEW_EXTRA":"View more information","PAGING_TOP_LABEL":"Paging","SORT_BY":"Sort by:","PAGE_ALT":"Page ${0} of ${1}","ERROR_REQUEST_TIMEOUT":"The server could not be contacted.","SHARE_INTENT":"Shared externally","LOADING":"Loading folders...","NOHYPHENCOUNT":"${0} of ${1}","FILES_LABEL_0":"No files","FILES_LABEL_1":"1 file","FOLDERS_LABEL_MANY_FILES_LABEL_1":"${0} subfolders, 1 file","LOADING_ONE":"Loading folder...","SEARCH":{"DEFAULT":"Enter a folder name","NAME":"Folders"},"FOLDERS_LABEL_1":"${0} subfolder","FOLDERS_LABEL_MANY_FILES_LABEL_MANY":"${0} subfolders, ${1} files","EMPTY":"There are no folders","ERROR_REQUEST_UNAUTHENTICATED":"You must log in again.","COUNT":"${0}-${1} of ${2}","SHARE_INTENT_T":"Shared externally","HIDE_EXTRA":"Hide extra information","NEXT":"Next","PREVIOUS":"Previous","COUNT_ALT":"Showing folders ${0} through ${1} of ${2}","SHARING":"Sharing","OF_PAGES":"\xa0 of ${0}.","SHOW":"Show"},"TOGGLE_SYNC_FILE":{"ERROR":"The file could not be updated. Please try again later.","ERROR_TIMEOUT":"The file could not be updated because the server could not be contacted. Please try again.","ACTION_REMOVE":"Remove from Sync","UNAVAILABLE":"Information about Sync could not be retrieved. Please refresh the page to try again.","ERROR_CANCEL":"The file could not be updated because the request was cancelled. Please try again.","ERROR_EXISTS":"The file cannot be added to Sync because an existing file already uses the same name. ","ACTION_ADD":"Add to Sync","STOP_SYNC":{"INFO_SUCCESS":"${link} was removed from Sync."},"ACTION_TOOLTIP":"Decide whether or not make this file synchronizable.","SYNC":{"INFO_SUCCESS":"${link} was added to Sync."},"ACTION_ERROR":"Error","ERROR_NOT_LOGGED_IN":"The file could not be updated because you were not logged in. Please log in and try again.","ERROR_NOT_FOUND":"The file could not be updated because it has been deleted or is no longer shared with you."},"CREATE_ITEM":{"ACTION":"New","ACTION_TOOLTIP":"Create a new item"},"SESSION_TIMEOUT":"Your SmartCloud session has timed out. Click OK to log back in or Cancel to close this dialog.","CANCEL":"Cancel","TAGGER":{"CREATEERROR_ACCESS_DENIED":"The tag could not be created because you do not have permission to edit this file.","CREATEERROR_NOT_FOUND":"The tag could not be created because the file has been deleted or is no longer visible.","WARN_LONG_TAGS":"The specified tags are too long.","LOADERROR_TIMEOUT":"The tags could not be loaded: request timed out.","REMOVE":"Remove tag","ERROR_LOADING":"An error has occured loading the tags.","SEPARATOR":",","WARN_LONG_TAG":"The tag \'${0}\' is too long.","INVALID_CHAR_WARN_LONG":"One or more tags you have entered contain invalid characters: ${0}","TRIM_TAGS":"Shorten tags?","LOADERROR_CANCEL":"The tags could not be loaded: request cancelled.","ADD_TAGS":"Add Tags","NO_RESULTS":"No results for \'${0}\'","ADD_REMOVE_TAGS_TOOLTIP":"Add or remove tags on this file","NOTAGS":"No tags","REMOVECONFIRM":"Are you sure you want to remove the tag \'${0}\'?","OK":"Save","LOADING":"Loading tags...","TRIM_TAG":"Shorten tag?","CANCEL_TOOLTIP":"Cancel tag editing","REMOVEERROR":"The tag could not be removed.","ADD_TAGS_LONG":"Add Tags...","REMOVEERROR_TIMEOUT":"The tag could not be removed because the server could not be contacted.  Click \'X\' to try again.","INVALID_CHAR_WARN":"!","LOADERROR_NOTFOUND":"The tags could not be loaded: file not found.","CREATEERROR":"The tag could not be created.  Please try again later.","CREATEERROR_CANCEL":"The tag could not be created because the request was cancelled.  Click \'Save\' to try again.","CREATEERROR_TIMEOUT":"The tag could not be created because the server could not be contacted.  Click \'Save\' to try again.","REMOVEERROR_CANCEL":"The tag could not be removed because the request was cancelled.  Click \'X\' to try again.","ADD_REMOVE_TAGS":"Add or Remove Tags","NONE":"None","CANCEL":"Cancel","REMOVEERROR_NOT_FOUND":"The tag could not be removed because the file has been deleted or is no longer visible.","ADD_TAGS_TOOLTIP":"Add tags to this file","REMOVEERROR_ACCESS_DENIED":"The tag could not be removed because you do not have permission to edit this file."},"WELCOMECONTENT_MOD":{"TAKE_TOUR":"View Demo","BLURB1":"{0}Approve or reject content{1} submitted to a blog, community, or forum.","BLURB2":"{0}Review content{1} that users have flagged.","BLURB3":"{0}Find out more{1} about how moderation works.","TITLE":"New to Moderation?","BLURB":"Approve content before it is published or review content that users have flagged as inappropriate. Learn how to:"},"BACK_TO_PAGE":"Back to Page","WARNING":"Warning","FILE":{"EXPAND_ERROR":{"TIMEOUT":"The details of this file could not be loaded because the server could not be contacted.","NOT_FOUND":"The details of this file could not be loaded because file has been deleted or is no longer visible.","GENERIC":"An error prevented the details of this file from being displayed.  Please try again later.","CANCEL":"The details of this file could not be loaded because the request was cancelled."}},"FORCE_DOWNLOAD":{"DIALOG_TITLE":"File(s) Not Scanned","DOWNLOAD_UNSCANNED_ITEMS":"The unscanned file(s) include:","OTHERS":"Add others...","DOWNLOAD_WARNING":"The files you selected will be downloaded as a compressed file. However, at least one of these files has not been scanned for viruses. Unscanned files might be too large, or might be in queue waiting to be scanned.","ACTION":"Force Download","BUSY":"Downloading...","ACTION_TOOLTIP":"Force Download","CANCEL":"Cancel","OK":"Download"},"STATS":{"ERROR_TITLE":"Files Metrics are Unavailable","ERROR_MSG":"Files metrics are not available at this time.  Access to files metrics may be restricted to administrators."},"WARNING_ACCESS_TITLE":"Access Denied","DELETE_MY_SHARE":{"ACTION":"Remove my share","ACTION_TOOLTIP_PERSON":"Remove my share with ${0}","ACTION_TOOLTIP":"Remove my share with this person"},"ADD_COMMENT":{"ACTION":"Add Comment","ACTION_TOOLTIP":"Add a comment to this file"},"EMPTY_TRASH":{"ACTION":"Empty Trash","ACTION_TOOLTIP":"Permanently delete all files in the trash"},"TOGGLE_FAVORITE_FOLDER":{"A_REMOVE":"Unpin","A_ADD":"Pin","A_REMOVE_SUCCESS":"Pinned folder ${link} was removed successfully. ","A_ADD_SUCCESS":"${link} was pinned successfully.","ERROR":"The folder could not be updated. Please try again later.","ERROR_TIMEOUT":"The folder could not be updated because the server could not be contacted. Please try again.","UNAVAILABLE":"Information about your pinned folders could not be retrieved.  Please refresh the page to try again.","LOADING_T":"Please wait while your pinned folders load","ERROR_CANCEL":"The folder could not be updated because the request was cancelled. Please try again.","A_REMOVE_T":"Remove from your pinned folders","A_ADD_T":"Pin this folder","LOADING":"Loading...","ERROR_NOT_LOGGED_IN":"The folder could not be updated because you were not logged in. Please log in and try again.","ERROR_NOT_FOUND":"The folder could not be updated because it has been deleted or is no longer shared with you."},"TOGGLE_FOLLOWING_FOLDER":{"FOLLOW":{"INFO_SUCCESS":"You are now following this folder: ${0}."},"ERROR_CANCEL":"The folder could not be updated because the request was cancelled. Please try again.","STOP_FOLLOWING":{"INFO_SUCCESS":"You have stopped following this folder: ${0}. "},"ERROR":"The folder could not be updated. Please try again later.","ACTION_ADD":"Follow","ACTION_TOOLTIP":"Toggle whether you will receive updates about this folder","ERROR_TIMEOUT":"The folder could not be updated because the server could not be contacted. Please try again.","ACTION_REMOVE":"Stop Following","ERROR_NOT_LOGGED_IN":"The folder could not be updated because you were not logged in. Please log in and try again.","ACTION_ERROR":"Error","ERROR_NOT_FOUND":"The folder could not be updated because it has been deleted or is no longer shared with you."},"CREATE_COMMUNITY_FOLDER":{"DIALOG_TITLE":"New Folder","ACTION":"New Folder...","ACTION_TOOLTIP":"Create a new folder to put files into","OK":"Create"},"REAUTHENTICATE":{"NAME_LABEL":"User name:","PASSWORD_LABEL":"Password:","DIALOG_TITLE":"Log In Again","GO_TO_LOGIN_PAGE":"Or, discard any unsaved changes and go to the full log in page.","ERROR":"The username or password was not valid.","BUSY":"Authenticating...","CANCEL":"Cancel","OK":"Log In","INFO":"You are no longer logged in to IBM Connections.  To continue your current work and preserve any input you have entered please reauthenticate. "},"A11Y_READER_REMOVED":"Removed ${0} as a reader","PAGING":{"COUNT2":"Showing ${0}-${1}","NEXT":"Next","PAGING_BOTTOM_LABEL":"Paging options","PREVIOUS":"Previous","PAGING_TOP_LABEL":"Paging","NEXT_T":"Next page","COUNT_ALT":"Showing items ${0} through ${1} of ${2}","PAGE_ALT":"Page ${0} of ${1}","PREVIOUS_T":"Previous page","COUNT":"${0}-${1} of ${2} "},"HEADER":{"PEOPLE_TITLE":"Files","PEOPLE":"Files"},"REMOVE_FROM_COMMUNITY":{"ACTION_TOOLTIP_COLLECTION":"Remove from the community ${0}","ACTION":"Remove","ACTION_TOOLTIP":"Remove from community"},"PAGE":{"EXPAND_ERROR":{"TIMEOUT":"The details of this file could not be loaded because the server could not be contacted.","NOT_FOUND":"The details of this file could not be loaded because the file has been deleted or is no longer visible.","GENERIC":"An error prevented the details of this file from being displayed.  Please try again later.","CANCEL":"The details of this file could not be loaded because the request was cancelled"}},"MAKE_FILE_INTERNAL":{"DIALOG_TITLE":"Make Internal?","SUCCESS":"This file can no longer be shared with people outside of your organization.","QUESTION":"Making this file internal will mean it can no longer be shared with people outside of your organization.\n\nAny shares with external people, communities or folders will be removed.\n\nMaking a file internal is permanent and cannot be undone.","ERROR":"The file could not be changed. Please try again later.","ERROR_TIMEOUT":"The file could not be changed because the server could not be contacted. Please try again.","QUESTION_E":"Making this file internal will mean it can no longer be shared with people outside of your organization.\n\nAny shares with external people or folders will be removed.\n\nMaking a file internal is permanent and cannot be undone.","ERROR_CANCEL":"The file could not be changed because the request was cancelled. Please try again.","ACTION":"Change","BUSY":"Saving...","CANCEL":"Cancel","ACTION_TOOLTIP":"Stop allowing this file to be shared outside of your organization","ERROR_SHARED_EXTERNALLY":"The file could not be changed because it is currently shared externally. Remove external shares and folders and try again.","OK":"Make Internal","ERROR_NOT_LOGGED_IN":"The file could not be changed because you were not logged in. Please log in and try again."},"ATTACHMENTS":{"DATE":{"RELATIVE_TIME":{"MONTH":"${MMM} ${d}","DAY":"${EEee} at ${time}","FULL":"${EEEE}, ${date_long} ${time_long}"},"UPDATED":{"MONTH":"Updated ${MMM} ${d}","DAY":"Updated ${EEee} at ${time}","FULL":"${EEEE}, ${date_long} ${time_long}"}}},"DELETE_FILE":{"ACTION_TOOLTIP_X":"Permanently delete the selected files","ACTION":"Delete","ACTION_TOOLTIP":"Permanently delete this file"},"EDIT_FILE":{"ACTION_LONG":"Edit Properties...","ACTION":"Edit Properties","ACTION_TOOLTIP":"Change the file name and description"},"REMOVE_FROM_FILESYNC":{"DIALOG_TITLE":"Remove from Sync","ERROR_X":"${count} files were not removed from Sync due to errors.","INFO_SUCCESS_1":"Sync is no longer enabled for ${item}.","ACTION_DISABLED":"Remove button is disabled","QUESTION":"Are you sure you want to remove this file from Sync?\n\n${0}","INFO_SUCCESS_X":"${count} files were removed from Sync.","ERROR_1_NOT_FOUND":"${item} already has been removed from Sync.","ERROR_1_NOT_LOGGED_IN":"${item} was not removed from Sync because you were not logged in. Please log in and try again.","ERROR_1_ACCESS_DENIED":"${item} was not removed from Sync because you do not have permission to remove this file.","INFO_SUCCESS":"${0} was removed from Sync.","ACTION_TOOLTIP_X":"Remove the selected files from Sync","ACTION":"Remove","ACTION_ENABLED":"Remove button is enabled","ERROR_X_CANCEL":"Some files might not have been removed from Sync because the request was cancelled.","BUSY":"Removing...","ACTION_TOOLTIP":"Remove from Sync","CANCEL":"Cancel","ERROR_1":"${item} was not removed from Sync due to an error.","OK":"OK","ERROR_1_TIMEOUT":"${item} was not removed from Sync because the server could not be contacted.","ERROR_1_CANCEL":"${item} cannot be removed from Sync because the request was cancelled.","QUESTION_X":"Are you sure you want to remove the selected files from Sync?\n\n${0}"},"BACK_TO_COMMUNITY_COLLECTIONS":"Back to community folders","TOGGLE_FAVORITE_FILE":{"A_REMOVE":"Unpin","A_ADD":"Pin","A_REMOVE_SUCCESS":"Pinned file ${link} was removed successfully. ","A_ADD_SUCCESS":"${link} was pinned successfully.","ERROR":"The file could not be updated. Please try again later.","PIN_SUCCESS_SYNC_FAILE":"${link} was pinned successfully. The file cannot be added to Sync because an existing file already uses the same name.","ERROR_TIMEOUT":"The file could not be updated because the server could not be contacted. Please try again.","UNAVAILABLE":"Information about your pinned files could not be retrieved.  Please refresh the page to try again.","ERROR_CANCEL":"The file could not be updated because the request was cancelled. Please try again.","LOADING_T":"Please wait while your pinned files load","A_REMOVE_T":"Remove from your pinned files","A_ADD_T":"Pin this file","LOADING":"Loading...","ERROR_NOT_LOGGED_IN":"The file could not be updated because you were not logged in. Please log in and try again.","ERROR_NOT_FOUND":"The file could not be updated because it has been deleted or is no longer shared with you."},"BACK_TO_APP":"Return to Application","UNLOCK_FILE":{"ERROR_ALREADY_UNLOCKED":"This file was already unlocked.","ERROR_CANCEL":"The file could not be unlocked because the request was cancelled. Please try again.","STATUS":"Unlocking...","INFO_SUCCESS":"The file is now unlocked.","ACTION":"Unlock File","ERROR":"The file could not be unlocked. Please try again later.","ACTION_TOOLTIP":"Unlock this file","ERROR_TIMEOUT":"The file could not be unlocked because the server could not be contacted. Please try again.","ERROR_NOT_LOGGED_IN":"The file could not be unlocked because you were not logged in. Please log in and try again.","ERROR_NOT_FOUND":"The file could not be updated because it has been deleted or is no longer shared with you."},"REMOVE_FROM_COLLECTION":{"ACTION_TOOLTIP_COLLECTION":"Remove from the folder ${0}","ACTION":"Remove from Folder","ACTION_TOOLTIP":"Remove this item from this folder"},"LEGEND_L":"Legend","FILE_SYNC_ICON":{"ALT":"This file is enabled for sync."},"VERSIONS":{"REVERT_DESCRIPTION":"Restored from version ${0}","ERROR_REQUEST_UNKNOWN":"An unknown error has occurred.","NEXT_T":"Next page","SHOW_COMPARISON":"Show comparison","PREVIOUS_T":"Previous page","DELETE_CONFIRM":"Are you sure you want to delete version ${0}?","PAGE":"Page","PAGING_BOTTOM_LABEL":"Paging options","COMPARE_RECENT":"Compare to most recent","MOST_RECENT":"(most recent)","ERROR_REQUEST_TIMEOUT":"The server could not be contacted.","LOADING":"Loading versions...","REVERT_TITLE":"Restore Version","DELETE_ERROR_ACCESS_DENIED":"You do not have permission to delete a version on this file.","DELETE":"Delete","DELETE_ERROR_NOT_FOUND":"The version could not be deleted because it has been deleted or is no longer shared with you.","INFO":"Version ${0} created ${1} by ${2}","DATE":{"RELATIVE_TIME":{"MONTH":"${MMM} ${d}","TODAY":"Today at ${time}","YESTERDAY":"Yesterday at ${time}","DAY":"${EEee} at ${time}","YEAR":"${date_long}","FULL":"${EEEE}, ${date_long} ${time_long}"},"CREATED":{"MONTH":"Version ${number} created on ${MMM} ${d} by ${person}","TODAY":"Version ${number} created today at ${time} by ${person}","YESTERDAY":"Version ${number} created yesterday at ${time} by ${person}","DAY":"Version ${number} created on ${date} by ${person}","YEAR":"Version ${number} created on ${date_long} by ${person}"},"AM":"AM"},"VERSION_NUMBER":"Version ${0} ","SUBSCRIBE_TO":"Feed for these Versions","DELETE_ONE":"Delete version ${0}","COUNT_ALT":"Showing versions ${0} through ${1} of ${2}","COMPARE_VERSION":"Compare version","KEY":"Key:","COMPARING":"Comparing wiki text of:","REVERT_CONFIRM":"You are about to replace the current version of this file with version ${0}, which was created ${1} by ${2}.\n\nDo you want to proceed?","DELETE_ERROR_CANCEL":"The version was not deleted because the request was cancelled. Click \'OK\' again to try your request again.","SHOW_ALT":"Show ${0} items per page","ERROR_REQUEST_CANCELLED":"The request was cancelled.","DELETE_ERROR_NOT_LOGGED_IN":"The version was not deleted because you were not logged in. Click \'OK\' to try again.","DELETE_ALL_CONFIRM":"Are you sure you want to delete all versions prior to ${0}?","ITEMS_PER_PAGE":" items per page","ELLIPSIS":"...","SUBSCRIBE_TO_TOOLTIP":"Follow changes to this file through your feed reader","LABEL":"Version ${0}","DELETE_ERROR":"The version was not deleted due to an error.","NEW_CHANGED":"New/Changed","DELETE_ERROR_TIMEOUT":"The version was not deleted because the server could not be contacted. Click \'OK\' again to try your request again.","BY":"by ","PAGING_TOP_LABEL":"Paging","PAGE_ALT":"Page ${0} of ${1}","CONTENT":{"REVERT":"Restore","VIEW":"View","DOWNLOAD":"Download","DELETE":"Delete"},"NO_VERSIONS":"No versions","REVERT_VERSION":"Restore version ${0}","DELETE_DES":"Select which versions to delete","REVERT":{"GENERIC_ERROR":"The version could not be restored because of an unknown error.  Click \'Restore\' again to try your request again.","ERROR_CANCEL":"The version was not restored because the request was cancelled.  Click \'Restore\' again to try your request again.","INFO_SUCCESS":"${link} was restored successfully.","ERROR_QUOTA_VIOLATION":"The version could not be restored because of space restrictions.","ERROR_MAX_CONTENT_SIZE":"The version could not be restored because it is larger than the maximum allowed file size of ${0}","ERROR_NAME_EXISTS":"The version could not be restored because another file has the same name.","ERROR_TIMEOUT":"The version was not restored because the server could not be contacted.  Click \'Restore\' again to try your request again.","ERROR_ACCESS_DENIED":"You do not have permission to restore a version on this file.   ","INFO_SUCCESS_PRE_MODERATION":"The file ${name} has been submitted for review. No versions will be available until the new or updated version is approved.","ERROR_NOT_FOUND":"The version could not be restored because it has been deleted or is no longer shared with you."},"DELETE_ALL_TITLE":"Delete Versions","ERROR":"Unable to load version information.","SUBSCRIBE_TO_TITLE":"Versions for ${0}","DELETE_ALL":"Delete version ${0} and all earlier versions","COUNT":"${0}-${1} of ${2}","NEXT":"Next","PREVIOUS":"Previous","DELETED":"Deleted","TO":"to:","VIEW_MOST_RECENT":"View most recent","SHOW":"Show"},"FILES_CHECKED_ALERT":"selecting checkbox will enable the file-action buttons, press shift and tab to navigate to them","ERROR_OCCURRED":"An error occurred.  Contact your administrator.","RECOMMEND":{"RECOMMEND_TOOLTIP":"Like this","YOU_AND_ONE_HAVE_RECOMMENDED":"You and 1 other","UNRECOMMEND_TOOLTIP":"Undo your like from this","LABEL_FALSE":"Like this file.","LABEL_TRUE":"You like this.","RECOMMEND":"Like","LOADING":"Loading...","LABEL_A_ONE":"1 person likes this","UNRECOMMEND":"Undo","ALT_TEXT":"Likes","YOU_HAVE_RECOMMENDED":"You like this","SAVE_ERROR":"Your like could not be saved.  Please try again later.","SAVE_ERROR_TIMEOUT":"Your like could not be saved because the server could not be contacted.  Click the button to try again.","ERROR":"An error has occurred.","LABEL_A_MANY":"${0} people like this","LABEL_HIDDEN_MANY":"${0} others not shown","X_HAVE_RECOMMENDED":"${0} people like this","LABEL_R_ONE":"1 other person likes this","NOT_RECOMMENDED":"0 people like this","SAVE_ERROR_CANCEL":"Your like could not be saved because the request was cancelled.  Click the button to try again.","YOU_AND_X_HAVE_RECOMMENDED":"You and ${0} others","ERROR_RETRIEVE":"Unable to retrieve likes at this time.","LABEL_R_MANY":"${0} other people like this","CANCEL":"Cancel","LABEL_HIDDEN_ONE":"1 other not shown","SAVE_ERROR_NOT_FOUND":"Your like could not be saved because the file has been deleted or is no longer visible.","SAVE_ERROR_ACCESS_DENIED":"Your like could not be saved because the file has been deleted or is no longer visible.","ONE_HAS_RECOMMENDED":"1 person likes this"},"COLLECTION":{"ACTION_MENU_TITLE":"${0} folder action menu","EXPAND_ERROR":{"TIMEOUT":"The details of this folder could not be loaded because the server could not be contacted.","NOT_FOUND":"The details of this folder could not be loaded because the folder has been deleted or is no longer visible.","GENERIC":"An error prevented the details of this folder from being displayed.  Please try again later.","CANCEL":"The details of this folder could not be loaded because the request was cancelled."},"BROWSE_OTHER":"Browse Folders","ERRORS":{"ACCESS_DENIED_ANON":{"TITLE":"Access Denied","MESSAGES":"You do not have permission to view this folder.  If this is your folder or it has been shared with you, you must log in to Files first. "},"ACCESS_DENIED":{"TITLE":"Access Denied","MESSAGES":"You do not have permission to view this folder.  The folder is not shared with you."},"NOT_FOUND":{"TITLE":"Folder Not Found","MESSAGES":"The folder you have requested has been deleted or moved. If someone sent you this link, check that it is correct."},"LOGIN":"Log in now"}},"CONFIRM":{"DIALOG_TITLE":"Confirm","BUSY":"Busy...","CANCEL":"Cancel","OK":"OK"},"ERROR_DETAILS_INFO":"Contact your administrator and include the information below:","ADD_TO_COLLECTION":{"ACTION_LONG":"Add to Folders...","ACTION":"Add to Folders","ACTION_TOOLTIP":"Add this file to a folder"},"TOOLBAR_ALT":"Files menu","A11Y_MANAGER_REMOVED":"Removed ${0} as an owner","SEARCH":{"SCOPE_PERSON":{"LABEL":"Files belonging to...","HINT":"Name or email","HOVER":"Search for a person"},"HINT":"Search","SCOPE_CONNECTIONS_WIKIS":{"LABEL":"Wikis","HOVER":"Search Wikis"},"SCOPE_ALL_FILES":{"LABEL":"All Files","HINT":"Search","HOVER":"Search all files"},"PEOPLE":"Files belonging to...","SCOPE_CONNECTIONS_DOGEAR":{"LABEL":"Bookmarks","HOVER":"Search Bookmarks"},"SCOPE_CONNECTIONS_COMMUNITIES":{"LABEL":"Communities","HOVER":"Search Communities"},"SCOPE_COMMUNITY_FILES":{"LABEL":"Community files","HINT":"Search","HOVER":"Search community files "},"FILES":"Files belonging to...","SCOPE_CONNECTIONS_ADVANCED":{"LABEL":"Advanced","HOVER":"Go to the advanced search page"},"SCOPE_SHARED_WITH_ME_FILES":{"LABEL":"Files Shared with Me","HINT":"Search","HOVER":"Search files shared with me"},"SCOPE_FOLDERS":{"LABEL":"Folders","HINT":"Folder name","HOVER":"Search all folders"},"SCOPE_CONNECTIONS_BLOGS":{"LABEL":"Blogs","HOVER":"Search Blogs"},"SCOPE_CONNECTIONS_PROFILES":{"LABEL":"Profiles","HOVER":"Search Profiles"},"USER_RESULTS":"People search results for name and email: ${0}","SCOPE_CONNECTIONS_ACTIVITIES":{"LABEL":"Activities","HOVER":"Search Activities"},"COMMUNITIES":"Communities","SCOPE_CONNECTIONS_FORUMS":{"LABEL":"Forums","HOVER":"Search Forums"},"SEARCH":"Search","SCOPE_SHARED_BY_ME_FILES":{"LABEL":"Files Shared by Me","HINT":"Search","HOVER":"Search files shared by me"},"SCOPE_CONNECTIONS_ALL":{"LABEL":"All Content","HOVER":"Search all content"},"SCOPE_PUBLIC_FILES":{"LABEL":"${company} Files","HINT":"Search","HOVER":"Search ${company} files"},"REFINE_OPTIONS":"Refine search options","SCOPE_MY_FILES":{"LABEL":"My Files","HINT":"Search","HOVER":"Search my files"},"SCOPE_THESE_FILES":{"LABEL":"This Person\'s Files","HINT":"Search","HOVER":"Search this person\'s files"},"PEOPLE_DEFAULT":"Name or email","SEARCH_ALT":"Search","FILTER":{"TAGS":{"TITLE":"Tags","EXPAND":"Expand the tag filter","COLLAPSE":"Collapse the tag filter"},"DATE":{"TITLE":"Dates","EXPAND":"Expand the date filter","COLLAPSE":"Collapse the date filter"},"PEOPLE":{"TITLE":"People","EXPAND":"Expand the person filter","COLLAPSE":"Collapse the person filter"}},"TITLE":"Search Results for \'${0}\'"},"RESTORE_FILE":{"ACTION":"Restore","ACTION_TOOLTIP":"Move this file out of the trash"},"INFO":"Info","DATE":{"RELATIVE_TIME":{"MONTH":"${MMM} ${d}","TODAY":"Today at ${time}","YESTERDAY":"Yesterday at ${time}","DAY":"${EEee} at ${time}","YEAR":"${date_long}","FULL":"${EEEE}, ${date_long} ${time_long}"},"TODAY":"today","YESTERDAY":"yesterday","COMPACT":{"MONTH":"${MMM} ${d}","TODAY":"${time}","YESTERDAY":"Yesterday","DAY":"${MMM} ${d}","YEAR":"${date}","FULL":"${EEEE}, ${date_long} ${time_long}"},"TODAY_U":"Today","YESTERDAY_U":"Yesterday","AM":"AM","PM":"PM","MONTHS_ABBR":{"11":"DEC","0":"JAN","1":"FEB","2":"MAR","3":"APR","4":"MAY","5":"JUN","6":"JUL","7":"AUG","8":"SEP","9":"OCT","10":"NOV"},"FULL":"${EEEE}, ${date_long} ${time_long}"},"EDIT_FILE_RT":{"DIALOG_TITLE":"Edit on Desktop","CONNECTOR_DIALOG_MESSAGE":"This feature allows you to edit the file locally.","OK_TITLE":"Edit on Desktop","ACTION":"Edit on Desktop","CONNECTOR_DIALOG_WARNING":": Once you complete editing, you must publish a draft using the desktop file connectors. If the file fails to open, you might need to install the desktop plugins.","CONNECTOR_DIALOG_CHECKBOX":"Don\'t show this message again.","BUSY":"Opening...","CANCEL":"Cancel","ACTION_TOOLTIP":"Edit this document","OK":"Edit on Desktop","CONNECTOR_DIALOG_IMPORTANT":"Important"},"ABOUT_COLLECTION":{"ADDED":"Created: ","ITEM_COUNT":"Files included: ","TIMESTAMP":{"MONTH":"${EEEE}, ${date} by ${user}","TODAY":"${EEEE}, Today at ${time} by ${user}","YESTERDAY":"${EEEE}, Yesterday at ${time} by ${user}","DAY":"${EEEE}, ${date} by ${user}","YEAR":"${EEEE}, ${date_long} by ${user}","FULL":"${EEEE}, ${date_long} ${time_long} by ${user}"},"TITLE":"About this Folder","CONTENTS":"Folder contents updated:","UPDATED":"Any update:","DESCRIPTION":"Description:","NO_DESCRIPTION":"There is no description for this folder."},"COMMUNITYSEARCH":{"HINT_TEXT":"Community name...","NO_RESULTS":"No results for \'${0}\'","SHARE_LINK":"Share with a community...","SOURCE":"a Community"},"DELETE_COLLECTION":{"ACTION":"Delete","ACTION_TOOLTIP":"Delete this folder"},"NOTIFY_FILE":{"UNSUBSCRIBE":{"ALL":"You have stopped following this file.","CONTENT":"You will no longer receive updates when this file is changed.","COMMENT":"You will no longer receive updates when this file is commented on."},"ERROR":"Your following settings on this file were not changed due to an error.  Please try again.","SUBSCRIBE":{"ALL":"You are now following this file.","CONTENT":"You will now receive updates when this file is changed.","COMMENT":"You will now receive updates when comments are made on this file."}},"MAKE_COLLECTION_PRIVATE":{"ACTION":"Remove public access","ACTION_TOOLTIP":"Remove your organization\'s access "},"APP_NAME_TITLE_BAR":"Files","TITLEBAR":{"ALLUSERS_TITLE":"Search for other people","OFFLINE":"Offline","ALLUSERS":"Find People","GO":"Go","SEARCH":"Search","SHARES_TITLE":"All of the shares that you are involved in","COLLECTIONS_TITLE":"See folders of files","MYCHANNEL_TITLE":"All of your files","SHARES":"My Shares","COLLECTIONS":"Folders","MYCHANNEL":"Files","HOME_TITLE":"See what\'s happening in Files","HOME":"Updates"},"WARNING_COLON":"Warning:","SHARING":{"SHARED_WITH":{"MONTH":"Shared with ${user} on ${MMM} ${d}","TODAY":"Shared with ${user} today at ${time}","YESTERDAY":"Shared with ${user} yesterday at ${time}","DAY":"Shared with ${user} on ${EEEE} at ${time}","YEAR":"Shared with ${user} on ${date_long}"},"EXPAND_ERROR":{"TIMEOUT":"The details of this share could not be loaded because the server could not be contacted.","NOT_FOUND":"The details of this share could not be loaded because the file has been deleted or is no longer visible.","GENERIC":"An error prevented the details of this share from being displayed.  Please try again later.","CANCEL":"The details of this share could not be loaded because the request was cancelled."},"USERS_POPUP_FILE":{"ADD":"Add","COMMUNITY_MEMBERS":"${0}","READERS_LABEL":"Readers:\xa0","EMPTY_CONTRIBUTORS":"None","EXTERNAL":"This file is shared with external people or communities:","CONTRIBUTORS_LABEL":"Editors:\xa0","READER_IF_PUBLIC":"Everyone in ${company}","EXTERNAL_E":"This file is shared with external people:","EXTERNAL_COLLECTION":"This folder is shared with external people or communities:","OWNER":"This file is owned by ${user}.","COMMUNITY_OWNERS":"${0} (owners only)","SHOW_MORE":"Show more...","NEVER_SHARED":"You have not shared this file with anyone","ALSO_SHARED_LINK":"folders","ALSO_SHARED":"Other people have access to this file through one or more shared ${0}","EMPTY_READERS":"None","MY_SHARES":"My shares","SHARE_INTENT_COLLECTIONS_T":"Shared externally","OWNER_LABEL":"Owner:\xa0","ERROR":"The server could not be contacted.","ERROR_TIMEOUT":"The server could not be contacted.","COMMUNITY_TOOLTIP":"Shared with members of the community \'${0}\'","EMPTY":"Not shared with anyone","NO_INVOLVED_SHARES":"You have not shared this file or been shared with","ERROR_CANCEL":"The request was cancelled.  Please try again.","SHARE_INTENT_T":"Shared externally","COMMUNITY_TOOLTIP_OWNERS":"Shared with owners of the community \'${0}\'","READER_IF_PUBLIC_TOOLTIP":"This file is visible to everyone in ${company}","ERROR_NOT_FOUND":"This information cannot be displayed because the file has been deleted or is no longer shared with you.","ERROR_ACCESS_DENIED":"This information cannot be displayed because the file has been deleted or is no longer shared with you."},"EVT_VIEW_ONE":{"MONTH":"${user} shared with ${list} on ${MMM} ${d}","TODAY":"${user} shared with ${list} today at ${time}","YESTERDAY":"${user} shared with ${list} yesterday at ${time}","DAY":"${user} shared with ${list} on ${EEEE} at ${time}","YEAR":"${user} shared with ${list} on ${date_long}"},"USERS_POPUP_COLLECTION":{"ERROR_CANCEL":"The request was cancelled.  Please try again.","ADD":"Add","OWNER":"This folder is owned by ${user}.","ERROR":"The server could not be contacted.","ERROR_TIMEOUT":"The server could not be contacted.","GROUP_NAME":"${0} (group)","EMPTY":"Not shared with anyone","ERROR_ACCESS_DENIED":"This information cannot be displayed because the folder has been deleted or is no longer shared with you.","ERROR_NOT_FOUND":"This information cannot be displayed because the folder has been deleted or is no longer shared with you."},"COLLECT":{"EDITOR_LABEL":"Editors:","CONTRIBUTOR_IF_ALL_AUTH":"Everyone in ${company}","ADD_ALL_AUTHED_USERS_AS_EDITOR":"Everyone in ${company} can edit this folder","SHARING_VISIBLE_EXTERNALLY_AND_SHARE_AT_TOP":"Folder may be visible to people outside of your organization. Sharing is set at the top folder.","EDITOR_ROLE":"as Editor","SHARING_VISIBLE_EXTERNALLY":"Folder may be visible to people outside of your organization","CONTRIBUTOR_LABEL_TITLE":"Contributors","VISIBILITY_PUBLIC_LABEL":"Everyone in my organization","SHARE_TYPE_LABEL":"Type","READER_LABEL_TITLE":"Readers","SHARING_VISIBLE_COMMUNITY_MEMBERS":"Folder will be visible to community members only","ADD_MEMBER_HEADER":"Share with:","VISIBILITY_PEOPLE_GROUPS_COMMUNITIES_LABEL":"People, Groups, or Communities","ADD_MEMBER":"Share with:","VISIBILITY_PEOPLE_COMMUNITIES_LABEL":"People or Communities","WARN_OWNER":"You cannot share with the owner of the folder.","ADD_ALL_AUTH_CONTRIBUTOR":"Everyone in ${company} can contribute to this folder","MANAGER_LABEL":"Owners:","SHARING_VISIBLE_ORGANIZATION":"Folder will be visible to your entire organization","ADD_TOOLTIP":"Share with this user","SHARING_VISIBLE_MEMBERS_AND_SHARE_AT_TOP":"Folder will be visible to you and others. Sharing is set at the top folder.","CONTRIBUTOR_EMPTY":"None","VISIBILITY_NO_ONE_LABEL":"No one","VISIBILITY_PEOPLE_GROUPS_LABEL":"People or Groups","SHARING_PRIVATE_AND_SHARE_AT_TOP":"Folder will be visible only to you. Sharing is set at the top folder.","READER_EMPTY":"None","VISIBILITY_PEOPLE_LABEL":"People","VISIBILITY_NO_ONE_DESCRIPTION":"(shared with me only)","WARN_GRANT_ALL_AUTHED_USERS_TO_EDIT_FOLDER":"If you allow everyone to edit this folder, all files that are not visible to your entire organization will be removed.","VISIBILITY_PEOPLE_GROUPS_DESCRIPTION":"(give specific permissions to others)","SELECT_USER_GROUP_DISABLED_ERROR":"Please select a person or community to share with.","EDITOR_LABEL_TITLE":"Editors","SHARING":"Sharing:","SHARE_ROLE_LABEL":"Role","SHARING_VISIBLE_ORGANIZATION_AND_SHARE_AT_TOP":"Folder will be visible to your entire organization. Sharing is set at the top folder.","READER_IF_PUBLIC":"Everyone in ${company}","CONTRIBUTOR_LABEL":"Contributors:","ADD_MEMBER_TITLE":"Share with","VISIBILITY_PUBLIC_DESCRIPTION":"","WARN_AUTH_CHANGE_ALL_AUTH":"Adding everyone as contributors will make this folder public.","SHARING_BY_TOP_LEVEL_FOLDER":"Sharing can only be set at the top level folder: ${topFolder}.","READER_LABEL":"Readers: ","SELECT_USER_GROUP_ENABLED_ERROR":"Please select a person, group or community to share with.","EDITOR_EMPTY":"None","MANAGER_LABEL_TITLE":"Owners","SHARING_BY_TOP_FOLDER":"Sharing is set at the top folder.","SELECT_USER_GROUP_ENABLED_ERROR_E":"Please select a person or group to share with.","WARN_ADD_ALL_AUTHED_USERS_AS_EDITOR":"Adding everyone as editors will make this folder visible to your entire organization.","MANAGER_ROLE":"as Owner","SHARING_HEADER":"Sharing:","READER_ROLE":"as Reader","VISIBILITY_PUBLIC_WARNING":"Files which are not visible to everyone in ${company} will be removed from this folder.","CONTRIBUTOR_ROLE":"as Contributor","MANAGER_EMPTY":"None","NO_MEMBERS":"None","SELECT_USER_GROUP_DISABLED_ERROR_E":"Please select a person to share with."},"SHARED_WITH_TWO":{"MONTH":"Shared with ${user} and ${count} on ${MMM} ${d}","TODAY":"Shared with ${user} and ${count} today at ${time}","YESTERDAY":"Shared with ${user} and ${count} yesterday at ${time}","DAY":"Shared with ${user} and ${count} on ${EEEE} at ${time}","YEAR":"Shared with ${user} and ${count} on ${date_long}"},"EVT_EDIT_ONE":{"MONTH":"${user} added ${list} as an editor on ${MMM} ${d}","TODAY":"${user} added ${list} as an editor today at ${time}","YESTERDAY":"${user} added ${list} as an editor yesterday at ${time}","DAY":"${user} added ${list} as an editor on ${EEEE} at ${time}","YEAR":"${user} added ${list} as an editor on ${date_long}"},"SHARED_WITH_MANY_1":"${0} others","SHARED_BY":{"MONTH":"Shared by ${user} on ${MMM} ${d}","TODAY":"Shared by ${user} today at ${time}","YESTERDAY":"Shared by ${user} yesterday at ${time}","DAY":"Shared by ${user} on ${EEEE} at ${time}","YEAR":"Shared by ${user} on ${date_long}"},"RELATED_MICROBLOG":"This file is associated with one or more status updates.","EVT_EDIT_MANY":{"MONTH":"${user} added ${list} as editors on ${MMM} ${d}","TODAY":"${user} added ${list} as editors today at ${time}","YESTERDAY":"${user} added ${list} as editors yesterday at ${time}","DAY":"${user} added ${list} as editors on ${EEEE} at ${time}","YEAR":"${user} added ${list} as editors on ${date_long}"},"EVT_VIEW_MANY":{"MONTH":"${user} shared with ${list} on ${MMM} ${d}","TODAY":"${user} shared with ${list} today at ${time}","YESTERDAY":"${user} shared with ${list} yesterday at ${time}","DAY":"${user} shared with ${list} on ${EEEE} at ${time}","YEAR":"${user} shared with ${list} on ${date_long}"},"SHARED_WITH_MANY":{"MONTH":"Shared with ${user} and ${count} on ${MMM} ${d}","TODAY":"Shared with ${user} and ${count} today at ${time}","YESTERDAY":"Shared with ${user} and ${count} yesterday at ${time}","DAY":"Shared with ${user} and ${count} on ${EEEE} at ${time}","YEAR":"Shared with ${user} and ${count} on ${date_long}"},"SHARED_WITH_TWO_1":"one other"},"SUBSCRIBE_TO_PAGE":"Feed for this Page","EXTERNAL_USER":"External user","CREATE_COLLECTION":{"ACTION_IN_MENU":"Folder...","ACTION_TOOLTIP_SUB_COLLECTION":"Create a new folder to put files into","ACTION":"New Folder","ACTION_SUB_COLLECTION":"New Folder...","ACTION_TOOLTIP":"Create a new folder to put files into"},"VERSIONCOMPARISON":{"ERRORS":{"DEFAULT":{"TITLE":"Unable to show version comparison","MESSAGES":"Version ${0} cannot be used for a comparison because there is a problem converting it to wiki text.  Return to the file and try comparing other versions."},"TWO":{"TITLE":"Unable to show version comparison","MESSAGES":"Versions ${0} and ${1} cannot be used for a comparison because there is a problem converting them to wiki text.  Return to the file and try comparing other versions."}}},"SERVICETITLE":"Atom Publishing Protocol Service Document","FORCE_MOVE":{"DIALOG_TITLE":"Force Move","OK_HERE":"Move Here","ACTION":"Force Move","BUSY":"Moving...","ACTION_TOOLTIP":"Force Move","CANCEL":"Cancel","MULTI_ITEMS":{"VISIBILITY_CHANGE_FILE_1":"File ${item} will be made to visible to everyone in your organization.","VISIBILITY_FOLDER_FILE_1":"Files in folder ${item} will be removed because they are not visible to everyone. All other files will become visible to everyone in your organization.","VISIBILITY_CHANGE_FOLDER_1":"Folder ${item} contains one or more files are not visible to everyone in your organization. These files will be removed.","RESHAREOFF_FOLDER_FILE_1":"Files in folder ${item} will be removed because the owner does not allow others to share. All other files will become visible to everyone in your organization.","RESHARE_OFF_FOLDER_1":"Folder ${item} contains one or more files that the owner does not allow others to share. These files will be removed.","VISIBILITY_CHANGE_FILE_X":"${filecount} files will be made to visible to everyone in your organization.","VISIBILITY_FOLDER_FILE_X":"Files in ${foldercount} folders will be removed because they are not visible to everyone. All other files will become visible to everyone in your organization.","VISIBILITY_CHANGE_FOLDER_X":"${foldercount} folders contains one or more files are not visible to everyone in your organization. These files will be removed.","RESHAREOFF_FOLDER_FILE_X":"Files in ${foldercount} folders will be removed because the owner does not allow others to share. All other files will become visible to everyone in your organization.","RESHARE_OFF_FOLDER_X":"${foldercount} folders contain one or more files that the owner does not allow others to share. These files will be removed."},"OK":"Move","FILE":{"VISIBILITY_CHANGE_MESSAGE_FOLDER_X":"These folders contain one or more files that the owner does not allow others to share. These files will be removed.","INFO_SUCCESS":"The file was moved to ${target}.","SOURCE_PARENT_NOT_FOUND":"The folder that contains the file you want to move does not exist any more.","VISIBILITY_CHANGE_MESSAGE":"This file will be made to visible to everyone in your organization","ACCESS_DENIED":"You do not have permission to move the file into ${target}.","ERROR":"The file was not moved to ${target} due to an error.","ITEM_NOT_FOUND_IN_SOURCE_PARENT":"The selected file does not exist in the source folder any more.","ITEM_NOT_FOUND":"The selected file does not exist any more.","FILE":{"SOURCE_NOT_MOVEABLE":"The selected file cannot be moved."},"VISIBILITY_CHANGE_MESSAGE_X":"These files will be made to visible to everyone in your organization","TARGET_PARENT_NOT_FOUND":"The target folder you want to move the selected file to does not exist any more."},"FOLDER":{"INFO_SUCCESS":"The folder was moved to ${target}.","VISIBILITY_CHANGE_MESSAGE":"Files that are not visible to everyone in your organization will be removed from this folder","SOURCE_PARENT_NOT_FOUND":"The folder that contains this folder you want to move does not exist any more.","ERROR":"The folder was not moved to ${target} due to an error.","ITEM_NOT_FOUND_IN_SOURCE_PARENT":"The selected folder does not exist in the source folder any more.","ITEM_NOT_FOUND":"The selected folder does not exist any more.","RESHARE_OFF_CHANGE_MESSAGE":"This folder contains one or more files that the owner does not allow others to share.  These files will be removed.","SOURCE_NOT_MOVEABLE":"The selected folder cannot be moved.","TARGET_PARENT_NOT_FOUND":"The target folder you want to move the selected folder to does not exist any more."}},"ERROR_IN_APP_MESSAGE":"Click the browser back button to return to the previous page and try again.  If this error persists, report the problem to your administrator.","JAVASCRIPT_DISABLED_TITLE":"Turn on JavaScript","JUMPT_TO_SUMMARYPAGE":{"ACTION":"Summary","ACTION_TOOLTIP":"Go to the detailed page of this file","NAME":"Summary"},"ERROR_DETAILS":"Report this problem to your administrator.","MOVE_COLLECTION":{"DIALOG_TITLE":"Move to...","WARN_PUBLIC":"Adding this folder to the selected folder will make the folder public (shared with everyone).","CROSS_COMMUNITY_MOVE_NOT_ALLOWED":"The folder cannot be moved the a folder in another community.","INFO_SUCCESS_1":"The folder was moved to ${target}.","ACCESS_DENIED_1":"Only folder owners can move the top level folder.","INTERNAL_FOLDER_TO_EXTERNAL_FOLDER":"The move failed because ${collection} is an internal folder and ${target} can be shared outside of your organization.","ACCESS_DENIED":"You do not have permission to move the folder to ${target}.","ITEM_EXISTS_SUBFOLDER":"There is already a folder named ${collection} in this folder. Rename one of the folders if you want to try again.","ACTION_TOOLTIP":"Move this folder","SOURCE_NOT_MOVEABLE":"The selected folder cannot be moved.","OK":"Move","ACTION_LONG":"Move to...","SOURCE_PARENT_NOT_FOUND":"The folder that contains the folder you want to move does not exist any more.","COLLECTION_TYPE_MISSMATCH":"It is not allowed to move personal folder to community owned folder or move community owned folder to personal folder.","ERROR":"The folder was not moved to ${target} due to an error.","ITEM_NOT_FOUND_IN_SOURCE_PARENT":"The selected folder does not exist in the source folder any more.","ITEM_NOT_FOUND":"The selected folder you want to move does not exist any more.","ITEM_EXISTS_TOPFOLDER":"You already own a top level folder named ${collection}. Rename one of the folders if you want to try again.","INFO":"Moving the folder will cause other people to lose access to the folder and its content.","TARGET_PARENT_NOT_FOUND":"The target folder you want to move to does not exist any more.","CANNOT_MOVE_PERSONALFOLDER_TO_COMMUNITYFOLDER":"You cannot move a personal folder into a community folder.","ACTION":"Move","CANNOT_MOVE_COMMUNITYFOLDER_TO_PERSONALFOLDER":"You cannot move a community folder into a personal folder.","INVALID_TARGET":"Folders cannot be moved into their own subfolders.","BUSY":"Moving...","CANCEL":"Cancel","OK_MOVE_HERE":"Move Here"},"ELLIPSIS":"...","TOGGLE_FOLLOWING_FILE":{"FOLLOW":{"INFO_SUCCESS":"You are now following this file: ${0}."},"ERROR_CANCEL":"The file could not be updated because the request was cancelled. Please try again.","STOP_FOLLOWING":{"INFO_SUCCESS":"You have stopped following this file: ${0}. "},"ERROR":"The file could not be updated. Please try again later.","ACTION_ADD":"Follow","ERROR_TIMEOUT":"The file could not be updated because the server could not be contacted. Please try again.","ACTION_TOOLTIP":"Toggle whether you will receive updates about this file","ACTION_REMOVE":"Stop Following","ERROR_NOT_FOUND":"The file could not be updated because it has been deleted or is no longer shared with you.","ACTION_ERROR":"Error","ERROR_NOT_LOGGED_IN":"The file could not be updated because you were not logged in. Please log in and try again."},"CONTINUE_TO_APP":"Continue to Files","CREATE_COMMUNITY_FILE":{"DIALOG_TITLE":"Upload Files","ACTION":"New Upload...","ACTION_TOOLTIP":"Upload files from your computer","OK":"Upload"},"SCENE_TITLE_FILE":"File: ${0}","ERROR_IN_APP_TITLE":"We are unable to process your request","WELCOMECONTENT":{"BLURB_LOG_IN":"Log in to start using Files.","BLURB_HELP":"Tip: Click ${helpLink} to see help on a specific feature or click Help to view all help topics.","BLURB_UPLOAD":"Click \"Upload Files\" to add a file.","HELP_ALT":"Help","TAKE_TOUR":"View Demo","LEARN_MORE":"Learn More","BLURB1":"{0}Add your own files{1}.","BLURB2":"{0}Find files{1} by searching or looking in different views.","BLURB3":"{0}Edit, comment on, and \"like\" {1} files to recommend to others.","CLOSE":"Close Files Welcome Panel","TITLE":"New to Files?","BLURB4":"Download {0}IBM Connections Plug-ins{1} and use Sync.","BLURB":"Create and collaborate on content with colleagues. Learn how to:"},"CLOSE":"Close","RECENT_SHARES":{"TITLE":"People recently shared with","ERROR":"Server could not be contacted.","ALT":"Recent People","EMPTY":"You have not shared with anyone yet."},"TOGGLE_SECTION":"Expand and collapse this section","FILTERS":{"SHARED_WITH":{"OPTION_EMPTY":"With a specific person:","NOT_PUBLIC_LONG":"Shared with you and not visible to everyone in the owner\'s organization","OPTION_EMPTY_TOOLTIP":"Only show files that were shared with a specific person","PUBLIC":"and everyone in my organization","PUBLIC_TOOLTIP":"Files that are shared with you and visible to everyone in the owner\'s organization","COLLAPSE":"Collapse the shared with filter","PUBLIC_LONG":"Shared with you and visible to everyone in the owner\'s organization","NOT_PUBLIC":"and not everyone in my organization","OPTION":"With ${0}","TITLE":"Shared With","FILTER":"Shared with ${0}","NOT_PUBLIC_TOOLTIP":"Files that shared with you but that are not visible to everyone in the owner\'s organization","EXPAND":"Expand the shared with filter"},"SEARCH":{"TITLE":"Search for \"${0}\""},"COLLECTION_CREATOR":{"OPTION_ME":"Me","OPTION_EMPTY":"Enter a person directly:","OPTION":"by ${0}","OPTION_EMPTY_TOOLTIP":"Only show folders created by a specific person","TITLE":"Created By","FILTER":"Created by ${0}","EXPAND":"Expand the creator filter","HEADER":"Created By:","COLLAPSE":"Collapse the creator filter"},"COLLECTION_NAME":{"OPTION":"contains \'${0}\'","FILTER":"Name contains \'${0}\'","TITLE":"Folder name","EXPAND":"Expand the folder name filter","COLLAPSE":"Collapse the folder name filter"},"MY_TAGS":{"TITLE":"Tags","EXPAND":"Expand the tags filter","COLLAPSE":"Collapse the tags filter","HEADER":"Tags:"},"USER_TAGS":{"TITLE":"Tags","EXPAND":"Expand the tags filter","COLLAPSE":"Collapse the tags filter","HEADER":"Tags:"},"DATE":{"TODAY":{"TOOLTIP":"Only updated since midnight today","NAME":"Today","LONG":"Only updated since midnight today "},"LASTYEAR":{"TOOLTIP":"Only updated in the last 365 days","NAME":"Last 365 days","LONG":"Only updated in the last 365 days "},"TITLE":"Date Updated","EXPAND":"Expand the date updated filter","LASTWEEK":{"TOOLTIP":"Only updated in the last 7 days","NAME":"Last 7 days","LONG":"Only updated in the last 7 days "},"LASTMONTH":{"TOOLTIP":"Only updated in the last 30 days ","NAME":"Last 30 days","LONG":"Only updated in the last 30 days "},"HEADER":"Date Updated:","COLLAPSE":"Collapse the date updated filter"},"PERMISSION":{"OUTBOUND":{"EDIT_LONG":"Shared with as an editor","VIEW_LONG":"Files other people can read but not edit","TITLE":"Role","VIEW_TOOLTIP":"Files other people can read but not edit","EXPAND":"Expand the role filter","HEADER":"Role:","COLLAPSE":"Collapse the role filter","EDIT_TOOLTIP":"Show only files other people can edit"},"VIEW":"Reader","INBOUND":{"EDIT_LONG":"Shared as an editor","VIEW_LONG":"Files you can read but not edit","TITLE":"Role","VIEW_TOOLTIP":"Files you can read but not edit","EXPAND":"Expand the role filter","HEADER":"Role:","COLLAPSE":"Collapse the role filter","EDIT_TOOLTIP":"Show only files I can edit"},"EDIT":"Editor"},"SHARED_BY":{"OPTION_EMPTY":"By a specific person:","NOT_PUBLIC_LONG":"Shared by you and not visible to everyone in the owner\'s organization","OPTION_EMPTY_TOOLTIP":"Only show files that were shared by a specific person","PUBLIC":"and everyone in my organization","COLLAPSE":"Collapse the shared by filter","PUBLIC_TOOLTIP":"Files that are shared by you and visible to everyone in the owner\'s organization","PUBLIC_LONG":"Shared by you and visible to everyone in the owner\'s organization","NOT_PUBLIC":"and not everyone in my organization","OPTION":"by ${0}","FILTER":"Shared by ${0}","TITLE":"Shared By","NOT_PUBLIC_TOOLTIP":"Files that are shared by you but are not visible to everyone in the owner\'s organization","EXPAND":"Expand the shared by filter"},"DATE_SHARED":{"TODAY":{"TOOLTIP":"Only shared since midnight today","NAME":"Today","LONG":"Only shared since midnight today "},"LASTYEAR":{"TOOLTIP":"Only shared in the last 365 days","NAME":"Last 365 days","LONG":"Only shared in the last 365 days "},"TITLE":"Date Shared","EXPAND":"Expand the date shared filter","LASTWEEK":{"TOOLTIP":"Only shared in the last 7 days","NAME":"Last 7 days","LONG":"Only shared in the last 7 days "},"LASTMONTH":{"TOOLTIP":"Only shared in the last 30 days ","NAME":"Last 30 days","LONG":"Only shared in the last 30 days "},"HEADER":"Date Shared:","COLLAPSE":"Collapse the date shared filter"},"ALL_TAGS":{"TITLE":"${company} tags","EXPAND":"Expand the tags filter","COLLAPSE":"Collapse the tags filter","HEADER":"Public Tags:"},"DATE_CREATED":{"TODAY":{"TOOLTIP":"Only created since midnight today ","NAME":"Today","LONG":"Only created since midnight today "},"LASTYEAR":{"TOOLTIP":"Only created in the last 365 days","NAME":"Last 365 days","LONG":"Only created in the last 365 days"},"TITLE":"Date Created","EXPAND":"Expand the date created filter","LASTWEEK":{"TOOLTIP":"Only created in the last 7 days ","NAME":"Last 7 days","LONG":"Only created in the last 7 days "},"LASTMONTH":{"TOOLTIP":"Only created in the last 30 days ","NAME":"Last 30 days","LONG":"Only created in the last 30 days "},"HEADER":"Date Created:","COLLAPSE":"Collapse the date created filter"},"COLLECTION_ROLE":{"CONTRIBUTOR_LONG":"Shared with as contributor","HEADER":"Role:","COLLAPSE":"Collapse the folder role filter","EDITOR":"Editor","MANAGER":"Owner","EDITOR_LONG":"Shared with as editor","MANAGER_LONG":"Shared with as owner","EDITOR_TOOLTIP":"Show only the folders to which I can edit","MANAGER_TOOLTIP":"Show only the folders I can share with other people","TITLE":"Role","EXPAND":"Expand the folder role filter","CONTRIBUTOR":"Contributor","CONTRIBUTOR_TOOLTIP":"Show only the folders to which I can add files"},"COLLECTION_SHARED_WITH_ME":{"PUBLIC_LONG":"Folders visible to everyone in the owner\'s organization","NOT_PUBLIC_SHORT":"but not my entire organization","NOT_PUBLIC":"and not visible to everyone in your organization","NOT_PUBLIC_LONG":"Folders that aren\'t visible to everyone in the owner\'s organization","PUBLIC_SHORT":"and my entire organization","NOT_PUBLIC_TOOLTIP":"Folders that aren\'t visible to everyone in your organization but are shared with one or more people","PUBLIC":"and organization","PUBLIC_TOOLTIP":"Folders that are shared with you and your organization"},"EVENT":{"SHARED_WITH":"Shared with","COMMENTS":"Comments","TITLE":"Events","PEOPLE_JOINED":"People joined","RECOMMENDATIONS":"Likes","MEDIA_UPDATES":"File updates"},"TYPE":{"FILES_LONG":"Uploaded files only","PAGES":"rich-text files","PAGES_LONG":"Rich-text files only","FILES":"uploaded files","PAGES_TOOLTIP":"All rich-text files created by this person","TITLE":"Type","EXPAND":"Expand the type filter","FILES_TOOLTIP":"Any file that was uploaded from a computer","COLLAPSE":"Collapse the type filter"},"COLLECTION_TYPE":{"PUBLIC_LONG":"Folders shared with everyone in your organization","PRIVATE":"With no one (private)","SHARED":"With specific people","SHARED_LONG":"Shared Folders","PRIVATE_TOOLTIP":"Folders that only I can see","PRIVATE_LONG":"Private to me","TITLE":"Sharing","SHARED_TOOLTIP":"Visible only to members but can contain any type of file","PUBLIC":"With an organization","EXPAND":"Expand the sharing filter","PUBLIC_TOOLTIP":"Visible to everyone in your organization and can only contain files with organization access.","COLLAPSE":"Collapse the sharing filter"},"SHARE":{"SELECTIVE_TOOLTIP":"Files that are not shared with everyone in your organization but are shared with one or more people","PRIVATE":"With no one (private)","NOT_PUBLIC_LONG":"Files that are not shared with everyone in your organization but are shared with one or more people","PRIVATE_TOOLTIP":"Files that only I can see","PUBLIC":"With an organization","HEADER":"Sharing:","PUBLIC_TOOLTIP":"Files that are visible to everyone in the owner\'s organization","COLLAPSE":"Collapse the sharing filter","PUBLIC_LONG":"Files that are visible to everyone in the owner\'s organization","NOT_PUBLIC":"With one or more people","PRIVATE_LONG":"Private to me","TITLE":"Sharing","NOT_PUBLIC_TOOLTIP":"Files that are not shared with everyone in your organization but are shared with one or more people","EXPAND":"Expand the sharing filter","SELECTIVE":"With one or more people","SELECTIVE_LONG":"Files that are not shared with everyone in your organization but are shared with one or more people"}},"OK":"OK","ADD_FILE_TO_COLLECTION":{"BULK_INFO_FAIL_X_IN_OTHER_FOLDERS":"${count} files were added to ${collectionlink}. Some files were failed due to permission limitation or reshare is off. Some files are also in other folders. View sharing tab of each file for details.","BULK_WARN_FAIL_SUCCESS_EXIST_INTERNAL_EXTERNAL_1":"${filelink} was added in ${collectionlink}. Some files were already added in the folder. Some files were not added because ${collectionlink} is a folder that can be shared outside of your organization and the files cannot.","BULK_WARN_FAIL_INTERNAL_EXTERNAL_1":"${filelink} was added in ${collectionlink}. Some files were not added because ${collectionlink} is a folder that can be shared outside of your organization and the files cannot.","NO_FILTERED_COLLECTIONS":"You are not a contributor or owner of any folder with the specified name.","BULK_WARN_FAIL_SUCCESS_EXIST_ACCESS_DENIED_1":"${filelink} was added in ${collectionlink}. Some files were already added in the folder. Some files were not added because you do not have permission.","BULK_INFO_FAIL_X_EXIST_RESHAREOFF":"${count} files were added to ${collectionlink}. Some files have existed in the folder. Some files were not added because the owner does not allow others to share them.","BULK_WARN_FAIL_ACCESS_DENIED_1":"${filelink} was added in ${collectionlink}. Some files were not added because you do not have permission.","OK_TITLE":"Add this file to the selected folder","BULK_INFO_FAIL_ITEM_EXISTS_X_IN_OTHER_FOLDERS":"${count} files were added to ${collectionlink}. Some files are already in this folder. Some files are also in other folders. View sharing tab of each file for details.","INFO_SUCCESS_1_IN_OTHER_FOLDERS":"${filelink} was added to ${collectionlink}. ${undolink}. It is also in other folders. View the sharing tab of this file for details.","ACTION_ENABLED":"Add to folder button is enabled","NO_PRIVATE_COLLECTIONS":"You cannot add a shared or private file to a public folder. You do not have a private folder at this time.","FILTER_TOOLTIP":"Enter a folder name","WARN_PUBLIC_XX":"Adding these files to the selected folder will make the file public.","BULK_ERROR_FAIL_INTERNAL_EXTERNAL_1":"${filelink} was not added because ${collectionlink} is a folder that can be shared outside of your organization and the file cannot.","INFO_SUCCESS_SHARED_1":"${filelink} was added to ${collectionlink} and is now shared. ${undolink}","INFO_SUCCESS_PUBLIC_1":"${filelink} was added to ${collectionlink} and is now public. ${undolink}","BULK_ERROR_FAIL_ACCESS_DENIED_1":"${filelink} was not added because you do not have permission.","BULK_WARN_FAIL_SUCCESS_EXIST_INTERNAL_EXTERNAL_X":"${succeedcount} files were added in ${collectionlink}. Some files were already added in the folder. Some files were not added because ${collectionlink} is a folder that can be shared outside of your organization and the files cannot.","BULK_INFO_FAIL_PERMISSION_DENIED":"You do not have permission to add files to ${collectionlink}.","BULK_WARN_FAIL_INTERNAL_EXTERNAL_X":"${succeedcount} files were added in ${collectionlink}. Some files were not added because ${collectionlink} is a folder that can be shared outside of your organization and the files cannot.","ERROR_NOT_FOUND_1":"The file was not added because the selected folder has been deleted or is no longer shared with you.","ACTION_TOOLTIP_X":"Add ${0} files to a folder","LABEL_PUBLIC":"You are allowed to contribute to the following folders","BULK_INFO_FAIL_X_EXIST_COM":"${count} files were added to ${collectionlink}. Some files have existed in the folder. Some community files were not added into a personal folder.","BULK_WARN_FAIL_SUCCESS_EXIST_ACCESS_DENIED_X":"${succeedcount} files were added in ${collectionlink}. Some files were already added in the folder. Some files were not added because you do not have permission.","ACTION":"Add to Folder","BULK_WARN_FAIL_ACCESS_DENIED_X":"${succeedcount} files were added in ${collectionlink}. Some files were not added because you do not have permission.","BULK_WARN_FAIL_SUCCESS_EXIST_CONSTRAINTVIOLATION_1":"${filelink} was added in ${collectionlink}. Some files were already added in the folder. Some files were not added because ${collectionlink} is visibile to everyone in your organization. Only the owner can make this move.","BULK_WARN_FAIL_CONSTRAINTVIOLATION_1":"${filelink} was added in ${collectionlink}. some files were not added because ${collectionlink} is visibile to everyone in your organization. Only the owner can make this move.","MOST_RECENT_COLLECTION":"The last folder selected was ${collectionName}","BULK_INFO_FAIL_PERSONAL_TO_COMMUNITY":"You cannot move personal files shared with the community into a community folder.","BULK_WARN_FAIL_SUCCESS_EXIST_COMMUNITY_TO_PERSONAL_1":"${filelink} was added in ${collectionlink}. Some files were already added in the folder. Some files were not added because community files can not added in a personal folder.","INTERNAL_FOLDERS_ONLY":"This file cannot be added to folder that can be shared outside of your organization.","BULK_ERROR_FAIL_INTERNAL_EXTERNAL_X":"${count} files were not added to this folder because ${collectionlink} is a folder that can be shared outside of your organization and the files cannot.","BULK_INFO_FAIL_COMMUNITY_TO_PERSONAL_X":"${count} files were added to ${collectionlink}. Some community files were not added into a personal folder.","BULK_WARN_FAIL_COMMUNITY_TO_PERSONAL_1":"${filelink} was added in ${collectionlink}. Some files were not added because community files can not added in a personal folder.","INFO_SUCCESS_SHARED_X":"${filelink} was added to ${count} folders and is now shared. ${undolink}","BULK_ERROR_FAIL_EXISTS_1":"${filelink} was already in ${collectionlink}.","SHOW_ONLY_SOME_FOLDERS":"Showing only folders to which you can add this content.","INFO_SUCCESS_PUBLIC_X":"${filelink} was added to ${count} folders and is now public. ${undolink}","BULK_INFO_FAIL_VISIBILITY":"Files were not added because ${collectionlink} is visibile to everyone in your organization, only the owner can add files to public folder.","BULK_ERROR_FAIL_ACCESS_DENIED_X":"${count} files were not added because you do not have permission.","BULK_INFO_SUCCESS_X_IN_OTEHR_FOLDER":"${count} files were added to ${collectionlink}. Some files are also in other folders. View sharing tab of each file for details.","ERROR_NOT_FOUND_X":"The file was not added because one or more of the selected folders have been deleted or are no longer shared with you.","BULK_ERROR_FAIL_CONSTRAINTVIOLATION_1":"${filelink} was not added because ${collectionlink} is visibile to everyone in your organization. Only the owner can make this move.","BULK_WARN_FAIL_SUCCESS_EXIST_PERSONAL_TO_COMMUNITY_1":"${filelink} was moved in ${collectionlink}. Some files were already in the folder. Some files were not added because personal files can not added in a community folder.","BULK_INFO_FAIL_ITEM_EXISTS_1":"${count} file was added to ${collectionlink}. Some files are already in this folder.","BULK_INFO_FAIL_ITEM_EXISTS_1_IN_OTHER_FOLDERS":"${count} file was added to ${collectionlink}. Some files are already in this folder. Some files are also in other folders. View sharing tab of each file for details.","ERROR_NOT_LOGGED_IN":"The file was not added because you were not logged in.  Click \'Add to Folder\' to add the file.","BULK_INFO_FAIL_PERSONAL_TO_COMMUNITY_X":"${count} files were added to ${collectionlink}. Some personal files were not added into a community folder.","BULK_WARN_FAIL_PERSONAL_TO_COMMUNITY_1":"${filelink} was moved in ${collectionlink}. Some files were not added because personal files can not added in a community folder.","PRIVATE_FOLDERS_ONLY":"Only the file owner can add this file to a public folder.","BULK_WARN_FAIL_EXIST_INTERNAL_EXTERNAL_1":"${filelink} was already added in ${collectionlink}. Some files were not added because ${collectionlink} is a folder that can be shared outside of your organization and the files cannot.","BULK_ERROR_FAIL_COMMUNITY_TO_PERSONAL_1":"${filelink} was not added because community files were not added in a personal folder.","BULK_WARN_FAIL_EXISTS_1":"${filelink} was added in ${collectionlink}. ${existcount} files were already in the folder.","ACTION_DISABLED":"Add to folder button is disabled","BULK_WARN_FAIL_SUCCESS_EXIST_CONSTRAINTVIOLATION_X":"${succeedcount} files were added in ${collectionlink}. Some files were already added in the folder. Some files were not added because ${collectionlink} is visibile to everyone in your organization. Only the owner can make this move.","BULK_WARN_FAIL_EXIST_ACCESS_DENIED_1":"${filelink} was already added in ${collectionlink}. Some files were not added because you do not have permission.","BULK_WARN_FAIL_CONSTRAINTVIOLATION_X":"${succeedcount} files were added in ${collectionlink}. Some files were not added because ${collectionlink} is visibile to everyone in your organization. Only the owner can make this move.","BULK_WARN_FAIL_SUCCESS_EXIST_COMMUNITY_TO_PERSONAL_X":"${succeedcount} files were added in ${collectionlink}. Some files were already added in the folder. Some files were not added because community files can not added in a personal folder.","BULK_WARN_FAIL_COMMUNITY_TO_PERSONAL_X":"${succeedcount} files were added in ${collectionlink}. Some files were not added because community files can not added in a personal folder.","BULK_ERROR_FAIL_EXISTS_X":"${existcount} files were already in ${collectionlink}.","WARN_PUBLIC_1":"Adding this file to the selected folder will make the file public (shared with everyone).","BULK_WARN_FAIL_SUCCESS_EXIST_RESHARE_OFF_1":"${filelink} was added in ${collectionlink}. Some files were already added in the folder. Some files were not added because the owner does not allow others to share them.","FILTER":"Folders named \'${0}\'","BULK_INFO_SUCCESS_X":"${count} files were added to ${collectionlink}.","BULK_WARN_FAIL_RESHARE_OFF_1":"${filelink} was added in ${collectionlink}. Some files were not added because the owner does not allow others to share them.","HEADLESS":{"ERROR_CANCEL":"${filelink} was not added because the request was cancelled.","ERROR_ACCESS_DENIED_1":"You do not have permission to add files to ${collectionlink}.","ERROR_NOT_FOUND_1":"${filelink} was not added because ${filelink} or ${collectionlink} has been deleted or is no longer shared with you.","ERROR_UNSHAREABLE_FILE":"Only the file owner can add ${filelink} to a folder.","ERROR_NOT_FOUND_2":"Community-owned files cannot be added to a personal folder.","ERROR_ACCESS_DENIED_X":"You do not have permission to add files to one or more of the selected folders.","ERROR":"${filelink} was not added to ${collectionlink} due to an error.","ERROR_NOT_FOUND_X":"${filelink} was not added because ${filelink} or one or more of the selected folders have been deleted or are no longer shared with you.","ERROR_TIMEOUT":"${filelink} was not added because the server could not be contacted.","ERROR_EXTERNAL_COLLECTION":"${filelink} was not added because the folder can be shared outside of your organization and the file cannot.","ERROR_PUBLIC_COLLECTION":"Only the file owner can add ${filelink} to a public folder.","ERROR_NOT_LOGGED_IN":"${filelink} was not added because you were not logged in. Please log in and try again."},"BULK_ERROR_FAIL_PERSONAL_TO_COMMUNITY_1":"${filelink} was not added because personal files were not added in a community folder.","CANCEL":"Cancel","BULK_INFO_FAIL_X":"${count} files were added to ${collectionlink}. Some files were failed due to permission limitation or reshare is off.","INFO_EXISTS_1":"${filelink} was already in ${collectionlink}.","DIALOG_TITLE":"Add to Folder","BULK_ADD_COMMUNITY_ADD_MOVE_1":"${additem} was added to ${collectionlink}, ${movecount} files were moved to ${collectionlink}.","BULK_ERROR_FAIL_CONSTRAINTVIOLATION_X":"${count} files were not added because because ${collectionlink} is visibile to everyone in your organization. Only the owner can make this move.","BULK_WARN_FAIL_SUCCESS_EXIST_PERSONAL_TO_COMMUNITY_X":"${succeedcount} files were moved in ${collectionlink}. Some files were already in the folder. Some files were not added because personal files can not added in a community folder.","BULK_INFO_FAIL_ITEM_EXISTS_X":"${count} files were added to ${collectionlink}. Some files are already in this folder.","INFO_SUCCESS_1":"${filelink} was added to ${collectionlink}. ${undolink}","BULK_WARN_FAIL_PERSONAL_TO_COMMUNITY_X":"${succeedcount} files were moved in ${collectionlink}. Some files were not added because personal files can not added in a community folder.","BULK_WARN_FAIL_EXIST_INTERNAL_EXTERNAL_X":"${existcount} files were already added in ${collectionlink}. Some files were not added because ${collectionlink} is a folder that can be shared outside of your organization and the files cannot.","BULK_ERROR_FAIL_COMMUNITY_TO_PERSONAL_X":"${count} files were not added because community files were not added in a personal folder.","BULK_WARN_FAIL_EXISTS_X":"${succeedcount} files were added in ${collectionlink}. ${existcount} files were already in the folder.","ACTION_X":"Add to Folder","BULK_ERROR_FAIL_RESHARE_OFF_1":"${filelink} was not added because the owner does not allow others to share it.","BULK_WARN_FAIL_EXIST_ACCESS_DENIED_X":"${existcount} files were already added in ${collectionlink}. Some files were not added because you do not have permission.","SHARE_AS_EDITOR":"Allow members of the selected folder to edit this file","WARN_PUBLIC_X":"Adding this file to the selected folders will make the file public (shared with everyone).","BULK_WARN_FAIL_SUCCESS_EXIST_RESHARE_OFF_X":"${succeedcount} files were added in ${collectionlink}. Some files were already added in the folder. Some files were not added because the owner does not allow others to share them.","ERROR_PUBLIC_COLLECTION":"Only the file owner can add this file to a public folder.","BULK_WARN_FAIL_EXIST_CONSTRAINTVIOLATION_1":"${filelink} was already added in ${collectionlink}. Some files were not added because ${collectionlink} is visibile to everyone in your organization. Only the owner can make this move.","BULK_WARN_FAIL_RESHARE_OFF_X":"${succeedcount} files were added in ${collectionlink}. Some files were not added because the owner does not allow others to share them.","BULK_INFO_FAIL_RESHAREOFF":"The files cannot be moved here because the owner does not allow others to share them.","BULK_ERROR_FAIL_PERSONAL_TO_COMMUNITY_X":"${count} files were not added because personal files were not added in a community folder.","BULK_WARN_FAIL_EXIST_COMMUNITY_TO_PERSONAL_1":"${filelink} was already added in ${collectionlink}. Some files were not added because community files can not added in a personal folder.","INTERNAL_PRIVATE_FOLDERS_ONLY":"This file cannot be added to public folder or folders that can be shared outside of your organization.","INFO_EXISTS_X":"${filelink} was already in the selected folders.","BULK_ADD_COMMUNITY_ADD_MOVE_X":"${addcount} files were added to ${collectionlink}, ${movecount} files were moved to ${collectionlink}.","INFO_SUCCESS_X":"${filelink} was added to ${count} folders. ${undolink}","BULK_ADD_COMMUNITY_MOVE_X":"${count} files were moved to ${collectionlink}.","DESCRIPTION_LABEL":"Description: ","ERROR_ACCESS_DENIED_1":"You do not have permission to add files to the selected folder.","ERROR_CANCEL":"The file was not added because the request was cancelled.  Click \'Add to Folder\' to try your request again.","BULK_INFO_FAIL_COMMUNITY_TO_PERSONAL":"You cannot move community files into a personal folder that is shared with the community.","ERROR_UNSHAREABLE_FILE":"Only the file owner can add this file to a folder.","BULK_ERROR_FAIL_RESHARE_OFF_X":"${count} files were not added because the owner does not allow others to share them.","FIND":"Find","BULK_WARN_FAIL_EXIST_PERSONAL_TO_COMMUNITY_1":"${filelink} was already in ${collectionlink}. Some files were not added because personal files can not added in a community folder.","ERROR_EXTERNAL_COLLECTION":"The file was not added to this folder because the folder can be shared outside of your organization and the file cannot. ","ALLOW_EDITORS_TO_EDIT_THIS_FILE":"Allow folder editors to edit this file","SELECT_COLLECTION":"You must select a folder that this file will be added to.","BULK_WARN_FAIL_EXIST_CONSTRAINTVIOLATION_X":"${existcount} files were already added in ${collectionlink}. Some files were not added because ${collectionlink} is visibile to everyone in your organization. Only the owner can make this move.","BULK_ADD_COMMUNITY_MOVE_ADD_1":"${additem} was added to ${collectionlink}, ${moveitem} was moved to ${collectionlink}.","BULK_INFO_FAIL_ALL_ITEM_EXISTS_X":"All the selected files were already in ${collectionlink}. ","BULK_WARN_FAIL_EXIST_COMMUNITY_TO_PERSONAL_X":"${existcount} files were already added in ${collectionlink}. Some files were not added because community files can not added in a personal folder.","BULK_INFO_FAIL_X_EXIST_PER":"${count} files were added to ${collectionlink}. Some files have existed in the folder. Some personal files were not added into a community folder.","BULK_WARN_FAIL_EXIST_RESHARE_OFF_1":"${filelink} was already added in ${collectionlink}. Some files were not added because the owner does not allow others to share them.","ERROR_ACCESS_DENIED_X":"You do not have permission to add files to one or more of the selected folders.","ACTION_TOOLTIP":"Add this file to a folder","OK":"Add to Folder","BULK_WARN_FAIL_EXIST_PERSONAL_TO_COMMUNITY_X":"${existcount} files were already in ${collectionlink}. Some files were not added because personal files can not added in a community folder.","UNDO":{"ERROR_PUBLIC":{"CANCEL_ONE":"${filelink} was not removed from ${collectionlink} and is still public because the request was cancelled.","TIMEOUT":"Public access to ${filelink} was not removed because the server could not be contacted.","UNKNOWN_ONE":"${filelink} was not removed from ${collectionlink} and is still public due to an error.","CANCEL_MANY":"${filelink} was not removed from ${count} folders and is still public because the request was cancelled.","UNKNOWN_MANY":"${filelink} was not removed from ${count} folders and is still public due to an error.","TIMEOUT_ONE":"${filelink} was not removed from ${collectionlink} and is still public because the server could not be contacted.","UNKNOWN":"Public access to ${filelink} was not removed due to an error.","CANCEL":"Public access to ${filelink} was not removed because the request was cancelled.","TIMEOUT_MANY":"${filelink} was not removed from ${count} folders and is still public because the server could not be contacted."},"STATUS":"Removing...","INFO_SUCCESS_SHARED_1":"${filelink} was removed from ${collectionlink} and is no longer shared.","INFO_SUCCESS_1":"${filelink} was removed from ${collectionlink}.","ACTION":"Undo","INFO_SUCCESS_PUBLIC_1":"${filelink} was removed from ${collectionlink} and is no longer public.","ERROR_BASE":{"CANCEL_ONE":"${filelink} was not removed from ${collectionlink} because the request was cancelled.","TIMEOUT":"${filelink} was not removed because the server could not be contacted.","UNKNOWN_ONE":"${filelink} was not removed from ${collectionlink} due to an error.","UNKNOWN_MANY":"${filelink} was not removed from ${count} folders due to an error.","CANCEL_MANY":"${filelink} was not removed from ${count} folders because the request was cancelled.","TIMEOUT_ONE":"${filelink} was not removed from ${collectionlink} because the server could not be contacted.","UNKNOWN":"${filelink} was not removed due to an error.","CANCEL":"${filelink} was not removed because the request was cancelled.","TIMEOUT_MANY":"${filelink} was not removed from ${count} folders because the server could not be contacted."},"INFO_SUCCESS_SHARED_X":"${filelink} was removed from ${count} folders and is no longer shared.","INFO_SUCCESS_X":"${filelink} was removed from ${count} folders.","INFO_SUCCESS_PUBLIC_X":"${filelink} was removed from ${count} folders and is no longer public."},"ACTION_LONG":"Add to Folder...","ERROR":"The file was not added due to an error.","ERROR_TIMEOUT":"The file was not added because the server could not be contacted.  Click \'Add to Folder\' to try your request again.","MOST_RECENT_COLLECTION_TOOLTIP":"Add file to this folder","NO_COLLECTIONS_FOR_EDITOR_OR_OWNER":"You are not an editor or owner of any folders.","BULK_ADD_COMMUNITY_MOVE_ADD_X":"${addcount} files were added to ${collectionlink}, ${moveitem} was moved to ${collectionlink}.","OK_ADD_HERE":"Add Here","STATUS":"Adding...","NO_COLLECTIONS":"You are not a contributor or owner of any folders.","BULK_WARN_FAIL_EXIST_RESHARE_OFF_X":"${existcount} files were already added in ${collectionlink}. Some files were not added because the owner does not allow others to share them.","LABEL_PRIVATE":"You are allowed to contribute to the following private folders","BUSY":"Adding...","NO_FILTERED_COLLECTIONS_FOR_EDITOR_OR_OWNER":"You are not an editor or owner of any folder with the specified name."},"NAVIGATION_ALT":"Main navigation","DOCUMENTCONTENT":{"DOWNLOAD_WITH_FILE_SYNC_TOOLTIP":"This file is enabled for sync. Click to manually download ${0} (${1}).","LABEL_LOCKED_BY":{"MONTH":"Locked on ${date} by ${user}. ${unlock}","TODAY":"Locked at ${time} by ${user}. ${unlock}","YESTERDAY":"Locked yesterday at ${time} by ${user}. ${unlock}","DAY":"Locked on ${date} by ${user}. ${unlock}","YEAR":"Locked on ${date_long} by ${user}. ${unlock}","FULL":"Locked on ${date_long} ${time_long} by ${user}. ${unlock}"},"DOWNLOAD_HTML":"Download as HTML","DOWNLOAD_TOOLTIP_V":"${0} Download this version (${1})","DOWNLOAD":"Download (${0})","NAME":"Filename:","DOWNLOAD_RTF":"RTF","SHAREDWITH_LINK":"Sharing","BROWSE_OTHER_UNK":"Browse Files","ATTACHMENTS":"Attachments (${0})","UNSELECT_ALL":"Unselect all items","SHARE_PROPAGATE_OFF":"Only the owner can share this file.","DOWNLOAD_PDF":"PDF","VERSIONS":"Versions (${0})","SHARE_INTENT":"Shared externally","DOWNLOAD_WARN_LONG":"This file may not download properly because it has a long file name.  To ensure a successful download, use your browser\'s Save As feature to download this file.","LABEL_UPDATED_OTHER":{"MONTH":"${user} updated on ${MMM} ${d}","TODAY":"Updated today at ${time} by ${user}","YESTERDAY":"Updated yesterday at ${time} by ${user}","DAY":"${user} updated on ${EEee} at ${time}","YEAR":"Updated on ${date_long} by ${user}","FULL":"${EEEE}, ${date_long} ${time_long}"},"PREVIEW":"Preview","REQUIRED_NAME":"*Name: ","SHAREDWITH":"Sharing","DOWNLOAD_TOOLTIP":"Download ${0} (${1})","OPEN_APP_TOOLTIP":"Open this file in the Files application","LABEL_SHARED":{"MONTH":"Shared ${MMM} ${d}","TODAY":"Shared today at ${time}","YESTERDAY":"Shared yesterday at ${time}","DAY":"Shared ${EEee}","YEAR":"Shared ${date_long}","FULL":"${EEEE}, ${date_long} ${time_long}"},"LABEL_UPDATED":{"MONTH":"Updated ${MMM} ${d}","TODAY":"Updated today at ${time}","YESTERDAY":"Updated yesterday at ${time}","DAY":"Updated ${EEee} at ${time}","YEAR":"Updated ${date_long}","FULL":"${EEEE}, ${date_long} ${time_long}"},"LABEL_ADDED":{"MONTH":"Created ${MMM} ${d}","TODAY":"Created today at ${time}","YESTERDAY":"Created yesterday at ${time}","DAY":"Created ${EEee} at ${time}","YEAR":"Created ${date_long}","FULL":"${EEEE}, ${date_long} ${time_long}"},"PICKER_WITH_FILE_SYNC_TOOLTIP":"${0} This file is enabled for sync.","SELECT_ALL":"Select all items","DOWNLOAD_NEW_VERSION":"(new version available) ","LABEL_ADDED_TO":{"MONTH":"Added ${MMM} ${d}","TODAY":"Added today at ${time}","YESTERDAY":"Added yesterday at ${time}","DAY":"Added ${EEee} at ${time}","YEAR":"Added ${date_long}","FULL":"${EEEE}, ${date_long} ${time_long}"},"LABEL_SHARED_BY":{"MONTH":"Shared by ${user} on ${MMM} ${d}","TODAY":"Shared by ${user} today at ${time}","YESTERDAY":"Shared by ${user} yesterday at ${time}","DAY":"Shared by ${user} on ${EEee}","YEAR":"Shared by ${user} on ${date_long}","FULL":"${EEEE}, ${date_long} ${time_long}"},"CREATE_NEW_PAGE":"Create Rich-text File ","DOWNLOAD_PAGE_AS_RTF_TOOLTIP":"Download this file as rich text (${0})","DOWNLOAD_DISABLED_WITH_FILE_SYNC_TOOLTIP":"This file is enabled for sync.","LABEL_LOCKED":{"MONTH":"Locked on ${date}. ${unlock}","TODAY":"Locked at ${time}. ${unlock}","YESTERDAY":"Locked yesterday at ${time}. ${unlock}","DAY":"Locked on ${date}. ${unlock}","YEAR":"Locked on ${date_long}. ${unlock}","FULL":"Locked on ${date_long} ${time_long}. ${unlock}"},"SHARE_PROPAGATE_ON":"All readers can share this file.","NO_CONTENT":"No content","DESCRIPTION":"Description:","DOWNLOAD_LABEL":"Download as: ","SHARE_PROPAGATE_OWNER":"Allow other people to share this file?  When checked, everyone who can see the file will be able to share it.","DOWNLOAD_WARN":"!","SHARE_PROPAGATE_PUBLIC":"Everyone can share this file.","PREVIEW_TITLE":"Preview this file in a new window.","DOWNLOAD_PAGE_AS_PDF_TOOLTIP":"Download this file as a PDF (${0})","NODESCRIPFILE":"No description for this file","DOWNLOAD_PAGE_AS_HTML_TOOLTIP":"Download this file as html (${0})","LABEL_ADDED_OTHER":{"MONTH":"${user} created on ${MMM} ${d}","TODAY":"${user} created today at ${time}","YESTERDAY":"${user} created yesterday at ${time}","DAY":"${user} created on ${EEee} at ${time} ","YEAR":"${user} created on ${date_long}","FULL":"${EEEE}, ${date_long} ${time_long}"},"ERRORS":{"AUTH_REQUIRED_ANON":{"TITLE":"Log in to Files","MESSAGES":"To change whether you are following this file you must be logged in to Files. "},"ACCESS_DENIED_ANON":{"TITLE":"Access Denied","MESSAGES":"You do not have permission to view this file.  If this is your file or it has been shared with you, you must log in to Files first. "},"ACCESS_DENIED":{"TITLE":"Access Denied","MESSAGES":"You do not have permission to view this file.  The file is not shared with you."},"NOT_FOUND":{"TITLE":"File Not Found","MESSAGES":"The file you have requested has been deleted or moved or quarantined. If someone sent you this link, check that it is correct."},"LOGIN":"Log in now","VERSION_NOT_FOUND":"The version you requested does not exist."},"OPEN_TOOLTIP":"View this file in the browser","SHARE_INTENT_T":"Shared externally","OPEN_THIS":"Open this file","COMMENTS":"Comments (${0})","DOWNLOAD_THIS":"Download this file ","NODESCRIPPAGE":"No description for this file","LABEL_ADDED_TO_OTHER":{"MONTH":"${user} added on ${MMM} ${d}","TODAY":"Added by ${user} today at ${time}","YESTERDAY":"Added by ${user} yesterday at ${time}","DAY":"${user} added on ${EEee} at ${time} ","YEAR":"Added by ${user} on ${date_long}","FULL":"${EEEE}, ${date_long} ${time_long}"},"BROWSE_OTHER":"Browse Files from ${0}"},"ADD_TO_COMMUNITYCOLLECTION":{"SELECT_COLLECTION":"You must select a folder that this file will be added to.","DIALOG_TITLE":"Add to Folder","INFO_SUCCESS_1":"${filelink} has been successfully added to ${collectionlink}.","ACTION_LONG":"Add to Folder...","INFO_SUCCESS_2":"${filelink} has been successfully moved to ${collectionlink}.","HINT":"Add ${0} to one of the following Community folders.","ERROR":"The file was not added due to an error.","ERROR_TIMEOUT":"The file was not added because the server could not be contacted.  Click \'Add to Folder\' to try your request again.","ERROR_CANNOT_MOVE_PERSONALFILE_TO_COMMUNITYFOLDER":"You cannot move a personal file into a community folder.","ERROR_CANNOT_MOVE_COMMUNITYFILE_TO_PERSONALFOLDER":"You cannot move a community file into a personal folder.","ERROR_NOT_FOUND_1":"The file was not added because the selected folder has been deleted.","ERROR_CANCEL":"The file was not added because the request was cancelled.  Click \'Add to Folder\' to try your request again.","OK_ADD_HERE":"Add Here","ERROR_ACCESS_DENIED_1":"You do not have permission to add the file to the selected folder.","OK_TITLE":"Add this file to the selected folder","ACTION":"Add to Folder","BUSY":"Adding...","CANCEL":"Cancel","ACTION_TOOLTIP":"Add this file to a folder","OK":"Add to Folder","ERROR_NOT_LOGGED_IN":"The file was not added because you were not logged in.  Click \'Add to Folder\' to add the file.","INFO_EXISTS_1":"${filelink} was already in ${collectionlink}."},"FILE_FOLDERS":{"EMPTY_COLLECTIONS":"None","ERROR":"Unable to load folder information","EXTERNAL":"This file is in the external folder:","HDNCLCT":"This file is in ${0} folder or community you do not have access to.","SHARE_INTENT_T":"Share Externally","HDNCLCT_MANY":"This file is in ${0} folders or communities you do not have access to.","EXTERNAL_MANY":"This file is in these external folders:","LABEL":"Shared with Folders: ","NO_COLLECTIONS":"This file has not been added to any folders yet.","SHOW_MORE":"Show more folders...","TITLE":"Folders","PRIVATE_LABEL":"Private:","SHARED_LABEL":"Shared:","SHARE_AS_EDITOR":"${0} (with edit)","NOT_ALLOW_SHARE_WARNING":"This file cannot be shared to individuals or other communities.","NO_COLLECTION":"This file has not been added to any folder yet.","LOADING":"Loading...","COMMUNITY_LABEL":"Community: ","PUBLIC_LABEL":"Public: "},"SUCCESS":"Success","SUCCESS_COLON":"Success:","VIEW_ALL":"View All","ERROR":"Error","EDIT_GROUP":{"ACTION":"Edit","ACTION_TOOLTIP":"Edit this document"},"A11Y_READER_ADDED":"Selected ${0} as a reader","BACK_TO_FILES":"Back to Files","EDIT_COLLECTION":{"ACTION_LONG":"Edit Properties...","ACTION":"Edit Properties","ACTION_TOOLTIP":"Edit this folder"},"COMMENTS":{"ADD_COMMENT":"Add a comment...","ERROR_EDIT":"Your comment could not be updated.  Please try again later.","ERROR_EDIT_TIMEOUT":"Your comment could not be updated because the server could not be contacted.  Click \'Save\' to try again.","ERROR_CREATE_CANCEL":"Your comment could not be saved because the request was cancelled.  Click \'Save\' to try again.","NEXT_T":"Next page","EXTERNAL_WARNING":"Comments might be seen by people external to your organization.","EDIT":"Edit","PREVIOUS_T":"Previous page","PAGE":"Page","ERROR_NO_CONTENT":"Enter your comment and click \'Save\'.  If you no longer want to leave a comment click \'Cancel\'.","PAGING_BOTTOM_LABEL":"Paging options","DELETECONFIRM":"Are you sure you want to delete this comment?","WARN_LONG_COMMENT":"The comment is too long.","ERROR_NO_CONTENT_EDIT":"Enter your comment and click \'Save\'.  If you no longer want to edit your comment click \'Cancel\'.","ERROR_EDIT_ACCESS_DENIED":"Your comment could not be updated because the file has been deleted or is no longer shared with you.","ERROR_MENTIONS_NO_PERMISSION_COMMUNITY":"The following people that you mentioned cannot view the comment because they are not members of the community.","ERROR_EDIT_NOT_FOUND":"Your comment could not be updated because the file has been deleted or is no longer shared with you.","SORT_BY":"Sort by:","ERROR_REQUEST_TIMEOUT":"The server could not be contacted.","LOADING":"Loading comments...","NOHYPHENCOUNT":"${0} of ${1}","COMMENT_EDITED":{"MONTH":"Edited on ${MMM} ${d}","TODAY":"Edited today at ${time}","YESTERDAY":"Edited yesterday at ${time}","DAY":"Edited on ${EEEE}","YEAR":"Edited on ${date_long}"},"DELETE":"Delete","EMPTY":"There are no comments.","COMMENT_COUNT_MANY":"${0} comments","DELETEREASON":"Reason for deleting this comment:","SUBSCRIBE_TO":"Feed for these Comments","ERROR_CREATE":"Your comment could not be saved.  Please try again later.","DELETECOMMENT":"Delete Comment","ERROR_CREATE_TIMEOUT":"Your comment could not be saved because the server could not be contacted.  Click \'Save\' to try again.","ERROR_MENTIONS_VALIDATE":"Your mentioned user in comment could not be validated. Please try again later.","ERROR_MENTIONS_VALIDATE_TIMEOUT":"Your mentioned user in comment could not be validated because the server could not be contacted. Please try again later.","ERROR_EDIT_NOT_LOGGED_IN":"Your comment could not be updated because you were not logged in.  Click \'Save\' to update your comment.","ERROR_DELETE_NOT_FOUND":"Your comment could not be deleted because the file has been deleted or is no longer shared with you.","ERROR_DELETE_ACCESS_DENIED":"Your comment could not be deleted because the file has been deleted or is no longer shared with you.","COUNT_ALT":"Showing comments ${0} through ${1} of ${2}","ADD_COMMENT_SUCCESS_PRE_MODERATION":"The comment has been submitted for review and will be available when approved. ","DELETE_T":"Permanently delete this comment","FLAG_T":"Flag this comment as inappropriate","ERROR_MENTIONS_VALIDATE_CANCEL":"Your mentioned user in comment could not be validated because the request was cancelled. Please try again later.","SHOW_ALT":"Show ${0} items per page","COMMENT_CREATED":{"MONTH":"${user} commented on ${timestamp} (version ${version})","TODAY":"${user} commented ${timestamp} (version ${version})","YESTERDAY":"${user} commented ${timestamp} (version ${version})","DAY":"${user} commented on ${timestamp} (version ${version})","YEAR":"${user} commented on ${timestamp} (version ${version})"},"JUMP_TO_LAST":"Most recent","ERROR_CREATE_ACCESS_DENIED":"Your comment could not be saved because the file has been deleted or is no longer shared with you.","ERROR_REQUEST_CANCELLED":"The request was cancelled.","ERROR_CREATE_NOT_FOUND":"Your comment could not be saved because the file has been deleted or is no longer shared with you.","ERROR_MENTIONS_VALIDATE_ACCESS_DENIED":"Your mentioned user in comment could not be validated because the file has been deleted or is no longer visible to you.","ERROR_MENTIONS_VALIDATE_NOT_FOUND":"Your mentioned user in comment could not be validated because the file has been deleted or is no longer visible to you.","VIEW_COMMENTS_FILE":"View comments on this file","ERROR_MENTIONS_NO_PERMISSION":"The following people that you mentioned cannot view the comment because they do not have access to the content.","ITEMS_PER_PAGE":" items per page","ELLIPSIS":"...","COMMENT_LABEL":"Enter your comment:","SUBSCRIBE_TO_TOOLTIP":"Follow changes to these comments through your feed reader","COMMENT_QUARANTINED":{"MONTH":"This comment was removed by ${user} on ${date}","TODAY":"This comment was removed by ${user} today at ${time}","YESTERDAY":"This comment was removed by ${user} yesterday at ${time}","DAY":"This comment was removed by ${user} on ${date}","YEAR":"This comment was removed by ${user} on ${date_long}"},"PAGING_TOP_LABEL":"Paging","ERROR_DELETE_NOT_LOGGED_IN":"Your comment was not deleted because you were not logged in.  Click \'Delete\' to delete your comment.","PAGE_ALT":"Page ${0} of ${1}","TRIM_LONG_COMMENT_CONFIRM":"Shortening will remove the text beyond the comment limit.  Click \'OK\' to shorten or \'Cancel\' to edit the comment yourself.","NOTIFY_LABEL":"Follow this file to get notified when comments or updates are posted","EDIT_T":"Edit this comment","VIEW_COMMENTS_PAGE":"View comments on this file","ERROR_DELETE":"Your comment could not be deleted.  Please try again later.","ERROR_DELETE_TIMEOUT":"Your comment could not be deleted because the server could not be contacted.  Click \'Delete\' to try again.","COMMENT_CREATED_TIME":{"MONTH":"${MMM} ${d}","TODAY":"today at ${time}","YESTERDAY":"yesterday at ${time}","DAY":"${EEEE} at ${time}","YEAR":"${date_long}"},"ERROR":"An unknown error has occurred.","SUBSCRIBE_TO_TITLE":"Comments for ${0}","ERROR_CREATE_NOT_LOGGED_IN":"Your comment was not saved because you were not logged in.  Click \'Save\' to add your comment.","FLAG":"Flag as Inappropriate","MENTIONS_TOOLTIP":"Note: Only people that have access to the content will see the comment.","COUNT":"${0}-${1} of ${2}","NEXT":"Next","COMMENT_COUNT_ONE":"${0} comment","PREVIOUS":"Previous","ERROR_DELETE_CANCEL":"Your comment could not be deleted because the request was cancelled.  Click \'Delete\' to try again.","COMMENT_PENDING":"This comment is pending review.","ERROR_EDIT_CANCEL":"Your comment could not be updated because the request was cancelled.  Click \'Save\' to try again.","TRIM_LONG_COMMENT":"Shorten comment?","COMMENT_DELETED":{"MONTH":"Comment deleted by ${user} on ${MMM} ${d}","TODAY":"Comment deleted by ${user} today at ${time}","YESTERDAY":"Comment deleted by ${user} yesterday at ${time}","DAY":"Comment deleted by ${user} on ${EEEE} at ${time}","YEAR":"Comment deleted by ${user} on ${date_long}"},"LINK":"Link","CANCEL":"Cancel","SAVE":"Save","COMMENT_REJECTED":{"MONTH":"This comment was rejected by ${user} on ${date}","TODAY":"This comment was rejected by ${user} today at ${time}","YESTERDAY":"This comment was rejected by ${user} yesterday at ${time}","DAY":"This comment was rejected by ${user} on ${date}","YEAR":"This comment was rejected by ${user} on ${date_long}"}},"MOVE_TO_COLLECTION":{"DIALOG_TITLE":"Move to Folder","SELECT_COLLECTION":"You must select a folder that this file will be moved to.","INFO_SUCCESS_1":"${filelink} has been successfully moved to ${collectionlink}.","HINT":"Move ${0} from ${1} to a different Community folder.","ERROR":"The file was not moved due to an error.","ERROR_TIMEOUT":"The file was not moved because the server could not be contacted.  Click \'Move to Folder\' to try your request again.","ERROR_CANCEL":"The file was not moved because the request was cancelled.  Click \'Move to Folder\' to try your request again.","ERROR_NOT_FOUND_1":"The file was not moved because the selected folder has been deleted.","ERROR_ACCESS_DENIED_1":"You do not have permission to move the file to the selected folder.","OK_TITLE":"Move this file to the selected folder","ACTION":"Move to Folder","BUSY":"Moving...","CANCEL":"Cancel","ACTION_TOOLTIP":"Move this file to a folder","OK_MOVE_HERE":"Move Here","OK":"Move to Folder","ERROR_NOT_LOGGED_IN":"The file was not moved because you were not logged in.  Click \'Move to Folder\' to move the file.","INFO_EXISTS_1":"${filelink} was already in ${collectionlink}."},"BACK_TO_COMMUNITY_FILES":"Back to community files","SHARE_TO_COMMUNITY_FILE":{"DIALOG_TITLE":"Share File with this Community","ACTION":"Share File with Community...","ACTION_TOOLTIP":"See files Community have shared with you ","OK":"Share Files"},"SAVING":"Saving...","UPLOAD_FILE":{"ACTION_IN_MENU":"Upload...","ACTION":"Upload Files","ACTION_TOOLTIP":"Upload files from your computer","ACTION_KEY_SHORTCUT":"u"},"SHARE_FILE":{"DIALOG_TITLE":"Share File","EDITOR_LABEL":"Editors: ","INFO_SUCCESS_1":"${item} was shared successfully.","MESSAGE_TEXT":"Add an optional message","SHARE_PRI":"This file is private.","EXTERNAL_WARNING":"You can share this file with people external to your organization.","EDITOR_ROLE":"as Editor","SHARE_COMMUNITY_VISIBLE_WARN":"Sharing with this community \'${0}\' will make this file visible to your entire organization.","ACCESS_DENIED_ERROR_LOCKED":"The file was not shared because the file is locked by another user, try again later.","VISIBILITY_PUBLIC_LABEL":"Everyone in my organization","EXTERNAL_SHARES_ERROR_MANY":"${item} can only be shared inside your organization.","SHARE_SHR_0":"This file is shared.","SHARE_TYPE_LABEL":"Type","SHARE_SHR_1":"This file is shared with 1 person.","ERROR_1_NOT_LOGGED_IN":"${item} could not be shared because you were not logged in. Log in and share again.","READER_LABEL_TITLE":"Readers","SHARE_COL_1":"It is also in a folder or community.","ERROR_1_MAX_SHARES":"${item} was not shared because the maximum number of shares has been exceeded.","SELECT_USER_ERROR":"Please select a person or community to share with.","ACTION_ENABLED":"Share button is enabled","VISIBILITY_PEOPLE_COMMUNITIES_LABEL":"People or Communities","DIALOG_TITLE_X":"Share Files","ERROR_1":"${item} could not be shared due to an error.","ERROR_1_TIMEOUT":"${item} was not shared because the server could not be contacted.","SELECT_USER_ERROR_E":"Please select a person to share with.","TRIM_LONG_MESSAGE":"Shorten message?","SELECTED_FILES_1":"1 file selected to share.","ADD_TOOLTIP":"Share with this user","SHARE_WITH_HEADER":"Share with:","SHARE_COL_E":"It is also in a folder.","SHARE_COL_F":"It is also in ${collections} folders.","OWNER_REFERENCE_ERROR":"You cannot share with the owner of the file.","VISIBILITY_NO_ONE_LABEL":"No one","SHARE_SHR_M":"This file is shared with ${people} people.","INFO_SUCCESS_X":"${count} files were shared successfully.","SHARE_COL_M":"It is also in ${collections} folders or communities.","VISIBILITY_PEOPLE_LABEL":"People","VISIBILITY_NO_ONE_DESCRIPTION":"(shared with me only)","ACTION_TOOLTIP_X":"Give others access to the selected files","ACTION":"Share","ERROR_X_CANCEL":"Some files may not have been shared because the request was cancelled.","EDITOR_LABEL_TITLE":"Editors","SHARE_COMMUNITY_WARN":"Sharing with the community \'${0}\' will make this file visible to everyone in your organization.","WARN_LONG_MESSAGE":"The message is too long.","NOT_FOUND_ERROR":"This file has been deleted or is no longer shared with you.","ERROR_1_CANCEL":"${item} may not have been shared because the request was cancelled.","ACCESS_DENIED_ERROR":"You no longer have permission to share this file.","ERROR_X":"${count} files could not be shared due to errors.","INVITATION_ERROR":"Content was not shared with the following people because you do not have permission to share with them: ${0}.","ERROR_1_VISIBILITY_RESTRICTION":"${item} was not shared because the file is restricted and may not be made visible to everyone in your organization.","SHARE_WITH":"Share with:","SHARE_ROLE_LABEL":"Role","SEARCH_TOOLTIP":"Person not listed? Use full search...","SELECTED_FILES_X":"${0} files selected to share.","SHARE_PUB_0":"This file is visible to ${company}. ","VISIBILITY_COMMUNITIES_LABEL":"Communities","SHARE_PUB_1":"This file is visible to ${company} and shared with 1 person.","EXTERNAL_SHARES_ERROR":"The file can only be shared inside your organization.","ADD_FROM_RECENT":"Recent shares","INFO_SUCCESS":"The file was shared successfully.","VISIBILITY_PUBLIC_DESCRIPTION":"","READER_LABEL":"Readers: ","ACTION_TOOLTIP":"Give others access to this file","OK":"Share","NOT_LOGGED_IN_ERROR":"The file was not shared because you were not logged in.  Click \'Share\' to share the file.","SELF_REFERENCE_ERROR":"You cannot share with yourself.","CANCEL_ERROR":"The file was not shared because the request was cancelled.  Click \'Share\' to try again.","ACTION_DISABLED":"Share button is disabled","ACTION_LONG":"Share...","ERROR":"The file could not be shared.  Please try again later.","TIMEOUT_ERROR":"The file was not shared because the server could not be contacted.  Click \'Share\' to try again.","SHARE_PUB_M":"This file is visible to ${company} and shared with ${people} people.","ERROR_1_ACCESS_DENIED":"${item} was not shared because you do not have permission to share this file.","ERROR_1_NOT_FOUND":"${item} has been deleted or is no longer shared with you.","READER_ROLE":"as Reader","MAX_SHARES_ERROR":"The maximum number of shares has been exceeded.","VISIBILITY_PEOPLE_DESCRIPTION":"(give specific file permissions to others)","BUSY":"Sharing...","CANCEL":"Cancel","NO_MEMBERS":"None","MESSAGE_LABEL":"Message:","SHARE_WITH_TITLE":"Share with"},"VISIBILITY_RESTRICTION":{"ERROR_EDIT":"A file that is visible to everyone in your organization may not be made restricted.","LABEL":"Restricted","ERROR_ADD_FILES_1":"A file that is restricted may not be made visible to everyone in your organization.","ERROR_SHARE":"A file that is restricted may not be made visible to everyone in your organization.","ERROR_UPLOAD":"A file that is restricted may not be made visible to everyone in your organization.","ERROR_ADD_FILES_X":"A file that is restricted may not be made visible to everyone in your organization.","ERROR_ADD_TO_FOLDER":"A file that is restricted may not be made visible to everyone in your organization."}};

;if(!dojo._hasResource["lconn.files.action.DialogAction"]){
dojo._hasResource["lconn.files.action.DialogAction"]=true;
dojo.provide("lconn.files.action.DialogAction");
















dojo.requireLocalization("lconn.files","ui");
dojo.declare("lconn.files.action.DialogAction",[lconn.share.action.Action,lconn.share.widget.ProtectedAction,lconn.share.widget.Resizable],{_resizeDialog:false,_dialogHorizontallyShrunk:false,_dialogVerticallyShrunk:false,constructor:function(_1,_2,_3){
this.listeners=[];
this._requests=[];
this.filesNls=dojo.i18n.getLocalization("lconn.files","ui");
},connect:function(_4,_5,_6){
this.listeners.push(dojo.connect(_4,_5,this,_6));
},execute:function(_7,_8,e){
if(e){
try{
dojo.stopEvent(e);
}
catch(ex){
}
}
var _9=this.dialog;
if(_9&&_9.open){
return;
}
this.executeOptions=_8;
dojo.publish("lconn/share/action/execute",[this,_7,_8]);
this.endAction();
if(this.alwaysRecreate&&_9){
_9.cancel();
_9.hide();
_9.destroyRecursive();
_9=this.dialog=null;
}
if(!_9){
var d=document;
var _a=d.createElement("DIV");
d.body.appendChild(_a);
_9=new lconn.share.widget.Dialog({duration:1,zIndex:this.zIndex},_a);
this.connect(_9,"onCancel","cancel");
_9.domNode.className="lotusDialogWrapper";
_9.containerNode.className="";
this.dialog=_9;
this.createDialog(_7,_8,_9);
}else{
this.enableInput(_9);
this.updateDialog(_7,_8,_9);
this.clearErrors();
this.clearExtraButtons();
}
var _b=lconn.files.action.DialogAction._modal;
var _c=lconn.files.action.DialogAction._actions;
var _d=_b[_b.length-1];
if(_d){
_d.hide();
}
if(_d!=_9){
_b.push(_9);
_c.push(this);
}
this.startup();
var _e=_9.show();
if(_e&&this.onShownComplete){
_e.then(dojo.hitch(this,this.onShownComplete));
}
if(this._resizeDialog){
dojo.style(this.dialog.dialogContent,"overflow","hidden");
if(dojo.isFunction(this.dialog.resize)){
dojo.connect(this.dialog,"resize",dojo.hitch(this,this._onDialogResize));
}
if(dojo.isFunction(this.dialog.layout)){
dojo.connect(this.dialog,"layout",dojo.hitch(this,this._onDialogResize));
}
}
dojo.publish("lconn/share/action/after/show",[this,_7,_8]);
dojo.publish("lconn/share/scene/modal-dialog/shown",[this,_7,_8]);
},onShownComplete:function(){
if(this.dialog&&this.dialog.initialFocusNode){
dijit.focus(this.dialog.initialFocusNode);
}
return true;
},close:function(){
var _f=this.dialog;
if(_f){
var _10=lconn.files.action.DialogAction._modal;
var _11=lconn.files.action.DialogAction._actions;
var top=_10[_10.length-1];
if(top==_f){
_10.pop();
_11.pop();
}
_f.hide();
var _12=_10[_10.length-1];
if(_12){
_12.show();
}
}
dojo.publish("lconn/share/scene/modal-dialog/closed",[this]);
if(this.onClose){
this.onClose();
}
this.executeOptions=null;
},cancel:function(e){
if(e){
dojo.stopEvent(e);
}
var _13=this.isActing();
this.cancelRequest();
if(_13){
console.log("Cancel while action is in process");
this.endAction();
this.enableInput();
return;
}
this.close();
this.onCancel();
},onCancel:function(){
},cancelRequest:function(){
if(this._requests){
dojo.forEach(this._requests,function(r){
if(!r.ioArgs){
return;
}
r.ioArgs.explicitCancel=true;
if(!r.ioArgs._finished){
r.cancel();
}
});
}
this._requests=[];
},destroy:function(){
dojo.forEach(this.listeners,dojo.disconnect);
this.listeners=[];
this.executeOptions=null;
this.cancelRequest();
if(this.dialog){
this.dialog.destroyRecursive();
}
this.dialog=null;
},enableInput:function(_14){
_14=_14||this.dialog;
if(_14){
this.setSubmitButtonEnabled(_14,true);
if(_14.progressNode){
_14.progressNode.style.display="none";
}
this._toggleInput(_14.domNode,true);
}
},disableInput:function(_15){
_15=_15||this.dialog;
if(_15){
this.setSubmitButtonEnabled(_15,false);
if(_15.progressNode){
_15.progressNode.style.display="";
}
if(_15.progress){
_15.progress.update({indeterminate:true});
}
this._toggleInput(_15.domNode,false);
}
},resize:function(){
if(this.dialog){
this.dialog._position();
}
},beforeSave:function(){
this.clearErrors();
this.clearExtraButtons();
},protectedSave:function(){
if(!this.startAction()||!this.dialog||!this.dialog.open){
return;
}
this.beforeSave();
try{
if(this.save.apply(this,arguments)){
if(this.isActing()){
this.disableInput(this.dialog);
}
}else{
this.endAction();
}
}
catch(e){
console.error(e);
this.endAction();
this.enableInput();
}
},beforeComplete:function(){
},protectedComplete:function(){
var _16=false;
try{
var _17=arguments[arguments.length-1];
if(_17){
_17._finished=true;
}
this.beforeComplete();
if(_17&&_17.explicitCancel){
return;
}
_16=this.complete.apply(this,arguments);
}
finally{
if(!_16){
this.endAction();
this.enableInput();
}
}
if(_16){
this.close();
}
},createMessage:function(s,_18){
if(!_18){
return {message:s};
}
var d=document;
var el=d.createDocumentFragment();
lconn.share.util.html.substitute(d,el,s,_18,null,this);
return {message:el};
},createHelpLink:function(app,el,msg,opt){
if(dojo.getObject("lconn.files.scenehelper.createHelpLink")){
return lconn.files.scenehelper.createHelpLink(app,el,msg,opt);
}else{
return null;
}
},createDialogFrame:function(d,_19,opt){
opt=opt||{};
if(_19.titleBar){
_19.titleBar.style.display="none";
}
var _1a=_19.dialogBorderNode=d.createElement("div");
_1a.className="lotusDialogBorder";
if(!this.wDialog){
console.error(this.declaredClass+" missing wDialog property");
}
_1a.style.width=this.wDialog;
var el=_19.formNode=d.createElement("form");
el.method="POST";
if(opt.isMultipart){
dojo.attr(el,"enctype","multipart/form-data");
dojo.attr(el,"encoding","multipart/form-data");
}
var _1b=[this,this.protectedSave].concat(opt.saveArguments||[]);
dojo.connect(el,"onsubmit",dojo.hitch.apply(dojo,_1b));
el.className="lotusDialog lotusForm";
var _1c=dojo.getObject("app.authenticatedUser.orgName",false,this)||this.app.nls.ORGNAME_DEFAULT;
var _1d=dojo.string.substitute(opt.title||this.nls.DIALOG_TITLE,{company:_1c});
var _1e=_19.titleBar=d.createElement("div");
_1e.id=dijit.getUniqueId("dialog_title");
_1e.className="lotusDialogHeader";
_1e.style.cursor="move";
dijit.setWaiState(_1e,"label",_1d);
var h1=d.createElement("h1");
h1.className="lotusHeading";
var _1f=_19.titleTextNode=d.createTextNode(_1d);
h1.appendChild(_1f);
_1e.appendChild(h1);
var a=_19.closeIconNode=d.createElement("a");
a.className="lotusDialogClose";
a.href="javascript:;";
a.title=this.nls.CLOSE||this.filesNls.CLOSE;
dijit.setWaiRole(a,"button");
this.connect(a,"onclick","cancel");
var img=d.createElement("img");
img.alt=a.title;
img.src=dojo.config.blankGif||_19._blankGif;
a.appendChild(img);
var _20=d.createElement("span");
_20.className="lotusAltText";
_20.appendChild(d.createTextNode("X"));
a.appendChild(_20);
_1e.appendChild(a);
el.appendChild(_1e);
var _21=_19.dialogContent=d.createElement("div");
_21.className="lotusDialogContent";
el.appendChild(_21);
var div=_19.buttonContainer=d.createElement("div");
div.className="lotusDialogFooter";
if(opt.showProgressBar){
var _22=_19.progressNode=d.createElement("div");
_22.style.display="none";
_22.className="lotusLeft lconnDijit tundra";
var _23=d.createElement("div");
_22.appendChild(_23);
var _24=_19.progress=new dijit.ProgressBar({},_23);
var _25=_24.domNode.style;
_25.width="175px";
_25.overflow="hidden";
var _26=_24.indeterminateHighContrastImage;
if(_26){
_26.alt="";
}
div.appendChild(_22);
}else{
var _27=_19.progressNode=d.createElement("span");
_27.style.display="none";
_27.className="lotusLeft qkrStatus lotusTiny";
var img=d.createElement("IMG");
img.className="lotusLoading";
img.alt="";
img.src=dojo.config.blankGif;
_27.appendChild(img);
_27.appendChild(d.createTextNode("\xa0"));
_27.appendChild(d.createTextNode(this.nls.BUSY));
div.appendChild(_27);
}
var _28=_19.saveNode=d.createElement("input");
_28.id="submit_button";
_28.className="lotusFormButton";
_28.type="submit";
_28.value=opt.btnOk||this.nls.OK;
_28.title=opt.btnOkTitle||this.nls.OK_TITLE||"";
div.appendChild(_28);
if(!opt.hideCancel){
var _29=_19.cancelButton=this.cancelButton=d.createElement("input");
_29.id="cancel_button";
_29.className="lotusFormButton";
_29.type="button";
_29.value=this.nls.CANCEL;
this.connect(_29,"onclick","cancel");
dijit.setWaiRole(_29,"button");
dojo.attr(_29,"aria-label",this.nls.CANCEL);
if(dojo.isIE&&d.documentMode&&d.documentMode>7){
a.style.verticalAlign="baseline";
}
div.appendChild(_29);
}
el.appendChild(div);
_1a.appendChild(el);
dijit.setWaiState(_19.domNode,"labelledby",_1e.id);
if(opt.resizeDialog){
this._resizeDialog=opt.resizeDialog;
}
return {border:_1a,form:el,content:_21,footer:div};
},clearExtraButtons:function(){
var _2a=this.dialog;
var _2b=_2a.extraButtons;
delete _2a.extraButtons;
if(!_2b){
return;
}
var _2c=_2a.buttonContainer;
for(var i=0;i<_2b.length;i++){
_2c.removeChild(_2b[i]);
}
},setExtraButtons:function(_2d){
this.clearExtraButtons();
if(!_2d){
return;
}
var _2e=this.dialog;
_2e.extraButtons=_2d=(dojo.isArray(_2d)?_2d:[_2d]);
var _2f=_2e.buttonContainer;
var _30=_2e.saveNode?_2e.saveNode.nextSibling:null;
for(var i=0;i<_2d.length;i++){
_2f.insertBefore(_2d[i],_30);
}
},setSubmitButtonEnabled:function(_31,_32){
dojo[_32?"removeClass":"addClass"].apply(dojo,[_31.saveNode,"lotusBtnDisabled"]);
if(dijit.setWaiState){
dijit.setWaiState(_31.saveNode,"disabled",!_32);
}
if(_31.saveNode){
_31.saveNode.disabled=_32?false:true;
}
},clearErrors:function(){
lconn.share.util.validation.removeFormErrors(this.dialog.formNode);
},setFormError:function(_33,_34){
var _35=_34&&_34.isWarning;
lconn.share.util.validation.setFormError(this.dialog.formNode,this._createErrorContent(_33,_34),{"isWarning":_35});
},_createErrorContent:function(_36,_37){
if(_37&&_37.message&&_37.message!=_37.code){
var d=document;
var _38=d.createElement("span");
_38.className="qkrErrorDetailsText";
_38.appendChild(d.createElement("br"));
_38.appendChild(d.createTextNode(_37.message));
_38.style.display="none";
var _39=d.createElement("a");
_39.appendChild(d.createTextNode(this.nls.ERROR_DETAILS_LINK||"..."));
_39.className="qkrErrorDetailsLink";
_39.href="javascript:;";
_39.title=this.nls.ERROR_DETAILS_TOOLTIP||"";
_39.onclick=function(){
_38.style.display="";
_39.style.display="none";
};
if(typeof _36=="string"){
_36=d.createTextNode(_36);
}
if(!dojo.isArray(_36)){
_36=[_36];
}
_36.push(d.createTextNode(" "));
_36.push(_39);
_36.push(_38);
}
return _36;
},setDialogMessage:function(_3a,_3b,_3c){
var _3d=this._getDialogMessageContainer();
if(!_3a){
_3d.style.display="none";
return;
}
_3b={"warning":"warning","error":"error"}[_3b]||"info";
var _3e=this.dialog.messageNode;
while(_3e.firstChild){
_3e.removeChild(_3e.firstChild);
}
var _3f=this.app.nls||{};
var img=document.createElement("img");
img.src=dojo.config.blankGif;
img.alt={"info":_3f.INFO||"","warning":_3f.WARNING||"","error":_3f.ERROR||""}[_3b];
img.className={"info":"lconnSprite lconnSprite-iconAttention16","warning":"lconnSprite lconnSprite-iconWarning16","error":"lconnSprite lconnSprite-iconError16"}[_3b];
dijit.setWaiRole(img,"presentation");
_3e.appendChild(img);
var _40=document.createElement("div");
_3a=this._createErrorContent(_3a,_3c);
lconn.share.util.html.append(_40,_3a);
_3e.appendChild(_40);
dijit.setWaiState(_40,"live","assertive");
_3e.className={"info":"lotusMessage lotusInfo","warning":"lotusMessage lotusWarning","error":"lotusMessage lotusFormError"}[_3b];
_3d.style.display="";
},_getDialogMessageContainer:function(){
var _41=this.dialog;
if(_41.messageContainer){
return _41.messageContainer;
}
var d=document;
var _42=_41.messageContainer=d.createElement("div");
_42.className="lotusFormErrorField lconnCompactMessage";
dijit.setWaiState(_42,"live","assertive");
_42.style.display="none";
var _43=_41.messageNode=d.createElement("div");
_43.style.padding="5px 16px";
_42.appendChild(_43);
var _44=_41.dialogContent;
_44.insertBefore(_42,_44.firstChild);
return _42;
},addFieldError:function(_45,_46,_47){
var tr=_45;
while(tr.nodeName.toLowerCase()!="tr"){
tr=tr.parentNode;
}
lconn.share.util.validation.addInlineErrorRow(tr,_45,_46,_47);
},removeFieldError:function(_48,_49){
var tr=_48;
while(tr.nodeName.toLowerCase()!="tr"){
tr=tr.parentNode;
}
lconn.share.util.validation.removeInlineErrorRow(tr,_48,_49);
},onError:function(_4a){
this.setFormError(this.nls.ERROR_OCCURRED,_4a);
},getOneUIClassesToAdd:function(){
var _4b=dojo.doc.body;
var _4c=this.oneuiVersion;
var _4d=dojo.hasClass(_4b,(_4c==3)?"lotusui30":"lotusui");
var _4e=dojo.isIE?" lotusui_ie lotusui_ie7":"";
if(!_4d){
if(_4c==3){
return _4e+" lotusui30 lotusui30_fonts";
}else{
return _4e+" lotusui";
}
}
return null;
},startup:function(){
var d=this.doc||dojo.doc;
var _4f=this.getOneUIClassesToAdd();
if(_4f){
var _50=this.dialog;
var _51=_50.domNode;
_51.className+=_4f;
if(dojo.isIE&&this.oneuiVersion==3){
d.getElementsByTagName("html")[0].className+=" lotusui_ie lotusui_ie7";
}
}
},_onDialogResize:function(){
if(!this.dialog){
return;
}
var _52=dojo.position(this.dialog.domNode,true);
if(this._dialogHorizontallyShrunk){
dojo.style(this.dialog.dialogBorderNode,"width",this.wDialog);
dojo.style(this.dialog.dialogContent,"width","");
dojo.style(this.dialog.dialogContent,"overflow-x","hidden");
this._dialogHorizontallyShrunk=false;
}
if(this._dialogVerticallyShrunk){
dojo.style(this.dialog.dialogBorderNode,"height","");
dojo.style(this.dialog.dialogContent,"height","");
dojo.style(this.dialog.dialogContent,"overflow-y","hidden");
this._dialogVerticallyShrunk=false;
}
var _53=dojo.position(this.dialog.domNode,true);
var _54=dijit.getViewport();
if(_53.w>_54.w){
dojo.style(this.dialog.dialogBorderNode,"width",_54.w+"px");
dojo.style(this.dialog.dialogContent,"width",_54.w+"px");
dojo.style(this.dialog.dialogContent,"overflow-x","scroll");
this._dialogHorizontallyShrunk=true;
}
if(_53.h>_54.h){
dojo.style(this.dialog.dialogBorderNode,"height",_54.h+"px");
var _55=_54.h-dojo.position(this.dialog.titleBar,true).h-dojo.position(this.dialog.buttonContainer,true).h;
dojo.style(this.dialog.dialogContent,"height",_55+"px");
dojo.style(this.dialog.dialogContent,"overflow-y","scroll");
this._dialogVerticallyShrunk=true;
}
var _56=dojo.position(this.dialog.domNode,true);
if(_52.w!=_56.w||_52.h!=_56.h){
this.dialog.updatePositionAfterSizeChange();
}
}});
lconn.files.action.DialogAction._modal=[];
lconn.files.action.DialogAction._actions=[];
}


;if(!dojo._hasResource["lconn.files.action.impl.PromptAction"]){
dojo._hasResource["lconn.files.action.impl.PromptAction"]=true;
dojo.provide("lconn.files.action.impl.PromptAction");










dojo.declare("lconn.files.action.impl.PromptAction",[lconn.files.action.DialogAction],{wDialog:"400px",alwaysRecreate:true,constructor:function(_1,_2,_3){
this.app=_1;
this.net=_1.net;
if(_3){
dojo.mixin(this,_3);
}
this.nls=this.getNls(_1)||{};
this.name=this.nls.ACTION;
this.tooltip=this.nls.ACTION_TOOLTIP;
},getNls:function(_4){
return _4.nls[this._stringsPrefix];
},getFrameOptions:function(_5,_6){
var _7=dojo.mixin({},_6);
_7.hideCancel=this.hideCancel;
return _7;
},createDialog:function(_8,_9,_a){
var d=document;
_9=_9||{};
var _b=this.getFrameOptions(_8,_9);
_b.title=this.nls.DIALOG_TITLE;
var _c=this.createDialogFrame(d,_a,_b);
var _d=_c.border;
var _e=_c.content;
var _f=d.createElement("table");
_f.className="lotusFormTable";
dijit.setWaiRole(_f,"presentation");
_f.cellPadding=_f.cellPadding=0;
var _10=d.createElement("tbody");
var tr=d.createElement("tr");
tr.className="lotusFormFieldRow";
var td=d.createElement("td");
var div=td.appendChild(d.createElement("div"));
var _11=div.id=_a.id+"dialogContentNode";
this.renderQuestion(d,div,_8,_9);
tr.appendChild(td);
_10.appendChild(tr);
_f.appendChild(_10);
_e.appendChild(_f);
_a.setContent(_d);
dojo.attr(_a.domNode,"aria-describedby",_11);
_a.item=_8;
if(_9&&_9.focusConfirm){
_a.initialFocusNode=_a.saveNode;
}
},renderQuestion:function(d,el,_12,opt){
if(this.question&&this.question.nodeName){
el.appendChild(this.question);
}else{
lconn.share.util.html.createTextNode(d,el,this.question||this.nls.QUESTION);
}
},save:function(e){
if(e){
dojo.stopEvent(e);
}
this.close();
if(this.onSuccess){
this.onSuccess();
}
return false;
}});
}


;if(!dojo._hasResource["concord.customDownloadAction"]){
dojo._hasResource["concord.customDownloadAction"]=true;
dojo.provide("concord.customDownloadAction");


dojo.declare("concord.customDownloadAction",[lconn.files.action.impl.PromptAction],{showProgressBar:false,isContinueDownload:true,constructor:function(_1,_2,_3){
this.inherited(arguments);
this.nls=dojo.mixin(this.nls,{OK:_3.OK,OkTitle:_3.OkTitle,DOWNLOAD_TITLE:_3.DOWNLOAD_TITLE});
},getNls:function(_4){
return concord.global.nls;
},createDialog:function(_5,_6,_7){
_6=dojo.mixin(_6,{title:this.nls.DOWNLOAD_TITLE,showProgressBar:this.showProgressBar});
this.dialog=_7;
dijit.setWaiState(_7.domNode,"describedby","download_in_ibm_docs_dec_div");
if(typeof (_5)!="undefined"&&_5!=null){
this.file=_5;
}
this.windowOpenCommand=_6.windowOpenCommand;
this.inherited(arguments);
},renderQuestion:function(d,el,_8,_9){
var _a=d.createElement("div");
dojo.attr(_a,"class","lotusFormField");
dojo.attr(_a,"id","download_in_ibm_docs_dec_div");
el.appendChild(_a);
dojo.create("p",{innerHTML:this.sentence1},_a);
dojo.create("p",{innerHTML:this.sentence2},_a);
},onSuccess:function(){
if(typeof (this.windowOpenCommand)!="undefined"&&this.windowOpenCommand!=null){
this.windowOpenCommand();
}
}});
}


;if(!dojo._hasResource["concord.customEditAction"]){
dojo._hasResource["concord.customEditAction"]=true;
dojo.provide("concord.customEditAction");


dojo.declare("concord.customEditAction",[lconn.files.action.impl.PromptAction],{constructor:function(_1,_2,_3){
this.inherited(arguments);
this.app=_1;
this.nls=dojo.mixin(this.nls,{OK:_3.OK,OkTitle:_3.OkTitle,editWithDocsDialogTitle:_3.editWithDocsDialogTitle});
},getNls:function(_4){
return concord.global.nls;
},createDialog:function(_5,_6,_7){
_6=dojo.mixin(_6,{title:this.nls.editWithDocsDialogTitle});
this.dialog=_7;
dijit.setWaiState(_7.domNode,"describedby","edit_in_ibm_docs_dec_div");
if(typeof (_5)!="undefined"&&_5!=null){
this.file=_5;
}
this.inherited(arguments);
},renderQuestion:function(d,el,_8,_9){
var _a=d.createElement("div");
dojo.attr(_a,"class","lotusFormField");
dojo.attr(_a,"id","edit_in_ibm_docs_dec_div");
el.appendChild(_a);
dojo.create("p",{innerHTML:this.sentence1},_a);
dojo.create("p",{innerHTML:this.sentence2},_a);
},onSuccess:function(){
var _b=this.file.getId();
window.open(concord.global.getDocEditURL(_b),concord.global.hashWinNameFromId(_b));
}});
}


;if(!dojo._hasResource["concord.unit"]){
dojo._hasResource["concord.unit"]=true;
dojo.provide("concord.unit");
concord.unit.PxToCm=function(px){
var pt=px*0.75;
var _1=pt/72;
var cm=_1*2.54;
return cm;
};
concord.unit.CmToPx=function(cm){
var _2=cm/2.54;
var pt=_2*72;
var px=pt/0.75;
return px;
};
concord.unit.CmToIn=function(cm){
return cm/2.54;
};
concord.unit.InToCm=function(_3){
return _3*2.54;
};
concord.unit.EmToCm=function(em){
return em*2.54/6;
};
concord.unit.PtToCm=function(pt){
return pt*2.54/72;
};
concord.unit.PcToCm=function(pc){
return pc*2.54/6;
};
concord.unit.toCmValue=function(_4){
var r=_4.toLowerCase().match(/^(-?[\d|\.]*)(pc|px|pt|em|cm|in|mm)$/i);
if(r&&r.length==3){
switch(r[2]){
case "px":
return concord.unit.PxToCm(parseFloat(r[1]));
break;
case "em":
return concord.unit.EmToCm(parseFloat(r[1]));
break;
case "pt":
return concord.unit.PtToCm(parseFloat(r[1]));
break;
case "pc":
return concord.unit.PcToCm(parseFloat(r[1]));
break;
case "in":
return parseFloat(r[1])*2.54;
break;
case "mm":
return parseFloat(r[1])/10;
break;
case "cm":
return parseFloat(r[1]);
}
}
return NaN;
};
concord.unit.toPtValue=function(_5){
var cm=concord.unit.toCmValue(_5);
return isNaN(cm)?NaN:cm*72/2.54;
};
concord.unit.toLocalizedValue=function(_6){
var _7=concord.unit.toCmValue(_6);
if(!isNaN(_7)&&!concord.unit.isMeticUnit()){
_7=_7/2.54;
}
return _7;
};
concord.unit.formatNumber=function(_8){
if(_8==null){
return NaN;
}
var _9=dojo.locale;
dojo["requireLocalization"]("dojo.cldr","number",_9);
var _a={};
_a.type="decimal";
_a.locale=_9;
_8=dojo.number.format(_8,_a);
return _8;
};
concord.unit.parseNumber=function(_b){
if(_b==null){
return NaN;
}
var _c=dojo.locale;
dojo["requireLocalization"]("dojo.cldr","number",_c);
var _d={};
_d.type="decimal";
_d.locale=_c;
_b=dojo.number.parse(_b,_d);
return _b;
};
concord.unit.fullWidthNum={"\uff10":"0","\uff11":"1","\uff12":"2","\uff13":"3","\uff14":"4","\uff15":"5","\uff16":"6","\uff17":"7","\uff18":"8","\uff19":"9"},concord.unit._normalizeChar=function(_e){
if(_e&&dojo.isString(_e)){
var _f=[];
var _10=0;
var _11=_e.length;
while(_10<_11){
var c=_e.charAt(_10);
c=concord.unit.fullWidthNum[c]||c;
_f.push(c);
_10++;
}
return _f.join("");
}
return _e;
};
concord.unit.isMeticUnit=function(){
var _12={"us":1,"lr":1,"mm":1};
var _13="";
var _14=dojo.locale;
var _15=_14.indexOf("-");
if(_15>0){
_13=_14.substring(_15+1).toLowerCase();
}
return !(_13 in _12);
};
concord.unit.trim=(function(){
var _16=/(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g;
return function(str){
return str.replace(_16,"");
};
})();
concord.unit.parseValue=function(_17,_18,_19){
var _1a=_17.length+1;
var _1b=concord.unit.isMeticUnit()?"cm":"in";
_17=concord.unit.trim(concord.unit._normalizeChar(_17));
for(var i in _18){
var pos=_17.indexOf(_18[i]);
if(pos>-1){
_1a=pos;
_1b=i;
break;
}
}
_17=concord.unit.trim(_17.substring(0,_1a));
var _1c=concord.unit.parseNumber(_17);
if(!isNaN(_1c)){
return _19?concord.unit.CmToPx(concord.unit.toCmValue(_1c+_1b)):_1c;
}else{
return NaN;
}
};
}


;if(!dojo._hasResource["concord.pageSetup"]){
dojo._hasResource["concord.pageSetup"]=true;
dojo.provide("concord.pageSetup");








dojo.declare("concord.pageSetup",[lconn.files.action.impl.PromptAction],{sizeNamesArray:null,sizeHeightArray:null,sizeWidthArray:null,widthCMData:null,heightCMData:null,defaultMargin:null,PORTRAIT_MODE:true,LANDSCAPE_MODE:false,CURRENT_MODE:true,IS_LEFT_TO_RIGHT_ORDER:false,SIZE_COUNT:27,SIZE_USER:12,sizeList:null,locale:null,metric:true,unit:null,allowedUnit:null,cur_value:new Array(),orig_value:new Array(),settings:null,initiated:false,sizeCombox:null,comboBoxId:"C_d_ExportPDFDialogsizeCombox",tableId:"C_d_ExportPDFDialogTable",radioLandscapeId:"C_d_ExportPDFDialogType1",radioPortaitId:"C_d_ExportPDFDialogType2",radioTopToBottomId:"C_D_ExpoortPDFDialogT2B",radioLeftToRightId:"C_D_ExpoortPDFDialogL2R",heightId:"C_d_ExportPDFDialogHeight",widthId:"C_d_ExportPDFDialogWidth",headerCheckId:"S_d_printOptionsHeader",footerCheckId:"S_d_printOptionsFooter",headerHeightId:"C_d_ExportPDFDialogHeaderHeight",footerHeightId:"C_d_ExportPDFDialogFooterHeight",gridlineCheckId:"S_d_printOptionsGridline",taggedpdfCheckId:"C_d_taggedpdfGridline",topMarginId:"C_d_ExportPDFDialogid1",bottomMarginId:"C_d_ExportPDFDialogid2",leftMarginId:"C_d_ExportPDFDialogid3",rightMarginId:"C_d_ExportPDFDialogid4",connectArray:[],docTypePres:"PRES",docTypeText:"TEXT",docTypeSheet:"SHEET",docTypeCur:"TEXT",_initDocType:function(){
var _1=this.file.getExtension();
var _2={"txt":1,"docx":1,"doc":1,"odt":1};
var _3={"ppt":1,"odp":1,"pptx":1};
var _4={"ods":1,"xls":1,"xlsx":1,"xlsm":1};
if(_1){
if(_2[_1.toLowerCase()]){
this.docTypeCur=this.docTypeText;
}
if(_3[_1.toLowerCase()]){
this.docTypeCur=this.docTypePres;
}
if(_4[_1.toLowerCase()]){
this.docTypeCur=this.docTypeSheet;
}
}
},_setLocale:function(){
this.locale=dojo.locale;
if(this.locale=="pt"){
this.locale="pt-pt";
}
},formatNumber:function(_5,_6){
var _7=_5;
if(typeof (_7)=="string"){
_7=_5.replace(",",".");
}
_7=dojo.number.format(_7,{pattern:"#.00",locale:this.locale});
if(!_6){
_7+=" "+this.unit;
}
return _7;
},_loadLocalArrays:function(){
this.sizeNamesArray=new Array("A3","A4","A5","B4 (ISO)","B5 (ISO)","B6 (ISO)","B4 (JIS)","B5 (JIS)","B6 (JIS)",this.LETTER,this.LEGAL,this.TABLOID,this.USER,"C4","C5","C6","C6/5","DL",this.SIZE1,this.SIZE2,this.SIZE3,this.SIZE4,this.SIZE5,this.SIZE6,this.SIZE7,this.SIZE8,this.SIZE9);
this.widthCMData=new Array("29.70","21.00","14.80","25.00","17.60","12.50","25.70","18.20","12.80","21.59","21.59","27.96","User","22.90","16.20","11.40","11.40","11.00","9.21","9.84","9.84","10.48","11.43","12.07","18.40","13.00","14.00");
this.heightCMData=new Array("42.00","29.70","21.00","35.30","25.00","17.60","36.40","25.70","18.20","27.94","35.57","43.13","User","32.40","22.90","16.20","22.70","22.00","16.51","19.05","22.54","24.13","26.35","27.94","26.00","18.40","20.30");
if(this.metric){
this.sizeWidthArray=this.widthCMData;
this.sizeHeightArray=this.heightCMData;
this.defaultMargin=this.formatNumber("2.00");
}else{
this.sizeWidthArray=this._cmToInchArray(this.widthCMData);
this.sizeHeightArray=this._cmToInchArray(this.heightCMData);
this.defaultMargin=this.formatNumber(concord.unit.CmToIn("2.00"));
}
this._setLocale();
},createDivLabel:function(_8,_9){
var _a=dojo.create("label",null,_8);
_a.appendChild(dojo.doc.createTextNode(_9));
return _a;
},createNestLabel:function(_b,_c,_d){
var _e=dojo.create("label",null,_b);
dojo.attr(_e,"for",_d);
_e.appendChild(dojo.doc.createTextNode(_c));
return _e;
},createInputWithType:function(_f,_10,_11,_12,_13,_14){
var ret=null;
ret=document.createElement("input");
ret.name=_10;
ret.type=_12;
ret.id=_11;
_f.appendChild(ret);
if(_13){
ret.value=_13;
}
if(_14){
ret.checked=_14;
}
return ret;
},setDefaultPaperSize:function(_15){
this.storeCurrentValue();
var i=this.getDefaultSizeIndex(_15);
var _16=dijit.byId(this.comboBoxId);
if(_16){
_16.setValue(this.sizeNamesArray[i]);
}
this.changeStatus();
},changeOrientationMode:function(_17){
if(this.CURRENT_MODE!=_17){
var _18=dojo.byId(this.heightId);
var _19=dojo.byId(this.widthId);
var _1a=_18.value;
_18.value=_19.value;
_19.value=_1a;
this.checkValue(this.bottomMarginId);
this.checkValue(this.rightMarginId);
this.CURRENT_MODE=_17;
var _1b=dojo.byId(this.radioPortaitId);
var _1c=dojo.byId(this.radioLandscapeId);
if(_17==this.LANDSCAPE_MODE){
_1c.checked=true;
_1b.checked=false;
}else{
if(_17==this.PORTRAIT_MODE){
_1b.checked=true;
_1c.checked=false;
}
}
}
},checkScope:function(id){
var h=concord.unit.parseValue((dojo.byId(this.heightId).value),this.allowedUnit);
var w=concord.unit.parseValue((dojo.byId(this.widthId).value),this.allowedUnit);
var t=concord.unit.parseValue((dojo.byId(this.topMarginId).value),this.allowedUnit);
var b=concord.unit.parseValue((dojo.byId(this.bottomMarginId).value),this.allowedUnit);
var l=concord.unit.parseValue((dojo.byId(this.leftMarginId).value),this.allowedUnit);
var r=concord.unit.parseValue((dojo.byId(this.rightMarginId).value),this.allowedUnit);
var hh=0.5,fh=0.5;
if(!this.metric){
hh=concord.unit.CmToIn(hh);
fh=concord.unit.CmToIn(fh);
}
if(this.docTypeCur===this.docTypeText){
hh=concord.unit.parseValue((dojo.byId(this.headerHeightId).value),this.allowedUnit);
fh=concord.unit.parseValue((dojo.byId(this.footerHeightId).value),this.allowedUnit);
}
var obj=dojo.byId(id);
var v=concord.unit.parseValue(obj.value,this.allowedUnit);
var _1d=v;
var _1e=false;
var _1f=300;
var dv1=2;
var dv2=0.5;
if(!this.metric){
_1f=concord.unit.CmToIn(_1f);
dv1=concord.unit.CmToIn(dv1);
dv2=concord.unit.CmToIn(dv2);
}
switch(id){
case this.heightId:
if(h>_1f){
_1d=_1f;
_1e=true;
}
if(_1d<t+b+dv1){
_1d=t+b+dv1;
_1e=true;
}
break;
case this.widthId:
if(w>_1f){
_1d=_1f;
_1e=true;
}
if(_1d<l+r+dv2){
_1d=l+r+dv2;
_1e=true;
}
break;
case this.topMarginId:
if(t<0){
_1d=0;
_1e=true;
}
if(_1d>h-b-dv1){
_1d=h-b-dv1;
_1e=true;
}
if(_1d<0){
_1d=0;
_1e=true;
this.checkScope(this.bottomMarginId);
}
break;
case this.bottomMarginId:
if(b<0){
_1d=0;
_1e=true;
}
if(_1d>h-t-dv1){
_1d=h-t-dv1;
_1e=true;
}
if(_1d<0){
_1d=0;
_1e=true;
this.checkScope(this.topMarginId);
}
break;
case this.leftMarginId:
if(l<0){
_1d=0;
_1e=true;
}
if(_1d>w-r-dv2){
_1d=w-r-dv2;
_1e=true;
}
if(_1d<0){
_1d=0;
_1e=true;
this.checkScope(this.rightMarginId);
}
break;
case this.rightMarginId:
if(r<0){
_1d=0;
_1e=true;
}
if(_1d>w-l-dv2){
_1d=w-l-dv2;
_1e=true;
}
if(_1d<0){
_1d=0;
_1e=true;
this.checkScope(this.leftMarginId);
}
break;
case this.headerHeightId:
if(this.docTypeCur===this.docTypeText){
var mhh=(h>_1f)?_1f:h;
if(hh>mhh){
_1d=mhh;
_1e=true;
}
if(_1d<0){
_1d=0;
_1e=true;
}
}
break;
case this.footerHeightId:
if(this.docTypeCur===this.docTypeText){
var mhh=(h>_1f)?_1f:h;
if(fh>mhh){
_1d=mhh;
_1e=true;
}
if(_1d<0){
_1d=0;
_1e=true;
}
}
break;
default:
break;
}
if(_1e){
this.showWarningMsg(this.dialog);
}
obj.value=this.formatNumber(_1d);
},getPreValue:function(id){
switch(id){
case this.heightId:
return this.cur_value[0];
case this.widthId:
return this.cur_value[1];
case this.topMarginId:
return this.cur_value[2];
case this.bottomMarginId:
return this.cur_value[3];
case this.leftMarginId:
return this.cur_value[4];
case this.rightMarginId:
return this.cur_value[5];
case this.headerHeightId:
return this.cur_value[11];
case this.footerHeightId:
return this.cur_value[12];
}
},checkValue:function(id){
var obj=dojo.byId(id);
if(!this.checkInput(id)){
this.showWarningMsg(this.dialog);
obj.value=this.formatNumber(this.getPreValue(id));
}else{
this.checkScope(id);
}
if(id==this.widthId||id==this.heightId){
var h=concord.unit.parseValue((dojo.byId(this.heightId).value),this.allowedUnit);
var w=concord.unit.parseValue((dojo.byId(this.widthId).value),this.allowedUnit);
var _20=-1;
var _21=dijit.byId(this.comboBoxId);
for(i=0;i<this.SIZE_COUNT;i++){
if(h==this.sizeHeightArray[i]&&w==this.sizeWidthArray[i]){
_20=i;
_21.setValue(this.sizeNamesArray[i]);
var _22=dojo.byId(this.radioLandscapeId);
_22.checked=false;
var _23=dojo.byId(this.radioPortaitId);
_23.checked=true;
this.CURRENT_MODE=this.PORTRAIT_MODE;
break;
}else{
if(w==this.sizeHeightArray[i]&&h==this.sizeWidthArray[i]){
_20=i;
_21.setValue(this.sizeNamesArray[i]);
var _22=dojo.byId(this.radioLandscapeId);
_22.checked=true;
var _23=dojo.byId(this.radioPortaitId);
_23.checked=false;
this.CURRENT_MODE=this.LANDSCAPE_MODE;
break;
}
}
}
if(_20==-1){
_21.setValue(this.sizeNamesArray[12]);
}
}
},checkInput:function(id){
var _24=concord.unit.parseValue(dojo.byId(id).value,this.allowedUnit);
if(isNaN(_24)||_24<0){
return false;
}else{
return true;
}
},isInitialsChanged:function(){
var _25=false;
if(this.initiated){
for(var i=0;i<this.cur_value.length;i++){
if(this.cur_value[i]!=this.orig_value[i]){
_25=true;
break;
}
}
}else{
_25=true;
}
return _25;
},storeOrigValue:function(){
this.storeCurrentValue();
for(i=0;i<this.cur_value.length;i++){
this.orig_value[i]=this.cur_value[i];
}
},storeCurrentValue:function(){
this.cur_value[0]=concord.unit.parseValue(dojo.byId(this.heightId).value,this.allowedUnit);
this.cur_value[1]=concord.unit.parseValue(dojo.byId(this.widthId).value,this.allowedUnit);
this.cur_value[2]=concord.unit.parseValue(dojo.byId(this.topMarginId).value,this.allowedUnit);
this.cur_value[3]=concord.unit.parseValue(dojo.byId(this.bottomMarginId).value,this.allowedUnit);
this.cur_value[4]=concord.unit.parseValue(dojo.byId(this.leftMarginId).value,this.allowedUnit);
this.cur_value[5]=concord.unit.parseValue(dojo.byId(this.rightMarginId).value,this.allowedUnit);
this.cur_value[6]=dojo.byId(this.radioLandscapeId).checked;
this.cur_value[7]=dojo.byId(this.radioPortaitId).checked;
if(this.docTypeCur===this.docTypeText||this.docTypeCur===this.docTypeSheet){
this.cur_value[8]=dojo.byId(this.headerCheckId).checked;
this.cur_value[9]=dojo.byId(this.footerCheckId).checked;
if(this.docTypeCur===this.docTypeSheet){
this.cur_value[10]=dojo.byId(this.gridlineCheckId).checked;
}else{
this.cur_value[11]=concord.unit.parseValue(dojo.byId(this.headerHeightId).value,this.allowedUnit);
this.cur_value[12]=concord.unit.parseValue(dojo.byId(this.footerHeightId).value,this.allowedUnit);
}
}
this.cur_value[13]=dojo.byId(this.taggedpdfCheckId).checked;
},changeStatus:function(){
var _26=this.getIndex(dojo.byId(this.comboBoxId).value);
if(_26==-1){
this.showWarningMsg(this.dialog);
this.checkValue(this.widthId);
return;
}
var _27=dojo.byId(this.widthId);
var _28=dojo.byId(this.heightId);
if(_26>=0&&_26<this.SIZE_COUNT){
if(_26!=12&&this.CURRENT_MODE==this.PORTRAIT_MODE){
_27.value=this.formatNumber(this.sizeWidthArray[_26]);
_28.value=this.formatNumber(this.sizeHeightArray[_26]);
}else{
if(_26!=12&&this.CURRENT_MODE==this.LANDSCAPE_MODE){
_28.value=this.formatNumber(this.sizeWidthArray[_26]);
_27.value=this.formatNumber(this.sizeHeightArray[_26]);
}
}
this.checkValue(this.bottomMarginId);
this.checkValue(this.rightMarginId);
}
},getIndex:function(val){
for(var i=0;i<this.sizeNamesArray.length;i++){
if(val==this.sizeNamesArray[i]){
return i;
break;
}
}
return -1;
},changePageOrderMode:function(_29){
this.IS_LEFT_TO_RIGHT_ORDER=_29;
var _2a=dojo.byId(this.radioTopToBottomId);
var _2b=dojo.byId(this.radioLeftToRightId);
if(_29){
dojo.attr(_2a,"value",false);
dojo.attr(_2b,"value",true);
}else{
dojo.attr(_2a,"value",true);
dojo.attr(_2b,"value",false);
}
},showWarningMsg:function(_2c){
if(this.internalWarningMsg){
_2c.msgContainer.remove(this.internalWarningMsg);
this.internalWarningMsg=null;
}
var msg=this.internalWarningMsg={};
msg.warning=true;
msg.message=this.nls.PAGE_SETUP_INVALID_MSG;
_2c.msgContainer.add(msg);
setTimeout(dojo.hitch(this,function(){
if(this.internalWarningMsg){
this.dialog.msgContainer.remove(this.internalWarningMsg);
this.internalWarningMsg=null;
}
}),5000);
},getPageSettings:function(){
var ret={};
ret["hasSet"]=false;
var url=concord.global.getDocSettingsUri(this.file.getId())+"/page";
var _2d=this.app.getAuthenticatedUserId();
var _2e,_2f;
var _30=concord.global.xhrGet({url:url,filesUserId:_2d,handleAs:"json",load:function(_31,_32){
},error:function(_33,_34){
},sync:true,preventCache:false});
if(_30.ioArgs.xhr.status==200){
var _35=_30.results[0];
for(var key in _35){
ret["hasSet"]=true;
var _36=_35[key];
switch(key){
case "pageWidth":
case "pageHeight":
case "marginLeft":
case "marginRight":
case "marginTop":
case "marginBottom":
try{
ret[key]=parseFloat(_36.substring(0,_36.length-2));
}
catch(exception){
ret[key]=null;
}
break;
case "orientation":
case "pageOrder":
ret[key]=_36;
break;
default:
break;
}
}
}else{
return null;
}
return ret;
},initPageOrder:function(){
if(this.settings&&this.settings.pageOrder){
if(this.settings.pageOrder!="ttb"){
this.IS_LEFT_TO_RIGHT_ORDER=true;
}else{
this.IS_LEFT_TO_RIGHT_ORDER=false;
}
}else{
this.IS_LEFT_TO_RIGHT_ORDER=false;
}
},isDefaultPortrait:function(){
if(this.settings&&this.settings.orientation){
if(this.settings.orientation=="portrait"){
return true;
}else{
return false;
}
}
if(this.docTypeCur===this.docTypePres){
return false;
}else{
return true;
}
},getDefaultMarginL:function(){
if(this.settings){
if(this.settings.marginLeft!=null){
var _37=this.metric?this.settings.marginLeft:concord.unit.CmToIn(this.settings.marginLeft);
return this.formatNumber(_37);
}
}
return this.defaultMargin;
},getDefaultMarginR:function(){
if(this.settings){
if(this.settings.marginRight!=null){
var _38=this.metric?this.settings.marginRight:concord.unit.CmToIn(this.settings.marginRight);
return this.formatNumber(_38);
}
}
return this.defaultMargin;
},getDefaultMarginT:function(){
if(this.settings){
if(this.settings.marginTop!=null){
var _39=this.metric?this.settings.marginTop:concord.unit.CmToIn(this.settings.marginTop);
return this.formatNumber(_39);
}
}
return this.defaultMargin;
},getDefaultMarginB:function(){
if(this.settings){
if(this.settings.marginBottom!=null){
var _3a=this.metric?this.settings.marginBottom:concord.unit.CmToIn(this.settings.marginBottom);
return this.formatNumber(_3a);
}
}
return this.defaultMargin;
},getDefaultHeight:function(){
if(this.settings&&this.settings.pageHeight){
var _3b=this.metric?this.settings.pageHeight:concord.unit.CmToIn(this.settings.pageHeight);
return this.formatNumber(_3b);
}
var i=this.getDefaultSizeIndex(this.locale);
if(i==this.SIZE_USER){
i=this.getDefaultSizeIndexByLocale(this.locale);
}
return this.formatNumber(this.sizeHeightArray[i]);
},getDefaultWidth:function(){
if(this.settings&&this.settings.pageWidth){
var _3c=this.metric?this.settings.pageWidth:concord.unit.CmToIn(this.settings.pageWidth);
return this.formatNumber(_3c);
}
var i=this.getDefaultSizeIndex(this.locale);
if(i==this.SIZE_USER){
i=this.getDefaultSizeIndexByLocale(this.locale);
}
return this.formatNumber(this.sizeWidthArray[i]);
},getDefaultSizeIndex:function(_3d){
if(this.settings){
if(this.settings.pageWidth&&this.settings.pageHeight){
var h=this.formatNumber(this.settings.pageHeight,true);
var w=this.formatNumber(this.settings.pageWidth,true);
for(var _3e=0;_3e<this.sizeNamesArray.length;_3e++){
if((w==this.widthCMData[_3e]&&h==this.heightCMData[_3e])||(h==this.widthCMData[_3e]&&w==this.heightCMData[_3e])){
return _3e;
}
}
return this.SIZE_USER;
}
}
return this.getDefaultSizeIndexByLocale(_3d);
},getDefaultSizeIndexByLocale:function(_3f){
var i=1;
if(_3f=="en-us"||_3f=="en-ca"||_3f=="en-ph"||_3f=="es-cl"||_3f=="es-mx"||_3f=="es-co"||_3f=="es-ve"||_3f=="es-pr"){
i=9;
}
return i;
},_createContent:function(_40){
this._initDocType();
this.metric=concord.unit.isMeticUnit();
if(!this.unit){
this.unit=this.metric?this.nls.CM_LABEL:"\"";
}
if(!this.allowedUnit){
if(this.metric){
this.allowedUnit={"cm":this.nls.CM_LABEL};
}else{
this.allowedUnit={"in":"\""};
}
}
this._loadLocalArrays();
this.settings=this.getPageSettings();
if(this.settings&&this.settings["hasSet"]){
this.initiated=true;
}
var _41=dojo.create("table",null,_40);
_41.style.cssText="width: 100%;";
dijit.setWaiRole(_41,"presentation");
_41.id=this.tableId;
var _42=dojo.create("tbody",null,_41);
var _43=dojo.create("tr",null,_42);
var _44=dojo.create("td",null,_43);
dojo.attr(_44,"colSpan","2");
var _45=dojo.create("div",null,_44);
dijit.setWaiRole(_45,"alert");
this.dialog.msgContainer=new lconn.share.widget.MessageContainer({nls:this.app.nls},_45);
var _46=dojo.create("tr",null,_42);
var _47=dojo.create("td",null,_46);
var _48=dojo.create("td",null,_46);
var _49=dojo.create("table",null,_47);
dijit.setWaiRole(_49,"presentation");
var _4a=dojo.create("tbody",null,_49);
var _4b=dojo.create("table",null,_48);
dijit.setWaiRole(_4b,"presentation");
var _4c=dojo.create("tbody",null,_4b);
var _4d=dojo.create("tr",null,_4a);
var _4e=dojo.create("tr",null,_4a);
var _4f=dojo.create("tr",null,_4a);
var _50=dojo.create("tr",null,_4a);
var _51=dojo.create("tr",null,_4a);
var _52=dojo.create("tr",null,_4a);
var _53=dojo.create("tr",null,_4a);
var _54=dojo.create("tr",null,_4a);
var _55=dojo.create("tr",null,_4a);
var _56=dojo.create("tr",null,_4c);
var _57=dojo.create("tr",null,_4c);
var _58=dojo.create("tr",null,_4c);
var _59=dojo.create("tr",null,_4c);
var _5a=dojo.create("tr",null,_4c);
var _5b=dojo.create("tr",null,_4c);
var _5c=dojo.create("tr",null,_4c);
var _5d=dojo.create("tr",null,_4c);
var _5e=dojo.create("td",null,_4d);
var _5f=dojo.create("td",null,_56);
var _60=dojo.create("td",null,_56);
var _61=dojo.create("td",null,_57);
var _62=dojo.create("td",null,_57);
var _63=dojo.create("td",null,_4e);
var _64=dojo.create("td",null,_58);
var _65=dojo.create("td",null,_58);
var _66=dojo.create("td",null,_4f);
var _67=dojo.create("td",null,_4f);
var _68=dojo.create("td",null,_59);
var _69=dojo.create("td",null,_59);
var _6a=dojo.create("td",null,_50);
var _6b=dojo.create("td",null,_50);
var _6c=dojo.create("td",null,_5a);
var _6d=dojo.create("td",null,_5a);
var _6e=dojo.create("td",null,_51);
var _6f=dojo.create("td",null,_51);
var _70=dojo.create("td",null,_5b);
var _71=dojo.create("td",null,_5b);
var _72=dojo.create("td",null,_52);
var _73=dojo.create("td",null,_52);
var _74=dojo.create("td",null,_53);
var _75=dojo.create("td",null,_53);
var _76=dojo.create("td",null,_54);
var _77=dojo.create("td",null,_54);
var _78=dojo.create("td",null,_5c);
var _79=dojo.create("td",null,_5c);
var _7a=dojo.create("td",null,_55);
var _7b=dojo.create("td",null,_55);
var _7c=dojo.create("td",null,_5d);
var _7d=dojo.create("td",null,_5d);
dojo.attr(_5e,"colSpan","2");
dojo.attr(_63,"colSpan","2");
dojo.attr(_72,"colSpan","2");
dojo.attr(_70,"colSpan","2");
dojo.attr(_78,"colSpan","2");
var _7e="font-weight: normal;";
var _7f="width: 80px;";
var _80="padding-top: 5px";
this.CURRENT_MODE=this.isDefaultPortrait();
var _81=dojo.create("fieldset",null,_5e);
var _82=dojo.create("legend",null,_81);
var _83=this.createDivLabel(_82,this.nls.ORIENTATION_LABEL);
this.PORTRAIT_MODE=true;
this.LANDSCAPE_MODE=false;
var _84=this.createInputWithType(_81,"taskType",this.radioPortaitId,"radio",this.PORTRAIT_MODE,this.CURRENT_MODE);
var _85=this.createNestLabel(_81,this.nls.PORTRAIT,this.radioPortaitId);
_85.style.cssText=_7e;
var _86=this.createInputWithType(_81,"taskType",this.radioLandscapeId,"radio",this.LANDSCAPE_MODE,!this.CURRENT_MODE);
var _87=this.createNestLabel(_81,this.nls.LANDSCAPE,this.radioLandscapeId);
_87.style.cssText=_7e;
this.connectArray.push(dojo.connect(_86,"onclick",dojo.hitch(this,"changeOrientationMode",this.LANDSCAPE_MODE)));
this.connectArray.push(dojo.connect(_84,"onclick",dojo.hitch(this,"changeOrientationMode",this.PORTRAIT_MODE)));
var _88=this.createDivLabel(_63,this.nls.PAPER_FORMAT_LABEL);
var _89=this.createDivLabel(_66,this.nls.PAPER_SIZE_LABEL);
_89.style.cssText=_7e;
var _8a={identifier:"id",label:"name",items:[{id:0,name:this.sizeNamesArray[0]},{id:1,name:this.sizeNamesArray[1]},{id:2,name:this.sizeNamesArray[2]},{id:3,name:this.sizeNamesArray[3]},{id:4,name:this.sizeNamesArray[4]},{id:5,name:this.sizeNamesArray[5]},{id:6,name:this.sizeNamesArray[6]},{id:7,name:this.sizeNamesArray[7]},{id:8,name:this.sizeNamesArray[8]},{id:9,name:this.sizeNamesArray[9]},{id:10,name:this.sizeNamesArray[10]},{id:11,name:this.sizeNamesArray[11]},{id:12,name:this.sizeNamesArray[12]},{id:13,name:this.sizeNamesArray[13]},{id:14,name:this.sizeNamesArray[14]},{id:15,name:this.sizeNamesArray[15]},{id:16,name:this.sizeNamesArray[16]},{id:17,name:this.sizeNamesArray[17]},{id:18,name:this.sizeNamesArray[18]},{id:19,name:this.sizeNamesArray[19]},{id:20,name:this.sizeNamesArray[20]},{id:21,name:this.sizeNamesArray[21]},{id:22,name:this.sizeNamesArray[22]},{id:23,name:this.sizeNamesArray[23]},{id:24,name:this.sizeNamesArray[24]},{id:25,name:this.sizeNamesArray[25]},{id:26,name:this.sizeNamesArray[26]}]};
var _8b=new dojo.data.ItemFileReadStore({data:_8a});
var _8c=this.sizeCombox=new dijit.form.ComboBox({id:this.comboBoxId,name:"fontname",value:this.sizeNamesArray[1],store:_8b,style:"width:100px;height:20px",searchAttr:"name"});
this.connectArray.push(dojo.connect(_8c,"onChange",dojo.hitch(this,"changeStatus")));
dojo.attr(_89,"for",this.comboBoxId);
_67.appendChild(_8c.domNode);
if(_8c.textbox){
dojo.style(_8c.textbox,{"height":"18px","fontSize":"10pt","padding":"1px"});
}
dojo.query(".dijitButtonNode",_8c.domNode).forEach(function(_8d,_8e,_8f){
dojo.style(_8d,{"height":"16px","border":"0px"});
});
var _90=this.createDivLabel(_6a,this.nls.HEIGHT);
_90.style.cssText=_7e;
var _91=this.createInputWithType(_6b,"heighttext",this.heightId,"text",this.getDefaultHeight(),null);
_91.style.cssText=_7f;
dijit.setWaiState(_91,"label",(this.metric?this.nls.HEIGHT_DESC:this.nls.HEIGHT_DESC2));
var _92=this.createDivLabel(_6e,this.nls.WIDTH,"printSpreadsheetLabel");
_92.style.cssText=_7e;
var _93=this.createInputWithType(_6f,"widthtext",this.widthId,"text",this.getDefaultWidth(),null);
_93.style.cssText=_7f;
dijit.setWaiState(_93,"label",(this.metric?this.nls.WIDTH_DESC:this.nls.WIDTH_DESC2));
this.connectArray.push(dojo.connect(_91,"onchange",dojo.hitch(this,"checkValue",this.heightId)));
this.connectArray.push(dojo.connect(_93,"onchange",dojo.hitch(this,"checkValue",this.widthId)));
var _94=this.createDivLabel(_5f,this.nls.MARGINS_LABEL);
var _95=this.createDivLabel(_61,this.nls.TOP);
_95.style.cssText=_7e;
var _96=this.createInputWithType(_62,"toptext",this.topMarginId,"text",this.getDefaultMarginT(),null);
_96.style.cssText=_7f;
dijit.setWaiState(_96,"label",(this.metric?this.nls.TOP_DESC:this.nls.TOP_DESC2));
var _97=this.createDivLabel(_64,this.nls.BOTTOM);
_97.style.cssText=_7e;
var _98=this.createInputWithType(_65,"bottomtext",this.bottomMarginId,"text",this.getDefaultMarginB(),null);
_98.style.cssText=_7f;
dijit.setWaiState(_98,"label",(this.metric?this.nls.BOTTOM_DESC:this.nls.BOTTOM_DESC2));
var _99=this.createDivLabel(_68,this.nls.LEFT);
_99.style.cssText=_7e;
var _9a=this.createInputWithType(_69,"lefttext",this.leftMarginId,"text",this.getDefaultMarginL(),null);
_9a.style.cssText=_7f;
dijit.setWaiState(_9a,"label",(this.metric?this.nls.LEFT_DESC:this.nls.LEFT_DESC2));
var _9b=this.createDivLabel(_6c,this.nls.RIGHT);
_9b.style.cssText=_7e;
var _9c=this.createInputWithType(_6d,"righttext",this.rightMarginId,"text",this.getDefaultMarginR(),null);
_9c.style.cssText=_7f;
dijit.setWaiState(_9c,"label",(this.metric?this.nls.RIGHT_DESC:this.nls.RIGHT_DESC2));
this.connectArray.push(dojo.connect(_96,"onchange",dojo.hitch(this,"checkValue",this.topMarginId)));
this.connectArray.push(dojo.connect(_98,"onchange",dojo.hitch(this,"checkValue",this.bottomMarginId)));
this.connectArray.push(dojo.connect(_9a,"onchange",dojo.hitch(this,"checkValue",this.leftMarginId)));
this.connectArray.push(dojo.connect(_9c,"onchange",dojo.hitch(this,"checkValue",this.rightMarginId)));
var _9d=this.createDivLabel(_72,this.nls.DISPLAY_OPTION_LABEL);
if(this.docTypeCur===this.docTypeText||this.docTypeCur===this.docTypeSheet){
var _9e=this.createInputWithType(_74,"header",this.headerCheckId,"checkbox",null,true);
var _9f=this.createNestLabel(_74,this.nls.HEADER,this.headerCheckId);
_9f.style.cssText=_7e;
var _a0=this.createInputWithType(_76,"footer",this.footerCheckId,"checkbox",null,true);
var _a1=this.createNestLabel(_76,this.nls.FOOTER,this.footerCheckId);
_a1.style.cssText=_7e;
if(this.docTypeCur===this.docTypeText){
var _a2="0.50";
_a2=this.metric?_a2:concord.unit.CmToIn(_a2);
var _a3=this.createInputWithType(_75,"heighttext",this.headerHeightId,"text",this.formatNumber(_a2),null);
_a3.style.cssText=_7f;
dijit.setWaiState(_a3,"label",this.nls.HEADER_DESC);
var _a4=this.createInputWithType(_77,"heighttext",this.footerHeightId,"text",this.formatNumber(_a2),null);
_a4.style.cssText=_7f;
dijit.setWaiState(_a4,"label",this.nls.FOOTER_DESC);
this.connectArray.push(dojo.connect(_a3,"onchange",dojo.hitch(this,"checkValue",this.headerHeightId)));
this.connectArray.push(dojo.connect(_a4,"onchange",dojo.hitch(this,"checkValue",this.footerHeightId)));
var _a5=this.createInputWithType(_7a,"taggedpdf",this.taggedpdfCheckId,"checkbox",null,false);
var _a6=this.createNestLabel(_7a,this.nls.TAGGED_PDF,this.taggedpdfCheckId);
_a6.style.cssText=_7e;
}else{
var _a5=this.createInputWithType(_75,"taggedpdf",this.taggedpdfCheckId,"checkbox",null,false);
var _a6=this.createNestLabel(_75,this.nls.TAGGED_PDF,this.taggedpdfCheckId);
_a6.style.cssText=_7e;
var _a7=this.createInputWithType(_77,"gridlilne",this.gridlineCheckId,"checkbox",null,false);
var _a8=this.createNestLabel(_77,this.nls.GRIDLINE,this.gridlineCheckId);
_a8.style.cssText=_7e;
this.initPageOrder();
var _a9=dojo.create("fieldset",null,_70);
var _82=dojo.create("legend",null,_a9);
var _aa=this.createDivLabel(_82,this.nls.PAGE_LABEL);
var _ab=dojo.create("div",null,_a9);
var _ac=dojo.create("div",null,_a9);
_ab.style.cssText=_80;
_ac.style.cssText=_80;
var _ad=this.createInputWithType(_ab,"pageOrder",this.radioTopToBottomId,"radio",!this.IS_LEFT_TO_RIGHT_ORDER,!this.IS_LEFT_TO_RIGHT_ORDER);
var _ae=this.createNestLabel(_ab,this.nls.PAGE_TYPE1,this.radioTopToBottomId);
_ae.style.cssText=_7e;
var _af=this.createInputWithType(_ac,"pageOrder",this.radioLeftToRightId,"radio",this.IS_LEFT_TO_RIGHT_ORDER,this.IS_LEFT_TO_RIGHT_ORDER);
var _b0=this.createNestLabel(_ac,this.nls.PAGE_TYPE2,this.radioLeftToRightId);
_b0.style.cssText=_7e;
this.connectArray.push(dojo.connect(_ad,"onclick",dojo.hitch(this,"changePageOrderMode",false)));
this.connectArray.push(dojo.connect(_af,"onclick",dojo.hitch(this,"changePageOrderMode",true)));
}
}else{
var _a5=this.createInputWithType(_74,"taggedpdf",this.taggedpdfCheckId,"checkbox",null,false);
var _a6=this.createNestLabel(_74,this.nls.TAGGED_PDF,this.taggedpdfCheckId);
_a6.style.cssText=_7e;
}
setTimeout(dojo.hitch(this,function(){
this.setDefaultPaperSize(this.locale);
this.storeOrigValue();
}),30);
},constructor:function(app,_b1,opt){
this.inherited(arguments);
this.app=app;
this.wDialog="600px";
this.nls=dojo.mixin(this.nls,{OK:opt.OK,OkTitle:opt.OkTitle,pageSetupDialogTitle:opt.pageSetupDialogTitle,ORIENTATION_LABEL:opt.ORIENTATION_LABEL,PORTRAIT:opt.PORTRAIT,LANDSCAPE:opt.LANDSCAPE,MARGINS_LABEL:opt.MARGINS_LABEL,TOP:opt.TOP,BOTTOM:opt.BOTTOM,LEFT:opt.LEFT,RIGHT:opt.RIGHT,TOP_DESC:opt.TOP_DESC,TOP_DESC2:opt.TOP_DESC2,BOTTOM_DESC:opt.BOTTOM_DESC,BOTTOM_DESC2:opt.BOTTOM_DESC2,LEFT_DESC:opt.LEFT_DESC,LEFT_DESC2:opt.LEFT_DESC2,RIGHT_DESC:opt.RIGHT_DESC,RIGHT_DESC2:opt.RIGHT_DESC2,PAPER_FORMAT_LABEL:opt.PAPER_FORMAT_LABEL,PAPER_SIZE_LABEL:opt.PAPER_SIZE_LABEL,HEIGHT:opt.HEIGHT,HEIGHT_DESC:opt.HEIGHT_DESC,HEIGHT_DESC2:opt.HEIGHT_DESC2,WIDTH:opt.WIDTH,WIDTH_DESC:opt.WIDTH_DESC,WIDTH_DESC2:opt.WIDTH_DESC2,CM_LABEL:opt.CM_LABEL,LETTER:opt.LETTER,LEGAL:opt.LEGAL,TABLOID:opt.TABLOID,USER:opt.USER,SIZE1:opt.SIZE1,SIZE2:opt.SIZE2,SIZE3:opt.SIZE3,SIZE4:opt.SIZE4,SIZE5:opt.SIZE5,SIZE6:opt.SIZE6,SIZE7:opt.SIZE7,SIZE8:opt.SIZE8,SIZE9:opt.SIZE9,DISPLAY_OPTION_LABEL:opt.DISPLAY_OPTION_LABEL,HEADER:opt.HEADER,HEADER_DESC:opt.HEADER_DESC,FOOTER:opt.FOOTER,FOOTER_DESC:opt.FOOTER_DESC,GRIDLINE:opt.GRIDLINE,TAGGED_PDF:opt.TAGGED_PDF,PAGE_LABEL:opt.PAGE_LABEL,PAGE_TYPE1:opt.PAGE_TYPE1,PAGE_TYPE2:opt.PAGE_TYPE2,PAGE_SETUP_INVALID_MSG:opt.PAGE_SETUP_INVALID_MSG});
},getNls:function(app){
return concord.global.nls;
},createDialog:function(_b2,opt,_b3){
opt=dojo.mixin(opt,{title:this.nls.pageSetupDialogTitle});
this.dialog=_b3;
if(typeof (_b2)!="undefined"&&_b2!=null){
this.file=_b2;
}
this.inherited(arguments);
},renderQuestion:function(d,el,_b4,opt){
this.dialog.dialogContent.style.cssText="max-height: 380px;";
var div=d.createElement("div");
el.appendChild(div);
this._createContent(div);
},onSuccess:function(){
this.storeCurrentValue();
var _b5="";
if(this.docTypeCur===this.docTypeSheet){
var _b6=!this.IS_LEFT_TO_RIGHT_ORDER;
_b5="&page="+_b6+"&header="+this.cur_value[8]+"&footer="+this.cur_value[9]+"&gridline="+this.cur_value[10]+this.getCommonParameters()+"&UseTaggedPDF="+this.cur_value[13];
}else{
if(this.docTypeCur===this.docTypeText){
_b5="&header="+this.cur_value[8]+"&footer="+this.cur_value[9]+this.getCommonParameters()+"&HH="+this.getScalingMarginValue(this.cur_value[11])+"&FH="+this.getScalingMarginValue(this.cur_value[12])+"&UseTaggedPDF="+this.cur_value[13];
}else{
_b5=this.getCommonParameters()+"&UseTaggedPDF="+this.cur_value[13];
}
}
var url=concord.global.getDocViewURL(this.file.getId(),"pdf");
if(this.isInitialsChanged()){
url+=_b5;
}
window.open(url,"_blank","");
},getScalingMarginValue:function(_b7){
var _b8=this.metric?1000:2540;
if(!this.metric){
if(_b7==0.79){
return 2000;
}
}
return Math.floor(_b7*_b8);
},getScalingValue:function(_b9,_ba){
if(this.metric){
return _b9*1000;
}else{
var _bb=this.getIndex(dojo.byId(this.comboBoxId).value);
if(_bb>=0&&_bb<this.SIZE_COUNT){
if(_bb!=12&&this.CURRENT_MODE==this.PORTRAIT_MODE){
var _bc=_ba?this.widthCMData[_bb]:this.heightCMData[_bb];
return _bc*1000;
}else{
if(_bb!=12&&this.CURRENT_MODE==this.LANDSCAPE_MODE){
var _bc=_ba?this.heightCMData[_bb]:this.widthCMData[_bb];
return _bc*1000;
}
}
}
return Math.floor(_b9*2540);
}
},getCommonParameters:function(){
return "&top="+this.getScalingMarginValue(this.cur_value[2])+"&bottom="+this.getScalingMarginValue(this.cur_value[3])+"&left="+this.getScalingMarginValue(this.cur_value[4])+"&right="+this.getScalingMarginValue(this.cur_value[5])+"&height="+this.getScalingValue(this.cur_value[0])+"&width="+this.getScalingValue(this.cur_value[1],true);
},_cmToInchArray:function(_bd){
var _be=new Array();
for(var _bf=0;_bf<_bd.length;_bf++){
_be.push(this._cmToFormatInch(_bd[_bf]));
}
return _be;
},_cmToFormatInch:function(num){
var ret=num;
if(ret=="User"){
return ret;
}else{
ret=num/2.54;
}
ret=dojo.number.format(ret,{pattern:"#.00",locale:dojo.locale});
return ret;
},destroyRecursive:function(){
try{
for(var i=0;i<this.connectArray.length;i++){
dojo.disconnect(this.connectArray[i]);
}
if(this.sizeCombox){
this.sizeCombox.destroyRecursive();
}
dojo.destroy(this.tableId);
}
catch(e){
}
}});
}


;if(!dojo._hasResource["concord.actionEdit"]){
dojo._hasResource["concord.actionEdit"]=true;
dojo.provide("concord.actionEdit");














dojo.require["lconn.core.config.features"];
dojo.requireLocalization("lconn.files","action");
dojo.provide("com.ibm.concord.lcext.CCDNewFrom");
dojo.declare("com.ibm.concord.lcext.CCDNewFrom",[lconn.share.action.DeferredAction],{dialog:null,bytesForName:null,isPrimary:true,defaultIsExternal:false,connectArray:[],constructor:function(_1,_2){
this.inherited(arguments);
this.app=_1;
this.opts=_2;
this.name=concord.global.nls.newFromName;
this._isExternalSupported=!!dojo.getObject("lconn.share.config.features.sharingIntent");
this.tooltip=concord.global.nls.newFromTooltip;
this.filesnls=dojo.i18n.getLocalization("lconn.files","action").UPLOAD_FILE;
},destroyDialog:function(){
if(this.dialog){
this.dialog.cancel();
this.dialog.hide();
this.dialog.destroyRecursive();
this.dialog=null;
this.clearResources();
}
},clearResources:function(){
this.internalWarningMsg=null;
for(var i=0;i<this.connectArray.length;i++){
dojo.disconnect(this.connectArray[i]);
}
},destroy:function(){
this.inherited(arguments);
this.destroyDialog();
},isValid:function(_3,_4){
var _5=_3.getExtension();
var _6={"ott":1,"ots":1,"otp":1,"dot":1,"xlt":1,"pot":1,"dotx":1,"xltx":1,"potx":1};
if((!_3.isEncrypted())&&_5&&_6[_5.toLowerCase()]){
var _7=_3.getExtension();
var _8={"ott":concord.global.nls.newFromDocTip,"ots":concord.global.nls.newFromSheetTip,"otp":concord.global.nls.newFromPresTip,"dot":concord.global.nls.newFromDocTip,"xlt":concord.global.nls.newFromSheetTip,"pot":concord.global.nls.newFromPresTip,"dotx":concord.global.nls.newFromDocTip,"xltx":concord.global.nls.newFromSheetTip,"potx":concord.global.nls.newFromPresTip};
this.tooltip=_8[_7];
return true;
}
return false;
},isExternal:function(_9){
if(!this._isExternalSupported||!(this.app.declaredClass==="lconn.files.PersonalFiles")){
return false;
}
if(concord.global.shouldShowExternal(this.app)&&_9&&_9.extChkBox){
return _9.extChkBox.checked;
}else{
return this.defaultIsExternal;
}
},getDocContext:function(){
return this.app.getContext?this.app.getContext("file","create",true):null;
},isCommEditor:function(){
if(this.app.declaredClass==="lconn.files.comm.ReferentialWidget"){
var _a=this.app.getAuthenticatedUser();
return _a&&_a.permissions&&this.app.getLibrary(true)&&_a.permissions.canUploadToCommunity();
}
return false;
},updateInternalWarning:function(_b){
if(concord.global.shouldShowExternal(this.app)){
var _c=this.isExternal(_b);
if(!_c&&!this.internalWarningMsg){
var _d=this.internalWarningMsg={};
_d.warning=true;
_d.message=concord.global.nls.WARN_INTERNAL;
_b.msgContainer.add(_d);
}else{
if(this.internalWarningMsg){
_b.msgContainer.remove(this.internalWarningMsg);
this.internalWarningMsg=null;
}
}
}
},_trimName:function(){
if(this.dialog){
var _e=dojo.byId("concordnewfromtemplatedoc").value;
var i=lconn.share.util.text.getCharIndexForUtf8Index(_e,this.bytesForName);
if(i!=-1){
dojo.byId("concordnewfromtemplatedoc").value=_e.substring(0,i);
}
dojo.byId("concordduplicatetemplate").innerHTML="";
}
},execute:function(_f,opt){
this.destroyDialog();
if(concord.global.isNeedDocsSAML()&&!concord.global.haveDocsLTPA()){
concord.global.doDocsSSO();
}
var ext=_f.getExtension();
var _10={"ott":concord.global.nls.newFromDocTip,"ots":concord.global.nls.newFromSheetTip,"otp":concord.global.nls.newFromPresTip,"dot":concord.global.nls.newFromDocTip,"xlt":concord.global.nls.newFromSheetTip,"pot":concord.global.nls.newFromPresTip,"dotx":concord.global.nls.newFromDocTip,"xltx":concord.global.nls.newFromSheetTip,"potx":concord.global.nls.newFromPresTip};
var _11={"ott":concord.global.nls.newDocumentDialogInitialName,"ots":concord.global.nls.newSheetDialogInitialName,"otp":concord.global.nls.newPresDialogInitialName,"dot":concord.global.nls.newDocumentDialogInitialName,"xlt":concord.global.nls.newSheetDialogInitialName,"pot":concord.global.nls.newPresDialogInitialName,"dotx":concord.global.nls.newDocumentDialogInitialName,"xltx":concord.global.nls.newSheetDialogInitialName,"potx":concord.global.nls.newPresDialogInitialName};
var _12=this.dialog=new lconn.share.widget.LotusDialog({contextBase:this,title:concord.global.nls.newFromDialogName,contentClass:"lotusDialogContent",buttonOk:concord.global.nls.newDocumentDialogBtnOK,buttonOkTitle:concord.global.nls.newFromDialogName,buttonCancel:concord.global.nls.newDocumentDialogBtnCancel,_size:function(){
},onExecute:function(){
var _13=_f.getExtension();
var _14={"ott":"text","ots":"sheet","otp":"pres","dot":"text","xlt":"sheet","pot":"pres","dotx":"text","xltx":"sheet","potx":"pres"};
var _15={"ott":".odt","ots":".ods","otp":".odp","dot":".doc","xlt":".xls","pot":".ppt","dotx":".docx","xltx":".xlsx","potx":".pptx"};
dojo.byId("concordduplicatetemplate").innerHTML="";
var _16=dojo.byId("concordnewfromtemplatedoc").value;
if(dojo.trim(_16)==""){
dojo.byId("concordduplicatetemplate").innerHTML=concord.global.nls.newDocumentDialogNoNameErrMsg;
_12.keepOpen();
return;
}
if(!/^([^\\\/\:\*\?\"\<\>\|]+)$/.test(_16)){
var msg=dojo.string.substitute(concord.global.nls.newDocumentDialogIllegalErrMsg,[_16]);
msg=msg.replace(/</g,"&lt; ").replace(/>/g,"&gt; ");
dojo.byId("concordduplicatetemplate").innerHTML=msg;
_12.keepOpen();
return;
}
var _17=lconn.share.util.text.lengthUtf8(_15[_13]);
this.contextBase.bytesForName=lconn.share.util.validation.FILENAME_LENGTH-_17;
if(!lconn.share.util.validation.validateTextLength(_16,this.contextBase.bytesForName)){
var d=document;
var _18=dojo.byId("concordduplicatetemplate");
_18.appendChild(d.createTextNode(concord.global.nls.newDocumentDialog_WARN_LONG_DOCUMENTNAME));
_18.appendChild(d.createTextNode(" "));
var a=d.createElement("a");
a.href="javascript:;";
dijit.setWaiRole(a,"button");
dojo.connect(a,"onclick",this.contextBase,"_trimName");
a.appendChild(d.createTextNode(concord.global.nls.newDocumentDialog_TRIM_LONG_DOCUMENTNAME));
_18.appendChild(a);
_12.keepOpen();
return;
}
var _19=dojo.byId("concordnewfromtemplatedoc").value||_11[_13];
var _1a=null;
if("personalFiles"==_f.getLibraryType()){
_1a=lconn.share.config.baseUri+"form/api/userlibrary/"+this.contextBase.app.authenticatedUser.id+"/document/"+encodeURI(_19+_15[_13])+"/entry?identifier=label";
}else{
var _1b=window.commContextPath;
var _1c=_1b.lastIndexOf("communities");
_1b=_1b.substring(0,_1c);
_1a=_1b+"files/form/api/communitylibrary/"+this.contextBase.app.communityId+"/document/"+encodeURI(_19+_15[_13])+"/entry?identifier=label";
}
var _1d=true;
var _1e,_1f;
this.contextBase.app.net.headXml({url:_1a,noStatus:true,auth:{},preventCache:true,handle:function(r,io){
_1e=r;
_1f=io;
var _20;
try{
_20=io.xhr.status;
}
catch(e){
}
return (_20==200);
},sync:true});
if(_1f&&_1f.xhr.status==401){
}else{
if(_1f&&_1f.xhr.status==200){
dojo.byId("concordduplicatetemplate").innerHTML=concord.global.nls.newDocumentDialogDupErrMsg;
_12.keepOpen();
}else{
if(_1f&&_1f.xhr.status==404){
var _21=false;
var _22="";
var _23="";
var _24="";
var _25=this.contextBase.getDocContext();
if(_25){
_22=_25.type;
_23=_25.value;
if(_22=="folder"){
_24=_25.collectionType;
}
}
if(_22==undefined){
_22="";
}
if(_23==undefined){
_23="";
}
if(_24==undefined){
_24="";
}
if(this.extChkBox&&this.extChkBox.id){
var _26=dojo.byId(this.extChkBox.id);
if(_26){
_21=dojo.byId(this.extChkBox.id).checked;
}
}
if("personalFiles"==_f.getLibraryType()){
var _27=glb_concord_url_wnd_open+"/app/newdoc?type="+_14[_13]+"&template_uri="+_f.getId()+"&doc_title="+_19+"&isExternal="+_21+"&contextType="+_22+"&contextValue="+_23+"&contextFolder="+_24;
window.open(_27,"_blank","");
}else{
if(this.contextBase.isCommEditor()){
var _27=glb_concord_url_wnd_open+"/app/newdoc?type="+_14[_13]+"&template_uri="+_f.getId()+"&doc_title="+_19+"&community="+_f.getLibraryId()+"&isExternal="+_21+"&contextType="+_22+"&contextValue="+_23+"&contextFolder="+_24;
}else{
var _27=glb_concord_url_wnd_open+"/app/newdoc?type="+_14[_13]+"&template_uri="+_f.getId()+"&doc_title="+_19+"&isExternal="+_21+"&contextType="+_22+"&contextValue="+_23+"&contextFolder="+_24;
}
window.open(_27,"_blank","");
}
}else{
dojo.byId("concordduplicatetemplate").innerHTML=dojo.string.substitute(concord.global.nls.newDocumentDialogServerErrMsg2,[_19]);
_12.keepOpen();
return;
}
}
}
}});
_12.attr("style","width: 500px;");
dijit.setWaiState(_12.domNode,"describedby","create_from_template_in_ibm_docs_dec_div");
_12.show();
var d=document;
var _28=d.createElement("table");
_28.className="lotusFormTable";
dijit.setWaiRole(_28,"presentation");
var _29=d.createElement("colgroup");
_29.appendChild(d.createElement("col"));
var col=d.createElement("col");
col.width="100%";
_29.appendChild(col);
_28.appendChild(_29);
var _2a=d.createElement("tbody");
var _2b=d.createElement("tr");
var _2c=_2b.appendChild(d.createElement("td"));
_2c.colSpan=2;
var _2d=d.createElement("div");
dijit.setWaiRole(_2d,"alert");
_2c.appendChild(_2d);
this.dialog.msgContainer=new lconn.share.widget.MessageContainer({nls:this.app.nls},_2d);
_2a.appendChild(_2b);
var _2e=d.createElement("tr");
var _2f=_2e.appendChild(d.createElement("td"));
_2f.colSpan=2;
var _30=d.createElement("div");
_30.id="create_from_template_in_ibm_docs_dec_div";
var _31=d.createElement("p");
_31.innerHTML=_10[ext];
_30.appendChild(_31);
var _32=d.createElement("p");
_32.style.fontWeight="bold";
_32.innerHTML=concord.global.nls.newDocumentDialogContent;
_30.appendChild(_32);
_2f.appendChild(_30);
_2a.appendChild(_2e);
var tr=d.createElement("tr");
tr.className="lotusFormFieldRow";
var td=d.createElement("td");
td.className="lotusFormLabel lotusNowrap";
var _33=d.createElement("label");
var _34=concord.global.nls.newDocumentDialogNamepre;
_33.appendChild(d.createTextNode(_34));
td.appendChild(_33);
tr.appendChild(td);
var td=d.createElement("td");
var _35=d.createElement("input");
_35.id="concordnewfromtemplatedoc";
_35.type="text";
_35.value=_11[ext];
_35.className="lotusText";
_35.name="_tagsdoc";
dijit.setWaiState(_35,"required","true");
td.appendChild(_35);
dojo.attr(_33,"for",_35.id);
tr.appendChild(td);
_2a.appendChild(tr);
if(concord.global.shouldShowExternal(this.app)){
var tr2=d.createElement("tr");
tr2.className="lotusFormFieldRow";
var td1=tr2.appendChild(d.createElement("td"));
td1.className="lotusFormLabel";
var td2=tr2.appendChild(d.createElement("td"));
var _36=concord.global.getExternalWidget(_12,this.app,this.filesnls.SHARING_INTENT,td2,true);
if(_36){
_2a.appendChild(tr2);
this.connectArray.push(dojo.connect(_36,"onclick",dojo.hitch(this,function(evt){
this.updateInternalWarning(_12);
})));
}
}
_28.appendChild(_2a);
_12.containerNode.appendChild(_28);
var div=d.createElement("div");
div.id="concordduplicatetemplate";
div.style.color="red";
div.style.fontWeight="bold";
dijit.setWaiRole(div,"alert");
_12.containerNode.appendChild(div);
_35.select();
}});
dojo.provide("com.ibm.concord.lcext.CCDEdit");
dojo.declare("com.ibm.concord.lcext.CCDEdit",[lconn.share.action.DeferredAction],{isPrimary:true,constructor:function(app,_37){
this.inherited(arguments);
this.app=app;
this.name=concord.global.nls.editName;
this.tooltip=concord.global.nls.editTooltip;
this.parentId="lconn_files_action_EditGroup";
},isValid:function(_38,opt){
var _39=_38.getExtension();
var _3a={"ppt":1,"odp":1,"ods":1,"xls":1,"txt":1,"csv":1,"docx":1,"doc":1,"odt":1,"pptx":1,"xlsx":1,"xlsm":1};
if((!_38.isEncrypted())&&_39&&_3a[_39.toLowerCase()]){
_39=_39.toLowerCase();
if((("csv"==_39)||("txt"==_39))&&(0==_38.getSize())){
return false;
}
if(concord.global.isEditor(_38)){
if(concord.global.isIBMDocFile(_38)){
return true;
}else{
return (concord.global.isOwner(_38,this.app)||concord.global.isUploadNewVersionEnabled());
}
}
}
return false;
},execute:function(_3b,opt){
if(concord.global.isIBMDocFile(_3b)||concord.global.isUploadNewVersionEnabled()){
var fid=_3b.getId();
window.open(concord.global.getDocEditURL(fid),concord.global.hashWinNameFromId(fid));
}else{
new concord.customEditAction(this.app,null,{hideCancel:false,editWithDocsDialogTitle:concord.global.nls.editWithDocsDialogTitle,OkTitle:concord.global.nls.editWithDocsDialogBtnOKTitle,OK:concord.global.nls.editWithDocsDialogBtnOKTitle,sentence1:concord.global.nls.editWithDocsDialogContent1,sentence2:concord.global.nls.editWithDocsDialogContent2}).execute(_3b);
}
}});
dojo.provide("com.ibm.concord.lcext.CCDViewDetail");
dojo.declare("com.ibm.concord.lcext.CCDViewDetail",[lconn.share.action.DeferredAction],{isPrimary:true,constructor:function(app,_3c){
this.inherited(arguments);
this.app=app;
this.name=concord.global.nls.VIEW_FILE_DETAILS_LINK;
this.tooltip=concord.global.nls.VIEW_FILE_DETAILS_LINK;
},isValid:function(_3d,opt){
if(lconn.core.config&&lconn.core.config.features&&lconn.core.config.features("fileviewer-detailspage")){
return false;
}
if(!concord.global.isIBMDocFile(_3d)){
return false;
}
var _3e=null;
this.app&&this.app.scene&&(_3e=this.app.scene.declaredClass);
if(_3e&&(_3e!="lconn.files.comm.scenes.owned.CommunityFileSummary")&&(_3e!="lconn.files.scenes.FileSummary")){
return true;
}
return false;
},execute:function(_3f,opt){
window.open(_3f.getUrlVia(),"_self");
}});
dojo.declare("com.ibm.concord.lcext.CCDPDFExport",[lconn.share.action.DeferredAction],{isPrimary:false,dialog:null,destroyDialog:function(){
if(this.dialog){
this.dialog.cancel();
this.dialog.destroyRecursive();
this.dialog=null;
}
},destroy:function(){
this.inherited(arguments);
this.destroyDialog();
},constructor:function(app,_40){
this.inherited(arguments);
this.app=app;
this.name=concord.global.nls.downloadAsPDF;
this.tooltip=concord.global.nls.downloadAsPDF;
},isValid:function(_41,opt){
var _42=concord.global.showConcordEntry()&&concord.global.isIBMDocFile(_41);
if(_42){
var _43=_41.getExtension();
var _44={"docx":1,"doc":1,"odt":1,"ods":1,"xls":1,"xlsx":1,"xlsm":1,"odp":1,"ppt":1,"pptx":1};
if((this.app&&this.app.authenticatedUser)||(opt.permissions&&opt.permissions.isAuthenticated())){
if(concord.global.isReader(_41)&&(!_41.isEncrypted())&&_43&&_44[_43.toLowerCase()]){
return true;
}
}
}
return false;
},execute:function(_45,opt){
var _46=this;
var _47=function(){
window.open(concord.global.getDocViewURL(_45.getId(),"pdf"),"_blank","");
};
var _48=new com.ibm.concord.lcext.NonSavedDraftValidator(_45,this.app,_47);
_48.execute();
}});
dojo.provide("com.ibm.concord.lcext.NonSavedDraftValidator");
dojo.declare("com.ibm.concord.lcext.NonSavedDraftValidator",null,{constructor:function(_49,app,_4a){
this.app=app;
this.file=_49;
this.windowOpenCommand=_4a;
this.execute=function(){
var _4b=concord.global.nls;
this.latestFileUpdate=null;
this.latestDraftUpdate=null;
this.isDirty=null;
this.isSameVersion=null;
if(this._isEmpty()){
if(concord.global.isEditor(_49)||concord.global.isOwner(_49,app)){
new concord.customDownloadAction(this.app,null,{hideCancel:true,DOWNLOAD_TITLE:_4b.DOWNLOAD_EMPTY_TITLE,OkTitle:_4b.DOWNLOAD_EMPTY_OK,OK:_4b.DOWNLOAD_EMPTY_OK,sentence1:_4b.DOWNLOAD_EMPTY_CONTENT1,sentence2:_4b.DOWNLOAD_EMPTY_CONTENT2}).execute(this.file);
}else{
if(concord.global.isReader(_49)){
new concord.customDownloadAction(this.app,null,{hideCancel:true,DOWNLOAD_TITLE:_4b.DOWNLOAD_EMPTYVIEW_TITLE,OkTitle:_4b.DOWNLOAD_EMPTYVIEW_OK,OK:_4b.DOWNLOAD_EMPTYVIEW_OK,sentence1:_4b.DOWNLOAD_EMPTYVIEW_CONTENT1,sentence2:_4b.DOWNLOAD_EMPTYVIEW_CONTENT2}).execute(this.file);
}else{
}
}
}else{
if(this._isPromptNewDraft()){
var _4c=_4b.DOWNLOAD_NEWDRAFT_CONTENT1;
var df1=new lconn.share.util.DateFormat(this.latestDraftUpdate);
var _4d=df1.formatByAge(_4c);
var _4e=_4b.DOWNLOAD_NEWDRAFT_CONTENT2;
var df2=new lconn.share.util.DateFormat(this.latestFileUpdate);
var _4f=df2.formatByAge(_4e);
new concord.customDownloadAction(this.app,null,{hideCancel:false,DOWNLOAD_TITLE:_4b.DOWNLOAD_NEWDRAFT_TITLE,OkTitle:_4b.DOWNLOAD_NEWDRAFT_OK,OK:_4b.DOWNLOAD_NEWDRAFT_OK,sentence1:_4d,sentence2:_4f}).execute(this.file,{windowOpenCommand:this.windowOpenCommand});
}else{
this.windowOpenCommand();
}
}
};
this._isEmpty=function(){
return 0==this.file.getSize();
};
this._isPromptNewDraft=function(){
this._getUpdateTime();
var _50=this.latestDraftUpdate&&this.latestFileUpdate&&this.isDirty&&this.isSameVersion;
return _50&&(concord.global.isEditor(this.file)||concord.global.isOwner(this.file,this.app));
};
this._getUpdateTime=function(){
this.latestFileUpdate=this.file.getUpdated();
var _51=this.app.getAuthenticatedUserId();
var _52=concord.global.getDocDraftURL(this.file);
var _53,_54;
concord.global.xhrGet({url:_52,filesUserId:_51,handleAs:"json",preventCache:true,handle:function(r,io){
_53=r;
_54=io;
},sync:true});
if(_53 instanceof Error){
return;
}
this.latestDraftUpdate=lconn.share.util.misc.date.convertAtomDate(_53.modified);
this.isDirty=_53.dirty;
this.isSameVersion=(_53.base_version==this.file.getVersionLabel());
if(this.isDirty&&(dojo.date.compare(this.latestDraftUpdate,this.latestFileUpdate)<0)){
this.latestDraftUpdate=this.latestFileUpdate;
}
};
}});
}


;if(!dojo._hasResource["concord.addEditsOnFiles"]){
dojo._hasResource["concord.addEditsOnFiles"]=true;
dojo.provide("concord.addEditsOnFiles");




(function(){
lconn.core.uiextensions.add("lconn/files/actions/file",function(_1,id,_2,_3,_4){
if(concord.global.showConcordEntry()){
_1.unshift(new com.ibm.concord.lcext.CCDEdit(_2,_3,_4));
_1.unshift(new com.ibm.concord.lcext.CCDNewFrom(_2,_3,_4));
_1.unshift(new com.ibm.concord.lcext.CCDViewDetail(_2,_3,_4));
_1.push(new com.ibm.concord.lcext.CCDPDFExport(_2,_3,_4));
}
});
})();
}


;if(!dojo._hasResource["concord.addEditsOnGridFiles"]){
dojo._hasResource["concord.addEditsOnGridFiles"]=true;
dojo.provide("concord.addEditsOnGridFiles");




(function(){
lconn.core.uiextensions.add("lconn/files/actions/grid",function(_1,id,_2,_3,_4){
if(concord.global.showConcordEntry()){
_1.push(new com.ibm.concord.lcext.CCDEdit(_2,_3,_4));
_1.push(new com.ibm.concord.lcext.CCDNewFrom(_2,_3,_4));
}
});
})();
}


;if(!dojo._hasResource["concord.actionNewDoc"]){
dojo._hasResource["concord.actionNewDoc"]=true;
dojo.provide("concord.actionNewDoc");








dojo.requireLocalization("lconn.files","action");
dojo.provide("com.ibm.concord.lcext.NewConcordBase");
dojo.declare("com.ibm.concord.lcext.NewConcordBase",com.ibm.social.layout.DeferredAction,{actionClass:"com.ibm.concord.lcext.NewConcordBase",defaultIsExternal:false,showShare:true,connectArray:[],constructor:function(_1,_2){
this.filesnls=dojo.i18n.getLocalization("lconn.files","action").UPLOAD_FILE;
this.setTypeString();
this.setNlsString();
this.app=_1;
this.name=this.nls_Name;
this._isExternalSupported=!!dojo.getObject("lconn.share.config.features.sharingIntent");
this.tooltip=this.nls_Tooltip;
this.dialog=null;
},setTypeString:function(){
this.typestr="";
this.typeurl="";
this.typeext="";
},getTypeExt:function(){
var _3=this._getTypeExt();
if(_3){
this.typeext=_3;
}
return this.typeext;
},setNlsString:function(){
this.nls_Name="";
this.nls_Tooltip="";
this.nls_DialogTitle="";
this.nls_DialogContent="";
this.nls_DialogBtnOK="";
this.nls_DialogBtnOKTitle="";
this.nls_DialogBtnCancel="";
this.nls_DialogIllegalErrMsg="";
this.nls_DialogNoNameErrMsg="";
this.nls_DialogDupErrMsg="";
this.nls_DialogInitialName="";
this.nls_DialogNoPermissionErrMsg="";
this.nls_DialogServerErrMsg="";
this.nls_DialogServerErrMsg2="";
this.nls_DialogNamepre="";
this.nls_DialogProblemidErrMsg="";
this.nls_DialogProblemidErrMsgShow="";
this.nls_DialogProblemidErrMsgHide="";
},createEmptyDoc:function(_4,_5,_6,_7){
return {};
},getDocContext:function(){
return this.app.getContext?this.app.getContext("file","create",true):null;
},isVisible:function(_8,_9){
if(this.app.declaredClass==="lconn.files.comm.ReferentialWidget"){
var _a=this.app.getAuthenticatedUser();
return _a&&_a.permissions&&this.app.getLibrary(true)&&_a.permissions.canUploadToCommunity();
}else{
return (this.app.authenticatedUser&&_8[0].id==this.app.authenticatedUser.id);
}
},destroyDialog:function(){
if(this.dialog){
this.dialog.cancel();
this.dialog.hide();
this.dialog.destroyRecursive();
this.dialog=null;
this.clearResources();
}
},clearResources:function(){
this.internalWarningMsg=null;
for(var i=0;i<this.connectArray.length;i++){
dojo.disconnect(this.connectArray[i]);
}
},destroy:function(){
this.inherited(arguments);
this.destroyDialog();
},isExternal:function(_b){
if(!this._isExternalSupported||!(this.app.declaredClass==="lconn.files.PersonalFiles")){
return false;
}
if(concord.global.shouldShowExternal(this.app)&&_b&&_b.extChkBox){
return _b.extChkBox.checked;
}else{
return this.defaultIsExternal;
}
},isPropagateEnabled:function(_c){
var _d=lconn.share.util.configUtil.getResharingDefault(this.app.authenticatedUser);
return (_c&&_c.shareFilePropagate)?_c.shareFilePropagate.checked:_d;
},updateInternalWarning:function(_e){
if(concord.global.shouldShowExternal(this.app)){
var _f=this.isExternal(_e);
if(!_f&&!this.internalWarningMsg){
var msg=this.internalWarningMsg={};
msg.warning=true;
msg.message=concord.global.nls.WARN_INTERNAL;
_e.msgContainer.add(msg);
}else{
if(this.internalWarningMsg){
_e.msgContainer.remove(this.internalWarningMsg);
this.internalWarningMsg=null;
}
}
}
},trimName:function(){
if(this.dialog&&this.dialog.nameNode){
var el=this.dialog.nameNode;
var _10=el.value;
_10=lconn.share.util.text.trim(_10);
var _11=lconn.share.util.text.lengthUtf8(this.typeext);
var _12=lconn.share.util.validation.FILENAME_LENGTH-_11;
var i=lconn.share.util.text.getCharIndexForUtf8Index(_10,_12);
if(i!=-1){
el.value=_10.substring(0,i);
}
var _13=dojo.byId("concordduplicate"+this.typestr);
_13.innerHTML="";
var _14=dojo.byId("concordduplicate"+this.typestr+"tr");
_14.style.display="none";
}
},showMsg:function(){
var _15=dojo.byId("problem_id");
var _16=dojo.style(_15,"display");
console.log(_16);
if(_16&&_16=="none"){
dojo.style(_15,"display","block");
dojo.byId("problem_toggle").innerHTML=this.nls_DialogProblemidErrMsgHide;
}else{
dojo.style(_15,"display","none");
dojo.byId("problem_toggle").innerHTML=this.nls_DialogProblemidErrMsgShow;
}
},showProblemID:function(_17,_18){
var doc=document;
var div=doc.createElement("div");
div.appendChild(doc.createTextNode(this.nls_DialogProblemidErrMsg));
var a=doc.createElement("a");
a.href="javascript:;";
a.id="problem_toggle";
dojo.style(a,"text-decoration","none");
dijit.setWaiRole(a,"button");
a.appendChild(doc.createTextNode(this.nls_DialogProblemidErrMsgShow));
dojo.connect(a,"onclick",this,"showMsg");
var _19=doc.createElement("span");
_19.id="problem_id";
dojo.style(_19,"word-break","break-all");
dojo.style(_19,"word-wrap","break-word");
dojo.style(_19,"color","#222222 !important");
dojo.style(_19,"font-weight","lighter");
dojo.style(_19,"display","none");
_19.appendChild(doc.createTextNode(_18));
div.appendChild(a);
div.appendChild(_19);
_17.appendChild(div);
},getFormatSetting:function(_1a){
var _1b=concord.global.getDocsPreferences(_1a,this.app.getAuthenticatedUserId());
if(_1b&&_1b["file_format"]){
return _1b["file_format"];
}
return null;
},execute:function(_1c,opt){
this.destroyDialog();
if(concord.global.isNeedDocsSAML()&&!concord.global.haveDocsLTPA()){
concord.global.doDocsSSO();
}
var _1d=this.dialog=new lconn.share.widget.LotusDialog({contextBase:this,title:this.nls_DialogTitle,contentClass:"lotusDialogContent",buttonOk:this.nls_DialogBtnOK,buttonOkTitle:this.nls_DialogBtnOKTitle,buttonCancel:this.nls_DialogBtnCancel,_size:function(){
},onExecute:function(){
var el=this.nameNode;
var _1e=el.value;
var _1f=dojo.byId("concordduplicate"+this.contextBase.typestr);
_1f.innerHTML="";
var _20=dojo.byId("concordduplicate"+this.contextBase.typestr+"tr");
_20.style.display="none";
if(dojo.trim(_1e)==""){
_1f.innerHTML=this.contextBase.nls_DialogNoNameErrMsg;
_20.style.display="";
_1d.keepOpen();
return;
}
if(!/^([^\\\/\:\*\?\"\<\>\|]+)$/.test(_1e)){
var msg=dojo.string.substitute(this.contextBase.nls_DialogIllegalErrMsg,[_1e]);
msg=msg.replace(/</g,"&lt; ").replace(/>/g,"&gt; ");
_1f.innerHTML=msg;
_20.style.display="";
_1d.keepOpen();
return;
}
var _21=this.contextBase.getTypeExt();
var _22=lconn.share.util.text.lengthUtf8(_21);
var _23=lconn.share.util.validation.FILENAME_LENGTH-_22;
if(!lconn.share.util.validation.validateTextLength(_1e,_23)){
var d=document;
_1f.appendChild(d.createTextNode(concord.global.nls.newDocumentDialog_WARN_LONG_DOCUMENTNAME));
_1f.appendChild(d.createTextNode(" "));
var a=d.createElement("a");
a.href="javascript:;";
dijit.setWaiRole(a,"button");
dojo.connect(a,"onclick",this.contextBase,"trimName");
a.appendChild(d.createTextNode(concord.global.nls.newDocumentDialog_TRIM_LONG_DOCUMENTNAME));
_1f.appendChild(a);
_20.style.display="";
_1d.keepOpen();
return;
}
var _24=dojo.byId("concordnewfile"+this.contextBase.typestr).value||this.contextBase.nls_DialogInitialName;
var _25=null;
if(this.contextBase.app.declaredClass==="lconn.files.PersonalFiles"){
_25=pe.baseUriPath+"form/api/userlibrary/"+pe.authenticatedUser.id+"/document/"+encodeURI(_24+_21)+"/entry?identifier=label";
}else{
var _26=window.commContextPath;
var _27=_26.lastIndexOf("communities");
_26=_26.substring(0,_27);
_25=_26+"files/form/api/communitylibrary/"+this.contextBase.app.communityId+"/document/"+encodeURI(_24+_21)+"/entry?identifier=label";
}
var _28=true;
var _29,_2a;
this.contextBase.app.net.headXml({url:_25,noStatus:true,auth:{},handle:function(r,io){
_29=r;
_2a=io;
var _2b;
try{
_2b=io.xhr.status;
}
catch(e){
}
return (_2b==200);
},sync:true});
if(_2a&&_2a.xhr.status==401){
}else{
if(_2a&&_2a.xhr.status==200){
_1f.innerHTML=this.contextBase.nls_DialogDupErrMsg;
_20.style.display="";
_1d.keepOpen();
}else{
if(_2a&&_2a.xhr.status==404){
var _2c=null;
if(this.contextBase.app.declaredClass==="lconn.files.PersonalFiles"){
_2c=glb_concord_url+"/api/docsvr/"+this.contextBase.typeurl;
}else{
this.contextBase.app.getLibrary(true);
_2c=glb_concord_url+"/api/docsvr/"+this.contextBase.typeurl+"?community="+this.contextBase.app.library.getId();
}
var _2d=this.contextBase.isExternal(_1d);
var _2e=this.contextBase.isPropagateEnabled(_1d);
var _2f=this.contextBase.getDocContext();
var _30=dojo.toJson(this.contextBase.createEmptyDoc(_24,_2d,_2e,_2f));
concord.global.xhrPost({url:_2c,filesUserId:this.contextBase.app.getAuthenticatedUserId(),handleAs:"json",handle:function(r,io){
_29=r;
_2a=io;
if(_29 instanceof Error){
return;
}
if(_2f&&_2f.type=="pinnedfiles"){
dojo.publish("lconn/files/files/myfavorites/add",_29.doc_uri);
}
if(concord.global.getFilesVersion()>4){
dojo.publish("lconn/share/action/completed",[{fileChange:true},null]);
}else{
dojo.publish("lconn/share/action/completed",[{},null]);
}
window.open(concord.global.getDocEditURL(_29.doc_uri,_29.repo_id),concord.global.hashWinNameFromId(_29.doc_uri));
},sync:true,contentType:"text/plain",postData:_30});
var _31=null;
try{
_31=_29.data.problem_id;
}
catch(ex){
console.log("Error happens while get problem id from response.data .",ex);
}
if(_31==null||_31==""){
_31=_2a.xhr.getResponseHeader("problem_id");
}
var _32;
if(_2a&&_2a.xhr.status==403){
_32=this.contextBase.nls_DialogNoPermissionErrMsg;
_1f.innerHTML=_32;
_20.style.display="";
if(_31&&_31!=""){
this.contextBase.showProblemID(_1f,_31);
}
_1d.keepOpen();
}else{
if(_2a&&_2a.xhr.status>403){
_32=dojo.string.substitute(this.contextBase.nls_DialogServerErrMsg,[_24]);
_1f.innerHTML=_32;
_20.style.display="";
if(_31&&_31!=""){
this.contextBase.showProblemID(_1f,_31);
}
_1d.keepOpen();
}else{
if(_29 instanceof Error){
_32=dojo.string.substitute(this.contextBase.nls_DialogServerErrMsg,[_24]);
_1f.innerHTML=_32;
_20.style.display="";
if(_31&&_31!=""){
this.contextBase.showProblemID(_1f,_31);
}
_1d.keepOpen();
}else{
_1d.hide();
_1d.destroy();
}
}
}
}else{
_1f.innerHTML=dojo.string.substitute(this.contextBase.nls_DialogServerErrMsg2,[_24]);
_20.style.display="";
_1d.keepOpen();
return;
}
}
}
}});
_1d.attr("style","width: 510px;");
dijit.setWaiState(_1d.domNode,"describedby","create_"+this.typestr+"_in_ibm_docs_dec_div");
_1d.show();
var d=document;
var _33=d.createElement("table");
_33.className="lotusFormTable";
_33.cellPadding=0;
dijit.setWaiRole(_33,"presentation");
var _34=d.createElement("colgroup");
_34.appendChild(d.createElement("col"));
var col=d.createElement("col");
col.width="100%";
_34.appendChild(col);
_33.appendChild(_34);
var _35=d.createElement("tbody");
var _36=d.createElement("tr");
var _37=_36.appendChild(d.createElement("td"));
_37.colSpan=2;
var _38=d.createElement("div");
_38.id="create_"+this.typestr+"_in_ibm_docs_dec_div";
_38.style.fontWeight="bold";
_38.innerHTML=this.nls_DialogContent;
_37.appendChild(_38);
_35.appendChild(_36);
var _39=d.createElement("tr");
var _3a=_39.appendChild(d.createElement("td"));
_3a.colSpan=2;
var _3b=d.createElement("div");
dijit.setWaiRole(_3b,"alert");
_3a.appendChild(_3b);
this.dialog.msgContainer=new lconn.share.widget.MessageContainer({nls:this.app.nls},_3b);
_35.appendChild(_39);
var tr=d.createElement("tr");
tr.className="lotusFormFieldRow";
var td=d.createElement("td");
td.className="lotusFormLabel lotusNowrap";
var _3c=d.createElement("label");
var _3d=this.nls_DialogNamepre;
_3c.appendChild(d.createTextNode(_3d));
td.appendChild(_3c);
tr.appendChild(td);
var td=d.createElement("td");
var _3e=_1d.nameNode=d.createElement("input");
_3e.id="concordnewfile"+this.typestr;
_3e.type="text";
_3e.value=this.nls_DialogInitialName;
_3e.className="lotusText";
_3e.name="_tags"+this.typestr;
dijit.setWaiState(_3e,"required","true");
td.appendChild(_3e);
dojo.attr(_3c,"for",_3e.id);
tr.appendChild(td);
_35.appendChild(tr);
var _3f=d.createElement("tr");
_3f.id="concordduplicate"+this.typestr+"tr";
_3f.style.display="none";
var _40=d.createElement("td");
_3f.appendChild(_40);
var _41=d.createElement("td");
var _42=d.createElement("div");
_42.id="concordduplicate"+this.typestr;
_42.style.color="red";
_42.style.fontWeight="bold";
dijit.setWaiRole(_42,"alert");
_41.appendChild(_42);
_3f.appendChild(_41);
_35.appendChild(_3f);
var tr2=d.createElement("tr");
tr2.className="lotusFormFieldRow";
var td1=tr2.appendChild(d.createElement("td"));
td1.className="lotusFormLabel";
var td2=tr2.appendChild(d.createElement("td"));
if(this.app.declaredClass==="lconn.files.PersonalFiles"){
var _43=d.createElement("div");
var _44=_1d.shareFilePropagate=d.createElement("input");
_44.type="checkbox";
_44.id=_1d.id+"_shareFilePropagate";
_44.className="lotusCheckbox";
_44.name="_shareFilePropagate";
_44.value="true";
_44.checked=_44.defaultChecked=lconn.share.util.configUtil.getResharingDefault(this.app.authenticatedUser);
_43.appendChild(_44);
var _45=d.createElement("label");
_45.className="lotusCheckbox";
_45.appendChild(d.createTextNode(this.filesnls.PROPAGATE_LABEL));
dojo.attr(_45,"for",_44.id);
_43.appendChild(_45);
_43.appendChild(d.createTextNode("\xa0"));
concord.global.createHelpLink(this.app,_43,"upload.propagate",{inline:true});
td2.appendChild(_43);
}
if(concord.global.shouldShowExternal(this.app)){
var _46=concord.global.getExternalWidget(_1d,this.app,this.filesnls.SHARING_INTENT,td2,false);
if(_46){
this.connectArray.push(dojo.connect(_46,"onclick",dojo.hitch(this,function(evt){
this.updateInternalWarning(_1d);
})));
}
}
_35.appendChild(tr2);
_33.appendChild(_35);
_1d.containerNode.appendChild(_33);
_3e.select();
}});
dojo.provide("com.ibm.concord.lcext.NewConcordDoc");
dojo.declare("com.ibm.concord.lcext.NewConcordDoc",com.ibm.concord.lcext.NewConcordBase,{actionClass:"com.ibm.concord.lcext.NewConcordDoc",formatMap:{"ms":".docx","odf":".odt"},setTypeString:function(){
this.typestr="doc";
this.typeurl="text";
this.typeext=".docx";
},_getTypeExt:function(){
return this.formatMap[this.getFormatSetting("text")];
},setNlsString:function(){
this.nls_Name=concord.global.nls.newDocumentName;
this.nls_Tooltip=concord.global.nls.newDocumentTooltip;
this.nls_DialogTitle=concord.global.nls.newDocumentDialogTitle;
this.nls_DialogContent=concord.global.nls.newDocumentDialogContent;
this.nls_DialogBtnOK=concord.global.nls.newDocumentDialogBtnOK;
this.nls_DialogBtnOKTitle=concord.global.nls.newDocumentDialogBtnOKTitle;
this.nls_DialogBtnCancel=concord.global.nls.newDocumentDialogBtnCancel;
this.nls_DialogIllegalErrMsg=concord.global.nls.newDocumentDialogIllegalErrMsg;
this.nls_DialogNoNameErrMsg=concord.global.nls.newDocumentDialogNoNameErrMsg;
this.nls_DialogDupErrMsg=concord.global.nls.newDocumentDialogDupErrMsg;
this.nls_DialogInitialName=concord.global.nls.newDocumentDialogInitialName;
this.nls_DialogNoPermissionErrMsg=concord.global.nls.newDocumentDialogNoPermissionErrMsg;
this.nls_DialogServerErrMsg=concord.global.nls.newDocumentDialogServerErrMsg;
this.nls_DialogServerErrMsg2=concord.global.nls.newDocumentDialogServerErrMsg2;
this.nls_DialogNamepre=concord.global.nls.newDocumentDialogNamepre;
this.nls_DialogProblemidErrMsg=concord.global.nls.newDialogProblemidErrMsg;
this.nls_DialogProblemidErrMsgShow=concord.global.nls.newDialogProblemidErrMsgShow;
this.nls_DialogProblemidErrMsgHide=concord.global.nls.newDialogProblemidErrMsgHide;
},createEmptyDoc:function(_47,_48,_49,_4a){
var _4b={};
_4b.title=_47;
_4b.newTitle=_47;
_4b.isExternal=_48;
_4b.propagate=_49;
if(_4a){
_4b.context=_4a;
}
return _4b;
}});
dojo.provide("com.ibm.concord.lcext.NewConcordSheet");
dojo.declare("com.ibm.concord.lcext.NewConcordSheet",com.ibm.concord.lcext.NewConcordBase,{actionClass:"com.ibm.concord.lcext.NewConcordSheet",formatMap:{"ms":".xlsx","odf":".ods"},setTypeString:function(){
this.typestr="sheet";
this.typeurl="sheet";
this.typeext=".xlsx";
},_getTypeExt:function(){
return this.formatMap[this.getFormatSetting("sheet")];
},setNlsString:function(){
this.nls_Name=concord.global.nls.newSheetName;
this.nls_Tooltip=concord.global.nls.newSheetTooltip;
this.nls_DialogTitle=concord.global.nls.newSheetDialogTitle;
this.nls_DialogContent=concord.global.nls.newDocumentDialogContent;
this.nls_DialogBtnOK=concord.global.nls.newDocumentDialogBtnOK;
this.nls_DialogBtnOKTitle=concord.global.nls.newSheetDialogBtnOKTitle;
this.nls_DialogBtnCancel=concord.global.nls.newDocumentDialogBtnCancel;
this.nls_DialogIllegalErrMsg=concord.global.nls.newDocumentDialogIllegalErrMsg;
this.nls_DialogNoNameErrMsg=concord.global.nls.newDocumentDialogNoNameErrMsg;
this.nls_DialogDupErrMsg=concord.global.nls.newDocumentDialogDupErrMsg;
this.nls_DialogInitialName=concord.global.nls.newSheetDialogInitialName;
this.nls_DialogNoPermissionErrMsg=concord.global.nls.newDocumentDialogNoPermissionErrMsg;
this.nls_DialogServerErrMsg=concord.global.nls.newDocumentDialogServerErrMsg;
this.nls_DialogServerErrMsg2=concord.global.nls.newDocumentDialogServerErrMsg2;
this.nls_DialogNamepre=concord.global.nls.newDocumentDialogNamepre;
this.nls_DialogProblemidErrMsg=concord.global.nls.newDialogProblemidErrMsg;
this.nls_DialogProblemidErrMsgShow=concord.global.nls.newDialogProblemidErrMsgShow;
this.nls_DialogProblemidErrMsgHide=concord.global.nls.newDialogProblemidErrMsgHide;
},createEmptyDoc:function(_4c,_4d,_4e,_4f){
var _50={};
var _51={"ja":"MS PMinchao","ko":"Gulim","zh-cn":"\u5b8b\u4f53"};
_50.newTitle=_4c;
_50.isExternal=_4d;
_50.propagate=_4e;
if(_4f){
_50.context=_4f;
}
_50["st0"]=concord.global.nls.sheetTitle0;
_50["st1"]=concord.global.nls.sheetTitle1;
_50["st2"]=concord.global.nls.sheetTitle2;
var _52=this.app.language;
_50["locale"]=_52;
var _53=null;
var _54=_52.substr(0,2).toLowerCase();
var _55=_52.substr(3,2).toLowerCase();
var _56=null;
if(_55){
_56=_54+"-"+_55;
}
for(var id in _51){
if(_54==id||(_56&&_56==id)){
_53=_51[id];
break;
}
}
if(_53){
_50["font"]=_53;
}
return _50;
}});
dojo.provide("com.ibm.concord.lcext.NewConcordPres");
dojo.declare("com.ibm.concord.lcext.NewConcordPres",com.ibm.concord.lcext.NewConcordBase,{actionClass:"com.ibm.concord.lcext.NewConcordPres",formatMap:{"ms":".pptx","odf":".odp"},setTypeString:function(){
this.typestr="pres";
this.typeurl="pres";
this.typeext=".pptx";
},_getTypeExt:function(){
return this.formatMap[this.getFormatSetting("pres")];
},setNlsString:function(){
this.nls_Name=concord.global.nls.newPresName;
this.nls_Tooltip=concord.global.nls.newPresTooltip;
this.nls_DialogTitle=concord.global.nls.newPresDialogTitle;
this.nls_DialogContent=concord.global.nls.newDocumentDialogContent;
this.nls_DialogBtnOK=concord.global.nls.newDocumentDialogBtnOK;
this.nls_DialogBtnOKTitle=concord.global.nls.newPresDialogBtnOKTitle;
this.nls_DialogBtnCancel=concord.global.nls.newDocumentDialogBtnCancel;
this.nls_DialogIllegalErrMsg=concord.global.nls.newDocumentDialogIllegalErrMsg;
this.nls_DialogNoNameErrMsg=concord.global.nls.newDocumentDialogNoNameErrMsg;
this.nls_DialogDupErrMsg=concord.global.nls.newDocumentDialogDupErrMsg;
this.nls_DialogInitialName=concord.global.nls.newPresDialogInitialName;
this.nls_DialogNoPermissionErrMsg=concord.global.nls.newDocumentDialogNoPermissionErrMsg;
this.nls_DialogServerErrMsg=concord.global.nls.newDocumentDialogServerErrMsg;
this.nls_DialogServerErrMsg2=concord.global.nls.newDocumentDialogServerErrMsg2;
this.nls_DialogNamepre=concord.global.nls.newDocumentDialogNamepre;
this.nls_DialogProblemidErrMsg=concord.global.nls.newDialogProblemidErrMsg;
this.nls_DialogProblemidErrMsgShow=concord.global.nls.newDialogProblemidErrMsgShow;
this.nls_DialogProblemidErrMsgHide=concord.global.nls.newDialogProblemidErrMsgHide;
},createEmptyDoc:function(_57,_58,_59,_5a){
var _5b={};
_5b.title=_57;
_5b.newTitle=_57;
_5b.isExternal=_58;
_5b.propagate=_59;
if(_5a){
_5b.context=_5a;
}
_5b.template="default";
_5b.content="<html><head></head><body><p>&nbsp;</p></body></html>";
return _5b;
}});
}


;if(!dojo._hasResource["concord.addFilesNewMenu"]){
dojo._hasResource["concord.addFilesNewMenu"]=true;
dojo.provide("concord.addFilesNewMenu");




(function(){
lconn.core.uiextensions.add("lconn/files/actions/create/new",function(_1,s,_2,_3){
if(concord.global.showConcordEntry()){
_1.unshift(new com.ibm.concord.lcext.NewConcordPres(_2,_3));
_1.unshift(new com.ibm.concord.lcext.NewConcordSheet(_2,_3));
_1.unshift(new com.ibm.concord.lcext.NewConcordDoc(_2,_3));
}
});
})();
}


;if(!dojo._hasResource["lconn.files.scenes.AbstractSection"]){
dojo._hasResource["lconn.files.scenes.AbstractSection"]=true;
dojo.provide("lconn.files.scenes.AbstractSection");
dojo.declare("lconn.files.scenes.AbstractSection",null,{id:null,hidden:false,getName:function(_1,_2){
},render:function(){
}});
}


;if(!dojo._hasResource["concord.draftTab"]){
dojo._hasResource["concord.draftTab"]=true;
dojo.provide("concord.draftTab");






(function(){
dojo.provide("com.ibm.concord.lcext.DraftSection");
dojo.declare("com.ibm.concord.lcext.DraftSection",lconn.files.scenes.AbstractSection,{constructor:function(_1,_2){
this.id="draft";
this.htmlId="concord_draft";
this.app=_1;
this.scene=_2;
this.hidden=false;
},getName:function(_3,_4){
return concord.global.nls.draft_tab_title;
},isValid:function(_5,_6){
var _7=_5.getExtension();
var _8={"ppt":1,"otp":1,"odp":1,"ods":1,"ots":1,"xls":1,"txt":1,"csv":1,"docx":1,"doc":1,"odt":1,"ott":1,"pptx":1,"xlsx":1,"xlsm":1};
if(concord.global.isEditor(_5)&&(!_5.isEncrypted())&&_7&&_8[_7.toLowerCase()]){
if(concord.global.isIBMDocFile(_5)){
return true;
}
}
return false;
},render:function(d,_9,_a,_b,_c){
var _d=_c.app;
var _e=_d.routes;
var _f=_c.scene;
var _10=_f.user;
var nls=_d.nls.ABOUT_FILE;
var _11=_f.isExpanded(_b.id);
var _12=_a.getExtension();
var _13={"ppt":1,"odp":1,"ods":1,"xls":1,"txt":1,"csv":1,"docx":1,"doc":1,"odt":1,"pptx":1,"xlsx":1,"xlsm":1};
if(concord.global.isEditor(_a)&&_12&&(!_a.isEncrypted())&&_13[_12.toLowerCase()]){
if(!concord.global.isIBMDocFile(_a)){
return false;
}
}else{
return false;
}
var _14=concord.global.getDocDraftURL(_a);
var _15=_d.getAuthenticatedUserId();
var _16,_17;
concord.global.xhrGet({url:_14,filesUserId:_15,handleAs:"json",preventCache:true,handle:function(r,io){
_16=r;
_17=io;
},sync:true});
if(_16 instanceof Error){
var _18=d.createElement("div");
_18.innerHTML=concord.global.nls.draft_not_found;
_9.appendChild(_18);
return;
}
var _19=_16.dirty;
var _1a=_16.base_version;
var _1b=_16.created;
var _1c=_16.modified;
var _1d=_16.editors;
var _1e=_16.lasteditor;
if(!_19&&_1d.length<=0){
var _1f=d.createElement("div");
_1f.innerHTML=concord.global.nls.draft_published;
_9.appendChild(_1f);
}
var _18=d.createElement("div");
_18.className="lotusChunk qkrVersions";
var _20=d.createElement("div");
_18.appendChild(_20);
var _21=d.createElement("table");
_21.cellSpacing=_21.cellPadding=0;
_21.className="lotusTable";
dijit.setWaiRole(_21,"presentation");
var _22=d.createElement("tbody");
var tr=d.createElement("tr");
tr.className="lotusFirst";
var _23=dojo.create("td",{},tr);
_23.className="lotusNowrap";
var _24=d.createElement("img");
var _25=concord.global.getIconBaseURL()+"ibmdocs_product_16.png";
_24.className=lconn.core.utilities.getFileIconClassName(".odt",16);
dojo.style(_24,"backgroundImage","url("+dijit._Widget.prototype._blankGif+")");
_24.src=_25;
_23.appendChild(_24);
var _26=dojo.create("td",{},tr);
_26.className="lotusNowrap";
var _27=lconn.share.util.misc.date.convertAtomDate(_1c);
df=new lconn.share.util.DateFormat(_27);
formated_date_text=df.formatByAge(concord.global.nls.LABEL_DRAFT_TAB_EDIT);
_26.appendChild(d.createTextNode(formated_date_text));
if(""!=_1e.id){
var _28=dojo.create("td",{},tr);
_28.className="lotusNowrap";
var _29=d.createElement("a");
_29.appendChild(d.createTextNode(_1e.displayName));
_1e.name=_1e.displayName;
lconn.files.scenehelper.generateUserLink(_d,_e,_1e,_29);
_28.appendChild(_29);
}
var _2a=dojo.create("td",{style:{width:"100%"}},tr);
var _2b=concord.global.getDocEditURL(_a.getId());
dojo.create("a",{href:_2b,target:"_blank",title:concord.global.nls.draft_edit_link,innerHTML:concord.global.nls.draft_edit_link},_2a);
_22.appendChild(tr);
_21.appendChild(_22);
_20.appendChild(_21);
_9.appendChild(_18);
}});
lconn.core.uiextensions.add("lconn/files/tabs/file",function(s,_2c,app,_2d){
if(concord.global.showConcordEntry()){
try{
var _2e=false;
var len=(typeof _2c!="undefined")?_2c.length:0;
for(var _2f=len-1;_2f>=0;_2f--){
var _30=_2c[_2f].declaredClass;
if("com.ibm.concord.lcext.DraftSection"==_30){
_2e=true;
break;
}
}
if(!_2e){
_2c.push(new com.ibm.concord.lcext.DraftSection(app,_2d));
}
}
catch(e){
console.log("Error happens when adding tab to files UI: ",e);
}
}
});
})();
}


;if(!dojo._hasResource["concord.FileInlineRenderer"]){
dojo._hasResource["concord.FileInlineRenderer"]=true;
dojo.provide("concord.FileInlineRenderer");








(function(){
lconn.core.uiextensions.add("lconn/files/renderers/file/inline",function(s,d,_1,_2,_3,_4){
var _5=_3.routes;
var _6=_4.user;
var _7=_2.getExtension();
var _8=concord.global.nls;
var _9={"ppt":1,"odp":1,"ods":1,"xls":1,"txt":1,"csv":1,"docx":1,"doc":1,"odt":1,"pptx":1,"xlsx":1,"xlsm":1};
if((!_2.isEncrypted())&&_7&&_9[_7.toLowerCase()]){
if(!concord.global.isIBMDocFile(_2)){
return false;
}
}else{
return false;
}
if(concord.global.showConcordEntry()){
var _a=concord.global.getDocDraftURL(_2);
var _b=function(r,io){
var _c=_1.lastChild;
var _d=_c.firstChild;
_d.style.tableLayout="fixed";
_d.style.width="100%";
var _e=_d.firstChild;
var tr=_e.firstChild;
var _f=tr.lastChild;
var _10=_f.firstChild;
var _11=d.createElement("div");
dojo.attr(_11,"class","lotusChunk lotusMeta");
_f.insertBefore(_11,_10);
var _12=d.createElement("ul");
dojo.attr(_12,"class","lotusInlinelist");
_11.appendChild(_12);
var _13=d.createElement("li");
var _14=_3.getUserPermissions();
var _15=(_2.getUpdated().getTime()!=_2.getPublished().getTime());
var _16=_15?_2.getModifier():_2.getAuthor();
var _17=_14.isAuthenticated()?_14.isAuthenticated(_16.id):false;
var _18=_15?(_17?_8.LABEL_PUBLISHED:_8.LABEL_PUBLISHED_OTHER):(_17?_8.LABEL_CREATED:_8.LABEL_CREATED_OTHER);
var df=new lconn.share.util.DateFormat(_2.getUpdated());
var _19=df.formatByAge(_18);
lconn.share.util.html.substitute(d,_13,_19,{user:function(){
var a=d.createElement("a");
a.className="lotusPerson";
a.appendChild(d.createTextNode(_16.name));
lconn.files.scenehelper.generateUserLink(_3,_3.routes,_16,a);
return a;
}},null,this);
_13.title=df.format(_18.FULL);
if(!concord.global.isEditor(_2)){
dojo.attr(_13,"class","lotusFirst");
_12.appendChild(_13);
return true;
}else{
if(!concord.global.isUploadNewVersionEnabled()){
var _1a=d.createElement("div");
dojo.attr(_1a,"class","lotusChunk lotusMeta");
_1a.innerHTML=_8.docs_indicator_text;
_f.insertBefore(_1a,_11);
}
if(r instanceof Error){
dojo.attr(_13,"class","lotusFirst");
_12.appendChild(_13);
return false;
}
_12.appendChild(_13);
var _1b=d.createElement("li");
var _1c=r.created;
var _1d=lconn.share.util.misc.date.convertAtomDate(_1c);
var _1e=r.modified;
var _1f=lconn.share.util.misc.date.convertAtomDate(_1e);
_15=(_1f.getTime()!=_1d.getTime());
_18=_15?_8.LABEL_DRAFT_MODIFIED:_8.LABEL_DRAFT_CREATED;
df=new lconn.share.util.DateFormat(_1f);
_19=df.formatByAge(_18);
_1b.appendChild(d.createTextNode(_19));
_1b.title=df.format(_18.FULL);
dojo.attr(_1b,"class","lotusFirst");
_12.insertBefore(_1b,_13);
var _20=r.editors;
var _21=r.dirty;
if(!_21&&_20.length<=0){
return false;
}
var _22=dojo.place(d.createElement("div"),_3.scene.headerNode,"after");
dojo.attr(_22,"role","alert");
var _23=new lconn.share.widget.MessageContainer({nls:_3.nls},_22);
if(_20.length<=0){
var _24=new lconn.files.util.HtmlMessage(_8.draft_unpublished_tip,_3,{warning:true,canClose:true,publish_action:function(){
var aWn=d.createElement("a");
aWn.href="javascript:";
aWn.appendChild(d.createTextNode(_8.draft_save_action_label));
var _25=function(msg){
var _26=new lconn.files.util.HtmlMessage(msg,_3,{error:true,canClose:true});
_23.add(_26);
};
var _27=function(){
_23.remove(_24);
var _28=function(_29,_2a){
var _2b=function(_2c,_2d){
var _2e=null;
try{
_2e=_2c.data.problem_id;
}
catch(ex){
console.log("Error happens while get problem id from response.data .",ex);
}
if(_2e==null||_2e==""){
_2e=_2d.xhr.getResponseHeader("problem_id");
}
if(_2c&&_2c.dojoType=="timeout"){
}else{
if(_2d.xhr.status==200){
if(_2c.status=="complete"){
dojo.publish("lconn/share/action/completed",[{fileChange:true},null]);
return;
}else{
if(_2c.status=="error"){
var msg;
if(_2c.error_code==1200){
msg=_8.publishErrMsg;
}else{
msg=concord.global.getErrorMessage(_2c.error_code);
}
_25(msg);
if(_2e&&_2e!=""){
_2f(_2e);
}
return;
}
}
}else{
if(_2d.xhr.status==410){
_25(_8.publishErrMsg_NoFile);
return;
}else{
if(_2d.xhr.status==403){
try{
var _30=dojo.fromJson(_2c.responseText);
var _31=_30!=null?_30.error_code:-1;
var msg=concord.global.getErrorMessage(_31);
_25(msg);
if(_2e&&_2e!=""){
_2f(_2e);
}
return;
}
catch(e){
}
}
}
}
}
_25(_8.publishErrMsg);
};
var _32=function(_33){
var _34=function(_35,_36,_37){
if(_36 instanceof Error){
if(_36.dojoType=="timeout"){
_2b(_36,_37);
return;
}else{
setTimeout(dojo.hitch(this,_32,_35),1000);
return;
}
}
var ret=false;
if(_36.status=="complete"){
ret=true;
}else{
if(_36.status=="broken"){
ret=true;
}else{
if(_36.status=="error"){
ret=true;
}else{
if(_36.status=="pending"){
setTimeout(dojo.hitch(this,_32,_35),1000);
return;
}else{
console.info("unknown publish job status: "+_36.status);
setTimeout(dojo.hitch(this,_32,_35),1000);
}
}
}
}
if(ret==true){
_2b(_36,_37);
}
};
var _38=concord.global.getPublishJobQueryURL(_2,_33);
dojo.xhrGet({url:_38,handleAs:"json",handle:dojo.hitch(this,_34,_33),sync:false,preventCache:true,timeout:30000});
};
var _2f=function(_39){
var _3a=new lconn.files.util.HtmlMessage(_8.newDialogProblemidErrMsg_tip,_3,{warning:true,canClose:true,shown_action:function(){
var _3b=d.createElement("span");
var _3c=d.createElement("a");
_3c.href="javascript:";
_3c.id="problem_toggle";
dojo.style(_3c,"text-decoration","none");
_3c.appendChild(d.createTextNode(_8.newDialogProblemidErrMsgShow));
var _3d=d.createElement("span");
_3d.id="problem_id";
dojo.style(_3d,"word-break","break-all");
dojo.style(_3d,"word-wrap","break-word");
dojo.style(_3d,"color","#222222 !important");
dojo.style(_3d,"font-weight","lighter");
dojo.style(_3d,"display","none");
_3d.appendChild(d.createTextNode(_39));
var _3e=function(){
var _3f=dojo.byId("problem_id");
var _40=dojo.style(_3f,"display");
console.log(_40);
if(_40&&_40=="none"){
dojo.style(_3f,"display","block");
dojo.byId("problem_toggle").innerHTML=_8.newDialogProblemidErrMsgHide;
}else{
dojo.style(_3f,"display","none");
dojo.byId("problem_toggle").innerHTML=_8.newDialogProblemidErrMsgShow;
}
};
dojo.connect(_3c,"onclick",_3e);
_3b.appendChild(_3c);
_3b.appendChild(_3d);
return _3b;
}});
_23.add(_3a);
};
if(_29 instanceof Error){
_2b(_29,_2a);
return;
}
if(_29.status=="pending"){
_32(_29.id);
}else{
_2b(_29,_2a);
}
};
var _41=concord.global.getDocDraftURL(_2,true);
concord.global.xhrPost({url:_41,filesUserId:_3.getAuthenticatedUserId(),handleAs:"json",postData:dojo.toJson({}),sync:false,timeout:30000,headers:{"Content-Type":"application/json"},handle:_28});
};
dojo.connect(aWn,"onclick",_27);
return aWn;
}});
_23.add(_24);
}else{
var _42=new lconn.files.util.HtmlMessage(_8.draft_beiing_edited,_3,{warning:true,canClose:true,user:function(){
var _43=d.createElement("span");
_43.style.display="inline";
_43.style.marginLeft="2px";
_43.style.marginRight="0";
for(var i=0,len=_20.length;i<len;i++){
var _44=d.createElement("a");
_44.appendChild(d.createTextNode(_20[i].displayName));
_20[i].name=_20[i].displayName;
lconn.files.scenehelper.generateUserLink(_3,_5,_20[i],_44);
_43.appendChild(_44);
if(len!=1&&i!=len-1){
_43.appendChild(d.createTextNode(",\xa0\xa0"));
}
}
return _43;
}});
_23.add(_42);
}
}
};
var _45=0;
var _46=function(r,io){
_45++;
if(r&&r.status=="471"&&_45<4){
concord.global.xhrGet({url:_a,filesUserId:_3.getAuthenticatedUserId(),handle:_46,sync:false,handleAs:"json",preventCache:true});
}else{
_b(r,io);
}
};
concord.global.xhrGet({url:_a,filesUserId:_3.getAuthenticatedUserId(),handle:_46,sync:false,handleAs:"json",preventCache:true});
}else{
setTimeout(function(){
var div=_1.lastChild;
var _47=div.firstChild;
_47.style.tableLayout="fixed";
_47.style.width="100%";
var _48=_47.firstChild;
var tr=_48.firstChild;
var _49=tr.lastChild;
var _4a=_49.firstChild;
var _4b=d.createElement("div");
dojo.attr(_4b,"class","lotusChunk lotusMeta");
_4b.innerHTML=_8.nonentitlement_docs_indicator_text;
_49.insertBefore(_4b,_4a);
},0);
}
});
})();
}


;if(!dojo._hasResource["concord.customDownload"]){
dojo._hasResource["concord.customDownload"]=true;
dojo.provide("concord.customDownload");






dojo.require["lconn.core.config.features"];
(function(){
lconn.share.config.downloadFile={_isEmpty:function(){
return 0==this.file.getSize();
},_isPromptNewDraft:function(){
this._getUpdateTime();
var _1=this.latestDraftUpdate&&this.latestFileUpdate&&this.isDirty&&this.isSameVersion;
return _1&&(concord.global.isEditor(this.file)||concord.global.isOwner(this.file,this.app));
},_getUpdateTime:function(){
this.latestFileUpdate=this.file.getUpdated();
var _2=this.app.getAuthenticatedUserId();
var _3=concord.global.getDocDraftURL(this.file);
var _4,_5;
concord.global.xhrGet({url:_3,filesUserId:_2,handleAs:"json",preventCache:true,handle:function(r,io){
_4=r;
_5=io;
},sync:true});
if(_4 instanceof Error){
return;
}
this.latestDraftUpdate=lconn.share.util.misc.date.convertAtomDate(_4.modified);
this.isDirty=_4.dirty;
this.isSameVersion=(_4.base_version==this.file.getVersionLabel());
if(this.isDirty&&(dojo.date.compare(this.latestDraftUpdate,this.latestFileUpdate)<0)){
this.latestDraftUpdate=this.latestFileUpdate;
}
},doDownload:function(){
window.open(this.file.getUrlDownload(),"_self");
},isValid:function(_6,_7){
if(lconn.core.config&&lconn.core.config.features&&lconn.core.config.features("fileviewer-detailspage")){
return false;
}
var _8=concord.global.isIBMDocFile(_6);
if(_8&&0==_6.getSize()){
_8=false;
}
if(_8&&concord.global.showConcordEntry()&&_7&&_7.isIcon&&_7.a){
_7.a.title=concord.global.nls.OPEN_THIS_FILE_TIP;
var _9=_7.a.firstChild;
if(_9){
_9.title=concord.global.nls.OPEN_THIS_FILE_TIP;
_9.alt=concord.global.nls.OPEN_THIS_FILE_TIP;
}
}
return _8;
},execute:function(_a,_b){
if(!_a){
console.log("The file object to download is null");
return false;
}
var _c=lconn.share.config.downloadFile;
_c.app=this.app=_b.app||this.app;
_c.file=this.file=_a;
if(concord.global.showConcordEntry()&&_b.isIcon&&_a.declaredClass=="lconn.share.bean.File"){
var _d=_a.getId();
var _e=concord.global.hashWinNameFromId(_d);
window.open(glb_concord_url_wnd_open+"/app/doc/lcfiles/"+_d+"/editorview/content",_e);
}else{
_c.latestFileUpdate=null;
_c.latestDraftUpdate=null;
_c.isDirty=null;
_c.isSameVersion=null;
if(_c._isEmpty()){
if(concord.global.isEditor(this.file)||concord.global.isOwner(this.file,this.app)){
new concord.customDownloadAction(_b.app,null,{hideCancel:true,DOWNLOAD_TITLE:concord.global.nls.DOWNLOAD_EMPTY_TITLE,OkTitle:concord.global.nls.DOWNLOAD_EMPTY_OK,OK:concord.global.nls.DOWNLOAD_EMPTY_OK,sentence1:concord.global.nls.DOWNLOAD_EMPTY_CONTENT1,sentence2:concord.global.nls.DOWNLOAD_EMPTY_CONTENT2}).execute(_a);
}else{
if(concord.global.isReader(this.file)){
new concord.customDownloadAction(_b.app,null,{hideCancel:true,DOWNLOAD_TITLE:concord.global.nls.DOWNLOAD_EMPTYVIEW_TITLE,OkTitle:concord.global.nls.DOWNLOAD_EMPTYVIEW_OK,OK:concord.global.nls.DOWNLOAD_EMPTYVIEW_OK,sentence1:concord.global.nls.DOWNLOAD_EMPTYVIEW_CONTENT1,sentence2:concord.global.nls.DOWNLOAD_EMPTYVIEW_CONTENT2}).execute(_a);
}else{
}
}
}else{
if(concord.global.showConcordEntry()){
if(_c._isPromptNewDraft()){
var _f=concord.global.nls.DOWNLOAD_NEWDRAFT_CONTENT1;
var df1=new lconn.share.util.DateFormat(_c.latestDraftUpdate);
var _10=df1.formatByAge(_f);
var _11=concord.global.nls.DOWNLOAD_NEWDRAFT_CONTENT2;
var df2=new lconn.share.util.DateFormat(_c.latestFileUpdate);
var _12=df2.formatByAge(_11);
new concord.customDownloadAction(_b.app,null,{hideCancel:false,DOWNLOAD_TITLE:concord.global.nls.DOWNLOAD_NEWDRAFT_TITLE,OkTitle:concord.global.nls.DOWNLOAD_NEWDRAFT_OK,OK:concord.global.nls.DOWNLOAD_NEWDRAFT_OK,sentence1:_10,sentence2:_12}).execute(_a,{windowOpenCommand:_c.doDownload});
}else{
_c.doDownload();
}
}else{
var _11=concord.global.nls.DOWNLOAD_NEWDRAFT_CONTENT2;
var df2=new lconn.share.util.DateFormat(this.file.getUpdated());
var _12=df2.formatByAge(_11);
new concord.customDownloadAction(_b.app,null,{hideCancel:false,DOWNLOAD_TITLE:concord.global.nls.DOWNLOAD_NEWDRAFT_TITLE,OkTitle:concord.global.nls.DOWNLOAD_NEWDRAFT_OK,OK:concord.global.nls.DOWNLOAD_NEWDRAFT_OK,sentence1:concord.global.nls.DOWNLOAD_NEWDRAFT_CONFIRM_CONTENT,sentence2:_12}).execute(_a,{windowOpenCommand:_c.doDownload});
}
}
}
}};
})();
}


;if(!dojo._hasResource["concord.IBMDocsIntroductionBox"]){
dojo._hasResource["concord.IBMDocsIntroductionBox"]=true;
dojo.provide("concord.IBMDocsIntroductionBox");




function overrideIntroductionBox(_1){
if(concord.global.showConcordEntry()){
var _2=concord.global.nls;
var _3={TITLE:_2.INTRODUCTION_BOX_TITLE,BLURB:_2.INTRODUCTION_BOX_BLURB,BLURB_LOG_IN:_2.INTRODUCTION_BOX_BLURB_LOG_IN,BLURB_UPLOAD:_2.INTRODUCTION_BOX_BLURB_UPLOAD_DOCS,CLOSE:_2.INTRODUCTION_BOX_CLOSE};
if(dojo.getObject("lconn.files.config.welcomeLink2")){
_3.BLURB2=_2.INTRODUCTION_BOX_4_6_BLURB_LIST_ITEM2;
_3.BLURB3=_2.INTRODUCTION_BOX_4_6_BLURB_LIST_ITEM3;
lconn.files.config.welcomeLink2="d_collaborating_on_a_document.html";
lconn.files.config.welcomeLink3="help_welcome_page.html";
window.openFilesHelpWindow=window.openHelpWindow;
window.openHelpWindow=function(_4){
var _5={"d_collaborating_on_a_document.html":"com.ibm.help.ibmdocs.doc/text/document","help_welcome_page.html":"com.ibm.help.ibmdocs.doc/text/overview"};
var _6=dojo.getObject("lconn.share.config.helpUri");
if(_5[_4]&&_6){
lconn.share.config.helpUri=_6.replace("com.ibm.cloud.files.doc",_5[_4]);
lconn.share.config.helpUri=lconn.share.config.helpUri.replace("com.ibm.lotus.connections.files.help",_5[_4]);
window.openFilesHelpWindow(_4);
lconn.share.config.helpUri=_6;
}else{
window.openFilesHelpWindow(_4);
}
};
}
var _7=_1.nls.WELCOMECONTENT;
if(_7){
dojo.mixin(_7,_3);
}
}
};
lconn.core.uiextensions.when("lconn/files/app/start").addCallback(overrideIntroductionBox);
}


;if(!dojo._hasResource["concord.generateIBMDocsIcon"]){
dojo._hasResource["concord.generateIBMDocsIcon"]=true;
dojo.provide("concord.generateIBMDocsIcon");








(function(){
var _1=["wordprocessing_","presentations_","spreadsheets_"];
var _2={"odt":0,"doc":0,"docx":0,"txt":0,"odp":1,"ppt":1,"pptx":1,"ods":2,"xls":2,"xlsx":2,"xlsm":2,"csv":2};
function _3(_4,_5,_6,_7){
var _6=_6||16;
_4.className=lconn.core.utilities.getFileIconClassName("."+_5,_6);
dojo.style(_4,"backgroundImage","url("+dijit._Widget.prototype._blankGif+")");
_4.src=concord.global.getIconBaseURL()+"ibmdocs_"+_1[_2[_5.toLowerCase()]]+_6+".png";
};
var _8=lconn.share.scenehelper.customizeViewObject;
lconn.share.scenehelper.customizeViewObject=function(_9,_a,_b){
var _b=_b||16;
viewOjb=_8(_9,_a);
if(typeof (_2[_9.getExtension().toLowerCase()])!="undefined"&&concord.global.isIBMDocFile(_9)){
viewOjb.fileTypeIconPath=concord.global.getIconBaseURL()+"ibmdocs_"+_1[_2[_9.getExtension().toLowerCase()]]+_b+".png";
return _a;
}
return _a;
};
function _c(_d){
var _e=_d.routes.generateFileTypeImage;
dojo.getObject(_d.routes.declaredClass).prototype.generateFileTypeImage=_d.routes.generateFileTypeImage=function(_f,_10,_11,_12){
if(typeof (_2[_10.toLowerCase()])!="undefined"&&concord.global.isIBMDocFile(_12)){
return _3(_f,_10,_11,_12);
}else{
return _e(_f,_10,_11,_12);
}
};
};
lconn.core.uiextensions.when("lconn/files/app/start").addCallback(_c);
lconn.core.uiextensions.when("lconn/files/comm/ref/app/start/fullpage").addCallback(_c);
})();
}


;if(!dojo._hasResource["concord.init"]){
dojo._hasResource["concord.init"]=true;
dojo.provide("concord.init");


















}

if(typeof define!=="undefined"&&typeof define._packages!=="undefined")define._packages["viewer"]=true;

;if(!dojo._hasResource["viewer.customViewAction"]){
dojo._hasResource["viewer.customViewAction"]=true;
dojo.provide("viewer.customViewAction");




dojo.declare("viewer.customViewAction",[lconn.files.action.impl.PromptAction],{showProgressBar:false,isContinueView:true,constructor:function(_1,_2,_3){
this.inherited(arguments);
this.nls=dojo.mixin(this.nls,{OK:_3.OK,OkTitle:_3.OkTitle,VIEW_TITLE:_3.VIEW_TITLE});
},getNls:function(_4){
return viewer.global.nls;
},createDialog:function(_5,_6,_7){
_6=dojo.mixin(_6,{title:this.nls.VIEW_TITLE,showProgressBar:this.showProgressBar});
this.dialog=_7;
if(typeof (_5)!="undefined"&&_5!=null){
this.file=_5;
}
this.isContinueView=!!_6.isContinueView;
this.inherited(arguments);
},renderQuestion:function(d,el,_8,_9){
var _a=d.createElement("div");
dojo.attr(_a,"class","lotusFormField");
el.appendChild(_a);
dojo.create("p",{innerHTML:this.sentence1},_a);
dojo.create("p",{innerHTML:this.sentence2},_a);
},onSuccess:function(){
if(this.isContinueView){
var _b=this.file.getId();
var _c=_b.replace(/[-\s.@]/g,"_");
window.open(glb_viewer_url_wnd_open+"/app/lcfiles/"+file.getId()+"/content","_blank","");
}
}});
}


;if(!dojo._hasResource["viewer.viewerPreload"]){
dojo._hasResource["viewer.viewerPreload"]=true;
dojo.provide("viewer.viewerPreload");
dojo.declare("viewer.viewerPreload",null,{staticPath:"",viewerApiUrl:"/viewer/api/version",viewerDiv:null,staticTimer:null,jsIndex:0,cssIndex:0,jsFiles:["/js/dojo/dojo.js","/js/viewer/viewer.js","/js/html/js/dojo/dojo.js","/js/html/js/concord/concord_text.js","/js/html/js/concord/concord_pres.js","/js/html/js/concord/concord_sheet_view.js","/js/pdfjs/pdf.js","/js/pdfjs/pdf.worker.js","/js/viewer/pdfJs/pdfJsViewer.js"],cssFiles:["/js/html/css/sheetview.css","/js/html/css/presview.css","/js/html/css/presview2.css","/js/html/styles/css/document/document_main.css","/js/html/js/concord/text/concord_document.css","/js/dijit/themes/oneui30/oneui30.css","/styles/css/base.css"],eventArray:[],bContinueLoad:true,timerInterval:300,timerCount:0,preload:function(_1){
window.setTimeout(dojo.hitch(this,this._doPreload),1000*_1);
},_doPreload:function(){
if(this._initStaticPath(this.viewerApiUrl)){
var _2=document.createElement("div");
_2.id="viewerPreloadDiv";
_2.style.display="none";
document.body.appendChild(_2);
this.viewerDiv=_2;
this.staticTimer=window.setInterval(dojo.hitch(this,this._preloadStatics),this.timerInterval);
}
},_initStaticPath:function(_3){
var _4,_5;
dojo.xhrGet({url:_3,handleAs:"json",preventCache:true,handle:function(r,io){
_4=r;
_5=io;
},sync:true});
if(_4 instanceof Error){
return false;
}
if(_3==this.viewerApiUrl){
this.staticPath=_4.timestamp;
}
return true;
},_preloadStatics:function(){
this.timerCount++;
if((this.timerInterval*this.timerCount)>(1000*60*4)){
this._killTimer();
return;
}
if(this.bContinueLoad){
if(this.jsFiles.length>this.jsIndex){
var _6=this.jsFiles[this.jsIndex++];
if(_6){
this.createPlaceHolder(_6);
}else{
this.jsIndex++;
}
}else{
if(this.cssFiles.length>this.cssIndex){
var _6=this.cssFiles[this.cssIndex++];
if(_6){
this.createPlaceHolder(_6);
}else{
this.cssIndex++;
}
}else{
if(this.staticTimer){
this._killTimer();
}
}
}
}else{
if(this.jsFiles.length<=this.jsIndex&&this.cssFiles.length<=this.cssIndex&&this.staticTimer){
this._killTimer();
}
}
},_killTimer:function(){
if(this.staticTimer){
clearInterval(this.staticTimer);
this.staticTimer=null;
window.setTimeout(dojo.hitch(this,this._clear),1000*25);
}
},createPlaceHolder:function(_7){
var _8="/viewer/static/"+this.staticPath+_7;
var o=null;
if(dojo.isIE){
o=document.createElement("script");
o.src=_8;
o.type="text/cache";
}else{
o=document.createElement("object");
o.data=_8;
o.width=0;
o.height=0;
}
this.viewerDiv.appendChild(o);
if(dojo.isIE){
this.eventArray.push(dojo.connect(o,"onreadystatechange",dojo.hitch(this,this._onObjStateChange,o)));
}else{
this.eventArray.push(dojo.connect(o,"onload",dojo.hitch(this,this._onObjLoad)));
}
this.bContinueLoad=false;
},_onObjLoad:function(){
this.bContinueLoad=true;
},_onObjStateChange:function(o){
if(o.readyState=="complete"||o.readyState=="loaded"){
this.bContinueLoad=true;
}
},_clear:function(){
if(this.eventArray){
for(var i;i<this.eventArray.length;i++){
dojo.disconnect(this.eventArray[i]);
}
this.eventArray=[];
}
if(this.viewerDiv&&this.viewerDiv.parentNode){
this.viewerDiv.parentNode.removeChild(this.viewerDiv);
}
}});
}

dojo.provide("viewer.nls.ccdfilesext")._built=true;
dojo.provide("viewer.nls.ccdfilesext.en_us");
viewer.nls.ccdfilesext.en_us={"downloadAsMS":"Download as Microsoft Office Format","newDocumentName":"Document","draft_editor_valid":"Only people who are assigned as editors of the file can work with a draft.","draft_beiing_edited":"This file is currently being edited on the web by ${user}.","draft_save_action_label":"Save","draft_tab_title":"Draft","newFromName":"Create File","newDocumentDialogTitle":"Create a Document","sheetTitle0":"Sheet 1","sheetTitle1":"Sheet 2","sheetTitle2":"Sheet 3","editTooltip":"Edit","newPresName":"Presentation","viewTooltip":"Preview the file in a browser","VIEW_EMPTYVIEW_CONTENT1":"A published version of this file is not available for viewing.","VIEW_EMPTYVIEW_CONTENT2":"The file owner must publish a version of the file before it can be viewed.","docTooLargeCancelBtn":"Cancel","draft_latest_edit":"Latest edit:","newSheetDialogBtnOKTitle":"Create a spreadsheet","newSheetDialogInitialName":"Untitled Spreadsheet","newDocumentTooltip":"Create a document","newDocumentDialogIllegalErrMsg":"${0} is an illegal document title, please specify another one.","newDocumentDialogBtnCancel":"Cancel","draft_unpublished_tip":"There are draft edits that have not been saved as a version.","editName":"Edit","newDocumentDialogNamepre":"Name (*)","downloadAsPDF":"Download as PDF File","newFromTooltip":"Create a new file using this file as a template","unSupporteBrowserContent":"The browser that you are using is not supported. Try to launch it in another browser.","VIEW_EMPTYVIEW_OK":"Close","newTooltip":"Create a document","newFromSheetTip":"Create a spreadsheet using the current file as a template.","draft_created":"${0} based on Version ${1}","newSheetName":"Spreadsheet","newName":"New","newFromDocTip":"Create a document using the current file as a template.","viewName":"View","draft_doctype_valid":"Only files that are IBM Docs documents can be edited.","newSheetDialogTitle":"Create a Spreadsheet","docTooLargeDescription":"The document that you want to edit is too large. \x3cbr /\x3eMake sure that the size of file in *.odt, *.doc, \x3cbr /\x3eor *.docx format is no greater than 2048 K.","currentEditing":"Current editing: ","unSupporteBrowserTitle":"This browser is not supported","newPresDialogTitle":"Create a Presentation","newDocumentDialogBtnOKTitle":"Create a document","newSheetTooltip":"Create a spreadsheet","newDocumentDialogInitialName":"Untitled Document","VIEW_EMPTYVIEW_TITLE":"Cannot View the File","newPresTooltip":"Create a presentation","newDocumentDialogBtnOK":"Create","newDocumentDialogContent":"Provide a new name for this untitled draft","newPresDialogInitialName":"Untitled Presentation","newPresDialogBtnOKTitle":"Create a presentation","newDocumentDialogDupErrMsg":"A duplicate file name was found. Enter a new name.","draft_not_found":"There are no draft edits for this file.","docTooLargeTitle":"The document is too large.","draft_cur_editing":"Current editing:"};

;if(!dojo._hasResource["viewer.global"]){
dojo._hasResource["viewer.global"]=true;
dojo.provide("viewer.global");


dojo.requireLocalization("viewer","ccdfilesext");
dojo.require["lconn.core.config.features"];


glb_viewer_url="/viewer";
glb_viewer_url_wnd_open="/viewer";
viewer.global=new function(){
this._locMap={"zh-hk":"zh-tw","zh-mo":"zh-tw","zh-sg":"zh-cn","zh":"zh-cn","no":"nb","nb-no":"nb","nn-no":"nb","nn":"nb","id-id":"id","in-id":"id"};
this._getLocalization=function(_1,_2,_3){
var _4=_1+".nls."+_2;
var _5,_6=dojo.getObject(_4),_7=_3.split("-");
for(var i=_7.length;i>0;i--){
var _8=_7.slice(0,i).join("_");
if(dojo.exists(_8,_6)){
_5=_6[_8];
break;
}
}
if(!_5&&_6&&_6.ROOT){
_5=_6.ROOT;
}
return _5;
};
this.nls=null;
this.entitlementCheck={checked:false,entitled:false};
this.getLocale=function(){
var _9=this._locMap[dojo.locale.toLowerCase()];
if(!(_9==undefined)){
return _9;
}else{
_9=dojo.locale.toLowerCase();
}
if(!((_9=="pt-br")||(_9=="zh-cn")||(_9=="zh-tw"))){
_9=_9.split("-")[0];
}
return _9;
},this.showViewEntry=function(_a){
if(!_a&&lconn.core.config&&lconn.core.config.features&&lconn.core.config.features("fileviewer-detailspage")){
return false;
}
if(dojo.cookie("entitlements")){
this.entitlementCheck.entitled=true;
this.entitlementCheck.checked=true;
}
if(lconn.core.auth.isAuthenticated()&&!this.entitlementCheck.checked){
var _b;
dojo.xhrGet({url:"/viewer/api/entitlement",handleAs:"json",timeout:30000,sync:true,preventCache:true,handle:function(r,io){
_b=r;
}});
if(_b instanceof Error){
this.entitlementCheck.entitled=false;
}else{
this.entitlementCheck.entitled=(_b.entitled=="true");
this.entitlementCheck.checked=true;
if(undefined!=_b.error){
console.log(_b.error);
}
}
}
return this.entitlementCheck.entitled;
};
var _c=dojo.locale.toLowerCase();
var _d=dojo.version.major==1&&dojo.version.minor<7;
if(!_d){
this._dojo19locMap={"zh-hk":"zh-tw","zh-mo":"zh-tw","zh-sg":"zh-cn","zh":"zh-cn","nb":"nb","nb-no":"nb","nn-no":"nb","nn":"nb","no":"nb","id-id":"id","in-id":"id"};
var _e=true;
if(dojo.isIE&&_c=="id-id"){
_e=false;
}
if(this._dojo19locMap[_c]&&_e){
_c=this._dojo19locMap[_c];
}
this.nls=this._getLocalization("viewer","ccdfilesext",_c);
}else{
if((_c.indexOf("en")==0)){
this.getLocale=function(){
return undefined;
};
this.nls=dojo.i18n.getLocalization("viewer","ccdfilesext");
}else{
var _f=dojo.config.localizationComplete;
if(_f){
dojo.config.localizationComplete=false;
}
dojo.requireLocalization("viewer","ccdfilesext",this.getLocale());
dojo.config.localizationComplete=_f;
this.nls=dojo.i18n.getLocalization("viewer","ccdfilesext",this.getLocale());
}
}
}();
dojo.addOnLoad(function(){
if(viewer.global.showViewEntry(true)){
var _10=new viewer.viewerPreload();
_10.preload(5);
}
});
}


;if(!dojo._hasResource["viewer.actionView"]){
dojo._hasResource["viewer.actionView"]=true;
dojo.provide("viewer.actionView");


dojo.subscribe("lconn/share/app/start",function(){




dojo.provide("com.ibm.viewer.lcext.CCDView");
dojo.declare("com.ibm.viewer.lcext.CCDView",[lconn.share.action.DeferredAction],{name:viewer.global.nls.viewName,tooltip:viewer.global.nls.viewTooltip,isPrimary:true,constructor:function(_1,_2){
this.inherited(arguments);
this.app=_1;
},isValid:function(_3,_4){
var _5=_3.getExtension();
var _6={"doc":1,"ppt":1,"xls":1,"docx":1,"pptx":1,"xlsx":1,"xlsm":1,"odt":1,"odp":1,"ods":1,"pdf":1,"ott":1,"otp":1,"ots":1,"dot":1,"pot":1,"xlt":1,"dotx":1,"potx":1,"xltx":1};
if((_4.app&&_4.app.authenticatedUser)||(_4.permissions&&_4.permissions.isAuthenticated())){
if((!_3.isEncrypted())&&_5&&_6[_5.toLowerCase()]){
return true;
}
}
return false;
},viewernls:viewer.global.nls,execute:function(_7,_8){
window.open(glb_viewer_url_wnd_open+"/app/lcfiles/"+_7.getId()+"/content","_blank","");
},_isEmpty:function(_9){
return 0==_9.getSize();
},_isReader:function(_a){
return !!_a.getPermissions().View;
}});
this.addActions=function(_b,id,_c,_d,_e){
if(!viewer.global.showViewEntry()){
return;
}
try{
var _f=false;
var len=(typeof _b!="undefined")?_b.length:0;
for(var _10=0;_10<len;_10++){
var _11=_b[_10].declaredClass;
if("com.ibm.viewer.lcext.CCDView"==_11){
_f=true;
break;
}
}
if(!_f){
_b.unshift(new com.ibm.viewer.lcext.CCDView(_c,_d,_e));
}
}
catch(e){
console.log("Error happens when adding actions to communities files UI: ",e);
}
};
lconn.core.uiextensions.add("lconn/files/actions/file",this.addActions);
lconn.core.uiextensions.add("lconn/files/actions/grid",this.addActions);
});
}


;if(!dojo._hasResource["viewer.init"]){
dojo._hasResource["viewer.init"]=true;
dojo.provide("viewer.init");


}


;if(!dojo._hasResource["lconn.files.PersonalFiles"]){
dojo._hasResource["lconn.files.PersonalFiles"]=true;
dojo.provide("lconn.files.PersonalFiles");








































































dojo.requireLocalization("lconn.files","ui");
dojo.declare("lconn.files.PersonalFiles",[lconn.files.FilesFullScreenApp,lconn.files.FileSceneMixin,lconn.files.PromptMixin],{init:function(_1){
if(!this.inherited(arguments)){
return false;
}
this.nls=dojo.i18n.getLocalization("lconn.files","ui");
this.nls.TOGGLE_SYNC_FILE.SYNC.INFO_SUCCESS=this.nls.ADD_FILES_TO_FILESYNC.INFO_SUCCESS_1;
this.nls.TOGGLE_SYNC_FILE.STOP_SYNC.INFO_SUCCESS=this.nls.REMOVE_FROM_FILESYNC.INFO_SUCCESS_1;
lconn.share.util.DateFormat.prototype._nls=this.nls;
lconn.share.util.text._SIZE=this.nls.SIZE;
this.isA11Y=dojo.hasClass(dojo.body(),"dijit_a11y");
this.baseUriPath=this.routes._basePath;
this.securedUrls=dojo.map(dojo.getObject("lconn.share.config.securedUrls")||[],function(s){
return new dojo._Url(s);
});
this.useStandardLogin=dojo.getObject("lconn.share.config.auth.standardLogin");
this.usercache={};
this.stores={};
var _2=this.auth=com.ibm.ajax.auth;
_2.checkByXLConnAuth=true;
_2.setAuthenticationHandler(dojo.hitch(this,this.onAuthenticationRequestDetected));
_2.addAuthenticationCheck(lconn.files.PersonalFiles.isSessionInvalidated);
this.communityFolderEnabled=!!dojo.getObject("lconn.files.config.features.communityFolder");
this.isPersonalFiles=true;
this.enableDnDPrompts=lconn.core.config.features("files-personal-dnd-upload-indicator");
this.isNestedFolderEnabled=lconn.share.util.configUtil.isNestedFolderEnabled();
var _3=dojo.hitch(this,"_isSecureUrl");
_2.interceptDojoXhr(_3);
lconn.core.auth.setAuthCheck(dojo.partial(function(_4){
return _4&&!!_4.authenticatedUser;
},this));
this.net=new lconn.share.util.Network({getAuthenticatedUser:dojo.hitch(this,this.getAuthenticatedUser),isSecuredUrl:_3});
dojo.connect(this.net,"onNetwork",this,"onNetwork");
dojo.connect(this.net,"onNetworkEnd",this,"onNetworkEnd");
this.messages=new lconn.files.util.Messages();
dojo.subscribe("lconn/share/scene/begin",this.messages,"resetVisible");
this.templates=new lconn.files.util.SceneTemplates(dojo.getObject("lconn.share.config.templates")||{},{net:this.net,defaultParameters:{lang:this.language,ver:dojo.getObject("lconn.share.config.version")}});
this.initFavorites();
this.showApplicationName=dojo.getObject("lconn.share.config.features.showApplicationName")===true;
dojo.subscribe("lconn/share/action/completed",this,"onActionSuccess");
return true;
},initPreferences:function(){
return new lconn.files.PersonalPreferences({path:this.routes.getCookiePath(),isAuthenticated:dojo.hitch(this,"isAuthenticated"),getUserPreferences:dojo.hitch(this,"_getAuthenticatedPreferences"),serializeColumns:dojo.hitch(this,"_serializeFileColumns"),deserializeColumns:dojo.hitch(this,"_deserializeFileColumns"),urlPreferences:this.routes.getPreferencesServiceUrl()});
},initRoutes:function(_5,_6){
var _7=new lconn.files.FilesRoutes(_5,_6);
_7.disableAnonymous=dojo.getObject("lconn.files.config.services.disableAnonymous");
return _7;
},initServiceApiProxy:function(){
if(this.net&&this.routes){
return new lconn.files.ServiceApiProxy(this.net,this.routes);
}
return null;
},initGlobalActions:function(){
var _8={isGlobal:true};
if(this.globalActionOpts){
dojo.mixin(_8,this.globalActionOpts);
}
this.globalActions=lconn.files.actions.get("create",this,_8);
},getUserSearchAdapter:function(){
if(!this.userSearchAdapter){
this.userSearchAdapter=new lconn.files.widget.UserSearchQCSAdapter(this.net,this.routes.getUserSearchServiceUrl(),this.nls.USERSEARCH.NO_RESULTS,this);
}
return this.userSearchAdapter;
},_getAuthenticatedPreferences:function(){
var u=this.authenticatedUser;
return (u&&u.preferences)?u.preferences:{};
},onApplicationStart:function(){
if(window["doSemTagSvcOnload"]){
try{
doSemTagSvcOnload();
}
catch(e){
console.log(e);
}
}
if(window["loadConnectionsLanguageSelector"]){
loadConnectionsLanguageSelector();
}
if(window["doUIExtensionConfigOnload"]){
doUIExtensionConfigOnload();
}
this.registerGlobalPrompt();
this.dragEventHandler=dojo.hitch(this,"onDragIntoWindow");
this.dropEventHandler=dojo.hitch(this,"onDropIntoWindow");
this.registerWindowDragAndDrop();
this.inherited(arguments);
lconn.core.uiextensions.when("lconn/files/app/start",this);
this.loadPickerCSS();
},loadPickerCSS:function(){
var _9=this.oneuiVersion||3;
var _a=this.cssUrl;
if(!_a){
var _b=this.routes.getBasePath();
var _c=!!dojo.getObject("app.includeIcons",false,this);
_a=_b+"picker/style.css?includeIconStyles="+(_c?"true":"false")+"&lang="+dojo.config.locale;
if(this.oneuiVersion){
_a+="&oneui="+this.oneuiVersion;
}
var _d=null;
if(dojo.exists("lconn.core.theme.getCurrentThemeId")){
_d=lconn.core.theme.getCurrentThemeId();
if(_d!="gen4"&&_d!="hikari"){
_d=null;
}
}
if(this.theme){
_d=this.theme;
}
if(_d){
_a+="&theme="+_d;
}
}
var d=dojo.doc;
var _e=d.getElementsByTagName("head")[0];
var _f=dojo.byId("_picker_css");
var _10=_e.firstChild;
if(!_f){
var _11=dojo.create("link",{"rel":"stylesheet","href":_a,"type":"text/css","id":"_picker_css"});
_e.insertBefore(_11,_10);
}
},registerWindowDragAndDrop:function(){
try{
window.addEventListener("dragover",this.dragEventHandler,true);
window.addEventListener("drop",this.dropEventHandler,true);
if(this.scene&&dojo.getObject("hints.hasDnDPrompt",false,this.scene)){
if((this.scene.collection&&this.scene.collection.getPermissions().AddChild)||!this.scene.collection){
dojo.body().addEventListener("dragover",dojo.hitch(this,"addDropHighlights"),false);
}
}
}
catch(e){
console.log(e);
}
},unRegisterWindowDragAndDrop:function(){
try{
window.removeEventListener("dragover",this.dragEventHandler,true);
window.removeEventListener("drop",this.dropEventHandler,true);
dojo.body().addEventListener("dragover",dojo.hitch(this,"removeDropHighlights"),false);
}
catch(e){
console.log(e);
}
},addDropHighlights:function(e){
e.stopPropagation();
e.preventDefault();
if(dojo.indexOf(e.dataTransfer.types,"Files")<0){
return;
}
dojo.addClass(dojo.byId("body"),"filesDropAvatar");
var _12=dojo.byId("lotusContent");
if(_12.clientWidth<770){
dojo.addClass(dojo.byId("body"),"filesDropAvatarSmallScreen");
}
},removeDropHighlights:function(e){
e.stopPropagation();
e.preventDefault();
dojo.removeClass(dojo.byId("body"),"filesDropAvatar");
dojo.removeClass(dojo.byId("body"),"filesDropAvatarSmallScreen");
},activateHelp:function(){
openHelpWindow();
},_decodeState:function(uri){
var _13=uri.path;
var _14=this.baseUriPath;
if(_13.indexOf(_14)==0){
_13=_13.substring(_14.length);
}
var _15=lconn.files.routes.decode(_13,uri);
if(!dojo.exists(_15.id)){
var dfd=new dojo.Deferred();
lconn.share.requireAsync(_15.id).addCallback(dfd,"callback",_15);
return dfd;
}
return _15;
},isProtectedUri:function(uri){
var _16=uri.path;
var _17=this.baseUriPath;
if(_16.indexOf(_17)==0){
_16=_16.substring(_17.length);
}
return lconn.files.routes.isProtectedUri(_16,uri);
},onNetwork:function(_18){
if(_18&&_18.verb&&!_18.statusText){
switch(_18.verb){
case "put":
case "post":
case "delete":
_18.statusText=this.nls.SAVING;
break;
default:
_18.statusText=this.nls.LOADING;
}
}
if(_18&&!_18.noStatus){
this.working(_18.statusText);
}
},onNetworkEnd:function(_19){
if(_19&&!_19.noStatus){
this.idle();
}
},onActionSuccess:function(_1a,_1b){
if(this.scene&&this.scene.onActionSuccess){
this.scene.onActionSuccess(_1a,_1b);
return;
}
if(_1a.messages){
this.messages.add(_1a.messages);
}
},initAuthentication:function(){
var el=document.getElementById("userInfo");
var _1c;
if(el){
_1c=this.createUser(dojo.fromJson(lconn.share.util.html.htmlText(el)));
_1c.permissions=new lconn.share.bean.StreamPermissions({authenticatedId:_1c.id,guest:_1c.isGuest,orgId:_1c.orgId,policy:_1c.policy});
}
return _1c;
},_loadAuthentication:function(){
var _1d,_1e;
this.net.getJson({url:this.routes.getUserInfoServiceUrl(),auth:{secured:false},handle:function(r,io){
_1d=r;
_1e=io;
},sync:true,noStatus:true});
if(this.auth.isAuthenticationRequired(_1d,_1e)){
return null;
}
if(_1d instanceof Error){
console.log("App::_loadAuthentication DEBUG user is authenticated to WAS, but services cannot create a user - code="+_1d.code);
throw _1d;
}
var _1f=this.createUser(_1d.items[0]);
_1f.permissions=new lconn.share.bean.StreamPermissions({authenticatedId:_1f.id,guest:_1f.isGuest,orgId:_1f.orgId,policy:_1f.policy});
return _1f;
},getUserPermissions:function(){
return this.authenticatedUser?this.authenticatedUser.permissions:lconn.share.bean.StreamPermissions.ANONYMOUS;
},onAuthenticationRequestDetected:function(_20,_21,_22){
if(this.waitingForLogin()||this._waitingForLoginConfirm){
console.log("PersonalFiles::onAuthenticationRequestDetected DEBUG login already in progress");
this._pendingRequests.push([_21,_22]);
}else{
if(!_21.args.auth||!_21.args.auth.preventLogin){
this._pendingRequests=[[_21,_22]];
this._waitingForLoginConfirm=true;
this.promptLogin();
}
}
},_onLoginPromptConfirm:function(){
console.log("PersonalFiles::onAuthenticationRequestDetected DEBUG user accepted non-standard login");
this.login();
this._waitingForLoginConfirm=false;
},_onLoginPromptCancel:function(){
this._pendingRequests=[];
this._waitingForLoginConfirm=false;
},promptLogin:function(){
var _23=this.scene;
if(_23&&_23.onlogin&&_23.onlogin()){
this._waitingForLoginConfirm=false;
return;
}
if(this.useStandardLogin){
var e=lconn.share.util.misc.last(arguments);
if(lconn.share.util.html.isEvent(e)){
dojo.stopEvent(e);
}
lconn.share.requireAsync("lconn.files.action.impl.Reauthenticate").addCallback(this,function(){
if(!this.loginAction){
this.loginAction=new lconn.files.action.impl.Reauthenticate(this,null,{});
dojo.connect(this.loginAction,"onCancel",this,"_onLoginPromptCancel");
}
this.loginAction.execute();
});
}else{
this.confirm(this.nls.SESSION_TIMEOUT_CUSTOM,dojo.hitch(this,"_onLoginPromptConfirm"),dojo.hitch(this,"_onLoginPromptCancel"),true);
}
},getNonce:function(_24){
var app=this;
return this.checkAuthentication(function(_25,_26){
if(_25 instanceof Error){
_24(_25,_26);
}else{
if(_25==false){
var _27=new Error("unauthenticated");
_27.code="unauthenticated";
_24(_27,_26);
}else{
_24(app.authenticatedUser.nonce,_26);
}
}
});
},checkAuthentication:function(_28){
var v={};
var _29=this.net.getJson({url:this.routes.getUserInfoServiceUrl(),auth:{secured:false},handle:dojo.hitch(this,"_handleCheckAuth",_28),noStatus:true});
return _29;
},_handleCheckAuth:function(_2a,_2b,_2c){
_2c=_2c||{};
dojo.setObject("args.auth.preventReload",true,_2c);
if(this.auth.isAuthenticationRequired(_2b,_2c)){
this.onAuthenticationRequestDetected(_2b,_2c,null);
_2a(false,_2c);
}else{
if(_2b instanceof Error){
_2a(_2b,_2c);
}else{
var _2d=this.createUser(_2b.items[0]);
_2d.permissions=new lconn.share.bean.StreamPermissions({authenticatedId:_2d.id,guest:_2d.isGuest,orgId:_2d.orgId,policy:_2d.policy});
var _2e=(_2d&&typeof _2d=="object"&&this.authenticatedUser&&this.authenticatedUser.id==_2d.id);
if(_2e){
this.authenticatedUser=_2d;
}else{
this.onAuthenticationRequestDetected(_2b,_2c,null);
}
_2a(_2e,_2c);
}
}
},onUserLogin:function(){
this._waitingForLoginConfirm=false;
this.clearUserCache();
this._endScene();
if(typeof arguments[0]=="function"){
arguments[0]();
}else{
this.hasScene=false;
lconn.files.scenehelper.applyLoading(this);
setTimeout(dojo.hitch(this,"navigate",this.getUrl(),{forceReload:true}),1);
}
},onUserReauthenticated:function(){
this._waitingForLoginConfirm=false;
var _2f=this._pendingRequests||[];
this._pendingRequests=[];
if(_2f.length>0&&(dojo.every(_2f,function(p){
return !!p[1];
})||dojo.some(_2f,function(p){
var a=p[0].args.auth;
return a&&a.preventReload;
}))){
var f=function(p){
if(p[1]){
p[1](p[0].args);
}
};
setTimeout(dojo.partial(dojo.forEach,_2f,f),1);
}else{
this._endScene();
this.hasScene=false;
lconn.files.scenehelper.applyLoading(this);
setTimeout(dojo.hitch(this,"load",this.getUrl()),1);
}
},onUserReset:function(){
this._waitingForLoginConfirm=false;
this.clearUserCache();
this._endScene();
var url=(arguments&&typeof arguments[0]=="string")?arguments[0]:this.routes.getGlobalHomeUrl();
this.hasScene=false;
lconn.files.scenehelper.applyLoading(this);
setTimeout(dojo.hitch(this,"navigate",url,{forceReload:true}),1);
},clearUserCache:function(){
var c=this.usercache;
for(var key in c){
lconn.share.util.misc.destroy(c[key]);
delete c[key];
}
var s=this.stores;
for(var key in s){
s[key].clear();
}
},createUser:function(_30){
if(!_30){
return null;
}
if(!_30.photoURL){
_30.photoURL=this.routes.getUserPhotoUrl(_30);
}
return _30;
},onDragIntoWindow:function(_31){
if(!dojo.getObject("lconn.share.config.features.dropDesktopFiles")){
return;
}
if(_31.dataTransfer&&_31.dataTransfer.types&&dojo.indexOf(_31.dataTransfer.types,"Files")!=-1){
_31.preventDefault();
}
},onDropIntoWindow:function(_32){
if(!dojo.getObject("lconn.share.config.features.dropDesktopFiles")){
return;
}
if(_32.dataTransfer&&_32.dataTransfer.files){
_32.preventDefault();
var _33=_32.dataTransfer.files;
lconn.share.requireAsync("lconn.files.action.impl.DropFiles").addCallback(this,function(){
var _34=new lconn.files.action.impl.DropFiles(this);
_34.execute(_33);
});
}
},navigate:function(){
this._hideSemTagMenu();
this.inherited(arguments);
},_endScene:function(){
this.inherited(arguments);
this.net.cancel();
},_hideSemTagMenu:function(){
if(window["LCSemTagMenu"]){
LCSemTagMenu.clearTimeouts();
LCSemTagMenu.hide();
}
},showAuthenticationError:function(e){
var _35=this.nls.APP.ERRORS.UNABLE_TO_LOGIN;
switch(e.code){
case "InvalidUser":
_35=this.nls.APP.ERRORS.INVALID_USER;
break;
case "DuplicateUserAccount":
_35=this.nls.APP.ERRORS.DUPLICATE_USER;
break;
}
var _36=[[_35.ACT_OUT,this.getUrl(),"logout"]];
lconn.files.scenehelper.applyGenericWarning(this,_35.TITLE,_35.MESSAGES,_36,e);
},showLoginRequiredError:function(){
var _37=this.nls.APP.ERRORS.LOGIN;
var _38=[[_37.ACT,this.getUrl(),"login"]];
lconn.files.scenehelper.applyGenericWarning(this,_37.TITLE,_37.MESSAGES,_38);
},showLoading:function(){
lconn.files.scenehelper.applyLoading(this);
},showError:function(e){
lconn.files.scenehelper.applyApplicationError(this,e);
},showWorking:function(_39){
_39=_39||this.nls.LOADING;
var div=this.busyNode;
if(!div){
div=this.busyNode=document.createElement("div");
div.style.display="none";
div.className="lotusLoadingBox";
document.body.appendChild(div);
}
lconn.share.util.html.removeChildren(div);
var img=document.createElement("IMG");
img.className="lotusLoading";
img.alt="";
img.src=dojo.config.blankGif;
img.paddingBottom="1px";
div.appendChild(img);
div.appendChild(document.createTextNode(" "));
div.appendChild(document.createTextNode(_39));
if(div.style.display!=""&&!div._timeout){
div._timeout=setTimeout(function(){
if(div._timeout){
div._timeout=null;
div.style.display="";
div.style.marginTop="50px";
}
},200);
}
},showIdle:function(){
var div=this.busyNode;
if(div){
clearTimeout(div._timeout);
div._timeout=null;
div.style.display="none";
}
},getColumns:function(){
if(!this.columns){
this.columns={file:new lconn.files.service.FileColumns(this.nls.COLUMN.FILE)};
}
return this.columns;
},_serializeFileColumns:function(_3a){
var f=this.getColumns().file;
return f.serialize(_3a);
},_deserializeFileColumns:function(_3b){
var f=this.getColumns().file;
return f.deserialize(_3b);
},getTemplate:function(_3c,_3d){
if(!_3c){
return null;
}
var doc=this.templates.getXhtml(_3c.declaredClass,_3d);
return (doc?doc.documentElement:null);
},getUserTypeAheadStore:function(_3e){
var key="user-"+!!_3e;
var s=this.stores[key];
if(!s){
var cfg=dojo.getObject("lconn.share.config.services.peopleSearch")||{};
s=this.stores[key]=new lconn.share.widget.PeopleDataStore({net:this.net,getUrl:dojo.hitch(this.routes,_3e?"getActiveTypeAheadUserServiceUrl":"getTypeAheadUserServiceUrl"),networkUrl:(this.authenticatedUser?this.routes.getMySharedWithUsersServiceListUrl({pageSize:cfg.pageSize}):null),activeOnly:_3e,queryParam:"searchString",maxResults:cfg.maxResults,pageSize:cfg.pageSize});
dojo.subscribe("lconn/files/users/changed",s,"clear");
}
return s;
},getCollectionTypeAheadStore:function(){
var s=this.stores.collection;
if(!s){
var cfg=dojo.getObject("lconn.share.config.services.collectionSearch")||{};
s=this.stores.collection=new lconn.files.util.CollectionDataStore({net:this.net,getUrl:dojo.hitch(this.routes,"getCollectionsListServiceUrl"),queryParam:"name",maxResults:cfg.maxResults,pageSize:cfg.pageSize});
dojo.subscribe("lconn/files/folders/changed",s,"clear");
}
return s;
},getGroupTypeAheadStore:function(_3f){
var key="group-"+!!_3f;
var s=this.stores[key];
if(!s){
var cfg=dojo.getObject("lconn.share.config.services.peopleSearch")||{};
s=this.stores[key]=new lconn.share.widget.PeopleDataStore({net:this.net,getUrl:dojo.hitch(this.routes,"getGroupSearchServiceUrl",null,{includeAllAuthenticated:_3f}),queryParam:"searchString",maxResults:cfg.maxResults,pageSize:cfg.pageSize});
dojo.subscribe("lconn/files/groups/changed",s,"clear");
}
return s;
},getTagStore:function(){
var s=this.stores.tag;
if(!s){
s=this.stores.tag=new lconn.files.util.TagDataStore({net:this.net,app:this,getUrl:dojo.hitch(this.routes,this.routes.getTagServiceUrl),queryParam:"tag"});
dojo.subscribe("lconn/files/tags/changed",s,"clear");
}
return s;
},getRecommendationsDataStore:function(doc){
var _40=doc._isEcmFile;
var _41=this.getAuthenticatedUserId();
var _42={id:_41,identifier:"id"};
var _43=this.routes.getFileUrl(doc,_40?"recommendedby/feed":"feed",{_anonymous:!_41},{commonProxy:true});
var _44=(_41&&!_40?this.routes.getFileUrl(doc,"recommendation/"+encodeURIComponent(_41)+"/entry",{_anonymous:false}):null);
var _45=new lconn.files.util.LikeDataStore({currentLogin:this.getAuthenticatedUser(),data:_42,urlFeed:_43,urlRecommendation:_44,net:this.net,app:this,recommendationsCount:doc.getRatingCount()});
dojo.connect(_45,"_updateCount",function(){
doc.ratingCount=_45.recommendationsCount;
});
_45.nls=_45._strings=this.nls.RECOMMEND;
var opt={pageSize:lconn.share.widget.tooltip.Recommend.prototype.limitPeopleList,includeRecommendation:true,format:"JSON",_anonymous:!_41};
if(!_40){
opt.sK="createdByName";
}
_45.url=this.routes.getFileUrl(doc,"recommendedby/feed",opt,{commonProxy:true});
return _45;
},getQuota:function(){
var q=this.usercache.quota;
if(!q&&this.authenticatedUser){
q=new lconn.files.util.QuotaCache({net:this.net,url:this.routes.getLibraryEntryServiceUrl(this.authenticatedUser.id)});
this.usercache.quota=q;
}
return q;
},_isSecureUrl:function(s){
if(!s){
return false;
}
var url=new dojo._Url(s);
return dojo.some(this.securedUrls,function(_46){
return url.path.indexOf(_46.path)==0;
});
}});
lconn.core.header.MenuLauncher.prototype._whenDialog=function(){
return lconn.share.requireAsync("dijit.Dialog");
};
lconn.files.PersonalFiles.isSessionInvalidated=function(_47,_48,_49){
try{
if(_49&&_49.xhr){
var _4a=_49.xhr.status;
if(_4a==412&&_49.xhr.responseXML&&_49.xhr.responseXML.documentElement){
var el=_49.xhr.responseXML.documentElement;
var _4b=lconn.share.util.dom.getChildElementTextContentNS(el,"errorCode",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
var _4c=lconn.share.util.text.trim(_4b);
return ("InvalidUser"==_4c);
}
}
}
catch(e){
}
return false;
};
window.openDemoWindow=function(){
var _4d=dojo.getObject("lconn.share.config.demoUri");
lconn.core.help.launchDemo(_4d);
};
window.openHelpWindow=function(_4e){
lconn.core.help.launchHelp(_4e);
};


}


;if(!dojo._hasResource["com.ibm.lconn.layout.track.files"]){
dojo._hasResource["com.ibm.lconn.layout.track.files"]=true;
dojo.provide("com.ibm.lconn.layout.track.files");


(function(){
var _1={getContentId:function(_2){
return this.getItemType(_2);
},getItemType:function(_3){
return "FILES";
},getExtraMetrics:function(_4){
return {contentLink:_4.app.routes.getWelcomeUrl()};
}};
var _5={"lconn.files.scenes.FilePreview":{getContentId:function(_6){
return _6.fileId;
},getItemType:function(_7){
return "FILE";
},getExtraMetrics:function(_8){
var _9=_8.document;
return {contentTitle:_9.getTitle(),contentContainerId:_9.getLibraryId(),contentCreatorId:_9.getAuthor().id,contentCreateTs:_9.getSystemCreated(),contentLink:_8.app.routes.getFileSummaryUrl(null,_9.getId())};
}},"lconn.files.scenes.FileSummary":{getContentId:function(_a){
return _a.fileId;
},getItemType:function(_b){
return "FILESUMMARY";
},getExtraMetrics:function(_c){
var _d=_c.document;
return {contentTitle:_d.getTitle(),contentContainerId:_d.getLibraryId(),contentContainerTitle:_d.getLibraryAuthor().name,contentCreatorId:_d.getAuthor().id,contentCreateTs:_d.getSystemCreated(),contentLink:_c.app.routes.getFileSummaryUrl(null,_d.getId())};
}},"lconn.files.scenes.CollectionSummary":{getContentId:function(_e){
var _f=_e.collection;
contentId=_f.getId();
return contentId;
},getItemType:function(_10){
return "FOLDER";
},getExtraMetrics:function(_11){
var _12=_11.collection;
return {contentTitle:_12.getName(),contentCreatorId:_12.getAuthor().id,contentCreateTs:_12.getSystemCreated(),contentLink:_11.app.routes.getCollectionUrl(_12.getId())};
}},"lconn.files.scenes.UserChannel":{getLibraryId:function(_13){
return _13.library?_13.library.getId():"";
},getLibraryAuthorName:function(_14){
if(_14.library){
var _15=_14.library.getOwner();
return _15?_15.name:null;
}
return null;
},getContentId:function(_16){
return this.getLibraryId(_16);
},getItemType:function(_17){
return "LIBRARY";
},getExtraMetrics:function(_18){
return {contentContainerId:this.getLibraryId(_18),contentContainerTitle:this.getLibraryAuthorName(_18),contentTitle:this.getLibraryAuthorName(_18),contentCreatorId:_18.userId,contentLink:_18.app.routes.getUserChannelUrl(_18.userId)};
}}};
com.ibm.lconn.layout.track.files.read=function(_19){
var _1a=_5[_19.sceneInfo.id];
if((typeof _1a)=="undefined"){
_1a=_1;
}else{
if(!_1a){
return;
}
}
var app=_19.app;
try{
com.ibm.lconn.layout.track.read(_1a.getContentId(_19),_1a.getItemType(_19),{source:"FILES",userId:app.getAuthenticatedUserId(),extra:_1a.getExtraMetrics(_19)});
}
catch(e){
if(dojo.config.isDebug){
console.debug(e);
}
}
};
dojo.subscribe("lconn/share/scene/begin",function(_1b,_1c,_1d,app){
if(!_1c.render){
com.ibm.lconn.layout.track.files.read(_1c);
}
});
dojo.subscribe("lconn/share/scene/render",function(_1e,el){
if(!_1e.loadListData){
com.ibm.lconn.layout.track.files.read(_1e);
}
});
dojo.subscribe("lconn/share/scene/loadListData",function(_1f){
com.ibm.lconn.layout.track.files.read(_1f);
});
})();
}


;define("dojox/validate",["./validate/_base"],function(_1){
return _1;
});


;if(!dojo._hasResource["lconn.files.lotuslive.PeopleTypeAhead"]){
dojo._hasResource["lconn.files.lotuslive.PeopleTypeAhead"]=true;
dojo.provide("lconn.files.lotuslive.PeopleTypeAhead");




dojo.declare("lconn.files.lotuslive.PeopleTypeAhead",bhc.PeopleTypeAhead,{allowEmail:false,postCreate:function(){
if(!this.downArrowNode){
this.downArrowNode=this.domNode.appendChild(dojo.create("div",{style:{display:"none"}}));
}
this.domNode.firstChild.style.height="1.5em";
if(this.focusNode&&this.domNode&&dojo.isIE){
this.focusNode.style.height="1.2em";
this.domNode.style.paddingTop="1px";
this.domNode.style.paddingBottom="0px";
this.domNode.style.paddingLeft="2px";
this.domNode.style.paddingRight="2px";
var _1=this.focusNode.parentNode.style;
_1.marginLeft="0px";
_1.paddingLeft="25px";
_1.backgroundPositionX="10px";
}
this.inherited(arguments);
},reformat:function(_2){
if(this.focusNode.value.indexOf("\n")==-1){
return;
}
this.inherited("reformat",arguments);
},onSelectOption:function(){
if(!this.noSetValueOnSelect){
this.setValue(this.store.getValue(this.item,this.valueAttr||this.searchAttr),true);
}
this._setCaretPos(this.focusNode,this.focusNode.value.length);
this.onSelect(this.item);
},_onFocus:function(_3){
this.updateHintText(null,true);
this.inherited(arguments);
},_onBlur:function(_4){
if(this.searchTimer){
clearTimeout(this.searchTimer);
}
this.inherited(arguments);
this.updateHintText();
},setValue:function(){
this.inherited(arguments);
this.updateHintText();
},updateHintText:function(_5,_6){
if(_5){
this.focusNode.title=this.hintText=_5;
}
if(this.hintText){
if(!this._focused&&(this.focusNode.value==""||!this.focusNode.hasInput)){
this.focusNode.hasInput=false;
this.focusNode.style.color="#aaa";
this.focusNode.value=this.hintText||"";
if(dijit.focus.curNode==this.focusNode){
dijit.focus.curNode.blur();
}
}else{
if(!this.focusNode.hasInput){
this.focusNode.hasInput=true;
this.focusNode.style.color="#000";
this.focusNode.value="";
if(_6){
try{
dijit.selectInputText(this.focusNode,0,0);
}
catch(e){
}
}
}
}
}
},_onKeyPress:function(_7){
var _8=_7.charOrCode;
if(_8==dojo.keys.ENTER){
this.doSelectUser();
}
this.inherited("_onKeyPress",arguments);
},doSelectUser:function(){
var hl=null;
if(this._isShowingNow){
var pw=this._popupWidget;
hl=pw&&pw.getHighlightedOption();
}
var _9=null;
if(hl){
var id=hl.id.substring(3);
if(id){
this.store.fetchItemByIdentity({identity:id,onItem:dojo.hitch(this,function(_a){
this.item=_a;
_9=[_a];
})});
}
}
if(!_9&&this.allowEmail){
var v=this.focusNode.value;
if(v&&dojox.validate.isEmailAddress(v)){
_9=[{email:v.toLowerCase()}];
}
}
if(_9){
this.onSelect.apply(this,_9);
}
}});
}


;if(!dojo._hasResource["lconn.files.lotuslive.UserSearchLotusLiveAdapter"]){
dojo._hasResource["lconn.files.lotuslive.UserSearchLotusLiveAdapter"]=true;
dojo.provide("lconn.files.lotuslive.UserSearchLotusLiveAdapter");






dojo.declare("lconn.files.lotuslive.UserSearchLotusLiveAdapter",lconn.files.widget.AbstractSearchAdapter,{constructor:function(_1){
this.url=_1;
},canCreate:function(){
return !!this.url;
},_getDefaultTypeAheadOpt:function(){
var p={captureNewContacts:false,multi:false,noSetValueOnSelect:true,url:lconn.core.url.rewrite(this.url,{users:true,internal:false,communities:false})};
return p;
},_createTypeAhead:function(_2,_3,p){
delete _3.store;
var _4=new lconn.files.lotuslive.PeopleTypeAhead(_3,_2);
_4.store=_4.newStore();
_4.textbox.className="dijitReset dijitInputInner";
_4.setInternalOnly(!p.allowExternal);
if(_3.hintText){
_4.updateHintText(_3.hintText);
}
return _4;
},getSelected:function(_5,_6){
if(_5.item){
var _7=_5.item.i;
if(_7){
var id=_7.i;
if(id&&id.indexOf("u_")==0){
id=id.substring(2);
}else{
if(id&&id.indexOf("c_")==0){
id=null;
}
}
return {id:id,name:_7.f,email:_7.e,orgId:_7.o};
}
}
if(_6&&_6[0]){
var _8=_6[0];
if(_8.email){
return {id:null,name:_8.email,email:_8.email};
}
}
return null;
},isUserGuest:function(_9){
return _9&&_9.person&&_9.person.email&&!_9.person.id;
},isExternalItem:function(_a,_b){
return this.isUserGuest(_b)||!this.isUserInSameOrg(_a,_b);
},isUserInSameOrg:function(_c,_d){
var _e=dojo.getObject("authenticatedUser.orgId",false,_c);
var _f=dojo.getObject("person.orgId",false,_d);
return (_e&&(_e==_f));
},changeTypeAheadOpts:function(_10,opt){
if(!_10||!_10.store){
return;
}
var _11={};
_11.users=opt.users==undefined?true:opt.users;
_11.contacts=true;
_11.communities=opt.communities||false;
_11.groups=opt.groups==undefined?false:opt.groups;
_11.intent=opt.internal?"internal":"external";
_11.all=false;
var url=lconn.core.url.rewrite(this.url,_11);
_10.allowEmail=!opt.internal;
if(_10.allowEmail){
_10.store=_10.allowEmailStore||(_10.allowEmailStore=_10.newStore());
}else{
_10.store=_10.disableEmailStore||(_10.disableEmailStore=_10.newStore());
}
_10.store.url=url;
},showAddButton:function(){
return true;
},doSelectUser:function(_12){
_12.doSelectUser();
}});
}


;if(!dojo._hasResource["lconn.files.lotuslive.FilesAction"]){
dojo._hasResource["lconn.files.lotuslive.FilesAction"]=true;
dojo.provide("lconn.files.lotuslive.FilesAction");






dojo.declare("lconn.files.lotuslive.FilesAction",com.ibm.social.layout.Action,{isPrimary:false,constructor:function(_1,_2){
this.app=_1;
var _3=this.escapeHtml(_2.menu_text);
var _4=this.escapeHtml(_2.window_name);
var _5=this.escapeHtml(_2.tooltip);
var _6=this.escapeHtml(_2.mime_type);
this.name=_3;
this.tooltip=_5||_3;
this.url=_2.url;
this.mimeType=lconn.core.util.text.trim(_6);
this.newWindow=(_2.new_window=="true"||_2.new_window==true);
if(this.newWindow){
this.windowName=_4;
if(this.windowName){
this.windowName=this.windowName.replace(/ /g,"_");
this.windowName=this.windowName.replace(/-/g,"_");
}
this.windowFeatures=_2.window_features;
}
},getName:function(_7){
return this.name;
},getTooltip:function(_8,_9){
return this.tooltip;
},isValid:function(_a,_b){
return this.isEnabled(_a,_b);
},isVisible:function(_c,_d){
return this.isEnabled(_c,_d);
},isEnabled:function(_e,_f){
return ""==this.mimeType||!!_e.getMimeType&&this.mimeType==_e.getMimeType();
},getUrlResource:function(_10,opt){
return null;
},sanitizeUrl:function(url){
if(!url){
return "javascript:;";
}
if(/^(javascript:|data:)/.test(url)){
return "javascript:;";
}
if(dojox.validate&&typeof dojox.validate.isUrl=="function"){
if(!dojox.validate.isUrl(url.split("?")[0])){
return "javascript:;";
}
}else{
setTimeout("sanitizeUrl(url)",300);
}
return url;
},execute:function(_11,_12){
if(!!this.url){
var id=_11.getId?_11.getId():_11.id;
var _13=this.url.replace("${file_id}",encodeURIComponent(id));
var _14=this.app.authenticatedUser;
if(!!_14){
var _15=encodeURIComponent(_14.id);
var _16=encodeURIComponent(_14.orgId);
_13=dojo.string.substitute(_13,{"user_id":_15,"subscriber_id":_15,"org_id":_16,"customer_id":_16});
}
_13=this.sanitizeUrl(_13);
if(dojo.config.isDebug){
console.debug("Lotus Live FilesAction, actual url: "+_13);
}
if(this.newWindow){
window.open(_13,this.windowName,this.windowFeatures);
}else{
window.location.href=_13;
}
}else{
if(dojo.config.isDebug){
console.debug("No action needs to be executed.");
}
}
return true;
},escapeHtml:function(str){
if(!str){
return str;
}else{
return str.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;").replace(/'/gm,"&#39;");
}
}});
}


;dojo.mixin(dojo.provide("lconn.files.lotuslive.config"),{"disableOrgPublic":[]});


;if(!dojo._hasResource["lconn.files.lotuslive.init"]){
dojo._hasResource["lconn.files.lotuslive.init"]=true;
dojo.provide("lconn.files.lotuslive.init");






















(function(){
lconn.share.config.demoUri=null;
lconn.share.config.helpUri=lconn.core.url.getServiceUrl(lconn.core.config.services.help,com.ibm.oneui.util.Url.secure).uri;
lconn.share.config.helpUri+="/index.jsp?topic=/com.ibm.cloud.files.doc/{topic}";
lconn.files.config.welcomeLink1="t_files_add_files.html";
lconn.files.config.welcomeLink2="t_files_find_files.html";
lconn.files.config.welcomeLink3="fframe.html";
lconn.share.config.services.userPhotoUri="/contacts/profiles/photoById/{uid}";
window.openHelpWindow=function(_1){
var h=Math.max(window.screen.height/4,800);
var w=Math.max(window.screen.width/4,800);
var _2="height="+h+",width="+w+",status=yes,toolbar=yes,menubar=no,location=yes,scrollbars=yes,resizable=yes";
_1=_1||dojo.getObject("lconn.share.config.helpDefaultTopic");
if(!/\.html$/.exec(_1)){
_1+=".html";
}
var _3=dojo.getObject("lconn.share.config.helpUri").replace("{topic}",_1);
var _4=document.getElementsByTagName("html")[0].getAttribute("lang");
if(!_4||dojo.string.trim(_4)==""){
if(typeof dojoLocale!="undefined"){
_4=dojoLocale;
}else{
_4="";
}
}
var _5=_4.split("-");
if(_4=="pt-br"||_4=="zh-cn"||_4=="zh-tw"){
_4=_5[0]+"_"+_5[1].toUpperCase();
}else{
_4=_5[0];
}
if(_3.indexOf("?")==-1){
_3+="?";
}else{
_3+="&";
}
_3+="lang="+_4;
window.open(_3,"helpWindow",_2).focus();
};
lconn.files.scenehelper.generateUserLink=function(_6,_7,_8,a){
a.title=dojo.isIE?"":" ";
dojo.addClass(a,"lotusPerson");
lconn.files.scenehelper.setOnClick(a,_6,_7.getUrlToUser(_8));
if(_8&&window["SemTagSvc"]){
dojo.addClass(a,"vcard");
var _9=document.createElement("span");
dojo.addClass(_9,"fn");
_9.style.display="none";
_9.appendChild(document.createTextNode(_8.name));
a.appendChild(_9);
if(lconn.share.util.text.trim(_8.email).length>0){
var _a=document.createElement("span");
_a.className="x-lconn-email";
_a.style.display="none";
_a.appendChild(document.createTextNode(_8.email));
a.appendChild(_a);
}
var _a=document.createElement("span");
_a.className="x-lconn-userid";
_a.style.display="none";
_a.appendChild(document.createTextNode(_8.id));
a.appendChild(_a);
if(dojo.getObject("SemTagSvc.onTagChanged")){
SemTagSvc.onTagChanged(a,true);
}
}
};
var _b=lconn.files.PersonalFiles.prototype;
var f=_b.start;
_b.start=function(_c){
try{
var _d=dojo.cookie("bhhashval");
if(_d){
hashVal=decodeURIComponent(_d);
dojo.cookie("bhhashval",null,{expires:-1});
var _e=lconn.core.url.parse(_c);
if(hashVal.charAt(0)=="#"){
hashVal=hashVal.substring(1);
}
_e.fragment=hashVal;
_c=lconn.core.url.write(_e);
window.location.href=_c;
}
}
catch(e){
console.log("falied to redirect user to bookmark page");
}
f.call(this,_c);
};
function _f(app){
if(_f._init){
return;
}
var _10=lconn.core.url.getServiceUrl(lconn.core.config.services.bss).uri;
var _11="/contacts";
_11=(_10?_10+"/.."+_11:_11);
app.showApplicationName=true;
var _12=_11+"/typeahead/people";
var _13;
app.getUserSearchAdapter=function(){
if(!_13){
_13=new lconn.files.lotuslive.UserSearchLotusLiveAdapter(_12);
}
return _13;
};
app.getNonce=function(_14){
var _15=dojo.cookie("token");
if(_15){
var dfd=new dojo.Deferred();
dfd.callback(_15);
dfd.addBoth(_14);
return dfd;
}
return _b.getNonce.apply(this,arguments);
};
if(app.net){
app.net.csrf={cookie:"token",header:"X-Update-Nonce",param:"csrfToken"};
}
var _16=_11+"/profiles/view/";
app.routes.getUrlToUser=function(_17){
var _18="";
if(dojo.isArray(_17)){
_18=_17[0];
}else{
_18=(typeof _17=="object"&&_17.id)?_17.id:_17;
}
return _16+encodeURIComponent(_18);
};
app.createUser=function(_19){
if(!_19){
return null;
}
_19.photoURL=null;
return _19;
};
_f._init=true;
};
lconn.core.uiextensions.when("lconn/files/app/start").addCallback(_f);
lconn.core.uiextensions.when("lconn/files/comm/ref/app/start").addCallback(_f);
function _1a(app){
var _1b=lconn.core.url.getServiceUrl(lconn.core.config.services.bss);
var _1c={"csrfToken":dojo.cookie("token"),"max-age":dojo.getObject("lconn.share.config.services.maxAge"),"etag":dojo.getObject("lconn.files.config.version"),"lang":dojo.locale};
var _1d="/extensions/getExtensions/byService/files?"+dojo.objectToQuery(_1c);
_1d=(_1b?_1b+_1d:_1d);
app.net.getJson({url:_1d,auth:{secured:false},sync:true,noStatus:true,handle:dojo.hitch(app,function(_1e,_1f){
if(_1e instanceof Error){
console.log("There was an error");
return;
}
_20(_1e);
})});
};
function _20(_21){
var _22=[];
var _23=[];
dojo.forEach(_21,function(_24){
_24["extends"]=_24["extends"]||[];
if(!dojo.isArray(_24["extends"])){
_24["extends"]=[_24["extends"]];
}
for(i=0;i<_24["extends"].length;i++){
if(_24["extends"][i]=="file_menu"){
_22.push(_24);
}else{
if(_24["extends"][i]=="new_file_menu"){
_23.push(_24);
}
}
}
});
_25("lconn/files/actions/create/new",_23);
_25("lconn/files/actions/file",_22);
_25("lconn/files/actions/comm/ref/file",_22);
_25("lconn/files/actions/comm/owned/file",_22);
};
function _25(_26,_27){
lconn.core.uiextensions.add(_26,function(_28,s,app,_29){
dojo.forEach(_27,function(_2a){
_28.push(new lconn.files.lotuslive.FilesAction(app,_2a));
});
});
};
lconn.core.uiextensions.when("lconn/files/app/start").addCallback(_1a);
lconn.core.uiextensions.when("lconn/files/comm/ref/app/start").addCallback(_1a);
})();
}


window['_js_modules']=(window['_js_modules']||[]).concat(["lconn.files.PersonalFiles"]);
