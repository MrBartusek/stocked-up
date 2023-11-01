import { createContext } from 'react';

export const WarehouseContext = createContext<{
	currentWarehouse: BaseWarehouse | null;
	setCurrentWarehouse: React.Dispatch<React.SetStateAction<BaseWarehouse | null>>;
	warehouses: BaseWarehouse[];
}>(null as any);
