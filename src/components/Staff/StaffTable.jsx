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

function StaffTable({ fetchStaff, staffs, setSelectedStaff, setOpenModal }) {
  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  const deleteStaff = async (iddocente) => {
    await Axios.delete(`http://localhost:4000/staff/${iddocente}`);
    await fetchStaff();
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Nombres</TableCell>
            <TableCell>Apellido paterno</TableCell>
            <TableCell>Apellido materno</TableCell>
            <TableCell>Celular</TableCell>
            <TableCell>Correo</TableCell>
            <TableCell>Direccion</TableCell>
            <TableCell>Sexo</TableCell>
            <TableCell>Rol</TableCell>
            <TableCell>Opciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {staffs.map((row, index) => (
            <TableRow
              key={row.iddocente}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell>{row.nombres}</TableCell>
              <TableCell>{row.apePaterno}</TableCell>
              <TableCell>{row.apeMaterno}</TableCell>
              <TableCell>{row.celular}</TableCell>
              <TableCell>{row.correo}</TableCell>
              <TableCell>{row.direccion}</TableCell>
              <TableCell>{row.sexo}</TableCell>
              <TableCell>{row.rol}</TableCell>

              <TableCell>
                <ButtonGroup>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setOpenModal(true);
                      setSelectedStaff(row);
                    }}
                  >
                    Editar
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      deleteStaff(row.iddocente);
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

export default StaffTable;
