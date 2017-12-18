<html>
    <head>
        <meta charset="utf-8">
        <title>New Tab</title>
        <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        <script src="control.js"></script>

        <style>
            @import url('https://fonts.googleapis.com/css?family=Roboto+Mono');
            body {
                background-image: url('images/background.jpg');
            }

            #search-display {
                height: 20em;
                width: 45em;
                /* background-color: orange; */
                margin: 0 auto;
                margin-top: 3em;
            }

            .entry {
                width: 100%;
                height: 20%;
                text-align: center;
                vertical-align: middle;
                display: table;
                font-family: 'Roboto Mono', sans-serif;
                font-size: 3em;
                color: white;
            }

            .entry a {
                text-decoration: none;
                color: white;
            }

            .entry span {
                display: inline-block;
                vertical-align: middle;
                display: table-cell;
            }
        </style>
    </head>


    <body>
        <div class="ui-widget">
          <input id="tags">
        </div>

        <div id="search-display">

        </div>

        <script>
		var ids = [];
            var labels = [];
            var links = [];
            var enteringNewLink = false;

            var splitTable = function(database_table) {
                $.each(database_table, function(key, value) {
		    ids.push(value.id);
                    labels.push(value.label);
                    links.push(value.link);
                });
            }

            var updateSearchDisplay = function(ac_results) {
                $("#search-display").empty();
                var entry;
                for(n = 0; n < ac_results.length; n++) {
                    entry = "<div class='entry'><a href='" + getLinkForLabel + "'><span>";
                    entry += ac_results[n];
                    entry += "</span></a></div>";
                    $("#search-display").append(entry);
                }
            }

            var getLinkForLabel = function(label) {
                return links[labels.indexOf(label)]
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
                            console.log(ac_results);
                        },
                        open: function(event, ui) {
                            $(".ui-autocomplete").hide();
                        }
                });

                var entered_text = "";
                $(window).keydown(function(event) {
                    if(enteringNewLink)
                        return;

                    if(event.key == "Backspace")
                        entered_text = entered_text.slice(0, -1);
                    else if(event.key == "Enter") {
                        if(ac_results.length == 0)
                            if(entered_text.length == 0)
                                window.location.href = "https://www.google.com";
                            else
                                window.location.href = "https://www.google.com/search?q=" + entered_text.replace(/ /g, "+");
                        else
                            window.location.href = getLinkForLabel(ac_results[0]);
                        return;
                    }
                    else if(event.key.length != 1)
                        return;
                    else
                        entered_text += event.key;

                    $("#tags").autocomplete("search", entered_text);
                    updateSearchDisplay(ac_results);
                });
            });
        </script>
    </body>


</html>
