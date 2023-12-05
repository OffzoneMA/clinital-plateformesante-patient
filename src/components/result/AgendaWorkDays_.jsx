import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DateObject from "react-date-object";
import { getScheduls } from "../../action/Rdv";
import LoginModal from "../Modals/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { setLoginToggle } from "../../utils/redux/GlobalSlice";

function AgendaWorkDays({ docId, component, state }) {
  const dispatch=useDispatch();
  // Reference
  const scrTop = useRef();
  const scrBottom = useRef();
  const daysContainer = useRef();
  const agendaContainer = useRef();

  // States
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [agendaStatus, setAgendaStatus] = useState(false);
  const [maxSlot, setMaxSlot] = useState([]);
  const user=useSelector((state)=>state.global.user)
  // Navigation
  const navigate = useNavigate();
  const url_params = window.location.search;

  // Params
  const [searchParams] = useSearchParams();
  const start_params = searchParams.get("start");
  const availableSlot_params = searchParams.get("availableSlot");
  const [availableSlot, setAvailabeSlot] = useState({
    time: availableSlot_params || "",
    day: start_params ? start_params.slice(0, 10) : "",
  });

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

    container.scroll({
      top: 0,
      left: way * 455.5 + left,
      behavior: "smooth",
    });

    way === 1 &&
      setweeks([
        ...weeks,
        generateWeek(Number(weeks.length)),
        generateWeek(Number(weeks.length) + 1),
      ]);
  };

  // Convert Data to array
  const sortData = () => {
    var $data = [];
    const arr = Object.values(data);
    arr.map( (week) => {
      const filteredArr = week.reduce((acc, current) => {
        const x = acc.find(item => item.day === current.day);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
      $data.push(filteredArr)
    })
    return $data;
  };

  // Get all days of the week
  const generateWeek = (week) => {
    var $week = [];
    for (let i = 0; i < 7; i++) {
      const day = new DateObject().add(week * 7, "d");
      const $day = day.toFirstOfWeek().add(1 + i, "d");
      $week.push({
        name: $day.weekDay.name,
        date: $day.format("YYYY-MM-DD"),
        formatedDate: $day.format("MM/DD"),
      });
    }
    return $week;
  };

  // Weeks to render
  const [weeks, setweeks] = useState([generateWeek(0), generateWeek(1)]);

  // Fetch schedules
  useEffect(() => {
    getScheduls(docId, weeks, setData, setLoading)
  }, [weeks, docId]);

  // Get max availableSlot & render Agenda if there is slots
  useEffect(() => {
    // Get max slots and push to an array
    const getMaxSlot = () => {
      var slots = [];
      // Push all slot to slots
      sortData().forEach((week) =>
        week.forEach((day) => slots.push(day.availableSlot.length))
      );

      // Get the max slots for all days
      const max =
        sortData().length > 0 &&
        slots.length > 0 &&
        slots.reduce((a, b) => (a > b ? a : b));

      // Show agenda if the doc is dispo
      setAgendaStatus(Boolean(max));

      // Push all slots & empty slot to array & return it
      var array = [];
      for (let i = 0; i < Math.max(max, 5); i++) array.push("");

      return array;
    };
    setMaxSlot(getMaxSlot());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const toggleDach = (array) => {
    var $array = [...array];
    const length = maxSlot.length - $array.length;
    for (let i = 0; i < length + 1; i++) {
      $array.push("—");
    }
    return $array;
  };
  // ---------------------

  // Rdv Actions
  const addTime = (workingDate, availableSlot, duration) => {
    // const $duration = duration.slice(-2) * 1;
    const hour = availableSlot.slice(0, 2) * 1;
    const minute = availableSlot.slice(3, 5) * 1;

    const day_ = workingDate
      .replaceAll("-", " ")
      .replaceAll("T", " ")
      .replaceAll(":", " ");

    const day = new DateObject(day_).add(hour, "hours").add(minute, "minute");
    const $start = day.format(`YYYY-MM-DDThh:mm a`);
    const $end = day.add(duration, "m").format(`YYYY-MM-DDThh:mm a`);
    const start =
      $start.slice(-2, -1) === "p"
        ? $start.slice(0, 11) +
          (Number($start.slice(11, 13)) + 12) +
          $start.slice(13, 16)
        : $start.slice(0,16);
    const end =
      $end.slice(-2, -1) === "p"
        ? $end.slice(0, 11) +
          (Number($end.slice(11, 13)) + 12) +
          $end.slice(13, 16)
        : $end.slice(0,16);

    // console.log(start.slice(-2, -1));
    // console.log(
    //   start.slice(-2, -1) === "a"
    //     ? start.slice(0, 11) +
    //         (Number(start.slice(11, 13)) + 12) +
    //         start.slice(13, 16)
    //     : start.slice(0, 11) + start.slice(11, 16)
    // );

    // console.log(availableSlot.length > 0 && { start: start, end: end });

    // console.log(new DateObject(day_).add(hour, "h").format(`YYYY-MM-DDThh:mm `));

    return { start: start, end: end };
  };
  // Toggle time value
  const toggleTime = (comp, time, day, dayName, duration) => {
    const star = addTime(day, time, duration).start;
    const end = addTime(day, time, duration).end;
    setAvailabeSlot({ time: time, day: day.slice(0, 10) });
    if (comp === 'rdvPopup') {
      state(
        { 
          medecinid: docId,
          start: star,
          end: end,
          // day: dayName.toUpperCase()
        }
      );
        navigate('')
    }
    if (comp === "doctorResult")

      navigate(
        `prise-rdv/${url_params}&id=${docId}&day=${dayName.toUpperCase()}&start=${star}&end=${end}&availableSlot=${time}`
      );
    if (comp === "priseRdv") {
      state((x) => {
        return {
          ...x,
          start: star,
          end: end,
          day: dayName.toUpperCase(),
        };
      });
    }
  };
  // ---------------------

  // ---------------------
  // console.log(sortData());
  // console.log(sortData(), maxSlot);
  // console.log(toggleDach(weeks[0].availableSlot));
  // console.log(data);
  // console.log(weeks);
  // console.log('2022/10/11T08:20'.slice(0,10));
  // console.log(availableSlot);
  // console.log(new DateObject().format(`YYYY-MM-DDThh:mm pm`));

  // addTime_("2020 08 21 10 55", "08:00", "MIN20");
  // addTime("2022-10-11T00:00:00", "08:00", "MIN20");
  // You might want to redirect to a login page or remove the invalid token.

  return (
    <>

    <div className="agenda-work-days">
      {loading ? (
        "Loading..."
      ) : agendaStatus ? (
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
                {weeks.map((week, index) => {
                  return week.map((day, index_) => {
                    return (
                      <div key={index + index_} className="day-content">
                        <strong>{day.name.slice(0, 1)}</strong>
                        <span>{day.formatedDate}</span>
                      </div>
                    );
                  });
                })}
              </div>
            </div>

            <div className="days-time-container" ref={daysContainer}>
              {weeks.map((week) =>
                week.map((day, indexDay) => (
                  <div key={indexDay} className="day-time">
                    {sortData().map(($week) => {
                      return $week.map(
                        ($day) =>
                          day.date === $day.workingDate.slice(0, 10) &&
                          toggleDach($day.availableSlot).map(
                            (slot, $indexSlot) => (
                              <span
                                onClick={()=>{
                                  user ? 
                                  toggleTime(
                                  component,
                                  slot,
                                  $day.workingDate,
                                  day.name,
                                  $day.period
                                    ? Number($day.period.slice(3, 5))
                                    : 0
                                ):dispatch(setLoginToggle(true))
                           
                                } }
                                
                                index={$indexSlot}
                                className={
                                  (slot === "—" || slot ===  'Reserved' || slot.length > 5)
                                    ? "empty"
                                    : slot === availableSlot.time &&
                                    availableSlot.day ===
                                    $day.workingDate.slice(0, 10)
                                    ? "active-time"
                                    : ""
                                }
                              >
                              {console.log(user)}
                                {slot ===  'Reserved' || slot.length > 5 ? '—' : slot}
                              </span>
                            )
                          )
                      );
                    })}
                  </div>
                ))
              )}
              {/* {sortData().map((week, indexWeek) =>
              week.map((day, indexDay) => (
                <div key={indexDay} className="day-time">
                  {toggleDach(day.availableSlot).map((slot, indexSlot) => (
                    <span
                      index={indexSlot}
                      className={slot === "-" ? "empty" : ""}
                    >
                      {slot}
                    </span>
                  ))}
                </div>
              ))
            )} */}

              {/* {weeks.map((week) => {
              return week.map((day, index) => (
                <div key={index} className="day-time">
                  {maxSlot.map((x, index_) =>
                    sortData().map((week) =>
                      week.map((dispoDay, index__) => {
                        return (
                          dispoDay.workingDate.slice(0, 10) === day.date &&
                          toggleDach(dispoDay.availableSlot).map(
                            (slot, slotIndex) => {
                              return (
                                <span key={slotIndex} className={""}>
                                  {slot}
                                </span>
                              );
                            }
                          )
                        );
                      })
                    )
                  )}
                </div>
              ));
            })} */}
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
        <>
          <div className="agenda-next-rdv">
            <span>Aucune disponibilité en ligne</span>
          </div>
          <img
            src="../../images/agendaScreen.png"
            className="testtest"
            alt=""
          />
        </>
      )}
    </div>
    </>
  );
}

export default AgendaWorkDays;
