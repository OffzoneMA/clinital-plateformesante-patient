import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import MonthCalendar from "./MonthCalendar";
import RdvItemAgenda from "./RdvItemAgenda";
import CONSTANTS from "../../constant/constant";

function Calendar({ rdvs, setAgendaIsChanging }) {
  const daysMain = useRef();
  const daysContainer = useRef();
  const [option, setOption] = useState("week");
  const [onChangeMonth, setOnChangeMonth] = useState();
  const toggleOption = (option) => () => setOption(option);

  // Time functions-----------
  const getMondayOfCurrentWeek = () => {
    const today = new Date();
    const first = today.getDate() - today.getDay() + 1;

    const monday = new Date(today.setDate(first));
    return monday;
  };
  const getAllDaysOfWeek = (current) => {
    var week = [];
    // Starting Monday not Sunday
    current.setDate(current.getDate() - current.getDay() + 1);
    for (var i = 0; i < 7; i++) {
      week.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return week;
  };
  const getNextDay = (current, index) => {
    return new Date(current.setDate(current.getDate() + index));
  };
  // ----------------------

  // The monday of the week
  const thisMonday = getMondayOfCurrentWeek();

  // Generate week
  const [weekCont, setWeekCont] = useState(0);
  const weeks = [
    getAllDaysOfWeek(getNextDay(thisMonday, 7 * weekCont * -2)),
    getAllDaysOfWeek(getNextDay(thisMonday, 7 * weekCont * 1)),
  ];
  // -------------

  // Generate Days
  const [daysCont, setDaysCont] = useState(0);
  const days = [
    [getNextDay(new Date(), daysCont - 1)],
    [getNextDay(new Date(), daysCont)],
  ];
  // -------------

  // Toggle week & generate animation
  const nextOrPrev = (way) => () => {
    option === "week" && setWeekCont((x) => x - way);
    option === "day" && setDaysCont((x) => x + way);
    setAgendaIsChanging(Math.random());

    if (option === "month") {
      const prevBth = document.querySelector(
        ".react-calendar__navigation__prev-button"
      );
      const nextBth = document.querySelector(
        ".react-calendar__navigation__next-button"
      );
      way === -1 && prevBth.click();
      way === 1 && nextBth.click();
      // makeSomeChanges();
      setOnChangeMonth(Math.random());
    }

    // const scrollFun =
    //   option === "day"
    //     ? days
    //     : option === "week"
    //     ? weeks
    //     : option === "month"
    //     ? ""
    //     : "";
    if (option !== "month") {
      const prevWeek = daysContainer.current.querySelector(".prevWeek");
      const currentWeek = daysContainer.current.querySelector(".currentWeek");
      const prevWeekDay = daysMain.current.querySelector(".prevWeekDay");
      const currentWeekDay = daysMain.current.querySelector(".currentWeekDay");
      const rdvs = [...daysMain.current.querySelectorAll(".rdv-item")];

      prevWeek.style = `animation: ${
        way === -1 ? "hideLeft" : "hideRight"
      } 200ms forwards `;
      currentWeek.style = `animation: ${
        way === -1 ? "showWeekLeft" : "showWeekRight"
      } 200ms forwards `;
      prevWeekDay.style = `animation: ${
        way === -1 ? "hideLeft" : "hideRight"
      } 200ms forwards `;
      currentWeekDay.style = `animation: ${
        way === -1 ? "showWeekLeft" : "showWeekRight"
      } 200ms forwards `;
      rdvs.forEach(
        (rdv) => (rdv.style = `animation: rdvShow 400ms forwards ease`)
      );
    }
  };
  // Remove animation
  const removeAnimation = (e) => e.target.style = "animation: none;";

  const rdvType = (rdv) => {
    const today = new Date().getTime();
    const tomorrow_ = new Date(new Date());
    const rdvStart = new Date(rdv.start).getTime();
    const tomorrow = tomorrow_.setDate(tomorrow_.getDate() + 1);
    var isClass;
    rdvStart > tomorrow && (isClass = "normal-rdv");
    rdvStart < tomorrow && today < rdvStart && (isClass = "close-rdv");
    today > rdvStart && (isClass = "passed-rdv");
    today > rdvStart && rdv.statut === CONSTANTS.RDV_STATE.ANNULE && (isClass = "annule-passed-rdv");
    rdvStart > tomorrow && rdv.statut === CONSTANTS.RDV_STATE.ANNULE && (isClass = "annule-normal-rdv");
    rdvStart < tomorrow && today < rdvStart && rdv.statut === CONSTANTS.RDV_STATE.ANNULE && (isClass = "annule-close-rdv");
    // rdvStart > tomorrow && rdv.statut === "ANNULE" && (isClass = "annule-normal-rdv");
    return isClass;
  };

  // Render the RDV or not
  const isRdvInThisDay = (rdv, day, time) => {
    const start = rdv.start.slice(0, 10);
    const _year = day.toString().slice(11, 15);
    const _day = day.toString().slice(8, 10);
    const _month =
      (day.getMonth() + 1).toString().length === 1
        ? "0" + (day.getMonth() + 1)
        : day.getMonth() + 1;

    const __day = _year + "-" + _month + "-" + _day;
    const _hour = rdv.start.slice(11, 13);
    const _dayHour = time.slice(0, 2);

    return __day === start && _hour === _dayHour;
  };
  // Render calendar with the selected option
  const renderOption = () => {
    const array =
      option === "day"
        ? days
        : option === "week"
        ? weeks
        : option === "month"
        ? ""
        : "";
    return array;
  };

  useEffect(() => {
    localStorage.setItem("month", weeks[0][6].getMonth() + 1);
  });

  return (
    <div className="agenda-content">
      <div className="nav">
        <div>
          <h2>Mon agenda</h2>
          <button><Link to='/'>Prendre Un RDV</Link></button>
        </div>
        <div>
          <span
            onClick={toggleOption("day")}
            className={option === "day" ? "activeSpan" : ""}
          >
            Jour
          </span>
          <span
            onClick={toggleOption("week")}
            className={option === "week" ? "activeSpan" : ""}
          >
            Semaine
          </span>
          <span
            onClick={toggleOption("month")}
            className={option === "month" ? "activeSpan" : ""}
          >
            Mois
          </span>
        </div>
      </div>
      <div className="calendar">
      <div className="calendar-wrapper">
      <div
            className={`calendar-wrapper-header ${
              option === "month" ? "calendar-wrapper-header-month" : ""
            }`}
          >
    <div className="row w-100 d-flex">
      <div className="col-1 p-0"><div className="left-btn">
              <button onClick={nextOrPrev(-1)}>
                <img src="../../icons/flech-black.svg" alt="" />
              </button>
              <div className="scrollHidder"></div>
            </div></div>
      <div className="col-10 p-0">{option !== "month" ? (
              <div className="days-container" ref={daysContainer}>
                <div className="container">
                  {renderOption().map((week, index) => (
                    <div
                      onAnimationEnd={removeAnimation}
                      className={`week ${
                        index === 0 ? "prevWeek" : "currentWeek"
                      }`}
                      key={index}
                    >
                      {week.map((day, index_) => (
                        <div
                          className={`day ${
                            new Date().toString() === day.toString()
                              ? "today"
                              : ""
                          }`}
                          key={index_}
                        >
                          <span>{day.toString().slice(0, 3)}</span>
                          <strong>
                            {day.toString().slice(8, 10) +
                              "/" +
                              day.toString().slice(4, 7)}
                          </strong>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <MonthCalendar
                setAgendaIsChanging={setAgendaIsChanging}
                rdvType={rdvType}
                rdvs={rdvs}
                onChangeMonth={onChangeMonth}
              />
            )}</div>
      <div className="col-1 p-0"><div className="right-btn">
              <button onClick={nextOrPrev(1)}>
                <img src="../../icons/flech-black.svg" alt="" />
              </button>
            </div></div>
    </div>
    </div>
    
  
      {/* <div className="calendar">
        <div className="calendar-wrapper">
          <div
            className={`calendar-wrapper-header ${
              option === "month" ? "calendar-wrapper-header-month" : ""
            }`}
          >
            <div className="left-btn">
              <button onClick={nextOrPrev(-1)}>
                <img src="../../icons/flech-black.svg" alt="" />
              </button>
              <div className="scrollHidder"></div>
            </div>

            {option !== "month" ? (
              <div className="days-container" ref={daysContainer}>
                <div className="container">
                  {renderOption().map((week, index) => (
                    <div
                      onAnimationEnd={removeAnimation}
                      className={`week ${
                        index === 0 ? "prevWeek" : "currentWeek"
                      }`}
                      key={index}
                    >
                      {week.map((day, index_) => (
                        <div
                          className={`day ${
                            new Date().toString() === day.toString()
                              ? "today"
                              : ""
                          }`}
                          key={index_}
                        >
                          <span>{day.toString().slice(0, 3)}</span>
                          <strong>
                            {day.toString().slice(8, 10) +
                              "/" +
                              day.toString().slice(4, 7)}
                          </strong>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <MonthCalendar
                setAgendaIsChanging={setAgendaIsChanging}
                rdvType={rdvType}
                rdvs={rdvs}
                onChangeMonth={onChangeMonth}
              />
            )}
            <div className="right-btn">
              <button onClick={nextOrPrev(1)}>
                <img src="../../icons/flech-black.svg" alt="" />
              </button>
            </div>
          </div>
          */}
          {option !== "month" && (
            <div className="calendar-wrapper-content">
            <div className="row w-100 d-flex">
              <div className="container p-0">
              <div className="col-1 p-0">
                <div className="times-container">
                  {CONSTANTS.TIME.map((x, index) => (
                    <span className="time ms-auto" key={index}>
                      {x}
                    </span>
                  ))}
                </div>
                </div>
                <div className="col-10 me-auto p-0">
                <div className="calendar-wrapper-content-main " ref={daysMain}>
                  {renderOption().map((week, index) => (
                    <div
                      key={index}
                      onAnimationEnd={removeAnimation}
                      className={`weekDays ${
                        index === 0 ? "prevWeekDay" : "currentWeekDay"
                      }`}
                    >
                      {week.map((xx, index_) => (
                        <div className={`day-container`} key={index_}>
                          {CONSTANTS.TIME.map((x, index) => (
                            <div
                              className={`day-box ${
                                option === "day" ? "day-option" : ""
                              }`}
                              key={index}
                            >
                              {rdvs.map(
                                (rdv, _index) =>
                                  isRdvInThisDay(rdv, xx, x) && (
                                    <RdvItemAgenda
                                      rdvType={rdvType}
                                      key={_index}
                                      rdv={rdv}
                                    />
                                  )
                              )}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                </div>
              </div>
              {rdvs.some( rdv => rdv.statut === CONSTANTS.RDV_STATE.ANNULE_DOC ) && <div className="rdv-annule-doc-label">Rendez-vous annulé</div>}
            </div>
            </div>  
          )}
          </div>                          
      </div>
    </div>
  );
}

export default Calendar;
