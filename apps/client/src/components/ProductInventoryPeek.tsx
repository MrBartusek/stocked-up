import { BasicWarehouseDto, ProductDto } from 'shared-types';
import useInventoryItemByProduct from '../hooks/useInventoryItemByProduct';
import { HTTPResponseError } from '../utils';
import EntityInfoTable from './EntityInfoTable';
import Loader from './Loader';

export interface ProductInventoryPeek {
	warehouse: BasicWarehouseDto;
	product: ProductDto;
}

function ProductInventoryPeek({ warehouse, product }: ProductInventoryPeek) {
	const { inventoryItem, isLoading, error } = useInventoryItemByProduct(warehouse.id, product.id);

	function isNotFoundError(error: any) {
		const isHttpError = error instanceof HTTPResponseError;
		if (!isHttpError) return false;
		return error?.response?.status == 404;
	}

	return (
		<>
			<h2 className="mb-4 mt-8 text-2xl">Inventory details</h2>
			<Loader
				isLoading={isLoading}
				isError={error != undefined && !isNotFoundError(error)}
			>
				<p className="mb-4">
					Inventory details for <span className="font-bold">{warehouse.name}</span> warehouse:
				</p>
				<p>
					{inventoryItem ? (
						<EntityInfoTable
							properties={{
								quantity: inventoryItem.quantity,
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
