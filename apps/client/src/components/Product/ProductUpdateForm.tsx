import axios from 'axios';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { IImageDto, IUpdateProductDto, ProductDto } from 'shared-types';
import { CurrentAppContext } from '../../context/CurrentAppContext';
import FieldTransformers from '../../utils/fieldTransformers';
import { Utils } from '../../utils/utils';
import Form from '../Form/Form';
import FormCurrencyInput from '../Form/FormCurrencyInput';
import FormError from '../Form/FormError';
import FormField from '../Form/FormField';
import FormImageInput from '../Form/FormImageInput';
import FromInput from '../Form/FormInput';
import FormSubmitButton from '../Form/FormSubmitButton';
import FormTextArea from '../Form/FormTextArea';

export interface ProductCreateFormProps {
	product: ProductDto;
}

type Inputs = {
	name: string;
	description?: string;
	image: IImageDto;
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

		const { image, ...rest } = inputs;

		const dto: IUpdateProductDto = {
			organization: appContext.organization.id,
			...product,
			image: {
				hasImage: image.hasImage,
				data: image.data,
			},
			...rest,
		};

		axios
			.put<ProductDto>(`/api/products/${product.id}`, dto)
			.then(() => {
				queryClient.invalidateQueries(['products', product.id]);
				toast.success('Successfully updated product');
				navigate(`../view/${product.id}`);
			})
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
					{...register('name', { required: true, setValueAs: FieldTransformers.string })}
				/>
			</FormField>

			<FormField
				label="Product description"
				errors={errors.description}
			>
				<FormTextArea {...register('description', { setValueAs: FieldTransformers.string })} />
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
					{...register('sku', { setValueAs: FieldTransformers.string })}
				/>
			</FormField>

			<FormField
				label="Buy price"
				hint="price that your company pays for this product"
				errors={errors.buyPrice}
			>
				<FormCurrencyInput
					placeholder="8.00"
					{...register('buyPrice', { setValueAs: FieldTransformers.number })}
				/>
			</FormField>

			<FormField
				label="Sell price"
				hint="price that customers will pay for this product"
				errors={errors.sellPrice}
			>
				<FormCurrencyInput
					placeholder="12.00"
					{...register('sellPrice', { setValueAs: FieldTransformers.number })}
				/>
			</FormField>

			<FormField
				label="Unit"
				errors={errors.unit}
			>
				<FromInput
					placeholder="part / box / barrel"
					{...register('unit', { setValueAs: FieldTransformers.string })}
				/>
			</FormField>

			<FormError>{error}</FormError>
			<FormSubmitButton>Update product</FormSubmitButton>
		</Form>
	);
}
export default ProductUpdateForm;
