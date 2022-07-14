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
import ConfirmModal from "../common/ConfirmModal";

export default function PeriodTable({
  editPeriod,
  periods = [],
  fetchPeriods,
}) {
  const [deletingUser, setDeletingUser] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const deletePeriod = async (id) => {
    await Axios.delete(`http://localhost:4000/period/${id}`);
    fetchPeriods();
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Nombres</TableCell>
            <TableCell>Descripcion</TableCell>
            <TableCell>Año</TableCell>
            <TableCell>Opciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {periods.map((row, index) => (
            <TableRow
              key={row.idEstudiante}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell>{row.nombre}</TableCell>
              <TableCell>{row.descripcion}</TableCell>
              <TableCell>{row.anio}</TableCell>
              <TableCell>
                <ButtonGroup>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                      editPeriod(row);
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      setOpenModal(true);
                      setDeletingUser(row.idEstudiante);
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
      <ConfirmModal
        open={openModal}
        setOpen={setOpenModal}
        deletePeriod={deletePeriod}
        deletingUser={deletingUser}
      />
    </TableContainer>
  );
}
