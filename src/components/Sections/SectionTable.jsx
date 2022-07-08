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

function SectionTable({ sections }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Seccion</TableCell>
            <TableCell>Alumnos</TableCell>
            <TableCell>Opciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sections.map((row, index) => (
            <TableRow
              key={row.NroDocIdent}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{row.nombreSeccion}</TableCell>
              <TableCell>{index + 1}</TableCell>
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

export default SectionTable;
