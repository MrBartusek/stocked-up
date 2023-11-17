import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CreateWarehouseInOrgDto, OrganizationDto } from 'shared-types';
import { Utils } from '../utils';
import Button from './Button';
import { CurrentAppContext } from './Context/CurrentAppContext';
import FormInput from './Form/FormInput';
import toast from 'react-hot-toast';
import FormError from './Form/FormError';

type Inputs = {
	name: string;
	address: string;
};

function WarehouseCreateForm() {
	const appContext = useContext(CurrentAppContext);
	const { register, handleSubmit } = useForm<Inputs>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	function onSubmit(inputs: Inputs) {
		setLoading(true);
		setError(null);

		const dto: CreateWarehouseInOrgDto = {
			organizationId: appContext.organization.id,
			warehouse: inputs,
		};

		Utils.postFetcher<OrganizationDto>(`/api/organizations/warehouses`, dto)
			.then(() => navigate('..'))
			.then(() => toast.success('Successfully created warehouse'))
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
				placeholder="Car parts warehouse"
				disabled={loading}
				minLength={2}
				maxLength={32}
				required
				{...register('name', { required: true })}
			/>
			<FormInput
				label="Warehouse address"
				placeholder="18 Milton Street"
				minLength={2}
				maxLength={32}
				disabled={loading}
				required
				{...register('address', { required: true })}
			/>

			<FormError>{error}</FormError>

			<Button
				role="submit"
				className="mt-4"
				loading={loading}
			>
				Create warehouse
			</Button>
		</form>
	);
}
export default WarehouseCreateForm;
