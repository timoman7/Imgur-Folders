addToFolder = function(data){
  var folders = window.localStorage.getItem("folders");
  if(folders){
    folders = JSON.parse(folders);
  }else{
    folders = {
      "examples":[
        {
          "image_name":"Javert",
          "type":"gif",
          "srcUrl":"http://i.imgur.com/H4sq6h8.gif",
        },
      ]
    };
  }
  chrome.tabs.create({
      url: chrome.extension.getURL('create-folder.html'),
      active: false,
  }, function(tab) {
      // After the tab has been created, open a window to inject the tab
      chrome.windows.create({
          tabId: tab.id,
          type: 'popup',
          focused: true,
          // incognito, top, left, ...
      }, function(newWindow){
        chrome.tabs.sendMessage(newWindow.tabs[0].id,{srcUrl:data.srcUrl, folders: JSON.stringify(folders)});
      });
  });
};

chrome.contextMenus.create({
  title: "Add to folder",
  contexts:["image", "video"],
  onclick: addToFolder,
  documentUrlPatterns: [
    "*://imgur.com/*",
    "*://*.imgur.com/*"
  ]
});

function createFolder(folder_name, image_name, src_url) {
  var image_type = src_url.split(".")[src_url.split(".").length-1];
  var folders = window.localStorage.getItem("folders");
  if(folders){
    folders = JSON.parse(folders);
  }else{
    folders = {
      "examples":[
        {
          "image_name":"Javert",
          "type":"gif",
          "srcUrl":"http://i.imgur.com/H4sq6h8.gif",
        },
      ]
    };
  }
  if(folders[folder_name]){
    folders[folder_name].push({
      "image_name":image_name,
      "type":image_type,
      "srcUrl":src_url,
    });
  }else{
    folders[folder_name] = [];
    folders[folder_name].push({
      "image_name":image_name,
      "type":image_type,
      "srcUrl":src_url,
    });
  }
  folders = JSON.stringify(folders);
  window.localStorage.setItem("folders",folders);
};
