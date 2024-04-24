import { ref as h, computed as dt, reactive as ht, watch as mt, onUnmounted as vt, onMounted as Dt, openBlock as B, createElementBlock as H, createElementVNode as Z, normalizeClass as X, normalizeStyle as gt, renderSlot as G, createTextVNode as q, toDisplayString as ee, Fragment as pe, renderList as Me, createCommentVNode as He } from "vue";
var ze = /d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g, E = "\\d\\d?", P = "\\d\\d", pt = "\\d{3}", Mt = "\\d{4}", te = "[^\\s]+", Ze = /\[([^]*?)\]/gm;
function Le(a, r) {
  for (var n = [], g = 0, u = a.length; g < u; g++)
    n.push(a[g].substr(0, r));
  return n;
}
var Ve = function(a) {
  return function(r, n) {
    var g = n[a].map(function(O) {
      return O.toLowerCase();
    }), u = g.indexOf(r.toLowerCase());
    return u > -1 ? u : null;
  };
};
function L(a) {
  for (var r = [], n = 1; n < arguments.length; n++)
    r[n - 1] = arguments[n];
  for (var g = 0, u = r; g < u.length; g++) {
    var O = u[g];
    for (var C in O)
      a[C] = O[C];
  }
  return a;
}
var Re = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
], Je = [
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
], yt = Le(Je, 3), bt = Le(Re, 3), Ue = {
  dayNamesShort: bt,
  dayNames: Re,
  monthNamesShort: yt,
  monthNames: Je,
  amPm: ["am", "pm"],
  DoFn: function(a) {
    return a + ["th", "st", "nd", "rd"][a % 10 > 3 ? 0 : (a - a % 10 !== 10 ? 1 : 0) * a % 10];
  }
}, oe = L({}, Ue), kt = function(a) {
  return oe = L(oe, a);
}, Fe = function(a) {
  return a.replace(/[|\\{()[^$+*?.-]/g, "\\$&");
}, Y = function(a, r) {
  for (r === void 0 && (r = 2), a = String(a); a.length < r; )
    a = "0" + a;
  return a;
}, Yt = {
  D: function(a) {
    return String(a.getDate());
  },
  DD: function(a) {
    return Y(a.getDate());
  },
  Do: function(a, r) {
    return r.DoFn(a.getDate());
  },
  d: function(a) {
    return String(a.getDay());
  },
  dd: function(a) {
    return Y(a.getDay());
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
    return Y(a.getMonth() + 1);
  },
  MMM: function(a, r) {
    return r.monthNamesShort[a.getMonth()];
  },
  MMMM: function(a, r) {
    return r.monthNames[a.getMonth()];
  },
  YY: function(a) {
    return Y(String(a.getFullYear()), 4).substr(2);
  },
  YYYY: function(a) {
    return Y(a.getFullYear(), 4);
  },
  h: function(a) {
    return String(a.getHours() % 12 || 12);
  },
  hh: function(a) {
    return Y(a.getHours() % 12 || 12);
  },
  H: function(a) {
    return String(a.getHours());
  },
  HH: function(a) {
    return Y(a.getHours());
  },
  m: function(a) {
    return String(a.getMinutes());
  },
  mm: function(a) {
    return Y(a.getMinutes());
  },
  s: function(a) {
    return String(a.getSeconds());
  },
  ss: function(a) {
    return Y(a.getSeconds());
  },
  S: function(a) {
    return String(Math.round(a.getMilliseconds() / 100));
  },
  SS: function(a) {
    return Y(Math.round(a.getMilliseconds() / 10), 2);
  },
  SSS: function(a) {
    return Y(a.getMilliseconds(), 3);
  },
  a: function(a, r) {
    return a.getHours() < 12 ? r.amPm[0] : r.amPm[1];
  },
  A: function(a, r) {
    return a.getHours() < 12 ? r.amPm[0].toUpperCase() : r.amPm[1].toUpperCase();
  },
  ZZ: function(a) {
    var r = a.getTimezoneOffset();
    return (r > 0 ? "-" : "+") + Y(Math.floor(Math.abs(r) / 60) * 100 + Math.abs(r) % 60, 4);
  },
  Z: function(a) {
    var r = a.getTimezoneOffset();
    return (r > 0 ? "-" : "+") + Y(Math.floor(Math.abs(r) / 60), 2) + ":" + Y(Math.abs(r) % 60, 2);
  }
}, We = function(a) {
  return +a - 1;
}, Pe = [null, E], Ee = [null, te], Ae = [
  "isPm",
  te,
  function(a, r) {
    var n = a.toLowerCase();
    return n === r.amPm[0] ? 0 : n === r.amPm[1] ? 1 : null;
  }
], $e = [
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
], wt = {
  D: ["day", E],
  DD: ["day", P],
  Do: ["day", E + te, function(a) {
    return parseInt(a, 10);
  }],
  M: ["month", E, We],
  MM: ["month", P, We],
  YY: [
    "year",
    P,
    function(a) {
      var r = /* @__PURE__ */ new Date(), n = +("" + r.getFullYear()).substr(0, 2);
      return +("" + (+a > 68 ? n - 1 : n) + a);
    }
  ],
  h: ["hour", E, void 0, "isPm"],
  hh: ["hour", P, void 0, "isPm"],
  H: ["hour", E],
  HH: ["hour", P],
  m: ["minute", E],
  mm: ["minute", P],
  s: ["second", E],
  ss: ["second", P],
  YYYY: ["year", Mt],
  S: ["millisecond", "\\d", function(a) {
    return +a * 100;
  }],
  SS: ["millisecond", P, function(a) {
    return +a * 10;
  }],
  SSS: ["millisecond", pt],
  d: Pe,
  dd: Pe,
  ddd: Ee,
  dddd: Ee,
  MMM: ["month", te, Ve("monthNamesShort")],
  MMMM: ["month", te, Ve("monthNames")],
  a: Ae,
  A: Ae,
  ZZ: $e,
  Z: $e
}, ie = {
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
}, St = function(a) {
  return L(ie, a);
}, Ot = function(a, r, n) {
  if (r === void 0 && (r = ie.default), n === void 0 && (n = {}), typeof a == "number" && (a = new Date(a)), Object.prototype.toString.call(a) !== "[object Date]" || isNaN(a.getTime()))
    throw new Error("Invalid Date pass to format");
  r = ie[r] || r;
  var g = [];
  r = r.replace(Ze, function(O, C) {
    return g.push(C), "@@@";
  });
  var u = L(L({}, oe), n);
  return r = r.replace(ze, function(O) {
    return Yt[O](a, u);
  }), r.replace(/@@@/g, function() {
    return g.shift();
  });
};
function _t(a, r, n) {
  if (n === void 0 && (n = {}), typeof r != "string")
    throw new Error("Invalid format in fecha parse");
  if (r = ie[r] || r, a.length > 1e3)
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
  }, O = [], C = [], A = r.replace(Ze, function(v, i) {
    return C.push(Fe(i)), "@@@";
  }), R = {}, V = {};
  A = Fe(A).replace(ze, function(v) {
    var i = wt[v], z = i[0], ue = i[1], ae = i[3];
    if (R[z])
      throw new Error("Invalid format. " + z + " specified twice in format");
    return R[z] = !0, ae && (V[ae] = !0), O.push(i), "(" + ue + ")";
  }), Object.keys(V).forEach(function(v) {
    if (!R[v])
      throw new Error("Invalid format. " + v + " is required in specified format");
  }), A = A.replace(/@@@/g, function() {
    return C.shift();
  });
  var w = a.match(new RegExp(A, "i"));
  if (!w)
    return null;
  for (var f = L(L({}, oe), n), c = 1; c < w.length; c++) {
    var F = O[c - 1], M = F[0], $ = F[2], ne = $ ? $(w[c], f) : +w[c];
    if (ne == null)
      return null;
    u[M] = ne;
  }
  u.isPm === 1 && u.hour != null && +u.hour != 12 ? u.hour = +u.hour + 12 : u.isPm === 0 && +u.hour == 12 && (u.hour = 0);
  var I;
  if (u.timezoneOffset == null) {
    I = new Date(u.year, u.month, u.day, u.hour, u.minute, u.second, u.millisecond);
    for (var T = [
      ["month", "getMonth"],
      ["day", "getDate"],
      ["hour", "getHours"],
      ["minute", "getMinutes"],
      ["second", "getSeconds"]
    ], c = 0, m = T.length; c < m; c++)
      if (R[T[c][0]] && u[T[c][0]] !== I[T[c][1]]())
        return null;
  } else if (I = new Date(Date.UTC(u.year, u.month, u.day, u.hour, u.minute - u.timezoneOffset, u.second, u.millisecond)), u.month > 11 || u.month < 0 || u.day > 31 || u.day < 1 || u.hour > 23 || u.hour < 0 || u.minute > 59 || u.minute < 0 || u.second > 59 || u.second < 0)
    return null;
  return I;
}
var _ = {
  format: Ot,
  parse: _t,
  defaultI18n: Ue,
  setGlobalDateI18n: kt,
  setGlobalDateMasks: St
};
const Ct = (a, r) => {
  const n = a.__vccOpts || a;
  for (const [g, u] of r)
    n[g] = u;
  return n;
}, It = { style: { "pointer-events": "none" } }, Tt = { class: "month_control_panel" }, Nt = { class: "month_control_item" }, xt = ["onClick"], Bt = { class: "month_control_item" }, Ht = { class: "month_control_item" }, Vt = ["onClick"], Ft = { class: "month_box" }, Wt = { class: "week_name" }, Pt = ["onClick", "onMouseover"], Et = {
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
    maxDate: {
      default: () => !1,
      type: Boolean
    },
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
    const n = a, g = r, u = h(!0);
    h(!1);
    const O = h(!1), C = h(!1), A = h(!1), R = h(!1), V = h(n.maxNights), w = h(n.minNights), f = h(n.startDate ?? !1), c = h(n.endDate ?? !1);
    h(null);
    const F = h(null), M = h({}), $ = h(0);
    h(null);
    const ne = h(null);
    O.value = !1, C.value = !1, A.value = !1, R.value = !1;
    const I = h(n.startDate), T = h(n.endDate), m = h([]), v = h({
      start: null,
      end: null
    }), i = h({
      months: [],
      open: !0,
      submitButton: !1,
      clearButton: !1,
      showSingleMonth: n.showSingleMonth
    });
    dt({
      error: !1,
      textContent: "",
      show: !1
    });
    const z = (e) => e in n.i18n ? n.i18n[e] : "", ue = () => {
      let e = [];
      if (n.startOfWeek === "monday") {
        for (let t = 0; t < 7; t++)
          e.push(n.weekDays[(1 + t) % 7]);
        return e;
      }
      for (let t = 0; t < 7; t++)
        e.push(n.weekDays[t]);
      return e;
    }, ae = (e) => n.monthNames[e], J = (e) => {
      const t = new Date(e.valueOf());
      return new Date(t.setMonth(t.getMonth() + 1, 1));
    }, fe = (e) => {
      const t = new Date(e.valueOf());
      return new Date(t.setMonth(t.getMonth() - 1, 1));
    }, y = (e, t = null) => {
      let l = t ?? n.format;
      return _.format(e, l);
    }, K = (e, t = null) => {
      let l = t ?? n.format;
      return _.parse(e, l);
    }, je = () => {
      w.value = n.minNights > 1 ? n.minNights + 1 : 2, V.value = n.maxNights > 0 ? n.maxNights + 1 : 0, n.startDate && typeof n.startDate == "string" && (I.value = K(n.startDate)), n.endDate && typeof n.endDate == "string" && (T.value = K(T.value)), n.disabledDates.length > 0 && rt(), n.disabledDaysOfWeek.length > 0 && ot(), I.value && T.value ? ut(I.value, T.value) : ke(), ne.value && (u.value || !f.value && !c.value) && (i.value.clearButton = !0), $.value = 0, F.value = !1;
    }, W = (e, t) => {
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
      e.setHours(0, 0, 0, 0), l.days = Ge(e), i.value.months.splice(t - 1, 1, l), _e(), M.value["month" + t] = e;
    }, ye = {
      date: {},
      type: "",
      day: "",
      time: "",
      isValid: !1,
      isTmp: !1,
      isCurrentMonth: !1,
      isToday: !1,
      isNoCheckIn: !1,
      isNoCheckOut: !1,
      isDisabled: !1,
      isDayOfWeekDisabled: !1,
      isFirstEnabledDate: !1,
      isCheckInOnly: !1,
      isDayBeforeDisabledDate: !1
    }, Ge = (e) => {
      const t = [], l = [];
      let s;
      e.setDate(1);
      let o = e.getDay();
      const D = e.getMonth();
      if (o === 0 && n.startOfWeek === "monday" && (o = 7), o > 0)
        for (let p = o; p > 0; p--) {
          const d = new Date(e.getTime() - 864e5 * p);
          s = le(d.getTime()), (n.minDate && b(d, n.minDate) < 0 || n.maxDate && b(d, n.maxDate) > 0) && (s = !1), t.push(
            Object.assign({}, ye, {
              date: d,
              type: "lastMonth",
              day: d.getDate(),
              time: d.getTime(),
              isValid: s
            })
          );
        }
      for (let p = 0; p < 40; p++) {
        const d = Q(e, p);
        s = le(d.getTime()), (n.minDate && b(d, n.minDate) < 0 || n.maxDate && b(d, n.maxDate) > 0) && (s = !1), t.push(Object.assign({}, ye, {
          date: d,
          type: d.getMonth() === D ? "visibleMonth" : "nextMonth",
          day: d.getDate(),
          time: d.getTime(),
          isCurrentMonth: d.getMonth() === D,
          isValid: s
        }));
      }
      for (let p = 0; p < 6 && t[p * 7].type !== "nextMonth"; p++)
        for (let d = 0; d < 7; d++) {
          let S = n.startOfWeek === "monday" ? d + 1 : d;
          S = t[p * 7 + S], l.push(be(S));
        }
      return l;
    }, be = (e) => {
      const t = y(e.time) === y(/* @__PURE__ */ new Date()), l = y(e.time) === y(n.minDate);
      let s = !1, o = !1, D = !1, p = !1, d = !1, S = !1;
      if (e.valid || e.type === "visibleMonth") {
        const De = y(e.time, "YYYY-MM-DD");
        if (n.disabledDates.length > 0) {
          const x = Ie(e.date);
          if (x[0] === !1 && (x[0] = Se(I.value, 1)), x[0] && x[1] && b(e.date, x[0]) && N(x[0], x[1]) - 2 > 0) {
            const ge = N(x[1], e.date) - 1, ct = N(e.date, x[0]) - 1;
            (n.selectForward && ge < w.value || !n.selectForward && ge < w.value && ct < w.value) && (e.isValid = !1), !e.isValid && n.enableCheckout && ge === 2 && (S = !0);
          }
          n.disabledDates.indexOf(De) > -1 ? (e.isValid = !1, s = !0, $.value++, F.value = e.date) : $.value = 0, e.isValid && F.value && b(e.date, F.value) > 0 && N(e.date, F.value) === 2 && (d = !0);
        }
        n.disabledDaysOfWeek.length > 0 && n.disabledDaysOfWeek.indexOf(_.format(e.time, "dddd")) > -1 && (e.isValid = !1, p = !0), n.noCheckInDates.length > 0 && n.noCheckInDates.indexOf(De) > -1 && (o = !0, d = !1), n.noCheckOutDates.length > 0 && n.noCheckOutDates.indexOf(De) > -1 && (D = !0), n.noCheckInDaysOfWeek.length > 0 && n.noCheckInDaysOfWeek.indexOf(_.format(e.time, "dddd")) > -1 && (o = !0, d = !1), n.noCheckOutDaysOfWeek.length > 0 && n.noCheckOutDaysOfWeek.indexOf(_.format(e.time, "dddd")) > -1 && (D = !0);
      }
      return e.isToday = t, e.isDisabled = s, e.isCheckOutEnabled = s && n.enableCheckout && $.value === 1, e.isDayBeforeDisabledDate = S, e.isCheckInOnly = l || d, e.isNoCheckIn = o, e.isNoCheckOut = D, e.isDayOfWeekDisabled = p, e;
    }, qe = () => {
      for (let e = 0; e < i.value.months.length; e++)
        for (let t = 0; t < i.value.months[e].days.length; t++) {
          const l = parseInt(i.value.months[e].days[t].time, 10), s = new Date(l);
          let o;
          o = le(s.getTime()), (n.minDate && b(s, n.minDate) < 0 || n.maxDate && b(s, n.maxDate) > 0) && (o = !1), i.value.months[e].days[t].isValid = o, i.value.months[e].days[t] = be(i.value.months[e].days[t]);
        }
    }, ke = () => {
      W(n.minDate, 1), W(J(n.minDate), 2), j();
    }, Ke = (e, t, ...l) => {
      if (l.length > 0 && l[0] !== void 0 && l[0], e.getTime() > t.getTime()) {
        let o = t;
        t = e, e = o, o = null;
      }
      let s = !0;
      if ((n.minDate && b(e, n.minDate) < 0 || n.maxDate && b(t, n.maxDate) > 0) && (s = !1), !s) {
        ke();
        return;
      }
      e.setTime(e.getTime() + 12 * 60 * 60 * 1e3), t.setTime(t.getTime() + 12 * 60 * 60 * 1e3), f.value = e.getTime(), c.value = t.getTime(), b(e, t) > 0 && re(e, t) === 0 && (t = J(e)), re(e, t) === 0 && (t = J(e)), W(e, 1), W(t, 2), se(), j(), we();
    }, se = () => {
      if (!(!f.value && !c.value))
        for (let e = 0; e < i.value.months.length; e++)
          for (let t = 0; t < i.value.months[e].days.length; t++) {
            const l = i.value.months[e].days[t], s = parseInt(l.time, 10);
            f.value && c.value && c.value >= s && f.value <= s || f.value && !c.value && y(f.value, "YYYY-MM-DD") === y(s, "YYYY-MM-DD") ? l.isSelected = !0 : l.isSelected = !1, f.value && y(f.value, "YYYY-MM-DD") === y(s, "YYYY-MM-DD") ? l.isFirstDaySelected = !0 : l.isFirstDaySelected = !1, c.value && y(c.value, "YYYY-MM-DD") === y(s, "YYYY-MM-DD") ? l.isLastDaySelected = !0 : l.isLastDaySelected = !1, i.value.months[e].days[t] = Object.assign({}, l);
          }
    }, Qe = (e, t) => {
      if (!e.isValid || !e.isCurrentMonth)
        return;
      const l = v.value.start === null, s = parseInt(e.time, 10);
      if (!(v.value.start && v.value.start.time === e.time)) {
        if (l) {
          if (e.isNoCheckIn)
            return;
        } else if (f.value && (f.value > s && e.isNoCheckIn || v.value.start && v.value.start.isNoCheckIn && f.value > s || e.isNoCheckOut && s > f.value))
          return;
        if (l ? (v.value.start = e, f.value = s, c.value = !1) : f.value && (v.value.end = e, c.value = s, Te()), f.value && c.value && f.value > c.value) {
          const o = c.value;
          c.value = f.value, f.value = o;
        }
        f.value = parseInt(f.value, 10), c.value = parseInt(c.value, 10), lt(), f.value && !c.value && Ce(e), _e(), we(), f.value && c.value && qe(), se(), c.value && g("selected", { start: f.value, end: c.value }), v.value.end && Xe();
      }
    }, Xe = () => {
      v.value.start = null, v.value.end = null;
    }, le = (e) => {
      if (e = parseInt(e, 10), n.minDate && b(e, n.minDate) < 0 || n.maxDate && b(e, n.maxDate) > 0)
        return !1;
      if (f.value && !c.value) {
        if (V.value > 0 && N(e, f.value) > V.value || w.value > 0 && N(e, f.value) > 1 && N(e, f.value) < w.value || n.selectForward && e < f.value)
          return !1;
        if (n.disabledDates.length > 0) {
          const t = Ie(new Date(parseInt(f.value, 10)));
          if (t[0] && b(e, t[0]) <= 0 || t[1] && b(e, t[1]) >= 0)
            return !1;
        }
        if (n.disabledDaysOfWeek.length > 0) {
          const t = it(new Date(parseInt(f.value, 10)));
          if (t[0] && b(e, t[0]) <= 0 || t[1] && b(e, t[1]) >= 0)
            return !1;
        }
      }
      return !0;
    }, Ye = () => {
      for (let e = 0; e < i.value.months.length; e++)
        for (let t = 0; t < i.value.months[e].days.length; t++)
          i.value.months[e].days[t].selected = !1, i.value.months[e].days[t].isFirstDaySelected = !1, i.value.months[e].days[t].isLastDaySelected = !1;
      return !0;
    }, we = () => {
      const e = N(c.value, f.value);
      (V.value && e > V.value || w.value && e < w.value) && (f.value = !1, c.value = !1, Ye());
    }, Q = (e, t) => {
      const l = new Date(e);
      return l.setDate(l.getDate() + t), l;
    }, Se = (e, t) => {
      const l = new Date(e);
      return l.setDate(l.getDate() - t), l;
    }, N = (e, t) => Math.abs(Oe(e) - Oe(t)) + 1, b = (e, t) => {
      const l = parseInt(y(e, "YYYYMMDD"), 10) - parseInt(y(t, "YYYYMMDD"), 10);
      return l > 0 ? 1 : l === 0 ? 0 : -1;
    }, re = (e, t) => {
      const l = parseInt(y(e, "YYYYMM"), 10) - parseInt(y(t, "YYYYMM"), 10);
      return l > 0 ? 1 : l === 0 ? 0 : -1;
    }, Oe = (e) => Math.round(et(e) / 864e5), et = (e) => (typeof e == "object" && e.getTime && (e = e.getTime()), typeof e == "string" && !e.match(/\d{13}/) && (e = K(e).getTime()), e = parseInt(e, 10) - (/* @__PURE__ */ new Date()).getTimezoneOffset() * 60 * 1e3, e), tt = (e, t) => {
      const l = t === 1;
      let s = l ? M.value.month2 : M.value.month1;
      return s = J(s), !de() && !l && re(s, M.value.month2) >= 0 || U(s) ? !1 : (n.moveBothMonths && l && W(M.value.month2, 1), W(s, t + 1), se(), j(), !0);
    }, nt = (e, t) => {
      const l = t === 1;
      let s = l ? M.value.month2 : M.value.month1;
      return s = fe(s), l && re(s, M.value.month1) <= 0 || U(s) ? !1 : (n.moveBothMonths && !l && W(M.value.month1, 2), W(s, t + 1), se(), j(), !0);
    }, ce = h([]), de = () => n.showSingleMonth || at(), at = () => typeof window > "u" ? !1 : n.singleMonthBreakpoint ? window.innerWidth < n.singleMonthBreakpoint : window.innerWidth < st(), st = () => ce.value[0] ? 2 * ce.value[0].offsetWidth + 50 : 0, U = (e) => {
      const t = new Date(e.valueOf());
      return n.minDate && new Date(t.getFullYear(), t.getMonth() + 1, 0, 23, 59, 59) < n.minDate || n.maxDate && new Date(t.getFullYear(), t.getMonth(), 1) > n.maxDate;
    }, j = () => {
      if (de()) {
        U(fe(M.value.month1)) ? i.value.months[0].prevBtn = !1 : i.value.months[0].prevBtn = !0, U(J(M.value.month1)) ? i.value.months[0].nextBtn = !1 : i.value.months[0].nextBtn = !0;
        return;
      }
      const e = parseInt(y(M.value.month1, "YYYYMM"), 10), t = parseInt(y(M.value.month2, "YYYYMM"), 10), l = Math.abs(e - t);
      l > 1 && l !== 89 ? (i.value.months[0].nextBtn = !0, i.value.months[1].prevBtn = !0) : (i.value.months[0].nextBtn = !1, i.value.months[1].prevBtn = !1), U(fe(M.value.month1)) ? i.value.months[0].prevBtn = !1 : i.value.months[0].prevBtn = !0, U(J(M.value.month2)) ? i.value.months[1].nextBtn = !1 : i.value.months[1].nextBtn = !0;
    }, _e = () => {
      const e = f.value && !c.value;
      for (let t = 0; t < i.value.months.length; t++)
        for (let l = 0; l < i.value.months[t].days.length; l++) {
          let s = i.value.months[t].days[l];
          if (!s.isValid && s.isTmp && (s.isTmp = !1, s.isTmpValid ? s.isValid = !0 : s.isTmpValid = !0), e) {
            if (s.isCurrentMonth && (s.isValid || s.isDisabled || s.isBeforeDisabledDate)) {
              const o = parseInt(s.time, 10);
              le(o) ? (s.isValid = !0, s.isTmp = !0, s.isDisabled = !1) : (s.valid || (s.isTmpValid = !1), s.isValid = !1, s.isTmp = !0);
            }
          } else
            (s.checkOutEnabled || s.beforeDisabledDate) && (s.isValid = !1, s.beforeDisabledDate || (s.isDisabled = !0));
          i.value.months[t].days.splice(l, 1, s);
        }
      return !0;
    }, Ce = (e, t) => {
      const l = parseInt(e.time, 10);
      if (e.isValid && Ne(e)) {
        for (let s = 0; s < i.value.months.length; s++)
          for (let o = 0; o < i.value.months[s].days.length; o++) {
            const D = parseInt(i.value.months[s].days[o].time, 10);
            D === l ? i.value.months[s].days[o].isHovering = !0 : i.value.months[s].days[o].isHovering = !1, f.value && !c.value && (f.value < D && l >= D || f.value > D && l <= D) ? i.value.months[s].days[o].isHovering = !0 : i.value.months[s].days[o].isHovering = !1;
          }
        f.value && !c.value && (k.count = N(l, f.value) - 1);
      }
    }, lt = () => {
      for (let e = 0; e < i.value.months.length; e++)
        for (let t = 0; t < i.value.months[e].days.length; t++)
          i.value.months[e].days[t].isHovering = !1;
    }, rt = () => {
      const e = [];
      for (let t = 0; t < n.disabledDates.length; t++)
        e[t] = _.parse(n.disabledDates[t], "YYYY-MM-DD");
      e.sort((t, l) => t - l), m.value = e;
    }, Ie = (e) => {
      let t = [!1, !1];
      if (e < m.value[0])
        n.enableCheckout ? t = [!1, Q(m.value[0], 1)] : t = [!1, m.value[0]];
      else if (e > m.value[m.value.length - 1])
        t = [m.value[m.value.length - 1], !1];
      else {
        let l = m.value.length, s = m.value.length;
        const o = Math.abs(new Date(0, 0, 0).valueOf());
        let D = o, p = -o, d = 0, S;
        for (S = 0; S < m.value.length; ++S)
          d = e - m.value[S], d < 0 && d > p && (s = S, p = d), d > 0 && d < D && (l = S, D = d);
        m.value[l] && (t[0] = m.value[l]), typeof m.value[l] > "u" ? t[1] = !1 : n.enableCheckout ? t[1] = Q(m.value[s], 1) : t[1] = m.value[s];
      }
      return t;
    }, he = h([]), ot = () => {
      const e = [], t = [], l = /* @__PURE__ */ new Date();
      for (let s = 0; s < 7; s++) {
        const o = Q(l, s);
        e[_.format(o, "d")] = _.format(o, "dddd");
      }
      for (let s = 0; s < n.disabledDaysOfWeek.length; s++)
        t.push(e.indexOf(n.disabledDaysOfWeek[s]));
      t.sort(), he.value = t;
    }, it = (e) => {
      const t = [!1, !1];
      for (let l = 0; l < 7; l++) {
        const s = Se(e, l);
        if (he.value.indexOf(parseInt(_.format(s, "d"), 10)) > -1) {
          t[0] = s;
          break;
        }
      }
      for (let l = 0; l < 7; l++) {
        const s = Q(e, l);
        if (he.value.indexOf(parseInt(_.format(s, "d"), 10)) > -1) {
          t[1] = s;
          break;
        }
      }
      return t;
    }, ut = (e, t) => {
      typeof e == "string" && typeof t == "string" ? (e = K(e), t = K(t)) : (e = new Date(e.getTime()), t = new Date(t.getTime())), Ke(e, t);
    }, k = ht(
      {
        show: !1,
        top: 0,
        left: 0,
        width: 0,
        count: 0,
        error: !1
      }
    ), Te = () => k.show = !1, Ne = (e) => !(!e.isValid || !e.isCurrentMonth), ft = (e, t) => {
      if (!v.value.start || v.value.start && v.value.end || !Ne(t))
        return !1;
      k.show = !0;
      const l = xe.value.getBoundingClientRect(), s = e.target.getBoundingClientRect();
      k.top = s.top - l.top - 35, k.left = s.left - l.left, k.width = s.width;
    }, xe = h(null), me = () => {
      i.value.showSingleMonth = de();
    };
    mt(() => i.value.showSingleMonth, () => {
      j();
    });
    const Be = () => typeof client < "u";
    vt(() => {
      window.removeEventListener("resize", () => me());
    });
    const ve = h(!1);
    return Dt(() => {
      window.addEventListener("resize", () => me()), me(), j(), ve.value = !0;
    }), je(), (e, t) => (B(), H("div", {
      class: "h-datepicker",
      ref_key: "parent",
      ref: xe
    }, [
      Z("div", {
        class: X([{ "h-datepicker_invisible": !k.show, visible: k.show }, "h_datepicker_popup"]),
        style: gt(
          { top: k.top + "px", left: k.left + "px", width: k.width + "px" }
        )
      }, [
        Z("div", It, [
          G(e.$slots, "popup", {
            nights: k.count
          }, () => [
            q(ee(k.count ? k.count + " " + (k.count > 1 ? z("nights") : z("night")) : z("not selected")), 1)
          ], !0)
        ])
      ], 6),
      (B(!0), H(pe, null, Me(i.value.months, (l, s) => (B(), H("div", {
        key: l.id,
        ref_for: !0,
        ref_key: "monthsDoms",
        ref: ce,
        class: X(["h-datepicker_month", {
          "h-datepicker_hidden": s === 1 && i.value.showSingleMonth,
          "h-datepicker_two_month_display": !i.value.showSingleMonth,
          "h-datepicker_one_month_display": i.value.showSingleMonth,
          "h-datepicker_month-1": s === 0,
          "h-datepicker_month-2": s === 1
        }])
      }, [
        Z("div", Tt, [
          Z("div", Nt, [
            ve.value || !Be ? (B(), H("div", {
              key: 0,
              onClick: (o) => nt(l, s),
              class: X(["month_control_btn", { "h-datepicker_invisible": !l.prevBtn }])
            }, [
              G(e.$slots, "prev", {}, () => [
                q(" <<")
              ], !0)
            ], 10, xt)) : He("", !0)
          ]),
          Z("div", Bt, [
            G(e.$slots, "month", { month: l }, () => [
              q(ee(l.name) + " " + ee(l.year), 1)
            ], !0)
          ]),
          Z("div", Ht, [
            ve.value || !Be ? (B(), H("div", {
              key: 0,
              onClick: (o) => tt(l, s),
              class: X(["month_control_btn", { "h-datepicker_invisible": !l.nextBtn }])
            }, [
              G(e.$slots, "next", {}, () => [
                q(" >> ")
              ], !0)
            ], 10, Vt)) : He("", !0)
          ])
        ]),
        Z("div", Ft, [
          (B(!0), H(pe, null, Me(ue(), (o) => (B(), H("div", Wt, [
            G(e.$slots, "weekday", { weekday: o }, () => [
              q(ee(o), 1)
            ], !0)
          ]))), 256)),
          (B(!0), H(pe, null, Me(l.days, (o) => (B(), H("div", {
            onClick: (D) => Qe(o),
            onMouseout: t[0] || (t[0] = (D) => Te()),
            onMouseover: (D) => Ce(o) || ft(D, o),
            class: X([{
              h_datepicker_notCurrentMonth: !o.isCurrentMonth,
              h_datepicker_valid: o.isValid,
              h_datepicker_invalid: !o.isValid,
              h_datepicker_tmp_invalid: !o.isTmpValid,
              h_datepicker_tmp_valid: o.isTmpValid,
              h_datepicker_disabled: o.isDisabled,
              h_datepicker_checkout_enabled: o.isCheckOutEnabled,
              h_datepicker_checkout_disabled: !o.isCheckOutEnabled,
              h_datepicker_before_disabled_date: o.isDayBeforeDisabledDate,
              h_datepicker_first_day_selected: o.isFirstDaySelected,
              h_datepicker_last_day_selected: o.isLastDaySelected,
              h_datepicker_selected: o.isSelected,
              h_datepicker_hovering: o.isHovering
            }, "h_datepicker_day"])
          }, [
            G(e.$slots, "day", { day: o }, () => [
              q(ee(o.day), 1)
            ], !0)
          ], 42, Pt))), 256))
        ])
      ], 2))), 128))
    ], 512));
  }
}, $t = /* @__PURE__ */ Ct(Et, [["__scopeId", "data-v-6ba9840c"]]);
export {
  $t as default
};
