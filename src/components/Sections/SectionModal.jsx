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

function SectionModal({ openModal, setOpenModal, selectedGrade, fetchSections, editingSection ={} }) {
  const [section, setSection] = useState(editingSection || {});
  const handleSubmit = async () => {

    if (!section.nombreSeccion) {
      toast.error("Insertar nombre de seccion");
      return;
    }
    try {
      if(!editingSection.idseccion){
        console.log("here section post")
        await Axios.post(`http://localhost:4000/section`, {
          ...section,
          idgrado: selectedGrade.idgrado,
        });
        toast.success("Seccion agregada");
      }else{
        console.log("here section put")
        await Axios.put(`http://localhost:4000/section/${editingSection.idseccion}`, section)
        toast.success("Grado modificado");
      }
    } catch (error) {
      toast.error(error.response?.data);
    } finally {
      fetchSections()
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
            editingSection.idseccion ? "Editar Sección": "Nueva seccion"
          }</DialogTitle>
          <DialogContent>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    disabled
                    id="grade-name"
                    label="Grado"
                    value={selectedGrade.nombreGrado}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="grade-name"
                    label="Nombre de la seccion"
                    value={section.nombreSeccion}
                    onChange={(e) =>
                      setSection({ ...section, nombreSeccion: e.target.value })
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
                editingSection.idseccion ? "Modificar":"Agregar"
              }
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default SectionModal;
