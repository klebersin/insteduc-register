import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import Axios from "axios";
import React, { useState } from "react";

function RegisterForm({ open, setOpenForm }) {
  const [dni, setDni] = useState("");
  const [student, setStudent] = useState({});
  const findStudent = async () => {
    const studentFound = await Axios.get(
      `http://localhost:4000/student/${dni}`
    );
    console.log(studentFound.data);
    setStudent(studentFound.data);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => {
          setOpenForm(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form>
          <DialogTitle id="alert-dialog-title">
            {"Matricular alumno"}
          </DialogTitle>
          <DialogContent>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="dni-finder"
                    label="DNI"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    id="dni-finder"
                    label="DNI"
                    value={dni}
                    onClick={() => findStudent()}
                  >
                    Buscar
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="nombres"
                    disabled
                    value={student.nombres}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="ApePaterno"
                    disabled
                    value={student.ApePaterno}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField required label={"Periodo"} />
                </Grid>
                <Grid item xs={6}>
                  <TextField required label={"Grado"} />
                </Grid>
                <Grid item xs={6}>
                  <TextField required label={"Seccion"} />
                </Grid>
                <Grid item xs={6}>
                  <TextField required label={"Fecha"} value={new Date()} />
                </Grid>
              </Grid>
            </Container>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setOpenForm(false);
              }}
            >
              Cancelar
            </Button>
            <Button variant="contained" type={"submit"}>
              Agregar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default RegisterForm;
