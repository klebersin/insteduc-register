import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useForm } from "react-hook-form";
import Axios from "axios";

export default function StudentForm({
  open,
  setOpen,
  editingStudent = {},
  handleClose,
}) {
  const defaultValues = {
    nombres: editingStudent?.nombres || "",
  };

  const { register, handleSubmit } = useForm(defaultValues);

  const save = async (data) => {
    if (!editingStudent.id) {
      await Axios.post("http://localhost:4000/student", {
        ...data,
      });
    } else {
      await Axios.put(`http://localhost:4000/student/${editingStudent.id}`, {
        ...data,
      });
    }
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={handleSubmit(save)}>
          <DialogTitle id="alert-dialog-title">
            {"Editar un alumno"}
          </DialogTitle>
          <DialogContent>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Nombres"
                    fullWidth
                    defaultValue={editingStudent?.nombres}
                    {...register("nombres")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Apellido paterno"
                    defaultValue={editingStudent?.ApePaterno}
                    {...register("ApePaterno")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Apellido materno"
                    defaultValue={editingStudent?.ApeMaterno}
                    {...register("ApeMaterno")}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Fecha de nacimiento"
                    {...register("FechaNac")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Celular"
                    defaultValue={editingStudent?.Celular}
                    {...register("Celular")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Correo"
                    defaultValue={editingStudent?.Correo}
                    {...register("Correo")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Direccion"
                    defaultValue={editingStudent?.Direccion}
                    {...register("Direccion")}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Sexo"
                    defaultValue={editingStudent?.Sexo}
                    {...register("Sexo")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Departamento"
                    defaultValue={editingStudent?.Departamento}
                    {...register("Departamento")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Distrito"
                    defaultValue={editingStudent?.Distrito}
                    {...register("Distrito")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="TipoDocumento"
                    defaultValue={editingStudent?.TipoDocumento}
                    {...register("TipoDocumento")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="NroDocIdent"
                    defaultValue={editingStudent?.NroDocIdent}
                    {...register("NroDocIdent")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="DniPadre"
                    defaultValue={editingStudent?.DniPadre}
                    {...register("DniPadre")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="nombrePadre"
                    defaultValue={editingStudent?.nombrePadre}
                    {...register("nombrePadre")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="apellidosPadre"
                    defaultValue={editingStudent?.apellidosPadre}
                    {...register("apellidosPadre")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="CeluPadre"
                    defaultValue={editingStudent?.CeluPadre}
                    {...register("CeluPadre")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="DniMadre"
                    defaultValue={editingStudent?.DniMadre}
                    {...register("DniMadre")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="nombreMadre"
                    defaultValue={editingStudent?.nombreMadre}
                    {...register("nombreMadre")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="apellidosMadre"
                    defaultValue={editingStudent?.apellidosMadre}
                    {...register("apellidosMadre")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="CeluMadre"
                    defaultValue={editingStudent?.CeluMadre}
                    {...register("CeluMadre")}
                  />
                </Grid>
              </Grid>
            </Container>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="error" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="contained" type={"submit"}>
              Agregar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
