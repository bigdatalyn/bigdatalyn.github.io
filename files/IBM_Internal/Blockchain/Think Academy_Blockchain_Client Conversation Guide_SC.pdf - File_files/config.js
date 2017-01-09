(function() {
var _webUri = "/files/";
var _webCommonUri = "/files/nav/common/";
var _webStaticUri = "\/files\/static\/20160903.134200!en_us\/";
var _formattingLocaleParam = "en_us";
_formattingLocaleParam = _formattingLocaleParam.replace("_", "-");
if(_formattingLocaleParam == "iw")
   _formattingLocaleParam = "he";

window._lconn_files_config = {
	language: "en-us",
	translationLanguage: "en",
	formattingLanguageParam: _formattingLocaleParam,
	version: "20160903.134200",
	releaseVersion: "5.5.0.0",
	applicationUri: "https://apps.na.collabserv.com/files/",
	applicationUriUnsecure: "https://apps.na.collabserv.com/files/",
	applicationUriSecure: "https://apps.na.collabserv.com/files/",
	baseUri: _webUri,
	baseCommonUri: _webCommonUri,
	baseStaticUri: _webStaticUri,
	isCloudMode: true, 
   commentMentionsEnabled: true,
   communityFiles: {
      filesTab: {
         defaultSortOrder: "modified"
      },
      restrictUserInComm: true
    },
	features: {
      addToSyncInListView: true,
      compactFolderPicker: true,
      compactFilePicker: true,
      communityFolder: true,
      dragAndDropIndicatorForPersonalFiles: true,
      preview: true,
      fileSync: {
         enabled: true,
         clientDownloadLinkEnabled:  true,
         clientDownloadLink: "/downloads/",
         clientPlatforms: { win: {enabled:true,url:"/downloads/"},mac: {enabled:true,url:"/downloads/"}},
         displayBluebox: true
      },
      roundTripEditing: {
         extensions: [".ods",".xls",".odt",".pptx",".ppt",".xlsx",".doc",".odp",".docx"]
      },
      detailedDownloads: true,
      encryption: true,
      ecmFilesEnabled: false,
      
		versioning: true,
		trash: true,
		communityTrash: true,
        personalFileSharing: true,
		preModeration: false,
		recentUpdates: true,
		zipDownload: true,
		following: true,
		sharingIntent: true,
		isExternalDefault: true,
		uploadFileUseFlash: true,
		resharing: {
			"enabled": true,
			"default": false
		}		
	},
	helpUri: "https://apps.na.collabserv.com/help/topic/com.ibm.lotus.connections.files.help/{topic}",
	demoUri: "http://ibmtvdemo.edgesuite.net/software/lotus/uxid/connections/files40/files_demo.html",
	auth: {
   
		className: "com.ibm.ajax.auth",

		standardLogin: false
	},
	openFromWeb: {
   
	},
	
	apiFormService: "/files/form/",
	apiBasicService: "/files/basic/",

	downloadZipEncodings: [
		{name: "English and Western European", value: "CP1252"},
		{name: "Chinese (simplified)", value: "MS936"},
		{name: "Chinese (traditional)", value: "MS950"},
		{name: "Japanese", value: "MS932"},
		{name: "Korean", value: "MS949"},
		{name: "Polish", value: "CP852"},
		{name: "Turkish", value: "CP857"},
		{name: "Greek", value: "CP737"},
		{name: "Russian", value: "CP1251"},
		{name: "Thai", value: "MS874"}
	],

	services: {
        maxTagFilters: 3,
		disableAnonymous: true,
		loginUri: "/files/form/login_redirect",
		loginPostUri: "https://apps.na.collabserv.com/files/j_security_check",
		logoutUri: "/files/ibm_security_logout?logoutExitPage=%2F",
		maxFileSize: 2147483648,
		maxPageSize: 1048576,
		maxAttachmentSize: 78643200,
		multiPhaseFileUpload: true,
		userPhotoUri: _webCommonUri + "styles/images/profileNoPhoto.gif",

		connections: {
			enabled: {
         			homepage: true,
         			profiles: false,
         			communities: true,
         			blogs: true,
         			dogear: false,
         			activities: true,
         			files: true,
         			forums: true,
         			wikis: true,
         			search: true,
         			news: true,
         			infra: false
			},
			uri: {
				homepage: "https://apps.na.collabserv.com/homepage",
				communities: "https://apps.na.collabserv.com/communities",
				blogs: "https://apps.na.collabserv.com/blogs",
				activities: "https://apps.na.collabserv.com/activities",
				files: "https://apps.na.collabserv.com/files",
				forums: "https://apps.na.collabserv.com/forums",
				wikis: "https://apps.na.collabserv.com/wikis",
				search: "https://apps.na.collabserv.com/search",
				news: "https://apps.na.collabserv.com/news"
			}
		},
		externalSearchScopes: [],   
		peopleSearch: {maxResults: 100}   
	},
	actionConfig: {
	   isActionAllowed: function(objType, user, action){
	      var actionsControls = {
		   "00000000-0000-0000-0001-000000000000": {downloadEmptyFile: {
	               name: "downloadEmptyFile",
	               enabled: false
	            },
download: {
	               name: "download",
	               enabled: true
	            },
uploadNewVersion: {
	               name: "uploadNewVersion",
	               enabled: true
	            },
restoreVersion: {
	               name: "restoreVersion",
	               enabled: true
	            }}
		   };
		   var actionControl = actionsControls[objType];
		   if (actionControl && actionControl[action]){
		      var action = actionControl[action];
		      if (action){ //if action not defined, we think it always allowed
		         if (action.enabled){
		            if (action.roles){//if action doesn't have roles, we think it is allowed to every user
		               if (user && user.roles){
		                  var found = false;
		                  for(var i=0; i<action.roles.length; i++){
		                     for(var j=0; j<user.roles.length; j++){
		                        if (action.roles[i] == user.roles[j]) {
		                           found = true;
		                           break;
		                        }
		                     }
		                  }
		                  if (found) 
		                     return action.mode == "allow";
		                  else 
		                     return action.mode == "deny";
		               }else // if anounymous user or user doesn't have role, we think it's not allowed
		                  return false;
		            }else {
		               return action.mode != "allow"; // If mode is 'allow' but no roles are defined, anyone is rejected.
		            }
		         }else 
		            return false;
		      }else 
		         return true;
        }
        return true;
	  }
	}
};
})();

window._lconn_files_config_xslt_list = {};
