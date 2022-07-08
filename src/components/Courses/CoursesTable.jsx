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

function CoursesTable({ fetchCourses, courses, setSelectedCourse, setOpenModal }) {
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
        </TableContainer>
    );
}

export default CoursesTable;
