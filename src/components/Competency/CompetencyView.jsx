import React, { useCallback, useEffect, useState } from "react";
import Axios from "axios";
import CompetencyTable from "./CompetencyTable";
import {Button, Container, Grid, Paper} from "@mui/material";
import CompetencyModal from "./CompetencyModal";

function CompetencyView({ selectedCourse }) {
    const [competencies, setCompetencies] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [editingCompetency, setEditingCompetency] = useState(null);
    const fetchCompetencies = useCallback(async () => {
        const res = await Axios.get(
            `http://localhost:4000/competency/${selectedCourse.idcurso}`
        );
        setCompetencies(res.data);
    }, [selectedCourse]);
    useEffect(() => {
        fetchCompetencies();
    }, [fetchCompetencies]);
    const openDialog = (row) =>{
        setEditingCompetency(row)
        setOpenModal(true);
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            openDialog();
                        }}
                    >
                        Crear una competencia
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
                        <CompetencyTable
                            editCompetency={openDialog}
                            competencies={competencies}
                        />
                    </Paper>
                </Grid>
                {openModal && (
                    <CompetencyModal
                        editingCompetency={editingCompetency}
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        selectedCourse={selectedCourse}
                        fetchCompetencies={fetchCompetencies}
                    />
                )}
            </Grid>
        </Container>
    );
}

export default CompetencyView;
