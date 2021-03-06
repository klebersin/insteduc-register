import React, { useCallback, useEffect, useState } from "react";
import Axios from "axios";
import SectionTable from "./SectionTable";
import {Button, Container, Grid, Paper} from "@mui/material";
import SectionModal from "./SectionModal";

function SectionView({ selectedGrade }) {
    const [sections, setSections] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [editingSection, setEditingSection] = useState(null);
    const fetchSections = useCallback(async () => {
        const res = await Axios.get(
            `http://localhost:4000/section/${selectedGrade.idgrado}`
        );
        setSections(res.data);
    }, [selectedGrade]);
    useEffect(() => {
        fetchSections();
    }, [fetchSections]);
    const openDialog = (row) =>{
        setEditingSection(row)
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
                        Crear una sección
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
                        <SectionTable
                            editSection={openDialog}
                            sections={sections}
                        />
                    </Paper>
                </Grid>
                {openModal && (
                    <SectionModal
                        editingSection={editingSection}
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        selectedGrade={selectedGrade}
                        fetchSections={fetchSections}
                    />
                )}
            </Grid>
        </Container>
    );
}

export default SectionView;
