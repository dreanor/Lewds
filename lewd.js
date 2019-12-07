var baseSearchUrl = 'https://trace.moe/?url=';
var nekoImageEndpoint = 'https://nekos.life/api/v2/img/';
var nekoEndpoints = 'https://nekos.life/api/v2/endpoints';

var getJSON = function(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function() {
    var status = xhr.status;
  
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};

getJSON(nekoEndpoints,
function(err, data) {
  if (err == null) {
    var content = data[11];
    var index = content.indexOf("<") + 1;
    var sub = content.substring(index).replace(">", "").replace("'8ball',", "").replace("'nekoapi_v3.1',", "").replace("'v3',", "");
    
    var splitted = sub.split(',');
    var sorted = splitted.map(x => x.trim()).sort(function (a, b) {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    });
    
    var picker = document.querySelector(".picker");
    
    sorted.forEach(function(element){
      var option = document.createElement("option");
      option.text = element.replace("'", "").replace("'", "");
      picker.add(option);
    })
  }
});

document.addEventListener('keydown', handleKey);
document.addEventListener("click", nextImage);

function nextImage(e) {
  if(e.target.id != "pick" && e.target.id != "source") {
    var picker = document.querySelector(".picker");
    var value = picker.options[picker.selectedIndex].value;
    showNextImage(picker, value);
  }
}

function handleKey(e) {
  var picker = document.querySelector(".picker");
  var value = picker.options[picker.selectedIndex].value;

  if((e.key == "ArrowUp" || e.key == "w" || e.key == "W") && picker.selectedIndex != 0) {
    picker.selectedIndex = picker.selectedIndex - 1;
    e.returnValue = false;
  }
  
  if((e.key == "ArrowDown" || e.key == "s" || e.key == "S") && picker.selectedIndex != picker.length-1) {
    picker.selectedIndex = picker.selectedIndex +1 ;
    e.returnValue = false;
  }

  if(e.key == "ArrowRight" || e.key == "ArrowLeft" || e.key == "d" || e.key == "D" || e.key == "A" || e.key == "a") {
    showNextImage(picker, value);
  }
}

function showNextImage(picker, value){
  var link = document.querySelector(".btn");
  getJSON(nekoImageEndpoint + value,
    function(err, data) {
      if (err == null) {
        var img = document.querySelector('.img');
        img.src = data.url;
		link.href = baseSearchUrl + data.url;
      }
    });
}