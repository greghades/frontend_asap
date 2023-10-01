import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import { IconButton } from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import DatePicker from '@mui/lab/DatePicker';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

const initialValues = {
    nombre: '',
    descripcion: '',
    cantidad: '',
    costo: '',
    precio: '',
    almacenId: '',
    proveedorId: '',
    tipo: '',
    unidadMedida: '',
    disponible: 'si',
    fechaExpiracion: null,
};

const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    color: '#20528E',
    '&:hover': {
        backgroundColor: 'transparent', 
        color: '#112B4B'
    },
    '& > span': { 
        fontSize: '1rem', 
        fontWeight: 'bold' 
    }
};

export default function AddProduct({ onBack }) {
    const [formValues, setFormValues] = useState(initialValues);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleDateChange = (date) => {
        setFormValues({ ...formValues, fechaExpiracion: date });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here, e.g., send data to the server
        console.log('Form values:', formValues);
    };

    return (
        <Box>
            <IconButton onClick={onBack} sx={buttonStyle}>
                <ArrowBackIosNewRoundedIcon />
                <span>Regresar</span>
            </IconButton>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    name="nombre"
                    label="Nombre"
                    placeholder="Ingresa tu nombre"
                    value={formValues.nombre}
                    onChange={handleChange}
                    style={{ margin: '0.5em 0' }}
                />
                <TextField
                    fullWidth
                    name="descripcion"
                    label="Descripción"
                    placeholder="Ingresa la función de tu producto"
                    value={formValues.descripcion}
                    onChange={handleChange}
                    style={{ margin: '0.5em 0' }}
                />
                <TextField
                    fullWidth
                    name="cantidad"
                    label="Cantidad"
                    placeholder="Ingresa cuantas existencias de tu producto hay"
                    type="number"
                    value={formValues.cantidad}
                    onChange={handleChange}
                    style={{ margin: '0.5em 0' }}
                />
                <TextField
                    fullWidth
                    name="costo"
                    label="Costo"
                    placeholder="Ingresa el precio de compra"
                    type="number"
                    value={formValues.costo}
                    onChange={handleChange}
                    style={{ margin: '0.5em 0' }}
                />
                <TextField
                    fullWidth
                    name="precio"
                    label="Precio"
                    placeholder="Ingresa el precio de venta (Opcional)"
                    type="number"
                    value={formValues.precio}
                    onChange={handleChange}
                    style={{ margin: '0.5em 0' }}
                />
                <TextField
                    fullWidth
                    name="almacenId"
                    label="ID del almacén"
                    placeholder="Ingresa el ID del almacén"
                    value={formValues.almacenId}
                    onChange={handleChange}
                    style={{ margin: '0.5em 0' }}
                />
                <TextField
                    fullWidth
                    name="proveedorId"
                    label="ID del proveedor"
                    placeholder="Ingresa el ID del proveedor"
                    value={formValues.proveedorId}
                    onChange={handleChange}
                    style={{ margin: '0.5em 0' }}
                />
                <TextField
                    fullWidth
                    name="tipo"
                    label="Tipo"
                    select
                    value={formValues.tipo}
                    onChange={handleChange}
                    style={{ margin: '0.5em 0' }}
                >
                    <MenuItem value="tipo1">Tipo 1</MenuItem>
                    <MenuItem value="tipo2">Tipo 2</MenuItem>
                    <MenuItem value="tipo3">Tipo 3</MenuItem>
                </TextField>
                <TextField
                    fullWidth
                    name="unidadMedida"
                    label="Unidad de medida"
                    select
                    value={formValues.unidadMedida}
                    onChange={handleChange}
                    style={{ margin: '0.5em 0' }}
                >
                    <MenuItem value="unidad1">Unidad 1</MenuItem>
                    <MenuItem value="unidad2">Unidad 2</MenuItem>
                    <MenuItem value="unidad3">Unidad 3</MenuItem>
                </TextField>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Disponible</FormLabel>
                    <RadioGroup
                        name="disponible"
                        value={formValues.disponible}
                        onChange={handleChange}
                        style={{ margin: '0.5em 0' }}
                        row
                    >
                        <FormControlLabel value="si" control={<Radio />} label="Sí" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
                <DatePicker
                    label="Fecha de expiración (Opcional)"
                    value={formValues.fechaExpiracion}
                    onChange={handleDateChange}
                    style={{ margin: '0.5em 0' }}
                    renderInput={(params) => <TextField {...params} />}
                />
                <Box mt={2}>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </Box>
            </form>
        </Box>
    );
}
