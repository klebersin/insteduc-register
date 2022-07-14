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

function GradesModal({
                         openModal,
                         setOpenModal,
                         fetchGrades,
                         editingGrade = {}
                     }) {
    const [grade, setGrade] = useState(editingGrade || {});
    const handleSubmit = async () => {
        if(!grade.nombreGrado){
            toast.error("Nombre de grado es requerido");
            return;
        }
        if(!grade.descripcionGrado){
            toast.error("Descripción del grado es requerido");
            return;
        }
        try {
            if(!editingGrade.idgrado){
                await Axios.post(`http://localhost:4000/grade`, grade);
                toast.success("Grado agregado");
            }else{
                await Axios.put(`http://localhost:4000/grade/${editingGrade.idgrado}`, grade)
                toast.success("Grado modificado");
            }

        } catch (error) {
            toast.error(error.response?.data || "Error al agregar el grado");
        } finally {
            fetchGrades()
            setOpenModal(false);
        }
    };
    return (
        <div>
            <Dialog
                open={openModal}
                onClose={() => {
                    setOpenModal(false);
                }}
            >
                <form>
                    <DialogTitle id="alert-dialog-title">{
                        editingGrade.idgrado ? "Editar Grado": "Grado"
                    }</DialogTitle>
                    <DialogContent>
                        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        id="grade-name"
                                        label="Nombre del grado"
                                        value={grade.nombreGrado}
                                        onChange={(e) =>
                                            setGrade({ ...grade, nombreGrado: e.target.value })
                                        }
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        id="grade-section"
                                        label="Descripcion del grado"
                                        value={grade.descripcionGrado}
                                        onChange={(e) =>
                                            setGrade({ ...grade, descripcionGrado: e.target.value })
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
                                setOpenModal(false);
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button variant="contained" onClick={handleSubmit}>
                            {
                                editingGrade.idgrado ? "Modificar":"Agregar"
                            }
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

export default GradesModal;
