"clint use";

import { useEffect, useRef, useState } from "react";

interface t {
    name: string;
    time?: string;
}
interface timings {
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
interface Props {
    mydata: timings | undefined;
}
function Display({ mydata }: Props) {
    const [current_pray, settime] = useState<t>();
    const [xxx, setx] = useState(9999999);
    const [timings, settimeings] = useState<t[]>();
    useEffect(() => {
        settimeings([
            { name: "الفجر", time: mydata?.Fajr.slice(0, 5) },
            { name: "الظهر", time: mydata?.Dhuhr.slice(0, 5) },
            { name: "العصر", time: mydata?.Asr.slice(0, 5) },
            { name: "المغرب", time: mydata?.Maghrib.slice(0, 5) },
            { name: "العشاء", time: mydata?.Isha.slice(0, 5) },
        ]);
    }, [mydata]);

    function tomints(params: string) {
        const hour = Number(params.slice(0, 2)) * 3600;
        const minutes = Number(params.slice(3, 5)) * 60;
        const seconds = Number(params.slice(6, 8));

        return hour + minutes + seconds;
    }
    function minutesToTimeString(totalSeconds: number) {
        const sign = Math.sign(totalSeconds) === -1 ? "-" : "+";
        totalSeconds = Math.abs(totalSeconds);
        const hours = Math.floor(totalSeconds / 3600);
        const remainingSeconds = totalSeconds % 3600;
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = Math.floor(remainingSeconds % 60);

        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
            2,
            "0"
        )}:${String(seconds).padStart(2, "0")} ${sign}`;
    }
    const Test = () => {
        const time_deff = useRef(0);
        // const hour = useRef(tomints("00:59:26"));
        const hour = useRef(
            tomints(
                `${new Date().toLocaleTimeString("en-us", {
                    hour: "2-digit", // '2-digit' or 'numeric'
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false, // 12-hour format (false for 24-hour)
                })}`
            )
        );
        const pray_hour = useRef(0);
        const m = useRef(0);

        useEffect(() => {
            if (timings) {
                hour.current = tomints(
                    `${new Date().toLocaleTimeString("en-us", {
                        hour: "2-digit", // '2-digit' or 'numeric'
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false, // 12-hour format (false for 24-hour)
                    })}`
                );

                let y = -1;
                time_deff.current = 999999;

                for (const element in timings) {
                    const new_pray = tomints(timings[element].time ?? "");
                    const a = hour.current - new_pray;
                    const b = 86400 - Math.abs(hour.current - new_pray);
                    const c = Math.abs(a) < Math.abs(b) ? a : b;
                    if (Math.abs(c) < Math.abs(time_deff.current)) {
                        time_deff.current = c;
                        pray_hour.current = new_pray;
                        y = Number(element);
                    }
                }

                settime(timings[y]);

                if (true) {
                    if (y < 4) {
                        m.current =
                            (tomints(timings[y + 1].time ?? "") -
                                tomints(timings[y].time ?? "")) /
                            2;
                    } else {
                        m.current =
                            (86400 -
                                (tomints(timings[y].time ?? "") -
                                    tomints(timings[0].time ?? ""))) /
                            2;
                    }
                }
                setx(time_deff.current);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [timings, xxx == 0, Math.abs(m.current) == xxx]);
        useEffect(() => {
            const interval = setInterval(() => {
                if (hour.current < 86400) {
                    ++hour.current;
                } else {
                    hour.current = 0;
                }
                setx((prev) => prev + 1);
            }, 1000);

            return () => clearInterval(interval);
        }, []);

        return (
            <>
                <div className="prayer-time-container">
                    <h2 className="prayer-name">{current_pray?.name}</h2>
                    <p className="prayer-time">{current_pray?.time}</p>
                    <h2 className={xxx < 0 ? "time-remaining" : "elapsed-time"}>
                        {minutesToTimeString(xxx)}
                    </h2>
                </div>
            </>
        );
    };

    return (
        <>
            <div>{Test()}</div>
            <div className="calendarWrapper">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>الصلاة</th>
                            <th>وقت الصلاه</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>الفجر</td>
                            <td>{mydata?.Fajr.slice(0, 5)}</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>الظهر</td>
                            <td>{mydata?.Dhuhr.slice(0, 5)}</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>العصر</td>
                            <td>{mydata?.Asr.slice(0, 5)}</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>المغرب</td>
                            <td>{mydata?.Maghrib.slice(0, 5)}</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>العشاء</td>
                            <td>{mydata?.Isha.slice(0, 5)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}
export default Display;
