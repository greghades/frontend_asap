import { create } from 'zustand';
import { getItemLocalStorage, setItemLocalStorage } from '@/utils';
import { warehouses } from '@/mockups'

function warehousesInitialState() {
	let warehouse = getItemLocalStorage('warehouses');

	if (!warehouse) {
		setItemLocalStorage('warehouses', warehouses);
		warehouse = getItemLocalStorage('warehouses');
	}

	return warehouse;
}

export const useWarehousesStore = create((set) => ({
	warehouses: warehousesInitialState(),
	create: (newWarehouse) =>
		set((state) => {
      const newWarehouseFormat = {
        ...newWarehouse,
        id: state.warehouses.length,
        currentQty: 10,
        active: true
      };
      
      const warehousess = [...state.warehouses, newWarehouseFormat];

			setItemLocalStorage('warehouses', warehousess);
			return { warehouses: warehousess };
		}),
	delete: (codeDelete) =>
		set((state) => {
      const warehousesList = state.filter(
        ({ code }) => code !== codeDelete
      )
			setItemLocalStorage('warehouses', warehousesList);
			return { warehouses: warehousesList };
		}),
	edit: (data, codeWarehouse) =>
		set((state) => {
			let warehouse = state.filter(
        ({ code }) => code === codeWarehouse
      )[0];

      const warehousesList = state.filter(
        ({ code }) => code !== codeWarehouse
      );

      warehouse = { ...warehouse, ...data };

      warehousesList.push(warehouse);

			setItemLocalStorage('warehouses', warehousesList);
			return { warehousesList };
		})
}));
