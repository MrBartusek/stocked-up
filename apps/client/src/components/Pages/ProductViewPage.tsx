import { useParams } from 'react-router-dom';
import useProductsDetails from '../../hooks/useProductsDetails';
import Loader from '../Loader';
import placeholderImage from '../../assets/placeholder.png';
import EntityInfoTable from '../EntityInfoTable';
import Blockquote from '../Blockquote';

function ProductViewPage() {
	const { id } = useParams();
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
							'buy price': product?.buyPrice,
							'sell price': product?.sellPrice,
							unit: product?.unit,
						}}
					/>
				</div>
			</div>
		</Loader>
	);
}

export default ProductViewPage;
