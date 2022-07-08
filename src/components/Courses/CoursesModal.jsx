import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
} from "@mui/material";
import Axios from "axios";
import { toast } from "react-toastify";
import React, { useState } from "react";

function CoursesModal({
                          openModal,
                          setOpenModal,
                          selectedCourse,
                          setSelectedCourse,
                          fetchCourses,
                      }) {
    const [course, setCourse] = useState(selectedCourse || {});
    const handleSubmit = async () => {
        try {
            if (!course.idcurso) {
                await Axios.post(`http://localhost:4000/courses`, course);
                toast.info("Curso agregado");
                setOpenModal(false);
            } else {
                await Axios.put(
                    `http://localhost:4000/courses/${course.idcurso}`,
                    course
                );
                toast.info("Curso actualizado");
                setOpenModal(false);
            }
        } catch (error) {
            toast.error(error.response?.data || "Error al agregar el docente");
        } finally {
            setSelectedCourse(null);
            fetchCourses();
        }
    };
    return (
        <div>
            <Dialog
                open={openModal}
                onClose={() => {
                    setSelectedCourse(null);
                    setOpenModal(false);
                }}
            >
                <form>
                    <DialogTitle id="alert-dialog-title">{"Curso"}</DialogTitle>
                    <DialogContent>
                        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        id="staff-name"
                                        label="Nombres del Curso"
                                        value={course.nombreCurso}
                                        onChange={(e) =>
                                            setCourse({ ...course, nombreCurso: e.target.value })
                                        }
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        id="staff-desc"
                                        label="Descripción del Curso"
                                        value={course.descripcionCurso}
                                        onChange={(e) =>
                                            setCourse({ ...course, descripcionCurso: e.target.value })
                                        }
                                    />
                                </Grid>

                            </Grid>
                        </Container>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => {
                                setSelectedCourse(null);
                                setOpenModal(false);
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button variant="contained" onClick={handleSubmit}>
                            {course.idcurso ? "Actualizar" : "Agregar"}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

export default CoursesModal;
