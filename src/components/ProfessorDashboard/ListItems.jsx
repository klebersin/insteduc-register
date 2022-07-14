import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
//import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SchoolIcon from "@mui/icons-material/School";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useNavigate } from "react-router-dom";

export default function ListItems() {
  const navigate = useNavigate();

  const goTo = (value) => {
    navigate(value);
  };

  return (
    <React.Fragment>
      <ListItemButton onClick={() => goTo("/dashboard/staff/courses")}>
        <ListItemIcon>
          <MenuBookIcon />
        </ListItemIcon>
        <ListItemText primary="Mis cursos" />
      </ListItemButton>
      <ListItemButton onClick={() => goTo("/dashboard/staff/students")}>
        <ListItemIcon>
          <SchoolIcon />
        </ListItemIcon>
        <ListItemText primary="Estudiantes" />
      </ListItemButton>
      <ListItemButton onClick={() => goTo("/general")}>
        <ListItemIcon>
          <ArrowBackIcon />
        </ListItemIcon>
        <ListItemText primary="Regresar" />
      </ListItemButton>
    </React.Fragment>
  );
}
