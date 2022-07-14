import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Axios from "axios";
import { Container } from "@mui/system";
import { toast } from "react-toastify";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const defaultNotes = ["AD", "A", "B", "C", "D"];
export default function Notebook({ course, open, setOpen }) {
  const [students, setStudents] = React.useState([]);
  const [competencies, setCompetencies] = React.useState([]);
  const [periods, setPeriods] = React.useState([]);
  const [notebook, setNotebook] = React.useState({ idcurso: course.idcurso });
  const [notes, setNotes] = React.useState([]);

  const fetchStudents = async () => {
    const res = await Axios.get(
      `http://localhost:4000/student/section/${course.idseccion}`
    );
    setStudents(res.data);
  };

  const fetchCompetencies = async () => {
    const res = await Axios.get(
      `http://localhost:4000/competency/course/${course.idcurso}`
    );
    setCompetencies(res.data);
  };

  const fetchPeriods = async () => {
    const res = await Axios.get(`http://localhost:4000/period`);
    setPeriods(res.data);
  };

  React.useEffect(() => {
    fetchStudents();
    fetchPeriods();
    fetchCompetencies();
    // eslint-disable-next-line
  }, []);
  const handleSubmit = async () => {
    try {
      if (notes.length < competencies.length) {
        toast.error("Faltan notas");
        return;
      }

      if (!notebook.idEstudiante) {
        toast.error("Seleccione un estudiante");
        return;
      }

      if (!notebook.idperiodo) {
        toast.error("Seleccione un periodo");
        return;
      }

      if (!notebook.idregistronota) {
        const res = await Axios.post(
          "http://localhost:4000/notebook",
          notebook
        );

        await Axios.post("http://localhost:4000/note", {
          idregistronota: res.data.idregistronota,
          notas: notes,
        });

        toast.info("Nota agregada");
      } else {
        await Axios.put(
          `http://localhost:4000/notebook/${notebook.idregistronota}`,
          notebook
        );

        await Axios.post("http://localhost:4000/note", {
          idregistronota: notebook.idregistronota,
          notas: notes,
        });

        toast.info("Nota actualizada");
      }
    } catch (error) {
      toast.error(error.response?.data || "Error al agregar la nota");
    } finally {
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Registro de notas
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Guardar
            </Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="staff-label">Estudiante</InputLabel>
                <Select
                  labelId="staff-label"
                  label="Estudiante"
                  style={{ width: 200 }}
                  value={notebook.idEstudiante}
                  onChange={(e) => {
                    setNotebook({ ...notebook, idEstudiante: e.target.value });
                  }}
                >
                  {students.map((student) => (
                    <MenuItem
                      key={student.idEstudiante}
                      value={student.idEstudiante}
                    >
                      {`${student.nombres} ${student.ApePaterno}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="staff-label">Periodo</InputLabel>
                <Select
                  labelId="staff-label"
                  label="Periodo"
                  style={{ width: 200 }}
                  value={notebook.idperiodo}
                  onChange={(e) => {
                    setNotebook({ ...notebook, idperiodo: e.target.value });
                  }}
                >
                  {periods.map((period) => (
                    <MenuItem key={period.idperiodo} value={period.idperiodo}>
                      {`${period.nombre}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={10}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>Criterio</TableCell>
                      <TableCell>Nota</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {competencies.map((row, index) => (
                      <TableRow key={row.iddocente}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.descripcion}</TableCell>
                        <TableCell>
                          <FormControl>
                            <InputLabel id="staff-label">Nota</InputLabel>
                            <Select
                              labelId="staff-label"
                              label="Nota"
                              style={{ width: 200 }}
                              onChange={(e) => {
                                if (
                                  !notes.find(
                                    (note) =>
                                      note.idcompetencia === row.idcompetencia
                                  )
                                ) {
                                  setNotes([
                                    ...notes,
                                    {
                                      idcompetencia: row.idcompetencia,
                                      nota: e.target.value,
                                    },
                                  ]);
                                } else {
                                  const newNotes = notes.map((note) => {
                                    if (
                                      note.idcompetencia === row.idcompetencia
                                    ) {
                                      return {
                                        ...note,
                                        nota: e.target.value,
                                      };
                                    }
                                    return note;
                                  });
                                  setNotes(newNotes);
                                }
                              }}
                            >
                              {defaultNotes.map((note, i) => (
                                <MenuItem key={note} value={note}>
                                  {note}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={8} />
            <Grid item xs={4}>
              <Button
                variant="contained"
                onClick={() => {
                  handleSubmit();
                }}
              >
                {"Guardar"}
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Dialog>
    </div>
  );
}
