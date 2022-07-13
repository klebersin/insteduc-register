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

function NoteModal({
                        openModal,
                        setOpenModal,
                        selectedNote,
                        setSelectedNote,
                        fetchNote,
                    }) {
    const [note, setNote] = useState(selectedNote || {});
    const handleSubmit = async () => {
        try {
            if (!note.idnota) {
                await Axios.post(`http://localhost:4000/note`, note);
                toast.info("Docente agregado");
                setOpenModal(false);
            } else {
                await Axios.put(
                    `http://localhost:4000/staff/${note.idnota}`,
                    note
                );
                toast.info("Docente actualizado");
                setOpenModal(false);
            }
        } catch (error) {
            toast.error(error.response?.data || "Error al agregar el docente");
        } finally {
            setSelectedNote(null);
            fetchNote();
        }
    };
    return (
        <div>
            <Dialog
                open={openModal}
                onClose={() => {
                    setSelectedNote(null);
                    setOpenModal(false);
                }}
            >
                <form>
                    <DialogTitle id="alert-dialog-title">{"Nota"}</DialogTitle>
                    <DialogContent>
                        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        id="note-name"
                                        label="Nombres del docente"
                                        value={note.nombres}
                                        onChange={(e) =>
                                            setNote({ ...note, nombres: e.target.value })
                                        }
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        id="staff-lastname"
                                        label="Apellido paterno"
                                        value={note.apePaterno}
                                        onChange={(e) =>
                                            setNote({ ...note, apePaterno: e.target.value })
                                        }
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        id="staff-midname"
                                        label="Apellido materno"
                                        value={note.apeMaterno}
                                        onChange={(e) =>
                                            setNote({ ...note, apeMaterno: e.target.value })
                                        }
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        id="phone-number-staff"
                                        label="Celular del docente"
                                        value={note.celular}
                                        onChange={(e) =>
                                            setNote({ ...note, celular: e.target.value })
                                        }
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        id="email-staff"
                                        label="Correo electronico"
                                        value={note.correo}
                                        onChange={(e) =>
                                            setNote({ ...note, correo: e.target.value })
                                        }
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        id="staff-gender"
                                        label="Sexo del docente"
                                        value={note.sexo}
                                        onChange={(e) =>
                                            setNote({ ...note, sexo: e.target.value })
                                        }
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        required
                                        id="staff-address"
                                        label="Direccion"
                                        value={note.direccion}
                                        onChange={(e) =>
                                            setNote({ ...note, direccion: e.target.value })
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
                                setSelectedNote(null);
                                setOpenModal(false);
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button variant="contained" onClick={handleSubmit}>
                            {note.idnota ? "Actualizar" : "Agregar"}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

export default NoteModal;
