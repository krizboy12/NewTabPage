<html>
    <head>
        <meta charset="utf-8">
        <title>New Tab</title>
        <link href="https://fonts.googleapis.com/css?family=Roboto+Mono" rel="stylesheet">
        <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
        <link rel="stylesheet" href="modal.css">
        <link rel="stylesheet" href="dimmer.css">
        <link rel="stylesheet" href="transition.css">
        <link rel="stylesheet" href="button.css">
        <link rel="shortcut icon" type="image/png" href="images/favicon.jpg" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        <script src="modal.min.js"></script>
        <script src="dimmer.min.js"></script>
        <script src="transition.min.js"></script>
        <script src="control.js"></script>
        <script src="view.js"></script>

        <link rel="stylesheet" type="text/css" href="styles.css">
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
        		<button class="massive ui basic inverted button" tabindex="0">Remove</button>
        		<button class="massive ui basic inverted button" tabindex="0">Update</button>
        	</div>
        </div>

        <div class="ui small basic modal settings add">
            <div class="context">
                <input class="text-input" type="text" id="text-label" placeholder="Label">
                <input class="text-input" type="text" id="text-link" placeholder="Link">
            </div>
            <div class="context">
                <button class="massive ui basic inverted button" id="submit-add">Submit</button>
            </div>
        </div>
    </body>


</html>
