import { Button, Container, Grid, Paper } from "@mui/material";
import React, { useCallback, useState } from "react";
import Axios from "axios";
import AssignTable from "./AssignTable";
import AssignModal from "./AssignModal";

function AssignView() {
  const [assigns, setAssigns] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const [selectedAssign, setSelectedAssign] = useState(null);
  const fetchAssigns = useCallback(async () => {
    const res = await Axios.get("http://localhost:4000/assigns");
    setAssigns(res.data);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Asignar un curso
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
            <AssignTable
              fetchAssigns={fetchAssigns}
              assigns={assigns}
              setSelectedAssign={setSelectedAssign}
              setOpenModal={setOpenModal}
            />
          </Paper>
        </Grid>
        {openModal && (
          <AssignModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            selectedAssign={selectedAssign}
            setSelectedAssign={setSelectedAssign}
            fetchAssigns={fetchAssigns}
          />
        )}
      </Grid>
    </Container>
  );
}

export default AssignView;
