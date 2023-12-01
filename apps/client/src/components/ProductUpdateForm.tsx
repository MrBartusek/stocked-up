import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { CreateProductDto, ProductDto, UpdateProductDto } from 'shared-types';
import { Utils } from '../utils';
import Button from './Button';
import { CurrentAppContext } from './Context/CurrentAppContext';
import FormError from './Form/FormError';
import FormInput from './Form/FormInput';
import { useQueryClient } from 'react-query';

export interface ProductCreateFormProps {
	product: ProductDto;
}

type Inputs = {
	name: string;
	description?: string;
	buyPrice?: number;
	sellPrice?: number;
	unit?: string;
};

function ProductEditForm({ product }: ProductCreateFormProps) {
	const appContext = useContext(CurrentAppContext);
	const { register, handleSubmit } = useForm<Inputs>({ defaultValues: product });

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const navigate = useNavigate();
	const queryClient = useQueryClient();

	function onSubmit(inputs: Inputs) {
		setLoading(true);

		const dto: UpdateProductDto = {
			organizationId: appContext.organization.id,
			...product,
			...inputs,
		};

		Utils.postFetcher<ProductDto>(`/api/products/${product.id}`, dto, { method: 'PUT' })
			.then(() => queryClient.invalidateQueries(['products', product.id]))
			.then(() => navigate(`../view/${product.id}`))
			.then(() => toast.success('Successfully updated product'))
			.catch((err) => setError(Utils.requestErrorToString(err)))
			.finally(() => setLoading(false));
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormInput
				label="Organization"
				readOnly
				value={appContext.organization.name}
			/>

			<FormInput
				label="Product name"
				placeholder="Engine oil filter"
				disabled={loading}
				minLength={2}
				maxLength={32}
				required
				{...register('name', { required: true })}
			/>
			<FormInput
				label="Product description"
				as="textarea"
				maxLength={1024}
				rows={3}
				{...register('description')}
			/>
			<FormInput
				label="Buy price"
				placeholder="8.00"
				type="number"
				min={0}
				step={0.01}
				disabled={loading}
				suffixText={appContext.organization.currency}
				hint="price that your company pays for this product"
				{...register('buyPrice', { setValueAs: (v) => (v == null ? 0 : +v) })}
			/>
			<FormInput
				label="Sell price"
				placeholder="12.00"
				type="number"
				min={0}
				step={0.01}
				maxLength={32}
				disabled={loading}
				suffixText={appContext.organization.currency}
				hint="price that customers will pay for this product"
				{...register('sellPrice', { setValueAs: (v) => (v == null ? 0 : +v) })}
			/>

			<FormInput
				label="Unit"
				placeholder="part / box / barrel"
				disabled={loading}
				{...register('unit')}
			/>

			<FormError>{error}</FormError>

			<Button
				role="submit"
				className="mt-4"
				loading={loading}
			>
				Update product
			</Button>
		</form>
	);
}
export default ProductEditForm;
