import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Container } from "@mui/system";
import { useForm } from "react-hook-form";
import Axios from "axios";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { toast } from "react-toastify";

export default function StudentForm({
  open,
  setOpen,
  editingStudent = {},
  handleClose,
  fetchStudents,
}) {
  const { register, handleSubmit } = useForm({});
  const [value, setValue] = React.useState(null);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const save = async (data) => {
    if (!data.nombres) {
      toast.error("El nombre es requerido");
      return;
    }
    if (!data.ApePaterno) {
      toast.error("Los apellidos son requeridos");
      return;
    }
    if (!data.ApeMaterno) {
      toast.error("Los apellidos son requeridos");
      return;
    }
    if (!data.Direccion) {
      toast.error("La direccion es requerido");
      return;
    }

    if (!data.TipoDocumento) {
      toast.error("La direccion es requerido");
      return;
    }

    if (
      // eslint-disable-next-line
      !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
        data.Correo
      )
    ) {
      toast.error("Ingresa un correo valido");
      return;
    }

    if (!data.Sexo) {
      toast.error("Debes seleccionar un sexo");
      return;
    }

    if (!data.NroDocIdent) {
      toast.error("El numero de documento es requerido");
      return;
    }

    if (!data.nombrePadre) {
      toast.error("El nombre del padre es requerido");
      return;
    }

    if (!data.nombreMadre) {
      toast.error("El nombre de la madre es requerido");
      return;
    }

    if (!data.apellidosPadre) {
      toast.error("Los apellidos del padre son requeridos");
      return;
    }

    if (!data.apellidosMadre) {
      toast.error("Los apellidos de la madre son requeridos");
      return;
    }

    if (!data.apellidosMadre) {
      toast.error("Los apellidos de la madre son requeridos");
      return;
    }

    if (!editingStudent.idEstudiante) {
      await Axios.post("http://localhost:4000/student", {
        ...data,
      });
    } else {
      await Axios.put(
        `http://localhost:4000/student/${editingStudent.idEstudiante}`,
        {
          ...data,
        }
      );
    }
    fetchStudents();
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
            {editingStudent.idEstudiante
              ? "Editar un alumno"
              : "Agregar alumno"}
          </DialogTitle>
          <DialogContent>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-required"
                    label="Nombres"
                    fullWidth
                    defaultValue={editingStudent?.nombres}
                    {...register("nombres")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-required"
                    label="Apellido paterno"
                    defaultValue={editingStudent?.ApePaterno}
                    {...register("ApePaterno")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-required"
                    label="Apellido materno"
                    defaultValue={editingStudent?.ApeMaterno}
                    {...register("ApeMaterno")}
                  />
                </Grid>

                <Grid item xs={6}>
                  <DesktopDatePicker
                    label="Fecha de nacimiento"
                    inputFormat="MM/dd/yyyy"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => (
                      <TextField {...params} {...register("FechaNac")} />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-required"
                    label="Celular"
                    defaultValue={editingStudent?.Celular}
                    {...register("Celular")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-required"
                    label="Correo"
                    defaultValue={editingStudent?.Correo}
                    {...register("Correo")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-required"
                    label="Direccion"
                    defaultValue={editingStudent?.Direccion}
                    {...register("Direccion")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Sexo"
                      defaultValue={editingStudent?.Sexo}
                      {...register("Sexo")}
                    >
                      <MenuItem value={"Masculino"}>Masculino</MenuItem>
                      <MenuItem value={"Femenino"}>Femenino</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-required"
                    label="Departamento"
                    defaultValue={editingStudent?.Departamento}
                    {...register("Departamento")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-required"
                    label="Distrito"
                    defaultValue={editingStudent?.Distrito}
                    {...register("Distrito")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Tipo de documento
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Tipo de documento"
                      defaultValue={editingStudent?.TipoDocumento}
                      {...register("TipoDocumento")}
                    >
                      <MenuItem value={"DNI"}>DNI</MenuItem>
                      <MenuItem value={"Pasaporte"}>Pasaporte</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-required"
                    label="NroDocIdent"
                    defaultValue={editingStudent?.NroDocIdent}
                    {...register("NroDocIdent")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-required"
                    label="DniPadre"
                    defaultValue={editingStudent?.DniPadre}
                    {...register("DniPadre")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-required"
                    label="nombrePadre"
                    defaultValue={editingStudent?.nombrePadre}
                    {...register("nombrePadre")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-required"
                    label="apellidosPadre"
                    defaultValue={editingStudent?.apellidosPadre}
                    {...register("apellidosPadre")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-required"
                    label="CeluPadre"
                    defaultValue={editingStudent?.CeluPadre}
                    {...register("CeluPadre")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-required"
                    label="DniMadre"
                    defaultValue={editingStudent?.DniMadre}
                    {...register("DniMadre")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-required"
                    label="nombreMadre"
                    defaultValue={editingStudent?.nombreMadre}
                    {...register("nombreMadre")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-required"
                    label="apellidosMadre"
                    defaultValue={editingStudent?.apellidosMadre}
                    {...register("apellidosMadre")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
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
