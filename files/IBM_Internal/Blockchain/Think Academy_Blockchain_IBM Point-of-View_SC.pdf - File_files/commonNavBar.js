(function webpackUniversalModuleDefinition(_1,_2){
_1["commonNavBar"]=_2();
})(this,function(){
return (function(_3){
var _4={};
function _5(_6){
if(_4[_6]){
return _4[_6].exports;
}
var _7=_4[_6]={exports:{},id:_6,loaded:false};
_3[_6].call(_7.exports,_7,_7.exports,_5);
_7.loaded=true;
return _7.exports;
};
_5.m=_3;
_5.c=_4;
_5.p="";
return _5(0);
})([function(_8,_9,_a){
_a(1);
_a(5);
_a(7);
_a(9);
},function(_b,_c,_d){
var _e=_d(2);
if(typeof _e==="string"){
_e=[[_b.id,_e,""]];
}
var _f=_d(4)(_e,{});
if(_e.locals){
_b.exports=_e.locals;
}
if(false){
if(!_e.locals){
_b.hot.accept("!!./../node_modules/css-loader/index.js!./commonNavBar.css",function(){
var _10=require("!!./../node_modules/css-loader/index.js!./commonNavBar.css");
if(typeof _10==="string"){
_10=[[_b.id,_10,""]];
}
_f(_10);
});
}
_b.hot.dispose(function(){
_f();
});
}
},function(_11,_12,_13){
_12=_11.exports=_13(3)();
_12.push([_11.id,"/* ***************************************************************** */\n/*                                                                   */\n/* IBM Confidential                                                  */\n/*                                                                   */\n/* OCO Source Materials                                              */\n/*                                                                   */\n/* Copyright IBM Corp. 2014, 2016                                    */\n/*                                                                   */\n/* The source code for this program is not published or otherwise    */\n/* divested of its trade secrets, irrespective of what has been      */\n/* deposited with the U.S. Copyright Office.                         */\n/*                                                                   */\n/* ***************************************************************** */\n\n/* CDS - Added for navbar merge to make all top menu anchor entries white, no underline */\n.ics-scbanner > a, .ics-scbanner > a:visited, .ics-scbanner > a:hover, .ics-scbanner > a:focus, .ics-scbanner > a:active {\n    text-decoration: none !important;\n}\n\n/* AC - only apply color for hikari, gen4, gen3/colour themes (do not apply color for custom theme, that's done in javascript). */\n.hikari.ics-scbanner > a, .hikari.ics-scbanner > a:visited, .hikari.ics-scbanner > a:hover, .hikari.ics-scbanner > a:focus, .hikari.ics-scbanner > a:active,\n.gen4.ics-scbanner > a, .gen4.ics-scbanner > a:visited, .gen4.ics-scbanner > a:hover, .gen4.ics-scbanner > a:focus, .gen4.ics-scbanner > a:active,\n.colour.ics-scbanner > a, .colour.ics-scbanner > a:visited, .colour.ics-scbanner > a:hover, .colour.ics-scbanner > a:focus, .colour.ics-scbanner > a:active\n{\n    color: #fff !important;\n}\n\n/* CDS - Overriding common.css styling of Account Settings and Help Menu divs  */\n#bss-usersMenu, #bsscom-helpMenu {\n    margin-top: 0px !important;\n}\n\n/* CDS - Fixes conflict with .help class in communities.css  */\n.ics-scbanner .help {\n    background-color: transparent;\n    width: auto;\n}\n\n/* CDS - Fixes height issue- conflict with .lotusui30  (Defect 186584) */\n.ics-scbanner ul li a {\n    padding: 0 1rem !important;\n}\n\n/* CDS - Fixes dashed border around focused top menu items and links/buttons inside menus (Defects 186584,\t191519\t) */\n.ics-scbanner > a:focus, .ics-scbanner > button:focus, .ics-scbanner .navmenu:focus,\n.ics-scbanner .navsimplelist > li a:focus, .ics-scbanner .navsimplelist > li button:focus {\n    outline: medium none !important;\n}\n\n/* Adding some styles for notification center that are not yet present on the Verse page */\n.ics-scbanner .notifications {\n\t-webkit-order:350;\n\torder:350;\n}\n\n/* thin blue line under the navbar for gen4 theme. most pages losts this style when we removed lotusBanner class from the wrapper div (since it was interfering with other styles, primarily, notification center menu). */\n.ics-scbanner-gen4border {\n    background-color: #1a96c6;\n    height: 4px;\n}\n\n#bhc_banner {\n\tbackground: initial !important;\n    border-bottom: initial !important;\n    padding: initial !important;\n}\n\n/* verse page has a broadly defined style for svgs, but most non-verse pages do not. \n   this allows high contrast to select appropriate svg fill color based on the user's high contrast choice. */\n.ics-scbanner svg {\n  fill: currentColor !important;\n}",""]);
},function(_14,_15){
_14.exports=function(){
var _16=[];
_16.toString=function toString(){
var _17=[];
for(var i=0;i<this.length;i++){
var _18=this[i];
if(_18[2]){
_17.push("@media "+_18[2]+"{"+_18[1]+"}");
}else{
_17.push(_18[1]);
}
}
return _17.join("");
};
_16.i=function(_19,_1a){
if(typeof _19==="string"){
_19=[[null,_19,""]];
}
var _1b={};
for(var i=0;i<this.length;i++){
var id=this[i][0];
if(typeof id==="number"){
_1b[id]=true;
}
}
for(i=0;i<_19.length;i++){
var _1c=_19[i];
if(typeof _1c[0]!=="number"||!_1b[_1c[0]]){
if(_1a&&!_1c[2]){
_1c[2]=_1a;
}else{
if(_1a){
_1c[2]="("+_1c[2]+") and ("+_1a+")";
}
}
_16.push(_1c);
}
}
};
return _16;
};
},function(_1d,_1e,_1f){
var _20={},_21=function(fn){
var _22;
return function(){
if(typeof _22==="undefined"){
_22=fn.apply(this,arguments);
}
return _22;
};
},_23=_21(function(){
return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
}),_24=_21(function(){
return document.head||document.getElementsByTagName("head")[0];
}),_25=null,_26=0,_27=[];
_1d.exports=function(_28,_29){
if(false){
if(typeof document!=="object"){
throw new Error("The style-loader cannot be used in a non-browser environment");
}
}
_29=_29||{};
if(typeof _29.singleton==="undefined"){
_29.singleton=_23();
}
if(typeof _29.insertAt==="undefined"){
_29.insertAt="bottom";
}
var _2a=_2b(_28);
_2c(_2a,_29);
return function update(_2d){
var _2e=[];
for(var i=0;i<_2a.length;i++){
var _2f=_2a[i];
var _30=_20[_2f.id];
_30.refs--;
_2e.push(_30);
}
if(_2d){
var _31=_2b(_2d);
_2c(_31,_29);
}
for(var i=0;i<_2e.length;i++){
var _30=_2e[i];
if(_30.refs===0){
for(var j=0;j<_30.parts.length;j++){
_30.parts[j]();
}
delete _20[_30.id];
}
}
};
};
function _2c(_32,_33){
for(var i=0;i<_32.length;i++){
var _34=_32[i];
var _35=_20[_34.id];
if(_35){
_35.refs++;
for(var j=0;j<_35.parts.length;j++){
_35.parts[j](_34.parts[j]);
}
for(;j<_34.parts.length;j++){
_35.parts.push(_36(_34.parts[j],_33));
}
}else{
var _37=[];
for(var j=0;j<_34.parts.length;j++){
_37.push(_36(_34.parts[j],_33));
}
_20[_34.id]={id:_34.id,refs:1,parts:_37};
}
}
};
function _2b(_38){
var _39=[];
var _3a={};
for(var i=0;i<_38.length;i++){
var _3b=_38[i];
var id=_3b[0];
var css=_3b[1];
var _3c=_3b[2];
var _3d=_3b[3];
var _3e={css:css,media:_3c,sourceMap:_3d};
if(!_3a[id]){
_39.push(_3a[id]={id:id,parts:[_3e]});
}else{
_3a[id].parts.push(_3e);
}
}
return _39;
};
function _3f(_40,_41){
var _42=_24();
var _43=_27[_27.length-1];
if(_40.insertAt==="top"){
if(!_43){
_42.insertBefore(_41,_42.firstChild);
}else{
if(_43.nextSibling){
_42.insertBefore(_41,_43.nextSibling);
}else{
_42.appendChild(_41);
}
}
_27.push(_41);
}else{
if(_40.insertAt==="bottom"){
_42.appendChild(_41);
}else{
throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
}
}
};
function _44(_45){
_45.parentNode.removeChild(_45);
var idx=_27.indexOf(_45);
if(idx>=0){
_27.splice(idx,1);
}
};
function _46(_47){
var _48=document.createElement("style");
_48.type="text/css";
_3f(_47,_48);
return _48;
};
function _49(_4a){
var _4b=document.createElement("link");
_4b.rel="stylesheet";
_3f(_4a,_4b);
return _4b;
};
function _36(obj,_4c){
var _4d,_4e,_4f;
if(_4c.singleton){
var _50=_26++;
_4d=_25||(_25=_46(_4c));
_4e=_51.bind(null,_4d,_50,false);
_4f=_51.bind(null,_4d,_50,true);
}else{
if(obj.sourceMap&&typeof URL==="function"&&typeof URL.createObjectURL==="function"&&typeof URL.revokeObjectURL==="function"&&typeof Blob==="function"&&typeof btoa==="function"){
_4d=_49(_4c);
_4e=_52.bind(null,_4d);
_4f=function(){
_44(_4d);
if(_4d.href){
URL.revokeObjectURL(_4d.href);
}
};
}else{
_4d=_46(_4c);
_4e=_5d.bind(null,_4d);
_4f=function(){
_44(_4d);
};
}
}
_4e(obj);
return function updateStyle(_53){
if(_53){
if(_53.css===obj.css&&_53.media===obj.media&&_53.sourceMap===obj.sourceMap){
return;
}
_4e(obj=_53);
}else{
_4f();
}
};
};
var _54=(function(){
var _55=[];
return function(_56,_57){
_55[_56]=_57;
return _55.filter(Boolean).join("\n");
};
})();
function _51(_58,_59,_5a,obj){
var css=_5a?"":obj.css;
if(_58.styleSheet){
_58.styleSheet.cssText=_54(_59,css);
}else{
var _5b=document.createTextNode(css);
var _5c=_58.childNodes;
if(_5c[_59]){
_58.removeChild(_5c[_59]);
}
if(_5c.length){
_58.insertBefore(_5b,_5c[_59]);
}else{
_58.appendChild(_5b);
}
}
};
function _5d(_5e,obj){
var css=obj.css;
var _5f=obj.media;
if(_5f){
_5e.setAttribute("media",_5f);
}
if(_5e.styleSheet){
_5e.styleSheet.cssText=css;
}else{
while(_5e.firstChild){
_5e.removeChild(_5e.firstChild);
}
_5e.appendChild(document.createTextNode(css));
}
};
function _52(_60,obj){
var css=obj.css;
var _61=obj.sourceMap;
if(_61){
css+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(_61))))+" */";
}
var _62=new Blob([css],{type:"text/css"});
var _63=_60.href;
_60.href=URL.createObjectURL(_62);
if(_63){
URL.revokeObjectURL(_63);
}
};
},function(_64,_65,_66){
var _67=_66(6);
if(typeof _67==="string"){
_67=[[_64.id,_67,""]];
}
var _68=_66(4)(_67,{});
if(_67.locals){
_64.exports=_67.locals;
}
if(false){
if(!_67.locals){
_64.hot.accept("!!./../node_modules/css-loader/index.js!./base.css",function(){
var _69=require("!!./../node_modules/css-loader/index.js!./base.css");
if(typeof _69==="string"){
_69=[[_64.id,_69,""]];
}
_68(_69);
});
}
_64.hot.dispose(function(){
_68();
});
}
},function(_6a,_6b,_6c){
_6b=_6a.exports=_6c(3)();
_6b.push([_6a.id,"/* Copyright IBM Corp. 2014, 2016  All Rights Reserved.              */\n\n/*\n * Keep this file small. It is part of the initial payload. \n * Just enough styles to not make it look broken. Contents of navbar\n * is hidden with the 'loading' class until the JS code is done\n * initializing.\n */\n\n.ics-scbanner {\n  display: -webkit-flex;\n  display: flex;\n  -webkit-align-items: center;\n  align-items: center;\n\theight: 40px;\n\tbackground-color: #325c80; /*c9bd4;*/\n\tcolor: #fff;\n\tpadding: 0 1.25rem;\n\tfont-size: 12px;\n\ttransition: background-color 1s ease;\n}\n\n.ics-scbanner.loading * {\n  display: none;\n}\n\n/* all elements (top level links and menus, and links inside menus) */\n.ics-scbanner > a,  .ics-scbanner .navsimplelist > li a, .ics-scbanner .navmenu {\n  -webkit-align-items: center;\n  align-items: center;\n  display: -webkit-flex;\n  display: flex;\n  height: 100%;\n  padding: 0 0.75rem;\n}\n\n/* links at top level and links inside simple menus */ \n.ics-scbanner > a, .ics-scbanner .navsimplelist > li a {\n  white-space: nowrap;\n  box-sizing: border-box;\n  margin:0;\n  text-decoration:none;\n  color:#fff;\n}\n\n/* buttons at top level and buttons inside simple menus */ \n.ics-scbanner > button, .ics-scbanner .navsimplelist > li button {\n  height:100%;\n  border:0;\n  padding:0 16px;\n  margin:0;\n  color:#fff;\n  background-color:transparent;\n  cursor:pointer;\n  white-space: nowrap;\n\n  /* required for MacOS buttons that do not inherit styles on buttons properly */\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 12px;\n  font-weight: normal;\n  -webkit-font-smoothing: antialiased; /* required to keep MacOS buttons from turning too bold */\n}\n",""]);
},function(_6d,_6e,_6f){
var _70=_6f(8);
if(typeof _70==="string"){
_70=[[_6d.id,_70,""]];
}
var _71=_6f(4)(_70,{});
if(_70.locals){
_6d.exports=_70.locals;
}
if(false){
if(!_70.locals){
_6d.hot.accept("!!./../node_modules/css-loader/index.js!./extended.css",function(){
var _72=require("!!./../node_modules/css-loader/index.js!./extended.css");
if(typeof _72==="string"){
_72=[[_6d.id,_72,""]];
}
_71(_72);
});
}
_6d.hot.dispose(function(){
_71();
});
}
},function(_73,_74,_75){
_74=_73.exports=_75(3)();
_74.push([_73.id,"/* Copyright IBM Corp. 2014, 2016  All Rights Reserved.              */\n\n/* Extended features loaded dynamically. Put most styles here. */\n\n/* icon styles */\n\n.ics-scbanner .help-image,\n.ics-scbanner .generic-avatar-image,\n.ics-scbanner .nav-icon {\n  width: 1.25rem;\n  -webkit-flex-shrink: 0;\n  flex-shrink: 0;\n  fill: #fff;\n}\n\n.ics-scbanner .nav-icon {\n  height: 20px;\n}\n\n.help-image.mirror {\n  -webkit-transform: scaleX(-1);\n  transform: scaleX(-1)\n}\n\n/* some non-Verse pages (Connections) force scaleX(-1) on all svg in rtl locales. */\n/* we need to override that since help in hebrew should not be mirrored. */\n.help-image.nomirror {\n  -webkit-transform: scaleX(1);\n  transform: scaleX(1)\n}\n\n.ics-scbanner .user .avatar {\n  /* height: calc(100% - 4px); causes problems in IE 11 */\n  height: 1.25rem;\n  width: 1.25rem;\n  border-radius: 50%;\n  -webkit-flex-shrink: 0;\n  flex-shrink: 0;\n  line-height: 1.75rem;\n}\n\n.ics-scbanner .menu-image {\n  width: 0.375rem;\n  -webkit-flex-shrink: 0;\n  flex-shrink: 0;\n  margin-left: 0.375rem;\n  fill: #fff;\n}\n\nhtml[dir=\"rtl\"] .ics-scbanner .menu-image, \nbody[dir=\"rtl\"] .ics-scbanner .menu-image  {\n    margin-left: 0;\n    margin-right: 0.3125rem;\n}\n\n.ics-scbanner > a { position: relative; }\n\n.ics-scbanner > a + a,\n.ics-scbanner > a + .navmenu,\n.ics-scbanner > .navmenu + .navmenu,\n.ics-scbanner > button + .navmenu,\n.ics-scbanner > button + button { margin-left: 0.375rem; }\n\nhtml[dir=\"rtl\"] .ics-scbanner > .navmenu + .navmenu.user,\nbody[dir=\"rtl\"] .ics-scbanner > .navmenu + .navmenu.user { margin-left: 0; }\n\n\n.ics-scbanner > a:focus::before,\n.ics-scbanner > button:focus::before,\n.ics-scbanner > .navmenu:focus::before   {\n  border: 1px solid #ffffff;\n  box-sizing: border-box;\n  content: \"\";\n  height: 75%;\n  left: 0;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n  transform: translateY(-50%);\n  width: 100%;\n}\n\n.ics-scbanner > a:hover::after,\n.ics-scbanner > button:hover::after,\n.ics-scbanner > .navmenu:hover::after {\n  border-bottom: 0.125rem solid #c0e6ff;\n  bottom: 0;\n  content: \"\";\n  height: 100%;\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n  transform: translateX(-50%);\n  position: absolute;\n  width: 100%;\n}\n\n.ics-scbanner > .selected::after {\n  border-bottom: 0.25rem solid #ffffff;\n  bottom: 0;\n  content: \"\";\n  height: 100%;\n  left: 50%;\n  position: absolute;\n  -webkit-transform: translateX(-50%);\n  transform: translateX(-50%);\n  width: 100%;\n}\n\n.ics-scbanner > .selected:hover::after { border-bottom: 0.25rem solid #ffffff; }\n\n.ics-scbanner .navmenu {\n  position: relative;\n  cursor: pointer;\n}\n\n.ics-scbanner .navmenu .navsimplelist {\n  box-shadow: 1px 1px 2px rgba(41, 41, 41, .2);\n  display: none;\n  -webkit-flex-flow: column;\n  flex-flow: column;\n  position: absolute;\n  border: 1px solid rgba(0,0,0,0.1);\n  background-clip: padding-box;\n  color: #333;\n  list-style-type: none;\n  padding: 0.75rem 0;\n  margin: 0;\n  background-color: #fff;\n  cursor: default;\n  z-index: 899; /* must be greater than .nav-popup z-index */\n  left: -1px;\n  top: 40px;\n}\n\n.ics-scbanner .navmenu.show .navsimplelist {\n  display: -webkit-flex;\n  display: flex;\n}\n\n.ics-scbanner .navmenu .navsimplelist > li {\n  white-space: nowrap;\n}\n\n.ics-scbanner .navmenu .navsimplelist > li a {\n  border-bottom: 0.0625rem solid transparent;\n  border-top: 0.0625rem solid transparent;\n  color: #333;\n  cursor: pointer;\n  position: relative;\n  line-height: 2.5em;\n}\n\n.dijit_a11y .ics-scbanner .navsimplelist > li a {\n  border: none;\n}\n\n.ics-scbanner .navsimplelist > li a:focus {\n  border-bottom: 0.0625rem solid #4178be;\n  border-top: 0.0625rem solid #4178be;\n}\n\n.dijit_a11y .ics-scbanner .navsimplelist > li a:focus,\n.dijit_a11y .ics-scbanner .navsimplelist > li a:hover {\n  border: none;\n  outline: 0.0625rem solid currentColor;\n}\n\n.ics-scbanner .navsimplelist > li a:hover:before,\n.ics-scbanner .navsimplelist > li a:hover::after {\n  background-color: #e5e5e5;\n  content: \"\";\n  height: 0.0625rem;\n  left: 50%;\n  position:absolute;\n  -webkit-transform: translateX(-50%);\n  transform: translateX(-50%);\n  width: 85%;\n}\n\n.dijit_a11y .ics-scbanner .navsimplelist > li a:hover:before,\n.dijit_a11y .ics-scbanner .navsimplelist > li a:hover::after { display: none; }\n\n.ics-scbanner .navsimplelist > li a:hover:before { top: 0; }\n\n.ics-scbanner .navsimplelist > li a:hover::after { bottom: 0; } \n\n\n/* menus on the right need to have their submenus right aligned */\n.ics-scbanner .navcenter ~ .navmenu .navsimplelist {\n  right:-1px;\n  left:auto;\n  overflow: hidden;\n}\n\n/* ltr menus on the left will be on the right in rtl mode and need to be right aligned */\nhtml[dir=\"rtl\"] .ics-scbanner .navmenu .navsimplelist,\nbody[dir=\"rtl\"] .ics-scbanner .navmenu .navsimplelist  {\n  right:-1px;\n  left:auto;\n  overflow: hidden;\n}\n\n/* ltr menus on the right will be on the left in rtl mode and need to be left aligned */\nhtml[dir=\"rtl\"] .ics-scbanner .navcenter ~ .navmenu .navsimplelist,\nbody[dir=\"rtl\"] .ics-scbanner .navcenter ~ .navmenu .navsimplelist {\n  left:-1px;\n  right:auto;\n}\n\n/* padding for icons. added the .nav-icon class in a hope to make this more dynamic. \nif we can add this class to any new menu items that are icons it will take on the \nsame behavior*/\n.ics-scbanner .navmenu.offline,\n.ics-scbanner .navmenu.chat,\n.ics-scbanner .navmenu.notifications,\n.ics-scbanner .navmenu.help,\n.ics-scbanner .navmenu.user,\n.ics-scbanner .navmenu.nav-icon {\n  padding: 0 0.375rem;\n}\n\n/* Make the three dots in the center of the chat icont transparent #190937 */\n.ics-scbanner .navmenu.chat .nav-icon svg > circle[class*=\"chat-image-dot\"] {\n  fill-opacity: 0;\n}\n\n/* Increase padding on left side of chat icon so that focus box looks correct when status icon is displayed #190937 */\n.ics-scbanner .navmenu.chat .nav-icon {\n  padding-left: 10px;\n}\n\n/* apps menu grid */\n.ics-scbanner .apps.navmenu.show ul {\n  display: table;\n}\n.ics-scbanner .apps.navmenu ul li {\n  display: table-row;\n}\n.ics-scbanner .apps.navmenu ul li a {\n  display: table-cell;\n  padding: 0 8px;\n}\n\n/* TOURS styles */\n\n/*A span should be added to the markup with \nthe class of .whatsnew-tours-count */\n.ics-scbanner .navsimplelist .whatsnew-tours-count {\n  background: #e71d32;\n  color: #fff;\n  font-size: 11px;\n  font-weight: bold;\n  line-height: 1.35;\n  text-align: center;\n  visibility: hidden;\n  margin-left: 5px;\n  margin-right: auto;\n  padding-right: 6px;\n  padding-left: 6px;\n}\n\nhtml[dir=\"rtl\"] .ics-scbanner .navsimplelist .whatsnew-tours-count,\nbody[dir=\"rtl\"] .ics-scbanner .navsimplelist .whatsnew-tours-count  {\n  margin-left: auto;\n  margin-right: 5px;\n}\n\n/* This is styled with the understanding that a class of .new-thing will be added to a parent element when the dot (.notification-dot) should appear. \nA span should be added to the markup with the class of .notification-dot */\n.ics-scbanner .notification-dot {\n    background: #FF504F;\n    border: 1px solid #325c80;\n    border-radius: 50%;\n    box-sizing: border-box;\n    content: '';\n    height: 9px;\n    left: 18px;\n    right: auto;\n    position: absolute;\n    top: 9px;\n    visibility: hidden;\n    width: 9px;\n    z-index: 1;   \n}\n\nhtml[dir=\"rtl\"] .ics-scbanner .notification-dot,\nbody[dir=\"rtl\"] .ics-scbanner .notification-dot  {\n  left: auto;\n  right: 18px;\n}\n\n.ics-scbanner .whatsnew-tours .notification-dot,\n.ics-scbanner .whatsnew-tours .whatsnew-tours-count  { visibility: visible; }\n.ics-scbanner .guided-tours .notification-dot,\n.ics-scbanner .guided-tours .guided-tours-count  { visibility: visible; }\n\n.ics-scbanner .whatsnew-tours .hidden,\n.ics-scbanner .guided-tours .hidden {\n  display: none !important;\n}\n\n.ics-scbanner .nav-disabled {\n  color: #c7c7c7 !important;\n    }\n    \n.ics-scbanner .nav-disabled a:hover {\n    cursor: default !important;\n}\n\n/* popups */\n.nav-popup {\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: column;\n  flex-direction: column;\n  position: absolute;\n  background-color: #4178be;\n  padding: 20px; \n  border-top: 2px solid #ffffff; \n  transition-timing-function: ease-in;\n  transition-property: height;\n  transition-duration: 100ms;\n  visibility: visible;\n  height: 155px;\n  z-index: 898; /* must be less than .ics-scbanner .navmenu .navsimplelist z-index */\n}\n\n.nav-popup.hidden {\n  visibility: hidden;\n  height: 0px;\n}\n\n\n.nav-popup .action-bar {\n  display: -webkit-flex;\n  display: flex;\n  -webkit-align-items: center;\n  align-items: center;\n  background-color: #4178be;\n  color: #fff;\n  /*height: 34px;*/\n  z-index: 2;\n  white-space: nowrap\n}\n\n.nav-popup .action-bar .title {\n  -webkit-flex: 1;\n  flex: 1;\n  font-size: 1.25em; \n  font-weight: normal;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  padding-bottom: 5px;\n  /*height: 18px;*/\n  letter-spacing: .03em;\n  -webkit-font-smoothing: initial\n}\n\n.nav-popup .action-bar .action {\n  width: 16px;\n  height: 16px;\n  cursor: pointer;\n  padding: 0;\n  margin-bottom: 5px;\n  fill: #ffffff; /* fills the \"X\" svg with white */\n}\n\n.nav-popup .close:focus, .nav-popup .close:hover {\n  outline: thin dotted #ffffff;\n}\n\n.nav-popup .close {\n  background-color: transparent;\n  border: 0 none;\n}\n\n.nav-popup .content-footer {\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: row;\n  flex-direction: row;\n  justify-content: flex-end;\n  -webkit-justify-content: flex-end;\n}\n\n.nav-popup .content-footer button {\n  background-color: #ffffff; \n  color: #4178be; \n  text-align: center; \n  margin: 20px 0px 0px; \n  border: none;\n  padding: 12px 6px 12px;\n  cursor: pointer;\n  font-size: inherit;\n  white-space: nowrap;\n  height: unset;\n}\n\n.nav-popup .content-footer button:focus, .nav-popup .content-footer button:hover {\n  /*border: 1px solid #325C80;*/\n  outline: thin dotted #ffffff;\n}\n\n/* These classes are specific to \"Room\" and will be moved out when we develop full support for adopting external popups */\n.room .roomlink-label {\n  padding-bottom: 5px;\n}\n\n.room .roomlink {\n  background-color: #4178be; \n  line-height: \n  px; \n  padding: 5px; \n  color: #ffffff; \n  border: 1px solid #ffffff;\n}\n\n.room .roomlink:focus {\n  outline: thin dotted #ffffff; \n}\n\n/**\n * Theme\n * Hikari (verse) is default. We'll override a background color for gen4 and colour themes. Custom theme is set by javascript.\n */\n.gen4.ics-scbanner {\n  background: #3c4044;\n  background: -moz-linear-gradient(top, #3c4044 0%, #151718 100%);\n  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #3c4044), color-stop(100%, #151718));\n  background: -webkit-linear-gradient(top, #3c4044 0%, #151718 100%);\n  background: -ms-linear-gradient(top, #3c4044 0%, #151718 100%);\n  background: linear-gradient(to bottom, #3c4044 0%, #151718 100%);\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#3c4044', endColorstr='#151718', GradientType=0);\n}\n\n.colour.ics-scbanner {\n  background: #000;\n  background: -moz-linear-gradient(top, #525252 0%, #000 100%);\n  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #525252), color-stop(100%, #000));\n}\n\n\n/**\n * In order to 'float' some items left and right, a spacer node is used with an auto margin.\n * Elements with a lower order attribute appear to the left of this node.\n * Elements with a higher order attribute appear to the right of this node.\n */\n.ics-scbanner .navcenter {\n  margin-right:auto;\n}\n\n\n/* flexbox order of elements in navigation */\n/* orglogo and org share same order but will be correctly positioned based on the order\n * they are added to the DOM\n */\n.ics-scbanner .orglogo {\n  -webkit-order:1;\n  order:1;\n  height:inherit;\n}\n\n.ics-scbanner .org {\n  -webkit-order:1;\n  order:1;\n}\n\n.ics-scbanner .backto {\n  -webkit-order:2;\n  order:2;\n}\n\n.ics-scbanner .home {\n  -webkit-order:2;\n  order:2;\n}\n\n.ics-scbanner .mail {\n  -webkit-order:3;\n  order:3;\n}\n\n.ics-scbanner .calendar {\n  -webkit-order:4;\n  order:4;\n}\n\n.ics-scbanner .people {\n  -webkit-order:20;\n  order:20;\n}\n\n/* people menu links. each of these must have order greater than .people, and less than the next top level menu (order) in case one of the menu links gets promoted to top level */\n.myprofile {\n  -webkit-order:21;\n  order:21;\n}\n\n.ics-scbanner .mycontacts {\n  -webkit-order:22;\n  order:22;\n}\n\n.ics-scbanner .mailcontacts {\n  -webkit-order:23;\n  order:23;\n}\n\n.ics-scbanner .mynetwork {\n  -webkit-order:24;\n  order:24;\n}\n\n.ics-scbanner .orgdir {\n  -webkit-order:25;\n  order:25;\n}\n/* end people menu */\n\n.ics-scbanner .communities {\n  -webkit-order:30;\n  order:30;\n}\n/* community menu links. each of these must have order greater than .communities, and less than the next top level menu (order) in case one of the menu links gets promoted to top level */\n/* TODO Communities menu comes from API call. need to use  API \"order\" as selector name */\n/* end communities menu */\n\n.ics-scbanner .files._top {\n  -webkit-order:39;\n  order: 39;\n}\n\n.ics-scbanner .apps {\n  -webkit-order:40;\n  order: 40;\n}\n\n/* apps menu links. each of these must have order greater than .apps, and less than the next top level menu (order) in case one of the menu links gets promoted to top level */\n.ics-scbanner .activities {\n  -webkit-order:41;\n  order: 41;\n}\n\n.ics-scbanner .activitiestodo {\n  -webkit-order:42;\n  order: 42;\n}\n\n.ics-scbanner .activitieshighp {\n  -webkit-order:43;\n  order: 43;\n}\n\n.ics-scbanner .files._apps {\n  -webkit-order:44;\n  order: 44;\n}\n\n.ics-scbanner .filessharedme {\n  -webkit-order:45;\n  order: 45;\n}\n\n.ics-scbanner .filespinned {\n  -webkit-order:46;\n  order: 46;\n}\n\n.ics-scbanner .stmeetings {\n  -webkit-order:47;\n  order: 47;\n}\n\n.ics-scbanner .stmeetingshost {\n  -webkit-order:48;\n  order: 48;\n}\n\n.ics-scbanner .meetings {\n  -webkit-order:49;\n  order: 49;\n}\n\n.ics-scbanner .meetingshost {\n  -webkit-order:50;\n  order: 50;\n}\n\n.ics-scbanner .events {\n  -webkit-order:51;\n  order: 51;\n}\n\n.ics-scbanner .eventscreate {\n  -webkit-order:52;\n  order: 52;\n}\n\n.ics-scbanner .eventstoday {\n  -webkit-order:53;\n  order: 53;\n}\n\n.ics-scbanner .forms {\n  -webkit-order:54;\n  order: 54;\n}\n\n.ics-scbanner .joinmeeting {\n  -webkit-order:55;\n  order: 55;\n}\n\n.ics-scbanner .mailswitchdom {\n  -webkit-order:56;\n  order: 56;\n}\n\n.ics-scbanner .mailswitchverse {\n  -webkit-order:57;\n  order: 57;\n}\n\n.ics-scbanner .mailnotebook {\n  -webkit-order:58;\n  order: 58;\n}\n\n.ics-scbanner .mailtodo {\n  -webkit-order:59;\n  order: 59;\n}\n\n.ics-scbanner .ediscovery {\n  -webkit-order:60;\n  order: 60;\n}\n/* end apps menu */\n\n.ics-scbanner .navcenter {\n  margin-right:auto;\n  -webkit-order:100;\n  order: 100;\n}\n\n.ics-scbanner .offeringadmin {\n  -webkit-order:200;\n  order:200;\n}\n\n.ics-scbanner .adminsupport {\n  -webkit-order:201;\n  order:201; \n}\n\n.ics-scbanner .admin {\n  -webkit-order:210;\n  order:210;\n}\n\n.ics-scbanner .chat {\n  -webkit-order:300;\n  order:300;\n}\n\n\n/*help*/\n.ics-scbanner .help {\n  -webkit-order:400;\n  order:400;\n}\n\n.ics-scbanner .contexthelp {\n  -webkit-order:405;\n  order:405;\n}\n\n.ics-scbanner .adminhelp {\n  -webkit-order:410;\n  order:410;\n}\n\n.ics-scbanner .helpcentral {\n  -webkit-order:415;\n  order:415;\n}\n\n.ics-scbanner .whatsnew,\n.ics-scbanner .whatsnew-tours {\n  -webkit-order:420;\n  order:420;\n}\n\n.ics-scbanner .guided-tours {\n  -webkit-order:425;\n  order:425;\n}\n\n.ics-scbanner .gettingstarted {\n  -webkit-order:430;\n  order:430;\n}\n\n.ics-scbanner .additionalresources {\n  -webkit-order:435;\n  order:435;\n}\n\n.ics-scbanner .userassistant {\n  -webkit-order:440;\n  order:440;\n}\n\n.ics-scbanner .feedback {\n  -webkit-order:445;\n  order:445;\n}\n\n.ics-scbanner .legalnotices {\n  -webkit-order:450;\n  order:450;\n}\n\n/* user menu links. each of these must have order greater than .user, and less than the next top level menu (order) in case one of the menu links gets promoted to top level */\n.ics-scbanner .user {\n  -webkit-order:500;\n  order:500;\n}\n\n.ics-scbanner .userprofile {\n  -webkit-order:505;\n  order:505;\n}\n\n.ics-scbanner .usernotify {\n  -webkit-order:510;\n  order:510;\n}\n\n.ics-scbanner .usersettings {\n  -webkit-order:515;\n  order:515;\n}\n\n.ics-scbanner .downloads {\n  -webkit-order:520;\n  order:520;\n}\n\n.ics-scbanner .userreports {\n  -webkit-order:525;\n  order:525;\n}\n\n.ics-scbanner .invite {\n  -webkit-order:530;\n  order:530;\n}\n\n.ics-scbanner .marketplace {\n  -webkit-order:535;\n  order:535;\n}\n\n.ics-scbanner .logout {\n  -webkit-order:540;\n  order:540;\n}\n\n/* TODO: this probably needs to go in a Mail.Next specific CSS file and not here */\n.ics-scbanner .sametime-button {\n  -webkit-order:300;\n  order:300;\n}\n\n.ics-scbanner .vendorlogout {\n  -webkit-order:600;\n  order:600;\n}\n\n.ics-scbanner .hidden {\n\tvisibility:hidden;\n}\n",""]);
},function(_76,_77,_78){
var _79,_7a;
!(_79=[_78(10)],_7a=function(_7b){
return new _7b(".ics-scbanner").create();
}.apply(_77,_79),_7a!==undefined&&(_76.exports=_7a));
},function(_7c,_7d,_7e){
var _7f,_80;
!(_7f=[_7e(11),_7e(24),_7e(25),_7e(26),_7e(27),_7e(28),_7e(12),_7e(22),_7e(13)],_80=function(_81,_82,_83,_84,_85,_86,_87,_88,has){
var _89;
function _8a(_8b){
if(typeof _8b==="string"){
_8b=document.querySelector(_8b);
}
var cfg=new _85(_8b,function Banner_NavbarData_ready(){
if(has("bvt")){
console.log("*NAVBAR Banner: NavbarData is ready.");
}
_87.addAttribute(new Array(_8b),"ver","1.0");
var _8c=cfg.getSetting("nonverse");
if(_8c==="true"){
_89="";
}else{
_89="_blank";
}
vorglink=_8d();
_8e();
if(has("bvt")){
console.log("*NAVBAR Banner: Adding markup");
}
_8f();
_90();
_91();
_92();
_93();
_94();
_95();
_96();
_97();
_98();
_99();
_9a();
if(has("bvt")){
console.log("*NAVBAR Banner: Adding tours");
}
_87.addCustomCharacteristics(_8b,"updateWhatsNewTours");
_87.addCustomCharacteristics(_8b,"updateGuidedTours");
if(has("bvt")){
console.log("*NAVBAR Banner: DOM reorder");
}
_9b();
_9c(".user.navmenu");
if(has("bvt")){
console.log("*NAVBAR Banner: Adding extensions");
}
_9d();
var _9e=cfg.getSetting("theme");
if(has("bvt")){
console.log("*NAVBAR Banner: preparing to apply theme, cfg.hastheme: "+cfg.getSetting("hastheme"));
}
if(cfg.getSetting("hastheme")&&_9e){
_87.applyTheme(_8b,_9e,cfg.getSetting("navigationcolour"),cfg.getSetting("navigationtextcolour"));
}
if(has("bvt")){
console.log("*NAVBAR Banner: Show navbar -------");
}
_87.removeAttribute(new Array(_8b),"class","loading");
if(has("bvt")){
console.log("*NAVBAR Banner: navbar html fragment: "+_8b.outerHTML.substring(0,300)+" ...");
}
});
_8a.prototype.getNavbarData=function(){
return cfg;
};
_8a.prototype.create=function(){
if(has("bvt")){
console.log("*NAVBAR Banner.create -------");
}
if(!_8b){
return;
}
cfg.create();
};
function _8e(){
var _9f=_8b.childNodes;
for(var i=0;i<_9f.length;i++){
if(_9f[i].className){
if(_9f[i].className.split(" ").indexOf("navmenu")===-1){
var _a0=new _81();
_a0.adopt(_9f[i]);
}else{
var _a1=new _82();
_a1.adopt(_9f[i]);
}
}
}
};
function _8d(){
var _a2=cfg.getSetting("vorgid");
var _a3="";
if(_a2!=null&&_a2!==""){
_a3="org/"+_a2+"/";
}
return _a3;
};
function _8f(){
if(cfg.navbar_data.img_path&&cfg.navbar_data.contexthelp){
var _a4="$$$srvphp$"+cfg.navbar_data.img_path;
_a5({"where":_8b,"img":_a4,"imgCls":"orglogo","onError":"true"});
}
};
function _90(){
if(!cfg.hasGatekeeper("CONNECTIONS_VISITOR_MODEL_FOR_ORG")){
if(!cfg.hasRole("Guest")){
if(cfg.hasOffering("engage")||cfg.hasOffering("connections")){
_a6({"where":_8b,"text":"$$$orgname$","url":"$$$srvphp$/contacts/orgprofiles/partnerPage/$$$custid$","target":_89,"selector":"org _myorg"});
}else{
_a7({"where":_8b,"text":"$$$orgname$","selector":"org _nomyorg"});
}
}
}else{
var _a8={"where":_8b,"text":"$$$orgname$","selector":"visitors","id":"visitorMenu_container","role":"button","ariaLabel":"visitor.text"};
var _a9=new _82(_a8,cfg.navbar_data);
_a9.defineRow([{"type":"text","dyn":"navbar_dyn_visitor","target":"_blank","text":"loading.text","includeScript":["$$$navapi$/navbar/proxy?service=visitor&id=navbar_dyn_visitor&parentMenu=visitorMenu&callback=navigation_replace_dyn_link_placeholder&subscriber=$$$subscriberid$"]}]);
_a9.create();
}
};
function _aa(_ab){
if(_86[_ab]&&_86[_ab].indexOf("tobeadded")==-1){
return (_86[_ab]);
}else{
return _ab;
}
};
function _9d(){
if(cfg.hasGatekeeper("NAVIGATION_VERSE_EXTENSIONS")){
var _ac=cfg.navbar_data;
if(_ac&&_ac.ssraw){
var _ad=_ac.ssraw;
for(var cnt=0;cnt<_ad.length;cnt++){
var _ae=_ad[cnt].split("@");
var _af=_ae[3];
var cmd=_ae[4];
var _b0=_ae[5];
var _b1=null;
if(_b0){
try{
_b1=eval("("+_b0+")");
}
catch(e){
console.log("Unable to process mod extension:"+_b0);
continue;
}
}
var _b2=_af;
if(cfg.hasGatekeeper("NAVIGATION_VERSE_EXTENSIONS_LEGACY_PATH")){
_af=_aa(_af);
}
if(_af==null){
_af=_b2;
}
var _b3=_8b.querySelector(_af);
if(_b3&&(_b3!=null)&&_b1&&(typeof (_b1.items)!=="undefined")){
var _b4=_b1.text;
_b4=_b4.replace(/ /g,"_");
var _b5={"where":_b3,"text":_b1.text,"selector":"ss_"+_b4+" navmenu","id":_b4,"role":"button"};
var _b6=new _82(_b5,cfg.navbar_data);
for(var i=0;i<_b1.items.length;i++){
_b6.defineRow([{"type":"link","text":_b1.items[i].text,"target":_89,"selector":_b1.items[i].text,"url":_b1.items[i].url}]);
}
if(_b1.items&&_b1.items.length>0){
_b6.create();
var _b7=_8b.querySelector(".ss_"+_b4);
var _b8=window.getComputedStyle(_b3,null).getPropertyValue("order");
if(_b8===""){
_b8=window.getComputedStyle(_b3,null).order;
}
if(_b7){
_b7.style.order=_b8;
}
if(cmd.indexOf("before")!=-1){
_87.insertBefore(_b7,_b3);
}else{
_87.insertAfter(_b7,_b3);
}
}else{
if(_b1.url&&(_b1.url.length>0)){
if(cmd.indexOf("before")!=-1){
_b9({"where":_b3,"text":_b1.text,"url":_b1.url,"target":_89,"selector":"extlink"});
}else{
if(cmd.indexOf("after")!=-1){
_ba({"where":_b3,"text":_b1.text,"url":_b1.url,"target":_89,"selector":"extlink"});
}
}
}
}
}else{
if(_b3&&_b3!=null){
if(cmd.indexOf("before")!=-1){
_b9({"where":_b3,"text":_b1.text,"url":_b1.url,"target":_89,"selector":"extlink"});
}else{
if(cmd.indexOf("after")!=-1){
_ba({"where":_b3,"text":_b1.text,"url":_b1.url,"target":_89,"selector":"extlink"});
}else{
if(cmd.indexOf("delete")!=-1){
_bb({"where":_b3,"text":"notused","url":"https://fakelink.com","target":_89,"selector":"extlink"});
}else{
if(cmd.indexOf("replace")!=-1){
_bc({"where":_b3,"text":_b1.text,"url":_b1.url,"target":_89,"selector":"extlink"});
}
}
}
}
}
}
}
}
}
};
function _91(){
if(cfg.getSetting("partner")){
_a6({"where":_8b,"text":"back.to.lotuslive.short","title":"back.to.lotuslive","url":"$$$srvbssui$/manage/account/dashboardHandler/input","target":_89,"selector":"backto"});
}
};
function _92(){
if(cfg.hasEntitlement("bh_dashboard")&&!cfg.hasEntitlement("dom_mail__allowFreemium")){
if(!cfg.hasOffering("connections-files")){
_a6({"where":_8b,"text":"dashboard.text","url":"$$$srvphp$/"+vorglink+"homepage/","target":_89,"selector":"home _astream","id":"ics-scbanner-home"});
}else{
_a6({"where":_8b,"text":"efss.home.text","url":"$$$srvphp$/"+vorglink+"homepage/","target":_89,"selector":"home _efss","id":"ics-scbanner-home"});
}
}
};
function _93(){
var _bd=_be("reskin-calendar-view");
if(cfg.hasEntitlement("dom_mail")){
_a6({"where":_8b,"text":"notesMail.text","url":"$$$srvnotesmail$/livemail/iNotes/Mail/?OpenDocument","target":_89,"selector":"mail _dom"});
_a6({"where":_8b,"text":"mailCalendar","url":"$$$srvnotesmail$/livemail/iNotes/Calendar/?OpenDocument"+_bd,"target":_89,"selector":"calendar _dom"});
}
if(cfg.hasEntitlement("dom_mail2")){
_a6({"where":_8b,"text":"notesMail.text","url":"$$$srvnotesmail2$/livemail/iNotes/Mail/?OpenDocument","target":_89,"selector":"mail _dom2"});
_a6({"where":_8b,"text":"mailCalendar","url":"$$$srvnotesmail2$/livemail/iNotes/Calendar/?OpenDocument"+_bd,"target":_89,"selector":"calendar _dom2"});
}
if(cfg.hasEntitlement("yun_mail")){
_a6({"where":_8b,"text":"yunMail.text","url":"$$$srvyunmail$/auth/passive?id=$$$subscriberid$","target":_89,"selector":"mail _yun"});
_a6({"where":_8b,"text":"yunCalendar.text","url":"$$$srvyunmail$/calendar/?id=$$$subscriberid$","target":_89,"selector":"calendar _yun"});
}
};
function _be(_bf){
var _c0="";
var _c1="&ui=portal&sq";
switch(_bf){
case "reskin-calendar-view":
if(has(_bf)){
_c0="&PresetFields=s_CustomCSS;%2Fsequoia%2Fhome%2Fsequoia-source%2Fapp%2Finotes%2Fstyles%2Fcustomcv%2Ecss";
_c0+=_c1;
}
break;
}
return _c0;
};
function _94(){
var _c2={"type":"link","text":"mailContacts","target":_89,"selector":"mailcontacts","url":"$$$srvnotesmail$/livemail/iNotes/Contacts/?OpenDocument"};
if(cfg.hasEntitlement("dom_mail__allowFreemium")){
_c2.where=_8b;
_a6(_c2);
}else{
var _c3={"where":_8b,"text":"people.text","selector":"people","id":"networkMenu_container","role":"button","ariaLabel":"people.text"};
var _c4=new _82(_c3,cfg.navbar_data);
if(cfg.hasEntitlement("bh_contacts")&&vorglink===""){
if(!cfg.hasRole("Guest")){
_c4.defineRow([{"type":"link","text":"myprofile.text","target":_89,"selector":"myprofile _notguest","url":"$$$srvphp$/profiles/html/profileView.do?userid=$$$subscriberid$"}]);
}else{
_c4.defineRow([{"type":"link","text":"myprofile.text","target":_89,"selector":"myprofile _guest","url":"$$$srvphp$/contacts/profiles/view/$$$subscriberid$"}]);
}
_c4.defineRow([{"type":"link","text":"socialcontacts.text","target":_89,"selector":"mycontacts","url":"$$$srvphp$/mycontacts/home.html"}]);
}
if(cfg.hasEntitlement("dom_mail")&&vorglink===""){
_c4.defineRow([_c2]);
}
if(cfg.hasEntitlement("dom_mail2")){
_c4.defineRow([{"type":"link","text":"mailContacts","target":_89,"selector":"mailcontacts","url":"$$$srvnotesmail2$/livemail/iNotes/Contacts/?OpenDocument"}]);
}
if(cfg.hasEntitlement("bh_contacts")&&vorglink===""){
_c4.defineRow([{"type":"link","text":"my_network.text","target":_89,"selector":"mynetwork","url":"$$$srvphp$/mycontacts/home.html#/network"}]);
if(!cfg.hasRole("Guest")&&vorglink===""){
_c4.defineRow([{"type":"link","text":"directory.text","target":_89,"selector":"orgdir","url":"$$$srvphp$/profiles/html/searchProfiles.do"}]);
}
}
_c4.create();
}
};
function _95(){
if(cfg.hasEntitlement("bh_communities")){
if(cfg.hasGatekeeper("NAVIGATION_REPLACE_COMMUNITIES_MENU_WITH_LINK")){
_a6({"where":_8b,"text":"communities.text","selector":"communities","id":"communitiesMenu_container","ariaLabel":"communities.text","url":"$$$srvphp$/"+vorglink+"communities/service/html/mycommunities"});
}else{
var _c5={"where":_8b,"text":"communities.text","selector":"communities","id":"communitiesMenu_container","role":"button","ariaLabel":"communities.text"};
var _c6=new _82(_c5,cfg.navbar_data);
_c6.defineRow([{"type":"text","dyn":"navbar_dyn_communities","target":_89,"text":"loading.text","includeScript":["$$$navapi$/navbar/proxy?service=communities&id=navbar_dyn_communities&parentMenu=communitiesMenu&callback=navigation_replace_dyn_link_placeholder&subscriber=$$$subscriberid$"]}]);
_c6.create();
}
}
};
function _96(){
var _c7={"type":"link","target":_89,"text":"files.text","url":"$$$srvphp$/"+vorglink+"files/"};
var _c8={"where":_8b,"text":"servicesMenu.text","selector":"apps","id":"servicesMenu_container","role":"button","ariaLabel":"servicesMenu.text"};
if(cfg.hasEntitlement("dom_mail__allowFreemium")&&cfg.hasGatekeeper("NAVIGATION_SPEEDCAST_ROOM_MEETING")){
_c7.selector="files _apps";
var _c9={"type":"link","selector":"roomMeeting","target":_89,"text":_88["room.host.meeting.text"],"onclick":"openRoomMeetingPopup","class":"ignoreFocus"};
var _ca=new _82(_c8,cfg.navbar_data);
_ca.defineRow([_c7]);
_ca.defineRow([_c9]);
_ca.create();
return;
}
if((cfg.hasEntitlement("dom_mail__allowFreemium")&&!cfg.hasGatekeeper("NAVIGATION_SPEEDCAST_ROOM_MEETING"))||cfg.hasOffering("connections-files")){
_c7.where=_8b;
_c7.selector="files _top";
_a6(_c7);
}
if(!cfg.hasEntitlement("dom_mail__allowFreemium")){
_c7.selector="files _apps";
var _ca=new _82(_c8,cfg.navbar_data);
if(cfg.hasEntitlement("bh_activities")){
_ca.defineRow([{"type":"link","selector":"activities","target":_89,"text":"activities.text","url":"$$$srvphp$/"+vorglink+"activities/service/html/mainpage"},{"type":"link","selector":"activitiestodo","target":_89,"text":"activities.todolist.text","url":"$$$srvphp$/"+vorglink+"activities/service/html/mainpage#todolist"},{"type":"link","selector":"activitieshighp","target":_89,"text":"activities.priority.text","url":"$$$srvphp$/"+vorglink+"activities/service/html/mainpage#dashboard,highpriority"}]);
}
if(cfg.hasEntitlement("bh_filer")&&!cfg.hasOffering("connections-files")){
_ca.defineRow([_c7,{"type":"link","selector":"filessharedme","target":_89,"text":"filer.shared.text","url":"$$$srvphp$/"+vorglink+"files/app#/shares?pivot=withme"},{"type":"link","selector":"filespinned","target":_89,"text":"filer.pinned.text","url":"$$$srvphp$/"+vorglink+"files/app#/pinnedfiles"}]);
}
if(cfg.hasEntitlement("sametime_meeting")){
_ca.defineRow([{"type":"link","selector":"stmeetings","target":_89,"text":"stmeetings.text","url":"$$$srvphp$/meetings/sthome"},{"type":"link","selector":"stmeetingshost","target":_89,"text":"host.meeting.text","onclick":"openSTMeetingPopup"}]);
}
if(cfg.hasEntitlement("events")){
_ca.defineRow([{"type":"link","selector":"events","target":_89,"text":"events.text","url":"$$$srvevents$/portal/default.php"},{"type":"link","selector":"eventscreate","target":_89,"text":"create.event.text","url":"$$$srvevents$/portal/wippages/createevent.php"},{"type":"link","selector":"eventstoday","target":_89,"text":"today.event.text","url":"$$$srvevents$/portal/default.php"}]);
}
if(cfg.hasEntitlement("bh_forms")){
_ca.defineRow([{"type":"OFF","selector":"forms","target":_89,"text":"forms.text","url":"$$$srvphp$/forms/start/survey"}]);
}
if(!cfg.hasOffering("engage")&&!cfg.hasOffering("meeting")&&!cfg.hasOffering("meetings")&&!cfg.hasOffering("events")&&!cfg.hasOffering("notes_bundle")&&!cfg.hasOffering("sametime-chat")&&!cfg.hasOffering("connections-files")&&!cfg.hasOffering("connections-verse")&&cfg.hasRole("User")){
_ca.defineRow([{"type":"link","selector":"joinmeeting","target":_89,"text":"joinmeetings.text","url":"$$$srvmeetings$/join"}]);
}
if(cfg.hasEntitlement("dom_mail")){
_ca.defineRow([{"type":"link","selector":"mailswitchdom","target":_89,"text":"notesMail.product.text","url":"$$$srvnotesmail$/livemail/iNotes/Mail/?OpenDocument&noredir=1"}]);
if(cfg.hasEntitlement("dom_mail__allowMailNext")){
_ca.defineRow([{"type":"link","selector":"mailswitchverse","target":_89,"text":"verse.product.text","url":"$$$srvnotesmail$/sequoia/index.html"}]);
}
_ca.defineRow([{"type":"link","selector":"mailnotebook","target":_89,"text":"mailNotebook","url":"$$$srvnotesmail$/livemail/iNotes/Notebook/?OpenDocument&noredir=1"}]);
_ca.defineRow([{"type":"link","selector":"mailtodo","target":_89,"text":"mailToDo","url":"$$$srvnotesmail$/livemail/iNotes/ToDo/?OpenDocument&noredir=1"}]);
}
if(cfg.hasEntitlement("dom_mail2")){
if(cfg.hasEntitlement("dom_mail__allowMailNext")||cfg.hasOffering("connections-verse")){
_ca.defineRow([{"type":"link","selector":"mailswitch _dom2","target":_89,"text":"notesMail.product.text","url":"$$$srvnotesmail$/livemail/iNotes/Mail/?OpenDocument&noredir=1"}]);
}
_ca.defineRow([{"type":"link","selector":"mailnotebook","target":_89,"text":"mailNotebook","url":"$$$srvnotesmail2$/livemail/iNotes/Notebook/?OpenDocument&noredir=1"}]);
_ca.defineRow([{"type":"link","selector":"mailtodo","target":_89,"text":"mailToDo","url":"$$$srvnotesmail2$/livemail/iNotes/ToDo/?OpenDocument&noredir=1"}]);
}
if(cfg.hasRole("eDiscovery__Admin")||cfg.hasRole("eDiscovery__User")){
_ca.defineRow([{"type":"link","selector":"ediscovery","target":"_blank","text":"eDiscovery.text","url":"$$$srvediscovery$","MISSING":"special behaviors new window"}]);
}
_ca.defineRow([{"type":"text","dyn_ext":"navbar_dyn_extensions","target":_89,"text":"loading.text","max_cols":"3","includeScript":["$$$navapi$/navbar/proxy?service=extensions&id=navbar_dyn_extensions&subscriber=$$$subscriberid$"]}]);
_ca.create();
}
};
function _97(){
var _cb=document.createElement("div");
_cb.innerHTML="<div class=\"navcenter\"></div>";
_8b.appendChild(_cb.firstElementChild);
};
function _98(){
if(cfg.hasRole("OfferingManager")||cfg.hasRole("OfferingImporter")){
_a6({"where":_8b,"selector":"adminoffering","text":"offeringManagement.text","url":"$$$srvbssui$/manage/offering/offeringList/input","target":_89});
}
if(cfg.hasRole("Support")&&!(cfg.hasRole("CustomerAdministrator")||cfg.hasRole("CSR")||cfg.hasRole("CSRManager")||cfg.hasRole("UserAccountAssistant"))){
_a6({"where":_8b,"selector":"adminsupport","text":"admin.text","url":"$$$srvbssui$/manage/account/csgList/input","target":_89});
}
var _cc={"where":_8b,"id":"bss-adminMenu","selector":"admin","text":"admin.text","role":"button","ariaLabel":"admin.text"};
var _cd=new _82(_cc,cfg.navbar_data);
if(cfg.hasRole("CustomerAdministrator")||cfg.hasRole("CSR")||cfg.hasRole("CSRManager")||cfg.hasRole("UserAccountAssistant")){
_cd.defineRow([{"type":"link","selector":"manageorg","text":"manageOrg.text","target":_89,"url":"$$$srvbssui$/manage/subscribers/companyList/input"}]);
}
if(cfg.hasMarketplace()){
var _ce=cfg.getSetting("orgsub");
var _cf="";
if(_ce){
_cf="?subID="+_ce;
}
_cd.defineRow([{"type":"link","text":"manageUseProd.text","target":"_blank","selector":"manageuseprod","url":"https://myibm.ibm.com/products-services/"+_cf}]);
}
if(cfg.hasRole("CSR")){
_cd.defineRow([{"type":"link","selector":"audioreports _csr","text":"admin.audioReports.text","target":_89,"url":"$$$srvbssui$/rptweb/reports/index.jsp?type=admin"}]);
}
if(cfg.hasRole("CustomerAdministrator")&&!cfg.hasRole("CSR")&&(cfg.hasOrgEntitlement("sametime_meeting__pc_audio")||cfg.hasOrgEntitlement("sametime_meeting"))){
_cd.defineRow([{"type":"link","selector":"audioreports _custadmin","text":"admin.audioReports.text","target":_89,"url":"$$$srvbssui$/rptweb/reports/index.jsp?type=admin"}]);
}
if((cfg.hasRole("CustomerAdministrator")||cfg.hasRole("CSR")||cfg.hasRole("CSRManager")||cfg.hasRole("UserAccountAssistant")||cfg.hasRole("Ops")||cfg.hasRole("OpsManager"))&&!cfg.hasVendor("vendor__odin_marketplace")){
_cd.defineRow([{"type":"link","selector":"sitemap","text":"adminSiteMap.text","target":_89,"url":"$$$srvbssui$/manage/navigation/sitemap/input"}]);
}
var _d0=_87.replacePlaceHolders("$$$srvenableecommerce$",cfg.navbar_data);
if((cfg.hasRole("CustomerAdministrator")&&!cfg.hasVendor("vendor__odin_marketplace"))&&_d0==="true"){
_cd.defineRow([{"type":"link","selector":"buycloud","text":"buyCloud.text","target":_89,"specialBehaviors":[{"NEW_WINDOW":{}},{"NON_IBM":{}}],"url":"$$$srvbssui$/manage/buy/initBuy/input"}]);
}
_cd.create();
};
function _d1(){
if(cfg.hasEntitlement("lc_news")){
_a6({"where":_8b,"type:":"link","text":"notifications.text.short","title":"notifications.text","includeScript":["$$$srvphp$/connections/resources/web/com.ibm.social.as/notification/NotificationLauncher.js?id=notificationsMenu"],"selector":"notifications","img":"?.svg","imgOnly":true,"target":_89});
}
};
function _99(){
var _d2={"where":_8b,"id":"bss-usersMenu","text":"settingsLink.text","selector":"user","imgOnly":true,"role":"button","ariaLabel":"settingsLink.text"};
if(cfg.hasEntitlement("bh_contacts")){
if(!cfg.hasRole("Guest")){
_d2.img="$$$srvphp$/"+vorglink+"profiles/photo.do?uid=$$$subscriberid$";
}else{
_d2.img="$$$srvphp$/contacts/profiles/photo/$$$subscriberid$";
}
_d2.imgCls="avatar";
}else{
_d2.img="avatar.svg";
}
var _d3=new _82(_d2,cfg.navbar_data);
if(cfg.hasEntitlement("bh_contacts")&&!cfg.hasRole("Guest")){
_d3.defineRow([{"type":"link","selector":"userprofile","text":"myprofile.text","target":_89,"url":"$$$srvphp$/"+vorglink+"profiles/html/profileView.do?userid=$$$subscriberid$"}]);
}
if(cfg.hasEntitlement("lc_news")&&!cfg.hasEntitlement("dom_mail__allowFreemium")){
_d3.defineRow([{"type":"link","selector":"usernotify","text":"notification_pref.text","target":_89,"url":"$$$srvphp$/news/web/notificationSettingsSC.action"}]);
}
_d3.defineRow([{"type":"link","selector":"usersettings","text":"settingsLink.text","target":_89,"url":"$$$srvbssui$/manage/account/user/input"}]);
if((!cfg.hasEntitlement("dom_mail__allowFreemium"))&&cfg.hasGatekeeper("NAVIGATION_DOWNLOADS_LINK")){
_d3.defineRow([{"type":"link","selector":"downloads","target":_89,"text":"downloads.text","url":"$$$srvphp$/downloads/"}]);
}
if(cfg.hasEntitlement("sametime_meeting__pc_audio")||cfg.hasEntitlement("sametime_meeting")){
_d3.defineRow([{"type":"link","selector":"userreports","text":"user.audioReports.text","target":_89,"url":"$$$srvbssui$/rptweb/reports/index.jsp"}]);
}
if(cfg.hasEntitlement("bss_invite_guest")&&!cfg.hasEntitlement("dom_mail__allowFreemium")){
_d3.defineRow([{"type":"link","selector":"invite","text":"inviteGuest.text","target":_89,"url":"$$$srvbssui$/manage/subscribers/showInviteGuestDialog/input"}]);
}
if(cfg.hasMarketplace()){
_d3.defineRow([{"type":"link","selector":"marketplace","text":"marketplace.text","target":"_blank","url":"https://myibm.ibm.com/products-services/"}]);
}
_d3.defineRow([{"type":"link","selector":"logout","text":"logout.text","url":"$$$srvbssui$/manage/account/logoutSSO"}]);
_d3.create();
};
function _9a(){
var _d4={"where":_8b,"id":"bsscom-helpMenu","text":"helpMenu.text","selector":"help","img":"help.svg","imgOnly":true,"role":"button","ariaLabel":"helpMenu.text"};
var _d5=new _82(_d4,cfg.navbar_data);
if(cfg.hasRole("User")){
var _d6=cfg.getSetting("contexthelp");
if(_d6){
if(_d6!=="nohelp"){
_d5.defineRow([{"type":"link","selector":"contexthelp","text":"helpMenu.text","url":_d6+"?lang=$$$lang$","special":"resizable=yes,scrollbars=yes,toolbar=yes,location=no,directories=no,status=no,menubar=no,width=1010,height=790,top=0,left=0","specialname":"helpwindow"}]);
}
}else{
var url="https://www.ibm.com/support/knowledgecenter/SSL3JX/verse/welcometoibmverse.html";
_d5.defineRow([{"type":"link","selector":"contexthelp","text":"helpMenu.text","url":url,"special":"resizable=yes,scrollbars=yes,toolbar=yes,location=no,directories=no,status=no,menubar=no,width=1010,height=790,top=0,left=0","specialname":"helpwindow"}]);
}
}
if(cfg.hasRole("CustomerAdministrator")){
_d5.defineRow([{"type":"link","selector":"adminhelp","text":"administratorHelp.text","url":"https://www-01.ibm.com/support/knowledgecenter/SSL3JX/admin/bss/topics/intro_engage.dita?lang=$$$lang$","special":"resizable=yes,scrollbars=yes,toolbar=yes,location=no,directories=no,status=no,menubar=no,width=1010,height=790,top=0,left=0","specialname":"helpwindow"}]);
}
if(cfg.hasGatekeeper("NAVIGATION_IBM_SUPPORT")){
_d5.defineRow([{"type":"link","selector":"helpcentral","text":"helpCentral.text","url":"https://w3-01.ibm.com/helpcentral/Home","special":"resizable=yes,scrollbars=yes,toolbar=yes,location=no,directories=no,status=no,menubar=no,width=1010,height=790,top=0,left=0","specialname":"helpwindow"}]);
}
if(has("feature-tours")){
_d5.defineRow([{"type":"link","selector":"whatsnew-tours","text":"whatsNew.text","customEvent":"initWhatsNewTours"}]);
_d5.defineRow([{"type":"link","selector":"guided-tours","text":"guidedTours.text","customEvent":"initGuidedTours"}]);
}else{
_d5.defineRow([{"type":"link","selector":"whatsnew","text":"whatsNew.text","url":"http://www.ibm.com/support/knowledgecenter/SSL3JX/whatsnew/monthly_intro.html","special":"resizable=yes,scrollbars=yes,toolbar=yes,location=no,directories=no,status=no,menubar=no,width=1010,height=790,top=0,left=0","specialname":"helpwindow"}]);
}
if(!cfg.hasEntitlement("dom_mail__allowFreemium")){
_d5.defineRow([{"type":"link","selector":"additionalresources","text":"additionalResources.text","url":"https://www.ibm.com/support/knowledgecenter/SSL3JX/welcome/welcome.html","special":"resizable=yes,scrollbars=yes,toolbar=yes,location=no,directories=no,status=no,menubar=no,width=1010,height=790,top=0,left=0","specialname":"helpwindow"}]);
}
if(cfg.hasRole("UserAccountAssistant")||cfg.hasRole("AppDeveloper")){
_d5.defineRow([{"type":"link","selector":"userassistant","text":"userAssistantHelp.text","url":"https://www.ibm.com/support/knowledgecenter/SSL3JX/admin/bss/topics/user_acct_asst.html","special":"resizable=yes,scrollbars=yes,toolbar=yes,location=no,directories=no,status=no,menubar=no,width=1010,height=790,top=0,left=0","specialname":"helpwindow"}]);
}
_d5.defineRow([{"type":"link","selector":"legalnotices","text":"legalNotices.text","url":"http://www.ibm.com/support/knowledgecenter/SSL3JX/notices/termsofuseprivacyandimpressum.html","special":"resizable=yes,scrollbars=yes,toolbar=yes,location=no,directories=no,status=no,menubar=no,width=1010,height=790,top=0,left=0","specialname":"helpwindow"}]);
var _d7=_d5.create();
var _d8=_d7.object.querySelector(".help-image");
if(typeof CommonNavBarModule!=="undefined"&&CommonNavBarModule.getLanguage()==="ar"){
_d8.setAttribute("class",_d8.getAttribute("class")+" mirror");
}else{
_d8.setAttribute("class",_d8.getAttribute("class")+" nomirror");
}
};
function _9b(){
var _d9=document.querySelector(".ics-scbanner");
if(_d9){
var _da=_d9.children;
var _db;
var _dc=[];
for(var i=0;i<_da.length;i++){
_db=window.getComputedStyle(_da[i],null).getPropertyValue("order");
if(_db===""){
_db=window.getComputedStyle(_da[i],null).order;
}
_dc[i]={key:"."+_da[i].className.replace(/ /gi,"."),value:_db,originalOrder:i};
}
_dc=_dc.sort(function(a,b){
return a.value-b.value||a.originalOrder-b.originalOrder;
});
for(var i=_dc.length-1;i>=0;i--){
try{
_d9.insertBefore(document.querySelector(_dc[i].key),_d9.childNodes[0]);
}
catch(e){
console.error("Error while updating DOM order in banner. "+e);
}
}
}
};
function _9c(_dd){
var _de=document.querySelector(_dd);
if(_de){
var _df=_de.getElementsByTagName("UL")[0];
}
if(_df){
var _e0=_df.children;
var _e1;
var _e2=[];
for(var i=0;i<_e0.length;i++){
_e1=window.getComputedStyle(_e0[i],null).getPropertyValue("order");
if(_e1===""){
_e1=window.getComputedStyle(_e0[i],null).order;
}
_e2[i]={key:"."+_e0[i].className.replace(/ /gi,"."),value:_e1,originalOrder:i};
}
_e2=_e2.sort(function(a,b){
return a.value-b.value||a.originalOrder-b.originalOrder;
});
for(var i=_e2.length-1;i>=0;i--){
try{
_df.insertBefore(document.querySelector(_e2[i].key),_df.childNodes[0]);
}
catch(e){
console.error("Error while updating DOM order in '"+_dd+"'. "+e);
}
}
}
};
function _a5(_e3){
_e3.type="img";
new _84(_e3,cfg.navbar_data).create();
};
function _a6(_e4){
_e4.type="navlink";
new _81(_e4,cfg.navbar_data).create();
};
function _b9(_e5){
_e5.type="extlinkBefore";
new _81(_e5,cfg.navbar_data).create();
};
function _ba(_e6){
_e6.type="extlinkAfter";
new _81(_e6,cfg.navbar_data).create();
};
function _bb(_e7){
_e7.type="extlinkDelete";
new _81(_e7,cfg.navbar_data).create();
};
function _bc(_e8){
_e8.type="extlinkReplace";
new _81(_e8,cfg.navbar_data).create();
};
function _a7(_e9){
new _83(_e9,cfg.navbar_data).create();
};
};
return _8a;
}.apply(_7d,_7f),_80!==undefined&&(_7c.exports=_80));
},function(_ea,_eb,_ec){
var _ed,_ee;
!(_ed=[_ec(12),_ec(18),_ec(19),_ec(20),_ec(23)],_ee=function(_ef,_f0,_f1,_f2,_f3){
function _f4(_f5,_f6){
this.layout=_f5;
this.navbar_data=_f6;
};
function _f7(_f8){
var _f9=_f8.parentNode;
_f9.removeChild(_f8);
};
_f4.prototype.create=function(){
if(typeof this.layout==="undefined"){
if(console){
console.error("scnavbar LinkGizmo : layout is undefined");
}
}else{
if(this.layout===null){
if(console){
console.error("scnavbar LinkGizmo : layout is null");
}
}else{
if(!(this.layout.where)){
if(console){
console.error("scnavbar LinkGizmo : where undefined");
}
}else{
if(!(this.layout.customEvent)&&(!(this.layout.url)&&this.layout.type!=="menu"&&!(this.layout.onclick))){
if(console){
console.error("scnavbar LinkGizmo : must specify url or onclick or menu");
}
}else{
if(this.layout.onclick&&this.layout.url){
if(console){
console.error("scnavbar LinkGizmo : cannot specify both url and onclick attributes");
}
}else{
if(this.layout.onclick&&!(this.layout.onclick==="openSTMeetingPopup"||this.layout.onclick==="openMeetingPopup"||this.layout.onclick==="openRoomMeetingPopup")){
if(console){
console.error("scnavbar LinkGizmo : only supported values for LinkGizmo onclick are: openSTMeetingPopup and openMeetingPopup. Found: "+this.layout.onclick);
}
}else{
if(!(this.layout.text)){
if(console){
console.error("scnavbar LinkGizmo : text undefined");
}
}else{
var _fa=_fb(this.layout,this.navbar_data);
return _ef.status("ics_navbar_status_ok",_fa);
}
}
}
}
}
}
}
return _ef.status("ics_navbar_status_invalid_input",null);
};
_f4.prototype.adopt=function gizmo_link_adopt(_fc){
if(_fc){
_fd("."+_fc.className.replace(/ /gi,"."),_fc);
_fc.setAttribute("tabindex","0");
}
};
function _fb(_fe,_ff){
var frag=document.createElement("div");
var id="";
if(_fe.id){
id=_fe.id;
}
var _100=_f3[_fe.text];
if(typeof _100==="string"&&_100!==""){
var text=_100;
}else{
var text=_fe.text;
}
var url=_fe.url;
if(_ff!==null){
text=_ef.replacePlaceHolders(text,_ff);
url=_ef.replacePlaceHolders(url,_ff);
}
var img="";
if(_fe.img){
var _101=_ef.replacePlaceHolders(_fe.img,_ff);
if(_101.indexOf(".svg")!==-1){
if(_f0[_101]){
img=_f0[_101];
}
}else{
img="<img src=\""+_101+"\" alt=\""+text+"\" ";
if(_fe.imgCls){
img+="class=\""+_fe.imgCls+"\"";
}
img+=">";
}
}
var cls="";
if(_fe.selector){
cls=_fe.selector;
if(_ff["selected"]){
var _102=_fe.selector.split(" ");
if(_102.indexOf(_ff["selected"])>-1){
cls+=" selected";
if(_fe.type==="navlink"){
url="";
}
}
}
}
if(_fe["class"]){
cls+=(cls?" ":"");
cls+=_fe["class"];
}
if(_fe.items&&_fe.items.length===1&&_fe.items[0]&&_fe.items[0][0].dyn_ext){
cls=cls+" hidden";
}
var _103="";
if(_fe.type==="menu"){
_103=_f0["menu.svg"];
}
var _104="";
if(typeof _fe.imgOnly!=="undefined"&&_fe.imgOnly===true){
_104=text;
text="";
}
var _105=null;
var _106=null;
if(_fe.special){
_105=function(){
window.open(_ef.replacePlaceHolders(_fe.url,_ff),_fe.specialname,_fe.special);
};
_106=function(_107){
if(_107.keyCode===13){
window.open(_ef.replacePlaceHolders(_fe.url,_ff),_fe.specialname,_fe.special);
}
};
url=null;
}
if(_fe.extBehavior===true){
_105=function(){
window.open(_fe.url,_fe.text,_fe.windowparams);
};
_106=function(_108){
if(_108.keyCode===13){
window.open(_fe.url,_fe.text,_fe.windowparams);
}
};
url=null;
}
var _109=_fe.target;
if(_fe.onclick){
url=null;
}
frag.innerHTML=_11e(text,_104,url,_109,id,cls,img,_103,_fe.type);
if(_105){
frag.firstElementChild.addEventListener("click",_105);
frag.firstElementChild.addEventListener("keydown",_106);
}
if(_fe.onclick==="openSTMeetingPopup"){
var _10a=function(){
_f1.openSTMeetingPopup(_ff.srvmeetings);
};
var _10b=function(_10c){
if(_10c.keyCode===13){
_f1.openSTMeetingPopup(_ff.srvmeetings);
}
};
frag.firstElementChild.addEventListener("click",_10a);
frag.firstElementChild.addEventListener("keydown",_10b);
}else{
if(_fe.onclick==="openMeetingPopup"){
var _10d=function(){
_f1.openMeetingPopup(_ff.srvmeetings);
};
var _10e=function(_10f){
if(_10f.keyCode===13){
_f1.openMeetingPopup(_ff.srvmeetings);
}
};
frag.firstElementChild.addEventListener("click",_10d);
frag.firstElementChild.addEventListener("keydown",_10e);
}else{
if(_fe.onclick==="openRoomMeetingPopup"){
var _110=function(){
_f2.openRoomMeetingPopup();
};
var _111=function(_112){
if(_112.keyCode===13){
_f2.openRoomMeetingPopup();
}
};
frag.firstElementChild.addEventListener("click",_110);
frag.firstElementChild.addEventListener("keydown",_111);
}
}
}
var node=null;
var _113=_fe.type;
var _114;
if(typeof (_fe.specialtype)!=="undefined"){
_114=_fe.specialtype;
}
if(_113&&_113.indexOf("extlinkBefore")!=-1){
var _115=window.getComputedStyle(_fe.where,null).getPropertyValue("order");
if(_115===""){
_115=window.getComputedStyle(_fe.where,null).order;
}
if(_fe.where.nodeName.indexOf("LI")!=-1){
var li=document.createElement("li");
li.className=frag.firstElementChild.className;
li.style.order=_115;
li.appendChild(frag.firstElementChild);
_ef.insertBefore(li,_fe.where);
}else{
frag.firstElementChild.style.order=_115;
frag.firstElementChild.removeAttribute("role");
_ef.insertBefore(frag.firstElementChild,_fe.where);
}
}else{
if(_113&&_113.indexOf("extlinkAfter")!=-1){
var _115=window.getComputedStyle(_fe.where,null).getPropertyValue("order");
if(_115===""){
_115=window.getComputedStyle(_fe.where,null).order;
}
if(_fe.where.nodeName.indexOf("LI")!=-1){
var li=document.createElement("li");
li.className=frag.firstElementChild.className;
li.style.order=_115;
li.appendChild(frag.firstElementChild);
_ef.insertAfter(li,_fe.where);
}else{
frag.firstElementChild.style.order=_115;
frag.firstElementChild.removeAttribute("role");
_ef.insertAfter(frag.firstElementChild,_fe.where);
}
}else{
if(_113&&_113.indexOf("extlinkDelete")!=-1){
_f7(_fe.where);
}else{
if(_113&&_113.indexOf("extlinkReplace")!=-1){
var _115=window.getComputedStyle(_fe.where,null).getPropertyValue("order");
if(_115===""){
_115=window.getComputedStyle(_fe.where,null).order;
}
var _116=_fe.where.className;
if(_fe.where.nodeName.indexOf("LI")!=-1){
var li=document.createElement("li");
li.className=_116;
frag.firstElementChild.className=_116;
frag.firstElementChild.setAttribute("role","menuitem");
li.style.order=_115;
li.appendChild(frag.firstElementChild);
_ef.insertAfter(li,_fe.where);
}else{
frag.firstElementChild.style.order=_115;
frag.firstElementChild.className=_116;
frag.firstElementChild.removeAttribute("role");
_ef.insertAfter(frag.firstElementChild,_fe.where);
}
_f7(_fe.where);
}else{
node=_fe.where.appendChild(frag.firstElementChild);
}
}
}
}
if(_fe.type==="navlink"){
_fd("."+node.className.replace(/ /gi,"."),node);
}
return node;
};
function _fd(_117,node){
var _118=function(_119){
_f1.closeMenus(_119,_118);
};
var _11a=function(_11b){
_f1.keyToggleMenu(_117,_11b,_118,false);
};
var _11c=function(){
var _11d=document.querySelector(".ics-scbanner");
_11d.querySelector(_117).blur();
};
node.addEventListener("keydown",_11a);
node.addEventListener("click",_11c);
};
function _11e(text,_11f,url,_120,id,cls,img,_121,type){
if(type==="menu"){
var _122="";
_122+="<div ";
if(_11f){
_122+="title=\""+_11f+"\" ";
}
if(cls){
_122+="class=\""+cls+"\" ";
}
if(id){
_122+="id=\""+id+"\" ";
}
_122+="tabindex=\"0\">";
_122+=img;
_122+=text;
_122+=_121;
_122+="</div>";
}else{
var _122="";
_122+="<a ";
if(_11f){
_122+="title=\""+_11f+"\" ";
}
if(cls){
_122+="class=\""+cls+"\" ";
}
if(_120){
_122+="target=\""+_120+"\" ";
}
if(url){
_122+="href=\""+url+"\" ";
}
if(id){
_122+="id=\""+id+"\" ";
}
if(type!=="navlink"){
_122+="role=\"menuitem\" ";
}
_122+="tabindex=\"0\">";
_122+=img;
_122+=text;
_122+=_121;
_122+="</a>";
}
return _122;
};
return _f4;
}.apply(_eb,_ed),_ee!==undefined&&(_ea.exports=_ee));
},function(_123,_124,_125){
var _126,_127;
!(_126=[_125(13)],_127=function(has){
return {insertBefore:function(_128,_129){
var _12a=_129.parentNode;
return _12a.insertBefore(_128,_129);
},insertAfter:function(_12b,_12c){
var _12d=_12c.parentNode;
if(_12d.lastchild==_12c){
return _12d.appendChild(_12b);
}else{
return _12d.insertBefore(_12b,_12c.nextSibling);
}
},addAttribute:function(_12e,_12f,_130){
if(_12e!==null&&_12f!==null&&_12f!==""){
for(var i=0;i<_12e.length;i++){
var obj=_12e[i];
var _131;
if(typeof obj.attributes[_12f]==="undefined"){
_131=obj.getAttribute(_12f);
}else{
_131=obj.attributes[_12f].value;
}
var _132=document.createAttribute(_12f);
if(_130!==null){
if(_130.indexOf(":url")!=-1){
_132.value=_130;
obj.attributes.setNamedItem(_132);
}else{
eval("var pattern = /\\W"+_130+"\\W|^"+_130+"$|"+_130+"$|^"+_130+"/");
if(_131===null){
_132.value=_130;
}else{
if(_131!==null&&!_131.match(pattern)){
_132.value=_131+" "+_130;
}else{
_132.value=_131;
}
}
obj.attributes.setNamedItem(_132);
}
}
}
}
},setAttribute:function(_133,_134,_135){
if(_133!==null&&_134!==null&&_134!==""){
for(var i=0;i<_133.length;i++){
var obj=_133[i];
obj.setAttribute(_134,_135);
}
}
},removeAttribute:function(_136,_137,_138){
if(_136!==null){
for(var i=0;i<_136.length;i++){
var obj=_136[i];
var _139;
if(typeof obj.attributes[_137]==="undefined"){
_139=obj.getAttribute(_137);
}else{
_139=obj.attributes[_137].value;
}
if(_138!==null){
eval("var pattern = /\\W"+_138+"\\W|^"+_138+"$|"+_138+"$|^"+_138+"/");
var _13a=document.createAttribute(_137);
if(_139!==null&&_139.match(pattern)){
_13a.value=_139.replace(_138,"").trim();
obj.attributes.setNamedItem(_13a);
}
}
}
}
},status:function(_13b,_13c){
if(has("bvt")&&_13b!="ics_navbar_status_ok"){
console.log("*NAVBAR HelperUtility.status: "+_13b);
if(!_13c){
console.log("*NAVBAR HelperUtility.status: object: NONE!");
}else{
var _13d=_13c.tagName.toUpperCase();
if(_13d==="A"){
console.log("*NAVBAR HelperUtility.status: object: "+_13c.toString());
}else{
if(_13d==="DIV"){
console.log("*NAVBAR HelperUtility.status: object: "+_13c.outerHTML);
}
}
}
}
return {"status":_13b,"object":_13c};
},replacePlaceHolders:function(_13e,_13f){
if(!_13e){
return _13e;
}
var _140=null;
if(_13e instanceof Array){
_140=_13e;
}else{
_140=new Array(_13e);
}
for(var j=0;j<_140.length;j++){
var str=_140[j];
if(str&&_13f){
var keys=str.match(/\${3}([\w\.]+)\$/g);
if(keys){
for(var i=0;i<keys.length;i++){
var key=keys[i].replace(/\$/g,"");
var re=new RegExp("\\$\\$\\$"+key+"\\$","");
var _141=_13f[key];
if(typeof _141!=="undefined"&&_141!==null){
str=str.replace(re,_141);
}
}
}
}
keys=str.match(/\$\$\$(\w+)\$/g);
if(!keys){
break;
}
}
return str;
},applyTheme:function(_142,_143,_144,text){
if(_143==="hikari"){
_142.classList.add("hikari");
}else{
if(_143==="gen4"){
_142.classList.add("gen4");
var _145=document.createElement("div");
_145.classList.add("ics-scbanner-gen4border");
this.insertAfter(_145,_142);
}else{
if(_143==="colour"){
_142.classList.add("colour");
}else{
if(_143==="gen3"){
_142.classList.add("colour");
}else{
if(_143==="custom"){
_142.classList.add("custom");
if(_144&&text){
var _146=document.createElement("style");
_146.appendChild(document.createTextNode(""));
document.head.appendChild(_146);
_146.sheet.insertRule(".custom.ics-scbanner {background-color: #"+_144+";}",0);
_146.sheet.insertRule(".custom.ics-scbanner > * {color: #"+text+" !important;}",0);
}
}
}
}
}
}
},addCustomCharacteristics:function(_147,_148){
switch(_148){
case "updateWhatsNewTours":
case "updateGuidedTours":
if(has("feature-tours")){
var _149=new Object();
_149["updateWhatsNewTours"]="whatsnew-tours";
_149["updateGuidedTours"]="guided-tours";
var _14a=_147.querySelector("a."+_149[_148]);
if(_14a){
_14a.classList.add("hidden");
var _14b=_147.querySelector("li."+_149[_148]);
_14b.classList.add("hidden");
var self=this;
_14a.addEventListener(_148,function(_14c){
self.handleCustomEvents(_147,_14c);
});
}
}
break;
}
},handleCustomEvents:function(_14d,_14e){
try{
switch(_14e.type){
case "updateWhatsNewTours":
case "updateGuidedTours":
var node=_14e.detail.node;
var _14f=(typeof _14e.detail.showIcon==="boolean")?_14e.detail.showIcon:null;
var _150=(typeof _14e.detail.count==="number")?_14e.detail.count:0;
var _151=(typeof _14e.detail.eventHandler==="function")?true:false;
var _152=(typeof _14e.detail.eventHandler==="function")?_14e.detail.eventHandler:function(){
};
var _153=_14e.detail.eventName;
var e;
if(!(typeof node==="string")||node.trim().length==0){
_14e.preventDefault();
e=new Error("The value of detail.node for the custom event "+_14e.type+" must be a String.");
e.name="Invalid detail.node";
throw e;
}
var _154=_14d.querySelector("#bsscom-helpMenu");
var _155=_154.querySelector("span.notification-dot");
var _156=_154.querySelector("li."+node);
if(((_156==undefined)||(_156==null))){
_14e.preventDefault();
e=new Error("The DOM node '"+node+"' was not found while handling custom event "+_14e.type+".");
e.name="Invalid DOM node";
throw e;
}
var _157=_156.querySelector("a."+node);
var _158;
if(_151&&(!(typeof _153==="string")||_153.trim().length==0)){
_14e.preventDefault();
e=new Error("The value of detail.eventName for the custom event "+_14e.type+" must be a String.");
e.name="Invalid detail.eventName";
throw e;
}
if(!(_14f===null)){
if(_14f){
if(_155==undefined){
_155=_154.insertBefore(document.createElement("span"),_154.firstChild);
}
_154.classList.add(node);
_155.classList.remove("hidden");
_155.classList.add("notification-dot");
}else{
if(!(_155==undefined)){
_155.classList.add("hidden");
}
}
}
_158=_157.querySelector("span."+node+"-count");
if(_150>0){
if(_158==undefined){
_158=document.createElement("span");
_157.appendChild(_158);
}
_158.innerHTML=_150;
_158.classList.remove("hidden");
_158.classList.add(node+"-count");
}else{
if(_150===0){
if(!(_158==undefined)){
_158.innerHTML="";
_158.classList.add("hidden");
}
}
}
if(!(_157.hasAttribute("customEvent"))){
if(_151){
_157.setAttribute("customEvent",_153);
this.addCustomClickHandler(_157,_152);
}
}else{
var _159=_157.parentElement;
var _15a=_157.cloneNode(true);
_15a.removeAttribute("customEvent");
_15a.setAttribute("customEvent",_153);
_159.removeChild(_157);
_157=null;
_157=_159.appendChild(_15a);
this.addCustomCharacteristics(_14d,_14e.type);
this.addCustomClickHandler(_157,_152);
}
if(_151){
_156.classList.remove("nav-disabled");
_156.classList.remove("ignoreClose");
_157.classList.remove("nav-disabled");
_157.removeAttribute("aria-disabled");
}else{
_156.classList.add("nav-disabled");
_156.classList.add("ignoreClose");
_157.classList.add("nav-disabled");
_157.setAttribute("aria-disabled",true);
}
_156.classList.remove("hidden");
_157.classList.remove("hidden");
break;
}
}
catch(e){
console.log("[ERROR handleCustomEvents] "+e.toString());
return false;
}
return true;
},addCustomClickHandler:function(node,_15b){
var _15c=function(){
_15b();
};
var _15d=function(_15e){
if(_15e.keyCode===13){
_15b();
}
};
node.addEventListener("click",_15c);
node.addEventListener("keydown",_15d);
}};
}.apply(_124,_126),_127!==undefined&&(_123.exports=_127));
},function(_15f,_160,_161){
var _162,_163;
(function(_164,_165){
!(_162=[_161,_164],_163=function(_166,_167){
var has=_161(16).has||function(){
};
if(!has("dojo-has-api")){
var _168=typeof window!="undefined"&&typeof location!="undefined"&&typeof document!="undefined"&&window.location==location&&window.document==document,_169=(function(){
return this;
})(),doc=_168&&document,_16a=doc&&doc.createElement("DiV"),_16b=(_167.config&&_167.config())||{};
has=function(name){
return typeof _16b[name]=="function"?(_16b[name]=_16b[name](_169,doc,_16a)):_16b[name];
};
has.cache=_16b;
has.add=function(name,test,now,_16c){
(typeof _16b[name]=="undefined"||_16c)&&(_16b[name]=test);
return now&&has(name);
};
has.add("host-browser",_168);
has.add("host-node",(typeof _165=="object"&&_165.versions&&_165.versions.node&&_165.versions.v8));
has.add("host-rhino",(typeof load=="function"&&(typeof Packages=="function"||typeof Packages=="object")));
has.add("dom",_168);
has.add("dojo-dom-ready-api",1);
has.add("dojo-sniff",1);
}
if(has("host-browser")){
has.add("dom-addeventlistener",!!document.addEventListener);
has.add("touch","ontouchstart" in document||("onpointerdown" in document&&navigator.maxTouchPoints>0)||window.navigator.msMaxTouchPoints);
has.add("touch-events","ontouchstart" in document);
has.add("pointer-events","onpointerdown" in document);
has.add("MSPointer","msMaxTouchPoints" in navigator);
has.add("device-width",screen.availWidth||innerWidth);
var form=document.createElement("form");
has.add("dom-attributes-explicit",form.attributes.length==0);
has.add("dom-attributes-specified-flag",form.attributes.length>0&&form.attributes.length<40);
}
has.clearElement=function(_16d){
_16d.innerHTML="";
return _16d;
};
has.normalize=function(id,_16e){
var _16f=id.match(/[\?:]|[^:\?]*/g),i=0,get=function(skip){
var term=_16f[i++];
if(term==":"){
return 0;
}else{
if(_16f[i++]=="?"){
if(!skip&&has(term)){
return get();
}else{
get(true);
return get(skip);
}
}
return term||0;
}
};
id=get();
return id&&_16e(id);
};
has.load=function(id,_170,_171){
if(id){
_170([id],_171);
}else{
_171();
}
};
return has;
}.apply(_160,_162),_163!==undefined&&(_164.exports=_163));
}.call(_160,_161(14)(_15f),_161(15)));
},function(_172,_173){
_172.exports=function(_174){
if(!_174.webpackPolyfill){
_174.deprecate=function(){
};
_174.paths=[];
_174.children=[];
_174.webpackPolyfill=1;
}
return _174;
};
},function(_175,_176){
var _177=_175.exports={};
var _178;
var _179;
(function(){
try{
_178=setTimeout;
}
catch(e){
_178=function(){
throw new Error("setTimeout is not defined");
};
}
try{
_179=clearTimeout;
}
catch(e){
_179=function(){
throw new Error("clearTimeout is not defined");
};
}
}());
function _17a(fun){
if(_178===setTimeout){
return setTimeout(fun,0);
}
try{
return _178(fun,0);
}
catch(e){
try{
return _178.call(null,fun,0);
}
catch(e){
return _178.call(this,fun,0);
}
}
};
function _17b(_17c){
if(_179===clearTimeout){
return clearTimeout(_17c);
}
try{
return _179(_17c);
}
catch(e){
try{
return _179.call(null,_17c);
}
catch(e){
return _179.call(this,_17c);
}
}
};
var _17d=[];
var _17e=false;
var _17f;
var _180=-1;
function _181(){
if(!_17e||!_17f){
return;
}
_17e=false;
if(_17f.length){
_17d=_17f.concat(_17d);
}else{
_180=-1;
}
if(_17d.length){
_182();
}
};
function _182(){
if(_17e){
return;
}
var _183=_17a(_181);
_17e=true;
var len=_17d.length;
while(len){
_17f=_17d;
_17d=[];
while(++_180<len){
if(_17f){
_17f[_180].run();
}
}
_180=-1;
len=_17d.length;
}
_17f=null;
_17e=false;
_17b(_183);
};
_177.nextTick=function(fun){
var args=new Array(arguments.length-1);
if(arguments.length>1){
for(var i=1;i<arguments.length;i++){
args[i-1]=arguments[i];
}
}
_17d.push(new Item(fun,args));
if(_17d.length===1&&!_17e){
_17a(_182);
}
};
function Item(fun,_184){
this.fun=fun;
this.array=_184;
};
Item.prototype.run=function(){
this.fun.apply(null,this.array);
};
_177.title="browser";
_177.browser=true;
_177.env={};
_177.argv=[];
_177.version="";
_177.versions={};
function noop(){
};
_177.on=noop;
_177.addListener=noop;
_177.once=noop;
_177.off=noop;
_177.removeListener=noop;
_177.removeAllListeners=noop;
_177.emit=noop;
_177.binding=function(name){
throw new Error("process.binding is not supported");
};
_177.cwd=function(){
return "/";
};
_177.chdir=function(dir){
throw new Error("process.chdir is not supported");
};
_177.umask=function(){
return 0;
};
},function(_185,_186,_187){
var map={"./has":13,"./has.js":13,"./request/registry":17,"./request/registry.js":17};
function _188(req){
return _187(_189(req));
};
function _189(req){
return map[req]||(function(){
throw new Error("Cannot find module '"+req+"'.");
}());
};
_188.keys=function webpackContextKeys(){
return Object.keys(map);
};
_188.resolve=_189;
_185.exports=_188;
_188.id=16;
},function(_18a,_18b,_18c){
var _18d,_18e;
!(_18d=[],_18e=function(){
return {onResponse:null,get:function(url,_18f){
var el=document.createElement("script");
el.setAttribute("type","text/javascript");
el.setAttribute("src",url+"&callback=CommonNavBarModule.handleBannerNextResponse");
document.getElementsByTagName("head")[0].appendChild(el);
return {then:function(_190){
CommonNavBarModule.setBannerNextResponseHandler(_190);
}};
}};
}.apply(_18b,_18d),_18e!==undefined&&(_18a.exports=_18e));
},function(_191,_192,_193){
!([],_191.exports={"avatar.svg":"<svg class=\"generic-avatar-image\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\"><path d=\"M16 21.3c5.9 0 10.7-4.8 10.7-10.7S21.9 0 16 0 5.3 4.8 5.3 10.7 10.1 21.3 16 21.3zm0-19.2c4.7 0 8.5 3.8 8.5 8.5s-3.8 8.5-8.5 8.5-8.5-3.8-8.5-8.5 3.8-8.5 8.5-8.5zM24.5 23.5h-17c-2.4 0-4.3 1.9-4.3 4.3V32h25.6v-4.3c0-2.3-1.9-4.2-4.3-4.2z\"/></svg>","help.svg":"<svg class=\"help-image\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\"><path d=\"M4.5 6.6C4.6 4.5 5.6 2.9 8 3c2.5.1 3.5 1.7 3.5 2.8C11.5 8.4 9.2 8 9 9.7l-.1.3H7.1v-.5c.2-2.4 2.5-2.1 2.5-3.6 0-.8-.8-1-1.5-1-1.1 0-1.6.8-1.6 1.7h-2zM8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 15c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zM7 11h2v2H7z\"/></svg>","menu.svg":"<svg class=\"menu-image\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 4.959 2.844\"><polygon class=\"cls-1\" points=\"2.046 2.421 2.046 2.421 2.479 2.844 2.479 2.844 2.479 2.844 2.913 2.421 2.913 2.421 4.959 0.424 4.494 0 2.479 1.997 0.434 0 0 0.424 2.046 2.421\"/></svg>","close.svg":"<svg class=\"close-x\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\"><path d=\"M32 4.1L27.9 0 16 12.1 4.1 0 0 4.1 12.1 16 0 27.9 4.1 32 16 19.9 27.9 32l4.1-4.1L19.9 16z\"/></svg>"});
},function(_194,_195,_196){
var _197,_198;
!(_197=[_196(12)],_198=function(util){
return {menuOpen:false,openMenuId:"",syncClicks:true,docFunction:null,changeSelectedMenu:function(_199){
var _19a=document.querySelectorAll(".ics-scbanner-nav > .selected");
if(_19a!==null){
util.removeAttribute(_19a,"class","selected");
}
if(_199!==null){
var item=document.querySelector(_199);
if(item!==null){
util.addAttribute(new Array(item),"class","selected");
return item;
}
}
return null;
},updateHelpMenu:function(text,url){
var _19b=document.getElementById("svcHelp");
if(_19b!==null){
_19b.innerHTML=text;
_19b.attributes["href"].value=url;
}
},toggleMenu:function(_19c,evt,_19d){
if(this.docFunction===null){
this.docFunction=_19d;
}
switch(evt.button){
case 0:
var _19e=document.querySelector(_19c);
if(_19e!=null){
var _19f=_19e.className;
if(_19f.indexOf("show")===-1){
_19e.className+=" show";
this.menuOpen=true;
this.openMenuId=_19c;
this.initMenuFocus(_19c);
document.addEventListener("click",_19d);
}
}
}
},clearFocus:function(){
if(this.menuOpen&&document.activeElement.tagName!=="INPUT"){
document.activeElement.blur();
}
},showMenu:function(_1a0){
if(_1a0!==this.openMenuId&&this.menuOpen){
var _1a1=document.getElementsByClassName("show")[0];
if(_1a1){
_1a1.className=_1a1.className.replace(/(?:^|\s)show(?!\S)/g,"");
}
var _1a2=document.querySelector(_1a0);
_1a2.focus();
_1a2.className+=" show";
this.openMenuId=_1a0;
}
},closeMenus:function(evt,_1a3){
switch(evt.button){
case 0:
case 1:
if(!this.syncClicks){
if(!this.ignoreClose(evt)){
document.removeEventListener("click",_1a3);
var _1a4=document.body.getElementsByClassName("show")[0];
if(_1a4&&this.menuOpen){
_1a4.className=_1a4.className.replace(/(?:^|\s)show(?!\S)/g,"");
this.menuOpen=false;
this.openMenuId="";
this.syncClicks=true;
_1a4.blur();
}
}
}else{
this.syncClicks=false;
}
}
},ignoreClose:function(e){
var evt=e?e:window.event;
var _1a5=evt.target;
while(_1a5){
if(_1a5.className&&typeof (_1a5.className)==="string"&&_1a5.className.search("ignoreClose")!==-1){
return true;
}
_1a5=_1a5.parentNode;
}
return false;
},isIgnoreFocus:function(e){
var evt=e?e:window.event;
var _1a6=evt.target;
while(_1a6){
if(_1a6.className&&typeof (_1a6.className)==="string"&&_1a6.className.search("ignoreFocus")!==-1){
return true;
}
_1a6=_1a6.parentNode;
}
return false;
},isIgnoreNav:function(e){
var evt=e?e:window.event;
var _1a7=evt.target;
while(_1a7){
if(_1a7.className&&typeof (_1a7.className)==="string"&&_1a7.className.search("ignoreNav")!==-1){
return true;
}
_1a7=_1a7.parentNode;
}
return false;
},openSTMeetingPopup:function(_1a8){
targetUrl=_1a8+"/host/sametime";
var _1a9;
if(navigator.userAgent.indexOf("MSIE")>=0||navigator.userAgent.indexOf("Microsoft")>=0){
_1a9=function(){
parent.window.open("","hostTarget","channelmode=yes, scrollbars=auto, resizable=yes, location=no");
};
}else{
var _1aa=20;
var _1ab=35;
if(navigator.userAgent.indexOf("Win")>=0){
_1ab=30;
_1aa=0;
}
var _1ac=screen.availWidth-_1aa;
var _1ad=screen.availHeight-_1ab;
_1a9=function(){
parent.window.open("","hostTarget","width="+_1ac+",height="+_1ad+",scrollbars=auto,resizable=yes,location=no,toolbars=no,status=no");
};
}
var _1ae=document.createElement("form");
_1ae.setAttribute("method","post");
_1ae.setAttribute("action",targetUrl);
_1ae.setAttribute("target","hostTarget");
document.body.appendChild(_1ae);
_1ae.setAttribute("onClick",_1a9());
_1ae.submit();
return false;
},openMeetingPopup:function(_1af){
targetUrl=_1af+"/host";
var _1b0;
if(navigator.userAgent.indexOf("MSIE")>=0||navigator.userAgent.indexOf("Microsoft")>=0){
_1b0=function(){
parent.window.open("","hostTarget","channelmode=yes, scrollbars=auto, resizable=yes, location=no");
};
}else{
var _1b1=20;
var _1b2=35;
if(navigator.userAgent.indexOf("Win")>=0){
_1b2=30;
_1b1=0;
}
var _1b3=screen.availWidth-_1b1;
var _1b4=screen.availHeight-_1b2;
_1b0=function(){
parent.window.open("","hostTarget","width="+_1b3+",height="+_1b4+",scrollbars=auto,resizable=yes,location=no,toolbars=no,status=no");
};
}
var _1b5=document.createElement("form");
_1b5.setAttribute("method","post");
_1b5.setAttribute("action",targetUrl);
_1b5.setAttribute("target","hostTarget");
var _1b6=document.createElement("input");
_1b6.type="hidden";
_1b6.name="pwd";
_1b6.value="false";
_1b5.appendChild(_1b6);
_1b6=document.createElement("input");
_1b6.type="hidden";
_1b6.name="report";
_1b6.value="false";
_1b5.appendChild(_1b6);
document.body.appendChild(_1b5);
_1b5.setAttribute("onClick",_1b0());
_1b5.submit();
return false;
},keyToggleMenu:function(_1b7,evt,_1b8,_1b9){
if(this.docFunction===null){
this.docFunction=_1b8;
}
var _1ba=(evt.target)?evt.target:evt.srcElement;
var _1bb=document.querySelector(".ics-scbanner");
var _1bc=_1bb.querySelector(_1b7);
if(evt.keyCode===13){
if(_1b9){
if(!this.menuOpen){
_1bc.className+=" show";
this.menuOpen=true;
this.syncClicks=false;
this.openMenuId=_1b7;
evt.preventDefault();
this.initMenuFocus(_1b7);
document.addEventListener("click",_1b8);
}else{
if(!this.ignoreClose(evt)){
_1bc.className=_1bc.className.replace(/(?:^|\s)show(?!\S)/g,"");
document.removeEventListener("click",_1b8);
this.menuOpen=false;
this.openMenuId="";
this.syncClicks=true;
if(evt.target.href&&evt.target.target==="_blank"){
window.open(evt.target.href,"_blank");
}else{
if(evt.target.href){
window.location=evt.target.href;
}
}
if(!this.isIgnoreFocus(evt)){
_1bc.focus();
}
}
}
}
}else{
if(evt.keyCode===37){
if(this.menuOpen&&!this.ignoreClose(evt)){
document.removeEventListener("click",_1b8);
_1bc.className=_1bc.className.replace(/(?:^|\s)show(?!\S)/g,"");
this.menuOpen=false;
this.openMenuId="";
this.syncClicks=true;
_1bc.focus();
}else{
this.moveItemFocus(_1ba,".ics-scbanner",0,false);
evt.preventDefault();
}
}else{
if(evt.keyCode===39){
if(this.menuOpen&&!this.ignoreClose(evt)){
document.removeEventListener("click",_1b8);
_1bc.className=_1bc.className.replace(/(?:^|\s)show(?!\S)/g,"");
this.menuOpen=false;
this.openMenuId="";
this.syncClicks=true;
_1bc.focus();
}else{
this.moveItemFocus(_1ba,".ics-scbanner",1,false);
evt.preventDefault();
}
}else{
if(evt.keyCode===38){
if(this.menuOpen&&!this.isIgnoreNav(evt)){
this.moveItemFocus(_1ba,_1b7,0,true);
evt.preventDefault();
}
}else{
if(evt.keyCode===40){
if(_1b9){
if(!this.menuOpen){
_1bc.className+=" show";
this.menuOpen=true;
this.syncClicks=false;
this.openMenuId=_1b7;
this.initMenuFocus(_1b7);
document.addEventListener("click",_1b8);
evt.preventDefault();
}else{
if(!this.isIgnoreNav(evt)){
this.moveItemFocus(_1ba,_1b7,1,true);
evt.preventDefault();
}
}
}
}else{
if(evt.keyCode===27){
document.removeEventListener("click",_1b8);
_1bc.className=_1bc.className.replace(/(?:^|\s)show(?!\S)/g,"");
this.menuOpen=false;
this.openMenuId="";
this.syncClicks=true;
_1bc.focus();
}else{
if(evt.keyCode===9){
if(this.menuOpen){
if(evt.shiftKey){
evt.preventDefault();
this.moveItemFocus(_1ba,_1b7,0,true);
}else{
evt.preventDefault();
this.moveItemFocus(_1ba,_1b7,1,true);
}
}
}
}
}
}
}
}
}
},moveItemFocus:function(node,_1bd,_1be,_1bf){
var _1c0=document.querySelector(_1bd);
if(_1bf){
var _1c1=_1c0.querySelectorAll("[tabindex]");
var _1c2=new Array();
for(var i=0;i<_1c1.length;i++){
if(_1c1[i].offsetHeight>0){
_1c2.push(_1c1[i]);
}
}
_1c1=_1c2;
}else{
var _1c1=_1c0.children;
var _1c2=new Array();
for(var i=0;i<_1c1.length;i++){
if(_1c1[i].getAttribute("tabindex")==="0"){
_1c2.push(_1c1[i]);
}
}
_1c1=_1c2;
}
var _1c3=_1c1.length;
if(_1c3>1){
for(var i=_1c3;--i>=0;){
if(node===_1c1[i]){
break;
}
}
if(i>=0){
var _1c4=i;
if(_1be==0){
_1c4=(i>0?i-1:_1c3-1);
}else{
_1c4=(i<(_1c3-1)?i+1:0);
}
_1c1[_1c4].focus();
}
}
},initMenuFocus:function(_1c5){
var _1c6=document.querySelector(".ics-scbanner");
var _1c7=document.querySelector(_1c5);
var _1c8=_1c7.querySelectorAll("[tabindex]");
try{
var i=0;
while(i<_1c8.length){
if(_1c8[i].offsetHeight>0){
_1c8[i].focus();
break;
}
i++;
}
}
catch(e){
}
}};
}.apply(_195,_197),_198!==undefined&&(_194.exports=_198));
},function(_1c9,_1ca,_1cb){
var _1cc,_1cd;
!(_1cc=[_1cb(12),_1cb(21),_1cb(18),_1cb(22)],_1cd=function(_1ce,_1cf,_1d0,i18n){
return {_node:{},create:function(){
var _1d1=_1ce.replacePlaceHolders(_1cf,i18n);
var frag=document.createElement("div");
frag.innerHTML=_1d1;
this._node.banner=document.querySelector(".ics-scbanner");
this._node.banner.appendChild(frag.firstChild);
this._node.apps=this._node.banner.querySelector(".apps");
var _1d2=this._node.banner.querySelector(".room");
this._node.divRoom=_1d2;
this._node.divRoomLink=_1d2.querySelector(".roomlink");
this._node.closeButton=_1d2.querySelector(".close");
this._node.goButton=_1d2.querySelector(".roomOpenButton");
this._node.closeButton.innerHTML=_1d0["close.svg"];
this.registerEvents();
},registerEvents:function(){
var that=this;
var _1d3=["roomLink","roomOpenButton","roomDlgClose"];
var _1d4=this._node.divRoom;
var _1d5=this._node.closeButton;
var _1d6=this._node.divRoomLink;
var _1d7=this._node.goButton;
_1d5.onkeydown=function(e){
that.handleRoomDlgEvents(e,"roomDlgClose",_1d3);
};
_1d5.onclick=function(){
_1d4.className=_1d4.className+" hidden";
_1d4.setAttribute("aria-hidden","true");
that._node.apps.focus();
};
_1d6.onclick=function(){
_1d6.focus();
that.selectText("roomLink");
};
_1d6.onkeydown=function(e){
that.handleRoomDlgEvents(e,"roomLink",_1d3);
};
_1d7.onkeydown=function(e){
that.handleRoomDlgEvents(e,"roomOpenButton",_1d3);
};
_1d7.onclick=function(){
that.openRoom();
};
},openRoomMeetingPopup:function(){
this.deSelectText();
if(!(this._node.divRoom)){
this.create();
}
this.showPopup();
},showPopup:function(){
var _1d8=getComputedStyle(this._node.divRoom).getPropertyValue("visibility");
if(_1d8!="visible"){
this._node.divRoomLink.innerHTML="https://room.co/#/ibm-"+Math.floor((Math.random()*1000000000)+1);
this._node.divRoom.removeAttribute("aria-hidden");
this.setHorizontalPosition();
this._node.divRoom.classList.remove("hidden");
}
this._node.divRoomLink.focus();
},setHorizontalPosition:function(){
var apps=this._node.apps;
var _1d9=apps.clientHeight+apps.offsetTop;
this._node.divRoom.style.top=_1d9.toString()+"px";
var _1da=document.body.getAttribute("dir");
if(_1da&&_1da==="rtl"){
var _1db=apps.offsetLeft+apps.offsetWidth-this._node.divRoom.offsetWidth;
this._node.divRoom.style.left=_1db+"px";
}else{
this._node.divRoom.style.left=apps.offsetLeft+"px";
}
},openRoom:function(){
var _1dc=this._node.divRoomLink;
if(_1dc!=null){
var _1dd=_1dc.innerHTML;
window.open(_1dd);
}
},selectText:function(_1de){
this.deSelectText();
if(document.selection){
var _1df=document.body.createTextRange();
_1df.moveToElementText(document.getElementById(_1de));
_1df.select();
}else{
if(window.getSelection){
var _1e0=window.getSelection();
if(_1e0.rangeCount>0){
_1e0.removeAllRanges();
}
var _1df=document.createRange();
_1df.selectNode(document.getElementById(_1de));
_1e0.addRange(_1df);
}
}
},deSelectText:function(){
if(document.selection){
document.selection.empty();
}else{
if(window.getSelection){
window.getSelection().removeAllRanges();
}
}
},handleRoomDlgEvents:function(evt,_1e1,_1e2){
var _1e3,prev,next;
var _1e4=document.getElementById(_1e1);
_1e3=_1e2.indexOf(_1e1);
if(typeof evt.keyCode!="undefined"){
prev=(_1e3==0)?_1e2.length-1:_1e3-1;
next=(_1e3==_1e2.length-1)?0:_1e3+1;
if(evt.shiftKey&&evt.keyCode==9){
document.getElementById(_1e2[prev]).focus();
if(!document.all){
evt.preventDefault();
}
return;
}
switch(evt.keyCode){
case 37:
case 38:
document.getElementById(_1e2[prev]).focus();
if(!document.all){
evt.preventDefault();
}
break;
case 9:
case 39:
case 40:
document.getElementById(_1e2[next]).focus();
if(!document.all){
evt.preventDefault();
}
break;
case 27:
document.getElementById("roomDlgClose").click();
break;
case 13:
document.getElementById(_1e1).click();
break;
default:
return;
}
}
}};
}.apply(_1ca,_1cc),_1cd!==undefined&&(_1c9.exports=_1cd));
},function(_1e5,_1e6){
_1e5.exports="<div id=\"roomDialog\" role=\"dialog\" aria-labelledby=\"roomDlgTitle\" class=\"nav-popup hidden room\">\n   <div class=\"action-bar\">\n      <div id=\"roomDlgTitle\" class=\"title\">$$$room.dialog.title$</div>\n      <button id=\"roomDlgClose\" aria-controls=\"roomDialog\" title=\"$$$room.cancel$\" class=\"action close\" tabindex=\"3\">$$$room.cancel.ariaLabel$</button>  \n   </div>\n   <div class=\"content-container\">\n      <div id=\"roomLinkLabel\" class=\"roomlink-label\">$$$room.link$</div>\n      <div id=\"roomLink\" aria-labelledby=\"roomLinkLabel\" class=\"roomlink\" tabindex=\"1\"></div>\n   </div>\n   <div class=\"content-footer\">\n      <button id=\"roomOpenButton\" class=\"roomOpenButton\" role=\"link\" aria-label=\"$$$room.go.title$\" title=\"$$$room.go.title$\" tabindex=\"2\">$$$room.go$</button>\n   </div>\n</div>\n";
},function(_1e7,_1e8,_1e9){
!(_1e7.exports={"room.dialog.title":"Room Video Call","room.go":"Enter Room","room.go.title":"Open Room Video Call","room.cancel":"Close","room.cancel.ariaLabel":"Close Room Video dialog","room.link":"Your Video Call link is:","room.host.meeting.text":"Room Video Call","pt-br":true,"ca":true,"cs":true,"da":true,"nl":true,"fi":true,"fr":true,"de":true,"sr-latn":true,"ro":true,"hr":true,"el":true,"hu":true,"pt":true,"it":true,"ja":true,"ko":true,"no":true,"pl":true,"ru":true,"zh":true,"sl":true,"sk":true,"ar":true,"he":true,"es":true,"sv":true,"th":true,"zh-tw":true,"tr":true});
},function(_1ea,_1eb,_1ec){
!(_1ea.exports={"activities.text":"Activities","activities.priority.text":"High Priority Activities","activities.todolist.text":"To Do List","additionalResources.text":"Additional Resources","admin.audioReports.text":"Reports","admin.text":"Admin","administratorHelp.text":"Administrator Help","adminSiteMap.text":"Administrative Site Map","ariaSite.text":"Site","back.to.lotuslive":"Back to $$$smartcloud$","back.to.lotuslive.short":"Back to ...","buyCloud.text":"Buy Online","communities.text":"Communities","create.event.text":"Create an Event","dashboard.text":"Home","directory.text":"$$$orgname$ Directory","downloads.text":"Downloads and Setup","eDiscovery.text":"e-Discovery","efss.home.text":"Updates","events.text":"Events","filer.pinned.text":"Pinned Files","filer.shared.text":"Shared With Me","files.text":"Files","forms.text":"Forms","gettingstarted.text":"Getting Started","guidedTours.text":"Guided Tours","joinmeetings.text":"Meetings","helpCentral.text":"IT Help Central","helpMenu.text":"Help","host.meeting.text":"Host a Meeting","idletimer.text":"You have been inactive for an extended period of time. You will be logged out soon.","inviteGuest.text":"Invite Guest","legalNotices.text":"Legal Notices","loading.text":"Loading ...","logout.text":"Log Out","mailContacts":"Mail Contacts","mailToDo":"To Do","mailNotebook":"Notebook","mailCalendar":"Calendar","manageOrg.text":"Manage Organization","manageUseProd.text":"Manage Users and Products","marketplace.text":"My Products and Services","myprofile.text":"My Profile","my_network.text":"My Network","notesMail.text":"Mail","notification_pref.text":"Notification Settings","notifications.text.short":"My Notifications","notifications.text":"View updates related to your content and notifications you have received","offeringManagement.text":"Offering Management","people.text":"People","servicesMenu.text":"Apps","settingsLink.text":"Account Settings","socialcontacts.text":"My Contacts","stmeetings.text":"Meetings","today.event.text":"Today's Event","tours.available.text":"New features are available","tours.launch.text":"Launch tour of new features","submitfeedback.text":"Submit Feedback","userAssistantHelp.text":"User Account Assistant Help","user.audioReports.text":"Reports","visitor.text":"Visitor","whatsNew.text":"What's New","yunCalendar.text":"Calendar","yunMail.text":"Mail","notesMail.product.text":"SmartCloud Notes web","verse.product.text":"IBM Verse","zh":true,"zh-tw":true,"tr":true,"th":true,"sv":true,"sl":true,"sk":true,"ru":true,"ro":true,"pt":true,"pt-br":true,"pt-pt":false,"pl":true,"no":true,"nl":true,"nb":false,"ko":true,"kk":false,"ja":true,"it":true,"id":false,"hu":true,"hr":true,"he":true,"fr":true,"fi":true,"es":true,"el":true,"de":true,"sr-latn":true,"da":true,"cs":true,"ca":true,"bg":false,"ar":true});
},function(_1ed,_1ee,_1ef){
var _1f0,_1f1;
!(_1f0=[_1ef(12),_1ef(11),_1ef(25),_1ef(19),_1ef(18),_1ef(23)],_1f1=function(_1f2,_1f3,_1f4,_1f5,_1f6,i18n){
function _1f7(_1f8,_1f9){
this.layout=_1f8;
this.navbar_data=_1f9;
this.menuRows=[];
};
_1f7.navigation_replace_dyn_link_placeholder=function(_1fa,_1fb){
if(_1fb&&_1fb.dyn){
var node=document.querySelector("."+_1fb.dyn);
var IsVM=false;
var _1fc=node.parentNode.parentNode;
_1fc.innerHTML="";
var _1fd=_1fb.dyn.toString();
if(_1fd&&(_1fd.indexOf("navbar_dyn_visitor")!=-1)){
IsVM=true;
}
if(_1fa.LIST!=undefined){
for(var i=0;i<_1fa.LIST.length;i++){
var link=_1fa.LIST[i];
var row=[];
layout={};
var _1fe=document.querySelector(".ics-scbanner").getAttribute("vorg");
var _1ff=document.querySelector(".ics-scbanner").getAttribute("customerid");
if((_1fe!=null)&&(_1ff!=null)&&(!_1fe.contains(_1ff))){
var _200=link.path;
if(_200.indexOf("ownedcommunities")!==-1){
continue;
}
if(_200.indexOf("allcommunities")!==-1){
continue;
}
}
layout.text=link.title;
layout.url=link.path;
layout.where=_1fc;
layout.type="link";
if(IsVM==true){
var url=layout.url;
var _201=url.split("/");
var host=_201[0]+"//"+_201[2]+"/";
layout.img=host+"navbar/images/varrow.png";
layout.imgCls="visitorIcon";
}
if(_1fb){
if(_1fb.target){
layout.target=_1fb.target;
}
}
row.push(layout);
_202(_1fc,row,this.navbar_data);
}
}
if((IsVM==true)&&(_1fa.LIST!=undefined)&&(_1fa.LIST.length==0)){
var _203=_1fc.previousSibling;
_203.parentNode.removeChild(_203);
}
}
};
_1f7.prototype.defineRow=function(row){
this.menuRows.push(row);
};
_1f7.prototype.create=function(){
if(typeof this.layout==="undefined"||this.layout===null||!(this.layout.where)){
return _1f2.status("ics_navbar_status_invalid_input",null);
}
if(this.menuRows){
this.layout.items=this.menuRows;
}
var _204=_205(this.layout,this.navbar_data);
return _1f2.status("ics_navbar_status_ok",_204);
};
_1f7.prototype.adopt=function gizmo_menu_adopt(_206){
if(_206){
_207("."+_206.className.replace(/ /gi,"."),_206);
_206.setAttribute("tabindex","0");
var img=_1f6["menu.svg"];
var frag=document.createElement("div");
frag.innerHTML=img;
_206.appendChild(frag.firstElementChild);
}
};
function _205(_208,_209){
var _20a=_1f7.deleteExistingMenu(_208);
var node=_1f7.buildMenuNode(_208,_209);
if(_20a){
var _20b=false;
var _20c=-1;
for(var i=0;i<_208.items.length;i++){
var row=_208.items[i];
var _20d=_202(_20a,row,_209);
if(_20d){
if(row[0].dyn){
_20b=true;
}else{
_20c=i;
}
}
}
if(_20a.hasChildNodes()){
node.appendChild(_20a);
var _20e=false;
_208.where.appendChild(node);
if(!_20e){
_207("."+node.className.replace(/(?:^|\s)hidden(?!\S)/g,"").replace(/ /gi,"."),node);
}
}else{
node=null;
}
}
return node;
};
_1f7.buildMenuNode=function(_20f,_210){
var node=null;
var frag=document.createElement("div");
var _211=_20f.where;
_20f.where=frag;
_20f.type="menu";
var _212=new _1f3(_20f,_210);
var link=_212.create();
if(link.status==="ics_navbar_status_ok"){
_1f2.addAttribute(new Array(link.object),"class","navmenu");
_1f2.addAttribute(new Array(link.object),"tabindex","0");
if(_20f.role&&_20f.ariaLabel){
_1f2.addAttribute(new Array(link.object),"role",_20f.role);
_1f2.addAttribute(new Array(link.object),"aria-haspopup","true");
if(!_20f.imgOnly){
_1f2.addAttribute(new Array(link.object),"aria-label",i18n[_20f.ariaLabel]);
}
}
node=frag.firstElementChild;
}
_20f.where=_211;
return node;
};
_1f7.deleteExistingMenu=function(_213){
var _214=null;
var frag=document.createElement("div");
if(_213.selector){
var _215=_213.where.querySelector("."+_213.selector);
if(_215){
var _214=_215.querySelector("ul");
if(_214){
frag.appendChild(_214);
_215.parentNode.removeChild(_215);
_214=frag.firstElementChild;
_1f2.setAttribute(new Array(_214),"role","menu");
_1f2.setAttribute(new Array(_214),"aria-labelledby",_213.id);
if(_213.imgOnly){
_1f2.addAttribute(new Array(_214),"title","");
}
for(var i=0;i<_214.children.length;i++){
_1f2.setAttribute(new Array(_214.children[i].children[0]),"role","menuitem");
_1f2.setAttribute(new Array(_214.children[i].children[0]),"tabindex","0");
}
}
}
}
if(!_214){
_214=document.createElement("ul");
_1f2.addAttribute(new Array(_214),"role","menu");
_1f2.addAttribute(new Array(_214),"aria-labelledby",_213.id);
if(_213.imgOnly){
_1f2.addAttribute(new Array(_214),"title","");
}
}
return _214;
};
function _207(_216,node){
var _217=node.querySelector(".navmenu > ul");
if(_217){
_217.classList.add("navsimplelist");
}
_218(_216,node);
};
function _218(_219,node){
var _21a=function(_21b){
_1f5.closeMenus(_21b,_21a);
};
var _21c=function(_21d){
_1f5.toggleMenu(_219,_21d,_21a);
};
var _21e=function(){
_1f5.showMenu(_219);
};
var _21f=function(_220){
_1f5.keyToggleMenu(_219,_220,_21a,true);
};
var _221=function(){
_1f5.clearFocus();
};
node.addEventListener("click",_21c);
node.addEventListener("mouseenter",_21e);
node.addEventListener("keydown",_21f);
node.addEventListener("mouseout",_221);
};
function _222(item,_223){
var _224=null;
if(item.type==="text"){
_224=(new _1f4(item,_223)).create();
}else{
if(item.type==="link"){
_224=(new _1f3(item,_223)).create();
}else{
if(item.type&&item.type.toLowerCase()==="off"){
return null;
}
var _225="Unsupported navbar object type ("+item.type+") for item: "+item.text;
if(console){
console.log(_225);
}
return null;
}
}
if(!_224||_224.status!=="ics_navbar_status_ok"){
return null;
}
return _224.object;
};
function _226(item,_227){
var url=item.includeScript;
if(_227!==null){
url=_1f2.replacePlaceHolders(url,_227);
}
if(typeof url==="undefined"||url.indexOf("http")!=0){
return;
}
var xhrC=new XMLHttpRequest();
xhrC.onreadystatechange=function(){
if(xhrC.readyState===4&&(xhrC.status===200||xhrC.status===304)){
var res=xhrC.responseText;
var _228=res.slice(res.indexOf("{"),res.indexOf("]")+2);
var _229=/\\u([\d\w]{4})/gi;
_228=_228.replace(_229,function(_22a,_22b){
return String.fromCharCode(parseInt(_22b,16));
});
_228=_228.replace(/\\/g,"");
var _22c;
try{
_22c=JSON.parse(_228);
}
catch(err){
if(typeof console==="undefined"||typeof console.log==="undefined"){
if(window.console&&"function"===typeof window.console.log){
window.console.log(err);
}
}else{
console.log(err);
}
return false;
}
if(_22c.LIST){
if(item.dyn){
_1f7.navigation_replace_dyn_link_placeholder(_22c,item);
}else{
if(item.dyn_ext){
_1f7.navigation_add_extensions_to_apps(_22c,item);
}
}
}
}else{
if(xhrC.status!=200){
var res=xhrC.responseText;
if(res.length>0){
var err=JSON.parse(res);
if(err!=undefined&&err.exception){
if(typeof console==="undefined"||typeof console.log==="undefined"){
if(window.console&&"function"===typeof window.console.log){
window.console.log(err.exception);
}
}else{
console.log(err.exception);
}
}
}
}
}
};
xhrC.open("GET",url,true);
xhrC.withCredentials=true;
xhrC.send(null);
};
_1f7.navigation_add_extensions_to_apps=function(_22d,_22e){
if(_22e&&_22e.dyn_ext){
var node=document.querySelector("."+_22e.dyn_ext);
var _22f=node.parentNode.parentNode;
var _230=parseInt(_22e.max_cols);
var _231=Math.floor(_22d.LIST.length/_230);
var _232=_22d.LIST.length%_230;
var indx=0;
for(var i=0;i<_231;i++){
indx=_233(_22f,_230,_22d,indx);
}
_233(_22f,_232,_22d,indx);
var _234=node.parentNode;
node.parentNode.parentNode.removeChild(_234);
var _235=document.querySelector(".apps.navmenu.hidden");
if(_235&&_22d.LIST.length>0){
_235.className=_235.className.replace(/(?:^|\s)hidden(?!\S)/g,"");
}
}
};
function _233(_236,_237,_238,indx){
var _239=document.createElement("li");
for(var i=0;i<_237;i++){
var link=_238.LIST[indx];
var row=[];
layout={};
layout.type="link";
layout.text=link.title;
layout.url=link.path;
layout.order=link.order;
if(typeof link.window_features==="string"||link.window_features instanceof String){
layout.windowparams=link.window_features;
var _23a=link.window_features.split(",")[0];
var _23b=_23a.split("=");
if(_23b[0]==="ignoreBrowserTabSetting"){
if(_23b[1]==="true"){
layout.extBehavior=true;
}
}
}
layout.where=_236;
layout.target="_blank";
row.push(layout);
_202(_236,row,{},_239);
indx++;
}
return indx;
};
function _202(_23c,row,_23d,_23e){
if(_23e==undefined){
_23e=document.createElement("li");
}
if(row[0].selector){
_1f2.addAttribute(new Array(_23e),"class",row[0].selector);
}
var _23f=null;
for(var j=0;j<row.length;j++){
var item=row[j];
item.where=_23e;
_23f=_222(item,_23d);
if(item.dyn){
_1f2.addAttribute(new Array(_23f),"class",item.dyn);
_226(item,_23d);
}
if(item.dyn_ext){
_1f2.addAttribute(new Array(_23f),"class",item.dyn_ext);
_226(item,_23d);
}
}
if(_23e.hasChildNodes()){
_23c.appendChild(_23e);
}
return _23f;
};
function _240(frag,_241,_242){
frag.innerHTML="";
_241.where=frag;
new _1f3(_241,_242).create();
};
return _1f7;
}.apply(_1ee,_1f0),_1f1!==undefined&&(_1ed.exports=_1f1));
},function(_243,_244,_245){
var _246,_247;
!(_246=[_245(12),_245(11),_245(23)],_247=function(_248,_249,i18n){
function _24a(_24b,_24c){
this.layout=_24b;
this.navbar_data=_24c;
};
_24a.prototype.create=function(){
if(typeof this.layout==="undefined"||this.layout===null||!(this.layout.where)||!(this.layout.text)){
return _248.status("ics_navbar_status_invalid_input",null);
}
var _24d=_24e(this.layout,this.navbar_data);
return _248.status("ics_navbar_status_ok",_24d);
};
function _24e(_24f,_250){
var frag=document.createElement("div");
var id="";
if(_24f.id){
id="id = \""+_24f.id+"\" ";
}
var cls="";
if(_24f.selector){
cls+="class = \""+_24f.selector;
if(_24f.selector===_250["selected"]){
cls+=" selected";
}
cls+="\"";
}
var _251=i18n[_24f.text];
if(typeof _251==="string"&&_251!==""){
var text=_251;
}else{
var text=_24f.text;
}
if(_250!==null){
text=_248.replacePlaceHolders(text,_250);
}
frag.innerHTML=_252(text,id,cls);
var node=_24f.where.appendChild(frag.firstElementChild);
return node;
};
function _252(text,id,cls){
var _253="";
_253+="<a ";
_253+=cls;
_253+=id;
_253+=">";
_253+=text;
_253+="</a>";
return _253;
};
return _24a;
}.apply(_244,_246),_247!==undefined&&(_243.exports=_247));
},function(_254,_255,_256){
var _257,_258;
!(_257=[_256(12)],_258=function(_259){
function _25a(_25b,_25c){
this.layout=_25b;
this.navbar_data=_25c;
};
_25a.prototype.create=function(){
var _25d=_25e(this.layout,this.navbar_data);
return _259.status("ics_navbar_status_ok",_25d);
};
function _25e(_25f,_260){
var frag=document.createElement("div");
var img="";
if(_25f.img){
img+="src=\""+_259.replacePlaceHolders(_25f.img,_260)+"\" alt=\"\" ";
}
var _261="";
if(_25f.imgCls){
_261+="class = \""+_25f.imgCls+"\" ";
}
var _262="";
if(_25f.onError){
_262+="onerror = \"var node = document.querySelector('.orglogo');node.parentNode.removeChild(node);\"";
}
frag.innerHTML=_263(img,_261,_262);
var node=_25f.where.appendChild(frag.firstElementChild);
return node;
};
function _263(img,_264,_265){
var _266="";
_266+="<img ";
_266+=_264;
_266+=img;
_266+=_265;
_266+=">";
_266+="</img>";
return _266;
};
return _25a;
}.apply(_255,_257),_258!==undefined&&(_254.exports=_258));
},function(_267,_268,_269){
var _26a,_26b;
!(_26a=[_269(17),_269(13)],_26b=function(_26c,has){
function _26d(_26e,_26f){
this.callbacks=[];
this.callbacks.push(_26f);
this.dataReady=false;
_26d.prototype.isCreated=function(_270){
if(has("bvt")){
console.log("*NAVBAR NavbarData.isCreated register callback");
}
this.callbacks.push(_270);
if(this.dataReady){
_26d.notifyCaller(this.navbar_data,[_270]);
}
};
_26d.prototype.create=function(){
if(has("bvt")){
console.log("*NAVBAR NavbarData.create where="+(_26e?_26e.className:none));
}
if(!_26e){
this.where=_26e=document.querySelector(".ics-scbanner");
}
if(_26e){
var _271=_26d.getDataFromDIVTag(_26e);
if(has("bvt")){
console.log("*NAVBAR NavbarData.create navbar_data keys="+(_271?Object.keys(_271):none));
}
var _272=_273(_271);
if(has("bvt")){
console.log("*NAVBAR NavbarData.create missing_data_params="+_272);
}
var _274=(typeof _271.navapi!=="undefined")&&(_271.navapi!=="")&&(_272!==null);
if(_274){
var url=_271.navapi+"/navbar/bannernext"+_272+"&r=5";
if(has("bvt")){
console.log("*NAVBAR NavbarData.create calling Servlet with url="+url);
}
var that=this;
_26c.get(url,{handleAs:"json",timeout:8000,headers:{"X-Requested-With":null},withCredentials:true}).then(function(resp){
if(resp){
_271=_26d.mergeDataAttributes(resp,_271);
_26d.prototype.navbar_data=_271;
that.dataReady=true;
_26d.notifyCaller(_271,that.callbacks);
}
});
}else{
if(has("bvt")){
console.log("*NAVBAR NavbarData.create not calling Servlet but need to notify callers");
}
_26d.prototype.navbar_data=_271;
this.dataReady=true;
_26d.notifyCaller(this.navbar_data,this.callbacks);
}
}
};
_26d.prototype.hasEntitlement=function(_275){
if(this.navbar_data&&this.navbar_data.entitle&&_275&&(this.navbar_data.entitle.indexOf(_275)>-1)){
return true;
}
return false;
};
_26d.prototype.hasMarketplace=function(){
if(this.navbar_data&&this.navbar_data.entitle&&(this.navbar_data.entitle.join().indexOf("ess_um")>-1)){
return true;
}
return false;
};
_26d.prototype.hasOrgEntitlement=function(_276){
if(this.navbar_data&&this.navbar_data.orgentitle&&_276&&(this.navbar_data.orgentitle.indexOf(_276)>-1)){
return true;
}
return false;
};
_26d.prototype.hasRole=function(role){
if(this.navbar_data&&this.navbar_data.roles&&role&&(this.navbar_data.roles.indexOf(role)>-1)){
return true;
}
return false;
};
_26d.prototype.hasOffering=function(_277){
if(this.navbar_data&&this.navbar_data.offerings&&_277&&(this.navbar_data.offerings.indexOf(_277)>-1)){
return true;
}
return false;
};
_26d.prototype.hasVendor=function(_278){
if(this.navbar_data&&this.navbar_data.entitlevendor&&_278&&(this.navbar_data.entitlevendor.indexOf(_278)>-1)){
return true;
}
return false;
};
_26d.prototype.hasGatekeeper=function(_279){
if(this.navbar_data&&this.navbar_data.gk&&_279&&(this.navbar_data.gk.indexOf(_279)>-1)){
return true;
}
return false;
};
_26d.prototype.getSetting=function(_27a){
if(this.navbar_data&&_27a&&this.navbar_data[_27a]){
return this.navbar_data[_27a];
}
return null;
};
function _273(_27b){
if(has("bvt")){
console.log("*NAVBAR NavbarData.computeApiParams");
}
var _27c="?";
if(typeof (_27b["ssraw"])==="undefined"){
_27c=_27c+"rp=ssraw&";
}
if(typeof (_27b["roles"])==="undefined"){
_27c=_27c+"rp=roles&";
}
if(typeof (_27b["entitle"])==="undefined"){
_27c=_27c+"rp=entitle&";
}
if(typeof (_27b["offerings"])==="undefined"){
_27c=_27c+"rp=offerings&";
}
if(typeof (_27b["orgentitle"])==="undefined"){
_27c=_27c+"rp=orgentitle&";
}
if(typeof (_27b["gk"])==="undefined"){
_27c=_27c+"rp=gk&";
}
if(typeof (_27b["entitlevendor"])==="undefined"){
_27c=_27c+"rp=entitlevendor&";
}
if(typeof (_27b["orgsub"])==="undefined"){
_27c=_27c+"rp=orgsub&";
}
_27c+="rp=replacements&rp=srvconfigs";
return _27c;
};
};
_26d.getDataFromDIVTag=function(_27d){
if(has("bvt")){
console.log("*NAVBAR NavbarData.getDataFromDIVTag");
}
var _27e={};
if(_27d){
var _27f=_27d.attributes;
if(_27f){
for(var i=0;i<_27f.length;i++){
var _280=_27f[i];
var _281=_280.name.trim().toLowerCase();
var _282=_280.value;
if(_281.indexOf("data-")>-1){
_281=_281.replace("data-","");
if(_281==="ssraw"){
if(!_27e.ssraw){
_27e.ssraw=[];
}
_27e.ssraw.push(_282);
}else{
_27e[_281]=_282;
}
}
}
}
}
return _27e;
};
_26d.notifyCaller=function(cfg,_283){
if(has("bvt")){
console.log("*NAVBAR NavbarData.notifyCaller");
}
cfg.offerings=_26d.fixCfg(cfg.offerings);
cfg.roles=_26d.fixCfg(cfg.roles);
cfg.entitle=_26d.fixCfg(cfg.entitle);
cfg.orgentitle=_26d.fixCfg(cfg.orgentitle);
cfg.gk=_26d.fixCfg(cfg.gk);
cfg.entitlevendor=_26d.fixCfg(cfg.entitlevendor);
for(var i=0;i<_283.length;i++){
var _284=_283[i];
if(has("bvt")&&_284){
var _285=(_284.name?_284.name:"unknown");
console.log("*NAVBAR NavbarData.notifyCaller notify #"+(i+1)+" of "+_283.length+" start");
console.log("*NAVBAR NavbarData.notifyCaller callback name = "+_285);
console.log("*NAVBAR NavbarData.notifyCaller callback snippet = "+_284.toString().substring(0,300)+" ... ");
}
if(typeof _284==="function"){
_284();
}
if(has("bvt")){
console.log("*NAVBAR NavbarData.notifyCaller notify #"+(i+1)+" of "+_283.length+" end");
}
}
};
_26d.fixCfg=function(data){
if(!(typeof data==="undefined")&&typeof data==="string"){
data=data.replace(/\s/g,"");
if(data===""){
data=[];
}else{
data=data.split(",");
}
}
return data;
};
_26d.mergeDataAttributes=function(_286,_287){
_286.bannernext.gk=_26d.fixGKValues(_286.bannernext.gk);
var _288=_287;
if(_286&&_286.bannernext){
var keys=Object.keys(_286.bannernext);
if(keys){
for(var i=0;i<keys.length;i++){
var key=keys[i];
if(!_288[key]){
if(key==="ssraw"){
_288[key]=_286.bannernext[key];
}else{
_288[key]=_286.bannernext[key].toString();
}
}
}
}
}
if(!_288.entitle){
_288.entitle="";
}
if(!_288.offerings){
_288.offerings="";
}
if(!_288.roles){
_288.roles="";
}
if(!_288.gk){
_288.gk="";
}
if(!_288.entitlevendor){
_288.entitlevendor="";
}
if(!_288.ssraw){
_288.ssraw="";
}
return _288;
};
_26d.fixGKValues=function(_289){
if(typeof _289==="string"){
return _289;
}
var _28a="";
for(var i=0;i<_289.length;i++){
if(_289[i][Object.keys(_289[i])]==="true"){
_28a=_28a+Object.keys(_289[i])+",";
}
}
_28a=_28a.substring(0,_28a.length-1);
return _28a;
};
return _26d;
}.apply(_268,_26a),_26b!==undefined&&(_267.exports=_26b));
},function(_28b,_28c,_28d){
!([],_28b.exports={"auth-left.myPartnerPage":".org","auth-left.dashboard-handler":".backto","auth-left.lotusBannerHomepage":".home","auth-left.dom_mail":".mail","auth-left.dom_calendar":".calendar","auth-left.yun_mail":".mail","auth-left.yun_calendar":".calendar","auth-left.networkMenu":".people","auth-left.communitiesMenu":".communities","auth-left.servicesMenu":".apps","auth-right.chatMenu":".chat","auth-right.notificationsMenu":".notifications","auth-right.bss-usersMenu":".user","auth-right.bsscom-helpMenu":".help","auth-left.ics-banner":".home"});
}]);
});

