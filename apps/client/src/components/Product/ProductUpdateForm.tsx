import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { ProductDto, UpdateProductDto } from 'shared-types';
import { Utils } from '../../utils';
import { CurrentAppContext } from '../Context/CurrentAppContext';
import Form from '../Form/Form';
import FormCurrencyInput from '../Form/FormCurrencyInput';
import FormError from '../Form/FormError';
import FormField from '../Form/FormField';
import FromInput from '../Form/FormInput';
import FormSubmitButton from '../Form/FormSubmitButton';
import FormTextArea from '../Form/FormTextArea';
import { ImageDto } from 'shared-types/dist/ImageDto';
import FormImageInput from '../Form/FormImageInput';

export interface ProductCreateFormProps {
	product: ProductDto;
}

type Inputs = {
	name: string;
	description?: string;
	image?: ImageDto;
	buyPrice?: number;
	sellPrice?: number;
	unit?: string;
	sku?: string;
};

function ProductUpdateForm({ product }: ProductCreateFormProps) {
	const appContext = useContext(CurrentAppContext);
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<Inputs>({ defaultValues: product });

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
		<Form
			onSubmit={handleSubmit(onSubmit)}
			loading={loading}
		>
			<FormField label="Organization">
				<FromInput
					value={appContext.organization.name}
					readOnly
				/>
			</FormField>

			<FormField
				label="Product name"
				errors={errors.name}
				required
			>
				<FromInput
					placeholder="Engine oil filter"
					required
					{...register('name', { required: true })}
				/>
			</FormField>

			<FormField
				label="Product description"
				errors={errors.description}
			>
				<FormTextArea {...register('description')} />
			</FormField>

			<FormField label="Product image">
				<FormImageInput
					control={control}
					name={'image'}
				/>
			</FormField>

			<FormField
				label="SKU"
				hint="Product stock-keeping unit"
				errors={errors.sku}
			>
				<FromInput
					placeholder="ICWP-PL-WSSV"
					{...register('sku')}
				/>
			</FormField>

			<FormField
				label="Buy price"
				hint="price that your company pays for this product"
				errors={errors.buyPrice}
			>
				<FormCurrencyInput
					placeholder="8.00"
					{...register('buyPrice', { setValueAs: (v) => (v == null ? 0 : +v) })}
				/>
			</FormField>

			<FormField
				label="Sell price"
				hint="price that customers will pay for this product"
				errors={errors.sellPrice}
			>
				<FormCurrencyInput
					placeholder="12.00"
					{...register('sellPrice', { setValueAs: (v) => (v == null ? 0 : +v) })}
				/>
			</FormField>

			<FormField
				label="Unit"
				errors={errors.unit}
			>
				<FromInput
					placeholder="part / box / barrel"
					{...register('unit')}
				/>
			</FormField>

			<FormError>{error}</FormError>
			<FormSubmitButton>Update product</FormSubmitButton>
		</Form>
	);
}
export default ProductUpdateForm;
