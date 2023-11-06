import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CreateOrganizationDto, OrganizationDto } from 'shared-types';
import { Utils } from '../utils';
import Button from './Button';
import FormInput from './Form/FormInput';
import FromHeading from './Form/FromHeading';

type Inputs = {
	name: string;
	warehouseName: string;
	warehouseAddress: string;
};

function OrganizationCreateForm() {
	const { register, handleSubmit } = useForm<Inputs>();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	function onSubmit(inputs: Inputs) {
		setLoading(true);

		const dto: CreateOrganizationDto = {
			name: inputs.name,
			warehouse: {
				name: inputs.warehouseName,
				address: inputs.warehouseAddress,
			},
		};

		Utils.postFetcher<OrganizationDto>(`/api/organizations`, dto)
			.then((org) => navigate(`/dashboard/${org.id}`))
			.catch((err) => {
				console.error(err);
				setLoading(false);
			});
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FromHeading>Organization Information</FromHeading>

			<FormInput
				label="Organization name"
				placeholder="My company"
				disabled={loading}
				required
				{...register('name', { required: true })}
			/>

			<FromHeading
				description="We are going to create first warehouse for your organization. 
                            Please provide details about one of your physical warehouses"
			>
				Warehouse information
			</FromHeading>

			<FormInput
				label="Warehouse Name"
				placeholder="US West Main"
				disabled={loading}
				required
				{...register('warehouseName', { required: true })}
			/>
			<FormInput
				label="Warehouse address"
				placeholder="18 Milton Street"
				disabled={loading}
				required
				{...register('warehouseAddress', { required: true })}
			/>

			<Button
				role="submit"
				loading={loading}
			>
				Create organization
			</Button>
		</form>
	);
}
export default OrganizationCreateForm;
