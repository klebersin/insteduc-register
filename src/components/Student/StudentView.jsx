import { Button, Container, Grid, Paper } from "@mui/material";
import Axios from "axios";
import React, { useState } from "react";
import StudentForm from "./StudentForm";
import StudentTable from "./StudentTable";

function StudentView() {
  const [openForm, setOpenForm] = React.useState(false);
  const [students, setStudents] = React.useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  const fetchStudents = async () => {
    const fetchedStudents = await Axios.get("http://localhost:4000/student");
    setStudents(fetchedStudents.data);
  };

  React.useEffect(() => {
    fetchStudents();
  }, []);

  const openDialog = (row) => {
    setEditingStudent(row);
    setOpenForm(true);
  };
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button variant="contained" onClick={() => openDialog()}>
            Agregar un alumno
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
            <StudentTable
              editStudent={openDialog}
              students={students}
              fetchStudents={fetchStudents}
            />
          </Paper>
        </Grid>
        {openForm && (
          <StudentForm
            open={openForm}
            setOpen={setOpenForm}
            editingStudent={editingStudent}
            handleClose={() => {
              setOpenForm(false);
            }}
            fetchStudents={fetchStudents}
          />
        )}
      </Grid>
    </Container>
  );
}

export default StudentView;
