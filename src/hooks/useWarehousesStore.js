import { create } from 'zustand';
import { getItemLocalStorage, setItemLocalStorage } from '@/utils';
import axios from 'axios';

axios.defaults.baseURL = 'http://34.204.90.28/';

function processWarehousesData(warehousesData, productsData) {
	const updatedWarehouses = warehousesData.map((warehouse) => {
		const productsInWarehouse = productsData.filter(
			(product) => product.almacen_id === warehouse.id
		);

		return {
			...warehouse,
			products: productsInWarehouse,
			currentQty: productsInWarehouse.length,
			active: productsInWarehouse.length > 0,
		};
	});

	return updatedWarehouses;
}

export const useWarehousesStore = create((set) => ({
	warehouses: [],
	initializeWarehouses: async () => {
		try {
			const [warehousesResponse, productsResponse] = await Promise.all([
				axios.get('logistica/api/almacen/'),
				axios.get('producion/api/producto/'),
			]);

			if (warehousesResponse.data && productsResponse.data) {
				const updatedWarehouses = processWarehousesData(
					warehousesResponse.data,
					productsResponse.data
				);
				set({ warehouses: updatedWarehouses });
				setItemLocalStorage('warehouses', updatedWarehouses);
			}
		} catch (error) {
			 const existingWarehouses = getItemLocalStorage('warehouses');

			 if (existingWarehouses) {
			   set({ warehouses: existingWarehouses });
			 } else {
			   set({ warehouses: [] });
			 }
		}
	},
	create: (newWarehouse) =>
		set((state) => {
			const newWarehouseFormat = {
				...newWarehouse,
				currentQty: 0,
				active: false
			};

			const warehousess = [...state.warehouses, newWarehouseFormat];

			setItemLocalStorage('warehouses', warehousess);
			return { warehouses: warehousess };
		}),

	delete: (codeDelete) =>
		set((state) => {
			const warehousesList = state.warehouses.filter(
				({ code }) => code !== codeDelete
			);
			setItemLocalStorage('warehouses', warehousesList);
			return { warehouses: warehousesList };
		}),

	edit: (data, codeWarehouse) =>
		set((state) => {
			let warehouse = state.warehouses.find(
				({ code }) => code === codeWarehouse
			);

			const warehousesList = state.warehouses.filter(
				({ code }) => code !== codeWarehouse
			);

			warehouse = { ...warehouse, ...data };

			warehousesList.push(warehouse);

			setItemLocalStorage('warehouses', warehousesList);
			return { warehouses: warehousesList };
		})
}));