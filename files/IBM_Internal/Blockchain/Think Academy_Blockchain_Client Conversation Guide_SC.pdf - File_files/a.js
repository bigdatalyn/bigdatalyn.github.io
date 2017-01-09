
;if(!dojo._hasResource["lconn.share.require"]){
dojo._hasResource["lconn.share.require"]=true;
(function(){
dojo.provide("lconn.share.require");




var _1=dojo;
var _2=dojo.getObject("lconn.share",true);
var _3=_2.bundleDfd={};
_2.bundles={};
function _4(_5){
var d=document;
var _6=d.getElementsByTagName("head")[0];
var s=d.createElement("script");
s.type="text/javascript";
s.src=_5;
if(dojo.isIE){
setTimeout(function(){
_6.appendChild(s);
},0);
}else{
_6.appendChild(s);
}
};
function _7(s){
var _8=_3[s];
if(!_8){
_8=_3[s]=new dojo.Deferred();
}
_8.modules=_8.modules||{};
_8.ready=true;
_8.callback(dojo.getObject(s));
for(var _9 in _8.modules){
if(!dojo.exists(_9)){
console.error("The module '"+_9+"' was missing from an async require of module '"+s+"'");
}
}
};
dojo.subscribe("lconn/share/require/available",_7);
_2.require=function(s,b){
var e=dojo.getObject(s);
if(e){
return e;
}
if(!b){
b=_2.bundles[s];
}
if(b){
if(dojo.isArray(b)){
for(var i=0,l=b.length;i<l;i++){
_1.require(b[i],true);
}
}else{
_1.require(b,true);
}
e=dojo.getObject(s);
if(e){
return e;
}
}
_1.require(s);
return dojo.getObject(s);
};
_2.requireAsync=function(b,_a,_b){
var _c=new dojo.Deferred();
net.jazz.ajax.xdloader.load_async(b,dojo.hitch(_c,"callback",{}),_b);
return _c;
};
_2.whenRequired=function(b){
var _d=_3[b];
if(!_d){
_d=_3[b]=new dojo.Deferred();
}
return _d;
};
})();
}

if(typeof define!=="undefined"&&typeof define._packages!=="undefined")define._packages["lconn.files"]=true;

;if(!dojo._hasResource["lconn.files.routes"]){
dojo._hasResource["lconn.files.routes"]=true;
dojo.provide("lconn.files.routes");


lconn.files.routes={decode:function(_1,_2){
var _3={};
_3.parameters=_2.queryParameters;
delete _3.parameters.lang;
var _4="lconn.files.scenes.FullScreenPageEdit";
var _5=lconn.files.routes;
var f=_5.executeRegex;
var r=[];
if(f(_5._PERSONAL_HOME,_1,r)){
_3.userId=decodeURIComponent(r[1]);
var _6=r[3];
if(f(_5._FILE_SUBPATH,_6,r)){
_3.id=_3.parameters.edit?_4:"lconn.files.scenes.FileSummary";
var _7=r[1];
_3.fileId=_7;
}else{
if(f(_5._FILENAME_SUBPATH,_6,r)){
_3.id=_3.parameters.edit?_4:"lconn.files.scenes.FileSummary";
var _7=r[1];
_3.fileName=_7;
}else{
if(f(_5._CREATE_SUBPATH,_6,r)){
_3.id="lconn.files.scenes.FullScreenPageCreate";
}else{
_3.id="lconn.files.scenes.UserChannel";
}
}
}
}else{
if(f(_5._FILE,_1,r)){
_3.id=_3.parameters.edit?_4:"lconn.files.scenes.FileSummary";
var _7=r[1];
_3.fileId=_7;
if(lconn.core.config.features("fileviewer-detailspage")){
_3.id="lconn.files.scenes.HomeGlobal";
_3.showViewer=true;
}
}else{
if(f(_5._USER_SHARES,_1,r)){
_3.id="lconn.files.scenes.UserShares";
}else{
if(f(_5._COLLECTIONS,_1,r)){
_3.id="lconn.files.scenes.Collections";
_3.pivot=r[3];
}else{
if(f(_5._COLLECTION,_1,r)){
_3.id="lconn.files.scenes.CollectionSummary";
_3.collectionId=r[2];
}else{
if(f(_5._PUBLIC_FILES,_1,r)){
_3.id="lconn.files.scenes.PublicFiles";
}else{
if(f(_5._COMMUNITY_FILES,_1,r)){
_3.id="lconn.files.scenes.CommunityFilesSearch";
}else{
if(f(_5._FILES_SEARCH,_1,r)){
_3.id="lconn.files.scenes.FilesSearch";
}else{
if(f(_5._PERSONAL_FILES,_1,r)){
_3.id="lconn.files.scenes.UserChannel";
}else{
if(f(_5._FAVORITE_FILES,_1,r)){
_3.id="lconn.files.scenes.FavoriteFiles";
}else{
if(f(_5._SYNCABLE_FILES,_1,r)){
_3.id="lconn.files.scenes.FileSync";
}else{
if(f(_5._TRASH,_1,r)){
_3.id="lconn.files.scenes.DeletedFiles";
var _6=r[2];
if(_6){
_3.userId=_6;
}
}else{
if(f(_5._USER_SEARCH,_1,r)){
_3.id="lconn.files.scenes.UserSearch";
}else{
if(f(_5._ABOUT_HOME,_1,r)){
_3.id="lconn.files.scenes.About";
}else{
if(f(_5._STATISTICS_HOME,_1,r)){
_3.id="lconn.files.scenes.Statistics";
}else{
if(f(_5._TOOLBOX_HOME,_1,r)){
_3.id="lconn.files.scenes.Toolbox";
}else{
if(f(_5._INVITE_RETURN,_1,r)){
_3.id="lconn.files.scenes.InviteReturnScene";
_3.action=r[1];
}else{
_3.id="lconn.files.scenes.HomeGlobal";
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
}
}
}
}
}
}
return _3;
},isProtectedUri:function(_8,_9){
var _a=lconn.files.routes;
var f=_a.executeRegex;
var r=[];
if(f(_a._USER_SHARES,_8,r)){
return true;
}else{
if(f(_a._COLLECTIONS,_8,r)){
var _b=r[3];
return (_b&&_b!="public");
}else{
if(f(_a._PERSONAL_FILES,_8,r)){
return true;
}else{
if(f(_a._FAVORITE_FILES,_8,r)){
return true;
}else{
if(f(_a._SYNCABLE_FILES,_8,r)){
return true;
}else{
if(f(_a._TRASH,_8,r)){
return true;
}
}
}
}
}
}
return false;
},executeRegex:function(_c,_d,_e){
_e.splice(0,_e.length);
var r=_c.exec(_d);
if(r){
for(var i=0,l=r.length;i<l;i++){
_e.push(r[i]);
}
return true;
}
return false;
},_HOME:/^(app)?[\/]?$/,_PUBLIC_FILES:/^app\/public[\/]?$/,_COMMUNITY_FILES:/^app\/communityfiles[\/]?$/,_FILES_SEARCH:/^app\/search[\/]?$/,_PERSONAL_FILES:/^app\/personal[\/]?$/,_PERSONAL_HOME:/^app\/person\/([^\/]+)(\/(.+))?/,_FAVORITE_FILES:/^app\/pinnedfiles[\/]?$/,_SYNCABLE_FILES:/^app\/filesync[\/]?$/,_USER_SHARES:/^app\/shares[\/]?$/,_TRASH:/^app\/trash(\/([^\/]+))?/,_COLLECTIONS:/^app\/(collections|folders)(\/([^\/]+)?)?$/,_COLLECTION:/^app\/(collection|folder)\/([^\/]+)(\/(.+))?/,_USER_SEARCH:/^app\/people[\/]?$/,_ABOUT_HOME:/^app\/about[\/]?$/,_TOOLBOX_HOME:/^app\/toolbox[\/]?$/,_STATISTICS_HOME:/^app\/statistics[\/]?$/,_FILE:/^app\/file\/(.+)/,_PAGE:/^app\/page\/(.+)/,_INVITE_RETURN:/^app\/invited\/([^\/]+)[\/]?$/,_CREATE_SUBPATH:/^create\/richtext/,_SEARCH_SUBPATH:/^search\/(.+)/,_HOMEPAGE_SUBPATH:/^home?/,_FILES_SUBPATH:/^files?/,_FILE_SUBPATH:/^file\/(.+)/,_FILENAME_SUBPATH:/^filename\/(.+)/};
}


;if(!dojo._hasResource["lconn.share.util.urifragment"]){
dojo._hasResource["lconn.share.util.urifragment"]=true;
dojo.provide("lconn.share.util.urifragment");


lconn.share.util.urifragment={toAnchorForm:function(_1,_2,_3){
var _4=_1.path;
if(_4){
if(_4.indexOf(_2)==0){
var p={};
var _5=_4.substring(_2.length);
var _6=dojo.clone(_1);
if(_6.queryParameters){
var q=_6.queryParameters;
if(_3){
for(var _7 in _3){
p[_7]=q[_7]||_3[_7];
delete q[_7];
}
}
_5+=lconn.share.util.uri.writeParameters(q);
}else{
for(var _7 in _3){
p[_7]=_3[_7];
}
}
_6.path=_2;
_6.fragment=(_5.length>0)?_5:"/";
_6.queryParameters=p;
_6.query=null;
_1=_6;
}
}
return _1;
},fromAnchorForm:function(_8,_9){
if(!_8){
return _8;
}
var _a=_8.path;
if(_8.fragment&&_a){
if(_a==_9){
var _b=_8.fragment;
var _c=dojo.clone(_8);
var p=_c.queryParameters;
_c.queryParameters=null;
_c.query=null;
_c.fragment=null;
_c.path=_a+_b;
var _d=lconn.share.util.uri.writeUri(_c);
var _e=new dojo._Url(_d);
dojo.mixin(p,lconn.share.util.uri.splitQuery(_e.query));
_e.queryParameters=p;
_e.query=null;
_8=_e;
}
}
return _8;
}};
}


;if(!dojo._hasResource["lconn.share.AbstractApp"]){
dojo._hasResource["lconn.share.AbstractApp"]=true;
dojo.provide("lconn.share.AbstractApp");


dojo.declare("lconn.share.AbstractApp",null,{loadRecursion:0,_busy:0,constructor:function constructor(){
},destroy:function(){
lconn.share.util.misc.destroy(this.globalActions);
this.globalActions=null;
},onApplicationStart:function(){
dojo.publish("lconn/share/app/start",[this]);
},getAuthenticatedUser:function(){
return this.authenticatedUser;
},getAuthenticatedUserId:function(){
return this.authenticatedUser?this.authenticatedUser.id:null;
},isAuthenticated:function(){
var u=this.authenticatedUser;
return (u&&typeof u!="undefined");
},_handleCheckAuth:function(_1,_2,_3){
_3=_3||{};
dojo.setObject("args.auth.preventReload",true,_3);
if(this.auth.isAuthenticationRequired(_2,_3)){
this.onAuthenticationRequestDetected(_2,_3,null);
_1(false,_3);
}else{
if(_2 instanceof Error){
_1(_2,_3);
}else{
var _4=this.createUser(_2.items[0]);
_4.permissions=new lconn.share.bean.StreamPermissions({authenticatedId:_4.id,guest:_4.isGuest,orgId:_4.orgId});
var _5=(_4&&typeof _4=="object"&&this.authenticatedUser&&this.authenticatedUser.id==_4.id);
if(_5){
this.authenticatedUser=_4;
}else{
this.onAuthenticationRequestDetected(_2,_3,null);
}
_1(_5,_3);
}
}
},checkAuthentication:function(_6){
var v={};
var _7=this.net.getJson({url:this.routes.getUserInfoServiceUrl(),auth:{secured:false},handle:dojo.hitch(this,"_handleCheckAuth",_6),noStatus:true});
return _7;
},getNonce:function(_8){
var _9=this;
return this.checkAuthentication(function(_a,_b){
if(_a instanceof Error){
_8(_a,_b);
}else{
if(_a==false){
var _c=new Error("unauthenticated");
_c.code="unauthenticated";
_8(_c,_b);
}else{
_8(_9.authenticatedUser.nonce,_b);
}
}
});
},createUser:function(_d){
if(!_d){
return null;
}
if(!_d.photoURL){
_d.photoURL=this.routes.getUserPhotoUrl(_d);
}
return _d;
},_load:function(_e){
if(this.sceneAvailable){
this._pageLoaded=true;
}
this.sceneAvailable=false;
if(this.loadRecursion>10){
this.loadRecursion=0;
throw "Scenes have recursed "+this.loadRecursion+" times, url is "+_e;
}
try{
this.working();
var _f=this._decodeState(_e);
if(_f instanceof dojo.Deferred){
_f.addCallback(this,"_preLoadFinal").addErrback(this,"showError");
}else{
this._preLoadFinal(_f);
}
}
catch(e){
if(!e._handled){
console.error(e);
this.showError(e);
}
if(dojo.isIE){
throw e;
}
}
},_shouldSkipLoad:function(_10){
if(!lconn.core.config.features("fileviewer-detailspage")||!this._pageLoaded){
return false;
}
return _10.showViewer;
},_preLoadFinal:function(_11){
this._skipLoad=this._shouldSkipLoad(_11);
var _12;
if(_11.showViewer){
_12=this.showViewer(_11.fileId);
}
if(!this._skipLoad){
if(_12){
_12.always(dojo.hitch(this,this._loadFinal,_11));
}else{
this._loadFinal(_11);
}
}else{
this.sceneAvailable=true;
this.loadRecursion=0;
this.idle();
}
},showViewer:function(_13){
var _14;
var _15=dojo.getObject("ic-share.fileviewer.ConnectionsFileViewer");
if(_15){
_14=_15.openFromId(_13,{showErrorInOverlay:false}).then(null,dojo.hitch(this,function(_16){
if(this.messages){
setTimeout(dojo.hitch(this,function(){
this.messages.add({error:true,message:_16.userMessage});
}),0);
}
}));
}else{
_14=new dojo.Deferred();
_14.reject();
}
return _14;
},getUrl:function(opt){
var uri=window.location.href||this.urlState;
if(opt&&opt.appRelative){
var uri=this.resolveUri(uri);
var _17=this.routes._comPath?this.routes.getBaseCommPath():this.routes.getBasePath();
if(uri.path.indexOf(_17)==0){
uri=new com.ibm.oneui.util.Url(uri);
uri.path=uri.path.substring(_17.length);
uri.scheme=uri.authority=null;
uri=uri.toString();
}
}
return uri;
},resolveUri:function(url){
var uri;
if(typeof url=="string"){
uri=lconn.share.util.uri.parseUri(url);
uri=this.fromAnchorForm(uri);
}else{
if(url instanceof dojo._Url){
uri=url;
}else{
throw "resolveUri requires a string or dojo._Url";
}
}
return uri;
},toAnchorForm:function(uri){
return lconn.share.util.urifragment.toAnchorForm(uri,this.routes.getAppPath(),this.baseParams);
},fromAnchorForm:function(uri){
return lconn.share.util.urifragment.fromAnchorForm(uri,this.routes.getAppPath());
},_loadFinal:function(_18){
try{
if(this.scene&&this.scene.refresh){
this.loadRecursion++;
if(this.scene.refresh(_18)){
this.loadRecursion=0;
this.sceneAvailable=true;
return;
}
}
var id=_18.id;
if(!id){
throw "No scene identifier from _decodeState()";
}
var dj=dojo;
dj.require(id);
var _19=dojo.getObject(id);
if(!id){
throw "No object defined for '"+id+"'";
}
var _1a=new _19(this,_18);
var _1b=this.scene;
this._endScene(_1a);
this.onBeforeSceneChange(_1b,_1a);
dojo.publish("lconn/share/scene/begin",[id,_1a,_18,this]);
this.scene=_1a;
var _1c=_1a.begin(_1b);
if(typeof _1c=="string"){
_1c={url:_1c};
}
if(_1c){
if(!_1c.url){
throw "Must return a URL for the next state";
}
if(_1c.redirect){
this.loadRecursion=0;
this.hasScene=this.sceneAvailable=true;
this.navigate(_1c.url,{replace:true});
}else{
this.loadRecursion++;
var uri=this.resolveUri(_1c.url);
this._load(uri);
}
return;
}
this.loadRecursion=0;
this.hasScene=this.sceneAvailable=true;
}
catch(e){
try{
e._handled=true;
}
catch(e1){
}
console.error(e);
this.showError(e);
if(dojo.isIE){
throw e;
}
}
finally{
this.idle();
}
},_endScene:function(arg){
var s=this.scene;
if(s&&s.end){
try{
s.end(arg);
}
catch(e){
console.error(e);
}
this.scene=null;
}
},onBeforeSceneChange:function(_1d,_1e){
},JS_HREF:/^javascript:/,onClick:function(e){
if(e.target){
var t=e.target;
var nn=t.nodeName.toLowerCase();
if("input"==nn||"select"==nn||"option"==nn){
return;
}
if("a"!=nn){
do{
t=t.parentNode;
if(!t||t._nolink){
t=e.target.parentNode;
while(t&&!t._nolink){
t._nolink=true;
t=t.parentNode;
}
return;
}
}while(t.nodeName.toLowerCase()!="a");
}
if(dojo.hasClass(t,"lconnDownloadable")){
if(dojo.isIE&&this.history){
this.history.resetHash();
}
}else{
if(dojo.attr(t,"topic")){
dojo.publish(dojo.attr(t,"topic"),[t,e]);
}else{
if(t.href&&t.href.indexOf(this.uriApp)!=-1&&!t.ignore&&!this.JS_HREF.exec(t.href)){
var uri;
try{
uri=lconn.share.util.uri.parseUri(t.href);
}
catch(e){
}
if(uri&&uri.path&&uri.path.indexOf(this.uriApp)==0){
dojo.stopEvent(e);
this.navigate(t.href);
return;
}
}
}
}
}
},find:function(){
var _1f;
var _20=this.scene;
if(_20&&_20.find){
var f=_20.find;
_1f=f.apply(_20,arguments);
}
if(!_1f){
_1f=this._find.apply(this,arguments);
}
return _1f;
},_find:function(){
},getGlobalActions:function(){
if(!this.globalActions){
this.initGlobalActions();
}
return this.globalActions;
},initGlobalActions:function(){
this.globalActions=[];
},working:function(_21){
if(this._busy++>=0){
if(this.hasScene){
this.showWorking(_21);
}
}
},idle:function(_22){
if(--this._busy<1||_22==true){
this._busy=0;
this.showIdle();
}
},showWorking:function(_23){
},showIdle:function(){
},activateHelp:function(){
},showLoading:function(){
},showAuthenticationError:function(e){
},showError:function(e){
}});
}


;if(!dojo._hasResource["lconn.share.util.history"]){
dojo._hasResource["lconn.share.util.history"]=true;
dojo.provide("lconn.share.util.history");


lconn.share.util.history={_getHash:function(){
return window.location.hash;
},_resetHashTimeout:null,resetHash:function(_1,_2){
if(this._resetHashTimeout){
window.clearTimeout(this._resetHashTimeout);
this._resetHashTimeout=null;
}
if(_2){
window.location.hash=lconn.share.util.history._getHash();
}
_1=_1||[2,5,5,5];
var _3=_1.shift();
if(_3>0){
this._resetHashTimeout=window.setTimeout(function(){
lconn.share.util.history.resetHash(_1,true);
},_3*1000);
}
},init:function(){
if(this.inited){
return;
}
this.inited=true;
if(dojo.isIE){
var _4=dojo.body();
var d=_4.ownerDocument;
var _5=d.getElementById("history");
if(_5){
_5.attachEvent("onload",dojo.hitch(lconn.share.util.history,lconn.share.util.history.onload,_5));
if(_5._ready){
this.setFirstState(_5);
}
}else{
var _6="javascript:''";
if(dojo.isIE<9){
_5=document.createElement("<iframe onload=\"lconn.share.util.history.onload(this);\" style=\"border:0;width:1px;height:1px;position:absolute;visibility:hidden;bottom:0;right:0;\" name=\"history\" id=\"history\" src=\""+_6+"\">");
_5.name=_5.id="history";
_4.appendChild(_5);
}else{
_5=dojo.create("iframe",{style:"border:0;width:1px;height:1px;position:absolute;visibility:hidden;bottom:0;right:0;",name:"history",id:"history",src:_6},dojo.body());
dojo.connect(_5,"onload",dojo.hitch(this,this.onload,_5));
}
}
}else{
var _7=this.pending;
if(_7){
this.pending=null;
setTimeout(function(){
lconn.share.util.history.add(_7);
},0);
}
}
this.start();
dojo.connect(window,"onunload",this,"stop");
},setFirstState:function(_8){
_8._init=true;
try{
_8.writingState=true;
var _9=_8.contentWindow.document;
_9.open();
_9.write("<html><head><title>"+document.title+"</title></head><body><div id=\"state\">"+this._getHash()+"</div></body></html>");
_9.close();
}
catch(e){
console.log("unable to write the original state to the history iframe");
}
},onload:function(){
if(!this.inited){
console.log("history.js not initialized");
return;
}
var _a=document.getElementById("history");
if(_a.writingState){
_a.writingState=false;
var _b=this.pending;
if(_b){
this.pending=null;
setTimeout(function(){
lconn.share.util.history.add(_b);
},0);
}
return;
}
if(!_a._init){
setTimeout(function(){
lconn.share.util.history.setFirstState(_a);
},0);
return;
}
var _c=_a.contentWindow;
var _d=_c.document;
var _e=_d.getElementById("state");
if(_e){
this._trackHash=window.location.hash=_e.innerText;
var _f=dojo.getObject("ic-share.fileviewer.FileViewer.shouldIgnoreUrlChange");
if(_f&&_f()){
return;
}
this.onchange(window.location.href);
}
},add:function(url,_10,_11){
if(!this.inited){
this.pending=url;
this.init();
return;
}
var _12=!!(_11&&window.history.pushState);
var _13=!lconn.share.util.history.isUrlEqual(url,window.location.href)&&!_12;
if(_10){
if(_12){
window.history.replaceState(_11,null,url);
}else{
window.location.replace(url);
}
}else{
if(_12){
window.history.pushState(_11,null,url);
}else{
window.location.href=url;
}
}
if(dojo.isIE&&!_10){
var _14=document.getElementById("history");
if(_14){
_14.writingState=true;
var _15=_14.contentWindow.document;
_15.title=document.title;
_15.open();
_15.write("<html><head><title></title></head><body><div id=\"state\">"+this._getHash()+"</div></body></html>");
_15.close();
}else{
alert("history.js not initialized");
}
}
this.start();
if(!_13){
this.onchange(url);
}
},reload:function(url){
lconn.share.util.history.stop();
window.location.assign(url);
window.location.reload(false);
},isUrlEqual:function(a,b){
var a=lconn.share.util.uri.parseUri(a);
var b=lconn.share.util.uri.parseUri(b);
return ((a.scheme==null||b.scheme==null||a.scheme==b.scheme)&&(a.host==null||b.host==null||a.host==b.host)&&a.path==b.path&&a.query==b.query);
},start:function(){
if(!this.inited){
console.log("history.js not initialized");
return;
}
if(!this.urlTracker){
this._trackHash=this._getHash();
this._trackCallback=dojo.hitch(this,this.checkUrl);
this._trackTimeout=setInterval(this._trackCallback,75);
}
},stop:function(){
if(!this.inited){
console.log("history.js not initialized");
return;
}
if(this._trackTimeout){
clearInterval(this._trackTimeout);
}
this._trackTimeout=null;
},checkUrl:function(){
if(!this.inited){
console.log("history.js not initialized");
return;
}
var _16=this._getHash();
if(_16!=this._trackHash){
this._trackHash=_16;
var _17=dojo.getObject("ic-share.fileviewer.FileViewer.shouldIgnoreUrlChange");
if(_17&&_17()){
return;
}
this.onchange(window.location.href);
}
},onchange:function(url){
}};
}


;if(!dojo._hasResource["lconn.share.util.misc"]){
dojo._hasResource["lconn.share.util.misc"]=true;
dojo.provide("lconn.share.util.misc");


dojo.j=dojo.getObject("Jiffy")||{mark:function(){
},measure:function(){
}};
lconn.share.util.misc={indexById:function(_1,_2,_3){
if(_1){
for(var i=0;i<_1.length;i++){
if(_1[i]&&_1[i][_2]==_3){
return _1[i];
}
}
}
},initFromArray:function(_4,a,b,c,d,e,f,g){
if(_4==null){
return null;
}
var _5=typeof _4;
if(_5=="function"){
return _4(a,b,c,d,e,f,g);
}
var _6=[];
if(dojo.isArray(_4)){
for(var i=0;i<_4.length;i++){
var o=_4[i];
var _5=typeof o;
if(_5=="function"){
_6[i]=o(a,b,c,d,e,f,g);
}
if(_5=="string"){
_6[i]=new dojo.getObject(o)(a,b,c,d,e,f,g);
}
}
}
return _6;
},sort:function(_7){
if(!dojo.isArray(_7)||_7.length<2){
return _7;
}
if(arguments.length==1){
return _7.sort();
}
var _8=arguments;
var _9=[];
for(var i=1;i<_8.length;i++){
var _a=_8[i];
var _b=1;
if(dojo.isArray(_a)){
_b=_a[1];
_a=_a[0];
}
var f=(typeof _7[0][_a]=="string"&&"".localeCompare)?lconn.share.util.misc.orderLocale:lconn.share.util.misc.order;
_9.push(dojo.partial(f,_a,_b));
}
if(_9.length==1){
return _7.sort(_9[0]);
}
return _7.sort(function(a,b){
var l=_9.length;
for(var i=0;i<l;i++){
var c=_9[i](a,b);
if(c!=0){
return c;
}
}
return 0;
});
},slice:function(_c,f,_d){
var _e=[];
for(var i=0;i<_c.length;){
var _f=_c[i];
if(f.call(_d,_f)){
_e.push(_f);
_c.splice(i,1);
}else{
i++;
}
}
return _e;
},hitchDeferred:function(dfd){
return function(_10){
dfd.callback.apply(dfd,arguments);
return _10;
};
},orderLocale:function(key,_11,a,b){
return a[key].localeCompare(b[key])*_11;
},order:function(key,_12,a,b){
a=a[key];
b=b[key];
if(a==b){
return 0;
}
return (a>b?1:-1)*_12;
},destroy:function(){
if(arguments.length>1){
for(var i=0;i<arguments.length;i++){
lconn.share.util.misc.destroy(arguments[i]);
}
}else{
if(arguments.length==1){
var arg=arguments[0];
if(arg&&typeof arg=="object"&&arg.length>0){
for(var i=0;i<arg.length;i++){
lconn.share.util.misc.destroy(arg[i]);
}
}else{
var w=arg;
if(typeof w=="string"){
w=dijit.byId(w);
}
if(w){
if(w.destroyRecursive){
w.destroyRecursive();
}else{
if(w.destroy){
w.destroy();
}
}
}
}
}
}
},first:function(o){
return (o&&dojo.isArrayLike(o))?o[0]:o;
},last:function(o){
return (o&&dojo.isArrayLike(o))?o[o.length-1]:o;
},size:function(o){
var c=0;
if(o){
for(var i in o){
c++;
}
}
return c;
},date:{convertAtomDate:dojo.date.stamp.fromISOString},hasListeners:function(f){
return (f._listeners&&dojo.some(f._listeners,function(l){
return l;
}));
},animateBackground:function(p,_13,end){
var n=p.node;
var pr=p.properties=p.properties||{};
pr.backgroundColor={start:_13,defEnd:end,end:function(){
var bg=dojo.getComputedStyle(n).backgroundColor;
if(bg=="rgba(0, 0, 0, 0)"||"transparent"){
bg="rgba(255, 255, 255, 0)";
}
return bg||this.defEnd;
}};
p.onEnd=function(){
dojo.byId(n).style.backgroundColor="";
};
return p;
}};
}


;if(!dojo._hasResource["lconn.share.FullScreenApp"]){
dojo._hasResource["lconn.share.FullScreenApp"]=true;
dojo.provide("lconn.share.FullScreenApp");


















dojo.declare("lconn.share.FullScreenApp",[lconn.share.AbstractApp],{init:function(_1){
var _2=this.language=dojo.getObject("lconn.share.config.formattingLanguageParam")||dojo.getObject("djConfig.locale")||"en";
this.baseParams={};
this.globalUrlParams={};
this.document=this.d=_1;
var _3=this.routes=this.initRoutes(_2,this.globalUrlParams);
_3.getAuthenticatedUser=dojo.hitch(this,this.getAuthenticatedUser);
this.uriApp=_3.getAppPath();
this.prefs=this.initPreferences();
var _4=lconn.core.config.features;
dojo.connect(dojo.doc.documentElement,"onclick",this,"onClick");
this.history=lconn.share.util.history;
dojo.connect(this.history,"onchange",this,"load");
return true;
},start:function(_5){
this.onApplicationStart();
if(this.history){
this.history.init();
}
try{
this.authenticatedUser=this.initAuthentication();
}
catch(e){
this.showAuthenticationError(e);
return;
}
var _6=this.resolveUri(_5);
if(!this.authenticatedUser&&this.isProtectedUri(_6)){
this.login(_6.toCanonicalString(),{redirect:true});
return;
}
var _7=lconn.share.util.misc.first(_6.queryParameters.debug);
if(_7){
this.baseParams.debug=_7;
}
var _8=lconn.share.util.misc.first(_6.queryParameters.lang);
if(_8){
this.baseParams.lang=_8;
}
this.load(_6);
},initAuthentication:function(){
return this._loadAuthentication();
},login:function(s,_9){
var e=lconn.share.util.misc.last(arguments);
if(lconn.share.util.html.isEvent(e)){
dojo.stopEvent(e);
}
if(this.scene&&this.scene.onlogin&&this.scene.onlogin()){
return;
}
s=s||this.getUrl();
var f=dojo.getObject("lconn.share.config.services.login");
if(f){
dojo.hitch(this,f)(s);
}else{
var _a=this.routes.getLoginUrl(typeof s=="string"?s:this.getUrl());
if(_9&&_9.redirect){
window.location.replace(_a);
}else{
window.location.href=_a;
}
}
},checkLogout:function(e){
if(this.scene&&this.scene.onlogout&&this.scene.onlogout()){
dojo.stopEvent(e);
}
},logout:function(s){
var e=lconn.share.util.misc.last(arguments);
if(lconn.share.util.html.isEvent(e)){
dojo.stopEvent(e);
}
if(this.scene&&this.scene.onlogout&&this.scene.onlogout()){
return;
}
var f=dojo.getObject("lconn.share.config.services.logout");
if(f){
dojo.hitch(this,f)(s);
}else{
var _b=this.routes.getLogoutUrl((typeof s=="string")?s:null);
window.location.href=_b;
}
},onLogin:function(){
var _c=this.authenticatedUser;
try{
this.authenticatedUser=this._loadAuthentication();
}
catch(e){
this.showAuthenticationError(e);
return;
}
var _d=this.authenticatedUser;
if(!_d){
console.log("App::onLogin DEBUG got notified of authentication, but somehow failed");
this.onUserReset.apply(this,arguments);
}else{
if(_c){
if(_c.id!=_d.id){
console.log("App::onLogin DEBUG authenticated user has changed, return to welcome page");
this.onUserReset.apply(this,arguments);
}else{
console.log("App::onLogin DEBUG authenticated user is same as old user, no action necessary");
this.onUserReauthenticated.apply(this,arguments);
}
}else{
console.log("App::onLogin DEBUG authenticated user has changed, not authenticated before");
this.onUserLogin.apply(this,arguments);
}
}
},onLoginError:function(){
console.log("App::onLogin DEBUG authentication error");
},onUserLogin:function(){
},onUserReauthenticated:function(){
},onUserReset:function(){
},waitingForLogin:function(){
return this._waitingForLogin;
},navigate:function(_e,_f){
if(this.scene&&this.scene.onnavigate&&this.scene.onnavigate(_e)){
return;
}
this.history.stop();
var uri=this.resolveUri(_e);
var _10=this.toAnchorForm(uri);
_e=_10.toCanonicalString();
var _11=null;
var _12=new dojo._Url(window.location.href);
if(_12.path!==this.uriApp){
_11={};
}
if(_f&&_f.forceReload){
this.showLoading();
this.history.reload(_e);
}else{
this.history.add(_e,_f?_f.replace:false,_11);
}
},load:function(url){
var uri=this.resolveUri(url);
var _13=uri.toCanonicalString();
if(!this.authenticatedUser&&this.isProtectedUri(uri)){
this.login(_13,{redirect:true});
return;
}
this.urlState=_13;
this._load(uri);
},_load:function(){
return this.inherited(arguments);
},reload:function(){
this.load(this.getUrl());
},isProtectedUri:function(uri){
return false;
}});
lconn.share.FullScreenApp.onload=function onload(_14,app){
if(_14["pe"]){
return;
}
var dj=_14["dojo"];
if(!app){
throw "Unable to find an application to load";
}
try{
dj.require(app);
var _15=dj.getObject(app);
var app=new _15();
if(!_14["pe"]){
_14.pe=app;
}
if(!app.init(document)){
return;
}
setTimeout(function(){
app.start(_14.location.href);
},0);
}
catch(e){
console.log("unable to load application");
throw e;
}
};
}


;if(!dojo._hasResource["lconn.share.scenes.AbstractScene"]){
dojo._hasResource["lconn.share.scenes.AbstractScene"]=true;
dojo.provide("lconn.share.scenes.AbstractScene");


dojo.declare("lconn.share.scenes.AbstractScene",null,{constructor:function constructor(_1,_2){
this.app=_1;
this.sceneInfo=_2;
},end:function(){
var _3=dojo.exists("app.layout.titleBar",this)?this.app.layout.titleBar:null;
if(_3){
_3.resetSceneHeader();
}
dojo.forEach(this._connects||[],function(_4){
dojo.forEach(_4,dojo.disconnect);
});
dojo.forEach(this._subs||[],dojo.unsubscribe);
dojo.forEach(this._refs||[],lconn.share.util.misc.destroy);
},isCurrentScene:function(){
return this.app&&this.app.scene==this;
},connect:function(_5,_6,_7,_8,_9){
if(!this._connects){
this._connects=[];
}
this._connects.push(dojo.connect(_5,_6,_7,_8,_9));
},subscribe:function(e,f){
if(!this._subs){
this._subs=[];
}
this._subs.push(dojo.subscribe(e,this,f));
},ref:function(){
if(!this._refs){
this._refs=[];
}
this._refs.push(dojo._toArray(arguments));
return arguments[0];
},onActionSuccess:function(e){
this.app.messages.add(e.messages);
},onKeypress:function(e){
var _a=this.globalActions;
if(_a){
for(var i=0;i<_a.length;i++){
var _b=_a[i];
if(_b.keyboardShortcut==e.keyChar&&_b.isValid(this.authenticatedUser,{})){
_b.execute(this.authenticatedUser,{});
return;
}
}
}
},onComplete:function(_c){
if(!this.completed){
this.completed={};
}
this.completed[_c||"scene"]=true;
}});
}


;if(!dojo._hasResource["lconn.files.scenes.HomeGlobal"]){
dojo._hasResource["lconn.files.scenes.HomeGlobal"]=true;
dojo.provide("lconn.files.scenes.HomeGlobal");


dojo.declare("lconn.files.scenes.HomeGlobal",[lconn.share.scenes.AbstractScene],{constructor:function(_1,_2){
this.app=_1;
},begin:function(_3){
return (this.app.authenticatedUser)?this.app.routes.getPersonalUserChannelUrl():this.app.routes.getPublicFilesUrl();
}});
}


;if(!dojo._hasResource["lconn.core.uiextensions"]){
dojo._hasResource["lconn.core.uiextensions"]=true;
dojo.provide("lconn.core.uiextensions");


if(!window.lc_ui_extensionsContainer){
window.lc_ui_extensionsContainer={};
}
lconn.core.uiextensions={invokeExtesions:function(_1){
return lconn.core.uiextensions.invokeExtensions(_1);
},get:function(_2){
if(window.lc_ui_extensionsContainer==null){
console.log("lconn.core.uiextensions.invokeExtensions: lc_ui_extensionsContainer is not defined. plugin taglib must be missing.");
return [];
}
return window.lc_ui_extensionsContainer[_2];
},when:function(_3,_4){
var c=window.lc_ui_extensionsWhen;
if(!c){
c=window.lc_ui_extensionsWhen={};
}
var _5=c[_3];
if(!_5){
_5=c[_3]=new dojo.Deferred();
}
if(_5.fired==-1&&typeof _4!="undefined"){
try{
_5.callback(_4);
}
catch(e){
console.error(e);
}
}
return _5;
},add:function(_6,_7){
var c=window.lc_ui_extensionsContainer;
if(!c){
c=window.lc_ui_extensionsContainer={};
}
var _8=c[_6];
if(!_8){
_8=c[_6]=[];
}
_8.push(_7);
},invokeExtensions:function(_9){
if(window.lc_ui_extensionsContainer==null){
console.log("lconn.core.uiextensions.invokeExtensions: lc_ui_extensionsContainer is not defined. plugin taglib must be missing.");
return;
}
var _a=window.lc_ui_extensionsContainer[_9];
for(var i=0;_a!=null&&i<_a.length;i++){
var _b=_a[i].script;
var _c=_a[i].callbackText;
if(_c==null||_c==""){
continue;
}
var _d=function(){
if(_b!=null){
lconn.core.utilities.loadScript(_b);
}
var _e=function(){
eval(_c+"();");
};
lconn.core.utilities.processUntilAvailable(_e,"lconn.core.utilities.isDefined('"+_c+"')");
};
var _f=_a[i].invokeDelay;
if(_f!=null&&_f!=""){
setTimeout(_d,_f);
}else{
_d();
}
}
},areExtensionsEnabled:function(_10){
if(window.lc_ui_extensionsContainer==null){
console.log("lconn.core.uiextensions.areExtensionsEnabled: lc_ui_extensionsContainer is not defined. plugin taglib must be missing.");
return;
}
var _11=false;
if(typeof (window.lc_ui_extensionsContainer)!="undefined"&&window.lc_ui_extensionsContainer!=null){
var _12=window.lc_ui_extensionsContainer[_10];
for(var i=0;_12!=null&&i<_12.length;i++){
var _13=_12[i].callbackText;
if(_13!=null&&_13!=""&&typeof (_13)!="undefined"){
_11=true;
}
}
}
return _11;
},getParameters:function(_14,_15){
if(window.lc_ui_extensionsContainer==null){
console.log("lconn.core.uiextensions.getParameters: lc_ui_extensionsContainer is not defined. plugin taglib must be missing.");
return;
}
var _16=window.lc_ui_extensionsContainer[_14];
for(var i=0;_16!=null&&i<_16.length;i++){
if(_16[i]!=null&&_16[i].id==_15){
return _16[i].params;
}
}
return null;
}};
}


;if(!dojo._hasResource["lconn.files.config"]){
dojo._hasResource["lconn.files.config"]=true;
(function(){
dojo.provide("lconn.files.config");
dojo.provide("lconn.share.config");




var _1=window._lconn_files_config;
if(!_1){
throw "No configuration object available";
}
var _2=window._lconn_files_config_xslt_list;
var _3=dojo.queryToObject(new dojo._Url(window.location.href).query||"").lang;
if(dojo.isArray(_3)){
_3=_3[0];
}
if(_3){
_3=_3.replace("_","-");
if(_3=="iw"){
_3="he";
}
_1.formattingLanguageParam=_3;
}
var _4=_1.baseUri;
var _5=_1.apiFormService;
var _6=_1.apiBasicService;
var _7=_5+"anonymous/api/";
var _8=_5+"api/";
var _9=_6+"anonymous/api/";
var _a=_6+"api/";
dojo.mixin(_1,{baseUriPath:new dojo._Url(_4).path,helpDefaultTopic:"fframe.html",validation:{warnForDownload:150},autosave:{regularTimerLength:300000,onPauseTimerLength:15000,numRetrievedUnsavedChanges:20},templates:{"lconn.files.scenes.About":"templates/about.jsp","lconn.files.scenes.Statistics":"templates/statistics.jsp","lconn.files.scenes.Toolbox":"templates/toolbox.jsp"},securedUrls:[_8,_a]});
dojo.mixin(_1.services,{basic:{auth:_a,anon:_9},form:{auth:_8,anon:_7},authenticationUri:_5+"authenticated",loginUri:_5+"login_redirect",maxAge:3600,timeout:{request:100,update:200,upload:0,retrieveFiles:100,userSearch:200,userTypeahead:10},uploadMonitor:{url:_8+"myop/feed?format=json",ioArgs:{handleAs:"json-comment-optional",secured:false},validStatusCodes:[200,404],timeout:30,interval:4,maxInterval:30,queries:25,maxAttempts:-1,maxFailures:3},typeahead:{hintText:null},quota:{thresholdAlert:5*1024*1024},recentShares:{maxResults:21,itemsPerColumn:7},collectionSearch:{pageSize:15,minChars:2,searchDelay:400,maxResults:100},librarySearch:{pageSize:15,minChars:3,searchDelay:400,maxResults:100},communitySearch:{pageSize:15,minChars:2,searchDelay:400,maxResults:100},tagList:{minResults:10,defaultResults:50,maxResults:200,pageSize:100},logout:function(s){
var _b=this.routes.getLogoutUrl((typeof s=="string")?s:null);
lconn.core.auth.logout(_b);
},login:function(s){
var _c=this.routes.getLoginUrl(typeof s=="string"?s:null);
lconn.core.auth.login(_c);
},attachments:{pageSize:20},comments:{pageSize:20},downloads:{pageSize:100},shareInfo:{pageSize:100},versions:{pageSize:20},events:{pageSize:20}});
dojo.mixin(_1.features,{useXslt:false,dropDesktopFiles:true,canInviteUsers:_1.isCloudMode,showApplicationName:true});
dojo.mixin(_1.services.peopleSearch,{pageSize:15,minChars:2,searchDelay:400});
if(_2){
dojo.mixin(dojo.getObject("xslt.list",true,_1),_2);
}
lconn.share.config=lconn.files.config=_1;
})();
}


;if(!dojo._hasResource["lconn.share.util.dom"]){
dojo._hasResource["lconn.share.util.dom"]=true;
dojo.provide("lconn.share.util.dom");


var dom=lconn.share.util.dom;
var n1=dom.NAMESPACES;
n1.XML={LONG:"http://www.w3.org/XML/1998/namespace",SHORT:"xml"};
n1.DOCUMENTS_ATOM_BATCH={LONG:"urn:ibm.com/td/batch",SHORT:"batch"};
n1.OPENSEARCH={LONG:"http://a9.com/-/spec/opensearch/1.1/",SHORT:"opensearch"};
n1.THREAD_ATOM={LONG:"http://purl.org/syndication/thread/1.0",SHORT:"thr"};
n1.CA={LONG:"http://www.ibm.com/xmlns/prod/composite-applications/v1.0",SHORT:"ca"};
n1.SNX={LONG:"http://www.ibm.com/xmlns/prod/sn",SHORT:"snx"};
dom.SELECTION_NAMESPACES=[];
for(var key in n1){
var value=n1[key];
dom[key+"_NAMESPACE"]=value;
dom.NAMESPACE_PREFIX[value.SHORT]=value.LONG;
dom.SELECTION_NAMESPACES.push("xmlns:"+value.SHORT+"='"+value.LONG+"'");
}
dom.SELECTION_NAMESPACES=dom.SELECTION_NAMESPACES.join(" ");
dom.xpathNSResolver=function(ns){
return dom.NAMESPACE_PREFIX[ns];
};
dom.xpathNumber=function(_1,_2){
if(!_1){
return NaN;
}
return this.xpath(_1,_2,"number");
};
dom.xpathString=function(_3,_4){
if(!_3){
return "";
}
return this.xpath(_3,_4,"string");
};
dom.xpathNode=function(_5,_6){
if(!_5){
return null;
}
return this.xpath(_5,_6,"node");
};
dom.xpathNodes=function(_7,_8){
if(!_7){
return [];
}
return this.xpath(_7,_8,"nodes");
};
dom.xpath=function(_9,_a,_b){
if(!_9){
return null;
}
var _c=null;
if(dojo.isIE){
switch(_b){
case "number":
case "string":
var _d=_9.selectNodes(_a);
if(_d.length==1&&_d[0].text){
_c=_d[0].text;
}else{
var a=[],c=null;
for(var i=0;c=_d[i];i++){
if(c.nodeType==3){
a.push(c.nodeValue);
}
}
_c=a.join("");
}
if(_b=="number"){
_c=parseInt(_c);
}
break;
case "node":
var _e=_9.selectNodes(_a);
_c=_e?_e[0]:null;
break;
default:
_c=_9.selectNodes(_a);
break;
}
}else{
switch(_b){
case "number":
_c=_9.ownerDocument.evaluate(_a,_9,dom.xpathNSResolver,XPathResult.NUMBER_TYPE,null).numberValue;
break;
case "string":
_c=_9.ownerDocument.evaluate(_a,_9,dom.xpathNSResolver,XPathResult.STRING_TYPE,null).stringValue;
break;
case "node":
_c=_9.ownerDocument.evaluate(_a,_9,dom.xpathNSResolver,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
break;
case "nodes":
var _d=_9.ownerDocument.evaluate(_a,_9,dom.xpathNSResolver,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
_c=[];
var _f;
while(_f=_d.iterateNext()){
_c.push(_f);
}
break;
default:
var _d=_9.ownerDocument.evaluate(_a,_9,dom.xpathNSResolver,XPathResult.ANY_TYPE,null);
_c=[];
var _f;
while(_f=_d.iterateNext()){
_c.push(_f);
}
break;
}
}
return _c;
};
dom.prependXmlProlog=function(xml){
if(/^\s*<\?xml\s/.test(xml)){
xml=xml.substring(xml.indexOf("?>")+2);
}
return dom.XML_DECLARATION+xml;
};
dom.serializeXMLDocument=function(doc,_10){
var s;
if(doc.xml){
s=doc.xml;
}else{
s=new XMLSerializer().serializeToString(doc);
}
if(!_10){
if(/^\s*<\?xml\s/.test(s)){
s=s.substring(s.indexOf("?>")+2);
}
}else{
s=dom.prependXmlProlog(s);
}
return s;
};
dom.newXMLDocument=function(_11,_12,_13){
if(!_11){
_11="";
}
var _14="";
if(_12){
if(_12.LONG){
_14=_12.LONG;
}else{
_14=_12;
}
}
if(document.implementation&&document.implementation.createDocument&&!dojo.isIE){
return document.implementation.createDocument(_14,_11,null);
}else{
var doc=new ActiveXObject("MSXML2.DOMDocument");
if(_11){
var _15="";
var _16=_11;
var p=_11.indexOf(":");
if(p!=-1){
_15=_11.substring(0,p);
_16=_11.substring(p+1);
}
if(!_15&&_12&&_12.SHORT){
_15=_12.SHORT;
}else{
_15=null;
}
var _17="<"+(_15?(_15+":"):"")+_16+(_14?(" xmlns"+(_15?(":"+_15):"")+"=\""+_14+"\""):"");
if(_13){
for(var i=0;i<_13.length;i++){
_17+=" xmlns:"+_13[i].SHORT+"=\""+_13[i].LONG+"\"";
}
}
_17+="/>";
doc.loadXML(_17);
}
return doc;
}
};
dom.getElementByLanguage=function(_18,_19){
var c;
var i;
var _1a=[_19];
while((i=_19.lastIndexOf("-"))!=-1){
_1a.push(_19=_19.substring(0,i));
}
if(dojo.indexOf(_1a,"en-us")==-1){
_1a.push("en-us");
}
if(dojo.indexOf(_1a,"en")==-1){
_1a.push("en");
}
if(dojo.indexOf(_1a,"")==-1){
_1a.push("");
}
for(var i=0;i<_1a.length;i++){
for(var j=0;c=_18[j];j++){
var _1b=(dojo.isIE)?c.getAttribute(dom.XML_NAMESPACE.SHORT+":lang"):c.getAttributeNS(dom.XML_NAMESPACE.LONG,"lang");
_1b=_1b?_1b:"";
if(_1b==_1a[i]){
return c;
}
}
}
return null;
};
dom.getAttributeNS=function(el,_1c,_1d){
return (dojo.isIE)?el.getAttribute(_1d.SHORT+":"+_1c):el.getAttributeNS(_1d.LONG,_1c);
};
dom._getNSPrefix=function(el,_1e){
for(var _1f=el,_20=null;_1f&&!_20&&_1f.nodeType==1;_1f=_1f.parentNode){
_20=_1f.getAttribute("xmlns");
}
var _21=(_20==_1e.LONG)?"":(_1e.SHORT+":");
return _21;
};
dom.getElementsByTagNameNS=function(el,_22,_23){
return (dojo.isIE)?el.getElementsByTagName(this._getNSPrefix(el,_23)+_22):el.getElementsByTagNameNS(_23.LONG,_22);
};
dom.createElementNS=function(d,_24,_25){
var _26=(dojo.isIE)?d.createElement(_25.SHORT+":"+_24):d.createElementNS(_25.LONG,_24);
return _26;
};
dom.setAttributeNS=function(el,_27,_28,_29){
if(dojo.isIE){
el.setAttribute(_29.SHORT+":"+_27,_28);
}else{
el.setAttributeNS(_29.LONG,_29.SHORT+":"+_27,_28);
}
};
dom.insertBefore=function(el,_2a,_2b){
if(_2b){
el.insertBefore(_2a,_2b);
}else{
el.appendChild(_2a);
}
return _2a;
};
dom.getChildElement=function(el,_2c){
var arr=el.childNodes;
for(var i=0,c;c=arr[i];i++){
if(c.nodeName==_2c||c.localName==_2c){
return c;
}
}
};
dom.getChildElementNS=function(el,_2d,_2e){
var qud=lconn.share.util.dom;
var arr=(dojo.isIE)?el.getElementsByTagName(qud._getNSPrefix(el,_2e)+_2d):el.getElementsByTagNameNS(_2e.LONG,_2d);
for(var i=0,c;c=arr[i];i++){
if(c.parentNode==el){
return c;
}
}
};
dom.getChildElementTextContent=function(el,_2f){
if(!el){
return null;
}
var arr=el.getElementsByTagName(_2f);
var qud=lconn.share.util.dom;
for(var i=0,c;c=arr[i];i++){
if(c.parentNode==el){
return qud.getTextContent(c);
}
}
return null;
};
dom.getChildElementTextContentNS=function(el,_30,_31){
var qud=lconn.share.util.dom;
return qud.getTextContent(qud.getChildElementNS(el,_30,_31));
};
dom.getTextContent=function(el){
if(!el){
return null;
}
if(el.textContent){
return el.textContent;
}
if(el.innerText){
return el.innerText;
}
if(el.text){
return el.text;
}
var a=[];
for(var j=0;c2=el.childNodes[j];j++){
if(c2.nodeType==3){
a.push(c2.nodeValue);
}
}
return a.join("");
};
dom.getChildElementAttribute=function(_32,_33,_34){
if(!_32){
return null;
}
if(_34=="class"&&dojo.isIE){
_34="className";
}
var arr=_32.getElementsByTagName(_33);
for(var i=0,c;c=arr[i];i++){
if(c.parentNode==_32){
return c.getAttribute(_34);
}
}
return null;
};
dom.getChildElementAttributeNS=function(_35,_36,_37,_38,_39){
if(!_35){
return null;
}
var c;
if(dojo.isIE){
if(_38=="class"){
_38="className";
}
for(var i=0;c=_35.childNodes[i];i++){
var _3a=c.localName;
if(!_3a){
_3a=c.baseName;
}
if(_3a==_36&&(_37==null||c.namespaceURI==_37.LONG)){
return c.getAttribute(_39.SHORT+":"+_38);
}
}
}else{
if(_37){
var arr=_35.getElementsByTagNameNS(_37.LONG,_36);
for(var i=0,c;c=arr[i];i++){
if(c.parentNode==_35){
return c.getAttributeNS(_39.LONG,_38);
}
}
}else{
var arr=_35.getElementsByTagName(_36);
for(var i=0,c;c=arr[i];i++){
if(c.parentNode==_35){
return c.getAttributeNS(_39.LONG,_38);
}
}
}
}
return null;
};
dom.getChildElementAttributeMatching=function(_3b,_3c,_3d,_3e,_3f){
if(!_3b){
return null;
}
if(_3d=="class"&&dojo.isIE){
_3d="className";
}
if(_3f=="class"&&document.all){
_3f="className";
}
var arr=_3b.getElementsByTagName(_3c);
for(var i=0;child=arr[i];i++){
if(child.getAttribute(_3d)==_3e){
return child.getAttribute(_3f);
}
}
return null;
};
dom.getChildElementAttributeMatchingNS=function(_40,_41,_42,_43,_44,_45,_46,_47){
if(!_40){
return null;
}
if(_43=="class"&&dojo.isIE){
_43="className";
}
if(_46=="class"&&document.all){
_46="className";
}
if(dojo.isIE){
var _48=_42?this._getNSPrefix(_40,_42)+_41:_41;
var _49=_44?_44.SHORT+":"+_43:_43;
var _4a=_47?_47.SHORT+":"+_46:_46;
var arr=_40.getElementsByTagName(_48);
for(var i=0;c=arr[i];i++){
if(c.getAttribute(_49)==_45){
return c.getAttribute(_4a);
}
}
}else{
if(_42){
var arr=_40.getElementsByTagNameNS(_42.LONG,_41);
if(_44){
for(var i=0,c;c=arr[i];i++){
if(c.getAttributeNS(_44.LONG,_43)==_45){
return _47?c.getAttributeNS(_47.LONG,_46):c.getAttribute(_46);
}
}
}else{
for(var i=0,c;c=arr[i];i++){
if(c.getAttribute(_43)==_45){
return _47?c.getAttributeNS(_47.LONG,_46):c.getAttribute(_46);
}
}
}
}else{
var arr=_40.getElementsByTagName(_41);
if(_44){
for(var i=0;child=arr[i];i++){
if(child.getAttributeNS(_44.LONG,_43)==_45){
return _47?c.getAttributeNS(_47.LONG,_46):c.getAttribute(_46);
}
}
}else{
for(var i=0;child=arr[i];i++){
if(child.getAttribute(_43)==_45){
return _47?c.getAttributeNS(_47.LONG,_46):c.getAttribute(_46);
}
}
}
}
}
return null;
};
dom.getChildElementMatchingAttribute=function(_4b,_4c,_4d,_4e){
if(!_4b){
return null;
}
if(_4d=="class"&&dojo.isIE){
_4d="className";
}
var arr=_4b.getElementsByTagName(_4c);
for(var i=0;child=arr[i];i++){
if(child.getAttribute(_4d)==_4e){
return child;
}
}
return null;
};
dom.getChildElementMatchingAttributeNS=function(_4f,_50,_51,_52,_53,_54){
if(!_4f){
return null;
}
if(_52=="class"&&dojo.isIE){
_52="className";
}
if(dojo.isIE){
var _55=_51?this._getNSPrefix(_4f,_51)+_50:_50;
var _56=_53?_53.SHORT+":"+_52:_52;
var arr=_4f.getElementsByTagName(_55);
for(var i=0;c=arr[i];i++){
if(c.getAttribute(_56)==_54){
return c;
}
}
}else{
if(_51){
var arr=_4f.getElementsByTagNameNS(_51.LONG,_50);
if(_53){
for(var i=0,c;c=arr[i];i++){
if(c.getAttributeNS(_53.LONG,_52)==_54){
return c;
}
}
}else{
for(var i=0,c;c=arr[i];i++){
if(c.getAttribute(_52)==_54){
return c;
}
}
}
}else{
var arr=_4f.getElementsByTagName(_50);
if(_53){
for(var i=0;child=arr[i];i++){
if(child.getAttributeNS(_53.LONG,_52)==_54){
return c;
}
}
}else{
for(var i=0;child=arr[i];i++){
if(child.getAttribute(_52)==_54){
return c;
}
}
}
}
}
return null;
};
dom.getChildElementMatchingAttributeTextContent=function(_57,_58,_59,_5a){
if(!_57){
return null;
}
if(_59=="class"&&dojo.isIE){
_59="className";
}
var arr=_57.getElementsByTagName(_58);
for(var i=0;child=arr[i];i++){
if(child.getAttribute(_59)==_5a){
return dom.xmlText(child);
}
}
return null;
};
dom.getChildElementMatchingAttributeTextContentNS=function(_5b,_5c,_5d,_5e,_5f,_60){
if(!_5b){
return null;
}
var _61;
if(dojo.isIE){
if(_5e=="class"){
_5e="className";
}
var _62=_5d==null?_5c:_5d.SHORT+":"+_5c;
var _63=_5f==null?_5e:_5f.SHORT+":"+_5e;
var arr=_5b.getElementsByTagName(_62);
for(var i=0;_61=arr[i];i++){
if(_61.parentNode==_5b&&_61.getAttribute(_63)==_60){
return dom.xmlText(_61);
}
}
}else{
if(_5d){
var arr=_5b.getElementsByTagNameNS(_5d.LONG,_5c);
if(_5f){
for(var i=0;_61=arr[i];i++){
if(_61.parentNode==_5b&&_61.getAttributeNS(_5f.LONG,_5e)==_60){
return dom.xmlText(_61);
}
}
}else{
for(var i=0;_61=arr[i];i++){
if(_61.parentNode==_5b&&_61.getAttribute(_5e)==_60){
return dom.xmlText(_61);
}
}
}
}else{
var arr=_5b.getElementsByTagName(_5c);
if(_5f){
for(var i=0;_61=arr[i];i++){
if(_61.parentNode==_5b&&_61.getAttributeNS(_5f.LONG,_5e)==_60){
return dom.xmlText(_61);
}
}
}else{
for(var i=0;_61=arr[i];i++){
if(_61.parentNode==_5b&&_61.getAttribute(_5e)==_60){
return dom.xmlText(_61);
}
}
}
}
}
return null;
};
dom.domNodesToXml=function(_64){
var doc;
var _65;
if(_64&&_64.length>0){
if(_64.length>1){
doc=dom.newXMLDocument("div");
_65=doc.documentElement;
}
for(var i=0;i<_64.length;i++){
var _66=_64.item(i);
doc=dom.domToXml(_66,_65,doc);
}
}else{
doc=dom.newXMLDocument("div");
}
var _67=dom.XML_DECLARATION_WITH_ENTITIES+dom.serializeXMLDocument(doc);
return _67;
};
dom.domToXml=function(_68,_69,doc){
if(_68.nodeType==3){
if(!_69){
doc=dom.newXMLDocument("div");
_69=doc.documentElement;
}
_69.appendChild(doc.createTextNode(_68.nodeValue));
return doc;
}
var _6a;
var _6b=_68.nodeName.toLowerCase();
if(!doc){
doc=dom.newXMLDocument(_6b);
_6a=doc.documentElement;
}else{
_6a=doc.createElement(_6b);
_69.appendChild(_6a);
}
var _6c=_68.attributes;
if(_6c&&_6c.length>0){
var isA=_6b=="a";
var _6d=_6b=="img";
for(var i=0;i<_6c.length;i++){
var _6e=_6c.item(i);
if(_6e.specified){
if((_6d&&_6e.name=="src")||(isA&&_6e.name=="href")){
var _6f=_68.getAttribute("_fcksavedurl");
_6a.setAttribute(_6e.name,_6f);
}else{
_6a.setAttribute(_6e.name,_6e.value);
}
}
}
}
var _70=_68.childNodes;
if(_70&&_70.length>0){
for(var i=0;i<_70.length;i++){
var _71=_70.item(i);
dom.domToXml(_71,_6a,doc);
}
}
return doc;
};
}


;if(!dojo._hasResource["lconn.share.widget.ImagePop"]){
dojo._hasResource["lconn.share.widget.ImagePop"]=true;
dojo.provide("lconn.share.widget.ImagePop");


dojo.declare("lconn.share.widget.ImagePop",[dijit._Widget],{showDelay:100,hideDelay:100,orient:"tl",buildRendering:function(){
var d=document;
var el=this.domNode=this.srcNodeRef;
if(this.baseClass){
dojo.addClass(el,this.baseClass);
}
var t=this.target;
dojo.forEach(["onMouseOver","onMouseOut","onHover","onUnHover"],function(_1){
this.connect(t,_1.toLowerCase(),"_"+_1);
},this);
},uninitialize:function(){
this.close();
if(this.largeImage){
this.largeImage.parentNode.removeChild(this.largeImage);
this.largeImage=null;
}
if(this.listeners){
dojo.forEach(this._listeners,dojo.disconnect);
delete this._listeners;
}
},_onMouseOver:function(e){
this._onHover(e);
},_onMouseOut:function(e){
if(dojo.isDescendant(e.relatedTarget,e.target)){
return;
}
this._onUnHover(e);
},_onHover:function(e){
if(this._hideTimer){
clearTimeout(this._hideTimer);
delete this._hideTimer;
}
if(!this._showTimer){
var _2=e.target;
this._showTimer=setTimeout(dojo.hitch(this,function(){
this.open(_2);
}),this.showDelay);
}
},_onUnHover:function(e){
if(this._focus){
return;
}
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
if(!this._hideTimer){
this._hideTimer=setTimeout(dojo.hitch(this,"close"),this.hideDelay);
}
},_onMouseOverT:function(){
if(this._connectNode){
this._onMouseOver({target:this._connectNode});
}
},_onMouseOutT:function(e){
if(dojo.isDescendant(e.relatedTarget,e.target)){
return;
}
this._onUnHover({target:this._connectNode});
},_onHoverT:function(){
if(this._connectNode){
this._onHover({target:this._connectNode});
}
},_onUnHoverT:function(){
if(this._connectNode){
this._onUnHover({target:this._connectNode});
}
},_getImage:function(){
var _3=this.largeImage;
if(!_3){
_3=this.largeImage=document.createElement("img");
_3.src=this.target.src;
dijit.popup.moveOffScreen(_3);
this._listeners=[dojo.connect(_3,"onmouseover",this,"_onMouseOverT"),dojo.connect(_3,"onmouseout",this,"_onMouseOutT"),dojo.connect(_3,"onhover",this,"_onHoverT"),dojo.connect(_3,"onunhover",this,"_onUnHoverT")];
}
return _3;
},_disconnectTooltip:function(){
dojo.forEach(this._listeners||[],function(l){
dojo.disconnect(l);
});
delete this._listeners;
},left:function(_4,_5){
var l=_4.x;
if(this.orient.charAt(1)==(this.isLeftToRight()?"r":"l")){
l-=(_5.w-_4.w);
}
return l;
},top:function(_6,_7){
var t=_6.y;
if(this.orient.charAt(0)=="b"){
t-=(_7.h-_6.h);
}
return t;
},open:function(_8){
_8=_8||this.target;
if(!_8){
return;
}
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
var _9=this._connectNode=this._getImage();
_9.style.display="";
var a=dojo.coords(this.target,true);
var c=dojo.contentBox(this.target);
a.h=c.h;
a.w=c.w;
var b=dojo.contentBox(_9);
dojo.marginBox(_9,{l:this.left(a,b),t:this.top(a,b)});
_9.style.visibility="";
},close:function(){
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
delete this._connectNode;
var _a=this._getImage();
_a.style.display="none";
_a.style.visibility="hidden";
}});
}


;if(!dojo._hasResource["lconn.share.widget.MessageContainer"]){
dojo._hasResource["lconn.share.widget.MessageContainer"]=true;
dojo.provide("lconn.share.widget.MessageContainer");






dojo.declare("lconn.share.widget.MessageContainer",[dijit._Widget],{nls:{},postMixInProperties:function(){
if(this.messages){
this.items=this.messages.getMessages();
if(this.filter){
this.items=dojo.filter(this.items,this.filter);
}
this.connect(this.messages,"onNew","add");
this.connect(this.messages,"onClear","update");
}else{
this.items=this.items||[];
}
},buildRendering:function(){
var d=document;
var el=this.domNode=this.srcNodeRef;
dijit.setWaiState(el,"live","assertive");
if(this.baseClass){
dojo.addClass(this.domNode,this.baseClass);
}
dojo.addClass(this.domNode,"lotusMessageContainer");
this.update(this.items);
},renderItem:function(el,_1){
var _2=this.nls.INFO,_3=com.ibm.oneui.controls.MessageBox.TYPE.INFO,_4=true;
var _5=this.nls.INFO_COLON;
if(_1.warning){
_2=this.nls.WARNING;
_5=this.nls.WARNING_COLON;
_3=com.ibm.oneui.controls.MessageBox.TYPE.WARNING;
}else{
if(_1.success){
_2=this.nls.SUCCESS;
_5=this.nls.SUCCESS_COLON;
_3=com.ibm.oneui.controls.MessageBox.TYPE.SUCCESS;
}else{
if(_1.error){
_2=this.nls.ERROR;
_5=this.nls.ERROR_COLON;
_3=com.ibm.oneui.controls.MessageBox.TYPE.ERROR;
}else{
if(_1.external){
_2=this.nls.EXTERNAL_WARNING;
_5=this.nls.EXTERNAL_WARNING_COLON;
_3=com.ibm.oneui.controls.MessageBox.TYPE.SHARED_EXTERNAL;
}
}
}
}
if(!_5){
_5=_2;
}
var _6=dojo.create("div",{},el);
setTimeout(dojo.hitch(this,function(){
var _7=_1.message;
if(typeof _7=="function"){
_7=_7.apply(_1,[dojo.doc]);
}
if(!_7){
return;
}
var mb=new com.ibm.oneui.controls.MessageBox({canClose:_4,msg:_7,type:_3,_strings:{icon_alt:_2,a11y_label:_5,close_btn_alt:this.nls.CLOSE,close_btn_title:this.nls.CLOSE}},_6);
this.connect(mb,"onClose","remove");
_6.setAttribute("_id",_1._id);
dojo.publish("lconn/share/message/updated");
}),200);
return _6;
},update:function(m,_8){
var el=this.domNode;
lconn.share.util.html.removeChildren(el);
if(m&&this.filter){
m=dojo.filter(m,this.filter,this);
}
this.items=m=m||[];
for(var i=0;i<m.length;i++){
var _9=m[i];
_9._id=i;
this.renderItem(el,_9);
}
el.style.display=(m.length==0)?"none":"";
if(_8){
dijit.scrollIntoView(this.domNode);
}
},remove:function(id,e){
if(e){
dojo.stopEvent(e);
}
if(typeof id=="object"){
id=id._id;
}
var el=this.domNode;
if(!el){
return;
}
var _a=el.childNodes;
for(var i=0;i<_a.length;i++){
if(dojo.attr(_a[i],"_id")==id){
lconn.share.util.html.removeChildren(_a[i]);
this.domNode.removeChild(_a[i]);
break;
}
}
var _b=this.items;
for(var i=0;i<_b.length;i++){
if(this.items[i]._id==id){
var _c=this.items.splice(i,1)[0];
_c.closed=true;
if(typeof _c.onClose=="function"){
_c.onClose();
}
break;
}
}
el.style.display=(this.items.length==0)?"none":"";
dojo.publish("lconn/share/message/updated");
},removeAll:function(){
var el=this.domNode;
lconn.share.util.html.removeChildren(el);
el.style.display="none";
},add:function(_d,_e){
if(this.filter&&!this.filter(_d)){
return;
}
this.items.push(_d);
_d._id=this.items.length-1;
var _f=this.renderItem(this.domNode,_d);
this.domNode.style.display="";
if(_e){
dijit.scrollIntoView(this.domNode);
}
},replace:function(_10,_11){
var id=_11._id;
var el=this.domNode;
var _12=el.childNodes;
var _13=null;
for(var i=0;!_13&&i<_12.length;i++){
if(dojo.getAttr(_12[i],"_id")==id){
_13=_12[i];
}
}
if(!_13){
this.add(_10,true);
return;
}
_10._id=id;
var _14=this.items;
for(var i=0;i<_14.length;i++){
if(_14[i]._id==id){
_14[i]=_10;
}
}
var _15=document.createDocumentFragment();
var _16=this.renderItem(_15,_10);
el.replaceChild(_16,_13);
lconn.share.util.html.removeChildren(_13);
}});
}


;if(!dojo._hasResource["lconn.share.widget.HelpLauncher"]){
dojo._hasResource["lconn.share.widget.HelpLauncher"]=true;
dojo.provide("lconn.share.widget.HelpLauncher");




dojo.declare("lconn.share.widget.HelpLauncher",lconn.core.widget.MenuLauncher,{openDelay:250,hideDelay:400,orient:{"TR":"TL","TL":"TR","BR":"BL","BL":"BR"},orientRTL:{"TL":"TR","TR":"TL","BL":"BR","BR":"BL"},_initMenu:function(){
return lconn.share.requireAsync("lconn.share.widget.tooltip.HelpText").addCallback(this,function(){
this.menu=new lconn.share.widget.tooltip.HelpText(dojo.mixin({id:this.menuId},this.optMenu));
this.menu.containerNode.parentNode.style.border="0px";
});
},onOpen:function(){
this.inherited(arguments);
this.menu.containerNode.appendChild(document.createTextNode(""));
}});
}


;if(!dojo._hasResource["lconn.share.scenehelper"]){
dojo._hasResource["lconn.share.scenehelper"]=true;
dojo.provide("lconn.share.scenehelper");








lconn.share.scenehelper={hideLotusFrame:function(d,_1){
var _2=lconn.share.scenehelper;
var _3=d.body;
var _4=d.getElementById("lotusFrame");
if(_4){
_3=_4.parentNode;
if(dojo.hasClass(_4,"_qkrInitial")){
_2.prepStorage(d,_4);
}else{
_2.saveCustomTemplate(d,"qkrStorage");
lconn.share.util.html.destroyWidgets(_4);
_3.removeChild(_4);
}
}
var el=d.createElement("div");
el.className="lotusFrame lotusui30_layout";
el.id="lotusFrame";
_3.appendChild(el);
return {frame:el};
},resetLotusFrame:function(d,_5){
var _6=lconn.share.scenehelper;
var _7=_6.detachCustomTemplate(d,_5,null,true);
var _8=d.body;
var _9=d.getElementById("lotusFrame");
if(_9){
_8=_9.parentNode;
if(dojo.hasClass(_9,"_qkrInitial")){
_6.prepStorage(d,_9);
}else{
lconn.share.util.html.destroyWidgets(_9);
_8.removeChild(_9);
}
}
var el=_7.frame=d.createElement("div");
el.className="lotusFrame lotusui30_layout";
el.id="lotusFrame";
_8.appendChild(el);
var _a=dojo.byId("lotusFooter");
if(_a){
dojo.place(el,_a,"before");
}
return _7;
},reuseLotusFrame:function(d,_b,_c){
var _d=lconn.share.scenehelper;
var _e=d.getElementById("lotusFrame");
if(!_e){
var el=_e=d.createElement("div");
el.className="lotusFrame lotusui30_layout";
el.id="lotusFrame";
body.appendChild(el);
}else{
if(dojo.hasClass(_e,"_qkrInitial")||_c!=_e._type){
var _f=_d.resetLotusFrame(d,_b);
_f.frame._type=_c;
return _f;
}
}
_e._type=_c;
var _f=_d.detachCustomTemplate(d,_b,_e,true);
_f.frame=_e;
return _f;
},prepStorage:function(d,el){
el.style.display="none";
el.id="qkrStorage";
el.className="";
var _10=dojo.byId("lconnApplicationLoading");
var _11=dojo.byId("body");
if(_10&&_10.parentNode==el){
el.removeChild(_10);
}else{
if(_11&&_10&&dojo.getObject("ibmConfig.serviceName")&&dojo.getObject("ibmConfig.serviceName")=="files"){
_11.removeChild(_10);
}
}
},detachCustomTemplate:function(d,app,_12,_13){
var _14={};
dojo.forEach(["lotusBanner","lotusFooter"],function(id){
var el=d.getElementById(id);
if(!el){
return;
}
if(!el.fixedLinks){
dojo.forEach(el.getElementsByTagName("A"),lconn.share.scenehelper.applyLinkRulesForConnections,app);
el.fixedLinks=true;
}
if(!el.movedStyleNodes){
dojo.forEach(["LINK","STYLE"],function(_15){
dojo.query(_15,el).forEach(function(el){
d.body.appendChild(el);
});
});
if(dojo.isIE){
dojo.query("SCRIPT",el).forEach(function(el){
if(el.src){
el.oldSrc=el.src;
el.removeAttribute("src");
}
});
}
el.movedStyleNodes=true;
}
if(!_12||!dojo.isDescendant(el,_12)){
if(_13){
d.body.appendChild(el);
}else{
el.parentNode.removeChild(el);
}
this[id]=el;
}
el.style.display="";
},_14);
return _14;
},getLotusFooter:function(){
return dojo.byId("lotusFooter");
},moveLotusFooter:function(_16){
var _17=lconn.share.scenehelper.getLotusFooter();
if(!_16){
_16=dojo.byId("lotusFrame");
}
if(_17&&_16){
dojo.place(_17,_16,"last");
}
},saveCustomTemplate:function(d,_18){
var s=dojo.byId(_18);
if(!s){
throw "saveCustomTemplate called but the save node was not found";
}
dojo.forEach(["lotusBanner","lotusFooter"],function(id){
var el=dojo.byId(id);
if(el){
el.parentNode.removeChild(el);
s.appendChild(el);
}
});
},applyHomeTemplate:function(d,_19,app,_1a,opt){
var _1b=lconn.share.scenehelper;
var old=_1b.resetLotusFrame(d,app);
var _1c=old.frame;
var div=_1c.appendChild(d.createElement("div"));
div.id=div.className="lotusTopNav";
dijit.setWaiRole(div,"banner");
dojo.attr(div,"aria-label",app.nls.APP_NAME_TITLE_BAR);
if(old["lotusBanner"]){
div.appendChild(old["lotusBanner"]);
old["lotusBanner"].removeAttribute("role");
}else{
throw "Header was not in the DOM when applyHomeTemplate was called";
}
if(opt.titleBar){
var el=d.createElement("div");
el.id=el.className="lotusTitleBar";
_1b.applyTitleBar(d,el,app,opt);
div.appendChild(el);
}
if(!opt.hidePlaceBar){
var el=d.createElement("div");
el.id="lotusPlaceBar";
el.className="lotusPlaceBar lotusTitleBarExt";
_1b.applyPlaceBar(d,el,app);
div.appendChild(el);
}
var el=d.createElement("div");
el.id=el.className="lotusMain";
_1c.appendChild(el);
if(old["lotusFooter"]){
_1c.appendChild(old["lotusFooter"]);
}
},applyTitleBar:function(){
throw "Implementor must provide applyTitleBar() when using applyHomeTemplate";
},reuseTitleBar:function(){
throw "Implementor must provide reuseTitleBar() when using reuseHomeTemplate";
},applyPlaceBar:function(){
},reusePlaceBar:function(){
},applyGlobalActions:function(){
},reuseHomeTemplate:function(d,app,opt){
var _1d=lconn.share.scenehelper;
var old=_1d.reuseLotusFrame(d,app,"main");
var _1e=old.frame;
var _1f=!!_1e.firstChild;
if(_1f){
if(opt.titleBar){
_1d.reuseTitleBar(d,d.getElementById("lotusTitleBar"),app,opt);
}
if(!opt.hidePlaceBar){
_1d.reusePlaceBar(d,d.getElementById("lotusPlaceBar"),app,opt);
}
}else{
var _20=d.createElement("div");
_20.id=_20.className="lotusTopNav";
dijit.setWaiRole(_20,"banner");
dojo.attr(_20,"aria-label",app.nls.APP_NAME_TITLE_BAR);
_1e.appendChild(_20);
var _21=old["lotusBanner"];
_21.removeAttribute("role");
_20.appendChild(_21);
if(opt.titleBar){
var el=d.createElement("div");
el.id=el.className="lotusTitleBar";
_1d.applyTitleBar(d,el,app,opt);
_20.appendChild(el);
}
if(!opt.hidePlaceBar){
var el=placebar=d.createElement("div");
el.id="lotusPlaceBar";
el.className="lotusPlaceBar lotusTitleBarExt";
_1d.applyPlaceBar(d,el,app,opt);
_20.appendChild(el);
}
var el=d.createElement("div");
el.id=el.className="lotusMain";
_1e.appendChild(el);
var _22=old["lotusFooter"];
if(_22){
_1e.appendChild(_22);
}
}
return _1f;
},applyDndProperty:function(el,_23,_24){
el.setAttribute("dndData",_23+"");
el.setAttribute("dndType",(_24&&_24.isFolder()?"folder":"file"));
dojo.addClass(el,"dojoDndItem dojoDndHandle");
},applyLinkRulesForConnections:function(a){
var _25=lconn.share.scenehelper;
if(a.href){
if(/login_app_replace$/.test(a.href)){
_25.setOnClick(a,this,"javascript:;",this.login);
}else{
if(/logout_app_replace$/.test(a.href)){
_25.setOnClick(a,this,"javascript:;",this.logout);
}else{
if(/help_app_replace$/.test(a.href)){
a.href="javascript:;";
dojo.connect(a,"onclick",dojo.hitch(this,"activateHelp"));
}
}
}
}
},setOnClick:function(a,obj,_26,_27){
if(dojo.isIE<9){
var _28=a.innerHTML;
a.setAttribute("href",_26);
a.innerHTML=_28;
}else{
a.href=_26;
}
if(!a._registered){
if(_27){
dojo.connect(a,"onclick",obj,_27);
}else{
if(_27==false){
a.ignore=true;
}
}
a._registered=true;
}
},applyLoading:function(app){
var d=app.document;
var old=lconn.share.scenehelper.hideLotusFrame(d,app);
var _29=old.frame;
var el=d.createElement("div");
el.id=el.className="lconnApplicationLoading";
el.appendChild(d.createTextNode(app.nls.LOADING));
_29.appendChild(el);
},createSearchButton:function(d,el,id,_2a){
var _2b=d.createElement("span");
_2b.className="lotusBtnImg";
_2b.title=_2a;
var _2c=d.createElement("INPUT");
if(id){
_2c.id=id;
}
_2c.className="lotusSearchButton";
_2c.type="image";
_2c.title=_2c.alt=_2a;
_2c.src=dojo.config.blankGif;
_2b.appendChild(_2c);
var _2d=d.createElement("a");
_2d.href="javascript:;";
_2d.className="lotusAltText";
_2d.appendChild(d.createTextNode(_2a));
dojo.connect(_2d,"onclick",function(){
try{
_2c.click();
}
catch(e){
}
});
dijit.setWaiRole(_2d,"button");
_2b.appendChild(_2d);
if(el){
el.appendChild(_2b);
}
return _2c;
},applyFeedLink:function(el,url,_2e,_2f,_30){
_2f=_2f||_2e;
_30=_30||_2f;
var d=document;
var _31=d.createElement("div");
_31.className="lotusFeeds lotusLeft";
var a=_31.appendChild(d.createElement("a"));
a.className="lotusFeed lotusAction";
a.href=url;
a.title=_2f;
a.appendChild(d.createTextNode(_2e));
el.appendChild(_31);
return _31;
},applyGenericPopup:function(app,el,a,_32){
var d=app.d;
if(dojo.isArray(a)){
throw "Arrays no longer supported for popups";
}
a.href=a.href||"javascript:;";
var div=d.createElement("div");
div.style.width="250px";
div.className="lotusHelp";
var _33=div.appendChild(d.createElement("div"));
_33.className="lotusInfoBox";
_33.appendChild(d.createTextNode(_32));
return new lconn.share.widget.HelpLauncher({openDelay:50,hideDelay:0,optMenu:{content:div}},a);
},applyTipPopup:function(app,el,a,_34,_35){
var d=app.d;
if(dojo.isArray(a)){
throw "Arrays no longer supported for popups";
}
a.href=a.href||"javascript:;";
return new lconn.share.widget.HelpLauncher({optMenu:{net:app.net,href:app.routes.getHelpTopicUrl(_34),label:app.nls.LOADING,heading:_35,labelClose:app.nls.CLOSE,title:_35,msgError:app.nls.TIPS.ERROR,msgEmpty:app.nls.TIPS.ERROR}},a);
},customizeViewObject:function(_36,_37){
return _37;
},createHelpLink:function(app,el,_38,opt){
opt=opt||{};
var _39="";
var d=document;
var a=d.createElement("A");
a.href="javascript:;";
dijit.setWaiRole(a,"button");
var img=d.createElement("IMG");
img.alt=app.nls.MENUBAR.HELP;
img.className=lconn.core.locale.getLanguage()==="ar"?"lconnSprite lconnSprite-iconHelp16-ar":"lconnSprite lconnSprite-iconHelp16";
img.src=opt.blankGif||dojo.config.blankGif;
a.appendChild(img);
var _3a=d.createElement("span");
dijit.setWaiState(_3a,"label",app.nls.MENUBAR.HELP);
_3a.className="lotusAltText";
_3a.appendChild(d.createTextNode(lconn.core.locale.getLanguage()==="ar"?"\u061f":"?"));
a.appendChild(_3a);
if(opt.header){
_39=opt.header;
}
if(_38){
lconn.share.scenehelper.applyTipPopup(app,el,a,_38,_39);
}
if(opt&&opt.inline){
a.style.verticalAlign="text-top";
}
if(opt&&opt.label){
var _3b=d.createElement("span");
_3b.className="lotusAccess";
_3b.appendChild(d.createTextNode(opt.label));
a.insertBefore(_3b,a.firstChild);
}
el.appendChild(a);
return a;
}};
}


;if(!dojo._hasResource["lconn.share.widget.SearchBox"]){
dojo._hasResource["lconn.share.widget.SearchBox"]=true;
dojo.provide("lconn.share.widget.SearchBox");


















dojo.declare("lconn.share.widget.SearchBox",[dijit._Widget,lconn.core.typeahead.TypeAheadManager],{postMixInProperties:function(){
this.inherited(arguments);
this.scopes=this.scopes||[];
if(this.app){
this.userStore=this.userStore||this.app.getUserTypeAheadStore();
this._stringsUser=this._stringsUser||this.app.nls.USERSEARCH;
this._strings=this._strings||this.app.nls.SEARCH;
}
this.controls=[];
var _1=new lconn.core.peopleFinder.directory.PeopleFinderService();
_1.startup();
var _2=new lconn.core.quickResults.QuickResultsService();
_2.startup();
this.TAservicesList=[_2,_1];
},destroy:function(){
lconn.share.util.misc.destroy(this.controls);
this.controls=[];
this.inherited(arguments);
},buildRendering:function(){
var _3=this.app;
var _4=this.scopes;
var _5=dojo.filter(_4,function(s){
return s.isValid(_3,_3.scene);
});
var _6=this;
var d=document;
var el=this.domNode=this.srcNodeRef;
if(this.baseClass){
dojo.addClass(el,this.baseClass);
}
var _7=this.TAdropdownAnchor=el;
_7.className="lotusSearch";
dijit.setWaiRole(_7,"search");
dojo.connect(_7,"onsubmit",this,"search");
var _8,_9,_a;
var _b=d.createElement("table");
dijit.setWaiRole(_b,"presentation");
_b.className="lotusLayout";
dijit.setWaiRole(_b,"presentation");
_b.cellSpacing="0";
var _c=d.createElement("tbody");
var tr=d.createElement("tr");
var td=d.createElement("td");
_8=d.createElement("div");
_8.style.display=(_5.length>1)?"":"none";
td.appendChild(_8);
tr.appendChild(td);
var td=_9=d.createElement("td");
tr.appendChild(td);
var td=_a=this.buttonCell=d.createElement("td");
tr.appendChild(td);
_c.appendChild(tr);
_b.appendChild(_c);
_7.appendChild(_b);
var _d=this.scopeLink=d.createElement("a");
_d.className="lotusScope";
_d.title=this._strings.REFINE_OPTIONS;
_d.href="javascript:;";
dijit.setWaiRole(_d,"button");
dijit.setWaiState(_d,"haspopup",true);
var _e=this.scopeIcon=d.createElement("img");
_e.className="lconnSprite";
_e.alt="";
_e.src=dojo.config.blankGif;
_d.appendChild(_e);
var _f=this.scopeLabel=this.TAscopeLabelNode=d.createElement("span");
_d.appendChild(_f);
var _10=d.createElement("span");
_10.className="lotusAltText";
_10.appendChild(d.createTextNode("\u25bc"));
_d.appendChild(_10);
_8.appendChild(_d);
var _11=new dijit.Menu();
var _12=el.appendChild(d.createElement("span"));
_12.style.display="none";
_12.setAttribute("widgetid",_11.id);
dojo.addClass(_11.domNode,"lotusNavMenu lconnSearchScope");
var _b=_11.domNode;
var _13=d.createElement("colgroup");
var col=d.createElement("col");
_13.appendChild(col);
var col=d.createElement("col");
_13.appendChild(col);
_b.insertBefore(_13,_b.firstChild);
lconn.core.MenuUtility.attachListeners(_11,_d,function(){
_6.buildPopup(_11);
if(_11.domNode.originalWidth){
dojo.marginBox(_11.domNode,{w:_11.domNode.originalWidth});
}
lconn.core.MenuUtility.openAround(_11,_d);
if(!_11.domNode.originalWidth){
_11.domNode.originalWidth=_11.domNode.offsetWidth;
}
var _14=_11.domNode.offsetWidth;
var _15=_d.offsetWidth;
if(_15>_14){
var _16=null;
if(!dojo._isBodyLtr()){
_16=_11.domNode.parentNode;
}
dojo.marginBox(_11.domNode,{w:_15});
if(_16){
_16.style.left=(_16.offsetLeft+_14-_15)+"px";
}
}
});
var _17="";
if(dojo.some(_4,function(a){
return a.typeahead=="people";
})){
var _18=d.createElement("INPUT");
_18.style.display="none";
_18.size="30";
_9.appendChild(_18);
var _19=this.userSearchAdapter=_3.getUserSearchAdapter();
var opt={_strings:this._stringsUser,noUpdateOnSelect:this.noTypeaheadUpdateOnSelect,id:this.id+"_people",name:this.id+"_people",orient:dojo._isBodyLtr()?{"BR":"TR","TR":"BR"}:{"BL":"TL","TL":"BL"},store:this.userStore,hintText:_17};
var _1a=this.people=_19.createTypeAhead(_18,opt);
_1a.textbox.title=_17||this._strings.SEARCH_ALT;
dojo.addClass(_1a.textbox,"bidiAware");
this.userSearchAdapter.connectOnSelect(_1a,this,dojo.partial(this.selectPerson,_1a));
}
if(dojo.some(_4,function(a){
return !a.typeahead;
})){
var _18=this.simpleInputNode=this.TAtextField=d.createElement("INPUT");
_18.className="lotusText";
_18.style.display="none";
_18.size="30";
_18.id=this.id+"_simpleInput";
_18.value=_17;
_18.title=_17||this._strings.SEARCH_ALT;
dojo.addClass(_18,"bidiAware");
_9.appendChild(_18);
dojo.connect(_18,"onfocus",_18,this.onTextFocus);
dojo.connect(_18,"onblur",_18,this.onTextBlur);
}
lconn.share.scenehelper.createSearchButton(d,_a,this.id+"_submit",this._strings.SEARCH_ALT);
},postCreate:function(){
this.inherited(arguments);
this.changeScope(this.defaultSearchScope);
},buildPopup:function(_1b){
var app=this.app;
var _1c=this;
var _1d=this.scopes;
var _1e=this.controls;
for(var i=0;i<_1d.length;i++){
var _1f=_1d[i];
var _20=_1e[i];
if(!_1f.isValid(app,app.scene)){
if(_20){
_1b.removeChild(_20);
lconn.share.util.misc.destroy(_20);
delete _1e[i];
}
continue;
}
if(!_20||_1f.getLabel||_1f.getTitle){
if(_20){
lconn.share.util.misc.destroy(_20);
}
if(_1f.separator){
_20=_1e[i]=new dijit.MenuSeparator();
}else{
var _21=_1f.getLabel?_1f.getLabel(app,app.scene):_1f.label;
var _22=_1f.getTitle?_1f.getTitle(app,app.scene):_1f.title;
_20=_1e[i]=new dijit.MenuItem({baseClass:dojo._isBodyLtr()?"qkrSearchScope":"dijitMenuItemRtl qkrSearchScope",iconClass:_1f.iconClass,label:_21||"",title:_22||"",onClick:dojo.hitch(_1c,_1c.changeScope,_1f)});
if(_1f.onClick){
dojo.connect(_20,"onClick",null,dojo.hitch(_1f,_1f.onClick,_1c.app));
}
}
}
_1b.addChild(_20);
}
},onTextFocus:function(){
if(!this.hasInput){
this.hasInput=true;
this.style.color="#000";
this.value="";
}
},onTextBlur:function(){
if(this.value==""){
this.hasInput=false;
this.value=this.defaultText||"";
}
},getCurrentScope:function(){
return this.currentScope;
},changeScope:function(_23){
var app=this.app;
if(typeof _23=="string"){
_23=dojo.filter(this.scopes,function(s){
return s.id==_23;
})[0];
}
if(!_23||!_23.isValid(app,app.scene)){
_23=this.scopes[0];
}
var i;
var d=document;
var ip=this.people;
var is=this.simpleInputNode;
var _24=this.buttonCell;
var _25=!!dojo.getObject("lconn.files.config.isCloudMode");
this.currentScope=_23;
lconn.share.util.html.removeChildren(this.scopeLabel);
var _26=_23.getLabel?_23.getLabel(app,app.scene):_23.label;
this.scopeLabel.appendChild(d.createTextNode(_26));
this.scopeIcon.className="lotusIcon "+_23.iconClass;
if(_23.typeahead=="people"){
this.TAdisable=true;
ip.domNode.style.display="";
ip.hintText=_23.hintText||"";
if(is){
is.style.display="none";
}
if(_25&&_24){
_24.style.display="none";
}
i=this.inputNode=ip.textbox;
ip.updateHintText(_23.hintText||"");
}else{
this.TAdisable=false;
is.style.display="";
if(_25&&_24){
_24.style.display="";
}
if(ip){
ip.domNode.style.display="none";
}
i=this.inputNode=is;
i.defaultText=_23.hintText||"";
i.title=_23.hintText||this._strings.SEARCH_ALT;
if(!i.hasInput){
i.value=i.defaultText;
}
}
this.TAupdateCurrentScope();
},selectPerson:function(_27){
var _28=this.getCurrentScope();
var _29=dojo._toArray(arguments);
_29.splice(0,1);
var _2a=this.userSearchAdapter.getSelected(_27,_29);
if(_28.onSelect){
_28.onSelect.apply(_28,[_2a]);
}
},search:function(e){
if(e){
dojo.stopEvent(e);
}
var _2b=this.inputNode;
var _2c=_2b.value;
if(!_2b.hasInput||lconn.share.util.text.trim(_2c).length==0){
return;
}
var _2d=this.getCurrentScope();
if(_2d.onSearch){
_2d.onSearch(this.inputNode.value);
}
},setValue:function(_2e){
if(this.simpleInputNode){
this.onTextFocus.apply(this.simpleInputNode,[]);
}
this.inputNode.value=_2e;
},reset:function(){
},TAisPlaceholderActive:function(){
return !this.TAtextField.hasInput;
}});
}

dojo.provide("lconn.share.search.nls.PeopleFinderService")._built=true;
dojo.provide("lconn.share.search.nls.PeopleFinderService.en_us");
lconn.share.search.nls.PeopleFinderService.en_us={"FILES_BY_PERSONS":"FILES BELONGING TO..."};

;if(!dojo._hasResource["lconn.share.search.PeopleFinderService"]){
dojo._hasResource["lconn.share.search.PeopleFinderService"]=true;
dojo.provide("lconn.share.search.PeopleFinderService");






dojo.requireLocalization("lconn.share.search","PeopleFinderService");
dojo.declare("lconn.share.search.PeopleFinderService",[lconn.core.peopleFinder.directory.PeopleFinderService],{postMixInProperties:function(){
this.inherited(arguments);
this.strings=dojo.i18n.getLocalization("lconn.share.search","PeopleFinderService");
dojo.mixin(this,this.strings);
},postCreate:function(){
this.inherited(arguments);
this.header.innerHTML=this.FILES_BY_PERSONS;
},entrySelected:function(_1,_2){
if(_2){
dojo.stopEvent(_2);
}
},entryClicked:function(_3,_4){
if(_4&&_3.hiddenLinkNode.contains(_4.target)){
dojo.stopEvent(_4);
this.entrySelected(_3,_4);
}
}});
}


;if(!dojo._hasResource["lconn.share.search.SearchPaneManager"]){
dojo._hasResource["lconn.share.search.SearchPaneManager"]=true;
dojo.provide("lconn.share.search.SearchPaneManager");














(function(){
if(typeof lconn.search=="undefined"||typeof lconn.search.searchPanel=="undefined"){
return;
}
var _1=com.ibm.lconn.layout.insights.tracker.getInstance("search");
if(!lconn.core.config.features("search-panel-ui-insights")){
_1={track:function(){
}};
}
dojo.declare("lconn.share.search.SearchPaneManager",[lconn.search.searchPanel.SearchPaneManager],{postCreate:function(){
this._initServices();
var _2=this.servicesList;
this.servicesList=[];
for(var i=0;i<_2.length;i++){
var _3=_2[i];
if(lconn.core.peopleFinder.directory.PeopleFinderService.prototype.isPrototypeOf(_3)){
_3.destroy();
_3=new lconn.share.search.PeopleFinderService({isFocusable:true,SEARCH_PANE_COUNT_ID:"PEOPLE_FINDER_ANNOUNCEMENT"});
_3.startup();
this.connect(_3,"entryClicked",function(_4,_5){
if(_5.currentTarget&&_5.currentTarget.href&&_5.currentTarget.href.match(/^mailto:/i)){
_1.track("panel.clickPFMail",{confidence:_4.confidence});
}else{
_1.track("panel.clickPFEntry",{confidence:_4.confidence});
}
});
this.connect(_3,"entrySelected","onPersonClick");
}
this.servicesList.push(_3);
}
this.inherited(arguments);
},onPersonClick:function(_6,_7){
this.searchPane.hide();
}});
})();
}


;if(!dojo._hasResource["lconn.share.widget.SearchPanel"]){
dojo._hasResource["lconn.share.widget.SearchPanel"]=true;
dojo.provide("lconn.share.widget.SearchPanel");






dojo.declare("lconn.share.widget.SearchPanel",[dijit._Widget],{postMixInProperties:function(){
this.inherited(arguments);
this.scopes=this.scopes||[];
},buildRendering:function(){
this._renderSearchPanel();
},_renderSearchPanel:function(){
var _1=document.body.classList.contains("scloud3")?document.getElementById("ocsBanner"):document.getElementById("lotusBanner");
if(_1&&dojo.position(_1).h>0){
var el=this.domNode=this.srcNodeRef;
this.currentScope=this.decorateScope(this.defaultSearchScope);
this.searchPanel=new lconn.share.search.SearchPaneManager({localOptions:[this.currentScope],onSubmit:dojo.hitch(this,"search")},el);
this.connect(this.searchPanel,"onPersonClick",function(_2,_3){
if(_2&&_2.userId){
var _4=this.decorateScope("person");
_4.onSelect({id:_2.userId});
}
});
}else{
setTimeout(dojo.hitch(this,"_renderSearchPanel"),1);
}
},getCurrentScope:function(){
return this.currentScope;
},search:function(e){
if(e){
dojo.stopEvent(e);
}
if(this.searchPanel.getSelectedOption().scope==this.searchPanel.globalScope.scope){
return true;
}
this.searchPanel.setSearchBarMode(true);
var _5=this.getCurrentScope();
if(_5.onSearch){
_5.onSearch(this.searchPanel.searchBar.getTextValue());
}
return false;
},changeScope:function(_6){
this.currentScope=this.decorateScope(_6);
this.searchPanel.setLocalOptions(this.currentScope);
},setValue:function(_7){
if(!dojo.exists("searchPanel.searchBar.setTextValue",this)){
console.warn("searchPanel.searchBar.setTextValue is not defined.");
return;
}
this.searchPanel.searchBar.setTextValue();
},reset:function(){
this.setValue("");
if(!dojo.exists("searchPanel.setSearchBarMode",this)){
console.warn("searchPanel.setSearchBarMode is not defined.");
return;
}
this.searchPanel.setSearchBarMode(false);
},decorateScope:function(_8){
var _9=this.app;
if(typeof _8=="string"){
_8=dojo.filter(this.scopes,function(s){
return s.id==_8;
})[0];
}
if(!_8||!_8.isValid(_9,_9.scene)){
_8=this.scopes[0];
}
if(_8.getLabel){
_8.label=_8.getLabel(_9,_9.scene);
}
return _8;
}});
}


;if(!dojo._hasResource["lconn.files.widget.RecentPeopleLauncher"]){
dojo._hasResource["lconn.files.widget.RecentPeopleLauncher"]=true;
dojo.provide("lconn.files.widget.RecentPeopleLauncher");




dojo.declare("lconn.files.widget.RecentPeopleLauncher",lconn.core.widget.MenuLauncher,{openDelay:250,hideDelay:400,orient:{"BR":"TR","TR":"BR"},orientRTL:{"BL":"TL","TL":"BL"},_initMenu:function(){
return lconn.share.requireAsync("lconn.share.widget.tooltip.PeopleList").addCallback(this,function(){
var _1=this.app;
this.menu=new lconn.share.widget.tooltip.PeopleList({autofocus:false,net:_1.net,id:this.menuId,title:_1.nls.RECENT_SHARES.TITLE,href:_1.routes.getMySharedWithUsersServiceListUrl(),generateLinkToPerson:dojo.partial(lconn.files.scenehelper.generateInactiveUserLink,_1,_1.routes),label:_1.nls.LOADING,nls:_1.nls.RECENT_SHARES});
});
},buildRendering:function(){
this.domNode=this.popupStateNode=this.srcNodeRef;
this.connect(this,"onClick","_onClick");
this.menuId=this.menuId||dojo.attr(this.domNode,"aria-owns")||dojo.attr(this.domNode,"aria-describedby")||(this.id?(this.id+"_popup"):dijit.getUniqueId("ml"));
this.externalContent=dojo.attr(this.domNode,"external-content");
delete this.srcNodeRef;
},onClose:function(){
this.menu.destroy();
this.menu=null;
this._initDfd=null;
}});
}


;if(!dojo._hasResource["lconn.files.widget.Titlebar"]){
dojo._hasResource["lconn.files.widget.Titlebar"]=true;
dojo.provide("lconn.files.widget.Titlebar");


dojo.declare("lconn.files.widget.Titlebar",[dijit._Widget],{appName:{},globalAction:{},sceneHeader:{},searchBox:null,_showAppName:null,constructor:function(_1){
this._app=_1.app;
this._searchOpts=_1.searchOpts;
this._showAppName=_1.showAppName;
},postMixInProperties:function(){
},buildRendering:function(){
this.inherited(arguments);
var _2=this._app.routes;
var _3=this.domNode;
_3.className="lotusTitleBar";
var _4=document.createElement("div");
_4.className="lotusRightCorner";
var _5=document.createElement("div");
_5.className="lotusInner";
var h2=this.appName.domNode=dojo.create("h2",{className:"lotusHeading",style:"display : none"},_5);
if(this._showAppName){
dojo.style(h2,"display","block");
dojo.create("img",{className:"iconsComponentsBlue24 iconsComponentsBlue24-FilesBlue24 lotusIcon","alt":"",src:dojo.config.blankGif},h2);
var _6=dojo.create("span",{className:"lotusText"},h2);
var a=dojo.create("a",{href:_2.getGlobalHomeUrl()},_6);
a.appendChild(document.createTextNode(this._app.nls.APP_NAME_TITLE_BAR));
dijit.setWaiState(a,"label",this._app.nls.APP_NAME_TITLE_BAR_LABEL);
}
var _7=this.globalAction.domNode=document.createElement("div");
_7.className="lotusColLeft";
_5.appendChild(_7);
var _8=this.sceneHeader.domNode=document.createElement("div");
_8.className="lotusHeader";
_8.id="lotusContentHeaderTitleBar";
if(dojo._isBodyLtr()){
dojo.style(_8,"float","left");
}else{
dojo.style(_8,"float","right");
}
dojo.style(_8,"width","55%");
var h1=this.sceneHeader.sceneTitleNode=document.createElement("h1");
h1.id="scene-title";
dijit.setWaiState(h1,"live","polite");
_8.appendChild(h1);
_5.appendChild(_8);
var _9=document.createElement("div");
dojo.style(_9,"float","right");
this.searchBox=lconn.share.scenehelper.applySearchBox(document,_9,this._app,this._searchOpts);
_5.appendChild(_9);
_4.appendChild(_5);
_3.appendChild(_4);
},resetSceneHeader:function(){
if(this.sceneHeader.sceneTitleNode){
dojo.empty(this.sceneHeader.sceneTitleNode);
}
},resetSearchBox:function(){
if(this.searchBox){
this.searchBox.reset();
}
}});
}


;if(!dojo._hasResource["com.ibm.social.layout.widget.ActionBar"]){
dojo._hasResource["com.ibm.social.layout.widget.ActionBar"]=true;
dojo.provide("com.ibm.social.layout.widget.ActionBar");










dojo.declare("com.ibm.social.layout.widget.ActionBar",[dijit._Widget],{postMixInProperties:function(){
this.actions=this.actions||[];
this.actionElements=this.actionElements||[];
this.selection=this.selection||[];
this.context=this.context||{};
},selectionChanged:function(_1,_2){
this.selection=_1||[];
this.context=_2||{};
var i;
for(i=0;i<this.actionElements.length;i++){
this.updateActionState(this.actionElements[i]);
}
},_onKeyUp:function(_3){
if(_3&&_3.keyCode==dojo.keys.SPACE){
this._onClick(_3);
}
},_onClick:function(_4){
var _5=_4.target;
while(_5&&_5!=this.domNode){
if(this.isActionElement(_5)){
dojo.stopEvent(_4);
this.executeActionElement(_5);
break;
}else{
_5=_5.parentNode;
}
}
},buildRendering:function(){
this.inherited(arguments);
var i;
this.domNode.style.display="none";
for(i=0;i<this.actions.length;i++){
this.domNode.appendChild(this.renderAction(this.actions[i]));
}
this.connect(this.domNode,"onclick","_onClick");
this.connect(this.domNode,"onkeyup","_onKeyUp");
},destroy:function(){
if(this.actionElements){
for(var _6=0;_6<this.actionElements.length;_6++){
if(this.actionElements[_6]&&typeof this.actionElements[_6].menu!=="undefined"&&this.actionElements[_6].menu){
this.actionElements[_6].menu.destroy();
}
}
}
delete this.actionElements;
this.inherited(arguments);
},addAll:function(_7,_8){
dojo.forEach(_7,function(_9){
this.addAction(_9,_8);
},this);
},addAction:function(_a,_b){
var _c=this.actions;
var _d=this.domNode;
var _e=this.renderAction(_a);
if(_b){
_c.unshift(_a);
dojo.place(_e,_d,"first");
}else{
_c.push(_a);
dojo.place(_e,_d);
}
},renderAction:function(_f){
var d=document;
var el=d.createElement("button");
el.className="lotusBtn";
dijit.setWaiRole(el,"button");
el.id=dijit.getUniqueId(_f.getId());
if(_f.canHaveChildren&&_f.canHaveChildren()){
dijit.setWaiState(el,"hasPopup",true);
el.appendChild(d.createTextNode(" "));
var img=d.createElement("img");
img.alt="";
img.src=this._blankGif;
img.className="lotusArrow lotusDropDownSprite";
el.appendChild(img);
}
if((_f.canHaveChildren&&_f.canHaveChildren())||dojo.isFunction(_f.getImgAltText)){
var _10=d.createElement("span");
_10.className="lotusAltText";
var _11="\u25bc";
if(dojo.isFunction(_f.getImgAltText)){
_11=_f.getImgAltText();
}
_10.appendChild(d.createTextNode(_11));
el.appendChild(_10);
}
var _12=d.createElement("span");
_12.id=el.id+"_JawsReadSpan";
_12.className="lotusAccess";
_12.setAttribute("role","status");
el.appendChild(_12);
this.registerActionElement(el,_f);
return el;
},isActionElement:function(_13){
return _13.action;
},registerActionElement:function(_14,_15){
_14.action=_15;
this.updateActionState(_14);
this.actionElements.push(_14);
},executeActionElement:function(_16){
if(_16.loading){
return;
}
var _17=this;
var _18=_16.action;
var _19=_16.state;
if(_19&&(!_19.enabled||!_19.visible)){
return;
}
if(_18.isLoaded()){
if(_19&&_19.enabled&&_19.visible){
_17.executeAction(_18,_16);
}
return;
}else{
_16.loading=true;
_18.load().addBoth(function(){
_16.loading=false;
}).addCallback(function(){
var _1a=_17.updateActionState(_16);
if(_1a&&_1a.enabled&&_1a.visible){
_17.executeAction(_18,_16);
}else{
alert("This action is not available");
}
}).addErrback(function(_1b){
alert(_1b);
});
}
},executeAction:function(_1c,_1d){
try{
var dfd=_1c.execute(this.selection,this.context);
if(dfd&&dfd.addCallback&&dfd.addErrback){
dfd.addCallback(this,"onActionComplete",_1c,_1d).addErrback(function(_1e){
alert("A deferred error occurred while running the action");
console.error(_1e);
});
}
}
catch(e){
alert("An error occurred while running the action");
console.error(e);
}
},updateActionState:function(_1f){
if(!_1f.nodeType){
return _1f.state;
}
var _20=_1f.state||{};
var _21=dojo.clone(_20);
var _22=_1f.action;
_22.selectionChanged(_21,this.selection,this.context);
var _23=_1f.state=_21;
var _24=_1f.menu;
if(_24){
console.log("menu purged");
_24.destroyRecursive();
_1f.menu=null;
}
if(_21.name!=_20.name){
var d=document;
var _25=_1f.actionNameNode;
if(!_25){
_25=_1f.firstChild;
if(!_25||_25.nodeType!=3){
_25=_1f.insertBefore(document.createTextNode(""),_1f.firstChild);
}
}
var _26=d.createTextNode(_23.name||"");
_25.parentNode.replaceChild(_26,_25);
_1f.actionNameNode=_26;
}
if(_21.tooltip!=_20.tooltip&&_23.tooltip){
_1f.title=_23.tooltip;
}
if(_21.visible!=_20.visible){
if(_23.visible==false){
_1f.style.display="none";
dijit.setWaiState(_1f,"hidden",true);
}else{
_1f.style.display="";
dijit.removeWaiState(_1f,"hidden");
this.domNode.style.display="";
}
}
if(_21.enabled!=_20.enabled){
var _27=this;
setTimeout(function(){
_27._updateAriaState(_1f,_23.enabled);
},100);
}
return _21;
},_updateAriaState:function(_28,_29){
var _2a=dojo.byId(_28.id+"_JawsReadSpan");
if(_29){
dojo.removeClass(_28,"lotusBtnDisabled");
if(_2a){
_2a.innerHTML=_28.action.getEnableActionString()||"";
}
}else{
dojo.addClass(_28,"lotusBtnDisabled");
if(_2a){
_2a.innerHTML=_28.action.getDisableActionString()||"";
}
}
dijit.setWaiState(_28,"disabled",!_29);
},onActionComplete:function(_2b,_2c,_2d){
if(_2d instanceof dojo.Deferred){
_2d.addCallback(this,"onActionComplete",_2b,_2c);
}else{
if(_2b.canHaveChildren()){
this.openMenu(_2b,_2c,_2d);
}else{
if(_2d!==undefined){
console.log("Result:",_2d);
}
}
}
},openMenu:function(_2e,_2f,_30){
var _31=_2f.menu;
if(!_31){
var _31=_2f.menu=new dijit.Menu({},dojo.create("span"));
dojo.addClass(_31.domNode,"lotusActionMenu lotusPlain");
if(this.menuClass){
dojo.addClass(_31.domNode,this.menuClass);
}
var i,_32,_33=0;
for(i=0,_2e;_2e=_30[i];i++){
if(!_2e.canHaveChildren()){
var _34={};
_2e.selectionChanged(_34,this.selection,this.context);
if(_34.visible){
_32=new dijit.MenuItem({label:_34.name,id:dijit.getUniqueId(_2e.getId()),disabled:!_34.enabled,title:_34.tooltip,state:_34,action:_2e});
_32.onClick=dojo.hitch(this,"executeActionElement",_32);
_31.addChild(_32);
if(_2e.addDivider){
_31.addChild(new dijit.MenuSeparator({}));
}
this.registerActionElement(_32,_2e);
_33++;
}
}else{
if(dojo.config.isDebug){
console.debug("Sub menus not yet supported");
}
}
}
if(_33==0){
_31.addChild(new dijit.MenuItem({label:"No actions available",disabled:true}));
}
}
com.ibm.oneui.util.openAround(_31,_2f);
},setActionBarButtonContainerVisibility:function(_35){
this.domNode.style.display="none";
if(this.actionElements){
for(var ind=0;ind<this.actionElements.length;ind++){
if(_35&&this.actionElements[ind].style.display==""){
this.domNode.style.display="";
}
}
}
}});
}


;if(!dojo._hasResource["lconn.files.util.machine"]){
dojo._hasResource["lconn.files.util.machine"]=true;
dojo.provide("lconn.files.util.machine");
lconn.files.util.machine.executeGroup=function(_1,_2,_3,_4){
var _5=_4.startGroup;
var _6=_4.endGroup;
var _7=[];
var _8=_5?_5(_1,_4):null;
if(_2){
var _9=[];
var _a=_4.file;
dojo.forEach(_1,function(_b){
if(_2(_b)){
if(_9.length>0){
_6(_9,_4,_8);
_9=[];
}
}else{
if(!_b.isValid||_b.isValid(_a)){
_9.push(_b);
_3(_b,_4,_8);
}
}
});
if(_9.length>0){
_6(_9,_4,_8);
}
}else{
if(_1.length>0){
_6(_1,_4,_8);
}
}
};
}


;if(!dojo._hasResource["lconn.files.descriptions"]){
dojo._hasResource["lconn.files.descriptions"]=true;
dojo.provide("lconn.files.descriptions");


lconn.files.descriptions={get:function(s){
var _1=dojo._toArray(arguments);
var _2=[];
_1.unshift(_2);
var _3=lconn.core.uiextensions.get("lconn/files/desc/"+s)||[];
for(var i=0,l=_3.length;i<l;i++){
_3[i].apply(null,_1);
}
return _2;
}};
}


;if(!dojo._hasResource["lconn.files.scenehelper"]){
dojo._hasResource["lconn.files.scenehelper"]=true;
dojo.provide("lconn.files.scenehelper");
















































lconn.files.scenehelper=dojo.delegate(lconn.share.scenehelper,{});
(function(_1){
_1.getSearchScopes=function(_2){
if(lconn.files.scenes.SEARCH_SCOPES){
return lconn.files.scenes.SEARCH_SCOPES;
}
var _3=_2.nls.SEARCH;
var _4=(dojo.getObject("lconn.files.config.services.featureSearch")==true)&&!dojo.getObject("lconn.files.config.isCloudMode");
var _5=[{id:"myfiles",label:_3.SCOPE_MY_FILES.LABEL,title:_3.SCOPE_MY_FILES.HOVER,iconClass:"lconnSprite lconnSprite-iconText16",hintText:_3.SCOPE_MY_FILES.HINT,isValid:function(_6,_7){
return _6.authenticatedUser&&lconn.share.config.services.connections.enabled.search;
},onSearch:function(_8){
_2.navigate(_2.routes.getUserChannelUrl(_2.authenticatedUser.id,{search:_8}));
},feature:"files",scope:_3.SCOPE_MY_FILES.HINT},{id:"withme",label:_3.SCOPE_SHARED_WITH_ME_FILES.LABEL,title:_3.SCOPE_SHARED_WITH_ME_FILES.HOVER,iconClass:"lconnSprite lconnSprite-iconText16",hintText:_3.SCOPE_SHARED_WITH_ME_FILES.HINT,isValid:function(_9,_a){
return _9.authenticatedUser&&lconn.share.config.services.connections.enabled.search;
},onSearch:function(_b){
_2.navigate(_2.routes.getUserSharesUrl({search:_b}));
},feature:"files",scope:_3.SCOPE_SHARED_WITH_ME_FILES.HINT},{id:"files",component:"files",label:_3.SCOPE_ALL_FILES.LABEL,title:_3.SCOPE_ALL_FILES.HOVER,iconClass:"lconnSprite lconnSprite-iconText16",hintText:_3.SCOPE_ALL_FILES.HINT,isValid:function(_c,_d){
return lconn.share.config.services.connections.enabled.search;
},onSearch:function(_e){
_2.navigate(_2.routes.getAllFilesSearchUrl({search:_e}));
},feature:"files",scope:_3.SCOPE_ALL_FILES.HINT},{id:"thisuser",label:_3.SCOPE_THESE_FILES.LABEL,title:_3.SCOPE_THESE_FILES.HOVER,iconClass:"lconnSprite lconnSprite-iconText16",hintText:_3.SCOPE_THESE_FILES.HINT,isValid:function(_f,_10){
return _10.userId&&!_10.isPersonalHome&&lconn.share.config.services.connections.enabled.search;
},onSearch:function(_11){
_2.navigate(_2.routes.getUserChannelUrl(_2.scene.user.id,{search:_11}));
},feature:"files",scope:_3.SCOPE_THESE_FILES.HINT},{id:"collections",getLabel:function(app,_12){
return dojo.getObject("activePivot.name",false,_12)||_3.SCOPE_FOLDERS.LABEL;
},iconClass:"lconnSprite lconnSprite-iconFolderClose16",hintText:_3.SCOPE_FOLDERS.HINT,isValid:function(app,_13){
return _13.declaredClass=="lconn.files.scenes.Collections";
},onSearch:function(_14){
_2.navigate(_2.routes.getCollectionsUrl({pivot:dojo.getObject("scene.activePivot.id",false,_2),name:_14}));
},feature:"files",scope:_3.SCOPE_FOLDERS.HINT},{id:"person",typeahead:"people",label:_2.nls.SEARCH.PEOPLE,title:_3.SCOPE_PERSON.HOVER,iconClass:"lconnSprite lconnSprite lconnSprite-iconProfiles16",hintText:dojo.getObject("lconn.share.config.services.typeahead.hintText")||_3.SCOPE_PERSON.HINT,onSelect:dojo.partial(_1.onSelectUser,_2),isValid:function(){
return true;
},onSearch:dojo.partial(_1.onSearchUser,_2),feature:"files",scope:dojo.getObject("lconn.share.config.services.typeahead.hintText")||_3.SCOPE_PERSON.HINT},{id:"all",label:_3.SCOPE_CONNECTIONS_ALL.LABEL,title:_3.SCOPE_CONNECTIONS_ALL.HOVER,iconClass:"lconnSprite lconnSprite-iconConnections16",hintText:_3.HINT,onSearch:dojo.partial(_1.onSearchConnectionsComponent,_2),isValid:function(app,_15){
return lconn.share.config.services.connections.enabled.search;
},feature:"files",scope:_3.HINT}];
if(_4){
_5=_5.concat([{separator:true,isValid:function(app,_16){
return lconn.share.config.services.connections.enabled.search;
}},{id:"all",label:_3.SCOPE_CONNECTIONS_ALL.LABEL,title:_3.SCOPE_CONNECTIONS_ALL.HOVER,iconClass:"lconnSprite lconnSprite-iconConnections16",hintText:_3.HINT,onSearch:dojo.partial(_1.onSearchConnectionsComponent,_2),isValid:function(app,_17){
return lconn.share.config.services.connections.enabled.search;
}},{id:"activities",label:_3.SCOPE_CONNECTIONS_ACTIVITIES.LABEL,title:_3.SCOPE_CONNECTIONS_ACTIVITIES.HOVER,iconClass:"lconnSprite lconnSprite-iconActivities16",hintText:_3.HINT,component:"activities",onSearch:dojo.partial(_1.onSearchConnectionsComponent,_2),isValid:function(app,_18){
return lconn.share.config.services.connections.enabled.search&&lconn.share.config.services.connections.enabled.activities;
}},{id:"blogs",component:"blogs",label:_3.SCOPE_CONNECTIONS_BLOGS.LABEL,title:_3.SCOPE_CONNECTIONS_BLOGS.HOVER,iconClass:"lconnSprite lconnSprite-iconBlogs16",hintText:_3.HINT,onSearch:dojo.partial(_1.onSearchConnectionsComponent,_2),isValid:function(app,_19){
return lconn.share.config.services.connections.enabled.search&&lconn.share.config.services.connections.enabled.blogs;
}},{id:"dogear",component:"dogear",label:_3.SCOPE_CONNECTIONS_DOGEAR.LABEL,title:_3.SCOPE_CONNECTIONS_DOGEAR.HOVER,iconClass:"lconnSprite lconnSprite-iconBookmarks16",hintText:_3.HINT,onSearch:dojo.partial(_1.onSearchConnectionsComponent,_2),isValid:function(app,_1a){
return lconn.share.config.services.connections.enabled.search&&lconn.share.config.services.connections.enabled.dogear;
}},{id:"communities",component:"communities",label:_3.SCOPE_CONNECTIONS_COMMUNITIES.LABEL,title:_3.SCOPE_CONNECTIONS_COMMUNITIES.HOVER,iconClass:"lconnSprite lconnSprite-iconCommunities16",hintText:_3.HINT,onSearch:dojo.partial(_1.onSearchConnectionsComponent,_2),isValid:function(app,_1b){
return lconn.share.config.services.connections.enabled.search&&lconn.share.config.services.connections.enabled.communities;
}},{id:"forums",label:_3.SCOPE_CONNECTIONS_FORUMS.LABEL,title:_3.SCOPE_CONNECTIONS_FORUMS.HOVER,iconClass:"lconnSprite lconnSprite-iconForums16",hintText:_3.HINT,component:"forums",onSearch:dojo.partial(_1.onSearchConnectionsComponent,_2),isValid:function(app,_1c){
return lconn.share.config.services.connections.enabled.search&&lconn.share.config.services.connections.enabled.forums;
}},{id:"profiles",component:"profiles",label:_3.SCOPE_CONNECTIONS_PROFILES.LABEL,title:_3.SCOPE_CONNECTIONS_PROFILES.HOVER,iconClass:"lconnSprite lconnSprite-iconProfiles16",hintText:_3.HINT,onSearch:dojo.partial(_1.onSearchConnectionsComponent,_2),isValid:function(app,_1d){
return lconn.share.config.services.connections.enabled.search&&lconn.share.config.services.connections.enabled.profiles;
}},{id:"wikis",component:"wikis",label:_3.SCOPE_CONNECTIONS_WIKIS.LABEL,title:_3.SCOPE_CONNECTIONS_WIKIS.HOVER,iconClass:"lconnSprite lconnSprite-iconWikis16",hintText:_3.HINT,onSearch:dojo.partial(_1.onSearchConnectionsComponent,_2),isValid:function(app,_1e){
return lconn.share.config.services.connections.enabled.search&&lconn.share.config.services.connections.enabled.wikis;
}}]);
}
lconn.files.scenes.SEARCH_SCOPES=_5;
var _1f=dojo.getObject("lconn.share.config.services.externalSearchScopes")||[];
if(_1f.length){
_5.push({separator:true,isValid:function(app,_20){
return true;
}});
for(var i=0;i<_1f.length;i++){
var se=_1f[i];
_5.push({id:"custom"+i,label:se.label||"",title:se.label||"",iconClass:se.iconClass||"",onSearch:dojo.partial(_1.onExternalScopeSearch,_2,se.action,se.param||"query"),isValid:function(app,_21){
return true;
}});
}
}
_5.push({separator:true,isValid:function(app,_22){
return lconn.share.config.services.connections.enabled.search;
}},{id:"advanced",label:_3.SCOPE_CONNECTIONS_ADVANCED.LABEL,title:_3.SCOPE_CONNECTIONS_ADVANCED.HOVER,iconClass:"",onClick:function(app){
app.navigate(app.routes.getConnectionsSearchUrl(null,{advanced:true}));
},isValid:function(app,_23){
return lconn.share.config.services.connections.enabled.search;
}});
if(lconn.share.util.configUtil.isSearchPanelEnabled(_2.authenticatedUser)){
_5.push({separator:true,isValid:function(app,_24){
return lconn.share.config.services.connections.enabled.search;
}},{id:"communityfiles",label:_3.SCOPE_COMMUNITY_FILES.LABEL,title:_3.SCOPE_COMMUNITY_FILES.HOVER,iconClass:"lconnSprite lconnSprite-iconText16",hintText:_3.SCOPE_COMMUNITY_FILES.HINT,isValid:function(app,_25){
return lconn.share.config.services.connections.enabled.search;
},onSearch:function(_26){
_2.navigate(_2.routes.getCommunityFilesUrl({search:_26}));
},feature:"files",scope:_3.SCOPE_COMMUNITY_FILES.HINT});
}
return _5;
};
var _27=function(id,_28,nls){
this.id=id;
this.interval=_28;
this.name=nls.NAME;
this.longName=nls.LONG;
this.tooltip=nls.TOOLTIP;
};
_27.prototype={setServiceOptions:function(_29){
if(this.interval==-1){
var now=new Date();
now.setHours(0);
now.setMinutes(0);
now.setSeconds(0);
now.setMilliseconds(0);
_29.startDate=now.getTime();
}else{
var now=new Date().getTime()-this.interval;
_29.startDate=now;
}
},removeAppParams:function(_2a){
delete _2a.date;
}};
_1.applyDownloadLink=function(app,_2b,a,d,opt){
var _2c=lconn.share.config.downloadFile;
opt=opt||{};
opt.d=d;
opt.a=a;
opt.app=opt.app||app;
opt.nls=opt.app.nls;
a.href="javascript:;";
if(!_2c||!_2c.isValid||!_2c.isValid(_2b,opt)){
dojo.connect(a,"onclick",dojo.partial(_1.downloadFile,_2b,opt));
}else{
dojo.connect(a,"onclick",dojo.partial(_2c.execute,_2b,opt));
}
};
_1.applyFileDescriptions=function(app,_2d,_2e,d,el,opt){
var _2f=function(_30,opt,ul){
var li=ul.appendChild(d.createElement("li"));
_30.render(app,_2d,d,li,opt);
};
var _31=function(){
var ul=d.createElement("ul");
ul.className="lotusInlinelist";
return ul;
};
var _32=function(_33,opt,ul){
dojo.query("li",ul)[0].className="lotusFirst";
el.appendChild(ul);
};
lconn.files.util.machine.executeGroup(_2e,function(_34){
return _34.id=="breakLine";
},_2f,{file:_2d,startGroup:_31,endGroup:_32});
};
_1.getChannelFilters=function(app){
if(lconn.files.scenes.CHANNEL_FILTERS){
return lconn.files.scenes.CHANNEL_FILTERS;
}
var nls=app.nls.FILTERS;
var _35=dojo.getObject("authenticatedUser.orgName",false,app)||app.nls.ORGNAME_DEFAULT;
lconn.files.scenes.CHANNEL_FILTERS={SHARE:[{id:"public",name:dojo.string.substitute(nls.SHARE.PUBLIC,{company:_35}),longName:dojo.string.substitute(nls.SHARE.PUBLIC_LONG,{company:_35}),tooltip:dojo.string.substitute(nls.SHARE.PUBLIC_TOOLTIP,{company:_35}),setServiceOptions:function(_36){
_36.visibility="public";
},isValid:function(app,_37){
return !!app.authenticatedUser&&dojo.getObject("hints.hasPublicContent",false,_37)!==false;
},removeAppParams:function(_38){
delete _38.sharing;
}},{id:"shared",name:nls.SHARE.SELECTIVE,longName:dojo.string.substitute(nls.SHARE.SELECTIVE_LONG,{company:_35}),tooltip:dojo.string.substitute(nls.SHARE.SELECTIVE_TOOLTIP,{company:_35}),setServiceOptions:function(_39){
_39.visibility=this.id;
},isValid:function(app,_3a){
return !!app.authenticatedUser;
},removeAppParams:function(_3b){
delete _3b.sharing;
}},{id:"private",name:nls.SHARE.PRIVATE,longName:nls.SHARE.PRIVATE_LONG,tooltip:nls.SHARE.PRIVATE_TOOLTIP,isValid:function(app,_3c){
return _3c.hasPrivateFiles;
},setServiceOptions:function(_3d){
_3d.visibility=this.id;
},removeAppParams:function(_3e){
delete _3e.sharing;
}}],TYPE:[{id:"files",name:nls.TYPE.FILES,longName:nls.TYPE.FILES_LONG,tooltip:nls.TYPE.FILES_TOOLTIP,setServiceOptions:function(_3f){
_3f.category="document";
},removeAppParams:function(_40){
delete _40.type;
},isValid:function(app,_41){
return dojo.getObject("lconn.share.config.features.richText");
}},{id:"pages",name:nls.TYPE.PAGES,longName:nls.TYPE.PAGES_LONG,tooltip:nls.TYPE.PAGES_TOOLTIP,setServiceOptions:function(_42){
_42.category="page";
},removeAppParams:function(_43){
delete _43.type;
},isValid:function(app,_44){
return dojo.getObject("lconn.share.config.features.richText");
}}],DATE:[new _27("today",-1,nls.DATE.TODAY),new _27("lastweek",7*24*60*60*1000,nls.DATE.LASTWEEK),new _27("lastmonth",31*24*60*60*1000,nls.DATE.LASTMONTH),new _27("lastyear",365*24*60*60*1000,nls.DATE.LASTYEAR)],DATE_CREATED:[new _27("today",-1,nls.DATE_CREATED.TODAY),new _27("lastweek",7*24*60*60*1000,nls.DATE_CREATED.LASTWEEK),new _27("lastmonth",31*24*60*60*1000,nls.DATE_CREATED.LASTMONTH),new _27("lastyear",365*24*60*60*1000,nls.DATE_CREATED.LASTYEAR)],DATE_SHARED:[new _27("today",-1,nls.DATE_SHARED.TODAY),new _27("lastweek",7*24*60*60*1000,nls.DATE_SHARED.LASTWEEK),new _27("lastmonth",31*24*60*60*1000,nls.DATE_SHARED.LASTMONTH),new _27("lastyear",365*24*60*60*1000,nls.DATE_SHARED.LASTYEAR)]};
return lconn.files.scenes.CHANNEL_FILTERS;
};
_1.applyClear=function(d,el){
var _45=d.createElement("div");
_45.className="lotusClear";
_45.innerHTML="<!-- IE -->";
el.appendChild(_45);
};
lconn.share.scenehelper.reuseTitleBar=function(d,el,app,opt){
if(lconn.share.util.configUtil.isTitlebarEnabledForNestedFolder(app.authenticatedUser)){
if(dojo.exists("layout.titleBar",app)){
var _46=app.layout.titleBar;
var _47=_46.searchBox;
var _48=[];
if(dojo.exists("scene.activeFilters",app)){
_48=dojo.filter(app.scene.activeFilters,function(_49){
if(_49.id==="name"||_49.id==="search"){
return true;
}else{
return false;
}
});
}
if(_48.length==0){
_47.reset();
}
_47.changeScope(opt?opt.defaultSearchScope:null);
if(app.scene&&app.scene.params&&app.scene.params.search){
_47.setValue(app.scene.params.search);
}
}else{
lconn.share.scenehelper.applyTitleBar(d,el,app,opt);
}
return;
}
var _4a=opt&&opt.activeTab?opt.activeTab:null;
dojo.query("UL.lotusTabs > LI",el).forEach(function(li){
li.className=(_4a==li._id)?"lotusSelected":"";
});
var _47=dijit.byId("quickSearch");
if(dojo.exists("layout.titleBar.searchBox",app)){
_47=app.layout.titleBar.searchBox;
}
_47.changeScope(opt?opt.defaultSearchScope:null);
if(app.scene&&app.scene.params&&app.scene.params.search){
_47.setValue(app.scene.params.search);
}
};
lconn.share.scenehelper.applyTitleBar=function(d,el,app,opt){
if(lconn.share.util.configUtil.isTitlebarEnabledForNestedFolder(app.authenticatedUser)){
var _4b=new lconn.files.widget.Titlebar({"app":app,"searchOpts":opt},el);
dojo.mixin(app,{"layout":{"titleBar":_4b}});
return _4b;
}
var _4c=app.routes;
var _4d=opt&&opt.activeTab?opt.activeTab:null;
var _4e=d.createElement("div");
_4e.className="lotusRightCorner";
var _4f=d.createElement("div");
_4f.className="lotusInner";
if(app.showApplicationName){
var h2=dojo.create("h2",{className:"lotusHeading"},_4f);
dojo.create("img",{className:"iconsComponentsBlue24 iconsComponentsBlue24-FilesBlue24 lotusIcon","alt":"",src:dojo.config.blankGif},h2);
var _50=dojo.create("span",{className:"lotusText"},h2);
var a=dojo.create("a",{href:_4c.getGlobalHomeUrl()},_50);
a.appendChild(d.createTextNode(app.nls.APP_NAME_TITLE_BAR));
dijit.setWaiState(a,"label",app.nls.APP_NAME_TITLE_BAR_LABEL);
}
var ul=d.createElement("UL");
ul.className="lotusTabs";
dijit.setWaiRole(ul,"navigation toolbar");
if(!app.showApplicationName){
var li=d.createElement("LI");
li._id="files";
var _51=_4d==li._id;
if(_51){
dojo.addClass(li,"lotusSelected");
}
var a=d.createElement("A");
a.href=_4c.getGlobalHomeUrl();
a.appendChild(d.createTextNode(app.nls.HEADER.PEOPLE));
a.title=app.nls.HEADER.PEOPLE_TITLE;
dijit.setWaiRole(a,"button");
dijit.setWaiState(a,"pressed",_51);
li.appendChild(a);
ul.appendChild(li);
}
if(ul.firstChild){
dojo.addClass(ul.firstChild,"lotusFirst");
}
if(ul.firstChild){
_4f.appendChild(ul);
}
lconn.share.scenehelper.applySearchBox(d,_4f,app,opt);
_4e.appendChild(_4f);
el.appendChild(_4e);
},lconn.share.scenehelper.applySearchBox=function(d,el,app,opt){
var _52=_1.getSearchScopes(app);
var _53=_52[0].id;
if(opt&&opt.defaultSearchScope){
_53=opt.defaultSearchScope;
}
var _54=null;
if(lconn.share.util.configUtil.isSearchPanelEnabled(app.authenticatedUser)&&typeof lconn.search!="undefined"&&typeof lconn.search.searchPanel!="undefined"){
var _55=d.createElement("div");
el.appendChild(_55);
_54=new lconn.share.widget.SearchPanel({app:app,scene:app.scene,defaultSearchScope:_53,scopes:_52,_strings:app.nls.CONNSEARCH},_55);
}else{
var _56=d.createElement("FORM");
el.appendChild(_56);
_54=new lconn.share.widget.SearchBox({app:app,defaultSearchScope:_53,scopes:_52,id:"quickSearch",noTypeaheadUpdateOnSelect:true},_56);
}
if(app.scene&&app.scene.params&&app.scene.params.search){
_54.setValue(app.scene.params.search);
}
return _54;
},lconn.share.scenehelper.reusePlaceBar=function(d,el,app){
};
lconn.share.scenehelper.applyGlobalActions=function(d,el,app){
var _57=app.authenticatedUser;
var _58=app.scene;
var _59=dojo.exists("layout.titleBar.globalAction",app)?app.layout.titleBar.globalAction.domNode:el;
_59.style.display="";
var _5a=d.createElement("div");
_5a.className="lotusPlaceBar lotusTitleBarExt lotusGlobalActionBar";
dijit.setWaiRole(_5a,"region");
dijit.setWaiState(_5a,"label",app.nls.CONTENT.GLOBAL_ACTIONS);
var _5b=d.createElement("div");
dijit.setWaiRole(_5b,"toolbar");
dijit.setWaiState(_5b,"label",app.nls.CONTENT.GLOBAL_ACTIONS);
var _5c={actions:app.getGlobalActions(),selection:[_57],context:{},menuClass:"lotusGlobalActionBarMenu"};
this.globalActionBar=new com.ibm.social.layout.widget.ActionBar(_5c,_5b);
new lconn.core.aria.Toolbar(_5b);
_5a.appendChild(_5b);
_59.appendChild(_5a);
return this.globalActionBar;
};
lconn.share.scenehelper.applyPlaceBar=function(d,el,app){
var _5d=app.authenticatedUser;
var _5e=app.scene;
var _5f=_5d&&_5d.hasPersonalPlace==true;
el.style.display="";
var _60=d.createElement("div");
_60.className="lotusRightCorner";
dijit.setWaiRole(_60,"region");
dijit.setWaiState(_60,"label",app.nls.CONTENT.GLOBAL_ACTIONS);
var _61=d.createElement("div");
_61.className="lotusInner";
dijit.setWaiRole(_61,"toolbar");
dijit.setWaiState(_61,"label",app.nls.CONTENT.GLOBAL_ACTIONS);
if(!app.nestedFolderEnabled){
var _62=d.createElement("div");
_62.className="lotusBtnContainer lotusLeft";
dijit.setWaiRole(_62,"toolbar");
dijit.setWaiState(_62,"label",app.nls.CONTENT.GLOBAL_ACTIONS);
this.globalActionBar=new com.ibm.social.layout.widget.ActionBar({actions:app.getGlobalActions(),selection:[_5d],context:{}},_62);
new lconn.core.aria.Toolbar(_62);
_61.appendChild(_62);
}
if(lconn.share.util.configUtil.isRecentPeopleLauncherEnabled(_5d)){
var ul=d.createElement("ul");
ul.className="lotusInlinelist lotusActions lotusRight";
var li=d.createElement("li");
li.className="lotusFirst";
if(_5d){
var a=d.createElement("a");
a.href="javascript:;";
a.style.marginLeft=a.style.marginRight="10px";
a.appendChild(d.createTextNode(app.nls.RECENT_SHARES.ALT));
dijit.setWaiRole(a,"button");
dijit.setWaiState(a,"label",app.nls.RECENT_SHARES.TITLE);
li.appendChild(a);
new lconn.files.widget.RecentPeopleLauncher({app:app},a);
}
ul.appendChild(li);
_61.appendChild(ul);
}
_60.appendChild(_61);
el.appendChild(_60);
};
_1.createTotalSortLink=function(app,_63,a){
_1.setOnClick(a,app,app.routes.getUserChannelUrl(_63,{pivot:"files",sort:"totalSize"}));
};
_1.onSearchCollections=function(app,_64){
var p={};
if(app.scene.declaredClass=="lconn.files.scenes.Collections"){
p=dojo.clone(app.scene.params);
}
p.name=_64;
p.pivot=(app.authenticatedUser)?"shared":"public";
var url=app.routes.getCollectionsUrl(p);
app.navigate(url);
};
_1.onSearchUser=function(app,_65,opt){
app.navigate(app.routes.getUserSearchUrl(_65,opt));
};
_1.onSelectUser=function(app,_66){
if(_66&&_66.id){
app.navigate(app.routes.getUserChannelUrl(_66.id));
}
};
_1.onSelectUserWithAdapter=function(app,_67,_68,_69){
var _6a=dojo._toArray(arguments);
_6a.splice(0,3);
_69=_67.getSelected(_68,_6a);
_1.onSelectUser(app,_69);
};
_1.onSearchConnectionsComponent=function(app,_6b){
app.navigate(app.routes.getConnectionsSearchUrl(_6b,{component:this.component}));
};
_1.onExternalScopeSearch=function(app,url,_6c,_6d){
app.navigate(url+encodeURIComponent(_6d));
};
_1.toggleSection=function(_6e,_6f){
_6e=(true===_6e);
_6f=(_6f!==undefined)?(true===_6f):_6e;
var _70="lotusTwistyOpen";
var _71="lotusTwistyClosed";
if(_6f){
_70+="Menu";
_71+="Menu";
}
var _72=(this.className.indexOf(_70)!=-1);
var _73=this.parentNode.nextSibling;
var _74=_6e?this:this.parentNode.parentNode;
if(_74&&dojo.attr(_74,"aria-expanded")){
dijit.setWaiState(_74,"expanded",!_72);
}
var _75=this.altNode;
if(_72){
dojo.removeClass(this,_70);
dojo.addClass(this,_71);
if(_75){
_75.innerHTML=dojo._isBodyLtr()?"&#9658;":"&#9668;";
}
if(!_6e){
while(_73){
if(_73.style){
_73.style.display="none";
}
_73=_73.nextSibling;
}
}
var s=this._titleClosed||this.title;
this.title=s;
dijit.setWaiState(this,"label",s);
if(this.onClose){
this.onClose();
}
}else{
dojo.removeClass(this,_71);
dojo.addClass(this,_70);
if(_75){
_75.innerHTML="&#9660;";
}
if(!_6e){
while(_73){
if(_73.style){
_73.style.display="";
}
_73=_73.nextSibling;
}
}
var s=this._titleOpen||this.title;
this.title=s;
dijit.setWaiState(this,"label",s);
if(this.onOpen){
this.onOpen();
}
}
};
_1.applySidebar=function(d,c,_76,app,_77){
var _78=_77;
var _79;
var el=d.getElementById("lotusColRight");
if(el){
el.style.display=(_78)?"":"none";
_79=d.createElement("div");
while(el.firstChild){
var _7a=el.firstChild;
el.removeChild(_7a);
_79.appendChild(_7a);
}
el.appendChild(_79);
}else{
el=d.createElement("div");
el.style.display=(_78)?"":"none";
el.id=el.className="lotusColRight";
_79=d.createElement("div");
el.appendChild(_79);
c.appendChild(el);
}
return _79;
};
_1.applyShareLink=function(app,el,_7b,_7c,_7d,_7e){
var _7f;
var d=app.d;
var url=_7e.getUrlVia();
if(url&&!app.isCommunityScene&&_7e.getLibraryType()=="personalFiles"){
url=lconn.share.util.uri.rewriteUri(url,{section:"share"});
}else{
if(url&&!app.isCommunityScene&&_7e.getLibraryType()=="communityFiles"){
url=url+"&section=share";
}
}
if(url&&app.isCommunityScene&&((_7e.getLibraryType()=="personalFiles"&&app.restrictUserInComm)||(_7e.getLibraryType()=="communityFiles"))){
url=app.routes.getCommunityUrl(app.communityId)+"#fullpageWidgetId="+app.widgetId+"&file="+_7e.getId()+"&section=share";
}
if(_7c){
lconn.share.util.html.substitute(d,el,_7b,{0:function(){
if(!url){
return d.createTextNode(_7c);
}
var a=d.createElement("a");
a.appendChild(d.createTextNode(_7c));
_1.setOnClick(a,app,url);
return a;
}});
}else{
if(_7b&&_7b.nodeType==1){
var _80=url?el.appendChild(d.createElement("a")):el;
_80.appendChild(_7b);
var _81=d.createElement("span");
_81.className="lotusAltText";
_81.appendChild(d.createTextNode(_7d));
_80.appendChild(_81);
if(url){
_1.setOnClick(_80,app,url);
}
}else{
el.appendChild(d.createTextNode(_7b));
}
}
return;
};
_1.applyShareCollectionLink=function(app,el,_82,_83,_84,_85){
var _86;
var d=app.d;
var url=null;
if(app.routes.getCollectionUrl){
url=app.routes.getCollectionUrl(_85.getId(),{section:"share"});
}else{
if(_85.getUrlAlternate){
url=_85.getUrlAlternate();
}
}
if(url&&_83){
lconn.share.util.html.substitute(d,el,_82,{0:function(){
var a=d.createElement("a");
a.appendChild(d.createTextNode(_83));
_1.setOnClick(a,app,url);
return a;
}});
}else{
if(url&&_82&&_82.nodeType==1){
var a=d.createElement("a");
var _87=d.createElement("span");
_87.className="lotusAltText";
_87.appendChild(d.createTextNode(_84));
a.appendChild(_87);
_1.setOnClick(a,app,url);
a.appendChild(_82);
el.appendChild(a);
}else{
el.appendChild(d.createTextNode(_82));
}
}
return;
};
_1.applyLotusDivider=function(el){
var d=document;
var _88=d.createElement("span");
_88.className="lotusDivider";
_88.appendChild(d.createTextNode("|"));
dijit.setWaiState(_88,"hidden",true);
dijit.setWaiRole(_88,"img");
el.appendChild(_88);
return _88;
};
_1.applyFilterList=function(app,ul,_89,_8a,f,_8b){
var d=app.d;
var li=d.createElement("li");
if(_8a){
dojo.addClass(li,"lotusSelected");
}
var e=d.createElement("a");
e.className=_8b||"";
e.appendChild(d.createTextNode(_89.name));
e.title=_89.tooltip;
f(e,_89);
li.appendChild(e);
if(_8a){
var a=d.createElement("a");
a.title=app.nls.CONTENT.REMOVE_FILTER_TOOLTIP;
a.className="lotusDelete";
f(a);
var img=d.createElement("img");
img.alt=app.nls.CONTENT.REMOVE_FILTER_ALT;
img.src=dojo.config.blankGif;
dijit.setWaiRole(img,"presentation");
a.appendChild(img);
var _8c=d.createElement("span");
_8c.className="lotusAltText";
_8c.appendChild(d.createTextNode("X"));
a.appendChild(_8c);
li.appendChild(a);
}
ul.appendChild(li);
};
_1.findFilter=function(_8d,_8e){
var _8f=-1;
for(var i=0;i<_8e.length;i++){
if(dojo.indexOf(_8d,_8e[i])!=-1){
_8f=i;
break;
}
}
return _8f;
};
_1.findFilters=function(_90,_91){
var _92=[];
for(var i=0;i<_91.length;i++){
if(dojo.indexOf(_90,_91[i])!=-1){
_92.push(i);
}
}
return _92;
};
_1.createFilterSection=function(app,el,_93,_94,_95,f,_96,_97){
if(_95.length<1){
return null;
}
var d=app.d;
var div=this.createFilterFrame(app,el,_93,_94,_97);
var ul=d.createElement("ul");
ul.className="lotusList lotusEditable lotusMeta";
for(var i=0;i<_95.length;i++){
this.applyFilterList(app,ul,_95[i],(i==_96),f,"lotusLeft");
}
div.appendChild(ul);
return div;
};
_1.createFilterFrame=function(app,el,_98,_99,_9a,opt){
var d=app.d;
var _98,_9b,_9c,_9d;
var _9e=dojo.getObject("authenticatedUser.orgName",false,app)||app.nls.ORGNAME_DEFAULT;
if(typeof _98=="object"){
_9b=_98.EXPAND;
_9c=_98.COLLAPSE;
_9d=_98.HEADER?_98.HEADER:"";
_98=dojo.string.substitute(_98.TITLE,{company:_9e});
}
var _9f=app.nls.TOGGLE_SECTION;
var nls=app.nls.CONTENT;
var opt=opt||{};
var _a0=d.createElement("div");
_a0.className="lotusSection";
_a0.id=opt.id||dijit.getUniqueId("section");
if(!el.firstChild){
dojo.addClass(_a0,"lotusFirst");
}
var h3=d.createElement("h2");
dojo.attr(h3,"onselectstart","return false;");
var a=d.createElement("A");
var _a1=a;
a.id=_a0.id+"_expandLink";
a._titleOpen=_9c||_9f;
a._titleClosed=_9b||_9f;
var s=_9a?a._titleClosed:a._titleOpen;
a.title=s;
a.href="javascript:;";
a.className="lotusSprite lotusArrow"+(_9a?" lotusTwistyClosed":" lotusTwistyOpen");
dijit.setWaiRole(a,"button");
dojo.connect(a,"onclick",a,_1.toggleSection);
var _a2=a.altNode=d.createElement("span");
_a2.className="lotusAltText";
_a2.appendChild(d.createTextNode(_9a?(dojo._isBodyLtr()?"\u25ba":"\u25c4"):"\u25bc"));
dijit.setWaiRole(_a2,"presentation");
a.appendChild(_a2);
h3.appendChild(a);
var _a3=d.createElement("SPAN");
_a3.id=_a0.id+"_titleSpan";
_a3.className="lotusLeft";
if(dojo._isBodyLtr()){
_a3.style.width="85%";
}
_a3.style.cursor="pointer";
_a3.appendChild(d.createTextNode(_98));
dojo.connect(_a3,"onclick",a,_1.toggleSection);
h3.appendChild(_a3);
var _a4;
if(_99){
var a=d.createElement("A");
_a4=a;
a.className="lotusRight";
a.href="javascript:;";
a.id=_a0.id+"_helpLink";
dijit.setWaiRole(a,"button");
var img=d.createElement("IMG");
img.alt=(dojo.isIE?"":app.nls.MENUBAR.HELP);
img.className=lconn.core.locale.getLanguage()==="ar"?"lconnSprite lconnSprite-iconHelp16-ar":"lconnSprite lconnSprite-iconHelp16";
img.src=dojo.config.blankGif;
a.appendChild(img);
var _a2=d.createElement("span");
dijit.setWaiState(_a2,"label",app.nls.MENUBAR.HELP);
_a2.className="lotusAltText";
_a2.appendChild(d.createTextNode(lconn.core.locale.getLanguage()==="ar"?"\u061f":"?"));
a.appendChild(_a2);
_1.applyTipPopup(app,h3,a,_99,_9d);
var _a5=dojo.doc.createElement("span");
_a5.className="lotusAccess";
_a5.appendChild(dojo.doc.createTextNode(_98));
a.insertBefore(_a5,a.firstChild);
h3.appendChild(a);
}
_a0.appendChild(h3);
var div=d.createElement("div");
var _a6=div;
div.style.display=_9a?"none":"";
div.className="lotusSectionBody";
div.id=opt.contentId||(_a0.id+"_body");
_a0.appendChild(div);
el.appendChild(_a0);
dijit.setWaiRole(_a0,"region");
dijit.setWaiState(_a0,"labelledby",_a3.id);
dijit.setWaiState(h3,"labelledby",_a3.id);
dijit.setWaiState(_a0,"expanded",!_9a);
dijit.setWaiState(_a1,"controls",_a6.id);
return div;
};
_1.generateUserImage=function(app,_a7,el,_a8,_a9,_aa,opt){
var src=_a7?(com.ibm.lconn.layout.people.getImageUrl(_a7)||app.routes.getUserPhotoUrl(_a7)):null;
if(!src){
src=lconn.share.config.baseStaticUri+"nav/common/styles/images/profileNoPhoto.gif";
opt=opt||{};
opt.imagePop=false;
}
_a7.photoURL=src;
var img=com.ibm.lconn.layout.people.createImage(_a7,_a8,_a7.photoURL);
if(img){
el.appendChild(img);
}else{
img=_1.createThumbnail(document,el,src,_a8,_a9,_aa,opt);
}
dojo.addClass(img,"usersRadius");
return img;
};
_1.generateLockIcon=function(d,el,doc,_ab,opt){
if(!doc.isLocked()){
return;
}
opt=opt||{};
var _ac=doc.getLock();
var _ad=_ab==_ac.getOwner().id;
var _ae="";
var alt="";
var nls=opt.nls;
if(nls){
_ae=_ad?nls.LOCKED_BY_YOU:nls.LOCKED;
}
var img=d.createElement("IMG");
img.src=dojo.config.blankGif;
img.className=(_ad?"lconnSprite lconnSprite-iconCheckedOutMe":"lconnSprite lconnSprite-iconCheckedOut");
dojo.attr(img,"alt",_ae);
var _af={title:""};
if(!nls){
_af.role="presentation";
}
dojo.attr(img,_af);
var ret=el?img:(el=d.createElement("div"));
el.appendChild(img);
if(nls){
var alt=el.appendChild(d.createElement("span"));
alt.className="lotusAltText";
alt.appendChild(d.createTextNode(_ae));
}
return ret;
};
_1.createThumbnail=function(d,el,src,_b0,_b1,_b2,opt){
if(!src){
return null;
}
_b0=_b0||_b1;
_b1=_b1||_b0;
var img=d.createElement("img");
if(_b2=="left"){
dojo.addClass(img,"lotusLeft");
}else{
if(_b2=="right"){
dojo.addClass(img,"lotusRight");
}
}
img.style.width=_b0+"px";
img.style.height=_b1+"px";
img.src=src;
img.alt="";
el.appendChild(img);
var _b3=d.createElement("span");
el.appendChild(_b3);
var opt=opt||{imagePop:true};
if(opt.imagePop){
new lconn.share.widget.ImagePop({target:img,orient:opt.orient||"tl"},_b3);
}
return img;
};
_1.getStandardMsgNoData=function(_b4,p){
var _b5=_b4.activeFilters;
var msg;
var bar=_b4.declaredClass=="lconn.files.scenes.FilesSearch"?1:0;
if(_b5.length>bar){
if(p.FILTERED_TAGS&&dojo.every(_b5,function(f){
return f.id=="tags";
})){
msg=p.FILTERED_TAGS;
}else{
msg=p.FILTERED;
}
}else{
msg=p.NORMAL;
}
return msg;
};
_1.applyApplicationError=function(app,e){
this.applyGenericError(app,null,null,null,e);
};
_1.applyGenericError=function(app,_b6,_b7,_b8,e){
_1.applyMessageBox(app,{img:"iconErrorLarge.gif",alt:app.nls.ERROR},_b6,_b7,_b8,e);
};
_1.applyGenericWarning=function(app,_b9,_ba,_bb,e){
_1.applyMessageBox(app,{img:"iconWarningLarge.gif",alt:app.nls.WARNING},_b9,_ba,_bb,e);
};
_1.applyAccessWarning=function(app,_bc,_bd){
_1.applyAccessWarningPage(app,_bc,_bd);
};
_1.applyAccessWarningPage=function(app,_be,_bf){
var d=app.document;
var _c0=app.authenticatedUser;
var _c1=app.routes;
var nls=app.nls;
var _be=_be||nls.ERROR_IN_APP_TITLE;
if(!_bf){
_bf=[nls.ERROR_IN_APP_MESSAGE];
}else{
if(!dojo.isArray(_bf)){
_bf=[_bf];
}
}
var old=_1.hideLotusFrame(d,app);
var el=old.frame;
var div=d.createElement("div");
div.className="lotusErrorBox lotusError";
var _c2=d.createElement("div");
_c2.className="lotusErrorContent";
var img=d.createElement("img");
img.className="iconsMessages48 iconsMessages48-msgWarning48";
img.src=dijit._Widget.prototype._blankGif;
img.title=img.alt=_be;
dijit.setWaiRole(img,"presentation");
_c2.appendChild(img);
var _c3=d.createElement("div");
_c3.className="lotusErrorForm";
var h1=d.createElement("h1");
h1.id="scene-title";
h1.appendChild(d.createTextNode(_be));
_c3.appendChild(h1);
for(var i=0;i<_bf.length;i++){
var p=d.createElement("p");
p.appendChild(d.createTextNode(_bf[i]));
_c3.appendChild(p);
}
_c2.appendChild(_c3);
div.appendChild(_c2);
el.appendChild(div);
dijit.setWaiRole(el,"main");
};
_1.applyMessageBox=function(app,_c4,_c5,_c6,_c7,e){
var d=app.document;
var _c8=app.authenticatedUser;
var _c9=app.routes;
var nls=app.nls;
var _c5=_c5||nls.ERROR_IN_APP_TITLE;
if(!_c6){
_c6=[nls.ERROR_IN_APP_MESSAGE];
}else{
if(!dojo.isArray(_c6)){
_c6=[_c6];
}
}
var _c7=_c7||[];
_c7.push([nls.BACK_TO_APP,_c9.getWelcomeUrl(),false]);
var old=_1.hideLotusFrame(d,app);
var el=old.frame;
var div=d.createElement("div");
div.className="lotusErrorBox lotusError";
var _ca=d.createElement("div");
_ca.className="lotusErrorContent";
var img=d.createElement("img");
img.src=lconn.share.config.baseStaticUri+"nav/common/styles/images/"+_c4.img;
img.setAttribute("alt",_c4.alt);
_ca.appendChild(img);
var _cb=d.createElement("div");
_cb.className="lotusErrorForm";
var h1=d.createElement("h1");
h1.id="scene-title";
h1.appendChild(d.createTextNode(_c5));
_cb.appendChild(h1);
for(var i=0;i<_c6.length;i++){
var p=d.createElement("p");
p.appendChild(d.createTextNode(_c6[i]));
_cb.appendChild(p);
}
if(_c7&&_c7.length>0){
var _cc=d.createElement("div");
_cc.className="lotusBtnContainer";
for(var i=0;i<_c7.length;i++){
var _cd=d.createElement("span");
_cd.className="lotusBtn lotusBtnAction";
if(i==0){
dojo.addClass(_cd,"lotusFirst");
}
var a=d.createElement("a");
a.appendChild(d.createTextNode(_c7[i][0]));
_1.setOnClick(a,app,_c7[i][1],_c7[i][2]);
dijit.setWaiRole(a,"button");
_cd.appendChild(a);
_cc.appendChild(_cd);
}
_cb.appendChild(_cc);
}
if(e){
var _ce=d.createElement("div");
_ce.className="lotusBtnContainer";
var a=d.createElement("a");
a.href="javascript:;";
a.appendChild(d.createTextNode(nls.ERROR_DETAILS));
dijit.setWaiRole(a,"button");
_ce.appendChild(a);
_cb.appendChild(_ce);
var p=d.createElement("p");
p.id="lconnErrorDetails";
p.style.display="none";
p.className="lotusErrorDetails";
var _cf=d.createElement("label");
_cf.appendChild(d.createTextNode(nls.ERROR_DETAILS_INFO));
p.appendChild(_cf);
var _d0=d.createElement("textarea");
_d0.id="lconnErrorText";
dojo.attr(_d0,"readonly",true);
dojo.attr(_d0,"wrap","off");
_d0.className="lotusText";
var _d1=[];
try{
_d1.push("Time: "+(window.loadTime||new Date()));
if(window.location){
_d1.push("Location: "+window.location.href);
}
if(window.navigator){
_d1.push("User-Agent: "+window.navigator.userAgent);
_d1.push("Language: "+(window.navigator.language||window.navigator.userLanguage));
}
try{
var _d2=window.navigator.plugins;
if(_d2){
for(var i=0;i<_d2.length;i++){
var _d3=_d2[i];
_d1.push("Plugin: [name='"+_d3.name+"' filename='"+_d3.filename+"' version='"+_d3.version+"' description='"+_d3.description+"']");
}
}
}
catch(e){
_d1.push("Plugins: "+e);
}
}
catch(e){
_d1.push("Browser Error: "+e);
}
_d1.push("---");
if(typeof e=="object"){
for(var i in e){
if(i){
_d1.push(i+": "+e[i]);
}
}
}else{
_d1.push(e);
}
_d0.value=_d1.join("\n");
p.appendChild(_d0);
_cb.appendChild(p);
dojo.connect(a,"onclick",p,function(){
this.previousSibling.style.display="none";
this.style.display="";
});
}
_ca.appendChild(_cb);
div.appendChild(_ca);
el.appendChild(div);
dijit.setWaiRole(el,"main");
};
_1.applyLogoutWarning=function(app){
var _d4=app.authenticatedUser;
var d=app.document;
d.title=app.nls.WINDOWTITLE.USERHOMEERROR;
var _d5=app.nls.CONTENT.NOT_LOGGED_IN;
var url=app.getUrl();
_1.applyGenericWarning(app,_d5.TITLE,_d5.MESSAGES,[[_d5.ACT_IN,url,dojo.hitch(app,"login",url)]]);
d.body.style.visibility="visible";
};
_1.linkOnClick=function(obj,_d6,e){
if(typeof _d6=="string"){
_d6=obj[_d6];
}
if(e.ctrlKey||e.altKey||e.shiftKey){
return;
}
if(e){
dojo.stopEvent(e);
}
_d6.apply(obj,[this.href]);
};
_1.generateCollectionLink=function(app,_d7,_d8,a,opt){
var url=opt&&opt.url?opt.url:null;
if(!url){
var _d9=dojo.isFunction(_d8.getType)?_d8.getType():_d8.collectionType;
var id=dojo.isFunction(_d8.getId)?_d8.getId():_d8.id;
if(_d9=="community"){
url=_d8.getUrlAlternate();
}else{
url=_d7.getCollectionUrl(id,{section:(opt)?opt.section:null});
}
}
_1.setOnClick(a,app,url);
};
_1.generateFileLink=function(app,_da,_db,a,opt){
var url=opt&&opt.url?opt.url:null;
if(!url){
var _dc=_db.getId();
url=_db.getUrlAlternate?_db.getUrlAlternate():null;
if(_db.getLibraryType()=="communityECMFiles"){
url=url||_db.getUrlVia?_db.getUrlVia():null;
}
url=url||_da.getFileSummaryUrl(null,_dc,{section:(opt)?opt.section:null});
if(app.restrictUserInComm&&app.isCommunityScene&&_db.getLibraryType()!="communityFiles"){
url=_da.getFileSummaryUrl(null,_dc,{section:(opt)?opt.section:null});
}
}
if(_db.getConfiguration().openInNewTab){
a.target="_blank";
}
_1.setOnClick(a,app,url);
};
_1.generateSharedFileLink=function(app,_dd,_de,a,opt){
var _df=_de.getSharedResourceId();
_1.setOnClick(a,app,_dd.getFileSummaryUrl(null,_df,{section:(opt)?opt.section:null}));
};
_1.generateFileCommentLink=function(app,_e0,doc,_e1,a){
var _e2=doc.getId();
var _e3=_e1.getId();
_1.setOnClick(a,app,_e0.getFileSummaryUrl(null,_e2,{comment:_e3}));
};
_1.generateFileVersionLink=function(app,_e4,a){
var _e5=_e4.getDocumentId();
_1.setOnClick(a,app,app.routes.getFileSummaryUrl(null,_e5,{version:_e4.getVersionLabel()}));
};
_1.generateTrashLink=function(app,a){
_1.setOnClick(a,app,app.routes.getDeletedFilesUrl(null,null));
};
_1.generateUserChannelLink=function(app,a){
_1.setOnClick(a,app,app.routes.getUserChannelUrl(app.authenticatedUser.id));
};
_1.generateMyCollectionsLink=function(app,a){
_1.setOnClick(a,app,app.routes.getCollectionsUrl({pivot:"personal"}));
};
_1.generateUserLink=function(app,_e6,_e7,a,opt){
a.title=dojo.isIE?"":" ";
var opt=opt||{};
if(dojo.getObject("lconn.core.config.services.profiles")&&!opt.forceUserFiles){
var _e8={userid:_e7.id,name:_e7.name,state:_e7.userState,email:_e7.email};
com.ibm.lconn.layout.people.createLink(_e8,null,a);
var _e9=a.childNodes;
for(var i=_e9.length-1;i>=0;i--){
var _ea=_e9[i];
if(_ea.nodeType==3&&_ea.nodeValue==_e7.name){
a.removeChild(_ea);
break;
}
}
}else{
dojo.addClass(a,"lotusPerson");
_1.setOnClick(a,app,_e6.getUrlToUser(_e7,opt));
if(_e7&&window["SemTagSvc"]){
dojo.addClass(a,"vcard");
dojo.addClass(a,"fn");
if(lconn.share.util.text.trim(_e7.email).length>0){
var _eb=document.createElement("span");
_eb.className="email";
_eb.style.display="none";
_eb.appendChild(document.createTextNode(_e7.email));
a.appendChild(_eb);
}
var _eb=document.createElement("span");
_eb.className="x-lconn-userid";
_eb.style.display="none";
_eb.appendChild(document.createTextNode(_e7.id));
a.appendChild(_eb);
}
}
if(dojo.getObject("SemTagSvc.onTagChanged")){
SemTagSvc.onTagChanged(a,true);
}
};
_1.generateInactiveUserLink=function(app,_ec,_ed,a,opt){
var opt=opt||{};
_1.generateUserLink(app,_ec,_ed,a,opt);
if(!(dojo.getObject("lconn.core.config.services.profiles")&&!opt.forceUserFiles)&&_ed.userState=="inactive"){
dojo.addClass(a,"lotusPersonInactive");
a.appendChild(document.createTextNode(" "+app.nls.USERSEARCH.INACTIVE));
dojo.attr(a,"aria-disabled",true);
}
};
_1.generateCommunityLink=function(app,_ee,_ef,a){
var id=(typeof _ef=="object")?_ef.id:_ef;
var i=id.indexOf("@");
if(i!=-1){
id=id.substring(i+1);
}
dojo.addClass(a,"lotusPerson");
_1.setOnClick(a,app,_ee.getCommunityUrl(id));
};
_1.generateCommunityFoldersLink=function(app,_f0,_f1,_f2,a){
var id=(typeof _f1=="object")?_f1.id:_f1;
var i=id.indexOf("@");
if(i!=-1){
id=id.substring(i+1);
}
dojo.addClass(a,"lotusPerson");
_1.setOnClick(a,app,_f0.getCommunityCollectionsUrl(_f2,id));
};
_1.generateTagLink=function(app,_f3,_f4,_f5,tag,a){
a.href="javascript:;";
a.title=dojo.string.substitute(app.nls.CONTENT.TAG_TOOLTIP,[tag]),_1.setOnClick(a,app,_f3.getUserChannelTaggedMediaUrl(_f4,tag,{sort:(_f5?_f5.sortId:null)}));
};
_1.generatePublicFilesLink=function(app,_f6,a){
dojo.addClass(a,"lotusTag");
a.href=_f6.getPublicFilesUrl();
};
_1.generatePublicCollectionsLink=function(app,_f7,a){
dojo.addClass(a,"lotusTag");
a.href=_f7.getCollectionsUrl({pivot:"public"});
};
_1.applyDownloadWarning=function(app,_f8,d,_f9){
var _fa;
var i=dojo.getObject("lconn.share.config.validation.warnForDownload");
if(i>0&&lconn.share.util.text.lengthUtf8(_f8)>i){
_f9.title="";
_fa=_1.applyGenericPopup(app,null,_f9,app.nls.DOCUMENTCONTENT.DOWNLOAD_WARN_LONG);
}
return _fa;
};
_1.downloadFile=function(_fb,opt){
var url=_fb.getUrlDownload();
var f=opt.file||_fb;
var _fc=opt.version;
var _fd=f.getDownloadInfo&&f.getDownloadInfo();
var app=opt.app;
var nls=opt.nls;
var _fe=function(){
if(_fd){
if(_fc){
v=_fd.version;
if(isNaN(v)||_fc.getVersionLabel()>v){
v=_fc.getVersionLabel();
}
}else{
v=f.getLatestVersionLabel();
}
_fd.version=v;
_fd.downloaded=true;
}else{
f.downloadInfo={version:f.getLatestVersionLabel(),downloaded:true};
}
if(!opt.isLink){
if(f.getMalwareScanState()=="unscanned"){
window.open(url);
}else{
if(!f.getMalwareScanState()||f.getMalwareScanState()=="clean"){
window.location=url;
}
}
}
};
var dcs=lconn.files.descriptions.get("downloadConfirm");
if(dcs&&dcs.length>0){
var _ff=false;
for(var i=0;i<dcs.length;i++){
if(dcs[i].isValid(_fb)){
_ff=dcs[i];
break;
}
}
if(_ff){
var down=function(_100){
if(_100){
_fe();
}
};
net.jazz.ajax.xdloader.load_async("lconn.core.DialogUtil",function(){
lconn.core.DialogUtil.prompt(nls.CONFIRM.DIALOG_TITLE,_ff.node.innerHTML,nls.CONFIRM.OK,nls.CONFIRM.CANCEL,down);
});
}
}else{
_fe();
}
};
_1.createLink=function createLink(el,_101,_102,_103){
if(el){
var _104=_101.replace("{0}","<a href=\"javascript:;\">");
_104=_104.replace("{1}","</a>");
el.innerHTML=_104;
var _105=_102.replace("{0}","");
_105=_105.replace("{1}","");
var link=el.getElementsByTagName("a")[0];
link.setAttribute("aria-label",_105);
link.onclick=function(){
_103.apply();
return false;
};
}
};
_1.applyWelcome=function(app,el,_106){
if(app.prefs.get("nw")){
return;
}
var d=app.d;
var _107=app.routes;
var nls=app.nls.WELCOMECONTENT;
var _108=nls;
var div=d.createElement("div");
div.id="__app_welcome";
div.className="lotusWelcomeBox";
var h2=d.createElement("h2");
h2.appendChild(d.createTextNode(_108.TITLE));
h2.id=dijit.getUniqueId("title");
h2.className="lotusHeading";
div.appendChild(h2);
dijit.setWaiRole(div,"region");
dijit.setWaiState(div,"labelledby",h2.id);
var p=d.createElement("p");
p.appendChild(d.createTextNode(_108.BLURB));
div.appendChild(p);
var ul=d.createElement("ul");
var li1=document.createElement("li");
li1.id="filesWelcomeMsg1";
var li2=document.createElement("li");
li2.id="filesWelcomeMsg2";
var li3=document.createElement("li");
li3.id="filesWelcomeMsg3";
ul.appendChild(li1);
ul.appendChild(li2);
ul.appendChild(li3);
div.appendChild(ul);
var a=d.createElement("a");
a.className="lotusBtnImg lotusClose";
a.title=nls.CLOSE;
a.href="javascript:;";
dijit.setWaiRole(a,"button");
var img=d.createElement("img");
img.src=dojo.config.blankGif;
img.alt=app.nls.CLOSE;
a.appendChild(img);
var _109=d.createElement("span");
_109.className="lotusAltText";
_109.appendChild(d.createTextNode("X"));
a.appendChild(_109);
dojo.connect(a,"onclick",dojo.hitch(app,function(){
this.prefs.put("nw",1);
var el=this.d.getElementById("__app_welcome");
if(el){
el.style.display="none";
}
}));
div.appendChild(a);
el.appendChild(div);
_1.createLink(li1,_108.BLURB1,_108.BLURB1,dojo.partial(openHelpWindow,dojo.getObject("lconn.files.config.welcomeLink1")||"t_files_add_files.html"));
_1.createLink(li2,_108.BLURB2,_108.BLURB2,dojo.partial(openHelpWindow,dojo.getObject("lconn.files.config.welcomeLink2")||"t_files_find_files.html"));
_1.createLink(li3,_108.BLURB3,_108.BLURB3,dojo.partial(openHelpWindow,dojo.getObject("lconn.files.config.welcomeLink3")||"t_files_others_files.html"));
if(lconn.share.util.configUtil.isFileSyncEnabled(app.getAuthenticatedUser())&&dojo.getObject("lconn.files.config.features.fileSync.clientDownloadLinkEnabled")){
var _10a=false;
var url="";
var _10b="";
var _10c=false;
var _10d=dojo.getObject("lconn.files.config.features.fileSync.clientDownloadLink");
var _10e=dojo.getObject("lconn.files.config.features.fileSync.clientPlatforms");
var _10f=dojo.getObject("lconn.files.config.features.fileSync.clientDownloadLinkEnabled");
var _110=navigator.platform.toLowerCase().substring(0,3);
var li4=document.createElement("li");
li4.id="filesWelcomeMsg4";
ul.appendChild(li4);
if(!!_10e.mac&&_10e.mac.enabled&&_110=="mac"){
_10b=_10e.mac.url;
_10c=true;
}else{
if(!!_10e.win&&_10e.win.enabled&&_110=="win"){
_10b=_10e.win.url;
_10c=true;
}else{
if(!!_10e.lin&&_10e.lin.enabled&&_110=="lin"){
_10b=_10e.lin.url;
_10c=true;
}else{
_10c=false;
}
}
}
url=_10c?_10b:_10d;
if(_10f){
_1.createLink(li4,_108.BLURB4,_108.BLURB4,dojo.partial(function(url){
window.location.href=url;
},url));
}else{
_1.createLink(li4,_108.BLURB4,_108.BLURB4,dojo.partial(function(url){
window.location.href=url;
},_10d));
}
}
};
_1.accessibility=function(){
console.group("Accessibility Test for '"+pe.urlState+"'");
console.info("Images without alt text: ",dojo.query("img").filter(function(i){
return !i.attributes.getNamedItem("alt");
}));
var _111={};
var _112=dojo.query("label").filter(function(i){
var _113=i.attributes.getNamedItem("for");
if(!_113){
return true;
}
_111[_113.nodeValue]=1;
return false;
});
console.info("Labels without 'for':    ",_112);
function _114(i){
return !((i.id&&_111[i.id])||i.title||(i.type=="submit"&&i.value));
};
var _115=[];
_115=_115.concat(dojo.query("input").filter(_114));
_115=_115.concat(dojo.query("select").filter(_114));
_115=_115.concat(dojo.query("textbox").filter(_114));
console.info("Inputs without label or title:    ",_115);
console.groupEnd();
};
_1.isGuestUser=function(app){
return !!dojo.getObject("authenticatedUser.isGuest",false,app);
};
_1.shouldShowExternal=function(app){
var _116=lconn.share.util.configUtil.isSharingIntentEnabled(app.getAuthenticatedUser());
if(!_116||!app.getUserPermissions().canShareInternal()){
return false;
}
return true;
};
_1.showHeader=function(_117){
var _118=dojo.byId("lotusContentHeader");
if(_118){
_117?_118.style.display="block":_118.style.display="none";
}
};
_1.showActions=function(_119){
var _11a=dojo.byId("lotusContentSceneActions");
if(_11a){
_119?_11a.style.display="block":_11a.style.display="none";
}
};
_1.showlist=function(_11b){
var list=dojo.byId("list");
if(list){
_11b?list.style.display="block":list.style.display="none";
}
};
})(lconn.files.scenehelper);
}


;if(!dojo._hasResource["lconn.files.columns"]){
dojo._hasResource["lconn.files.columns"]=true;
dojo.provide("lconn.files.columns");


lconn.files.columns={get:function(s){
var _1=dojo._toArray(arguments);
var _2=[];
_1.unshift(_2);
var _3=lconn.core.uiextensions.get("lconn/files/columns/"+s)||[];
for(var i=0;i<_3.length;i++){
_3[i].apply(null,_1);
}
return _2;
}};
}


;if(!dojo._hasResource["lconn.files.actions"]){
dojo._hasResource["lconn.files.actions"]=true;
dojo.provide("lconn.files.actions");


lconn.files.actions={get:function(s){
var _1=dojo._toArray(arguments);
var _2=[];
_1.unshift(_2);
var _3=lconn.core.uiextensions.get("lconn/files/actions/"+s)||[];
for(var i=0,l=_3.length;i<l;i++){
_3[i].apply(null,_1);
}
return _2;
}};
}


;if(!dojo._hasResource["lconn.share.util.IBMDocs.ThumbnailConstants"]){
dojo._hasResource["lconn.share.util.IBMDocs.ThumbnailConstants"]=true;
(function(){
"use strict";
dojo.provide("lconn.share.util.IBMDocs.ThumbnailConstants");


var _1=lconn.share.util.IBMDocs.ThumbnailConstants;
_1.thumbnailSizes={small:"small",medium:"medium",large:"large"};
_1.validateSize=function(_2){
var _3=dojo.some(dojox.lang.functional.keys(_1.thumbnailSizes),function(_4){
return _4==_2;
});
if(_3){
return true;
}
throw {name:"InvalidArgumentException",message:"\""+_2+"\" is not a valid thumbnail size format."};
};
_1.getOtherSizeFormats=function(_5){
var _6=dojo.filter(dojox.lang.functional.keys(_1.thumbnailSizes),function(_7){
return (_7!=_5);
});
return _6;
};
}());
}


;if(!dojo._hasResource["lconn.share.util.IBMDocs.ViewerRoutes"]){
dojo._hasResource["lconn.share.util.IBMDocs.ViewerRoutes"]=true;
(function(){
"use strict";
dojo.provide("lconn.share.util.IBMDocs.ViewerRoutes");






var _1=lconn.share.util.IBMDocs.ViewerRoutes;
var _2=lconn.share.util.IBMDocs.ThumbnailConstants;
var _3=lconn.core.config.services;
var _4=lconn.core.url;
var _5="/api/thumbnails/{serviceName}/{repositoryName}/{size}";
var _6="/api/thumbnails/{serviceName}/{cmisVersionSeriesId}@{repositoryName}/{size}";
_1.serviceNames={files:"icfiles",ecm:"ecm"};
_1.getServiceName=function(_7){
if(_7.isFilesContext()){
return _1.serviceNames.files;
}
if(_7.isLibraryContext()){
return _1.serviceNames.ecm;
}
};
_1.getViewerServiceURL=function(){
return _4.getServiceUrl(_3.viewer);
};
_1.canBuildViewerServiceURL=function(){
var _8=!!(_3.viewer);
return _8;
};
_1.getThumbnailBatchURL=function(_9,_a,_b){
if(!_9||!_a){
throw {name:"InvalidArgumentException",message:"One of the following arguments was invalid: serviceName=("+_9+"), repositoryName=("+_a+"), size=("+_b+")"};
}
if(!_1.canBuildViewerServiceURL()){
throw {name:"IllegalStateException",message:"Not able to build Viewer service URL because of incorrect environment.  This should have been guarded against with \"ViewerRoutes.canBuildViewerServiceURL\"."};
}
_2.validateSize(_b);
var _c=_1.getViewerServiceURL()+_5;
_c=_1._replaceCommonThumbnailURLIdentifiers(_c,_9,_a,_b);
return _c;
};
_1.getThumbnailSingleURL=function(_d,_e,_f,_10){
if(!_d||!_f){
throw {name:"InvalidArgumentException",message:"One of the following arguments was invalid: serviceName=("+_d+"), repositoryName=("+_f+"), size=("+_10+")"};
}
if(!_1.canBuildViewerServiceURL()){
throw {name:"IllegalStateException",message:"Not able to build Viewer service URL because of incorrect environment.  This should have been guarded against with \"ViewerRoutes.canBuildViewerServiceURL\"."};
}
if(!_e){
return;
}
_2.validateSize(_10);
var url=_1.getViewerServiceURL()+_6;
url=url.replace("{cmisVersionSeriesId}",encodeURIComponent(_e));
url=_1._replaceCommonThumbnailURLIdentifiers(url,_d,_f,_10);
return url;
};
_1._replaceCommonThumbnailURLIdentifiers=function(url,_11,_12,_13){
url=url.replace("{serviceName}",encodeURIComponent(_11));
url=url.replace("{repositoryName}",encodeURIComponent(_12));
url=url.replace("{size}",encodeURIComponent(_13));
return url;
};
}());
}


;if(!dojo._hasResource["lconn.share.bean.AbstractCMISBean"]){
dojo._hasResource["lconn.share.bean.AbstractCMISBean"]=true;
dojo.provide("lconn.share.bean.AbstractCMISBean");




dojo.declare("lconn.share.bean.AbstractCMISBean",null,{_getCMISObjectNode:function(){
if(!this._cmisObjectNode){
var _1=lconn.share.util.dom;
this._cmisObjectNode=_1.xpathNode(this.e,"cmisra:object");
if(!this._cmisObjectNode){
this._cmisObjectNode=_1.xpathNode(this.e,"lcmis:viaResource/cmisra:object");
}
}
return this._cmisObjectNode;
},getPropertyDateTime:function(_2,_3){
var _4=this.getProperty("DateTime",_2);
if(_4==null){
return _3;
}
return _4;
},getPropertyBoolean:function(_5,_6){
var _7=this.getProperty("Boolean",_5);
if(_7==null){
return _6;
}
return _7=="true";
},getPropertyInteger:function(_8,_9){
var _a=this.getProperty("Integer",_8);
return lconn.share.util.text.parseInt(_a,_9);
},getPropertyString:function(_b,_c){
var _d=this.getProperty("String",_b);
if(_d==null){
return _c;
}
return _d;
},getPropertyId:function(_e,_f){
var _10=this.getProperty("Id",_e);
if(_10==null){
return _f;
}
return _10;
},getProperty:function(_11,_12){
return lconn.share.util.dom.xpathString(this._getCMISObjectNode(),"cmis:properties/cmis:property"+_11+"[@propertyDefinitionId='"+_12+"']/cmis:value/text()");
}});
}


;if(!dojo._hasResource["lconn.share.bean.User"]){
dojo._hasResource["lconn.share.bean.User"]=true;
dojo.provide("lconn.share.bean.User");






dojo.declare("lconn.share.bean.User",null,{constructor:function(e){
this.id=lconn.share.util.dom.getChildElementTextContentNS(e,"userid",lconn.share.util.dom.NAMESPACES.SNX)||lconn.share.util.dom.getChildElementTextContentNS(e,"uid",lconn.share.util.dom.NAMESPACES.DOCUMENTS_ATOM);
this.uri=lconn.share.util.dom.getChildElementTextContentNS(e,"uri",lconn.share.util.dom.NAMESPACES.DOCUMENTS_ATOM)||lconn.share.util.dom.getChildElementTextContent(e,"uri");
this.name=lconn.share.util.dom.getChildElementTextContentNS(e,"name",lconn.share.util.dom.NAMESPACES.DOCUMENTS_ATOM)||lconn.share.util.dom.getChildElementTextContent(e,"name");
this.email=lconn.share.util.dom.getChildElementTextContentNS(e,"email",lconn.share.util.dom.NAMESPACES.DOCUMENTS_ATOM)||lconn.share.util.dom.getChildElementTextContent(e,"email");
this.hasEmail=(this.email!=null&&typeof (this.email)!="undefined")||(lconn.share.util.text.trim(this.email).length>0);
this.userState=lconn.share.util.dom.getChildElementTextContentNS(e,"userState",lconn.share.util.dom.NAMESPACES.SNX);
}});
dojo.declare("lconn.share.bean.UserFromCMIS",null,{constructor:function(e){
var _1=lconn.share.util.dom;
this.id=_1.xpathString(e,"lcmis:principalId/text()");
this.name=_1.xpathString(e,"cmis:value/text()");
this.email=_1.xpathString(e,"lcmis:email/text()");
this.hasEmail=(this.email!=null&&typeof (this.email)!="undefined")||(lconn.share.util.text.trim(this.email).length>0);
}});
dojo.declare("lconn.share.bean.UserFromJson",null,{constructor:function(d){
if(dojo.isArray(d)){
this.id=d[0]["snx:userid"]||lconn.share.util.misc.indexById(d,"name","snx:userid").children[0];
this.name=lconn.share.util.misc.indexById(d,"name","name").children[0];
this.email=lconn.share.util.misc.indexById(d,"name","email").children[0];
this.userState=d[0]["snx:userState"]||lconn.share.util.misc.indexById(d,"name","snx:userState").children[0];
}else{
this.id=d["snx:userid"]||lconn.share.util.misc.indexById(d.extensions,"name","snx:userid").children[0];
this.name=d.name;
this.email=d.email;
this.userState=d["snx:userState"]||d.userState;
}
this.hasEmail=(this.email!=null&&typeof (this.email)!="undefined")||(lconn.share.util.text.trim(this.email).length>0);
}});
lconn.share.bean.User.decodeUserUri=function(s){
return decodeURIComponent(s.replace("+"," "));
};
}


;if(!dojo._hasResource["lconn.share.bean.AbstractModerateBean"]){
dojo._hasResource["lconn.share.bean.AbstractModerateBean"]=true;
dojo.provide("lconn.share.bean.AbstractModerateBean");






dojo.declare("lconn.share.bean.AbstractModerateBean",null,{getStatus:function(){
if(!this.status){
this.status=lconn.share.util.dom.getChildElementAttributeMatching(this.e,"category","scheme","http://www.ibm.com/xmlns/prod/sn/flags","term");
}
return this.status;
},isActive:function(){
var _1=this.getStatus();
return (!_1)||"active"==_1;
},isQuarantined:function(){
return "quarantined"==this.getStatus();
},isPending:function(){
return "pending"==this.getStatus();
},isRejected:function(){
return "rejected"==this.getStatus();
},getStateChangedBy:function(){
if(!this.stateChangedBy){
var e=lconn.share.util.dom.getElementsByTagNameNS(this.e,"stateChangedBy",lconn.share.util.dom.NAMESPACES.SNX)[0];
if(e){
this.stateChangedBy=new lconn.share.bean.User(e);
}
}
return this.stateChangedBy;
},getStateChangedWhen:function(){
if(!this.stateChangedWhen){
this.stateChangedWhen=lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContentNS(this.e,"stateChangedWhen",lconn.share.util.dom.NAMESPACES.SNX));
}
return this.stateChangedWhen;
},getUrlReport:function(){
var _2=lconn.share.util.dom;
return lconn.share.util.dom.getChildElementAttributeMatchingNS(this.e,"link",_2.ATOM_NAMESPACE,"rel",null,"http://www.ibm.com/xmlns/prod/sn/reports","href",null);
},isFlaggable:function(){
return this.getUrlReport();
}});
dojo.declare("lconn.share.bean.AbstractModerateBeanFromJson",lconn.share.bean.AbstractModerateBean,{getStatus:function(){
if(!this.status){
var _3=lconn.share.util.misc.indexById(this.d.categories,"scheme","http://www.ibm.com/xmlns/prod/sn/flags");
if(_3){
this.status=_3.term;
}
}
return this.status;
},getStateChangedBy:function(){
if(!this.stateChangedBy){
var _4=lconn.share.util.misc.indexById(this.d.extensions,"name","snx:stateChangedBy");
this.stateChangedBy=new lconn.share.bean.UserFromJson(_4);
}
return this.stateChangedBy;
},getStateChangedWhen:function(){
if(!this.stateChangedWhen){
var _5=lconn.share.util.misc.indexById(this.d.extensions,"name","snx:stateChangedWhen");
if(_5){
this.stateChangedWhen=lconn.share.util.misc.date.convertAtomDate(_5.children[0]);
}
}
return this.stateChangedWhen;
}});
}


;if(!dojo._hasResource["lconn.share.bean.Lock"]){
dojo._hasResource["lconn.share.bean.Lock"]=true;
dojo.provide("lconn.share.bean.Lock");






dojo.declare("lconn.share.bean.Lock",null,{constructor:function(e){
this.e=e;
},getType:function(){
return this.e?this.e.getAttribute("type"):null;
},getOwner:function(){
if(!this.owner&&this.e){
var e=lconn.share.util.dom.getChildElementNS(this.e,"owner",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
if(e){
this.owner=new lconn.share.bean.User(e);
}
}
return this.owner;
},getLockTime:function(){
if(!this.lockTime){
this.lockTime=lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContentNS(this.e,"lockTime",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE));
}
return this.lockTime;
}});
}


;if(!dojo._hasResource["lconn.share.bean.Policy"]){
dojo._hasResource["lconn.share.bean.Policy"]=true;
dojo.provide("lconn.share.bean.Policy");






dojo.declare("lconn.share.bean.Policy",null,{constructor:function(e){
if(e){
var p=lconn.share.bean.Policy.createPolicy(e);
dojo.mixin(this,p);
}
}});
lconn.share.bean.Policy.SUPPORTED_POLICY=["organizationPublic","contentFollowing"];
lconn.share.bean.Policy.createPolicy=function(e){
if(e){
var _1=lconn.share.bean.Policy.SUPPORTED_POLICY;
var p={};
dojo.forEach(_1,function(_2){
var _3=lconn.share.util.dom.getChildElementTextContentNS(e,_2,lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
if(_3){
if(_3==="true"){
p[_2]=true;
}else{
p[_2]=false;
}
}
});
return p;
}
};
}


;if(!dojo._hasResource["lconn.share.bean.ConfigurableBean"]){
dojo._hasResource["lconn.share.bean.ConfigurableBean"]=true;
dojo.provide("lconn.share.bean.ConfigurableBean");


dojo.declare("lconn.share.bean.ConfigurableBean",null,{getConfiguration:function(_1){
if(this.config){
return this.config;
}
var _2=this.config={};
if(this.getExtConfiguration){
dojo.mixin(_2,this.getExtConfiguration(_1));
}
return _2;
}});
dojo.declare("lconn.share.bean.ConfigurableFile",lconn.share.bean.ConfigurableBean,{getExtConfiguration:function(_3){
var _4=lconn.core.uiextensions.get("lconn/files/config/file");
var _5={};
if(_4){
for(var i=0;i<_4.length;i++){
dojo.mixin(_5,_4[i](this,_3));
}
}
return _5;
}});
dojo.declare("lconn.share.bean.ConfigurableCollection",lconn.share.bean.ConfigurableBean,{});
}


;if(!dojo._hasResource["lconn.share.bean.File"]){
dojo._hasResource["lconn.share.bean.File"]=true;
(function(){
var _1=function(_2,_3){
if(!_2){
return null;
}
var _4=_2.indexOf("/basic");
if(_4==-1){
_4=_2.indexOf("/form");
}
var _5=null;
if(_4>0){
var _6=_2.substring(0,_4);
_5=[_6,"/app/file/",_3].join("");
}
return _5;
};
dojo.provide("lconn.share.bean.File");
























var _7=lconn.share.util.IBMDocs.ViewerRoutes;
var _8=lconn.share.util.IBMDocs.ThumbnailConstants;
dojo.declare("lconn.share.bean.File",[lconn.share.bean.AbstractModerateBean,lconn.share.bean.ConfigurableFile],{constructor:function(_9){
this.e=_9;
this._thumbnailData={};
},isFolder:function(){
return "folder"==this.getCategory()||"collection"==this.getCategory();
},getEntry:function(){
return this.e;
},getAtomId:function(){
return lconn.share.util.dom.getChildElementTextContent(this.e,"id");
},getId:function(){
var _a=lconn.share.util.dom.getChildElementTextContentNS(this.e,"uuid",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
if(!_a){
if(this.ccmBean){
_a=this.ccmBean.getId();
}
}
return _a;
},getName:function(){
return this.getLabel();
},getPublishedTitle:function(){
var _b=lconn.share.util.dom.getChildElementAttributeMatching(this.e,"link","rel","enclosure","title");
if(_b){
return _b;
}else{
return this.getName();
}
},getTitle:function(){
return lconn.share.util.dom.getChildElementTextContentNS(this.e,"title",lconn.share.util.dom.ATOM_NAMESPACE);
},getDraftStatus:function(){
if(lconn.share.util.dom.getChildElementAttribute(this.e,"category","term")=="draft"){
var _c=lconn.share.util.dom.getChildElementTextContentNS(this.e,"approvalState",lconn.share.util.dom.NAMESPACES.DOCUMENTS_ATOM);
if(_c=="pending"){
return "draftReview";
}
if(_c=="rejected"){
return "draftRejected";
}
return "draft";
}
return null;
},getLabel:function(){
var s=lconn.share.util.dom.getChildElementTextContentNS(this.e,"label",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
var _d=lconn.share.util.dom;
if(!s||s.length==0){
s=_d.getChildElementAttributeMatchingNS(this.e,"link",_d.ATOM_NAMESPACE,"rel",null,"enclosure","title",null);
}
if(!s||s.length==0){
s=this.getTitle();
}
return s;
},getContent:function(){
return this.content||lconn.share.util.dom.getChildElementTextContent(this.e,"content");
},getExtension:function(){
return lconn.share.util.text.getExtension(this.getLabel());
},getDescription:function(){
return lconn.share.util.dom.getChildElementTextContent(this.e,"summary");
},getChangeSummary:function(){
return lconn.share.util.dom.getChildElementTextContent(this.e,"changeSummary");
},getCategory:function(){
return lconn.share.util.dom.getChildElementAttributeMatching(this.e,"category","scheme","tag:ibm.com,2006:td/type","term");
},isPage:function(){
return this.getCategory()=="page";
},getAuthor:function(){
if(!this.author&&this.e){
this.author=new lconn.share.bean.User(this.e.getElementsByTagName("author")[0]);
}
return this.author;
},getObjectTypeId:function(){
return lconn.share.util.dom.getChildElementTextContentNS(this.e,"objectTypeId",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
},getLibraryId:function(){
if(!this.e||this._libraryType=="library"){
return null;
}
var s=lconn.share.util.dom.getChildElementTextContentNS(this.e,"libraryId",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
if(!s){
throw "Library id not returned in element";
}
return s;
},isFilesContext:function(){
return (dojo.indexOf(lconn.share.bean.File.CONTEXTS.FILES,this.getLibraryType())>-1);
},isLibraryContext:function(){
return (dojo.indexOf(lconn.share.bean.File.CONTEXTS.ECM,this.getLibraryType())>-1);
},getLibraryType:function(){
if(this._libraryType){
return this._libraryType;
}
if(!this.e){
return null;
}
this._libraryType=lconn.share.util.dom.getChildElementTextContentNS(this.e,"libraryType",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
return this._libraryType;
},isSyncable:function(){
if(!this.e){
return null;
}
if(this.syncable==null||typeof (this.syncable)=="undefined"){
var _e=lconn.share.util.dom.getChildElementTextContentNS(this.e,"isSyncable",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
this.syncable=_e=="true";
}
return this.syncable;
},getLibraryAuthor:function(){
if(!this.libraryAuthor&&this.e){
var e=lconn.share.util.dom.getElementsByTagNameNS(this.e,"libraryAuthor",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
if(e){
this.libraryAuthor=new lconn.share.bean.User(e);
}
}
return this.libraryAuthor;
},getPolicy:function(){
if(this.policy===undefined&&this.e){
var e=lconn.share.util.dom.getElementsByTagNameNS(this.e,"policy",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
this.policy=e?lconn.share.bean.Policy.createPolicy(e):null;
}
return this.policy;
},getAddedBy:function(){
if(!this.addedBy&&this.e){
var e=lconn.share.util.dom.getElementsByTagNameNS(this.e,"addedBy",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
if(e){
this.addedBy=new lconn.share.bean.User(e);
}
}
return this.addedBy;
},getAdded:function(){
if(!this.added){
this.added=lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContentNS(this.e,"added",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE));
}
return this.added;
},getSharedBy:function(){
if(!this.sharedBy&&this.e){
var e=lconn.share.util.dom.getElementsByTagNameNS(this.e,"sharedBy",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
if(e){
this.sharedBy=new lconn.share.bean.User(e);
}
}
return this.sharedBy;
},getShared:function(){
if(!this.shared){
this.shared=lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContentNS(this.e,"shared",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE));
}
return this.shared;
},getDeletedBy:function(){
if(!this.deletedBy&&this.e){
var e=lconn.share.util.dom.getElementsByTagNameNS(this.e,"deletedBy",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
if(e){
this.deletedBy=new lconn.share.bean.User(e);
}
}
return this.deletedBy;
},getDeleted:function(){
if(!this.deleted){
this.deleted=lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContentNS(this.e,"deletedWhen",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE));
}
return this.deleted;
},getModifier:function(){
if(!this.modifier&&this.e){
var e=lconn.share.util.dom.getElementsByTagNameNS(this.e,"modifier",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
if(e){
this.modifier=new lconn.share.bean.User(e);
}
}
return this.modifier;
},getUpdated:function(){
if(!this.updated){
this.updated=lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContentNS(this.e,"modified",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE))||this.getSystemLastModified();
}
return this.updated;
},getPublished:function(){
if(!this.published){
this.published=lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContentNS(this.e,"created",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE))||this.getSystemCreated();
}
return this.published;
},getSystemLastModified:function(){
if(!this.systemLastModified){
this.systemLastModified=lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContent(this.e,"updated"));
}
return this.systemLastModified;
},getSystemCreated:function(){
if(!this.systemCreated){
this.systemCreated=lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContent(this.e,"published"));
}
return this.systemCreated;
},getOrgId:function(){
if(this._orgId==undefined){
this._orgId=lconn.share.util.dom.getChildElementTextContentNS(this.e,"orgId",lconn.share.util.dom.SNX_NAMESPACE);
}
return this._orgId;
},getOrgName:function(){
if(this._orgName==undefined){
this._orgName=lconn.share.util.dom.getChildElementTextContentNS(this.e,"orgName",lconn.share.util.dom.SNX_NAMESPACE);
}
return this._orgName;
},getRating:function(){
return lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementTextContentNS(this.e,"rating",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE));
},getAverageRating:function(){
return lconn.share.util.text.parseFloat(lconn.share.util.dom.getChildElementTextContentNS(this.e,"averageRating",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE));
},getRatingCount:function(){
if(this.ratingCount!=null){
return this.ratingCount;
}
return this.ratingCount=lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementMatchingAttributeTextContentNS(this.e,"rank",lconn.share.util.dom.SNX_NAMESPACE,"scheme",null,"http://www.ibm.com/xmlns/prod/sn/recommendations"));
},getUrlRecommendation:function(){
if(!this.urlRecommendation){
var _f=lconn.share.util.dom;
this.urlRecommendation=_f.getChildElementAttributeMatchingNS(this.e,"link",_f.ATOM_NAMESPACE,"rel",null,"recommendation","href",null);
this.urlRecommendation=this.urlRecommendation?this.urlRecommendation:null;
}
return this.urlRecommendation;
},isUserRecommended:function(){
return this.getUrlRecommendation()?true:false;
},isEncrypted:function(){
if(this.encrypted===undefined){
this.encrypted=(lconn.share.util.dom.getChildElementTextContentNS(this.e,"encrypt",lconn.share.util.dom.SNX_NAMESPACE)=="true");
}
return this.encrypted;
},getPermissions:function(){
if(!this.permissions){
var s=lconn.share.util.dom.getChildElementTextContentNS(this.e,"permissions",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
var p={};
if(s){
dojo.forEach(s.split(","),function(a){
if(a&&a.length>0){
p[dojo.trim(a)]=true;
}
});
}
this.permissions=p;
}
return this.permissions;
},hasFullPermissions:function(){
return this.getPermissions().View;
},getVisibility:function(){
if(!this.visibility){
this.visibility=lconn.share.util.dom.getChildElementTextContentNS(this.e,"visibility",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
}
return this.visibility;
},isRestrictedVisibility:function(){
return (lconn.share.util.dom.getChildElementTextContentNS(this.e,"restrictedVisibility",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)=="true");
},getAllSharesCount:function(){
return this.getShareCount()+this.getCollectionCount();
},isExternal:function(){
if(this._isExternal==undefined){
this._isExternal=(lconn.share.util.dom.getChildElementTextContentNS(this.e,"isExternal",lconn.share.util.dom.SNX_NAMESPACE)=="true");
}
return this._isExternal;
},isPublic:function(){
return this.getVisibility()=="public";
},isPrivate:function(){
return this.getVisibility()=="private";
},isShared:function(){
return this.getVisibility()=="shared";
},isViralShareAllowed:function(){
return (lconn.share.util.dom.getChildElementTextContentNS(this.e,"propagation",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)=="true");
},isFiledInFolder:function(){
return (lconn.share.util.dom.getChildElementTextContentNS(this.e,"isFiledInFolder",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)=="true");
},getNotifications:function(){
if(typeof this.notifications=="undefined"&&this.e){
var n=this.notifications={};
var e=lconn.share.util.dom.getChildElementNS(this.e,"notifications",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
if(e){
var c;
for(var i=0;c=e.childNodes[i];i++){
if(c.nodeType==1){
n[c.localName||c.baseName]=lconn.share.util.dom.xmlText(c)=="on";
}
}
}
}
return this.notifications;
},hasNotifications:function(){
if(this.notifications){
return true;
}
return (this.e&&lconn.share.util.dom.getChildElementNS(this.e,"notifications",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE));
},getTimesDownloaded:function(){
if(typeof this.downloadCount=="undefined"){
this.downloadCount=lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementMatchingAttributeTextContentNS(this.e,"rank",lconn.share.util.dom.SNX_NAMESPACE,"scheme",null,"http://www.ibm.com/xmlns/prod/sn/hit"));
}
return this.downloadCount;
},getTimesDownloadedAnonymously:function(){
return lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementMatchingAttributeTextContentNS(this.e,"rank",lconn.share.util.dom.SNX_NAMESPACE,"scheme",null,"http://www.ibm.com/xmlns/prod/sn/anonymous_hit"));
},getUrlDownload:function(){
if(!this.urlDownload){
var qud=lconn.share.util.dom;
this.urlDownload=qud.getChildElementAttributeMatchingNS(this.e,"link",qud.ATOM_NAMESPACE,"rel",null,"enclosure","href",null);
}
return this.urlDownload;
},setRepositoryName:function(_10){
this.repositoryName=_10;
},getRepositoryName:function(){
return this.repositoryName;
},getUrlThumbnail:function(){
if(!this.urlThumbnail){
var qud=lconn.share.util.dom;
this.urlThumbnail=qud.getChildElementAttributeMatchingNS(this.e,"link",qud.ATOM_NAMESPACE,"rel",null,"thumbnail","href",null);
}
return this.urlThumbnail;
},setThumbnailData:function(_11,_12){
_8.validateSize(_11);
this._thumbnailData[_11]=_12;
},getThumbnailData:function(_13){
_8.validateSize(_13);
return this._thumbnailData[_13];
},hasDownloadInfo:function(){
return typeof this.getDownloadInfo().downloaded!="undefined";
},hasDownloaded:function(){
return this.getDownloadInfo().downloaded;
},hasDownloadedLatest:function(){
var d=this.getDownloadInfo();
return d.downloaded&&d.version==this.getLatestVersionLabel();
},getDownloadInfo:function(){
if(typeof this.downloadInfo=="undefined"&&this.e){
var n=this.downloadInfo={};
var qud=lconn.share.util.dom;
var _14=qud.DOCUMENTS_ATOM_NAMESPACE;
var e=qud.getChildElementNS(this.e,"downloadInfo",_14);
if(e){
n.date=lconn.share.util.misc.date.convertAtomDate(qud.getChildElementTextContentNS(e,"downloadedDate",_14));
n.id=qud.getChildElementTextContentNS(e,"versionUuid",_14);
n.version=parseInt(qud.getChildElementTextContentNS(e,"versionNumber",_14));
n.downloaded=!!n.id;
}
}
return this.downloadInfo;
},isLocked:function(){
var _15=this.getLock();
if(_15&&_15.getType()!="NONE"){
return true;
}
return false;
},getLock:function(){
if(typeof this.lock=="undefined"&&this.e){
var qud=lconn.share.util.dom;
var _16=qud.getChildElementNS(this.e,"lock",qud.DOCUMENTS_ATOM_NAMESPACE);
this.lock=_16?new lconn.share.bean.Lock(_16):null;
}
return this.lock;
},getLockOwner:function(){
if(!this.ccmFileLocked&&this.e){
if(lconn.share.util.dom.getChildElementTextContentNS(this.e,"locked",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)){
var e=lconn.share.util.dom.getElementsByTagNameNS(this.e,"lockOwner",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
if(e){
this.ccmFileLocked=new lconn.share.bean.User(e);
return this.ccmFileLocked;
}
}
return null;
}
},getUrlEntry:function(){
var qud=lconn.share.util.dom;
return lconn.share.util.dom.getChildElementAttributeMatchingNS(this.e,"link",qud.ATOM_NAMESPACE,"rel",null,"self","href",null);
},getUrlEdit:function(){
var qud=lconn.share.util.dom;
return lconn.share.util.dom.getChildElementAttributeMatchingNS(this.e,"link",qud.ATOM_NAMESPACE,"rel",null,"edit","href",null);
},getUrlFeed:function(){
var qud=lconn.share.util.dom;
return lconn.share.util.dom.getChildElementAttributeMatchingNS(this.e,"link",qud.ATOM_NAMESPACE,"rel",null,"replies","href",null);
},getUrlAlternate:function(){
var qud=lconn.share.util.dom;
return lconn.share.util.dom.getChildElementAttributeMatchingNS(this.e,"link",qud.ATOM_NAMESPACE,"rel",null,"alternate","href",null);
},getUrlSummary:function(){
if(!this._urlSummary){
this._urlSummary=this.getUrlAlternate();
}
return this._urlSummary;
},getUrlThumbnail:function(){
var qud=lconn.share.util.dom;
return lconn.share.util.dom.getChildElementAttributeMatchingNS(this.e,"link",qud.ATOM_NAMESPACE,"rel",null,"thumbnail","href",null);
},getThumbnailUrl:function(_17){
if(!_17){
return this.getUrlThumbnail();
}else{
return this.getThumbnailData(_17)||this.getUrlThumbnail()||this.buildThumbnailUrl(_17);
}
},buildThumbnailUrl:function(_18){
if(this.isFilesContext()){
return;
}
if(this.isLibraryContext()){
repositoryName=this.getRepositoryName();
cmisVersionSeriesId=this.getCMISVersionSeriesId();
if(!repositoryName){
throw {name:"InvalidArgumentException",message:"One of the following arguments was invalid: repositoryName=("+repositoryName+")"};
}
if(!cmisVersionSeriesId){
return;
}
_8.validateSize(_18);
return _7.getThumbnailSingleURL(_7.getServiceName(this),cmisVersionSeriesId,repositoryName,_18);
}
return;
},getUrlVia:function(){
var qud=lconn.share.util.dom;
return this.viaUrl=lconn.share.util.dom.getChildElementAttributeMatchingNS(this.e,"link",qud.ATOM_NAMESPACE,"rel",null,"via","href",null)||this.getUrlAlternate();
},getUrlVia:function(){
var qud=lconn.share.util.dom;
return this.viaUrl=lconn.share.util.dom.getChildElementAttributeMatchingNS(this.e,"link",qud.ATOM_NAMESPACE,"rel",null,"via","href",null)||this.getUrlAlternate();
},isIBMDocsFile:function(){
if(!this.isLibraryContext()){
return false;
}
var _19=lconn.share.util.dom.getChildElementTextContentNS(this.e,"IBMDocsState",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
return !!_19&&_19!=="none";
},getTags:function(){
if(!this.tags){
var _1a=[];
if(this.e){
for(var i=0;i<this.e.childNodes.length;i++){
var _1b=this.e.childNodes[i];
if(_1b.nodeName=="category"&&_1b.getAttribute("scheme")==null){
_1a.push(_1b.getAttribute("term"));
}
}
}
this.tags=_1a;
}
return this.tags;
},getSize:function(){
if(typeof this.size=="undefined"){
var qud=lconn.share.util.dom;
this.size=parseInt(lconn.share.util.dom.getChildElementAttributeMatchingNS(this.e,"link",qud.ATOM_NAMESPACE,"rel",null,"enclosure","length",null));
}
return this.size;
},getTotalSize:function(){
if(typeof this.totalSize=="undefined"){
this.totalSize=parseInt(lconn.share.util.dom.getChildElementTextContentNS(this.e,"totalMediaSize",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE));
}
return this.totalSize;
},getMimeType:function(){
var qud=lconn.share.util.dom;
return lconn.share.util.dom.getChildElementAttributeMatchingNS(this.e,"link",qud.ATOM_NAMESPACE,"rel",null,"enclosure","type",null);
},getDocumentId:function(){
lconn.share.util.dom.getChildElementTextContentNS(this.e,"documentId",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
},getVersionId:function(){
return lconn.share.util.dom.getChildElementTextContentNS(this.e,"versionUuid",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
},getBatchThumbnailId:function(){
return this.getVersionId()||this.getCMISVersionId()||this.getCMISDocumentId()||this.getVersionIdFromNexusId();
},getSingleThumbnailId:function(){
return this.getCMISVersionSeriesId();
},getCMISVersionId:function(){
return lconn.share.util.dom.getChildElementTextContentNS(this.e,"cmisVersionID",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
},getCMISVersionSeriesId:function(){
return lconn.share.util.dom.getChildElementTextContentNS(this.e,"cmisVersionSeriesID",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
},getMalwareScanState:function(){
return lconn.share.util.dom.getChildElementTextContentNS(this.e,"malwareScanState",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
},getCMISDocumentId:function(){
var _1c=lconn.share.util.dom.getChildElementTextContentNS(this.e,"cmisDocumentID",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
if(!_1c){
var _1d=this.getDraftId();
if(_1d&&_1d!==""){
_1d=_1d.replace("{","");
_1d=_1d.replace("}","");
_1c="idd_"+_1d;
}
}
return _1c;
},getDraftId:function(){
return lconn.share.util.dom.getChildElementTextContentNS(this.e,"draftUuid",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
},getVersionIdFromNexusId:function(){
var _1e="idd_";
var _1f=this.getNexusId();
if(_1f){
var _20=_1f.substring(_1f.lastIndexOf(";")+1);
var _21=_20.slice(1,-1);
var _22=_1e+_21;
return _22;
}
},getNexusId:function(){
return lconn.share.util.dom.getChildElementTextContentNS(this.e,"nexusId",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
},getVersionLabel:function(){
return lconn.share.util.dom.getChildElementTextContentNS(this.e,"versionLabel",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
},getDocumentVersionId:function(){
return lconn.share.util.dom.getChildElementTextContentNS(this.e,"documentVersionUuid",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
},getDocumentVersionLabel:function(){
return lconn.share.util.dom.getChildElementTextContentNS(this.e,"documentVersionLabel",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
},getCurrentVersionId:function(){
return this.getVersionId()||this.getDocumentVersionId();
},getCurrentVersionLabel:function(){
return this.getVersionLabel()||this.getDocumentVersionLabel();
},getLatestVersionId:function(){
return this.getDocumentVersionId()||this.getVersionId();
},getLatestVersionLabel:function(){
return this.getDocumentVersionLabel()||this.getVersionLabel();
},getCommentCount:function(){
if(typeof this.commentCount=="undefined"){
var qud=lconn.share.util.dom;
this.commentCount=lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementAttributeMatchingNS(this.e,"link",qud.ATOM_NAMESPACE,"rel",null,"replies","count",lconn.share.util.dom.THREAD_ATOM_NAMESPACE));
}
return this.commentCount;
},getShareCount:function(){
if(typeof this.shareCount=="undefined"){
this.shareCount=lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementMatchingAttributeTextContentNS(this.e,"rank",lconn.share.util.dom.SNX_NAMESPACE,"scheme",null,"http://www.ibm.com/xmlns/prod/sn/share"),0);
}
return this.shareCount;
},getCollectionCount:function(){
if(typeof this.collectionCount=="undefined"){
this.collectionCount=lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementMatchingAttributeTextContentNS(this.e,"rank",lconn.share.util.dom.SNX_NAMESPACE,"scheme",null,"http://www.ibm.com/xmlns/prod/sn/collections"),0);
}
return this.collectionCount;
},getReferenceCount:function(){
if(typeof this.referenceCount=="undefined"){
this.referenceCount=lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementMatchingAttributeTextContentNS(this.e,"rank",lconn.share.util.dom.SNX_NAMESPACE,"scheme",null,"http://www.ibm.com/xmlns/prod/sn/references"),0);
}
return this.referenceCount;
},getAttachmentCount:function(){
if(typeof this.attachmentCount=="undefined"){
this.attachmentCount=lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementMatchingAttributeTextContentNS(this.e,"rank",lconn.share.util.dom.SNX_NAMESPACE,"scheme",null,"http://www.ibm.com/xmlns/prod/sn/attachments"));
}
return this.attachmentCount;
},getVersionCount:function(){
if(typeof this.versionCount=="undefined"){
this.versionCount=lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementMatchingAttributeTextContentNS(this.e,"rank",lconn.share.util.dom.SNX_NAMESPACE,"scheme",null,"http://www.ibm.com/xmlns/prod/sn/versions"));
}
return this.versionCount;
},getMicroblogCount:function(){
if(typeof this.microblogsCount=="undefined"){
this.microblogsCount=lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementMatchingAttributeTextContentNS(this.e,"rank",lconn.share.util.dom.SNX_NAMESPACE,"scheme",null,"http://www.ibm.com/xmlns/prod/sn/microblogs"));
}
return this.microblogsCount;
},getVisibleCollectionCount:function(){
if(typeof this.visibleCollectionCount=="undefined"){
this.visibleCollectionCount=lconn.share.util.dom.getChildElementTextContentNS(this.e,"visibleCollectionCount",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
}
return this.visibleCollectionCount;
}});
dojo.declare("lconn.share.bean.FileFromJson",[lconn.share.bean.AbstractModerateBeanFromJson,lconn.share.bean.ConfigurableBean],{constructor:function(doc){
this.d=doc;
},getTitle:function(){
return this.d.title;
},getUrlEntry:function(){
if(!this.urlEntry){
var _23=lconn.share.util.misc.indexById(this.d.links,"rel","self");
if(_23){
this.urlEntry=_23.href;
}
}
return this.urlEntry;
},getUrlEdit:function(){
if(!this.urlEdit){
var _24=lconn.share.util.misc.indexById(this.d.links,"rel","edit");
if(_24){
this.urlEdit=_24.href;
}
}
return this.urlEdit;
},getUrlFeed:function(){
if(!this.urlFeed){
var _25=lconn.share.util.misc.indexById(this.d.links,"rel","replies");
if(_25){
this.urlFeed=_25.href;
}
}
return this.urlFeed;
},getSystemLastModified:function(){
return lconn.share.util.misc.date.convertAtomDate(this.d.updated);
},getShareCount:function(){
return lconn.share.util.text.parseInt(lconn.share.util.misc.indexById(this.d.extensions,"name","snx:rank").children[0],0);
},getPublished:function(){
return lconn.share.util.misc.date.convertAtomDate(this.d.published);
},getSystemCreated:function(){
return this.getPublished();
},getMimeType:function(){
if(!this.mimeType){
var _26=lconn.share.util.misc.indexById(this.d.links,"rel","enclosure");
if(_26){
this.mimeType=_26.type;
}
}
return this.mimeType;
},getExtension:function(){
return lconn.share.util.text.getExtension(this.getLabel());
},getLibraryId:function(){
return lconn.share.util.misc.indexById(this.d.extensions,"name","td:libraryId").children[0];
},getLibraryType:function(){
return lconn.share.util.misc.indexById(this.d.extensions,"name","td:libraryType").children[0];
},getName:function(){
return this.getLabel();
},getUrlDownload:function(){
if(!this.urlDownload){
var _27=lconn.share.util.misc.indexById(this.d.links,"rel","enclosure");
if(_27){
this.urlDownload=_27.href;
}
}
return this.urlDownload;
},getDescription:function(){
return this.d.summary;
},getLabel:function(){
if(!this.label){
this.label=lconn.share.util.misc.indexById(this.d.links,"rel","enclosure").title;
}
return this.label;
},getAtomId:function(){
if(this.atomId){
return this.atomId;
}
return this.atomId=this.d.id;
},getContent:function(){
if(this.content){
return this.content;
}
return this.content=this.d.content;
},getId:function(){
if(this.id){
return this.id;
}
return this.id=lconn.share.util.misc.indexById(this.d.extensions,"name","td:uuid").children[0];
},getCommentCount:function(){
if(this.commentCount){
return this.commentCount;
}
return this.commentCount=lconn.share.util.text.parseInt(lconn.share.util.misc.indexById(this.d.links,"rel","replies").attributes["td:commentCount"].value,0);
},getMicroblogCount:function(){
if(typeof this.microblogsCount=="undefined"){
this.microblogsCount=0;
var arr=this.d.extensions;
for(var i=0;i<arr.length;i++){
var ext=arr[i];
if(ext.name=="snx:rank"&&ext.attributes.scheme=="http://www.ibm.com/xmlns/prod/sn/microblogs"){
this.microblogsCount=lconn.share.util.text.parseInt(ext.children[0]);
break;
}
}
}
return this.microblogsCount;
},getOrgId:function(){
if(this.orgId){
return this.orgId;
}
var _28=lconn.share.util.misc.indexById(this.d.extensions,"name","snx:orgId");
if(_28){
this.orgId=_28.children[0];
}
return this.orgId;
},getOrgName:function(){
if(this.orgName){
return this.orgName;
}
var _29=lconn.share.util.misc.indexById(this.d.extensions,"name","snx:orgName");
if(_29){
this.orgName=_29.children[0];
}
return this.orgName;
},getUrlAlternate:function(){
if(!this.alternate){
var _2a=lconn.share.util.misc.indexById(this.d.links,"rel","alternate");
if(_2a){
this.alternate=_2a.href;
}
}
return this.alternate;
},getUrlThumbnail:function(){
if(!this.thumbnail){
var _2b=lconn.share.util.misc.indexById(this.d.links,"rel","thumbnail");
if(_2b){
this.thumbnail=_2b.href;
}
}
return this.thumbnail;
},getUrlVia:function(){
if(!this.alternate){
var _2c=lconn.share.util.misc.indexById(this.d.links,"rel","via");
this.alternate=_2c.href||this.getUrlAlternate();
}
return this.alternate;
},getSize:function(){
if(!this.length){
this.length=lconn.share.util.misc.indexById(this.d.links,"rel","enclosure").length;
}
return this.length;
},getTotalSize:function(){
if(!this.totalSize){
this.totalSize=parseInt(lconn.share.util.misc.indexById(this.d.extensions,"name","td:totalMediaSize").children[0]);
}
return this.totalSize;
},getUpdated:function(){
if(!this.updated){
this.updated=lconn.share.util.misc.date.convertAtomDate(lconn.share.util.misc.indexById(this.d.extensions,"name","td:modified").children[0]);
}
return this.updated;
},getAuthor:function(){
if(!this.author){
this.author=new lconn.share.bean.UserFromJson(this.d.authors[0]);
}
return this.author;
},getModifier:function(){
if(!this.modifier){
this.modifier=new lconn.share.bean.UserFromJson(lconn.share.util.misc.indexById(this.d.extensions,"name","td:modifier").children);
}
return this.modifier;
},getFavorite:function(){
if(!this.favorite){
this.favorite=(lconn.share.util.dom.getChildElementTextContentNS(this.e,"favorite",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)=="true");
}
return this.favorite;
},getCategory:function(){
if(!this.category){
this.category=this.d.categories[0].term;
}
return this.category;
},getVersionNumber:function(){
if(!this.version){
this.version=lconn.share.util.text.parseInt(lconn.share.util.misc.indexById(this.d.extensions,"name","td:versionNumber").children[0],1);
}
return this.version;
},getVersionId:function(){
if(!this.versionId){
this.versionId=lconn.share.util.misc.indexById(this.d.extensions,"name","td:versionUuid").children[0];
}
return this.versionId;
},getVersionLabel:function(){
if(!this.versionLabel){
this.versionLabel=lconn.share.util.misc.indexById(this.d.extensions,"name","td:versionLabel").children[0];
}
return this.versionLabel;
},getVisibility:function(){
if(!this.vis){
this.vis=lconn.share.util.misc.indexById(this.d.extensions,"name","td:visibility").children[0];
}
return this.vis;
},isPublic:function(){
return this.getVisibility()=="public";
},isShared:function(){
return this.getVisibility()=="shared";
},isPrivate:function(){
return this.getVisibility()=="private";
},isExternal:function(){
if(this._isExternal==undefined){
var _2d=lconn.share.util.misc.indexById(this.d.extensions,"name","snx:isExternal");
this._isExternal=_2d?_2d.children[0]:false;
}
return this._isExternal;
},getAllSharesCount:function(){
return this.getShareCount()+this.getCollectionCount();
},getShareCount:function(){
if(typeof this.shareCount=="undefined"){
this.shareCount=0;
var arr=this.d.extensions;
for(var i=0;i<arr.length;i++){
var ext=arr[i];
if(ext.name=="snx:rank"&&ext.attributes.scheme=="http://www.ibm.com/xmlns/prod/sn/share"){
this.shareCount=lconn.share.util.text.parseInt(ext.children[0]);
break;
}
}
}
return this.shareCount;
},getReferenceCount:function(){
if(typeof this.referenceCount=="undefined"){
this.collectionCount=0;
var arr=this.d.extensions;
for(var i=0;i<arr.length;i++){
var ext=arr[i];
if(ext.name=="snx:rank"&&ext.attributes.scheme=="http://www.ibm.com/xmlns/prod/sn/references"){
this.referenceCount=lconn.share.util.text.parseInt(ext.children[0]);
break;
}
}
}
return this.referenceCount;
},getCollectionCount:function(){
if(typeof this.collectionCount=="undefined"){
this.collectionCount=0;
var arr=this.d.extensions;
for(var i=0;i<arr.length;i++){
var ext=arr[i];
if(ext.name=="snx:rank"&&ext.attributes.scheme=="http://www.ibm.com/xmlns/prod/sn/collections"){
this.collectionCount=lconn.share.util.text.parseInt(ext.children[0]);
break;
}
}
}
return this.collectionCount;
}});
dojo.declare("lconn.share.bean.PartialFile",null,{constructor:function(_2e){
if(_2e){
dojo.mixin(this,_2e);
}
}});
dojo.declare("lconn.share.bean.FileCopy",null,{hardcoded:["isPublic","isPrivate","isUserRecommended","getName"],baseClass:lconn.share.bean.File,constructor:function(doc){
doc=doc||new this.baseClass(null);
var m;
for(var key in doc){
var f=doc[key];
if(!this[key]){
if(typeof f=="function"){
if(dojo.indexOf(this.hardcoded,key)!=-1){
this[key]=f;
}else{
if(m=/^get([A-Z])(.*)/.exec(key)){
var _2f=m[1].toLowerCase()+m[2];
var _30=f.apply(doc);
if(_30&&_30.nodeType){
this[_2f]=_30;
}else{
if(typeof _30!="undefined"){
this[_2f]=dojo.clone(_30);
}
}
this[key]=dojo.partial(this.get,_2f);
}else{
if(m=/^is([A-Z])(.*)/.exec(key)){
var _2f=m[1].toLowerCase()+m[2];
var _30=f.apply(doc);
if(_30&&_30.nodeType){
this[_2f]=_30;
}else{
if(typeof _30!="undefined"){
this[_2f]=dojo.clone(_30);
}
}
this[key]=dojo.partial(this.get,_2f);
}
}
}
}
}
}
},get:function(s){
return this[s];
}});
lconn.share.bean.File.SPLIT_TAGS=/[,\s\u3000]+/;
lconn.share.bean.File.splitTags=function(_31){
_31=(_31.toLowerCase()||"").replace(/["']/g,"");
var _32=_31.split(lconn.share.bean.File.SPLIT_TAGS);
var _33={};
return dojo.filter(_32,function(s){
if(s.length>0&&!_33[s]){
_33[s]=1;
return true;
}
return false;
});
};
dojo.declare("lconn.share.bean.FileCMIS",[lconn.share.bean.File,lconn.share.bean.AbstractCMISBean],{getId:function(){
if(!this.id){
this.id=this.getPropertyId("cmis:objectId");
}
return this.id;
},isFolder:function(){
return false;
},getName:function(){
return this.getTitle();
},getTitle:function(){
if(!this.title){
this.title=this.getPropertyString("cmis:name");
}
if(!this.title){
this.title=this.inherited(arguments);
}
return this.title;
},getLabel:function(){
if(!this.label){
this.label=this.getPropertyString("cmis:contentStreamFileName");
}
if(!this.label){
this.label=this.inherited(arguments);
}
return this.label;
},getDescription:function(){
return this.getPropertyString("snx:summary");
},getChangeSummary:function(){
return this.getPropertyString("cmis:checkinComment");
},getAuthor:function(){
return this.getAddedBy();
},getObjectTypeId:function(){
return this.getPropertyId("cmis:objectTypeId");
},getLibraryId:function(){
console.log("CMISFile.getLibraryId()");
},getLibraryType:function(){
return this.getPropertyString("snx:repositoryType");
},getLibraryAuthor:function(){
console.log("CMISFile.getLibraryAuthor()");
},getAddedBy:function(){
if(!this.addedBy&&this.e){
this.addedBy=new lconn.share.bean.UserFromCMIS(lconn.share.util.dom.xpathNode(this.e,"cmisra:object/cmis:properties/cmis:propertyString[@propertyDefinitionId='cmis:createdBy']"));
}
return this.addedBy;
},getAdded:function(){
if(!this.added){
this.added=lconn.share.util.misc.date.convertAtomDate(this.getPropertyDateTime("cmis:creationDate"))||this.getSystemLastModified();
}
return this.added;
},getSharedBy:function(){
console.log("CMISFile.getSharedBy()");
return this.getAddedBy();
},getShared:function(){
console.log("CMISFile.getShared()");
return this.getAdded();
},getModifier:function(){
if(!this.modifier&&this.e){
this.modifier=new lconn.share.bean.UserFromCMIS(lconn.share.util.dom.xpathNode(this.e,"cmisra:object/cmis:properties/cmis:propertyString[@propertyDefinitionId='cmis:lastModifiedBy']"));
}
return this.modifier;
},getUpdated:function(){
if(!this.updated){
this.updated=lconn.share.util.misc.date.convertAtomDate(this.getPropertyDateTime("cmis:lastModificationDate"))||this.getSystemLastModified();
}
return this.updated;
},getPublished:function(){
console.log("CMISFile.getPublished()");
return this.getAdded();
},getSystemLastModified:function(){
console.log("CMISFile.getSystemLastModified()");
return this.getUpdated();
},getSystemCreated:function(){
console.log("CMISFile.getSystemCreated()");
return this.getAdded();
},getRatingCount:function(){
if(typeof this.ratingCount=="undefined"){
this.ratingCount=this.getPropertyInteger("snx:recommendationsCount");
}
return this.ratingCount;
},getUrlRecommendation:function(){
console.log("CMISFile.getUrlRecommendation()");
return null;
},isUserRecommended:function(){
console.log("CMISFile.isUserRecommended()");
return false;
},_CMIS_PERMISSIONS:{"cmis:canGetProperties":["ViewProperties"],"cmis:canGetContentStream":["ViewContent","View"],"cmis:canSetContentStream":["EditContent"],"cmis:canUpdateProperties":["Edit","EditProperties"],"cmis:canDeleteObject":["Delete","DeleteFromCollection"],"cmis:canAddObjectToFolder":["GrantAccessView"],"cmis:canRemoveObjectFromFolder":["DeleteFromCollection"],"cmis:canApplyACL":["GrantAccess","GrantAccessView","GrantAccessEdit","LockOverride"]},getPermissions:function(){
if(!this.permissions){
var qud=lconn.share.util.dom;
this.permissions={};
var _34=lconn.share.util.dom.xpath(this.e,"cmisra:object/cmis:allowableActions/*[text()='true']");
for(var n=null,i=0;n=_34[i++];){
var _35=this._CMIS_PERMISSIONS[n.nodeName]||[];
for(var p=null,j=0;p=_35[j++];){
this.permissions[p]=true;
}
}
}
return this.permissions;
},isExternal:function(){
if(typeof this._isExternal=="undefined"){
this._isExternal=this.getPropertyBoolean("snx:isExternal",null);
}
return this._isExternal;
},getVisibility:function(){
if(!this.visibility){
this.visibility=this.getPropertyString("snx:visibilityComputed");
}
return this.visibility;
},isViralShareAllowed:function(){
if(typeof this.isSharedViral=="undefined"){
this.isSharedViral=this.getPropertyBoolean("snx:isSharedViral",false);
}
return this.isSharedViral;
},getNotifications:function(){
console.log("CMISFile.getNotifications()");
return {};
},hasNotifications:function(){
console.log("CMISFile.hasNotifications()");
return false;
},getTimesDownloaded:function(){
if(typeof this.downloadCount=="undefined"){
this.downloadCount=this.getPropertyInteger("snx:downloadCount");
}
return this.downloadCount;
},getTimesDownloadedAnonymously:function(){
if(typeof this.anonymousDownloadCount=="undefined"){
this.anonymousDownloadCount=this.getPropertyInteger("snx:downloadCountAnon");
}
return this.anonymousDownloadCount;
},getUrlFeed:function(){
console.log("CMISFile.getUrlFeed()");
return null;
},getUrlAlternate:function(){
var url=lconn.share.util.dom.xpathString(this.e,"atom:link[@rel='alternate' and @type='text/html']/@href");
return url;
},getTags:function(){
console.log("CMISFile.getTags()");
return [];
},getSize:function(){
if(typeof this.size=="undefined"){
this.size=this.getPropertyInteger("cmis:contentStreamLength");
}
return this.size;
},getTotalSize:function(){
if(typeof this.totalSize=="undefined"){
this.totalSize=this.getPropertyInteger("snx:sizeAppliedToQuota");
}
return this.totalSize;
},getVersionLabel:function(){
if(typeof this.versionLabel=="undefined"){
this.versionLabel=this.getPropertyString("cmis:versionLabel");
}
return this.versionLabel;
},getCommentCount:function(){
if(typeof this.commentCount=="undefined"){
this.commentCount=this.getPropertyInteger("snx:commentCount");
}
return this.commentCount;
},getShareCount:function(){
console.log("CMISFile.getShareCount()");
return 0;
},getCollectionCount:function(){
console.log("CMISFile.getCollectionCount()");
return 0;
},getVersionCount:function(){
console.log("CMISFile.getVersionCount()");
return 1;
}});
dojo.declare("lconn.share.bean.FileFromCMISJson",lconn.share.bean.FileFromJson,{constructor:function(doc){
this.d=doc;
doc.links=doc.links||[];
doc.extensions=doc.extensions||[];
doc.categories=doc.categories||[];
doc.properties=doc.properties||[];
},isFolder:function(){
return false;
},getName:function(){
return this.getTitle();
},getTitle:function(){
if(!this.title){
this.title=this._getProperty("cmis:name");
}
return this.title;
},getLabel:function(){
if(!this.label){
this.label=this._getProperty("cmis:contentStreamFileName");
}
return this.label;
},getId:function(){
return this._getProperty("cmis:objectId");
},getSize:function(){
if(!this.length){
this.length=parseInt(this._getProperty("cmis:contentStreamLength"));
}
return this.length;
},getTotalSize:function(){
if(!this.totalSize){
this.totalSize=parseInt(this._getProperty("snx:sizeAppliedToQuota"));
}
return this.totalSize;
},getUpdated:function(){
if(!this.updated){
this.updated=lconn.share.util.misc.date.convertAtomDate(this._getProperty("cmis:lastModificationDate"));
}
return this.updated;
},getAuthor:function(){
if(!this.author){
this.author=this._getUser("cmis:createdBy");
}
return this.author;
},getModifier:function(){
if(!this.modifier){
this.modifier=this._getUser("cmis:lastModifiedBy");
}
return this.modifier;
},getCategory:function(){
console.log("FromFromCMISJson.getCategory()");
return null;
},getVersionNumber:function(){
if(!this.version){
this.version=lconn.share.util.text.parseInt(this._getProperty("cmis:versionLabel"),1);
}
return this.version;
},getVisibility:function(){
if(!this.vis){
this.vis=this._getProperty("snx:visibilityComputed");
}
return this.vis;
},isExternal:function(){
if(this._isExternal==undefined){
this._isExternal=this._getProperty("snx:isExternal")=="true";
}
return this._isExternal;
},getShareCount:function(){
console.log("FromFromCMISJson.getCollectionCount()");
return 0;
},getCollectionCount:function(){
console.log("FromFromCMISJson.getCollectionCount()");
return 0;
},_getUser:function(id){
var _36={};
try{
var el=lconn.share.util.misc.indexById(this.d.properties,"propertyDefinitionId",id);
if(el){
_36.id=el.principalId;
_36.email=el.email;
_36.name=el.value[0].value;
}
}
catch(e){
console.log(e);
}
return _36;
},_getProperty:function(id){
var _37;
try{
_37=lconn.share.util.misc.indexById(this.d.properties,"propertyDefinitionId",id).value[0].value;
}
catch(e){
console.log(e);
}
return _37;
}});
lconn.share.bean.File.CONTEXTS={};
lconn.share.bean.File.CONTEXTS.FILES=["communityFiles","personalFiles"];
lconn.share.bean.File.CONTEXTS.ECM=["communityECMFiles","library"];
lconn.share.bean.File.createBean=function(e,opt){
var _38=opt&&opt.apiType=="cmis";
var _39=opt&&opt.format=="json";
if(_38){
return _39?new lconn.share.bean.FileFromCMISJson(e):new lconn.share.bean.FileCMIS(e);
}else{
return _39?new lconn.share.bean.FileFromJson(e):new lconn.share.bean.File(e);
}
};
})();
}


;if(!dojo._hasResource["lconn.share.bean.Collection"]){
dojo._hasResource["lconn.share.bean.Collection"]=true;
dojo.provide("lconn.share.bean.Collection");












dojo.declare("lconn.share.bean.Collection",null,{constructor:function(_1){
this.e=_1;
},isFolder:function(){
return true;
},getEntry:function(){
return this.e;
},getAtomId:function(){
return lconn.share.util.dom.getChildElementTextContentNS(this.e,"id",lconn.share.util.dom.ATOM_NAMESPACE);
},getId:function(){
return lconn.share.util.dom.getChildElementTextContentNS(this.e,"uuid",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
},getName:function(){
if(!this.title){
this.title=lconn.share.util.dom.getChildElementTextContent(this.e,"title");
}
if(!this.title){
this.title=lconn.share.util.dom.getChildElementTextContentNS(this.e,"title",lconn.share.util.dom.ATOM_NAMESPACE);
}
if(!this.title){
this.title=lconn.share.util.dom.getChildElementTextContentNS(this.e,"title",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
}
return this.title;
},getAuthor:function(){
if(!this.author){
this.author=new lconn.share.bean.User(this.e.getElementsByTagName("author")[0]);
}
return this.author;
},getPolicy:function(){
if(this.policy===undefined&&this.e){
var e=lconn.share.util.dom.getElementsByTagNameNS(this.e,"policy",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
this.policy=e?new lconn.share.bean.Policy(e):null;
}
return this.policy;
},getUpdated:function(){
if(!this.updated){
this.updated=lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContentNS(this.e,"modified",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE))||this.getSystemLastModified();
}
return this.updated;
},getPublished:function(){
if(!this.published){
this.published=lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContentNS(this.e,"created",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE))||this.getSystemCreated();
}
return this.published;
},getSystemLastModified:function(){
if(!this.systemLastModified){
this.systemLastModified=lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContent(this.e,"updated"));
}
return this.systemLastModified;
},getSystemCreated:function(){
if(!this.systemCreated){
this.systemCreated=lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContent(this.e,"published"));
}
return this.systemCreated;
},getOrgId:function(){
if(this._orgId==undefined){
this._orgId=lconn.share.util.dom.getChildElementTextContentNS(this.e,"orgId",lconn.share.util.dom.SNX_NAMESPACE);
}
return this._orgId;
},getOrgName:function(){
if(this._orgName==undefined){
this._orgName=lconn.share.util.dom.getChildElementTextContentNS(this.e,"orgName",lconn.share.util.dom.SNX_NAMESPACE);
}
return this._orgName;
},getPermissions:function(){
if(!this.permissions){
var s=lconn.share.util.dom.getChildElementTextContentNS(this.e,"permissions",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
var p={};
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
},hasFullPermissions:function(){
return this.getPermissions().View;
},getVisibility:function(){
if(!this.visibility){
this.visibility=lconn.share.util.dom.getChildElementTextContentNS(this.e,"visibility",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
}
return this.visibility;
},isExternal:function(){
if(this._isExternal==undefined){
this._isExternal=(lconn.share.util.dom.getChildElementTextContentNS(this.e,"isExternal",lconn.share.util.dom.SNX_NAMESPACE)=="true");
}
return this._isExternal;
},isPublic:function(){
return this.getVisibility()=="public";
},isPrivate:function(){
return this.getVisibility()=="private";
},isShared:function(){
return this.getVisibility()=="shared";
},getDescription:function(){
return lconn.share.util.dom.getChildElementTextContent(this.e,"summary");
},getModifier:function(){
if(!this.modifier){
var e=lconn.share.util.dom.getElementsByTagNameNS(this.e,"modifier",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
if(e){
this.modifier=new lconn.share.bean.User(e);
}
}
return this.modifier;
},getNotifications:function(){
if(typeof this.notifications=="undefined"&&this.e){
var n=this.notifications={};
var e=lconn.share.util.dom.getChildElementNS(this.e,"notifications",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
if(e){
var c;
for(var i=0;c=e.childNodes[i];i++){
if(c.nodeType==1){
n[c.localName||c.baseName]=lconn.share.util.dom.xmlText(c)=="on";
}
}
}
}
return this.notifications;
},hasNotifications:function(){
if(this.notifications){
return true;
}
return (this.e&&lconn.share.util.dom.getChildElementNS(this.e,"notifications",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE));
},getUrlEntry:function(){
return lconn.share.util.uri.makeAtomUrlIESafe(lconn.share.util.dom.getChildElementAttributeMatching(this.e,"link","rel","self","href"));
},getUrlEdit:function(){
var _2=lconn.share.util.dom;
return lconn.share.util.dom.getChildElementAttributeMatchingNS(this.e,"link",_2.ATOM_NAMESPACE,"rel",null,"edit","href",null);
},getUrlAlternate:function(){
return lconn.share.util.dom.getChildElementAttributeMatching(this.e,"link","rel","alternate","href");
},getUrlFeed:function(){
return lconn.share.util.uri.makeAtomUrlIESafe(lconn.share.util.dom.getChildElementAttribute(this.e,"content","src"));
},getShareCount:function(){
if(typeof this.shareCount=="undefined"){
this.shareCount=lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementMatchingAttributeTextContentNS(this.e,"rank",lconn.share.util.dom.SNX_NAMESPACE,"scheme",null,"http://www.ibm.com/xmlns/prod/sn/user"));
}
return this.shareCount;
},getGroupCount:function(){
if(typeof this.groupCount=="undefined"){
this.groupCount=lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementMatchingAttributeTextContentNS(this.e,"rank",lconn.share.util.dom.SNX_NAMESPACE,"scheme",null,"http://www.ibm.com/xmlns/prod/sn/group"));
}
return this.groupCount;
},getCollectionCount:function(){
if(typeof this.collectionCount=="undefined"){
var _3=lconn.share.util.dom.getChildElementMatchingAttributeTextContentNS(this.e,"rank",lconn.share.util.dom.SNX_NAMESPACE,"scheme",null,"http://www.ibm.com/xmlns/prod/sn/collections");
this.collectionCount=typeof _3=="undefined"?0:lconn.share.util.text.parseInt(_3);
}
return this.collectionCount;
},getAllSharesCount:function(){
return this.getShareCount()+this.getGroupCount();
},getMediaCount:function(){
if(typeof this.mediaCount=="undefined"){
this.mediaCount=lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementMatchingAttributeTextContentNS(this.e,"rank",lconn.share.util.dom.SNX_NAMESPACE,"scheme",null,"http://www.ibm.com/xmlns/prod/sn/documents"));
}
return this.mediaCount;
},isSearchable:function(){
return false;
},getType:function(){
if(typeof this.type=="undefined"){
this.type=lconn.share.util.dom.getChildElementTextContentNS(this.e,"type",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
}
return this.type;
},getParent:function(){
if(typeof this.parent=="undefined"){
this.parent=lconn.share.util.dom.getElementsByTagNameNS(this.e,"parent",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
}
return this.parent;
},getParentId:function(){
if(typeof this.parentId=="undefined"&&!!this.getParent()){
this.parentId=lconn.share.util.dom.getChildElementTextContentNS(this.getParent(),"uuid",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
}
return this.parentId;
},getParentName:function(){
if(typeof this.parentName=="undefined"&&!!this.getParent()){
this.parentName=lconn.share.util.dom.getChildElementTextContentNS(this.getParent(),"title",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
}
return this.parentName;
},getParentUrlAlternate:function(){
if(typeof this.parentUrlAlternate=="undefined"&&!!this.getParent()){
this.parentUrlAlternate=lconn.share.util.dom.getChildElementAttributeMatching(this.getParent(),"link","rel","alternate","href");
}
return this.parentUrlAlternate;
},canFollowing:function(){
if(typeof this.allowFollowing=="undefined"){
this.allowFollowing=(lconn.share.util.dom.getChildElementTextContentNS(this.e,"allowFollowing",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)=="true");
}
return this.allowFollowing;
},canSetFavorite:function(){
if(typeof this.allowSetFavorite=="undefined"){
this.allowSetFavorite=(lconn.share.util.dom.getChildElementTextContentNS(this.e,"allowSetFavorite",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)=="true");
}
return this.allowSetFavorite;
},getBreadcrumb:function(){
if(typeof this.ancestors=="undefined"){
this.ancestors=lconn.share.util.dom.getElementsByTagNameNS(this.e,"ancestors",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
}
if(this.ancestors&&typeof this.breadcrumbEntries=="undefined"){
this.breadcrumbEntries=lconn.share.util.dom.getElementsByTagNameNS(this.ancestors,"item",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
}
if(this.breadcrumbEntries&&typeof this.entries=="undefined"){
this.entries=[];
for(var i=0;i<this.breadcrumbEntries.length;i++){
this.entries.push(new lconn.share.bean.Collection(this.breadcrumbEntries[i]));
}
}
return this.entries;
}});
dojo.declare("lconn.share.bean.CollectionFromFeed",null,{constructor:function(_4){
this.e=_4;
},isFolder:function(){
return true;
},getEntry:function(){
return this.e;
},getAtomId:function(){
return lconn.share.util.dom.getChildElementTextContent(this.e,"id");
},getId:function(){
return lconn.share.util.dom.getChildElementTextContentNS(this.e,"uuid",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
},getName:function(){
if(!this.title){
this.title=lconn.share.util.dom.getChildElementTextContent(this.e,"title");
}
if(!this.title){
this.title=lconn.share.util.dom.getChildElementTextContentNS(this.e,"title",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
}
return this.title;
},getDescription:function(){
return lconn.share.util.dom.getChildElementTextContent(this.e,"subtitle");
},getUrlAlternate:function(){
return lconn.share.util.dom.getChildElementAttributeMatching(this.e,"link","rel","alternate","href");
},getAuthor:function(){
if(!this.author){
this.author=new lconn.share.bean.User(this.e.getElementsByTagName("author")[0]);
}
return this.author;
},getPolicy:function(){
if(this.policy===undefined&&this.e){
var e=lconn.share.util.dom.getElementsByTagNameNS(this.e,"policy",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
this.policy=e?lconn.share.bean.Policy.createPolicy(e):null;
}
return this.policy;
},getUpdated:function(){
if(!this.updated){
this.updated=lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContentNS(this.e,"modified",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE))||this.getSystemLastModified();
}
return this.updated;
},getPublished:function(){
if(!this.published){
this.published=lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContentNS(this.e,"created",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE))||this.getSystemCreated();
}
return this.published;
},getSystemLastModified:function(){
if(!this.systemLastModified){
this.systemLastModified=lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContent(this.e,"updated"));
}
return this.systemLastModified;
},getSystemCreated:function(){
if(!this.systemCreated){
this.systemCreated=lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContent(this.e,"published"));
}
return this.systemCreated;
},getOrgId:function(){
if(this._orgId==undefined){
this._orgId=lconn.share.util.dom.getChildElementTextContentNS(this.e,"orgId",lconn.share.util.dom.SNX_NAMESPACE);
}
return this._orgId;
},getOrgName:function(){
if(this._orgName==undefined){
this._orgName=lconn.share.util.dom.getChildElementTextContentNS(this.e,"orgName",lconn.share.util.dom.SNX_NAMESPACE);
}
return this._orgName;
},getPermissions:function(){
if(!this.permissions){
var s=lconn.share.util.dom.getChildElementTextContentNS(this.e,"permissions",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
var p={};
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
},hasFullPermissions:function(){
return this.getPermissions().View;
},getModifier:function(){
if(!this.modifier){
var e=dojo.filter(lconn.share.util.dom.getElementsByTagNameNS(this.e,"modifier",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE),function(el){
return el.parentNode==this;
},this.e);
if(e[0]){
this.modifier=new lconn.share.bean.User(e[0]);
}
}
return this.modifier;
},getNotifications:function(){
if(typeof this.notifications=="undefined"&&this.e){
var n=this.notifications={};
var e=lconn.share.util.dom.getChildElementNS(this.e,"notifications",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
if(e){
var c;
for(var i=0;c=e.childNodes[i];i++){
if(c.nodeType==1){
n[c.localName||c.baseName]=lconn.share.util.dom.xmlText(c)=="on";
}
}
}
}
return this.notifications;
},hasNotifications:function(){
if(this.notifications){
return true;
}
return (this.e&&lconn.share.util.dom.getChildElementNS(this.e,"notifications",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE));
},getVisibility:function(){
if(!this.visibility){
this.visibility=lconn.share.util.dom.getChildElementTextContentNS(this.e,"visibility",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
}
return this.visibility;
},isPublic:function(){
return this.getVisibility()=="public";
},isPrivate:function(){
return this.getVisibility()=="private";
},isShared:function(){
return this.getVisibility()=="shared";
},isExternal:function(){
if(this._isExternal==undefined){
this._isExternal=(lconn.share.util.dom.getChildElementTextContentNS(this.e,"isExternal",lconn.share.util.dom.SNX_NAMESPACE)=="true");
}
return this._isExternal;
},getUrlEntry:function(){
return lconn.share.util.uri.makeAtomUrlIESafe(lconn.share.util.dom.getChildElementAttributeMatching(this.e,"link","rel","edit","href"));
},getUrlFeed:function(){
return lconn.share.util.uri.makeAtomUrlIESafe(lconn.share.util.dom.getChildElementAttributeMatching(this.e,"link","rel","self","href"));
},getShareCount:function(){
if(typeof this.shareCount=="undefined"){
this.shareCount=lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementMatchingAttributeTextContentNS(this.e,"rank",lconn.share.util.dom.SNX_NAMESPACE,"scheme",null,"http://www.ibm.com/xmlns/prod/sn/user"));
}
return this.shareCount;
},getGroupCount:function(){
if(typeof this.groupCount=="undefined"){
this.groupCount=lconn.share.util.text.parseInt(lconn.share.util.dom.getChildElementMatchingAttributeTextContentNS(this.e,"rank",lconn.share.util.dom.SNX_NAMESPACE,"scheme",null,"http://www.ibm.com/xmlns/prod/sn/group"));
}
return this.groupCount;
},getCollectionCount:function(){
if(typeof this.collectionCount=="undefined"){
var _5=lconn.share.util.dom.getChildElementMatchingAttributeTextContentNS(this.e,"rank",lconn.share.util.dom.SNX_NAMESPACE,"scheme",null,"http://www.ibm.com/xmlns/prod/sn/collections");
this.collectionCount=typeof _5=="undefined"?0:lconn.share.util.text.parseInt(_5);
}
return this.collectionCount;
},getAllSharesCount:function(){
return this.getShareCount()+this.getGroupCount();
},getMediaCount:function(){
if(typeof this.mediaCount=="undefined"){
this.mediaCount=lconn.share.util.dom.getChildElementMatchingAttributeTextContentNS(this.e,"rank",lconn.share.util.dom.SNX_NAMESPACE,"scheme",null,"http://www.ibm.com/xmlns/prod/sn/documents");
}
return this.mediaCount;
},getItemCount:function(){
if(typeof this.itemCount=="undefined"){
var _6=lconn.share.util.dom.getChildElementMatchingAttributeTextContentNS(this.e,"rank",lconn.share.util.dom.SNX_NAMESPACE,"scheme",null,"http://www.ibm.com/xmlns/prod/sn/item");
this.itemCount=typeof _6=="undefined"?0:lconn.share.util.text.parseInt(_6);
}
return this.itemCount;
},getType:function(){
if(typeof this.type=="undefined"){
this.type=lconn.share.util.dom.getChildElementTextContentNS(this.e,"type",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
}
return this.type;
},getParent:function(){
if(typeof this.parent=="undefined"){
this.parent=lconn.share.util.dom.getChildElementNS(this.e,"parent",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
}
return this.parent;
},getParentId:function(){
if(typeof this.parentId=="undefined"&&!!this.getParent()){
this.parentId=lconn.share.util.dom.getChildElementTextContentNS(this.getParent(),"uuid",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
}
return this.parentId;
},getParentName:function(){
if(typeof this.parentName=="undefined"&&!!this.getParent()){
this.parentName=lconn.share.util.dom.getChildElementTextContentNS(this.getParent(),"title",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
}
return this.parentName;
},getParentUrlAlternate:function(){
if(typeof this.parentUrlAlternate=="undefined"&&!!this.getParent()){
this.parentUrlAlternate=lconn.share.util.dom.getChildElementAttributeMatching(this.getParent(),"link","rel","alternate","href");
}
return this.parentUrlAlternate;
},canFollowing:function(){
if(typeof this.allowFollowing=="undefined"){
this.allowFollowing=(lconn.share.util.dom.getChildElementTextContentNS(this.e,"allowFollowing",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)=="true");
}
return this.allowFollowing;
},canSetFavorite:function(){
if(typeof this.allowSetFavorite=="undefined"){
this.allowSetFavorite=(lconn.share.util.dom.getChildElementTextContentNS(this.e,"allowSetFavorite",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)=="true");
}
return this.allowSetFavorite;
},getBreadcrumb:function(){
if(typeof this.ancestors=="undefined"){
this.ancestors=lconn.share.util.dom.getElementsByTagNameNS(this.e,"ancestors",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
}
if(this.ancestors&&typeof this.breadcrumbEntries=="undefined"){
this.breadcrumbEntries=lconn.share.util.dom.getElementsByTagNameNS(this.ancestors,"item",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
}
if(this.breadcrumbEntries&&typeof this.entries=="undefined"){
this.entries=[];
for(var i=0;i<this.breadcrumbEntries.length;i++){
this.entries.push(new lconn.share.bean.Collection(this.breadcrumbEntries[i]));
}
}
return this.entries;
}});
dojo.declare("lconn.share.bean.CollectionFromJson",null,{constructor:function(_7){
this.d=_7||{};
if(this.d.lastUpdated){
this.d.lastUpdated=lconn.share.util.misc.date.convertAtomDate(this.d.lastUpdated);
}
},isFolder:function(){
return true;
},getId:function(){
return this.d.id;
},getOrgId:function(){
return this.d.orgId;
},getName:function(){
return this.d.title;
},getVisibility:function(){
return this.d.visibility;
},getMediaCount:function(){
return this.d.mediaCount;
},getItemCount:function(){
return this.d.itemCount;
},getCollectionCount:function(){
return this.d.collectionCount;
},getShareCount:function(){
return this.d.userCount;
},getGroupCount:function(){
return this.d.groupCount;
},getAllSharesCount:function(){
return this.getShareCount()+this.getGroupCount();
},getUpdated:function(){
return this.d.lastUpdated;
},isPublic:function(){
return this.getVisibility()=="public";
},isPrivate:function(){
return this.getVisibility()=="private";
},isShared:function(){
return this.getVisibility()=="shared";
},isExternal:function(){
return this.d.isExternal;
},getAddedBy:function(){
if(!this.addedBy){
this.addedBy=new lconn.share.bean.UserFromJson(this.d["td:addedBy"]);
}
return this.addedBy;
}});
dojo.declare("lconn.share.bean.PartialCollection",null,{constructor:function(_8){
if(_8){
dojo.mixin(this,_8);
}
}});
dojo.declare("lconn.share.bean.CollectionCMIS",[lconn.share.bean.Collection,lconn.share.bean.AbstractCMISBean],{getName:function(){
if(!this.name){
this.name=this.getPropertyString("cmis:name");
}
return this.name;
},isFolder:function(){
return true;
},getId:function(){
if(this.objectId){
return this.objectId;
}
var _9=lconn.share.util.dom;
this.objectId=this.getPropertyId("cmis:objectId");
if(!this.objectId){
this.objectId=_9.xpathString(this.e,"atom:link[@rel='self']/@cmisra:id");
}
if(!this.objectId){
this.objectId=_9.xpathString(this.e,"atom:link[@rel='via']/@cmisra:id");
}
return this.objectId;
},isExternal:function(){
if(typeof this._isExternal=="undefined"){
this._isExternal=this.getPropertyBoolean("snx:isExternal",null);
}
return this._isExternal;
},getVisibility:function(){
if(!this.visibility){
this.visibility=this.getPropertyString("snx:visibilityComputed");
}
return this.visibility;
},getAuthor:function(){
if(!this.addedBy&&this.e){
this.addedBy=new lconn.share.bean.UserFromCMIS(lconn.share.util.dom.xpathNode(this.e,"cmisra:object/cmis:properties/cmis:propertyString[@propertyDefinitionId='cmis:createdBy']"));
}
return this.addedBy;
},getPublished:function(){
if(!this.added){
this.added=lconn.share.util.misc.date.convertAtomDate(this.getPropertyDateTime("cmis:creationDate"));
}
return this.added;
},getModifier:function(){
if(!this.modifier&&this.e){
this.modifier=new lconn.share.bean.UserFromCMIS(lconn.share.util.dom.xpathNode(this.e,"cmisra:object/cmis:properties/cmis:propertyString[@propertyDefinitionId='cmis:lastModifiedBy']"));
}
return this.modifier;
},getUpdated:function(){
if(!this.updated){
this.updated=lconn.share.util.misc.date.convertAtomDate(this.getPropertyDateTime("cmis:lastModificationDate"));
}
return this.updated;
},getSystemLastModified:function(){
console.log("CollectionCMIS.getSystemLastModified()");
return this.getUpdated();
},getSystemCreated:function(){
console.log("CollectionCMIS.getSystemCreated()");
return this.getPublished();
},getFavorite:function(){
if(!this.favorite){
this.favorite=(lconn.share.util.dom.getChildElementTextContentNS(this.e,"favorite",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)=="true");
}
return this.favorite;
},_CMIS_PERMISSIONS:{"cmis:canGetProperties":["ViewProperties"],"cmis:canGetChildren":["ViewContent","View"],"cmis:canUpdateProperties":["EditProperties","Edit"],"cmis:canDeleteObject":["Delete","Purge","EditContent","Edit"],"cmis:canDeleteTree":["Delete","Purge","EditContent","Edit"],"cmis:canCreateDocument":["AddChild"],"cmis:canAddObjectToFolder":["AddChild"],"cmis:canRemoveObjectFromFolder":["EditContent"],"cmis:canApplyACL":["GrantAccess","GrantAccessView","GrantAccessEdit"]},getPermissions:function(){
if(!this.permissions){
var _a=lconn.share.util.dom;
this.permissions={};
var _b=lconn.share.util.dom.xpathNodes(this._getCMISObjectNode(),"cmis:allowableActions/*[text()='true']");
for(var n=null,i=0;n=_b[i++];){
var _c=this._CMIS_PERMISSIONS[n.nodeName]||[];
for(var p=null,j=0;p=_c[j++];){
this.permissions[p]=true;
}
}
}
return this.permissions;
},getUrlAcl:function(){
if(!this.urlAcl){
this.urlAcl=lconn.share.util.dom.xpathString(this.e,"atom:link[@rel='http://docs.oasis-open.org/ns/cmis/link/200908/acl' and @type='application/cmisacl+xml']/@href");
}
return this.urlAcl;
},getUrlAclRemover:function(){
if(!this.urlAclRemover){
this.urlAclRemover=lconn.share.util.dom.xpathString(this.e,"atom:link[@rel='http://www.ibm.com/xmlns/prod/sn/cmis/acl-remover' and @type='application/cmisacl+xml']/@href");
}
return this.urlAclRemover;
},getUrlMultipartPost:function(){
if(!this.urlMultipart){
this.urlMultipart=lconn.share.util.dom.xpathString(this.e,"atom:link[@rel='http://www.ibm.com/xmlns/prod/sn/cmis/multipart-form/folderChildrenCollection' and @type='text/html']/@href");
}
return this.urlMultipart;
},getUrlFeed:function(){
if(!this.urlFeed){
this.urlFeed=lconn.share.util.dom.xpathString(this.e,"atom:link[@rel='down' and @type='application/atom+xml;type=feed']/@href");
}
if(!this.urlFeed){
this.urlFeed=lconn.share.util.dom.xpathString(this.e,"atom:link[@rel='self' and @type='application/atom+xml;type=feed']/@href");
}
return this.urlFeed;
},getUrlAlternate:function(){
var _d=lconn.share.util.dom.xpathString(this.e,"atom:link[@rel='alternate' and @type='text/html']/@href");
return _d;
},getUrlService:function(){
var _e=lconn.share.util.dom.xpathString(this.e,"atom:link[@rel='service' and @type='application/atomsvc+xml']/@href");
return _e;
},getMediaCount:function(){
if(typeof this.mediaCount=="undefined"){
this.mediaCount=this.getPropertyInteger("snx:numFiles");
}
return this.mediaCount;
},getCollectionCount:function(){
if(typeof this.collectionCount=="undefined"){
this.collectionCount=this.getPropertyInteger("snx:numFolders");
}
return this.collectionCount;
},getItemCount:function(){
if(typeof this.itemCount=="undefined"){
this.itemCount=this.getPropertyInteger("snx:numItems");
}
return this.itemCount;
},isSearchable:function(){
if(typeof this.isValidInFolderId=="undefined"){
this.isValidInFolderId=this.getPropertyBoolean("snx:isValidInFolderId",null);
}
return this.isValidInFolderId!="false";
}});
lconn.share.bean.Collection.createBean=function(e,_f){
if(_f&&_f.apiType=="cmis"){
return new lconn.share.bean.CollectionCMIS(e);
}else{
return new lconn.share.bean.Collection(e);
}
};
}


;if(!dojo._hasResource["lconn.share.bean.Library"]){
dojo._hasResource["lconn.share.bean.Library"]=true;
dojo.provide("lconn.share.bean.Library");


dojo.declare("lconn.share.bean.Library",null,{constructor:function(e){
this.e=e;
},getAtomId:function(){
return lconn.share.util.dom.getChildElementTextContent(this.e,"id");
},getId:function(){
return lconn.share.util.dom.getChildElementTextContentNS(this.e,"uuid",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
},getUrlEntry:function(){
return this.getUrlFeed();
},getUrlFeed:function(){
return lconn.share.util.uri.makeAtomUrlIESafe(lconn.share.util.dom.getChildElementAttributeMatching(this.e,"link","rel","self","href"));
},getOwner:function(){
if(!this.author){
this.author=new lconn.share.bean.User(this.e.getElementsByTagName("author")[0]);
}
return this.author;
},getSize:function(){
return parseInt(lconn.share.util.dom.getChildElementTextContentNS(this.e,"librarySize",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE));
},getTrashSize:function(){
return parseInt(lconn.share.util.dom.getChildElementTextContentNS(this.e,"totalRemovedSize",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE));
},getQuota:function(){
return parseInt(lconn.share.util.dom.getChildElementTextContentNS(this.e,"libraryQuota",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE));
},hasQuota:function(){
return (this.getQuota()>0);
},getDefaultDocumentUuid:function(){
var d=this.getDefaultDocument();
if(d){
return d.getId();
}
return lconn.share.util.dom.getChildElementTextContentNS(this.e,"defaultDocumentUuid",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
},getDefaultDocument:function(){
var d=this.defaultDocument;
if(!d){
var el=lconn.share.util.dom.getElementsByTagNameNS(this.e,"defaultDocument",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
if(el){
el=el.getElementsByTagName("entry")[0];
if(el){
d=this.defaultDocument=new lconn.share.bean.Page(el);
}
}
}
return d;
},getPermissions:function(){
if(!this.permissions){
var s=lconn.share.util.dom.getChildElementTextContentNS(this.e,"permissions",lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
var p={};
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
dojo.declare("lconn.share.bean.LibraryFromFeed",[lconn.share.bean.Library],{constructor:function(e){
},getUrlEntry:function(){
var _1=this.urlEntry;
if(!_1){
_1=lconn.share.util.uri.makeAtomUrlIESafe(lconn.share.util.dom.getChildElementAttributeMatching(this.e,"link","rel","self","href"));
_1=lconn.share.util.dom.parseUri(_1);
_1.path=_1.path.replace(/\/feed$/,"/entry");
_1=this.urlEntry=lconn.share.util.dom.writeUri(_1);
}
return _1;
}});
lconn.share.bean.Library.createBean=function(e,_2){
if(_2&&_2.apiType=="cmis"){
throw new Error("Unsupported owned library in CMIS community");
}else{
return new lconn.share.bean.Library(e);
}
};
}


;if(!dojo._hasResource["lconn.share.action.Action"]){
dojo._hasResource["lconn.share.action.Action"]=true;
dojo.provide("lconn.share.action.Action");
dojo.declare("lconn.share.action.Action",null,{constructor:function(_1){
},isValid:function(_2,_3){
return true;
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
},execute:function(_9,_a){
return;
},getUrlResource:function(_b,_c){
return null;
}});
}


;if(!dojo._hasResource["lconn.share.action.DeferredAction"]){
dojo._hasResource["lconn.share.action.DeferredAction"]=true;
dojo.provide("lconn.share.action.DeferredAction");




dojo.declare("lconn.share.action.DeferredAction",[lconn.share.action.Action],{PACKAGE_RE:/(.*)\.([^\.]+)$/i,cancelEvent:true,constructor:function(){
this._args=dojo._toArray(arguments);
},destroy:function(){
var a=this.delegate;
if(a){
if(a.destroy){
a.destroy();
}
a.parent=null;
this.delegate=null;
}
},execute:function(){
var _1=dojo._toArray(arguments);
if(this.cancelEvent){
for(var i=0;i<_1.length;i++){
var e=_1[i];
if(e&&(typeof e.target!="undefined"||typeof e.bubbles!="undefined")){
try{
_1[i]=null;
dojo.stopEvent(e);
}
catch(ex){
}
}
}
}
var _2=this._act();
var _3=new dojo.Deferred();
_2.addCallback(function(_4){
try{
var _5=_4.execute.apply(_4,_1);
_3.callback(_5);
}
catch(e){
console.error(e);
_3.errback(e);
}
});
return _3;
},_act:function(){
var _6=this._initDfd;
if(!_6){
_6=this._initDfd=new dojo.Deferred();
var n=this.delegateName;
var b=this.delegateBundle;
if(!n){
var re=this.PACKAGE_RE.exec(this.declaredClass);
n=re[1]+".impl.";
n+=re[2];
}
if(!b){
b=n;
}
lconn.share.requireAsync(b,n).addCallback(this,function(){
var f=dojo.getObject(n);
this.delegate=this.create(f);
this.delegate.parent=this;
_6.callback(this.delegate);
}).addErrback(this,function(){
this._initDfd=null;
});
}
return _6;
},create:function(f){
var a=this._args;
return new f(a[0],a[1],a[2],a[3],a[4],a[5]);
}});
}


;if(!dojo._hasResource["lconn.files.start_devmode"]){
dojo._hasResource["lconn.files.start_devmode"]=true;
dojo.provide("lconn.files.start_devmode");










































dojo.addOnLoad(function(){
var _1=lconn.share.util.uri.parseUri(window.location.href);
var _2=dojo.getObject("lconn.files.config.baseUri")||"/";
var _3="app";
_1=lconn.share.util.urifragment.fromAnchorForm(_1,_2+_3);
var _4=_1.path;
if(_4.indexOf(_2)==0){
_4=_4.substring(_2.length);
}
var _5=lconn.files.routes.decode(_4,{parameters:{},queryParameters:{}});
if(_5.id=="lconn.files.scenes.HomeGlobal"){
var el=document.getElementById("userInfo");
var _6=dojo.fromJson(lconn.share.util.html.htmlText(el));
_5.id=_6?"lconn.files.scenes.UserChannel":"lconn.files.scenes.PublicFiles";
}
var _7=[];
var _8=true;
_7.push(lconn.share.requireAsync("lconn.files.PersonalFiles",function(){
},_8));
_7.push(lconn.share.requireAsync(_5.id,function(){
},_8));
new dojo.DeferredList(_7).addBoth(function(){
lconn.share.FullScreenApp.onload(window,"lconn.files.PersonalFiles");
});
});
}


window['_js_modules']=(window['_js_modules']||[]).concat(["lconn.files.start_devmode"]);
