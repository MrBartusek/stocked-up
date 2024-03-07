import axios from 'axios';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ICreateInventoryItemDto, OrganizationDto } from 'shared-types';
import { CurrentAppContext } from '../../context/CurrentAppContext';
import FieldTransformers from '../../utils/fieldTransformers';
import { Utils } from '../../utils/utils';
import Form from '../Form/Form';
import FormError from '../Form/FormError';
import FormField from '../Form/FormField';
import FormInput from '../Form/FormInput';
import FormProductSelect from '../Form/FormProductSelector';
import FormSubmitButton from '../Form/FormSubmitButton';

type Inputs = {
	quantity: number;
	location: string;
	productId: string;
};

function InventoryAddForm() {
	const appContext = useContext(CurrentAppContext);
	const [searchParams] = useSearchParams();
	const productId = searchParams.get('productId')!;

	const { register, handleSubmit, control } = useForm<Inputs>({ defaultValues: { productId } });
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	function onSubmit(inputs: Inputs) {
		setLoading(true);
		setError(null);

		const dto: ICreateInventoryItemDto = {
			organizationId: appContext.organization.id,
			warehouseId: appContext.currentWarehouse.id,
			...inputs,
		};

		axios
			.post<OrganizationDto>(`/api/inventory/`, dto)
			.then(() => navigate('..'))
			.then(() => toast.success('Successfully created item'))
			.catch((err) => setError(Utils.requestErrorToString(err)))
			.finally(() => setLoading(false));
	}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit)}
			loading={loading}
		>
			<FormField label="Warehouse">
				<FormInput
					readOnly
					required
					value={appContext.currentWarehouse.name}
				/>
			</FormField>

			<FormField
				label="Product"
				className="mb-0"
				required
			>
				<FormProductSelect
					required
					name={'productId'}
					control={control}
				/>
			</FormField>

			<FormField
				label="Quantity"
				hint="If you know current item quantity you can add it here"
			>
				<FormInput
					placeholder="0"
					type="number"
					{...register('quantity', { setValueAs: FieldTransformers.number })}
				/>
			</FormField>

			<FormField
				label="Location"
				hint="Where is this item located in warehouse"
			>
				<FormInput
					placeholder="shelf / aisle / bin number"
					{...register('location')}
				/>
			</FormField>

			<FormError>{error}</FormError>

			<FormSubmitButton>Add product to inventory</FormSubmitButton>
		</Form>
	);
}
export default InventoryAddForm;
