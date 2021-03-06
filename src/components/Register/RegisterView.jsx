import { Button, Container, Grid, Paper } from "@mui/material";
import React, { useCallback, useState } from "react";
import RegisterForm from "./RegisterForm";
import RegisterTable from "./RegisterTable";
import Axios from "axios";

function RegisterView() {
  const [registers, setRegisters] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const fetchRegisters = useCallback(async () => {
    const res = await Axios.get("http://localhost:4000/register");
    setRegisters(res.data);
  }, []);
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
            Matricular un alumno
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
            <RegisterTable
              fetchRegisters={fetchRegisters}
              registers={registers}
              setRegisters={setRegisters}
            />
          </Paper>
        </Grid>
        {openModal && (
          <RegisterForm
            open={openModal}
            setOpenForm={setOpenModal}
            fetchRegisters={fetchRegisters}
          />
        )}
      </Grid>
    </Container>
  );
}

export default RegisterView;
