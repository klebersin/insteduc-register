import { Button, Container, Grid } from "@mui/material";
import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import RegisterTable from "./RegisterTable";

function RegisterView() {
  const [openForm, setOpenForm] = useState(false);
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={() => {
              setOpenForm(true);
            }}
          >
            Matricular
          </Button>
        </Grid>
      </Grid>
      <RegisterForm open={openForm} setOpenForm={setOpenForm} />
      <RegisterTable />
    </Container>
  );
}

export default RegisterView;
