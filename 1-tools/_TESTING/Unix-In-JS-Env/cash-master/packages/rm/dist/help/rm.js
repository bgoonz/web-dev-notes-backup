"use strict";

module.exports =
  "\nUsage: rm [OPTION]... FILE...\nRemove (unlink) the FILE(s).\n\n  -f, --force           ignore nonexistent files and arguments, never prompt\n  -r, -R, --recursive   remove directories and their contents recursively\n      --help            display this help and exit\n\nBy default, rm does not remove directories.  Use the --recursive (-r or -R)\noption to remove each listed directory, too, along with all of its contents.\n\nTo remove a file whose name starts with a '-', for example '-foo',\nuse one of these commands:\n  rm -- -foo\n  rm ./-foo\n\nNote that if you use rm to remove a file, it might be possible to recover\nsome of its contents, given sufficient expertise and/or time.\n\nReport rm bugs to <https://github.com/dthree/cash>\nCash home page: <http://cash.js.org/>\n";
