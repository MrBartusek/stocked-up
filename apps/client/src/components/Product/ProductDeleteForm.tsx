import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { ProductDto } from 'shared-types';
import { Utils } from '../../utils';
import EntityDeleteDialog from '../Entity/EntityDeleteDialog';

export interface ProductDeleteFormProps {
	product: ProductDto;
}

function ProductDeleteForm({ product }: ProductDeleteFormProps) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const navigate = useNavigate();
	const queryClient = useQueryClient();

	function onSubmit() {
		setLoading(true);

		Utils.postFetcher<ProductDto>(`/api/products/${product.id}`, undefined, { method: 'DELETE' })
			.then(() => navigate(`..`))
			.then(() => queryClient.invalidateQueries(['products']))
			.then(() => toast.success('Successfully deleted product'))
			.catch((err) => setError(Utils.requestErrorToString(err)))
			.finally(() => setLoading(false));
	}

	return (
		<EntityDeleteDialog
			identifier="product definition"
			entityName={product.name}
			deletedItems={['Inventory items associated with this product']}
			error={error}
			loading={loading}
			onClick={onSubmit}
		/>
	);
}
export default ProductDeleteForm;
