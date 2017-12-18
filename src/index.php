<html>
	<head>
		<title>New Terb</title>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	</head>
	<body>
		<script>
			function trimJSON(data) {
				// extract the text to put in the log
				var $regex = /\[?({(("[a-zA-Z_$][a-zA-Z_$0-9]*"):(".*"|null),?)+},?)+\]?/g;

				var str = [
					data.replace($regex, ""),
					data.match($regex)
				];

				return str;
			}

			$.ajax({
				url: "getLinks.php",
				type: "GET",
				success: function(data, status) {
					var data = trimJSON(data);
					console.log("AJAX status: " + status + "\nData recieved:\n" + data[0]);
					var json = $.parseJSON(data[1]);

					for (var index in json) {
						$("body").append(json[index]["label"] + ": " + json[index]["link"]);
					}
				},
				error: function(data, status) {
					console.log("AJAX status: " + status + "\nData recieved:\n" + data[0]);
				}
			})

		</script>
	</body>
</html>
