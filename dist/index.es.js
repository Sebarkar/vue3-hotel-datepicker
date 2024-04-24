import { ref as d, computed as it, reactive as ut, watch as ft, onUnmounted as ct, onMounted as ht, openBlock as z, createElementBlock as L, createElementVNode as B, normalizeClass as Q, normalizeStyle as dt, renderSlot as U, createTextVNode as q, toDisplayString as X, Fragment as me, renderList as De } from "vue";
var Pe = /d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g, P = "\\d\\d?", F = "\\d\\d", vt = "\\d{3}", mt = "\\d{4}", ee = "[^\\s]+", Ee = /\[([^]*?)\]/gm;
function Ae(a, r) {
  for (var n = [], g = 0, u = a.length; g < u; g++)
    n.push(a[g].substr(0, r));
  return n;
}
var Ne = function(a) {
  return function(r, n) {
    var g = n[a].map(function(O) {
      return O.toLowerCase();
    }), u = g.indexOf(r.toLowerCase());
    return u > -1 ? u : null;
  };
};
function te(a) {
  for (var r = [], n = 1; n < arguments.length; n++)
    r[n - 1] = arguments[n];
  for (var g = 0, u = r; g < u.length; g++) {
    var O = u[g];
    for (var C in O)
      a[C] = O[C];
  }
  return a;
}
var $e = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
], ze = [
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
], Dt = Ae(ze, 3), gt = Ae($e, 3), pt = {
  dayNamesShort: gt,
  dayNames: $e,
  monthNamesShort: Dt,
  monthNames: ze,
  amPm: ["am", "pm"],
  DoFn: function(a) {
    return a + ["th", "st", "nd", "rd"][a % 10 > 3 ? 0 : (a - a % 10 !== 10 ? 1 : 0) * a % 10];
  }
}, Le = te({}, pt), Te = function(a) {
  return a.replace(/[|\\{()[^$+*?.-]/g, "\\$&");
}, w = function(a, r) {
  for (r === void 0 && (r = 2), a = String(a); a.length < r; )
    a = "0" + a;
  return a;
}, Mt = {
  D: function(a) {
    return String(a.getDate());
  },
  DD: function(a) {
    return w(a.getDate());
  },
  Do: function(a, r) {
    return r.DoFn(a.getDate());
  },
  d: function(a) {
    return String(a.getDay());
  },
  dd: function(a) {
    return w(a.getDay());
  },
  ddd: function(a, r) {
    return r.dayNamesShort[a.getDay()];
  },
  dddd: function(a, r) {
    return r.dayNames[a.getDay()];
  },
  M: function(a) {
    return String(a.getMonth() + 1);
  },
  MM: function(a) {
    return w(a.getMonth() + 1);
  },
  MMM: function(a, r) {
    return r.monthNamesShort[a.getMonth()];
  },
  MMMM: function(a, r) {
    return r.monthNames[a.getMonth()];
  },
  YY: function(a) {
    return w(String(a.getFullYear()), 4).substr(2);
  },
  YYYY: function(a) {
    return w(a.getFullYear(), 4);
  },
  h: function(a) {
    return String(a.getHours() % 12 || 12);
  },
  hh: function(a) {
    return w(a.getHours() % 12 || 12);
  },
  H: function(a) {
    return String(a.getHours());
  },
  HH: function(a) {
    return w(a.getHours());
  },
  m: function(a) {
    return String(a.getMinutes());
  },
  mm: function(a) {
    return w(a.getMinutes());
  },
  s: function(a) {
    return String(a.getSeconds());
  },
  ss: function(a) {
    return w(a.getSeconds());
  },
  S: function(a) {
    return String(Math.round(a.getMilliseconds() / 100));
  },
  SS: function(a) {
    return w(Math.round(a.getMilliseconds() / 10), 2);
  },
  SSS: function(a) {
    return w(a.getMilliseconds(), 3);
  },
  a: function(a, r) {
    return a.getHours() < 12 ? r.amPm[0] : r.amPm[1];
  },
  A: function(a, r) {
    return a.getHours() < 12 ? r.amPm[0].toUpperCase() : r.amPm[1].toUpperCase();
  },
  ZZ: function(a) {
    var r = a.getTimezoneOffset();
    return (r > 0 ? "-" : "+") + w(Math.floor(Math.abs(r) / 60) * 100 + Math.abs(r) % 60, 4);
  },
  Z: function(a) {
    var r = a.getTimezoneOffset();
    return (r > 0 ? "-" : "+") + w(Math.floor(Math.abs(r) / 60), 2) + ":" + w(Math.abs(r) % 60, 2);
  }
}, Be = function(a) {
  return +a - 1;
}, He = [null, P], _e = [null, ee], Ve = [
  "isPm",
  ee,
  function(a, r) {
    var n = a.toLowerCase();
    return n === r.amPm[0] ? 0 : n === r.amPm[1] ? 1 : null;
  }
], Fe = [
  "timezoneOffset",
  "[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",
  function(a) {
    var r = (a + "").match(/([+-]|\d\d)/gi);
    if (r) {
      var n = +r[1] * 60 + parseInt(r[2], 10);
      return r[0] === "+" ? n : -n;
    }
    return 0;
  }
], yt = {
  D: ["day", P],
  DD: ["day", F],
  Do: ["day", P + ee, function(a) {
    return parseInt(a, 10);
  }],
  M: ["month", P, Be],
  MM: ["month", F, Be],
  YY: [
    "year",
    F,
    function(a) {
      var r = /* @__PURE__ */ new Date(), n = +("" + r.getFullYear()).substr(0, 2);
      return +("" + (+a > 68 ? n - 1 : n) + a);
    }
  ],
  h: ["hour", P, void 0, "isPm"],
  hh: ["hour", F, void 0, "isPm"],
  H: ["hour", P],
  HH: ["hour", F],
  m: ["minute", P],
  mm: ["minute", F],
  s: ["second", P],
  ss: ["second", F],
  YYYY: ["year", mt],
  S: ["millisecond", "\\d", function(a) {
    return +a * 100;
  }],
  SS: ["millisecond", F, function(a) {
    return +a * 10;
  }],
  SSS: ["millisecond", vt],
  d: He,
  dd: He,
  ddd: _e,
  dddd: _e,
  MMM: ["month", ee, Ne("monthNamesShort")],
  MMMM: ["month", ee, Ne("monthNames")],
  a: Ve,
  A: Ve,
  ZZ: Fe,
  Z: Fe
}, ge = {
  default: "ddd MMM DD YYYY HH:mm:ss",
  shortDate: "M/D/YY",
  mediumDate: "MMM D, YYYY",
  longDate: "MMMM D, YYYY",
  fullDate: "dddd, MMMM D, YYYY",
  isoDate: "YYYY-MM-DD",
  isoDateTime: "YYYY-MM-DDTHH:mm:ssZ",
  shortTime: "HH:mm",
  mediumTime: "HH:mm:ss",
  longTime: "HH:mm:ss.SSS"
}, W = function(a, r, n) {
  if (r === void 0 && (r = ge.default), n === void 0 && (n = {}), typeof a == "number" && (a = new Date(a)), Object.prototype.toString.call(a) !== "[object Date]" || isNaN(a.getTime()))
    throw new Error("Invalid Date pass to format");
  r = ge[r] || r;
  var g = [];
  r = r.replace(Ee, function(O, C) {
    return g.push(C), "@@@";
  });
  var u = te(te({}, Le), n);
  return r = r.replace(Pe, function(O) {
    return Mt[O](a, u);
  }), r.replace(/@@@/g, function() {
    return g.shift();
  });
};
function We(a, r, n) {
  if (n === void 0 && (n = {}), typeof r != "string")
    throw new Error("Invalid format in fecha parse");
  if (r = ge[r] || r, a.length > 1e3)
    return null;
  var g = /* @__PURE__ */ new Date(), u = {
    year: g.getFullYear(),
    month: 0,
    day: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
    isPm: null,
    timezoneOffset: null
  }, O = [], C = [], E = r.replace(Ee, function(m, o) {
    return C.push(Te(o)), "@@@";
  }), Z = {}, H = {};
  E = Te(E).replace(Pe, function(m) {
    var o = yt[m], $ = o[0], ie = o[1], ae = o[3];
    if (Z[$])
      throw new Error("Invalid format. " + $ + " specified twice in format");
    return Z[$] = !0, ae && (H[ae] = !0), O.push(o), "(" + ie + ")";
  }), Object.keys(H).forEach(function(m) {
    if (!Z[m])
      throw new Error("Invalid format. " + m + " is required in specified format");
  }), E = E.replace(/@@@/g, function() {
    return C.shift();
  });
  var k = a.match(new RegExp(E, "i"));
  if (!k)
    return null;
  for (var f = te(te({}, Le), n), c = 1; c < k.length; c++) {
    var _ = O[c - 1], M = _[0], A = _[2], ne = A ? A(k[c], f) : +k[c];
    if (ne == null)
      return null;
    u[M] = ne;
  }
  u.isPm === 1 && u.hour != null && +u.hour != 12 ? u.hour = +u.hour + 12 : u.isPm === 0 && +u.hour == 12 && (u.hour = 0);
  var x;
  if (u.timezoneOffset == null) {
    x = new Date(u.year, u.month, u.day, u.hour, u.minute, u.second, u.millisecond);
    for (var I = [
      ["month", "getMonth"],
      ["day", "getDate"],
      ["hour", "getHours"],
      ["minute", "getMinutes"],
      ["second", "getSeconds"]
    ], c = 0, v = I.length; c < v; c++)
      if (Z[I[c][0]] && u[I[c][0]] !== x[I[c][1]]())
        return null;
  } else if (x = new Date(Date.UTC(u.year, u.month, u.day, u.hour, u.minute - u.timezoneOffset, u.second, u.millisecond)), u.month > 11 || u.month < 0 || u.day > 31 || u.day < 1 || u.hour > 23 || u.hour < 0 || u.minute > 59 || u.minute < 0 || u.second > 59 || u.second < 0)
    return null;
  return x;
}
const Yt = (a, r) => {
  const n = a.__vccOpts || a;
  for (const [g, u] of r)
    n[g] = u;
  return n;
}, bt = { style: { "pointer-events": "none" } }, wt = { class: "month_control_panel" }, kt = { class: "month_control_item" }, St = ["onClick"], Ot = { class: "month_control_item" }, Ct = { class: "month_control_item" }, xt = ["onClick"], It = { class: "month_box" }, Nt = { class: "week_name" }, Tt = ["onClick", "onMouseover"], Bt = {
  __name: "Vue3HotelDatePicker",
  props: {
    format: {
      default: "YYYY-MM-DD",
      type: String
    },
    startOfWeek: {
      default: "monday",
      type: String
    },
    separator: {
      default: "-",
      type: String
    },
    selectedDates: {
      default: !1,
      type: [Array, Boolean]
    },
    startDate: {
      default: !1,
      type: [String, Boolean]
    },
    endDate: {
      default: !1,
      type: [String, Boolean]
    },
    minDate: {
      default: () => /* @__PURE__ */ new Date()
    },
    // The start view date. All the dates before this date will be disabled.
    maxDate: !1,
    // The end view date. All the dates after this date will be disabled.
    disabledDaysOfWeek: {
      default: () => []
    },
    moveBothMonths: {
      default: !1,
      type: Boolean
    },
    noCheckOutDates: {
      default: () => []
    },
    noCheckInDates: {
      default: () => []
    },
    noCheckInDaysOfWeek: {
      default: () => []
    },
    noCheckOutDaysOfWeek: {
      default: () => []
    },
    maxNights: 0,
    minNights: 1,
    singleMonthBreakpoint: {
      default: !1,
      type: [Number, Boolean]
    },
    selectForward: Boolean,
    showSingleMonth: Boolean,
    disabledDates: {
      default: !1,
      type: [Array, Boolean]
    },
    enableCheckout: Boolean,
    weekDays: {
      default: () => ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
      type: Array
    },
    monthNames: {
      default: () => ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      type: Array
    },
    i18n: {
      default: () => ({
        "not selected": "Not selected",
        night: "Night",
        nights: "Nights"
      }),
      type: Object
    }
  },
  emits: {
    selected: ({ start: a, end: r }) => !0
  },
  setup(a, { emit: r }) {
    const n = a, g = r, u = d(!0);
    d(!1);
    const O = d(!1), C = d(!1), E = d(!1), Z = d(!1), H = d(n.maxNights), k = d(n.minNights), f = d(n.startDate ?? !1), c = d(n.endDate ?? !1);
    d(null);
    const _ = d(null), M = d({}), A = d(0);
    d(null);
    const ne = d(null);
    O.value = !1, C.value = !1, E.value = !1, Z.value = !1;
    const x = d(n.startDate), I = d(n.endDate), v = d([]), m = d({
      start: null,
      end: null
    }), o = d({
      months: [],
      open: !0,
      submitButton: !1,
      clearButton: !1,
      showSingleMonth: n.showSingleMonth
    });
    it({
      error: !1,
      textContent: "",
      show: !1
    });
    const $ = (e) => e in n.i18n ? n.i18n[e] : "", ie = () => {
      let e = [];
      if (n.startOfWeek === "monday") {
        for (let t = 0; t < 7; t++)
          e.push(n.weekDays[(1 + t) % 7]);
        return e;
      }
      for (let t = 0; t < 7; t++)
        e.push(n.weekDays[t]);
      return e;
    }, ae = (e) => n.monthNames[e], R = (e) => {
      const t = new Date(e.valueOf());
      return new Date(t.setMonth(t.getMonth() + 1, 1));
    }, ue = (e) => {
      const t = new Date(e.valueOf());
      return new Date(t.setMonth(t.getMonth() - 1, 1));
    }, y = (e, t = null) => {
      let l = t ?? n.format;
      return W(e, l);
    }, j = (e, t = null) => {
      let l = t ?? n.format;
      return We(e, l);
    }, Ze = () => {
      k.value = n.minNights > 1 ? n.minNights + 1 : 2, H.value = n.maxNights > 0 ? n.maxNights + 1 : 0, n.startDate && typeof n.startDate == "string" && (x.value = j(n.startDate)), n.endDate && typeof n.endDate == "string" && (I.value = j(I.value)), n.disabledDates.length > 0 && nt(), n.disabledDaysOfWeek.length > 0 && at(), x.value && I.value ? lt(x.value, I.value) : Me(), ne.value && (u.value || !f.value && !c.value) && (o.value.clearButton = !0), A.value = 0, _.value = !1;
    }, V = (e, t) => {
      e = new Date(e);
      let l = {
        name: ae(e.getMonth()),
        month: e.getMonth(),
        year: e.getFullYear(),
        id: e.getFullYear() + e.getMonth(),
        days: [],
        nextBtn: !0,
        prevBtn: !0
      };
      e.setHours(0, 0, 0, 0), l.days = Re(e), o.value.months.splice(t - 1, 1, l), ke(), M.value["month" + t] = e;
    }, Re = (e) => {
      const t = [], l = [];
      let s;
      e.setDate(1);
      let i = e.getDay();
      const D = e.getMonth();
      if (i === 0 && n.startOfWeek === "monday" && (i = 7), i > 0)
        for (let p = i; p > 0; p--) {
          const h = new Date(e.getTime() - 864e5 * p);
          s = le(h.getTime()), (n.minDate && Y(h, n.minDate) < 0 || n.maxDate && Y(h, n.maxDate) > 0) && (s = !1), t.push({
            date: h,
            type: "lastMonth",
            day: h.getDate(),
            time: h.getTime(),
            tabindex: 0,
            attributes: [],
            isNoCheckOut: !1,
            isValid: s,
            isNoCheckIn: !1,
            isCurrentMonth: !1
          });
        }
      for (let p = 0; p < 40; p++) {
        const h = G(e, p);
        s = le(h.getTime()), (n.minDate && Y(h, n.minDate) < 0 || n.maxDate && Y(h, n.maxDate) > 0) && (s = !1), t.push({
          date: h,
          type: h.getMonth() === D ? "visibleMonth" : "nextMonth",
          day: h.getDate(),
          time: h.getTime(),
          tabindex: 0,
          attributes: [],
          isCurrentMonth: h.getMonth() === D,
          isValid: s,
          isNoCheckIn: !1,
          isNoCheckOut: !1
        });
      }
      for (let p = 0; p < 6 && t[p * 7].type !== "nextMonth"; p++)
        for (let h = 0; h < 7; h++) {
          let S = n.startOfWeek === "monday" ? h + 1 : h;
          S = t[p * 7 + S], l.push(pe(S));
        }
      return l;
    }, pe = (e) => {
      const t = y(e.time) === y(/* @__PURE__ */ new Date()), l = y(e.time) === y(n.minDate);
      let s = !1, i = !1, D = !1, p = !1, h = !1, S = !1;
      if (e.valid || e.type === "visibleMonth") {
        const de = y(e.time, "YYYY-MM-DD");
        if (n.disabledDates.length > 0) {
          const T = Oe(e.date);
          if (T[0] === !1 && (T[0] = be(x.value, 1)), T[0] && T[1] && Y(e.date, T[0]) && N(T[0], T[1]) - 2 > 0) {
            const ve = N(T[1], e.date) - 1, ot = N(e.date, T[0]) - 1;
            (n.selectForward && ve < k.value || !n.selectForward && ve < k.value && ot < k.value) && (e.isValid = !1), !e.isValid && n.enableCheckout && ve === 2 && (S = !0);
          }
          n.disabledDates.indexOf(de) > -1 ? (e.isValid = !1, s = !0, A.value++, _.value = e.date) : A.value = 0, e.isValid && _.value && Y(e.date, _.value) > 0 && N(e.date, _.value) === 2 && (h = !0);
        }
        n.disabledDaysOfWeek.length > 0 && n.disabledDaysOfWeek.indexOf(W(e.time, "dddd")) > -1 && (e.isValid = !1, p = !0), n.noCheckInDates.length > 0 && n.noCheckInDates.indexOf(de) > -1 && (i = !0, h = !1), n.noCheckOutDates.length > 0 && n.noCheckOutDates.indexOf(de) > -1 && (D = !0), n.noCheckInDaysOfWeek.length > 0 && n.noCheckInDaysOfWeek.indexOf(W(e.time, "dddd")) > -1 && (i = !0, h = !1), n.noCheckOutDaysOfWeek.length > 0 && n.noCheckOutDaysOfWeek.indexOf(W(e.time, "dddd")) > -1 && (D = !0);
      }
      return e.isToday = t, e.isDisabled = s, e.isCheckOutEnabled = s && n.enableCheckout && A.value === 1, e.isDayBeforeDisabledDate = S, e.isCheckInOnly = l || h, e.isNoCheckIn = i, e.isNoCheckOut = D, e.isDayOfWeekDisabled = p, e;
    }, Je = () => {
      for (let e = 0; e < o.value.months.length; e++)
        for (let t = 0; t < o.value.months[e].days.length; t++) {
          const l = parseInt(o.value.months[e].days[t].time, 10), s = new Date(l);
          let i;
          i = le(s.getTime()), (n.minDate && Y(s, n.minDate) < 0 || n.maxDate && Y(s, n.maxDate) > 0) && (i = !1), o.value.months[e].days[t].isValid = i, o.value.months[e].days[t] = pe(o.value.months[e].days[t]);
        }
    }, Me = () => {
      V(n.minDate, 1), V(R(n.minDate), 2), K();
    }, Ue = (e, t, ...l) => {
      if (l.length > 0 && l[0] !== void 0 && l[0], e.getTime() > t.getTime()) {
        let i = t;
        t = e, e = i, i = null;
      }
      let s = !0;
      if ((n.minDate && Y(e, n.minDate) < 0 || n.maxDate && Y(t, n.maxDate) > 0) && (s = !1), !s) {
        Me();
        return;
      }
      e.setTime(e.getTime() + 12 * 60 * 60 * 1e3), t.setTime(t.getTime() + 12 * 60 * 60 * 1e3), f.value = e.getTime(), c.value = t.getTime(), Y(e, t) > 0 && re(e, t) === 0 && (t = R(e)), re(e, t) === 0 && (t = R(e)), V(e, 1), V(t, 2), se(), K(), Ye();
    }, se = () => {
      if (!(!f.value && !c.value))
        for (let e = 0; e < o.value.months.length; e++)
          for (let t = 0; t < o.value.months[e].days.length; t++) {
            const l = o.value.months[e].days[t], s = parseInt(l.time, 10);
            f.value && c.value && c.value >= s && f.value <= s || f.value && !c.value && y(f.value, "YYYY-MM-DD") === y(s, "YYYY-MM-DD") ? l.isSelected = !0 : l.isSelected = !1, f.value && y(f.value, "YYYY-MM-DD") === y(s, "YYYY-MM-DD") ? l.isFirstDaySelected = !0 : l.isFirstDaySelected = !1, c.value && y(c.value, "YYYY-MM-DD") === y(s, "YYYY-MM-DD") ? l.isLastDaySelected = !0 : l.isLastDaySelected = !1, o.value.months[e].days[t] = Object.assign({}, l);
          }
    }, qe = (e, t) => {
      if (!e.isValid || !e.isCurrentMonth)
        return;
      const l = m.value.start === null, s = parseInt(e.time, 10);
      if (!(m.value.start && m.value.start.time === e.time)) {
        if (l) {
          if (e.isNoCheckIn)
            return;
        } else if (f.value && (f.value > s && e.isNoCheckIn || m.value.start && m.value.start.isNoCheckIn && f.value > s || e.isNoCheckOut && s > f.value))
          return;
        if (l ? (m.value.start = e, f.value = s, c.value = !1) : f.value && (m.value.end = e, c.value = s, Ce()), f.value && c.value && f.value > c.value) {
          const i = c.value;
          c.value = f.value, f.value = i;
        }
        f.value = parseInt(f.value, 10), c.value = parseInt(c.value, 10), tt(), f.value && !c.value && Se(e), ke(), Ye(), f.value && c.value && Je(), se(), c.value && g("selected", { start: f.value, end: c.value }), m.value.end && je();
      }
    }, je = () => {
      m.value.start = null, m.value.end = null;
    }, le = (e) => {
      if (e = parseInt(e, 10), n.minDate && Y(e, n.minDate) < 0 || n.maxDate && Y(e, n.maxDate) > 0)
        return !1;
      if (f.value && !c.value) {
        if (H.value > 0 && N(e, f.value) > H.value || k.value > 0 && N(e, f.value) > 1 && N(e, f.value) < k.value || n.selectForward && e < f.value)
          return !1;
        if (n.disabledDates.length > 0) {
          const t = Oe(new Date(parseInt(f.value, 10)));
          if (t[0] && Y(e, t[0]) <= 0 || t[1] && Y(e, t[1]) >= 0)
            return !1;
        }
        if (n.disabledDaysOfWeek.length > 0) {
          const t = st(new Date(parseInt(f.value, 10)));
          if (t[0] && Y(e, t[0]) <= 0 || t[1] && Y(e, t[1]) >= 0)
            return !1;
        }
      }
      return !0;
    }, ye = () => {
      for (let e = 0; e < o.value.months.length; e++)
        for (let t = 0; t < o.value.months[e].days.length; t++)
          o.value.months[e].days[t].selected = !1, o.value.months[e].days[t].isFirstDaySelected = !1, o.value.months[e].days[t].isLastDaySelected = !1;
      return !0;
    }, Ye = () => {
      const e = N(c.value, f.value);
      (H.value && e > H.value || k.value && e < k.value) && (f.value = !1, c.value = !1, ye());
    }, G = (e, t) => {
      const l = new Date(e);
      return l.setDate(l.getDate() + t), l;
    }, be = (e, t) => {
      const l = new Date(e);
      return l.setDate(l.getDate() - t), l;
    }, N = (e, t) => Math.abs(we(e) - we(t)) + 1, Y = (e, t) => {
      const l = parseInt(y(e, "YYYYMMDD"), 10) - parseInt(y(t, "YYYYMMDD"), 10);
      return l > 0 ? 1 : l === 0 ? 0 : -1;
    }, re = (e, t) => {
      const l = parseInt(y(e, "YYYYMM"), 10) - parseInt(y(t, "YYYYMM"), 10);
      return l > 0 ? 1 : l === 0 ? 0 : -1;
    }, we = (e) => Math.round(Ge(e) / 864e5), Ge = (e) => (typeof e == "object" && e.getTime && (e = e.getTime()), typeof e == "string" && !e.match(/\d{13}/) && (e = j(e).getTime()), e = parseInt(e, 10) - (/* @__PURE__ */ new Date()).getTimezoneOffset() * 60 * 1e3, e), Ke = (e, t) => {
      const l = t === 1;
      let s = l ? M.value.month2 : M.value.month1;
      return s = R(s), !oe() && !l && re(s, M.value.month2) >= 0 || J(s) ? !1 : (n.moveBothMonths && l && V(M.value.month2, 1), V(s, t + 1), se(), K(), !0);
    }, Qe = (e, t) => {
      const l = t === 1;
      let s = l ? M.value.month2 : M.value.month1;
      return s = ue(s), l && re(s, M.value.month1) <= 0 || J(s) ? !1 : (n.moveBothMonths && !l && V(M.value.month1, 2), V(s, t + 1), se(), K(), !0);
    }, fe = d([]), oe = () => n.showSingleMonth || Xe(), Xe = () => typeof window > "u" ? !1 : n.singleMonthBreakpoint ? window.innerWidth < n.singleMonthBreakpoint : window.innerWidth < et(), et = () => fe.value[0] ? 2 * fe.value[0].offsetWidth + 50 : 0, J = (e) => {
      const t = new Date(e.valueOf());
      return n.minDate && new Date(t.getFullYear(), t.getMonth() + 1, 0, 23, 59, 59) < n.minDate || n.maxDate && new Date(t.getFullYear(), t.getMonth(), 1) > n.maxDate;
    }, K = () => {
      if (oe()) {
        J(ue(M.value.month1)) ? o.value.months[0].prevBtn = !1 : o.value.months[0].prevBtn = !0, J(R(M.value.month1)) ? o.value.months[0].nextBtn = !1 : o.value.months[0].nextBtn = !0;
        return;
      }
      const e = parseInt(y(M.value.month1, "YYYYMM"), 10), t = parseInt(y(M.value.month2, "YYYYMM"), 10), l = Math.abs(e - t);
      l > 1 && l !== 89 ? (o.value.months[0].nextBtn = !0, o.value.months[1].prevBtn = !0) : (o.value.months[0].nextBtn = !1, o.value.months[1].prevBtn = !1), J(ue(M.value.month1)) ? o.value.months[0].prevBtn = !1 : o.value.months[0].prevBtn = !0, J(R(M.value.month2)) ? o.value.months[1].nextBtn = !1 : o.value.months[1].nextBtn = !0;
    }, ke = () => {
      const e = f.value && !c.value;
      for (let t = 0; t < o.value.months.length; t++)
        for (let l = 0; l < o.value.months[t].days.length; l++) {
          let s = o.value.months[t].days[l];
          if (!s.isValid && s.isTmp && (s.isTmp = !1, s.isTmpValid ? s.isValid = !0 : s.isTmpValid = !0), e) {
            if (s.isCurrentMonth && (s.isValid || s.isDisabled || s.isBeforeDisabledDate)) {
              const i = parseInt(s.time, 10);
              le(i) ? (s.isValid = !0, s.isTmp = !0, s.isDisabled = !1) : (s.valid || (s.isTmpValid = !1), s.isValid = !1, s.isTmp = !0);
            }
          } else
            (s.checkOutEnabled || s.beforeDisabledDate) && (s.isValid = !1, s.beforeDisabledDate || (s.isDisabled = !0));
          o.value.months[t].days.splice(l, 1, s);
        }
      return !0;
    }, Se = (e, t) => {
      const l = parseInt(e.time, 10);
      if (e.isValid && xe(e)) {
        for (let s = 0; s < o.value.months.length; s++)
          for (let i = 0; i < o.value.months[s].days.length; i++) {
            const D = parseInt(o.value.months[s].days[i].time, 10);
            D === l ? o.value.months[s].days[i].isHovering = !0 : o.value.months[s].days[i].isHovering = !1, f.value && !c.value && (f.value < D && l >= D || f.value > D && l <= D) ? o.value.months[s].days[i].isHovering = !0 : o.value.months[s].days[i].isHovering = !1;
          }
        f.value && !c.value && (b.count = N(l, f.value) - 1);
      }
    }, tt = () => {
      for (let e = 0; e < o.value.months.length; e++)
        for (let t = 0; t < o.value.months[e].days.length; t++)
          o.value.months[e].days[t].isHovering = !1;
    }, nt = () => {
      const e = [];
      for (let t = 0; t < n.disabledDates.length; t++)
        e[t] = We(n.disabledDates[t], "YYYY-MM-DD");
      e.sort((t, l) => t - l), v.value = e;
    }, Oe = (e) => {
      let t = [!1, !1];
      if (e < v.value[0])
        n.enableCheckout ? t = [!1, G(v.value[0], 1)] : t = [!1, v.value[0]];
      else if (e > v.value[v.value.length - 1])
        t = [v.value[v.value.length - 1], !1];
      else {
        let l = v.value.length, s = v.value.length;
        const i = Math.abs(new Date(0, 0, 0).valueOf());
        let D = i, p = -i, h = 0, S;
        for (S = 0; S < v.value.length; ++S)
          h = e - v.value[S], h < 0 && h > p && (s = S, p = h), h > 0 && h < D && (l = S, D = h);
        v.value[l] && (t[0] = v.value[l]), typeof v.value[l] > "u" ? t[1] = !1 : n.enableCheckout ? t[1] = G(v.value[s], 1) : t[1] = v.value[s];
      }
      return t;
    }, ce = d([]), at = () => {
      const e = [], t = [], l = /* @__PURE__ */ new Date();
      for (let s = 0; s < 7; s++) {
        const i = G(l, s);
        e[W(i, "d")] = W(i, "dddd");
      }
      for (let s = 0; s < n.disabledDaysOfWeek.length; s++)
        t.push(e.indexOf(n.disabledDaysOfWeek[s]));
      t.sort(), ce.value = t;
    }, st = (e) => {
      const t = [!1, !1];
      for (let l = 0; l < 7; l++) {
        const s = be(e, l);
        if (ce.value.indexOf(parseInt(W(s, "d"), 10)) > -1) {
          t[0] = s;
          break;
        }
      }
      for (let l = 0; l < 7; l++) {
        const s = G(e, l);
        if (ce.value.indexOf(parseInt(W(s, "d"), 10)) > -1) {
          t[1] = s;
          break;
        }
      }
      return t;
    }, lt = (e, t) => {
      typeof e == "string" && typeof t == "string" ? (e = j(e), t = j(t)) : (e = new Date(e.getTime()), t = new Date(t.getTime())), Ue(e, t);
    }, b = ut(
      {
        show: !1,
        top: 0,
        left: 0,
        width: 0,
        count: 0,
        error: !1
      }
    ), Ce = () => b.show = !1, xe = (e) => !(!e.isValid || !e.isCurrentMonth), rt = (e, t) => {
      if (!m.value.start || m.value.start && m.value.end || !xe(t))
        return !1;
      b.show = !0;
      const l = Ie.value.getBoundingClientRect(), s = e.target.getBoundingClientRect();
      b.top = s.top - l.top - 35, b.left = s.left - l.left, b.width = s.width;
    }, Ie = d(null), he = () => {
      o.value.showSingleMonth = oe();
    };
    return ft(() => o.value.showSingleMonth, () => {
      K();
    }), ct(() => {
      window.removeEventListener("resize", () => he());
    }), ht(() => {
      typeof process > "u" ? window.addEventListener("resize", () => he()) : process.client && (window.addEventListener("resize", () => he()), o.value.showSingleMonth = oe());
    }), Ze(), (e, t) => (z(), L("div", {
      class: "h-datepicker",
      ref_key: "parent",
      ref: Ie
    }, [
      B("div", {
        class: Q([{ "h-datepicker_invisible": !b.show }, "h_datepicker_popup"]),
        style: dt(
          { top: b.top + "px", left: b.left + "px", width: b.width + "px" }
        )
      }, [
        B("div", bt, [
          U(e.$slots, "popup", {
            nights: b.count
          }, () => [
            q(X(b.count ? b.count + " " + (b.count > 1 ? $("nights") : $("night")) : $("not selected")), 1)
          ], !0)
        ])
      ], 6),
      (z(!0), L(me, null, De(o.value.months, (l, s) => (z(), L("div", {
        key: l.id,
        ref_for: !0,
        ref_key: "monthsDoms",
        ref: fe,
        class: Q(["h-datepicker_month", {
          "h-datepicker_hidden": s === 1 && o.value.showSingleMonth,
          "h-datepicker_two_month_display": !o.value.showSingleMonth,
          "h-datepicker_one_month_display": o.value.showSingleMonth
        }])
      }, [
        B("div", wt, [
          B("div", kt, [
            B("div", {
              onClick: (i) => Qe(l, s),
              class: Q(["month_control_btn", {
                "h-datepicker_invisible": !l.prevBtn
              }])
            }, [
              U(e.$slots, "prev", {}, () => [
                q(" <<")
              ], !0)
            ], 10, St)
          ]),
          B("div", Ot, [
            U(e.$slots, "month", { month: l }, () => [
              q(X(l.name) + " " + X(l.year), 1)
            ], !0)
          ]),
          B("div", Ct, [
            B("div", {
              onClick: (i) => Ke(l, s),
              class: Q(["month_control_btn", {
                "h-datepicker_invisible": !l.nextBtn
              }])
            }, [
              U(e.$slots, "next", {}, () => [
                q(" >>")
              ], !0)
            ], 10, xt)
          ])
        ]),
        B("div", It, [
          (z(!0), L(me, null, De(ie(), (i) => (z(), L("div", Nt, [
            U(e.$slots, "weekday", { weekday: i }, () => [
              q(X(i), 1)
            ], !0)
          ]))), 256)),
          (z(!0), L(me, null, De(l.days, (i) => (z(), L("div", {
            onClick: (D) => qe(i),
            onMouseout: t[0] || (t[0] = (D) => Ce()),
            onMouseover: (D) => Se(i) || rt(D, i),
            class: Q([{
              h_datepicker_notCurrentMonth: !i.isCurrentMonth,
              valid: i.isValid,
              invalid: !i.isValid,
              tmpinvalid: !i.isTmpValid,
              tmp: i.isTmpValid,
              h_datepicker_disabled: i.isDisabled,
              "checkout-enabled": i.isCheckOutEnabled,
              "checkout-disabled": !i.isCheckOutEnabled,
              "before-disabled-date": i.isDayBeforeDisabledDate,
              "first-day-selected": i.isFirstDaySelected,
              "last-day-selected": i.isLastDaySelected,
              selected: i.isSelected,
              hovering: i.isHovering
            }, "h_datepicker_day"])
          }, [
            U(e.$slots, "day", { day: i }, () => [
              q(X(i.day), 1)
            ], !0)
          ], 42, Tt))), 256))
        ])
      ], 2))), 128))
    ], 512));
  }
}, _t = /* @__PURE__ */ Yt(Bt, [["__scopeId", "data-v-8e80a1cc"]]);
export {
  _t as default
};
