import React, { useEffect } from "react";
import Axios from "axios";
import {
    Button,
    ButtonGroup,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

function NoteTable({ fetchNote, note, setSelectedNote, setOpenModal }) {
    useEffect(() => {
        fetchNote();
    }, [fetchNote]);

    const deleteStaff = async (idnota) => {
        await Axios.delete(`http://localhost:4000/staff/${idnota}`);
        await fetchNote();
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Nombres</TableCell>
                        <TableCell>Apellido paterno</TableCell>
                        <TableCell>Apellido materno</TableCell>
                        <TableCell>Celular</TableCell>
                        <TableCell>Correo</TableCell>
                        <TableCell>Direccion</TableCell>
                        <TableCell>Sexo</TableCell>
                        <TableCell>Opciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {note.map((row, index) => (
                        <TableRow
                            key={row.idnota}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {index + 1}
                            </TableCell>
                            <TableCell>{row.nombres}</TableCell>
                            <TableCell>{row.apePaterno}</TableCell>
                            <TableCell>{row.apeMaterno}</TableCell>
                            <TableCell>{row.celular}</TableCell>
                            <TableCell>{row.correo}</TableCell>
                            <TableCell>{row.direccion}</TableCell>
                            <TableCell>{row.sexo}</TableCell>

                            <TableCell>
                                <ButtonGroup>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            setOpenModal(true);
                                            setSelectedNote(row);
                                        }}
                                    >
                                        Editar
                                    </Button>

                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => {
                                            deleteStaff(row.idnota);
                                        }}
                                    >
                                        Eliminar
                                    </Button>
                                </ButtonGroup>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default NoteTable;
