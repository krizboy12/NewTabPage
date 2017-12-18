$(document).ready(function() {
	getList();
});

function trimJSON(data) {
	// extract the text to put in the log
	var $regex = /\[?({(("[a-zA-Z_$][a-zA-Z_$0-9]*"):(".*"|null),?)+},?)+\]?/g;

	var str = [
		data.replace($regex, ""),
		data.match($regex)
	];

	return str;
}

function getList() {	
	$.ajax({
		url: "getLinks.php",
		type: "GET",
		success: function(data, status) {
			var data = trimJSON(data);
			console.log("AJAX status: " + status + "\nData recieved:\n" + data[0]);
			var json = $.parseJSON(data[1]);

			for (var index in json) {
				$("#list").append(json[index]["label"] + ": " + json[index]["link"]);
			}
		},
		error: function(data, status) {
			console.log("AJAX status: " + status + "\nData recieved:\n" + data[0]);
		}
	})
}

