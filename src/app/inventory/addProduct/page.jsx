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
import axios from 'axios';
import { bool } from 'yup';

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

const initialValues = {
    nombre: '',
    descripcion: '',
    tipo: '',
    disponible: 0,
    fechaExpiracion: null,
    costo: null,
    precio: null,
    cantidad: null,
    almacenId: null,
    proveedorId: null,
    unidadMedida: null,
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Prepare the data object based on your parameters
        const data = {
            nombre: formValues.nombre,
            descripcion: formValues.descripcion,
            tipo: formValues.tipo,
            cantidad: parseInt(formValues.cantidad),
            costo: parseFloat(formValues.costo),
            precio: formValues.precio !== null ? parseInt(formValues.precio) : 0,
            activo: parseInt(formValues.disponible),
            fecha_expiracion: formValues.fechaExpiracion !== null ? formValues.fechaExpiracion.toISOString() : null,
            almacen_id: parseInt(formValues.almacenId),
            unidad_medida: parseInt(formValues.unidadMedida),
            proveedor_id: parseInt(formValues.proveedorId),
        };

        try {
            console.log('Sending data:', data);
            console.log('test');
            const response = await axios.post('producion/api/producto/', data);
            console.log('Data sent successfully:', response.data);
            console.log('Status:', response.status);
            if (response.status === 201) {
                alert('Producto creado exitosamente');
                onBack();
            } else {
                alert('Ha ocurrido un error al crear el producto. El error es:', response.data);
            }

            setFormValues(initialValues);
        } catch (error) {
            console.error('Error sending data:', error);
        }
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
                    label="Precio (Opcional)"
                    placeholder="Ingresa el precio de venta"
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
                    <MenuItem value='ingrediente'>Ingrediente</MenuItem>
                    <MenuItem value='insumo'>Insumo</MenuItem>
                    <MenuItem value='platillo'>Platillo</MenuItem>
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
                    <MenuItem value="1">Kilogramo (kg)</MenuItem>
                    <MenuItem value="2">Litro (lt)</MenuItem>
                    <MenuItem value="3">No medible</MenuItem>
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
                        <FormControlLabel value={1} control={<Radio />} label="Sí" />
                        <FormControlLabel value={0} control={<Radio />} label="No" />
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