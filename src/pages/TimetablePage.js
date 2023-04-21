import { useEffect, useState } from "react";
import { Container, Grid, TextField, Typography } from "@mui/material";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";

import {
  doc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useCheckLogin } from "../hooks/useCheckLogin";
import getCurrentUserId from "../utils/firebase/getCurrentUserId";

const TimetablePage = () => {
  const [timetable, setTimetable] = useState(Array(24).fill(""));
  const todaysDate = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(todaysDate);

  const [isLogged, setIsLogged] = useCheckLogin();

  const userId = getCurrentUserId();
  const handleChange = (event, index) => {
    const newTimetable = [...timetable];
    newTimetable[index] = event.target.value;
    setTimetable(newTimetable);
  };

  const saveTimeTable = async () => {
    const docRef = doc(db, userId + "-timetable", date);
    await setDoc(docRef, { timetable });
  };

  const getData = async (userId) => {
    const querySnapshot = await getDocs(collection(db, userId + "-timetable"));

    querySnapshot.forEach((doc) => {
      doc.id === date && setTimetable(doc.data().timetable);
    });
  };

  useEffect(() => {
    // timetable data initialize
    const newTimetable = Array(24).fill("");
    setTimetable(newTimetable);

    setTimeout(() => {
      const userId = getCurrentUserId();
      getData(userId);
    }, 1000);
  }, [date]);

  return (
    <TimetablePageWrapper>
      <Container maxWidth="sm" sx={{ marginTop: "2rem" }}>
        <Typography variant="h4" align="center" sx={{ marginBottom: "2rem" }}>
          Today's Time Table
        </Typography>
        <ButtonContainer>
          <SaveButton variant="contained" onClick={saveTimeTable}>
            Data Save
          </SaveButton>
          <GetButton variant="contained" onClick={getData}>
            Data Get
          </GetButton>
          <TextField
            id="date"
            label="Select Date"
            type="date"
            defaultValue={date}
            sx={{ width: "200px" }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => setDate(event.target.value)}
          />
        </ButtonContainer>
        <Grid container spacing={2}>
          {[...Array(24)].map((_, index) => (
            <Grid item xs={4} key={index}>
              <TextField
                fullWidth
                label={`${index}:00 - ${index + 1}:00`}
                variant="outlined"
                value={timetable[index]}
                onChange={(event) => handleChange(event, index)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </TimetablePageWrapper>
  );
};

const TimetablePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  padding-bottom: 40px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  margin-bottom: 20px;
`;

const SaveButton = styled.button`
  background-color: #0077ff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;

  height: 56px;
  width: 100px;

  &:hover {
    background-color: #0062cc;
  }

  &:focus {
    outline: none;
  }
`;

const GetButton = styled.button`
  background-color: #ff0000;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;

  height: 56px;
  width: 100px;

  &:hover {
    background-color: #cc0000;
  }

  &:focus {
    outline: none;
  }
`;

export default TimetablePage;
