"use client";
import { createContext } from "react";

export interface Timings {
    Fajr: string;
    Sunrise: string;
    Dhuhr: string;
    Asr: string;
    Sunset: string;
    Maghrib: string;
    Isha: string;
    Imsak: string;
    Midnight: string;
    Firstthird: string;
    Lastthird: string;
}

export interface Hijri {
    date: string;
    day: number;
    month: {
        ar: string;
        days: number;
        en: string;
        number: number;
    };
    weekday: {
        ar: string;
        en: string;
    };
}

export interface Gregorian {
    date: string;
    day: string;
    month: {
        en: string;
        number: number;
    };
    weekday: {
        en: string;
    };
}

export interface Month {
    timings: Timings;
    date: {
        hijri: Hijri;
        gregorian: Gregorian;
    };
}

export interface Year {
    data: Month[][];
}


export const MyDataContext = createContext<Timings | undefined>(undefined);
export const MyCalendarContext = createContext<Year | undefined>(undefined);
