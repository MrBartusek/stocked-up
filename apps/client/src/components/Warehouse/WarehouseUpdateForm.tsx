import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { ProductDto, UpdateWarehouseDto, WarehouseDto } from 'shared-types';
import { Utils } from '../../utils';
import Button from '../Button';
import { CurrentAppContext } from '../Context/CurrentAppContext';
import FormError from '../Form/FormError';
import FormInput from '../Form/FormInput';

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
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormInput
				label="Organization"
				readOnly
				value={appContext.organization.name}
			/>

			<FormInput
				label="Warehouse Name"
				placeholder="US West Main"
				disabled={loading}
				minLength={2}
				maxLength={32}
				required
				{...register('name', { required: true })}
			/>
			<FormInput
				label="Warehouse address"
				placeholder="18 Milton Street"
				disabled={loading}
				minLength={2}
				maxLength={32}
				required
				{...register('address', { required: true })}
			/>

			<FormError>{error}</FormError>

			<Button
				role="submit"
				className="mt-4"
				loading={loading}
			>
				Update warehouse
			</Button>
		</form>
	);
}
export default WarehouseUpdateForm;
