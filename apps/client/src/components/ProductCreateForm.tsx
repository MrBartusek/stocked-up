import { ChangeEvent, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
	CreateProductDto,
	CreateWarehouseInOrgDto,
	OrganizationDto,
	ProductDto,
} from 'shared-types';
import { Utils } from '../utils';
import Button from './Button';
import { CurrentAppContext } from './Context/CurrentAppContext';
import FormInput from './Form/FormInput';
import toast from 'react-hot-toast';

type Inputs = {
	name: string;
	description?: string;
	buyPrice?: number;
	sellPrice?: number;
	unit?: string;
};

function ProductCreateForm() {
	const appContext = useContext(CurrentAppContext);
	const { register, handleSubmit } = useForm<Inputs>();
	const [loading, setLoading] = useState(false);
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
			.catch((err) => {
				console.error(err);
				setLoading(false);
			});
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
				required
				{...register('name', { required: true })}
			/>
			<FormInput
				label="Product description"
				as="textarea"
				rows={3}
				{...register('description')}
			/>
			<FormInput
				label="Buy price"
				placeholder="8.00"
				type="number"
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
				step={0.01}
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
