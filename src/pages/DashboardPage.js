import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
// firebase
import { doc, collection, getDocs, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
// chart
import ECharts, { EChartsReactProps } from "echarts-for-react";

// utils
import { calculateLast7Days, secondsToHms } from "../utils/math";

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

    // several arrays of pomodoroCounter
    for (let i = 0; i < querySnapshot.docs.length; i++) {
      const docRef = doc(
        db,
        user.email + "-pomodoro",
        querySnapshot.docs[i].id
      );
      const docSnap = await getDoc(docRef);
      const pomodoroCounter = docSnap.data().pomodoroCounter;
      pomodoroCounter === undefined
        ? tempArray.push([0])
        : tempArray.push(pomodoroCounter);
    }

    // several arrays of tempArray
    tempArray.reverse();
    const last7DayData = [];
    for (let i = 0; i < 7; i++) {
      // if undefined then return 0
      if (tempArray[i] === undefined) {
        last7DayData[i] = 0;
        continue;
      }

      // several elements sum in each array
      last7DayData[i] = tempArray[i].reduce((acc, doc) => {
        return (acc + doc) / 60;
      });
    }

    tempOptions.series[0].data = last7DayData.reverse();

    setOptions(tempOptions);
    const totalTime = secondsToHms(
      tempArray.flat().reduce((acc, doc) => {
        return acc + doc;
      }, 0)
    );

    setTotalTimeTracked(totalTime);
  };

  useEffect(() => {
    setTimeout(() => {
      tempOptions.xAxis.data = calculateLast7Days();
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
