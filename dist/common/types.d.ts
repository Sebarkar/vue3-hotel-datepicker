export interface Day {
    date: Date;
    type: string;
    day: string;
    time: number;
    tabindex: number;
    isCurrentMonth: boolean;
    isValid: boolean;
    isNoCheckIn: boolean;
    isNoCheckOut: boolean;
}
