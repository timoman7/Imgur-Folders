var folders = JSON.parse(localStorage.getItem('folders'));
for(var i in folders){
  var folder = folders[i];
  var folder_span = document.createElement('span');
  var folder_name = document.createElement('button');
  folder_name.innerHTML = i;
  folder_name.addEventListener('onclick',function(){
    console.log(i);
    $('#'+i).collapse("toggle");
  });
  folder_span.className = 'folder';
  folder_span.appendChild(folder_name);
  var genBR = document.createElement('br');
  folder_span.appendChild(genBR);
  var genBR2 = document.createElement('br');
  folder_span.appendChild(genBR2);
  for(var j = 0; j < folder.length; j++){
    var favspan = document.createElement('span');
    favspan.id = folder[j].image_name;
    favspan.className = 'favorite';
    var newImage = document.createElement('img');
    newImage.src = folder[j].srcUrl;
    var textUrl = document.createElement('p');
    textUrl.innerHTML = "URL: "+folder[j].srcUrl;
    var textName = document.createElement('p');
    textName.innerHTML = "Name: "+folder[j].image_name;
    var textType = document.createElement('p');
    textType.innerHTML = "Type: "+folder[j].type;
    favspan.appendChild(textType);
    favspan.appendChild(textName);
    favspan.appendChild(textUrl);
    favspan.appendChild(newImage);
    folder_span.appendChild(favspan);
    if((newImage.width+40) > window.innerWidth){
      newImage.style.width = Math.round((newImage.width / window.innerWidth) * 50) + "%";
    }
  }
  folder_span.id = i;
  document.getElementById("folders").appendChild(folder_span);
}
