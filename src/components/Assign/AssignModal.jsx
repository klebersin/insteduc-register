import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Axios from "axios";
import { toast } from "react-toastify";
import React, { useCallback, useEffect, useState } from "react";

function AssignsModal({
  openModal,
  setOpenModal,
  selectedAssign,
  setSelectedAssign,
  fetchAssigns,
}) {
  const [assign, setAssign] = useState(selectedAssign || {});
  const [staffs, setStaffs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [grades, setGrades] = useState([]);
  const [sections, setSections] = useState([]);

  const fetchStaff = useCallback(async () => {
    const res = await Axios.get("http://localhost:4000/staff");
    setStaffs(res.data);
  }, []);
  const fetchCourses = useCallback(async () => {
    const res = await Axios.get("http://localhost:4000/courses");
    setCourses(res.data);
  }, []);
  const fetchGrades = useCallback(async () => {
    const res = await Axios.get("http://localhost:4000/grade");
    setGrades(res.data);
  }, []);

  const fetchSections = async (idgrado) => {
    const res = await Axios.get(`http://localhost:4000/section/${idgrado}`);
    setSections(res.data);
  };

  useEffect(() => {
    fetchStaff();
    fetchCourses();
    fetchGrades();
  }, [fetchStaff, fetchCourses, fetchGrades]);

  const handleSubmit = async () => {
    try {
      if (!assign.idasignacion) {
        await Axios.post(`http://localhost:4000/assigns`, assign);
        toast.info("Asignacion agregado");
        setOpenModal(false);
      } else {
        await Axios.put(
          `http://localhost:4000/assigns/${assign.idasignacion}`,
          assign
        );
        toast.info("Asignacion actualizado");
        setOpenModal(false);
      }
    } catch (error) {
      toast.error(error.response?.data || "Error al agregar el asignacion");
    } finally {
      setSelectedAssign(null);
      fetchAssigns();
    }
  };
  return (
    <div>
      <Dialog
        open={openModal}
        onClose={() => {
          setSelectedAssign(null);
          setOpenModal(false);
        }}
      >
        <form>
          <DialogTitle id="alert-dialog-title">{"Asignacion"}</DialogTitle>
          <DialogContent>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="staff-label">Docente</InputLabel>
                    <Select
                      labelId="staff-label"
                      label="Docente"
                      style={{ width: 200 }}
                      value={assign.iddocente}
                      onChange={(e) => {
                        setAssign({ ...assign, iddocente: e.target.value });
                      }}
                    >
                      {staffs.map((staff) => (
                        <MenuItem key={staff.iddocente} value={staff.iddocente}>
                          {`${staff.nombres} ${staff.apePaterno}`}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="course-label">Curso</InputLabel>
                    <Select
                      labelId="course-label"
                      label="Curso"
                      value={assign.idcurso}
                      style={{ width: 200 }}
                      onChange={(e) => {
                        setAssign({ ...assign, idcurso: e.target.value });
                      }}
                    >
                      {courses.map((course) => (
                        <MenuItem key={course.idcurso} value={course.idcurso}>
                          {course.nombreCurso}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="course-label">Grado</InputLabel>
                    <Select
                      labelId="course-label"
                      label="Grado"
                      value={assign.idcurso}
                      style={{ width: 200 }}
                      onChange={(e) => {
                        setAssign({ ...assign, idgrado: e.target.value });
                        fetchSections(e.target.value);
                      }}
                    >
                      {grades.map((grade) => (
                        <MenuItem key={grade.idgrado} value={grade.idgrado}>
                          {grade.nombreGrado}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="course-label">Seccion</InputLabel>
                    <Select
                      labelId="course-label"
                      label="Seccion"
                      value={assign.idseccion}
                      style={{ width: 200 }}
                      onChange={(e) => {
                        setAssign({ ...assign, idseccion: e.target.value });
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
                  </FormControl>
                </Grid>
              </Grid>
            </Container>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setSelectedAssign(null);
                setOpenModal(false);
              }}
            >
              Cancelar
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              {assign.idasignacion ? "Actualizar" : "Agregar"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default AssignsModal;
