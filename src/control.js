function adminDo() {
	var pass = prompt("Please enter the admin password");
	// check the password
	return (pass == "password");
}

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
 * @returns {array} 2D array: [index]["id"|label"|"link"]
*/
function getList() {
	$.ajax({
		url: "getList.php",
		type: "GET",
		success: function(data, status) {
			var data = trimJSON(data);
			logAJAX(status, data[0]);
			var json = $.parseJSON(data[1]);

			splitTable(json);
		},
		error: function(data, status) { logAJAX(status, data); }
	});
}

/**
 * @function addEntry
 * @param {string} la Label of the new entry
 * @param {string} li Associated link of the new entry
*/
function addEntry(la, li) {
	// if the user does not know the admin password, return
	if (adminDo())
		$.ajax({
			url: "addEntry.php",
			data: { label: la, link: li},
			type: "POST",
			success: function(data, status) {
				logAJAX(status, data); 
				ids.push(data.match(/\((\d+)\)/)[1]);
				labels.push(la);
				links.push(li);
			},
			error: function(data, status) { logAJAX(status, data); }
		});


}

/**
 * @function updateEntry
 * @param {string} id Database ID of the label, link pair
 * @param {string} la Label of the new entry
 * @param {string} li Associated link of the new entry
*/
function updateEntry(id, la, li) {
	if(adminDo())
		$.ajax({
			url: "updateEntry.php",
			data: {id: id, label: la, link: li},
			type: "POST",
			success: function(data, status) {
				logAJAX(status, data); 
				// update the label and link in the two arrays
				var i = ids.indexOf(id.toString());
				if (i >= 0) {
					labels[i] = la;
					links[i] = li;
				}
			},
			error: function(data, status) { logAJAX(status, data); } 
		});
}

/**
 * @function deleteEntry
 * @param {number} id Database ID number of the label, link pair
*/
function deleteEntry(id) {
	if (adminDo())
		$.ajax({
			url: "deleteEntry.php",
			data: {id: id},
			type: "POST",
			success: function(data, status) {
				logAJAX(status, data); 
				// remove the label and link from the two arrays
				var i = ids.indexOf(id.toString());
				if (i >= 0) {
					ids.splice(i, 1);
					labels.splice(i, 1);
					links.splice(i, 1);
				}
			},
			error: function(data, status) { logAJAX(status, data); } 
		});
}
