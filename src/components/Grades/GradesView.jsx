import { Button, Container, Grid, Paper } from "@mui/material";
import React, { useState } from "react";
import GradesModal from "./GradesModal";
import GradesTable from "./GradesTable";
import Axios from "axios";

function GradesView() {
  const [grades, setGrades] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const fetchGrades = async () => {
    const res = await Axios.get("http://localhost:4000/grade");
    setGrades(res.data);
  };
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Agregar un Grado
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <GradesTable fetchGrades={fetchGrades} grades={grades} />
          </Paper>
        </Grid>
        {openModal && (
          <GradesModal openModal={openModal} setOpenModal={setOpenModal} />
        )}
      </Grid>
    </Container>
  );
}

export default GradesView;
