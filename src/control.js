function trimJSON(data) {
	// extract the text to put in the log
	var $regex = /\[?({(("[a-zA-Z_$][a-zA-Z_$0-9]*"):(".*"|null),?)+},?)+\]?/g;

	var str = [
		data.replace($regex, ""),
		data.match($regex)
	];

	return str;
}

function logAJAX(status, data) {
	console.log("AJAX status: " + status + "\nServer response:\n" + data);
}

/**
 * @function getList
 * @returns {array} 2D array: [index]["label"|"link"]
*/
function getList() {	
	$.ajax({
		url: "getList.php",
		type: "GET",
		success: function(data, status) {
			var data = trimJSON(data);
			logAJAX(status, data[0]);
			return $.parseJSON(data[1]);
		},
		error: function(data, status) { logAJAX(status, data); }
	})
}
/**
 * @function addEntry
 * @param {string} la Label of the new entry
 * @param {string} li Associated link of the new entry
*/
function addEntry(la, li) {
	$.ajax({
		url: "addEntry.php",
		data: { label: la, link: li},
		type: "POST",
		success: function(data, status) { logAJAX(status, data); },
		error: function(data, status) { logAJAX(status, data); }
	})
}
