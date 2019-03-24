<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>NewTab</title>

		<%= css %>
		<%= lib %>
	</head>

	<body ng-app="newTabApp" capture-input>
		<status-bar></status-bar>

		<label-link-matches></label-link-matches>

		<current-input-display></current-input-display>

		<%= scripts %>
	</body>
</html>
