import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, ButtonGroup } from "@mui/material";
import Axios from "axios";
import ConfirmModal from "../ConfirmModal";

export default function StudentTable({
  editStudent,
  students = [],
  fetchStudents,
}) {
  const deleteStudent = async (id) => {
    await Axios.delete(`http://localhost:4000/student/${id}`);
    fetchStudents();
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>DNI</TableCell>
            <TableCell>Nombres</TableCell>
            <TableCell>Apellidos paternos</TableCell>
            <TableCell>Apellidos maternos</TableCell>
            <TableCell>Fecha de nacimiento</TableCell>
            <TableCell>Opciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((row) => (
            <TableRow
              key={row.idEstudiante}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.NroDocIdent}
              </TableCell>
              <TableCell>{row.nombres}</TableCell>
              <TableCell>{row.ApePaterno}</TableCell>
              <TableCell>{row.ApeMaterno}</TableCell>
              <TableCell>{row.FechaNac}</TableCell>
              <TableCell>
                <ButtonGroup>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                      editStudent(row);
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      deleteStudent(row.idEstudiante);
                    }}
                  >
                    Eliminar
                  </Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
