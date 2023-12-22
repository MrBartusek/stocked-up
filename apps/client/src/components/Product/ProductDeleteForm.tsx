import { ProductDto } from 'shared-types';
import EntityDeleteDialog from '../Entity/EntityDeleteDialog';

export interface ProductDeleteFormProps {
	product: ProductDto;
}

function ProductDeleteForm({ product }: ProductDeleteFormProps) {
	return (
		<EntityDeleteDialog
			entityName={product.name}
			entityId={product.id}
			image={product.image}
			resourceName="products"
			identifier="product definition"
			deletedItems={['Inventory items associated with this product']}
		/>
	);
}
export default ProductDeleteForm;
