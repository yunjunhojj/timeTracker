import { useState } from "react";
import { Container, Grid, TextField, Typography } from "@mui/material";
import styled from "styled-components";

const TimetablePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  padding-bottom: 40px;
`;

const TimetablePage = () => {
  const [timetable, setTimetable] = useState(Array(24).fill(""));

  const handleChange = (event, index) => {
    const newTimetable = [...timetable];
    newTimetable[index] = event.target.value;
    setTimetable(newTimetable);
  };

  return (
    <TimetablePageWrapper>
      <Container maxWidth="sm" sx={{ marginTop: "2rem" }}>
        <Typography variant="h4" align="center" sx={{ marginBottom: "2rem" }}>
          Today's Time Table
        </Typography>
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

export default TimetablePage;
