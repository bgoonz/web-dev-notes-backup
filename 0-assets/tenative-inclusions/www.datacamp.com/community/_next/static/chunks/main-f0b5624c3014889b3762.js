_N_E = (window.webpackJsonp_N_E = window.webpackJsonp_N_E || []).push([
  [19],
  {
    "0D0S": function (e, t, n) {
      "use strict";
      var r;
      (t.__esModule = !0),
        (t.setConfig = function (e) {
          r = e;
        }),
        (t.default = void 0);
      t.default = function () {
        return r;
      };
    },
    "7t6h": function (e, t, n) {
      "use strict";
      n.r(t),
        n.d(t, "getCLS", function () {
          return m;
        }),
        n.d(t, "getFCP", function () {
          return h;
        }),
        n.d(t, "getFID", function () {
          return g;
        }),
        n.d(t, "getLCP", function () {
          return _;
        }),
        n.d(t, "getTTFB", function () {
          return E;
        });
      var r,
        a,
        o = function () {
          return ""
            .concat(Date.now(), "-")
            .concat(Math.floor(8999999999999 * Math.random()) + 1e12);
        },
        i = function (e) {
          var t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1;
          return {
            name: e,
            value: t,
            delta: 0,
            entries: [],
            id: o(),
            isFinal: !1,
          };
        },
        u = function (e, t) {
          try {
            if (PerformanceObserver.supportedEntryTypes.includes(e)) {
              var n = new PerformanceObserver(function (e) {
                return e.getEntries().map(t);
              });
              return n.observe({ type: e, buffered: !0 }), n;
            }
          } catch (e) {}
        },
        c = !1,
        s = !1,
        f = function (e) {
          c = !e.persisted;
        },
        l = function () {
          addEventListener("pagehide", f),
            addEventListener("unload", function () {});
        },
        p = function (e) {
          var t =
            arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
          s || (l(), (s = !0)),
            addEventListener(
              "visibilitychange",
              function (t) {
                var n = t.timeStamp;
                "hidden" === document.visibilityState &&
                  e({ timeStamp: n, isUnloading: c });
              },
              { capture: !0, once: t }
            );
        },
        d = function (e, t, n, r) {
          var a;
          return function () {
            n && t.isFinal && n.disconnect(),
              t.value >= 0 &&
                (r || t.isFinal || "hidden" === document.visibilityState) &&
                ((t.delta = t.value - (a || 0)),
                (t.delta || t.isFinal || void 0 === a) &&
                  (e(t), (a = t.value)));
          };
        },
        m = function (e) {
          var t =
              arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            n = i("CLS", 0),
            r = function (e) {
              e.hadRecentInput ||
                ((n.value += e.value), n.entries.push(e), o());
            },
            a = u("layout-shift", r),
            o = d(e, n, a, t);
          p(function (e) {
            var t = e.isUnloading;
            a && a.takeRecords().map(r), t && (n.isFinal = !0), o();
          });
        },
        v = function () {
          return (
            void 0 === r &&
              ((r = "hidden" === document.visibilityState ? 0 : 1 / 0),
              p(function (e) {
                var t = e.timeStamp;
                return (r = t);
              }, !0)),
            {
              get timeStamp() {
                return r;
              },
            }
          );
        },
        h = function (e) {
          var t = i("FCP"),
            n = v(),
            r = u("paint", function (e) {
              "first-contentful-paint" === e.name &&
                e.startTime < n.timeStamp &&
                ((t.value = e.startTime),
                (t.isFinal = !0),
                t.entries.push(e),
                a());
            }),
            a = d(e, t, r);
        },
        g = function (e) {
          var t = i("FID"),
            n = v(),
            r = function (e) {
              e.startTime < n.timeStamp &&
                ((t.value = e.processingStart - e.startTime),
                t.entries.push(e),
                (t.isFinal = !0),
                o());
            },
            a = u("first-input", r),
            o = d(e, t, a);
          p(function () {
            a && (a.takeRecords().map(r), a.disconnect());
          }, !0),
            a ||
              (window.perfMetrics &&
                window.perfMetrics.onFirstInputDelay &&
                window.perfMetrics.onFirstInputDelay(function (e, r) {
                  r.timeStamp < n.timeStamp &&
                    ((t.value = e),
                    (t.isFinal = !0),
                    (t.entries = [
                      {
                        entryType: "first-input",
                        name: r.type,
                        target: r.target,
                        cancelable: r.cancelable,
                        startTime: r.timeStamp,
                        processingStart: r.timeStamp + e,
                      },
                    ]),
                    o());
                }));
        },
        y = function () {
          return (
            a ||
              (a = new Promise(function (e) {
                return ["scroll", "keydown", "pointerdown"].map(function (t) {
                  addEventListener(t, e, {
                    once: !0,
                    passive: !0,
                    capture: !0,
                  });
                });
              })),
            a
          );
        },
        _ = function (e) {
          var t =
              arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            n = i("LCP"),
            r = v(),
            a = function (e) {
              var t = e.startTime;
              t < r.timeStamp
                ? ((n.value = t), n.entries.push(e))
                : (n.isFinal = !0),
                c();
            },
            o = u("largest-contentful-paint", a),
            c = d(e, n, o, t),
            s = function () {
              n.isFinal || (o && o.takeRecords().map(a), (n.isFinal = !0), c());
            };
          y().then(s), p(s, !0);
        },
        E = function (e) {
          var t,
            n = i("TTFB");
          (t = function () {
            try {
              var t =
                performance.getEntriesByType("navigation")[0] ||
                (function () {
                  var e = performance.timing,
                    t = { entryType: "navigation", startTime: 0 };
                  for (var n in e)
                    "navigationStart" !== n &&
                      "toJSON" !== n &&
                      (t[n] = Math.max(e[n] - e.navigationStart, 0));
                  return t;
                })();
              (n.value = n.delta = t.responseStart),
                (n.entries = [t]),
                (n.isFinal = !0),
                e(n);
            } catch (e) {}
          }),
            "complete" === document.readyState
              ? setTimeout(t, 0)
              : addEventListener("pageshow", t);
        };
    },
    "9YZO": function (e, t) {
      function n() {
        return (
          (e.exports = n =
            Object.assign ||
            function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                  Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
              }
              return e;
            }),
          n.apply(this, arguments)
        );
      }
      e.exports = n;
    },
    J6CG: function (e, t, n) {
      "use strict";
      (t.__esModule = !0),
        (t.default = function (e) {
          var t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
          return (
            ("/" === e
              ? "/index"
              : /^\/index(\/|$)/.test(e)
              ? "/index".concat(e)
              : "".concat(e)) + t
          );
        });
    },
    "Om4/": function (e, t, n) {
      "use strict";
      (t.__esModule = !0),
        (t.default = function (e) {
          return e.replace(/[/#?]/g, function (e) {
            return encodeURIComponent(e);
          });
        });
    },
    YtVx: function (e, t, n) {
      "use strict";
      var r = n("pONU")(n("ioxi"));
      (window.next = r), (0, r.default)().catch(console.error);
    },
    awAI: function (e, t, n) {
      "use strict";
      (t.__esModule = !0), (t.default = void 0);
      var r = n("7t6h");
      t.default = function (e) {
        (0, r.getCLS)(e),
          (0, r.getFID)(e),
          (0, r.getFCP)(e),
          (0, r.getLCP)(e),
          (0, r.getTTFB)(e);
      };
    },
    ioxi: function (e, t, n) {
      "use strict";
      var r = n("IebI"),
        a = n("4mCN"),
        o = n("zQIG"),
        i = n("8mBC"),
        u = n("I/kN"),
        c = n("cMav"),
        s = n("pSQP"),
        f = n("x3oR");
      function l(e) {
        var t = (function () {
          if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" === typeof Proxy) return !0;
          try {
            return (
              Date.prototype.toString.call(
                Reflect.construct(Date, [], function () {})
              ),
              !0
            );
          } catch (e) {
            return !1;
          }
        })();
        return function () {
          var n,
            r = s(e);
          if (t) {
            var a = s(this).constructor;
            n = Reflect.construct(r, arguments, a);
          } else n = r.apply(this, arguments);
          return c(this, n);
        };
      }
      var p = n("pONU"),
        d = n("Y3ZS");
      (t.__esModule = !0),
        (t.render = ee),
        (t.renderError = ne),
        (t.default = t.emitter = t.router = t.version = void 0);
      d(n("pONU"));
      var m = d(n("9YZO")),
        v = n("7xIC"),
        h = n("prCu"),
        g = d(n("ERkP")),
        y = d(n("7nmT")),
        _ = n("op+c"),
        E = d(n("YBsB")),
        w = n("wsRY"),
        S = n("Lko9"),
        R = p(n("0D0S")),
        T = n("fvxO"),
        x = n("L9lV"),
        C = d(n("jRQF")),
        P = d(n("vOaH")),
        b = d(n("awAI"));
      "finally" in Promise.prototype || (Promise.prototype.finally = n("m9ql"));
      var k = JSON.parse(document.getElementById("__NEXT_DATA__").textContent);
      window.__NEXT_DATA__ = k;
      t.version = "9.5.1";
      var N = k.props,
        I = k.err,
        M = k.page,
        F = k.query,
        D = k.buildId,
        A = k.assetPrefix,
        B = k.runtimeConfig,
        L = k.dynamicIds,
        O = k.isFallback,
        j = A || "";
      (n.p = "".concat(j, "/_next/")),
        R.setConfig({ serverRuntimeConfig: {}, publicRuntimeConfig: B || {} });
      var H = (0, T.getURL)();
      "/404" === M ||
        ("/_error" === M && N && "404" === N.pageProps.statusCode) ||
        (H = (0, x.delBasePath)(H));
      var U = new P.default(D, j, M),
        q = function (e) {
          var t = f(e, 2),
            n = t[0],
            r = t[1];
          return U.registerPage(n, r);
        };
      window.__NEXT_P &&
        window.__NEXT_P.map(function (e) {
          return setTimeout(function () {
            return q(e);
          }, 0);
        }),
        (window.__NEXT_P = []),
        (window.__NEXT_P.push = q);
      var G,
        Y,
        X,
        Q,
        V,
        J,
        W = (0, C.default)(),
        Z = document.getElementById("__next");
      t.router = X;
      var z = (function (e) {
          u(n, e);
          var t = l(n);
          function n() {
            return o(this, n), t.apply(this, arguments);
          }
          return (
            i(n, [
              {
                key: "componentDidCatch",
                value: function (e, t) {
                  this.props.fn(e, t);
                },
              },
              {
                key: "componentDidMount",
                value: function () {
                  this.scrollToHash(),
                    X.isSsr &&
                      (O ||
                        (k.nextExport &&
                          ((0, S.isDynamicRoute)(X.pathname) ||
                            location.search)) ||
                        (N && N.__N_SSG && location.search)) &&
                      X.replace(
                        X.pathname +
                          "?" +
                          (0, h.stringify)(
                            (0, m.default)(
                              (0, m.default)({}, X.query),
                              (0, h.parse)(location.search.substr(1))
                            )
                          ),
                        H,
                        { _h: 1, shallow: !O }
                      );
                },
              },
              {
                key: "componentDidUpdate",
                value: function () {
                  this.scrollToHash();
                },
              },
              {
                key: "scrollToHash",
                value: function () {
                  var e = location.hash;
                  if ((e = e && e.substring(1))) {
                    var t = document.getElementById(e);
                    t &&
                      setTimeout(function () {
                        return t.scrollIntoView();
                      }, 0);
                  }
                },
              },
              {
                key: "render",
                value: function () {
                  return this.props.children;
                },
              },
            ]),
            n
          );
        })(g.default.Component),
        $ = (0, E.default)();
      t.emitter = $;
      var K = (function () {
        var e = a(
          r.mark(function e() {
            var n,
              a,
              o,
              i,
              u,
              c,
              s = arguments;
            return r.wrap(
              function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (n = s.length > 0 && void 0 !== s[0] ? s[0] : {}),
                        n.webpackHMR,
                        (e.next = 4),
                        U.loadPage("/_app")
                      );
                    case 4:
                      return (
                        (a = e.sent),
                        (o = a.page),
                        (i = a.mod),
                        (V = o),
                        i &&
                          i.reportWebVitals &&
                          (J = function (e) {
                            var t,
                              n = e.id,
                              r = e.name,
                              a = e.startTime,
                              o = e.value,
                              u = e.duration,
                              c = e.entryType,
                              s = e.entries,
                              f = ""
                                .concat(Date.now(), "-")
                                .concat(
                                  Math.floor(Math.random() * (9e12 - 1)) + 1e12
                                );
                            s && s.length && (t = s[0].startTime),
                              i.reportWebVitals({
                                id: n || f,
                                name: r,
                                startTime: a || t,
                                value: null == o ? u : o,
                                label:
                                  "mark" === c || "measure" === c
                                    ? "custom"
                                    : "web-vital",
                              });
                          }),
                        (u = I),
                        (e.prev = 10),
                        (e.next = 14),
                        U.loadPage(M)
                      );
                    case 14:
                      (c = e.sent), (Q = c.page), (e.next = 20);
                      break;
                    case 20:
                      e.next = 25;
                      break;
                    case 22:
                      (e.prev = 22), (e.t0 = e.catch(10)), (u = e.t0);
                    case 25:
                      if (!window.__NEXT_PRELOADREADY) {
                        e.next = 29;
                        break;
                      }
                      return (e.next = 29), window.__NEXT_PRELOADREADY(L);
                    case 29:
                      return (
                        (t.router = X =
                          (0, v.createRouter)(M, F, H, {
                            initialProps: N,
                            pageLoader: U,
                            App: V,
                            Component: Q,
                            wrapApp: ce,
                            err: u,
                            isFallback: O,
                            subscription: function (e, t) {
                              return ee({
                                App: t,
                                Component: e.Component,
                                props: e.props,
                                err: e.err,
                              });
                            },
                          })),
                        ee({ App: V, Component: Q, props: N, err: u }),
                        e.abrupt("return", $)
                      );
                    case 35:
                      e.next = 37;
                      break;
                    case 37:
                    case "end":
                      return e.stop();
                  }
              },
              e,
              null,
              [[10, 22]]
            );
          })
        );
        return function () {
          return e.apply(this, arguments);
        };
      })();
      function ee(e) {
        return te.apply(this, arguments);
      }
      function te() {
        return (te = a(
          r.mark(function e(t) {
            return r.wrap(
              function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      if (!t.err) {
                        e.next = 4;
                        break;
                      }
                      return (e.next = 3), ne(t);
                    case 3:
                      return e.abrupt("return");
                    case 4:
                      return (e.prev = 4), (e.next = 7), se(t);
                    case 7:
                      e.next = 14;
                      break;
                    case 9:
                      return (
                        (e.prev = 9),
                        (e.t0 = e.catch(4)),
                        (e.next = 14),
                        ne(
                          (0, m.default)(
                            (0, m.default)({}, t),
                            {},
                            { err: e.t0 }
                          )
                        )
                      );
                    case 14:
                    case "end":
                      return e.stop();
                  }
              },
              e,
              null,
              [[4, 9]]
            );
          })
        )).apply(this, arguments);
      }
      function ne(e) {
        var t = e.App,
          n = e.err;
        return (
          console.error(n),
          U.loadPage("/_error").then(function (r) {
            var a = r.page,
              o = ce(t),
              i = {
                Component: a,
                AppTree: o,
                router: X,
                ctx: { err: n, pathname: M, query: F, asPath: H, AppTree: o },
              };
            return Promise.resolve(
              e.props ? e.props : (0, T.loadGetInitialProps)(t, i)
            ).then(function (t) {
              return se(
                (0, m.default)(
                  (0, m.default)({}, e),
                  {},
                  { err: n, Component: a, props: t }
                )
              );
            });
          })
        );
      }
      t.default = K;
      var re = "function" === typeof y.default.hydrate;
      function ae() {
        T.ST &&
          (performance.mark("afterHydrate"),
          performance.measure(
            "Next.js-before-hydration",
            "navigationStart",
            "beforeRender"
          ),
          performance.measure(
            "Next.js-hydration",
            "beforeRender",
            "afterHydrate"
          ),
          J && performance.getEntriesByName("Next.js-hydration").forEach(J),
          ie());
      }
      function oe() {
        if (T.ST) {
          performance.mark("afterRender");
          var e = performance.getEntriesByName("routeChange", "mark");
          e.length &&
            (performance.measure(
              "Next.js-route-change-to-render",
              e[0].name,
              "beforeRender"
            ),
            performance.measure(
              "Next.js-render",
              "beforeRender",
              "afterRender"
            ),
            J &&
              (performance.getEntriesByName("Next.js-render").forEach(J),
              performance
                .getEntriesByName("Next.js-route-change-to-render")
                .forEach(J)),
            ie(),
            ["Next.js-route-change-to-render", "Next.js-render"].forEach(
              function (e) {
                return performance.clearMeasures(e);
              }
            ));
        }
      }
      function ie() {
        ["beforeRender", "afterHydrate", "afterRender", "routeChange"].forEach(
          function (e) {
            return performance.clearMarks(e);
          }
        );
      }
      function ue(e) {
        var t = e.children;
        return g.default.createElement(
          z,
          {
            fn: function (e) {
              return ne({ App: V, err: e }).catch(function (e) {
                return console.error("Error rendering page: ", e);
              });
            },
          },
          g.default.createElement(
            w.RouterContext.Provider,
            { value: (0, v.makePublicRouterInstance)(X) },
            g.default.createElement(
              _.HeadManagerContext.Provider,
              { value: W },
              t
            )
          )
        );
      }
      var ce = function (e) {
        return function (t) {
          var n = (0, m.default)(
            (0, m.default)({}, t),
            {},
            { Component: Q, err: I, router: X }
          );
          return g.default.createElement(
            ue,
            null,
            g.default.createElement(e, n)
          );
        };
      };
      function se(e) {
        return fe.apply(this, arguments);
      }
      function fe() {
        return (fe = a(
          r.mark(function e(t) {
            var n, a, o, i, u, c, s;
            return r.wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      (n = t.App),
                      (a = t.Component),
                      (o = t.props),
                      (i = t.err),
                      (a = a || G.Component),
                      (o = o || G.props),
                      (u = (0, m.default)(
                        (0, m.default)({}, o),
                        {},
                        { Component: a, err: i, router: X }
                      )),
                      (G = u),
                      (s = new Promise(function (e, t) {
                        Y && Y(),
                          (c = function () {
                            (Y = null), e();
                          }),
                          (Y = function () {
                            (Y = null), t();
                          });
                      })),
                      (r = g.default.createElement(
                        le,
                        { callback: c },
                        g.default.createElement(
                          ue,
                          null,
                          g.default.createElement(n, u)
                        )
                      )),
                      (f = Z),
                      T.ST && performance.mark("beforeRender"),
                      re
                        ? (y.default.hydrate(r, f, ae),
                          (re = !1),
                          J && T.ST && (0, b.default)(J))
                        : y.default.render(r, f, oe),
                      (e.next = 10),
                      s
                    );
                  case 10:
                  case "end":
                    return e.stop();
                }
              var r, f;
            }, e);
          })
        )).apply(this, arguments);
      }
      function le(e) {
        var t = e.callback,
          n = e.children;
        return (
          g.default.useLayoutEffect(
            function () {
              return t();
            },
            [t]
          ),
          n
        );
      }
    },
    jRQF: function (e, t, n) {
      "use strict";
      (t.__esModule = !0),
        (t.default = function () {
          var e = null;
          return {
            mountedInstances: new Set(),
            updateHead: function (t) {
              var n = (e = Promise.resolve().then(function () {
                if (n === e) {
                  e = null;
                  var r = {};
                  t.forEach(function (e) {
                    var t = r[e.type] || [];
                    t.push(e), (r[e.type] = t);
                  });
                  var o = r.title ? r.title[0] : null,
                    i = "";
                  if (o) {
                    var u = o.props.children;
                    i = "string" === typeof u ? u : u.join("");
                  }
                  i !== document.title && (document.title = i),
                    ["meta", "base", "link", "style", "script"].forEach(
                      function (e) {
                        !(function (e, t) {
                          var n = document.getElementsByTagName("head")[0],
                            r = n.querySelector("meta[name=next-head-count]");
                          0;
                          for (
                            var o = Number(r.content),
                              i = [],
                              u = 0,
                              c = r.previousElementSibling;
                            u < o;
                            u++, c = c.previousElementSibling
                          )
                            c.tagName.toLowerCase() === e && i.push(c);
                          var s = t.map(a).filter(function (e) {
                            for (var t = 0, n = i.length; t < n; t++) {
                              if (i[t].isEqualNode(e))
                                return i.splice(t, 1), !1;
                            }
                            return !0;
                          });
                          i.forEach(function (e) {
                            return e.parentNode.removeChild(e);
                          }),
                            s.forEach(function (e) {
                              return n.insertBefore(e, r);
                            }),
                            (r.content = (o - i.length + s.length).toString());
                        })(e, r[e] || []);
                      }
                    );
                }
              }));
            },
          };
        });
      var r = {
        acceptCharset: "accept-charset",
        className: "class",
        htmlFor: "for",
        httpEquiv: "http-equiv",
      };
      function a(e) {
        var t = e.type,
          n = e.props,
          a = document.createElement(t);
        for (var o in n)
          if (
            n.hasOwnProperty(o) &&
            "children" !== o &&
            "dangerouslySetInnerHTML" !== o &&
            void 0 !== n[o]
          ) {
            var i = r[o] || o.toLowerCase();
            a.setAttribute(i, n[o]);
          }
        var u = n.children,
          c = n.dangerouslySetInnerHTML;
        return (
          c
            ? (a.innerHTML = c.__html || "")
            : u && (a.textContent = "string" === typeof u ? u : u.join("")),
          a
        );
      }
    },
    m9ql: function (e, t) {
      Promise.prototype.finally = function (e) {
        if ("function" != typeof e) return this.then(e, e);
        var t = this.constructor || Promise;
        return this.then(
          function (n) {
            return t.resolve(e()).then(function () {
              return n;
            });
          },
          function (n) {
            return t.resolve(e()).then(function () {
              throw n;
            });
          }
        );
      };
    },
    "op+c": function (e, t, n) {
      "use strict";
      var r;
      (t.__esModule = !0), (t.HeadManagerContext = void 0);
      var a = (
        (r = n("ERkP")) && r.__esModule ? r : { default: r }
      ).default.createContext({});
      t.HeadManagerContext = a;
    },
    vOaH: function (e, t, n) {
      "use strict";
      var r = n("zQIG"),
        a = n("8mBC"),
        o = n("Y3ZS");
      (t.__esModule = !0), (t.default = void 0);
      var i = o(n("YBsB")),
        u = n("Lko9"),
        c = n("TBBy"),
        s = n("uChv"),
        f = n("yATa"),
        l = n("3G4Q"),
        p = o(n("Om4/")),
        d = o(n("J6CG")),
        m = n("L9lV");
      function v(e, t) {
        try {
          return document.createElement("link").relList.supports(e);
        } catch (n) {}
      }
      function h(e) {
        var t = new Error("Error loading ".concat(e));
        return (t.code = "PAGE_LOAD_ERROR"), t;
      }
      var g = v("preload") && !v("prefetch") ? "preload" : "prefetch",
        y =
          (document.createElement("script"),
          window.requestIdleCallback ||
            function (e) {
              return setTimeout(e, 1);
            });
      function _(e) {
        if ("/" !== e[0])
          throw new Error(
            'Route name should start with a "/", got "'.concat(e, '"')
          );
        return "/" === e ? e : e.replace(/\/$/, "");
      }
      function E(e, t, n) {
        return new Promise(function (r, a, o) {
          ((o = document.createElement("link")).crossOrigin = void 0),
            (o.href = e),
            (o.rel = t),
            n && (o.as = n),
            (o.onload = r),
            (o.onerror = a),
            document.head.appendChild(o);
        });
      }
      var w = (function () {
        function e(t, n, a) {
          r(this, e),
            (this.buildId = t),
            (this.assetPrefix = n),
            (this.pageCache = {}),
            (this.pageRegisterEvents = (0, i.default)()),
            (this.loadingRoutes = { "/_app": !0 }),
            "/_error" !== a && (this.loadingRoutes[a] = !0),
            (this.promisedBuildManifest = new Promise(function (e) {
              window.__BUILD_MANIFEST
                ? e(window.__BUILD_MANIFEST)
                : (window.__BUILD_MANIFEST_CB = function () {
                    e(window.__BUILD_MANIFEST);
                  });
            })),
            (this.promisedSsgManifest = new Promise(function (e) {
              window.__SSG_MANIFEST
                ? e(window.__SSG_MANIFEST)
                : (window.__SSG_MANIFEST_CB = function () {
                    e(window.__SSG_MANIFEST);
                  });
            }));
        }
        return (
          a(e, [
            {
              key: "getDependencies",
              value: function (e) {
                var t = this;
                return this.promisedBuildManifest.then(function (n) {
                  var r;
                  return n[e]
                    ? n[e].map(function (e) {
                        return ""
                          .concat(t.assetPrefix, "/_next/")
                          .concat(encodeURI(e));
                      })
                    : null !=
                      (r = t.pageRegisterEvents.emit(e, { error: h(e) }))
                    ? r
                    : [];
                });
              },
            },
            {
              key: "getDataHref",
              value: function (e, t, n) {
                var r,
                  a = this,
                  o = (0, l.parseRelativeUrl)(e),
                  i = o.pathname,
                  v = o.searchParams,
                  h = o.search,
                  g = (0, f.searchParamsToUrlQuery)(v),
                  y = (0, l.parseRelativeUrl)(t).pathname,
                  E = _(i),
                  w = function (e) {
                    var t = (0, d.default)(e, ".json");
                    return (0, m.addBasePath)(
                      "/_next/data/"
                        .concat(a.buildId)
                        .concat(t)
                        .concat(n ? "" : h)
                    );
                  },
                  S = (0, u.isDynamicRoute)(E);
                if (S) {
                  var R = (0, s.getRouteRegex)(E),
                    T = R.groups,
                    x = (0, c.getRouteMatcher)(R)(y) || g;
                  (r = E),
                    Object.keys(T).every(function (e) {
                      var t = x[e] || "",
                        n = T[e],
                        a = n.repeat,
                        o = n.optional,
                        i = "[".concat(a ? "..." : "").concat(e, "]");
                      return (
                        o && (i = "".concat(t ? "" : "/", "[").concat(i, "]")),
                        a && !Array.isArray(t) && (t = [t]),
                        (o || e in x) &&
                          (r =
                            r.replace(
                              i,
                              a ? t.map(p.default).join("/") : (0, p.default)(t)
                            ) || "/")
                      );
                    }) || (r = "");
                }
                return S ? r && w(r) : w(E);
              },
            },
            {
              key: "prefetchData",
              value: function (e, t) {
                var n = this,
                  r = _((0, l.parseRelativeUrl)(e).pathname);
                return this.promisedSsgManifest.then(function (a, o) {
                  y(function () {
                    a.has(r) &&
                      (o = n.getDataHref(e, t, !0)) &&
                      !document.querySelector(
                        'link[rel="'.concat(g, '"][href^="').concat(o, '"]')
                      ) &&
                      E(o, g, "fetch");
                  });
                });
              },
            },
            {
              key: "loadPage",
              value: function (e) {
                var t = this;
                return (
                  (e = _(e)),
                  new Promise(function (n, r) {
                    var a = t.pageCache[e];
                    if (a) {
                      var o = a.error,
                        i = a.page,
                        u = a.mod;
                      o ? r(o) : n({ page: i, mod: u });
                    } else {
                      if (
                        (t.pageRegisterEvents.on(e, function a(o) {
                          var i = o.error,
                            u = o.page,
                            c = o.mod;
                          t.pageRegisterEvents.off(e, a),
                            delete t.loadingRoutes[e],
                            i ? r(i) : n({ page: u, mod: c });
                        }),
                        !t.loadingRoutes[e])
                      )
                        (t.loadingRoutes[e] = !0),
                          t.getDependencies(e).then(function (n) {
                            n.forEach(function (n) {
                              n.endsWith(".js") &&
                                !document.querySelector(
                                  'script[src^="'.concat(n, '"]')
                                ) &&
                                t.loadScript(n, e),
                                n.endsWith(".css") &&
                                  !document.querySelector(
                                    'link[rel=stylesheet][href^="'.concat(
                                      n,
                                      '"]'
                                    )
                                  ) &&
                                  E(n, "stylesheet").catch(function () {});
                            });
                          });
                    }
                  })
                );
              },
            },
            {
              key: "loadScript",
              value: function (e, t) {
                var n = this,
                  r = document.createElement("script");
                (r.crossOrigin = void 0),
                  (r.src = e),
                  (r.onerror = function () {
                    n.pageRegisterEvents.emit(t, { error: h(e) });
                  }),
                  document.body.appendChild(r);
              },
            },
            {
              key: "registerPage",
              value: function (e, t) {
                var n = this;
                !(function () {
                  try {
                    var r = t(),
                      a = { page: r.default || r, mod: r };
                    (n.pageCache[e] = a), n.pageRegisterEvents.emit(e, a);
                  } catch (o) {
                    (n.pageCache[e] = { error: o }),
                      n.pageRegisterEvents.emit(e, { error: o });
                  }
                })();
              },
            },
            {
              key: "prefetch",
              value: function (e, t) {
                var n,
                  r,
                  a = this;
                if (
                  (n = navigator.connection) &&
                  (n.saveData || /2g/.test(n.effectiveType))
                )
                  return Promise.resolve();
                if (t) r = e;
                else;
                return Promise.all(
                  document.querySelector(
                    'link[rel="'.concat(g, '"][href^="').concat(r, '"]')
                  )
                    ? []
                    : [
                        r && E(r, g, r.endsWith(".css") ? "style" : "script"),
                        !t &&
                          this.getDependencies(e).then(function (e) {
                            return Promise.all(
                              e.map(function (e) {
                                return a.prefetch(e, !0);
                              })
                            );
                          }),
                      ]
                ).then(
                  function () {},
                  function () {}
                );
              },
            },
          ]),
          e
        );
      })();
      t.default = w;
    },
  },
  [["YtVx", 0, 2, 1]],
]);
