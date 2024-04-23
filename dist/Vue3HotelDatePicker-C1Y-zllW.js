import { ref as d, computed as vt, reactive as Dt, watch as gt, onUnmounted as pt, onMounted as Mt, openBlock as z, createElementBlock as Z, createElementVNode as W, normalizeClass as X, normalizeStyle as yt, renderSlot as U, createTextVNode as q, toDisplayString as ee, Fragment as ge, renderList as pe } from "vue";
var Ze = /d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g, E = "\\d\\d?", P = "\\d\\d", bt = "\\d{3}", Yt = "\\d{4}", te = "[^\\s]+", Le = /\[([^]*?)\]/gm;
function Re(a, l) {
  for (var n = [], y = 0, u = a.length; y < u; y++)
    n.push(a[y].substr(0, l));
  return n;
}
var Fe = function(a) {
  return function(l, n) {
    var y = n[a].map(function(S) {
      return S.toLowerCase();
    }), u = y.indexOf(l.toLowerCase());
    return u > -1 ? u : null;
  };
};
function j(a) {
  for (var l = [], n = 1; n < arguments.length; n++)
    l[n - 1] = arguments[n];
  for (var y = 0, u = l; y < u.length; y++) {
    var S = u[y];
    for (var N in S)
      a[N] = S[N];
  }
  return a;
}
var Je = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
], Ue = [
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
], wt = Re(Ue, 3), kt = Re(Je, 3), St = {
  dayNamesShort: kt,
  dayNames: Je,
  monthNamesShort: wt,
  monthNames: Ue,
  amPm: ["am", "pm"],
  DoFn: function(a) {
    return a + ["th", "st", "nd", "rd"][a % 10 > 3 ? 0 : (a - a % 10 !== 10 ? 1 : 0) * a % 10];
  }
}, ie = j({}, St), Ct = function(a) {
  return ie = j(ie, a);
}, We = function(a) {
  return a.replace(/[|\\{()[^$+*?.-]/g, "\\$&");
}, k = function(a, l) {
  for (l === void 0 && (l = 2), a = String(a); a.length < l; )
    a = "0" + a;
  return a;
}, xt = {
  D: function(a) {
    return String(a.getDate());
  },
  DD: function(a) {
    return k(a.getDate());
  },
  Do: function(a, l) {
    return l.DoFn(a.getDate());
  },
  d: function(a) {
    return String(a.getDay());
  },
  dd: function(a) {
    return k(a.getDay());
  },
  ddd: function(a, l) {
    return l.dayNamesShort[a.getDay()];
  },
  dddd: function(a, l) {
    return l.dayNames[a.getDay()];
  },
  M: function(a) {
    return String(a.getMonth() + 1);
  },
  MM: function(a) {
    return k(a.getMonth() + 1);
  },
  MMM: function(a, l) {
    return l.monthNamesShort[a.getMonth()];
  },
  MMMM: function(a, l) {
    return l.monthNames[a.getMonth()];
  },
  YY: function(a) {
    return k(String(a.getFullYear()), 4).substr(2);
  },
  YYYY: function(a) {
    return k(a.getFullYear(), 4);
  },
  h: function(a) {
    return String(a.getHours() % 12 || 12);
  },
  hh: function(a) {
    return k(a.getHours() % 12 || 12);
  },
  H: function(a) {
    return String(a.getHours());
  },
  HH: function(a) {
    return k(a.getHours());
  },
  m: function(a) {
    return String(a.getMinutes());
  },
  mm: function(a) {
    return k(a.getMinutes());
  },
  s: function(a) {
    return String(a.getSeconds());
  },
  ss: function(a) {
    return k(a.getSeconds());
  },
  S: function(a) {
    return String(Math.round(a.getMilliseconds() / 100));
  },
  SS: function(a) {
    return k(Math.round(a.getMilliseconds() / 10), 2);
  },
  SSS: function(a) {
    return k(a.getMilliseconds(), 3);
  },
  a: function(a, l) {
    return a.getHours() < 12 ? l.amPm[0] : l.amPm[1];
  },
  A: function(a, l) {
    return a.getHours() < 12 ? l.amPm[0].toUpperCase() : l.amPm[1].toUpperCase();
  },
  ZZ: function(a) {
    var l = a.getTimezoneOffset();
    return (l > 0 ? "-" : "+") + k(Math.floor(Math.abs(l) / 60) * 100 + Math.abs(l) % 60, 4);
  },
  Z: function(a) {
    var l = a.getTimezoneOffset();
    return (l > 0 ? "-" : "+") + k(Math.floor(Math.abs(l) / 60), 2) + ":" + k(Math.abs(l) % 60, 2);
  }
}, Pe = function(a) {
  return +a - 1;
}, _e = [null, E], Ee = [null, te], Ae = [
  "isPm",
  te,
  function(a, l) {
    var n = a.toLowerCase();
    return n === l.amPm[0] ? 0 : n === l.amPm[1] ? 1 : null;
  }
], $e = [
  "timezoneOffset",
  "[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",
  function(a) {
    var l = (a + "").match(/([+-]|\d\d)/gi);
    if (l) {
      var n = +l[1] * 60 + parseInt(l[2], 10);
      return l[0] === "+" ? n : -n;
    }
    return 0;
  }
], Ot = {
  D: ["day", E],
  DD: ["day", P],
  Do: ["day", E + te, function(a) {
    return parseInt(a, 10);
  }],
  M: ["month", E, Pe],
  MM: ["month", P, Pe],
  YY: [
    "year",
    P,
    function(a) {
      var l = /* @__PURE__ */ new Date(), n = +("" + l.getFullYear()).substr(0, 2);
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
  YYYY: ["year", Yt],
  S: ["millisecond", "\\d", function(a) {
    return +a * 100;
  }],
  SS: ["millisecond", P, function(a) {
    return +a * 10;
  }],
  SSS: ["millisecond", bt],
  d: _e,
  dd: _e,
  ddd: Ee,
  dddd: Ee,
  MMM: ["month", te, Fe("monthNamesShort")],
  MMMM: ["month", te, Fe("monthNames")],
  a: Ae,
  A: Ae,
  ZZ: $e,
  Z: $e
}, Me = {
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
}, _ = function(a, l, n) {
  if (l === void 0 && (l = Me.default), n === void 0 && (n = {}), typeof a == "number" && (a = new Date(a)), Object.prototype.toString.call(a) !== "[object Date]" || isNaN(a.getTime()))
    throw new Error("Invalid Date pass to format");
  l = Me[l] || l;
  var y = [];
  l = l.replace(Le, function(S, N) {
    return y.push(N), "@@@";
  });
  var u = j(j({}, ie), n);
  return l = l.replace(Ze, function(S) {
    return xt[S](a, u);
  }), l.replace(/@@@/g, function() {
    return y.shift();
  });
};
function ze(a, l, n) {
  if (n === void 0 && (n = {}), typeof l != "string")
    throw new Error("Invalid format in fecha parse");
  if (l = Me[l] || l, a.length > 1e3)
    return null;
  var y = /* @__PURE__ */ new Date(), u = {
    year: y.getFullYear(),
    month: 0,
    day: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
    isPm: null,
    timezoneOffset: null
  }, S = [], N = [], A = l.replace(Le, function(O, x) {
    return N.push(We(x)), "@@@";
  }), $ = {}, ne = {};
  A = We(A).replace(Ze, function(O) {
    var x = Ot[O], D = x[0], Y = x[1], i = x[3];
    if ($[D])
      throw new Error("Invalid format. " + D + " specified twice in format");
    return $[D] = !0, i && (ne[i] = !0), S.push(x), "(" + Y + ")";
  }), Object.keys(ne).forEach(function(O) {
    if (!$[O])
      throw new Error("Invalid format. " + O + " is required in specified format");
  }), A = A.replace(/@@@/g, function() {
    return N.shift();
  });
  var L = a.match(new RegExp(A, "i"));
  if (!L)
    return null;
  for (var V = j(j({}, ie), n), v = 1; v < L.length; v++) {
    var f = S[v - 1], c = f[0], ae = f[2], H = ae ? ae(L[v], V) : +L[v];
    if (H == null)
      return null;
    u[c] = H;
  }
  u.isPm === 1 && u.hour != null && +u.hour != 12 ? u.hour = +u.hour + 12 : u.isPm === 0 && +u.hour == 12 && (u.hour = 0);
  var g;
  if (u.timezoneOffset == null) {
    g = new Date(u.year, u.month, u.day, u.hour, u.minute, u.second, u.millisecond);
    for (var I = [
      ["month", "getMonth"],
      ["day", "getDate"],
      ["hour", "getHours"],
      ["minute", "getMinutes"],
      ["second", "getSeconds"]
    ], v = 0, ue = I.length; v < ue; v++)
      if ($[I[v][0]] && u[I[v][0]] !== g[I[v][1]]())
        return null;
  } else if (g = new Date(Date.UTC(u.year, u.month, u.day, u.hour, u.minute - u.timezoneOffset, u.second, u.millisecond)), u.month > 11 || u.month < 0 || u.day > 31 || u.day < 1 || u.hour > 23 || u.hour < 0 || u.minute > 59 || u.minute < 0 || u.second > 59 || u.second < 0)
    return null;
  return g;
}
const Tt = (a, l) => {
  const n = a.__vccOpts || a;
  for (const [y, u] of l)
    n[y] = u;
  return n;
}, Nt = { class: "month_control_panel" }, It = { class: "month_control_item" }, Bt = ["onClick"], Vt = { class: "month_control_item" }, Ht = { class: "month_control_item" }, Ft = ["onClick"], Wt = { class: "month_box" }, Pt = { class: "week_name" }, _t = ["onClick", "onMouseover"], Et = {
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
    showTopbar: !1,
    moveBothMonths: !1,
    ariaDayFormat: "dddd, MMMM DD, YYYY",
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
    topbarPosition: "top",
    onOpenDatepicker: Boolean,
    minNightsMultiple: Boolean,
    selectForward: Boolean,
    showSingleMonth: Boolean,
    disabledDates: {
      default: !1,
      type: [Array, Boolean]
    },
    daysWithExtraText: {
      default: () => []
    },
    enableCheckout: Boolean,
    getValues: null,
    extraDayText: null,
    i18n: {
      default: () => ({
        selected: "Your stay:",
        night: "Night",
        nights: "Nights",
        button: "Close",
        clearButton: "Clear",
        submitButton: "Submit",
        "checkin-disabled": "Check-in disabled",
        "checkout-disabled": "Check-out disabled",
        "day-names-short": ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
        "day-names": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "month-names-short": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        "month-names": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        "error-more": "Date range should not be more than 1 night",
        "error-more-plural": "Date range should not be more than %d nights",
        "error-less": "Date range should not be less than 1 night",
        "error-less-plural": "Date range should not be less than %d nights",
        "not selected": "Not selected",
        "info-more": "Please select a date range of at least 1 night",
        "info-more-plural": "Please select a date range of at least %d nights",
        "info-range": "Please select a date range between %d and %d nights",
        "info-range-equal": "Please select a date range of %d nights",
        "info-default": "Please select a date range",
        "aria-application": "Calendar",
        "aria-selected-checkin": "Selected as check-in date, %s",
        "aria-selected-checkout": "Selected as check-out date, %s",
        "aria-selected": "Selected, %s",
        "aria-disabled": "Not available, %s",
        "aria-choose-checkin": "Choose %s as your check-in date",
        "aria-choose-checkout": "Choose %s as your check-out date",
        "aria-prev-month": "Move backward to switch to the previous month",
        "aria-next-month": "Move forward to switch to the next month",
        "aria-close-button": "Close the datepicker",
        "aria-clear-button": "Clear the selected dates",
        "aria-submit-button": "Submit the form"
      })
    }
  },
  emits: {
    select: ({ start: a, end: l }) => !0
  },
  setup(a, { emit: l }) {
    const n = a, y = (e) => {
      ae.value = e;
    }, u = () => {
      Ct({
        dayNamesShort: n.i18n["day-names-short"],
        dayNames: n.i18n["day-names"],
        monthNamesShort: n.i18n["month-names-short"],
        monthNames: n.i18n["month-names"]
      });
    }, S = l, N = d(!0);
    d(!1);
    const A = d(!1), $ = d(!1), ne = d(!1), L = d(!1), V = d(n.maxNights), v = d(n.minNights), f = d(n.startDate ?? !1), c = d(n.endDate ?? !1), ae = d(null), H = d(null);
    d([]);
    const g = d({}), I = d(0);
    d(null);
    const ue = d(null);
    d(n.onOpenDatepicker ?? n.onOpenDatepicker), A.value = !1, $.value = !1, ne.value = !1, L.value = !1;
    const O = d(n.startDate), x = d(n.endDate), D = d([]), Y = d({
      start: null,
      end: null
    }), i = d({
      months: [],
      open: !0,
      submitButton: !1,
      clearButton: !1,
      showSingleMonth: n.showSingleMonth
    }), fe = vt({
      error: !1,
      textContent: "",
      show: !1
    }), qe = () => {
      let e = [];
      if (n.startOfWeek === "monday") {
        for (let t = 0; t < 7; t++)
          e.push(me("day-names-short")[(1 + t) % 7]);
        return e;
      }
      for (let t = 0; t < 7; t++)
        e.push(me("day-names-short")[t]);
      return e;
    }, je = (e) => me("month-names")[e], R = (e) => {
      const t = new Date(e.valueOf());
      return new Date(t.setMonth(t.getMonth() + 1, 1));
    }, ce = (e) => {
      const t = new Date(e.valueOf());
      return new Date(t.setMonth(t.getMonth() - 1, 1));
    }, m = (e, t = null) => {
      let r = t ?? n.format;
      return u(), _(e, r);
    }, G = (e, t = null) => {
      let r = t ?? n.format;
      return u(), ze(e, r);
    }, Ge = () => {
      v.value = n.minNights > 1 ? n.minNights + 1 : 2, V.value = n.maxNights > 0 ? n.maxNights + 1 : 0, n.startDate && typeof n.startDate == "string" && (O.value = G(n.startDate)), n.endDate && typeof n.endDate == "string" && (x.value = G(x.value)), n.disabledDates.length > 0 && it(), n.disabledDaysOfWeek.length > 0 && ut(), O.value && x.value ? ht(O.value, x.value) : be(), ue.value && (N.value || !f.value && !c.value) && (i.value.clearButton = !0), I.value = 0, H.value = !1;
    }, F = (e, t) => {
      e = new Date(e);
      let r = {
        name: je(e.getMonth()),
        month: e.getMonth(),
        year: e.getFullYear(),
        id: e.getFullYear() + e.getMonth(),
        days: [],
        nextBtn: !0,
        prevBtn: !0
      };
      e.setHours(0, 0, 0, 0), r.days = Ke(e), i.value.months.splice(t - 1, 1, r), xe(), g.value["month" + t] = e;
    }, Ke = (e) => {
      const t = [], r = [];
      let s;
      e.setDate(1);
      let o = e.getDay();
      const p = e.getMonth();
      if (o === 0 && n.startOfWeek === "monday" && (o = 7), o > 0)
        for (let M = o; M > 0; M--) {
          const h = new Date(e.getTime() - 864e5 * M);
          s = re(h.getTime()), (n.minDate && b(h, n.minDate) < 0 || n.maxDate && b(h, n.maxDate) > 0) && (s = !1), t.push({
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
      for (let M = 0; M < 40; M++) {
        const h = K(e, M);
        s = re(h.getTime()), (n.minDate && b(h, n.minDate) < 0 || n.maxDate && b(h, n.maxDate) > 0) && (s = !1), t.push({
          date: h,
          type: h.getMonth() === p ? "visibleMonth" : "nextMonth",
          day: h.getDate(),
          time: h.getTime(),
          tabindex: 0,
          attributes: [],
          isCurrentMonth: h.getMonth() === p,
          isValid: s,
          isNoCheckIn: !1,
          isNoCheckOut: !1
        });
      }
      for (let M = 0; M < 6 && t[M * 7].type !== "nextMonth"; M++)
        for (let h = 0; h < 7; h++) {
          let w = n.startOfWeek === "monday" ? h + 1 : h;
          w = t[M * 7 + w], r.push(ye(w));
        }
      return r;
    }, ye = (e) => {
      const t = m(e.time) === m(/* @__PURE__ */ new Date()), r = m(e.time) === m(n.minDate), s = n.daysWithExtraText.indexOf(m(e.time)) > -1;
      let o = !1, p = !1, M = !1, h = !1, w = !1, He = !1;
      if (e.valid || e.type === "visibleMonth") {
        const ve = m(e.time, "YYYY-MM-DD");
        if (n.disabledDates.length > 0) {
          const B = Te(e.date);
          if (B[0] === !1 && (B[0] = Se(O.value, 1)), B[0] && B[1] && b(e.date, B[0]) && T(B[0], B[1]) - 2 > 0) {
            const De = T(B[1], e.date) - 1, mt = T(e.date, B[0]) - 1;
            (n.selectForward && De < v.value || !n.selectForward && De < v.value && mt < v.value) && (e.isValid = !1), !e.isValid && n.enableCheckout && De === 2 && (He = !0);
          }
          n.disabledDates.indexOf(ve) > -1 ? (e.isValid = !1, o = !0, I.value++, H.value = e.date) : I.value = 0, e.isValid && H.value && b(e.date, H.value) > 0 && T(e.date, H.value) === 2 && (w = !0);
        }
        n.disabledDaysOfWeek.length > 0 && n.disabledDaysOfWeek.indexOf(_(e.time, "dddd")) > -1 && (e.isValid = !1, h = !0), n.noCheckInDates.length > 0 && n.noCheckInDates.indexOf(ve) > -1 && (p = !0, w = !1), n.noCheckOutDates.length > 0 && n.noCheckOutDates.indexOf(ve) > -1 && (M = !0), n.noCheckInDaysOfWeek.length > 0 && n.noCheckInDaysOfWeek.indexOf(_(e.time, "dddd")) > -1 && (p = !0, w = !1), n.noCheckOutDaysOfWeek.length > 0 && n.noCheckOutDaysOfWeek.indexOf(_(e.time, "dddd")) > -1 && (M = !0);
      }
      return e.isToday = t, e.isDisabled = o, e.isCheckOutEnabled = o && n.enableCheckout && I.value === 1, e.isDayBeforeDisabledDate = He, e.isCheckInOnly = r || w, e.isNoCheckIn = p, e.isNoCheckOut = M, e.isDayOfWeekDisabled = h, e.isDayWithExtraText = s, e;
    }, Qe = () => {
      for (let e = 0; e < i.value.months.length; e++)
        for (let t = 0; t < i.value.months[e].days.length; t++) {
          const r = parseInt(i.value.months[e].days[t].time, 10), s = new Date(r);
          let o;
          o = re(s.getTime()), (n.minDate && b(s, n.minDate) < 0 || n.maxDate && b(s, n.maxDate) > 0) && (o = !1), i.value.months[e].days[t].isValid = o, i.value.months[e].days[t] = ye(i.value.months[e].days[t]);
        }
    }, be = () => {
      F(n.minDate, 1), F(R(n.minDate), 2), Q();
    }, Xe = (e, t, ...r) => {
      if (r.length > 0 && r[0] !== void 0 && r[0], e.getTime() > t.getTime()) {
        let o = t;
        t = e, e = o, o = null;
      }
      let s = !0;
      if ((n.minDate && b(e, n.minDate) < 0 || n.maxDate && b(t, n.maxDate) > 0) && (s = !1), !s) {
        be();
        return;
      }
      e.setTime(e.getTime() + 12 * 60 * 60 * 1e3), t.setTime(t.getTime() + 12 * 60 * 60 * 1e3), f.value = e.getTime(), c.value = t.getTime(), b(e, t) > 0 && le(e, t) === 0 && (t = R(e)), le(e, t) === 0 && (t = R(e)), F(e, 1), F(t, 2), se(), Q(), ke(), Ye();
    }, se = () => {
      if (!(!f.value && !c.value))
        for (let e = 0; e < i.value.months.length; e++)
          for (let t = 0; t < i.value.months[e].days.length; t++) {
            const r = i.value.months[e].days[t], s = parseInt(r.time, 10);
            f.value && c.value && c.value >= s && f.value <= s || f.value && !c.value && m(f.value, "YYYY-MM-DD") === m(s, "YYYY-MM-DD") ? r.isSelected = !0 : r.isSelected = !1, f.value && m(f.value, "YYYY-MM-DD") === m(s, "YYYY-MM-DD") ? r.isFirstDaySelected = !0 : r.isFirstDaySelected = !1, c.value && m(c.value, "YYYY-MM-DD") === m(s, "YYYY-MM-DD") ? r.isLastDaySelected = !0 : r.isLastDaySelected = !1, i.value.months[e].days[t] = Object.assign({}, r);
          }
    }, Ye = () => {
      if (!n.showTopbar) {
        if (f.value && c.value) {
          const e = m(new Date(f.value)) + n.separator + m(new Date(c.value));
          y(e, m(new Date(f.value)), m(new Date(c.value))), $.value = !0;
        }
        return;
      }
    }, et = (e, t) => {
      if (!e.isValid || !e.isCurrentMonth)
        return;
      const r = Y.value.start === null, s = parseInt(e.time, 10);
      if (!(Y.value.start && Y.value.start.time === e.time)) {
        if (r) {
          if (e.isNoCheckIn)
            return;
        } else if (f.value && (f.value > s && e.isNoCheckIn || Y.value.start && Y.value.start.isNoCheckIn && f.value > s || e.isNoCheckOut && s > f.value))
          return;
        if (r ? (Y.value.start = e, f.value = s, c.value = !1) : f.value && (Y.value.end = e, c.value = s, Ne()), f.value && c.value && f.value > c.value) {
          const o = c.value;
          c.value = f.value, f.value = o;
        }
        f.value = parseInt(f.value, 10), c.value = parseInt(c.value, 10), ot(), f.value && !c.value && Oe(e), xe(), ke(), Ye(), f.value && c.value && Qe(), se(), c.value && S("select", { start: f.value, end: c.value }), Y.value.end && tt();
      }
    }, tt = () => {
      Y.value.start = null, Y.value.end = null;
    }, re = (e) => {
      if (e = parseInt(e, 10), n.minDate && b(e, n.minDate) < 0 || n.maxDate && b(e, n.maxDate) > 0)
        return !1;
      if (f.value && !c.value) {
        if (V.value > 0 && T(e, f.value) > V.value || v.value > 0 && T(e, f.value) > 1 && T(e, f.value) < v.value || n.minNightsMultiple && (T(e, f.value) - 1) % 7 !== 0 || n.selectForward && e < f.value)
          return !1;
        if (n.disabledDates.length > 0) {
          const t = Te(new Date(parseInt(f.value, 10)));
          if (t[0] && b(e, t[0]) <= 0 || t[1] && b(e, t[1]) >= 0)
            return !1;
        }
        if (n.disabledDaysOfWeek.length > 0) {
          const t = ft(new Date(parseInt(f.value, 10)));
          if (t[0] && b(e, t[0]) <= 0 || t[1] && b(e, t[1]) >= 0)
            return !1;
        }
      }
      return !0;
    }, we = () => {
      for (let e = 0; e < i.value.months.length; e++)
        for (let t = 0; t < i.value.months[e].days.length; t++)
          i.value.months[e].days[t].selected = !1, i.value.months[e].days[t].isFirstDaySelected = !1, i.value.months[e].days[t].isLastDaySelected = !1;
      return !0;
    }, ke = () => {
      const e = T(c.value, f.value);
      if (V.value && e > V.value) {
        if (f.value = !1, c.value = !1, we(), n.showTopbar) {
          const t = V.value - 1;
          fe.value.error = t;
        }
      } else if (v.value && e < v.value) {
        if (f.value = !1, c.value = !1, we(), n.showTopbar) {
          const t = v.value - 1;
          topBarErrorText(bar, "error-less", t);
        }
      } else
        f.value || c.value, n.showTopbar && (fe.value.error = "");
    }, K = (e, t) => {
      const r = new Date(e);
      return r.setDate(r.getDate() + t), r;
    }, Se = (e, t) => {
      const r = new Date(e);
      return r.setDate(r.getDate() - t), r;
    }, T = (e, t) => Math.abs(Ce(e) - Ce(t)) + 1, b = (e, t) => {
      const r = parseInt(m(e, "YYYYMMDD"), 10) - parseInt(m(t, "YYYYMMDD"), 10);
      return r > 0 ? 1 : r === 0 ? 0 : -1;
    }, le = (e, t) => {
      const r = parseInt(m(e, "YYYYMM"), 10) - parseInt(m(t, "YYYYMM"), 10);
      return r > 0 ? 1 : r === 0 ? 0 : -1;
    }, Ce = (e) => Math.round(nt(e) / 864e5), nt = (e) => (typeof e == "object" && e.getTime && (e = e.getTime()), typeof e == "string" && !e.match(/\d{13}/) && (e = G(e).getTime()), e = parseInt(e, 10) - (/* @__PURE__ */ new Date()).getTimezoneOffset() * 60 * 1e3, e), at = (e, t) => {
      const r = t === 1;
      let s = r ? g.value.month2 : g.value.month1;
      return s = R(s), !oe() && !r && le(s, g.value.month2) >= 0 || J(s) ? !1 : (n.moveBothMonths && r && F(g.value.month2, 1), F(s, t + 1), se(), Q(), !0);
    }, st = (e, t) => {
      const r = t === 1;
      let s = r ? g.value.month2 : g.value.month1;
      return s = ce(s), r && le(s, g.value.month1) <= 0 || J(s) ? !1 : (n.moveBothMonths && !r && F(g.value.month1, 2), F(s, t + 1), se(), Q(), !0);
    }, he = d([]), oe = () => n.showSingleMonth || rt(), rt = () => n.singleMonthBreakpoint ? window.innerWidth < n.singleMonthBreakpoint : window.innerWidth < lt(), lt = () => he.value[0] ? 2 * he.value[0].offsetWidth + 50 : 0, J = (e) => {
      const t = new Date(e.valueOf());
      return n.minDate && new Date(t.getFullYear(), t.getMonth() + 1, 0, 23, 59, 59) < n.minDate || n.maxDate && new Date(t.getFullYear(), t.getMonth(), 1) > n.maxDate;
    }, Q = () => {
      if (oe()) {
        J(ce(g.value.month1)) ? i.value.months[0].prevBtn = !1 : i.value.months[0].prevBtn = !0, J(R(g.value.month1)) ? i.value.months[0].nextBtn = !1 : i.value.months[0].nextBtn = !0;
        return;
      }
      const e = parseInt(m(g.value.month1, "YYYYMM"), 10), t = parseInt(m(g.value.month2, "YYYYMM"), 10), r = Math.abs(e - t);
      r > 1 && r !== 89 ? (i.value.months[0].nextBtn = !0, i.value.months[1].prevBtn = !0) : (i.value.months[0].nextBtn = !1, i.value.months[1].prevBtn = !1), J(ce(g.value.month1)) ? i.value.months[0].prevBtn = !1 : i.value.months[0].prevBtn = !0, J(R(g.value.month2)) ? i.value.months[1].nextBtn = !1 : i.value.months[1].nextBtn = !0;
    }, xe = () => {
      const e = f.value && !c.value;
      for (let t = 0; t < i.value.months.length; t++)
        for (let r = 0; r < i.value.months[t].days.length; r++) {
          let s = i.value.months[t].days[r];
          if (!s.isValid && s.isTmp && (s.isTmp = !1, s.isTmpValid ? s.isValid = !0 : s.isTmpValid = !0), e) {
            if (s.isCurrentMonth && (s.isValid || s.isDisabled || s.isBeforeDisabledDate)) {
              const o = parseInt(s.time, 10);
              re(o) ? (s.isValid = !0, s.isTmp = !0, s.isDisabled = !1) : (s.valid || (s.isTmpValid = !1), s.isValid = !1, s.isTmp = !0);
            }
          } else
            (s.checkOutEnabled || s.beforeDisabledDate) && (s.isValid = !1, s.beforeDisabledDate || (s.isDisabled = !0));
          i.value.months[t].days.splice(r, 1, s);
        }
      return !0;
    }, Oe = (e, t) => {
      const r = parseInt(e.time, 10);
      if (e.isValid && Ie(e)) {
        for (let s = 0; s < i.value.months.length; s++)
          for (let o = 0; o < i.value.months[s].days.length; o++) {
            const p = parseInt(i.value.months[s].days[o].time, 10);
            p === r ? i.value.months[s].days[o].isHovering = !0 : i.value.months[s].days[o].isHovering = !1, f.value && !c.value && (f.value < p && r >= p || f.value > p && r <= p) ? i.value.months[s].days[o].isHovering = !0 : i.value.months[s].days[o].isHovering = !1;
          }
        f.value && !c.value && (C.count = T(r, f.value) - 1);
      }
    }, ot = () => {
      for (let e = 0; e < i.value.months.length; e++)
        for (let t = 0; t < i.value.months[e].days.length; t++)
          i.value.months[e].days[t].isHovering = !1;
    }, it = () => {
      const e = [];
      u();
      for (let t = 0; t < n.disabledDates.length; t++)
        e[t] = ze(n.disabledDates[t], "YYYY-MM-DD");
      e.sort((t, r) => t - r), D.value = e;
    }, Te = (e) => {
      let t = [!1, !1];
      if (e < D.value[0])
        n.enableCheckout ? t = [!1, K(D.value[0], 1)] : t = [!1, D.value[0]];
      else if (e > D.value[D.value.length - 1])
        t = [D.value[D.value.length - 1], !1];
      else {
        let r = D.value.length, s = D.value.length;
        const o = Math.abs(new Date(0, 0, 0).valueOf());
        let p = o, M = -o, h = 0, w;
        for (w = 0; w < D.value.length; ++w)
          h = e - D.value[w], h < 0 && h > M && (s = w, M = h), h > 0 && h < p && (r = w, p = h);
        D.value[r] && (t[0] = D.value[r]), typeof D.value[r] > "u" ? t[1] = !1 : n.enableCheckout ? t[1] = K(D.value[s], 1) : t[1] = D.value[s];
      }
      return t;
    }, de = d([]), ut = () => {
      const e = [], t = [], r = /* @__PURE__ */ new Date();
      for (let s = 0; s < 7; s++) {
        const o = K(r, s);
        e[_(o, "d")] = _(o, "dddd");
      }
      for (let s = 0; s < n.disabledDaysOfWeek.length; s++)
        t.push(e.indexOf(n.disabledDaysOfWeek[s]));
      t.sort(), de.value = t;
    }, ft = (e) => {
      const t = [!1, !1];
      for (let r = 0; r < 7; r++) {
        const s = Se(e, r);
        if (de.value.indexOf(parseInt(_(s, "d"), 10)) > -1) {
          t[0] = s;
          break;
        }
      }
      for (let r = 0; r < 7; r++) {
        const s = K(e, r);
        if (de.value.indexOf(parseInt(_(s, "d"), 10)) > -1) {
          t[1] = s;
          break;
        }
      }
      return t;
    }, me = (e) => e in n.i18n ? n.i18n[e] : "", ct = (e, t) => t ? e + "s" in n.i18n ? t + " " + n.i18n[e + "s"] : "" : n.i18n["not selected"], ht = (e, t) => {
      typeof e == "string" && typeof t == "string" ? (e = G(e), t = G(t)) : (e = new Date(e.getTime()), t = new Date(t.getTime())), Xe(e, t);
    }, C = Dt(
      {
        show: !1,
        top: 0,
        left: 0,
        width: 0,
        count: 0,
        error: !1
      }
    ), Ne = () => C.show = !1, Ie = (e) => !(!e.isValid || !e.isCurrentMonth), dt = (e, t) => {
      if (!Y.value.start || Y.value.start && Y.value.end || !Ie(t))
        return !1;
      C.show = !0;
      const r = Be.value.getBoundingClientRect(), s = e.target.getBoundingClientRect();
      C.top = s.top - r.top - 35, C.left = s.left - r.left, C.width = s.width;
    }, Be = d(null), Ve = () => {
      i.value.showSingleMonth = oe();
    };
    return gt(() => i.value.showSingleMonth, () => {
      Q();
    }), pt(() => {
      window.removeEventListener("resize", () => Ve());
    }), Mt(() => {
      i.value.showSingleMonth = oe(), window.addEventListener("resize", () => Ve()), Ge();
    }), (e, t) => (z(), Z("div", {
      class: "h-datepicker",
      ref_key: "parent",
      ref: Be
    }, [
      W("div", {
        class: X([{ "h-datepicker_invisible": !C.show }, "h-datepicker_popup"]),
        style: yt(
          { top: C.top + "px", left: C.left + "px", width: C.width + "px" }
        )
      }, [
        U(e.$slots, "popup", {
          nights: C.count
        }, () => [
          q(ee(ct("night", C.count)), 1)
        ], !0)
      ], 6),
      (z(!0), Z(ge, null, pe(i.value.months, (r, s) => (z(), Z("div", {
        key: r.id,
        ref_for: !0,
        ref_key: "monthsDoms",
        ref: he,
        class: X(["h-datepicker_month", {
          "h-datepicker_hidden": s === 1 && i.value.showSingleMonth,
          "h-datepicker_two_month_display": !i.value.showSingleMonth,
          "h-datepicker_one_month_display": i.value.showSingleMonth
        }])
      }, [
        W("div", Nt, [
          W("div", It, [
            W("div", {
              onClick: (o) => st(r, s),
              class: X(["month_control_btn", {
                "h-datepicker_invisible": !r.prevBtn
              }])
            }, [
              U(e.$slots, "prev", {}, () => [
                q(" <<")
              ], !0)
            ], 10, Bt)
          ]),
          W("div", Vt, [
            U(e.$slots, "month", { month: r }, () => [
              q(ee(r.name) + " " + ee(r.year), 1)
            ], !0)
          ]),
          W("div", Ht, [
            W("div", {
              onClick: (o) => at(r, s),
              class: X(["month_control_btn", {
                "h-datepicker_invisible": !r.nextBtn
              }])
            }, [
              U(e.$slots, "next", {}, () => [
                q(" >>")
              ], !0)
            ], 10, Ft)
          ])
        ]),
        W("div", Wt, [
          (z(!0), Z(ge, null, pe(qe(), (o) => (z(), Z("div", Pt, [
            U(e.$slots, "weekday", { weekday: o }, () => [
              q(ee(o), 1)
            ], !0)
          ]))), 256)),
          (z(!0), Z(ge, null, pe(r.days, (o) => (z(), Z("div", {
            onClick: (p) => et(o),
            onMouseout: t[0] || (t[0] = (p) => Ne()),
            onMouseover: (p) => Oe(o) || dt(p, o),
            class: X([{
              h_datepicker_notCurrentMonth: !o.isCurrentMonth,
              valid: o.isValid,
              invalid: !o.isValid,
              tmpinvalid: !o.isTmpValid,
              tmp: o.isTmpValid,
              h_datepicker_disabled: o.isDisabled,
              "checkout-enabled": o.isCheckOutEnabled,
              "checkout-disabled": !o.isCheckOutEnabled,
              "before-disabled-date": o.isDayBeforeDisabledDate,
              "first-day-selected": o.isFirstDaySelected,
              "last-day-selected": o.isLastDaySelected,
              selected: o.isSelected,
              hovering: o.isHovering
            }, "day"])
          }, [
            U(e.$slots, "day", { day: o }, () => [
              q(ee(o.day), 1)
            ], !0)
          ], 42, _t))), 256))
        ])
      ], 2))), 128))
    ], 512));
  }
}, $t = /* @__PURE__ */ Tt(Et, [["__scopeId", "data-v-9257c193"]]);
export {
  $t as V,
  Tt as _
};
