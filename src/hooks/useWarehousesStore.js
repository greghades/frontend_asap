import { create } from 'zustand';
import { getItemLocalStorage, setItemLocalStorage } from '@/utils';
import { warehouses } from '@/mockups'
import { products } from '@/mockups';

function warehousesInitialState() {
	let updatedWarehouses = []

	if (getItemLocalStorage('warehouses')) {
		updatedWarehouses = getItemLocalStorage('warehouses');
	} else {
		updatedWarehouses = warehouses;
		populateWarehouses(updatedWarehouses);
		setItemLocalStorage('warehouses', warehouses);
	}

	return updatedWarehouses;
}

function populateWarehouses(warehouses) {
	warehouses.forEach((warehouse) => {
		const productsInWarehouse = products.filter(
			(product) => product.warehouseID === warehouse.id
		);

		warehouse.products = productsInWarehouse;
		warehouse.currentQty = productsInWarehouse.length;
		warehouse.active = productsInWarehouse.length > 0;
	});
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

// export const useWarehousesStore = create((set) => ({
// 	warehouses: warehousesInitialState(),
// create: (newWarehouse) =>
// 	set((state) => {
// 		const newWarehouseFormat = {
// 			...newWarehouse,
// 			id: state.warehouses.length,
// 			currentQty: 10,
// 			active: true
// 		};

// 		const warehousess = [...state.warehouses, newWarehouseFormat];

// 		setItemLocalStorage('warehouses', warehousess);
// 		return { warehouses: warehousess };
// 	}),
// delete: (codeDelete) =>
// 	set((state) => {
// 		const warehousesList = state.filter(
// 			({ code }) => code !== codeDelete
// 		)
// 		setItemLocalStorage('warehouses', warehousesList);
// 		return { warehouses: warehousesList };
// 	}),
// edit: (data, codeWarehouse) =>
// 	set((state) => {
// 		let warehouse = state.filter(
// 			({ code }) => code === codeWarehouse
// 		)[0];

// 		const warehousesList = state.filter(
// 			({ code }) => code !== codeWarehouse
// 		);

// 		warehouse = { ...warehouse, ...data };

// 		warehousesList.push(warehouse);

// 		setItemLocalStorage('warehouses', warehousesList);
// 		return { warehousesList };
// 	})
// }));
