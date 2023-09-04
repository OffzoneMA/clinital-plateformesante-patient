import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

function AgendaWorkDays({ docId, component, setRdvData }) {
  const daysContainer = useRef();
  const agendaContainer = useRef();
  const scrTop = useRef();
  const scrBottom = useRef();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showAgenda, setShowAgenda] = useState(true);
  const navigate = useNavigate();
  const url_params = window.location.search;

  const [searchParams] = useSearchParams();
  const start_params = searchParams.get("start");
  const availableSlot_params = searchParams.get("availableSlot");
  const [availableSlot, setAvailabeSlot] = useState({
    time: availableSlot_params || "",
    day: start_params || "",
  });

  // Add zero to the date
  // const zeroFormatDate = (date) => {
  //   var newDate;
  //   const index = date.indexOf(":");

  //   if (index === 12 && date.length === 14)
  //     newDate = date.slice(0, index - 1) + "0" + date.slice(index - 1) + "0";
  //   if (index === 13 && date.length === 15) newDate = date + "0";
  //   if (index === 12 && date.length === 15)
  //     newDate = date.slice(0, index - 1) + "0" + date.slice(index - 1);

  //   return newDate;
  // };
  // Generat array with '-' on time box is empty
  const renderDaysTime = (array, maxL) => {
    var newArray = [];
    for (let i = 0; i < maxL; i++) {
      const element = array[i];
      newArray.push(element || "—");
    }
    return newArray;
  };
  // Days work time scroll onclick
  const scrollAgenda_Time = (way) => () => {
    const container = daysContainer.current;
    const top = container.scrollTop;
    const height = container.offsetHeight;

    container.scroll({
      top: way * height - 4.5 + top,
      left: 0,
      behavior: "smooth",
    });

    // Disable enable scroll btn
    daysContainer.current.addEventListener("scroll", (e) => {
      const container = e.target;
      const top = container.scrollTop;
      const height = container.querySelector(".day-time").offsetHeight;
      const heightContainer = daysContainer.current.offsetHeight;

      // To top btn
      top === 0
        ? scrTop.current.classList.add("disable")
        : scrTop.current.classList.remove("disable");
      // To top btn
      top + heightContainer + 1 >= height
        ? scrBottom.current.classList.add("disable")
        : scrBottom.current.classList.remove("disable");
    });
  };
  // Scroll to other week
  const scrollAgenda_Week = (way) => () => {
    const container = agendaContainer.current;
    const left = container.scrollLeft;
    // const width = container.offsetWidth;

    container.scroll({
      top: 0,
      left: way * 455.5 + left,
      behavior: "smooth",
    });

    way === 1 &&
      setweeks([
        ...weeks,
        fetchDayFormat(Number(weeks.length) * 7),
        fetchDayFormat((Number(weeks.length) + 1) * 7),
      ]);
  };
  // Get monday of the week
  function getMondayOfCurrentWeek(date) {
    const today = new Date(date);
    const first = today.getDate() - today.getDay() + 1;

    const monday = new Date(today.setDate(first));
    return monday;
  }
  // Format day date (day/moth)
  const fetchDayFormat = (index) => {
    const previous = new Date(new Date().getTime());
    previous.setDate(new Date().getDate() + index);
    const options = {
      year: "numeric",
      weekday: "short",
      month: "numeric",
      day: "2-digit",
    };

    const date = !index
      ? previous.toLocaleDateString("fr-FR", options)
      : getMondayOfCurrentWeek(previous).toLocaleDateString("fr-FR", options);

    const fetchDate =
      date.slice(-4) + "-" + date.slice(-7, -5) + "-" + date.slice(-10, -8);

    return fetchDate;
  };

  const [weeks, setweeks] = useState([
    fetchDayFormat(0 * 7),
    // fetchDayFormat(1 * 7),
  ]);

  // Scroll & Fetch
  useEffect(() => {
    // const weeks = [
    //   fetchDayFormat(0 * 7),
    //   fetchDayFormat(1 * 7),
    //   // fetchDayFormat(2 * 7),
    //   // fetchDayFormat(3 * 7),
    // ];

    weeks.length < 3 && setLoading(true);
    const fetchAgenda = () => {
      weeks.forEach(async (week) => {
        try {
          const res = await axios.get(
            `https://apidb.clinital.io/api/med/agenda/${docId}/1/${week}`
          );
          const resultat = res.data;
          setData((x) => {
            return { ...x, [week]: resultat };
          });
          setLoading(false);
        } catch (error) {
          setLoading(false);
          toast.error(error.message);
          console.log(error);
        }
      });
    };

    fetchAgenda();

    // console.log(weeks);
  }, [weeks, docId]);
  // Sort weeks (result) by date
  const sortData = () => {
    const dataSorted = Object.values(data);
    // const dataSorted = Object.values(data).sort(
    //   (a, b) =>
    //     new Date(stringToDate(a[0][0].workingDate)) -
    //     new Date(stringToDate(b[0][0].workingDate))
    // );
    return dataSorted;
  };
  // console.log(Object.values(data));
  const stringToDate = (dateString) => {
    const year = +dateString.substring(0, 4);
    const month = +dateString.substring(5, 7);
    const day = +dateString.substring(8, 10);
    const date = new Date(year, month - 1, day);
    return date;
  };
  // Format work time (add 0 to left or right or both)
  const formatTime = (time, symbole) => {
    var newTime;
    const length = time.length;
    const indexDoth = time.indexOf(symbole);
    if (indexDoth === 1 && length === 3) newTime = `0${time}0`;
    if (indexDoth === 1 && length === 4) newTime = `0${time}`;
    if (indexDoth === 2 && length === 4) newTime = `${time}0`;
    if (indexDoth === 3 && length === 4) newTime = `${time}0`;
    if (length === 5) newTime = time;
    if (length === 1) newTime = time;
    if (indexDoth === 1 && length === 3 && symbole === "/")
      newTime = `0${time.slice(0, 2)}0${time.slice(-1)}`;
    if (indexDoth === 2 && length === 4 && symbole === "/")
      newTime = `${time.slice(0, 3)}0${time.slice(-1)}`;
    return newTime;
  };
  // Format day date (day/moth)
  const getOtherDay = (index, firstDay) => {
    var day = stringToDate(firstDay);
    var nextDay = new Date(day);
    nextDay.setDate(day.getDate() + Number(index));
    const newDatee = formatTime(
      nextDay.getDate() + "/" + (nextDay.getMonth() + 1),
      "/"
    );
    // console.log(newDatee);
    return newDatee;
  };




  // Add Hours or 20min
  const addTime = (numOfHours, date) => {
    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
    const year = date.toString().slice(11, 15);
    const month =
      date.getMonth().toString().length !== 1
        ? date.getMonth()
        : "0" + date.getMonth();
    const day =
      date.getDay().toString().length !== 1
        ? date.getDay()
        : "0" + date.getDay();
    const hour =
      date.getHours().toString().length !== 1
        ? date.getHours()
        : "0" + date.getHours();
    const minute =
      date.getMinutes().toString().length !== 1
        ? date.getMinutes()
        : "0" + date.getMinutes();
    const xxx = year + "-" + month + "-" + day + "T" + hour + ":" + minute;
    return xxx;
  };
  // Toggle time value
  const toggleTime = (comp, time, day, dayName) => () => {
    const star = day[0].value.slice(0, 11) + time;
    const end = addTime(1 / 3, new Date(day[0].value.slice(0, 11) + time));
    setAvailabeSlot({ time: time, day: day[0].value });
    if (comp === "doctorResult")
      navigate(
        `prise-rdv/${url_params}&id=${docId}&day=${dayName}&start=${star}&end=${end}&availableSlot=${time}`
      );
    if (comp === "priseRdv") {
      setRdvData((x) => {
        return {
          ...x,
          start: star,
          end: end,
          day: dayName,
        };
      });
    }
  };
  // ---------------------

  // Check if doc have time
  // useEffect(() => {
  //   setShowAgenda(true);
  // if (data[fetchDayFormat(0 * 7)]) {
  //   const medTable = data[fetchDayFormat(0 * 7)][0].medecinTimeTable;
  //   medTable[0] ? setShowAgenda(true) : setShowAgenda(false);
  // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [data]);

  console.log(sortData());
  // ---------------------

  return (
    <div className="agenda-work-days">
      {loading ? (
        "Loading..."
      ) : showAgenda ? (
        <div className="agenda-wrapper">
          <div className="btns">
            <button onClick={scrollAgenda_Week(-1)}>
              <svg
                width="12"
                height="6"
                viewBox="0 0 12 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.33203 0.5L6.33203 5.5L11.332 0.5"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button onClick={scrollAgenda_Week(1)}>
              <svg
                width="12"
                height="6"
                viewBox="0 0 12 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.33203 0.5L6.33203 5.5L11.332 0.5"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="agenda-container" ref={agendaContainer}>
            <div className="agenda-header">
              <div className="days-container">
                {sortData().map((week) =>
                  week.map((x, d_Index) => (
                    <div key={d_Index} className="day-content">
                      <strong>{x.day.slice(0, 1)}</strong>
                      <span>
                        {getOtherDay(
                          d_Index,
                          week[0].medecinTimeTable[0].value
                        )}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="days-time-container" ref={daysContainer}>
              {sortData().map((week) =>
                week.map((x, index) => (
                  <div key={index} className="day-time">
                    {renderDaysTime(x.availableSlot, 13).map((time, indexx) => (
                      <span
                        key={indexx}
                        onClick={toggleTime(
                          component,
                          time,
                          x.medecinTimeTable,
                          x.day
                        )}
                        className={
                          time === "—"
                            ? "empty"
                            : time === availableSlot.time &&
                              x.medecinTimeTable[0].value === availableSlot.day
                            ? "active-time"
                            : ""
                        }
                      >
                        {formatTime(time, ":")}
                      </span>
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="btns-scroll">
            <button
              className="disable"
              onClick={scrollAgenda_Time(-1)}
              ref={scrTop}
            >
              <svg
                width="12"
                height="6"
                viewBox="0 0 12 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.33203 0.5L6.33203 5.5L11.332 0.5"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button onClick={scrollAgenda_Time(1)} ref={scrBottom}>
              <svg
                width="12"
                height="6"
                viewBox="0 0 12 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.33203 0.5L6.33203 5.5L11.332 0.5"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Plus d’horaires</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="agenda-warning">
          <img src="../../icons/warning.svg" alt="" />
          <span>Ce médecin n’est pas encore sur Clinital</span>
        </div>
      )}
    </div>
  );
}

export default AgendaWorkDays;
