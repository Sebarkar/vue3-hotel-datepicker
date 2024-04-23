import { defineComponent as Cr, h as tt, ref as xr, resolveComponent as pa, openBlock as En, createElementBlock as yn, createElementVNode as j, createVNode as ge, withCtx as Ee, createTextVNode as De, toDisplayString as ye, normalizeClass as _a, createCommentVNode as ha, unref as gt, pushScopeId as Ea, popScopeId as ya, watch as Na, computed as Ze, createApp as wa } from "vue";
import { _ as va, V as Re } from "./Vue3HotelDatePicker-C1Y-zllW.js";
(function() {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload"))
    return;
  for (const a of document.querySelectorAll('link[rel="modulepreload"]'))
    r(a);
  new MutationObserver((a) => {
    for (const i of a)
      if (i.type === "childList")
        for (const s of i.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && r(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(a) {
    const i = {};
    return a.integrity && (i.integrity = a.integrity), a.referrerPolicy && (i.referrerPolicy = a.referrerPolicy), a.crossOrigin === "use-credentials" ? i.credentials = "include" : a.crossOrigin === "anonymous" ? i.credentials = "omit" : i.credentials = "same-origin", i;
  }
  function r(a) {
    if (a.ep)
      return;
    a.ep = !0;
    const i = n(a);
    fetch(a.href, i);
  }
})();
const Ue = /^[a-z0-9]+(-[a-z0-9]+)*$/, it = (e, t, n, r = "") => {
  const a = e.split(":");
  if (e.slice(0, 1) === "@") {
    if (a.length < 2 || a.length > 3)
      return null;
    r = a.shift().slice(1);
  }
  if (a.length > 3 || !a.length)
    return null;
  if (a.length > 1) {
    const o = a.pop(), c = a.pop(), l = {
      // Allow provider without '@': "provider:prefix:name"
      provider: a.length > 0 ? a[0] : r,
      prefix: c,
      name: o
    };
    return t && !Je(l) ? null : l;
  }
  const i = a[0], s = i.split("-");
  if (s.length > 1) {
    const o = {
      provider: r,
      prefix: s.shift(),
      name: s.join("-")
    };
    return t && !Je(o) ? null : o;
  }
  if (n && r === "") {
    const o = {
      provider: r,
      prefix: "",
      name: i
    };
    return t && !Je(o, n) ? null : o;
  }
  return null;
}, Je = (e, t) => e ? !!((e.provider === "" || e.provider.match(Ue)) && (t && e.prefix === "" || e.prefix.match(Ue)) && e.name.match(Ue)) : !1, Dr = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
), nt = Object.freeze({
  rotate: 0,
  vFlip: !1,
  hFlip: !1
}), st = Object.freeze({
  ...Dr,
  ...nt
}), tn = Object.freeze({
  ...st,
  body: "",
  hidden: !1
});
function Sa(e, t) {
  const n = {};
  !e.hFlip != !t.hFlip && (n.hFlip = !0), !e.vFlip != !t.vFlip && (n.vFlip = !0);
  const r = ((e.rotate || 0) + (t.rotate || 0)) % 4;
  return r && (n.rotate = r), n;
}
function Nn(e, t) {
  const n = Sa(e, t);
  for (const r in tn)
    r in nt ? r in e && !(r in n) && (n[r] = nt[r]) : r in t ? n[r] = t[r] : r in e && (n[r] = e[r]);
  return n;
}
function Ta(e, t) {
  const n = e.icons, r = e.aliases || /* @__PURE__ */ Object.create(null), a = /* @__PURE__ */ Object.create(null);
  function i(s) {
    if (n[s])
      return a[s] = [];
    if (!(s in a)) {
      a[s] = null;
      const o = r[s] && r[s].parent, c = o && i(o);
      c && (a[s] = [o].concat(c));
    }
    return a[s];
  }
  return (t || Object.keys(n).concat(Object.keys(r))).forEach(i), a;
}
function Oa(e, t, n) {
  const r = e.icons, a = e.aliases || /* @__PURE__ */ Object.create(null);
  let i = {};
  function s(o) {
    i = Nn(
      r[o] || a[o],
      i
    );
  }
  return s(t), n.forEach(s), Nn(e, i);
}
function Lr(e, t) {
  const n = [];
  if (typeof e != "object" || typeof e.icons != "object")
    return n;
  e.not_found instanceof Array && e.not_found.forEach((a) => {
    t(a, null), n.push(a);
  });
  const r = Ta(e);
  for (const a in r) {
    const i = r[a];
    i && (t(a, Oa(e, a, i)), n.push(a));
  }
  return n;
}
const Ma = {
  provider: "",
  aliases: {},
  not_found: {},
  ...Dr
};
function ft(e, t) {
  for (const n in t)
    if (n in e && typeof e[n] != typeof t[n])
      return !1;
  return !0;
}
function Pr(e) {
  if (typeof e != "object" || e === null)
    return null;
  const t = e;
  if (typeof t.prefix != "string" || !e.icons || typeof e.icons != "object" || !ft(e, Ma))
    return null;
  const n = t.icons;
  for (const a in n) {
    const i = n[a];
    if (!a.match(Ue) || typeof i.body != "string" || !ft(
      i,
      tn
    ))
      return null;
  }
  const r = t.aliases || /* @__PURE__ */ Object.create(null);
  for (const a in r) {
    const i = r[a], s = i.parent;
    if (!a.match(Ue) || typeof s != "string" || !n[s] && !r[s] || !ft(
      i,
      tn
    ))
      return null;
  }
  return t;
}
const wn = /* @__PURE__ */ Object.create(null);
function Ra(e, t) {
  return {
    provider: e,
    prefix: t,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function ve(e, t) {
  const n = wn[e] || (wn[e] = /* @__PURE__ */ Object.create(null));
  return n[t] || (n[t] = Ra(e, t));
}
function ln(e, t) {
  return Pr(t) ? Lr(t, (n, r) => {
    r ? e.icons[n] = r : e.missing.add(n);
  }) : [];
}
function Aa(e, t, n) {
  try {
    if (typeof n.body == "string")
      return e.icons[t] = { ...n }, !0;
  } catch {
  }
  return !1;
}
let Fe = !1;
function Br(e) {
  return typeof e == "boolean" && (Fe = e), Fe;
}
function ka(e) {
  const t = typeof e == "string" ? it(e, !0, Fe) : e;
  if (t) {
    const n = ve(t.provider, t.prefix), r = t.name;
    return n.icons[r] || (n.missing.has(r) ? null : void 0);
  }
}
function Ia(e, t) {
  const n = it(e, !0, Fe);
  if (!n)
    return !1;
  const r = ve(n.provider, n.prefix);
  return Aa(r, n.name, t);
}
function Ca(e, t) {
  if (typeof e != "object")
    return !1;
  if (typeof t != "string" && (t = e.provider || ""), Fe && !t && !e.prefix) {
    let a = !1;
    return Pr(e) && (e.prefix = "", Lr(e, (i, s) => {
      s && Ia(i, s) && (a = !0);
    })), a;
  }
  const n = e.prefix;
  if (!Je({
    provider: t,
    prefix: n,
    name: "a"
  }))
    return !1;
  const r = ve(t, n);
  return !!ln(r, e);
}
const Ur = Object.freeze({
  width: null,
  height: null
}), Fr = Object.freeze({
  // Dimensions
  ...Ur,
  // Transformations
  ...nt
}), xa = /(-?[0-9.]*[0-9]+[0-9.]*)/g, Da = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function vn(e, t, n) {
  if (t === 1)
    return e;
  if (n = n || 100, typeof e == "number")
    return Math.ceil(e * t * n) / n;
  if (typeof e != "string")
    return e;
  const r = e.split(xa);
  if (r === null || !r.length)
    return e;
  const a = [];
  let i = r.shift(), s = Da.test(i);
  for (; ; ) {
    if (s) {
      const o = parseFloat(i);
      isNaN(o) ? a.push(i) : a.push(Math.ceil(o * t * n) / n);
    } else
      a.push(i);
    if (i = r.shift(), i === void 0)
      return a.join("");
    s = !s;
  }
}
function La(e, t = "defs") {
  let n = "";
  const r = e.indexOf("<" + t);
  for (; r >= 0; ) {
    const a = e.indexOf(">", r), i = e.indexOf("</" + t);
    if (a === -1 || i === -1)
      break;
    const s = e.indexOf(">", i);
    if (s === -1)
      break;
    n += e.slice(a + 1, i).trim(), e = e.slice(0, r).trim() + e.slice(s + 1);
  }
  return {
    defs: n,
    content: e
  };
}
function Pa(e, t) {
  return e ? "<defs>" + e + "</defs>" + t : t;
}
function Ba(e, t, n) {
  const r = La(e);
  return Pa(r.defs, t + r.content + n);
}
const Ua = (e) => e === "unset" || e === "undefined" || e === "none";
function Fa(e, t) {
  const n = {
    ...st,
    ...e
  }, r = {
    ...Fr,
    ...t
  }, a = {
    left: n.left,
    top: n.top,
    width: n.width,
    height: n.height
  };
  let i = n.body;
  [n, r].forEach((_) => {
    const b = [], E = _.hFlip, N = _.vFlip;
    let w = _.rotate;
    E ? N ? w += 2 : (b.push(
      "translate(" + (a.width + a.left).toString() + " " + (0 - a.top).toString() + ")"
    ), b.push("scale(-1 1)"), a.top = a.left = 0) : N && (b.push(
      "translate(" + (0 - a.left).toString() + " " + (a.height + a.top).toString() + ")"
    ), b.push("scale(1 -1)"), a.top = a.left = 0);
    let O;
    switch (w < 0 && (w -= Math.floor(w / 4) * 4), w = w % 4, w) {
      case 1:
        O = a.height / 2 + a.top, b.unshift(
          "rotate(90 " + O.toString() + " " + O.toString() + ")"
        );
        break;
      case 2:
        b.unshift(
          "rotate(180 " + (a.width / 2 + a.left).toString() + " " + (a.height / 2 + a.top).toString() + ")"
        );
        break;
      case 3:
        O = a.width / 2 + a.left, b.unshift(
          "rotate(-90 " + O.toString() + " " + O.toString() + ")"
        );
        break;
    }
    w % 2 === 1 && (a.left !== a.top && (O = a.left, a.left = a.top, a.top = O), a.width !== a.height && (O = a.width, a.width = a.height, a.height = O)), b.length && (i = Ba(
      i,
      '<g transform="' + b.join(" ") + '">',
      "</g>"
    ));
  });
  const s = r.width, o = r.height, c = a.width, l = a.height;
  let u, d;
  s === null ? (d = o === null ? "1em" : o === "auto" ? l : o, u = vn(d, c / l)) : (u = s === "auto" ? c : s, d = o === null ? vn(u, l / c) : o === "auto" ? l : o);
  const g = {}, f = (_, b) => {
    Ua(b) || (g[_] = b.toString());
  };
  f("width", u), f("height", d);
  const p = [a.left, a.top, c, l];
  return g.viewBox = p.join(" "), {
    attributes: g,
    viewBox: p,
    body: i
  };
}
const $a = /\sid="(\S+)"/g, za = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let qa = 0;
function Ka(e, t = za) {
  const n = [];
  let r;
  for (; r = $a.exec(e); )
    n.push(r[1]);
  if (!n.length)
    return e;
  const a = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  return n.forEach((i) => {
    const s = typeof t == "function" ? t(i) : t + (qa++).toString(), o = i.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    e = e.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + o + ')([")]|\\.[a-z])', "g"),
      "$1" + s + a + "$3"
    );
  }), e = e.replace(new RegExp(a, "g"), ""), e;
}
const nn = /* @__PURE__ */ Object.create(null);
function Ha(e, t) {
  nn[e] = t;
}
function rn(e) {
  return nn[e] || nn[""];
}
function un(e) {
  let t;
  if (typeof e.resources == "string")
    t = [e.resources];
  else if (t = e.resources, !(t instanceof Array) || !t.length)
    return null;
  return {
    // API hosts
    resources: t,
    // Root path
    path: e.path || "/",
    // URL length limit
    maxURL: e.maxURL || 500,
    // Timeout before next host is used.
    rotate: e.rotate || 750,
    // Timeout before failing query.
    timeout: e.timeout || 5e3,
    // Randomise default API end point.
    random: e.random === !0,
    // Start index
    index: e.index || 0,
    // Receive data after time out (used if time out kicks in first, then API module sends data anyway).
    dataAfterTimeout: e.dataAfterTimeout !== !1
  };
}
const dn = /* @__PURE__ */ Object.create(null), Le = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
], je = [];
for (; Le.length > 0; )
  Le.length === 1 || Math.random() > 0.5 ? je.push(Le.shift()) : je.push(Le.pop());
dn[""] = un({
  resources: ["https://api.iconify.design"].concat(je)
});
function Ga(e, t) {
  const n = un(t);
  return n === null ? !1 : (dn[e] = n, !0);
}
function gn(e) {
  return dn[e];
}
const Wa = () => {
  let e;
  try {
    if (e = fetch, typeof e == "function")
      return e;
  } catch {
  }
};
let Sn = Wa();
function Ya(e, t) {
  const n = gn(e);
  if (!n)
    return 0;
  let r;
  if (!n.maxURL)
    r = 0;
  else {
    let a = 0;
    n.resources.forEach((s) => {
      a = Math.max(a, s.length);
    });
    const i = t + ".json?icons=";
    r = n.maxURL - a - n.path.length - i.length;
  }
  return r;
}
function Za(e) {
  return e === 404;
}
const Va = (e, t, n) => {
  const r = [], a = Ya(e, t), i = "icons";
  let s = {
    type: i,
    provider: e,
    prefix: t,
    icons: []
  }, o = 0;
  return n.forEach((c, l) => {
    o += c.length + 1, o >= a && l > 0 && (r.push(s), s = {
      type: i,
      provider: e,
      prefix: t,
      icons: []
    }, o = c.length), s.icons.push(c);
  }), r.push(s), r;
};
function Xa(e) {
  if (typeof e == "string") {
    const t = gn(e);
    if (t)
      return t.path;
  }
  return "/";
}
const Qa = (e, t, n) => {
  if (!Sn) {
    n("abort", 424);
    return;
  }
  let r = Xa(t.provider);
  switch (t.type) {
    case "icons": {
      const i = t.prefix, o = t.icons.join(","), c = new URLSearchParams({
        icons: o
      });
      r += i + ".json?" + c.toString();
      break;
    }
    case "custom": {
      const i = t.uri;
      r += i.slice(0, 1) === "/" ? i.slice(1) : i;
      break;
    }
    default:
      n("abort", 400);
      return;
  }
  let a = 503;
  Sn(e + r).then((i) => {
    const s = i.status;
    if (s !== 200) {
      setTimeout(() => {
        n(Za(s) ? "abort" : "next", s);
      });
      return;
    }
    return a = 501, i.json();
  }).then((i) => {
    if (typeof i != "object" || i === null) {
      setTimeout(() => {
        i === 404 ? n("abort", i) : n("next", a);
      });
      return;
    }
    setTimeout(() => {
      n("success", i);
    });
  }).catch(() => {
    n("next", a);
  });
}, Ja = {
  prepare: Va,
  send: Qa
};
function ja(e) {
  const t = {
    loaded: [],
    missing: [],
    pending: []
  }, n = /* @__PURE__ */ Object.create(null);
  e.sort((a, i) => a.provider !== i.provider ? a.provider.localeCompare(i.provider) : a.prefix !== i.prefix ? a.prefix.localeCompare(i.prefix) : a.name.localeCompare(i.name));
  let r = {
    provider: "",
    prefix: "",
    name: ""
  };
  return e.forEach((a) => {
    if (r.name === a.name && r.prefix === a.prefix && r.provider === a.provider)
      return;
    r = a;
    const i = a.provider, s = a.prefix, o = a.name, c = n[i] || (n[i] = /* @__PURE__ */ Object.create(null)), l = c[s] || (c[s] = ve(i, s));
    let u;
    o in l.icons ? u = t.loaded : s === "" || l.missing.has(o) ? u = t.missing : u = t.pending;
    const d = {
      provider: i,
      prefix: s,
      name: o
    };
    u.push(d);
  }), t;
}
function $r(e, t) {
  e.forEach((n) => {
    const r = n.loaderCallbacks;
    r && (n.loaderCallbacks = r.filter((a) => a.id !== t));
  });
}
function ei(e) {
  e.pendingCallbacksFlag || (e.pendingCallbacksFlag = !0, setTimeout(() => {
    e.pendingCallbacksFlag = !1;
    const t = e.loaderCallbacks ? e.loaderCallbacks.slice(0) : [];
    if (!t.length)
      return;
    let n = !1;
    const r = e.provider, a = e.prefix;
    t.forEach((i) => {
      const s = i.icons, o = s.pending.length;
      s.pending = s.pending.filter((c) => {
        if (c.prefix !== a)
          return !0;
        const l = c.name;
        if (e.icons[l])
          s.loaded.push({
            provider: r,
            prefix: a,
            name: l
          });
        else if (e.missing.has(l))
          s.missing.push({
            provider: r,
            prefix: a,
            name: l
          });
        else
          return n = !0, !0;
        return !1;
      }), s.pending.length !== o && (n || $r([e], i.id), i.callback(
        s.loaded.slice(0),
        s.missing.slice(0),
        s.pending.slice(0),
        i.abort
      ));
    });
  }));
}
let ti = 0;
function ni(e, t, n) {
  const r = ti++, a = $r.bind(null, n, r);
  if (!t.pending.length)
    return a;
  const i = {
    id: r,
    icons: t,
    callback: e,
    abort: a
  };
  return n.forEach((s) => {
    (s.loaderCallbacks || (s.loaderCallbacks = [])).push(i);
  }), a;
}
function ri(e, t = !0, n = !1) {
  const r = [];
  return e.forEach((a) => {
    const i = typeof a == "string" ? it(a, t, n) : a;
    i && r.push(i);
  }), r;
}
var ai = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: !1,
  dataAfterTimeout: !1
};
function ii(e, t, n, r) {
  const a = e.resources.length, i = e.random ? Math.floor(Math.random() * a) : e.index;
  let s;
  if (e.random) {
    let T = e.resources.slice(0);
    for (s = []; T.length > 1; ) {
      const k = Math.floor(Math.random() * T.length);
      s.push(T[k]), T = T.slice(0, k).concat(T.slice(k + 1));
    }
    s = s.concat(T);
  } else
    s = e.resources.slice(i).concat(e.resources.slice(0, i));
  const o = Date.now();
  let c = "pending", l = 0, u, d = null, g = [], f = [];
  typeof r == "function" && f.push(r);
  function p() {
    d && (clearTimeout(d), d = null);
  }
  function _() {
    c === "pending" && (c = "aborted"), p(), g.forEach((T) => {
      T.status === "pending" && (T.status = "aborted");
    }), g = [];
  }
  function b(T, k) {
    k && (f = []), typeof T == "function" && f.push(T);
  }
  function E() {
    return {
      startTime: o,
      payload: t,
      status: c,
      queriesSent: l,
      queriesPending: g.length,
      subscribe: b,
      abort: _
    };
  }
  function N() {
    c = "failed", f.forEach((T) => {
      T(void 0, u);
    });
  }
  function w() {
    g.forEach((T) => {
      T.status === "pending" && (T.status = "aborted");
    }), g = [];
  }
  function O(T, k, v) {
    const C = k !== "success";
    switch (g = g.filter((U) => U !== T), c) {
      case "pending":
        break;
      case "failed":
        if (C || !e.dataAfterTimeout)
          return;
        break;
      default:
        return;
    }
    if (k === "abort") {
      u = v, N();
      return;
    }
    if (C) {
      u = v, g.length || (s.length ? R() : N());
      return;
    }
    if (p(), w(), !e.random) {
      const U = e.resources.indexOf(T.resource);
      U !== -1 && U !== e.index && (e.index = U);
    }
    c = "completed", f.forEach((U) => {
      U(v);
    });
  }
  function R() {
    if (c !== "pending")
      return;
    p();
    const T = s.shift();
    if (T === void 0) {
      if (g.length) {
        d = setTimeout(() => {
          p(), c === "pending" && (w(), N());
        }, e.timeout);
        return;
      }
      N();
      return;
    }
    const k = {
      status: "pending",
      resource: T,
      callback: (v, C) => {
        O(k, v, C);
      }
    };
    g.push(k), l++, d = setTimeout(R, e.rotate), n(T, t, k.callback);
  }
  return setTimeout(R), E;
}
function zr(e) {
  const t = {
    ...ai,
    ...e
  };
  let n = [];
  function r() {
    n = n.filter((o) => o().status === "pending");
  }
  function a(o, c, l) {
    const u = ii(
      t,
      o,
      c,
      (d, g) => {
        r(), l && l(d, g);
      }
    );
    return n.push(u), u;
  }
  function i(o) {
    return n.find((c) => o(c)) || null;
  }
  return {
    query: a,
    find: i,
    setIndex: (o) => {
      t.index = o;
    },
    getIndex: () => t.index,
    cleanup: r
  };
}
function Tn() {
}
const bt = /* @__PURE__ */ Object.create(null);
function si(e) {
  if (!bt[e]) {
    const t = gn(e);
    if (!t)
      return;
    const n = zr(t), r = {
      config: t,
      redundancy: n
    };
    bt[e] = r;
  }
  return bt[e];
}
function oi(e, t, n) {
  let r, a;
  if (typeof e == "string") {
    const i = rn(e);
    if (!i)
      return n(void 0, 424), Tn;
    a = i.send;
    const s = si(e);
    s && (r = s.redundancy);
  } else {
    const i = un(e);
    if (i) {
      r = zr(i);
      const s = e.resources ? e.resources[0] : "", o = rn(s);
      o && (a = o.send);
    }
  }
  return !r || !a ? (n(void 0, 424), Tn) : r.query(t, a, n)().abort;
}
const On = "iconify2", $e = "iconify", qr = $e + "-count", Mn = $e + "-version", Kr = 36e5, ci = 168, li = 50;
function an(e, t) {
  try {
    return e.getItem(t);
  } catch {
  }
}
function fn(e, t, n) {
  try {
    return e.setItem(t, n), !0;
  } catch {
  }
}
function Rn(e, t) {
  try {
    e.removeItem(t);
  } catch {
  }
}
function sn(e, t) {
  return fn(e, qr, t.toString());
}
function on(e) {
  return parseInt(an(e, qr)) || 0;
}
const ot = {
  local: !0,
  session: !0
}, Hr = {
  local: /* @__PURE__ */ new Set(),
  session: /* @__PURE__ */ new Set()
};
let bn = !1;
function ui(e) {
  bn = e;
}
let Ve = typeof window > "u" ? {} : window;
function Gr(e) {
  const t = e + "Storage";
  try {
    if (Ve && Ve[t] && typeof Ve[t].length == "number")
      return Ve[t];
  } catch {
  }
  ot[e] = !1;
}
function Wr(e, t) {
  const n = Gr(e);
  if (!n)
    return;
  const r = an(n, Mn);
  if (r !== On) {
    if (r) {
      const o = on(n);
      for (let c = 0; c < o; c++)
        Rn(n, $e + c.toString());
    }
    fn(n, Mn, On), sn(n, 0);
    return;
  }
  const a = Math.floor(Date.now() / Kr) - ci, i = (o) => {
    const c = $e + o.toString(), l = an(n, c);
    if (typeof l == "string") {
      try {
        const u = JSON.parse(l);
        if (typeof u == "object" && typeof u.cached == "number" && u.cached > a && typeof u.provider == "string" && typeof u.data == "object" && typeof u.data.prefix == "string" && // Valid item: run callback
        t(u, o))
          return !0;
      } catch {
      }
      Rn(n, c);
    }
  };
  let s = on(n);
  for (let o = s - 1; o >= 0; o--)
    i(o) || (o === s - 1 ? (s--, sn(n, s)) : Hr[e].add(o));
}
function Yr() {
  if (!bn) {
    ui(!0);
    for (const e in ot)
      Wr(e, (t) => {
        const n = t.data, r = t.provider, a = n.prefix, i = ve(
          r,
          a
        );
        if (!ln(i, n).length)
          return !1;
        const s = n.lastModified || -1;
        return i.lastModifiedCached = i.lastModifiedCached ? Math.min(i.lastModifiedCached, s) : s, !0;
      });
  }
}
function di(e, t) {
  const n = e.lastModifiedCached;
  if (
    // Matches or newer
    n && n >= t
  )
    return n === t;
  if (e.lastModifiedCached = t, n)
    for (const r in ot)
      Wr(r, (a) => {
        const i = a.data;
        return a.provider !== e.provider || i.prefix !== e.prefix || i.lastModified === t;
      });
  return !0;
}
function gi(e, t) {
  bn || Yr();
  function n(r) {
    let a;
    if (!ot[r] || !(a = Gr(r)))
      return;
    const i = Hr[r];
    let s;
    if (i.size)
      i.delete(s = Array.from(i).shift());
    else if (s = on(a), s >= li || !sn(a, s + 1))
      return;
    const o = {
      cached: Math.floor(Date.now() / Kr),
      provider: e.provider,
      data: t
    };
    return fn(
      a,
      $e + s.toString(),
      JSON.stringify(o)
    );
  }
  t.lastModified && !di(e, t.lastModified) || Object.keys(t.icons).length && (t.not_found && (t = Object.assign({}, t), delete t.not_found), n("local") || n("session"));
}
function An() {
}
function fi(e) {
  e.iconsLoaderFlag || (e.iconsLoaderFlag = !0, setTimeout(() => {
    e.iconsLoaderFlag = !1, ei(e);
  }));
}
function bi(e, t) {
  e.iconsToLoad ? e.iconsToLoad = e.iconsToLoad.concat(t).sort() : e.iconsToLoad = t, e.iconsQueueFlag || (e.iconsQueueFlag = !0, setTimeout(() => {
    e.iconsQueueFlag = !1;
    const { provider: n, prefix: r } = e, a = e.iconsToLoad;
    delete e.iconsToLoad;
    let i;
    if (!a || !(i = rn(n)))
      return;
    i.prepare(n, r, a).forEach((o) => {
      oi(n, o, (c) => {
        if (typeof c != "object")
          o.icons.forEach((l) => {
            e.missing.add(l);
          });
        else
          try {
            const l = ln(
              e,
              c
            );
            if (!l.length)
              return;
            const u = e.pendingIcons;
            u && l.forEach((d) => {
              u.delete(d);
            }), gi(e, c);
          } catch (l) {
            console.error(l);
          }
        fi(e);
      });
    });
  }));
}
const mi = (e, t) => {
  const n = ri(e, !0, Br()), r = ja(n);
  if (!r.pending.length) {
    let c = !0;
    return t && setTimeout(() => {
      c && t(
        r.loaded,
        r.missing,
        r.pending,
        An
      );
    }), () => {
      c = !1;
    };
  }
  const a = /* @__PURE__ */ Object.create(null), i = [];
  let s, o;
  return r.pending.forEach((c) => {
    const { provider: l, prefix: u } = c;
    if (u === o && l === s)
      return;
    s = l, o = u, i.push(ve(l, u));
    const d = a[l] || (a[l] = /* @__PURE__ */ Object.create(null));
    d[u] || (d[u] = []);
  }), r.pending.forEach((c) => {
    const { provider: l, prefix: u, name: d } = c, g = ve(l, u), f = g.pendingIcons || (g.pendingIcons = /* @__PURE__ */ new Set());
    f.has(d) || (f.add(d), a[l][u].push(d));
  }), i.forEach((c) => {
    const { provider: l, prefix: u } = c;
    a[l][u].length && bi(c, a[l][u]);
  }), t ? ni(t, r, i) : An;
};
function pi(e, t) {
  const n = {
    ...e
  };
  for (const r in t) {
    const a = t[r], i = typeof a;
    r in Ur ? (a === null || a && (i === "string" || i === "number")) && (n[r] = a) : i === typeof n[r] && (n[r] = r === "rotate" ? a % 4 : a);
  }
  return n;
}
const _i = /[\s,]+/;
function hi(e, t) {
  t.split(_i).forEach((n) => {
    switch (n.trim()) {
      case "horizontal":
        e.hFlip = !0;
        break;
      case "vertical":
        e.vFlip = !0;
        break;
    }
  });
}
function Ei(e, t = 0) {
  const n = e.replace(/^-?[0-9.]*/, "");
  function r(a) {
    for (; a < 0; )
      a += 4;
    return a % 4;
  }
  if (n === "") {
    const a = parseInt(e);
    return isNaN(a) ? 0 : r(a);
  } else if (n !== e) {
    let a = 0;
    switch (n) {
      case "%":
        a = 25;
        break;
      case "deg":
        a = 90;
    }
    if (a) {
      let i = parseFloat(e.slice(0, e.length - n.length));
      return isNaN(i) ? 0 : (i = i / a, i % 1 === 0 ? r(i) : 0);
    }
  }
  return t;
}
function yi(e, t) {
  let n = e.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const r in t)
    n += " " + r + '="' + t[r] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + n + ">" + e + "</svg>";
}
function Ni(e) {
  return e.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function wi(e) {
  return "data:image/svg+xml," + Ni(e);
}
function vi(e) {
  return 'url("' + wi(e) + '")';
}
const kn = {
  ...Fr,
  inline: !1
}, Si = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  "aria-hidden": !0,
  role: "img"
}, Ti = {
  display: "inline-block"
}, cn = {
  backgroundColor: "currentColor"
}, Zr = {
  backgroundColor: "transparent"
}, In = {
  Image: "var(--svg)",
  Repeat: "no-repeat",
  Size: "100% 100%"
}, Cn = {
  webkitMask: cn,
  mask: cn,
  background: Zr
};
for (const e in Cn) {
  const t = Cn[e];
  for (const n in In)
    t[e + n] = In[n];
}
const et = {};
["horizontal", "vertical"].forEach((e) => {
  const t = e.slice(0, 1) + "Flip";
  et[e + "-flip"] = t, et[e.slice(0, 1) + "-flip"] = t, et[e + "Flip"] = t;
});
function xn(e) {
  return e + (e.match(/^[-0-9.]+$/) ? "px" : "");
}
const Dn = (e, t) => {
  const n = pi(kn, t), r = { ...Si }, a = t.mode || "svg", i = {}, s = t.style, o = typeof s == "object" && !(s instanceof Array) ? s : {};
  for (let _ in t) {
    const b = t[_];
    if (b !== void 0)
      switch (_) {
        case "icon":
        case "style":
        case "onLoad":
        case "mode":
          break;
        case "inline":
        case "hFlip":
        case "vFlip":
          n[_] = b === !0 || b === "true" || b === 1;
          break;
        case "flip":
          typeof b == "string" && hi(n, b);
          break;
        case "color":
          i.color = b;
          break;
        case "rotate":
          typeof b == "string" ? n[_] = Ei(b) : typeof b == "number" && (n[_] = b);
          break;
        case "ariaHidden":
        case "aria-hidden":
          b !== !0 && b !== "true" && delete r["aria-hidden"];
          break;
        default: {
          const E = et[_];
          E ? (b === !0 || b === "true" || b === 1) && (n[E] = !0) : kn[_] === void 0 && (r[_] = b);
        }
      }
  }
  const c = Fa(e, n), l = c.attributes;
  if (n.inline && (i.verticalAlign = "-0.125em"), a === "svg") {
    r.style = {
      ...i,
      ...o
    }, Object.assign(r, l);
    let _ = 0, b = t.id;
    return typeof b == "string" && (b = b.replace(/-/g, "_")), r.innerHTML = Ka(c.body, b ? () => b + "ID" + _++ : "iconifyVue"), tt("svg", r);
  }
  const { body: u, width: d, height: g } = e, f = a === "mask" || (a === "bg" ? !1 : u.indexOf("currentColor") !== -1), p = yi(u, {
    ...l,
    width: d + "",
    height: g + ""
  });
  return r.style = {
    ...i,
    "--svg": vi(p),
    width: xn(l.width),
    height: xn(l.height),
    ...Ti,
    ...f ? cn : Zr,
    ...o
  }, tt("span", r);
};
Br(!0);
Ha("", Ja);
if (typeof document < "u" && typeof window < "u") {
  Yr();
  const e = window;
  if (e.IconifyPreload !== void 0) {
    const t = e.IconifyPreload, n = "Invalid IconifyPreload syntax.";
    typeof t == "object" && t !== null && (t instanceof Array ? t : [t]).forEach((r) => {
      try {
        // Check if item is an object and not null/array
        (typeof r != "object" || r === null || r instanceof Array || // Check for 'icons' and 'prefix'
        typeof r.icons != "object" || typeof r.prefix != "string" || // Add icon set
        !Ca(r)) && console.error(n);
      } catch {
        console.error(n);
      }
    });
  }
  if (e.IconifyProviders !== void 0) {
    const t = e.IconifyProviders;
    if (typeof t == "object" && t !== null)
      for (let n in t) {
        const r = "IconifyProviders[" + n + "] is invalid.";
        try {
          const a = t[n];
          if (typeof a != "object" || !a || a.resources === void 0)
            continue;
          Ga(n, a) || console.error(r);
        } catch {
          console.error(r);
        }
      }
  }
}
const Oi = {
  ...st,
  body: ""
}, mt = Cr({
  // Do not inherit other attributes: it is handled by render()
  inheritAttrs: !1,
  // Set initial data
  data() {
    return {
      // Current icon name
      _name: "",
      // Loading
      _loadingIcon: null,
      // Mounted status
      iconMounted: !1,
      // Callback counter to trigger re-render
      counter: 0
    };
  },
  mounted() {
    this.iconMounted = !0;
  },
  unmounted() {
    this.abortLoading();
  },
  methods: {
    abortLoading() {
      this._loadingIcon && (this._loadingIcon.abort(), this._loadingIcon = null);
    },
    // Get data for icon to render or null
    getIcon(e, t) {
      if (typeof e == "object" && e !== null && typeof e.body == "string")
        return this._name = "", this.abortLoading(), {
          data: e
        };
      let n;
      if (typeof e != "string" || (n = it(e, !1, !0)) === null)
        return this.abortLoading(), null;
      const r = ka(n);
      if (!r)
        return (!this._loadingIcon || this._loadingIcon.name !== e) && (this.abortLoading(), this._name = "", r !== null && (this._loadingIcon = {
          name: e,
          abort: mi([n], () => {
            this.counter++;
          })
        })), null;
      this.abortLoading(), this._name !== e && (this._name = e, t && t(e));
      const a = ["iconify"];
      return n.prefix !== "" && a.push("iconify--" + n.prefix), n.provider !== "" && a.push("iconify--" + n.provider), { data: r, classes: a };
    }
  },
  // Render icon
  render() {
    this.counter;
    const e = this.$attrs, t = this.iconMounted || e.ssr ? this.getIcon(e.icon, e.onLoad) : null;
    if (!t)
      return Dn(Oi, e);
    let n = e;
    return t.classes && (n = {
      ...e,
      class: (typeof e.class == "string" ? e.class + " " : "") + t.classes.join(" ")
    }), Dn({
      ...st,
      ...t.data
    }, n);
  }
});
function ee(e) {
  const t = Object.prototype.toString.call(e);
  return e instanceof Date || typeof e == "object" && t === "[object Date]" ? new e.constructor(+e) : typeof e == "number" || t === "[object Number]" || typeof e == "string" || t === "[object String]" ? new Date(e) : /* @__PURE__ */ new Date(NaN);
}
function fe(e, t) {
  return e instanceof Date ? new e.constructor(t) : new Date(t);
}
function Ae(e, t) {
  const n = ee(e);
  return isNaN(t) ? fe(e, NaN) : (t && n.setDate(n.getDate() + t), n);
}
function Mi(e, t) {
  const n = ee(e);
  if (isNaN(t))
    return fe(e, NaN);
  if (!t)
    return n;
  const r = n.getDate(), a = fe(e, n.getTime());
  a.setMonth(n.getMonth() + t + 1, 0);
  const i = a.getDate();
  return r >= i ? a : (n.setFullYear(
    a.getFullYear(),
    a.getMonth(),
    r
  ), n);
}
const Vr = 6048e5, Ri = 864e5;
let Ai = {};
function ct() {
  return Ai;
}
function ze(e, t) {
  var o, c, l, u;
  const n = ct(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((c = (o = t == null ? void 0 : t.locale) == null ? void 0 : o.options) == null ? void 0 : c.weekStartsOn) ?? n.weekStartsOn ?? ((u = (l = n.locale) == null ? void 0 : l.options) == null ? void 0 : u.weekStartsOn) ?? 0, a = ee(e), i = a.getDay(), s = (i < r ? 7 : 0) + i - r;
  return a.setDate(a.getDate() - s), a.setHours(0, 0, 0, 0), a;
}
function rt(e) {
  return ze(e, { weekStartsOn: 1 });
}
function Xr(e) {
  const t = ee(e), n = t.getFullYear(), r = fe(e, 0);
  r.setFullYear(n + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const a = rt(r), i = fe(e, 0);
  i.setFullYear(n, 0, 4), i.setHours(0, 0, 0, 0);
  const s = rt(i);
  return t.getTime() >= a.getTime() ? n + 1 : t.getTime() >= s.getTime() ? n : n - 1;
}
function Ln(e) {
  const t = ee(e);
  return t.setHours(0, 0, 0, 0), t;
}
function Pn(e) {
  const t = ee(e), n = new Date(
    Date.UTC(
      t.getFullYear(),
      t.getMonth(),
      t.getDate(),
      t.getHours(),
      t.getMinutes(),
      t.getSeconds(),
      t.getMilliseconds()
    )
  );
  return n.setUTCFullYear(t.getFullYear()), +e - +n;
}
function Qr(e, t) {
  const n = Ln(e), r = Ln(t), a = +n - Pn(n), i = +r - Pn(r);
  return Math.round((a - i) / Ri);
}
function ki(e) {
  const t = Xr(e), n = fe(e, 0);
  return n.setFullYear(t, 0, 4), n.setHours(0, 0, 0, 0), rt(n);
}
function Ii(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function Ci(e) {
  if (!Ii(e) && typeof e != "number")
    return !1;
  const t = ee(e);
  return !isNaN(Number(t));
}
function xi(e) {
  const t = ee(e), n = t.getMonth();
  return t.setFullYear(t.getFullYear(), n + 1, 0), t.setHours(23, 59, 59, 999), t;
}
function Bn(e, t) {
  const n = ee(e.start), r = ee(e.end);
  let a = +n > +r;
  const i = a ? +n : +r, s = a ? r : n;
  s.setHours(0, 0, 0, 0);
  let o = (t == null ? void 0 : t.step) ?? 1;
  if (!o)
    return [];
  o < 0 && (o = -o, a = !a);
  const c = [];
  for (; +s <= i; )
    c.push(ee(s)), s.setDate(s.getDate() + o), s.setHours(0, 0, 0, 0);
  return a ? c.reverse() : c;
}
function Di(e) {
  const t = ee(e), n = fe(e, 0);
  return n.setFullYear(t.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
const Li = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
}, Pi = (e, t, n) => {
  let r;
  const a = Li[e];
  return typeof a == "string" ? r = a : t === 1 ? r = a.one : r = a.other.replace("{{count}}", t.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function pt(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const Bi = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, Ui = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Fi = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, $i = {
  date: pt({
    formats: Bi,
    defaultWidth: "full"
  }),
  time: pt({
    formats: Ui,
    defaultWidth: "full"
  }),
  dateTime: pt({
    formats: Fi,
    defaultWidth: "full"
  })
}, zi = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, qi = (e, t, n, r) => zi[e];
function Pe(e) {
  return (t, n) => {
    const r = n != null && n.context ? String(n.context) : "standalone";
    let a;
    if (r === "formatting" && e.formattingValues) {
      const s = e.defaultFormattingWidth || e.defaultWidth, o = n != null && n.width ? String(n.width) : s;
      a = e.formattingValues[o] || e.formattingValues[s];
    } else {
      const s = e.defaultWidth, o = n != null && n.width ? String(n.width) : e.defaultWidth;
      a = e.values[o] || e.values[s];
    }
    const i = e.argumentCallback ? e.argumentCallback(t) : t;
    return a[i];
  };
}
const Ki = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, Hi = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, Gi = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
}, Wi = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
}, Yi = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
}, Zi = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
}, Vi = (e, t) => {
  const n = Number(e), r = n % 100;
  if (r > 20 || r < 10)
    switch (r % 10) {
      case 1:
        return n + "st";
      case 2:
        return n + "nd";
      case 3:
        return n + "rd";
    }
  return n + "th";
}, Xi = {
  ordinalNumber: Vi,
  era: Pe({
    values: Ki,
    defaultWidth: "wide"
  }),
  quarter: Pe({
    values: Hi,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Pe({
    values: Gi,
    defaultWidth: "wide"
  }),
  day: Pe({
    values: Wi,
    defaultWidth: "wide"
  }),
  dayPeriod: Pe({
    values: Yi,
    defaultWidth: "wide",
    formattingValues: Zi,
    defaultFormattingWidth: "wide"
  })
};
function Be(e) {
  return (t, n = {}) => {
    const r = n.width, a = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], i = t.match(a);
    if (!i)
      return null;
    const s = i[0], o = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(o) ? Ji(o, (d) => d.test(s)) : (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      Qi(o, (d) => d.test(s))
    );
    let l;
    l = e.valueCallback ? e.valueCallback(c) : c, l = n.valueCallback ? (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      n.valueCallback(l)
    ) : l;
    const u = t.slice(s.length);
    return { value: l, rest: u };
  };
}
function Qi(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function Ji(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function ji(e) {
  return (t, n = {}) => {
    const r = t.match(e.matchPattern);
    if (!r)
      return null;
    const a = r[0], i = t.match(e.parsePattern);
    if (!i)
      return null;
    let s = e.valueCallback ? e.valueCallback(i[0]) : i[0];
    s = n.valueCallback ? n.valueCallback(s) : s;
    const o = t.slice(a.length);
    return { value: s, rest: o };
  };
}
const es = /^(\d+)(th|st|nd|rd)?/i, ts = /\d+/i, ns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, rs = {
  any: [/^b/i, /^(a|c)/i]
}, as = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, is = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, ss = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, os = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
}, cs = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, ls = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, us = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, ds = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
}, gs = {
  ordinalNumber: ji({
    matchPattern: es,
    parsePattern: ts,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: Be({
    matchPatterns: ns,
    defaultMatchWidth: "wide",
    parsePatterns: rs,
    defaultParseWidth: "any"
  }),
  quarter: Be({
    matchPatterns: as,
    defaultMatchWidth: "wide",
    parsePatterns: is,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: Be({
    matchPatterns: ss,
    defaultMatchWidth: "wide",
    parsePatterns: os,
    defaultParseWidth: "any"
  }),
  day: Be({
    matchPatterns: cs,
    defaultMatchWidth: "wide",
    parsePatterns: ls,
    defaultParseWidth: "any"
  }),
  dayPeriod: Be({
    matchPatterns: us,
    defaultMatchWidth: "any",
    parsePatterns: ds,
    defaultParseWidth: "any"
  })
}, fs = {
  code: "en-US",
  formatDistance: Pi,
  formatLong: $i,
  formatRelative: qi,
  localize: Xi,
  match: gs,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function bs(e) {
  const t = ee(e);
  return Qr(t, Di(t)) + 1;
}
function ms(e) {
  const t = ee(e), n = +rt(t) - +ki(t);
  return Math.round(n / Vr) + 1;
}
function Jr(e, t) {
  var u, d, g, f;
  const n = ee(e), r = n.getFullYear(), a = ct(), i = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((d = (u = t == null ? void 0 : t.locale) == null ? void 0 : u.options) == null ? void 0 : d.firstWeekContainsDate) ?? a.firstWeekContainsDate ?? ((f = (g = a.locale) == null ? void 0 : g.options) == null ? void 0 : f.firstWeekContainsDate) ?? 1, s = fe(e, 0);
  s.setFullYear(r + 1, 0, i), s.setHours(0, 0, 0, 0);
  const o = ze(s, t), c = fe(e, 0);
  c.setFullYear(r, 0, i), c.setHours(0, 0, 0, 0);
  const l = ze(c, t);
  return n.getTime() >= o.getTime() ? r + 1 : n.getTime() >= l.getTime() ? r : r - 1;
}
function ps(e, t) {
  var o, c, l, u;
  const n = ct(), r = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((c = (o = t == null ? void 0 : t.locale) == null ? void 0 : o.options) == null ? void 0 : c.firstWeekContainsDate) ?? n.firstWeekContainsDate ?? ((u = (l = n.locale) == null ? void 0 : l.options) == null ? void 0 : u.firstWeekContainsDate) ?? 1, a = Jr(e, t), i = fe(e, 0);
  return i.setFullYear(a, 0, r), i.setHours(0, 0, 0, 0), ze(i, t);
}
function _s(e, t) {
  const n = ee(e), r = +ze(n, t) - +ps(n, t);
  return Math.round(r / Vr) + 1;
}
function P(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const pe = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), r = n > 0 ? n : 1 - n;
    return P(t === "yy" ? r % 100 : r, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : P(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return P(e.getDate(), t.length);
  },
  // AM or PM
  a(e, t) {
    const n = e.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return n.toUpperCase();
      case "aaa":
        return n;
      case "aaaaa":
        return n[0];
      case "aaaa":
      default:
        return n === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(e, t) {
    return P(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return P(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return P(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return P(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, r = e.getMilliseconds(), a = Math.trunc(
      r * Math.pow(10, n - 3)
    );
    return P(a, t.length);
  }
}, ke = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, Un = {
  // Era
  G: function(e, t, n) {
    const r = e.getFullYear() > 0 ? 1 : 0;
    switch (t) {
      case "G":
      case "GG":
      case "GGG":
        return n.era(r, { width: "abbreviated" });
      case "GGGGG":
        return n.era(r, { width: "narrow" });
      case "GGGG":
      default:
        return n.era(r, { width: "wide" });
    }
  },
  // Year
  y: function(e, t, n) {
    if (t === "yo") {
      const r = e.getFullYear(), a = r > 0 ? r : 1 - r;
      return n.ordinalNumber(a, { unit: "year" });
    }
    return pe.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const a = Jr(e, r), i = a > 0 ? a : 1 - a;
    if (t === "YY") {
      const s = i % 100;
      return P(s, 2);
    }
    return t === "Yo" ? n.ordinalNumber(i, { unit: "year" }) : P(i, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = Xr(e);
    return P(n, t.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(e, t) {
    const n = e.getFullYear();
    return P(n, t.length);
  },
  // Quarter
  Q: function(e, t, n) {
    const r = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      case "Q":
        return String(r);
      case "QQ":
        return P(r, 2);
      case "Qo":
        return n.ordinalNumber(r, { unit: "quarter" });
      case "QQQ":
        return n.quarter(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return n.quarter(r, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return n.quarter(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(e, t, n) {
    const r = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      case "q":
        return String(r);
      case "qq":
        return P(r, 2);
      case "qo":
        return n.ordinalNumber(r, { unit: "quarter" });
      case "qqq":
        return n.quarter(r, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return n.quarter(r, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return n.quarter(r, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(e, t, n) {
    const r = e.getMonth();
    switch (t) {
      case "M":
      case "MM":
        return pe.M(e, t);
      case "Mo":
        return n.ordinalNumber(r + 1, { unit: "month" });
      case "MMM":
        return n.month(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return n.month(r, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return n.month(r, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(e, t, n) {
    const r = e.getMonth();
    switch (t) {
      case "L":
        return String(r + 1);
      case "LL":
        return P(r + 1, 2);
      case "Lo":
        return n.ordinalNumber(r + 1, { unit: "month" });
      case "LLL":
        return n.month(r, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return n.month(r, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return n.month(r, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(e, t, n, r) {
    const a = _s(e, r);
    return t === "wo" ? n.ordinalNumber(a, { unit: "week" }) : P(a, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = ms(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : P(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : pe.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = bs(e);
    return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : P(r, t.length);
  },
  // Day of week
  E: function(e, t, n) {
    const r = e.getDay();
    switch (t) {
      case "E":
      case "EE":
      case "EEE":
        return n.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return n.day(r, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return n.day(r, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return n.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(e, t, n, r) {
    const a = e.getDay(), i = (a - r.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      case "e":
        return String(i);
      case "ee":
        return P(i, 2);
      case "eo":
        return n.ordinalNumber(i, { unit: "day" });
      case "eee":
        return n.day(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "eeeee":
        return n.day(a, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return n.day(a, {
          width: "short",
          context: "formatting"
        });
      case "eeee":
      default:
        return n.day(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(e, t, n, r) {
    const a = e.getDay(), i = (a - r.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      case "c":
        return String(i);
      case "cc":
        return P(i, t.length);
      case "co":
        return n.ordinalNumber(i, { unit: "day" });
      case "ccc":
        return n.day(a, {
          width: "abbreviated",
          context: "standalone"
        });
      case "ccccc":
        return n.day(a, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return n.day(a, {
          width: "short",
          context: "standalone"
        });
      case "cccc":
      default:
        return n.day(a, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(e, t, n) {
    const r = e.getDay(), a = r === 0 ? 7 : r;
    switch (t) {
      case "i":
        return String(a);
      case "ii":
        return P(a, t.length);
      case "io":
        return n.ordinalNumber(a, { unit: "day" });
      case "iii":
        return n.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return n.day(r, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return n.day(r, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return n.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(e, t, n) {
    const a = e.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return n.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return n.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return n.dayPeriod(a, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return n.dayPeriod(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(e, t, n) {
    const r = e.getHours();
    let a;
    switch (r === 12 ? a = ke.noon : r === 0 ? a = ke.midnight : a = r / 12 >= 1 ? "pm" : "am", t) {
      case "b":
      case "bb":
        return n.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return n.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return n.dayPeriod(a, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return n.dayPeriod(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(e, t, n) {
    const r = e.getHours();
    let a;
    switch (r >= 17 ? a = ke.evening : r >= 12 ? a = ke.afternoon : r >= 4 ? a = ke.morning : a = ke.night, t) {
      case "B":
      case "BB":
      case "BBB":
        return n.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return n.dayPeriod(a, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return n.dayPeriod(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(e, t, n) {
    if (t === "ho") {
      let r = e.getHours() % 12;
      return r === 0 && (r = 12), n.ordinalNumber(r, { unit: "hour" });
    }
    return pe.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : pe.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, n) {
    const r = e.getHours() % 12;
    return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : P(r, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let r = e.getHours();
    return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : P(r, t.length);
  },
  // Minute
  m: function(e, t, n) {
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : pe.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : pe.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return pe.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const r = e.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (t) {
      case "X":
        return $n(r);
      case "XXXX":
      case "XX":
        return Ne(r);
      case "XXXXX":
      case "XXX":
      default:
        return Ne(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      case "x":
        return $n(r);
      case "xxxx":
      case "xx":
        return Ne(r);
      case "xxxxx":
      case "xxx":
      default:
        return Ne(r, ":");
    }
  },
  // Timezone (GMT)
  O: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + Fn(r, ":");
      case "OOOO":
      default:
        return "GMT" + Ne(r, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + Fn(r, ":");
      case "zzzz":
      default:
        return "GMT" + Ne(r, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const r = Math.trunc(e.getTime() / 1e3);
    return P(r, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    const r = e.getTime();
    return P(r, t.length);
  }
};
function Fn(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), a = Math.trunc(r / 60), i = r % 60;
  return i === 0 ? n + String(a) : n + String(a) + t + P(i, 2);
}
function $n(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + P(Math.abs(e) / 60, 2) : Ne(e, t);
}
function Ne(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), a = P(Math.trunc(r / 60), 2), i = P(r % 60, 2);
  return n + a + t + i;
}
const zn = (e, t) => {
  switch (e) {
    case "P":
      return t.date({ width: "short" });
    case "PP":
      return t.date({ width: "medium" });
    case "PPP":
      return t.date({ width: "long" });
    case "PPPP":
    default:
      return t.date({ width: "full" });
  }
}, jr = (e, t) => {
  switch (e) {
    case "p":
      return t.time({ width: "short" });
    case "pp":
      return t.time({ width: "medium" });
    case "ppp":
      return t.time({ width: "long" });
    case "pppp":
    default:
      return t.time({ width: "full" });
  }
}, hs = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], a = n[2];
  if (!a)
    return zn(e, t);
  let i;
  switch (r) {
    case "P":
      i = t.dateTime({ width: "short" });
      break;
    case "PP":
      i = t.dateTime({ width: "medium" });
      break;
    case "PPP":
      i = t.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      i = t.dateTime({ width: "full" });
      break;
  }
  return i.replace("{{date}}", zn(r, t)).replace("{{time}}", jr(a, t));
}, Es = {
  p: jr,
  P: hs
}, ys = /^D+$/, Ns = /^Y+$/, ws = ["D", "DD", "YY", "YYYY"];
function vs(e) {
  return ys.test(e);
}
function Ss(e) {
  return Ns.test(e);
}
function Ts(e, t, n) {
  const r = Os(e, t, n);
  if (console.warn(r), ws.includes(e))
    throw new RangeError(r);
}
function Os(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Ms = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Rs = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, As = /^'([^]*?)'?$/, ks = /''/g, Is = /[a-zA-Z]/;
function Xe(e, t, n) {
  var u, d, g, f, p, _, b, E;
  const r = ct(), a = (n == null ? void 0 : n.locale) ?? r.locale ?? fs, i = (n == null ? void 0 : n.firstWeekContainsDate) ?? ((d = (u = n == null ? void 0 : n.locale) == null ? void 0 : u.options) == null ? void 0 : d.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((f = (g = r.locale) == null ? void 0 : g.options) == null ? void 0 : f.firstWeekContainsDate) ?? 1, s = (n == null ? void 0 : n.weekStartsOn) ?? ((_ = (p = n == null ? void 0 : n.locale) == null ? void 0 : p.options) == null ? void 0 : _.weekStartsOn) ?? r.weekStartsOn ?? ((E = (b = r.locale) == null ? void 0 : b.options) == null ? void 0 : E.weekStartsOn) ?? 0, o = ee(e);
  if (!Ci(o))
    throw new RangeError("Invalid time value");
  let c = t.match(Rs).map((N) => {
    const w = N[0];
    if (w === "p" || w === "P") {
      const O = Es[w];
      return O(N, a.formatLong);
    }
    return N;
  }).join("").match(Ms).map((N) => {
    if (N === "''")
      return { isToken: !1, value: "'" };
    const w = N[0];
    if (w === "'")
      return { isToken: !1, value: Cs(N) };
    if (Un[w])
      return { isToken: !0, value: N };
    if (w.match(Is))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + w + "`"
      );
    return { isToken: !1, value: N };
  });
  a.localize.preprocessor && (c = a.localize.preprocessor(o, c));
  const l = {
    firstWeekContainsDate: i,
    weekStartsOn: s,
    locale: a
  };
  return c.map((N) => {
    if (!N.isToken)
      return N.value;
    const w = N.value;
    (!(n != null && n.useAdditionalWeekYearTokens) && Ss(w) || !(n != null && n.useAdditionalDayOfYearTokens) && vs(w)) && Ts(w, t, String(e));
    const O = Un[w[0]];
    return O(o, w, a.localize, l);
  }).join("");
}
function Cs(e) {
  const t = e.match(As);
  return t ? t[1].replace(ks, "'") : e;
}
const Se = (e) => (Ea("data-v-6413ee29"), e = e(), ya(), e), xs = /* @__PURE__ */ Se(() => /* @__PURE__ */ j("h1", null, "Components", -1)), Ds = { class: "wrapper" }, Ls = /* @__PURE__ */ Se(() => /* @__PURE__ */ j("h2", { class: "w-full" }, "Selected Dates", -1)), Ps = { class: "wrapper" }, Bs = /* @__PURE__ */ Se(() => /* @__PURE__ */ j("h2", { class: "w-full" }, "Translation with slots", -1)), Us = { class: "wrapper" }, Fs = /* @__PURE__ */ Se(() => /* @__PURE__ */ j("h2", { class: "w-full" }, "Busy Dates (check out first disabled date = ALLOWED)", -1)), $s = { class: "wrapper" }, zs = /* @__PURE__ */ Se(() => /* @__PURE__ */ j("h2", { class: "w-full" }, "Busy Dates (check out first disabled date = FORBIDDEN)", -1)), qs = { class: "wrapper" }, Ks = /* @__PURE__ */ Se(() => /* @__PURE__ */ j("h2", { class: "w-full" }, "Single month breakpoint", -1)), Hs = { class: "wrapper" }, Gs = /* @__PURE__ */ Se(() => /* @__PURE__ */ j("h2", { class: "w-full" }, "Next/prev/day/popup slots", -1)), Ws = { class: "calendar_day" }, Ys = { class: "control_btn" }, Zs = { class: "control_btn" }, Vs = { class: "popup_container" }, Xs = "", Qs = `<template>
      <Vue3HotelDatePicker
          :start-date="selectedDates[0]"
          :end-date="selectedDates[1]"
          :single-month-breakpoint="768"
          enable-checkout
      >
        <template v-slot:day="{ day }">
          <div class="calendar_day">
            {{day.day}}
            <span
                v-if="day.isValid && !day.disabled"
                :class="prices[day.day] < 85 ? 'text-green' : 'text-red'"
                class="text-small"
            >{{ prices[day.day] }}$</span>
          </div>
        </template>
        <template #next>
          <div class="control_btn">
            <Icon icon="octicon:arrow-right-16"/>
          </div>
        </template>
        <template #prev>
          <div class="control_btn">
            <Icon icon="octicon:arrow-left-16"/>
          </div>
        </template>
        <template v-slot:popup="{ nights }">
          <div class="popup_container">
            <Icon icon="material-symbols:mode-night-outline"/>
            {{nights}}
          </div>
        </template>
      </Vue3HotelDatePicker>
</template>`, Js = {
  __name: "App",
  setup(e) {
    const t = () => {
      let i = /* @__PURE__ */ new Date(), s = xi(/* @__PURE__ */ new Date());
      Qr(s, i) < 17 && (i = new Date(Mi(i, 1).setDate(1)));
      let c = Ae(i, 5), l = Ae(i, 10), u = Ae(i, 13), d = Ae(i, 15), g = Bn({ start: c, end: l }).map((p) => Xe(p, "yyyy-MM-dd")), f = Bn({ start: u, end: d }).map((p) => Xe(p, "yyyy-MM-dd"));
      return [...g, ...f];
    }, n = [
      Xe(Ae(/* @__PURE__ */ new Date(), 1), "yyyy-MM-dd"),
      Xe(Ae(/* @__PURE__ */ new Date(), 6), "yyyy-MM-dd")
    ], r = {
      calendar: {
        months: {
          January: "Enero",
          February: "Febrero",
          March: "Marzo",
          April: "Abril",
          May: "Mayo",
          June: "Junio",
          July: "Julio",
          August: "Agosto",
          September: "Septiembre",
          October: "Octubre",
          November: "Noviembre",
          December: "Diciembre"
        },
        weekdays: {
          sun: "Dom",
          mon: "Lun",
          tue: "Mar",
          wed: "Mié",
          thu: "Jue",
          fri: "Vie",
          sat: "Sáb"
        },
        nights: (i) => i === 0 ? "Selecciona otro día'" : i === 1 ? "1 noche" : `${i} noches`
      }
    }, a = [
      ...Array.from({ length: 70 }, (i, s) => s + 1).map((i) => Math.floor(Math.random() * 20 + 80))
    ];
    return xr("en"), (i, s) => {
      const o = pa("highlightjs");
      return En(), yn("div", null, [
        xs,
        j("div", Ds, [
          Ls,
          ge(Re, {
            "start-date": n[0],
            "end-date": n[1],
            "single-month-breakpoint": 768,
            "enable-checkout": ""
          }, null, 8, ["start-date", "end-date"])
        ]),
        j("div", Ps, [
          Bs,
          ge(Re, {
            "start-date": n[0],
            "end-date": n[1],
            "single-month-breakpoint": 768,
            "enable-checkout": ""
          }, {
            popup: Ee(({ nights: c }) => [
              De(ye(r.calendar.nights(c)), 1)
            ]),
            month: Ee(({ month: c }) => [
              De(ye(r.calendar.months[c.name]) + " " + ye(c.year), 1)
            ]),
            weekday: Ee(({ weekday: c }) => [
              De(ye(r.calendar.weekdays[c]), 1)
            ]),
            _: 1
          }, 8, ["start-date", "end-date"])
        ]),
        j("div", Us, [
          Fs,
          ge(Re, {
            "single-month-breakpoint": 768,
            "disabled-dates": t(),
            "enable-checkout": ""
          }, null, 8, ["disabled-dates"])
        ]),
        j("div", $s, [
          zs,
          ge(Re, {
            "single-month-breakpoint": 768,
            "disabled-dates": t()
          }, null, 8, ["disabled-dates"])
        ]),
        j("div", qs, [
          Ks,
          ge(Re, { "single-month-breakpoint": 768 })
        ]),
        j("div", Hs, [
          Gs,
          ge(Re, {
            "start-date": n[0],
            "end-date": n[1],
            "single-month-breakpoint": 768,
            "enable-checkout": ""
          }, {
            day: Ee(({ day: c }) => [
              j("div", Ws, [
                De(ye(c.day) + " ", 1),
                c.isValid && !c.disabled ? (En(), yn("span", {
                  key: 0,
                  class: _a([a[c.day] < 85 ? "text-green" : "text-red", "text-small"])
                }, ye(a[c.day]) + "$", 3)) : ha("", !0)
              ])
            ]),
            next: Ee(() => [
              j("div", Ys, [
                ge(gt(mt), { icon: "octicon:arrow-right-16" })
              ])
            ]),
            prev: Ee(() => [
              j("div", Zs, [
                ge(gt(mt), { icon: "octicon:arrow-left-16" })
              ])
            ]),
            popup: Ee(({ nights: c }) => [
              j("div", Vs, [
                ge(gt(mt), { icon: "material-symbols:mode-night-outline" }),
                De(" " + ye(c), 1)
              ])
            ]),
            _: 1
          }, 8, ["start-date", "end-date"]),
          ge(o, {
            class: "code_block",
            language: "js",
            code: Xs
          }),
          ge(o, {
            class: "code_block",
            language: "js",
            code: Qs
          })
        ])
      ]);
    };
  }
}, js = /* @__PURE__ */ va(Js, [["__scopeId", "data-v-6413ee29"]]);
function eo(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function ea(e) {
  return e instanceof Map ? e.clear = e.delete = e.set = function() {
    throw new Error("map is read-only");
  } : e instanceof Set && (e.add = e.clear = e.delete = function() {
    throw new Error("set is read-only");
  }), Object.freeze(e), Object.getOwnPropertyNames(e).forEach((t) => {
    const n = e[t], r = typeof n;
    (r === "object" || r === "function") && !Object.isFrozen(n) && ea(n);
  }), e;
}
class qn {
  /**
   * @param {CompiledMode} mode
   */
  constructor(t) {
    t.data === void 0 && (t.data = {}), this.data = t.data, this.isMatchIgnored = !1;
  }
  ignoreMatch() {
    this.isMatchIgnored = !0;
  }
}
function ta(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
}
function _e(e, ...t) {
  const n = /* @__PURE__ */ Object.create(null);
  for (const r in e)
    n[r] = e[r];
  return t.forEach(function(r) {
    for (const a in r)
      n[a] = r[a];
  }), /** @type {T} */
  n;
}
const to = "</span>", Kn = (e) => !!e.scope, no = (e, { prefix: t }) => {
  if (e.startsWith("language:"))
    return e.replace("language:", "language-");
  if (e.includes(".")) {
    const n = e.split(".");
    return [
      `${t}${n.shift()}`,
      ...n.map((r, a) => `${r}${"_".repeat(a + 1)}`)
    ].join(" ");
  }
  return `${t}${e}`;
};
class ro {
  /**
   * Creates a new HTMLRenderer
   *
   * @param {Tree} parseTree - the parse tree (must support `walk` API)
   * @param {{classPrefix: string}} options
   */
  constructor(t, n) {
    this.buffer = "", this.classPrefix = n.classPrefix, t.walk(this);
  }
  /**
   * Adds texts to the output stream
   *
   * @param {string} text */
  addText(t) {
    this.buffer += ta(t);
  }
  /**
   * Adds a node open to the output stream (if needed)
   *
   * @param {Node} node */
  openNode(t) {
    if (!Kn(t))
      return;
    const n = no(
      t.scope,
      { prefix: this.classPrefix }
    );
    this.span(n);
  }
  /**
   * Adds a node close to the output stream (if needed)
   *
   * @param {Node} node */
  closeNode(t) {
    Kn(t) && (this.buffer += to);
  }
  /**
   * returns the accumulated buffer
  */
  value() {
    return this.buffer;
  }
  // helpers
  /**
   * Builds a span element
   *
   * @param {string} className */
  span(t) {
    this.buffer += `<span class="${t}">`;
  }
}
const Hn = (e = {}) => {
  const t = { children: [] };
  return Object.assign(t, e), t;
};
class mn {
  constructor() {
    this.rootNode = Hn(), this.stack = [this.rootNode];
  }
  get top() {
    return this.stack[this.stack.length - 1];
  }
  get root() {
    return this.rootNode;
  }
  /** @param {Node} node */
  add(t) {
    this.top.children.push(t);
  }
  /** @param {string} scope */
  openNode(t) {
    const n = Hn({ scope: t });
    this.add(n), this.stack.push(n);
  }
  closeNode() {
    if (this.stack.length > 1)
      return this.stack.pop();
  }
  closeAllNodes() {
    for (; this.closeNode(); )
      ;
  }
  toJSON() {
    return JSON.stringify(this.rootNode, null, 4);
  }
  /**
   * @typedef { import("./html_renderer").Renderer } Renderer
   * @param {Renderer} builder
   */
  walk(t) {
    return this.constructor._walk(t, this.rootNode);
  }
  /**
   * @param {Renderer} builder
   * @param {Node} node
   */
  static _walk(t, n) {
    return typeof n == "string" ? t.addText(n) : n.children && (t.openNode(n), n.children.forEach((r) => this._walk(t, r)), t.closeNode(n)), t;
  }
  /**
   * @param {Node} node
   */
  static _collapse(t) {
    typeof t != "string" && t.children && (t.children.every((n) => typeof n == "string") ? t.children = [t.children.join("")] : t.children.forEach((n) => {
      mn._collapse(n);
    }));
  }
}
class ao extends mn {
  /**
   * @param {*} options
   */
  constructor(t) {
    super(), this.options = t;
  }
  /**
   * @param {string} text
   */
  addText(t) {
    t !== "" && this.add(t);
  }
  /** @param {string} scope */
  startScope(t) {
    this.openNode(t);
  }
  endScope() {
    this.closeNode();
  }
  /**
   * @param {Emitter & {root: DataNode}} emitter
   * @param {string} name
   */
  __addSublanguage(t, n) {
    const r = t.root;
    n && (r.scope = `language:${n}`), this.add(r);
  }
  toHTML() {
    return new ro(this, this.options).value();
  }
  finalize() {
    return this.closeAllNodes(), !0;
  }
}
function qe(e) {
  return e ? typeof e == "string" ? e : e.source : null;
}
function na(e) {
  return Te("(?=", e, ")");
}
function io(e) {
  return Te("(?:", e, ")*");
}
function so(e) {
  return Te("(?:", e, ")?");
}
function Te(...e) {
  return e.map((n) => qe(n)).join("");
}
function oo(e) {
  const t = e[e.length - 1];
  return typeof t == "object" && t.constructor === Object ? (e.splice(e.length - 1, 1), t) : {};
}
function pn(...e) {
  return "(" + (oo(e).capture ? "" : "?:") + e.map((r) => qe(r)).join("|") + ")";
}
function ra(e) {
  return new RegExp(e.toString() + "|").exec("").length - 1;
}
function co(e, t) {
  const n = e && e.exec(t);
  return n && n.index === 0;
}
const lo = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
function _n(e, { joinWith: t }) {
  let n = 0;
  return e.map((r) => {
    n += 1;
    const a = n;
    let i = qe(r), s = "";
    for (; i.length > 0; ) {
      const o = lo.exec(i);
      if (!o) {
        s += i;
        break;
      }
      s += i.substring(0, o.index), i = i.substring(o.index + o[0].length), o[0][0] === "\\" && o[1] ? s += "\\" + String(Number(o[1]) + a) : (s += o[0], o[0] === "(" && n++);
    }
    return s;
  }).map((r) => `(${r})`).join(t);
}
const uo = /\b\B/, aa = "[a-zA-Z]\\w*", hn = "[a-zA-Z_]\\w*", ia = "\\b\\d+(\\.\\d+)?", sa = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", oa = "\\b(0b[01]+)", go = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", fo = (e = {}) => {
  const t = /^#![ ]*\//;
  return e.binary && (e.begin = Te(
    t,
    /.*\b/,
    e.binary,
    /\b.*/
  )), _e({
    scope: "meta",
    begin: t,
    end: /$/,
    relevance: 0,
    /** @type {ModeCallback} */
    "on:begin": (n, r) => {
      n.index !== 0 && r.ignoreMatch();
    }
  }, e);
}, Ke = {
  begin: "\\\\[\\s\\S]",
  relevance: 0
}, bo = {
  scope: "string",
  begin: "'",
  end: "'",
  illegal: "\\n",
  contains: [Ke]
}, mo = {
  scope: "string",
  begin: '"',
  end: '"',
  illegal: "\\n",
  contains: [Ke]
}, po = {
  begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
}, lt = function(e, t, n = {}) {
  const r = _e(
    {
      scope: "comment",
      begin: e,
      end: t,
      contains: []
    },
    n
  );
  r.contains.push({
    scope: "doctag",
    // hack to avoid the space from being included. the space is necessary to
    // match here to prevent the plain text rule below from gobbling up doctags
    begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
    end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
    excludeBegin: !0,
    relevance: 0
  });
  const a = pn(
    // list of common 1 and 2 letter words in English
    "I",
    "a",
    "is",
    "so",
    "us",
    "to",
    "at",
    "if",
    "in",
    "it",
    "on",
    // note: this is not an exhaustive list of contractions, just popular ones
    /[A-Za-z]+['](d|ve|re|ll|t|s|n)/,
    // contractions - can't we'd they're let's, etc
    /[A-Za-z]+[-][a-z]+/,
    // `no-way`, etc.
    /[A-Za-z][a-z]{2,}/
    // allow capitalized words at beginning of sentences
  );
  return r.contains.push(
    {
      // TODO: how to include ", (, ) without breaking grammars that use these for
      // comment delimiters?
      // begin: /[ ]+([()"]?([A-Za-z'-]{3,}|is|a|I|so|us|[tT][oO]|at|if|in|it|on)[.]?[()":]?([.][ ]|[ ]|\))){3}/
      // ---
      // this tries to find sequences of 3 english words in a row (without any
      // "programming" type syntax) this gives us a strong signal that we've
      // TRULY found a comment - vs perhaps scanning with the wrong language.
      // It's possible to find something that LOOKS like the start of the
      // comment - but then if there is no readable text - good chance it is a
      // false match and not a comment.
      //
      // for a visual example please see:
      // https://github.com/highlightjs/highlight.js/issues/2827
      begin: Te(
        /[ ]+/,
        // necessary to prevent us gobbling up doctags like /* @author Bob Mcgill */
        "(",
        a,
        /[.]?[:]?([.][ ]|[ ])/,
        "){3}"
      )
      // look for 3 words in a row
    }
  ), r;
}, _o = lt("//", "$"), ho = lt("/\\*", "\\*/"), Eo = lt("#", "$"), yo = {
  scope: "number",
  begin: ia,
  relevance: 0
}, No = {
  scope: "number",
  begin: sa,
  relevance: 0
}, wo = {
  scope: "number",
  begin: oa,
  relevance: 0
}, vo = {
  scope: "regexp",
  begin: /\/(?=[^/\n]*\/)/,
  end: /\/[gimuy]*/,
  contains: [
    Ke,
    {
      begin: /\[/,
      end: /\]/,
      relevance: 0,
      contains: [Ke]
    }
  ]
}, So = {
  scope: "title",
  begin: aa,
  relevance: 0
}, To = {
  scope: "title",
  begin: hn,
  relevance: 0
}, Oo = {
  // excludes method names from keyword processing
  begin: "\\.\\s*" + hn,
  relevance: 0
}, Mo = function(e) {
  return Object.assign(
    e,
    {
      /** @type {ModeCallback} */
      "on:begin": (t, n) => {
        n.data._beginMatch = t[1];
      },
      /** @type {ModeCallback} */
      "on:end": (t, n) => {
        n.data._beginMatch !== t[1] && n.ignoreMatch();
      }
    }
  );
};
var Qe = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  APOS_STRING_MODE: bo,
  BACKSLASH_ESCAPE: Ke,
  BINARY_NUMBER_MODE: wo,
  BINARY_NUMBER_RE: oa,
  COMMENT: lt,
  C_BLOCK_COMMENT_MODE: ho,
  C_LINE_COMMENT_MODE: _o,
  C_NUMBER_MODE: No,
  C_NUMBER_RE: sa,
  END_SAME_AS_BEGIN: Mo,
  HASH_COMMENT_MODE: Eo,
  IDENT_RE: aa,
  MATCH_NOTHING_RE: uo,
  METHOD_GUARD: Oo,
  NUMBER_MODE: yo,
  NUMBER_RE: ia,
  PHRASAL_WORDS_MODE: po,
  QUOTE_STRING_MODE: mo,
  REGEXP_MODE: vo,
  RE_STARTERS_RE: go,
  SHEBANG: fo,
  TITLE_MODE: So,
  UNDERSCORE_IDENT_RE: hn,
  UNDERSCORE_TITLE_MODE: To
});
function Ro(e, t) {
  e.input[e.index - 1] === "." && t.ignoreMatch();
}
function Ao(e, t) {
  e.className !== void 0 && (e.scope = e.className, delete e.className);
}
function ko(e, t) {
  t && e.beginKeywords && (e.begin = "\\b(" + e.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)", e.__beforeBegin = Ro, e.keywords = e.keywords || e.beginKeywords, delete e.beginKeywords, e.relevance === void 0 && (e.relevance = 0));
}
function Io(e, t) {
  Array.isArray(e.illegal) && (e.illegal = pn(...e.illegal));
}
function Co(e, t) {
  if (e.match) {
    if (e.begin || e.end)
      throw new Error("begin & end are not supported with match");
    e.begin = e.match, delete e.match;
  }
}
function xo(e, t) {
  e.relevance === void 0 && (e.relevance = 1);
}
const Do = (e, t) => {
  if (!e.beforeMatch)
    return;
  if (e.starts)
    throw new Error("beforeMatch cannot be used with starts");
  const n = Object.assign({}, e);
  Object.keys(e).forEach((r) => {
    delete e[r];
  }), e.keywords = n.keywords, e.begin = Te(n.beforeMatch, na(n.begin)), e.starts = {
    relevance: 0,
    contains: [
      Object.assign(n, { endsParent: !0 })
    ]
  }, e.relevance = 0, delete n.beforeMatch;
}, Lo = [
  "of",
  "and",
  "for",
  "in",
  "not",
  "or",
  "if",
  "then",
  "parent",
  // common variable name
  "list",
  // common variable name
  "value"
  // common variable name
], Po = "keyword";
function ca(e, t, n = Po) {
  const r = /* @__PURE__ */ Object.create(null);
  return typeof e == "string" ? a(n, e.split(" ")) : Array.isArray(e) ? a(n, e) : Object.keys(e).forEach(function(i) {
    Object.assign(
      r,
      ca(e[i], t, i)
    );
  }), r;
  function a(i, s) {
    t && (s = s.map((o) => o.toLowerCase())), s.forEach(function(o) {
      const c = o.split("|");
      r[c[0]] = [i, Bo(c[0], c[1])];
    });
  }
}
function Bo(e, t) {
  return t ? Number(t) : Uo(e) ? 0 : 1;
}
function Uo(e) {
  return Lo.includes(e.toLowerCase());
}
const Gn = {}, we = (e) => {
  console.error(e);
}, Wn = (e, ...t) => {
  console.log(`WARN: ${e}`, ...t);
}, Ie = (e, t) => {
  Gn[`${e}/${t}`] || (console.log(`Deprecated as of ${e}. ${t}`), Gn[`${e}/${t}`] = !0);
}, at = new Error();
function la(e, t, { key: n }) {
  let r = 0;
  const a = e[n], i = {}, s = {};
  for (let o = 1; o <= t.length; o++)
    s[o + r] = a[o], i[o + r] = !0, r += ra(t[o - 1]);
  e[n] = s, e[n]._emit = i, e[n]._multi = !0;
}
function Fo(e) {
  if (Array.isArray(e.begin)) {
    if (e.skip || e.excludeBegin || e.returnBegin)
      throw we("skip, excludeBegin, returnBegin not compatible with beginScope: {}"), at;
    if (typeof e.beginScope != "object" || e.beginScope === null)
      throw we("beginScope must be object"), at;
    la(e, e.begin, { key: "beginScope" }), e.begin = _n(e.begin, { joinWith: "" });
  }
}
function $o(e) {
  if (Array.isArray(e.end)) {
    if (e.skip || e.excludeEnd || e.returnEnd)
      throw we("skip, excludeEnd, returnEnd not compatible with endScope: {}"), at;
    if (typeof e.endScope != "object" || e.endScope === null)
      throw we("endScope must be object"), at;
    la(e, e.end, { key: "endScope" }), e.end = _n(e.end, { joinWith: "" });
  }
}
function zo(e) {
  e.scope && typeof e.scope == "object" && e.scope !== null && (e.beginScope = e.scope, delete e.scope);
}
function qo(e) {
  zo(e), typeof e.beginScope == "string" && (e.beginScope = { _wrap: e.beginScope }), typeof e.endScope == "string" && (e.endScope = { _wrap: e.endScope }), Fo(e), $o(e);
}
function Ko(e) {
  function t(s, o) {
    return new RegExp(
      qe(s),
      "m" + (e.case_insensitive ? "i" : "") + (e.unicodeRegex ? "u" : "") + (o ? "g" : "")
    );
  }
  class n {
    constructor() {
      this.matchIndexes = {}, this.regexes = [], this.matchAt = 1, this.position = 0;
    }
    // @ts-ignore
    addRule(o, c) {
      c.position = this.position++, this.matchIndexes[this.matchAt] = c, this.regexes.push([c, o]), this.matchAt += ra(o) + 1;
    }
    compile() {
      this.regexes.length === 0 && (this.exec = () => null);
      const o = this.regexes.map((c) => c[1]);
      this.matcherRe = t(_n(o, { joinWith: "|" }), !0), this.lastIndex = 0;
    }
    /** @param {string} s */
    exec(o) {
      this.matcherRe.lastIndex = this.lastIndex;
      const c = this.matcherRe.exec(o);
      if (!c)
        return null;
      const l = c.findIndex((d, g) => g > 0 && d !== void 0), u = this.matchIndexes[l];
      return c.splice(0, l), Object.assign(c, u);
    }
  }
  class r {
    constructor() {
      this.rules = [], this.multiRegexes = [], this.count = 0, this.lastIndex = 0, this.regexIndex = 0;
    }
    // @ts-ignore
    getMatcher(o) {
      if (this.multiRegexes[o])
        return this.multiRegexes[o];
      const c = new n();
      return this.rules.slice(o).forEach(([l, u]) => c.addRule(l, u)), c.compile(), this.multiRegexes[o] = c, c;
    }
    resumingScanAtSamePosition() {
      return this.regexIndex !== 0;
    }
    considerAll() {
      this.regexIndex = 0;
    }
    // @ts-ignore
    addRule(o, c) {
      this.rules.push([o, c]), c.type === "begin" && this.count++;
    }
    /** @param {string} s */
    exec(o) {
      const c = this.getMatcher(this.regexIndex);
      c.lastIndex = this.lastIndex;
      let l = c.exec(o);
      if (this.resumingScanAtSamePosition() && !(l && l.index === this.lastIndex)) {
        const u = this.getMatcher(0);
        u.lastIndex = this.lastIndex + 1, l = u.exec(o);
      }
      return l && (this.regexIndex += l.position + 1, this.regexIndex === this.count && this.considerAll()), l;
    }
  }
  function a(s) {
    const o = new r();
    return s.contains.forEach((c) => o.addRule(c.begin, { rule: c, type: "begin" })), s.terminatorEnd && o.addRule(s.terminatorEnd, { type: "end" }), s.illegal && o.addRule(s.illegal, { type: "illegal" }), o;
  }
  function i(s, o) {
    const c = (
      /** @type CompiledMode */
      s
    );
    if (s.isCompiled)
      return c;
    [
      Ao,
      // do this early so compiler extensions generally don't have to worry about
      // the distinction between match/begin
      Co,
      qo,
      Do
    ].forEach((u) => u(s, o)), e.compilerExtensions.forEach((u) => u(s, o)), s.__beforeBegin = null, [
      ko,
      // do this later so compiler extensions that come earlier have access to the
      // raw array if they wanted to perhaps manipulate it, etc.
      Io,
      // default to 1 relevance if not specified
      xo
    ].forEach((u) => u(s, o)), s.isCompiled = !0;
    let l = null;
    return typeof s.keywords == "object" && s.keywords.$pattern && (s.keywords = Object.assign({}, s.keywords), l = s.keywords.$pattern, delete s.keywords.$pattern), l = l || /\w+/, s.keywords && (s.keywords = ca(s.keywords, e.case_insensitive)), c.keywordPatternRe = t(l, !0), o && (s.begin || (s.begin = /\B|\b/), c.beginRe = t(c.begin), !s.end && !s.endsWithParent && (s.end = /\B|\b/), s.end && (c.endRe = t(c.end)), c.terminatorEnd = qe(c.end) || "", s.endsWithParent && o.terminatorEnd && (c.terminatorEnd += (s.end ? "|" : "") + o.terminatorEnd)), s.illegal && (c.illegalRe = t(
      /** @type {RegExp | string} */
      s.illegal
    )), s.contains || (s.contains = []), s.contains = [].concat(...s.contains.map(function(u) {
      return Ho(u === "self" ? s : u);
    })), s.contains.forEach(function(u) {
      i(
        /** @type Mode */
        u,
        c
      );
    }), s.starts && i(s.starts, o), c.matcher = a(c), c;
  }
  if (e.compilerExtensions || (e.compilerExtensions = []), e.contains && e.contains.includes("self"))
    throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
  return e.classNameAliases = _e(e.classNameAliases || {}), i(
    /** @type Mode */
    e
  );
}
function ua(e) {
  return e ? e.endsWithParent || ua(e.starts) : !1;
}
function Ho(e) {
  return e.variants && !e.cachedVariants && (e.cachedVariants = e.variants.map(function(t) {
    return _e(e, { variants: null }, t);
  })), e.cachedVariants ? e.cachedVariants : ua(e) ? _e(e, { starts: e.starts ? _e(e.starts) : null }) : Object.isFrozen(e) ? _e(e) : e;
}
var Go = "11.9.0";
class Wo extends Error {
  constructor(t, n) {
    super(t), this.name = "HTMLInjectionError", this.html = n;
  }
}
const _t = ta, Yn = _e, Zn = Symbol("nomatch"), Yo = 7, da = function(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /* @__PURE__ */ Object.create(null), r = [];
  let a = !0;
  const i = "Could not find the language '{}', did you forget to load/include a language module?", s = { disableAutodetect: !0, name: "Plain text", contains: [] };
  let o = {
    ignoreUnescapedHTML: !1,
    throwUnescapedHTML: !1,
    noHighlightRe: /^(no-?highlight)$/i,
    languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
    classPrefix: "hljs-",
    cssSelector: "pre code",
    languages: null,
    // beta configuration options, subject to change, welcome to discuss
    // https://github.com/highlightjs/highlight.js/issues/1086
    __emitter: ao
  };
  function c(m) {
    return o.noHighlightRe.test(m);
  }
  function l(m) {
    let y = m.className + " ";
    y += m.parentNode ? m.parentNode.className : "";
    const I = o.languageDetectRe.exec(y);
    if (I) {
      const D = C(I[1]);
      return D || (Wn(i.replace("{}", I[1])), Wn("Falling back to no-highlight mode for this block.", m)), D ? I[1] : "no-highlight";
    }
    return y.split(/\s+/).find((D) => c(D) || C(D));
  }
  function u(m, y, I) {
    let D = "", F = "";
    typeof y == "object" ? (D = m, I = y.ignoreIllegals, F = y.language) : (Ie("10.7.0", "highlight(lang, code, ...args) has been deprecated."), Ie("10.7.0", `Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`), F = m, D = y), I === void 0 && (I = !0);
    const Z = {
      code: D,
      language: F
    };
    B("before:highlight", Z);
    const ae = Z.result ? Z.result : d(Z.language, Z.code, I);
    return ae.code = Z.code, B("after:highlight", ae), ae;
  }
  function d(m, y, I, D) {
    const F = /* @__PURE__ */ Object.create(null);
    function Z(h, S) {
      return h.keywords[S];
    }
    function ae() {
      if (!M.keywords) {
        W.addText($);
        return;
      }
      let h = 0;
      M.keywordPatternRe.lastIndex = 0;
      let S = M.keywordPatternRe.exec($), A = "";
      for (; S; ) {
        A += $.substring(h, S.index);
        const L = se.case_insensitive ? S[0].toLowerCase() : S[0], X = Z(M, L);
        if (X) {
          const [le, ut] = X;
          if (W.addText(A), A = "", F[L] = (F[L] || 0) + 1, F[L] <= Yo && (Me += ut), le.startsWith("_"))
            A += S[0];
          else {
            const dt = se.classNameAliases[le] || le;
            V(S[0], dt);
          }
        } else
          A += S[0];
        h = M.keywordPatternRe.lastIndex, S = M.keywordPatternRe.exec($);
      }
      A += $.substring(h), W.addText(A);
    }
    function ie() {
      if ($ === "")
        return;
      let h = null;
      if (typeof M.subLanguage == "string") {
        if (!t[M.subLanguage]) {
          W.addText($);
          return;
        }
        h = d(M.subLanguage, $, !0, We[M.subLanguage]), We[M.subLanguage] = /** @type {CompiledMode} */
        h._top;
      } else
        h = f($, M.subLanguage.length ? M.subLanguage : null);
      M.relevance > 0 && (Me += h.relevance), W.__addSublanguage(h._emitter, h.language);
    }
    function K() {
      M.subLanguage != null ? ie() : ae(), $ = "";
    }
    function V(h, S) {
      h !== "" && (W.startScope(S), W.addText(h), W.endScope());
    }
    function G(h, S) {
      let A = 1;
      const L = S.length - 1;
      for (; A <= L; ) {
        if (!h._emit[A]) {
          A++;
          continue;
        }
        const X = se.classNameAliases[h[A]] || h[A], le = S[A];
        X ? V(le, X) : ($ = le, ae(), $ = ""), A++;
      }
    }
    function H(h, S) {
      return h.scope && typeof h.scope == "string" && W.openNode(se.classNameAliases[h.scope] || h.scope), h.beginScope && (h.beginScope._wrap ? (V($, se.classNameAliases[h.beginScope._wrap] || h.beginScope._wrap), $ = "") : h.beginScope._multi && (G(h.beginScope, S), $ = "")), M = Object.create(h, { parent: { value: M } }), M;
    }
    function J(h, S, A) {
      let L = co(h.endRe, A);
      if (L) {
        if (h["on:end"]) {
          const X = new qn(h);
          h["on:end"](S, X), X.isMatchIgnored && (L = !1);
        }
        if (L) {
          for (; h.endsParent && h.parent; )
            h = h.parent;
          return h;
        }
      }
      if (h.endsWithParent)
        return J(h.parent, S, A);
    }
    function ne(h) {
      return M.matcher.regexIndex === 0 ? ($ += h[0], 1) : (de = !0, 0);
    }
    function re(h) {
      const S = h[0], A = h.rule, L = new qn(A), X = [A.__beforeBegin, A["on:begin"]];
      for (const le of X)
        if (le && (le(h, L), L.isMatchIgnored))
          return ne(S);
      return A.skip ? $ += S : (A.excludeBegin && ($ += S), K(), !A.returnBegin && !A.excludeBegin && ($ = S)), H(A, h), A.returnBegin ? 0 : S.length;
    }
    function ce(h) {
      const S = h[0], A = y.substring(h.index), L = J(M, h, A);
      if (!L)
        return Zn;
      const X = M;
      M.endScope && M.endScope._wrap ? (K(), V(S, M.endScope._wrap)) : M.endScope && M.endScope._multi ? (K(), G(M.endScope, h)) : X.skip ? $ += S : (X.returnEnd || X.excludeEnd || ($ += S), K(), X.excludeEnd && ($ = S));
      do
        M.scope && W.closeNode(), !M.skip && !M.subLanguage && (Me += M.relevance), M = M.parent;
      while (M !== L.parent);
      return L.starts && H(L.starts, h), X.returnEnd ? 0 : S.length;
    }
    function ue() {
      const h = [];
      for (let S = M; S !== se; S = S.parent)
        S.scope && h.unshift(S.scope);
      h.forEach((S) => W.openNode(S));
    }
    let he = {};
    function He(h, S) {
      const A = S && S[0];
      if ($ += h, A == null)
        return K(), 0;
      if (he.type === "begin" && S.type === "end" && he.index === S.index && A === "") {
        if ($ += y.slice(S.index, S.index + 1), !a) {
          const L = new Error(`0 width match regex (${m})`);
          throw L.languageName = m, L.badRule = he.rule, L;
        }
        return 1;
      }
      if (he = S, S.type === "begin")
        return re(S);
      if (S.type === "illegal" && !I) {
        const L = new Error('Illegal lexeme "' + A + '" for mode "' + (M.scope || "<unnamed>") + '"');
        throw L.mode = M, L;
      } else if (S.type === "end") {
        const L = ce(S);
        if (L !== Zn)
          return L;
      }
      if (S.type === "illegal" && A === "")
        return 1;
      if (me > 1e5 && me > S.index * 3)
        throw new Error("potential infinite loop, way more iterations than matches");
      return $ += A, A.length;
    }
    const se = C(m);
    if (!se)
      throw we(i.replace("{}", m)), new Error('Unknown language: "' + m + '"');
    const Ge = Ko(se);
    let Oe = "", M = D || Ge;
    const We = {}, W = new o.__emitter(o);
    ue();
    let $ = "", Me = 0, be = 0, me = 0, de = !1;
    try {
      if (se.__emitTokens)
        se.__emitTokens(y, W);
      else {
        for (M.matcher.considerAll(); ; ) {
          me++, de ? de = !1 : M.matcher.considerAll(), M.matcher.lastIndex = be;
          const h = M.matcher.exec(y);
          if (!h)
            break;
          const S = y.substring(be, h.index), A = He(S, h);
          be = h.index + A;
        }
        He(y.substring(be));
      }
      return W.finalize(), Oe = W.toHTML(), {
        language: m,
        value: Oe,
        relevance: Me,
        illegal: !1,
        _emitter: W,
        _top: M
      };
    } catch (h) {
      if (h.message && h.message.includes("Illegal"))
        return {
          language: m,
          value: _t(y),
          illegal: !0,
          relevance: 0,
          _illegalBy: {
            message: h.message,
            index: be,
            context: y.slice(be - 100, be + 100),
            mode: h.mode,
            resultSoFar: Oe
          },
          _emitter: W
        };
      if (a)
        return {
          language: m,
          value: _t(y),
          illegal: !1,
          relevance: 0,
          errorRaised: h,
          _emitter: W,
          _top: M
        };
      throw h;
    }
  }
  function g(m) {
    const y = {
      value: _t(m),
      illegal: !1,
      relevance: 0,
      _top: s,
      _emitter: new o.__emitter(o)
    };
    return y._emitter.addText(m), y;
  }
  function f(m, y) {
    y = y || o.languages || Object.keys(t);
    const I = g(m), D = y.filter(C).filter(z).map(
      (K) => d(K, m, !1)
    );
    D.unshift(I);
    const F = D.sort((K, V) => {
      if (K.relevance !== V.relevance)
        return V.relevance - K.relevance;
      if (K.language && V.language) {
        if (C(K.language).supersetOf === V.language)
          return 1;
        if (C(V.language).supersetOf === K.language)
          return -1;
      }
      return 0;
    }), [Z, ae] = F, ie = Z;
    return ie.secondBest = ae, ie;
  }
  function p(m, y, I) {
    const D = y && n[y] || I;
    m.classList.add("hljs"), m.classList.add(`language-${D}`);
  }
  function _(m) {
    let y = null;
    const I = l(m);
    if (c(I))
      return;
    if (B(
      "before:highlightElement",
      { el: m, language: I }
    ), m.dataset.highlighted) {
      console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.", m);
      return;
    }
    if (m.children.length > 0 && (o.ignoreUnescapedHTML || (console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."), console.warn("https://github.com/highlightjs/highlight.js/wiki/security"), console.warn("The element with unescaped HTML:"), console.warn(m)), o.throwUnescapedHTML))
      throw new Wo(
        "One of your code blocks includes unescaped HTML.",
        m.innerHTML
      );
    y = m;
    const D = y.textContent, F = I ? u(D, { language: I, ignoreIllegals: !0 }) : f(D);
    m.innerHTML = F.value, m.dataset.highlighted = "yes", p(m, I, F.language), m.result = {
      language: F.language,
      // TODO: remove with version 11.0
      re: F.relevance,
      relevance: F.relevance
    }, F.secondBest && (m.secondBest = {
      language: F.secondBest.language,
      relevance: F.secondBest.relevance
    }), B("after:highlightElement", { el: m, result: F, text: D });
  }
  function b(m) {
    o = Yn(o, m);
  }
  const E = () => {
    O(), Ie("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
  };
  function N() {
    O(), Ie("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
  }
  let w = !1;
  function O() {
    if (document.readyState === "loading") {
      w = !0;
      return;
    }
    document.querySelectorAll(o.cssSelector).forEach(_);
  }
  function R() {
    w && O();
  }
  typeof window < "u" && window.addEventListener && window.addEventListener("DOMContentLoaded", R, !1);
  function T(m, y) {
    let I = null;
    try {
      I = y(e);
    } catch (D) {
      if (we("Language definition for '{}' could not be registered.".replace("{}", m)), a)
        we(D);
      else
        throw D;
      I = s;
    }
    I.name || (I.name = m), t[m] = I, I.rawDefinition = y.bind(null, e), I.aliases && U(I.aliases, { languageName: m });
  }
  function k(m) {
    delete t[m];
    for (const y of Object.keys(n))
      n[y] === m && delete n[y];
  }
  function v() {
    return Object.keys(t);
  }
  function C(m) {
    return m = (m || "").toLowerCase(), t[m] || t[n[m]];
  }
  function U(m, { languageName: y }) {
    typeof m == "string" && (m = [m]), m.forEach((I) => {
      n[I.toLowerCase()] = y;
    });
  }
  function z(m) {
    const y = C(m);
    return y && !y.disableAutodetect;
  }
  function te(m) {
    m["before:highlightBlock"] && !m["before:highlightElement"] && (m["before:highlightElement"] = (y) => {
      m["before:highlightBlock"](
        Object.assign({ block: y.el }, y)
      );
    }), m["after:highlightBlock"] && !m["after:highlightElement"] && (m["after:highlightElement"] = (y) => {
      m["after:highlightBlock"](
        Object.assign({ block: y.el }, y)
      );
    });
  }
  function oe(m) {
    te(m), r.push(m);
  }
  function Y(m) {
    const y = r.indexOf(m);
    y !== -1 && r.splice(y, 1);
  }
  function B(m, y) {
    const I = m;
    r.forEach(function(D) {
      D[I] && D[I](y);
    });
  }
  function Q(m) {
    return Ie("10.7.0", "highlightBlock will be removed entirely in v12.0"), Ie("10.7.0", "Please use highlightElement now."), _(m);
  }
  Object.assign(e, {
    highlight: u,
    highlightAuto: f,
    highlightAll: O,
    highlightElement: _,
    // TODO: Remove with v12 API
    highlightBlock: Q,
    configure: b,
    initHighlighting: E,
    initHighlightingOnLoad: N,
    registerLanguage: T,
    unregisterLanguage: k,
    listLanguages: v,
    getLanguage: C,
    registerAliases: U,
    autoDetection: z,
    inherit: Yn,
    addPlugin: oe,
    removePlugin: Y
  }), e.debugMode = function() {
    a = !1;
  }, e.safeMode = function() {
    a = !0;
  }, e.versionString = Go, e.regex = {
    concat: Te,
    lookahead: na,
    either: pn,
    optional: so,
    anyNumberOfTimes: io
  };
  for (const m in Qe)
    typeof Qe[m] == "object" && ea(Qe[m]);
  return Object.assign(e, Qe), e;
}, Ce = da({});
Ce.newInstance = () => da({});
var ga = Ce;
Ce.HighlightJS = Ce;
Ce.default = Ce;
const ht = /* @__PURE__ */ eo(ga);
var Et, Vn;
function Zo() {
  if (Vn)
    return Et;
  Vn = 1;
  function e(t) {
    const n = t.regex, r = n.concat(/[\p{L}_]/u, n.optional(/[\p{L}0-9_.-]*:/u), /[\p{L}0-9_.-]*/u), a = /[\p{L}0-9._:-]+/u, i = {
      className: "symbol",
      begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/
    }, s = {
      begin: /\s/,
      contains: [
        {
          className: "keyword",
          begin: /#?[a-z_][a-z1-9_-]+/,
          illegal: /\n/
        }
      ]
    }, o = t.inherit(s, {
      begin: /\(/,
      end: /\)/
    }), c = t.inherit(t.APOS_STRING_MODE, { className: "string" }), l = t.inherit(t.QUOTE_STRING_MODE, { className: "string" }), u = {
      endsWithParent: !0,
      illegal: /</,
      relevance: 0,
      contains: [
        {
          className: "attr",
          begin: a,
          relevance: 0
        },
        {
          begin: /=\s*/,
          relevance: 0,
          contains: [
            {
              className: "string",
              endsParent: !0,
              variants: [
                {
                  begin: /"/,
                  end: /"/,
                  contains: [i]
                },
                {
                  begin: /'/,
                  end: /'/,
                  contains: [i]
                },
                { begin: /[^\s"'=<>`]+/ }
              ]
            }
          ]
        }
      ]
    };
    return {
      name: "HTML, XML",
      aliases: [
        "html",
        "xhtml",
        "rss",
        "atom",
        "xjb",
        "xsd",
        "xsl",
        "plist",
        "wsf",
        "svg"
      ],
      case_insensitive: !0,
      unicodeRegex: !0,
      contains: [
        {
          className: "meta",
          begin: /<![a-z]/,
          end: />/,
          relevance: 10,
          contains: [
            s,
            l,
            c,
            o,
            {
              begin: /\[/,
              end: /\]/,
              contains: [
                {
                  className: "meta",
                  begin: /<![a-z]/,
                  end: />/,
                  contains: [
                    s,
                    o,
                    l,
                    c
                  ]
                }
              ]
            }
          ]
        },
        t.COMMENT(
          /<!--/,
          /-->/,
          { relevance: 10 }
        ),
        {
          begin: /<!\[CDATA\[/,
          end: /\]\]>/,
          relevance: 10
        },
        i,
        // xml processing instructions
        {
          className: "meta",
          end: /\?>/,
          variants: [
            {
              begin: /<\?xml/,
              relevance: 10,
              contains: [
                l
              ]
            },
            {
              begin: /<\?[a-z][a-z0-9]+/
            }
          ]
        },
        {
          className: "tag",
          /*
          The lookahead pattern (?=...) ensures that 'begin' only matches
          '<style' as a single word, followed by a whitespace or an
          ending bracket.
          */
          begin: /<style(?=\s|>)/,
          end: />/,
          keywords: { name: "style" },
          contains: [u],
          starts: {
            end: /<\/style>/,
            returnEnd: !0,
            subLanguage: [
              "css",
              "xml"
            ]
          }
        },
        {
          className: "tag",
          // See the comment in the <style tag about the lookahead pattern
          begin: /<script(?=\s|>)/,
          end: />/,
          keywords: { name: "script" },
          contains: [u],
          starts: {
            end: /<\/script>/,
            returnEnd: !0,
            subLanguage: [
              "javascript",
              "handlebars",
              "xml"
            ]
          }
        },
        // we need this for now for jSX
        {
          className: "tag",
          begin: /<>|<\/>/
        },
        // open tag
        {
          className: "tag",
          begin: n.concat(
            /</,
            n.lookahead(n.concat(
              r,
              // <tag/>
              // <tag>
              // <tag ...
              n.either(/\/>/, />/, /\s/)
            ))
          ),
          end: /\/?>/,
          contains: [
            {
              className: "name",
              begin: r,
              relevance: 0,
              starts: u
            }
          ]
        },
        // close tag
        {
          className: "tag",
          begin: n.concat(
            /<\//,
            n.lookahead(n.concat(
              r,
              />/
            ))
          ),
          contains: [
            {
              className: "name",
              begin: r,
              relevance: 0
            },
            {
              begin: />/,
              relevance: 0,
              endsParent: !0
            }
          ]
        }
      ]
    };
  }
  return Et = e, Et;
}
var yt, Xn;
function Vo() {
  if (Xn)
    return yt;
  Xn = 1;
  function e(t) {
    const n = t.regex, r = {}, a = {
      begin: /\$\{/,
      end: /\}/,
      contains: [
        "self",
        {
          begin: /:-/,
          contains: [r]
        }
        // default values
      ]
    };
    Object.assign(r, {
      className: "variable",
      variants: [
        { begin: n.concat(
          /\$[\w\d#@][\w\d_]*/,
          // negative look-ahead tries to avoid matching patterns that are not
          // Perl at all like $ident$, @ident@, etc.
          "(?![\\w\\d])(?![$])"
        ) },
        a
      ]
    });
    const i = {
      className: "subst",
      begin: /\$\(/,
      end: /\)/,
      contains: [t.BACKSLASH_ESCAPE]
    }, s = {
      begin: /<<-?\s*(?=\w+)/,
      starts: { contains: [
        t.END_SAME_AS_BEGIN({
          begin: /(\w+)/,
          end: /(\w+)/,
          className: "string"
        })
      ] }
    }, o = {
      className: "string",
      begin: /"/,
      end: /"/,
      contains: [
        t.BACKSLASH_ESCAPE,
        r,
        i
      ]
    };
    i.contains.push(o);
    const c = {
      match: /\\"/
    }, l = {
      className: "string",
      begin: /'/,
      end: /'/
    }, u = {
      match: /\\'/
    }, d = {
      begin: /\$?\(\(/,
      end: /\)\)/,
      contains: [
        {
          begin: /\d+#[0-9a-f]+/,
          className: "number"
        },
        t.NUMBER_MODE,
        r
      ]
    }, g = [
      "fish",
      "bash",
      "zsh",
      "sh",
      "csh",
      "ksh",
      "tcsh",
      "dash",
      "scsh"
    ], f = t.SHEBANG({
      binary: `(${g.join("|")})`,
      relevance: 10
    }), p = {
      className: "function",
      begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
      returnBegin: !0,
      contains: [t.inherit(t.TITLE_MODE, { begin: /\w[\w\d_]*/ })],
      relevance: 0
    }, _ = [
      "if",
      "then",
      "else",
      "elif",
      "fi",
      "for",
      "while",
      "until",
      "in",
      "do",
      "done",
      "case",
      "esac",
      "function",
      "select"
    ], b = [
      "true",
      "false"
    ], E = { match: /(\/[a-z._-]+)+/ }, N = [
      "break",
      "cd",
      "continue",
      "eval",
      "exec",
      "exit",
      "export",
      "getopts",
      "hash",
      "pwd",
      "readonly",
      "return",
      "shift",
      "test",
      "times",
      "trap",
      "umask",
      "unset"
    ], w = [
      "alias",
      "bind",
      "builtin",
      "caller",
      "command",
      "declare",
      "echo",
      "enable",
      "help",
      "let",
      "local",
      "logout",
      "mapfile",
      "printf",
      "read",
      "readarray",
      "source",
      "type",
      "typeset",
      "ulimit",
      "unalias"
    ], O = [
      "autoload",
      "bg",
      "bindkey",
      "bye",
      "cap",
      "chdir",
      "clone",
      "comparguments",
      "compcall",
      "compctl",
      "compdescribe",
      "compfiles",
      "compgroups",
      "compquote",
      "comptags",
      "comptry",
      "compvalues",
      "dirs",
      "disable",
      "disown",
      "echotc",
      "echoti",
      "emulate",
      "fc",
      "fg",
      "float",
      "functions",
      "getcap",
      "getln",
      "history",
      "integer",
      "jobs",
      "kill",
      "limit",
      "log",
      "noglob",
      "popd",
      "print",
      "pushd",
      "pushln",
      "rehash",
      "sched",
      "setcap",
      "setopt",
      "stat",
      "suspend",
      "ttyctl",
      "unfunction",
      "unhash",
      "unlimit",
      "unsetopt",
      "vared",
      "wait",
      "whence",
      "where",
      "which",
      "zcompile",
      "zformat",
      "zftp",
      "zle",
      "zmodload",
      "zparseopts",
      "zprof",
      "zpty",
      "zregexparse",
      "zsocket",
      "zstyle",
      "ztcp"
    ], R = [
      "chcon",
      "chgrp",
      "chown",
      "chmod",
      "cp",
      "dd",
      "df",
      "dir",
      "dircolors",
      "ln",
      "ls",
      "mkdir",
      "mkfifo",
      "mknod",
      "mktemp",
      "mv",
      "realpath",
      "rm",
      "rmdir",
      "shred",
      "sync",
      "touch",
      "truncate",
      "vdir",
      "b2sum",
      "base32",
      "base64",
      "cat",
      "cksum",
      "comm",
      "csplit",
      "cut",
      "expand",
      "fmt",
      "fold",
      "head",
      "join",
      "md5sum",
      "nl",
      "numfmt",
      "od",
      "paste",
      "ptx",
      "pr",
      "sha1sum",
      "sha224sum",
      "sha256sum",
      "sha384sum",
      "sha512sum",
      "shuf",
      "sort",
      "split",
      "sum",
      "tac",
      "tail",
      "tr",
      "tsort",
      "unexpand",
      "uniq",
      "wc",
      "arch",
      "basename",
      "chroot",
      "date",
      "dirname",
      "du",
      "echo",
      "env",
      "expr",
      "factor",
      // "false", // keyword literal already
      "groups",
      "hostid",
      "id",
      "link",
      "logname",
      "nice",
      "nohup",
      "nproc",
      "pathchk",
      "pinky",
      "printenv",
      "printf",
      "pwd",
      "readlink",
      "runcon",
      "seq",
      "sleep",
      "stat",
      "stdbuf",
      "stty",
      "tee",
      "test",
      "timeout",
      // "true", // keyword literal already
      "tty",
      "uname",
      "unlink",
      "uptime",
      "users",
      "who",
      "whoami",
      "yes"
    ];
    return {
      name: "Bash",
      aliases: ["sh"],
      keywords: {
        $pattern: /\b[a-z][a-z0-9._-]+\b/,
        keyword: _,
        literal: b,
        built_in: [
          ...N,
          ...w,
          // Shell modifiers
          "set",
          "shopt",
          ...O,
          ...R
        ]
      },
      contains: [
        f,
        // to catch known shells and boost relevancy
        t.SHEBANG(),
        // to catch unknown shells but still highlight the shebang
        p,
        d,
        t.HASH_COMMENT_MODE,
        s,
        E,
        o,
        c,
        l,
        u,
        r
      ]
    };
  }
  return yt = e, yt;
}
var Nt, Qn;
function Xo() {
  if (Qn)
    return Nt;
  Qn = 1;
  function e(t) {
    const n = t.regex, r = t.COMMENT("//", "$", { contains: [{ begin: /\\\n/ }] }), a = "decltype\\(auto\\)", i = "[a-zA-Z_]\\w*::", o = "(" + a + "|" + n.optional(i) + "[a-zA-Z_]\\w*" + n.optional("<[^<>]+>") + ")", c = {
      className: "type",
      variants: [
        { begin: "\\b[a-z\\d_]*_t\\b" },
        { match: /\batomic_[a-z]{3,6}\b/ }
      ]
    }, u = {
      className: "string",
      variants: [
        {
          begin: '(u8?|U|L)?"',
          end: '"',
          illegal: "\\n",
          contains: [t.BACKSLASH_ESCAPE]
        },
        {
          begin: "(u8?|U|L)?'(" + "\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)" + "|.)",
          end: "'",
          illegal: "."
        },
        t.END_SAME_AS_BEGIN({
          begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,
          end: /\)([^()\\ ]{0,16})"/
        })
      ]
    }, d = {
      className: "number",
      variants: [
        { begin: "\\b(0b[01']+)" },
        { begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)" },
        { begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)" }
      ],
      relevance: 0
    }, g = {
      className: "meta",
      begin: /#\s*[a-z]+\b/,
      end: /$/,
      keywords: { keyword: "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include" },
      contains: [
        {
          begin: /\\\n/,
          relevance: 0
        },
        t.inherit(u, { className: "string" }),
        {
          className: "string",
          begin: /<.*?>/
        },
        r,
        t.C_BLOCK_COMMENT_MODE
      ]
    }, f = {
      className: "title",
      begin: n.optional(i) + t.IDENT_RE,
      relevance: 0
    }, p = n.optional(i) + t.IDENT_RE + "\\s*\\(", E = {
      keyword: [
        "asm",
        "auto",
        "break",
        "case",
        "continue",
        "default",
        "do",
        "else",
        "enum",
        "extern",
        "for",
        "fortran",
        "goto",
        "if",
        "inline",
        "register",
        "restrict",
        "return",
        "sizeof",
        "struct",
        "switch",
        "typedef",
        "union",
        "volatile",
        "while",
        "_Alignas",
        "_Alignof",
        "_Atomic",
        "_Generic",
        "_Noreturn",
        "_Static_assert",
        "_Thread_local",
        // aliases
        "alignas",
        "alignof",
        "noreturn",
        "static_assert",
        "thread_local",
        // not a C keyword but is, for all intents and purposes, treated exactly like one.
        "_Pragma"
      ],
      type: [
        "float",
        "double",
        "signed",
        "unsigned",
        "int",
        "short",
        "long",
        "char",
        "void",
        "_Bool",
        "_Complex",
        "_Imaginary",
        "_Decimal32",
        "_Decimal64",
        "_Decimal128",
        // modifiers
        "const",
        "static",
        // aliases
        "complex",
        "bool",
        "imaginary"
      ],
      literal: "true false NULL",
      // TODO: apply hinting work similar to what was done in cpp.js
      built_in: "std string wstring cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set pair bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap priority_queue make_pair array shared_ptr abort terminate abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf future isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr"
    }, N = [
      g,
      c,
      r,
      t.C_BLOCK_COMMENT_MODE,
      d,
      u
    ], w = {
      // This mode covers expression context where we can't expect a function
      // definition and shouldn't highlight anything that looks like one:
      // `return some()`, `else if()`, `(x*sum(1, 2))`
      variants: [
        {
          begin: /=/,
          end: /;/
        },
        {
          begin: /\(/,
          end: /\)/
        },
        {
          beginKeywords: "new throw return else",
          end: /;/
        }
      ],
      keywords: E,
      contains: N.concat([
        {
          begin: /\(/,
          end: /\)/,
          keywords: E,
          contains: N.concat(["self"]),
          relevance: 0
        }
      ]),
      relevance: 0
    }, O = {
      begin: "(" + o + "[\\*&\\s]+)+" + p,
      returnBegin: !0,
      end: /[{;=]/,
      excludeEnd: !0,
      keywords: E,
      illegal: /[^\w\s\*&:<>.]/,
      contains: [
        {
          // to prevent it from being confused as the function title
          begin: a,
          keywords: E,
          relevance: 0
        },
        {
          begin: p,
          returnBegin: !0,
          contains: [t.inherit(f, { className: "title.function" })],
          relevance: 0
        },
        // allow for multiple declarations, e.g.:
        // extern void f(int), g(char);
        {
          relevance: 0,
          match: /,/
        },
        {
          className: "params",
          begin: /\(/,
          end: /\)/,
          keywords: E,
          relevance: 0,
          contains: [
            r,
            t.C_BLOCK_COMMENT_MODE,
            u,
            d,
            c,
            // Count matching parentheses.
            {
              begin: /\(/,
              end: /\)/,
              keywords: E,
              relevance: 0,
              contains: [
                "self",
                r,
                t.C_BLOCK_COMMENT_MODE,
                u,
                d,
                c
              ]
            }
          ]
        },
        c,
        r,
        t.C_BLOCK_COMMENT_MODE,
        g
      ]
    };
    return {
      name: "C",
      aliases: ["h"],
      keywords: E,
      // Until differentiations are added between `c` and `cpp`, `c` will
      // not be auto-detected to avoid auto-detect conflicts between C and C++
      disableAutodetect: !0,
      illegal: "</",
      contains: [].concat(
        w,
        O,
        N,
        [
          g,
          {
            begin: t.IDENT_RE + "::",
            keywords: E
          },
          {
            className: "class",
            beginKeywords: "enum class struct union",
            end: /[{;:<>=]/,
            contains: [
              { beginKeywords: "final class struct" },
              t.TITLE_MODE
            ]
          }
        ]
      ),
      exports: {
        preprocessor: g,
        strings: u,
        keywords: E
      }
    };
  }
  return Nt = e, Nt;
}
var wt, Jn;
function Qo() {
  if (Jn)
    return wt;
  Jn = 1;
  function e(t) {
    const n = t.regex, r = t.COMMENT("//", "$", { contains: [{ begin: /\\\n/ }] }), a = "decltype\\(auto\\)", i = "[a-zA-Z_]\\w*::", o = "(?!struct)(" + a + "|" + n.optional(i) + "[a-zA-Z_]\\w*" + n.optional("<[^<>]+>") + ")", c = {
      className: "type",
      begin: "\\b[a-z\\d_]*_t\\b"
    }, u = {
      className: "string",
      variants: [
        {
          begin: '(u8?|U|L)?"',
          end: '"',
          illegal: "\\n",
          contains: [t.BACKSLASH_ESCAPE]
        },
        {
          begin: "(u8?|U|L)?'(" + "\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)" + "|.)",
          end: "'",
          illegal: "."
        },
        t.END_SAME_AS_BEGIN({
          begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,
          end: /\)([^()\\ ]{0,16})"/
        })
      ]
    }, d = {
      className: "number",
      variants: [
        { begin: "\\b(0b[01']+)" },
        { begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)" },
        { begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)" }
      ],
      relevance: 0
    }, g = {
      className: "meta",
      begin: /#\s*[a-z]+\b/,
      end: /$/,
      keywords: { keyword: "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include" },
      contains: [
        {
          begin: /\\\n/,
          relevance: 0
        },
        t.inherit(u, { className: "string" }),
        {
          className: "string",
          begin: /<.*?>/
        },
        r,
        t.C_BLOCK_COMMENT_MODE
      ]
    }, f = {
      className: "title",
      begin: n.optional(i) + t.IDENT_RE,
      relevance: 0
    }, p = n.optional(i) + t.IDENT_RE + "\\s*\\(", _ = [
      "alignas",
      "alignof",
      "and",
      "and_eq",
      "asm",
      "atomic_cancel",
      "atomic_commit",
      "atomic_noexcept",
      "auto",
      "bitand",
      "bitor",
      "break",
      "case",
      "catch",
      "class",
      "co_await",
      "co_return",
      "co_yield",
      "compl",
      "concept",
      "const_cast|10",
      "consteval",
      "constexpr",
      "constinit",
      "continue",
      "decltype",
      "default",
      "delete",
      "do",
      "dynamic_cast|10",
      "else",
      "enum",
      "explicit",
      "export",
      "extern",
      "false",
      "final",
      "for",
      "friend",
      "goto",
      "if",
      "import",
      "inline",
      "module",
      "mutable",
      "namespace",
      "new",
      "noexcept",
      "not",
      "not_eq",
      "nullptr",
      "operator",
      "or",
      "or_eq",
      "override",
      "private",
      "protected",
      "public",
      "reflexpr",
      "register",
      "reinterpret_cast|10",
      "requires",
      "return",
      "sizeof",
      "static_assert",
      "static_cast|10",
      "struct",
      "switch",
      "synchronized",
      "template",
      "this",
      "thread_local",
      "throw",
      "transaction_safe",
      "transaction_safe_dynamic",
      "true",
      "try",
      "typedef",
      "typeid",
      "typename",
      "union",
      "using",
      "virtual",
      "volatile",
      "while",
      "xor",
      "xor_eq"
    ], b = [
      "bool",
      "char",
      "char16_t",
      "char32_t",
      "char8_t",
      "double",
      "float",
      "int",
      "long",
      "short",
      "void",
      "wchar_t",
      "unsigned",
      "signed",
      "const",
      "static"
    ], E = [
      "any",
      "auto_ptr",
      "barrier",
      "binary_semaphore",
      "bitset",
      "complex",
      "condition_variable",
      "condition_variable_any",
      "counting_semaphore",
      "deque",
      "false_type",
      "future",
      "imaginary",
      "initializer_list",
      "istringstream",
      "jthread",
      "latch",
      "lock_guard",
      "multimap",
      "multiset",
      "mutex",
      "optional",
      "ostringstream",
      "packaged_task",
      "pair",
      "promise",
      "priority_queue",
      "queue",
      "recursive_mutex",
      "recursive_timed_mutex",
      "scoped_lock",
      "set",
      "shared_future",
      "shared_lock",
      "shared_mutex",
      "shared_timed_mutex",
      "shared_ptr",
      "stack",
      "string_view",
      "stringstream",
      "timed_mutex",
      "thread",
      "true_type",
      "tuple",
      "unique_lock",
      "unique_ptr",
      "unordered_map",
      "unordered_multimap",
      "unordered_multiset",
      "unordered_set",
      "variant",
      "vector",
      "weak_ptr",
      "wstring",
      "wstring_view"
    ], N = [
      "abort",
      "abs",
      "acos",
      "apply",
      "as_const",
      "asin",
      "atan",
      "atan2",
      "calloc",
      "ceil",
      "cerr",
      "cin",
      "clog",
      "cos",
      "cosh",
      "cout",
      "declval",
      "endl",
      "exchange",
      "exit",
      "exp",
      "fabs",
      "floor",
      "fmod",
      "forward",
      "fprintf",
      "fputs",
      "free",
      "frexp",
      "fscanf",
      "future",
      "invoke",
      "isalnum",
      "isalpha",
      "iscntrl",
      "isdigit",
      "isgraph",
      "islower",
      "isprint",
      "ispunct",
      "isspace",
      "isupper",
      "isxdigit",
      "labs",
      "launder",
      "ldexp",
      "log",
      "log10",
      "make_pair",
      "make_shared",
      "make_shared_for_overwrite",
      "make_tuple",
      "make_unique",
      "malloc",
      "memchr",
      "memcmp",
      "memcpy",
      "memset",
      "modf",
      "move",
      "pow",
      "printf",
      "putchar",
      "puts",
      "realloc",
      "scanf",
      "sin",
      "sinh",
      "snprintf",
      "sprintf",
      "sqrt",
      "sscanf",
      "std",
      "stderr",
      "stdin",
      "stdout",
      "strcat",
      "strchr",
      "strcmp",
      "strcpy",
      "strcspn",
      "strlen",
      "strncat",
      "strncmp",
      "strncpy",
      "strpbrk",
      "strrchr",
      "strspn",
      "strstr",
      "swap",
      "tan",
      "tanh",
      "terminate",
      "to_underlying",
      "tolower",
      "toupper",
      "vfprintf",
      "visit",
      "vprintf",
      "vsprintf"
    ], R = {
      type: b,
      keyword: _,
      literal: [
        "NULL",
        "false",
        "nullopt",
        "nullptr",
        "true"
      ],
      built_in: ["_Pragma"],
      _type_hints: E
    }, T = {
      className: "function.dispatch",
      relevance: 0,
      keywords: {
        // Only for relevance, not highlighting.
        _hint: N
      },
      begin: n.concat(
        /\b/,
        /(?!decltype)/,
        /(?!if)/,
        /(?!for)/,
        /(?!switch)/,
        /(?!while)/,
        t.IDENT_RE,
        n.lookahead(/(<[^<>]+>|)\s*\(/)
      )
    }, k = [
      T,
      g,
      c,
      r,
      t.C_BLOCK_COMMENT_MODE,
      d,
      u
    ], v = {
      // This mode covers expression context where we can't expect a function
      // definition and shouldn't highlight anything that looks like one:
      // `return some()`, `else if()`, `(x*sum(1, 2))`
      variants: [
        {
          begin: /=/,
          end: /;/
        },
        {
          begin: /\(/,
          end: /\)/
        },
        {
          beginKeywords: "new throw return else",
          end: /;/
        }
      ],
      keywords: R,
      contains: k.concat([
        {
          begin: /\(/,
          end: /\)/,
          keywords: R,
          contains: k.concat(["self"]),
          relevance: 0
        }
      ]),
      relevance: 0
    }, C = {
      className: "function",
      begin: "(" + o + "[\\*&\\s]+)+" + p,
      returnBegin: !0,
      end: /[{;=]/,
      excludeEnd: !0,
      keywords: R,
      illegal: /[^\w\s\*&:<>.]/,
      contains: [
        {
          // to prevent it from being confused as the function title
          begin: a,
          keywords: R,
          relevance: 0
        },
        {
          begin: p,
          returnBegin: !0,
          contains: [f],
          relevance: 0
        },
        // needed because we do not have look-behind on the below rule
        // to prevent it from grabbing the final : in a :: pair
        {
          begin: /::/,
          relevance: 0
        },
        // initializers
        {
          begin: /:/,
          endsWithParent: !0,
          contains: [
            u,
            d
          ]
        },
        // allow for multiple declarations, e.g.:
        // extern void f(int), g(char);
        {
          relevance: 0,
          match: /,/
        },
        {
          className: "params",
          begin: /\(/,
          end: /\)/,
          keywords: R,
          relevance: 0,
          contains: [
            r,
            t.C_BLOCK_COMMENT_MODE,
            u,
            d,
            c,
            // Count matching parentheses.
            {
              begin: /\(/,
              end: /\)/,
              keywords: R,
              relevance: 0,
              contains: [
                "self",
                r,
                t.C_BLOCK_COMMENT_MODE,
                u,
                d,
                c
              ]
            }
          ]
        },
        c,
        r,
        t.C_BLOCK_COMMENT_MODE,
        g
      ]
    };
    return {
      name: "C++",
      aliases: [
        "cc",
        "c++",
        "h++",
        "hpp",
        "hh",
        "hxx",
        "cxx"
      ],
      keywords: R,
      illegal: "</",
      classNameAliases: { "function.dispatch": "built_in" },
      contains: [].concat(
        v,
        C,
        T,
        k,
        [
          g,
          {
            // containers: ie, `vector <int> rooms (9);`
            begin: "\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array|tuple|optional|variant|function)\\s*<(?!<)",
            end: ">",
            keywords: R,
            contains: [
              "self",
              c
            ]
          },
          {
            begin: t.IDENT_RE + "::",
            keywords: R
          },
          {
            match: [
              // extra complexity to deal with `enum class` and `enum struct`
              /\b(?:enum(?:\s+(?:class|struct))?|class|struct|union)/,
              /\s+/,
              /\w+/
            ],
            className: {
              1: "keyword",
              3: "title.class"
            }
          }
        ]
      )
    };
  }
  return wt = e, wt;
}
var vt, jn;
function Jo() {
  if (jn)
    return vt;
  jn = 1;
  function e(t) {
    const n = [
      "bool",
      "byte",
      "char",
      "decimal",
      "delegate",
      "double",
      "dynamic",
      "enum",
      "float",
      "int",
      "long",
      "nint",
      "nuint",
      "object",
      "sbyte",
      "short",
      "string",
      "ulong",
      "uint",
      "ushort"
    ], r = [
      "public",
      "private",
      "protected",
      "static",
      "internal",
      "protected",
      "abstract",
      "async",
      "extern",
      "override",
      "unsafe",
      "virtual",
      "new",
      "sealed",
      "partial"
    ], a = [
      "default",
      "false",
      "null",
      "true"
    ], i = [
      "abstract",
      "as",
      "base",
      "break",
      "case",
      "catch",
      "class",
      "const",
      "continue",
      "do",
      "else",
      "event",
      "explicit",
      "extern",
      "finally",
      "fixed",
      "for",
      "foreach",
      "goto",
      "if",
      "implicit",
      "in",
      "interface",
      "internal",
      "is",
      "lock",
      "namespace",
      "new",
      "operator",
      "out",
      "override",
      "params",
      "private",
      "protected",
      "public",
      "readonly",
      "record",
      "ref",
      "return",
      "scoped",
      "sealed",
      "sizeof",
      "stackalloc",
      "static",
      "struct",
      "switch",
      "this",
      "throw",
      "try",
      "typeof",
      "unchecked",
      "unsafe",
      "using",
      "virtual",
      "void",
      "volatile",
      "while"
    ], s = [
      "add",
      "alias",
      "and",
      "ascending",
      "async",
      "await",
      "by",
      "descending",
      "equals",
      "from",
      "get",
      "global",
      "group",
      "init",
      "into",
      "join",
      "let",
      "nameof",
      "not",
      "notnull",
      "on",
      "or",
      "orderby",
      "partial",
      "remove",
      "select",
      "set",
      "unmanaged",
      "value|0",
      "var",
      "when",
      "where",
      "with",
      "yield"
    ], o = {
      keyword: i.concat(s),
      built_in: n,
      literal: a
    }, c = t.inherit(t.TITLE_MODE, { begin: "[a-zA-Z](\\.?\\w)*" }), l = {
      className: "number",
      variants: [
        { begin: "\\b(0b[01']+)" },
        { begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)" },
        { begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)" }
      ],
      relevance: 0
    }, u = {
      className: "string",
      begin: '@"',
      end: '"',
      contains: [{ begin: '""' }]
    }, d = t.inherit(u, { illegal: /\n/ }), g = {
      className: "subst",
      begin: /\{/,
      end: /\}/,
      keywords: o
    }, f = t.inherit(g, { illegal: /\n/ }), p = {
      className: "string",
      begin: /\$"/,
      end: '"',
      illegal: /\n/,
      contains: [
        { begin: /\{\{/ },
        { begin: /\}\}/ },
        t.BACKSLASH_ESCAPE,
        f
      ]
    }, _ = {
      className: "string",
      begin: /\$@"/,
      end: '"',
      contains: [
        { begin: /\{\{/ },
        { begin: /\}\}/ },
        { begin: '""' },
        g
      ]
    }, b = t.inherit(_, {
      illegal: /\n/,
      contains: [
        { begin: /\{\{/ },
        { begin: /\}\}/ },
        { begin: '""' },
        f
      ]
    });
    g.contains = [
      _,
      p,
      u,
      t.APOS_STRING_MODE,
      t.QUOTE_STRING_MODE,
      l,
      t.C_BLOCK_COMMENT_MODE
    ], f.contains = [
      b,
      p,
      d,
      t.APOS_STRING_MODE,
      t.QUOTE_STRING_MODE,
      l,
      t.inherit(t.C_BLOCK_COMMENT_MODE, { illegal: /\n/ })
    ];
    const E = { variants: [
      _,
      p,
      u,
      t.APOS_STRING_MODE,
      t.QUOTE_STRING_MODE
    ] }, N = {
      begin: "<",
      end: ">",
      contains: [
        { beginKeywords: "in out" },
        c
      ]
    }, w = t.IDENT_RE + "(<" + t.IDENT_RE + "(\\s*,\\s*" + t.IDENT_RE + ")*>)?(\\[\\])?", O = {
      // prevents expressions like `@class` from incorrect flagging
      // `class` as a keyword
      begin: "@" + t.IDENT_RE,
      relevance: 0
    };
    return {
      name: "C#",
      aliases: [
        "cs",
        "c#"
      ],
      keywords: o,
      illegal: /::/,
      contains: [
        t.COMMENT(
          "///",
          "$",
          {
            returnBegin: !0,
            contains: [
              {
                className: "doctag",
                variants: [
                  {
                    begin: "///",
                    relevance: 0
                  },
                  { begin: "<!--|-->" },
                  {
                    begin: "</?",
                    end: ">"
                  }
                ]
              }
            ]
          }
        ),
        t.C_LINE_COMMENT_MODE,
        t.C_BLOCK_COMMENT_MODE,
        {
          className: "meta",
          begin: "#",
          end: "$",
          keywords: { keyword: "if else elif endif define undef warning error line region endregion pragma checksum" }
        },
        E,
        l,
        {
          beginKeywords: "class interface",
          relevance: 0,
          end: /[{;=]/,
          illegal: /[^\s:,]/,
          contains: [
            { beginKeywords: "where class" },
            c,
            N,
            t.C_LINE_COMMENT_MODE,
            t.C_BLOCK_COMMENT_MODE
          ]
        },
        {
          beginKeywords: "namespace",
          relevance: 0,
          end: /[{;=]/,
          illegal: /[^\s:]/,
          contains: [
            c,
            t.C_LINE_COMMENT_MODE,
            t.C_BLOCK_COMMENT_MODE
          ]
        },
        {
          beginKeywords: "record",
          relevance: 0,
          end: /[{;=]/,
          illegal: /[^\s:]/,
          contains: [
            c,
            N,
            t.C_LINE_COMMENT_MODE,
            t.C_BLOCK_COMMENT_MODE
          ]
        },
        {
          // [Attributes("")]
          className: "meta",
          begin: "^\\s*\\[(?=[\\w])",
          excludeBegin: !0,
          end: "\\]",
          excludeEnd: !0,
          contains: [
            {
              className: "string",
              begin: /"/,
              end: /"/
            }
          ]
        },
        {
          // Expression keywords prevent 'keyword Name(...)' from being
          // recognized as a function definition
          beginKeywords: "new return throw await else",
          relevance: 0
        },
        {
          className: "function",
          begin: "(" + w + "\\s+)+" + t.IDENT_RE + "\\s*(<[^=]+>\\s*)?\\(",
          returnBegin: !0,
          end: /\s*[{;=]/,
          excludeEnd: !0,
          keywords: o,
          contains: [
            // prevents these from being highlighted `title`
            {
              beginKeywords: r.join(" "),
              relevance: 0
            },
            {
              begin: t.IDENT_RE + "\\s*(<[^=]+>\\s*)?\\(",
              returnBegin: !0,
              contains: [
                t.TITLE_MODE,
                N
              ],
              relevance: 0
            },
            { match: /\(\)/ },
            {
              className: "params",
              begin: /\(/,
              end: /\)/,
              excludeBegin: !0,
              excludeEnd: !0,
              keywords: o,
              relevance: 0,
              contains: [
                E,
                l,
                t.C_BLOCK_COMMENT_MODE
              ]
            },
            t.C_LINE_COMMENT_MODE,
            t.C_BLOCK_COMMENT_MODE
          ]
        },
        O
      ]
    };
  }
  return vt = e, vt;
}
var St, er;
function jo() {
  if (er)
    return St;
  er = 1;
  const e = (o) => ({
    IMPORTANT: {
      scope: "meta",
      begin: "!important"
    },
    BLOCK_COMMENT: o.C_BLOCK_COMMENT_MODE,
    HEXCOLOR: {
      scope: "number",
      begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
    },
    FUNCTION_DISPATCH: {
      className: "built_in",
      begin: /[\w-]+(?=\()/
    },
    ATTRIBUTE_SELECTOR_MODE: {
      scope: "selector-attr",
      begin: /\[/,
      end: /\]/,
      illegal: "$",
      contains: [
        o.APOS_STRING_MODE,
        o.QUOTE_STRING_MODE
      ]
    },
    CSS_NUMBER_MODE: {
      scope: "number",
      begin: o.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
      relevance: 0
    },
    CSS_VARIABLE: {
      className: "attr",
      begin: /--[A-Za-z_][A-Za-z0-9_-]*/
    }
  }), t = [
    "a",
    "abbr",
    "address",
    "article",
    "aside",
    "audio",
    "b",
    "blockquote",
    "body",
    "button",
    "canvas",
    "caption",
    "cite",
    "code",
    "dd",
    "del",
    "details",
    "dfn",
    "div",
    "dl",
    "dt",
    "em",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "header",
    "hgroup",
    "html",
    "i",
    "iframe",
    "img",
    "input",
    "ins",
    "kbd",
    "label",
    "legend",
    "li",
    "main",
    "mark",
    "menu",
    "nav",
    "object",
    "ol",
    "p",
    "q",
    "quote",
    "samp",
    "section",
    "span",
    "strong",
    "summary",
    "sup",
    "table",
    "tbody",
    "td",
    "textarea",
    "tfoot",
    "th",
    "thead",
    "time",
    "tr",
    "ul",
    "var",
    "video"
  ], n = [
    "any-hover",
    "any-pointer",
    "aspect-ratio",
    "color",
    "color-gamut",
    "color-index",
    "device-aspect-ratio",
    "device-height",
    "device-width",
    "display-mode",
    "forced-colors",
    "grid",
    "height",
    "hover",
    "inverted-colors",
    "monochrome",
    "orientation",
    "overflow-block",
    "overflow-inline",
    "pointer",
    "prefers-color-scheme",
    "prefers-contrast",
    "prefers-reduced-motion",
    "prefers-reduced-transparency",
    "resolution",
    "scan",
    "scripting",
    "update",
    "width",
    // TODO: find a better solution?
    "min-width",
    "max-width",
    "min-height",
    "max-height"
  ], r = [
    "active",
    "any-link",
    "blank",
    "checked",
    "current",
    "default",
    "defined",
    "dir",
    // dir()
    "disabled",
    "drop",
    "empty",
    "enabled",
    "first",
    "first-child",
    "first-of-type",
    "fullscreen",
    "future",
    "focus",
    "focus-visible",
    "focus-within",
    "has",
    // has()
    "host",
    // host or host()
    "host-context",
    // host-context()
    "hover",
    "indeterminate",
    "in-range",
    "invalid",
    "is",
    // is()
    "lang",
    // lang()
    "last-child",
    "last-of-type",
    "left",
    "link",
    "local-link",
    "not",
    // not()
    "nth-child",
    // nth-child()
    "nth-col",
    // nth-col()
    "nth-last-child",
    // nth-last-child()
    "nth-last-col",
    // nth-last-col()
    "nth-last-of-type",
    //nth-last-of-type()
    "nth-of-type",
    //nth-of-type()
    "only-child",
    "only-of-type",
    "optional",
    "out-of-range",
    "past",
    "placeholder-shown",
    "read-only",
    "read-write",
    "required",
    "right",
    "root",
    "scope",
    "target",
    "target-within",
    "user-invalid",
    "valid",
    "visited",
    "where"
    // where()
  ], a = [
    "after",
    "backdrop",
    "before",
    "cue",
    "cue-region",
    "first-letter",
    "first-line",
    "grammar-error",
    "marker",
    "part",
    "placeholder",
    "selection",
    "slotted",
    "spelling-error"
  ], i = [
    "align-content",
    "align-items",
    "align-self",
    "all",
    "animation",
    "animation-delay",
    "animation-direction",
    "animation-duration",
    "animation-fill-mode",
    "animation-iteration-count",
    "animation-name",
    "animation-play-state",
    "animation-timing-function",
    "backface-visibility",
    "background",
    "background-attachment",
    "background-blend-mode",
    "background-clip",
    "background-color",
    "background-image",
    "background-origin",
    "background-position",
    "background-repeat",
    "background-size",
    "block-size",
    "border",
    "border-block",
    "border-block-color",
    "border-block-end",
    "border-block-end-color",
    "border-block-end-style",
    "border-block-end-width",
    "border-block-start",
    "border-block-start-color",
    "border-block-start-style",
    "border-block-start-width",
    "border-block-style",
    "border-block-width",
    "border-bottom",
    "border-bottom-color",
    "border-bottom-left-radius",
    "border-bottom-right-radius",
    "border-bottom-style",
    "border-bottom-width",
    "border-collapse",
    "border-color",
    "border-image",
    "border-image-outset",
    "border-image-repeat",
    "border-image-slice",
    "border-image-source",
    "border-image-width",
    "border-inline",
    "border-inline-color",
    "border-inline-end",
    "border-inline-end-color",
    "border-inline-end-style",
    "border-inline-end-width",
    "border-inline-start",
    "border-inline-start-color",
    "border-inline-start-style",
    "border-inline-start-width",
    "border-inline-style",
    "border-inline-width",
    "border-left",
    "border-left-color",
    "border-left-style",
    "border-left-width",
    "border-radius",
    "border-right",
    "border-right-color",
    "border-right-style",
    "border-right-width",
    "border-spacing",
    "border-style",
    "border-top",
    "border-top-color",
    "border-top-left-radius",
    "border-top-right-radius",
    "border-top-style",
    "border-top-width",
    "border-width",
    "bottom",
    "box-decoration-break",
    "box-shadow",
    "box-sizing",
    "break-after",
    "break-before",
    "break-inside",
    "caption-side",
    "caret-color",
    "clear",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "column-count",
    "column-fill",
    "column-gap",
    "column-rule",
    "column-rule-color",
    "column-rule-style",
    "column-rule-width",
    "column-span",
    "column-width",
    "columns",
    "contain",
    "content",
    "content-visibility",
    "counter-increment",
    "counter-reset",
    "cue",
    "cue-after",
    "cue-before",
    "cursor",
    "direction",
    "display",
    "empty-cells",
    "filter",
    "flex",
    "flex-basis",
    "flex-direction",
    "flex-flow",
    "flex-grow",
    "flex-shrink",
    "flex-wrap",
    "float",
    "flow",
    "font",
    "font-display",
    "font-family",
    "font-feature-settings",
    "font-kerning",
    "font-language-override",
    "font-size",
    "font-size-adjust",
    "font-smoothing",
    "font-stretch",
    "font-style",
    "font-synthesis",
    "font-variant",
    "font-variant-caps",
    "font-variant-east-asian",
    "font-variant-ligatures",
    "font-variant-numeric",
    "font-variant-position",
    "font-variation-settings",
    "font-weight",
    "gap",
    "glyph-orientation-vertical",
    "grid",
    "grid-area",
    "grid-auto-columns",
    "grid-auto-flow",
    "grid-auto-rows",
    "grid-column",
    "grid-column-end",
    "grid-column-start",
    "grid-gap",
    "grid-row",
    "grid-row-end",
    "grid-row-start",
    "grid-template",
    "grid-template-areas",
    "grid-template-columns",
    "grid-template-rows",
    "hanging-punctuation",
    "height",
    "hyphens",
    "icon",
    "image-orientation",
    "image-rendering",
    "image-resolution",
    "ime-mode",
    "inline-size",
    "isolation",
    "justify-content",
    "left",
    "letter-spacing",
    "line-break",
    "line-height",
    "list-style",
    "list-style-image",
    "list-style-position",
    "list-style-type",
    "margin",
    "margin-block",
    "margin-block-end",
    "margin-block-start",
    "margin-bottom",
    "margin-inline",
    "margin-inline-end",
    "margin-inline-start",
    "margin-left",
    "margin-right",
    "margin-top",
    "marks",
    "mask",
    "mask-border",
    "mask-border-mode",
    "mask-border-outset",
    "mask-border-repeat",
    "mask-border-slice",
    "mask-border-source",
    "mask-border-width",
    "mask-clip",
    "mask-composite",
    "mask-image",
    "mask-mode",
    "mask-origin",
    "mask-position",
    "mask-repeat",
    "mask-size",
    "mask-type",
    "max-block-size",
    "max-height",
    "max-inline-size",
    "max-width",
    "min-block-size",
    "min-height",
    "min-inline-size",
    "min-width",
    "mix-blend-mode",
    "nav-down",
    "nav-index",
    "nav-left",
    "nav-right",
    "nav-up",
    "none",
    "normal",
    "object-fit",
    "object-position",
    "opacity",
    "order",
    "orphans",
    "outline",
    "outline-color",
    "outline-offset",
    "outline-style",
    "outline-width",
    "overflow",
    "overflow-wrap",
    "overflow-x",
    "overflow-y",
    "padding",
    "padding-block",
    "padding-block-end",
    "padding-block-start",
    "padding-bottom",
    "padding-inline",
    "padding-inline-end",
    "padding-inline-start",
    "padding-left",
    "padding-right",
    "padding-top",
    "page-break-after",
    "page-break-before",
    "page-break-inside",
    "pause",
    "pause-after",
    "pause-before",
    "perspective",
    "perspective-origin",
    "pointer-events",
    "position",
    "quotes",
    "resize",
    "rest",
    "rest-after",
    "rest-before",
    "right",
    "row-gap",
    "scroll-margin",
    "scroll-margin-block",
    "scroll-margin-block-end",
    "scroll-margin-block-start",
    "scroll-margin-bottom",
    "scroll-margin-inline",
    "scroll-margin-inline-end",
    "scroll-margin-inline-start",
    "scroll-margin-left",
    "scroll-margin-right",
    "scroll-margin-top",
    "scroll-padding",
    "scroll-padding-block",
    "scroll-padding-block-end",
    "scroll-padding-block-start",
    "scroll-padding-bottom",
    "scroll-padding-inline",
    "scroll-padding-inline-end",
    "scroll-padding-inline-start",
    "scroll-padding-left",
    "scroll-padding-right",
    "scroll-padding-top",
    "scroll-snap-align",
    "scroll-snap-stop",
    "scroll-snap-type",
    "scrollbar-color",
    "scrollbar-gutter",
    "scrollbar-width",
    "shape-image-threshold",
    "shape-margin",
    "shape-outside",
    "speak",
    "speak-as",
    "src",
    // @font-face
    "tab-size",
    "table-layout",
    "text-align",
    "text-align-all",
    "text-align-last",
    "text-combine-upright",
    "text-decoration",
    "text-decoration-color",
    "text-decoration-line",
    "text-decoration-style",
    "text-emphasis",
    "text-emphasis-color",
    "text-emphasis-position",
    "text-emphasis-style",
    "text-indent",
    "text-justify",
    "text-orientation",
    "text-overflow",
    "text-rendering",
    "text-shadow",
    "text-transform",
    "text-underline-position",
    "top",
    "transform",
    "transform-box",
    "transform-origin",
    "transform-style",
    "transition",
    "transition-delay",
    "transition-duration",
    "transition-property",
    "transition-timing-function",
    "unicode-bidi",
    "vertical-align",
    "visibility",
    "voice-balance",
    "voice-duration",
    "voice-family",
    "voice-pitch",
    "voice-range",
    "voice-rate",
    "voice-stress",
    "voice-volume",
    "white-space",
    "widows",
    "width",
    "will-change",
    "word-break",
    "word-spacing",
    "word-wrap",
    "writing-mode",
    "z-index"
    // reverse makes sure longer attributes `font-weight` are matched fully
    // instead of getting false positives on say `font`
  ].reverse();
  function s(o) {
    const c = o.regex, l = e(o), u = { begin: /-(webkit|moz|ms|o)-(?=[a-z])/ }, d = "and or not only", g = /@-?\w[\w]*(-\w+)*/, f = "[a-zA-Z-][a-zA-Z0-9_-]*", p = [
      o.APOS_STRING_MODE,
      o.QUOTE_STRING_MODE
    ];
    return {
      name: "CSS",
      case_insensitive: !0,
      illegal: /[=|'\$]/,
      keywords: { keyframePosition: "from to" },
      classNameAliases: {
        // for visual continuity with `tag {}` and because we
        // don't have a great class for this?
        keyframePosition: "selector-tag"
      },
      contains: [
        l.BLOCK_COMMENT,
        u,
        // to recognize keyframe 40% etc which are outside the scope of our
        // attribute value mode
        l.CSS_NUMBER_MODE,
        {
          className: "selector-id",
          begin: /#[A-Za-z0-9_-]+/,
          relevance: 0
        },
        {
          className: "selector-class",
          begin: "\\." + f,
          relevance: 0
        },
        l.ATTRIBUTE_SELECTOR_MODE,
        {
          className: "selector-pseudo",
          variants: [
            { begin: ":(" + r.join("|") + ")" },
            { begin: ":(:)?(" + a.join("|") + ")" }
          ]
        },
        // we may actually need this (12/2020)
        // { // pseudo-selector params
        //   begin: /\(/,
        //   end: /\)/,
        //   contains: [ hljs.CSS_NUMBER_MODE ]
        // },
        l.CSS_VARIABLE,
        {
          className: "attribute",
          begin: "\\b(" + i.join("|") + ")\\b"
        },
        // attribute values
        {
          begin: /:/,
          end: /[;}{]/,
          contains: [
            l.BLOCK_COMMENT,
            l.HEXCOLOR,
            l.IMPORTANT,
            l.CSS_NUMBER_MODE,
            ...p,
            // needed to highlight these as strings and to avoid issues with
            // illegal characters that might be inside urls that would tigger the
            // languages illegal stack
            {
              begin: /(url|data-uri)\(/,
              end: /\)/,
              relevance: 0,
              // from keywords
              keywords: { built_in: "url data-uri" },
              contains: [
                ...p,
                {
                  className: "string",
                  // any character other than `)` as in `url()` will be the start
                  // of a string, which ends with `)` (from the parent mode)
                  begin: /[^)]/,
                  endsWithParent: !0,
                  excludeEnd: !0
                }
              ]
            },
            l.FUNCTION_DISPATCH
          ]
        },
        {
          begin: c.lookahead(/@/),
          end: "[{;]",
          relevance: 0,
          illegal: /:/,
          // break on Less variables @var: ...
          contains: [
            {
              className: "keyword",
              begin: g
            },
            {
              begin: /\s/,
              endsWithParent: !0,
              excludeEnd: !0,
              relevance: 0,
              keywords: {
                $pattern: /[a-z-]+/,
                keyword: d,
                attribute: n.join(" ")
              },
              contains: [
                {
                  begin: /[a-z-]+(?=:)/,
                  className: "attribute"
                },
                ...p,
                l.CSS_NUMBER_MODE
              ]
            }
          ]
        },
        {
          className: "selector-tag",
          begin: "\\b(" + t.join("|") + ")\\b"
        }
      ]
    };
  }
  return St = s, St;
}
var Tt, tr;
function ec() {
  if (tr)
    return Tt;
  tr = 1;
  function e(t) {
    const n = t.regex, r = {
      begin: /<\/?[A-Za-z_]/,
      end: ">",
      subLanguage: "xml",
      relevance: 0
    }, a = {
      begin: "^[-\\*]{3,}",
      end: "$"
    }, i = {
      className: "code",
      variants: [
        // TODO: fix to allow these to work with sublanguage also
        { begin: "(`{3,})[^`](.|\\n)*?\\1`*[ ]*" },
        { begin: "(~{3,})[^~](.|\\n)*?\\1~*[ ]*" },
        // needed to allow markdown as a sublanguage to work
        {
          begin: "```",
          end: "```+[ ]*$"
        },
        {
          begin: "~~~",
          end: "~~~+[ ]*$"
        },
        { begin: "`.+?`" },
        {
          begin: "(?=^( {4}|\\t))",
          // use contains to gobble up multiple lines to allow the block to be whatever size
          // but only have a single open/close tag vs one per line
          contains: [
            {
              begin: "^( {4}|\\t)",
              end: "(\\n)$"
            }
          ],
          relevance: 0
        }
      ]
    }, s = {
      className: "bullet",
      begin: "^[ 	]*([*+-]|(\\d+\\.))(?=\\s+)",
      end: "\\s+",
      excludeEnd: !0
    }, o = {
      begin: /^\[[^\n]+\]:/,
      returnBegin: !0,
      contains: [
        {
          className: "symbol",
          begin: /\[/,
          end: /\]/,
          excludeBegin: !0,
          excludeEnd: !0
        },
        {
          className: "link",
          begin: /:\s*/,
          end: /$/,
          excludeBegin: !0
        }
      ]
    }, c = /[A-Za-z][A-Za-z0-9+.-]*/, l = {
      variants: [
        // too much like nested array access in so many languages
        // to have any real relevance
        {
          begin: /\[.+?\]\[.*?\]/,
          relevance: 0
        },
        // popular internet URLs
        {
          begin: /\[.+?\]\(((data|javascript|mailto):|(?:http|ftp)s?:\/\/).*?\)/,
          relevance: 2
        },
        {
          begin: n.concat(/\[.+?\]\(/, c, /:\/\/.*?\)/),
          relevance: 2
        },
        // relative urls
        {
          begin: /\[.+?\]\([./?&#].*?\)/,
          relevance: 1
        },
        // whatever else, lower relevance (might not be a link at all)
        {
          begin: /\[.*?\]\(.*?\)/,
          relevance: 0
        }
      ],
      returnBegin: !0,
      contains: [
        {
          // empty strings for alt or link text
          match: /\[(?=\])/
        },
        {
          className: "string",
          relevance: 0,
          begin: "\\[",
          end: "\\]",
          excludeBegin: !0,
          returnEnd: !0
        },
        {
          className: "link",
          relevance: 0,
          begin: "\\]\\(",
          end: "\\)",
          excludeBegin: !0,
          excludeEnd: !0
        },
        {
          className: "symbol",
          relevance: 0,
          begin: "\\]\\[",
          end: "\\]",
          excludeBegin: !0,
          excludeEnd: !0
        }
      ]
    }, u = {
      className: "strong",
      contains: [],
      // defined later
      variants: [
        {
          begin: /_{2}(?!\s)/,
          end: /_{2}/
        },
        {
          begin: /\*{2}(?!\s)/,
          end: /\*{2}/
        }
      ]
    }, d = {
      className: "emphasis",
      contains: [],
      // defined later
      variants: [
        {
          begin: /\*(?![*\s])/,
          end: /\*/
        },
        {
          begin: /_(?![_\s])/,
          end: /_/,
          relevance: 0
        }
      ]
    }, g = t.inherit(u, { contains: [] }), f = t.inherit(d, { contains: [] });
    u.contains.push(f), d.contains.push(g);
    let p = [
      r,
      l
    ];
    return [
      u,
      d,
      g,
      f
    ].forEach((E) => {
      E.contains = E.contains.concat(p);
    }), p = p.concat(u, d), {
      name: "Markdown",
      aliases: [
        "md",
        "mkdown",
        "mkd"
      ],
      contains: [
        {
          className: "section",
          variants: [
            {
              begin: "^#{1,6}",
              end: "$",
              contains: p
            },
            {
              begin: "(?=^.+?\\n[=-]{2,}$)",
              contains: [
                { begin: "^[=-]*$" },
                {
                  begin: "^",
                  end: "\\n",
                  contains: p
                }
              ]
            }
          ]
        },
        r,
        s,
        u,
        d,
        {
          className: "quote",
          begin: "^>\\s+",
          contains: p,
          end: "$"
        },
        i,
        a,
        l,
        o
      ]
    };
  }
  return Tt = e, Tt;
}
var Ot, nr;
function tc() {
  if (nr)
    return Ot;
  nr = 1;
  function e(t) {
    const n = t.regex;
    return {
      name: "Diff",
      aliases: ["patch"],
      contains: [
        {
          className: "meta",
          relevance: 10,
          match: n.either(
            /^@@ +-\d+,\d+ +\+\d+,\d+ +@@/,
            /^\*\*\* +\d+,\d+ +\*\*\*\*$/,
            /^--- +\d+,\d+ +----$/
          )
        },
        {
          className: "comment",
          variants: [
            {
              begin: n.either(
                /Index: /,
                /^index/,
                /={3,}/,
                /^-{3}/,
                /^\*{3} /,
                /^\+{3}/,
                /^diff --git/
              ),
              end: /$/
            },
            { match: /^\*{15}$/ }
          ]
        },
        {
          className: "addition",
          begin: /^\+/,
          end: /$/
        },
        {
          className: "deletion",
          begin: /^-/,
          end: /$/
        },
        {
          className: "addition",
          begin: /^!/,
          end: /$/
        }
      ]
    };
  }
  return Ot = e, Ot;
}
var Mt, rr;
function nc() {
  if (rr)
    return Mt;
  rr = 1;
  function e(t) {
    const n = t.regex, r = "([a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?)", a = n.either(
      /\b([A-Z]+[a-z0-9]+)+/,
      // ends in caps
      /\b([A-Z]+[a-z0-9]+)+[A-Z]+/
    ), i = n.concat(a, /(::\w+)*/), o = {
      "variable.constant": [
        "__FILE__",
        "__LINE__",
        "__ENCODING__"
      ],
      "variable.language": [
        "self",
        "super"
      ],
      keyword: [
        "alias",
        "and",
        "begin",
        "BEGIN",
        "break",
        "case",
        "class",
        "defined",
        "do",
        "else",
        "elsif",
        "end",
        "END",
        "ensure",
        "for",
        "if",
        "in",
        "module",
        "next",
        "not",
        "or",
        "redo",
        "require",
        "rescue",
        "retry",
        "return",
        "then",
        "undef",
        "unless",
        "until",
        "when",
        "while",
        "yield",
        ...[
          "include",
          "extend",
          "prepend",
          "public",
          "private",
          "protected",
          "raise",
          "throw"
        ]
      ],
      built_in: [
        "proc",
        "lambda",
        "attr_accessor",
        "attr_reader",
        "attr_writer",
        "define_method",
        "private_constant",
        "module_function"
      ],
      literal: [
        "true",
        "false",
        "nil"
      ]
    }, c = {
      className: "doctag",
      begin: "@[A-Za-z]+"
    }, l = {
      begin: "#<",
      end: ">"
    }, u = [
      t.COMMENT(
        "#",
        "$",
        { contains: [c] }
      ),
      t.COMMENT(
        "^=begin",
        "^=end",
        {
          contains: [c],
          relevance: 10
        }
      ),
      t.COMMENT("^__END__", t.MATCH_NOTHING_RE)
    ], d = {
      className: "subst",
      begin: /#\{/,
      end: /\}/,
      keywords: o
    }, g = {
      className: "string",
      contains: [
        t.BACKSLASH_ESCAPE,
        d
      ],
      variants: [
        {
          begin: /'/,
          end: /'/
        },
        {
          begin: /"/,
          end: /"/
        },
        {
          begin: /`/,
          end: /`/
        },
        {
          begin: /%[qQwWx]?\(/,
          end: /\)/
        },
        {
          begin: /%[qQwWx]?\[/,
          end: /\]/
        },
        {
          begin: /%[qQwWx]?\{/,
          end: /\}/
        },
        {
          begin: /%[qQwWx]?</,
          end: />/
        },
        {
          begin: /%[qQwWx]?\//,
          end: /\//
        },
        {
          begin: /%[qQwWx]?%/,
          end: /%/
        },
        {
          begin: /%[qQwWx]?-/,
          end: /-/
        },
        {
          begin: /%[qQwWx]?\|/,
          end: /\|/
        },
        // in the following expressions, \B in the beginning suppresses recognition of ?-sequences
        // where ? is the last character of a preceding identifier, as in: `func?4`
        { begin: /\B\?(\\\d{1,3})/ },
        { begin: /\B\?(\\x[A-Fa-f0-9]{1,2})/ },
        { begin: /\B\?(\\u\{?[A-Fa-f0-9]{1,6}\}?)/ },
        { begin: /\B\?(\\M-\\C-|\\M-\\c|\\c\\M-|\\M-|\\C-\\M-)[\x20-\x7e]/ },
        { begin: /\B\?\\(c|C-)[\x20-\x7e]/ },
        { begin: /\B\?\\?\S/ },
        // heredocs
        {
          // this guard makes sure that we have an entire heredoc and not a false
          // positive (auto-detect, etc.)
          begin: n.concat(
            /<<[-~]?'?/,
            n.lookahead(/(\w+)(?=\W)[^\n]*\n(?:[^\n]*\n)*?\s*\1\b/)
          ),
          contains: [
            t.END_SAME_AS_BEGIN({
              begin: /(\w+)/,
              end: /(\w+)/,
              contains: [
                t.BACKSLASH_ESCAPE,
                d
              ]
            })
          ]
        }
      ]
    }, f = "[1-9](_?[0-9])*|0", p = "[0-9](_?[0-9])*", _ = {
      className: "number",
      relevance: 0,
      variants: [
        // decimal integer/float, optionally exponential or rational, optionally imaginary
        { begin: `\\b(${f})(\\.(${p}))?([eE][+-]?(${p})|r)?i?\\b` },
        // explicit decimal/binary/octal/hexadecimal integer,
        // optionally rational and/or imaginary
        { begin: "\\b0[dD][0-9](_?[0-9])*r?i?\\b" },
        { begin: "\\b0[bB][0-1](_?[0-1])*r?i?\\b" },
        { begin: "\\b0[oO][0-7](_?[0-7])*r?i?\\b" },
        { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*r?i?\\b" },
        // 0-prefixed implicit octal integer, optionally rational and/or imaginary
        { begin: "\\b0(_?[0-7])+r?i?\\b" }
      ]
    }, b = {
      variants: [
        {
          match: /\(\)/
        },
        {
          className: "params",
          begin: /\(/,
          end: /(?=\))/,
          excludeBegin: !0,
          endsParent: !0,
          keywords: o
        }
      ]
    }, k = [
      g,
      {
        variants: [
          {
            match: [
              /class\s+/,
              i,
              /\s+<\s+/,
              i
            ]
          },
          {
            match: [
              /\b(class|module)\s+/,
              i
            ]
          }
        ],
        scope: {
          2: "title.class",
          4: "title.class.inherited"
        },
        keywords: o
      },
      {
        match: [
          /(include|extend)\s+/,
          i
        ],
        scope: {
          2: "title.class"
        },
        keywords: o
      },
      {
        relevance: 0,
        match: [
          i,
          /\.new[. (]/
        ],
        scope: {
          1: "title.class"
        }
      },
      {
        relevance: 0,
        match: /\b[A-Z][A-Z_0-9]+\b/,
        className: "variable.constant"
      },
      {
        relevance: 0,
        match: a,
        scope: "title.class"
      },
      {
        match: [
          /def/,
          /\s+/,
          r
        ],
        scope: {
          1: "keyword",
          3: "title.function"
        },
        contains: [
          b
        ]
      },
      {
        // swallow namespace qualifiers before symbols
        begin: t.IDENT_RE + "::"
      },
      {
        className: "symbol",
        begin: t.UNDERSCORE_IDENT_RE + "(!|\\?)?:",
        relevance: 0
      },
      {
        className: "symbol",
        begin: ":(?!\\s)",
        contains: [
          g,
          { begin: r }
        ],
        relevance: 0
      },
      _,
      {
        // negative-look forward attempts to prevent false matches like:
        // @ident@ or $ident$ that might indicate this is not ruby at all
        className: "variable",
        begin: "(\\$\\W)|((\\$|@@?)(\\w+))(?=[^@$?])(?![A-Za-z])(?![@$?'])"
      },
      {
        className: "params",
        begin: /\|/,
        end: /\|/,
        excludeBegin: !0,
        excludeEnd: !0,
        relevance: 0,
        // this could be a lot of things (in other languages) other than params
        keywords: o
      },
      {
        // regexp container
        begin: "(" + t.RE_STARTERS_RE + "|unless)\\s*",
        keywords: "unless",
        contains: [
          {
            className: "regexp",
            contains: [
              t.BACKSLASH_ESCAPE,
              d
            ],
            illegal: /\n/,
            variants: [
              {
                begin: "/",
                end: "/[a-z]*"
              },
              {
                begin: /%r\{/,
                end: /\}[a-z]*/
              },
              {
                begin: "%r\\(",
                end: "\\)[a-z]*"
              },
              {
                begin: "%r!",
                end: "![a-z]*"
              },
              {
                begin: "%r\\[",
                end: "\\][a-z]*"
              }
            ]
          }
        ].concat(l, u),
        relevance: 0
      }
    ].concat(l, u);
    d.contains = k, b.contains = k;
    const z = [
      {
        begin: /^\s*=>/,
        starts: {
          end: "$",
          contains: k
        }
      },
      {
        className: "meta.prompt",
        begin: "^(" + "[>?]>" + "|" + "[\\w#]+\\(\\w+\\):\\d+:\\d+[>*]" + "|" + "(\\w+-)?\\d+\\.\\d+\\.\\d+(p\\d+)?[^\\d][^>]+>" + ")(?=[ ])",
        starts: {
          end: "$",
          keywords: o,
          contains: k
        }
      }
    ];
    return u.unshift(l), {
      name: "Ruby",
      aliases: [
        "rb",
        "gemspec",
        "podspec",
        "thor",
        "irb"
      ],
      keywords: o,
      illegal: /\/\*/,
      contains: [t.SHEBANG({ binary: "ruby" })].concat(z).concat(u).concat(k)
    };
  }
  return Mt = e, Mt;
}
var Rt, ar;
function rc() {
  if (ar)
    return Rt;
  ar = 1;
  function e(t) {
    const s = {
      keyword: [
        "break",
        "case",
        "chan",
        "const",
        "continue",
        "default",
        "defer",
        "else",
        "fallthrough",
        "for",
        "func",
        "go",
        "goto",
        "if",
        "import",
        "interface",
        "map",
        "package",
        "range",
        "return",
        "select",
        "struct",
        "switch",
        "type",
        "var"
      ],
      type: [
        "bool",
        "byte",
        "complex64",
        "complex128",
        "error",
        "float32",
        "float64",
        "int8",
        "int16",
        "int32",
        "int64",
        "string",
        "uint8",
        "uint16",
        "uint32",
        "uint64",
        "int",
        "uint",
        "uintptr",
        "rune"
      ],
      literal: [
        "true",
        "false",
        "iota",
        "nil"
      ],
      built_in: [
        "append",
        "cap",
        "close",
        "complex",
        "copy",
        "imag",
        "len",
        "make",
        "new",
        "panic",
        "print",
        "println",
        "real",
        "recover",
        "delete"
      ]
    };
    return {
      name: "Go",
      aliases: ["golang"],
      keywords: s,
      illegal: "</",
      contains: [
        t.C_LINE_COMMENT_MODE,
        t.C_BLOCK_COMMENT_MODE,
        {
          className: "string",
          variants: [
            t.QUOTE_STRING_MODE,
            t.APOS_STRING_MODE,
            {
              begin: "`",
              end: "`"
            }
          ]
        },
        {
          className: "number",
          variants: [
            {
              begin: t.C_NUMBER_RE + "[i]",
              relevance: 1
            },
            t.C_NUMBER_MODE
          ]
        },
        {
          begin: /:=/
          // relevance booster
        },
        {
          className: "function",
          beginKeywords: "func",
          end: "\\s*(\\{|$)",
          excludeEnd: !0,
          contains: [
            t.TITLE_MODE,
            {
              className: "params",
              begin: /\(/,
              end: /\)/,
              endsParent: !0,
              keywords: s,
              illegal: /["']/
            }
          ]
        }
      ]
    };
  }
  return Rt = e, Rt;
}
var At, ir;
function ac() {
  if (ir)
    return At;
  ir = 1;
  function e(t) {
    const n = t.regex, r = /[_A-Za-z][_0-9A-Za-z]*/;
    return {
      name: "GraphQL",
      aliases: ["gql"],
      case_insensitive: !0,
      disableAutodetect: !1,
      keywords: {
        keyword: [
          "query",
          "mutation",
          "subscription",
          "type",
          "input",
          "schema",
          "directive",
          "interface",
          "union",
          "scalar",
          "fragment",
          "enum",
          "on"
        ],
        literal: [
          "true",
          "false",
          "null"
        ]
      },
      contains: [
        t.HASH_COMMENT_MODE,
        t.QUOTE_STRING_MODE,
        t.NUMBER_MODE,
        {
          scope: "punctuation",
          match: /[.]{3}/,
          relevance: 0
        },
        {
          scope: "punctuation",
          begin: /[\!\(\)\:\=\[\]\{\|\}]{1}/,
          relevance: 0
        },
        {
          scope: "variable",
          begin: /\$/,
          end: /\W/,
          excludeEnd: !0,
          relevance: 0
        },
        {
          scope: "meta",
          match: /@\w+/,
          excludeEnd: !0
        },
        {
          scope: "symbol",
          begin: n.concat(r, n.lookahead(/\s*:/)),
          relevance: 0
        }
      ],
      illegal: [
        /[;<']/,
        /BEGIN/
      ]
    };
  }
  return At = e, At;
}
var kt, sr;
function ic() {
  if (sr)
    return kt;
  sr = 1;
  function e(t) {
    const n = t.regex, r = {
      className: "number",
      relevance: 0,
      variants: [
        { begin: /([+-]+)?[\d]+_[\d_]+/ },
        { begin: t.NUMBER_RE }
      ]
    }, a = t.COMMENT();
    a.variants = [
      {
        begin: /;/,
        end: /$/
      },
      {
        begin: /#/,
        end: /$/
      }
    ];
    const i = {
      className: "variable",
      variants: [
        { begin: /\$[\w\d"][\w\d_]*/ },
        { begin: /\$\{(.*?)\}/ }
      ]
    }, s = {
      className: "literal",
      begin: /\bon|off|true|false|yes|no\b/
    }, o = {
      className: "string",
      contains: [t.BACKSLASH_ESCAPE],
      variants: [
        {
          begin: "'''",
          end: "'''",
          relevance: 10
        },
        {
          begin: '"""',
          end: '"""',
          relevance: 10
        },
        {
          begin: '"',
          end: '"'
        },
        {
          begin: "'",
          end: "'"
        }
      ]
    }, c = {
      begin: /\[/,
      end: /\]/,
      contains: [
        a,
        s,
        i,
        o,
        r,
        "self"
      ],
      relevance: 0
    }, l = /[A-Za-z0-9_-]+/, u = /"(\\"|[^"])*"/, d = /'[^']*'/, g = n.either(
      l,
      u,
      d
    ), f = n.concat(
      g,
      "(\\s*\\.\\s*",
      g,
      ")*",
      n.lookahead(/\s*=\s*[^#\s]/)
    );
    return {
      name: "TOML, also INI",
      aliases: ["toml"],
      case_insensitive: !0,
      illegal: /\S/,
      contains: [
        a,
        {
          className: "section",
          begin: /\[+/,
          end: /\]+/
        },
        {
          begin: f,
          className: "attr",
          starts: {
            end: /$/,
            contains: [
              a,
              c,
              s,
              i,
              o,
              r
            ]
          }
        }
      ]
    };
  }
  return kt = e, kt;
}
var It, or;
function sc() {
  if (or)
    return It;
  or = 1;
  var e = "[0-9](_*[0-9])*", t = `\\.(${e})`, n = "[0-9a-fA-F](_*[0-9a-fA-F])*", r = {
    className: "number",
    variants: [
      // DecimalFloatingPointLiteral
      // including ExponentPart
      { begin: `(\\b(${e})((${t})|\\.)?|(${t}))[eE][+-]?(${e})[fFdD]?\\b` },
      // excluding ExponentPart
      { begin: `\\b(${e})((${t})[fFdD]?\\b|\\.([fFdD]\\b)?)` },
      { begin: `(${t})[fFdD]?\\b` },
      { begin: `\\b(${e})[fFdD]\\b` },
      // HexadecimalFloatingPointLiteral
      { begin: `\\b0[xX]((${n})\\.?|(${n})?\\.(${n}))[pP][+-]?(${e})[fFdD]?\\b` },
      // DecimalIntegerLiteral
      { begin: "\\b(0|[1-9](_*[0-9])*)[lL]?\\b" },
      // HexIntegerLiteral
      { begin: `\\b0[xX](${n})[lL]?\\b` },
      // OctalIntegerLiteral
      { begin: "\\b0(_*[0-7])*[lL]?\\b" },
      // BinaryIntegerLiteral
      { begin: "\\b0[bB][01](_*[01])*[lL]?\\b" }
    ],
    relevance: 0
  };
  function a(s, o, c) {
    return c === -1 ? "" : s.replace(o, (l) => a(s, o, c - 1));
  }
  function i(s) {
    const o = s.regex, c = "[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*", l = c + a("(?:<" + c + "~~~(?:\\s*,\\s*" + c + "~~~)*>)?", /~~~/g, 2), p = {
      keyword: [
        "synchronized",
        "abstract",
        "private",
        "var",
        "static",
        "if",
        "const ",
        "for",
        "while",
        "strictfp",
        "finally",
        "protected",
        "import",
        "native",
        "final",
        "void",
        "enum",
        "else",
        "break",
        "transient",
        "catch",
        "instanceof",
        "volatile",
        "case",
        "assert",
        "package",
        "default",
        "public",
        "try",
        "switch",
        "continue",
        "throws",
        "protected",
        "public",
        "private",
        "module",
        "requires",
        "exports",
        "do",
        "sealed",
        "yield",
        "permits"
      ],
      literal: [
        "false",
        "true",
        "null"
      ],
      type: [
        "char",
        "boolean",
        "long",
        "float",
        "int",
        "byte",
        "short",
        "double"
      ],
      built_in: [
        "super",
        "this"
      ]
    }, _ = {
      className: "meta",
      begin: "@" + c,
      contains: [
        {
          begin: /\(/,
          end: /\)/,
          contains: ["self"]
          // allow nested () inside our annotation
        }
      ]
    }, b = {
      className: "params",
      begin: /\(/,
      end: /\)/,
      keywords: p,
      relevance: 0,
      contains: [s.C_BLOCK_COMMENT_MODE],
      endsParent: !0
    };
    return {
      name: "Java",
      aliases: ["jsp"],
      keywords: p,
      illegal: /<\/|#/,
      contains: [
        s.COMMENT(
          "/\\*\\*",
          "\\*/",
          {
            relevance: 0,
            contains: [
              {
                // eat up @'s in emails to prevent them to be recognized as doctags
                begin: /\w+@/,
                relevance: 0
              },
              {
                className: "doctag",
                begin: "@[A-Za-z]+"
              }
            ]
          }
        ),
        // relevance boost
        {
          begin: /import java\.[a-z]+\./,
          keywords: "import",
          relevance: 2
        },
        s.C_LINE_COMMENT_MODE,
        s.C_BLOCK_COMMENT_MODE,
        {
          begin: /"""/,
          end: /"""/,
          className: "string",
          contains: [s.BACKSLASH_ESCAPE]
        },
        s.APOS_STRING_MODE,
        s.QUOTE_STRING_MODE,
        {
          match: [
            /\b(?:class|interface|enum|extends|implements|new)/,
            /\s+/,
            c
          ],
          className: {
            1: "keyword",
            3: "title.class"
          }
        },
        {
          // Exceptions for hyphenated keywords
          match: /non-sealed/,
          scope: "keyword"
        },
        {
          begin: [
            o.concat(/(?!else)/, c),
            /\s+/,
            c,
            /\s+/,
            /=(?!=)/
          ],
          className: {
            1: "type",
            3: "variable",
            5: "operator"
          }
        },
        {
          begin: [
            /record/,
            /\s+/,
            c
          ],
          className: {
            1: "keyword",
            3: "title.class"
          },
          contains: [
            b,
            s.C_LINE_COMMENT_MODE,
            s.C_BLOCK_COMMENT_MODE
          ]
        },
        {
          // Expression keywords prevent 'keyword Name(...)' from being
          // recognized as a function definition
          beginKeywords: "new throw return else",
          relevance: 0
        },
        {
          begin: [
            "(?:" + l + "\\s+)",
            s.UNDERSCORE_IDENT_RE,
            /\s*(?=\()/
          ],
          className: { 2: "title.function" },
          keywords: p,
          contains: [
            {
              className: "params",
              begin: /\(/,
              end: /\)/,
              keywords: p,
              relevance: 0,
              contains: [
                _,
                s.APOS_STRING_MODE,
                s.QUOTE_STRING_MODE,
                r,
                s.C_BLOCK_COMMENT_MODE
              ]
            },
            s.C_LINE_COMMENT_MODE,
            s.C_BLOCK_COMMENT_MODE
          ]
        },
        r,
        _
      ]
    };
  }
  return It = i, It;
}
var Ct, cr;
function oc() {
  if (cr)
    return Ct;
  cr = 1;
  const e = "[A-Za-z$_][0-9A-Za-z$_]*", t = [
    "as",
    // for exports
    "in",
    "of",
    "if",
    "for",
    "while",
    "finally",
    "var",
    "new",
    "function",
    "do",
    "return",
    "void",
    "else",
    "break",
    "catch",
    "instanceof",
    "with",
    "throw",
    "case",
    "default",
    "try",
    "switch",
    "continue",
    "typeof",
    "delete",
    "let",
    "yield",
    "const",
    "class",
    // JS handles these with a special rule
    // "get",
    // "set",
    "debugger",
    "async",
    "await",
    "static",
    "import",
    "from",
    "export",
    "extends"
  ], n = [
    "true",
    "false",
    "null",
    "undefined",
    "NaN",
    "Infinity"
  ], r = [
    // Fundamental objects
    "Object",
    "Function",
    "Boolean",
    "Symbol",
    // numbers and dates
    "Math",
    "Date",
    "Number",
    "BigInt",
    // text
    "String",
    "RegExp",
    // Indexed collections
    "Array",
    "Float32Array",
    "Float64Array",
    "Int8Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Int16Array",
    "Int32Array",
    "Uint16Array",
    "Uint32Array",
    "BigInt64Array",
    "BigUint64Array",
    // Keyed collections
    "Set",
    "Map",
    "WeakSet",
    "WeakMap",
    // Structured data
    "ArrayBuffer",
    "SharedArrayBuffer",
    "Atomics",
    "DataView",
    "JSON",
    // Control abstraction objects
    "Promise",
    "Generator",
    "GeneratorFunction",
    "AsyncFunction",
    // Reflection
    "Reflect",
    "Proxy",
    // Internationalization
    "Intl",
    // WebAssembly
    "WebAssembly"
  ], a = [
    "Error",
    "EvalError",
    "InternalError",
    "RangeError",
    "ReferenceError",
    "SyntaxError",
    "TypeError",
    "URIError"
  ], i = [
    "setInterval",
    "setTimeout",
    "clearInterval",
    "clearTimeout",
    "require",
    "exports",
    "eval",
    "isFinite",
    "isNaN",
    "parseFloat",
    "parseInt",
    "decodeURI",
    "decodeURIComponent",
    "encodeURI",
    "encodeURIComponent",
    "escape",
    "unescape"
  ], s = [
    "arguments",
    "this",
    "super",
    "console",
    "window",
    "document",
    "localStorage",
    "sessionStorage",
    "module",
    "global"
    // Node.js
  ], o = [].concat(
    i,
    r,
    a
  );
  function c(l) {
    const u = l.regex, d = (G, { after: H }) => {
      const J = "</" + G[0].slice(1);
      return G.input.indexOf(J, H) !== -1;
    }, g = e, f = {
      begin: "<>",
      end: "</>"
    }, p = /<[A-Za-z0-9\\._:-]+\s*\/>/, _ = {
      begin: /<[A-Za-z0-9\\._:-]+/,
      end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
      /**
       * @param {RegExpMatchArray} match
       * @param {CallbackResponse} response
       */
      isTrulyOpeningTag: (G, H) => {
        const J = G[0].length + G.index, ne = G.input[J];
        if (
          // HTML should not include another raw `<` inside a tag
          // nested type?
          // `<Array<Array<number>>`, etc.
          ne === "<" || // the , gives away that this is not HTML
          // `<T, A extends keyof T, V>`
          ne === ","
        ) {
          H.ignoreMatch();
          return;
        }
        ne === ">" && (d(G, { after: J }) || H.ignoreMatch());
        let re;
        const ce = G.input.substring(J);
        if (re = ce.match(/^\s*=/)) {
          H.ignoreMatch();
          return;
        }
        if ((re = ce.match(/^\s+extends\s+/)) && re.index === 0) {
          H.ignoreMatch();
          return;
        }
      }
    }, b = {
      $pattern: e,
      keyword: t,
      literal: n,
      built_in: o,
      "variable.language": s
    }, E = "[0-9](_?[0-9])*", N = `\\.(${E})`, w = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", O = {
      className: "number",
      variants: [
        // DecimalLiteral
        { begin: `(\\b(${w})((${N})|\\.)?|(${N}))[eE][+-]?(${E})\\b` },
        { begin: `\\b(${w})\\b((${N})\\b|\\.)?|(${N})\\b` },
        // DecimalBigIntegerLiteral
        { begin: "\\b(0|[1-9](_?[0-9])*)n\\b" },
        // NonDecimalIntegerLiteral
        { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
        { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
        { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
        // LegacyOctalIntegerLiteral (does not include underscore separators)
        // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
        { begin: "\\b0[0-7]+n?\\b" }
      ],
      relevance: 0
    }, R = {
      className: "subst",
      begin: "\\$\\{",
      end: "\\}",
      keywords: b,
      contains: []
      // defined later
    }, T = {
      begin: "html`",
      end: "",
      starts: {
        end: "`",
        returnEnd: !1,
        contains: [
          l.BACKSLASH_ESCAPE,
          R
        ],
        subLanguage: "xml"
      }
    }, k = {
      begin: "css`",
      end: "",
      starts: {
        end: "`",
        returnEnd: !1,
        contains: [
          l.BACKSLASH_ESCAPE,
          R
        ],
        subLanguage: "css"
      }
    }, v = {
      begin: "gql`",
      end: "",
      starts: {
        end: "`",
        returnEnd: !1,
        contains: [
          l.BACKSLASH_ESCAPE,
          R
        ],
        subLanguage: "graphql"
      }
    }, C = {
      className: "string",
      begin: "`",
      end: "`",
      contains: [
        l.BACKSLASH_ESCAPE,
        R
      ]
    }, z = {
      className: "comment",
      variants: [
        l.COMMENT(
          /\/\*\*(?!\/)/,
          "\\*/",
          {
            relevance: 0,
            contains: [
              {
                begin: "(?=@[A-Za-z]+)",
                relevance: 0,
                contains: [
                  {
                    className: "doctag",
                    begin: "@[A-Za-z]+"
                  },
                  {
                    className: "type",
                    begin: "\\{",
                    end: "\\}",
                    excludeEnd: !0,
                    excludeBegin: !0,
                    relevance: 0
                  },
                  {
                    className: "variable",
                    begin: g + "(?=\\s*(-)|$)",
                    endsParent: !0,
                    relevance: 0
                  },
                  // eat spaces (not newlines) so we can find
                  // types or variables
                  {
                    begin: /(?=[^\n])\s/,
                    relevance: 0
                  }
                ]
              }
            ]
          }
        ),
        l.C_BLOCK_COMMENT_MODE,
        l.C_LINE_COMMENT_MODE
      ]
    }, te = [
      l.APOS_STRING_MODE,
      l.QUOTE_STRING_MODE,
      T,
      k,
      v,
      C,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      O
      // This is intentional:
      // See https://github.com/highlightjs/highlight.js/issues/3288
      // hljs.REGEXP_MODE
    ];
    R.contains = te.concat({
      // we need to pair up {} inside our subst to prevent
      // it from ending too early by matching another }
      begin: /\{/,
      end: /\}/,
      keywords: b,
      contains: [
        "self"
      ].concat(te)
    });
    const oe = [].concat(z, R.contains), Y = oe.concat([
      // eat recursive parens in sub expressions
      {
        begin: /\(/,
        end: /\)/,
        keywords: b,
        contains: ["self"].concat(oe)
      }
    ]), B = {
      className: "params",
      begin: /\(/,
      end: /\)/,
      excludeBegin: !0,
      excludeEnd: !0,
      keywords: b,
      contains: Y
    }, Q = {
      variants: [
        // class Car extends vehicle
        {
          match: [
            /class/,
            /\s+/,
            g,
            /\s+/,
            /extends/,
            /\s+/,
            u.concat(g, "(", u.concat(/\./, g), ")*")
          ],
          scope: {
            1: "keyword",
            3: "title.class",
            5: "keyword",
            7: "title.class.inherited"
          }
        },
        // class Car
        {
          match: [
            /class/,
            /\s+/,
            g
          ],
          scope: {
            1: "keyword",
            3: "title.class"
          }
        }
      ]
    }, m = {
      relevance: 0,
      match: u.either(
        // Hard coded exceptions
        /\bJSON/,
        // Float32Array, OutT
        /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
        // CSSFactory, CSSFactoryT
        /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
        // FPs, FPsT
        /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/
        // P
        // single letters are not highlighted
        // BLAH
        // this will be flagged as a UPPER_CASE_CONSTANT instead
      ),
      className: "title.class",
      keywords: {
        _: [
          // se we still get relevance credit for JS library classes
          ...r,
          ...a
        ]
      }
    }, y = {
      label: "use_strict",
      className: "meta",
      relevance: 10,
      begin: /^\s*['"]use (strict|asm)['"]/
    }, I = {
      variants: [
        {
          match: [
            /function/,
            /\s+/,
            g,
            /(?=\s*\()/
          ]
        },
        // anonymous function
        {
          match: [
            /function/,
            /\s*(?=\()/
          ]
        }
      ],
      className: {
        1: "keyword",
        3: "title.function"
      },
      label: "func.def",
      contains: [B],
      illegal: /%/
    }, D = {
      relevance: 0,
      match: /\b[A-Z][A-Z_0-9]+\b/,
      className: "variable.constant"
    };
    function F(G) {
      return u.concat("(?!", G.join("|"), ")");
    }
    const Z = {
      match: u.concat(
        /\b/,
        F([
          ...i,
          "super",
          "import"
        ]),
        g,
        u.lookahead(/\(/)
      ),
      className: "title.function",
      relevance: 0
    }, ae = {
      begin: u.concat(/\./, u.lookahead(
        u.concat(g, /(?![0-9A-Za-z$_(])/)
      )),
      end: g,
      excludeBegin: !0,
      keywords: "prototype",
      className: "property",
      relevance: 0
    }, ie = {
      match: [
        /get|set/,
        /\s+/,
        g,
        /(?=\()/
      ],
      className: {
        1: "keyword",
        3: "title.function"
      },
      contains: [
        {
          // eat to avoid empty params
          begin: /\(\)/
        },
        B
      ]
    }, K = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + l.UNDERSCORE_IDENT_RE + ")\\s*=>", V = {
      match: [
        /const|var|let/,
        /\s+/,
        g,
        /\s*/,
        /=\s*/,
        /(async\s*)?/,
        // async is optional
        u.lookahead(K)
      ],
      keywords: "async",
      className: {
        1: "keyword",
        3: "title.function"
      },
      contains: [
        B
      ]
    };
    return {
      name: "JavaScript",
      aliases: ["js", "jsx", "mjs", "cjs"],
      keywords: b,
      // this will be extended by TypeScript
      exports: { PARAMS_CONTAINS: Y, CLASS_REFERENCE: m },
      illegal: /#(?![$_A-z])/,
      contains: [
        l.SHEBANG({
          label: "shebang",
          binary: "node",
          relevance: 5
        }),
        y,
        l.APOS_STRING_MODE,
        l.QUOTE_STRING_MODE,
        T,
        k,
        v,
        C,
        z,
        // Skip numbers when they are part of a variable name
        { match: /\$\d+/ },
        O,
        m,
        {
          className: "attr",
          begin: g + u.lookahead(":"),
          relevance: 0
        },
        V,
        {
          // "value" container
          begin: "(" + l.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
          keywords: "return throw case",
          relevance: 0,
          contains: [
            z,
            l.REGEXP_MODE,
            {
              className: "function",
              // we have to count the parens to make sure we actually have the
              // correct bounding ( ) before the =>.  There could be any number of
              // sub-expressions inside also surrounded by parens.
              begin: K,
              returnBegin: !0,
              end: "\\s*=>",
              contains: [
                {
                  className: "params",
                  variants: [
                    {
                      begin: l.UNDERSCORE_IDENT_RE,
                      relevance: 0
                    },
                    {
                      className: null,
                      begin: /\(\s*\)/,
                      skip: !0
                    },
                    {
                      begin: /\(/,
                      end: /\)/,
                      excludeBegin: !0,
                      excludeEnd: !0,
                      keywords: b,
                      contains: Y
                    }
                  ]
                }
              ]
            },
            {
              // could be a comma delimited list of params to a function call
              begin: /,/,
              relevance: 0
            },
            {
              match: /\s+/,
              relevance: 0
            },
            {
              // JSX
              variants: [
                { begin: f.begin, end: f.end },
                { match: p },
                {
                  begin: _.begin,
                  // we carefully check the opening tag to see if it truly
                  // is a tag and not a false positive
                  "on:begin": _.isTrulyOpeningTag,
                  end: _.end
                }
              ],
              subLanguage: "xml",
              contains: [
                {
                  begin: _.begin,
                  end: _.end,
                  skip: !0,
                  contains: ["self"]
                }
              ]
            }
          ]
        },
        I,
        {
          // prevent this from getting swallowed up by function
          // since they appear "function like"
          beginKeywords: "while if switch catch for"
        },
        {
          // we have to count the parens to make sure we actually have the correct
          // bounding ( ).  There could be any number of sub-expressions inside
          // also surrounded by parens.
          begin: "\\b(?!function)" + l.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
          // end parens
          returnBegin: !0,
          label: "func.def",
          contains: [
            B,
            l.inherit(l.TITLE_MODE, { begin: g, className: "title.function" })
          ]
        },
        // catch ... so it won't trigger the property rule below
        {
          match: /\.\.\./,
          relevance: 0
        },
        ae,
        // hack: prevents detection of keywords in some circumstances
        // .keyword()
        // $keyword = x
        {
          match: "\\$" + g,
          relevance: 0
        },
        {
          match: [/\bconstructor(?=\s*\()/],
          className: { 1: "title.function" },
          contains: [B]
        },
        Z,
        D,
        Q,
        ie,
        {
          match: /\$[(.]/
          // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
        }
      ]
    };
  }
  return Ct = c, Ct;
}
var xt, lr;
function cc() {
  if (lr)
    return xt;
  lr = 1;
  function e(t) {
    const n = {
      className: "attr",
      begin: /"(\\.|[^\\"\r\n])*"(?=\s*:)/,
      relevance: 1.01
    }, r = {
      match: /[{}[\],:]/,
      className: "punctuation",
      relevance: 0
    }, a = [
      "true",
      "false",
      "null"
    ], i = {
      scope: "literal",
      beginKeywords: a.join(" ")
    };
    return {
      name: "JSON",
      keywords: {
        literal: a
      },
      contains: [
        n,
        r,
        t.QUOTE_STRING_MODE,
        i,
        t.C_NUMBER_MODE,
        t.C_LINE_COMMENT_MODE,
        t.C_BLOCK_COMMENT_MODE
      ],
      illegal: "\\S"
    };
  }
  return xt = e, xt;
}
var Dt, ur;
function lc() {
  if (ur)
    return Dt;
  ur = 1;
  var e = "[0-9](_*[0-9])*", t = `\\.(${e})`, n = "[0-9a-fA-F](_*[0-9a-fA-F])*", r = {
    className: "number",
    variants: [
      // DecimalFloatingPointLiteral
      // including ExponentPart
      { begin: `(\\b(${e})((${t})|\\.)?|(${t}))[eE][+-]?(${e})[fFdD]?\\b` },
      // excluding ExponentPart
      { begin: `\\b(${e})((${t})[fFdD]?\\b|\\.([fFdD]\\b)?)` },
      { begin: `(${t})[fFdD]?\\b` },
      { begin: `\\b(${e})[fFdD]\\b` },
      // HexadecimalFloatingPointLiteral
      { begin: `\\b0[xX]((${n})\\.?|(${n})?\\.(${n}))[pP][+-]?(${e})[fFdD]?\\b` },
      // DecimalIntegerLiteral
      { begin: "\\b(0|[1-9](_*[0-9])*)[lL]?\\b" },
      // HexIntegerLiteral
      { begin: `\\b0[xX](${n})[lL]?\\b` },
      // OctalIntegerLiteral
      { begin: "\\b0(_*[0-7])*[lL]?\\b" },
      // BinaryIntegerLiteral
      { begin: "\\b0[bB][01](_*[01])*[lL]?\\b" }
    ],
    relevance: 0
  };
  function a(i) {
    const s = {
      keyword: "abstract as val var vararg get set class object open private protected public noinline crossinline dynamic final enum if else do while for when throw try catch finally import package is in fun override companion reified inline lateinit init interface annotation data sealed internal infix operator out by constructor super tailrec where const inner suspend typealias external expect actual",
      built_in: "Byte Short Char Int Long Boolean Float Double Void Unit Nothing",
      literal: "true false null"
    }, o = {
      className: "keyword",
      begin: /\b(break|continue|return|this)\b/,
      starts: { contains: [
        {
          className: "symbol",
          begin: /@\w+/
        }
      ] }
    }, c = {
      className: "symbol",
      begin: i.UNDERSCORE_IDENT_RE + "@"
    }, l = {
      className: "subst",
      begin: /\$\{/,
      end: /\}/,
      contains: [i.C_NUMBER_MODE]
    }, u = {
      className: "variable",
      begin: "\\$" + i.UNDERSCORE_IDENT_RE
    }, d = {
      className: "string",
      variants: [
        {
          begin: '"""',
          end: '"""(?=[^"])',
          contains: [
            u,
            l
          ]
        },
        // Can't use built-in modes easily, as we want to use STRING in the meta
        // context as 'meta-string' and there's no syntax to remove explicitly set
        // classNames in built-in modes.
        {
          begin: "'",
          end: "'",
          illegal: /\n/,
          contains: [i.BACKSLASH_ESCAPE]
        },
        {
          begin: '"',
          end: '"',
          illegal: /\n/,
          contains: [
            i.BACKSLASH_ESCAPE,
            u,
            l
          ]
        }
      ]
    };
    l.contains.push(d);
    const g = {
      className: "meta",
      begin: "@(?:file|property|field|get|set|receiver|param|setparam|delegate)\\s*:(?:\\s*" + i.UNDERSCORE_IDENT_RE + ")?"
    }, f = {
      className: "meta",
      begin: "@" + i.UNDERSCORE_IDENT_RE,
      contains: [
        {
          begin: /\(/,
          end: /\)/,
          contains: [
            i.inherit(d, { className: "string" }),
            "self"
          ]
        }
      ]
    }, p = r, _ = i.COMMENT(
      "/\\*",
      "\\*/",
      { contains: [i.C_BLOCK_COMMENT_MODE] }
    ), b = { variants: [
      {
        className: "type",
        begin: i.UNDERSCORE_IDENT_RE
      },
      {
        begin: /\(/,
        end: /\)/,
        contains: []
        // defined later
      }
    ] }, E = b;
    return E.variants[1].contains = [b], b.variants[1].contains = [E], {
      name: "Kotlin",
      aliases: [
        "kt",
        "kts"
      ],
      keywords: s,
      contains: [
        i.COMMENT(
          "/\\*\\*",
          "\\*/",
          {
            relevance: 0,
            contains: [
              {
                className: "doctag",
                begin: "@[A-Za-z]+"
              }
            ]
          }
        ),
        i.C_LINE_COMMENT_MODE,
        _,
        o,
        c,
        g,
        f,
        {
          className: "function",
          beginKeywords: "fun",
          end: "[(]|$",
          returnBegin: !0,
          excludeEnd: !0,
          keywords: s,
          relevance: 5,
          contains: [
            {
              begin: i.UNDERSCORE_IDENT_RE + "\\s*\\(",
              returnBegin: !0,
              relevance: 0,
              contains: [i.UNDERSCORE_TITLE_MODE]
            },
            {
              className: "type",
              begin: /</,
              end: />/,
              keywords: "reified",
              relevance: 0
            },
            {
              className: "params",
              begin: /\(/,
              end: /\)/,
              endsParent: !0,
              keywords: s,
              relevance: 0,
              contains: [
                {
                  begin: /:/,
                  end: /[=,\/]/,
                  endsWithParent: !0,
                  contains: [
                    b,
                    i.C_LINE_COMMENT_MODE,
                    _
                  ],
                  relevance: 0
                },
                i.C_LINE_COMMENT_MODE,
                _,
                g,
                f,
                d,
                i.C_NUMBER_MODE
              ]
            },
            _
          ]
        },
        {
          begin: [
            /class|interface|trait/,
            /\s+/,
            i.UNDERSCORE_IDENT_RE
          ],
          beginScope: {
            3: "title.class"
          },
          keywords: "class interface trait",
          end: /[:\{(]|$/,
          excludeEnd: !0,
          illegal: "extends implements",
          contains: [
            { beginKeywords: "public protected internal private constructor" },
            i.UNDERSCORE_TITLE_MODE,
            {
              className: "type",
              begin: /</,
              end: />/,
              excludeBegin: !0,
              excludeEnd: !0,
              relevance: 0
            },
            {
              className: "type",
              begin: /[,:]\s*/,
              end: /[<\(,){\s]|$/,
              excludeBegin: !0,
              returnEnd: !0
            },
            g,
            f
          ]
        },
        d,
        {
          className: "meta",
          begin: "^#!/usr/bin/env",
          end: "$",
          illegal: `
`
        },
        p
      ]
    };
  }
  return Dt = a, Dt;
}
var Lt, dr;
function uc() {
  if (dr)
    return Lt;
  dr = 1;
  const e = (c) => ({
    IMPORTANT: {
      scope: "meta",
      begin: "!important"
    },
    BLOCK_COMMENT: c.C_BLOCK_COMMENT_MODE,
    HEXCOLOR: {
      scope: "number",
      begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
    },
    FUNCTION_DISPATCH: {
      className: "built_in",
      begin: /[\w-]+(?=\()/
    },
    ATTRIBUTE_SELECTOR_MODE: {
      scope: "selector-attr",
      begin: /\[/,
      end: /\]/,
      illegal: "$",
      contains: [
        c.APOS_STRING_MODE,
        c.QUOTE_STRING_MODE
      ]
    },
    CSS_NUMBER_MODE: {
      scope: "number",
      begin: c.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
      relevance: 0
    },
    CSS_VARIABLE: {
      className: "attr",
      begin: /--[A-Za-z_][A-Za-z0-9_-]*/
    }
  }), t = [
    "a",
    "abbr",
    "address",
    "article",
    "aside",
    "audio",
    "b",
    "blockquote",
    "body",
    "button",
    "canvas",
    "caption",
    "cite",
    "code",
    "dd",
    "del",
    "details",
    "dfn",
    "div",
    "dl",
    "dt",
    "em",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "header",
    "hgroup",
    "html",
    "i",
    "iframe",
    "img",
    "input",
    "ins",
    "kbd",
    "label",
    "legend",
    "li",
    "main",
    "mark",
    "menu",
    "nav",
    "object",
    "ol",
    "p",
    "q",
    "quote",
    "samp",
    "section",
    "span",
    "strong",
    "summary",
    "sup",
    "table",
    "tbody",
    "td",
    "textarea",
    "tfoot",
    "th",
    "thead",
    "time",
    "tr",
    "ul",
    "var",
    "video"
  ], n = [
    "any-hover",
    "any-pointer",
    "aspect-ratio",
    "color",
    "color-gamut",
    "color-index",
    "device-aspect-ratio",
    "device-height",
    "device-width",
    "display-mode",
    "forced-colors",
    "grid",
    "height",
    "hover",
    "inverted-colors",
    "monochrome",
    "orientation",
    "overflow-block",
    "overflow-inline",
    "pointer",
    "prefers-color-scheme",
    "prefers-contrast",
    "prefers-reduced-motion",
    "prefers-reduced-transparency",
    "resolution",
    "scan",
    "scripting",
    "update",
    "width",
    // TODO: find a better solution?
    "min-width",
    "max-width",
    "min-height",
    "max-height"
  ], r = [
    "active",
    "any-link",
    "blank",
    "checked",
    "current",
    "default",
    "defined",
    "dir",
    // dir()
    "disabled",
    "drop",
    "empty",
    "enabled",
    "first",
    "first-child",
    "first-of-type",
    "fullscreen",
    "future",
    "focus",
    "focus-visible",
    "focus-within",
    "has",
    // has()
    "host",
    // host or host()
    "host-context",
    // host-context()
    "hover",
    "indeterminate",
    "in-range",
    "invalid",
    "is",
    // is()
    "lang",
    // lang()
    "last-child",
    "last-of-type",
    "left",
    "link",
    "local-link",
    "not",
    // not()
    "nth-child",
    // nth-child()
    "nth-col",
    // nth-col()
    "nth-last-child",
    // nth-last-child()
    "nth-last-col",
    // nth-last-col()
    "nth-last-of-type",
    //nth-last-of-type()
    "nth-of-type",
    //nth-of-type()
    "only-child",
    "only-of-type",
    "optional",
    "out-of-range",
    "past",
    "placeholder-shown",
    "read-only",
    "read-write",
    "required",
    "right",
    "root",
    "scope",
    "target",
    "target-within",
    "user-invalid",
    "valid",
    "visited",
    "where"
    // where()
  ], a = [
    "after",
    "backdrop",
    "before",
    "cue",
    "cue-region",
    "first-letter",
    "first-line",
    "grammar-error",
    "marker",
    "part",
    "placeholder",
    "selection",
    "slotted",
    "spelling-error"
  ], i = [
    "align-content",
    "align-items",
    "align-self",
    "all",
    "animation",
    "animation-delay",
    "animation-direction",
    "animation-duration",
    "animation-fill-mode",
    "animation-iteration-count",
    "animation-name",
    "animation-play-state",
    "animation-timing-function",
    "backface-visibility",
    "background",
    "background-attachment",
    "background-blend-mode",
    "background-clip",
    "background-color",
    "background-image",
    "background-origin",
    "background-position",
    "background-repeat",
    "background-size",
    "block-size",
    "border",
    "border-block",
    "border-block-color",
    "border-block-end",
    "border-block-end-color",
    "border-block-end-style",
    "border-block-end-width",
    "border-block-start",
    "border-block-start-color",
    "border-block-start-style",
    "border-block-start-width",
    "border-block-style",
    "border-block-width",
    "border-bottom",
    "border-bottom-color",
    "border-bottom-left-radius",
    "border-bottom-right-radius",
    "border-bottom-style",
    "border-bottom-width",
    "border-collapse",
    "border-color",
    "border-image",
    "border-image-outset",
    "border-image-repeat",
    "border-image-slice",
    "border-image-source",
    "border-image-width",
    "border-inline",
    "border-inline-color",
    "border-inline-end",
    "border-inline-end-color",
    "border-inline-end-style",
    "border-inline-end-width",
    "border-inline-start",
    "border-inline-start-color",
    "border-inline-start-style",
    "border-inline-start-width",
    "border-inline-style",
    "border-inline-width",
    "border-left",
    "border-left-color",
    "border-left-style",
    "border-left-width",
    "border-radius",
    "border-right",
    "border-right-color",
    "border-right-style",
    "border-right-width",
    "border-spacing",
    "border-style",
    "border-top",
    "border-top-color",
    "border-top-left-radius",
    "border-top-right-radius",
    "border-top-style",
    "border-top-width",
    "border-width",
    "bottom",
    "box-decoration-break",
    "box-shadow",
    "box-sizing",
    "break-after",
    "break-before",
    "break-inside",
    "caption-side",
    "caret-color",
    "clear",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "column-count",
    "column-fill",
    "column-gap",
    "column-rule",
    "column-rule-color",
    "column-rule-style",
    "column-rule-width",
    "column-span",
    "column-width",
    "columns",
    "contain",
    "content",
    "content-visibility",
    "counter-increment",
    "counter-reset",
    "cue",
    "cue-after",
    "cue-before",
    "cursor",
    "direction",
    "display",
    "empty-cells",
    "filter",
    "flex",
    "flex-basis",
    "flex-direction",
    "flex-flow",
    "flex-grow",
    "flex-shrink",
    "flex-wrap",
    "float",
    "flow",
    "font",
    "font-display",
    "font-family",
    "font-feature-settings",
    "font-kerning",
    "font-language-override",
    "font-size",
    "font-size-adjust",
    "font-smoothing",
    "font-stretch",
    "font-style",
    "font-synthesis",
    "font-variant",
    "font-variant-caps",
    "font-variant-east-asian",
    "font-variant-ligatures",
    "font-variant-numeric",
    "font-variant-position",
    "font-variation-settings",
    "font-weight",
    "gap",
    "glyph-orientation-vertical",
    "grid",
    "grid-area",
    "grid-auto-columns",
    "grid-auto-flow",
    "grid-auto-rows",
    "grid-column",
    "grid-column-end",
    "grid-column-start",
    "grid-gap",
    "grid-row",
    "grid-row-end",
    "grid-row-start",
    "grid-template",
    "grid-template-areas",
    "grid-template-columns",
    "grid-template-rows",
    "hanging-punctuation",
    "height",
    "hyphens",
    "icon",
    "image-orientation",
    "image-rendering",
    "image-resolution",
    "ime-mode",
    "inline-size",
    "isolation",
    "justify-content",
    "left",
    "letter-spacing",
    "line-break",
    "line-height",
    "list-style",
    "list-style-image",
    "list-style-position",
    "list-style-type",
    "margin",
    "margin-block",
    "margin-block-end",
    "margin-block-start",
    "margin-bottom",
    "margin-inline",
    "margin-inline-end",
    "margin-inline-start",
    "margin-left",
    "margin-right",
    "margin-top",
    "marks",
    "mask",
    "mask-border",
    "mask-border-mode",
    "mask-border-outset",
    "mask-border-repeat",
    "mask-border-slice",
    "mask-border-source",
    "mask-border-width",
    "mask-clip",
    "mask-composite",
    "mask-image",
    "mask-mode",
    "mask-origin",
    "mask-position",
    "mask-repeat",
    "mask-size",
    "mask-type",
    "max-block-size",
    "max-height",
    "max-inline-size",
    "max-width",
    "min-block-size",
    "min-height",
    "min-inline-size",
    "min-width",
    "mix-blend-mode",
    "nav-down",
    "nav-index",
    "nav-left",
    "nav-right",
    "nav-up",
    "none",
    "normal",
    "object-fit",
    "object-position",
    "opacity",
    "order",
    "orphans",
    "outline",
    "outline-color",
    "outline-offset",
    "outline-style",
    "outline-width",
    "overflow",
    "overflow-wrap",
    "overflow-x",
    "overflow-y",
    "padding",
    "padding-block",
    "padding-block-end",
    "padding-block-start",
    "padding-bottom",
    "padding-inline",
    "padding-inline-end",
    "padding-inline-start",
    "padding-left",
    "padding-right",
    "padding-top",
    "page-break-after",
    "page-break-before",
    "page-break-inside",
    "pause",
    "pause-after",
    "pause-before",
    "perspective",
    "perspective-origin",
    "pointer-events",
    "position",
    "quotes",
    "resize",
    "rest",
    "rest-after",
    "rest-before",
    "right",
    "row-gap",
    "scroll-margin",
    "scroll-margin-block",
    "scroll-margin-block-end",
    "scroll-margin-block-start",
    "scroll-margin-bottom",
    "scroll-margin-inline",
    "scroll-margin-inline-end",
    "scroll-margin-inline-start",
    "scroll-margin-left",
    "scroll-margin-right",
    "scroll-margin-top",
    "scroll-padding",
    "scroll-padding-block",
    "scroll-padding-block-end",
    "scroll-padding-block-start",
    "scroll-padding-bottom",
    "scroll-padding-inline",
    "scroll-padding-inline-end",
    "scroll-padding-inline-start",
    "scroll-padding-left",
    "scroll-padding-right",
    "scroll-padding-top",
    "scroll-snap-align",
    "scroll-snap-stop",
    "scroll-snap-type",
    "scrollbar-color",
    "scrollbar-gutter",
    "scrollbar-width",
    "shape-image-threshold",
    "shape-margin",
    "shape-outside",
    "speak",
    "speak-as",
    "src",
    // @font-face
    "tab-size",
    "table-layout",
    "text-align",
    "text-align-all",
    "text-align-last",
    "text-combine-upright",
    "text-decoration",
    "text-decoration-color",
    "text-decoration-line",
    "text-decoration-style",
    "text-emphasis",
    "text-emphasis-color",
    "text-emphasis-position",
    "text-emphasis-style",
    "text-indent",
    "text-justify",
    "text-orientation",
    "text-overflow",
    "text-rendering",
    "text-shadow",
    "text-transform",
    "text-underline-position",
    "top",
    "transform",
    "transform-box",
    "transform-origin",
    "transform-style",
    "transition",
    "transition-delay",
    "transition-duration",
    "transition-property",
    "transition-timing-function",
    "unicode-bidi",
    "vertical-align",
    "visibility",
    "voice-balance",
    "voice-duration",
    "voice-family",
    "voice-pitch",
    "voice-range",
    "voice-rate",
    "voice-stress",
    "voice-volume",
    "white-space",
    "widows",
    "width",
    "will-change",
    "word-break",
    "word-spacing",
    "word-wrap",
    "writing-mode",
    "z-index"
    // reverse makes sure longer attributes `font-weight` are matched fully
    // instead of getting false positives on say `font`
  ].reverse(), s = r.concat(a);
  function o(c) {
    const l = e(c), u = s, d = "and or not only", g = "[\\w-]+", f = "(" + g + "|@\\{" + g + "\\})", p = [], _ = [], b = function(z) {
      return {
        // Less strings are not multiline (also include '~' for more consistent coloring of "escaped" strings)
        className: "string",
        begin: "~?" + z + ".*?" + z
      };
    }, E = function(z, te, oe) {
      return {
        className: z,
        begin: te,
        relevance: oe
      };
    }, N = {
      $pattern: /[a-z-]+/,
      keyword: d,
      attribute: n.join(" ")
    }, w = {
      // used only to properly balance nested parens inside mixin call, def. arg list
      begin: "\\(",
      end: "\\)",
      contains: _,
      keywords: N,
      relevance: 0
    };
    _.push(
      c.C_LINE_COMMENT_MODE,
      c.C_BLOCK_COMMENT_MODE,
      b("'"),
      b('"'),
      l.CSS_NUMBER_MODE,
      // fixme: it does not include dot for numbers like .5em :(
      {
        begin: "(url|data-uri)\\(",
        starts: {
          className: "string",
          end: "[\\)\\n]",
          excludeEnd: !0
        }
      },
      l.HEXCOLOR,
      w,
      E("variable", "@@?" + g, 10),
      E("variable", "@\\{" + g + "\\}"),
      E("built_in", "~?`[^`]*?`"),
      // inline javascript (or whatever host language) *multiline* string
      {
        // @media features (it’s here to not duplicate things in AT_RULE_MODE with extra PARENS_MODE overriding):
        className: "attribute",
        begin: g + "\\s*:",
        end: ":",
        returnBegin: !0,
        excludeEnd: !0
      },
      l.IMPORTANT,
      { beginKeywords: "and not" },
      l.FUNCTION_DISPATCH
    );
    const O = _.concat({
      begin: /\{/,
      end: /\}/,
      contains: p
    }), R = {
      beginKeywords: "when",
      endsWithParent: !0,
      contains: [{ beginKeywords: "and not" }].concat(_)
      // using this form to override VALUE’s 'function' match
    }, T = {
      begin: f + "\\s*:",
      returnBegin: !0,
      end: /[;}]/,
      relevance: 0,
      contains: [
        { begin: /-(webkit|moz|ms|o)-/ },
        l.CSS_VARIABLE,
        {
          className: "attribute",
          begin: "\\b(" + i.join("|") + ")\\b",
          end: /(?=:)/,
          starts: {
            endsWithParent: !0,
            illegal: "[<=$]",
            relevance: 0,
            contains: _
          }
        }
      ]
    }, k = {
      className: "keyword",
      begin: "@(import|media|charset|font-face|(-[a-z]+-)?keyframes|supports|document|namespace|page|viewport|host)\\b",
      starts: {
        end: "[;{}]",
        keywords: N,
        returnEnd: !0,
        contains: _,
        relevance: 0
      }
    }, v = {
      className: "variable",
      variants: [
        // using more strict pattern for higher relevance to increase chances of Less detection.
        // this is *the only* Less specific statement used in most of the sources, so...
        // (we’ll still often loose to the css-parser unless there's '//' comment,
        // simply because 1 variable just can't beat 99 properties :)
        {
          begin: "@" + g + "\\s*:",
          relevance: 15
        },
        { begin: "@" + g }
      ],
      starts: {
        end: "[;}]",
        returnEnd: !0,
        contains: O
      }
    }, C = {
      // first parse unambiguous selectors (i.e. those not starting with tag)
      // then fall into the scary lookahead-discriminator variant.
      // this mode also handles mixin definitions and calls
      variants: [
        {
          begin: "[\\.#:&\\[>]",
          end: "[;{}]"
          // mixin calls end with ';'
        },
        {
          begin: f,
          end: /\{/
        }
      ],
      returnBegin: !0,
      returnEnd: !0,
      illegal: `[<='$"]`,
      relevance: 0,
      contains: [
        c.C_LINE_COMMENT_MODE,
        c.C_BLOCK_COMMENT_MODE,
        R,
        E("keyword", "all\\b"),
        E("variable", "@\\{" + g + "\\}"),
        // otherwise it’s identified as tag
        {
          begin: "\\b(" + t.join("|") + ")\\b",
          className: "selector-tag"
        },
        l.CSS_NUMBER_MODE,
        E("selector-tag", f, 0),
        E("selector-id", "#" + f),
        E("selector-class", "\\." + f, 0),
        E("selector-tag", "&", 0),
        l.ATTRIBUTE_SELECTOR_MODE,
        {
          className: "selector-pseudo",
          begin: ":(" + r.join("|") + ")"
        },
        {
          className: "selector-pseudo",
          begin: ":(:)?(" + a.join("|") + ")"
        },
        {
          begin: /\(/,
          end: /\)/,
          relevance: 0,
          contains: O
        },
        // argument list of parametric mixins
        { begin: "!important" },
        // eat !important after mixin call or it will be colored as tag
        l.FUNCTION_DISPATCH
      ]
    }, U = {
      begin: g + `:(:)?(${u.join("|")})`,
      returnBegin: !0,
      contains: [C]
    };
    return p.push(
      c.C_LINE_COMMENT_MODE,
      c.C_BLOCK_COMMENT_MODE,
      k,
      v,
      U,
      T,
      C,
      R,
      l.FUNCTION_DISPATCH
    ), {
      name: "Less",
      case_insensitive: !0,
      illegal: `[=>'/<($"]`,
      contains: p
    };
  }
  return Lt = o, Lt;
}
var Pt, gr;
function dc() {
  if (gr)
    return Pt;
  gr = 1;
  function e(t) {
    const n = "\\[=*\\[", r = "\\]=*\\]", a = {
      begin: n,
      end: r,
      contains: ["self"]
    }, i = [
      t.COMMENT("--(?!" + n + ")", "$"),
      t.COMMENT(
        "--" + n,
        r,
        {
          contains: [a],
          relevance: 10
        }
      )
    ];
    return {
      name: "Lua",
      keywords: {
        $pattern: t.UNDERSCORE_IDENT_RE,
        literal: "true false nil",
        keyword: "and break do else elseif end for goto if in local not or repeat return then until while",
        built_in: (
          // Metatags and globals:
          "_G _ENV _VERSION __index __newindex __mode __call __metatable __tostring __len __gc __add __sub __mul __div __mod __pow __concat __unm __eq __lt __le assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring module next pairs pcall print rawequal rawget rawset require select setfenv setmetatable tonumber tostring type unpack xpcall arg self coroutine resume yield status wrap create running debug getupvalue debug sethook getmetatable gethook setmetatable setlocal traceback setfenv getinfo setupvalue getlocal getregistry getfenv io lines write close flush open output type read stderr stdin input stdout popen tmpfile math log max acos huge ldexp pi cos tanh pow deg tan cosh sinh random randomseed frexp ceil floor rad abs sqrt modf asin min mod fmod log10 atan2 exp sin atan os exit setlocale date getenv difftime remove time clock tmpname rename execute package preload loadlib loaded loaders cpath config path seeall string sub upper len gfind rep find match char dump gmatch reverse byte format gsub lower table setn insert getn foreachi maxn foreach concat sort remove"
        )
      },
      contains: i.concat([
        {
          className: "function",
          beginKeywords: "function",
          end: "\\)",
          contains: [
            t.inherit(t.TITLE_MODE, { begin: "([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*" }),
            {
              className: "params",
              begin: "\\(",
              endsWithParent: !0,
              contains: i
            }
          ].concat(i)
        },
        t.C_NUMBER_MODE,
        t.APOS_STRING_MODE,
        t.QUOTE_STRING_MODE,
        {
          className: "string",
          begin: n,
          end: r,
          contains: [a],
          relevance: 5
        }
      ])
    };
  }
  return Pt = e, Pt;
}
var Bt, fr;
function gc() {
  if (fr)
    return Bt;
  fr = 1;
  function e(t) {
    const n = {
      className: "variable",
      variants: [
        {
          begin: "\\$\\(" + t.UNDERSCORE_IDENT_RE + "\\)",
          contains: [t.BACKSLASH_ESCAPE]
        },
        { begin: /\$[@%<?\^\+\*]/ }
      ]
    }, r = {
      className: "string",
      begin: /"/,
      end: /"/,
      contains: [
        t.BACKSLASH_ESCAPE,
        n
      ]
    }, a = {
      className: "variable",
      begin: /\$\([\w-]+\s/,
      end: /\)/,
      keywords: { built_in: "subst patsubst strip findstring filter filter-out sort word wordlist firstword lastword dir notdir suffix basename addsuffix addprefix join wildcard realpath abspath error warning shell origin flavor foreach if or and call eval file value" },
      contains: [n]
    }, i = { begin: "^" + t.UNDERSCORE_IDENT_RE + "\\s*(?=[:+?]?=)" }, s = {
      className: "meta",
      begin: /^\.PHONY:/,
      end: /$/,
      keywords: {
        $pattern: /[\.\w]+/,
        keyword: ".PHONY"
      }
    }, o = {
      className: "section",
      begin: /^[^\s]+:/,
      end: /$/,
      contains: [n]
    };
    return {
      name: "Makefile",
      aliases: [
        "mk",
        "mak",
        "make"
      ],
      keywords: {
        $pattern: /[\w-]+/,
        keyword: "define endef undefine ifdef ifndef ifeq ifneq else endif include -include sinclude override export unexport private vpath"
      },
      contains: [
        t.HASH_COMMENT_MODE,
        n,
        r,
        a,
        i,
        s,
        o
      ]
    };
  }
  return Bt = e, Bt;
}
var Ut, br;
function fc() {
  if (br)
    return Ut;
  br = 1;
  function e(t) {
    const n = t.regex, r = [
      "abs",
      "accept",
      "alarm",
      "and",
      "atan2",
      "bind",
      "binmode",
      "bless",
      "break",
      "caller",
      "chdir",
      "chmod",
      "chomp",
      "chop",
      "chown",
      "chr",
      "chroot",
      "close",
      "closedir",
      "connect",
      "continue",
      "cos",
      "crypt",
      "dbmclose",
      "dbmopen",
      "defined",
      "delete",
      "die",
      "do",
      "dump",
      "each",
      "else",
      "elsif",
      "endgrent",
      "endhostent",
      "endnetent",
      "endprotoent",
      "endpwent",
      "endservent",
      "eof",
      "eval",
      "exec",
      "exists",
      "exit",
      "exp",
      "fcntl",
      "fileno",
      "flock",
      "for",
      "foreach",
      "fork",
      "format",
      "formline",
      "getc",
      "getgrent",
      "getgrgid",
      "getgrnam",
      "gethostbyaddr",
      "gethostbyname",
      "gethostent",
      "getlogin",
      "getnetbyaddr",
      "getnetbyname",
      "getnetent",
      "getpeername",
      "getpgrp",
      "getpriority",
      "getprotobyname",
      "getprotobynumber",
      "getprotoent",
      "getpwent",
      "getpwnam",
      "getpwuid",
      "getservbyname",
      "getservbyport",
      "getservent",
      "getsockname",
      "getsockopt",
      "given",
      "glob",
      "gmtime",
      "goto",
      "grep",
      "gt",
      "hex",
      "if",
      "index",
      "int",
      "ioctl",
      "join",
      "keys",
      "kill",
      "last",
      "lc",
      "lcfirst",
      "length",
      "link",
      "listen",
      "local",
      "localtime",
      "log",
      "lstat",
      "lt",
      "ma",
      "map",
      "mkdir",
      "msgctl",
      "msgget",
      "msgrcv",
      "msgsnd",
      "my",
      "ne",
      "next",
      "no",
      "not",
      "oct",
      "open",
      "opendir",
      "or",
      "ord",
      "our",
      "pack",
      "package",
      "pipe",
      "pop",
      "pos",
      "print",
      "printf",
      "prototype",
      "push",
      "q|0",
      "qq",
      "quotemeta",
      "qw",
      "qx",
      "rand",
      "read",
      "readdir",
      "readline",
      "readlink",
      "readpipe",
      "recv",
      "redo",
      "ref",
      "rename",
      "require",
      "reset",
      "return",
      "reverse",
      "rewinddir",
      "rindex",
      "rmdir",
      "say",
      "scalar",
      "seek",
      "seekdir",
      "select",
      "semctl",
      "semget",
      "semop",
      "send",
      "setgrent",
      "sethostent",
      "setnetent",
      "setpgrp",
      "setpriority",
      "setprotoent",
      "setpwent",
      "setservent",
      "setsockopt",
      "shift",
      "shmctl",
      "shmget",
      "shmread",
      "shmwrite",
      "shutdown",
      "sin",
      "sleep",
      "socket",
      "socketpair",
      "sort",
      "splice",
      "split",
      "sprintf",
      "sqrt",
      "srand",
      "stat",
      "state",
      "study",
      "sub",
      "substr",
      "symlink",
      "syscall",
      "sysopen",
      "sysread",
      "sysseek",
      "system",
      "syswrite",
      "tell",
      "telldir",
      "tie",
      "tied",
      "time",
      "times",
      "tr",
      "truncate",
      "uc",
      "ucfirst",
      "umask",
      "undef",
      "unless",
      "unlink",
      "unpack",
      "unshift",
      "untie",
      "until",
      "use",
      "utime",
      "values",
      "vec",
      "wait",
      "waitpid",
      "wantarray",
      "warn",
      "when",
      "while",
      "write",
      "x|0",
      "xor",
      "y|0"
    ], a = /[dualxmsipngr]{0,12}/, i = {
      $pattern: /[\w.]+/,
      keyword: r.join(" ")
    }, s = {
      className: "subst",
      begin: "[$@]\\{",
      end: "\\}",
      keywords: i
    }, o = {
      begin: /->\{/,
      end: /\}/
      // contains defined later
    }, c = { variants: [
      { begin: /\$\d/ },
      { begin: n.concat(
        /[$%@](\^\w\b|#\w+(::\w+)*|\{\w+\}|\w+(::\w*)*)/,
        // negative look-ahead tries to avoid matching patterns that are not
        // Perl at all like $ident$, @ident@, etc.
        "(?![A-Za-z])(?![@$%])"
      ) },
      {
        begin: /[$%@][^\s\w{]/,
        relevance: 0
      }
    ] }, l = [
      t.BACKSLASH_ESCAPE,
      s,
      c
    ], u = [
      /!/,
      /\//,
      /\|/,
      /\?/,
      /'/,
      /"/,
      // valid but infrequent and weird
      /#/
      // valid but infrequent and weird
    ], d = (p, _, b = "\\1") => {
      const E = b === "\\1" ? b : n.concat(b, _);
      return n.concat(
        n.concat("(?:", p, ")"),
        _,
        /(?:\\.|[^\\\/])*?/,
        E,
        /(?:\\.|[^\\\/])*?/,
        b,
        a
      );
    }, g = (p, _, b) => n.concat(
      n.concat("(?:", p, ")"),
      _,
      /(?:\\.|[^\\\/])*?/,
      b,
      a
    ), f = [
      c,
      t.HASH_COMMENT_MODE,
      t.COMMENT(
        /^=\w/,
        /=cut/,
        { endsWithParent: !0 }
      ),
      o,
      {
        className: "string",
        contains: l,
        variants: [
          {
            begin: "q[qwxr]?\\s*\\(",
            end: "\\)",
            relevance: 5
          },
          {
            begin: "q[qwxr]?\\s*\\[",
            end: "\\]",
            relevance: 5
          },
          {
            begin: "q[qwxr]?\\s*\\{",
            end: "\\}",
            relevance: 5
          },
          {
            begin: "q[qwxr]?\\s*\\|",
            end: "\\|",
            relevance: 5
          },
          {
            begin: "q[qwxr]?\\s*<",
            end: ">",
            relevance: 5
          },
          {
            begin: "qw\\s+q",
            end: "q",
            relevance: 5
          },
          {
            begin: "'",
            end: "'",
            contains: [t.BACKSLASH_ESCAPE]
          },
          {
            begin: '"',
            end: '"'
          },
          {
            begin: "`",
            end: "`",
            contains: [t.BACKSLASH_ESCAPE]
          },
          {
            begin: /\{\w+\}/,
            relevance: 0
          },
          {
            begin: "-?\\w+\\s*=>",
            relevance: 0
          }
        ]
      },
      {
        className: "number",
        begin: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
        relevance: 0
      },
      {
        // regexp container
        begin: "(\\/\\/|" + t.RE_STARTERS_RE + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
        keywords: "split return print reverse grep",
        relevance: 0,
        contains: [
          t.HASH_COMMENT_MODE,
          {
            className: "regexp",
            variants: [
              // allow matching common delimiters
              { begin: d("s|tr|y", n.either(...u, { capture: !0 })) },
              // and then paired delmis
              { begin: d("s|tr|y", "\\(", "\\)") },
              { begin: d("s|tr|y", "\\[", "\\]") },
              { begin: d("s|tr|y", "\\{", "\\}") }
            ],
            relevance: 2
          },
          {
            className: "regexp",
            variants: [
              {
                // could be a comment in many languages so do not count
                // as relevant
                begin: /(m|qr)\/\//,
                relevance: 0
              },
              // prefix is optional with /regex/
              { begin: g("(?:m|qr)?", /\//, /\//) },
              // allow matching common delimiters
              { begin: g("m|qr", n.either(...u, { capture: !0 }), /\1/) },
              // allow common paired delmins
              { begin: g("m|qr", /\(/, /\)/) },
              { begin: g("m|qr", /\[/, /\]/) },
              { begin: g("m|qr", /\{/, /\}/) }
            ]
          }
        ]
      },
      {
        className: "function",
        beginKeywords: "sub",
        end: "(\\s*\\(.*?\\))?[;{]",
        excludeEnd: !0,
        relevance: 5,
        contains: [t.TITLE_MODE]
      },
      {
        begin: "-\\w\\b",
        relevance: 0
      },
      {
        begin: "^__DATA__$",
        end: "^__END__$",
        subLanguage: "mojolicious",
        contains: [
          {
            begin: "^@@.*",
            end: "$",
            className: "comment"
          }
        ]
      }
    ];
    return s.contains = f, o.contains = f, {
      name: "Perl",
      aliases: [
        "pl",
        "pm"
      ],
      keywords: i,
      contains: f
    };
  }
  return Ut = e, Ut;
}
var Ft, mr;
function bc() {
  if (mr)
    return Ft;
  mr = 1;
  function e(t) {
    const n = {
      className: "built_in",
      begin: "\\b(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)\\w+"
    }, r = /[a-zA-Z@][a-zA-Z0-9_]*/, c = {
      "variable.language": [
        "this",
        "super"
      ],
      $pattern: r,
      keyword: [
        "while",
        "export",
        "sizeof",
        "typedef",
        "const",
        "struct",
        "for",
        "union",
        "volatile",
        "static",
        "mutable",
        "if",
        "do",
        "return",
        "goto",
        "enum",
        "else",
        "break",
        "extern",
        "asm",
        "case",
        "default",
        "register",
        "explicit",
        "typename",
        "switch",
        "continue",
        "inline",
        "readonly",
        "assign",
        "readwrite",
        "self",
        "@synchronized",
        "id",
        "typeof",
        "nonatomic",
        "IBOutlet",
        "IBAction",
        "strong",
        "weak",
        "copy",
        "in",
        "out",
        "inout",
        "bycopy",
        "byref",
        "oneway",
        "__strong",
        "__weak",
        "__block",
        "__autoreleasing",
        "@private",
        "@protected",
        "@public",
        "@try",
        "@property",
        "@end",
        "@throw",
        "@catch",
        "@finally",
        "@autoreleasepool",
        "@synthesize",
        "@dynamic",
        "@selector",
        "@optional",
        "@required",
        "@encode",
        "@package",
        "@import",
        "@defs",
        "@compatibility_alias",
        "__bridge",
        "__bridge_transfer",
        "__bridge_retained",
        "__bridge_retain",
        "__covariant",
        "__contravariant",
        "__kindof",
        "_Nonnull",
        "_Nullable",
        "_Null_unspecified",
        "__FUNCTION__",
        "__PRETTY_FUNCTION__",
        "__attribute__",
        "getter",
        "setter",
        "retain",
        "unsafe_unretained",
        "nonnull",
        "nullable",
        "null_unspecified",
        "null_resettable",
        "class",
        "instancetype",
        "NS_DESIGNATED_INITIALIZER",
        "NS_UNAVAILABLE",
        "NS_REQUIRES_SUPER",
        "NS_RETURNS_INNER_POINTER",
        "NS_INLINE",
        "NS_AVAILABLE",
        "NS_DEPRECATED",
        "NS_ENUM",
        "NS_OPTIONS",
        "NS_SWIFT_UNAVAILABLE",
        "NS_ASSUME_NONNULL_BEGIN",
        "NS_ASSUME_NONNULL_END",
        "NS_REFINED_FOR_SWIFT",
        "NS_SWIFT_NAME",
        "NS_SWIFT_NOTHROW",
        "NS_DURING",
        "NS_HANDLER",
        "NS_ENDHANDLER",
        "NS_VALUERETURN",
        "NS_VOIDRETURN"
      ],
      literal: [
        "false",
        "true",
        "FALSE",
        "TRUE",
        "nil",
        "YES",
        "NO",
        "NULL"
      ],
      built_in: [
        "dispatch_once_t",
        "dispatch_queue_t",
        "dispatch_sync",
        "dispatch_async",
        "dispatch_once"
      ],
      type: [
        "int",
        "float",
        "char",
        "unsigned",
        "signed",
        "short",
        "long",
        "double",
        "wchar_t",
        "unichar",
        "void",
        "bool",
        "BOOL",
        "id|0",
        "_Bool"
      ]
    }, l = {
      $pattern: r,
      keyword: [
        "@interface",
        "@class",
        "@protocol",
        "@implementation"
      ]
    };
    return {
      name: "Objective-C",
      aliases: [
        "mm",
        "objc",
        "obj-c",
        "obj-c++",
        "objective-c++"
      ],
      keywords: c,
      illegal: "</",
      contains: [
        n,
        t.C_LINE_COMMENT_MODE,
        t.C_BLOCK_COMMENT_MODE,
        t.C_NUMBER_MODE,
        t.QUOTE_STRING_MODE,
        t.APOS_STRING_MODE,
        {
          className: "string",
          variants: [
            {
              begin: '@"',
              end: '"',
              illegal: "\\n",
              contains: [t.BACKSLASH_ESCAPE]
            }
          ]
        },
        {
          className: "meta",
          begin: /#\s*[a-z]+\b/,
          end: /$/,
          keywords: { keyword: "if else elif endif define undef warning error line pragma ifdef ifndef include" },
          contains: [
            {
              begin: /\\\n/,
              relevance: 0
            },
            t.inherit(t.QUOTE_STRING_MODE, { className: "string" }),
            {
              className: "string",
              begin: /<.*?>/,
              end: /$/,
              illegal: "\\n"
            },
            t.C_LINE_COMMENT_MODE,
            t.C_BLOCK_COMMENT_MODE
          ]
        },
        {
          className: "class",
          begin: "(" + l.keyword.join("|") + ")\\b",
          end: /(\{|$)/,
          excludeEnd: !0,
          keywords: l,
          contains: [t.UNDERSCORE_TITLE_MODE]
        },
        {
          begin: "\\." + t.UNDERSCORE_IDENT_RE,
          relevance: 0
        }
      ]
    };
  }
  return Ft = e, Ft;
}
var $t, pr;
function mc() {
  if (pr)
    return $t;
  pr = 1;
  function e(t) {
    const n = t.regex, r = /(?![A-Za-z0-9])(?![$])/, a = n.concat(
      /[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/,
      r
    ), i = n.concat(
      /(\\?[A-Z][a-z0-9_\x7f-\xff]+|\\?[A-Z]+(?=[A-Z][a-z0-9_\x7f-\xff])){1,}/,
      r
    ), s = {
      scope: "variable",
      match: "\\$+" + a
    }, o = {
      scope: "meta",
      variants: [
        { begin: /<\?php/, relevance: 10 },
        // boost for obvious PHP
        { begin: /<\?=/ },
        // less relevant per PSR-1 which says not to use short-tags
        { begin: /<\?/, relevance: 0.1 },
        { begin: /\?>/ }
        // end php tag
      ]
    }, c = {
      scope: "subst",
      variants: [
        { begin: /\$\w+/ },
        {
          begin: /\{\$/,
          end: /\}/
        }
      ]
    }, l = t.inherit(t.APOS_STRING_MODE, { illegal: null }), u = t.inherit(t.QUOTE_STRING_MODE, {
      illegal: null,
      contains: t.QUOTE_STRING_MODE.contains.concat(c)
    }), d = {
      begin: /<<<[ \t]*(?:(\w+)|"(\w+)")\n/,
      end: /[ \t]*(\w+)\b/,
      contains: t.QUOTE_STRING_MODE.contains.concat(c),
      "on:begin": (Y, B) => {
        B.data._beginMatch = Y[1] || Y[2];
      },
      "on:end": (Y, B) => {
        B.data._beginMatch !== Y[1] && B.ignoreMatch();
      }
    }, g = t.END_SAME_AS_BEGIN({
      begin: /<<<[ \t]*'(\w+)'\n/,
      end: /[ \t]*(\w+)\b/
    }), f = `[ 	
]`, p = {
      scope: "string",
      variants: [
        u,
        l,
        d,
        g
      ]
    }, _ = {
      scope: "number",
      variants: [
        { begin: "\\b0[bB][01]+(?:_[01]+)*\\b" },
        // Binary w/ underscore support
        { begin: "\\b0[oO][0-7]+(?:_[0-7]+)*\\b" },
        // Octals w/ underscore support
        { begin: "\\b0[xX][\\da-fA-F]+(?:_[\\da-fA-F]+)*\\b" },
        // Hex w/ underscore support
        // Decimals w/ underscore support, with optional fragments and scientific exponent (e) suffix.
        { begin: "(?:\\b\\d+(?:_\\d+)*(\\.(?:\\d+(?:_\\d+)*))?|\\B\\.\\d+)(?:[eE][+-]?\\d+)?" }
      ],
      relevance: 0
    }, b = [
      "false",
      "null",
      "true"
    ], E = [
      // Magic constants:
      // <https://www.php.net/manual/en/language.constants.predefined.php>
      "__CLASS__",
      "__DIR__",
      "__FILE__",
      "__FUNCTION__",
      "__COMPILER_HALT_OFFSET__",
      "__LINE__",
      "__METHOD__",
      "__NAMESPACE__",
      "__TRAIT__",
      // Function that look like language construct or language construct that look like function:
      // List of keywords that may not require parenthesis
      "die",
      "echo",
      "exit",
      "include",
      "include_once",
      "print",
      "require",
      "require_once",
      // These are not language construct (function) but operate on the currently-executing function and can access the current symbol table
      // 'compact extract func_get_arg func_get_args func_num_args get_called_class get_parent_class ' +
      // Other keywords:
      // <https://www.php.net/manual/en/reserved.php>
      // <https://www.php.net/manual/en/language.types.type-juggling.php>
      "array",
      "abstract",
      "and",
      "as",
      "binary",
      "bool",
      "boolean",
      "break",
      "callable",
      "case",
      "catch",
      "class",
      "clone",
      "const",
      "continue",
      "declare",
      "default",
      "do",
      "double",
      "else",
      "elseif",
      "empty",
      "enddeclare",
      "endfor",
      "endforeach",
      "endif",
      "endswitch",
      "endwhile",
      "enum",
      "eval",
      "extends",
      "final",
      "finally",
      "float",
      "for",
      "foreach",
      "from",
      "global",
      "goto",
      "if",
      "implements",
      "instanceof",
      "insteadof",
      "int",
      "integer",
      "interface",
      "isset",
      "iterable",
      "list",
      "match|0",
      "mixed",
      "new",
      "never",
      "object",
      "or",
      "private",
      "protected",
      "public",
      "readonly",
      "real",
      "return",
      "string",
      "switch",
      "throw",
      "trait",
      "try",
      "unset",
      "use",
      "var",
      "void",
      "while",
      "xor",
      "yield"
    ], N = [
      // Standard PHP library:
      // <https://www.php.net/manual/en/book.spl.php>
      "Error|0",
      "AppendIterator",
      "ArgumentCountError",
      "ArithmeticError",
      "ArrayIterator",
      "ArrayObject",
      "AssertionError",
      "BadFunctionCallException",
      "BadMethodCallException",
      "CachingIterator",
      "CallbackFilterIterator",
      "CompileError",
      "Countable",
      "DirectoryIterator",
      "DivisionByZeroError",
      "DomainException",
      "EmptyIterator",
      "ErrorException",
      "Exception",
      "FilesystemIterator",
      "FilterIterator",
      "GlobIterator",
      "InfiniteIterator",
      "InvalidArgumentException",
      "IteratorIterator",
      "LengthException",
      "LimitIterator",
      "LogicException",
      "MultipleIterator",
      "NoRewindIterator",
      "OutOfBoundsException",
      "OutOfRangeException",
      "OuterIterator",
      "OverflowException",
      "ParentIterator",
      "ParseError",
      "RangeException",
      "RecursiveArrayIterator",
      "RecursiveCachingIterator",
      "RecursiveCallbackFilterIterator",
      "RecursiveDirectoryIterator",
      "RecursiveFilterIterator",
      "RecursiveIterator",
      "RecursiveIteratorIterator",
      "RecursiveRegexIterator",
      "RecursiveTreeIterator",
      "RegexIterator",
      "RuntimeException",
      "SeekableIterator",
      "SplDoublyLinkedList",
      "SplFileInfo",
      "SplFileObject",
      "SplFixedArray",
      "SplHeap",
      "SplMaxHeap",
      "SplMinHeap",
      "SplObjectStorage",
      "SplObserver",
      "SplPriorityQueue",
      "SplQueue",
      "SplStack",
      "SplSubject",
      "SplTempFileObject",
      "TypeError",
      "UnderflowException",
      "UnexpectedValueException",
      "UnhandledMatchError",
      // Reserved interfaces:
      // <https://www.php.net/manual/en/reserved.interfaces.php>
      "ArrayAccess",
      "BackedEnum",
      "Closure",
      "Fiber",
      "Generator",
      "Iterator",
      "IteratorAggregate",
      "Serializable",
      "Stringable",
      "Throwable",
      "Traversable",
      "UnitEnum",
      "WeakReference",
      "WeakMap",
      // Reserved classes:
      // <https://www.php.net/manual/en/reserved.classes.php>
      "Directory",
      "__PHP_Incomplete_Class",
      "parent",
      "php_user_filter",
      "self",
      "static",
      "stdClass"
    ], O = {
      keyword: E,
      literal: ((Y) => {
        const B = [];
        return Y.forEach((Q) => {
          B.push(Q), Q.toLowerCase() === Q ? B.push(Q.toUpperCase()) : B.push(Q.toLowerCase());
        }), B;
      })(b),
      built_in: N
    }, R = (Y) => Y.map((B) => B.replace(/\|\d+$/, "")), T = { variants: [
      {
        match: [
          /new/,
          n.concat(f, "+"),
          // to prevent built ins from being confused as the class constructor call
          n.concat("(?!", R(N).join("\\b|"), "\\b)"),
          i
        ],
        scope: {
          1: "keyword",
          4: "title.class"
        }
      }
    ] }, k = n.concat(a, "\\b(?!\\()"), v = { variants: [
      {
        match: [
          n.concat(
            /::/,
            n.lookahead(/(?!class\b)/)
          ),
          k
        ],
        scope: { 2: "variable.constant" }
      },
      {
        match: [
          /::/,
          /class/
        ],
        scope: { 2: "variable.language" }
      },
      {
        match: [
          i,
          n.concat(
            /::/,
            n.lookahead(/(?!class\b)/)
          ),
          k
        ],
        scope: {
          1: "title.class",
          3: "variable.constant"
        }
      },
      {
        match: [
          i,
          n.concat(
            "::",
            n.lookahead(/(?!class\b)/)
          )
        ],
        scope: { 1: "title.class" }
      },
      {
        match: [
          i,
          /::/,
          /class/
        ],
        scope: {
          1: "title.class",
          3: "variable.language"
        }
      }
    ] }, C = {
      scope: "attr",
      match: n.concat(a, n.lookahead(":"), n.lookahead(/(?!::)/))
    }, U = {
      relevance: 0,
      begin: /\(/,
      end: /\)/,
      keywords: O,
      contains: [
        C,
        s,
        v,
        t.C_BLOCK_COMMENT_MODE,
        p,
        _,
        T
      ]
    }, z = {
      relevance: 0,
      match: [
        /\b/,
        // to prevent keywords from being confused as the function title
        n.concat("(?!fn\\b|function\\b|", R(E).join("\\b|"), "|", R(N).join("\\b|"), "\\b)"),
        a,
        n.concat(f, "*"),
        n.lookahead(/(?=\()/)
      ],
      scope: { 3: "title.function.invoke" },
      contains: [U]
    };
    U.contains.push(z);
    const te = [
      C,
      v,
      t.C_BLOCK_COMMENT_MODE,
      p,
      _,
      T
    ], oe = {
      begin: n.concat(/#\[\s*/, i),
      beginScope: "meta",
      end: /]/,
      endScope: "meta",
      keywords: {
        literal: b,
        keyword: [
          "new",
          "array"
        ]
      },
      contains: [
        {
          begin: /\[/,
          end: /]/,
          keywords: {
            literal: b,
            keyword: [
              "new",
              "array"
            ]
          },
          contains: [
            "self",
            ...te
          ]
        },
        ...te,
        {
          scope: "meta",
          match: i
        }
      ]
    };
    return {
      case_insensitive: !1,
      keywords: O,
      contains: [
        oe,
        t.HASH_COMMENT_MODE,
        t.COMMENT("//", "$"),
        t.COMMENT(
          "/\\*",
          "\\*/",
          { contains: [
            {
              scope: "doctag",
              match: "@[A-Za-z]+"
            }
          ] }
        ),
        {
          match: /__halt_compiler\(\);/,
          keywords: "__halt_compiler",
          starts: {
            scope: "comment",
            end: t.MATCH_NOTHING_RE,
            contains: [
              {
                match: /\?>/,
                scope: "meta",
                endsParent: !0
              }
            ]
          }
        },
        o,
        {
          scope: "variable.language",
          match: /\$this\b/
        },
        s,
        z,
        v,
        {
          match: [
            /const/,
            /\s/,
            a
          ],
          scope: {
            1: "keyword",
            3: "variable.constant"
          }
        },
        T,
        {
          scope: "function",
          relevance: 0,
          beginKeywords: "fn function",
          end: /[;{]/,
          excludeEnd: !0,
          illegal: "[$%\\[]",
          contains: [
            { beginKeywords: "use" },
            t.UNDERSCORE_TITLE_MODE,
            {
              begin: "=>",
              // No markup, just a relevance booster
              endsParent: !0
            },
            {
              scope: "params",
              begin: "\\(",
              end: "\\)",
              excludeBegin: !0,
              excludeEnd: !0,
              keywords: O,
              contains: [
                "self",
                s,
                v,
                t.C_BLOCK_COMMENT_MODE,
                p,
                _
              ]
            }
          ]
        },
        {
          scope: "class",
          variants: [
            {
              beginKeywords: "enum",
              illegal: /[($"]/
            },
            {
              beginKeywords: "class interface trait",
              illegal: /[:($"]/
            }
          ],
          relevance: 0,
          end: /\{/,
          excludeEnd: !0,
          contains: [
            { beginKeywords: "extends implements" },
            t.UNDERSCORE_TITLE_MODE
          ]
        },
        // both use and namespace still use "old style" rules (vs multi-match)
        // because the namespace name can include `\` and we still want each
        // element to be treated as its own *individual* title
        {
          beginKeywords: "namespace",
          relevance: 0,
          end: ";",
          illegal: /[.']/,
          contains: [t.inherit(t.UNDERSCORE_TITLE_MODE, { scope: "title.class" })]
        },
        {
          beginKeywords: "use",
          relevance: 0,
          end: ";",
          contains: [
            // TODO: title.function vs title.class
            {
              match: /\b(as|const|function)\b/,
              scope: "keyword"
            },
            // TODO: could be title.class or title.function
            t.UNDERSCORE_TITLE_MODE
          ]
        },
        p,
        _
      ]
    };
  }
  return $t = e, $t;
}
var zt, _r;
function pc() {
  if (_r)
    return zt;
  _r = 1;
  function e(t) {
    return {
      name: "PHP template",
      subLanguage: "xml",
      contains: [
        {
          begin: /<\?(php|=)?/,
          end: /\?>/,
          subLanguage: "php",
          contains: [
            // We don't want the php closing tag ?> to close the PHP block when
            // inside any of the following blocks:
            {
              begin: "/\\*",
              end: "\\*/",
              skip: !0
            },
            {
              begin: 'b"',
              end: '"',
              skip: !0
            },
            {
              begin: "b'",
              end: "'",
              skip: !0
            },
            t.inherit(t.APOS_STRING_MODE, {
              illegal: null,
              className: null,
              contains: null,
              skip: !0
            }),
            t.inherit(t.QUOTE_STRING_MODE, {
              illegal: null,
              className: null,
              contains: null,
              skip: !0
            })
          ]
        }
      ]
    };
  }
  return zt = e, zt;
}
var qt, hr;
function _c() {
  if (hr)
    return qt;
  hr = 1;
  function e(t) {
    return {
      name: "Plain text",
      aliases: [
        "text",
        "txt"
      ],
      disableAutodetect: !0
    };
  }
  return qt = e, qt;
}
var Kt, Er;
function hc() {
  if (Er)
    return Kt;
  Er = 1;
  function e(t) {
    const n = t.regex, r = new RegExp("[\\p{XID_Start}_]\\p{XID_Continue}*", "u"), a = [
      "and",
      "as",
      "assert",
      "async",
      "await",
      "break",
      "case",
      "class",
      "continue",
      "def",
      "del",
      "elif",
      "else",
      "except",
      "finally",
      "for",
      "from",
      "global",
      "if",
      "import",
      "in",
      "is",
      "lambda",
      "match",
      "nonlocal|10",
      "not",
      "or",
      "pass",
      "raise",
      "return",
      "try",
      "while",
      "with",
      "yield"
    ], c = {
      $pattern: /[A-Za-z]\w+|__\w+__/,
      keyword: a,
      built_in: [
        "__import__",
        "abs",
        "all",
        "any",
        "ascii",
        "bin",
        "bool",
        "breakpoint",
        "bytearray",
        "bytes",
        "callable",
        "chr",
        "classmethod",
        "compile",
        "complex",
        "delattr",
        "dict",
        "dir",
        "divmod",
        "enumerate",
        "eval",
        "exec",
        "filter",
        "float",
        "format",
        "frozenset",
        "getattr",
        "globals",
        "hasattr",
        "hash",
        "help",
        "hex",
        "id",
        "input",
        "int",
        "isinstance",
        "issubclass",
        "iter",
        "len",
        "list",
        "locals",
        "map",
        "max",
        "memoryview",
        "min",
        "next",
        "object",
        "oct",
        "open",
        "ord",
        "pow",
        "print",
        "property",
        "range",
        "repr",
        "reversed",
        "round",
        "set",
        "setattr",
        "slice",
        "sorted",
        "staticmethod",
        "str",
        "sum",
        "super",
        "tuple",
        "type",
        "vars",
        "zip"
      ],
      literal: [
        "__debug__",
        "Ellipsis",
        "False",
        "None",
        "NotImplemented",
        "True"
      ],
      type: [
        "Any",
        "Callable",
        "Coroutine",
        "Dict",
        "List",
        "Literal",
        "Generic",
        "Optional",
        "Sequence",
        "Set",
        "Tuple",
        "Type",
        "Union"
      ]
    }, l = {
      className: "meta",
      begin: /^(>>>|\.\.\.) /
    }, u = {
      className: "subst",
      begin: /\{/,
      end: /\}/,
      keywords: c,
      illegal: /#/
    }, d = {
      begin: /\{\{/,
      relevance: 0
    }, g = {
      className: "string",
      contains: [t.BACKSLASH_ESCAPE],
      variants: [
        {
          begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,
          end: /'''/,
          contains: [
            t.BACKSLASH_ESCAPE,
            l
          ],
          relevance: 10
        },
        {
          begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,
          end: /"""/,
          contains: [
            t.BACKSLASH_ESCAPE,
            l
          ],
          relevance: 10
        },
        {
          begin: /([fF][rR]|[rR][fF]|[fF])'''/,
          end: /'''/,
          contains: [
            t.BACKSLASH_ESCAPE,
            l,
            d,
            u
          ]
        },
        {
          begin: /([fF][rR]|[rR][fF]|[fF])"""/,
          end: /"""/,
          contains: [
            t.BACKSLASH_ESCAPE,
            l,
            d,
            u
          ]
        },
        {
          begin: /([uU]|[rR])'/,
          end: /'/,
          relevance: 10
        },
        {
          begin: /([uU]|[rR])"/,
          end: /"/,
          relevance: 10
        },
        {
          begin: /([bB]|[bB][rR]|[rR][bB])'/,
          end: /'/
        },
        {
          begin: /([bB]|[bB][rR]|[rR][bB])"/,
          end: /"/
        },
        {
          begin: /([fF][rR]|[rR][fF]|[fF])'/,
          end: /'/,
          contains: [
            t.BACKSLASH_ESCAPE,
            d,
            u
          ]
        },
        {
          begin: /([fF][rR]|[rR][fF]|[fF])"/,
          end: /"/,
          contains: [
            t.BACKSLASH_ESCAPE,
            d,
            u
          ]
        },
        t.APOS_STRING_MODE,
        t.QUOTE_STRING_MODE
      ]
    }, f = "[0-9](_?[0-9])*", p = `(\\b(${f}))?\\.(${f})|\\b(${f})\\.`, _ = `\\b|${a.join("|")}`, b = {
      className: "number",
      relevance: 0,
      variants: [
        // exponentfloat, pointfloat
        // https://docs.python.org/3.9/reference/lexical_analysis.html#floating-point-literals
        // optionally imaginary
        // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
        // Note: no leading \b because floats can start with a decimal point
        // and we don't want to mishandle e.g. `fn(.5)`,
        // no trailing \b for pointfloat because it can end with a decimal point
        // and we don't want to mishandle e.g. `0..hex()`; this should be safe
        // because both MUST contain a decimal point and so cannot be confused with
        // the interior part of an identifier
        {
          begin: `(\\b(${f})|(${p}))[eE][+-]?(${f})[jJ]?(?=${_})`
        },
        {
          begin: `(${p})[jJ]?`
        },
        // decinteger, bininteger, octinteger, hexinteger
        // https://docs.python.org/3.9/reference/lexical_analysis.html#integer-literals
        // optionally "long" in Python 2
        // https://docs.python.org/2.7/reference/lexical_analysis.html#integer-and-long-integer-literals
        // decinteger is optionally imaginary
        // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
        {
          begin: `\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?(?=${_})`
        },
        {
          begin: `\\b0[bB](_?[01])+[lL]?(?=${_})`
        },
        {
          begin: `\\b0[oO](_?[0-7])+[lL]?(?=${_})`
        },
        {
          begin: `\\b0[xX](_?[0-9a-fA-F])+[lL]?(?=${_})`
        },
        // imagnumber (digitpart-based)
        // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
        {
          begin: `\\b(${f})[jJ](?=${_})`
        }
      ]
    }, E = {
      className: "comment",
      begin: n.lookahead(/# type:/),
      end: /$/,
      keywords: c,
      contains: [
        {
          // prevent keywords from coloring `type`
          begin: /# type:/
        },
        // comment within a datatype comment includes no keywords
        {
          begin: /#/,
          end: /\b\B/,
          endsWithParent: !0
        }
      ]
    }, N = {
      className: "params",
      variants: [
        // Exclude params in functions without params
        {
          className: "",
          begin: /\(\s*\)/,
          skip: !0
        },
        {
          begin: /\(/,
          end: /\)/,
          excludeBegin: !0,
          excludeEnd: !0,
          keywords: c,
          contains: [
            "self",
            l,
            b,
            g,
            t.HASH_COMMENT_MODE
          ]
        }
      ]
    };
    return u.contains = [
      g,
      b,
      l
    ], {
      name: "Python",
      aliases: [
        "py",
        "gyp",
        "ipython"
      ],
      unicodeRegex: !0,
      keywords: c,
      illegal: /(<\/|\?)|=>/,
      contains: [
        l,
        b,
        {
          // very common convention
          begin: /\bself\b/
        },
        {
          // eat "if" prior to string so that it won't accidentally be
          // labeled as an f-string
          beginKeywords: "if",
          relevance: 0
        },
        g,
        E,
        t.HASH_COMMENT_MODE,
        {
          match: [
            /\bdef/,
            /\s+/,
            r
          ],
          scope: {
            1: "keyword",
            3: "title.function"
          },
          contains: [N]
        },
        {
          variants: [
            {
              match: [
                /\bclass/,
                /\s+/,
                r,
                /\s*/,
                /\(\s*/,
                r,
                /\s*\)/
              ]
            },
            {
              match: [
                /\bclass/,
                /\s+/,
                r
              ]
            }
          ],
          scope: {
            1: "keyword",
            3: "title.class",
            6: "title.class.inherited"
          }
        },
        {
          className: "meta",
          begin: /^[\t ]*@/,
          end: /(?=#)|$/,
          contains: [
            b,
            N,
            g
          ]
        }
      ]
    };
  }
  return Kt = e, Kt;
}
var Ht, yr;
function Ec() {
  if (yr)
    return Ht;
  yr = 1;
  function e(t) {
    return {
      aliases: ["pycon"],
      contains: [
        {
          className: "meta.prompt",
          starts: {
            // a space separates the REPL prefix from the actual code
            // this is purely for cleaner HTML output
            end: / |$/,
            starts: {
              end: "$",
              subLanguage: "python"
            }
          },
          variants: [
            { begin: /^>>>(?=[ ]|$)/ },
            { begin: /^\.\.\.(?=[ ]|$)/ }
          ]
        }
      ]
    };
  }
  return Ht = e, Ht;
}
var Gt, Nr;
function yc() {
  if (Nr)
    return Gt;
  Nr = 1;
  function e(t) {
    const n = t.regex, r = /(?:(?:[a-zA-Z]|\.[._a-zA-Z])[._a-zA-Z0-9]*)|\.(?!\d)/, a = n.either(
      // Special case: only hexadecimal binary powers can contain fractions
      /0[xX][0-9a-fA-F]+\.[0-9a-fA-F]*[pP][+-]?\d+i?/,
      // Hexadecimal numbers without fraction and optional binary power
      /0[xX][0-9a-fA-F]+(?:[pP][+-]?\d+)?[Li]?/,
      // Decimal numbers
      /(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?[Li]?/
    ), i = /[=!<>:]=|\|\||&&|:::?|<-|<<-|->>|->|\|>|[-+*\/?!$&|:<=>@^~]|\*\*/, s = n.either(
      /[()]/,
      /[{}]/,
      /\[\[/,
      /[[\]]/,
      /\\/,
      /,/
    );
    return {
      name: "R",
      keywords: {
        $pattern: r,
        keyword: "function if in break next repeat else for while",
        literal: "NULL NA TRUE FALSE Inf NaN NA_integer_|10 NA_real_|10 NA_character_|10 NA_complex_|10",
        built_in: (
          // Builtin constants
          "LETTERS letters month.abb month.name pi T F abs acos acosh all any anyNA Arg as.call as.character as.complex as.double as.environment as.integer as.logical as.null.default as.numeric as.raw asin asinh atan atanh attr attributes baseenv browser c call ceiling class Conj cos cosh cospi cummax cummin cumprod cumsum digamma dim dimnames emptyenv exp expression floor forceAndCall gamma gc.time globalenv Im interactive invisible is.array is.atomic is.call is.character is.complex is.double is.environment is.expression is.finite is.function is.infinite is.integer is.language is.list is.logical is.matrix is.na is.name is.nan is.null is.numeric is.object is.pairlist is.raw is.recursive is.single is.symbol lazyLoadDBfetch length lgamma list log max min missing Mod names nargs nzchar oldClass on.exit pos.to.env proc.time prod quote range Re rep retracemem return round seq_along seq_len seq.int sign signif sin sinh sinpi sqrt standardGeneric substitute sum switch tan tanh tanpi tracemem trigamma trunc unclass untracemem UseMethod xtfrm"
        )
      },
      contains: [
        // Roxygen comments
        t.COMMENT(
          /#'/,
          /$/,
          { contains: [
            {
              // Handle `@examples` separately to cause all subsequent code
              // until the next `@`-tag on its own line to be kept as-is,
              // preventing highlighting. This code is example R code, so nested
              // doctags shouldn’t be treated as such. See
              // `test/markup/r/roxygen.txt` for an example.
              scope: "doctag",
              match: /@examples/,
              starts: {
                end: n.lookahead(n.either(
                  // end if another doc comment
                  /\n^#'\s*(?=@[a-zA-Z]+)/,
                  // or a line with no comment
                  /\n^(?!#')/
                )),
                endsParent: !0
              }
            },
            {
              // Handle `@param` to highlight the parameter name following
              // after.
              scope: "doctag",
              begin: "@param",
              end: /$/,
              contains: [
                {
                  scope: "variable",
                  variants: [
                    { match: r },
                    { match: /`(?:\\.|[^`\\])+`/ }
                  ],
                  endsParent: !0
                }
              ]
            },
            {
              scope: "doctag",
              match: /@[a-zA-Z]+/
            },
            {
              scope: "keyword",
              match: /\\[a-zA-Z]+/
            }
          ] }
        ),
        t.HASH_COMMENT_MODE,
        {
          scope: "string",
          contains: [t.BACKSLASH_ESCAPE],
          variants: [
            t.END_SAME_AS_BEGIN({
              begin: /[rR]"(-*)\(/,
              end: /\)(-*)"/
            }),
            t.END_SAME_AS_BEGIN({
              begin: /[rR]"(-*)\{/,
              end: /\}(-*)"/
            }),
            t.END_SAME_AS_BEGIN({
              begin: /[rR]"(-*)\[/,
              end: /\](-*)"/
            }),
            t.END_SAME_AS_BEGIN({
              begin: /[rR]'(-*)\(/,
              end: /\)(-*)'/
            }),
            t.END_SAME_AS_BEGIN({
              begin: /[rR]'(-*)\{/,
              end: /\}(-*)'/
            }),
            t.END_SAME_AS_BEGIN({
              begin: /[rR]'(-*)\[/,
              end: /\](-*)'/
            }),
            {
              begin: '"',
              end: '"',
              relevance: 0
            },
            {
              begin: "'",
              end: "'",
              relevance: 0
            }
          ]
        },
        // Matching numbers immediately following punctuation and operators is
        // tricky since we need to look at the character ahead of a number to
        // ensure the number is not part of an identifier, and we cannot use
        // negative look-behind assertions. So instead we explicitly handle all
        // possible combinations of (operator|punctuation), number.
        // TODO: replace with negative look-behind when available
        // { begin: /(?<![a-zA-Z0-9._])0[xX][0-9a-fA-F]+\.[0-9a-fA-F]*[pP][+-]?\d+i?/ },
        // { begin: /(?<![a-zA-Z0-9._])0[xX][0-9a-fA-F]+([pP][+-]?\d+)?[Li]?/ },
        // { begin: /(?<![a-zA-Z0-9._])(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?[Li]?/ }
        {
          relevance: 0,
          variants: [
            {
              scope: {
                1: "operator",
                2: "number"
              },
              match: [
                i,
                a
              ]
            },
            {
              scope: {
                1: "operator",
                2: "number"
              },
              match: [
                /%[^%]*%/,
                a
              ]
            },
            {
              scope: {
                1: "punctuation",
                2: "number"
              },
              match: [
                s,
                a
              ]
            },
            {
              scope: { 2: "number" },
              match: [
                /[^a-zA-Z0-9._]|^/,
                // not part of an identifier, or start of document
                a
              ]
            }
          ]
        },
        // Operators/punctuation when they're not directly followed by numbers
        {
          // Relevance boost for the most common assignment form.
          scope: { 3: "operator" },
          match: [
            r,
            /\s+/,
            /<-/,
            /\s+/
          ]
        },
        {
          scope: "operator",
          relevance: 0,
          variants: [
            { match: i },
            { match: /%[^%]*%/ }
          ]
        },
        {
          scope: "punctuation",
          relevance: 0,
          match: s
        },
        {
          // Escaped identifier
          begin: "`",
          end: "`",
          contains: [{ begin: /\\./ }]
        }
      ]
    };
  }
  return Gt = e, Gt;
}
var Wt, wr;
function Nc() {
  if (wr)
    return Wt;
  wr = 1;
  function e(t) {
    const n = t.regex, r = {
      className: "title.function.invoke",
      relevance: 0,
      begin: n.concat(
        /\b/,
        /(?!let|for|while|if|else|match\b)/,
        t.IDENT_RE,
        n.lookahead(/\s*\(/)
      )
    }, a = "([ui](8|16|32|64|128|size)|f(32|64))?", i = [
      "abstract",
      "as",
      "async",
      "await",
      "become",
      "box",
      "break",
      "const",
      "continue",
      "crate",
      "do",
      "dyn",
      "else",
      "enum",
      "extern",
      "false",
      "final",
      "fn",
      "for",
      "if",
      "impl",
      "in",
      "let",
      "loop",
      "macro",
      "match",
      "mod",
      "move",
      "mut",
      "override",
      "priv",
      "pub",
      "ref",
      "return",
      "self",
      "Self",
      "static",
      "struct",
      "super",
      "trait",
      "true",
      "try",
      "type",
      "typeof",
      "unsafe",
      "unsized",
      "use",
      "virtual",
      "where",
      "while",
      "yield"
    ], s = [
      "true",
      "false",
      "Some",
      "None",
      "Ok",
      "Err"
    ], o = [
      // functions
      "drop ",
      // traits
      "Copy",
      "Send",
      "Sized",
      "Sync",
      "Drop",
      "Fn",
      "FnMut",
      "FnOnce",
      "ToOwned",
      "Clone",
      "Debug",
      "PartialEq",
      "PartialOrd",
      "Eq",
      "Ord",
      "AsRef",
      "AsMut",
      "Into",
      "From",
      "Default",
      "Iterator",
      "Extend",
      "IntoIterator",
      "DoubleEndedIterator",
      "ExactSizeIterator",
      "SliceConcatExt",
      "ToString",
      // macros
      "assert!",
      "assert_eq!",
      "bitflags!",
      "bytes!",
      "cfg!",
      "col!",
      "concat!",
      "concat_idents!",
      "debug_assert!",
      "debug_assert_eq!",
      "env!",
      "eprintln!",
      "panic!",
      "file!",
      "format!",
      "format_args!",
      "include_bytes!",
      "include_str!",
      "line!",
      "local_data_key!",
      "module_path!",
      "option_env!",
      "print!",
      "println!",
      "select!",
      "stringify!",
      "try!",
      "unimplemented!",
      "unreachable!",
      "vec!",
      "write!",
      "writeln!",
      "macro_rules!",
      "assert_ne!",
      "debug_assert_ne!"
    ], c = [
      "i8",
      "i16",
      "i32",
      "i64",
      "i128",
      "isize",
      "u8",
      "u16",
      "u32",
      "u64",
      "u128",
      "usize",
      "f32",
      "f64",
      "str",
      "char",
      "bool",
      "Box",
      "Option",
      "Result",
      "String",
      "Vec"
    ];
    return {
      name: "Rust",
      aliases: ["rs"],
      keywords: {
        $pattern: t.IDENT_RE + "!?",
        type: c,
        keyword: i,
        literal: s,
        built_in: o
      },
      illegal: "</",
      contains: [
        t.C_LINE_COMMENT_MODE,
        t.COMMENT("/\\*", "\\*/", { contains: ["self"] }),
        t.inherit(t.QUOTE_STRING_MODE, {
          begin: /b?"/,
          illegal: null
        }),
        {
          className: "string",
          variants: [
            { begin: /b?r(#*)"(.|\n)*?"\1(?!#)/ },
            { begin: /b?'\\?(x\w{2}|u\w{4}|U\w{8}|.)'/ }
          ]
        },
        {
          className: "symbol",
          begin: /'[a-zA-Z_][a-zA-Z0-9_]*/
        },
        {
          className: "number",
          variants: [
            { begin: "\\b0b([01_]+)" + a },
            { begin: "\\b0o([0-7_]+)" + a },
            { begin: "\\b0x([A-Fa-f0-9_]+)" + a },
            { begin: "\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)" + a }
          ],
          relevance: 0
        },
        {
          begin: [
            /fn/,
            /\s+/,
            t.UNDERSCORE_IDENT_RE
          ],
          className: {
            1: "keyword",
            3: "title.function"
          }
        },
        {
          className: "meta",
          begin: "#!?\\[",
          end: "\\]",
          contains: [
            {
              className: "string",
              begin: /"/,
              end: /"/
            }
          ]
        },
        {
          begin: [
            /let/,
            /\s+/,
            /(?:mut\s+)?/,
            t.UNDERSCORE_IDENT_RE
          ],
          className: {
            1: "keyword",
            3: "keyword",
            4: "variable"
          }
        },
        // must come before impl/for rule later
        {
          begin: [
            /for/,
            /\s+/,
            t.UNDERSCORE_IDENT_RE,
            /\s+/,
            /in/
          ],
          className: {
            1: "keyword",
            3: "variable",
            5: "keyword"
          }
        },
        {
          begin: [
            /type/,
            /\s+/,
            t.UNDERSCORE_IDENT_RE
          ],
          className: {
            1: "keyword",
            3: "title.class"
          }
        },
        {
          begin: [
            /(?:trait|enum|struct|union|impl|for)/,
            /\s+/,
            t.UNDERSCORE_IDENT_RE
          ],
          className: {
            1: "keyword",
            3: "title.class"
          }
        },
        {
          begin: t.IDENT_RE + "::",
          keywords: {
            keyword: "Self",
            built_in: o,
            type: c
          }
        },
        {
          className: "punctuation",
          begin: "->"
        },
        r
      ]
    };
  }
  return Wt = e, Wt;
}
var Yt, vr;
function wc() {
  if (vr)
    return Yt;
  vr = 1;
  const e = (o) => ({
    IMPORTANT: {
      scope: "meta",
      begin: "!important"
    },
    BLOCK_COMMENT: o.C_BLOCK_COMMENT_MODE,
    HEXCOLOR: {
      scope: "number",
      begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
    },
    FUNCTION_DISPATCH: {
      className: "built_in",
      begin: /[\w-]+(?=\()/
    },
    ATTRIBUTE_SELECTOR_MODE: {
      scope: "selector-attr",
      begin: /\[/,
      end: /\]/,
      illegal: "$",
      contains: [
        o.APOS_STRING_MODE,
        o.QUOTE_STRING_MODE
      ]
    },
    CSS_NUMBER_MODE: {
      scope: "number",
      begin: o.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
      relevance: 0
    },
    CSS_VARIABLE: {
      className: "attr",
      begin: /--[A-Za-z_][A-Za-z0-9_-]*/
    }
  }), t = [
    "a",
    "abbr",
    "address",
    "article",
    "aside",
    "audio",
    "b",
    "blockquote",
    "body",
    "button",
    "canvas",
    "caption",
    "cite",
    "code",
    "dd",
    "del",
    "details",
    "dfn",
    "div",
    "dl",
    "dt",
    "em",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "header",
    "hgroup",
    "html",
    "i",
    "iframe",
    "img",
    "input",
    "ins",
    "kbd",
    "label",
    "legend",
    "li",
    "main",
    "mark",
    "menu",
    "nav",
    "object",
    "ol",
    "p",
    "q",
    "quote",
    "samp",
    "section",
    "span",
    "strong",
    "summary",
    "sup",
    "table",
    "tbody",
    "td",
    "textarea",
    "tfoot",
    "th",
    "thead",
    "time",
    "tr",
    "ul",
    "var",
    "video"
  ], n = [
    "any-hover",
    "any-pointer",
    "aspect-ratio",
    "color",
    "color-gamut",
    "color-index",
    "device-aspect-ratio",
    "device-height",
    "device-width",
    "display-mode",
    "forced-colors",
    "grid",
    "height",
    "hover",
    "inverted-colors",
    "monochrome",
    "orientation",
    "overflow-block",
    "overflow-inline",
    "pointer",
    "prefers-color-scheme",
    "prefers-contrast",
    "prefers-reduced-motion",
    "prefers-reduced-transparency",
    "resolution",
    "scan",
    "scripting",
    "update",
    "width",
    // TODO: find a better solution?
    "min-width",
    "max-width",
    "min-height",
    "max-height"
  ], r = [
    "active",
    "any-link",
    "blank",
    "checked",
    "current",
    "default",
    "defined",
    "dir",
    // dir()
    "disabled",
    "drop",
    "empty",
    "enabled",
    "first",
    "first-child",
    "first-of-type",
    "fullscreen",
    "future",
    "focus",
    "focus-visible",
    "focus-within",
    "has",
    // has()
    "host",
    // host or host()
    "host-context",
    // host-context()
    "hover",
    "indeterminate",
    "in-range",
    "invalid",
    "is",
    // is()
    "lang",
    // lang()
    "last-child",
    "last-of-type",
    "left",
    "link",
    "local-link",
    "not",
    // not()
    "nth-child",
    // nth-child()
    "nth-col",
    // nth-col()
    "nth-last-child",
    // nth-last-child()
    "nth-last-col",
    // nth-last-col()
    "nth-last-of-type",
    //nth-last-of-type()
    "nth-of-type",
    //nth-of-type()
    "only-child",
    "only-of-type",
    "optional",
    "out-of-range",
    "past",
    "placeholder-shown",
    "read-only",
    "read-write",
    "required",
    "right",
    "root",
    "scope",
    "target",
    "target-within",
    "user-invalid",
    "valid",
    "visited",
    "where"
    // where()
  ], a = [
    "after",
    "backdrop",
    "before",
    "cue",
    "cue-region",
    "first-letter",
    "first-line",
    "grammar-error",
    "marker",
    "part",
    "placeholder",
    "selection",
    "slotted",
    "spelling-error"
  ], i = [
    "align-content",
    "align-items",
    "align-self",
    "all",
    "animation",
    "animation-delay",
    "animation-direction",
    "animation-duration",
    "animation-fill-mode",
    "animation-iteration-count",
    "animation-name",
    "animation-play-state",
    "animation-timing-function",
    "backface-visibility",
    "background",
    "background-attachment",
    "background-blend-mode",
    "background-clip",
    "background-color",
    "background-image",
    "background-origin",
    "background-position",
    "background-repeat",
    "background-size",
    "block-size",
    "border",
    "border-block",
    "border-block-color",
    "border-block-end",
    "border-block-end-color",
    "border-block-end-style",
    "border-block-end-width",
    "border-block-start",
    "border-block-start-color",
    "border-block-start-style",
    "border-block-start-width",
    "border-block-style",
    "border-block-width",
    "border-bottom",
    "border-bottom-color",
    "border-bottom-left-radius",
    "border-bottom-right-radius",
    "border-bottom-style",
    "border-bottom-width",
    "border-collapse",
    "border-color",
    "border-image",
    "border-image-outset",
    "border-image-repeat",
    "border-image-slice",
    "border-image-source",
    "border-image-width",
    "border-inline",
    "border-inline-color",
    "border-inline-end",
    "border-inline-end-color",
    "border-inline-end-style",
    "border-inline-end-width",
    "border-inline-start",
    "border-inline-start-color",
    "border-inline-start-style",
    "border-inline-start-width",
    "border-inline-style",
    "border-inline-width",
    "border-left",
    "border-left-color",
    "border-left-style",
    "border-left-width",
    "border-radius",
    "border-right",
    "border-right-color",
    "border-right-style",
    "border-right-width",
    "border-spacing",
    "border-style",
    "border-top",
    "border-top-color",
    "border-top-left-radius",
    "border-top-right-radius",
    "border-top-style",
    "border-top-width",
    "border-width",
    "bottom",
    "box-decoration-break",
    "box-shadow",
    "box-sizing",
    "break-after",
    "break-before",
    "break-inside",
    "caption-side",
    "caret-color",
    "clear",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "column-count",
    "column-fill",
    "column-gap",
    "column-rule",
    "column-rule-color",
    "column-rule-style",
    "column-rule-width",
    "column-span",
    "column-width",
    "columns",
    "contain",
    "content",
    "content-visibility",
    "counter-increment",
    "counter-reset",
    "cue",
    "cue-after",
    "cue-before",
    "cursor",
    "direction",
    "display",
    "empty-cells",
    "filter",
    "flex",
    "flex-basis",
    "flex-direction",
    "flex-flow",
    "flex-grow",
    "flex-shrink",
    "flex-wrap",
    "float",
    "flow",
    "font",
    "font-display",
    "font-family",
    "font-feature-settings",
    "font-kerning",
    "font-language-override",
    "font-size",
    "font-size-adjust",
    "font-smoothing",
    "font-stretch",
    "font-style",
    "font-synthesis",
    "font-variant",
    "font-variant-caps",
    "font-variant-east-asian",
    "font-variant-ligatures",
    "font-variant-numeric",
    "font-variant-position",
    "font-variation-settings",
    "font-weight",
    "gap",
    "glyph-orientation-vertical",
    "grid",
    "grid-area",
    "grid-auto-columns",
    "grid-auto-flow",
    "grid-auto-rows",
    "grid-column",
    "grid-column-end",
    "grid-column-start",
    "grid-gap",
    "grid-row",
    "grid-row-end",
    "grid-row-start",
    "grid-template",
    "grid-template-areas",
    "grid-template-columns",
    "grid-template-rows",
    "hanging-punctuation",
    "height",
    "hyphens",
    "icon",
    "image-orientation",
    "image-rendering",
    "image-resolution",
    "ime-mode",
    "inline-size",
    "isolation",
    "justify-content",
    "left",
    "letter-spacing",
    "line-break",
    "line-height",
    "list-style",
    "list-style-image",
    "list-style-position",
    "list-style-type",
    "margin",
    "margin-block",
    "margin-block-end",
    "margin-block-start",
    "margin-bottom",
    "margin-inline",
    "margin-inline-end",
    "margin-inline-start",
    "margin-left",
    "margin-right",
    "margin-top",
    "marks",
    "mask",
    "mask-border",
    "mask-border-mode",
    "mask-border-outset",
    "mask-border-repeat",
    "mask-border-slice",
    "mask-border-source",
    "mask-border-width",
    "mask-clip",
    "mask-composite",
    "mask-image",
    "mask-mode",
    "mask-origin",
    "mask-position",
    "mask-repeat",
    "mask-size",
    "mask-type",
    "max-block-size",
    "max-height",
    "max-inline-size",
    "max-width",
    "min-block-size",
    "min-height",
    "min-inline-size",
    "min-width",
    "mix-blend-mode",
    "nav-down",
    "nav-index",
    "nav-left",
    "nav-right",
    "nav-up",
    "none",
    "normal",
    "object-fit",
    "object-position",
    "opacity",
    "order",
    "orphans",
    "outline",
    "outline-color",
    "outline-offset",
    "outline-style",
    "outline-width",
    "overflow",
    "overflow-wrap",
    "overflow-x",
    "overflow-y",
    "padding",
    "padding-block",
    "padding-block-end",
    "padding-block-start",
    "padding-bottom",
    "padding-inline",
    "padding-inline-end",
    "padding-inline-start",
    "padding-left",
    "padding-right",
    "padding-top",
    "page-break-after",
    "page-break-before",
    "page-break-inside",
    "pause",
    "pause-after",
    "pause-before",
    "perspective",
    "perspective-origin",
    "pointer-events",
    "position",
    "quotes",
    "resize",
    "rest",
    "rest-after",
    "rest-before",
    "right",
    "row-gap",
    "scroll-margin",
    "scroll-margin-block",
    "scroll-margin-block-end",
    "scroll-margin-block-start",
    "scroll-margin-bottom",
    "scroll-margin-inline",
    "scroll-margin-inline-end",
    "scroll-margin-inline-start",
    "scroll-margin-left",
    "scroll-margin-right",
    "scroll-margin-top",
    "scroll-padding",
    "scroll-padding-block",
    "scroll-padding-block-end",
    "scroll-padding-block-start",
    "scroll-padding-bottom",
    "scroll-padding-inline",
    "scroll-padding-inline-end",
    "scroll-padding-inline-start",
    "scroll-padding-left",
    "scroll-padding-right",
    "scroll-padding-top",
    "scroll-snap-align",
    "scroll-snap-stop",
    "scroll-snap-type",
    "scrollbar-color",
    "scrollbar-gutter",
    "scrollbar-width",
    "shape-image-threshold",
    "shape-margin",
    "shape-outside",
    "speak",
    "speak-as",
    "src",
    // @font-face
    "tab-size",
    "table-layout",
    "text-align",
    "text-align-all",
    "text-align-last",
    "text-combine-upright",
    "text-decoration",
    "text-decoration-color",
    "text-decoration-line",
    "text-decoration-style",
    "text-emphasis",
    "text-emphasis-color",
    "text-emphasis-position",
    "text-emphasis-style",
    "text-indent",
    "text-justify",
    "text-orientation",
    "text-overflow",
    "text-rendering",
    "text-shadow",
    "text-transform",
    "text-underline-position",
    "top",
    "transform",
    "transform-box",
    "transform-origin",
    "transform-style",
    "transition",
    "transition-delay",
    "transition-duration",
    "transition-property",
    "transition-timing-function",
    "unicode-bidi",
    "vertical-align",
    "visibility",
    "voice-balance",
    "voice-duration",
    "voice-family",
    "voice-pitch",
    "voice-range",
    "voice-rate",
    "voice-stress",
    "voice-volume",
    "white-space",
    "widows",
    "width",
    "will-change",
    "word-break",
    "word-spacing",
    "word-wrap",
    "writing-mode",
    "z-index"
    // reverse makes sure longer attributes `font-weight` are matched fully
    // instead of getting false positives on say `font`
  ].reverse();
  function s(o) {
    const c = e(o), l = a, u = r, d = "@[a-z-]+", g = "and or not only", p = {
      className: "variable",
      begin: "(\\$" + "[a-zA-Z-][a-zA-Z0-9_-]*" + ")\\b",
      relevance: 0
    };
    return {
      name: "SCSS",
      case_insensitive: !0,
      illegal: "[=/|']",
      contains: [
        o.C_LINE_COMMENT_MODE,
        o.C_BLOCK_COMMENT_MODE,
        // to recognize keyframe 40% etc which are outside the scope of our
        // attribute value mode
        c.CSS_NUMBER_MODE,
        {
          className: "selector-id",
          begin: "#[A-Za-z0-9_-]+",
          relevance: 0
        },
        {
          className: "selector-class",
          begin: "\\.[A-Za-z0-9_-]+",
          relevance: 0
        },
        c.ATTRIBUTE_SELECTOR_MODE,
        {
          className: "selector-tag",
          begin: "\\b(" + t.join("|") + ")\\b",
          // was there, before, but why?
          relevance: 0
        },
        {
          className: "selector-pseudo",
          begin: ":(" + u.join("|") + ")"
        },
        {
          className: "selector-pseudo",
          begin: ":(:)?(" + l.join("|") + ")"
        },
        p,
        {
          // pseudo-selector params
          begin: /\(/,
          end: /\)/,
          contains: [c.CSS_NUMBER_MODE]
        },
        c.CSS_VARIABLE,
        {
          className: "attribute",
          begin: "\\b(" + i.join("|") + ")\\b"
        },
        { begin: "\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b" },
        {
          begin: /:/,
          end: /[;}{]/,
          relevance: 0,
          contains: [
            c.BLOCK_COMMENT,
            p,
            c.HEXCOLOR,
            c.CSS_NUMBER_MODE,
            o.QUOTE_STRING_MODE,
            o.APOS_STRING_MODE,
            c.IMPORTANT,
            c.FUNCTION_DISPATCH
          ]
        },
        // matching these here allows us to treat them more like regular CSS
        // rules so everything between the {} gets regular rule highlighting,
        // which is what we want for page and font-face
        {
          begin: "@(page|font-face)",
          keywords: {
            $pattern: d,
            keyword: "@page @font-face"
          }
        },
        {
          begin: "@",
          end: "[{;]",
          returnBegin: !0,
          keywords: {
            $pattern: /[a-z-]+/,
            keyword: g,
            attribute: n.join(" ")
          },
          contains: [
            {
              begin: d,
              className: "keyword"
            },
            {
              begin: /[a-z-]+(?=:)/,
              className: "attribute"
            },
            p,
            o.QUOTE_STRING_MODE,
            o.APOS_STRING_MODE,
            c.HEXCOLOR,
            c.CSS_NUMBER_MODE
          ]
        },
        c.FUNCTION_DISPATCH
      ]
    };
  }
  return Yt = s, Yt;
}
var Zt, Sr;
function vc() {
  if (Sr)
    return Zt;
  Sr = 1;
  function e(t) {
    return {
      name: "Shell Session",
      aliases: [
        "console",
        "shellsession"
      ],
      contains: [
        {
          className: "meta.prompt",
          // We cannot add \s (spaces) in the regular expression otherwise it will be too broad and produce unexpected result.
          // For instance, in the following example, it would match "echo /path/to/home >" as a prompt:
          // echo /path/to/home > t.exe
          begin: /^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,
          starts: {
            end: /[^\\](?=\s*$)/,
            subLanguage: "bash"
          }
        }
      ]
    };
  }
  return Zt = e, Zt;
}
var Vt, Tr;
function Sc() {
  if (Tr)
    return Vt;
  Tr = 1;
  function e(t) {
    const n = t.regex, r = t.COMMENT("--", "$"), a = {
      className: "string",
      variants: [
        {
          begin: /'/,
          end: /'/,
          contains: [{ begin: /''/ }]
        }
      ]
    }, i = {
      begin: /"/,
      end: /"/,
      contains: [{ begin: /""/ }]
    }, s = [
      "true",
      "false",
      // Not sure it's correct to call NULL literal, and clauses like IS [NOT] NULL look strange that way.
      // "null",
      "unknown"
    ], o = [
      "double precision",
      "large object",
      "with timezone",
      "without timezone"
    ], c = [
      "bigint",
      "binary",
      "blob",
      "boolean",
      "char",
      "character",
      "clob",
      "date",
      "dec",
      "decfloat",
      "decimal",
      "float",
      "int",
      "integer",
      "interval",
      "nchar",
      "nclob",
      "national",
      "numeric",
      "real",
      "row",
      "smallint",
      "time",
      "timestamp",
      "varchar",
      "varying",
      // modifier (character varying)
      "varbinary"
    ], l = [
      "add",
      "asc",
      "collation",
      "desc",
      "final",
      "first",
      "last",
      "view"
    ], u = [
      "abs",
      "acos",
      "all",
      "allocate",
      "alter",
      "and",
      "any",
      "are",
      "array",
      "array_agg",
      "array_max_cardinality",
      "as",
      "asensitive",
      "asin",
      "asymmetric",
      "at",
      "atan",
      "atomic",
      "authorization",
      "avg",
      "begin",
      "begin_frame",
      "begin_partition",
      "between",
      "bigint",
      "binary",
      "blob",
      "boolean",
      "both",
      "by",
      "call",
      "called",
      "cardinality",
      "cascaded",
      "case",
      "cast",
      "ceil",
      "ceiling",
      "char",
      "char_length",
      "character",
      "character_length",
      "check",
      "classifier",
      "clob",
      "close",
      "coalesce",
      "collate",
      "collect",
      "column",
      "commit",
      "condition",
      "connect",
      "constraint",
      "contains",
      "convert",
      "copy",
      "corr",
      "corresponding",
      "cos",
      "cosh",
      "count",
      "covar_pop",
      "covar_samp",
      "create",
      "cross",
      "cube",
      "cume_dist",
      "current",
      "current_catalog",
      "current_date",
      "current_default_transform_group",
      "current_path",
      "current_role",
      "current_row",
      "current_schema",
      "current_time",
      "current_timestamp",
      "current_path",
      "current_role",
      "current_transform_group_for_type",
      "current_user",
      "cursor",
      "cycle",
      "date",
      "day",
      "deallocate",
      "dec",
      "decimal",
      "decfloat",
      "declare",
      "default",
      "define",
      "delete",
      "dense_rank",
      "deref",
      "describe",
      "deterministic",
      "disconnect",
      "distinct",
      "double",
      "drop",
      "dynamic",
      "each",
      "element",
      "else",
      "empty",
      "end",
      "end_frame",
      "end_partition",
      "end-exec",
      "equals",
      "escape",
      "every",
      "except",
      "exec",
      "execute",
      "exists",
      "exp",
      "external",
      "extract",
      "false",
      "fetch",
      "filter",
      "first_value",
      "float",
      "floor",
      "for",
      "foreign",
      "frame_row",
      "free",
      "from",
      "full",
      "function",
      "fusion",
      "get",
      "global",
      "grant",
      "group",
      "grouping",
      "groups",
      "having",
      "hold",
      "hour",
      "identity",
      "in",
      "indicator",
      "initial",
      "inner",
      "inout",
      "insensitive",
      "insert",
      "int",
      "integer",
      "intersect",
      "intersection",
      "interval",
      "into",
      "is",
      "join",
      "json_array",
      "json_arrayagg",
      "json_exists",
      "json_object",
      "json_objectagg",
      "json_query",
      "json_table",
      "json_table_primitive",
      "json_value",
      "lag",
      "language",
      "large",
      "last_value",
      "lateral",
      "lead",
      "leading",
      "left",
      "like",
      "like_regex",
      "listagg",
      "ln",
      "local",
      "localtime",
      "localtimestamp",
      "log",
      "log10",
      "lower",
      "match",
      "match_number",
      "match_recognize",
      "matches",
      "max",
      "member",
      "merge",
      "method",
      "min",
      "minute",
      "mod",
      "modifies",
      "module",
      "month",
      "multiset",
      "national",
      "natural",
      "nchar",
      "nclob",
      "new",
      "no",
      "none",
      "normalize",
      "not",
      "nth_value",
      "ntile",
      "null",
      "nullif",
      "numeric",
      "octet_length",
      "occurrences_regex",
      "of",
      "offset",
      "old",
      "omit",
      "on",
      "one",
      "only",
      "open",
      "or",
      "order",
      "out",
      "outer",
      "over",
      "overlaps",
      "overlay",
      "parameter",
      "partition",
      "pattern",
      "per",
      "percent",
      "percent_rank",
      "percentile_cont",
      "percentile_disc",
      "period",
      "portion",
      "position",
      "position_regex",
      "power",
      "precedes",
      "precision",
      "prepare",
      "primary",
      "procedure",
      "ptf",
      "range",
      "rank",
      "reads",
      "real",
      "recursive",
      "ref",
      "references",
      "referencing",
      "regr_avgx",
      "regr_avgy",
      "regr_count",
      "regr_intercept",
      "regr_r2",
      "regr_slope",
      "regr_sxx",
      "regr_sxy",
      "regr_syy",
      "release",
      "result",
      "return",
      "returns",
      "revoke",
      "right",
      "rollback",
      "rollup",
      "row",
      "row_number",
      "rows",
      "running",
      "savepoint",
      "scope",
      "scroll",
      "search",
      "second",
      "seek",
      "select",
      "sensitive",
      "session_user",
      "set",
      "show",
      "similar",
      "sin",
      "sinh",
      "skip",
      "smallint",
      "some",
      "specific",
      "specifictype",
      "sql",
      "sqlexception",
      "sqlstate",
      "sqlwarning",
      "sqrt",
      "start",
      "static",
      "stddev_pop",
      "stddev_samp",
      "submultiset",
      "subset",
      "substring",
      "substring_regex",
      "succeeds",
      "sum",
      "symmetric",
      "system",
      "system_time",
      "system_user",
      "table",
      "tablesample",
      "tan",
      "tanh",
      "then",
      "time",
      "timestamp",
      "timezone_hour",
      "timezone_minute",
      "to",
      "trailing",
      "translate",
      "translate_regex",
      "translation",
      "treat",
      "trigger",
      "trim",
      "trim_array",
      "true",
      "truncate",
      "uescape",
      "union",
      "unique",
      "unknown",
      "unnest",
      "update",
      "upper",
      "user",
      "using",
      "value",
      "values",
      "value_of",
      "var_pop",
      "var_samp",
      "varbinary",
      "varchar",
      "varying",
      "versioning",
      "when",
      "whenever",
      "where",
      "width_bucket",
      "window",
      "with",
      "within",
      "without",
      "year"
    ], d = [
      "abs",
      "acos",
      "array_agg",
      "asin",
      "atan",
      "avg",
      "cast",
      "ceil",
      "ceiling",
      "coalesce",
      "corr",
      "cos",
      "cosh",
      "count",
      "covar_pop",
      "covar_samp",
      "cume_dist",
      "dense_rank",
      "deref",
      "element",
      "exp",
      "extract",
      "first_value",
      "floor",
      "json_array",
      "json_arrayagg",
      "json_exists",
      "json_object",
      "json_objectagg",
      "json_query",
      "json_table",
      "json_table_primitive",
      "json_value",
      "lag",
      "last_value",
      "lead",
      "listagg",
      "ln",
      "log",
      "log10",
      "lower",
      "max",
      "min",
      "mod",
      "nth_value",
      "ntile",
      "nullif",
      "percent_rank",
      "percentile_cont",
      "percentile_disc",
      "position",
      "position_regex",
      "power",
      "rank",
      "regr_avgx",
      "regr_avgy",
      "regr_count",
      "regr_intercept",
      "regr_r2",
      "regr_slope",
      "regr_sxx",
      "regr_sxy",
      "regr_syy",
      "row_number",
      "sin",
      "sinh",
      "sqrt",
      "stddev_pop",
      "stddev_samp",
      "substring",
      "substring_regex",
      "sum",
      "tan",
      "tanh",
      "translate",
      "translate_regex",
      "treat",
      "trim",
      "trim_array",
      "unnest",
      "upper",
      "value_of",
      "var_pop",
      "var_samp",
      "width_bucket"
    ], g = [
      "current_catalog",
      "current_date",
      "current_default_transform_group",
      "current_path",
      "current_role",
      "current_schema",
      "current_transform_group_for_type",
      "current_user",
      "session_user",
      "system_time",
      "system_user",
      "current_time",
      "localtime",
      "current_timestamp",
      "localtimestamp"
    ], f = [
      "create table",
      "insert into",
      "primary key",
      "foreign key",
      "not null",
      "alter table",
      "add constraint",
      "grouping sets",
      "on overflow",
      "character set",
      "respect nulls",
      "ignore nulls",
      "nulls first",
      "nulls last",
      "depth first",
      "breadth first"
    ], p = d, _ = [
      ...u,
      ...l
    ].filter((O) => !d.includes(O)), b = {
      className: "variable",
      begin: /@[a-z0-9][a-z0-9_]*/
    }, E = {
      className: "operator",
      begin: /[-+*/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?/,
      relevance: 0
    }, N = {
      begin: n.concat(/\b/, n.either(...p), /\s*\(/),
      relevance: 0,
      keywords: { built_in: p }
    };
    function w(O, {
      exceptions: R,
      when: T
    } = {}) {
      const k = T;
      return R = R || [], O.map((v) => v.match(/\|\d+$/) || R.includes(v) ? v : k(v) ? `${v}|0` : v);
    }
    return {
      name: "SQL",
      case_insensitive: !0,
      // does not include {} or HTML tags `</`
      illegal: /[{}]|<\//,
      keywords: {
        $pattern: /\b[\w\.]+/,
        keyword: w(_, { when: (O) => O.length < 3 }),
        literal: s,
        type: c,
        built_in: g
      },
      contains: [
        {
          begin: n.either(...f),
          relevance: 0,
          keywords: {
            $pattern: /[\w\.]+/,
            keyword: _.concat(f),
            literal: s,
            type: c
          }
        },
        {
          className: "type",
          begin: n.either(...o)
        },
        N,
        b,
        a,
        i,
        t.C_NUMBER_MODE,
        t.C_BLOCK_COMMENT_MODE,
        r,
        E
      ]
    };
  }
  return Vt = e, Vt;
}
var Xt, Or;
function Tc() {
  if (Or)
    return Xt;
  Or = 1;
  function e(v) {
    return v ? typeof v == "string" ? v : v.source : null;
  }
  function t(v) {
    return n("(?=", v, ")");
  }
  function n(...v) {
    return v.map((U) => e(U)).join("");
  }
  function r(v) {
    const C = v[v.length - 1];
    return typeof C == "object" && C.constructor === Object ? (v.splice(v.length - 1, 1), C) : {};
  }
  function a(...v) {
    return "(" + (r(v).capture ? "" : "?:") + v.map((z) => e(z)).join("|") + ")";
  }
  const i = (v) => n(
    /\b/,
    v,
    /\w$/.test(v) ? /\b/ : /\B/
  ), s = [
    "Protocol",
    // contextual
    "Type"
    // contextual
  ].map(i), o = [
    "init",
    "self"
  ].map(i), c = [
    "Any",
    "Self"
  ], l = [
    // strings below will be fed into the regular `keywords` engine while regex
    // will result in additional modes being created to scan for those keywords to
    // avoid conflicts with other rules
    "actor",
    "any",
    // contextual
    "associatedtype",
    "async",
    "await",
    /as\?/,
    // operator
    /as!/,
    // operator
    "as",
    // operator
    "borrowing",
    // contextual
    "break",
    "case",
    "catch",
    "class",
    "consume",
    // contextual
    "consuming",
    // contextual
    "continue",
    "convenience",
    // contextual
    "copy",
    // contextual
    "default",
    "defer",
    "deinit",
    "didSet",
    // contextual
    "distributed",
    "do",
    "dynamic",
    // contextual
    "each",
    "else",
    "enum",
    "extension",
    "fallthrough",
    /fileprivate\(set\)/,
    "fileprivate",
    "final",
    // contextual
    "for",
    "func",
    "get",
    // contextual
    "guard",
    "if",
    "import",
    "indirect",
    // contextual
    "infix",
    // contextual
    /init\?/,
    /init!/,
    "inout",
    /internal\(set\)/,
    "internal",
    "in",
    "is",
    // operator
    "isolated",
    // contextual
    "nonisolated",
    // contextual
    "lazy",
    // contextual
    "let",
    "macro",
    "mutating",
    // contextual
    "nonmutating",
    // contextual
    /open\(set\)/,
    // contextual
    "open",
    // contextual
    "operator",
    "optional",
    // contextual
    "override",
    // contextual
    "postfix",
    // contextual
    "precedencegroup",
    "prefix",
    // contextual
    /private\(set\)/,
    "private",
    "protocol",
    /public\(set\)/,
    "public",
    "repeat",
    "required",
    // contextual
    "rethrows",
    "return",
    "set",
    // contextual
    "some",
    // contextual
    "static",
    "struct",
    "subscript",
    "super",
    "switch",
    "throws",
    "throw",
    /try\?/,
    // operator
    /try!/,
    // operator
    "try",
    // operator
    "typealias",
    /unowned\(safe\)/,
    // contextual
    /unowned\(unsafe\)/,
    // contextual
    "unowned",
    // contextual
    "var",
    "weak",
    // contextual
    "where",
    "while",
    "willSet"
    // contextual
  ], u = [
    "false",
    "nil",
    "true"
  ], d = [
    "assignment",
    "associativity",
    "higherThan",
    "left",
    "lowerThan",
    "none",
    "right"
  ], g = [
    "#colorLiteral",
    "#column",
    "#dsohandle",
    "#else",
    "#elseif",
    "#endif",
    "#error",
    "#file",
    "#fileID",
    "#fileLiteral",
    "#filePath",
    "#function",
    "#if",
    "#imageLiteral",
    "#keyPath",
    "#line",
    "#selector",
    "#sourceLocation",
    "#warning"
  ], f = [
    "abs",
    "all",
    "any",
    "assert",
    "assertionFailure",
    "debugPrint",
    "dump",
    "fatalError",
    "getVaList",
    "isKnownUniquelyReferenced",
    "max",
    "min",
    "numericCast",
    "pointwiseMax",
    "pointwiseMin",
    "precondition",
    "preconditionFailure",
    "print",
    "readLine",
    "repeatElement",
    "sequence",
    "stride",
    "swap",
    "swift_unboxFromSwiftValueWithType",
    "transcode",
    "type",
    "unsafeBitCast",
    "unsafeDowncast",
    "withExtendedLifetime",
    "withUnsafeMutablePointer",
    "withUnsafePointer",
    "withVaList",
    "withoutActuallyEscaping",
    "zip"
  ], p = a(
    /[/=\-+!*%<>&|^~?]/,
    /[\u00A1-\u00A7]/,
    /[\u00A9\u00AB]/,
    /[\u00AC\u00AE]/,
    /[\u00B0\u00B1]/,
    /[\u00B6\u00BB\u00BF\u00D7\u00F7]/,
    /[\u2016-\u2017]/,
    /[\u2020-\u2027]/,
    /[\u2030-\u203E]/,
    /[\u2041-\u2053]/,
    /[\u2055-\u205E]/,
    /[\u2190-\u23FF]/,
    /[\u2500-\u2775]/,
    /[\u2794-\u2BFF]/,
    /[\u2E00-\u2E7F]/,
    /[\u3001-\u3003]/,
    /[\u3008-\u3020]/,
    /[\u3030]/
  ), _ = a(
    p,
    /[\u0300-\u036F]/,
    /[\u1DC0-\u1DFF]/,
    /[\u20D0-\u20FF]/,
    /[\uFE00-\uFE0F]/,
    /[\uFE20-\uFE2F]/
    // TODO: The following characters are also allowed, but the regex isn't supported yet.
    // /[\u{E0100}-\u{E01EF}]/u
  ), b = n(p, _, "*"), E = a(
    /[a-zA-Z_]/,
    /[\u00A8\u00AA\u00AD\u00AF\u00B2-\u00B5\u00B7-\u00BA]/,
    /[\u00BC-\u00BE\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF]/,
    /[\u0100-\u02FF\u0370-\u167F\u1681-\u180D\u180F-\u1DBF]/,
    /[\u1E00-\u1FFF]/,
    /[\u200B-\u200D\u202A-\u202E\u203F-\u2040\u2054\u2060-\u206F]/,
    /[\u2070-\u20CF\u2100-\u218F\u2460-\u24FF\u2776-\u2793]/,
    /[\u2C00-\u2DFF\u2E80-\u2FFF]/,
    /[\u3004-\u3007\u3021-\u302F\u3031-\u303F\u3040-\uD7FF]/,
    /[\uF900-\uFD3D\uFD40-\uFDCF\uFDF0-\uFE1F\uFE30-\uFE44]/,
    /[\uFE47-\uFEFE\uFF00-\uFFFD]/
    // Should be /[\uFE47-\uFFFD]/, but we have to exclude FEFF.
    // The following characters are also allowed, but the regexes aren't supported yet.
    // /[\u{10000}-\u{1FFFD}\u{20000-\u{2FFFD}\u{30000}-\u{3FFFD}\u{40000}-\u{4FFFD}]/u,
    // /[\u{50000}-\u{5FFFD}\u{60000-\u{6FFFD}\u{70000}-\u{7FFFD}\u{80000}-\u{8FFFD}]/u,
    // /[\u{90000}-\u{9FFFD}\u{A0000-\u{AFFFD}\u{B0000}-\u{BFFFD}\u{C0000}-\u{CFFFD}]/u,
    // /[\u{D0000}-\u{DFFFD}\u{E0000-\u{EFFFD}]/u
  ), N = a(
    E,
    /\d/,
    /[\u0300-\u036F\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]/
  ), w = n(E, N, "*"), O = n(/[A-Z]/, N, "*"), R = [
    "attached",
    "autoclosure",
    n(/convention\(/, a("swift", "block", "c"), /\)/),
    "discardableResult",
    "dynamicCallable",
    "dynamicMemberLookup",
    "escaping",
    "freestanding",
    "frozen",
    "GKInspectable",
    "IBAction",
    "IBDesignable",
    "IBInspectable",
    "IBOutlet",
    "IBSegueAction",
    "inlinable",
    "main",
    "nonobjc",
    "NSApplicationMain",
    "NSCopying",
    "NSManaged",
    n(/objc\(/, w, /\)/),
    "objc",
    "objcMembers",
    "propertyWrapper",
    "requires_stored_property_inits",
    "resultBuilder",
    "Sendable",
    "testable",
    "UIApplicationMain",
    "unchecked",
    "unknown",
    "usableFromInline",
    "warn_unqualified_access"
  ], T = [
    "iOS",
    "iOSApplicationExtension",
    "macOS",
    "macOSApplicationExtension",
    "macCatalyst",
    "macCatalystApplicationExtension",
    "watchOS",
    "watchOSApplicationExtension",
    "tvOS",
    "tvOSApplicationExtension",
    "swift"
  ];
  function k(v) {
    const C = {
      match: /\s+/,
      relevance: 0
    }, U = v.COMMENT(
      "/\\*",
      "\\*/",
      { contains: ["self"] }
    ), z = [
      v.C_LINE_COMMENT_MODE,
      U
    ], te = {
      match: [
        /\./,
        a(...s, ...o)
      ],
      className: { 2: "keyword" }
    }, oe = {
      // Consume .keyword to prevent highlighting properties and methods as keywords.
      match: n(/\./, a(...l)),
      relevance: 0
    }, Y = l.filter((q) => typeof q == "string").concat(["_|0"]), B = l.filter((q) => typeof q != "string").concat(c).map(i), Q = { variants: [
      {
        className: "keyword",
        match: a(...B, ...o)
      }
    ] }, m = {
      $pattern: a(
        /\b\w+/,
        // regular keywords
        /#\w+/
        // number keywords
      ),
      keyword: Y.concat(g),
      literal: u
    }, y = [
      te,
      oe,
      Q
    ], I = {
      // Consume .built_in to prevent highlighting properties and methods.
      match: n(/\./, a(...f)),
      relevance: 0
    }, D = {
      className: "built_in",
      match: n(/\b/, a(...f), /(?=\()/)
    }, F = [
      I,
      D
    ], Z = {
      // Prevent -> from being highlighting as an operator.
      match: /->/,
      relevance: 0
    }, ae = {
      className: "operator",
      relevance: 0,
      variants: [
        { match: b },
        {
          // dot-operator: only operators that start with a dot are allowed to use dots as
          // characters (..., ...<, .*, etc). So there rule here is: a dot followed by one or more
          // characters that may also include dots.
          match: `\\.(\\.|${_})+`
        }
      ]
    }, ie = [
      Z,
      ae
    ], K = "([0-9]_*)+", V = "([0-9a-fA-F]_*)+", G = {
      className: "number",
      relevance: 0,
      variants: [
        // decimal floating-point-literal (subsumes decimal-literal)
        { match: `\\b(${K})(\\.(${K}))?([eE][+-]?(${K}))?\\b` },
        // hexadecimal floating-point-literal (subsumes hexadecimal-literal)
        { match: `\\b0x(${V})(\\.(${V}))?([pP][+-]?(${K}))?\\b` },
        // octal-literal
        { match: /\b0o([0-7]_*)+\b/ },
        // binary-literal
        { match: /\b0b([01]_*)+\b/ }
      ]
    }, H = (q = "") => ({
      className: "subst",
      variants: [
        { match: n(/\\/, q, /[0\\tnr"']/) },
        { match: n(/\\/, q, /u\{[0-9a-fA-F]{1,8}\}/) }
      ]
    }), J = (q = "") => ({
      className: "subst",
      match: n(/\\/, q, /[\t ]*(?:[\r\n]|\r\n)/)
    }), ne = (q = "") => ({
      className: "subst",
      label: "interpol",
      begin: n(/\\/, q, /\(/),
      end: /\)/
    }), re = (q = "") => ({
      begin: n(q, /"""/),
      end: n(/"""/, q),
      contains: [
        H(q),
        J(q),
        ne(q)
      ]
    }), ce = (q = "") => ({
      begin: n(q, /"/),
      end: n(/"/, q),
      contains: [
        H(q),
        ne(q)
      ]
    }), ue = {
      className: "string",
      variants: [
        re(),
        re("#"),
        re("##"),
        re("###"),
        ce(),
        ce("#"),
        ce("##"),
        ce("###")
      ]
    }, he = [
      v.BACKSLASH_ESCAPE,
      {
        begin: /\[/,
        end: /\]/,
        relevance: 0,
        contains: [v.BACKSLASH_ESCAPE]
      }
    ], He = {
      begin: /\/[^\s](?=[^/\n]*\/)/,
      end: /\//,
      contains: he
    }, se = (q) => {
      const Ye = n(q, /\//), xe = n(/\//, q);
      return {
        begin: Ye,
        end: xe,
        contains: [
          ...he,
          {
            scope: "comment",
            begin: `#(?!.*${xe})`,
            end: /$/
          }
        ]
      };
    }, Ge = {
      scope: "regexp",
      variants: [
        se("###"),
        se("##"),
        se("#"),
        He
      ]
    }, Oe = { match: n(/`/, w, /`/) }, M = {
      className: "variable",
      match: /\$\d+/
    }, We = {
      className: "variable",
      match: `\\$${N}+`
    }, W = [
      Oe,
      M,
      We
    ], $ = {
      match: /(@|#(un)?)available/,
      scope: "keyword",
      starts: { contains: [
        {
          begin: /\(/,
          end: /\)/,
          keywords: T,
          contains: [
            ...ie,
            G,
            ue
          ]
        }
      ] }
    }, Me = {
      scope: "keyword",
      match: n(/@/, a(...R))
    }, be = {
      scope: "meta",
      match: n(/@/, w)
    }, me = [
      $,
      Me,
      be
    ], de = {
      match: t(/\b[A-Z]/),
      relevance: 0,
      contains: [
        {
          // Common Apple frameworks, for relevance boost
          className: "type",
          match: n(/(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)/, N, "+")
        },
        {
          // Type identifier
          className: "type",
          match: O,
          relevance: 0
        },
        {
          // Optional type
          match: /[?!]+/,
          relevance: 0
        },
        {
          // Variadic parameter
          match: /\.\.\./,
          relevance: 0
        },
        {
          // Protocol composition
          match: n(/\s+&\s+/, t(O)),
          relevance: 0
        }
      ]
    }, h = {
      begin: /</,
      end: />/,
      keywords: m,
      contains: [
        ...z,
        ...y,
        ...me,
        Z,
        de
      ]
    };
    de.contains.push(h);
    const S = {
      match: n(w, /\s*:/),
      keywords: "_|0",
      relevance: 0
    }, A = {
      begin: /\(/,
      end: /\)/,
      relevance: 0,
      keywords: m,
      contains: [
        "self",
        S,
        ...z,
        Ge,
        ...y,
        ...F,
        ...ie,
        G,
        ue,
        ...W,
        ...me,
        de
      ]
    }, L = {
      begin: /</,
      end: />/,
      keywords: "repeat each",
      contains: [
        ...z,
        de
      ]
    }, X = {
      begin: a(
        t(n(w, /\s*:/)),
        t(n(w, /\s+/, w, /\s*:/))
      ),
      end: /:/,
      relevance: 0,
      contains: [
        {
          className: "keyword",
          match: /\b_\b/
        },
        {
          className: "params",
          match: w
        }
      ]
    }, le = {
      begin: /\(/,
      end: /\)/,
      keywords: m,
      contains: [
        X,
        ...z,
        ...y,
        ...ie,
        G,
        ue,
        ...me,
        de,
        A
      ],
      endsParent: !0,
      illegal: /["']/
    }, ut = {
      match: [
        /(func|macro)/,
        /\s+/,
        a(Oe.match, w, b)
      ],
      className: {
        1: "keyword",
        3: "title.function"
      },
      contains: [
        L,
        le,
        C
      ],
      illegal: [
        /\[/,
        /%/
      ]
    }, dt = {
      match: [
        /\b(?:subscript|init[?!]?)/,
        /\s*(?=[<(])/
      ],
      className: { 1: "keyword" },
      contains: [
        L,
        le,
        C
      ],
      illegal: /\[|%/
    }, fa = {
      match: [
        /operator/,
        /\s+/,
        b
      ],
      className: {
        1: "keyword",
        3: "title"
      }
    }, ba = {
      begin: [
        /precedencegroup/,
        /\s+/,
        O
      ],
      className: {
        1: "keyword",
        3: "title"
      },
      contains: [de],
      keywords: [
        ...d,
        ...u
      ],
      end: /}/
    };
    for (const q of ue.variants) {
      const Ye = q.contains.find((ma) => ma.label === "interpol");
      Ye.keywords = m;
      const xe = [
        ...y,
        ...F,
        ...ie,
        G,
        ue,
        ...W
      ];
      Ye.contains = [
        ...xe,
        {
          begin: /\(/,
          end: /\)/,
          contains: [
            "self",
            ...xe
          ]
        }
      ];
    }
    return {
      name: "Swift",
      keywords: m,
      contains: [
        ...z,
        ut,
        dt,
        {
          beginKeywords: "struct protocol class extension enum actor",
          end: "\\{",
          excludeEnd: !0,
          keywords: m,
          contains: [
            v.inherit(v.TITLE_MODE, {
              className: "title.class",
              begin: /[A-Za-z$_][\u00C0-\u02B80-9A-Za-z$_]*/
            }),
            ...y
          ]
        },
        fa,
        ba,
        {
          beginKeywords: "import",
          end: /$/,
          contains: [...z],
          relevance: 0
        },
        Ge,
        ...y,
        ...F,
        ...ie,
        G,
        ue,
        ...W,
        ...me,
        de,
        A
      ]
    };
  }
  return Xt = k, Xt;
}
var Qt, Mr;
function Oc() {
  if (Mr)
    return Qt;
  Mr = 1;
  function e(t) {
    const n = "true false yes no null", r = "[\\w#;/?:@&=+$,.~*'()[\\]]+", a = {
      className: "attr",
      variants: [
        { begin: "\\w[\\w :\\/.-]*:(?=[ 	]|$)" },
        {
          // double quoted keys
          begin: '"\\w[\\w :\\/.-]*":(?=[ 	]|$)'
        },
        {
          // single quoted keys
          begin: "'\\w[\\w :\\/.-]*':(?=[ 	]|$)"
        }
      ]
    }, i = {
      className: "template-variable",
      variants: [
        {
          // jinja templates Ansible
          begin: /\{\{/,
          end: /\}\}/
        },
        {
          // Ruby i18n
          begin: /%\{/,
          end: /\}/
        }
      ]
    }, s = {
      className: "string",
      relevance: 0,
      variants: [
        {
          begin: /'/,
          end: /'/
        },
        {
          begin: /"/,
          end: /"/
        },
        { begin: /\S+/ }
      ],
      contains: [
        t.BACKSLASH_ESCAPE,
        i
      ]
    }, o = t.inherit(s, { variants: [
      {
        begin: /'/,
        end: /'/
      },
      {
        begin: /"/,
        end: /"/
      },
      { begin: /[^\s,{}[\]]+/ }
    ] }), g = {
      className: "number",
      begin: "\\b" + "[0-9]{4}(-[0-9][0-9]){0,2}" + "([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?" + "(\\.[0-9]*)?" + "([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?" + "\\b"
    }, f = {
      end: ",",
      endsWithParent: !0,
      excludeEnd: !0,
      keywords: n,
      relevance: 0
    }, p = {
      begin: /\{/,
      end: /\}/,
      contains: [f],
      illegal: "\\n",
      relevance: 0
    }, _ = {
      begin: "\\[",
      end: "\\]",
      contains: [f],
      illegal: "\\n",
      relevance: 0
    }, b = [
      a,
      {
        className: "meta",
        begin: "^---\\s*$",
        relevance: 10
      },
      {
        // multi line string
        // Blocks start with a | or > followed by a newline
        //
        // Indentation of subsequent lines must be the same to
        // be considered part of the block
        className: "string",
        begin: "[\\|>]([1-9]?[+-])?[ ]*\\n( +)[^ ][^\\n]*\\n(\\2[^\\n]+\\n?)*"
      },
      {
        // Ruby/Rails erb
        begin: "<%[%=-]?",
        end: "[%-]?%>",
        subLanguage: "ruby",
        excludeBegin: !0,
        excludeEnd: !0,
        relevance: 0
      },
      {
        // named tags
        className: "type",
        begin: "!\\w+!" + r
      },
      // https://yaml.org/spec/1.2/spec.html#id2784064
      {
        // verbatim tags
        className: "type",
        begin: "!<" + r + ">"
      },
      {
        // primary tags
        className: "type",
        begin: "!" + r
      },
      {
        // secondary tags
        className: "type",
        begin: "!!" + r
      },
      {
        // fragment id &ref
        className: "meta",
        begin: "&" + t.UNDERSCORE_IDENT_RE + "$"
      },
      {
        // fragment reference *ref
        className: "meta",
        begin: "\\*" + t.UNDERSCORE_IDENT_RE + "$"
      },
      {
        // array listing
        className: "bullet",
        // TODO: remove |$ hack when we have proper look-ahead support
        begin: "-(?=[ ]|$)",
        relevance: 0
      },
      t.HASH_COMMENT_MODE,
      {
        beginKeywords: n,
        keywords: { literal: n }
      },
      g,
      // numbers are any valid C-style number that
      // sit isolated from other words
      {
        className: "number",
        begin: t.C_NUMBER_RE + "\\b",
        relevance: 0
      },
      p,
      _,
      s
    ], E = [...b];
    return E.pop(), E.push(o), f.contains = E, {
      name: "YAML",
      case_insensitive: !0,
      aliases: ["yml"],
      contains: b
    };
  }
  return Qt = e, Qt;
}
var Jt, Rr;
function Mc() {
  if (Rr)
    return Jt;
  Rr = 1;
  const e = "[A-Za-z$_][0-9A-Za-z$_]*", t = [
    "as",
    // for exports
    "in",
    "of",
    "if",
    "for",
    "while",
    "finally",
    "var",
    "new",
    "function",
    "do",
    "return",
    "void",
    "else",
    "break",
    "catch",
    "instanceof",
    "with",
    "throw",
    "case",
    "default",
    "try",
    "switch",
    "continue",
    "typeof",
    "delete",
    "let",
    "yield",
    "const",
    "class",
    // JS handles these with a special rule
    // "get",
    // "set",
    "debugger",
    "async",
    "await",
    "static",
    "import",
    "from",
    "export",
    "extends"
  ], n = [
    "true",
    "false",
    "null",
    "undefined",
    "NaN",
    "Infinity"
  ], r = [
    // Fundamental objects
    "Object",
    "Function",
    "Boolean",
    "Symbol",
    // numbers and dates
    "Math",
    "Date",
    "Number",
    "BigInt",
    // text
    "String",
    "RegExp",
    // Indexed collections
    "Array",
    "Float32Array",
    "Float64Array",
    "Int8Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Int16Array",
    "Int32Array",
    "Uint16Array",
    "Uint32Array",
    "BigInt64Array",
    "BigUint64Array",
    // Keyed collections
    "Set",
    "Map",
    "WeakSet",
    "WeakMap",
    // Structured data
    "ArrayBuffer",
    "SharedArrayBuffer",
    "Atomics",
    "DataView",
    "JSON",
    // Control abstraction objects
    "Promise",
    "Generator",
    "GeneratorFunction",
    "AsyncFunction",
    // Reflection
    "Reflect",
    "Proxy",
    // Internationalization
    "Intl",
    // WebAssembly
    "WebAssembly"
  ], a = [
    "Error",
    "EvalError",
    "InternalError",
    "RangeError",
    "ReferenceError",
    "SyntaxError",
    "TypeError",
    "URIError"
  ], i = [
    "setInterval",
    "setTimeout",
    "clearInterval",
    "clearTimeout",
    "require",
    "exports",
    "eval",
    "isFinite",
    "isNaN",
    "parseFloat",
    "parseInt",
    "decodeURI",
    "decodeURIComponent",
    "encodeURI",
    "encodeURIComponent",
    "escape",
    "unescape"
  ], s = [
    "arguments",
    "this",
    "super",
    "console",
    "window",
    "document",
    "localStorage",
    "sessionStorage",
    "module",
    "global"
    // Node.js
  ], o = [].concat(
    i,
    r,
    a
  );
  function c(u) {
    const d = u.regex, g = (H, { after: J }) => {
      const ne = "</" + H[0].slice(1);
      return H.input.indexOf(ne, J) !== -1;
    }, f = e, p = {
      begin: "<>",
      end: "</>"
    }, _ = /<[A-Za-z0-9\\._:-]+\s*\/>/, b = {
      begin: /<[A-Za-z0-9\\._:-]+/,
      end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
      /**
       * @param {RegExpMatchArray} match
       * @param {CallbackResponse} response
       */
      isTrulyOpeningTag: (H, J) => {
        const ne = H[0].length + H.index, re = H.input[ne];
        if (
          // HTML should not include another raw `<` inside a tag
          // nested type?
          // `<Array<Array<number>>`, etc.
          re === "<" || // the , gives away that this is not HTML
          // `<T, A extends keyof T, V>`
          re === ","
        ) {
          J.ignoreMatch();
          return;
        }
        re === ">" && (g(H, { after: ne }) || J.ignoreMatch());
        let ce;
        const ue = H.input.substring(ne);
        if (ce = ue.match(/^\s*=/)) {
          J.ignoreMatch();
          return;
        }
        if ((ce = ue.match(/^\s+extends\s+/)) && ce.index === 0) {
          J.ignoreMatch();
          return;
        }
      }
    }, E = {
      $pattern: e,
      keyword: t,
      literal: n,
      built_in: o,
      "variable.language": s
    }, N = "[0-9](_?[0-9])*", w = `\\.(${N})`, O = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", R = {
      className: "number",
      variants: [
        // DecimalLiteral
        { begin: `(\\b(${O})((${w})|\\.)?|(${w}))[eE][+-]?(${N})\\b` },
        { begin: `\\b(${O})\\b((${w})\\b|\\.)?|(${w})\\b` },
        // DecimalBigIntegerLiteral
        { begin: "\\b(0|[1-9](_?[0-9])*)n\\b" },
        // NonDecimalIntegerLiteral
        { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
        { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
        { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
        // LegacyOctalIntegerLiteral (does not include underscore separators)
        // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
        { begin: "\\b0[0-7]+n?\\b" }
      ],
      relevance: 0
    }, T = {
      className: "subst",
      begin: "\\$\\{",
      end: "\\}",
      keywords: E,
      contains: []
      // defined later
    }, k = {
      begin: "html`",
      end: "",
      starts: {
        end: "`",
        returnEnd: !1,
        contains: [
          u.BACKSLASH_ESCAPE,
          T
        ],
        subLanguage: "xml"
      }
    }, v = {
      begin: "css`",
      end: "",
      starts: {
        end: "`",
        returnEnd: !1,
        contains: [
          u.BACKSLASH_ESCAPE,
          T
        ],
        subLanguage: "css"
      }
    }, C = {
      begin: "gql`",
      end: "",
      starts: {
        end: "`",
        returnEnd: !1,
        contains: [
          u.BACKSLASH_ESCAPE,
          T
        ],
        subLanguage: "graphql"
      }
    }, U = {
      className: "string",
      begin: "`",
      end: "`",
      contains: [
        u.BACKSLASH_ESCAPE,
        T
      ]
    }, te = {
      className: "comment",
      variants: [
        u.COMMENT(
          /\/\*\*(?!\/)/,
          "\\*/",
          {
            relevance: 0,
            contains: [
              {
                begin: "(?=@[A-Za-z]+)",
                relevance: 0,
                contains: [
                  {
                    className: "doctag",
                    begin: "@[A-Za-z]+"
                  },
                  {
                    className: "type",
                    begin: "\\{",
                    end: "\\}",
                    excludeEnd: !0,
                    excludeBegin: !0,
                    relevance: 0
                  },
                  {
                    className: "variable",
                    begin: f + "(?=\\s*(-)|$)",
                    endsParent: !0,
                    relevance: 0
                  },
                  // eat spaces (not newlines) so we can find
                  // types or variables
                  {
                    begin: /(?=[^\n])\s/,
                    relevance: 0
                  }
                ]
              }
            ]
          }
        ),
        u.C_BLOCK_COMMENT_MODE,
        u.C_LINE_COMMENT_MODE
      ]
    }, oe = [
      u.APOS_STRING_MODE,
      u.QUOTE_STRING_MODE,
      k,
      v,
      C,
      U,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      R
      // This is intentional:
      // See https://github.com/highlightjs/highlight.js/issues/3288
      // hljs.REGEXP_MODE
    ];
    T.contains = oe.concat({
      // we need to pair up {} inside our subst to prevent
      // it from ending too early by matching another }
      begin: /\{/,
      end: /\}/,
      keywords: E,
      contains: [
        "self"
      ].concat(oe)
    });
    const Y = [].concat(te, T.contains), B = Y.concat([
      // eat recursive parens in sub expressions
      {
        begin: /\(/,
        end: /\)/,
        keywords: E,
        contains: ["self"].concat(Y)
      }
    ]), Q = {
      className: "params",
      begin: /\(/,
      end: /\)/,
      excludeBegin: !0,
      excludeEnd: !0,
      keywords: E,
      contains: B
    }, m = {
      variants: [
        // class Car extends vehicle
        {
          match: [
            /class/,
            /\s+/,
            f,
            /\s+/,
            /extends/,
            /\s+/,
            d.concat(f, "(", d.concat(/\./, f), ")*")
          ],
          scope: {
            1: "keyword",
            3: "title.class",
            5: "keyword",
            7: "title.class.inherited"
          }
        },
        // class Car
        {
          match: [
            /class/,
            /\s+/,
            f
          ],
          scope: {
            1: "keyword",
            3: "title.class"
          }
        }
      ]
    }, y = {
      relevance: 0,
      match: d.either(
        // Hard coded exceptions
        /\bJSON/,
        // Float32Array, OutT
        /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
        // CSSFactory, CSSFactoryT
        /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
        // FPs, FPsT
        /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/
        // P
        // single letters are not highlighted
        // BLAH
        // this will be flagged as a UPPER_CASE_CONSTANT instead
      ),
      className: "title.class",
      keywords: {
        _: [
          // se we still get relevance credit for JS library classes
          ...r,
          ...a
        ]
      }
    }, I = {
      label: "use_strict",
      className: "meta",
      relevance: 10,
      begin: /^\s*['"]use (strict|asm)['"]/
    }, D = {
      variants: [
        {
          match: [
            /function/,
            /\s+/,
            f,
            /(?=\s*\()/
          ]
        },
        // anonymous function
        {
          match: [
            /function/,
            /\s*(?=\()/
          ]
        }
      ],
      className: {
        1: "keyword",
        3: "title.function"
      },
      label: "func.def",
      contains: [Q],
      illegal: /%/
    }, F = {
      relevance: 0,
      match: /\b[A-Z][A-Z_0-9]+\b/,
      className: "variable.constant"
    };
    function Z(H) {
      return d.concat("(?!", H.join("|"), ")");
    }
    const ae = {
      match: d.concat(
        /\b/,
        Z([
          ...i,
          "super",
          "import"
        ]),
        f,
        d.lookahead(/\(/)
      ),
      className: "title.function",
      relevance: 0
    }, ie = {
      begin: d.concat(/\./, d.lookahead(
        d.concat(f, /(?![0-9A-Za-z$_(])/)
      )),
      end: f,
      excludeBegin: !0,
      keywords: "prototype",
      className: "property",
      relevance: 0
    }, K = {
      match: [
        /get|set/,
        /\s+/,
        f,
        /(?=\()/
      ],
      className: {
        1: "keyword",
        3: "title.function"
      },
      contains: [
        {
          // eat to avoid empty params
          begin: /\(\)/
        },
        Q
      ]
    }, V = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + u.UNDERSCORE_IDENT_RE + ")\\s*=>", G = {
      match: [
        /const|var|let/,
        /\s+/,
        f,
        /\s*/,
        /=\s*/,
        /(async\s*)?/,
        // async is optional
        d.lookahead(V)
      ],
      keywords: "async",
      className: {
        1: "keyword",
        3: "title.function"
      },
      contains: [
        Q
      ]
    };
    return {
      name: "JavaScript",
      aliases: ["js", "jsx", "mjs", "cjs"],
      keywords: E,
      // this will be extended by TypeScript
      exports: { PARAMS_CONTAINS: B, CLASS_REFERENCE: y },
      illegal: /#(?![$_A-z])/,
      contains: [
        u.SHEBANG({
          label: "shebang",
          binary: "node",
          relevance: 5
        }),
        I,
        u.APOS_STRING_MODE,
        u.QUOTE_STRING_MODE,
        k,
        v,
        C,
        U,
        te,
        // Skip numbers when they are part of a variable name
        { match: /\$\d+/ },
        R,
        y,
        {
          className: "attr",
          begin: f + d.lookahead(":"),
          relevance: 0
        },
        G,
        {
          // "value" container
          begin: "(" + u.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
          keywords: "return throw case",
          relevance: 0,
          contains: [
            te,
            u.REGEXP_MODE,
            {
              className: "function",
              // we have to count the parens to make sure we actually have the
              // correct bounding ( ) before the =>.  There could be any number of
              // sub-expressions inside also surrounded by parens.
              begin: V,
              returnBegin: !0,
              end: "\\s*=>",
              contains: [
                {
                  className: "params",
                  variants: [
                    {
                      begin: u.UNDERSCORE_IDENT_RE,
                      relevance: 0
                    },
                    {
                      className: null,
                      begin: /\(\s*\)/,
                      skip: !0
                    },
                    {
                      begin: /\(/,
                      end: /\)/,
                      excludeBegin: !0,
                      excludeEnd: !0,
                      keywords: E,
                      contains: B
                    }
                  ]
                }
              ]
            },
            {
              // could be a comma delimited list of params to a function call
              begin: /,/,
              relevance: 0
            },
            {
              match: /\s+/,
              relevance: 0
            },
            {
              // JSX
              variants: [
                { begin: p.begin, end: p.end },
                { match: _ },
                {
                  begin: b.begin,
                  // we carefully check the opening tag to see if it truly
                  // is a tag and not a false positive
                  "on:begin": b.isTrulyOpeningTag,
                  end: b.end
                }
              ],
              subLanguage: "xml",
              contains: [
                {
                  begin: b.begin,
                  end: b.end,
                  skip: !0,
                  contains: ["self"]
                }
              ]
            }
          ]
        },
        D,
        {
          // prevent this from getting swallowed up by function
          // since they appear "function like"
          beginKeywords: "while if switch catch for"
        },
        {
          // we have to count the parens to make sure we actually have the correct
          // bounding ( ).  There could be any number of sub-expressions inside
          // also surrounded by parens.
          begin: "\\b(?!function)" + u.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
          // end parens
          returnBegin: !0,
          label: "func.def",
          contains: [
            Q,
            u.inherit(u.TITLE_MODE, { begin: f, className: "title.function" })
          ]
        },
        // catch ... so it won't trigger the property rule below
        {
          match: /\.\.\./,
          relevance: 0
        },
        ie,
        // hack: prevents detection of keywords in some circumstances
        // .keyword()
        // $keyword = x
        {
          match: "\\$" + f,
          relevance: 0
        },
        {
          match: [/\bconstructor(?=\s*\()/],
          className: { 1: "title.function" },
          contains: [Q]
        },
        ae,
        F,
        m,
        K,
        {
          match: /\$[(.]/
          // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
        }
      ]
    };
  }
  function l(u) {
    const d = c(u), g = e, f = [
      "any",
      "void",
      "number",
      "boolean",
      "string",
      "object",
      "never",
      "symbol",
      "bigint",
      "unknown"
    ], p = {
      beginKeywords: "namespace",
      end: /\{/,
      excludeEnd: !0,
      contains: [d.exports.CLASS_REFERENCE]
    }, _ = {
      beginKeywords: "interface",
      end: /\{/,
      excludeEnd: !0,
      keywords: {
        keyword: "interface extends",
        built_in: f
      },
      contains: [d.exports.CLASS_REFERENCE]
    }, b = {
      className: "meta",
      relevance: 10,
      begin: /^\s*['"]use strict['"]/
    }, E = [
      "type",
      "namespace",
      "interface",
      "public",
      "private",
      "protected",
      "implements",
      "declare",
      "abstract",
      "readonly",
      "enum",
      "override"
    ], N = {
      $pattern: e,
      keyword: t.concat(E),
      literal: n,
      built_in: o.concat(f),
      "variable.language": s
    }, w = {
      className: "meta",
      begin: "@" + g
    }, O = (T, k, v) => {
      const C = T.contains.findIndex((U) => U.label === k);
      if (C === -1)
        throw new Error("can not find mode to replace");
      T.contains.splice(C, 1, v);
    };
    Object.assign(d.keywords, N), d.exports.PARAMS_CONTAINS.push(w), d.contains = d.contains.concat([
      w,
      p,
      _
    ]), O(d, "shebang", u.SHEBANG()), O(d, "use_strict", b);
    const R = d.contains.find((T) => T.label === "func.def");
    return R.relevance = 0, Object.assign(d, {
      name: "TypeScript",
      aliases: [
        "ts",
        "tsx",
        "mts",
        "cts"
      ]
    }), d;
  }
  return Jt = l, Jt;
}
var jt, Ar;
function Rc() {
  if (Ar)
    return jt;
  Ar = 1;
  function e(t) {
    const n = t.regex, r = {
      className: "string",
      begin: /"(""|[^/n])"C\b/
    }, a = {
      className: "string",
      begin: /"/,
      end: /"/,
      illegal: /\n/,
      contains: [
        {
          // double quote escape
          begin: /""/
        }
      ]
    }, i = /\d{1,2}\/\d{1,2}\/\d{4}/, s = /\d{4}-\d{1,2}-\d{1,2}/, o = /(\d|1[012])(:\d+){0,2} *(AM|PM)/, c = /\d{1,2}(:\d{1,2}){1,2}/, l = {
      className: "literal",
      variants: [
        {
          // #YYYY-MM-DD# (ISO-Date) or #M/D/YYYY# (US-Date)
          begin: n.concat(/# */, n.either(s, i), / *#/)
        },
        {
          // #H:mm[:ss]# (24h Time)
          begin: n.concat(/# */, c, / *#/)
        },
        {
          // #h[:mm[:ss]] A# (12h Time)
          begin: n.concat(/# */, o, / *#/)
        },
        {
          // date plus time
          begin: n.concat(
            /# */,
            n.either(s, i),
            / +/,
            n.either(o, c),
            / *#/
          )
        }
      ]
    }, u = {
      className: "number",
      relevance: 0,
      variants: [
        {
          // Float
          begin: /\b\d[\d_]*((\.[\d_]+(E[+-]?[\d_]+)?)|(E[+-]?[\d_]+))[RFD@!#]?/
        },
        {
          // Integer (base 10)
          begin: /\b\d[\d_]*((U?[SIL])|[%&])?/
        },
        {
          // Integer (base 16)
          begin: /&H[\dA-F_]+((U?[SIL])|[%&])?/
        },
        {
          // Integer (base 8)
          begin: /&O[0-7_]+((U?[SIL])|[%&])?/
        },
        {
          // Integer (base 2)
          begin: /&B[01_]+((U?[SIL])|[%&])?/
        }
      ]
    }, d = {
      className: "label",
      begin: /^\w+:/
    }, g = t.COMMENT(/'''/, /$/, { contains: [
      {
        className: "doctag",
        begin: /<\/?/,
        end: />/
      }
    ] }), f = t.COMMENT(null, /$/, { variants: [
      { begin: /'/ },
      {
        // TODO: Use multi-class for leading spaces
        begin: /([\t ]|^)REM(?=\s)/
      }
    ] });
    return {
      name: "Visual Basic .NET",
      aliases: ["vb"],
      case_insensitive: !0,
      classNameAliases: { label: "symbol" },
      keywords: {
        keyword: "addhandler alias aggregate ansi as async assembly auto binary by byref byval call case catch class compare const continue custom declare default delegate dim distinct do each equals else elseif end enum erase error event exit explicit finally for friend from function get global goto group handles if implements imports in inherits interface into iterator join key let lib loop me mid module mustinherit mustoverride mybase myclass namespace narrowing new next notinheritable notoverridable of off on operator option optional order overloads overridable overrides paramarray partial preserve private property protected public raiseevent readonly redim removehandler resume return select set shadows shared skip static step stop structure strict sub synclock take text then throw to try unicode until using when where while widening with withevents writeonly yield",
        built_in: (
          // Operators https://docs.microsoft.com/dotnet/visual-basic/language-reference/operators
          "addressof and andalso await directcast gettype getxmlnamespace is isfalse isnot istrue like mod nameof new not or orelse trycast typeof xor cbool cbyte cchar cdate cdbl cdec cint clng cobj csbyte cshort csng cstr cuint culng cushort"
        ),
        type: (
          // Data types https://docs.microsoft.com/dotnet/visual-basic/language-reference/data-types
          "boolean byte char date decimal double integer long object sbyte short single string uinteger ulong ushort"
        ),
        literal: "true false nothing"
      },
      illegal: "//|\\{|\\}|endif|gosub|variant|wend|^\\$ ",
      contains: [
        r,
        a,
        l,
        u,
        d,
        g,
        f,
        {
          className: "meta",
          // TODO: Use multi-class for indentation once available
          begin: /[\t ]*#(const|disable|else|elseif|enable|end|externalsource|if|region)\b/,
          end: /$/,
          keywords: { keyword: "const disable else elseif enable end externalsource if region then" },
          contains: [f]
        }
      ]
    };
  }
  return jt = e, jt;
}
var en, kr;
function Ac() {
  if (kr)
    return en;
  kr = 1;
  function e(t) {
    t.regex;
    const n = t.COMMENT(/\(;/, /;\)/);
    n.contains.push("self");
    const r = t.COMMENT(/;;/, /$/), a = [
      "anyfunc",
      "block",
      "br",
      "br_if",
      "br_table",
      "call",
      "call_indirect",
      "data",
      "drop",
      "elem",
      "else",
      "end",
      "export",
      "func",
      "global.get",
      "global.set",
      "local.get",
      "local.set",
      "local.tee",
      "get_global",
      "get_local",
      "global",
      "if",
      "import",
      "local",
      "loop",
      "memory",
      "memory.grow",
      "memory.size",
      "module",
      "mut",
      "nop",
      "offset",
      "param",
      "result",
      "return",
      "select",
      "set_global",
      "set_local",
      "start",
      "table",
      "tee_local",
      "then",
      "type",
      "unreachable"
    ], i = {
      begin: [
        /(?:func|call|call_indirect)/,
        /\s+/,
        /\$[^\s)]+/
      ],
      className: {
        1: "keyword",
        3: "title.function"
      }
    }, s = {
      className: "variable",
      begin: /\$[\w_]+/
    }, o = {
      match: /(\((?!;)|\))+/,
      className: "punctuation",
      relevance: 0
    }, c = {
      className: "number",
      relevance: 0,
      // borrowed from Prism, TODO: split out into variants
      match: /[+-]?\b(?:\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:[eE][+-]?\d(?:_?\d)*)?|0x[\da-fA-F](?:_?[\da-fA-F])*(?:\.[\da-fA-F](?:_?[\da-fA-D])*)?(?:[pP][+-]?\d(?:_?\d)*)?)\b|\binf\b|\bnan(?::0x[\da-fA-F](?:_?[\da-fA-D])*)?\b/
    }, l = {
      // look-ahead prevents us from gobbling up opcodes
      match: /(i32|i64|f32|f64)(?!\.)/,
      className: "type"
    }, u = {
      className: "keyword",
      // borrowed from Prism, TODO: split out into variants
      match: /\b(f32|f64|i32|i64)(?:\.(?:abs|add|and|ceil|clz|const|convert_[su]\/i(?:32|64)|copysign|ctz|demote\/f64|div(?:_[su])?|eqz?|extend_[su]\/i32|floor|ge(?:_[su])?|gt(?:_[su])?|le(?:_[su])?|load(?:(?:8|16|32)_[su])?|lt(?:_[su])?|max|min|mul|nearest|neg?|or|popcnt|promote\/f32|reinterpret\/[fi](?:32|64)|rem_[su]|rot[lr]|shl|shr_[su]|store(?:8|16|32)?|sqrt|sub|trunc(?:_[su]\/f(?:32|64))?|wrap\/i64|xor))\b/
    };
    return {
      name: "WebAssembly",
      keywords: {
        $pattern: /[\w.]+/,
        keyword: a
      },
      contains: [
        r,
        n,
        {
          match: [
            /(?:offset|align)/,
            /\s*/,
            /=/
          ],
          className: {
            1: "keyword",
            3: "operator"
          }
        },
        s,
        o,
        i,
        t.QUOTE_STRING_MODE,
        l,
        u,
        c
      ]
    };
  }
  return en = e, en;
}
var x = ga;
x.registerLanguage("xml", Zo());
x.registerLanguage("bash", Vo());
x.registerLanguage("c", Xo());
x.registerLanguage("cpp", Qo());
x.registerLanguage("csharp", Jo());
x.registerLanguage("css", jo());
x.registerLanguage("markdown", ec());
x.registerLanguage("diff", tc());
x.registerLanguage("ruby", nc());
x.registerLanguage("go", rc());
x.registerLanguage("graphql", ac());
x.registerLanguage("ini", ic());
x.registerLanguage("java", sc());
x.registerLanguage("javascript", oc());
x.registerLanguage("json", cc());
x.registerLanguage("kotlin", lc());
x.registerLanguage("less", uc());
x.registerLanguage("lua", dc());
x.registerLanguage("makefile", gc());
x.registerLanguage("perl", fc());
x.registerLanguage("objectivec", bc());
x.registerLanguage("php", mc());
x.registerLanguage("php-template", pc());
x.registerLanguage("plaintext", _c());
x.registerLanguage("python", hc());
x.registerLanguage("python-repl", Ec());
x.registerLanguage("r", yc());
x.registerLanguage("rust", Nc());
x.registerLanguage("scss", wc());
x.registerLanguage("shell", vc());
x.registerLanguage("sql", Sc());
x.registerLanguage("swift", Tc());
x.registerLanguage("yaml", Oc());
x.registerLanguage("typescript", Mc());
x.registerLanguage("vbnet", Rc());
x.registerLanguage("wasm", Ac());
x.HighlightJS = x;
x.default = x;
var Ir = Cr({ props: { code: { type: String, required: !0 }, language: { type: String, default: "" }, autodetect: { type: Boolean, default: !0 }, ignoreIllegals: { type: Boolean, default: !0 } }, setup: function(e) {
  var t = xr(e.language);
  Na(function() {
    return e.language;
  }, function(a) {
    t.value = a;
  });
  var n = Ze(function() {
    return e.autodetect || !t.value;
  }), r = Ze(function() {
    return !n.value && !ht.getLanguage(t.value);
  });
  return { className: Ze(function() {
    return r.value ? "" : "hljs " + t.value;
  }), highlightedCode: Ze(function() {
    var a;
    if (r.value)
      return console.warn('The language "' + t.value + '" you specified could not be found.'), e.code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
    if (n.value) {
      var i = ht.highlightAuto(e.code);
      return t.value = (a = i.language) !== null && a !== void 0 ? a : "", i.value;
    }
    return (i = ht.highlight(e.code, { language: t.value, ignoreIllegals: e.ignoreIllegals })).value;
  }) };
}, render: function() {
  return tt("pre", {}, [tt("code", { class: this.className, innerHTML: this.highlightedCode })]);
} }), kc = { install: function(e) {
  e.component("highlightjs", Ir);
}, component: Ir };
wa(js).use(kc).mount("#app");
