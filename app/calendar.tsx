"use client";
import { useContext, useEffect, useState } from "react";
import { myCalendardata } from "./page";
import styles from "./IslamicMonthsInput.module.css";
import MonthSelector from "./MonthSelector";
import Prayertime_display from "./prayertime-display";

interface days {
    hijri: number;
    hijri_name: string;
    gregorian: string;
    gregorian_month_name: string;
    gregorian_month_number: number;
    hijri_month_number: number;
}

function Name() {
    const [clicked, setClicked] = useState<number>(-1);
    const todayHijri_month = Number(
        new Intl.DateTimeFormat("en-SA-u-ca-islamic", {
            month: "numeric",
        }).format(new Date())
    );
    const [todayHijri_day, sethday] = useState(
        Number(
            new Intl.DateTimeFormat("en-SA-u-ca-islamic", {
                day: "numeric",
            }).format(new Date())
        )
    );
    const contex = useContext(myCalendardata);

    const [days, setdays] = useState<days[] | undefined>();
    // const monthref = useRef<HTMLSelectElement>(null);
    const [monthNumber, set] = useState(todayHijri_month);
    const islamicMonths = [
        "محرم",
        "صفر",
        "ربيع الأول",
        "ربيع الثاني",
        "جمادى الأولى",
        "جمادى الآخرة",
        "رجب",
        "شعبان",
        "رمضان",
        "شوال",
        "ذو القعدة",
        "ذو الحجة",
    ];
    const monthsArabic = [
        "يناير", // 1
        "فبراير", // 2
        "مارس", // 3
        "أبريل", // 4
        "مايو", // 5
        "يونيو", // 6
        "يوليو", // 7
        "أغسطس", // 8
        "سبتمبر", // 9
        "أكتوبر", // 10
        "نوفمبر", // 11
        "ديسمبر", // 12
    ];
    const [PrayerTimes, setPrayerTimes] = useState(
        contex?.data[monthNumber][1].timings
    );

    useEffect(() => {
        const vv = Number(
            contex?.data[todayHijri_month][todayHijri_day - 1].date.gregorian
                .day
        );
        const cc = new Date().getDate();
        console.log(todayHijri_day, vv, cc);

        if (vv) {
            sethday((prev) => prev + (cc - vv));
        }
    }, [contex, todayHijri_day, todayHijri_month]);

    useEffect(() => {
        console.log(todayHijri_day);
        setPrayerTimes(
            contex?.data[todayHijri_month][todayHijri_day - 1].timings
        );
    }, [contex?.data, todayHijri_day, todayHijri_month]);

    const Month = () => {
        useEffect(() => {
            const newdays: days[] = [];
            const monthday = Number(
                contex?.data[monthNumber][1].date.hijri.month.days
            );
            for (let index = 0; index < monthday; index++) {
                newdays.push({
                    hijri: index + 1,
                    hijri_name:
                        contex?.data[monthNumber][index].date.hijri.month.ar ??
                        "N/A",
                    hijri_month_number:
                        contex?.data[monthNumber][index].date.hijri.month
                            .number ?? 1,
                    gregorian:
                        contex?.data[monthNumber][index].date.gregorian.day ??
                        "N/A",
                    gregorian_month_name:
                        contex?.data[monthNumber][index].date.gregorian.month
                            .en ?? "N/A",
                    gregorian_month_number:
                        contex?.data[monthNumber][index].date.gregorian.month
                            .number ?? 0,
                });
            }
            setdays(() => [...newdays]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [contex, monthNumber]);

        return (
            <>
                {days?.map((v, index) => {
                    return (
                        <div
                            key={index}
                            className={`${
                                todayHijri_month == monthNumber
                                    ? todayHijri_day == v.hijri
                                        ? `${styles.today} ${styles.singleDay}`
                                        : styles.singleDay
                                    : styles.singleDay
                            } ${
                                clicked == index
                                    ? styles.clicked
                                    :clicked ==-1&& todayHijri_day == v.hijri && todayHijri_month == monthNumber
                                    ? styles.clicked
                                    : ""
                            }`}
                            onClick={() => {
                                setClicked(index);
                                setPrayerTimes(
                                    contex?.data[v.hijri_month_number][
                                        v.hijri - 1
                                    ].timings
                                );
                            }}
                        >
                            <p className={styles.hijriDate}>
                                {v.hijri}
                                <br />
                                {v.hijri_name}
                            </p>
                            <p className={styles.gregorianDate}>
                                {v.gregorian} <br />
                                {monthsArabic[v.gregorian_month_number - 1]}
                            </p>
                        </div>
                    );
                })}
            </>
        );
    };
    useEffect(() => {
        console.log(monthNumber);
    }, [monthNumber]);

    const startpoint = () => {
        const day = contex?.data[monthNumber][0].date.hijri.weekday.ar;
        const weakdays = [
            "السبت",
            "الاحد",
            "الاثنين",
            "الثلاثاء",
            "الاربعاء",
            "الخميس",
            "الجمعة",
        ];
        const co = new Array(7);
        co.fill(0, 0, weakdays.indexOf(day ?? ""));

        return co.map((v, i) => {
            return <div key={i}></div>;
        });
    };

    // const IslamicMonthsInput = () => {
    //     function asd() {
    //         const month1 = monthref.current?.value ?? "";
    //         set(islamicMonths.indexOf(month1) + 1);
    //         return;
    //     }

    //     return (
    //         <div className={styles.monthPickerContainer}>
    //             <label
    //                 htmlFor="islamic-month-select"
    //                 className={styles.monthPickerLabel}
    //             >
    //                 اختر شهرًا هجريًا
    //             </label>
    //             <select
    //                 ref={monthref}
    //                 onChange={asd}
    //                 id="islamic-month-select"
    //                 className={styles.monthPickerSelect}
    //                 defaultValue=""
    //             >
    //                 <option disabled>-- اختر شهرًا --</option>
    //                 {islamicMonths.map((month, index) => (
    //                     <option key={index} value={month}>
    //                         {month}
    //                     </option>
    //                 ))}
    //             </select>
    //         </div>
    //     );
    // };
    const getdata = (month: string) => {
        const monthnamber = islamicMonths.indexOf(month);
        set((prev) => (monthnamber != -1 ? monthnamber + 1 : prev));
        setClicked(-1)
    };
    return (
        <div className={styles.calendarWrapper}>
            <h1>أوقات الصلاة</h1>
            {PrayerTimes && <Prayertime_display mydata={PrayerTimes} />}
            <div>
                <MonthSelector senddata={getdata} />
            </div>
            {/* <div>{IslamicMonthsInput()}</div> */}
            <div className={styles.monthHeader}>
                <p>السبت</p>
                <p>الاحد</p>
                <p>الاثنين</p>
                <p>الثلاثاء</p>
                <p>الاربعاء</p>
                <p>الخميس</p>
                <p>الجمعة</p>
            </div>
            <div className={styles.daysWrapper}>
                {startpoint()}
                {Month()}
            </div>
        </div>
    );
}

export default Name;
