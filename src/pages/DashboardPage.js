import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
// firebase
import { doc, collection, getDocs, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
// chart
import ECharts, { EChartsReactProps } from "echarts-for-react";

function DashboardPage() {
  const [options, setOptions] = useState({
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [10, 5, 8, 5, 8, 5, 10],
        type: "line",
      },
    ],
  });

  const tempOptions = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [10, 5, 8, 5, 8, 5, 10],
        type: "line",
      },
    ],
  };

  const [completedTasks, setCompletedTasks] = useState(0);
  const [totalTimeTracked, setTotalTimeTracked] = useState("00:00:00");

  const today = new Date().toISOString().slice(0, 10);

  // calculate the date of the last 7 days from today ex: 10-01
  const calculateLast7Days = () => {
    const last7Days = [];

    for (let i = 0; i < 7; i++) {
      const tempDate = new Date();
      tempDate.setDate(tempDate.getDate() - i);
      last7Days.push(tempDate.toISOString().slice(5, 10));
    }
    // reverse the array so that the date is in ascending order
    last7Days.reverse();

    // set the xAxis data to the last 7 days
    tempOptions.xAxis.data = last7Days;
  };

  const checkCompletedTasks = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const querySnapshot = await getDocs(collection(db, user.email + "-todo"));
    const completedTasks = querySnapshot.docs.filter(
      (doc) => doc.data().completed === true
    );
    setCompletedTasks(completedTasks.length);
  };

  const checkTotalTimeTracked = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const querySnapshot = await getDocs(
      collection(db, user.email + "-pomodoro")
    );

    const tempArray = [];

    for (let i = 0; i < querySnapshot.docs.length; i++) {
      const docRef = doc(
        db,
        user.email + "-pomodoro",
        querySnapshot.docs[i].id
      );
      const docSnap = await getDoc(docRef);
      const pomodoroCounter = docSnap.data().pomodoroCounter;
      tempArray.push(pomodoroCounter);
    }

    // several arrays of tempArray
    tempArray.reverse();
    const last7DayData = [];
    for (let i = 0; i < 7; i++) {
      // several elements sum in each array
      last7DayData[i] = tempArray[i].reduce((acc, doc) => {
        return acc + doc;
      });
    }

    tempOptions.series[0].data = last7DayData;

    setOptions(tempOptions);
    const totalTime = secondsToHms(
      tempArray.flat().reduce((acc, doc) => {
        return acc + doc;
      }, 0)
    );

    setTotalTimeTracked(totalTime);
  };

  // input sec output hh:mm:ss
  const secondsToHms = (d) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    // if 0 then display 00
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    return h + ":" + m + ":" + s;
  };

  useEffect(() => {
    setTimeout(() => {
      calculateLast7Days();
      checkCompletedTasks();
      checkTotalTimeTracked();
    }, 1000);
  }, []);

  return (
    <>
      <DashboardContainer>
        <DashboardTitle>Dashboard</DashboardTitle>
      </DashboardContainer>
      <DashboardCardContainer>
        <DashboardCard>
          <DashboardValue>{completedTasks}</DashboardValue>
          <DashboardLabel>Completed Tasks</DashboardLabel>
        </DashboardCard>
        <DashboardCard>
          <DashboardValue>{totalTimeTracked}</DashboardValue>
          <DashboardLabel>Total Focus Time</DashboardLabel>
        </DashboardCard>
      </DashboardCardContainer>{" "}
      <DashboardTitle>
        Click the button to change the graph data.
      </DashboardTitle>
      <ButtonContainer>
        <Button
          variant="contained"
          onClick={() => {
            setOptions({
              ...options,
              series: [
                {
                  data: options.series[0].data,
                  type: "line",
                },
              ],
            });
          }}
        >
          Line Chart
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            // just change the series data to bar chart
            setOptions({
              ...options,
              series: [
                {
                  data: options.series[0].data,
                  type: "bar",
                },
              ],
            });
          }}
        >
          Bar Chart
        </Button>
      </ButtonContainer>
      <ECharts
        option={options}
        opts={{ renderer: "svg", width: "auto", height: "auto" }}
      />
    </>
  );
}

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DashboardCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const DashboardCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const DashboardTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;

  text-align: center;
`;

const DashboardValue = styled.p`
  font-size: 36px;
  font-weight: bold;
  margin: 0;
`;

const DashboardLabel = styled.p`
  font-size: 16px;
  margin: 10px 0 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    margin: 10px;
  }
`;

export default DashboardPage;
