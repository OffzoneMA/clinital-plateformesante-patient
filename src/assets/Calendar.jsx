import React, { useEffect, useRef, useState } from "react";
import { rdv } from "./data/data";

function Calendar() {
  const calendar = useRef();
  const day = useRef();
  const [q, setQ] = useState(0);

  const [mothDays, setMothDays] = useState([]);

  const tranBtn = (dir) => {
    if (dir > 0) {
      q >= 0 && q < 25 && setQ((x) => ++x);
    } else {
      q > 0 && setQ((x) => --x);
    }
  };

  function todayDate(x) {
    const previous = new Date(new Date().getTime());
    previous.setDate(new Date().getDate() + x);
    const options = {
      weekday: "short",
      month: "numeric",
      day: "2-digit",
    };
    return previous.toLocaleDateString("fr-FR", options);
  }

  useEffect(() => {
    function getPreviousDay(date, day) {
      const previous = new Date(date.getTime());
      previous.setDate(date.getDate() + day);
      const options = {
        weekday: "short",
        month: "numeric",
        day: "2-digit",
      };
      return previous.toLocaleDateString("fr-FR", options);
    }
    for (let i = -24; i < 7; i++) {
      setMothDays((x) => {
        return [...x, getPreviousDay(new Date(), i)];
      });
    }
  }, []);

  useEffect(() => {
    const dayWight = day.current.offsetWidth;
    calendar.current.style = `transform: translateX(${q * dayWight}px)`;
  }, [q]);

  const uniqueDate = () => {
    return [...new Set(mothDays)];
  };

  const time = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
  ];

  return (
    <div className="agenda-content">
      <div className="nav">
        <div>
          <h2>Mon agenda</h2>
          <button>Prendre Un RDV</button>
        </div>
        <div>
          <span>Jour</span>
          <span className="activeSpan">Semaine</span>
          <span>Mois</span>
        </div>
      </div>
      <div className="calendar">
        <div className="calendar-wrapper">
          <div className="left-btn">
            <button
              onClick={() => tranBtn(1)}
              className={`${q === 25 ? "disable" : ""}`}
            >
              <img src="../icons/flech-black.svg" alt="" />
            </button>
            <div className="time">
              {time.map((x, index) => (
                <span key={index}>{x}</span>
              ))}
            </div>
          </div>

          <div className="calendar-container">
            <div className="container" ref={calendar}>
              <div className="day-item" ref={day}>
                <div className="day">
                  <span>{todayDate(-25).slice(0, 3)}</span>
                  <span>
                    <strong>{todayDate(-25).slice(-5)}</strong>
                  </span>
                </div>
                {time.map((item, index) => (
                  <div key={index} className="time-item">
                    {rdv.map((element, index) => {
                      if (
                        element.date === todayDate(-25).slice(-5) &&
                        element.time === item
                      ) {
                        return (
                          <div className="rdv" key={index}>
                            <div>
                              <h5>{element.name}</h5>
                              <p>{element.time}</p>
                            </div>
                            <button>
                              <div>Lorem</div>
                            </button>
                          </div>
                        );
                      }
                    })}
                  </div>
                ))}
              </div>

              {uniqueDate().map((x, index) => {
                return (
                  <div key={index} className="day-item" ref={day}>
                    <div className={`day ${x === todayDate(0) ? "today" : ""}`}>
                      <span>{x.slice(0, 3)}</span>
                      <span>
                        <strong>{x.slice(-5)}</strong>
                      </span>
                    </div>

                    {time.map((item, index) => (
                      <div key={index} className="time-item">
                        {rdv.map((element, index) => {
                          if (
                            element.date === x.slice(-5) &&
                            element.time === item
                          ) {
                            return (
                              <div className="rdv" key={index}>
                                <div>
                                  <h5>{element.name}</h5>
                                  <p>{element.time}</p>
                                </div>
                                <button>
                                  <div>Lorem</div>
                                </button>
                              </div>
                            );
                          }
                        })}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="right-btn">
            <button
              onClick={() => tranBtn(-1)}
              className={`${q === 0 ? "disable" : ""}`}
            >
              <img src="../icons/flech-black.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
