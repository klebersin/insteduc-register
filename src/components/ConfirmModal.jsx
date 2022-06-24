import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

function ConfirmModal({ open, setOpen, deleteStudent, deletingUser }) {
  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form>
          <DialogTitle id="alert-dialog-title">
            {"Eliminar un alumno"}
          </DialogTitle>
          <DialogContent>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <DialogContentText>Eliminar usuario?</DialogContentText>
            </Container>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                deleteStudent(deletingUser);
                setOpen(false);
              }}
            >
              Eliminar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default ConfirmModal;
