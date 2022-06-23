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
import React from "react";

function RegisterTable({
  students = [{ NroDocIdent: 22336552, nombres: "Juan Perez" }],
}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>DNI</TableCell>
            <TableCell>Nombres</TableCell>
            <TableCell>Grado</TableCell>
            <TableCell>Periodo</TableCell>
            <TableCell>Seccion</TableCell>
            <TableCell>Fecha</TableCell>
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
              <TableCell>1er grado</TableCell>
              <TableCell>1</TableCell>
              <TableCell>A</TableCell>
              <TableCell>
                <ButtonGroup>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {}}
                  >
                    Editar
                  </Button>
                  <Button variant="contained" color="error" onClick={() => {}}>
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

export default RegisterTable;
