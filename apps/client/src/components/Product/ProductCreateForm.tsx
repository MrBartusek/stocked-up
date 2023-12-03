import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { CreateProductDto, ProductDto } from 'shared-types';
import { Utils } from '../../utils';
import Button from '../Button';
import { CurrentAppContext } from '../Context/CurrentAppContext';
import FormError from '../Form/FormError';
import FormInput from '../Form/FormInput';

type Inputs = {
	name: string;
	description?: string;
	buyPrice?: number;
	sellPrice?: number;
	unit?: string;
	sku?: string;
};

function ProductCreateForm() {
	const appContext = useContext(CurrentAppContext);
	const { register, handleSubmit } = useForm<Inputs>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	function onSubmit(inputs: Inputs) {
		setLoading(true);

		const dto: CreateProductDto = {
			organizationId: appContext.organization.id,
			...inputs,
		};

		Utils.postFetcher<ProductDto>(`/api/products`, dto)
			.then(() => navigate('..'))
			.then(() => toast.success('Successfully created product'))
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
				disabled={loading}
				maxLength={1024}
				rows={3}
				{...register('description')}
			/>

			<FormInput
				label="SKU"
				placeholder="ICWP-PL-WSSV"
				hint="Product stock-keeping unit"
				disabled={loading}
				{...register('sku')}
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
				Create product
			</Button>
		</form>
	);
}
export default ProductCreateForm;
