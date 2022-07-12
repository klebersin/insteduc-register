import { Button, Container, Grid, Paper } from "@mui/material";
import React, { useCallback, useState } from "react";
import Axios from "axios";
import StaffTable from "./NoteTable";
import StaffModal from "./NoteModal";

function NoteView() {
    const [note, setNote] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const [selectedNote, setSelectedNote] = useState(null);
    const fetchNote = useCallback(async () => {
        const res = await Axios.get("http://localhost:4000/note");
        setNote(res.data);
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
                        Agregar notas
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
                        <StaffTable
                            fetchNote={fetchNote}
                            note={note}
                            setSelectedNote={setSelectedNote}
                            setOpenModal={setOpenModal}
                        />
                    </Paper>
                </Grid>
                {openModal && (
                    <StaffModal
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        selectedNote={selectedNote}
                        setSelectedNote={setSelectedNote}
                        fetchNote={fetchNote}
                    />
                )}
            </Grid>
        </Container>
    );
}

export default NoteView;
