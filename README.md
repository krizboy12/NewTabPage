# My New Tab Page

**Version 1 is in a separate branch**

A new tab page written in AngularJS for the front end. RESTful services for this NewTabPage (for saving profiles) will come after the front end is complete. My goal is to write the backend in Go, PHP with Slim, and Express.js. I use grunt to run local servers, tests, and deploy the page on to host systems.

This version of the new tab page will feature locally stored preferences instead of fetching them from a database on every page load. The user will be able to export their preferences to a file and eventually to a server.

TODO:
- Get karma configured to run unit tests
- comments, jsdoc style
- event listeners array should really be a hash table
  - related: use something other than Date.now() for unique subcription tokens
- ":" puts you in command mode, typing normally just does a google search (or it will use your default search engine).
  - ":h|hot" will stand for hotkey mode, this will be where the groupings come into play. You can set a default mode (hotkey, command, saved link mass search)
  - ":e|exit" will close the tab
  - backspace will have universal functionality. Removing the colon will put you back into your default mode.
