import { ref as d, computed as ft, reactive as ct, watch as ht, onUnmounted as dt, onMounted as vt, openBlock as B, createElementBlock as H, createElementVNode as V, normalizeClass as X, normalizeStyle as mt, renderSlot as G, createTextVNode as q, toDisplayString as ee, Fragment as ge, renderList as pe, createCommentVNode as Be } from "vue";
var $e = /d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g, A = "\\d\\d?", E = "\\d\\d", Dt = "\\d{3}", gt = "\\d{4}", te = "[^\\s]+", ze = /\[([^]*?)\]/gm;
function Ze(a, r) {
  for (var n = [], g = 0, u = a.length; g < u; g++)
    n.push(a[g].substr(0, r));
  return n;
}
var He = function(a) {
  return function(r, n) {
    var g = n[a].map(function(S) {
      return S.toLowerCase();
    }), u = g.indexOf(r.toLowerCase());
    return u > -1 ? u : null;
  };
};
function L(a) {
  for (var r = [], n = 1; n < arguments.length; n++)
    r[n - 1] = arguments[n];
  for (var g = 0, u = r; g < u.length; g++) {
    var S = u[g];
    for (var C in S)
      a[C] = S[C];
  }
  return a;
}
var Le = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
], Re = [
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
], pt = Ze(Re, 3), Mt = Ze(Le, 3), Je = {
  dayNamesShort: Mt,
  dayNames: Le,
  monthNamesShort: pt,
  monthNames: Re,
  amPm: ["am", "pm"],
  DoFn: function(a) {
    return a + ["th", "st", "nd", "rd"][a % 10 > 3 ? 0 : (a - a % 10 !== 10 ? 1 : 0) * a % 10];
  }
}, ie = L({}, Je), yt = function(a) {
  return ie = L(ie, a);
}, Ve = function(a) {
  return a.replace(/[|\\{()[^$+*?.-]/g, "\\$&");
}, Y = function(a, r) {
  for (r === void 0 && (r = 2), a = String(a); a.length < r; )
    a = "0" + a;
  return a;
}, kt = {
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
}, Fe = function(a) {
  return +a - 1;
}, We = [null, A], Pe = [null, te], Ee = [
  "isPm",
  te,
  function(a, r) {
    var n = a.toLowerCase();
    return n === r.amPm[0] ? 0 : n === r.amPm[1] ? 1 : null;
  }
], Ae = [
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
], bt = {
  D: ["day", A],
  DD: ["day", E],
  Do: ["day", A + te, function(a) {
    return parseInt(a, 10);
  }],
  M: ["month", A, Fe],
  MM: ["month", E, Fe],
  YY: [
    "year",
    E,
    function(a) {
      var r = /* @__PURE__ */ new Date(), n = +("" + r.getFullYear()).substr(0, 2);
      return +("" + (+a > 68 ? n - 1 : n) + a);
    }
  ],
  h: ["hour", A, void 0, "isPm"],
  hh: ["hour", E, void 0, "isPm"],
  H: ["hour", A],
  HH: ["hour", E],
  m: ["minute", A],
  mm: ["minute", E],
  s: ["second", A],
  ss: ["second", E],
  YYYY: ["year", gt],
  S: ["millisecond", "\\d", function(a) {
    return +a * 100;
  }],
  SS: ["millisecond", E, function(a) {
    return +a * 10;
  }],
  SSS: ["millisecond", Dt],
  d: We,
  dd: We,
  ddd: Pe,
  dddd: Pe,
  MMM: ["month", te, He("monthNamesShort")],
  MMMM: ["month", te, He("monthNames")],
  a: Ee,
  A: Ee,
  ZZ: Ae,
  Z: Ae
}, oe = {
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
}, Yt = function(a) {
  return L(oe, a);
}, _t = function(a, r, n) {
  if (r === void 0 && (r = oe.default), n === void 0 && (n = {}), typeof a == "number" && (a = new Date(a)), Object.prototype.toString.call(a) !== "[object Date]" || isNaN(a.getTime()))
    throw new Error("Invalid Date pass to format");
  r = oe[r] || r;
  var g = [];
  r = r.replace(ze, function(S, C) {
    return g.push(C), "@@@";
  });
  var u = L(L({}, ie), n);
  return r = r.replace($e, function(S) {
    return kt[S](a, u);
  }), r.replace(/@@@/g, function() {
    return g.shift();
  });
};
function wt(a, r, n) {
  if (n === void 0 && (n = {}), typeof r != "string")
    throw new Error("Invalid format in fecha parse");
  if (r = oe[r] || r, a.length > 1e3)
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
  }, S = [], C = [], $ = r.replace(ze, function(m, o) {
    return C.push(Ve(o)), "@@@";
  }), R = {}, F = {};
  $ = Ve($).replace($e, function(m) {
    var o = bt[m], Z = o[0], ue = o[1], ae = o[3];
    if (R[Z])
      throw new Error("Invalid format. " + Z + " specified twice in format");
    return R[Z] = !0, ae && (F[ae] = !0), S.push(o), "(" + ue + ")";
  }), Object.keys(F).forEach(function(m) {
    if (!R[m])
      throw new Error("Invalid format. " + m + " is required in specified format");
  }), $ = $.replace(/@@@/g, function() {
    return C.shift();
  });
  var _ = a.match(new RegExp($, "i"));
  if (!_)
    return null;
  for (var f = L(L({}, ie), n), c = 1; c < _.length; c++) {
    var W = S[c - 1], M = W[0], z = W[2], ne = z ? z(_[c], f) : +_[c];
    if (ne == null)
      return null;
    u[M] = ne;
  }
  u.isPm === 1 && u.hour != null && +u.hour != 12 ? u.hour = +u.hour + 12 : u.isPm === 0 && +u.hour == 12 && (u.hour = 0);
  var I;
  if (u.timezoneOffset == null) {
    I = new Date(u.year, u.month, u.day, u.hour, u.minute, u.second, u.millisecond);
    for (var N = [
      ["month", "getMonth"],
      ["day", "getDate"],
      ["hour", "getHours"],
      ["minute", "getMinutes"],
      ["second", "getSeconds"]
    ], c = 0, v = N.length; c < v; c++)
      if (R[N[c][0]] && u[N[c][0]] !== I[N[c][1]]())
        return null;
  } else if (I = new Date(Date.UTC(u.year, u.month, u.day, u.hour, u.minute - u.timezoneOffset, u.second, u.millisecond)), u.month > 11 || u.month < 0 || u.day > 31 || u.day < 1 || u.hour > 23 || u.hour < 0 || u.minute > 59 || u.minute < 0 || u.second > 59 || u.second < 0)
    return null;
  return I;
}
var O = {
  format: _t,
  parse: wt,
  defaultI18n: Je,
  setGlobalDateI18n: yt,
  setGlobalDateMasks: Yt
};
const St = (a, r) => {
  const n = a.__vccOpts || a;
  for (const [g, u] of r)
    n[g] = u;
  return n;
}, Ot = { style: { "pointer-events": "none" } }, Ct = { class: "h_datepicker_month_control_panel" }, It = { class: "h_datepicker_month_control_item" }, Nt = ["onClick"], Tt = { class: "h_datepicker_month_control_item" }, xt = { class: "h_datepicker_month_control_item" }, Bt = ["onClick"], Ht = { class: "h_datepicker_month_box" }, Vt = { class: "h_datepicker_weeks_container" }, Ft = { class: "h_datepicker_week_name" }, Wt = { class: "h_datepicker_dates_container" }, Pt = ["onClick", "onMouseover"], Et = {
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
      default: 768,
      type: [Number, String]
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
    const S = d(!1), C = d(!1), $ = d(!1), R = d(!1), F = d(n.maxNights), _ = d(n.minNights), f = d(n.startDate ?? !1), c = d(n.endDate ?? !1);
    d(null);
    const W = d(null), M = d({}), z = d(0);
    d(null);
    const ne = d(null);
    S.value = !1, C.value = !1, $.value = !1, R.value = !1;
    const I = d(n.startDate), N = d(n.endDate), v = d([]), m = d({
      start: null,
      end: null
    }), o = d({
      months: [],
      open: !0,
      submitButton: !1,
      clearButton: !1,
      showSingleMonth: n.showSingleMonth
    });
    ft({
      error: !1,
      textContent: "",
      show: !1
    });
    const Z = (e) => e in n.i18n ? n.i18n[e] : "", ue = () => {
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
      return O.format(e, l);
    }, K = (e, t = null) => {
      let l = t ?? n.format;
      return O.parse(e, l);
    }, Ue = () => {
      _.value = n.minNights > 1 ? n.minNights + 1 : 2, F.value = n.maxNights > 0 ? n.maxNights + 1 : 0, n.startDate && typeof n.startDate == "string" && (I.value = K(n.startDate)), n.endDate && typeof n.endDate == "string" && (N.value = K(N.value)), n.disabledDates.length > 0 && st(), n.disabledDaysOfWeek.length > 0 && lt(), I.value && N.value ? it(I.value, N.value) : ke(), ne.value && (u.value || !f.value && !c.value) && (o.value.clearButton = !0), z.value = 0, W.value = !1;
    }, P = (e, t) => {
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
      e.setHours(0, 0, 0, 0), l.days = je(e), o.value.months.splice(t - 1, 1, l), Se(), M.value["month" + t] = e;
    }, Me = {
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
    }, je = (e) => {
      const t = [], l = [];
      let s;
      e.setDate(1);
      let i = e.getDay();
      const D = e.getMonth();
      if (i === 0 && n.startOfWeek === "monday" && (i = 7), i > 0)
        for (let p = i; p > 0; p--) {
          const h = new Date(e.getTime() - 864e5 * p);
          s = le(h.getTime()), (n.minDate && k(h, n.minDate) < 0 || n.maxDate && k(h, n.maxDate) > 0) && (s = !1), t.push(
            Object.assign({}, Me, {
              date: h,
              type: "lastMonth",
              day: h.getDate(),
              time: h.getTime(),
              isValid: s
            })
          );
        }
      for (let p = 0; p < 40; p++) {
        const h = Q(e, p);
        s = le(h.getTime()), (n.minDate && k(h, n.minDate) < 0 || n.maxDate && k(h, n.maxDate) > 0) && (s = !1), t.push(Object.assign({}, Me, {
          date: h,
          type: h.getMonth() === D ? "visibleMonth" : "nextMonth",
          day: h.getDate(),
          time: h.getTime(),
          isCurrentMonth: h.getMonth() === D,
          isValid: s
        }));
      }
      for (let p = 0; p < 6 && t[p * 7].type !== "nextMonth"; p++)
        for (let h = 0; h < 7; h++) {
          let w = n.startOfWeek === "monday" ? h + 1 : h;
          w = t[p * 7 + w], l.push(ye(w));
        }
      return l;
    }, ye = (e) => {
      const t = y(e.time) === y(/* @__PURE__ */ new Date()), l = y(e.time) === y(n.minDate);
      let s = !1, i = !1, D = !1, p = !1, h = !1, w = !1;
      if (e.valid || e.type === "visibleMonth") {
        const me = y(e.time, "YYYY-MM-DD");
        if (n.disabledDates.length > 0) {
          const x = Ce(e.date);
          if (x[0] === !1 && (x[0] = _e(I.value, 1)), x[0] && x[1] && k(e.date, x[0]) && T(x[0], x[1]) - 2 > 0) {
            const De = T(x[1], e.date) - 1, ut = T(e.date, x[0]) - 1;
            (n.selectForward && De < _.value || !n.selectForward && De < _.value && ut < _.value) && (e.isValid = !1), !e.isValid && n.enableCheckout && De === 2 && (w = !0);
          }
          n.disabledDates.indexOf(me) > -1 ? (e.isValid = !1, s = !0, z.value++, W.value = e.date) : z.value = 0, e.isValid && W.value && k(e.date, W.value) > 0 && T(e.date, W.value) === 2 && (h = !0);
        }
        n.disabledDaysOfWeek.length > 0 && n.disabledDaysOfWeek.indexOf(O.format(e.time, "ddd")) > -1 && (e.isValid = !1, p = !0), n.noCheckInDates.length > 0 && n.noCheckInDates.indexOf(me) > -1 && (i = !0, h = !1), n.noCheckOutDates.length > 0 && n.noCheckOutDates.indexOf(me) > -1 && (D = !0), n.noCheckInDaysOfWeek.length > 0 && n.noCheckInDaysOfWeek.indexOf(O.format(e.time, "ddd")) > -1 && (i = !0, h = !1), n.noCheckOutDaysOfWeek.length > 0 && n.noCheckOutDaysOfWeek.indexOf(O.format(e.time, "ddd")) > -1 && (D = !0);
      }
      return e.isToday = t, e.isDisabled = s, e.isCheckOutEnabled = !(s && n.enableCheckout && z.value === 1), e.isDayBeforeDisabledDate = w, e.isCheckInOnly = l || h, e.isNoCheckIn = i, e.isNoCheckOut = D, e.isDayOfWeekDisabled = p, e;
    }, Ge = () => {
      for (let e = 0; e < o.value.months.length; e++)
        for (let t = 0; t < o.value.months[e].days.length; t++) {
          const l = parseInt(o.value.months[e].days[t].time, 10), s = new Date(l);
          let i;
          i = le(s.getTime()), (n.minDate && k(s, n.minDate) < 0 || n.maxDate && k(s, n.maxDate) > 0) && (i = !1), o.value.months[e].days[t].isValid = i, o.value.months[e].days[t] = ye(o.value.months[e].days[t]);
        }
    }, ke = () => {
      P(n.minDate, 1), P(J(n.minDate), 2), j();
    }, qe = (e, t, ...l) => {
      if (l.length > 0 && l[0] !== void 0 && l[0], e.getTime() > t.getTime()) {
        let i = t;
        t = e, e = i, i = null;
      }
      let s = !0;
      if ((n.minDate && k(e, n.minDate) < 0 || n.maxDate && k(t, n.maxDate) > 0) && (s = !1), !s) {
        ke();
        return;
      }
      e.setTime(e.getTime() + 12 * 60 * 60 * 1e3), t.setTime(t.getTime() + 12 * 60 * 60 * 1e3), f.value = e.getTime(), c.value = t.getTime(), k(e, t) > 0 && re(e, t) === 0 && (t = J(e)), re(e, t) === 0 && (t = J(e)), P(e, 1), P(t, 2), se(), j(), Ye();
    }, se = () => {
      if (!(!f.value && !c.value))
        for (let e = 0; e < o.value.months.length; e++)
          for (let t = 0; t < o.value.months[e].days.length; t++) {
            const l = o.value.months[e].days[t], s = parseInt(l.time, 10);
            f.value && c.value && c.value >= s && f.value <= s || f.value && !c.value && y(f.value, "YYYY-MM-DD") === y(s, "YYYY-MM-DD") ? l.isSelected = !0 : l.isSelected = !1, f.value && y(f.value, "YYYY-MM-DD") === y(s, "YYYY-MM-DD") ? l.isFirstDaySelected = !0 : l.isFirstDaySelected = !1, c.value && y(c.value, "YYYY-MM-DD") === y(s, "YYYY-MM-DD") ? l.isLastDaySelected = !0 : l.isLastDaySelected = !1, o.value.months[e].days[t] = Object.assign({}, l);
          }
    }, Ke = (e, t) => {
      if (!e.isValid || !e.isCurrentMonth)
        return;
      const l = m.value.start === null, s = parseInt(e.time, 10);
      if (!(m.value.start && m.value.start.time === e.time)) {
        if (l) {
          if (e.isNoCheckIn)
            return;
        } else if (f.value && (f.value > s && e.isNoCheckIn || m.value.start && m.value.start.isNoCheckIn && f.value > s || e.isNoCheckOut && s > f.value))
          return;
        if (l ? (m.value.start = e, f.value = s, c.value = !1) : f.value && (m.value.end = e, c.value = s, Ie()), f.value && c.value && f.value > c.value) {
          const i = c.value;
          c.value = f.value, f.value = i;
        }
        f.value = parseInt(f.value, 10), c.value = parseInt(c.value, 10), at(), f.value && !c.value && Oe(e), Se(), Ye(), f.value && c.value && Ge(), se(), c.value && g("selected", { start: f.value, end: c.value }), m.value.end && Qe();
      }
    }, Qe = () => {
      m.value.start = null, m.value.end = null;
    }, le = (e) => {
      if (e = parseInt(e, 10), n.minDate && k(e, n.minDate) < 0 || n.maxDate && k(e, n.maxDate) > 0)
        return !1;
      if (f.value && !c.value) {
        if (F.value > 0 && T(e, f.value) > F.value || _.value > 0 && T(e, f.value) > 1 && T(e, f.value) < _.value || n.selectForward && e < f.value)
          return !1;
        if (n.disabledDates.length > 0) {
          const t = Ce(new Date(parseInt(f.value, 10)));
          if (t[0] && k(e, t[0]) <= 0 || t[1] && k(e, t[1]) >= 0)
            return !1;
        }
        if (n.disabledDaysOfWeek.length > 0) {
          const t = rt(new Date(parseInt(f.value, 10)));
          if (t[0] && k(e, t[0]) <= 0 || t[1] && k(e, t[1]) >= 0)
            return !1;
        }
      }
      return !0;
    }, be = () => {
      for (let e = 0; e < o.value.months.length; e++)
        for (let t = 0; t < o.value.months[e].days.length; t++)
          o.value.months[e].days[t].selected = !1, o.value.months[e].days[t].isFirstDaySelected = !1, o.value.months[e].days[t].isLastDaySelected = !1;
      return !0;
    }, Ye = () => {
      const e = T(c.value, f.value);
      (F.value && e > F.value || _.value && e < _.value) && (f.value = !1, c.value = !1, be());
    }, Q = (e, t) => {
      const l = new Date(e);
      return l.setDate(l.getDate() + t), l;
    }, _e = (e, t) => {
      const l = new Date(e);
      return l.setDate(l.getDate() - t), l;
    }, T = (e, t) => Math.abs(we(e) - we(t)) + 1, k = (e, t) => {
      const l = parseInt(y(e, "YYYYMMDD"), 10) - parseInt(y(t, "YYYYMMDD"), 10);
      return l > 0 ? 1 : l === 0 ? 0 : -1;
    }, re = (e, t) => {
      const l = parseInt(y(e, "YYYYMM"), 10) - parseInt(y(t, "YYYYMM"), 10);
      return l > 0 ? 1 : l === 0 ? 0 : -1;
    }, we = (e) => Math.round(Xe(e) / 864e5), Xe = (e) => (typeof e == "object" && e.getTime && (e = e.getTime()), typeof e == "string" && !e.match(/\d{13}/) && (e = K(e).getTime()), e = parseInt(e, 10) - (/* @__PURE__ */ new Date()).getTimezoneOffset() * 60 * 1e3, e), et = (e, t) => {
      const l = t === 1;
      let s = l ? M.value.month2 : M.value.month1;
      return s = J(s), !ce() && !l && re(s, M.value.month2) >= 0 || U(s) ? !1 : (n.moveBothMonths && l && P(M.value.month2, 1), P(s, t + 1), se(), j(), !0);
    }, tt = (e, t) => {
      const l = t === 1;
      let s = l ? M.value.month2 : M.value.month1;
      return s = fe(s), l && re(s, M.value.month1) <= 0 || U(s) ? !1 : (n.moveBothMonths && !l && P(M.value.month1, 2), P(s, t + 1), se(), j(), !0);
    }, ce = () => n.showSingleMonth || nt(), nt = () => typeof window > "u" ? !1 : window.innerWidth < +n.singleMonthBreakpoint, U = (e) => {
      const t = new Date(e.valueOf());
      return n.minDate && new Date(t.getFullYear(), t.getMonth() + 1, 0, 23, 59, 59) < n.minDate || n.maxDate && new Date(t.getFullYear(), t.getMonth(), 1) > n.maxDate;
    }, j = () => {
      if (ce()) {
        U(fe(M.value.month1)) ? o.value.months[0].prevBtn = !1 : o.value.months[0].prevBtn = !0, U(J(M.value.month1)) ? o.value.months[0].nextBtn = !1 : o.value.months[0].nextBtn = !0;
        return;
      }
      const e = parseInt(y(M.value.month1, "YYYYMM"), 10), t = parseInt(y(M.value.month2, "YYYYMM"), 10), l = Math.abs(e - t);
      l > 1 && l !== 89 ? (o.value.months[0].nextBtn = !0, o.value.months[1].prevBtn = !0) : (o.value.months[0].nextBtn = !1, o.value.months[1].prevBtn = !1), U(fe(M.value.month1)) ? o.value.months[0].prevBtn = !1 : o.value.months[0].prevBtn = !0, U(J(M.value.month2)) ? o.value.months[1].nextBtn = !1 : o.value.months[1].nextBtn = !0;
    }, Se = () => {
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
    }, Oe = (e, t) => {
      const l = parseInt(e.time, 10);
      if (e.isValid && Ne(e)) {
        for (let s = 0; s < o.value.months.length; s++)
          for (let i = 0; i < o.value.months[s].days.length; i++) {
            const D = parseInt(o.value.months[s].days[i].time, 10);
            D === l ? o.value.months[s].days[i].isHovering = !0 : o.value.months[s].days[i].isHovering = !1, f.value && !c.value && (f.value < D && l >= D || f.value > D && l <= D) ? o.value.months[s].days[i].isHovering = !0 : o.value.months[s].days[i].isHovering = !1;
          }
        f.value && !c.value && (b.count = T(l, f.value) - 1);
      }
    }, at = () => {
      for (let e = 0; e < o.value.months.length; e++)
        for (let t = 0; t < o.value.months[e].days.length; t++)
          o.value.months[e].days[t].isHovering = !1;
    }, st = () => {
      const e = [];
      for (let t = 0; t < n.disabledDates.length; t++)
        e[t] = O.parse(n.disabledDates[t], "YYYY-MM-DD");
      e.sort((t, l) => t - l), v.value = e;
    }, Ce = (e) => {
      let t = [!1, !1];
      if (e < v.value[0])
        n.enableCheckout ? t = [!1, Q(v.value[0], 1)] : t = [!1, v.value[0]];
      else if (e > v.value[v.value.length - 1])
        t = [v.value[v.value.length - 1], !1];
      else {
        let l = v.value.length, s = v.value.length;
        const i = Math.abs(new Date(0, 0, 0).valueOf());
        let D = i, p = -i, h = 0, w;
        for (w = 0; w < v.value.length; ++w)
          h = e - v.value[w], h < 0 && h > p && (s = w, p = h), h > 0 && h < D && (l = w, D = h);
        v.value[l] && (t[0] = v.value[l]), typeof v.value[l] > "u" ? t[1] = !1 : n.enableCheckout ? t[1] = Q(v.value[s], 1) : t[1] = v.value[s];
      }
      return t;
    }, he = d([]), lt = () => {
      const e = [], t = [], l = /* @__PURE__ */ new Date();
      for (let s = 0; s < 7; s++) {
        const i = Q(l, s);
        e[O.format(i, "d")] = O.format(i, "ddd");
      }
      for (let s = 0; s < n.disabledDaysOfWeek.length; s++)
        t.push(e.indexOf(n.disabledDaysOfWeek[s]));
      t.sort(), he.value = t;
    }, rt = (e) => {
      const t = [!1, !1];
      for (let l = 0; l < 7; l++) {
        const s = _e(e, l);
        if (he.value.indexOf(parseInt(O.format(s, "d"), 10)) > -1) {
          t[0] = s;
          break;
        }
      }
      for (let l = 0; l < 7; l++) {
        const s = Q(e, l);
        if (he.value.indexOf(parseInt(O.format(s, "d"), 10)) > -1) {
          t[1] = s;
          break;
        }
      }
      return t;
    }, it = (e, t) => {
      typeof e == "string" && typeof t == "string" ? (e = K(e), t = K(t)) : (e = new Date(e.getTime()), t = new Date(t.getTime())), qe(e, t);
    }, b = ct(
      {
        show: !1,
        top: 0,
        left: 0,
        width: 0,
        count: 0,
        error: !1
      }
    ), Ie = () => b.show = !1, Ne = (e) => !(!e.isValid || !e.isCurrentMonth), ot = (e, t) => {
      if (!m.value.start || m.value.start && m.value.end || !Ne(t))
        return !1;
      b.show = !0;
      const l = Te.value.getBoundingClientRect(), s = e.target.getBoundingClientRect();
      b.top = s.top - l.top - 35, b.left = s.left - l.left, b.width = s.width;
    }, Te = d(null), de = () => {
      o.value.showSingleMonth = ce();
    };
    ht(() => o.value.showSingleMonth, () => {
      j();
    });
    const xe = () => typeof client < "u";
    dt(() => {
      window.removeEventListener("resize", () => de());
    });
    const ve = d(!1);
    return vt(() => {
      window.addEventListener("resize", () => de()), de(), j(), ve.value = !0;
    }), Ue(), (e, t) => (B(), H("div", {
      class: "h_datepicker",
      ref_key: "parent",
      ref: Te
    }, [
      V("div", {
        class: X([{ h_datepicker_invisible: !b.show, visible: b.show }, "h_datepicker_popup"]),
        style: mt(
          { top: b.top + "px", left: b.left + "px", width: b.width + "px" }
        )
      }, [
        V("div", Ot, [
          G(e.$slots, "popup", {
            nights: b.count
          }, () => [
            q(ee(b.count ? b.count + " " + (b.count > 1 ? Z("nights") : Z("night")) : Z("not selected")), 1)
          ], !0)
        ])
      ], 6),
      (B(!0), H(ge, null, pe(o.value.months, (l, s) => (B(), H("div", {
        key: l.id,
        class: X(["h_datepicker_month", {
          h_datepicker_hidden: s === 1 && o.value.showSingleMonth,
          h_datepicker_two_month_display: !o.value.showSingleMonth,
          h_datepicker_one_month_display: o.value.showSingleMonth,
          "h_datepicker_month-1": s === 0,
          "h_datepicker_month-2": s === 1
        }])
      }, [
        V("div", Ct, [
          V("div", It, [
            ve.value || !xe ? (B(), H("div", {
              key: 0,
              onClick: (i) => tt(l, s),
              class: X(["h_datepicker_month_control_btn", { h_datepicker_invisible: !l.prevBtn }])
            }, [
              G(e.$slots, "prev", {}, () => [
                q(" <<")
              ], !0)
            ], 10, Nt)) : Be("", !0)
          ]),
          V("div", Tt, [
            G(e.$slots, "month", { month: l }, () => [
              q(ee(l.name) + " " + ee(l.year), 1)
            ], !0)
          ]),
          V("div", xt, [
            ve.value || !xe ? (B(), H("div", {
              key: 0,
              onClick: (i) => et(l, s),
              class: X(["h_datepicker_month_control_btn", { h_datepicker_invisible: !l.nextBtn }])
            }, [
              G(e.$slots, "next", {}, () => [
                q(" >>")
              ], !0)
            ], 10, Bt)) : Be("", !0)
          ])
        ]),
        V("div", Ht, [
          V("div", Vt, [
            (B(!0), H(ge, null, pe(ue(), (i) => (B(), H("div", Ft, [
              G(e.$slots, "weekday", { weekday: i }, () => [
                q(ee(i), 1)
              ], !0)
            ]))), 256))
          ]),
          V("div", Wt, [
            (B(!0), H(ge, null, pe(l.days, (i) => (B(), H("div", {
              onClick: (D) => Ke(i),
              onMouseout: t[0] || (t[0] = (D) => Ie()),
              onMouseover: (D) => Oe(i) || ot(D, i),
              class: X([{
                h_datepicker_notCurrentMonth: !i.isCurrentMonth,
                h_datepicker_valid: i.isValid,
                h_datepicker_invalid: !i.isValid,
                h_datepicker_tmp_invalid: !i.isTmpValid,
                h_datepicker_tmp_valid: i.isTmpValid,
                h_datepicker_disabled: i.isDisabled,
                h_datepicker_checkout_enabled: i.isCheckOutEnabled,
                h_datepicker_checkout_disabled: !i.isCheckOutEnabled,
                h_datepicker_checkin_enabled: !i.isNoCheckIn,
                h_datepicker_checkin_disabled: i.isNoCheckIn,
                h_datepicker_before_disabled_date: i.isDayBeforeDisabledDate,
                h_datepicker_first_day_selected: i.isFirstDaySelected,
                h_datepicker_last_day_selected: i.isLastDaySelected,
                h_datepicker_selected: i.isSelected,
                h_datepicker_hovering: i.isHovering
              }, "h_datepicker_day"])
            }, [
              G(e.$slots, "day", { day: i }, () => [
                q(ee(i.day), 1)
              ], !0)
            ], 42, Pt))), 256))
          ])
        ])
      ], 2))), 128))
    ], 512));
  }
}, $t = /* @__PURE__ */ St(Et, [["__scopeId", "data-v-e09819b5"]]);
export {
  $t as default
};
