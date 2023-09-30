'use client'

import { useState } from 'react';

import { Box, Modal } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';

import { useWarehousesStore, useSchema, useAuth } from '@/hooks';
import { Button, Text, Input, Cell } from '@/components'

const columns = [
  { 
    field: 'code',
    headerName: 'Codigo',
    width: 200,
    renderCell: (params) => <Cell params={params} /> 
  },
  {
    field: 'name',
    headerName: 'Nombre',
    width: 200,
    renderCell: (params) => <Cell params={params} />
  },
  {
    field: 'type',
    headerName: 'Tipo',
    width: 200
  },
  {
    field: 'minQty',
    headerName: 'Cantidad Minima en Almacen',
    type: 'number',
    width: 250
  },
  {
    field: 'maxQty',
    headerName: 'Cantidad Maxima en Almacen',
    type: 'number',
    width: 250
  },
  {
    field: 'currentQty',
    headerName: 'Cantidad Actual en Almacen',
    type: 'number',
    width: 250
  },
  {
    field: 'active',
    headerName: 'Almacen Activo',
    type: 'boolean',
    width: 250
  }
]

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const warehouseSchema = yup.object({
  name: yup.string().required(),
  type: yup.string().required(),
  code: yup.string().required(),
  minQty: yup.number().positive().integer().required(),
  maxQty: yup.number().positive().integer().required()
})

export default function Warehouses() {
  const [openModal, setOpenModal] = useState(false);
  const warehouses = useWarehousesStore((state) => state.warehouses);
  const createWarehouse = useWarehousesStore((state) => state.create);

  const resolver = useSchema(warehouseSchema);

  const { handleSubmit, control, register } = useForm({
    reValidateMode: 'onBlur',
    resolver
  });

  function submitWarehouse(data) {
    createWarehouse(data)
    handleCloseModal()
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  function handleOpenModal() {
    setOpenModal(true);
  }

  return (
    <Box sx={{ heigth: 800, width: '100%' }}>
      <Box sx={{ paddingBottom: '2%' }}>
        <Button onClick={handleOpenModal}>Nuevo</Button>
      </Box>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box 
            component="form"
            noValidate
            autoComplete="off"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1.5em'
            }}
            onSubmit={handleSubmit(submitWarehouse)}
          >
            <Text>Nuevo Almacen</Text>
            <Controller
    					control={control}
		    			defaultValue=''
    					name='name'
		    			render={({ field }) => (
				    		<Input
						    	{...field}
    							label='Nombre'
		    					fullWidth
				    			refs={register('name')}
						    />
    					)}
		    		/>
            <Controller
    					control={control}
		    			defaultValue=''
    					name='type'
		    			render={({ field }) => (
				    		<Input
						    	{...field}
    							label='Tipo'
		    					fullWidth
				    			refs={register('type')}
						    />
    					)}
		    		/>
            <Controller
    					control={control}
		    			defaultValue=''
    					name='code'
		    			render={({ field }) => (
				    		<Input
						    	{...field}
    							label='Codigo'
		    					fullWidth
				    			refs={register('code')}
						    />
    					)}
		    		/>
            <Controller
    					control={control}
		    			defaultValue=''
    					name='minQty'
		    			render={({ field }) => (
				    		<Input
						    	{...field}
    							label='Cantidad Minima'
		    					fullWidth
				    			refs={register('minQty')}
						    />
    					)}
		    		/>
            <Controller
    					control={control}
		    			defaultValue=''
    					name='maxQty'
		    			render={({ field }) => (
				    		<Input
						    	{...field}
    							label='Cantidad Maxima'
		    					fullWidth
				    			refs={register('maxQty')}
						    />
    					)}
		    		/>
            <Button type="submit">Crear</Button>
          </Box>
        </Box>
      </Modal>

      <DataGrid 
        columns={columns}
        rows={warehouses}
        pageSizeOptions={[30]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  )
}
