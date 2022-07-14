import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, TextField } from "@mui/material";
import { Container } from "@mui/system";
import Axios from "axios";
import { toast } from "react-toastify";

export default function PeriodForm({
  open,
  setOpen,
  editingPeriod = {},
  handleClose,
  fetchPeriods,
}) {
  const [period, setPeriod] = React.useState(editingPeriod);

  const handleSubmit = async () => {
    try {
      if(!period.nombre){
        toast.error("El nombre del periodo es requerido");
        return;
      }
      if(!period.descripcion){
        toast.error("La descripción del periodo es requerido");
        return;
      }
      if(!period.anio){
        toast.error("El año del periodo es requerido");
        return;
      }

      if (!period.idperiodo) {
        await Axios.post("http://localhost:4000/period", period);
        toast.info("Periodo agregado");
      } else {
        await Axios.put(
          `http://localhost:4000/period/${period.idperiodo}`,
          period
        );
        toast.info("Periodo actualizado");
      }
    } catch (error) {
      toast.error(error.response?.data || "Error al agregar el periodo");
    } finally {
      setOpen(false);
      fetchPeriods();
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {editingPeriod.idEstudiante ? "Editar un periodo" : "Agregar periodo"}
        </DialogTitle>
        <DialogContent>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  required
                  id="staff-name"
                  label="Nombre"
                  value={period.nombre}
                  onChange={(e) =>
                    setPeriod({ ...period, nombre: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="staff-desc"
                  label="Descripción "
                  value={period.descripcion}
                  onChange={(e) =>
                    setPeriod({ ...period, descripcion: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="staff-desc"
                  label="Año "
                  value={period.anio}
                  onChange={(e) =>
                    setPeriod({ ...period, anio: e.target.value })
                  }
                />
              </Grid>
            </Grid>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleSubmit();
            }}
          >
            {editingPeriod.idperiodo ? "Modificar" : "Agregar"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
