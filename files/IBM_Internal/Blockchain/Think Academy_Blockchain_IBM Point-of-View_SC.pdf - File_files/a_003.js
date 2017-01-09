
;(function(){
var _1={},_2={},_3=(typeof dojoConfig!=="undefined"?dojoConfig:djConfig).baseUrl;
_3=_3.substring(0,_3.length-5);
function _4(_5,id){
if(id==="require"){
return _6(_5);
}
if(id==="exports"){
return _7(_5,true);
}
if(id==="module"){
return {id:_5};
}
return _7(_8(_5,id));
};
function _7(id,_9){
if(!id){
return null;
}
if(!id.indexOf("css!")){
console.warn("The css! AMD plugin is unsupported in Connections: "+id.substring(4));
return;
}
if(!id.indexOf("jazz/inverted!")){
_9=id=id.substring(14);
}
var _a=_1[id];
if(_a){
return _a;
}
if(_9){
return _1[id]={};
}
if(id.indexOf("dojo/text!")===0){
id=id.substring(id.indexOf("dojo/text!")+10,id.lastIndexOf(".")).replace(/\./g,"/")+id.substring(id.lastIndexOf("."));
return dojo.cache(id.substring(0,id.indexOf("/")),id.substring(id.indexOf("/")+1));
}
if(id.indexOf("!")!==-1){
id=id.substring(id.indexOf("!")+1);
}
var _b=id.replace(/\//g,".");
try{
net.jazz.ajax.xdloader.load_sync(_b);
}
catch(e){
console.error(e);
}
_a=dojo.getObject(_b)||_1[id];
if(_a){
return _1[id]=_a;
}
};
function _6(_c){
function _d(_e,_f,_10){
if(typeof _e=="string"&&!_f){
var _11=_8(_c,_e);
if(_10&&_1[_11]===undefined){
net.jazz.ajax.xdloader.load_sync(_e);
}
return _1[_11];
}
var i,_12,_13=[];
for(i=0;i<_e.length;i++){
_12=_8(_c,_e[i]);
if(!_12){
continue;
}
if(_12.indexOf("!")==-1){
_12=_12.replace(/\//g,".");
}
_13[i]=_12;
}
net.jazz.ajax.xdloader.batch_load_async(_13,function(){
var _14=[];
for(i=0;i<_e.length;i++){
_14[i]=(_d(_e[i]));
}
_f&&_f.apply(null,_14);
});
};
_d.on=function ready(_15,_16){
_16();
};
_d.toUrl=function toUrl(url){
return _3+_1a(_c,url);
};
_d.idle=function(){
return true;
};
return _d;
};
function _8(_17,_18){
var i,_19=_18.split("!");
for(i=0;i<_19.length;i++){
_19[i]=_1a(_17,_19[i]);
}
_18=_19.join("!");
if(!_18.indexOf("dojo/has!")){
var has=_1["dojo/has"];
_18=_18.substring(9);
_18=has.normalize(_18,function(_1b){
return _1a(_17,_1b);
});
}else{
if(_18=="dojo/domReady!"){
return;
}
}
if(_2[_18]){
_18+="/main";
}
return _18;
};
function _1a(_1c,_1d){
if(_1d.charAt(0)!="."){
return _1d;
}
if(_1d.charAt(1)=="."){
_1d=_1c+"/../"+_1d;
}else{
_1d=_1c+"/."+_1d;
}
while(_1c!=_1d){
_1d=(_1c=_1d).replace(/\/[^\/]+\/\.\./,"");
}
return _1d;
};
define=function(id,_1e,_1f){
if(typeof id!=="string"){
_1f=_1e;
_1e=id;
id=__module||"";
}
if(!_1f){
return _1[id]=typeof _1e==="function"?_1e():_1e;
}
var i,d,_20=[];
for(i=0;i<_1e.length;i++){
d=_4(id,_1e[i]);
_20[i]=d;
}
_1[id]=_1f.apply(null,_20)||_1[id]||true;
};
define._modules=_1;
define._packages=_2;
require=_6("");
})();

if(typeof define!=="undefined"&&typeof define._packages!=="undefined")define._packages["dojo"]=true;

;define("dojo/has",["require","module"],function(_1,_2){
var _3=_1.has||function(){
};
if(!_3("dojo-has-api")){
var _4=typeof window!="undefined"&&typeof location!="undefined"&&typeof document!="undefined"&&window.location==location&&window.document==document,_5=(function(){
return this;
})(),_6=_4&&document,_7=_6&&_6.createElement("DiV"),_8=(_2.config&&_2.config())||{};
_3=function(_9){
return typeof _8[_9]=="function"?(_8[_9]=_8[_9](_5,_6,_7)):_8[_9];
};
_3.cache=_8;
_3.add=function(_a,_b,_c,_d){
(typeof _8[_a]=="undefined"||_d)&&(_8[_a]=_b);
return _c&&_3(_a);
};
_3.add("host-browser",_4);
_3.add("host-node",(typeof process=="object"&&process.versions&&process.versions.node&&process.versions.v8));
_3.add("host-rhino",(typeof load=="function"&&(typeof Packages=="function"||typeof Packages=="object")));
_3.add("dom",_4);
_3.add("dojo-dom-ready-api",1);
_3.add("dojo-sniff",1);
}
if(_3("host-browser")){
_3.add("dom-addeventlistener",!!document.addEventListener);
_3.add("touch","ontouchstart" in document||("onpointerdown" in document&&navigator.maxTouchPoints>0)||window.navigator.msMaxTouchPoints);
_3.add("touch-events","ontouchstart" in document);
_3.add("pointer-events","onpointerdown" in document);
_3.add("MSPointer","msMaxTouchPoints" in navigator);
_3.add("device-width",screen.availWidth||innerWidth);
var _e=document.createElement("form");
_3.add("dom-attributes-explicit",_e.attributes.length==0);
_3.add("dom-attributes-specified-flag",_e.attributes.length>0&&_e.attributes.length<40);
}
_3.clearElement=function(_f){
_f.innerHTML="";
return _f;
};
_3.normalize=function(id,_10){
var _11=id.match(/[\?:]|[^:\?]*/g),i=0,get=function(_12){
var _13=_11[i++];
if(_13==":"){
return 0;
}else{
if(_11[i++]=="?"){
if(!_12&&_3(_13)){
return get();
}else{
get(true);
return get(_12);
}
}
return _13||0;
}
};
id=get();
return id&&_10(id);
};
_3.load=function(id,_14,_15){
if(id){
_14([id],_15);
}else{
_15();
}
};
return _3;
});


;define("dojo/_base/config",["../has","require"],function(_1,_2){
var _3={};
if(_1("dojo-config-api")){
var _4=_2.rawConfig,p;
for(p in _4){
_3[p]=_4[p];
}
}else{
var _5=function(_6,_7,_8){
for(p in _6){
p!="has"&&_1.add(_7+p,_6[p],0,_8);
}
};
var _9=(function(){
return this;
})();
_3=_1("dojo-loader")?_2.rawConfig:_9.dojoConfig||_9.djConfig||{};
_5(_3,"config",1);
_5(_3.has,"",1);
}
if(!_3.locale&&typeof navigator!="undefined"){
var _a=(navigator.language||navigator.userLanguage);
if(_a){
_3.locale=_a.toLowerCase();
}
}
return _3;
});


;define("dojo/_base/kernel",["../has","./config","require","module"],function(_1,_2,_3,_4){
var i,p,_5=(function(){
return this;
})(),_6={},_7={},_8={config:_2,global:_5,dijit:_6,dojox:_7};
var _9={dojo:["dojo",_8],dijit:["dijit",_6],dojox:["dojox",_7]},_a=(_3.map&&_3.map[_4.id.match(/[^\/]+/)[0]]),_b;
for(p in _a){
if(_9[p]){
_9[p][0]=_a[p];
}else{
_9[p]=[_a[p],{}];
}
}
for(p in _9){
_b=_9[p];
_b[1]._scopeName=_b[0];
if(!_2.noGlobals){
_5[_b[0]]=_b[1];
}
}
_8.scopeMap=_9;
_8.baseUrl=_8.config.baseUrl;
_8.isAsync=false;
_8.locale=_2.locale;
var _c="$Rev: f4fef70 $".match(/[0-9a-f]{7,}/);
_8.version={major:1,minor:10,patch:4,flag:"",revision:_c?_c[0]:NaN,toString:function(){
var v=_8.version;
return v.major+"."+v.minor+"."+v.patch+v.flag+" ("+v.revision+")";
}};
_1.add("extend-dojo",1);
(Function("d","d.eval = function(){return d.global.eval ? d.global.eval(arguments[0]) : eval(arguments[0]);}"))(_8);
if(_1("host-rhino")){
_8.exit=function(_d){
quit(_d);
};
}else{
_8.exit=function(){
};
}
_1.add("dojo-guarantee-console",1);
if(_1("dojo-guarantee-console")){
typeof console!="undefined"||(console={});
var cn=["assert","count","debug","dir","dirxml","error","group","groupEnd","info","profile","profileEnd","time","timeEnd","trace","warn","log"];
var tn;
i=0;
while((tn=cn[i++])){
if(!console[tn]){
(function(){
var _e=tn+"";
console[_e]=("log" in console)?function(){
var a=Array.prototype.slice.call(arguments);
a.unshift(_e+":");
console["log"](a.join(" "));
}:function(){
};
console[_e]._fake=true;
})();
}
}
}
_1.add("dojo-debug-messages",!!_2.isDebug);
_8.deprecated=_8.experimental=function(){
};
if(_1("dojo-debug-messages")){
_8.deprecated=function(_f,_10,_11){
var _12="DEPRECATED: "+_f;
if(_10){
_12+=" "+_10;
}
if(_11){
_12+=" -- will be removed in version: "+_11;
}
console.warn(_12);
};
_8.experimental=function(_13,_14){
var _15="EXPERIMENTAL: "+_13+" -- APIs subject to change without notice.";
if(_14){
_15+=" "+_14;
}
console.warn(_15);
};
}
_1.add("dojo-modulePaths",1);
if(_1("dojo-modulePaths")){
if(_2.modulePaths){
_8.deprecated("dojo.modulePaths","use paths configuration");
var _16={};
for(p in _2.modulePaths){
_16[p.replace(/\./g,"/")]=_2.modulePaths[p];
}
_3({paths:_16});
}
}
_1.add("dojo-moduleUrl",1);
if(_1("dojo-moduleUrl")){
_8.moduleUrl=function(_17,url){
var _18=null;
if(_17){
_18=_3.toUrl(_17.replace(/\./g,"/")+(url?("/"+url):"")+"/*.*").replace(/\/\*\.\*/,"")+(url?"":"/");
}
return _18;
};
}
_8._hasResource={};
return _8;
});


;define("dojo/sniff",["./has"],function(_1){
if(_1("host-browser")){
var n=navigator,_2=n.userAgent,_3=n.appVersion,tv=parseFloat(_3);
_1.add("air",_2.indexOf("AdobeAIR")>=0);
_1.add("wp",parseFloat(_2.split("Windows Phone")[1])||undefined);
_1.add("msapp",parseFloat(_2.split("MSAppHost/")[1])||undefined);
_1.add("khtml",_3.indexOf("Konqueror")>=0?tv:undefined);
_1.add("webkit",!_1("wp")&&parseFloat(_2.split("WebKit/")[1])||undefined);
_1.add("chrome",parseFloat(_2.split("Chrome/")[1])||undefined);
_1.add("android",!_1("wp")&&parseFloat(_2.split("Android ")[1])||undefined);
_1.add("safari",_3.indexOf("Safari")>=0&&!_1("wp")&&!_1("chrome")&&!_1("android")?parseFloat(_3.split("Version/")[1]):undefined);
_1.add("mac",_3.indexOf("Macintosh")>=0);
_1.add("quirks",document.compatMode=="BackCompat");
if(!_1("wp")&&_2.match(/(iPhone|iPod|iPad)/)){
var p=RegExp.$1.replace(/P/,"p");
var v=_2.match(/OS ([\d_]+)/)?RegExp.$1:"1";
var os=parseFloat(v.replace(/_/,".").replace(/_/g,""));
_1.add(p,os);
_1.add("ios",os);
}
_1.add("bb",(_2.indexOf("BlackBerry")>=0||_2.indexOf("BB10")>=0)&&parseFloat(_2.split("Version/")[1])||undefined);
_1.add("trident",parseFloat(_3.split("Trident/")[1])||undefined);
_1.add("svg",typeof SVGAngle!=="undefined");
if(!_1("webkit")){
if(_2.indexOf("Opera")>=0){
_1.add("opera",tv>=9.8?parseFloat(_2.split("Version/")[1])||tv:tv);
}
if(_2.indexOf("Gecko")>=0&&!_1("wp")&&!_1("khtml")&&!_1("webkit")&&!_1("trident")){
_1.add("mozilla",tv);
}
if(_1("mozilla")){
_1.add("ff",parseFloat(_2.split("Firefox/")[1]||_2.split("Minefield/")[1])||undefined);
}
if(document.all&&!_1("opera")){
var _4=parseFloat(_3.split("MSIE ")[1])||undefined;
var _5=document.documentMode;
if(_5&&_5!=5&&Math.floor(_4)!=_5){
_4=_5;
}
_1.add("ie",_4);
}
_1.add("wii",typeof opera!="undefined"&&opera.wiiremote);
}
}
return _1;
});


;define("dojo/_base/lang",["./kernel","../has","../sniff"],function(_1,_2){
_2.add("bug-for-in-skips-shadowed",function(){
for(var i in {toString:1}){
return 0;
}
return 1;
});
var _3=_2("bug-for-in-skips-shadowed")?"hasOwnProperty.valueOf.isPrototypeOf.propertyIsEnumerable.toLocaleString.toString.constructor".split("."):[],_4=_3.length,_5=function(_6,_7,_8){
if(!_8){
if(_6[0]&&_1.scopeMap[_6[0]]){
_8=_1.scopeMap[_6.shift()][1];
}else{
_8=_1.global;
}
}
try{
for(var i=0;i<_6.length;i++){
var p=_6[i];
if(!(p in _8)){
if(_7){
_8[p]={};
}else{
return;
}
}
_8=_8[p];
}
return _8;
}
catch(e){
}
},_9=Object.prototype.toString,_a=function(_b,_c,_d){
return (_d||[]).concat(Array.prototype.slice.call(_b,_c||0));
},_e=/\{([^\}]+)\}/g;
var _f={_extraNames:_3,_mixin:function(_10,_11,_12){
var _13,s,i,_14={};
for(_13 in _11){
s=_11[_13];
if(!(_13 in _10)||(_10[_13]!==s&&(!(_13 in _14)||_14[_13]!==s))){
_10[_13]=_12?_12(s):s;
}
}
if(_2("bug-for-in-skips-shadowed")){
if(_11){
for(i=0;i<_4;++i){
_13=_3[i];
s=_11[_13];
if(!(_13 in _10)||(_10[_13]!==s&&(!(_13 in _14)||_14[_13]!==s))){
_10[_13]=_12?_12(s):s;
}
}
}
}
return _10;
},mixin:function(_15,_16){
if(!_15){
_15={};
}
for(var i=1,l=arguments.length;i<l;i++){
_f._mixin(_15,arguments[i]);
}
return _15;
},setObject:function(_17,_18,_19){
var _1a=_17.split("."),p=_1a.pop(),obj=_5(_1a,true,_19);
return obj&&p?(obj[p]=_18):undefined;
},getObject:function(_1b,_1c,_1d){
return !_1b?_1d:_5(_1b.split("."),_1c,_1d);
},exists:function(_1e,obj){
return _f.getObject(_1e,false,obj)!==undefined;
},isString:function(it){
return (typeof it=="string"||it instanceof String);
},isArray:function(it){
return it&&(it instanceof Array||typeof it=="array");
},isFunction:function(it){
return _9.call(it)==="[object Function]";
},isObject:function(it){
return it!==undefined&&(it===null||typeof it=="object"||_f.isArray(it)||_f.isFunction(it));
},isArrayLike:function(it){
return it&&it!==undefined&&!_f.isString(it)&&!_f.isFunction(it)&&!(it.tagName&&it.tagName.toLowerCase()=="form")&&(_f.isArray(it)||isFinite(it.length));
},isAlien:function(it){
return it&&!_f.isFunction(it)&&/\{\s*\[native code\]\s*\}/.test(String(it));
},extend:function(_1f,_20){
for(var i=1,l=arguments.length;i<l;i++){
_f._mixin(_1f.prototype,arguments[i]);
}
return _1f;
},_hitchArgs:function(_21,_22){
var pre=_f._toArray(arguments,2);
var _23=_f.isString(_22);
return function(){
var _24=_f._toArray(arguments);
var f=_23?(_21||_1.global)[_22]:_22;
return f&&f.apply(_21||this,pre.concat(_24));
};
},hitch:function(_25,_26){
if(arguments.length>2){
return _f._hitchArgs.apply(_1,arguments);
}
if(!_26){
_26=_25;
_25=null;
}
if(_f.isString(_26)){
_25=_25||_1.global;
if(!_25[_26]){
throw (["lang.hitch: scope[\"",_26,"\"] is null (scope=\"",_25,"\")"].join(""));
}
return function(){
return _25[_26].apply(_25,arguments||[]);
};
}
return !_25?_26:function(){
return _26.apply(_25,arguments||[]);
};
},delegate:(function(){
function TMP(){
};
return function(obj,_27){
TMP.prototype=obj;
var tmp=new TMP();
TMP.prototype=null;
if(_27){
_f._mixin(tmp,_27);
}
return tmp;
};
})(),_toArray:_2("ie")?(function(){
function _28(obj,_29,_2a){
var arr=_2a||[];
for(var x=_29||0;x<obj.length;x++){
arr.push(obj[x]);
}
return arr;
};
return function(obj){
return ((obj.item)?_28:_a).apply(this,arguments);
};
})():_a,partial:function(_2b){
var arr=[null];
return _f.hitch.apply(_1,arr.concat(_f._toArray(arguments)));
},clone:function(src){
if(!src||typeof src!="object"||_f.isFunction(src)){
return src;
}
if(src.nodeType&&"cloneNode" in src){
return src.cloneNode(true);
}
if(src instanceof Date){
return new Date(src.getTime());
}
if(src instanceof RegExp){
return new RegExp(src);
}
var r,i,l;
if(_f.isArray(src)){
r=[];
for(i=0,l=src.length;i<l;++i){
if(i in src){
r.push(_f.clone(src[i]));
}
}
}else{
r=src.constructor?new src.constructor():{};
}
return _f._mixin(r,src,_f.clone);
},trim:String.prototype.trim?function(str){
return str.trim();
}:function(str){
return str.replace(/^\s\s*/,"").replace(/\s\s*$/,"");
},replace:function(_2c,map,_2d){
return _2c.replace(_2d||_e,_f.isFunction(map)?map:function(_2e,k){
return _f.getObject(k,false,map);
});
}};
_2("extend-dojo")&&_f.mixin(_1,_f);
return _f;
});


;define("dojo/_base/array",["./kernel","../has","./lang"],function(_1,_2,_3){
var _4={},u;
function _5(fn){
return _4[fn]=new Function("item","index","array",fn);
};
function _6(_7){
var _8=!_7;
return function(a,fn,o){
var i=0,l=a&&a.length||0,_9;
if(l&&typeof a=="string"){
a=a.split("");
}
if(typeof fn=="string"){
fn=_4[fn]||_5(fn);
}
if(o){
for(;i<l;++i){
_9=!fn.call(o,a[i],i,a);
if(_7^_9){
return !_9;
}
}
}else{
for(;i<l;++i){
_9=!fn(a[i],i,a);
if(_7^_9){
return !_9;
}
}
}
return _8;
};
};
function _a(up){
var _b=1,_c=0,_d=0;
if(!up){
_b=_c=_d=-1;
}
return function(a,x,_e,_f){
if(_f&&_b>0){
return _10.lastIndexOf(a,x,_e);
}
var l=a&&a.length||0,end=up?l+_d:_c,i;
if(_e===u){
i=up?_c:l+_d;
}else{
if(_e<0){
i=l+_e;
if(i<0){
i=_c;
}
}else{
i=_e>=l?l+_d:_e;
}
}
if(l&&typeof a=="string"){
a=a.split("");
}
for(;i!=end;i+=_b){
if(a[i]==x){
return i;
}
}
return -1;
};
};
var _10={every:_6(false),some:_6(true),indexOf:_a(true),lastIndexOf:_a(false),forEach:function(arr,_11,_12){
var i=0,l=arr&&arr.length||0;
if(l&&typeof arr=="string"){
arr=arr.split("");
}
if(typeof _11=="string"){
_11=_4[_11]||_5(_11);
}
if(_12){
for(;i<l;++i){
_11.call(_12,arr[i],i,arr);
}
}else{
for(;i<l;++i){
_11(arr[i],i,arr);
}
}
},map:function(arr,_13,_14,Ctr){
var i=0,l=arr&&arr.length||0,out=new (Ctr||Array)(l);
if(l&&typeof arr=="string"){
arr=arr.split("");
}
if(typeof _13=="string"){
_13=_4[_13]||_5(_13);
}
if(_14){
for(;i<l;++i){
out[i]=_13.call(_14,arr[i],i,arr);
}
}else{
for(;i<l;++i){
out[i]=_13(arr[i],i,arr);
}
}
return out;
},filter:function(arr,_15,_16){
var i=0,l=arr&&arr.length||0,out=[],_17;
if(l&&typeof arr=="string"){
arr=arr.split("");
}
if(typeof _15=="string"){
_15=_4[_15]||_5(_15);
}
if(_16){
for(;i<l;++i){
_17=arr[i];
if(_15.call(_16,_17,i,arr)){
out.push(_17);
}
}
}else{
for(;i<l;++i){
_17=arr[i];
if(_15(_17,i,arr)){
out.push(_17);
}
}
}
return out;
},clearCache:function(){
_4={};
}};
_2("extend-dojo")&&_3.mixin(_1,_10);
return _10;
});


;define("dojo/domReady",["./has"],function(_1){
var _2=(function(){
return this;
})(),_3=document,_4={"loaded":1,"complete":1},_5=typeof _3.readyState!="string",_6=!!_4[_3.readyState],_7=[],_8;
function _9(_a){
_7.push(_a);
if(_6){
_b();
}
};
_9.load=function(id,_c,_d){
_9(_d);
};
_9._Q=_7;
_9._onQEmpty=function(){
};
if(_5){
_3.readyState="loading";
}
function _b(){
if(_8){
return;
}
_8=true;
while(_7.length){
try{
(_7.shift())(_3);
}
catch(err){
console.error(err,"in domReady callback",err.stack);
}
}
_8=false;
_9._onQEmpty();
};
if(!_6){
var _e=[],_f=function(evt){
evt=evt||_2.event;
if(_6||(evt.type=="readystatechange"&&!_4[_3.readyState])){
return;
}
if(_5){
_3.readyState="complete";
}
_6=1;
_b();
},on=function(_10,_11){
_10.addEventListener(_11,_f,false);
_7.push(function(){
_10.removeEventListener(_11,_f,false);
});
};
if(!_1("dom-addeventlistener")){
on=function(_12,_13){
_13="on"+_13;
_12.attachEvent(_13,_f);
_7.push(function(){
_12.detachEvent(_13,_f);
});
};
var div=_3.createElement("div");
try{
if(div.doScroll&&_2.frameElement===null){
_e.push(function(){
try{
div.doScroll("left");
return 1;
}
catch(e){
}
});
}
}
catch(e){
}
}
on(_3,"DOMContentLoaded");
on(_2,"load");
if("onreadystatechange" in _3){
on(_3,"readystatechange");
}else{
if(!_5){
_e.push(function(){
return _4[_3.readyState];
});
}
}
if(_e.length){
var _14=function(){
if(_6){
return;
}
var i=_e.length;
while(i--){
if(_e[i]()){
_f("poller");
return;
}
}
setTimeout(_14,30);
};
_14();
}
}
return _9;
});


;define("dojo/ready",["./_base/kernel","./has","require","./has!host-browser?./domReady","./_base/lang"],function(_1,_2,_3,_4,_5){
var _6=0,_7=[],_8=0,_9=function(){
_6=1;
_1._postLoad=_1.config.afterOnLoad=true;
_a();
},_a=function(){
if(_8){
return;
}
_8=1;
while(_6&&(!_4||_4._Q.length==0)&&(_3.idle?_3.idle():true)&&_7.length){
var f=_7.shift();
try{
f();
}
catch(e){
e.info=e.message;
if(_3.signal){
_3.signal("error",e);
}else{
throw e;
}
}
}
_8=0;
};
_3.on&&_3.on("idle",_a);
if(_4){
_4._onQEmpty=_a;
}
var _b=_1.ready=_1.addOnLoad=function(_c,_d,_e){
var _f=_5._toArray(arguments);
if(typeof _c!="number"){
_e=_d;
_d=_c;
_c=1000;
}else{
_f.shift();
}
_e=_e?_5.hitch.apply(_1,_f):function(){
_d();
};
_e.priority=_c;
for(var i=0;i<_7.length&&_c>=_7[i].priority;i++){
}
_7.splice(i,0,_e);
_a();
};
_2.add("dojo-config-addOnLoad",1);
if(_2("dojo-config-addOnLoad")){
var dca=_1.config.addOnLoad;
if(dca){
_b[(_5.isArray(dca)?"apply":"call")](_1,dca);
}
}
if(_2("dojo-sync-loader")&&_1.config.parseOnLoad&&!_1.isAsync){
_b(99,function(){
if(!_1.parser){
_1.deprecated("Add explicit require(['dojo/parser']);","","2.0");
_3(["dojo/parser"]);
}
});
}
if(_4){
_4(_9);
}else{
_9();
}
return _b;
});


;define("dojo/_base/declare",["./kernel","../has","./lang"],function(_1,_2,_3){
var _4=_3.mixin,op=Object.prototype,_5=op.toString,_6=new Function,_7=0,_8="constructor";
function _9(_a,_b){
throw new Error("declare"+(_b?" "+_b:"")+": "+_a);
};
function _c(_d,_e){
var _f=[],_10=[{cls:0,refs:[]}],_11={},_12=1,l=_d.length,i=0,j,lin,_13,top,_14,rec,_15,_16;
for(;i<l;++i){
_13=_d[i];
if(!_13){
_9("mixin #"+i+" is unknown. Did you use dojo.require to pull it in?",_e);
}else{
if(_5.call(_13)!="[object Function]"){
_9("mixin #"+i+" is not a callable constructor.",_e);
}
}
lin=_13._meta?_13._meta.bases:[_13];
top=0;
for(j=lin.length-1;j>=0;--j){
_14=lin[j].prototype;
if(!_14.hasOwnProperty("declaredClass")){
_14.declaredClass="uniqName_"+(_7++);
}
_15=_14.declaredClass;
if(!_11.hasOwnProperty(_15)){
_11[_15]={count:0,refs:[],cls:lin[j]};
++_12;
}
rec=_11[_15];
if(top&&top!==rec){
rec.refs.push(top);
++top.count;
}
top=rec;
}
++top.count;
_10[0].refs.push(top);
}
while(_10.length){
top=_10.pop();
_f.push(top.cls);
--_12;
while(_16=top.refs,_16.length==1){
top=_16[0];
if(!top||--top.count){
top=0;
break;
}
_f.push(top.cls);
--_12;
}
if(top){
for(i=0,l=_16.length;i<l;++i){
top=_16[i];
if(!--top.count){
_10.push(top);
}
}
}
}
if(_12){
_9("can't build consistent linearization",_e);
}
_13=_d[0];
_f[0]=_13?_13._meta&&_13===_f[_f.length-_13._meta.bases.length]?_13._meta.bases.length:1:0;
return _f;
};
function _17(_18,a,f){
var _19,_1a,_1b,_1c,_1d,_1e,_1f,opf,pos,_20=this._inherited=this._inherited||{};
if(typeof _18=="string"){
_19=_18;
_18=a;
a=f;
}
f=0;
_1c=_18.callee;
_19=_19||_1c.nom;
if(!_19){
_9("can't deduce a name to call inherited()",this.declaredClass);
}
_1d=this.constructor._meta;
_1b=_1d.bases;
pos=_20.p;
if(_19!=_8){
if(_20.c!==_1c){
pos=0;
_1e=_1b[0];
_1d=_1e._meta;
if(_1d.hidden[_19]!==_1c){
_1a=_1d.chains;
if(_1a&&typeof _1a[_19]=="string"){
_9("calling chained method with inherited: "+_19,this.declaredClass);
}
do{
_1d=_1e._meta;
_1f=_1e.prototype;
if(_1d&&(_1f[_19]===_1c&&_1f.hasOwnProperty(_19)||_1d.hidden[_19]===_1c)){
break;
}
}while(_1e=_1b[++pos]);
pos=_1e?pos:-1;
}
}
_1e=_1b[++pos];
if(_1e){
_1f=_1e.prototype;
if(_1e._meta&&_1f.hasOwnProperty(_19)){
f=_1f[_19];
}else{
opf=op[_19];
do{
_1f=_1e.prototype;
f=_1f[_19];
if(f&&(_1e._meta?_1f.hasOwnProperty(_19):f!==opf)){
break;
}
}while(_1e=_1b[++pos]);
}
}
f=_1e&&f||op[_19];
}else{
if(_20.c!==_1c){
pos=0;
_1d=_1b[0]._meta;
if(_1d&&_1d.ctor!==_1c){
_1a=_1d.chains;
if(!_1a||_1a.constructor!=="manual"){
_9("calling chained constructor with inherited",this.declaredClass);
}
while(_1e=_1b[++pos]){
_1d=_1e._meta;
if(_1d&&_1d.ctor===_1c){
break;
}
}
pos=_1e?pos:-1;
}
}
while(_1e=_1b[++pos]){
_1d=_1e._meta;
f=_1d?_1d.ctor:_1e;
if(f){
break;
}
}
f=_1e&&f;
}
_20.c=f;
_20.p=pos;
if(f){
return a===true?f:f.apply(this,a||_18);
}
};
function _21(_22,_23){
if(typeof _22=="string"){
return this.__inherited(_22,_23,true);
}
return this.__inherited(_22,true);
};
function _24(_25,a1,a2){
var f=this.getInherited(_25,a1);
if(f){
return f.apply(this,a2||a1||_25);
}
};
var _26=_1.config.isDebug?_24:_17;
function _27(cls){
var _28=this.constructor._meta.bases;
for(var i=0,l=_28.length;i<l;++i){
if(_28[i]===cls){
return true;
}
}
return this instanceof cls;
};
function _29(_2a,_2b){
for(var _2c in _2b){
if(_2c!=_8&&_2b.hasOwnProperty(_2c)){
_2a[_2c]=_2b[_2c];
}
}
if(_2("bug-for-in-skips-shadowed")){
for(var _2d=_3._extraNames,i=_2d.length;i;){
_2c=_2d[--i];
if(_2c!=_8&&_2b.hasOwnProperty(_2c)){
_2a[_2c]=_2b[_2c];
}
}
}
};
function _2e(_2f,_30){
var _31,t;
for(_31 in _30){
t=_30[_31];
if((t!==op[_31]||!(_31 in op))&&_31!=_8){
if(_5.call(t)=="[object Function]"){
t.nom=_31;
}
_2f[_31]=t;
}
}
if(_2("bug-for-in-skips-shadowed")){
for(var _32=_3._extraNames,i=_32.length;i;){
_31=_32[--i];
t=_30[_31];
if((t!==op[_31]||!(_31 in op))&&_31!=_8){
if(_5.call(t)=="[object Function]"){
t.nom=_31;
}
_2f[_31]=t;
}
}
}
return _2f;
};
function _33(_34){
_35.safeMixin(this.prototype,_34);
return this;
};
function _36(_37,_38){
if(!(_37 instanceof Array||typeof _37=="function")){
_38=_37;
_37=undefined;
}
_38=_38||{};
_37=_37||[];
return _35([this].concat(_37),_38);
};
function _39(_3a,_3b){
return function(){
var a=arguments,_3c=a,a0=a[0],f,i,m,l=_3a.length,_3d;
if(!(this instanceof a.callee)){
return _3e(a);
}
if(_3b&&(a0&&a0.preamble||this.preamble)){
_3d=new Array(_3a.length);
_3d[0]=a;
for(i=0;;){
a0=a[0];
if(a0){
f=a0.preamble;
if(f){
a=f.apply(this,a)||a;
}
}
f=_3a[i].prototype;
f=f.hasOwnProperty("preamble")&&f.preamble;
if(f){
a=f.apply(this,a)||a;
}
if(++i==l){
break;
}
_3d[i]=a;
}
}
for(i=l-1;i>=0;--i){
f=_3a[i];
m=f._meta;
f=m?m.ctor:f;
if(f){
f.apply(this,_3d?_3d[i]:a);
}
}
f=this.postscript;
if(f){
f.apply(this,_3c);
}
};
};
function _3f(_40,_41){
return function(){
var a=arguments,t=a,a0=a[0],f;
if(!(this instanceof a.callee)){
return _3e(a);
}
if(_41){
if(a0){
f=a0.preamble;
if(f){
t=f.apply(this,t)||t;
}
}
f=this.preamble;
if(f){
f.apply(this,t);
}
}
if(_40){
_40.apply(this,a);
}
f=this.postscript;
if(f){
f.apply(this,a);
}
};
};
function _42(_43){
return function(){
var a=arguments,i=0,f,m;
if(!(this instanceof a.callee)){
return _3e(a);
}
for(;f=_43[i];++i){
m=f._meta;
f=m?m.ctor:f;
if(f){
f.apply(this,a);
break;
}
}
f=this.postscript;
if(f){
f.apply(this,a);
}
};
};
function _44(_45,_46,_47){
return function(){
var b,m,f,i=0,_48=1;
if(_47){
i=_46.length-1;
_48=-1;
}
for(;b=_46[i];i+=_48){
m=b._meta;
f=(m?m.hidden:b.prototype)[_45];
if(f){
f.apply(this,arguments);
}
}
};
};
function _49(_4a){
_6.prototype=_4a.prototype;
var t=new _6;
_6.prototype=null;
return t;
};
function _3e(_4b){
var _4c=_4b.callee,t=_49(_4c);
_4c.apply(t,_4b);
return t;
};
function _35(_4d,_4e,_4f){
if(typeof _4d!="string"){
_4f=_4e;
_4e=_4d;
_4d="";
}
_4f=_4f||{};
var _50,i,t,_51,_52,_53,_54,_55=1,_56=_4e;
if(_5.call(_4e)=="[object Array]"){
_53=_c(_4e,_4d);
t=_53[0];
_55=_53.length-t;
_4e=_53[_55];
}else{
_53=[0];
if(_4e){
if(_5.call(_4e)=="[object Function]"){
t=_4e._meta;
_53=_53.concat(t?t.bases:_4e);
}else{
_9("base class is not a callable constructor.",_4d);
}
}else{
if(_4e!==null){
_9("unknown base class. Did you use dojo.require to pull it in?",_4d);
}
}
}
if(_4e){
for(i=_55-1;;--i){
_50=_49(_4e);
if(!i){
break;
}
t=_53[i];
(t._meta?_29:_4)(_50,t.prototype);
_51=new Function;
_51.superclass=_4e;
_51.prototype=_50;
_4e=_50.constructor=_51;
}
}else{
_50={};
}
_35.safeMixin(_50,_4f);
t=_4f.constructor;
if(t!==op.constructor){
t.nom=_8;
_50.constructor=t;
}
for(i=_55-1;i;--i){
t=_53[i]._meta;
if(t&&t.chains){
_54=_4(_54||{},t.chains);
}
}
if(_50["-chains-"]){
_54=_4(_54||{},_50["-chains-"]);
}
t=!_54||!_54.hasOwnProperty(_8);
_53[0]=_51=(_54&&_54.constructor==="manual")?_42(_53):(_53.length==1?_3f(_4f.constructor,t):_39(_53,t));
_51._meta={bases:_53,hidden:_4f,chains:_54,parents:_56,ctor:_4f.constructor};
_51.superclass=_4e&&_4e.prototype;
_51.extend=_33;
_51.createSubclass=_36;
_51.prototype=_50;
_50.constructor=_51;
_50.getInherited=_21;
_50.isInstanceOf=_27;
_50.inherited=_26;
_50.__inherited=_17;
if(_4d){
_50.declaredClass=_4d;
_3.setObject(_4d,_51);
}
if(_54){
for(_52 in _54){
if(_50[_52]&&typeof _54[_52]=="string"&&_52!=_8){
t=_50[_52]=_44(_52,_53,_54[_52]==="after");
t.nom=_52;
}
}
}
return _51;
};
_1.safeMixin=_35.safeMixin=_2e;
_1.declare=_35;
_1.provide=function(id){
return _1.getObject(id,true);
};
_1.require=function(id){
_1.deprecated("dojo.require()","Use require() instead.","2.0");
return _1.exists(id)?_1.getObject(id):require(id,null,true);
};
_1.registerModulePath=function(_57,_58){
_1.deprecated("dojo.registerModulePath()","Use require({paths:...}) or Dojo config paths flag and load the module using require().","2.0");
net.jazz.ajax.xdloader._modulePaths[_57]=_58;
};
return _35;
});


;define("dojo/aspect",[],function(){
"use strict";
var _1,_2=0;
function _3(_4,_5,_6,_7){
var _8=_4[_5];
var _9=_5=="around";
var _a;
if(_9){
var _b=_6(function(){
return _8.advice(this,arguments);
});
_a={remove:function(){
if(_b){
_b=_4=_6=null;
}
},advice:function(_c,_d){
return _b?_b.apply(_c,_d):_8.advice(_c,_d);
}};
}else{
_a={remove:function(){
if(_a.advice){
var _e=_a.previous;
var _f=_a.next;
if(!_f&&!_e){
delete _4[_5];
}else{
if(_e){
_e.next=_f;
}else{
_4[_5]=_f;
}
if(_f){
_f.previous=_e;
}
}
_4=_6=_a.advice=null;
}
},id:_2++,advice:_6,receiveArguments:_7};
}
if(_8&&!_9){
if(_5=="after"){
while(_8.next&&(_8=_8.next)){
}
_8.next=_a;
_a.previous=_8;
}else{
if(_5=="before"){
_4[_5]=_a;
_a.next=_8;
_8.previous=_a;
}
}
}else{
_4[_5]=_a;
}
return _a;
};
function _10(_11){
return function(_12,_13,_14,_15){
var _16=_12[_13],_17;
if(!_16||_16.target!=_12){
_12[_13]=_17=function(){
var _18=_2;
var _19=arguments;
var _1a=_17.before;
while(_1a){
_19=_1a.advice.apply(this,_19)||_19;
_1a=_1a.next;
}
if(_17.around){
var _1b=_17.around.advice(this,_19);
}
var _1c=_17.after;
while(_1c&&_1c.id<_18){
if(_1c.receiveArguments){
var _1d=_1c.advice.apply(this,_19);
_1b=_1d===_1?_1b:_1d;
}else{
_1b=_1c.advice.call(this,_1b,_19);
}
_1c=_1c.next;
}
return _1b;
};
if(_16){
_17.around={advice:function(_1e,_1f){
return _16.apply(_1e,_1f);
}};
}
_17.target=_12;
}
var _20=_3((_17||_16),_11,_14,_15);
_14=null;
return _20;
};
};
var _21=_10("after");
var _22=_10("before");
var _23=_10("around");
return {before:_22,around:_23,after:_21};
});


;define("dojo/on",["./has!dom-addeventlistener?:./aspect","./_base/kernel","./sniff"],function(_1,_2,_3){
"use strict";
if(_3("dom")){
var _4=window.ScriptEngineMajorVersion;
_3.add("jscript",_4&&(_4()+ScriptEngineMinorVersion()/10));
_3.add("event-orientationchange",_3("touch")&&!_3("android"));
_3.add("event-stopimmediatepropagation",window.Event&&!!window.Event.prototype&&!!window.Event.prototype.stopImmediatePropagation);
_3.add("event-focusin",function(_5,_6,_7){
return "onfocusin" in _7;
});
if(_3("touch")){
_3.add("touch-can-modify-event-delegate",function(){
var _8=function(){
};
_8.prototype=document.createEvent("MouseEvents");
try{
var _9=new _8;
_9.target=null;
return _9.target===null;
}
catch(e){
return false;
}
});
}
}
var on=function(_a,_b,_c,_d){
if(typeof _a.on=="function"&&typeof _b!="function"&&!_a.nodeType){
return _a.on(_b,_c);
}
return on.parse(_a,_b,_c,_e,_d,this);
};
on.pausable=function(_f,_10,_11,_12){
var _13;
var _14=on(_f,_10,function(){
if(!_13){
return _11.apply(this,arguments);
}
},_12);
_14.pause=function(){
_13=true;
};
_14.resume=function(){
_13=false;
};
return _14;
};
on.once=function(_15,_16,_17,_18){
var _19=on(_15,_16,function(){
_19.remove();
return _17.apply(this,arguments);
});
return _19;
};
on.parse=function(_1a,_1b,_1c,_1d,_1e,_1f){
if(_1b.call){
return _1b.call(_1f,_1a,_1c);
}
if(_1b instanceof Array){
_20=_1b;
}else{
if(_1b.indexOf(",")>-1){
var _20=_1b.split(/\s*,\s*/);
}
}
if(_20){
var _21=[];
var i=0;
var _22;
while(_22=_20[i++]){
_21.push(on.parse(_1a,_22,_1c,_1d,_1e,_1f));
}
_21.remove=function(){
for(var i=0;i<_21.length;i++){
_21[i].remove();
}
};
return _21;
}
return _1d(_1a,_1b,_1c,_1e,_1f);
};
var _23=/^touch/;
function _e(_24,_25,_26,_27,_28){
var _29=_25.match(/(.*):(.*)/);
if(_29){
_25=_29[2];
_29=_29[1];
return on.selector(_29,_25).call(_28,_24,_26);
}
if(_3("touch")){
if(_23.test(_25)){
_26=_2a(_26);
}
if(!_3("event-orientationchange")&&(_25=="orientationchange")){
_25="resize";
_24=window;
_26=_2a(_26);
}
}
if(_2b){
_26=_2b(_26);
}
if(_24.addEventListener){
var _2c=_25 in _2d,_2e=_2c?_2d[_25]:_25;
_24.addEventListener(_2e,_26,_2c);
return {remove:function(){
_24.removeEventListener(_2e,_26,_2c);
}};
}
_25="on"+_25;
if(_2f&&_24.attachEvent){
return _2f(_24,_25,_26);
}
throw new Error("Target must be an event emitter");
};
on.matches=function(_30,_31,_32,_33,_34){
_34=_34&&_34.matches?_34:_2.query;
_33=_33!==false;
if(_30.nodeType!=1){
_30=_30.parentNode;
}
while(!_34.matches(_30,_31,_32)){
if(_30==_32||_33===false||!(_30=_30.parentNode)||_30.nodeType!=1){
return false;
}
}
return _30;
};
on.selector=function(_35,_36,_37){
return function(_38,_39){
var _3a=typeof _35=="function"?{matches:_35}:this,_3b=_36.bubble;
function _3c(_3d){
return on.matches(_3d,_35,_38,_37,_3a);
};
if(_3b){
return on(_38,_3b(_3c),_39);
}
return on(_38,_36,function(_3e){
var _3f=_3c(_3e.target);
if(_3f){
return _39.call(_3f,_3e);
}
});
};
};
function _40(){
this.cancelable=false;
this.defaultPrevented=true;
};
function _41(){
this.bubbles=false;
};
var _42=[].slice,_43=on.emit=function(_44,_45,_46){
var _47=_42.call(arguments,2);
var _48="on"+_45;
if("parentNode" in _44){
var _49=_47[0]={};
for(var i in _46){
_49[i]=_46[i];
}
_49.preventDefault=_40;
_49.stopPropagation=_41;
_49.target=_44;
_49.type=_45;
_46=_49;
}
do{
_44[_48]&&_44[_48].apply(_44,_47);
}while(_46&&_46.bubbles&&(_44=_44.parentNode));
return _46&&_46.cancelable&&_46;
};
var _2d=_3("event-focusin")?{}:{focusin:"focus",focusout:"blur"};
if(!_3("event-stopimmediatepropagation")){
var _4a=function(){
this.immediatelyStopped=true;
this.modified=true;
};
var _2b=function(_4b){
return function(_4c){
if(_4c&&!_4c.immediatelyStopped){
_4c.stopImmediatePropagation=_4a;
return _4b.apply(this,arguments);
}
};
};
}
if(_3("dom-addeventlistener")){
on.emit=function(_4d,_4e,_4f){
if(_4d.dispatchEvent&&document.createEvent){
var _50=_4d.ownerDocument||document;
var _51=_50.createEvent("HTMLEvents");
_51.initEvent(_4e,!!_4f.bubbles,!!_4f.cancelable);
for(var i in _4f){
if(!(i in _51)){
_51[i]=_4f[i];
}
}
return _4d.dispatchEvent(_51)&&_51;
}
return _43.apply(on,arguments);
};
}else{
on._fixEvent=function(evt,_52){
if(!evt){
var w=_52&&(_52.ownerDocument||_52.document||_52).parentWindow||window;
evt=w.event;
}
if(!evt){
return evt;
}
try{
if(_53&&evt.type==_53.type&&evt.srcElement==_53.target){
evt=_53;
}
}
catch(e){
}
if(!evt.target){
evt.target=evt.srcElement;
evt.currentTarget=(_52||evt.srcElement);
if(evt.type=="mouseover"){
evt.relatedTarget=evt.fromElement;
}
if(evt.type=="mouseout"){
evt.relatedTarget=evt.toElement;
}
if(!evt.stopPropagation){
evt.stopPropagation=_54;
evt.preventDefault=_55;
}
switch(evt.type){
case "keypress":
var c=("charCode" in evt?evt.charCode:evt.keyCode);
if(c==10){
c=0;
evt.keyCode=13;
}else{
if(c==13||c==27){
c=0;
}else{
if(c==3){
c=99;
}
}
}
evt.charCode=c;
_56(evt);
break;
}
}
return evt;
};
var _53,_57=function(_58){
this.handle=_58;
};
_57.prototype.remove=function(){
delete _dojoIEListeners_[this.handle];
};
var _59=function(_5a){
return function(evt){
evt=on._fixEvent(evt,this);
var _5b=_5a.call(this,evt);
if(evt&&evt.modified){
if(!_53){
setTimeout(function(){
_53=null;
});
}
_53=evt;
}
return _5b;
};
};
var _2f=function(_5c,_5d,_5e){
_5e=_59(_5e);
if(((_5c.ownerDocument?_5c.ownerDocument.parentWindow:_5c.parentWindow||_5c.window||window)!=top||_3("jscript")<5.8)&&!_3("config-_allow_leaks")){
if(typeof _dojoIEListeners_=="undefined"){
_dojoIEListeners_=[];
}
var _5f=_5c[_5d];
if(!_5f||!_5f.listeners){
var _60=_5f;
_5f=Function("event","var callee = arguments.callee; for(var i = 0; i<callee.listeners.length; i++){var listener = _dojoIEListeners_[callee.listeners[i]]; if(listener){listener.call(this,event);}}");
_5f.listeners=[];
_5c[_5d]=_5f;
_5f.global=this;
if(_60){
_5f.listeners.push(_dojoIEListeners_.push(_60)-1);
}
}
var _61;
_5f.listeners.push(_61=(_5f.global._dojoIEListeners_.push(_5e)-1));
return new _57(_61);
}
return _1.after(_5c,_5d,_5e,true);
};
var _56=function(evt){
evt.keyChar=evt.charCode?String.fromCharCode(evt.charCode):"";
evt.charOrCode=evt.keyChar||evt.keyCode;
};
var _54=function(){
this.cancelBubble=true;
};
var _55=on._preventDefault=function(){
this.bubbledKeyCode=this.keyCode;
if(this.ctrlKey){
try{
this.keyCode=0;
}
catch(e){
}
}
this.defaultPrevented=true;
this.returnValue=false;
this.modified=true;
};
}
if(_3("touch")){
var _62=function(){
};
var _63=window.orientation;
var _2a=function(_64){
return function(_65){
var _66=_65.corrected;
if(!_66){
var _67=_65.type;
try{
delete _65.type;
}
catch(e){
}
if(_65.type){
if(_3("touch-can-modify-event-delegate")){
_62.prototype=_65;
_66=new _62;
}else{
_66={};
for(var _68 in _65){
_66[_68]=_65[_68];
}
}
_66.preventDefault=function(){
_65.preventDefault();
};
_66.stopPropagation=function(){
_65.stopPropagation();
};
}else{
_66=_65;
_66.type=_67;
}
_65.corrected=_66;
if(_67=="resize"){
if(_63==window.orientation){
return null;
}
_63=window.orientation;
_66.type="orientationchange";
return _64.call(this,_66);
}
if(!("rotation" in _66)){
_66.rotation=0;
_66.scale=1;
}
var _69=_66.changedTouches[0];
for(var i in _69){
delete _66[i];
_66[i]=_69[i];
}
}
return _64.call(this,_66);
};
};
}
return on;
});


;define("dojo/Evented",["./aspect","./on"],function(_1,on){
"use strict";
var _2=_1.after;
function _3(){
};
_3.prototype={on:function(_4,_5){
return on.parse(this,_4,_5,function(_6,_7){
return _2(_6,"on"+_7,_5,true);
});
},emit:function(_8,_9){
var _a=[this];
_a.push.apply(_a,arguments);
return on.emit.apply(on,_a);
}};
return _3;
});


;define("dojo/topic",["./Evented"],function(_1){
var _2=new _1;
return {publish:function(_3,_4){
return _2.emit.apply(_2,arguments);
},subscribe:function(_5,_6){
return _2.on.apply(_2,arguments);
}};
});


;define("dojo/_base/window",["./kernel","./lang","../sniff"],function(_1,_2,_3){
var _4={global:_1.global,doc:_1.global["document"]||null,body:function(_5){
_5=_5||_1.doc;
return _5.body||_5.getElementsByTagName("body")[0];
},setContext:function(_6,_7){
_1.global=_4.global=_6;
_1.doc=_4.doc=_7;
},withGlobal:function(_8,_9,_a,_b){
var _c=_1.global;
try{
_1.global=_4.global=_8;
return _4.withDoc.call(null,_8.document,_9,_a,_b);
}
finally{
_1.global=_4.global=_c;
}
},withDoc:function(_d,_e,_f,_10){
var _11=_4.doc,_12=_3("quirks"),_13=_3("ie"),_14,_15,_16;
try{
_1.doc=_4.doc=_d;
_1.isQuirks=_3.add("quirks",_1.doc.compatMode=="BackCompat",true,true);
if(_3("ie")){
if((_16=_d.parentWindow)&&_16.navigator){
_14=parseFloat(_16.navigator.appVersion.split("MSIE ")[1])||undefined;
_15=_d.documentMode;
if(_15&&_15!=5&&Math.floor(_14)!=_15){
_14=_15;
}
_1.isIE=_3.add("ie",_14,true,true);
}
}
if(_f&&typeof _e=="string"){
_e=_f[_e];
}
return _e.apply(_f,_10||[]);
}
finally{
_1.doc=_4.doc=_11;
_1.isQuirks=_3.add("quirks",_12,true,true);
_1.isIE=_3.add("ie",_13,true,true);
}
}};
_3("extend-dojo")&&_2.mixin(_1,_4);
return _4;
});


;define("dojo/dom",["./sniff","./_base/window"],function(_1,_2){
if(_1("ie")<=7){
try{
document.execCommand("BackgroundImageCache",false,true);
}
catch(e){
}
}
var _3={};
if(_1("ie")){
_3.byId=function(id,_4){
if(typeof id!="string"){
return id;
}
var _5=_4||_2.doc,te=id&&_5.getElementById(id);
if(te&&(te.attributes.id.value==id||te.id==id)){
return te;
}else{
var _6=_5.all[id];
if(!_6||_6.nodeName){
_6=[_6];
}
var i=0;
while((te=_6[i++])){
if((te.attributes&&te.attributes.id&&te.attributes.id.value==id)||te.id==id){
return te;
}
}
}
};
}else{
_3.byId=function(id,_7){
return ((typeof id=="string")?(_7||_2.doc).getElementById(id):id)||null;
};
}
_3.isDescendant=function(_8,_9){
try{
_8=_3.byId(_8);
_9=_3.byId(_9);
while(_8){
if(_8==_9){
return true;
}
_8=_8.parentNode;
}
}
catch(e){
}
return false;
};
_1.add("css-user-select",function(_a,_b,_c){
if(!_c){
return false;
}
var _d=_c.style;
var _e=["Khtml","O","Moz","Webkit"],i=_e.length,_f="userSelect",_10;
do{
if(typeof _d[_f]!=="undefined"){
return _f;
}
}while(i--&&(_f=_e[i]+"UserSelect"));
return false;
});
var _11=_1("css-user-select");
_3.setSelectable=_11?function(_12,_13){
_3.byId(_12).style[_11]=_13?"":"none";
}:function(_14,_15){
_14=_3.byId(_14);
var _16=_14.getElementsByTagName("*"),i=_16.length;
if(_15){
_14.removeAttribute("unselectable");
while(i--){
_16[i].removeAttribute("unselectable");
}
}else{
_14.setAttribute("unselectable","on");
while(i--){
_16[i].setAttribute("unselectable","on");
}
}
};
return _3;
});


;define("dojo/dom-style",["./sniff","./dom"],function(_1,_2){
var _3,_4={};
if(_1("webkit")){
_3=function(_5){
var s;
if(_5.nodeType==1){
var dv=_5.ownerDocument.defaultView;
s=dv.getComputedStyle(_5,null);
if(!s&&_5.style){
_5.style.display="";
s=dv.getComputedStyle(_5,null);
}
}
return s||{};
};
}else{
if(_1("ie")&&(_1("ie")<9||_1("quirks"))){
_3=function(_6){
return _6.nodeType==1&&_6.currentStyle?_6.currentStyle:{};
};
}else{
_3=function(_7){
return _7.nodeType==1?_7.ownerDocument.defaultView.getComputedStyle(_7,null):{};
};
}
}
_4.getComputedStyle=_3;
var _8;
if(!_1("ie")){
_8=function(_9,_a){
return parseFloat(_a)||0;
};
}else{
_8=function(_b,_c){
if(!_c){
return 0;
}
if(_c=="medium"){
return 4;
}
if(_c.slice&&_c.slice(-2)=="px"){
return parseFloat(_c);
}
var s=_b.style,rs=_b.runtimeStyle,cs=_b.currentStyle,_d=s.left,_e=rs.left;
rs.left=cs.left;
try{
s.left=_c;
_c=s.pixelLeft;
}
catch(e){
_c=0;
}
s.left=_d;
rs.left=_e;
return _c;
};
}
_4.toPixelValue=_8;
var _f="DXImageTransform.Microsoft.Alpha";
var af=function(n,f){
try{
return n.filters.item(_f);
}
catch(e){
return f?{}:null;
}
};
var _10=_1("ie")<9||(_1("ie")<10&&_1("quirks"))?function(_11){
try{
return af(_11).Opacity/100;
}
catch(e){
return 1;
}
}:function(_12){
return _3(_12).opacity;
};
var _13=_1("ie")<9||(_1("ie")<10&&_1("quirks"))?function(_14,_15){
if(_15===""){
_15=1;
}
var ov=_15*100,_16=_15===1;
if(_16){
_14.style.zoom="";
if(af(_14)){
_14.style.filter=_14.style.filter.replace(new RegExp("\\s*progid:"+_f+"\\([^\\)]+?\\)","i"),"");
}
}else{
_14.style.zoom=1;
if(af(_14)){
af(_14,1).Opacity=ov;
}else{
_14.style.filter+=" progid:"+_f+"(Opacity="+ov+")";
}
af(_14,1).Enabled=true;
}
if(_14.tagName.toLowerCase()=="tr"){
for(var td=_14.firstChild;td;td=td.nextSibling){
if(td.tagName.toLowerCase()=="td"){
_13(td,_15);
}
}
}
return _15;
}:function(_17,_18){
return _17.style.opacity=_18;
};
var _19={left:true,top:true};
var _1a=/margin|padding|width|height|max|min|offset/;
function _1b(_1c,_1d,_1e){
_1d=_1d.toLowerCase();
if(_1("ie")||_1("trident")){
if(_1e=="auto"){
if(_1d=="height"){
return _1c.offsetHeight;
}
if(_1d=="width"){
return _1c.offsetWidth;
}
}
if(_1d=="fontweight"){
switch(_1e){
case 700:
return "bold";
case 400:
default:
return "normal";
}
}
}
if(!(_1d in _19)){
_19[_1d]=_1a.test(_1d);
}
return _19[_1d]?_8(_1c,_1e):_1e;
};
var _1f={cssFloat:1,styleFloat:1,"float":1};
_4.get=function getStyle(_20,_21){
var n=_2.byId(_20),l=arguments.length,op=(_21=="opacity");
if(l==2&&op){
return _10(n);
}
_21=_1f[_21]?"cssFloat" in n.style?"cssFloat":"styleFloat":_21;
var s=_4.getComputedStyle(n);
return (l==1)?s:_1b(n,_21,s[_21]||n.style[_21]);
};
_4.set=function setStyle(_22,_23,_24){
var n=_2.byId(_22),l=arguments.length,op=(_23=="opacity");
_23=_1f[_23]?"cssFloat" in n.style?"cssFloat":"styleFloat":_23;
if(l==3){
return op?_13(n,_24):n.style[_23]=_24;
}
for(var x in _23){
_4.set(_22,x,_23[x]);
}
return _4.getComputedStyle(n);
};
return _4;
});


;define("dojo/dom-geometry",["./sniff","./_base/window","./dom","./dom-style"],function(_1,_2,_3,_4){
var _5={};
_5.boxModel="content-box";
if(_1("ie")){
_5.boxModel=document.compatMode=="BackCompat"?"border-box":"content-box";
}
_5.getPadExtents=function getPadExtents(_6,_7){
_6=_3.byId(_6);
var s=_7||_4.getComputedStyle(_6),px=_4.toPixelValue,l=px(_6,s.paddingLeft),t=px(_6,s.paddingTop),r=px(_6,s.paddingRight),b=px(_6,s.paddingBottom);
return {l:l,t:t,r:r,b:b,w:l+r,h:t+b};
};
var _8="none";
_5.getBorderExtents=function getBorderExtents(_9,_a){
_9=_3.byId(_9);
var px=_4.toPixelValue,s=_a||_4.getComputedStyle(_9),l=s.borderLeftStyle!=_8?px(_9,s.borderLeftWidth):0,t=s.borderTopStyle!=_8?px(_9,s.borderTopWidth):0,r=s.borderRightStyle!=_8?px(_9,s.borderRightWidth):0,b=s.borderBottomStyle!=_8?px(_9,s.borderBottomWidth):0;
return {l:l,t:t,r:r,b:b,w:l+r,h:t+b};
};
_5.getPadBorderExtents=function getPadBorderExtents(_b,_c){
_b=_3.byId(_b);
var s=_c||_4.getComputedStyle(_b),p=_5.getPadExtents(_b,s),b=_5.getBorderExtents(_b,s);
return {l:p.l+b.l,t:p.t+b.t,r:p.r+b.r,b:p.b+b.b,w:p.w+b.w,h:p.h+b.h};
};
_5.getMarginExtents=function getMarginExtents(_d,_e){
_d=_3.byId(_d);
var s=_e||_4.getComputedStyle(_d),px=_4.toPixelValue,l=px(_d,s.marginLeft),t=px(_d,s.marginTop),r=px(_d,s.marginRight),b=px(_d,s.marginBottom);
return {l:l,t:t,r:r,b:b,w:l+r,h:t+b};
};
_5.getMarginBox=function getMarginBox(_f,_10){
_f=_3.byId(_f);
var s=_10||_4.getComputedStyle(_f),me=_5.getMarginExtents(_f,s),l=_f.offsetLeft-me.l,t=_f.offsetTop-me.t,p=_f.parentNode,px=_4.toPixelValue,pcs;
if(_1("mozilla")){
var sl=parseFloat(s.left),st=parseFloat(s.top);
if(!isNaN(sl)&&!isNaN(st)){
l=sl;
t=st;
}else{
if(p&&p.style){
pcs=_4.getComputedStyle(p);
if(pcs.overflow!="visible"){
l+=pcs.borderLeftStyle!=_8?px(_f,pcs.borderLeftWidth):0;
t+=pcs.borderTopStyle!=_8?px(_f,pcs.borderTopWidth):0;
}
}
}
}else{
if(_1("opera")||(_1("ie")==8&&!_1("quirks"))){
if(p){
pcs=_4.getComputedStyle(p);
l-=pcs.borderLeftStyle!=_8?px(_f,pcs.borderLeftWidth):0;
t-=pcs.borderTopStyle!=_8?px(_f,pcs.borderTopWidth):0;
}
}
}
return {l:l,t:t,w:_f.offsetWidth+me.w,h:_f.offsetHeight+me.h};
};
_5.getContentBox=function getContentBox(_11,_12){
_11=_3.byId(_11);
var s=_12||_4.getComputedStyle(_11),w=_11.clientWidth,h,pe=_5.getPadExtents(_11,s),be=_5.getBorderExtents(_11,s);
if(!w){
w=_11.offsetWidth;
h=_11.offsetHeight;
}else{
h=_11.clientHeight;
be.w=be.h=0;
}
if(_1("opera")){
pe.l+=be.l;
pe.t+=be.t;
}
return {l:pe.l,t:pe.t,w:w-pe.w-be.w,h:h-pe.h-be.h};
};
function _13(_14,l,t,w,h,u){
u=u||"px";
var s=_14.style;
if(!isNaN(l)){
s.left=l+u;
}
if(!isNaN(t)){
s.top=t+u;
}
if(w>=0){
s.width=w+u;
}
if(h>=0){
s.height=h+u;
}
};
function _15(_16){
return _16.tagName.toLowerCase()=="button"||_16.tagName.toLowerCase()=="input"&&(_16.getAttribute("type")||"").toLowerCase()=="button";
};
function _17(_18){
return _5.boxModel=="border-box"||_18.tagName.toLowerCase()=="table"||_15(_18);
};
_5.setContentSize=function setContentSize(_19,box,_1a){
_19=_3.byId(_19);
var w=box.w,h=box.h;
if(_17(_19)){
var pb=_5.getPadBorderExtents(_19,_1a);
if(w>=0){
w+=pb.w;
}
if(h>=0){
h+=pb.h;
}
}
_13(_19,NaN,NaN,w,h);
};
var _1b={l:0,t:0,w:0,h:0};
_5.setMarginBox=function setMarginBox(_1c,box,_1d){
_1c=_3.byId(_1c);
var s=_1d||_4.getComputedStyle(_1c),w=box.w,h=box.h,pb=_17(_1c)?_1b:_5.getPadBorderExtents(_1c,s),mb=_5.getMarginExtents(_1c,s);
if(_1("webkit")){
if(_15(_1c)){
var ns=_1c.style;
if(w>=0&&!ns.width){
ns.width="4px";
}
if(h>=0&&!ns.height){
ns.height="4px";
}
}
}
if(w>=0){
w=Math.max(w-pb.w-mb.w,0);
}
if(h>=0){
h=Math.max(h-pb.h-mb.h,0);
}
_13(_1c,box.l,box.t,w,h);
};
_5.isBodyLtr=function isBodyLtr(doc){
doc=doc||_2.doc;
return (_2.body(doc).dir||doc.documentElement.dir||"ltr").toLowerCase()=="ltr";
};
_5.docScroll=function docScroll(doc){
doc=doc||_2.doc;
var _1e=_2.doc.parentWindow||_2.doc.defaultView;
return "pageXOffset" in _1e?{x:_1e.pageXOffset,y:_1e.pageYOffset}:(_1e=_1("quirks")?_2.body(doc):doc.documentElement)&&{x:_5.fixIeBiDiScrollLeft(_1e.scrollLeft||0,doc),y:_1e.scrollTop||0};
};
if(_1("ie")){
_5.getIeDocumentElementOffset=function getIeDocumentElementOffset(doc){
doc=doc||_2.doc;
var de=doc.documentElement;
if(_1("ie")<8){
var r=de.getBoundingClientRect(),l=r.left,t=r.top;
if(_1("ie")<7){
l+=de.clientLeft;
t+=de.clientTop;
}
return {x:l<0?0:l,y:t<0?0:t};
}else{
return {x:0,y:0};
}
};
}
_5.fixIeBiDiScrollLeft=function fixIeBiDiScrollLeft(_1f,doc){
doc=doc||_2.doc;
var ie=_1("ie");
if(ie&&!_5.isBodyLtr(doc)){
var qk=_1("quirks"),de=qk?_2.body(doc):doc.documentElement,_20=_2.global;
if(ie==6&&!qk&&_20.frameElement&&de.scrollHeight>de.clientHeight){
_1f+=de.clientLeft;
}
return (ie<8||qk)?(_1f+de.clientWidth-de.scrollWidth):-_1f;
}
return _1f;
};
_5.position=function(_21,_22){
_21=_3.byId(_21);
var db=_2.body(_21.ownerDocument),ret=_21.getBoundingClientRect();
ret={x:ret.left,y:ret.top,w:ret.right-ret.left,h:ret.bottom-ret.top};
if(_1("ie")<9){
var _23=_5.getIeDocumentElementOffset(_21.ownerDocument);
ret.x-=_23.x+(_1("quirks")?db.clientLeft+db.offsetLeft:0);
ret.y-=_23.y+(_1("quirks")?db.clientTop+db.offsetTop:0);
}
if(_22){
var _24=_5.docScroll(_21.ownerDocument);
ret.x+=_24.x;
ret.y+=_24.y;
}
return ret;
};
_5.getMarginSize=function getMarginSize(_25,_26){
_25=_3.byId(_25);
var me=_5.getMarginExtents(_25,_26||_4.getComputedStyle(_25));
var _27=_25.getBoundingClientRect();
return {w:(_27.right-_27.left)+me.w,h:(_27.bottom-_27.top)+me.h};
};
_5.normalizeEvent=function(_28){
if(!("layerX" in _28)){
_28.layerX=_28.offsetX;
_28.layerY=_28.offsetY;
}
if(!_1("dom-addeventlistener")){
var se=_28.target;
var doc=(se&&se.ownerDocument)||document;
var _29=_1("quirks")?doc.body:doc.documentElement;
var _2a=_5.getIeDocumentElementOffset(doc);
_28.pageX=_28.clientX+_5.fixIeBiDiScrollLeft(_29.scrollLeft||0,doc)-_2a.x;
_28.pageY=_28.clientY+(_29.scrollTop||0)-_2a.y;
}
};
return _5;
});


;define("dojo/_base/event",["./kernel","../on","../has","../dom-geometry"],function(_1,on,_2,_3){
if(on._fixEvent){
var _4=on._fixEvent;
on._fixEvent=function(_5,se){
_5=_4(_5,se);
if(_5){
_3.normalizeEvent(_5);
}
return _5;
};
}
var _6={fix:function(_7,_8){
if(on._fixEvent){
return on._fixEvent(_7,_8);
}
return _7;
},stop:function(_9){
if(_2("dom-addeventlistener")||(_9&&_9.preventDefault)){
_9.preventDefault();
_9.stopPropagation();
}else{
_9=_9||window.event;
_9.cancelBubble=true;
on._preventDefault.call(_9);
}
}};
if(_2("extend-dojo")){
_1.fixEvent=_6.fix;
_1.stopEvent=_6.stop;
}
return _6;
});


;define("dojo/mouse",["./_base/kernel","./on","./has","./dom","./_base/window"],function(_1,on,_2,_3,_4){
_2.add("dom-quirks",_4.doc&&_4.doc.compatMode=="BackCompat");
_2.add("events-mouseenter",_4.doc&&"onmouseenter" in _4.doc.createElement("div"));
_2.add("events-mousewheel",_4.doc&&"onmousewheel" in _4.doc);
var _5;
if((_2("dom-quirks")&&_2("ie"))||!_2("dom-addeventlistener")){
_5={LEFT:1,MIDDLE:4,RIGHT:2,isButton:function(e,_6){
return e.button&_6;
},isLeft:function(e){
return e.button&1;
},isMiddle:function(e){
return e.button&4;
},isRight:function(e){
return e.button&2;
}};
}else{
_5={LEFT:0,MIDDLE:1,RIGHT:2,isButton:function(e,_7){
return e.button==_7;
},isLeft:function(e){
return e.button==0;
},isMiddle:function(e){
return e.button==1;
},isRight:function(e){
return e.button==2;
}};
}
_1.mouseButtons=_5;
function _8(_9,_a){
var _b=function(_c,_d){
return on(_c,_9,function(_e){
if(_a){
return _a(_e,_d);
}
if(!_3.isDescendant(_e.relatedTarget,_c)){
return _d.call(this,_e);
}
});
};
_b.bubble=function(_f){
return _8(_9,function(evt,_10){
var _11=_f(evt.target);
var _12=evt.relatedTarget;
if(_11&&(_11!=(_12&&_12.nodeType==1&&_f(_12)))){
return _10.call(_11,evt);
}
});
};
return _b;
};
var _13;
if(_2("events-mousewheel")){
_13="mousewheel";
}else{
_13=function(_14,_15){
return on(_14,"DOMMouseScroll",function(evt){
evt.wheelDelta=-evt.detail;
_15.call(this,evt);
});
};
}
return {_eventHandler:_8,enter:_8("mouseover"),leave:_8("mouseout"),wheel:_13,isLeft:_5.isLeft,isMiddle:_5.isMiddle,isRight:_5.isRight};
});


;define("dojo/_base/sniff",["./kernel","./lang","../sniff"],function(_1,_2,_3){
if(!_3("host-browser")){
return _3;
}
_1._name="browser";
_2.mixin(_1,{isBrowser:true,isFF:_3("ff"),isIE:_3("ie"),isTrident:_3("trident"),isKhtml:_3("khtml"),isWebKit:_3("webkit"),isMozilla:_3("mozilla"),isMoz:_3("mozilla"),isOpera:_3("opera"),isSafari:_3("safari"),isChrome:_3("chrome"),isMac:_3("mac"),isIos:_3("ios"),isAndroid:_3("android"),isWii:_3("wii"),isQuirks:_3("quirks"),isAir:_3("air")});
return _3;
});


;define("dojo/keys",["./_base/kernel","./sniff"],function(_1,_2){
return _1.keys={BACKSPACE:8,TAB:9,CLEAR:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,META:_2("webkit")?91:224,PAUSE:19,CAPS_LOCK:20,ESCAPE:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT_ARROW:37,UP_ARROW:38,RIGHT_ARROW:39,DOWN_ARROW:40,INSERT:45,DELETE:46,HELP:47,LEFT_WINDOW:91,RIGHT_WINDOW:92,SELECT:93,NUMPAD_0:96,NUMPAD_1:97,NUMPAD_2:98,NUMPAD_3:99,NUMPAD_4:100,NUMPAD_5:101,NUMPAD_6:102,NUMPAD_7:103,NUMPAD_8:104,NUMPAD_9:105,NUMPAD_MULTIPLY:106,NUMPAD_PLUS:107,NUMPAD_ENTER:108,NUMPAD_MINUS:109,NUMPAD_PERIOD:110,NUMPAD_DIVIDE:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,F13:124,F14:125,F15:126,NUM_LOCK:144,SCROLL_LOCK:145,UP_DPAD:175,DOWN_DPAD:176,LEFT_DPAD:177,RIGHT_DPAD:178,copyKey:_2("mac")&&!_2("air")?(_2("safari")?91:224):17};
});


;define("dojo/_base/connect",["./kernel","../on","../topic","../aspect","./event","../mouse","./sniff","./lang","../keys"],function(_1,on,_2,_3,_4,_5,_6,_7){
_6.add("events-keypress-typed",function(){
var _8={charCode:0};
try{
_8=document.createEvent("KeyboardEvent");
(_8.initKeyboardEvent||_8.initKeyEvent).call(_8,"keypress",true,true,null,false,false,false,false,9,3);
}
catch(e){
}
return _8.charCode==0&&!_6("opera");
});
function _9(_a,_b,_c,_d,_e){
_d=_7.hitch(_c,_d);
if(!_a||!(_a.addEventListener||_a.attachEvent)){
return _3.after(_a||_1.global,_b,_d,true);
}
if(typeof _b=="string"&&_b.substring(0,2)=="on"){
_b=_b.substring(2);
}
if(!_a){
_a=_1.global;
}
if(!_e){
switch(_b){
case "keypress":
_b=_f;
break;
case "mouseenter":
_b=_5.enter;
break;
case "mouseleave":
_b=_5.leave;
break;
}
}
return on(_a,_b,_d,_e);
};
var _10={106:42,111:47,186:59,187:43,188:44,189:45,190:46,191:47,192:96,219:91,220:92,221:93,222:39};
var _11=_6("mac")?"metaKey":"ctrlKey";
var _12=function(evt,_13){
var _14=_7.mixin({},evt,_13);
_15(_14);
_14.preventDefault=function(){
evt.preventDefault();
};
_14.stopPropagation=function(){
evt.stopPropagation();
};
return _14;
};
function _15(evt){
evt.keyChar=evt.charCode?String.fromCharCode(evt.charCode):"";
evt.charOrCode=evt.keyChar||evt.keyCode;
};
var _f;
if(_6("events-keypress-typed")){
var _16=function(e,_17){
try{
return (e.keyCode=_17);
}
catch(e){
return 0;
}
};
_f=function(_18,_19){
var _1a=on(_18,"keydown",function(evt){
var k=evt.keyCode;
var _1b=(k!=13)&&k!=32&&(k!=27||!_6("ie"))&&(k<48||k>90)&&(k<96||k>111)&&(k<186||k>192)&&(k<219||k>222);
if(_1b||evt.ctrlKey){
var c=_1b?0:k;
if(evt.ctrlKey){
if(k==3||k==13){
return _19.call(evt.currentTarget,evt);
}else{
if(c>95&&c<106){
c-=48;
}else{
if((!evt.shiftKey)&&(c>=65&&c<=90)){
c+=32;
}else{
c=_10[c]||c;
}
}
}
}
var _1c=_12(evt,{type:"keypress",faux:true,charCode:c});
_19.call(evt.currentTarget,_1c);
if(_6("ie")){
_16(evt,_1c.keyCode);
}
}
});
var _1d=on(_18,"keypress",function(evt){
var c=evt.charCode;
c=c>=32?c:0;
evt=_12(evt,{charCode:c,faux:true});
return _19.call(this,evt);
});
return {remove:function(){
_1a.remove();
_1d.remove();
}};
};
}else{
if(_6("opera")){
_f=function(_1e,_1f){
return on(_1e,"keypress",function(evt){
var c=evt.which;
if(c==3){
c=99;
}
c=c<32&&!evt.shiftKey?0:c;
if(evt.ctrlKey&&!evt.shiftKey&&c>=65&&c<=90){
c+=32;
}
return _1f.call(this,_12(evt,{charCode:c}));
});
};
}else{
_f=function(_20,_21){
return on(_20,"keypress",function(evt){
_15(evt);
return _21.call(this,evt);
});
};
}
}
var _22={_keypress:_f,connect:function(obj,_23,_24,_25,_26){
var a=arguments,_27=[],i=0;
_27.push(typeof a[0]=="string"?null:a[i++],a[i++]);
var a1=a[i+1];
_27.push(typeof a1=="string"||typeof a1=="function"?a[i++]:null,a[i++]);
for(var l=a.length;i<l;i++){
_27.push(a[i]);
}
return _9.apply(this,_27);
},disconnect:function(_28){
if(_28){
_28.remove();
}
},subscribe:function(_29,_2a,_2b){
return _2.subscribe(_29,_7.hitch(_2a,_2b));
},publish:function(_2c,_2d){
return _2.publish.apply(_2,[_2c].concat(_2d));
},connectPublisher:function(_2e,obj,_2f){
var pf=function(){
_22.publish(_2e,arguments);
};
return _2f?_22.connect(obj,_2f,pf):_22.connect(obj,pf);
},isCopyKey:function(e){
return e[_11];
}};
_22.unsubscribe=_22.disconnect;
_6("extend-dojo")&&_7.mixin(_1,_22);
return _22;
});


;define("dojo/errors/create",["../_base/lang"],function(_1){
return function(_2,_3,_4,_5){
_4=_4||Error;
var _6=function(_7){
if(_4===Error){
if(Error.captureStackTrace){
Error.captureStackTrace(this,_6);
}
var _8=Error.call(this,_7),_9;
for(_9 in _8){
if(_8.hasOwnProperty(_9)){
this[_9]=_8[_9];
}
}
this.message=_7;
this.stack=_8.stack;
}else{
_4.apply(this,arguments);
}
if(_3){
_3.apply(this,arguments);
}
};
_6.prototype=_1.delegate(_4.prototype,_5);
_6.prototype.name=_2;
_6.prototype.constructor=_6;
return _6;
};
});


;define("dojo/errors/CancelError",["./create"],function(_1){
return _1("CancelError",null,null,{dojoType:"cancel"});
});


;define("dojo/promise/Promise",["../_base/lang"],function(_1){
"use strict";
function _2(){
throw new TypeError("abstract");
};
return _1.extend(function Promise(){
},{then:function(_3,_4,_5){
_2();
},cancel:function(_6,_7){
_2();
},isResolved:function(){
_2();
},isRejected:function(){
_2();
},isFulfilled:function(){
_2();
},isCanceled:function(){
_2();
},always:function(_8){
return this.then(_8,_8);
},otherwise:function(_9){
return this.then(null,_9);
},trace:function(){
return this;
},traceRejected:function(){
return this;
},toString:function(){
return "[object Promise]";
}});
});


;define("dojo/promise/tracer",["../_base/lang","./Promise","../Evented"],function(_1,_2,_3){
"use strict";
var _4=new _3;
var _5=_4.emit;
_4.emit=null;
function _6(_7){
setTimeout(function(){
_5.apply(_4,_7);
},0);
};
_2.prototype.trace=function(){
var _8=_1._toArray(arguments);
this.then(function(_9){
_6(["resolved",_9].concat(_8));
},function(_a){
_6(["rejected",_a].concat(_8));
},function(_b){
_6(["progress",_b].concat(_8));
});
return this;
};
_2.prototype.traceRejected=function(){
var _c=_1._toArray(arguments);
this.otherwise(function(_d){
_6(["rejected",_d].concat(_c));
});
return this;
};
return _4;
});


;define("dojo/promise/instrumentation",["./tracer","../has","../_base/lang","../_base/array"],function(_1,_2,_3,_4){
_2.add("config-useDeferredInstrumentation","report-unhandled-rejections");
function _5(_6,_7,_8){
var _9="";
if(_6&&_6.stack){
_9+=_6.stack;
}
if(_7&&_7.stack){
_9+="\n    ----------------------------------------\n    rejected"+_7.stack.split("\n").slice(1).join("\n").replace(/^\s+/," ");
}
if(_8&&_8.stack){
_9+="\n    ----------------------------------------\n"+_8.stack;
}
console.error(_6,_9);
};
function _a(_b,_c,_d,_e){
if(!_c){
_5(_b,_d,_e);
}
};
var _f=[];
var _10=false;
var _11=1000;
function _12(_13,_14,_15,_16){
if(!_4.some(_f,function(obj){
if(obj.error===_13){
if(_14){
obj.handled=true;
}
return true;
}
})){
_f.push({error:_13,rejection:_15,handled:_14,deferred:_16,timestamp:new Date().getTime()});
}
if(!_10){
_10=setTimeout(_17,_11);
}
};
function _17(){
var now=new Date().getTime();
var _18=now-_11;
_f=_4.filter(_f,function(obj){
if(obj.timestamp<_18){
if(!obj.handled){
_5(obj.error,obj.rejection,obj.deferred);
}
return false;
}
return true;
});
if(_f.length){
_10=setTimeout(_17,_f[0].timestamp+_11-now);
}else{
_10=false;
}
};
return function(_19){
var _1a=_2("config-useDeferredInstrumentation");
if(_1a){
_1.on("resolved",_3.hitch(console,"log","resolved"));
_1.on("rejected",_3.hitch(console,"log","rejected"));
_1.on("progress",_3.hitch(console,"log","progress"));
var _1b=[];
if(typeof _1a==="string"){
_1b=_1a.split(",");
_1a=_1b.shift();
}
if(_1a==="report-rejections"){
_19.instrumentRejected=_a;
}else{
if(_1a==="report-unhandled-rejections"||_1a===true||_1a===1){
_19.instrumentRejected=_12;
_11=parseInt(_1b[0],10)||_11;
}else{
throw new Error("Unsupported instrumentation usage <"+_1a+">");
}
}
}
};
});


;define("dojo/Deferred",["./has","./_base/lang","./errors/CancelError","./promise/Promise","./has!config-deferredInstrumentation?./promise/instrumentation"],function(_1,_2,_3,_4,_5){
"use strict";
var _6=0,_7=1,_8=2;
var _9="This deferred has already been fulfilled.";
var _a=Object.freeze||function(){
};
var _b=function(_c,_d,_e,_f,_10){
if(_1("config-deferredInstrumentation")){
if(_d===_8&&_11.instrumentRejected&&_c.length===0){
_11.instrumentRejected(_e,false,_f,_10);
}
}
for(var i=0;i<_c.length;i++){
_12(_c[i],_d,_e,_f);
}
};
var _12=function(_13,_14,_15,_16){
var _17=_13[_14];
var _18=_13.deferred;
if(_17){
try{
var _19=_17(_15);
if(_14===_6){
if(typeof _19!=="undefined"){
_1a(_18,_14,_19);
}
}else{
if(_19&&typeof _19.then==="function"){
_13.cancel=_19.cancel;
_19.then(_1b(_18,_7),_1b(_18,_8),_1b(_18,_6));
return;
}
_1a(_18,_7,_19);
}
}
catch(error){
_1a(_18,_8,error);
}
}else{
_1a(_18,_14,_15);
}
if(_1("config-deferredInstrumentation")){
if(_14===_8&&_11.instrumentRejected){
_11.instrumentRejected(_15,!!_17,_16,_18.promise);
}
}
};
var _1b=function(_1c,_1d){
return function(_1e){
_1a(_1c,_1d,_1e);
};
};
var _1a=function(_1f,_20,_21){
if(!_1f.isCanceled()){
switch(_20){
case _6:
_1f.progress(_21);
break;
case _7:
_1f.resolve(_21);
break;
case _8:
_1f.reject(_21);
break;
}
}
};
var _11=function(_22){
var _23=this.promise=new _4();
var _24=this;
var _25,_26,_27;
var _28=false;
var _29=[];
if(_1("config-deferredInstrumentation")&&Error.captureStackTrace){
Error.captureStackTrace(_24,_11);
Error.captureStackTrace(_23,_11);
}
this.isResolved=_23.isResolved=function(){
return _25===_7;
};
this.isRejected=_23.isRejected=function(){
return _25===_8;
};
this.isFulfilled=_23.isFulfilled=function(){
return !!_25;
};
this.isCanceled=_23.isCanceled=function(){
return _28;
};
this.progress=function(_2a,_2b){
if(!_25){
_b(_29,_6,_2a,null,_24);
return _23;
}else{
if(_2b===true){
throw new Error(_9);
}else{
return _23;
}
}
};
this.resolve=function(_2c,_2d){
if(!_25){
_b(_29,_25=_7,_26=_2c,null,_24);
_29=null;
return _23;
}else{
if(_2d===true){
throw new Error(_9);
}else{
return _23;
}
}
};
var _2e=this.reject=function(_2f,_30){
if(!_25){
if(_1("config-deferredInstrumentation")&&Error.captureStackTrace){
Error.captureStackTrace(_27={},_2e);
}
_b(_29,_25=_8,_26=_2f,_27,_24);
_29=null;
return _23;
}else{
if(_30===true){
throw new Error(_9);
}else{
return _23;
}
}
};
this.then=_23.then=function(_31,_32,_33){
var _34=[_33,_31,_32];
_34.cancel=_23.cancel;
_34.deferred=new _11(function(_35){
return _34.cancel&&_34.cancel(_35);
});
if(_25&&!_29){
_12(_34,_25,_26,_27);
}else{
_29.push(_34);
}
return _34.deferred.promise;
};
this.cancel=_23.cancel=function(_36,_37){
if(!_25){
if(_22){
var _38=_22(_36);
_36=typeof _38==="undefined"?_36:_38;
}
_28=true;
if(!_25){
if(typeof _36==="undefined"){
_36=new _3();
}
_2e(_36);
return _36;
}else{
if(_25===_8&&_26===_36){
return _36;
}
}
}else{
if(_37===true){
throw new Error(_9);
}
}
};
_a(_23);
};
_11.prototype.toString=function(){
return "[object Deferred]";
};
if(_5){
_5(_11);
}
return _11;
});


;define("dojo/when",["./Deferred","./promise/Promise"],function(_1,_2){
"use strict";
return function when(_3,_4,_5,_6){
var _7=_3&&typeof _3.then==="function";
var _8=_7&&_3 instanceof _2;
if(!_7){
if(arguments.length>1){
return _4?_4(_3):_3;
}else{
return new _1().resolve(_3);
}
}else{
if(!_8){
var _9=new _1(_3.cancel);
_3.then(_9.resolve,_9.reject,_9.progress);
_3=_9.promise;
}
}
if(_4||_5||_6){
return _3.then(_4,_5,_6);
}
return _3;
};
});


;define("dojo/_base/Deferred",["./kernel","../Deferred","../promise/Promise","../errors/CancelError","../has","./lang","../when"],function(_1,_2,_3,_4,_5,_6,_7){
var _8=function(){
};
var _9=Object.freeze||function(){
};
var _a=_1.Deferred=function(_b){
var _c,_d,_e,_f,_10,_11,_12;
var _13=(this.promise=new _3());
function _14(_15){
if(_d){
throw new Error("This deferred has already been resolved");
}
_c=_15;
_d=true;
_16();
};
function _16(){
var _17;
while(!_17&&_12){
var _18=_12;
_12=_12.next;
if((_17=(_18.progress==_8))){
_d=false;
}
var _19=(_10?_18.error:_18.resolved);
if(_5("config-useDeferredInstrumentation")){
if(_10&&_2.instrumentRejected){
_2.instrumentRejected(_c,!!_19);
}
}
if(_19){
try{
var _1a=_19(_c);
if(_1a&&typeof _1a.then==="function"){
_1a.then(_6.hitch(_18.deferred,"resolve"),_6.hitch(_18.deferred,"reject"),_6.hitch(_18.deferred,"progress"));
continue;
}
var _1b=_17&&_1a===undefined;
if(_17&&!_1b){
_10=_1a instanceof Error;
}
_18.deferred[_1b&&_10?"reject":"resolve"](_1b?_c:_1a);
}
catch(e){
_18.deferred.reject(e);
}
}else{
if(_10){
_18.deferred.reject(_c);
}else{
_18.deferred.resolve(_c);
}
}
}
};
this.isResolved=_13.isResolved=function(){
return _f==0;
};
this.isRejected=_13.isRejected=function(){
return _f==1;
};
this.isFulfilled=_13.isFulfilled=function(){
return _f>=0;
};
this.isCanceled=_13.isCanceled=function(){
return _e;
};
this.resolve=this.callback=function(_1c){
this.fired=_f=0;
this.results=[_1c,null];
_14(_1c);
};
this.reject=this.errback=function(_1d){
_10=true;
this.fired=_f=1;
if(_5("config-useDeferredInstrumentation")){
if(_2.instrumentRejected){
_2.instrumentRejected(_1d,!!_12);
}
}
_14(_1d);
this.results=[null,_1d];
};
this.progress=function(_1e){
var _1f=_12;
while(_1f){
var _20=_1f.progress;
_20&&_20(_1e);
_1f=_1f.next;
}
};
this.addCallbacks=function(_21,_22){
this.then(_21,_22,_8);
return this;
};
_13.then=this.then=function(_23,_24,_25){
var _26=_25==_8?this:new _a(_13.cancel);
var _27={resolved:_23,error:_24,progress:_25,deferred:_26};
if(_12){
_11=_11.next=_27;
}else{
_12=_11=_27;
}
if(_d){
_16();
}
return _26.promise;
};
var _28=this;
_13.cancel=this.cancel=function(){
if(!_d){
var _29=_b&&_b(_28);
if(!_d){
if(!(_29 instanceof Error)){
_29=new _4(_29);
}
_29.log=false;
_28.reject(_29);
}
}
_e=true;
};
_9(_13);
};
_6.extend(_a,{addCallback:function(_2a){
return this.addCallbacks(_6.hitch.apply(_1,arguments));
},addErrback:function(_2b){
return this.addCallbacks(null,_6.hitch.apply(_1,arguments));
},addBoth:function(_2c){
var _2d=_6.hitch.apply(_1,arguments);
return this.addCallbacks(_2d,_2d);
},fired:-1});
_a.when=_1.when=_7;
return _a;
});


;define("dojo/json",["./has"],function(_1){
"use strict";
var _2=typeof JSON!="undefined";
_1.add("json-parse",_2);
_1.add("json-stringify",_2&&JSON.stringify({a:0},function(k,v){
return v||1;
})=="{\"a\":1}");
if(_1("json-stringify")){
return JSON;
}else{
var _3=function(_4){
return ("\""+_4.replace(/(["\\])/g,"\\$1")+"\"").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r");
};
return {parse:_1("json-parse")?JSON.parse:function(_5,_6){
if(_6&&!/^([\s\[\{]*(?:"(?:\\.|[^"])*"|-?\d[\d\.]*(?:[Ee][+-]?\d+)?|null|true|false|)[\s\]\}]*(?:,|:|$))+$/.test(_5)){
throw new SyntaxError("Invalid characters in JSON");
}
return eval("("+_5+")");
},stringify:function(_7,_8,_9){
var _a;
if(typeof _8=="string"){
_9=_8;
_8=null;
}
function _b(it,_c,_d){
if(_8){
it=_8(_d,it);
}
var _e,_f=typeof it;
if(_f=="number"){
return isFinite(it)?it+"":"null";
}
if(_f=="boolean"){
return it+"";
}
if(it===null){
return "null";
}
if(typeof it=="string"){
return _3(it);
}
if(_f=="function"||_f=="undefined"){
return _a;
}
if(typeof it.toJSON=="function"){
return _b(it.toJSON(_d),_c,_d);
}
if(it instanceof Date){
return "\"{FullYear}-{Month+}-{Date}T{Hours}:{Minutes}:{Seconds}Z\"".replace(/\{(\w+)(\+)?\}/g,function(t,_10,_11){
var num=it["getUTC"+_10]()+(_11?1:0);
return num<10?"0"+num:num;
});
}
if(it.valueOf()!==it){
return _b(it.valueOf(),_c,_d);
}
var _12=_9?(_c+_9):"";
var sep=_9?" ":"";
var _13=_9?"\n":"";
if(it instanceof Array){
var itl=it.length,res=[];
for(_d=0;_d<itl;_d++){
var obj=it[_d];
_e=_b(obj,_12,_d);
if(typeof _e!="string"){
_e="null";
}
res.push(_13+_12+_e);
}
return "["+res.join(",")+_13+_c+"]";
}
var _14=[];
for(_d in it){
var _15;
if(it.hasOwnProperty(_d)){
if(typeof _d=="number"){
_15="\""+_d+"\"";
}else{
if(typeof _d=="string"){
_15=_3(_d);
}else{
continue;
}
}
_e=_b(it[_d],_12,_d);
if(typeof _e!="string"){
continue;
}
_14.push(_13+_12+_15+":"+sep+_e);
}
}
return "{"+_14.join(",")+_13+_c+"}";
};
return _b(_7,"","");
}};
}
});


;define("dojo/_base/json",["./kernel","../json"],function(_1,_2){
_1.fromJson=function(js){
return eval("("+js+")");
};
_1._escapeString=_2.stringify;
_1.toJsonIndentStr="\t";
_1.toJson=function(it,_3){
return _2.stringify(it,function(_4,_5){
if(_5){
var tf=_5.__json__||_5.json;
if(typeof tf=="function"){
return tf.call(_5);
}
}
return _5;
},_3&&_1.toJsonIndentStr);
};
return _1;
});


;define("dojo/_base/Color",["./kernel","./lang","./array","./config"],function(_1,_2,_3,_4){
var _5=_1.Color=function(_6){
if(_6){
this.setColor(_6);
}
};
_5.named={"black":[0,0,0],"silver":[192,192,192],"gray":[128,128,128],"white":[255,255,255],"maroon":[128,0,0],"red":[255,0,0],"purple":[128,0,128],"fuchsia":[255,0,255],"green":[0,128,0],"lime":[0,255,0],"olive":[128,128,0],"yellow":[255,255,0],"navy":[0,0,128],"blue":[0,0,255],"teal":[0,128,128],"aqua":[0,255,255],"transparent":_4.transparentColor||[0,0,0,0]};
_2.extend(_5,{r:255,g:255,b:255,a:1,_set:function(r,g,b,a){
var t=this;
t.r=r;
t.g=g;
t.b=b;
t.a=a;
},setColor:function(_7){
if(_2.isString(_7)){
_5.fromString(_7,this);
}else{
if(_2.isArray(_7)){
_5.fromArray(_7,this);
}else{
this._set(_7.r,_7.g,_7.b,_7.a);
if(!(_7 instanceof _5)){
this.sanitize();
}
}
}
return this;
},sanitize:function(){
return this;
},toRgb:function(){
var t=this;
return [t.r,t.g,t.b];
},toRgba:function(){
var t=this;
return [t.r,t.g,t.b,t.a];
},toHex:function(){
var _8=_3.map(["r","g","b"],function(x){
var s=this[x].toString(16);
return s.length<2?"0"+s:s;
},this);
return "#"+_8.join("");
},toCss:function(_9){
var t=this,_a=t.r+", "+t.g+", "+t.b;
return (_9?"rgba("+_a+", "+t.a:"rgb("+_a)+")";
},toString:function(){
return this.toCss(true);
}});
_5.blendColors=_1.blendColors=function(_b,_c,_d,_e){
var t=_e||new _5();
_3.forEach(["r","g","b","a"],function(x){
t[x]=_b[x]+(_c[x]-_b[x])*_d;
if(x!="a"){
t[x]=Math.round(t[x]);
}
});
return t.sanitize();
};
_5.fromRgb=_1.colorFromRgb=function(_f,obj){
var m=_f.toLowerCase().match(/^rgba?\(([\s\.,0-9]+)\)/);
return m&&_5.fromArray(m[1].split(/\s*,\s*/),obj);
};
_5.fromHex=_1.colorFromHex=function(_10,obj){
var t=obj||new _5(),_11=(_10.length==4)?4:8,_12=(1<<_11)-1;
_10=Number("0x"+_10.substr(1));
if(isNaN(_10)){
return null;
}
_3.forEach(["b","g","r"],function(x){
var c=_10&_12;
_10>>=_11;
t[x]=_11==4?17*c:c;
});
t.a=1;
return t;
};
_5.fromArray=_1.colorFromArray=function(a,obj){
var t=obj||new _5();
t._set(Number(a[0]),Number(a[1]),Number(a[2]),Number(a[3]));
if(isNaN(t.a)){
t.a=1;
}
return t.sanitize();
};
_5.fromString=_1.colorFromString=function(str,obj){
var a=_5.named[str];
return a&&_5.fromArray(a,obj)||_5.fromRgb(str,obj)||_5.fromHex(str,obj);
};
return _5;
});


;define("dojo/_base/url",["./kernel"],function(_1){
var _2=new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$"),_3=new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$"),_4=function(){
var n=null,_5=arguments,_6=[_5[0]];
for(var i=1;i<_5.length;i++){
if(!_5[i]){
continue;
}
var _7=new _4(_5[i]+""),_8=new _4(_6[0]+"");
if(_7.path==""&&!_7.scheme&&!_7.authority&&!_7.query){
if(_7.fragment!=n){
_8.fragment=_7.fragment;
}
_7=_8;
}else{
if(!_7.scheme){
_7.scheme=_8.scheme;
if(!_7.authority){
_7.authority=_8.authority;
if(_7.path.charAt(0)!="/"){
var _9=_8.path.substring(0,_8.path.lastIndexOf("/")+1)+_7.path;
var _a=_9.split("/");
for(var j=0;j<_a.length;j++){
if(_a[j]=="."){
if(j==_a.length-1){
_a[j]="";
}else{
_a.splice(j,1);
j--;
}
}else{
if(j>0&&!(j==1&&_a[0]=="")&&_a[j]==".."&&_a[j-1]!=".."){
if(j==(_a.length-1)){
_a.splice(j,1);
_a[j-1]="";
}else{
_a.splice(j-1,2);
j-=2;
}
}
}
}
_7.path=_a.join("/");
}
}
}
}
_6=[];
if(_7.scheme){
_6.push(_7.scheme,":");
}
if(_7.authority){
_6.push("//",_7.authority);
}
_6.push(_7.path);
if(_7.query){
_6.push("?",_7.query);
}
if(_7.fragment){
_6.push("#",_7.fragment);
}
}
this.uri=_6.join("");
var r=this.uri.match(_2);
this.scheme=r[2]||(r[1]?"":n);
this.authority=r[4]||(r[3]?"":n);
this.path=r[5];
this.query=r[7]||(r[6]?"":n);
this.fragment=r[9]||(r[8]?"":n);
if(this.authority!=n){
r=this.authority.match(_3);
this.user=r[3]||n;
this.password=r[4]||n;
this.host=r[6]||r[7];
this.port=r[9]||n;
}
};
_4.prototype.toString=function(){
return this.uri;
};
return _1._Url=_4;
});


;define("dojo/dom-attr",["exports","./sniff","./_base/lang","./dom","./dom-style","jazz/inverted!./dom-prop"],function(_1,_2,_3,_4,_5,_6){
var _7={innerHTML:1,textContent:1,className:1,htmlFor:_2("ie"),value:1},_8={classname:"class",htmlfor:"for",tabindex:"tabIndex",readonly:"readOnly"};
function _9(_a,_b){
var _c=_a.getAttributeNode&&_a.getAttributeNode(_b);
return !!_c&&_c.specified;
};
_1.has=function hasAttr(_d,_e){
var lc=_e.toLowerCase();
return _7[_6.names[lc]||_e]||_9(_4.byId(_d),_8[lc]||_e);
};
_1.get=function getAttr(_f,_10){
_f=_4.byId(_f);
var lc=_10.toLowerCase(),_11=_6.names[lc]||_10,_12=_7[_11],_13=_f[_11];
if(_12&&typeof _13!="undefined"){
return _13;
}
if(_11=="textContent"){
return _6.get(_f,_11);
}
if(_11!="href"&&(typeof _13=="boolean"||_3.isFunction(_13))){
return _13;
}
var _14=_8[lc]||_10;
return _9(_f,_14)?_f.getAttribute(_14):null;
};
_1.set=function setAttr(_15,_16,_17){
_15=_4.byId(_15);
if(arguments.length==2){
for(var x in _16){
_1.set(_15,x,_16[x]);
}
return _15;
}
var lc=_16.toLowerCase(),_18=_6.names[lc]||_16,_19=_7[_18];
if(_18=="style"&&typeof _17!="string"){
_5.set(_15,_17);
return _15;
}
if(_19||typeof _17=="boolean"||_3.isFunction(_17)){
return _6.set(_15,_16,_17);
}
_15.setAttribute(_8[lc]||_16,_17);
return _15;
};
_1.remove=function removeAttr(_1a,_1b){
_4.byId(_1a).removeAttribute(_8[_1b.toLowerCase()]||_1b);
};
_1.getNodeProp=function getNodeProp(_1c,_1d){
_1c=_4.byId(_1c);
var lc=_1d.toLowerCase(),_1e=_6.names[lc]||_1d;
if((_1e in _1c)&&_1e!="href"){
return _1c[_1e];
}
var _1f=_8[lc]||_1d;
return _9(_1c,_1f)?_1c.getAttribute(_1f):null;
};
});


;define("dojo/dom-construct",["exports","./_base/kernel","./sniff","./_base/window","./dom","./dom-attr"],function(_1,_2,_3,_4,_5,_6){
var _7={option:["select"],tbody:["table"],thead:["table"],tfoot:["table"],tr:["table","tbody"],td:["table","tbody","tr"],th:["table","thead","tr"],legend:["fieldset"],caption:["table"],colgroup:["table"],col:["table","colgroup"],li:["ul"]},_8=/<\s*([\w\:]+)/,_9={},_a=0,_b="__"+_2._scopeName+"ToDomId";
for(var _c in _7){
if(_7.hasOwnProperty(_c)){
var tw=_7[_c];
tw.pre=_c=="option"?"<select multiple=\"multiple\">":"<"+tw.join("><")+">";
tw.post="</"+tw.reverse().join("></")+">";
}
}
var _d;
if(_3("ie")<=8){
_d=function(_e){
_e.__dojo_html5_tested="yes";
var _f=_10("div",{innerHTML:"<nav>a</nav>",style:{visibility:"hidden"}},_e.body);
if(_f.childNodes.length!==1){
("abbr article aside audio canvas details figcaption figure footer header "+"hgroup mark meter nav output progress section summary time video").replace(/\b\w+\b/g,function(n){
_e.createElement(n);
});
}
_11(_f);
};
}
function _12(_13,ref){
var _14=ref.parentNode;
if(_14){
_14.insertBefore(_13,ref);
}
};
function _15(_16,ref){
var _17=ref.parentNode;
if(_17){
if(_17.lastChild==ref){
_17.appendChild(_16);
}else{
_17.insertBefore(_16,ref.nextSibling);
}
}
};
_1.toDom=function toDom(_18,doc){
doc=doc||_4.doc;
var _19=doc[_b];
if(!_19){
doc[_b]=_19=++_a+"";
}
if(!_19||_9&&!_9[_19]){
_9[_19]=doc.createElement("div");
}
if(_3("ie")<=8){
if(!doc.__dojo_html5_tested&&doc.body){
_d(doc);
}
}
_18+="";
var _1a=_18.match(_8),tag=_1a?_1a[1].toLowerCase():"",_1b=_9[_19],_1c,i,fc,df;
if(_1a&&_7[tag]){
_1c=_7[tag];
_1b.innerHTML=_1c.pre+_18+_1c.post;
for(i=_1c.length;i;--i){
_1b=_1b.firstChild;
}
}else{
_1b.innerHTML=_18;
}
if(_1b.childNodes.length==1){
return _1b.removeChild(_1b.firstChild);
}
df=doc.createDocumentFragment();
while((fc=_1b.firstChild)){
df.appendChild(fc);
}
return df;
};
_1.place=function place(_1d,_1e,_1f){
_1e=_5.byId(_1e);
if(typeof _1d=="string"){
_1d=/^\s*</.test(_1d)?_1.toDom(_1d,_1e.ownerDocument):_5.byId(_1d);
}
if(typeof _1f=="number"){
var cn=_1e.childNodes;
if(!cn.length||cn.length<=_1f){
_1e.appendChild(_1d);
}else{
_12(_1d,cn[_1f<0?0:_1f]);
}
}else{
switch(_1f){
case "before":
_12(_1d,_1e);
break;
case "after":
_15(_1d,_1e);
break;
case "replace":
_1e.parentNode.replaceChild(_1d,_1e);
break;
case "only":
_1.empty(_1e);
_1e.appendChild(_1d);
break;
case "first":
if(_1e.firstChild){
_12(_1d,_1e.firstChild);
break;
}
default:
_1e.appendChild(_1d);
}
}
return _1d;
};
var _10=_1.create=function _10(tag,_20,_21,pos){
var doc=_4.doc;
if(_21){
_21=_5.byId(_21);
doc=_21.ownerDocument;
}
if(typeof tag=="string"){
tag=doc.createElement(tag);
}
if(_20){
_6.set(tag,_20);
}
if(_21){
_1.place(tag,_21,pos);
}
return tag;
};
function _22(_23){
if("innerHTML" in _23){
try{
_23.innerHTML="";
return;
}
catch(e){
}
}
for(var c;c=_23.lastChild;){
_23.removeChild(c);
}
};
_1.empty=function empty(_24){
_22(_5.byId(_24));
};
function _25(_26,_27){
if(_26.firstChild){
_22(_26);
}
if(_27){
_3("ie")&&_27.canHaveChildren&&"removeNode" in _26?_26.removeNode(false):_27.removeChild(_26);
}
};
var _11=_1.destroy=function _11(_28){
_28=_5.byId(_28);
if(!_28){
return;
}
_25(_28,_28.parentNode);
};
});


;define("dojo/dom-prop",["exports","./_base/kernel","./sniff","./_base/lang","./dom","./dom-style","./dom-construct","./_base/connect"],function(_1,_2,_3,_4,_5,_6,_7,_8){
var _9={},_a=0,_b=_2._scopeName+"attrid";
_3.add("dom-textContent",function(_c,_d,_e){
return "textContent" in _e;
});
_1.names={"class":"className","for":"htmlFor",tabindex:"tabIndex",readonly:"readOnly",colspan:"colSpan",frameborder:"frameBorder",rowspan:"rowSpan",textcontent:"textContent",valuetype:"valueType"};
function _f(_10){
var _11="",ch=_10.childNodes;
for(var i=0,n;n=ch[i];i++){
if(n.nodeType!=8){
if(n.nodeType==1){
_11+=_f(n);
}else{
_11+=n.nodeValue;
}
}
}
return _11;
};
_1.get=function getProp(_12,_13){
_12=_5.byId(_12);
var lc=_13.toLowerCase(),_14=_1.names[lc]||_13;
if(_14=="textContent"&&!_3("dom-textContent")){
return _f(_12);
}
return _12[_14];
};
_1.set=function setProp(_15,_16,_17){
_15=_5.byId(_15);
var l=arguments.length;
if(l==2&&typeof _16!="string"){
for(var x in _16){
_1.set(_15,x,_16[x]);
}
return _15;
}
var lc=_16.toLowerCase(),_18=_1.names[lc]||_16;
if(_18=="style"&&typeof _17!="string"){
_6.set(_15,_17);
return _15;
}
if(_18=="innerHTML"){
if(_3("ie")&&_15.tagName.toLowerCase() in {col:1,colgroup:1,table:1,tbody:1,tfoot:1,thead:1,tr:1,title:1}){
_7.empty(_15);
_15.appendChild(_7.toDom(_17,_15.ownerDocument));
}else{
_15[_18]=_17;
}
return _15;
}
if(_18=="textContent"&&!_3("dom-textContent")){
_7.empty(_15);
_15.appendChild(_15.ownerDocument.createTextNode(_17));
return _15;
}
if(_4.isFunction(_17)){
var _19=_15[_b];
if(!_19){
_19=_a++;
_15[_b]=_19;
}
if(!_9[_19]){
_9[_19]={};
}
var h=_9[_19][_18];
if(h){
_8.disconnect(h);
}else{
try{
delete _15[_18];
}
catch(e){
}
}
if(_17){
_9[_19][_18]=_8.connect(_15,_18,_17);
}else{
_15[_18]=null;
}
return _15;
}
_15[_18]=_17;
return _15;
};
});


;define("dojo/dom-class",["./_base/lang","./_base/array","./dom"],function(_1,_2,_3){
var _4="className";
var _5,_6=/\s+/,a1=[""];
function _7(s){
if(typeof s=="string"||s instanceof String){
if(s&&!_6.test(s)){
a1[0]=s;
return a1;
}
var a=s.split(_6);
if(a.length&&!a[0]){
a.shift();
}
if(a.length&&!a[a.length-1]){
a.pop();
}
return a;
}
if(!s){
return [];
}
return _2.filter(s,function(x){
return x;
});
};
var _8={};
_5={contains:function containsClass(_9,_a){
return ((" "+_3.byId(_9)[_4]+" ").indexOf(" "+_a+" ")>=0);
},add:function addClass(_b,_c){
_b=_3.byId(_b);
_c=_7(_c);
var _d=_b[_4],_e;
_d=_d?" "+_d+" ":" ";
_e=_d.length;
for(var i=0,_f=_c.length,c;i<_f;++i){
c=_c[i];
if(c&&_d.indexOf(" "+c+" ")<0){
_d+=c+" ";
}
}
if(_e<_d.length){
_b[_4]=_d.substr(1,_d.length-2);
}
},remove:function removeClass(_10,_11){
_10=_3.byId(_10);
var cls;
if(_11!==undefined){
_11=_7(_11);
cls=" "+_10[_4]+" ";
for(var i=0,len=_11.length;i<len;++i){
cls=cls.replace(" "+_11[i]+" "," ");
}
cls=_1.trim(cls);
}else{
cls="";
}
if(_10[_4]!=cls){
_10[_4]=cls;
}
},replace:function replaceClass(_12,_13,_14){
_12=_3.byId(_12);
_8[_4]=_12[_4];
_5.remove(_8,_14);
_5.add(_8,_13);
if(_12[_4]!==_8[_4]){
_12[_4]=_8[_4];
}
},toggle:function toggleClass(_15,_16,_17){
_15=_3.byId(_15);
if(_17===undefined){
_16=_7(_16);
for(var i=0,len=_16.length,c;i<len;++i){
c=_16[i];
_5[_5.contains(_15,c)?"remove":"add"](_15,c);
}
}else{
_5[_17?"add":"remove"](_15,_16);
}
return _17;
}};
return _5;
});


;define("dojo/_base/html",["./kernel","../dom","../dom-style","../dom-attr","../dom-prop","../dom-class","../dom-construct","../dom-geometry"],function(_1,_2,_3,_4,_5,_6,_7,_8){
_1.byId=_2.byId;
_1.isDescendant=_2.isDescendant;
_1.setSelectable=_2.setSelectable;
_1.getAttr=_4.get;
_1.setAttr=_4.set;
_1.hasAttr=_4.has;
_1.removeAttr=_4.remove;
_1.getNodeProp=_4.getNodeProp;
_1.attr=function(_9,_a,_b){
if(arguments.length==2){
return _4[typeof _a=="string"?"get":"set"](_9,_a);
}
return _4.set(_9,_a,_b);
};
_1.hasClass=_6.contains;
_1.addClass=_6.add;
_1.removeClass=_6.remove;
_1.toggleClass=_6.toggle;
_1.replaceClass=_6.replace;
_1._toDom=_1.toDom=_7.toDom;
_1.place=_7.place;
_1.create=_7.create;
_1.empty=function(_c){
_7.empty(_c);
};
_1._destroyElement=_1.destroy=function(_d){
_7.destroy(_d);
};
_1._getPadExtents=_1.getPadExtents=_8.getPadExtents;
_1._getBorderExtents=_1.getBorderExtents=_8.getBorderExtents;
_1._getPadBorderExtents=_1.getPadBorderExtents=_8.getPadBorderExtents;
_1._getMarginExtents=_1.getMarginExtents=_8.getMarginExtents;
_1._getMarginSize=_1.getMarginSize=_8.getMarginSize;
_1._getMarginBox=_1.getMarginBox=_8.getMarginBox;
_1.setMarginBox=_8.setMarginBox;
_1._getContentBox=_1.getContentBox=_8.getContentBox;
_1.setContentSize=_8.setContentSize;
_1._isBodyLtr=_1.isBodyLtr=_8.isBodyLtr;
_1._docScroll=_1.docScroll=_8.docScroll;
_1._getIeDocumentElementOffset=_1.getIeDocumentElementOffset=_8.getIeDocumentElementOffset;
_1._fixIeBiDiScrollLeft=_1.fixIeBiDiScrollLeft=_8.fixIeBiDiScrollLeft;
_1.position=_8.position;
_1.marginBox=function marginBox(_e,_f){
return _f?_8.setMarginBox(_e,_f):_8.getMarginBox(_e);
};
_1.contentBox=function contentBox(_10,box){
return box?_8.setContentSize(_10,box):_8.getContentBox(_10);
};
_1.coords=function(_11,_12){
_1.deprecated("dojo.coords()","Use dojo.position() or dojo.marginBox().");
_11=_2.byId(_11);
var s=_3.getComputedStyle(_11),mb=_8.getMarginBox(_11,s);
var abs=_8.position(_11,_12);
mb.x=abs.x;
mb.y=abs.y;
return mb;
};
_1.getProp=_5.get;
_1.setProp=_5.set;
_1.prop=function(_13,_14,_15){
if(arguments.length==2){
return _5[typeof _14=="string"?"get":"set"](_13,_14);
}
return _5.set(_13,_14,_15);
};
_1.getStyle=_3.get;
_1.setStyle=_3.set;
_1.getComputedStyle=_3.getComputedStyle;
_1.__toPixelValue=_1.toPixelValue=_3.toPixelValue;
_1.style=function(_16,_17,_18){
switch(arguments.length){
case 1:
return _3.get(_16);
case 2:
return _3[typeof _17=="string"?"get":"set"](_16,_17);
}
return _3.set(_16,_17,_18);
};
return _1;
});


;define("dojo/_base/unload",["./kernel","./lang","../on"],function(_1,_2,on){
var _3=window;
var _4={addOnWindowUnload:function(_5,_6){
if(!_1.windowUnloaded){
on(_3,"unload",(_1.windowUnloaded=function(){
}));
}
on(_3,"unload",_2.hitch(_5,_6));
},addOnUnload:function(_7,_8){
on(_3,"beforeunload",_2.hitch(_7,_8));
}};
_1.addOnWindowUnload=_4.addOnWindowUnload;
_1.addOnUnload=_4.addOnUnload;
return _4;
});


;define("dojo/_firebug/firebug",["../_base/kernel","require","../_base/html","../sniff","../_base/array","../_base/lang","../_base/event","../_base/unload"],function(_1,_2,_3,_4){
var _5=(/Trident/.test(window.navigator.userAgent));
if(_5){
var _6=["log","info","debug","warn","error"];
for(var i=0;i<_6.length;i++){
var m=_6[i];
if(!console[m]||console[m]._fake){
continue;
}
var n="_"+_6[i];
console[n]=console[m];
console[m]=(function(){
var _7=n;
return function(){
console[_7](Array.prototype.join.call(arguments," "));
};
})();
}
try{
console.clear();
}
catch(e){
}
}
if(_4("ff")||_4("chrome")||_4("safari")||_5||window.firebug||(typeof console!="undefined"&&console.firebug)||_1.config.useCustomLogger||_4("air")){
return;
}
try{
if(window!=window.parent){
if(window.parent["console"]){
window.console=window.parent.console;
}
return;
}
}
catch(e){
}
var _8=document;
var _9=window;
var _a=0;
var _b=null;
var _c=null;
var _d=null;
var _e=null;
var _f=null;
var _10=null;
var _11=false;
var _12=[];
var _13=[];
var _14={};
var _15={};
var _16=null;
var _17;
var _18;
var _19=false;
var _1a=null;
var _1b=document.createElement("div");
var _1c;
var _1d;
window.console={_connects:[],log:function(){
_1e(arguments,"");
},debug:function(){
_1e(arguments,"debug");
},info:function(){
_1e(arguments,"info");
},warn:function(){
_1e(arguments,"warning");
},error:function(){
_1e(arguments,"error");
},assert:function(_1f,_20){
if(!_1f){
var _21=[];
for(var i=1;i<arguments.length;++i){
_21.push(arguments[i]);
}
_1e(_21.length?_21:["Assertion Failure"],"error");
throw _20?_20:"Assertion Failure";
}
},dir:function(obj){
var str=_22(obj);
str=str.replace(/\n/g,"<br />");
str=str.replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;");
_23([str],"dir");
},dirxml:function(_24){
var _25=[];
_26(_24,_25);
_23(_25,"dirxml");
},group:function(){
_23(arguments,"group",_27);
},groupEnd:function(){
_23(arguments,"",_28);
},time:function(_29){
_14[_29]=new Date().getTime();
},timeEnd:function(_2a){
if(_2a in _14){
var _2b=(new Date()).getTime()-_14[_2a];
_1e([_2a+":",_2b+"ms"]);
delete _14[_2a];
}
},count:function(_2c){
if(!_15[_2c]){
_15[_2c]=0;
}
_15[_2c]++;
_1e([_2c+": "+_15[_2c]]);
},trace:function(_2d){
var _2e=_2d||3;
var f=console.trace.caller;
console.log(">>> console.trace(stack)");
for(var i=0;i<_2e;i++){
var _2f=f.toString();
var _30=[];
for(var a=0;a<f.arguments.length;a++){
_30.push(f.arguments[a]);
}
if(f.arguments.length){
console.dir({"function":_2f,"arguments":_30});
}else{
console.dir({"function":_2f});
}
f=f.caller;
}
},profile:function(){
this.warn(["profile() not supported."]);
},profileEnd:function(){
},clear:function(){
if(_c){
while(_c.childNodes.length){
_1.destroy(_c.firstChild);
}
}
_1.forEach(this._connects,_1.disconnect);
},open:function(){
_31(true);
},close:function(){
if(_11){
_31();
}
},_restoreBorder:function(){
if(_1c){
_1c.style.border=_1d;
}
},openDomInspector:function(){
_19=true;
_c.style.display="none";
_16.style.display="block";
_d.style.display="none";
document.body.style.cursor="pointer";
_17=_1.connect(document,"mousemove",function(evt){
if(!_19){
return;
}
if(!_1a){
_1a=setTimeout(function(){
_1a=null;
},50);
}else{
return;
}
var _32=evt.target;
if(_32&&(_1c!==_32)){
var _33=true;
console._restoreBorder();
var _34=[];
_26(_32,_34);
_16.innerHTML=_34.join("");
_1c=_32;
_1d=_1c.style.border;
_1c.style.border="#0000FF 1px solid";
}
});
setTimeout(function(){
_18=_1.connect(document,"click",function(evt){
document.body.style.cursor="";
_19=!_19;
_1.disconnect(_18);
});
},30);
},_closeDomInspector:function(){
document.body.style.cursor="";
_1.disconnect(_17);
_1.disconnect(_18);
_19=false;
console._restoreBorder();
},openConsole:function(){
_c.style.display="block";
_16.style.display="none";
_d.style.display="none";
console._closeDomInspector();
},openObjectInspector:function(){
_c.style.display="none";
_16.style.display="none";
_d.style.display="block";
console._closeDomInspector();
},recss:function(){
var i,a,s;
a=document.getElementsByTagName("link");
for(i=0;i<a.length;i++){
s=a[i];
if(s.rel.toLowerCase().indexOf("stylesheet")>=0&&s.href){
var h=s.href.replace(/(&|%5C?)forceReload=\d+/,"");
s.href=h+(h.indexOf("?")>=0?"&":"?")+"forceReload="+new Date().valueOf();
}
}
}};
function _31(_35){
_11=_35||!_11;
if(_b){
_b.style.display=_11?"block":"none";
}
};
function _36(){
_31(true);
if(_f){
_f.focus();
}
};
function _37(x,y,w,h){
var win=window.open("","_firebug","status=0,menubar=0,resizable=1,top="+y+",left="+x+",width="+w+",height="+h+",scrollbars=1,addressbar=0");
if(!win){
var msg="Firebug Lite could not open a pop-up window, most likely because of a blocker.\n"+"Either enable pop-ups for this domain, or change the djConfig to popup=false.";
alert(msg);
}
_38(win);
var _39=win.document;
var _3a="<html style=\"height:100%;\"><head><title>Firebug Lite</title></head>\n"+"<body bgColor=\"#ccc\" style=\"height:97%;\" onresize=\"opener.onFirebugResize()\">\n"+"<div id=\"fb\"></div>"+"</body></html>";
_39.write(_3a);
_39.close();
return win;
};
function _38(wn){
var d=new Date();
d.setTime(d.getTime()+(60*24*60*60*1000));
d=d.toUTCString();
var dc=wn.document,_3b;
if(wn.innerWidth){
_3b=function(){
return {w:wn.innerWidth,h:wn.innerHeight};
};
}else{
if(dc.documentElement&&dc.documentElement.clientWidth){
_3b=function(){
return {w:dc.documentElement.clientWidth,h:dc.documentElement.clientHeight};
};
}else{
if(dc.body){
_3b=function(){
return {w:dc.body.clientWidth,h:dc.body.clientHeight};
};
}
}
}
window.onFirebugResize=function(){
_49(_3b().h);
clearInterval(wn._firebugWin_resize);
wn._firebugWin_resize=setTimeout(function(){
var x=wn.screenLeft,y=wn.screenTop,w=wn.outerWidth||wn.document.body.offsetWidth,h=wn.outerHeight||wn.document.body.offsetHeight;
document.cookie="_firebugPosition="+[x,y,w,h].join(",")+"; expires="+d+"; path=/";
},5000);
};
};
function _3c(){
if(_b){
return;
}
_31(true);
if(_1.config.popup){
var _3d="100%";
var _3e=document.cookie.match(/(?:^|; )_firebugPosition=([^;]*)/);
var p=_3e?_3e[1].split(","):[2,2,320,480];
_9=_37(p[0],p[1],p[2],p[3]);
_8=_9.document;
_1.config.debugContainerId="fb";
_9.console=window.console;
_9.dojo=window.dojo;
}else{
_8=document;
_3d=(_1.config.debugHeight||300)+"px";
}
var _3f=_8.createElement("link");
_3f.href=_2.toUrl("./firebug.css");
_3f.rel="stylesheet";
_3f.type="text/css";
var _40=_8.getElementsByTagName("head");
if(_40){
_40=_40[0];
}
if(!_40){
_40=_8.getElementsByTagName("html")[0];
}
if(_4("ie")){
window.setTimeout(function(){
_40.appendChild(_3f);
},0);
}else{
_40.appendChild(_3f);
}
if(_1.config.debugContainerId){
_b=_8.getElementById(_1.config.debugContainerId);
}
if(!_b){
_b=_8.createElement("div");
_8.body.appendChild(_b);
}
_b.className+=" firebug";
_b.id="firebug";
_b.style.height=_3d;
_b.style.display=(_11?"block":"none");
var _41=function(_42,_43,_44,_45){
return "<li class=\""+_45+"\"><a href=\"javascript:void(0);\" onclick=\"console."+_44+"(); return false;\" title=\""+_43+"\">"+_42+"</a></li>";
};
_b.innerHTML="<div id=\"firebugToolbar\">"+"  <ul id=\"fireBugTabs\" class=\"tabs\">"+_41("Clear","Remove All Console Logs","clear","")+_41("ReCSS","Refresh CSS without reloading page","recss","")+_41("Console","Show Console Logs","openConsole","gap")+_41("DOM","Show DOM Inspector","openDomInspector","")+_41("Object","Show Object Inspector","openObjectInspector","")+((_1.config.popup)?"":_41("Close","Close the console","close","gap"))+"\t</ul>"+"</div>"+"<input type=\"text\" id=\"firebugCommandLine\" />"+"<div id=\"firebugLog\"></div>"+"<div id=\"objectLog\" style=\"display:none;\">Click on an object in the Log display</div>"+"<div id=\"domInspect\" style=\"display:none;\">Hover over HTML elements in the main page. Click to hold selection.</div>";
_10=_8.getElementById("firebugToolbar");
_f=_8.getElementById("firebugCommandLine");
_46(_f,"keydown",_47);
_46(_8,_4("ie")||_4("safari")?"keydown":"keypress",_48);
_c=_8.getElementById("firebugLog");
_d=_8.getElementById("objectLog");
_16=_8.getElementById("domInspect");
_e=_8.getElementById("fireBugTabs");
_49();
_4a();
};
_1.addOnLoad(_3c);
function _4b(){
_8=null;
if(_9.console){
_9.console.clear();
}
_9=null;
_b=null;
_c=null;
_d=null;
_16=null;
_f=null;
_12=[];
_13=[];
_14={};
};
function _4c(){
var _4d=_f.value;
_f.value="";
_23([">  ",_4d],"command");
var _4e;
try{
_4e=eval(_4d);
}
catch(e){
console.debug(e);
}
console.log(_4e);
};
function _49(h){
var _4f=25;
var _50=h?h-(_4f+_f.offsetHeight+25+(h*0.01))+"px":(_b.offsetHeight-_4f-_f.offsetHeight)+"px";
_c.style.top=_4f+"px";
_c.style.height=_50;
_d.style.height=_50;
_d.style.top=_4f+"px";
_16.style.height=_50;
_16.style.top=_4f+"px";
_f.style.bottom=0;
_1.addOnWindowUnload(_4b);
};
function _23(_51,_52,_53){
if(_c){
_54(_51,_52,_53);
}else{
_12.push([_51,_52,_53]);
}
};
function _4a(){
var _55=_12;
_12=[];
for(var i=0;i<_55.length;++i){
_54(_55[i][0],_55[i][1],_55[i][2]);
}
};
function _54(_56,_57,_58){
var _59=_c.scrollTop+_c.offsetHeight>=_c.scrollHeight;
_58=_58||_5a;
_58(_56,_57);
if(_59){
_c.scrollTop=_c.scrollHeight-_c.offsetHeight;
}
};
function _5b(row){
var _5c=_13.length?_13[_13.length-1]:_c;
_5c.appendChild(row);
};
function _5a(_5d,_5e){
var row=_c.ownerDocument.createElement("div");
row.className="logRow"+(_5e?" logRow-"+_5e:"");
row.innerHTML=_5d.join("");
_5b(row);
};
function _27(_5f,_60){
_1e(_5f,_60);
var _61=_c.ownerDocument.createElement("div");
_61.className="logGroupBox";
_5b(_61);
_13.push(_61);
};
function _28(){
_13.pop();
};
function _1e(_62,_63){
var _64=[];
var _65=_62[0];
var _66=0;
if(typeof (_65)!="string"){
_65="";
_66=-1;
}
var _67=_68(_65);
for(var i=0;i<_67.length;++i){
var _69=_67[i];
if(_69&&typeof _69=="object"){
_69.appender(_62[++_66],_64);
}else{
_6a(_69,_64);
}
}
var ids=[];
var obs=[];
for(i=_66+1;i<_62.length;++i){
_6a(" ",_64);
var _6b=_62[i];
if(_6b===undefined||_6b===null){
_6c(_6b,_64);
}else{
if(typeof (_6b)=="string"){
_6a(_6b,_64);
}else{
if(_6b instanceof Date){
_6a(_6b.toString(),_64);
}else{
if(_6b.nodeType==9){
_6a("[ XmlDoc ]",_64);
}else{
var id="_a"+_a++;
ids.push(id);
obs.push(_6b);
var str="<a id=\""+id+"\" href=\"javascript:void(0);\">"+_6d(_6b)+"</a>";
_6e(str,_64);
}
}
}
}
}
_23(_64,_63);
for(i=0;i<ids.length;i++){
var btn=_8.getElementById(ids[i]);
if(!btn){
continue;
}
btn.obj=obs[i];
_9.console._connects.push(_1.connect(btn,"onclick",function(){
console.openObjectInspector();
try{
_22(this.obj);
}
catch(e){
this.obj=e;
}
_d.innerHTML="<pre>"+_22(this.obj)+"</pre>";
}));
}
};
function _68(_6f){
var _70=[];
var reg=/((^%|[^\\]%)(\d+)?(\.)([a-zA-Z]))|((^%|[^\\]%)([a-zA-Z]))/;
var _71={s:_6a,d:_72,i:_72,f:_73};
for(var m=reg.exec(_6f);m;m=reg.exec(_6f)){
var _74=m[8]?m[8]:m[5];
var _75=_74 in _71?_71[_74]:_76;
var _77=m[3]?parseInt(m[3]):(m[4]=="."?-1:0);
_70.push(_6f.substr(0,m[0][0]=="%"?m.index:m.index+1));
_70.push({appender:_75,precision:_77});
_6f=_6f.substr(m.index+m[0].length);
}
_70.push(_6f);
return _70;
};
function _78(_79){
function _7a(ch){
switch(ch){
case "<":
return "&lt;";
case ">":
return "&gt;";
case "&":
return "&amp;";
case "'":
return "&#39;";
case "\"":
return "&quot;";
}
return "?";
};
return String(_79).replace(/[<>&"']/g,_7a);
};
function _7b(_7c){
try{
return _7c+"";
}
catch(e){
return null;
}
};
function _6e(_7d,_7e){
_7e.push(_7b(_7d));
};
function _6a(_7f,_80){
_80.push(_78(_7b(_7f)));
};
function _6c(_81,_82){
_82.push("<span class=\"objectBox-null\">",_78(_7b(_81)),"</span>");
};
function _83(_84,_85){
_85.push("<span class=\"objectBox-string\">&quot;",_78(_7b(_84)),"&quot;</span>");
};
function _72(_86,_87){
_87.push("<span class=\"objectBox-number\">",_78(_7b(_86)),"</span>");
};
function _73(_88,_89){
_89.push("<span class=\"objectBox-number\">",_78(_7b(_88)),"</span>");
};
function _8a(_8b,_8c){
_8c.push("<span class=\"objectBox-function\">",_6d(_8b),"</span>");
};
function _76(_8d,_8e){
try{
if(_8d===undefined){
_6c("undefined",_8e);
}else{
if(_8d===null){
_6c("null",_8e);
}else{
if(typeof _8d=="string"){
_83(_8d,_8e);
}else{
if(typeof _8d=="number"){
_72(_8d,_8e);
}else{
if(typeof _8d=="function"){
_8a(_8d,_8e);
}else{
if(_8d.nodeType==1){
_8f(_8d,_8e);
}else{
if(typeof _8d=="object"){
_90(_8d,_8e);
}else{
_6a(_8d,_8e);
}
}
}
}
}
}
}
}
catch(e){
}
};
function _90(_91,_92){
var _93=_7b(_91);
var _94=/\[object (.*?)\]/;
var m=_94.exec(_93);
_92.push("<span class=\"objectBox-object\">",m?m[1]:_93,"</span>");
};
function _8f(_95,_96){
_96.push("<span class=\"objectBox-selector\">");
_96.push("<span class=\"selectorTag\">",_78(_95.nodeName.toLowerCase()),"</span>");
if(_95.id){
_96.push("<span class=\"selectorId\">#",_78(_95.id),"</span>");
}
if(_95.className){
_96.push("<span class=\"selectorClass\">.",_78(_95.className),"</span>");
}
_96.push("</span>");
};
function _26(_97,_98){
if(_97.nodeType==1){
_98.push("<div class=\"objectBox-element\">","&lt;<span class=\"nodeTag\">",_97.nodeName.toLowerCase(),"</span>");
for(var i=0;i<_97.attributes.length;++i){
var _99=_97.attributes[i];
if(!_99.specified){
continue;
}
_98.push("&nbsp;<span class=\"nodeName\">",_99.nodeName.toLowerCase(),"</span>=&quot;<span class=\"nodeValue\">",_78(_99.nodeValue),"</span>&quot;");
}
if(_97.firstChild){
_98.push("&gt;</div><div class=\"nodeChildren\">");
for(var _9a=_97.firstChild;_9a;_9a=_9a.nextSibling){
_26(_9a,_98);
}
_98.push("</div><div class=\"objectBox-element\">&lt;/<span class=\"nodeTag\">",_97.nodeName.toLowerCase(),"&gt;</span></div>");
}else{
_98.push("/&gt;</div>");
}
}else{
if(_97.nodeType==3){
_98.push("<div class=\"nodeText\">",_78(_97.nodeValue),"</div>");
}
}
};
function _46(_9b,_9c,_9d){
if(document.all){
_9b.attachEvent("on"+_9c,_9d);
}else{
_9b.addEventListener(_9c,_9d,false);
}
};
function _9e(_9f,_a0,_a1){
if(document.all){
_9f.detachEvent("on"+_a0,_a1);
}else{
_9f.removeEventListener(_a0,_a1,false);
}
};
function _a2(_a3){
if(document.all){
_a3.cancelBubble=true;
}else{
_a3.stopPropagation();
}
};
function _a4(msg,_a5,_a6){
var _a7=_a5.lastIndexOf("/");
var _a8=_a7==-1?_a5:_a5.substr(_a7+1);
var _a9=["<span class=\"errorMessage\">",msg,"</span>","<div class=\"objectBox-sourceLink\">",_a8," (line ",_a6,")</div>"];
_23(_a9,"error");
};
var _aa=new Date().getTime();
function _48(_ab){
var _ac=(new Date()).getTime();
if(_ac>_aa+200){
_ab=_1.fixEvent(_ab);
var _ad=_1.keys;
var ekc=_ab.keyCode;
_aa=_ac;
if(ekc==_ad.F12){
_31();
}else{
if((ekc==_ad.NUMPAD_ENTER||ekc==76)&&_ab.shiftKey&&(_ab.metaKey||_ab.ctrlKey)){
_36();
}else{
return;
}
}
_a2(_ab);
}
};
function _47(e){
var dk=_1.keys;
if(e.keyCode==13&&_f.value){
_ae(_f.value);
_4c();
}else{
if(e.keyCode==27){
_f.value="";
}else{
if(e.keyCode==dk.UP_ARROW||e.charCode==dk.UP_ARROW){
_af("older");
}else{
if(e.keyCode==dk.DOWN_ARROW||e.charCode==dk.DOWN_ARROW){
_af("newer");
}else{
if(e.keyCode==dk.HOME||e.charCode==dk.HOME){
_b0=1;
_af("older");
}else{
if(e.keyCode==dk.END||e.charCode==dk.END){
_b0=999999;
_af("newer");
}
}
}
}
}
}
};
var _b0=-1;
var _b1=null;
function _ae(_b2){
var _b3=_b4("firebug_history");
_b3=(_b3)?_1.fromJson(_b3):[];
var pos=_1.indexOf(_b3,_b2);
if(pos!=-1){
_b3.splice(pos,1);
}
_b3.push(_b2);
_b4("firebug_history",_1.toJson(_b3),30);
while(_b3.length&&!_b4("firebug_history")){
_b3.shift();
_b4("firebug_history",_1.toJson(_b3),30);
}
_b1=null;
_b0=-1;
};
function _af(_b5){
var _b6=_b4("firebug_history");
_b6=(_b6)?_1.fromJson(_b6):[];
if(!_b6.length){
return;
}
if(_b1===null){
_b1=_f.value;
}
if(_b0==-1){
_b0=_b6.length;
}
if(_b5=="older"){
--_b0;
if(_b0<0){
_b0=0;
}
}else{
if(_b5=="newer"){
++_b0;
if(_b0>_b6.length){
_b0=_b6.length;
}
}
}
if(_b0==_b6.length){
_f.value=_b1;
_b1=null;
}else{
_f.value=_b6[_b0];
}
};
function _b4(_b7,_b8){
var c=document.cookie;
if(arguments.length==1){
var _b9=c.match(new RegExp("(?:^|; )"+_b7+"=([^;]*)"));
return _b9?decodeURIComponent(_b9[1]):undefined;
}else{
var d=new Date();
d.setMonth(d.getMonth()+1);
document.cookie=_b7+"="+encodeURIComponent(_b8)+((d.toUtcString)?"; expires="+d.toUTCString():"");
}
};
function _ba(it){
return it&&it instanceof Array||typeof it=="array";
};
function _bb(o){
var cnt=0;
for(var nm in o){
cnt++;
}
return cnt;
};
function _22(o,i,txt,_bc){
var ind=" \t";
txt=txt||"";
i=i||ind;
_bc=_bc||[];
var _bd;
if(o&&o.nodeType==1){
var _be=[];
_26(o,_be);
return _be.join("");
}
var br=",\n",cnt=0,_bf=_bb(o);
if(o instanceof Date){
return i+o.toString()+br;
}
looking:
for(var nm in o){
cnt++;
if(cnt==_bf){
br="\n";
}
if(o[nm]===window||o[nm]===document){
}else{
if(o[nm]===null){
txt+=i+nm+" : NULL"+br;
}else{
if(o[nm]&&o[nm].nodeType){
if(o[nm].nodeType==1){
}else{
if(o[nm].nodeType==3){
txt+=i+nm+" : [ TextNode "+o[nm].data+" ]"+br;
}
}
}else{
if(typeof o[nm]=="object"&&(o[nm] instanceof String||o[nm] instanceof Number||o[nm] instanceof Boolean)){
txt+=i+nm+" : "+o[nm]+","+br;
}else{
if(o[nm] instanceof Date){
txt+=i+nm+" : "+o[nm].toString()+br;
}else{
if(typeof (o[nm])=="object"&&o[nm]){
for(var j=0,_c0;_c0=_bc[j];j++){
if(o[nm]===_c0){
txt+=i+nm+" : RECURSION"+br;
continue looking;
}
}
_bc.push(o[nm]);
_bd=(_ba(o[nm]))?["[","]"]:["{","}"];
txt+=i+nm+" : "+_bd[0]+"\n";
txt+=_22(o[nm],i+ind,"",_bc);
txt+=i+_bd[1]+br;
}else{
if(typeof o[nm]=="undefined"){
txt+=i+nm+" : undefined"+br;
}else{
if(nm=="toString"&&typeof o[nm]=="function"){
var _c1=o[nm]();
if(typeof _c1=="string"&&_c1.match(/function ?(.*?)\(/)){
_c1=_78(_6d(o[nm]));
}
txt+=i+nm+" : "+_c1+br;
}else{
txt+=i+nm+" : "+_78(_6d(o[nm]))+br;
}
}
}
}
}
}
}
}
}
return txt;
};
function _6d(obj){
var _c2=(obj instanceof Error);
if(obj.nodeType==1){
return _78("< "+obj.tagName.toLowerCase()+" id=\""+obj.id+"\" />");
}
if(obj.nodeType==3){
return _78("[TextNode: \""+obj.nodeValue+"\"]");
}
var nm=(obj&&(obj.id||obj.name||obj.ObjectID||obj.widgetId));
if(!_c2&&nm){
return "{"+nm+"}";
}
var _c3=2;
var _c4=4;
var cnt=0;
if(_c2){
nm="[ Error: "+(obj.message||obj.description||obj)+" ]";
}else{
if(_ba(obj)){
nm="["+obj.slice(0,_c4).join(",");
if(obj.length>_c4){
nm+=" ... ("+obj.length+" items)";
}
nm+="]";
}else{
if(typeof obj=="function"){
nm=obj+"";
var reg=/function\s*([^\(]*)(\([^\)]*\))[^\{]*\{/;
var m=reg.exec(nm);
if(m){
if(!m[1]){
m[1]="function";
}
nm=m[1]+m[2];
}else{
nm="function()";
}
}else{
if(typeof obj!="object"||typeof obj=="string"){
nm=obj+"";
}else{
nm="{";
for(var i in obj){
cnt++;
if(cnt>_c3){
break;
}
nm+=i+":"+_78(obj[i])+"  ";
}
nm+="}";
}
}
}
}
return nm;
};
_46(document,_4("ie")||_4("safari")?"keydown":"keypress",_48);
if((document.documentElement.getAttribute("debug")=="true")||(_1.config.isDebug)){
_31(true);
}
_1.addOnWindowUnload(function(){
_9e(document,_4("ie")||_4("safari")?"keydown":"keypress",_48);
window.onFirebugResize=null;
window.console=null;
});
});


;define("dojo/selector/acme",["../dom","../sniff","../_base/array","../_base/lang","../_base/window"],function(_1,_2,_3,_4,_5){
var _6=_4.trim;
var _7=_3.forEach;
var _8=function(){
return _5.doc;
};
var _9=(_8().compatMode)=="BackCompat";
var _a=">~+";
var _b=false;
var _c=function(){
return true;
};
var _d=function(_e){
if(_a.indexOf(_e.slice(-1))>=0){
_e+=" * ";
}else{
_e+=" ";
}
var ts=function(s,e){
return _6(_e.slice(s,e));
};
var _f=[];
var _10=-1,_11=-1,_12=-1,_13=-1,_14=-1,_15=-1,_16=-1,_17,lc="",cc="",_18;
var x=0,ql=_e.length,_19=null,_1a=null;
var _1b=function(){
if(_16>=0){
var tv=(_16==x)?null:ts(_16,x);
_19[(_a.indexOf(tv)<0)?"tag":"oper"]=tv;
_16=-1;
}
};
var _1c=function(){
if(_15>=0){
_19.id=ts(_15,x).replace(/\\/g,"");
_15=-1;
}
};
var _1d=function(){
if(_14>=0){
_19.classes.push(ts(_14+1,x).replace(/\\/g,""));
_14=-1;
}
};
var _1e=function(){
_1c();
_1b();
_1d();
};
var _1f=function(){
_1e();
if(_13>=0){
_19.pseudos.push({name:ts(_13+1,x)});
}
_19.loops=(_19.pseudos.length||_19.attrs.length||_19.classes.length);
_19.oquery=_19.query=ts(_18,x);
_19.otag=_19.tag=(_19["oper"])?null:(_19.tag||"*");
if(_19.tag){
_19.tag=_19.tag.toUpperCase();
}
if(_f.length&&(_f[_f.length-1].oper)){
_19.infixOper=_f.pop();
_19.query=_19.infixOper.query+" "+_19.query;
}
_f.push(_19);
_19=null;
};
for(;lc=cc,cc=_e.charAt(x),x<ql;x++){
if(lc=="\\"){
continue;
}
if(!_19){
_18=x;
_19={query:null,pseudos:[],attrs:[],classes:[],tag:null,oper:null,id:null,getTag:function(){
return _b?this.otag:this.tag;
}};
_16=x;
}
if(_17){
if(cc==_17){
_17=null;
}
continue;
}else{
if(cc=="'"||cc=="\""){
_17=cc;
continue;
}
}
if(_10>=0){
if(cc=="]"){
if(!_1a.attr){
_1a.attr=ts(_10+1,x);
}else{
_1a.matchFor=ts((_12||_10+1),x);
}
var cmf=_1a.matchFor;
if(cmf){
if((cmf.charAt(0)=="\"")||(cmf.charAt(0)=="'")){
_1a.matchFor=cmf.slice(1,-1);
}
}
if(_1a.matchFor){
_1a.matchFor=_1a.matchFor.replace(/\\/g,"");
}
_19.attrs.push(_1a);
_1a=null;
_10=_12=-1;
}else{
if(cc=="="){
var _20=("|~^$*".indexOf(lc)>=0)?lc:"";
_1a.type=_20+cc;
_1a.attr=ts(_10+1,x-_20.length);
_12=x+1;
}
}
}else{
if(_11>=0){
if(cc==")"){
if(_13>=0){
_1a.value=ts(_11+1,x);
}
_13=_11=-1;
}
}else{
if(cc=="#"){
_1e();
_15=x+1;
}else{
if(cc=="."){
_1e();
_14=x;
}else{
if(cc==":"){
_1e();
_13=x;
}else{
if(cc=="["){
_1e();
_10=x;
_1a={};
}else{
if(cc=="("){
if(_13>=0){
_1a={name:ts(_13+1,x),value:null};
_19.pseudos.push(_1a);
}
_11=x;
}else{
if((cc==" ")&&(lc!=cc)){
_1f();
}
}
}
}
}
}
}
}
}
return _f;
};
var _21=function(_22,_23){
if(!_22){
return _23;
}
if(!_23){
return _22;
}
return function(){
return _22.apply(window,arguments)&&_23.apply(window,arguments);
};
};
var _24=function(i,arr){
var r=arr||[];
if(i){
r.push(i);
}
return r;
};
var _25=function(n){
return (1==n.nodeType);
};
var _26="";
var _27=function(_28,_29){
if(!_28){
return _26;
}
if(_29=="class"){
return _28.className||_26;
}
if(_29=="for"){
return _28.htmlFor||_26;
}
if(_29=="style"){
return _28.style.cssText||_26;
}
return (_b?_28.getAttribute(_29):_28.getAttribute(_29,2))||_26;
};
var _2a={"*=":function(_2b,_2c){
return function(_2d){
return (_27(_2d,_2b).indexOf(_2c)>=0);
};
},"^=":function(_2e,_2f){
return function(_30){
return (_27(_30,_2e).indexOf(_2f)==0);
};
},"$=":function(_31,_32){
return function(_33){
var ea=" "+_27(_33,_31);
var _34=ea.lastIndexOf(_32);
return _34>-1&&(_34==(ea.length-_32.length));
};
},"~=":function(_35,_36){
var _37=" "+_36+" ";
return function(_38){
var ea=" "+_27(_38,_35)+" ";
return (ea.indexOf(_37)>=0);
};
},"|=":function(_39,_3a){
var _3b=_3a+"-";
return function(_3c){
var ea=_27(_3c,_39);
return ((ea==_3a)||(ea.indexOf(_3b)==0));
};
},"=":function(_3d,_3e){
return function(_3f){
return (_27(_3f,_3d)==_3e);
};
}};
var _40=(typeof _8().firstChild.nextElementSibling=="undefined");
var _41=!_40?"nextElementSibling":"nextSibling";
var _42=!_40?"previousElementSibling":"previousSibling";
var _43=(_40?_25:_c);
var _44=function(_45){
while(_45=_45[_42]){
if(_43(_45)){
return false;
}
}
return true;
};
var _46=function(_47){
while(_47=_47[_41]){
if(_43(_47)){
return false;
}
}
return true;
};
var _48=function(_49){
var _4a=_49.parentNode;
_4a=_4a.nodeType!=7?_4a:_4a.nextSibling;
var i=0,_4b=_4a.children||_4a.childNodes,ci=(_49["_i"]||_49.getAttribute("_i")||-1),cl=(_4a["_l"]||(typeof _4a.getAttribute!=="undefined"?_4a.getAttribute("_l"):-1));
if(!_4b){
return -1;
}
var l=_4b.length;
if(cl==l&&ci>=0&&cl>=0){
return ci;
}
if(_2("ie")&&typeof _4a.setAttribute!=="undefined"){
_4a.setAttribute("_l",l);
}else{
_4a["_l"]=l;
}
ci=-1;
for(var te=_4a["firstElementChild"]||_4a["firstChild"];te;te=te[_41]){
if(_43(te)){
if(_2("ie")){
te.setAttribute("_i",++i);
}else{
te["_i"]=++i;
}
if(_49===te){
ci=i;
}
}
}
return ci;
};
var _4c=function(_4d){
return !((_48(_4d))%2);
};
var _4e=function(_4f){
return ((_48(_4f))%2);
};
var _50={"checked":function(_51,_52){
return function(_53){
return !!("checked" in _53?_53.checked:_53.selected);
};
},"disabled":function(_54,_55){
return function(_56){
return _56.disabled;
};
},"enabled":function(_57,_58){
return function(_59){
return !_59.disabled;
};
},"first-child":function(){
return _44;
},"last-child":function(){
return _46;
},"only-child":function(_5a,_5b){
return function(_5c){
return _44(_5c)&&_46(_5c);
};
},"empty":function(_5d,_5e){
return function(_5f){
var cn=_5f.childNodes;
var cnl=_5f.childNodes.length;
for(var x=cnl-1;x>=0;x--){
var nt=cn[x].nodeType;
if((nt===1)||(nt==3)){
return false;
}
}
return true;
};
},"contains":function(_60,_61){
var cz=_61.charAt(0);
if(cz=="\""||cz=="'"){
_61=_61.slice(1,-1);
}
return function(_62){
return (_62.innerHTML.indexOf(_61)>=0);
};
},"not":function(_63,_64){
var p=_d(_64)[0];
var _65={el:1};
if(p.tag!="*"){
_65.tag=1;
}
if(!p.classes.length){
_65.classes=1;
}
var ntf=_66(p,_65);
return function(_67){
return (!ntf(_67));
};
},"nth-child":function(_68,_69){
var pi=parseInt;
if(_69=="odd"){
return _4e;
}else{
if(_69=="even"){
return _4c;
}
}
if(_69.indexOf("n")!=-1){
var _6a=_69.split("n",2);
var _6b=_6a[0]?((_6a[0]=="-")?-1:pi(_6a[0])):1;
var idx=_6a[1]?pi(_6a[1]):0;
var lb=0,ub=-1;
if(_6b>0){
if(idx<0){
idx=(idx%_6b)&&(_6b+(idx%_6b));
}else{
if(idx>0){
if(idx>=_6b){
lb=idx-idx%_6b;
}
idx=idx%_6b;
}
}
}else{
if(_6b<0){
_6b*=-1;
if(idx>0){
ub=idx;
idx=idx%_6b;
}
}
}
if(_6b>0){
return function(_6c){
var i=_48(_6c);
return (i>=lb)&&(ub<0||i<=ub)&&((i%_6b)==idx);
};
}else{
_69=idx;
}
}
var _6d=pi(_69);
return function(_6e){
return (_48(_6e)==_6d);
};
}};
var _6f=(_2("ie")<9||_2("ie")==9&&_2("quirks"))?function(_70){
var clc=_70.toLowerCase();
if(clc=="class"){
_70="className";
}
return function(_71){
return (_b?_71.getAttribute(_70):_71[_70]||_71[clc]);
};
}:function(_72){
return function(_73){
return (_73&&_73.getAttribute&&_73.hasAttribute(_72));
};
};
var _66=function(_74,_75){
if(!_74){
return _c;
}
_75=_75||{};
var ff=null;
if(!("el" in _75)){
ff=_21(ff,_25);
}
if(!("tag" in _75)){
if(_74.tag!="*"){
ff=_21(ff,function(_76){
return (_76&&((_b?_76.tagName:_76.tagName.toUpperCase())==_74.getTag()));
});
}
}
if(!("classes" in _75)){
_7(_74.classes,function(_77,idx,arr){
var re=new RegExp("(?:^|\\s)"+_77+"(?:\\s|$)");
ff=_21(ff,function(_78){
return re.test(_78.className);
});
ff.count=idx;
});
}
if(!("pseudos" in _75)){
_7(_74.pseudos,function(_79){
var pn=_79.name;
if(_50[pn]){
ff=_21(ff,_50[pn](pn,_79.value));
}
});
}
if(!("attrs" in _75)){
_7(_74.attrs,function(_7a){
var _7b;
var a=_7a.attr;
if(_7a.type&&_2a[_7a.type]){
_7b=_2a[_7a.type](a,_7a.matchFor);
}else{
if(a.length){
_7b=_6f(a);
}
}
if(_7b){
ff=_21(ff,_7b);
}
});
}
if(!("id" in _75)){
if(_74.id){
ff=_21(ff,function(_7c){
return (!!_7c&&(_7c.id==_74.id));
});
}
}
if(!ff){
if(!("default" in _75)){
ff=_c;
}
}
return ff;
};
var _7d=function(_7e){
return function(_7f,ret,bag){
while(_7f=_7f[_41]){
if(_40&&(!_25(_7f))){
continue;
}
if((!bag||_80(_7f,bag))&&_7e(_7f)){
ret.push(_7f);
}
break;
}
return ret;
};
};
var _81=function(_82){
return function(_83,ret,bag){
var te=_83[_41];
while(te){
if(_43(te)){
if(bag&&!_80(te,bag)){
break;
}
if(_82(te)){
ret.push(te);
}
}
te=te[_41];
}
return ret;
};
};
var _84=function(_85){
_85=_85||_c;
return function(_86,ret,bag){
var te,x=0,_87=_86.children||_86.childNodes;
while(te=_87[x++]){
if(_43(te)&&(!bag||_80(te,bag))&&(_85(te,x))){
ret.push(te);
}
}
return ret;
};
};
var _88=function(_89,_8a){
var pn=_89.parentNode;
while(pn){
if(pn==_8a){
break;
}
pn=pn.parentNode;
}
return !!pn;
};
var _8b={};
var _8c=function(_8d){
var _8e=_8b[_8d.query];
if(_8e){
return _8e;
}
var io=_8d.infixOper;
var _8f=(io?io.oper:"");
var _90=_66(_8d,{el:1});
var qt=_8d.tag;
var _91=("*"==qt);
var ecs=_8()["getElementsByClassName"];
if(!_8f){
if(_8d.id){
_90=(!_8d.loops&&_91)?_c:_66(_8d,{el:1,id:1});
_8e=function(_92,arr){
var te=_1.byId(_8d.id,(_92.ownerDocument||_92));
if(!te||!_90(te)){
return;
}
if(9==_92.nodeType){
return _24(te,arr);
}else{
if(_88(te,_92)){
return _24(te,arr);
}
}
};
}else{
if(ecs&&/\{\s*\[native code\]\s*\}/.test(String(ecs))&&_8d.classes.length&&!_9){
_90=_66(_8d,{el:1,classes:1,id:1});
var _93=_8d.classes.join(" ");
_8e=function(_94,arr,bag){
var ret=_24(0,arr),te,x=0;
var _95=_94.getElementsByClassName(_93);
while((te=_95[x++])){
if(_90(te,_94)&&_80(te,bag)){
ret.push(te);
}
}
return ret;
};
}else{
if(!_91&&!_8d.loops){
_8e=function(_96,arr,bag){
var ret=_24(0,arr),te,x=0;
var tag=_8d.getTag(),_97=tag?_96.getElementsByTagName(tag):[];
while((te=_97[x++])){
if(_80(te,bag)){
ret.push(te);
}
}
return ret;
};
}else{
_90=_66(_8d,{el:1,tag:1,id:1});
_8e=function(_98,arr,bag){
var ret=_24(0,arr),te,x=0;
var tag=_8d.getTag(),_99=tag?_98.getElementsByTagName(tag):[];
while((te=_99[x++])){
if(_90(te,_98)&&_80(te,bag)){
ret.push(te);
}
}
return ret;
};
}
}
}
}else{
var _9a={el:1};
if(_91){
_9a.tag=1;
}
_90=_66(_8d,_9a);
if("+"==_8f){
_8e=_7d(_90);
}else{
if("~"==_8f){
_8e=_81(_90);
}else{
if(">"==_8f){
_8e=_84(_90);
}
}
}
}
return _8b[_8d.query]=_8e;
};
var _9b=function(_9c,_9d){
var _9e=_24(_9c),qp,x,te,qpl=_9d.length,bag,ret;
for(var i=0;i<qpl;i++){
ret=[];
qp=_9d[i];
x=_9e.length-1;
if(x>0){
bag={};
ret.nozip=true;
}
var gef=_8c(qp);
for(var j=0;(te=_9e[j]);j++){
gef(te,ret,bag);
}
if(!ret.length){
break;
}
_9e=ret;
}
return ret;
};
var _9f={},_a0={};
var _a1=function(_a2){
var _a3=_d(_6(_a2));
if(_a3.length==1){
var tef=_8c(_a3[0]);
return function(_a4){
var r=tef(_a4,[]);
if(r){
r.nozip=true;
}
return r;
};
}
return function(_a5){
return _9b(_a5,_a3);
};
};
var _a6=_2("ie")?"commentStrip":"nozip";
var qsa="querySelectorAll";
var _a7=!!_8()[qsa];
var _a8=/\\[>~+]|n\+\d|([^ \\])?([>~+])([^ =])?/g;
var _a9=function(_aa,pre,ch,_ab){
return ch?(pre?pre+" ":"")+ch+(_ab?" "+_ab:""):_aa;
};
var _ac=/([^[]*)([^\]]*])?/g;
var _ad=function(_ae,_af,att){
return _af.replace(_a8,_a9)+(att||"");
};
var _b0=function(_b1,_b2){
_b1=_b1.replace(_ac,_ad);
if(_a7){
var _b3=_a0[_b1];
if(_b3&&!_b2){
return _b3;
}
}
var _b4=_9f[_b1];
if(_b4){
return _b4;
}
var qcz=_b1.charAt(0);
var _b5=(-1==_b1.indexOf(" "));
if((_b1.indexOf("#")>=0)&&(_b5)){
_b2=true;
}
var _b6=(_a7&&(!_b2)&&(_a.indexOf(qcz)==-1)&&(!_2("ie")||(_b1.indexOf(":")==-1))&&(!(_9&&(_b1.indexOf(".")>=0)))&&(_b1.indexOf(":contains")==-1)&&(_b1.indexOf(":checked")==-1)&&(_b1.indexOf("|=")==-1));
if(_b6){
var tq=(_a.indexOf(_b1.charAt(_b1.length-1))>=0)?(_b1+" *"):_b1;
return _a0[_b1]=function(_b7){
try{
if(!((9==_b7.nodeType)||_b5)){
throw "";
}
var r=_b7[qsa](tq);
r[_a6]=true;
return r;
}
catch(e){
return _b0(_b1,true)(_b7);
}
};
}else{
var _b8=_b1.match(/([^\s,](?:"(?:\\.|[^"])+"|'(?:\\.|[^'])+'|[^,])*)/g);
return _9f[_b1]=((_b8.length<2)?_a1(_b1):function(_b9){
var _ba=0,ret=[],tp;
while((tp=_b8[_ba++])){
ret=ret.concat(_a1(tp)(_b9));
}
return ret;
});
}
};
var _bb=0;
var _bc=_2("ie")?function(_bd){
if(_b){
return (_bd.getAttribute("_uid")||_bd.setAttribute("_uid",++_bb)||_bb);
}else{
return _bd.uniqueID;
}
}:function(_be){
return (_be._uid||(_be._uid=++_bb));
};
var _80=function(_bf,bag){
if(!bag){
return 1;
}
var id=_bc(_bf);
if(!bag[id]){
return bag[id]=1;
}
return 0;
};
var _c0="_zipIdx";
var _c1=function(arr){
if(arr&&arr.nozip){
return arr;
}
if(!arr||!arr.length){
return [];
}
if(arr.length<2){
return [arr[0]];
}
var ret=[];
_bb++;
var x,te;
if(_2("ie")&&_b){
var _c2=_bb+"";
for(x=0;x<arr.length;x++){
if((te=arr[x])&&te.getAttribute(_c0)!=_c2){
ret.push(te);
te.setAttribute(_c0,_c2);
}
}
}else{
if(_2("ie")&&arr.commentStrip){
try{
for(x=0;x<arr.length;x++){
if((te=arr[x])&&_25(te)){
ret.push(te);
}
}
}
catch(e){
}
}else{
for(x=0;x<arr.length;x++){
if((te=arr[x])&&te[_c0]!=_bb){
ret.push(te);
te[_c0]=_bb;
}
}
}
}
return ret;
};
var _c3=function(_c4,_c5){
_c5=_c5||_8();
var od=_c5.ownerDocument||_c5;
_b=(od.createElement("div").tagName==="div");
var r=_b0(_c4)(_c5);
if(r&&r.nozip){
return r;
}
return _c1(r);
};
_c3.filter=function(_c6,_c7,_c8){
var _c9=[],_ca=_d(_c7),_cb=(_ca.length==1&&!/[^\w#\.]/.test(_c7))?_66(_ca[0]):function(_cc){
return _3.indexOf(_c3(_c7,_1.byId(_c8)),_cc)!=-1;
};
for(var x=0,te;te=_c6[x];x++){
if(_cb(te)){
_c9.push(te);
}
}
return _c9;
};
return _c3;
});


;define("dojo/query",["./_base/kernel","./has","./dom","./on","./_base/array","./_base/lang","./selector/acme"],function(_1,_2,_3,on,_4,_5,_6){
"use strict";
_2.add("array-extensible",function(){
return _5.delegate([],{length:1}).length==1&&!_2("bug-for-in-skips-shadowed");
});
var ap=Array.prototype,_7=ap.slice,_8=ap.concat,_9=_4.forEach;
var _a=function(a,_b,_c){
var _d=new (_c||this._NodeListCtor||nl)(a);
return _b?_d._stash(_b):_d;
};
var _e=function(f,a,o){
a=[0].concat(_7.call(a,0));
o=o||_1.global;
return function(_f){
a[0]=_f;
return f.apply(o,a);
};
};
var _10=function(f,o){
return function(){
this.forEach(_e(f,arguments,o));
return this;
};
};
var _11=function(f,o){
return function(){
return this.map(_e(f,arguments,o));
};
};
var _12=function(f,o){
return function(){
return this.filter(_e(f,arguments,o));
};
};
var _13=function(f,g,o){
return function(){
var a=arguments,_14=_e(f,a,o);
if(g.call(o||_1.global,a)){
return this.map(_14);
}
this.forEach(_14);
return this;
};
};
var _15=function(_16){
var _17=this instanceof nl&&_2("array-extensible");
if(typeof _16=="number"){
_16=Array(_16);
}
var _18=(_16&&"length" in _16)?_16:arguments;
if(_17||!_18.sort){
var _19=_17?this:[],l=_19.length=_18.length;
for(var i=0;i<l;i++){
_19[i]=_18[i];
}
if(_17){
return _19;
}
_18=_19;
}
_5._mixin(_18,nlp);
_18._NodeListCtor=function(_1a){
return nl(_1a);
};
return _18;
};
var nl=_15,nlp=nl.prototype=_2("array-extensible")?[]:{};
nl._wrap=nlp._wrap=_a;
nl._adaptAsMap=_11;
nl._adaptAsForEach=_10;
nl._adaptAsFilter=_12;
nl._adaptWithCondition=_13;
_9(["slice","splice"],function(_1b){
var f=ap[_1b];
nlp[_1b]=function(){
return this._wrap(f.apply(this,arguments),_1b=="slice"?this:null);
};
});
_9(["indexOf","lastIndexOf","every","some"],function(_1c){
var f=_4[_1c];
nlp[_1c]=function(){
return f.apply(_1,[this].concat(_7.call(arguments,0)));
};
});
_5.extend(_15,{constructor:nl,_NodeListCtor:nl,toString:function(){
return this.join(",");
},_stash:function(_1d){
this._parent=_1d;
return this;
},on:function(_1e,_1f){
var _20=this.map(function(_21){
return on(_21,_1e,_1f);
});
_20.remove=function(){
for(var i=0;i<_20.length;i++){
_20[i].remove();
}
};
return _20;
},end:function(){
if(this._parent){
return this._parent;
}else{
return new this._NodeListCtor(0);
}
},concat:function(_22){
var t=_7.call(this,0),m=_4.map(arguments,function(a){
return _7.call(a,0);
});
return this._wrap(_8.apply(t,m),this);
},map:function(_23,obj){
return this._wrap(_4.map(this,_23,obj),this);
},forEach:function(_24,_25){
_9(this,_24,_25);
return this;
},filter:function(_26){
var a=arguments,_27=this,_28=0;
if(typeof _26=="string"){
_27=_29._filterResult(this,a[0]);
if(a.length==1){
return _27._stash(this);
}
_28=1;
}
return this._wrap(_4.filter(_27,a[_28],a[_28+1]),this);
},instantiate:function(_2a,_2b){
var c=_5.isFunction(_2a)?_2a:_5.getObject(_2a);
_2b=_2b||{};
return this.forEach(function(_2c){
new c(_2b,_2c);
});
},at:function(){
var t=new this._NodeListCtor(0);
_9(arguments,function(i){
if(i<0){
i=this.length+i;
}
if(this[i]){
t.push(this[i]);
}
},this);
return t._stash(this);
}});
function _2d(_2e,_2f){
var _30=function(_31,_32){
if(typeof _32=="string"){
_32=_3.byId(_32);
if(!_32){
return new _2f([]);
}
}
var _33=typeof _31=="string"?_2e(_31,_32):_31?(_31.end&&_31.on)?_31:[_31]:[];
if(_33.end&&_33.on){
return _33;
}
return new _2f(_33);
};
_30.matches=_2e.match||function(_34,_35,_36){
return _30.filter([_34],_35,_36).length>0;
};
_30.filter=_2e.filter||function(_37,_38,_39){
return _30(_38,_39).filter(function(_3a){
return _4.indexOf(_37,_3a)>-1;
});
};
if(typeof _2e!="function"){
var _3b=_2e.search;
_2e=function(_3c,_3d){
return _3b(_3d||document,_3c);
};
}
return _30;
};
var _29=_2d(_6,_15);
_1.query=_2d(_6,function(_3e){
return _15(_3e);
});
_29.load=function(id,_3f,_40){
loader.load(id,_3f,function(_41){
_40(_2d(_41,_15));
});
};
_1._filterQueryResult=_29._filterResult=function(_42,_43,_44){
return new _15(_29.filter(_42,_43,_44));
};
_1.NodeList=_29.NodeList=_15;
return _29;
});


;define("dojo/NodeList-dom",["./_base/kernel","./query","./_base/array","./_base/lang","./dom-class","./dom-construct","./dom-geometry","./dom-attr","./dom-style"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){
var _a=function(a){
return a.length==1&&(typeof a[0]=="string");
};
var _b=function(_c){
var p=_c.parentNode;
if(p){
p.removeChild(_c);
}
};
var _d=_2.NodeList,_e=_d._adaptWithCondition,_f=_d._adaptAsForEach,aam=_d._adaptAsMap;
function _10(_11){
return function(_12,_13,_14){
if(arguments.length==2){
return _11[typeof _13=="string"?"get":"set"](_12,_13);
}
return _11.set(_12,_13,_14);
};
};
_4.extend(_d,{_normalize:function(_15,_16){
var _17=_15.parse===true;
if(typeof _15.template=="string"){
var _18=_15.templateFunc||(_1.string&&_1.string.substitute);
_15=_18?_18(_15.template,_15):_15;
}
var _19=(typeof _15);
if(_19=="string"||_19=="number"){
_15=_6.toDom(_15,(_16&&_16.ownerDocument));
if(_15.nodeType==11){
_15=_4._toArray(_15.childNodes);
}else{
_15=[_15];
}
}else{
if(!_4.isArrayLike(_15)){
_15=[_15];
}else{
if(!_4.isArray(_15)){
_15=_4._toArray(_15);
}
}
}
if(_17){
_15._runParse=true;
}
return _15;
},_cloneNode:function(_1a){
return _1a.cloneNode(true);
},_place:function(ary,_1b,_1c,_1d){
if(_1b.nodeType!=1&&_1c=="only"){
return;
}
var _1e=_1b,_1f;
var _20=ary.length;
for(var i=_20-1;i>=0;i--){
var _21=(_1d?this._cloneNode(ary[i]):ary[i]);
if(ary._runParse&&_1.parser&&_1.parser.parse){
if(!_1f){
_1f=_1e.ownerDocument.createElement("div");
}
_1f.appendChild(_21);
_1.parser.parse(_1f);
_21=_1f.firstChild;
while(_1f.firstChild){
_1f.removeChild(_1f.firstChild);
}
}
if(i==_20-1){
_6.place(_21,_1e,_1c);
}else{
_1e.parentNode.insertBefore(_21,_1e);
}
_1e=_21;
}
},position:aam(_7.position),attr:_e(_10(_8),_a),style:_e(_10(_9),_a),addClass:_f(_5.add),removeClass:_f(_5.remove),toggleClass:_f(_5.toggle),replaceClass:_f(_5.replace),empty:_f(_6.empty),removeAttr:_f(_8.remove),marginBox:aam(_7.getMarginBox),place:function(_22,_23){
var _24=_2(_22)[0];
return this.forEach(function(_25){
_6.place(_25,_24,_23);
});
},orphan:function(_26){
return (_26?_2._filterResult(this,_26):this).forEach(_b);
},adopt:function(_27,_28){
return _2(_27).place(this[0],_28)._stash(this);
},query:function(_29){
if(!_29){
return this;
}
var ret=new _d;
this.map(function(_2a){
_2(_29,_2a).forEach(function(_2b){
if(_2b!==undefined){
ret.push(_2b);
}
});
});
return ret._stash(this);
},filter:function(_2c){
var a=arguments,_2d=this,_2e=0;
if(typeof _2c=="string"){
_2d=_2._filterResult(this,a[0]);
if(a.length==1){
return _2d._stash(this);
}
_2e=1;
}
return this._wrap(_3.filter(_2d,a[_2e],a[_2e+1]),this);
},addContent:function(_2f,_30){
_2f=this._normalize(_2f,this[0]);
for(var i=0,_31;(_31=this[i]);i++){
if(_2f.length){
this._place(_2f,_31,_30,i>0);
}else{
_6.empty(_31);
}
}
return this;
}});
return _d;
});


;define("dojo/_base/NodeList",["./kernel","../query","./array","./html","../NodeList-dom"],function(_1,_2,_3){
var _4=_2.NodeList,_5=_4.prototype;
_5.connect=_4._adaptAsForEach(function(){
return _1.connect.apply(this,arguments);
});
_5.coords=_4._adaptAsMap(_1.coords);
_4.events=["blur","focus","change","click","error","keydown","keypress","keyup","load","mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup","submit"];
_3.forEach(_4.events,function(_6){
var _7="on"+_6;
_5[_7]=function(a,b){
return this.connect(_7,a,b);
};
});
_1.NodeList=_4;
return _4;
});


;define("dojo/io-query",["./_base/lang"],function(_1){
var _2={};
return {objectToQuery:function objectToQuery(_3){
var _4=encodeURIComponent,_5=[];
for(var _6 in _3){
var _7=_3[_6];
if(_7!=_2[_6]){
var _8=_4(_6)+"=";
if(_1.isArray(_7)){
for(var i=0,l=_7.length;i<l;++i){
_5.push(_8+_4(_7[i]));
}
}else{
_5.push(_8+_4(_7));
}
}
}
return _5.join("&");
},queryToObject:function queryToObject(_9){
var _a=decodeURIComponent,qp=_9.split("&"),_b={},_c,_d;
for(var i=0,l=qp.length,_e;i<l;++i){
_e=qp[i];
if(_e.length){
var s=_e.indexOf("=");
if(s<0){
_c=_a(_e);
_d="";
}else{
_c=_a(_e.slice(0,s));
_d=_a(_e.slice(s+1));
}
if(typeof _b[_c]=="string"){
_b[_c]=[_b[_c]];
}
if(_1.isArray(_b[_c])){
_b[_c].push(_d);
}else{
_b[_c]=_d;
}
}
}
return _b;
}};
});


;define("dojo/dom-form",["./_base/lang","./dom","./io-query","./json"],function(_1,_2,_3,_4){
function _5(_6,_7,_8){
if(_8===null){
return;
}
var _9=_6[_7];
if(typeof _9=="string"){
_6[_7]=[_9,_8];
}else{
if(_1.isArray(_9)){
_9.push(_8);
}else{
_6[_7]=_8;
}
}
};
var _a="file|submit|image|reset|button";
var _b={fieldToObject:function fieldToObject(_c){
var _d=null;
_c=_2.byId(_c);
if(_c){
var _e=_c.name,_f=(_c.type||"").toLowerCase();
if(_e&&_f&&!_c.disabled){
if(_f=="radio"||_f=="checkbox"){
if(_c.checked){
_d=_c.value;
}
}else{
if(_c.multiple){
_d=[];
var _10=[_c.firstChild];
while(_10.length){
for(var _11=_10.pop();_11;_11=_11.nextSibling){
if(_11.nodeType==1&&_11.tagName.toLowerCase()=="option"){
if(_11.selected){
_d.push(_11.value);
}
}else{
if(_11.nextSibling){
_10.push(_11.nextSibling);
}
if(_11.firstChild){
_10.push(_11.firstChild);
}
break;
}
}
}
}else{
_d=_c.value;
}
}
}
}
return _d;
},toObject:function formToObject(_12){
var ret={},_13=_2.byId(_12).elements;
for(var i=0,l=_13.length;i<l;++i){
var _14=_13[i],_15=_14.name,_16=(_14.type||"").toLowerCase();
if(_15&&_16&&_a.indexOf(_16)<0&&!_14.disabled){
_5(ret,_15,_b.fieldToObject(_14));
if(_16=="image"){
ret[_15+".x"]=ret[_15+".y"]=ret[_15].x=ret[_15].y=0;
}
}
}
return ret;
},toQuery:function formToQuery(_17){
return _3.objectToQuery(_b.toObject(_17));
},toJson:function formToJson(_18,_19){
return _4.stringify(_b.toObject(_18),null,_19?4:0);
}};
return _b;
});


;define("dojo/errors/RequestError",["./create"],function(_1){
return _1("RequestError",function(_2,_3){
this.response=_3;
});
});


;define("dojo/request/util",["exports","../errors/RequestError","../errors/CancelError","../Deferred","../io-query","../_base/array","../_base/lang","../promise/Promise"],function(_1,_2,_3,_4,_5,_6,_7,_8){
_1.deepCopy=function deepCopy(_9,_a){
for(var _b in _a){
var _c=_9[_b],_d=_a[_b];
if(_c!==_d){
if(_c&&typeof _c==="object"&&_d&&typeof _d==="object"){
_1.deepCopy(_c,_d);
}else{
_9[_b]=_d;
}
}
}
return _9;
};
_1.deepCreate=function deepCreate(_e,_f){
_f=_f||{};
var _10=_7.delegate(_e),_11,_12;
for(_11 in _e){
_12=_e[_11];
if(_12&&typeof _12==="object"){
_10[_11]=_1.deepCreate(_12,_f[_11]);
}
}
return _1.deepCopy(_10,_f);
};
var _13=Object.freeze||function(obj){
return obj;
};
function _14(_15){
return _13(_15);
};
function _16(_17){
return _17.data!==undefined?_17.data:_17.text;
};
_1.deferred=function deferred(_18,_19,_1a,_1b,_1c,_1d){
var def=new _4(function(_1e){
_19&&_19(def,_18);
if(!_1e||!(_1e instanceof _2)&&!(_1e instanceof _3)){
return new _3("Request canceled",_18);
}
return _1e;
});
def.response=_18;
def.isValid=_1a;
def.isReady=_1b;
def.handleResponse=_1c;
function _1f(_20){
_20.response=_18;
throw _20;
};
var _21=def.then(_14).otherwise(_1f);
if(_1.notify){
_21.then(_7.hitch(_1.notify,"emit","load"),_7.hitch(_1.notify,"emit","error"));
}
var _22=_21.then(_16);
var _23=new _8();
for(var _24 in _22){
if(_22.hasOwnProperty(_24)){
_23[_24]=_22[_24];
}
}
_23.response=_21;
_13(_23);
if(_1d){
def.then(function(_25){
_1d.call(def,_25);
},function(_26){
_1d.call(def,_18,_26);
});
}
def.promise=_23;
def.then=_23.then;
return def;
};
_1.addCommonMethods=function addCommonMethods(_27,_28){
_6.forEach(_28||["GET","POST","PUT","DELETE"],function(_29){
_27[(_29==="DELETE"?"DEL":_29).toLowerCase()]=function(url,_2a){
_2a=_7.delegate(_2a||{});
_2a.method=_29;
return _27(url,_2a);
};
});
};
_1.parseArgs=function parseArgs(url,_2b,_2c){
var _2d=_2b.data,_2e=_2b.query;
if(_2d&&!_2c){
if(typeof _2d==="object"){
_2b.data=_5.objectToQuery(_2d);
}
}
if(_2e){
if(typeof _2e==="object"){
_2e=_5.objectToQuery(_2e);
}
if(_2b.preventCache){
_2e+=(_2e?"&":"")+"request.preventCache="+(+(new Date));
}
}else{
if(_2b.preventCache){
_2e="request.preventCache="+(+(new Date));
}
}
if(url&&_2e){
url+=(~url.indexOf("?")?"&":"?")+_2e;
}
return {url:url,options:_2b,getHeader:function(_2f){
return null;
}};
};
_1.checkStatus=function(_30){
_30=_30||0;
return (_30>=200&&_30<300)||_30===304||_30===1223||!_30;
};
});


;define("dojo/errors/RequestTimeoutError",["./create","./RequestError"],function(_1,_2){
return _1("RequestTimeoutError",null,_2,{dojoType:"timeout"});
});


;define("dojo/request/watch",["./util","../errors/RequestTimeoutError","../errors/CancelError","../_base/array","../_base/window","../has!dom-addeventlistener?:../on"],function(_1,_2,_3,_4,_5,on){
var _6=null,_7=[];
function _8(){
var _9=+(new Date);
for(var i=0,_a;i<_7.length&&(_a=_7[i]);i++){
var _b=_a.response,_c=_b.options;
if((_a.isCanceled&&_a.isCanceled())||(_a.isValid&&!_a.isValid(_b))){
_7.splice(i--,1);
_d._onAction&&_d._onAction();
}else{
if(_a.isReady&&_a.isReady(_b)){
_7.splice(i--,1);
_a.handleResponse(_b);
_d._onAction&&_d._onAction();
}else{
if(_a.startTime){
if(_a.startTime+(_c.timeout||0)<_9){
_7.splice(i--,1);
_a.cancel(new _2("Timeout exceeded",_b));
_d._onAction&&_d._onAction();
}
}
}
}
}
_d._onInFlight&&_d._onInFlight(_a);
if(!_7.length){
clearInterval(_6);
_6=null;
}
};
function _d(_e){
if(_e.response.options.timeout){
_e.startTime=+(new Date);
}
if(_e.isFulfilled()){
return;
}
_7.push(_e);
if(!_6){
_6=setInterval(_8,50);
}
if(_e.response.options.sync){
_8();
}
};
_d.cancelAll=function cancelAll(){
try{
_4.forEach(_7,function(_f){
try{
_f.cancel(new _3("All requests canceled."));
}
catch(e){
}
});
}
catch(e){
}
};
if(_5&&on&&_5.doc.attachEvent){
on(_5.global,"unload",function(){
_d.cancelAll();
});
}
return _d;
});


;define("dojo/selector/_loader",["../has","require"],function(_1,_2){
"use strict";
var _3=document.createElement("div");
_1.add("dom-qsa2.1",!!_3.querySelectorAll);
_1.add("dom-qsa3",function(){
try{
_3.innerHTML="<p class='TEST'></p>";
return _3.querySelectorAll(".TEST:empty").length==1;
}
catch(e){
}
});
var _4;
var _5="./acme",_6="./lite";
return {load:function(id,_7,_8,_9){
var _a=_2;
id=id=="default"?_1("config-selectorEngine")||"css3":id;
id=id=="css2"||id=="lite"?_6:id=="css2.1"?_1("dom-qsa2.1")?_6:_5:id=="css3"?_1("dom-qsa3")?_6:_5:id=="acme"?_5:(_a=_7)&&id;
if(id.charAt(id.length-1)=="?"){
id=id.substring(0,id.length-1);
var _b=true;
}
if(_b&&(_1("dom-compliant-qsa")||_4)){
return _8(_4);
}
_a([id],function(_c){
if(id!="./lite"){
_4=_c;
}
_8(_c);
});
}};
});


;define("dojo/request/handlers",["../json","../_base/kernel","../_base/array","../has","../has!dom?../selector/_loader"],function(_1,_2,_3,_4){
_4.add("activex",typeof ActiveXObject!=="undefined");
_4.add("dom-parser",function(_5){
return "DOMParser" in _5;
});
var _6;
if(_4("activex")){
var dp=["Msxml2.DOMDocument.6.0","Msxml2.DOMDocument.4.0","MSXML2.DOMDocument.3.0","MSXML.DOMDocument"];
var _7;
_6=function(_8){
var _9=_8.data;
var _a=_8.text;
if(_9&&_4("dom-qsa2.1")&&!_9.querySelectorAll&&_4("dom-parser")){
_9=new DOMParser().parseFromString(_a,"application/xml");
}
function _b(p){
try{
var _c=new ActiveXObject(p);
_c.async=false;
_c.loadXML(_a);
_9=_c;
_7=p;
}
catch(e){
return false;
}
return true;
};
if(!_9||!_9.documentElement){
if(!_7||!_b(_7)){
_3.some(dp,_b);
}
}
return _9;
};
}
var _d=function(_e){
if(!_4("native-xhr2-blob")&&_e.options.handleAs==="blob"&&typeof Blob!=="undefined"){
return new Blob([_e.xhr.response],{type:_e.xhr.getResponseHeader("Content-Type")});
}
return _e.xhr.response;
};
var _f={"javascript":function(_10){
return _2.eval(_10.text||"");
},"json":function(_11){
return _1.parse(_11.text||null);
},"xml":_6,"blob":_d,"arraybuffer":_d,"document":_d};
function _12(_13){
var _14=_f[_13.options.handleAs];
_13.data=_14?_14(_13):(_13.data||_13.text);
return _13;
};
_12.register=function(_15,_16){
_f[_15]=_16;
};
return _12;
});


;define("dojo/request/xhr",["../errors/RequestError","./watch","./handlers","./util","../has"],function(_1,_2,_3,_4,_5){
_5.add("native-xhr",function(){
return typeof XMLHttpRequest!=="undefined";
});
_5.add("dojo-force-activex-xhr",function(){
return _5("activex")&&!document.addEventListener&&window.location.protocol==="file:";
});
_5.add("native-xhr2",function(){
if(!_5("native-xhr")){
return;
}
var x=new XMLHttpRequest();
return typeof x["addEventListener"]!=="undefined"&&(typeof opera==="undefined"||typeof x["upload"]!=="undefined");
});
_5.add("native-formdata",function(){
return typeof FormData!=="undefined";
});
_5.add("native-response-type",function(){
return _5("native-xhr")&&typeof new XMLHttpRequest().responseType!=="undefined";
});
_5.add("native-xhr2-blob",function(){
if(!_5("native-response-type")){
return;
}
var x=new XMLHttpRequest();
x.open("GET","/",true);
x.responseType="blob";
var _6=x.responseType;
x.abort();
return _6==="blob";
});
var _7={"blob":_5("native-xhr2-blob")?"blob":"arraybuffer","document":"document","arraybuffer":"arraybuffer"};
function _8(_9,_a){
var _b=_9.xhr;
_9.status=_9.xhr.status;
try{
_9.text=_b.responseText;
}
catch(e){
}
if(_9.options.handleAs==="xml"){
_9.data=_b.responseXML;
}
if(!_a){
try{
_3(_9);
}
catch(e){
_a=e;
}
}
if(_a){
this.reject(_a);
}else{
if(_4.checkStatus(_b.status)){
this.resolve(_9);
}else{
_a=new _1("Unable to load "+_9.url+" status: "+_b.status,_9);
this.reject(_a);
}
}
};
var _c,_d,_e,_f;
if(_5("native-xhr2")){
_c=function(_10){
return !this.isFulfilled();
};
_f=function(dfd,_11){
_11.xhr.abort();
};
_e=function(_12,dfd,_13){
function _14(evt){
dfd.handleResponse(_13);
};
function _15(evt){
var _16=evt.target;
var _17=new _1("Unable to load "+_13.url+" status: "+_16.status,_13);
dfd.handleResponse(_13,_17);
};
function _18(evt){
if(evt.lengthComputable){
_13.loaded=evt.loaded;
_13.total=evt.total;
dfd.progress(_13);
}else{
if(_13.xhr.readyState===3){
_13.loaded=evt.position;
dfd.progress(_13);
}
}
};
_12.addEventListener("load",_14,false);
_12.addEventListener("error",_15,false);
_12.addEventListener("progress",_18,false);
return function(){
_12.removeEventListener("load",_14,false);
_12.removeEventListener("error",_15,false);
_12.removeEventListener("progress",_18,false);
_12=null;
};
};
}else{
_c=function(_19){
return _19.xhr.readyState;
};
_d=function(_1a){
return 4===_1a.xhr.readyState;
};
_f=function(dfd,_1b){
var xhr=_1b.xhr;
var _1c=typeof xhr.abort;
if(_1c==="function"||_1c==="object"||_1c==="unknown"){
xhr.abort();
}
};
}
function _1d(_1e){
return this.xhr.getResponseHeader(_1e);
};
var _1f,_20={data:null,query:null,sync:false,method:"GET"};
function xhr(url,_21,_22){
var _23=_5("native-formdata")&&_21&&_21.data&&_21.data instanceof FormData;
var _24=_4.parseArgs(url,_4.deepCreate(_20,_21),_23);
url=_24.url;
_21=_24.options;
var _25,_26=function(){
_25&&_25();
};
var dfd=_4.deferred(_24,_f,_c,_d,_8,_26);
var _27=_24.xhr=xhr._create();
if(!_27){
dfd.cancel(new _1("XHR was not created"));
return _22?dfd:dfd.promise;
}
_24.getHeader=_1d;
if(_e){
_25=_e(_27,dfd,_24);
}
var _28=_21.data,_29=!_21.sync,_2a=_21.method;
try{
_27.open(_2a,url,_29,_21.user||_1f,_21.password||_1f);
if(_21.withCredentials){
_27.withCredentials=_21.withCredentials;
}
if(_5("native-response-type")&&_21.handleAs in _7){
_27.responseType=_7[_21.handleAs];
}
var _2b=_21.headers,_2c=_23?false:"application/x-www-form-urlencoded";
if(_2b){
for(var hdr in _2b){
if(hdr.toLowerCase()==="content-type"){
_2c=_2b[hdr];
}else{
if(_2b[hdr]){
_27.setRequestHeader(hdr,_2b[hdr]);
}
}
}
}
if(_2c&&_2c!==false){
_27.setRequestHeader("Content-Type",_2c);
}
if(!_2b||!("X-Requested-With" in _2b)){
_27.setRequestHeader("X-Requested-With","XMLHttpRequest");
}
if(_4.notify){
_4.notify.emit("send",_24,dfd.promise.cancel);
}
_27.send(_28);
}
catch(e){
dfd.reject(e);
}
_2(dfd);
_27=null;
return _22?dfd:dfd.promise;
};
xhr._create=function(){
throw new Error("XMLHTTP not available");
};
if(_5("native-xhr")&&!_5("dojo-force-activex-xhr")){
xhr._create=function(){
return new XMLHttpRequest();
};
}else{
if(_5("activex")){
try{
new ActiveXObject("Msxml2.XMLHTTP");
xhr._create=function(){
return new ActiveXObject("Msxml2.XMLHTTP");
};
}
catch(e){
try{
new ActiveXObject("Microsoft.XMLHTTP");
xhr._create=function(){
return new ActiveXObject("Microsoft.XMLHTTP");
};
}
catch(e){
}
}
}
}
_4.addCommonMethods(xhr);
return xhr;
});


;define("dojo/_base/xhr",["./kernel","./sniff","require","../io-query","../dom","../dom-form","./Deferred","./config","./json","./lang","./array","../on","../aspect","../request/watch","../request/xhr","../request/util"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,on,_c,_d,_e,_f){
_1._xhrObj=_e._create;
_c.around(_e,"_create",function(_10){
return function(_11,_12){
var r=_1._xhrObj();
return r;
};
});
var cfg=_1.config;
_1.objectToQuery=_4.objectToQuery;
_1.queryToObject=_4.queryToObject;
_1.fieldToObject=_6.fieldToObject;
_1.formToObject=_6.toObject;
_1.formToQuery=_6.toQuery;
_1.formToJson=_6.toJson;
_1._blockAsync=false;
var _13=_1._contentHandlers=_1.contentHandlers={"text":function(xhr){
return xhr.responseText;
},"json":function(xhr){
return _9.fromJson(xhr.responseText||null);
},"json-comment-filtered":function(xhr){
if(!_8.useCommentedJson){
console.warn("Consider using the standard mimetype:application/json."+" json-commenting can introduce security issues. To"+" decrease the chances of hijacking, use the standard the 'json' handler and"+" prefix your json with: {}&&\n"+"Use djConfig.useCommentedJson=true to turn off this message.");
}
var _14=xhr.responseText;
var _15=_14.indexOf("/*");
var _16=_14.lastIndexOf("*/");
if(_15==-1||_16==-1){
throw new Error("JSON was not comment filtered");
}
return _9.fromJson(_14.substring(_15+2,_16));
},"javascript":function(xhr){
return _1.eval(xhr.responseText);
},"xml":function(xhr){
var _17=xhr.responseXML;
if(_17&&_2("dom-qsa2.1")&&!_17.querySelectorAll&&_2("dom-parser")){
_17=new DOMParser().parseFromString(xhr.responseText,"application/xml");
}
if(_2("ie")>=9){
_17=new ActiveXObject("MSXML2.DOMDocument");
_17.loadXML(xhr.responseText);
}else{
if(_2("ie")){
if((!_17||!_17.documentElement)){
var ms=function(n){
return "MSXML"+n+".DOMDocument";
};
var dp=["Microsoft.XMLDOM",ms(6),ms(4),ms(3),ms(2)];
_b.some(dp,function(p){
try{
var dom=new ActiveXObject(p);
dom.async=false;
dom.loadXML(xhr.responseText);
_17=dom;
}
catch(e){
return false;
}
return true;
});
}
}
}
return _17;
},"json-comment-optional":function(xhr){
if(xhr.responseText&&/^[^{\[]*\/\*/.test(xhr.responseText)){
return _13["json-comment-filtered"](xhr);
}else{
return _13["json"](xhr);
}
}};
_1._ioSetArgs=function(_18,_19,_1a,_1b){
var _1c={args:_18,url:_18.url};
var _1d=null;
if(_18.form){
var _1e=_5.byId(_18.form);
var _1f=_1e.getAttributeNode("action");
_1c.url=_1c.url||(_1f?_1f.value:null);
_1d=_6.toObject(_1e);
}
var _20=[{}];
if(_1d){
_20.push(_1d);
}
if(_18.content){
_20.push(_18.content);
}
if(_18.preventCache){
_20.push({"dojo.preventCache":new Date().valueOf()});
}
_1c.query=_4.objectToQuery(_a.mixin.apply(null,_20));
_1c.handleAs=_18.handleAs||"text";
var d=new _7(function(dfd){
dfd.canceled=true;
_19&&_19(dfd);
var err=dfd.ioArgs.error;
if(!err){
err=new Error("request cancelled");
err.dojoType="cancel";
dfd.ioArgs.error=err;
}
return err;
});
d.addCallback(_1a);
var ld=_18.load;
if(ld&&_a.isFunction(ld)){
d.addCallback(function(_21){
return ld.call(_18,_21,_1c);
});
}
var err=_18.error;
if(err&&_a.isFunction(err)){
d.addErrback(function(_22){
return err.call(_18,_22,_1c);
});
}
var _23=_18.handle;
if(_23&&_a.isFunction(_23)){
d.addBoth(function(_24){
return _23.call(_18,_24,_1c);
});
}
d.addErrback(function(_25){
return _1b(_25,d);
});
if(cfg.ioPublish&&_1.publish&&_1c.args.ioPublish!==false){
d.addCallbacks(function(res){
_1.publish("/dojo/io/load",[d,res]);
return res;
},function(res){
_1.publish("/dojo/io/error",[d,res]);
return res;
});
d.addBoth(function(res){
_1.publish("/dojo/io/done",[d,res]);
return res;
});
}
d.ioArgs=_1c;
return d;
};
var _26=function(dfd){
var ret=_13[dfd.ioArgs.handleAs](dfd.ioArgs.xhr);
return ret===undefined?null:ret;
};
var _27=function(_28,dfd){
if(!dfd.ioArgs.args.failOk){
console.error(_28);
}
return _28;
};
var _29=function(dfd){
if(_2a<=0){
_2a=0;
if(cfg.ioPublish&&_1.publish&&(!dfd||dfd&&dfd.ioArgs.args.ioPublish!==false)){
_1.publish("/dojo/io/stop");
}
}
};
var _2a=0;
_c.after(_d,"_onAction",function(){
_2a-=1;
});
_c.after(_d,"_onInFlight",_29);
_1._ioCancelAll=_d.cancelAll;
_1._ioNotifyStart=function(dfd){
if(cfg.ioPublish&&_1.publish&&dfd.ioArgs.args.ioPublish!==false){
if(!_2a){
_1.publish("/dojo/io/start");
}
_2a+=1;
_1.publish("/dojo/io/send",[dfd]);
}
};
_1._ioWatch=function(dfd,_2b,_2c,_2d){
var _2e=dfd.ioArgs.options=dfd.ioArgs.args;
_a.mixin(dfd,{response:dfd.ioArgs,isValid:function(_2f){
return _2b(dfd);
},isReady:function(_30){
return _2c(dfd);
},handleResponse:function(_31){
return _2d(dfd);
}});
_d(dfd);
_29(dfd);
};
var _32="application/x-www-form-urlencoded";
_1._ioAddQueryToUrl=function(_33){
if(_33.query.length){
_33.url+=(_33.url.indexOf("?")==-1?"?":"&")+_33.query;
_33.query=null;
}
};
_1.xhr=function(_34,_35,_36){
var _37;
var dfd=_1._ioSetArgs(_35,function(dfd){
_37&&_37.cancel();
},_26,_27);
var _38=dfd.ioArgs;
if("postData" in _35){
_38.query=_35.postData;
}else{
if("putData" in _35){
_38.query=_35.putData;
}else{
if("rawBody" in _35){
_38.query=_35.rawBody;
}else{
if((arguments.length>2&&!_36)||"POST|PUT".indexOf(_34.toUpperCase())===-1){
_1._ioAddQueryToUrl(_38);
}
}
}
}
var _39={method:_34,handleAs:"text",timeout:_35.timeout,withCredentials:_35.withCredentials,ioArgs:_38};
if(typeof _35.headers!=="undefined"){
_39.headers=_35.headers;
}
if(typeof _35.contentType!=="undefined"){
if(!_39.headers){
_39.headers={};
}
_39.headers["Content-Type"]=_35.contentType;
}
if(typeof _38.query!=="undefined"){
_39.data=_38.query;
}
if(typeof _35.sync!=="undefined"){
_39.sync=_35.sync;
}
_1._ioNotifyStart(dfd);
try{
_37=_e(_38.url,_39,true);
}
catch(e){
dfd.cancel();
return dfd;
}
dfd.ioArgs.xhr=_37.response.xhr;
_37.then(function(){
dfd.resolve(dfd);
}).otherwise(function(_3a){
_38.error=_3a;
if(_3a.response){
_3a.status=_3a.response.status;
_3a.responseText=_3a.response.text;
_3a.xhr=_3a.response.xhr;
}
dfd.reject(_3a);
});
return dfd;
};
_1.xhrGet=function(_3b){
return _1.xhr("GET",_3b);
};
_1.rawXhrPost=_1.xhrPost=function(_3c){
return _1.xhr("POST",_3c,true);
};
_1.rawXhrPut=_1.xhrPut=function(_3d){
return _1.xhr("PUT",_3d,true);
};
_1.xhrDelete=function(_3e){
return _1.xhr("DELETE",_3e);
};
_1._isDocumentOk=function(x){
return _f.checkStatus(x.status);
};
_1._getText=function(url){
var _3f;
_1.xhrGet({url:url,sync:true,load:function(_40){
_3f=_40;
}});
return _3f;
};
_a.mixin(_1.xhr,{_xhrObj:_1._xhrObj,fieldToObject:_6.fieldToObject,formToObject:_6.toObject,objectToQuery:_4.objectToQuery,formToQuery:_6.toQuery,formToJson:_6.toJson,queryToObject:_4.queryToObject,contentHandlers:_13,_ioSetArgs:_1._ioSetArgs,_ioCancelAll:_1._ioCancelAll,_ioNotifyStart:_1._ioNotifyStart,_ioWatch:_1._ioWatch,_ioAddQueryToUrl:_1._ioAddQueryToUrl,_isDocumentOk:_1._isDocumentOk,_getText:_1._getText,get:_1.xhrGet,post:_1.xhrPost,put:_1.xhrPut,del:_1.xhrDelete});
return _1.xhr;
});


;define("dojo/_base/fx",["./kernel","./config","./lang","../Evented","./Color","../aspect","../sniff","../dom","../dom-style"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){
var _a=_3.mixin;
var _b={};
var _c=_b._Line=function(_d,_e){
this.start=_d;
this.end=_e;
};
_c.prototype.getValue=function(n){
return ((this.end-this.start)*n)+this.start;
};
var _f=_b.Animation=function(_10){
_a(this,_10);
if(_3.isArray(this.curve)){
this.curve=new _c(this.curve[0],this.curve[1]);
}
};
_f.prototype=new _4();
_3.extend(_f,{duration:350,repeat:0,rate:20,_percent:0,_startRepeatCount:0,_getStep:function(){
var _11=this._percent,_12=this.easing;
return _12?_12(_11):_11;
},_fire:function(evt,_13){
var a=_13||[];
if(this[evt]){
if(_2.debugAtAllCosts){
this[evt].apply(this,a);
}else{
try{
this[evt].apply(this,a);
}
catch(e){
console.error("exception in animation handler for:",evt);
console.error(e);
}
}
}
return this;
},play:function(_14,_15){
var _16=this;
if(_16._delayTimer){
_16._clearTimer();
}
if(_15){
_16._stopTimer();
_16._active=_16._paused=false;
_16._percent=0;
}else{
if(_16._active&&!_16._paused){
return _16;
}
}
_16._fire("beforeBegin",[_16.node]);
var de=_14||_16.delay,_17=_3.hitch(_16,"_play",_15);
if(de>0){
_16._delayTimer=setTimeout(_17,de);
return _16;
}
_17();
return _16;
},_play:function(_18){
var _19=this;
if(_19._delayTimer){
_19._clearTimer();
}
_19._startTime=new Date().valueOf();
if(_19._paused){
_19._startTime-=_19.duration*_19._percent;
}
_19._active=true;
_19._paused=false;
var _1a=_19.curve.getValue(_19._getStep());
if(!_19._percent){
if(!_19._startRepeatCount){
_19._startRepeatCount=_19.repeat;
}
_19._fire("onBegin",[_1a]);
}
_19._fire("onPlay",[_1a]);
_19._cycle();
return _19;
},pause:function(){
var _1b=this;
if(_1b._delayTimer){
_1b._clearTimer();
}
_1b._stopTimer();
if(!_1b._active){
return _1b;
}
_1b._paused=true;
_1b._fire("onPause",[_1b.curve.getValue(_1b._getStep())]);
return _1b;
},gotoPercent:function(_1c,_1d){
var _1e=this;
_1e._stopTimer();
_1e._active=_1e._paused=true;
_1e._percent=_1c;
if(_1d){
_1e.play();
}
return _1e;
},stop:function(_1f){
var _20=this;
if(_20._delayTimer){
_20._clearTimer();
}
if(!_20._timer){
return _20;
}
_20._stopTimer();
if(_1f){
_20._percent=1;
}
_20._fire("onStop",[_20.curve.getValue(_20._getStep())]);
_20._active=_20._paused=false;
return _20;
},destroy:function(){
this.stop();
},status:function(){
if(this._active){
return this._paused?"paused":"playing";
}
return "stopped";
},_cycle:function(){
var _21=this;
if(_21._active){
var _22=new Date().valueOf();
var _23=_21.duration===0?1:(_22-_21._startTime)/(_21.duration);
if(_23>=1){
_23=1;
}
_21._percent=_23;
if(_21.easing){
_23=_21.easing(_23);
}
_21._fire("onAnimate",[_21.curve.getValue(_23)]);
if(_21._percent<1){
_21._startTimer();
}else{
_21._active=false;
if(_21.repeat>0){
_21.repeat--;
_21.play(null,true);
}else{
if(_21.repeat==-1){
_21.play(null,true);
}else{
if(_21._startRepeatCount){
_21.repeat=_21._startRepeatCount;
_21._startRepeatCount=0;
}
}
}
_21._percent=0;
_21._fire("onEnd",[_21.node]);
!_21.repeat&&_21._stopTimer();
}
}
return _21;
},_clearTimer:function(){
clearTimeout(this._delayTimer);
delete this._delayTimer;
}});
var ctr=0,_24=null,_25={run:function(){
}};
_3.extend(_f,{_startTimer:function(){
if(!this._timer){
this._timer=_6.after(_25,"run",_3.hitch(this,"_cycle"),true);
ctr++;
}
if(!_24){
_24=setInterval(_3.hitch(_25,"run"),this.rate);
}
},_stopTimer:function(){
if(this._timer){
this._timer.remove();
this._timer=null;
ctr--;
}
if(ctr<=0){
clearInterval(_24);
_24=null;
ctr=0;
}
}});
var _26=_7("ie")?function(_27){
var ns=_27.style;
if(!ns.width.length&&_9.get(_27,"width")=="auto"){
ns.width="auto";
}
}:function(){
};
_b._fade=function(_28){
_28.node=_8.byId(_28.node);
var _29=_a({properties:{}},_28),_2a=(_29.properties.opacity={});
_2a.start=!("start" in _29)?function(){
return +_9.get(_29.node,"opacity")||0;
}:_29.start;
_2a.end=_29.end;
var _2b=_b.animateProperty(_29);
_6.after(_2b,"beforeBegin",_3.partial(_26,_29.node),true);
return _2b;
};
_b.fadeIn=function(_2c){
return _b._fade(_a({end:1},_2c));
};
_b.fadeOut=function(_2d){
return _b._fade(_a({end:0},_2d));
};
_b._defaultEasing=function(n){
return 0.5+((Math.sin((n+1.5)*Math.PI))/2);
};
var _2e=function(_2f){
this._properties=_2f;
for(var p in _2f){
var _30=_2f[p];
if(_30.start instanceof _5){
_30.tempColor=new _5();
}
}
};
_2e.prototype.getValue=function(r){
var ret={};
for(var p in this._properties){
var _31=this._properties[p],_32=_31.start;
if(_32 instanceof _5){
ret[p]=_5.blendColors(_32,_31.end,r,_31.tempColor).toCss();
}else{
if(!_3.isArray(_32)){
ret[p]=((_31.end-_32)*r)+_32+(p!="opacity"?_31.units||"px":0);
}
}
}
return ret;
};
_b.animateProperty=function(_33){
var n=_33.node=_8.byId(_33.node);
if(!_33.easing){
_33.easing=_1._defaultEasing;
}
var _34=new _f(_33);
_6.after(_34,"beforeBegin",_3.hitch(_34,function(){
var pm={};
for(var p in this.properties){
if(p=="width"||p=="height"){
this.node.display="block";
}
var _35=this.properties[p];
if(_3.isFunction(_35)){
_35=_35(n);
}
_35=pm[p]=_a({},(_3.isObject(_35)?_35:{end:_35}));
if(_3.isFunction(_35.start)){
_35.start=_35.start(n);
}
if(_3.isFunction(_35.end)){
_35.end=_35.end(n);
}
var _36=(p.toLowerCase().indexOf("color")>=0);
function _37(_38,p){
var v={height:_38.offsetHeight,width:_38.offsetWidth}[p];
if(v!==undefined){
return v;
}
v=_9.get(_38,p);
return (p=="opacity")?+v:(_36?v:parseFloat(v));
};
if(!("end" in _35)){
_35.end=_37(n,p);
}else{
if(!("start" in _35)){
_35.start=_37(n,p);
}
}
if(_36){
_35.start=new _5(_35.start);
_35.end=new _5(_35.end);
}else{
_35.start=(p=="opacity")?+_35.start:parseFloat(_35.start);
}
}
this.curve=new _2e(pm);
}),true);
_6.after(_34,"onAnimate",_3.hitch(_9,"set",_34.node),true);
return _34;
};
_b.anim=function(_39,_3a,_3b,_3c,_3d,_3e){
return _b.animateProperty({node:_39,duration:_3b||_f.prototype.duration,properties:_3a,easing:_3c,onEnd:_3d}).play(_3e||0);
};
if(_7("extend-dojo")){
_a(_1,_b);
_1._Animation=_f;
}
return _b;
});


;define("dojo/_base/browser",["../ready","./kernel","./connect","./unload","./window","./event","./html","./NodeList","../query","./xhr","./fx"],function(_1){
return _1;
});


;define("dojo/main",["./_base/kernel","./has","require","./sniff","./_base/lang","./_base/array","./_base/config","./ready","./_base/declare","./_base/connect","./_base/Deferred","./_base/json","./_base/Color","./_base/url","./has!dojo-firebug?./_firebug/firebug","./has!host-browser?./_base/browser","./has!dojo-sync-loader?./_base/loader"],function(_1,_2,_3,_4,_5,_6,_7,_8){
_2.add("dojo-config-require",1);
if(_2("dojo-config-require")){
var _9=_7.require;
if(_9){
_9=_6.map(_5.isArray(_9)?_9:[_9],function(_a){
return _a.replace(/\./g,"/");
});
if(_1.isAsync){
_3(_9);
}else{
_8(1,function(){
_3(_9);
});
}
}
}
return _1;
});

dojo.provide("net.jazz.ajax._xdbootstrap");dojo.mixin(dojo.getObject("net.jazz.ajax.config",true),{loaded:[],base:"https://apps.na.collabserv.com/connections/resources",params:"lang=en&country=us"},dojo.getObject("netJazzAjaxConfig",true));if(typeof define!=="undefined"&&typeof define._packages!=="undefined")define._packages["net.jazz.ajax"]=true;

;if(!dojo._hasResource["net.jazz.ajax.xdloader"]){
dojo._hasResource["net.jazz.ajax.xdloader"]=true;
(function(){
var _1=dojo.provide("net.jazz.ajax.xdloader");


if(window.djConfig){
djConfig.skipIeDomLoaded=true;
}
var _2=net.jazz.ajax;
var _3=_2.config;
var _4="_js_modules";
window[_4]=window[_4]||_3.loaded||[];
var _5="_js_url_rewriter";
window[_5]=typeof window[_5]==="function"?window[_5]:function(_6){
return _6;
};
_1._modulePaths=(window.djConfig||{}).modulePaths||{};
var _7=new dojo._Url(_3.base);
var _8=(_7.scheme&&_7.authority)?(_7.scheme+"://"+_7.authority):"";
var _9=window[_5](_3.base);
var _a=_9+"/web/";
var _b=_a+"_xdloader";
var _c=_a+"_js";
var _d=_3.params;
var _e=_3.etag;
var _f;
var _10=[];
var _11;
var _12=document.getElementsByTagName("head")[0];
if(!_12){
_12=document.getElementsByTagName("html")[0];
}
function _13(_14){
var _15=[],_16;
var _17;
var i=0;
var _18=[];
var _19=this;
var _1a;
this.add=function(_1b,_1c){
_15=_15.concat(_1b);
_18.push([_1c,_1b]);
};
this.addLayer=function(_1d,_1e,_1f){
_15=[].concat(_1d);
_16=_1e||[];
_18.push([_1f,_1d]);
};
function _20(_21){
var _22=_16||window[_4];
var _23=_c+"?include="+_21.sort().join("~")+(_22.length>0?("&exclude="+_22.sort().join("~")+"~"):"")+(_e?("&etag="+encodeURIComponent(_e)):"")+(_d?("&"+_d):"");
return _23;
};
this.start=function(){
if(_f==_19){
_f=null;
}
_11=_19;
var _24,_25=[],_26={};
while(_24=_15.shift()){
if(!dojo.exists(_24)){
if(_26[_24]){
continue;
}
_26[_24]=1;
_25.push(_24);
}
}
if(_25.length==0){
_27();
return;
}
var _28=_20(_25);
var _29=document.createElement("script");
_29.type="text/javascript";
_29.src=_28;
var _2a=_29.onload=function _2a(){
if(_29){
_29.onload=_29.onreadystatechange=null;
_29=null;
_27();
}
};
_29.onreadystatechange=function(){
if("loaded"===_29.readyState||"complete"===_29.readyState){
_2a();
}
};
_12.appendChild(_29);
};
this.loaded=function(_2b,_2c){
_17=_2c;
_2d();
};
function _2d(){
if(i<_17.length){
var _2e=document.createElement("script");
_2e.type="text/javascript";
var src=_17[i++];
if(src.charAt(0)=="/"){
src=_8+src;
}
_2e.src=src;
var _2f=_2e.onload=function _2f(){
if(_2e){
_2e.onload=_2e.onreadystatechange=null;
_2e=null;
_2d();
}
};
_2e.onreadystatechange=function(){
if("loaded"===_2e.readyState||"complete"===_2e.readyState){
_2f();
}
};
_12.appendChild(_2e);
}else{
_27();
}
};
function _27(){
if(_11==_19){
_11=null;
}
for(var k=0;k<_18.length;k++){
_18[k][0](dojo.map(_18[k][1],dojo.getObject));
}
if(_19.next){
_19.next.start();
}
};
function _30(_31){
console.error(_31);
};
if(_14){
return;
}
if(_11){
var _32=_11;
while(_32.next){
_32=_32.next;
}
_32.next=this;
}else{
setTimeout(this.start);
}
};
function _33(_34,_35){
var _36=_34,_37;
var _38;
var _39;
var i=0;
var _3a=this;
var _3b=false;
function _3c(_3d){
if(_3d&&_3d.length==1){
var _3e=_38=_3d[0];
var _3f=_a;
for(var i in _1._modulePaths){
if(_1._modulePaths.hasOwnProperty(i)){
if(_38.indexOf(i+".")===0){
_3f=_1._modulePaths[i];
_3e=_3e.substring(i.length);
break;
}
}
}
var _40=_3f+_3e.replace(/\./g,"/").replace(/\/ROOT\//,"/")+".js";
}else{
var _41=_37||window[_4];
var _40=_c+"?include="+_3d.sort().join("~")+(_41.length>0?("&exclude="+_41.sort().join("~")+"~"):"")+(_e?("&etag="+encodeURIComponent(_e)):"")+(_d?("&"+_d):"");
}
return _40;
};
this.start=function(){
if(_f==_3a){
_f=null;
}
_11=_3a;
var _42,_43=[],_44={};
while(_42=_36.shift()){
if(!dojo.exists(_42)){
if(_44[_42]){
continue;
}
_44[_42]=1;
_43.push(_42);
}
}
if(_43.length==0){
_45();
return;
}
_39=_3c(_43);
_46();
};
function _45(){
if(_11==_3a){
_11=null;
}
if(_3a.next){
_3a.next.start();
}
};
function _47(_48,_49){
if(_35&&!_3b){
var _4a=_48.substring(_48.lastIndexOf(".")+1),_4b=_48.substring(0,_48.indexOf(".nls.")),_4c=_48.substring(_48.indexOf(".nls.")+5,_48.lastIndexOf("."));
var loc=_4c.split("-").slice(0,-1).join("_");
if(!loc){
loc="ROOT";
_3b=true;
}
var _48=_4b+".nls."+loc+"."+_4a;
_36.push(_48);
_3a.start(_3a,null);
}
console.error(_49);
};
var _4d;
var _4e;
function _46(){
_4e=[];
dojo.xhrGet({url:_39,headers:{Accept:"text/javascript"},load:_4f,error:dojo.partial(_47,_38),sync:true,failOk:true});
};
function _4f(_50){
var _51;
if(_35){
_3b=false;
var _52=_38.substring(_38.lastIndexOf(".")+1),_53=_38.substring(0,_38.indexOf(".nls.")),_54=_38.substring(_38.indexOf(".nls.")+5,_38.lastIndexOf(".")).replace(/\-/g,"_"),_55=_53+".nls."+_52;
_51="dojo.provide(\""+_55+"\")._built=true;\n"+"dojo.provide(\""+_55+"."+_54+"\");\n"+_55+"."+_54+"=";
}else{
_51="var __module = \""+_38.replace(/\./g,"/")+"\";\n";
}
_50=_51+_50;
if(window.execScript){
window.execScript(_50);
}else{
dojo["eval"](_50);
}
_45();
};
this.start(_35);
};
_1.loaded=function(_56,_57,_58){
window[_4]=window[_4].concat(_56);
if(!_11){
_11=new _13(true);
_11.add(_56,function(){
});
}
var _59=_57[0];
if(_59&&!_3.skipStyles){
if(_59.charAt(0)=="/"){
_59=_8+_59;
}
if(document.all&&document.styleSheets.length>31){
var _5a;
for(var i=0;i<document.styleSheets.length;i++){
if(document.styleSheets[i].imports.length<32){
_5a=document.styleSheets[i];
break;
}
}
if(_5a!==null){
_5a.addImport(_59);
}else{
throw new Error("No stylesheet is available to add an import to");
}
}else{
var _5b=document.createElement("link");
_5b.rel="stylesheet";
_5b.type="text/css";
_5b.href=_59;
_12.appendChild(_5b);
}
}
_11.loaded(_56,_58);
};
_1.load_async=function(_5c,_5d,_5e){
_1.batch_load_async([_5c],_5d,_5e);
};
_1.batch_load_async=function(_5f,_60,_61){
var _62,_63=[],_64=[];
while(_62=_5f.shift()){
if(!dojo.exists(_62)){
_63.push(_62);
}else{
_64.push(_62);
}
}
if(_63.length==0){
_60.apply(null,_64);
}else{
if(_61){
new _13().add(_63,_60);
}else{
if(!_f){
_f=new _13();
}
_f.add(_63,_60);
}
}
};
_1.load_layer_async=function(_65,_66,_67){
if(!dojo.isArray(_65)){
_65=[_65];
}
if(!dojo.isArray(_66)){
_66=[_66];
}
var _68=new _13();
_68.addLayer(_65,_66,_67);
};
_1.load_sync=function(_69,_6a){
if(dojo.exists(_69)){
return;
}
new _33([_69],_6a);
};
dojo.provide("jazz.core.loader");
jazz.core.loader=_1;
})();
}

