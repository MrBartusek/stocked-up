import { useContext } from 'react';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import useProductsDetails from '../../../hooks/useProductsDetails';
import { Utils } from '../../../utils';
import { CurrentAppContext } from '../../Context/CurrentAppContext';
import EntityActionsRow from '../../Entity/EntityActionsRow';
import EntityContainer from '../../Entity/EntityContainer';
import EntityImageColumn from '../../Entity/EntityImageColumn';
import EntityInfoTable from '../../Entity/EntityInfoTable';
import HeaderWithHint from '../../HeaderWithHint';
import Blockquote from '../../Helpers/Blockquote';
import IconButton from '../../IconButton';
import Loader from '../../Loader';
import ProductAddToInventoryButton from '../../ProductAddToInventoryButton';
import ProductInventoryPeek from '../../ProductInventoryPeek';

function ProductViewPage() {
	const appContext = useContext(CurrentAppContext);
	const { id } = useParams();
	const navigate = useNavigate();

	const { product, isLoading, error } = useProductsDetails(id);

	return (
		<Loader
			isLoading={isLoading}
			isError={error != undefined}
		>
			<EntityContainer>
				<EntityImageColumn />
				<div>
					<HeaderWithHint hint="product definition">{product?.name}</HeaderWithHint>

					<Blockquote>{product?.description || 'No description provided'}</Blockquote>

					<EntityInfoTable
						properties={{
							name: product?.name,
							'internal ID': <code>{product?.id}</code>,
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
						<IconButton
							icon={BsPencil}
							onClick={() => navigate(`../edit/${product.id}`)}
						>
							Edit
						</IconButton>
						<IconButton
							icon={BsTrash}
							onClick={() => navigate(`../delete/${product.id}`)}
						>
							Delete
						</IconButton>
					</EntityActionsRow>
				</div>
			</EntityContainer>
		</Loader>
	);
}

export default ProductViewPage;
