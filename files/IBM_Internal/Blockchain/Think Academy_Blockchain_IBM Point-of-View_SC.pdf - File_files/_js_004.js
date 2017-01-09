
;if(!dojo._hasResource["com.ibm.oneui.ckeditor.editor.dojo"]){
dojo._hasResource["com.ibm.oneui.ckeditor.editor.dojo"]=true;
dojo.provide("com.ibm.oneui.ckeditor.editor.dojo");
var isDebug=(function(){
var _1=false;
if(!window.CKEDITOR){
var _2=function(_3){
return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(_3).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||"";
};
var _4=function(){
var a=window.CKEDITOR_BASEPATH||"";
if(!a){
for(var b=document.getElementsByTagName("script"),c=0;c<b.length;c++){
var d=b[c].src.match(/(^|.*[\\\/])ckeditor(?:_basic)?(?:_source)?.js(?:\?.*)?$/i);
if(d){
a=d[1];
break;
}
}
}
-1==a.indexOf(":/")&&"//"!=a.slice(0,2)&&(a=0===a.indexOf("/")?location.href.match(/^.*?:\/\/[^\/]*/)[0]+a:location.href.match(/^[^\?]*\/(?:)/)[0]+a);
if(!a){
throw "The CKEditor installation path could not be automatically detected. Please set the global variable \"CKEDITOR_BASEPATH\" before creating editor instances.";
}
return a;
};
if((document.location.href.indexOf("x-ckeditor-debug=true")>0)||(document.referrer.indexOf("x-ckeditor-debug=true")>0)||(_2("X-CKEDITOR-DEBUG")=="true")){
window.CKEDITOR_BASEPATH=_4()+"_source/";
if(window.XMLHttpRequest){
var _5=new XMLHttpRequest();
_5.open("GET",window.CKEDITOR_BASEPATH+"ckeditor.js",false);
_5.send(null);
var _6=document.getElementsByTagName("head")[0];
var _7=document.createElement("script");
_7.type="text/javascript";
_7.text=_5.responseText;
_6.appendChild(_7);
_1=true;
}
}
}
return _1;
})();
if(!isDebug){
function setIconCssFile(e){
var t=new CKEDITOR.dom.element("link");
if(t.setAttribute("type","text/css"),t.setAttribute("href",CKEDITOR.getUrl("skins/ibmdesign/icons/svg/icons.css")),t.setAttribute("rel","stylesheet"),t.setAttribute("id","svg-icons-css"),e){
var n=CKEDITOR.document.getElementsByTag("iframe");
null==n.getItem(n.count()-1).getFrameDocument().getById("svg-icons-css")&&n.getItem(n.count()-1).getFrameDocument().getHead().append(t);
}else{
CKEDITOR.document.getHead().append(t);
}
};
!function(){
function e(e,t){
CKEDITOR.tools.extend(this,t,{editor:e,id:"cke-"+CKEDITOR.tools.getUniqueId(),area:e._.notificationArea}),t.type||(this.type="info"),this.element=this._createElement(),e.plugins.clipboard&&CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(this.element);
};
function t(e){
var t=this;
this.editor=e,this.notifications=[],this.element=this._createElement(),this._uiBuffer=CKEDITOR.tools.eventsBuffer(10,this._layout,this),this._changeBuffer=CKEDITOR.tools.eventsBuffer(500,this._layout,this),e.on("destroy",function(){
t._removeListeners(),t.element.remove();
});
};
window.CKEDITOR&&window.CKEDITOR.dom||(window.CKEDITOR||(window.CKEDITOR=function(){
var e=/(^|.*[\\\/])ckeditor\.js(?:\?.*|;.*)?$/i,t={timestamp:"G7FC",version:"4.5.6.4",revision:"20160815-1344",rnd:Math.floor(900*Math.random())+100,_:{pending:[],basePathSrcPattern:e},status:"unloaded",basePath:function(){
var t=window.CKEDITOR_BASEPATH||"";
if(!t){
for(var n=document.getElementsByTagName("script"),i=0;i<n.length;i++){
var o=n[i].src.match(e);
if(o){
t=o[1];
break;
}
}
}
if(-1==t.indexOf(":/")&&"//"!=t.slice(0,2)&&(t=0===t.indexOf("/")?location.href.match(/^.*?:\/\/[^\/]*/)[0]+t:location.href.match(/^[^\?]*\/(?:)/)[0]+t),!t){
throw "The CKEditor installation path could not be automatically detected. Please set the global variable \"CKEDITOR_BASEPATH\" before creating editor instances.";
}
return t;
}(),getUrl:function(e){
return -1==e.indexOf(":/")&&0!==e.indexOf("/")&&(e=this.basePath+e),this.timestamp&&"/"!=e.charAt(e.length-1)&&!/[&?]t=/.test(e)&&(e+=(e.indexOf("?")>=0?"&":"?")+"t="+this.timestamp),e;
},domReady:function(){
function e(){
try{
document.addEventListener?(document.removeEventListener("DOMContentLoaded",e,!1),t()):document.attachEvent&&"complete"===document.readyState&&(document.detachEvent("onreadystatechange",e),t());
}
catch(n){
}
};
function t(){
for(var e;e=n.shift();){
e();
}
};
var n=[];
return function(t){
function i(){
try{
document.documentElement.doScroll("left");
}
catch(t){
return void setTimeout(i,1);
}
e();
};
if(n.push(t),"complete"===document.readyState&&setTimeout(e,1),1==n.length){
if(document.addEventListener){
document.addEventListener("DOMContentLoaded",e,!1),window.addEventListener("load",e,!1);
}else{
if(document.attachEvent){
document.attachEvent("onreadystatechange",e),window.attachEvent("onload",e);
var o=!1;
try{
o=!window.frameElement;
}
catch(a){
}
document.documentElement.doScroll&&o&&i();
}
}
}
};
}()},n=window.CKEDITOR_GETURL;
if(n){
var i=t.getUrl;
t.getUrl=function(e){
return n.call(t,e)||i.call(t,e);
};
}
return t;
}()),CKEDITOR.event||(CKEDITOR.event=function(){
},CKEDITOR.event.implementOn=function(e){
var t=CKEDITOR.event.prototype;
for(var n in t){
null==e[n]&&(e[n]=t[n]);
}
},CKEDITOR.event.prototype=function(){
function e(e){
var i=t(this);
return i[e]||(i[e]=new n(e));
};
var t=function(e){
var t=e.getPrivate&&e.getPrivate()||e._||(e._={});
return t.events||(t.events={});
},n=function(e){
this.name=e,this.listeners=[];
};
return n.prototype={getListenerIndex:function(e){
for(var t=0,n=this.listeners;t<n.length;t++){
if(n[t].fn==e){
return t;
}
}
return -1;
}},{define:function(t,n){
var i=e.call(this,t);
CKEDITOR.tools.extend(i,n,!0);
},on:function(t,n,i,o,a){
function r(e,a,r,l){
var d={name:t,sender:this,editor:e,data:a,listenerData:o,stop:r,cancel:l,removeListener:s},c=n.call(i,d);
return c===!1?!1:d.data;
};
function s(){
c.removeListener(t,n);
};
var l=e.call(this,t);
if(l.getListenerIndex(n)<0){
var d=l.listeners;
i||(i=this),isNaN(a)&&(a=10);
var c=this;
r.fn=n,r.priority=a;
for(var u=d.length-1;u>=0;u--){
if(d[u].priority<=a){
return d.splice(u+1,0,r),{removeListener:s};
}
}
d.unshift(r);
}
return {removeListener:s};
},once:function(){
var e=Array.prototype.slice.call(arguments),t=e[1];
return e[1]=function(e){
return e.removeListener(),t.apply(this,arguments);
},this.on.apply(this,e);
},capture:function(){
CKEDITOR.event.useCapture=1;
var e=this.on.apply(this,arguments);
return CKEDITOR.event.useCapture=0,e;
},fire:function(){
var e=0,n=function(){
e=1;
},i=0,o=function(){
i=1;
};
return function(a,r,s){
var l=t(this)[a],d=e,c=i;
if(e=i=0,l){
var u=l.listeners;
if(u.length){
u=u.slice(0);
for(var h,f=0;f<u.length;f++){
if(l.errorProof){
try{
h=u[f].call(this,s,r,n,o);
}
catch(m){
}
}else{
h=u[f].call(this,s,r,n,o);
}
if(h===!1?i=1:"undefined"!=typeof h&&(r=h),e||i){
break;
}
}
}
}
var g=i?!1:"undefined"==typeof r?!0:r;
return e=d,i=c,g;
};
}(),fireOnce:function(e,n,i){
var o=this.fire(e,n,i);
return delete t(this)[e],o;
},removeListener:function(e,n){
var i=t(this)[e];
if(i){
var o=i.getListenerIndex(n);
o>=0&&i.listeners.splice(o,1);
}
},removeAllListeners:function(){
var e=t(this);
for(var n in e){
delete e[n];
}
},hasListeners:function(e){
var n=t(this)[e];
return n&&n.listeners.length>0;
}};
}()),CKEDITOR.editor||(CKEDITOR.editor=function(){
CKEDITOR._.pending.push([this,arguments]),CKEDITOR.event.call(this);
},CKEDITOR.editor.prototype.fire=function(e,t){
return e in {instanceReady:1,loaded:1}&&(this[e]=!0),CKEDITOR.event.prototype.fire.call(this,e,t,this);
},CKEDITOR.editor.prototype.fireOnce=function(e,t){
return e in {instanceReady:1,loaded:1}&&(this[e]=!0),CKEDITOR.event.prototype.fireOnce.call(this,e,t,this);
},CKEDITOR.event.implementOn(CKEDITOR.editor.prototype)),CKEDITOR.env||(CKEDITOR.env=function(){
var e=navigator.userAgent.toLowerCase(),t=e.match(/edge[ \/](\d+.?\d*)/),n=e.indexOf("trident/")>-1,i=!(!t&&!n),o={ie:i,edge:!!t,webkit:!i&&e.indexOf(" applewebkit/")>-1,air:e.indexOf(" adobeair/")>-1,mac:e.indexOf("macintosh")>-1,quirks:"BackCompat"==document.compatMode&&(!document.documentMode||document.documentMode<10),mobile:e.indexOf("mobile")>-1,iOS:/(ipad|iphone|ipod)/.test(e),isCustomDomain:function(){
if(!this.ie){
return !1;
}
var e=document.domain,t=window.location.hostname;
return e!=t&&e!="["+t+"]";
},secure:"https:"==location.protocol};
o.gecko="Gecko"==navigator.product&&!o.webkit&&!o.ie,o.webkit&&(e.indexOf("chrome")>-1?o.chrome=!0:o.safari=!0);
var a=0;
if(o.ie&&(a=t?parseFloat(t[1]):o.quirks||!document.documentMode?parseFloat(e.match(/msie (\d+)/)[1]):document.documentMode,o.ie9Compat=9==a,o.ie8Compat=8==a,o.ie7Compat=7==a,o.ie6Compat=7>a||o.quirks),o.gecko){
var r=e.match(/rv:([\d\.]+)/);
r&&(r=r[1].split("."),a=10000*r[0]+100*(r[1]||0)+1*(r[2]||0));
}
return o.air&&(a=parseFloat(e.match(/ adobeair\/(\d+)/)[1])),o.webkit&&(a=parseFloat(e.match(/ applewebkit\/(\d+)/)[1])),o.version=a,o.isCompatible=!(o.ie&&7>a||o.gecko&&40000>a||o.webkit&&534>a),o.hidpi=window.devicePixelRatio>=2,o.needsBrFiller=o.gecko||o.webkit||o.ie&&a>10,o.needsNbspFiller=o.ie&&11>a,o.cssClass="cke_browser_"+(o.ie?"ie":o.gecko?"gecko":o.webkit?"webkit":"unknown"),o.quirks&&(o.cssClass+=" cke_browser_quirks"),o.ie&&(o.cssClass+=" cke_browser_ie"+(o.quirks?"6 cke_browser_iequirks":o.version)),o.air&&(o.cssClass+=" cke_browser_air"),o.iOS&&(o.cssClass+=" cke_browser_ios"),o.hidpi&&(o.cssClass+=" cke_hidpi"),o;
}()),"unloaded"==CKEDITOR.status&&!function(){
CKEDITOR.event.implementOn(CKEDITOR),CKEDITOR.loadFullCore=function(){
if("basic_ready"!=CKEDITOR.status){
return void (CKEDITOR.loadFullCore._load=1);
}
delete CKEDITOR.loadFullCore;
var e=document.createElement("script");
e.type="text/javascript",e.src=CKEDITOR.basePath+"ckeditor.js",document.getElementsByTagName("head")[0].appendChild(e);
},CKEDITOR.loadFullCoreTimeout=0,CKEDITOR.add=function(e){
var t=this._.pending||(this._.pending=[]);
t.push(e);
},function(){
var e=function(){
var e=CKEDITOR.loadFullCore,t=CKEDITOR.loadFullCoreTimeout;
e&&(CKEDITOR.status="basic_ready",e&&e._load?e():t&&setTimeout(function(){
CKEDITOR.loadFullCore&&CKEDITOR.loadFullCore();
},1000*t));
};
CKEDITOR.domReady(e);
}(),CKEDITOR.status="basic_loaded";
}(),CKEDITOR.VERBOSITY_WARN=1,CKEDITOR.VERBOSITY_ERROR=2,CKEDITOR.verbosity=CKEDITOR.VERBOSITY_WARN|CKEDITOR.VERBOSITY_ERROR,CKEDITOR.warn=function(e,t){
CKEDITOR.verbosity&CKEDITOR.VERBOSITY_WARN&&CKEDITOR.fire("log",{type:"warn",errorCode:e,additionalData:t});
},CKEDITOR.error=function(e,t){
CKEDITOR.verbosity&CKEDITOR.VERBOSITY_ERROR&&CKEDITOR.fire("log",{type:"error",errorCode:e,additionalData:t});
},CKEDITOR.on("log",function(e){
if(window.console&&window.console.log){
var t=console[e.data.type]?e.data.type:"log",n=e.data.errorCode,i=e.data.additionalData,o="[CKEDITOR] ",a="Error code: ";
i?console[t](o+a+n+".",i):console[t](o+a+n+"."),console[t](o+"For more information about this error go to http://docs.ckeditor.com/#!/guide/dev_errors-section-"+n);
}
},null,null,999),CKEDITOR.dom={},function(){
function e(e){
var t=[],n="";
if(window.crypto&&window.crypto.getRandomValues){
t=new Uint8Array(e),window.crypto.getRandomValues(t);
}else{
for(var i=0;e>i;i++){
t.push(Math.floor(256*Math.random()));
}
}
for(var o=0;o<t.length;o++){
var a=s.charAt(t[o]%s.length);
n+=Math.random()>0.5?a.toUpperCase():a;
}
return n;
};
var t=[],n=CKEDITOR.env.gecko?"-moz-":CKEDITOR.env.webkit?"-webkit-":CKEDITOR.env.ie?"-ms-":"",i=/&/g,o=/>/g,a=/</g,r=/"/g,s="abcdefghijklmnopqrstuvwxyz0123456789",l="ckCsrfToken",d=40,c=/&(lt|gt|amp|quot|nbsp|shy|#\d{1,5});/g,u={lt:"<",gt:">",amp:"&",quot:"\"",nbsp:"\xa0",shy:""},h=function(e,t){
return "#"==t[0]?String.fromCharCode(parseInt(t.slice(1),10)):u[t];
};
CKEDITOR.on("reset",function(){
t=[];
}),CKEDITOR.tools={arrayCompare:function(e,t){
if(!e&&!t){
return !0;
}
if(!e||!t||e.length!=t.length){
return !1;
}
for(var n=0;n<e.length;n++){
if(e[n]!=t[n]){
return !1;
}
}
return !0;
},getIndex:function(e,t){
for(var n=0;n<e.length;++n){
if(t(e[n])){
return n;
}
}
return -1;
},clone:function(e){
var t;
if(e&&e instanceof Array){
t=[];
for(var n=0;n<e.length;n++){
t[n]=CKEDITOR.tools.clone(e[n]);
}
return t;
}
if(null===e||"object"!=typeof e||e instanceof String||e instanceof Number||e instanceof Boolean||e instanceof Date||e instanceof RegExp){
return e;
}
if(e.nodeType||e.window===e){
return e;
}
t=new e.constructor;
for(var i in e){
var o=e[i];
t[i]=CKEDITOR.tools.clone(o);
}
return t;
},capitalize:function(e,t){
return e.charAt(0).toUpperCase()+(t?e.slice(1):e.slice(1).toLowerCase());
},extend:function(e){
var t,n,i=arguments.length;
"boolean"==typeof (t=arguments[i-1])?i--:"boolean"==typeof (t=arguments[i-2])&&(n=arguments[i-1],i-=2);
for(var o=1;i>o;o++){
var a=arguments[o];
for(var r in a){
(t===!0||null==e[r])&&(!n||r in n)&&(e[r]=a[r]);
}
}
return e;
},prototypedCopy:function(e){
var t=function(){
};
return t.prototype=e,new t;
},copy:function(e){
var t,n={};
for(t in e){
n[t]=e[t];
}
return n;
},isArray:function(e){
return "[object Array]"==Object.prototype.toString.call(e);
},isEmpty:function(e){
for(var t in e){
if(e.hasOwnProperty(t)){
return !1;
}
}
return !0;
},cssVendorPrefix:function(e,t,i){
if(i){
return n+e+":"+t+";"+e+":"+t;
}
var o={};
return o[e]=t,o[n+e]=t,o;
},cssStyleToDomStyle:function(){
var e=document.createElement("div").style,t="undefined"!=typeof e.cssFloat?"cssFloat":"undefined"!=typeof e.styleFloat?"styleFloat":"float";
return function(e){
return "float"==e?t:e.replace(/-./g,function(e){
return e.substr(1).toUpperCase();
});
};
}(),buildStyleHtml:function(e){
e=[].concat(e);
for(var t,n=[],i=0;i<e.length;i++){
(t=e[i])&&(/@import|[{}]/.test(t)?n.push("<style>"+t+"</style>"):n.push("<link type=\"text/css\" rel=stylesheet href=\""+t+"\">"));
}
return n.join("");
},htmlEncode:function(e){
return void 0===e||null===e?"":String(e).replace(i,"&amp;").replace(o,"&gt;").replace(a,"&lt;");
},htmlDecode:function(e){
return e.replace(c,h);
},htmlEncodeAttr:function(e){
return CKEDITOR.tools.htmlEncode(e).replace(r,"&quot;");
},htmlDecodeAttr:function(e){
return CKEDITOR.tools.htmlDecode(e);
},transformPlainTextToHtml:function(e,t){
var n=t==CKEDITOR.ENTER_BR,i=this.htmlEncode(e.replace(/\r\n/g,"\n"));
i=i.replace(/\t/g,"&nbsp;&nbsp; &nbsp;");
var o=t==CKEDITOR.ENTER_P?"p":"div";
if(!n){
var a=/\n{2}/g;
if(a.test(i)){
var r="<"+o+">",s="</"+o+">";
i=r+i.replace(a,function(){
return s+r;
})+s;
}
}
return i=i.replace(/\n/g,"<br>"),n||(i=i.replace(new RegExp("<br>(?=</"+o+">)"),function(e){
return CKEDITOR.tools.repeat(e,2);
})),i=i.replace(/^ | $/g,"&nbsp;"),i=i.replace(/(>|\s) /g,function(e,t){
return t+"&nbsp;";
}).replace(/ (?=<)/g,"&nbsp;");
},getNextNumber:function(){
var e=0;
return function(){
return ++e;
};
}(),getNextId:function(){
return "cke_"+this.getNextNumber();
},getUniqueId:function(){
for(var e="e",t=0;8>t;t++){
e+=Math.floor(65536*(1+Math.random())).toString(16).substring(1);
}
return e;
},override:function(e,t){
var n=t(e);
return n.prototype=e.prototype,n;
},setTimeout:function(e,t,n,i,o){
return o||(o=window),n||(n=o),o.setTimeout(function(){
i?e.apply(n,[].concat(i)):e.apply(n);
},t||0);
},trim:function(){
var e=/(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g;
return function(t){
return t.replace(e,"");
};
}(),ltrim:function(){
var e=/^[ \t\n\r]+/g;
return function(t){
return t.replace(e,"");
};
}(),rtrim:function(){
var e=/[ \t\n\r]+$/g;
return function(t){
return t.replace(e,"");
};
}(),indexOf:function(e,t){
if("function"==typeof t){
for(var n=0,i=e.length;i>n;n++){
if(t(e[n])){
return n;
}
}
}else{
if(e.indexOf){
return e.indexOf(t);
}
for(n=0,i=e.length;i>n;n++){
if(e[n]===t){
return n;
}
}
}
return -1;
},search:function(e,t){
var n=CKEDITOR.tools.indexOf(e,t);
return n>=0?e[n]:null;
},bind:function(e,t){
return function(){
return e.apply(t,arguments);
};
},createClass:function(e){
var t=e.$,n=e.base,i=e.privates||e._,o=e.proto,a=e.statics;
if(!t&&(t=function(){
n&&this.base.apply(this,arguments);
}),i){
var r=t;
t=function(){
var e=this._||(this._={});
for(var t in i){
var n=i[t];
e[t]="function"==typeof n?CKEDITOR.tools.bind(n,this):n;
}
r.apply(this,arguments);
};
}
return n&&(t.prototype=this.prototypedCopy(n.prototype),t.prototype.constructor=t,t.base=n,t.baseProto=n.prototype,t.prototype.base=function(){
this.base=n.prototype.base,n.apply(this,arguments),this.base=arguments.callee;
}),o&&this.extend(t.prototype,o,!0),a&&this.extend(t,a,!0),t;
},addFunction:function(e,n){
return t.push(function(){
return e.apply(n||this,arguments);
})-1;
},removeFunction:function(e){
t[e]=null;
},callFunction:function(e){
var n=t[e];
return n&&n.apply(window,Array.prototype.slice.call(arguments,1));
},cssLength:function(){
var e,t=/^-?\d+\.?\d*px$/;
return function(n){
return e=CKEDITOR.tools.trim(n+"")+"px",t.test(e)?e:n||"";
};
}(),convertToPx:function(){
var e;
return function(t){
return e||(e=CKEDITOR.dom.element.createFromHtml("<div style=\"position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;\"></div>",CKEDITOR.document),CKEDITOR.document.getBody().append(e)),/%$/.test(t)?t:(e.setStyle("width",t),e.$.clientWidth);
};
}(),repeat:function(e,t){
return new Array(t+1).join(e);
},tryThese:function(){
for(var e,t=0,n=arguments.length;n>t;t++){
var i=arguments[t];
try{
e=i();
break;
}
catch(o){
}
}
return e;
},genKey:function(){
return Array.prototype.slice.call(arguments).join("-");
},defer:function(e){
return function(){
var t=arguments,n=this;
window.setTimeout(function(){
e.apply(n,t);
},0);
};
},normalizeCssText:function(e,t){
var n,i=[],o=CKEDITOR.tools.parseCssText(e,!0,t);
for(n in o){
i.push(n+":"+o[n]);
}
return i.sort(),i.length?i.join(";")+";":"";
},convertRgbToHex:function(e){
return e.replace(/(?:rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\))/gi,function(e,t,n,i){
for(var o=[t,n,i],a=0;3>a;a++){
o[a]=("0"+parseInt(o[a],10).toString(16)).slice(-2);
}
return "#"+o.join("");
});
},normalizeHex:function(e){
return e.replace(/#(([0-9a-f]{3}){1,2})($|;|\s+)/gi,function(e,t,n,i){
var o=t.toLowerCase();
if(3==o.length){
var a=o.split("");
o=[a[0],a[0],a[1],a[1],a[2],a[2]].join("");
}
return "#"+o+i;
});
},parseCssText:function(e,t,n){
var i={};
if(n){
var o=new CKEDITOR.dom.element("span");
e=o.setAttribute("style",e).getAttribute("style")||"";
}
return e&&(e=CKEDITOR.tools.normalizeHex(CKEDITOR.tools.convertRgbToHex(e))),e&&";"!=e?(e.replace(/&quot;/g,"\"").replace(/\s*([^:;\s]+)\s*:\s*([^;]+)\s*(?=;|$)/g,function(e,n,o){
t&&(n=n.toLowerCase(),"font-family"==n&&(o=o.toLowerCase().replace(/["']/g,"").replace(/\s*,\s*/g,",")),o=CKEDITOR.tools.trim(o)),i[n]=o;
}),i):i;
},writeCssText:function(e,t){
var n,i=[];
for(n in e){
i.push(n+":"+e[n]);
}
return t&&i.sort(),i.join("; ");
},objectCompare:function(e,t,n){
var i;
if(!e&&!t){
return !0;
}
if(!e||!t){
return !1;
}
for(i in e){
if(e[i]!=t[i]){
return !1;
}
}
if(!n){
for(i in t){
if(e[i]!=t[i]){
return !1;
}
}
}
return !0;
},objectKeys:function(e){
var t=[];
for(var n in e){
t.push(n);
}
return t;
},convertArrayToObject:function(e,t){
var n={};
1==arguments.length&&(t=!0);
for(var i=0,o=e.length;o>i;++i){
n[e[i]]=t;
}
return n;
},fixDomain:function(){
for(var e;;){
try{
e=window.parent.document.domain;
break;
}
catch(t){
if(e=e?e.replace(/.+?(?:\.|$)/,""):document.domain,!e){
break;
}
document.domain=e;
}
}
return !!e;
},eventsBuffer:function(e,t,n){
function i(){
a=(new Date).getTime(),o=!1,n?t.call(n):t();
};
var o,a=0;
return {input:function(){
if(!o){
var t=(new Date).getTime()-a;
e>t?o=setTimeout(i,e-t):i();
}
},reset:function(){
o&&clearTimeout(o),o=a=0;
}};
},enableHtml5Elements:function(e,t){
for(var n,i="abbr,article,aside,audio,bdi,canvas,data,datalist,details,figcaption,figure,footer,header,hgroup,main,mark,meter,nav,output,progress,section,summary,time,video".split(","),o=i.length;o--;){
n=e.createElement(i[o]),t&&e.appendChild(n);
}
},checkIfAnyArrayItemMatches:function(e,t){
for(var n=0,i=e.length;i>n;++n){
if(e[n].match(t)){
return !0;
}
}
return !1;
},checkIfAnyObjectPropertyMatches:function(e,t){
for(var n in e){
if(n.match(t)){
return !0;
}
}
return !1;
},transparentImageData:"data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==",getCookie:function(e){
e=e.toLowerCase();
for(var t,n,i=document.cookie.split(";"),o=0;o<i.length;o++){
if(t=i[o].split("="),n=decodeURIComponent(CKEDITOR.tools.trim(t[0]).toLowerCase()),n===e){
return decodeURIComponent(t.length>1?t[1]:"");
}
}
return null;
},setCookie:function(e,t){
document.cookie=encodeURIComponent(e)+"="+encodeURIComponent(t)+";path=/";
},getCsrfToken:function(){
var t=CKEDITOR.tools.getCookie(l);
return t&&t.length==d||(t=e(d),CKEDITOR.tools.setCookie(l,t)),t;
}};
}(),CKEDITOR.dtd=function(){
"use strict";
var e=CKEDITOR.tools.extend,t=function(e,t){
for(var n=CKEDITOR.tools.clone(e),i=1;i<arguments.length;i++){
t=arguments[i];
for(var o in t){
delete n[o];
}
}
return n;
},n={},i={},o={a:1,abbr:1,area:1,audio:1,b:1,bdi:1,bdo:1,br:1,button:1,canvas:1,cite:1,code:1,command:1,datalist:1,del:1,dfn:1,em:1,embed:1,i:1,iframe:1,img:1,input:1,ins:1,kbd:1,keygen:1,label:1,map:1,mark:1,meter:1,noscript:1,object:1,output:1,progress:1,q:1,ruby:1,s:1,samp:1,script:1,select:1,small:1,span:1,strong:1,sub:1,sup:1,textarea:1,time:1,u:1,"var":1,video:1,wbr:1},a={address:1,article:1,aside:1,blockquote:1,details:1,div:1,dl:1,fieldset:1,figure:1,footer:1,form:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,header:1,hgroup:1,hr:1,main:1,menu:1,nav:1,ol:1,p:1,pre:1,section:1,table:1,ul:1},r={command:1,link:1,meta:1,noscript:1,script:1,style:1},s={},l={"#":1},d={acronym:1,applet:1,basefont:1,big:1,font:1,isindex:1,strike:1,style:1,tt:1},c={center:1,dir:1,noframes:1};
e(n,o,l,d),e(i,a,n,c);
var u={a:t(n,{a:1,button:1}),abbr:n,address:i,area:s,article:i,aside:i,audio:e({source:1,track:1},i),b:n,base:s,bdi:n,bdo:n,blockquote:i,body:i,br:s,button:t(n,{a:1,button:1}),canvas:n,caption:i,cite:n,code:n,col:s,colgroup:{col:1},command:s,datalist:e({option:1},n),dd:i,del:n,details:e({summary:1},i),dfn:n,div:i,dl:{dt:1,dd:1},dt:i,em:n,embed:s,fieldset:e({legend:1},i),figcaption:i,figure:e({figcaption:1},i),footer:i,form:i,h1:n,h2:n,h3:n,h4:n,h5:n,h6:n,head:e({title:1,base:1},r),header:i,hgroup:{h1:1,h2:1,h3:1,h4:1,h5:1,h6:1},hr:s,html:e({head:1,body:1},i,r),i:n,iframe:l,img:s,input:s,ins:n,kbd:n,keygen:s,label:n,legend:n,li:i,link:s,main:i,map:i,mark:n,menu:e({li:1},i),meta:s,meter:t(n,{meter:1}),nav:i,noscript:e({link:1,meta:1,style:1},n),object:e({param:1},n),ol:{li:1},optgroup:{option:1},option:l,output:n,p:n,param:s,pre:n,progress:t(n,{progress:1}),q:n,rp:n,rt:n,ruby:e({rp:1,rt:1},n),s:n,samp:n,script:l,section:i,select:{optgroup:1,option:1},small:n,source:s,span:n,strong:n,style:l,sub:n,summary:e({h1:1,h2:1,h3:1,h4:1,h5:1,h6:1},n),sup:n,table:{caption:1,colgroup:1,thead:1,tfoot:1,tbody:1,tr:1},tbody:{tr:1},td:i,textarea:l,tfoot:{tr:1},th:i,thead:{tr:1},time:t(n,{time:1}),title:l,tr:{th:1,td:1},track:s,u:n,ul:{li:1},"var":n,video:e({source:1,track:1},i),wbr:s,acronym:n,applet:e({param:1},i),basefont:s,big:n,center:i,dialog:s,dir:{li:1},font:n,isindex:s,noframes:i,strike:n,tt:n};
return e(u,{$block:e({audio:1,dd:1,dt:1,figcaption:1,li:1,video:1},a,c),$blockLimit:{article:1,aside:1,audio:1,body:1,caption:1,details:1,dir:1,div:1,dl:1,fieldset:1,figcaption:1,figure:1,footer:1,form:1,header:1,hgroup:1,main:1,menu:1,nav:1,ol:1,section:1,table:1,td:1,th:1,tr:1,ul:1,video:1},$cdata:{script:1,style:1},$editable:{address:1,article:1,aside:1,blockquote:1,body:1,details:1,div:1,fieldset:1,figcaption:1,footer:1,form:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,header:1,hgroup:1,main:1,nav:1,p:1,pre:1,section:1},$empty:{area:1,base:1,basefont:1,br:1,col:1,command:1,dialog:1,embed:1,hr:1,img:1,input:1,isindex:1,keygen:1,link:1,meta:1,param:1,source:1,track:1,wbr:1},$inline:n,$list:{dl:1,ol:1,ul:1},$listItem:{dd:1,dt:1,li:1},$nonBodyContent:e({body:1,head:1,html:1},u.head),$nonEditable:{applet:1,audio:1,button:1,embed:1,iframe:1,map:1,object:1,option:1,param:1,script:1,textarea:1,video:1},$object:{applet:1,audio:1,button:1,hr:1,iframe:1,img:1,input:1,object:1,select:1,table:1,textarea:1,video:1},$removeEmpty:{abbr:1,acronym:1,b:1,bdi:1,bdo:1,big:1,cite:1,code:1,del:1,dfn:1,em:1,font:1,i:1,ins:1,label:1,kbd:1,mark:1,meter:1,output:1,q:1,ruby:1,s:1,samp:1,small:1,span:1,strike:1,strong:1,sub:1,sup:1,time:1,tt:1,u:1,"var":1},$tabIndex:{a:1,area:1,button:1,input:1,object:1,select:1,textarea:1},$tableContent:{caption:1,col:1,colgroup:1,tbody:1,td:1,tfoot:1,th:1,thead:1,tr:1},$transparent:{a:1,audio:1,canvas:1,del:1,ins:1,map:1,noscript:1,object:1,video:1},$intermediate:{caption:1,colgroup:1,dd:1,dt:1,figcaption:1,legend:1,li:1,optgroup:1,option:1,rp:1,rt:1,summary:1,tbody:1,td:1,tfoot:1,th:1,thead:1,tr:1}}),u;
}(),CKEDITOR.dom.event=function(e){
this.$=e;
},CKEDITOR.dom.event.prototype={getKey:function(){
return this.$.keyCode||this.$.which;
},getKeystroke:function(){
var e=this.getKey();
return (this.$.ctrlKey||this.$.metaKey)&&(e+=CKEDITOR.CTRL),this.$.shiftKey&&(e+=CKEDITOR.SHIFT),this.$.altKey&&(e+=CKEDITOR.ALT),e;
},preventDefault:function(e){
var t=this.$;
t.preventDefault?t.preventDefault():t.returnValue=!1,e&&this.stopPropagation();
},stopPropagation:function(){
var e=this.$;
e.stopPropagation?e.stopPropagation():e.cancelBubble=!0;
},getTarget:function(){
var e=this.$.target||this.$.srcElement;
return e?new CKEDITOR.dom.node(e):null;
},getPhase:function(){
return this.$.eventPhase||2;
},getPageOffset:function(){
var e=this.getTarget().getDocument().$,t=this.$.pageX||this.$.clientX+(e.documentElement.scrollLeft||e.body.scrollLeft),n=this.$.pageY||this.$.clientY+(e.documentElement.scrollTop||e.body.scrollTop);
return {x:t,y:n};
}},CKEDITOR.CTRL=1114112,CKEDITOR.SHIFT=2228224,CKEDITOR.ALT=4456448,CKEDITOR.EVENT_PHASE_CAPTURING=1,CKEDITOR.EVENT_PHASE_AT_TARGET=2,CKEDITOR.EVENT_PHASE_BUBBLING=3,CKEDITOR.dom.domObject=function(e){
e&&(this.$=e);
},CKEDITOR.dom.domObject.prototype=function(){
var e=function(e,t){
return function(n){
"undefined"!=typeof CKEDITOR&&e.fire(t,new CKEDITOR.dom.event(n));
};
};
return {getPrivate:function(){
var e;
return (e=this.getCustomData("_"))||this.setCustomData("_",e={}),e;
},on:function(t){
var n=this.getCustomData("_cke_nativeListeners");
if(n||(n={},this.setCustomData("_cke_nativeListeners",n)),!n[t]){
var i=n[t]=e(this,t);
this.$.addEventListener?this.$.addEventListener(t,i,!!CKEDITOR.event.useCapture):this.$.attachEvent&&this.$.attachEvent("on"+t,i);
}
return CKEDITOR.event.prototype.on.apply(this,arguments);
},removeListener:function(e){
if(CKEDITOR.event.prototype.removeListener.apply(this,arguments),!this.hasListeners(e)){
var t=this.getCustomData("_cke_nativeListeners"),n=t&&t[e];
n&&(this.$.removeEventListener?this.$.removeEventListener(e,n,!1):this.$.detachEvent&&this.$.detachEvent("on"+e,n),delete t[e]);
}
},removeAllListeners:function(){
var e=this.getCustomData("_cke_nativeListeners");
for(var t in e){
var n=e[t];
this.$.detachEvent?this.$.detachEvent("on"+t,n):this.$.removeEventListener&&this.$.removeEventListener(t,n,!1),delete e[t];
}
CKEDITOR.event.prototype.removeAllListeners.call(this);
}};
}(),function(e){
var t={};
CKEDITOR.on("reset",function(){
t={};
}),e.equals=function(e){
try{
return e&&e.$===this.$;
}
catch(t){
return !1;
}
},e.setCustomData=function(e,n){
var i=this.getUniqueId(),o=t[i]||(t[i]={});
return o[e]=n,this;
},e.getCustomData=function(e){
var n=this.$["data-cke-expando"],i=n&&t[n];
return i&&e in i?i[e]:null;
},e.removeCustomData=function(e){
var n,i,o=this.$["data-cke-expando"],a=o&&t[o];
return a&&(n=a[e],i=e in a,delete a[e]),i?n:null;
},e.clearCustomData=function(){
this.removeAllListeners();
var e=this.$["data-cke-expando"];
e&&delete t[e];
},e.getUniqueId=function(){
return this.$["data-cke-expando"]||(this.$["data-cke-expando"]=CKEDITOR.tools.getNextNumber());
},CKEDITOR.event.implementOn(e);
}(CKEDITOR.dom.domObject.prototype),CKEDITOR.dom.node=function(e){
if(e){
var t=e.nodeType==CKEDITOR.NODE_DOCUMENT?"document":e.nodeType==CKEDITOR.NODE_ELEMENT?"element":e.nodeType==CKEDITOR.NODE_TEXT?"text":e.nodeType==CKEDITOR.NODE_COMMENT?"comment":e.nodeType==CKEDITOR.NODE_DOCUMENT_FRAGMENT?"documentFragment":"domObject";
return new CKEDITOR.dom[t](e);
}
return this;
},CKEDITOR.dom.node.prototype=new CKEDITOR.dom.domObject,CKEDITOR.NODE_ELEMENT=1,CKEDITOR.NODE_DOCUMENT=9,CKEDITOR.NODE_TEXT=3,CKEDITOR.NODE_COMMENT=8,CKEDITOR.NODE_DOCUMENT_FRAGMENT=11,CKEDITOR.POSITION_IDENTICAL=0,CKEDITOR.POSITION_DISCONNECTED=1,CKEDITOR.POSITION_FOLLOWING=2,CKEDITOR.POSITION_PRECEDING=4,CKEDITOR.POSITION_IS_CONTAINED=8,CKEDITOR.POSITION_CONTAINS=16,CKEDITOR.tools.extend(CKEDITOR.dom.node.prototype,{appendTo:function(e,t){
return e.append(this,t),e;
},clone:function(e,t){
function n(i){
if(i["data-cke-expando"]&&(i["data-cke-expando"]=!1),(i.nodeType==CKEDITOR.NODE_ELEMENT||i.nodeType==CKEDITOR.NODE_DOCUMENT_FRAGMENT)&&(t||i.nodeType!=CKEDITOR.NODE_ELEMENT||i.removeAttribute("id",!1),e)){
for(var o=i.childNodes,a=0;a<o.length;a++){
n(o[a]);
}
}
};
function i(t){
if(t.type==CKEDITOR.NODE_ELEMENT||t.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT){
if(t.type!=CKEDITOR.NODE_DOCUMENT_FRAGMENT){
var n=t.getName();
":"==n[0]&&t.renameNode(n.substring(1));
}
if(e){
for(var o=0;o<t.getChildCount();o++){
i(t.getChild(o));
}
}
}
};
var o=this.$.cloneNode(e);
n(o);
var a=new CKEDITOR.dom.node(o);
return CKEDITOR.env.ie&&CKEDITOR.env.version<9&&(this.type==CKEDITOR.NODE_ELEMENT||this.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT)&&i(a),a;
},hasPrevious:function(){
return !!this.$.previousSibling;
},hasNext:function(){
return !!this.$.nextSibling;
},insertAfter:function(e){
return e.$.parentNode.insertBefore(this.$,e.$.nextSibling),e;
},insertBefore:function(e){
return e.$.parentNode.insertBefore(this.$,e.$),e;
},insertBeforeMe:function(e){
return this.$.parentNode.insertBefore(e.$,this.$),e;
},getAddress:function(e){
for(var t=[],n=this.getDocument().$.documentElement,i=this.$;i&&i!=n;){
var o=i.parentNode;
o&&t.unshift(this.getIndex.call({$:i},e)),i=o;
}
return t;
},getDocument:function(){
return new CKEDITOR.dom.document(this.$.ownerDocument||this.$.parentNode.ownerDocument);
},getIndex:function(e){
function t(e,n){
var i=n?e.nextSibling:e.previousSibling;
return i&&i.nodeType==CKEDITOR.NODE_TEXT?i.nodeValue?i:t(i,n):null;
};
var n,i=this.$,o=-1;
if(!this.$.parentNode){
return -1;
}
if(e&&i.nodeType==CKEDITOR.NODE_TEXT&&!i.nodeValue){
var a=t(i)||t(i,!0);
if(!a){
return -1;
}
}
do{
(!e||i==this.$||i.nodeType!=CKEDITOR.NODE_TEXT||!n&&i.nodeValue)&&(o++,n=i.nodeType==CKEDITOR.NODE_TEXT);
}while(i=i.previousSibling);
return o;
},getNextSourceNode:function(e,t,n){
if(n&&!n.call){
var i=n;
n=function(e){
return !e.equals(i);
};
}
var o,a=!e&&this.getFirst&&this.getFirst();
if(!a){
if(this.type==CKEDITOR.NODE_ELEMENT&&n&&n(this,!0)===!1){
return null;
}
a=this.getNext();
}
for(;!a&&(o=(o||this).getParent());){
if(n&&n(o,!0)===!1){
return null;
}
a=o.getNext();
}
return a?n&&n(a)===!1?null:t&&t!=a.type?a.getNextSourceNode(!1,t,n):a:null;
},getPreviousSourceNode:function(e,t,n){
if(n&&!n.call){
var i=n;
n=function(e){
return !e.equals(i);
};
}
var o,a=!e&&this.getLast&&this.getLast();
if(!a){
if(this.type==CKEDITOR.NODE_ELEMENT&&n&&n(this,!0)===!1){
return null;
}
a=this.getPrevious();
}
for(;!a&&(o=(o||this).getParent());){
if(n&&n(o,!0)===!1){
return null;
}
a=o.getPrevious();
}
return a?n&&n(a)===!1?null:t&&a.type!=t?a.getPreviousSourceNode(!1,t,n):a:null;
},getPrevious:function(e){
var t,n=this.$;
do{
n=n.previousSibling,t=n&&10!=n.nodeType&&new CKEDITOR.dom.node(n);
}while(t&&e&&!e(t));
return t;
},getNext:function(e){
var t,n=this.$;
do{
n=n.nextSibling,t=n&&new CKEDITOR.dom.node(n);
}while(t&&e&&!e(t));
return t;
},getParent:function(e){
var t=this.$.parentNode;
return t&&(t.nodeType==CKEDITOR.NODE_ELEMENT||e&&t.nodeType==CKEDITOR.NODE_DOCUMENT_FRAGMENT)?new CKEDITOR.dom.node(t):null;
},getParents:function(e){
var t=this,n=[];
do{
n[e?"push":"unshift"](t);
}while(t=t.getParent());
return n;
},getCommonAncestor:function(e){
if(e.equals(this)){
return this;
}
if(e.contains&&e.contains(this)){
return e;
}
var t=this.contains?this:this.getParent();
do{
if(t.contains(e)){
return t;
}
}while(t=t.getParent());
return null;
},getPosition:function(e){
var t=this.$,n=e.$;
if(t.compareDocumentPosition){
return t.compareDocumentPosition(n);
}
if(t==n){
return CKEDITOR.POSITION_IDENTICAL;
}
if(this.type==CKEDITOR.NODE_ELEMENT&&e.type==CKEDITOR.NODE_ELEMENT){
if(t.contains){
if(t.contains(n)){
return CKEDITOR.POSITION_CONTAINS+CKEDITOR.POSITION_PRECEDING;
}
if(n.contains(t)){
return CKEDITOR.POSITION_IS_CONTAINED+CKEDITOR.POSITION_FOLLOWING;
}
}
if("sourceIndex" in t){
return t.sourceIndex<0||n.sourceIndex<0?CKEDITOR.POSITION_DISCONNECTED:t.sourceIndex<n.sourceIndex?CKEDITOR.POSITION_PRECEDING:CKEDITOR.POSITION_FOLLOWING;
}
}
for(var i=this.getAddress(),o=e.getAddress(),a=Math.min(i.length,o.length),r=0;a>r;r++){
if(i[r]!=o[r]){
return i[r]<o[r]?CKEDITOR.POSITION_PRECEDING:CKEDITOR.POSITION_FOLLOWING;
}
}
return i.length<o.length?CKEDITOR.POSITION_CONTAINS+CKEDITOR.POSITION_PRECEDING:CKEDITOR.POSITION_IS_CONTAINED+CKEDITOR.POSITION_FOLLOWING;
},getAscendant:function(e,t){
var n,i,o=this.$;
t||(o=o.parentNode),"function"==typeof e?(i=!0,n=e):(i=!1,n=function(t){
var n="string"==typeof t.nodeName?t.nodeName.toLowerCase():"";
return "string"==typeof e?n==e:n in e;
});
for(;o;){
if(n(i?new CKEDITOR.dom.node(o):o)){
return new CKEDITOR.dom.node(o);
}
try{
o=o.parentNode;
}
catch(a){
o=null;
}
}
return null;
},hasAscendant:function(e,t){
var n=this.$;
for(t||(n=n.parentNode);n;){
if(n.nodeName&&n.nodeName.toLowerCase()==e){
return !0;
}
n=n.parentNode;
}
return !1;
},move:function(e,t){
e.append(this.remove(),t);
},remove:function(e){
var t=this.$,n=t.parentNode;
if(n){
if(e){
for(var i;i=t.firstChild;){
n.insertBefore(t.removeChild(i),t);
}
}
n.removeChild(t);
}
return this;
},replace:function(e){
this.insertBefore(e),e.remove();
},trim:function(){
this.ltrim(),this.rtrim();
},ltrim:function(){
for(var e;this.getFirst&&(e=this.getFirst());){
if(e.type==CKEDITOR.NODE_TEXT){
var t=CKEDITOR.tools.ltrim(e.getText()),n=e.getLength();
if(!t){
e.remove();
continue;
}
t.length<n&&(e.split(n-t.length),this.$.removeChild(this.$.firstChild));
}
break;
}
},rtrim:function(){
for(var e;this.getLast&&(e=this.getLast());){
if(e.type==CKEDITOR.NODE_TEXT){
var t=CKEDITOR.tools.rtrim(e.getText()),n=e.getLength();
if(!t){
e.remove();
continue;
}
t.length<n&&(e.split(t.length),this.$.lastChild.parentNode.removeChild(this.$.lastChild));
}
break;
}
CKEDITOR.env.needsBrFiller&&(e=this.$.lastChild,e&&1==e.type&&"br"==e.nodeName.toLowerCase()&&e.parentNode.removeChild(e));
},isReadOnly:function(e){
var t=this;
if(this.type!=CKEDITOR.NODE_ELEMENT&&(t=this.getParent()),CKEDITOR.env.edge&&t&&t.is("textarea","input")&&(e=!0),!e&&t&&"undefined"!=typeof t.$.isContentEditable){
return !(t.$.isContentEditable||t.data("cke-editable"));
}
for(;t;){
if(t.data("cke-editable")){
return !1;
}
if(t.hasAttribute("contenteditable")){
return "false"==t.getAttribute("contenteditable");
}
t=t.getParent();
}
return !0;
}}),CKEDITOR.dom.window=function(e){
CKEDITOR.dom.domObject.call(this,e);
},CKEDITOR.dom.window.prototype=new CKEDITOR.dom.domObject,CKEDITOR.tools.extend(CKEDITOR.dom.window.prototype,{focus:function(){
this.$.focus();
},getViewPaneSize:function(){
var e=this.$.document,t="CSS1Compat"==e.compatMode;
return {width:(t?e.documentElement.clientWidth:e.body.clientWidth)||0,height:(t?e.documentElement.clientHeight:e.body.clientHeight)||0};
},getScrollPosition:function(){
var e=this.$;
if("pageXOffset" in e){
return {x:e.pageXOffset||0,y:e.pageYOffset||0};
}
var t=e.document;
return {x:t.documentElement.scrollLeft||t.body.scrollLeft||0,y:t.documentElement.scrollTop||t.body.scrollTop||0};
},getFrame:function(){
var e=this.$.frameElement;
return e?new CKEDITOR.dom.element.get(e):null;
}}),CKEDITOR.dom.document=function(e){
CKEDITOR.dom.domObject.call(this,e);
},CKEDITOR.dom.document.prototype=new CKEDITOR.dom.domObject,CKEDITOR.tools.extend(CKEDITOR.dom.document.prototype,{type:CKEDITOR.NODE_DOCUMENT,appendStyleSheet:function(e){
if(this.$.createStyleSheet){
this.$.createStyleSheet(e);
}else{
var t=new CKEDITOR.dom.element("link");
t.setAttributes({rel:"stylesheet",type:"text/css",href:e}),this.getHead().append(t);
}
},appendStyleText:function(e){
if(this.$.createStyleSheet){
var t=this.$.createStyleSheet("");
t.cssText=e;
}else{
var n=new CKEDITOR.dom.element("style",this);
n.append(new CKEDITOR.dom.text(e,this)),this.getHead().append(n);
}
return t||n.$.sheet;
},createElement:function(e,t){
var n=new CKEDITOR.dom.element(e,this);
return t&&(t.attributes&&n.setAttributes(t.attributes),t.styles&&n.setStyles(t.styles)),n;
},createText:function(e){
return new CKEDITOR.dom.text(e,this);
},focus:function(){
this.getWindow().focus();
},getActive:function(){
var e;
try{
e=this.$.activeElement;
}
catch(t){
return null;
}
return new CKEDITOR.dom.element(e);
},getById:function(e){
var t=this.$.getElementById(e);
return t?new CKEDITOR.dom.element(t):null;
},getByAddress:function(e,t){
for(var n=this.$.documentElement,i=0;n&&i<e.length;i++){
var o=e[i];
if(t){
for(var a=-1,r=0;r<n.childNodes.length;r++){
var s=n.childNodes[r];
if((t!==!0||3!=s.nodeType||!s.previousSibling||3!=s.previousSibling.nodeType)&&(a++,a==o)){
n=s;
break;
}
}
}else{
n=n.childNodes[o];
}
}
return n?new CKEDITOR.dom.node(n):null;
},getElementsByTag:function(e,t){
return CKEDITOR.env.ie&&document.documentMode<=8||!t||(e=t+":"+e),new CKEDITOR.dom.nodeList(this.$.getElementsByTagName(e));
},getHead:function(){
var e=this.$.getElementsByTagName("head")[0];
return e=e?new CKEDITOR.dom.element(e):this.getDocumentElement().append(new CKEDITOR.dom.element("head"),!0);
},getBody:function(){
return new CKEDITOR.dom.element(this.$.body);
},getDocumentElement:function(){
return new CKEDITOR.dom.element(this.$.documentElement);
},getWindow:function(){
return new CKEDITOR.dom.window(this.$.parentWindow||this.$.defaultView);
},write:function(e){
this.$.open("text/html","replace"),CKEDITOR.env.ie&&(e=e.replace(/(?:^\s*<!DOCTYPE[^>]*?>)|^/i,"$&\n<script data-cke-temp=\"1\">("+CKEDITOR.tools.fixDomain+")();</script>")),this.$.write(e),this.$.close();
},find:function(e){
return new CKEDITOR.dom.nodeList(this.$.querySelectorAll(e));
},findOne:function(e){
var t=this.$.querySelector(e);
return t?new CKEDITOR.dom.element(t):null;
},_getHtml5ShivFrag:function(){
var e=this.getCustomData("html5ShivFrag");
return e||(e=this.$.createDocumentFragment(),CKEDITOR.tools.enableHtml5Elements(e,!0),this.setCustomData("html5ShivFrag",e)),e;
}}),CKEDITOR.dom.nodeList=function(e){
this.$=e;
},CKEDITOR.dom.nodeList.prototype={count:function(){
return this.$.length;
},getItem:function(e){
if(0>e||e>=this.$.length){
return null;
}
var t=this.$[e];
return t?new CKEDITOR.dom.node(t):null;
}},CKEDITOR.dom.element=function(e,t){
"string"==typeof e&&(e=(t?t.$:document).createElement(e)),CKEDITOR.dom.domObject.call(this,e);
},CKEDITOR.dom.element.get=function(e){
var t="string"==typeof e?document.getElementById(e)||document.getElementsByName(e)[0]:e;
return t&&(t.$?t:new CKEDITOR.dom.element(t));
},CKEDITOR.dom.element.prototype=new CKEDITOR.dom.node,CKEDITOR.dom.element.createFromHtml=function(e,t){
var n=new CKEDITOR.dom.element("div",t);
return n.setHtml(e),n.getFirst().remove();
},CKEDITOR.dom.element.setMarker=function(e,t,n,i){
var o=t.getCustomData("list_marker_id")||t.setCustomData("list_marker_id",CKEDITOR.tools.getNextNumber()).getCustomData("list_marker_id"),a=t.getCustomData("list_marker_names")||t.setCustomData("list_marker_names",{}).getCustomData("list_marker_names");
return e[o]=t,a[n]=1,t.setCustomData(n,i);
},CKEDITOR.dom.element.clearAllMarkers=function(e){
for(var t in e){
CKEDITOR.dom.element.clearMarkers(e,e[t],1);
}
},CKEDITOR.dom.element.clearMarkers=function(e,t,n){
var i=t.getCustomData("list_marker_names"),o=t.getCustomData("list_marker_id");
for(var a in i){
t.removeCustomData(a);
}
t.removeCustomData("list_marker_names"),n&&(t.removeCustomData("list_marker_id"),delete e[o]);
},function(){
function e(e,t){
return (" "+e+" ").replace(s," ").indexOf(" "+t+" ")>-1;
};
function t(e){
var t=!0;
return e.$.id||(e.$.id="cke_tmp_"+CKEDITOR.tools.getNextNumber(),t=!1),function(){
t||e.removeAttribute("id");
};
};
function n(e,t){
return "#"+e.$.id+" "+t.split(/,\s*/).join(", #"+e.$.id+" ");
};
function i(e){
var t,n=["top","left","right","bottom"];
"border"==e&&(t=["color","style","width"]);
for(var i=[],o=0;o<n.length;o++){
if(t){
for(var a=0;a<t.length;a++){
i.push([e,n[o],t[a]].join("-"));
}
}else{
i.push([e,n[o]].join("-"));
}
}
return i;
};
function o(e){
for(var t=0,n=0,i=l[e].length;i>n;n++){
t+=parseInt(this.getComputedStyle(l[e][n])||0,10)||0;
}
return t;
};
var a=document.createElement("_").classList,r="undefined"!=typeof a&&null!==String(a.add).match(/\[Native code\]/gi),s=/[\n\t\r]/g;
CKEDITOR.tools.extend(CKEDITOR.dom.element.prototype,{type:CKEDITOR.NODE_ELEMENT,addClass:r?function(e){
return this.$.classList.add(e),this;
}:function(t){
var n=this.$.className;
return n&&(e(n,t)||(n+=" "+t)),this.$.className=n||t,this;
},removeClass:r?function(e){
var t=this.$;
return t.classList.remove(e),t.className||t.removeAttribute("class"),this;
}:function(t){
var n=this.getAttribute("class");
return n&&e(n,t)&&(n=n.replace(new RegExp("(?:^|\\s+)"+t+"(?=\\s|$)"),"").replace(/^\s+/,""),n?this.setAttribute("class",n):this.removeAttribute("class")),this;
},hasClass:function(t){
return e(this.$.className,t);
},append:function(e,t){
return "string"==typeof e&&(e=this.getDocument().createElement(e)),t?this.$.insertBefore(e.$,this.$.firstChild):this.$.appendChild(e.$),e;
},appendHtml:function(e){
if(this.$.childNodes.length){
var t=new CKEDITOR.dom.element("div",this.getDocument());
t.setHtml(e),t.moveChildren(this);
}else{
this.setHtml(e);
}
},appendText:function(e){
null!=this.$.text&&CKEDITOR.env.ie&&CKEDITOR.env.version<9?this.$.text+=e:this.append(new CKEDITOR.dom.text(e));
},appendBogus:function(e){
if(e||CKEDITOR.env.needsBrFiller){
for(var t=this.getLast();t&&t.type==CKEDITOR.NODE_TEXT&&!CKEDITOR.tools.rtrim(t.getText());){
t=t.getPrevious();
}
if(!t||!t.is||!t.is("br")){
var n=this.getDocument().createElement("br");
CKEDITOR.env.gecko&&n.setAttribute("type","_moz"),this.append(n);
}
}
},breakParent:function(e,t){
var n=new CKEDITOR.dom.range(this.getDocument());
n.setStartAfter(this),n.setEndAfter(e);
var i,o,a=n.extractContents(!1,t||!1);
if(n.insertNode(this.remove()),CKEDITOR.env.ie&&!CKEDITOR.env.edge){
for(i=new CKEDITOR.dom.element("div");o=a.getFirst();){
o.$.style.backgroundColor&&(o.$.style.backgroundColor=o.$.style.backgroundColor),i.append(o);
}
i.insertAfter(this),i.remove(!0);
}else{
a.insertAfterNode(this);
}
},contains:document.compareDocumentPosition?function(e){
return !!(16&this.$.compareDocumentPosition(e.$));
}:function(e){
var t=this.$;
return e.type!=CKEDITOR.NODE_ELEMENT?t.contains(e.getParent().$):t!=e.$&&t.contains(e.$);
},focus:function(){
function e(){
try{
this.$.focus();
}
catch(e){
}
};
return function(t){
t?CKEDITOR.tools.setTimeout(e,100,this):e.call(this);
};
}(),getHtml:function(){
var e=this.$.innerHTML;
return CKEDITOR.env.ie?e.replace(/<\?[^>]*>/g,""):e;
},getOuterHtml:function(){
if(this.$.outerHTML){
return this.$.outerHTML.replace(/<\?[^>]*>/,"");
}
var e=this.$.ownerDocument.createElement("div");
return e.appendChild(this.$.cloneNode(!0)),e.innerHTML;
},getClientRect:function(){
var e=CKEDITOR.tools.extend({},this.$.getBoundingClientRect());
return !e.width&&(e.width=e.right-e.left),!e.height&&(e.height=e.bottom-e.top),e;
},setHtml:CKEDITOR.env.ie&&CKEDITOR.env.version<9?function(e){
try{
var t=this.$;
if(this.getParent()){
return t.innerHTML=e;
}
var n=this.getDocument()._getHtml5ShivFrag();
return n.appendChild(t),t.innerHTML=e,n.removeChild(t),e;
}
catch(i){
this.$.innerHTML="";
var o=new CKEDITOR.dom.element("body",this.getDocument());
o.$.innerHTML=e;
for(var a=o.getChildren();a.count();){
this.append(a.getItem(0));
}
return e;
}
}:function(e){
return this.$.innerHTML=e;
},setText:function(){
var e=document.createElement("p");
return e.innerHTML="x",e=e.textContent,function(t){
this.$[e?"textContent":"innerText"]=t;
};
}(),getAttribute:function(){
var e=function(e){
return this.$.getAttribute(e,2);
};
return CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks)?function(t){
switch(t){
case "class":
t="className";
break;
case "http-equiv":
t="httpEquiv";
break;
case "name":
return this.$.name;
case "tabindex":
var n=e.call(this,t);
return 0!==n&&0===this.$.tabIndex&&(n=null),n;
case "checked":
var i=this.$.attributes.getNamedItem(t),o=i.specified?i.nodeValue:this.$.checked;
return o?"checked":null;
case "hspace":
case "value":
return this.$[t];
case "style":
return this.$.style.cssText;
case "contenteditable":
case "contentEditable":
return this.$.attributes.getNamedItem("contentEditable").specified?this.$.getAttribute("contentEditable"):null;
}
return e.call(this,t);
}:e;
}(),getAttributes:function(e){
var t,n={},i=this.$.attributes;
for(e=CKEDITOR.tools.isArray(e)?e:[],t=0;t<i.length;t++){
-1===CKEDITOR.tools.indexOf(e,i[t].name)&&(n[i[t].name]=i[t].value);
}
return n;
},getChildren:function(){
return new CKEDITOR.dom.nodeList(this.$.childNodes);
},getComputedStyle:document.defaultView&&document.defaultView.getComputedStyle?function(e){
var t=this.getWindow().$.getComputedStyle(this.$,null);
return t?t.getPropertyValue(e):"";
}:function(e){
return this.$.currentStyle[CKEDITOR.tools.cssStyleToDomStyle(e)];
},getDtd:function(){
var e=CKEDITOR.dtd[this.getName()];
return this.getDtd=function(){
return e;
},e;
},getElementsByTag:CKEDITOR.dom.document.prototype.getElementsByTag,getTabIndex:function(){
var e=this.$.tabIndex;
return 0!==e||CKEDITOR.dtd.$tabIndex[this.getName()]||0===parseInt(this.getAttribute("tabindex"),10)?e:-1;
},getText:function(){
return this.$.textContent||this.$.innerText||"";
},getWindow:function(){
return this.getDocument().getWindow();
},getId:function(){
return this.$.id||null;
},getNameAtt:function(){
return this.$.name||null;
},getName:function(){
var e=this.$.nodeName.toLowerCase();
if(CKEDITOR.env.ie&&document.documentMode<=8){
var t=this.$.scopeName;
"HTML"!=t&&(e=t.toLowerCase()+":"+e);
}
return this.getName=function(){
return e;
},this.getName();
},getValue:function(){
return this.$.value;
},getFirst:function(e){
var t=this.$.firstChild,n=t&&new CKEDITOR.dom.node(t);
return n&&e&&!e(n)&&(n=n.getNext(e)),n;
},getLast:function(e){
var t=this.$.lastChild,n=t&&new CKEDITOR.dom.node(t);
return n&&e&&!e(n)&&(n=n.getPrevious(e)),n;
},getStyle:function(e){
return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(e)];
},is:function(){
var e=this.getName();
if("object"==typeof arguments[0]){
return !!arguments[0][e];
}
for(var t=0;t<arguments.length;t++){
if(arguments[t]==e){
return !0;
}
}
return !1;
},isEditable:function(e){
var t=this.getName();
if(this.isReadOnly()||"none"==this.getComputedStyle("display")||"hidden"==this.getComputedStyle("visibility")||CKEDITOR.dtd.$nonEditable[t]||CKEDITOR.dtd.$empty[t]||this.is("a")&&(this.data("cke-saved-name")||this.hasAttribute("name"))&&!this.getChildCount()){
return !1;
}
if(e!==!1){
var n=CKEDITOR.dtd[t]||CKEDITOR.dtd.span;
return !(!n||!n["#"]);
}
return !0;
},isIdentical:function(e){
var t=this.clone(0,1),n=e.clone(0,1);
if(t.removeAttributes(["_moz_dirty","data-cke-expando","data-cke-saved-href","data-cke-saved-name"]),n.removeAttributes(["_moz_dirty","data-cke-expando","data-cke-saved-href","data-cke-saved-name"]),t.$.isEqualNode){
return t.$.style.cssText=CKEDITOR.tools.normalizeCssText(t.$.style.cssText),n.$.style.cssText=CKEDITOR.tools.normalizeCssText(n.$.style.cssText),t.$.isEqualNode(n.$);
}
if(t=t.getOuterHtml(),n=n.getOuterHtml(),CKEDITOR.env.ie&&CKEDITOR.env.version<9&&this.is("a")){
var i=this.getParent();
if(i.type==CKEDITOR.NODE_ELEMENT){
var o=i.clone();
o.setHtml(t),t=o.getHtml(),o.setHtml(n),n=o.getHtml();
}
}
return t==n;
},isVisible:function(){
var e,t,n=(this.$.offsetHeight||this.$.offsetWidth)&&"hidden"!=this.getComputedStyle("visibility");
return n&&CKEDITOR.env.webkit&&(e=this.getWindow(),!e.equals(CKEDITOR.document.getWindow())&&(t=e.$.frameElement)&&(n=new CKEDITOR.dom.element(t).isVisible())),!!n;
},isEmptyInlineRemoveable:function(){
if(!CKEDITOR.dtd.$removeEmpty[this.getName()]){
return !1;
}
for(var e=this.getChildren(),t=0,n=e.count();n>t;t++){
var i=e.getItem(t);
if((i.type!=CKEDITOR.NODE_ELEMENT||!i.data("cke-bookmark"))&&(i.type==CKEDITOR.NODE_ELEMENT&&!i.isEmptyInlineRemoveable()||i.type==CKEDITOR.NODE_TEXT&&CKEDITOR.tools.trim(i.getText()))){
return !1;
}
}
return !0;
},hasAttributes:CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks)?function(){
for(var e=this.$.attributes,t=0;t<e.length;t++){
var n=e[t];
switch(n.nodeName){
case "class":
if(this.getAttribute("class")){
return !0;
}
case "data-cke-expando":
continue;
default:
if(n.specified){
return !0;
}
}
}
return !1;
}:function(){
var e=this.$.attributes,t=e.length,n={"data-cke-expando":1,_moz_dirty:1};
return t>0&&(t>2||!n[e[0].nodeName]||2==t&&!n[e[1].nodeName]);
},hasAttribute:function(){
function e(e){
var t=this.$.attributes.getNamedItem(e);
if("input"==this.getName()){
switch(e){
case "class":
return this.$.className.length>0;
case "checked":
return !!this.$.checked;
case "value":
var n=this.getAttribute("type");
return "checkbox"==n||"radio"==n?"on"!=this.$.value:!!this.$.value;
}
}
return t?t.specified:!1;
};
return CKEDITOR.env.ie?CKEDITOR.env.version<8?function(t){
return "name"==t?!!this.$.name:e.call(this,t);
}:e:function(e){
return !!this.$.attributes.getNamedItem(e);
};
}(),hide:function(){
this.setStyle("display","none");
},moveChildren:function(e,t){
var n=this.$;
if(e=e.$,n!=e){
var i;
if(t){
for(;i=n.lastChild;){
e.insertBefore(n.removeChild(i),e.firstChild);
}
}else{
for(;i=n.firstChild;){
e.appendChild(n.removeChild(i));
}
}
}
},mergeSiblings:function(){
function e(e,t,n){
if(t&&t.type==CKEDITOR.NODE_ELEMENT){
for(var i=[];t.data("cke-bookmark")||t.isEmptyInlineRemoveable();){
if(i.push(t),t=n?t.getNext():t.getPrevious(),!t||t.type!=CKEDITOR.NODE_ELEMENT){
return;
}
}
if(e.isIdentical(t)){
for(var o=n?e.getLast():e.getFirst();i.length;){
i.shift().move(e,!n);
}
t.moveChildren(e,!n),t.remove(),o&&o.type==CKEDITOR.NODE_ELEMENT&&o.mergeSiblings();
}
}
};
return function(t){
(t===!1||CKEDITOR.dtd.$removeEmpty[this.getName()]||this.is("a"))&&(e(this,this.getNext(),!0),e(this,this.getPrevious()));
};
}(),show:function(){
this.setStyles({display:"",visibility:""});
},setAttribute:function(){
var e=function(e,t){
return this.$.setAttribute(e,t),this;
};
return CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks)?function(t,n){
return "class"==t?this.$.className=n:"style"==t?this.$.style.cssText=n:"tabindex"==t?this.$.tabIndex=n:"checked"==t?this.$.checked=n:"contenteditable"==t?e.call(this,"contentEditable",n):e.apply(this,arguments),this;
}:CKEDITOR.env.ie8Compat&&CKEDITOR.env.secure?function(t,n){
if("src"==t&&n.match(/^http:\/\//)){
try{
e.apply(this,arguments);
}
catch(i){
}
}else{
e.apply(this,arguments);
}
return this;
}:e;
}(),setAttributes:function(e){
for(var t in e){
this.setAttribute(t,e[t]);
}
return this;
},setValue:function(e){
return this.$.value=e,this;
},removeAttribute:function(){
var e=function(e){
this.$.removeAttribute(e);
};
return CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks)?function(t){
"class"==t?t="className":"tabindex"==t?t="tabIndex":"contenteditable"==t&&(t="contentEditable"),e.call(this,t);
}:e;
}(),removeAttributes:function(e){
if(CKEDITOR.tools.isArray(e)){
for(var t=0;t<e.length;t++){
this.removeAttribute(e[t]);
}
}else{
e=e||this.getAttributes();
for(var n in e){
e.hasOwnProperty(n)&&this.removeAttribute(n);
}
}
},removeStyle:function(e){
var t=this.$.style;
if(t.removeProperty||"border"!=e&&"margin"!=e&&"padding"!=e){
t.removeProperty?t.removeProperty(e):t.removeAttribute(CKEDITOR.tools.cssStyleToDomStyle(e)),this.$.style.cssText||this.removeAttribute("style");
}else{
for(var n=i(e),o=0;o<n.length;o++){
this.removeStyle(n[o]);
}
}
},setStyle:function(e,t){
return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(e)]=t,this;
},setStyles:function(e){
for(var t in e){
this.setStyle(t,e[t]);
}
return this;
},setOpacity:function(e){
CKEDITOR.env.ie&&CKEDITOR.env.version<9?(e=Math.round(100*e),this.setStyle("filter",e>=100?"":"progid:DXImageTransform.Microsoft.Alpha(opacity="+e+")")):this.setStyle("opacity",e);
},unselectable:function(){
if(this.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select","none")),CKEDITOR.env.ie){
this.setAttribute("unselectable","on");
for(var e,t=this.getElementsByTag("*"),n=0,i=t.count();i>n;n++){
e=t.getItem(n),e.setAttribute("unselectable","on");
}
}
},getPositionedAncestor:function(){
for(var e=this;"html"!=e.getName();){
if("static"!=e.getComputedStyle("position")){
return e;
}
e=e.getParent();
}
return null;
},getDocumentPosition:function(e){
var t=0,n=0,i=this.getDocument(),o=i.getBody(),a="BackCompat"==i.$.compatMode;
if(document.documentElement.getBoundingClientRect){
var r=this.$.getBoundingClientRect(),s=i.$,l=s.documentElement,d=l.clientTop||o.$.clientTop||0,c=l.clientLeft||o.$.clientLeft||0,u=!0;
if(CKEDITOR.env.ie){
var h=i.getDocumentElement().contains(this),f=i.getBody().contains(this);
u=a&&f||!a&&h;
}
if(u){
var m,g;
if(CKEDITOR.env.webkit||CKEDITOR.env.ie&&CKEDITOR.env.version>=12){
m=o.$.scrollLeft||l.scrollLeft,g=o.$.scrollTop||l.scrollTop;
}else{
var p=a?o.$:l;
m=p.scrollLeft,g=p.scrollTop;
}
t=r.left+m-c,n=r.top+g-d;
}
}else{
for(var E,T=this,C=null;T&&"body"!=T.getName()&&"html"!=T.getName();){
t+=T.$.offsetLeft-T.$.scrollLeft,n+=T.$.offsetTop-T.$.scrollTop,T.equals(this)||(t+=T.$.clientLeft||0,n+=T.$.clientTop||0);
for(var v=C;v&&!v.equals(T);){
t-=v.$.scrollLeft,n-=v.$.scrollTop,v=v.getParent();
}
C=T,T=(E=T.$.offsetParent)?new CKEDITOR.dom.element(E):null;
}
}
if(e){
var I=this.getWindow(),O=e.getWindow();
if(!I.equals(O)&&I.$.frameElement){
var D=new CKEDITOR.dom.element(I.$.frameElement).getDocumentPosition(e);
t+=D.x,n+=D.y;
}
}
return document.documentElement.getBoundingClientRect||CKEDITOR.env.gecko&&!a&&(t+=this.$.clientLeft?1:0,n+=this.$.clientTop?1:0),{x:t,y:n};
},scrollIntoView:function(e){
var t=this.getParent();
if(t){
do{
var n=t.$.clientWidth&&t.$.clientWidth<t.$.scrollWidth||t.$.clientHeight&&t.$.clientHeight<t.$.scrollHeight;
if(n&&!t.is("body")&&this.scrollIntoParent(t,e,1),t.is("html")){
var i=t.getWindow();
try{
var o=i.$.frameElement;
o&&(t=new CKEDITOR.dom.element(o));
}
catch(a){
}
}
}while(t=t.getParent());
}
},scrollIntoParent:function(e,t,n){
function i(t,n){
/body|html/.test(e.getName())?e.getWindow().$.scrollBy(t,n):(e.$.scrollLeft+=t,e.$.scrollTop+=n);
};
function o(e,t){
var n={x:0,y:0};
if(!e.is(s?"body":"html")){
var i=e.$.getBoundingClientRect();
n.x=i.left,n.y=i.top;
}
var a=e.getWindow();
if(!a.equals(t)){
var r=o(CKEDITOR.dom.element.get(a.$.frameElement),t);
n.x+=r.x,n.y+=r.y;
}
return n;
};
function a(e,t){
return parseInt(e.getComputedStyle("margin-"+t)||0,10)||0;
};
!e&&(e=this.getWindow());
var r=e.getDocument(),s="BackCompat"==r.$.compatMode;
e instanceof CKEDITOR.dom.window&&(e=s?r.getBody():r.getDocumentElement());
var l,d,c=e.getWindow(),u=o(this,c),h=o(e,c),f=this.$.offsetHeight,m=this.$.offsetWidth,g=e.$.clientHeight,p=e.$.clientWidth;
l={x:u.x-a(this,"left")-h.x||0,y:u.y-a(this,"top")-h.y||0},d={x:u.x+m+a(this,"right")-(h.x+p)||0,y:u.y+f+a(this,"bottom")-(h.y+g)||0},(l.y<0||d.y>0)&&i(0,t===!0?l.y:t===!1?d.y:l.y<0?l.y:d.y),n&&(l.x<0||d.x>0)&&i(l.x<0?l.x:d.x,0);
},setState:function(e,t,n){
switch(t=t||"cke",e){
case CKEDITOR.TRISTATE_ON:
this.addClass(t+"_on"),this.removeClass(t+"_off"),this.removeClass(t+"_disabled"),n&&this.setAttribute("aria-pressed",!0),n&&this.removeAttribute("aria-disabled");
break;
case CKEDITOR.TRISTATE_DISABLED:
this.addClass(t+"_disabled"),this.removeClass(t+"_off"),this.removeClass(t+"_on"),n&&this.setAttribute("aria-disabled",!0),n&&this.removeAttribute("aria-pressed");
break;
default:
this.addClass(t+"_off"),this.removeClass(t+"_on"),this.removeClass(t+"_disabled"),n&&this.removeAttribute("aria-pressed"),n&&this.removeAttribute("aria-disabled");
}
},getFrameDocument:function(){
var e=this.$;
try{
e.contentWindow.document;
}
catch(t){
e.src=e.src;
}
return e&&new CKEDITOR.dom.document(e.contentWindow.document);
},copyAttributes:function(e,t){
var n=this.$.attributes;
t=t||{};
for(var i=0;i<n.length;i++){
var o,a=n[i],r=a.nodeName.toLowerCase();
r in t||("checked"==r&&(o=this.getAttribute(r))?e.setAttribute(r,o):(!CKEDITOR.env.ie||this.hasAttribute(r))&&(o=this.getAttribute(r),null===o&&(o=a.nodeValue),e.setAttribute(r,o)));
}
""!==this.$.style.cssText&&(e.$.style.cssText=this.$.style.cssText);
},renameNode:function(e){
if(this.getName()!=e){
var t=this.getDocument(),n=new CKEDITOR.dom.element(e,t);
this.copyAttributes(n),this.moveChildren(n),this.getParent(!0)&&this.$.parentNode.replaceChild(n.$,this.$),n.$["data-cke-expando"]=this.$["data-cke-expando"],this.$=n.$,delete this.getName;
}
},getChild:function(){
function e(e,t){
var n=e.childNodes;
return t>=0&&t<n.length?n[t]:void 0;
};
return function(t){
var n=this.$;
if(t.slice){
for(t=t.slice();t.length>0&&n;){
n=e(n,t.shift());
}
}else{
n=e(n,t);
}
return n?new CKEDITOR.dom.node(n):null;
};
}(),getChildCount:function(){
return this.$.childNodes.length;
},disableContextMenu:function(){
function e(e){
return e.type==CKEDITOR.NODE_ELEMENT&&e.hasClass("cke_enable_context_menu");
};
this.on("contextmenu",function(t){
t.data.getTarget().getAscendant(e,!0)||t.data.preventDefault();
});
},getDirection:function(e){
return e?this.getComputedStyle("direction")||this.getDirection()||this.getParent()&&this.getParent().getDirection(1)||this.getDocument().$.dir||"ltr":this.getStyle("direction")||this.getAttribute("dir");
},data:function(e,t){
return e="data-"+e,void 0===t?this.getAttribute(e):(t===!1?this.removeAttribute(e):this.setAttribute(e,t),null);
},getEditor:function(){
var e,t,n=CKEDITOR.instances;
for(e in n){
if(t=n[e],t.element.equals(this)&&t.elementMode!=CKEDITOR.ELEMENT_MODE_APPENDTO){
return t;
}
}
return null;
},find:function(e){
var i=t(this),o=new CKEDITOR.dom.nodeList(this.$.querySelectorAll(n(this,e)));
return i(),o;
},findOne:function(e){
var i=t(this),o=this.$.querySelector(n(this,e));
return i(),o?new CKEDITOR.dom.element(o):null;
},forEach:function(e,t,n){
if(!(n||t&&this.type!=t)){
var i=e(this);
}
if(i!==!1){
for(var o,a=this.getChildren(),r=0;r<a.count();r++){
o=a.getItem(r),o.type==CKEDITOR.NODE_ELEMENT?o.forEach(e,t):t&&o.type!=t||e(o);
}
}
}});
var l={width:["border-left-width","border-right-width","padding-left","padding-right"],height:["border-top-width","border-bottom-width","padding-top","padding-bottom"]};
CKEDITOR.dom.element.prototype.setSize=function(e,t,n){
"number"==typeof t&&(!n||CKEDITOR.env.ie&&CKEDITOR.env.quirks||(t-=o.call(this,e)),this.setStyle(e,t+"px"));
},CKEDITOR.dom.element.prototype.getSize=function(e,t){
var n=Math.max(this.$["offset"+CKEDITOR.tools.capitalize(e)],this.$["client"+CKEDITOR.tools.capitalize(e)])||0;
return t&&(n-=o.call(this,e)),n;
};
}(),CKEDITOR.dom.documentFragment=function(e){
e=e||CKEDITOR.document,e.type==CKEDITOR.NODE_DOCUMENT?this.$=e.$.createDocumentFragment():this.$=e;
},CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype,CKEDITOR.dom.element.prototype,{type:CKEDITOR.NODE_DOCUMENT_FRAGMENT,insertAfterNode:function(e){
e=e.$,e.parentNode.insertBefore(this.$,e.nextSibling);
},getHtml:function(){
var e=new CKEDITOR.dom.element("div");
return this.clone(1,1).appendTo(e),e.getHtml().replace(/\s*data-cke-expando=".*?"/g,"");
}},!0,{append:1,appendBogus:1,clone:1,getFirst:1,getHtml:1,getLast:1,getParent:1,getNext:1,getPrevious:1,appendTo:1,moveChildren:1,insertBefore:1,insertAfterNode:1,replace:1,trim:1,type:1,ltrim:1,rtrim:1,getDocument:1,getChildCount:1,getChild:1,getChildren:1}),function(){
function e(e,t){
var n=this.range;
if(this._.end){
return null;
}
if(!this._.start){
if(this._.start=1,n.collapsed){
return this.end(),null;
}
n.optimize();
}
var i,o,a=n.startContainer,r=n.endContainer,s=n.startOffset,l=n.endOffset,d=this.guard,c=this.type,u=e?"getPreviousSourceNode":"getNextSourceNode";
if(!e&&!this._.guardLTR){
var h=r.type==CKEDITOR.NODE_ELEMENT?r:r.getParent(),f=r.type==CKEDITOR.NODE_ELEMENT?r.getChild(l):r.getNext();
this._.guardLTR=function(e,t){
return !(t&&h.equals(e)||f&&e.equals(f)||e.type==CKEDITOR.NODE_ELEMENT&&t&&e.equals(n.root));
};
}
if(e&&!this._.guardRTL){
var m=a.type==CKEDITOR.NODE_ELEMENT?a:a.getParent(),g=a.type==CKEDITOR.NODE_ELEMENT?s?a.getChild(s-1):null:a.getPrevious();
this._.guardRTL=function(e,t){
return !(t&&m.equals(e)||g&&e.equals(g)||e.type==CKEDITOR.NODE_ELEMENT&&t&&e.equals(n.root));
};
}
var p=e?this._.guardRTL:this._.guardLTR;
for(o=d?function(e,t){
return p(e,t)===!1?!1:d(e,t);
}:p,this.current?i=this.current[u](!1,c,o):(e?(i=r,i.type==CKEDITOR.NODE_ELEMENT&&(i=l>0?i.getChild(l-1):o(i,!0)===!1?null:i.getPreviousSourceNode(!0,c,o))):(i=a,i.type==CKEDITOR.NODE_ELEMENT&&((i=i.getChild(s))||(i=o(a,!0)===!1?null:a.getNextSourceNode(!0,c,o)))),i&&o(i)===!1&&(i=null));i&&!this._.end;){
if(this.current=i,this.evaluator&&this.evaluator(i)===!1){
if(t&&this.evaluator){
return !1;
}
}else{
if(!t){
return i;
}
}
i=i[u](!1,c,o);
}
return this.end(),this.current=null;
};
function t(t){
for(var n,i=null;n=e.call(this,t);){
i=n;
}
return i;
};
function n(e){
var t,n={};
for(t in e){
CKEDITOR.dtd[t]["#"]&&(n[t]=1);
}
return n;
};
function i(e){
if(u(e)){
return !1;
}
if(e.type==CKEDITOR.NODE_TEXT){
return !0;
}
if(e.type==CKEDITOR.NODE_ELEMENT){
if(e.is(CKEDITOR.dtd.$inline)||e.is("hr")||"false"==e.getAttribute("contenteditable")){
return !0;
}
if(!CKEDITOR.env.needsBrFiller&&e.is(f)&&h(e)){
return !0;
}
}
return !1;
};
CKEDITOR.dom.walker=CKEDITOR.tools.createClass({$:function(e){
this.range=e,this._={};
},proto:{end:function(){
this._.end=1;
},next:function(){
return e.call(this);
},previous:function(){
return e.call(this,1);
},checkForward:function(){
return e.call(this,0,1)!==!1;
},checkBackward:function(){
return e.call(this,1,1)!==!1;
},lastForward:function(){
return t.call(this);
},lastBackward:function(){
return t.call(this,1);
},reset:function(){
delete this.current,this._={};
}}});
var o={block:1,"list-item":1,table:1,"table-row-group":1,"table-header-group":1,"table-footer-group":1,"table-row":1,"table-column-group":1,"table-column":1,"table-cell":1,"table-caption":1},a={absolute:1,fixed:1};
CKEDITOR.dom.element.prototype.isBlockBoundary=function(e){
var t="none"==this.getComputedStyle("float")&&!(this.getComputedStyle("position") in a);
return t&&o[this.getComputedStyle("display")]?!0:!!(this.is(CKEDITOR.dtd.$block)||e&&this.is(e));
},CKEDITOR.dom.walker.blockBoundary=function(e){
return function(t){
return !(t.type==CKEDITOR.NODE_ELEMENT&&t.isBlockBoundary(e));
};
},CKEDITOR.dom.walker.listItemBoundary=function(){
return this.blockBoundary({br:1});
},CKEDITOR.dom.walker.bookmark=function(e,t){
function n(e){
return e&&e.getName&&"span"==e.getName()&&e.data("cke-bookmark");
};
return function(i){
var o,a;
return o=i&&i.type!=CKEDITOR.NODE_ELEMENT&&(a=i.getParent())&&n(a),o=e?o:o||n(i),!!(t^o);
};
},CKEDITOR.dom.walker.whitespaces=function(e){
return function(t){
var n;
return t&&t.type==CKEDITOR.NODE_TEXT&&(n=!CKEDITOR.tools.trim(t.getText())||CKEDITOR.env.webkit&&"\u200b"==t.getText()),!!(e^n);
};
},CKEDITOR.dom.walker.invisible=function(e){
var t=CKEDITOR.dom.walker.whitespaces(),n=CKEDITOR.env.webkit?1:0;
return function(i){
var o;
return t(i)?o=1:(i.type==CKEDITOR.NODE_TEXT&&(i=i.getParent()),o=i.$.offsetWidth<=n),!!(e^o);
};
},CKEDITOR.dom.walker.nodeType=function(e,t){
return function(n){
return !!(t^n.type==e);
};
},CKEDITOR.dom.walker.bogus=function(e){
function t(e){
return !s(e)&&!l(e);
};
return function(n){
var i=CKEDITOR.env.needsBrFiller?n.is&&n.is("br"):n.getText&&r.test(n.getText());
if(i){
var o=n.getParent(),a=n.getNext(t);
i=o.isBlockBoundary()&&(!a||a.type==CKEDITOR.NODE_ELEMENT&&a.isBlockBoundary());
}
return !!(e^i);
};
},CKEDITOR.dom.walker.temp=function(e){
return function(t){
t.type!=CKEDITOR.NODE_ELEMENT&&(t=t.getParent());
var n=t&&t.hasAttribute("data-cke-temp");
return !!(e^n);
};
};
var r=/^[\t\r\n ]*(?:&nbsp;|\xa0)$/,s=CKEDITOR.dom.walker.whitespaces(),l=CKEDITOR.dom.walker.bookmark(),d=CKEDITOR.dom.walker.temp(),c=function(e){
return l(e)||s(e)||e.type==CKEDITOR.NODE_ELEMENT&&e.is(CKEDITOR.dtd.$inline)&&!e.is(CKEDITOR.dtd.$empty);
};
CKEDITOR.dom.walker.ignored=function(e){
return function(t){
var n=s(t)||l(t)||d(t);
return !!(e^n);
};
};
var u=CKEDITOR.dom.walker.ignored();
CKEDITOR.dom.walker.empty=function(e){
return function(t){
for(var n=0,i=t.getChildCount();i>n;++n){
if(!u(t.getChild(n))){
return !!e;
}
}
return !e;
};
};
var h=CKEDITOR.dom.walker.empty(),f=CKEDITOR.dom.walker.validEmptyBlockContainers=CKEDITOR.tools.extend(n(CKEDITOR.dtd.$block),{caption:1,td:1,th:1});
CKEDITOR.dom.walker.editable=function(e){
return function(t){
return !!(e^i(t));
};
},CKEDITOR.dom.element.prototype.getBogus=function(){
var e=this;
do{
e=e.getPreviousSourceNode();
}while(c(e));
return e&&(CKEDITOR.env.needsBrFiller?e.is&&e.is("br"):e.getText&&r.test(e.getText()))?e:!1;
};
}(),CKEDITOR.dom.range=function(e){
this.startContainer=null,this.startOffset=null,this.endContainer=null,this.endOffset=null,this.collapsed=!0;
var t=e instanceof CKEDITOR.dom.document;
this.document=t?e:e.getDocument(),this.root=t?e.getBody():e;
},function(){
function e(e){
e.collapsed=e.startContainer&&e.endContainer&&e.startContainer.equals(e.endContainer)&&e.startOffset==e.endOffset;
};
function t(e,t,n,i,o){
"use strict";
function a(e,t,n,i){
var a=n?e.getPrevious():e.getNext();
return i&&m?a:(p||i?t.append(e.clone(!0,o),n):(e.remove(),g&&t.append(e)),a);
};
function r(){
var e,t,n,i=Math.min(y.length,K.length);
for(e=0;i>e;e++){
if(t=y[e],n=K[e],!t.equals(n)){
return e;
}
}
return e-1;
};
function s(){
var t=_8-1,n=c&&u&&!T.equals(C);
if(k-1>t||w-1>t||n){
if(n?e.moveToPosition(C,CKEDITOR.POSITION_BEFORE_START):w==t+1&&d?e.moveToPosition(K[t],CKEDITOR.POSITION_BEFORE_END):e.moveToPosition(K[t+1],CKEDITOR.POSITION_BEFORE_START),i){
var o=y[t+1];
if(o&&o.type==CKEDITOR.NODE_ELEMENT){
var a=CKEDITOR.dom.element.createFromHtml("<span data-cke-bookmark=\"1\" style=\"display:none\">&nbsp;</span>",e.document);
a.insertAfter(o),o.mergeSiblings(!1),e.moveToBookmark({startNode:a});
}
}
}else{
e.collapse(!0);
}
};
e.optimizeBookmark();
var l,d,c,u,h,f,m=0===t,g=1==t,p=2==t,E=p||g,T=e.startContainer,C=e.endContainer,v=e.startOffset,I=e.endOffset;
if(p&&C.type==CKEDITOR.NODE_TEXT&&T.equals(C)){
return T=e.document.createText(T.substring(v,I)),void n.append(T);
}
C.type==CKEDITOR.NODE_TEXT?p?f=!0:C=C.split(I):C.getChildCount()>0?I>=C.getChildCount()?(C=C.getChild(I-1),d=!0):C=C.getChild(I):(d=!0,u=!0),T.type==CKEDITOR.NODE_TEXT?p?h=!0:T.split(v):T.getChildCount()>0?0===v?(T=T.getChild(v),l=!0):T=T.getChild(v-1):(l=!0,c=!0);
for(var O,D,b,R,y=T.getParents(),K=C.getParents(),_8=r(),k=y.length-1,w=K.length-1,S=n,x=-1,N=_8;k>=N;N++){
for(D=y[N],R=D.getNext(),N!=k||D.equals(K[N])&&w>k?E&&(O=S.append(D.clone(0,o))):l?a(D,S,!1,c):h&&S.append(e.document.createText(D.substring(v)));R;){
if(R.equals(K[N])){
x=N;
break;
}
R=a(R,S);
}
S=O;
}
for(S=n,N=_8;w>=N;N++){
if(b=K[N],R=b.getPrevious(),b.equals(y[N])){
E&&(S=S.getChild(0));
}else{
if(N!=w||b.equals(y[N])&&k>w?E&&(O=S.append(b.clone(0,o))):d?a(b,S,!1,u):f&&S.append(e.document.createText(b.substring(0,I))),N>x){
for(;R;){
R=a(R,S,!0);
}
}
S=O;
}
}
p||s();
};
function n(){
var e=!1,t=CKEDITOR.dom.walker.whitespaces(),n=CKEDITOR.dom.walker.bookmark(!0),i=CKEDITOR.dom.walker.bogus();
return function(o){
return n(o)||t(o)?!0:i(o)&&!e?(e=!0,!0):o.type==CKEDITOR.NODE_TEXT&&(o.hasAscendant("pre")||CKEDITOR.tools.trim(o.getText()).length)?!1:o.type!=CKEDITOR.NODE_ELEMENT||o.is(a)?!0:!1;
};
};
function i(e){
var t=CKEDITOR.dom.walker.whitespaces(),n=CKEDITOR.dom.walker.bookmark(1);
return function(i){
return n(i)||t(i)?!0:!e&&r(i)||i.type==CKEDITOR.NODE_ELEMENT&&i.is(CKEDITOR.dtd.$removeEmpty);
};
};
function o(e){
return function(){
var t;
return this[e?"getPreviousNode":"getNextNode"](function(e){
return !t&&d(e)&&(t=e),l(e)&&!(r(e)&&e.equals(t));
});
};
};
var a={abbr:1,acronym:1,b:1,bdo:1,big:1,cite:1,code:1,del:1,dfn:1,em:1,font:1,i:1,ins:1,label:1,kbd:1,q:1,samp:1,small:1,span:1,strike:1,strong:1,sub:1,sup:1,tt:1,u:1,"var":1},r=CKEDITOR.dom.walker.bogus(),s=/^[\t\r\n ]*(?:&nbsp;|\xa0)$/,l=CKEDITOR.dom.walker.editable(),d=CKEDITOR.dom.walker.ignored(!0);
CKEDITOR.dom.range.prototype={clone:function(){
var e=new CKEDITOR.dom.range(this.root);
return e._setStartContainer(this.startContainer),e.startOffset=this.startOffset,e._setEndContainer(this.endContainer),e.endOffset=this.endOffset,e.collapsed=this.collapsed,e;
},collapse:function(e){
e?(this._setEndContainer(this.startContainer),this.endOffset=this.startOffset):(this._setStartContainer(this.endContainer),this.startOffset=this.endOffset),this.collapsed=!0;
},cloneContents:function(e){
var n=new CKEDITOR.dom.documentFragment(this.document);
return e="undefined"==typeof e?!0:e,this.collapsed||t(this,2,n,!1,e),n;
},deleteContents:function(e){
this.collapsed||t(this,0,null,e);
},extractContents:function(e,n){
var i=new CKEDITOR.dom.documentFragment(this.document);
return n="undefined"==typeof n?!0:n,this.collapsed||t(this,1,i,e,n),i;
},createBookmark:function(e){
var t,n,i,o,a=this.collapsed;
return t=this.document.createElement("span"),t.data("cke-bookmark",1),t.setStyle("display","none"),t.setHtml("&nbsp;"),e&&(i="cke_bm_"+CKEDITOR.tools.getNextNumber(),t.setAttribute("id",i+(a?"C":"S"))),a||(n=t.clone(),n.setHtml("&nbsp;"),e&&n.setAttribute("id",i+"E"),o=this.clone(),o.collapse(),o.insertNode(n)),o=this.clone(),o.collapse(!0),o.insertNode(t),n?(this.setStartAfter(t),this.setEndBefore(n)):this.moveToPosition(t,CKEDITOR.POSITION_AFTER_END),{startNode:e?i+(a?"C":"S"):t,endNode:e?i+"E":n,serializable:e,collapsed:a};
},createBookmark2:function(){
function e(e,t){
return e.type!=CKEDITOR.NODE_ELEMENT||0===t||t==e.getChildCount()?0:e.getChild(t-1).type==CKEDITOR.NODE_TEXT&&e.getChild(t).type==CKEDITOR.NODE_TEXT;
};
function t(e){
for(var t=0;(e=e.getPrevious())&&e.type==CKEDITOR.NODE_TEXT;){
t+=e.getLength();
}
return t;
};
function n(n){
var o=n.container,a=n.offset;
if(e(o,a)&&(o=o.getChild(a-1),a=o.getLength()),o.type==CKEDITOR.NODE_ELEMENT&&a>1&&(a=o.getChild(a-1).getIndex(!0)+1),o.type==CKEDITOR.NODE_TEXT){
var r=t(o);
if(o.getText()){
a+=r;
}else{
var s=o.getPrevious(i);
r?(a=r,o=s?s.getNext():o.getParent().getFirst()):(o=o.getParent(),a=s?s.getIndex(!0)+1:0);
}
}
n.container=o,n.offset=a;
};
var i=CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_TEXT,!0);
return function(e){
var t=this.collapsed,i={container:this.startContainer,offset:this.startOffset},o={container:this.endContainer,offset:this.endOffset};
return e&&(n(i),t||n(o)),{start:i.container.getAddress(e),end:t?null:o.container.getAddress(e),startOffset:i.offset,endOffset:o.offset,normalized:e,collapsed:t,is2:!0};
};
}(),moveToBookmark:function(e){
if(e.is2){
var t=this.document.getByAddress(e.start,e.normalized),n=e.startOffset,i=e.end&&this.document.getByAddress(e.end,e.normalized),o=e.endOffset;
this.setStart(t,n),i?this.setEnd(i,o):this.collapse(!0);
}else{
var a=e.serializable,r=a?this.document.getById(e.startNode):e.startNode,s=a?this.document.getById(e.endNode):e.endNode;
this.setStartBefore(r),r.remove(),s?(this.setEndBefore(s),s.remove()):this.collapse(!0);
}
},getBoundaryNodes:function(){
var e,t=this.startContainer,n=this.endContainer,i=this.startOffset,o=this.endOffset;
if(t.type==CKEDITOR.NODE_ELEMENT){
if(e=t.getChildCount(),e>i){
t=t.getChild(i);
}else{
if(1>e){
t=t.getPreviousSourceNode();
}else{
for(t=t.$;t.lastChild;){
t=t.lastChild;
}
t=new CKEDITOR.dom.node(t),t=t.getNextSourceNode()||t;
}
}
}
if(n.type==CKEDITOR.NODE_ELEMENT){
if(e=n.getChildCount(),e>o){
n=n.getChild(o).getPreviousSourceNode(!0);
}else{
if(1>e){
n=n.getPreviousSourceNode();
}else{
for(n=n.$;n.lastChild;){
n=n.lastChild;
}
n=new CKEDITOR.dom.node(n);
}
}
}
return t.getPosition(n)&CKEDITOR.POSITION_FOLLOWING&&(t=n),{startNode:t,endNode:n};
},getCommonAncestor:function(e,t){
var n,i=this.startContainer,o=this.endContainer;
return n=i.equals(o)?e&&i.type==CKEDITOR.NODE_ELEMENT&&this.startOffset==this.endOffset-1?i.getChild(this.startOffset):i:i.getCommonAncestor(o),t&&!n.is?n.getParent():n;
},optimize:function(){
var e=this.startContainer,t=this.startOffset;
e.type!=CKEDITOR.NODE_ELEMENT&&(t?t>=e.getLength()&&this.setStartAfter(e):this.setStartBefore(e)),e=this.endContainer,t=this.endOffset,e.type!=CKEDITOR.NODE_ELEMENT&&(t?t>=e.getLength()&&this.setEndAfter(e):this.setEndBefore(e));
},optimizeBookmark:function(){
var e=this.startContainer,t=this.endContainer;
e.is&&e.is("span")&&e.data("cke-bookmark")&&this.setStartAt(e,CKEDITOR.POSITION_BEFORE_START),t&&t.is&&t.is("span")&&t.data("cke-bookmark")&&this.setEndAt(t,CKEDITOR.POSITION_AFTER_END);
},trim:function(e,t){
var n=this.startContainer,i=this.startOffset,o=this.collapsed;
if((!e||o)&&n&&n.type==CKEDITOR.NODE_TEXT){
if(i){
if(i>=n.getLength()){
i=n.getIndex()+1,n=n.getParent();
}else{
var a=n.split(i);
i=n.getIndex()+1,n=n.getParent(),this.startContainer.equals(this.endContainer)?this.setEnd(a,this.endOffset-this.startOffset):n.equals(this.endContainer)&&(this.endOffset+=1);
}
}else{
i=n.getIndex(),n=n.getParent();
}
if(this.setStart(n,i),o){
return void this.collapse(!0);
}
}
var r=this.endContainer,s=this.endOffset;
t||o||!r||r.type!=CKEDITOR.NODE_TEXT||(s?s>=r.getLength()?(s=r.getIndex()+1,r=r.getParent()):(r.split(s),s=r.getIndex()+1,r=r.getParent()):(s=r.getIndex(),r=r.getParent()),this.setEnd(r,s));
},enlarge:function(e,t){
function n(e,t){
var n=new CKEDITOR.dom.range(m);
n.setStart(e,t),n.setEndAt(m,CKEDITOR.POSITION_BEFORE_END);
var i,a=new CKEDITOR.dom.walker(n);
for(a.guard=function(e){
return !(e.type==CKEDITOR.NODE_ELEMENT&&e.isBlockBoundary());
};i=a.next();){
if(i.type!=CKEDITOR.NODE_TEXT){
return !1;
}
if(h=i!=e?i.getText():i.substring(t),o.test(h)){
return !1;
}
}
return !0;
};
function i(e){
return e&&e.type==CKEDITOR.NODE_ELEMENT&&e.hasAttribute("contenteditable")?null:e;
};
var o=new RegExp(/[^\s\ufeff]/);
switch(e){
case CKEDITOR.ENLARGE_INLINE:
var a=1;
case CKEDITOR.ENLARGE_ELEMENT:
if(this.collapsed){
return;
}
var r,s,l,d,c,u,h,f=this.getCommonAncestor(),m=this.root,g=!1,p=this.startContainer,E=this.startOffset;
for(p.type==CKEDITOR.NODE_TEXT?(E&&(p=!CKEDITOR.tools.trim(p.substring(0,E)).length&&p,g=!!p),p&&((d=p.getPrevious())||(l=p.getParent()))):(E&&(d=p.getChild(E-1)||p.getLast()),d||(l=p)),l=i(l);l||d;){
if(l&&!d){
if(!c&&l.equals(f)&&(c=!0),a?l.isBlockBoundary():!m.contains(l)){
break;
}
g&&"inline"==l.getComputedStyle("display")||(g=!1,c?r=l:this.setStartBefore(l)),d=l.getPrevious();
}
for(;d;){
if(u=!1,d.type!=CKEDITOR.NODE_COMMENT){
if(d.type==CKEDITOR.NODE_TEXT){
h=d.getText(),o.test(h)&&(d=null),u=/[\s\ufeff]$/.test(h);
}else{
var T=CKEDITOR.env.webkit?1:0;
if((d.$.offsetWidth>T||t&&d.is("br"))&&!d.data("cke-bookmark")){
if(g&&CKEDITOR.dtd.$removeEmpty[d.getName()]){
if(h=d.getText(),o.test(h)){
d=null;
}else{
for(var C,v=d.$.getElementsByTagName("*"),I=0;C=v[I++];){
if(!CKEDITOR.dtd.$removeEmpty[C.nodeName.toLowerCase()]){
d=null;
break;
}
}
}
d&&(u=!!h.length);
}else{
d=null;
}
}
}
if(u&&(g?c?r=l:l&&this.setStartBefore(l):g=!0),d){
var O=d.getPrevious();
if(!l&&!O){
l=d,d=null;
break;
}
d=O;
}else{
l=null;
}
}else{
d=d.getPrevious();
}
}
l&&(l=i(l.getParent()));
}
for(p=this.endContainer,E=this.endOffset,l=d=null,c=g=!1,p.type==CKEDITOR.NODE_TEXT?CKEDITOR.tools.trim(p.substring(E)).length?g=!0:(g=!p.getLength(),E==p.getLength()?(d=p.getNext())||(l=p.getParent()):n(p,E)&&(l=p.getParent())):(d=p.getChild(E),d||(l=p));l||d;){
if(l&&!d){
if(!c&&l.equals(f)&&(c=!0),a?l.isBlockBoundary():!m.contains(l)){
break;
}
g&&"inline"==l.getComputedStyle("display")||(g=!1,c?s=l:l&&this.setEndAfter(l)),d=l.getNext();
}
for(;d;){
if(u=!1,d.type==CKEDITOR.NODE_TEXT){
h=d.getText(),n(d,0)||(d=null),u=/^[\s\ufeff]/.test(h);
}else{
if(d.type==CKEDITOR.NODE_ELEMENT){
if((d.$.offsetWidth>0||t&&d.is("br"))&&!d.data("cke-bookmark")){
if(g&&CKEDITOR.dtd.$removeEmpty[d.getName()]){
if(h=d.getText(),o.test(h)){
d=null;
}else{
for(v=d.$.getElementsByTagName("*"),I=0;C=v[I++];){
if(!CKEDITOR.dtd.$removeEmpty[C.nodeName.toLowerCase()]){
d=null;
break;
}
}
}
d&&(u=!!h.length);
}else{
d=null;
}
}
}else{
u=1;
}
}
if(u&&g&&(c?s=l:this.setEndAfter(l)),d){
if(O=d.getNext(),!l&&!O){
l=d,d=null;
break;
}
d=O;
}else{
l=null;
}
}
l&&(l=i(l.getParent()));
}
r&&s&&(f=r.contains(s)?s:r,this.setStartBefore(f),this.setEndAfter(f));
break;
case CKEDITOR.ENLARGE_BLOCK_CONTENTS:
case CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:
var D=new CKEDITOR.dom.range(this.root);
m=this.root,D.setStartAt(m,CKEDITOR.POSITION_AFTER_START),D.setEnd(this.startContainer,this.startOffset);
var b,R,y=new CKEDITOR.dom.walker(D),K=CKEDITOR.dom.walker.blockBoundary(e==CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS?{br:1}:null),_9=null,k=function(e){
if(e.type==CKEDITOR.NODE_ELEMENT&&"false"==e.getAttribute("contenteditable")){
if(_9){
if(_9.equals(e)){
return void (_9=null);
}
}else{
_9=e;
}
}else{
if(_9){
return;
}
}
var t=K(e);
return t||(b=e),t;
},w=function(e){
var t=k(e);
return !t&&e.is&&e.is("br")&&(R=e),t;
};
if(y.guard=k,l=y.lastBackward(),b=b||m,this.setStartAt(b,!b.is("br")&&(!l&&this.checkStartOfBlock()||l&&b.contains(l))?CKEDITOR.POSITION_AFTER_START:CKEDITOR.POSITION_AFTER_END),e==CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS){
var S=this.clone();
y=new CKEDITOR.dom.walker(S);
var x=CKEDITOR.dom.walker.whitespaces(),N=CKEDITOR.dom.walker.bookmark();
y.evaluator=function(e){
return !x(e)&&!N(e);
};
var A=y.previous();
if(A&&A.type==CKEDITOR.NODE_ELEMENT&&A.is("br")){
return;
}
}
D=this.clone(),D.collapse(),D.setEndAt(m,CKEDITOR.POSITION_BEFORE_END),y=new CKEDITOR.dom.walker(D),y.guard=e==CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS?w:k,b=_9=R=null,l=y.lastForward(),b=b||m,this.setEndAt(b,!l&&this.checkEndOfBlock()||l&&b.contains(l)?CKEDITOR.POSITION_BEFORE_END:CKEDITOR.POSITION_BEFORE_START),R&&this.setEndAfter(R);
}
},shrink:function(e,t,n){
if(!this.collapsed){
e=e||CKEDITOR.SHRINK_TEXT;
var i=this.clone(),o=this.startContainer,a=this.endContainer,r=this.startOffset,s=this.endOffset,l=1,d=1;
o&&o.type==CKEDITOR.NODE_TEXT&&(r?r>=o.getLength()?i.setStartAfter(o):(i.setStartBefore(o),l=0):i.setStartBefore(o)),a&&a.type==CKEDITOR.NODE_TEXT&&(s?s>=a.getLength()?i.setEndAfter(a):(i.setEndAfter(a),d=0):i.setEndBefore(a));
var c=new CKEDITOR.dom.walker(i),u=CKEDITOR.dom.walker.bookmark();
c.evaluator=function(t){
return t.type==(e==CKEDITOR.SHRINK_ELEMENT?CKEDITOR.NODE_ELEMENT:CKEDITOR.NODE_TEXT);
};
var h;
if(c.guard=function(t,i){
return u(t)?!0:e==CKEDITOR.SHRINK_ELEMENT&&t.type==CKEDITOR.NODE_TEXT?!1:i&&t.equals(h)?!1:n===!1&&t.type==CKEDITOR.NODE_ELEMENT&&t.isBlockBoundary()?!1:t.type==CKEDITOR.NODE_ELEMENT&&t.hasAttribute("contenteditable")?!1:(i||t.type!=CKEDITOR.NODE_ELEMENT||(h=t),!0);
},l){
var f=c[e==CKEDITOR.SHRINK_ELEMENT?"lastForward":"next"]();
f&&this.setStartAt(f,t?CKEDITOR.POSITION_AFTER_START:CKEDITOR.POSITION_BEFORE_START);
}
if(d){
c.reset();
var m=c[e==CKEDITOR.SHRINK_ELEMENT?"lastBackward":"previous"]();
m&&this.setEndAt(m,t?CKEDITOR.POSITION_BEFORE_END:CKEDITOR.POSITION_AFTER_END);
}
return !(!l&&!d);
}
},insertNode:function(e){
this.optimizeBookmark(),this.trim(!1,!0);
var t=this.startContainer,n=this.startOffset,i=t.getChild(n);
i?e.insertBefore(i):t.append(e),e.getParent()&&e.getParent().equals(this.endContainer)&&this.endOffset++,this.setStartBefore(e);
},moveToPosition:function(e,t){
this.setStartAt(e,t),this.collapse(!0);
},moveToRange:function(e){
this.setStart(e.startContainer,e.startOffset),this.setEnd(e.endContainer,e.endOffset);
},selectNodeContents:function(e){
this.setStart(e,0),this.setEnd(e,e.type==CKEDITOR.NODE_TEXT?e.getLength():e.getChildCount());
},setStart:function(t,n){
t.type==CKEDITOR.NODE_ELEMENT&&CKEDITOR.dtd.$empty[t.getName()]&&(n=t.getIndex(),t=t.getParent()),this._setStartContainer(t),this.startOffset=n,this.endContainer||(this._setEndContainer(t),this.endOffset=n),e(this);
},setEnd:function(t,n){
t.type==CKEDITOR.NODE_ELEMENT&&CKEDITOR.dtd.$empty[t.getName()]&&(n=t.getIndex()+1,t=t.getParent()),this._setEndContainer(t),this.endOffset=n,this.startContainer||(this._setStartContainer(t),this.startOffset=n),e(this);
},setStartAfter:function(e){
this.setStart(e.getParent(),e.getIndex()+1);
},setStartBefore:function(e){
this.setStart(e.getParent(),e.getIndex());
},setEndAfter:function(e){
this.setEnd(e.getParent(),e.getIndex()+1);
},setEndBefore:function(e){
this.setEnd(e.getParent(),e.getIndex());
},setStartAt:function(t,n){
switch(n){
case CKEDITOR.POSITION_AFTER_START:
this.setStart(t,0);
break;
case CKEDITOR.POSITION_BEFORE_END:
t.type==CKEDITOR.NODE_TEXT?this.setStart(t,t.getLength()):this.setStart(t,t.getChildCount());
break;
case CKEDITOR.POSITION_BEFORE_START:
this.setStartBefore(t);
break;
case CKEDITOR.POSITION_AFTER_END:
this.setStartAfter(t);
}
e(this);
},setEndAt:function(t,n){
switch(n){
case CKEDITOR.POSITION_AFTER_START:
this.setEnd(t,0);
break;
case CKEDITOR.POSITION_BEFORE_END:
t.type==CKEDITOR.NODE_TEXT?this.setEnd(t,t.getLength()):this.setEnd(t,t.getChildCount());
break;
case CKEDITOR.POSITION_BEFORE_START:
this.setEndBefore(t);
break;
case CKEDITOR.POSITION_AFTER_END:
this.setEndAfter(t);
}
e(this);
},fixBlock:function(e,t){
var n=this.createBookmark(),i=this.document.createElement(t);
this.collapse(e),this.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS),this.extractContents().appendTo(i),i.trim(),this.insertNode(i);
var o=i.getBogus();
return o&&o.remove(),i.appendBogus(),this.moveToBookmark(n),i;
},splitBlock:function(e,t){
var n=new CKEDITOR.dom.elementPath(this.startContainer,this.root),i=new CKEDITOR.dom.elementPath(this.endContainer,this.root),o=n.blockLimit,a=i.blockLimit,r=n.block,s=i.block,l=null;
if(!o.equals(a)){
return null;
}
"br"!=e&&(r||(r=this.fixBlock(!0,e),s=new CKEDITOR.dom.elementPath(this.endContainer,this.root).block),s||(s=this.fixBlock(!1,e)));
var d=r&&this.checkStartOfBlock(),c=s&&this.checkEndOfBlock();
return this.deleteContents(),r&&r.equals(s)&&(c?(l=new CKEDITOR.dom.elementPath(this.startContainer,this.root),this.moveToPosition(s,CKEDITOR.POSITION_AFTER_END),s=null):d?(l=new CKEDITOR.dom.elementPath(this.startContainer,this.root),this.moveToPosition(r,CKEDITOR.POSITION_BEFORE_START),r=null):(s=this.splitElement(r,t||!1),r.is("ul","ol")||r.appendBogus())),{previousBlock:r,nextBlock:s,wasStartOfBlock:d,wasEndOfBlock:c,elementPath:l};
},splitElement:function(e,t){
if(!this.collapsed){
return null;
}
this.setEndAt(e,CKEDITOR.POSITION_BEFORE_END);
var n=this.extractContents(!1,t||!1),i=e.clone(!1,t||!1);
return n.appendTo(i),i.insertAfter(e),this.moveToPosition(e,CKEDITOR.POSITION_AFTER_END),i;
},removeEmptyBlocksAtEnd:function(){
function e(e){
return function(i){
return t(i)||n(i)||i.type==CKEDITOR.NODE_ELEMENT&&i.isEmptyInlineRemoveable()?!1:e.is("table")&&i.is("caption")?!1:!0;
};
};
var t=CKEDITOR.dom.walker.whitespaces(),n=CKEDITOR.dom.walker.bookmark(!1);
return function(t){
for(var n,i=this.createBookmark(),o=this[t?"endPath":"startPath"](),a=o.block||o.blockLimit;a&&!a.equals(o.root)&&!a.getFirst(e(a));){
n=a.getParent(),this[t?"setEndAt":"setStartAt"](a,CKEDITOR.POSITION_AFTER_END),a.remove(1),a=n;
}
this.moveToBookmark(i);
};
}(),startPath:function(){
return new CKEDITOR.dom.elementPath(this.startContainer,this.root);
},endPath:function(){
return new CKEDITOR.dom.elementPath(this.endContainer,this.root);
},checkBoundaryOfElement:function(e,t){
var n=t==CKEDITOR.START,o=this.clone();
o.collapse(n),o[n?"setStartAt":"setEndAt"](e,n?CKEDITOR.POSITION_AFTER_START:CKEDITOR.POSITION_BEFORE_END);
var a=new CKEDITOR.dom.walker(o);
return a.evaluator=i(n),a[n?"checkBackward":"checkForward"]();
},checkStartOfBlock:function(){
var e=this.startContainer,t=this.startOffset;
if(CKEDITOR.env.ie&&t&&e.type==CKEDITOR.NODE_TEXT){
var i=CKEDITOR.tools.ltrim(e.substring(0,t));
s.test(i)&&this.trim(0,1);
}
this.trim();
var o=new CKEDITOR.dom.elementPath(this.startContainer,this.root),a=this.clone();
a.collapse(!0),a.setStartAt(o.block||o.blockLimit,CKEDITOR.POSITION_AFTER_START);
var r=new CKEDITOR.dom.walker(a);
return r.evaluator=n(),r.checkBackward();
},checkEndOfBlock:function(){
var e=this.endContainer,t=this.endOffset;
if(CKEDITOR.env.ie&&e.type==CKEDITOR.NODE_TEXT){
var i=CKEDITOR.tools.rtrim(e.substring(t));
s.test(i)&&this.trim(1,0);
}
this.trim();
var o=new CKEDITOR.dom.elementPath(this.endContainer,this.root),a=this.clone();
a.collapse(!1),a.setEndAt(o.block||o.blockLimit,CKEDITOR.POSITION_BEFORE_END);
var r=new CKEDITOR.dom.walker(a);
return r.evaluator=n(),r.checkForward();
},getPreviousNode:function(e,t,n){
var i=this.clone();
i.collapse(1),i.setStartAt(n||this.root,CKEDITOR.POSITION_AFTER_START);
var o=new CKEDITOR.dom.walker(i);
return o.evaluator=e,o.guard=t,o.previous();
},getNextNode:function(e,t,n){
var i=this.clone();
i.collapse(),i.setEndAt(n||this.root,CKEDITOR.POSITION_BEFORE_END);
var o=new CKEDITOR.dom.walker(i);
return o.evaluator=e,o.guard=t,o.next();
},checkReadOnly:function(){
function e(e,t){
for(;e;){
if(e.type==CKEDITOR.NODE_ELEMENT){
if("false"==e.getAttribute("contentEditable")&&!e.data("cke-editable")){
return 0;
}
if(e.is("html")||"true"==e.getAttribute("contentEditable")&&(e.contains(t)||e.equals(t))){
break;
}
}
e=e.getParent();
}
return 1;
};
return function(){
var t=this.startContainer,n=this.endContainer;
return !(e(t,n)&&e(n,t));
};
}(),moveToElementEditablePosition:function(e,t){
function n(e,n){
var i;
return e.type==CKEDITOR.NODE_ELEMENT&&e.isEditable(!1)&&(i=e[t?"getLast":"getFirst"](d)),n||i||(i=e[t?"getPrevious":"getNext"](d)),i;
};
if(e.type==CKEDITOR.NODE_ELEMENT&&!e.isEditable(!1)){
return this.moveToPosition(e,t?CKEDITOR.POSITION_AFTER_END:CKEDITOR.POSITION_BEFORE_START),!0;
}
for(var i=0;e;){
if(e.type==CKEDITOR.NODE_TEXT){
t&&this.endContainer&&this.checkEndOfBlock()&&s.test(e.getText())?this.moveToPosition(e,CKEDITOR.POSITION_BEFORE_START):this.moveToPosition(e,t?CKEDITOR.POSITION_AFTER_END:CKEDITOR.POSITION_BEFORE_START),i=1;
break;
}
if(e.type==CKEDITOR.NODE_ELEMENT){
if(e.isEditable()){
this.moveToPosition(e,t?CKEDITOR.POSITION_BEFORE_END:CKEDITOR.POSITION_AFTER_START),i=1;
}else{
if(t&&e.is("br")&&this.endContainer&&this.checkEndOfBlock()){
this.moveToPosition(e,CKEDITOR.POSITION_BEFORE_START);
}else{
if("false"==e.getAttribute("contenteditable")&&e.is(CKEDITOR.dtd.$block)){
return this.setStartBefore(e),this.setEndAfter(e),!0;
}
}
}
}
e=n(e,i);
}
return !!i;
},moveToClosestEditablePosition:function(e,t){
var n,i,o,a=0,r=[CKEDITOR.POSITION_AFTER_END,CKEDITOR.POSITION_BEFORE_START];
return e?(n=new CKEDITOR.dom.range(this.root),n.moveToPosition(e,r[t?0:1])):n=this.clone(),e&&!e.is(CKEDITOR.dtd.$block)?a=1:(i=n[t?"getNextEditableNode":"getPreviousEditableNode"](),i&&(a=1,o=i.type==CKEDITOR.NODE_ELEMENT,o&&i.is(CKEDITOR.dtd.$block)&&"false"==i.getAttribute("contenteditable")?(n.setStartAt(i,CKEDITOR.POSITION_BEFORE_START),n.setEndAt(i,CKEDITOR.POSITION_AFTER_END)):!CKEDITOR.env.needsBrFiller&&o&&i.is(CKEDITOR.dom.walker.validEmptyBlockContainers)?(n.setEnd(i,0),n.collapse()):n.moveToPosition(i,r[t?1:0]))),a&&this.moveToRange(n),!!a;
},moveToElementEditStart:function(e){
return this.moveToElementEditablePosition(e);
},moveToElementEditEnd:function(e){
return this.moveToElementEditablePosition(e,!0);
},getEnclosedNode:function(){
var e=this.clone();
if(e.optimize(),e.startContainer.type!=CKEDITOR.NODE_ELEMENT||e.endContainer.type!=CKEDITOR.NODE_ELEMENT){
return null;
}
var t=new CKEDITOR.dom.walker(e),n=CKEDITOR.dom.walker.bookmark(!1,!0),i=CKEDITOR.dom.walker.whitespaces(!0);
t.evaluator=function(e){
return i(e)&&n(e);
};
var o=t.next();
return t.reset(),o&&o.equals(t.previous())?o:null;
},getTouchedStartNode:function(){
var e=this.startContainer;
return this.collapsed||e.type!=CKEDITOR.NODE_ELEMENT?e:e.getChild(this.startOffset)||e;
},getTouchedEndNode:function(){
var e=this.endContainer;
return this.collapsed||e.type!=CKEDITOR.NODE_ELEMENT?e:e.getChild(this.endOffset-1)||e;
},getNextEditableNode:o(),getPreviousEditableNode:o(1),scrollIntoView:function(){
var e,t,n,i=new CKEDITOR.dom.element.createFromHtml("<span>&nbsp;</span>",this.document),o=this.clone();
o.optimize(),(n=o.startContainer.type==CKEDITOR.NODE_TEXT)?(t=o.startContainer.getText(),e=o.startContainer.split(o.startOffset),i.insertAfter(o.startContainer)):o.insertNode(i),i.scrollIntoView(),n&&(o.startContainer.setText(t),e.remove()),i.remove();
},_setStartContainer:function(e){
this.startContainer=e;
},_setEndContainer:function(e){
this.endContainer=e;
}};
}(),CKEDITOR.POSITION_AFTER_START=1,CKEDITOR.POSITION_BEFORE_END=2,CKEDITOR.POSITION_BEFORE_START=3,CKEDITOR.POSITION_AFTER_END=4,CKEDITOR.ENLARGE_ELEMENT=1,CKEDITOR.ENLARGE_BLOCK_CONTENTS=2,CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS=3,CKEDITOR.ENLARGE_INLINE=4,CKEDITOR.START=1,CKEDITOR.END=2,CKEDITOR.SHRINK_ELEMENT=1,CKEDITOR.SHRINK_TEXT=2,function(){
function e(e){
arguments.length<1||(this.range=e,this.forceBrBreak=0,this.enlargeBr=1,this.enforceRealBlocks=0,this._||(this._={}));
};
function t(){
var e,t=this.range.clone(),n=t.startPath(),i=t.endPath(),o=!t.collapsed&&r(t,n.block),a=!t.collapsed&&r(t,i.block,1);
if(t.shrink(CKEDITOR.SHRINK_ELEMENT,!0),o&&t.setStartAt(n.block,CKEDITOR.POSITION_BEFORE_END),a&&t.setEndAt(i.block,CKEDITOR.POSITION_AFTER_START),e=t.endContainer.hasAscendant("pre",!0)||t.startContainer.hasAscendant("pre",!0),t.enlarge(this.forceBrBreak&&!e||!this.enlargeBr?CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:CKEDITOR.ENLARGE_BLOCK_CONTENTS),!t.collapsed){
var s=new CKEDITOR.dom.walker(t.clone()),l=CKEDITOR.dom.walker.bookmark(!0,!0);
s.evaluator=l,this._.nextNode=s.next(),s=new CKEDITOR.dom.walker(t.clone()),s.evaluator=l;
var d=s.previous();
if(this._.lastNode=d.getNextSourceNode(!0,null,t.root),this._.lastNode&&this._.lastNode.type==CKEDITOR.NODE_TEXT&&!CKEDITOR.tools.trim(this._.lastNode.getText())&&this._.lastNode.getParent().isBlockBoundary()){
var c=this.range.clone();
if(c.moveToPosition(this._.lastNode,CKEDITOR.POSITION_AFTER_END),c.checkEndOfBlock()){
var u=new CKEDITOR.dom.elementPath(c.endContainer,c.root),h=u.block||u.blockLimit;
this._.lastNode=h.getNextSourceNode(!0);
}
}
this._.lastNode&&t.root.contains(this._.lastNode)||(this._.lastNode=this._.docEndMarker=t.document.createText(""),this._.lastNode.insertAfter(d)),t=null;
}
return this._.started=1,t;
};
function n(e,t){
null==t&&(t=o(e));
for(var n;n=t.shift();){
if(i(n)){
return {element:n,remaining:t};
}
}
return null;
};
function i(e){
return e.getDtd().p;
};
function o(e){
var t=[];
return e.forEach(function(e){
return "true"==e.getAttribute("contenteditable")?(t.push(e),!1):void 0;
},CKEDITOR.NODE_ELEMENT,!0),t;
};
function a(e,t,i,o){
var r=n(i,o);
if(!r){
return 0;
}
var s=CKEDITOR.filter.instances[r.element.data("cke-filter")];
if(s&&!s.check(t)){
return a(e,t,i,r.remaining);
}
var l=new CKEDITOR.dom.range(r.element);
l.selectNodeContents(r.element);
var d=l.createIterator();
return d.enlargeBr=e.enlargeBr,d.enforceRealBlocks=e.enforceRealBlocks,d.activeFilter=d.filter=s,e._.nestedEditable={element:r.element,container:i,remaining:r.remaining,iterator:d},1;
};
function r(e,t,n){
if(!t){
return !1;
}
var i=e.clone();
return i.collapse(!n),i.checkBoundaryOfElement(t,n?CKEDITOR.START:CKEDITOR.END);
};
var s=/^[\r\n\t ]+$/,l=CKEDITOR.dom.walker.bookmark(!1,!0),d=CKEDITOR.dom.walker.whitespaces(!0),c=function(e){
return l(e)&&d(e);
},u={dd:1,dt:1,li:1};
e.prototype={getNextParagraph:function(e){
var n,i,o,r,d;
if(e=e||"p",this._.nestedEditable){
if(n=this._.nestedEditable.iterator.getNextParagraph(e)){
return this.activeFilter=this._.nestedEditable.iterator.activeFilter,n;
}
if(this.activeFilter=this.filter,a(this,e,this._.nestedEditable.container,this._.nestedEditable.remaining)){
return this.activeFilter=this._.nestedEditable.iterator.activeFilter,this._.nestedEditable.iterator.getNextParagraph(e);
}
this._.nestedEditable=null;
}
if(!this.range.root.getDtd()[e]){
return null;
}
this._.started||(i=t.call(this));
var h=this._.nextNode,f=this._.lastNode;
for(this._.nextNode=null;h;){
var m=0,g=h.hasAscendant("pre"),p=h.type!=CKEDITOR.NODE_ELEMENT,E=0;
if(p){
h.type==CKEDITOR.NODE_TEXT&&s.test(h.getText())&&(p=0);
}else{
var T=h.getName();
if(CKEDITOR.dtd.$block[T]&&"false"==h.getAttribute("contenteditable")){
n=h,a(this,e,n);
break;
}
if(h.isBlockBoundary(this.forceBrBreak&&!g&&{br:1})){
if("br"==T){
p=1;
}else{
if(!i&&!h.getChildCount()&&"hr"!=T){
n=h,o=h.equals(f);
break;
}
}
i&&(i.setEndAt(h,CKEDITOR.POSITION_BEFORE_START),"br"!=T&&(this._.nextNode=h)),m=1;
}else{
if(h.getFirst()){
i||(i=this.range.clone(),i.setStartAt(h,CKEDITOR.POSITION_BEFORE_START)),h=h.getFirst();
continue;
}
p=1;
}
}
if(p&&!i&&(i=this.range.clone(),i.setStartAt(h,CKEDITOR.POSITION_BEFORE_START)),o=(!m||p)&&h.equals(f),i&&!m){
for(;!h.getNext(c)&&!o;){
var C=h.getParent();
if(C.isBlockBoundary(this.forceBrBreak&&!g&&{br:1})){
m=1,p=0,o=o||C.equals(f),i.setEndAt(C,CKEDITOR.POSITION_BEFORE_END);
break;
}
h=C,p=1,o=h.equals(f),E=1;
}
}
if(p&&i.setEndAt(h,CKEDITOR.POSITION_AFTER_END),h=this._getNextSourceNode(h,E,f),o=!h,o||m&&i){
break;
}
}
if(!n){
if(!i){
return this._.docEndMarker&&this._.docEndMarker.remove(),this._.nextNode=null,null;
}
var v=new CKEDITOR.dom.elementPath(i.startContainer,i.root),I=v.blockLimit,O={div:1,th:1,td:1};
if(n=v.block,!n&&I&&!this.enforceRealBlocks&&O[I.getName()]&&i.checkStartOfBlock()&&i.checkEndOfBlock()&&!I.equals(i.root)){
n=I;
}else{
if(!n||this.enforceRealBlocks&&n.is(u)){
n=this.range.document.createElement(e),i.extractContents().appendTo(n),n.trim(),i.insertNode(n),r=d=!0;
}else{
if("li"!=n.getName()){
if(!i.checkStartOfBlock()||!i.checkEndOfBlock()){
n=n.clone(!1),i.extractContents().appendTo(n),n.trim();
var D=i.splitBlock();
r=!D.wasStartOfBlock,d=!D.wasEndOfBlock,i.insertNode(n);
}
}else{
o||(this._.nextNode=n.equals(f)?null:this._getNextSourceNode(i.getBoundaryNodes().endNode,1,f));
}
}
}
}
if(r){
var b=n.getPrevious();
b&&b.type==CKEDITOR.NODE_ELEMENT&&("br"==b.getName()?b.remove():b.getLast()&&"br"==b.getLast().$.nodeName.toLowerCase()&&b.getLast().remove());
}
if(d){
var R=n.getLast();
R&&R.type==CKEDITOR.NODE_ELEMENT&&"br"==R.getName()&&(!CKEDITOR.env.needsBrFiller||R.getPrevious(l)||R.getNext(l))&&R.remove();
}
return this._.nextNode||(this._.nextNode=o||n.equals(f)||!f?null:this._getNextSourceNode(n,1,f)),n;
},_getNextSourceNode:function(e,t,n){
function i(e){
return !(e.equals(n)||e.equals(a));
};
var o,a=this.range.root;
for(o=e.getNextSourceNode(t,null,i);!l(o);){
o=o.getNextSourceNode(t,null,i);
}
return o;
}},CKEDITOR.dom.range.prototype.createIterator=function(){
return new e(this);
};
}(),CKEDITOR.command=function(e,t){
this.uiItems=[],this.exec=function(n){
return this.state!=CKEDITOR.TRISTATE_DISABLED&&this.checkAllowed()?(this.editorFocus&&e.focus(),this.fire("exec")===!1?!0:t.exec.call(this,e,n)!==!1):!1;
},this.refresh=function(e,n){
return !this.readOnly&&e.readOnly?!0:this.context&&!n.isContextFor(this.context)?(this.disable(),!0):this.checkAllowed(!0)?(this.startDisabled||this.enable(),this.modes&&!this.modes[e.mode]&&this.disable(),this.fire("refresh",{editor:e,path:n})===!1?!0:t.refresh&&t.refresh.apply(this,arguments)!==!1):(this.disable(),!0);
};
var n;
this.checkAllowed=function(t){
return t||"boolean"!=typeof n?n=e.activeFilter.checkFeature(this):n;
},CKEDITOR.tools.extend(this,t,{modes:{wysiwyg:1},editorFocus:1,contextSensitive:!!t.context,state:CKEDITOR.TRISTATE_DISABLED}),CKEDITOR.event.call(this);
},CKEDITOR.command.prototype={enable:function(){
this.state==CKEDITOR.TRISTATE_DISABLED&&this.checkAllowed()&&this.setState(this.preserveState&&"undefined"!=typeof this.previousState?this.previousState:CKEDITOR.TRISTATE_OFF);
},disable:function(){
this.setState(CKEDITOR.TRISTATE_DISABLED);
},setState:function(e){
return this.state==e?!1:e==CKEDITOR.TRISTATE_DISABLED||this.checkAllowed()?(this.previousState=this.state,this.state=e,this.fire("state"),!0):!1;
},toggleState:function(){
this.state==CKEDITOR.TRISTATE_OFF?this.setState(CKEDITOR.TRISTATE_ON):this.state==CKEDITOR.TRISTATE_ON&&this.setState(CKEDITOR.TRISTATE_OFF);
}},CKEDITOR.event.implementOn(CKEDITOR.command.prototype),CKEDITOR.ENTER_P=1,CKEDITOR.ENTER_BR=2,CKEDITOR.ENTER_DIV=3,CKEDITOR.config={customConfig:"config.js",autoUpdateElement:!0,language:"",defaultLanguage:"en",contentsLangDirection:"",enterMode:CKEDITOR.ENTER_P,forceEnterMode:!1,shiftEnterMode:CKEDITOR.ENTER_BR,docType:"<!DOCTYPE html>",bodyId:"",bodyClass:"",fullPage:!1,height:200,contentsCss:CKEDITOR.getUrl("contents.css"),extraPlugins:"",removePlugins:"",protectedSource:[],tabIndex:0,width:"",baseFloatZIndex:10000,blockedKeystrokes:[CKEDITOR.CTRL+66,CKEDITOR.CTRL+73,CKEDITOR.CTRL+85]},function(){
"use strict";
function e(e,t,n,i,o){
var a,r,s=[];
for(a in t){
r=t[a],r="boolean"==typeof r?{}:"function"==typeof r?{match:r}:Y(r),"$"!=a.charAt(0)&&(r.elements=a),n&&(r.featureName=n.toLowerCase()),K(r),i.push(r),s.push(r);
}
v(o,s);
};
function t(e,t,o,a){
(!e.match||e.match(t))&&(a||f(e,t))&&(e.propertiesOnly||(o.valid=!0),o.allAttributes||(o.allAttributes=i(e.attributes,t.attributes,o.validAttributes)),o.allStyles||(o.allStyles=i(e.styles,t.styles,o.validStyles)),o.allClasses||(o.allClasses=n(e.classes,t.classes,o.validClasses)));
};
function n(e,t,n){
if(!e){
return !1;
}
if(e===!0){
return !0;
}
for(var i,o=0,a=t.length;a>o;++o){
i=t[o],n[i]||(n[i]=e(i));
}
return !1;
};
function i(e,t,n){
if(!e){
return !1;
}
if(e===!0){
return !0;
}
for(var i in t){
n[i]||(n[i]=e(i));
}
return !1;
};
function o(e,t,n){
if(!e.match||e.match(t)){
if(e.noProperties){
return !1;
}
n.hadInvalidAttribute=r(e.attributes,t.attributes)||n.hadInvalidAttribute,n.hadInvalidStyle=r(e.styles,t.styles)||n.hadInvalidStyle,n.hadInvalidClass=a(e.classes,t.classes)||n.hadInvalidClass;
}
};
function a(e,t){
if(!e){
return !1;
}
for(var n=!1,i=e===!0,o=t.length;o--;){
(i||e(t[o]))&&(t.splice(o,1),n=!0);
}
return n;
};
function r(e,t){
if(!e){
return !1;
}
var n=!1,i=e===!0;
for(var o in t){
(i||e(o))&&(delete t[o],n=!0);
}
return n;
};
function s(e,t,n){
return e.disabled?!1:e.customConfig&&!n?!1:t?(e._.cachedChecks={},!0):!1;
};
function l(e){
var t,n=e.getDefinition(),i={},o=n.attributes;
return i[n.element]=t={styles:n.styles,requiredStyles:n.styles&&CKEDITOR.tools.objectKeys(n.styles)},o&&(o=Y(o),t.classes=o["class"]?o["class"].split(/\s+/):null,t.requiredClasses=t.classes,delete o["class"],t.attributes=o,t.requiredAttributes=o&&CKEDITOR.tools.objectKeys(o)),i;
};
function d(e,t){
if(!e){
return !1;
}
if(e===!0){
return e;
}
if("string"==typeof e){
return e=J(e),"*"==e?!0:CKEDITOR.tools.convertArrayToObject(e.split(t));
}
if(CKEDITOR.tools.isArray(e)){
return e.length?CKEDITOR.tools.convertArrayToObject(e):!1;
}
var n={},i=0;
for(var o in e){
n[o]=e[o],i++;
}
return i?n:!1;
};
function c(e,t){
for(var n,i=0,o=t.length;o>i;++i){
if(n=t[i](e)){
return n;
}
}
};
function u(e,t){
var n,i=[],o=!0;
e?o=!1:e={};
for(n in t){
"!"==n.charAt(0)&&(n=n.slice(1),i.push(n),e[n]=!0,o=!1);
}
for(;n=i.pop();){
t[n]=t["!"+n],delete t["!"+n];
}
return o?!1:e;
};
function h(e,n,i){
var a,r,s=n.name,l=e._,d=l.allowedRules.elements[s],c=l.allowedRules.generic,u=l.disallowedRules.elements[s],h=l.disallowedRules.generic,f=i.skipRequired,m={valid:!1,validAttributes:{},validClasses:{},validStyles:{},allAttributes:!1,allClasses:!1,allStyles:!1,hadInvalidAttribute:!1,hadInvalidClass:!1,hadInvalidStyle:!1};
if(!d&&!c){
return null;
}
if(D(n),u){
for(a=0,r=u.length;r>a;++a){
if(o(u[a],n,m)===!1){
return null;
}
}
}
if(h){
for(a=0,r=h.length;r>a;++a){
o(h[a],n,m);
}
}
if(d){
for(a=0,r=d.length;r>a;++a){
t(d[a],n,m,f);
}
}
if(c){
for(a=0,r=c.length;r>a;++a){
t(c[a],n,m,f);
}
}
return m;
};
function f(e,t){
if(e.nothingRequired){
return !0;
}
var n,i,o,a;
if(o=e.requiredClasses){
for(a=t.classes,n=0;n<o.length;++n){
if(i=o[n],"string"==typeof i){
if(-1==CKEDITOR.tools.indexOf(a,i)){
return !1;
}
}else{
if(!CKEDITOR.tools.checkIfAnyArrayItemMatches(a,i)){
return !1;
}
}
}
}
return m(t.styles,e.requiredStyles)&&m(t.attributes,e.requiredAttributes);
};
function m(e,t){
if(!t){
return !0;
}
for(var n,i=0;i<t.length;++i){
if(n=t[i],"string"==typeof n){
if(!(n in e)){
return !1;
}
}else{
if(!CKEDITOR.tools.checkIfAnyObjectPropertyMatches(e,n)){
return !1;
}
}
}
return !0;
};
function g(e){
var t=I(e).$1,n=t.styles,i=t.classes;
return t.name=t.elements,t.classes=i=i?i.split(/\s*,\s*/):[],t.styles=E(n),t.attributes=E(t.attributes),t.children=[],i.length&&(t.attributes["class"]=i.join(" ")),n&&(t.attributes.style=CKEDITOR.tools.writeCssText(t.styles)),t;
};
function p(e){
var t=e.getDefinition(),n=t.styles,i=t.attributes||{};
n?(n=Y(n),i.style=CKEDITOR.tools.writeCssText(n,!0)):n={};
var o={name:t.element,attributes:i,classes:i["class"]?i["class"].split(/\s+/):[],styles:n,children:[]};
return o;
};
function E(e){
if(!e){
return {};
}
for(var t=e.split(/\s*,\s*/).sort(),n={};t.length;){
n[t.shift()]=Z;
}
return n;
};
function T(e){
var t=[];
for(var n in e){
n.indexOf("*")>-1?t.push(new RegExp("^"+n.replace(/\*/g,".*")+"$")):t.push(n);
}
return t;
};
function C(e){
var t,n,i;
for(t in ee){
e[t]=x(e[t]);
}
var o=!0;
for(i in te){
t=te[i],n=T(e[t]),n.length&&(e[t]=n,o=!1);
}
e.nothingRequired=o,e.noProperties=!(e.attributes||e.classes||e.styles);
};
function v(e,t){
var n,i,o,a,r,s=e.elements,l=e.generic;
for(n=0,i=t.length;i>n;++n){
if(o=Y(t[n]),r=o.classes===!0||o.styles===!0||o.attributes===!0,C(o),o.elements===!0||null===o.elements){
l[r?"unshift":"push"](o);
}else{
var d=o.elements;
delete o.elements;
for(a in d){
s[a]?s[a][r?"unshift":"push"](o):s[a]=[o];
}
}
}
};
function I(e){
var t,n,i,o,a,r={},s=1;
for(e=J(e);t=e.match(ne);){
(n=t[2])?(i=O(n,"styles"),o=O(n,"attrs"),a=O(n,"classes")):i=o=a=null,r["$"+s++]={elements:t[1],classes:a,styles:i,attributes:o},e=e.slice(t[0].length);
}
return r;
};
function O(e,t){
var n=e.match(ie[t]);
return n?J(n[1]):null;
};
function D(e){
var t=e.styleBackup=e.attributes.style,n=e.classBackup=e.attributes["class"];
e.styles||(e.styles=CKEDITOR.tools.parseCssText(t||"",1)),e.classes||(e.classes=n?n.split(/\s+/):[]);
};
function b(e,t,n,i){
var o,a,r,s,l=decodeURIComponent(t.value.replace(/^\{cke_protected\}/,"")),d=[];
if(n){
for(r=0;r<n.length;++r){
if((s=l.match(n[r]))&&s[0].length==l.length){
return !0;
}
}
}
return o=CKEDITOR.htmlParser.fragment.fromHtml(l),1==o.children.length&&(a=o.children[0]).type==CKEDITOR.NODE_ELEMENT&&R(e,a,d,i),!d.length;
};
function R(e,t,n,i){
var o,a,r=0;
if(i.toHtml&&(t.name=t.name.replace(oe,"$1")),i.doCallbacks&&e.elementCallbacks&&(a=c(t,e.elementCallbacks))){
return a;
}
if(i.doTransform&&_a(e,t),i.doFilter){
if(o=h(e,t,i),!o){
return n.push(t),G;
}
if(!o.valid){
return n.push(t),G;
}
if(w(t,o)&&(r=G),!i.skipFinalValidation&&!S(t)){
return n.push(t),G;
}
}
return i.toHtml&&(t.name=t.name.replace(ae,"cke:$1")),r;
};
function y(e){
var t,n=[];
for(t in e){
t.indexOf("*")>-1&&n.push(t.replace(/\*/g,".*"));
}
return n.length?new RegExp("^(?:"+n.join("|")+")$"):null;
};
function K(e){
e.elements=d(e.elements,/\s+/)||null,e.propertiesOnly=e.propertiesOnly||e.elements===!0;
var t,n=/\s*,\s*/;
for(t in ee){
e[t]=d(e[t],n)||null,e[te[t]]=u(d(e[te[t]],n),e[t])||null;
}
e.match=e.match||null;
};
function _a(e,t){
var n,i=e._.transformations[t.name];
if(i){
for(D(t),n=0;n<i.length;++n){
$(e,t,i[n]);
}
k(t);
}
};
function k(e){
var t,n=e.attributes;
delete n.style,delete n["class"],(t=CKEDITOR.tools.writeCssText(e.styles,!0))&&(n.style=t),e.classes.length&&(n["class"]=e.classes.sort().join(" "));
};
function w(e,t){
var n,i,o,a=t.validAttributes,r=t.validStyles,s=t.validClasses,l=e.attributes,d=e.styles,c=e.classes,u=e.classBackup,h=e.styleBackup,f=[],m=[],g=/^data-cke-/,p=!1;
if(delete l.style,delete l["class"],delete e.classBackup,delete e.styleBackup,!t.allAttributes){
for(n in l){
a[n]||(g.test(n)?n==(i=n.replace(/^data-cke-saved-/,""))||a[i]||(delete l[n],p=!0):(delete l[n],p=!0));
}
}
if(!t.allStyles||t.hadInvalidStyle){
for(n in d){
t.allStyles||r[n]?f.push(n+":"+d[n]):p=!0;
}
f.length&&(l.style=f.sort().join("; "));
}else{
h&&(l.style=h);
}
if(!t.allClasses||t.hadInvalidClass){
for(o=0;o<c.length;++o){
(t.allClasses||s[c[o]])&&m.push(c[o]);
}
m.length&&(l["class"]=m.sort().join(" ")),u&&m.length<u.split(/\s+/).length&&(p=!0);
}else{
u&&(l["class"]=u);
}
return p;
};
function S(e){
switch(e.name){
case "a":
if(!(e.children.length||e.attributes.name||e.attributes.id)){
return !1;
}
break;
case "img":
if(!e.attributes.src){
return !1;
}
}
return !0;
};
function x(e){
if(!e){
return !1;
}
if(e===!0){
return !0;
}
var t=y(e);
return function(n){
return n in e||t&&n.match(t);
};
};
function N(e,t){
for(var n,i=W[t],o=0,a=e.length;a>o;++o){
if(n=e[o],n.type==CKEDITOR.NODE_ELEMENT&&!i[n.name]){
return !1;
}
}
return !0;
};
function A(){
return new CKEDITOR.htmlParser.element("br");
};
function L(e){
return e.type==CKEDITOR.NODE_TEXT||e.type==CKEDITOR.NODE_ELEMENT&&W.$inline[e.name];
};
function P(e){
return e.type==CKEDITOR.NODE_ELEMENT&&("br"==e.name||W.$block[e.name]);
};
function B(e,t,n){
var i=e.name;
W.$empty[i]||!e.children.length?"hr"==i&&"br"==t?e.replaceWith(A()):(e.parent&&n.push({check:"it",el:e.parent}),e.remove()):W.$block[i]||"tr"==i?"br"==t?M(e,n):F(e,t,n):i in {style:1,script:1}?e.remove():(e.parent&&n.push({check:"it",el:e.parent}),e.replaceWithChildren());
};
function F(e,t,n){
var i=e.children;
if(N(i,t)){
return e.name=t,e.attributes={},void n.push({check:"parent-down",el:e});
}
var o,a,r,s,l=e.parent,d=l.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT||"body"==l.name;
for(o=i.length;o>0;){
a=i[--o],d&&L(a)?(r||(r=new CKEDITOR.htmlParser.element(t),r.insertAfter(e),n.push({check:"parent-down",el:r})),r.add(a,0)):(r=null,s=W[l.name]||W.span,a.insertAfter(e),l.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT||a.type!=CKEDITOR.NODE_ELEMENT||s[a.name]||n.push({check:"el-up",el:a}));
}
e.remove();
};
function M(e){
var t;
e.previous&&!P(e.previous)&&(t=A(),t.insertBefore(e)),e.next&&!P(e.next)&&(t=A(),t.insertAfter(e)),e.replaceWithChildren();
};
function $(e,t,n){
var i,o;
for(i=0;i<n.length;++i){
if(o=n[i],(!o.check||e.check(o.check,!1))&&(!o.left||o.left(t))){
return void o.right(t,re);
}
}
};
function H(e,t){
var n,i,o,a,r,s=t.getDefinition(),l=s.attributes,d=s.styles;
if(e.name!=s.element){
return !1;
}
for(n in l){
if("class"==n){
for(o=l[n].split(/\s+/),a=e.classes.join("|");r=o.pop();){
if(-1==a.indexOf(r)){
return !1;
}
}
}else{
if(e.attributes[n]!=l[n]){
return !1;
}
}
}
for(i in d){
if(e.styles[i]!=d[i]){
return !1;
}
}
return !0;
};
function q(e,t){
var n,i;
return "string"==typeof e?n=e:e instanceof CKEDITOR.style?i=e:(n=e[0],i=e[1]),[{element:n,left:i,right:function(e,n){
n.transform(e,t);
}}];
};
function z(e,t){
return e.element?e.element:t?t.match(/^([a-z0-9]+)/i)[0]:e.left.getDefinition().element;
};
function V(e){
return function(t){
return H(t,e);
};
};
function j(e){
return function(t,n){
n[e](t);
};
};
function U(e){
var t,n,i,o,a,r,s=[];
for(n=0;n<e.length;++n){
i=e[n],"string"==typeof i?(i=i.split(/\s*:\s*/),o=i[0],a=null,r=i[1]):(o=i.check,a=i.left,r=i.right),t||(t=z(i,o)),a instanceof CKEDITOR.style&&(a=V(a)),s.push({check:o==t?null:o,left:a,right:"string"==typeof r?j(r):r});
}
return {name:t,rules:s};
};
var W=CKEDITOR.dtd,G=1,X=2,Y=CKEDITOR.tools.copy,J=CKEDITOR.tools.trim,Z="cke-test",Q=["","p","br","div"];
CKEDITOR.FILTER_SKIP_TREE=X,CKEDITOR.filter=function(e){
if(this.allowedContent=[],this.disallowedContent=[],this.elementCallbacks=null,this.disabled=!1,this.editor=null,this.id=CKEDITOR.tools.getNextNumber(),this._={allowedRules:{elements:{},generic:[]},disallowedRules:{elements:{},generic:[]},transformations:{},cachedTests:{}},CKEDITOR.filter.instances[this.id]=this,e instanceof CKEDITOR.editor){
var t=this.editor=e;
this.customConfig=!0;
var n=t.config.allowedContent;
if(n===!0){
return void (this.disabled=!0);
}
n||(this.customConfig=!1),this.allow(n,"config",1),this.allow(t.config.extraAllowedContent,"extra",1),this.allow(Q[t.enterMode]+" "+Q[t.shiftEnterMode],"default",1),this.disallow(t.config.disallowedContent);
}else{
this.customConfig=!1,this.allow(e,"default",1);
}
},CKEDITOR.filter.instances={},CKEDITOR.filter.prototype={allow:function(t,n,i){
if(!s(this,t,i)){
return !1;
}
var o,a;
if("string"==typeof t){
t=I(t);
}else{
if(t instanceof CKEDITOR.style){
if(t.toAllowedContentRules){
return this.allow(t.toAllowedContentRules(this.editor),n,i);
}
t=l(t);
}else{
if(CKEDITOR.tools.isArray(t)){
for(o=0;o<t.length;++o){
a=this.allow(t[o],n,i);
}
return a;
}
}
}
return e(this,t,n,this.allowedContent,this._.allowedRules),!0;
},applyTo:function(e,t,n,i){
if(this.disabled){
return !1;
}
var o,a=this,r=[],s=this.editor&&this.editor.config.protectedSource,l=!1,d={doFilter:!n,doTransform:!0,doCallbacks:!0,toHtml:t};
e.forEach(function(e){
if(e.type==CKEDITOR.NODE_ELEMENT){
if("off"==e.attributes["data-cke-filter"]){
return !1;
}
if(t&&"span"==e.name&&~CKEDITOR.tools.objectKeys(e.attributes).join("|").indexOf("data-cke-")){
return;
}
if(o=R(a,e,r,d),o&G){
l=!0;
}else{
if(o&X){
return !1;
}
}
}else{
e.type==CKEDITOR.NODE_COMMENT&&e.value.match(/^\{cke_protected\}(?!\{C\})/)&&(b(a,e,s,d)||r.push(e));
}
},null,!0),r.length&&(l=!0);
for(var c,u,h,f,m=[],g=Q[i||(this.editor?this.editor.enterMode:CKEDITOR.ENTER_P)];c=r.pop();){
c.type==CKEDITOR.NODE_ELEMENT?B(c,g,m):c.remove();
}
for(;h=m.pop();){
if(u=h.el,u.parent){
switch(f=W[u.parent.name]||W.span,h.check){
case "it":
W.$removeEmpty[u.name]&&!u.children.length?B(u,g,m):S(u)||B(u,g,m);
break;
case "el-up":
u.parent.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT||f[u.name]||B(u,g,m);
break;
case "parent-down":
u.parent.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT||f[u.name]||B(u.parent,g,m);
}
}
}
return l;
},checkFeature:function(e){
return this.disabled?!0:e?(e.toFeature&&(e=e.toFeature(this.editor)),!e.requiredContent||this.check(e.requiredContent)):!0;
},disable:function(){
this.disabled=!0;
},disallow:function(t){
return s(this,t,!0)?("string"==typeof t&&(t=I(t)),e(this,t,null,this.disallowedContent,this._.disallowedRules),!0):!1;
},addContentForms:function(e){
if(!this.disabled&&e){
var t,n,i,o=[];
for(t=0;t<e.length&&!i;++t){
n=e[t],("string"==typeof n||n instanceof CKEDITOR.style)&&this.check(n)&&(i=n);
}
if(i){
for(t=0;t<e.length;++t){
o.push(q(e[t],i));
}
this.addTransformations(o);
}
}
},addElementCallback:function(e){
this.elementCallbacks||(this.elementCallbacks=[]),this.elementCallbacks.push(e);
},addFeature:function(e){
return this.disabled?!0:e?(e.toFeature&&(e=e.toFeature(this.editor)),this.allow(e.allowedContent,e.name),this.addTransformations(e.contentTransformations),this.addContentForms(e.contentForms),e.requiredContent&&(this.customConfig||this.disallowedContent.length)?this.check(e.requiredContent):!0):!0;
},addTransformations:function(e){
if(!this.disabled&&e){
var t,n,i=this._.transformations;
for(n=0;n<e.length;++n){
t=U(e[n]),i[t.name]||(i[t.name]=[]),i[t.name].push(t.rules);
}
}
},check:function(e,t,n){
if(this.disabled){
return !0;
}
if(CKEDITOR.tools.isArray(e)){
for(var i=e.length;i--;){
if(this.check(e[i],t,n)){
return !0;
}
}
return !1;
}
var o,a,r;
if("string"==typeof e){
if(r=e+"<"+(t===!1?"0":"1")+(n?"1":"0")+">",r in this._.cachedChecks){
return this._.cachedChecks[r];
}
o=g(e);
}else{
o=p(e);
}
var s,l=CKEDITOR.tools.clone(o),d=[];
if(t!==!1&&(s=this._.transformations[o.name])){
for(i=0;i<s.length;++i){
$(this,o,s[i]);
}
k(o);
}
return R(this,l,d,{doFilter:!0,doTransform:t!==!1,skipRequired:!n,skipFinalValidation:!n}),a=d.length>0?!1:CKEDITOR.tools.objectCompare(o.attributes,l.attributes,!0)?!0:!1,"string"==typeof e&&(this._.cachedChecks[r]=a),a;
},getAllowedEnterMode:function(){
var e=["p","div","br"],t={p:CKEDITOR.ENTER_P,div:CKEDITOR.ENTER_DIV,br:CKEDITOR.ENTER_BR};
return function(n,i){
var o,a=e.slice();
if(this.check(Q[n])){
return n;
}
for(i||(a=a.reverse());o=a.pop();){
if(this.check(o)){
return t[o];
}
}
return CKEDITOR.ENTER_BR;
};
}(),destroy:function(){
delete CKEDITOR.filter.instances[this.id],delete this._,delete this.allowedContent,delete this.disallowedContent;
}};
var ee={styles:1,attributes:1,classes:1},te={styles:"requiredStyles",attributes:"requiredAttributes",classes:"requiredClasses"},ne=/^([a-z0-9\-*\s]+)((?:\s*\{[!\w\-,\s\*]+\}\s*|\s*\[[!\w\-,\s\*]+\]\s*|\s*\([!\w\-,\s\*]+\)\s*){0,3})(?:;\s*|$)/i,ie={styles:/{([^}]+)}/,attrs:/\[([^\]]+)\]/,classes:/\(([^\)]+)\)/},oe=/^cke:(object|embed|param)$/,ae=/^(object|embed|param)$/,re=CKEDITOR.filter.transformationsTools={sizeToStyle:function(e){
this.lengthToStyle(e,"width"),this.lengthToStyle(e,"height");
},sizeToAttribute:function(e){
this.lengthToAttribute(e,"width"),this.lengthToAttribute(e,"height");
},lengthToStyle:function(e,t,n){
if(n=n||t,!(n in e.styles)){
var i=e.attributes[t];
i&&(/^\d+$/.test(i)&&(i+="px"),e.styles[n]=i);
}
delete e.attributes[t];
},lengthToAttribute:function(e,t,n){
if(n=n||t,!(n in e.attributes)){
var i=e.styles[t],o=i&&i.match(/^(\d+)(?:\.\d*)?px$/);
o?e.attributes[n]=o[1]:i==Z&&(e.attributes[n]=Z);
}
delete e.styles[t];
},alignmentToStyle:function(e){
if(!("float" in e.styles)){
var t=e.attributes.align;
("left"==t||"right"==t)&&(e.styles["float"]=t);
}
delete e.attributes.align;
},alignmentToAttribute:function(e){
if(!("align" in e.attributes)){
var t=e.styles["float"];
("left"==t||"right"==t)&&(e.attributes.align=t);
}
delete e.styles["float"];
},matchesStyle:H,transform:function(e,t){
if("string"==typeof t){
e.name=t;
}else{
var n,i,o,a,r,s=t.getDefinition(),l=s.styles,d=s.attributes;
e.name=s.element;
for(n in d){
if("class"==n){
for(o=e.classes.join("|"),a=d[n].split(/\s+/);r=a.pop();){
-1==o.indexOf(r)&&e.classes.push(r);
}
}else{
e.attributes[n]=d[n];
}
}
for(i in l){
e.styles[i]=l[i];
}
}
}};
}(),function(){
CKEDITOR.focusManager=function(e){
return e.focusManager?e.focusManager:(this.hasFocus=!1,this.currentActive=null,this._={editor:e},this);
};
var e="focusmanager",t="focusmanager_handlers";
CKEDITOR.focusManager._={blurDelay:200},CKEDITOR.focusManager.prototype={focus:function(e){
if(this._.timer&&clearTimeout(this._.timer),e&&(this.currentActive=e),!this.hasFocus&&!this._.locked){
var t=CKEDITOR.currentInstance;
t&&t.focusManager.blur(1),this.hasFocus=!0;
var n=this._.editor.container;
n&&n.addClass("cke_focus"),this._.editor.fire("focus");
}
},lock:function(){
this._.locked=1;
},unlock:function(){
delete this._.locked;
},blur:function(e){
function t(){
if(this.hasFocus){
this.hasFocus=!1;
var e=this._.editor.container;
e&&e.removeClass("cke_focus"),this._.editor.fire("blur");
}
};
if(!this._.locked){
this._.timer&&clearTimeout(this._.timer);
var n=CKEDITOR.focusManager._.blurDelay;
e||!n?t.call(this):this._.timer=CKEDITOR.tools.setTimeout(function(){
delete this._.timer,t.call(this);
},n,this);
}
},add:function(n,i){
var o=n.getCustomData(e);
if(!o||o!=this){
o&&o.remove(n);
var a="focus",r="blur";
i&&(CKEDITOR.env.ie?(a="focusin",r="focusout"):CKEDITOR.event.useCapture=1);
var s={blur:function(){
n.equals(this.currentActive)&&this.blur();
},focus:function(){
this.focus(n);
}};
n.on(a,s.focus,this),n.on(r,s.blur,this),i&&(CKEDITOR.event.useCapture=0),n.setCustomData(e,this),n.setCustomData(t,s);
}
},remove:function(n){
n.removeCustomData(e);
var i=n.removeCustomData(t);
n.removeListener("blur",i.blur),n.removeListener("focus",i.focus);
}};
}(),CKEDITOR.keystrokeHandler=function(e){
return e.keystrokeHandler?e.keystrokeHandler:(this.keystrokes={},this.blockedKeystrokes={},this._={editor:e},this);
},function(){
var e,t=function(t){
t=t.data;
var n=t.getKeystroke(),i=this.keystrokes[n],o=this._.editor;
if(e=o.fire("key",{keyCode:n,domEvent:t})===!1,!e){
if(i){
var a={from:"keystrokeHandler"};
e=o.execCommand(i,a)!==!1;
}
e||(e=!!this.blockedKeystrokes[n]);
}
return e&&t.preventDefault(!0),!e;
},n=function(t){
e&&(e=!1,t.data.preventDefault(!0));
};
CKEDITOR.keystrokeHandler.prototype={attach:function(e){
e.on("keydown",t,this),CKEDITOR.env.gecko&&CKEDITOR.env.mac&&e.on("keypress",n,this);
}};
}(),function(){
CKEDITOR.lang={languages:{af:1,ar:1,bg:1,bn:1,bs:1,ca:1,cs:1,cy:1,da:1,de:1,el:1,"en-au":1,"en-ca":1,"en-gb":1,en:1,eo:1,es:1,et:1,eu:1,fa:1,fi:1,fo:1,"fr-ca":1,fr:1,gl:1,gu:1,he:1,hi:1,hr:1,hu:1,id:1,is:1,it:1,ja:1,ka:1,km:1,ko:1,ku:1,lt:1,lv:1,mk:1,mn:1,ms:1,nb:1,nl:1,no:1,pl:1,"pt-br":1,pt:1,ro:1,ru:1,si:1,sk:1,sl:1,sq:1,"sr-latn":1,sr:1,sv:1,th:1,tr:1,tt:1,ug:1,uk:1,vi:1,"zh-cn":1,zh:1},rtl:{ar:1,fa:1,he:1,ku:1,ug:1},load:function(e,t,n){
e&&CKEDITOR.lang.languages[e]||(e=this.detect(t,e));
var i=this,o=function(){
i[e].dir=i.rtl[e]?"rtl":"ltr",n(e,i[e]);
};
this[e]?o():CKEDITOR.scriptLoader.load(CKEDITOR.getUrl("lang/"+e+".js"),o,this);
},detect:function(e,t){
var n=this.languages;
t=t||navigator.userLanguage||navigator.language||e;
var i=t.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/),o=i[1],a=i[2];
return n[o+"-"+a]?o=o+"-"+a:n[o]||(o=null),CKEDITOR.lang.detect=o?function(){
return o;
}:function(e){
return e;
},o||e;
}};
}(),CKEDITOR.scriptLoader=function(){
var e={},t={};
return {load:function(n,i,o,a){
var r="string"==typeof n;
r&&(n=[n]),o||(o=CKEDITOR);
var s=n.length,l=[],d=[],c=function(e){
i&&(r?i.call(o,e):i.call(o,l,d));
};
if(0===s){
return void c(!0);
}
var u=function(e,t){
(t?l:d).push(e),--s<=0&&(a&&CKEDITOR.document.getDocumentElement().removeStyle("cursor"),c(t));
},h=function(n,i){
e[n]=1;
var o=t[n];
delete t[n];
for(var a=0;a<o.length;a++){
o[a](n,i);
}
},f=function(n){
if(e[n]){
return void u(n,!0);
}
var o=t[n]||(t[n]=[]);
if(o.push(u),!(o.length>1)){
var a=new CKEDITOR.dom.element("script");
a.setAttributes({type:"text/javascript",src:n}),i&&(CKEDITOR.env.ie&&CKEDITOR.env.version<11?a.$.onreadystatechange=function(){
("loaded"==a.$.readyState||"complete"==a.$.readyState)&&(a.$.onreadystatechange=null,h(n,!0));
}:(a.$.onload=function(){
setTimeout(function(){
h(n,!0);
},0);
},a.$.onerror=function(){
h(n,!1);
})),a.appendTo(CKEDITOR.document.getHead());
}
};
a&&CKEDITOR.document.getDocumentElement().setStyle("cursor","wait");
for(var m=0;s>m;m++){
f(n[m]);
}
},queue:function(){
function e(){
var e;
(e=t[0])&&this.load(e.scriptUrl,e.callback,CKEDITOR,0);
};
var t=[];
return function(n,i){
function o(){
i&&i.apply(this,arguments),t.shift(),e.call(a);
};
var a=this;
t.push({scriptUrl:n,callback:o}),1==t.length&&e.call(this);
};
}()};
}(),CKEDITOR.resourceManager=function(e,t){
this.basePath=e,this.fileName=t,this.registered={},this.loaded={},this.externals={},this._={waitingList:{}};
},CKEDITOR.resourceManager.prototype={add:function(e,t){
if(this.registered[e]){
throw new Error("[CKEDITOR.resourceManager.add] The resource name \""+e+"\" is already registered.");
}
var n=this.registered[e]=t||{};
return n.name=e,n.path=this.getPath(e),CKEDITOR.fire(e+CKEDITOR.tools.capitalize(this.fileName)+"Ready",n),this.get(e);
},get:function(e){
return this.registered[e]||null;
},getPath:function(e){
var t=this.externals[e];
return CKEDITOR.getUrl(t&&t.dir||this.basePath+e+"/");
},getFilePath:function(e){
var t=this.externals[e];
return CKEDITOR.getUrl(this.getPath(e)+(t?t.file:this.fileName+".js"));
},addExternal:function(e,t,n){
e=e.split(",");
for(var i=0;i<e.length;i++){
var o=e[i];
n||(t=t.replace(/[^\/]+$/,function(e){
return n=e,"";
})),this.externals[o]={dir:t,file:n||this.fileName+".js"};
}
},load:function(e,t,n){
CKEDITOR.tools.isArray(e)||(e=e?[e]:[]);
for(var i=this.loaded,o=this.registered,a=[],r={},s={},l=0;l<e.length;l++){
var d=e[l];
if(d){
if(i[d]||o[d]){
s[d]=this.get(d);
}else{
var c=this.getFilePath(d);
a.push(c),c in r||(r[c]=[]),r[c].push(d);
}
}
}
CKEDITOR.scriptLoader.load(a,function(e,o){
if(o.length){
throw new Error("[CKEDITOR.resourceManager.load] Resource name \""+r[o[0]].join(",")+"\" was not found at \""+o[0]+"\".");
}
for(var a=0;a<e.length;a++){
for(var l=r[e[a]],d=0;d<l.length;d++){
var c=l[d];
s[c]=this.get(c),i[c]=1;
}
}
t.call(n,s);
},this);
}},CKEDITOR.plugins=new CKEDITOR.resourceManager("plugins/","plugin"),CKEDITOR.plugins.load=CKEDITOR.tools.override(CKEDITOR.plugins.load,function(e){
var t={};
return function(n,i,o){
var a={},r=function(n){
e.call(this,n,function(e){
CKEDITOR.tools.extend(a,e);
var n=[];
for(var s in e){
var l=e[s],d=l&&l.requires;
if(!t[s]){
if(l.icons){
for(var c=l.icons.split(","),u=c.length;u--;){
CKEDITOR.skin.addIcon(c[u],l.path+"icons/"+(CKEDITOR.env.hidpi&&l.hidpi?"hidpi/":"")+c[u]+".png");
}
}
t[s]=1;
}
if(d){
d.split&&(d=d.split(","));
for(var h=0;h<d.length;h++){
a[d[h]]||n.push(d[h]);
}
}
}
if(n.length){
r.call(this,n);
}else{
for(s in a){
l=a[s],l.onLoad&&!l.onLoad._called&&(l.onLoad()===!1&&delete a[s],l.onLoad._called=1);
}
i&&i.call(o||window,a);
}
},this);
};
r.call(this,n);
};
}),CKEDITOR.plugins.setLang=function(e,t,n){
var i=this.get(e),o=i.langEntries||(i.langEntries={}),a=i.lang||(i.lang=[]);
a.split&&(a=a.split(",")),-1==CKEDITOR.tools.indexOf(a,t)&&a.push(t),o[t]=n;
},CKEDITOR.ui=function(e){
return e.ui?e.ui:(this.items={},this.instances={},this.editor=e,this._={handlers:{}},this);
},CKEDITOR.ui.prototype={add:function(e,t,n){
n.name=e.toLowerCase();
var i=this.items[e]={type:t,command:n.command||null,args:Array.prototype.slice.call(arguments,2)};
CKEDITOR.tools.extend(i,n);
},get:function(e){
return this.instances[e];
},create:function(e){
var t=this.items[e],n=t&&this._.handlers[t.type],i=t&&t.command&&this.editor.getCommand(t.command),o=n&&n.create.apply(this,t.args);
return this.instances[e]=o,i&&i.uiItems.push(o),o&&!o.type&&(o.type=t.type),o;
},addHandler:function(e,t){
this._.handlers[e]=t;
},space:function(e){
return CKEDITOR.document.getById(this.spaceId(e));
},spaceId:function(e){
return this.editor.id+"_"+e;
}},CKEDITOR.event.implementOn(CKEDITOR.ui),function(){
function e(e,o,r){
if(CKEDITOR.event.call(this),e=e&&CKEDITOR.tools.clone(e),void 0!==o){
if(!(o instanceof CKEDITOR.dom.element)){
throw new Error("Expect element of type CKEDITOR.dom.element.");
}
if(!r){
throw new Error("One of the element modes must be specified.");
}
if(CKEDITOR.env.ie&&CKEDITOR.env.quirks&&r==CKEDITOR.ELEMENT_MODE_INLINE){
throw new Error("Inline element mode is not supported on IE quirks.");
}
if(!n(o,r)){
throw new Error("The specified element mode is not supported on element: \""+o.getName()+"\".");
}
this.element=o,this.elementMode=r,this.name=this.elementMode!=CKEDITOR.ELEMENT_MODE_APPENDTO&&(o.getId()||o.getNameAtt());
}else{
this.elementMode=CKEDITOR.ELEMENT_MODE_NONE;
}
this._={},this.commands={},this.templates={},this.name=this.name||t(),this.id=CKEDITOR.tools.getNextId(),this.status="unloaded",this.config=CKEDITOR.tools.prototypedCopy(CKEDITOR.config),this.ui=new CKEDITOR.ui(this),this.focusManager=new CKEDITOR.focusManager(this),this.keystrokeHandler=new CKEDITOR.keystrokeHandler(this),this.on("readOnly",i),this.on("selectionChange",function(e){
a(this,e.data.path);
}),this.on("activeFilterChange",function(){
a(this,this.elementPath(),!0);
}),this.on("mode",i),this.on("instanceReady",function(){
this.config.startupFocus&&this.focus();
}),CKEDITOR.fire("instanceCreated",null,this),CKEDITOR.add(this),CKEDITOR.tools.setTimeout(function(){
"destroyed"!==this.status?s(this,e):CKEDITOR.warn("editor-incorrect-destroy");
},0,this);
};
function t(){
do{
var e="editor"+ ++p;
}while(CKEDITOR.instances[e]);
return e;
};
function n(e,t){
return t==CKEDITOR.ELEMENT_MODE_INLINE?e.is(CKEDITOR.dtd.$editable)||e.is("textarea"):t==CKEDITOR.ELEMENT_MODE_REPLACE?!e.is(CKEDITOR.dtd.$nonBodyContent):1;
};
function i(){
var e,t=this.commands;
for(e in t){
o(this,t[e]);
}
};
function o(e,t){
t[t.startDisabled?"disable":e.readOnly&&!t.readOnly?"disable":t.modes[e.mode]?"enable":"disable"]();
};
function a(e,t,n){
if(t){
var i,o,a=e.commands;
for(o in a){
i=a[o],(n||i.contextSensitive)&&i.refresh(e,t);
}
}
};
function r(e){
var t=e.config.customConfig;
if(!t){
return !1;
}
t=CKEDITOR.getUrl(t);
var n=E[t]||(E[t]={});
return n.fn?(n.fn.call(e,e.config),CKEDITOR.getUrl(e.config.customConfig)!=t&&r(e)||e.fireOnce("customConfigLoaded")):CKEDITOR.scriptLoader.queue(t,function(){
CKEDITOR.editorConfig?n.fn=CKEDITOR.editorConfig:n.fn=function(){
},r(e);
}),!0;
};
function s(e,t){
e.on("customConfigLoaded",function(){
if(t){
if(t.on){
for(var n in t.on){
e.on(n,t.on[n]);
}
}
CKEDITOR.tools.extend(e.config,t,!0),delete e.config.on;
}
l(e);
}),t&&null!=t.customConfig&&(e.config.customConfig=t.customConfig),r(e)||e.fireOnce("customConfigLoaded");
};
function l(e){
function t(){
return n.readOnly?!0:e.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?e.element.is("textarea")?e.element.hasAttribute("disabled")||e.element.hasAttribute("readonly"):e.element.isReadOnly():e.elementMode==CKEDITOR.ELEMENT_MODE_REPLACE?e.element.hasAttribute("disabled")||e.element.hasAttribute("readonly"):!1;
};
var n=e.config;
e.readOnly=t(),e.blockless=e.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?!(e.element.is("textarea")||CKEDITOR.dtd[e.element.getName()].p):!1,e.tabIndex=n.tabIndex||e.element&&e.element.getAttribute("tabindex")||0,e.activeEnterMode=e.enterMode=g(e,n.enterMode),e.activeShiftEnterMode=e.shiftEnterMode=g(e,n.shiftEnterMode),n.skin&&(CKEDITOR.skinName=n.skin),e.fireOnce("configLoaded"),d(e);
};
function d(e){
e.dataProcessor=new CKEDITOR.htmlDataProcessor(e),e.filter=e.activeFilter=new CKEDITOR.filter(e),c(e);
};
function c(e){
CKEDITOR.skin.loadPart("editor",function(){
u(e);
});
};
function u(e){
CKEDITOR.lang.load(e.config.language,e.config.defaultLanguage,function(t,n){
var i=e.config.title;
e.langCode=t,e.lang=CKEDITOR.tools.prototypedCopy(n),e.title="string"==typeof i||i===!1?i:[e.lang.editor,e.name].join(", "),e.config.contentsLangDirection||(e.config.contentsLangDirection=e.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?e.element.getDirection(1):e.lang.dir),e.fire("langLoaded"),h(e);
});
};
function h(e){
e.getStylesSet(function(t){
e.once("loaded",function(){
e.fire("stylesSet",{styles:t});
},null,null,1),f(e);
});
};
function f(e){
var t=e.config,n=t.plugins,i=t.extraPlugins,o=t.removePlugins;
if(i){
var a=new RegExp("(?:^|,)(?:"+i.replace(/\s*,\s*/g,"|")+")(?=,|$)","g");
n=n.replace(a,""),n+=","+i;
}
if(o){
var r=new RegExp("(?:^|,)(?:"+o.replace(/\s*,\s*/g,"|")+")(?=,|$)","g");
n=n.replace(r,"");
}
CKEDITOR.env.air&&(n+=",adobeair"),CKEDITOR.plugins.load(n.split(","),function(n){
var i=[],o=[],a=[];
e.plugins=n;
for(var s in n){
var l,d,c=n[s],u=c.lang,h=null,f=c.requires;
if(CKEDITOR.tools.isArray(f)&&(f=f.join(",")),f&&(l=f.match(r))){
for(;d=l.pop();){
CKEDITOR.error("editor-plugin-required",{plugin:d.replace(",",""),requiredBy:s});
}
}
if(u&&!e.lang[s]){
if(u.split&&(u=u.split(",")),CKEDITOR.tools.indexOf(u,e.langCode)>=0){
h=e.langCode;
}else{
var m=e.langCode.replace(/-.*/,"");
h=m!=e.langCode&&CKEDITOR.tools.indexOf(u,m)>=0?m:CKEDITOR.tools.indexOf(u,"en")>=0?"en":u[0];
}
c.langEntries&&c.langEntries[h]?(e.lang[s]=c.langEntries[h],h=null):a.push(CKEDITOR.getUrl(c.path+"lang/"+h+".js"));
}
o.push(h),i.push(c);
}
CKEDITOR.scriptLoader.load(a,function(){
for(var n=["beforeInit","init","afterInit"],a=0;a<n.length;a++){
for(var r=0;r<i.length;r++){
var s=i[r];
0===a&&o[r]&&s.lang&&s.langEntries&&(e.lang[s.name]=s.langEntries[o[r]]),s[n[a]]&&s[n[a]](e);
}
}
for(e.fireOnce("pluginsLoaded"),t.keystrokes&&e.setKeystroke(e.config.keystrokes),r=0;r<e.config.blockedKeystrokes.length;r++){
e.keystrokeHandler.blockedKeystrokes[e.config.blockedKeystrokes[r]]=1;
}
e.status="loaded",e.fireOnce("loaded"),CKEDITOR.fire("instanceLoaded",null,e);
});
});
};
function m(){
var e=this.element;
if(e&&this.elementMode!=CKEDITOR.ELEMENT_MODE_APPENDTO){
var t=this.getData();
return this.config.htmlEncodeOutput&&(t=CKEDITOR.tools.htmlEncode(t)),e.is("textarea")?e.setValue(t):e.setHtml(t),!0;
}
return !1;
};
function g(e,t){
return e.blockless?CKEDITOR.ENTER_BR:t;
};
e.prototype=CKEDITOR.editor.prototype,CKEDITOR.editor=e;
var p=0,E={};
CKEDITOR.tools.extend(CKEDITOR.editor.prototype,{addCommand:function(e,t){
t.name=e.toLowerCase();
var n=new CKEDITOR.command(this,t);
return this.mode&&o(this,n),this.commands[e]=n;
},_attachToForm:function(){
function e(e){
n.updateElement(),n._.required&&!i.getValue()&&n.fire("required")===!1&&e.data.preventDefault();
};
function t(e){
return !!(e&&e.call&&e.apply);
};
var n=this,i=n.element,o=new CKEDITOR.dom.element(i.$.form);
i.is("textarea")&&o&&(o.on("submit",e),t(o.$.submit)&&(o.$.submit=CKEDITOR.tools.override(o.$.submit,function(t){
return function(){
e(),t.apply?t.apply(this):t();
};
})),n.on("destroy",function(){
o.removeListener("submit",e);
}));
},destroy:function(e){
this.fire("beforeDestroy"),!e&&m.call(this),this.editable(null),this.filter&&(this.filter.destroy(),delete this.filter),delete this.activeFilter,this.status="destroyed",this.fire("destroy"),this.removeAllListeners(),CKEDITOR.remove(this),CKEDITOR.fire("instanceDestroyed",null,this);
},elementPath:function(e){
if(!e){
var t=this.getSelection();
if(!t){
return null;
}
e=t.getStartElement();
}
return e?new CKEDITOR.dom.elementPath(e,this.editable()):null;
},createRange:function(){
var e=this.editable();
return e?new CKEDITOR.dom.range(e):null;
},execCommand:function(e,t){
var n=this.getCommand(e),i={name:e,commandData:t,command:n};
return n&&n.state!=CKEDITOR.TRISTATE_DISABLED&&this.fire("beforeCommandExec",i)!==!1&&(i.returnValue=n.exec(i.commandData),!n.async&&this.fire("afterCommandExec",i)!==!1)?i.returnValue:!1;
},getCommand:function(e){
return this.commands[e];
},getData:function(e){
!e&&this.fire("beforeGetData");
var t=this._.data;
if("string"!=typeof t){
var n=this.element;
t=n&&this.elementMode==CKEDITOR.ELEMENT_MODE_REPLACE?n.is("textarea")?n.getValue():n.getHtml():"";
}
return t={dataValue:t},!e&&this.fire("getData",t),t.dataValue;
},getSnapshot:function(){
var e=this.fire("getSnapshot");
if("string"!=typeof e){
var t=this.element;
e=t&&this.elementMode==CKEDITOR.ELEMENT_MODE_REPLACE?t.is("textarea")?t.getValue():t.getHtml():"";
}
return e;
},loadSnapshot:function(e){
this.fire("loadSnapshot",e);
},setData:function(e,t,n){
var i,o=!0,a=t;
t&&"object"==typeof t&&(n=t.internal,a=t.callback,o=!t.noSnapshot),!n&&o&&this.fire("saveSnapshot"),(a||!n)&&this.once("dataReady",function(e){
!n&&o&&this.fire("saveSnapshot"),a&&a.call(e.editor);
}),i={dataValue:e},!n&&this.fire("setData",i),this._.data=i.dataValue,!n&&this.fire("afterSetData",i);
},setReadOnly:function(e){
e=null==e||e,this.readOnly!=e&&(this.readOnly=e,this.keystrokeHandler.blockedKeystrokes[8]=+e,this.editable().setReadOnly(e),this.fire("readOnly"));
},insertHtml:function(e,t,n){
this.fire("insertHtml",{dataValue:e,mode:t,range:n});
},insertText:function(e){
this.fire("insertText",e);
},insertElement:function(e){
this.fire("insertElement",e);
},getSelectedHtml:function(e){
var t=this.editable(),n=this.getSelection(),i=n&&n.getRanges();
if(!t||!i||0===i.length){
return null;
}
var o=t.getHtmlFromRange(i[0]);
return e?o.getHtml():o;
},extractSelectedHtml:function(e,t){
var n=this.editable(),i=this.getSelection().getRanges();
if(!n||0===i.length){
return null;
}
var o=i[0],a=n.extractHtmlFromRange(o,t);
return t||this.getSelection().selectRanges([o]),e?a.getHtml():a;
},focus:function(){
this.fire("beforeFocus");
},checkDirty:function(){
return "ready"==this.status&&this._.previousValue!==this.getSnapshot();
},resetDirty:function(){
this._.previousValue=this.getSnapshot();
},updateElement:function(){
return m.call(this);
},setKeystroke:function(){
for(var e,t,n=this.keystrokeHandler.keystrokes,i=CKEDITOR.tools.isArray(arguments[0])?arguments[0]:[[].slice.call(arguments,0)],o=i.length;o--;){
e=i[o],t=0,CKEDITOR.tools.isArray(e)&&(t=e[1],e=e[0]),t?n[e]=t:delete n[e];
}
},addFeature:function(e){
return this.filter.addFeature(e);
},setActiveFilter:function(e){
e||(e=this.filter),this.activeFilter!==e&&(this.activeFilter=e,this.fire("activeFilterChange"),e===this.filter?this.setActiveEnterMode(null,null):this.setActiveEnterMode(e.getAllowedEnterMode(this.enterMode),e.getAllowedEnterMode(this.shiftEnterMode,!0)));
},setActiveEnterMode:function(e,t){
e=e?g(this,e):this.enterMode,t=t?g(this,t):this.shiftEnterMode,(this.activeEnterMode!=e||this.activeShiftEnterMode!=t)&&(this.activeEnterMode=e,this.activeShiftEnterMode=t,this.fire("activeEnterModeChange"));
},showNotification:function(e){
alert(e);
}});
}(),CKEDITOR.ELEMENT_MODE_NONE=0,CKEDITOR.ELEMENT_MODE_REPLACE=1,CKEDITOR.ELEMENT_MODE_APPENDTO=2,CKEDITOR.ELEMENT_MODE_INLINE=3,CKEDITOR.htmlParser=function(){
this._={htmlPartsRegex:/<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)-->)|(?:([^\/\s>]+)((?:\s+[\w\-:.]+(?:\s*=\s*?(?:(?:"[^"]*")|(?:'[^']*')|[^\s"'\/>]+))?)*)[\S\s]*?(\/?)>))/g};
},function(){
var e=/([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g,t={checked:1,compact:1,declare:1,defer:1,disabled:1,ismap:1,multiple:1,nohref:1,noresize:1,noshade:1,nowrap:1,readonly:1,selected:1};
CKEDITOR.htmlParser.prototype={onTagOpen:function(){
},onTagClose:function(){
},onText:function(){
},onCDATA:function(){
},onComment:function(){
},parse:function(n){
for(var i,o,a,r=0;i=this._.htmlPartsRegex.exec(n);){
var s=i.index;
if(s>r){
var l=n.substring(r,s);
a?a.push(l):this.onText(l);
}
if(r=this._.htmlPartsRegex.lastIndex,!(o=i[1])||(o=o.toLowerCase(),a&&CKEDITOR.dtd.$cdata[o]&&(this.onCDATA(a.join("")),a=null),a)){
if(a){
a.push(i[0]);
}else{
if(o=i[3]){
if(o=o.toLowerCase(),/="/.test(o)){
continue;
}
var d,c={},u=i[4],h=!!i[5];
if(u){
for(;d=e.exec(u);){
var f=d[1].toLowerCase(),m=d[2]||d[3]||d[4]||"";
!m&&t[f]?c[f]=f:c[f]=CKEDITOR.tools.htmlDecodeAttr(m);
}
}
this.onTagOpen(o,c,h),!a&&CKEDITOR.dtd.$cdata[o]&&(a=[]);
}else{
(o=i[2])&&this.onComment(o);
}
}
}else{
this.onTagClose(o);
}
}
n.length>r&&this.onText(n.substring(r,n.length));
}};
}(),CKEDITOR.htmlParser.basicWriter=CKEDITOR.tools.createClass({$:function(){
this._={output:[]};
},proto:{openTag:function(e){
this._.output.push("<",e);
},openTagClose:function(e,t){
t?this._.output.push(" />"):this._.output.push(">");
},attribute:function(e,t){
"string"==typeof t&&(t=CKEDITOR.tools.htmlEncodeAttr(t)),this._.output.push(" ",e,"=\"",t,"\"");
},closeTag:function(e){
this._.output.push("</",e,">");
},text:function(e){
this._.output.push(e);
},comment:function(e){
this._.output.push("<!--",e,"-->");
},write:function(e){
this._.output.push(e);
},reset:function(){
this._.output=[],this._.indent=!1;
},getHtml:function(e){
var t=this._.output.join("");
return e&&this.reset(),t;
}}}),function(){
CKEDITOR.htmlParser.node=function(){
},CKEDITOR.htmlParser.node.prototype={remove:function(){
var e=this.parent.children,t=CKEDITOR.tools.indexOf(e,this),n=this.previous,i=this.next;
n&&(n.next=i),i&&(i.previous=n),e.splice(t,1),this.parent=null;
},replaceWith:function(e){
var t=this.parent.children,n=CKEDITOR.tools.indexOf(t,this),i=e.previous=this.previous,o=e.next=this.next;
i&&(i.next=e),o&&(o.previous=e),t[n]=e,e.parent=this.parent,this.parent=null;
},insertAfter:function(e){
var t=e.parent.children,n=CKEDITOR.tools.indexOf(t,e),i=e.next;
t.splice(n+1,0,this),this.next=e.next,this.previous=e,e.next=this,i&&(i.previous=this),this.parent=e.parent;
},insertBefore:function(e){
var t=e.parent.children,n=CKEDITOR.tools.indexOf(t,e);
t.splice(n,0,this),this.next=e,this.previous=e.previous,e.previous&&(e.previous.next=this),e.previous=this,this.parent=e.parent;
},getAscendant:function(e){
for(var t=("function"==typeof e?e:"string"==typeof e?function(t){
return t.name==e;
}:function(t){
return t.name in e;
}),n=this.parent;n&&n.type==CKEDITOR.NODE_ELEMENT;){
if(t(n)){
return n;
}
n=n.parent;
}
return null;
},wrapWith:function(e){
return this.replaceWith(e),e.add(this),e;
},getIndex:function(){
return CKEDITOR.tools.indexOf(this.parent.children,this);
},getFilterContext:function(e){
return e||{};
}};
}(),CKEDITOR.htmlParser.comment=function(e){
this.value=e,this._={isBlockLike:!1};
},CKEDITOR.htmlParser.comment.prototype=CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node,{type:CKEDITOR.NODE_COMMENT,filter:function(e,t){
var n=this.value;
return (n=e.onComment(t,n,this))?"string"!=typeof n?(this.replaceWith(n),!1):(this.value=n,!0):(this.remove(),!1);
},writeHtml:function(e,t){
t&&this.filter(t),e.comment(this.value);
}}),function(){
CKEDITOR.htmlParser.text=function(e){
this.value=e,this._={isBlockLike:!1};
},CKEDITOR.htmlParser.text.prototype=CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node,{type:CKEDITOR.NODE_TEXT,filter:function(e,t){
return (this.value=e.onText(t,this.value,this))?void 0:(this.remove(),!1);
},writeHtml:function(e,t){
t&&this.filter(t),e.text(this.value);
}});
}(),function(){
CKEDITOR.htmlParser.cdata=function(e){
this.value=e;
},CKEDITOR.htmlParser.cdata.prototype=CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node,{type:CKEDITOR.NODE_TEXT,filter:function(){
},writeHtml:function(e){
e.write(this.value);
}});
}(),CKEDITOR.htmlParser.fragment=function(){
this.children=[],this.parent=null,this._={isBlockLike:!0,hasInlineStarted:!1};
},function(){
function e(e){
return e.attributes["data-cke-survive"]?!1:"a"==e.name&&e.attributes.href||CKEDITOR.dtd.$removeEmpty[e.name];
};
var t=CKEDITOR.tools.extend({table:1,ul:1,ol:1,dl:1},CKEDITOR.dtd.table,CKEDITOR.dtd.ul,CKEDITOR.dtd.ol,CKEDITOR.dtd.dl),n={ol:1,ul:1},i=CKEDITOR.tools.extend({},{html:1},CKEDITOR.dtd.html,CKEDITOR.dtd.body,CKEDITOR.dtd.head,{style:1,script:1}),o={ul:"li",ol:"li",dl:"dd",table:"tbody",tbody:"tr",thead:"tr",tfoot:"tr",tr:"td"};
CKEDITOR.htmlParser.fragment.fromHtml=function(a,r,s){
function l(e){
var t;
if(p.length>0){
for(var n=0;n<p.length;n++){
var i=p[n],o=i.name,a=CKEDITOR.dtd[o],r=T.name&&CKEDITOR.dtd[T.name];
r&&!r[o]||e&&a&&!a[e]&&CKEDITOR.dtd[e]?o==T.name&&(u(T,T.parent,1),n--):(t||(d(),t=1),i=i.clone(),i.parent=T,T=i,p.splice(n,1),n--);
}
}
};
function d(){
for(;E.length;){
u(E.shift(),T);
}
};
function c(e){
if(e._.isBlockLike&&"pre"!=e.name&&"textarea"!=e.name){
var t,n=e.children.length,i=e.children[n-1];
i&&i.type==CKEDITOR.NODE_TEXT&&((t=CKEDITOR.tools.rtrim(i.value))?i.value=t:e.children.length=n-1);
}
};
function u(t,n,i){
n=n||T||g;
var o=T;
void 0===t.previous&&(h(n,t)&&(T=n,m.onTagOpen(s,{}),t.returnPoint=n=T),c(t),(!e(t)||t.children.length)&&n.add(t),"pre"==t.name&&(v=!1),"textarea"==t.name&&(C=!1)),t.returnPoint?(T=t.returnPoint,delete t.returnPoint):T=i?n:o;
};
function h(e,t){
if((e==g||"body"==e.name)&&s&&(!e.name||CKEDITOR.dtd[e.name][s])){
var n,i;
return n=t.attributes&&(i=t.attributes["data-cke-real-element-type"])?i:t.name,n&&n in CKEDITOR.dtd.$inline&&!(n in CKEDITOR.dtd.head)&&!t.isOrphan||t.type==CKEDITOR.NODE_TEXT;
}
};
function f(e,t){
return e in CKEDITOR.dtd.$listItem||e in CKEDITOR.dtd.$tableContent?e==t||"dt"==e&&"dd"==t||"dd"==e&&"dt"==t:!1;
};
var m=new CKEDITOR.htmlParser,g=r instanceof CKEDITOR.htmlParser.element?r:"string"==typeof r?new CKEDITOR.htmlParser.element(r):new CKEDITOR.htmlParser.fragment,p=[],E=[],T=g,C="textarea"==g.name,v="pre"==g.name;
m.onTagOpen=function(o,a,r,s){
var c=new CKEDITOR.htmlParser.element(o,a);
if(c.isUnknown&&r&&(c.isEmpty=!0),c.isOptionalClose=s,e(c)){
return void p.push(c);
}
if("pre"==o){
v=!0;
}else{
if("br"==o&&v){
return void T.add(new CKEDITOR.htmlParser.text("\n"));
}
"textarea"==o&&(C=!0);
}
if("br"==o){
return void E.push(c);
}
for(;;){
var h=T.name,g=h?CKEDITOR.dtd[h]||(T._.isBlockLike?CKEDITOR.dtd.div:CKEDITOR.dtd.span):i;
if(c.isUnknown||T.isUnknown||g[o]){
break;
}
if(T.isOptionalClose){
m.onTagClose(h);
}else{
if(o in n&&h in n){
var I=T.children,O=I[I.length-1];
O&&"li"==O.name||u(O=new CKEDITOR.htmlParser.element("li"),T),!c.returnPoint&&(c.returnPoint=T),T=O;
}else{
if(o in CKEDITOR.dtd.$listItem&&!f(o,h)){
m.onTagOpen("li"==o?"ul":"dl",{},0,1);
}else{
if(h in t&&!f(o,h)){
!c.returnPoint&&(c.returnPoint=T),T=T.parent;
}else{
if(h in CKEDITOR.dtd.$inline&&p.unshift(T),!T.parent){
c.isOrphan=1;
break;
}
u(T,T.parent,1);
}
}
}
}
}
l(o),d(),c.parent=T,c.isEmpty?u(c):T=c;
},m.onTagClose=function(e){
for(var t=p.length-1;t>=0;t--){
if(e==p[t].name){
return void p.splice(t,1);
}
}
for(var n=[],i=[],o=T;o!=g&&o.name!=e;){
o._.isBlockLike||i.unshift(o),n.push(o),o=o.returnPoint||o.parent;
}
if(o!=g){
for(t=0;t<n.length;t++){
var a=n[t];
u(a,a.parent);
}
T=o,o._.isBlockLike&&d(),u(o,o.parent),o==T&&(T=T.parent),p=p.concat(i);
}
"body"==e&&(s=!1);
},m.onText=function(e){
if(T._.hasInlineStarted&&!E.length||v||C||(e=CKEDITOR.tools.ltrim(e),0!==e.length)){
var n=T.name,a=n?CKEDITOR.dtd[n]||(T._.isBlockLike?CKEDITOR.dtd.div:CKEDITOR.dtd.span):i;
if(!C&&!a["#"]&&n in t){
return m.onTagOpen(o[n]||""),void m.onText(e);
}
d(),l(),v||C||(e=e.replace(/[\t\r\n ]{2,}|[\t\r\n]/g," ")),e=new CKEDITOR.htmlParser.text(e),h(T,e)&&this.onTagOpen(s,{},0,1),T.add(e);
}
},m.onCDATA=function(e){
T.add(new CKEDITOR.htmlParser.cdata(e));
},m.onComment=function(e){
d(),l(),T.add(new CKEDITOR.htmlParser.comment(e));
},m.parse(a),d();
for(;T!=g;){
u(T,T.parent,1);
}
return c(g),g;
},CKEDITOR.htmlParser.fragment.prototype={type:CKEDITOR.NODE_DOCUMENT_FRAGMENT,add:function(e,t){
isNaN(t)&&(t=this.children.length);
var n=t>0?this.children[t-1]:null;
if(n){
if(e._.isBlockLike&&n.type==CKEDITOR.NODE_TEXT&&(n.value=CKEDITOR.tools.rtrim(n.value),0===n.value.length)){
return this.children.pop(),void this.add(e);
}
n.next=e;
}
e.previous=n,e.parent=this,this.children.splice(t,0,e),this._.hasInlineStarted||(this._.hasInlineStarted=e.type==CKEDITOR.NODE_TEXT||e.type==CKEDITOR.NODE_ELEMENT&&!e._.isBlockLike);
},filter:function(e,t){
t=this.getFilterContext(t),e.onRoot(t,this),this.filterChildren(e,!1,t);
},filterChildren:function(e,t,n){
if(this.childrenFilteredBy!=e.id){
n=this.getFilterContext(n),t&&!this.parent&&e.onRoot(n,this),this.childrenFilteredBy=e.id;
for(var i=0;i<this.children.length;i++){
this.children[i].filter(e,n)===!1&&i--;
}
}
},writeHtml:function(e,t){
t&&this.filter(t),this.writeChildrenHtml(e);
},writeChildrenHtml:function(e,t,n){
var i=this.getFilterContext();
n&&!this.parent&&t&&t.onRoot(i,this),t&&this.filterChildren(t,!1,i);
for(var o=0,a=this.children,r=a.length;r>o;o++){
a[o].writeHtml(e);
}
},forEach:function(e,t,n){
if(!(n||t&&this.type!=t)){
var i=e(this);
}
if(i!==!1){
for(var o,a=this.children,r=0;r<a.length;r++){
o=a[r],o.type==CKEDITOR.NODE_ELEMENT?o.forEach(e,t):t&&o.type!=t||e(o);
}
}
},getFilterContext:function(e){
return e||{};
}};
}(),function(){
function e(){
this.rules=[];
};
function t(t,n,i,o){
var a,r;
for(a in n){
r=t[a],r||(r=t[a]=new e),r.add(n[a],i,o);
}
};
function n(e,t){
return e.nonEditable&&!t.options.applyToAll?!1:e.nestedEditable&&t.options.excludeNestedEditable?!1:!0;
};
CKEDITOR.htmlParser.filter=CKEDITOR.tools.createClass({$:function(t){
this.id=CKEDITOR.tools.getNextNumber(),this.elementNameRules=new e,this.attributeNameRules=new e,this.elementsRules={},this.attributesRules={},this.textRules=new e,this.commentRules=new e,this.rootRules=new e,t&&this.addRules(t,10);
},proto:{addRules:function(e,n){
var i;
"number"==typeof n?i=n:n&&"priority" in n&&(i=n.priority),"number"!=typeof i&&(i=10),"object"!=typeof n&&(n={}),e.elementNames&&this.elementNameRules.addMany(e.elementNames,i,n),e.attributeNames&&this.attributeNameRules.addMany(e.attributeNames,i,n),e.elements&&t(this.elementsRules,e.elements,i,n),e.attributes&&t(this.attributesRules,e.attributes,i,n),e.text&&this.textRules.add(e.text,i,n),e.comment&&this.commentRules.add(e.comment,i,n),e.root&&this.rootRules.add(e.root,i,n);
},applyTo:function(e){
e.filter(this);
},onElementName:function(e,t){
return this.elementNameRules.execOnName(e,t);
},onAttributeName:function(e,t){
return this.attributeNameRules.execOnName(e,t);
},onText:function(e,t,n){
return this.textRules.exec(e,t,n);
},onComment:function(e,t,n){
return this.commentRules.exec(e,t,n);
},onRoot:function(e,t){
return this.rootRules.exec(e,t);
},onElement:function(e,t){
for(var n,i,o=[this.elementsRules["^"],this.elementsRules[t.name],this.elementsRules.$],a=0;3>a;a++){
if(n=o[a]){
if(i=n.exec(e,t,this),i===!1){
return null;
}
if(i&&i!=t){
return this.onNode(e,i);
}
if(t.parent&&!t.name){
break;
}
}
}
return t;
},onNode:function(e,t){
var n=t.type;
return n==CKEDITOR.NODE_ELEMENT?this.onElement(e,t):n==CKEDITOR.NODE_TEXT?new CKEDITOR.htmlParser.text(this.onText(e,t.value)):n==CKEDITOR.NODE_COMMENT?new CKEDITOR.htmlParser.comment(this.onComment(e,t.value)):null;
},onAttribute:function(e,t,n,i){
var o=this.attributesRules[n];
return o?o.exec(e,i,t,this):i;
}}}),CKEDITOR.htmlParser.filterRulesGroup=e,e.prototype={add:function(e,t,n){
this.rules.splice(this.findIndex(t),0,{value:e,priority:t,options:n});
},addMany:function(e,t,n){
for(var i=[this.findIndex(t),0],o=0,a=e.length;a>o;o++){
i.push({value:e[o],priority:t,options:n});
}
this.rules.splice.apply(this.rules,i);
},findIndex:function(e){
for(var t=this.rules,n=t.length,i=n-1;i>=0&&e<t[i].priority;){
i--;
}
return i+1;
},exec:function(e,t){
var i,o,a,r,s,l=t instanceof CKEDITOR.htmlParser.node||t instanceof CKEDITOR.htmlParser.fragment,d=Array.prototype.slice.call(arguments,1),c=this.rules,u=c.length;
for(r=0;u>r;r++){
if(l&&(i=t.type,o=t.name),s=c[r],n(e,s)){
if(a=s.value.apply(null,d),a===!1){
return a;
}
if(l&&a&&(a.name!=o||a.type!=i)){
return a;
}
null!=a&&(d[0]=t=a);
}
}
return t;
},execOnName:function(e,t){
for(var i,o=0,a=this.rules,r=a.length;t&&r>o;o++){
i=a[o],n(e,i)&&(t=t.replace(i.value[0],i.value[1]));
}
return t;
}};
}(),function(){
function e(e,t){
function a(e){
return e||CKEDITOR.env.needsNbspFiller?new CKEDITOR.htmlParser.text("\xa0"):new CKEDITOR.htmlParser.element("br",{"data-cke-bogus":1});
};
function l(e,t){
return function(n){
if(n.type!=CKEDITOR.NODE_DOCUMENT_FRAGMENT){
u(n);
var i=!e||("function"==typeof t?t(n):t)!==!1;
i&&h(n)&&n.add(a(e));
}
};
};
function d(e){
return function(t){
if(t.parent.type!=CKEDITOR.NODE_DOCUMENT_FRAGMENT){
var n=t.attributes;
if("data-cke-bogus" in n||"data-cke-eol" in n){
return void delete n["data-cke-bogus"];
}
var l=i(t),d=o(t);
!l&&r(t.parent)?s(t.parent,a(e)):r(l)&&d&&!r(d)&&a(e).insertBefore(l);
}
};
};
function c(e,t){
if((!m||CKEDITOR.env.needsBrFiller)&&e.type==CKEDITOR.NODE_ELEMENT&&"br"==e.name&&!e.attributes["data-cke-eol"]){
return !0;
}
var n;
if(e.type==CKEDITOR.NODE_TEXT&&(n=e.value.match(b))){
if(n.index&&(new CKEDITOR.htmlParser.text(e.value.substring(0,n.index)).insertBefore(e),e.value=n[0]),!CKEDITOR.env.needsBrFiller&&m&&(!t||e.parent.name in g)){
return !0;
}
if(!m){
var i=e.previous;
if(i&&"br"==i.name){
return !0;
}
if(!i||r(i)){
return !0;
}
}
}
return !1;
};
function u(e){
var t,i,s=[],l=n(e);
if(l){
for(c(l,1)&&s.push(l);l;){
r(l)&&(t=o(l))&&c(t)&&((i=o(t))&&!r(i)?s.push(t):(a(m).insertAfter(t),t.remove())),l=l.previous;
}
}
for(var d=0;d<s.length;d++){
s[d].remove();
}
};
function h(e){
if(!m&&!CKEDITOR.env.needsBrFiller&&e.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT){
return !1;
}
if(!m&&!CKEDITOR.env.needsBrFiller&&(document.documentMode>7||e.name in CKEDITOR.dtd.tr||e.name in CKEDITOR.dtd.$listItem)){
return !1;
}
var t=n(e);
return !t||"form"==e.name&&"input"==t.name;
};
var f={elements:{}},m="html"==t,g=CKEDITOR.tools.extend({},_b);
for(var p in g){
"#" in y[p]||delete g[p];
}
for(p in g){
f.elements[p]=l(m,e.config.fillEmptyBlocks);
}
return f.root=l(m,!1),f.elements.br=d(m),f;
};
function t(e,t){
return e!=CKEDITOR.ENTER_BR&&t!==!1?e==CKEDITOR.ENTER_DIV?"div":"p":!1;
};
function n(e){
for(var t=e.children[e.children.length-1];t&&a(t);){
t=t.previous;
}
return t;
};
function i(e){
for(var t=e.next;t&&a(t);){
t=t.next;
}
return t;
};
function o(e){
for(var t=e.previous;t&&a(t);){
t=t.previous;
}
return t;
};
function a(e){
return e.type==CKEDITOR.NODE_TEXT&&!CKEDITOR.tools.trim(e.value)||e.type==CKEDITOR.NODE_ELEMENT&&e.attributes["data-cke-bookmark"];
};
function r(e){
return e&&(e.type==CKEDITOR.NODE_ELEMENT&&e.name in _b||e.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT);
};
function s(e,t){
var n=e.children[e.children.length-1];
e.children.push(t),t.parent=e,n&&(n.next=t,t.previous=n);
};
function l(e){
return e.parent?e.getIndex():-1;
};
function d(e){
var t=e.attributes;
"false"!=t.contenteditable&&(t["data-cke-editable"]=t.contenteditable?"true":1),t.contenteditable="false";
};
function c(e){
var t=e.attributes;
switch(t["data-cke-editable"]){
case "true":
t.contenteditable="true";
break;
case "1":
delete t.contenteditable;
}
};
function u(e){
return e.replace(N,function(e,t,n){
return "<"+t+n.replace(A,function(e,t){
return L.test(t)&&-1==n.indexOf("data-cke-saved-"+t)?" data-cke-saved-"+e+" data-cke-"+CKEDITOR.rnd+"-"+e:e;
})+">";
});
};
function h(e,t){
return e.replace(t,function(e,t,n){
return 0===e.indexOf("<textarea")&&(e=t+v(n).replace(/</g,"&lt;").replace(/>/g,"&gt;")+"</textarea>"),"<cke:encoded>"+encodeURIComponent(e)+"</cke:encoded>";
});
};
function f(e){
return e.replace(F,function(e,t){
return decodeURIComponent(t);
});
};
function m(e){
return e.replace(M,"$1cke:$2");
};
function g(e){
return e.replace($,"$1$2");
};
function p(e){
return e.replace(H,"<cke:$1$2></cke:$1>");
};
function E(e){
return e.replace(/(<pre\b[^>]*>)(\r\n|\n)/g,"$1$2$2");
};
function T(e){
return e.replace(/<!--(?!{cke_protected})[\s\S]+?-->/g,function(e){
return "<!--"+R+"{C}"+encodeURIComponent(e).replace(/--/g,"%2D%2D")+"-->";
});
};
function C(e){
return e.replace(/([^a-z0-9<\-])(on\w{3,})(?!>)/gi,"$1data-cke-"+CKEDITOR.rnd+"-$2");
};
function v(e){
return e.replace(/<!--\{cke_protected\}\{C\}([\s\S]+?)-->/g,function(e,t){
return decodeURIComponent(t);
});
};
function I(e,t){
var n=t._.dataStore;
return e.replace(/<!--\{cke_protected\}([\s\S]+?)-->/g,function(e,t){
return decodeURIComponent(t);
}).replace(/\{cke_protected_(\d+)\}/g,function(e,t){
return n&&n[t]||"";
});
};
function O(e,t){
var n=[],i=t.config.protectedSource,o=t._.dataStore||(t._.dataStore={id:1}),a=/<\!--\{cke_temp(comment)?\}(\d*?)-->/g,r=[/<script[\s\S]*?(<\/script>|$)/gi,/<noscript[\s\S]*?<\/noscript>/gi,/<meta[\s\S]*?\/?>/gi].concat(i);
e=e.replace(/<!--[\s\S]*?-->/g,function(e){
return "<!--{cke_tempcomment}"+(n.push(e)-1)+"-->";
});
for(var s=0;s<r.length;s++){
e=e.replace(r[s],function(e){
return e=e.replace(a,function(e,t,i){
return n[i];
}),/cke_temp(comment)?/.test(e)?e:"<!--{cke_temp}"+(n.push(e)-1)+"-->";
});
}
return e=e.replace(a,function(e,t,i){
return "<!--"+R+(t?"{C}":"")+encodeURIComponent(n[i]).replace(/--/g,"%2D%2D")+"-->";
}),e=e.replace(/<\w+(?:\s+(?:(?:[^\s=>]+\s*=\s*(?:[^'"\s>]+|'[^']*'|"[^"]*"))|[^\s=\/>]+))+\s*\/?>/g,function(e){
return e.replace(/<!--\{cke_protected\}([^>]*)-->/g,function(e,t){
return o[o.id]=decodeURIComponent(t),"{cke_protected_"+o.id++ +"}";
});
}),e=e.replace(/<(title|iframe|textarea)([^>]*)>([\s\S]*?)<\/\1>/g,function(e,n,i,o){
return "<"+n+i+">"+I(v(o),t)+"</"+n+">";
});
};
function D(e,t){
if(!e.children.length&&CKEDITOR.dtd[e.name][t]){
var n=new CKEDITOR.htmlParser.element(t);
e.add(n);
}
};
CKEDITOR.htmlDataProcessor=function(n){
var i,o,a=this;
this.editor=n,this.dataFilter=i=new CKEDITOR.htmlParser.filter,this.htmlFilter=o=new CKEDITOR.htmlParser.filter,this.writer=new CKEDITOR.htmlParser.basicWriter,i.addRules(k),i.addRules(w,{applyToAll:!0}),i.addRules(e(n,"data"),{applyToAll:!0}),o.addRules(S),o.addRules(x,{applyToAll:!0}),o.addRules(e(n,"html"),{applyToAll:!0}),n.on("toHtml",function(e){
var i,o=e.data,a=o.dataValue;
a=O(a,n),a=h(a,B),a=u(a),a=h(a,P),a=m(a),a=p(a),a=E(a),a=C(a);
var r,s=o.context||n.editable().getName();
CKEDITOR.env.ie&&CKEDITOR.env.version<9&&"pre"==s&&(s="div",a="<pre>"+a+"</pre>",r=1);
var l=n.document.createElement(s);
l.setHtml("a"+a),a=l.getHtml().substr(1),a=a.replace(new RegExp("data-cke-"+CKEDITOR.rnd+"-","ig"),""),r&&(a=a.replace(/^<pre>|<\/pre>$/gi,"")),a=g(a),a=f(a),a=v(a),i=o.fixForBody===!1?!1:t(o.enterMode,n.config.autoParagraph),a=CKEDITOR.htmlParser.fragment.fromHtml(a,o.context,i),i&&D(a,i),o.dataValue=a;
},null,null,5),n.on("toHtml",function(e){
e.data.filter.applyTo(e.data.dataValue,!0,e.data.dontFilter,e.data.enterMode)&&n.fire("dataFiltered");
},null,null,6),n.on("toHtml",function(e){
e.data.dataValue.filterChildren(a.dataFilter,!0);
},null,null,10),n.on("toHtml",function(e){
var t=e.data,n=t.dataValue,i=new CKEDITOR.htmlParser.basicWriter;
n.writeChildrenHtml(i),n=i.getHtml(!0),t.dataValue=T(n);
},null,null,15),n.on("toDataFormat",function(e){
var i=e.data.dataValue;
e.data.enterMode!=CKEDITOR.ENTER_BR&&(i=i.replace(/^<br *\/?>/i,"")),e.data.dataValue=CKEDITOR.htmlParser.fragment.fromHtml(i,e.data.context,t(e.data.enterMode,n.config.autoParagraph));
},null,null,5),n.on("toDataFormat",function(e){
e.data.dataValue.filterChildren(a.htmlFilter,!0);
},null,null,10),n.on("toDataFormat",function(e){
e.data.filter.applyTo(e.data.dataValue,!1,!0);
},null,null,11),n.on("toDataFormat",function(e){
var t=e.data.dataValue,i=a.writer;
i.reset(),t.writeChildrenHtml(i),t=i.getHtml(!0),t=v(t),t=I(t,n),e.data.dataValue=t;
},null,null,15);
},CKEDITOR.htmlDataProcessor.prototype={toHtml:function(e,t,n,i){
var o,a,r,s,l=this.editor;
return t&&"object"==typeof t?(o=t.context,n=t.fixForBody,i=t.dontFilter,a=t.filter,r=t.enterMode,s=t.protectedWhitespaces):o=t,o||null===o||(o=l.editable().getName()),l.fire("toHtml",{dataValue:e,context:o,fixForBody:n,dontFilter:i,filter:a||l.filter,enterMode:r||l.enterMode,protectedWhitespaces:s}).dataValue;
},toDataFormat:function(e,t){
var n,i,o;
return t&&(n=t.context,i=t.filter,o=t.enterMode),n||null===n||(n=this.editor.editable().getName()),this.editor.fire("toDataFormat",{dataValue:e,filter:i||this.editor.filter,context:n,enterMode:o||this.editor.enterMode}).dataValue;
}};
var b=/(?:&nbsp;|\xa0)$/,R="{cke_protected}",y=CKEDITOR.dtd,K=["caption","colgroup","col","thead","tfoot","tbody"],_b=CKEDITOR.tools.extend({},y.$blockLimit,y.$block),k={elements:{input:d,textarea:d}},w={attributeNames:[[/^on/,"data-cke-pa-on"],[/^data-cke-expando$/,""]]},S={elements:{embed:function(e){
var t=e.parent;
if(t&&"object"==t.name){
var n=t.attributes.width,i=t.attributes.height;
n&&(e.attributes.width=n),i&&(e.attributes.height=i);
}
},a:function(e){
var t=e.attributes;
return e.children.length||t.name||t.id||e.attributes["data-cke-saved-name"]?void 0:!1;
}}},x={elementNames:[[/^cke:/,""],[/^\?xml:namespace$/,""]],attributeNames:[[/^data-cke-(saved|pa)-/,""],[/^data-cke-.*/,""],["hidefocus",""]],elements:{$:function(e){
var t=e.attributes;
if(t){
if(t["data-cke-temp"]){
return !1;
}
for(var n,i=["name","href","src"],o=0;o<i.length;o++){
n="data-cke-saved-"+i[o],n in t&&delete t[i[o]];
}
}
return e;
},table:function(e){
var t=e.children.slice(0);
t.sort(function(e,t){
var n,i;
return e.type==CKEDITOR.NODE_ELEMENT&&t.type==e.type&&(n=CKEDITOR.tools.indexOf(K,e.name),i=CKEDITOR.tools.indexOf(K,t.name)),n>-1&&i>-1&&n!=i||(n=l(e),i=l(t)),n>i?1:-1;
});
},param:function(e){
return e.children=[],e.isEmpty=!0,e;
},span:function(e){
"Apple-style-span"==e.attributes["class"]&&delete e.name;
},html:function(e){
delete e.attributes.contenteditable,delete e.attributes["class"];
},body:function(e){
delete e.attributes.spellcheck,delete e.attributes.contenteditable;
},style:function(e){
var t=e.children[0];
t&&t.value&&(t.value=CKEDITOR.tools.trim(t.value)),e.attributes.type||(e.attributes.type="text/css");
},title:function(e){
var t=e.children[0];
!t&&s(e,t=new CKEDITOR.htmlParser.text),t.value=e.attributes["data-cke-title"]||"";
},input:c,textarea:c},attributes:{"class":function(e){
return CKEDITOR.tools.ltrim(e.replace(/(?:^|\s+)cke_[^\s]*/g,""))||!1;
}}};
CKEDITOR.env.ie&&(x.attributes.style=function(e){
return e.replace(/(^|;)([^\:]+)/g,function(e){
return e.toLowerCase();
});
});
var N=/<(a|area|img|input|source)\b([^>]*)>/gi,A=/([\w-:]+)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+))/gi,L=/^(href|src|name)$/i,P=/(?:<style(?=[ >])[^>]*>[\s\S]*?<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi,B=/(<textarea(?=[ >])[^>]*>)([\s\S]*?)(?:<\/textarea>)/gi,F=/<cke:encoded>([^<]*)<\/cke:encoded>/gi,M=/(<\/?)((?:object|embed|param|html|body|head|title)[^>]*>)/gi,$=/(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi,H=/<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi;
}(),CKEDITOR.htmlParser.element=function(e,t){
this.name=e,this.attributes=t||{},this.children=[];
var n=e||"",i=n.match(/^cke:(.*)/);
i&&(n=i[1]);
var o=!!(CKEDITOR.dtd.$nonBodyContent[n]||CKEDITOR.dtd.$block[n]||CKEDITOR.dtd.$listItem[n]||CKEDITOR.dtd.$tableContent[n]||CKEDITOR.dtd.$nonEditable[n]||"br"==n);
this.isEmpty=!!CKEDITOR.dtd.$empty[e],this.isUnknown=!CKEDITOR.dtd[e],this._={isBlockLike:o,hasInlineStarted:this.isEmpty||!o};
},CKEDITOR.htmlParser.cssStyle=function(){
var e,t=arguments[0],n={};
return e=t instanceof CKEDITOR.htmlParser.element?t.attributes.style:t,(e||"").replace(/&quot;/g,"\"").replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g,function(e,t,i){
"font-family"==t&&(i=i.replace(/["']/g,"")),n[t.toLowerCase()]=i;
}),{rules:n,populate:function(e){
var t=this.toString();
t&&(e instanceof CKEDITOR.dom.element?e.setAttribute("style",t):e instanceof CKEDITOR.htmlParser.element?e.attributes.style=t:e.style=t);
},toString:function(){
var e=[];
for(var t in n){
n[t]&&e.push(t,":",n[t],";");
}
return e.join("");
}};
},function(){
function e(e){
return function(t){
return t.type==CKEDITOR.NODE_ELEMENT&&("string"==typeof e?t.name==e:t.name in e);
};
};
var t=function(e,t){
return e=e[0],t=t[0],t>e?-1:e>t?1:0;
},n=CKEDITOR.htmlParser.fragment.prototype;
CKEDITOR.htmlParser.element.prototype=CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node,{type:CKEDITOR.NODE_ELEMENT,add:n.add,clone:function(){
return new CKEDITOR.htmlParser.element(this.name,this.attributes);
},filter:function(e,t){
var n,i,o=this;
if(t=o.getFilterContext(t),t.off){
return !0;
}
for(o.parent||e.onRoot(t,o);;){
if(n=o.name,!(i=e.onElementName(t,n))){
return this.remove(),!1;
}
if(o.name=i,!(o=e.onElement(t,o))){
return this.remove(),!1;
}
if(o!==this){
return this.replaceWith(o),!1;
}
if(o.name==n){
break;
}
if(o.type!=CKEDITOR.NODE_ELEMENT){
return this.replaceWith(o),!1;
}
if(!o.name){
return this.replaceWithChildren(),!1;
}
}
var a,r,s,l=o.attributes;
for(a in l){
for(s=a,r=l[a];;){
if(s=e.onAttributeName(t,a)){
if(s!=a){
delete l[a],a=s;
continue;
}
break;
}
delete l[a];
break;
}
s&&((r=e.onAttribute(t,o,s,r))===!1?delete l[s]:l[s]=r);
}
return o.isEmpty||this.filterChildren(e,!1,t),!0;
},filterChildren:n.filterChildren,writeHtml:function(e,n){
n&&this.filter(n);
var i,o,a,r,s=this.name,l=[],d=this.attributes;
e.openTag(s,d);
for(i in d){
l.push([i,d[i]]);
}
for(e.sortAttributes&&l.sort(t),a=0,r=l.length;r>a;a++){
o=l[a],e.attribute(o[0],o[1]);
}
e.openTagClose(s,this.isEmpty),this.writeChildrenHtml(e),this.isEmpty||e.closeTag(s);
},writeChildrenHtml:n.writeChildrenHtml,replaceWithChildren:function(){
for(var e=this.children,t=e.length;t;){
e[--t].insertAfter(this);
}
this.remove();
},forEach:n.forEach,getFirst:function(t){
if(!t){
return this.children.length?this.children[0]:null;
}
"function"!=typeof t&&(t=e(t));
for(var n=0,i=this.children.length;i>n;++n){
if(t(this.children[n])){
return this.children[n];
}
}
return null;
},getHtml:function(){
var e=new CKEDITOR.htmlParser.basicWriter;
return this.writeChildrenHtml(e),e.getHtml();
},setHtml:function(e){
for(var t=this.children=CKEDITOR.htmlParser.fragment.fromHtml(e).children,n=0,i=t.length;i>n;++n){
t[n].parent=this;
}
},getOuterHtml:function(){
var e=new CKEDITOR.htmlParser.basicWriter;
return this.writeHtml(e),e.getHtml();
},split:function(e){
for(var t=this.children.splice(e,this.children.length-e),n=this.clone(),i=0;i<t.length;++i){
t[i].parent=n;
}
return n.children=t,t[0]&&(t[0].previous=null),e>0&&(this.children[e-1].next=null),this.parent.add(n,this.getIndex()+1),n;
},addClass:function(e){
if(!this.hasClass(e)){
var t=this.attributes["class"]||"";
this.attributes["class"]=t+(t?" ":"")+e;
}
},removeClass:function(e){
var t=this.attributes["class"];
t&&(t=CKEDITOR.tools.trim(t.replace(new RegExp("(?:\\s+|^)"+e+"(?:\\s+|$)")," ")),t?this.attributes["class"]=t:delete this.attributes["class"]);
},hasClass:function(e){
var t=this.attributes["class"];
return t?new RegExp("(?:^|\\s)"+e+"(?=\\s|$)").test(t):!1;
},getFilterContext:function(e){
var t=[];
if(e||(e={off:!1,nonEditable:!1,nestedEditable:!1}),e.off||"off"!=this.attributes["data-cke-processor"]||t.push("off",!0),e.nonEditable||"false"!=this.attributes.contenteditable?e.nonEditable&&!e.nestedEditable&&"true"==this.attributes.contenteditable&&t.push("nestedEditable",!0):t.push("nonEditable",!0),t.length){
e=CKEDITOR.tools.copy(e);
for(var n=0;n<t.length;n+=2){
e[t[n]]=t[n+1];
}
}
return e;
}},!0);
}(),function(){
var e={},t=/{([^}]+)}/g,n=/([\\'])/g,i=/\n/g,o=/\r/g;
CKEDITOR.template=function(a){
if(e[a]){
this.output=e[a];
}else{
var r=a.replace(n,"\\$1").replace(i,"\\n").replace(o,"\\r").replace(t,function(e,t){
return "',data['"+t+"']==undefined?'{"+t+"}':data['"+t+"'],'";
});
r="return buffer?buffer.push('"+r+"'):['"+r+"'].join('');",this.output=e[a]=Function("data","buffer",r);
}
};
}(),delete CKEDITOR.loadFullCore,CKEDITOR.instances={},CKEDITOR.document=new CKEDITOR.dom.document(document),CKEDITOR.add=function(e){
CKEDITOR.instances[e.name]=e,e.on("focus",function(){
CKEDITOR.currentInstance!=e&&(CKEDITOR.currentInstance=e,CKEDITOR.fire("currentInstance"));
}),e.on("blur",function(){
CKEDITOR.currentInstance==e&&(CKEDITOR.currentInstance=null,CKEDITOR.fire("currentInstance"));
}),CKEDITOR.fire("instance",null,e);
},CKEDITOR.remove=function(e){
delete CKEDITOR.instances[e.name];
},function(){
var e={};
CKEDITOR.addTemplate=function(t,n){
var i=e[t];
if(i){
return i;
}
var o={name:t,source:n};
return CKEDITOR.fire("template",o),e[t]=new CKEDITOR.template(o.source);
},CKEDITOR.getTemplate=function(t){
return e[t];
};
}(),function(){
var e=[];
CKEDITOR.addCss=function(t){
e.push(t);
},CKEDITOR.getCss=function(){
return e.join("\n");
};
}(),CKEDITOR.on("instanceDestroyed",function(){
CKEDITOR.tools.isEmpty(this.instances)&&CKEDITOR.fire("reset");
}),CKEDITOR.TRISTATE_ON=1,CKEDITOR.TRISTATE_OFF=2,CKEDITOR.TRISTATE_DISABLED=0,function(){
CKEDITOR.inline=function(e,t){
if(!CKEDITOR.env.isCompatible){
return null;
}
if(e=CKEDITOR.dom.element.get(e),e.getEditor()){
throw "The editor instance \""+e.getEditor().name+"\" is already attached to the provided element.";
}
var n=new CKEDITOR.editor(t,e,CKEDITOR.ELEMENT_MODE_INLINE),i=e.is("textarea")?e:null;
return i?(n.setData(i.getValue(),null,!0),e=CKEDITOR.dom.element.createFromHtml("<div contenteditable=\""+!!n.readOnly+"\" class=\"cke_textarea_inline\">"+i.getValue()+"</div>",CKEDITOR.document),e.insertAfter(i),i.hide(),i.$.form&&n._attachToForm()):n.setData(e.getHtml(),null,!0),n.on("loaded",function(){
n.fire("uiReady"),n.editable(e),n.container=e,n.ui.contentsElement=e,n.setData(n.getData(1)),n.resetDirty(),n.fire("contentDom"),n.mode="wysiwyg",n.fire("mode"),n.status="ready",n.fireOnce("instanceReady"),CKEDITOR.fire("instanceReady",null,n);
},null,null,10000),n.on("destroy",function(){
i&&(n.container.clearCustomData(),n.container.remove(),i.show()),n.element.clearCustomData(),delete n.element;
}),n;
},CKEDITOR.inlineAll=function(){
var e,t;
for(var n in CKEDITOR.dtd.$editable){
for(var i=CKEDITOR.document.getElementsByTag(n),o=0,a=i.count();a>o;o++){
e=i.getItem(o),"true"==e.getAttribute("contenteditable")&&(t={element:e,config:{}},CKEDITOR.fire("inline",t)!==!1&&CKEDITOR.inline(e,t.config));
}
}
},CKEDITOR.domReady(function(){
!CKEDITOR.disableAutoInline&&CKEDITOR.inlineAll();
});
}(),CKEDITOR.replaceClass="ckeditor",function(){
function e(e,i,o,a){
if(!CKEDITOR.env.isCompatible){
return null;
}
if(e=CKEDITOR.dom.element.get(e),e.getEditor()){
throw "The editor instance \""+e.getEditor().name+"\" is already attached to the provided element.";
}
var r=new CKEDITOR.editor(i,e,a);
return a==CKEDITOR.ELEMENT_MODE_REPLACE&&(e.setStyle("visibility","hidden"),r._.required=e.hasAttribute("required"),e.removeAttribute("required")),o&&r.setData(o,null,!0),r.on("loaded",function(){
n(r),a==CKEDITOR.ELEMENT_MODE_REPLACE&&r.config.autoUpdateElement&&e.$.form&&r._attachToForm(),r.setMode(r.config.startupMode,function(){
r.resetDirty(),r.status="ready",r.fireOnce("instanceReady"),CKEDITOR.fire("instanceReady",null,r);
});
}),r.on("destroy",t),r;
};
function t(){
var e=this,t=e.container,n=e.element;
t&&(t.clearCustomData(),t.remove()),n&&(n.clearCustomData(),e.elementMode==CKEDITOR.ELEMENT_MODE_REPLACE&&(n.show(),e._.required&&n.setAttribute("required","required")),delete e.element);
};
function n(e){
var t=e.name,n=e.element,i=e.elementMode,o=e.fire("uiSpace",{space:"top",html:""}).html,a=e.fire("uiSpace",{space:"bottom",html:""}).html,r=new CKEDITOR.template("<{outerEl} id=\"cke_{name}\" class=\"{id} cke cke_reset cke_chrome cke_editor_{name} cke_{langDir} "+CKEDITOR.env.cssClass+"\"  dir=\"{langDir}\" lang=\"{langCode}\" role=\"application\""+(e.title?" aria-labelledby=\"cke_{name}_arialbl\"":"")+">"+(e.title?"<span id=\"cke_{name}_arialbl\" class=\"cke_voice_label\">{voiceLabel}</span>":"")+"<{outerEl} class=\"cke_inner cke_reset\" role=\"presentation\">{topHtml}<{outerEl} id=\"{contentId}\" class=\"cke_contents cke_reset\" role=\"presentation\"></{outerEl}>{bottomHtml}</{outerEl}></{outerEl}>"),s=CKEDITOR.dom.element.createFromHtml(r.output({id:e.id,name:t,langDir:e.lang.dir,langCode:e.langCode,voiceLabel:e.title,topHtml:o?"<span id=\""+e.ui.spaceId("top")+"\" class=\"cke_top cke_reset_all\" role=\"presentation\" style=\"height:auto\">"+o+"</span>":"",contentId:e.ui.spaceId("contents"),bottomHtml:a?"<span id=\""+e.ui.spaceId("bottom")+"\" class=\"cke_bottom cke_reset_all\" role=\"presentation\">"+a+"</span>":"",outerEl:CKEDITOR.env.ie?"span":"div"}));
i==CKEDITOR.ELEMENT_MODE_REPLACE?(n.hide(),s.insertAfter(n)):n.append(s),e.container=s,e.ui.contentsElement=e.ui.space("contents"),o&&e.ui.space("top").unselectable(),a&&e.ui.space("bottom").unselectable();
var l=e.config.width,d=e.config.height;
l&&s.setStyle("width",CKEDITOR.tools.cssLength(l)),d&&e.ui.space("contents").setStyle("height",CKEDITOR.tools.cssLength(d)),s.disableContextMenu(),CKEDITOR.env.webkit&&s.on("focus",function(){
e.focus();
}),e.fireOnce("uiReady");
};
CKEDITOR.replace=function(t,n){
return e(t,n,null,CKEDITOR.ELEMENT_MODE_REPLACE);
},CKEDITOR.appendTo=function(t,n,i){
return e(t,n,i,CKEDITOR.ELEMENT_MODE_APPENDTO);
},CKEDITOR.replaceAll=function(){
for(var e=document.getElementsByTagName("textarea"),t=0;t<e.length;t++){
var n=null,i=e[t];
if(i.name||i.id){
if("string"==typeof arguments[0]){
var o=new RegExp("(?:^|\\s)"+arguments[0]+"(?:$|\\s)");
if(!o.test(i.className)){
continue;
}
}else{
if("function"==typeof arguments[0]&&(n={},arguments[0](i,n)===!1)){
continue;
}
}
this.replace(i,n);
}
}
},CKEDITOR.editor.prototype.addMode=function(e,t){
(this._.modes||(this._.modes={}))[e]=t;
},CKEDITOR.editor.prototype.setMode=function(e,t){
var n=this,i=this._.modes;
if(e!=n.mode&&i&&i[e]){
if(n.fire("beforeSetMode",e),n.mode){
var o,a=n.checkDirty(),r=n._.previousModeData,s=0;
n.fire("beforeModeUnload"),n.editable(0),n._.previousMode=n.mode,n._.previousModeData=o=n.getData(1),"source"==n.mode&&r==o&&(n.fire("lockSnapshot",{forceUpdate:!0}),s=1),n.ui.space("contents").setHtml(""),n.mode="";
}else{
n._.previousModeData=n.getData(1);
}
this._.modes[e](function(){
n.mode=e,void 0!==a&&!a&&n.resetDirty(),s?n.fire("unlockSnapshot"):"wysiwyg"==e&&n.fire("saveSnapshot"),setTimeout(function(){
n.fire("mode"),t&&t.call(n);
},0);
});
}
},CKEDITOR.editor.prototype.resize=function(e,t,n,i){
var o,a=this.container,r=this.ui.space("contents"),s=CKEDITOR.env.webkit&&this.document&&this.document.getWindow().$.frameElement;
o=i?this.container.getFirst(function(e){
return e.type==CKEDITOR.NODE_ELEMENT&&e.hasClass("cke_inner");
}):a,o.setSize("width",e,!0),s&&(s.style.width="1%");
var l=(o.$.offsetHeight||0)-(r.$.clientHeight||0),d=Math.max(t-(n?0:l),0),c=n?t+l:t;
r.setStyle("height",d+"px"),s&&(s.style.width="100%"),this.fire("resize",{outerHeight:c,contentsHeight:d,outerWidth:e||o.getSize("width")});
},CKEDITOR.editor.prototype.getResizable=function(e){
return e?this.ui.space("contents"):this.container;
},CKEDITOR.domReady(function(){
CKEDITOR.replaceClass&&CKEDITOR.replaceAll(CKEDITOR.replaceClass);
});
}(),CKEDITOR.config.startupMode="wysiwyg",function(){
function e(e){
var n,a=e.editor,r=e.data.path,s=r.blockLimit,d=e.data.selection,c=d.getRanges()[0];
if(CKEDITOR.env.gecko||CKEDITOR.env.ie&&CKEDITOR.env.needsBrFiller){
var u=t(d,r);
u&&(u.appendBogus(),n=CKEDITOR.env.ie);
}
if(l(a,r.block,s)&&c.collapsed&&!c.getCommonAncestor().isReadOnly()){
var h=c.clone();
h.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS);
var f=new CKEDITOR.dom.walker(h);
if(f.guard=function(e){
return !i(e)||e.type==CKEDITOR.NODE_COMMENT||e.isReadOnly();
},!f.checkForward()||h.checkStartOfBlock()&&h.checkEndOfBlock()){
var m=c.fixBlock(!0,a.activeEnterMode==CKEDITOR.ENTER_DIV?"div":"p");
if(!CKEDITOR.env.needsBrFiller){
var g=m.getFirst(i);
g&&o(g)&&g.remove();
}
n=1,e.cancel();
}
}
n&&c.select();
};
function t(e,t){
if(e.isFake){
return 0;
}
var n=t.block||t.blockLimit,o=n&&n.getLast(i);
return !n||!n.isBlockBoundary()||o&&o.type==CKEDITOR.NODE_ELEMENT&&o.isBlockBoundary()||n.is("pre")||n.getBogus()?void 0:n;
};
function n(e){
var t=e.data.getTarget();
if(t.is("input")){
var n=t.getAttribute("type");
("submit"==n||"reset"==n)&&e.data.preventDefault();
}
};
function i(e){
return m(e)&&g(e);
};
function o(e){
return e.type==CKEDITOR.NODE_TEXT&&CKEDITOR.tools.trim(e.getText()).match(/^(?:&nbsp;|\xa0)$/);
};
function a(e,t){
return function(n){
var i=n.data.$.toElement||n.data.$.fromElement||n.data.$.relatedTarget;
i=i&&i.nodeType==CKEDITOR.NODE_ELEMENT?new CKEDITOR.dom.element(i):null,i&&(t.equals(i)||t.contains(i))||e.call(this,n);
};
};
function r(e){
var t,n=e.getElementsByTag("span"),i=0;
if(n){
for(;t=n.getItem(i++);){
if(!g(t)){
return !0;
}
}
}
return !1;
};
function s(e){
function t(e){
return function(t,o){
return o&&t.type==CKEDITOR.NODE_ELEMENT&&t.is(s)&&(n=t),o||!i(t)||e&&E(t)?void 0:!1;
};
};
var n,o=e.getRanges()[0],a=e.root,r=o.startPath(),s={table:1,ul:1,ol:1,dl:1};
if(r.contains(s)){
var l=o.clone();
l.collapse(1),l.setStartAt(a,CKEDITOR.POSITION_AFTER_START);
var d=new CKEDITOR.dom.walker(l);
if(d.guard=t(),d.checkBackward(),n){
return l=o.clone(),l.collapse(),l.setEndAt(n,CKEDITOR.POSITION_AFTER_END),d=new CKEDITOR.dom.walker(l),d.guard=t(!0),n=!1,d.checkForward(),n;
}
}
return null;
};
function l(e,t,n){
return e.config.autoParagraph!==!1&&e.activeEnterMode!=CKEDITOR.ENTER_BR&&(e.editable().equals(n)&&!t||t&&"true"==t.getAttribute("contenteditable"));
};
function d(e){
return e.activeEnterMode!=CKEDITOR.ENTER_BR&&e.config.autoParagraph!==!1?e.activeEnterMode==CKEDITOR.ENTER_DIV?"div":"p":!1;
};
function c(e){
var t=e.editor;
t.getSelection().scrollIntoView(),setTimeout(function(){
t.fire("saveSnapshot");
},0);
};
function u(e,t,n,i){
var o=i.block;
if(!o){
return !1;
}
if(!t[n?"checkStartOfBlock":"checkEndOfBlock"]()){
return !1;
}
if(!t.moveToClosestEditablePosition(o,!n)||!t.collapsed){
return !1;
}
if(t.startContainer.type==CKEDITOR.NODE_ELEMENT){
var a=t.startContainer.getChild(t.startOffset-(n?1:0));
if(a&&a.type==CKEDITOR.NODE_ELEMENT&&a.is("hr")){
return e.fire("saveSnapshot"),a.remove(),!0;
}
}
var r=t.startPath().block;
if(!(!r||r&&r.contains(o))){
e.fire("saveSnapshot");
var s;
(s=(n?r:o).getBogus())&&s.remove();
var l=e.getSelection(),d=l.createBookmarks();
return (n?o:r).moveChildren(n?r:o,!1),i.lastElement.mergeSiblings(),f(o,r,!n),l.selectBookmarks(d),!0;
}
};
function h(e,t,n){
var i=n.block,o=t.endPath(),a=o.block;
if(!i||!a||i.equals(a)){
return !1;
}
e.fire("saveSnapshot");
var r;
return (r=i.getBogus())&&r.remove(),t.enlarge(CKEDITOR.ENLARGE_INLINE),t.deleteContents(),a.getParent()&&(a.moveChildren(i,!1),n.lastElement.mergeSiblings(),f(i,a,!0)),t=e.getSelection().getRanges()[0],t.collapse(1),t.optimize(),""===t.startContainer.getHtml()&&t.startContainer.appendBogus(),t.select(),!0;
};
function f(e,t,n){
for(var i=e.getCommonAncestor(t),o=n?t:e,a=o;(o=o.getParent())&&!i.equals(o)&&1==o.getChildCount();){
a=o;
}
a.remove();
};
CKEDITOR.editable=CKEDITOR.tools.createClass({base:CKEDITOR.dom.element,$:function(e,t){
this.base(t.$||t),this.editor=e,this.status="unloaded",this.hasFocus=!1,this.setup();
},proto:{focus:function(){
var e;
if(CKEDITOR.env.webkit&&!this.hasFocus&&(e=this.editor._.previousActive||this.getDocument().getActive(),this.contains(e))){
return void e.focus();
}
try{
this.$[CKEDITOR.env.ie&&this.getDocument().equals(CKEDITOR.document)?"setActive":"focus"]();
}
catch(t){
if(!CKEDITOR.env.ie){
throw t;
}
}
CKEDITOR.env.safari&&!this.isInline()&&(e=CKEDITOR.document.getActive(),e.equals(this.getWindow().getFrame())||this.getWindow().focus());
},on:function(e,t){
var n=Array.prototype.slice.call(arguments,0);
return CKEDITOR.env.ie&&/^focus|blur$/.exec(e)&&(e="focus"==e?"focusin":"focusout",t=a(t,this),n[0]=e,n[1]=t),CKEDITOR.dom.element.prototype.on.apply(this,n);
},attachListener:function(e){
!this._.listeners&&(this._.listeners=[]);
var t=Array.prototype.slice.call(arguments,1),n=e.on.apply(e,t);
return this._.listeners.push(n),n;
},clearListeners:function(){
var e=this._.listeners;
try{
for(;e.length;){
e.pop().removeListener();
}
}
catch(t){
}
},restoreAttrs:function(){
var e,t=this._.attrChanges;
for(var n in t){
t.hasOwnProperty(n)&&(e=t[n],null!==e?this.setAttribute(n,e):this.removeAttribute(n));
}
},attachClass:function(e){
var t=this.getCustomData("classes");
this.hasClass(e)||(!t&&(t=[]),t.push(e),this.setCustomData("classes",t),this.addClass(e));
},changeAttr:function(e,t){
var n=this.getAttribute(e);
t!==n&&(!this._.attrChanges&&(this._.attrChanges={}),e in this._.attrChanges||(this._.attrChanges[e]=n),this.setAttribute(e,t));
},insertText:function(e){
this.editor.focus(),this.insertHtml(this.transformPlainTextToHtml(e),"text");
},transformPlainTextToHtml:function(e){
var t=this.editor.getSelection().getStartElement().hasAscendant("pre",!0)?CKEDITOR.ENTER_BR:this.editor.activeEnterMode;
return CKEDITOR.tools.transformPlainTextToHtml(e,t);
},insertHtml:function(e,t,n){
var i=this.editor;
i.focus(),i.fire("saveSnapshot"),n||(n=i.getSelection().getRanges()[0]),C(this,t||"html",e,n),n.select(),c(this),this.editor.fire("afterInsertHtml",{});
},insertHtmlIntoRange:function(e,t,n){
C(this,n||"html",e,t),this.editor.fire("afterInsertHtml",{intoRange:t});
},insertElement:function(e,t){
var n=this.editor;
n.focus(),n.fire("saveSnapshot");
var o=n.activeEnterMode,a=n.getSelection(),r=e.getName(),s=CKEDITOR.dtd.$block[r];
if(t||(t=a.getRanges()[0]),this.insertElementIntoRange(e,t)&&(t.moveToPosition(e,CKEDITOR.POSITION_AFTER_END),s)){
var l=e.getNext(function(e){
return i(e)&&!E(e);
});
l&&l.type==CKEDITOR.NODE_ELEMENT&&l.is(CKEDITOR.dtd.$block)?l.getDtd()["#"]?t.moveToElementEditStart(l):t.moveToElementEditEnd(e):l||o==CKEDITOR.ENTER_BR||(l=t.fixBlock(!0,o==CKEDITOR.ENTER_DIV?"div":"p"),t.moveToElementEditStart(l));
}
a.selectRanges([t]),c(this);
},insertElementIntoSelection:function(e){
this.insertElement(e);
},insertElementIntoRange:function(e,t){
var n=this.editor,i=n.config.enterMode,o=e.getName(),a=CKEDITOR.dtd.$block[o];
if(t.checkReadOnly()){
return !1;
}
t.deleteContents(1),t.startContainer.type==CKEDITOR.NODE_ELEMENT&&t.startContainer.is({tr:1,table:1,tbody:1,thead:1,tfoot:1})&&v(t);
var r,s;
if(a){
for(;(r=t.getCommonAncestor(0,1))&&(s=CKEDITOR.dtd[r.getName()])&&(!s||!s[o]);){
r.getName() in CKEDITOR.dtd.span?t.splitElement(r):t.checkStartOfBlock()&&t.checkEndOfBlock()?(t.setStartBefore(r),t.collapse(!0),r.remove()):t.splitBlock(i==CKEDITOR.ENTER_DIV?"div":"p",n.editable());
}
}
return t.insertNode(e),!0;
},setData:function(e,t){
t||(e=this.editor.dataProcessor.toHtml(e)),this.setHtml(e),this.fixInitialSelection(),"unloaded"==this.status&&(this.status="ready"),this.editor.fire("dataReady");
},getData:function(e){
var t=this.getHtml();
return e||(t=this.editor.dataProcessor.toDataFormat(t)),t;
},setReadOnly:function(e){
this.setAttribute("contenteditable",!e);
},detach:function(){
this.removeClass("cke_editable"),this.status="detached";
var e=this.editor;
this._.detach(),delete e.document,delete e.window;
},isInline:function(){
return this.getDocument().equals(CKEDITOR.document);
},fixInitialSelection:function(){
function e(){
var e=i.getDocument().$,n=e.getSelection();
if(t(n)){
var o=new CKEDITOR.dom.range(i);
o.moveToElementEditStart(i);
var a=e.createRange();
a.setStart(o.startContainer.$,o.startOffset),a.collapse(!0),n.removeAllRanges(),n.addRange(a);
}
};
function t(e){
if(e.anchorNode&&e.anchorNode==i.$){
return !0;
}
if(CKEDITOR.env.webkit){
var t=i.getDocument().getActive();
if(t&&t.equals(i)&&!e.anchorNode){
return !0;
}
}
};
function n(){
var e=i.getDocument().$,t=e.selection,n=i.getDocument().getActive();
if("None"==t.type&&n.equals(i)){
var o,a=new CKEDITOR.dom.range(i),r=e.body.createTextRange();
a.moveToElementEditStart(i),o=a.startContainer,o.type!=CKEDITOR.NODE_ELEMENT&&(o=o.getParent()),r.moveToElementText(o.$),r.collapse(!0),r.select();
}
};
var i=this;
return CKEDITOR.env.ie&&(CKEDITOR.env.version<9||CKEDITOR.env.quirks)?void (this.hasFocus&&(this.focus(),n())):void (this.hasFocus?(this.focus(),e()):this.once("focus",function(){
e();
},null,null,-999));
},getHtmlFromRange:function(e){
if(e.collapsed){
return new CKEDITOR.dom.documentFragment(e.document);
}
var t={doc:this.getDocument(),range:e.clone()};
return I.eol.detect(t,this),I.bogus.exclude(t),I.cell.shrink(t),t.fragment=t.range.cloneContents(),I.tree.rebuild(t,this),I.eol.fix(t,this),new CKEDITOR.dom.documentFragment(t.fragment.$);
},extractHtmlFromRange:function(e,t){
var n=O,i={range:e,doc:e.document},o=this.getHtmlFromRange(e);
if(e.collapsed){
return e.optimize(),o;
}
e.enlarge(CKEDITOR.ENLARGE_INLINE,1),n.table.detectPurge(i),i.bookmark=e.createBookmark(),delete i.range;
var a=this.editor.createRange();
if(a.moveToPosition(i.bookmark.startNode,CKEDITOR.POSITION_BEFORE_START),i.targetBookmark=a.createBookmark(),n.list.detectMerge(i,this),n.table.detectRanges(i,this),n.block.detectMerge(i,this),i.tableContentsRanges?(n.table.deleteRanges(i),e.moveToBookmark(i.bookmark),i.range=e):(e.moveToBookmark(i.bookmark),i.range=e,e.extractContents(n.detectExtractMerge(i))),e.moveToBookmark(i.targetBookmark),e.optimize(),n.fixUneditableRangePosition(e),n.list.merge(i,this),n.table.purge(i,this),n.block.merge(i,this),t){
var s=e.startPath();
e.checkStartOfBlock()&&e.checkEndOfBlock()&&s.block&&!e.root.equals(s.block)&&!r(s.block)&&(e.moveToPosition(s.block,CKEDITOR.POSITION_BEFORE_START),s.block.remove());
}else{
n.autoParagraph(this.editor,e),p(e.startContainer)&&e.startContainer.appendBogus();
}
return e.startContainer.mergeSiblings(),o;
},setup:function(){
var e=this.editor;
this.attachListener(e,"beforeGetData",function(){
var t=this.getData();
this.is("textarea")||e.config.ignoreEmptyParagraph!==!1&&(t=t.replace(T,function(e,t){
return t;
})),e.setData(t,null,1);
},this),this.attachListener(e,"getSnapshot",function(e){
e.data=this.getData(1);
},this),this.attachListener(e,"afterSetData",function(){
this.setData(e.getData(1));
},this),this.attachListener(e,"loadSnapshot",function(e){
this.setData(e.data,1);
},this),this.attachListener(e,"beforeFocus",function(){
var t=e.getSelection(),n=t&&t.getNative();
n&&"Control"==n.type||this.focus();
},this),this.attachListener(e,"insertHtml",function(e){
this.insertHtml(e.data.dataValue,e.data.mode,e.data.range);
},this),this.attachListener(e,"insertElement",function(e){
this.insertElement(e.data);
},this),this.attachListener(e,"insertText",function(e){
this.insertText(e.data);
},this),this.setReadOnly(e.readOnly),this.attachClass("cke_editable"),e.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?this.attachClass("cke_editable_inline"):(e.elementMode==CKEDITOR.ELEMENT_MODE_REPLACE||e.elementMode==CKEDITOR.ELEMENT_MODE_APPENDTO)&&this.attachClass("cke_editable_themed"),this.attachClass("cke_contents_"+e.config.contentsLangDirection);
var t=e.keystrokeHandler;
if(t.blockedKeystrokes[8]=+e.readOnly,e.keystrokeHandler.attach(this),this.on("blur",function(){
this.hasFocus=!1;
},null,null,-1),this.on("focus",function(){
this.hasFocus=!0;
},null,null,-1),e.focusManager.add(this),this.equals(CKEDITOR.document.getActive())&&(this.hasFocus=!0,e.once("contentDom",function(){
e.focusManager.focus(this);
},this)),this.isInline()&&this.changeAttr("tabindex",e.tabIndex),!this.is("textarea")){
e.document=this.getDocument(),e.window=this.getWindow();
var o=e.document;
this.changeAttr("spellcheck",!e.config.disableNativeSpellChecker);
var a=e.config.contentsLangDirection;
this.getDirection(1)!=a&&this.changeAttr("dir",a);
var r=CKEDITOR.getCss();
if(r){
var l=o.getHead();
if(!l.getCustomData("stylesheet")){
var d=o.appendStyleText(r);
d=new CKEDITOR.dom.element(d.ownerNode||d.owningElement),l.setCustomData("stylesheet",d),d.data("cke-temp",1);
}
}
var c=o.getCustomData("stylesheet_ref")||0;
o.setCustomData("stylesheet_ref",c+1),this.setCustomData("cke_includeReadonly",!e.config.disableReadonlyStyling),this.attachListener(this,"click",function(e){
e=e.data;
var t=new CKEDITOR.dom.elementPath(e.getTarget(),this).contains("a");
t&&2!=e.$.button&&t.isReadOnly()&&e.preventDefault();
});
var f={8:1,46:1};
this.attachListener(e,"key",function(t){
if(e.readOnly){
return !0;
}
var n,i=t.data.domEvent.getKey();
if(i in f){
var o,a,r,l,d=e.getSelection(),c=d.getRanges()[0],u=c.startPath(),h=8==i;
CKEDITOR.env.ie&&CKEDITOR.env.version<11&&(o=d.getSelectedElement())||(o=s(d))?(e.fire("saveSnapshot"),c.moveToPosition(o,CKEDITOR.POSITION_BEFORE_START),o.remove(),c.select(),e.fire("saveSnapshot"),n=1):c.collapsed&&((a=u.block)&&(l=a[h?"getPrevious":"getNext"](m))&&l.type==CKEDITOR.NODE_ELEMENT&&l.is("table")&&c[h?"checkStartOfBlock":"checkEndOfBlock"]()?(e.fire("saveSnapshot"),c[h?"checkEndOfBlock":"checkStartOfBlock"]()&&a.remove(),c["moveToElementEdit"+(h?"End":"Start")](l),c.select(),e.fire("saveSnapshot"),n=1):u.blockLimit&&u.blockLimit.is("td")&&(r=u.blockLimit.getAscendant("table"))&&c.checkBoundaryOfElement(r,h?CKEDITOR.START:CKEDITOR.END)&&(l=r[h?"getPrevious":"getNext"](m))?(e.fire("saveSnapshot"),c["moveToElementEdit"+(h?"End":"Start")](l),c.checkStartOfBlock()&&c.checkEndOfBlock()?l.remove():c.select(),e.fire("saveSnapshot"),n=1):(r=u.contains(["td","th","caption"]))&&c.checkBoundaryOfElement(r,h?CKEDITOR.START:CKEDITOR.END)&&(n=1));
}
return !n;
}),e.blockless&&CKEDITOR.env.ie&&CKEDITOR.env.needsBrFiller&&this.attachListener(this,"keyup",function(t){
if(t.data.getKeystroke() in f&&!this.getFirst(i)){
this.appendBogus();
var n=e.createRange();
n.moveToPosition(this,CKEDITOR.POSITION_AFTER_START),n.select();
}
}),this.attachListener(this,"dblclick",function(t){
if(e.readOnly){
return !1;
}
var n={element:t.data.getTarget()};
e.fire("doubleclick",n);
}),CKEDITOR.env.ie&&this.attachListener(this,"click",n),(!CKEDITOR.env.ie||CKEDITOR.env.edge)&&this.attachListener(this,"mousedown",function(t){
var n=t.data.getTarget();
n.is("img","hr","input","textarea","select")&&!n.isReadOnly()&&(e.getSelection().selectElement(n),n.is("input","textarea","select")&&t.data.preventDefault());
}),CKEDITOR.env.edge&&this.attachListener(this,"mouseup",function(t){
var n=t.data.getTarget();
n&&n.is("img")&&e.getSelection().selectElement(n);
}),CKEDITOR.env.gecko&&this.attachListener(this,"mouseup",function(t){
if(2==t.data.$.button){
var n=t.data.getTarget();
if(!n.getOuterHtml().replace(T,"")){
var i=e.createRange();
i.moveToElementEditStart(n),i.select(!0);
}
}
}),CKEDITOR.env.webkit&&(this.attachListener(this,"click",function(e){
e.data.getTarget().is("input","select")&&e.data.preventDefault();
}),this.attachListener(this,"mouseup",function(e){
e.data.getTarget().is("input","textarea")&&e.data.preventDefault();
})),CKEDITOR.env.webkit&&this.attachListener(e,"key",function(t){
if(e.readOnly){
return !0;
}
var n=t.data.domEvent.getKey();
if(n in f){
var i=8==n,o=e.getSelection().getRanges()[0],a=o.startPath();
if(o.collapsed){
if(!u(e,o,i,a)){
return;
}
}else{
if(!h(e,o,a)){
return;
}
}
return e.getSelection().scrollIntoView(),e.fire("saveSnapshot"),!1;
}
},this,null,100);
}
}},_:{detach:function(){
this.editor.setData(this.editor.getData(),0,1),this.clearListeners(),this.restoreAttrs();
var e;
if(e=this.removeCustomData("classes")){
for(;e.length;){
this.removeClass(e.pop());
}
}
if(!this.is("textarea")){
var t=this.getDocument(),n=t.getHead();
if(n.getCustomData("stylesheet")){
var i=t.getCustomData("stylesheet_ref");
if(--i){
t.setCustomData("stylesheet_ref",i);
}else{
t.removeCustomData("stylesheet_ref");
var o=n.removeCustomData("stylesheet");
o.remove();
}
}
}
this.editor.fire("contentDomUnload"),delete this.editor;
}}}),CKEDITOR.editor.prototype.editable=function(e){
var t=this._.editable;
return t&&e?0:(arguments.length&&(t=this._.editable=e?e instanceof CKEDITOR.editable?e:new CKEDITOR.editable(this,e):(t&&t.detach(),null)),t);
},CKEDITOR.on("instanceLoaded",function(t){
var n=t.editor;
n.on("insertElement",function(e){
var t=e.data;
t.type==CKEDITOR.NODE_ELEMENT&&(t.is("input")||t.is("textarea"))&&("false"!=t.getAttribute("contentEditable")&&t.data("cke-editable",t.hasAttribute("contenteditable")?"true":"1"),t.setAttribute("contentEditable",!1));
}),n.on("selectionChange",function(t){
if(!n.readOnly){
var i=n.getSelection();
if(i&&!i.isLocked){
var o=n.checkDirty();
n.fire("lockSnapshot"),e(t),n.fire("unlockSnapshot"),!o&&n.resetDirty();
}
}
});
}),CKEDITOR.on("instanceCreated",function(e){
var t=e.editor;
t.on("mode",function(){
var e=t.editable();
if(e&&e.isInline()){
var n=t.title;
e.changeAttr("role","textbox"),e.changeAttr("aria-label",n),n&&e.changeAttr("title",n);
var i=t.fire("ariaEditorHelpLabel",{}).label;
if(i){
var o=this.ui.space(this.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?"top":"contents");
if(o){
var a=CKEDITOR.tools.getNextId(),r=CKEDITOR.dom.element.createFromHtml("<span id=\""+a+"\" class=\"cke_voice_label\">"+i+"</span>");
o.append(r),e.changeAttr("aria-describedby",a);
}
}
}
});
}),CKEDITOR.addCss(".cke_editable{cursor:text}.cke_editable img,.cke_editable input,.cke_editable textarea{cursor:default}");
var m=CKEDITOR.dom.walker.whitespaces(!0),g=CKEDITOR.dom.walker.bookmark(!1,!0),p=CKEDITOR.dom.walker.empty(),E=CKEDITOR.dom.walker.bogus(),T=/(^|<body\b[^>]*>)\s*<(p|div|address|h\d|center|pre)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\2>)?\s*(?=$|<\/body>)/gi,C=function(){
"use strict";
function e(e,i,r,s){
var l=e.editor,d=!1;
if("unfiltered_html"==i&&(i="html",d=!0),!s.checkReadOnly()){
var c=new CKEDITOR.dom.elementPath(s.startContainer,s.root),u=c.blockLimit||s.root,h={type:i,dontFilter:d,editable:e,editor:l,range:s,blockLimit:u,mergeCandidates:[],zombies:[]};
t(h),r&&n(h,r)&&o(h),a(h);
}
};
function t(e){
var t,n,o,a,s,l,d,c=e.range,u=e.mergeCandidates;
if("text"==e.type&&c.shrink(CKEDITOR.SHRINK_ELEMENT,!0,!1)&&(n=CKEDITOR.dom.element.createFromHtml("<span>&nbsp;</span>",c.document),c.insertNode(n),c.setStartAfter(n)),a=new CKEDITOR.dom.elementPath(c.startContainer),e.endPath=s=new CKEDITOR.dom.elementPath(c.endContainer),!c.collapsed){
t=s.block||s.blockLimit;
var m=c.getCommonAncestor();
t&&!t.equals(m)&&!t.contains(m)&&c.checkEndOfBlock()&&e.zombies.push(t),c.deleteContents();
}
for(;(l=h(c))&&r(l)&&l.isBlockBoundary()&&a.contains(l);){
c.moveToPosition(l,CKEDITOR.POSITION_BEFORE_END);
}
for(g(c,e.blockLimit,a,s),n&&(c.setEndBefore(n),c.collapse(),n.remove()),o=c.startPath(),(t=o.contains(f,!1,1))&&(c.splitElement(t),e.inlineStylesRoot=t,e.inlineStylesPeak=o.lastElement),d=c.createBookmark(),t=d.startNode.getPrevious(i),t&&r(t)&&f(t)&&u.push(t),t=d.startNode.getNext(i),t&&r(t)&&f(t)&&u.push(t),t=d.startNode;(t=t.getParent())&&f(t);){
u.push(t);
}
c.moveToBookmark(d);
};
function n(e,t){
var n=e.range;
"text"==e.type&&e.inlineStylesRoot&&(t=C(t,e));
var i=e.blockLimit.getName();
if(/^\s+|\s+$/.test(t)&&"span" in CKEDITOR.dtd[i]){
var o="<span data-cke-marker=\"1\">&nbsp;</span>";
t=o+t+o;
}
t=e.editor.dataProcessor.toHtml(t,{context:null,fixForBody:!1,protectedWhitespaces:!!o,dontFilter:e.dontFilter,filter:e.editor.activeFilter,enterMode:e.editor.activeEnterMode});
var a=n.document,r=a.createElement("body");
r.setHtml(t),o&&(r.getFirst().remove(),r.getLast().remove());
var s=n.startPath().block;
return !s||1==s.getChildCount()&&s.getBogus()||T(r),e.dataWrapper=r,t;
};
function o(e){
var t,n,i,o,a,r,u,h,f,g,T,C=e.range,I=C.document,O=e.blockLimit,D=0,b=[],R=0,y=0,K=C.startContainer,_c=e.endPath.elements[0],k=_c.getPosition(K),w=!(!_c.getCommonAncestor(K)||k==CKEDITOR.POSITION_IDENTICAL||k&CKEDITOR.POSITION_CONTAINS+CKEDITOR.POSITION_IS_CONTAINED);
for(n=s(e.dataWrapper,e),p(n,C);D<n.length;D++){
if(i=n[D],i.isLineBreak&&E(C,O,i)){
y=D>0;
}else{
if(t=C.startPath(),!i.isBlock&&l(e.editor,t.block,t.blockLimit)&&(u=d(e.editor))&&(u=I.createElement(u),u.appendBogus(),C.insertNode(u),CKEDITOR.env.needsBrFiller&&(a=u.getBogus())&&a.remove(),C.moveToPosition(u,CKEDITOR.POSITION_BEFORE_END)),o=C.startPath().block,o&&!o.equals(r)&&(a=o.getBogus(),a&&(a.remove(),b.push(o)),r=o),i.firstNotAllowed&&(R=1),R&&i.isElement){
for(h=C.startContainer,f=null;h&&!v[h.getName()][i.name];){
if(h.equals(O)){
h=null;
break;
}
f=h,h=h.getParent();
}
h?f&&(g=C.splitElement(f),e.zombies.push(g),e.zombies.push(f)):T=c(i.node,O.getName(),!D,D==n.length-1);
}
if(T){
for(;o=T.pop();){
C.insertNode(o);
}
T=0;
}else{
C.insertNode(i.node);
}
i.lastNotAllowed&&D<n.length-1&&(g=w?_c:g,g&&C.setEndAt(g,CKEDITOR.POSITION_AFTER_START),R=0),C.collapse();
}
}
m(n)&&(y=!0,o=n[0].node,C.setStartAt(o,CKEDITOR.POSITION_BEFORE_START),C.setEndAt(o,CKEDITOR.POSITION_AFTER_END)),e.dontMoveCaret=y,e.bogusNeededBlocks=b;
};
function a(e){
for(var t,n,o,a=e.range,s=e.bogusNeededBlocks,l=a.createBookmark();t=e.zombies.pop();){
t.getParent()&&(n=a.clone(),n.moveToElementEditStart(t),n.removeEmptyBlocksAtEnd());
}
if(s){
for(;t=s.pop();){
CKEDITOR.env.needsBrFiller?t.appendBogus():t.append(a.document.createText("\xa0"));
}
}
for(;t=e.mergeCandidates.pop();){
t.mergeSiblings();
}
if(a.moveToBookmark(l),!e.dontMoveCaret){
for(t=h(a);t&&r(t)&&!t.is(v.$empty);){
if(t.isBlockBoundary()){
a.moveToPosition(t,CKEDITOR.POSITION_BEFORE_END);
}else{
if(f(t)&&t.getHtml().match(/(\s|&nbsp;)$/g)){
o=null;
break;
}
o=a.clone(),o.moveToPosition(t,CKEDITOR.POSITION_BEFORE_END);
}
t=t.getLast(i);
}
o&&a.moveToRange(o);
}
};
function r(e){
return e.type==CKEDITOR.NODE_ELEMENT;
};
function s(e,t){
for(var n,i,o,a,l,d=[],c=t.range.startContainer,u=t.range.startPath(),h=v[c.getName()],f=0,m=e.getChildren(),g=m.count(),p=-1,E=-1,T=0,C=u.contains(v.$list);g>f;++f){
if(n=m.getItem(f),r(n)){
if(o=n.getName(),C&&o in CKEDITOR.dtd.$list){
d=d.concat(s(n,t));
continue;
}
a=!!h[o],"br"!=o||!n.data("cke-eol")||f&&f!=g-1||(i=f?d[f-1].node:m.getItem(f+1),T=i&&(!r(i)||!i.is("br")),l=i&&r(i)&&v.$block[i.getName()]),-1!=p||a||(p=f),a||(E=f),d.push({isElement:1,isLineBreak:T,isBlock:n.isBlockBoundary(),hasBlockSibling:l,node:n,name:o,allowed:a}),T=0,l=0;
}else{
d.push({isElement:0,node:n,allowed:1});
}
}
return p>-1&&(d[p].firstNotAllowed=1),E>-1&&(d[E].lastNotAllowed=1),d;
};
function c(e,t,n,i){
for(var o,a=u(e,t),r=[],s=a.length,l=0,d=0,c=-1;s>l;l++){
o=a[l]," "==o?(d||n&&!l||(r.push(new CKEDITOR.dom.text(" ")),c=r.length),d=1):(r.push(o),d=0);
}
return i&&c==r.length&&r.pop(),r;
};
function u(e,t){
var n,i=[],o=e.getChildren(),a=o.count(),s=0,l=v[t],d=!e.is(v.$inline)||e.is("br");
for(d&&i.push(" ");a>s;s++){
n=o.getItem(s),r(n)&&!n.is(l)?i=i.concat(u(n,t)):i.push(n);
}
return d&&i.push(" "),i;
};
function h(e){
return r(e.startContainer)&&e.startContainer.getChild(e.startOffset-1);
};
function f(e){
return e&&r(e)&&(e.is(v.$removeEmpty)||e.is("a")&&!e.isBlockBoundary());
};
function m(e){
if(1!=e.length){
return !1;
}
var t=e[0];
return t.isElement&&"false"==t.node.getAttribute("contenteditable");
};
function g(e,t,n,i){
var o,a,s,l=e.clone();
l.setEndAt(t,CKEDITOR.POSITION_BEFORE_END),o=new CKEDITOR.dom.walker(l),(a=o.next())&&r(a)&&I[a.getName()]&&(s=a.getPrevious())&&r(s)&&!s.getParent().equals(e.startContainer)&&n.contains(s)&&i.contains(a)&&a.isIdentical(s)&&(a.moveChildren(s),a.remove(),g(e,t,n,i));
};
function p(e,t){
function n(e,t){
return t.isBlock&&t.isElement&&!t.node.is("br")&&r(e)&&e.is("br")?(e.remove(),1):void 0;
};
var i=t.endContainer.getChild(t.endOffset),o=t.endContainer.getChild(t.endOffset-1);
i&&n(i,e[e.length-1]),o&&n(o,e[0])&&(t.setEnd(t.endContainer,t.endOffset-1),t.collapse());
};
function E(e,t,n){
var i,o;
if(n.hasBlockSibling){
return 1;
}
if(i=e.startContainer.getAscendant(v.$block,1),!i||!i.is({div:1,p:1})){
return 0;
}
if(o=i.getPosition(t),o==CKEDITOR.POSITION_IDENTICAL||o==CKEDITOR.POSITION_CONTAINS){
return 0;
}
var a=e.splitElement(i);
return e.moveToPosition(a,CKEDITOR.POSITION_AFTER_START),1;
};
function T(e){
var t,n;
if(1==e.getChildCount()&&r(t=e.getFirst())&&t.is(O)&&!t.hasAttribute("contenteditable")){
n=t.getElementsByTag("*");
for(var i,o=0,a=n.count();a>o;o++){
if(i=n.getItem(o),!i.is(D)){
return;
}
}
t.moveChildren(t.getParent(1)),t.remove();
}
};
function C(e,t){
for(var n=t.inlineStylesPeak,i=n.getDocument(),o=i.createText("{cke-peak}"),a=t.inlineStylesRoot.getParent();!n.equals(a);){
o=o.appendTo(n.clone()),n=n.getParent();
}
return o.getOuterHtml().split("{cke-peak}").join(e);
};
var v=CKEDITOR.dtd,I={p:1,div:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,ul:1,ol:1,li:1,pre:1,dl:1,blockquote:1},O={p:1,div:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1},D=CKEDITOR.tools.extend({},v.$inline);
return delete D.br,e;
}(),v=function(){
function e(e){
var t=new CKEDITOR.dom.walker(e);
return t.guard=function(e,t){
return t?!1:e.type==CKEDITOR.NODE_ELEMENT?e.is(CKEDITOR.dtd.$tableContent):void 0;
},t.evaluator=function(e){
return e.type==CKEDITOR.NODE_ELEMENT;
},t;
};
function t(e,t,n){
var i=e.getDocument().createElement(t);
return e.append(i,n),i;
};
function n(e){
var t,n=e.count();
for(n;n-->0;){
t=e.getItem(n),CKEDITOR.tools.trim(t.getHtml())||(t.appendBogus(),CKEDITOR.env.ie&&CKEDITOR.env.version<9&&t.getChildCount()&&t.getFirst().remove());
}
};
return function(i){
var o,a,r=i.startContainer,s=r.getAscendant("table",1),l=!1;
if(n(s.getElementsByTag("td")),n(s.getElementsByTag("th")),o=i.clone(),o.setStart(r,0),a=e(o).lastBackward(),a||(o=i.clone(),o.setEndAt(r,CKEDITOR.POSITION_BEFORE_END),a=e(o).lastForward(),l=!0),a||(a=r),a.is("table")){
return i.setStartAt(a,CKEDITOR.POSITION_BEFORE_START),i.collapse(!0),void a.remove();
}
a.is({tbody:1,thead:1,tfoot:1})&&(a=t(a,"tr",l)),a.is("tr")&&(a=t(a,a.getParent().is("thead")?"th":"td",l));
var d=a.getBogus();
d&&d.remove(),i.moveToPosition(a,l?CKEDITOR.POSITION_AFTER_START:CKEDITOR.POSITION_BEFORE_END);
};
}(),I={eol:{detect:function(e,t){
var n=e.range,i=n.clone(),o=n.clone(),a=new CKEDITOR.dom.elementPath(n.startContainer,t),r=new CKEDITOR.dom.elementPath(n.endContainer,t);
i.collapse(1),o.collapse(),a.block&&i.checkBoundaryOfElement(a.block,CKEDITOR.END)&&(n.setStartAfter(a.block),e.prependEolBr=1),r.block&&o.checkBoundaryOfElement(r.block,CKEDITOR.START)&&(n.setEndBefore(r.block),e.appendEolBr=1);
},fix:function(e,t){
var n,i=t.getDocument();
e.appendEolBr&&(n=this.createEolBr(i),e.fragment.append(n)),!e.prependEolBr||n&&!n.getPrevious()||e.fragment.append(this.createEolBr(i),1);
},createEolBr:function(e){
return e.createElement("br",{attributes:{"data-cke-eol":1}});
}},bogus:{exclude:function(e){
var t=e.range.getBoundaryNodes(),n=t.startNode,i=t.endNode;
!i||!E(i)||n&&n.equals(i)||e.range.setEndBefore(i);
}},tree:{rebuild:function(e,t){
var n,i=e.range,o=i.getCommonAncestor(),a=new CKEDITOR.dom.elementPath(o,t),r=new CKEDITOR.dom.elementPath(i.startContainer,t),s=new CKEDITOR.dom.elementPath(i.endContainer,t);
if(o.type==CKEDITOR.NODE_TEXT&&(o=o.getParent()),a.blockLimit.is({tr:1,table:1})){
var l=a.contains("table").getParent();
n=function(e){
return !e.equals(l);
};
}else{
if(a.block&&a.block.is(CKEDITOR.dtd.$listItem)){
var d=r.contains(CKEDITOR.dtd.$list),c=s.contains(CKEDITOR.dtd.$list);
if(!d.equals(c)){
var u=a.contains(CKEDITOR.dtd.$list).getParent();
n=function(e){
return !e.equals(u);
};
}
}
}
n||(n=function(e){
return !e.equals(a.block)&&!e.equals(a.blockLimit);
}),this.rebuildFragment(e,t,o,n);
},rebuildFragment:function(e,t,n,i){
for(var o;n&&!n.equals(t)&&i(n);){
o=n.clone(0,1),e.fragment.appendTo(o),e.fragment=o,n=n.getParent();
}
}},cell:{shrink:function(e){
var t=e.range,n=t.startContainer,i=t.endContainer,o=t.startOffset,a=t.endOffset;
n.type==CKEDITOR.NODE_ELEMENT&&n.equals(i)&&n.is("tr")&&++o==a&&t.shrink(CKEDITOR.SHRINK_TEXT);
}}},O=function(){
function e(e,t){
var n=e.getParent();
n.is(CKEDITOR.dtd.$inline)&&e[t?"insertBefore":"insertAfter"](n);
};
function t(t,n,i){
e(n),e(i,1);
for(var o;o=i.getNext();){
o.insertAfter(n),n=o;
}
p(t)&&t.remove();
};
function n(e,t){
return new CKEDITOR.dom.elementPath(e,t);
};
function i(e,t){
var n=new CKEDITOR.dom.range(e);
return n.setStartAfter(t.startNode),n.setEndBefore(t.endNode),n;
};
var o={detectMerge:function(e,t){
var n=i(t,e.bookmark),o=n.startPath(),a=n.endPath(),r=o.contains(CKEDITOR.dtd.$list),s=a.contains(CKEDITOR.dtd.$list);
if(e.mergeList=r&&s&&r.getParent().equals(s.getParent())&&!r.equals(s),e.mergeListItems=o.block&&a.block&&o.block.is(CKEDITOR.dtd.$listItem)&&a.block.is(CKEDITOR.dtd.$listItem),e.mergeList||e.mergeListItems){
var l=n.clone();
l.setStartBefore(e.bookmark.startNode),l.setEndAfter(e.bookmark.endNode),e.mergeListBookmark=l.createBookmark();
}
},merge:function(e,i){
if(e.mergeListBookmark){
var o=e.mergeListBookmark.startNode,a=e.mergeListBookmark.endNode,r=n(o,i),s=n(a,i);
if(e.mergeList){
var l=r.contains(CKEDITOR.dtd.$list),d=s.contains(CKEDITOR.dtd.$list);
l.equals(d)||(d.moveChildren(l),d.remove());
}
if(e.mergeListItems){
var c=r.contains(CKEDITOR.dtd.$listItem),u=s.contains(CKEDITOR.dtd.$listItem);
c.equals(u)||t(u,o,a);
}
o.remove(),a.remove();
}
}},a={detectMerge:function(e,t){
if(!e.tableContentsRanges&&!e.mergeListBookmark){
var n=new CKEDITOR.dom.range(t);
n.setStartBefore(e.bookmark.startNode),n.setEndAfter(e.bookmark.endNode),e.mergeBlockBookmark=n.createBookmark();
}
},merge:function(e,i){
if(e.mergeBlockBookmark&&!e.purgeTableBookmark){
var o=e.mergeBlockBookmark.startNode,a=e.mergeBlockBookmark.endNode,r=n(o,i),s=n(a,i),l=r.block,d=s.block;
l&&d&&!l.equals(d)&&t(d,o,a),o.remove(),a.remove();
}
}},r=function(){
function e(e){
function t(e){
return e.type==CKEDITOR.NODE_ELEMENT&&e.is(o)&&(!s||n(e,s))&&(!l||n(e,l));
};
var i,a=[],r=new CKEDITOR.dom.walker(e),s=e.startPath().contains(o),l=e.endPath().contains(o),d={};
return r.guard=function(n,o){
if(n.type==CKEDITOR.NODE_ELEMENT){
var r="visited_"+(o?"out":"in");
if(n.getCustomData(r)){
return;
}
CKEDITOR.dom.element.setMarker(d,n,r,1);
}
return o&&s&&n.equals(s)?(i=e.clone(),i.setEndAt(s,CKEDITOR.POSITION_BEFORE_END),void a.push(i)):!o&&l&&n.equals(l)?(i=e.clone(),i.setStartAt(l,CKEDITOR.POSITION_AFTER_START),void a.push(i)):void (!o&&t(n)&&(i=e.clone(),i.selectNodeContents(n),a.push(i)));
},r.lastForward(),CKEDITOR.dom.element.clearAllMarkers(d),a;
};
function t(e){
var t=e.getCommonAncestor();
return t.is(CKEDITOR.dtd.$tableContent)&&!t.is(o)&&(t=t.getAscendant("table",!0)),t;
};
function n(e,t){
var n=CKEDITOR.POSITION_CONTAINS+CKEDITOR.POSITION_IS_CONTAINED,i=e.getPosition(t);
return i===CKEDITOR.POSITION_IDENTICAL?!1:0===(i&n);
};
var o={td:1,th:1,caption:1};
return {detectPurge:function(e){
var t=e.range,n=t.clone();
n.enlarge(CKEDITOR.ENLARGE_ELEMENT);
var i=new CKEDITOR.dom.walker(n),a=0;
if(i.evaluator=function(e){
e.type==CKEDITOR.NODE_ELEMENT&&e.is(o)&&++a;
},i.checkForward(),a>1){
var r=t.startPath().contains("table"),s=t.endPath().contains("table");
if(r&&s&&t.checkBoundaryOfElement(r,CKEDITOR.START)&&t.checkBoundaryOfElement(s,CKEDITOR.END)){
var l=e.range.clone();
l.setStartBefore(r),l.setEndAfter(s),e.purgeTableBookmark=l.createBookmark();
}
}
},detectRanges:function(o,a){
var r,s,l,d=i(a,o.bookmark),c=d.clone(),u=t(d),h=new CKEDITOR.dom.elementPath(d.startContainer,u),f=new CKEDITOR.dom.elementPath(d.endContainer,u),m=h.contains("table"),g=f.contains("table");
(m||g)&&(m&&g&&n(m,g)?(o.tableSurroundingRange=c,c.setStartAt(m,CKEDITOR.POSITION_AFTER_END),c.setEndAt(g,CKEDITOR.POSITION_BEFORE_START),r=d.clone(),r.setEndAt(m,CKEDITOR.POSITION_AFTER_END),s=d.clone(),s.setStartAt(g,CKEDITOR.POSITION_BEFORE_START),l=e(r).concat(e(s))):m?g||(o.tableSurroundingRange=c,c.setStartAt(m,CKEDITOR.POSITION_AFTER_END),d.setEndAt(m,CKEDITOR.POSITION_AFTER_END)):(o.tableSurroundingRange=c,c.setEndAt(g,CKEDITOR.POSITION_BEFORE_START),d.setStartAt(g,CKEDITOR.POSITION_AFTER_START)),o.tableContentsRanges=l?l:e(d));
},deleteRanges:function(e){
for(var t;t=e.tableContentsRanges.pop();){
t.extractContents(),p(t.startContainer)&&t.startContainer.appendBogus();
}
e.tableSurroundingRange&&e.tableSurroundingRange.extractContents();
},purge:function(e){
if(e.purgeTableBookmark){
var t=e.doc,n=e.range,i=n.clone(),o=t.createElement("p");
o.insertBefore(e.purgeTableBookmark.startNode),i.moveToBookmark(e.purgeTableBookmark),i.deleteContents(),e.range.moveToPosition(o,CKEDITOR.POSITION_AFTER_START);
}
}};
}();
return {list:o,block:a,table:r,detectExtractMerge:function(e){
return !(e.range.startPath().contains(CKEDITOR.dtd.$listItem)&&e.range.endPath().contains(CKEDITOR.dtd.$listItem));
},fixUneditableRangePosition:function(e){
e.startContainer.getDtd()["#"]||e.moveToClosestEditablePosition(null,!0);
},autoParagraph:function(e,t){
var n,i=t.startPath();
l(e,i.block,i.blockLimit)&&(n=d(e))&&(n=t.document.createElement(n),n.appendBogus(),t.insertNode(n),t.moveToPosition(n,CKEDITOR.POSITION_AFTER_START));
}};
}();
}(),function(){
function e(){
var e,t=this._.fakeSelection;
if(t&&(e=this.getSelection(1),e&&e.isHidden()||(t.reset(),t=0)),t||(t=e||this.getSelection(1),t&&t.getType()!=CKEDITOR.SELECTION_NONE)){
this.fire("selectionCheck",t);
var n=this.elementPath();
n.compare(this._.selectionPreviousPath)||(CKEDITOR.env.webkit&&(this._.previousActive=this.document.getActive()),this._.selectionPreviousPath=n,this.fire("selectionChange",{selection:t,path:n}));
}
};
function t(){
C=!0,T||(n.call(this),T=CKEDITOR.tools.setTimeout(n,200,this));
};
function n(){
T=null,C&&(CKEDITOR.tools.setTimeout(e,0,this),C=!1);
};
function i(e){
return v(e)?!0:e.type!=CKEDITOR.NODE_ELEMENT||e.is(CKEDITOR.dtd.$empty)?!1:!0;
};
function o(e){
function t(t,n){
if(!t||t.type==CKEDITOR.NODE_TEXT){
return !1;
}
var i=e.clone();
return i["moveToElementEdit"+(n?"End":"Start")](t);
};
if(!(e.root instanceof CKEDITOR.editable)){
return !1;
}
var n=e.startContainer,o=e.getPreviousNode(i,null,n),a=e.getNextNode(i,null,n);
return t(o)||t(a,1)?!0:o||a||n.type==CKEDITOR.NODE_ELEMENT&&n.isBlockBoundary()&&n.getBogus()?!1:!0;
};
function a(e){
l(e,!1);
var t=e.getDocument().createText("\u200b");
return e.setCustomData("cke-fillingChar",t),t;
};
function r(e){
return e.getCustomData("cke-fillingChar");
};
function s(e){
var t=r(e);
t&&(t.getCustomData("ready")?l(e):t.setCustomData("ready",1));
};
function l(e,t){
var n=e&&e.removeCustomData("cke-fillingChar");
if(n){
if(t!==!1){
var i,o=e.getDocument().getSelection().getNative(),a=o&&"None"!=o.type&&o.getRangeAt(0);
if(n.getLength()>1&&a&&a.intersectsNode(n.$)){
i=c(o);
var r=o.anchorNode==n.$&&o.anchorOffset>0,s=o.focusNode==n.$&&o.focusOffset>0;
r&&i[0].offset--,s&&i[1].offset--;
}
}
n.setText(d(n.getText())),i&&u(e.getDocument().$,i);
}
};
function d(e){
return e.replace(/\u200B( )?/g,function(e){
return e[1]?"\xa0":"";
});
};
function c(e){
return [{node:e.anchorNode,offset:e.anchorOffset},{node:e.focusNode,offset:e.focusOffset}];
};
function u(e,t){
var n=e.getSelection(),i=e.createRange();
i.setStart(t[0].node,t[0].offset),i.collapse(!0),n.removeAllRanges(),n.addRange(i),n.extend(t[1].node,t[1].offset);
};
function h(e){
var t=CKEDITOR.env.ie?"display:none":"position:fixed;top:0;left:-1000px",n=CKEDITOR.dom.element.createFromHtml("<div data-cke-hidden-sel=\"1\" data-cke-temp=\"1\" style=\""+t+"\">&nbsp;</div>",e.document);
e.fire("lockSnapshot"),e.editable().append(n);
var i=e.getSelection(1),o=e.createRange(),a=i.root.on("selectionchange",function(e){
e.cancel();
},null,null,0);
o.setStartAt(n,CKEDITOR.POSITION_AFTER_START),o.setEndAt(n,CKEDITOR.POSITION_BEFORE_END),i.selectRanges([o]),a.removeListener(),e.fire("unlockSnapshot"),e._.hiddenSelectionContainer=n;
};
function f(e){
var t=e._.hiddenSelectionContainer;
if(t){
var n=e.checkDirty();
e.fire("lockSnapshot"),t.remove(),e.fire("unlockSnapshot"),!n&&e.resetDirty();
}
delete e._.hiddenSelectionContainer;
};
function m(e){
var t={37:1,39:1,8:1,46:1};
return function(n){
var i=n.data.getKeystroke();
if(t[i]){
var o=e.getSelection(),a=o.getRanges(),r=a[0];
if(1==a.length&&r.collapsed){
var s=r[38>i?"getPreviousEditableNode":"getNextEditableNode"]();
s&&s.type==CKEDITOR.NODE_ELEMENT&&"false"==s.getAttribute("contenteditable")&&(e.getSelection().fake(s),n.data.preventDefault(),n.cancel());
}
}
};
};
function g(e){
var t,n,i,o;
return 1==e.length&&!(o=e[0]).collapsed&&(t=o.getEnclosedNode())&&t.type==CKEDITOR.NODE_ELEMENT&&(i=o.clone(),i.shrink(CKEDITOR.SHRINK_ELEMENT,!0),(n=i.getEnclosedNode())&&n.type==CKEDITOR.NODE_ELEMENT&&(t=n),"false"==t.getAttribute("contenteditable"))?t:void 0;
};
function p(e,t){
for(var n,i=0;i<e.length;++i){
n=e[i],n.endContainer.equals(t)&&(n.endOffset=Math.min(n.endOffset,t.getChildCount()));
}
};
function E(e){
for(var t=0;t<e.length;t++){
var n=e[t],i=n.getCommonAncestor();
if(i.isReadOnly()&&e.splice(t,1),!n.collapsed){
if(n.startContainer.isReadOnly()){
for(var o,a=n.startContainer;a&&(o=a.type==CKEDITOR.NODE_ELEMENT,!(o&&a.is("body")||!a.isReadOnly()));){
o&&"false"==a.getAttribute("contentEditable")&&n.setStartAfter(a),a=a.getParent();
}
}
var r=n.startContainer,s=n.endContainer,l=n.startOffset,d=n.endOffset,c=n.clone();
r&&r.type==CKEDITOR.NODE_TEXT&&(l>=r.getLength()?c.setStartAfter(r):c.setStartBefore(r)),s&&s.type==CKEDITOR.NODE_TEXT&&(d?c.setEndAfter(s):c.setEndBefore(s));
var u=new CKEDITOR.dom.walker(c);
u.evaluator=function(i){
if(i.type==CKEDITOR.NODE_ELEMENT&&i.isReadOnly()){
var o=n.clone();
return n.setEndBefore(i),n.collapsed&&e.splice(t--,1),i.getPosition(c.endContainer)&CKEDITOR.POSITION_CONTAINS||(o.setStartAfter(i),o.collapsed||e.splice(t+1,0,o)),!0;
}
return !1;
},u.next();
}
}
return e;
};
var T,C,v=CKEDITOR.dom.walker.invisible(1),I=function(){
function e(e){
return function(t){
var n=t.editor.createRange();
return n.moveToClosestEditablePosition(t.selected,e)&&t.editor.getSelection().selectRanges([n]),!1;
};
};
function t(e){
return function(t){
var n,i=t.editor,o=i.createRange();
return (n=o.moveToClosestEditablePosition(t.selected,e))||(n=o.moveToClosestEditablePosition(t.selected,!e)),n&&i.getSelection().selectRanges([o]),i.fire("saveSnapshot"),t.selected.remove(),n||(o.moveToElementEditablePosition(i.editable()),i.getSelection().selectRanges([o])),i.fire("saveSnapshot"),!1;
};
};
var n=e(),i=e(1);
return {37:n,38:n,39:i,40:i,8:t(),46:t(1)};
}();
CKEDITOR.on("instanceCreated",function(n){
function i(){
var e=o.getSelection();
e&&e.removeAllRanges();
};
var o=n.editor;
o.on("contentDom",function(){
function n(){
d=new CKEDITOR.dom.selection(o.getSelection()),d.lock();
};
function i(e,t,n){
try{
e.moveToPoint(t,n);
}
catch(i){
}
};
function a(){
u.removeListener("mouseup",r),g.removeListener("mouseup",r);
};
function r(){
a();
var e=CKEDITOR.document.$.selection,t=e.createRange();
"None"!=e.type&&t.parentElement().ownerDocument==c.$&&t.select();
};
var s,d,c=o.document,u=CKEDITOR.document,h=o.editable(),f=c.getBody(),g=c.getDocumentElement(),p=h.isInline();
if(CKEDITOR.env.gecko&&h.attachListener(h,"focus",function(e){
if(e.removeListener(),0!==s){
var t=o.getSelection().getNative();
if(t&&t.isCollapsed&&t.anchorNode==h.$){
var n=o.createRange();
n.moveToElementEditStart(h),n.select();
}
}
},null,null,-2),h.attachListener(h,CKEDITOR.env.webkit?"DOMFocusIn":"focus",function(){
s&&CKEDITOR.env.webkit&&(s=o._.previousActive&&o._.previousActive.equals(c.getActive())),o.unlockSelection(s),s=0;
},null,null,-1),h.attachListener(h,"mousedown",function(){
s=0;
}),(CKEDITOR.env.ie||p)&&(O?h.attachListener(h,"beforedeactivate",n,null,null,-1):h.attachListener(o,"selectionCheck",n,null,null,-1),h.attachListener(h,CKEDITOR.env.webkit?"DOMFocusOut":"blur",function(){
o.lockSelection(d),s=1;
},null,null,-1),h.attachListener(h,"mousedown",function(){
s=0;
})),CKEDITOR.env.ie&&!p){
var E;
h.attachListener(h,"mousedown",function(e){
if(2==e.data.$.button){
var t=o.document.getSelection();
t&&t.getType()!=CKEDITOR.SELECTION_NONE||(E=o.window.getScrollPosition());
}
}),h.attachListener(h,"mouseup",function(e){
2==e.data.$.button&&E&&(o.document.$.documentElement.scrollLeft=E.x,o.document.$.documentElement.scrollTop=E.y),E=null;
}),"BackCompat"!=c.$.compatMode&&((CKEDITOR.env.ie7Compat||CKEDITOR.env.ie6Compat)&&g.on("mousedown",function(e){
function t(e){
if(e=e.data.$,a){
var t=f.$.createTextRange();
i(t,e.clientX,e.clientY),a.setEndPoint(r.compareEndPoints("StartToStart",t)<0?"EndToEnd":"StartToStart",t),a.select();
}
};
function n(){
u.removeListener("mouseup",o),g.removeListener("mouseup",o);
};
function o(){
g.removeListener("mousemove",t),n(),a.select();
};
if(e=e.data,e.getTarget().is("html")&&e.$.y<g.$.clientHeight&&e.$.x<g.$.clientWidth){
var a=f.$.createTextRange();
i(a,e.$.clientX,e.$.clientY);
var r=a.duplicate();
g.on("mousemove",t),u.on("mouseup",o),g.on("mouseup",o);
}
}),CKEDITOR.env.version>7&&CKEDITOR.env.version<11&&g.on("mousedown",function(e){
e.data.getTarget().is("html")&&(u.on("mouseup",r),g.on("mouseup",r));
}));
}
if(h.attachListener(h,"selectionchange",e,o),h.attachListener(h,"keyup",t,o),h.attachListener(h,CKEDITOR.env.webkit?"DOMFocusIn":"focus",function(){
o.forceNextSelectionCheck(),o.selectionChange(1);
}),p&&(CKEDITOR.env.webkit||CKEDITOR.env.gecko)){
var T;
h.attachListener(h,"mousedown",function(){
T=1;
}),h.attachListener(c.getDocumentElement(),"mouseup",function(){
T&&t.call(o),T=0;
});
}else{
h.attachListener(CKEDITOR.env.ie?h:c.getDocumentElement(),"mouseup",t,o);
}
CKEDITOR.env.webkit&&h.attachListener(c,"keydown",function(e){
var t=e.data.getKey();
switch(t){
case 13:
case 33:
case 34:
case 35:
case 36:
case 37:
case 39:
case 8:
case 45:
case 46:
l(h);
}
},null,null,-1),h.attachListener(h,"keydown",m(o),null,null,-1);
}),o.on("setData",function(){
o.unlockSelection(),CKEDITOR.env.webkit&&i();
}),o.on("contentDomUnload",function(){
o.unlockSelection();
}),CKEDITOR.env.ie9Compat&&o.on("beforeDestroy",i,null,null,9),o.on("dataReady",function(){
delete o._.fakeSelection,delete o._.hiddenSelectionContainer,o.selectionChange(1);
}),o.on("loadSnapshot",function(){
var e=CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT),t=o.editable().getLast(e);
if(t&&t.hasAttribute("data-cke-hidden-sel")&&(t.remove(),CKEDITOR.env.gecko)){
var n=o.editable().getFirst(e);
n&&n.is("br")&&n.getAttribute("_moz_editor_bogus_node")&&n.remove();
}
},null,null,100),o.on("key",function(e){
if("wysiwyg"==o.mode){
var t=o.getSelection();
if(t.isFake){
var n=I[e.data.keyCode];
return n?n({editor:o,selected:t.getSelectedElement(),selection:t,keyEvent:e}):void 0;
}
}
});
}),CKEDITOR.on("instanceReady",function(e){
function t(){
var e=a.editable();
if(e){
var t=r(e);
if(t){
var n=a.document.$.getSelection();
"None"==n.type||n.anchorNode!=t.$&&n.focusNode!=t.$||(o=c(n)),i=t.getText(),t.setText(d(i));
}
}
};
function n(){
var e=a.editable();
if(e){
var t=r(e);
t&&(t.setText(i),o&&(u(a.document.$,o),o=null));
}
};
var i,o,a=e.editor;
CKEDITOR.env.webkit&&(a.on("selectionChange",function(){
s(a.editable());
},null,null,-1),a.on("beforeSetMode",function(){
l(a.editable());
},null,null,-1),a.on("beforeUndoImage",t),a.on("afterUndoImage",n),a.on("beforeGetData",t,null,null,0),a.on("getData",n));
}),CKEDITOR.editor.prototype.selectionChange=function(n){
(n?e:t).call(this);
},CKEDITOR.editor.prototype.getSelection=function(e){
if((this._.savedSelection||this._.fakeSelection)&&!e){
return this._.savedSelection||this._.fakeSelection;
}
var t=this.editable();
return t&&"wysiwyg"==this.mode?new CKEDITOR.dom.selection(t):null;
},CKEDITOR.editor.prototype.lockSelection=function(e){
return e=e||this.getSelection(1),e.getType()!=CKEDITOR.SELECTION_NONE?(!e.isLocked&&e.lock(),this._.savedSelection=e,!0):!1;
},CKEDITOR.editor.prototype.unlockSelection=function(e){
var t=this._.savedSelection;
return t?(t.unlock(e),delete this._.savedSelection,!0):!1;
},CKEDITOR.editor.prototype.forceNextSelectionCheck=function(){
delete this._.selectionPreviousPath;
},CKEDITOR.dom.document.prototype.getSelection=function(){
return new CKEDITOR.dom.selection(this);
},CKEDITOR.dom.range.prototype.select=function(){
var e=this.root instanceof CKEDITOR.editable?this.root.editor.getSelection():new CKEDITOR.dom.selection(this.root);
return e.selectRanges([this]),e;
},CKEDITOR.SELECTION_NONE=1,CKEDITOR.SELECTION_TEXT=2,CKEDITOR.SELECTION_ELEMENT=3;
var O="function"!=typeof window.getSelection,D=1;
CKEDITOR.dom.selection=function(e){
if(e instanceof CKEDITOR.dom.selection){
var t=e;
e=e.root;
}
var n,i=e instanceof CKEDITOR.dom.element;
if(this.rev=t?t.rev:D++,this.document=e instanceof CKEDITOR.dom.document?e:e.getDocument(),this.root=n=i?e:this.document.getBody(),this.isLocked=0,this._={cache:{}},t){
return CKEDITOR.tools.extend(this._.cache,t._.cache),this.isFake=t.isFake,this.isLocked=t.isLocked,this;
}
var o,a,r=this.getNative();
if(r){
if(r.getRangeAt){
a=r.rangeCount&&r.getRangeAt(0),o=a&&new CKEDITOR.dom.node(a.commonAncestorContainer);
}else{
try{
a=r.createRange();
}
catch(s){
}
o=a&&CKEDITOR.dom.element.get(a.item&&a.item(0)||a.parentElement());
}
}
return (!o||o.type!=CKEDITOR.NODE_ELEMENT&&o.type!=CKEDITOR.NODE_TEXT||!this.root.equals(o)&&!this.root.contains(o))&&(this._.cache.type=CKEDITOR.SELECTION_NONE,this._.cache.startElement=null,this._.cache.selectedElement=null,this._.cache.selectedText="",this._.cache.ranges=new CKEDITOR.dom.rangeList),this;
};
var b={img:1,hr:1,li:1,table:1,tr:1,td:1,th:1,embed:1,object:1,ol:1,ul:1,a:1,input:1,form:1,select:1,textarea:1,button:1,fieldset:1,thead:1,tfoot:1};
CKEDITOR.dom.selection.prototype={getNative:function(){
return void 0!==this._.cache.nativeSel?this._.cache.nativeSel:this._.cache.nativeSel=O?this.document.$.selection:this.document.getWindow().$.getSelection();
},getType:O?function(){
var e=this._.cache;
if(e.type){
return e.type;
}
var t=CKEDITOR.SELECTION_NONE;
try{
var n=this.getNative(),i=n.type;
"Text"==i&&(t=CKEDITOR.SELECTION_TEXT),"Control"==i&&(t=CKEDITOR.SELECTION_ELEMENT),n.createRange().parentElement()&&(t=CKEDITOR.SELECTION_TEXT);
}
catch(o){
}
return e.type=t;
}:function(){
var e=this._.cache;
if(e.type){
return e.type;
}
var t=CKEDITOR.SELECTION_TEXT,n=this.getNative();
if(n&&n.rangeCount){
if(1==n.rangeCount){
var i=n.getRangeAt(0),o=i.startContainer;
o==i.endContainer&&1==o.nodeType&&i.endOffset-i.startOffset==1&&b[o.childNodes[i.startOffset].nodeName.toLowerCase()]&&(t=CKEDITOR.SELECTION_ELEMENT);
}
}else{
t=CKEDITOR.SELECTION_NONE;
}
return e.type=t;
},getRanges:function(){
var e=O?function(){
function e(e){
return new CKEDITOR.dom.node(e).getIndex();
};
var t=function(t,n){
t=t.duplicate(),t.collapse(n);
var i=t.parentElement();
if(!i.hasChildNodes()){
return {container:i,offset:0};
}
for(var o,a,r,s,l,d=i.children,c=t.duplicate(),u=0,h=d.length-1,f=-1;h>=u;){
if(f=Math.floor((u+h)/2),o=d[f],c.moveToElementText(o),r=c.compareEndPoints("StartToStart",t),r>0){
h=f-1;
}else{
if(!(0>r)){
return {container:i,offset:e(o)};
}
u=f+1;
}
}
if(-1==f||f==d.length-1&&0>r){
if(c.moveToElementText(i),c.setEndPoint("StartToStart",t),s=c.text.replace(/(\r\n|\r)/g,"\n").length,d=i.childNodes,!s){
return o=d[d.length-1],o.nodeType!=CKEDITOR.NODE_TEXT?{container:i,offset:d.length}:{container:o,offset:o.nodeValue.length};
}
for(var m=d.length;s>0&&m>0;){
a=d[--m],a.nodeType==CKEDITOR.NODE_TEXT&&(l=a,s-=a.nodeValue.length);
}
return {container:l,offset:-s};
}
if(c.collapse(r>0?!0:!1),c.setEndPoint(r>0?"StartToStart":"EndToStart",t),s=c.text.replace(/(\r\n|\r)/g,"\n").length,!s){
return {container:i,offset:e(o)+(r>0?0:1)};
}
for(;s>0;){
try{
a=o[r>0?"previousSibling":"nextSibling"],a.nodeType==CKEDITOR.NODE_TEXT&&(s-=a.nodeValue.length,l=a),o=a;
}
catch(g){
return {container:i,offset:e(o)};
}
}
return {container:l,offset:r>0?-s:l.nodeValue.length+s};
};
return function(){
var e,n=this.getNative(),i=n&&n.createRange(),o=this.getType();
if(!n){
return [];
}
if(o==CKEDITOR.SELECTION_TEXT){
e=new CKEDITOR.dom.range(this.root);
var a=t(i,!0);
return e.setStart(new CKEDITOR.dom.node(a.container),a.offset),a=t(i),e.setEnd(new CKEDITOR.dom.node(a.container),a.offset),e.endContainer.getPosition(e.startContainer)&CKEDITOR.POSITION_PRECEDING&&e.endOffset<=e.startContainer.getIndex()&&e.collapse(),[e];
}
if(o==CKEDITOR.SELECTION_ELEMENT){
for(var r=[],s=0;s<i.length;s++){
var l=i.item(s),d=l.parentNode,c=0;
for(e=new CKEDITOR.dom.range(this.root);c<d.childNodes.length&&d.childNodes[c]!=l;c++){
}
e.setStart(new CKEDITOR.dom.node(d),c),e.setEnd(new CKEDITOR.dom.node(d),c+1),r.push(e);
}
return r;
}
return [];
};
}():function(){
var e,t=[],n=this.getNative();
if(!n){
return t;
}
for(var i=0;i<n.rangeCount;i++){
var o=n.getRangeAt(i);
e=new CKEDITOR.dom.range(this.root),e.setStart(new CKEDITOR.dom.node(o.startContainer),o.startOffset),e.setEnd(new CKEDITOR.dom.node(o.endContainer),o.endOffset),t.push(e);
}
return t;
};
return function(t){
var n=this._.cache,i=n.ranges;
return i||(n.ranges=i=new CKEDITOR.dom.rangeList(e.call(this))),t?E(new CKEDITOR.dom.rangeList(i.slice())):i;
};
}(),getStartElement:function(){
var e=this._.cache;
if(void 0!==e.startElement){
return e.startElement;
}
var t;
switch(this.getType()){
case CKEDITOR.SELECTION_ELEMENT:
return this.getSelectedElement();
case CKEDITOR.SELECTION_TEXT:
var n=this.getRanges()[0];
if(n){
if(n.collapsed){
t=n.startContainer,t.type!=CKEDITOR.NODE_ELEMENT&&(t=t.getParent());
}else{
for(n.optimize();;){
var i=n.startContainer,o=n.startOffset;
if(o!=(i.getChildCount?i.getChildCount():i.getLength())||i.isBlockBoundary()){
break;
}
n.setStartAfter(i);
}
if(t=n.startContainer,t.type!=CKEDITOR.NODE_ELEMENT){
return t.getParent();
}
if(t=t.getChild(n.startOffset),t&&t.type==CKEDITOR.NODE_ELEMENT){
for(var a=t.getFirst();a&&a.type==CKEDITOR.NODE_ELEMENT;){
t=a,a=a.getFirst();
}
}else{
t=n.startContainer;
}
}
t=t.$;
}
}
return e.startElement=t?new CKEDITOR.dom.element(t):null;
},getSelectedElement:function(){
var e=this._.cache;
if(void 0!==e.selectedElement){
return e.selectedElement;
}
var t=this,n=CKEDITOR.tools.tryThese(function(){
return t.getNative().createRange().item(0);
},function(){
for(var e,n,i=t.getRanges()[0].clone(),o=2;o&&!((e=i.getEnclosedNode())&&e.type==CKEDITOR.NODE_ELEMENT&&b[e.getName()]&&(n=e));o--){
i.shrink(CKEDITOR.SHRINK_ELEMENT);
}
return n&&n.$;
});
return e.selectedElement=n?new CKEDITOR.dom.element(n):null;
},getSelectedText:function(){
var e=this._.cache;
if(void 0!==e.selectedText){
return e.selectedText;
}
var t=this.getNative(),n=O?"Control"==t.type?"":t.createRange().text:t.toString();
return e.selectedText=n;
},lock:function(){
this.getRanges(),this.getStartElement(),this.getSelectedElement(),this.getSelectedText(),this._.cache.nativeSel=null,this.isLocked=1;
},unlock:function(e){
if(this.isLocked){
if(e){
var t=this.getSelectedElement(),n=!t&&this.getRanges(),i=this.isFake;
}
if(this.isLocked=0,this.reset(),e){
var o=t||n[0]&&n[0].getCommonAncestor();
if(!o||!o.getAscendant("body",1)){
return;
}
i?this.fake(t):t?this.selectElement(t):this.selectRanges(n);
}
}
},reset:function(){
this._.cache={},this.isFake=0;
var e=this.root.editor;
e&&e._.fakeSelection&&(this.rev==e._.fakeSelection.rev?(delete e._.fakeSelection,f(e)):CKEDITOR.warn("selection-fake-reset")),this.rev=D++;
},selectElement:function(e){
var t=new CKEDITOR.dom.range(this.root);
t.setStartBefore(e),t.setEndAfter(e),this.selectRanges([t]);
},selectRanges:function(e){
var t=this.root.editor,n=t&&t._.hiddenSelectionContainer;
if(this.reset(),n&&p(e,this.root),e.length){
if(this.isLocked){
var i=CKEDITOR.document.getActive();
return this.unlock(),this.selectRanges(e),this.lock(),void (i&&!i.equals(this.root)&&i.focus());
}
var r=g(e);
if(r){
return void this.fake(r);
}
if(O){
var s=CKEDITOR.dom.walker.whitespaces(!0),d=/\ufeff|\u00a0/,c={table:1,tbody:1,tr:1};
if(e.length>1){
var u=e[e.length-1];
e[0].setEnd(u.endContainer,u.endOffset);
}
var h,f,m,E=e[0],T=E.collapsed,C=E.getEnclosedNode();
if(C&&C.type==CKEDITOR.NODE_ELEMENT&&C.getName() in b&&(!C.is("a")||!C.getText())){
try{
return m=C.$.createControlRange(),m.addElement(C.$),void m.select();
}
catch(v){
}
}
(E.startContainer.type==CKEDITOR.NODE_ELEMENT&&E.startContainer.getName() in c||E.endContainer.type==CKEDITOR.NODE_ELEMENT&&E.endContainer.getName() in c)&&(E.shrink(CKEDITOR.NODE_ELEMENT,!0),T=E.collapsed);
var I,D=E.createBookmark(),R=D.startNode;
if(T||(I=D.endNode),m=E.document.$.body.createTextRange(),m.moveToElementText(R.$),m.moveStart("character",1),I){
var y=E.document.$.body.createTextRange();
y.moveToElementText(I.$),m.setEndPoint("EndToEnd",y),m.moveEnd("character",-1);
}else{
var K=R.getNext(s),_d=R.hasAscendant("pre");
h=!(K&&K.getText&&K.getText().match(d))&&(_d||!R.hasPrevious()||R.getPrevious().is&&R.getPrevious().is("br")),f=E.document.createElement("span"),f.setHtml("&#65279;"),f.insertBefore(R),h&&E.document.createText("\ufeff").insertBefore(R);
}
E.setStartBefore(R),R.remove(),T?(h?(m.moveStart("character",-1),m.select(),E.document.$.selection.clear()):m.select(),E.moveToPosition(f,CKEDITOR.POSITION_BEFORE_START),f.remove()):(E.setEndBefore(I),I.remove(),m.select());
}else{
var k=this.getNative();
if(!k){
return;
}
this.removeAllRanges();
for(var w=0;w<e.length;w++){
if(w<e.length-1){
var S=e[w],x=e[w+1],N=S.clone();
if(N.setStart(S.endContainer,S.endOffset),N.setEnd(x.startContainer,x.startOffset),!N.collapsed){
N.shrink(CKEDITOR.NODE_ELEMENT,!0);
var A=N.getCommonAncestor(),L=N.getEnclosedNode();
if(A.isReadOnly()||L&&L.isReadOnly()){
x.setStart(S.startContainer,S.startOffset),e.splice(w--,1);
continue;
}
}
}
E=e[w];
var P=this.document.$.createRange();
if(E.collapsed&&CKEDITOR.env.webkit&&o(E)){
var B=a(this.root);
E.insertNode(B),K=B.getNext(),K&&!B.getPrevious()&&K.type==CKEDITOR.NODE_ELEMENT&&"br"==K.getName()?(l(this.root),E.moveToPosition(K,CKEDITOR.POSITION_BEFORE_START)):E.moveToPosition(B,CKEDITOR.POSITION_AFTER_END);
}
P.setStart(E.startContainer.$,E.startOffset);
try{
P.setEnd(E.endContainer.$,E.endOffset);
}
catch(F){
if(!(F.toString().indexOf("NS_ERROR_ILLEGAL_VALUE")>=0)){
throw F;
}
E.collapse(1),P.setEnd(E.endContainer.$,E.endOffset);
}
k.addRange(P);
}
}
this.reset(),this.root.fire("selectionchange");
}
},fake:function(e){
var t=this.root.editor;
this.reset(),h(t);
var n=this._.cache,i=new CKEDITOR.dom.range(this.root);
i.setStartBefore(e),i.setEndAfter(e),n.ranges=new CKEDITOR.dom.rangeList(i),n.selectedElement=n.startElement=e,n.type=CKEDITOR.SELECTION_ELEMENT,n.selectedText=n.nativeSel=null,this.isFake=1,this.rev=D++,t._.fakeSelection=this,this.root.fire("selectionchange");
},isHidden:function(){
var e=this.getCommonAncestor();
return e&&e.type==CKEDITOR.NODE_TEXT&&(e=e.getParent()),!(!e||!e.data("cke-hidden-sel"));
},createBookmarks:function(e){
var t=this.getRanges().createBookmarks(e);
return this.isFake&&(t.isFake=1),t;
},createBookmarks2:function(e){
var t=this.getRanges().createBookmarks2(e);
return this.isFake&&(t.isFake=1),t;
},selectBookmarks:function(e){
for(var t,n=[],i=0;i<e.length;i++){
var o=new CKEDITOR.dom.range(this.root);
o.moveToBookmark(e[i]),n.push(o);
}
return e.isFake&&(t=n[0].getEnclosedNode(),t&&t.type==CKEDITOR.NODE_ELEMENT||(CKEDITOR.warn("selection-not-fake"),e.isFake=0)),e.isFake?this.fake(t):this.selectRanges(n),this;
},getCommonAncestor:function(){
var e=this.getRanges();
if(!e.length){
return null;
}
var t=e[0].startContainer,n=e[e.length-1].endContainer;
return t.getCommonAncestor(n);
},scrollIntoView:function(){
this.type!=CKEDITOR.SELECTION_NONE&&this.getRanges()[0].scrollIntoView();
},removeAllRanges:function(){
if(this.getType()!=CKEDITOR.SELECTION_NONE){
var e=this.getNative();
try{
e&&e[O?"empty":"removeAllRanges"]();
}
catch(t){
}
this.reset();
}
}};
}(),CKEDITOR.STYLE_BLOCK=1,CKEDITOR.STYLE_INLINE=2,CKEDITOR.STYLE_OBJECT=3,CKEDITOR.NUMERAL_STYLE_HINDU_ARABIC=1,CKEDITOR.NUMERAL_STYLE_ARABIC_INDIC=2,function(){
function e(e,t){
for(var n,i;(e=e.getParent())&&!e.equals(t);){
if(e.getAttribute("data-nostyle")){
n=e;
}else{
if(!i){
var o=e.getAttribute("contentEditable");
"false"==o?n=e:"true"==o&&(i=1);
}
}
}
return n;
};
function t(e,t,n,i,o,r,s,l){
return i?!o[i]||r?0:s&&!l?0:a(t,n,e,H):1;
};
function n(e,t,n,i){
return t&&((t.getDtd()||CKEDITOR.dtd.span)[n]||i)&&(!e.parentRule||e.parentRule(t));
};
function i(e,t,n){
return !e||!CKEDITOR.dtd.$removeEmpty[e]||(t.getPosition(n)|H)==H;
};
function o(e,t){
var n=e.type;
return n==CKEDITOR.NODE_TEXT||t||n==CKEDITOR.NODE_ELEMENT&&!e.getChildCount();
};
function a(e,t,n,i){
return (e.getPosition(t)|i)==i&&(!n.childRule||n.childRule(e));
};
function r(r){
var s=r.document;
if(r.collapsed){
var d=y(this,s);
return r.insertNode(d),void r.moveToPosition(d,CKEDITOR.POSITION_BEFORE_END);
}
var c,u=this.element,h=this._.definition,f=h.ignoreReadonly,m=f||h.includeReadonly;
null==m&&(m=r.root.getCustomData("cke_includeReadonly"));
var g=CKEDITOR.dtd[u];
g||(c=!0,g=CKEDITOR.dtd.span),r.enlarge(CKEDITOR.ENLARGE_INLINE,1),r.trim();
var p,E=r.createBookmark(),T=E.startNode,C=E.endNode,v=T;
if(!f){
var I=r.getCommonAncestor(),O=e(T,I),b=e(C,I);
O&&(v=O.getNextSourceNode(!0)),b&&(C=b);
}
for(v.getPosition(C)==CKEDITOR.POSITION_FOLLOWING&&(v=0);v;){
var R=!1;
if(v.equals(C)){
v=null,R=!0;
}else{
var K=v.type==CKEDITOR.NODE_ELEMENT?v.getName():null,_e=K&&"false"==v.getAttribute("contentEditable"),k=K&&v.getAttribute("data-nostyle");
if(K&&v.data("cke-bookmark")){
v=v.getNextSourceNode(!0);
continue;
}
if(_e&&m&&CKEDITOR.dtd.$block[K]&&l.call(this,v),t(h,v,C,K,g,k,_e,m)){
var w=v.getParent();
if(n(h,w,u,c)){
if(!p&&i(K,v,C)&&(p=r.clone(),p.setStartBefore(v)),o(v,_e)){
for(var S,x=v;(R=!x.getNext(M))&&(S=x.getParent(),g[S.getName()])&&a(S,T,h,q);){
x=S;
}
p.setEndAfter(x);
}
}else{
R=!0;
}
}else{
R=!0;
}
v=v.getNextSourceNode(k||_e);
}
if(R&&p&&!p.collapsed){
for(var N,L,P,B=y(this,s),F=B.hasAttributes(),$=p.getCommonAncestor(),H={styles:{},attrs:{},blockedStyles:{},blockedAttrs:{}};B&&$;){
if($.getName()==u){
for(N in h.attributes){
!H.blockedAttrs[N]&&(P=$.getAttribute(L))&&(B.getAttribute(N)==P?H.attrs[N]=1:H.blockedAttrs[N]=1);
}
for(L in h.styles){
!H.blockedStyles[L]&&(P=$.getStyle(L))&&(B.getStyle(L)==P?H.styles[L]=1:H.blockedStyles[L]=1);
}
}
$=$.getParent();
}
for(N in H.attrs){
B.removeAttribute(N);
}
for(L in H.styles){
B.removeStyle(L);
}
if(F&&!B.hasAttributes()&&(B=null),B){
if(this._name&&this._name.indexOf("Numeral")>=0){
var z,V,j,U;
U="Hindu Arabic"==B.getAttribute("numeralType")?CKEDITOR.NUMERAL_STYLE_HINDU_ARABIC:CKEDITOR.NUMERAL_STYLE_ARABIC_INDIC;
var W=p.extractContents();
for(z=0;z<W.getChildren().$.length;z++){
V=W.getChildren().$[z].textContent,j=A(V,U),W.getChildren().$[z].textContent=j;
}
W.appendTo(B);
}else{
p.extractContents().appendTo(B);
}
p.insertNode(B),D.call(this,B),B.mergeSiblings(),CKEDITOR.env.ie||B.$.normalize();
}else{
B=new CKEDITOR.dom.element("span"),p.extractContents().appendTo(B),p.insertNode(B),D.call(this,B),B.remove(!0);
}
p=null;
}
}
r.moveToBookmark(E),r.shrink(CKEDITOR.SHRINK_TEXT),r.shrink(CKEDITOR.NODE_ELEMENT,!0);
};
function s(e){
function t(){
for(var e=new CKEDITOR.dom.elementPath(i.getParent()),t=new CKEDITOR.dom.elementPath(u.getParent()),n=null,o=null,a=0;a<e.elements.length;a++){
var r=e.elements[a];
if(r==e.block||r==e.blockLimit){
break;
}
h.checkElementRemovable(r,!0)&&(n=r);
}
for(a=0;a<t.elements.length&&(r=t.elements[a],r!=t.block&&r!=t.blockLimit);a++){
h.checkElementRemovable(r,!0)&&(o=r);
}
o&&u.breakParent(o),n&&i.breakParent(n);
};
e.enlarge(CKEDITOR.ENLARGE_INLINE,1);
var n=e.createBookmark(),i=n.startNode;
if(e.collapsed){
for(var o,a,r=new CKEDITOR.dom.elementPath(i.getParent(),e.root),s=0;s<r.elements.length&&(a=r.elements[s])&&(a!=r.block&&a!=r.blockLimit);s++){
if(this.checkElementRemovable(a)){
var l;
e.collapsed&&(e.checkBoundaryOfElement(a,CKEDITOR.END)||(l=e.checkBoundaryOfElement(a,CKEDITOR.START)))?(o=a,o.match=l?"start":"end"):(a.mergeSiblings(),a.is(this.element)?O.call(this,a):b(a,w(this)[a.getName()]));
}
}
if(o){
var d=i;
for(s=0;;s++){
var c=r.elements[s];
if(c.equals(o)){
break;
}
c.match||(c=c.clone(),c.append(d),d=c);
}
d["start"==o.match?"insertBefore":"insertAfter"](o);
}
}else{
var u=n.endNode,h=this;
t();
for(var f=i;!f.equals(u);){
var m=f.getNextSourceNode();
f.type==CKEDITOR.NODE_ELEMENT&&this.checkElementRemovable(f)&&(f.getName()==this.element?O.call(this,f):b(f,w(this)[f.getName()]),m.type==CKEDITOR.NODE_ELEMENT&&m.contains(i)&&(t(),m=i.getNext())),f=m;
}
}
e.moveToBookmark(n),e.shrink(CKEDITOR.NODE_ELEMENT,!0);
};
function l(e){
for(var t,n=d(e),i=n.length,o=0,a=i&&new CKEDITOR.dom.range(e.getDocument());i>o;++o){
t=n[o],c(t,this)&&(a.selectNodeContents(t),r.call(this,a));
}
};
function d(e){
var t=[];
return e.forEach(function(e){
return "true"==e.getAttribute("contenteditable")?(t.push(e),!1):void 0;
},CKEDITOR.NODE_ELEMENT,!0),t;
};
function c(e,t){
var n=CKEDITOR.filter.instances[e.data("cke-filter")];
return n?n.check(t):1;
};
function u(e,t){
return e.activeFilter?e.activeFilter.check(t):1;
};
function h(e){
var t=e.getEnclosedNode()||e.getCommonAncestor(!1,!0),n=new CKEDITOR.dom.elementPath(t,e.root).contains(this.element,1);
n&&!n.isReadOnly()&&K(n,this);
};
function f(e){
var t=e.getCommonAncestor(!0,!0),n=new CKEDITOR.dom.elementPath(t,e.root).contains(this.element,1);
if(n){
var i=this,o=i._.definition,a=o.attributes;
if(a){
for(var r in a){
n.removeAttribute(r,a[r]);
}
}
if(o.styles){
for(var s in o.styles){
o.styles.hasOwnProperty(s)&&n.removeStyle(s);
}
}
}
};
function m(e){
var t=e.createBookmark(!0),n=e.createIterator();
n.enforceRealBlocks=!0,this._.enterMode&&(n.enlargeBr=this._.enterMode!=CKEDITOR.ENTER_BR);
for(var i,o,a=e.document;i=n.getNextParagraph();){
!i.isReadOnly()&&u(n,this)&&(o=y(this,a,i),p(i,o));
}
e.moveToBookmark(t);
};
function g(e){
var t=e.createBookmark(1),n=e.createIterator();
n.enforceRealBlocks=!0,n.enlargeBr=this._.enterMode!=CKEDITOR.ENTER_BR;
for(var i,o;i=n.getNextParagraph();){
this.checkElementRemovable(i)&&(i.is("pre")?(o=this._.enterMode==CKEDITOR.ENTER_BR?null:e.document.createElement(this._.enterMode==CKEDITOR.ENTER_P?"p":"div"),o&&i.copyAttributes(o),p(i,o)):O.call(this,i));
}
e.moveToBookmark(t);
};
function p(e,t){
var n=!t;
n&&(t=e.getDocument().createElement("div"),e.copyAttributes(t));
var i=t&&t.is("pre"),o=e.is("pre"),a=i&&!o,r=!i&&o;
a?t=I(e,t):r?t=v(n?[e.getHtml()]:T(e),t):e.moveChildren(t),t.replace(e),i?E(t):n&&R(t);
};
function E(e){
var t;
if((t=e.getPrevious($))&&t.type==CKEDITOR.NODE_ELEMENT&&t.is("pre")){
var n=C(t.getHtml(),/\n$/,"")+"\n\n"+C(e.getHtml(),/^\n/,"");
CKEDITOR.env.ie?e.$.outerHTML="<pre>"+n+"</pre>":e.setHtml(n),t.remove();
}
};
function T(e){
var t=/(\S\s*)\n(?:\s|(<span[^>]+data-cke-bookmark.*?\/span>))*\n(?!$)/gi,n=[],i=C(e.getOuterHtml(),t,function(e,t,n){
return t+"</pre>"+n+"<pre>";
});
return i.replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi,function(e,t){
n.push(t);
}),n;
};
function C(e,t,n){
var i="",o="";
return e=e.replace(/(^<span[^>]+data-cke-bookmark.*?\/span>)|(<span[^>]+data-cke-bookmark.*?\/span>$)/gi,function(e,t,n){
return t&&(i=t),n&&(o=n),"";
}),i+e.replace(t,n)+o;
};
function v(e,t){
var n;
e.length>1&&(n=new CKEDITOR.dom.documentFragment(t.getDocument()));
for(var i=0;i<e.length;i++){
var o=e[i];
if(o=o.replace(/(\r\n|\r)/g,"\n"),o=C(o,/^[ \t]*\n/,""),o=C(o,/\n$/,""),o=C(o,/^[ \t]+|[ \t]+$/g,function(e,t){
return 1==e.length?"&nbsp;":t?" "+CKEDITOR.tools.repeat("&nbsp;",e.length-1):CKEDITOR.tools.repeat("&nbsp;",e.length-1)+" ";
}),o=o.replace(/\n/g,"<br>"),o=o.replace(/[ \t]{2,}/g,function(e){
return CKEDITOR.tools.repeat("&nbsp;",e.length-1)+" ";
}),n){
var a=t.clone();
a.setHtml(o),n.append(a);
}else{
t.setHtml(o);
}
}
return n||t;
};
function I(e,t){
var n=e.getBogus();
n&&n.remove();
var i=e.getHtml();
if(i=C(i,/(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g,""),i=i.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi,"$1"),i=i.replace(/([ \t\n\r]+|&nbsp;)/g," "),i=i.replace(/<br\b[^>]*>/gi,"\n"),CKEDITOR.env.ie){
var o=e.getDocument().createElement("div");
o.append(t),t.$.outerHTML="<pre>"+i+"</pre>",t.copyAttributes(o.getFirst()),t=o.getFirst().remove();
}else{
t.setHtml(i);
}
return t;
};
function O(e,t){
var n=this._.definition,i=n.attributes,o=n.styles,a=w(this)[e.getName()],r=CKEDITOR.tools.isEmpty(i)&&CKEDITOR.tools.isEmpty(o);
for(var s in i){
("class"!=s&&!this._.definition.fullMatch||e.getAttribute(s)==S(s,i[s]))&&(t&&"data-"==s.slice(0,5)||(r=e.hasAttribute(s),e.removeAttribute(s)));
}
for(var l in o){
this._.definition.fullMatch&&e.getStyle(l)!=S(l,o[l],!0)||(r=r||!!e.getStyle(l),e.removeStyle(l));
}
b(e,a,L[e.getName()]),r&&(this._.definition.alwaysRemoveElement?R(e,1):!CKEDITOR.dtd.$block[e.getName()]||this._.enterMode==CKEDITOR.ENTER_BR&&!e.hasAttributes()?R(e):e.renameNode(this._.enterMode==CKEDITOR.ENTER_P?"p":"div"));
};
function D(e){
for(var t,n=w(this),i=e.getElementsByTag(this.element),o=i.count();--o>=0;){
t=i.getItem(o),t.isReadOnly()||O.call(this,t,!0);
}
for(var a in n){
if(a!=this.element){
for(i=e.getElementsByTag(a),o=i.count()-1;o>=0;o--){
t=i.getItem(o),t.isReadOnly()||b(t,n[a]);
}
}
}
};
function b(e,t,n){
var i=t&&t.attributes;
if(i){
for(var o=0;o<i.length;o++){
var a,r=i[o][0];
if(a=e.getAttribute(r)){
var s=i[o][1];
(null===s||s.test&&s.test(a)||"string"==typeof s&&a==s)&&e.removeAttribute(r);
}
}
}
n||R(e);
};
function R(e,t){
if(!e.hasAttributes()||t){
if(CKEDITOR.dtd.$block[e.getName()]){
var n=e.getPrevious($),i=e.getNext($);
!n||n.type!=CKEDITOR.NODE_TEXT&&n.isBlockBoundary({br:1})||e.append("br",1),!i||i.type!=CKEDITOR.NODE_TEXT&&i.isBlockBoundary({br:1})||e.append("br"),e.remove(!0);
}else{
var o=e.getFirst(),a=e.getLast();
e.remove(!0),o&&(o.type==CKEDITOR.NODE_ELEMENT&&o.mergeSiblings(),a&&!o.equals(a)&&a.type==CKEDITOR.NODE_ELEMENT&&a.mergeSiblings());
}
}
};
function y(e,t,n){
var i,o=e.element;
return "*"==o&&(o="span"),i=new CKEDITOR.dom.element(o,t),n&&n.copyAttributes(i),i=K(i,e),t.getCustomData("doc_processing_style")&&i.hasAttribute("id")?i.removeAttribute("id"):t.setCustomData("doc_processing_style",1),i;
};
function K(e,t){
var n=t._.definition,i=n.attributes,o=CKEDITOR.style.getStyleText(n);
if(i){
for(var a in i){
e.setAttribute(a,i[a]);
}
}
return o&&e.setAttribute("style",o),e;
};
function _f(e,t){
for(var n in e){
e[n]=e[n].replace(F,function(e,n){
return t[n];
});
}
};
function k(e){
var t=e._AC;
if(t){
return t;
}
t={};
var n=0,i=e.attributes;
if(i){
for(var o in i){
n++,t[o]=i[o];
}
}
var a=CKEDITOR.style.getStyleText(e);
return a&&(t.style||n++,t.style=a),t._length=n,e._AC=t;
};
function w(e){
if(e._.overrides){
return e._.overrides;
}
var t=e._.overrides={},n=e._.definition.overrides;
if(n){
CKEDITOR.tools.isArray(n)||(n=[n]);
for(var i=0;i<n.length;i++){
var o,a,r,s=n[i];
if("string"==typeof s?o=s.toLowerCase():(o=s.element?s.element.toLowerCase():e.element,r=s.attributes),a=t[o]||(t[o]={}),r){
var l=a.attributes=a.attributes||[];
for(var d in r){
l.push([d.toLowerCase(),r[d]]);
}
}
}
}
return t;
};
function S(e,t,n){
var i=new CKEDITOR.dom.element("span");
return i[n?"setStyle":"setAttribute"](e,t),i[n?"getStyle":"getAttribute"](e);
};
function x(e,t){
"string"==typeof e&&(e=CKEDITOR.tools.parseCssText(e)),"string"==typeof t&&(t=CKEDITOR.tools.parseCssText(t,!0));
for(var n in e){
if(!(n in t)||t[n]!=e[n]&&"inherit"!=e[n]&&"inherit"!=t[n]){
return !1;
}
}
return !0;
};
function N(e,t,n){
for(var i,o=e.document,a=e.getRanges(),r=t?this.removeFromRange:this.applyToRange,s=a.createIterator();i=s.getNextRange();){
r.call(this,i,n);
}
e.selectRanges(a),o.removeCustomData("doc_processing_style");
};
function A(e,t){
var n,i;
t==CKEDITOR.NUMERAL_STYLE_HINDU_ARABIC?(n=["0","1","2","3","4","5","6","7","8","9"],i=/[٠-٩]/g):(n=["\u0660","\u0661","\u0662","\u0663","\u0664","\u0665","\u0666","\u0667","\u0668","\u0669"],i=/[0-9]/g);
var o=e.replace(i,function(e){
return e.charCodeAt(0)>=1632&&(e=String.fromCharCode(e.charCodeAt(0)-1632+48)),n[e];
});
return o;
};
var L={address:1,div:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,p:1,pre:1,section:1,header:1,footer:1,nav:1,article:1,aside:1,figure:1,dialog:1,hgroup:1,time:1,meter:1,menu:1,command:1,keygen:1,output:1,progress:1,details:1,datagrid:1,datalist:1},P={a:1,blockquote:1,embed:1,hr:1,img:1,li:1,object:1,ol:1,table:1,td:1,tr:1,th:1,ul:1,dl:1,dt:1,dd:1,form:1,audio:1,video:1},B=/\s*(?:;\s*|$)/,F=/#\((.+?)\)/g,M=CKEDITOR.dom.walker.bookmark(0,1),$=CKEDITOR.dom.walker.whitespaces(1);
CKEDITOR.style=function(e,t){
if("string"==typeof e.type){
return new CKEDITOR.style.customHandlers[e.type](e);
}
var n=e.attributes;
n&&n.style&&(e.styles=CKEDITOR.tools.extend({},e.styles,CKEDITOR.tools.parseCssText(n.style)),delete n.style),t&&(e=CKEDITOR.tools.clone(e),_f(e.attributes,t),_f(e.styles,t));
var i=this.element=e.element?"string"==typeof e.element?e.element.toLowerCase():e.element:"*";
this.type=e.type||(L[i]?CKEDITOR.STYLE_BLOCK:P[i]?CKEDITOR.STYLE_OBJECT:CKEDITOR.STYLE_INLINE),"object"==typeof this.element&&(this.type=CKEDITOR.STYLE_OBJECT),this._={definition:e};
},CKEDITOR.style.prototype={apply:function(e){
if(e instanceof CKEDITOR.dom.document){
return N.call(this,e.getSelection());
}
if(this.checkApplicable(e.elementPath(),e)){
var t=this._.enterMode;
t||(this._.enterMode=e.activeEnterMode),N.call(this,e.getSelection(),0,e),this._.enterMode=t;
}
},remove:function(e){
if(e instanceof CKEDITOR.dom.document){
return N.call(this,e.getSelection(),1);
}
if(this.checkApplicable(e.elementPath(),e)){
var t=this._.enterMode;
t||(this._.enterMode=e.activeEnterMode),N.call(this,e.getSelection(),1,e),this._.enterMode=t;
}
},applyToRange:function(e){
return this.applyToRange=this.type==CKEDITOR.STYLE_INLINE?r:this.type==CKEDITOR.STYLE_BLOCK?m:this.type==CKEDITOR.STYLE_OBJECT?h:null,this.applyToRange(e);
},removeFromRange:function(e){
return this.removeFromRange=this.type==CKEDITOR.STYLE_INLINE?s:this.type==CKEDITOR.STYLE_BLOCK?g:this.type==CKEDITOR.STYLE_OBJECT?f:null,this.removeFromRange(e);
},applyToObject:function(e){
K(e,this);
},checkActive:function(e,t){
switch(this.type){
case CKEDITOR.STYLE_BLOCK:
return this.checkElementRemovable(e.block||e.blockLimit,!0,t);
case CKEDITOR.STYLE_OBJECT:
case CKEDITOR.STYLE_INLINE:
for(var n,i=e.elements,o=0;o<i.length;o++){
if(n=i[o],this.type!=CKEDITOR.STYLE_INLINE||n!=e.block&&n!=e.blockLimit){
if(this.type==CKEDITOR.STYLE_OBJECT){
var a=n.getName();
if(!("string"==typeof this.element?a==this.element:a in this.element)){
continue;
}
}
if(this.checkElementRemovable(n,!0,t)){
return !0;
}
}
}
}
return !1;
},checkApplicable:function(e,t,n){
if(t&&t instanceof CKEDITOR.filter&&(n=t),n&&!n.check(this)){
return !1;
}
switch(this.type){
case CKEDITOR.STYLE_OBJECT:
return !!e.contains(this.element);
case CKEDITOR.STYLE_BLOCK:
return !!e.blockLimit.getDtd()[this.element];
}
return !0;
},checkElementMatch:function(e,t){
var n=this._.definition;
if(!e||!n.ignoreReadonly&&e.isReadOnly()){
return !1;
}
var i,o=e.getName();
if("string"==typeof this.element?o==this.element:o in this.element){
if(!t&&!e.hasAttributes()){
return !0;
}
if(i=k(n),!i._length){
return !0;
}
for(var a in i){
if("_length"!=a){
var r=e.getAttribute(a)||"";
if("style"==a?x(i[a],r):i[a]==r){
if(!t){
return !0;
}
}else{
if(t){
return !1;
}
}
}
}
if(t){
return !0;
}
}
return !1;
},checkElementRemovable:function(e,t,n){
if(this.checkElementMatch(e,t,n)){
return !0;
}
var i=w(this)[e.getName()];
if(i){
var o,a;
if(!(o=i.attributes)){
return !0;
}
for(var r=0;r<o.length;r++){
a=o[r][0];
var s=e.getAttribute(a);
if(s){
var l=o[r][1];
if(null===l){
return !0;
}
if("string"==typeof l){
if(s==l){
return !0;
}
}else{
if(l.test(s)){
return !0;
}
}
}
}
}
return !1;
},buildPreview:function(e){
var t=this._.definition,n=[],i=t.element;
"bdo"==i&&(i="span"),n=["<",i];
var o=t.attributes;
if(o){
for(var a in o){
n.push(" ",a,"=\"",o[a],"\"");
}
}
var r=CKEDITOR.style.getStyleText(t);
return r&&n.push(" style=\"",r,"\""),n.push(">",e||t.name,"</",i,">"),n.join("");
},getDefinition:function(){
return this._.definition;
}},CKEDITOR.style.getStyleText=function(e){
var t=e._ST;
if(t){
return t;
}
t=e.styles;
var n=e.attributes&&e.attributes.style||"",i="";
n.length&&(n=n.replace(B,";"));
for(var o in t){
var a=t[o],r=(o+":"+a).replace(B,";");
"inherit"==a?i+=r:n+=r;
}
return n.length&&(n=CKEDITOR.tools.normalizeCssText(n,!0)),n+=i,e._ST=n;
},CKEDITOR.style.customHandlers={},CKEDITOR.style.addCustomHandler=function(e){
var t=function(e){
this._={definition:e},this.setup&&this.setup(e);
};
return t.prototype=CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.style.prototype),{assignedTo:CKEDITOR.STYLE_OBJECT},e,!0),this.customHandlers[e.type]=t,t;
};
var H=CKEDITOR.POSITION_PRECEDING|CKEDITOR.POSITION_IDENTICAL|CKEDITOR.POSITION_IS_CONTAINED,q=CKEDITOR.POSITION_FOLLOWING|CKEDITOR.POSITION_IDENTICAL|CKEDITOR.POSITION_IS_CONTAINED;
}(),CKEDITOR.styleCommand=function(e,t){
this.style=e,this.allowedContent=e,this.requiredContent=e,CKEDITOR.tools.extend(this,t,!0);
},CKEDITOR.styleCommand.prototype.exec=function(e){
e.focus(),this.state==CKEDITOR.TRISTATE_OFF?e.applyStyle(this.style):this.state==CKEDITOR.TRISTATE_ON&&e.removeStyle(this.style);
},CKEDITOR.stylesSet=new CKEDITOR.resourceManager("","stylesSet"),CKEDITOR.addStylesSet=CKEDITOR.tools.bind(CKEDITOR.stylesSet.add,CKEDITOR.stylesSet),CKEDITOR.loadStylesSet=function(e,t,n){
CKEDITOR.stylesSet.addExternal(e,t,""),CKEDITOR.stylesSet.load(e,n);
},CKEDITOR.tools.extend(CKEDITOR.editor.prototype,{attachStyleStateChange:function(e,t){
var n=this._.styleStateChangeCallbacks;
n||(n=this._.styleStateChangeCallbacks=[],this.on("selectionChange",function(e){
for(var t=0;t<n.length;t++){
var i=n[t],o=i.style.checkActive(e.data.path,this)?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF;
i.fn.call(this,o);
}
})),n.push({style:e,fn:t});
},applyStyle:function(e){
e.apply(this);
},removeStyle:function(e){
e.remove(this);
},getStylesSet:function(e){
if(this._.stylesDefinitions){
e(this._.stylesDefinitions);
}else{
var t=this,n=t.config.stylesCombo_stylesSet||t.config.stylesSet;
if(n===!1){
return void e(null);
}
if(n instanceof Array){
return t._.stylesDefinitions=n,void e(n);
}
n||(n="default");
var i=n.split(":"),o=i[0],a=i[1];
CKEDITOR.stylesSet.addExternal(o,a?i.slice(1).join(":"):CKEDITOR.getUrl("styles.js"),""),CKEDITOR.stylesSet.load(o,function(n){
t._.stylesDefinitions=n[o],e(t._.stylesDefinitions);
});
}
}}),CKEDITOR.dom.comment=function(e,t){
"string"==typeof e&&(e=(t?t.$:document).createComment(e)),CKEDITOR.dom.domObject.call(this,e);
},CKEDITOR.dom.comment.prototype=new CKEDITOR.dom.node,CKEDITOR.tools.extend(CKEDITOR.dom.comment.prototype,{type:CKEDITOR.NODE_COMMENT,getOuterHtml:function(){
return "<!--"+this.$.nodeValue+"-->";
}}),function(){
function e(e){
for(var t=e.getChildren(),n=0,i=t.count();i>n;n++){
var o=t.getItem(n);
if(o.type==CKEDITOR.NODE_ELEMENT&&CKEDITOR.dtd.$block[o.getName()]){
return !0;
}
}
return !1;
};
var t,n={},i={};
for(t in CKEDITOR.dtd.$blockLimit){
t in CKEDITOR.dtd.$list||(n[t]=1);
}
for(t in CKEDITOR.dtd.$block){
t in CKEDITOR.dtd.$blockLimit||t in CKEDITOR.dtd.$empty||(i[t]=1);
}
CKEDITOR.dom.elementPath=function(t,o){
var a,r=null,s=null,l=[],d=t;
o=o||t.getDocument().getBody();
do{
if(d.type==CKEDITOR.NODE_ELEMENT){
if(l.push(d),!this.lastElement&&(this.lastElement=d,d.is(CKEDITOR.dtd.$object)||"false"==d.getAttribute("contenteditable"))){
continue;
}
if(d.equals(o)){
break;
}
s||(a=d.getName(),"true"==d.getAttribute("contenteditable")?s=d:!r&&i[a]&&(r=d),n[a]&&(r||"div"!=a||e(d)?s=d:r=d));
}
}while(d=d.getParent());
s||(s=o),this.block=r,this.blockLimit=s,this.root=o,this.elements=l;
};
}(),CKEDITOR.dom.elementPath.prototype={compare:function(e){
var t=this.elements,n=e&&e.elements;
if(!n||t.length!=n.length){
return !1;
}
for(var i=0;i<t.length;i++){
if(!t[i].equals(n[i])){
return !1;
}
}
return !0;
},contains:function(e,t,n){
var i;
"string"==typeof e&&(i=function(t){
return t.getName()==e;
}),e instanceof CKEDITOR.dom.element?i=function(t){
return t.equals(e);
}:CKEDITOR.tools.isArray(e)?i=function(t){
return CKEDITOR.tools.indexOf(e,t.getName())>-1;
}:"function"==typeof e?i=e:"object"==typeof e&&(i=function(t){
return t.getName() in e;
});
var o=this.elements,a=o.length;
t&&a--,n&&(o=Array.prototype.slice.call(o,0),o.reverse());
for(var r=0;a>r;r++){
if(i(o[r])){
return o[r];
}
}
return null;
},isContextFor:function(e){
var t;
if(e in CKEDITOR.dtd.$block){
var n=this.contains(CKEDITOR.dtd.$intermediate);
return t=n||this.root.equals(this.block)&&this.block||this.blockLimit,!!t.getDtd()[e];
}
return !0;
},direction:function(){
var e=this.block||this.blockLimit||this.root;
return e.getDirection(1);
}},CKEDITOR.dom.text=function(e,t){
"string"==typeof e&&(e=(t?t.$:document).createTextNode(e)),this.$=e;
},CKEDITOR.dom.text.prototype=new CKEDITOR.dom.node,CKEDITOR.tools.extend(CKEDITOR.dom.text.prototype,{type:CKEDITOR.NODE_TEXT,getLength:function(){
return this.$.nodeValue.length;
},getText:function(){
return this.$.nodeValue;
},setText:function(e){
this.$.nodeValue=e;
},split:function(e){
var t=this.$.parentNode,n=t.childNodes.length,i=this.getLength(),o=this.getDocument(),a=new CKEDITOR.dom.text(this.$.splitText(e),o);
if(t.childNodes.length==n){
if(e>=i){
a=o.createText(""),a.insertAfter(this);
}else{
var r=o.createText("");
r.insertAfter(a),r.remove();
}
}
return a;
},substring:function(e,t){
return "number"!=typeof t?this.$.nodeValue.substr(e):this.$.nodeValue.substring(e,t);
}}),function(){
function e(e,t,n){
var i=e.serializable,o=t[n?"endContainer":"startContainer"],a=n?"endOffset":"startOffset",r=i?t.document.getById(e.startNode):e.startNode,s=i?t.document.getById(e.endNode):e.endNode;
return o.equals(r.getPrevious())?(t.startOffset=t.startOffset-o.getLength()-s.getPrevious().getLength(),o=s.getNext()):o.equals(s.getPrevious())&&(t.startOffset=t.startOffset-o.getLength(),o=s.getNext()),o.equals(r.getParent())&&t[a]++,o.equals(s.getParent())&&t[a]++,t[n?"endContainer":"startContainer"]=o,t;
};
CKEDITOR.dom.rangeList=function(e){
return e instanceof CKEDITOR.dom.rangeList?e:(e?e instanceof CKEDITOR.dom.range&&(e=[e]):e=[],CKEDITOR.tools.extend(e,t));
};
var t={createIterator:function(){
var e,t=this,n=CKEDITOR.dom.walker.bookmark(),i=[];
return {getNextRange:function(o){
e=void 0===e?0:e+1;
var a=t[e];
if(a&&t.length>1){
if(!e){
for(var r=t.length-1;r>=0;r--){
i.unshift(t[r].createBookmark(!0));
}
}
if(o){
for(var s=0;t[e+s+1];){
for(var l,d=a.document,c=0,u=d.getById(i[s].endNode),h=d.getById(i[s+1].startNode);;){
if(l=u.getNextSourceNode(!1),h.equals(l)){
c=1;
}else{
if(n(l)||l.type==CKEDITOR.NODE_ELEMENT&&l.isBlockBoundary()){
u=l;
continue;
}
}
break;
}
if(!c){
break;
}
s++;
}
}
for(a.moveToBookmark(i.shift());s--;){
l=t[++e],l.moveToBookmark(i.shift()),a.setEnd(l.endContainer,l.endOffset);
}
}
return a;
}};
},createBookmarks:function(t){
for(var n,i=[],o=0;o<this.length;o++){
i.push(n=this[o].createBookmark(t,!0));
for(var a=o+1;a<this.length;a++){
this[a]=e(n,this[a]),this[a]=e(n,this[a],!0);
}
}
return i;
},createBookmarks2:function(e){
for(var t=[],n=0;n<this.length;n++){
t.push(this[n].createBookmark2(e));
}
return t;
},moveToBookmarks:function(e){
for(var t=0;t<this.length;t++){
this[t].moveToBookmark(e[t]);
}
}};
}(),function(){
function e(){
return CKEDITOR.skinName.split(",")[0];
};
function t(){
return CKEDITOR.getUrl(CKEDITOR.skinName.split(",")[1]||"skins/"+e()+"/");
};
function n(e){
var n=CKEDITOR.skin["ua_"+e],i=CKEDITOR.env;
if(n){
n=n.split(",").sort(function(e,t){
return e>t?-1:1;
});
for(var o,a=0;a<n.length;a++){
if(o=n[a],i.ie&&(o.replace(/^ie/,"")==i.version||i.quirks&&"iequirks"==o)&&(o="ie"),i[o]){
e+="_"+n[a];
break;
}
}
}
return CKEDITOR.getUrl(t()+e+".css");
};
function i(e,t){
r[e]||(CKEDITOR.document.appendStyleSheet(n(e)),r[e]=1),t&&t();
};
function o(e){
var t=e.getById(s);
return t||(t=e.getHead().append("style"),t.setAttribute("id",s),t.setAttribute("type","text/css")),t;
};
function a(e,t,n){
var i,o,a;
if(CKEDITOR.env.webkit){
for(t=t.split("}").slice(0,-1),o=0;o<t.length;o++){
t[o]=t[o].split("{");
}
}
for(var r=0;r<e.length;r++){
if(CKEDITOR.env.webkit){
for(o=0;o<t.length;o++){
for(a=t[o][1],i=0;i<n.length;i++){
a=a.replace(n[i][0],n[i][1]);
}
e[r].$.sheet.addRule(t[o][0],a);
}
}else{
for(a=t,i=0;i<n.length;i++){
a=a.replace(n[i][0],n[i][1]);
}
CKEDITOR.env.ie&&CKEDITOR.env.version<11?e[r].$.styleSheet.cssText+=a:e[r].$.innerHTML+=a;
}
}
};
var r={};
CKEDITOR.skin={path:t,loadPart:function(n,o){
CKEDITOR.skin.name!=e()?CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(t()+"skin.js"),function(){
i(n,o);
}):i(n,o);
},getPath:function(e){
return CKEDITOR.getUrl(n(e));
},icons:{},addIcon:function(e,t,n,i){
e=e.toLowerCase(),this.icons[e]||(this.icons[e]={path:t,offset:n||0,bgsize:i||"16px"});
},getIconStyle:function(e,t,n,i,o){
var a,r,s,l;
return e&&(e=e.toLowerCase(),t&&(a=CKEDITOR.lang.ar||CKEDITOR.lang.fa?this.icons[e+"-rtl-ar"]||this.icons[e+"-rtl"]:this.icons[e+"-rtl"]),a||(a=this.icons[e])),r=n||a&&a.path||"",s=i||a&&a.offset,l=o||a&&a.bgsize||"16px",r&&(r=r.replace(/'/g,"\\'")),r&&"background-image:url('"+CKEDITOR.getUrl(r)+"');background-position:0 "+s+"px;background-size:"+l+";";
}},CKEDITOR.tools.extend(CKEDITOR.editor.prototype,{getUiColor:function(){
return this.uiColor;
},setUiColor:function(e){
var t=o(CKEDITOR.document);
return (this.setUiColor=function(e){
this.uiColor=e;
var n=CKEDITOR.skin.chameleon,i="",o="";
"function"==typeof n&&(i=n(this,"editor"),o=n(this,"panel"));
var r=[[d,e]];
a([t],i,r),a(l,o,r);
}).call(this,e);
}});
var s="cke_ui_color",l=[],d=/\$color/g;
CKEDITOR.on("instanceLoaded",function(e){
if(!CKEDITOR.env.ie||!CKEDITOR.env.quirks){
var t=e.editor,n=function(e){
var n=e.data[0]||e.data,i=n.element.getElementsByTag("iframe").getItem(0).getFrameDocument();
if(!i.getById("cke_ui_color")){
var r=o(i);
l.push(r);
var s=t.getUiColor();
s&&a([r],CKEDITOR.skin.chameleon(t,"panel"),[[d,s]]);
}
};
t.on("panelShow",n),t.on("menuShow",n),t.config.uiColor&&t.setUiColor(t.config.uiColor);
}
});
}(),function(){
if(CKEDITOR.env.webkit){
CKEDITOR.env.hc=!1;
}else{
var e=CKEDITOR.dom.element.createFromHtml("<div style=\"width:0;height:0;position:absolute;left:-10000px;border:1px solid;border-color:red blue\"></div>",CKEDITOR.document);
e.appendTo(CKEDITOR.document.getHead());
try{
var t=e.getComputedStyle("border-top-color"),n=e.getComputedStyle("border-right-color");
CKEDITOR.env.hc=!(!t||t!=n);
}
catch(i){
CKEDITOR.env.hc=!1;
}
e.remove();
}
CKEDITOR.env.hc&&(CKEDITOR.env.cssClass+=" cke_hc"),CKEDITOR.document.appendStyleText(".cke{visibility:hidden;}"),CKEDITOR.status="loaded",CKEDITOR.fireOnce("loaded");
var o=CKEDITOR._.pending;
if(o){
delete CKEDITOR._.pending;
for(var a=0;a<o.length;a++){
CKEDITOR.editor.prototype.constructor.apply(o[a][0],o[a][1]),CKEDITOR.add(o[a][0]);
}
}
}(),CKEDITOR.lang&&(CKEDITOR.lang.languages={ar:1,eu:1,bg:1,ca:1,zh:1,"zh-tw":1,hr:1,cs:1,da:1,nl:1,en:1,fi:1,fr:1,de:1,el:1,iw:1,hu:1,id:1,it:1,ja:1,kk:1,ko:1,no:1,pl:1,pt:1,"pt-br":1,ro:1,ru:1,sk:1,sl:1,es:1,sr:1,sv:1,th:1,tr:1,he:1,nb:1,"zh-cn":1,uk:1},CKEDITOR.lang.rtl={ar:1,iw:1,he:1}),CKEDITOR.on("specialcharPluginReady",function(e){
var t=e.data;
t.availableLangs=CKEDITOR.lang.languages;
}),CKEDITOR.on("a11yhelpPluginReady",function(e){
var t=e.data;
t.availableLangs=CKEDITOR.lang.languages;
}),CKEDITOR.skin.name="oneui3",CKEDITOR.skin.ua_editor="ie,ie7,ie8,iequirks,webkit,opera,gecko",CKEDITOR.skin.ua_dialog="ie,ie7,ie8,ie9,iequirks,opera,gecko",CKEDITOR.skin.dialogDimensions={anchor:[300,120],a11yHelp:[600,400],cellProperties:[280,230],colordialog:[360,230],find:[300,100],flash:[340,292],iframe:[350,200],image:[366,353],link:[450,300],paste:[300,220],pastetext:[300,220],smiley:[300,80],specialchar:[410,305],table:[320,100],tableProperties:[320,250],numberedListStyle:[360,45],bulletedListStyle:[200,45]},CKEDITOR.plugins.add("dialogui",{onLoad:function(){
var e=function(e){
this._||(this._={}),this._["default"]=this._.initValue=e["default"]||"",this._.required=e.required||!1;
for(var t=[this._],n=1;n<arguments.length;n++){
t.push(arguments[n]);
}
return t.push(!0),CKEDITOR.tools.extend.apply(CKEDITOR.tools,t),this._;
},t={build:function(e,t,n){
return new CKEDITOR.ui.dialog.textInput(e,t,n);
}},n={build:function(e,t,n){
return new CKEDITOR.ui.dialog[t.type](e,t,n);
}},i={build:function(e,t,n){
for(var i,o=t.children,a=[],r=[],s=0;s<o.length&&(i=o[s]);s++){
var l=[];
a.push(l),r.push(CKEDITOR.dialog._.uiElementBuilders[i.type].build(e,i,l));
}
return new CKEDITOR.ui.dialog[t.type](e,r,a,n,t);
}},o={isChanged:function(){
return this.getValue()!=this.getInitValue();
},reset:function(e){
this.setValue(this.getInitValue(),e);
},setInitValue:function(){
this._.initValue=this.getValue();
},resetInitValue:function(){
this._.initValue=this._["default"];
},getInitValue:function(){
return this._.initValue;
}},a=CKEDITOR.tools.extend({},CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors,{onChange:function(e,t){
this._.domOnChangeRegistered||(e.on("load",function(){
this.getInputElement().on("change",function(){
e.parts.dialog.isVisible()&&this.fire("change",{value:this.getValue()});
},this);
},this),this._.domOnChangeRegistered=!0),this.on("change",t);
}},!0),r=/^on([A-Z]\w+)/,s=function(e){
for(var t in e){
(r.test(t)||"title"==t||"type"==t)&&delete e[t];
}
return e;
},l=function(e){
var t=e.data.getKeystroke();
t==CKEDITOR.SHIFT+CKEDITOR.ALT+36?this.setDirectionMarker("ltr"):t==CKEDITOR.SHIFT+CKEDITOR.ALT+35&&this.setDirectionMarker("rtl");
};
CKEDITOR.tools.extend(CKEDITOR.ui.dialog,{labeledElement:function(t,n,i,o){
if(!(arguments.length<4)){
var a=e.call(this,n);
a.labelId=CKEDITOR.tools.getNextId()+"_label",this._.children=[];
var r=function(){
var e=[],i=n.required?" cke_required":"";
if("horizontal"!=n.labelLayout){
e.push("<label class=\"cke_dialog_ui_labeled_label"+i+"\" "," id=\""+a.labelId+"\"",a.inputId?" for=\""+a.inputId+"\"":"",(n.labelStyle?" style=\""+n.labelStyle+"\"":"")+">",n.label,"</label>","<div class=\"cke_dialog_ui_labeled_content\"",n.controlStyle?" style=\""+n.controlStyle+"\"":""," role=\"presentation\">",o.call(this,t,n),"</div>");
}else{
var r={type:"hbox",widths:n.widths,padding:0,children:[{type:"html",html:"<label class=\"cke_dialog_ui_labeled_label"+i+"\" id=\""+a.labelId+"\" for=\""+a.inputId+"\""+(n.labelStyle?" style=\""+n.labelStyle+"\"":"")+">"+CKEDITOR.tools.htmlEncode(n.label)+"</label>"},{type:"html",html:"<span class=\"cke_dialog_ui_labeled_content\""+(n.controlStyle?" style=\""+n.controlStyle+"\"":"")+">"+o.call(this,t,n)+"</span>"}]};
CKEDITOR.dialog._.uiElementBuilders.hbox.build(t,r,e);
}
return e.join("");
},s={role:n.role||"presentation"};
n.includeLabel&&(s["aria-labelledby"]=a.labelId),CKEDITOR.ui.dialog.uiElement.call(this,t,n,i,"div",null,s,r);
}
},textInput:function(t,n,i){
if(!(arguments.length<3)){
e.call(this,n);
var o=this._.inputId=CKEDITOR.tools.getNextId()+"_textInput",a={"class":"cke_dialog_ui_input_"+n.type,id:o,type:n.type};
n.validate&&(this.validate=n.validate),n.maxLength&&(a.maxlength=n.maxLength),n.size&&(a.size=n.size),n.inputStyle&&(a.style=n.inputStyle);
var r=this,s=!1;
t.on("load",function(){
r.getInputElement().on("keydown",function(e){
13==e.data.getKeystroke()&&(s=!0);
}),r.getInputElement().on("keyup",function(e){
13==e.data.getKeystroke()&&s&&(t.getButton("ok")&&setTimeout(function(){
t.getButton("ok").click();
},0),s=!1),r.bidi&&l.call(r,e);
},null,null,1000);
});
var d=function(){
var e=["<div class=\"cke_dialog_ui_input_",n.type,"\" role=\"presentation\""];
n.width&&e.push("style=\"width:"+n.width+"\" "),e.push("><input "),a["aria-labelledby"]=this._.labelId,this._.required&&(a["aria-required"]=this._.required);
for(var t in a){
e.push(t+"=\""+a[t]+"\" ");
}
return e.push(" /></div>"),e.join("");
};
CKEDITOR.ui.dialog.labeledElement.call(this,t,n,i,d);
}
},textarea:function(t,n,i){
if(!(arguments.length<3)){
e.call(this,n);
var o=this,a=this._.inputId=CKEDITOR.tools.getNextId()+"_textarea",r={};
n.validate&&(this.validate=n.validate),r.rows=n.rows||5,r.cols=n.cols||20,r["class"]="cke_dialog_ui_input_textarea "+(n["class"]||""),"undefined"!=typeof n.inputStyle&&(r.style=n.inputStyle),n.dir&&(r.dir=n.dir),o.bidi&&t.on("load",function(){
o.getInputElement().on("keyup",l);
},o);
var s=function(){
r["aria-labelledby"]=this._.labelId,this._.required&&(r["aria-required"]=this._.required);
var e=["<div class=\"cke_dialog_ui_input_textarea\" role=\"presentation\"><textarea id=\"",a,"\" "];
for(var t in r){
e.push(t+"=\""+CKEDITOR.tools.htmlEncode(r[t])+"\" ");
}
return e.push(">",CKEDITOR.tools.htmlEncode(o._["default"]),"</textarea></div>"),e.join("");
};
CKEDITOR.ui.dialog.labeledElement.call(this,t,n,i,s);
}
},checkbox:function(t,n,i){
if(!(arguments.length<3)){
var o=e.call(this,n,{"default":!!n["default"]});
n.validate&&(this.validate=n.validate);
var a=function(){
var e=CKEDITOR.tools.extend({},n,{id:n.id?n.id+"_checkbox":CKEDITOR.tools.getNextId()+"_checkbox"},!0),i=[],a=CKEDITOR.tools.getNextId()+"_label",r={"class":"cke_dialog_ui_checkbox_input",type:"checkbox","aria-labelledby":a};
return s(e),n["default"]&&(r.checked="checked"),"undefined"!=typeof e.inputStyle&&(e.style=e.inputStyle),o.checkbox=new CKEDITOR.ui.dialog.uiElement(t,e,i,"input",null,r),i.push(" <label id=\"",a,"\" for=\"",r.id,"\""+(n.labelStyle?" style=\""+n.labelStyle+"\"":"")+">",CKEDITOR.tools.htmlEncode(n.label),"</label>"),i.join("");
};
CKEDITOR.ui.dialog.uiElement.call(this,t,n,i,"span",null,null,a);
}
},radio:function(t,n,i){
if(!(arguments.length<3)){
e.call(this,n),this._["default"]||(this._["default"]=this._.initValue=n.items[0][1]),n.validate&&(this.validate=n.validate);
var o=[],a=this,r=function(){
for(var e=[],i=[],r=(n.id?n.id:CKEDITOR.tools.getNextId())+"_radio",l=0;l<n.items.length;l++){
var d=n.items[l],c=void 0!==d[2]?d[2]:d[0],u=void 0!==d[1]?d[1]:d[0],h=CKEDITOR.tools.getNextId()+"_radio_input",f=h+"_label",m=CKEDITOR.tools.extend({},n,{id:h,title:null,type:null},!0),g=CKEDITOR.tools.extend({},m,{title:c},!0),p={type:"radio","class":"cke_dialog_ui_radio_input",name:r,value:u,"aria-labelledby":f},E=[];
a._["default"]==u&&(p.checked="checked"),s(m),s(g),"undefined"!=typeof m.inputStyle&&(m.style=m.inputStyle),m.keyboardFocusable=!0,o.push(new CKEDITOR.ui.dialog.uiElement(t,m,E,"input",null,p)),E.push(" "),new CKEDITOR.ui.dialog.uiElement(t,g,E,"label",null,{id:f,"for":p.id},d[0]),e.push(E.join(""));
}
return new CKEDITOR.ui.dialog.hbox(t,o,e,i),i.join("");
};
n.role="radiogroup",n.includeLabel=!0,CKEDITOR.ui.dialog.labeledElement.call(this,t,n,i,r),this._.children=o;
}
},button:function(t,n,i){
if(arguments.length){
"function"==typeof n&&(n=n(t.getParentEditor())),e.call(this,n,{disabled:n.disabled||!1}),CKEDITOR.event.implementOn(this);
var o=this;
t.on("load",function(){
var e=this.getElement();
!function(){
e.on("click",function(e){
o.click(),e.data.preventDefault();
}),e.on("keydown",function(e){
e.data.getKeystroke() in {32:1}&&(o.click(),e.data.preventDefault());
});
}(),e.unselectable();
},this);
var a=CKEDITOR.tools.extend({},n);
delete a.style;
var r=CKEDITOR.tools.getNextId()+"_label";
CKEDITOR.ui.dialog.uiElement.call(this,t,a,i,"a",null,{style:n.style,href:"javascript:void(0)",title:n.label,hidefocus:"true","class":n["class"],role:"button","aria-labelledby":r},"<span id=\""+r+"\" class=\"cke_dialog_ui_button\">"+CKEDITOR.tools.htmlEncode(n.label)+"</span>");
}
},select:function(t,n,i){
if(!(arguments.length<3)){
var o=e.call(this,n);
n.validate&&(this.validate=n.validate),o.inputId=CKEDITOR.tools.getNextId()+"_select";
var a=function(){
var e=CKEDITOR.tools.extend({},n,{id:n.id?n.id+"_select":CKEDITOR.tools.getNextId()+"_select"},!0),i=[],a=[],r={id:o.inputId,"class":"cke_dialog_ui_input_select","aria-labelledby":this._.labelId};
i.push("<div class=\"cke_dialog_ui_input_",n.type,"\" role=\"presentation\""),n.width&&i.push("style=\"width:"+n.width+"\" "),i.push(">"),void 0!==n.size&&(r.size=n.size),void 0!==n.multiple&&(r.multiple=n.multiple),s(e);
for(var l,d=0;d<n.items.length&&(l=n.items[d]);d++){
a.push("<option value=\"",CKEDITOR.tools.htmlEncode(void 0!==l[1]?l[1]:l[0]).replace(/"/g,"&quot;"),"\" /> ",CKEDITOR.tools.htmlEncode(l[0]));
}
return "undefined"!=typeof e.inputStyle&&(e.style=e.inputStyle),o.select=new CKEDITOR.ui.dialog.uiElement(t,e,i,"select",null,r,a.join("")),i.push("</div>"),i.join("");
};
CKEDITOR.ui.dialog.labeledElement.call(this,t,n,i,a);
}
},file:function(t,n,i){
if(!(arguments.length<3)){
void 0===n["default"]&&(n["default"]="");
var o=CKEDITOR.tools.extend(e.call(this,n),{definition:n,buttons:[]});
n.validate&&(this.validate=n.validate);
var a=function(){
o.frameId=CKEDITOR.tools.getNextId()+"_fileInput";
var e=["<iframe frameborder=\"0\" allowtransparency=\"0\" class=\"cke_dialog_ui_input_file\" role=\"presentation\" id=\"",o.frameId,"\" title=\"",n.label,"\" src=\"javascript:void("];
return e.push(CKEDITOR.env.ie?"(function(){"+encodeURIComponent("document.open();("+CKEDITOR.tools.fixDomain+")();document.close();")+"})()":"0"),e.push(")\"></iframe>"),e.join("");
};
t.on("load",function(){
var e=CKEDITOR.document.getById(o.frameId),t=e.getParent();
t.addClass("cke_dialog_ui_input_file");
}),CKEDITOR.ui.dialog.labeledElement.call(this,t,n,i,a);
}
},fileButton:function(t,n,i){
var o=this;
if(!(arguments.length<3)){
e.call(this,n),n.validate&&(this.validate=n.validate);
var a=CKEDITOR.tools.extend({},n),r=a.onClick;
a.className=(a.className?a.className+" ":"")+"cke_dialog_ui_button",a.onClick=function(e){
var i=n["for"];
r&&r.call(this,e)===!1||(t.getContentElement(i[0],i[1]).submit(),this.disable());
},t.on("load",function(){
t.getContentElement(n["for"][0],n["for"][1])._.buttons.push(o);
}),CKEDITOR.ui.dialog.button.call(this,t,a,i);
}
},html:function(){
var e=/^\s*<[\w:]+\s+([^>]*)?>/,t=/^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/,n=/\/$/;
return function(i,o,a){
if(!(arguments.length<3)){
var r,s,l,d=[],c=o.html;
"<"!=c.charAt(0)&&(c="<span>"+c+"</span>");
var u=o.focus;
if(u){
var h=this.focus;
if(this.focus=function(){
("function"==typeof u?u:h).call(this),this.fire("focus");
},o.isFocusable){
var f=this.isFocusable;
this.isFocusable=f;
}
this.keyboardFocusable=!0;
}
CKEDITOR.ui.dialog.uiElement.call(this,i,o,d,"span",null,null,""),r=d.join(""),s=r.match(e),l=c.match(t)||["","",""],n.test(l[1])&&(l[1]=l[1].slice(0,-1),l[2]="/"+l[2]),a.push([l[1]," ",s[1]||"",l[2]].join(""));
}
};
}(),fieldset:function(e,t,n,i,o){
var a=o.label,r=function(){
var e=[];
a&&e.push("<legend"+(o.labelStyle?" style=\""+o.labelStyle+"\"":"")+">"+a+"</legend>");
for(var t=0;t<n.length;t++){
e.push(n[t]);
}
return e.join("");
};
this._={children:t},CKEDITOR.ui.dialog.uiElement.call(this,e,o,i,"fieldset",null,null,r);
}},!0),CKEDITOR.ui.dialog.html.prototype=new CKEDITOR.ui.dialog.uiElement,CKEDITOR.ui.dialog.labeledElement.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement,{setLabel:function(e){
var t=CKEDITOR.document.getById(this._.labelId);
return t.getChildCount()<1?new CKEDITOR.dom.text(e,CKEDITOR.document).appendTo(t):t.getChild(0).$.nodeValue=e,this;
},getLabel:function(){
var e=CKEDITOR.document.getById(this._.labelId);
return !e||e.getChildCount()<1?"":e.getChild(0).getText();
},eventProcessors:a},!0),CKEDITOR.ui.dialog.button.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement,{click:function(){
return this._.disabled?!1:this.fire("click",{dialog:this._.dialog});
},enable:function(){
this._.disabled=!1;
var e=this.getElement();
e&&e.removeClass("cke_disabled");
},disable:function(){
this._.disabled=!0,this.getElement().addClass("cke_disabled");
},isVisible:function(){
return this.getElement().getFirst().isVisible();
},isEnabled:function(){
return !this._.disabled;
},eventProcessors:CKEDITOR.tools.extend({},CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors,{onClick:function(e,t){
this.on("click",function(){
t.apply(this,arguments);
});
}},!0),accessKeyUp:function(){
this.click();
},accessKeyDown:function(){
this.focus();
},keyboardFocusable:!0},!0),CKEDITOR.ui.dialog.textInput.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement,{getInputElement:function(){
return CKEDITOR.document.getById(this._.inputId);
},focus:function(){
var e=this.selectParentTab();
setTimeout(function(){
var t=e.getInputElement();
t&&t.$.focus();
},0);
},select:function(){
var e=this.selectParentTab();
setTimeout(function(){
var t=e.getInputElement();
t&&(t.$.focus(),t.$.select());
},0);
},accessKeyUp:function(){
this.select();
},setValue:function(e){
if(this.bidi){
var t=e&&e.charAt(0),n=""==t?"ltr":""==t?"rtl":null;
n&&(e=e.slice(1)),this.setDirectionMarker(n);
}
return e||(e=""),CKEDITOR.ui.dialog.uiElement.prototype.setValue.apply(this,arguments);
},getValue:function(){
var e=CKEDITOR.ui.dialog.uiElement.prototype.getValue.call(this);
if(this.bidi&&e){
var t=this.getDirectionMarker();
t&&(e=("ltr"==t?"":"")+e);
}
return e;
},setDirectionMarker:function(e){
var t=this.getInputElement();
e?t.setAttributes({dir:e,"data-cke-dir-marker":e}):this.getDirectionMarker()&&t.removeAttributes(["dir","data-cke-dir-marker"]);
},getDirectionMarker:function(){
return this.getInputElement().data("cke-dir-marker");
},keyboardFocusable:!0},o,!0),CKEDITOR.ui.dialog.textarea.prototype=new CKEDITOR.ui.dialog.textInput,CKEDITOR.ui.dialog.select.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement,{getInputElement:function(){
return this._.select.getElement();
},add:function(e,t,n){
var i=new CKEDITOR.dom.element("option",this.getDialog().getParentEditor().document),o=this.getInputElement().$;
return i.$.text=e,i.$.value=void 0===t||null===t?e:t,void 0===n||null===n?CKEDITOR.env.ie?o.add(i.$):o.add(i.$,null):o.add(i.$,n),this;
},remove:function(e){
var t=this.getInputElement().$;
return t.remove(e),this;
},clear:function(){
for(var e=this.getInputElement().$;e.length>0;){
e.remove(0);
}
return this;
},keyboardFocusable:!0},o,!0),CKEDITOR.ui.dialog.checkbox.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement,{getInputElement:function(){
return this._.checkbox.getElement();
},setValue:function(e,t){
this.getInputElement().$.checked=e,!t&&this.fire("change",{value:e});
},getValue:function(){
return this.getInputElement().$.checked;
},accessKeyUp:function(){
this.setValue(!this.getValue());
},eventProcessors:{onChange:function(e,t){
return !CKEDITOR.env.ie||CKEDITOR.env.version>8?a.onChange.apply(this,arguments):(e.on("load",function(){
var e=this._.checkbox.getElement();
e.on("propertychange",function(t){
t=t.data.$,"checked"==t.propertyName&&this.fire("change",{value:e.$.checked});
},this);
},this),this.on("change",t),null);
}},keyboardFocusable:!0},o,!0),CKEDITOR.ui.dialog.radio.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement,{setValue:function(e,t){
for(var n,i=this._.children,o=0;o<i.length&&(n=i[o]);o++){
n.getElement().$.checked=n.getValue()==e;
}
!t&&this.fire("change",{value:e});
},getValue:function(){
for(var e=this._.children,t=0;t<e.length;t++){
if(e[t].getElement().$.checked){
return e[t].getValue();
}
}
return null;
},accessKeyUp:function(){
var e,t=this._.children;
for(e=0;e<t.length;e++){
if(t[e].getElement().$.checked){
return void t[e].getElement().focus();
}
}
t[0].getElement().focus();
},eventProcessors:{onChange:function(e,t){
return !CKEDITOR.env.ie||CKEDITOR.env.version>8?a.onChange.apply(this,arguments):(e.on("load",function(){
for(var e=this._.children,t=this,n=0;n<e.length;n++){
var i=e[n].getElement();
i.on("propertychange",function(e){
e=e.data.$,"checked"==e.propertyName&&this.$.checked&&t.fire("change",{value:this.getAttribute("value")});
});
}
},this),this.on("change",t),null);
}}},o,!0),CKEDITOR.ui.dialog.file.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement,o,{getInputElement:function(){
var e=CKEDITOR.document.getById(this._.frameId).getFrameDocument();
return e.$.forms.length>0?new CKEDITOR.dom.element(e.$.forms[0].elements[0]):this.getElement();
},submit:function(){
return this.getInputElement().getParent().$.submit(),this;
},getAction:function(){
return this.getInputElement().getParent().$.action;
},registerEvents:function(e){
var t,n=/^on([A-Z]\w+)/,i=function(e,t,n,i){
e.on("formLoaded",function(){
e.getInputElement().on(n,i,e);
});
};
for(var o in e){
(t=o.match(n))&&(this.eventProcessors[o]?this.eventProcessors[o].call(this,this._.dialog,e[o]):i(this,this._.dialog,t[1].toLowerCase(),e[o]));
}
return this;
},reset:function(){
function e(){
i.$.open();
var e="";
o.size&&(e=o.size-(CKEDITOR.env.ie?7:0));
var n=t.frameId+"_input";
i.$.write(["<html dir=\""+l+"\" lang=\""+d+"\"><head><title></title></head><body style=\"margin: 0; overflow: hidden; background: transparent;\">","<form enctype=\"multipart/form-data\" method=\"POST\" dir=\""+l+"\" lang=\""+d+"\" action=\"",CKEDITOR.tools.htmlEncode(o.action),"\">","<label id=\"",t.labelId,"\" for=\"",n,"\" style=\"display:none\">",CKEDITOR.tools.htmlEncode(o.label),"</label>","<input style=\"width:100%\" id=\"",n,"\" aria-labelledby=\"",t.labelId,"\" type=\"file\" name=\"",CKEDITOR.tools.htmlEncode(o.id||"cke_upload"),"\" size=\"",CKEDITOR.tools.htmlEncode(e>0?e:""),"\" />","</form>","</body></html>","<script>",CKEDITOR.env.ie?"("+CKEDITOR.tools.fixDomain+")();":"","window.parent.CKEDITOR.tools.callFunction("+r+");","window.onbeforeunload = function() {window.parent.CKEDITOR.tools.callFunction("+s+")}","</script>"].join("")),i.$.close();
for(var c=0;c<a.length;c++){
a[c].enable();
}
};
var t=this._,n=CKEDITOR.document.getById(t.frameId),i=n.getFrameDocument(),o=t.definition,a=t.buttons,r=this.formLoadedNumber,s=this.formUnloadNumber,l=t.dialog._.editor.lang.dir,d=t.dialog._.editor.langCode;
r||(r=this.formLoadedNumber=CKEDITOR.tools.addFunction(function(){
this.fire("formLoaded");
},this),s=this.formUnloadNumber=CKEDITOR.tools.addFunction(function(){
this.getInputElement().clearCustomData();
},this),this.getDialog()._.editor.on("destroy",function(){
CKEDITOR.tools.removeFunction(r),CKEDITOR.tools.removeFunction(s);
})),CKEDITOR.env.gecko?setTimeout(e,500):e();
},getValue:function(){
return this.getInputElement().$.value||"";
},setInitValue:function(){
this._.initValue="";
},eventProcessors:{onChange:function(e,t){
this._.domOnChangeRegistered||(this.on("formLoaded",function(){
this.getInputElement().on("change",function(){
this.fire("change",{value:this.getValue()});
},this);
},this),this._.domOnChangeRegistered=!0),this.on("change",t);
}},keyboardFocusable:!0},!0),CKEDITOR.ui.dialog.fileButton.prototype=new CKEDITOR.ui.dialog.button,CKEDITOR.ui.dialog.fieldset.prototype=CKEDITOR.tools.clone(CKEDITOR.ui.dialog.hbox.prototype),CKEDITOR.dialog.addUIElement("text",t),CKEDITOR.dialog.addUIElement("password",t),CKEDITOR.dialog.addUIElement("textarea",n),CKEDITOR.dialog.addUIElement("checkbox",n),CKEDITOR.dialog.addUIElement("radio",n),CKEDITOR.dialog.addUIElement("button",n),CKEDITOR.dialog.addUIElement("select",n),CKEDITOR.dialog.addUIElement("file",n),CKEDITOR.dialog.addUIElement("fileButton",n),CKEDITOR.dialog.addUIElement("html",n),CKEDITOR.dialog.addUIElement("fieldset",i);
}}),CKEDITOR.DIALOG_RESIZE_NONE=0,CKEDITOR.DIALOG_RESIZE_WIDTH=1,CKEDITOR.DIALOG_RESIZE_HEIGHT=2,CKEDITOR.DIALOG_RESIZE_BOTH=3,CKEDITOR.DIALOG_STATE_IDLE=1,CKEDITOR.DIALOG_STATE_BUSY=2,function(){
function e(e){
return !!this._.tabs[e][0].$.offsetHeight;
};
function t(){
for(var t=this._.currentTabId,n=this._.tabIdList.length,i=CKEDITOR.tools.indexOf(this._.tabIdList,t)+n,o=i-1;o>i-n;o--){
if(e.call(this,this._.tabIdList[o%n])){
return this._.tabIdList[o%n];
}
}
return null;
};
function n(){
for(var t=this._.currentTabId,n=this._.tabIdList.length,i=CKEDITOR.tools.indexOf(this._.tabIdList,t),o=i+1;i+n>o;o++){
if(e.call(this,this._.tabIdList[o%n])){
return this._.tabIdList[o%n];
}
}
return null;
};
function i(e,t){
for(var n=e.$.getElementsByTagName("input"),i=0,o=n.length;o>i;i++){
var a=new CKEDITOR.dom.element(n[i]);
"text"==a.getAttribute("type").toLowerCase()&&(t?(a.setAttribute("value",a.getCustomData("fake_value")||""),a.removeCustomData("fake_value")):(a.setCustomData("fake_value",a.getAttribute("value")),a.setAttribute("value","")));
}
};
function o(e,t){
var n=this.getInputElement();
n&&(e?n.removeAttribute("aria-invalid"):n.setAttribute("aria-invalid",!0)),e||(this.select?this.select():this.focus()),t&&alert(t),this.fire("validated",{valid:e,msg:t});
};
function a(){
var e=this.getInputElement();
e&&e.removeAttribute("aria-invalid");
};
function r(e){
var t=CKEDITOR.dom.element.createFromHtml(CKEDITOR.addTemplate("dialog",E).output({id:CKEDITOR.tools.getNextNumber(),editorId:e.id,langDir:e.lang.dir,langCode:e.langCode,editorDialogClass:"cke_editor_"+e.name.replace(/\./g,"\\.")+"_dialog",closeTitle:e.lang.common.close,hidpi:CKEDITOR.env.hidpi?"cke_hidpi":""})),n=t.getChild([0,0,0,0,0]),i=n.getChild(0),o=n.getChild(1);
if(e.plugins.clipboard&&CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(n),CKEDITOR.env.ie&&!CKEDITOR.env.quirks&&!CKEDITOR.env.edge){
var a="javascript:void(function(){"+encodeURIComponent("document.open();("+CKEDITOR.tools.fixDomain+")();document.close();")+"}())",r=CKEDITOR.dom.element.createFromHtml("<iframe frameBorder=\"0\" class=\"cke_iframe_shim\" src=\""+a+"\" tabIndex=\"-1\"></iframe>");
r.appendTo(n.getParent());
}
return i.unselectable(),o.unselectable(),{element:t,parts:{dialog:t.getChild(0),title:i,close:o,tabs:n.getChild(2),contents:n.getChild([3,0,0,0]),footer:n.getChild([3,0,1,0])}};
};
function s(e,t,n){
this.element=t,this.focusIndex=n,this.tabIndex=0,this.isFocusable=function(){
return !t.getAttribute("disabled")&&t.isVisible();
},this.focus=function(){
e._.currentFocusIndex=this.focusIndex,this.element.focus();
},t.on("keydown",function(e){
e.data.getKeystroke() in {32:1,13:1}&&this.fire("click");
}),t.on("focus",function(){
this.fire("mouseover");
}),t.on("blur",function(){
this.fire("mouseout");
});
};
function l(e){
function t(){
e.layout();
};
var n=CKEDITOR.document.getWindow();
n.on("resize",t),e.on("hide",function(){
n.removeListener("resize",t);
});
};
function d(e,t){
this._={dialog:e},CKEDITOR.tools.extend(this,t);
};
function c(e){
function t(t){
var n,l,d=e.getSize(),c=CKEDITOR.document.getWindow().getViewPaneSize(),u=t.data.$.screenX,h=t.data.$.screenY,f=u-i.x,m=h-i.y;
i={x:u,y:h},o.x+=f,o.y+=m,n=o.x+s[3]<r?-s[3]:o.x-s[1]>c.width-d.width-r?c.width-d.width+("rtl"==a.lang.dir?0:s[1]):o.x,l=o.y+s[0]<r?-s[0]:o.y-s[2]>c.height-d.height-r?c.height-d.height+s[2]:o.y,e.move(n,l,1),t.data.preventDefault();
};
function n(){
if(CKEDITOR.document.removeListener("mousemove",t),CKEDITOR.document.removeListener("mouseup",n),CKEDITOR.env.ie6Compat){
var e=b.getChild(0).getFrameDocument();
e.removeListener("mousemove",t),e.removeListener("mouseup",n);
}
};
var i=null,o=null,a=e.getParentEditor(),r=a.config.dialog_magnetDistance,s=CKEDITOR.skin.margins||[0,0,0,0];
"undefined"==typeof r&&(r=20),e.parts.title.on("mousedown",function(a){
if(i={x:a.data.$.screenX,y:a.data.$.screenY},CKEDITOR.document.on("mousemove",t),CKEDITOR.document.on("mouseup",n),o=e.getPosition(),CKEDITOR.env.ie6Compat){
var r=b.getChild(0).getFrameDocument();
r.on("mousemove",t),r.on("mouseup",n);
}
a.data.preventDefault();
},e);
};
function u(e){
function t(t){
var n="rtl"==u.lang.dir,c=(t.data.$.screenX-l.x)*(n?-1:1),h=t.data.$.screenY-l.y,f=d.width,m=d.height,g=f+c*(e._.moved?1:2),p=m+h*(e._.moved?1:2),E=e._.element.getFirst(),T=n&&E.getComputedStyle("right"),C=e.getPosition();
C.y+p>s.height&&(p=s.height-C.y),(n?T:C.x)+g>s.width&&(g=s.width-(n?T:C.x)),(o==CKEDITOR.DIALOG_RESIZE_WIDTH||o==CKEDITOR.DIALOG_RESIZE_BOTH)&&(f=Math.max(i.minWidth||0,g-a)),(o==CKEDITOR.DIALOG_RESIZE_HEIGHT||o==CKEDITOR.DIALOG_RESIZE_BOTH)&&(m=Math.max(i.minHeight||0,p-r)),e.resize(f,m),e._.moved||e.layout(),t.data.preventDefault();
};
function n(){
if(CKEDITOR.document.removeListener("mouseup",n),CKEDITOR.document.removeListener("mousemove",t),c&&(c.remove(),c=null),CKEDITOR.env.ie6Compat){
var e=b.getChild(0).getFrameDocument();
e.removeListener("mouseup",n),e.removeListener("mousemove",t);
}
};
var i=e.definition,o=i.resizable;
if(o!=CKEDITOR.DIALOG_RESIZE_NONE){
var a,r,s,l,d,c,u=e.getParentEditor(),h=CKEDITOR.tools.addFunction(function(i){
d=e.getSize();
var o=e.parts.contents,u=o.$.getElementsByTagName("iframe").length;
if(u&&(c=CKEDITOR.dom.element.createFromHtml("<div class=\"cke_dialog_resize_cover\" style=\"height: 100%; position: absolute; width: 100%;\"></div>"),o.append(c)),r=d.height-e.parts.contents.getSize("height",!(CKEDITOR.env.gecko||CKEDITOR.env.ie&&CKEDITOR.env.quirks)),a=d.width-e.parts.contents.getSize("width",1),l={x:i.screenX,y:i.screenY},s=CKEDITOR.document.getWindow().getViewPaneSize(),CKEDITOR.document.on("mousemove",t),CKEDITOR.document.on("mouseup",n),CKEDITOR.env.ie6Compat){
var h=b.getChild(0).getFrameDocument();
h.on("mousemove",t),h.on("mouseup",n);
}
i.preventDefault&&i.preventDefault();
});
e.on("load",function(){
var t="";
o==CKEDITOR.DIALOG_RESIZE_WIDTH?t=" cke_resizer_horizontal":o==CKEDITOR.DIALOG_RESIZE_HEIGHT&&(t=" cke_resizer_vertical");
var n=CKEDITOR.dom.element.createFromHtml("<div class=\"cke_resizer"+t+" cke_resizer_"+u.lang.dir+"\" title=\""+CKEDITOR.tools.htmlEncode(u.lang.common.resize)+"\" onmousedown=\"CKEDITOR.tools.callFunction("+h+", event )\">"+("ltr"==u.lang.dir?"\u25e2":"\u25e3")+"</div>");
e.parts.footer.append(n,1);
}),u.on("destroy",function(){
CKEDITOR.tools.removeFunction(h);
});
}
};
function h(e){
e.data.preventDefault(1);
};
function f(e){
var t=CKEDITOR.document.getWindow(),n=e.config,i=n.dialog_backgroundCoverColor||"white",o=n.dialog_backgroundCoverOpacity,a=n.baseFloatZIndex,r=CKEDITOR.tools.genKey(i,o,a),s=R[r];
if(s){
s.show();
}else{
var l=["<div tabIndex=\"-1\" style=\"position: ",CKEDITOR.env.ie6Compat?"absolute":"fixed","; z-index: ",a,"; top: 0px; left: 0px; ",CKEDITOR.env.ie6Compat?"":"background-color: "+i,"\" class=\"cke_dialog_background_cover\">"];
if(CKEDITOR.env.ie6Compat){
var d="<html><body style=\\'background-color:"+i+";\\'></body></html>";
l.push("<iframe hidefocus=\"true\" frameborder=\"0\" id=\"cke_dialog_background_iframe\" src=\"javascript:"),l.push("void((function(){"+encodeURIComponent("document.open();("+CKEDITOR.tools.fixDomain+")();document.write( '"+d+"' );document.close();")+"})())"),l.push("\" style=\"position:absolute;left:0;top:0;width:100%;height: 100%;filter: progid:DXImageTransform.Microsoft.Alpha(opacity=0)\"></iframe>");
}
l.push("</div>"),s=CKEDITOR.dom.element.createFromHtml(l.join("")),s.setOpacity(void 0!==o?o:0.5),s.on("keydown",h),s.on("keypress",h),s.on("keyup",h),s.appendTo(CKEDITOR.document.getBody()),R[r]=s;
}
e.focusManager.add(s),b=s;
var c=function(){
var e=t.getViewPaneSize();
s.setStyles({width:e.width+"px",height:e.height+"px"});
},u=function(){
var e=t.getScrollPosition(),n=CKEDITOR.dialog._.currentTop;
if(s.setStyles({left:e.x+"px",top:e.y+"px"}),n){
do{
var i=n.getPosition();
n.move(i.x,i.y);
}while(n=n._.parentDialog);
}
};
if(D=c,t.on("resize",c),c(),CKEDITOR.env.mac&&CKEDITOR.env.webkit||s.focus(),CKEDITOR.env.ie6Compat){
var f=function(){
u(),arguments.callee.prevScrollHandler.apply(this,arguments);
};
t.$.setTimeout(function(){
f.prevScrollHandler=window.onscroll||function(){
},window.onscroll=f;
},0),u();
}
};
function m(e){
if(b){
e.focusManager.remove(b);
var t=CKEDITOR.document.getWindow();
b.hide(),t.removeListener("resize",D),CKEDITOR.env.ie6Compat&&t.$.setTimeout(function(){
var e=window.onscroll&&window.onscroll.prevScrollHandler;
window.onscroll=e||null;
},0),D=null;
}
};
function g(){
for(var e in R){
R[e].remove();
}
R={};
};
var p=CKEDITOR.tools.cssLength,E="<div class=\"cke_reset_all {editorId} {editorDialogClass} {hidpi}\" dir=\"{langDir}\" lang=\"{langCode}\" role=\"dialog\" aria-labelledby=\"cke_dialog_title_{id}\"><table class=\"cke_dialog "+CKEDITOR.env.cssClass+" cke_{langDir}\" style=\"position:absolute\" role=\"presentation\"><tr><td role=\"presentation\"><div class=\"cke_dialog_body\" role=\"presentation\"><div id=\"cke_dialog_title_{id}\" class=\"cke_dialog_title\" role=\"presentation\"></div><a id=\"cke_dialog_close_button_{id}\" class=\"cke_dialog_close_button\" href=\"javascript:void(0)\" title=\"{closeTitle}\" role=\"button\"><span class=\"cke_label\">X</span></a><div id=\"cke_dialog_tabs_{id}\" class=\"cke_dialog_tabs\" role=\"tablist\"></div><table class=\"cke_dialog_contents\" role=\"presentation\"><tr><td id=\"cke_dialog_contents_{id}\" class=\"cke_dialog_contents_body\" role=\"presentation\"></td></tr><tr><td id=\"cke_dialog_footer_{id}\" class=\"cke_dialog_footer\" role=\"presentation\"></td></tr></table></div></td></tr></table></div>";
CKEDITOR.dialog=function(e,i){
function s(){
var e=_10._.focusList;
e.sort(function(e,t){
return e.tabIndex!=t.tabIndex?t.tabIndex-e.tabIndex:e.focusIndex-t.focusIndex;
});
for(var t=e.length,n=0;t>n;n++){
e[n].focusIndex=n;
}
};
function l(e){
var t=_10._.focusList;
if(e=e||0,!(t.length<1)){
var n=_10._.currentFocusIndex;
_10._.tabBarMode&&0>e&&(n=0);
try{
t[n].getInputElement().$.blur();
}
catch(i){
}
var o=n,a=_10._.pageCount>1;
do{
if(o+=e,a&&!_10._.tabBarMode&&(o==t.length||-1==o)){
return _10._.tabBarMode=!0,_10._.tabs[_10._.currentTabId][0].focus(),void (_10._.currentFocusIndex=-1);
}
if(o=(o+t.length)%t.length,o==n){
break;
}
}while(e&&!t[o].isFocusable());
t[o].focus(),"text"==t[o].type&&t[o].select();
}
};
function d(i){
if(_10==CKEDITOR.dialog._.currentTop){
var o,a=i.data.getKeystroke(),r="rtl"==e.lang.dir,s=[37,38,39,40];
if(m=g=0,9==a||a==CKEDITOR.SHIFT+9){
var d=a==CKEDITOR.SHIFT+9;
l(d?-1:1),m=1;
}else{
if(a==CKEDITOR.ALT+121&&!_10._.tabBarMode&&_10.getPageCount()>1){
_10._.tabBarMode=!0,_10._.tabs[_10._.currentTabId][0].focus(),_10._.currentFocusIndex=-1,m=1;
}else{
if(-1!=CKEDITOR.tools.indexOf(s,a)&&_10._.tabBarMode){
var c=[r?39:37,38],u=-1!=CKEDITOR.tools.indexOf(c,a)?t.call(_10):n.call(_10);
_10.selectPage(u),_10._.tabs[u][0].focus(),m=1;
}else{
if(13!=a&&32!=a||!_10._.tabBarMode){
if(13==a){
var f=i.data.getTarget();
f.is("a","button","select","textarea")||f.is("input")&&"button"==f.$.type||(o=this.getButton("ok"),o&&CKEDITOR.tools.setTimeout(o.click,0,o),m=1),g=1;
}else{
if(27!=a){
return;
}
o=this.getButton("cancel"),o?CKEDITOR.tools.setTimeout(o.click,0,o):this.fire("cancel",{hide:!0}).hide!==!1&&this.hide(),g=1;
}
}else{
this.selectPage(this._.currentTabId),this._.tabBarMode=!1,this._.currentFocusIndex=-1,l(1),m=1;
}
}
}
}
h(i);
}
};
function h(e){
m?e.data.preventDefault(1):g&&e.data.stopPropagation();
};
var f,m,g,p=CKEDITOR.dialog._.dialogDefinitions[i],E=CKEDITOR.tools.clone(T),C=e.config.dialog_buttonsOrder||"OS",v=e.lang.dir,I={};
("OS"==C&&CKEDITOR.env.mac||"rtl"==C&&"ltr"==v||"ltr"==C&&"rtl"==v)&&E.buttons.reverse(),p=CKEDITOR.tools.extend(p(e),E),p=CKEDITOR.tools.clone(p),p=new O(this,p);
var D=r(e);
this._={editor:e,element:D.element,name:i,contentSize:{width:0,height:0},size:{width:0,height:0},contents:{},buttons:{},accessKeyMap:{},tabs:{},tabIdList:[],currentTabId:null,currentTabIndex:null,pageCount:0,lastTab:null,tabBarMode:!1,focusList:[],currentFocusIndex:0,hasFocus:!1},this.parts=D.parts,CKEDITOR.tools.setTimeout(function(){
e.fire("ariaWidget",this.parts.contents);
},0,this);
var b={position:CKEDITOR.env.ie6Compat?"absolute":"fixed",top:0,visibility:"hidden"};
if(b["rtl"==v?"right":"left"]=0,this.parts.dialog.setStyles(b),CKEDITOR.event.call(this),this.definition=p=CKEDITOR.fire("dialogDefinition",{name:i,definition:p},e).definition,!("removeDialogTabs" in e._)&&e.config.removeDialogTabs){
var R=e.config.removeDialogTabs.split(";");
for(f=0;f<R.length;f++){
var y=R[f].split(":");
if(2==y.length){
var K=y[0];
I[K]||(I[K]=[]),I[K].push(y[1]);
}
}
e._.removeDialogTabs=I;
}
if(e._.removeDialogTabs&&(I=e._.removeDialogTabs[i])){
for(f=0;f<I.length;f++){
p.removeContents(I[f]);
}
}
p.onLoad&&this.on("load",p.onLoad),p.onShow&&this.on("show",p.onShow),p.onHide&&this.on("hide",p.onHide),p.onOk&&this.on("ok",function(t){
e.fire("saveSnapshot"),setTimeout(function(){
e.fire("saveSnapshot");
},0),p.onOk.call(this,t)===!1&&(t.data.hide=!1);
}),this.state=CKEDITOR.DIALOG_STATE_IDLE,p.onCancel&&this.on("cancel",function(e){
p.onCancel.call(this,e)===!1&&(e.data.hide=!1);
});
var _10=this,k=function(e){
var t=_10._.contents,n=!1;
for(var i in t){
for(var o in t[i]){
if(n=e.call(this,t[i][o])){
return;
}
}
}
};
this.on("ok",function(e){
k(function(t){
if(t.validate){
var n=t.validate(this),i="string"==typeof n||n===!1;
return i&&(e.data.hide=!1,e.stop()),o.call(t,!i,"string"==typeof n?n:void 0),i;
}
});
},this,null,0),this.on("cancel",function(t){
k(function(n){
return n.isChanged()?(e.config.dialog_noConfirmCancel||confirm(e.lang.common.confirmCancel)||(t.data.hide=!1),!0):void 0;
});
},this,null,0),this.parts.close.on("click",function(e){
this.fire("cancel",{hide:!0}).hide!==!1&&this.hide(),e.data.preventDefault();
},this),this.changeFocus=l;
var w=this._.element;
for(e.focusManager.add(w,1),this.on("show",function(){
w.on("keydown",d,this),CKEDITOR.env.gecko&&w.on("keypress",h,this);
}),this.on("hide",function(){
w.removeListener("keydown",d),CKEDITOR.env.gecko&&w.removeListener("keypress",h),k(function(e){
a.apply(e);
});
}),this.on("iframeAdded",function(e){
var t=new CKEDITOR.dom.document(e.data.iframe.$.contentWindow.document);
t.on("keydown",d,this,null,0);
}),this.on("show",function(){
s();
var t=_10._.pageCount>1;
if(e.config.dialog_startupFocusTab&&t){
_10._.tabBarMode=!0,_10._.tabs[_10._.currentTabId][0].focus(),_10._.currentFocusIndex=-1;
}else{
if(!this._.hasFocus){
if(this._.currentFocusIndex=t?-1:this._.focusList.length-1,p.onFocus){
var n=p.onFocus.call(this);
n&&n.focus();
}else{
l(1);
}
}
}
},this,null,4294967295),CKEDITOR.env.ie6Compat&&this.on("load",function(){
var e=this.getElement(),t=e.getFirst();
t.remove(),t.appendTo(e);
},this),c(this),u(this),new CKEDITOR.dom.text(p.title,CKEDITOR.document).appendTo(this.parts.title),f=0;f<p.contents.length;f++){
var S=p.contents[f];
S&&this.addPage(S);
}
this.parts.tabs.on("click",function(e){
var t=e.data.getTarget();
if(t.hasClass("cke_dialog_tab")){
var n=t.$.id;
this.selectPage(n.substring(4,n.lastIndexOf("_"))),this._.tabBarMode&&(this._.tabBarMode=!1,this._.currentFocusIndex=-1,l(1)),e.data.preventDefault();
}
},this);
var x=[],N=CKEDITOR.dialog._.uiElementBuilders.hbox.build(this,{type:"hbox",className:"cke_dialog_footer_buttons",widths:[],children:p.buttons},x).getChild();
for(this.parts.footer.setHtml(x.join("")),f=0;f<N.length;f++){
this._.buttons[N[f].id]=N[f];
}
},CKEDITOR.dialog.prototype={destroy:function(){
this.hide(),this._.element.remove();
},resize:function(){
return function(e,t){
if(!this._.contentSize||this._.contentSize.width!=e||this._.contentSize.height!=t){
CKEDITOR.dialog.fire("resize",{dialog:this,width:e,height:t},this._.editor),this.fire("resize",{width:e,height:t},this._.editor);
var n=this.parts.contents;
n.setStyles({width:e+"px",height:t+"px"}),"rtl"==this._.editor.lang.dir&&this._.position&&(this._.position.x=CKEDITOR.document.getWindow().getViewPaneSize().width-this._.contentSize.width-parseInt(this._.element.getFirst().getStyle("right"),10)),this._.contentSize={width:e,height:t};
}
};
}(),getSize:function(){
var e=this._.element.getFirst();
return {width:e.$.offsetWidth||0,height:e.$.offsetHeight||0};
},move:function(e,t,n){
var i=this._.element.getFirst(),o="rtl"==this._.editor.lang.dir,a="fixed"==i.getComputedStyle("position");
if(CKEDITOR.env.ie&&i.setStyle("zoom","100%"),!a||!this._.position||this._.position.x!=e||this._.position.y!=t){
if(this._.position={x:e,y:t},!a){
var r=CKEDITOR.document.getWindow().getScrollPosition();
e+=r.x,t+=r.y;
}
if(o){
var s=this.getSize(),l=CKEDITOR.document.getWindow().getViewPaneSize();
e=l.width-s.width-e;
}
var d={top:(t>0?t:0)+"px"};
d[o?"right":"left"]=(e>0?e:0)+"px",i.setStyles(d),n&&(this._.moved=1);
}
},getPosition:function(){
return CKEDITOR.tools.extend({},this._.position);
},show:function(){
var e=this._.element,t=this.definition;
if(e.getParent()&&e.getParent().equals(CKEDITOR.document.getBody())?e.setStyle("display","block"):e.appendTo(CKEDITOR.document.getBody()),this.resize(this._.contentSize&&this._.contentSize.width||t.width||t.minWidth,this._.contentSize&&this._.contentSize.height||t.height||t.minHeight),this.reset(),this.selectPage(this.definition.contents[0].id),null===CKEDITOR.dialog._.currentZIndex&&(CKEDITOR.dialog._.currentZIndex=this._.editor.config.baseFloatZIndex),this._.element.getFirst().setStyle("z-index",CKEDITOR.dialog._.currentZIndex+=10),null===CKEDITOR.dialog._.currentTop){
CKEDITOR.dialog._.currentTop=this,this._.parentDialog=null,f(this._.editor);
}else{
this._.parentDialog=CKEDITOR.dialog._.currentTop;
var n=this._.parentDialog.getElement().getFirst();
n.$.style.zIndex-=Math.floor(this._.editor.config.baseFloatZIndex/2),CKEDITOR.dialog._.currentTop=this;
}
e.on("keydown",K),e.on("keyup",_11),this._.hasFocus=!1;
for(var i in t.contents){
if(t.contents[i]){
var o=t.contents[i],a=this._.tabs[o.id],r=o.requiredContent,s=0;
if(a){
for(var d in this._.contents[o.id]){
var c=this._.contents[o.id][d];
"hbox"!=c.type&&"vbox"!=c.type&&c.getInputElement()&&(c.requiredContent&&!this._.editor.activeFilter.check(c.requiredContent)?c.disable():(c.enable(),s++));
}
!s||r&&!this._.editor.activeFilter.check(r)?a[0].addClass("cke_dialog_tab_disabled"):a[0].removeClass("cke_dialog_tab_disabled");
}
}
}
CKEDITOR.tools.setTimeout(function(){
this.layout(),l(this),this.parts.dialog.setStyle("visibility",""),this.fireOnce("load",{}),CKEDITOR.ui.fire("ready",this),this.fire("show",{}),this._.editor.fire("dialogShow",this),this._.parentDialog||this._.editor.focusManager.lock(),this.foreach(function(e){
e.setInitValue&&e.setInitValue();
});
},100,this);
},layout:function(){
var e=this.parts.dialog,t=this.getSize(),n=CKEDITOR.document.getWindow(),i=n.getViewPaneSize(),o=(i.width-t.width)/2,a=(i.height-t.height)/2;
CKEDITOR.env.ie6Compat||(t.height+(a>0?a:0)>i.height||t.width+(o>0?o:0)>i.width?e.setStyle("position","absolute"):e.setStyle("position","fixed")),this.move(this._.moved?this._.position.x:o,this._.moved?this._.position.y:a);
},foreach:function(e){
for(var t in this._.contents){
for(var n in this._.contents[t]){
e.call(this,this._.contents[t][n]);
}
}
return this;
},reset:function(){
var e=function(e){
e.reset&&e.reset(1);
};
return function(){
return this.foreach(e),this;
};
}(),setupContent:function(){
var e=arguments;
this.foreach(function(t){
t.setup&&t.setup.apply(t,e);
});
},commitContent:function(){
var e=arguments;
this.foreach(function(t){
CKEDITOR.env.ie&&this._.currentFocusIndex==t.focusIndex&&t.getInputElement().$.blur(),t.commit&&t.commit.apply(t,e);
});
},hide:function(){
if(this.parts.dialog.isVisible()){
this.fire("hide",{}),this._.editor.fire("dialogHide",this),this.selectPage(this._.tabIdList[0]);
var e=this._.element;
for(e.setStyle("display","none"),this.parts.dialog.setStyle("visibility","hidden"),w(this);CKEDITOR.dialog._.currentTop!=this;){
CKEDITOR.dialog._.currentTop.hide();
}
if(this._.parentDialog){
var t=this._.parentDialog.getElement().getFirst();
t.setStyle("z-index",parseInt(t.$.style.zIndex,10)+Math.floor(this._.editor.config.baseFloatZIndex/2));
}else{
m(this._.editor);
}
if(CKEDITOR.dialog._.currentTop=this._.parentDialog,this._.parentDialog){
CKEDITOR.dialog._.currentZIndex-=10;
}else{
CKEDITOR.dialog._.currentZIndex=null,e.removeListener("keydown",K),e.removeListener("keyup",_11);
var n=this._.editor;
n.focus(),setTimeout(function(){
n.focusManager.unlock(),CKEDITOR.env.iOS&&n.window.focus();
},0);
}
delete this._.parentDialog,this.foreach(function(e){
e.resetInitValue&&e.resetInitValue();
}),this.setState(CKEDITOR.DIALOG_STATE_IDLE);
}
},addPage:function(e){
if(!e.requiredContent||this._.editor.filter.check(e.requiredContent)){
for(var t,n=[],i=e.label?" title=\""+CKEDITOR.tools.htmlEncode(e.label)+"\"":"",o=CKEDITOR.dialog._.uiElementBuilders.vbox.build(this,{type:"vbox",className:"cke_dialog_page_contents",children:e.elements,expand:!!e.expand,padding:e.padding,style:e.style||"width: 100%;"},n),a=this._.contents[e.id]={},r=o.getChild(),s=0;t=r.shift();){
t.notAllowed||"hbox"==t.type||"vbox"==t.type||s++,a[t.id]=t,"function"==typeof t.getChild&&r.push.apply(r,t.getChild());
}
s||(e.hidden=!0);
var l=CKEDITOR.dom.element.createFromHtml(n.join(""));
l.setAttribute("role","tabpanel");
var d=CKEDITOR.env,c="cke_"+e.id+"_"+CKEDITOR.tools.getNextNumber(),u=CKEDITOR.dom.element.createFromHtml(["<a class=\"cke_dialog_tab\"",this._.pageCount>0?" cke_last":"cke_first",i,e.hidden?" style=\"display:none\"":""," id=\"",c,"\"",d.gecko&&!d.hc?"":" href=\"javascript:void(0)\""," tabIndex=\"-1\""," hidefocus=\"true\""," role=\"tab\">",e.label,"</a>"].join(""));
l.setAttribute("aria-labelledby",c),this._.tabs[e.id]=[u,l],this._.tabIdList.push(e.id),!e.hidden&&this._.pageCount++,this._.lastTab=u,this.updateStyle(),l.setAttribute("name",e.id),l.appendTo(this.parts.contents),u.unselectable(),this.parts.tabs.append(u),e.accessKey&&(k(this,this,"CTRL+"+e.accessKey,x,S),this._.accessKeyMap["CTRL+"+e.accessKey]=e.id);
}
},selectPage:function(e){
if(this._.currentTabId!=e&&!this._.tabs[e][0].hasClass("cke_dialog_tab_disabled")&&this.fire("selectPage",{page:e,currentPage:this._.currentTabId})!==!1){
for(var t in this._.tabs){
var n=this._.tabs[t][0],o=this._.tabs[t][1];
t!=e&&(n.removeClass("cke_dialog_tab_selected"),o.hide()),o.setAttribute("aria-hidden",t!=e);
}
var a=this._.tabs[e];
a[0].addClass("cke_dialog_tab_selected"),CKEDITOR.env.ie6Compat||CKEDITOR.env.ie7Compat?(i(a[1]),a[1].show(),setTimeout(function(){
i(a[1],1);
},0)):a[1].show(),this._.currentTabId=e,this._.currentTabIndex=CKEDITOR.tools.indexOf(this._.tabIdList,e);
}
},updateStyle:function(){
this.parts.dialog[(1===this._.pageCount?"add":"remove")+"Class"]("cke_single_page");
},hidePage:function(e){
var n=this._.tabs[e]&&this._.tabs[e][0];
n&&1!=this._.pageCount&&n.isVisible()&&(e==this._.currentTabId&&this.selectPage(t.call(this)),n.hide(),this._.pageCount--,this.updateStyle());
},showPage:function(e){
var t=this._.tabs[e]&&this._.tabs[e][0];
t&&(t.show(),this._.pageCount++,this.updateStyle());
},getElement:function(){
return this._.element;
},getName:function(){
return this._.name;
},getContentElement:function(e,t){
var n=this._.contents[e];
return n&&n[t];
},getValueOf:function(e,t){
return this.getContentElement(e,t).getValue();
},setValueOf:function(e,t,n){
return this.getContentElement(e,t).setValue(n);
},getButton:function(e){
return this._.buttons[e];
},click:function(e){
return this._.buttons[e].click();
},disableButton:function(e){
return this._.buttons[e].disable();
},enableButton:function(e){
return this._.buttons[e].enable();
},getPageCount:function(){
return this._.pageCount;
},getParentEditor:function(){
return this._.editor;
},getSelectedElement:function(){
return this.getParentEditor().getSelection().getSelectedElement();
},addFocusable:function(e,t){
if("undefined"==typeof t){
t=this._.focusList.length,this._.focusList.push(new s(this,e,t));
}else{
this._.focusList.splice(t,0,new s(this,e,t));
for(var n=t+1;n<this._.focusList.length;n++){
this._.focusList[n].focusIndex++;
}
}
},setState:function(e,t){
var n=this.state;
if(n!=e){
if(this.state=e,e==CKEDITOR.DIALOG_STATE_BUSY){
if(!this.parts.spinner){
var i=this.getParentEditor().lang.dir,o={attributes:{"class":"cke_dialog_spinner","aria-live":"polite",role:"presentation"},styles:{"float":"rtl"==i?"right":"left"}};
o.styles["margin-"+("rtl"==i?"left":"right")]="8px",this.parts.spinner=CKEDITOR.document.createElement("div",o),this.parts.spinner.setHtml(this._.editor.lang.common.loading?CKEDITOR.tools.htmlEncode(this._.editor.lang.common.loading):"&#8987;"),this.parts.spinner.appendTo(t?t:this.parts.title,1);
}
this.parts.spinner.show(),this.getButton("ok").disable();
}else{
e==CKEDITOR.DIALOG_STATE_IDLE&&(this.parts.spinner&&this.parts.spinner.hide(),this.getButton("ok").enable());
}
this.fire("state",e);
}
}},CKEDITOR.tools.extend(CKEDITOR.dialog,{add:function(e,t){
this._.dialogDefinitions[e]&&"function"!=typeof t||(this._.dialogDefinitions[e]=t);
},exists:function(e){
return !!this._.dialogDefinitions[e];
},getCurrent:function(){
return CKEDITOR.dialog._.currentTop;
},isTabEnabled:function(e,t,n){
var i=e.config.removeDialogTabs;
return !(i&&i.match(new RegExp("(?:^|;)"+t+":"+n+"(?:$|;)","i")));
},okButton:function(){
var e=function(e,t){
return t=t||{},CKEDITOR.tools.extend({id:"ok",type:"button",label:e.lang.common.ok,"class":"cke_dialog_ui_button_ok",onClick:function(e){
var t=e.data.dialog;
t.fire("ok",{hide:!0}).hide!==!1&&t.hide();
}},t,!0);
};
return e.type="button",e.override=function(t){
return CKEDITOR.tools.extend(function(n){
return e(n,t);
},{type:"button"},!0);
},e;
}(),cancelButton:function(){
var e=function(e,t){
return t=t||{},CKEDITOR.tools.extend({id:"cancel",type:"button",label:e.lang.common.cancel,"class":"cke_dialog_ui_button_cancel",onClick:function(e){
var t=e.data.dialog;
t.fire("cancel",{hide:!0}).hide!==!1&&t.hide();
}},t,!0);
};
return e.type="button",e.override=function(t){
return CKEDITOR.tools.extend(function(n){
return e(n,t);
},{type:"button"},!0);
},e;
}(),addUIElement:function(e,t){
this._.uiElementBuilders[e]=t;
}}),CKEDITOR.dialog._={uiElementBuilders:{},dialogDefinitions:{},currentTop:null,currentZIndex:null},CKEDITOR.event.implementOn(CKEDITOR.dialog),CKEDITOR.event.implementOn(CKEDITOR.dialog.prototype);
var T={resizable:CKEDITOR.DIALOG_RESIZE_BOTH,minWidth:600,minHeight:400,buttons:[CKEDITOR.dialog.okButton,CKEDITOR.dialog.cancelButton]},C=function(e,t,n){
for(var i,o=0;i=e[o];o++){
if(i.id==t){
return i;
}
if(n&&i[n]){
var a=C(i[n],t,n);
if(a){
return a;
}
}
}
return null;
},v=function(e,t,n,i,o){
if(n){
for(var a,r=0;a=e[r];r++){
if(a.id==n){
return e.splice(r,0,t),t;
}
if(i&&a[i]){
var s=v(a[i],t,n,i,!0);
if(s){
return s;
}
}
}
if(o){
return null;
}
}
return e.push(t),t;
},I=function(e,t,n){
for(var i,o=0;i=e[o];o++){
if(i.id==t){
return e.splice(o,1);
}
if(n&&i[n]){
var a=I(i[n],t,n);
if(a){
return a;
}
}
}
return null;
},O=function(e,t){
this.dialog=e;
for(var n,i=t.contents,o=0;n=i[o];o++){
i[o]=n&&new d(e,n);
}
CKEDITOR.tools.extend(this,t);
};
O.prototype={getContents:function(e){
return C(this.contents,e);
},getButton:function(e){
return C(this.buttons,e);
},addContents:function(e,t){
return v(this.contents,e,t);
},addButton:function(e,t){
return v(this.buttons,e,t);
},removeContents:function(e){
I(this.contents,e);
},removeButton:function(e){
I(this.buttons,e);
}},d.prototype={get:function(e){
return C(this.elements,e,"children");
},add:function(e,t){
return v(this.elements,e,t,"children");
},remove:function(e){
I(this.elements,e,"children");
}};
var D,b,R={},y={},K=function(e){
var t=e.data.$.ctrlKey||e.data.$.metaKey,n=e.data.$.altKey,i=e.data.$.shiftKey,o=String.fromCharCode(e.data.$.keyCode),a=y[(t?"CTRL+":"")+(n?"ALT+":"")+(i?"SHIFT+":"")+o];
a&&a.length&&(a=a[a.length-1],a.keydown&&a.keydown.call(a.uiElement,a.dialog,a.key),e.data.preventDefault());
},_11=function(e){
var t=e.data.$.ctrlKey||e.data.$.metaKey,n=e.data.$.altKey,i=e.data.$.shiftKey,o=String.fromCharCode(e.data.$.keyCode),a=y[(t?"CTRL+":"")+(n?"ALT+":"")+(i?"SHIFT+":"")+o];
a&&a.length&&(a=a[a.length-1],a.keyup&&(a.keyup.call(a.uiElement,a.dialog,a.key),e.data.preventDefault()));
},k=function(e,t,n,i,o){
var a=y[n]||(y[n]=[]);
a.push({uiElement:e,dialog:t,key:n,keyup:o||e.accessKeyUp,keydown:i||e.accessKeyDown});
},w=function(e){
for(var t in y){
for(var n=y[t],i=n.length-1;i>=0;i--){
(n[i].dialog==e||n[i].uiElement==e)&&n.splice(i,1);
}
0===n.length&&delete y[t];
}
},S=function(e,t){
e._.accessKeyMap[t]&&e.selectPage(e._.accessKeyMap[t]);
},x=function(){
};
!function(){
CKEDITOR.ui.dialog={uiElement:function(e,t,n,i,o,a,r){
if(!(arguments.length<4)){
var s,l=(i.call?i(t):i)||"div",d=["<",l," "],c=(o&&o.call?o(t):o)||{},u=(a&&a.call?a(t):a)||{},h=(r&&r.call?r.call(this,e,t):r)||"",f=this.domId=u.id||CKEDITOR.tools.getNextId()+"_uiElement";
t.requiredContent&&!e.getParentEditor().filter.check(t.requiredContent)&&(c.display="none",this.notAllowed=!0),u.id=f;
var m={};
t.type&&(m["cke_dialog_ui_"+t.type]=1),t.className&&(m[t.className]=1),t.disabled&&(m.cke_disabled=1);
var g=u["class"]&&u["class"].split?u["class"].split(" "):[];
for(s=0;s<g.length;s++){
g[s]&&(m[g[s]]=1);
}
var p=[];
for(s in m){
p.push(s);
}
u["class"]=p.join(" "),t.title&&(u.title=t.title);
var E=(t.style||"").split(";");
if(t.align){
var T=t.align;
c["margin-left"]="left"==T?0:"auto",c["margin-right"]="right"==T?0:"auto";
}
for(s in c){
E.push(s+":"+c[s]);
}
for(t.hidden&&E.push("display:none"),s=E.length-1;s>=0;s--){
""===E[s]&&E.splice(s,1);
}
E.length>0&&(u.style=(u.style?u.style+"; ":"")+E.join("; "));
for(s in u){
d.push(s+"=\""+CKEDITOR.tools.htmlEncode(u[s])+"\" ");
}
d.push(">",h,"</",l,">"),n.push(d.join("")),(this._||(this._={})).dialog=e,"boolean"==typeof t.isChanged&&(this.isChanged=function(){
return t.isChanged;
}),"function"==typeof t.isChanged&&(this.isChanged=t.isChanged),"function"==typeof t.setValue&&(this.setValue=CKEDITOR.tools.override(this.setValue,function(e){
return function(n){
e.call(this,t.setValue.call(this,n));
};
})),"function"==typeof t.getValue&&(this.getValue=CKEDITOR.tools.override(this.getValue,function(e){
return function(){
return t.getValue.call(this,e.call(this));
};
})),CKEDITOR.event.implementOn(this),this.registerEvents(t),this.accessKeyUp&&this.accessKeyDown&&t.accessKey&&k(this,e,"CTRL+"+t.accessKey);
var C=this;
e.on("load",function(){
var t=C.getInputElement();
if(t){
var n=C.type in {checkbox:1,ratio:1}&&CKEDITOR.env.ie&&CKEDITOR.env.version<8?"cke_dialog_ui_focused":"";
t.on("focus",function(){
e._.tabBarMode=!1,e._.hasFocus=!0,C.fire("focus"),n&&this.addClass(n);
}),t.on("blur",function(){
C.fire("blur"),n&&this.removeClass(n);
});
}
}),CKEDITOR.tools.extend(this,t),this.keyboardFocusable&&(this.tabIndex=t.tabIndex||0,this.focusIndex=e._.focusList.push(this)-1,this.on("focus",function(){
e._.currentFocusIndex=C.focusIndex;
}));
}
},hbox:function(e,t,n,i,o){
if(!(arguments.length<4)){
this._||(this._={});
var a,r=this._.children=t,s=o&&o.widths||null,l=o&&o.height||null,d={},c=function(){
var e=["<tbody><tr class=\"cke_dialog_ui_hbox\">"];
for(a=0;a<n.length;a++){
var t="cke_dialog_ui_hbox_child",i=[];
0===a&&(t="cke_dialog_ui_hbox_first"),a==n.length-1&&(t="cke_dialog_ui_hbox_last"),e.push("<td class=\"",t,"\" role=\"presentation\" "),s?s[a]&&i.push("width:"+p(s[a])):i.push("width:"+Math.floor(100/n.length)+"%"),l&&i.push("height:"+p(l)),o&&void 0!==o.padding&&i.push("padding:"+p(o.padding)),CKEDITOR.env.ie&&CKEDITOR.env.quirks&&r[a].align&&i.push("text-align:"+r[a].align),i.length>0&&e.push("style=\""+i.join("; ")+"\" "),e.push(">",n[a],"</td>");
}
return e.push("</tr></tbody>"),e.join("");
},u={role:"presentation"};
o&&o.align&&(u.align=o.align),CKEDITOR.ui.dialog.uiElement.call(this,e,o||{type:"hbox"},i,"table",d,u,c);
}
},vbox:function(e,t,n,i,o){
if(!(arguments.length<3)){
this._||(this._={});
var a=this._.children=t,r=o&&o.width||null,s=o&&o.heights||null,l=function(){
var t=["<table role=\"presentation\" cellspacing=\"0\" border=\"0\" "];
t.push("style=\""),o&&o.expand&&t.push("height:100%;"),t.push("width:"+p(r||"100%"),";"),CKEDITOR.env.webkit&&t.push("float:none;"),t.push("\""),t.push("align=\"",CKEDITOR.tools.htmlEncode(o&&o.align||("ltr"==e.getParentEditor().lang.dir?"left":"right")),"\" "),t.push("><tbody>");
for(var i=0;i<n.length;i++){
var l=[];
t.push("<tr><td role=\"presentation\" "),r&&l.push("width:"+p(r||"100%")),s?l.push("height:"+p(s[i])):o&&o.expand&&l.push("height:"+Math.floor(100/n.length)+"%"),o&&void 0!==o.padding&&l.push("padding:"+p(o.padding)),CKEDITOR.env.ie&&CKEDITOR.env.quirks&&a[i].align&&l.push("text-align:"+a[i].align),l.length>0&&t.push("style=\"",l.join("; "),"\" "),t.push(" class=\"cke_dialog_ui_vbox_child\">",n[i],"</td></tr>");
}
return t.push("</tbody></table>"),t.join("");
};
CKEDITOR.ui.dialog.uiElement.call(this,e,o||{type:"vbox"},i,"div",null,{role:"presentation"},l);
}
}};
}(),CKEDITOR.ui.dialog.uiElement.prototype={getElement:function(){
return CKEDITOR.document.getById(this.domId);
},getInputElement:function(){
return this.getElement();
},getDialog:function(){
return this._.dialog;
},setValue:function(e,t){
return this.getInputElement().setValue(e),!t&&this.fire("change",{value:e}),this;
},getValue:function(){
return this.getInputElement().getValue();
},isChanged:function(){
return !1;
},selectParentTab:function(){
for(var e,t=this.getInputElement(),n=t;(n=n.getParent())&&-1==n.$.className.search("cke_dialog_page_contents");){
}
return n?(e=n.getAttribute("name"),this._.dialog._.currentTabId!=e&&this._.dialog.selectPage(e),this):this;
},focus:function(){
return this.selectParentTab().getInputElement().focus(),this;
},registerEvents:function(e){
var t,n=/^on([A-Z]\w+)/,i=function(e,t,n,i){
t.on("load",function(){
e.getInputElement().on(n,i,e);
});
};
for(var o in e){
(t=o.match(n))&&(this.eventProcessors[o]?this.eventProcessors[o].call(this,this._.dialog,e[o]):i(this,this._.dialog,t[1].toLowerCase(),e[o]));
}
return this;
},eventProcessors:{onLoad:function(e,t){
e.on("load",t,this);
},onShow:function(e,t){
e.on("show",t,this);
},onHide:function(e,t){
e.on("hide",t,this);
}},accessKeyDown:function(){
this.focus();
},accessKeyUp:function(){
},disable:function(){
var e=this.getElement(),t=this.getInputElement();
t.setAttribute("disabled","true"),e.addClass("cke_disabled");
},enable:function(){
var e=this.getElement(),t=this.getInputElement();
t.removeAttribute("disabled"),e.removeClass("cke_disabled");
},isEnabled:function(){
return !this.getElement().hasClass("cke_disabled");
},isVisible:function(){
return this.getInputElement().isVisible();
},isFocusable:function(){
return this.isEnabled()&&this.isVisible()?!0:!1;
}},CKEDITOR.ui.dialog.hbox.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement,{getChild:function(e){
return arguments.length<1?this._.children.concat():(e.splice||(e=[e]),e.length<2?this._.children[e[0]]:this._.children[e[0]]&&this._.children[e[0]].getChild?this._.children[e[0]].getChild(e.slice(1,e.length)):null);
}},!0),CKEDITOR.ui.dialog.vbox.prototype=new CKEDITOR.ui.dialog.hbox,function(){
var e={build:function(e,t,n){
for(var i,o=t.children,a=[],r=[],s=0;s<o.length&&(i=o[s]);s++){
var l=[];
a.push(l),r.push(CKEDITOR.dialog._.uiElementBuilders[i.type].build(e,i,l));
}
return new CKEDITOR.ui.dialog[t.type](e,r,a,n,t);
}};
CKEDITOR.dialog.addUIElement("hbox",e),CKEDITOR.dialog.addUIElement("vbox",e);
}(),CKEDITOR.dialogCommand=function(e,t){
this.dialogName=e,CKEDITOR.tools.extend(this,t,!0);
},CKEDITOR.dialogCommand.prototype={exec:function(e){
e.openDialog(this.dialogName);
},canUndo:!1,editorFocus:1},function(){
var e=/^([a]|[^a])+$/,t=/^\d*$/,n=/^\d*(?:\.\d+)?$/,i=/^(((\d*(\.\d+))|(\d*))(px|\%)?)?$/,o=/^(((\d*(\.\d+))|(\d*))(px|em|ex|in|cm|mm|pt|pc|\%)?)?$/i,a=/^(\s*[\w-]+\s*:\s*[^:;]+(?:;|$))*$/;
CKEDITOR.VALIDATE_OR=1,CKEDITOR.VALIDATE_AND=2,CKEDITOR.dialog.validate={functions:function(){
var e=arguments;
return function(){
var t,n,i=this&&this.getValue?this.getValue():e[0],o=CKEDITOR.VALIDATE_AND,a=[];
for(n=0;n<e.length&&"function"==typeof e[n];n++){
a.push(e[n]);
}
n<e.length&&"string"==typeof e[n]&&(t=e[n],n++),n<e.length&&"number"==typeof e[n]&&(o=e[n]);
var r=o==CKEDITOR.VALIDATE_AND?!0:!1;
for(n=0;n<a.length;n++){
r=o==CKEDITOR.VALIDATE_AND?r&&a[n](i):r||a[n](i);
}
return r?!0:t;
};
},regex:function(e,t){
return function(){
var n=this&&this.getValue?this.getValue():arguments[0];
return e.test(n)?!0:t;
};
},notEmpty:function(t){
return this.regex(e,t);
},integer:function(e){
return this.regex(t,e);
},number:function(e){
return this.regex(n,e);
},cssLength:function(e){
return this.functions(function(e){
return o.test(CKEDITOR.tools.trim(e));
},e);
},htmlLength:function(e){
return this.functions(function(e){
return i.test(CKEDITOR.tools.trim(e));
},e);
},inlineStyle:function(e){
return this.functions(function(e){
return a.test(CKEDITOR.tools.trim(e));
},e);
},equals:function(e,t){
return this.functions(function(t){
return t==e;
},t);
},notEqual:function(e,t){
return this.functions(function(t){
return t!=e;
},t);
}},CKEDITOR.on("instanceDestroyed",function(e){
if(CKEDITOR.tools.isEmpty(CKEDITOR.instances)){
for(var t;t=CKEDITOR.dialog._.currentTop;){
t.hide();
}
g();
}
var n=e.editor._.storedDialogs;
for(var i in n){
n[i].destroy();
}
});
}(),CKEDITOR.tools.extend(CKEDITOR.editor.prototype,{openDialog:function(e,t){
var n=null,i=CKEDITOR.dialog._.dialogDefinitions[e];
if(null===CKEDITOR.dialog._.currentTop&&f(this),"function"==typeof i){
var o=this._.storedDialogs||(this._.storedDialogs={});
n=o[e]||(o[e]=new CKEDITOR.dialog(this,e)),t&&t.call(n,n),n.show();
}else{
if("failed"==i){
throw m(this),new Error("[CKEDITOR.dialog.openDialog] Dialog \""+e+"\" failed when loading definition.");
}
"string"==typeof i&&CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(i),function(){
var n=CKEDITOR.dialog._.dialogDefinitions[e];
"function"!=typeof n&&(CKEDITOR.dialog._.dialogDefinitions[e]="failed"),this.openDialog(e,t);
},this,0,1);
}
return CKEDITOR.skin.loadPart("dialog"),n;
}});
}(),CKEDITOR.plugins.add("dialog",{requires:"dialogui",init:function(e){
e.on("doubleclick",function(t){
t.data.dialog&&e.openDialog(t.data.dialog);
},null,null,999);
}}),function(){
var e="a11yhelp",t="a11yHelp";
CKEDITOR.plugins.add(e,{requires:"dialog",availableLangs:{af:1,ar:1,bg:1,ca:1,cs:1,cy:1,da:1,de:1,el:1,en:1,"en-gb":1,eo:1,es:1,et:1,eu:1,fa:1,fi:1,fo:1,fr:1,"fr-ca":1,gl:1,gu:1,he:1,hi:1,hr:1,hu:1,id:1,it:1,ja:1,km:1,ko:1,ku:1,lt:1,lv:1,mk:1,mn:1,nb:1,nl:1,no:1,pl:1,pt:1,"pt-br":1,ro:1,ru:1,si:1,sk:1,sl:1,sq:1,sr:1,"sr-latn":1,sv:1,th:1,tr:1,tt:1,ug:1,uk:1,vi:1,zh:1,"zh-cn":1},init:function(e){
var n=this;
e.addCommand(t,{exec:function(){
var i=e.langCode;
i=n.availableLangs[i]?i:n.availableLangs[i.replace(/-.*/,"")]?i.replace(/-.*/,""):"en",CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(n.path+"dialogs/lang/"+i+".js"),function(){
e.lang.a11yhelp=n.langEntries[i],e.openDialog(t);
});
},modes:{wysiwyg:1,source:1},readOnly:1,canUndo:!1}),e.setKeystroke(CKEDITOR.ALT+48,"a11yHelp"),CKEDITOR.dialog.add(t,this.path+"dialogs/a11yhelp.js"),e.on("ariaEditorHelpLabel",function(t){
t.data.label=e.lang.common.editorHelp;
});
}});
}(),CKEDITOR.plugins.add("about",{requires:"dialog",init:function(e){
var t=e.addCommand("about",new CKEDITOR.dialogCommand("about"));
t.modes={wysiwyg:1,source:1},t.canUndo=!1,t.readOnly=1,e.ui.addButton&&e.ui.addButton("About",{label:e.lang.about.title,command:"about",toolbar:"about"}),CKEDITOR.dialog.add("about",this.path+"dialogs/about.js");
}}),CKEDITOR.plugins.add("basicstyles",{init:function(e){
var t=0,n=function(n,o,a,r){
if(r){
var s=new CKEDITOR.style(r),l=i[a];
l.unshift(s),e.attachStyleStateChange(s,function(t){
!e.readOnly&&e.getCommand(a).setState(t);
}),e.addCommand(a,new CKEDITOR.styleCommand(s,{contentForms:l})),e.ui.addButton&&e.ui.addButton(n,{label:o,command:a,toolbar:"basicstyles,"+(t+=10)});
}
},i={bold:["strong","b",["span",function(e){
var t=e.styles["font-weight"];
return "bold"==t||+t>=700;
}]],italic:["em","i",["span",function(e){
return "italic"==e.styles["font-style"];
}]],underline:["u",["span",function(e){
return "underline"==e.styles["text-decoration"];
}]],strike:["s","strike",["span",function(e){
return "line-through"==e.styles["text-decoration"];
}]],subscript:["sub"],superscript:["sup"]},o=e.config,a=e.lang.basicstyles;
n("Bold",a.bold,"bold",o.coreStyles_bold),n("Italic",a.italic,"italic",o.coreStyles_italic),n("Underline",a.underline,"underline",o.coreStyles_underline),n("Strike",a.strike,"strike",o.coreStyles_strike),n("Subscript",a.subscript,"subscript",o.coreStyles_subscript),n("Superscript",a.superscript,"superscript",o.coreStyles_superscript),e.setKeystroke([[CKEDITOR.CTRL+66,"bold"],[CKEDITOR.CTRL+73,"italic"],[CKEDITOR.CTRL+85,"underline"]]);
}}),CKEDITOR.config.coreStyles_bold={element:"strong",overrides:"b"},CKEDITOR.config.coreStyles_italic={element:"em",overrides:"i"},CKEDITOR.config.coreStyles_underline={element:"u"},CKEDITOR.config.coreStyles_strike={element:"s",overrides:"strike"},CKEDITOR.config.coreStyles_subscript={element:"sub"},CKEDITOR.config.coreStyles_superscript={element:"sup"},function(){
function e(e,t){
var i,o=e.config.useComputedState;
if(o=void 0===o||o,o||(i=n(t.lastElement,e.editable())),i=i||t.block||t.blockLimit,i.equals(e.editable())){
var a=e.getSelection().getRanges()[0].getEnclosedNode();
a&&a.type==CKEDITOR.NODE_ELEMENT&&(i=a);
}
if(i){
var r=o?i.getComputedStyle("direction"):i.getStyle("direction")||i.getAttribute("dir");
e.getCommand("bidirtl").setState("rtl"==r?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF),e.getCommand("bidiltr").setState("ltr"==r?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF);
}
};
function t(e,t){
var n=t.block||t.blockLimit||e.editable(),i=n.getDirection(1);
i!=(e._.selDir||e.lang.dir)&&(e._.selDir=i,e.fire("contentDirChanged",i));
};
function n(e,t){
for(;e&&!(e.getName() in c||e.equals(t));){
var n=e.getParent();
if(!n){
break;
}
e=n;
}
return e;
};
function i(e,t,n,i){
if(!e.isReadOnly()&&!e.equals(n.editable())){
CKEDITOR.dom.element.setMarker(i,e,"bidi_processed",1);
for(var o=e,a=n.editable();(o=o.getParent())&&!o.equals(a);){
if(o.getCustomData("bidi_processed")){
return e.removeStyle("direction"),void e.removeAttribute("dir");
}
}
var r="useComputedState" in n.config?n.config.useComputedState:1,s=r?e.getComputedStyle("direction"):e.getStyle("direction")||e.hasAttribute("dir");
s!=t&&(e.removeStyle("direction"),r?(e.removeAttribute("dir"),t!=e.getComputedStyle("direction")&&e.setAttribute("dir",t)):e.setAttribute("dir",t),n.forceNextSelectionCheck());
}
};
function o(e,t,n){
var i=e.getCommonAncestor(!1,!0);
if(e=e.clone(),e.enlarge(n==CKEDITOR.ENTER_BR?CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:CKEDITOR.ENLARGE_BLOCK_CONTENTS),e.checkBoundaryOfElement(i,CKEDITOR.START)&&e.checkBoundaryOfElement(i,CKEDITOR.END)){
for(var o;i&&i.type==CKEDITOR.NODE_ELEMENT&&(o=i.getParent())&&1==o.getChildCount()&&!(i.getName() in t);){
i=o;
}
return i.type==CKEDITOR.NODE_ELEMENT&&i.getName() in t&&i;
}
};
function a(n){
return {context:"p",allowedContent:{"h1 h2 h3 h4 h5 h6 table ul ol blockquote div tr p div li td":{propertiesOnly:!0,attributes:"dir"}},requiredContent:"p[dir]",refresh:function(n,i){
e(n,i),t(n,i);
},exec:function(e){
var t=e.getSelection(),a=e.config.enterMode,r=t.getRanges();
if(r&&r.length){
for(var s,c={},u=t.createBookmarks(),h=r.createIterator(),f=0;s=h.getNextRange(1);){
var m=s.getEnclosedNode();
m&&(!m||m.type==CKEDITOR.NODE_ELEMENT&&m.getName() in d)||(m=o(s,l,a)),m&&i(m,n,e,c);
var g,p,E=new CKEDITOR.dom.walker(s),T=u[f].startNode,C=u[f++].endNode;
E.evaluator=function(e){
function t(e){
return e?e.type==CKEDITOR.NODE_ELEMENT:!1;
};
function n(e){
return e.getName() in l;
};
var i=a==CKEDITOR.ENTER_P?"p":"div";
return !(!t(e)||!n(e)||e.is(i)&&t(e.getParent())&&e.getParent().is("blockquote")||!(e.getPosition(T)&CKEDITOR.POSITION_FOLLOWING)||(e.getPosition(C)&CKEDITOR.POSITION_PRECEDING+CKEDITOR.POSITION_CONTAINS)!=CKEDITOR.POSITION_PRECEDING);
};
for(;p=E.next();){
i(p,n,e,c);
}
for(g=s.createIterator(),g.enlargeBr=a!=CKEDITOR.ENTER_BR;p=g.getNextParagraph(a==CKEDITOR.ENTER_P?"p":"div");){
i(p,n,e,c);
}
}
CKEDITOR.dom.element.clearAllMarkers(c),e.forceNextSelectionCheck(),t.selectBookmarks(u),e.focus();
}
}};
};
function r(e){
for(var t=e.getDocument().getBody().getParent();e;){
if(e.equals(t)){
return !1;
}
e=e.getParent();
}
return !0;
};
function s(e){
var t=e==u.setAttribute,n=e==u.removeAttribute,i=/\bdirection\s*:\s*(.*?)\s*(:?$|;)/;
return function(o,a){
if(!this.isReadOnly()){
var s;
if((o==(t||n?"dir":"direction")||"style"==o&&(n||i.test(a)))&&!r(this)){
s=this.getDirection(1);
var l=e.apply(this,arguments);
if(s!=this.getDirection(1)){
return this.getDocument().fire("dirChanged",this),l;
}
}
}
return e.apply(this,arguments);
};
};
var l={table:1,ul:1,ol:1,blockquote:1,div:1},d={},c={};
CKEDITOR.tools.extend(d,l,{tr:1,p:1,div:1,li:1}),CKEDITOR.tools.extend(c,d,{td:1}),CKEDITOR.plugins.add("bidi",{init:function(e){
function t(t,n,i,o,a){
e.addCommand(i,new CKEDITOR.command(e,o)),e.ui.addButton&&e.ui.addButton(t,{label:n,command:i,toolbar:"bidi,"+a});
};
if(!e.blockless){
var n=e.lang.bidi;
t("BidiLtr",n.ltr,"bidiltr",a("ltr"),10),t("BidiRtl",n.rtl,"bidirtl",a("rtl"),20),e.on("contentDom",function(){
e.document.on("dirChanged",function(t){
e.fire("dirChanged",{node:t.data,dir:t.data.getDirection(1)});
});
}),e.on("contentDirChanged",function(t){
var n=(e.lang.dir!=t.data?"add":"remove")+"Class",i=e.ui.space(e.config.toolbarLocation);
i&&i[n]("cke_mixed_dir_content");
});
}
}});
for(var u=CKEDITOR.dom.element.prototype,h=["setStyle","removeStyle","setAttribute","removeAttribute"],f=0;f<h.length;f++){
u[h[f]]=CKEDITOR.tools.override(u[h[f]],s);
}
}(),function(){
function e(e){
for(var t,n=0,i=e.getChildCount();i>n&&(t=e.getChild(n));n++){
if(t.type==CKEDITOR.NODE_ELEMENT&&t.isBlockBoundary()){
return !1;
}
}
return !0;
};
var t={exec:function(t){
var n=t.getCommand("blockquote").state,i=t.getSelection(),o=i&&i.getRanges()[0];
if(o){
var a=i.createBookmarks();
if(CKEDITOR.env.ie){
var r,s=a[0].startNode,l=a[0].endNode;
if(s&&"blockquote"==s.getParent().getName()){
for(r=s;r=r.getNext();){
if(r.type==CKEDITOR.NODE_ELEMENT&&r.isBlockBoundary()){
s.move(r,!0);
break;
}
}
}
if(l&&"blockquote"==l.getParent().getName()){
for(r=l;r=r.getPrevious();){
if(r.type==CKEDITOR.NODE_ELEMENT&&r.isBlockBoundary()){
l.move(r);
break;
}
}
}
}
var d,c=o.createIterator();
if(c.enlargeBr=t.config.enterMode!=CKEDITOR.ENTER_BR,n==CKEDITOR.TRISTATE_OFF){
for(var u=[];d=c.getNextParagraph();){
u.push(d);
}
if(u.length<1){
var h=t.document.createElement(t.config.enterMode==CKEDITOR.ENTER_P?"p":"div"),f=a.shift();
o.insertNode(h),h.append(new CKEDITOR.dom.text("\ufeff",t.document)),o.moveToBookmark(f),o.selectNodeContents(h),o.collapse(!0),f=o.createBookmark(),u.push(h),a.unshift(f);
}
for(var m=u[0].getParent(),g=[],p=0;p<u.length;p++){
d=u[p],m=m.getCommonAncestor(d.getParent());
}
for(var E={table:1,tbody:1,tr:1,ol:1,ul:1};E[m.getName()];){
m=m.getParent();
}
for(var T=null;u.length>0;){
for(d=u.shift();!d.getParent().equals(m);){
d=d.getParent();
}
d.equals(T)||g.push(d),T=d;
}
for(;g.length>0;){
if(d=g.shift(),"blockquote"==d.getName()){
for(var C=new CKEDITOR.dom.documentFragment(t.document);d.getFirst();){
C.append(d.getFirst().remove()),u.push(C.getLast());
}
C.replace(d);
}else{
u.push(d);
}
}
var v=t.document.createElement("blockquote");
for(v.insertBefore(u[0]);u.length>0;){
d=u.shift(),v.append(d);
}
}else{
if(n==CKEDITOR.TRISTATE_ON){
for(var I=[],O={};d=c.getNextParagraph();){
for(var D=null,b=null;d.getParent();){
if("blockquote"==d.getParent().getName()){
D=d.getParent(),b=d;
break;
}
d=d.getParent();
}
D&&b&&!b.getCustomData("blockquote_moveout")&&(I.push(b),CKEDITOR.dom.element.setMarker(O,b,"blockquote_moveout",!0));
}
CKEDITOR.dom.element.clearAllMarkers(O);
var R=[],y=[];
for(O={};I.length>0;){
var K=I.shift();
v=K.getParent(),K.getPrevious()?K.getNext()?(K.breakParent(K.getParent()),y.push(K.getNext())):K.remove().insertAfter(v):K.remove().insertBefore(v),v.getCustomData("blockquote_processed")||(y.push(v),CKEDITOR.dom.element.setMarker(O,v,"blockquote_processed",!0)),R.push(K);
}
for(CKEDITOR.dom.element.clearAllMarkers(O),p=y.length-1;p>=0;p--){
v=y[p],e(v)&&v.remove();
}
if(t.config.enterMode==CKEDITOR.ENTER_BR){
for(var _12=!0;R.length;){
if(K=R.shift(),"div"==K.getName()){
C=new CKEDITOR.dom.documentFragment(t.document);
var k=_12&&K.getPrevious()&&!(K.getPrevious().type==CKEDITOR.NODE_ELEMENT&&K.getPrevious().isBlockBoundary());
k&&C.append(t.document.createElement("br"));
for(var w=K.getNext()&&!(K.getNext().type==CKEDITOR.NODE_ELEMENT&&K.getNext().isBlockBoundary());K.getFirst();){
K.getFirst().remove().appendTo(C);
}
w&&C.append(t.document.createElement("br")),C.replace(K),_12=!1;
}
}
}
}
}
i.selectBookmarks(a),t.focus();
}
},refresh:function(e,t){
var n=t.block||t.blockLimit;
this.setState(e.elementPath(n).contains("blockquote",1)?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF);
},context:"blockquote",allowedContent:"blockquote",requiredContent:"blockquote"};
CKEDITOR.plugins.add("blockquote",{init:function(e){
e.blockless||(e.addCommand("blockquote",t),e.ui.addButton&&e.ui.addButton("Blockquote",{label:e.lang.blockquote.toolbar,command:"blockquote",toolbar:"blocks,10"}));
}});
}(),function(){
function e(e,t,n){
return t.type||(t.type="auto"),n&&e.fire("beforePaste",t)===!1?!1:!t.dataValue&&t.dataTransfer.isEmpty()?!1:(t.dataValue||(t.dataValue=""),CKEDITOR.env.gecko&&"drop"==t.method&&e.toolbox&&e.once("afterPaste",function(){
e.toolbox.focus();
}),e.fire("paste",t));
};
function t(t){
function n(){
function e(e,n,i,o,a){
var r=t.lang.clipboard[n];
t.addCommand(n,i),t.ui.addButton&&t.ui.addButton(e,{label:r,command:n,toolbar:"clipboard,"+o}),t.addMenuItems&&t.addMenuItem(n,{label:r,command:n,group:"clipboard",order:a});
};
e("Cut","cut",a("cut"),10,1),e("Copy","copy",a("copy"),20,4),e("Paste","paste",r(),30,8);
};
function i(){
t.on("key",f),t.on("contentDom",o),t.on("selectionChange",function(e){
v=e.data.selection.getRanges()[0].checkReadOnly(),g();
}),t.contextMenu&&t.contextMenu.addListener(function(e,t){
return v=t.getRanges()[0].checkReadOnly(),{cut:p("cut"),copy:p("copy"),paste:p("paste")};
});
};
function o(){
var e=t.editable();
if(CKEDITOR.plugins.clipboard.isCustomCopyCutSupported){
var n=function(e){
t.readOnly&&"cut"==e.name||E.initPasteDataTransfer(e,t),e.data.preventDefault();
};
e.on("copy",n),e.on("cut",n),e.on("cut",function(){
t.readOnly||t.extractSelectedHtml();
},null,null,999);
}
e.on(E.mainPasteEvent,function(e){
"beforepaste"==E.mainPasteEvent&&T||m(e);
}),"beforepaste"==E.mainPasteEvent&&(e.on("paste",function(e){
C||(s(),e.data.preventDefault(),m(e),d("paste")||t.openDialog("paste"));
}),e.on("contextmenu",l,null,null,0),e.on("beforepaste",function(e){
!e.data||e.data.$.ctrlKey||e.data.$.shiftKey||l();
},null,null,0)),e.on("beforecut",function(){
!T&&c(t);
});
var i;
e.attachListener(CKEDITOR.env.ie?e:t.document.getDocumentElement(),"mouseup",function(){
i=setTimeout(function(){
g();
},0);
}),t.on("destroy",function(){
clearTimeout(i);
}),e.on("keyup",g);
};
function a(e){
return {type:e,canUndo:"cut"==e,startDisabled:!0,exec:function(){
function e(e){
if(CKEDITOR.env.ie){
return d(e);
}
try{
return t.document.$.execCommand(e,!1,null);
}
catch(n){
return !1;
}
};
"cut"==this.type&&c();
var n=e(this.type);
return n||t.showNotification(t.lang.clipboard[this.type+"Error"]),n;
}};
};
function r(){
return {canUndo:!1,async:!0,exec:function(t,n){
var i=function(n,i){
n&&e(t,n,!!i),t.fire("afterCommandExec",{name:"paste",command:o,returnValue:!!n});
},o=this;
"string"==typeof n?i({dataValue:n,method:"paste",dataTransfer:E.initPasteDataTransfer()},1):t.getClipboardData(i);
}};
};
function s(){
C=1,setTimeout(function(){
C=0;
},100);
};
function l(){
T=1,setTimeout(function(){
T=0;
},10);
};
function d(e){
var n=t.document,i=n.getBody(),o=!1,a=function(){
o=!0;
};
return i.on(e,a),CKEDITOR.env.version>7?n.$.execCommand(e):n.$.selection.createRange().execCommand(e),i.removeListener(e,a),o;
};
function c(){
if(CKEDITOR.env.ie&&!CKEDITOR.env.quirks){
var e,n,i,o=t.getSelection();
o.getType()==CKEDITOR.SELECTION_ELEMENT&&(e=o.getSelectedElement())&&(n=o.getRanges()[0],i=t.document.createText(""),i.insertBefore(e),n.setStartBefore(i),n.setEndAfter(e),o.selectRanges([n]),setTimeout(function(){
e.getParent()&&(i.remove(),o.selectElement(e));
},0));
}
};
function u(e,n){
var i,o=t.document,a=t.editable(),r=function(e){
e.cancel();
};
if(!o.getById("cke_pastebin")){
var s=t.getSelection(),l=s.createBookmarks();
CKEDITOR.env.ie&&s.root.fire("selectionchange");
var d=new CKEDITOR.dom.element(!CKEDITOR.env.webkit&&!a.is("body")||CKEDITOR.env.ie?"div":"body",o);
d.setAttributes({id:"cke_pastebin","data-cke-temp":"1"});
var c,u=0,h=o.getWindow();
CKEDITOR.env.webkit?(a.append(d),d.addClass("cke_editable"),a.is("body")||(c="static"!=a.getComputedStyle("position")?a:CKEDITOR.dom.element.get(a.$.offsetParent),u=c.getDocumentPosition().y)):a.getAscendant(CKEDITOR.env.ie?"body":"html",1).append(d),d.setStyles({position:"absolute",top:h.getScrollPosition().y-u+10+"px",width:"1px",height:Math.max(1,h.getViewPaneSize().height-20)+"px",overflow:"hidden",margin:0,padding:0}),CKEDITOR.env.safari&&d.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select","text"));
var f=d.getParent().isReadOnly();
f?(d.setOpacity(0),d.setAttribute("contenteditable",!0)):d.setStyle("ltr"==t.config.contentsLangDirection?"left":"right","-1000px"),t.on("selectionChange",r,null,null,0),(CKEDITOR.env.webkit||CKEDITOR.env.gecko)&&(i=a.once("blur",r,null,null,-100)),f&&d.focus();
var m=new CKEDITOR.dom.range(d);
m.selectNodeContents(d);
var g=m.select();
CKEDITOR.env.ie&&(i=a.once("blur",function(){
t.lockSelection(g);
}));
var p=CKEDITOR.document.getWindow().getScrollPosition().y;
setTimeout(function(){
CKEDITOR.env.webkit&&(CKEDITOR.document.getBody().$.scrollTop=p),i&&i.removeListener(),CKEDITOR.env.ie&&a.focus(),s.selectBookmarks(l),d.remove();
var e;
CKEDITOR.env.webkit&&(e=d.getFirst())&&e.is&&e.hasClass("Apple-style-span")&&(d=e),t.removeListener("selectionChange",r),n(d.getHtml());
},0);
}
};
function h(){
if("paste"==E.mainPasteEvent){
return t.fire("beforePaste",{type:"auto",method:"paste"}),!1;
}
t.focus(),s();
var e=t.focusManager;
return e.lock(),t.editable().fire(E.mainPasteEvent)&&!d("paste")?(e.unlock(),!1):(e.unlock(),!0);
};
function f(e){
if("wysiwyg"==t.mode){
switch(e.data.keyCode){
case CKEDITOR.CTRL+86:
case CKEDITOR.SHIFT+45:
var n=t.editable();
return s(),void ("paste"==E.mainPasteEvent&&n.fire("beforepaste"));
case CKEDITOR.CTRL+88:
case CKEDITOR.SHIFT+46:
t.fire("saveSnapshot"),setTimeout(function(){
t.fire("saveSnapshot");
},50);
}
}
};
function m(n){
var i={type:"auto",method:"paste",dataTransfer:E.initPasteDataTransfer(n)};
i.dataTransfer.cacheData();
var o=t.fire("beforePaste",i)!==!1;
o&&E.canClipboardApiBeTrusted(i.dataTransfer,t)?(n.data.preventDefault(),setTimeout(function(){
e(t,i);
},0)):u(n,function(n){
i.dataValue=n.replace(/<span[^>]+data-cke-bookmark[^<]*?<\/span>/gi,""),o&&e(t,i);
});
};
function g(){
if("wysiwyg"==t.mode){
var e=p("paste");
t.getCommand("cut").setState(p("cut")),t.getCommand("copy").setState(p("copy")),t.getCommand("paste").setState(e),t.fire("pasteState",e);
}
};
function p(e){
if(v&&e in {paste:1,cut:1}){
return CKEDITOR.TRISTATE_DISABLED;
}
if("paste"==e){
return CKEDITOR.TRISTATE_OFF;
}
var n=t.getSelection(),i=n.getRanges(),o=n.getType()==CKEDITOR.SELECTION_NONE||1==i.length&&i[0].collapsed;
return o?CKEDITOR.TRISTATE_DISABLED:CKEDITOR.TRISTATE_OFF;
};
var E=CKEDITOR.plugins.clipboard,T=0,C=0,v=0;
i(),n(),t.getClipboardData=function(e,n){
function i(e){
e.removeListener(),e.cancel(),n(e.data);
};
function o(e){
e.removeListener(),s=!0,l=e.data.type;
};
function a(e){
e.removeListener(),e.cancel(),d=!0,n({type:l,dataValue:e.data.dataValue,dataTransfer:e.data.dataTransfer,method:"paste"});
};
function r(){
this.customTitle=e&&e.title;
};
var s=!1,l="auto",d=!1;
n||(n=e,e=null),t.on("paste",i,null,null,0),t.on("beforePaste",o,null,null,1000),h()===!1&&(t.removeListener("paste",i),s&&t.fire("pasteDialog",r)?(t.on("pasteDialogCommit",a),t.on("dialogHide",function(e){
e.removeListener(),e.data.removeListener("pasteDialogCommit",a),setTimeout(function(){
d||n(null);
},10);
})):n(null));
};
};
function n(e){
if(CKEDITOR.env.webkit){
if(!e.match(/^[^<]*$/g)&&!e.match(/^(<div><br( ?\/)?><\/div>|<div>[^<]*<\/div>)*$/gi)){
return "html";
}
}else{
if(CKEDITOR.env.ie){
if(!e.match(/^([^<]|<br( ?\/)?>)*$/gi)&&!e.match(/^(<p>([^<]|<br( ?\/)?>)*<\/p>|(\r\n))*$/gi)){
return "html";
}
}else{
if(!CKEDITOR.env.gecko){
return "html";
}
if(!e.match(/^([^<]|<br( ?\/)?>)*$/gi)){
return "html";
}
}
}
return "htmlifiedtext";
};
function i(e,t){
function n(e){
return CKEDITOR.tools.repeat("</p><p>",~~(e/2))+(e%2==1?"<br>":"");
};
return t=t.replace(/\s+/g," ").replace(/> +</g,"><").replace(/<br ?\/>/gi,"<br>"),t=t.replace(/<\/?[A-Z]+>/g,function(e){
return e.toLowerCase();
}),t.match(/^[^<]$/)?t:(CKEDITOR.env.webkit&&t.indexOf("<div>")>-1&&(t=t.replace(/^(<div>(<br>|)<\/div>)(?!$|(<div>(<br>|)<\/div>))/g,"<br>").replace(/^(<div>(<br>|)<\/div>){2}(?!$)/g,"<div></div>"),t.match(/<div>(<br>|)<\/div>/)&&(t="<p>"+t.replace(/(<div>(<br>|)<\/div>)+/g,function(e){
return n(e.split("</div><div>").length+1);
})+"</p>"),t=t.replace(/<\/div><div>/g,"<br>"),t=t.replace(/<\/?div>/g,"")),CKEDITOR.env.gecko&&e.enterMode!=CKEDITOR.ENTER_BR&&(CKEDITOR.env.gecko&&(t=t.replace(/^<br><br>$/,"<br>")),t.indexOf("<br><br>")>-1&&(t="<p>"+t.replace(/(<br>){2,}/g,function(e){
return n(e.length/4);
})+"</p>")),r(e,t));
};
function o(){
function e(){
var e={};
for(var t in CKEDITOR.dtd){
"$"!=t.charAt(0)&&"div"!=t&&"span"!=t&&(e[t]=1);
}
return e;
};
function t(){
var t=new CKEDITOR.filter;
return t.allow({$1:{elements:e(),attributes:!0,styles:!1,classes:!1}}),t;
};
var n={};
return {get:function(e){
return "plain-text"==e?n.plainText||(n.plainText=new CKEDITOR.filter("br")):"semantic-content"==e?n.semanticContent||(n.semanticContent=t()):e?new CKEDITOR.filter(e):null;
}};
};
function a(e,t,n){
var i=CKEDITOR.htmlParser.fragment.fromHtml(t),o=new CKEDITOR.htmlParser.basicWriter;
return n.applyTo(i,!0,!1,e.activeEnterMode),i.writeHtml(o),o.getHtml();
};
function r(e,t){
return e.enterMode==CKEDITOR.ENTER_BR?t=t.replace(/(<\/p><p>)+/g,function(e){
return CKEDITOR.tools.repeat("<br>",e.length/7*2);
}).replace(/<\/?p>/g,""):e.enterMode==CKEDITOR.ENTER_DIV&&(t=t.replace(/<(\/)?p>/g,"<$1div>")),t;
};
function s(e){
e.data.preventDefault(),e.data.$.dataTransfer.dropEffect="none";
};
function l(t){
var n=CKEDITOR.plugins.clipboard;
t.on("contentDom",function(){
function i(n,i,o){
i.select(),e(t,{dataTransfer:o,method:"drop"},1),o.sourceEditor.fire("saveSnapshot"),o.sourceEditor.editable().extractHtmlFromRange(n),o.sourceEditor.getSelection().selectRanges([n]),o.sourceEditor.fire("saveSnapshot");
};
function o(i,o){
i.select(),e(t,{dataTransfer:o,method:"drop"},1),n.resetDragDataTransfer();
};
function a(e,n,i){
var o={$:e.data.$,target:e.data.getTarget()};
n&&(o.dragRange=n),i&&(o.dropRange=i),t.fire(e.name,o)===!1&&e.data.preventDefault();
};
function r(e){
return e.type!=CKEDITOR.NODE_ELEMENT&&(e=e.getParent()),e.getChildCount();
};
var s=t.editable(),l=CKEDITOR.plugins.clipboard.getDropTarget(t),d=t.ui.space("top"),c=t.ui.space("bottom");
n.preventDefaultDropOnElement(d),n.preventDefaultDropOnElement(c),s.attachListener(l,"dragstart",a),s.attachListener(t,"dragstart",n.resetDragDataTransfer,n,null,1),s.attachListener(t,"dragstart",function(e){
n.initDragDataTransfer(e,t);
},null,null,2),s.attachListener(t,"dragstart",function(){
var e=n.dragRange=t.getSelection().getRanges()[0];
CKEDITOR.env.ie&&CKEDITOR.env.version<10&&(n.dragStartContainerChildCount=e?r(e.startContainer):null,n.dragEndContainerChildCount=e?r(e.endContainer):null);
},null,null,100),s.attachListener(l,"dragend",a),s.attachListener(t,"dragend",n.initDragDataTransfer,n,null,1),s.attachListener(t,"dragend",n.resetDragDataTransfer,n,null,100),s.attachListener(l,"dragover",function(e){
var t=e.data.getTarget();
return t&&t.is&&t.is("html")?void e.data.preventDefault():void (CKEDITOR.env.ie&&CKEDITOR.plugins.clipboard.isFileApiSupported&&e.data.$.dataTransfer.types.contains("Files")&&e.data.preventDefault());
}),s.attachListener(l,"drop",function(e){
if(!e.data.$.defaultPrevented){
e.data.preventDefault();
var i=e.data.getTarget(),o=i.isReadOnly();
if(!o||i.type==CKEDITOR.NODE_ELEMENT&&i.is("html")){
var r=n.getRangeAtDropPosition(e,t),s=n.dragRange;
r&&a(e,s,r);
}
}
},null,null,9999),s.attachListener(t,"drop",n.initDragDataTransfer,n,null,1),s.attachListener(t,"drop",function(e){
var a=e.data;
if(a){
var r=a.dropRange,s=a.dragRange,l=a.dataTransfer;
l.getTransferType(t)==CKEDITOR.DATA_TRANSFER_INTERNAL?setTimeout(function(){
n.internalDrop(s,r,l,t);
},0):l.getTransferType(t)==CKEDITOR.DATA_TRANSFER_CROSS_EDITORS?i(s,r,l):o(r,l);
}
},null,null,9999);
});
};
CKEDITOR.plugins.add("clipboard",{requires:"dialog",init:function(e){
var r,s=o();
e.config.forcePasteAsPlainText?r="plain-text":e.config.pasteFilter?r=e.config.pasteFilter:!CKEDITOR.env.webkit||"pasteFilter" in e.config||(r="semantic-content"),e.pasteFilter=s.get(r),t(e),l(e),CKEDITOR.dialog.add("paste",CKEDITOR.getUrl(this.path+"dialogs/paste.js")),e.on("paste",function(t){
if(t.data.dataTransfer||(t.data.dataTransfer=new CKEDITOR.plugins.clipboard.dataTransfer),!t.data.dataValue){
var n=t.data.dataTransfer,i=n.getData("text/html");
i?(t.data.dataValue=i,t.data.type="html"):(i=n.getData("text/plain"),i&&(t.data.dataValue=e.editable().transformPlainTextToHtml(i),t.data.type="text"));
}
},null,null,1),e.on("paste",function(e){
var t=e.data.dataValue,n=CKEDITOR.dtd.$block;
if(t.indexOf("Apple-")>-1&&(t=t.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi," "),"html"!=e.data.type&&(t=t.replace(/<span class="Apple-tab-span"[^>]*>([^<]*)<\/span>/gi,function(e,t){
return t.replace(/\t/g,"&nbsp;&nbsp; &nbsp;");
})),t.indexOf("<br class=\"Apple-interchange-newline\">")>-1&&(e.data.startsWithEOL=1,e.data.preSniffing="html",t=t.replace(/<br class="Apple-interchange-newline">/,"")),t=t.replace(/(<[^>]+) class="Apple-[^"]*"/gi,"$1")),t.match(/^<[^<]+cke_(editable|contents)/i)){
var i,o,a=new CKEDITOR.dom.element("div");
for(a.setHtml(t);1==a.getChildCount()&&(i=a.getFirst())&&i.type==CKEDITOR.NODE_ELEMENT&&(i.hasClass("cke_editable")||i.hasClass("cke_contents"));){
a=o=i;
}
o&&(t=o.getHtml().replace(/<br>$/i,""));
}
CKEDITOR.env.ie?t=t.replace(/^&nbsp;(?: |\r\n)?<(\w+)/g,function(t,i){
return i.toLowerCase() in n?(e.data.preSniffing="html","<"+i):t;
}):CKEDITOR.env.webkit?t=t.replace(/<\/(\w+)><div><br><\/div>$/,function(t,i){
return i in n?(e.data.endsWithEOL=1,"</"+i+">"):t;
}):CKEDITOR.env.gecko&&(t=t.replace(/(\s)<br>$/,"$1")),e.data.dataValue=t;
},null,null,3),e.on("paste",function(t){
var o,r=t.data,l=r.type,d=r.dataValue,c=e.config.clipboard_defaultContentType||"html",u=r.dataTransfer.getTransferType(e);
o="html"==l||"html"==r.preSniffing?"html":n(d),"htmlifiedtext"==o&&(d=i(e.config,d)),"text"==l&&"html"==o?d=a(e,d,s.get("plain-text")):u==CKEDITOR.DATA_TRANSFER_EXTERNAL&&e.pasteFilter&&!r.dontFilter&&(d=a(e,d,e.pasteFilter)),r.startsWithEOL&&(d="<br data-cke-eol=\"1\">"+d),r.endsWithEOL&&(d+="<br data-cke-eol=\"1\">"),"auto"==l&&(l="html"==o||"html"==c?"html":"text"),r.type=l,r.dataValue=d,delete r.preSniffing,delete r.startsWithEOL,delete r.endsWithEOL;
},null,null,6),e.on("paste",function(t){
var n=t.data;
n.dataValue&&(e.insertHtml(n.dataValue,n.type,n.range),setTimeout(function(){
e.fire("afterPaste");
},0));
},null,null,1000),e.on("pasteDialog",function(t){
setTimeout(function(){
e.openDialog("paste",t.data);
},0);
}),e.on("paste",function(t){
if(CKEDITOR.env.mac&&CKEDITOR.env.safari){
var n=/<img.*src=["']webkit-fake-url[^>]*>/gi,i=t.data.dataValue;
if(n.test(i)){
for(var o=i.match(n),a=0;a<o.length;a++){
i=i.replace(o[a],"");
}
alert(e.lang.clipboard.fakepath),t.data.dataValue=i;
}
}
});
}}),CKEDITOR.plugins.clipboard={isCustomCopyCutSupported:!CKEDITOR.env.ie&&!CKEDITOR.env.iOS,isCustomDataTypesSupported:!CKEDITOR.env.ie,isFileApiSupported:!CKEDITOR.env.ie||CKEDITOR.env.version>9,mainPasteEvent:CKEDITOR.env.ie&&!CKEDITOR.env.edge?"beforepaste":"paste",canClipboardApiBeTrusted:function(e,t){
return e.getTransferType(t)!=CKEDITOR.DATA_TRANSFER_EXTERNAL?!0:CKEDITOR.env.chrome&&!e.isEmpty()?!0:CKEDITOR.env.gecko&&(e.getData("text/html")||e.getFilesCount())?!0:!1;
},getDropTarget:function(e){
var t=e.editable();
return CKEDITOR.env.ie&&CKEDITOR.env.version<9||t.isInline()?t:e.document;
},fixSplitNodesAfterDrop:function(e,t,n,i){
function o(e,n,i){
var o=e;
return o.type==CKEDITOR.NODE_TEXT&&(o=e.getParent()),o.equals(n)&&i!=n.getChildCount()?(a(t),!0):void 0;
};
function a(e){
var t=e.startContainer.getChild(e.startOffset-1),n=e.startContainer.getChild(e.startOffset);
if(t&&t.type==CKEDITOR.NODE_TEXT&&n&&n.type==CKEDITOR.NODE_TEXT){
var i=t.getLength();
t.setText(t.getText()+n.getText()),n.remove(),e.setStart(t,i),e.collapse(!0);
}
};
var r=t.startContainer;
"number"==typeof i&&"number"==typeof n&&r.type==CKEDITOR.NODE_ELEMENT&&(o(e.startContainer,r,n)||o(e.endContainer,r,i));
},isDropRangeAffectedByDragRange:function(e,t){
var n=t.startContainer,i=t.endOffset;
return e.endContainer.equals(n)&&e.endOffset<=i?!0:e.startContainer.getParent().equals(n)&&e.startContainer.getIndex()<i?!0:e.endContainer.getParent().equals(n)&&e.endContainer.getIndex()<i?!0:!1;
},internalDrop:function(t,n,i,o){
var a,r,s,l=CKEDITOR.plugins.clipboard,d=o.editable();
o.fire("saveSnapshot"),o.fire("lockSnapshot",{dontUpdate:1}),CKEDITOR.env.ie&&CKEDITOR.env.version<10&&this.fixSplitNodesAfterDrop(t,n,l.dragStartContainerChildCount,l.dragEndContainerChildCount),s=this.isDropRangeAffectedByDragRange(t,n),s||(a=t.createBookmark(!1)),r=n.clone().createBookmark(!1),s&&(a=t.createBookmark(!1));
var c=a.startNode,u=a.endNode,h=r.startNode,f=u&&c.getPosition(h)&CKEDITOR.POSITION_PRECEDING&&u.getPosition(h)&CKEDITOR.POSITION_FOLLOWING;
f&&h.insertBefore(c),t=o.createRange(),t.moveToBookmark(a),d.extractHtmlFromRange(t,1),n=o.createRange(),n.moveToBookmark(r),e(o,{dataTransfer:i,method:"drop",range:n},1),o.fire("unlockSnapshot");
},getRangeAtDropPosition:function(e,t){
var n,i=e.data.$,o=i.clientX,a=i.clientY,r=t.getSelection(!0).getRanges()[0],s=t.createRange();
if(e.data.testRange){
return e.data.testRange;
}
if(document.caretRangeFromPoint){
n=t.document.$.caretRangeFromPoint(o,a),s.setStart(CKEDITOR.dom.node(n.startContainer),n.startOffset),s.collapse(!0);
}else{
if(i.rangeParent){
s.setStart(CKEDITOR.dom.node(i.rangeParent),i.rangeOffset),s.collapse(!0);
}else{
if(CKEDITOR.env.ie&&CKEDITOR.env.version>8&&r&&t.editable().hasFocus){
return r;
}
if(!document.body.createTextRange){
return null;
}
t.focus(),n=t.document.getBody().$.createTextRange();
try{
for(var l=!1,d=0;20>d&&!l;d++){
if(!l){
try{
n.moveToPoint(o,a-d),l=!0;
}
catch(c){
}
}
if(!l){
try{
n.moveToPoint(o,a+d),l=!0;
}
catch(c){
}
}
}
if(l){
var u="cke-temp-"+(new Date).getTime();
n.pasteHTML("<span id=\""+u+"\">\u200b</span>");
var h=t.document.getById(u);
s.moveToPosition(h,CKEDITOR.POSITION_BEFORE_START),h.remove();
}else{
var f,m=t.document.$.elementFromPoint(o,a),g=new CKEDITOR.dom.element(m);
if(g.equals(t.editable())||"html"==g.getName()){
return r&&r.startContainer&&!r.startContainer.equals(t.editable())?r:null;
}
f=g.getClientRect(),o<f.left?(s.setStartAt(g,CKEDITOR.POSITION_AFTER_START),s.collapse(!0)):(s.setStartAt(g,CKEDITOR.POSITION_BEFORE_END),s.collapse(!0));
}
}
catch(c){
return null;
}
}
}
return s;
},initDragDataTransfer:function(e,t){
var n=e.data.$?e.data.$.dataTransfer:null,i=new this.dataTransfer(n,t);
n?this.dragData&&i.id==this.dragData.id?i=this.dragData:this.dragData=i:this.dragData?i=this.dragData:this.dragData=i,e.data.dataTransfer=i;
},resetDragDataTransfer:function(){
this.dragData=null;
},initPasteDataTransfer:function(e,t){
if(this.isCustomCopyCutSupported){
if(e&&e.data&&e.data.$){
var n=new this.dataTransfer(e.data.$.clipboardData,t);
return this.copyCutData&&n.id==this.copyCutData.id?(n=this.copyCutData,n.$=e.data.$.clipboardData):this.copyCutData=n,n;
}
return new this.dataTransfer(null,t);
}
return CKEDITOR.env.ie&&CKEDITOR.env.edge?new this.dataTransfer(e&&e.data&&e.data.$&&e.data.$.clipboardData||null,t):new this.dataTransfer(null,t);
},preventDefaultDropOnElement:function(e){
e&&e.on("dragover",s);
}};
var d=CKEDITOR.plugins.clipboard.isCustomDataTypesSupported?"cke/id":"Text";
CKEDITOR.plugins.clipboard.dataTransfer=function(e,t){
if(e&&(this.$=e),this._={metaRegExp:/^<meta.*?>/i,bodyRegExp:/<body(?:[\s\S]*?)>([\s\S]*)<\/body>/i,fragmentRegExp:/<!--(?:Start|End)Fragment-->/g,data:{},files:[],normalizeType:function(e){
return e=e.toLowerCase(),"text"==e||"text/plain"==e?"Text":"url"==e?"URL":e;
}},this.id=this.getData(d),this.id||("Text"==d?this.id="":this.id="cke-"+CKEDITOR.tools.getUniqueId()),"Text"!=d){
try{
this.$.setData(d,this.id);
}
catch(n){
}
}
t&&(this.sourceEditor=t,this.setData("text/html",t.getSelectedHtml(1)),"Text"==d||this.getData("text/plain")||this.setData("text/plain",t.getSelection().getSelectedText()));
},CKEDITOR.DATA_TRANSFER_INTERNAL=1,CKEDITOR.DATA_TRANSFER_CROSS_EDITORS=2,CKEDITOR.DATA_TRANSFER_EXTERNAL=3,CKEDITOR.plugins.clipboard.dataTransfer.prototype={getData:function(e){
function t(e){
return void 0===e||null===e||""===e;
};
e=this._.normalizeType(e);
var n,i=this._.data[e];
if(t(i)){
try{
i=this.$.getData(e);
}
catch(o){
}
}
return t(i)&&(i=""),"text/html"==e?(i=i.replace(this._.metaRegExp,""),n=this._.bodyRegExp.exec(i),n&&n.length&&(i=n[1],i=i.replace(this._.fragmentRegExp,""))):"Text"==e&&CKEDITOR.env.gecko&&this.getFilesCount()&&"file://"==i.substring(0,7)&&(i=""),i;
},setData:function(e,t){
if(e=this._.normalizeType(e),this._.data[e]=t,CKEDITOR.plugins.clipboard.isCustomDataTypesSupported||"URL"==e||"Text"==e){
"Text"==d&&"Text"==e&&(this.id=t);
try{
this.$.setData(e,t);
}
catch(n){
}
}
},getTransferType:function(e){
return this.sourceEditor?this.sourceEditor==e?CKEDITOR.DATA_TRANSFER_INTERNAL:CKEDITOR.DATA_TRANSFER_CROSS_EDITORS:CKEDITOR.DATA_TRANSFER_EXTERNAL;
},cacheData:function(){
function e(e){
e=i._.normalizeType(e);
var t=i.getData(e);
t&&(i._.data[e]=t);
};
if(this.$){
var t,n,i=this;
if(CKEDITOR.plugins.clipboard.isCustomDataTypesSupported){
if(this.$.types){
for(t=0;t<this.$.types.length;t++){
e(this.$.types[t]);
}
}
}else{
e("Text"),e("URL");
}
if(n=this._getImageFromClipboard(),this.$&&this.$.files||n){
if(this._.files=[],CKEDITOR.env.ie&&CKEDITOR.env.edge){
if(this.$.files&&this.$.files.length){
for(t=0;t<this.$.files.length;t++){
this._.files.push(this.$.files[t]);
}
}
}else{
for(t=0;t<this.$.files.length;t++){
this._.files.push(this.$.files[t]);
}
}
0===this._.files.length&&n&&this._.files.push(n);
}
}
},getFilesCount:function(){
return this._.files.length?this._.files.length:this.$&&this.$.files&&this.$.files.length?this.$.files.length:this._getImageFromClipboard()?1:0;
},getFile:function(e){
return this._.files.length?this._.files[e]:this.$&&this.$.files&&this.$.files.length?this.$.files[e]:0===e?this._getImageFromClipboard():void 0;
},isEmpty:function(){
var e,t={};
if(this.getFilesCount()){
return !1;
}
for(e in this._.data){
t[e]=1;
}
if(this.$){
if(CKEDITOR.plugins.clipboard.isCustomDataTypesSupported){
if(this.$.types){
for(var n=0;n<this.$.types.length;n++){
t[this.$.types[n]]=1;
}
}
}else{
t.Text=1,t.URL=1;
}
}
"Text"!=d&&(t[d]=0);
for(e in t){
if(t[e]&&""!==this.getData(e)){
return !1;
}
}
return !0;
},_getImageFromClipboard:function(){
var e;
if(this.$&&this.$.items&&this.$.items[0]){
try{
if(e=this.$.items[0].getAsFile(),e&&e.type){
return e;
}
}
catch(t){
}
}
return void 0;
}};
}(),function(){
var e="<a id=\"{id}\" class=\"cke_button cke_button__{name} cke_button_{state} {cls}\""+(CKEDITOR.env.gecko&&!CKEDITOR.env.hc?"":" href=\"javascript:void('{titleJs}')\"")+" title=\"{title}\" tabindex=\"-1\" hidefocus=\"true\" role=\"button\" aria-labelledby=\"{id}_label\" aria-haspopup=\"{hasArrow}\" aria-disabled=\"{ariaDisabled}\"";
CKEDITOR.env.gecko&&CKEDITOR.env.mac&&(e+=" onkeypress=\"return false;\""),CKEDITOR.env.gecko&&(e+=" onblur=\"this.style.cssText = this.style.cssText;\""),e+=" onkeydown=\"return CKEDITOR.tools.callFunction({keydownFn},event);\" onfocus=\"return CKEDITOR.tools.callFunction({focusFn},event);\" "+(CKEDITOR.env.ie?"onclick=\"return false;\" onmouseup":"onclick")+"=\"CKEDITOR.tools.callFunction({clickFn},this);return false;\"><span class=\"cke_button_icon cke_button__{iconName}_icon\" style=\"{style}\"",e+=">&nbsp;</span><span id=\"{id}_label\" class=\"cke_button_label cke_button__{name}_label\" aria-hidden=\"false\">{label}</span>{arrowHtml}</a>";
var t="<span class=\"cke_button_arrow\">"+(CKEDITOR.env.hc?"&#9660;":"")+"</span>",n=CKEDITOR.addTemplate("buttonArrow",t),i=CKEDITOR.addTemplate("button",e);
CKEDITOR.plugins.add("button",{beforeInit:function(e){
e.ui.addHandler(CKEDITOR.UI_BUTTON,CKEDITOR.ui.button.handler);
}}),CKEDITOR.UI_BUTTON="button",CKEDITOR.ui.button=function(e){
CKEDITOR.tools.extend(this,e,{title:e.label,click:e.click||function(t){
t.execCommand(e.command);
}}),this._={};
},CKEDITOR.ui.button.handler={create:function(e){
return new CKEDITOR.ui.button(e);
}},CKEDITOR.ui.button.prototype={render:function(e,t){
function o(){
var t=e.mode;
if(t){
var n=this.modes[t]?void 0!==m[t]?m[t]:CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED;
n=e.readOnly&&!this.readOnly?CKEDITOR.TRISTATE_DISABLED:n,this.setState(n),this.refresh&&this.refresh();
}
};
var a,r=CKEDITOR.env,s=this._.id=CKEDITOR.tools.getNextId(),l="",d=this.command;
this._.editor=e;
var c={id:s,button:this,editor:e,focus:function(){
var e=CKEDITOR.document.getById(s);
e.focus();
},execute:function(){
this.button.click(e);
},attach:function(e){
this.button.attach(e);
}},u=CKEDITOR.tools.addFunction(function(e){
return c.onkey?(e=new CKEDITOR.dom.event(e),c.onkey(c,e.getKeystroke())!==!1):void 0;
}),h=CKEDITOR.tools.addFunction(function(e){
var t;
return c.onfocus&&(t=c.onfocus(c,new CKEDITOR.dom.event(e))!==!1),t;
}),f=0;
if(c.clickFn=a=CKEDITOR.tools.addFunction(function(){
f&&(e.unlockSelection(1),f=0),c.execute(),r.iOS&&e.focus();
}),this.modes){
var m={};
e.on("beforeModeUnload",function(){
e.mode&&this._.state!=CKEDITOR.TRISTATE_DISABLED&&(m[e.mode]=this._.state);
},this),e.on("activeFilterChange",o,this),e.on("mode",o,this),!this.readOnly&&e.on("readOnly",o,this);
}else{
d&&(d=e.getCommand(d),d&&(d.on("state",function(){
this.setState(d.state);
},this),l+=d.state==CKEDITOR.TRISTATE_ON?"on":d.state==CKEDITOR.TRISTATE_DISABLED?"disabled":"off"));
}
this.directional&&e.on("contentDirChanged",function(t){
var n=CKEDITOR.document.getById(this._.id),i=n.getFirst(),o=t.data;
o!=e.lang.dir?n.addClass("cke_"+o):n.removeClass("cke_ltr").removeClass("cke_rtl"),i.setAttribute("style",CKEDITOR.skin.getIconStyle(p,"rtl"==o,this.icon,this.iconOffset));
},this),d||(l+="off");
var g=this.name||this.command,p=g;
this.icon&&!/\./.test(this.icon)&&(p=this.icon,this.icon=null);
var E={id:s,name:g,iconName:p,label:this.label,cls:this.className||"",state:l,ariaDisabled:"disabled"==l?"true":"false",title:this.title,titleJs:r.gecko&&!r.hc?"":(this.title||"").replace("'",""),hasArrow:this.hasArrow?"true":"false",keydownFn:u,focusFn:h,clickFn:a,style:CKEDITOR.skin.getIconStyle(p,"rtl"==e.lang.dir,this.icon,this.iconOffset),arrowHtml:this.hasArrow?n.output():""};
return i.output(E,t),this.onRender&&this.onRender(),c;
},setState:function(e){
if(this._.state==e){
return !1;
}
this._.state=e;
var t=CKEDITOR.document.getById(this._.id);
if(t){
if(t.setState(e,"cke_button"),e==CKEDITOR.TRISTATE_DISABLED?t.setAttribute("aria-disabled",!0):t.removeAttribute("aria-disabled"),this.hasArrow){
var n=e==CKEDITOR.TRISTATE_ON?this._.editor.lang.button.selectedLabel.replace(/%1/g,this.label):this.label;
CKEDITOR.document.getById(this._.id+"_label").setText(n);
}else{
e==CKEDITOR.TRISTATE_ON?t.setAttribute("aria-pressed",!0):t.removeAttribute("aria-pressed");
}
return !0;
}
return !1;
},getState:function(){
return this._.state;
},toFeature:function(e){
if(this._.feature){
return this._.feature;
}
var t=this;
return this.allowedContent||this.requiredContent||!this.command||(t=e.getCommand(this.command)||t),this._.feature=t;
}},CKEDITOR.ui.prototype.addButton=function(e,t){
this.add(e,CKEDITOR.UI_BUTTON,t);
};
}(),CKEDITOR.plugins.add("panelbutton",{requires:"button",onLoad:function(){
function e(e){
var t=this._;
if(t.state!=CKEDITOR.TRISTATE_DISABLED){
return this.createPanel(e),t.on?void t.panel.hide():void t.panel.showBlock(this._.id,this.document.getById(this._.id),4);
}
};
CKEDITOR.ui.panelButton=CKEDITOR.tools.createClass({base:CKEDITOR.ui.button,$:function(t){
var n=t.panel||{};
delete t.panel,this.base(t),this.document=n.parent&&n.parent.getDocument()||CKEDITOR.document,n.block={attributes:n.attributes},n.toolbarRelated=!0,this.hasArrow=!0,this.click=e,this._={panelDefinition:n};
},statics:{handler:{create:function(e){
return new CKEDITOR.ui.panelButton(e);
}}},proto:{createPanel:function(e){
var t=this._;
if(!t.panel){
var n=this._.panelDefinition,i=this._.panelDefinition.block,o=n.parent||CKEDITOR.document.getBody(),a=this._.panel=new CKEDITOR.ui.floatPanel(e,o,n),r=a.addBlock(t.id,i),s=this;
a.onShow=function(){
s.className&&this.element.addClass(s.className+"_panel"),s.setState(CKEDITOR.TRISTATE_ON),t.on=1,s.editorFocus&&e.focus(),s.onOpen&&s.onOpen();
},a.onHide=function(n){
s.className&&this.element.getFirst().removeClass(s.className+"_panel"),s.setState(s.modes&&s.modes[e.mode]?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED),t.on=0,!n&&s.onClose&&s.onClose();
},a.onEscape=function(){
a.hide(1),s.document.getById(t.id).focus();
},this.onBlock&&this.onBlock(a,r),r.onHide=function(){
t.on=0,s.setState(CKEDITOR.TRISTATE_OFF);
};
}
}}});
},beforeInit:function(e){
e.ui.addHandler(CKEDITOR.UI_PANELBUTTON,CKEDITOR.ui.panelButton.handler);
}}),CKEDITOR.UI_PANELBUTTON="panelbutton",function(){
CKEDITOR.plugins.add("panel",{beforeInit:function(e){
e.ui.addHandler(CKEDITOR.UI_PANEL,CKEDITOR.ui.panel.handler);
}}),CKEDITOR.UI_PANEL="panel",CKEDITOR.ui.panel=function(e,t){
t&&CKEDITOR.tools.extend(this,t),CKEDITOR.tools.extend(this,{className:"",css:[]}),this.id=CKEDITOR.tools.getNextId(),this.document=e,this.isFramed=this.forceIFrame||this.css.length,this._={blocks:{}};
},CKEDITOR.ui.panel.handler={create:function(e){
return new CKEDITOR.ui.panel(e);
}};
var e=CKEDITOR.addTemplate("panel","<div lang=\"{langCode}\" id=\"{id}\" dir={dir} class=\"cke cke_reset_all {editorId} cke_panel cke_panel {cls} cke_{dir}\" style=\"z-index:{z-index}\" role=\"presentation\">{frame}</div>"),t=CKEDITOR.addTemplate("panel-frame","<iframe id=\"{id}\" class=\"cke_panel_frame\" role=\"presentation\" frameborder=\"0\" src=\"{src}\"></iframe>"),n=CKEDITOR.addTemplate("panel-frame-inner","<!DOCTYPE html><html class=\"cke_panel_container {env}\" dir=\"{dir}\" lang=\"{langCode}\"><head>{css}</head><body class=\"cke_{dir}\" style=\"margin:0;padding:0\" onload=\"{onload}\"></body></html>");
CKEDITOR.ui.panel.prototype={render:function(i,o){
this.getHolderElement=function(){
var e=this._.holder;
if(!e){
if(this.isFramed){
var t=this.document.getById(this.id+"_frame"),i=t.getParent(),o=t.getFrameDocument();
CKEDITOR.env.iOS&&i.setStyles({overflow:"scroll","-webkit-overflow-scrolling":"touch"});
var r=CKEDITOR.tools.addFunction(CKEDITOR.tools.bind(function(){
this.isLoaded=!0,this.onLoad&&this.onLoad();
},this));
o.write(n.output(CKEDITOR.tools.extend({css:CKEDITOR.tools.buildStyleHtml(this.css),onload:"window.parent.CKEDITOR.tools.callFunction("+r+");"},a)));
var s=o.getWindow();
s.$.CKEDITOR=CKEDITOR,o.on("keydown",function(e){
var t=e.data.getKeystroke(),n=this.document.getById(this.id).getAttribute("dir");
return this._.onKeyDown&&this._.onKeyDown(t)===!1?void e.data.preventDefault():void ((27==t||t==("rtl"==n?39:37))&&this.onEscape&&this.onEscape(t)===!1&&e.data.preventDefault());
},this),e=o.getBody(),e.unselectable(),CKEDITOR.env.air&&CKEDITOR.tools.callFunction(r);
}else{
e=this.document.getById(this.id);
}
this._.holder=e;
}
return e;
};
var a={editorId:i.id,id:this.id,langCode:i.langCode,dir:i.lang.dir,cls:this.className,frame:"",env:CKEDITOR.env.cssClass,"z-index":i.config.baseFloatZIndex+1};
if(this.isFramed){
var r=CKEDITOR.env.air?"javascript:void(0)":CKEDITOR.env.ie?"javascript:void(function(){"+encodeURIComponent("document.open();("+CKEDITOR.tools.fixDomain+")();document.close();")+"}())":"";
a.frame=t.output({id:this.id+"_frame",src:r});
}
var s=e.output(a);
return o&&o.push(s),s;
},addBlock:function(e,t){
return t=this._.blocks[e]=t instanceof CKEDITOR.ui.panel.block?t:new CKEDITOR.ui.panel.block(this.getHolderElement(),t),this._.currentBlock||this.showBlock(e),t;
},getBlock:function(e){
return this._.blocks[e];
},showBlock:function(e){
var t=this._.blocks,n=t[e],i=this._.currentBlock,o=!this.forceIFrame||CKEDITOR.env.ie?this._.holder:this.document.getById(this.id+"_frame");
return i&&i.hide(),this._.currentBlock=n,CKEDITOR.fire("ariaWidget",o),n._.focusIndex=-1,this._.onKeyDown=n.onKeyDown&&CKEDITOR.tools.bind(n.onKeyDown,n),n.show(),n;
},destroy:function(){
this.element&&this.element.remove();
}},CKEDITOR.ui.panel.block=CKEDITOR.tools.createClass({$:function(e,t){
this.element=e.append(e.getDocument().createElement("div",{attributes:{tabindex:-1,"class":"cke_panel_block"},styles:{display:"none"}})),t&&CKEDITOR.tools.extend(this,t),this.element.setAttributes({role:this.attributes.role||"presentation","aria-label":this.attributes["aria-label"],title:this.attributes.title||this.attributes["aria-label"]}),this.keys={},this._.focusIndex=-1,this.element.disableContextMenu();
},_:{markItem:function(e){
if(-1!=e){
var t=this.element.getElementsByTag("a"),n=t.getItem(this._.focusIndex=e);
CKEDITOR.env.webkit&&n.getDocument().getWindow().focus(),n.focus(),this.onMark&&this.onMark(n);
}
}},proto:{show:function(){
this.element.setStyle("display","");
},hide:function(){
this.onHide&&this.onHide.call(this)===!0||this.element.setStyle("display","none");
},onKeyDown:function(e,t){
var n=this.keys[e];
switch(n){
case "next":
for(var i,o=this._.focusIndex,a=this.element.getElementsByTag("a");i=a.getItem(++o);){
if(i.getAttribute("_cke_focus")&&i.$.offsetWidth){
this._.focusIndex=o,i.focus();
break;
}
}
return i||t?!1:(this._.focusIndex=-1,this.onKeyDown(e,1));
case "prev":
for(o=this._.focusIndex,a=this.element.getElementsByTag("a");o>0&&(i=a.getItem(--o));){
if(i.getAttribute("_cke_focus")&&i.$.offsetWidth){
this._.focusIndex=o,i.focus();
break;
}
i=null;
}
return i||t?!1:(this._.focusIndex=a.count(),this.onKeyDown(e,1));
case "click":
case "mouseup":
return o=this._.focusIndex,i=o>=0&&this.element.getElementsByTag("a").getItem(o),i&&(i.$[n]?i.$[n]():i.$["on"+n]()),!1;
}
return !0;
}}});
}(),CKEDITOR.plugins.add("floatpanel",{requires:"panel"}),function(){
function e(e,n,i,o,a){
var r=CKEDITOR.tools.genKey(n.getUniqueId(),i.getUniqueId(),e.lang.dir,e.uiColor||"",o.css||"",a||""),s=t[r];
return s||(s=t[r]=new CKEDITOR.ui.panel(n,o),s.element=i.append(CKEDITOR.dom.element.createFromHtml(s.render(e),n)),s.element.setStyles({display:"none",position:"absolute"})),s;
};
var t={};
CKEDITOR.ui.floatPanel=CKEDITOR.tools.createClass({$:function(t,n,i,o){
function a(){
c.hide();
};
i.forceIFrame=1,i.toolbarRelated&&t.elementMode==CKEDITOR.ELEMENT_MODE_INLINE&&(n=CKEDITOR.document.getById("cke_"+t.name));
var r=n.getDocument(),s=e(t,r,n,i,o||0),l=s.element,d=l.getFirst(),c=this;
l.disableContextMenu(),this.element=l,this._={editor:t,panel:s,parentElement:n,definition:i,document:r,iframe:d,children:[],dir:t.lang.dir,showBlockParams:null},t.on("mode",a),t.on("resize",a),r.getWindow().on("resize",function(){
this.reposition();
},this);
},proto:{addBlock:function(e,t){
return this._.panel.addBlock(e,t);
},addListBlock:function(e,t,n){
return this._.panel.addListBlock(e,t,n);
},getBlock:function(e){
return this._.panel.getBlock(e);
},showBlock:function(e,t,n,i,o,a){
var r=this._.panel,s=r.showBlock(e);
this._.showBlockParams=[].slice.call(arguments),this.allowBlur(!1);
var l=this._.editor.editable();
this._.returnFocus=l.hasFocus?l:new CKEDITOR.dom.element(CKEDITOR.document.$.activeElement),this._.hideTimeout=0;
var d=this.element,c=this._.iframe,u=CKEDITOR.env.ie&&!CKEDITOR.env.edge?c:new CKEDITOR.dom.window(c.$.contentWindow),h=d.getDocument(),f=this._.parentElement.getPositionedAncestor(),m=t.getDocumentPosition(h),g=f?f.getDocumentPosition(h):{x:0,y:0},p="rtl"==this._.dir,E=m.x+(i||0)-g.x,T=m.y+(o||0)-g.y;
!p||1!=n&&4!=n?p||2!=n&&3!=n||(E+=t.$.offsetWidth-1):E+=t.$.offsetWidth,(3==n||4==n)&&(T+=t.$.offsetHeight-1),this._.panel._.offsetParentId=t.getId(),d.setStyles({top:T+"px",left:0,display:""}),d.setOpacity(0),d.getFirst().removeStyle("width"),this._.editor.focusManager.add(u),this._.blurSet||(CKEDITOR.event.useCapture=!0,u.on("blur",function(e){
function t(){
delete this._.returnFocus,this.hide();
};
this.allowBlur()&&e.data.getPhase()==CKEDITOR.EVENT_PHASE_AT_TARGET&&this.visible&&!this._.activeChild&&(CKEDITOR.env.iOS?this._.hideTimeout||(this._.hideTimeout=CKEDITOR.tools.setTimeout(t,0,this)):t.call(this));
},this),u.on("focus",function(){
this._.focused=!0,this.hideChild(),this.allowBlur(!0);
},this),CKEDITOR.env.iOS&&(u.on("touchstart",function(){
clearTimeout(this._.hideTimeout);
},this),u.on("touchend",function(){
this._.hideTimeout=0,this.focus();
},this)),CKEDITOR.event.useCapture=!1,this._.blurSet=1),r.onEscape=CKEDITOR.tools.bind(function(e){
return this.onEscape&&this.onEscape(e)===!1?!1:void 0;
},this),CKEDITOR.tools.setTimeout(function(){
var e=CKEDITOR.tools.bind(function(){
var e=d;
if(e.removeStyle("width"),s.autoSize){
var t=s.element.getDocument(),n=(CKEDITOR.env.webkit||CKEDITOR.env.edge?s.element:t.getBody()).$.scrollWidth;
!CKEDITOR.env.edge&&CKEDITOR.env.ie&&CKEDITOR.env.quirks&&n>0&&(n+=(e.$.offsetWidth||0)-(e.$.clientWidth||0)+3),n+=10,e.setStyle("width",n+"px");
var i=s.element.$.scrollHeight;
CKEDITOR.env.ie&&CKEDITOR.env.quirks&&i>0&&(i+=(e.$.offsetHeight||0)-(e.$.clientHeight||0)+3),e.setStyle("height",i+"px"),r._.currentBlock.element.setStyle("display","none").removeStyle("display");
}else{
e.removeStyle("height");
}
p&&(E-=d.$.offsetWidth),d.setStyle("left",E+"px");
var o=r.element,l=o.getWindow(),c=d.$.getBoundingClientRect(),u=l.getViewPaneSize(),h=c.width||c.right-c.left,f=c.height||c.bottom-c.top,m=p?c.right:u.width-c.left,g=p?u.width-c.right:c.left;
p?h>m&&(g>h?E+=h:u.width>h?E-=c.left:E=E-c.right+u.width):h>m&&(g>h?E-=h:u.width>h?E=E-c.right+u.width:E-=c.left);
var C=u.height-c.top,v=c.top;
if(f>C&&(v>f?T-=f:u.height>f?T=T-c.bottom+u.height:T-=c.top),CKEDITOR.env.ie){
var I=new CKEDITOR.dom.element(d.$.offsetParent),O=I;
"html"==O.getName()&&(O=O.getDocument().getBody()),"rtl"==O.getComputedStyle("direction")&&(E-=CKEDITOR.env.ie8Compat?2*d.getDocument().getDocumentElement().$.scrollLeft:I.$.scrollWidth-I.$.clientWidth);
}
var D,b=d.getFirst();
(D=b.getCustomData("activePanel"))&&D.onHide&&D.onHide.call(this,1),b.setCustomData("activePanel",this),d.setStyles({top:T+"px",left:E+"px"}),d.setOpacity(1),a&&a();
},this);
r.isLoaded?e():r.onLoad=e,CKEDITOR.tools.setTimeout(function(){
var e=CKEDITOR.env.webkit&&CKEDITOR.document.getWindow().getScrollPosition().y;
this.focus(),s.element.focus(),CKEDITOR.env.webkit&&(CKEDITOR.document.getBody().$.scrollTop=e),this.allowBlur(!0),this._.editor.fire("panelShow",this);
},0,this);
},CKEDITOR.env.air?200:0,this),this.visible=1,this.onShow&&this.onShow.call(this);
},reposition:function(){
var e=this._.showBlockParams;
this.visible&&this._.showBlockParams&&(this.hide(),this.showBlock.apply(this,e));
},focus:function(){
if(CKEDITOR.env.webkit){
var e=CKEDITOR.document.getActive();
e&&!e.equals(this._.iframe)&&e.$.blur();
}
var t=this._.lastFocused||this._.iframe.getFrameDocument().getWindow();
t.focus();
},blur:function(){
var e=this._.iframe.getFrameDocument(),t=e.getActive();
t&&t.is("a")&&(this._.lastFocused=t);
},hide:function(e){
if(this.visible&&(!this.onHide||this.onHide.call(this)!==!0)){
this.hideChild(),CKEDITOR.env.gecko&&this._.iframe.getFrameDocument().$.activeElement.blur(),this.element.setStyle("display","none"),this.visible=0,this.element.getFirst().removeCustomData("activePanel");
var t=e&&this._.returnFocus;
t&&(CKEDITOR.env.webkit&&t.type&&t.getWindow().$.focus(),t.focus()),delete this._.lastFocused,this._.showBlockParams=null,this._.editor.fire("panelHide",this);
}
},allowBlur:function(e){
var t=this._.panel;
return void 0!==e&&(t.allowBlur=e),t.allowBlur;
},showAsChild:function(e,t,n,i,o,a){
(this._.activeChild!=e||e._.panel._.offsetParentId!=n.getId())&&(this.hideChild(),e.onHide=CKEDITOR.tools.bind(function(){
CKEDITOR.tools.setTimeout(function(){
this._.focused||this.hide();
},0,this);
},this),this._.activeChild=e,this._.focused=!1,e.showBlock(t,n,i,o,a),this.blur(),(CKEDITOR.env.ie7Compat||CKEDITOR.env.ie6Compat)&&setTimeout(function(){
e.element.getChild(0).$.style.cssText+="";
},100));
},hideChild:function(e){
var t=this._.activeChild;
t&&(delete t.onHide,delete this._.activeChild,t.hide(),e&&this.focus());
}}}),CKEDITOR.on("instanceDestroyed",function(){
var e=CKEDITOR.tools.isEmpty(CKEDITOR.instances);
for(var n in t){
var i=t[n];
e?i.destroy():i.element.hide();
}
e&&(t={});
});
}(),CKEDITOR.plugins.add("colorbutton",{requires:"panelbutton,floatpanel",init:function(e){
function t(t,i,r,s){
var l=new CKEDITOR.style(o["colorButton_"+i+"Style"]),d=CKEDITOR.tools.getNextId()+"_colorBox";
e.ui.add(t,CKEDITOR.UI_PANELBUTTON,{label:r,title:r,modes:{wysiwyg:1},editorFocus:0,toolbar:"colors,"+s,allowedContent:l,requiredContent:l,panel:{css:CKEDITOR.skin.getPath("editor"),attributes:{role:"listbox","aria-label":a.panelTitle}},onBlock:function(t,o){
o.autoSize=!0,o.element.addClass("cke_colorblock"),o.element.setHtml(n(t,i,d)),o.element.getDocument().getBody().setStyle("overflow","hidden"),CKEDITOR.ui.fire("ready",this);
var a=o.keys,r="rtl"==e.lang.dir;
a[r?37:39]="next",a[40]="next",a[9]="next",a[r?39:37]="prev",a[38]="prev",a[CKEDITOR.SHIFT+9]="prev",a[32]="click";
},refresh:function(){
e.activeFilter.check(l)||this.setState(CKEDITOR.TRISTATE_DISABLED);
},onOpen:function(){
var t,n=e.getSelection(),a=n&&n.getStartElement(),r=e.elementPath(a);
if(r){
a=r.block||r.blockLimit||e.document.getBody();
do{
t=a&&a.getComputedStyle("back"==i?"background-color":"color")||"transparent";
}while("back"==i&&"transparent"==t&&a&&(a=a.getParent()));
return t&&"transparent"!=t||(t="#ffffff"),o.colorButton_enableAutomatic!==!1&&this._.panel._.iframe.getFrameDocument().getById(d).setStyle("background-color",t),t;
}
}});
};
function n(t,n,r){
var s=[],l=o.colorButton_colors.split(","),d=e.plugins.colordialog&&o.colorButton_enableMore!==!1,c=l.length+(d?2:1),u=CKEDITOR.tools.addFunction(function(n,a){
function r(e){
this.removeListener("ok",r),this.removeListener("cancel",r),"ok"==e.name&&s(this.getContentElement("picker","selectedColor").getValue(),a);
};
var s=arguments.callee;
if("?"==n){
return void e.openDialog("colordialog",function(){
this.on("ok",r),this.on("cancel",r);
});
}
if(e.focus(),t.hide(),e.fire("saveSnapshot"),e.removeStyle(new CKEDITOR.style(o["colorButton_"+a+"Style"],{color:"inherit"})),n){
var l=o["colorButton_"+a+"Style"];
l.childRule="back"==a?function(e){
return i(e);
}:function(e){
return !(e.is("a")||e.getElementsByTag("a").count())||i(e);
},e.applyStyle(new CKEDITOR.style(l,{color:n}));
}
e.fire("saveSnapshot");
});
o.colorButton_enableAutomatic!==!1&&s.push("<a class=\"cke_colorauto\" _cke_focus=1 hidefocus=true title=\"",a.auto,"\" onclick=\"CKEDITOR.tools.callFunction(",u,",null,'",n,"');return false;\" href=\"javascript:void('",a.auto,"')\" role=\"option\" aria-posinset=\"1\" aria-setsize=\"",c,"\"><table role=\"presentation\" cellspacing=0 cellpadding=0 width=\"100%\"><tr><td><span class=\"cke_colorbox\" id=\"",r,"\"></span></td><td colspan=7 align=center>",a.auto,"</td></tr></table></a>"),s.push("<table role=\"presentation\" cellspacing=0 cellpadding=0 width=\"100%\">");
for(var h=0;h<l.length;h++){
h%8===0&&s.push("</tr><tr>");
var f=l[h].split("/"),m=f[0],g=f[1]||m;
f[1]||(m="#"+m.replace(/^(.)(.)(.)$/,"$1$1$2$2$3$3"));
var p=e.lang.colorbutton.colors[g]||g;
s.push("<td><a class=\"cke_colorbox\" _cke_focus=1 hidefocus=true title=\"",p,"\" onclick=\"CKEDITOR.tools.callFunction(",u,",'",m,"','",n,"'); return false;\" href=\"javascript:void('",p,"')\" role=\"option\" aria-posinset=\"",h+2,"\" aria-setsize=\"",c,"\"><span class=\"cke_colorbox\" style=\"background-color:#",g,"\"></span></a></td>");
}
return d&&s.push("</tr><tr><td colspan=8 align=center><a class=\"cke_colormore\" _cke_focus=1 hidefocus=true title=\"",a.more,"\" onclick=\"CKEDITOR.tools.callFunction(",u,",'?','",n,"');return false;\" href=\"javascript:void('",a.more,"')\""," role=\"option\" aria-posinset=\"",c,"\" aria-setsize=\"",c,"\">",a.more,"</a></td>"),s.push("</tr></table>"),s.join("");
};
function i(e){
return "false"==e.getAttribute("contentEditable")||e.getAttribute("data-nostyle");
};
var o=e.config,a=e.lang.colorbutton;
CKEDITOR.env.hc||(t("TextColor","fore",a.textColorTitle,10),t("BGColor","back",a.bgColorTitle,20));
}}),CKEDITOR.config.colorButton_colors="000,800000,8B4513,2F4F4F,008080,000080,4B0082,696969,B22222,A52A2A,DAA520,006400,40E0D0,0000CD,800080,808080,F00,FF8C00,FFD700,008000,0FF,00F,EE82EE,A9A9A9,FFA07A,FFA500,FFFF00,00FF00,AFEEEE,ADD8E6,DDA0DD,D3D3D3,FFF0F5,FAEBD7,FFFFE0,F0FFF0,F0FFFF,F0F8FF,E6E6FA,FFF",CKEDITOR.config.colorButton_foreStyle={element:"span",styles:{color:"#(color)"},overrides:[{element:"font",attributes:{color:null}}]},CKEDITOR.config.colorButton_backStyle={element:"span",styles:{"background-color":"#(color)"}},CKEDITOR.plugins.colordialog={requires:"dialog",init:function(e){
var t=new CKEDITOR.dialogCommand("colordialog");
t.editorFocus=!1,e.addCommand("colordialog",t),CKEDITOR.dialog.add("colordialog",this.path+"dialogs/colordialog.js"),e.getColorFromDialog=function(t,n){
var i=function(e){
o(this);
var i="ok"==e.name?this.getValueOf("picker","selectedColor"):null;
t.call(n,i);
},o=function(e){
e.removeListener("ok",i),e.removeListener("cancel",i);
},a=function(e){
e.on("ok",i),e.on("cancel",i);
};
e.execCommand("colordialog"),e._.storedDialogs&&e._.storedDialogs.colordialog?a(e._.storedDialogs.colordialog):CKEDITOR.on("dialogDefinition",function(e){
if("colordialog"==e.data.name){
var t=e.data.definition;
e.removeListener(),t.onLoad=CKEDITOR.tools.override(t.onLoad,function(e){
return function(){
a(this),t.onLoad=e,"function"==typeof e&&e.call(this);
};
});
}
});
};
}},CKEDITOR.plugins.add("colordialog",CKEDITOR.plugins.colordialog),CKEDITOR.plugins.add("menu",{requires:"floatpanel",beforeInit:function(e){
for(var t=e.config.menu_groups.split(","),n=e._.menuGroups={},i=e._.menuItems={},o=0;o<t.length;o++){
n[t[o]]=o+1;
}
e.addMenuGroup=function(e,t){
n[e]=t||100;
},e.addMenuItem=function(e,t){
n[t.group]&&(i[e]=new CKEDITOR.menuItem(this,e,t));
},e.addMenuItems=function(e){
for(var t in e){
this.addMenuItem(t,e[t]);
}
},e.getMenuItem=function(e){
return i[e];
},e.removeMenuItem=function(e){
delete i[e];
};
}}),function(){
function e(e){
e.sort(function(e,t){
return e.group<t.group?-1:e.group>t.group?1:e.order<t.order?-1:e.order>t.order?1:0;
});
};
var t="<span class=\"cke_menuitem\"><a id=\"{id}\" class=\"cke_menubutton cke_menubutton__{name} cke_menubutton_{state} {cls}\" href=\"{href}\" title=\"{title}\" tabindex=\"-1\"_cke_focus=1 hidefocus=\"true\" role=\"{role}\" aria-haspopup=\"{hasPopup}\" aria-disabled=\"{disabled}\" {ariaChecked}";
CKEDITOR.env.gecko&&CKEDITOR.env.mac&&(t+=" onkeypress=\"return false;\""),CKEDITOR.env.gecko&&(t+=" onblur=\"this.style.cssText = this.style.cssText;\""),t+=" onmouseover=\"CKEDITOR.tools.callFunction({hoverFn},{index});\" onmouseout=\"CKEDITOR.tools.callFunction({moveOutFn},{index});\" "+(CKEDITOR.env.ie?"onclick=\"return false;\" onmouseup":"onclick")+"=\"CKEDITOR.tools.callFunction({clickFn},{index}); return false;\">",t+="<span class=\"cke_menubutton_inner\"><span class=\"cke_menubutton_icon\"><span class=\"cke_button_icon cke_button__{iconName}_icon\" style=\"{iconStyle}\"></span></span><span class=\"cke_menubutton_label\">{label}</span>{arrowHtml}</span></a></span>";
var n="<span class=\"cke_menuarrow\"><span>{label}</span></span>",i=CKEDITOR.addTemplate("menuItem",t),o=CKEDITOR.addTemplate("menuArrow",n);
CKEDITOR.menu=CKEDITOR.tools.createClass({$:function(e,t){
t=this._.definition=t||{},this.id=CKEDITOR.tools.getNextId(),this.editor=e,this.items=[],this._.listeners=[],this._.level=t.level||1;
var n=CKEDITOR.tools.extend({},t.panel,{css:[CKEDITOR.skin.getPath("editor")],level:this._.level-1,block:{}}),i=n.block.attributes=n.attributes||{};
!i.role&&(i.role="menu"),this._.panelDefinition=n;
},_:{onShow:function(){
var e=this.editor.getSelection(),t=e&&e.getStartElement(),n=this.editor.elementPath(),i=this._.listeners;
this.removeAll();
for(var o=0;o<i.length;o++){
var a=i[o](t,e,n);
if(a){
for(var r in a){
var s=this.editor.getMenuItem(r);
!s||s.command&&!this.editor.getCommand(s.command).state||(s.state=a[r],this.add(s));
}
}
}
},onClick:function(e){
this.hide(),e.onClick?e.onClick():e.command&&this.editor.execCommand(e.command);
},onEscape:function(e){
var t=this.parent;
return t?t._.panel.hideChild(1):27==e&&this.hide(1),!1;
},onHide:function(){
this.onHide&&this.onHide();
},showSubMenu:function(e){
var t=this._.subMenu,n=this.items[e],i=n.getItems&&n.getItems();
if(!i){
return void this._.panel.hideChild(1);
}
t?t.removeAll():(t=this._.subMenu=new CKEDITOR.menu(this.editor,CKEDITOR.tools.extend({},this._.definition,{level:this._.level+1},!0)),t.parent=this,t._.onClick=CKEDITOR.tools.bind(this._.onClick,this));
for(var o in i){
var a=this.editor.getMenuItem(o);
a&&(a.state=i[o],t.add(a));
}
var r=this._.panel.getBlock(this.id).element.getDocument().getById(this.id+String(e));
setTimeout(function(){
t.show(r,2);
},0);
}},proto:{add:function(e){
e.order||(e.order=this.items.length),this.items.push(e);
},removeAll:function(){
this.items=[];
},show:function(t,n,i,o){
if(this.parent||(this._.onShow(),this.items.length)){
n=n||("rtl"==this.editor.lang.dir?2:1);
var a=this.items,r=this.editor,s=this._.panel,l=this._.element;
if(!s){
s=this._.panel=new CKEDITOR.ui.floatPanel(this.editor,CKEDITOR.document.getBody(),this._.panelDefinition,this._.level),s.onEscape=CKEDITOR.tools.bind(function(e){
return this._.onEscape(e)===!1?!1:void 0;
},this),s.onShow=function(){
var e=s._.panel.getHolderElement();
e.getParent().addClass("cke").addClass("cke_reset_all");
},s.onHide=CKEDITOR.tools.bind(function(){
this._.onHide&&this._.onHide();
},this);
var d=s.addBlock(this.id,this._.panelDefinition.block);
d.autoSize=!0;
var c=d.keys;
c[40]="next",c[9]="next",c[38]="prev",c[CKEDITOR.SHIFT+9]="prev",c["rtl"==r.lang.dir?37:39]=CKEDITOR.env.ie?"mouseup":"click",c[32]=CKEDITOR.env.ie?"mouseup":"click",CKEDITOR.env.ie&&(c[13]="mouseup"),l=this._.element=d.element;
var u=l.getDocument();
u.getBody().setStyle("overflow","hidden"),u.getElementsByTag("html").getItem(0).setStyle("overflow","hidden"),this._.itemOverFn=CKEDITOR.tools.addFunction(function(e){
clearTimeout(this._.showSubTimeout),this._.showSubTimeout=CKEDITOR.tools.setTimeout(this._.showSubMenu,r.config.menu_subMenuDelay||400,this,[e]);
},this),this._.itemOutFn=CKEDITOR.tools.addFunction(function(){
clearTimeout(this._.showSubTimeout);
},this),this._.itemClickFn=CKEDITOR.tools.addFunction(function(e){
var t=this.items[e];
return t.state==CKEDITOR.TRISTATE_DISABLED?void this.hide(1):void (t.getItems?this._.showSubMenu(e):this._.onClick(t));
},this);
}
e(a);
for(var h=r.elementPath(),f=h&&h.direction()!=r.lang.dir?" cke_mixed_dir_content":"",m=["<div class=\"cke_menu"+f+"\" role=\"presentation\">"],g=a.length,p=g&&a[0].group,E=0;g>E;E++){
var T=a[E];
p!=T.group&&(m.push("<div class=\"cke_menuseparator\" role=\"separator\"></div>"),p=T.group),T.render(this,E,m);
}
m.push("</div>"),l.setHtml(m.join("")),CKEDITOR.ui.fire("ready",this),this.parent?this.parent._.panel.showAsChild(s,this.id,t,n,i,o):s.showBlock(this.id,t,n,i,o),r.fire("menuShow",[s]);
}
},addListener:function(e){
this._.listeners.push(e);
},hide:function(e){
this._.onHide&&this._.onHide(),this._.panel&&this._.panel.hide(e);
}}}),CKEDITOR.menuItem=CKEDITOR.tools.createClass({$:function(e,t,n){
CKEDITOR.tools.extend(this,n,{order:0,className:"cke_menubutton__"+t}),this.group=e._.menuGroups[this.group],this.editor=e,this.name=t;
},proto:{render:function(e,t,n){
var a=e.id+String(t),r="undefined"==typeof this.state?CKEDITOR.TRISTATE_OFF:this.state,s="",l=r==CKEDITOR.TRISTATE_ON?"on":r==CKEDITOR.TRISTATE_DISABLED?"disabled":"off";
this.role in {menuitemcheckbox:1,menuitemradio:1}&&(s=" aria-checked=\""+(r==CKEDITOR.TRISTATE_ON?"true":"false")+"\"");
var d=this.getItems,c="&#"+("rtl"==this.editor.lang.dir?"9668":"9658")+";",u=this.name;
this.icon&&!/\./.test(this.icon)&&(u=this.icon);
var h={id:a,name:this.name,iconName:u,label:this.label,cls:this.className||"",state:l,hasPopup:d?"true":"false",disabled:r==CKEDITOR.TRISTATE_DISABLED,title:this.label,href:"javascript:void('"+(this.label||"").replace("'")+"')",hoverFn:e._.itemOverFn,moveOutFn:e._.itemOutFn,clickFn:e._.itemClickFn,index:t,iconStyle:CKEDITOR.skin.getIconStyle(u,"rtl"==this.editor.lang.dir,u==this.icon?null:this.icon,this.iconOffset),arrowHtml:d?o.output({label:c}):"",role:this.role?this.role:"menuitem",ariaChecked:s};
i.output(h,n);
}}});
}(),CKEDITOR.config.menu_groups="clipboard,form,tablecell,tablecellproperties,tablerow,tablecolumn,table,anchor,link,image,flash,checkbox,radio,textfield,hiddenfield,imagebutton,button,select,textarea,div",CKEDITOR.plugins.add("contextmenu",{requires:"menu",onLoad:function(){
CKEDITOR.plugins.contextMenu=CKEDITOR.tools.createClass({base:CKEDITOR.menu,$:function(e){
this.base.call(this,e,{panel:{className:"cke_menu_panel",attributes:{"aria-label":e.lang.contextmenu.options}}});
},proto:{addTarget:function(e,t){
if(e.on("contextmenu",function(e){
var i=e.data,o=CKEDITOR.env.webkit?n:CKEDITOR.env.mac?i.$.metaKey:i.$.ctrlKey;
if(!t||!o){
if(i.preventDefault(),CKEDITOR.env.mac&&CKEDITOR.env.webkit){
var a=this.editor,r=new CKEDITOR.dom.elementPath(i.getTarget(),a.editable()).contains(function(e){
return e.hasAttribute("contenteditable");
},!0);
r&&"false"==r.getAttribute("contenteditable")&&a.getSelection().fake(r);
}
var s=i.getTarget().getDocument(),l=i.getTarget().getDocument().getDocumentElement(),d=!s.equals(CKEDITOR.document),c=s.getWindow().getScrollPosition(),u=d?i.$.clientX:i.$.pageX||c.x+i.$.clientX,h=d?i.$.clientY:i.$.pageY||c.y+i.$.clientY;
CKEDITOR.tools.setTimeout(function(){
this.open(l,null,u,h);
},CKEDITOR.env.ie?200:0,this);
}
},this),CKEDITOR.env.webkit){
var n,i=function(e){
n=CKEDITOR.env.mac?e.data.$.metaKey:e.data.$.ctrlKey;
},o=function(){
n=0;
};
e.on("keydown",i),e.on("keyup",o),e.on("contextmenu",o);
}
},open:function(e,t,n,i){
this.editor.focus(),e=e||CKEDITOR.document.getDocumentElement(),this.editor.selectionChange(1),this.show(e,t,n,i);
}}});
},beforeInit:function(e){
var t=e.contextMenu=new CKEDITOR.plugins.contextMenu(e);
e.on("contentDom",function(){
t.addTarget(e.editable(),e.config.browserContextMenuOnCtrl!==!1);
}),e.addCommand("contextMenu",{exec:function(){
e.contextMenu.open(e.document.getBody());
}}),e.setKeystroke(CKEDITOR.SHIFT+121,"contextMenu"),e.setKeystroke(CKEDITOR.CTRL+CKEDITOR.SHIFT+121,"contextMenu");
}}),function(){
"use strict";
function e(e){
var t=e.data.$;
return CKEDITOR.env.ie&&CKEDITOR.env.version<9?1===t.button:0===t.button;
};
function t(e,t,n,i){
var o,a=new CKEDITOR.dom.walker(e);
if(!(o=e.startContainer.getAscendant(t,!0)||e.endContainer.getAscendant(t,!0))||(n(o),!i)){
for(;o=a.next();){
if(o=o.getAscendant(t,!0),o&&(n(o),i)){
return;
}
}
}
};
function n(e,t){
var n={ul:"ol",ol:"ul"};
return -1!==i(t,function(t){
return t.element===e||t.element===n[e];
});
};
var i=CKEDITOR.tools.indexOf;
CKEDITOR.plugins.add("copyformatting",{lang:"en",icons:"copyformatting",hidpi:!0,onLoad:function(){
var e=CKEDITOR.document,t="<div class=\"cke_screen_reader_only cke_copyformatting_notification\"><div aria-live=\"polite\"></div></div>";
e.appendStyleSheet(this.path+"styles/copyformatting.css"),e.getBody().append(CKEDITOR.dom.element.createFromHtml(t));
},init:function(t){
var o=CKEDITOR.plugins.copyformatting;
t.addContentsCss&&t.addContentsCss(this.path+"styles/copyformatting.css"),t.copyFormatting={styles:null,sticky:!1,editor:t,filter:new CKEDITOR.filter(t.config.copyFormatting_allowRules),_isContextAllowed:function(e){
var t=this.editor.config.copyFormatting_allowedContexts;
return t===!0||-1!==i(t,e);
}},t.config.copyFormatting_allowRules===!0&&(t.copyFormatting.filter.disabled=!0),CKEDITOR.event.implementOn(t.copyFormatting),t.config.copyFormatting_disallowRules&&t.copyFormatting.filter.disallow(t.config.copyFormatting_disallowRules),t.addCommand("copyFormatting",o.commands.copyFormatting),t.addCommand("applyFormatting",o.commands.applyFormatting),t.ui.addButton("CopyFormatting",{label:t.lang.copyformatting.label,command:"copyFormatting",toolbar:"cleanup,0"}),t.on("contentDom",function(){
var n,i=t.editable(),o=t.elementMode===CKEDITOR.ELEMENT_MODE_INLINE?i:t.document,a=t.ui.get("CopyFormatting");
i.attachListener(o,"mouseup",function(n){
e(n)&&t.execCommand("applyFormatting");
}),i.attachListener(CKEDITOR.document,"mouseup",function(n){
var o=t.getCommand("copyFormatting");
e(n)&&o.state===CKEDITOR.TRISTATE_ON&&!i.contains(n.data.getTarget())&&t.execCommand("copyFormatting");
}),a&&(n=CKEDITOR.document.getById(a._.id),i.attachListener(n,"dblclick",function(){
t.execCommand("copyFormatting",{sticky:!0});
}),i.attachListener(n,"mouseup",function(e){
e.data.stopPropagation();
}));
}),t.config.copyFormatting_keystrokeCopy&&t.setKeystroke(t.config.copyFormatting_keystrokeCopy,"copyFormatting"),t.config.copyFormatting_keystrokePaste&&t.setKeystroke(t.config.copyFormatting_keystrokePaste,"applyFormatting"),t.on("key",function(e){
var n=t.getCommand("copyFormatting");
27===e.data.domEvent.getKeystroke()&&n.state===CKEDITOR.TRISTATE_ON&&t.execCommand("copyFormatting");
}),t.copyFormatting.on("extractFormatting",function(e){
var n,i,a=e.data.element;
return a.contains(t.editable())||a.equals(t.editable())?e.cancel():(n=o._convertElementToStyleDef(a),i=CKEDITOR.tools.clone(n),i&&CKEDITOR.tools.isEmpty(i.styles)&&delete i.styles,t.copyFormatting.filter.check(new CKEDITOR.style(i),!0,!0)?void (e.data.styleDef=n):e.cancel());
}),t.copyFormatting.on("applyFormatting",function(e){
if(!e.data.preventFormatStripping){
var a,r,s,l=e.data.range,d=o._extractStylesFromRange(t,l),c=o._determineContext(l);
if(t.copyFormatting._isContextAllowed(c)){
for(s=0;s<d.length;s++){
a=d[s],r=l.createBookmark(),-1===i(o.preservedElements,a.element)?CKEDITOR.env.webkit&&!CKEDITOR.env.chrome?d[s].removeFromRange(e.data.range,e.editor):d[s].remove(e.editor):n(a.element,e.data.styles)&&o._removeStylesFromElementInRange(l,a.element),l.moveToBookmark(r);
}
}
}
}),t.copyFormatting.on("applyFormatting",function(e){
var n=CKEDITOR.plugins.copyformatting,i=n._determineContext(e.data.range);
"list"===i&&t.copyFormatting._isContextAllowed("list")?n._applyStylesToListContext(e.editor,e.data.range,e.data.styles):"table"===i&&t.copyFormatting._isContextAllowed("table")?n._applyStylesToTableContext(e.editor,e.data.range,e.data.styles):t.copyFormatting._isContextAllowed("text")&&n._applyStylesToTextContext(e.editor,e.data.range,e.data.styles);
},null,null,999);
}}),CKEDITOR.plugins.copyformatting={inlineBoundary:["h1","h2","h3","h4","h5","h6","p","div"],excludedAttributes:["id","style","href","data-cke-saved-href","dir"],elementsForInlineTransform:["li"],excludedElementsFromInlineTransform:["table","thead","tbody","ul","ol"],excludedAttributesFromInlineTransform:["value","type"],preservedElements:["ul","ol","li","td","th","tr","thead","tbody","table"],breakOnElements:["ul","ol","table"],commands:{copyFormatting:{exec:function(e,t){
var n=this,i=CKEDITOR.plugins.copyformatting,o=e.copyFormatting,a=t?"keystrokeHandler"==t.from:!1,r=t?t.sticky||a:!1,s=i._getCursorContainer(e),l=CKEDITOR.document.getDocumentElement();
return n.state===CKEDITOR.TRISTATE_ON?(o.styles=null,o.sticky=!1,s.removeClass("cke_copyformatting_active"),l.removeClass("cke_copyformatting_disabled"),l.removeClass("cke_copyformatting_tableresize_cursor"),i._putScreenReaderMessage(e,"canceled"),n.setState(CKEDITOR.TRISTATE_OFF)):(o.styles=i._extractStylesFromElement(e,e.elementPath().lastElement),n.setState(CKEDITOR.TRISTATE_ON),a||(s.addClass("cke_copyformatting_active"),l.addClass("cke_copyformatting_tableresize_cursor"),e.config.copyFormatting_outerCursor&&l.addClass("cke_copyformatting_disabled")),o.sticky=r,void i._putScreenReaderMessage(e,"copied"));
}},applyFormatting:{exec:function(e,t){
var n,i=e.getCommand("copyFormatting"),o=t?"keystrokeHandler"==t.from:!1,a=CKEDITOR.plugins.copyformatting,r=e.copyFormatting,s=a._getCursorContainer(e),l=CKEDITOR.document.getDocumentElement();
if(o||i.state===CKEDITOR.TRISTATE_ON){
if(o&&!r.styles){
return a._putScreenReaderMessage(e,"failed");
}
n=a._applyFormat(e,r.styles),r.sticky||(r.styles=null,s.removeClass("cke_copyformatting_active"),l.removeClass("cke_copyformatting_disabled"),l.removeClass("cke_copyformatting_tableresize_cursor"),i.setState(CKEDITOR.TRISTATE_OFF)),a._putScreenReaderMessage(e,n?"applied":"canceled");
}
}}},_getCursorContainer:function(e){
return e.elementMode===CKEDITOR.ELEMENT_MODE_INLINE?e.editable():e.editable().getParent();
},_getAttributes:function(e,t){
var n={},o=e.$.attributes;
t=CKEDITOR.tools.isArray(t)?t:[];
for(var a=0;a<o.length;a++){
-1===i(t,o[a].name)&&(n[o[a].name]=o[a].value);
}
return n;
},_convertElementToStyleDef:function(e){
var t=CKEDITOR.tools,n=CKEDITOR.plugins.copyformatting._getAttributes(e,CKEDITOR.plugins.copyformatting.excludedAttributes),i=t.parseCssText(e.getAttribute("style"),!0,!0);
return {element:e.getName(),type:CKEDITOR.STYLE_INLINE,attributes:n,styles:i};
},_extractStylesFromElement:function(e,t){
var n={},o=[];
do{
if(t.type===CKEDITOR.NODE_ELEMENT&&!t.hasAttribute("data-cke-bookmark")&&(n.element=t,e.copyFormatting.fire("extractFormatting",n,e)&&n.styleDef&&o.push(new CKEDITOR.style(n.styleDef)),t.getName&&-1!==i(CKEDITOR.plugins.copyformatting.breakOnElements,t.getName()))){
break;
}
}while((t=t.getParent())&&t.type===CKEDITOR.NODE_ELEMENT);
return o;
},_extractStylesFromRange:function(e,t){
for(var n,i=[],o=new CKEDITOR.dom.walker(t);n=o.next();){
i=i.concat(CKEDITOR.plugins.copyformatting._extractStylesFromElement(e,n));
}
return i;
},_removeStylesFromElementInRange:function(e,t){
for(var n,o=-1!==i(["ol","ul","table"],t),a=new CKEDITOR.dom.walker(e);n=a.next();){
if(n=n.getAscendant(t,!0),n&&(n.removeAttributes(CKEDITOR.plugins.copyformatting._getAttributes(n)),o)){
return;
}
}
},_getSelectedWordOffset:function(e){
function t(e,t){
return e[t?"getPrevious":"getNext"](function(e){
return e.type!==CKEDITOR.NODE_COMMENT;
});
};
function n(e){
var t;
return e.type==CKEDITOR.NODE_ELEMENT?(t=e.getHtml().replace(/<span.*?>&nbsp;<\/span>/g,""),t.replace(/<.*?>/g,"")):e.getText();
};
function o(e,a){
var r,s,l,d,c=e,u=/\s/g,h=["p","br","ol","ul","li","td","div","caption","body"],f=!1,m=!1;
do{
for(r=t(c,a);!r&&c.getParent();){
if(c=c.getParent(),-1!==i(h,c.getName())){
f=!0,m=!0;
break;
}
r=t(c,a);
}
if(r&&r.getName&&-1!==i(h,r.getName())){
f=!0;
break;
}
c=r;
}while(c&&c.getStyle&&("none"==c.getStyle("display")||!c.getText()));
for(c||(c=e);c.type!==CKEDITOR.NODE_TEXT;){
c=!f||a||m?c.getChild(0):c.getChild(c.getChildCount()-1);
}
for(s=n(c);null!=(l=u.exec(s))&&(d=l.index,a);){
}
if("number"!=typeof d&&!f){
return o(c,a);
}
if(f){
a?d=0:(u=/([\.\b]*$)/,l=u.exec(s),d=l?l.index:s.length);
}else{
if(a&&(d+=1,d>s.length)){
return o(c);
}
}
return {node:c,offset:d};
};
var a,r,s,l,d,c,u,h=/\b\w+\b/gi;
for(s=l=d=e.startContainer,a=n(s);null!=(r=h.exec(a));){
if(r.index+r[0].length>=e.startOffset){
if(c=r.index,u=r.index+r[0].length,0===r.index){
var f=o(s,!0);
l=f.node,c=f.offset;
}
if(u>=a.length){
var m=o(s);
d=m.node,u=m.offset;
}
return {startNode:l,startOffset:c,endNode:d,endOffset:u};
}
}
return null;
},_filterStyles:function(e){
var t,n,i=CKEDITOR.tools.isEmpty,o=[];
for(n=0;n<e.length;n++){
t=e[n]._.definition,-1!==CKEDITOR.tools.indexOf(CKEDITOR.plugins.copyformatting.inlineBoundary,t.element)&&(t.element=e[n].element="span"),"span"===t.element&&i(t.attributes)&&i(t.styles)||o.push(e[n]);
}
return o;
},_determineContext:function(e){
function t(t){
var n,i=new CKEDITOR.dom.walker(e);
if(e.startContainer.getAscendant(t,!0)||e.endContainer.getAscendant(t,!0)){
return !0;
}
for(;n=i.next();){
if(n.getAscendant(t,!0)){
return !0;
}
}
};
return t({ul:1,ol:1})?"list":t("table")?"table":"text";
},_applyStylesToTextContext:function(e,t,n){
var o,a,r,s=CKEDITOR.plugins.copyformatting,l=s.excludedAttributesFromInlineTransform;
for(CKEDITOR.env.webkit&&!CKEDITOR.env.chrome&&e.getSelection().selectRanges([t]),a=0;a<n.length;a++){
if(o=n[a],-1===i(s.excludedElementsFromInlineTransform,o.element)){
if(-1!==i(s.elementsForInlineTransform,o.element)){
for(o.element=o._.definition.element="span",r=0;r<l.length;r++){
o._.definition.attributes[l[r]]&&delete o._.definition.attributes[l[r]];
}
}
o.apply(e);
}
}
},_applyStylesToListContext:function(e,n,i){
function o(e,t){
e.getName()!==t.element&&e.renameNode(t.element),t.applyToObject(e);
};
var a,r,s;
for(s=0;s<i.length;s++){
a=i[s],r=n.createBookmark(),"ol"===a.element||"ul"===a.element?t(n,{ul:1,ol:1},function(e){
o(e,a);
},!0):"li"===a.element?t(n,"li",function(e){
a.applyToObject(e);
}):CKEDITOR.plugins.copyformatting._applyStylesToTextContext(e,n,[a]),n.moveToBookmark(r);
}
},_applyStylesToTableContext:function(e,n,o){
function a(e,t){
e.getName()!==t.element&&(t=t.getDefinition(),t.element=e.getName(),t=new CKEDITOR.style(t)),t.applyToObject(e);
};
var r,s;
for(s=0;s<o.length;s++){
r=o[s],-1!==i(["table","tr"],r.element)?t(n,r.element,function(e){
r.applyToObject(e);
}):-1!==i(["td","th"],r.element)?t(n,{td:1,th:1},function(e){
a(e,r);
}):-1!==i(["thead","tbody"],r.element)?t(n,{thead:1,tbody:1},function(e){
a(e,r);
}):CKEDITOR.plugins.copyformatting._applyStylesToTextContext(e,n,[r]);
}
},_applyFormat:function(e,t){
var n,i,o,a=e.getSelection().getRanges()[0],r=CKEDITOR.plugins.copyformatting;
if(!a){
return !1;
}
if(a.collapsed){
if(i=e.getSelection().createBookmarks(),!(n=r._getSelectedWordOffset(a))){
return;
}
a=e.createRange(),a.setStart(n.startNode,n.startOffset),a.setEnd(n.endNode,n.endOffset),a.select();
}
return t=r._filterStyles(t),o={styles:t,range:a,preventFormatStripping:!1},e.copyFormatting.fire("applyFormatting",o,e)?(i&&e.getSelection().selectBookmarks(i),!0):!1;
},_putScreenReaderMessage:function(e,t){
var n=CKEDITOR.document.getBody().findOne(".cke_copyformatting_notification div[aria-live]");
n.setText(e.lang.copyformatting.notification[t]);
}},CKEDITOR.config.copyFormatting_outerCursor=!0,CKEDITOR.config.copyFormatting_allowRules="b s u i em strong span p div td th ol ul li(*)[*]{*}",CKEDITOR.config.copyFormatting_disallowRules="*[data-cke-widget*,data-widget*,data-cke-realelement](cke_widget*)",CKEDITOR.config.copyFormatting_allowedContexts=!0,CKEDITOR.config.copyFormatting_keystrokeCopy=CKEDITOR.CTRL+CKEDITOR.SHIFT+67,CKEDITOR.config.copyFormatting_keystrokePaste=CKEDITOR.CTRL+CKEDITOR.SHIFT+86;
}(),function(){
function e(e){
var t=this.att,n=e&&e.hasAttribute(t)&&e.getAttribute(t)||"";
void 0!==n&&this.setValue(n);
};
function t(){
for(var e,t=0;t<arguments.length;t++){
if(arguments[t] instanceof CKEDITOR.dom.element){
e=arguments[t];
break;
}
}
if(e){
var n=this.att,i=this.getValue();
i?e.setAttribute(n,i):e.removeAttribute(n,i);
}
};
var n={id:1,dir:1,classes:1,styles:1};
CKEDITOR.plugins.add("dialogadvtab",{requires:"dialog",allowedContent:function(e){
e||(e=n);
var t=[];
e.id&&t.push("id"),e.dir&&t.push("dir");
var i="";
return t.length&&(i+="["+t.join(",")+"]"),e.classes&&(i+="(*)"),e.styles&&(i+="{*}"),i;
},createAdvancedTab:function(i,o,a){
o||(o=n);
var r=i.lang.common,s={id:"advanced",label:r.advancedTab,title:r.advancedTab,elements:[{type:"vbox",padding:1,children:[]}]},l=[];
return (o.id||o.dir)&&(o.id&&l.push({id:"advId",att:"id",type:"text",requiredContent:a?a+"[id]":null,label:r.id,setup:e,commit:t}),o.dir&&l.push({id:"advLangDir",att:"dir",type:"select",requiredContent:a?a+"[dir]":null,label:r.langDir,"default":"",style:"width:100%",items:[[r.notSet,""],[r.langDirLTR,"ltr"],[r.langDirRTL,"rtl"]],setup:e,commit:t}),s.elements[0].children.push({type:"hbox",widths:["50%","50%"],children:[].concat(l)})),(o.styles||o.classes)&&(l=[],o.styles&&l.push({id:"advStyles",att:"style",type:"text",requiredContent:a?a+"{cke-xyz}":null,label:r.styles,"default":"",validate:CKEDITOR.dialog.validate.inlineStyle(r.invalidInlineStyle),onChange:function(){
},getStyle:function(e,t){
var n=this.getValue().match(new RegExp("(?:^|;)\\s*"+e+"\\s*:\\s*([^;]*)","i"));
return n?n[1]:t;
},updateStyle:function(e,t){
var n=this.getValue(),o=i.document.createElement("span");
o.setAttribute("style",n),o.setStyle(e,t),n=CKEDITOR.tools.normalizeCssText(o.getAttribute("style")),this.setValue(n,1);
},setup:e,commit:t}),o.classes&&l.push({type:"hbox",widths:["45%","55%"],children:[{id:"advCSSClasses",att:"class",type:"text",requiredContent:a?a+"(cke-xyz)":null,label:r.cssClasses,"default":"",setup:e,commit:t}]}),s.elements[0].children.push({type:"hbox",widths:["50%","50%"],children:[].concat(l)})),s;
}});
}(),function(){
CKEDITOR.plugins.add("div",{requires:"dialog",init:function(e){
if(!e.blockless){
var t=e.lang.div,n="div(*)";
CKEDITOR.dialog.isTabEnabled(e,"editdiv","advanced")&&(n+=";div[dir,id,lang,title]{*}"),e.addCommand("creatediv",new CKEDITOR.dialogCommand("creatediv",{allowedContent:n,requiredContent:"div",contextSensitive:!0,refresh:function(e,t){
var n=e.config.div_wrapTable?t.root:t.blockLimit;
this.setState("div" in n.getDtd()?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED);
}})),e.addCommand("editdiv",new CKEDITOR.dialogCommand("editdiv",{requiredContent:"div"})),e.addCommand("removediv",{requiredContent:"div",exec:function(e){
function t(t){
var n=CKEDITOR.plugins.div.getSurroundDiv(e,t);
n&&!n.data("cke-div-added")&&(s.push(n),n.data("cke-div-added"));
};
for(var n,i,o=e.getSelection(),a=o&&o.getRanges(),r=o.createBookmarks(),s=[],l=0;l<a.length;l++){
n=a[l],n.collapsed?t(o.getStartElement()):(i=new CKEDITOR.dom.walker(n),i.evaluator=t,i.lastForward());
}
for(l=0;l<s.length;l++){
s[l].remove(!0);
}
o.selectBookmarks(r);
}}),e.ui.addButton&&e.ui.addButton("CreateDiv",{label:t.toolbar,command:"creatediv",toolbar:"blocks,50"}),e.addMenuItems&&(e.addMenuItems({editdiv:{label:t.edit,command:"editdiv",group:"div",order:1},removediv:{label:t.remove,command:"removediv",group:"div",order:5}}),e.contextMenu&&e.contextMenu.addListener(function(t){
return !t||t.isReadOnly()?null:CKEDITOR.plugins.div.getSurroundDiv(e)?{editdiv:CKEDITOR.TRISTATE_OFF,removediv:CKEDITOR.TRISTATE_OFF}:null;
})),CKEDITOR.dialog.add("creatediv",this.path+"dialogs/div.js"),CKEDITOR.dialog.add("editdiv",this.path+"dialogs/div.js");
}
}}),CKEDITOR.plugins.div={getSurroundDiv:function(e,t){
var n=e.elementPath(t);
return e.elementPath(n.blockLimit).contains(function(e){
return e.is("div")&&!e.isReadOnly();
},1);
}};
}(),function(){
function e(e,i){
function a(t){
var n=c.list[t];
if(n.equals(e.editable())||"true"==n.getAttribute("contenteditable")){
var i=e.createRange();
i.selectNodeContents(n),i.select();
}else{
e.getSelection().selectElement(n);
}
e.focus();
};
function r(){
s&&s.setHtml(n),delete c.list;
};
var s,l=e.ui.spaceId("path"),d=function(){
return s||(s=CKEDITOR.document.getById(l)),s;
},c=e._.elementsPath,u=c.idBase;
i.html+="<span id=\""+l+"_label\" class=\"cke_voice_label\">"+e.lang.elementspath.eleLabel+"</span><span id=\""+l+"\" class=\"cke_path\" role=\"group\" aria-labelledby=\""+l+"_label\">"+n+"</span>",e.on("uiReady",function(){
var t=e.ui.space("path");
t&&e.focusManager.add(t,1);
}),c.onClick=a;
var h=CKEDITOR.tools.addFunction(a),f=CKEDITOR.tools.addFunction(function(t,n){
var i,o=c.idBase;
n=new CKEDITOR.dom.event(n);
var r="rtl"==e.lang.dir;
switch(n.getKeystroke()){
case r?39:37:
case 9:
return i=CKEDITOR.document.getById(o+(t+1)),i||(i=CKEDITOR.document.getById(o+"0")),i.focus(),!1;
case r?37:39:
case CKEDITOR.SHIFT+9:
return i=CKEDITOR.document.getById(o+(t-1)),i||(i=CKEDITOR.document.getById(o+(c.list.length-1))),i.focus(),!1;
case 27:
return e.focus(),!1;
case 13:
case 32:
return a(t),!1;
}
return !0;
});
e.on("selectionChange",function(){
for(var t,i=[],a=c.list=[],r=[],s=c.filters,l=!0,m=e.elementPath().elements,g=m.length;g--;){
var p=m[g],E=0;
t=p.data("cke-display-name")?p.data("cke-display-name"):p.data("cke-real-element-type")?p.data("cke-real-element-type"):p.getName(),l=p.hasAttribute("contenteditable")?"true"==p.getAttribute("contenteditable"):l,l||p.hasAttribute("contenteditable")||(E=1);
for(var T=0;T<s.length;T++){
var C=s[T](p,t);
if(C===!1){
E=1;
break;
}
t=C||t;
}
E||(a.unshift(p),r.unshift(t));
}
for(var v=a.length,I=0;v>I;I++){
t=r[I];
var O=e.lang.elementspath.eleTitle.replace(/%1/,t),D=o.output({id:u+I,label:O,text:t,jsTitle:"javascript:void('"+t+"')",index:I,keyDownFn:f,clickFn:h});
i.unshift(D);
}
var b=d();
b.setHtml(i.join("")+n),e.fire("elementsPathUpdate",{space:b});
}),e.on("readOnly",r),e.on("contentDomUnload",r),e.addCommand("elementsPathFocus",t.toolbarFocus),e.setKeystroke(CKEDITOR.ALT+122,"elementsPathFocus");
};
var t={toolbarFocus:{editorFocus:!1,readOnly:1,exec:function(e){
var t=e._.elementsPath.idBase,n=CKEDITOR.document.getById(t+"0");
n&&n.focus(CKEDITOR.env.ie||CKEDITOR.env.air);
}}},n="<span class=\"cke_path_empty\">&nbsp;</span>",i="";
CKEDITOR.env.gecko&&CKEDITOR.env.mac&&(i+=" onkeypress=\"return false;\""),CKEDITOR.env.gecko&&(i+=" onblur=\"this.style.cssText = this.style.cssText;\"");
var o=CKEDITOR.addTemplate("pathItem","<a id=\"{id}\" href=\"{jsTitle}\" tabindex=\"-1\" class=\"cke_path_item\" title=\"{label}\""+i+" hidefocus=\"true\"  onkeydown=\"return CKEDITOR.tools.callFunction({keyDownFn},{index}, event );\" onclick=\"CKEDITOR.tools.callFunction({clickFn},{index}); return false;\" role=\"button\" aria-label=\"{label}\">{text}</a>");
CKEDITOR.plugins.add("elementspath",{init:function(t){
t._.elementsPath={idBase:"cke_elementspath_"+CKEDITOR.tools.getNextNumber()+"_",filters:[]},t.on("uiSpace",function(n){
"bottom"==n.data.space&&e(t,n.data);
});
}});
}(),function(){
function e(e){
return t(e,e.activeShiftEnterMode,1);
};
function t(e,t,n){
if(n=e.config.forceEnterMode||n,"wysiwyg"==e.mode){
t||(t=e.activeEnterMode);
var i=e.elementPath();
i.isContextFor("p")||(t=CKEDITOR.ENTER_BR,n=1),e.fire("saveSnapshot"),t==CKEDITOR.ENTER_BR?s(e,t,null,n):l(e,t,null,n),e.fire("saveSnapshot");
}
};
function n(e){
for(var t=e.getSelection().getRanges(!0),n=t.length-1;n>0;n--){
t[n].deleteContents();
}
return t[0];
};
function i(e){
var t=e.startContainer.getAscendant(function(e){
return e.type==CKEDITOR.NODE_ELEMENT&&"true"==e.getAttribute("contenteditable");
},!0);
if(e.root.equals(t)){
return e;
}
var n=new CKEDITOR.dom.range(t);
return n.moveToRange(e),n;
};
CKEDITOR.plugins.add("enterkey",{init:function(n){
n.addCommand("enter",{modes:{wysiwyg:1},editorFocus:!1,exec:function(e){
t(e);
}}),n.addCommand("shiftEnter",{modes:{wysiwyg:1},editorFocus:!1,exec:function(t){
e(t);
}}),n.setKeystroke([[13,"enter"],[CKEDITOR.SHIFT+13,"shiftEnter"]]);
}});
var o=CKEDITOR.dom.walker.whitespaces(),a=CKEDITOR.dom.walker.bookmark();
CKEDITOR.plugins.enterkey={enterBlock:function(e,t,r,l){
if(r=r||n(e)){
r=i(r);
var c,u=r.document,h=r.checkStartOfBlock(),f=r.checkEndOfBlock(),m=e.elementPath(r.startContainer),g=m.block,p=t==CKEDITOR.ENTER_DIV?"div":"p";
if(h&&f){
if(g&&(g.is("li")||g.getParent().is("li"))){
g.is("li")||(g=g.getParent());
var E,T=g.getParent(),C=T.getParent(),v=!g.hasPrevious(),I=!g.hasNext(),O=e.getSelection(),D=O.createBookmarks(),b=g.getDirection(1),R=g.getAttribute("class"),y=g.getAttribute("style"),K=C.getDirection(1)!=b,_13=e.enterMode,k=_13!=CKEDITOR.ENTER_BR||K||y||R;
if(C.is("li")){
v||I?(v&&I&&T.remove(),g[I?"insertAfter":"insertBefore"](C)):g.breakParent(C);
}else{
if(k){
m.block.is("li")?(c=u.createElement(t==CKEDITOR.ENTER_P?"p":"div"),K&&c.setAttribute("dir",b),y&&c.setAttribute("style",y),R&&c.setAttribute("class",R),g.moveChildren(c)):c=m.block,v||I?c[v?"insertBefore":"insertAfter"](T):(g.breakParent(T),c.insertAfter(T)),g.remove();
}else{
if(g.appendBogus(!0),v||I){
for(;E=g[v?"getFirst":"getLast"]();){
E[v?"insertBefore":"insertAfter"](T);
}
}else{
for(g.breakParent(T);E=g.getLast();){
E.insertAfter(T);
}
}
g.remove();
}
}
return void O.selectBookmarks(D);
}
if(g&&g.getParent().is("blockquote")){
return g.breakParent(g.getParent()),g.getPrevious().getFirst(CKEDITOR.dom.walker.invisible(1))||g.getPrevious().remove(),g.getNext().getFirst(CKEDITOR.dom.walker.invisible(1))||g.getNext().remove(),r.moveToElementEditStart(g),void r.select();
}
}else{
if(g&&g.is("pre")&&!f){
return void s(e,t,r,l);
}
}
var w=r.splitBlock(p);
if(w){
var S,x=w.previousBlock,N=w.nextBlock,A=w.wasStartOfBlock,L=w.wasEndOfBlock;
if(N?(S=N.getParent(),S.is("li")&&(N.breakParent(S),N.move(N.getNext(),1))):x&&(S=x.getParent())&&S.is("li")&&(x.breakParent(S),S=x.getNext(),r.moveToElementEditStart(S),x.move(x.getPrevious())),A||L){
var P;
x?(x.is("li")||!d.test(x.getName())&&!x.is("pre"))&&(c=x.clone()):N&&(c=N.clone()),c?l&&!c.is("li")&&c.renameNode(p):S&&S.is("li")?c=S:(c=u.createElement(p),x&&(P=x.getDirection())&&c.setAttribute("dir",P));
var B=w.elementPath;
if(B){
for(var F=0,M=B.elements.length;M>F;F++){
var $=B.elements[F];
if($.equals(B.block)||$.equals(B.blockLimit)){
break;
}
CKEDITOR.dtd.$removeEmpty[$.getName()]&&($=$.clone(),c.moveChildren($),c.append($));
}
}
c.appendBogus(),c.getParent()||r.insertNode(c),c.is("li")&&c.removeAttribute("value"),!CKEDITOR.env.ie||!A||L&&x.getChildCount()||(r.moveToElementEditStart(L?x:c),r.select()),r.moveToElementEditStart(A&&!L?N:c);
}else{
if(N.is("li")){
var H=r.clone();
H.selectNodeContents(N);
var q=new CKEDITOR.dom.walker(H);
q.evaluator=function(e){
return !(a(e)||o(e)||e.type==CKEDITOR.NODE_ELEMENT&&e.getName() in CKEDITOR.dtd.$inline&&!(e.getName() in CKEDITOR.dtd.$empty));
},S=q.next(),S&&S.type==CKEDITOR.NODE_ELEMENT&&S.is("ul","ol")&&(CKEDITOR.env.needsBrFiller?u.createElement("br"):u.createText("\xa0")).insertBefore(S);
}
N&&r.moveToElementEditStart(N);
}
r.select(),r.scrollIntoView();
}
}
},enterBr:function(e,t,i,o){
if(i=i||n(e)){
var a=i.document,r=i.checkEndOfBlock(),s=new CKEDITOR.dom.elementPath(e.getSelection().getStartElement()),c=s.block,u=c&&s.block.getName();
if(!o&&"li"==u){
return void l(e,t,i,o);
}
if(!o&&r&&d.test(u)){
var h,f;
(f=c.getDirection())?(h=a.createElement("div"),h.setAttribute("dir",f),h.insertAfter(c),i.setStart(h,0)):(a.createElement("br").insertAfter(c),CKEDITOR.env.gecko&&a.createText("").insertAfter(c),i.setStartAt(c.getNext(),CKEDITOR.env.ie?CKEDITOR.POSITION_BEFORE_START:CKEDITOR.POSITION_AFTER_START));
}else{
var m;
m="pre"==u&&CKEDITOR.env.ie&&CKEDITOR.env.version<8?a.createText("\r"):a.createElement("br"),i.deleteContents(),i.insertNode(m),CKEDITOR.env.needsBrFiller?(a.createText("\ufeff").insertAfter(m),r&&(c||s.blockLimit).appendBogus(),m.getNext().$.nodeValue="",i.setStartAt(m.getNext(),CKEDITOR.POSITION_AFTER_START)):i.setStartAt(m,CKEDITOR.POSITION_AFTER_END);
}
i.collapse(!0),i.select(),i.scrollIntoView();
}
}};
var r=CKEDITOR.plugins.enterkey,s=r.enterBr,l=r.enterBlock,d=/^h[1-6]$/;
}(),function(){
function e(e,t){
var n={},i=[],o={nbsp:"\xa0",shy:"",gt:">",lt:"<",amp:"&",apos:"'",quot:"\""};
if(e=e.replace(/\b(nbsp|shy|gt|lt|amp|apos|quot)(?:,|$)/g,function(e,a){
var r=t?"&"+a+";":o[a],s=t?o[a]:"&"+a+";";
return n[r]=s,i.push(r),"";
}),!t&&e){
e=e.split(",");
var a,r=document.createElement("div");
r.innerHTML="&"+e.join(";&")+";",a=r.innerHTML,r=null;
for(var s=0;s<a.length;s++){
var l=a.charAt(s);
n[l]="&"+e[s]+";",i.push(l);
}
}
return n.regex=i.join(t?"|":""),n;
};
var t="nbsp,gt,lt,amp",n="quot,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,euro",i="Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,OElig,oelig,Scaron,scaron,Yuml",o="Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,upsih,piv";
CKEDITOR.plugins.add("entities",{afterInit:function(a){
function r(e){
return m[e];
};
function s(e){
return "force"!=l.entities_processNumerical&&h[e]?h[e]:"&#"+e.charCodeAt(0)+";";
};
var l=a.config,d=a.dataProcessor,c=d&&d.htmlFilter;
if(c){
var u=[];
l.basicEntities!==!1&&u.push(t),l.entities&&(u.length&&u.push(n),l.entities_latin&&u.push(i),l.entities_greek&&u.push(o),l.entities_additional&&u.push(l.entities_additional));
var h=e(u.join(",")),f=h.regex?"["+h.regex+"]":"a^";
delete h.regex,l.entities&&l.entities_processNumerical&&(f="[^ -~]|"+f),f=new RegExp(f,"g");
var m=e([t,"shy"].join(","),!0),g=new RegExp(m.regex,"g");
c.addRules({text:function(e){
return e.replace(g,r).replace(f,s);
}},{applyToAll:!0,excludeNestedEditable:!0});
}
}});
}(),CKEDITOR.config.basicEntities=!0,CKEDITOR.config.entities=!0,CKEDITOR.config.entities_latin=!0,CKEDITOR.config.entities_greek=!0,CKEDITOR.config.entities_additional="#39",CKEDITOR.plugins.add("popup"),CKEDITOR.tools.extend(CKEDITOR.editor.prototype,{popup:function(e,t,n,i){
t=t||"80%",n=n||"70%","string"==typeof t&&t.length>1&&"%"==t.substr(t.length-1,1)&&(t=parseInt(window.screen.width*parseInt(t,10)/100,10)),"string"==typeof n&&n.length>1&&"%"==n.substr(n.length-1,1)&&(n=parseInt(window.screen.height*parseInt(n,10)/100,10)),640>t&&(t=640),420>n&&(n=420);
var o=parseInt((window.screen.height-n)/2,10),a=parseInt((window.screen.width-t)/2,10);
i=(i||"location=no,menubar=no,toolbar=no,dependent=yes,minimizable=no,modal=yes,alwaysRaised=yes,resizable=yes,scrollbars=yes")+",width="+t+",height="+n+",top="+o+",left="+a;
var r=window.open("",null,i,!0);
if(!r){
return !1;
}
try{
var s=navigator.userAgent.toLowerCase();
-1==s.indexOf(" chrome/")&&(r.moveTo(a,o),r.resizeTo(t,n)),r.focus(),r.location.href=e;
}
catch(l){
r=window.open(e,null,i,!0);
}
return !0;
}}),function(){
function e(e,t){
var n=[];
if(!t){
return e;
}
for(var i in t){
n.push(i+"="+encodeURIComponent(t[i]));
}
return e+(-1!=e.indexOf("?")?"&":"?")+n.join("&");
};
function t(e){
e+="";
var t=e.charAt(0).toUpperCase();
return t+e.substr(1);
};
function n(){
var n=this.getDialog(),i=n.getParentEditor();
i._.filebrowserSe=this;
var o=i.config["filebrowser"+t(n.getName())+"WindowWidth"]||i.config.filebrowserWindowWidth||"80%",a=i.config["filebrowser"+t(n.getName())+"WindowHeight"]||i.config.filebrowserWindowHeight||"70%",r=this.filebrowser.params||{};
r.CKEditor=i.name,r.CKEditorFuncNum=i._.filebrowserFn,r.langCode||(r.langCode=i.langCode);
var s=e(this.filebrowser.url,r);
i.popup(s,o,a,i.config.filebrowserWindowFeatures||i.config.fileBrowserWindowFeatures);
};
function i(e){
var t,n=new CKEDITOR.dom.element(e.$.form);
n&&(t=n.$.elements[c],t?t=new CKEDITOR.dom.element(t):(t=new CKEDITOR.dom.element("input"),t.setAttributes({name:c,type:"hidden"}),n.append(t)),t.setAttribute("value",CKEDITOR.tools.getCsrfToken()));
};
function o(){
var e=this.getDialog(),t=e.getParentEditor();
return t._.filebrowserSe=this,e.getContentElement(this["for"][0],this["for"][1]).getInputElement().$.value&&e.getContentElement(this["for"][0],this["for"][1]).getAction()?!0:!1;
};
function a(t,n,i){
var o=i.params||{};
o.CKEditor=t.name,o.CKEditorFuncNum=t._.filebrowserFn,o.langCode||(o.langCode=t.langCode),n.action=e(i.url,o),n.filebrowser=i;
};
function r(e,s,l,d){
if(d&&d.length){
for(var c,u=d.length;u--;){
if(c=d[u],("hbox"==c.type||"vbox"==c.type||"fieldset"==c.type)&&r(e,s,l,c.children),c.filebrowser){
if("string"==typeof c.filebrowser){
var h={action:"fileButton"==c.type?"QuickUpload":"Browse",target:c.filebrowser};
c.filebrowser=h;
}
if("Browse"==c.filebrowser.action){
var f=c.filebrowser.url;
void 0===f&&(f=e.config["filebrowser"+t(s)+"BrowseUrl"],void 0===f&&(f=e.config.filebrowserBrowseUrl)),f&&(c.onClick=n,c.filebrowser.url=f,c.hidden=!1);
}else{
if("QuickUpload"==c.filebrowser.action&&c["for"]&&(f=c.filebrowser.url,void 0===f&&(f=e.config["filebrowser"+t(s)+"UploadUrl"],void 0===f&&(f=e.config.filebrowserUploadUrl)),f)){
var m=c.onClick;
c.onClick=function(e){
var t=e.sender;
if(m&&m.call(t,e)===!1){
return !1;
}
if(o.call(t,e)){
var n=t.getDialog().getContentElement(this["for"][0],this["for"][1]).getInputElement();
return i(n),!0;
}
return !1;
},c.filebrowser.url=f,c.hidden=!1,a(e,l.getContents(c["for"][0]).get(c["for"][1]),c.filebrowser);
}
}
}
}
}
};
function s(e,t){
var n=t.getDialog(),i=t.filebrowser.target||null;
if(i){
var o=i.split(":"),a=n.getContentElement(o[0],o[1]);
a&&(a.setValue(e),n.selectPage(o[0]));
}
};
function l(e,t,n){
if(-1!==n.indexOf(";")){
for(var i=n.split(";"),o=0;o<i.length;o++){
if(l(e,t,i[o])){
return !0;
}
}
return !1;
}
var a=e.getContents(t).get(n).filebrowser;
return a&&a.url;
};
function d(e,t){
var n=this._.filebrowserSe.getDialog(),i=this._.filebrowserSe["for"],o=this._.filebrowserSe.filebrowser.onSelect;
i&&n.getContentElement(i[0],i[1]).reset(),("function"!=typeof t||t.call(this._.filebrowserSe)!==!1)&&(o&&o.call(this._.filebrowserSe,e,t)===!1||("string"==typeof t&&t&&alert(t),e&&s(e,this._.filebrowserSe)));
};
var c="ckCsrfToken";
CKEDITOR.plugins.add("filebrowser",{requires:"popup",init:function(e){
e._.filebrowserFn=CKEDITOR.tools.addFunction(d,e),e.on("destroy",function(){
CKEDITOR.tools.removeFunction(this._.filebrowserFn);
});
}}),CKEDITOR.on("dialogDefinition",function(e){
if(e.editor.plugins.filebrowser){
for(var t,n=e.data.definition,i=0;i<n.contents.length;++i){
(t=n.contents[i])&&(r(e.editor,e.data.name,n,t.elements),t.hidden&&t.filebrowser&&(t.hidden=!l(n,t.id,t.filebrowser)));
}
}
});
}(),CKEDITOR.plugins.add("find",{requires:"dialog",init:function(e){
var t=e.addCommand("find",new CKEDITOR.dialogCommand("find"));
t.canUndo=!1,t.readOnly=1;
var n=e.addCommand("replace",new CKEDITOR.dialogCommand("replace"));
n.canUndo=!1,e.ui.addButton&&(e.ui.addButton("Find",{label:e.lang.find.find,command:"find",toolbar:"find,10"}),e.ui.addButton("Replace",{label:e.lang.find.replace,command:"replace",toolbar:"find,20"})),CKEDITOR.dialog.add("find",this.path+"dialogs/find.js"),CKEDITOR.dialog.add("replace",this.path+"dialogs/find.js");
}}),CKEDITOR.config.find_highlight={element:"span",styles:{"background-color":"#004",color:"#fff"}},function(){
function e(e,t){
var n=i.exec(e),o=i.exec(t);
if(n){
if(!n[2]&&"px"==o[2]){
return o[1];
}
if("px"==n[2]&&!o[2]){
return o[1]+"px";
}
}
return t;
};
var t=CKEDITOR.htmlParser.cssStyle,n=CKEDITOR.tools.cssLength,i=/^((?:\d*(?:\.\d+))|(?:\d+))(.*)?$/i,o={elements:{$:function(n){
var i=n.attributes,o=i&&i["data-cke-realelement"],a=o&&new CKEDITOR.htmlParser.fragment.fromHtml(decodeURIComponent(o)),r=a&&a.children[0];
if(r&&n.attributes["data-cke-resizable"]){
var s=new t(n).rules,l=r.attributes,d=s.width,c=s.height;
d&&(l.width=e(l.width,d)),c&&(l.height=e(l.height,c));
}
return r;
}}};
CKEDITOR.plugins.add("fakeobjects",{init:function(e){
e.filter.allow("img[!data-cke-realelement,src,alt,title](*){*}","fakeobjects");
},afterInit:function(e){
var t=e.dataProcessor,n=t&&t.htmlFilter;
n&&n.addRules(o,{applyToAll:!0});
}}),CKEDITOR.editor.prototype.createFakeElement=function(e,i,o,a){
var r=this.lang.fakeobjects,s=r[o]||r.unknown,l={"class":i,"data-cke-realelement":encodeURIComponent(e.getOuterHtml()),"data-cke-real-node-type":e.type,alt:s,title:s,align:e.getAttribute("align")||""};
if(CKEDITOR.env.hc||(l.src=CKEDITOR.tools.transparentImageData),o&&(l["data-cke-real-element-type"]=o),a){
l["data-cke-resizable"]=a;
var d=new t,c=e.getAttribute("width"),u=e.getAttribute("height");
c&&(d.rules.width=n(c)),u&&(d.rules.height=n(u)),d.populate(l);
}
return this.document.createElement("img",{attributes:l});
},CKEDITOR.editor.prototype.createFakeParserElement=function(e,i,o,a){
var r,s=this.lang.fakeobjects,l=s[o]||s.unknown,d=new CKEDITOR.htmlParser.basicWriter;
e.writeHtml(d),r=d.getHtml();
var c={"class":i,"data-cke-realelement":encodeURIComponent(r),"data-cke-real-node-type":e.type,alt:l,title:l,align:e.attributes.align||""};
if(CKEDITOR.env.hc||(c.src=CKEDITOR.tools.transparentImageData),o&&(c["data-cke-real-element-type"]=o),a){
c["data-cke-resizable"]=a;
var u=e.attributes,h=new t,f=u.width,m=u.height;
void 0!==f&&(h.rules.width=n(f)),void 0!==m&&(h.rules.height=n(m)),h.populate(c);
}
return new CKEDITOR.htmlParser.element("img",c);
},CKEDITOR.editor.prototype.restoreRealElement=function(t){
if(t.data("cke-real-node-type")!=CKEDITOR.NODE_ELEMENT){
return null;
}
var n=CKEDITOR.dom.element.createFromHtml(decodeURIComponent(t.data("cke-realelement")),this.document);
if(t.data("cke-resizable")){
var i=t.getStyle("width"),o=t.getStyle("height");
i&&n.setAttribute("width",e(n.getAttribute("width"),i)),o&&n.setAttribute("height",e(n.getAttribute("height"),o));
}
return n;
};
}(),function(){
function e(e){
var t=e.attributes;
return "application/x-shockwave-flash"==t.type||n.test(t.src||"");
};
function t(e,t){
return e.createFakeParserElement(t,"cke_flash","flash",!0);
};
var n=/\.swf(?:$|\?)/i;
CKEDITOR.plugins.add("flash",{requires:"dialog,fakeobjects",onLoad:function(){
CKEDITOR.addCss("img.cke_flash{background-image: url("+CKEDITOR.getUrl(this.path+"images/placeholder.png")+");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 80px;height: 80px;}");
},init:function(e){
var t="object[classid,codebase,height,hspace,vspace,width];param[name,value];embed[height,hspace,pluginspage,src,type,vspace,width]";
CKEDITOR.dialog.isTabEnabled(e,"flash","properties")&&(t+=";object[align]; embed[allowscriptaccess,quality,scale,wmode]"),CKEDITOR.dialog.isTabEnabled(e,"flash","advanced")&&(t+=";object[id]{*}; embed[bgcolor]{*}(*)"),e.addCommand("flash",new CKEDITOR.dialogCommand("flash",{allowedContent:t,requiredContent:"embed"})),e.ui.addButton&&e.ui.addButton("Flash",{label:e.lang.common.flash,command:"flash",toolbar:"insert,20"}),CKEDITOR.dialog.add("flash",this.path+"dialogs/flash.js"),e.addMenuItems&&e.addMenuItems({flash:{label:e.lang.flash.properties,command:"flash",group:"flash"}}),e.on("doubleclick",function(e){
var t=e.data.element;
t.is("img")&&"flash"==t.data("cke-real-element-type")&&(e.data.dialog="flash");
}),e.contextMenu&&e.contextMenu.addListener(function(e){
return e&&e.is("img")&&!e.isReadOnly()&&"flash"==e.data("cke-real-element-type")?{flash:CKEDITOR.TRISTATE_OFF}:void 0;
});
},afterInit:function(n){
var i=n.dataProcessor,o=i&&i.dataFilter;
o&&o.addRules({elements:{"cke:object":function(i){
var o=i.attributes,a=o.classid&&String(o.classid).toLowerCase();
if(!a&&!e(i)){
for(var r=0;r<i.children.length;r++){
if("cke:embed"==i.children[r].name){
return e(i.children[r])?t(n,i):null;
}
}
return null;
}
return t(n,i);
},"cke:embed":function(i){
return e(i)?t(n,i):null;
}}},5);
}});
}(),CKEDITOR.tools.extend(CKEDITOR.config,{flashEmbedTagOnly:!1,flashAddEmbedTag:!0,flashConvertOnEdit:!1}),function(){
function e(e){
var t="left"==e?"pageXOffset":"pageYOffset",i="left"==e?"scrollLeft":"scrollTop";
return t in n.$?n.$[t]:CKEDITOR.document.$.documentElement[i];
};
function t(t){
var o=t.config,a=t.fire("uiSpace",{space:"top",html:""}).html,r=function(){
function a(e,t,n){
l.setStyle(t,i(n)),l.setStyle("position",e);
};
function s(e){
var t=c.getDocumentPosition();
switch(e){
case "top":
a("absolute","top",t.y-m-E);
break;
case "pin":
a("fixed","top",C);
break;
case "bottom":
a("absolute","top",t.y+(h.height||h.bottom-h.top)+E);
}
d=e;
};
var d,c,u,h,f,m,g,p=o.floatSpaceDockedOffsetX||0,E=o.floatSpaceDockedOffsetY||0,T=o.floatSpacePinnedOffsetX||0,C=o.floatSpacePinnedOffsetY||0;
return function(a){
if(c=t.editable()){
var C=a&&"focus"==a.name;
if(C&&l.show(),t.fire("floatingSpaceLayout",{show:C}),l.removeStyle("left"),l.removeStyle("right"),u=l.getClientRect(),h=c.getClientRect(),f=n.getViewPaneSize(),m=u.height,g=e("left"),!d){
return d="pin",s("pin"),void r(a);
}
s(m+E<=h.top?"top":m+E>f.height-h.bottom?"pin":"bottom");
var v,I,O=f.width/2;
v=o.floatSpacePreferRight?"right":h.left>0&&h.right<f.width&&h.width>u.width?"rtl"==o.contentsLangDirection?"right":"left":O-h.left>h.right-O?"left":"right",u.width>f.width?(v="left",I=0):(I="left"==v?h.left>0?h.left:0:h.right<f.width?f.width-h.right:0,I+u.width>f.width&&(v="left"==v?"right":"left",I=0));
var D="pin"==d?0:"left"==v?g:-g;
l.setStyle(v,i(("pin"==d?T:p)+I+D));
}
};
}();
if(a){
var s=new CKEDITOR.template("<div id=\"cke_{name}\" class=\"cke {id} cke_reset_all cke_chrome cke_editor_{name} cke_float cke_{langDir} "+CKEDITOR.env.cssClass+"\" dir=\"{langDir}\" title=\""+(CKEDITOR.env.gecko?" ":"")+"\" lang=\"{langCode}\" role=\"application\" style=\"{style}\""+(t.title?" aria-labelledby=\"cke_{name}_arialbl\"":" ")+">"+(t.title?"<span id=\"cke_{name}_arialbl\" class=\"cke_voice_label\">{voiceLabel}</span>":" ")+"<div class=\"cke_inner\"><div id=\"{topId}\" class=\"cke_top\" role=\"presentation\">{content}</div></div></div>"),l=CKEDITOR.document.getBody().append(CKEDITOR.dom.element.createFromHtml(s.output({content:a,id:t.id,langDir:t.lang.dir,langCode:t.langCode,name:t.name,style:"display:none;z-index:"+(o.baseFloatZIndex-1),topId:t.ui.spaceId("top"),voiceLabel:t.title}))),d=CKEDITOR.tools.eventsBuffer(500,r),c=CKEDITOR.tools.eventsBuffer(100,r);
l.unselectable(),l.on("mousedown",function(e){
e=e.data,e.getTarget().hasAscendant("a",1)||e.preventDefault();
}),t.on("focus",function(e){
r(e),t.on("change",d.input),n.on("scroll",c.input),n.on("resize",c.input);
}),t.on("blur",function(){
l.hide(),t.removeListener("change",d.input),n.removeListener("scroll",c.input),n.removeListener("resize",c.input);
}),t.on("destroy",function(){
n.removeListener("scroll",c.input),n.removeListener("resize",c.input),l.clearCustomData(),l.remove();
}),t.focusManager.hasFocus&&l.show(),t.focusManager.add(l,1);
}
};
var n=CKEDITOR.document.getWindow(),i=CKEDITOR.tools.cssLength;
CKEDITOR.plugins.add("floatingspace",{init:function(e){
e.on("loaded",function(){
t(this);
},null,null,20);
}});
}(),CKEDITOR.plugins.add("listblock",{requires:"panel",onLoad:function(){
var e="cke_panel_listItem_readonly",t=CKEDITOR.addTemplate("panel-list","<ul role=\"presentation\" class=\"cke_panel_list\">{items}</ul>"),n=CKEDITOR.addTemplate("panel-list-item","<li id=\"{id}\" class=\"cke_panel_listItem\" role=\"presentation\"><a id=\"{id}_option\" _cke_focus=1 hidefocus=true title=\"{title}\" href=\"javascript:void('{val}')\"  {onclick}=\"CKEDITOR.tools.callFunction({clickFn},'{val}'); return false;\" role=\"option\" aria-posinset=\"{posinset}\" aria-setsize=\"{setsize}\">{text}</a></li>"),i=CKEDITOR.addTemplate("panel-list-item-readonly","<li id=\"{id}\" class=\"cke_panel_listItem "+e+"\" role=\"presentation\"><a id=\"{id}_option\" _cke_focus=1 hidefocus=true title=\"{title}\" role=\"option\" href=\"javascript:void('{val}')\"  aria-disabled=\"true\" aria-posinset=\"{posinset}\" aria-setsize=\"{setsize}\">{text}</a></li>"),o=CKEDITOR.addTemplate("panel-list-group","<h1 id=\"{id}\" class=\"cke_panel_grouptitle\" role=\"presentation\" >{label}</h1>"),a=/\'/g,r=function(e){
return e.replace(a,"\\'");
};
CKEDITOR.ui.panel.prototype.addListBlock=function(e,t,n){
return this.addBlock(e,new CKEDITOR.ui.listBlock(this.getHolderElement(),t,n));
},CKEDITOR.ui.listBlockItems=CKEDITOR.tools.createClass({$:function(){
this._.items={},this._.groups={},this._.groupsOrder=[],this._.currentGroup=null;
},_:{},proto:{getItem:function(e){
return this._.items[e];
},getGroup:function(e){
return this._.groups[e];
},getGroupItems:function(e){
return this._.groups[e].items;
},getItemId:function(e){
return this._.items[e].id;
},getGroupId:function(e){
return this._.groups[e].id;
},getItemNames:function(){
return CKEDITOR.tools.objectKeys(this._.items);
},getGroupNames:function(){
return this._.groupsOrder;
},getItemGroupName:function(e){
for(var t,n=this._.groupsOrder.length,i=0;n>i;i++){
if(t=CKEDITOR.tools.indexOf(this._.groups[this._.groupsOrder[i]].items,e),-1!=t){
return this._.groupsOrder[i];
}
}
return null;
},setItemReadonly:function(e,t){
var n=this._.items[e];
n&&(n.readonly=t,this.onChange());
},add:function(e,t,n,i){
this._.items[e]||(i=i||{},this._.items[e]={id:CKEDITOR.tools.getNextId(),val:r(CKEDITOR.tools.htmlEncodeAttr(e)),onclick:CKEDITOR.env.ie?"onclick=\"return false;\" onmouseup":"onclick",title:CKEDITOR.tools.htmlEncodeAttr(n||e),text:t||e,readonly:i.readonly},this._.currentGroup||(this._.currentGroup="#"+(new Date).getTime(),this._.groups[this._.currentGroup]={items:[]},this._.groupsOrder.push(this._.currentGroup)),null!=i.position?(i.position=Math.min(this._.groups[this._.currentGroup].items.length,Math.max(i.position,0)),this._.groups[this._.currentGroup].items.splice(i.position,0,e)):this._.groups[this._.currentGroup].items.push(e),this.onChange());
},remove:function(e){
if(this._.items[e]){
delete this._.items[e];
var t=this.getItemGroupName(e);
t&&this._.groups[t].items.splice(CKEDITOR.tools.indexOf(this._.groups[t].items,e),1),this.onChange();
}
},startGroup:function(e){
this._.groups[e]||(this._.groups[e]={id:CKEDITOR.tools.getNextId(),label:e,items:[]},this._.groupsOrder.push(e),this._.currentGroup=e,this.onChange());
},onChange:function(){
}}}),CKEDITOR.ui.listBlock=CKEDITOR.tools.createClass({base:CKEDITOR.ui.panel.block,$:function(e,t,n){
t=t||{};
var i=t.attributes||(t.attributes={});
(this.multiSelect=!!t.multiSelect)&&(i["aria-multiselectable"]=!0),!i.role&&(i.role="listbox"),this.base.apply(this,arguments),this.element.setAttribute("role",i.role);
var o=this.keys;
o[40]="next",o[9]="next",o[38]="prev",o[CKEDITOR.SHIFT+9]="prev",o[32]=CKEDITOR.env.ie?"mouseup":"click",CKEDITOR.env.ie&&(o[13]="mouseup"),this._.commited=!1,this._.items=n||new CKEDITOR.ui.listBlockItems;
var a=this;
this._.items.onChange=function(){
a._.commited&&a.render();
};
},_:{addClickFn:function(e){
return e.clickFn=this._.getClick(),e;
},getClick:function(){
return this._.click||(this._.click=CKEDITOR.tools.addFunction(function(e){
var t=this.toggle(e);
this.onClick&&this.onClick(e,t);
},this)),this._.click;
}},proto:{commit:function(){
this._.commited=!0,this.render();
},render:function(){
this.element.setHtml(this.generateHtml());
},generateHtml:function(){
var e,a,r,s,l=[],d=1,c=this._.items.getGroupNames(),u=this._.items.getItemNames().length;
for(var h in c){
this._.items.getGroupId(c[h])&&l.push(o.output(this._.items.getGroup(c[h]))),a=[],s=this._.items.getGroupItems(c[h]);
for(var f in s){
r=this._.items.getItem(s[f]),r&&(e=r.readonly?i:n,r.setsize=u,r.posinset=d,a.push(e.output(this._.addClickFn(r))),d++);
}
l.push(t.output({items:a.join("")}));
}
return l.join("");
},toggle:function(e){
var t=this.isMarked(e);
return t?this.unmark(e):this.mark(e),!t;
},hideGroup:function(e){
var t=this.element.getDocument().getById(this._.items.getGroupId(e)),n=t&&t.getNext();
t&&(t.setStyle("display","none"),n&&"ul"==n.getName()&&n.setStyle("display","none"));
},hideItem:function(e){
this.element.getDocument().getById(this._.items.getItemId(e)).setStyle("display","none");
},showAll:function(){
var e=this._.items.getItemNames(),t=this._.items.getGroupNames(),n=this.element.getDocument();
for(var i in e){
n.getById(this._.items.getItemId(e[i])).setStyle("display","");
}
for(var o in t){
var a=n.getById(this._.items.getGroupId(t[o])),r=a.getNext();
a.setStyle("display",""),r&&"ul"==r.getName()&&r.setStyle("display","");
}
},mark:function(e){
this.multiSelect||this.unmarkAll();
var t=this._.items.getItemId(e),n=this.element.getDocument().getById(t);
n.addClass("cke_selected"),this.element.getDocument().getById(t+"_option").setAttribute("aria-selected",!0),this.onMark&&this.onMark(n);
},unmark:function(e){
var t=this.element.getDocument(),n=this._.items.getItemId(e),i=t.getById(n);
i.removeClass("cke_selected"),t.getById(n+"_option").removeAttribute("aria-selected"),this.onUnmark&&this.onUnmark(i);
},unmarkAll:function(){
var e=this._.items.getItemNames(),t=this.element.getDocument();
for(var n in e){
var i=this._.items.getItemId(e[n]);
t.getById(i).removeClass("cke_selected"),t.getById(i+"_option").removeAttribute("aria-selected");
}
this.onUnmark&&this.onUnmark();
},isMarked:function(e){
return this.element.getDocument().getById(this._.items.getItemId(e)).hasClass("cke_selected");
},focus:function(e){
this._.focusIndex=-1;
var t,n,i=this.element.getElementsByTag("a"),o=-1;
if(e){
for(n=this.element.getDocument().getById(this._.items.getItemId(e)).getFirst();t=i.getItem(++o);){
if(t.equals(n)){
this._.focusIndex=o;
break;
}
}
}else{
this.element.focus();
}
n&&setTimeout(function(){
n.focus();
},0);
}}});
}}),CKEDITOR.plugins.add("richcombo",{requires:"floatpanel,listblock,button",beforeInit:function(e){
e.ui.addHandler(CKEDITOR.UI_RICHCOMBO,CKEDITOR.ui.richCombo.handler);
}}),function(){
var e="<span id=\"{id}\" class=\"cke_combo cke_combo__{name} {cls}\" role=\"presentation\"><span id=\"{id}_label\" class=\"cke_combo_label\">{label}</span><a class=\"cke_combo_button\" title=\"{title}\" tabindex=\"-1\""+(CKEDITOR.env.gecko&&!CKEDITOR.env.hc?"":" href=\"javascript:void('{titleJs}')\"")+" hidefocus=\"true\" role=\"button\" aria-labelledby=\"{id}_label\" aria-haspopup=\"true\"";
CKEDITOR.env.gecko&&CKEDITOR.env.mac&&(e+=" onkeypress=\"return false;\""),CKEDITOR.env.gecko&&(e+=" onblur=\"this.style.cssText = this.style.cssText;\""),e+=" onkeydown=\"return CKEDITOR.tools.callFunction({keydownFn},event,this);\" onfocus=\"return CKEDITOR.tools.callFunction({focusFn},event);\" "+(CKEDITOR.env.ie?"onclick=\"return false;\" onmouseup":"onclick")+"=\"CKEDITOR.tools.callFunction({clickFn},this);return false;\"><span id=\"{id}_text\" class=\"cke_combo_text cke_combo_inlinelabel\">{label}</span><span class=\"cke_combo_open\"><span class=\"cke_combo_arrow\">"+(CKEDITOR.env.hc?"&#9660;":CKEDITOR.env.air?"&nbsp;":"")+"</span></span></a></span>";
var t=CKEDITOR.addTemplate("combo",e);
CKEDITOR.UI_RICHCOMBO="richcombo",CKEDITOR.ui.richCombo=CKEDITOR.tools.createClass({$:function(e){
CKEDITOR.tools.extend(this,e,{canGroup:!1,title:e.label,modes:{wysiwyg:1},editorFocus:1});
var t=this.panel||{};
delete this.panel,this.id=CKEDITOR.tools.getNextNumber(),this.document=t.parent&&t.parent.getDocument()||CKEDITOR.document,t.className="cke_combopanel",t.block={multiSelect:t.multiSelect,attributes:t.attributes},t.toolbarRelated=!0,this._={panelDefinition:t,items:new CKEDITOR.ui.listBlockItems};
},proto:{render:function(e,n){
function i(){
if(this.getState()!=CKEDITOR.TRISTATE_ON){
var t=this.modes[e.mode]?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED;
e.readOnly&&!this.readOnly&&(t=CKEDITOR.TRISTATE_DISABLED),this.setState(t),this.setValue(""),t!=CKEDITOR.TRISTATE_DISABLED&&this.refresh&&this.refresh();
}
};
var o,a=0,r=CKEDITOR.env,s=this,l="cke_"+this.id,d=CKEDITOR.tools.addFunction(function(t){
a&&(e.unlockSelection(1),a=0),o.execute(t);
},this);
o={id:l,combo:this,focus:function(){
var e=CKEDITOR.document.getById(l).getChild(1);
e.focus();
},execute:function(t){
var n=s._;
if(n.state!=CKEDITOR.TRISTATE_DISABLED){
if(s.createPanel(e),n.on){
return void n.panel.hide();
}
s.commit();
var i=s.getValue();
i?n.list.mark(i):n.list.unmarkAll(),n.panel.showBlock(s.id,new CKEDITOR.dom.element(t),4);
}
},clickFn:d},e.on("activeFilterChange",i,this),e.on("mode",i,this),e.on("selectionChange",i,this),!this.readOnly&&e.on("readOnly",i,this);
var c=CKEDITOR.tools.addFunction(function(t,n){
t=new CKEDITOR.dom.event(t);
var i=t.getKeystroke();
switch(40==i&&e.once("panelShow",function(e){
e.data._.panel._.currentBlock.onKeyDown(40);
}),i){
case 13:
case 32:
case 40:
CKEDITOR.tools.callFunction(d,n);
break;
default:
o.onkey(o,i);
}
t.preventDefault();
}),u=CKEDITOR.tools.addFunction(function(){
o.onfocus&&o.onfocus();
});
o.keyDownFn=c;
var h={id:l,name:this.name||this.command,label:this.label,title:this.title,cls:this.className||"",titleJs:r.gecko&&!r.hc?"":(this.title||"").replace("'",""),keydownFn:c,focusFn:u,clickFn:d};
return t.output(h,n),this.onRender&&this.onRender(),o;
},createPanel:function(e){
if(!this._.panel){
var t=this._.panelDefinition,n=this._.panelDefinition.block,i=t.parent||CKEDITOR.document.getBody(),o="cke_combopanel__"+this.name,a=new CKEDITOR.ui.floatPanel(e,i,t),r=a.addListBlock(this.id,n,this._.items),s=this;
a.onShow=function(){
this.element.addClass(o),s.setState(CKEDITOR.TRISTATE_ON),s._.on=1,s.editorFocus&&!e.focusManager.hasFocus&&e.focus(),s.onOpen&&s.onOpen(),e.once("panelShow",function(){
r.focus(!r.multiSelect&&s.getValue());
});
},a.onHide=function(t){
this.element.removeClass(o),s.setState(s.modes&&s.modes[e.mode]?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED),s._.on=0,!t&&s.onClose&&s.onClose();
},a.onEscape=function(){
a.hide(1);
},r.onClick=function(e,t){
s.onClick&&s.onClick.call(s,e,t),a.hide();
},this._.panel=a,this._.list=r,a.getBlock(this.id).onHide=function(){
s._.on=0,s.setState(CKEDITOR.TRISTATE_OFF);
},this.init&&this.init();
}
},setValue:function(e,t){
this._.value=e;
var n=this.document.getById("cke_"+this.id+"_text");
n&&(e||t?n.removeClass("cke_combo_inlinelabel"):(t=this.label,n.addClass("cke_combo_inlinelabel")),n.setText("undefined"!=typeof t?t:e));
},getValue:function(){
return this._.value||"";
},unmarkAll:function(){
this._.list.unmarkAll();
},mark:function(e){
this._.list.mark(e);
},hideItem:function(e){
this._.list.hideItem(e);
},hideGroup:function(e){
this._.list.hideGroup(e);
},showAll:function(){
this._.list.showAll();
},add:function(e,t,n,i){
this._.items.add(e,t,n,i);
},remove:function(e){
this._.items.remove(e);
},startGroup:function(e){
this._.items.startGroup(e);
},commit:function(){
this._.committed||(this._.list.commit(),this._.committed=1,CKEDITOR.ui.fire("ready",this)),this._.committed=1;
},setState:function(e){
if(this._.state!=e){
var t=this.document.getById("cke_"+this.id);
t.setState(e,"cke_combo"),e==CKEDITOR.TRISTATE_DISABLED?t.setAttribute("aria-disabled",!0):t.removeAttribute("aria-disabled"),this._.state=e;
}
},getState:function(){
return this._.state;
},enable:function(){
this._.state==CKEDITOR.TRISTATE_DISABLED&&this.setState(this._.lastState);
},disable:function(){
this._.state!=CKEDITOR.TRISTATE_DISABLED&&(this._.lastState=this._.state,this.setState(CKEDITOR.TRISTATE_DISABLED));
},setReadonly:function(e,t){
this._.items.setItemReadonly(e,t);
}},statics:{handler:{create:function(e){
return new CKEDITOR.ui.richCombo(e);
}}}}),CKEDITOR.ui.prototype.addRichCombo=function(e,t){
this.add(e,CKEDITOR.UI_RICHCOMBO,t);
};
}(),function(){
function e(e,o,a,r,s,l,d,c,u){
var h=e.config,f=new CKEDITOR.style(d);
"FontSize"==o&&-1!="ar fa".indexOf(e.langCode)&&(s=n(s));
for(var m=s.split(";"),g=[],p={},E=0;E<m.length;E++){
var T=m[E];
if(T){
T=T.split("/");
var C={},v=m[E]=T[0];
C[a]=g[E]=T[1]||v,p[v]=new CKEDITOR.style(d,C),p[v]._.definition.name=v;
}else{
m.splice(E--,1);
}
}
e.ui.addRichCombo(o,{label:r.label,title:r.panelTitle,toolbar:"styles,"+c,allowedContent:f,requiredContent:f,panel:{css:[CKEDITOR.skin.getPath("editor")].concat(h.contentsCss),multiSelect:!1,attributes:{"aria-label":r.panelTitle}},onClick:function(n){
e.focus(),e.fire("saveSnapshot");
var o=this.getValue(),a=p[n],r=e.getSelection().getRanges()[0],s=new CKEDITOR.dom.elementPath(r.startContainer,e.editable()),l=new CKEDITOR.dom.elementPath(r.endContainer,e.editable()),d=i(s.elements,p,e)||i(l.elements,p,e);
if(d&&o&&n!=o){
var c=p[o];
if(r.collapsed){
var u=e.elementPath(),h=u.contains(function(e){
return c.checkElementRemovable(e);
});
if(h){
var f,m,g=r.checkBoundaryOfElement(h,CKEDITOR.START),E=r.checkBoundaryOfElement(h,CKEDITOR.END);
if(g&&E){
for(m=r.createBookmark();f=h.getFirst();){
f.insertBefore(h);
}
h.remove(),r.moveToBookmark(m);
}else{
g?r.moveToPosition(h,CKEDITOR.POSITION_BEFORE_START):E?r.moveToPosition(h,CKEDITOR.POSITION_AFTER_END):(r.splitElement(h),r.moveToPosition(h,CKEDITOR.POSITION_AFTER_END),t(r,u.elements.slice(),h));
}
e.getSelection().selectRanges([r]);
}
}else{
e.removeStyle(c);
}
}
d?(e[o==n?"removeStyle":"applyStyle"](a),e.fire("saveSnapshot")):o!=n&&(e.applyStyle(a),e.fire("saveSnapshot"));
},onRender:function(){
var t=null;
this.startGroup(r.panelTitle);
for(var n=0;n<m.length;n++){
var o=m[n];
this.add(o,p[o].buildPreview(),o);
}
e.on("selectionChange",function(n){
var o=this.getValue(),r=n.data.path,s=r.elements,d=i(s,p,e);
if(t!=o&&(this.remove(t),t=null),d){
return void (d!=o&&this.setValue(d));
}
if(u){
var c="font-"+a,h=u.preprocessStyle(s[0].getComputedStyle(c)),f=u.getMatchingItem(h,p);
if(f){
return void (f!=o&&this.setValue(f));
}
var m=u.getComputedValue(h);
if(m&&m!=o){
return t=m,this.add(m,this.getComputedItemStyle(c+":"+h).buildPreview(m),m,{readonly:!0,position:0}),void this.setValue(m);
}
}
this.setValue("",l);
},this);
},refresh:function(){
e.activeFilter.check(f)||this.setState(CKEDITOR.TRISTATE_DISABLED);
},getComputedItemStyle:function(e){
return new CKEDITOR.style({element:"span",attributes:{style:e}});
}});
};
function t(e,n,i){
var o=n.pop();
if(o){
if(i){
return t(e,n,o.equals(i)?null:i);
}
var a=o.clone();
e.insertNode(a),e.moveToPosition(a,CKEDITOR.POSITION_AFTER_START),t(e,n);
}
};
function n(e){
for(var t=["\u0660","\u0661","\u0662","\u0663","\u0664","\u0665","\u0666","\u0667","\u0668","\u0669"],n=e.split(";"),i=0;i<n.length;i++){
var o=n[i];
o&&(o=o.split("/"),o.length>1&&(o[0]=o[0].replace(/[0-9]/g,function(e){
return t[+e];
}),n[i]=o.join("/")));
}
return n.join(";");
};
function i(e,t,n){
for(var i,o=0;o<e.length;o++){
i=e[o];
for(var a in t){
if(t[a].checkElementMatch(i,!0,n)){
return a;
}
}
}
return null;
};
function o(){
return {preprocessStyle:function(e){
return e?-1!==e.indexOf("px")?Math.round(parseFloat(e))+"px":e:!1;
},getMatchingItem:function(e,t){
var n,i;
for(n in t){
if(i=t[n].getDefinition(),i.styles&&i.styles["font-size"]&&i.styles["font-size"]==e){
return n;
}
}
return !1;
},getComputedValue:function(e){
return -1!==e.indexOf("px")?parseInt(e,10):e;
}};
};
function a(){
function e(e){
for(var n=0,i=!0;n<e.length;n++){
i=i&&t(e[n]);
}
return i;
};
function t(e){
return -1!==CKEDITOR.tools.indexOf(i,e);
};
function n(e){
var t=CKEDITOR.tools.parseCssText("font-family:"+e,!0,!0)["font-family"];
return t?t.split(","):[];
};
var i=["serif","sans-serif","monospace","cursive","fantasy"];
return {preprocessStyle:function(e){
return e&&CKEDITOR.tools.trim(e);
},getMatchingItem:function(i,o){
for(var a,r,s,l,d,c,u,h=n(i),f=h.length,m=e(h),g=0;f>g;g++){
a=h[g],r=null;
for(u in o){
if(d=o[u].getDefinition(),d&&d.styles["font-family"]&&(l=n(d.styles["font-family"]),c=CKEDITOR.tools.indexOf(l,a),-1!==c&&(m||!t(l[c])))){
if(0===c){
return u;
}
(r&&r>c||!r)&&(r=c,s=u);
}
}
if(r){
return s;
}
}
return !1;
},getComputedValue:function(e){
return e.replace(/["']/g,"").replace(/\s*,\s*/g,", ");
}};
};
CKEDITOR.plugins.add("font",{requires:"richcombo",init:function(t){
var n=t.config;
e(t,"Font","family",t.lang.font,n.font_names,n.font_defaultLabel,n.font_style,30,a()),e(t,"FontSize","size",t.lang.font.fontSize,n.fontSize_sizes,n.fontSize_defaultLabel,n.fontSize_style,40,o());
}});
}(),CKEDITOR.config.font_names="Arial/Arial, Helvetica, sans-serif;Comic Sans MS/Comic Sans MS, cursive;Courier New/Courier New, Courier, monospace;Georgia/Georgia, serif;Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;Tahoma/Tahoma, Geneva, sans-serif;Times New Roman/Times New Roman, Times, serif;Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;Verdana/Verdana, Geneva, sans-serif",CKEDITOR.config.font_defaultLabel="",CKEDITOR.config.font_style={element:"span",styles:{"font-family":"#(family)"},overrides:[{element:"font",attributes:{face:null}}]},CKEDITOR.config.fontSize_sizes="8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;72/72px",CKEDITOR.config.fontSize_defaultLabel="",CKEDITOR.config.fontSize_style={element:"span",styles:{"font-size":"#(size)"},overrides:[{element:"font",attributes:{size:null}}]},CKEDITOR.plugins.add("format",{requires:"richcombo",init:function(e){
if(!e.blockless){
for(var t=e.config,n=e.lang.format,i=t.format_tags.split(";"),o={},a=0,r=[],s=0;s<i.length;s++){
var l=i[s],d=new CKEDITOR.style(t["format_"+l]);
(!e.filter.customConfig||e.filter.check(d))&&(a++,o[l]=d,o[l]._.enterMode=e.config.enterMode,r.push(d));
}
0!==a&&e.ui.addRichCombo("Format",{label:n.label,title:n.panelTitle,toolbar:"styles,20",allowedContent:r,panel:{css:[CKEDITOR.skin.getPath("editor")].concat(t.contentsCss),multiSelect:!1,attributes:{"aria-label":n.panelTitle}},init:function(){
this.startGroup(n.panelTitle);
for(var e in o){
var t=n["tag_"+e];
this.add(e,o[e].buildPreview(t),t);
}
},onClick:function(t){
e.focus(),e.fire("saveSnapshot");
var n=o[t],i=e.elementPath();
e[n.checkActive(i,e)?"removeStyle":"applyStyle"](n),setTimeout(function(){
e.fire("saveSnapshot");
},0);
},onRender:function(){
e.on("selectionChange",function(t){
var n=this.getValue(),i=t.data.path;
this.refresh();
for(var a in o){
if(o[a].checkActive(i,e)){
return void (a!=n&&this.setValue(a,e.lang.format["tag_"+a]));
}
}
this.setValue("");
},this);
},onOpen:function(){
this.showAll();
for(var t in o){
var n=o[t];
e.activeFilter.check(n)||this.hideItem(t);
}
},refresh:function(){
var t=e.elementPath();
if(t){
if(!t.isContextFor("p")){
return void this.setState(CKEDITOR.TRISTATE_DISABLED);
}
for(var n in o){
if(e.activeFilter.check(o[n])){
return;
}
}
this.setState(CKEDITOR.TRISTATE_DISABLED);
}
}});
}
}}),CKEDITOR.config.format_tags="p;h1;h2;h3;h4;h5;h6;pre;address;div",CKEDITOR.config.format_p={element:"p"},CKEDITOR.config.format_div={element:"div"},CKEDITOR.config.format_pre={element:"pre"},CKEDITOR.config.format_address={element:"address"},CKEDITOR.config.format_h1={element:"h1"},CKEDITOR.config.format_h2={element:"h2"},CKEDITOR.config.format_h3={element:"h3"},CKEDITOR.config.format_h4={element:"h4"},CKEDITOR.config.format_h5={element:"h5"},CKEDITOR.config.format_h6={element:"h6"},CKEDITOR.plugins.add("forms",{requires:"dialog,fakeobjects",onLoad:function(){
CKEDITOR.addCss(".cke_editable form{border: 1px dotted #FF0000;padding: 2px;}\n"),CKEDITOR.addCss("img.cke_hidden{background-image: url("+CKEDITOR.getUrl(this.path+"images/hiddenfield.gif")+");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 16px !important;height: 16px !important;}");
},init:function(e){
var t=e.lang,n=0,i={email:1,password:1,search:1,tel:1,text:1,url:1},o={checkbox:"input[type,name,checked,required]",radio:"input[type,name,checked,required]",textfield:"input[type,name,value,size,maxlength,required]",textarea:"textarea[cols,rows,name,required]",select:"select[name,size,multiple,required]; option[value,selected]",button:"input[type,name,value]",form:"form[action,name,id,enctype,target,method]",hiddenfield:"input[type,name,value]",imagebutton:"input[type,alt,src]{width,height,border,border-width,border-style,margin,float}"},a={checkbox:"input",radio:"input",textfield:"input",textarea:"textarea",select:"select",button:"input",form:"form",hiddenfield:"input",imagebutton:"input"},r=function(i,r,s){
var l={allowedContent:o[r],requiredContent:a[r]};
"form"==r&&(l.context="form"),e.addCommand(r,new CKEDITOR.dialogCommand(r,l)),e.ui.addButton&&e.ui.addButton(i,{label:t.common[i.charAt(0).toLowerCase()+i.slice(1)],command:r,toolbar:"forms,"+(n+=10)}),CKEDITOR.dialog.add(r,s);
},s=this.path+"dialogs/";
!e.blockless&&r("Form","form",s+"form.js"),r("Checkbox","checkbox",s+"checkbox.js"),r("Radio","radio",s+"radio.js"),r("TextField","textfield",s+"textfield.js"),r("Textarea","textarea",s+"textarea.js"),r("Select","select",s+"select.js"),r("Button","button",s+"button.js");
var l=e.plugins.image;
if(l&&!e.plugins.image2&&r("ImageButton","imagebutton",CKEDITOR.plugins.getPath("image")+"dialogs/image.js"),r("HiddenField","hiddenfield",s+"hiddenfield.js"),e.addMenuItems){
var d={checkbox:{label:t.forms.checkboxAndRadio.checkboxTitle,command:"checkbox",group:"checkbox"},radio:{label:t.forms.checkboxAndRadio.radioTitle,command:"radio",group:"radio"},textfield:{label:t.forms.textfield.title,command:"textfield",group:"textfield"},hiddenfield:{label:t.forms.hidden.title,command:"hiddenfield",group:"hiddenfield"},button:{label:t.forms.button.title,command:"button",group:"button"},select:{label:t.forms.select.title,command:"select",group:"select"},textarea:{label:t.forms.textarea.title,command:"textarea",group:"textarea"}};
l&&(d.imagebutton={label:t.image.titleButton,command:"imagebutton",group:"imagebutton"}),!e.blockless&&(d.form={label:t.forms.form.menu,command:"form",group:"form"}),e.addMenuItems(d);
}
e.contextMenu&&(!e.blockless&&e.contextMenu.addListener(function(e,t,n){
var i=n.contains("form",1);
return i&&!i.isReadOnly()?{form:CKEDITOR.TRISTATE_OFF}:void 0;
}),e.contextMenu.addListener(function(e){
if(e&&!e.isReadOnly()){
var t=e.getName();
if("select"==t){
return {select:CKEDITOR.TRISTATE_OFF};
}
if("textarea"==t){
return {textarea:CKEDITOR.TRISTATE_OFF};
}
if("input"==t){
var n=e.getAttribute("type")||"text";
switch(n){
case "button":
case "submit":
case "reset":
return {button:CKEDITOR.TRISTATE_OFF};
case "checkbox":
return {checkbox:CKEDITOR.TRISTATE_OFF};
case "radio":
return {radio:CKEDITOR.TRISTATE_OFF};
case "image":
return l?{imagebutton:CKEDITOR.TRISTATE_OFF}:null;
}
if(i[n]){
return {textfield:CKEDITOR.TRISTATE_OFF};
}
}
if("img"==t&&"hiddenfield"==e.data("cke-real-element-type")){
return {hiddenfield:CKEDITOR.TRISTATE_OFF};
}
}
})),e.on("doubleclick",function(t){
var n=t.data.element;
if(!e.blockless&&n.is("form")){
t.data.dialog="form";
}else{
if(n.is("select")){
t.data.dialog="select";
}else{
if(n.is("textarea")){
t.data.dialog="textarea";
}else{
if(n.is("img")&&"hiddenfield"==n.data("cke-real-element-type")){
t.data.dialog="hiddenfield";
}else{
if(n.is("input")){
var o=n.getAttribute("type")||"text";
switch(o){
case "button":
case "submit":
case "reset":
t.data.dialog="button";
break;
case "checkbox":
t.data.dialog="checkbox";
break;
case "radio":
t.data.dialog="radio";
break;
case "image":
t.data.dialog="imagebutton";
}
i[o]&&(t.data.dialog="textfield");
}
}
}
}
}
});
},afterInit:function(e){
var t=e.dataProcessor,n=t&&t.htmlFilter,i=t&&t.dataFilter;
CKEDITOR.env.ie&&n&&n.addRules({elements:{input:function(e){
var t=e.attributes,n=t.type;
n||(t.type="text"),("checkbox"==n||"radio"==n)&&"on"==t.value&&delete t.value;
}}},{applyToAll:!0}),i&&i.addRules({elements:{input:function(t){
return "hidden"==t.attributes.type?e.createFakeParserElement(t,"cke_hidden","hiddenfield"):void 0;
}}},{applyToAll:!0});
}}),function(){
var e={canUndo:!1,exec:function(e){
var t=e.document.createElement("hr");
e.insertElement(t);
},allowedContent:"hr",requiredContent:"hr"},t="horizontalrule";
CKEDITOR.plugins.add(t,{init:function(n){
n.blockless||(n.addCommand(t,e),n.ui.addButton&&n.ui.addButton("HorizontalRule",{label:n.lang.horizontalrule.toolbar,command:t,toolbar:"insert,40"}));
}});
}(),CKEDITOR.plugins.add("htmlwriter",{init:function(e){
var t=new CKEDITOR.htmlWriter;
t.forceSimpleAmpersand=e.config.forceSimpleAmpersand,t.indentationChars=e.config.dataIndentationChars||"\t",e.dataProcessor.writer=t;
}}),CKEDITOR.htmlWriter=CKEDITOR.tools.createClass({base:CKEDITOR.htmlParser.basicWriter,$:function(){
this.base(),this.indentationChars="\t",this.selfClosingEnd=" />",this.lineBreakChars="\n",this.sortAttributes=1,this._.indent=0,this._.indentation="",this._.inPre=0,this._.rules={};
var e=CKEDITOR.dtd;
for(var t in CKEDITOR.tools.extend({},e.$nonBodyContent,e.$block,e.$listItem,e.$tableContent)){
this.setRules(t,{indent:!e[t]["#"],breakBeforeOpen:1,breakBeforeClose:!e[t]["#"],breakAfterClose:1,needsSpace:t in e.$block&&!(t in {li:1,dt:1,dd:1})});
}
this.setRules("br",{breakAfterOpen:1}),this.setRules("title",{indent:0,breakAfterOpen:0}),this.setRules("style",{indent:0,breakBeforeClose:1}),this.setRules("pre",{breakAfterOpen:1,indent:0});
},proto:{openTag:function(e){
var t=this._.rules[e];
this._.afterCloser&&t&&t.needsSpace&&this._.needsSpace&&this._.output.push("\n"),this._.indent?this.indentation():t&&t.breakBeforeOpen&&(this.lineBreak(),this.indentation()),this._.output.push("<",e),this._.afterCloser=0;
},openTagClose:function(e,t){
var n=this._.rules[e];
t?(this._.output.push(this.selfClosingEnd),n&&n.breakAfterClose&&(this._.needsSpace=n.needsSpace)):(this._.output.push(">"),n&&n.indent&&(this._.indentation+=this.indentationChars)),n&&n.breakAfterOpen&&this.lineBreak(),"pre"==e&&(this._.inPre=1);
},attribute:function(e,t){
"string"==typeof t&&(this.forceSimpleAmpersand&&(t=t.replace(/&amp;/g,"&")),t=CKEDITOR.tools.htmlEncodeAttr(t)),this._.output.push(" ",e,"=\"",t,"\"");
},closeTag:function(e){
var t=this._.rules[e];
t&&t.indent&&(this._.indentation=this._.indentation.substr(this.indentationChars.length)),this._.indent?this.indentation():t&&t.breakBeforeClose&&(this.lineBreak(),this.indentation()),this._.output.push("</",e,">"),"pre"==e&&(this._.inPre=0),t&&t.breakAfterClose&&(this.lineBreak(),this._.needsSpace=t.needsSpace),this._.afterCloser=1;
},text:function(e){
this._.indent&&(this.indentation(),!this._.inPre&&(e=CKEDITOR.tools.ltrim(e))),this._.output.push(e);
},comment:function(e){
this._.indent&&this.indentation(),this._.output.push("<!--",e,"-->");
},lineBreak:function(){
!this._.inPre&&this._.output.length>0&&this._.output.push(this.lineBreakChars),this._.indent=1;
},indentation:function(){
!this._.inPre&&this._.indentation&&this._.output.push(this._.indentation),this._.indent=0;
},reset:function(){
this._.output=[],this._.indent=0,this._.indentation="",this._.afterCloser=0,this._.inPre=0;
},setRules:function(e,t){
var n=this._.rules[e];
n?CKEDITOR.tools.extend(n,t,!0):this._.rules[e]=t;
}}}),function(){
CKEDITOR.plugins.add("iframe",{requires:"dialog,fakeobjects",onLoad:function(){
CKEDITOR.addCss("img.cke_iframe{background-image: url("+CKEDITOR.getUrl(this.path+"images/placeholder.png")+");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 80px;height: 80px;}");
},init:function(e){
var t="iframe",n=e.lang.iframe,i="iframe[align,longdesc,frameborder,height,name,scrolling,src,title,width]";
e.plugins.dialogadvtab&&(i+=";iframe"+e.plugins.dialogadvtab.allowedContent({id:1,classes:1,styles:1})),CKEDITOR.dialog.add(t,this.path+"dialogs/iframe.js"),e.addCommand(t,new CKEDITOR.dialogCommand(t,{allowedContent:i,requiredContent:"iframe"})),e.ui.addButton&&e.ui.addButton("Iframe",{label:n.toolbar,command:t,toolbar:"insert,80"}),e.on("doubleclick",function(e){
var t=e.data.element;
t.is("img")&&"iframe"==t.data("cke-real-element-type")&&(e.data.dialog="iframe");
}),e.addMenuItems&&e.addMenuItems({iframe:{label:n.title,command:"iframe",group:"image"}}),e.contextMenu&&e.contextMenu.addListener(function(e){
return e&&e.is("img")&&"iframe"==e.data("cke-real-element-type")?{iframe:CKEDITOR.TRISTATE_OFF}:void 0;
});
},afterInit:function(e){
var t=e.dataProcessor,n=t&&t.dataFilter;
n&&n.addRules({elements:{iframe:function(t){
return e.createFakeParserElement(t,"cke_iframe","iframe",!0);
}}});
}});
}(),function(){
function e(e,t){
if(!t){
var n=e.getSelection();
t=n.getSelectedElement();
}
return t&&t.is("img")&&!t.data("cke-realelement")&&!t.isReadOnly()?t:void 0;
};
function t(e){
var t=e.getStyle("float");
return ("inherit"==t||"none"==t)&&(t=0),t||(t=e.getAttribute("align")),t;
};
CKEDITOR.plugins.add("image",{requires:"dialog",init:function(t){
if(!t.plugins.image2){
var n="image";
CKEDITOR.dialog.add(n,this.path+"dialogs/image.js");
var i="img[alt,!src]{border-style,border-width,float,height,margin,margin-bottom,margin-left,margin-right,margin-top,width}",o="img[alt,src]";
CKEDITOR.dialog.isTabEnabled(t,n,"advanced")&&(i="img[alt,dir,id,lang,longdesc,!src,title]{*}(*)"),t.addCommand(n,new CKEDITOR.dialogCommand(n,{allowedContent:i,requiredContent:o,contentTransformations:[["img{width}: sizeToStyle","img[width]: sizeToAttribute"],["img{float}: alignmentToStyle","img[align]: alignmentToAttribute"]]})),t.ui.addButton&&t.ui.addButton("Image",{label:t.lang.common.image,command:n,toolbar:"insert,10"}),t.on("doubleclick",function(e){
var t=e.data.element;
!t.is("img")||t.data("cke-realelement")||t.isReadOnly()||(e.data.dialog="image");
}),t.addMenuItems&&t.addMenuItems({image:{label:t.lang.image.menu,command:"image",group:"image"}}),t.contextMenu&&t.contextMenu.addListener(function(n){
return e(t,n)?{image:CKEDITOR.TRISTATE_OFF}:void 0;
});
}
},afterInit:function(n){
function i(i){
var o=n.getCommand("justify"+i);
o&&(("left"==i||"right"==i)&&o.on("exec",function(o){
var a,r=e(n);
r&&(a=t(r),a==i?(r.removeStyle("float"),i==t(r)&&r.removeAttribute("align")):r.setStyle("float",i),o.cancel());
}),o.on("refresh",function(o){
var a,r=e(n);
r&&(a=t(r),this.setState(a==i?CKEDITOR.TRISTATE_ON:"right"==i||"left"==i?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED),o.cancel());
}));
};
n.plugins.image2||(i("left"),i("right"),i("center"),i("block"));
}});
}(),CKEDITOR.config.image_removeLinkByEmptyURL=!0,function(){
"use strict";
function e(e,i){
var o,a;
i.on("refresh",function(e){
var i=[t];
for(var o in e.data.states){
i.push(e.data.states[o]);
}
this.setState(CKEDITOR.tools.search(i,n)?n:t);
},i,null,100),i.on("exec",function(t){
o=e.getSelection(),a=o.createBookmarks(1),t.data||(t.data={}),t.data.done=!1;
},i,null,0),i.on("exec",function(){
e.forceNextSelectionCheck(),o.selectBookmarks(a);
},i,null,100);
};
var t=CKEDITOR.TRISTATE_DISABLED,n=CKEDITOR.TRISTATE_OFF;
CKEDITOR.plugins.add("indent",{init:function(t){
var n=CKEDITOR.plugins.indent.genericDefinition;
e(t,t.addCommand("indent",new n(!0))),e(t,t.addCommand("outdent",new n)),t.ui.addButton&&(t.ui.addButton("Indent",{label:t.lang.indent.indent,command:"indent",directional:!0,toolbar:"indent,20"}),t.ui.addButton("Outdent",{label:t.lang.indent.outdent,command:"outdent",directional:!0,toolbar:"indent,10"})),t.on("dirChanged",function(e){
var n=t.createRange(),i=e.data.node;
n.setStartBefore(i),n.setEndAfter(i);
for(var o,a=new CKEDITOR.dom.walker(n);o=a.next();){
if(o.type==CKEDITOR.NODE_ELEMENT){
if(!o.equals(i)&&o.getDirection()){
n.setStartAfter(o),a=new CKEDITOR.dom.walker(n);
continue;
}
var r=t.config.indentClasses;
if(r){
for(var s="ltr"==e.data.dir?["_rtl",""]:["","_rtl"],l=0;l<r.length;l++){
o.hasClass(r[l]+s[0])&&(o.removeClass(r[l]+s[0]),o.addClass(r[l]+s[1]));
}
}
var d=o.getStyle("margin-right"),c=o.getStyle("margin-left");
d?o.setStyle("margin-left",d):o.removeStyle("margin-left"),c?o.setStyle("margin-right",c):o.removeStyle("margin-right");
}
}
});
}}),CKEDITOR.plugins.indent={genericDefinition:function(e){
this.isIndent=!!e,this.startDisabled=!this.isIndent;
},specificDefinition:function(e,t,n){
this.name=t,this.editor=e,this.jobs={},this.enterBr=e.config.enterMode==CKEDITOR.ENTER_BR,this.isIndent=!!n,this.relatedGlobal=n?"indent":"outdent",this.indentKey=n?9:CKEDITOR.SHIFT+9,this.database={};
},registerCommands:function(e,t){
e.on("pluginsLoaded",function(){
for(var e in t){
!function(e,t){
var n=e.getCommand(t.relatedGlobal);
for(var i in t.jobs){
n.on("exec",function(n){
n.data.done||(e.fire("lockSnapshot"),t.execJob(e,i)&&(n.data.done=!0),e.fire("unlockSnapshot"),CKEDITOR.dom.element.clearAllMarkers(t.database));
},this,null,i),n.on("refresh",function(n){
n.data.states||(n.data.states={}),n.data.states[t.name+"@"+i]=t.refreshJob(e,i,n.data.path);
},this,null,i);
}
e.addFeature(t);
}(this,t[e]);
}
});
}},CKEDITOR.plugins.indent.genericDefinition.prototype={context:"p",exec:function(){
}},CKEDITOR.plugins.indent.specificDefinition.prototype={execJob:function(e,n){
var i=this.jobs[n];
return i.state!=t?i.exec.call(this,e):void 0;
},refreshJob:function(e,n,i){
var o=this.jobs[n];
return e.activeFilter.checkFeature(this)?o.state=o.refresh.call(this,e,i):o.state=t,o.state;
},getContext:function(e){
return e.contains(this.context);
}};
}(),function(){
"use strict";
function e(e){
function i(t){
for(var i=o.startContainer,l=o.endContainer;i&&!i.getParent().equals(t);){
i=i.getParent();
}
for(;l&&!l.getParent().equals(t);){
l=l.getParent();
}
if(!i||!l){
return !1;
}
for(var d=i,c=[],u=!1;!u;){
d.equals(l)&&(u=!0),c.push(d),d=d.getNext();
}
if(c.length<1){
return !1;
}
for(var h=t.getParents(!0),f=0;f<h.length;f++){
if(h[f].getName&&s[h[f].getName()]){
t=h[f];
break;
}
}
var m=a.isIndent?1:-1,g=c[0],p=c[c.length-1],E=CKEDITOR.plugins.list.listToArray(t,r),T=E[p.getCustomData("listarray_index")].indent;
for(f=g.getCustomData("listarray_index");f<=p.getCustomData("listarray_index");f++){
if(E[f].indent+=m,m>0){
var C=E[f].parent;
E[f].parent=new CKEDITOR.dom.element(C.getName(),C.getDocument());
}
}
for(f=p.getCustomData("listarray_index")+1;f<E.length&&E[f].indent>T;f++){
E[f].indent+=m;
}
var v=CKEDITOR.plugins.list.arrayToList(E,r,null,e.config.enterMode,t.getDirection());
if(!a.isIndent){
var I;
if((I=t.getParent())&&I.is("li")){
var O,D=v.listNode.getChildren(),b=[],R=D.count();
for(f=R-1;f>=0;f--){
(O=D.getItem(f))&&O.is&&O.is("li")&&b.push(O);
}
}
}
if(v&&v.listNode.replace(t),b&&b.length){
for(f=0;f<b.length;f++){
for(var y=b[f],K=y;(K=K.getNext())&&K.is&&K.getName() in s;){
CKEDITOR.env.needsNbspFiller&&!y.getFirst(n)&&y.append(o.document.createText("\xa0")),y.append(K);
}
y.insertAfter(I);
}
}
return v&&e.fire("contentDomInvalidated"),!0;
};
for(var o,a=this,r=this.database,s=this.context,l=e.getSelection(),d=l&&l.getRanges(),c=d.createIterator();o=c.getNextRange();){
for(var u=o.getCommonAncestor();u&&(u.type!=CKEDITOR.NODE_ELEMENT||!s[u.getName()]);){
if(e.editable().equals(u)){
u=!1;
break;
}
u=u.getParent();
}
if(u||(u=o.startPath().contains(s))&&o.setEndAt(u,CKEDITOR.POSITION_BEFORE_END),!u){
var h=o.getEnclosedNode();
h&&h.type==CKEDITOR.NODE_ELEMENT&&h.getName() in s&&(o.setStartAt(h,CKEDITOR.POSITION_AFTER_START),o.setEndAt(h,CKEDITOR.POSITION_BEFORE_END),u=h);
}
if(u&&o.startContainer.type==CKEDITOR.NODE_ELEMENT&&o.startContainer.getName() in s){
var f=new CKEDITOR.dom.walker(o);
f.evaluator=t,o.startContainer=f.next();
}
if(u&&o.endContainer.type==CKEDITOR.NODE_ELEMENT&&o.endContainer.getName() in s&&(f=new CKEDITOR.dom.walker(o),f.evaluator=t,o.endContainer=f.previous()),u){
return i(u);
}
}
return 0;
};
function t(e){
return e.type==CKEDITOR.NODE_ELEMENT&&e.is("li");
};
function n(e){
return i(e)&&o(e);
};
var i=CKEDITOR.dom.walker.whitespaces(!0),o=CKEDITOR.dom.walker.bookmark(!1,!0),a=CKEDITOR.TRISTATE_DISABLED,r=CKEDITOR.TRISTATE_OFF;
CKEDITOR.plugins.add("indentlist",{requires:"indent",init:function(t){
function n(t){
i.specificDefinition.apply(this,arguments),this.requiredContent=["ul","ol"],t.on("key",function(e){
if("wysiwyg"==t.mode&&e.data.keyCode==this.indentKey){
var n=this.getContext(t.elementPath());
if(n){
if(this.isIndent&&CKEDITOR.plugins.indentList.firstItemInPath(this.context,t.elementPath(),n)){
return;
}
t.execCommand(this.relatedGlobal),e.cancel();
}
}
},this),this.jobs[this.isIndent?10:30]={refresh:this.isIndent?function(e,t){
var n=this.getContext(t),i=CKEDITOR.plugins.indentList.firstItemInPath(this.context,t,n);
return n&&this.isIndent&&!i?r:a;
}:function(e,t){
var n=this.getContext(t);
return !n||this.isIndent?a:r;
},exec:CKEDITOR.tools.bind(e,this)};
};
var i=CKEDITOR.plugins.indent;
i.registerCommands(t,{indentlist:new n(t,"indentlist",!0),outdentlist:new n(t,"outdentlist")}),CKEDITOR.tools.extend(n.prototype,i.specificDefinition.prototype,{context:{ol:1,ul:1}});
}}),CKEDITOR.plugins.indentList={},CKEDITOR.plugins.indentList.firstItemInPath=function(e,n,i){
var o=n.contains(t);
return i||(i=n.contains(e)),i&&o&&o.equals(i.getFirst(t));
};
}(),function(){
"use strict";
function e(e,t,i){
if(!e.getCustomData("indent_processed")){
var o=this.editor,a=this.isIndent;
if(t){
var r=e.$.className.match(this.classNameRegex),s=0;
if(r&&(r=r[1],s=CKEDITOR.tools.indexOf(t,r)+1),(s+=a?1:-1)<0){
return;
}
s=Math.min(s,t.length),s=Math.max(s,0),e.$.className=CKEDITOR.tools.ltrim(e.$.className.replace(this.classNameRegex,"")),s>0&&e.addClass(t[s-1]);
}else{
var l=n(e,i),d=parseInt(e.getStyle(l),10),c=o.config.indentOffset||40;
if(isNaN(d)&&(d=0),d+=(a?1:-1)*c,0>d){
return;
}
d=Math.max(d,0),d=Math.ceil(d/c)*c,e.setStyle(l,d?d+(o.config.indentUnit||"px"):""),""===e.getAttribute("style")&&e.removeAttribute("style");
}
CKEDITOR.dom.element.setMarker(this.database,e,"indent_processed",1);
}
};
function t(e,t){
var n=e.$.className.match(this.classNameRegex),i=this.isIndent;
return n?i?n[1]!=t.slice(-1):!0:i;
};
function n(e,t){
return "ltr"==(t||e.getComputedStyle("direction"))?"margin-left":"margin-right";
};
function i(e){
return parseInt(e.getStyle(n(e)),10);
};
var o=CKEDITOR.dtd.$listItem,a=CKEDITOR.dtd.$list,r=CKEDITOR.TRISTATE_DISABLED,s=CKEDITOR.TRISTATE_OFF;
CKEDITOR.plugins.add("indentblock",{requires:"indent",init:function(n){
function l(){
d.specificDefinition.apply(this,arguments),this.allowedContent={"div h1 h2 h3 h4 h5 h6 ol p pre ul":{propertiesOnly:!0,styles:c?null:"margin-left,margin-right",classes:c||null}},this.enterBr&&(this.allowedContent.div=!0),this.requiredContent=(this.enterBr?"div":"p")+(c?"("+c.join(",")+")":"{margin-left}"),this.jobs={20:{refresh:function(e,n){
var a=n.block||n.blockLimit;
if(!a.is(o)){
var l=a.getAscendant(o);
a=l&&n.contains(l)||a;
}
return a.is(o)&&(a=a.getParent()),this.enterBr||this.getContext(n)?c?t.call(this,a,c)?s:r:this.isIndent?s:a?CKEDITOR[(i(a)||0)<=0?"TRISTATE_DISABLED":"TRISTATE_OFF"]:r:r;
},exec:function(t){
var n,i=t.getSelection(),o=i&&i.getRanges()[0];
if(n=t.elementPath().contains(a)){
e.call(this,n,c);
}else{
var r,s=o.createIterator(),l=t.config.enterMode;
for(s.enforceRealBlocks=!0,s.enlargeBr=l!=CKEDITOR.ENTER_BR;r=s.getNextParagraph(l==CKEDITOR.ENTER_P?"p":"div");){
r.isReadOnly()||e.call(this,r,c);
}
}
return !0;
}}};
};
var d=CKEDITOR.plugins.indent,c=n.config.indentClasses;
d.registerCommands(n,{indentblock:new l(n,"indentblock",!0),outdentblock:new l(n,"outdentblock")}),CKEDITOR.tools.extend(l.prototype,d.specificDefinition.prototype,{context:{div:1,dl:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,ul:1,ol:1,p:1,pre:1,table:1},classNameRegex:c?new RegExp("(?:^|\\s+)("+c.join("|")+")(?=$|\\s)"):null});
}});
}(),function(){
function e(e,t){
t=void 0===t||t;
var n;
if(t){
n=e.getComputedStyle("text-align");
}else{
for(;!e.hasAttribute||!e.hasAttribute("align")&&!e.getStyle("text-align");){
var i=e.getParent();
if(!i){
break;
}
e=i;
}
n=e.getStyle("text-align")||e.getAttribute("align")||"";
}
return n&&(n=n.replace(/(?:-(?:moz|webkit)-)?(?:start|auto)/i,"")),!n&&t&&(n="rtl"==e.getComputedStyle("direction")?"right":"left"),n;
};
function t(e,t,n){
this.editor=e,this.name=t,this.value=n,this.context="p";
var i=e.config.justifyClasses,o=e.config.enterMode==CKEDITOR.ENTER_P?"p":"div";
if(i){
switch(n){
case "left":
this.cssClassName=i[0];
break;
case "center":
this.cssClassName=i[1];
break;
case "right":
this.cssClassName=i[2];
break;
case "justify":
this.cssClassName=i[3];
}
this.cssClassRegex=new RegExp("(?:^|\\s+)(?:"+i.join("|")+")(?=$|\\s)"),this.requiredContent=o+"("+this.cssClassName+")";
}else{
this.requiredContent=o+"{text-align}";
}
this.allowedContent={"caption div h1 h2 h3 h4 h5 h6 p pre td th li":{propertiesOnly:!0,styles:this.cssClassName?null:"text-align",classes:this.cssClassName||null}},e.config.enterMode==CKEDITOR.ENTER_BR&&(this.allowedContent.div=!0);
};
function n(e){
var t=e.editor,n=t.createRange();
n.setStartBefore(e.data.node),n.setEndAfter(e.data.node);
for(var i,o=new CKEDITOR.dom.walker(n);i=o.next();){
if(i.type==CKEDITOR.NODE_ELEMENT){
if(!i.equals(e.data.node)&&i.getDirection()){
n.setStartAfter(i),o=new CKEDITOR.dom.walker(n);
continue;
}
var a=t.config.justifyClasses;
a&&(i.hasClass(a[0])?(i.removeClass(a[0]),i.addClass(a[2])):i.hasClass(a[2])&&(i.removeClass(a[2]),i.addClass(a[0])));
var r="text-align",s=i.getStyle(r);
"left"==s?i.setStyle(r,"right"):"right"==s&&i.setStyle(r,"left");
}
}
};
t.prototype={exec:function(t){
var n=t.getSelection(),i=t.config.enterMode;
if(n){
var o,a,r=n.createBookmarks(),s=n.getRanges(),l=this.cssClassName,d=t.config.useComputedState;
d=void 0===d||d;
for(var c=s.length-1;c>=0;c--){
for(o=s[c].createIterator(),o.enlargeBr=i!=CKEDITOR.ENTER_BR;a=o.getNextParagraph(i==CKEDITOR.ENTER_P?"p":"div");){
if(!a.isReadOnly()){
a.removeAttribute("align"),a.removeStyle("text-align");
var u=l&&(a.$.className=CKEDITOR.tools.ltrim(a.$.className.replace(this.cssClassRegex,""))),h=this.state==CKEDITOR.TRISTATE_OFF&&(!d||e(a,!0)!=this.value);
l?h?a.addClass(l):u||a.removeAttribute("class"):h&&a.setStyle("text-align",this.value);
}
}
}
t.focus(),t.forceNextSelectionCheck(),n.selectBookmarks(r);
}
},refresh:function(t,n){
var i=n.block||n.blockLimit;
this.setState("body"!=i.getName()&&e(i,this.editor.config.useComputedState)==this.value?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF);
}},CKEDITOR.plugins.add("justify",{init:function(e){
if(!e.blockless){
var i=new t(e,"justifyleft","left"),o=new t(e,"justifycenter","center"),a=new t(e,"justifyright","right"),r=new t(e,"justifyblock","justify");
e.addCommand("justifyleft",i),e.addCommand("justifycenter",o),e.addCommand("justifyright",a),e.addCommand("justifyblock",r),e.ui.addButton&&(e.ui.addButton("JustifyLeft",{label:e.lang.justify.left,command:"justifyleft",toolbar:"align,10"}),e.ui.addButton("JustifyCenter",{label:e.lang.justify.center,command:"justifycenter",toolbar:"align,20"}),e.ui.addButton("JustifyRight",{label:e.lang.justify.right,command:"justifyright",toolbar:"align,30"}),e.ui.addButton("JustifyBlock",{label:e.lang.justify.block,command:"justifyblock",toolbar:"align,40"})),e.on("dirChanged",n);
}
}});
}(),CKEDITOR.plugins.add("menubutton",{requires:"button,menu",onLoad:function(){
var e=function(e){
var t=this._,n=t.menu;
if(t.state!==CKEDITOR.TRISTATE_DISABLED){
if(t.on&&n){
return void n.hide();
}
t.previousState=t.state,n||(n=t.menu=new CKEDITOR.menu(e,{panel:{className:"cke_menu_panel",attributes:{"aria-label":e.lang.common.options}}}),n.onHide=CKEDITOR.tools.bind(function(){
var n=this.command?e.getCommand(this.command).modes:this.modes;
this.setState(!n||n[e.mode]?t.previousState:CKEDITOR.TRISTATE_DISABLED),t.on=0;
},this),this.onMenu&&n.addListener(this.onMenu)),this.setState(CKEDITOR.TRISTATE_ON),t.on=1,setTimeout(function(){
n.show(CKEDITOR.document.getById(t.id),4);
},0);
}
};
CKEDITOR.ui.menuButton=CKEDITOR.tools.createClass({base:CKEDITOR.ui.button,$:function(t){
delete t.panel,this.base(t),this.hasArrow=!0,this.click=e;
},statics:{handler:{create:function(e){
return new CKEDITOR.ui.menuButton(e);
}}}});
},beforeInit:function(e){
e.ui.addHandler(CKEDITOR.UI_MENUBUTTON,CKEDITOR.ui.menuButton.handler);
}}),CKEDITOR.UI_MENUBUTTON="menubutton",function(){
var e="span[!lang,!dir]",t="span[lang,dir]";
CKEDITOR.plugins.add("language",{requires:"menubutton",init:function(n){
var i,o,a,r,s=n.config.language_list||["ar:Arabic:rtl","fr:French","es:Spanish"],l=this,d=n.lang.language,c={};
for(n.addCommand("language",{allowedContent:e,requiredContent:t,contextSensitive:!0,exec:function(e,t){
var n=c["language_"+t];
n&&e[n.style.checkActive(e.elementPath(),e)?"removeStyle":"applyStyle"](n.style);
},refresh:function(e){
this.setState(l.getCurrentLangElement(e)?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF);
}}),r=0;r<s.length;r++){
i=s[r].split(":"),o=i[0],a="language_"+o,c[a]={label:i[1],langId:o,group:"language",order:r,ltr:"rtl"!=(""+i[2]).toLowerCase(),onClick:function(){
n.execCommand("language",this.langId);
},role:"menuitemcheckbox"},c[a].style=new CKEDITOR.style({element:"span",attributes:{lang:o,dir:c[a].ltr?"ltr":"rtl"}});
}
c.language_remove={label:d.remove,group:"language_remove",state:CKEDITOR.TRISTATE_DISABLED,order:c.length,onClick:function(){
var e=l.getCurrentLangElement(n);
e&&n.execCommand("language",e.getAttribute("lang"));
}},n.addMenuGroup("language",1),n.addMenuGroup("language_remove"),n.addMenuItems(c),n.ui.add("Language",CKEDITOR.UI_MENUBUTTON,{label:d.button,allowedContent:e,requiredContent:t,toolbar:"bidi,30",command:"language",onMenu:function(){
var e={},t=l.getCurrentLangElement(n);
for(var i in c){
e[i]=CKEDITOR.TRISTATE_OFF;
}
return e.language_remove=t?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,t&&(e["language_"+t.getAttribute("lang")]=CKEDITOR.TRISTATE_ON),e;
}});
},getCurrentLangElement:function(e){
var t,n,i=e.elementPath(),o=i&&i.elements;
if(i){
for(var a=0;a<o.length;a++){
t=o[a],!n&&"span"==t.getName()&&t.hasAttribute("dir")&&t.hasAttribute("lang")&&(n=t);
}
}
return n;
}});
}(),function(){
function e(e){
return e.replace(/\\'/g,"'");
};
function t(e){
return e.replace(/'/g,"\\$&");
};
function n(e){
for(var t,n=e.length,i=[],o=0;n>o;o++){
t=e.charCodeAt(o),i.push(t);
}
return "String.fromCharCode("+i.join(",")+")";
};
function i(e,n){
var i,o,a,r=e.plugins.link,s=r.compiledProtectionFunction.name,l=r.compiledProtectionFunction.params;
a=[s,"("];
for(var d=0;d<l.length;d++){
i=l[d].toLowerCase(),o=n[i],d>0&&a.push(","),a.push("'",o?t(encodeURIComponent(n[i])):"","'");
}
return a.push(")"),a.join("");
};
function o(e){
var t,n=e.config.emailProtection||"";
return n&&"encode"!=n&&(t={},n.replace(/^([^(]+)\(([^)]+)\)$/,function(e,n,i){
t.name=n,t.params=[],i.replace(/[^,\s]+/g,function(e){
t.params.push(e);
});
})),t;
};
CKEDITOR.plugins.add("link",{requires:"dialog,fakeobjects",onLoad:function(){
function e(e){
return i.replace(/%1/g,"rtl"==e?"right":"left").replace(/%2/g,"cke_contents_"+e);
};
var t=CKEDITOR.getUrl(this.path+"images"+(CKEDITOR.env.hidpi?"/hidpi":"")+"/anchor.png"),n="background:url("+t+") no-repeat %1 center;border:1px dotted #00f;background-size:16px;",i=".%2 a.cke_anchor,.%2 a.cke_anchor_empty,.cke_editable.%2 a[name],.cke_editable.%2 a[data-cke-saved-name]{"+n+"padding-%1:18px;cursor:auto;}.%2 img.cke_anchor{"+n+"width:16px;min-height:15px;height:1.15em;vertical-align:text-bottom;}";
CKEDITOR.addCss(e("ltr")+e("rtl"));
},init:function(e){
var t="a[!href]",n="a[href]";
CKEDITOR.dialog.isTabEnabled(e,"link","advanced")&&(t=t.replace("]",",accesskey,charset,dir,id,lang,name,rel,tabindex,title,type]{*}(*)")),CKEDITOR.dialog.isTabEnabled(e,"link","target")&&(t=t.replace("]",",target,onclick]")),e.addCommand("link",new CKEDITOR.dialogCommand("link",{allowedContent:t,requiredContent:n})),e.addCommand("anchor",new CKEDITOR.dialogCommand("anchor",{allowedContent:"a[!name,id]",requiredContent:"a[name]"})),e.addCommand("unlink",new CKEDITOR.unlinkCommand),e.addCommand("removeAnchor",new CKEDITOR.removeAnchorCommand),e.setKeystroke(CKEDITOR.CTRL+76,"link"),e.ui.addButton&&(e.ui.addButton("Link",{label:e.lang.link.toolbar,command:"link",toolbar:"links,10"}),e.ui.addButton("Unlink",{label:e.lang.link.unlink,command:"unlink",toolbar:"links,20"}),e.ui.addButton("Anchor",{label:e.lang.link.anchor.toolbar,command:"anchor",toolbar:"links,30"})),CKEDITOR.dialog.add("link",this.path+"dialogs/link.js"),CKEDITOR.dialog.add("anchor",this.path+"dialogs/anchor.js"),e.on("doubleclick",function(t){
var n=CKEDITOR.plugins.link.getSelectedLink(e)||t.data.element;
n.isReadOnly()||(n.is("a")?(t.data.dialog=!n.getAttribute("name")||n.getAttribute("href")&&n.getChildCount()?"link":"anchor",t.data.link=n):CKEDITOR.plugins.link.tryRestoreFakeAnchor(e,n)&&(t.data.dialog="anchor"));
},null,null,0),e.on("doubleclick",function(t){
t.data.dialog in {link:1,anchor:1}&&t.data.link&&e.getSelection().selectElement(t.data.link);
},null,null,20),e.addMenuItems&&e.addMenuItems({anchor:{label:e.lang.link.anchor.menu,command:"anchor",group:"anchor",order:1},removeAnchor:{label:e.lang.link.anchor.remove,command:"removeAnchor",group:"anchor",order:5},link:{label:e.lang.link.menu,command:"link",group:"link",order:1},unlink:{label:e.lang.link.unlink,command:"unlink",group:"link",order:5}}),e.contextMenu&&e.contextMenu.addListener(function(t){
if(!t||t.isReadOnly()){
return null;
}
var n=CKEDITOR.plugins.link.tryRestoreFakeAnchor(e,t);
if(!n&&!(n=CKEDITOR.plugins.link.getSelectedLink(e))){
return null;
}
var i={};
return n.getAttribute("href")&&n.getChildCount()&&(i={link:CKEDITOR.TRISTATE_OFF,unlink:CKEDITOR.TRISTATE_OFF}),n&&n.hasAttribute("name")&&(i.anchor=i.removeAnchor=CKEDITOR.TRISTATE_OFF),i;
}),this.compiledProtectionFunction=o(e);
},afterInit:function(e){
e.dataProcessor.dataFilter.addRules({elements:{a:function(t){
return t.attributes.name?t.children.length?null:e.createFakeParserElement(t,"cke_anchor","anchor"):null;
}}});
var t=e._.elementsPath&&e._.elementsPath.filters;
t&&t.push(function(t,n){
return "a"!=n||!CKEDITOR.plugins.link.tryRestoreFakeAnchor(e,t)&&(!t.getAttribute("name")||t.getAttribute("href")&&t.getChildCount())?void 0:"anchor";
});
}});
var a=/^javascript:/,r=/^mailto:([^?]+)(?:\?(.+))?$/,s=/subject=([^;?:@&=$,\/]*)/i,l=/body=([^;?:@&=$,\/]*)/i,d=/^#(.*)$/,c=/^((?:http|https|ftp|news):\/\/)?(.*)$/,u=/^(_(?:self|top|parent|blank))$/,h=/^javascript:void\(location\.href='mailto:'\+String\.fromCharCode\(([^)]+)\)(?:\+'(.*)')?\)$/,f=/^javascript:([^(]+)\(([^)]+)\)$/,m=/\s*window.open\(\s*this\.href\s*,\s*(?:'([^']*)'|null)\s*,\s*'([^']*)'\s*\)\s*;\s*return\s*false;*\s*/,g=/(?:^|,)([^=]+)=(\d+|yes|no)/gi,p={id:"advId",dir:"advLangDir",accessKey:"advAccessKey",name:"advName",lang:"advLangCode",tabindex:"advTabIndex",title:"advTitle",type:"advContentType","class":"advCSSClasses",charset:"advCharset",style:"advStyles",rel:"advRel"};
CKEDITOR.plugins.link={getSelectedLink:function(e){
var t=e.getSelection(),n=t.getSelectedElement();
if(n&&n.is("a")){
return n;
}
var i=t.getRanges()[0];
return i?(i.shrink(CKEDITOR.SHRINK_TEXT),e.elementPath(i.getCommonAncestor()).contains("a",1)):null;
},getEditorAnchors:function(e){
for(var t,n=e.editable(),i=n.isInline()&&!e.plugins.divarea?e.document:n,o=i.getElementsByTag("a"),a=i.getElementsByTag("img"),r=[],s=0;t=o.getItem(s++);){
(t.data("cke-saved-name")||t.hasAttribute("name"))&&r.push({name:t.data("cke-saved-name")||t.getAttribute("name"),id:t.getAttribute("id")});
}
for(s=0;t=a.getItem(s++);){
(t=this.tryRestoreFakeAnchor(e,t))&&r.push({name:t.getAttribute("name"),id:t.getAttribute("id")});
}
return r;
},fakeAnchor:!0,tryRestoreFakeAnchor:function(e,t){
if(t&&t.data("cke-real-element-type")&&"anchor"==t.data("cke-real-element-type")){
var n=e.restoreRealElement(t);
if(n.data("cke-saved-name")){
return n;
}
}
},parseLinkAttributes:function(t,n){
var i,o,E,T,C=n&&(n.data("cke-saved-href")||n.getAttribute("href"))||"",v=t.plugins.link.compiledProtectionFunction,I=t.config.emailProtection,O={};
if((i=C.match(a))&&("encode"==I?C=C.replace(h,function(t,n,i){
return i=i||"","mailto:"+String.fromCharCode.apply(String,n.split(","))+e(i);
}):I&&C.replace(f,function(t,n,i){
if(n==v.name){
O.type="email";
for(var o,a,r=O.email={},s=/[^,\s]+/g,l=/(^')|('$)/g,d=i.match(s),c=d.length,u=0;c>u;u++){
a=decodeURIComponent(e(d[u].replace(l,""))),o=v.params[u].toLowerCase(),r[o]=a;
}
r.address=[r.name,r.domain].join("@");
}
})),!O.type){
if(E=C.match(d)){
O.type="anchor",O.anchor={},O.anchor.name=O.anchor.id=E[1];
}else{
if(o=C.match(r)){
var D=C.match(s),b=C.match(l);
O.type="email";
var R=O.email={};
R.address=o[1],D&&(R.subject=decodeURIComponent(D[1])),b&&(R.body=decodeURIComponent(b[1]));
}else{
C&&(T=C.match(c))&&(O.type="url",O.url={},O.url.protocol=T[1],O.url.url=T[2]);
}
}
}
if(n){
var y=n.getAttribute("target");
if(y){
O.target={type:y.match(u)?y:"frame",name:y};
}else{
var K=n.data("cke-pa-onclick")||n.getAttribute("onclick"),_14=K&&K.match(m);
if(_14){
O.target={type:"popup",name:_14[1]};
for(var k;k=g.exec(_14[2]);){
"yes"!=k[2]&&"1"!=k[2]||k[1] in {height:1,width:1,top:1,left:1}?isFinite(k[2])&&(O.target[k[1]]=k[2]):O.target[k[1]]=!0;
}
}
}
var w={};
for(var S in p){
var x=n.getAttribute(S);
x&&(w[p[S]]=x);
}
var N=n.data("cke-saved-name")||w.advName;
N&&(w.advName=N),CKEDITOR.tools.isEmpty(w)||(O.advanced=w);
}
return O;
},getLinkAttributes:function(e,o){
var a=e.config.emailProtection||"",r={};
switch(o.type){
case "url":
var s=o.url&&void 0!==o.url.protocol?o.url.protocol:"http://",l=o.url&&CKEDITOR.tools.trim(o.url.url)||"";
r["data-cke-saved-href"]=0===l.indexOf("/")?l:s+l;
break;
case "anchor":
var d=o.anchor&&o.anchor.name,c=o.anchor&&o.anchor.id;
r["data-cke-saved-href"]="#"+(d||c||"");
break;
case "email":
var u,h=o.email,f=h.address;
switch(a){
case "":
case "encode":
var m=encodeURIComponent(h.subject||""),g=encodeURIComponent(h.body||""),E=[];
m&&E.push("subject="+m),g&&E.push("body="+g),E=E.length?"?"+E.join("&"):"","encode"==a?(u=["javascript:void(location.href='mailto:'+",n(f)],E&&u.push("+'",t(E),"'"),u.push(")")):u=["mailto:",f,E];
break;
default:
var T=f.split("@",2);
h.name=T[0],h.domain=T[1],u=["javascript:",i(e,h)];
}
r["data-cke-saved-href"]=u.join("");
}
if(o.target){
if("popup"==o.target.type){
for(var C=["window.open(this.href, '",o.target.name||"","', '"],v=["resizable","status","location","toolbar","menubar","fullscreen","scrollbars","dependent"],I=v.length,O=function(e){
o.target[e]&&v.push(e+"="+o.target[e]);
},D=0;I>D;D++){
v[D]=v[D]+(o.target[v[D]]?"=yes":"=no");
}
O("width"),O("left"),O("height"),O("top"),C.push(v.join(","),"'); return false;"),r["data-cke-pa-onclick"]=C.join("");
}else{
"notSet"!=o.target.type&&o.target.name&&(r.target=o.target.name);
}
}
if(o.advanced){
for(var b in p){
var R=o.advanced[p[b]];
R&&(r[b]=R);
}
r.name&&(r["data-cke-saved-name"]=r.name);
}
r["data-cke-saved-href"]&&(r.href=r["data-cke-saved-href"]);
var y={target:1,onclick:1,"data-cke-pa-onclick":1,"data-cke-saved-name":1};
o.advanced&&CKEDITOR.tools.extend(y,p);
for(var K in r){
delete y[K];
}
return {set:r,removed:CKEDITOR.tools.objectKeys(y)};
}},CKEDITOR.unlinkCommand=function(){
},CKEDITOR.unlinkCommand.prototype={exec:function(e){
var t=new CKEDITOR.style({element:"a",type:CKEDITOR.STYLE_INLINE,alwaysRemoveElement:1});
e.removeStyle(t);
},refresh:function(e,t){
var n=t.lastElement&&t.lastElement.getAscendant("a",!0);
n&&"a"==n.getName()&&n.getAttribute("href")&&n.getChildCount()?this.setState(CKEDITOR.TRISTATE_OFF):this.setState(CKEDITOR.TRISTATE_DISABLED);
},contextSensitive:1,startDisabled:1,requiredContent:"a[href]"},CKEDITOR.removeAnchorCommand=function(){
},CKEDITOR.removeAnchorCommand.prototype={exec:function(e){
var t,n=e.getSelection(),i=n.createBookmarks();
n&&(t=n.getSelectedElement())&&(t.getChildCount()?t.is("a"):CKEDITOR.plugins.link.tryRestoreFakeAnchor(e,t))?t.remove(1):(t=CKEDITOR.plugins.link.getSelectedLink(e))&&(t.hasAttribute("href")?(t.removeAttributes({name:1,"data-cke-saved-name":1}),t.removeClass("cke_anchor")):t.remove(1)),n.selectBookmarks(i);
},requiredContent:"a[name]"},CKEDITOR.tools.extend(CKEDITOR.config,{linkShowAdvancedTab:!0,linkShowTargetTab:!0});
}(),function(){
function e(e){
var t,n,i;
if(t=e.getDirection()){
for(n=e.getParent();n&&!(i=n.getDirection());){
n=n.getParent();
}
t==i&&e.removeAttribute("dir");
}
};
function t(e,t){
var n=e.getAttribute("style");
n&&t.setAttribute("style",n.replace(/([^;])$/,"$1;")+(t.getAttribute("style")||""));
};
function n(e,t,n,i){
for(var o=CKEDITOR.plugins.list.listToArray(t.root,n),a=[],r=0;r<t.contents.length;r++){
var s=t.contents[r];
s=s.getAscendant("li",!0),s&&!s.getCustomData("list_item_processed")&&(a.push(s),CKEDITOR.dom.element.setMarker(n,s,"list_item_processed",!0));
}
var l,d,c=t.root,u=c.getDocument();
for(r=0;r<a.length;r++){
var h=a[r].getCustomData("listarray_index");
l=o[h].parent,l.is(this.type)||(d=u.createElement(this.type),l.copyAttributes(d,{start:1,type:1}),d.removeStyle("list-style-type"),o[h].parent=d);
}
var f,m=CKEDITOR.plugins.list.arrayToList(o,n,null,e.config.enterMode),g=m.listNode.getChildCount();
for(r=0;g>r&&(f=m.listNode.getChild(r));r++){
f.getName()==this.type&&i.push(f);
}
m.listNode.replace(t.root),e.fire("contentDomInvalidated");
};
function i(e,t,n){
var i=t.contents,o=t.root.getDocument(),r=[];
if(1==i.length&&i[0].equals(t.root)){
var s=o.createElement("div");
i[0].moveChildren&&i[0].moveChildren(s),i[0].append(s),i[0]=s;
}
for(var l=t.contents[0].getParent(),d=0;d<i.length;d++){
l=l.getCommonAncestor(i[d].getParent());
}
var c,u,h=e.config.useComputedState;
for(h=void 0===h||h,d=0;d<i.length;d++){
for(var f,m=i[d];f=m.getParent();){
if(f.equals(l)){
r.push(m),!u&&m.getDirection()&&(u=1);
var g=m.getDirection(h);
null!==c&&(c=c&&c!=g?null:g);
break;
}
m=f;
}
}
if(!(r.length<1)){
var p=r[r.length-1].getNext(),E=o.createElement(this.type);
n.push(E);
for(var T,C;r.length;){
T=r.shift(),C=o.createElement("li"),a(T)?T.appendTo(C):(T.copyAttributes(C),c&&T.getDirection()&&(C.removeStyle("direction"),C.removeAttribute("dir")),T.moveChildren(C),T.remove()),C.appendTo(E);
}
c&&u&&E.setAttribute("dir",c),p?E.insertBefore(p):E.appendTo(l);
}
};
function o(e,t,n){
function i(n){
!(h=g[n?"getFirst":"getLast"]())||h.is&&h.isBlockBoundary()||!(f=t.root[n?"getPrevious":"getNext"](CKEDITOR.dom.walker.invisible(!0)))||f.is&&f.isBlockBoundary({br:1})||e.document.createElement("br")[n?"insertBefore":"insertAfter"](h);
};
for(var o=CKEDITOR.plugins.list.listToArray(t.root,n),a=[],r=0;r<t.contents.length;r++){
var s=t.contents[r];
s=s.getAscendant("li",!0),s&&!s.getCustomData("list_item_processed")&&(a.push(s),CKEDITOR.dom.element.setMarker(n,s,"list_item_processed",!0));
}
var l=null;
for(r=0;r<a.length;r++){
var d=a[r].getCustomData("listarray_index");
o[d].indent=-1,l=d;
}
for(r=l+1;r<o.length;r++){
if(o[r].indent>o[r-1].indent+1){
for(var c=o[r-1].indent+1-o[r].indent,u=o[r].indent;o[r]&&o[r].indent>=u;){
o[r].indent+=c,r++;
}
r--;
}
}
var h,f,m=CKEDITOR.plugins.list.arrayToList(o,n,null,e.config.enterMode,t.root.getAttribute("dir")),g=m.listNode;
i(!0),i(),g.replace(t.root),e.fire("contentDomInvalidated");
};
function a(e){
return e.is("pre")||E.test(e.getName())||"false"==e.getAttribute("contenteditable");
};
function r(e,t){
this.name=e,this.type=t,this.context=t,this.allowedContent=t+" li",this.requiredContent=t;
};
function s(e,t,n,i){
for(var o,a;o=e[i?"getLast":"getFirst"](T);){
(a=o.getDirection(1))!==t.getDirection(1)&&o.setAttribute("dir",a),o.remove(),n?o[i?"insertBefore":"insertAfter"](n):t.append(o,i);
}
};
function l(e){
function t(t){
var n=e[t?"getPrevious":"getNext"](g);
n&&n.type==CKEDITOR.NODE_ELEMENT&&n.is(e.getName())&&(s(e,n,null,!t),e.remove(),e=n);
};
t(),t(1);
};
function d(e){
return e.type==CKEDITOR.NODE_ELEMENT&&(e.getName() in CKEDITOR.dtd.$block||e.getName() in CKEDITOR.dtd.$listItem)&&CKEDITOR.dtd[e.getName()]["#"];
};
function c(e,t,n){
e.fire("saveSnapshot"),n.enlarge(CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS);
var i=n.extractContents();
t.trim(!1,!0);
var o,a=t.createBookmark(),r=new CKEDITOR.dom.elementPath(t.startContainer),d=r.block,c=r.lastElement.getAscendant("li",1)||d,h=new CKEDITOR.dom.elementPath(n.startContainer),f=h.contains(CKEDITOR.dtd.$listItem),m=h.contains(CKEDITOR.dtd.$list);
if(d){
var E=d.getBogus();
E&&E.remove();
}else{
m&&(o=m.getPrevious(g),o&&p(o)&&o.remove());
}
o=i.getLast(),o&&o.type==CKEDITOR.NODE_ELEMENT&&o.is("br")&&o.remove();
var T=t.startContainer.getChild(t.startOffset);
if(T?i.insertBefore(T):t.startContainer.append(i),f){
var C=u(f);
C&&(c.contains(f)?(s(C,f.getParent(),f),C.remove()):c.append(C));
}
for(var v,I;n.checkStartOfBlock()&&n.checkEndOfBlock()&&(h=n.startPath(),v=h.block);){
v.is("li")&&(I=v.getParent(),v.equals(I.getLast(g))&&v.equals(I.getFirst(g))&&(v=I)),n.moveToPosition(v,CKEDITOR.POSITION_BEFORE_START),v.remove();
}
var O=n.clone(),D=e.editable();
O.setEndAt(D,CKEDITOR.POSITION_BEFORE_END);
var b=new CKEDITOR.dom.walker(O);
b.evaluator=function(e){
return g(e)&&!p(e);
};
var R=b.next();
R&&R.type==CKEDITOR.NODE_ELEMENT&&R.getName() in CKEDITOR.dtd.$list&&l(R),t.moveToBookmark(a),t.select(),e.fire("saveSnapshot");
};
function u(e){
var t=e.getLast(g);
return t&&t.type==CKEDITOR.NODE_ELEMENT&&t.getName() in h?t:null;
};
var h={ol:1,ul:1},f=CKEDITOR.dom.walker.whitespaces(),m=CKEDITOR.dom.walker.bookmark(),g=function(e){
return !(f(e)||m(e));
},p=CKEDITOR.dom.walker.bogus();
CKEDITOR.plugins.list={listToArray:function(e,t,n,i,o){
if(!h[e.getName()]){
return [];
}
i||(i=0),n||(n=[]);
for(var a=0,r=e.getChildCount();r>a;a++){
var s=e.getChild(a);
if(s.type==CKEDITOR.NODE_ELEMENT&&s.getName() in CKEDITOR.dtd.$list&&CKEDITOR.plugins.list.listToArray(s,t,n,i+1),"li"==s.$.nodeName.toLowerCase()){
var l={parent:e,indent:i,element:s,contents:[]};
o?l.grandparent=o:(l.grandparent=e.getParent(),l.grandparent&&"li"==l.grandparent.$.nodeName.toLowerCase()&&(l.grandparent=l.grandparent.getParent())),t&&CKEDITOR.dom.element.setMarker(t,s,"listarray_index",n.length),n.push(l);
for(var d,c=0,u=s.getChildCount();u>c;c++){
d=s.getChild(c),d.type==CKEDITOR.NODE_ELEMENT&&h[d.getName()]?CKEDITOR.plugins.list.listToArray(d,t,n,i+1,l.grandparent):l.contents.push(d);
}
}
}
return n;
},arrayToList:function(n,i,o,a,r){
if(o||(o=0),!n||n.length<o+1){
return null;
}
for(var s,l,d,c=n[o].parent.getDocument(),u=new CKEDITOR.dom.documentFragment(c),f=null,p=o,E=Math.max(n[o].indent,0),T=null,C=a==CKEDITOR.ENTER_P?"p":"div";;){
var v=n[p],I=v.grandparent;
if(l=v.element.getDirection(1),v.indent==E){
for(f&&n[p].parent.getName()==f.getName()||(f=n[p].parent.clone(!1,1),r&&f.setAttribute("dir",r),u.append(f)),T=f.append(v.element.clone(0,1)),l!=f.getDirection(1)&&T.setAttribute("dir",l),s=0;s<v.contents.length;s++){
T.append(v.contents[s].clone(1,1));
}
p++;
}else{
if(v.indent==Math.max(E,0)+1){
var O=n[p-1].element.getDirection(1),D=CKEDITOR.plugins.list.arrayToList(n,null,p,a,O!=l?l:null);
!T.getChildCount()&&CKEDITOR.env.needsNbspFiller&&c.$.documentMode<=7&&T.append(c.createText("\xa0")),T.append(D.listNode),p=D.nextIndex;
}else{
if(-1!=v.indent||o||!I){
return null;
}
h[I.getName()]?(T=v.element.clone(!1,!0),l!=I.getDirection(1)&&T.setAttribute("dir",l)):T=new CKEDITOR.dom.documentFragment(c);
var b,R,y=I.getDirection(1)!=l,K=v.element,_15=K.getAttribute("class"),k=K.getAttribute("style"),w=T.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT&&(a!=CKEDITOR.ENTER_BR||y||k||_15),S=v.contents.length;
for(s=0;S>s;s++){
b=v.contents[s],m(b)&&S>1?w?R=b.clone(1,1):T.append(b.clone(1,1)):b.type==CKEDITOR.NODE_ELEMENT&&b.isBlockBoundary()?(y&&!b.getDirection()&&b.setAttribute("dir",l),t(K,b),_15&&b.addClass(_15),d=null,R&&(T.append(R),R=null),T.append(b.clone(1,1))):w?(d||(d=c.createElement(C),T.append(d),y&&d.setAttribute("dir",l)),k&&d.setAttribute("style",k),_15&&d.setAttribute("class",_15),R&&(d.append(R),R=null),d.append(b.clone(1,1))):T.append(b.clone(1,1));
}
if(R&&((d||T).append(R),R=null),T.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT&&p!=n.length-1){
var x;
CKEDITOR.env.needsBrFiller&&(x=T.getLast(),x&&x.type==CKEDITOR.NODE_ELEMENT&&x.is("br")&&x.remove()),x=T.getLast(g),x&&x.type==CKEDITOR.NODE_ELEMENT&&x.is(CKEDITOR.dtd.$block)||T.append(c.createElement("br"));
}
var N=T.$.nodeName.toLowerCase();
("div"==N||"p"==N)&&T.appendBogus(),u.append(T),f=null,p++;
}
}
if(d=null,n.length<=p||Math.max(n[p].indent,0)<E){
break;
}
}
if(i){
for(var A=u.getFirst();A;){
A.type==CKEDITOR.NODE_ELEMENT&&(CKEDITOR.dom.element.clearMarkers(i,A),A.getName() in CKEDITOR.dtd.$listItem&&e(A)),A=A.getNextSourceNode();
}
}
return {listNode:u,nextIndex:p};
}};
var E=/^h[1-6]$/,T=CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT);
r.prototype={exec:function(e){
this.refresh(e,e.elementPath());
var t=e.config,a=e.getSelection(),r=a&&a.getRanges();
if(this.state==CKEDITOR.TRISTATE_OFF){
var s=e.editable();
if(s.getFirst(g)){
var d=1==r.length&&r[0],c=d&&d.getEnclosedNode();
c&&c.is&&this.type==c.getName()&&this.setState(CKEDITOR.TRISTATE_ON);
}else{
t.enterMode==CKEDITOR.ENTER_BR?s.appendBogus():r[0].fixBlock(1,t.enterMode==CKEDITOR.ENTER_P?"p":"div"),a.selectRanges(r);
}
}
for(var u=a.createBookmarks(!0),f=[],m={},p=r.createIterator(),E=0;(d=p.getNextRange())&&++E;){
var T=d.getBoundaryNodes(),C=T.startNode,v=T.endNode;
C.type==CKEDITOR.NODE_ELEMENT&&"td"==C.getName()&&d.setStartAt(T.startNode,CKEDITOR.POSITION_AFTER_START),v.type==CKEDITOR.NODE_ELEMENT&&"td"==v.getName()&&d.setEndAt(T.endNode,CKEDITOR.POSITION_BEFORE_END);
var I,O=d.createIterator();
for(O.forceBrBreak=this.state==CKEDITOR.TRISTATE_OFF;I=O.getNextParagraph();){
if(!I.getCustomData("list_block")){
CKEDITOR.dom.element.setMarker(m,I,"list_block",1);
for(var D,b=e.elementPath(I),R=b.elements,y=R.length,K=0,_16=b.blockLimit,k=y-1;k>=0&&(D=R[k]);k--){
if(h[D.getName()]&&_16.contains(D)){
_16.removeCustomData("list_group_object_"+E);
var w=D.getCustomData("list_group_object");
w?w.contents.push(I):(w={root:D,contents:[I]},f.push(w),CKEDITOR.dom.element.setMarker(m,D,"list_group_object",w)),K=1;
break;
}
}
if(!K){
var S=_16;
S.getCustomData("list_group_object_"+E)?S.getCustomData("list_group_object_"+E).contents.push(I):(w={root:S,contents:[I]},CKEDITOR.dom.element.setMarker(m,S,"list_group_object_"+E,w),f.push(w));
}
}
}
}
for(var x=[];f.length>0;){
w=f.shift(),this.state==CKEDITOR.TRISTATE_OFF?h[w.root.getName()]?n.call(this,e,w,m,x):i.call(this,e,w,x):this.state==CKEDITOR.TRISTATE_ON&&h[w.root.getName()]&&o.call(this,e,w,m);
}
for(k=0;k<x.length;k++){
l(x[k]);
}
CKEDITOR.dom.element.clearAllMarkers(m),a.selectBookmarks(u),e.focus();
},refresh:function(e,t){
var n=t.contains(h,1),i=t.blockLimit||t.root;
n&&i.contains(n)?this.setState(n.is(this.type)?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF):this.setState(CKEDITOR.TRISTATE_OFF);
}},CKEDITOR.plugins.add("list",{requires:"indentlist",init:function(e){
e.blockless||(e.addCommand("numberedlist",new r("numberedlist","ol")),e.addCommand("bulletedlist",new r("bulletedlist","ul")),e.ui.addButton&&(e.ui.addButton("NumberedList",{label:e.lang.list.numberedlist,command:"numberedlist",directional:!0,toolbar:"list,10"}),e.ui.addButton("BulletedList",{label:e.lang.list.bulletedlist,command:"bulletedlist",directional:!0,toolbar:"list,20"})),e.on("key",function(t){
var n,i=t.data.domEvent.getKey();
if("wysiwyg"==e.mode&&i in {8:1,46:1}){
var o=e.getSelection(),a=o.getRanges()[0],r=a&&a.startPath();
if(!a||!a.collapsed){
return;
}
var s=8==i,l=e.editable(),f=new CKEDITOR.dom.walker(a.clone());
f.evaluator=function(e){
return g(e)&&!p(e);
},f.guard=function(e,t){
return !(t&&e.type==CKEDITOR.NODE_ELEMENT&&e.is("table"));
};
var m=a.clone();
if(s){
var E,T;
if((E=r.contains(h))&&a.checkBoundaryOfElement(E,CKEDITOR.START)&&(E=E.getParent())&&E.is("li")&&(E=u(E))?(T=E,E=E.getPrevious(g),m.moveToPosition(E&&p(E)?E:T,CKEDITOR.POSITION_BEFORE_START)):(f.range.setStartAt(l,CKEDITOR.POSITION_AFTER_START),f.range.setEnd(a.startContainer,a.startOffset),E=f.previous(),E&&E.type==CKEDITOR.NODE_ELEMENT&&(E.getName() in h||E.is("li"))&&(E.is("li")||(f.range.selectNodeContents(E),f.reset(),f.evaluator=d,E=f.previous()),T=E,m.moveToElementEditEnd(T),m.moveToPosition(m.endPath().block,CKEDITOR.POSITION_BEFORE_END))),T){
c(e,m,a),t.cancel();
}else{
var C=r.contains(h);
C&&a.checkBoundaryOfElement(C,CKEDITOR.START)&&(n=C.getFirst(g),a.checkBoundaryOfElement(n,CKEDITOR.START)&&(E=C.getPrevious(g),u(n)?(E&&(a.moveToElementEditEnd(E),a.select()),t.cancel()):(e.execCommand("outdent"),t.cancel())));
}
}else{
var v,I;
if(n=r.contains("li")){
f.range.setEndAt(l,CKEDITOR.POSITION_BEFORE_END);
var O=n.getLast(g),D=O&&d(O)?O:n,b=0;
if(v=f.next(),v&&v.type==CKEDITOR.NODE_ELEMENT&&v.getName() in h&&v.equals(O)?(b=1,v=f.next()):a.checkBoundaryOfElement(D,CKEDITOR.END)&&(b=2),b&&v){
if(I=a.clone(),I.moveToElementEditStart(v),1==b&&(m.optimize(),!m.startContainer.equals(n))){
for(var R,y=m.startContainer;y.is(CKEDITOR.dtd.$inline);){
R=y,y=y.getParent();
}
R&&m.moveToPosition(R,CKEDITOR.POSITION_AFTER_END);
}
2==b&&(m.moveToPosition(m.endPath().block,CKEDITOR.POSITION_BEFORE_END),I.endPath().block&&I.moveToPosition(I.endPath().block,CKEDITOR.POSITION_AFTER_START)),c(e,m,I),t.cancel();
}
}else{
f.range.setEndAt(l,CKEDITOR.POSITION_BEFORE_END),v=f.next(),v&&v.type==CKEDITOR.NODE_ELEMENT&&v.is(h)&&(v=v.getFirst(g),r.block&&a.checkStartOfBlock()&&a.checkEndOfBlock()?(r.block.remove(),a.moveToElementEditStart(v),a.select(),t.cancel()):u(v)?(a.moveToElementEditStart(v),a.select(),t.cancel()):(I=a.clone(),I.moveToElementEditStart(v),c(e,m,I),t.cancel()));
}
}
setTimeout(function(){
e.selectionChange(1);
});
}
}));
}});
}(),function(){
CKEDITOR.plugins.liststyle={requires:"dialog,contextmenu",init:function(e){
if(!e.blockless){
var t,n;
t=new CKEDITOR.dialogCommand("numberedListStyle",{requiredContent:"ol",allowedContent:"ol{list-style-type}[start]"}),n=e.addCommand("numberedListStyle",t),e.addFeature(n),CKEDITOR.dialog.add("numberedListStyle",this.path+"dialogs/liststyle.js"),t=new CKEDITOR.dialogCommand("bulletedListStyle",{requiredContent:"ul",allowedContent:"ul{list-style-type}"}),n=e.addCommand("bulletedListStyle",t),e.addFeature(n),CKEDITOR.dialog.add("bulletedListStyle",this.path+"dialogs/liststyle.js"),e.addMenuGroup("list",108),e.addMenuItems({numberedlist:{label:e.lang.liststyle.numberedTitle,group:"list",command:"numberedListStyle"},bulletedlist:{label:e.lang.liststyle.bulletedTitle,group:"list",command:"bulletedListStyle"}}),e.contextMenu.addListener(function(e){
if(!e||e.isReadOnly()){
return null;
}
for(;e;){
var t=e.getName();
if("ol"==t){
return {numberedlist:CKEDITOR.TRISTATE_OFF};
}
if("ul"==t){
return {bulletedlist:CKEDITOR.TRISTATE_OFF};
}
e=e.getParent();
}
return null;
});
}
}},CKEDITOR.plugins.add("liststyle",CKEDITOR.plugins.liststyle);
}(),function(){
function e(e){
function t(){
function t(t){
D.mouse=t,D.trigger=null,f=null,R(D),s&&!D.hiddenMode&&e.focusManager.hasFocus&&!D.line.mouseNear()&&(D.element=J(D,!0))&&((D.trigger=v(D)||I(D)||ee(D))&&!T(D,D.trigger.upper||D.trigger.lower)?D.line.attach().place():(D.trigger=null,D.line.detach()),s=!1);
};
var h=e.editable(),m=e.document,E=e.window;
K(D,{editable:h,inInlineMode:h.isInline(),doc:m,win:E,hotNode:null},!0),D.boundary=D.inInlineMode?D.editable:D.doc.getDocumentElement(),h.is(x.$inline)||(D.inInlineMode&&!g(h)&&h.setStyles({position:"relative",top:null,left:null}),l.call(this,D),R(D),h.attachListener(e,"beforeUndoImage",function(){
D.line.detach();
}),h.attachListener(e,"beforeGetData",function(){
D.line.wrap.getParent()&&(D.line.detach(),e.once("getData",function(){
D.line.attach();
},null,null,1000));
},null,null,0),h.attachListener(D.inInlineMode?m:m.getWindow().getFrame(),"mouseout",function(t){
if("wysiwyg"==e.mode){
if(D.inInlineMode){
var n={x:t.data.$.clientX,y:t.data.$.clientY};
R(D),b(D,!0);
var i=D.view.editable,o=D.view.scroll;
r(n.x,i.left-o.x,i.right-o.x)&&r(n.y,i.top-o.y,i.bottom-o.y)||(clearTimeout(f),f=null,D.line.detach());
}else{
clearTimeout(f),f=null,D.line.detach();
}
}
}),h.attachListener(h,"keyup",function(){
D.hiddenMode=0;
}),h.attachListener(h,"keydown",function(t){
if("wysiwyg"==e.mode){
var n=t.data.getKeystroke();
switch(n){
case 2228240:
case 16:
D.hiddenMode=1,D.line.detach();
}
}
}),h.attachListener(D.inInlineMode?h:m,"mousemove",function(n){
if(s=!0,"wysiwyg"==e.mode&&!e.readOnly&&!f){
var i={x:n.data.$.clientX,y:n.data.$.clientY};
f=setTimeout(function(){
t(i);
},30);
}
}),h.attachListener(E,"scroll",function(){
"wysiwyg"==e.mode&&(D.line.detach(),w.webkit&&(D.hiddenMode=1,clearTimeout(o),o=setTimeout(function(){
D.mouseDown||(D.hiddenMode=0);
},50)));
}),h.attachListener(S?m:E,"mousedown",function(){
"wysiwyg"==e.mode&&(D.line.detach(),D.hiddenMode=1,D.mouseDown=1);
}),h.attachListener(S?m:E,"mouseup",function(){
D.hiddenMode=0,D.mouseDown=0;
}),e.addCommand("accessPreviousSpace",c(D)),e.addCommand("accessNextSpace",c(D,!0)),e.setKeystroke([[p.magicline_keystrokePrevious,"accessPreviousSpace"],[p.magicline_keystrokeNext,"accessNextSpace"]]),e.on("loadSnapshot",function(){
var t,n,i;
for(var o in {p:1,br:1,div:1}){
for(t=e.document.getElementsByTag(o),i=t.count();i--;){
if((n=t.getItem(i)).data("cke-magicline-hot")){
return D.hotNode=n,void (D.lastCmdDirection="true"===n.data("cke-magicline-dir")?!0:!1);
}
}
}
}),this.backdoor={accessFocusSpace:d,boxTrigger:n,isLine:u,getAscendantTrigger:i,getNonEmptyNeighbour:a,getSize:O,that:D,triggerEdge:I,triggerEditable:v,triggerExpand:ee});
};
var o,s,f,p=e.config,E=p.magicline_triggerOffset||30,C=p.enterMode,D={editor:e,enterMode:C,triggerOffset:E,holdDistance:0|E*(p.magicline_holdDistance||0.5),boxColor:p.magicline_color||"#ff0000",rtl:"rtl"==p.contentsLangDirection,tabuList:["data-cke-hidden-sel"].concat(p.magicline_tabuList||[]),triggers:p.magicline_everywhere?U:{table:1,hr:1,div:1,ul:1,ol:1,dl:1,form:1,blockquote:1}};
D.isRelevant=function(e){
return h(e)&&!u(D,e)&&!m(e);
},e.on("contentDom",t,this);
};
function t(e,t,n){
return h(t)&&h(n)&&n.equals(t.getNext(function(e){
return !(Z(e)||Q(e)||m(e));
}));
};
function n(e){
this.upper=e[0],this.lower=e[1],this.set.apply(this,e.slice(2));
};
function i(e){
var t,n=e.element;
if(n&&h(n)){
if(t=n.getAscendant(e.triggers,!0),t&&e.editable.contains(t)){
var i=s(t);
return "true"==i.getAttribute("contenteditable")?t:i.is(e.triggers)?i:null;
}
return null;
}
return null;
};
function o(e,t,n){
D(e,t),D(e,n);
var i=t.size.bottom,o=n.size.top;
return i&&o?0|(i+o)/2:i||o;
};
function a(e,t,n){
return t=t[n?"getPrevious":"getNext"](function(t){
return p(t)&&!Z(t)||h(t)&&!m(t)&&!u(e,t);
});
};
function r(e,t,n){
return e>t&&n>e;
};
function s(e,t){
if(e.data("cke-editable")){
return null;
}
for(t||(e=e.getParent());e;){
if(e.data("cke-editable")){
return null;
}
if(e.hasAttribute("contenteditable")){
return e;
}
e=e.getParent();
}
return null;
};
function l(e){
var t=e.doc,n=k("<span contenteditable=\"false\" style=\""+G+"position:absolute;border-top:1px dashed "+e.boxColor+"\"></span>",t),i=CKEDITOR.getUrl(this.path+"images/"+(w.hidpi?"hidpi/":"")+"icon"+(e.rtl?"-rtl":"")+".png");
K(n,{attach:function(){
return this.wrap.getParent()||this.wrap.appendTo(e.editable,!0),this;
},lineChildren:[K(k("<span title=\""+e.editor.lang.magicline.title+"\" contenteditable=\"false\">&#8629;</span>",t),{base:G+"height:17px;width:17px;"+(e.rtl?"left":"right")+":17px;background:url("+i+") center no-repeat "+e.boxColor+";cursor:pointer;"+(w.hc?"font-size: 15px;line-height:14px;border:1px solid #fff;text-align:center;":"")+(w.hidpi?"background-size: 9px 10px;":""),looks:["top:-8px; border-radius: 2px;","top:-17px; border-radius: 2px 2px 0px 0px;","top:-1px; border-radius: 0px 0px 2px 2px;"]}),K(k(Y,t),{base:X+"left:0px;border-left-color:"+e.boxColor+";",looks:["border-width:8px 0 8px 8px;top:-8px","border-width:8px 0 0 8px;top:-8px","border-width:0 0 8px 8px;top:0px"]}),K(k(Y,t),{base:X+"right:0px;border-right-color:"+e.boxColor+";",looks:["border-width:8px 8px 8px 0;top:-8px","border-width:8px 8px 0 0;top:-8px","border-width:0 8px 8px 0;top:0px"]})],detach:function(){
return this.wrap.getParent()&&this.wrap.remove(),this;
},mouseNear:function(){
D(e,this);
var t=e.holdDistance,n=this.size;
return n&&r(e.mouse.y,n.top-t,n.bottom+t)&&r(e.mouse.x,n.left-t,n.right+t)?!0:!1;
},place:function(){
var t=e.view,n=e.editable,i=e.trigger,o=i.upper,a=i.lower,s=o||a,l=s.getParent(),d={};
this.trigger=i,o&&D(e,o,!0),a&&D(e,a,!0),D(e,l,!0),e.inInlineMode&&b(e,!0),l.equals(n)?(d.left=t.scroll.x,d.right=-t.scroll.x,d.width=""):(d.left=s.size.left-s.size.margin.left+t.scroll.x-(e.inInlineMode?t.editable.left+t.editable.border.left:0),d.width=s.size.outerWidth+s.size.margin.left+s.size.margin.right+t.scroll.x,d.right=""),o&&a?o.size.margin.bottom===a.size.margin.top?d.top=0|o.size.bottom+o.size.margin.bottom/2:o.size.margin.bottom<a.size.margin.top?d.top=o.size.bottom+o.size.margin.bottom:d.top=o.size.bottom+o.size.margin.bottom-a.size.margin.top:o?a||(d.top=o.size.bottom+o.size.margin.bottom):d.top=a.size.top-a.size.margin.top,i.is(M)||r(d.top,t.scroll.y-15,t.scroll.y+5)?(d.top=e.inInlineMode?0:t.scroll.y,this.look(M)):i.is($)||r(d.top,t.pane.bottom-5,t.pane.bottom+15)?(d.top=e.inInlineMode?t.editable.height+t.editable.padding.top+t.editable.padding.bottom:t.pane.bottom-1,this.look($)):(e.inInlineMode&&(d.top-=t.editable.top+t.editable.border.top),this.look(H)),e.inInlineMode&&(d.top--,d.top+=t.editable.scroll.top,d.left+=t.editable.scroll.left);
for(var c in d){
d[c]=CKEDITOR.tools.cssLength(d[c]);
}
this.setStyles(d);
},look:function(e){
if(this.oldLook!=e){
for(var t,n=this.lineChildren.length;n--;){
(t=this.lineChildren[n]).setAttribute("style",t.base+t.looks[0|e/2]);
}
this.oldLook=e;
}
},wrap:new _17("span",e.doc)});
for(var o=n.lineChildren.length;o--;){
n.lineChildren[o].appendTo(n);
}
n.look(H),n.appendTo(n.wrap),n.unselectable(),n.lineChildren[0].on("mouseup",function(t){
n.detach(),d(e,function(t){
var n=e.line.trigger;
t[n.is(A)?"insertBefore":"insertAfter"](n.is(A)?n.lower:n.upper);
},!0),e.editor.focus(),w.ie||e.enterMode==CKEDITOR.ENTER_BR||e.hotNode.scrollIntoView(),t.data.preventDefault(!0);
}),n.on("mousedown",function(e){
e.data.preventDefault(!0);
}),e.line=n;
};
function d(e,t,n){
var i,o=new CKEDITOR.dom.range(e.doc),a=e.editor;
if(w.ie&&e.enterMode==CKEDITOR.ENTER_BR){
i=e.doc.createText(q);
}else{
var r=s(e.element,!0),l=r&&r.data("cke-enter-mode")||e.enterMode;
if(i=new _17(N[l],e.doc),!i.is("br")){
var d=e.doc.createText(q);
d.appendTo(i);
}
}
n&&a.fire("saveSnapshot"),t(i),o.moveToPosition(i,CKEDITOR.POSITION_AFTER_START),a.getSelection().selectRanges([o]),e.hotNode=i,n&&a.fire("saveSnapshot");
};
function c(e,t){
return {canUndo:!0,modes:{wysiwyg:1},exec:function(){
function n(n){
var i=w.ie&&w.version<9?" ":q,o=e.hotNode&&e.hotNode.getText()==i&&e.element.equals(e.hotNode)&&e.lastCmdDirection===!!t;
d(e,function(i){
o&&e.hotNode&&e.hotNode.remove(),i[t?"insertAfter":"insertBefore"](n),i.setAttributes({"data-cke-magicline-hot":1,"data-cke-magicline-dir":!!t}),e.lastCmdDirection=!!t;
}),w.ie||e.enterMode==CKEDITOR.ENTER_BR||e.hotNode.scrollIntoView(),e.line.detach();
};
return function(o){
var r,l=o.getSelection().getStartElement();
if(l=l.getAscendant(U,1),!T(e,l)&&l&&!l.equals(e.editable)&&!l.contains(e.editable)){
(r=s(l))&&"false"==r.getAttribute("contenteditable")&&(l=r),e.element=l;
var d,c=a(e,l,!t);
if(h(c)&&c.is(e.triggers)&&c.is(j)&&(!a(e,c,!t)||(d=a(e,c,!t))&&h(d)&&d.is(e.triggers))){
return void n(c);
}
var u=i(e,l);
if(h(u)){
if(!a(e,u,!t)){
return void n(u);
}
var f=a(e,u,!t);
return f&&h(f)&&f.is(e.triggers)?void n(u):void 0;
}
}
};
}()};
};
function u(e,t){
if(!t||t.type!=CKEDITOR.NODE_ELEMENT||!t.$){
return !1;
}
var n=e.line;
return n.wrap.equals(t)||n.wrap.contains(t);
};
function h(e){
return e&&e.type==CKEDITOR.NODE_ELEMENT&&e.$;
};
function f(e){
if(!h(e)){
return !1;
}
var t={left:1,right:1,center:1};
return !(!t[e.getComputedStyle("float")]&&!t[e.getAttribute("align")]);
};
function m(e){
return h(e)?g(e)||f(e):!1;
};
function g(e){
return !!{absolute:1,fixed:1}[e.getComputedStyle("position")];
};
function p(e){
return e&&e.type==CKEDITOR.NODE_TEXT;
};
function E(e,t){
return h(t)?t.is(e.triggers):null;
};
function T(e,t){
if(!t){
return !1;
}
for(var n=t.getParents(1),i=n.length;i--;){
for(var o=e.tabuList.length;o--;){
if(n[i].hasAttribute(e.tabuList[o])){
return !0;
}
}
}
return !1;
};
function C(e,t,n){
var i=t[n?"getLast":"getFirst"](function(t){
return e.isRelevant(t)&&!t.is(V);
});
return i?(D(e,i),n?i.size.top>e.mouse.y:i.size.bottom<e.mouse.y):!1;
};
function v(e){
var t,i=e.editable,o=e.mouse,a=e.view,s=e.triggerOffset;
b(e);
var l=o.y>(e.inInlineMode?a.editable.top+a.editable.height/2:Math.min(a.editable.height,a.pane.height)/2),d=i[l?"getLast":"getFirst"](function(e){
return !(Z(e)||Q(e));
});
return d?(u(e,d)&&(d=e.line.wrap[l?"getPrevious":"getNext"](function(e){
return !(Z(e)||Q(e));
})),h(d)&&!m(d)&&E(e,d)?(D(e,d),!l&&d.size.top>=0&&r(o.y,0,d.size.top+s)?(t=e.inInlineMode||0===a.scroll.y?M:H,new n([null,d,A,B,t])):l&&d.size.bottom<=a.pane.height&&r(o.y,d.size.bottom-s,a.pane.height)?(t=e.inInlineMode||r(d.size.bottom,a.pane.height-s,a.pane.height)?$:H,new n([d,null,L,B,t])):null):null):null;
};
function I(e){
var t=e.mouse,o=e.view,s=e.triggerOffset,l=i(e);
if(!l){
return null;
}
D(e,l);
var d,c,u=Math.min(s,0|l.size.outerHeight/2),f=[];
if(r(t.y,l.size.top-1,l.size.top+u)){
c=!1;
}else{
if(!r(t.y,l.size.bottom-u,l.size.bottom+1)){
return null;
}
c=!0;
}
if(m(l)||C(e,l,c)||l.getParent().is(z)){
return null;
}
var g=a(e,l,!c);
if(g){
if(p(g)){
return null;
}
if(h(g)){
if(m(g)||!E(e,g)||g.getParent().is(z)){
return null;
}
f=[g,l][c?"reverse":"concat"]().concat([P,B]);
}
}else{
l.equals(e.editable[c?"getLast":"getFirst"](e.isRelevant))?(b(e),c&&r(t.y,l.size.bottom-u,o.pane.height)&&r(l.size.bottom,o.pane.height-u,o.pane.height)?d=$:r(t.y,0,l.size.top+u)&&(d=M)):d=H,f=[null,l][c?"reverse":"concat"]().concat([c?L:A,B,d,l.equals(e.editable[c?"getLast":"getFirst"](e.isRelevant))?c?$:M:H]);
}
return 0 in f?new n(f):null;
};
function O(e,t,n,i){
function o(e){
return t.getComputedStyle.call(t,e);
};
for(var a=t.getDocumentPosition(),r={},s={},l={},d={},c=te.length;c--;){
r[te[c]]=parseInt(o("border-"+te[c]+"-width"),10)||0,l[te[c]]=parseInt(o("padding-"+te[c]),10)||0,s[te[c]]=parseInt(o("margin-"+te[c]),10)||0;
}
return (!n||i)&&R(e,i),d.top=a.y-(n?0:e.view.scroll.y),d.left=a.x-(n?0:e.view.scroll.x),d.outerWidth=t.$.offsetWidth,d.outerHeight=t.$.offsetHeight,d.height=d.outerHeight-(l.top+l.bottom+r.top+r.bottom),d.width=d.outerWidth-(l.left+l.right+r.left+r.right),d.bottom=d.top+d.outerHeight,d.right=d.left+d.outerWidth,e.inInlineMode&&(d.scroll={top:t.$.scrollTop,left:t.$.scrollLeft}),K({border:r,padding:l,margin:s,ignoreScroll:n},d,!0);
};
function D(e,t,n){
if(!h(t)){
return t.size=null;
}
if(t.size){
if(t.size.ignoreScroll==n&&t.size.date>new Date-W){
return null;
}
}else{
t.size={};
}
return K(t.size,O(e,t,n),{date:+new Date},!0);
};
function b(e,t){
e.view.editable=O(e,e.editable,t,!0);
};
function R(e,t){
e.view||(e.view={});
var n=e.view;
if(!(!t&&n&&n.date>new Date-W)){
var i=e.win,o=i.getScrollPosition(),a=i.getViewPaneSize();
K(e.view,{scroll:{x:o.x,y:o.y,width:e.doc.$.documentElement.scrollWidth-a.width,height:e.doc.$.documentElement.scrollHeight-a.height},pane:{width:a.width,height:a.height,bottom:a.height+o.y},date:+new Date},!0);
}
};
function y(e,t,i,o){
for(var a=o,r=o,s=0,l=!1,d=!1,c=e.view.pane.height,u=e.mouse;u.y+s<c&&u.y-s>0&&(l||(l=t(a,o)),d||(d=t(r,o)),!l&&u.y-s>0&&(a=i(e,{x:u.x,y:u.y-s})),!d&&u.y+s<c&&(r=i(e,{x:u.x,y:u.y+s})),!l||!d);){
s+=2;
}
return new n([a,r,null,null]);
};
CKEDITOR.plugins.add("magicline",{init:e});
var K=CKEDITOR.tools.extend,_17=CKEDITOR.dom.element,k=_17.createFromHtml,w=CKEDITOR.env,S=CKEDITOR.env.ie&&CKEDITOR.env.version<9,x=CKEDITOR.dtd,N={},A=128,L=64,P=32,B=16,F=8,M=4,$=2,H=1,q="\xa0",z=x.$listItem,V=x.$tableContent,j=K({},x.$nonEditable,x.$empty),U=x.$block,W=100,G="width:0px;height:0px;padding:0px;margin:0px;display:block;z-index:9999;color:#fff;position:absolute;font-size: 0px;line-height:0px;",X=G+"border-color:transparent;display:block;border-style:solid;",Y="<span>"+q+"</span>";
N[CKEDITOR.ENTER_BR]="br",N[CKEDITOR.ENTER_P]="p",N[CKEDITOR.ENTER_DIV]="div",n.prototype={set:function(e,t,n){
return this.properties=e+t+(n||H),this;
},is:function(e){
return (this.properties&e)==e;
}};
var J=function(){
function e(e,t){
var n=e.$.elementFromPoint(t.x,t.y);
return n&&n.nodeType?new CKEDITOR.dom.element(n):null;
};
return function(t,n,i){
if(!t.mouse){
return null;
}
var o=t.doc,a=t.line.wrap,r=i||t.mouse,s=e(o,r);
return n&&u(t,s)&&(a.hide(),s=e(o,r),a.show()),s&&s.type==CKEDITOR.NODE_ELEMENT&&s.$?w.ie&&w.version<9&&!t.boundary.equals(s)&&!t.boundary.contains(s)?null:s:null;
};
}(),Z=CKEDITOR.dom.walker.whitespaces(),Q=CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_COMMENT),ee=function(){
function e(e){
var a,r,s,l=e.element;
if(!h(l)||l.contains(e.editable)){
return null;
}
if(l.isReadOnly()){
return null;
}
if(s=y(e,function(e,t){
return !t.equals(e);
},function(e,t){
return J(e,!0,t);
},l),a=s.upper,r=s.lower,t(e,a,r)){
return s.set(P,F);
}
if(a&&l.contains(a)){
for(;!a.getParent().equals(l);){
a=a.getParent();
}
}else{
a=l.getFirst(function(t){
return n(e,t);
});
}
if(r&&l.contains(r)){
for(;!r.getParent().equals(l);){
r=r.getParent();
}
}else{
r=l.getLast(function(t){
return n(e,t);
});
}
if(!a||!r){
return null;
}
if(D(e,a),D(e,r),!i(e,a,r)){
return null;
}
for(var d,c,u,f,m=Number.MAX_VALUE;r&&!r.equals(a)&&(c=a.getNext(e.isRelevant));){
d=Math.abs(o(e,a,c)-e.mouse.y),m>d&&(m=d,u=a,f=c),a=c,D(e,a);
}
return u&&f&&i(e,u,f)?(s.upper=u,s.lower=f,s.set(P,F)):null;
};
function n(e,t){
return !(p(t)||Q(t)||m(t)||u(e,t)||t.type==CKEDITOR.NODE_ELEMENT&&t.$&&t.is("br"));
};
function i(e,t,n){
return r(e.mouse.y,t.size.top,n.size.bottom);
};
function a(e,n){
var i=n.upper,o=n.lower;
return !i||!o||m(o)||m(i)||o.equals(i)||i.equals(o)||o.contains(i)||i.contains(o)?!1:E(e,i)&&E(e,o)&&t(e,i,o)?!0:!1;
};
return function(t){
var n=e(t);
return n&&a(t,n)?n:null;
};
}(),te=["top","left","right","bottom"];
}(),CKEDITOR.config.magicline_keystrokePrevious=CKEDITOR.CTRL+CKEDITOR.SHIFT+51,CKEDITOR.config.magicline_keystrokeNext=CKEDITOR.CTRL+CKEDITOR.SHIFT+52,function(){
function e(e){
if(!e||e.type!=CKEDITOR.NODE_ELEMENT||"form"!=e.getName()){
return [];
}
for(var t=[],n=["style","className"],i=0;i<n.length;i++){
var o=n[i],a=e.$.elements.namedItem(o);
if(a){
var r=new CKEDITOR.dom.element(a);
t.push([r,r.nextSibling]),r.remove();
}
}
return t;
};
function t(e,t){
if(e&&e.type==CKEDITOR.NODE_ELEMENT&&"form"==e.getName()&&t.length>0){
for(var n=t.length-1;n>=0;n--){
var i=t[n][0],o=t[n][1];
o?i.insertBefore(o):i.appendTo(e);
}
}
};
function n(n,i){
var o=e(n),a={},r=n.$;
return i||(a["class"]=r.className||"",r.className=""),a.inline=r.style.cssText||"",i||(r.style.cssText="position: static; overflow: visible"),t(o),a;
};
function i(n,i){
var o=e(n),a=n.$;
"class" in i&&(a.className=i["class"]),"inline" in i&&(a.style.cssText=i.inline),t(o);
};
function o(e){
if(!e.editable().isInline()){
var t=CKEDITOR.instances;
for(var n in t){
var i=t[n];
if("wysiwyg"==i.mode&&!i.readOnly){
var o=i.document.getBody();
o.setAttribute("contentEditable",!1),o.setAttribute("contentEditable",!0);
}
}
e.editable().hasFocus&&(e.toolbox.focus(),e.focus());
}
};
CKEDITOR.plugins.add("maximize",{init:function(e){
function t(){
var t=c.getViewPaneSize();
e.resize(t.width,t.height,null,!0);
};
if(e.elementMode!=CKEDITOR.ELEMENT_MODE_INLINE){
var a,r,s,l=e.lang,d=CKEDITOR.document,c=d.getWindow(),u=CKEDITOR.TRISTATE_OFF;
e.addCommand("maximize",{modes:{wysiwyg:!CKEDITOR.env.iOS,source:!CKEDITOR.env.iOS},readOnly:1,editorFocus:!1,exec:function(){
var h=e.container.getFirst(function(e){
return e.type==CKEDITOR.NODE_ELEMENT&&e.hasClass("cke_inner");
}),f=e.ui.space("contents");
if("wysiwyg"==e.mode){
var m=e.getSelection();
a=m&&m.getRanges(),r=c.getScrollPosition();
}else{
var g=e.editable().$;
a=!CKEDITOR.env.ie&&[g.selectionStart,g.selectionEnd],r=[g.scrollLeft,g.scrollTop];
}
if(this.state==CKEDITOR.TRISTATE_OFF){
c.on("resize",t),s=c.getScrollPosition();
for(var p=e.container;p=p.getParent();){
p.setCustomData("maximize_saved_styles",n(p)),p.setStyle("z-index",e.config.baseFloatZIndex-5);
}
f.setCustomData("maximize_saved_styles",n(f,!0)),h.setCustomData("maximize_saved_styles",n(h,!0));
var E={overflow:CKEDITOR.env.webkit?"":"hidden",width:0,height:0};
d.getDocumentElement().setStyles(E),!CKEDITOR.env.gecko&&d.getDocumentElement().setStyle("position","fixed"),!(CKEDITOR.env.gecko&&CKEDITOR.env.quirks)&&d.getBody().setStyles(E),CKEDITOR.env.ie?setTimeout(function(){
c.$.scrollTo(0,0);
},0):c.$.scrollTo(0,0),h.setStyle("position",CKEDITOR.env.gecko&&CKEDITOR.env.quirks?"fixed":"absolute"),h.$.offsetLeft,h.setStyles({"z-index":e.config.baseFloatZIndex-5,left:"0px",top:"0px"}),h.addClass("cke_maximized"),t();
var T=h.getDocumentPosition();
h.setStyles({left:-1*T.x+"px",top:-1*T.y+"px"}),CKEDITOR.env.gecko&&o(e);
}else{
if(this.state==CKEDITOR.TRISTATE_ON){
c.removeListener("resize",t);
for(var C=[f,h],v=0;v<C.length;v++){
i(C[v],C[v].getCustomData("maximize_saved_styles")),C[v].removeCustomData("maximize_saved_styles");
}
for(p=e.container;p=p.getParent();){
i(p,p.getCustomData("maximize_saved_styles")),p.removeCustomData("maximize_saved_styles");
}
CKEDITOR.env.ie?setTimeout(function(){
c.$.scrollTo(s.x,s.y);
},0):c.$.scrollTo(s.x,s.y),h.removeClass("cke_maximized"),CKEDITOR.env.webkit&&(h.setStyle("display","inline"),setTimeout(function(){
h.setStyle("display","block");
},0)),e.fire("resize",{outerHeight:e.container.$.offsetHeight,contentsHeight:f.$.offsetHeight,outerWidth:e.container.$.offsetWidth});
}
}
this.toggleState();
var I=this.uiItems[0];
if(I){
var O=this.state==CKEDITOR.TRISTATE_OFF?l.maximize.maximize:l.maximize.minimize,D=CKEDITOR.document.getById(I._.id);
D.getChild(1).setHtml(O),D.setAttribute("title",O),D.setAttribute("href","javascript:void(\""+O+"\");");
}
if("wysiwyg"==e.mode){
if(a){
CKEDITOR.env.gecko&&o(e),e.getSelection().selectRanges(a);
var b=e.getSelection().getStartElement();
b&&b.scrollIntoView(!0);
}else{
c.$.scrollTo(r.x,r.y);
}
}else{
a&&(g.selectionStart=a[0],g.selectionEnd=a[1]),g.scrollLeft=r[0],g.scrollTop=r[1];
}
a=r=null,u=this.state,e.fire("maximize",this.state);
},canUndo:!1}),e.ui.addButton&&e.ui.addButton("Maximize",{label:l.maximize.maximize,command:"maximize",toolbar:"tools,10"}),e.on("mode",function(){
var t=e.getCommand("maximize");
t.setState(t.state==CKEDITOR.TRISTATE_DISABLED?CKEDITOR.TRISTATE_DISABLED:u);
},null,null,100);
}
}});
}(),CKEDITOR.plugins.add("newpage",{init:function(e){
e.addCommand("newpage",{modes:{wysiwyg:1,source:1},exec:function(e){
var t=this;
e.setData(e.config.newpage_html||"",function(){
e.focus(),setTimeout(function(){
e.fire("afterCommandExec",{name:"newpage",command:t}),e.selectionChange();
},200);
});
},async:!0}),e.ui.addButton&&e.ui.addButton("NewPage",{label:e.lang.newpage.toolbar,command:"newpage",toolbar:"document,20"});
}}),function(){
function e(e){
return {"aria-label":e,"class":"cke_pagebreak",contenteditable:"false","data-cke-display-name":"pagebreak","data-cke-pagebreak":1,style:"page-break-after: always",title:e};
};
CKEDITOR.plugins.add("pagebreak",{requires:"fakeobjects",onLoad:function(){
var e=("background:url("+CKEDITOR.getUrl(this.path+"images/pagebreak.gif")+") no-repeat center center;clear:both;width:100%;border-top:#999 1px dotted;border-bottom:#999 1px dotted;padding:0;height:7px;cursor:default;").replace(/;/g," !important;");
CKEDITOR.addCss("div.cke_pagebreak{"+e+"}");
},init:function(e){
e.blockless||(e.addCommand("pagebreak",CKEDITOR.plugins.pagebreakCmd),e.ui.addButton&&e.ui.addButton("PageBreak",{label:e.lang.pagebreak.toolbar,command:"pagebreak",toolbar:"insert,70"}),CKEDITOR.env.webkit&&e.on("contentDom",function(){
e.document.on("click",function(t){
var n=t.data.getTarget();
n.is("div")&&n.hasClass("cke_pagebreak")&&e.getSelection().selectElement(n);
});
}));
},afterInit:function(t){
function n(n){
CKEDITOR.tools.extend(n.attributes,e(t.lang.pagebreak.alt),!0),n.children.length=0;
};
var i=t.dataProcessor,o=i&&i.dataFilter,a=i&&i.htmlFilter,r=/page-break-after\s*:\s*always/i,s=/display\s*:\s*none/i;
a&&a.addRules({attributes:{"class":function(e,t){
var n=e.replace("cke_pagebreak","");
if(n!=e){
var i=CKEDITOR.htmlParser.fragment.fromHtml("<span style=\"display: none;\">&nbsp;</span>").children[0];
t.children.length=0,t.add(i);
var o=t.attributes;
delete o["aria-label"],delete o.contenteditable,delete o.title;
}
return n;
}}},{applyToAll:!0,priority:5}),o&&o.addRules({elements:{div:function(e){
if(e.attributes["data-cke-pagebreak"]){
n(e);
}else{
if(r.test(e.attributes.style)){
var t=e.children[0];
t&&"span"==t.name&&s.test(t.attributes.style)&&n(e);
}
}
}}});
}}),CKEDITOR.plugins.pagebreakCmd={exec:function(t){
var n=t.document.createElement("div",{attributes:e(t.lang.pagebreak.alt)});
t.insertElement(n);
},context:"div",allowedContent:{div:{styles:"!page-break-after"},span:{match:function(e){
var t=e.parent;
return t&&"div"==t.name&&t.styles&&t.styles["page-break-after"];
},styles:"display"}},requiredContent:"div{page-break-after}"};
}(),function(){
function e(e,t,n){
var i=CKEDITOR.cleanWord;
if(i){
n();
}else{
var o=CKEDITOR.getUrl(e.config.pasteFromWordCleanupFile||t+"filter/default.js");
CKEDITOR.scriptLoader.load(o,n,null,!0);
}
return !i;
};
function t(e){
e.data.type="html";
};
CKEDITOR.plugins.add("pastefromword",{requires:"clipboard",init:function(n){
var i="pastefromword",o=0,a=this.path;
n.addCommand(i,{canUndo:!1,async:!0,exec:function(e){
var n=this;
o=1,e.once("beforePaste",t),e.getClipboardData({title:e.lang.pastefromword.title},function(t){
t&&e.fire("paste",{type:"html",dataValue:t.dataValue,method:"paste",dataTransfer:CKEDITOR.plugins.clipboard.initPasteDataTransfer()}),e.fire("afterCommandExec",{name:i,command:n,returnValue:!!t});
});
}}),n.ui.addButton&&n.ui.addButton("PasteFromWord",{label:n.lang.pastefromword.toolbar,command:i,toolbar:"clipboard,50"}),n.on("pasteState",function(e){
n.getCommand(i).setState(e.data);
}),n.on("paste",function(t){
var i=t.data,r=i.dataValue;
if(r&&(o||/(class=\"?Mso|style=\"[^\"]*\bmso\-|w:WordDocument)/.test(r))){
i.dontFilter=!0;
var s=e(n,a,function(){
s?n.fire("paste",i):(!n.config.pasteFromWordPromptCleanup||o||confirm(n.lang.pastefromword.confirmCleanup))&&(i.dataValue=CKEDITOR.cleanWord(r,n)),o=0;
});
s&&t.cancel();
}
},null,null,3);
}});
}(),function(){
var e={canUndo:!1,async:!0,exec:function(t){
t.getClipboardData({title:t.lang.pastetext.title},function(n){
n&&t.fire("paste",{type:"text",dataValue:n.dataValue,method:"paste",dataTransfer:CKEDITOR.plugins.clipboard.initPasteDataTransfer()}),t.fire("afterCommandExec",{name:"pastetext",command:e,returnValue:!!n});
});
}};
CKEDITOR.plugins.add("pastetext",{requires:"clipboard",init:function(t){
var n="pastetext";
t.addCommand(n,e),t.ui.addButton&&t.ui.addButton("PasteText",{label:t.lang.pastetext.button,command:n,toolbar:"clipboard,40"}),t.config.forcePasteAsPlainText&&t.on("beforePaste",function(e){
"html"!=e.data.type&&(e.data.type="text");
}),t.on("pasteState",function(e){
t.getCommand(n).setState(e.data);
});
}});
}(),function(){
var e,t={modes:{wysiwyg:1,source:1},canUndo:!1,readOnly:1,exec:function(t){
var n,i,o=t.config,a=o.baseHref?"<base href=\""+o.baseHref+"\"/>":"";
if(o.fullPage){
n=t.getData().replace(/<head>/,"$&"+a).replace(/[^>]*(?=<\/title>)/,"$& &mdash; "+t.lang.preview.preview);
}else{
var r="<body ",s=t.document&&t.document.getBody();
s&&(s.getAttribute("id")&&(r+="id=\""+s.getAttribute("id")+"\" "),s.getAttribute("class")&&(r+="class=\""+s.getAttribute("class")+"\" ")),r+=">",n=t.config.docType+"<html dir=\""+t.config.contentsLangDirection+"\"><head>"+a+"<title>"+t.lang.preview.preview+"</title>"+CKEDITOR.tools.buildStyleHtml(t.config.contentsCss)+"</head>"+r+t.getData()+"</body></html>";
}
var l=640,d=420,c=80;
try{
var u=window.screen;
l=Math.round(0.8*u.width),d=Math.round(0.7*u.height),c=Math.round(0.1*u.width);
}
catch(h){
}
if(t.fire("contentPreview",i={dataValue:n})===!1){
return !1;
}
var f,m="";
CKEDITOR.env.ie&&(window._cke_htmlToLoad=i.dataValue,f="javascript:void( (function(){document.open();"+("("+CKEDITOR.tools.fixDomain+")();").replace(/\/\/.*?\n/g,"").replace(/parent\./g,"window.opener.")+"document.write( window.opener._cke_htmlToLoad );document.close();window.opener._cke_htmlToLoad = null;})() )",m=""),CKEDITOR.env.gecko&&(window._cke_htmlToLoad=i.dataValue,m=CKEDITOR.getUrl(e+"preview.html"));
var g=window.open(m,null,"toolbar=yes,location=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width="+l+",height="+d+",left="+c);
if(CKEDITOR.env.ie&&g&&(g.location=f),!CKEDITOR.env.ie&&!CKEDITOR.env.gecko){
var p=g.document;
p.open(),p.write(i.dataValue),p.close();
}
return !0;
}},n="preview";
CKEDITOR.plugins.add(n,{init:function(i){
i.elementMode!=CKEDITOR.ELEMENT_MODE_INLINE&&(e=this.path,i.addCommand(n,t),i.ui.addButton&&i.ui.addButton("Preview",{label:i.lang.preview.preview,command:n,toolbar:"document,40"}));
}});
}(),CKEDITOR.plugins.add("print",{init:function(e){
if(e.elementMode!=CKEDITOR.ELEMENT_MODE_INLINE){
var t="print";
e.addCommand(t,CKEDITOR.plugins.print),e.ui.addButton&&e.ui.addButton("Print",{label:e.lang.print.toolbar,command:t,toolbar:"document,50"});
}
}}),CKEDITOR.plugins.print={exec:function(e){
CKEDITOR.env.gecko?e.window.$.print():e.document.$.execCommand("Print");
},canUndo:!1,readOnly:1,modes:{wysiwyg:1}},CKEDITOR.plugins.add("removeformat",{init:function(e){
e.addCommand("removeFormat",CKEDITOR.plugins.removeformat.commands.removeformat),e.ui.addButton&&e.ui.addButton("RemoveFormat",{label:e.lang.removeformat.toolbar,command:"removeFormat",toolbar:"cleanup,10"});
}}),CKEDITOR.plugins.removeformat={commands:{removeformat:{exec:function(e){
for(var t,n=e._.removeFormatRegex||(e._.removeFormatRegex=new RegExp("^(?:"+e.config.removeFormatTags.replace(/,/g,"|")+")$","i")),i=e._.removeAttributes||(e._.removeAttributes=e.config.removeFormatAttributes.split(",")),o=CKEDITOR.plugins.removeformat.filter,a=e.getSelection().getRanges(),r=a.createIterator(),s=function(e){
return e.type==CKEDITOR.NODE_ELEMENT;
};t=r.getNextRange();){
t.collapsed||t.enlarge(CKEDITOR.ENLARGE_ELEMENT);
var l,d=t.createBookmark(),c=d.startNode,u=d.endNode,h=function(t){
for(var i,a=e.elementPath(t),r=a.elements,s=1;(i=r[s])&&(!i.equals(a.block)&&!i.equals(a.blockLimit));s++){
n.test(i.getName())&&o(e,i)&&t.breakParent(i);
}
};
if(h(c),u){
for(h(u),l=c.getNextSourceNode(!0,CKEDITOR.NODE_ELEMENT);l&&!l.equals(u);){
if(l.isReadOnly()){
if(l.getPosition(u)&CKEDITOR.POSITION_CONTAINS){
break;
}
l=l.getNext(s);
}else{
var f=l.getNextSourceNode(!1,CKEDITOR.NODE_ELEMENT),m="img"==l.getName()&&l.data("cke-realelement");
!m&&o(e,l)&&(n.test(l.getName())?l.remove(1):(l.removeAttributes(i),e.fire("removeFormatCleanup",l))),l=f;
}
}
}
t.moveToBookmark(d);
}
e.forceNextSelectionCheck(),e.getSelection().selectRanges(a);
}}},filter:function(e,t){
for(var n=e._.removeFormatFilters||[],i=0;i<n.length;i++){
if(n[i](t)===!1){
return !1;
}
}
return !0;
}},CKEDITOR.editor.prototype.addRemoveFormatFilter=function(e){
this._.removeFormatFilters||(this._.removeFormatFilters=[]),this._.removeFormatFilters.push(e);
},CKEDITOR.config.removeFormatTags="b,big,cite,code,del,dfn,em,font,i,ins,kbd,q,s,samp,small,span,strike,strong,sub,sup,tt,u,var",CKEDITOR.config.removeFormatAttributes="class,style,lang,width,height,align,hspace,valign",CKEDITOR.plugins.add("resize",{init:function(e){
function t(t){
var n=t.data.$.screenX-r.x,o=t.data.$.screenY-r.y,l=s.width,u=s.height,h=l+n*("rtl"==a?-1:1),f=u+o;
d&&(l=Math.max(i.resize_minWidth,Math.min(h,i.resize_maxWidth))),c&&(u=Math.max(i.resize_minHeight,Math.min(f,i.resize_maxHeight))),e.resize(d?l:null,u);
};
function n(){
CKEDITOR.document.removeListener("mousemove",t),CKEDITOR.document.removeListener("mouseup",n),e.document&&(e.document.removeListener("mousemove",t),e.document.removeListener("mouseup",n));
};
var i=e.config,o=e.ui.spaceId("resizer"),a=e.element?e.element.getDirection(1):"ltr";
if(!i.resize_dir&&(i.resize_dir="vertical"),void 0===i.resize_maxWidth&&(i.resize_maxWidth=3000),void 0===i.resize_maxHeight&&(i.resize_maxHeight=3000),void 0===i.resize_minWidth&&(i.resize_minWidth=750),void 0===i.resize_minHeight&&(i.resize_minHeight=250),i.resize_enabled!==!1){
var r,s,l=null,d=("both"==i.resize_dir||"horizontal"==i.resize_dir)&&i.resize_minWidth!=i.resize_maxWidth,c=("both"==i.resize_dir||"vertical"==i.resize_dir)&&i.resize_minHeight!=i.resize_maxHeight,u=CKEDITOR.tools.addFunction(function(o){
l||(l=e.getResizable()),s={width:l.$.offsetWidth||0,height:l.$.offsetHeight||0},r={x:o.screenX,y:o.screenY},i.resize_minWidth>s.width&&(i.resize_minWidth=s.width),i.resize_minHeight>s.height&&(i.resize_minHeight=s.height),CKEDITOR.document.on("mousemove",t),CKEDITOR.document.on("mouseup",n),e.document&&(e.document.on("mousemove",t),e.document.on("mouseup",n)),o.preventDefault&&o.preventDefault();
});
e.on("destroy",function(){
CKEDITOR.tools.removeFunction(u);
}),e.on("uiSpace",function(t){
if("bottom"==t.data.space){
var n="";
d&&!c&&(n=" cke_resizer_horizontal"),!d&&c&&(n=" cke_resizer_vertical");
var i="<span id=\""+o+"\" class=\"cke_resizer"+n+" cke_resizer_"+a+"\" title=\""+CKEDITOR.tools.htmlEncode(e.lang.common.resize)+"\" onmousedown=\"CKEDITOR.tools.callFunction("+u+", event)\">"+("ltr"==a?"\u25e2":"\u25e3")+"</span>";
"ltr"==a&&"ltr"==n?t.data.html+=i:t.data.html=i+t.data.html;
}
},e,null,100),e.on("maximize",function(t){
e.ui.space("resizer")[t.data==CKEDITOR.TRISTATE_ON?"hide":"show"]();
});
}
}}),function(){
var e={readOnly:1,exec:function(e){
if(e.fire("save")){
var t=e.element.$.form;
if(t){
try{
t.submit();
}
catch(n){
t.submit.click&&t.submit.click();
}
}
}
}},t="save";
CKEDITOR.plugins.add(t,{init:function(n){
if(n.elementMode==CKEDITOR.ELEMENT_MODE_REPLACE){
var i=n.addCommand(t,e);
i.modes={wysiwyg:!!n.element.$.form},n.ui.addButton&&n.ui.addButton("Save",{label:n.lang.save.toolbar,command:t,toolbar:"document,10"});
}
}});
}(),function(){
CKEDITOR.plugins.add("selectall",{init:function(e){
e.addCommand("selectAll",{modes:{wysiwyg:1,source:1},exec:function(e){
var t=e.editable();
if(t.is("textarea")){
var n=t.$;
CKEDITOR.env.ie?n.createTextRange().execCommand("SelectAll"):(n.selectionStart=0,n.selectionEnd=n.value.length),n.focus();
}else{
if(t.is("body")){
e.document.$.execCommand("SelectAll",!1,null);
}else{
var i=e.createRange();
i.selectNodeContents(t),i.select();
}
e.forceNextSelectionCheck(),e.selectionChange();
}
},canUndo:!1}),e.ui.addButton&&e.ui.addButton("SelectAll",{label:e.lang.selectall.toolbar,command:"selectAll",toolbar:"selection,10"});
}});
}(),function(){
"use strict";
var e={readOnly:1,preserveState:!0,editorFocus:!1,exec:function(e){
this.toggleState(),this.refresh(e);
},refresh:function(e){
if(e.document){
var t=this.state==CKEDITOR.TRISTATE_ON&&(e.elementMode!=CKEDITOR.ELEMENT_MODE_INLINE||e.focusManager.hasFocus),n=t?"attachClass":"removeClass";
e.editable()[n]("cke_show_blocks");
}
}};
CKEDITOR.plugins.add("showblocks",{onLoad:function(){
var e,t,n,i,o,a,r=["p","div","pre","address","blockquote","h1","h2","h3","h4","h5","h6"],s=CKEDITOR.getUrl(this.path),l=!(CKEDITOR.env.ie&&CKEDITOR.env.version<9),d=l?":not([contenteditable=false]):not(.cke_show_blocks_off)":"";
for(e=t=n=i="";o=r.pop();){
a=r.length?",":"",e+=".cke_show_blocks "+o+d+a,n+=".cke_show_blocks.cke_contents_ltr "+o+d+a,i+=".cke_show_blocks.cke_contents_rtl "+o+d+a,t+=".cke_show_blocks "+o+d+"{background-image:url("+CKEDITOR.getUrl(s+"images/block_"+o+".png")+")}";
}
e+="{background-repeat:no-repeat;border:1px dotted gray;padding-top:8px}",n+="{background-position:top left;padding-left:8px}",i+="{background-position:top right;padding-right:8px}",CKEDITOR.addCss(e.concat(t,n,i)),l||CKEDITOR.addCss(".cke_show_blocks [contenteditable=false],.cke_show_blocks .cke_show_blocks_off{border:none;padding-top:0;background-image:none}.cke_show_blocks.cke_contents_rtl [contenteditable=false],.cke_show_blocks.cke_contents_rtl .cke_show_blocks_off{padding-right:0}.cke_show_blocks.cke_contents_ltr [contenteditable=false],.cke_show_blocks.cke_contents_ltr .cke_show_blocks_off{padding-left:0}");
},init:function(t){
function n(){
i.refresh(t);
};
if(!t.blockless){
var i=t.addCommand("showblocks",e);
i.canUndo=!1,t.config.startupOutlineBlocks&&i.setState(CKEDITOR.TRISTATE_ON),t.ui.addButton&&t.ui.addButton("ShowBlocks",{label:t.lang.showblocks.toolbar,command:"showblocks",toolbar:"tools,20"}),t.on("mode",function(){
i.state!=CKEDITOR.TRISTATE_DISABLED&&i.refresh(t);
}),t.elementMode==CKEDITOR.ELEMENT_MODE_INLINE&&(t.on("focus",n),t.on("blur",n)),t.on("contentDom",function(){
i.state!=CKEDITOR.TRISTATE_DISABLED&&i.refresh(t);
});
}
}});
}(),function(){
var e={preserveState:!0,editorFocus:!1,readOnly:1,exec:function(e){
this.toggleState(),this.refresh(e);
},refresh:function(e){
if(e.document){
var t=this.state==CKEDITOR.TRISTATE_ON?"attachClass":"removeClass";
e.editable()[t]("cke_show_borders");
}
}},t="cke_show_border";
CKEDITOR.plugins.add("showborders",{modes:{wysiwyg:1},onLoad:function(){
var e,n=(CKEDITOR.env.ie6Compat?[".%1 table.%2,",".%1 table.%2 td, .%1 table.%2 th","{","border : #d3d3d3 1px dotted","}"]:[".%1 table.%2,",".%1 table.%2 > tr > td, .%1 table.%2 > tr > th,",".%1 table.%2 > tbody > tr > td, .%1 table.%2 > tbody > tr > th,",".%1 table.%2 > thead > tr > td, .%1 table.%2 > thead > tr > th,",".%1 table.%2 > tfoot > tr > td, .%1 table.%2 > tfoot > tr > th","{","border : #d3d3d3 1px dotted","}"]).join("");
e=n.replace(/%2/g,t).replace(/%1/g,"cke_show_borders "),CKEDITOR.addCss(e);
},init:function(n){
var i=n.addCommand("showborders",e);
i.canUndo=!1,n.config.startupShowBorders!==!1&&i.setState(CKEDITOR.TRISTATE_ON),n.on("mode",function(){
i.state!=CKEDITOR.TRISTATE_DISABLED&&i.refresh(n);
},null,null,100),n.on("contentDom",function(){
i.state!=CKEDITOR.TRISTATE_DISABLED&&i.refresh(n);
}),n.on("removeFormatCleanup",function(e){
var i=e.data;
n.getCommand("showborders").state==CKEDITOR.TRISTATE_ON&&i.is("table")&&(!i.hasAttribute("border")||parseInt(i.getAttribute("border"),10)<=0)&&i.addClass(t);
});
},afterInit:function(e){
var n=e.dataProcessor,i=n&&n.dataFilter,o=n&&n.htmlFilter;
i&&i.addRules({elements:{table:function(e){
var n=e.attributes,i=n["class"],o=parseInt(n.border,10);
o&&!(0>=o)||i&&-1!=i.indexOf(t)||(n["class"]=(i||"")+" "+t);
}}}),o&&o.addRules({elements:{table:function(e){
var n=e.attributes,i=n["class"];
i&&(n["class"]=i.replace(t,"").replace(/\s{2}/," ").replace(/^\s+|\s+$/,""));
}}});
}}),CKEDITOR.on("dialogDefinition",function(e){
var n=e.data.name;
if("table"==n||"tableProperties"==n){
var i=e.data.definition,o=i.getContents("info"),a=o.get("txtBorder"),r=a.commit;
a.commit=CKEDITOR.tools.override(r,function(e){
return function(n,i){
e.apply(this,arguments);
var o=parseInt(this.getValue(),10);
i[!o||0>=o?"addClass":"removeClass"](t);
};
});
var s=i.getContents("advanced"),l=s&&s.get("advCSSClasses");
l&&(l.setup=CKEDITOR.tools.override(l.setup,function(e){
return function(){
e.apply(this,arguments),this.setValue(this.getValue().replace(/cke_show_border/,""));
};
}),l.commit=CKEDITOR.tools.override(l.commit,function(e){
return function(t,n){
e.apply(this,arguments),parseInt(n.getAttribute("border"),10)||n.addClass("cke_show_border");
};
}));
}
});
}(),CKEDITOR.plugins.add("smiley",{requires:"dialog",init:function(e){
e.config.smiley_path=e.config.smiley_path||this.path+"images/",e.addCommand("smiley",new CKEDITOR.dialogCommand("smiley",{allowedContent:"img[alt,height,!src,title,width]",requiredContent:"img"})),e.ui.addButton&&e.ui.addButton("Smiley",{label:e.lang.smiley.toolbar,command:"smiley",toolbar:"insert,50"}),CKEDITOR.dialog.add("smiley",this.path+"dialogs/smiley.js");
}}),CKEDITOR.config.smiley_images=["regular_smile.png","sad_smile.png","wink_smile.png","teeth_smile.png","confused_smile.png","tongue_smile.png","embarrassed_smile.png","omg_smile.png","whatchutalkingabout_smile.png","angry_smile.png","angel_smile.png","shades_smile.png","devil_smile.png","cry_smile.png","lightbulb.png","thumbs_down.png","thumbs_up.png","heart.png","broken_heart.png","kiss.png","envelope.png"],CKEDITOR.config.smiley_descriptions=["smiley","sad","wink","laugh","frown","cheeky","blush","surprise","indecision","angry","angel","cool","devil","crying","enlightened","no","yes","heart","broken heart","kiss","mail"],function(){
CKEDITOR.plugins.add("sourcearea",{init:function(t){
function n(){
var e=o&&this.equals(CKEDITOR.document.getActive());
this.hide(),this.setStyle("height",this.getParent().$.clientHeight+"px"),this.setStyle("width",this.getParent().$.clientWidth+"px"),this.show(),e&&this.focus();
};
if(t.elementMode!=CKEDITOR.ELEMENT_MODE_INLINE){
var i=CKEDITOR.plugins.sourcearea;
t.addMode("source",function(i){
var o=t.ui.space("contents"),a=o.getDocument().createElement("textarea");
a.setStyles(CKEDITOR.tools.extend({width:CKEDITOR.env.ie7Compat?"99%":"100%",height:"100%",resize:"none",outline:"none","text-align":"left"},CKEDITOR.tools.cssVendorPrefix("tab-size",t.config.sourceAreaTabSize||4))),a.setAttribute("dir","ltr"),a.addClass("cke_source").addClass("cke_reset").addClass("cke_enable_context_menu"),t.ui.space("contents").append(a);
var r=t.editable(new e(t,a));
r.setData(t.getData(1)),CKEDITOR.env.ie&&(r.attachListener(t,"resize",n,r),r.attachListener(CKEDITOR.document.getWindow(),"resize",n,r),CKEDITOR.tools.setTimeout(n,0,r)),t.fire("ariaWidget",this),i();
}),t.addCommand("source",i.commands.source),t.ui.addButton&&t.ui.addButton("Source",{label:t.lang.sourcearea.toolbar,command:"source",toolbar:"mode,10"}),t.on("mode",function(){
t.getCommand("source").setState("source"==t.mode?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF);
});
var o=CKEDITOR.env.ie&&9==CKEDITOR.env.version;
}
}});
var e=CKEDITOR.tools.createClass({base:CKEDITOR.editable,proto:{setData:function(e){
this.setValue(e),this.status="ready",this.editor.fire("dataReady");
},getData:function(){
return this.getValue();
},insertHtml:function(){
},insertElement:function(){
},insertText:function(){
},setReadOnly:function(e){
this[(e?"set":"remove")+"Attribute"]("readOnly","readonly");
},detach:function(){
e.baseProto.detach.call(this),this.clearCustomData(),this.remove();
}}});
}(),CKEDITOR.plugins.sourcearea={commands:{source:{modes:{wysiwyg:1,source:1},editorFocus:!1,readOnly:1,exec:function(e){
"wysiwyg"==e.mode&&e.fire("saveSnapshot"),e.getCommand("source").setState(CKEDITOR.TRISTATE_DISABLED),e.setMode("source"==e.mode?"wysiwyg":"source");
},canUndo:!1}}},CKEDITOR.plugins.add("specialchar",{availableLangs:{af:1,ar:1,bg:1,ca:1,cs:1,cy:1,da:1,de:1,el:1,en:1,"en-gb":1,eo:1,es:1,et:1,eu:1,fa:1,fi:1,fr:1,"fr-ca":1,gl:1,he:1,hr:1,hu:1,id:1,it:1,ja:1,km:1,ko:1,ku:1,lt:1,lv:1,nb:1,nl:1,no:1,pl:1,pt:1,"pt-br":1,ru:1,si:1,sk:1,sl:1,sq:1,sv:1,th:1,tr:1,tt:1,ug:1,uk:1,vi:1,zh:1,"zh-cn":1},requires:"dialog",init:function(e){
var t="specialchar",n=this;
CKEDITOR.dialog.add(t,this.path+"dialogs/specialchar.js"),e.addCommand(t,{exec:function(){
var i=e.langCode;
i=n.availableLangs[i]?i:n.availableLangs[i.replace(/-.*/,"")]?i.replace(/-.*/,""):"en",CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(n.path+"dialogs/lang/"+i+".js"),function(){
CKEDITOR.tools.extend(e.lang.specialchar,n.langEntries[i]),e.openDialog(t);
});
},modes:{wysiwyg:1},canUndo:!1}),e.ui.addButton&&e.ui.addButton("SpecialChar",{label:e.lang.specialchar.toolbar,command:t,toolbar:"insert,50"});
}}),CKEDITOR.config.specialChars=["!","&quot;","#","$","%","&amp;","'","(",")","*","+","-",".","/","0","1","2","3","4","5","6","7","8","9",":",";","&lt;","=","&gt;","?","@","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","[","]","^","_","`","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","{","|","}","~","&euro;","&lsquo;","&rsquo;","&ldquo;","&rdquo;","&ndash;","&mdash;","&iexcl;","&cent;","&pound;","&curren;","&yen;","&brvbar;","&sect;","&uml;","&copy;","&ordf;","&laquo;","&not;","&reg;","&macr;","&deg;","&sup2;","&sup3;","&acute;","&micro;","&para;","&middot;","&cedil;","&sup1;","&ordm;","&raquo;","&frac14;","&frac12;","&frac34;","&iquest;","&Agrave;","&Aacute;","&Acirc;","&Atilde;","&Auml;","&Aring;","&AElig;","&Ccedil;","&Egrave;","&Eacute;","&Ecirc;","&Euml;","&Igrave;","&Iacute;","&Icirc;","&Iuml;","&ETH;","&Ntilde;","&Ograve;","&Oacute;","&Ocirc;","&Otilde;","&Ouml;","&times;","&Oslash;","&Ugrave;","&Uacute;","&Ucirc;","&Uuml;","&Yacute;","&THORN;","&szlig;","&agrave;","&aacute;","&acirc;","&atilde;","&auml;","&aring;","&aelig;","&ccedil;","&egrave;","&eacute;","&ecirc;","&euml;","&igrave;","&iacute;","&icirc;","&iuml;","&eth;","&ntilde;","&ograve;","&oacute;","&ocirc;","&otilde;","&ouml;","&divide;","&oslash;","&ugrave;","&uacute;","&ucirc;","&uuml;","&yacute;","&thorn;","&yuml;","&OElig;","&oelig;","&#372;","&#374","&#373","&#375;","&sbquo;","&#8219;","&bdquo;","&hellip;","&trade;","&#9658;","&bull;","&rarr;","&rArr;","&hArr;","&diams;","&asymp;"],function(){
"use strict";
CKEDITOR.plugins.add("stylescombo",{requires:"richcombo",init:function(e){
var t=e.config,n=e.lang.stylescombo,i={},o=[],a=[];
e.on("stylesSet",function(n){
var r=n.data.styles;
if(r){
for(var s,l,d,c=0,u=r.length;u>c;c++){
var h=r[c];
e.blockless&&h.element in CKEDITOR.dtd.$block||(l=h.name,s=new CKEDITOR.style(h),(!e.filter.customConfig||e.filter.check(s))&&(s._name=l,s._.enterMode=t.enterMode,s._.type=d=s.assignedTo||s.type,s._.weight=c+1000*(d==CKEDITOR.STYLE_OBJECT?1:d==CKEDITOR.STYLE_BLOCK?2:3),i[l]=s,o.push(s),a.push(s)));
}
o.sort(function(e,t){
return e._.weight-t._.weight;
});
}
}),e.ui.addRichCombo("Styles",{label:n.label,title:n.panelTitle,toolbar:"styles,10",allowedContent:a,panel:{css:[CKEDITOR.skin.getPath("editor")].concat(t.contentsCss),multiSelect:!0,attributes:{"aria-label":n.panelTitle}},init:function(){
var e,t,i,a,r,s;
for(r=0,s=o.length;s>r;r++){
e=o[r],t=e._name,a=e._.type,a!=i&&(this.startGroup(n["panelTitle"+String(a)]),i=a),this.add(t,e.type==CKEDITOR.STYLE_OBJECT?t:e.buildPreview(),t);
}
this.commit();
},onClick:function(t){
e.focus(),e.fire("saveSnapshot");
var n=i[t],o=e.elementPath();
e[n.checkActive(o,e)?"removeStyle":"applyStyle"](n),e.fire("saveSnapshot");
},onRender:function(){
e.on("selectionChange",function(t){
for(var n,o=this.getValue(),a=t.data.path,r=a.elements,s=0,l=r.length;l>s;s++){
n=r[s];
for(var d in i){
if(i[d].checkElementRemovable(n,!0,e)){
return void (d!=o&&this.setValue(d));
}
}
}
this.setValue("");
},this);
},onOpen:function(){
var t=e.getSelection(),o=t.getSelectedElement(),a=e.elementPath(o),r=[0,0,0,0];
this.showAll(),this.unmarkAll();
for(var s in i){
var l=i[s],d=l._.type;
l.checkApplicable(a,e,e.activeFilter)?r[d]++:this.hideItem(s),l.checkActive(a,e)&&this.mark(s);
}
r[CKEDITOR.STYLE_BLOCK]||this.hideGroup(n["panelTitle"+String(CKEDITOR.STYLE_BLOCK)]),r[CKEDITOR.STYLE_INLINE]||this.hideGroup(n["panelTitle"+String(CKEDITOR.STYLE_INLINE)]),r[CKEDITOR.STYLE_OBJECT]||this.hideGroup(n["panelTitle"+String(CKEDITOR.STYLE_OBJECT)]);
},refresh:function(){
var t=e.elementPath();
if(t){
for(var n in i){
var o=i[n];
if(o.checkApplicable(t,e,e.activeFilter)){
return;
}
}
this.setState(CKEDITOR.TRISTATE_DISABLED);
}
},reset:function(){
i={},o=[];
}});
}});
}(),function(){
function e(e){
return {editorFocus:!1,canUndo:!1,modes:{wysiwyg:1},exec:function(t){
if(t.editable().hasFocus){
var n,i=t.getSelection(),o=new CKEDITOR.dom.elementPath(i.getCommonAncestor(),i.root);
if(n=o.contains({td:1,th:1},1)){
var a=t.createRange(),r=CKEDITOR.tools.tryThese(function(){
var t=n.getParent(),i=t.$.cells[n.$.cellIndex+(e?-1:1)];
return i.parentNode.parentNode,i;
},function(){
var t=n.getParent(),i=t.getAscendant("table"),o=i.$.rows[t.$.rowIndex+(e?-1:1)];
return o.cells[e?o.cells.length-1:0];
});
if(r||e){
if(!r){
return !0;
}
r=new CKEDITOR.dom.element(r),a.moveToElementEditStart(r),a.checkStartOfBlock()&&a.checkEndOfBlock()||a.selectNodeContents(r);
}else{
for(var s=n.getAscendant("table").$,l=n.getParent().$.cells,d=new CKEDITOR.dom.element(s.insertRow(-1),t.document),c=0,u=l.length;u>c;c++){
var h=d.append(new CKEDITOR.dom.element(l[c],t.document).clone(!1,!1));
h.appendBogus();
}
a.moveToElementEditStart(d);
}
return a.select(!0),!0;
}
}
return !1;
}};
};
var t={editorFocus:!1,modes:{wysiwyg:1,source:1}},n={exec:function(e){
e.container.focusNext(!0,e.tabIndex);
}},i={exec:function(e){
e.container.focusPrevious(!0,e.tabIndex);
}};
CKEDITOR.plugins.add("tab",{init:function(o){
for(var a=o.config.enableTabKeyTools!==!1,r=o.config.tabSpaces||0,s="";r--;){
s+="\xa0";
}
s&&o.on("key",function(e){
9==e.data.keyCode&&(o.insertText(s),e.cancel());
}),a&&o.on("key",function(e){
(9==e.data.keyCode&&o.execCommand("selectNextCell")||e.data.keyCode==CKEDITOR.SHIFT+9&&o.execCommand("selectPreviousCell"))&&e.cancel();
}),o.addCommand("blur",CKEDITOR.tools.extend(n,t)),o.addCommand("blurBack",CKEDITOR.tools.extend(i,t)),o.addCommand("selectNextCell",e()),o.addCommand("selectPreviousCell",e(!0));
}});
}(),CKEDITOR.dom.element.prototype.focusNext=function(e,t){
var n,i,o,a,r,s,l=void 0===t?this.getTabIndex():t;
if(0>=l){
for(r=this.getNextSourceNode(e,CKEDITOR.NODE_ELEMENT);r;){
if(r.isVisible()&&0===r.getTabIndex()){
o=r;
break;
}
r=r.getNextSourceNode(!1,CKEDITOR.NODE_ELEMENT);
}
}else{
for(r=this.getDocument().getBody().getFirst();r=r.getNextSourceNode(!1,CKEDITOR.NODE_ELEMENT);){
if(!n){
if(!i&&r.equals(this)){
if(i=!0,e){
if(!(r=r.getNextSourceNode(!0,CKEDITOR.NODE_ELEMENT))){
break;
}
n=1;
}
}else{
i&&!this.contains(r)&&(n=1);
}
}
if(r.isVisible()&&!((s=r.getTabIndex())<0)){
if(n&&s==l){
o=r;
break;
}
s>l&&(!o||!a||a>s)?(o=r,a=s):o||0!==s||(o=r,a=s);
}
}
}
o&&o.focus();
},CKEDITOR.dom.element.prototype.focusPrevious=function(e,t){
for(var n,i,o,a,r=void 0===t?this.getTabIndex():t,s=0,l=this.getDocument().getBody().getLast();l=l.getPreviousSourceNode(!1,CKEDITOR.NODE_ELEMENT);){
if(!n){
if(!i&&l.equals(this)){
if(i=!0,e){
if(!(l=l.getPreviousSourceNode(!0,CKEDITOR.NODE_ELEMENT))){
break;
}
n=1;
}
}else{
i&&!this.contains(l)&&(n=1);
}
}
if(l.isVisible()&&!((a=l.getTabIndex())<0)){
if(0>=r){
if(n&&0===a){
o=l;
break;
}
a>s&&(o=l,s=a);
}else{
if(n&&a==r){
o=l;
break;
}
r>a&&(!o||a>s)&&(o=l,s=a);
}
}
}
o&&o.focus();
},CKEDITOR.plugins.add("table",{requires:"dialog",init:function(e){
function t(e){
return CKEDITOR.tools.extend(e||{},{contextSensitive:1,refresh:function(e,t){
this.setState(t.contains("table",1)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED);
}});
};
if(!e.blockless){
var n=e.lang.table;
e.addCommand("table",new CKEDITOR.dialogCommand("table",{context:"table",allowedContent:"table{width,height}[align,border,cellpadding,cellspacing,summary];caption tbody thead tfoot;th td tr[scope];"+(e.plugins.dialogadvtab?"table"+e.plugins.dialogadvtab.allowedContent():""),requiredContent:"table",contentTransformations:[["table{width}: sizeToStyle","table[width]: sizeToAttribute"]]})),e.addCommand("tableProperties",new CKEDITOR.dialogCommand("tableProperties",t())),e.addCommand("tableDelete",t({exec:function(e){
var t=e.elementPath(),n=t.contains("table",1);
if(n){
var i=n.getParent(),o=e.editable();
1!=i.getChildCount()||i.is("td","th")||i.equals(o)||(n=i);
var a=e.createRange();
a.moveToPosition(n,CKEDITOR.POSITION_BEFORE_START),n.remove(),a.select();
}
}})),e.ui.addButton&&e.ui.addButton("Table",{label:n.toolbar,command:"table",toolbar:"insert,30"}),CKEDITOR.dialog.add("table",this.path+"dialogs/table.js"),CKEDITOR.dialog.add("tableProperties",this.path+"dialogs/table.js"),e.addMenuItems&&e.addMenuItems({table:{label:n.menu,command:"tableProperties",group:"table",order:5},tabledelete:{label:n.deleteTable,command:"tableDelete",group:"table",order:1}}),e.on("doubleclick",function(e){
var t=e.data.element;
t.is("table")&&(e.data.dialog="tableProperties");
}),e.contextMenu&&e.contextMenu.addListener(function(){
return {tabledelete:CKEDITOR.TRISTATE_OFF,table:CKEDITOR.TRISTATE_OFF};
});
}
}}),function(){
function e(e){
function t(e){
i.length>0||e.type==CKEDITOR.NODE_ELEMENT&&E.test(e.getName())&&!e.getCustomData("selected_cell")&&(CKEDITOR.dom.element.setMarker(o,e,"selected_cell",!0),i.push(e));
};
for(var n=e.getRanges(),i=[],o={},a=0;a<n.length;a++){
var r=n[a];
if(r.collapsed){
var s=r.getCommonAncestor(),l=s.getAscendant("td",!0)||s.getAscendant("th",!0);
l&&i.push(l);
}else{
var d,c=new CKEDITOR.dom.walker(r);
for(c.guard=t;d=c.next();){
if(d.type!=CKEDITOR.NODE_ELEMENT||!d.is(CKEDITOR.dtd.table)){
var u=d.getAscendant("td",!0)||d.getAscendant("th",!0);
u&&!u.getCustomData("selected_cell")&&(CKEDITOR.dom.element.setMarker(o,u,"selected_cell",!0),i.push(u));
}
}
}
}
return CKEDITOR.dom.element.clearAllMarkers(o),i;
};
function t(e){
for(var t,n,i,o=0,a=e.length-1,r={};t=e[o++];){
CKEDITOR.dom.element.setMarker(r,t,"delete_cell",!0);
}
for(o=0;t=e[o++];){
if((n=t.getPrevious())&&!n.getCustomData("delete_cell")||(n=t.getNext())&&!n.getCustomData("delete_cell")){
return CKEDITOR.dom.element.clearAllMarkers(r),n;
}
}
return CKEDITOR.dom.element.clearAllMarkers(r),i=e[0].getParent(),(i=i.getPrevious())?i.getLast():(i=e[a].getParent(),(i=i.getNext())?i.getChild(0):null);
};
function n(t,n){
for(var i=e(t),o=i[0],a=o.getAscendant("table"),r=o.getDocument(),s=i[0].getParent(),l=s.$.rowIndex,d=i[i.length-1],c=d.getParent().$.rowIndex+d.$.rowSpan-1,u=new CKEDITOR.dom.element(a.$.rows[c]),h=n?l:c,f=n?s:u,m=CKEDITOR.tools.buildTableMap(a),g=m[h],p=n?m[h-1]:m[h+1],E=m[0].length,T=r.createElement("tr"),C=0;g[C]&&E>C;C++){
var v;
g[C].rowSpan>1&&p&&g[C]==p[C]?(v=g[C],v.rowSpan+=1):(v=new CKEDITOR.dom.element(g[C]).clone(),v.removeAttribute("rowSpan"),v.appendBogus(),T.append(v),v=v.$),C+=v.colSpan-1;
}
n?T.insertBefore(f):T.insertAfter(f);
};
function i(t){
if(t instanceof CKEDITOR.dom.selection){
for(var n=e(t),o=n[0],a=o.getAscendant("table"),r=CKEDITOR.tools.buildTableMap(a),s=n[0].getParent(),l=s.$.rowIndex,d=n[n.length-1],c=d.getParent().$.rowIndex+d.$.rowSpan-1,u=[],h=l;c>=h;h++){
for(var f=r[h],m=new CKEDITOR.dom.element(a.$.rows[h]),g=0;g<f.length;g++){
var p=new CKEDITOR.dom.element(f[g]),E=p.getParent().$.rowIndex;
if(1==p.$.rowSpan){
p.remove();
}else{
if(p.$.rowSpan-=1,E==h){
var T=r[h+1];
T[g-1]?p.insertAfter(new CKEDITOR.dom.element(T[g-1])):new CKEDITOR.dom.element(a.$.rows[h+1]).append(p,1);
}
}
g+=p.$.colSpan-1;
}
u.push(m);
}
var C=a.$.rows,v=new CKEDITOR.dom.element(C[c+1]||(l>0?C[l-1]:null)||a.$.parentNode);
for(h=u.length;h>=0;h--){
i(u[h]);
}
return v;
}
return t instanceof CKEDITOR.dom.element&&(a=t.getAscendant("table"),1==a.$.rows.length?a.remove():t.remove()),null;
};
function o(e,t){
for(var n=e.getParent(),i=n.$.cells,o=0,a=0;a<i.length;a++){
var r=i[a];
if(o+=t?1:r.colSpan,r==e.$){
break;
}
}
return o-1;
};
function a(e,t){
for(var n=t?1/0:0,i=0;i<e.length;i++){
var a=o(e[i],t);
(t?n>a:a>n)&&(n=a);
}
return n;
};
function r(t,n){
for(var i=e(t),o=i[0],r=o.getAscendant("table"),s=a(i,1),l=a(i),d=n?s:l,c=CKEDITOR.tools.buildTableMap(r),u=[],h=[],f=c.length,m=0;f>m;m++){
u.push(c[m][d]);
var g=n?c[m][d-1]:c[m][d+1];
h.push(g);
}
for(m=0;f>m;m++){
var p;
u[m]&&(u[m].colSpan>1&&h[m]==u[m]?(p=u[m],p.colSpan+=1):(p=new CKEDITOR.dom.element(u[m]).clone(),p.removeAttribute("colSpan"),p.appendBogus(),p[n?"insertBefore":"insertAfter"].call(p,new CKEDITOR.dom.element(u[m])),p=p.$),m+=p.rowSpan-1);
}
};
function s(t){
for(var n,i,o=e(t),a=o[0],r=o[o.length-1],s=a.getAscendant("table"),l=CKEDITOR.tools.buildTableMap(s),d=[],c=0,u=l.length;u>c;c++){
for(var h=0,f=l[c].length;f>h;h++){
l[c][h]==a.$&&(n=h),l[c][h]==r.$&&(i=h);
}
}
for(c=n;i>=c;c++){
for(h=0;h<l.length;h++){
var m=l[h],g=new CKEDITOR.dom.element(s.$.rows[h]),p=new CKEDITOR.dom.element(m[c]);
p.$&&(1==p.$.colSpan?p.remove():p.$.colSpan-=1,h+=p.$.rowSpan-1,g.$.cells.length||d.push(g));
}
}
var E=s.$.rows[0]&&s.$.rows[0].cells,T=new CKEDITOR.dom.element(E[n]||(n?E[n-1]:s.$.parentNode));
return d.length==u&&s.remove(),T;
};
function l(e,t){
var n=e.getStartElement(),i=n.getAscendant("td",1)||n.getAscendant("th",1);
if(i){
var o=i.clone();
o.appendBogus(),t?o.insertBefore(i):o.insertAfter(i);
}
};
function d(n){
if(n instanceof CKEDITOR.dom.selection){
for(var i=e(n),o=i[0]&&i[0].getAscendant("table"),a=t(i),r=i.length-1;r>=0;r--){
d(i[r]);
}
a?u(a,!0):o&&o.remove();
}else{
if(n instanceof CKEDITOR.dom.element){
var s=n.getParent();
1==s.getChildCount()?s.remove():n.remove();
}
}
};
function c(e){
var t=e.getBogus();
t&&t.remove(),e.trim();
};
function u(e,t){
var n=e.getDocument(),i=CKEDITOR.document;
CKEDITOR.env.ie&&10==CKEDITOR.env.version&&(i.focus(),n.focus());
var o=new CKEDITOR.dom.range(n);
o["moveToElementEdit"+(t?"End":"Start")](e)||(o.selectNodeContents(e),o.collapse(t?!1:!0)),o.select(!0);
};
function h(e,t,n){
var i=e[t];
if("undefined"==typeof n){
return i;
}
for(var o=0;i&&o<i.length;o++){
if(n.is&&i[o]==n.$){
return o;
}
if(o==n){
return new CKEDITOR.dom.element(i[o]);
}
}
return n.is?-1:null;
};
function f(e,t){
for(var n=[],i=0;i<e.length;i++){
var o=e[i];
n.push(o[t]),o[t].rowSpan>1&&(i+=o[t].rowSpan-1);
}
return n;
};
function m(t,n,i){
var o,a=e(t);
if((n?1!=a.length:a.length<2)||(o=t.getCommonAncestor())&&o.type==CKEDITOR.NODE_ELEMENT&&o.is("table")){
return !1;
}
var r,s=a[0],l=s.getAscendant("table"),d=CKEDITOR.tools.buildTableMap(l),u=d.length,f=d[0].length,m=s.getParent().$.rowIndex,g=h(d,m,s);
if(n){
var p;
try{
var E=parseInt(s.getAttribute("rowspan"),10)||1,T=parseInt(s.getAttribute("colspan"),10)||1;
p=d["up"==n?m-E:"down"==n?m+E:m]["left"==n?g-T:"right"==n?g+T:g];
}
catch(C){
return !1;
}
if(!p||s.$==p){
return !1;
}
a["up"==n||"left"==n?"unshift":"push"](new CKEDITOR.dom.element(p));
}
for(var v=s.getDocument(),I=m,O=0,D=0,b=!i&&new CKEDITOR.dom.documentFragment(v),R=0,y=0;y<a.length;y++){
r=a[y];
var K=r.getParent(),_18=r.getFirst(),k=r.$.colSpan,w=r.$.rowSpan,S=K.$.rowIndex,x=h(d,S,r);
if(R+=k*w,D=Math.max(D,x-g+k),O=Math.max(O,S-m+w),!i){
if(c(r),r.getChildren().count()){
if(S!=I&&_18&&(!_18.isBlockBoundary||!_18.isBlockBoundary({br:1}))){
var N=b.getLast(CKEDITOR.dom.walker.whitespaces(!0));
!N||N.is&&N.is("br")||b.append("br");
}
r.moveChildren(b);
}
y?r.remove():r.setHtml("");
}
I=S;
}
if(i){
return O*D==R;
}
b.moveChildren(s),s.appendBogus(),D>=f?s.removeAttribute("rowSpan"):s.$.rowSpan=O,O>=u?s.removeAttribute("colSpan"):s.$.colSpan=D;
var A=new CKEDITOR.dom.nodeList(l.$.rows),L=A.count();
for(y=L-1;y>=0;y--){
var P=A.getItem(y);
P.$.cells.length||(P.remove(),L++);
}
return s;
};
function g(t,n){
var i=e(t);
if(i.length>1){
return !1;
}
if(n){
return !0;
}
var o,a,r,s,l=i[0],d=l.getParent(),c=d.getAscendant("table"),u=CKEDITOR.tools.buildTableMap(c),f=d.$.rowIndex,m=h(u,f,l),g=l.$.rowSpan;
if(g>1){
a=Math.ceil(g/2),r=Math.floor(g/2),s=f+a;
var p,E=new CKEDITOR.dom.element(c.$.rows[s]),T=h(u,s);
o=l.clone();
for(var C=0;C<T.length;C++){
if(p=T[C],p.parentNode==E.$&&C>m){
o.insertBefore(new CKEDITOR.dom.element(p));
break;
}
p=null;
}
p||E.append(o);
}else{
r=a=1,E=d.clone(),E.insertAfter(d),E.append(o=l.clone());
for(var v=h(u,f),I=0;I<v.length;I++){
v[I].rowSpan++;
}
}
return o.appendBogus(),l.$.rowSpan=a,o.$.rowSpan=r,1==a&&l.removeAttribute("rowSpan"),1==r&&o.removeAttribute("rowSpan"),o;
};
function p(t,n){
var i=e(t);
if(i.length>1){
return !1;
}
if(n){
return !0;
}
var o,a,r,s=i[0],l=s.getParent(),d=l.getAscendant("table"),c=CKEDITOR.tools.buildTableMap(d),u=l.$.rowIndex,m=h(c,u,s),g=s.$.colSpan;
if(g>1){
a=Math.ceil(g/2),r=Math.floor(g/2);
}else{
r=a=1;
for(var p=f(c,m),E=0;E<p.length;E++){
p[E].colSpan++;
}
}
return o=s.clone(),o.insertAfter(s),o.appendBogus(),s.$.colSpan=a,o.$.colSpan=r,1==a&&s.removeAttribute("colSpan"),1==r&&o.removeAttribute("colSpan"),o;
};
var E=/^(?:td|th)$/;
CKEDITOR.plugins.tabletools={requires:"table,dialog,contextmenu",init:function(t){
function o(e){
return CKEDITOR.tools.extend(e||{},{contextSensitive:1,refresh:function(e,t){
this.setState(t.contains({td:1,th:1},1)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED);
}});
};
function a(e,n){
var i=t.addCommand(e,n);
t.addFeature(i);
};
var c=t.lang.table;
a("cellProperties",new CKEDITOR.dialogCommand("cellProperties",o({allowedContent:"td th{width,height,border-color,background-color,white-space,vertical-align,text-align}[colspan,rowspan]",requiredContent:"table"}))),CKEDITOR.dialog.add("cellProperties",this.path+"dialogs/tableCell.js"),a("rowDelete",o({requiredContent:"table",exec:function(e){
var t=e.getSelection();
u(i(t));
}})),a("rowInsertBefore",o({requiredContent:"table",exec:function(e){
var t=e.getSelection();
n(t,!0);
}})),a("rowInsertAfter",o({requiredContent:"table",exec:function(e){
var t=e.getSelection();
n(t);
}})),a("columnDelete",o({requiredContent:"table",exec:function(e){
var t=e.getSelection(),n=s(t);
n&&u(n,!0);
}})),a("columnInsertBefore",o({requiredContent:"table",exec:function(e){
var t=e.getSelection();
r(t,!0);
}})),a("columnInsertAfter",o({requiredContent:"table",exec:function(e){
var t=e.getSelection();
r(t);
}})),a("cellDelete",o({requiredContent:"table",exec:function(e){
var t=e.getSelection();
d(t);
}})),a("cellMerge",o({allowedContent:"td[colspan,rowspan]",requiredContent:"td[colspan,rowspan]",exec:function(e){
u(m(e.getSelection()),!0);
}})),a("cellMergeRight",o({allowedContent:"td[colspan]",requiredContent:"td[colspan]",exec:function(e){
u(m(e.getSelection(),"right"),!0);
}})),a("cellMergeDown",o({allowedContent:"td[rowspan]",requiredContent:"td[rowspan]",exec:function(e){
u(m(e.getSelection(),"down"),!0);
}})),a("cellVerticalSplit",o({allowedContent:"td[rowspan]",requiredContent:"td[rowspan]",exec:function(e){
u(p(e.getSelection()));
}})),a("cellHorizontalSplit",o({allowedContent:"td[colspan]",requiredContent:"td[colspan]",exec:function(e){
u(g(e.getSelection()));
}})),a("cellInsertBefore",o({requiredContent:"table",exec:function(e){
var t=e.getSelection();
l(t,!0);
}})),a("cellInsertAfter",o({requiredContent:"table",exec:function(e){
var t=e.getSelection();
l(t);
}})),t.addMenuItems&&t.addMenuItems({tablecell:{label:c.cell.menu,group:"tablecell",order:1,getItems:function(){
var n=t.getSelection(),i=e(n);
return {tablecell_insertBefore:CKEDITOR.TRISTATE_OFF,tablecell_insertAfter:CKEDITOR.TRISTATE_OFF,tablecell_delete:CKEDITOR.TRISTATE_OFF,tablecell_merge:m(n,null,!0)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,tablecell_merge_right:m(n,"right",!0)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,tablecell_merge_down:m(n,"down",!0)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,tablecell_split_vertical:p(n,!0)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,tablecell_split_horizontal:g(n,!0)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,tablecell_properties:i.length>0?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED};
}},tablecell_insertBefore:{label:c.cell.insertBefore,group:"tablecell",command:"cellInsertBefore",order:5},tablecell_insertAfter:{label:c.cell.insertAfter,group:"tablecell",command:"cellInsertAfter",order:10},tablecell_delete:{label:c.cell.deleteCell,group:"tablecell",command:"cellDelete",order:15},tablecell_merge:{label:c.cell.merge,group:"tablecell",command:"cellMerge",order:16},tablecell_merge_right:{label:c.cell.mergeRight,group:"tablecell",command:"cellMergeRight",order:17},tablecell_merge_down:{label:c.cell.mergeDown,group:"tablecell",command:"cellMergeDown",order:18},tablecell_split_horizontal:{label:c.cell.splitHorizontal,group:"tablecell",command:"cellHorizontalSplit",order:19},tablecell_split_vertical:{label:c.cell.splitVertical,group:"tablecell",command:"cellVerticalSplit",order:20},tablecell_properties:{label:c.cell.title,group:"tablecellproperties",command:"cellProperties",order:21},tablerow:{label:c.row.menu,group:"tablerow",order:1,getItems:function(){
return {tablerow_insertBefore:CKEDITOR.TRISTATE_OFF,tablerow_insertAfter:CKEDITOR.TRISTATE_OFF,tablerow_delete:CKEDITOR.TRISTATE_OFF};
}},tablerow_insertBefore:{label:c.row.insertBefore,group:"tablerow",command:"rowInsertBefore",order:5},tablerow_insertAfter:{label:c.row.insertAfter,group:"tablerow",command:"rowInsertAfter",order:10},tablerow_delete:{label:c.row.deleteRow,group:"tablerow",command:"rowDelete",order:15},tablecolumn:{label:c.column.menu,group:"tablecolumn",order:1,getItems:function(){
return {tablecolumn_insertBefore:CKEDITOR.TRISTATE_OFF,tablecolumn_insertAfter:CKEDITOR.TRISTATE_OFF,tablecolumn_delete:CKEDITOR.TRISTATE_OFF};
}},tablecolumn_insertBefore:{label:c.column.insertBefore,group:"tablecolumn",command:"columnInsertBefore",order:5},tablecolumn_insertAfter:{label:c.column.insertAfter,group:"tablecolumn",command:"columnInsertAfter",order:10},tablecolumn_delete:{label:c.column.deleteColumn,group:"tablecolumn",command:"columnDelete",order:15}}),t.contextMenu&&t.contextMenu.addListener(function(e,t,n){
var i=n.contains({td:1,th:1},1);
return i&&!i.isReadOnly()?{tablecell:CKEDITOR.TRISTATE_OFF,tablerow:CKEDITOR.TRISTATE_OFF,tablecolumn:CKEDITOR.TRISTATE_OFF}:null;
});
},getSelectedCells:e},CKEDITOR.plugins.add("tabletools",CKEDITOR.plugins.tabletools);
}(),CKEDITOR.tools.buildTableMap=function(e){
for(var t=e.$.rows,n=-1,i=[],o=0;o<t.length;o++){
n++,!i[n]&&(i[n]=[]);
for(var a=-1,r=0;r<t[o].cells.length;r++){
var s=t[o].cells[r];
for(a++;i[n][a];){
a++;
}
for(var l=isNaN(s.colSpan)?1:s.colSpan,d=isNaN(s.rowSpan)?1:s.rowSpan,c=0;d>c;c++){
i[n+c]||(i[n+c]=[]);
for(var u=0;l>u;u++){
i[n+c][a+u]=t[o].cells[r];
}
}
a+=l-1;
}
}
return i;
},function(){
CKEDITOR.plugins.add("templates",{requires:"dialog",init:function(e){
CKEDITOR.dialog.add("templates",CKEDITOR.getUrl(this.path+"dialogs/templates.js")),e.addCommand("templates",new CKEDITOR.dialogCommand("templates")),e.ui.addButton&&e.ui.addButton("Templates",{label:e.lang.templates.button,command:"templates",toolbar:"doctools,10"});
}});
var e={},t={};
CKEDITOR.addTemplates=function(t,n){
e[t]=n;
},CKEDITOR.getTemplates=function(t){
return e[t];
},CKEDITOR.loadTemplates=function(e,n){
for(var i=[],o=0,a=e.length;a>o;o++){
t[e[o]]||(i.push(e[o]),t[e[o]]=1);
}
i.length?CKEDITOR.scriptLoader.load(i,n):setTimeout(n,0);
};
}(),CKEDITOR.config.templates_files=[CKEDITOR.getUrl("plugins/templates/templates/default.js")],CKEDITOR.config.templates_replaceContent=!0,function(){
function e(e){
function n(){
for(var n=i(),a=CKEDITOR.tools.clone(e.config.toolbarGroups)||t(e),r=0;r<a.length;r++){
var s=a[r];
if("/"!=s){
"string"==typeof s&&(s=a[r]={name:s});
var l,d=s.groups;
if(d){
for(var c,u=0;u<d.length;u++){
c=d[u],l=n[c],l&&o(s,l);
}
}
l=n[s.name],l&&o(s,l);
}
}
return a;
};
function i(){
var t,n,i,o,a,r={};
for(t in e.ui.items){
n=e.ui.items[t],i=n.toolbar||"others",i&&(i=i.split(","),o=i[0],a=parseInt(i[1]||-1,10),r[o]||(r[o]=[]),r[o].push({name:t,order:a}));
}
for(o in r){
r[o]=r[o].sort(function(e,t){
return e.order==t.order?0:t.order<0?-1:e.order<0?1:e.order<t.order?-1:1;
});
}
return r;
};
function o(t,n){
if(n.length){
t.items?t.items.push(e.ui.create("-")):t.items=[];
for(var i,o;i=n.shift();){
if(o="string"==typeof i?i:i.name,!r||-1==CKEDITOR.tools.indexOf(r,o)){
if(i=e.ui.create(o),!i){
continue;
}
if(!e.addFeature(i)){
continue;
}
t.items.push(i);
}
}
}
};
function a(e){
var t,n,i,a=[];
for(t=0;t<e.length;++t){
n=e[t],i={},"/"==n?a.push(n):CKEDITOR.tools.isArray(n)?(o(i,CKEDITOR.tools.clone(n)),a.push(i)):n.items&&(o(i,CKEDITOR.tools.clone(n.items)),i.name=n.name,a.push(i));
}
return a;
};
var r=e.config.removeButtons;
r=r&&r.split(",");
var s=e.config.toolbar;
return "string"==typeof s&&(s=e.config["toolbar_"+s]),e.toolbar=s?a(s):n();
};
function t(e){
return e._.toolbarGroups||(e._.toolbarGroups=[{name:"document",groups:["mode","document","doctools"]},{name:"clipboard",groups:["clipboard","undo"]},{name:"editing",groups:["find","selection","spellchecker"]},{name:"forms"},"/",{name:"basicstyles",groups:["basicstyles","cleanup"]},{name:"paragraph",groups:["list","indent","blocks","align","bidi"]},{name:"links"},{name:"insert"},"/",{name:"styles"},{name:"colors"},{name:"tools"},{name:"others"},{name:"about"}]);
};
var n=function(){
this.toolbars=[],this.focusCommandExecuted=!1;
};
n.prototype.focus=function(){
for(var e,t=0;e=this.toolbars[t++];){
for(var n,i=0;n=e.items[i++];){
if(n.focus){
return void n.focus();
}
}
}
};
var i={toolbarFocus:{modes:{wysiwyg:1,source:1},readOnly:1,exec:function(e){
e.toolbox&&(e.toolbox.focusCommandExecuted=!0,CKEDITOR.env.ie||CKEDITOR.env.air?setTimeout(function(){
e.toolbox.focus();
},100):e.toolbox.focus());
}}};
CKEDITOR.plugins.add("toolbar",{requires:"button",init:function(t){
var o,a=function(e,n){
var i,r,s="rtl"==t.lang.dir,l=t.config.toolbarGroupCycling,d=s?37:39,c=s?39:37;
switch(l=void 0===l||l,n){
case 9:
case CKEDITOR.SHIFT+9:
for(;!r||!r.items.length;){
if(r=9==n?(r?r.next:e.toolbar.next)||t.toolbox.toolbars[0]:(r?r.previous:e.toolbar.previous)||t.toolbox.toolbars[t.toolbox.toolbars.length-1],r.items.length){
for(e=r.items[o?r.items.length-1:0];e&&!e.focus;){
e=o?e.previous:e.next,e||(r=0);
}
}
}
return e&&e.focus(),!1;
case d:
i=e;
do{
i=i.next,!i&&l&&(i=e.toolbar.items[0]);
}while(i&&!i.focus);
return i?i.focus():a(e,9),!1;
case 40:
return e.button&&e.button.hasArrow?(t.once("panelShow",function(e){
e.data._.panel._.currentBlock.onKeyDown(40);
}),e.execute()):a(e,40==n?d:c),!1;
case c:
case 38:
i=e;
do{
i=i.previous,!i&&l&&(i=e.toolbar.items[e.toolbar.items.length-1]);
}while(i&&!i.focus);
return i?i.focus():(o=1,a(e,CKEDITOR.SHIFT+9),o=0),!1;
case 27:
return t.focus(),!1;
case 13:
case 32:
return e.execute(),!1;
}
return !0;
};
t.on("uiSpace",function(i){
function o(e){
var n=e.render(t,d);
O=E.items.push(n)-1,O>0&&(n.previous=E.items[O-1],n.previous.next=n),n.toolbar=E,n.onkey=a,n.onfocus=function(){
t.toolbox.focusCommandExecuted||t.focus();
};
};
if(i.data.space==t.config.toolbarLocation){
i.removeListener(),t.toolbox=new n;
var r,s,l=CKEDITOR.tools.getNextId(),d=["<span id=\"",l,"\" class=\"cke_voice_label\">",t.lang.toolbar.toolbars,"</span>","<span id=\""+t.ui.spaceId("toolbox")+"\" class=\"cke_toolbox\" role=\"group\" aria-labelledby=\"",l,"\" onmousedown=\"return false;\">"],c=t.config.toolbarStartupExpanded!==!1;
t.config.toolbarCanCollapse&&t.elementMode!=CKEDITOR.ELEMENT_MODE_INLINE&&d.push("<span class=\"cke_toolbox_main\""+(c?">":" style=\"display:none\">"));
for(var u=t.toolbox.toolbars,h=e(t),f=0;f<h.length;f++){
var m,g,p,E=0,T=h[f];
if(T){
if(r&&(d.push("</span>"),r=0,s=0),"/"!==T){
p=T.items||T;
for(var C=0;C<p.length;C++){
var v,I=p[C];
if(I){
if(I.type==CKEDITOR.UI_SEPARATOR){
s=r&&I;
continue;
}
if(v=I.canGroup!==!1,!E){
m=CKEDITOR.tools.getNextId(),E={id:m,items:[]},g=T.name&&(t.lang.toolbar.toolbarGroups[T.name]||T.name),d.push("<span id=\"",m,"\" class=\"cke_toolbar\"",g?" aria-labelledby=\""+m+"_label\"":""," role=\"toolbar\">"),g&&d.push("<span id=\"",m,"_label\" class=\"cke_voice_label\">",g,"</span>"),d.push("<span class=\"cke_toolbar_start\"></span>");
var O=u.push(E)-1;
O>0&&(E.previous=u[O-1],E.previous.next=E);
}
v?r||(d.push("<span class=\"cke_toolgroup\" role=\"presentation\">"),r=1):r&&(d.push("</span>"),r=0),s&&(o(s),s=0),o(I);
}
}
r&&(d.push("</span>"),r=0,s=0),E&&d.push("<span class=\"cke_toolbar_end\"></span></span>");
}else{
d.push("<span class=\"cke_toolbar_break\"></span>");
}
}
}
if(t.config.toolbarCanCollapse&&d.push("</span>"),t.config.toolbarCanCollapse&&t.elementMode!=CKEDITOR.ELEMENT_MODE_INLINE){
var D=CKEDITOR.tools.addFunction(function(){
t.execCommand("toolbarCollapse");
});
t.on("destroy",function(){
CKEDITOR.tools.removeFunction(D);
}),t.addCommand("toolbarCollapse",{readOnly:1,exec:function(e){
var t=e.ui.space("toolbar_collapser"),n=t.getPrevious(),i=e.ui.space("contents"),o=n.getParent(),a=parseInt(i.$.style.height,10),r=o.$.offsetHeight,s="cke_toolbox_collapser_min",l=t.hasClass(s);
l?(n.show(),t.removeClass(s),t.setAttribute("title",e.lang.toolbar.toolbarCollapse)):(n.hide(),t.addClass(s),t.setAttribute("title",e.lang.toolbar.toolbarExpand)),t.getFirst().setText(l?"\u25b2":"\u25c0");
var d=o.$.offsetHeight-r;
i.setStyle("height",a-d+"px"),e.fire("resize",{outerHeight:e.container.$.offsetHeight,contentsHeight:i.$.offsetHeight,outerWidth:e.container.$.offsetWidth});
},modes:{wysiwyg:1,source:1}}),t.setKeystroke(CKEDITOR.ALT+(CKEDITOR.env.ie||CKEDITOR.env.webkit?189:109),"toolbarCollapse"),d.push("<a title=\""+(c?t.lang.toolbar.toolbarCollapse:t.lang.toolbar.toolbarExpand)+"\" id=\""+t.ui.spaceId("toolbar_collapser")+"\" tabIndex=\"-1\" class=\"cke_toolbox_collapser"),c||d.push(" cke_toolbox_collapser_min"),d.push("\" onclick=\"CKEDITOR.tools.callFunction("+D+")\">","<span class=\"cke_arrow\">&#9650;</span>","</a>");
}
d.push("</span>"),i.data.html+=d.join("");
}
}),t.on("destroy",function(){
if(this.toolbox){
var e,t,n,i,o=0;
for(e=this.toolbox.toolbars;o<e.length;o++){
for(n=e[o].items,t=0;t<n.length;t++){
i=n[t],i.clickFn&&CKEDITOR.tools.removeFunction(i.clickFn),i.keyDownFn&&CKEDITOR.tools.removeFunction(i.keyDownFn);
}
}
}
}),t.on("uiReady",function(){
var e=t.ui.space("toolbox");
e&&t.focusManager.add(e,1);
}),t.addCommand("toolbarFocus",i.toolbarFocus),t.setKeystroke(CKEDITOR.ALT+121,"toolbarFocus"),t.ui.add("-",CKEDITOR.UI_SEPARATOR,{}),t.ui.addHandler(CKEDITOR.UI_SEPARATOR,{create:function(){
return {render:function(e,t){
return t.push("<span class=\"cke_toolbar_separator\" role=\"separator\"></span>"),{};
}};
}});
}}),CKEDITOR.ui.prototype.addToolbarGroup=function(e,n,i){
var o=t(this.editor),a=0===n,r={name:e};
if(i){
if(i=CKEDITOR.tools.search(o,function(e){
return e.name==i;
})){
return !i.groups&&(i.groups=[]),n&&(n=CKEDITOR.tools.indexOf(i.groups,n),n>=0)?void i.groups.splice(n+1,0,e):void (a?i.groups.splice(0,0,e):i.groups.push(e));
}
n=null;
}
n&&(n=CKEDITOR.tools.indexOf(o,function(e){
return e.name==n;
})),a?o.splice(0,0,e):"number"==typeof n?o.splice(n+1,0,r):o.push(e);
};
}(),CKEDITOR.UI_SEPARATOR="separator",CKEDITOR.config.toolbarLocation="top",function(){
function e(e){
e.typing=!0,e.hasUndo=!0,e.hasRedo=!1,e.onChange();
};
var t=[CKEDITOR.CTRL+90,CKEDITOR.CTRL+89,CKEDITOR.CTRL+CKEDITOR.SHIFT+90],n={8:1,46:1};
CKEDITOR.plugins.add("undo",{init:function(e){
function n(e){
a.enabled&&e.data.command.canUndo!==!1&&a.save();
};
function o(){
a.enabled=e.readOnly?!1:"wysiwyg"==e.mode,a.onChange();
};
var a=e.undoManager=new i(e),s=a.editingHandler=new r(a),l=e.addCommand("undo",{exec:function(){
a.undo()&&(e.selectionChange(),this.fire("afterUndo"));
},startDisabled:!0,canUndo:!1}),d=e.addCommand("redo",{exec:function(){
a.redo()&&(e.selectionChange(),this.fire("afterRedo"));
},startDisabled:!0,canUndo:!1});
e.setKeystroke([[t[0],"undo"],[t[1],"redo"],[t[2],"redo"]]),a.onChange=function(){
l.setState(a.undoable()?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED),d.setState(a.redoable()?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED);
},e.on("beforeCommandExec",n),e.on("afterCommandExec",n),e.on("saveSnapshot",function(e){
a.save(e.data&&e.data.contentOnly);
}),e.on("contentDom",s.attachListeners,s),e.on("instanceReady",function(){
e.fire("saveSnapshot");
}),e.on("beforeModeUnload",function(){
"wysiwyg"==e.mode&&a.save(!0);
}),e.on("mode",o),e.on("readOnly",o),e.ui.addButton&&(e.ui.addButton("Undo",{label:e.lang.undo.undo,command:"undo",toolbar:"undo,10"}),e.ui.addButton("Redo",{label:e.lang.undo.redo,command:"redo",toolbar:"undo,20"})),e.resetUndo=function(){
a.reset(),e.fire("saveSnapshot");
},e.on("updateSnapshot",function(){
a.currentImage&&a.update();
}),e.on("lockSnapshot",function(e){
var t=e.data;
a.lock(t&&t.dontUpdate,t&&t.forceUpdate);
}),e.on("unlockSnapshot",a.unlock,a);
}}),CKEDITOR.plugins.undo={};
var i=CKEDITOR.plugins.undo.UndoManager=function(e){
this.strokesRecorded=[0,0],this.locked=null,this.previousKeyGroup=-1,this.limit=e.config.undoStackSize||20,this.strokesLimit=25,this.editor=e,this.reset();
};
i.prototype={type:function(t,n){
var o=i.getKeyGroup(t),a=this.strokesRecorded[o]+1;
n=n||a>=this.strokesLimit,this.typing||e(this),n?(a=0,this.editor.fire("saveSnapshot")):this.editor.fire("change"),this.strokesRecorded[o]=a,this.previousKeyGroup=o;
},keyGroupChanged:function(e){
return i.getKeyGroup(e)!=this.previousKeyGroup;
},reset:function(){
this.snapshots=[],this.index=-1,this.currentImage=null,this.hasUndo=!1,this.hasRedo=!1,this.locked=null,this.resetType();
},resetType:function(){
this.strokesRecorded=[0,0],this.typing=!1,this.previousKeyGroup=-1;
},refreshState:function(){
this.hasUndo=!!this.getNextImage(!0),this.hasRedo=!!this.getNextImage(!1),this.resetType(),this.onChange();
},save:function(e,t,n){
var i=this.editor;
if(this.locked||"ready"!=i.status||"wysiwyg"!=i.mode){
return !1;
}
var a=i.editable();
if(!a||"ready"!=a.status){
return !1;
}
var r=this.snapshots;
if(t||(t=new o(i)),t.contents===!1){
return !1;
}
if(this.currentImage){
if(t.equalsContent(this.currentImage)){
if(e){
return !1;
}
if(t.equalsSelection(this.currentImage)){
return !1;
}
}else{
n!==!1&&i.fire("change");
}
}
return r.splice(this.index+1,r.length-this.index-1),r.length==this.limit&&r.shift(),this.index=r.push(t)-1,this.currentImage=t,n!==!1&&this.refreshState(),!0;
},restoreImage:function(e){
var t,n=this.editor;
if(e.bookmarks&&(n.focus(),t=n.getSelection()),this.locked={level:999},this.editor.loadSnapshot(e.contents),e.bookmarks){
t.selectBookmarks(e.bookmarks);
}else{
if(CKEDITOR.env.ie){
var i=this.editor.document.getBody().$.createTextRange();
i.collapse(!0),i.select();
}
}
this.locked=null,this.index=e.index,this.currentImage=this.snapshots[this.index],this.update(),this.refreshState(),n.fire("change");
},getNextImage:function(e){
var t,n,i=this.snapshots,o=this.currentImage;
if(o){
if(e){
for(n=this.index-1;n>=0;n--){
if(t=i[n],!o.equalsContent(t)){
return t.index=n,t;
}
}
}else{
for(n=this.index+1;n<i.length;n++){
if(t=i[n],!o.equalsContent(t)){
return t.index=n,t;
}
}
}
}
return null;
},redoable:function(){
return this.enabled&&this.hasRedo;
},undoable:function(){
return this.enabled&&this.hasUndo;
},undo:function(){
if(this.undoable()){
this.save(!0);
var e=this.getNextImage(!0);
if(e){
return this.restoreImage(e),!0;
}
}
return !1;
},redo:function(){
if(this.redoable()&&(this.save(!0),this.redoable())){
var e=this.getNextImage(!1);
if(e){
return this.restoreImage(e),!0;
}
}
return !1;
},update:function(e){
if(!this.locked){
e||(e=new o(this.editor));
for(var t=this.index,n=this.snapshots;t>0&&this.currentImage.equalsContent(n[t-1]);){
t-=1;
}
n.splice(t,this.index-t+1,e),this.index=t,this.currentImage=e;
}
},updateSelection:function(e){
if(!this.snapshots.length){
return !1;
}
var t=this.snapshots,n=t[t.length-1];
return n.equalsContent(e)&&!n.equalsSelection(e)?(t[t.length-1]=e,this.currentImage=e,!0):!1;
},lock:function(e,t){
if(this.locked){
this.locked.level++;
}else{
if(e){
this.locked={level:1};
}else{
var n=null;
if(t){
n=!0;
}else{
var i=new o(this.editor,!0);
this.currentImage&&this.currentImage.equalsContent(i)&&(n=i);
}
this.locked={update:n,level:1};
}
}
},unlock:function(){
if(this.locked&&!--this.locked.level){
var e=this.locked.update;
if(this.locked=null,e===!0){
this.update();
}else{
if(e){
var t=new o(this.editor,!0);
e.equalsContent(t)||this.update();
}
}
}
}},i.navigationKeyCodes={37:1,38:1,39:1,40:1,36:1,35:1,33:1,34:1},i.keyGroups={PRINTABLE:0,FUNCTIONAL:1},i.isNavigationKey=function(e){
return !!i.navigationKeyCodes[e];
},i.getKeyGroup=function(e){
var t=i.keyGroups;
return n[e]?t.FUNCTIONAL:t.PRINTABLE;
},i.getOppositeKeyGroup=function(e){
var t=i.keyGroups;
return e==t.FUNCTIONAL?t.PRINTABLE:t.FUNCTIONAL;
},i.ieFunctionalKeysBug=function(e){
return CKEDITOR.env.ie&&i.getKeyGroup(e)==i.keyGroups.FUNCTIONAL;
};
var o=CKEDITOR.plugins.undo.Image=function(e,t){
this.editor=e,e.fire("beforeUndoImage");
var n=e.getSnapshot();
if(CKEDITOR.env.ie&&n&&(n=n.replace(/\s+data-cke-expando=".*?"/g,"")),this.contents=n,!t){
var i=n&&e.getSelection();
this.bookmarks=i&&i.createBookmarks2(!0);
}
e.fire("afterUndoImage");
},a=/\b(?:href|src|name)="[^"]*?"/gi;
o.prototype={equalsContent:function(e){
var t=this.contents,n=e.contents;
return CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks)&&(t=t.replace(a,""),n=n.replace(a,"")),t!=n?!1:!0;
},equalsSelection:function(e){
var t=this.bookmarks,n=e.bookmarks;
if(t||n){
if(!t||!n||t.length!=n.length){
return !1;
}
for(var i=0;i<t.length;i++){
var o=t[i],a=n[i];
if(o.startOffset!=a.startOffset||o.endOffset!=a.endOffset||!CKEDITOR.tools.arrayCompare(o.start,a.start)||!CKEDITOR.tools.arrayCompare(o.end,a.end)){
return !1;
}
}
}
return !0;
}};
var r=CKEDITOR.plugins.undo.NativeEditingHandler=function(e){
this.undoManager=e,this.ignoreInputEvent=!1,this.keyEventsStack=new s,this.lastKeydownImage=null;
};
r.prototype={onKeydown:function(e){
var n=e.data.getKey();
if(229!==n){
if(CKEDITOR.tools.indexOf(t,e.data.getKeystroke())>-1){
return void e.data.preventDefault();
}
this.keyEventsStack.cleanUp(e);
var a=this.undoManager,r=this.keyEventsStack.getLast(n);
r||this.keyEventsStack.push(n),this.lastKeydownImage=new o(a.editor),(i.isNavigationKey(n)||this.undoManager.keyGroupChanged(n))&&(a.strokesRecorded[0]||a.strokesRecorded[1])&&(a.save(!1,this.lastKeydownImage,!1),a.resetType());
}
},onInput:function(){
if(this.ignoreInputEvent){
return void (this.ignoreInputEvent=!1);
}
var e=this.keyEventsStack.getLast();
e||(e=this.keyEventsStack.push(0)),this.keyEventsStack.increment(e.keyCode),this.keyEventsStack.getTotalInputs()>=this.undoManager.strokesLimit&&(this.undoManager.type(e.keyCode,!0),this.keyEventsStack.resetInputs());
},onKeyup:function(e){
var t=this.undoManager,n=e.data.getKey(),a=this.keyEventsStack.getTotalInputs();
this.keyEventsStack.remove(n),i.ieFunctionalKeysBug(n)&&this.lastKeydownImage&&this.lastKeydownImage.equalsContent(new o(t.editor,!0))||(a>0?t.type(n):i.isNavigationKey(n)&&this.onNavigationKey(!0));
},onNavigationKey:function(e){
var t=this.undoManager;
(e||!t.save(!0,null,!1))&&t.updateSelection(new o(t.editor)),t.resetType();
},ignoreInputEventListener:function(){
this.ignoreInputEvent=!0;
},attachListeners:function(){
var e=this.undoManager.editor,t=e.editable(),n=this;
t.attachListener(t,"keydown",function(e){
n.onKeydown(e),i.ieFunctionalKeysBug(e.data.getKey())&&n.onInput();
},null,null,999),t.attachListener(t,CKEDITOR.env.ie?"keypress":"input",n.onInput,n,null,999),t.attachListener(t,"keyup",n.onKeyup,n,null,999),t.attachListener(t,"paste",n.ignoreInputEventListener,n,null,999),t.attachListener(t,"drop",n.ignoreInputEventListener,n,null,999),t.attachListener(t.isInline()?t:e.document.getDocumentElement(),"click",function(){
n.onNavigationKey();
},null,null,999),t.attachListener(this.undoManager.editor,"blur",function(){
n.keyEventsStack.remove(9);
},null,null,999);
}};
var s=CKEDITOR.plugins.undo.KeyEventsStack=function(){
this.stack=[];
};
s.prototype={push:function(e){
var t=this.stack.push({keyCode:e,inputs:0});
return this.stack[t-1];
},getLastIndex:function(e){
if("number"!=typeof e){
return this.stack.length-1;
}
for(var t=this.stack.length;t--;){
if(this.stack[t].keyCode==e){
return t;
}
}
return -1;
},getLast:function(e){
var t=this.getLastIndex(e);
return -1!=t?this.stack[t]:null;
},increment:function(e){
var t=this.getLast(e);
t.inputs++;
},remove:function(e){
var t=this.getLastIndex(e);
-1!=t&&this.stack.splice(t,1);
},resetInputs:function(e){
if("number"==typeof e){
var t=this.getLast(e);
t.inputs=0;
}else{
for(var n=this.stack.length;n--;){
this.stack[n].inputs=0;
}
}
},getTotalInputs:function(){
for(var e=this.stack.length,t=0;e--;){
t+=this.stack[e].inputs;
}
return t;
},cleanUp:function(e){
var t=e.data.$;
t.ctrlKey||t.metaKey||this.remove(17),t.shiftKey||this.remove(16),t.altKey||this.remove(18);
}};
}(),function(){
function e(e){
function n(e){
var t=!1;
s.attachListener(s,"keydown",function(){
var n=o.getBody(),i=n.getElementsByTag(e);
if(!t){
for(var a=0;a<i.count();a++){
i.getItem(a).setCustomData("retain",!0);
}
t=!0;
}
},null,null,1),s.attachListener(s,"keyup",function(){
var n=o.getElementsByTag(e);
t&&(1!=n.count()||n.getItem(0).getCustomData("retain")||n.getItem(0).remove(1),t=!1);
});
};
var i=this.editor,o=e.document,a=o.body,r=o.getElementById("cke_actscrpt");
r&&r.parentNode.removeChild(r),r=o.getElementById("cke_shimscrpt"),r&&r.parentNode.removeChild(r),r=o.getElementById("cke_basetagscrpt"),r&&r.parentNode.removeChild(r),a.contentEditable=!0,CKEDITOR.env.ie&&(a.hideFocus=!0,a.disabled=!0,a.removeAttribute("disabled")),delete this._.isLoadingData,this.$=a,o=new CKEDITOR.dom.document(o),this.setup(),this.fixInitialSelection();
var s=this;
CKEDITOR.env.ie&&!CKEDITOR.env.edge&&o.getDocumentElement().addClass(o.$.compatMode),CKEDITOR.env.ie&&!CKEDITOR.env.edge&&i.enterMode!=CKEDITOR.ENTER_P?n("p"):CKEDITOR.env.edge&&i.enterMode!=CKEDITOR.ENTER_DIV&&n("div"),(CKEDITOR.env.webkit||CKEDITOR.env.ie&&CKEDITOR.env.version>10)&&o.getDocumentElement().on("mousedown",function(e){
e.data.getTarget().is("html")&&setTimeout(function(){
i.editable().focus();
});
}),t(i);
try{
i.document.$.execCommand("2D-position",!1,!0);
}
catch(l){
}
(CKEDITOR.env.gecko||CKEDITOR.env.ie&&"CSS1Compat"==i.document.$.compatMode)&&this.attachListener(this,"keydown",function(e){
var t=e.data.getKeystroke();
if(33==t||34==t){
if(CKEDITOR.env.ie){
setTimeout(function(){
i.getSelection().scrollIntoView();
},0);
}else{
if(i.window.$.innerHeight>this.$.offsetHeight){
var n=i.createRange();
n[33==t?"moveToElementEditStart":"moveToElementEditEnd"](this),n.select(),e.data.preventDefault();
}
}
}
}),CKEDITOR.env.ie&&this.attachListener(o,"blur",function(){
try{
o.$.selection.empty();
}
catch(e){
}
}),CKEDITOR.env.iOS&&this.attachListener(o,"touchend",function(){
e.focus();
});
var d=i.document.getElementsByTag("title").getItem(0);
d.data("cke-title",d.getText()),CKEDITOR.env.ie&&(i.document.$.title=this._.docTitle),CKEDITOR.tools.setTimeout(function(){
"unloaded"==this.status&&(this.status="ready"),i.fire("contentDom"),this._.isPendingFocus&&(i.focus(),this._.isPendingFocus=!1),setTimeout(function(){
i.fire("dataReady");
},0);
},0,this);
};
function t(e){
function t(){
var t;
e.editable().attachListener(e,"selectionChange",function(){
var i=e.getSelection().getSelectedElement();
i&&(t&&(t.detachEvent("onresizestart",n),t=null),i.$.attachEvent("onresizestart",n),t=i.$);
});
};
function n(e){
e.returnValue=!1;
};
if(CKEDITOR.env.gecko){
try{
var i=e.document.$;
i.execCommand("enableObjectResizing",!1,!e.config.disableObjectResizing),i.execCommand("enableInlineTableEditing",!1,!e.config.disableNativeTableHandles);
}
catch(o){
}
}else{
CKEDITOR.env.ie&&CKEDITOR.env.version<11&&e.config.disableObjectResizing&&t(e);
}
};
function n(){
var e=[];
if(CKEDITOR.document.$.documentMode>=8){
e.push("html.CSS1Compat [contenteditable=false]{min-height:0 !important}");
var t=[];
for(var n in CKEDITOR.dtd.$removeEmpty){
t.push("html.CSS1Compat "+n+"[contenteditable=false]");
}
e.push(t.join(",")+"{display:inline-block}");
}else{
CKEDITOR.env.gecko&&(e.push("html{height:100% !important}"),e.push("img:-moz-broken{-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}"));
}
return e.push("html{cursor:text;*cursor:auto}"),e.push("img,input,textarea{cursor:default}"),e.join("\n");
};
CKEDITOR.plugins.add("wysiwygarea",{init:function(e){
e.config.fullPage&&e.addFeature({allowedContent:"html head title; style [media,type]; body (*)[id]; meta link [*]",requiredContent:"body"}),e.addMode("wysiwyg",function(t){
function n(n){
n&&n.removeListener(),e.editable(new i(e,a.$.contentWindow.document.body)),e.setData(e.getData(1),t);
};
var o="document.open();"+(CKEDITOR.env.ie?"("+CKEDITOR.tools.fixDomain+")();":"")+"document.close();";
o=CKEDITOR.env.air?"javascript:void(0)":CKEDITOR.env.ie&&!CKEDITOR.env.edge?"javascript:void(function(){"+encodeURIComponent(o)+"}())":"";
var a=CKEDITOR.dom.element.createFromHtml("<iframe src=\""+o+"\" frameBorder=\"0\"></iframe>");
a.setStyles({width:"100%",height:"100%"}),a.addClass("cke_wysiwyg_frame").addClass("cke_reset");
var r=e.ui.space("contents");
r.append(a);
var s=CKEDITOR.env.ie&&!CKEDITOR.env.edge||CKEDITOR.env.gecko;
s&&a.on("load",n);
var l=e.title,d=e.fire("ariaEditorHelpLabel",{}).label;
if(l&&(CKEDITOR.env.ie&&d&&(l+=", "+d),a.setAttribute("title",l)),d){
var c=CKEDITOR.tools.getNextId(),u=CKEDITOR.dom.element.createFromHtml("<span id=\""+c+"\" class=\"cke_voice_label\">"+d+"</span>");
r.append(u,1),a.setAttribute("aria-describedby",c);
}
e.on("beforeModeUnload",function(e){
e.removeListener(),u&&u.remove();
}),a.setAttributes({tabIndex:e.tabIndex,allowTransparency:"true"}),!s&&n(),e.fire("ariaWidget",a);
});
}}),CKEDITOR.editor.prototype.addContentsCss=function(e){
var t=this.config,n=t.contentsCss;
CKEDITOR.tools.isArray(n)||(t.contentsCss=n?[n]:[]),t.contentsCss.push(e);
};
var i=CKEDITOR.tools.createClass({$:function(){
this.base.apply(this,arguments),this._.frameLoadedHandler=CKEDITOR.tools.addFunction(function(t){
CKEDITOR.tools.setTimeout(e,0,this,t);
},this),this._.docTitle=this.getWindow().getFrame().getAttribute("title");
},base:CKEDITOR.editable,proto:{setData:function(e,t){
var i=this.editor;
if(t){
this.setHtml(e),this.fixInitialSelection(),i.fire("dataReady");
}else{
this._.isLoadingData=!0,i._.dataStore={id:1};
var o=i.config,a=o.fullPage,r=o.docType,s=CKEDITOR.tools.buildStyleHtml(n()).replace(/<style>/,"<style data-cke-temp=\"1\">");
a||(s+=CKEDITOR.tools.buildStyleHtml(i.config.contentsCss));
var l=o.baseHref?"<base href=\""+o.baseHref+"\" data-cke-temp=\"1\" />":"";
a&&(e=e.replace(/<!DOCTYPE[^>]*>/i,function(e){
return i.docType=r=e,"";
}).replace(/<\?xml\s[^\?]*\?>/i,function(e){
return i.xmlDeclaration=e,"";
})),e=i.dataProcessor.toHtml(e),a?(/<body[\s|>]/.test(e)||(e="<body>"+e),/<html[\s|>]/.test(e)||(e="<html>"+e+"</html>"),/<head[\s|>]/.test(e)?/<title[\s|>]/.test(e)||(e=e.replace(/<head[^>]*>/,"$&<title></title>")):e=e.replace(/<html[^>]*>/,"$&<head><title></title></head>"),l&&(e=e.replace(/<head[^>]*?>/,"$&"+l)),e=e.replace(/<\/head\s*>/,s+"$&"),e=r+e):e=o.docType+"<html dir=\""+o.contentsLangDirection+"\" lang=\""+(o.contentsLanguage||i.langCode)+"\"><head><title>"+this._.docTitle+"</title>"+l+s+"</head><body"+(o.bodyId?" id=\""+o.bodyId+"\"":"")+(o.bodyClass?" class=\""+o.bodyClass+"\"":"")+">"+e+"</body></html>",CKEDITOR.env.gecko&&(e=e.replace(/<body/,"<body contenteditable=\"true\" "),CKEDITOR.env.version<20000&&(e=e.replace(/<body[^>]*>/,"$&<!-- cke-content-start -->")));
var d="<script id=\"cke_actscrpt\" type=\"text/javascript\""+(CKEDITOR.env.ie?" defer=\"defer\" ":"")+">var wasLoaded=0;function onload(){if(!wasLoaded)window.parent.CKEDITOR.tools.callFunction("+this._.frameLoadedHandler+",window);wasLoaded=1;}"+(CKEDITOR.env.ie?"onload();":"document.addEventListener(\"DOMContentLoaded\", onload, false );")+"</script>";
CKEDITOR.env.ie&&CKEDITOR.env.version<9&&(d+="<script id=\"cke_shimscrpt\">window.parent.CKEDITOR.tools.enableHtml5Elements(document)</script>"),l&&CKEDITOR.env.ie&&CKEDITOR.env.version<10&&(d+="<script id=\"cke_basetagscrpt\">var baseTag = document.querySelector( \"base\" );baseTag.href = baseTag.href;</script>"),e=e.replace(/(?=\s*<\/(:?head)>)/,d),this.clearCustomData(),this.clearListeners(),i.fire("contentDomUnload");
var c=this.getDocument();
try{
c.write(e);
}
catch(u){
setTimeout(function(){
c.write(e);
},0);
}
}
},getData:function(e){
if(e){
return this.getHtml();
}
var t=this.editor,n=t.config,i=n.fullPage,o=i&&t.docType,a=i&&t.xmlDeclaration,r=this.getDocument(),s=i?r.getDocumentElement().getOuterHtml():r.getBody().getHtml();
return CKEDITOR.env.gecko&&n.enterMode!=CKEDITOR.ENTER_BR&&(s=s.replace(/<br>(?=\s*(:?$|<\/body>))/,"")),s=t.dataProcessor.toDataFormat(s),a&&(s=a+"\n"+s),o&&(s=o+"\n"+s),s;
},focus:function(){
this._.isLoadingData?this._.isPendingFocus=!0:i.baseProto.focus.call(this);
},detach:function(){
var e,t,n=this.editor,o=n.document;
try{
e=n.window.getFrame();
}
catch(a){
}
i.baseProto.detach.call(this),this.clearCustomData(),o.getDocumentElement().clearCustomData(),CKEDITOR.tools.removeFunction(this._.frameLoadedHandler),e&&e.getParent()?(e.clearCustomData(),t=e.removeCustomData("onResize"),t&&t.removeListener(),e.remove()):CKEDITOR.warn("editor-destroy-iframe");
}}});
}(),CKEDITOR.config.disableObjectResizing=!1,CKEDITOR.config.disableNativeTableHandles=!0,CKEDITOR.config.disableNativeSpellChecker=!0,function(){
function e(e){
return CKEDITOR.env.ie?e.$.clientWidth:parseInt(e.getComputedStyle("width"),10);
};
function t(e,t,n){
var i=e.getComputedStyle("border-"+t+"-width"),o={thin:"0px",medium:"1px",thick:"2px"};
return i.indexOf("px")<0&&(i=i in o&&"none"!=e.getComputedStyle("border-style")?o[i]:0),n&&n.config.ibmModernTable&&n.config.ibmModernTable.enable?Math.max(parseInt(i,10),2):parseInt(i,10);
};
function n(e){
for(var t,n,i,o=e.$.rows,a=0,r=0,s=o.length;s>r;r++){
i=o[r],t=i.cells.length,t>a&&(a=t,n=i);
}
return n;
};
function i(e,i){
for(var o=[],a=-1,r="rtl"==e.getComputedStyle("direction"),s=n(e),l=new CKEDITOR.dom.element(e.$.tBodies[0]),d=l.getDocumentPosition(),c=0,u=s.cells.length;u>c;c++){
var h=new CKEDITOR.dom.element(s.cells[c]),f=s.cells[c+1]&&new CKEDITOR.dom.element(s.cells[c+1]);
a+=h.$.colSpan||1;
var m,g,p,E=h.getDocumentPosition().x;
r?g=E+t(h,"left",i):m=E+h.$.offsetWidth-t(h,"right",i),f?(E=f.getDocumentPosition().x,r?m=E+f.$.offsetWidth-t(f,"right",i):g=E+t(f,"left",i)):(E=e.getDocumentPosition().x,r?m=E:g=E+e.$.offsetWidth),p=Math.max(g-m,3),o.push({table:e,index:a,x:m,y:d.y,width:p,height:l.$.offsetHeight,rtl:r});
}
return o;
};
function o(e,t){
for(var n=0,i=e.length;i>n;n++){
var o=e[n];
if(t>=o.x&&t<=o.x+o.width){
return o;
}
}
return null;
};
function a(e){
(e.data||e).preventDefault();
};
function r(n){
function i(){
f=null,T=0,p=0,m.removeListener("mouseup",u),g.removeListener("mousedown",c),g.removeListener("mousemove",h),m.getBody().setStyle("cursor","auto"),d?g.remove():g.hide();
};
function o(){
for(var t=f.index,n=CKEDITOR.tools.buildTableMap(f.table),i=[],o=[],r=Number.MAX_VALUE,s=r,l=f.rtl,d=0,c=n.length;c>d;d++){
var u=n[d],D=u[t+(l?1:0)],b=u[t+(l?0:1)];
D=D&&new CKEDITOR.dom.element(D),b=b&&new CKEDITOR.dom.element(b),D&&b&&D.equals(b)||(D&&(r=Math.min(r,e(D))),b&&(s=Math.min(s,e(b))),i.push(D),o.push(b));
}
C=i,v=o,I=f.x-r,O=f.x+s,g.setOpacity(0.5),E=parseInt(g.getStyle("left"),10),T=0,p=1,g.on("mousemove",h),m.on("dragstart",a);
};
function r(){
p=0,g.setOpacity(0),T&&s();
var e=f.table;
setTimeout(function(){
e.removeCustomData("_cke_table_pillars");
},0),m.removeListener("dragstart",a);
};
function s(){
for(var i=f.rtl,o=i?v.length:C.length,a=0,r=0;o>r;r++){
var s=C[r],d=v[r],c=f.table;
CKEDITOR.tools.setTimeout(function(e,t,r,s,d,u){
e&&e.setStyle("width",l(Math.max(t+u,1))),r&&r.setStyle("width",l(Math.max(s-u,1))),d&&c.setStyle("width",l(d+u*(i?-1:1))),++a==o&&n.fire("saveSnapshot");
},0,this,[s,s&&e(s),d,d&&e(d),(!s||!d)&&e(c)+t(c,"left",n)+t(c,"right",n),T]);
}
};
function c(e){
a(e),n.fire("saveSnapshot"),o(),m.on("mouseup",u,this);
};
function u(e){
e.removeListener(),r();
};
function h(e){
D(e.data.getPageOffset().x);
};
var f,m,g,p,E,T,C,v,I,O;
m=n.document,g=CKEDITOR.dom.element.createFromHtml("<div data-cke-temp=1 contenteditable=false unselectable=on style=\"position:absolute;cursor:col-resize;filter:alpha(opacity=0);opacity:0;padding:0;background-color:#004;background-image:none;border:0px none;z-index:10\"></div>",m),n.on("destroy",function(){
g.remove();
}),d||m.getDocumentElement().append(g),this.attachTo=function(e){
p||(d&&(m.getBody().append(g),T=0),f=e,g.setStyles({width:l(e.width),height:l(e.height),left:l(e.x),top:l(e.y)}),d&&g.setOpacity(0.25),g.on("mousedown",c,this),m.getBody().setStyle("cursor","col-resize"),g.show());
};
var D=this.move=function(e){
if(!f){
return 0;
}
if(!p&&(e<f.x||e>f.x+f.width)){
return i(),0;
}
var t=e-Math.round(g.$.offsetWidth/2);
if(p){
if(t==I||t==O){
return 1;
}
t=Math.max(t,I),t=Math.min(t,O),T=t-E;
}
return g.setStyle("left",l(t)),1;
};
};
function s(e){
var t=e.data.getTarget();
if("mouseout"==e.name){
if(!t.is("table")){
return;
}
for(var n=new CKEDITOR.dom.element(e.data.$.relatedTarget||e.data.$.toElement);n&&n.$&&!n.equals(t)&&!n.is("body");){
n=n.getParent();
}
if(!n||n.equals(t)){
return;
}
}
t.getAscendant("table",1).removeCustomData("_cke_table_pillars"),e.removeListener();
};
var l=CKEDITOR.tools.cssLength,d=CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks);
CKEDITOR.plugins.add("tableresize",{requires:"tabletools",init:function(e){
e.on("contentDom",function(){
var t,n=e.editable();
n.attachListener(n.isInline()?n:e.document,"mousemove",function(n){
n=n.data;
var l=n.getTarget();
if(l.type==CKEDITOR.NODE_ELEMENT){
var d=n.getPageOffset().x;
if(t&&t.move(d)){
return void a(n);
}
var c,u;
if((l.is("table")||l.getAscendant("tbody",1))&&(c=l.getAscendant("table",1),e.editable().contains(c))){
(u=c.getCustomData("_cke_table_pillars"))||(c.setCustomData("_cke_table_pillars",u=i(c,e)),c.on("mouseout",s),c.on("mousedown",s));
var h=o(u,d);
h&&(!t&&(t=new r(e)),t.attachTo(h));
}
}
});
});
}});
}(),function(){
function e(e){
function t(){
r=e.document,s=r[CKEDITOR.env.ie?"getBody":"getDocumentElement"](),l=CKEDITOR.env.quirks?r.getBody():r.getDocumentElement(),(CKEDITOR.env.gecko||CKEDITOR.env.ie&&CKEDITOR.env.version<9)&&(d=CKEDITOR.dom.element.createFromHtml("<span style=\"margin:0;padding:0;border:0;clear:both;width:1px;height:1px;display:block;\">"+(CKEDITOR.env.webkit?"&nbsp;":"")+"</span>",r));
};
function n(){
var t=e.getCommand("maximize");
return !e.window||t&&t.state==CKEDITOR.TRISTATE_ON;
};
function i(){
var t,n;
return CKEDITOR.env.gecko||CKEDITOR.env.ie&&CKEDITOR.env.version<9?(s.append(d),n=d.getDocumentPosition(r).y+d.$.offsetHeight,d.remove()):(e.editable().addClass("autogrow"),t=window.getComputedStyle(e.editable().$),n=parseInt(t.height,10)+parseInt(t.marginTop,10)+parseInt(t.marginBottom,10),e.editable().removeClass("autogrow")),n;
};
function o(){
f&&l.setStyle("overflow-y","hidden");
var t=e.window.getViewPaneSize().height,n=i();
n+=c,n=Math.max(n,u),n=Math.min(n,h),n!=t&&a!=n&&(n=e.fire("autoGrow",{currentHeight:t,newHeight:n}).newHeight,e.resize(e.container.getStyle("width"),n,!0),a=n),f||(h>n&&l.$.scrollHeight>l.$.clientHeight?l.setStyle("overflow-y","hidden"):l.removeStyle("overflow-y"));
};
var a,r,s,l,d,c=e.config.autoGrow_bottomSpace||0,u=void 0!==e.config.autoGrow_minHeight?e.config.autoGrow_minHeight:200,h=e.config.autoGrow_maxHeight||1/0,f=!e.config.autoGrow_maxHeight;
e.addCommand("autogrow",{exec:o,modes:{wysiwyg:1},readOnly:1,canUndo:!1,editorFocus:!1});
var m={contentDom:1,key:1,selectionChange:1,insertElement:1,mode:1};
for(var g in m){
e.on(g,function(e){
"wysiwyg"==e.editor.mode&&setTimeout(function(){
return n()?void (a=null):(o(),void (f||o()));
},100);
});
}
e.on("afterCommandExec",function(e){
"maximize"==e.data.name&&"wysiwyg"==e.editor.mode&&(e.data.command.state==CKEDITOR.TRISTATE_ON?l.removeStyle("overflow-y"):o());
}),e.on("contentDom",t),t(),e.config.autoGrow_onStartup&&e.execCommand("autogrow");
};
CKEDITOR.addCss("body.autogrow:after, body.autogrow:before { content: '';margin:0;padding:0;border:0;clear:both;width:1px;height:1px;display:block; }"),CKEDITOR.plugins.add("autogrow",{init:function(t){
t.elementMode!=CKEDITOR.ELEMENT_MODE_INLINE&&t.on("instanceReady",function(){
t.editable().isInline()?t.ui.space("contents").setStyle("height","auto"):e(t);
});
}});
}(),void 0===CKEDITOR.ibm&&(CKEDITOR.ibm={}),CKEDITOR.ibm.dialogs=CKEDITOR.tools.createClass({$:function(){
},statics:{customDialogs:"table,image,flash,link,cellProperties,find,paste,pastetext,specialchar,bulletedListStyle,numberedListStyle,smiley,iframe,anchor,colordialog,tableProperties,a11yHelp,embedBase",styleWidth100Pc:"width:100%;",customizeListener:function(e){
for(var t=e.data,n=e.editor,i=t.definition,o=!1,a=function(e){
for(var t=e.length;t--;){
e[t].children?a(e[t].children):e[t].required&&e[t].label&&(e[t].label="*"+e[t].label,o=!0);
}
},r=0;r<i.contents.length;r++){
o=!1,i.contents[r].elements&&a(i.contents[r].elements),o&&i.contents[r].add({type:"html",id:"requiredLabel",style:"color: #666666;font-size: 0.9em;padding-top:10px;",html:"<div>* "+n.lang.ibm.common.required+" </div>"});
}
var s=t.name;
"replace"===s&&(s="find"),this.applyCommonCustomizations(i,n);
var l=void 0!=n.config.ibmCustomDialogs?n.config.ibmCustomDialogs:this.customDialogs;
-1!==l.indexOf(s)&&(i.minWidth="",i.minHeight="","function"==typeof this[s]&&this[s](i,n));
},applyCommonCustomizations:function(e,t){
e.resizable=CKEDITOR.DIALOG_RESIZE_NONE;
},getDialogWidth:function(e){
var t=e.getName(),n=e.parts.contents,i=CKEDITOR.skin,o=i.dialogDimensions&&i.dialogDimensions[t]?i.dialogDimensions[t][0]:e.definition.minWidth;
return CKEDITOR.env.quirks&&CKEDITOR.env.ie&&(o+=this.getWidthAdjustment(n,o)),"image"===t||"smiley"===t||"a11yHelp"===t?o:Math.min(Math.max(o,e.parts.contents.$.offsetWidth,e.parts.title.$.offsetWidth),1.25*o);
},getDialogHeight:function(e){
for(var t=e.getName(),n=e.parts.contents,i=CKEDITOR.skin,o=i.dialogDimensions&&i.dialogDimensions[t]?i.dialogDimensions[t][1]:e.definition.minHeight,a=n.getChildCount();a--;){
o=Math.max(o,n.getChild(a).getChild(0).$.offsetHeight);
}
return CKEDITOR.env.quirks&&CKEDITOR.env.ie&&(o+=this.getHeightAdjustment(n,o)),o;
},getHeightAdjustment:function(e,t){
var n=this.getAdjustmentValue(e.$.currentStyle.paddingTop,t);
n+=this.getAdjustmentValue(e.$.currentStyle.paddingBottom,t),"auto"!=e.$.currentStyle.marginTop&&(n+=this.getAdjustmentValue(e.$.currentStyle.marginTop,t)),"auto"!=e.$.currentStyle.marginBottom&&(n+=this.getAdjustmentValue(e.$.currentStyle.marginBottom,t));
var i=e.$.currentStyle.borderTopWidth;
"thin"!=i&&"medium"!=i&&"thick"!=i&&(n+=this.getAdjustmentValue(i,t));
var o=e.$.currentStyle.borderBottomWidth;
return "thin"!=o&&"medium"!=o&&"thick"!=o&&(n+=this.getAdjustmentValue(o,t)),n;
},getWidthAdjustment:function(e,t){
var n=this.getAdjustmentValue(e.$.currentStyle.paddingRight,t);
n+=this.getAdjustmentValue(e.$.currentStyle.paddingLeft,t),"auto"!=e.$.currentStyle.marginTop&&(n+=this.getAdjustmentValue(e.$.currentStyle.marginRight,t)),"auto"!=e.$.currentStyle.marginBottom&&(n+=this.getAdjustmentValue(e.$.currentStyle.marginLeft,t));
var i=e.$.currentStyle.borderLeftWidth;
"thin"!=i&&"medium"!=i&&"thick"!=i&&(n+=this.getAdjustmentValue(i,t));
var o=e.$.currentStyle.borderRightWidth;
return "thin"!=o&&"medium"!=o&&"thick"!=o&&(n+=this.getAdjustmentValue(o,t)),n;
},getAdjustmentValue:function(e,t){
var n;
return -1!=e.indexOf("%")?(e=Math.abs(parseInt(e,10))/100,n=t*e):(e=Math.abs(parseInt(e,10)),n=e),n;
},dialogSizeListener:function(e){
e.data.definition.dialog.on("load",function(e){
var t=e.sender,n=CKEDITOR.document.getWindow().getViewPaneSize();
t.parts.contents.setStyles({width:CKEDITOR.ibm.dialogs.getDialogWidth(t)+"px",height:CKEDITOR.ibm.dialogs.getDialogHeight(t)+"px"});
var i=t.getSize();
t.move((n.width-i.width)/2,(n.height-i.height)/2);
});
}}}),function(){
var e=function(e){
if(!CKEDITOR.hasListeners("dialogDefinition")){
return !1;
}
var t=CKEDITOR._.events.dialogDefinition.getListenerIndex(e);
return t>=0;
};
CKEDITOR.plugins.add("ibmcustomdialogs",{init:function(t){
t.config.extraAllowedContent={"ol ul":{propertiesOnly:!0,styles:"font-size"}};
var n=CKEDITOR.ibm.dialogs;
e(n.customizeListener)||CKEDITOR.on("dialogDefinition",n.customizeListener,n,null,1),e(n.dialogSizeListener)||CKEDITOR.on("dialogDefinition",n.dialogSizeListener,n,null,1),t.on("doubleclick",function(e){
"undefined"!=typeof e.data.dialog&&""!==e.data.dialog&&(e.data.dialog="");
},null,null,900),t.config.dialog_buttonsOrder=t.lang.dir;
},afterInit:function(e){
e.ui.items.Find&&(e.ui.items.Find.args[0].label=e.lang.find.title);
}});
}(),CKEDITOR.plugins.add("ibmimagedatauri",{lang:"ar,ca,cs,da,de,el,en,es,fi,fr,he,hr,hu,it,iw,ja,kk,ko,nb,nl,no,pl,pt,pt-br,ro,ru,sk,sl,sv,th,tr,uk,zh,zh-cn,zh-tw",init:function(e){
e.config.ibmFilterPastedDataUriImage&&(e.on("paste",function(t){
var n=/<img.*src=["']data:image\/[^>]*>/gi,i=t.data.dataValue;
if(n.test(i)){
for(var o=i.match(n),a=0;a<o.length;a++){
i=i.replace(o[a],"");
}
alert(e.lang.ibmimagedatauri.error),t.data.dataValue=i;
}
}),e.on("contentDom",function(t){
e.document.on("drop",function(t){
if(t.data.$.dataTransfer.files.length>0){
alert(e.lang.ibmimagedatauri.error),t.data.$.preventDefault();
}else{
var n=CKEDITOR.env.ie?"url":"text/html",i=CKEDITOR.env.ie?"<img src=\""+t.data.$.dataTransfer.getData(n)+"\">":t.data.$.dataTransfer.getData(n);
CKEDITOR.env.mac&&/\S/.test(t.data.$.dataTransfer.getData("url"))&&(i="<img src=\""+t.data.$.dataTransfer.getData("url")+"\">");
var o=/<img.*src=["']data:image\/[^>]*>/gi;
o.test(i)&&(alert(e.lang.ibmimagedatauri.error),t.data.$.preventDefault());
}
});
}));
}}),CKEDITOR.plugins.add("ibmbidi",{init:function(e){
var t="";
for(var n in CKEDITOR.dtd.$block){
t+=n+" ";
}
e.config.extraAllowedContent={blockElements:{propertiesOnly:!0,attributes:"dir"}},e.on("key",function(e){
switch(e.data.keyCode){
case CKEDITOR.CTRL+CKEDITOR.SHIFT+88:
e.cancel();
}
},e),e.config.blockedKeystrokes.push(CKEDITOR.SHIFT+CKEDITOR.ALT+36),e.config.blockedKeystrokes.push(CKEDITOR.SHIFT+CKEDITOR.ALT+35),e.setKeystroke(CKEDITOR.SHIFT+CKEDITOR.ALT+36,"bidiltr"),e.setKeystroke(CKEDITOR.SHIFT+CKEDITOR.ALT+35,"bidirtl");
},afterInit:function(e){
function t(e){
do{
if(e.attributes&&e.attributes.dir){
return e.attributes.dir;
}
}while(e=e.parent);
return n;
};
var n=e.config.contentsLangDirection,i=e.config.toolbar;
if("string"==typeof i&&(i=e.config["toolbar_"+i]),i){
for(var o,a,r,s,l,d,c,u,h,f=0;f<i.length;f++){
s=l=d=c=u=h=-1,o=i[f],a=o.items||o;
for(var m=0;m<a.length;m++){
r=a[m],"JustifyLeft"==r?s=m:"JustifyCenter"==r?l=m:"JustifyRight"==r?d=m:"JustifyBlock"==r?c=m:"BidiLtr"==r?u=m:"BidiRtl"==r&&(h=m);
}
if(-1!=u&&-1!=h&&("rtl"==n&&h>u||"ltr"==n&&u>h)){
var g=a[u];
a[u]=a[h],a[h]=g;
}
if(-1!=s&&-1!=l&&-1!=d&&-1!=c){
if("rtl"==n&&c>s||"ltr"==n&&s>c){
var g=a[s];
a[s]=a[c],a[c]=g;
}
("rtl"==n&&d>l||"ltr"==n&&l>d)&&(g=a[l],a[l]=a[d],a[d]=g);
}
}
}
"ui"==n&&(n=e.lang.dir),e.dataProcessor.htmlFilter.addRules({elements:{$:function(e){
!e.parent.parent&&CKEDITOR.dtd.$block[e.name]&&(e.attributes.dir=t(e));
}}});
}}),CKEDITOR.plugins.add("ibmpasteiframe",{init:function(e){
function t(e){
var t=e,n=CKEDITOR.env.ie?/&lt;iframe.+&lt;\/iframe/:/&lt;iframe.+&lt;\/iframe&gt;/;
this.parse=function(){
return n.test(t)?(CKEDITOR.env.ie&&(t=t.replace(/(?:<A\s+href=(['"]).+?\1\s*>)(.+?)(?:<\/A>)/gi,"$2")),t=t.replace(/&lt;/g,"<").replace(/&gt;/g,">"),!0):!1;
},this.createPlaceholderImage=function(e){
var n=new CKEDITOR.dom.element("div",e.document);
n.setHtml(t);
for(var i=new Array,o=0;o<n.getChildCount();o++){
i.push(n.getChild(o));
}
var a=/<iframe.+?\s*.*<\/iframe>/i,r=a.exec(t),s=CKEDITOR.dom.element.createFromHtml(r,e.document),l=e.createFakeElement(s,"cke_iframe","iframe",!0);
l.setStyles({width:s.getAttribute("width")+"px",height:s.getAttribute("height")+"px"});
for(var o=0;o<i.length;o++){
i[o].getName&&"iframe"==i[o].getName()&&i.splice(o,1,l);
}
return i;
};
};
e.on("paste",function(e){
var n=new t(e.data.dataValue);
if((e.data.dataTransfer.$||"html"==e.data.type)&&n.parse()){
for(var i=n.createPlaceholderImage(e.editor),o=0;o<i.length;o++){
i[o].type==CKEDITOR.NODE_ELEMENT?e.editor.insertElement(i[o]):i[o].type==CKEDITOR.NODE_TEXT&&e.editor.insertText(i[o].getText());
}
e.cancel();
}
});
}}),function(){
var e=function(){
var t,n=null,i=/NDL.+REPLICA.+/,o="(.+[^<])<.+&lt;NDL&gt;.*REPLICA\\s([0-9A-F]{8}):([0-9A-F]{8}).+VIEW OF([0-9A-F]{8}):([0-9A-F]{8})-ON([0-9A-F]{8}):([0-9A-F]{8}).+NOTE OF([0-9A-F]{8}):([0-9A-F]{8})-ON([0-9A-F]{8}):([0-9A-F]{8})(.+HINT&gt;CN=(\\w+)\\/)?",a="(.+[^<])<.+&lt;NDL&gt;.*REPLICA\\s([0-9A-F]{8}):([0-9A-F]{8}).+VIEW OF([0-9A-F]{8}):([0-9A-F]{8})-ON([0-9A-F]{8}):([0-9A-F]{8})(.+HINT&gt;CN=(\\w+)\\/)?",r="(.+[^<])<.+&lt;NDL&gt;.*REPLICA\\s([0-9A-F]{8}):([0-9A-F]{8})(.+HINT&gt;CN=(\\w+)\\/)?",s=null,l=null,d=null;
return {HTML_CLEANSING_NOTESLINKONLY_REGEXP:/^(<!--.*-->)?(&nbsp;)?(\s*<table[^<]*>\s*<tbody>\s*<\/tbody>\s*<\/table>\s*)?(\s*<a\s*href="Notes:\/\/.*">)((?!(<eom><\/eom>)).*?)(<eom><\/eom>)?(<\/a>\s*){1}(\s*<table[^<]*>\s*<tbody>\s*<\/tbody>\s*<\/table>\s*)?$/gi,HTML_NO_CLEASING_NOTESLINKONLY_REGEXP:/^(<!--.*-->)?(&nbsp;)?(\s*<table[^<]*>\s*<tbody>\s*)(<tr>\s*)?(<td>\s*)?(\s*<a\s*href="Notes:\/\/.*">)((?!(<eom><\/eom>)).*?)(<eom><\/eom>)?(<\/a>\s*){1}(\s*<\/td>)?(\s*<\/tr>)?(\s*<\/tbody>\s*<\/table>\s*)$/gi,parse:function(e){
return n=null,i.test(e)?(null===s&&(s=new RegExp(o)),null===l&&(l=new RegExp(a)),null===d&&(d=new RegExp(r)),s.test(e)||l.test(e)||d.test(e)?(s.test(e)?(t=0,n=s.exec(e)):l.test(e)?(t=1,n=l.exec(e)):d.test(e)&&(t=2,n=d.exec(e)),null!==n):!1):!1;
},createLink:function(n){
var i;
return 0==t?i="<a href=\"Notes://"+e.getServer()+"/"+e.getReplica()+"/"+e.getView()+"/"+e.getNote()+"\">"+e.getName()+"</a>":1==t?i="<a href=\"Notes://"+e.getServer()+"/"+e.getReplica()+"/"+e.getView()+"\">"+e.getName()+"</a>":2==t&&(i="<a href=\"Notes://"+e.getServer()+"/"+e.getReplica()+"\">"+e.getName()+"</a>"),i;
},getReplica:function(){
return n[2]+n[3];
},getName:function(){
var e=n[1];
return e.replace(/&nbsp;/g,"").replace(/^\s+|\s+$/g,"");
},getView:function(){
return n[4]+n[5]+n[6]+n[7];
},getNote:function(){
return n[8]+n[9]+n[10]+n[11];
},getServer:function(){
return 0==t?void 0===n[13]?"":n[13]:1==t?void 0===n[9]?"":n[9]:2==t?void 0===n[5]?"":n[5]:void 0;
}};
}();
CKEDITOR.plugins.add("ibmpastenotesdatalink",{init:function(t){
t.on("paste",function(t){
var n=t.data;
if(t.data.dataTransfer.$||"html"==n.type){
var i=n.dataValue;
if(e.parse(i)){
n.dataValue=e.createLink(i);
}else{
var o;
i.match(e.HTML_CLEANSING_NOTESLINKONLY_REGEXP)?(e.HTML_CLEANSING_NOTESLINKONLY_REGEXP.lastIndex=0,o=e.HTML_CLEANSING_NOTESLINKONLY_REGEXP.exec(i),n.dataValue=("undefined"!=typeof o[4]?o[4]:"")+("undefined"!=typeof o[5]?o[5]:"")+("undefined"!=typeof o[8]?o[8]:"")):i.match(e.HTML_NO_CLEASING_NOTESLINKONLY_REGEXP)?(e.HTML_NO_CLEASING_NOTESLINKONLY_REGEXP.lastIndex=0,o=e.HTML_NO_CLEASING_NOTESLINKONLY_REGEXP.exec(i),n.dataValue=("undefined"!=typeof o[6]?o[6]:"")+("undefined"!=typeof o[7]?o[7]:"")+("undefined"!=typeof o[10]?o[10]:"")):n.dataValue=i;
}
}
});
},linkParser:e});
}(),CKEDITOR.plugins.add("ibmpastevideo",{init:function(e){
function t(e){
var t,n,i=e,o=/&lt;object.+&lt;param name=['"]?movie['"]?.+?&lt;embed.+type=['"]?application\/x-shockwave-flash.+?&lt;\/object&gt;\s*/i,a=/&lt;object.+\s*.*data=.+\s*.*type=['"]?application\/x-shockwave-flash.+?\s*.*&lt;\/object&gt;\s*/i;
this.parse=function(){
if(t=!1,!o.test(i)&&!a.test(i)){
return !1;
}
if(i=i.replace(/&lt;!--.+?(--&gt;)/gi,""),CKEDITOR.env.ie){
if(o.test(i)){
this.isolateObjectFormatMetaData(o),i=i.replace(/(<A\s+href=['"].+?['"][^>]*>)/gi,""),i=i.replace(/(<\/A>)/gi,""),CKEDITOR.env.ie&&CKEDITOR.env.version>8&&(i=i.replace(/(<\embed\'>)/i,"").replace(/(<\param\'>)/i,""));
var e=document.createElement("div");
e.style.display="none",document.body.appendChild(e),e.innerHTML=i,i="";
for(var r=0;r<e.childNodes.length;r++){
e.childNodes[r].nodeValue&&null!=e.childNodes[r].nodeValue&&(i+=e.childNodes[r].nodeValue);
}
document.body.removeChild(e);
}else{
a.test(i)&&(t=!0,this.isolateObjectFormatMetaData(a),i=i.replace(/(<A\s+href=['"]\s*)(.+?)(?:['"]\s*>.+?<\/A>)/gi,"$2"),i=i.replace(/<A\s+href=['"]\s*.+?>/gi,""),i=i.replace(/<\/A>/gi,""));
}
}
i=i.replace(/&lt;/g,"<").replace(/&gt;/g,">");
var s=document.createElement("div");
s.style.display="none",document.body.appendChild(s),s.innerHTML=i;
var l=s.innerHTML;
if(CKEDITOR.env.ie&&t){
for(var d=s.firstChild,c="",u="",r=0;r<d.childNodes.length;r++){
u=d.childNodes[r],u.tagName&&"param"==u.tagName.toLowerCase()&&(c+=u.outerHTML);
}
l=l.substring(0,l.indexOf(">")+1)+c+l.substring(l.indexOf(">")+1,l.length);
}
document.body.removeChild(s),i=l,i=i.replace(/<object/gi,"<cke:object").replace(/<\/object>/gi,"</cke:object>"),i=i.replace(/<param/gi,"<cke:param").replace(/<\/param>/gi,"</cke:param>"),i=i.replace(/<embed/gi,"<cke:embed").replace(/<\/embed>/gi,"</cke:embed>");
var h=new RegExp("<cke:param[^>]*>(?!</cke:param>)","gi"),f=i.match(h);
if(f){
for(var m,r=0;r<f.length;r++){
m=f[r],f[r]=f[r].replace(/>/,"></cke:param>"),i=i.replace(m,f[r]);
}
}
return n&&(i=n.replace("OBJECT_PLACEHOLDER",i)),!0;
},this.createPlaceholderImage=function(e){
var t=new CKEDITOR.dom.element("div",e.document);
t.setHtml(i);
for(var n=new Array,o=0;o<t.getChildCount();o++){
n.push(t.getChild(o));
}
var a=/<cke:object.+?\s*.*<\/cke:object>/i,r=a.exec(i),s=CKEDITOR.dom.element.createFromHtml(r,e.document),l=e.createFakeElement(s,"cke_flash","flash",!0),d=s.getAttribute("width");
null!=d&&l.setStyle("width",d+"px");
var c=s.getAttribute("height");
null!=c&&l.setStyle("height",c+"px");
for(var o=0;o<n.length;o++){
n[o].getName&&"cke:object"==n[o].getName()&&n.splice(o,1,l);
}
return n;
},this.isolateObjectFormatMetaData=function(e){
var t=e.exec(i);
n=i.replace(t,"OBJECT_PLACEHOLDER"),n=n.replace(/(<A\s+href=['"].+?['"].+?['"]>)/gi,""),n=n.replace(/(<A\s+href=['"].+?['"]>)/gi,""),n=n.replace(/(<\/A>)/gi,""),n=n.replace(/&lt;/g,"<").replace(/&gt;/g,">"),i=t[0];
};
};
e.on("paste",function(e){
var n=new t(e.data.dataValue);
if((e.data.dataTransfer.$||"html"==e.data.type)&&n.parse()){
for(var i=n.createPlaceholderImage(e.editor),o=0;o<i.length;o++){
i[o].type==CKEDITOR.NODE_ELEMENT?e.editor.insertElement(i[o]):i[o].type==CKEDITOR.NODE_TEXT&&e.editor.insertText(i[o].getText());
}
e.cancel();
}
});
}}),function(){
function e(e,t){
CKEDITOR.tools.extend(this,{editor:e,editable:e.editable(),doc:e.document,win:e.window},t,!0),this.inline=this.editable.isInline(),this.inline||(this.frame=this.win.getFrame()),this.target=this[this.inline?"editable":"doc"];
};
function t(e,t){
CKEDITOR.tools.extend(this,t,{editor:e},!0);
};
function n(e,t){
var n=e.editable();
CKEDITOR.tools.extend(this,{editor:e,editable:n,inline:n.isInline(),doc:e.document,win:e.window,container:CKEDITOR.document.getBody(),winTop:CKEDITOR.document.getWindow()},t,!0),this.hidden={},this.visible={},this.inline||(this.frame=this.win.getFrame()),this.queryViewport();
var i=CKEDITOR.tools.bind(this.queryViewport,this),o=CKEDITOR.tools.bind(this.hideVisible,this),a=CKEDITOR.tools.bind(this.removeAll,this);
n.attachListener(this.winTop,"resize",i),n.attachListener(this.winTop,"scroll",i),n.attachListener(this.winTop,"resize",o),n.attachListener(this.win,"scroll",o),n.attachListener(this.inline?n:this.frame,"mouseout",function(e){
var t=e.data.$.clientX,n=e.data.$.clientY;
this.queryViewport(),(t<=this.rect.left||t>=this.rect.right||n<=this.rect.top||n>=this.rect.bottom)&&this.hideVisible(),(0>=t||t>=this.winTopPane.width||0>=n||n>=this.winTopPane.height)&&this.hideVisible();
},this),n.attachListener(e,"resize",i),n.attachListener(e,"mode",a),e.on("destroy",a),this.lineTpl=new CKEDITOR.template(u).output({lineStyle:CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({},c,this.lineStyle,!0)),tipLeftStyle:CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({},d,{left:"0px","border-left-color":"red","border-width":"6px 0 6px 6px"},this.tipCss,this.tipLeftStyle,!0)),tipRightStyle:CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({},d,{right:"0px","border-right-color":"red","border-width":"6px 6px 6px 0"},this.tipCss,this.tipRightStyle,!0))});
};
function i(e,t){
return e&t;
};
function o(e){
return e&&e.type==CKEDITOR.NODE_ELEMENT;
};
function a(e){
return !(!h[e.getComputedStyle("float")]&&!h[e.getAttribute("align")]);
};
function r(e){
return !!f[e.getComputedStyle("position")];
};
function s(e){
return o(e)&&"true"==e.getAttribute("contenteditable");
};
function l(e){
return o(e)&&!a(e)&&!r(e);
};
CKEDITOR.plugins.add("lineutils"),CKEDITOR.LINEUTILS_BEFORE=1,CKEDITOR.LINEUTILS_AFTER=2,CKEDITOR.LINEUTILS_INSIDE=4,e.prototype={start:function(e){
var t,n,i,o,a=this,r=this.editor,s=this.doc,l=CKEDITOR.tools.eventsBuffer(50,function(){
r.readOnly||"wysiwyg"!=r.mode||(a.relations={},(n=s.$.elementFromPoint(i,o))&&n.nodeType&&(t=new CKEDITOR.dom.element(n),a.traverseSearch(t),isNaN(i+o)||a.pixelSearch(t,i,o),e&&e(a.relations,i,o)));
});
this.listener=this.editable.attachListener(this.target,"mousemove",function(e){
i=e.data.$.clientX,o=e.data.$.clientY,l.input();
}),this.editable.attachListener(this.inline?this.editable:this.frame,"mouseout",function(){
l.reset();
});
},stop:function(){
this.listener&&this.listener.removeListener();
},getRange:function(){
var e={};
return e[CKEDITOR.LINEUTILS_BEFORE]=CKEDITOR.POSITION_BEFORE_START,e[CKEDITOR.LINEUTILS_AFTER]=CKEDITOR.POSITION_AFTER_END,e[CKEDITOR.LINEUTILS_INSIDE]=CKEDITOR.POSITION_AFTER_START,function(t){
var n=this.editor.createRange();
return n.moveToPosition(this.relations[t.uid].element,e[t.type]),n;
};
}(),store:function(){
function e(e,t,n){
var i=e.getUniqueId();
i in n?n[i].type|=t:n[i]={element:e,type:t};
};
return function(t,n){
var o;
i(n,CKEDITOR.LINEUTILS_AFTER)&&l(o=t.getNext())&&o.isVisible()&&(e(o,CKEDITOR.LINEUTILS_BEFORE,this.relations),n^=CKEDITOR.LINEUTILS_AFTER),i(n,CKEDITOR.LINEUTILS_INSIDE)&&l(o=t.getFirst())&&o.isVisible()&&(e(o,CKEDITOR.LINEUTILS_BEFORE,this.relations),n^=CKEDITOR.LINEUTILS_INSIDE),e(t,n,this.relations);
};
}(),traverseSearch:function(e){
var t,n,i;
do{
if(i=e.$["data-cke-expando"],!(i&&i in this.relations)){
if(e.equals(this.editable)){
return;
}
if(l(e)){
for(t in this.lookups){
(n=this.lookups[t](e))&&this.store(e,n);
}
}
}
}while(!s(e)&&(e=e.getParent()));
},pixelSearch:function(){
function e(e,n,i,o,a){
for(var r,s=i,d=0;a(s);){
if(s+=o,25==++d){
return;
}
if(r=this.doc.$.elementFromPoint(n,s)){
if(r!=e){
if(t(e,r)&&(d=0,l(r=new CKEDITOR.dom.element(r)))){
return r;
}
}else{
d=0;
}
}
}
};
var t=CKEDITOR.env.ie||CKEDITOR.env.webkit?function(e,t){
return e.contains(t);
}:function(e,t){
return !!(16&e.compareDocumentPosition(t));
};
return function(t,n,i){
var o=this.win.getViewPaneSize().height,a=e.call(this,t.$,n,i,-1,function(e){
return e>0;
}),r=e.call(this,t.$,n,i,1,function(e){
return o>e;
});
if(a){
for(this.traverseSearch(a);!a.getParent().equals(t);){
a=a.getParent();
}
}
if(r){
for(this.traverseSearch(r);!r.getParent().equals(t);){
r=r.getParent();
}
}
for(;(a||r)&&(a&&(a=a.getNext(l)),a&&!a.equals(r))&&(this.traverseSearch(a),r&&(r=r.getPrevious(l)),r&&!r.equals(a));){
this.traverseSearch(r);
}
};
}(),greedySearch:function(){
this.relations={};
for(var e,t,n,i=this.editable.getElementsByTag("*"),o=0;e=i.getItem(o++);){
if(!e.equals(this.editable)&&e.type==CKEDITOR.NODE_ELEMENT&&(e.hasAttribute("contenteditable")||!e.isReadOnly())&&l(e)&&e.isVisible()){
for(n in this.lookups){
(t=this.lookups[n](e))&&this.store(e,t);
}
}
}
return this.relations;
}},t.prototype={locate:function(){
function e(e,t){
var n=e.element[t===CKEDITOR.LINEUTILS_BEFORE?"getPrevious":"getNext"]();
return n&&l(n)?(e.siblingRect=n.getClientRect(),t==CKEDITOR.LINEUTILS_BEFORE?(e.siblingRect.bottom+e.elementRect.top)/2:(e.elementRect.bottom+e.siblingRect.top)/2):t==CKEDITOR.LINEUTILS_BEFORE?e.elementRect.top:e.elementRect.bottom;
};
return function(t){
var n;
this.locations={};
for(var o in t){
n=t[o],n.elementRect=n.element.getClientRect(),i(n.type,CKEDITOR.LINEUTILS_BEFORE)&&this.store(o,CKEDITOR.LINEUTILS_BEFORE,e(n,CKEDITOR.LINEUTILS_BEFORE)),i(n.type,CKEDITOR.LINEUTILS_AFTER)&&this.store(o,CKEDITOR.LINEUTILS_AFTER,e(n,CKEDITOR.LINEUTILS_AFTER)),i(n.type,CKEDITOR.LINEUTILS_INSIDE)&&this.store(o,CKEDITOR.LINEUTILS_INSIDE,(n.elementRect.top+n.elementRect.bottom)/2);
}
return this.locations;
};
}(),sort:function(){
function e(e,n,i){
return Math.abs(e-t[n][i]);
};
var t,n,i,o;
return function(a,r){
t=this.locations,n=[];
for(var s in t){
for(var l in t[s]){
if(i=e(a,s,l),n.length){
for(o=0;o<n.length;o++){
if(i<n[o].dist){
n.splice(o,0,{uid:+s,type:l,dist:i});
break;
}
}
o==n.length&&n.push({uid:+s,type:l,dist:i});
}else{
n.push({uid:+s,type:l,dist:i});
}
}
}
return "undefined"!=typeof r?n.slice(0,r):n;
};
}(),store:function(e,t,n){
this.locations[e]||(this.locations[e]={}),this.locations[e][t]=n;
}};
var d={display:"block",width:"0px",height:"0px","border-color":"transparent","border-style":"solid",position:"absolute",top:"-6px"},c={height:"0px","border-top":"1px dashed red",position:"absolute","z-index":9999},u="<div data-cke-lineutils-line=\"1\" class=\"cke_reset_all\" style=\"{lineStyle}\"><span style=\"{tipLeftStyle}\">&nbsp;</span><span style=\"{tipRightStyle}\">&nbsp;</span></div>";
n.prototype={removeAll:function(){
var e;
for(e in this.hidden){
this.hidden[e].remove(),delete this.hidden[e];
}
for(e in this.visible){
this.visible[e].remove(),delete this.visible[e];
}
},hideLine:function(e){
var t=e.getUniqueId();
e.hide(),this.hidden[t]=e,delete this.visible[t];
},showLine:function(e){
var t=e.getUniqueId();
e.show(),this.visible[t]=e,delete this.hidden[t];
},hideVisible:function(){
for(var e in this.visible){
this.hideLine(this.visible[e]);
}
},placeLine:function(e,t){
var n,i,o;
if(n=this.getStyle(e.uid,e.type)){
for(o in this.visible){
if(this.visible[o].getCustomData("hash")!==this.hash){
i=this.visible[o];
break;
}
}
if(!i){
for(o in this.hidden){
if(this.hidden[o].getCustomData("hash")!==this.hash){
this.showLine(i=this.hidden[o]);
break;
}
}
}
i||this.showLine(i=this.addLine()),i.setCustomData("hash",this.hash),this.visible[i.getUniqueId()]=i,i.setStyles(n),t&&t(i);
}
},getStyle:function(e,t){
var n,i=this.relations[e],o=this.locations[e][t],a={};
if(i.siblingRect?a.width=Math.max(i.siblingRect.width,i.elementRect.width):a.width=i.elementRect.width,this.inline?a.top=o+this.winTopScroll.y-this.rect.relativeY:a.top=this.rect.top+this.winTopScroll.y+o,a.top-this.winTopScroll.y<this.rect.top||a.top-this.winTopScroll.y>this.rect.bottom){
return !1;
}
this.inline?a.left=i.elementRect.left-this.rect.relativeX:(i.elementRect.left>0?a.left=this.rect.left+i.elementRect.left:(a.width+=i.elementRect.left,a.left=this.rect.left),(n=a.left+a.width-(this.rect.left+this.winPane.width))>0&&(a.width-=n)),a.left+=this.winTopScroll.x;
for(var r in a){
a[r]=CKEDITOR.tools.cssLength(a[r]);
}
return a;
},addLine:function(){
var e=CKEDITOR.dom.element.createFromHtml(this.lineTpl);
return e.appendTo(this.container),e;
},prepare:function(e,t){
this.relations=e,this.locations=t,this.hash=Math.random();
},cleanup:function(){
var e;
for(var t in this.visible){
e=this.visible[t],e.getCustomData("hash")!==this.hash&&this.hideLine(e);
}
},queryViewport:function(){
this.winPane=this.win.getViewPaneSize(),this.winTopScroll=this.winTop.getScrollPosition(),this.winTopPane=this.winTop.getViewPaneSize(),this.rect=this.getClientRect(this.inline?this.editable:this.frame);
},getClientRect:function(e){
var t=e.getClientRect(),n=this.container.getDocumentPosition(),i=this.container.getComputedStyle("position");
return t.relativeX=t.relativeY=0,"static"!=i&&(t.relativeY=n.y,t.relativeX=n.x,t.top-=t.relativeY,t.bottom-=t.relativeY,t.left-=t.relativeX,t.right-=t.relativeX),t;
}};
var h={left:1,right:1,center:1},f={absolute:1,fixed:1};
CKEDITOR.plugins.lineutils={finder:e,locator:t,liner:n};
}(),function(){
function e(e){
this.editor=e,this.registered={},this.instances={},this.selected=[],this.focused=null,this.widgetHoldingFocusedEditable=null,this._={nextId:0,upcasts:[],upcastCallbacks:[],filters:{}},y(this),R(this),O(this),D(this),I(this),b(this);
};
function t(e,n,i,o,a){
var r=e.editor;
CKEDITOR.tools.extend(this,o,{editor:r,id:n,inline:"span"==i.getParent().getName(),element:i,data:CKEDITOR.tools.extend({},"function"==typeof o.defaults?o.defaults():o.defaults),dataReady:!1,inited:!1,ready:!1,edit:t.prototype.edit,focusedEditable:null,definition:o,repository:e,draggable:o.draggable!==!1,_:{downcastFn:o.downcast&&"string"==typeof o.downcast?o.downcasts[o.downcast]:o.downcast}},!0),e.fire("instanceCreated",this),z(this,o),this.init&&this.init(),this.inited=!0,V(this,a),this.isInited()&&r.editable().contains(this.wrapper)&&(this.ready=!0,this.fire("ready"));
};
function n(e,t,n){
CKEDITOR.dom.element.call(this,t.$),this.editor=e,this._={};
var i=this.filter=n.filter;
CKEDITOR.dtd[this.getName()].p?(this.enterMode=i?i.getAllowedEnterMode(e.enterMode):e.enterMode,this.shiftEnterMode=i?i.getAllowedEnterMode(e.shiftEnterMode,!0):e.shiftEnterMode):this.enterMode=this.shiftEnterMode=CKEDITOR.ENTER_BR;
};
function i(e){
var t,n,i,o=e.widgets.registered;
for(n in o){
t=o[n],i=t.button,i&&e.ui.addButton&&e.ui.addButton(CKEDITOR.tools.capitalize(t.name,!0),{label:i,command:t.name,toolbar:"insert,10"});
}
};
function o(e,t){
e.addCommand(t.name,{exec:function(e,n){
function i(){
e.widgets.finalizeCreation(d);
};
var o=e.widgets.focused;
if(o&&o.name==t.name){
o.edit();
}else{
if(t.insert){
t.insert();
}else{
if(t.template){
var a,r="function"==typeof t.defaults?t.defaults():t.defaults,s=CKEDITOR.dom.element.createFromHtml(t.template.output(r)),l=e.widgets.wrapElement(s,t.name),d=new CKEDITOR.dom.documentFragment(l.getDocument());
if(d.append(l),a=e.widgets.initOn(s,t,n&&n.startupData),!a){
return void i();
}
var c=a.once("edit",function(t){
t.data.dialog?a.once("dialog",function(t){
var n,o,r=t.data;
n=r.once("ok",i,null,null,20),o=r.once("cancel",function(t){
t.data&&t.data.hide===!1||e.widgets.destroy(a,!0);
}),r.once("hide",function(){
n.removeListener(),o.removeListener();
});
}):i();
},null,null,999);
a.edit(),c.removeListener();
}
}
}
},allowedContent:t.allowedContent,requiredContent:t.requiredContent,contentForms:t.contentForms,contentTransformations:t.contentTransformations});
};
function a(e,t){
function n(t,n,i){
var o=CKEDITOR.tools.getIndex(e._.upcasts,function(e){
return e[2]>i;
});
0>o&&(o=e._.upcasts.length),e._.upcasts.splice(o,0,[t,n,i]);
};
var i,o=t.upcast,a=t.upcastPriority||10;
if(o){
if("string"==typeof o){
for(i=o.split(",");i.length;){
n(t.upcasts[i.pop()],t.name,a);
}
}else{
n(o,t.name,a);
}
}
};
function r(e,t){
if(e.focused=null,t.isInited()){
var n=t.editor.checkDirty();
e.fire("widgetBlurred",{widget:t}),t.setFocused(!1),!n&&t.editor.resetDirty();
}
};
function s(e){
var n=e.data;
if("wysiwyg"==this.editor.mode){
var i,o,a,r,s,l=this.editor.editable(),d=this.instances;
if(l){
for(o in d){
d[o].isReady()&&!l.contains(d[o].wrapper)&&this.destroy(d[o],!0);
}
if(n&&n.initOnlyNew){
i=this.initOnAll();
}else{
var c=l.find(".cke_widget_wrapper");
for(i=[],o=0,a=c.count();a>o;o++){
r=c.getItem(o),s=!this.getByElement(r,!0),s&&!h(r,p)&&l.contains(r)&&(r.addClass("cke_widget_new"),i.push(this.initOn(r.getFirst(t.isDomWidgetElement))));
}
}
n&&n.focusInited&&1==i.length&&i[0].focus();
}
}
};
function l(e){
var t=e.parent;
t.type==CKEDITOR.NODE_ELEMENT&&t.attributes["data-cke-widget-wrapper"]&&t.replaceWith(e);
};
function d(e,n){
for(var i,o,a=n.find(".cke_widget_wrapper"),r=0,s=a.count();s>r;++r){
i=a.getItem(r),o=i.getFirst(t.isDomWidgetElement),o.type==CKEDITOR.NODE_ELEMENT&&o.data("widget")?(o.replace(i),e.wrapElement(o)):i.remove();
}
};
function c(e,t,n){
if(!n.allowedContent){
return null;
}
var i=this._.filters[e];
i||(this._.filters[e]=i={});
var o=i[t];
return o||(i[t]=o=new CKEDITOR.filter(n.allowedContent)),o;
};
function u(e){
var n=[],i=e._.upcasts,o=e._.upcastCallbacks;
return {toBeWrapped:n,iterator:function(e){
var a,r,s,l,d,c;
if("data-cke-widget-wrapper" in e.attributes){
return e=e.getFirst(t.isParserWidgetElement),e&&n.push([e]),!1;
}
if("data-widget" in e.attributes){
return n.push([e]),!1;
}
if(d=i.length){
if(e.attributes["data-cke-widget-upcasted"]){
return !1;
}
for(l=0,c=o.length;c>l;++l){
if(o[l](e)===!1){
return;
}
}
for(l=0;d>l;++l){
if(a=i[l],s={},r=a[0](e,s)){
return r instanceof CKEDITOR.htmlParser.element&&(e=r),e.attributes["data-cke-widget-data"]=encodeURIComponent(JSON.stringify(s)),e.attributes["data-cke-widget-upcasted"]=1,n.push([e,a[1]]),!1;
}
}
}
}};
};
function h(e,t){
for(var n=e;n=n.getParent();){
if(t(n)){
return !0;
}
}
return !1;
};
function f(e){
return {tabindex:-1,contenteditable:"false","data-cke-widget-wrapper":1,"data-cke-filter":"off","class":"cke_widget_wrapper cke_widget_new cke_widget_"+(e?"inline":"block")};
};
function m(e,t,n){
if(e.type==CKEDITOR.NODE_ELEMENT){
var i=CKEDITOR.dtd[e.name];
if(i&&!i[n.name]){
var o=e.split(t),a=e.parent;
return t=o.getIndex(),e.children.length||(t-=1,e.remove()),o.children.length||o.remove(),m(a,t,n);
}
}
e.add(n,t);
};
function g(e,t){
return "boolean"==typeof e.inline?e.inline:!!CKEDITOR.dtd.$inline[t];
};
function p(e){
return e.hasAttribute("data-cke-temp");
};
function E(e,t){
var n,i=e.focusedEditable;
if(t==CKEDITOR.CTRL+65){
var o=i.getBogus();
return n=e.editor.createRange(),n.selectNodeContents(i),o&&n.setEndAt(o,CKEDITOR.POSITION_BEFORE_START),n.select(),!1;
}
if(8==t||46==t){
var a=e.editor.getSelection().getRanges();
return n=a[0],!(1==a.length&&n.collapsed&&n.checkBoundaryOfElement(i,CKEDITOR[8==t?"START":"END"]));
}
};
function T(e,t,n,i){
var o=e.editor;
if(o.fire("lockSnapshot"),n){
var a=n.data("cke-widget-editable"),r=t.editables[a];
e.widgetHoldingFocusedEditable=t,t.focusedEditable=r,n.addClass("cke_widget_editable_focused"),r.filter&&o.setActiveFilter(r.filter),o.setActiveEnterMode(r.enterMode,r.shiftEnterMode);
}else{
i||t.focusedEditable.removeClass("cke_widget_editable_focused"),t.focusedEditable=null,e.widgetHoldingFocusedEditable=null,o.setActiveFilter(null),o.setActiveEnterMode(null,null);
}
o.fire("unlockSnapshot");
};
function C(e){
e.contextMenu&&e.contextMenu.addListener(function(t){
var n=e.widgets.getByElement(t,!0);
return n?n.fire("contextMenu",{}):void 0;
});
};
function v(e,t){
return CKEDITOR.tools.trim(t);
};
function I(e){
var n=e.editor,i=CKEDITOR.plugins.lineutils;
n.on("dragstart",function(i){
var o=i.data.target;
if(t.isDomDragHandler(o)){
var a=e.getByElement(o);
i.data.dataTransfer.setData("cke/widget-id",a.id),n.focus(),a.focus();
}
}),n.on("drop",function(t){
var i,o=t.data.dataTransfer,a=o.getData("cke/widget-id"),r=o.getTransferType(n),s=n.createRange();
return ""!==a&&r===CKEDITOR.DATA_TRANSFER_CROSS_EDITORS?void t.cancel():void (""!==a&&r==CKEDITOR.DATA_TRANSFER_INTERNAL&&(i=e.instances[a],i&&(s.setStartBefore(i.wrapper),s.setEndAfter(i.wrapper),t.data.dragRange=s,delete CKEDITOR.plugins.clipboard.dragStartContainerChildCount,delete CKEDITOR.plugins.clipboard.dragEndContainerChildCount,t.data.dataTransfer.setData("text/html",n.editable().getHtmlFromRange(s).getHtml()),n.widgets.destroy(i,!0))));
}),n.on("contentDom",function(){
var o=n.editable();
CKEDITOR.tools.extend(e,{finder:new i.finder(n,{lookups:{"default":function(n){
if(!n.is(CKEDITOR.dtd.$listItem)&&n.is(CKEDITOR.dtd.$block)&&!t.isDomNestedEditable(n)&&!e._.draggedWidget.wrapper.contains(n)){
var i=t.getNestedEditable(o,n);
if(i){
var a=e._.draggedWidget;
if(e.getByElement(i)==a){
return;
}
var r=CKEDITOR.filter.instances[i.data("cke-filter")],s=a.requiredContent;
if(r&&s&&!r.check(s)){
return;
}
}
return CKEDITOR.LINEUTILS_BEFORE|CKEDITOR.LINEUTILS_AFTER;
}
}}}),locator:new i.locator(n),liner:new i.liner(n,{lineStyle:{cursor:"move !important","border-top-color":"#666"},tipLeftStyle:{"border-left-color":"#666"},tipRightStyle:{"border-right-color":"#666"}})},!0);
});
};
function O(e){
var n=e.editor;
n.on("contentDom",function(){
var i,o,a=n.editable(),r=a.isInline()?a:n.document;
a.attachListener(r,"mousedown",function(a){
var r=a.data.getTarget();
if(!r.type){
return !1;
}
if(i=e.getByElement(r),o=0,i){
if(i.inline&&r.type==CKEDITOR.NODE_ELEMENT&&r.hasAttribute("data-cke-widget-drag-handler")){
return o=1,void (e.focused!=i&&n.getSelection().removeAllRanges());
}
t.getNestedEditable(i.wrapper,r)?i=null:(a.data.preventDefault(),CKEDITOR.env.ie||i.focus());
}
}),a.attachListener(r,"mouseup",function(){
o&&i&&i.wrapper&&(o=0,i.focus());
}),CKEDITOR.env.ie&&a.attachListener(r,"mouseup",function(){
setTimeout(function(){
i&&i.wrapper&&a.contains(i.wrapper)&&(i.focus(),i=null);
});
});
}),n.on("doubleclick",function(n){
var i=e.getByElement(n.data.element);
if(i&&!t.getNestedEditable(i.wrapper,n.data.element)){
return i.fire("doubleclick",{element:n.data.element});
}
},null,null,1);
};
function D(e){
var t=e.editor;
t.on("key",function(t){
var n,i=e.focused,o=e.widgetHoldingFocusedEditable;
return i?n=i.fire("key",{keyCode:t.data.keyCode}):o&&(n=E(o,t.data.keyCode)),n;
},null,null,1);
};
function b(e){
function t(t){
e.focused&&x(e.focused,"cut"==t.name);
};
var n=e.editor;
n.on("contentDom",function(){
var e=n.editable();
e.attachListener(e,"copy",t),e.attachListener(e,"cut",t);
});
};
function R(e){
var n=e.editor;
n.on("selectionCheck",function(){
e.fire("checkSelection");
}),e.on("checkSelection",e.checkSelection,e),n.on("selectionChange",function(i){
var o=t.getNestedEditable(n.editable(),i.data.selection.getStartElement()),a=o&&e.getByElement(o),r=e.widgetHoldingFocusedEditable;
r?r===a&&r.focusedEditable.equals(o)||(T(e,r,null),a&&o&&T(e,a,o)):a&&o&&T(e,a,o);
}),n.on("dataReady",function(){
k(e).commit();
}),n.on("blur",function(){
var t;
(t=e.focused)&&r(e,t),(t=e.widgetHoldingFocusedEditable)&&T(e,t,null);
});
};
function y(e){
_19(e),K(e),e.on("checkWidgets",s),e.editor.on("contentDomInvalidated",e.checkWidgets,e);
};
function K(e){
var n=e.editor,i={};
n.on("toDataFormat",function(n){
var o=CKEDITOR.tools.getNextNumber(),a=[];
n.data.downcastingSessionId=o,i[o]=a,n.data.dataValue.forEach(function(n){
var i,o,r=n.attributes;
if("data-cke-widget-id" in r){
i=e.instances[r["data-cke-widget-id"]],i&&(o=n.getFirst(t.isParserWidgetElement),a.push({wrapper:n,element:o,widget:i,editables:{}}),"1"!=o.attributes["data-cke-widget-keep-attr"]&&delete o.attributes["data-widget"]);
}else{
if("data-cke-widget-editable" in r){
return a[a.length-1].editables[r["data-cke-widget-editable"]]=n,!1;
}
}
},CKEDITOR.NODE_ELEMENT,!0);
},null,null,8),n.on("toDataFormat",function(e){
if(e.data.downcastingSessionId){
for(var t,n,o,a,r,s,l=i[e.data.downcastingSessionId];t=l.shift();){
n=t.widget,o=t.element,a=n._.downcastFn&&n._.downcastFn.call(n,o);
for(s in t.editables){
r=t.editables[s],delete r.attributes.contenteditable,r.setHtml(n.editables[s].getData());
}
a||(a=o),t.wrapper.replaceWith(a);
}
}
},null,null,13),n.on("contentDomUnload",function(){
e.destroyAll(!0);
});
};
function _19(e){
var n,i,o=e.editor;
o.on("toHtml",function(i){
var o,a=u(e);
for(i.data.dataValue.forEach(a.iterator,CKEDITOR.NODE_ELEMENT,!0);o=a.toBeWrapped.pop();){
l(o[0]),e.wrapElement(o[0],o[1]);
}
n=i.data.protectedWhitespaces?3==i.data.dataValue.children.length&&t.isParserWidgetWrapper(i.data.dataValue.children[1]):1==i.data.dataValue.children.length&&t.isParserWidgetWrapper(i.data.dataValue.children[0]);
},null,null,8),o.on("dataReady",function(){
i&&d(e,o.editable()),i=0,e.destroyAll(!0),e.initOnAll();
}),o.on("loadSnapshot",function(t){
/data-cke-widget/.test(t.data)&&(i=1),e.destroyAll(!0);
},null,null,9),o.on("paste",function(e){
var n=e.data;
if(n.dataValue=n.dataValue.replace(G,v),n.range){
var i=t.getNestedEditable(o.editable(),n.range.startContainer);
if(i){
var a=CKEDITOR.filter.instances[i.data("cke-filter")];
a&&o.setActiveFilter(a);
}
}
}),o.on("afterInsertHtml",function(t){
t.data.intoRange?e.checkWidgets({initOnlyNew:!0}):(o.fire("lockSnapshot"),e.checkWidgets({initOnlyNew:!0,focusInited:n}),o.fire("unlockSnapshot"));
});
};
function k(e){
var t=e.selected,n=[],i=t.slice(0),o=null;
return {select:function(e){
CKEDITOR.tools.indexOf(t,e)<0&&n.push(e);
var o=CKEDITOR.tools.indexOf(i,e);
return o>=0&&i.splice(o,1),this;
},focus:function(e){
return o=e,this;
},commit:function(){
var a,s,l=e.focused!==o;
for(e.editor.fire("lockSnapshot"),l&&(a=e.focused)&&r(e,a);a=i.pop();){
t.splice(CKEDITOR.tools.indexOf(t,a),1),a.isInited()&&(s=a.editor.checkDirty(),a.setSelected(!1),!s&&a.editor.resetDirty());
}
for(l&&o&&(s=e.editor.checkDirty(),e.focused=o,e.fire("widgetFocused",{widget:o}),o.setFocused(!0),!s&&e.editor.resetDirty());a=n.pop();){
t.push(a),a.setSelected(!0);
}
e.editor.fire("unlockSnapshot");
}};
};
function w(e,t,n){
var i,o=0,a=N(t),r=e.data.classes||{};
if(a){
for(r=CKEDITOR.tools.clone(r);i=a.pop();){
n?r[i]||(o=r[i]=1):r[i]&&(delete r[i],o=1);
}
o&&e.setData("classes",r);
}
};
function S(e){
e.cancel();
};
function x(e,t){
var n=e.editor,i=n.document;
if(!i.getById("cke_copybin")){
var o=n.blockless||CKEDITOR.env.ie?"span":"div",a=i.createElement(o),r=i.createElement(o),s=CKEDITOR.env.ie&&CKEDITOR.env.version<9;
r.setAttributes({id:"cke_copybin","data-cke-temp":"1"}),a.setStyles({position:"absolute",width:"1px",height:"1px",overflow:"hidden"}),a.setStyle("ltr"==n.config.contentsLangDirection?"left":"right","-5000px");
var l=n.createRange();
l.setStartBefore(e.wrapper),l.setEndAfter(e.wrapper),a.setHtml("<span data-cke-copybin-start=\"1\">\u200b</span>"+n.editable().getHtmlFromRange(l).getHtml()+"<span data-cke-copybin-end=\"1\">\u200b</span>"),n.fire("saveSnapshot"),n.fire("lockSnapshot"),r.append(a),n.editable().append(r);
var d=n.on("selectionChange",S,null,null,0),c=e.repository.on("checkSelection",S,null,null,0);
if(s){
var u=i.getDocumentElement().$,h=u.scrollTop;
}
l=n.createRange(),l.selectNodeContents(a),l.select(),s&&(u.scrollTop=h),setTimeout(function(){
t||e.focus(),r.remove(),d.removeListener(),c.removeListener(),n.fire("unlockSnapshot"),t&&(e.repository.del(e),n.fire("saveSnapshot"));
},100);
}
};
function N(e){
var t=e.getDefinition().attributes,n=t&&t["class"];
return n?n.split(/\s+/):null;
};
function A(){
var e=CKEDITOR.document.getActive(),t=this.editor,n=t.editable();
(n.isInline()?n:t.document.getWindow().getFrame()).equals(e)&&t.focusManager.focus(n);
};
function L(){
CKEDITOR.env.gecko&&this.editor.unlockSelection(),CKEDITOR.env.webkit||(this.editor.forceNextSelectionCheck(),this.editor.selectionChange(1));
};
function P(e){
var t=null;
e.on("data",function(){
var e,n=this.data.classes;
if(t!=n){
for(e in t){
n&&n[e]||this.removeClass(e);
}
for(e in n){
this.addClass(e);
}
t=n;
}
});
};
function B(e){
if(e.draggable){
var n,i=e.editor,o=e.wrapper.getLast(t.isDomDragHandlerContainer);
o?n=o.findOne("img"):(o=new CKEDITOR.dom.element("span",i.document),o.setAttributes({"class":"cke_reset cke_widget_drag_handler_container",style:"background:rgba(220,220,220,0.5);background-image:url("+i.plugins.widget.path+"images/handle.png)"}),n=new CKEDITOR.dom.element("img",i.document),n.setAttributes({"class":"cke_reset cke_widget_drag_handler","data-cke-widget-drag-handler":"1",src:CKEDITOR.tools.transparentImageData,width:W,title:i.lang.widget.move,height:W}),e.inline&&n.setAttribute("draggable","true"),o.append(n),e.wrapper.append(o)),e.wrapper.on("dragover",function(e){
e.data.preventDefault();
}),e.wrapper.on("mouseenter",e.updateDragHandlerPosition,e),setTimeout(function(){
e.on("data",e.updateDragHandlerPosition,e);
},50),e.inline||(n.on("mousedown",F,e),CKEDITOR.env.ie&&CKEDITOR.env.version<9&&n.on("dragstart",function(e){
e.data.preventDefault(!0);
})),e.dragHandlerContainer=o;
}
};
function F(e){
function t(){
var t;
for(h.reset();t=s.pop();){
t.removeListener();
}
M.call(this,l,e.sender);
};
var n=this.repository.finder,i=this.repository.locator,o=this.repository.liner,a=this.editor,r=a.editable(),s=[],l=[];
this.repository._.draggedWidget=this;
var d,c,u=n.greedySearch(),h=CKEDITOR.tools.eventsBuffer(50,function(){
d=i.locate(u),l=i.sort(c,1),l.length&&(o.prepare(u,d),o.placeLine(l[0]),o.cleanup());
});
r.addClass("cke_widget_dragging"),s.push(r.on("mousemove",function(e){
c=e.data.$.clientY,h.input();
})),a.fire("dragstart",{target:e.sender}),s.push(a.document.once("mouseup",t,this)),r.isInline()||s.push(CKEDITOR.document.once("mouseup",t,this));
};
function M(e,t){
var n=this.repository.finder,i=this.repository.liner,o=this.editor,a=this.editor.editable();
if(!CKEDITOR.tools.isEmpty(i.visible)){
var r=n.getRange(e[0]);
this.focus(),o.fire("drop",{dropRange:r,target:r.startContainer});
}
a.removeClass("cke_widget_dragging"),i.hideVisible(),o.fire("dragend",{target:t});
};
function $(e){
var t,n,i=e.editables;
if(e.editables={},e.editables){
for(t in i){
n=i[t],e.initEditable(t,"string"==typeof n?{selector:n}:n);
}
}
};
function H(e){
if(e.mask){
var t=e.wrapper.findOne(".cke_widget_mask");
t||(t=new CKEDITOR.dom.element("img",e.editor.document),t.setAttributes({src:CKEDITOR.tools.transparentImageData,"class":"cke_reset cke_widget_mask"}),e.wrapper.append(t)),e.mask=t;
}
};
function q(e){
if(e.parts){
var t,n,i={};
for(n in e.parts){
t=e.wrapper.findOne(e.parts[n]),i[n]=t;
}
e.parts=i;
}
};
function z(e,n){
j(e),q(e),$(e),H(e),B(e),P(e),CKEDITOR.env.ie&&CKEDITOR.env.version<9&&e.wrapper.on("dragstart",function(n){
var i=n.data.getTarget();
t.getNestedEditable(e,i)||e.inline&&t.isDomDragHandler(i)||n.data.preventDefault();
}),e.wrapper.removeClass("cke_widget_new"),e.element.addClass("cke_widget_element"),e.on("key",function(t){
var n=t.data.keyCode;
if(13==n){
e.edit();
}else{
if(n==CKEDITOR.CTRL+67||n==CKEDITOR.CTRL+88){
return void x(e,n==CKEDITOR.CTRL+88);
}
if(n in X||CKEDITOR.CTRL&n||CKEDITOR.ALT&n){
return;
}
}
return !1;
},null,null,999),e.on("doubleclick",function(t){
e.edit()&&t.cancel();
}),n.data&&e.on("data",n.data),n.edit&&e.on("edit",n.edit);
};
function V(e,t){
var n=e.element.data("cke-widget-data");
n&&e.setData(JSON.parse(decodeURIComponent(n))),t&&e.setData(t),e.data.classes||e.setData("classes",e.getClasses()),e.dataReady=!0,U(e),e.fire("data",e.data);
};
function j(e){
var t=e.wrapper=e.element.getParent();
t.setAttribute("data-cke-widget-id",e.id);
};
function U(e){
e.element.data("cke-widget-data",encodeURIComponent(JSON.stringify(e.data)));
};
var W=15;
CKEDITOR.plugins.add("widget",{requires:"lineutils,clipboard",onLoad:function(){
CKEDITOR.addCss(".cke_widget_wrapper{position:relative;outline:none}.cke_widget_inline{display:inline-block}.cke_widget_wrapper:hover>.cke_widget_element{outline:2px solid yellow;cursor:default}.cke_widget_wrapper:hover .cke_widget_editable{outline:2px solid yellow}.cke_widget_wrapper.cke_widget_focused>.cke_widget_element,.cke_widget_wrapper .cke_widget_editable.cke_widget_editable_focused{outline:2px solid #ace}.cke_widget_editable{cursor:text}.cke_widget_drag_handler_container{position:absolute;width:"+W+"px;height:0;display:none;opacity:0.75;transition:height 0s 0.2s;line-height:0}.cke_widget_wrapper:hover>.cke_widget_drag_handler_container{height:"+W+"px;transition:none}.cke_widget_drag_handler_container:hover{opacity:1}img.cke_widget_drag_handler{cursor:move;width:"+W+"px;height:"+W+"px;display:inline-block}.cke_widget_mask{position:absolute;top:0;left:0;width:100%;height:100%;display:block}.cke_editable.cke_widget_dragging, .cke_editable.cke_widget_dragging *{cursor:move !important}");
},beforeInit:function(t){
t.widgets=new e(t);
},afterInit:function(e){
i(e),C(e);
}}),e.prototype={MIN_SELECTION_CHECK_INTERVAL:500,add:function(e,t){
return t=CKEDITOR.tools.prototypedCopy(t),t.name=e,t._=t._||{},this.editor.fire("widgetDefinition",t),t.template&&(t.template=new CKEDITOR.template(t.template)),o(this.editor,t),a(this,t),this.registered[e]=t,t;
},addUpcastCallback:function(e){
this._.upcastCallbacks.push(e);
},checkSelection:function(){
var e,n=this.editor.getSelection(),i=n.getSelectedElement(),o=k(this);
if(i&&(e=this.getByElement(i,!0))){
return o.focus(e).select(e).commit();
}
var a=n.getRanges()[0];
if(!a||a.collapsed){
return o.commit();
}
var r,s=new CKEDITOR.dom.walker(a);
for(s.evaluator=t.isDomWidgetWrapper;r=s.next();){
o.select(this.getByElement(r));
}
o.commit();
},checkWidgets:function(e){
this.fire("checkWidgets",CKEDITOR.tools.copy(e||{}));
},del:function(e){
if(this.focused===e){
var t,n=e.editor,i=n.createRange();
(t=i.moveToClosestEditablePosition(e.wrapper,!0))||(t=i.moveToClosestEditablePosition(e.wrapper,!1)),t&&n.getSelection().selectRanges([i]);
}
e.wrapper.remove(),this.destroy(e,!0);
},destroy:function(e,t){
this.widgetHoldingFocusedEditable===e&&T(this,e,null,t),e.destroy(t),delete this.instances[e.id],this.fire("instanceDestroyed",e);
},destroyAll:function(e,t){
var n,i,o=this.instances;
if(!t||e){
for(i in o){
n=o[i],this.destroy(n,e);
}
}else{
for(var a=t.find(".cke_widget_wrapper"),r=a.count(),s=0;r>s;++s){
n=this.getByElement(a.getItem(s),!0),n&&this.destroy(n);
}
}
},finalizeCreation:function(e){
var n=e.getFirst();
if(n&&t.isDomWidgetWrapper(n)){
this.editor.insertElement(n);
var i=this.getByElement(n);
i.ready=!0,i.fire("ready"),i.focus();
}
},getByElement:function(){
function e(e){
return e.is(t)&&e.data("cke-widget-id");
};
var t={div:1,span:1};
return function(t,n){
if(!t){
return null;
}
var i=e(t);
if(!n&&!i){
var o=this.editor.editable();
do{
t=t.getParent();
}while(t&&!t.equals(o)&&!(i=e(t)));
}
return this.instances[i]||null;
};
}(),initOn:function(e,n,i){
if(n?"string"==typeof n&&(n=this.registered[n]):n=this.registered[e.data("widget")],!n){
return null;
}
var o=this.wrapElement(e,n.name);
if(o){
if(o.hasClass("cke_widget_new")){
var a=new t(this,this._.nextId++,e,n,i);
return a.isInited()?(this.instances[a.id]=a,a):null;
}
return this.getByElement(e);
}
return null;
},initOnAll:function(e){
for(var n,i=(e||this.editor.editable()).find(".cke_widget_new"),o=[],a=i.count();a--;){
n=this.initOn(i.getItem(a).getFirst(t.isDomWidgetElement)),n&&o.push(n);
}
return o;
},onWidget:function(e){
var t=Array.prototype.slice.call(arguments);
t.shift();
for(var n in this.instances){
var i=this.instances[n];
i.name==e&&i.on.apply(i,t);
}
this.on("instanceCreated",function(n){
var i=n.data;
i.name==e&&i.on.apply(i,t);
});
},parseElementClasses:function(e){
if(!e){
return null;
}
e=CKEDITOR.tools.trim(e).split(/\s+/);
for(var t,n={},i=0;t=e.pop();){
-1==t.indexOf("cke_")&&(n[t]=i=1);
}
return i?n:null;
},wrapElement:function(e,t){
var n,i,o=null;
if(e instanceof CKEDITOR.dom.element){
if(n=this.registered[t||e.data("widget")],!n){
return null;
}
if(o=e.getParent(),o&&o.type==CKEDITOR.NODE_ELEMENT&&o.data("cke-widget-wrapper")){
return o;
}
e.hasAttribute("data-cke-widget-keep-attr")||e.data("cke-widget-keep-attr",e.data("widget")?1:0),t&&e.data("widget",t),i=g(n,e.getName()),o=new CKEDITOR.dom.element(i?"span":"div"),o.setAttributes(f(i)),o.data("cke-display-name",n.pathName?n.pathName:e.getName()),e.getParent(!0)&&o.replace(e),e.appendTo(o);
}else{
if(e instanceof CKEDITOR.htmlParser.element){
if(n=this.registered[t||e.attributes["data-widget"]],!n){
return null;
}
if(o=e.parent,o&&o.type==CKEDITOR.NODE_ELEMENT&&o.attributes["data-cke-widget-wrapper"]){
return o;
}
"data-cke-widget-keep-attr" in e.attributes||(e.attributes["data-cke-widget-keep-attr"]=e.attributes["data-widget"]?1:0),t&&(e.attributes["data-widget"]=t),i=g(n,e.name),o=new CKEDITOR.htmlParser.element(i?"span":"div",f(i)),o.attributes["data-cke-display-name"]=n.pathName?n.pathName:e.name;
var a,r=e.parent;
r&&(a=e.getIndex(),e.remove()),o.add(e),r&&m(r,a,o);
}
}
return o;
},_tests_createEditableFilter:c},CKEDITOR.event.implementOn(e.prototype),t.prototype={addClass:function(e){
this.element.addClass(e);
},applyStyle:function(e){
w(this,e,1);
},checkStyleActive:function(e){
var t,n=N(e);
if(!n){
return !1;
}
for(;t=n.pop();){
if(!this.hasClass(t)){
return !1;
}
}
return !0;
},destroy:function(e){
if(this.fire("destroy"),this.editables){
for(var t in this.editables){
this.destroyEditable(t,e);
}
}
e||("0"==this.element.data("cke-widget-keep-attr")&&this.element.removeAttribute("data-widget"),this.element.removeAttributes(["data-cke-widget-data","data-cke-widget-keep-attr"]),this.element.removeClass("cke_widget_element"),this.element.replace(this.wrapper)),this.wrapper=null;
},destroyEditable:function(e,t){
var n=this.editables[e];
n.removeListener("focus",L),n.removeListener("blur",A),this.editor.focusManager.remove(n),t||(this.repository.destroyAll(!1,n),n.removeClass("cke_widget_editable"),n.removeClass("cke_widget_editable_focused"),n.removeAttributes(["contenteditable","data-cke-widget-editable","data-cke-enter-mode"])),delete this.editables[e];
},edit:function(){
var e={dialog:this.dialog},t=this;
return this.fire("edit",e)!==!1&&e.dialog?(this.editor.openDialog(e.dialog,function(e){
var n,i;
t.fire("dialog",e)!==!1&&(n=e.on("show",function(){
e.setupContent(t);
}),i=e.on("ok",function(){
var n,i=t.on("data",function(e){
n=1,e.cancel();
},null,null,0);
t.editor.fire("saveSnapshot"),e.commitContent(t),i.removeListener(),n&&(t.fire("data",t.data),t.editor.fire("saveSnapshot"));
}),e.once("hide",function(){
n.removeListener(),i.removeListener();
}));
}),!0):!1;
},getClasses:function(){
return this.repository.parseElementClasses(this.element.getAttribute("class"));
},hasClass:function(e){
return this.element.hasClass(e);
},initEditable:function(e,t){
var i=this._findOneNotNested(t.selector);
return i&&i.is(CKEDITOR.dtd.$editable)?(i=new n(this.editor,i,{filter:c.call(this.repository,this.name,e,t)}),this.editables[e]=i,i.setAttributes({contenteditable:"true","data-cke-widget-editable":e,"data-cke-enter-mode":i.enterMode}),i.filter&&i.data("cke-filter",i.filter.id),i.addClass("cke_widget_editable"),i.removeClass("cke_widget_editable_focused"),t.pathName&&i.data("cke-display-name",t.pathName),this.editor.focusManager.add(i),i.on("focus",L,this),CKEDITOR.env.ie&&i.on("blur",A,this),i._.initialSetData=!0,i.setData(i.getHtml()),!0):!1;
},_findOneNotNested:function(e){
for(var n,i,o=this.wrapper.find(e),a=0;a<o.count();a++){
if(n=o.getItem(a),i=n.getAscendant(t.isDomWidgetWrapper),this.wrapper.equals(i)){
return n;
}
}
return null;
},isInited:function(){
return !(!this.wrapper||!this.inited);
},isReady:function(){
return this.isInited()&&this.ready;
},focus:function(){
var e=this.editor.getSelection();
if(e){
var t=this.editor.checkDirty();
e.fake(this.wrapper),!t&&this.editor.resetDirty();
}
this.editor.focus();
},removeClass:function(e){
this.element.removeClass(e);
},removeStyle:function(e){
w(this,e,0);
},setData:function(e,t){
var n=this.data,i=0;
if("string"==typeof e){
n[e]!==t&&(n[e]=t,i=1);
}else{
var o=e;
for(e in o){
n[e]!==o[e]&&(i=1,n[e]=o[e]);
}
}
return i&&this.dataReady&&(U(this),this.fire("data",n)),this;
},setFocused:function(e){
return this.wrapper[e?"addClass":"removeClass"]("cke_widget_focused"),this.fire(e?"focus":"blur"),this;
},setSelected:function(e){
return this.wrapper[e?"addClass":"removeClass"]("cke_widget_selected"),this.fire(e?"select":"deselect"),this;
},updateDragHandlerPosition:function(){
var e=this.editor,t=this.element.$,n=this._.dragHandlerOffset,i={x:t.offsetLeft,y:t.offsetTop-W};
if(!n||i.x!=n.x||i.y!=n.y){
var o=e.checkDirty();
e.fire("lockSnapshot"),this.dragHandlerContainer.setStyles({top:i.y+"px",left:i.x+"px",display:"block"}),e.fire("unlockSnapshot"),!o&&e.resetDirty(),this._.dragHandlerOffset=i;
}
}},CKEDITOR.event.implementOn(t.prototype),t.getNestedEditable=function(e,n){
return !n||n.equals(e)?null:t.isDomNestedEditable(n)?n:t.getNestedEditable(e,n.getParent());
},t.isDomDragHandler=function(e){
return e.type==CKEDITOR.NODE_ELEMENT&&e.hasAttribute("data-cke-widget-drag-handler");
},t.isDomDragHandlerContainer=function(e){
return e.type==CKEDITOR.NODE_ELEMENT&&e.hasClass("cke_widget_drag_handler_container");
},t.isDomNestedEditable=function(e){
return e.type==CKEDITOR.NODE_ELEMENT&&e.hasAttribute("data-cke-widget-editable");
},t.isDomWidgetElement=function(e){
return e.type==CKEDITOR.NODE_ELEMENT&&e.hasAttribute("data-widget");
},t.isDomWidgetWrapper=function(e){
return e.type==CKEDITOR.NODE_ELEMENT&&e.hasAttribute("data-cke-widget-wrapper");
},t.isParserWidgetElement=function(e){
return e.type==CKEDITOR.NODE_ELEMENT&&!!e.attributes["data-widget"];
},t.isParserWidgetWrapper=function(e){
return e.type==CKEDITOR.NODE_ELEMENT&&!!e.attributes["data-cke-widget-wrapper"];
},n.prototype=CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.dom.element.prototype),{setData:function(e){
this._.initialSetData||this.editor.widgets.destroyAll(!1,this),this._.initialSetData=!1,e=this.editor.dataProcessor.toHtml(e,{context:this.getName(),filter:this.filter,enterMode:this.enterMode}),this.setHtml(e),this.editor.widgets.initOnAll(this);
},getData:function(){
return this.editor.dataProcessor.toDataFormat(this.getHtml(),{context:this.getName(),filter:this.filter,enterMode:this.enterMode});
}});
var G=new RegExp("^(?:<(?:div|span)(?: data-cke-temp=\"1\")?(?: id=\"cke_copybin\")?(?: data-cke-temp=\"1\")?>)?(?:<(?:div|span)(?: style=\"[^\"]+\")?>)?<span [^>]*data-cke-copybin-start=\"1\"[^>]*>.?</span>([\\s\\S]+)<span [^>]*data-cke-copybin-end=\"1\"[^>]*>.?</span>(?:</(?:div|span)>)?(?:</(?:div|span)>)?$","i"),X={37:1,38:1,39:1,40:1,8:1,46:1};
!function(){
function e(){
};
function n(e,t,n){
if(!n){
return !1;
}
if(!this.checkElement(e)){
return !1;
}
var i=n.widgets.getByElement(e,!0);
return i&&i.checkStyleActive(this);
};
CKEDITOR.style.addCustomHandler({type:"widget",setup:function(e){
this.widget=e.widget;
},apply:function(e){
e instanceof CKEDITOR.editor&&this.checkApplicable(e.elementPath(),e)&&e.widgets.focused.applyStyle(this);
},remove:function(e){
e instanceof CKEDITOR.editor&&this.checkApplicable(e.elementPath(),e)&&e.widgets.focused.removeStyle(this);
},checkActive:function(e,t){
return this.checkElementMatch(e.lastElement,0,t);
},checkApplicable:function(e,t){
return t instanceof CKEDITOR.editor?this.checkElement(e.lastElement):!1;
},checkElementMatch:n,checkElementRemovable:n,checkElement:function(e){
if(!t.isDomWidgetWrapper(e)){
return !1;
}
var n=e.getFirst(t.isDomWidgetElement);
return n&&n.data("widget")==this.widget;
},buildPreview:function(e){
return e||this._.definition.name;
},toAllowedContentRules:function(e){
if(!e){
return null;
}
var t,n=e.widgets.registered[this.widget],i={};
return n?n.styleableElements?(t=this.getClassesArray())?(i[n.styleableElements]={classes:t,propertiesOnly:!0},i):null:n.styleToAllowedContentRules?n.styleToAllowedContentRules(this):null:null;
},getClassesArray:function(){
var e=this._.definition.attributes&&this._.definition.attributes["class"];
return e?CKEDITOR.tools.trim(e).split(/\s+/):null;
},applyToRange:e,removeFromRange:e,applyToObject:e});
}(),CKEDITOR.plugins.widget=t,t.repository=e,t.nestedEditable=n;
}(),CKEDITOR.plugins.add("notification",{requires:"toolbar",init:function(e){
function n(e){
var t=new CKEDITOR.dom.element("div");
t.setStyles({position:"fixed","margin-left":"-9999px"}),t.setAttributes({"aria-live":"assertive","aria-atomic":"true"}),t.setText(e),CKEDITOR.document.getBody().append(t),setTimeout(function(){
t.remove();
},100);
};
e._.notificationArea=new t(e),e.showNotification=function(t,n,i){
var o,a;
"progress"==n?o=i:a=i;
var r=new CKEDITOR.plugins.notification(e,{message:t,type:n,progress:o,duration:a});
return r.show(),r;
},e.on("key",function(t){
if(27==t.data.keyCode){
var i=e._.notificationArea.notifications;
if(!i.length){
return;
}
n(e.lang.notification.closed),i[i.length-1].hide(),t.cancel();
}
});
}}),e.prototype={show:function(){
this.editor.fire("notificationShow",{notification:this})!==!1&&(this.area.add(this),this._hideAfterTimeout());
},update:function(e){
var t=!0;
this.editor.fire("notificationUpdate",{notification:this,options:e})===!1&&(t=!1);
var n=this.element,i=n.findOne(".cke_notification_message"),o=n.findOne(".cke_notification_progress"),a=e.type;
n.removeAttribute("role"),e.progress&&"progress"!=this.type&&(a="progress"),a&&(n.removeClass(this._getClass()),n.removeAttribute("aria-label"),this.type=a,n.addClass(this._getClass()),n.setAttribute("aria-label",this.type),"progress"!=this.type||o?"progress"!=this.type&&o&&o.remove():(o=this._createProgressElement(),o.insertBefore(i))),void 0!==e.message&&(this.message=e.message,i.setHtml(this.message)),void 0!==e.progress&&(this.progress=e.progress,o&&o.setStyle("width",this._getPercentageProgress())),t&&e.important&&(n.setAttribute("role","alert"),this.isVisible()||this.area.add(this)),this.duration=e.duration,this._hideAfterTimeout();
},hide:function(){
this.editor.fire("notificationHide",{notification:this})!==!1&&this.area.remove(this);
},isVisible:function(){
return CKEDITOR.tools.indexOf(this.area.notifications,this)>=0;
},_createElement:function(){
var e,t,n,i=this,o=this.editor.lang.common.close;
return e=new CKEDITOR.dom.element("div"),e.addClass("cke_notification"),e.addClass(this._getClass()),e.setAttributes({id:this.id,role:"alert","aria-label":this.type}),"progress"==this.type&&e.append(this._createProgressElement()),t=new CKEDITOR.dom.element("p"),t.addClass("cke_notification_message"),t.setHtml(this.message),e.append(t),n=CKEDITOR.dom.element.createFromHtml("<a class=\"cke_notification_close\" href=\"javascript:void(0)\" title=\""+o+"\" role=\"button\" tabindex=\"-1\"><span class=\"cke_label\">X</span></a>"),e.append(n),n.on("click",function(){
i.editor.focus(),i.hide();
}),e;
},_getClass:function(){
return "progress"==this.type?"cke_notification_info":"cke_notification_"+this.type;
},_createProgressElement:function(){
var e=new CKEDITOR.dom.element("span");
return e.addClass("cke_notification_progress"),e.setStyle("width",this._getPercentageProgress()),e;
},_getPercentageProgress:function(){
return Math.round(100*(this.progress||0))+"%";
},_hideAfterTimeout:function(){
var e,t=this;
this._hideTimeoutId&&clearTimeout(this._hideTimeoutId),"number"==typeof this.duration?e=this.duration:("info"==this.type||"success"==this.type)&&(e="number"==typeof this.editor.config.notification_duration?this.editor.config.notification_duration:5000),e&&(t._hideTimeoutId=setTimeout(function(){
t.hide();
},e));
}},t.prototype={add:function(e){
this.notifications.push(e),this.element.append(e.element),1==this.element.getChildCount()&&(CKEDITOR.document.getBody().append(this.element),this._attachListeners()),this._layout();
},remove:function(e){
var t=CKEDITOR.tools.indexOf(this.notifications,e);
0>t||(this.notifications.splice(t,1),e.element.remove(),this.element.getChildCount()||(this._removeListeners(),this.element.remove()));
},_createElement:function(){
var e=this.editor,t=e.config,n=new CKEDITOR.dom.element("div");
return n.addClass("cke_notifications_area"),n.setAttribute("id","cke_notifications_area_"+e.name),n.setStyle("z-index",t.baseFloatZIndex-2),n;
},_attachListeners:function(){
var e=CKEDITOR.document.getWindow(),t=this.editor;
e.on("scroll",this._uiBuffer.input),e.on("resize",this._uiBuffer.input),t.on("change",this._changeBuffer.input),t.on("floatingSpaceLayout",this._layout,this,null,20),t.on("blur",this._layout,this,null,20);
},_removeListeners:function(){
var e=CKEDITOR.document.getWindow(),t=this.editor;
e.removeListener("scroll",this._uiBuffer.input),e.removeListener("resize",this._uiBuffer.input),t.removeListener("change",this._changeBuffer.input),t.removeListener("floatingSpaceLayout",this._layout),t.removeListener("blur",this._layout);
},_layout:function(){
function e(){
c.setStyles({position:"absolute",top:b(f.y)});
};
function t(){
c.setStyles({position:"fixed",top:b(g.bottom)});
};
function n(){
c.setStyles({position:"fixed",top:0});
};
function i(){
c.setStyles({position:"absolute",top:b(f.y+h.height-p.height)});
};
function o(){
c.setStyle("left",b(R));
};
function a(){
c.setStyle("left",b(R-f.x+v.x));
};
function r(){
c.setStyle("left",b(R+h.width/2-E/2-T/2));
};
function s(){
c.setStyle("left",b(R+h.width-E-T));
};
function l(){
c.setStyle("left",b(R-f.x+v.x+I.width-E-T));
};
var d,c=this.element,u=this.editor,h=u.ui.contentsElement.getClientRect(),f=u.ui.contentsElement.getDocumentPosition(),m=u.ui.space("top"),g=m.getClientRect(),p=c.getClientRect(),E=this._notificationWidth,T=this._notificationMargin,C=CKEDITOR.document.getWindow(),v=C.getScrollPosition(),I=C.getViewPaneSize(),O=CKEDITOR.document.getBody(),D=O.getDocumentPosition(),b=CKEDITOR.tools.cssLength;
E&&T||(d=this.element.getChild(0),E=this._notificationWidth=d.getClientRect().width,T=this._notificationMargin=parseInt(d.getComputedStyle("margin-left"),10)+parseInt(d.getComputedStyle("margin-right"),10)),m.isVisible()&&g.bottom>h.top&&g.bottom<h.bottom-p.height?t():h.top>0?e():f.y+h.height-p.height>v.y?n():i();
var R="fixed"==c.getStyle("position")?h.left:"static"!=O.getComputedStyle("position")?f.x-D.x:f.x;
h.width<E+T?f.x+E+T>v.x+I.width?s():o():f.x+E+T>v.x+I.width?o():f.x+h.width/2+E/2+T>v.x+I.width?l():h.left+h.width-E-T<0?s():h.left+h.width/2-E/2<0?a():r();
}},CKEDITOR.plugins.notification=e,function(){
"use strict";
function e(e,t,n){
this.editor=e,this.notification=null,this._message=new CKEDITOR.template(t),this._singularMessage=n?new CKEDITOR.template(n):null,this._tasks=[],this._totalWeights=0,this._doneWeights=0,this._doneTasks=0;
};
function t(e){
this._weight=e||1,this._doneWeight=0,this._isCanceled=!1;
};
CKEDITOR.plugins.add("notificationaggregator",{requires:"notification"}),e.prototype={createTask:function(e){
e=e||{};
var t,n=!this.notification;
return n&&(this.notification=this._createNotification()),t=this._addTask(e),t.on("updated",this._onTaskUpdate,this),t.on("done",this._onTaskDone,this),t.on("canceled",function(){
this._removeTask(t);
},this),this.update(),n&&this.notification.show(),t;
},update:function(){
this._updateNotification(),this.isFinished()&&this.fire("finished");
},getPercentage:function(){
return 0===this.getTaskCount()?1:this._doneWeights/this._totalWeights;
},isFinished:function(){
return this.getDoneTaskCount()===this.getTaskCount();
},getTaskCount:function(){
return this._tasks.length;
},getDoneTaskCount:function(){
return this._doneTasks;
},_updateNotification:function(){
this.notification.update({message:this._getNotificationMessage(),progress:this.getPercentage()});
},_getNotificationMessage:function(){
var e,t=this.getTaskCount(),n=this.getDoneTaskCount(),i={current:n,max:t,percentage:Math.round(100*this.getPercentage())};
return e=1==t&&this._singularMessage?this._singularMessage:this._message,e.output(i);
},_createNotification:function(){
return new CKEDITOR.plugins.notification(this.editor,{type:"progress"});
},_addTask:function(e){
var n=new t(e.weight);
return this._tasks.push(n),this._totalWeights+=n._weight,n;
},_removeTask:function(e){
var t=CKEDITOR.tools.indexOf(this._tasks,e);
-1!==t&&(e._doneWeight&&(this._doneWeights-=e._doneWeight),this._totalWeights-=e._weight,this._tasks.splice(t,1),this.update());
},_onTaskUpdate:function(e){
this._doneWeights+=e.data,this.update();
},_onTaskDone:function(){
this._doneTasks+=1,this.update();
}},CKEDITOR.event.implementOn(e.prototype),t.prototype={done:function(){
this.update(this._weight);
},update:function(e){
if(!this.isDone()&&!this.isCanceled()){
var t=Math.min(this._weight,e),n=t-this._doneWeight;
this._doneWeight=t,this.fire("updated",n),this.isDone()&&this.fire("done");
}
},cancel:function(){
this.isDone()||this.isCanceled()||(this._isCanceled=!0,this.fire("canceled"));
},isDone:function(){
return this._weight===this._doneWeight;
},isCanceled:function(){
return this._isCanceled;
}},CKEDITOR.event.implementOn(t.prototype),CKEDITOR.plugins.notificationAggregator=e,CKEDITOR.plugins.notificationAggregator.task=t;
}(),function(){
"use strict";
function e(e){
var n,i=e.lang.embedbase;
return {mask:!0,template:"<div></div>",pathName:i.pathName,_cache:{},urlRegExp:/^((https?:)?\/\/|www\.)/i,init:function(){
this.on("sendRequest",function(e){
this._sendRequest(e.data);
},this,null,999),this.on("dialog",function(e){
e.data.widget=this;
},this),this.on("handleResponse",function(e){
if(!e.data.html){
var t=this._responseToHtml(e.data.url,e.data.response);
null!==t?e.data.html=t:(e.data.errorMessage="unsupportedUrl",e.cancel());
}
},this,null,999);
},loadContent:function(e,t){
function n(n){
return a.response=n,i.editor.widgets.instances[i.id]?void (i._handleResponse(a)&&(i._cacheResponse(e,n),t.callback&&t.callback())):(CKEDITOR.warn("embedbase-widget-invalid"),void (a.task&&a.task.done()));
};
t=t||{};
var i=this,o=this._getCachedResponse(e),a={noNotifications:t.noNotifications,url:e,callback:n,errorCallback:function(e){
i._handleError(a,e),t.errorCallback&&t.errorCallback(e);
}};
return o?void setTimeout(function(){
n(o);
}):(t.noNotifications||(a.task=this._createTask()),this.fire("sendRequest",a),a);
},isUrlValid:function(e){
return this.urlRegExp.test(e)&&this.fire("validateUrl",e)!==!1;
},getErrorMessage:function(t,n,i){
var o=e.lang.embedbase[t+(i||"")];
return o||(o=t),new CKEDITOR.template(o).output({url:n||""});
},_sendRequest:function(e){
var n=this,i=t.sendRequest(this.providerUrl,{url:encodeURIComponent(e.url)},e.callback,function(){
e.errorCallback("fetchingFailed");
});
e.cancel=function(){
i.cancel(),n.fire("requestCanceled",e);
};
},_handleResponse:function(e){
var t={url:e.url,html:"",response:e.response};
return this.fire("handleResponse",t)!==!1?(e.task&&e.task.done(),this._setContent(e.url,t.html),!0):(e.errorCallback(t.errorMessage),!1);
},_handleError:function(t,n){
t.task&&(t.task.cancel(),t.noNotifications||e.showNotification(this.getErrorMessage(n,t.url),"warning"));
},_responseToHtml:function(e,t){
return "photo"==t.type?"<img src=\""+CKEDITOR.tools.htmlEncodeAttr(t.url)+"\" alt=\""+CKEDITOR.tools.htmlEncodeAttr(t.title||"")+"\" style=\"max-width:100%;height:auto\" />":"video"==t.type||"rich"==t.type?(t.html=t.html.replace(/<iframe/g,"<iframe tabindex=\"-1\""),t.html):null;
},_setContent:function(e,t){
this.setData("url",e),this.element.setHtml(t);
},_createTask:function(){
return (!n||n.isFinished())&&(n=new CKEDITOR.plugins.notificationAggregator(e,i.fetchingMany,i.fetchingOne),n.on("finished",function(){
n.notification.hide();
})),n.createTask();
},_cacheResponse:function(e,t){
this._cache[e]=t;
},_getCachedResponse:function(e){
return this._cache[e];
}};
};
CKEDITOR.plugins.add("embedbase",{requires:"widget,notificationaggregator",onLoad:function(){
CKEDITOR._.jsonpCallbacks={};
},init:function(){
CKEDITOR.dialog.add("embedBase",this.path+"dialogs/embedbase.js");
}});
var t={_attachScript:function(e,t){
var n=new CKEDITOR.dom.element("script");
return n.setAttribute("src",e),n.on("error",t),CKEDITOR.document.getBody().append(n),n;
},sendRequest:function(e,t,n,i){
function o(){
r&&(r.remove(),delete CKEDITOR._.jsonpCallbacks[s],r=null);
};
var a={};
t=t||{};
var r,s=CKEDITOR.tools.getNextNumber();
return t.callback="CKEDITOR._.jsonpCallbacks["+s+"]",CKEDITOR._.jsonpCallbacks[s]=function(e){
setTimeout(function(){
o(),n(e);
});
},r=this._attachScript(e.output(t),function(){
o(),i&&i();
}),a.cancel=o,a;
}};
CKEDITOR.plugins.embedBase={createWidgetBaseDefinition:e,_jsonp:t};
}(),function(){
"use strict";
CKEDITOR.plugins.add("embed",{requires:"embedbase",init:function(e){
var t=CKEDITOR.plugins.embedBase.createWidgetBaseDefinition(e);
CKEDITOR.tools.extend(t,{dialog:"embedBase",button:e.lang.embedbase.button,allowedContent:"div[!data-oembed-url]",requiredContent:"div[data-oembed-url]",providerUrl:new CKEDITOR.template(e.config.embed_provider||"//ckeditor.iframe.ly/api/oembed?url={url}&callback={callback}"),styleToAllowedContentRules:function(e){
var t=e.getClassesArray();
return {div:{propertiesOnly:!0,classes:t,attributes:"!data-oembed-url"}};
},upcast:function(e,t){
var n=new CKEDITOR.htmlParser.filter({elements:{iframe:function(e){
"undefined"==typeof e.attributes.tabindex&&(e.attributes.tabindex="-1");
}}});
return "div"==e.name&&e.attributes["data-oembed-url"]?(t.url=e.attributes["data-oembed-url"],e.filterChildren(n),!0):void 0;
},downcast:function(e){
var t=new CKEDITOR.htmlParser.filter({elements:{iframe:function(e){
-1==e.attributes.tabindex&&delete e.attributes.tabindex;
}}});
e.attributes["data-oembed-url"]=this.data.url,e.filterChildren(t);
}},!0),e.widgets.add("embed",t),e.filter.addElementCallback(function(e){
return "data-oembed-url" in e.attributes?CKEDITOR.FILTER_SKIP_TREE:void 0;
});
}});
}(),function(){
function e(e,t){
function n(){
e.widgets.finalizeCreation(c);
};
var i=e.editable().findOne("a[data-cke-autoembed=\""+t+"\"]");
if(i&&i.data("cke-saved-href")){
var o=i.data("cke-saved-href"),a=e.widgets.registered.embed;
if(!a){
return void CKEDITOR.warn("autoembed-no-widget-def");
}
var r,s="function"==typeof a.defaults?a.defaults():a.defaults,l=CKEDITOR.dom.element.createFromHtml(a.template.output(s)),d=e.widgets.wrapElement(l,a.name),c=new CKEDITOR.dom.documentFragment(d.getDocument());
c.append(d),r=e.widgets.initOn(l,a);
var u=e.document.createElement("div");
return u.setAttribute("class","jaws-notification-text"),u.setAttribute("aria-live","assertive"),u.setStyle("position","absolute"),u.setStyle("clip","rect(1px, 1px, 1px, 1px)"),r.wrapper.append(u),r?void r.loadContent(o,{noNotifications:!0,callback:function(){
var e=r.editor,i=e.editable().findOne("a[data-cke-autoembed=\""+t+"\"]");
if(i){
var o=e.getSelection(),a=e.createRange(),s=e.editable();
e.fire("saveSnapshot"),e.fire("lockSnapshot",{dontUpdate:!0});
var l=o.createBookmarks(!1)[0],c=l.startNode,u=l.endNode||c;
CKEDITOR.env.ie&&CKEDITOR.env.version<9&&!l.endNode&&c.equals(i.getNext())&&i.append(c),a.setStartBefore(i),a.setEndAfter(i),s.insertElement(d,a),s.contains(c)&&s.contains(u)?o.selectBookmarks([l]):(c.remove(),u.remove()),e.fire("unlockSnapshot"),setTimeout(function(){
r.editor.fire("lockSnapshot");
for(var e=r.wrapper.getChildren(),t=0;t<e.count();t++){
if("jaws-notification-text"==e.getItem(t).getAttribute("class")){
e.getItem(t).setText(r.editor.lang.ibmpastemedialink.widgetNotification),setTimeout(function(){
r.editor.fire("lockSnapshot"),e.getItem(t).remove(),r.editor.fire("unlockSnapshot");
},1000);
break;
}
}
r.editor.config.ibmBasicEditor||r.editor.config.ibmPasteMediaLinkDefaultWidth?r.element.setAttribute("style",r.editor.config.ibmPasteMediaLinkDefaultWidth?"width:"+r.editor.config.ibmPasteMediaLinkDefaultWidth+";":"width:300px;"):r.element.setAttribute("style","width:100%;"),r.editor.fire("unlockSnapshot");
},500);
}
n(),r.fire("ready");
},errorCallback:function(){
e.widgets.destroy(r,!0);
}}):void n();
}
};
CKEDITOR.plugins.add("ibmpastemedialink",{requires:"embed,undo",icons:"ibmpastemedialink",init:function(t){
var n,i=t.config.ibmPasteMediaLink.allowed_domains?t.config.ibmPasteMediaLink.allowed_domains:"",o="(^|\\s|>|&nbsp;*)(((https?|ftps?|news|mailto|notes):|www\\.|w3\\.)([\\w/\\#~:.?+=%@!\\[\\]\\-{},\\$\\*\\(\\);'\"]|(?:&|&amp;))+?)(?=[.:?\\),;!\\]'\"]*(?:[^\\w/\\#~:.?+=&%@!\\[\\]\\-{},\\$\\*\\(\\);'\"]|&nbsp;|$))",a="(<a(.*?)>)",r=new RegExp(a,"i"),s=new RegExp(o,"gi"),l=1,d=0,c=0;
t.on("paste",function(e){
if(e.data.dataTransfer.getTransferType(t)==CKEDITOR.DATA_TRANSFER_INTERNAL){
return void (n=0);
}
s.lastIndex=0;
var o=s.exec(e.data.dataValue),a="";
o&&(a=o[2]?o[2].replace("http://","").replace("https://","").replace("www.","").split(/[/?#]/)[0].split("\"")[0]:""),a&&-1!=i.indexOf(a)&&(r.lastIndex=0,n=r.exec(e.data.dataValue),n&&(d=n.index+n[1].length,c=n.index+n[0].length),n&&(e.data.dataValue=e.data.dataValue.substring(0,n.index)+"<a data-cke-autoembed=\""+ ++l+"\""+e.data.dataValue.substring(n.index+2)));
},null,null,20),t.on("afterPaste",function(){
n&&e(t,l);
});
}});
}(),function(){
var e=15;
CKEDITOR.plugins.add("ibmwidgets",{requires:"widget",init:function(t){
function n(e){
var t=e.data.align?e.data.align:e.hasClass("center")?"center":e.hasClass("left")?"left":e.hasClass("right")?"right":null,n="width:"+e.element.$.offsetWidth+"px; height:"+e.element.$.offsetHeight+"px;";
t&&("center"==t?n+="margin-right: auto; margin-left:auto;":n=n+"float:"+t+";"),e.wrapper.$.setAttribute("style",n);
};
t.contextMenu&&(t.addMenuGroup("widgetGroup"),t.addMenuItem("widgetItem",{label:t.lang.ibmwidgets.properties,icon:"ibmwidgets",command:"embed",group:"widgetGroup"}),t.contextMenu.addListener(function(e){
return e.getAscendant("div",!0)?{widgetItem:CKEDITOR.TRISTATE_OFF}:void 0;
}));
var i,o=[];
t.on("focus",function(e){
if(!t.widgets.ariaFocused&&0!=o.length){
for(var n in o){
o[n].innerHTML=i;
}
o=[];
}
}),t.widgets.on("instanceCreated",function(i){
var o=i.data;
o.on("ready",function(i){
if(t.config.ibmDisableDraggableWidgets){
var a=new CKEDITOR.dom.element("span",t.document);
if(CKEDITOR.env.hc){
a.setAttributes({"class":"cke_reset cke_widget_drag_handler_notifier cke_widget_drag_handler_container"}),a.setText(t.lang.ibmwidgets.properties);
}else{
var r=new CKEDITOR.dom.element("link");
r.setAttribute("type","text/css"),!t.config.ibmEnableSvgIcons||CKEDITOR.env.ie&&CKEDITOR.env.version<9||"ibmdesign"!=t.config.skin?r.setAttribute("href",CKEDITOR.getUrl("skins/"+t.config.skin+"/editor.css")):r.setAttribute("href",CKEDITOR.getUrl("skins/"+t.config.skin+"/icons/svg/icons.css")),r.setAttribute("rel","stylesheet"),r.setAttribute("id","svg-icons-css"),t.document.getHead().append(r),a.setAttributes({"class":"cke_reset cke_widget_drag_handler_container cke_button_icon cke_button__ibmwidgetsproperties_icon",style:"background:rgba(220,220,220,0.5);display: block;top: -15px;cursor : pointer"});
var s=new CKEDITOR.dom.element("img",t.document);
s.setAttributes({"class":"cke_reset cke_widget_properties_handler",src:CKEDITOR.tools.transparentImageData,width:e,title:t.lang.ibmwidgets.properties,height:e}),a.append(s);
}
o.wrapper.append(a);
}
for(var l=o.wrapper.getElementsByTag("img"),d=l.count(),c=0,u=0;d>u;u++){
var h=l.getItem(c);
h.hasClass("cke_widget_mask")?n(o):c++;
}
});
}),t.config.ibmDisableDraggableWidgets&&t.on("widgetDefinition",function(e){
e.data.draggable=!1;
});
}});
}(),function(){
CKEDITOR.plugins.add("xml",{}),CKEDITOR.xml=function(e){
var t=null;
if("object"==typeof e){
t=e;
}else{
var n=(e||"").replace(/&nbsp;/g,"\xa0");
if("ActiveXObject" in window){
try{
t=new ActiveXObject("MSXML2.DOMDocument");
}
catch(i){
try{
t=new ActiveXObject("Microsoft.XmlDom");
}
catch(o){
}
}
t&&(t.async=!1,t.resolveExternals=!1,t.validateOnParse=!1,t.loadXML(n));
}else{
window.DOMParser&&(t=(new DOMParser).parseFromString(n,"text/xml"));
}
}
this.baseXml=t;
},CKEDITOR.xml.prototype={selectSingleNode:function(e,t){
var n=this.baseXml;
if(t||(t=n)){
if("selectSingleNode" in t){
return t.selectSingleNode(e);
}
if(n.evaluate){
var i=n.evaluate(e,t,null,9,null);
return i&&i.singleNodeValue||null;
}
}
return null;
},selectNodes:function(e,t){
var n=this.baseXml,i=[];
if(t||(t=n)){
if("selectNodes" in t){
return t.selectNodes(e);
}
if(n.evaluate){
var o=n.evaluate(e,t,null,5,null);
if(o){
for(var a;a=o.iterateNext();){
i.push(a);
}
}
}
}
return i;
},getInnerXml:function(e,t){
var n=this.selectSingleNode(e,t),i=[];
if(n){
for(n=n.firstChild;n;){
n.xml?i.push(n.xml):window.XMLSerializer&&i.push((new XMLSerializer).serializeToString(n)),n=n.nextSibling;
}
}
return i.length?i.join(""):null;
}};
}(),function(){
CKEDITOR.plugins.add("ajax",{requires:"xml"}),CKEDITOR.ajax=function(){
function e(){
if(!CKEDITOR.env.ie||"file:"!=location.protocol){
try{
return new XMLHttpRequest;
}
catch(e){
}
}
try{
return new ActiveXObject("Msxml2.XMLHTTP");
}
catch(e){
}
try{
return new ActiveXObject("Microsoft.XMLHTTP");
}
catch(e){
}
return null;
};
function t(e){
return 4==e.readyState&&(e.status>=200&&e.status<300||304==e.status||0===e.status||1223==e.status);
};
function n(e){
return t(e)?e.responseText:null;
};
function i(e){
if(t(e)){
var n=e.responseXML;
return new CKEDITOR.xml(n&&n.firstChild?n:e.responseText);
}
return null;
};
function o(t,n,i){
var o=!!n,a=e();
return a?(a.open("GET",t,o),o&&(a.onreadystatechange=function(){
4==a.readyState&&(n(i(a)),a=null);
}),a.send(null),o?"":i(a)):null;
};
function a(t,n,i,o,a){
var r=e();
return r?(r.open("POST",t,!0),r.onreadystatechange=function(){
4==r.readyState&&(o(a(r)),r=null);
},r.setRequestHeader("Content-type",i||"application/x-www-form-urlencoded; charset=UTF-8"),void r.send(n)):null;
};
return {load:function(e,t){
return o(e,t,n);
},post:function(e,t,i,o){
return a(e,t,i,o,n);
},loadXml:function(e,t){
return o(e,t,i);
}};
}();
}(),function(){
CKEDITOR.plugins.add("ibmajax",{}),CKEDITOR.ibmajax=function(){
var e=function(){
if(!CKEDITOR.env.ie||"file:"!=location.protocol){
try{
return new XMLHttpRequest;
}
catch(e){
}
}
try{
return new ActiveXObject("Msxml2.XMLHTTP");
}
catch(e){
}
try{
return new ActiveXObject("Microsoft.XMLHTTP");
}
catch(e){
}
return null;
},t=function(e){
return e&&"undefined"!=typeof e&&4==e.readyState?e.responseText:null;
},n=function(t,n,i,o){
var a=!!i,r=e();
return r?(r.open("POST",t,a),r.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),a&&(r.onreadystatechange=function(){
4==r.readyState&&(i(o(r)),r=null);
}),r.send(n),a?"":o(r)):null;
};
return {post:function(e,i,o){
return n(e,i,o,t);
}};
}();
}(),function(){
CKEDITOR.plugins.add("ibmspellchecker",{lang:"ar,ca,cs,da,de,el,en,es,fi,fr,he,hr,hu,it,iw,ja,kk,ko,nb,nl,no,pl,pt,pt-br,ro,ru,sk,sl,sv,th,tr,uk,zh,zh-cn,zh-tw",requires:["ajax","ibmajax","dialog"],init:function(e){
e.addCommand("ibmspellchecker",new CKEDITOR.dialogCommand("ibmspellchecker")),e.ui.addButton("IbmSpellChecker",{label:e.lang.ibmspellchecker.title,command:"ibmspellchecker",toolbar:"editing,50",modes:{source:0,wysiwyg:1}}),CKEDITOR.dialog.add("ibmspellchecker",this.path+"dialogs/ibmspellchecker.js");
}});
}(),CKEDITOR.plugins.add("ibmstatusmessage",{lang:"ar,ca,cs,da,de,el,en,es,fi,fr,he,hr,hu,it,iw,ja,kk,ko,nb,nl,no,pl,pt,pt-br,ro,ru,sk,sl,sv,th,tr,uk,zh,zh-cn,zh-tw",init:function(e){
if(e.lang.ibmstatusmessage){
var t=CKEDITOR.config.status_messages;
if(t&&0!==t.length){
for(var n,i="cke_status_"+e.name,o=function(){
return n||(n=CKEDITOR.document.getById(i)),n;
},a=function(e){
var t=e.listenerData;
if(t&&(!t.display||t.display(e.data))){
var n=o();
n&&n.setHtml(t.html);
}
},r=function(e){
var t=o();
t&&t.getHtml()===e.listenerData.html&&t.setHtml("");
},s=function(t,n){
var i=e.lang.ibmstatusmessage[n];
if(CKEDITOR.tools.isArray(t)){
for(var o=t.length;o--;){
e.on(t[o],a,null,{html:i});
}
}else{
var r;
for(var s in t){
r={html:i},"function"==typeof t[s]&&(r.display=t[s]),e.on(s,a,null,r);
}
}
},l=function(t,n){
for(var i=e.lang.ibmstatusmessage[n],o=t.length;o--;){
e.on(c.hide[o],r,null,{html:i});
}
},d=t.length;d--;){
var c=t[d];
e.lang.ibmstatusmessage[c.langStr];
c.display&&s(c.display,c.langStr),c.hide&&l(c.hide,c.langStr);
}
e.on("uiSpace",function(t){
var n=t.data,o="<div id=\""+i+"\" class=\"cke_status_message\"></div>";
if("top"===n.space&&e.elementMode==CKEDITOR.ELEMENT_MODE_INLINE){
var a=CKEDITOR.env.ie||CKEDITOR.env.opera?"cke_status_container_inline":"cke_status_container";
n.html+="<br/><br/><div class=\"cke_reset_all "+a+"\">"+o+"</div>";
}else{
"bottom"===n.space&&(n.html=n.html.replace(/(.*)(<div class="cke_resizer".*?<\/div>)?(?=.*)/,"$1<div class=\"cke_status_container\">"+o+"$2</div>"));
}
},e,null,150);
}
}
}}),CKEDITOR.config.status_messages=[{langStr:"keystrokeForHelp",display:["instanceReady","focus"],hide:["blur"]}],function(){
function e(e,n){
var i=e[0],o=r(e,1),a=r(e),s=n?o:a;
d=i.getAscendant("table");
var l=CKEDITOR.tools.buildTableMap(d);
return t(l,s);
};
function t(e,t){
for(var n=-1,i=0;i<e.length;i++){
if(e[i][t]){
n=i;
break;
}
}
if(-1!=n){
var o=new CKEDITOR.dom.element(e[n][t]),a=o.getStyle("width")?o.getStyle("width"):o.getAttribute("width");
if(a){
if(v.exec(a)){
return;
}
C.exec(a)&&(a+="px");
}else{
a="0px";
}
for(var r,s,l=T.exec(a),d=l[1],c=l[2],u=d,h=c,f=n+1;f<e.length;f++){
var m=e[f][t]?new CKEDITOR.dom.element(e[f][t]):null;
if(m){
var g=m.getStyle("width")?m.getStyle("width"):m.getAttribute("width");
if(g){
if(v.exec(g)){
return;
}
C.exec(g)&&(g+="px"),l=T.exec(g),r=l[1],s=l[2],s!=h&&("px"!=s&&(r=CKEDITOR.tools.convertToPx(g)),"px"!=h&&(u=CKEDITOR.tools.convertToPx(u+h),h="px")),r>u&&(u=r);
}
}
}
return u+h;
}
};
function n(e){
var n=e[0],i=e[e.length-1];
d=n.getAscendant("table");
for(var o,a,r=CKEDITOR.tools.buildTableMap(d),s=0,l=r.length;l>s;s++){
for(var c=0,u=r[s].length;u>c;c++){
r[s][c]==n.$&&(o=c),r[s][c]==i.$&&(a=c);
}
}
var h,f=0;
for(s=o;a>=s;s++){
if(h=0,h=t(r,s),!h){
return;
}
f+=parseFloat(h);
}
var m=T.exec(h),g=m[2];
return f+g;
};
function i(e,t,n){
var i=T.exec(e),a=i[1],r=i[2],s=d.getStyle("width")?d.getStyle("width"):d.getAttribute("width");
if(v.exec(s)){
return s;
}
if(C.exec(s)&&(s+="px"),i=T.exec(s),!i){
return s;
}
var l,c=i[1],u=i[2];
if(r!=u&&("px"!=r&&(a=CKEDITOR.tools.convertToPx(e)),"px"!=u)){
c=CKEDITOR.tools.convertToPx(s);
var h=u;
u="px";
}
return c=parseFloat(c),a=parseFloat(a),l=n?c>a?c-a:c:c+a*t,h&&(l=o(l,h),u=h),l+u;
};
function o(e,t){
var n;
switch(t){
case "in":
n=e*u;
break;
case "cm":
n=e*h;
break;
case "mm":
n=e*f;
break;
case "em":
n=e*m;
break;
case "ex":
n=e*g;
break;
case "pt":
n=e*p;
break;
case "pc":
n=e*E;
}
return Math.round(n*Math.pow(10,2))/Math.pow(10,2);
};
function a(e,t){
for(var n=e.getParent(),i=n.$.cells,o=0,a=0;a<i.length;a++){
var r=i[a];
if(o+=t?1:r.colSpan,r==e.$){
break;
}
}
return o-1;
};
function r(e,t){
for(var n=t?1/0:0,i=0;i<e.length;i++){
var o=a(e[i],t);
(t?n>o:o>n)&&(n=o);
}
return n;
};
function s(e,t,n){
for(var i=CKEDITOR.plugins.tabletools.getSelectedCells(e),o=i[0],a=o.getAscendant("table"),r=o.getDocument(),s=i[0].getParent(),l=s.$.rowIndex,d=i[i.length-1],c=d.getParent().$.rowIndex+d.$.rowSpan-1,u=new CKEDITOR.dom.element(a.$.rows[c]),h=t?l:c,f=t?s:u,m=CKEDITOR.tools.buildTableMap(a),g=m[h],p=t?m[h-1]:m[h+1],E=m[0].length,T=0;n>T;T++){
for(var C=r.createElement("tr"),v=0;g[v]&&E>v;v++){
var I;
g[v].rowSpan>1&&p&&g[v]==p[v]?(I=g[v],I.rowSpan+=1):(I=new CKEDITOR.dom.element(g[v]).clone(),I.removeAttribute("rowSpan"),I.appendBogus(),C.append(I),I=I.$),v+=I.colSpan-1;
}
t?C.insertBefore(f):C.insertAfter(f);
}
};
function l(e,t,n){
for(var i=CKEDITOR.plugins.tabletools.getSelectedCells(e),o=i[0],a=o.getAscendant("table"),s=r(i,1),l=r(i),d=t?s:l,c=CKEDITOR.tools.buildTableMap(a),u=[],h=[],f=c.length,m=0;f>m;m++){
u.push(c[m][d]);
var g=t?c[m][d-1]:c[m][d+1];
g&&h.push(g);
}
for(var p=0;n>p;p++){
for(m=0;f>m;m++){
var E;
void 0!=u[m]&&(u[m].colSpan>1&&h.length&&h[m]==u[m]?(E=u[m],E.colSpan+=1):(E=new CKEDITOR.dom.element(u[m]).clone(),E.removeAttribute("colSpan"),!CKEDITOR.env.ie&&E.appendBogus(),E[t?"insertBefore":"insertAfter"].call(E,new CKEDITOR.dom.element(u[m])),E=E.$),m+=E.rowSpan-1);
}
}
};
var d,c,u,h,f,m,g,p,E,T=/^(\d+(?:\.\d+)?)(px|in|cm|mm|em|ex|pt|pc)$/,C=/^(\d+(?:\.\d+)?)$/,v=/^(\d+(?:\.\d+)?)%$/;
CKEDITOR.plugins.add("ibmtabletools",{lang:"ar,ca,cs,da,de,el,en,es,fi,fr,he,hr,hu,it,iw,ja,kk,ko,nb,nl,no,pl,pt,pt-br,ro,ru,sk,sl,sv,th,tr,uk,zh,zh-cn,zh-tw",requires:["colordialog"],init:function(t){
function o(e){
var t=e,n=/^<table(.|\n)+<\/table>(<br[^>]*>)?$/i,i=/^<tr(.|\n)+<\/tr>$/i,o=/^<(td|th)(.|\n)+<\/(td|th)>$/gi;
this.parse=function(){
return i.test(t)||o.test(t)||n.test(t)?!0:!1;
},this.insertRowBefore=function(e){
var i,o=e.getSelection(),a=o.getSelectedElement();
if(a&&a instanceof CKEDITOR.dom.element&&"tr"==a.getName()){
i=a;
}else{
var r=o.getCommonAncestor();
i=r&&r instanceof CKEDITOR.dom.element&&"tr"==r.getName()?r:r.getAscendant("tr")?r.getAscendant("tr"):null;
}
if(i){
var s=(n.test(t),/<tr(.|\s)+<\/tr>/i);
s.test(t)||(t="<tr>"+t+"</tr>"),n.test(t)||(t="<table>"+t+"</table>");
for(var l,d=CKEDITOR.dom.element.createFromHtml(t,e.document),c=0;c<d.getChildCount();c++){
if(d.getChild(c) instanceof CKEDITOR.dom.element&&("tbody"==d.getChild(c).getName()||"thead"==d.getChild(c).getName())){
for(var u=d.getChild(c),h=0;h<u.getChildCount();h++){
if(u.getChild(h) instanceof CKEDITOR.dom.element&&"tr"==u.getChild(h).getName()){
l=u.getChild(h);
break;
}
}
if(l){
break;
}
}
}
for(var c=0;c<l.getChildCount();c++){
if(l.getChild(c) instanceof CKEDITOR.dom.element&&("td"==l.getChild(c).getName()||"th"==l.getChild(c).getName())){
var f=l.getChild(c).hasAttribute("rowSpan")?l.getChild(c).getAttribute("rowSpan"):0;
if(f>1){
return !1;
}
}
}
return l.insertBefore(i),!0;
}
return !1;
};
};
function a(e){
for(var t=e.getElementsByTag("*"),n=0;n<t.count();n++){
"td"==t.getItem(n).getName().toLowerCase()&&(oldStyle=t.getItem(n).getAttribute("style"),(null==oldStyle||oldStyle&&-1==oldStyle.indexOf("overflow"))&&(oldStyle=oldStyle?oldStyle:"",t.getItem(n).setAttribute("style",oldStyle+" overflow:hidden;")));
}
};
function r(e){
var t=e.data;
if("table"==t.getName()){
var n=t.hasAttribute("fixedwidthcolumns")?t.getAttribute("fixedwidthcolumns"):!1;
if(t.removeAttribute("fixedwidthcolumns"),e.editor.config.ibmModernTable&&e.editor.config.ibmModernTable.enable&&CKEDITOR.env.ie&&CKEDITOR.env.version<9){
t.setStyle("border-collapse","collapse"),t.setStyle("border-color","#696969");
for(var i=t.getElementsByTag("*"),o=0;o<i.count();o++){
"td"==i.getItem(o).getName().toLowerCase()&&(oldStyle=i.getItem(o).getAttribute("style"),null!=oldStyle&&-1!=oldStyle.indexOf("color")&&(b=O),oldStyle=oldStyle?oldStyle:"",i.getItem(o).setAttribute("style",oldStyle+" "+D),b=v);
}
}
if(!e.editor.config.ibmModernTable||!e.editor.config.ibmModernTable.enable||CKEDITOR.env.ie&&CKEDITOR.env.version<9||t.setAttribute("class","border_collapse"),!n){
return;
}
t.setStyle("table-layout","fixed"),t.setStyle("word-wrap","break-word"),a(t);
var r,s,l=t.$.rows,d=t.getStyle("width"),c=l[0].childNodes.length,u=/^(\d+(?:\.\d+)?)(px|%|in|cm|mm|em|ex|pt|pc)$/,h=u.exec(d);
h&&(r=h[1],s=h[2]);
var f,m,g="%"==s?100:parseFloat(r);
"px"!=s&&"pt"!=s&&"mm"!=s?(f=g/c,f=Math.floor(f*Math.pow(10,2))/Math.pow(10,2),m=g-f*c,m=Math.round(m*Math.pow(10,2))/Math.pow(10,2)):(f=Math.floor(g/c),m=g%c);
for(var p=f+s,E=Math.round((f+m)*Math.pow(10,2))/Math.pow(10,2)+s,T=0;T<l.length;T++){
for(var C=new CKEDITOR.dom.element(l[T]),I=C.$.cells,o=0;c-1>o;o++){
var R=new CKEDITOR.dom.element(I[o]);
R.setStyle("width",p);
}
var y=new CKEDITOR.dom.element(I[c-1]);
y.setStyle("width",E);
}
}
};
function T(e,t){
if(t.config.ibmModernTable&&t.config.ibmModernTable.enable){
var n=new CKEDITOR.dom.element("style");
CKEDITOR.env.ie&&CKEDITOR.env.version<9?n.$.cssText="table.border_collapse{ "+e+"}table.border_collapse td{ "+D+"}":n.setHtml("table.border_collapse{ "+e+"}table.border_collapse td{ "+D+"}"),n.setAttribute("id","border-collapse-css"),t.document.getHead().append(n);
}
if(t.config.ibmModernTable&&t.config.ibmModernTable.enforceStyle){
var n=new CKEDITOR.dom.element("style");
CKEDITOR.env.ie&&CKEDITOR.env.version<9?n.$.cssText="table{ "+e+"}td,tr,th{ "+D+"}":n.setHtml("table{ "+e+"}td,tr,th{ "+D+"}"),n.setAttribute("id","border-collapse-css"),t.document.getHead().append(n);
}
};
u=1/CKEDITOR.tools.convertToPx("1in"),m=1/CKEDITOR.tools.convertToPx("1em"),g=1/CKEDITOR.tools.convertToPx("1ex"),E=1/CKEDITOR.tools.convertToPx("1pc"),h=100/CKEDITOR.tools.convertToPx("100cm"),f=100/CKEDITOR.tools.convertToPx("100mm"),p=100/CKEDITOR.tools.convertToPx("100pt"),t.addCommand("selectTable",new CKEDITOR.command(t,{requiredContent:"table",exec:function(e){
var t=e.getSelection(),n=t.getCommonAncestor(),i=n?n.getAscendant("table"):null;
i&&t.selectElement(i);
},modes:{wysiwyg:1}})),t.contextMenu.addListener(function(e,n){
return e.hasAscendant("table",1)?t.config.enableTableSort?{select_table:CKEDITOR.TRISTATE_OFF,table_sort:CKEDITOR.TRISTATE_OFF}:{select_table:CKEDITOR.TRISTATE_OFF}:null;
}),t.addCommand("selectTableRow",new CKEDITOR.command(t,{requiredContent:"table",exec:function(e){
var t=e.getSelection(),n=t.getCommonAncestor(),i=n&&n.getName&&"tr"==n.getName()?n:n.getAscendant("tr");
i&&t.selectElement(i);
},modes:{wysiwyg:1}})),t.addCommand("insertMultipleRows",{requiredContent:"table",exec:function(e,t){
var n=e.getSelection(),i="before"==t.insertLocation?!0:!1;
s(n,i,t.noOfRows);
}}),t.addCommand("insertMultipleColumns",{requiredContent:"table",exec:function(e,t){
var n=e.getSelection(),i="before"==t.insertLocation?!0:!1;
l(n,i,t.noOfCols);
}}),CKEDITOR.dialog.add("insertRows",this.path+"dialogs/insertRows.js"),t.addCommand("insertRows",new CKEDITOR.dialogCommand("insertRows",{requiredContent:"table"})),CKEDITOR.dialog.add("insertColumns",this.path+"dialogs/insertColumns.js"),t.addCommand("insertCols",new CKEDITOR.dialogCommand("insertColumns",{requiredContent:"table"})),CKEDITOR.dialog.add("columnProperties",this.path+"dialogs/columnProperties.js"),t.addCommand("columnProps",new CKEDITOR.dialogCommand("columnProperties",{allowedContent:"td th{width}",requiredContent:"table{width}"})),CKEDITOR.dialog.add("tablesort",this.path+"dialogs/tablesort.js"),t.addCommand("tablesort",new CKEDITOR.dialogCommand("tablesort",{requiredContent:"table"})),t.on("paste",function(e){
var t=new o(e.data.dataValue);
t.parse()&&t.insertRowBefore(e.editor)&&e.cancel();
});
var C="#696969",v="border-collapse : collapse; border-color : "+C+";",I="border-collapse : collapse; ",O="",D="border-color : "+C+";",b=v;
t.on("instanceReady",function(){
t.on("insertElement",r),T(b,t),t.on("beforeGetData",function(e){
if(e.editor&&e.editor.document&&!(CKEDITOR.env.ie&&CKEDITOR.env.version<9)){
var n;
if(t.config.ibmModernTable&&t.config.ibmModernTable.enforceStyle){
n=e.editor.document.getElementsByTag("table");
for(var i=0;i<n.count();i++){
"border_collapse"==n.getItem(i).getAttribute("class")&&n.getItem(i).removeAttribute("class");
var o=n.getItem(i).getAttribute("style");
null!=o&&-1!=o.indexOf("color")&&(b=I),n.getItem(i).setAttribute("style",o+" "+b),b=v;
for(var a=n.getItem(i).getElementsByTag("*"),r=0;r<a.count();r++){
"td"==a.getItem(r).getName().toLowerCase()&&(o=a.getItem(r).getAttribute("style"),b=null!=o&&-1!=o.indexOf("color")?O:D,o=o?o:"",a.getItem(r).setAttribute("style",o+" "+b),b=v);
}
}
}
if(t.config.ibmModernTable&&t.config.ibmModernTable.enable&&!t.config.ibmModernTable.enforceStyle){
n=e.editor.document.$.getElementsByClassName("border_collapse");
for(var s in n){
if(n[s].getElementsByTagName){
var o=n[s].getAttribute("style");
null!=o&&-1!=o.indexOf("color")&&(b=I),n[s].setAttribute("style",o+" "+b),b=v;
var a=n[s].getElementsByTagName("*");
for(iter in a){
a[iter].setAttribute&&"td"==a[iter].tagName.toLowerCase()&&(o=a[iter].getAttribute("style"),b=null!=o&&-1!=o.indexOf("color")?O:D,o=o?o:"",a[iter].setAttribute("style",o+" "+b),b=v);
}
}
n[s].removeAttribute&&n[s].removeAttribute("class");
}
}
}
},null,null,0),t.on("dataReady",function(e){
e.editor.document&&null==e.editor.document.getById("border-collapsed-css")&&T(b,e.editor);
});
}),t.on("beforeCommandExec",function(e){
if("columnDelete"==e.data.name){
var t=e.editor.getSelection(),i=CKEDITOR.plugins.tabletools.getSelectedCells(t);
c=n(i);
}
}),t.on("afterCommandExec",function(n){
if("columnInsertAfter"==n.data.name||"columnInsertBefore"==n.data.name||"insertMultipleColumns"==n.data.name){
var o=n.editor.getSelection(),r=CKEDITOR.plugins.tabletools.getSelectedCells(o),s="columnInsertBefore"==n.data.name?!0:!1,l=n.data.commandData&&n.data.commandData.noOfCols?n.data.commandData.noOfCols:1;
c=e(r,s),c&&"0px"!=c&&(d.setStyle("width",i(c,l)),t.fire("updateSnapshot"));
}else{
"columnDelete"==n.data.name&&c&&"0px"!=c&&(d.setStyle("width",i(c,null,!0)),t.fire("updateSnapshot"));
}
if(("cellInsertBefore"==n.data.name||"cellInsertAfter"==n.data.name||"cellDelete"==n.data.name)&&!function(e){
for(var n,i=e.editor.getSelection(),o=CKEDITOR.plugins.tabletools.getSelectedCells(i),a=o[0].getAscendant("table"),r=a.getElementsByTag("td"),s=a.getElementsByTag("tbody").getItem(0).getChildren(),l=0,d=0;d<s.count();d++){
l=s.getItem(d).getChildren().count()>l?s.getItem(d).getChildren().count():l;
}
for(var n=a.getStyle("width").split("px")[0]/l,d=0;d<r.count();d++){
r.getItem(d).setStyle("width",n+"px");
}
t.fire("updateSnapshot");
}(n),-1!=n.data.name.indexOf("insert")){
var o=n.editor.getSelection(),u=o.getStartElement(),h=u.getAscendant("table");
h&&-1!=h.getAttribute("style").indexOf("fixed")&&a(h);
}
});
},afterInit:function(e){
if(e.addMenuItems){
e.addMenuGroup("tablecolumnproperties"),e.addMenuItems({select_table:{label:e.lang.ibmtabletools.selectTable,command:"selectTable",group:"table",order:2},table_sort:{label:e.lang.ibmtabletools.sortTableContextMenuOption,command:"tablesort",group:"table",order:2},select_tablerow:{label:e.lang.ibmtabletools.selectRow,command:"selectTableRow",group:"tablerow",order:20},insert_rows:{label:e.lang.ibmtabletools.insertMultipleRows,group:"tablerow",command:"insertRows",order:1},insert_cols:{label:e.lang.ibmtabletools.insertMultipleCols,group:"tablecolumn",command:"insertCols",order:1},column_properties:{label:e.lang.ibmtabletools.columnTitle,group:"tablecolumnproperties",command:"columnProps",order:20}});
var t=e.getMenuItem("tablerow"),n=t.getItems,i=" submenuItem";
t.getItems=function(){
var t=n();
t.insert_rows=CKEDITOR.TRISTATE_OFF,t.select_tablerow=CKEDITOR.TRISTATE_OFF;
for(var o in t){
var a=e.getMenuItem(o);
if(a.className.indexOf(i)>-1){
break;
}
a.className+=i;
}
return t;
};
var o=e.getMenuItem("tablecolumn"),a=o.getItems;
o.getItems=function(){
var t=a();
t.insert_cols=CKEDITOR.TRISTATE_OFF,t.column_properties=CKEDITOR.TRISTATE_OFF;
for(var n in t){
var o=e.getMenuItem(n);
if(o.className.indexOf(i)>-1){
break;
}
o.className+=i;
}
return t;
};
var r=e.getMenuItem("tablecell"),s=r.getItems;
r.getItems=function(){
var t=s();
for(var n in t){
var o=e.getMenuItem(n);
if(o.className.indexOf(i)>-1){
break;
}
o.className+=i;
}
return t;
};
}
}});
}(),CKEDITOR.plugins.add("ibmtoolbars",{lang:"ar,ca,cs,da,de,el,en,es,fi,fr,he,hr,hu,it,iw,ja,kk,ko,nb,nl,no,pl,pt,pt-br,ro,ru,sk,sl,sv,th,tr,uk,zh,zh-cn,zh-tw",requires:["menubutton","toolbar"],init:function(e){
function t(){
c.$.removeEventListener?(c.$.removeEventListener("scroll",v,!1),c.$.removeEventListener("resize",I,!1)):c.$.detachEvent&&(c.$.detachEvent("onscroll",v),c.$.detachEvent("onresize",I));
};
function n(){
c.$.addEventListener?(c.$.addEventListener("scroll",v,!1),c.$.addEventListener("resize",I,!1)):c.$.attachEvent&&(c.$.attachEvent("onscroll",v),c.$.attachEvent("onresize",I));
};
function i(){
r.removeClass("cke_floating_toolbox"),r.removeStyle("width"),s.removeStyle("width"),g.remove();
};
function o(e,t){
t&&(r.removeStyle("width"),s.removeStyle("width"));
var n=CKEDITOR.env.ie?e.$.clientWidth:parseInt(e.getComputedStyle("width"),10);
r.setStyle("width",n+"px"),s.setStyle("width",n+"px");
};
function a(){
var e=l.getDocumentPosition().x,t=c.getScrollPosition().x;
r.setStyle("left",e-t+"px");
};
if(e.config.blockedKeystrokes.push(CKEDITOR.SHIFT+CKEDITOR.ALT+73),e.config.blockedKeystrokes.push(CKEDITOR.SHIFT+CKEDITOR.ALT+79),e.setKeystroke(CKEDITOR.SHIFT+CKEDITOR.ALT+73,"indent"),e.setKeystroke(CKEDITOR.SHIFT+CKEDITOR.ALT+79,"outdent"),!(!e.config.ibmFloatToolbar||CKEDITOR.env.quirks&&CKEDITOR.env.ie||e.elementMode==CKEDITOR.ELEMENT_MODE_INLINE)){
var r,s,l,d,c,u,h,f=!1,m=!1,g=new CKEDITOR.dom.element("div"),p=/^(\d+(?:\.\d+)?)%$/,E=e.ui.items;
for(var T in E){
if("panelbutton"==E[T].type||"richcombo"==E[T].type){
if(E[T].args[0].onOpen){
var C=E[T].args[0].onOpen;
E[T].args[0].origOnOpen=C;
}
E[T].args[0].onOpen=function(){
this.origOnOpen&&this.origOnOpen(),m=!0;
};
}
}
var v=function(){
if("wysiwyg"==e.mode&&e.container.isVisible()){
l&&null!=l.getParent()||(l=e.container.getElementsByTag("iframe").getItem(0));
var t=f?30:0;
u=l.getDocumentPosition().y+t;
var n=c.getViewPaneSize().height,h=c.getScrollPosition().y;
}
if("wysiwyg"!=e.mode||u>h&&h+n>u){
i(),f&&(c.$.dojo&&O(),f=!1);
}else{
if(h>u){
for(var m,E,T=-1,C=0;C<r.getChildCount();C++){
m=r.getChild(C),"cke_toolbar"==m.getAttribute("class")&&(E=CKEDITOR.env.ie?m.$.clientWidth:parseInt(m.getComputedStyle("width"),10),E>T&&(T=E));
}
-1!=T&&g.setStyle("width",T+"px");
var v=CKEDITOR.env.ie?r.$.clientHeight:parseInt(r.getComputedStyle("height"),10);
if(g.setStyle("height",v+"px"),d.append(g),f||(c.$.dojo&&O(),f=!0),e.config.width){
var I=e.config.width;
p.exec(I)?o(s):parseInt(CKEDITOR.tools.convertToPx(I),10)<T?o(s):r.setStyle("width",I);
}else{
o(CKEDITOR.env.webkit?s:d);
}
a(),r.addClass("cke_floating_toolbox");
}
}
},I=function(){
f&&(e.config.width?p.exec(e.config.width)&&o(s,!0):CKEDITOR.env.chrome?o(r):CKEDITOR.env.webkit?o(s,!0):o(r,!0),a());
},O=function(){
var e=r.$;
dojo.style(e,"opacity","0");
var t={node:e,duration:500};
dojo.fadeIn(t).play();
};
e.on("destroy",function(){
l=null;
}),e.on("mode",function(){
c&&("wysiwyg"==e.mode?(l=e.container.getElementsByTag("iframe").getItem(0),n()):(v(),t()));
}),e.on("blur",function(){
setTimeout(function(){
t(),"wysiwyg"!=e.mode||m||(i(),f=!1);
},100);
}),e.on("focus",function(){
if(!r){
for(var t=e.container.getElementsByTag("span"),i=0;i<t.count();i++){
if("cke_toolbox"==t.getItem(i).getAttribute("class")){
r=t.getItem(i);
break;
}
}
if(!r){
return;
}
d=r.getParent(),c=r.getWindow(),s=r.getParent().getNext(),h=e.element.getSize("height");
}
m=!1,v(),"wysiwyg"==e.mode&&n();
}),e.on("resize",function(){
if(CKEDITOR.env.ie){
var t=e.element.getSize("height");
h>t&&v(),h=t;
}
}),e.on("dialogShow",function(e){
m="find"==e.data.getName()?!1:!0;
}),e.on("dialogHide",function(e){
setTimeout(function(){
if("find"==e.data.getName()){
var t=e.editor,n=t.getSelection(),i=n.getStartElement().getDocumentPosition().y;
CKEDITOR.env.ie&&(i+=1),u=l.getDocumentPosition().y;
var o=u+i-t.window.getScrollPosition().y,a=r.getParent().getSize("height",!0),s=c.getScrollPosition().y,d=s+a,h=c.getViewPaneSize().height,f=h-a;
if(s>o||o>s+h){
n.scrollIntoView();
}else{
if(!(o>d&&d+f>o)){
var m=c.getScrollPosition().y-a-10;
c.$.scrollTo(c.getScrollPosition().x,m);
}
}
}
},0);
}),e.on("menuShow",function(){
m=!0;
}),e.on("beforeCommandExec",function(e){
("toolbarFocus"===e.data.name||"elementsPathFocus"===e.data.name)&&(m=!0);
});
}
},afterInit:function(e){
var t=e.config;
t.menus&&this.createConfigCommandMenus(e);
},createConfigCommandMenus:function(e){
var t,n=e.config.menus;
for(t in n){
var i=n[t];
if("string"==typeof i.buttonClass&&"undefined"!=typeof i.commands){
var o;
if("string"==typeof i.label){
o=e.lang;
for(var a=i.label.split("."),r=0,s=a.length;s>r;++r){
o=o[a[r]];
}
}else{
o=e.lang.ibmtoolbars.menu[t];
}
var l="menu"+t;
"string"==typeof i.groupName&&(l=i.groupName);
var d=new CKEDITOR.ibm.menus(e,l);
d.createCommandMenu("Menu"+t.substr(0,1).toUpperCase()+t.substr(1),o,i.buttonClass,i.commands,i.toolbar,t);
}
}
},replaceLinkButtonWithMenu:function(e){
var t=e.config;
if(t.menus&&t.menus.link){
var n=t.toolbar instanceof Array?e.config.toolbar:e.config["toolbar_"+e.config.toolbar];
Array.prototype.indexOf||(Array.prototype.indexOf=function(e,t){
null==t?t=0:0>t&&(t=Math.max(0,this.length+t));
for(var n=t,i=this.length;i>n;n++){
if(this[n]===e){
return n;
}
}
return -1;
});
for(var i=0;i<n.length;i++){
if("object"==typeof n[i]){
if(o=n[i].items.indexOf("Link"),-1!==o){
n[i].items[o]="MenuLink";
break;
}
}else{
var o=n[i].indexOf("Link");
if(-1!==o){
n[i][o]="MenuLink";
break;
}
}
}
}
}}),"undefined"==typeof CKEDITOR.ibm&&(CKEDITOR.ibm={}),CKEDITOR.ibm.menus=CKEDITOR.tools.createClass({$:function(e,t){
this.editor=e,this._.menuGroup=t,this._.menuItemOrder=0,"undefined"==typeof this.editor._.menuGroups[t]&&this.editor.addMenuGroup(t);
},privates:{getCommandLabel:function(e){
for(var t in this.editor.ui.items){
if(this.editor.ui.items[t].command===e){
return this.editor.ui.items[t].args[0].label;
}
}
return "";
},getMenuItemOrder:function(){
return ++this._.menuItemOrder;
},getMenuItemState:function(e){
var t=this.editor.getMenuItem(e);
if("undefined"==typeof t){
return CKEDITOR.TRISTATE_OFF;
}
var n=this.editor.getCommand(t.cmdName);
return "undefined"==typeof n?CKEDITOR.TRISTATE_OFF:n.state;
}},proto:{getIconPath:function(){
return this._.iconPath;
},getMenuGroup:function(){
return this._.menuGroup;
},addMenuItem:function(e,t){
var n=this.editor.getCommand(e);
"object"==typeof n&&this.editor.addMenuItem(t+"_"+e,{cmdName:e,onClick:function(){
this.editor.getCommand(this.cmdName).exec();
},icon:e,group:this.getMenuGroup(),label:this._.getCommandLabel(e),order:this._.getMenuItemOrder(),className:"toolbarContextMenu"});
},createCommandMenu:function(e,t,n,i,o,a){
var r=this,s={label:t,title:t,className:n,icon:"paste"==a?"pastetext":a,toolbar:o,requiredContent:"link"==a?"a[href]":"",modes:{wysiwyg:1},onRender:function(){
for(var t=0;t<i.length;++t){
r.addMenuItem(i[t],e);
}
},onMenu:function(t,n){
for(var o={},a=0;a<i.length;++a){
var s=e+"_"+i[a];
o[s]=r._.getMenuItemState(s);
}
return o;
}};
this.createMenu(e,s);
},createMenu:function(e,t){
"undefined"!==this.editor.getCommand("link")&&null!=this.editor.getCommand("link")&&this.editor.ui.add(e,CKEDITOR.UI_MENUBUTTON,t);
}}}),CKEDITOR.tools.extend(CKEDITOR.config,{ibmFloatToolbar:!1}),CKEDITOR.config.toolbar_Slim=[["Bold","Italic","Underline","Strike","TextColor","NumberedList","BulletedList","BidiLtr","BidiRtl","Language","Image","Link","Smiley"]],CKEDITOR.config.toolbar_Medium=[{name:"tools",items:["Undo","Redo","MenuPaste","IbmSpellChecker"]},{name:"styles",items:["Font","FontSize","Bold","Italic","Underline","Strike","TextColor","BGColor"]},{name:"paragraph",items:["JustifyLeft","JustifyCenter","JustifyRight","JustifyBlock","NumberedList","BulletedList","Indent","Outdent","BidiLtr","BidiRtl","Language"]},{name:"insert",items:["Table","Image","MenuLink","Anchor","Smiley"]}],CKEDITOR.config.toolbar_Large=[{name:"tools",items:["Undo","Redo","MenuPaste","Find","IbmSpellChecker","ShowBlocks","IbmPermanentPen"]},{name:"styles",items:["Format","Font","FontSize","Bold","Italic","Underline","Strike","TextColor","BGColor","Subscript","Superscript","RemoveFormat"]},{name:"paragraph",items:["JustifyLeft","JustifyCenter","JustifyRight","JustifyBlock","NumberedList","BulletedList","Indent","Outdent","Blockquote","BidiLtr","BidiRtl","Language"]},{name:"insert",items:["Table","Image","MenuLink","Anchor","Iframe","Flash","PageBreak","HorizontalRule","SpecialChar","Smiley"]}],CKEDITOR.config.toolbar="Large",CKEDITOR.plugins.add("ibmsametimeemoticons",{lang:"af,ar,bg,bn,bs,ca,cs,cy,da,de,el,en-au,en-ca,en-gb,en,eo,es,et,eu,fa,fi,fo,fr-ca,fr,gl,gu,he,hi,hr,hu,is,it,ja,ka,km,ko,lt,lv,mk,mn,ms,nb,nl,no,pl,pt-br,pt,ro,ru,sk,sl,sr-latn,sr,sv,th,tr,ug,uk,vi,zh-cn,zh",init:function(e){
e.config.smiley_path=e.config.smiley_path||this.path+"images/",e.config.smiley_images=["EmoticonHappy.gif","EmoticonLaugh.gif","EmoticonWink.gif","EmoticonBigSmile.gif","EmoticonCool.gif","EmoticonAngry.gif","EmoticonConfused.gif","EmoticonEyebrow.gif","EmoticonSad.gif","EmoticonShy.gif","EmoticonGoofy.gif","EmoticonSurprised.gif","EmoticonTongue.gif","EmoticonLightbulb.gif","EmoticonThumbsUp.gif","EmoticonThumbsDown.gif","EmoticonAngel.gif","EmoticonCrying.gif","EmoticonHysterical.gif"];
var t=e.lang.ibmsametimeemoticons;
e.config.smiley_descriptions=[t.smile,t.laughing,t.wink,t.grin,t.cool,t.angry,t.half,t.eyebrow,t.frown,t.shy,t.goofy,t.oops,t.tongue,t.idea,t.yes,t.no,t.angel,t.crying,t.laughroll];
}}),function(){
function e(e){
a=!1;
var t=e[0].startContainer instanceof CKEDITOR.dom.element?e[0].startContainer:e[0].startContainer.getParent(),n=e[0].endContainer instanceof CKEDITOR.dom.element?e[0].endContainer:e[0].endContainer.getParent();
return a=t.equals(n)?i(e[0]):!0;
};
function t(e){
return e instanceof CKEDITOR.dom.element&&1==e.getChildCount()?t(e.getFirst()):e;
};
function n(e){
var t=new Array;
if(e instanceof CKEDITOR.dom.range){
var n=new CKEDITOR.dom.walker(e);
for(n.evaluator=function(e){
return e.type===CKEDITOR.NODE_ELEMENT&&"A"==e.$.nodeName;
},n.breakOnFalse=!1;n.next();){
t.push(n.current);
}
CKEDITOR.env.ie||e.select();
}
return t;
};
function i(e){
var t=!1;
if(e instanceof CKEDITOR.dom.element){
for(var n=e.getChildren(),i=n.count();i--;){
if(n.getItem(i).type===CKEDITOR.NODE_ELEMENT){
t=!0;
break;
}
}
}else{
if(e instanceof CKEDITOR.dom.range){
var o=new CKEDITOR.dom.walker(e);
o.evaluator=function(e){
return e.type===CKEDITOR.NODE_ELEMENT;
},o.breakOnFalse=!0,o.next()&&(t=!0),CKEDITOR.env.ie||e.select();
}
}
return t;
};
function o(e){
if(e instanceof CKEDITOR.dom.range){
var t=new CKEDITOR.dom.walker(e);
for(t.evaluator=function(e){
return e.type===CKEDITOR.NODE_ELEMENT&&"A"==e.$.nodeName;
},t.breakOnFalse=!1;t.next();){
t.current.mergeSiblings();
}
}
};
var a=!1;
CKEDITOR.plugins.add("ibmurllink",{requires:["link"],init:function(t){
if(t.addFeature(t.getCommand("link")),t.addCommand("link",new CKEDITOR.dialogCommand("urllink",{allowedContent:"a[!href,target]",requiredContent:"a[href]"})),CKEDITOR.dialog.add("urllink",this.path+"dialogs/urllink.js"),t.addCommand("bookmark",new CKEDITOR.dialogCommand("bookmark",{allowedContent:"a[!href,name,id]",requiredContent:"a[name,href]"})),CKEDITOR.dialog.add("bookmark",this.path+"dialogs/urllink.js"),t.ui.addButton("Bookmark",{label:t.lang.ibmurllink.documentbookmarktitle,command:"bookmark",toolbar:"insert,20"}),t.addMenuItems){
var i=t.getMenuItem("link");
"object"==typeof i&&(i.label=t.lang.link.menu);
}
!function(){
function i(e){
return CKEDITOR.env.webkit&&(e=e.replace(/\u200B/g,"")),CKEDITOR.env.ie&&(e=e.replace(/\u00A0/g,"")),p.lastIndex=0,p.exec(e);
};
function o(e,t,n){
return range=new CKEDITOR.dom.range(e),range.setStartAt(e,t),range.setEndAt(e,n),range.select();
};
function r(e){
var n=new CKEDITOR.dom.range(t.document);
n.moveToElementEditablePosition(e),n.select();
};
function s(e){
var t=e.editable();
if(t){
var n=t.getCustomData("cke-fillingChar");
if(n){
var i=e.document.$.defaultView.getSelection();
"Caret"==i.type&&i.anchorNode==n.$&&(resetSelection=1),fillingCharBefore=n.getText(),n.setText(l(fillingCharBefore)),resetSelection&&(e.document.$.defaultView.getSelection().setPosition(n.$,n.getLength()),resetSelection=0);
}
}
};
function l(e){
return e.replace(/\u200B( )?/g,function(e){
return e[1]?"\xa0":"";
});
};
var d="(<a(.*?)>)",c="(^|\\s|>|&nbsp;*)(((https?|ftps?|news|mailto|notes):|www\\.|w3\\.)([\\w/\\#~:.?+=%@!\\[\\]\\-{},\\$\\*\\(\\);'\"]|&amp;)+?)(?=[.:?\\),;!\\]'\"]*(?:[^\\w/\\#~:.?+=&%@!\\[\\]\\-{},\\$\\*\\(\\);'\"]|&nbsp;|$))",u=new RegExp(c,"gi"),h=new RegExp(d,"gi"),f=function(e){
var n,i=e.data,o=i.dataValue,a="",r=0,s=0;
if(h.lastIndex=0,n=h.exec(o),!n){
for((e.data.dataTransfer.$||"html"==e.data.type||1==t.config.ibmEnablePasteLinksEvt)&&(n=u.exec(o));n;){
a=n[2].replace(/^((www|w3)\..+)/,t.config.useHTTPs?"https://$1":"http://$1"),a=a.replace(/&amp;/g,"&"),a=a.replace(/"/g,"&quot;"),a="<a href=\""+a+"\">"+n[2]+"</a>",r=n.index+n[1].length,s=n.index+n[0].length,o=o.substring(0,r)+a+o.substring(s),t.execCommand("pasteLink",n[2]),u.lastIndex=n.index+a.length,n=u.exec(o);
}
i.dataValue=o;
}
},m=function(e){
var t,n,a,l=e.editor,d=l&&l.getSelection?l.getSelection().getRanges()[0]:null;
if(d){
if(t=d.endContainer,t.type==CKEDITOR.NODE_ELEMENT){
var c=t.getChild(d.endOffset-1);
c&&(c.type==CKEDITOR.NODE_ELEMENT&&"a"!=c.getName()||c.type==CKEDITOR.NODE_TEXT)&&(a=c.getText());
}else{
a=t.getText().substring(0,d.endOffset);
}
t.getParent().type==CKEDITOR.NODE_ELEMENT&&"a"==t.getParent().getName()&&(a=" ");
}
if(a&&/\S/.test(a)){
var u,h=a.lastIndexOf(" ");
if(u=-1!=h?a.substring(h+1):a,n=i(u),!n){
var f;
t.type==CKEDITOR.NODE_TEXT&&(f=t.getText().substring(d.endOffset));
var m,g=t=t.type==CKEDITOR.NODE_ELEMENT&&t.getChildCount()>0?t.getChild(d.endOffset-1):t;
if(g.getName&&"a"!=g.getName()||g.type==CKEDITOR.NODE_TEXT&&" "!=t.getText().charAt(0)){
for(var p=!1,E=0;g&&g.getPrevious()&&g.getPrevious().type==CKEDITOR.NODE_TEXT;){
if(E++,p||(g=g.getPrevious(),p=!0),a=g.getText()+a,m=a,g.getPrevious&&null!==g.getPrevious()){
var T=g.getPrevious();
}
if(g=T?T:null,m.indexOf(" ")>=0||CKEDITOR.env.webkit&&/\s/g.test(m)){
break;
}
}
var C=!1;
if(g&&m&&g.type==CKEDITOR.NODE_TEXT&&g.getText()!=m){
var v=g.getText(),I=v.charAt(v.length-1);
if(" "!=I){
C=!0;
var O=v.lastIndexOf(" ");
m=-1!=O?g.getText().substring(O+1)+m:g.getText()+m;
}
}
if(m&&(a=m),h=a.lastIndexOf(" "),u=-1!=h?a.substring(h+1):a,n=i(u)){
for(var g=t=t.type==CKEDITOR.NODE_ELEMENT&&t.getChildCount()>0?t.getChild(d.endOffset-1):t,D=0,p=!1,b=0;E>b;b++){
D++,p||(g=g.getPrevious(),p=!0);
var T=g.getPrevious();
g.remove(),g=T;
}
if(C){
var O=g.getText().lastIndexOf(" ");
-1!=O?g.setText(g.getText().substring(0,O+1)):g.setText("");
}
if(t.setText(a),f&&a!=f){
var R=new CKEDITOR.dom.text(f);
R.insertAfter(t);
}
}
}
}
if(n){
var O=a.lastIndexOf(" "),y=n[0].replace(/^\s+|\s+$/g,"");
CKEDITOR.env.webkit&&(a=a.replace(/\u200B/g,""));
var K=-1;
CKEDITOR.env.ie&&(K=a.lastIndexOf("\xa0"));
var _1a=a.lastIndexOf(y);
(-1!=O||0==_1a||CKEDITOR.env.ie&&-1!=K)&&t.type!=CKEDITOR.NODE_TEXT&&t.getChildCount()>0&&(t=t.getChild(d.endOffset-1));
for(var k=t.getParent(),w=!1;k.getParent();){
if(k.getName&&"a"==k.getName()){
w=!0;
break;
}
if(k.getName&&"body"==k.getName()){
break;
}
k=k.getParent();
}
if(!w){
CKEDITOR.env.webkit&&(t.setText(t.getText().replace(/\u200B/g,"")),s(l)),e.cancel();
var S=e.data.keyCode,x=t.getText().substring(_1a+y.length),N=x.match(/^[\\.:"?\\),\\;'!\/\]]*/),A=N?N[0].length:0;
if(t.split(_1a+y.length+A),32==S){
var L=new CKEDITOR.dom.element.createFromHtml("&nbsp;");
L.insertBefore(t.getNext());
var P=l.createRange();
P.setStartAfter(L),P.setEndAfter(L),P.select(),l.fire("saveSnapshot");
var B=L.getNext();
B.type!=CKEDITOR.NODE_TEXT||B.getText()&&0!==B.getText().length||L.getNext().remove();
}else{
l.execCommand("enter");
var F=l.getSelection().getRanges()[0].endContainer;
l.fire("saveSnapshot");
}
var P=l.createRange();
P.setStart(t,_1a),P.setEnd(t,_1a+y.length),P.select();
var M=l.getSelection().getSelectedText(),$=new RegExp("(www\\.|w3\\.)","gi"),H=$.exec(M.substring(0,4));
H&&(M=(l.config.useHTTPs?"https://":"http://")+M);
var q={};
if(q.href=M,q.text=l.getSelection().getSelectedText(),l.execCommand("insertLink",q),32==S){
if(g=l.getSelection().getRanges()[0].getCommonAncestor(),g.hasAscendant("a")&&(g=g.getAscendant("a")),CKEDITOR.env.gecko&&g.getName&&"a"!=g.getName()){
if(g=l.getSelection().getStartElement(),g.getChildCount()>1){
for(var z=g.getParent(),b=1;b<g.getChildCount();b++){
z.append(g.getChild(b));
}
}else{
for(var V=g.clone(!0),j=!1;g.getParent();){
if(g=g.getParent(),g.getName&&"a"==g.getName()){
j=!0;
break;
}
}
0==j&&(g=V.clone(!0));
}
}
var U=g.getNext();
if(U&&U.type==CKEDITOR.NODE_TEXT){
var N=U.getText().match(/^[\\.:"?\\),\\;'!\/\]]*/);
if(N&&N[0]){
P=new CKEDITOR.dom.range(U.getNext()),P.setStart(U.getNext(),1),P.setEnd(U.getNext(),1),P.select();
}else{
var P=l.createRange();
P.setStartAfter(U),P.setEndAfter(U),P.select();
}
}else{
o(g,CKEDITOR.POSITION_AFTER_END,CKEDITOR.POSITION_AFTER_END);
}
}else{
var W=new CKEDITOR.dom.element.createFromHtml("&#8203");
CKEDITOR.env.webkit&&!/\S/.test(F.getText())&&W.insertAfter(F),r(F);
}
}
}
}
};
t.addCommand("insertLink",{exec:function(t,i){
var o,r=/^#/;
if(i.href){
o=r.test(i.href),i["data-cke-saved-href"]=i.href,i.text||(i.text=i.href);
var s=t.getSelection(),l=s.getRanges(!0);
if(l[0].collapsed?a=!1:"urllink"!=i.src&&e(l),delete i.src,1==l.length&&!a){
l[0].collapsed||l[0].deleteContents(!1);
var d=new CKEDITOR.dom.text(i.text.replace(/ /g,"\xa0"),t.document);
l[0].insertNode(d),l[0].selectNodeContents(d),s.selectRanges(l);
}
delete i.text;
var c=n(l[0]);
if(o){
delete i.target;
}else{
var u=i.target;
""==i.target&&delete i.target;
}
var h=new CKEDITOR.style({element:"a",attributes:i});
h.type=CKEDITOR.STYLE_INLINE,t.applyStyle(h);
for(var f=0;f<c.length;f++){
c[f].setAttribute("href",i.href),c[f].hasAttribute("data-cke-saved-href")&&c[f].setAttribute("data-cke-saved-href",i.href),o&&c[f].hasAttribute("target")?c[f].removeAttribute("target"):o||(c[f].hasAttribute("target")&&""==u?c[f].removeAttribute("target"):""!=u&&c[f].setAttribute("target",u));
}
}
},canUndo:!1}),t.addCommand("pasteLink",{exec:function(e,t){
},canUndo:!1}),t.on("paste",f),t.on("afterPaste",function(e){
var t=e.editor.getSelection().getRanges()[0],n=t.endContainer;
if(n&&n.type==CKEDITOR.NODE_ELEMENT&&n.getName&&"a"==n.getName()){
var i=e.editor.createRange();
i.setStartAfter(n),i.setEndAfter(n),i.select();
}
}),t.on("key",function(e){
if(t.config.ibmAutoConvertUrls&&t.filter.check("a[href]")){
var n=e.data.keyCode;
13!=n&&32!=n||"source".valueOf()==new String(t.mode).valueOf()||(CKEDITOR.env.webkit||t.fire("saveSnapshot"),m(e));
}
});
var g="(^|\\s|>|&nbsp;*)(((https?|ftps?|news|mailto|notes):|www\\.|w3\\.)([\\w/\\#~:.?+=%@!\\[\\]\\-{},\\$\\*\\(\\);'\"]|(?:&|&amp;))+?)(?=[.:?\\),;!\\]'\"]*(?:[^\\w/\\#~:.?+=&%@!\\[\\]\\-{},\\$\\*\\(\\);'\"]|&nbsp;|$))",p=new RegExp(g,"gi");
}();
},containsElementNodes:e,findInnerElement:t,findChildAnchors:n,hasChildElementNodes:i,mergeIdenticalAnchorNodes:o,includesElementNodes:a});
}(),CKEDITOR.plugins.add("ibmmenuhelpmessage",{lang:"ar,ca,cs,da,de,el,en,es,fi,fr,he,hr,hu,it,iw,ja,kk,ko,nb,nl,no,pl,pt,pt-br,ro,ru,sk,sl,sv,th,tr,uk,zh,zh-cn,zh-tw",init:function(e){
function t(e){
for(var t=["toolbarContextMenu","language","submenuItem"],n=0;n<t.length;n++){
if(e.indexOf(t[n])>0){
return !1;
}
}
return !0;
};
function n(e,t,n){
var i=new CKEDITOR.dom.element(e,t);
return i.setAttribute("class",n),i;
};
function i(e,n){
if("cke_panel_block"==e.getAttribute("class")&&(!n||"display: none;"!=n)){
var i=e.getElementsByTag("div").getItem(0);
if("cke_menu"==i.getAttribute("class")||i.getAttribute("class").replace(/ /g,"")=="cke_menu cke_mixed_dir_content".replace(/ /g,"")){
var o=i.getElementsByTag("a").getItem(0),a=o.getAttribute("class");
if(t(a)){
return i;
}
}
}
};
!e.config.disableNativeSpellChecker&&e.config.displayContextMenuHelpMessage&&e.config.browserContextMenuOnCtrl!==!1&&(e.on("menuShow",function(t){
for(var o=CKEDITOR.env.mac?e.lang.ibmmenuhelpmessage.keystrokeForContextMenuMac:e.lang.ibmmenuhelpmessage.keystrokeForContextMenu,a="ibmcke_context_menu_msg_id",r=t.data[0]||t.data,s=r.element.getElementsByTag("iframe").getItem(0),l=s.getFrameDocument(),d=l.getBody().getElementsByTag("div"),c=0;c<d.count();c++){
var u=d.getItem(c).getAttribute("style"),h=i(d.getItem(c),u);
if(h){
var f=n("div",l,"cke_menuseparator");
f.setAttribute("role","separator"),h.append(f);
var m=n("span",l,"cke_contextmenu_background_color cke_menubutton"),g=n("span",l,"cke_contextmenu_background_color cke_menubutton_inner"),p=n("span",l,"cke_button_icon cke_button_info_icon");
g.append(p);
var E=n("span",l,"cke_contextmenu_background_color"),T=n("div",l,"cke_contextmenu_message");
T.setHtml(o),E.append(T);
var C=h.getParent(),v=s.getAttribute("aria-describedby");
if(v){
var I=v.indexOf(a);
I>-1&&(v==a?s.removeAttribute("aria-describedby"):s.setAttribute("aria-describedby",v.substring(0,I)));
}
var O=C.getAttribute("aria-describedby");
if(O){
var I=O.indexOf(a);
-1==I&&(O+=a,C.setAttribute("aria-describedby",O));
}else{
C.setAttribute("aria-describedby",a);
}
if(g.append(E),m.append(g),h.append(m),!document.getElementById(a)){
var D=new CKEDITOR.dom.element("div",l);
D.setAttribute("style","display:none"),D.setAttribute("id",a),D.setText(o),h.getParent().append(D);
}
}
}
}),e.on("contentDom",function(e){
var t=e.editor.editable();
t.on("contextmenu",function(e){
this.focusManager.hasFocus||(this.getSelection().getSelectedElement()?this.getSelection().getSelectedElement().focus():this.focus()),this.contextMenu._.onShow();
for(var t=this.contextMenu,n=!0,i=0;i<t.items.length;i++){
if(1!=t.items[i].group){
return void (n=!1);
}
}
1==n&&e.stop();
},this,null,0);
}));
}}),CKEDITOR.plugins.add("ibmlanguagedropdown",{lang:"ar,eu,bg,ca,zh,zh-tw,hr,cs,da,nl,en,fi,fr,de,el,iw,hu,id,it,ja,kk,ko,no,pl,pt,pt-br,ro,ru,sk,sl,es,sr,sv,th,tr",beforeInit:function(e){
function t(e,t){
var n=0;
return e=e.toLowerCase(),t=t.toLowerCase(),e>t&&(n=1),t>e&&(n=-1),n;
};
var n={arabic:{code:"ar",isRTL:!0,displayName:"Arabic"},basque:{code:"eu",isRTL:!1,displayName:"Basque"},bosnian:{code:"ba",isRTL:!1,displayName:"Bosnian",disabled:!0},bulgarian:{code:"bg",isRTL:!1,displayName:"Bulgarian"},catalan:{code:"ca",isRTL:!1,displayName:"Catalan"},chinese_simplified:{code:"zh",isRTL:!1,displayName:"Chinese Simplified"},chinese_traditional:{code:"zh-tw",isRTL:!1,displayName:"Chinese Traditional"},croatian:{code:"hr",isRTL:!1,displayName:"Croatian"},czech:{code:"cs",isRTL:!1,displayName:"Czech"},danish:{code:"da",isRTL:!1,displayName:"Danish"},dutch:{code:"nl",isRTL:!1,displayName:"Dutch"},english:{code:"en",isRTL:!1,displayName:"English"},finnish:{code:"fi",isRTL:!1,displayName:"Finnish"},french:{code:"fr",isRTL:!1,displayName:"French"},german:{code:"de",isRTL:!1,displayName:"German"},greek:{code:"el",isRTL:!1,displayName:"Greek"},hebrew:{code:"iw",isRTL:!0,displayName:"Hebrew"},hungarian:{code:"hu",isRTL:!1,displayName:"Hungarian"},indonesian:{code:"id",isRTL:!1,displayName:"Indonesian"},italian:{code:"it",isRTL:!1,displayName:"Italian"},japanese:{code:"ja",isRTL:!1,displayName:"Japanese"},kazakh:{code:"kk",isRTL:!1,displayName:"Kazakh"},korean:{code:"ko",isRTL:!1,displayName:"Korean"},macedonian:{code:"mk",isRTL:!1,displayName:"Macedonian",disabled:!0},norwegian_bokmal:{code:"no",isRTL:!1,displayName:"Norwegian Bokmal"},polish:{code:"pl",isRTL:!1,displayName:"Polish"},portuguese:{code:"pt",isRTL:!1,displayName:"Portuguese"},portuguese_brazilian:{code:"pt-br",isRTL:!1,displayName:"Portuguese Brazilian"},romanian:{code:"ro",isRTL:!1,displayName:"Romanian"},russian:{code:"ru",isRTL:!1,displayName:"Russian"},slovak:{code:"sk",isRTL:!1,displayName:"Slovak"},slovenian:{code:"sl",isRTL:!1,displayName:"Slovenian"},spanish:{code:"es",isRTL:!1,displayName:"Spanish"},serbian:{code:"sr",isRTL:!1,displayName:"Serbian"},swedish:{code:"sv",isRTL:!1,displayName:"Swedish"},thai:{code:"th",isRTL:!1,displayName:"Thai"},turkish:{code:"tr",isRTL:!1,displayName:"Turkish"}};
if(!e.config.language_list){
var i={},o=[];
for(var a in n){
if("undefined"==typeof n[a].disabled||!n[a].disabled){
var r=e.lang.ibmlanguagedropdown[a]+(n[a].isRTL?":rtl":"");
i[n[a].code]=r,o.push(r);
}
}
o.sort(t),e.config.language_list=[];
for(var s=0;s<o.length;s++){
for(key in i){
var l=i[key];
if(l===o[s]){
e.config.language_list.push(key+":"+o[s]);
break;
}
}
}
}
},init:function(e){
var t=e.config.language_list||["ar:Arabic:rtl","fr:French","es:Spanish"];
for(i=0;i<t.length;i++){
parts=t[i].split(":"),curLanguageId=parts[0],languageButtonId="language_"+curLanguageId,e.getMenuItem(languageButtonId).style.getDefinition().attributes.style="font-size:14px;font-family:courier new,courier,monospace;";
}
e.on("menuShow",function(t){
for(var n=t.data[0]||t.data,i=n.element.getElementsByTag("iframe").getItem(0),o=i.getFrameDocument(),a=o.getBody().getElementsByTag("div"),r=0;r<a.count();r++){
var s=a.getItem(r),l=s.getAttribute("style");
if("cke_panel_block"==s.getAttribute("class")&&(!l||"display: none;"!=l)){
var d=s.getElementsByTag("div").getItem(0);
if("cke_menu"==d.getAttribute("class")||d.getAttribute("class").replace(/ /g,"")=="cke_menu cke_mixed_dir_content".replace(/ /g,"")){
var c=d.getElementsByTag("a").getItem(0).getAttribute("class"),u=i.getParent();
i.removeClass("cke_language_menu_iframe"),u.removeClass("cke_language_menu_div");
for(var h=o.getBody().getElementsByTag("span"),r=0;r<h.count();r++){
var f=h.getItem(r);
(f&&f.getAttribute("class")&&f.getAttribute("class").indexOf("cke_button_icon cke_button__language_")>-1||"cke_button_icon cke_button__language_remove_icon"==f.getAttribute("class"))&&f.setAttribute("style","display: none;");
}
if(i.getFrameDocument().getBody().getParent().getStyle("overflow")||i.getFrameDocument().getBody().getParent().setAttribute("style","overflow: hidden;"),c.indexOf("language")>0){
e.config.language_list&&e.config.language_list.length>9&&(i.getFrameDocument().getBody().getParent().removeStyle("overflow"),i.setAttribute("class",i.getAttribute("class")+" cke_language_menu_iframe")),u.setAttribute("class",u.getAttribute("class")+" cke_language_menu_div");
break;
}
}
}
}
});
}}),function(){
function e(e){
return e?e.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?e.container.getText().length:e.document.getBody().getText().length:void 0;
};
CKEDITOR.plugins.add("ibmcharactercounter",{getCharactersCount:e});
}(),CKEDITOR.plugins.add("ibmbinaryimagehandler",{lang:"ar,ca,cs,da,de,el,en,es,fi,fr,he,hr,hu,it,iw,ja,kk,ko,nb,nl,no,pl,pt,pt-br,ro,ru,sk,sl,sv,th,tr,uk,zh,zh-cn,zh-tw",init:function(e){
function t(e,t){
var n=[];
if(!t){
return e;
}
for(var i in t){
n.push(i+"="+encodeURIComponent(t[i]));
}
return e+(-1!=e.indexOf("?")?"&":"?")+n.join("&");
};
function n(t){
if(t.type.match("image.*")){
var n=new FileReader;
n.onload=function(){
var i=n.result;
null!=i&&e.fire("paste",{size:t.size,type:t.type,name:t.name,dataValue:"<img src=\""+i+"\">"});
},n.readAsDataURL(t);
}
};
var i=/<img[^>]*>/i;
if(e.on("contentDom",function(t){
t.editor.document.on("drop",function(t){
if(CKEDITOR.env.mac&&CKEDITOR.env.safari){
var n=t.data.$.dataTransfer.getData("text/uri-list");
if(n&&-1!=t.data.$.dataTransfer.types.indexOf("image/tiff")){
var i=/<img[^>]+src=["']{1}(data:image\/(?:(?!["'])[\w\W])*)["']{1}[^>]*[\/]?>/gi,o="<img src=\""+n+"\">";
i.test(o)||(t.data.$.preventDefault(),e.fire("paste",{dataValue:o}));
}
}
},null,null,0);
},null,null,0),(/\S/.test(e.config.ibmBinaryImageUploadUrl)||e.config.ibmPublishBinaryData)&&!e.config.ibmFilterPastedDataUriImage){
var o=document.createElement("iframe");
o.style.display="none",document.body.appendChild(o);
var a=CKEDITOR.tools.addFunction(function(t,n){
if(t){
for(var i=0;i<t.length;i++){
var o=t[i],a=o.id,r=o.url,s=e.document.getById(a);
s&&(s.setAttribute("src",r),s.setAttribute("data-cke-saved-src",r));
}
e.fire("updateSnapshot");
}
},this),r=CKEDITOR.tools.addFunction(function(t,n){
if(t){
for(var i=0;i<t.length;i++){
var o=t[i],a=e.document.getById(o);
a&&a.remove();
}
e.fire("updateSnapshot");
}
},this);
e.on("destroy",function(){
document.body.removeChild(o);
}),e.on("paste",function(e){
if(CKEDITOR.env.ie&&CKEDITOR.env.edge&&e.data&&!e.data.dataValue&&e.data.dataTransfer&&e.data.dataTransfer.$.items){
var t=e.data.dataTransfer.$.items;
if(t&&1==t.length){
for(var i=0;i<t.length;i++){
if(-1!==t[i].type.indexOf("image")){
var o=t[i].getAsFile();
e.cancel(),e.stop(),n(o);
break;
}
}
}
}
}),e.on("paste",function(n){
var i=/<img[^>]+src=["']{1}(data:image\/(?:(?!["'])[\w\W])*)["']{1}[^>]*[\/]?>/gi,s=/src=["']data:image\/[^('|")]*["']/i,l=n.data.dataValue,d=CKEDITOR.env.ie?o.contentWindow.document:o.contentDocument;
if(i.test(l)){
var c=(new Date).getTime(),u={};
if(e.config.ibmBinaryImageUploadUrl){
var h=document.createElement("form");
h.enctype="multipart/form-data",h.method="POST",u.CKEditor=e.name,u.CKEditorFuncNum=a,u.CKEditorDeleteFuncNum=r,u.Timestamp=c,u.idMapping=[];
}
for(var f=l.match(i),m=[],g=0;g<f.length;g++){
var p=c+"_"+g,E=f[g].match(s);
if(l=l.replace(f[g],f[g].replace("<img","<img id=\""+p+"\"")),e.config.ibmPublishBinaryData){
var T=new Object;
T.data=E,n.data.name&&(T.name=n.data.name,n.data.size&&(T.size=n.data.size),n.data.type&&(T.type=n.data.type)),T.id=p;
}else{
var C="imageUri"+g;
u.idMapping.push("\""+C+"\":\""+p+"\""),h.innerHTML+="<input type=\"text\" name=\""+C+"\" value="+E+">";
}
m.push(T);
}
e.config.ibmPublishBinaryData?e.config.ibmPublishBinaryData(a,r,e.name,m):(h.action=t(e.config.ibmBinaryImageUploadUrl,u),d.body.appendChild(h),h.submit()),n.data.dataValue=l;
}
}),e.on("contentDom",function(t){
CKEDITOR.env.webkit&&e.document.on("paste",function(e){
var t=e.data.$.clipboardData.items;
if(t&&(1==t.length||e.data.$.clipboardData.files.length>0)){
for(var i=0;i<t.length&&(-1===t[i].type.indexOf("text/rtf")&&-1===t[i].type.indexOf("application/rtf")&&-1===t[i].type.indexOf("application/x-rtf"));i++){
if(-1!==t[i].type.indexOf("image")){
var o=t[i].getAsFile();
e.data.$.preventDefault(),n(o);
}
}
}
}),t.editor.document.on("drop",function(t){
var o=CKEDITOR.env.ie?"url":"text/html",a=CKEDITOR.env.ie?"<img src=\""+t.data.$.dataTransfer.getData(o)+"\">":t.data.$.dataTransfer.getData(o);
CKEDITOR.env.mac&&(a=/\S/.test(t.data.$.dataTransfer.getData("url"))?"<img src=\""+t.data.$.dataTransfer.getData("url")+"\">":t.data.$.dataTransfer.getData("text/html"));
var r=/<img[^>]+src=["']{1}(data:image\/(?:(?!["'])[\w\W])*)["']{1}[^>]*[\/]?>/gi;
if(i.test(a)&&r.test(a)){
t.data.$.preventDefault(),e.fire("paste",{dataValue:a});
}else{
if(t.data.$.dataTransfer.files.length>0){
t.data.$.preventDefault();
for(var s=t.data.$.dataTransfer.files,l=0;l<s.length;l++){
var d=s[l];
d.type.match("image.*")&&n(s[l]);
}
}
}
});
});
}
}}),function(){
function e(e){
if(e.config.ibmPermanentpenCookies){
var t=i();
e.config.textColor=t&&t.textColor?t.textColor:"",e.config.bgColor=t&&t.bgColor?t.bgColor:"",e.config.fontName=t&&t.fontName?t.fontName:"",e.config.fontSize=t&&t.fontSize?t.fontSize:"",e.config.boldValue=t&&t.boldValue?t.boldValue:!1,e.config.italicValue=t&&t.italicValue?t.italicValue:!1,e.config.underlineValue=t&&t.underlineValue?t.underlineValue:!1,e.config.strikethroughValue=t&&t.strikethroughValue?t.strikethroughValue:!1;
}else{
e.config.ibmPermanentPenStyle?(e.config.textColor=e.config.ibmPermanentPenStyle.textColor?e.config.ibmPermanentPenStyle.textColor:"",e.config.bgColor=e.config.ibmPermanentPenStyle.bgColor?e.config.ibmPermanentPenStyle.bgColor:"",e.config.fontName=e.config.ibmPermanentPenStyle.fontName?e.config.ibmPermanentPenStyle.fontName:"",e.config.fontSize=e.config.ibmPermanentPenStyle.fontSize?e.config.ibmPermanentPenStyle.fontSize:"",e.config.boldValue=e.config.ibmPermanentPenStyle.boldValue?e.config.ibmPermanentPenStyle.boldValue:!1,e.config.italicValue=e.config.ibmPermanentPenStyle.italicValue?e.config.ibmPermanentPenStyle.italicValue:!1,e.config.underlineValue=e.config.ibmPermanentPenStyle.underlineValue?e.config.ibmPermanentPenStyle.underlineValue:!1,e.config.strikethroughValue=e.config.ibmPermanentPenStyle.strikethroughValue?e.config.ibmPermanentPenStyle.strikethroughValue:!1):(e.config.textColor="",e.config.bgColor="",e.config.fontName="",e.config.fontSize="",e.config.boldValue="",e.config.italicValue=!1,e.config.underlineValue=!1,e.config.strikethroughValue=!1);
}
};
function t(e){
var t=new Object;
t.textColor=e.config.textColor,t.bgColor=e.config.bgColor,t.fontName=e.config.fontName,t.fontSize=e.config.fontSize,t.boldValue=e.config.boldValue,t.italicValue=e.config.italicValue,t.underlineValue=e.config.underlineValue,t.strikethroughValue=e.config.strikethroughValue;
var n=new Date;
n.setFullYear(n.getFullYear()+1);
var i,o=e.config.ibmCookieMaxAge?e.config.ibmCookieMaxAge:n.toGMTString();
i=window.btoa?window.btoa(JSON.stringify(t)):encodeURIComponent(JSON.stringify(t)),document.cookie="ibmpermanentpen="+i+(e.config.baseDomain?";domain="+e.config.ibmBaseDomain:"")+";expires="+o+";path=/;";
};
function n(e){
for(var t=e+"=",n=document.cookie.split(";"),i=0;i<n.length;i++){
for(var o=n[i];" "==o.charAt(0);){
o=o.substring(1,o.length);
}
if(0==o.indexOf(t)){
return o.substring(t.length,o.length);
}
}
return null;
};
function i(){
var e=n("ibmpermanentpen");
if(e){
var t,i;
try{
return t=window.atob?JSON.parse(window.atob(e)):JSON.parse(decodeURIComponent(e)),i=new Object,i.textColor=t.textColor,i.bgColor=t.bgColor,i.fontName=t.fontName,i.fontSize=t.fontSize,i.boldValue=t.boldValue,i.italicValue=t.italicValue,i.underlineValue=t.underlineValue,i.strikethroughValue=t.strikethroughValue,i;
}
catch(o){
return null;
}
}
return null;
};
function o(t){
e(t),t.config.textColor||t.config.bgColor||t.config.fontName||t.config.fontSize||t.config.boldValue||t.config.italicValue||t.config.underlineValue||t.config.strikethroughValue||(t.config.textColor="#ff0000",t.config.fontName="Arial, Helvetica, sans-serif",t.config.fontSize="12px",t.config.boldValue=!0);
};
function a(e,t,n,i,o){
return "string"==typeof e&&t&&(i||o)&&(e.length>0&&(e+=" "),e+=t+":"+(n&&i?i:o)+";"),e;
};
function r(e){
var t=e.getSelection(),n=t&&t.getStartElement(),i=e.elementPath(n);
n=i&&i.block||i&&i.blockLimit||e.document&&e.document.getBody(),color=n&&n.getComputedStyle("color")||"#222",size=n&&n.getComputedStyle("font-size")||"12px",bgcolor="transparent",font=n&&n.getComputedStyle("font-family")||"Arial, Helvetica, sans-serif";
var o={};
o["class"]="ibmpermanentpen",o.style="";
var r="";
return r=a(r,"color",e.config.textColor,e.config.textColor,color),r=a(r,"background-color",e.config.bgColor,e.config.bgColor,bgcolor),r=a(r,"font-family",e.config.fontName,e.config.fontName,font),r=a(r,"font-size",e.config.fontSize,e.config.fontSize,size),o.style=r,new CKEDITOR.style({element:"span",attributes:o});
};
function s(e,t,n,i){
if(t.type===CKEDITOR.NODE_ELEMENT&&t.getName){
var o,a,r=t.getName();
switch(r){
case "span":
if(t.hasClass("ibmpermanentpen")&&t.getAttribute("style")){
var l=function(e){
for(var t={},n=e.split(";"),i=0;i<n.length;i++){
var o=n[i].split(":");
2==o.length&&(t[o[0].replace(/\s/g,"")]=o[1].replace(/\s/g,""));
}
return t;
},d=l(CKEDITOR.tools.convertRgbToHex(t.getAttribute("style"))),c=CKEDITOR.style.getStyleText(n);
CKEDITOR.env.ie&&CKEDITOR.env.version<9&&(c=""!==c?c:n._.definition._ST);
var u=l(CKEDITOR.tools.convertRgbToHex(c));
if(u["background-color"]!==d["background-color"]||u.color!==d.color||u["font-family"]!==d["font-family"]||u["font-size"]!==d["font-size"]){
return o=e.splitElement(t),a=i.createRange(),o?(a.setStartBefore(o),i.getSelection().selectRanges([a]),s(a,o.getParent(),n,i)):t;
}
}
return t;
case "em":
case "strong":
case "i":
case "u":
case "s":
case "b":
return o=e.splitElement(t),a=i.createRange(),o?(a.setStartBefore(o),i.getSelection().selectRanges([a]),s(a,o.getParent(),n,i)):t;
default:
return t;
}
}
};
function l(e){
return (e.config.boldValue&&1!=e.getCommand("bold").state||!e.config.boldValue&&2!=e.getCommand("bold").state)&&0!=e.getCommand("bold").state||(e.config.underlineValue&&1!=e.getCommand("underline").state||!e.config.underlineValue&&2!=e.getCommand("underline").state)&&0!=e.getCommand("underline").state||(e.config.strikethroughValue&&1!=e.getCommand("strike").state||!e.config.strikethroughValue&&2!=e.getCommand("strike").state)&&0!=e.getCommand("strike").state||(e.config.italicValue&&1!=e.getCommand("italic").state||!e.config.italicValue&&2!=e.getCommand("italic").state)&&0!=e.getCommand("italic").state?!1:!0;
};
var d={readOnly:1,preserveState:!0,editorFocus:!0,allowedContent:"span[!class]{background-color, color, font-family, font-size}; strong b em i s u;",requiredContent:["span[class]{color, font-family, font-size}","span(ibmpermanentpen){color, font-family, font-size}"],exec:function(e){
this.toggleState(),this.refresh(e);
},refresh:function(e){
if(e.document){
if(this.state==CKEDITOR.TRISTATE_ON){
e.config.displayPermamentPenMenu=!0,e.config.styleDefined||o(e);
}else{
e.config.displayPermamentPenMenu=!1;
var t,n=e.getSelection().getRanges()[0],i=n.endContainer,a=r(e);
i.getParents();
e.fire("lockSnapshot");
var l=new CKEDITOR.dom.element("span");
a.applyToObject(l,e);
for(var d=i;d&&d.getParent();){
var c=d.getParent();
if(c){
if(c.getName&&"span"==c.getName()){
var u,h;
if(l.getAttribute("style")&&(u=CKEDITOR.tools.convertRgbToHex(l.getAttribute("style"))),c.getAttribute("style")&&(h=CKEDITOR.tools.convertRgbToHex(c.getAttribute("style"))),u===h){
t=c;
break;
}
}
d=c;
}
}
if(t&&(i.type==CKEDITOR.NODE_TEXT?s(n,i.getParent(),a,e):s(n,i,a,e),t.getAttribute("class")&&t.getAttribute("class").indexOf("ibmpermanentpen")<0)){
n=e.getSelection().getRanges()[0];
var f=n.splitElement(t);
if(f){
var m=e.createRange();
m.setStartBefore(f),m.setEndBefore(f),m.select();
}
}
e.fire("unlockSnapshot");
}
}
}};
CKEDITOR.plugins.add("ibmpermanentpen",{lang:"ar,ca,cs,da,de,el,en,es,fi,fr,he,hr,hu,it,iw,ja,kk,ko,nb,nl,no,pl,pt,pt-br,ro,ru,sk,sl,sv,th,tr,uk,zh,zh-cn,zh-tw",requires:["colordialog","basicstyles","dialog"],init:function(e){
e.addCommand("ibmpermanentpen",d);
e.addMenuItems&&(e.addMenuGroup("permanentpen",2),e.addMenuItems({pen:{label:e.lang.ibmpermanentpen.title,icon:"ibmpermanentpen",command:"pen",group:"permanentpen",order:16}}),e.contextMenu.addListener(function(){
return e.getCommand("ibmpermanentpen").state==CKEDITOR.TRISTATE_ON?{pen:CKEDITOR.TRISTATE_OFF}:null;
})),e.ui.addButton("IbmPermanentPen",{label:e.lang.ibmpermanentpen.pen,command:"ibmpermanentpen"}),CKEDITOR.dialog.add("permanentpen",this.path+"dialogs/permanentpen.js"),e.addCommand("pen",new CKEDITOR.dialogCommand("permanentpen")),e.config.blockedKeystrokes.push(CKEDITOR.CTRL+CKEDITOR.ALT+84),e.setKeystroke(CKEDITOR.CTRL+CKEDITOR.ALT+84,"ibmpermanentpen"),e.on("blur",function(){
e.getCommand("ibmpermanentpen").setState(CKEDITOR.TRISTATE_OFF),e.config.styleDefined=!1;
}),e.on("key",function(n){
if(e.getCommand("ibmpermanentpen").state==CKEDITOR.TRISTATE_ON&&n.data&&!n.data.domEvent.$.ctrlKey&&!n.data.domEvent.$.altKey){
var i=r(e),o=e.getSelection().getRanges()[0],a=o.endContainer,d=a.getParent(),c=a.getParents(),u=!1,h=l(e);
if(i){
for(var f in c){
if(c[f].getName&&"span"==c[f].getName()&&"ibmpermanentpen"==c[f].getAttribute("class")){
var m=new CKEDITOR.dom.element("span");
i.applyToObject(m,e);
var g,p;
if(m.getAttribute("style")&&(g=CKEDITOR.tools.convertRgbToHex(m.getAttribute("style"))),c[f].getAttribute("style")&&(p=CKEDITOR.tools.convertRgbToHex(c[f].getAttribute("style"))),g===p){
u=!0;
break;
}
}
}
u&&h||s(o,d,i,e),h&&u||(e.fire("saveSnapshot"),e.applyStyle(i),e.fire("saveSnapshot"),e.config.ibmPermanentpenCookies&&t(e)),h&&u||(e.fire("lockSnapshot"),(e.config.boldValue&&1!=e.getCommand("bold").state||!e.config.boldValue&&2!=e.getCommand("bold").state)&&e.execCommand("bold"),(e.config.underlineValue&&1!=e.getCommand("underline").state||!e.config.underlineValue&&2!=e.getCommand("underline").state)&&e.execCommand("underline"),(e.config.strikethroughValue&&1!=e.getCommand("strike").state||!e.config.strikethroughValue&&2!=e.getCommand("strike").state)&&e.execCommand("strike"),(e.config.italicValue&&1!=e.getCommand("italic").state||!e.config.italicValue&&2!=e.getCommand("italic").state)&&e.execCommand("italic"),e.fire("unlockSnapshot"));
}
}
},null,null,1);
}});
}(),function(){
function e(e,t){
this.editor=e,this.lastMatched=null,this.ignoreNext=!1,this.callback=t,this.ignoredKeys={16:1,17:1,18:1,91:1};
};
CKEDITOR.plugins.add("textwatcher",{}),e.prototype={attach:function(){
function e(){
var e=i.editable();
e.attachListener(e,"keyup",t,this),e.attachListener(e,"mouseup",t,this);
};
function t(e){
this.check(e);
};
function n(){
this.unmatch();
};
var i=this.editor;
i.on("contentDom",e,this),i.on("focus",t,this),i.on("blur",n,this),i.on("beforeModeUnload",n,this),i.on("setData",n,this),i.on("afterCommandExec",t,this),i.editable()&&e.call(this);
},check:function(e){
if(this.ignoreNext){
return void (this.ignoreNext=!1);
}
if(!(e&&"keyup"==e.name&&e.data.getKey() in this.ignoredKeys)){
var t=this.editor.getSelection();
if(t){
var n=t.getRanges()[0];
if(n){
var i=this.callback(n);
if(i){
if(i.text==this.lastMatched){
return;
}
this.lastMatched=i.text,this.fire("matched",i);
}else{
this.lastMatched&&this.unmatch();
}
}
}
}
},consumeNext:function(){
return this.ignoreNext=!0,this;
},unmatch:function(){
return this.lastMatched=null,this.fire("unmatched"),this;
}},CKEDITOR.event.implementOn(e.prototype),CKEDITOR.plugins.textWatcher=e;
}(),function(){
function e(i,o){
if(!t(i.startContainer)){
var a,r,s=i.clone();
for(o?s.setEndAt(s.root,CKEDITOR.POSITION_BEFORE_END):s.setStart(s.root,0),r=new CKEDITOR.dom.walker(s),r.guard=n;a=r[o?"next":"previous"]();){
if(t(a)){
return void i.moveToPosition(a,o?CKEDITOR.POSITION_AFTER_START:CKEDITOR.POSITION_BEFORE_END);
}
}
o||e(i,!0);
}
};
function t(e){
return e.type==CKEDITOR.NODE_TEXT&&!a(e);
};
function n(e){
return e.type!=CKEDITOR.NODE_ELEMENT?!0:!e.is(CKEDITOR.dtd.$inline)||e.is(CKEDITOR.dtd.$empty)?!1:!0;
};
function i(e){
return e.type==CKEDITOR.NODE_ELEMENT?e.getChildCount():e.getLength();
};
CKEDITOR.plugins.add("caretposition",{});
var o="function"!=typeof window.getSelection;
CKEDITOR.dom.selection.prototype.getCaretPosition=function(){
if(o){
var e=this.document.$.selection.createRange(),t=e.getBoundingClientRect();
return {left:t.left,top:t.top,height:t.bottom-t.top};
}
return this.getRanges()[0].getClientPosition();
},CKEDITOR.dom.range.prototype.getClientPosition=function(){
var t,n=this.document.$.createRange(),o=this.clone();
e(o),n.setStart(o.startContainer.$,o.startOffset),n.setEnd(o.endContainer.$,o.endOffset),o.startOffset>0?(n.setStart(o.startContainer.$,o.startOffset-1),t=!0):i(o.startContainer)>o.startOffset&&n.setEnd(o.startContainer.$,o.startOffset+1);
var a=n.getBoundingClientRect(),r=a.left;
return t&&(r=a.right),{left:r,top:a.top,height:a.height};
};
var a=CKEDITOR.dom.walker.whitespaces();
}(),function(){
function e(e,t,n,i){
this.editor=e,this.view=this.getView(),this.model=this.getModel(n),this.textWatcher=this.getTextWatcher(t),this.widget=e.widgets&&e.widgets.registered[i]?i:!1,this.isMatching=!1,this.attach();
};
function t(e){
this.itemTemplate=new CKEDITOR.template("<li data-id=\"{id}\">{name}</li>"),this.editor=e;
};
function n(e){
this.dataCallback=e,this.isPanelActive=!1;
};
CKEDITOR.plugins.add("autocomplete",{requires:"textwatcher,caretposition"}),e.prototype={attach:function(){
function e(){
t.editable().on("keydown",function(e){
this.onKeyDown(e);
},this,null,5);
};
var t=this.editor;
this.view.append(),this.view.attach(),this.textWatcher.attach(),this.textWatcher.on("matched",this.onTextMatched,this),this.textWatcher.on("unmatched",this.onTextUnmatched,this),this.model.on("change-data",this.onData,this),this.model.on("change-selectedItemId",this.onSelectedItemId,this),this.view.on("click-item",this.onItemClick,this),t.on("contentDom",e,this),t.on("change",function(){
this.onChange();
},this),t.editable()&&e.call(this);
},close:function(){
this.model.setPanelActive(!1),this.view.close();
},commit:function(e){
if(this.model.isPanelActive&&(this.close(),null!=e||(e=this.model.selectedItemId,null!=e))){
var t=this.model.getItemById(e),n=this.editor;
n.fire("saveSnapshot"),n.getSelection().selectRanges([this.model.range]),this.widget?this.insertWidget(t):n.insertHtml(this.getHtmlToInsert(t),"text"),n.fire("saveSnapshot");
}
},insertWidget:function(e){
return this.editor.execCommand(this.widget,{startupData:e}),this.editor.widgets.selected[0];
},getHtmlToInsert:function(e){
return e.name;
},getModel:function(e){
return new n(e);
},getTextWatcher:function(e){
return new CKEDITOR.plugins.textWatcher(this.editor,e);
},getView:function(){
return new t(this.editor);
},open:function(){
this.model.hasData()&&(this.model.setPanelActive(!0),this.view.open(),this.view.updatePosition());
},onChange:function(){
this.model.isPanelActive&&this.view.updatePosition();
},onData:function(e){
this.model.hasData()&&this.isMatching?(this.view.updateItems(e.data),this.open()):this.close();
},onItemClick:function(e){
this.commit(e.data);
},onKeyDown:function(e){
if(this.model.isPanelActive){
var t=e.data.getKey(),n=!1;
27==t?(this.close(),this.textWatcher.unmatch(),n=!0):40==t?(this.model.selectNext(),n=!0):38==t?(this.model.selectPrevious(),n=!0):13==t&&(this.commit(),this.textWatcher.unmatch(),n=!0),n&&(e.cancel(),e.data.preventDefault(),this.textWatcher.consumeNext());
}
},onSelectedItemId:function(e){
this.view.selectItem(e.data);
},onTextMatched:function(e){
this.isMatching=!0,this.model.setPanelActive(!1),this.model.setQuery(e.data.text,e.data.range);
},onTextUnmatched:function(){
this.isMatching=!1,this.close();
}},t.prototype={append:function(){
this.document=CKEDITOR.document,this.element=this.createElement(),this.document.getBody().append(this.element);
},appendItems:function(e){
this.element.setHtml(""),this.element.append(e);
},attach:function(){
this.element.on("click",function(e){
var t=e.data.getTarget(),n=t.getAscendant(this.isItemElement,!0);
n&&this.fire("click-item",n.data("id"));
},this);
},close:function(){
this.element.removeClass("cke_autocomplete_opened");
},createElement:function(){
var e=new CKEDITOR.dom.element("ul",this.document);
return e.addClass("cke_autocomplete_panel"),e.setStyle("z-index",this.editor.config.baseFloatZIndex-3),e;
},createItem:function(e){
return CKEDITOR.dom.element.createFromHtml(this.itemTemplate.output(e),this.document);
},getCaretRect:function(){
var e,t=this.editor.getSelection().getCaretPosition(),n=this.editor.editable();
return e=n.isInline()?CKEDITOR.document.getWindow().getScrollPosition():n.getParent().getDocumentPosition(CKEDITOR.document),{top:t.top+e.y,bottom:t.top+t.height+e.y,left:t.left+e.x};
},getItemById:function(e){
return this.element.findOne("li[data-id=\""+e+"\"]");
},isItemElement:function(e){
return e.type==CKEDITOR.NODE_ELEMENT&&e.data("id");
},open:function(){
this.element.addClass("cke_autocomplete_opened");
},selectItem:function(e){
null!=this.selectedItemId&&this.getItemById(this.selectedItemId).removeClass("cke_autocomplete_selected");
var t=this.getItemById(e);
t.addClass("cke_autocomplete_selected"),this.selectedItemId=e,this.scrollElementTo(t);
},setPosition:function(e){
var t=this.document.getWindow(),n=this.element.getSize("height"),i=t.getViewPaneSize(),o=t.getScrollPosition(),a=o.x,r=o.x+i.height,s=e.top-a,l=r-e.bottom;
n>l&&s>n?this.element.setStyles({left:e.left+"px",top:e.top-n+"px"}):this.element.setStyles({left:e.left+"px",top:e.bottom+"px"});
},scrollElementTo:function(e){
e.scrollIntoParent(this.element);
},updateItems:function(e){
var t,n=new CKEDITOR.dom.documentFragment(this.document);
for(t=0;t<e.length;++t){
n.append(this.createItem(e[t]));
}
this.appendItems(n),this.selectedItemId=null;
},updatePosition:function(){
this.setPosition(this.getCaretRect());
}},CKEDITOR.event.implementOn(t.prototype),n.prototype={getIndexById:function(e){
if(!this.hasData()){
return -1;
}
for(var t=this.data,n=0,i=t.length;i>n;n++){
if(t[n].id==e){
return n;
}
}
return -1;
},getItemById:function(e){
return this.data[this.getIndexById(e)]||null;
},hasData:function(){
return this.data&&this.data.length;
},select:function(e){
if(this.getIndexById(e)<0){
throw new Error("Item with given id does not exist");
}
this.selectedItemId=e,this.fire("change-selectedItemId",e);
},selectFirst:function(){
this.hasData()&&this.select(this.data[0].id);
},selectLast:function(){
this.hasData()&&this.select(this.data[this.data.length-1].id);
},selectNext:function(){
if(null==this.selectedItemId){
return void this.selectFirst();
}
var e=this.getIndexById(this.selectedItemId);
0>e||e+1==this.data.length?this.selectFirst():this.select(this.data[e+1].id);
},selectPrevious:function(){
if(null==this.selectedItemId){
return void this.selectLast();
}
var e=this.getIndexById(this.selectedItemId);
0>=e?this.selectLast():this.select(this.data[e-1].id);
},setPanelActive:function(e){
this.isPanelActive=e,this.fire("change-isPanelActive",e);
},setQuery:function(e,t){
var n=this,i=CKEDITOR.tools.getNextId();
this.lastRequestId=i,this.query=e,this.range=t,this.data=null,this.selectedItemId=null,this.dataCallback(e,t,function(e){
i==n.lastRequestId&&(n.data=e,n.fire("change-data",e));
});
}},CKEDITOR.event.implementOn(n.prototype),CKEDITOR.plugins.autocomplete=e,e.view=t,e.model=n;
}(),function(){
function e(e,t){
for(var n=e.length,i=0,o=0;n>o;o+=1){
var a=e[o];
if(t>=i&&i+a.getText().length>=t){
return {element:a,offset:t-i};
}
i+=a.getText().length;
}
return null;
};
function t(e,t){
for(var n=0;n<e.length;n++){
if(t(e[n])){
return n;
}
}
return -1;
};
CKEDITOR.plugins.add("textmatch",{}),CKEDITOR.plugins.textMatch={},CKEDITOR.plugins.textMatch.match=function(e,t){
var n=CKEDITOR.plugins.textMatch.getTextAndOffset(e),i=t(n.text,n.offset);
return i?{range:CKEDITOR.plugins.textMatch.getRangeInText(e,i.start,i.end),text:n.text.slice(i.start,i.end)}:null;
},CKEDITOR.plugins.textMatch.getTextAndOffset=function(e){
if(!e.collapsed){
return null;
}
var n,i="",o=0,a=CKEDITOR.plugins.textMatch.getAdjacentTextNodes(e),r=!1,s=e.startContainer.type!=CKEDITOR.NODE_ELEMENT;
n=s?t(a,function(t){
return e.startContainer.equals(t);
}):e.startOffset-(a[0]?a[0].getIndex():0);
for(var l=a.length,d=0;l>d;d+=1){
var c=a[d];
i+=c.getText(),r||(s?d==n?(r=!0,o+=e.startOffset):o+=c.getText().length:(d==n&&(r=!0),d>0&&(o+=a[d-1].getText().length),l==n&&d+1==l&&(o+=c.getText().length)));
}
return {text:i,offset:o};
},CKEDITOR.plugins.textMatch.getRangeInText=function(t,n,i){
var o=new CKEDITOR.dom.range(t.root),a=CKEDITOR.plugins.textMatch.getAdjacentTextNodes(t),r=e(a,n),s=e(a,i);
return o.setStart(r.element,r.offset),o.setEnd(s.element,s.offset),o;
},CKEDITOR.plugins.textMatch.getAdjacentTextNodes=function(e){
if(!e.collapsed){
return [];
}
var t,n,i,o,a=[];
for(e.startContainer.type!=CKEDITOR.NODE_ELEMENT?(t=e.startContainer.getParent().getChildren(),n=e.startContainer.getIndex()):(t=e.startContainer.getChildren(),n=e.startOffset),o=n;(i=t.getItem(--o))&&i.type==CKEDITOR.NODE_TEXT;){
a.unshift(i);
}
for(o=n;(i=t.getItem(o++))&&i.type==CKEDITOR.NODE_TEXT;){
a.push(i);
}
return a;
};
}(),function(){
CKEDITOR.plugins.add("ibmmentions",{requires:"autocomplete,textmatch",onLoad:function(){
function e(e){
n.call(this,e),this.itemTemplate=new CKEDITOR.template(e.config.mentions_itemTemplate?e.config.mentions_itemTemplate:"<li data-id=\"{id}\">{name}&nbsp;&lt;{email}&gt;</li>");
};
function t(e){
i.call(this,e,autocompleteUtils.getTextTestCallback(e.config.mentionsChar?e.config.mentionsChar:"@",e.config.mentions_minChars?e.config.mentions_minChars:2,!1),autocompleteUtils.getSyncDataCallback());
};
var n=CKEDITOR.plugins.autocomplete.view,i=CKEDITOR.plugins.autocomplete;
e.prototype=CKEDITOR.tools.prototypedCopy(n.prototype),t.prototype=CKEDITOR.tools.prototypedCopy(i.prototype),t.prototype.getHtmlToInsert=function(e){
return setTimeout(function(){
this.editor.fire("mentionComplete","",this.editor);
},500),editor.config.mentions_elementTemplate?"<a class=\"fn url\" href=\"javascript:void(0);\" role=\"button\">"+(editor.config.mentionsChar?editor.config.mentionsChar:"@")+e.name+"</a>":"<span class=\"vcard\" data-mentions='{\"displayName\":"+e.name+",\"userId\":"+e.id+",\"type\":\"PersonMentions\",\"hasSymbol\":true}'><a href=\"javascript:void(0);\" class=\"fn url\" role=\"button\">"+(editor.config.mentionsChar?editor.config.mentionsChar:"@")+e.name+"</a><span class=\"x-lconn-userid\" style=\"display: none\">"+e.id+"</span></span>";
},t.prototype.getView=function(){
return new e(this.editor);
},CKEDITOR.plugins.ibmMentionsAutocomplete=t;
}});
}(),function(){
function e(e,t){
if("video"==t.type||"rich"==t.type){
return t.html;
}
if(t.thumbnails){
var n,i=/\.(gif|jpg|jpeg|tiff|png)$/i;
if(t.title&&(n=t.title),!n&&t.description&&(n=t.description),!n&&i.test(t.url)){
var o=t.url.split("/");
o=o[o.length-1],n=o;
}
var a=new CKEDITOR.dom.element("img");
a.$.onload=function(e){
var t=a.$.height,n=a.$.width;
a.setAttribute("original-width",n),a.setAttribute("original-height",t);
},a.setAttribute("style","width:100%;height:100%;");
var r=window.location.protocol;
t.thumbnails[0]="http:"==r?t.thumbnails[0].replace(/^https:/,r):t.thumbnails[0].replace(/^http:/,r),a.setAttribute("src",t.thumbnails[0]);
var s=new CKEDITOR.dom.element("a");
s.setAttribute("href",t.url),s.setAttribute("target","_blank"),s.append(a,!1);
var l={},d=new CKEDITOR.htmlParser.element("div",l);
return d.setHtml(s.getOuterHtml()),d.getOuterHtml();
}
return null;
};
CKEDITOR.plugins.add("ibminsertmedia",{init:function(n){
n.widgets.on("instanceCreated",function(n){
var i=n.data;
i.on("sendRequest",function(e){
var n,o,a=e.data;
n=this.providerUrl,o={url:encodeURIComponent(a.url)},t.sendRequest(i,n,o,a.callback,function(e,t){
e?a.errorCallback(e):a.callback(t);
}),e.stop();
}),i.on("handleResponse",function(t){
if(t.data.html){
return void t.stop();
}
var n=e(t.data.url,t.data.response);
null!==n?(t.data.html=n,t.stop()):(t.data.errorMessage="unsupportedUrl",t.cancel());
});
});
}});
var t={sendRequest:function(e,t,n,i,o){
function a(e,t){
var n,i,o,a={style:"left: 0px; width: 100%; height: 0px; position: relative; padding-bottom: 56.2493%;"},r=new CKEDITOR.htmlParser.element("div",a),s=e.editor;
if(t.thumbnails&&t.thumbnails[0]){
var l=window.location.protocol;
t.thumbnails[0]="http:"==l?t.thumbnails[0].replace(/^https:/,l):t.thumbnails[0].replace(/^http:/,l),n=t.thumbnails[0];
}
switch(t.type){
case "video":
t.raw&&t.raw["video:url"]&&"undefined"!=typeof t.raw["video:url"]?(n=s.config.useHTTPs&&t.raw["video:secure_url"]&&"undefined"!=typeof t.raw["video:secure_url"]?t.raw["video:secure_url"][0]:t.raw["video:url"][0],i=t.raw["video:width"],o=t.raw["video:height"]):t.raw&&t.raw["twitter:player"]&&"undefined"!=typeof t.raw["twitter:player"]&&(n=t.raw["twitter:player"],i=t.raw["twitter:player:width"],o=t.raw["twitter:player:height"]);
break;
case "link":
t.raw&&t.raw["twitter:player"]&&"undefined"!=typeof t.raw["twitter:player"]&&(n=t.raw["twitter:player"],i=t.raw["twitter:player:width"],o=t.raw["twitter:player:height"]);
}
if(e.data.sizeApplied&&e.element.setStyle("width",CKEDITOR.tools.cssLength(i)),n&&"undefined"!=typeof n){
n=n.replace(/auto?play=1&?\b/g,""),-1==n.indexOf("wmode=")&&(n=n.indexOf("?")>0?n+"&wmode=opaque":n+"?wmode=opaque");
var d={style:"width: 100%; height: 100%; position: absolute; border:0","original-width":CKEDITOR.tools.cssLength(i),"original-height":CKEDITOR.tools.cssLength(o),src:n,tabindex:"-1",sandbox:"allow-scripts allow-same-origin"},c=new CKEDITOR.htmlParser.element("iframe",d);
r.add(c);
var u=r.getOuterHtml();
t.html=u;
}else{
t.html=null;
}
return t;
};
function r(e,t){
var n=new XMLHttpRequest;
return "withCredentials" in n?n.open(e,t,!0):"undefined"!=typeof XDomainRequest?(n=new XDomainRequest,n.open(e,t)):n=null,n;
};
function s(e,t){
o(e);
};
n=n||{};
var l={},d=e.editor,c=new RegExp("^(https?|notes|ftps?|news|mailto)","gi"),u=c.exec(n.url);
u||(n.url=(d.config.useHTTPs?"https://":"http://")+n.url);
var h=t.output(n),f=r("GET",h);
if(f){
f.onload=function(){
try{
clearTimeout(m);
try{
l=JSON.parse(f.response);
}
catch(t){
}
if(!l||0==Object.keys(l).length){
return void s(d.lang.ibminsertmedia.fetchingFailedGiven,e);
}
l.html||(l=a(e,l)),l.html?i(l):"link"==l.type?s(d.lang.embedbase.unsupportedUrlGiven,e):s(d.lang.ibminsertmedia.badResponse,e);
}
catch(n){
i(n);
}
},f.onerror=function(e){
i(e);
},f.send();
var m=setTimeout(function(){
f.abort(),s(d.lang.ibminsertmedia.timeout,e);
},5000);
}
}};
}(),function(){
CKEDITOR.plugins.add("ibmhtml5player",{}),CKEDITOR.ibmhtml5player=function(){
function e(){
};
function t(){
};
function n(){
};
function i(){
};
function o(e,t){
var n=e.data.keyCode;
if((9==n||n==CKEDITOR.SHIFT+9)&&e.cancel(),37==n){
var i=t.$.currentTime-3;
0>i&&(i=0),t.$.currentTime=i,e.cancel();
}
if(38==n){
var o=t.$.volume;
o+=0.05,o>1&&(o=1),t.$.volume=o,t.$.muted=!1,e.cancel();
}
if(39==n){
if(t.$.duration>=0&&t.$.duration!=Number.POSITIVE_INFINITY){
var i=t.$.currentTime+3;
t.$.duration>i?t.$.currentTime=i:t.$.currentTime=t.$.duration;
}
e.cancel();
}
if(40==n){
var o=t.$.volume;
o-=0.05,0.075>=o?t.$.muted=!0:(t.$.volume=o,t.$.muted=!1),e.cancel();
}
32==n&&(t.$.paused?(t.$.currentTime==t.$.duration&&(t.$.currentTime=0),t.$.play(),t.$.paused=!1):(t.$.pause(),t.$.paused=!0),e.cancel());
};
return {play:function(){
return e();
},pause:function(){
return t();
},mute:function(){
return n();
},unmute:function(){
return i();
},controlNavigation:function(e,t){
return o(e,t);
}};
}();
}(),function(){
var e;
CKEDITOR.plugins.add("inlinefont",{init:function(t){
var n=new e(t.config);
n.hasInlineStyles()&&(t.on("toDataFormat",function(e){
n.applyInlineStyles(e.data.dataValue);
},null,null,14),t.on("toHtml",function(e){
n.removeInlineStyles(e.data.dataValue);
},null,null,5));
}}),CKEDITOR.plugins.inlinefont={},e=CKEDITOR.plugins.inlinefont.StylesInliner=function(e){
this.applyToElements=CKEDITOR.tools.extend({},CKEDITOR.dtd.$block,CKEDITOR.dtd.$tableContent),this.excludeElements=e.inlinefont_excludeElements||{hr:1},this.defaultInlineStyles=e.inlinefont_styles,this.wrapperElementName="span",this.wrapperElementAttribute="data-cke-inlined-style";
},e.prototype={hasInlineStyles:function(){
if(!CKEDITOR.tools.isEmpty(this.defaultInlineStyles)){
for(var e=CKEDITOR.tools.objectKeys(this.defaultInlineStyles),t=e.length,n=0;t>n;n++){
if(!CKEDITOR.tools.isEmpty(this.defaultInlineStyles[e[n]])){
return !0;
}
}
}
return !1;
},applyInlineStyles:function(e,t,n,i){
for(var o,a=e.children,r=this.isEditableContext(e,n),s=r?this.getStylesForElementName(e.name,t):t,l=r&&!CKEDITOR.tools.isEmpty(s),d=null,c=0;c<a.length;){
o=a[c],this.excludeElements[o.name]?this.applyInlineStyles(o,s,r,!0):o.type==CKEDITOR.NODE_ELEMENT&&this.applyToElements[o.name]?(null!==d&&(this.applyInlineWrapper(e,s,d,c),c=d+1,d=null),this.applyInlineStyles(o,s,r)):l&&null===d&&!i&&(d=c),c++;
}
null!==d&&(this.applyInlineWrapper(e,s,d,e.children.length),d=null);
},removeInlineStyles:function(e){
var t=this;
e.forEach(function(e){
e.name==t.wrapperElementName&&e.attributes[t.wrapperElementAttribute]&&e.replaceWithChildren();
},CKEDITOR.NODE_ELEMENT,!0);
},isEditableContext:function(e,t){
return e.attributes&&"true"===e.attributes.contenteditable?!0:e.attributes&&"false"===e.attributes.contenteditable?!1:void 0!==t?t:!0;
},getStylesForElementName:function(e,t){
return CKEDITOR.tools.extend({},t||this.defaultInlineStyles.$default,this.defaultInlineStyles[e],!0);
},applyInlineWrapper:function(e,t,n,i){
for(var o=new CKEDITOR.htmlParser.cssStyle(CKEDITOR.tools.normalizeCssText(CKEDITOR.tools.writeCssText(t,!0))),a=this.createWrapper(o),r=n;i>r;r++){
a.add(e.children[r]);
}
e.children.splice(n,i-n,a);
},createWrapper:function(e){
var t=new CKEDITOR.htmlParser.element(this.wrapperElementName);
return t.attributes[this.wrapperElementAttribute]=1,e.populate(t),t;
}};
}(),CKEDITOR.config.plugins="dialogui,dialog,a11yhelp,about,basicstyles,bidi,blockquote,clipboard,button,panelbutton,panel,floatpanel,colorbutton,colordialog,menu,contextmenu,copyformatting,dialogadvtab,div,elementspath,enterkey,entities,popup,filebrowser,find,fakeobjects,flash,floatingspace,listblock,richcombo,font,format,forms,horizontalrule,htmlwriter,iframe,image,indent,indentlist,indentblock,justify,menubutton,language,link,list,liststyle,magicline,maximize,newpage,pagebreak,pastefromword,pastetext,preview,print,removeformat,resize,save,selectall,showblocks,showborders,smiley,sourcearea,specialchar,stylescombo,tab,table,tabletools,templates,toolbar,undo,wysiwygarea,tableresize,autogrow,ibmcustomdialogs,ibmimagedatauri,ibmbidi,ibmpasteiframe,ibmpastenotesdatalink,ibmpastevideo,lineutils,widget,notification,notificationaggregator,embedbase,embed,ibmpastemedialink,ibmwidgets,xml,ajax,ibmajax,ibmspellchecker,ibmstatusmessage,ibmtabletools,ibmtoolbars,ibmsametimeemoticons,ibmurllink,ibmmenuhelpmessage,ibmlanguagedropdown,ibmcharactercounter,ibmbinaryimagehandler,ibmpermanentpen,textwatcher,caretposition,autocomplete,textmatch,ibmmentions,ibminsertmedia,ibmhtml5player,inlinefont",CKEDITOR.config.skin="oneui3",function(){
var e=function(e,t){
var n=CKEDITOR.getUrl("plugins/"+t);
e=e.split(",");
for(var i=0;i<e.length;i++){
CKEDITOR.skin.icons[e[i]]={path:n,offset:-e[++i],bgsize:e[++i]};
}
};
CKEDITOR.env.hidpi?e("about,0,47px,bold,41.5,47px,italic,83,47px,strike,124.5,47px,subscript,166,47px,superscript,207.5,47px,underline,249,47px,bidiltr,290.5,47px,bidirtl,332,47px,blockquote,373.5,47px,copy-rtl,415,47px,copy,456.5,47px,cut-rtl,498,47px,cut,539.5,47px,paste-rtl,581,47px,paste,622.5,47px,bgcolor,664,47px,textcolor,705.5,47px,copyformatting,747,47px,creatediv,788.5,47px,docprops-rtl,830,47px,docprops,871.5,47px,embed,913,47px,embedsemantic,954.5,47px,find-rtl,996,47px,find,1037.5,47px,replace,1079,47px,flash,1120.5,47px,button,1162,47px,checkbox,1203.5,47px,form,1245,47px,hiddenfield,1286.5,47px,imagebutton,1328,47px,radio,1369.5,47px,select-rtl,1411,47px,select,1452.5,47px,textarea-rtl,1494,47px,textarea,1535.5,47px,textfield-rtl,1577,47px,textfield,1618.5,47px,horizontalrule,1660,47px,bidiltr-rtl,3403,auto,bidirtl-rtl,3486,auto,image_layout_center,3569,auto,image_layout_left,3652,auto,image_layout_left2,3735,auto,image_layout_right,3818,auto,subscript-rtl,3901,auto,superscript-rtl,3984,auto,info,4067,auto,ibmpermanentpen,4150,auto,ibmspellchecker,4233,auto,bookmark,4316,auto,ibmwidgets,4399,auto,ibmwidgetsproperties,4482,auto,iframe,2282.5,47px,image,2324,47px,indent-rtl,2365.5,47px,indent,2407,47px,outdent-rtl,2448.5,47px,outdent,2490,47px,justifyblock,2531.5,47px,justifycenter,2573,47px,justifyleft,2614.5,47px,justifyright,2656,47px,language,2697.5,47px,anchor-rtl,2739,47px,anchor,2780.5,47px,link,2822,47px,unlink,2863.5,47px,bulletedlist-rtl,2905,47px,bulletedlist,2946.5,47px,numberedlist-rtl,2988,47px,numberedlist-rtl,3029.5,47px,numberedlist,3071,47px,mathjax,3112.5,47px,maximize,3154,47px,newpage-rtl,3195.5,47px,newpage,3237,47px,pagebreak-rtl,3278.5,47px,pagebreak,3320,47px,pastefromword-rtl,3361.5,47px,pastefromword,3403,47px,pastetext-rtl,3444.5,47px,pastetext,3486,47px,placeholder,3527.5,47px,preview-rtl,3569,47px,preview,3610.5,47px,print,3652,47px,removeformat,3693.5,47px,save,3735,47px,selectall,3776.5,47px,showblocks-rtl,3818,47px,showblocks,3859.5,47px,smiley,3901,47px,source-rtl,3942.5,47px,source,3984,47px,sourcedialog-rtl,4025.5,47px,sourcedialog,4067,47px,specialchar,4108.5,47px,table,4150,47px,templates-rtl,4191.5,47px,templates,4233,47px,redo-rtl,4274.5,47px,redo,4316,47px,undo-rtl,4357.5,47px,undo,4399,47px,simplebox,8881,auto","icons_hidpi.png"):e("about,0,auto,bold,75,auto,italic,150,auto,strike,225,auto,subscript,300,auto,superscript,375,auto,underline,450,auto,bidiltr,525,auto,bidirtl,600,auto,blockquote,675,auto,copy-rtl,750,auto,copy,825,auto,cut-rtl,900,auto,cut,975,auto,paste-rtl,1050,auto,paste,1125,auto,bgcolor,1200,auto,textcolor,1275,auto,copyformatting,1350,auto,creatediv,1425,auto,docprops-rtl,1500,auto,docprops,1575,auto,embed,1650,auto,embedsemantic,1725,auto,find-rtl,1800,auto,find,1875,auto,replace,1950,auto,flash,2025,auto,button,2100,auto,checkbox,2175,auto,form,2250,auto,hiddenfield,2325,auto,imagebutton,2400,auto,radio,2475,auto,select-rtl,2550,auto,select,2625,auto,textarea-rtl,2700,auto,textarea,2775,auto,textfield-rtl,2850,auto,textfield,2925,auto,horizontalrule,3000,auto,bidiltr-rtl,3075,auto,bidirtl-rtl,3150,auto,image_layout_center,3225,auto,image_layout_left,3300,auto,image_layout_left2,3375,auto,image_layout_right,3450,auto,subscript-rtl,3525,auto,superscript-rtl,3600,auto,info,3675,auto,ibmpermanentpen,3750,auto,ibmspellchecker,3825,auto,bookmark,3900,auto,ibmwidgets,3975,auto,ibmwidgetsproperties,4050,auto,iframe,4125,auto,image,4200,auto,indent-rtl,4275,auto,indent,4350,auto,outdent-rtl,4425,auto,outdent,4500,auto,justifyblock,4575,auto,justifycenter,4650,auto,justifyleft,4725,auto,justifyright,4800,auto,language,4875,auto,anchor-rtl,4950,auto,anchor,5025,auto,link,5100,auto,unlink,5175,auto,bulletedlist-rtl,5250,auto,bulletedlist,5325,auto,numberedlist-rtl,5400,auto,numberedlist-rtl,5475,auto,numberedlist,5550,auto,mathjax,5625,auto,maximize,5700,auto,newpage-rtl,5775,auto,newpage,5850,auto,pagebreak-rtl,5925,auto,pagebreak,6000,auto,pastefromword-rtl,6075,auto,pastefromword,6150,auto,pastetext-rtl,6225,auto,pastetext,6300,auto,placeholder,6375,auto,preview-rtl,6450,auto,preview,6525,auto,print,6600,auto,removeformat,6675,auto,save,6750,auto,selectall,6825,auto,showblocks-rtl,6900,auto,showblocks,6975,auto,smiley,7050,auto,source-rtl,7125,auto,source,7200,auto,sourcedialog-rtl,7275,auto,sourcedialog,7350,auto,specialchar,7425,auto,table,7500,auto,templates-rtl,7575,auto,templates,7650,auto,redo-rtl,7725,auto,redo,7800,auto,undo-rtl,7875,auto,undo,7950,auto,simplebox,8025,auto","icons.png");
}());
}(),CKEDITOR&&(void 0===CKEDITOR.ibm&&(CKEDITOR.ibm={}),CKEDITOR.ibm.api={},CKEDITOR.ibm.api.newDomRange=function(e){
return new CKEDITOR.dom.range(e);
},CKEDITOR.ibm.api.newDomElement=function(e){
return new CKEDITOR.dom.element(e);
},CKEDITOR.ibm.api.newDomWalker=function(e){
return new CKEDITOR.dom.walker(e);
},function e(){
CKEDITOR.on?(CKEDITOR.on("instanceCreated",function(e){
if(CKEDITOR.connectionsAppName){
CKEDITOR.config.customConfig=null;
var t=new XMLHttpRequest;
t.open("GET",window.location.protocol+"//"+window.location.hostname+"/connections/rte/darklaunch/config/"+CKEDITOR.connectionsAppName,!1),t.send();
try{
var n=JSON.parse(t.response);
CKEDITOR.tools.extend(CKEDITOR.config,n,!0);
}
catch(i){
console.log(i);
}
}
}),CKEDITOR.on("instanceReady",function(e){
CKEDITOR.connectionsAppName&&(e.editor.connectionsAppName=CKEDITOR.connectionsAppName,delete CKEDITOR.connectionsAppName);
})):setTimeout(e,10);
}(),function t(){
CKEDITOR.on?(CKEDITOR.on("instanceCreated",function(e){
e.editor.on("langLoaded",function(e){
if(null==CKEDITOR.document.getById("svg-icons-css")&&e.editor.config.ibmEnableSvgIcons&&!(CKEDITOR.env.ie&&CKEDITOR.env.version<9)&&"ibmdesign"==e.editor.config.skin){
setIconCssFile(!1);
for(icon in CKEDITOR.skin.icons){
CKEDITOR.skin.icons[icon].path=CKEDITOR.getUrl("skins/ibmdesign/icons/svg/sprite.svg");
}
var t=CKEDITOR.document.getElementsByTag("span");
for(var n in t.$){
var i=t.$[n];
if(i&&i.className&&i.className.indexOf("cke_button_icon cke_button__")>-1){
i.className.split("cke_button__")[1].split("_icon")[0];
i.setAttribute("style","background-image:url("+CKEDITOR.getUrl("skins/ibmdesign/icons/svg/sprite.svg")+");background-position:0 0;background-size:auto;");
}
}
}
});
}),CKEDITOR.on("instanceLoaded",function(e){
!e.editor.contextMenu||!e.editor.config.ibmEnableSvgIcons||CKEDITOR.env.ie&&CKEDITOR.env.version<9||"ibmdesign"!=e.editor.config.skin||(e.editor.contextMenu.addListener(function(e){
setTimeout(function(){
setIconCssFile(!0);
},100);
}),e.editor.on("menuShow",function(){
setIconCssFile(!0);
}));
})):setTimeout(t,10);
}()),CKEDITOR.tools.extend(CKEDITOR.ibm.dialogs,{a11yHelp:function(e,t){
if("a11yHelp"===e.dialog.getName()){
var n=e.getContents("info"),i=n.get("legends");
i.html;
e.onShow=function(){
var e=this.getContentElement("info","ibmHelp").getInputElement();
e.getChildCount()>0&&"span"==e.getChild(0).getName()&&e.getChild(0).addClass("ibmHelpDocumentationUrl"),this.setupContent();
};
var o=t.config.ibmHelpDocumentationUrl?t.config.ibmHelpDocumentationUrl():"",a=CKEDITOR.tools.getNextId()+"_helpLinkDescription";
n.elements=[{type:"vbox",widths:["35%","65%"],children:[{type:"vbox",style:o?"":"display: none;",children:[{type:"button",className:"ibmHelpDocumentationUrl",id:"ibmHelp",label:t.lang.a11yhelp.ibm.helpLink,onClick:function(){
var e=Math.max(window.screen.height/4,800),t=Math.max(window.screen.width/4,800),n="height="+e+",width="+t+",status=yes,toolbar=yes,menubar=no,location=no,scrollbars=yes,resizable=yes";
window.open(o,"helpWindow",n).focus();
},setup:function(){
var n=t.config.contentsLangDirection;
this.getElement().getParent().setStyle("text-align","rtl"==n?"left":"right");
var i=e.dialog.getContentElement("info",a);
this.getInputElement().setAttribute("aria-describedby",i.domId);
}},{type:"html",id:a,html:"<div style=\"display:none;\">"+t.lang.a11yhelp.ibm.helpLinkDescription+"</div>"},{type:"html",html:"&nbsp;"}]},i]}];
}
}}),CKEDITOR.tools.extend(CKEDITOR.ibm.dialogs,{anchor:function(e,t){
if("anchor"===e.dialog.getName()){
var n=e.onShow;
e.dialog.origOnShow=n,e.onShow=function(){
this.origOnShow(),this.setupContent(t.getSelection().getSelectedText());
};
var i=e.getContents("info"),o=i.get("txtName"),a=i.get("requiredLabel")?i.get("requiredLabel"):{type:"html",html:""};
o.setup=function(t){
var n=e.dialog.getContentElement("info","description");
if(this.getInputElement().setAttribute("aria-describedby",n.domId),t){
var i=t.length>30?t.substring(0,30):t;
this.setValue(CKEDITOR.tools.trim(i));
}
},i.elements=[{type:"vbox",children:[o,{type:"html",id:"description",style:"white-space: normal; padding-top: 10px;",html:"<div>"+CKEDITOR.tools.htmlEncode(t.lang.link.anchor.ibm.description)+"</div>",focus:!1},a]}];
}
}}),CKEDITOR.tools.extend(CKEDITOR.ibm.dialogs,{bulletedListStyle:function(e,t){
if("bulletedListStyle"===e.dialog.getName()){
e.title=t.lang.list.ibm.bulletedTitle;
var n=e.onLoad;
e.dialog.origOnLoad=n,e.onLoad=function(){
this.origOnLoad&&this.origOnLoad();
var t=e.dialog.getContentElement("info","description"),n=this.parts.dialog;
n.getParent().setAttribute("aria-describedby",t.domId);
};
for(var i=e.getContents("info"),o=i.get("type"),a=t.config.fontSize_sizes.split(";"),r=[[t.lang.common.notSet,""]],s=0;s<a.length;s++){
var l=a[s];
if(l){
var d=l.split("/");
r.push(d);
}
}
i.elements=[{type:"html",id:"description",focus:!1,html:"<div style=\"padding-bottom: 10px;\">"+t.lang.list.ibm.description+"</div>"},{type:"hbox",widths:["50%","50%"],children:[o,{type:"select",label:t.lang.list.ibm.fontsize,id:"fontSize",style:"width: 99%",items:r,setup:function(e){
var t=e.getStyle("font-size")||"";
this.setValue(t);
},commit:function(e){
var t=this.getValue(),n=[],i=new CKEDITOR.dom.range(e);
i.setStartAt(e,CKEDITOR.POSITION_AFTER_START),i.setEndAt(e,CKEDITOR.POSITION_BEFORE_END);
var o=new CKEDITOR.dom.walker(i);
for(o.evaluator=function(e){
return e.type===CKEDITOR.NODE_ELEMENT&&"UL"==e.$.nodeName;
},o.breakOnFalse=!1;o.next();){
n.push(o.current);
}
if(t){
for(s in n){
var a=n[s];
a.getStyle("font-size")||a.setStyle("font-size",a.getComputedStyle("font-size"));
}
e.setStyle("font-size",t);
}else{
e.removeStyle("font-size");
}
}}]}];
}
}}),CKEDITOR.tools.extend(CKEDITOR.ibm.dialogs,{cellProperties:function(e,t){
function n(e,n){
var i=function(){
o(this),n(this,this._.parentDialog);
},o=function(e){
e.removeListener("show",i);
},a=function(e){
e.on("show",i);
};
t._.storedDialogs.colordialog?a(t._.storedDialogs.colordialog):CKEDITOR.on("dialogDefinition",function(t){
if(t.data.name==e){
var n=t.data.definition;
t.removeListener(),n.onLoad=CKEDITOR.tools.override(n.onLoad,function(e){
return function(){
a(this),n.onLoad=e,"function"==typeof e&&e.call(this);
};
});
}
});
};
function i(e){
var t=e.substring(4,e.length-1).split(",");
if(t[0]>=0&&t[0]<=255&&t[1]>=0&&t[1]<=255&&t[2]>=0&&t[2]<=255){
var n=parseInt(t[0]).toString(16);
"0"==n&&(n="00");
var i=parseInt(t[1]).toString(16);
"0"==i&&(i="00");
var o=parseInt(t[2]).toString(16);
return "0"==o&&(o="00"),"#"+n+i+o;
}
return !1;
};
function o(e){
var t=e.substring(1,2),n=e.substring(2,3),i=e.substring(3);
return "#"+t+t+n+n+i+i;
};
if("cellProperties"===e.dialog.getName()){
e.title=t.lang.table.cell.ibm.title;
var a=e.getContents("info"),r=a.get("width"),s=a.get("widthType"),l=a.get("height"),d=a.get("wordWrap"),c=a.get("hAlign"),u=a.get("vAlign"),h=a.get("cellType"),f=a.get("rowSpan"),m=a.get("colSpan"),g=a.get("bgColor"),p=a.get("borderColor"),E=a.get("bgColorChoose"),T=a.get("borderColorChoose"),C=a.get("requiredLabel")?a.get("requiredLabel"):{type:"html",html:""};
if(r.labelLayout=null,r.widths=null,r.width=null,r.setup=function(e){
var t=parseFloat(e[0].getAttribute("width")),n=parseFloat(e[0].getStyle("width"));
!isNaN(t)&&this.setValue(t),!isNaN(n)&&this.setValue(n);
},r.commit=function(e){
var t=parseFloat(this.getValue()),n=this.getDialog().getValueOf("info","widthType");
isNaN(t)?e.removeStyle("width"):e.setStyle("width",t+n),e.removeAttribute("width");
},s.labelLayout=null,s.widths=null,s.style=this.styleWidth100Pc,s.labelStyle=null,s.items=[[t.lang.table.widthPx,"px"],[t.lang.table.widthPc,"%"],[t.lang.ibm.common.widthIn,"in"],[t.lang.ibm.common.widthCm,"cm"],[t.lang.ibm.common.widthMm,"mm"],[t.lang.ibm.common.widthEm,"em"],[t.lang.ibm.common.widthEx,"ex"],[t.lang.ibm.common.widthPt,"pt"],[t.lang.ibm.common.widthPc,"pc"]],s.setup=function(e){
var t=/^(\d+(?:\.\d+)?)(px|%|in|cm|mm|em|ex|pt|pc)$/,n=t.exec(e[0].getStyle("width")||e[0].getAttribute("width"));
n&&this.setValue(n[2]);
},l.labelLayout=null,l.widths=null,l.width=null,delete l.onLoad,d.labelLayout=null,d.widths=null,d.style=this.styleWidth100Pc,c.labelLayout=null,c.widths=null,c.style=this.styleWidth100Pc,u.labelLayout=null,u.widths=null,u.style=this.styleWidth100Pc,h.labelLayout=null,h.widths=null,h.style=this.styleWidth100Pc,f.labelLayout=null,f.widths=null,m.labelLayout=null,m.widths=null,T.style="",g.setup){
var v=g.setup;
g.origSetup=v;
}
if(g.setup=function(e){
this.getElement().hide(),this.origSetup&&this.origSetup(e),_1b(this.getValue(),N);
},g.commit=function(e){
},g.onChange){
var I=g.onChange;
g.origOnChange=I;
}
if(g.onChange=function(e){
this.origOnChange&&this.origOnChange(e);
var t=this.getValue(),n=CKEDITOR.document.createElement("div");
n.setStyle("background-color",t);
var i=n.getStyle("background-color");
i||(t=""),K(this.getDialog().getContentElement("info","bgColorList"),t),_1b(t,N);
},p.setup){
var O=p.setup;
p.origSetup=O;
}
if(p.setup=function(e){
this.getElement().hide(),this.origSetup&&this.origSetup(e),_1b(this.getValue(),A);
},p.commit=function(e){
},p.onChange){
var D=p.onChange;
p.origOnChange=D;
}
if(p.onChange=function(e){
this.origOnChange&&this.origOnChange(e);
var t=this.getValue(),n=CKEDITOR.document.createElement("div");
n.setStyle("border-color",t);
var i=n.getStyle("border-color");
i||(t=""),K(this.getDialog().getContentElement("info","borderColorList"),t),_1b(t,A);
},E.onLoad){
var b=E.onLoad;
E.origOnLoad=b;
}
if(E.onLoad=function(){
CKEDITOR.env.hc?this.getElement().hide():(this.getElement().show(),this.origOnLoad&&this.origOnLoad(),this.getElement().getParent().setStyle("padding-bottom","5px"));
},T.onLoad){
var R=T.onLoad;
T.origOnLoad=R;
}
T.onLoad=function(){
CKEDITOR.env.hc?this.getElement().hide():(this.getElement().show(),this.origOnLoad&&this.origOnLoad(),this.getElement().getParent().setStyle("padding-bottom","5px"));
};
var y=function(){
var e=t.lang,n=e.colorbutton.colors,i=[[e.common.notSet,""]];
div=CKEDITOR.document.createElement("div");
for(var o in n){
div.setStyle("border-color","#"+o),i.push([n[o],div.getStyle("border-color")]);
}
return i.sort(function(e,t){
return e[0]>t[0];
});
}(),K=function(e,t){
t=t.toLowerCase();
var n;
"rgb"==t.substring(0,3)?n=i(t):"#"==t.substring(0,1)&&4==t.length&&(n=o(t));
for(var a=null==e?this:e,r=a.getInputElement().$,s=r.length;s--;){
var l=r.options[s].value.toLowerCase();
if(l===t||l===n||i(l)===t){
r.options[s].selected="selected";
break;
}
}
-1==s&&(a.add(t,t),r.options[r.length-1].selected="selected");
},_1b=function(e,t){
"rgb"==e.substring(0,3)&&e.length<=18||"#"==e.substring(0,1)&&e.length<=7||!(e.indexOf(" ")>=0)||(e=""),e?CKEDITOR.document.getById(t).setStyle("background-color",e):CKEDITOR.document.getById(t).removeStyle("background-color");
},k={type:"select",id:"borderColorList",items:y,label:t.lang.table.cell.borderColor,style:"width : 100%;",setup:function(e){
this.getElement().show();
var t=e[0].getStyle("border-color")||e[0].getAttribute("borderColor");
t&&K.call(this,null,t);
},commit:function(e){
var t=this.getValue();
t?(e.setStyle("border-color",t),e.setStyle("border-style","solid")):e.removeStyle("border-color"),e.removeAttribute("borderColor");
},onChange:function(){
_1b(this.getValue(),A);
},onKeyUp:function(){
_1b(this.getValue(),A);
}},w={type:"select",id:"bgColorList",label:t.lang.table.cell.bgColor,items:y,style:"width : 100%;",setup:function(e){
this.getElement().show();
var t=e[0].getStyle("background-color")||e[0].getAttribute("bgColor");
t&&K.call(this,null,t);
},commit:function(e){
var t=this.getValue();
t?e.setStyle("background-color",t):e.removeStyle("background-color"),e.removeAttribute("bgColor");
},onChange:function(e){
_1b(this.getValue(),N);
},onKeyUp:function(){
_1b(this.getValue(),N);
}};
if(E.onClick){
var S=E.onClick;
E.origOnClick=S;
}
if(E.onClick=function(){
this.origOnClick&&this.origOnClick();
var e=this;
n("colordialog",function(t){
var n=e.getDialog().getContentElement("info","bgColorList").getValue();
n&&("rgb"==n.substring(0,3)?n=i(n):"#"==n.substring(0,1)&&4==n.length&&(n=o(n)),n&&t.getContentElement("picker","currentColor").setValue(n));
});
},T.onClick){
var x=T.onClick;
T.origOnClick=x;
}
T.onClick=function(){
this.origOnClick&&this.origOnClick();
var e=this;
n("colordialog",function(t){
var n=e.getDialog().getContentElement("info","borderColorList").getValue();
n&&("rgb"==n.substring(0,3)?n=i(n):"#"==n.substring(0,1)&&4==n.length&&(n=o(n)),n&&t.getContentElement("picker","currentColor").setValue(n));
});
};
var N=CKEDITOR.tools.getNextId()+"_bgcolorswatch",A=CKEDITOR.tools.getNextId()+"_bordercolorswatch",L="border: 1px solid #A0A0A0; height: 20px; width: 20px;";
a.style="width:100%",a.elements=[{type:"hbox",children:[r,s]},{type:"hbox",children:[l,{type:"select",id:"heightType",style:this.styleWidth100Pc,label:t.lang.table.ibm.heightUnit,"default":"px",items:[[t.lang.table.widthPx,"px"]],setup:function(e){
if(""!==e[0].$.style.height){
var t=/^(\d+(?:\.\d+)?)px$/.exec(e[0].$.style.height);
t&&this.setValue("px");
}
}}]},{type:"hbox",children:[c,u]},{type:"hbox",children:[d,h]},{type:"hbox",children:[f,m]},{type:"hbox",widths:["70%","5%","25%"],children:[w,{type:"html",html:"<div id=\""+N+"\" style=\""+L+"\"></div>",onLoad:function(){
var e=CKEDITOR.document.getById(N);
CKEDITOR.env.hc?e.hide():(e.show(),e.getParent().setStyle("vertical-align","bottom"));
}},E,g]},{type:"hbox",widths:["70%","5%","25%"],children:[k,{type:"html",html:"<div id=\""+A+"\" style=\""+L+"\"></div>",onLoad:function(){
var e=CKEDITOR.document.getById(A);
CKEDITOR.env.hc?e.hide():(e.show(),e.getParent().setStyle("vertical-align","bottom"));
}},T,p]},C];
}
}},!0),CKEDITOR.tools.extend(CKEDITOR.ibm.dialogs,{colordialog:function(e,t){
if("colordialog"===e.dialog.getName()){
var n=e.getContents("picker"),i=n.elements[0].children[0],i=n.elements[0].children[0],o=n.elements[0].children[1],a=n.elements[0].children[2].children[0],r=n.elements[0].children[2].children[1],s=n.get("requiredLabel")?n.get("requiredLabel"):{type:"html",html:""};
r.style="width: 76px; margin-top: 2px; margin-bottom: 15px;";
var l=a.html;
l=l.replace(/height:\s*74px;/i,"height: 20px; "),l=l.replace(/hicolortext/i,"hicolortext\" style=\"margin-bottom: 15px;"),l=l.replace(/border:\s*1px\s*solid/gi,"border: 1px solid #A0A0A0"),a.html=l;
var d=e.onShow;
e.dialog.origOnShow=d,e.onShow=function(){
this.origOnShow&&this.origOnShow(),this.setupContent();
};
var c=CKEDITOR.tools.getNextId()+"_currentswatch",u=CKEDITOR.tools.getNextId()+"_currentswatchtext";
n.elements=[{type:"hbox",widths:["70%","5%","25%"],children:[i,o,{type:"vbox",padding:0,children:[a,r,{type:"html",html:"<div role=\"textbox\" aria-disabled=\"true\" tabIndex=\"-1\"><span>"+t.lang.colordialog.ibm.currentColor+"</span>\t\t\t\t\t\t\t\t\t<div id=\""+c+"\" style=\"border: 1px solid #A0A0A0; height: 20px; width: 74px;\"></div>\t\t\t\t\t\t\t\t\t<div id=\""+u+"\" style=\"white-space: normal;\">&nbsp;</div></div>",focus:!0},{type:"text",label:t.lang.colordialog.ibm.currentColor,labelStyle:"display:none",id:"currentColor",style:"display:none;",setup:function(){
this.setValue("");
},onChange:function(){
var e=CKEDITOR.document.getById(c),n=CKEDITOR.document.getById(u);
this.getValue()?(this.getValue().indexOf(" ")<0?e.setStyle("background-color",this.getValue()):e.removeStyle("background-color"),n.setHtml(this.getValue()),e.getParent().setAttribute("aria-label",t.lang.colordialog.ibm.currentColor+" "+this.getValue())):(e.removeStyle("background-color"),n.setHtml("&nbsp;"),e.getParent().setAttribute("aria-label",t.lang.colordialog.ibm.currentColor+" "+t.lang.common.notSet));
}},s]}]}];
}
}}),CKEDITOR.tools.extend(CKEDITOR.ibm.dialogs,{find:function(e,t){
if("find"===e.dialog.getName()||"replace"===e.dialog.getName()){
var n=e.getContents("find"),i=n.get("txtFindFind");
i.labelLayout="vertical";
var o=n.get("txtFindCaseChk");
o.style="margin-top:0px;";
var a=n.get("txtFindWordChk"),r=n.get("txtFindCyclic"),s=n.elements[0].children[1];
s.style="margin-left: 5px; display: block;",s.id="findBtn";
var l=e.getContents("replace");
l.hidden="true",e.dialog.parts.dialog.addClass("cke_single_page");
var d="margin-left: 5px; margin-top: 8px; display: block;",c=l.elements[0].children[1];
c.style=d,l.remove("btnFindReplace");
var u=l.elements[1].children[1];
u.style=d,l.remove("btnReplaceAll");
var h=l.get("txtReplace");
h.labelLayout="vertical",h.style="margin-top: 5px";
var f=c.onClick;
c.onClick=function(){
var e=this.getDialog();
e.setValueOf("replace","txtFindReplace",e.getValueOf("find","txtFindFind")),e.setValueOf("replace","txtReplace",e.getValueOf("find","txtReplace")),e.setValueOf("replace","txtReplaceCaseChk",e.getValueOf("find","txtFindCaseChk")),e.setValueOf("replace","txtReplaceWordChk",e.getValueOf("find","txtFindWordChk")),e.setValueOf("replace","txtReplaceCyclic",e.getValueOf("find","txtFindCyclic")),this.function2();
},c.function2=f;
var m=u.onClick;
u.onClick=function(){
var e=this.getDialog();
e.setValueOf("replace","txtFindReplace",e.getValueOf("find","txtFindFind")),e.setValueOf("replace","txtReplace",e.getValueOf("find","txtReplace")),e.setValueOf("replace","txtReplaceCaseChk",e.getValueOf("find","txtFindCaseChk")),e.setValueOf("replace","txtReplaceWordChk",e.getValueOf("find","txtFindWordChk")),e.setValueOf("replace","txtReplaceCyclic",e.getValueOf("find","txtFindCyclic")),this.function2();
},u.function2=m,n.style="width:100%",n.elements=[{type:"hbox",widths:["80%","20%"],children:[{type:"vbox",children:[i,h,{type:"fieldset",label:t.lang.find.findOptions,style:"margin-top: 8px",children:[{type:"vbox",style:"margin-top: 8px",children:[o,a,r]}]}]},{type:"vbox",style:"margin-top: 2px",children:[s,c,u]}]}],e.buttons=[CKEDITOR.dialog.cancelButton.override({label:t.lang.common.close})];
var g=e.dialog,p=e.onShow;
g.function2=p,e.onShow=function(){
this.function2(),this.hidePage("replace");
};
}
}},!0),CKEDITOR.tools.extend(CKEDITOR.ibm.dialogs,{flash:function(e,t){
if("flash"===e.dialog.getName()){
var n=e.getContents("info"),i=n.get("src"),o=n.get("browse"),a=n.get("width"),r=n.get("height"),s=n.get("hSpace"),l=n.get("vSpace"),d=n.get("preview"),c=n.get("requiredLabel")?n.get("requiredLabel"):{type:"html",html:""};
i.style=this.styleWidth100Pc,a.style=this.styleWidth100Pc,r.style=this.styleWidth100Pc,s.style=this.styleWidth100Pc,l.style=this.styleWidth100Pc,d.style="",hasBrowseButton=t.config.filebrowserBrowseUrl||t.config.filebrowserFlashBrowseUrl,n.style="width: 100%",n.elements=[{type:"hbox",widths:hasBrowseButton?["80%","20%"]:["100%"],children:hasBrowseButton?[i,o]:[i]},{type:"hbox",children:[a,r]},{type:"hbox",children:[s,l]},{type:"hbox",children:[d]},c];
var u=e.getContents("properties"),h=u.get("scale"),f=u.get("allowScriptAccess"),m=u.get("wmode"),g=u.get("quality"),p=u.get("align"),E=u.elements[3],T=u.get("requiredLabel")?u.get("requiredLabel"):{type:"html",html:""};
p.style=this.styleWidth100Pc,u.elements=[{type:"hbox",children:[f,h]},{type:"hbox",children:[m,g]},{type:"hbox",children:[p]},{type:"vbox",style:"margin-top: 5px",children:[E]},T];
}
}},!0),CKEDITOR.tools.extend(CKEDITOR.ibm.dialogs,{iframe:function(e,t){
if("iframe"===e.dialog.getName()){
e.title=t.lang.iframe.ibm.title;
var n=e.getContents("info"),i=n.get("src");
i.inputStyle="";
var o=n.get("width"),a=n.get("height"),r=n.get("align"),s=n.get("scrolling"),l=n.get("frameborder"),d=n.get("longdesc"),c=n.get("requiredLabel")?n.get("requiredLabel"):{type:"html",html:""},u=e.getContents("advanced"),h=u.get("advId"),f=u.get("advCSSClasses"),m=u.get("advStyles"),g=u.get("requiredLabel")?u.get("requiredLabel"):{type:"html",html:""};
n.elements=[i,{type:"hbox",children:[o]},{type:"hbox",children:[a]},{type:"hbox",children:[r]},{type:"vbox",widths:["50%","50%"],children:[s,l]},c],u.elements=[{type:"hbox",children:[h]},{type:"hbox",children:[m,f]},{type:"hbox",children:[d]},g];
}
}},!0),CKEDITOR.tools.extend(CKEDITOR.ibm.dialogs,{image:function(e,t){
var n=e.dialog;
if("image"===n.getName()){
var i=e.getContents("info"),o=i.get("txtUrl"),a=i.get("browse"),r=i.get("txtAlt"),s=i.get("txtWidth"),l=i.get("txtHeight"),d=i.get("txtBorder"),c=i.get("txtHSpace"),u=i.get("txtVSpace"),h=i.get("cmbAlign"),f=i.get("ratioLock"),m=i.get("htmlPreview");
CKEDITOR.env.ie&&CKEDITOR.env.version<9&&(r.inputStyle="width:350px");
var g=i.get("requiredLabel")?i.get("requiredLabel"):{type:"html",html:""},p=t.lang.image.ibm;
if(p&&p.previewText){
var E=p.previewText+" ";
E+=E,E+=E,E+=E,E+=E,m.html=m.html.replace(/Lorem.*mauris\./,E);
}
m.style="width 100%",a.style="",s.width=null,s.labelLayout=null,l.width=null,l.labelLayout=null,d.width=null,d.labelLayout=null,c.width=null,c.labelLayout=null,u.width=null,u.labelLayout=null,h.style=this.styleWidth100Pc,h.labelLayout=null,f.style="margin-top:17px;width:"+(CKEDITOR.env.hc?"90px":"20px")+";height:50px;",f.requiredContent="img{width,height}",hasBrowseButton=t.config.filebrowserBrowseUrl||t.config.filebrowserImageBrowseUrl,hasBrowseButton||n.on("load",function(e){
var t=e.sender._.focusList,n=t[4];
n.focusIndex=6,t[4]=t[5],t[4].focusIndex=4,t[5]=t[6],t[5].focusIndex=5,t[6]=n;
},null,null,15),i.style="width:100%",i.elements=[{type:"hbox",widths:hasBrowseButton?["80%","20%"]:["100%"],children:hasBrowseButton?[o,a]:[o]},{type:"hbox",children:[r]},{type:"hbox",requiredContent:"img{width,height}",children:[s,l]},{type:"hbox",children:[c,u]},{type:"hbox",children:[h,d]},{type:"hbox",widths:["5%","95%"],children:[f,m]},g];
var T=e.getContents("Link");
T.padding=null,o=T.get("txtUrl");
var a=T.get("browse"),C=T.get("cmbTarget"),v=T.get("requiredLabel")?T.get("requiredLabel"):{type:"html",html:""};
a.style="",T.elements=[{type:"hbox",widths:hasBrowseButton?["80%","20%"]:["100%"],children:hasBrowseButton?[o,a]:[o]},{type:"hbox",children:[C]},v];
var I=e.getContents("Upload"),O=I.get("upload");
O.label=p.fileUpload;
}
}},!0),CKEDITOR.tools.extend(CKEDITOR.ibm.dialogs,{link:function(e,t){
if("link"===e.dialog.getName()){
var n=e.getContents("advanced"),i=n.get("advId"),o=n.get("advName"),a=n.get("advAccessKey"),r=n.get("advTabIndex"),s=n.get("advLangDir"),l=n.get("advLangCode"),d=n.get("advTitle"),c=n.get("advContentType"),u=n.get("advCSSClasses"),h=n.get("advStyles"),f=n.get("advCharset"),m=n.get("requiredLabel")?n.get("requiredLabel"):{type:"html",html:""};
r.width=null,a.width=null,s.style=this.styleWidth100Pc,l.width=null,n.elements=[{type:"hbox",children:[i,o]},{type:"hbox",children:[r,a]},{type:"hbox",children:[s,l]},{type:"hbox",children:[u,h]},{type:"hbox",children:[d,c]},{type:"hbox",children:[f]},m];
}
}},!0),CKEDITOR.tools.extend(CKEDITOR.ibm.dialogs,{numberedListStyle:function(e,t){
if("numberedListStyle"===e.dialog.getName()){
e.title=t.lang.list.ibm.numberedTitle;
var n=e.onLoad;
e.dialog.origOnLoad=n,e.onLoad=function(){
this.origOnLoad&&this.origOnLoad();
var t=e.dialog.getContentElement("info","description"),n=this.parts.dialog;
n.getParent().setAttribute("aria-describedby",t.domId);
};
var i=e.getContents("info"),o=["25%","75%"];
i.elements[0].widths=o;
for(var a=t.config.fontSize_sizes.split(";"),r=[[t.lang.common.notSet,""]],s=0;s<a.length;s++){
var l=a[s];
if(l){
var d=l.split("/");
r.push(d);
}
}
i.elements.push({type:"hbox",widths:o,children:[{type:"select",label:t.lang.list.ibm.fontsize,id:"fontSize",style:"width: 99%",items:r,setup:function(e){
var t=e.getStyle("font-size")||"";
this.setValue(t);
},commit:function(e){
var t=this.getValue(),n=[],i=new CKEDITOR.dom.range(e);
i.setStartAt(e,CKEDITOR.POSITION_AFTER_START),i.setEndAt(e,CKEDITOR.POSITION_BEFORE_END);
var o=new CKEDITOR.dom.walker(i);
for(o.evaluator=function(e){
return e.type===CKEDITOR.NODE_ELEMENT&&"OL"==e.$.nodeName;
},o.breakOnFalse=!1;o.next();){
n.push(o.current);
}
if(t){
for(s in n){
var a=n[s];
a.getStyle("font-size")||a.setStyle("font-size",a.getComputedStyle("font-size"));
}
e.setStyle("font-size",t);
}else{
e.removeStyle("font-size");
}
}},{type:"html",html:"&nbsp;"}]});
var c={type:"hbox",children:[{type:"html",id:"description",focus:!1,html:"<div style=\"padding-bottom: 10px;\">"+t.lang.list.ibm.description+"</div>"}]};
i.elements.splice(0,0,c);
}
}}),CKEDITOR.tools.extend(CKEDITOR.ibm.dialogs,{paste:function(e,t){
if("paste"===e.dialog.getName()){
var n=e.getContents("general"),i=n.get("pasteMsg");
i.html=i.html.replace(/;width:\d+px/,"");
var o=n.get("editing_area");
n.elements=[i,o];
}
}},!0),CKEDITOR.tools.extend(CKEDITOR.ibm.dialogs,{pastetext:function(e,t){
if("pastetext"===e.dialog.getName()){
var n=e.getContents("general"),i=n.get("content");
i.onLoad=function(){
var e=this.getElement();
e.setStyle("direction",t.config.contentsLangDirection);
},i.label=t.lang.clipboard.pasteMsg,n.elements=[i];
}
}},!0),CKEDITOR.tools.extend(CKEDITOR.ibm.dialogs,{smiley:function(e,t){
}}),CKEDITOR.tools.extend(CKEDITOR.ibm.dialogs,{specialchar:function(e,t){
"specialchar"===e.dialog.getName()&&(e.getContents("info").elements[0].widths=["90%","10%"]);
}}),CKEDITOR.tools.extend(CKEDITOR.ibm.dialogs,{table:function(e,t){
var n=/^(\d+(?:\.\d+)?)(px|%|in|cm|mm|em|ex|pt|pc)$/,i=/^(px|%|in|cm|mm|em|ex|pt|pc)$/,o=t.editable(),a=o.getSize("width")<500?!0:!1;
if("table"===e.dialog.getName()){
e.title=t.lang.table.ibm.createTable;
var r=e.onShow;
e.dialog.origOnShow=r,e.onShow=function(){
this.origOnShow&&this.origOnShow(),e.dialog.getContentElement("info","chkFixedWidthCols").enable(),"%"==e.dialog.getContentElement("info","cmbWidthType").getValue()?e.dialog.getContentElement("info","chkFixedWidthCols").disable():e.dialog.getContentElement("info","chkFixedWidthCols").enable();
},e.removeContents("advanced");
var s=e.getContents("info"),l=s.get("txtRows"),d=s.get("txtCols"),c=s.get("txtWidth");
l.controlStyle=this.styleWidth100Pc,d.controlStyle=this.styleWidth100Pc,c.controlStyle=this.styleWidth100Pc,c.title=null,c["default"]=a?"100":"500";
var u=s.get("txtBorder");
u.style="display:none;";
var h=s.get("requiredLabel")?s.get("requiredLabel"):{type:"html",html:""};
c.validate=function(){
var e=this.getValue(),o=n.exec(e);
return o?e=parseFloat(o[1],10):i.exec(e)&&(e=""),""==e||"number"==typeof e?!0:t.lang.table.invalidWidth;
},c.commit=function(e){
var t=this.getValue(),o=n.exec(t),a=this.id;
e.info||(e.info={}),o?e.info[a]=t:i.exec(t)&&(e.info[a]="");
},c.getValue=function(){
return this.getInputElement().getValue()+this.getDialog().getContentElement("info","cmbWidthType").getValue();
},s.elements=[{type:"hbox",children:[l,d]},{type:"hbox",children:[c,{id:"cmbWidthType",requiredContent:"table{width}",type:"select",label:t.lang.table.widthUnit,style:this.styleWidth100Pc,"default":a?"%":"px",items:[[t.lang.table.widthPx,"px"],[t.lang.table.widthPc,"%"],[t.lang.ibm.common.widthIn,"in"],[t.lang.ibm.common.widthCm,"cm"],[t.lang.ibm.common.widthMm,"mm"],[t.lang.ibm.common.widthEm,"em"],[t.lang.ibm.common.widthEx,"ex"],[t.lang.ibm.common.widthPt,"pt"],[t.lang.ibm.common.widthPc,"pc"]],commit:function(){
},onChange:function(){
this.getDialog().getContentElement("info","txtWidth").onChange();
var e=this.getDialog().getContentElement("info","chkFixedWidthCols");
"%"==this.getValue()?(e.setValue(!1),e.disable()):(e.isEnabled()||e.enable(),1!=e.getValue()&&e.setValue(!0));
}}]},{type:"checkbox",id:"chkFixedWidthCols",label:t.lang.table.ibm.fixedColWidths,"default":a?!1:!0,requiredContent:"table{width}",commit:function(e,t){
this.getValue()&&t.setAttribute("fixedwidthcolumns","true");
}},{type:"hbox",children:[u]},h];
}
}},!0),CKEDITOR.tools.extend(CKEDITOR.ibm.dialogs,{tableProperties:function(e,t){
var n=/^(\d+(?:\.\d+)?)(px|%|in|cm|mm|em|ex|pt|pc)$/,i=/^(px|%|in|cm|mm|em|ex|pt|pc)$/;
e.onLoad=function(){
var e=this,t=e.getContentElement("advanced","advStyles");
t&&t.on("change",function(t){
var i=this.getStyle("width",""),o=i,a=e.getContentElement("info","txtWidth"),r=e.getContentElement("info","cmbWidthType"),s="px",l=!1;
if(o){
var d=n.exec(o);
d&&(s=d[2],l=!0),o=parseFloat(o,10);
}
a&&a.setValue(o,!0),r&&r.setValue(s,!0),o&&!l&&a&&a.setValue(i,!0);
var c=this.getStyle("height",""),u=c,h=e.getContentElement("info","txtHeight");
if(cmbHeightType=e.getContentElement("info","cmbHeightType"),heightUnit="px",heightValid=!1,u){
var f=n.exec(u);
f&&(heightUnit=f[2],heightValid=!0),u=parseFloat(u,10);
}
h&&h.setValue(u,!0),cmbHeightType&&cmbHeightType.setValue(heightUnit,!0),u&&!heightValid&&h&&h.setValue(c,!0);
});
};
var o=function(e){
var t=this.getValue(),o=n.exec(t),a=this.id;
e.info||(e.info={}),o?e.info[a]=t:i.exec(t)&&(e.info[a]="");
};
if("tableProperties"===e.dialog.getName()){
var a=e.getContents("info"),r=a.get("txtRows"),s=a.get("txtCols"),l=a.get("txtHeight"),d=a.get("txtWidth"),c=a.get("selHeaders"),u=a.get("txtBorder"),h=a.get("txtCellSpace"),f=a.get("txtCellPad"),m=a.get("cmbAlign"),g=a.get("txtCaption"),p=a.get("txtSummary"),E=a.get("requiredLabel")?a.get("requiredLabel"):{type:"html",html:""};
r.controlStyle=this.styleWidth100Pc,s.controlStyle=this.styleWidth100Pc,d.controlStyle=this.styleWidth100Pc,l.controlStyle=this.styleWidth100Pc,l.title=null,d.title=null,delete l.onLoad,c.controlStyle=this.styleWidth100Pc,c.inputStyle=this.styleWidth100Pc,u.controlStyle=this.styleWidth100Pc,h.controlStyle=this.styleWidth100Pc,f.controlStyle=this.styleWidth100Pc,m.controlStyle="width:97%",m.inputStyle="width:50%;",d.setup=function(e){
var t=n.exec(e.$.style.width);
t?this.setValue(t[1]):this.setValue("");
},d.validate=function(){
var e=this.getValue(),o=n.exec(e);
return o?e=parseFloat(o[1],10):i.exec(e)&&(e=""),""==e||"number"==typeof e?!0:t.lang.table.invalidWidth;
},d.onChange=function(){
var e=this.getDialog().getContentElement("advanced","advStyles");
if(e){
var t=this.getValue();
if(t){
var i=n.exec(t);
i||(t="");
}
e.updateStyle("width",t);
}
},d.commit=o,d.getValue=function(){
return this.getInputElement().getValue()+this.getDialog().getContentElement("info","cmbWidthType").getValue();
},l.setup=function(e){
var t=n.exec(e.$.style.height);
t&&this.setValue(t[1]);
},l.validate=function(){
var e=this.getValue(),o=n.exec(e);
return o?e=parseFloat(o[1],10):i.exec(e)&&(e=""),""==e||"number"==typeof e?!0:t.lang.table.invalidHeight;
},l.onChange=function(){
var e=this.getDialog().getContentElement("advanced","advStyles");
if(e){
var t=this.getValue();
if(t){
var i=n.exec(t);
i||(t="");
}
e.updateStyle("height",t);
}
},l.commit=o,l.getValue=function(){
return this.getInputElement().getValue()+this.getDialog().getContentElement("info","cmbHeightType").getValue();
},a.label=t.lang.common.generalTab,a.elements=[{type:"hbox",children:[r,s]},{type:"hbox",children:[d,{id:"cmbWidthType",requiredContent:"table{width}",type:"select",label:t.lang.table.widthUnit,style:this.styleWidth100Pc,"default":"px",items:[[t.lang.table.widthPx,"px"],[t.lang.table.widthPc,"%"],[t.lang.ibm.common.widthIn,"in"],[t.lang.ibm.common.widthCm,"cm"],[t.lang.ibm.common.widthMm,"mm"],[t.lang.ibm.common.widthEm,"em"],[t.lang.ibm.common.widthEx,"ex"],[t.lang.ibm.common.widthPt,"pt"],[t.lang.ibm.common.widthPc,"pc"]],setup:function(e){
var t=n.exec(e.$.style.width);
t&&this.setValue(t[2]);
},commit:function(){
},onChange:function(){
this.getDialog().getContentElement("info","txtWidth").onChange();
}}]},{type:"hbox",children:[l,{id:"cmbHeightType",requiredContent:"table{height}",type:"select",label:t.lang.table.ibm.heightUnit,style:this.styleWidth100Pc,"default":"px",items:[[t.lang.table.widthPx,"px"],[t.lang.table.widthPc,"%"],[t.lang.ibm.common.widthIn,"in"],[t.lang.ibm.common.widthCm,"cm"],[t.lang.ibm.common.widthMm,"mm"],[t.lang.ibm.common.widthEm,"em"],[t.lang.ibm.common.widthEx,"ex"],[t.lang.ibm.common.widthPt,"pt"],[t.lang.ibm.common.widthPc,"pc"]],setup:function(e){
if(""!==e.$.style.height){
var t=n.exec(e.$.style.height);
t&&this.setValue(t[2]);
}
},commit:function(){
},onChange:function(){
this.getDialog().getContentElement("info","txtHeight").onChange();
}}]},{type:"hbox",children:[u,c]},{type:"hbox",children:[m]},E];
var T=e.getContents("advanced"),C=T.get("advId"),v=T.get("advLangDir"),I=T.get("advCSSClasses"),O=T.get("advStyles"),D=T.get("requiredLabel")?T.get("requiredLabel"):{type:"html",html:""};
T.elements=[{type:"vbox",children:[{type:"vbox",padding:2,children:[g,p]},{type:"hbox",children:[h,f]},{type:"hbox",children:[C,v]},{type:"vbox",children:[I,O]},D]}];
}
}},!0),CKEDITOR.tools.extend(CKEDITOR.ibm.dialogs,{embedBase:function(e,t){
function n(e,t,n){
var i=e.data.align,o="width:"+t+"; height:"+n;
i&&("center"==i?o+="margin-right: auto; margin-left:auto;":o=o+"float:"+i+";"),e.wrapper.$.setAttribute("style",o);
};
function i(e){
};
if("embedBase"===e.dialog.getName()){
var o,a,r=t.config,s=t.lang.embedbase,l=e.dialog,d=e.getContents("info"),c=d.get("url"),u=r.aligment_images_path=r.aligment_images_path||CKEDITOR.plugins.get("ibmcustomdialogs").path+"images/aligment/",h=r.aligment_images=r.aligment_images||["image_layout_left.png","image_layout_center.png","image_layout_right.png"],f=r.aligment_descriptions||[s.ibm.left,s.ibm.center,s.ibm.right],m=/^\s*(\d+)((px)|\%|in|cm|mm|em|ex|pt|pc)?\s*$/i,g=function(e){
return CKEDITOR.tools.getNextId()+"_"+e;
},p=g("btnLockSizes"),E=g("btnResetSize"),T=d.get("requiredLabel")?d.get("requiredLabel"):{type:"html",html:""};
c.validate=function(){
var e=CKEDITOR.dialog.validate.notEmpty(s.ibm.emptyURL),t=e.apply(this);
if(1!=t){
return t;
}
var n=this.getValue().trim();
return this.getDialog().widget.isUrlValid(n)?!0:s.unsupportedUrlGiven;
},c.commit=function(e){
this.setValue(this.getValue().trim());
};
var C=function(){
var e=this.getValue(),t=this.getDialog(),n=e.match(m);
if(n&&("%"==n[2]&&I(t,!1),e=n[1]),t.lockRatio&&o&&a){
var i=o.match(m),r=i[1],s=a.match(m),l=s[1];
"maxHeight"==this.id?(e&&"0"!=e&&(e=Math.round(r*(e/l))),isNaN(e)||t.setValueOf("info","maxWidth",e)):(e&&"0"!=e&&(e=Math.round(l*(e/r))),isNaN(e)||t.setValueOf("info","maxHeight",e));
}
},v=function(e,t){
if(o&&a){
var n,i,r=e.getContentElement("info","maxWidth"),s=e.getContentElement("info","maxHeight");
t?(n=0,i=0):(n=o,i=a),r&&r.setValue(n),s&&s.setValue(i);
}
},I=function(e,t){
if(!e.getContentElement("info","ratioLock")){
return null;
}
void 0!==t?e.lockRatio=t:(e.userlockRatio=1,e.lockRatio=!e.lockRatio);
var n=CKEDITOR.document.getById(p);
if(e.lockRatio?n.removeClass("cke_btn_unlocked"):n.addClass("cke_btn_unlocked"),n.setAttribute("aria-checked",e.lockRatio),CKEDITOR.env.hc){
var i=n.getChild(0);
i.setHtml(e.lockRatio?CKEDITOR.env.ie?"\u25a0":"\u25a3":CKEDITOR.env.ie?"\u25a1":"\u25a2");
}
return e.lockRatio;
},O=function(e){
var t=l.getContentElement("info","url").getValue();
if(!e._cache||!e._cache[t]){
return null;
}
var n=/original-width=["'](\w+)["']/i,i=e._cache[t].html.match(n);
if(i&&i[1]){
return CKEDITOR.tools.cssLength(i[1]);
}
if(e.wrapper.$.getElementsByTagName("img").length>0){
var o=e.element.clone(!0),i=CKEDITOR.tools.cssLength(o.$.getElementsByTagName("img")[0].naturalWidth);
return i&&(o.$.getElementsByTagName("img")[0].setAttribute("original-width",i),e._cache[t].html=o.getHtml()),i;
}
return null;
},D=function(e){
var t=l.getContentElement("info","url").getValue();
if(!e._cache||!e._cache[t]){
return null;
}
var n=/original-height=["'](\w+)["']/i,i=e._cache[t].html.match(n);
if(i&&i[1]){
return CKEDITOR.tools.cssLength(i[1]);
}
if(e.wrapper.$.getElementsByTagName("img").length>0){
var o=e.element.clone(!0),i=CKEDITOR.tools.cssLength(o.$.getElementsByTagName("img")[0].naturalHeight);
return i&&(o.$.getElementsByTagName("img")[0].setAttribute("original-height",i),e._cache[t].html=o.getHtml()),i;
}
return null;
},b=CKEDITOR.tools.addFunction(function(n,i){
n=new CKEDITOR.dom.event(n);
var o,a,r=n.getTarget(),s=n.getKeystroke(),l="rtl"==t.lang.dir;
switch(s){
case 9:
var d=e.dialog.getContentElement("info","sizeRadioButtons").getElement();
if(d.getElementsByTag("label").getItem(1).hasClass("cke_disabled")){
e.dialog.getContentElement("info","chkCustomSize").getInputElement().focus();
}else{
for(var c=d.getElementsByTag("input"),u=0;u<c.count();u++){
if(c.getItem(u).$.checked){
c.getItem(u).focus();
break;
}
}
}
n.preventDefault(!0);
break;
case 38:
(o=r.getParent().getPrevious())?(a=o.getChild(0),a.focus(),A(null,r),N(null,a),n.preventDefault(!0)):(a=r.getParent().getParent().getLast().getChild(0),a.focus(),N(null,a),n.preventDefault(!0));
break;
case 40:
(o=r.getParent().getNext())?(a=o.getChild(0),a.focus(),A(null,r),N(null,a),n.preventDefault(!0)):(a=r.getParent().getParent().getChild(0).getChild(0),a.focus(),N(null,a),n.preventDefault(!0));
break;
case l?37:39:
(o=r.getParent().getNext())?(a=o.getChild(0),a.focus(),A(null,r),N(null,a),n.preventDefault(!0)):(a=r.getParent().getParent().getChild(0).getChild(0),a.focus(),N(null,a),n.preventDefault(!0));
break;
case l?39:37:
(o=r.getParent().getPrevious())?(a=o.getChild(0),a.focus(),A(null,r),N(null,a),n.preventDefault(!0)):(a=r.getParent().getParent().getLast().getChild(0),a.focus(),N(null,a),n.preventDefault(!0));
break;
default:
return;
}
}),R=CKEDITOR.tools.getNextId()+"_align_label",y=["<div><span id=\""+R+"\" class=\"cke_voice_label\">"+s.ibm.options+"</span>","<table role=\"radiogroup\" aria-labelledby=\""+R+"\" style=\"width:100%;height:100%;border-collapse:separate;\" cellspacing=\"2\" cellpadding=\"2\"",CKEDITOR.env.ie&&CKEDITOR.env.quirks?" style=\"position:absolute;\"":"","><tbody>"];
y.push("<tr role=\"presentation\">");
var K,_1c=["left","center","right"],k=h.length;
if("rtl"==t.lang.dir){
for(K=k-1;K>=0;K--){
var w="cke_align_label_"+K+"_"+CKEDITOR.tools.getNextNumber();
y.push("<td class=\"cke_centered\" style=\"vertical-align: middle;\" role=\"presentation\"><a href=\"javascript:void(0)\" role=\"radio\""," aria-labelledby=\""+w+"\""," class=\"cke_align cke_hand\" tabindex=\"-1\" onkeydown=\"CKEDITOR.tools.callFunction( ",b,", event, this );\" value=",_1c[K],">","<img class=\"cke_hand cke_dialog_radio_button\" title=\""+f[K]+"\" alt=\""+f[K]+"\" cke_src=\"",CKEDITOR.tools.htmlEncode(u+h[K]),"alt=\""+f[K]+"\""," src=\"",CKEDITOR.tools.htmlEncode(u+h[K]),"\"",CKEDITOR.env.ie?" onload=\"this.setAttribute('width', 2); this.removeAttribute('width');\" ":"","><span id=\""+w+"\" class=\"cke_voice_label\">"+f[K]+"</span></a>","</td>");
}
}else{
for(K=0;k>K;K++){
var w="cke_align_label_"+K+"_"+CKEDITOR.tools.getNextNumber();
y.push("<td class=\"cke_centered\" style=\"vertical-align: middle;\" role=\"presentation\"><a href=\"javascript:void(0)\" role=\"radio\""," aria-labelledby=\""+w+"\""," class=\"cke_align cke_hand\" tabindex=\"-1\" onkeydown=\"CKEDITOR.tools.callFunction( ",b,", event, this );\" value=",_1c[K],">","<img class=\"cke_hand cke_dialog_radio_button\" title=\""+f[K]+"\" alt=\""+f[K]+"\" cke_src=\"",CKEDITOR.tools.htmlEncode(u+h[K]),"alt=\""+f[K]+"\""," src=\"",CKEDITOR.tools.htmlEncode(u+h[K]),"\"",CKEDITOR.env.ie?" onload=\"this.setAttribute('width', 2); this.removeAttribute('width');\" ":"","><span id=\""+w+"\" class=\"cke_voice_label\">"+f[K]+"</span></a>","</td>");
}
}
y.push("</tr></tbody></table></div>");
var S,x={type:"html",id:"alignSelector",requiredContent:"div{margin-left,margin-right,float}",html:y.join(""),onLoad:function(e){
l=e.sender;
for(var t=this.getElement().getElementsByTag("a").count()-1,n=0;t>=n;n++){
this.getElement().getElementsByTag("a").getItem(n).setAttribute("aria-checked",!1);
}
var i=this.getElement().getElementsByTag("a").getItem(0);
N(null,i);
},setup:function(e){
if(!e.data.align&&(e.element.getStyle("float")||e.element.getStyle("margin-right")&&e.element.getStyle("margin-left"))&&(e.data.align=e.element.getStyle("float")?e.element.getStyle("float"):"center"),e.data.align){
for(var t,n=this.getElement().getElementsByTag("a"),i=0;i<n.count();i++){
if(n.getItem(i).getAttribute("value")==e.data.align){
t=n.getItem(i);
break;
}
}
}
t||(t=this.getElement().getElementsByTag("a").getItem(0)),N(null,t),this.setValue(e.data.align);
},commit:function(e){
for(var t=this.getElement().getElementsByTag("a"),n=this.getElement().getElementsByTag("a").getItem(0),i=0;i<t.count();i++){
if(t.getItem(i).getChild(0).hasClass("cke_selected_image_background")){
n=t.getItem(i);
break;
}
}
var o=["float","margin-right","margin-left"],a=n.getAttribute("value");
for(var i in o){
e.element.removeStyle(o[i]);
}
var r=["center","right","left"];
for(var i in r){
e.hasClass(r[i])&&e.removeClass(r[i]);
}
"center"==a?(e.element.setStyle("margin-right","auto"),e.element.setStyle("margin-left","auto")):e.element.setStyle("float",a),e.setData("align",a),e.addClass(a);
},onClick:function(e){
var t=e.data.getTarget(),n=t.getName();
("a"==n||"img"==n)&&(t.focus(),N(null,t));
},focus:function(){
for(var e,t=this.getElement().getElementsByTag("a"),n=0;n<t.count();n++){
if(t.getItem(n).getChild(0).hasClass("cke_selected_image_background")){
e=t.getItem(n);
break;
}
e=this.getElement().getElementsByTag("a").getItem(0);
}
setTimeout(function(){
e.focus(),N(null,e);
},0);
},style:"width: 100%; border-collapse: separate;"},N=function(e,t){
t=t||e.data.getTarget(),t&&t.getName&&("span"==t.getName()&&(t=t.getParent()),"td"==t.getName()&&(t=t.getChild(0)),t&&t.getName&&"a"==t.getName()&&t.getChild(0).getName&&"img"==t.getChild(0).getName()?(S&&A(null,S),t.getChild(0).addClass("cke_selected_image_background"),S=t,S.setAttribute("aria-checked",!0)):t&&t.getName&&"img"==t.getName()&&(S&&A(null,S),t.addClass("cke_selected_image_background"),S=t.getParent(),S.setAttribute("aria-checked",!0)));
},A=function(e,t){
t=t||e.data.getTarget(),"span"==t.getName()&&(t=t.getParent()),"a"==t.getName()&&(t.getChild(0).removeClass("cke_selected_image_background"),S.setAttribute("aria-checked",!1),S=void 0);
},L=function(){
var t=e.dialog.getContentElement("info","sizeRadioButtons").getElement(),n=e.dialog.getContentElement("info","customSize").getElement();
n.setStyle("display","none"),t.removeAttribute("disabled");
for(var i=t.getElementsByTag("input"),o=0;o<i.count();o++){
i.getItem(o).removeClass("cke_disabled"),i.getItem(o).removeAttribute("disabled");
}
for(var a=t.getElementsByTag("label"),o=1;o<a.count();o++){
a.getItem(o).removeClass("cke_disabled");
}
},P=function(){
var t=e.dialog.getContentElement("info","sizeRadioButtons").getElement(),n=e.dialog.getContentElement("info","customSize").getElement();
n.setStyle("display",""),t.setAttribute("disabled","disabled");
for(var i=t.getElementsByTag("input"),o=0;4>o;o++){
i.getItem(o).addClass("cke_disabled"),i.getItem(o).setAttribute("disabled","disabled");
}
for(var a=t.getElementsByTag("label"),o=1;5>o;o++){
a.getItem(o).addClass("cke_disabled");
}
},B=e.onShow;
e.dialog.origOnShow=B,e.onShow=function(){
this.origOnShow&&this.origOnShow(),this.lockRatio=!0,I(this,!0),this.userlockRatio=0,this.dontResetSize=!1;
};
var F=function(t){
if(t.data.getKeystroke()==CKEDITOR.SHIFT+9){
var n=e.dialog.getContentElement("info","sizeRadioButtons").getElement();
if(!n.getElementsByTag("label").getItem(1).hasClass("cke_disabled")){
for(var i=n.getElementsByTag("input"),o=0;o<i.count();o++){
if(i.getItem(o).$.checked){
i.getItem(o).focus(),t.data.preventDefault(!0);
break;
}
}
t.data.preventDefault(!0);
}
}
},M=function(t){
"9"==t.data.getKeystroke()&&t.sender.$.checked&&(e.dialog.getContentElement("info","chkCustomSize").getInputElement().focus(),t.data.preventDefault(!0)),t.data.getKeystroke()==CKEDITOR.SHIFT+9&&t.sender.$.checked&&(e.dialog.getContentElement("info","alignSelector").focus(),t.data.preventDefault(!0));
};
d.elements=[{type:"hbox",children:[c]},{type:"hbox",children:[{type:"html",id:"alignment",html:"<div>"+CKEDITOR.tools.htmlEncode(s.ibm.alignment)+"</div>"}]},x,{type:"html",id:"sizeRadioButtonsLabel",style:"margin-top:5px; width:100%;",html:"<div>"+CKEDITOR.tools.htmlEncode(s.ibm.predefined)+"</div>"},{id:"sizeRadioButtons",padding:0,style:"margin-top:5px",type:"radio",className:"cke_size_radio_button",requiredContent:"div{width,height}","default":"500px",labelLayout:"horizontal",widths:[25,25,25,25],items:[[s.ibm.buttons.original,"none"],[s.ibm.buttons.small,"300px"],[s.ibm.buttons.medium,"500px"],[s.ibm.buttons.fitPageWidth,"100%"]],setup:function(e){
for(var t=this.getElement().getElementsByTag("input"),n=0;n<t.count();n++){
t.getItem(n).on("keydown",M);
}
var i=this.getDialog().getContentElement("info","sizeRadioButtonsLabel");
this.getElement().getFirst().getFirst().getFirst().getFirst().getFirst().hide(),i&&this.getDialog().getContentElement("info","sizeRadioButtons").getElement().setAttribute("aria-labelledby",i.domId);
var o=e.element.getAttribute("customSize");
if("true"!=o&&(e.element.getStyle("width")||e.data.sizeApplied||e.element.getAttribute("originalSize"))){
var a=e.element.getStyle("width").match(m);
e.data.sizeApplied||!a||e.element.getAttribute("originalSize")&&"false"!=e.element.getAttribute("originalSize")?this.setValue("none"):this.setValue(a[0]);
}
},commit:function(e){
var t=this.getDialog().getContentElement("info","chkCustomSize").getValue();
if(e.element.setAttribute("originalSize",!1),t){
e.data.sizeApplied=!1;
}else{
var o=this.getValue();
if(o&&"none"!=o){
e.element.setStyle("width",CKEDITOR.tools.cssLength(o)),e.data.sizeApplied=!1,i(e);
}else{
var a=O(e);
a&&e.element.setStyle("width",a),e.data.sizeApplied=!0,e.element.setAttribute("originalSize",!0);
}
e.element.setAttribute("customSize",!1),n(e,e.element.getStyle("width"),e.element.$.offsetHeight+"px;");
}
}},{type:"vbox",style:"margin-top:15px",requiredContent:"div{width,height}",children:[{type:"checkbox",id:"chkCustomSize",label:s.ibm.specify,"default":!1,onKeyDown:F,setup:function(e){
this.getValue()||"true"==e.element.getAttribute("customSize")?(this.setValue(!0),P(),e.element.setAttribute("customSize",!0)):L();
},onChange:function(){
this.getValue()?P():L();
},commit:function(e){
this.getValue()&&e.element.setAttribute("customSize",!0);
}},{type:"hbox",id:"customSize",style:"display:none",widths:["45%","45%","10%"],children:[{type:"text",id:"maxWidth",required:!0,label:"*"+s.ibm.maxWidth,setup:function(e){
var t=e.element.getStyle("width");
if(t||o){
var n=t?t.match(m):o.match(m);
n&&("%"==n[2]&&(n[1]+="%",I(this.getDialog(),!1)),this.setValue(n[1]));
}
},validate:function(){
var e=this.getDialog().getContentElement("info","chkCustomSize").getValue();
if(e){
var n=CKEDITOR.dialog.validate.notEmpty(s.ibm.emptyWidth),i=n.apply(this);
if(1!=i){
return i;
}
var o=this.getValue().match(m),i=!(!o||0===parseInt(o[1],10));
return i||alert(t.lang.common.invalidWidth),i;
}
return !0;
},commit:function(e){
var t=this.getDialog().getContentElement("info","chkCustomSize").getValue();
t&&(e.element.setStyle("width",CKEDITOR.tools.cssLength(this.getValue())),i(e),n(e,CKEDITOR.tools.cssLength(this.getValue()),e.element.$.offsetHeight+"px;"));
},onKeyUp:C},{type:"text",id:"maxHeight",required:!0,label:"*"+s.ibm.maxHeight,setup:function(e){
var t=e.element.getStyle("height");
if(t||a){
var n=t?t.match(m):a.match(m);
n&&("%"==n[2]&&(n[1]+="%",I(this.getDialog(),!1)),this.setValue(n[1]));
}
},validate:function(){
var e=this.getDialog().getContentElement("info","chkCustomSize").getValue();
if(e){
var n=CKEDITOR.dialog.validate.notEmpty(s.ibm.emptyHeight),i=n.apply(this);
if(1!=i){
return i;
}
var o=this.getValue().match(m),i=!(!o||0===parseInt(o[1],10));
return i||alert(t.lang.common.invalidHeight),i;
}
return !0;
},commit:function(e){
var t=this.getDialog().getContentElement("info","chkCustomSize").getValue();
t?(e.element.setStyle("height",CKEDITOR.tools.cssLength(this.getValue())),n(e,e.element.getStyle("width"),CKEDITOR.tools.cssLength(this.getValue())+";"),i(e)):e.element.removeStyle("height");
},onKeyUp:C},{id:"ratioLock",type:"html",style:CKEDITOR.env.hc?"margin-top:8px;width:90px;height:20px;":"margin-top:8px;width:20px;height:20px;",onLoad:function(e){
var t=CKEDITOR.document.getById(E),n=CKEDITOR.document.getById(p);
this.getDialog().addFocusable(n,9),this.getDialog().addFocusable(t,10),t&&(t.on("click",function(e){
v(this),e.data&&e.data.preventDefault();
},this.getDialog()),t.on("mouseover",function(){
this.addClass("cke_btn_over");
},t),t.on("mouseout",function(){
this.removeClass("cke_btn_over");
},t)),n&&(n.on("click",function(e){
I(this);
var t=this.getValueOf("info","maxWidth");
if(o&&t){
var n=o.match(m),i=n[1];
if(a){
var r=a.match(m),s=r?r[1]:null;
}
var l=s?s/i*t:null;
isNaN(l)||this.setValueOf("info","maxHeight",Math.round(l));
}
e.data&&e.data.preventDefault();
},this.getDialog()),n.on("mouseover",function(){
this.addClass("cke_btn_over");
},n),n.on("mouseout",function(){
this.removeClass("cke_btn_over");
},n));
},setup:function(e){
o=O(e),a=D(e);
},html:"<div><a href=\"javascript:void(0)\" tabindex=\"-1\" title=\""+t.lang.embedbase.ibm.lockRatio+"\" class=\"cke_btn_locked\" id=\""+p+"\" role=\"checkbox\"><span class=\"cke_icon\"></span><span class=\"cke_label\">"+t.lang.embedbase.ibm.lockRatio+"</span></a><a href=\"javascript:void(0)\" tabindex=\"-1\" title=\""+t.lang.embedbase.ibm.resetSize+"\" class=\"cke_btn_reset\" id=\""+E+"\" role=\"button\"><span class=\"cke_label\">"+t.lang.embedbase.ibm.resetSize+"</span></a></div>"}]}]},T];
}
}},!0);
}
}


;if(!dojo._hasResource["lconn.core.widget.mentions.utilities"]){
dojo._hasResource["lconn.core.widget.mentions.utilities"]=true;
dojo.provide("lconn.core.widget.mentions.utilities");


lconn.core.widget.mentions.utilities.isSmartCloud=function(_1){
dojo.deprecated("Use declarative bindings to differentiate code in SmartCloud","5.0");
return _1&&_1.environment==="SmartCloud";
};
lconn.core.widget.mentions.utilities.isProfilesEnabled=function(){
dojo.deprecated("Use lconn.core.config.services.profiles to check if Profiles is enabled","5.0");
return lconn.core.config.services.profiles;
};
lconn.core.widget.mentions.utilities.cleanupHTML=function(_2){
if(_2.indexOf("vcard")>-1){
_2=_2.replace(/(\s|")contenteditable="false"/gi,"$1");
_2=_2.replace(/class=\"fn url hasHover\"/gi,"class=\"fn url\"");
_2=_2.replace(/(\s|")icbizcard_ref="\d+"/gi,"$1");
_2=_2.replace(/(\s|")icbizcard_idx="\d+"/gi,"$1");
_2=_2.replace(/(\s|")aria-label="[^"\r\n]*"/gi,"$1");
_2=_2.replace(/(\s|")_bizcardprocessed_="true"/gi,"$1");
}
return _2;
};
}


;if(!dojo._hasResource["lotuslive.widgets.mentions.utilities"]){
dojo._hasResource["lotuslive.widgets.mentions.utilities"]=true;
(function(){
dojo.provide("lotuslive.widgets.mentions.utilities");
dojo.mixin(lconn.core.widget.mentions.utilities,{cleanupHTML:function(_1){
if(_1.indexOf("vcard")>-1){
_1=_1.replace(/(\s|")contenteditable="false"/gi,"$1");
_1=_1.replace(/class=\"fn url hasHover\"/gi,"class=\"fn url\"");
_1=_1.replace(/(\s|")icbizcard_ref="\d+"/gi,"$1");
_1=_1.replace(/(\s|")icbizcard_idx="\d+"/gi,"$1");
_1=_1.replace(/(\s|")aria-label="[^"\r\n]*"/gi,"$1");
_1=_1.replace(/<a[^>]*class="[^"]*menu_drop_icon[^"]*"[^>]*>([^<]|<[^\/]|<\/[^a]|<\/a[^>])*<\/a>/g,"");
}
return _1;
}});
})();
}


;if(!dojo._hasResource["lconn.core.ckeditorstaticutil"]){
dojo._hasResource["lconn.core.ckeditorstaticutil"]=true;
dojo.provide("lconn.core.ckeditorstaticutil");


(function(_1){
var _2=CKEDITOR.editor.prototype.getData;
CKEDITOR.editor.prototype.getData=function(){
if(!this.keepMentionActive){
dojo.publish("CKEDITOR.beforeGetData");
}
var _3=_2.apply(this,arguments);
_3=_1.cleanupHTML(_3);
return _3;
};
var _4=CKEDITOR.editor.prototype.setData;
CKEDITOR.editor.prototype.setData=function(){
var _5=arguments[0];
var _6=arguments[1];
arguments[1]=function(){
if(this.document&&this.document.$){
var _7=this.document.$.querySelectorAll("span.vcard");
if(dojo.exists("SemTagSvc")){
dojo.forEach(_7,function(_8){
_8.setAttribute("contenteditable",false);
SemTagSvc.parseDom(0,_8);
});
}
}
if(dojo.isFunction(_6)){
_6.apply(null,arguments);
}
};
_4.apply(this,arguments);
};
}(lconn.core.widget.mentions.utilities));
}

dojo.provide("com.ibm.oneui.ckeditor.nls.lang")._built=true;
dojo.provide("com.ibm.oneui.ckeditor.nls.lang.ROOT");
if(typeof CKEDITOR === "undefined")CKEDITOR={lang:{}};
com.ibm.oneui.ckeditor.nls.lang.ROOT=CKEDITOR.lang.en={widget:{move:"Click and drag to move"},undo:{redo:"Redo",undo:"Undo"},toolbar:{toolbarCollapse:"Collapse Toolbar",toolbarExpand:"Expand Toolbar",toolbarGroups:{document:"Document",clipboard:"Clipboard/Undo",editing:"Editing",forms:"Forms",basicstyles:"Basic Styles",paragraph:"Paragraph",links:"Links",insert:"Insert",styles:"Styles",colors:"Colors",tools:"Tools"},toolbars:"Editor toolbars"},templates:{button:"Templates",emptyListMsg:"(No templates defined)",insertOption:"Replace actual contents",options:"Template Options",selectPromptMsg:"Select the template to open in the editor",title:"Content Templates"},table:{border:"Border size:",caption:"Caption:",cell:{menu:"Cell",insertBefore:"Insert Cell Before",insertAfter:"Insert Cell After",deleteCell:"Delete Cells",merge:"Merge Cells",mergeRight:"Merge Right",mergeDown:"Merge Down",splitHorizontal:"Split Cell Horizontally",splitVertical:"Split Cell Vertically",title:"Cell Properties",cellType:"Cell type:",rowSpan:"Rows span:",colSpan:"Columns span:",wordWrap:"Word wrap:",hAlign:"Horizontal alignment:",vAlign:"Vertical alignment:",alignBaseline:"Baseline",bgColor:"Background color:",borderColor:"Border color:",data:"Data",header:"Header",yes:"Yes",no:"No",invalidWidth:"Cell width must be a positive number.",invalidHeight:"Cell height must be a positive number.",invalidRowSpan:"Rows span must be a positive whole number.",invalidColSpan:"Columns span must be a positive whole number.",chooseColor:"More Colors...",ibm:{title:"Cell"}},cellPad:"Cell padding:",cellSpace:"Cell spacing:",column:{menu:"Column",insertBefore:"Insert Column Before",insertAfter:"Insert Column After",deleteColumn:"Delete Columns"},columns:"Columns:",deleteTable:"Delete Table",headers:"Headers:",headersBoth:"Both",headersColumn:"First Column",headersNone:"None",headersRow:"First Row",invalidBorder:"Border size must be a positive number.",invalidCellPadding:"Cell padding must be a positive number.",invalidCellSpacing:"Cell spacing must be a positive number.",invalidCols:"Number of columns must be a whole number greater than zero.",invalidHeight:"Table height must be a positive number.",invalidRows:"Number of rows must be a whole number greater than zero.",invalidWidth:"Table width must be a positive number.",menu:"Table Properties",row:{menu:"Row",insertBefore:"Insert Row Before",insertAfter:"Insert Row After",deleteRow:"Delete Rows"},rows:"Rows:",summary:"Summary:",title:"Table",toolbar:"Insert Table",widthPc:"percent",widthPx:"pixels",widthUnit:"Width unit:",ibm:{createTable:"Insert Table",heightUnit:"Height unit:",fixedColWidths:"Fixed column widths"}},stylescombo:{label:"Styles",panelTitle:"Styles",panelTitle1:"Block Styles",panelTitle2:"Inline Styles",panelTitle3:"Object Styles"},specialchar:{options:"Special Character Options",title:"Special Character",toolbar:"Insert Special Character"},sourcearea:{toolbar:"Source"},smiley:{options:"Emoticon Options",title:"Emoticons",toolbar:"Insert Emoticon"},showblocks:{toolbar:"Show Blocks"},selectall:{toolbar:"Select All"},save:{toolbar:"Save"},removeformat:{toolbar:"Remove Format"},print:{toolbar:"Print"},preview:{preview:"Preview:"},pastetext:{button:"Paste as plain text",title:"Paste as Plain Text"},pastefromword:{confirmCleanup:"The text you want to paste seems to be copied from Word. Do you want to clean it before pasting?",error:"It was not possible to clean up the pasted data due to an internal error",title:"Paste Special",toolbar:"Paste Special"},pagebreak:{alt:"Page Break",toolbar:"Insert Page Break"},notification:{closed:"Notification closed."},newpage:{toolbar:"New Page"},maximize:{maximize:"Maximize",minimize:"Minimize"},magicline:{title:"Insert paragraph here"},liststyle:{armenian:"Armenian numbering",bulletedTitle:"Bulleted List Properties",circle:"Circle",decimal:"Decimal (1, 2, 3, etc.)",decimalLeadingZero:"Decimal leading zero (01, 02, 03, etc.)",disc:"Disc",georgian:"Georgian numbering (an, ban, gan, etc.)",lowerAlpha:"Lower Alpha (a, b, c, d, e, etc.)",lowerGreek:"Lower Greek (alpha, beta, gamma, etc.)",lowerRoman:"Lower Roman (i, ii, iii, iv, v, etc.)",none:"None",notset:"not set",numberedTitle:"Numbered List Properties",square:"Square",start:"Start:",type:"List style:",upperAlpha:"Upper Alpha (A, B, C, D, E, etc.)",upperRoman:"Upper Roman (I, II, III, IV, V, etc.)",validateStartNumber:"List start number must be a whole number."},list:{bulletedlist:"Bulleted List",numberedlist:"Numbered List",ibm:{numberedTitle:"Numbered List",bulletedTitle:"Bulleted List",description:"Settings will be applied to the current list level",fontsize:"Font size:"}},link:{acccessKey:"Access Key:",advanced:"Advanced",advisoryContentType:"Advisory Content Type:",advisoryTitle:"Advisory title:",anchor:{toolbar:"Insert Document Bookmark",menu:"Edit Document Bookmark",title:"Document Bookmark",name:"Name:",errorName:"Please enter a name for the document bookmark",remove:"Remove Document Bookmark",ibm:{description:"Type a descriptive bookmark name, such as 'Section 1.2'. After inserting the bookmark, click either the 'Link' or 'Document Bookmark Link' icon to link to it."}},anchorId:"By Element ID",anchorName:"By Anchor Name",charset:"Linked Resource Charset:",cssClasses:"Stylesheet classes:",emailAddress:"E-Mail Address",emailBody:"Message Body",emailSubject:"Message Subject",id:"ID:",info:"Link Information",langCode:"Language Code:",langDir:"Language Direction:",langDirLTR:"Left to Right",langDirRTL:"Right to Left",menu:"Edit Link",name:"Name:",noAnchors:"No bookmarks available in the document. Click the 'Insert Document Bookmark' icon on the toolbar to add one.",noEmail:"Please type the e-mail address",noUrl:"Please type the link URL",other:"other",popupDependent:"Dependent (Netscape)",popupFeatures:"Popup Window Features:",popupFullScreen:"Full Screen (IE)",popupLeft:"Left Position",popupLocationBar:"Location Bar",popupMenuBar:"Menu Bar",popupResizable:"Resizable",popupScrollBars:"Scroll Bars",popupStatusBar:"Status Bar",popupToolbar:"Toolbar",popupTop:"Top Position",rel:"Relationship",selectAnchor:"Select an Anchor",styles:"Style:",tabIndex:"Tab Index:",target:"Target",targetFrame:"frame",targetFrameName:"Target Frame Name:",targetPopup:"popup window",targetPopupName:"Popup Window Name:",title:"Link",toAnchor:"Link to anchor in the text",toEmail:"E-mail",toUrl:"URL",toolbar:"URL Link",type:"Link Type:",unlink:"Remove Link",upload:"Upload:"},language:{button:"Set Language",remove:"Remove language"},justify:{block:"Align Justified",center:"Align Center",left:"Align Left",right:"Align Right"},indent:{indent:"Increase Indent",outdent:"Decrease Indent"},image:{alertUrl:"Please type the image URL",alt:"Alternative text:",border:"Border:",btnUpload:"Upload image",button2Img:"Do you want to transform the selected image button into a simple image?",hSpace:"Horizontal space:",img2Button:"Do you want to transform the selected image into an image button?",infoTab:"Image Information",linkTab:"Link",lockRatio:"Lock Ratio",menu:"Image Properties",resetSize:"Reset Size",title:"Image",titleButton:"Image Button Properties",upload:"Upload",urlMissing:"Image source URL is missing.",vSpace:"Vertical space:",validateBorder:"Border must be a positive whole number.",validateHSpace:"Horizontal space must be a positive whole number.",validateVSpace:"Vertical space must be a positive whole number.",ibm:{previewText:"Text will flow around the image you are adding like in this example.",fileUpload:"Select an image file from your computer:"}},iframe:{border:"Show frame border",noUrl:"Please type the iframe URL",scrolling:"Enable scrollbars",title:"IFrame Properties",toolbar:"Insert IFrame",ibm:{title:"IFrame"}},ibmwidgets:{ariaNotification:"Video selected, press ENTER to access video controllers",iframeAriaNotification:"IFrame selected",imgAriaNotification:"Picture selected",mediaObjectAriaNotification:"Media object selected",properties:"Media Properties",focusBackNotification:"Press ESC to focus back to the editor"},ibmurllink:{title:"URL Link",linkText:"Link Text:",selectAnchor:"Select an Anchor:",nourl:"Please enter a URL into the text field.",urlhelp:"Type or paste a URL to open when users click this link, for example http://www.example.com.",displaytxthelp:"Type text display for the link.",openinnew:"Open link in new window",documentbookmarktitle:"Document Bookmark Link",linkTo:"Link to:"},ibmtoolbars:{menu:{link:"Insert Link",list:"List",paste:"Paste",action:"Action",align:"Align",emoticon:"Emoticon"}},ibmtabletools:{insertMultipleRows:"Insert Rows",insertMultipleCols:"Insert Columns",noOfRows:"Number of Rows:",noOfCols:"Number of Columns:",insertPosition:"Position:",insertBefore:"Before",insertAfter:"After",selectTable:"Select Table",selectRow:"Select Row",columnTitle:"Column Width",colProps:"Column Properties",invalidColumnWidth:"Column width must be a positive number.",sortTable:"Sort Table",sortTableContextMenuOption:"Sort Table",colNumber:"Column",sortOrderAsc:"Ascending",sortOrderDesc:"Descending",sortOrder:"Sort Order",textType:"Text",numericType:"Number",sortType:"Sort Type",invalidColumnNumber:"Column number must be a positive number.",columnDoesNotExist:"Column $1 does not exist.",mergedCells:"Cannot sort a table containing merged cells"},ibmstatusmessage:{keystrokeForHelp:"Press ALT 0 for help"},ibmspellchecker:{title:"Check Spelling",replace:"Replace:",suggesstion:"Suggestions:",withLabel:"With:",replaceButton:"Replace",replaceallButton:"Replace All",skipButton:"Skip",skipallButton:"Skip All",undochanges:"Undo Changes",complete:"Spell Check Complete",problem:"Problem retrieving XML data",addDictionary:"Add to Dictionary",editDictionary:"Edit Dictionary"},ibmsametimeemoticons:{angel:"Angel",angry:"Angry",cool:"Cool",crying:"Crying",eyebrow:"Eyebrow",frown:"Frown",goofy:"Goofy",grin:"Grin",half:"Half",idea:"Idea",laughing:"Laughing",laughroll:"Laughing roll",no:"No",oops:"Oops",shy:"Shy",smile:"Smile",tongue:"Tongue",wink:"Wink",yes:"Yes"},ibmpermanentpen:{title:"Permanent pen properties",pen:"Permanent Pen",font:"Font",size:"Size",style:"Style",bold:"Bold",italic:"Italic",underline:"Underline",strikethrough:"Strikethrough",background:"Background Color",color:"Choose Color",textcolor:"Text Color"},ibmpastemedialink:{widgetNotification:"The pasted URL was identified as containing social media content, and has been automatically converted into an a widget embedding the rich media content"},ibmmenuhelpmessage:{keystrokeForContextMenu:"Ctrl + right click for more options",keystrokeForContextMenuMac:"Cmd + right click for more options"},ibmlanguagedropdown:{arabic:"Arabic",basque:"Basque",bulgarian:"Bulgarian",catalan:"Catalan",chinese_simplified:"Chinese Simplified",chinese_traditional:"Chinese Traditional",croatian:"Croatian",czech:"Czech",danish:"Danish",dutch:"Dutch",english:"English",finnish:"Finnish",french:"French",german:"German",greek:"Greek",hebrew:"Hebrew",hungarian:"Hungarian",indonesian:"Indonesian",italian:"Italian",japanese:"Japanese",kazakh:"Kazakh",korean:"Korean",norwegian_bokmal:"Norwegian Bokmal",polish:"Polish",portuguese:"Portuguese",portuguese_brazilian:"Portuguese Brazilian",romanian:"Romanian",russian:"Russian",slovak:"Slovak",slovenian:"Slovenian",spanish:"Spanish",serbian:"Serbian",swedish:"Swedish",thai:"Thai",turkish:"Turkish"},ibminsertmedia:{wrongVisibility:"Error embedding the media selected\nThe visibility must be public.",badResponse:"The embed media has moved or no longer exists",timeout:"Embed request timed out\nPlease try again."},ibmimagedatauri:{error:"Pasting images is currently not supported. Please use the 'Insert Image' toolbar option instead."},ibmbinaryimagehandler:{},horizontalrule:{toolbar:"Insert Horizontal Line"},forms:{button:{title:"Button Properties",text:"Text (Value)",type:"Type",typeBtn:"Button",typeSbm:"Submit",typeRst:"Reset"},checkboxAndRadio:{checkboxTitle:"Checkbox Properties",radioTitle:"Radio Button Properties",value:"Value",selected:"Selected",required:"Required"},form:{title:"Form Properties",menu:"Form Properties",action:"Action",method:"Method",encoding:"Encoding"},hidden:{title:"Hidden Field Properties",name:"Name",value:"Value"},select:{title:"Selection Field Properties",selectInfo:"Select Info",opAvail:"Available Options",value:"Value",size:"Size",lines:"lines",chkMulti:"Allow multiple selections",required:"Required",opText:"Text",opValue:"Value",btnAdd:"Add",btnModify:"Modify",btnUp:"Up",btnDown:"Down",btnSetValue:"Set as selected value",btnDelete:"Delete"},textarea:{title:"Textarea Properties",cols:"Columns",rows:"Rows"},textfield:{title:"Text Field Properties",name:"Name",value:"Value",charWidth:"Character Width",maxChars:"Maximum Characters",required:"Required",type:"Type",typeText:"Text",typePass:"Password",typeEmail:"Email",typeSearch:"Search",typeTel:"Telephone Number",typeUrl:"URL"}},format:{label:"Format",panelTitle:"Paragraph Format",tag_address:"Address",tag_div:"Normal (DIV)",tag_h1:"Heading 1",tag_h2:"Heading 2",tag_h3:"Heading 3",tag_h4:"Heading 4",tag_h5:"Heading 5",tag_h6:"Heading 6",tag_p:"Normal",tag_pre:"Formatted"},font:{fontSize:{label:"Size",voiceLabel:"Font Size",panelTitle:"Font Size"},label:"Font",panelTitle:"Font Name",voiceLabel:"Font"},flash:{access:"Script access:",accessAlways:"Always",accessNever:"Never",accessSameDomain:"Same domain",alignAbsBottom:"Abs Bottom",alignAbsMiddle:"Abs Middle",alignBaseline:"Baseline",alignTextTop:"Text Top",bgcolor:"Background color:",chkFull:"Allow fullscreen",chkLoop:"Loop",chkMenu:"Enable flash menu",chkPlay:"Auto play",flashvars:"Variables:",hSpace:"Horizontal space:",properties:"Flash Properties",propertiesTab:"Properties",quality:"Quality:",qualityAutoHigh:"Auto High",qualityAutoLow:"Auto Low",qualityBest:"Best",qualityHigh:"High",qualityLow:"Low",qualityMedium:"Medium",scale:"Scale:",scaleAll:"Show all",scaleFit:"Exact Fit",scaleNoBorder:"No Border",title:"Flash",vSpace:"Vertical space:",validateHSpace:"Horizontal space must be a positive whole number.",validateSrc:"URL must not be empty.",validateVSpace:"Vertical space must be a positive whole number.",windowMode:"Window mode:",windowModeOpaque:"Opaque",windowModeTransparent:"Transparent",windowModeWindow:"Window"},find:{find:"Find",findOptions:"Find Options",findWhat:"Find:",matchCase:"Match case",matchCyclic:"Match cyclic",matchWord:"Match whole word",notFoundMsg:"The specified text was not found.",replace:"Replace",replaceAll:"Replace All",replaceSuccessMsg:"%1 occurrence(s) replaced.",replaceWith:"Replace with:",title:"Find And Replace"},fakeobjects:{anchor:"Anchor",flash:"Flash Animation",hiddenfield:"Hidden Field",iframe:"IFrame",unknown:"Unknown Object"},embedbase:{pathName:"media object",title:"Media",url:"URL:",button:"Insert Media",unsupportedUrlGiven:"The specified URL is not supported.",unsupportedUrl:"The URL {url} is not supported by Media Embed.",fetchingFailedGiven:"Failed to fetch content for the given URL.",fetchingFailed:"Failed to fetch content for {url}.",fetchingOne:"Fetching oEmbed response...",fetchingMany:"Fetching oEmbed responses, {current} of {max} done...",ibm:{alignment:"Alignment:",options:"Alignment Options",left:"Left",center:"Center",right:"Right",predefined:"Media Width:",specify:"Specify Size",maxWidth:"Width:",maxHeight:"Height:",emptyURL:"Media source URL is missing.",emptyWidth:"Width field should not be empty.",emptyHeight:"Height field should not be empty.",unsafeContent:"Unsafe Content",buttons:{original:"Original",small:"Small (300px)",medium:"Medium (500px)",fitPageWidth:"Fit page width"},lockRatio:"Lock Ratio",resetSize:"Reset Size"}},elementspath:{eleLabel:"Elements path",eleTitle:"%1 element"},div:{IdInputLabel:"ID",advisoryTitleInputLabel:"Advisory title",cssClassInputLabel:"Stylesheet classes",edit:"Edit Div",inlineStyleInputLabel:"Inline Style",langDirLTRLabel:"Left to Right (LTR)",langDirLabel:"Language Direction",langDirRTLLabel:"Right to Left (RTL)",languageCodeInputLabel:" Language Code",remove:"Remove Div",styleSelectLabel:"Style",title:"Create Div Container",toolbar:"Create Div Container"},copyformatting:{label:"Copy Formatting",menuLabel:"Apply style",notification:{copied:"Formatting copied",applied:"Formatting applied",canceled:"Formatting canceled",failed:"Formatting failed - no formatting copied"}},contextmenu:{options:"Context Menu Options"},colordialog:{clear:"Clear",highlight:"Highlight",options:"Color Options",selected:"Selected color",title:"Select Color",ibm:{currentColor:"Current color"}},colorbutton:{auto:"Automatic",bgColorTitle:"Background Color",colors:{"000":"Black",800000:"Maroon","8B4513":"Saddle Brown","2F4F4F":"Dark Slate Gray","008080":"Teal","000080":"Navy","4B0082":"Indigo",696969:"Dark Gray",B22222:"Fire Brick",A52A2A:"Brown",DAA520:"Golden Rod","006400":"Dark Green","40E0D0":"Turquoise","0000CD":"Medium Blue",800080:"Purple",808080:"Gray",F00:"Red",FF8C00:"Dark Orange",FFD700:"Gold","008000":"Green","0FF":"Cyan","00F":"Blue",EE82EE:"Violet",A9A9A9:"Dim Gray",FFA07A:"Light Salmon",FFA500:"Orange",FFFF00:"Yellow","00FF00":"Lime",AFEEEE:"Pale Turquoise",ADD8E6:"Light Blue",DDA0DD:"Plum",D3D3D3:"Light Gray",FFF0F5:"Lavender Blush",FAEBD7:"Antique White",FFFFE0:"Light Yellow",F0FFF0:"Honeydew",F0FFFF:"Azure",F0F8FF:"Alice Blue",E6E6FA:"Lavender",FFF:"White"},more:"More Colors...",panelTitle:"Colors",textColorTitle:"Text Color"},clipboard:{copy:"Copy",copyError:"Your browser security settings prevent automatic copying. Use Ctrl+C on your keyboard instead.",cut:"Cut",cutError:"Your browser security settings prevent automatic cutting. Use Ctrl+X on your keyboard instead.",paste:"Paste",pasteArea:"Paste Area",pasteMsg:"Press Ctrl+V (Cmd+V on MAC) to paste below.",securityMsg:"Your browser security blocks pasting directly from the clipboard.",title:"Paste",fakepath:"Pasting images is currently not supported. Please use the 'Insert Image' toolbar option instead."},button:{selectedLabel:"%1 (Selected)"},blockquote:{toolbar:"Blockquote"},bidi:{ltr:"Text Direction From Left To Right",rtl:"Text Direction From Right To Left"},basicstyles:{bold:"Bold",italic:"Italic",strike:"Strikethrough",subscript:"Subscript",superscript:"Superscript",underline:"Underline"},about:{copy:"Copyright &copy; $1. All rights reserved.",dlgTitle:"About CKEditor",help:"Check $1 for help.",moreInfo:"For licensing information please visit our web site:",title:"About CKEditor",userGuide:"CKEditor User's Guide"},dir:"ltr",editor:"Rich Text Editor",editorPanel:"Rich Text Editor panel",common:{editorHelp:"Press ALT 0 for help",browseServer:"Browser Server:",url:"URL:",protocol:"Protocol:",upload:"Upload:",uploadSubmit:"Send it to the Server",image:"Insert Image",flash:"Insert Flash Movie",form:"Insert Form",checkbox:"Insert Checkbox",radio:"Insert Radio Button",textField:"Insert Text Field",textarea:"Insert Text Area",hiddenField:"Insert Hidden Field",button:"Insert Button",select:"Insert Selection Field",imageButton:"Insert Image Button",notSet:"not set",id:"ID:",name:"Name:",langDir:"Language Direction:",langDirLtr:"Left to Right",langDirRtl:"Right to Left",langCode:"Language Code:",longDescr:"Long Description URL:",cssClass:"Stylesheet classes:",advisoryTitle:"Advisory title:",cssStyle:"Style:",ok:"OK",cancel:"Cancel",close:"Close",preview:"Preview:",resize:"Resize",generalTab:"General",advancedTab:"Advanced",validateNumberFailed:"This value is not a number.",confirmNewPage:"Any unsaved changes to this content will be lost. Are you sure you want to load a new page?",confirmCancel:"Some of the options have been changed. Are you sure you want to close the dialog?",options:"Options",target:"Target:",targetNew:"New Window (_blank)",targetTop:"Topmost Window (_top)",targetSelf:"Same Window (_self)",targetParent:"Parent Window (_parent)",langDirLTR:"Left to Right",langDirRTL:"Right to Left",styles:"Style:",cssClasses:"Stylesheet Classes:",width:"Width:",height:"Height:",align:"Align:",alignLeft:"Left",alignRight:"Right",alignCenter:"Center",alignJustify:"Justify",alignTop:"Top",alignMiddle:"Middle",alignBottom:"Bottom",alignNone:"None",invalidValue:"Invalid value.",invalidHeight:"Height must be a positive whole number.",invalidWidth:"Width must be a positive whole number.",invalidCssLength:"Value specified for the '%1' field must be a positive number with or without a valid CSS measurement unit (px, %, in, cm, mm, em, ex, pt, or pc).",invalidHtmlLength:"Value specified for the '%1' field must be a positive number with or without a valid HTML measurement unit (px or %).",invalidInlineStyle:"Value specified for the inline style must consist of one or more tuples with the format of \"name : value\", separated by semi-colons.",cssLengthTooltip:"Enter a number for a value in pixels or a number with a valid CSS unit (px, %, in, cm, mm, em, ex, pt, or pc).",unavailable:"%1<span class=\"cke_accessibility\">, unavailable</span>",loading:"Loading..."},ibm:{common:{widthIn:"inches",widthCm:"centimeters",widthMm:"millimeters",widthEm:"em",widthEx:"ex",widthPt:"points",widthPc:"picas",required:"Required"}},wsc:{btnIgnore:"Ignore",btnIgnoreAll:"Ignore All",btnReplace:"Replace",btnReplaceAll:"Replace All",btnUndo:"Undo",changeTo:"Change to",errorLoading:"Error loading application service host: %s.",ieSpellDownload:"Spell checker not installed. Do you want to download it now?",manyChanges:"Spell check complete: %1 words changed",noChanges:"Spell check complete: No words changed",noMispell:"Spell check complete: No misspellings found",noSuggestions:"- No suggestions -",notAvailable:"Sorry, but service is unavailable now.",notInDic:"Not in dictionary",oneChange:"Spell check complete: One word changed",progress:"Spell check in progress...",title:"Spell Check",toolbar:"Check Spelling"},scayt:{about:"About SCAYT",aboutTab:"About",addWord:"Add Word",allCaps:"Ignore All-Caps Words",dic_create:"Create",dic_delete:"Delete",dic_field_name:"Dictionary name",dic_info:"Initially the User Dictionary is stored in a Cookie. However, Cookies are limited in size. When the User Dictionary grows to a point where it cannot be stored in a Cookie, then the dictionary may be stored on our server. To store your personal dictionary on our server you should specify a name for your dictionary. If you already have a stored dictionary, please type its name and click the Restore button.",dic_rename:"Rename",dic_restore:"Restore",dictionariesTab:"Dictionaries",disable:"Disable SCAYT",emptyDic:"Dictionary name should not be empty.",enable:"Enable SCAYT",ignore:"TESTIgnore",ignoreAll:"Ignore All",ignoreDomainNames:"Ignore Domain Names",langs:"Languages",languagesTab:"Languages",mixedCase:"Ignore Words with Mixed Case",mixedWithDigits:"Ignore Words with Numbers",moreSuggestions:"More suggestions",opera_title:"Not supported by Opera",options:"Options",optionsTab:"Options",title:"Spell Check As You Type",toggle:"Toggle SCAYT",noSuggestions:"No suggestion"}};

;if(!dojo._hasResource["lconn.core.ckeditorstatic"]){
dojo._hasResource["lconn.core.ckeditorstatic"]=true;
dojo.provide("lconn.core.ckeditorstatic");




dojo.requireLocalization("com.ibm.oneui.ckeditor","lang");
}


window['_js_modules']=(window['_js_modules']||[]).concat(["lconn.core.ckeditorstatic"]);
