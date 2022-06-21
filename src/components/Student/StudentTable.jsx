import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(dni, name, surname, lastname, dob) {
  return { dni, name, surname, lastname, dob };
}

const rows = [
  createData(123, "Juan", "Perez", "Perez", 2005),
  createData(3213, "Pedro", "Perez", "Perez", 2005),
  createData(12312, "Maria", "Salas", "Perez", 2005),
  createData(32312, "As", "Perez", "Perez", 2005),
  createData(32313, "Lee", "Salas", "Perez", 2005),
];

export default function StudentTable() {
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
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.dni}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.dni}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.surname}</TableCell>
              <TableCell>{row.lastname}</TableCell>
              <TableCell>{row.dob}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
