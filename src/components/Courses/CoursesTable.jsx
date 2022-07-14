import React, {useEffect, useState} from "react";
import Axios from "axios";
import {
    Button,
    ButtonGroup, Dialog, DialogContent, DialogTitle,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import CompetencyView from "../Competency/CompetencyView";

function CoursesTable({ fetchCourses, courses, setSelectedCourse, setOpenModal }) {

    const [courseCompetency, setCourseCompetency] = useState()
    const [openCompetencyModal, setOpenCompetencyModal ] = useState(false);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    const deleteCourse = async (idcourse) => {
        await Axios.delete(`http://localhost:4000/courses/${idcourse}`);
        await fetchCourses();
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Descripción</TableCell>
                        <TableCell>Opciones</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {courses.map((row, index) => (
                        <TableRow
                            key={row.iddocente}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {index + 1}
                            </TableCell>
                            <TableCell>{row.nombreCurso}</TableCell>
                            <TableCell>{row.descripcionCurso}</TableCell>

                            <TableCell>
                                <ButtonGroup>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            setOpenModal(true);
                                            setSelectedCourse(row);
                                        }}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        onClick={() => {
                                            setOpenCompetencyModal(true);
                                            setCourseCompetency(row);
                                        }}
                                    >
                                        Competencias
                                    </Button>

                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => {
                                            deleteCourse(row.idcurso);
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
            {
                openCompetencyModal && (
                    <Dialog
                        open={openCompetencyModal}
                        onClose={ () =>{
                            setOpenCompetencyModal(false);
                        }}
                        maxWidth={"xl"}
                    >
                        <DialogTitle id="alert-dialog-title">{"Competencias"}</DialogTitle>
                        <DialogContent>
                            <CompetencyView selectedCourse={courseCompetency}/>
                        </DialogContent>-
                    </Dialog>
                )
            }
        </TableContainer>
    );
}

export default CoursesTable;
