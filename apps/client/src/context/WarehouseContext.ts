import { createContext } from 'react';
import SharedTypes from 'shared-types';

export const WarehouseContext = createContext<{
	currentWarehouse: SharedTypes.BaseWarehouse | null;
	setCurrentWarehouse: React.Dispatch<React.SetStateAction<SharedTypes.BaseWarehouse | null>>;
	warehouses: SharedTypes.BaseWarehouse[];
}>(null as any);
