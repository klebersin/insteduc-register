import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import SectionView from "../Sections/SectionView";

function GradesTable({ fetchGrades, grades }) {
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [openSectionModal, setOpenSectionModal] = useState(false);
  useEffect(() => {
    fetchGrades();
  }, [fetchGrades]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Descripcion</TableCell>
            <TableCell>Opciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {grades.map((row, index) => (
            <TableRow
              key={row.idgrado}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell>{row.nombreGrado}</TableCell>
              <TableCell>{row.descripcionGrado}</TableCell>

              <TableCell>
                <ButtonGroup>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                      //deleteGrade(row.idgrado);
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setOpenSectionModal(true);
                      setSelectedGrade(row);
                    }}
                  >
                    Secciónes
                  </Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {openSectionModal && (
        <Dialog
          open={openSectionModal}
          onClose={() => {
            setOpenSectionModal(false);
          }}
        >
          <DialogTitle id="alert-dialog-title">{"Secciones"}</DialogTitle>
          <DialogContent>
            <SectionView selectedGrade={selectedGrade} />
          </DialogContent>
        </Dialog>
      )}
    </TableContainer>
  );
}

export default GradesTable;
