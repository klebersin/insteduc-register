import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Axios from "axios";
import { toast } from "react-toastify";
import React, { useState } from "react";

function StaffModal({
  openModal,
  setOpenModal,
  selectedStaff,
  setSelectedStaff,
  fetchStaff,
}) {
  const [staff, setStaff] = useState(selectedStaff || {});
  const handleSubmit = async () => {
    if(!staff.nombres){
      toast.error("El nombre del personal es requerido")
      return;
    }
    if(!staff.apePaterno){
      toast.error("El apellido parterno del personal es requerido")
      return;
    }
    if(!staff.apeMaterno){
      toast.error("El apellido materno del personal es requerido")
      return;
    }
    if(!staff.celular){
      toast.error("El celular del personal es requerido")
      return;
    }
    // eslint-disable-next-line
    if(!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
        staff.correo
    )){
      toast.error("Ingrese un correo válido")
      return;
    }
    if(!staff.sexo){
      toast.error("Seleccionar el género/sexo del personal")
      return;
    }
    if(!staff.usuario){
      toast.error("El usuario del personal es requerido")
      return;
    }
    if(!staff.contraseña){
      toast.error("La contraseña del personal es requerido")
      return;
    }
    if(!staff.direccion){
      toast.error("La dirección del personal es requerido")
      return;
    }
    if(!staff.rol){
      toast.error("Seleccionar el rol del personal")
      return;
    }
    try {
      if (!staff.iddocente) {
        await Axios.post(`http://localhost:4000/staff`, staff);
        toast.info("Personal agregado");
        setOpenModal(false);
      } else {
        await Axios.put(
          `http://localhost:4000/staff/${staff.iddocente}`,
          staff
        );
        toast.info("Personal actualizado");
        setOpenModal(false);
      }
    } catch (error) {
      toast.error(error.response?.data || "Error al agregar el personal");
    } finally {
      setSelectedStaff(null);
      fetchStaff();
    }
  };
  return (
    <div>
      <Dialog
        open={openModal}
        onClose={() => {
          setSelectedStaff(null);
          setOpenModal(false);
        }}
      >
        <form>
          <DialogTitle id="alert-dialog-title">{"Personal"}</DialogTitle>
          <DialogContent>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="staff-name"
                    label="Nombres del personal"
                    value={staff.nombres}
                    onChange={(e) =>
                      setStaff({ ...staff, nombres: e.target.value })
                    }
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    required
                    id="staff-lastname"
                    label="Apellido paterno"
                    value={staff.apePaterno}
                    onChange={(e) =>
                      setStaff({ ...staff, apePaterno: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="staff-midname"
                    label="Apellido materno"
                    value={staff.apeMaterno}
                    onChange={(e) =>
                      setStaff({ ...staff, apeMaterno: e.target.value })
                    }
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    required
                    id="phone-number-staff"
                    label="Celular del personal"
                    value={staff.celular}
                    onChange={(e) =>
                      setStaff({ ...staff, celular: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="email-staff"
                    label="Correo electronico"
                    value={staff.correo}
                    onChange={(e) =>
                      setStaff({ ...staff, correo: e.target.value })
                    }
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Sexo"
                      value={staff.sexo}
                      onChange={(e) =>
                        setStaff({ ...staff, sexo: e.target.value })
                      }
                    >
                      <MenuItem value={"Masculino"}>Masculino</MenuItem>
                      <MenuItem value={"Femenino"}>Femenino</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="staff-username"
                    label="Usuario"
                    value={staff.usuario}
                    onChange={(e) =>
                      setStaff({ ...staff, usuario: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="staff-password"
                    label="Contraseña"
                    value={staff.contraseña}
                    type="password"
                    onChange={(e) =>
                      setStaff({ ...staff, contraseña: e.target.value })
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    id="staff-address"
                    label="Direccion"
                    value={staff.direccion}
                    onChange={(e) =>
                      setStaff({ ...staff, direccion: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Rol"
                      value={staff.rol}
                      onChange={(e) =>
                        setStaff({ ...staff, rol: e.target.value })
                      }
                    >
                      <MenuItem value={"administrador"}>Administrador</MenuItem>
                      <MenuItem value={"docente"}>Docente</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Container>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setSelectedStaff(null);
                setOpenModal(false);
              }}
            >
              Cancelar
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              {staff.iddocente ? "Actualizar" : "Agregar"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default StaffModal;
