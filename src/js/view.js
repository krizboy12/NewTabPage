/*
 * Global Variable Definitions
 */
var ids = [];
var labels = [];
var links = [];
var enteringNewLink = false;

/* HELPER FUNCTIONS
 ******************************************************************************/

/**
 * Splits the pulled database table by its columns into individual
 * arrays. In doing this the n'th element of one array corresponds
 * to the n'th element of another array. They came from the same
 * row in the table.
 * This is the AJAX callback function.
 * @param {string[][]} database_table - A two-dimensional table of IDs, labels,
 * and links pulled from the database.
 * @returns {void}
 */
var splitTable = function(database_table) {
    $.each(database_table, function(key, value) {
        ids.push(value.id);
        labels.push(value.label);
        links.push(value.link);
    });
}

var initializeUI = function(label_array) {
    $("#tags").hide();
    $("#remove-select-label").parent().css("margin-bottom", "2em");

    /* MODAL STUFF
     **************************************************************************/
    // MODAL INITIALIZATION
    $(".ui.small.modal.select").modal({
        autofocus: false,
        duration: 175,
        onShow: function() {
            enteringNewLink = true;
            console.log("Setting enteringNewLink to true!");
        },
        onHide: function() {
            enteringNewLink = false;
            console.log("Setting enteringNewLink to false!");
        }
    });
    $(".ui.small.modal.add").modal({
        autofocus: false,
        duration: 75,
        onShow: function() {
            enteringNewLink = true;
            console.log("Setting enteringNewLink to true!");
        },
        onHide: function() {
            enteringNewLink = false;
            console.log("Setting enteringNewLink to false!");
        }
    });

    $(".ui.small.modal.remove").modal({
        autofocus: false,
        duration: 75,
        onShow: function() {
            enteringNewLink = true;
            console.log("Setting enteringNewLink to true!");
        },
        onHide: function() {
            enteringNewLink = false;
            console.log("Setting enteringNewLink to false!");
        }
    });

    // setTimeout(function() {
    //     $.each(labels, function(idx, val) {
    //         $("#remove-select-label").append(`<option data-id="${ids[idx]}" value="${val}">${val}</option>`);
    //     });
    // }, 1);

    // MODAL COMPONENT INITIALIZATION
    $("#remove-select-label").dropdown();

    // SETTINGS BUTTON MODAL
    $("#settings").click(function() {
        $(".ui.small.modal.select").modal("show");
    });

    // SETTINGS -> ADD BUTTON MODAL
    $("#add").click(function() {
        setTimeout(function() {
            $(".ui.small.modal.select").modal("hide");
        }, 0);
        $(".ui.small.modal.add input").val('');
        $(".ui.small.modal.add").modal("show");
    });

    // SETTINGS -> ADD -> SUBMIT BUTTON MODAL
    $("#submit-add").click(function() {
        $(".ui.small.modal.add").modal("hide");

        var la = $("#add-text-label").val();
        var li = $("#add-text-link").val();

        addEntry(la, li);
    });

    // SETTINGS -> REMOVE BUTTON MODAL
    $("#remove").click(function() {
        setTimeout(function() {
            $(".ui.small.modal.select").modal("hide");
        }, 0);

        $("#remove-select-label").html('');
        $(".ui.small.modal.remove a.ui.label.transition").remove();
        $.each(labels, function(idx, val) {
            $("#remove-select-label").append(`<option value="${ids[idx]}">${val}</option>`);
        });

        $(".ui.small.modal.remove").modal("show");
    });

    $("#submit-remove").click(function() {
        $(".ui.small.modal.remove").modal("hide");

        // grab all the id numbers to delete and put them in a string separated by commas
        var toDelete = '';
        $(".ui.small.modal.remove .item.active.filtered").each(function() {
            toDelete += $(this).attr("data-value") + ',';
        });

        // remove the last comma as it is uneeded
        toDelete = toDelete.slice(0, -1);
        deleteEntry(toDelete);
    });
}

/**
 * Updates the search display in the middle of the screen with the
 * top five results from the autocomplete.
 * @param {string[]} ac_results - An array of strings; each entry is a result
 * from the autocomplete search.
 * @returns {void}
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

/**
 * Clears the search display in the middle of the screen.
 * @returns {void}
 */
var clearSearchDisplay = function() {
    $("#search-display").empty();
}

/**
 * Retrieves the link corresponding to the given label.
 * @param {string} label - The label string to get the link for
 * @returns {string} The link for the given label
 */
var getLinkForLabel = function(label) {
    return links[labels.indexOf(label)];
}

/**
 * Redirects the user to either a label's corresponding link, the Google
 * homepage, or a Google search.
 * If the autocomplete search results are empty, but the user has entered text,
 * this function will redirect the user to a Google search for whatever text
 * they have entered.
 * If the autocomplete search results are empty and the user hasn't entered any
 * text, this function will redirect the user to the Google homepage.
 * @param {string[]} ac_results - The results from the autocomplete search.
 * @param {string} entered_text - All of the user's keystrokes since loading the
 * page.
 * @returns {void}
 */
var redirectUser = function(ac_results, entered_text) {
    if(ac_results.length == 0)
        if(entered_text.length == 0)
            window.location.href = "https://www.google.com";
        else if ((/\.com|org|net|edu|gov/gi).test(entered_text))
            window.location.href = "https://" + entered_text;
        else
            window.location.href = "https://www.google.com/search?q=" + entered_text.replace(/ /g, "+");
    else
        window.location.href = getLinkForLabel(ac_results[0]);
}

/**
 * Redirects the user to a given URL.
 * @param {string} URL - The URL to redirect the user to.
 * @returns {void}
 * @deprecated
 */
var redirectUserURL = function(URL) {
    window.location.href = URL;
}

/**
 * Easter Egg
 */
var there_is_no_help = function() {
    $("body").empty();
    $("body").css("background-image", "url(images/fuck_you.jpg)");
    $("body").css("background-repeat", "repeat");
    $("body").append("<video id='there_is_no_help' autoplay loop><source src='video/no_help.mp4' type='video/mp4'></video>");
}

/**
 * Easter Egg
 */
var jpeg = function() {
     $("body").empty();
     $("body").append("<video id='jpeg' autoplay loop><source src='video/jpeg.mp4' type='video/mp4'></video>");
}

/* [END] HELPER FUNCTIONS
 ******************************************************************************/
$(document).ready(function(){
    getList();
    initializeUI(labels);

    /*
     **************************************************************************/

    // ac_results is where results from the autocomplete search will be stored
    var ac_results = [];
    // initialize a new autocomplete instance using the labels pulled from the
    // database; no delay on the autocomplete search results; no minimum length
    // of search results are requried for display; on response add the search
    // items to ac_results; hide any results drawn to the page by jquery-ui
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

    // Handle keypresses in the window by filtering valid search keypresses,
    // adding them to a search query, and searching the list of labels with
    // the query.
    var entered_text = "";
    $(window).keydown(function(event) {
        // If the user is trying to enter a new link, don't use new keypresses
        // to construct the query.
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
        // Add the key to the query if no special case has been caught.
        else
            entered_text += event.key;

        // Easter egg
        if(sha256(sha256(entered_text.toLowerCase())) == "e393ba9541ce6b4fcbfa10fb4bac5271f42761bf928a0b3f9f19e9e43dfa09c6")
            there_is_no_help();

        // Easter egg
        console.log(sha256(sha256(entered_text.toLowerCase())));
        if(sha256(sha256(entered_text.toLowerCase())) == "3968808afd7211b02d78babdff0092e9b74c40686f79be3108767d7fdb60ccae")
            jpeg();

        // Determine what to do with the query. If the query is empty (the user
        // entered some data but then backspaced it out) clear any results from
        // the search display. If the query contains any characters, perform a
        // search.
        if(entered_text.length != 0) {
            $("#tags").autocomplete("search", entered_text);
            updateSearchDisplay(ac_results);
        }
        else
            clearSearchDisplay();
    });
});
