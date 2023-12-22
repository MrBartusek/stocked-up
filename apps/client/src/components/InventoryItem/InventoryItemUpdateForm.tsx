import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { InventoryItemDto, ProductDto, UpdateInventoryItemDto } from 'shared-types';
import { CurrentAppContext } from '../../context/CurrentAppContext';
import { Utils } from '../../utils';
import Form from '../Form/Form';
import FormError from '../Form/FormError';
import FormField from '../Form/FormField';
import FormInput from '../Form/FormInput';
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
	const { register, handleSubmit } = useForm<Inputs>({
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

		const dto: UpdateInventoryItemDto = inputs;

		Utils.postFetcher<ProductDto>(`/api/inventory/${inventoryItem.id}`, dto, { method: 'PUT' })
			.then(() => queryClient.invalidateQueries(['warehouses', inventoryItem.id]))
			.then(() => navigate(`../view/${inventoryItem.id}`))
			.then(() => toast.success('Successfully updated warehouse'))
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
				<FormInput
					placeholder="0"
					type="number"
					{...register('quantity', { setValueAs: (v) => (v == null ? 0 : +v) })}
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
			<FormSubmitButton>Update inventory item</FormSubmitButton>
		</Form>
	);
}
export default InventoryItemUpdateForm;
