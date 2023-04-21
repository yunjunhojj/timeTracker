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
import {
  calculateLast7Days,
  secondsToHms,
  sumOfServeralElement,
  sumOfAllElements,
} from "../utils/math";

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

  const last7Days = calculateLast7Days();

  const tempOptions = {
    xAxis: {
      type: "category",
      data: last7Days,
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
  const [guideText, setGuideText] = useState(
    "Click the button to change the graph data."
  );

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

    const last7DayData = sumOfServeralElement(tempArray);

    tempOptions.series[0].data = last7DayData.reverse();

    setOptions(tempOptions);
    const totalTime = secondsToHms(sumOfAllElements(tempArray));

    setTotalTimeTracked(totalTime);
  };

  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        checkCompletedTasks();
        checkTotalTimeTracked();
      } else {
        // No user is signed in.
        setCompletedTasks(5);
        setTotalTimeTracked("02:17:28");
        setGuideText("Please login to see your dashboard.");
      }
    });
    tempOptions.xAxis.data = calculateLast7Days();
  }, []);

  return (
    <>
      <DashboardContainer>
        <DashboardTitle>Dashboard</DashboardTitle>
        <DashboardCardContainer>
          <DashboardCard>
            <DashboardValue>{completedTasks}</DashboardValue>
            <DashboardLabel>Completed Tasks</DashboardLabel>
          </DashboardCard>
          <DashboardCard>
            <DashboardValue>{totalTimeTracked}</DashboardValue>
            <DashboardLabel>Total Focus Time</DashboardLabel>
          </DashboardCard>
        </DashboardCardContainer>

        <DashboardTitle>{guideText}</DashboardTitle>
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
      </DashboardContainer>{" "}
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
