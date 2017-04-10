chrome.runtime.onMessage.addListener(function(request) {
  window.srcUrl = request.srcUrl;
  window.folders = JSON.parse(request.folders);
  var imagetoadd=document.createElement('img');
  imagetoadd.src = window.srcUrl;
  document.getElementById("image_placeholder").appendChild(imagetoadd);
});
document.forms[0].onsubmit = function(e) {
    e.preventDefault(); // Prevent submission
    var folder_name = document.getElementById('folder_name').value;
    var image_name = document.getElementById('image_name').value;
    var srcUrl = window.srcUrl;
    chrome.runtime.getBackgroundPage(function(bgWindow) {
        bgWindow.createFolder(folder_name, image_name, srcUrl);
        window.close();     // Close dialog
    });
};
