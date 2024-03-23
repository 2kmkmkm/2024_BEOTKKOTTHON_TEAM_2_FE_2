import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import "./calendar.css";
import catfoot from "../Img/catfoot.svg";
import axios from "axios";

const CalendarPage = () => {
  const [value, onChangeValue] = useState(new Date());
  const [dayList, setDayList] = useState([]);

  useEffect(() => {
    const fetchDayList = async () => {
      try {
        const response = await axios.get(
          `http://43.203.208.221:8079/api/search/${m}`
        );
        setDayList(response.data.body);
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    };
    fetchDayList();
  }, []);

  const addContent = ({ date, view }) => {
    const content = [];
    if (dayList.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
      content.push(<img src={catfoot} alt="" />);
      return (
        <>
          <div>{content}</div>
        </>
      );
    }
  };

  return (
    <div>
      <Calendar
        formatDay={(locale, date) => moment(date).format("D")}
        calendarType="gregory"
        next2Label={null}
        prev2Label={null}
        onChange={onChangeValue}
        value={value}
        tileContent={addContent}
      />
    </div>
  );
};

export default CalendarPage;
