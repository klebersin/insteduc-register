import React, { useEffect } from "react";
import Axios from "axios";
import {
  Button,
  ButtonGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function AssignTable({
  fetchAssigns,
  assigns,
  setSelectedAssign,
  setOpenModal,
}) {
  useEffect(() => {
    fetchAssigns();
  }, [fetchAssigns]);

  const deleteAssign = async (idassign) => {
    await Axios.delete(`http://localhost:4000/assigns/${idassign}`);
    await fetchAssigns();
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Docente</TableCell>
            <TableCell>Grado</TableCell>
            <TableCell>Seccion</TableCell>
            <TableCell>Curso</TableCell>
            <TableCell>Opciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assigns.map((row, index) => (
            <TableRow
              key={row.idasignacion}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell>{`${row.nombres} ${row.apePaterno}`}</TableCell>
              <TableCell>{row.nombreGrado}</TableCell>
              <TableCell>{row.nombreSeccion}</TableCell>
              <TableCell>{row.nombreCurso}</TableCell>
              <TableCell>
                <ButtonGroup>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setOpenModal(true);
                      setSelectedAssign(row);
                    }}
                  >
                    Editar
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      deleteAssign(row.idcurso);
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

export default AssignTable;
