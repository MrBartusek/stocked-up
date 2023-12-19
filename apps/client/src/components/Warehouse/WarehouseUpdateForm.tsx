import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { ProductDto, UpdateWarehouseDto, WarehouseDto } from 'shared-types';
import { Utils } from '../../utils';
import { CurrentAppContext } from '../Context/CurrentAppContext';
import Form from '../Form/Form';
import FormError from '../Form/FormError';
import FormField from '../Form/FormField';
import FormInput from '../Form/FormInput';
import FormSubmitButton from '../Form/FormSubmitButton';

export interface WarehouseUpdateFormProps {
	warehouse: WarehouseDto;
}

type Inputs = {
	name: string;
	address: string;
};

function WarehouseUpdateForm({ warehouse }: WarehouseUpdateFormProps) {
	const appContext = useContext(CurrentAppContext);
	const { register, handleSubmit } = useForm<Inputs>({ defaultValues: warehouse });

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const navigate = useNavigate();
	const queryClient = useQueryClient();

	function onSubmit(inputs: Inputs) {
		setLoading(true);

		const dto: UpdateWarehouseDto = inputs;

		Utils.postFetcher<ProductDto>(`/api/warehouses/${warehouse.id}`, dto, { method: 'PUT' })
			.then(() => queryClient.invalidateQueries(['warehouses', warehouse.id]))
			.then(() => queryClient.invalidateQueries(['organizations', appContext.organization.id]))
			.then(() => navigate(`../view/${warehouse.id}`))
			.then(() => toast.success('Successfully updated warehouse'))
			.catch((err) => setError(Utils.requestErrorToString(err)))
			.finally(() => setLoading(false));
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormField label="Organization">
				<FormInput
					value={appContext.organization.name}
					readOnly
				/>
			</FormField>

			<FormField
				label="Name"
				required
			>
				<FormInput
					placeholder="US West Main"
					required
					{...register('name', { required: true })}
				/>
			</FormField>

			<FormField
				label="Address"
				required
			>
				<FormInput
					placeholder="18 Milton Street"
					required
					{...register('address', { required: true })}
				/>
			</FormField>

			<FormError>{error}</FormError>
			<FormSubmitButton>Update warehouse</FormSubmitButton>
		</Form>
	);
}
export default WarehouseUpdateForm;
