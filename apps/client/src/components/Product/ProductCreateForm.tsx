import axios from 'axios';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { CreateProductDto, ProductDto } from 'shared-types';
import { CurrentAppContext } from '../../context/CurrentAppContext';
import { Utils } from '../../utils';
import Form from '../Form/Form';
import FormCurrencyInput from '../Form/FormCurrencyInput';
import FormError from '../Form/FormError';
import FormField from '../Form/FormField';
import FromInput from '../Form/FormInput';
import FormSubmitButton from '../Form/FormSubmitButton';
import FormTextArea from '../Form/FormTextArea';

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
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	function onSubmit(inputs: Inputs) {
		setLoading(true);

		const dto: CreateProductDto = {
			organization: appContext.organization.id,
			...inputs,
		};

		axios
			.post<ProductDto>(`/api/products`, dto)
			.then((res) => {
				navigate(Utils.dashboardUrl(appContext) + `/products/view/${res.data.id}`);
				toast.success('Successfully created product');
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
					{...register('name', { required: true })}
				/>
			</FormField>

			<FormField
				label="Product description"
				errors={errors.description}
			>
				<FormTextArea {...register('description')} />
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
			<FormSubmitButton>Create product</FormSubmitButton>
		</Form>
	);
}
export default ProductCreateForm;
