import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuBookIcon from "@mui/icons-material/MenuBook";
//import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import GradeIcon from "@mui/icons-material/Grade";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { useNavigate } from "react-router-dom";

export default function ListItems() {
  const navigate = useNavigate();

  const goTo = (value) => {
    navigate(value);
  };

  return (
    <React.Fragment>
      <ListItemButton onClick={() => goTo("/general")}>
        <ListItemIcon>
          <SchoolIcon />
        </ListItemIcon>
        <ListItemText primary="Estudiantes" />
      </ListItemButton>
      <ListItemButton onClick={() => goTo("/grades")}>
        <ListItemIcon>
          <GradeIcon />
        </ListItemIcon>
        <ListItemText primary="Grados" />
      </ListItemButton>
      <ListItemButton onClick={() => goTo("/period")}>
        <ListItemIcon>
          <AssignmentTurnedInIcon />
        </ListItemIcon>
        <ListItemText primary="Periodos" />
      </ListItemButton>
      <ListItemButton onClick={() => goTo("/register")}>
        <ListItemIcon>
          <AppRegistrationIcon />
        </ListItemIcon>
        <ListItemText primary="Matriculas" />
      </ListItemButton>
      <ListItemButton onClick={() => goTo("/staff")}>
        <ListItemIcon>
          <SupervisedUserCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Personal" />
      </ListItemButton>
      <ListItemButton onClick={() => goTo("/courses")}>
        <ListItemIcon>
          <MenuBookIcon />
        </ListItemIcon>
        <ListItemText primary="Cursos" />
      </ListItemButton>
      <ListItemButton onClick={() => goTo("/assign")}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Asignacion" />
      </ListItemButton>
      <ListItemButton onClick={() => goTo("/dashboard/staff")}>
        <ListItemIcon>
          <AssignmentTurnedInIcon />
        </ListItemIcon>
        <ListItemText primary="Registrar notas" />
      </ListItemButton>
    </React.Fragment>
  );
}
