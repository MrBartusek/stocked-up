import { WarehouseContext } from '../context/WarehouseContext';
import useWarehouse from '../hooks/useWarehouse';
import Router from './Router';

function StockedUp() {
	const useWarehouseData = useWarehouse();

	return (
		<WarehouseContext.Provider value={useWarehouseData}>
			<Router />
		</WarehouseContext.Provider>
	);
}
export default StockedUp;
