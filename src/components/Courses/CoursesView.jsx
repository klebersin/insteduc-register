import { Button, Container, Grid, Paper } from "@mui/material";
import React, { useCallback, useState } from "react";
import Axios from "axios";
import CoursesTable from "./CoursesTable";
import CoursesModal from "./CoursesModal";

function CoursesView() {
    const [courses, setCourses] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const [selectedCourse, setSelectedCourse] = useState(null);
    const fetchCourses = useCallback(async () => {
        const res = await Axios.get("http://localhost:4000/courses");
        setCourses(res.data);
    }, []);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setOpenModal(true);
                        }}
                    >
                        Agregar un curso
                    </Button>
                </Grid>

                <Grid item xs={12}>
                    <Paper
                        sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <CoursesTable
                            fetchCourses={fetchCourses}
                            courses={courses}
                            setSelectedCourse={setSelectedCourse}
                            setOpenModal={setOpenModal}
                        />
                    </Paper>
                </Grid>
                {openModal && (
                    <CoursesModal
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        selectedCourse={selectedCourse}
                        setSelectedCourse={setSelectedCourse}
                        fetchCourses={fetchCourses}
                    />
                )}
            </Grid>
        </Container>
    );
}

export default CoursesView;
