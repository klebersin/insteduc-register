import React, { useCallback, useEffect, useState } from "react";
import Axios from "axios";
import SectionTable from "./SectionTable";
import {Button, Container, Grid, Paper} from "@mui/material";
import RegisterTable from "../Register/RegisterTable";
import RegisterForm from "../Register/RegisterForm";
import SectionModal from "./SectionModal";

function SectionView({ selectedGrade }) {
    const [sections, setSections] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const fetchSections = useCallback(async () => {
        const res = await Axios.get(
            `http://localhost:4000/section/${selectedGrade.idgrado}`
        );
        setSections(res.data);
    }, []);
    useEffect(() => {
        fetchSections();
    }, [fetchSections]);

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
                        <SectionTable sections={sections} />
                    </Paper>
                </Grid>
                {openModal && (
                    <SectionModal
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
