<html>
    <head>
        <meta charset="utf-8">
        <title>New Tab</title>
        <link href="https://fonts.googleapis.com/css?family=Roboto+Mono" rel="stylesheet">

        <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
        <link rel="stylesheet" href="css/modal.css">
        <link rel="stylesheet" href="css/dimmer.css">
        <link rel="stylesheet" href="css/transition.css">
        <link rel="stylesheet" href="css/button.css">
        <link rel="stylesheet" href="css/dropdown.css">
        <link rel="stylesheet" type="text/css" href="css/styles.css">
        <link rel="shortcut icon" type="image/png" href="images/favicon.jpg" />

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        <script src="js/modal.min.js"></script>
        <script src="js/dimmer.min.js"></script>
        <script src="js/transition.min.js"></script>
        <script src="js/dropdown.js"></script>
        <script src="js/sha256.min.js"></script>
        <script src="js/control.js"></script>
    </head>


    <body>
        <div class="ui-widget">
          <input id="tags">
        </div>

        <div id="search-display">

        </div>

        <div id="settings">
            <img class="background" src="images/settings.svg" />
        </div>

        <div class="ui small basic modal settings select">
        	<div class="context">
        		<button id="add" class="massive ui basic inverted button" tabindex="0">Add</button>
        		<button id="remove" class="massive ui basic inverted button" tabindex="0">Remove</button>
        		<button id="update" class="massive ui basic inverted button" tabindex="0">Update</button>
        	</div>
        </div>

        <div class="ui small basic modal settings add">
            <div class="context">
                <input class="text-input" type="text" id="add-text-label" placeholder="Label">
                <input class="text-input" type="text" id="add-text-link" placeholder="Link">
            </div>
            <div class="context">
                <button class="massive ui basic inverted button" id="submit-add">Submit</button>
            </div>
        </div>

        <div class="ui small basic modal settings remove">
            <div class="context">
                <select id="remove-select-label" multiple="" class="ui fluid search dropdown"></select>
            </div>
            <div class="context">
                <button class="massive ui basic inverted button" id="submit-remove">Submit</button>
            </div>
        </div>

        <div class="ui small basic modal settings update">
            <div class="context">
                <select id="update-select-label" class="ui fluid search dropdown"></select>
                <input class="text-input" type="text" id="update-text-link" placeholder="Link">
            </div>
            <div class="context">
                <button class="massive ui basic inverted button" id="submit-update">Submit</button>
            </div>
        </div>
        <script src="js/view.js"></script>
    </body>


</html>
