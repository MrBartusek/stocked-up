import { useEffect, useState } from 'react';
import useWarehousesList from './useWarehousesList';

function useWarehouse() {
	const { warehouses } = useWarehousesList();
	const [currentWarehouse, setCurrentWarehouse] = useState<BaseWarehouse | null>(null);

	useEffect(() => {
		// Quite ideally, at least one warehouse should be present at all times
		// but if that is not the case just leave it as null
		if (!currentWarehouse && warehouses?.length > 0) {
			setCurrentWarehouse(warehouses[0]);
		}
	}, [warehouses, currentWarehouse]);

	return {
		warehouses: warehouses || [],
		currentWarehouse,
		setCurrentWarehouse,
	};
}

export default useWarehouse;
