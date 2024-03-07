import axios from 'axios';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { IUpdateWarehouseDto, ProductDto, WarehouseDto } from 'shared-types';
import { CurrentAppContext } from '../../context/CurrentAppContext';
import FieldTransformers from '../../utils/fieldTransformers';
import { Utils } from '../../utils/utils';
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

		const dto: IUpdateWarehouseDto = inputs;

		axios
			.put<ProductDto>(`/api/warehouses/${warehouse.id}`, dto)
			.then(() => {
				queryClient.invalidateQueries(['warehouses', warehouse.id]);
				queryClient.invalidateQueries(['organizations', appContext.organization.id]);
				toast.success('Successfully updated warehouse');
				navigate(`../view/${warehouse.id}`);
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
					{...register('name', { required: true, setValueAs: FieldTransformers.string })}
				/>
			</FormField>

			<FormField label="Address">
				<FormInput
					placeholder="18 Milton Street"
					{...register('address', { setValueAs: FieldTransformers.string })}
				/>
			</FormField>

			<FormError>{error}</FormError>
			<FormSubmitButton>Update warehouse</FormSubmitButton>
		</Form>
	);
}
export default WarehouseUpdateForm;
