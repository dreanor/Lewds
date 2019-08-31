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
		var content = data[11]
		var index = content.indexOf("<") + 1
		var sub = content.substring(index).replace(">", "")
		var test = sub.split(',')
		
		var x = document.querySelector(".picker");
		
		test.forEach(function(element){
		
			var option = document.createElement("option");
			option.text = element.replace("'", "").replace("'", "");
			
			x.add(option);
		})
	}
});

document.addEventListener('keydown', logKey);
document.addEventListener("click", nextImage);

function nextImage(e) {
	var picker = document.querySelector(".picker");
	var value = picker.options[picker.selectedIndex].value;
	
	getJSON('https://nekos.life/api/v2/img/' + value,
	function(err, data) {
		if (err == null) {
				var img = document.querySelector('.img');
				console.log(img)
				img.src = data.url;
				document.body.appendChild(img);
				console.log(data.url)
		}
	});
}

function logKey(e) {
	var picker = document.querySelector(".picker");
	var value = picker.options[picker.selectedIndex].value;

	if((e.key == "ArrowUp" || e.key == "w" || e.key == "W") && picker.selectedIndex != 0) {
		picker.selectedIndex = picker.selectedIndex -1
		e.returnValue = false;
	}
	
	if((e.key == "ArrowDown" || e.key == "s" || e.key == "S") && picker.selectedIndex != picker.length-1) {

		picker.selectedIndex = picker.selectedIndex +1
		e.returnValue = false;
	}

	if(e.key == "ArrowRight" || e.key == "ArrowLeft" || e.key == "d" || e.key == "D" || e.key == "A" || e.key == "a") {
		
		getJSON('https://nekos.life/api/v2/img/' + value,
		function(err, data) {
			if (err == null) {
					var img = document.querySelector('.img');
					console.log(img)
					img.src = data.url;
					document.body.appendChild(img);
					console.log(data.url)
			}
		});
	}
}