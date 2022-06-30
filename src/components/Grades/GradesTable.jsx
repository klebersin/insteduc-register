import React, { useEffect, useState } from "react";
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
import SectionModal from "../Sections/SectionModal";

function GradesTable({ fetchGrades, grades }) {
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [openSectionModal, setOpenSectionModal] = useState(false);
  useEffect(() => {
    fetchGrades();
  }, [fetchGrades]);

  const deleteGrade = async (idgrado) => {
    await Axios.delete(`http://localhost:4000/grade/${idgrado}`);
    await fetchGrades();
  };

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
                    color="primary"
                    onClick={() => {
                      setOpenSectionModal(true);
                      setSelectedGrade(row);
                    }}
                  >
                    Sección
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      deleteGrade(row.idgrado);
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
      {openSectionModal && (
        <SectionModal
          openModal={openSectionModal}
          setOpenModal={setOpenSectionModal}
          selectedGrade={selectedGrade}
        />
      )}
    </TableContainer>
  );
}

export default GradesTable;
