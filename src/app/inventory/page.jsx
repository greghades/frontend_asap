import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TablePagination from '@mui/material/TablePagination';
import Button from '@mui/material/Button';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import { useWarehousesStore } from '@/hooks/useWarehousesStore';
import { useEffect } from 'react';
import { Grid, Item } from '@mui/material';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            sx={{
              ':hover': {
                bgcolor: '#112B4B',
                color: 'white',
              },
              '&': {
                backgroundColor: '#20528E',
                color: 'white'
              }
            }}
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell sx={{ textTransform: 'capitalize' }}>{row.nombre}</TableCell>
        <TableCell>{row.minimo}</TableCell>
        <TableCell>{row.currentQty}</TableCell>
        <TableCell>{row.activo ? 'Si' : 'No'}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Productos
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Tipo</TableCell>
                    <TableCell>Cantidad</TableCell>
                    <TableCell>Precio</TableCell>
                    <TableCell>Disponible</TableCell>
                    <TableCell>Fecha de expiracion</TableCell>
                    <TableCell>ID de inventario</TableCell>
                    <TableCell>ID de proveedor</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((productRow) => (
                      <TableRow key={productRow.id}>
                        <TableCell component="th" scope="row">{productRow.id}</TableCell>
                        <TableCell sx={{ textTransform: 'capitalize' }}>{productRow.nombre}</TableCell>
                        <TableCell sx={{ textTransform: 'capitalize' }}>{productRow.tipo}</TableCell>
                        <TableCell>{productRow.cantidad}</TableCell>
                        <TableCell>{productRow.precio}</TableCell>
                        <TableCell>{productRow.activo ? 'Si' : 'No'}</TableCell>
                        <TableCell>{productRow.fecha_expiracion}</TableCell>
                        <TableCell>{productRow.almacen_id}</TableCell>
                        <TableCell>{productRow.proveedor_id}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={row.products.length}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(event) => {
                  setRowsPerPage(parseInt(event.target.value, 10));
                  setPage(0);
                }}
                labelRowsPerPage="Filas por página:"
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // id can be a string or number
    codigo: PropTypes.string, // Assuming this field is present for warehouses
    nombre: PropTypes.string.isRequired,
    maximo: PropTypes.number.isRequired,
    minimo: PropTypes.number.isRequired,
    activo: PropTypes.bool.isRequired,
    currentQty: PropTypes.number.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // id can be a string or number
        name: PropTypes.string.isRequired,
        descripcion: PropTypes.string.isRequired,
        tipo: PropTypes.string.isRequired,
        cantidad: PropTypes.number.isRequired,
        costo: PropTypes.number.isRequired,
        ultimo_cost: PropTypes.number.isRequired,
        precio: PropTypes.number.isRequired,
        activo: PropTypes.bool.isRequired,
        fecha_expiracion: PropTypes.string.isRequired,
        almacen_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // almacen_id can be a string or number
        unidad_medida_id: PropTypes.string.isRequired,
        proveedor_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // proveedor_id can be a string or number
      })
    ).isRequired,
  }).isRequired,
};

export default function Inventory({ onAddProduct }) {
  const { warehouses, initializeWarehouses } = useWarehousesStore();

  useEffect(() => {
    initializeWarehouses();
  }, [initializeWarehouses]);

  function addProduct() {
    onAddProduct();
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
        <Button
          variant="contained"
          size="large"
          startIcon={<ControlPointRoundedIcon />}
          sx={{
            textTransform: 'none',
            justifyContent: 'flex-start',
            ':hover': {
              bgcolor: '#112B4B'
            },
            '&': {
              marginBottom: '1em',
              backgroundColor: '#20528E',
              color: 'white'
            }
          }}
          onClick={() => {
            addProduct();
          }}
        >
          Agregar producto
        </Button>
        <Button
          variant="contained"
          size="large"
          startIcon={<FlagCircleIcon />}
          sx={{
            textTransform: 'none',
            justifyContent: 'flex-start',
            ':hover': {
              bgcolor: '#112B4B'
            },
            '&': {
              marginBottom: '1em',
              backgroundColor: '#20528E',
              color: 'white'
            }
          }}
          onClick={() => {
            addProduct();
          }}
        >
          Generar reporte
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Cantidad mínima</TableCell>
              <TableCell>Cantidad actual</TableCell>
              <TableCell>Disponible</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {warehouses.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}