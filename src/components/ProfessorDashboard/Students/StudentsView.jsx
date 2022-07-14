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

function StudentsView() {
  const [students, setStudents] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [student, setStudent] = useState(null);

  const fetchStudents = async () => {
    const res = await axios.get(`http://localhost:4000/register`);
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
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
                <TableCell>Estudiante</TableCell>
                <TableCell>Grado</TableCell>
                <TableCell>Seccion</TableCell>
                <TableCell>Opciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((row, index) => (
                <TableRow
                  key={row.idEstudiante}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{row.nombres}</TableCell>
                  <TableCell>{row.nombreGrado}</TableCell>
                  <TableCell>{row.nombreSeccion}</TableCell>

                  <TableCell>
                    <ButtonGroup>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          setOpenModal(true);
                          setStudent(row);
                        }}
                      >
                        Ver notas
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {openModal && (
          <Notebook open={openModal} student={student} setOpen={setOpenModal} />
        )}
      </Paper>
    </Grid>
  );
}

export default StudentsView;
