import { PropType } from 'vue';
type DateInput = Date | string | number | false | null | undefined;
type StartOfWeek = "monday" | "sunday";
type I18nValue = string | string[];
type I18nDictionary = Record<string, I18nValue>;
interface CalendarDay {
    date: Date;
    type: "lastMonth" | "visibleMonth" | "nextMonth";
    day: number;
    time: number;
    tabindex: number;
    attributes: string[];
    isCurrentMonth: boolean;
    isValid: boolean;
    isNoCheckIn: boolean;
    isNoCheckOut: boolean;
    isToday: boolean;
    isDisabled: boolean;
    disabled: boolean;
    isCheckOutEnabled: boolean;
    isDayBeforeDisabledDate: boolean;
    isCheckInOnly: boolean;
    isDayWithExtraText: boolean;
    isFirstDaySelected: boolean;
    isLastDaySelected: boolean;
    isSelected: boolean;
    isHovering: boolean;
    isTmpValid: boolean;
    isTmp: boolean;
}
interface CalendarMonth {
    name: string;
    month: number;
    year: number;
    id: string;
    days: CalendarDay[];
    nextBtn: boolean;
    prevBtn: boolean;
}
type __VLS_Slots = {
    popup?: (props: {
        nights: number;
        error: boolean;
    }) => unknown;
    month?: (props: {
        month: CalendarMonth;
    }) => unknown;
    weekday?: (props: {
        weekday: string;
    }) => unknown;
    day?: (props: {
        day: CalendarDay;
    }) => unknown;
    next?: () => unknown;
    prev?: () => unknown;
};
declare function clearSelection(): void;
declare const __VLS_base: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    format: {
        type: StringConstructor;
        default: string;
    };
    startOfWeek: {
        type: PropType<StartOfWeek>;
        default: string;
    };
    separator: {
        type: StringConstructor;
        default: string;
    };
    selectedDates: {
        type: PropType<DateInput[] | false>;
        default: boolean;
    };
    startDate: {
        type: PropType<DateInput>;
        default: boolean;
    };
    endDate: {
        type: PropType<DateInput>;
        default: boolean;
    };
    minDate: {
        type: PropType<DateInput>;
        default: () => Date;
    };
    maxDate: {
        type: PropType<DateInput>;
        default: boolean;
    };
    disabledDaysOfWeek: {
        type: PropType<string[]>;
        default: () => never[];
    };
    showTopbar: {
        type: BooleanConstructor;
        default: boolean;
    };
    moveBothMonths: {
        type: BooleanConstructor;
        default: boolean;
    };
    ariaDayFormat: {
        type: StringConstructor;
        default: string;
    };
    noCheckOutDates: {
        type: PropType<DateInput[]>;
        default: () => never[];
    };
    noCheckInDates: {
        type: PropType<DateInput[]>;
        default: () => never[];
    };
    noCheckInDaysOfWeek: {
        type: PropType<string[]>;
        default: () => never[];
    };
    noCheckOutDaysOfWeek: {
        type: PropType<string[]>;
        default: () => never[];
    };
    maxNights: {
        type: NumberConstructor;
        default: number;
    };
    minNights: {
        type: NumberConstructor;
        default: number;
    };
    singleMonthBreakpoint: {
        type: PropType<number | string | false>;
        default: number;
    };
    topbarPosition: {
        type: PropType<"top" | "bottom">;
        default: string;
    };
    onOpenDatepicker: {
        type: BooleanConstructor;
        default: boolean;
    };
    minNightsMultiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    selectForward: {
        type: BooleanConstructor;
        default: boolean;
    };
    showSingleMonth: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabledDates: {
        type: PropType<DateInput[] | false>;
        default: boolean;
    };
    daysWithExtraText: {
        type: PropType<DateInput[]>;
        default: () => never[];
    };
    enableCheckout: {
        type: BooleanConstructor;
        default: boolean;
    };
    weekDays: {
        type: PropType<string[]>;
        default: () => string[];
    };
    monthNames: {
        type: PropType<string[]>;
        default: () => string[];
    };
    getValues: {
        type: PropType<() => unknown>;
        default: undefined;
    };
    extraDayText: {
        type: PropType<(day: CalendarDay) => string>;
        default: undefined;
    };
    i18n: {
        type: PropType<Partial<I18nDictionary>>;
        default: () => {};
    };
    mobileMonths: {
        type: NumberConstructor;
        default: number;
    };
}>, {
    clear: typeof clearSelection;
    getValues: () => {
        start: string | boolean;
        end: string | boolean;
    };
    setRange: (start: DateInput, end: DateInput) => boolean;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    selected: (payload: {
        start: number;
        end: number;
    }) => any;
    select: (payload: {
        start: number;
        end: number;
    }) => any;
    change: (payload: {
        start: string | false;
        end: string | false;
    }) => any;
    "update:startDate": (value: string | false) => any;
    "update:endDate": (value: string | false) => any;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    format: {
        type: StringConstructor;
        default: string;
    };
    startOfWeek: {
        type: PropType<StartOfWeek>;
        default: string;
    };
    separator: {
        type: StringConstructor;
        default: string;
    };
    selectedDates: {
        type: PropType<DateInput[] | false>;
        default: boolean;
    };
    startDate: {
        type: PropType<DateInput>;
        default: boolean;
    };
    endDate: {
        type: PropType<DateInput>;
        default: boolean;
    };
    minDate: {
        type: PropType<DateInput>;
        default: () => Date;
    };
    maxDate: {
        type: PropType<DateInput>;
        default: boolean;
    };
    disabledDaysOfWeek: {
        type: PropType<string[]>;
        default: () => never[];
    };
    showTopbar: {
        type: BooleanConstructor;
        default: boolean;
    };
    moveBothMonths: {
        type: BooleanConstructor;
        default: boolean;
    };
    ariaDayFormat: {
        type: StringConstructor;
        default: string;
    };
    noCheckOutDates: {
        type: PropType<DateInput[]>;
        default: () => never[];
    };
    noCheckInDates: {
        type: PropType<DateInput[]>;
        default: () => never[];
    };
    noCheckInDaysOfWeek: {
        type: PropType<string[]>;
        default: () => never[];
    };
    noCheckOutDaysOfWeek: {
        type: PropType<string[]>;
        default: () => never[];
    };
    maxNights: {
        type: NumberConstructor;
        default: number;
    };
    minNights: {
        type: NumberConstructor;
        default: number;
    };
    singleMonthBreakpoint: {
        type: PropType<number | string | false>;
        default: number;
    };
    topbarPosition: {
        type: PropType<"top" | "bottom">;
        default: string;
    };
    onOpenDatepicker: {
        type: BooleanConstructor;
        default: boolean;
    };
    minNightsMultiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    selectForward: {
        type: BooleanConstructor;
        default: boolean;
    };
    showSingleMonth: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabledDates: {
        type: PropType<DateInput[] | false>;
        default: boolean;
    };
    daysWithExtraText: {
        type: PropType<DateInput[]>;
        default: () => never[];
    };
    enableCheckout: {
        type: BooleanConstructor;
        default: boolean;
    };
    weekDays: {
        type: PropType<string[]>;
        default: () => string[];
    };
    monthNames: {
        type: PropType<string[]>;
        default: () => string[];
    };
    getValues: {
        type: PropType<() => unknown>;
        default: undefined;
    };
    extraDayText: {
        type: PropType<(day: CalendarDay) => string>;
        default: undefined;
    };
    i18n: {
        type: PropType<Partial<I18nDictionary>>;
        default: () => {};
    };
    mobileMonths: {
        type: NumberConstructor;
        default: number;
    };
}>> & Readonly<{
    onSelected?: ((payload: {
        start: number;
        end: number;
    }) => any) | undefined;
    onSelect?: ((payload: {
        start: number;
        end: number;
    }) => any) | undefined;
    onChange?: ((payload: {
        start: string | false;
        end: string | false;
    }) => any) | undefined;
    "onUpdate:startDate"?: ((value: string | false) => any) | undefined;
    "onUpdate:endDate"?: ((value: string | false) => any) | undefined;
}>, {
    format: string;
    startOfWeek: StartOfWeek;
    separator: string;
    selectedDates: false | DateInput[];
    startDate: DateInput;
    endDate: DateInput;
    minDate: DateInput;
    maxDate: DateInput;
    disabledDaysOfWeek: string[];
    showTopbar: boolean;
    moveBothMonths: boolean;
    ariaDayFormat: string;
    noCheckOutDates: DateInput[];
    noCheckInDates: DateInput[];
    noCheckInDaysOfWeek: string[];
    noCheckOutDaysOfWeek: string[];
    maxNights: number;
    minNights: number;
    singleMonthBreakpoint: string | number | false;
    topbarPosition: "top" | "bottom";
    onOpenDatepicker: boolean;
    minNightsMultiple: boolean;
    selectForward: boolean;
    showSingleMonth: boolean;
    disabledDates: false | DateInput[];
    daysWithExtraText: DateInput[];
    enableCheckout: boolean;
    weekDays: string[];
    monthNames: string[];
    getValues: () => unknown;
    extraDayText: (day: CalendarDay) => string;
    i18n: Partial<I18nDictionary>;
    mobileMonths: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
