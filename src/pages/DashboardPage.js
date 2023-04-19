import React from "react";
import styled from "styled-components";

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

function DashboardPage() {
  const completedTasks = 10; // example data, replace with actual data
  const totalTimeTracked = "05:32:00"; // example data, replace with actual data
  const averageTaskTime = "00:20:00"; // example data, replace with actual data

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
          <DashboardLabel>Total Time Tracked</DashboardLabel>
        </DashboardCard>
        <DashboardCard>
          <DashboardValue>{averageTaskTime}</DashboardValue>
          <DashboardLabel>Average Task Time</DashboardLabel>
        </DashboardCard>
      </DashboardCardContainer>
    </>
  );
}

export default DashboardPage;
