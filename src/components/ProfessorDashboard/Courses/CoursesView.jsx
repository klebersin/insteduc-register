import {
  Button,
  ButtonGroup,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Notebook from "./Notebook";

function CoursesView() {
  const [courses, setCourses] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [course, setCourse] = useState(null);

  const fetchCourses = async () => {
    const userId = localStorage.getItem("userID");

    const res = await axios.get(
      `http://localhost:4000/assigns/staff/${userId}`
    );
    setCourses(res.data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <Grid item xs={12}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Curso</TableCell>
                <TableCell>Grado</TableCell>
                <TableCell>Seccion</TableCell>
                <TableCell>Opciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((row, index) => (
                <TableRow
                  key={row.iddocente}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{row.nombreCurso}</TableCell>
                  <TableCell>{row.nombreGrado}</TableCell>
                  <TableCell>{row.nombreSeccion}</TableCell>

                  <TableCell>
                    <ButtonGroup>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          setOpenModal(true);
                          setCourse(row);
                        }}
                      >
                        Agregar notas
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {openModal && (
          <Notebook open={openModal} course={course} setOpen={setOpenModal} />
        )}
      </Paper>
    </Grid>
  );
}

export default CoursesView;
