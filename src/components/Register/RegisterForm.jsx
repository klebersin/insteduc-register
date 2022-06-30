import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function RegisterForm({ open, setOpenForm, fetchRegisters }) {
  const [dni, setDni] = useState("");
  const [student, setStudent] = useState({});
  const [grades, setGrades] = useState([]);
  const [sections, setSections] = useState([]);
  const [register, setRegister] = useState({
    fechaMatricula: new Date(),
  });

  const fetchGrades = async () => {
    const res = await Axios.get("http://localhost:4000/grade");
    setGrades(res.data);
  };

  const fetchSections = async (idgrado) => {
    const res = await Axios.get(`http://localhost:4000/section/${idgrado}`);
    setSections(res.data);
  };

  useEffect(() => {
    fetchGrades();
  }, []);

  const handleSubmit = async () => {
    if (!register.idgrado) {
      toast.error("Seleccionar grado");
      return;
    }
    if (!register.idseccion) {
      toast.error("Seleccionar seccion");
      return;
    }
    if (!register.idEstudiante) {
      toast.error("Seleccionar estudiante");
      return;
    }
    try {
      await Axios.post(`http://localhost:4000/register`, register);
      toast.info("Matricula agregada");
      await fetchRegisters();
      setOpenForm(false);
    } catch (error) {
      toast.error(error.response?.data || "Error al agregar la matricula");
    }
  };

  const findStudent = async () => {
    const res = await Axios.get(`http://localhost:4000/student/${dni}`);
    setRegister({ ...register, idEstudiante: res.data.idEstudiante });
    setStudent(res.data);
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
                  <Select
                    label="Grado"
                    style={{ width: "100%" }}
                    onChange={(e) => {
                      setRegister({ ...register, idgrado: e.target.value });
                      fetchSections(e.target.value);
                    }}
                  >
                    {grades.map((grade) => (
                      <MenuItem key={grade.idgrado} value={grade.idgrado}>
                        {grade.nombreGrado}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={6}>
                  <Select
                    label="Grado"
                    disabled={!register?.idgrado}
                    style={{ width: "100%" }}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setRegister({ ...register, idseccion: e.target.value });
                    }}
                  >
                    {sections.map((section) => (
                      <MenuItem
                        key={section.idseccion}
                        value={section.idseccion}
                      >
                        {section.nombreSeccion}
                      </MenuItem>
                    ))}
                  </Select>
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
            <Button variant="contained" onClick={handleSubmit}>
              Agregar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default RegisterForm;
