import { useEffect, useRef, useState } from "react";
import "./MonthSelector.css";
interface MonthSelectorProps {
    senddata: (month: string) => void; // غيّر النوع حسب ما ترسله فعلاً
}

function MonthSelector({ senddata }: MonthSelectorProps) {
    const todayHijri_month =
        new Intl.DateTimeFormat("ar-SA-u-ca-islamic", {
            month: "long",
        }).format(new Date())
        ;
    const [selectedMonth, setSelectedMonth] = useState(todayHijri_month);
    const [isOpen, setIsOpen] = useState(false);
    const isfocus = useRef<HTMLUListElement>(null);
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
    const [filteredMonths, setFilteredMonths] = useState<string[]>([
        ...islamicMonths,
    ]);
    useEffect(() => {
        if (isOpen) {
            isfocus.current?.focus();
            // console.log("Aaaa");
        } else isfocus.current?.blur();
    }, [isOpen]);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        if (value == "") {
            setIsOpen(false);
            setTimeout(() => {
                setFilteredMonths([...islamicMonths]);
            }, 300);
        } else {
            setIsOpen(true);
            let updatedMonthList = [...islamicMonths];
            for (let index = 0; index < value.length; index++) {
                updatedMonthList = updatedMonthList.filter(
                    (month) => month.charAt(index) === value.charAt(index)
                );
            }
            setFilteredMonths([...updatedMonthList]);
        }
        setSelectedMonth(() => value);
        e.currentTarget.value = value;
    }
    function onblurhandelr() {
        if (isOpen) {
            setTimeout(() => setIsOpen(false), 200);
        }
    }
    function renderMonthSelector() {
        return (
            <div className="month-selector-container">
                <div className="month-input-container">
                    <input
                        onBlur={onblurhandelr}
                        className="month-input"
                        onChange={(e) => handleInputChange(e)}
                        type="text"
                        value={selectedMonth}
                    />
                    <div
                        className={`dropdown-toggle ${isOpen ? "dropdown-toggle--open" : ""
                            }`}
                        onClick={() => {
                            setIsOpen((prev) => !prev);
                        }}
                    ></div>
                    <ul
                        ref={isfocus}
                        onBlur={onblurhandelr}
                        className={`month-dropdown ${isOpen
                                ? "month-dropdown--open"
                                : "month-dropdown--closed"
                            }`}
                    >
                        {filteredMonths.map((month, index) => {
                            return (
                                <li
                                    className="month-item"
                                    key={index}
                                    onClick={() => {
                                        setSelectedMonth(() => month);
                                        setIsOpen(false);
                                    }}
                                >
                                    {month}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <input className="button" type="button" value="تأكيد" onClick={() => { senddata(selectedMonth) }} />
            </div>
        );
    }

    return renderMonthSelector();
}

export default MonthSelector;
