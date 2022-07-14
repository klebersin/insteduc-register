import { Button, Container, Grid, Paper } from "@mui/material";
import Axios from "axios";
import React, { useState } from "react";
import PeriodForm from "./PeriodForm";
import PeriodTable from "./PeriodTable";

function PeriodView() {
  const [openForm, setOpenForm] = React.useState(false);
  const [periods, setPeriods] = React.useState([]);
  const [editingPeriod, setEditingPeriod] = useState(null);

  const fetchPeriods = async () => {
    const fetchedPeriods = await Axios.get("http://localhost:4000/period");
    setPeriods(fetchedPeriods.data);
  };

  React.useEffect(() => {
    fetchPeriods();
  }, []);

  const openDialog = (row) => {
    setEditingPeriod(row);
    setOpenForm(true);
  };
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button variant="contained" onClick={() => openDialog()}>
            Agregar un periodo
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <PeriodTable
              editPeriod={openDialog}
              periods={periods}
              fetchPeriods={fetchPeriods}
            />
          </Paper>
        </Grid>
        {openForm && (
          <PeriodForm
            open={openForm}
            setOpen={setOpenForm}
            editingPeriod={editingPeriod}
            handleClose={() => {
              setOpenForm(false);
            }}
            fetchPeriods={fetchPeriods}
          />
        )}
      </Grid>
    </Container>
  );
}

export default PeriodView;
