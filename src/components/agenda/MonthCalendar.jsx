import React from "react";
import { useEffect } from "react";
import { Calendar } from "react-calendar";
import { useNavigate } from "react-router-dom";

function MonthCalendar({ rdvs, onChangeMonth, rdvType }) {
  const navigate = useNavigate()
  let month;
  // Sort rdvs by date
  const sortedRdvs = rdvs.sort(function (a, b) {
    return new Date(a.start) - new Date(b.start);
  });

  // Custom calendar
  const makeSomeChanges = () => {
    const monthNames = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ];
    const allDays = [
      ...document.querySelectorAll(".react-calendar__month-view__days abbr"),
    ];

    // Highlight today
    const isToday = () => {
      const today = new Date();
      const todayFormated =
        today.getDate() +
        " " +
        monthNames[today.getMonth()] +
        " " +
        today.getFullYear();
      allDays.forEach(
        (abbr) =>
          abbr.getAttribute("aria-label") === todayFormated.toLowerCase() &&
          abbr.classList.add("today")
      );
    };
    // get Month
    const isMonth = () => {
      const currentViewMonth = document
        .querySelector(".react-calendar__navigation__label__labelText--from")
        .textContent.split(" ")[0];
      month = currentViewMonth;
      // get Monday element
      const lundiAbbr = document.querySelectorAll(
        ".react-calendar__month-view__weekdays div"
      )[0];

      // Add Month in monday
      const addMonth_Header = () => {
        // Remove all prev element added - if there is -
        [...document.querySelectorAll(".thisMonth")].forEach((element) =>
          element.remove()
        );
        // Add new Month
        const para = document.createElement("p");
        para.classList.add("thisMonth");
        para.innerHTML = currentViewMonth;
        lundiAbbr.appendChild(para);
      };
      // Add Month the first day in the month
      const addMonth_Day = () => {
        // Change the textContent to the old one
        [...document.querySelectorAll(".firstMonthDay")].forEach((element) => {
          element.classList.remove("firstMonthDay");
          element.textContent = element.textContent.split(" ")[1][1];
        });
        allDays.forEach((abbr) => {
          const abbrAtrb = abbr.getAttribute("aria-label").split(" ");
          const _day = abbrAtrb[0] === "1";
          const _month = abbrAtrb[1] !== currentViewMonth;
          const month = abbrAtrb[1];
          if (_day && _month) {
            abbr.classList.add("firstMonthDay");
            abbr.textContent = month + " 01";
          }
        });
      };
      addMonth_Header();
      addMonth_Day();
    };

    // ----------------
    isToday();
    isMonth();
    // -------------->

    // useEffect(() => {
    localStorage.setItem("month", monthNames.indexOf(month.charAt(0).toUpperCase() + month.slice(1)) + 1);
    // });
    // console.log(monthNames.indexOf(m => m.toLowerCase() === month));
  };

  // Run function evry pre/next btn click
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => makeSomeChanges(), [onChangeMonth]);

  // Render rdvs in the calander
  useEffect(() => {
    const monthNames = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ];
    const renderRdvs = () => {
      // Get all day containers
      const daysContainer = document.querySelector(
        ".react-calendar__month-view__days"
      );
      const allDays = [...daysContainer.querySelectorAll("button")];

      // For each day verify if there is an rdv
      allDays.forEach((day) => {
        // For each rdv verify it's in the good day
        [...day.querySelectorAll('.rdv_month')].forEach(rdv => rdv.remove())
        sortedRdvs.forEach((rdv) => {
          const day_date = day.querySelector("abbr").getAttribute("aria-label");
          const array = rdv.start.split("-");
          const rdv_date = `${Number(array[2].slice(0, 2))} ${monthNames[
            array[1] - 1
          ].toLowerCase()} ${array[0]}`;

          // console.log(rdv.id, day_date, rdv_date, rdv_date === day_date);

          // If the rdv is in the day
          if (day_date === rdv_date) {
            const createRdv = () => {
              allDays.forEach((btn) => {
                const oldRdvs = [
                  ...btn.querySelectorAll(`[rdv-id="${rdv.id}"]`),
                ];

                oldRdvs.forEach((x) => x.remove());
              });

              const container_ = document.createElement("span");
              const patient = document.createElement("div");
              const speciality = document.createElement("div");
              const time = document.createElement("div");

              // container_.href = `agenda/rdv/${rdv.id}`;
              container_.onclick = () => navigate(`/agenda/rdv/${rdv.id}`)
              container_.classList.add(rdvType(rdv));
              container_.classList.add("rdv_month");
              container_.setAttribute("rdv-id", rdv.id);

              patient.classList.add("item-patient");
              speciality.classList.add("speciality");
              time.classList.add("time");

              patient.innerHTML = "p";
              speciality.innerHTML = "Ophtalmologue";
              time.innerHTML = rdv.start.slice(11, 16);

              container_.appendChild(patient);
              container_.appendChild(speciality);
              container_.appendChild(time);

              day.appendChild(container_);
            };
            createRdv();
          }
        });
      });
    };
    renderRdvs();
  }, [rdvs, onChangeMonth, sortedRdvs, rdvType]);

  return (
    <div>
      <Calendar />
    </div>
  );
}

export default MonthCalendar;
