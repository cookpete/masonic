!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(exports, require("react"))
    : "function" == typeof define && define.amd
    ? define(["exports", "react"], t)
    : t(
        ((e =
          "undefined" != typeof globalThis ? globalThis : e || self).Masonic =
          {}),
        e.React
      );
})(this, function (e, t) {
  "use strict";
  function n(e) {
    return e && "object" == typeof e && "default" in e ? e : { default: e };
  }
  function r(e) {
    if (e && e.__esModule) return e;
    var t = Object.create(null);
    return (
      e &&
        Object.keys(e).forEach(function (n) {
          if ("default" !== n) {
            var r = Object.getOwnPropertyDescriptor(e, n);
            Object.defineProperty(
              t,
              n,
              r.get
                ? r
                : {
                    enumerable: 1,
                    get: function () {
                      return e[n];
                    },
                  }
            );
          }
        }),
      (t.default = e),
      Object.freeze(t)
    );
  }
  function i(e) {
    var t = e.high;
    e.L === M && e.R === M
      ? (e.max = t)
      : e.L === M
      ? (e.max = Math.max(e.R.max, t))
      : e.R === M
      ? (e.max = Math.max(e.L.max, t))
      : (e.max = Math.max(Math.max(e.L.max, e.R.max), t));
  }
  function o(e) {
    for (var t = e; t.P !== M; ) i(t.P), (t = t.P);
  }
  function u(e, t) {
    if (t.R !== M) {
      var n = t.R;
      (t.R = n.L),
        n.L !== M && (n.L.P = t),
        (n.P = t.P),
        t.P === M ? (e.root = n) : t === t.P.L ? (t.P.L = n) : (t.P.R = n),
        (n.L = t),
        (t.P = n),
        i(t),
        i(n);
    }
  }
  function f(e, t) {
    if (t.L !== M) {
      var n = t.L;
      (t.L = n.R),
        n.R !== M && (n.R.P = t),
        (n.P = t.P),
        t.P === M ? (e.root = n) : t === t.P.R ? (t.P.R = n) : (t.P.L = n),
        (n.R = t),
        (t.P = n),
        i(t),
        i(n);
    }
  }
  function c(e, t, n) {
    t.P === M ? (e.root = n) : t === t.P.L ? (t.P.L = n) : (t.P.R = n),
      (n.P = t.P);
  }
  function a() {
    var e = { root: M, size: 0 },
      t = {};
    return {
      insert: function (n, r, c) {
        for (var a = e.root, s = M; a !== M && n !== (s = a).low; )
          a = n < a.low ? a.L : a.R;
        if (n === s.low && s !== M) {
          if (
            !(function (e, t, n) {
              for (var r, i = e.list; i; ) {
                if (i.index === n) return 0;
                if (t > i.high) break;
                (r = i), (i = i.next);
              }
              return (
                r || (e.list = { index: n, high: t, next: i }),
                r && (r.next = { index: n, high: t, next: r.next }),
                1
              );
            })(s, r, c)
          )
            return;
          return (
            (s.high = Math.max(s.high, r)),
            i(s),
            o(s),
            (t[c] = s),
            void e.size++
          );
        }
        var l = {
          low: n,
          high: r,
          max: r,
          C: 0,
          P: s,
          L: M,
          R: M,
          list: { index: c, high: r, next: null },
        };
        s === M ? (e.root = l) : (l.low < s.low ? (s.L = l) : (s.R = l), o(l)),
          (function (e, t) {
            for (var n; 0 === t.P.C; )
              t.P === t.P.P.L
                ? 0 === (n = t.P.P.R).C
                  ? ((t.P.C = 1), (n.C = 1), (t.P.P.C = 0), (t = t.P.P))
                  : (t === t.P.R && u(e, (t = t.P)),
                    (t.P.C = 1),
                    (t.P.P.C = 0),
                    f(e, t.P.P))
                : 0 === (n = t.P.P.L).C
                ? ((t.P.C = 1), (n.C = 1), (t.P.P.C = 0), (t = t.P.P))
                : (t === t.P.L && f(e, (t = t.P)),
                  (t.P.C = 1),
                  (t.P.P.C = 0),
                  u(e, t.P.P));
            e.root.C = 1;
          })(e, l),
          (t[c] = l),
          e.size++;
      },
      remove: function (n) {
        var r = t[n];
        if (void 0 !== r) {
          delete t[n];
          var a = (function (e, t) {
            var n = e.list;
            if (n.index === t)
              return null === n.next ? 0 : ((e.list = n.next), 1);
            var r = n;
            for (n = n.next; null !== n; ) {
              if (n.index === t) return (r.next = n.next), 1;
              (r = n), (n = n.next);
            }
          })(r, n);
          if (void 0 !== a) {
            if (1 === a)
              return (r.high = r.list.high), i(r), o(r), void e.size--;
            var s,
              l = r,
              v = l.C;
            r.L === M
              ? ((s = r.R), c(e, r, r.R))
              : r.R === M
              ? ((s = r.L), c(e, r, r.L))
              : ((v = (l = (function (e) {
                  for (; e.L !== M; ) e = e.L;
                  return e;
                })(r.R)).C),
                (s = l.R),
                l.P === r
                  ? (s.P = l)
                  : (c(e, l, l.R), (l.R = r.R), (l.R.P = l)),
                c(e, r, l),
                (l.L = r.L),
                (l.L.P = l),
                (l.C = r.C)),
              i(s),
              o(s),
              1 === v &&
                (function (e, t) {
                  for (var n; t !== M && 1 === t.C; )
                    t === t.P.L
                      ? (0 === (n = t.P.R).C &&
                          ((n.C = 1), (t.P.C = 0), u(e, t.P), (n = t.P.R)),
                        1 === n.L.C && 1 === n.R.C
                          ? ((n.C = 0), (t = t.P))
                          : (1 === n.R.C &&
                              ((n.L.C = 1), (n.C = 0), f(e, n), (n = t.P.R)),
                            (n.C = t.P.C),
                            (t.P.C = 1),
                            (n.R.C = 1),
                            u(e, t.P),
                            (t = e.root)))
                      : (0 === (n = t.P.L).C &&
                          ((n.C = 1), (t.P.C = 0), f(e, t.P), (n = t.P.L)),
                        1 === n.R.C && 1 === n.L.C
                          ? ((n.C = 0), (t = t.P))
                          : (1 === n.L.C &&
                              ((n.R.C = 1), (n.C = 0), u(e, n), (n = t.P.L)),
                            (n.C = t.P.C),
                            (t.P.C = 1),
                            (n.L.C = 1),
                            f(e, t.P),
                            (t = e.root)));
                  t.C = 1;
                })(e, s),
              e.size--;
          }
        }
      },
      search: function (t, n, r) {
        for (var i = [e.root]; 0 !== i.length; ) {
          var o = i.pop();
          if (
            o !== M &&
            t <= o.max &&
            (o.L !== M && i.push(o.L),
            o.R !== M && i.push(o.R),
            o.low <= n && o.high >= t)
          )
            for (var u = o.list; null !== u; )
              u.high < t || r(u.index, o.low), (u = u.next);
        }
      },
      get size() {
        return e.size;
      },
    };
  }
  function s() {
    return (s =
      Object.assign ||
      function (e) {
        for (var t = 1; arguments.length > t; t++) {
          var n = arguments[t];
          for (var r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      }).apply(this, arguments);
  }
  function l(e, t, n, r) {
    var i = L.useRef(n),
      o = L.useRef(r);
    L.useEffect(function () {
      (i.current = n), (o.current = r);
    }),
      L.useEffect(
        function () {
          function n() {
            if (!u) {
              for (
                var e = arguments.length, t = new Array(e), n = 0;
                e > n;
                n++
              )
                t[n] = arguments[n];
              i.current.apply(this, t);
            }
          }
          var r = e && "current" in e ? e.current : e;
          if (r) {
            var u = 0;
            r.addEventListener(t, n);
            var f = o.current;
            return function () {
              (u = 1), r.removeEventListener(t, n), f && f();
            };
          }
        },
        [e, t]
      );
  }
  function v() {
    var e = L.useState(F)[1];
    return L.useRef(function () {
      return e({});
    }).current;
  }
  function d(e) {
    var t,
      n = e.positioner,
      r = e.resizeObserver,
      i = e.items,
      o = e.as,
      u = void 0 === o ? "div" : o,
      f = e.id,
      c = e.className,
      a = e.style,
      l = e.role,
      d = void 0 === l ? "grid" : l,
      p = e.tabIndex,
      m = void 0 === p ? 0 : p,
      g = e.containerRef,
      P = e.itemAs,
      x = void 0 === P ? "div" : P,
      y = e.itemStyle,
      R = e.itemHeightEstimate,
      w = void 0 === R ? 300 : R,
      C = e.itemKey,
      b = void 0 === C ? h : C,
      M = e.overscanBy,
      z = void 0 === M ? 2 : M,
      E = e.scrollTop,
      O = e.isScrolling,
      I = e.height,
      S = e.render,
      W = e.onRender,
      j = 0,
      H = v(),
      k = V(n, r),
      A = i.length,
      B = n.columnWidth,
      F = n.columnCount,
      q = n.range,
      J = n.estimateHeight,
      Q = n.size,
      U = n.shortestColumn,
      X = Q(),
      Z = U(),
      $ = [],
      ee = "list" === d ? "listitem" : "grid" === d ? "gridcell" : void 0,
      te = T(W),
      ne = E + (z *= I),
      re = ne > Z && A > X;
    if (
      (q(Math.max(0, E - z / 2), ne, function (e, n, r) {
        var o = i[e],
          u = b(o, e),
          f = {
            top: r,
            left: n,
            width: B,
            writingMode: "horizontal-tb",
            position: "absolute",
          };
        $.push(
          G(
            x,
            {
              key: u,
              ref: k(e),
              role: ee,
              style: "object" == typeof y && null !== y ? s({}, f, y) : f,
            },
            Y(S, e, o, B)
          )
        ),
          void 0 === t
            ? ((j = e), (t = e))
            : ((j = Math.min(j, e)), (t = Math.max(t, e)));
      }),
      re)
    )
      for (
        var ie = Math.min(A - X, Math.ceil(((E + z - Z) / w) * F)),
          oe = X,
          ue = K(B);
        X + ie > oe;
        oe++
      ) {
        var fe = i[oe],
          ce = b(fe, oe);
        $.push(
          G(
            x,
            {
              key: ce,
              ref: k(oe),
              role: ee,
              style: "object" == typeof y ? s({}, ue, y) : ue,
            },
            Y(S, oe, fe, B)
          )
        );
      }
    L.useEffect(
      function () {
        "function" == typeof te.current && void 0 !== t && te.current(j, t, i),
          (N = "1");
      },
      [j, t, i, te]
    ),
      L.useEffect(
        function () {
          re && H();
        },
        [re, n]
      );
    var ae = _(O, J(A, w));
    return G(u, {
      ref: g,
      key: N,
      id: f,
      role: d,
      className: c,
      tabIndex: m,
      style: "object" == typeof a ? D(ae, a) : ae,
      children: $,
    });
  }
  function h(e, t) {
    return t;
  }
  function p(e, t, n) {
    function r() {
      (u.current = 0), c();
    }
    void 0 === t && (t = 30), void 0 === n && (n = 0);
    var i = T(e),
      o = 1e3 / t,
      u = L.useRef(0),
      f = L.useRef(),
      c = function () {
        return f.current && clearTimeout(f.current);
      },
      a = [t, n, i];
    return (
      L.useEffect(function () {
        return r;
      }, a),
      L.useCallback(function () {
        var e = arguments,
          t = oe(),
          r = function () {
            (u.current = t), c(), i.current.apply(null, e);
          },
          a = u.current;
        if (n && 0 === a) return r();
        if (t - a > o) {
          if (a > 0) return r();
          u.current = t;
        }
        c(),
          (f.current = setTimeout(function () {
            r(), (u.current = 0);
          }, o));
      }, a)
    );
  }
  function m(e, t) {
    void 0 === e && (e = 0), void 0 === t && (t = 12);
    var n = ce(t),
      r = L.useState(0),
      i = r[0],
      o = r[1],
      u = L.useRef(0);
    return (
      L.useEffect(
        function () {
          1 === u.current && o(1);
          var e,
            n,
            r,
            i,
            f = 0,
            c =
              ((e = function () {
                f || o(0);
              }),
              (n = 40 + 1e3 / t),
              (r = X()),
              ((i = {}).v = te(function t() {
                X() - r < n ? (i.v = te(t)) : e.call(null);
              })),
              i);
          return (
            (u.current = 1),
            function () {
              (f = 1),
                (function (e) {
                  ne(e.v || -1);
                })(c);
            }
          );
        },
        [t, n]
      ),
      { scrollTop: Math.max(0, n - e), isScrolling: i }
    );
  }
  function g(e) {
    var t = m(e.offset, e.scrollFps);
    return d({
      scrollTop: t.scrollTop,
      isScrolling: t.isScrolling,
      positioner: e.positioner,
      resizeObserver: e.resizeObserver,
      items: e.items,
      onRender: e.onRender,
      as: e.as,
      id: e.id,
      className: e.className,
      style: e.style,
      role: e.role,
      tabIndex: e.tabIndex,
      containerRef: e.containerRef,
      itemAs: e.itemAs,
      itemStyle: e.itemStyle,
      itemHeightEstimate: e.itemHeightEstimate,
      itemKey: e.itemKey,
      overscanBy: e.overscanBy,
      height: e.height,
      render: e.render,
    });
  }
  function P(e, t) {
    void 0 === t && (t = se);
    var n = L.useState({ offset: 0, width: 0 }),
      r = n[0],
      i = n[1];
    return (
      ae(function () {
        var t = e.current;
        if (null !== t) {
          var n = 0,
            o = t;
          do {
            (n += o.offsetTop || 0), (o = o.offsetParent);
          } while (o);
          (n === r.offset && t.offsetWidth === r.width) ||
            i({ offset: n, width: t.offsetWidth });
        }
      }, t),
      r
    );
  }
  function x(e, t) {
    var n = e.width,
      r = e.columnWidth,
      i = void 0 === r ? 200 : r,
      o = e.columnGutter,
      u = void 0 === o ? 0 : o,
      f = e.rowGutter,
      c = e.columnCount,
      a = e.maxColumnCount,
      s = e.maxColumnWidth;
    void 0 === t && (t = he);
    var l = function () {
        var e = de(n, i, u, c, a, s),
          t = e[0],
          r = e[1];
        return le(r, t, u, null != f ? f : u);
      },
      v = L.useRef();
    void 0 === v.current && (v.current = l());
    var d = L.useRef(t),
      h = [n, i, u, f, c, a, s],
      p = L.useRef(h),
      m = !h.every(function (e, t) {
        return p.current[t] === e;
      });
    if (
      m ||
      !t.every(function (e, t) {
        return d.current[t] === e;
      })
    ) {
      var g = v.current,
        P = l();
      if (((d.current = t), (p.current = h), m))
        for (var x = g.size(), y = 0; x > y; y++) {
          var R = g.get(y);
          P.set(y, void 0 !== R ? R.height : 0);
        }
      v.current = P;
    }
    return v.current;
  }
  function y(e) {
    function t() {
      return r.disconnect();
    }
    var n = v(),
      r = me(e, n);
    return (
      L.useEffect(
        function () {
          return t;
        },
        [r]
      ),
      r
    );
  }
  function R(e) {
    e.cancel();
  }
  function w(e, t) {
    var n,
      r = t.align,
      i = void 0 === r ? "top" : r,
      o = t.element,
      u = void 0 === o ? "undefined" != typeof window && window : o,
      f = t.offset,
      c = void 0 === f ? 0 : f,
      a = t.height,
      s =
        void 0 === a
          ? "undefined" != typeof window
            ? window.innerHeight
            : 0
          : a,
      v = T({ positioner: e, element: u, align: i, offset: c, height: s }),
      d = L.useRef(function () {
        var e = v.current.element;
        return e && "current" in e ? e.current : e;
      }).current,
      h = L.useReducer(function (e, t) {
        var n,
          r = { position: e.position, index: e.index, prevTop: e.prevTop };
        if ("scrollToIndex" === t.type)
          return {
            position: v.current.positioner.get(
              null !== (n = t.value) && void 0 !== n ? n : -1
            ),
            index: t.value,
            prevTop: void 0,
          };
        if ("setPosition" === t.type) r.position = t.value;
        else if ("setPrevTop" === t.type) r.prevTop = t.value;
        else if ("reset" === t.type) return ge;
        return r;
      }, ge),
      m = h[0],
      g = h[1],
      P = p(g, 15);
    l(d(), "scroll", function () {
      if (!m.position && m.index) {
        var e = v.current.positioner.get(m.index);
        e && g({ type: "setPosition", value: e });
      }
    });
    var x =
      void 0 !== m.index &&
      (null === (n = v.current.positioner.get(m.index)) || void 0 === n
        ? void 0
        : n.top);
    return (
      L.useEffect(
        function () {
          var e = d();
          if (e) {
            var t = v.current,
              n = t.height,
              r = t.align,
              i = t.offset,
              o = t.positioner;
            if (m.position) {
              var u = m.position.top;
              "bottom" === r
                ? (u = u - n + m.position.height)
                : "center" === r && (u -= (n - m.position.height) / 2),
                e.scrollTo(0, Math.max(0, (u += i)));
              var f = 0,
                c = setTimeout(function () {
                  return !f && g({ type: "reset" });
                }, 400);
              return function () {
                (f = 1), clearTimeout(c);
              };
            }
            if (void 0 !== m.index) {
              var a = (o.shortestColumn() / o.size()) * m.index;
              m.prevTop && (a = Math.max(a, m.prevTop + n)),
                e.scrollTo(0, a),
                P({ type: "setPrevTop", value: a });
            }
          }
        },
        [x, m, v, d, P]
      ),
      L.useRef(function (e) {
        g({ type: "scrollToIndex", value: e });
      }).current
    );
  }
  function C(e) {
    var t = L.useRef(null),
      n = (function (e) {
        void 0 === e && (e = E);
        var t = e,
          n = t.wait,
          r = t.leading,
          i = t.initialWidth,
          o = void 0 === i ? 0 : i,
          u = t.initialHeight,
          f = (function (e, t, n) {
            var r = L.useState(e);
            return [r[0], z(r[1], t, n)];
          })(
            "undefined" == typeof document ? [o, void 0 === u ? 0 : u] : S,
            n,
            r
          ),
          c = f[0],
          a = f[1],
          s = function () {
            return a(S);
          };
        return (
          l(O, "resize", s), l(I, "resize", s), l(O, "orientationchange", s), c
        );
      })({ initialWidth: e.ssrWidth, initialHeight: e.ssrHeight }),
      r = P(t, n),
      i = s(
        {
          offset: r.offset,
          width: r.width || n[0],
          height: n[1],
          containerRef: t,
        },
        e
      );
    (i.positioner = x(i)), (i.resizeObserver = y(i.positioner));
    var o = w(i.positioner, {
        height: i.height,
        offset: r.offset,
        align:
          "object" == typeof e.scrollToIndex ? e.scrollToIndex.align : void 0,
      }),
      u =
        e.scrollToIndex &&
        ("number" == typeof e.scrollToIndex
          ? e.scrollToIndex
          : e.scrollToIndex.index);
    return (
      L.useEffect(
        function () {
          void 0 !== u && o(u);
        },
        [u, o]
      ),
      Pe(g, i)
    );
  }
  var L = r(t),
    b = n(t),
    M = {
      low: 0,
      max: 0,
      high: 0,
      C: 2,
      P: void 0,
      R: void 0,
      L: void 0,
      list: void 0,
    };
  (M.P = M), (M.L = M), (M.R = M);
  var T = function (e) {
      var t = L.useRef(e);
      return (
        L.useEffect(function () {
          t.current = e;
        }),
        t
      );
    },
    z = function (e, t, n) {
      function r() {
        u.current && clearTimeout(u.current), (u.current = void 0);
      }
      function i() {
        u.current = void 0;
      }
      void 0 === t && (t = 100), void 0 === n && (n = 0);
      var o = T(e),
        u = L.useRef(),
        f = [t, n, o];
      return (
        L.useEffect(function () {
          return r;
        }, f),
        L.useCallback(function () {
          var e = arguments,
            r = u.current;
          if (void 0 === r && n)
            return (u.current = setTimeout(i, t)), o.current.apply(null, e);
          r && clearTimeout(r),
            (u.current = setTimeout(function () {
              (u.current = void 0), o.current.apply(null, e);
            }, t));
        }, f)
      );
    },
    E = {},
    O = "undefined" == typeof window ? null : window,
    I = O && void 0 !== O.visualViewport ? O.visualViewport : null,
    S = function () {
      return [
        document.documentElement.clientWidth,
        document.documentElement.clientHeight,
      ];
    },
    W = function (e, t) {
      var n,
        r,
        i = t || j;
      return function () {
        return n && i(arguments, n) ? r : (r = e.apply(null, (n = arguments)));
      };
    },
    j = function (e, t) {
      return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3];
    },
    H = function () {
      var e, t;
      (this.set = void 0),
        (this.get = void 0),
        (this.get = function (n) {
          return n === e ? t : void 0;
        }),
        (this.set = function (n, r) {
          (e = n), (t = r);
        });
    },
    k = function (e) {
      try {
        return new e();
      } catch (e) {
        var t = {};
        return {
          set: function (e, n) {
            t[e] = n;
          },
          get: function (e) {
            return t[e];
          },
        };
      }
    },
    A = function (e, t) {
      var n,
        r,
        i,
        o,
        u,
        f,
        c,
        a,
        s,
        l =
          ((c = (r = e).length),
          (a = k(r[0])),
          (s = 1 === c),
          3 > c
            ? {
                g: function (e) {
                  return void 0 === (i = a.get(e[0])) || s ? i : i.get(e[1]);
                },
                s: function (e, t) {
                  return (
                    s
                      ? a.set(e[0], t)
                      : void 0 === (i = a.get(e[0]))
                      ? ((o = k(r[1])).set(e[1], t), a.set(e[0], o))
                      : i.set(e[1], t),
                    t
                  );
                },
              }
            : {
                g: function (e) {
                  for (f = a, u = 0; c > u; u++)
                    if (void 0 === (f = f.get(e[u]))) return;
                  return f;
                },
                s: function (e, t) {
                  for (f = a, u = 0; c - 1 > u; u++)
                    void 0 === (o = f.get(e[u]))
                      ? ((o = k(r[u + 1])), f.set(e[u], o), (f = o))
                      : (f = o);
                  return f.set(e[c - 1], t), t;
                },
              }),
        v = l.g,
        d = l.s;
      return function () {
        return void 0 === (n = v(arguments))
          ? d(arguments, t.apply(null, arguments))
          : n;
      };
    },
    B = new WeakMap(),
    F = {},
    G = L.createElement,
    N = "0",
    Y = A([H, {}, WeakMap, H], function (e, t, n, r) {
      return G(e, { index: t, data: n, width: r });
    }),
    _ = W(function (e, t) {
      return {
        position: "relative",
        width: "100%",
        maxWidth: "100%",
        height: Math.ceil(t),
        maxHeight: Math.ceil(t),
        willChange: e ? "contents" : void 0,
        pointerEvents: e ? "none" : void 0,
      };
    }),
    q = function (e, t) {
      return e[0] === t[0] && e[1] === t[1];
    },
    D = W(function (e, t) {
      return s({}, e, t);
    }, q),
    K = W(
      function (e) {
        return {
          width: e,
          zIndex: -1e3,
          visibility: "hidden",
          position: "absolute",
          writingMode: "horizontal-tb",
        };
      },
      function (e, t) {
        return e[0] === t[0];
      }
    ),
    V = W(function (e, t) {
      return function (n) {
        return function (r) {
          null !== r &&
            (t && (t.observe(r), B.set(r, n)),
            void 0 === e.get(n) && e.set(n, r.offsetHeight));
        };
      };
    }, q),
    J = "undefined",
    Q = typeof window !== J ? window : {},
    U = typeof performance !== J ? performance : Date,
    X = function () {
      return U.now();
    },
    Z = "AnimationFrame",
    $ = "cancel" + Z,
    ee = "request" + Z,
    te = Q[ee] && Q[ee].bind(Q),
    ne = Q[$] && Q[$].bind(Q);
  if (!te || !ne) {
    var re = 0;
    (te = function (e) {
      var t = X(),
        n = Math.max(re + 1e3 / 60, t);
      return setTimeout(function () {
        e((re = n));
      }, n - t);
    }),
      (ne = function (e) {
        return clearTimeout(e);
      });
  }
  var ie = "undefined" != typeof performance ? performance : Date,
    oe = function () {
      return ie.now();
    },
    ue = "undefined" == typeof window ? null : window,
    fe = function () {
      return void 0 !== ue.scrollY
        ? ue.scrollY
        : void 0 === ue.pageYOffset
        ? 0
        : ue.pageYOffset;
    },
    ce = function (e) {
      void 0 === e && (e = 30);
      var t = (function (e, t) {
        var n = L.useState(e);
        return [n[0], p(n[1], t, 1)];
      })("undefined" == typeof window ? 0 : fe, e);
      return (
        l(ue, "scroll", function () {
          return t[1](fe());
        }),
        t[0]
      );
    },
    ae =
      b.default[
        "undefined" != typeof document && void 0 !== document.createElement
          ? "useLayoutEffect"
          : "useEffect"
      ],
    se = [],
    le = function (e, t, n, r) {
      void 0 === n && (n = 0), void 0 === r && (r = n);
      for (
        var i = a(), o = new Array(e), u = [], f = new Array(e), c = 0;
        e > c;
        c++
      )
        (o[c] = 0), (f[c] = []);
      return {
        columnCount: e,
        columnWidth: t,
        set: function (e, c) {
          void 0 === c && (c = 0);
          for (var a = 0, s = 1; s < o.length; s++) o[s] < o[a] && (a = s);
          var l = o[a] || 0;
          (o[a] = l + c + r),
            f[a].push(e),
            (u[e] = { left: a * (t + n), top: l, height: c, column: a }),
            i.insert(l, l + c, e);
        },
        get: function (e) {
          return u[e];
        },
        update: function (t) {
          for (var n = new Array(e), c = 0, a = 0; c < t.length - 1; c++) {
            var s = t[c],
              l = u[s];
            (l.height = t[++c]),
              i.remove(s),
              i.insert(l.top, l.top + l.height, s),
              (n[l.column] =
                void 0 === n[l.column] ? s : Math.min(s, n[l.column]));
          }
          for (c = 0; c < n.length; c++)
            if (void 0 !== n[c]) {
              var v = f[c],
                d = ve(v, n[c]),
                h = f[c][d],
                p = u[h];
              for (o[c] = p.top + p.height + r, a = d + 1; a < v.length; a++) {
                var m = v[a],
                  g = u[m];
                (g.top = o[c]),
                  (o[c] = g.top + g.height + r),
                  i.remove(m),
                  i.insert(g.top, g.top + g.height, m);
              }
            }
        },
        range: function (e, t, n) {
          return i.search(e, t, function (e, t) {
            return n(e, u[e].left, t);
          });
        },
        estimateHeight: function (t, n) {
          var r = Math.max(0, Math.max.apply(null, o));
          return t === i.size ? r : r + Math.ceil((t - i.size) / e) * n;
        },
        shortestColumn: function () {
          return o.length > 1 ? Math.min.apply(null, o) : o[0] || 0;
        },
        size: function () {
          return i.size;
        },
        all: function () {
          return u;
        },
      };
    },
    ve = function (e, t) {
      for (var n = 0, r = e.length - 1; r >= n; ) {
        var i = (n + r) >>> 1,
          o = e[i];
        if (o === t) return i;
        o > t ? (r = i - 1) : (n = i + 1);
      }
      return -1;
    },
    de = function (e, t, n, r, i, o) {
      void 0 === e && (e = 0),
        void 0 === t && (t = 0),
        void 0 === n && (n = 8),
        (r = r || Math.min(Math.floor((e + n) / (t + n)), i || 1 / 0) || 1);
      var u = Math.floor((e - n * (r - 1)) / r);
      return void 0 !== o && u > o && (u = o), [u, r];
    },
    he = [],
    pe = function (e) {
      function t() {
        (r = null), e.apply(void 0, n);
      }
      var n = [],
        r = null,
        i = function () {
          for (var e = arguments.length, i = new Array(e), o = 0; e > o; o++)
            i[o] = arguments[o];
          (n = i), r || (r = requestAnimationFrame(t));
        };
      return (
        (i.cancel = function () {
          r && (cancelAnimationFrame(r), (r = null));
        }),
        i
      );
    },
    me = A([WeakMap], function (e, t) {
      var n = [],
        r = pe(function () {
          n.length > 0 && (e.update(n), t(n)), (n.length = 0);
        }),
        i = function (t) {
          var i = t.offsetHeight;
          if (i > 0) {
            var o = B.get(t);
            if (void 0 !== o) {
              var u = e.get(o);
              void 0 !== u && i !== u.height && n.push(o, i);
            }
          }
          r();
        },
        o = new Map(),
        u = new ResizeObserver(function (e) {
          for (var t = 0; t < e.length; t++) {
            var n = e[t],
              r = B.get(n.target);
            if (void 0 !== r) {
              var u = o.get(r);
              u || ((u = pe(i)), o.set(r, u)), u(n.target);
            }
          }
        }),
        f = u.disconnect.bind(u);
      return (
        (u.disconnect = function () {
          f(), o.forEach(R);
        }),
        u
      );
    }),
    ge = { index: void 0, position: void 0, prevTop: void 0 },
    Pe = L.createElement,
    xe = L.createElement,
    ye = function (e, t) {
      return void 0 !== t[e];
    },
    Re = {};
  (e.List = function (e) {
    return xe(
      C,
      s(
        {
          role: "list",
          rowGutter: e.rowGutter,
          columnCount: 1,
          columnWidth: 1,
        },
        e
      )
    );
  }),
    (e.Masonry = C),
    (e.MasonryScroller = g),
    (e.createIntervalTree = a),
    (e.createPositioner = le),
    (e.createResizeObserver = me),
    (e.useContainerPosition = P),
    (e.useInfiniteLoader = function (e, t) {
      void 0 === t && (t = Re);
      var n = t,
        r = n.isItemLoaded,
        i = n.minimumBatchSize,
        o = void 0 === i ? 16 : i,
        u = n.threshold,
        f = void 0 === u ? 16 : u,
        c = n.totalItems,
        a = void 0 === c ? 9e9 : c,
        s = T(e),
        l = T(r);
      return L.useCallback(
        function (e, t, n) {
          for (
            var r = (function (e, t, n, r, i, o) {
                void 0 === e && (e = ye),
                  void 0 === t && (t = 16),
                  void 0 === r && (r = 9e9);
                for (var u, f, c = [], a = i; o >= a; a++)
                  e(a, n)
                    ? void 0 !== u &&
                      void 0 !== f &&
                      (c.push(u, f), (u = f = void 0))
                    : ((f = a), void 0 === u && (u = a));
                if (void 0 !== u && void 0 !== f) {
                  var s = Math.min(Math.max(f, u + t - 1), r - 1);
                  for (a = f + 1; s >= a && !e(a, n); a++) f = a;
                  c.push(u, f);
                }
                if (c.length)
                  for (var l = c[0], v = c[1]; t > v - l + 1 && l > 0; ) {
                    var d = l - 1;
                    if (e(d, n)) break;
                    c[0] = l = d;
                  }
                return c;
              })(
                l.current,
                o,
                n,
                a,
                Math.max(0, e - f),
                Math.min(a - 1, (t || 0) + f)
              ),
              i = 0;
            i < r.length - 1;
            ++i
          )
            s.current(r[i], r[++i], n);
        },
        [a, o, f, s, l]
      );
    }),
    (e.useMasonry = d),
    (e.usePositioner = x),
    (e.useResizeObserver = y),
    (e.useScrollToIndex = w),
    (e.useScroller = m),
    Object.defineProperty(e, "__esModule", { value: 1 });
});
//# sourceMappingURL=masonic.js.map
