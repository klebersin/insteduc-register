import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuBookIcon from '@mui/icons-material/MenuBook';
//import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import GradeIcon from "@mui/icons-material/Grade";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import BookIcon from "@mui/icons-material/Book";
import BarChartIcon from "@mui/icons-material/BarChart";
import { useNavigate } from "react-router-dom";

export default function ListItems() {
    const navigate = useNavigate();

    const goTo = (value) => {
        navigate(value);
    };

    return (
        <React.Fragment>
            <ListItemButton onClick={() => goTo("/staff")}>
                <ListItemIcon>
                    <SchoolIcon />
                </ListItemIcon>
                <ListItemText primary="Estudiantes" />
            </ListItemButton>
        </React.Fragment>
    );
}
