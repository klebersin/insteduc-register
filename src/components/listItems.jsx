import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
//import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
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
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Estudiantes" />
      </ListItemButton>
      <ListItemButton onClick={() => goTo("/register")}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Matriculas" />
      </ListItemButton>
      <ListItemButton onClick={() => goTo("/reports")}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reportes" />
      </ListItemButton>
      <ListItemButton onClick={() => goTo("/")}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Docentes" />
      </ListItemButton>
      <ListItemButton onClick={() => goTo("/")}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Registro de notas" />
      </ListItemButton>
    </React.Fragment>
  );
}
