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

getJSON('https://nekos.life/api/v2/endpoints',
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
  if(e.target.id == "pick") {
    e.returnValue = false;
    return;
  }
  
  var picker = document.querySelector(".picker");
  var value = picker.options[picker.selectedIndex].value;
  
  getJSON('https://nekos.life/api/v2/img/' + value,
  function(err, data) {
    if (err == null) {
      var img = document.querySelector('.img');
      img.src = data.url;
      document.body.appendChild(img);
    }
  });
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
    getJSON('https://nekos.life/api/v2/img/' + value,
    function(err, data) {
      if (err == null) {
        var img = document.querySelector('.img');
        img.src = data.url;
        document.body.appendChild(img);
      }
    });
  }
}