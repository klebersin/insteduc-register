import { Button, Container, Grid, Paper } from "@mui/material";
import React, { useCallback, useState } from "react";
import Axios from "axios";
import StaffTable from "./StaffTable";
import StaffModal from "./StaffModal";

function StaffView() {
  const [staffs, setStaffs] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const [selectedStaff, setSelectedStaff] = useState(null);
  const fetchStaff = useCallback(async () => {
    const res = await Axios.get("http://localhost:4000/staff");
    setStaffs(res.data);
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
            Agregar un docente
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
            <StaffTable
              fetchStaff={fetchStaff}
              staffs={staffs}
              setSelectedStaff={setSelectedStaff}
              setOpenModal={setOpenModal}
            />
          </Paper>
        </Grid>
        {openModal && (
          <StaffModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            selectedStaff={selectedStaff}
            setSelectedStaff={setSelectedStaff}
            fetchStaff={fetchStaff}
          />
        )}
      </Grid>
    </Container>
  );
}

export default StaffView;
