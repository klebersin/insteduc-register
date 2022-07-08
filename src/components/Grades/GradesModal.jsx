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

function GradesModal({ openModal, setOpenModal, fetchGrades }) {
  const [grade, setGrade] = useState({});
  const handleSubmit = async () => {
    try {
      await Axios.post(`http://localhost:4000/grade`, grade);
      toast.info("Grado agregado");
      setOpenModal(false);
    } catch (error) {
      toast.error(error.response?.data || "Error al agregar el grado");
    } finally {
      fetchGrades()
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
          <DialogTitle id="alert-dialog-title">{"Grado"}</DialogTitle>
          <DialogContent>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="grade-name"
                    label="Nombre del grado"
                    onChange={(e) =>
                      setGrade({ ...grade, NombreGrado: e.target.value })
                    }
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    required
                    id="grade-section"
                    label="Descripcion del grado"
                    onChange={(e) =>
                      setGrade({ ...grade, Descripcion: e.target.value })
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
              Agregar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default GradesModal;
