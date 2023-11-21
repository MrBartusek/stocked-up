import { useContext } from 'react';
import { BsBox, BsPencil, BsTrash } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import placeholderImage from '../../assets/placeholder.png';
import useProductsDetails from '../../hooks/useProductsDetails';
import { Utils } from '../../utils';
import Blockquote from '../Blockquote';
import { CurrentAppContext } from '../Context/CurrentAppContext';
import EntityActionsRow from '../EntityActionsRow';
import EntityInfoTable from '../EntityInfoTable';
import IconButton from '../IconButton';
import Loader from '../Loader';
import ProductInventoryPeek from '../ProductInventoryPeek';
import ProductAddToInventoryButton from '../ProductAddToInventoryButton';

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
			<div className="flex flex-row-reverse items-start justify-between gap-28">
				<div className="hidden w-48 flex-shrink-0 xl:flex">
					<img
						src={product?.imageUrl || placeholderImage}
						alt="product image"
						className="m-auto h-auto w-full rounded-md"
						width={50}
						height={50}
					/>
				</div>
				<div>
					<div className="mb-12 flex items-center gap-2">
						<h2 className="text-3xl">{product?.name}</h2>
						<span className="text-muted">(product definition)</span>
					</div>
					<Blockquote>{product?.description || 'No description provided'}</Blockquote>
					<EntityInfoTable
						properties={{
							'internal ID': product?.id,
							name: product?.name,
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
			</div>
		</Loader>
	);
}

export default ProductViewPage;
