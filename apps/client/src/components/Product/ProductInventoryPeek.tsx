import { BasicWarehouseDto, ProductDto } from 'shared-types';
import useInventoryItemByProduct from '../../hooks/useInventoryItemByProduct';
import { HTTPResponseError, Utils } from '../../utils';
import EntityInfoTable from '../Entity/EntityInfoTable';
import Loader from '../Loader';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CurrentAppContext } from '../../context/CurrentAppContext';

export interface ProductInventoryPeek {
	warehouse: BasicWarehouseDto;
	product: ProductDto;
}

function ProductInventoryPeek({ warehouse, product }: ProductInventoryPeek) {
	const { inventoryItem, isLoading, error } = useInventoryItemByProduct(warehouse.id, product.id);
	const appContext = useContext(CurrentAppContext);

	function isNotFoundError(error: any) {
		const isHttpError = error instanceof HTTPResponseError;
		if (!isHttpError) return false;
		return error?.response?.status == 404;
	}

	const warehouseUrl = `${Utils.dashboardUrl(appContext)}/warehouses/view/${
		appContext.currentWarehouse.id
	}`;

	return (
		<>
			<h2 className="mb-4 mt-8 text-2xl">Inventory details</h2>
			<Loader
				isLoading={isLoading}
				isError={error != undefined && !isNotFoundError(error)}
			>
				<p className="mb-4">
					Inventory details for{' '}
					<Link
						to={warehouseUrl}
						className="link-primary font-bold"
					>
						{warehouse.name}
					</Link>{' '}
					warehouse:
				</p>
				<p>
					{inventoryItem ? (
						<EntityInfoTable
							properties={{
								quantity: `${inventoryItem.quantity} ${inventoryItem.unit || ''}`,
								location: inventoryItem.location,
							}}
						/>
					) : (
						<span className="italic">
							This item have not been added to this warehouse inventory yet
						</span>
					)}
				</p>
			</Loader>
		</>
	);
}
export default ProductInventoryPeek;
