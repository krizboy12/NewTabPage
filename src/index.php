<html>
    <head>
        <meta charset="utf-8">
        <title>New Tab</title>
        <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        <script src="control.js"></script>

        <link rel="stylesheet" type="text/css" href="styles.css">
    </head>


    <body>
        <div class="ui-widget">
          <input id="tags">
        </div>

        <div id="search-display">

        </div>

        <script>
            /*
             * Global Variable Definitions
             */
			var ids = [];
            var labels = [];
            var links = [];
            var enteringNewLink = false;

            /**
             * Splits the pulled database table by its columns into individual
             * arrays. In doing this the n'th element of one array corresponds
             * to the n'th element of another array. They came from the same
             * row in the table.
             * This is the AJAX callback function.
             * @param {string[][]} database_table - A two-dimensional table of
             * IDs, labels, and links pulled from the database.
             */
            var splitTable = function(database_table) {
                $.each(database_table, function(key, value) {
		    		ids.push(value.id);
                    labels.push(value.label);
                    links.push(value.link);
                });
            }

            /**
             * Updates the search display in the middle of the screen with the
             * top five results from the autocomplete.
             */
            var updateSearchDisplay = function(ac_results) {
                clearSearchDisplay();
                var entry;
                for(n = 0; n < ac_results.length; n++) {
                    entry = "<div class='entry'><a href='" + getLinkForLabel(ac_results[n]) + "'><span>";
                    entry += ac_results[n];
                    entry += "</span></a></div>";
                    $("#search-display").append(entry);
                }
            }

            var clearSearchDisplay = function() {
                $("#search-display").empty();
            }

            var getLinkForLabel = function(label) {
                return links[labels.indexOf(label)];
            }

            var redirectUser = function(ac_results, entered_text) {
                if(ac_results.length == 0)
                    if(entered_text.length == 0)
                        window.location.href = "https://www.google.com";
                    else
                        window.location.href = "https://www.google.com/search?q=" + entered_text.replace(/ /g, "+");
                else
                    window.location.href = getLinkForLabel(ac_results[0]);
            }

            var redirectUserURL = function(URL) {
                window.location.href = URL;
            }

            var there_is_no_help = function() {
                $("body").empty();
                $("body").css("background-image", "url(images/fuck_you.jpg)");
                $("body").css("background-repeat", "repeat");
                $("body").append("<video id='there_is_no_help' autoplay><source src='video/no_help.mp4' type='video/mp4'></video>");
            }

            $(document).ready(function(){
                $("#tags").hide();
                getList();
                var ac_results = [];
                $("#tags").autocomplete({
                        source: labels,
                        delay: 0,
                        minLength: 0,
                        response: function(event, ui) {
                            ac_results.length = 0;
                            for(var n = 0; n < 5; n++)
                                if(ui.content[n] != null)
                                    ac_results.push(ui.content[n].value);
                        },
                        open: function(event, ui) {
                            $(".ui-autocomplete").hide();
                        }
                });

                var entered_text = "";
                $(window).keydown(function(event) {
                    if(enteringNewLink)
                        return;

                    // If the key is a backspace, remove the rightmost character.
                    if(event.key == "Backspace")
                        entered_text = entered_text.slice(0, -1);
                    // If the user pressed an enter key, redirect them accordingly.
                    else if(event.key == "Enter") {
                        redirectUser(ac_results, entered_text);
                        return;
                    }
                    // If the user pressed some weird key (shift, control, capslock),
                    // ignore it.
                    else if(event.key.length != 1)
                        return;
                    else
                        entered_text += event.key;

                    if(entered_text.toLowerCase() == "help me")
                        there_is_no_help();

                    if(entered_text.length != 0) {
                        $("#tags").autocomplete("search", entered_text);
                        updateSearchDisplay(ac_results);
                    }
                    else
                        clearSearchDisplay();
                });
            });
        </script>
    </body>


</html>
