import { defineComponent as mt, ref as d, computed as vt, reactive as Dt, watch as gt, onUnmounted as pt, onMounted as Mt, openBlock as z, createElementBlock as Z, createElementVNode as W, normalizeClass as K, normalizeStyle as yt, renderSlot as Q, createTextVNode as X, toDisplayString as ee, Fragment as ge, renderList as pe } from "vue";
var $e = /d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g, _ = "\\d\\d?", P = "\\d\\d", bt = "\\d{3}", Yt = "\\d{4}", te = "[^\\s]+", ze = /\[([^]*?)\]/gm;
function Ze(a, o) {
  for (var n = [], M = 0, u = a.length; M < u; M++)
    n.push(a[M].substr(0, o));
  return n;
}
var He = function(a) {
  return function(o, n) {
    var M = n[a].map(function(S) {
      return S.toLowerCase();
    }), u = M.indexOf(o.toLowerCase());
    return u > -1 ? u : null;
  };
};
function U(a) {
  for (var o = [], n = 1; n < arguments.length; n++)
    o[n - 1] = arguments[n];
  for (var M = 0, u = o; M < u.length; M++) {
    var S = u[M];
    for (var N in S)
      a[N] = S[N];
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
], wt = Ze(Re, 3), kt = Ze(Le, 3), St = {
  dayNamesShort: kt,
  dayNames: Le,
  monthNamesShort: wt,
  monthNames: Re,
  amPm: ["am", "pm"],
  DoFn: function(a) {
    return a + ["th", "st", "nd", "rd"][a % 10 > 3 ? 0 : (a - a % 10 !== 10 ? 1 : 0) * a % 10];
  }
}, ie = U({}, St), Ct = function(a) {
  return ie = U(ie, a);
}, Ve = function(a) {
  return a.replace(/[|\\{()[^$+*?.-]/g, "\\$&");
}, k = function(a, o) {
  for (o === void 0 && (o = 2), a = String(a); a.length < o; )
    a = "0" + a;
  return a;
}, xt = {
  D: function(a) {
    return String(a.getDate());
  },
  DD: function(a) {
    return k(a.getDate());
  },
  Do: function(a, o) {
    return o.DoFn(a.getDate());
  },
  d: function(a) {
    return String(a.getDay());
  },
  dd: function(a) {
    return k(a.getDay());
  },
  ddd: function(a, o) {
    return o.dayNamesShort[a.getDay()];
  },
  dddd: function(a, o) {
    return o.dayNames[a.getDay()];
  },
  M: function(a) {
    return String(a.getMonth() + 1);
  },
  MM: function(a) {
    return k(a.getMonth() + 1);
  },
  MMM: function(a, o) {
    return o.monthNamesShort[a.getMonth()];
  },
  MMMM: function(a, o) {
    return o.monthNames[a.getMonth()];
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
  a: function(a, o) {
    return a.getHours() < 12 ? o.amPm[0] : o.amPm[1];
  },
  A: function(a, o) {
    return a.getHours() < 12 ? o.amPm[0].toUpperCase() : o.amPm[1].toUpperCase();
  },
  ZZ: function(a) {
    var o = a.getTimezoneOffset();
    return (o > 0 ? "-" : "+") + k(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4);
  },
  Z: function(a) {
    var o = a.getTimezoneOffset();
    return (o > 0 ? "-" : "+") + k(Math.floor(Math.abs(o) / 60), 2) + ":" + k(Math.abs(o) % 60, 2);
  }
}, Fe = function(a) {
  return +a - 1;
}, We = [null, _], Pe = [null, te], Ee = [
  "isPm",
  te,
  function(a, o) {
    var n = a.toLowerCase();
    return n === o.amPm[0] ? 0 : n === o.amPm[1] ? 1 : null;
  }
], _e = [
  "timezoneOffset",
  "[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",
  function(a) {
    var o = (a + "").match(/([+-]|\d\d)/gi);
    if (o) {
      var n = +o[1] * 60 + parseInt(o[2], 10);
      return o[0] === "+" ? n : -n;
    }
    return 0;
  }
], Ot = {
  D: ["day", _],
  DD: ["day", P],
  Do: ["day", _ + te, function(a) {
    return parseInt(a, 10);
  }],
  M: ["month", _, Fe],
  MM: ["month", P, Fe],
  YY: [
    "year",
    P,
    function(a) {
      var o = /* @__PURE__ */ new Date(), n = +("" + o.getFullYear()).substr(0, 2);
      return +("" + (+a > 68 ? n - 1 : n) + a);
    }
  ],
  h: ["hour", _, void 0, "isPm"],
  hh: ["hour", P, void 0, "isPm"],
  H: ["hour", _],
  HH: ["hour", P],
  m: ["minute", _],
  mm: ["minute", P],
  s: ["second", _],
  ss: ["second", P],
  YYYY: ["year", Yt],
  S: ["millisecond", "\\d", function(a) {
    return +a * 100;
  }],
  SS: ["millisecond", P, function(a) {
    return +a * 10;
  }],
  SSS: ["millisecond", bt],
  d: We,
  dd: We,
  ddd: Pe,
  dddd: Pe,
  MMM: ["month", te, He("monthNamesShort")],
  MMMM: ["month", te, He("monthNames")],
  a: Ee,
  A: Ee,
  ZZ: _e,
  Z: _e
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
}, E = function(a, o, n) {
  if (o === void 0 && (o = Me.default), n === void 0 && (n = {}), typeof a == "number" && (a = new Date(a)), Object.prototype.toString.call(a) !== "[object Date]" || isNaN(a.getTime()))
    throw new Error("Invalid Date pass to format");
  o = Me[o] || o;
  var M = [];
  o = o.replace(ze, function(S, N) {
    return M.push(N), "@@@";
  });
  var u = U(U({}, ie), n);
  return o = o.replace($e, function(S) {
    return xt[S](a, u);
  }), o.replace(/@@@/g, function() {
    return M.shift();
  });
};
function Ae(a, o, n) {
  if (n === void 0 && (n = {}), typeof o != "string")
    throw new Error("Invalid format in fecha parse");
  if (o = Me[o] || o, a.length > 1e3)
    return null;
  var M = /* @__PURE__ */ new Date(), u = {
    year: M.getFullYear(),
    month: 0,
    day: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
    isPm: null,
    timezoneOffset: null
  }, S = [], N = [], A = o.replace(ze, function(O, x) {
    return N.push(Ve(x)), "@@@";
  }), $ = {}, ne = {};
  A = Ve(A).replace($e, function(O) {
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
  for (var H = U(U({}, ie), n), v = 1; v < L.length; v++) {
    var f = S[v - 1], c = f[0], ae = f[2], V = ae ? ae(L[v], H) : +L[v];
    if (V == null)
      return null;
    u[c] = V;
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
const Tt = { class: "month_control_panel" }, Nt = { class: "month_control_item" }, It = ["onClick"], Bt = { class: "month_control_item" }, Ht = { class: "month_control_item" }, Vt = ["onClick"], Ft = { class: "month_box" }, Wt = { class: "week_name" }, Pt = ["onClick", "onMouseover"], Et = /* @__PURE__ */ mt({
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
    selectedDates: !1,
    startDate: !1,
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
    select: (a) => !0
  },
  setup(a, { emit: o }) {
    const n = a, M = (e) => {
      ae.value = e;
    }, u = () => {
      Ct({
        dayNamesShort: n.i18n["day-names-short"],
        dayNames: n.i18n["day-names"],
        monthNamesShort: n.i18n["month-names-short"],
        monthNames: n.i18n["month-names"]
      });
    }, S = o, N = d(!0);
    d(!1);
    const A = d(!1), $ = d(!1), ne = d(!1), L = d(!1), H = d(n.maxNights), v = d(n.minNights), f = d(n.startDate ?? !1), c = d(n.endDate ?? !1), ae = d(null), V = d(null);
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
    }), Je = () => {
      let e = [];
      if (n.startOfWeek === "monday") {
        for (let t = 0; t < 7; t++)
          e.push(me("day-names-short")[(1 + t) % 7]);
        return e;
      }
      for (let t = 0; t < 7; t++)
        e.push(me("day-names-short")[t]);
      return e;
    }, Ue = (e) => me("month-names")[e], R = (e) => {
      const t = new Date(e.valueOf());
      return new Date(t.setMonth(t.getMonth() + 1, 1));
    }, ce = (e) => {
      const t = new Date(e.valueOf());
      return new Date(t.setMonth(t.getMonth() - 1, 1));
    }, m = (e, t = null) => {
      let l = t ?? n.format;
      return u(), E(e, l);
    }, q = (e, t = null) => {
      let l = t ?? n.format;
      return u(), Ae(e, l);
    }, qe = () => {
      v.value = n.minNights > 1 ? n.minNights + 1 : 2, H.value = n.maxNights > 0 ? n.maxNights + 1 : 0, n.startDate && typeof n.startDate == "string" && (O.value = q(n.startDate)), n.endDate && typeof n.endDate == "string" && (x.value = q(x.value)), n.disabledDates.length > 0 && ot(), n.disabledDaysOfWeek.length > 0 && rt(), O.value && x.value ? ft(O.value, x.value) : be(), ue.value && (N.value || !f.value && !c.value) && (i.value.clearButton = !0), I.value = 0, V.value = !1;
    }, F = (e, t) => {
      e = new Date(e);
      let l = {
        name: Ue(e.getMonth()),
        month: e.getMonth(),
        year: e.getFullYear(),
        id: e.getFullYear() + e.getMonth(),
        days: [],
        nextBtn: !0,
        prevBtn: !0
      };
      e.setHours(0, 0, 0, 0), l.days = je(e), i.value.months.splice(t - 1, 1, l), xe(), g.value["month" + t] = e;
    }, je = (e) => {
      const t = [], l = [];
      let s;
      e.setDate(1);
      let r = e.getDay();
      const y = e.getMonth();
      if (r === 0 && n.startOfWeek === "monday" && (r = 7), r > 0)
        for (let p = r; p > 0; p--) {
          const h = new Date(e.getTime() - 864e5 * p);
          s = le(h.getTime()), (n.minDate && b(h, n.minDate) < 0 || n.maxDate && b(h, n.maxDate) > 0) && (s = !1), t.push({
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
        const h = j(e, p);
        s = le(h.getTime()), (n.minDate && b(h, n.minDate) < 0 || n.maxDate && b(h, n.maxDate) > 0) && (s = !1), t.push({
          date: h,
          type: h.getMonth() === y ? "visibleMonth" : "nextMonth",
          day: h.getDate(),
          time: h.getTime(),
          tabindex: 0,
          attributes: [],
          isCurrentMonth: h.getMonth() === y,
          isValid: s,
          isNoCheckIn: !1,
          isNoCheckOut: !1
        });
      }
      for (let p = 0; p < 6 && t[p * 7].type !== "nextMonth"; p++)
        for (let h = 0; h < 7; h++) {
          let w = n.startOfWeek === "monday" ? h + 1 : h;
          w = t[p * 7 + w], l.push(ye(w));
        }
      return l;
    }, ye = (e) => {
      const t = m(e.time) === m(/* @__PURE__ */ new Date()), l = m(e.time) === m(n.minDate), s = n.daysWithExtraText.indexOf(m(e.time)) > -1;
      let r = !1, y = !1, p = !1, h = !1, w = !1, Be = !1;
      if (e.valid || e.type === "visibleMonth") {
        const ve = m(e.time, "YYYY-MM-DD");
        if (n.disabledDates.length > 0) {
          const B = Te(e.date);
          if (B[0] === !1 && (B[0] = Se(O.value, 1)), B[0] && B[1] && b(e.date, B[0]) && T(B[0], B[1]) - 2 > 0) {
            const De = T(B[1], e.date) - 1, dt = T(e.date, B[0]) - 1;
            (n.selectForward && De < v.value || !n.selectForward && De < v.value && dt < v.value) && (e.isValid = !1), !e.isValid && n.enableCheckout && De === 2 && (Be = !0);
          }
          n.disabledDates.indexOf(ve) > -1 ? (e.isValid = !1, r = !0, I.value++, V.value = e.date) : I.value = 0, e.isValid && V.value && b(e.date, V.value) > 0 && T(e.date, V.value) === 2 && (w = !0);
        }
        n.disabledDaysOfWeek.length > 0 && n.disabledDaysOfWeek.indexOf(E(e.time, "dddd")) > -1 && (e.isValid = !1, h = !0), n.noCheckInDates.length > 0 && n.noCheckInDates.indexOf(ve) > -1 && (y = !0, w = !1), n.noCheckOutDates.length > 0 && n.noCheckOutDates.indexOf(ve) > -1 && (p = !0), n.noCheckInDaysOfWeek.length > 0 && n.noCheckInDaysOfWeek.indexOf(E(e.time, "dddd")) > -1 && (y = !0, w = !1), n.noCheckOutDaysOfWeek.length > 0 && n.noCheckOutDaysOfWeek.indexOf(E(e.time, "dddd")) > -1 && (p = !0);
      }
      return e.isToday = t, e.isDisabled = r, e.isCheckOutEnabled = r && n.enableCheckout && I.value === 1, e.isDayBeforeDisabledDate = Be, e.isCheckInOnly = l || w, e.isNoCheckIn = y, e.isNoCheckOut = p, e.isDayOfWeekDisabled = h, e.isDayWithExtraText = s, e;
    }, Ge = () => {
      for (let e = 0; e < i.value.months.length; e++)
        for (let t = 0; t < i.value.months[e].days.length; t++) {
          const l = parseInt(i.value.months[e].days[t].time, 10), s = new Date(l);
          let r;
          r = le(s.getTime()), (n.minDate && b(s, n.minDate) < 0 || n.maxDate && b(s, n.maxDate) > 0) && (r = !1), i.value.months[e].days[t].isValid = r, i.value.months[e].days[t] = ye(i.value.months[e].days[t]);
        }
    }, be = () => {
      F(n.minDate, 1), F(R(n.minDate), 2), G();
    }, Ke = (e, t, ...l) => {
      if (l.length > 0 && l[0] !== void 0 && l[0], e.getTime() > t.getTime()) {
        let r = t;
        t = e, e = r, r = null;
      }
      let s = !0;
      if ((n.minDate && b(e, n.minDate) < 0 || n.maxDate && b(t, n.maxDate) > 0) && (s = !1), !s) {
        be();
        return;
      }
      e.setTime(e.getTime() + 12 * 60 * 60 * 1e3), t.setTime(t.getTime() + 12 * 60 * 60 * 1e3), f.value = e.getTime(), c.value = t.getTime(), b(e, t) > 0 && oe(e, t) === 0 && (t = R(e)), oe(e, t) === 0 && (t = R(e)), F(e, 1), F(t, 2), se(), G(), ke(), Ye();
    }, se = () => {
      if (!(!f.value && !c.value))
        for (let e = 0; e < i.value.months.length; e++)
          for (let t = 0; t < i.value.months[e].days.length; t++) {
            const l = i.value.months[e].days[t], s = parseInt(l.time, 10);
            f.value && c.value && c.value >= s && f.value <= s || f.value && !c.value && m(f.value, "YYYY-MM-DD") === m(s, "YYYY-MM-DD") ? l.isSelected = !0 : l.isSelected = !1, f.value && m(f.value, "YYYY-MM-DD") === m(s, "YYYY-MM-DD") ? l.isFirstDaySelected = !0 : l.isFirstDaySelected = !1, c.value && m(c.value, "YYYY-MM-DD") === m(s, "YYYY-MM-DD") ? l.isLastDaySelected = !0 : l.isLastDaySelected = !1, i.value.months[e].days[t] = Object.assign({}, l);
          }
    }, Ye = () => {
      if (!n.showTopbar) {
        if (f.value && c.value) {
          const e = m(new Date(f.value)) + n.separator + m(new Date(c.value));
          M(e, m(new Date(f.value)), m(new Date(c.value))), $.value = !0;
        }
        return;
      }
    }, Qe = (e, t) => {
      if (!e.isValid)
        return;
      const l = Y.value.start === null, s = parseInt(e.time, 10);
      if (!(Y.value.start && Y.value.start.day === e.day)) {
        if (l) {
          if (e.isNoCheckIn)
            return;
        } else if (f.value && (f.value > s && e.isNoCheckIn || Y.value.start && Y.value.start.isNoCheckIn && f.value > s || e.isNoCheckOut && s > f.value))
          return;
        if (l ? (Y.value.start = e, f.value = s, c.value = !1) : f.value && (Y.value.end = e, c.value = s, ct()), f.value && c.value && f.value > c.value) {
          const r = c.value;
          c.value = f.value, f.value = r;
        }
        f.value = parseInt(f.value, 10), c.value = parseInt(c.value, 10), lt(), f.value && !c.value && Oe(e), xe(), ke(), Ye(), f.value && c.value && Ge(), se(), c.value && S("select", { start: f.value, end: c.value }), Y.value.end && Xe();
      }
    }, Xe = () => {
      Y.value.start = null, Y.value.end = null;
    }, le = (e) => {
      if (e = parseInt(e, 10), n.minDate && b(e, n.minDate) < 0 || n.maxDate && b(e, n.maxDate) > 0)
        return !1;
      if (f.value && !c.value) {
        if (H.value > 0 && T(e, f.value) > H.value || v.value > 0 && T(e, f.value) > 1 && T(e, f.value) < v.value || n.minNightsMultiple && (T(e, f.value) - 1) % 7 !== 0 || n.selectForward && e < f.value)
          return !1;
        if (n.disabledDates.length > 0) {
          const t = Te(new Date(parseInt(f.value, 10)));
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
    }, we = () => {
      for (let e = 0; e < i.value.months.length; e++)
        for (let t = 0; t < i.value.months[e].days.length; t++)
          i.value.months[e].days[t].selected = !1, i.value.months[e].days[t].isFirstDaySelected = !1, i.value.months[e].days[t].isLastDaySelected = !1;
      return !0;
    }, ke = () => {
      const e = T(c.value, f.value);
      if (H.value && e > H.value) {
        if (f.value = !1, c.value = !1, we(), n.showTopbar) {
          const t = H.value - 1;
          fe.value.error = t;
        }
      } else if (v.value && e < v.value) {
        if (f.value = !1, c.value = !1, we(), n.showTopbar) {
          const t = v.value - 1;
          topBarErrorText(bar, "error-less", t);
        }
      } else
        f.value || c.value, n.showTopbar && (fe.value.error = "");
    }, j = (e, t) => {
      const l = new Date(e);
      return l.setDate(l.getDate() + t), l;
    }, Se = (e, t) => {
      const l = new Date(e);
      return l.setDate(l.getDate() - t), l;
    }, T = (e, t) => Math.abs(Ce(e) - Ce(t)) + 1, b = (e, t) => {
      const l = parseInt(m(e, "YYYYMMDD"), 10) - parseInt(m(t, "YYYYMMDD"), 10);
      return l > 0 ? 1 : l === 0 ? 0 : -1;
    }, oe = (e, t) => {
      const l = parseInt(m(e, "YYYYMM"), 10) - parseInt(m(t, "YYYYMM"), 10);
      return l > 0 ? 1 : l === 0 ? 0 : -1;
    }, Ce = (e) => Math.round(et(e) / 864e5), et = (e) => (typeof e == "object" && e.getTime && (e = e.getTime()), typeof e == "string" && !e.match(/\d{13}/) && (e = q(e).getTime()), e = parseInt(e, 10) - (/* @__PURE__ */ new Date()).getTimezoneOffset() * 60 * 1e3, e), tt = (e, t) => {
      const l = t === 1;
      let s = l ? g.value.month2 : g.value.month1;
      return s = R(s), !re() && !l && oe(s, g.value.month2) >= 0 || J(s) ? !1 : (n.moveBothMonths && l && F(g.value.month2, 1), F(s, t + 1), se(), G(), !0);
    }, nt = (e, t) => {
      const l = t === 1;
      let s = l ? g.value.month2 : g.value.month1;
      return s = ce(s), l && oe(s, g.value.month1) <= 0 || J(s) ? !1 : (n.moveBothMonths && !l && F(g.value.month1, 2), F(s, t + 1), se(), G(), !0);
    }, he = d([]), re = () => n.showSingleMonth || at(), at = () => n.singleMonthBreakpoint ? window.innerWidth < n.singleMonthBreakpoint : window.innerWidth < st(), st = () => he.value[0] ? 2 * he.value[0].offsetWidth + 50 : 0, J = (e) => {
      const t = new Date(e.valueOf());
      return n.minDate && new Date(t.getFullYear(), t.getMonth() + 1, 0, 23, 59, 59) < n.minDate || n.maxDate && new Date(t.getFullYear(), t.getMonth(), 1) > n.maxDate;
    }, G = () => {
      if (re()) {
        J(ce(g.value.month1)) ? i.value.months[0].prevBtn = !1 : i.value.months[0].prevBtn = !0, J(R(g.value.month1)) ? i.value.months[0].nextBtn = !1 : i.value.months[0].nextBtn = !0;
        return;
      }
      const e = parseInt(m(g.value.month1, "YYYYMM"), 10), t = parseInt(m(g.value.month2, "YYYYMM"), 10), l = Math.abs(e - t);
      l > 1 && l !== 89 ? (i.value.months[0].nextBtn = !0, i.value.months[1].prevBtn = !0) : (i.value.months[0].nextBtn = !1, i.value.months[1].prevBtn = !1), J(ce(g.value.month1)) ? i.value.months[0].prevBtn = !1 : i.value.months[0].prevBtn = !0, J(R(g.value.month2)) ? i.value.months[1].nextBtn = !1 : i.value.months[1].nextBtn = !0;
    }, xe = () => {
      const e = f.value && !c.value;
      for (let t = 0; t < i.value.months.length; t++)
        for (let l = 0; l < i.value.months[t].days.length; l++) {
          let s = i.value.months[t].days[l];
          if (!s.isValid && s.isTmp && (s.isTmp = !1, s.isTmpValid ? s.isValid = !0 : s.isTmpValid = !0), e) {
            if (s.isCurrentMonth && (s.isValid || s.isDisabled || s.isBeforeDisabledDate)) {
              const r = parseInt(s.time, 10);
              le(r) ? (s.isValid = !0, s.isTmp = !0, s.isDisabled = !1) : (s.valid || (s.isTmpValid = !1), s.isValid = !1, s.isTmp = !0);
            }
          } else
            (s.checkOutEnabled || s.beforeDisabledDate) && (s.isValid = !1, s.beforeDisabledDate || (s.isDisabled = !0));
          i.value.months[t].days.splice(l, 1, s);
        }
      return !0;
    }, Oe = (e, t) => {
      const l = parseInt(e.time, 10);
      if (e.isValid) {
        for (let s = 0; s < i.value.months.length; s++)
          for (let r = 0; r < i.value.months[s].days.length; r++) {
            const y = parseInt(i.value.months[s].days[r].time, 10);
            y === l ? i.value.months[s].days[r].isHovering = !0 : i.value.months[s].days[r].isHovering = !1, f.value && !c.value && (f.value < y && l >= y || f.value > y && l <= y) ? i.value.months[s].days[r].isHovering = !0 : i.value.months[s].days[r].isHovering = !1;
          }
        f.value && !c.value && (C.count = T(l, f.value) - 1);
      }
    }, lt = () => {
      for (let e = 0; e < i.value.months.length; e++)
        for (let t = 0; t < i.value.months[e].days.length; t++)
          i.value.months[e].days[t].isHovering = !1;
    }, ot = () => {
      const e = [];
      u();
      for (let t = 0; t < n.disabledDates.length; t++)
        e[t] = Ae(n.disabledDates[t], "YYYY-MM-DD");
      e.sort((t, l) => t - l), D.value = e;
    }, Te = (e) => {
      let t = [!1, !1];
      if (e < D.value[0])
        n.enableCheckout ? t = [!1, j(D.value[0], 1)] : t = [!1, D.value[0]];
      else if (e > D.value[D.value.length - 1])
        t = [D.value[D.value.length - 1], !1];
      else {
        let l = D.value.length, s = D.value.length;
        const r = Math.abs(new Date(0, 0, 0).valueOf());
        let y = r, p = -r, h = 0, w;
        for (w = 0; w < D.value.length; ++w)
          h = e - D.value[w], h < 0 && h > p && (s = w, p = h), h > 0 && h < y && (l = w, y = h);
        D.value[l] && (t[0] = D.value[l]), typeof D.value[l] > "u" ? t[1] = !1 : n.enableCheckout ? t[1] = j(D.value[s], 1) : t[1] = D.value[s];
      }
      return t;
    }, de = d([]), rt = () => {
      const e = [], t = [], l = /* @__PURE__ */ new Date();
      for (let s = 0; s < 7; s++) {
        const r = j(l, s);
        e[E(r, "d")] = E(r, "dddd");
      }
      for (let s = 0; s < n.disabledDaysOfWeek.length; s++)
        t.push(e.indexOf(n.disabledDaysOfWeek[s]));
      t.sort(), de.value = t;
    }, it = (e) => {
      const t = [!1, !1];
      for (let l = 0; l < 7; l++) {
        const s = Se(e, l);
        if (de.value.indexOf(parseInt(E(s, "d"), 10)) > -1) {
          t[0] = s;
          break;
        }
      }
      for (let l = 0; l < 7; l++) {
        const s = j(e, l);
        if (de.value.indexOf(parseInt(E(s, "d"), 10)) > -1) {
          t[1] = s;
          break;
        }
      }
      return t;
    }, me = (e) => e in n.i18n ? n.i18n[e] : "", ut = (e, t) => t ? e + "s" in n.i18n ? t + " " + n.i18n[e + "s"] : "" : n.i18n["not selected"], ft = (e, t) => {
      typeof e == "string" && typeof t == "string" ? (e = q(e), t = q(t)) : (e = new Date(e.getTime()), t = new Date(t.getTime())), Ke(e, t);
    }, C = Dt(
      {
        show: !1,
        top: 0,
        left: 0,
        width: 0,
        count: 0,
        error: !1
      }
    ), ct = () => C.show = !1, ht = (e, t) => {
      if (!Y.value.start || Y.value.start && Y.value.end)
        return !1;
      C.show = !0;
      const l = Ne.value.getBoundingClientRect(), s = e.target.getBoundingClientRect();
      C.top = s.top - l.top - 35, C.left = s.left - l.left, C.width = s.width;
    }, Ne = d(null), Ie = () => {
      i.value.showSingleMonth = re();
    };
    return gt(() => i.value.showSingleMonth, () => {
      G();
    }), pt(() => {
      window.removeEventListener("resize", () => Ie());
    }), Mt(() => {
      i.value.showSingleMonth = re(), window.addEventListener("resize", () => Ie()), qe();
    }), (e, t) => (z(), Z("div", {
      class: "h-datepicker",
      ref_key: "parent",
      ref: Ne
    }, [
      W("div", {
        class: K([{ invisible: !C.show }, "popup"]),
        style: yt(
          { top: C.top + "px", left: C.left + "px", width: C.width + "px" }
        )
      }, [
        Q(e.$slots, "popup", {
          nights: C.count
        }, () => [
          X(ee(ut("night", C.count)), 1)
        ], !0)
      ], 6),
      (z(!0), Z(ge, null, pe(i.value.months, (l, s) => (z(), Z("div", {
        key: l.id,
        ref_for: !0,
        ref_key: "monthsDoms",
        ref: he,
        class: K(["month", {
          invisible: s === 1 && i.value.showSingleMonth,
          two_month_display: !i.value.showSingleMonth,
          one_month_display: i.value.showSingleMonth
        }])
      }, [
        W("div", Tt, [
          W("div", Nt, [
            W("div", {
              onClick: (r) => nt(l, s),
              class: K(["month_control_btn", {
                invisible: !l.prevBtn
              }])
            }, [
              Q(e.$slots, "prev", {}, () => [
                X(" <<")
              ], !0)
            ], 10, It)
          ]),
          W("div", Bt, [
            Q(e.$slots, "month", { month: l }, () => [
              X(ee(l.name) + " " + ee(l.year), 1)
            ], !0)
          ]),
          W("div", Ht, [
            W("div", {
              onClick: (r) => tt(l, s),
              class: K(["month_control_btn", {
                invisible: !l.nextBtn
              }])
            }, [
              Q(e.$slots, "next", {}, () => [
                X(" >>")
              ], !0)
            ], 10, Vt)
          ])
        ]),
        W("div", Ft, [
          (z(!0), Z(ge, null, pe(Je(), (r) => (z(), Z("div", Wt, [
            Q(e.$slots, "weekday", { weekday: r }, () => [
              X(ee(r), 1)
            ], !0)
          ]))), 256)),
          (z(!0), Z(ge, null, pe(l.days, (r) => (z(), Z("div", {
            onClick: (y) => Qe(r),
            onMouseover: (y) => Oe(r) || ht(y),
            class: K([{
              notCurrentMonth: !r.isCurrentMonth,
              valid: r.isValid,
              invalid: !r.isValid,
              tmpinvalid: !r.isTmpValid,
              tmp: r.isTmpValid,
              disabled: r.isDisabled,
              "checkout-enabled": r.isCheckOutEnabled,
              "checkout-disabled": !r.isCheckOutEnabled,
              "before-disabled-date": r.isDayBeforeDisabledDate,
              "first-day-selected": r.isFirstDaySelected,
              "last-day-selected": r.isLastDaySelected,
              selected: r.isSelected,
              hovering: r.isHovering
            }, "day"])
          }, ee(r.day), 43, Pt))), 256))
        ])
      ], 2))), 128))
    ], 512));
  }
}), _t = (a, o) => {
  const n = a.__vccOpts || a;
  for (const [M, u] of o)
    n[M] = u;
  return n;
}, $t = /* @__PURE__ */ _t(Et, [["__scopeId", "data-v-b4735eb7"]]);
export {
  $t as HotelDatePicker
};
