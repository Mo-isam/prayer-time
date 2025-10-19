/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Calendar from "./calendar";
import {  useEffect, useState } from "react";
import axios from "axios";
import { MyDataContext, MyCalendarContext, Year, Timings } from "./context/PrayerContext";

export default function Home() {
    const [prayerTimes, setPrayerTimes] = useState<Timings | undefined>();
    const [year, setYear] = useState<Year | undefined>();
    // const axios = require("axios");

    // Make a request for a user with a given ID
    useEffect(() => {
        axios
            .get(
                "https://api.aladhan.com/v1/timingsByAddress?address=cairo,eg&method=8"
            )
            .then(function (response: any) {
                // handle success
                setPrayerTimes(response.data.data.timings);
            })
            .catch(function (error: any) {
                // handle error

                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }, []);
    useEffect(() => {
        axios
            .get(
                "https://api.aladhan.com/v1/hijriCalendar/1447?latitude=30.0509245&longitude=+31.3336834&method=5&shafaq=general&tune=5%2C3%2C5%2C7%2C9%2C-1%2C0%2C8%2C-6&timezonestring=Africa%2FCairo&calendarMethod=HJCoSA%22%20%20-H%20%27accept:%20application/json"
            )
            .then(function (response: any) {
                // handle success
                setYear(response.data);
                console.log(response);

            })
            .catch(function (error: any) {
                // handle error

                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }, []);

    // useEffect(() => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(
    //             (position) => {
    //                 const latitude = position.coords.latitude; // خط العرض
    //                 const longitude = position.coords.longitude; // خط الطول
    //                 console.log("latitude:", latitude,"longitude: ", longitude);
    //             },
    //             (error) => {
    //                 console.error("خطأ في الحصول على الموقع:", error.message);
    //             }
    //         );
    //     } else {
    //         console.error("Geolocation غير مدعوم في هذا المتصفح.");
    //     }
    // }, []);
    return (
        <>
            <div>

                <MyCalendarContext.Provider value={year}>
                    <MyDataContext.Provider value={prayerTimes}>
                        <Calendar />
                    </MyDataContext.Provider>
                </MyCalendarContext.Provider>
            </div>
        </>
    );
}
