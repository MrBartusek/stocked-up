import { useContext } from 'react';
import { BsBox, BsBoxFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { ProductDto } from 'shared-types';
import useInventoryItemByProduct from '../../hooks/useInventoryItemByProduct';
import { HTTPResponseError, Utils } from '../../utils';
import { CurrentAppContext } from '../Context/CurrentAppContext';
import IconButton from '../IconButton';

export interface ProductAddToInventoryButtonProps {
	product: ProductDto;
}

function ProductAddToInventoryButton({ product }: ProductAddToInventoryButtonProps) {
	const appContext = useContext(CurrentAppContext);
	const { inventoryItem, isLoading, error } = useInventoryItemByProduct(
		appContext.currentWarehouse.id,
		product.id,
	);

	function isNotFoundError(error: any) {
		const isHttpError = error instanceof HTTPResponseError;
		if (!isHttpError) return false;
		return error?.response?.status == 404;
	}

	if (error && !isNotFoundError(error)) return <></>;

	const addItemUrl =
		Utils.dashboardUrl(appContext.organization.id, appContext.currentWarehouse.id) +
		`/inventory/add?productId=${product.id}`;

	const viewItemUrl =
		Utils.dashboardUrl(appContext.organization.id, appContext.currentWarehouse.id) +
		`/inventory/view/${inventoryItem?.id}`;

	return (
		<Link to={inventoryItem ? viewItemUrl : addItemUrl}>
			<IconButton
				icon={isLoading || error ? BsBox : BsBoxFill}
				disabled={isLoading}
			>
				{isLoading ? 'Loading...' : error ? 'Add to inventory' : 'See in inventory'}
			</IconButton>
		</Link>
	);
}
export default ProductAddToInventoryButton;
