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
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.minQty}</TableCell>
        <TableCell>{row.currentQty}</TableCell>
        <TableCell>{row.active ? 'Si' : 'No'}</TableCell>
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
                        <TableCell>{productRow.name}</TableCell>
                        <TableCell>{productRow.type}</TableCell>
                        <TableCell>{productRow.currentQty}</TableCell>
                        <TableCell>{productRow.price}</TableCell>
                        <TableCell>{productRow.active ? 'Si' : 'No'}</TableCell>
                        <TableCell>{productRow.expireDate}</TableCell>
                        <TableCell>{productRow.warehouseID}</TableCell>
                        <TableCell>{productRow.providerId}</TableCell>
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
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    minQty: PropTypes.number.isRequired,
    maxQty: PropTypes.number.isRequired,
    currentQty: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        uom: PropTypes.string.isRequired,
        cost: PropTypes.number.isRequired,
        qty: PropTypes.number.isRequired,
        active: PropTypes.bool.isRequired,
        price: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        warehouseID: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        expireDate: PropTypes.string.isRequired,
        providerId: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default function Inventory({ onAddProduct }) {
  const rows = useWarehousesStore((state) => state.warehouses);

  function addProduct() {
    onAddProduct();
  }

  return (
    <Box>
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
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}