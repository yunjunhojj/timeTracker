import React, { useState, useEffect } from "react";
import styled from "styled-components";
// firebase
import { doc, collection, getDocs, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

function DashboardPage() {
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

    for (let i = 0; i < querySnapshot.docs.length; i++) {
      const docRef = doc(
        db,
        user.email + "-pomodoro",
        querySnapshot.docs[i].id
      );
      const docSnap = await getDoc(docRef);
      const pomodoroCouter = docSnap.data().pomodoroCouter;
      tempArray.push(pomodoroCouter);
    }

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
      </DashboardCardContainer>
    </>
  );
}

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

const DashboardCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 50px;
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

export default DashboardPage;
