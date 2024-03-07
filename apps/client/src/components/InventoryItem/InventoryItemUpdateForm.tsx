import axios from 'axios';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { IUpdateInventoryItemDto, InventoryItemDto, ProductDto } from 'shared-types';
import { CurrentAppContext } from '../../context/CurrentAppContext';
import FieldTransformers from '../../utils/fieldTransformers';
import { Utils } from '../../utils/utils';
import Form from '../Form/Form';
import FormError from '../Form/FormError';
import FormField from '../Form/FormField';
import FormInput from '../Form/FormInput';
import FormRelativeInput from '../Form/FormRelativeInput/FormRelativeInput';
import FormSubmitButton from '../Form/FormSubmitButton';

export interface InventoryItemUpdateFormProps {
	inventoryItem: InventoryItemDto;
}

type Inputs = {
	quantity: number;
	location: string;
};

function InventoryItemUpdateForm({ inventoryItem }: InventoryItemUpdateFormProps) {
	const appContext = useContext(CurrentAppContext);
	const { register, handleSubmit, control } = useForm<Inputs>({
		defaultValues: {
			quantity: inventoryItem.quantity,
			location: inventoryItem.location,
		},
	});

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const navigate = useNavigate();
	const queryClient = useQueryClient();

	function onSubmit(inputs: Inputs) {
		setLoading(true);

		const dto: IUpdateInventoryItemDto = inputs;

		axios
			.put<ProductDto>(`/api/inventory/${inventoryItem.id}`, dto)
			.then(() => {
				queryClient.invalidateQueries(['warehouses', inventoryItem.id]);
				toast.success('Successfully updated warehouse');
				navigate(`../view/${inventoryItem.id}`);
			})
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

			<FormField label="Quantity">
				<FormRelativeInput
					name={'quantity'}
					control={control}
				/>
			</FormField>

			<FormField
				label="Location"
				hint="Where is this item located in warehouse"
			>
				<FormInput
					placeholder="shelf / aisle / bin number"
					{...register('location', { setValueAs: FieldTransformers.string })}
				/>
			</FormField>

			<FormError>{error}</FormError>
			<FormSubmitButton>Update inventory item</FormSubmitButton>
		</Form>
	);
}
export default InventoryItemUpdateForm;
