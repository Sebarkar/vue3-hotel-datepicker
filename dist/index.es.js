import { Fragment as e, computed as t, createCommentVNode as n, createElementBlock as r, createElementVNode as i, createTextVNode as a, defineComponent as o, getCurrentInstance as s, nextTick as c, normalizeClass as l, normalizeStyle as u, onBeforeUpdate as d, onMounted as ee, onUnmounted as te, openBlock as f, ref as p, renderList as m, renderSlot as h, toDisplayString as g, watch as ne } from "vue";
//#region node_modules/fecha/lib/fecha.js
var re = /d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g, _ = "\\d\\d?", v = "\\d\\d", y = "\\d{3}", b = "\\d{4}", x = "[^\\s]+", S = /\[([^]*?)\]/gm;
function C(e, t) {
	for (var n = [], r = 0, i = e.length; r < i; r++) n.push(e[r].substr(0, t));
	return n;
}
var w = function(e) {
	return function(t, n) {
		var r = n[e].map(function(e) {
			return e.toLowerCase();
		}).indexOf(t.toLowerCase());
		return r > -1 ? r : null;
	};
};
function T(e) {
	for (var t = [...arguments].slice(1), n = 0, r = t; n < r.length; n++) {
		var i = r[n];
		for (var a in i) e[a] = i[a];
	}
	return e;
}
var E = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
], D = [
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
], O = C(D, 3), k = T({}, {
	dayNamesShort: C(E, 3),
	dayNames: E,
	monthNamesShort: O,
	monthNames: D,
	amPm: ["am", "pm"],
	DoFn: function(e) {
		return e + [
			"th",
			"st",
			"nd",
			"rd"
		][e % 10 > 3 ? 0 : (e - e % 10 == 10 ? 0 : 1) * e % 10];
	}
}), A = function(e) {
	return e.replace(/[|\\{()[^$+*?.-]/g, "\\$&");
}, j = function(e, t) {
	for (t === void 0 && (t = 2), e = String(e); e.length < t;) e = "0" + e;
	return e;
}, ie = {
	D: function(e) {
		return String(e.getDate());
	},
	DD: function(e) {
		return j(e.getDate());
	},
	Do: function(e, t) {
		return t.DoFn(e.getDate());
	},
	d: function(e) {
		return String(e.getDay());
	},
	dd: function(e) {
		return j(e.getDay());
	},
	ddd: function(e, t) {
		return t.dayNamesShort[e.getDay()];
	},
	dddd: function(e, t) {
		return t.dayNames[e.getDay()];
	},
	M: function(e) {
		return String(e.getMonth() + 1);
	},
	MM: function(e) {
		return j(e.getMonth() + 1);
	},
	MMM: function(e, t) {
		return t.monthNamesShort[e.getMonth()];
	},
	MMMM: function(e, t) {
		return t.monthNames[e.getMonth()];
	},
	YY: function(e) {
		return j(String(e.getFullYear()), 4).substr(2);
	},
	YYYY: function(e) {
		return j(e.getFullYear(), 4);
	},
	h: function(e) {
		return String(e.getHours() % 12 || 12);
	},
	hh: function(e) {
		return j(e.getHours() % 12 || 12);
	},
	H: function(e) {
		return String(e.getHours());
	},
	HH: function(e) {
		return j(e.getHours());
	},
	m: function(e) {
		return String(e.getMinutes());
	},
	mm: function(e) {
		return j(e.getMinutes());
	},
	s: function(e) {
		return String(e.getSeconds());
	},
	ss: function(e) {
		return j(e.getSeconds());
	},
	S: function(e) {
		return String(Math.round(e.getMilliseconds() / 100));
	},
	SS: function(e) {
		return j(Math.round(e.getMilliseconds() / 10), 2);
	},
	SSS: function(e) {
		return j(e.getMilliseconds(), 3);
	},
	a: function(e, t) {
		return e.getHours() < 12 ? t.amPm[0] : t.amPm[1];
	},
	A: function(e, t) {
		return e.getHours() < 12 ? t.amPm[0].toUpperCase() : t.amPm[1].toUpperCase();
	},
	ZZ: function(e) {
		var t = e.getTimezoneOffset();
		return (t > 0 ? "-" : "+") + j(Math.floor(Math.abs(t) / 60) * 100 + Math.abs(t) % 60, 4);
	},
	Z: function(e) {
		var t = e.getTimezoneOffset();
		return (t > 0 ? "-" : "+") + j(Math.floor(Math.abs(t) / 60), 2) + ":" + j(Math.abs(t) % 60, 2);
	}
}, M = function(e) {
	return e - 1;
}, N = [null, _], P = [null, x], ae = [
	"isPm",
	x,
	function(e, t) {
		var n = e.toLowerCase();
		return n === t.amPm[0] ? 0 : n === t.amPm[1] ? 1 : null;
	}
], oe = [
	"timezoneOffset",
	"[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",
	function(e) {
		var t = (e + "").match(/([+-]|\d\d)/gi);
		if (t) {
			var n = t[1] * 60 + parseInt(t[2], 10);
			return t[0] === "+" ? n : -n;
		}
		return 0;
	}
], se = {
	D: ["day", _],
	DD: ["day", v],
	Do: [
		"day",
		_ + x,
		function(e) {
			return parseInt(e, 10);
		}
	],
	M: [
		"month",
		_,
		M
	],
	MM: [
		"month",
		v,
		M
	],
	YY: [
		"year",
		v,
		function(e) {
			var t = +("" + (/* @__PURE__ */ new Date()).getFullYear()).substr(0, 2);
			return +("" + (+e > 68 ? t - 1 : t) + e);
		}
	],
	h: [
		"hour",
		_,
		void 0,
		"isPm"
	],
	hh: [
		"hour",
		v,
		void 0,
		"isPm"
	],
	H: ["hour", _],
	HH: ["hour", v],
	m: ["minute", _],
	mm: ["minute", v],
	s: ["second", _],
	ss: ["second", v],
	YYYY: ["year", b],
	S: [
		"millisecond",
		"\\d",
		function(e) {
			return e * 100;
		}
	],
	SS: [
		"millisecond",
		v,
		function(e) {
			return e * 10;
		}
	],
	SSS: ["millisecond", y],
	d: N,
	dd: N,
	ddd: P,
	dddd: P,
	MMM: [
		"month",
		x,
		w("monthNamesShort")
	],
	MMMM: [
		"month",
		x,
		w("monthNames")
	],
	a: ae,
	A: ae,
	ZZ: oe,
	Z: oe
}, ce = {
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
}, le = function(e, t, n) {
	if (t === void 0 && (t = ce.default), n === void 0 && (n = {}), typeof e == "number" && (e = new Date(e)), Object.prototype.toString.call(e) !== "[object Date]" || isNaN(e.getTime())) throw Error("Invalid Date pass to format");
	t = ce[t] || t;
	var r = [];
	t = t.replace(S, function(e, t) {
		return r.push(t), "@@@";
	});
	var i = T(T({}, k), n);
	return t = t.replace(re, function(t) {
		return ie[t](e, i);
	}), t.replace(/@@@/g, function() {
		return r.shift();
	});
};
function ue(e, t, n) {
	if (n === void 0 && (n = {}), typeof t != "string") throw Error("Invalid format in fecha parse");
	if (t = ce[t] || t, e.length > 1e3) return null;
	var r = {
		year: (/* @__PURE__ */ new Date()).getFullYear(),
		month: 0,
		day: 1,
		hour: 0,
		minute: 0,
		second: 0,
		millisecond: 0,
		isPm: null,
		timezoneOffset: null
	}, i = [], a = [], o = t.replace(S, function(e, t) {
		return a.push(A(t)), "@@@";
	}), s = {}, c = {};
	o = A(o).replace(re, function(e) {
		var t = se[e], n = t[0], r = t[1], a = t[3];
		if (s[n]) throw Error("Invalid format. " + n + " specified twice in format");
		return s[n] = !0, a && (c[a] = !0), i.push(t), "(" + r + ")";
	}), Object.keys(c).forEach(function(e) {
		if (!s[e]) throw Error("Invalid format. " + e + " is required in specified format");
	}), o = o.replace(/@@@/g, function() {
		return a.shift();
	});
	var l = e.match(new RegExp(o, "i"));
	if (!l) return null;
	for (var u = T(T({}, k), n), d = 1; d < l.length; d++) {
		var ee = i[d - 1], te = ee[0], f = ee[2], p = f ? f(l[d], u) : +l[d];
		if (p == null) return null;
		r[te] = p;
	}
	r.isPm === 1 && r.hour != null && +r.hour != 12 ? r.hour = +r.hour + 12 : r.isPm === 0 && +r.hour == 12 && (r.hour = 0);
	var m;
	if (r.timezoneOffset == null) {
		m = new Date(r.year, r.month, r.day, r.hour, r.minute, r.second, r.millisecond);
		for (var h = [
			["month", "getMonth"],
			["day", "getDate"],
			["hour", "getHours"],
			["minute", "getMinutes"],
			["second", "getSeconds"]
		], d = 0, g = h.length; d < g; d++) if (s[h[d][0]] && r[h[d][0]] !== m[h[d][1]]()) return null;
	} else if (m = new Date(Date.UTC(r.year, r.month, r.day, r.hour, r.minute - r.timezoneOffset, r.second, r.millisecond)), r.month > 11 || r.month < 0 || r.day > 31 || r.day < 1 || r.hour > 23 || r.hour < 0 || r.minute > 59 || r.minute < 0 || r.second > 59 || r.second < 0) return null;
	return m;
}
//#endregion
//#region src/components/Vue3HotelDatePicker.vue?vue&type=script&setup=true&lang.ts
var de = ["aria-label"], fe = ["aria-label"], pe = ["aria-label"], me = ["aria-labelledby"], he = { class: "h-datepicker__month-header h_datepicker_month_control_panel" }, ge = [
	"disabled",
	"aria-label",
	"onClick"
], _e = ["id"], ve = [
	"disabled",
	"aria-label",
	"onClick"
], ye = ["aria-labelledby"], be = ["aria-selected"], xe = [
	"aria-disabled",
	"tabindex",
	"data-date",
	"aria-label",
	"onClick",
	"onKeydown",
	"onPointerenter"
], Se = {
	key: 0,
	class: "h-datepicker__extra-text"
}, Ce = {
	key: 1,
	class: "h-datepicker__day-placeholder",
	"aria-hidden": "true"
}, we = /* @__PURE__ */ ((e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
})(/* @__PURE__ */ o({
	__name: "Vue3HotelDatePicker",
	props: {
		format: {
			type: String,
			default: "YYYY-MM-DD"
		},
		startOfWeek: {
			type: String,
			default: "monday"
		},
		separator: {
			type: String,
			default: "-"
		},
		selectedDates: {
			type: [Array, Boolean],
			default: !1
		},
		startDate: {
			type: [
				Date,
				String,
				Number,
				Boolean
			],
			default: !1
		},
		endDate: {
			type: [
				Date,
				String,
				Number,
				Boolean
			],
			default: !1
		},
		minDate: {
			type: [
				Date,
				String,
				Number,
				Boolean
			],
			default: () => /* @__PURE__ */ new Date()
		},
		maxDate: {
			type: [
				Date,
				String,
				Number,
				Boolean
			],
			default: !1
		},
		disabledDaysOfWeek: {
			type: Array,
			default: () => []
		},
		showTopbar: {
			type: Boolean,
			default: !1
		},
		moveBothMonths: {
			type: Boolean,
			default: !1
		},
		ariaDayFormat: {
			type: String,
			default: "dddd, MMMM DD, YYYY"
		},
		noCheckOutDates: {
			type: Array,
			default: () => []
		},
		noCheckInDates: {
			type: Array,
			default: () => []
		},
		noCheckInDaysOfWeek: {
			type: Array,
			default: () => []
		},
		noCheckOutDaysOfWeek: {
			type: Array,
			default: () => []
		},
		maxNights: {
			type: Number,
			default: 0
		},
		minNights: {
			type: Number,
			default: 1
		},
		singleMonthBreakpoint: {
			type: [
				Number,
				String,
				Boolean
			],
			default: 768
		},
		topbarPosition: {
			type: String,
			default: "top"
		},
		onOpenDatepicker: {
			type: Boolean,
			default: !1
		},
		minNightsMultiple: {
			type: Boolean,
			default: !1
		},
		selectForward: {
			type: Boolean,
			default: !1
		},
		showSingleMonth: {
			type: Boolean,
			default: !1
		},
		disabledDates: {
			type: [Array, Boolean],
			default: !1
		},
		daysWithExtraText: {
			type: Array,
			default: () => []
		},
		enableCheckout: {
			type: Boolean,
			default: !1
		},
		weekDays: {
			type: Array,
			default: () => [
				"sun",
				"mon",
				"tue",
				"wed",
				"thu",
				"fri",
				"sat"
			]
		},
		monthNames: {
			type: Array,
			default: () => [
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
		},
		getValues: {
			type: Function,
			default: void 0
		},
		extraDayText: {
			type: Function,
			default: void 0
		},
		i18n: {
			type: Object,
			default: () => ({})
		},
		mobileMonths: {
			type: Number,
			default: 12
		}
	},
	emits: [
		"selected",
		"select",
		"change",
		"update:startDate",
		"update:endDate"
	],
	setup(o, { expose: re, emit: _ }) {
		let v = {
			selected: "Your stay:",
			night: "Night",
			nights: "Nights",
			button: "Close",
			clearButton: "Clear",
			submitButton: "Submit",
			"checkin-disabled": "Check-in disabled",
			"checkout-disabled": "Check-out disabled",
			"day-names-short": [
				"sun",
				"mon",
				"tue",
				"wed",
				"thu",
				"fri",
				"sat"
			],
			"day-names": [
				"Sunday",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday"
			],
			"month-names-short": [
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
			"month-names": [
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
			],
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
			"aria-prev-month": "Move backward to the previous month",
			"aria-next-month": "Move forward to the next month",
			"aria-clear-button": "Clear the selected dates",
			"select-checkout": "Select a check-out date",
			"forward-only": "Please select a check-out date after check-in",
			"same-day": "Check-out must be after check-in",
			multiple: "The stay must be a multiple of %d nights",
			unavailable: "This date range is not available"
		}, y = o, b = _, x = p(null), S = `h-datepicker-${s()?.uid ?? "standalone"}`, C = p([]), w = p(!1), T = p(null), E = p(null), D = p(null), O = p(""), k = p(""), A = p(W(/* @__PURE__ */ new Date())), j = p({
			show: !1,
			top: 0,
			left: 0,
			width: 0,
			count: 0,
			error: !1
		}), ie = t(() => ({
			...v,
			"day-names-short": y.weekDays,
			"month-names": y.monthNames,
			...y.i18n
		})), M = t(() => ({
			dayNamesShort: R("day-names-short", 7),
			dayNames: R("day-names", 7),
			monthNamesShort: R("month-names-short", 12),
			monthNames: R("month-names", 12)
		})), N = t(() => B(y.minDate) ?? B(/* @__PURE__ */ new Date())), P = t(() => B(y.maxDate)), ae = t(() => U(y.disabledDates || [])), oe = t(() => U(y.noCheckInDates)), se = t(() => U(y.noCheckOutDates)), ce = t(() => U(y.daysWithExtraText)), we = t(() => H(B(/* @__PURE__ */ new Date()))), Te = t(() => T.value && E.value ? je(T.value, E.value) : 0), Ee = t(() => Math.min(24, Math.max(2, Math.trunc(y.mobileMonths) || 12))), F = t(() => {
			if (y.showSingleMonth) return 1;
			if (w.value) {
				let e = P.value;
				return e ? Math.max(1, Math.min(Ee.value, q(A.value, e) + 1)) : Ee.value;
			}
			let e = y.showSingleMonth ? 1 : 2, t = P.value;
			return t ? Math.max(1, Math.min(e, q(A.value, t) + 1)) : e;
		}), I = t(() => Array.from({ length: F.value }, (e, t) => ze(K(A.value, t), t))), De = t(() => Ae(K(A.value, -1)).getTime() >= N.value.getTime()), Oe = t(() => {
			let e = P.value;
			return !e || K(A.value, 1).getTime() <= W(e).getTime();
		}), ke = t(() => {
			if (k.value) return k.value;
			if (T.value && E.value) {
				let e = Te.value === 1 ? L("night") : L("nights");
				return `${L("selected")} ${V(T.value)}${y.separator}${V(E.value)} · ${Te.value} ${e}`;
			}
			return T.value ? Q("select-checkout") : L("info-default");
		});
		function L(e) {
			let t = ie.value[e];
			return typeof t == "string" ? t : "";
		}
		function R(e, t) {
			let n = ie.value[e], r = v[e];
			return Array.isArray(n) && n.length === t ? n : Array.isArray(r) ? r : [];
		}
		function z(e, t, n = "%s") {
			return e.replace(n, String(t));
		}
		function B(e, t = y.format) {
			if (e === !1 || e == null || e === "") return null;
			let n;
			return n = e instanceof Date ? new Date(e.getTime()) : typeof e == "number" ? new Date(e) : ue(e, t, M.value) ?? ue(e, "YYYY-MM-DD", M.value), !n || Number.isNaN(n.getTime()) ? null : new Date(n.getFullYear(), n.getMonth(), n.getDate(), 12);
		}
		function V(e, t = y.format) {
			let n = B(e);
			return n ? le(n, t, M.value) : "";
		}
		function H(e) {
			let t = String(e.getMonth() + 1).padStart(2, "0"), n = String(e.getDate()).padStart(2, "0");
			return `${e.getFullYear()}-${t}-${n}`;
		}
		function U(e) {
			return new Set(e.map((e) => B(e)).filter((e) => !!e).map(H));
		}
		function W(e) {
			return new Date(e.getFullYear(), e.getMonth(), 1, 12);
		}
		function Ae(e) {
			return new Date(e.getFullYear(), e.getMonth() + 1, 0, 12);
		}
		function G(e, t) {
			return new Date(e.getFullYear(), e.getMonth(), e.getDate() + t, 12);
		}
		function K(e, t) {
			return new Date(e.getFullYear(), e.getMonth() + t, 1, 12);
		}
		function q(e, t) {
			return (t.getFullYear() - e.getFullYear()) * 12 + t.getMonth() - e.getMonth();
		}
		function J(e) {
			return Math.floor(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()) / 864e5);
		}
		function je(e, t) {
			return Math.abs(J(t) - J(e));
		}
		function Y(e, t) {
			return J(e) - J(t);
		}
		function X(e) {
			if (Y(e, N.value) < 0) return !1;
			let t = P.value;
			return !t || Y(e, t) <= 0;
		}
		function Me(e, t) {
			let n = e.getDay(), r = [
				R("day-names-short", 7)[n],
				R("day-names", 7)[n],
				v["day-names-short"][n],
				v["day-names"][n]
			].map((e) => e.toLocaleLowerCase());
			return t.some((e) => r.includes(String(e).toLocaleLowerCase()));
		}
		function Ne(e) {
			return ae.value.has(H(e)) || Me(e, y.disabledDaysOfWeek);
		}
		function Pe(e) {
			return Ne(e) || oe.value.has(H(e)) || Me(e, y.noCheckInDaysOfWeek);
		}
		function Fe(e) {
			return se.value.has(H(e)) || Me(e, y.noCheckOutDaysOfWeek);
		}
		function Ie(e) {
			return X(e) && !Pe(e);
		}
		function Z(e, t) {
			let n = Y(e, t) <= 0 ? e : t, r = n === e ? t : e;
			if (!Ie(n) || !X(r)) return Q("unavailable");
			if (y.selectForward && Y(t, e) < 0) return Q("forward-only");
			if (Fe(r)) return Q("checkout-disabled");
			let i = je(n, r);
			if (i === 0) return Q("same-day");
			if (i < Math.max(1, y.minNights)) return Q("min", y.minNights);
			if (y.maxNights > 0 && i > y.maxNights) return Q("max", y.maxNights);
			if (y.minNightsMultiple && i % Math.max(1, y.minNights) !== 0) return Q("multiple", y.minNights);
			for (let e = G(n, 1); Y(e, r) <= 0; e = G(e, 1)) if (Ne(e) && !(y.enableCheckout && Y(e, r) === 0)) return Q("unavailable");
			return "";
		}
		function Q(e, t) {
			return e === "min" ? z(L(t === 1 ? "error-less" : "error-less-plural"), t ?? 1, "%d") : e === "max" ? z(L(t === 1 ? "error-more" : "error-more-plural"), t ?? 1, "%d") : e === "checkout-disabled" ? L("checkout-disabled") : e === "select-checkout" ? L("select-checkout") : e === "forward-only" ? L("forward-only") : e === "same-day" ? L("same-day") : e === "multiple" ? z(L("multiple"), t ?? 1, "%d") : L("unavailable");
		}
		function Le(e) {
			return T.value && !E.value ? Z(T.value, e) === "" : Ie(e);
		}
		function Re(e, t, n) {
			let r = Math.min(J(t), J(n)), i = Math.max(J(t), J(n)), a = J(e);
			return a >= r && a <= i;
		}
		function ze(e, t) {
			let n = W(e), r = G(n, -(y.startOfWeek === "monday" ? (n.getDay() + 6) % 7 : n.getDay()));
			return {
				name: R("month-names", 12)[e.getMonth()] ?? "",
				month: e.getMonth(),
				year: e.getFullYear(),
				id: `${e.getFullYear()}-${e.getMonth() + 1}`,
				days: Array.from({ length: 42 }, (t, n) => Be(G(r, n), e)),
				prevBtn: w.value ? t > 0 || De.value : t === 0 && De.value,
				nextBtn: w.value ? t < F.value - 1 || Oe.value : t === F.value - 1 && Oe.value
			};
		}
		function Be(e, t) {
			let n = e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear(), r = H(e), i = Ne(e), a = !!(T.value && !E.value && i && Z(T.value, e) === ""), o = !!(n && T.value && E.value && Re(e, T.value, E.value)), s = !!(n && T.value && !E.value && D.value && Re(e, T.value, D.value));
			return {
				date: e,
				type: n ? "visibleMonth" : Y(e, t) < 0 ? "lastMonth" : "nextMonth",
				day: e.getDate(),
				time: e.getTime(),
				tabindex: O.value === r ? 0 : -1,
				attributes: [],
				isCurrentMonth: n,
				isValid: n && Le(e),
				isNoCheckIn: Pe(e),
				isNoCheckOut: Fe(e),
				isToday: r === we.value,
				isDisabled: i,
				disabled: i,
				isCheckOutEnabled: a,
				isDayBeforeDisabledDate: Ne(G(e, 1)),
				isCheckInOnly: Ie(e) && Fe(e),
				isDayWithExtraText: ce.value.has(r),
				isFirstDaySelected: r === (T.value ? H(T.value) : ""),
				isLastDaySelected: r === (E.value ? H(E.value) : ""),
				isSelected: o,
				isHovering: s,
				isTmpValid: !0,
				isTmp: !1
			};
		}
		function Ve() {
			let e = R("day-names-short", 7);
			return y.startOfWeek === "monday" ? [...e.slice(1), e[0]] : e;
		}
		function He(e) {
			let t = V(e.date, y.ariaDayFormat);
			return e.isFirstDaySelected ? z(L("aria-selected-checkin"), t) : e.isLastDaySelected ? z(L("aria-selected-checkout"), t) : e.isSelected ? z(L("aria-selected"), t) : e.isValid ? z(L(T.value && !E.value ? "aria-choose-checkout" : "aria-choose-checkin"), t) : z(L("aria-disabled"), t);
		}
		function Ue(e) {
			if (!e.isCurrentMonth) return;
			let t = B(e.date);
			if (!T.value || E.value) {
				if (!Ie(t)) return;
				T.value = t, E.value = null, k.value = "", O.value = H(t), We();
				return;
			}
			let n = Z(T.value, t);
			if (n) {
				k.value = n;
				return;
			}
			let r = Y(T.value, t) <= 0 ? T.value : t, i = r === T.value ? t : T.value;
			T.value = B(r), E.value = B(i), O.value = H(t), k.value = "", D.value = null, qe();
			let a = {
				start: T.value.getTime(),
				end: E.value.getTime()
			};
			b("selected", a), b("select", a), We();
		}
		function We() {
			let e = T.value ? V(T.value) : !1, t = E.value ? V(E.value) : !1;
			b("update:startDate", e), b("update:endDate", t), b("change", {
				start: e,
				end: t
			});
		}
		function Ge() {
			T.value = null, E.value = null, D.value = null, k.value = "", We();
		}
		function Ke(e, t) {
			if (w.value || !T.value || E.value || !t.isCurrentMonth) return;
			D.value = B(t.date);
			let n = x.value?.getBoundingClientRect(), r = e.currentTarget;
			if (!n || !r) return;
			let i = r.getBoundingClientRect();
			j.value = {
				show: !0,
				top: i.top - n.top - 40,
				left: i.left - n.left,
				width: i.width,
				count: je(T.value, t.date),
				error: Z(T.value, t.date) !== ""
			};
		}
		function qe() {
			D.value = null, j.value.show = !1;
		}
		async function Je(e) {
			if (w.value && e > 0) return Xe(e - 1);
			De.value && (A.value = K(A.value, -1), await c(), w.value && Xe(0));
		}
		async function Ye(e) {
			if (w.value && e < I.value.length - 1) return Xe(e + 1);
			Oe.value && (A.value = K(A.value, 1), await c(), w.value && Xe(Math.min(e, I.value.length - 1)));
		}
		function Xe(e) {
			C.value[e]?.scrollIntoView({
				behavior: Ze() ? "auto" : "smooth",
				block: "start"
			});
		}
		function Ze() {
			return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		}
		function Qe(e, t) {
			e instanceof HTMLElement && (C.value[t] = e);
		}
		async function $e(e, t) {
			if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
				e.preventDefault(), Ue(t);
				return;
			}
			let n = null, r = y.startOfWeek === "monday" ? (t.date.getDay() + 6) % 7 : t.date.getDay();
			e.key === "ArrowRight" && (n = G(t.date, 1)), e.key === "ArrowLeft" && (n = G(t.date, -1)), e.key === "ArrowDown" && (n = G(t.date, 7)), e.key === "ArrowUp" && (n = G(t.date, -7)), e.key === "Home" && (n = G(t.date, -r)), e.key === "End" && (n = G(t.date, 6 - r)), e.key === "PageUp" && (n = et(t.date, -1)), e.key === "PageDown" && (n = et(t.date, 1)), n && (e.preventDefault(), await tt(n));
		}
		function et(e, t) {
			let n = K(e, t);
			return new Date(n.getFullYear(), n.getMonth(), Math.min(e.getDate(), Ae(n).getDate()), 12);
		}
		async function tt(e) {
			if (!X(e)) return;
			let t = K(A.value, F.value - 1);
			(q(A.value, e) < 0 || q(e, t) < 0) && (A.value = W(e)), O.value = H(e), await c(), x.value?.querySelector(`[data-date="${H(e)}"]`)?.focus();
		}
		function nt() {
			let e = Array.isArray(y.selectedDates) ? y.selectedDates : [], t = B(y.startDate || e[0]), n = B(y.endDate || e[1]);
			T.value = t, E.value = t && n ? n : null, t && n && Y(t, n) > 0 && (T.value = n, E.value = t);
			let r = T.value && X(T.value) ? T.value : N.value;
			A.value = W(r), O.value = H(r), k.value = "";
		}
		function $() {
			if (typeof window > "u") return;
			let e = Number(y.singleMonthBreakpoint), t = y.singleMonthBreakpoint === !1 || !Number.isFinite(e) ? 768 : Math.max(320, e), n = x.value?.clientWidth || window.innerWidth;
			w.value = Math.min(n, window.innerWidth) < t;
		}
		let rt = null;
		return ne(() => [
			y.startDate,
			y.endDate,
			y.selectedDates,
			y.minDate,
			y.maxDate,
			y.format
		], nt, {
			deep: !0,
			immediate: !0
		}), ne(() => y.singleMonthBreakpoint, $), d(() => {
			C.value = [];
		}), ee(() => {
			$(), typeof ResizeObserver < "u" && x.value ? (rt = new ResizeObserver($), rt.observe(x.value)) : window.addEventListener("resize", $, { passive: !0 });
		}), te(() => {
			rt?.disconnect(), window.removeEventListener("resize", $);
		}), re({
			clear: Ge,
			getValues: () => ({
				start: T.value ? V(T.value) : !1,
				end: E.value ? V(E.value) : !1
			}),
			setRange: (e, t) => {
				let n = B(e), r = B(t);
				if (!n || !r) return !1;
				let i = Z(n, r);
				return i ? (k.value = i, !1) : (T.value = Y(n, r) <= 0 ? n : r, E.value = Y(n, r) <= 0 ? r : n, A.value = W(T.value), We(), !0);
			}
		}), (t, s) => (f(), r("section", {
			ref_key: "root",
			ref: x,
			class: l(["h-datepicker h_datepicker", {
				"h-datepicker--mobile": w.value,
				h_datepicker_mobile: w.value,
				"h-datepicker--topbar-bottom": o.topbarPosition === "bottom"
			}]),
			"aria-label": L("aria-application")
		}, [
			j.value.show ? (f(), r("div", {
				key: 0,
				class: l(["h-datepicker__popup h_datepicker_popup", { "h-datepicker__popup--error": j.value.error }]),
				style: u({
					top: `${j.value.top}px`,
					left: `${j.value.left}px`,
					width: `${j.value.width}px`
				}),
				role: "status"
			}, [h(t.$slots, "popup", {
				nights: j.value.count,
				error: j.value.error
			}, () => [a(g(j.value.count) + " " + g(j.value.count === 1 ? L("night") : L("nights")), 1)], !0)], 6)) : n("", !0),
			o.showTopbar ? (f(), r("div", {
				key: 1,
				class: l(["h-datepicker__topbar", { "h-datepicker__topbar--error": k.value }]),
				"aria-live": "polite"
			}, [i("span", null, g(ke.value), 1), T.value ? (f(), r("button", {
				key: 0,
				type: "button",
				class: "h-datepicker__clear",
				"aria-label": L("aria-clear-button"),
				onClick: Ge
			}, g(L("clearButton")), 9, fe)) : n("", !0)], 2)) : n("", !0),
			i("div", {
				class: "h-datepicker__months h_datepicker_months",
				"aria-label": L("aria-application")
			}, [(f(!0), r(e, null, m(I.value, (c, u) => (f(), r("article", {
				key: c.id,
				ref_for: !0,
				ref: (e) => Qe(e, u),
				class: l(["h-datepicker__month h_datepicker_month", {
					h_datepicker_one_month_display: I.value.length === 1,
					h_datepicker_two_month_display: I.value.length === 2,
					"h_datepicker_month-1": u === 0,
					"h_datepicker_month-2": u === 1
				}]),
				"aria-labelledby": `${S}-month-${c.id}`
			}, [i("header", he, [
				i("button", {
					type: "button",
					class: l(["h-datepicker__month-control h_datepicker_month_control_btn", { "h-datepicker__month-control--hidden": !c.prevBtn }]),
					disabled: !c.prevBtn,
					"aria-label": L("aria-prev-month"),
					onClick: (e) => Je(u)
				}, [h(t.$slots, "prev", {}, () => [s[0] ||= i("span", { "aria-hidden": "true" }, "‹", -1)], !0)], 10, ge),
				i("h2", {
					id: `${S}-month-${c.id}`,
					class: "h-datepicker__month-title h_datepicker_month_control_item",
					"aria-live": "polite"
				}, [h(t.$slots, "month", { month: c }, () => [a(g(c.name) + " " + g(c.year), 1)], !0)], 8, _e),
				i("button", {
					type: "button",
					class: l(["h-datepicker__month-control h_datepicker_month_control_btn", { "h-datepicker__month-control--hidden": !c.nextBtn }]),
					disabled: !c.nextBtn,
					"aria-label": L("aria-next-month"),
					onClick: (e) => Ye(u)
				}, [h(t.$slots, "next", {}, () => [s[1] ||= i("span", { "aria-hidden": "true" }, "›", -1)], !0)], 10, ve)
			]), i("div", {
				class: "h-datepicker__grid h_datepicker_month_box",
				role: "grid",
				"aria-labelledby": `${S}-month-${c.id}`
			}, [(f(!0), r(e, null, m(Ve(), (e) => (f(), r("div", {
				key: e,
				class: "h-datepicker__weekday h_datepicker_week_name",
				role: "columnheader"
			}, [h(t.$slots, "weekday", { weekday: e }, () => [a(g(e), 1)], !0)]))), 128)), (f(!0), r(e, null, m(c.days, (e) => (f(), r("div", {
				key: `${c.id}-${H(e.date)}`,
				class: "h-datepicker__cell",
				role: "gridcell",
				"aria-selected": e.isSelected
			}, [e.isCurrentMonth ? (f(), r("button", {
				key: 0,
				type: "button",
				class: l(["h-datepicker__day h_datepicker_day", {
					"h-datepicker__day--valid": e.isValid,
					"h-datepicker__day--invalid": !e.isValid,
					"h-datepicker__day--disabled": e.isDisabled && !e.isCheckOutEnabled,
					"h-datepicker__day--checkout-enabled": e.isCheckOutEnabled,
					"h-datepicker__day--selected": e.isSelected,
					"h-datepicker__day--range-start": e.isFirstDaySelected,
					"h-datepicker__day--range-end": e.isLastDaySelected,
					"h-datepicker__day--hovering": e.isHovering,
					"h-datepicker__day--today": e.isToday,
					h_datepicker_valid: e.isValid,
					h_datepicker_invalid: !e.isValid,
					h_datepicker_disabled: e.isDisabled,
					h_datepicker_checkout_enabled: e.isCheckOutEnabled,
					h_datepicker_checkout_disabled: !e.isCheckOutEnabled,
					h_datepicker_checkin_enabled: !e.isNoCheckIn,
					h_datepicker_checkin_disabled: e.isNoCheckIn,
					h_datepicker_before_disabled_date: e.isDayBeforeDisabledDate,
					h_datepicker_first_day_selected: e.isFirstDaySelected,
					h_datepicker_last_day_selected: e.isLastDaySelected,
					h_datepicker_selected: e.isSelected,
					h_datepicker_hovering: e.isHovering
				}]),
				"aria-disabled": !e.isValid,
				tabindex: e.tabindex,
				"data-date": H(e.date),
				"aria-label": He(e),
				onClick: (t) => Ue(e),
				onKeydown: (t) => $e(t, e),
				onPointerenter: (t) => Ke(t, e),
				onPointerleave: qe
			}, [h(t.$slots, "day", { day: e }, () => [i("span", null, g(e.day), 1), e.isDayWithExtraText && o.extraDayText ? (f(), r("small", Se, g(o.extraDayText(e)), 1)) : n("", !0)], !0)], 42, xe)) : (f(), r("span", Ce))], 8, be))), 128))], 8, ye)], 10, me))), 128))], 8, pe)
		], 10, de));
	}
}), [["__scopeId", "data-v-2dce60a3"]]);
//#endregion
export { we as default };
