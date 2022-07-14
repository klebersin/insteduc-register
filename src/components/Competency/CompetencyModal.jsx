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

function CompetencyModal({
  openModal,
  setOpenModal,
  selectedCourse,
  fetchCompetencies,
  editingCompetency = {},
}) {
  const [competency, setCompetency] = useState(editingCompetency || {});
  console.log(selectedCourse);
  const handleSubmit = async () => {
    if (!competency.descripcion) {
      toast.error("Insertar nombre de competencia");
      return;
    }
    try {
      if (!editingCompetency.idcompetencia) {
        await Axios.post(`http://localhost:4000/competency`, {
          ...competency,
          idcurso: selectedCourse.idcurso,
        });
        toast.success("Competencia agregada");
      } else {
        await Axios.put(
          `http://localhost:4000/competency/${editingCompetency.idcompetencia}`,
          competency
        );
        toast.success("Competencia modificada");
      }
    } catch (error) {
      toast.error(error.response?.data);
    } finally {
      fetchCompetencies();
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
          <DialogTitle id="alert-dialog-title">
            {editingCompetency.idcompetencia
              ? "Editar Competencia"
              : "Nueva Competencia"}
          </DialogTitle>
          <DialogContent>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    disabled
                    id="course-name"
                    label="Curso"
                    value={selectedCourse.nombreCurso}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="competency-description"
                    label="Descripcion de la Competencia"
                    value={competency.descripcion}
                    onChange={(e) =>
                      setCompetency({
                        ...competency,
                        descripcion: e.target.value,
                      })
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
              {editingCompetency.idcompetencia ? "Modificar" : "Agregar"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default CompetencyModal;
