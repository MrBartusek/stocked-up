import { useContext } from 'react';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { ProductDto } from 'shared-types';
import { CurrentAppContext } from '../../context/CurrentAppContext';
import { Utils } from '../../utils';
import EntityActionsRow from '../Entity/EntityActionsRow';
import EntityContainer from '../Entity/EntityContainer';
import EntityImageColumn from '../Entity/EntityImageColumn';
import EntityInfoTable from '../Entity/EntityInfoTable';
import HeaderWithHint from '../HeaderWithHint';
import Blockquote from '../Helpers/Blockquote';
import IconButton from '../IconButton';
import ProductAddToInventoryButton from './ProductAddToInventoryButton';
import ProductInventoryPeek from './ProductInventoryPeek';

export interface ProductEntityInfoProps {
	product: ProductDto;
}

function ProductEntityInfo({ product }: ProductEntityInfoProps) {
	const appContext = useContext(CurrentAppContext);

	return (
		<EntityContainer>
			<EntityImageColumn image={product.image} />
			<div>
				<HeaderWithHint hint="product definition">{product?.name}</HeaderWithHint>

				<Blockquote>{product?.description || 'No description provided'}</Blockquote>

				<EntityInfoTable
					properties={{
						name: product?.name,
						'internal ID': <code>{product?.id}</code>,
						SKU: product?.sku,
						'buy price': Utils.humanizeCurrency(
							product?.buyPrice,
							appContext.organization.currency,
						),
						'sell price': Utils.humanizeCurrency(
							product?.sellPrice,
							appContext.organization.currency,
						),
						unit: product?.unit,
					}}
				/>

				<ProductInventoryPeek
					warehouse={appContext.currentWarehouse}
					product={product}
				/>

				<EntityActionsRow>
					<ProductAddToInventoryButton product={product} />
					<Link to={`../update/${product.id}`}>
						<IconButton icon={BsPencil}>Update</IconButton>
					</Link>
					<Link to={`../delete/${product.id}`}>
						<IconButton icon={BsTrash}>Delete</IconButton>
					</Link>
				</EntityActionsRow>
			</div>
		</EntityContainer>
	);
}
export default ProductEntityInfo;
