"use strict";

module.exports =
  "\nUsage: source FILENAME [ARGUMENTS...]\n  or:  . FILENAME [ARGUMENTS...]\nRead and execute commands from the filename argument in the current shell.\n\nWhen a script is run using source, it runs within the existing shell and any\nchange of directory or modified variables or aliases will persist after the\nscript completes. Scripts may contain any commands that cash supports.\n\n      --help   display this help and exit\n\nReport source bugs to <https://github.com/dthree/cash>\nCash home page: <http://cash.js.org/>\n";
