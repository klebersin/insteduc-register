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

function StaffModal({
  openModal,
  setOpenModal,
  selectedStaff,
  setSelectedStaff,
  fetchStaff,
}) {
  const [staff, setStaff] = useState(selectedStaff || {});
  const handleSubmit = async () => {
    try {
      if (!staff.iddocente) {
        await Axios.post(`http://localhost:4000/staff`, staff);
        toast.info("Docente agregado");
        setOpenModal(false);
      } else {
        await Axios.put(
          `http://localhost:4000/staff/${staff.iddocente}`,
          staff
        );
        toast.info("Docente actualizado");
        setOpenModal(false);
      }
    } catch (error) {
      toast.error(error.response?.data || "Error al agregar el docente");
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
          <DialogTitle id="alert-dialog-title">{"Docente"}</DialogTitle>
          <DialogContent>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="staff-name"
                    label="Nombres del docente"
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
                    label="Celular del docente"
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
                  <TextField
                    required
                    id="staff-gender"
                    label="Sexo del docente"
                    value={staff.sexo}
                    onChange={(e) =>
                      setStaff({ ...staff, sexo: e.target.value })
                    }
                  />
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
