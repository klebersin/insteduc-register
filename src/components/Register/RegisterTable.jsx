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
import React, { useEffect } from "react";

function RegisterTable({ fetchRegisters, registers, setRegisters }) {
  useEffect(() => {
    fetchRegisters();
  }, [fetchRegisters]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>DNI</TableCell>
            <TableCell>Nombres</TableCell>
            <TableCell>Grado</TableCell>
            <TableCell>Seccion</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Opciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {registers.map((row) => (
            <TableRow
              key={row.NroDocIdent}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.NroDocIdent}
              </TableCell>
              <TableCell>{`${row.nombres} ${row.ApePaterno}`}</TableCell>
              <TableCell>{row.nombreGrado}</TableCell>
              <TableCell>{row.nombreSeccion}</TableCell>
              <TableCell>{row.fechaMatricula}</TableCell>
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
