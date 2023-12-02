import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import {
	InventoryItemDto,
	ProductDto,
	UpdateInventoryItemDto,
	UpdateWarehouseDto,
} from 'shared-types';
import { Utils } from '../../utils';
import Button from '../Button';
import { CurrentAppContext } from '../Context/CurrentAppContext';
import FormError from '../Form/FormError';
import FormInput from '../Form/FormInput';

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
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormInput
				label="Warehouse"
				readOnly
				value={appContext.currentWarehouse.name}
			/>

			<FormInput
				label="Quantity"
				placeholder="0"
				type="number"
				{...register('quantity', { setValueAs: (v) => (v == null ? 0 : +v), required: true })}
			/>

			<FormInput
				label="Location"
				hint="Where is this item located in warehouse"
				placeholder="shelf / aisle / bin number"
				{...register('location')}
			/>

			<FormError>{error}</FormError>

			<Button
				role="submit"
				className="mt-4"
				loading={loading}
			>
				Update inventory item
			</Button>
		</form>
	);
}
export default InventoryItemUpdateForm;
