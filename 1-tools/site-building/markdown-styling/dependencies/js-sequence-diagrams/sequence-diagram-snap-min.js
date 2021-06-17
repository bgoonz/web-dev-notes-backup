/** js sequence diagrams 2.0.1
 *  https://bramp.github.io/js-sequence-diagrams/
 *  (c) 2012-2017 Andrew Brampton (bramp.net)
 *  @license Simplified BSD license.
 */
!(function () {
  "use strict";
  function Diagram() {
    (this.title = void 0), (this.actors = []), (this.signals = []);
  }
  function ParseError(message, hash) {
    _.extend(this, hash),
      (this.name = "ParseError"),
      (this.message = message || "");
  }
  function AssertException(message) {
    this.message = message;
  }
  function assert(exp, message) {
    if (!exp) throw new AssertException(message);
  }
  function registerTheme(name, theme) {
    Diagram.themes[name] = theme;
  }
  function getCenterX(box) {
    return box.x + box.width / 2;
  }
  function getCenterY(box) {
    return box.y + box.height / 2;
  }
  function clamp(x, min, max) {
    return x < min ? min : x > max ? max : x;
  }
  function wobble(x1, y1, x2, y2) {
    assert(_.all([x1, x2, y1, y2], _.isFinite), "x1,x2,y1,y2 must be numeric");
    var factor = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)) / 25,
      r1 = clamp(Math.random(), 0.2, 0.8),
      r2 = clamp(Math.random(), 0.2, 0.8),
      xfactor = Math.random() > 0.5 ? factor : -factor,
      yfactor = Math.random() > 0.5 ? factor : -factor,
      p1 = {
        x: (x2 - x1) * r1 + x1 + xfactor,
        y: (y2 - y1) * r1 + y1 + yfactor,
      },
      p2 = {
        x: (x2 - x1) * r2 + x1 - xfactor,
        y: (y2 - y1) * r2 + y1 - yfactor,
      };
    return (
      "C" +
      p1.x.toFixed(1) +
      "," +
      p1.y.toFixed(1) +
      " " +
      p2.x.toFixed(1) +
      "," +
      p2.y.toFixed(1) +
      " " +
      x2.toFixed(1) +
      "," +
      y2.toFixed(1)
    );
  }
  function handRect(x, y, w, h) {
    return (
      assert(_.all([x, y, w, h], _.isFinite), "x, y, w, h must be numeric"),
      "M" +
        x +
        "," +
        y +
        wobble(x, y, x + w, y) +
        wobble(x + w, y, x + w, y + h) +
        wobble(x + w, y + h, x, y + h) +
        wobble(x, y + h, x, y)
    );
  }
  function handLine(x1, y1, x2, y2) {
    return (
      assert(
        _.all([x1, x2, y1, y2], _.isFinite),
        "x1,x2,y1,y2 must be numeric"
      ),
      "M" + x1.toFixed(1) + "," + y1.toFixed(1) + wobble(x1, y1, x2, y2)
    );
  }
  (Diagram.prototype.getActor = function (alias, name) {
    alias = alias.trim();
    var i,
      actors = this.actors;
    for (i in actors) if (actors[i].alias == alias) return actors[i];
    return (
      (i = actors.push(new Diagram.Actor(alias, name || alias, actors.length))),
      actors[i - 1]
    );
  }),
    (Diagram.prototype.getActorWithAlias = function (input) {
      input = input.trim();
      var alias,
        name,
        s = /([\s\S]+) as (\S+)$/im.exec(input);
      return (
        s
          ? ((name = s[1].trim()), (alias = s[2].trim()))
          : (name = alias = input),
        this.getActor(alias, name)
      );
    }),
    (Diagram.prototype.setTitle = function (title) {
      this.title = title;
    }),
    (Diagram.prototype.addSignal = function (signal) {
      this.signals.push(signal);
    }),
    (Diagram.Actor = function (alias, name, index) {
      (this.alias = alias), (this.name = name), (this.index = index);
    }),
    (Diagram.Signal = function (actorA, signaltype, actorB, message) {
      (this.type = "Signal"),
        (this.actorA = actorA),
        (this.actorB = actorB),
        (this.linetype = 3 & signaltype),
        (this.arrowtype = (signaltype >> 2) & 3),
        (this.message = message);
    }),
    (Diagram.Signal.prototype.isSelf = function () {
      return this.actorA.index == this.actorB.index;
    }),
    (Diagram.Note = function (actor, placement, message) {
      if (
        ((this.type = "Note"),
        (this.actor = actor),
        (this.placement = placement),
        (this.message = message),
        this.hasManyActors() && actor[0] == actor[1])
      )
        throw new Error("Note should be over two different actors");
    }),
    (Diagram.Note.prototype.hasManyActors = function () {
      return _.isArray(this.actor);
    }),
    (Diagram.unescape = function (s) {
      return s
        .trim()
        .replace(/^"(.*)"$/m, "$1")
        .replace(/\\n/gm, "\n");
    }),
    (Diagram.LINETYPE = { SOLID: 0, DOTTED: 1 }),
    (Diagram.ARROWTYPE = { FILLED: 0, OPEN: 1 }),
    (Diagram.PLACEMENT = { LEFTOF: 0, RIGHTOF: 1, OVER: 2 }),
    "function" != typeof Object.getPrototypeOf &&
      ("object" == typeof "test".__proto__
        ? (Object.getPrototypeOf = function (object) {
            return object.__proto__;
          })
        : (Object.getPrototypeOf = function (object) {
            return object.constructor.prototype;
          }));
  var parser = (function () {
    function Parser() {
      this.yy = {};
    }
    var o = function (k, v, o, l) {
        for (o = o || {}, l = k.length; l--; o[k[l]] = v);
        return o;
      },
      $V0 = [5, 8, 9, 13, 15, 24],
      $V1 = [1, 13],
      $V2 = [1, 17],
      $V3 = [24, 29, 30],
      parser = {
        trace: function () {},
        yy: {},
        symbols_: {
          error: 2,
          start: 3,
          document: 4,
          EOF: 5,
          line: 6,
          statement: 7,
          NL: 8,
          participant: 9,
          actor_alias: 10,
          signal: 11,
          note_statement: 12,
          title: 13,
          message: 14,
          note: 15,
          placement: 16,
          actor: 17,
          over: 18,
          actor_pair: 19,
          ",": 20,
          left_of: 21,
          right_of: 22,
          signaltype: 23,
          ACTOR: 24,
          linetype: 25,
          arrowtype: 26,
          LINE: 27,
          DOTLINE: 28,
          ARROW: 29,
          OPENARROW: 30,
          MESSAGE: 31,
          $accept: 0,
          $end: 1,
        },
        terminals_: {
          2: "error",
          5: "EOF",
          8: "NL",
          9: "participant",
          13: "title",
          15: "note",
          18: "over",
          20: ",",
          21: "left_of",
          22: "right_of",
          24: "ACTOR",
          27: "LINE",
          28: "DOTLINE",
          29: "ARROW",
          30: "OPENARROW",
          31: "MESSAGE",
        },
        productions_: [
          0,
          [3, 2],
          [4, 0],
          [4, 2],
          [6, 1],
          [6, 1],
          [7, 2],
          [7, 1],
          [7, 1],
          [7, 2],
          [12, 4],
          [12, 4],
          [19, 1],
          [19, 3],
          [16, 1],
          [16, 1],
          [11, 4],
          [17, 1],
          [10, 1],
          [23, 2],
          [23, 1],
          [25, 1],
          [25, 1],
          [26, 1],
          [26, 1],
          [14, 1],
        ],
        performAction: function (
          yytext,
          yyleng,
          yylineno,
          yy,
          yystate,
          $$,
          _$
        ) {
          var $0 = $$.length - 1;
          switch (yystate) {
            case 1:
              return yy.parser.yy;
            case 4:
              break;
            case 6:
              $$[$0];
              break;
            case 7:
            case 8:
              yy.parser.yy.addSignal($$[$0]);
              break;
            case 9:
              yy.parser.yy.setTitle($$[$0]);
              break;
            case 10:
              this.$ = new Diagram.Note($$[$0 - 1], $$[$0 - 2], $$[$0]);
              break;
            case 11:
              this.$ = new Diagram.Note(
                $$[$0 - 1],
                Diagram.PLACEMENT.OVER,
                $$[$0]
              );
              break;
            case 12:
            case 20:
              this.$ = $$[$0];
              break;
            case 13:
              this.$ = [$$[$0 - 2], $$[$0]];
              break;
            case 14:
              this.$ = Diagram.PLACEMENT.LEFTOF;
              break;
            case 15:
              this.$ = Diagram.PLACEMENT.RIGHTOF;
              break;
            case 16:
              this.$ = new Diagram.Signal(
                $$[$0 - 3],
                $$[$0 - 2],
                $$[$0 - 1],
                $$[$0]
              );
              break;
            case 17:
              this.$ = yy.parser.yy.getActor(Diagram.unescape($$[$0]));
              break;
            case 18:
              this.$ = yy.parser.yy.getActorWithAlias(Diagram.unescape($$[$0]));
              break;
            case 19:
              this.$ = $$[$0 - 1] | ($$[$0] << 2);
              break;
            case 21:
              this.$ = Diagram.LINETYPE.SOLID;
              break;
            case 22:
              this.$ = Diagram.LINETYPE.DOTTED;
              break;
            case 23:
              this.$ = Diagram.ARROWTYPE.FILLED;
              break;
            case 24:
              this.$ = Diagram.ARROWTYPE.OPEN;
              break;
            case 25:
              this.$ = Diagram.unescape($$[$0].substring(1));
          }
        },
        table: [
          o($V0, [2, 2], { 3: 1, 4: 2 }),
          { 1: [3] },
          {
            5: [1, 3],
            6: 4,
            7: 5,
            8: [1, 6],
            9: [1, 7],
            11: 8,
            12: 9,
            13: [1, 10],
            15: [1, 12],
            17: 11,
            24: $V1,
          },
          { 1: [2, 1] },
          o($V0, [2, 3]),
          o($V0, [2, 4]),
          o($V0, [2, 5]),
          { 10: 14, 24: [1, 15] },
          o($V0, [2, 7]),
          o($V0, [2, 8]),
          { 14: 16, 31: $V2 },
          { 23: 18, 25: 19, 27: [1, 20], 28: [1, 21] },
          { 16: 22, 18: [1, 23], 21: [1, 24], 22: [1, 25] },
          o([20, 27, 28, 31], [2, 17]),
          o($V0, [2, 6]),
          o($V0, [2, 18]),
          o($V0, [2, 9]),
          o($V0, [2, 25]),
          { 17: 26, 24: $V1 },
          { 24: [2, 20], 26: 27, 29: [1, 28], 30: [1, 29] },
          o($V3, [2, 21]),
          o($V3, [2, 22]),
          { 17: 30, 24: $V1 },
          { 17: 32, 19: 31, 24: $V1 },
          { 24: [2, 14] },
          { 24: [2, 15] },
          { 14: 33, 31: $V2 },
          { 24: [2, 19] },
          { 24: [2, 23] },
          { 24: [2, 24] },
          { 14: 34, 31: $V2 },
          { 14: 35, 31: $V2 },
          { 20: [1, 36], 31: [2, 12] },
          o($V0, [2, 16]),
          o($V0, [2, 10]),
          o($V0, [2, 11]),
          { 17: 37, 24: $V1 },
          { 31: [2, 13] },
        ],
        defaultActions: {
          3: [2, 1],
          24: [2, 14],
          25: [2, 15],
          27: [2, 19],
          28: [2, 23],
          29: [2, 24],
          37: [2, 13],
        },
        parseError: function (str, hash) {
          if (!hash.recoverable) throw new Error(str);
          this.trace(str);
        },
        parse: function (input) {
          function lex() {
            var token;
            return (
              (token = lexer.lex() || EOF),
              "number" != typeof token &&
                (token = self.symbols_[token] || token),
              token
            );
          }
          var self = this,
            stack = [0],
            vstack = [null],
            lstack = [],
            table = this.table,
            yytext = "",
            yylineno = 0,
            yyleng = 0,
            recovering = 0,
            TERROR = 2,
            EOF = 1,
            args = lstack.slice.call(arguments, 1),
            lexer = Object.create(this.lexer),
            sharedState = { yy: {} };
          for (var k in this.yy)
            Object.prototype.hasOwnProperty.call(this.yy, k) &&
              (sharedState.yy[k] = this.yy[k]);
          lexer.setInput(input, sharedState.yy),
            (sharedState.yy.lexer = lexer),
            (sharedState.yy.parser = this),
            "undefined" == typeof lexer.yylloc && (lexer.yylloc = {});
          var yyloc = lexer.yylloc;
          lstack.push(yyloc);
          var ranges = lexer.options && lexer.options.ranges;
          "function" == typeof sharedState.yy.parseError
            ? (this.parseError = sharedState.yy.parseError)
            : (this.parseError = Object.getPrototypeOf(this).parseError);
          for (
            var symbol,
              preErrorSymbol,
              state,
              action,
              r,
              p,
              len,
              newState,
              expected,
              yyval = {};
            ;

          ) {
            if (
              ((state = stack[stack.length - 1]),
              this.defaultActions[state]
                ? (action = this.defaultActions[state])
                : ((null !== symbol && "undefined" != typeof symbol) ||
                    (symbol = lex()),
                  (action = table[state] && table[state][symbol])),
              "undefined" == typeof action || !action.length || !action[0])
            ) {
              var errStr = "";
              expected = [];
              for (p in table[state])
                this.terminals_[p] &&
                  p > TERROR &&
                  expected.push("'" + this.terminals_[p] + "'");
              (errStr = lexer.showPosition
                ? "Parse error on line " +
                  (yylineno + 1) +
                  ":\n" +
                  lexer.showPosition() +
                  "\nExpecting " +
                  expected.join(", ") +
                  ", got '" +
                  (this.terminals_[symbol] || symbol) +
                  "'"
                : "Parse error on line " +
                  (yylineno + 1) +
                  ": Unexpected " +
                  (symbol == EOF
                    ? "end of input"
                    : "'" + (this.terminals_[symbol] || symbol) + "'")),
                this.parseError(errStr, {
                  text: lexer.match,
                  token: this.terminals_[symbol] || symbol,
                  line: lexer.yylineno,
                  loc: yyloc,
                  expected: expected,
                });
            }
            if (action[0] instanceof Array && action.length > 1)
              throw new Error(
                "Parse Error: multiple actions possible at state: " +
                  state +
                  ", token: " +
                  symbol
              );
            switch (action[0]) {
              case 1:
                stack.push(symbol),
                  vstack.push(lexer.yytext),
                  lstack.push(lexer.yylloc),
                  stack.push(action[1]),
                  (symbol = null),
                  preErrorSymbol
                    ? ((symbol = preErrorSymbol), (preErrorSymbol = null))
                    : ((yyleng = lexer.yyleng),
                      (yytext = lexer.yytext),
                      (yylineno = lexer.yylineno),
                      (yyloc = lexer.yylloc),
                      recovering > 0 && recovering--);
                break;
              case 2:
                if (
                  ((len = this.productions_[action[1]][1]),
                  (yyval.$ = vstack[vstack.length - len]),
                  (yyval._$ = {
                    first_line: lstack[lstack.length - (len || 1)].first_line,
                    last_line: lstack[lstack.length - 1].last_line,
                    first_column:
                      lstack[lstack.length - (len || 1)].first_column,
                    last_column: lstack[lstack.length - 1].last_column,
                  }),
                  ranges &&
                    (yyval._$.range = [
                      lstack[lstack.length - (len || 1)].range[0],
                      lstack[lstack.length - 1].range[1],
                    ]),
                  (r = this.performAction.apply(
                    yyval,
                    [
                      yytext,
                      yyleng,
                      yylineno,
                      sharedState.yy,
                      action[1],
                      vstack,
                      lstack,
                    ].concat(args)
                  )),
                  "undefined" != typeof r)
                )
                  return r;
                len &&
                  ((stack = stack.slice(0, -1 * len * 2)),
                  (vstack = vstack.slice(0, -1 * len)),
                  (lstack = lstack.slice(0, -1 * len))),
                  stack.push(this.productions_[action[1]][0]),
                  vstack.push(yyval.$),
                  lstack.push(yyval._$),
                  (newState =
                    table[stack[stack.length - 2]][stack[stack.length - 1]]),
                  stack.push(newState);
                break;
              case 3:
                return !0;
            }
          }
          return !0;
        },
      },
      lexer = (function () {
        var lexer = {
          EOF: 1,
          parseError: function (str, hash) {
            if (!this.yy.parser) throw new Error(str);
            this.yy.parser.parseError(str, hash);
          },
          setInput: function (input, yy) {
            return (
              (this.yy = yy || this.yy || {}),
              (this._input = input),
              (this._more = this._backtrack = this.done = !1),
              (this.yylineno = this.yyleng = 0),
              (this.yytext = this.matched = this.match = ""),
              (this.conditionStack = ["INITIAL"]),
              (this.yylloc = {
                first_line: 1,
                first_column: 0,
                last_line: 1,
                last_column: 0,
              }),
              this.options.ranges && (this.yylloc.range = [0, 0]),
              (this.offset = 0),
              this
            );
          },
          input: function () {
            var ch = this._input[0];
            (this.yytext += ch),
              this.yyleng++,
              this.offset++,
              (this.match += ch),
              (this.matched += ch);
            var lines = ch.match(/(?:\r\n?|\n).*/g);
            return (
              lines
                ? (this.yylineno++, this.yylloc.last_line++)
                : this.yylloc.last_column++,
              this.options.ranges && this.yylloc.range[1]++,
              (this._input = this._input.slice(1)),
              ch
            );
          },
          unput: function (ch) {
            var len = ch.length,
              lines = ch.split(/(?:\r\n?|\n)/g);
            (this._input = ch + this._input),
              (this.yytext = this.yytext.substr(0, this.yytext.length - len)),
              (this.offset -= len);
            var oldLines = this.match.split(/(?:\r\n?|\n)/g);
            (this.match = this.match.substr(0, this.match.length - 1)),
              (this.matched = this.matched.substr(0, this.matched.length - 1)),
              lines.length - 1 && (this.yylineno -= lines.length - 1);
            var r = this.yylloc.range;
            return (
              (this.yylloc = {
                first_line: this.yylloc.first_line,
                last_line: this.yylineno + 1,
                first_column: this.yylloc.first_column,
                last_column: lines
                  ? (lines.length === oldLines.length
                      ? this.yylloc.first_column
                      : 0) +
                    oldLines[oldLines.length - lines.length].length -
                    lines[0].length
                  : this.yylloc.first_column - len,
              }),
              this.options.ranges &&
                (this.yylloc.range = [r[0], r[0] + this.yyleng - len]),
              (this.yyleng = this.yytext.length),
              this
            );
          },
          more: function () {
            return (this._more = !0), this;
          },
          reject: function () {
            return this.options.backtrack_lexer
              ? ((this._backtrack = !0), this)
              : this.parseError(
                  "Lexical error on line " +
                    (this.yylineno + 1) +
                    ". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n" +
                    this.showPosition(),
                  { text: "", token: null, line: this.yylineno }
                );
          },
          less: function (n) {
            this.unput(this.match.slice(n));
          },
          pastInput: function () {
            var past = this.matched.substr(
              0,
              this.matched.length - this.match.length
            );
            return (
              (past.length > 20 ? "..." : "") +
              past.substr(-20).replace(/\n/g, "")
            );
          },
          upcomingInput: function () {
            var next = this.match;
            return (
              next.length < 20 &&
                (next += this._input.substr(0, 20 - next.length)),
              (next.substr(0, 20) + (next.length > 20 ? "..." : "")).replace(
                /\n/g,
                ""
              )
            );
          },
          showPosition: function () {
            var pre = this.pastInput(),
              c = new Array(pre.length + 1).join("-");
            return pre + this.upcomingInput() + "\n" + c + "^";
          },
          test_match: function (match, indexed_rule) {
            var token, lines, backup;
            if (
              (this.options.backtrack_lexer &&
                ((backup = {
                  yylineno: this.yylineno,
                  yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column,
                  },
                  yytext: this.yytext,
                  match: this.match,
                  matches: this.matches,
                  matched: this.matched,
                  yyleng: this.yyleng,
                  offset: this.offset,
                  _more: this._more,
                  _input: this._input,
                  yy: this.yy,
                  conditionStack: this.conditionStack.slice(0),
                  done: this.done,
                }),
                this.options.ranges &&
                  (backup.yylloc.range = this.yylloc.range.slice(0))),
              (lines = match[0].match(/(?:\r\n?|\n).*/g)),
              lines && (this.yylineno += lines.length),
              (this.yylloc = {
                first_line: this.yylloc.last_line,
                last_line: this.yylineno + 1,
                first_column: this.yylloc.last_column,
                last_column: lines
                  ? lines[lines.length - 1].length -
                    lines[lines.length - 1].match(/\r?\n?/)[0].length
                  : this.yylloc.last_column + match[0].length,
              }),
              (this.yytext += match[0]),
              (this.match += match[0]),
              (this.matches = match),
              (this.yyleng = this.yytext.length),
              this.options.ranges &&
                (this.yylloc.range = [
                  this.offset,
                  (this.offset += this.yyleng),
                ]),
              (this._more = !1),
              (this._backtrack = !1),
              (this._input = this._input.slice(match[0].length)),
              (this.matched += match[0]),
              (token = this.performAction.call(
                this,
                this.yy,
                this,
                indexed_rule,
                this.conditionStack[this.conditionStack.length - 1]
              )),
              this.done && this._input && (this.done = !1),
              token)
            )
              return token;
            if (this._backtrack) {
              for (var k in backup) this[k] = backup[k];
              return !1;
            }
            return !1;
          },
          next: function () {
            if (this.done) return this.EOF;
            this._input || (this.done = !0);
            var token, match, tempMatch, index;
            this._more || ((this.yytext = ""), (this.match = ""));
            for (var rules = this._currentRules(), i = 0; i < rules.length; i++)
              if (
                ((tempMatch = this._input.match(this.rules[rules[i]])),
                tempMatch && (!match || tempMatch[0].length > match[0].length))
              ) {
                if (
                  ((match = tempMatch),
                  (index = i),
                  this.options.backtrack_lexer)
                ) {
                  if (
                    ((token = this.test_match(tempMatch, rules[i])),
                    token !== !1)
                  )
                    return token;
                  if (this._backtrack) {
                    match = !1;
                    continue;
                  }
                  return !1;
                }
                if (!this.options.flex) break;
              }
            return match
              ? ((token = this.test_match(match, rules[index])),
                token !== !1 && token)
              : "" === this._input
              ? this.EOF
              : this.parseError(
                  "Lexical error on line " +
                    (this.yylineno + 1) +
                    ". Unrecognized text.\n" +
                    this.showPosition(),
                  { text: "", token: null, line: this.yylineno }
                );
          },
          lex: function () {
            var r = this.next();
            return r ? r : this.lex();
          },
          begin: function (condition) {
            this.conditionStack.push(condition);
          },
          popState: function () {
            var n = this.conditionStack.length - 1;
            return n > 0 ? this.conditionStack.pop() : this.conditionStack[0];
          },
          _currentRules: function () {
            return this.conditionStack.length &&
              this.conditionStack[this.conditionStack.length - 1]
              ? this.conditions[
                  this.conditionStack[this.conditionStack.length - 1]
                ].rules
              : this.conditions.INITIAL.rules;
          },
          topState: function (n) {
            return (
              (n = this.conditionStack.length - 1 - Math.abs(n || 0)),
              n >= 0 ? this.conditionStack[n] : "INITIAL"
            );
          },
          pushState: function (condition) {
            this.begin(condition);
          },
          stateStackSize: function () {
            return this.conditionStack.length;
          },
          options: { "case-insensitive": !0 },
          performAction: function (
            yy,
            yy_,
            $avoiding_name_collisions,
            YY_START
          ) {
            switch ($avoiding_name_collisions) {
              case 0:
                return 8;
              case 1:
                break;
              case 2:
                break;
              case 3:
                return 9;
              case 4:
                return 21;
              case 5:
                return 22;
              case 6:
                return 18;
              case 7:
                return 15;
              case 8:
                return 13;
              case 9:
                return 20;
              case 10:
                return 24;
              case 11:
                return 24;
              case 12:
                return 28;
              case 13:
                return 27;
              case 14:
                return 30;
              case 15:
                return 29;
              case 16:
                return 31;
              case 17:
                return 5;
              case 18:
                return "INVALID";
            }
          },
          rules: [
            /^(?:[\r\n]+)/i,
            /^(?:\s+)/i,
            /^(?:#[^\r\n]*)/i,
            /^(?:participant\b)/i,
            /^(?:left of\b)/i,
            /^(?:right of\b)/i,
            /^(?:over\b)/i,
            /^(?:note\b)/i,
            /^(?:title\b)/i,
            /^(?:,)/i,
            /^(?:[^\->:,\r\n"]+)/i,
            /^(?:"[^"]+")/i,
            /^(?:--)/i,
            /^(?:-)/i,
            /^(?:>>)/i,
            /^(?:>)/i,
            /^(?:[^\r\n]+)/i,
            /^(?:$)/i,
            /^(?:.)/i,
          ],
          conditions: {
            INITIAL: {
              rules: [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                18,
              ],
              inclusive: !0,
            },
          },
        };
        return lexer;
      })();
    return (
      (parser.lexer = lexer),
      (Parser.prototype = parser),
      (parser.Parser = Parser),
      new Parser()
    );
  })();
  "undefined" != typeof require &&
    "undefined" != typeof exports &&
    ((exports.parser = parser),
    (exports.Parser = parser.Parser),
    (exports.parse = function () {
      return parser.parse.apply(parser, arguments);
    }),
    (exports.main = function (args) {
      args[1] || (console.log("Usage: " + args[0] + " FILE"), process.exit(1));
      var source = require("fs").readFileSync(
        require("path").normalize(args[1]),
        "utf8"
      );
      return exports.parser.parse(source);
    }),
    "undefined" != typeof module &&
      require.main === module &&
      exports.main(process.argv.slice(1))),
    (ParseError.prototype = new Error()),
    (Diagram.ParseError = ParseError),
    (Diagram.parse = function (input) {
      (parser.yy = new Diagram()),
        (parser.yy.parseError = function (message, hash) {
          throw new ParseError(message, hash);
        });
      var diagram = parser.parse(input);
      return delete diagram.parseError, diagram;
    });
  var DIAGRAM_MARGIN = 10,
    ACTOR_MARGIN = 10,
    ACTOR_PADDING = 10,
    SIGNAL_MARGIN = 5,
    SIGNAL_PADDING = 5,
    NOTE_MARGIN = 10,
    NOTE_PADDING = 5,
    NOTE_OVERLAP = 15,
    TITLE_MARGIN = 0,
    TITLE_PADDING = 5,
    SELF_SIGNAL_WIDTH = 20,
    PLACEMENT = Diagram.PLACEMENT,
    LINETYPE = Diagram.LINETYPE,
    ARROWTYPE = Diagram.ARROWTYPE,
    ALIGN_LEFT = 0,
    ALIGN_CENTER = 1;
  (AssertException.prototype.toString = function () {
    return "AssertException: " + this.message;
  }),
    String.prototype.trim ||
      (String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, "");
      }),
    (Diagram.themes = {});
  var BaseTheme = function (diagram, options) {
    this.init(diagram, options);
  };
  if (
    (_.extend(BaseTheme.prototype, {
      init: function (diagram, options) {
        (this.diagram = diagram),
          (this.actorsHeight_ = 0),
          (this.signalsHeight_ = 0),
          (this.title_ = void 0);
      },
      setupPaper: function (container) {},
      draw: function (container) {
        this.setupPaper(container), this.layout();
        var titleHeight = this.title_ ? this.title_.height : 0,
          y = DIAGRAM_MARGIN + titleHeight;
        this.drawTitle(),
          this.drawActors(y),
          this.drawSignals(y + this.actorsHeight_);
      },
      layout: function () {
        function actorEnsureDistance(a, b, d) {
          assert(a < b, "a must be less than or equal to b"),
            a < 0
              ? ((b = actors[b]), (b.x = Math.max(d - b.width / 2, b.x)))
              : b >= actors.length
              ? ((a = actors[a]),
                (a.paddingRight = Math.max(d, a.paddingRight)))
              : ((a = actors[a]),
                (a.distances[b] = Math.max(
                  d,
                  a.distances[b] ? a.distances[b] : 0
                )));
        }
        var diagram = this.diagram,
          font = this.font_,
          actors = diagram.actors,
          signals = diagram.signals;
        if (((diagram.width = 0), (diagram.height = 0), diagram.title)) {
          var title = (this.title_ = {}),
            bb = this.textBBox(diagram.title, font);
          (title.textBB = bb),
            (title.message = diagram.title),
            (title.width = bb.width + 2 * (TITLE_PADDING + TITLE_MARGIN)),
            (title.height = bb.height + 2 * (TITLE_PADDING + TITLE_MARGIN)),
            (title.x = DIAGRAM_MARGIN),
            (title.y = DIAGRAM_MARGIN),
            (diagram.width += title.width),
            (diagram.height += title.height);
        }
        _.each(
          actors,
          function (a) {
            var bb = this.textBBox(a.name, font);
            (a.textBB = bb),
              (a.x = 0),
              (a.y = 0),
              (a.width = bb.width + 2 * (ACTOR_PADDING + ACTOR_MARGIN)),
              (a.height = bb.height + 2 * (ACTOR_PADDING + ACTOR_MARGIN)),
              (a.distances = []),
              (a.paddingRight = 0),
              (this.actorsHeight_ = Math.max(a.height, this.actorsHeight_));
          },
          this
        ),
          _.each(
            signals,
            function (s) {
              var a,
                b,
                bb = this.textBBox(s.message, font);
              (s.textBB = bb), (s.width = bb.width), (s.height = bb.height);
              var extraWidth = 0;
              if ("Signal" == s.type)
                (s.width += 2 * (SIGNAL_MARGIN + SIGNAL_PADDING)),
                  (s.height += 2 * (SIGNAL_MARGIN + SIGNAL_PADDING)),
                  s.isSelf()
                    ? ((a = s.actorA.index),
                      (b = a + 1),
                      (s.width += SELF_SIGNAL_WIDTH))
                    : ((a = Math.min(s.actorA.index, s.actorB.index)),
                      (b = Math.max(s.actorA.index, s.actorB.index)));
              else {
                if ("Note" != s.type)
                  throw new Error("Unhandled signal type:" + s.type);
                if (
                  ((s.width += 2 * (NOTE_MARGIN + NOTE_PADDING)),
                  (s.height += 2 * (NOTE_MARGIN + NOTE_PADDING)),
                  (extraWidth = 2 * ACTOR_MARGIN),
                  s.placement == PLACEMENT.LEFTOF)
                )
                  (b = s.actor.index), (a = b - 1);
                else if (s.placement == PLACEMENT.RIGHTOF)
                  (a = s.actor.index), (b = a + 1);
                else if (s.placement == PLACEMENT.OVER && s.hasManyActors())
                  (a = Math.min(s.actor[0].index, s.actor[1].index)),
                    (b = Math.max(s.actor[0].index, s.actor[1].index)),
                    (extraWidth = -(2 * NOTE_PADDING + 2 * NOTE_OVERLAP));
                else if (s.placement == PLACEMENT.OVER)
                  return (
                    (a = s.actor.index),
                    actorEnsureDistance(a - 1, a, s.width / 2),
                    actorEnsureDistance(a, a + 1, s.width / 2),
                    void (this.signalsHeight_ += s.height)
                  );
              }
              actorEnsureDistance(a, b, s.width + extraWidth),
                (this.signalsHeight_ += s.height);
            },
            this
          );
        var actorsX = 0;
        return (
          _.each(
            actors,
            function (a) {
              (a.x = Math.max(actorsX, a.x)),
                _.each(a.distances, function (distance, b) {
                  "undefined" != typeof distance &&
                    ((b = actors[b]),
                    (distance = Math.max(distance, a.width / 2, b.width / 2)),
                    (b.x = Math.max(
                      b.x,
                      a.x + a.width / 2 + distance - b.width / 2
                    )));
                }),
                (actorsX = a.x + a.width + a.paddingRight);
            },
            this
          ),
          (diagram.width = Math.max(actorsX, diagram.width)),
          (diagram.width += 2 * DIAGRAM_MARGIN),
          (diagram.height +=
            2 * DIAGRAM_MARGIN + 2 * this.actorsHeight_ + this.signalsHeight_),
          this
        );
      },
      textBBox: function (text, font) {},
      drawTitle: function () {
        var title = this.title_;
        title &&
          this.drawTextBox(
            title,
            title.message,
            TITLE_MARGIN,
            TITLE_PADDING,
            this.font_,
            ALIGN_LEFT
          );
      },
      drawActors: function (offsetY) {
        var y = offsetY;
        _.each(
          this.diagram.actors,
          function (a) {
            this.drawActor(a, y, this.actorsHeight_),
              this.drawActor(
                a,
                y + this.actorsHeight_ + this.signalsHeight_,
                this.actorsHeight_
              );
            var aX = getCenterX(a);
            this.drawLine(
              aX,
              y + this.actorsHeight_ - ACTOR_MARGIN,
              aX,
              y + this.actorsHeight_ + ACTOR_MARGIN + this.signalsHeight_
            );
          },
          this
        );
      },
      drawActor: function (actor, offsetY, height) {
        (actor.y = offsetY),
          (actor.height = height),
          this.drawTextBox(
            actor,
            actor.name,
            ACTOR_MARGIN,
            ACTOR_PADDING,
            this.font_,
            ALIGN_CENTER
          );
      },
      drawSignals: function (offsetY) {
        var y = offsetY;
        _.each(
          this.diagram.signals,
          function (s) {
            "Signal" == s.type
              ? s.isSelf()
                ? this.drawSelfSignal(s, y)
                : this.drawSignal(s, y)
              : "Note" == s.type && this.drawNote(s, y),
              (y += s.height);
          },
          this
        );
      },
      drawSelfSignal: function (signal, offsetY) {
        assert(signal.isSelf(), "signal must be a self signal");
        var textBB = signal.textBB,
          aX = getCenterX(signal.actorA),
          x = aX + SELF_SIGNAL_WIDTH + SIGNAL_PADDING,
          y = offsetY + SIGNAL_PADDING + signal.height / 2 + textBB.y;
        this.drawText(x, y, signal.message, this.font_, ALIGN_LEFT);
        var y1 = offsetY + SIGNAL_MARGIN + SIGNAL_PADDING,
          y2 = y1 + signal.height - 2 * SIGNAL_MARGIN - SIGNAL_PADDING;
        this.drawLine(aX, y1, aX + SELF_SIGNAL_WIDTH, y1, signal.linetype),
          this.drawLine(
            aX + SELF_SIGNAL_WIDTH,
            y1,
            aX + SELF_SIGNAL_WIDTH,
            y2,
            signal.linetype
          ),
          this.drawLine(
            aX + SELF_SIGNAL_WIDTH,
            y2,
            aX,
            y2,
            signal.linetype,
            signal.arrowtype
          );
      },
      drawSignal: function (signal, offsetY) {
        var aX = getCenterX(signal.actorA),
          bX = getCenterX(signal.actorB),
          x = (bX - aX) / 2 + aX,
          y = offsetY + SIGNAL_MARGIN + 2 * SIGNAL_PADDING;
        this.drawText(x, y, signal.message, this.font_, ALIGN_CENTER),
          (y = offsetY + signal.height - SIGNAL_MARGIN - SIGNAL_PADDING),
          this.drawLine(aX, y, bX, y, signal.linetype, signal.arrowtype);
      },
      drawNote: function (note, offsetY) {
        note.y = offsetY;
        var actorA = note.hasManyActors() ? note.actor[0] : note.actor,
          aX = getCenterX(actorA);
        switch (note.placement) {
          case PLACEMENT.RIGHTOF:
            note.x = aX + ACTOR_MARGIN;
            break;
          case PLACEMENT.LEFTOF:
            note.x = aX - ACTOR_MARGIN - note.width;
            break;
          case PLACEMENT.OVER:
            if (note.hasManyActors()) {
              var bX = getCenterX(note.actor[1]),
                overlap = NOTE_OVERLAP + NOTE_PADDING;
              (note.x = Math.min(aX, bX) - overlap),
                (note.width = Math.max(aX, bX) + overlap - note.x);
            } else note.x = aX - note.width / 2;
            break;
          default:
            throw new Error("Unhandled note placement: " + note.placement);
        }
        return this.drawTextBox(
          note,
          note.message,
          NOTE_MARGIN,
          NOTE_PADDING,
          this.font_,
          ALIGN_LEFT
        );
      },
      drawTextBox: function (box, text, margin, padding, font, align) {
        var x = box.x + margin,
          y = box.y + margin,
          w = box.width - 2 * margin,
          h = box.height - 2 * margin;
        return (
          this.drawRect(x, y, w, h),
          align == ALIGN_CENTER
            ? ((x = getCenterX(box)), (y = getCenterY(box)))
            : ((x += padding), (y += padding)),
          this.drawText(x, y, text, font, align)
        );
      },
    }),
    "undefined" != typeof Snap)
  ) {
    var xmlns = "http://www.w3.org/2000/svg",
      LINE = { stroke: "#000000", "stroke-width": 2, fill: "none" },
      RECT = { stroke: "#000000", "stroke-width": 2, fill: "#fff" },
      LOADED_FONTS = {},
      SnapTheme = function (diagram, options, resume) {
        _.defaults(options, {
          "css-class": "simple",
          "font-size": 16,
          "font-family": "Andale Mono, monospace",
        }),
          this.init(diagram, options, resume);
      };
    _.extend(SnapTheme.prototype, BaseTheme.prototype, {
      init: function (diagram, options, resume) {
        BaseTheme.prototype.init.call(this, diagram),
          (this.paper_ = void 0),
          (this.cssClass_ = options["css-class"] || void 0),
          (this.font_ = {
            "font-size": options["font-size"],
            "font-family": options["font-family"],
          });
        var a = (this.arrowTypes_ = {});
        (a[ARROWTYPE.FILLED] = "Block"), (a[ARROWTYPE.OPEN] = "Open");
        var l = (this.lineTypes_ = {});
        (l[LINETYPE.SOLID] = ""), (l[LINETYPE.DOTTED] = "6,2");
        var that = this;
        this.waitForFont(function () {
          resume(that);
        });
      },
      waitForFont: function (callback) {
        var fontFamily = this.font_["font-family"];
        if ("undefined" == typeof WebFont)
          throw new Error(
            "WebFont is required (https://github.com/typekit/webfontloader)."
          );
        return LOADED_FONTS[fontFamily]
          ? void callback()
          : void WebFont.load({
              custom: { families: [fontFamily] },
              classes: !1,
              active: function () {
                (LOADED_FONTS[fontFamily] = !0), callback();
              },
              inactive: function () {
                (LOADED_FONTS[fontFamily] = !0), callback();
              },
            });
      },
      addDescription: function (svg, description) {
        var desc = document.createElementNS(xmlns, "desc");
        desc.appendChild(document.createTextNode(description)),
          svg.appendChild(desc);
      },
      setupPaper: function (container) {
        var svg = document.createElementNS(xmlns, "svg");
        container.appendChild(svg),
          this.addDescription(svg, this.diagram.title || ""),
          (this.paper_ = Snap(svg)),
          this.paper_.addClass("sequence"),
          this.cssClass_ && this.paper_.addClass(this.cssClass_),
          this.beginGroup();
        var a = (this.arrowMarkers_ = {}),
          arrow = this.paper_.path("M 0 0 L 5 2.5 L 0 5 z");
        (a[ARROWTYPE.FILLED] = arrow
          .marker(0, 0, 5, 5, 5, 2.5)
          .attr({ id: "markerArrowBlock" })),
          (arrow = this.paper_.path(
            "M 9.6,8 1.92,16 0,13.7 5.76,8 0,2.286 1.92,0 9.6,8 z"
          )),
          (a[ARROWTYPE.OPEN] = arrow
            .marker(0, 0, 9.6, 16, 9.6, 8)
            .attr({ markerWidth: "4", id: "markerArrowOpen" }));
      },
      layout: function () {
        BaseTheme.prototype.layout.call(this),
          this.paper_.attr({
            width: this.diagram.width + "px",
            height: this.diagram.height + "px",
          });
      },
      textBBox: function (text, font) {
        var t = this.createText(text, font),
          bb = t.getBBox();
        return t.remove(), bb;
      },
      pushToStack: function (element) {
        return this._stack.push(element), element;
      },
      beginGroup: function () {
        this._stack = [];
      },
      finishGroup: function () {
        var g = this.paper_.group.apply(this.paper_, this._stack);
        return this.beginGroup(), g;
      },
      createText: function (text, font) {
        text = _.invoke(text.split("\n"), "trim");
        var t = this.paper_.text(0, 0, text);
        return (
          t.attr(font || {}),
          text.length > 1 &&
            t.selectAll("tspan:nth-child(n+2)").attr({ dy: "1.2em", x: 0 }),
          t
        );
      },
      drawLine: function (x1, y1, x2, y2, linetype, arrowhead) {
        var line = this.paper_.line(x1, y1, x2, y2).attr(LINE);
        return (
          void 0 !== linetype &&
            line.attr("strokeDasharray", this.lineTypes_[linetype]),
          void 0 !== arrowhead &&
            line.attr("markerEnd", this.arrowMarkers_[arrowhead]),
          this.pushToStack(line)
        );
      },
      drawRect: function (x, y, w, h) {
        var rect = this.paper_.rect(x, y, w, h).attr(RECT);
        return this.pushToStack(rect);
      },
      drawText: function (x, y, text, font, align) {
        var t = this.createText(text, font),
          bb = t.getBBox();
        return (
          align == ALIGN_CENTER && ((x -= bb.width / 2), (y -= bb.height / 2)),
          t.attr({ x: x - bb.x, y: y - bb.y }),
          t.selectAll("tspan").attr({ x: x }),
          this.pushToStack(t),
          t
        );
      },
      drawTitle: function () {
        return (
          this.beginGroup(),
          BaseTheme.prototype.drawTitle.call(this),
          this.finishGroup().addClass("title")
        );
      },
      drawActor: function (actor, offsetY, height) {
        return (
          this.beginGroup(),
          BaseTheme.prototype.drawActor.call(this, actor, offsetY, height),
          this.finishGroup().addClass("actor")
        );
      },
      drawSignal: function (signal, offsetY) {
        return (
          this.beginGroup(),
          BaseTheme.prototype.drawSignal.call(this, signal, offsetY),
          this.finishGroup().addClass("signal")
        );
      },
      drawSelfSignal: function (signal, offsetY) {
        return (
          this.beginGroup(),
          BaseTheme.prototype.drawSelfSignal.call(this, signal, offsetY),
          this.finishGroup().addClass("signal")
        );
      },
      drawNote: function (note, offsetY) {
        return (
          this.beginGroup(),
          BaseTheme.prototype.drawNote.call(this, note, offsetY),
          this.finishGroup().addClass("note")
        );
      },
    });
    var SnapHandTheme = function (diagram, options, resume) {
      _.defaults(options, {
        "css-class": "hand",
        "font-size": 16,
        "font-family": "danielbd",
      }),
        this.init(diagram, options, resume);
    };
    _.extend(SnapHandTheme.prototype, SnapTheme.prototype, {
      drawLine: function (x1, y1, x2, y2, linetype, arrowhead) {
        var line = this.paper_.path(handLine(x1, y1, x2, y2)).attr(LINE);
        return (
          void 0 !== linetype &&
            line.attr("strokeDasharray", this.lineTypes_[linetype]),
          void 0 !== arrowhead &&
            line.attr("markerEnd", this.arrowMarkers_[arrowhead]),
          this.pushToStack(line)
        );
      },
      drawRect: function (x, y, w, h) {
        var rect = this.paper_.path(handRect(x, y, w, h)).attr(RECT);
        return this.pushToStack(rect);
      },
    }),
      registerTheme("snapSimple", SnapTheme),
      registerTheme("snapHand", SnapHandTheme);
  }
  if ("undefined" == typeof Raphael && "undefined" == typeof Snap)
    throw new Error("Raphael or Snap.svg is required to be included.");
  if (_.isEmpty(Diagram.themes))
    throw new Error(
      "No themes were registered. Please call registerTheme(...)."
    );
  (Diagram.themes.hand = Diagram.themes.snapHand || Diagram.themes.raphaelHand),
    (Diagram.themes.simple =
      Diagram.themes.snapSimple || Diagram.themes.raphaelSimple),
    (Diagram.prototype.drawSVG = function (container, options) {
      var defaultOptions = { theme: "hand" };
      if (
        ((options = _.defaults(options || {}, defaultOptions)),
        !(options.theme in Diagram.themes))
      )
        throw new Error("Unsupported theme: " + options.theme);
      var div = _.isString(container)
        ? document.getElementById(container)
        : container;
      if (null === div || !div.tagName)
        throw new Error("Invalid container: " + container);
      var Theme = Diagram.themes[options.theme];
      new Theme(this, options, function (drawing) {
        drawing.draw(div);
      });
    }),
    "undefined" != typeof jQuery &&
      !(function ($) {
        $.fn.sequenceDiagram = function (options) {
          return this.each(function () {
            var $this = $(this),
              diagram = Diagram.parse($this.text());
            $this.html(""), diagram.drawSVG(this, options);
          });
        };
      })(jQuery);
  var root =
    ("object" == typeof self && self.self == self && self) ||
    ("object" == typeof global && global.global == global && global);
  "undefined" != typeof exports
    ? ("undefined" != typeof module &&
        module.exports &&
        (exports = module.exports = Diagram),
      (exports.Diagram = Diagram))
    : (root.Diagram = Diagram);
})();
//# sourceMappingURL=sequence-diagram-snap.js
