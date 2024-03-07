import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ICreateOrganizationDto, OrganizationDto } from 'shared-types';
import FieldTransformers from '../../utils/fieldTransformers';
import { Utils } from '../../utils/utils';
import Form from '../Form/Form';
import FormError from '../Form/FormError';
import FormField from '../Form/FormField';
import FormInput from '../Form/FormInput';
import FormSubmitButton from '../Form/FormSubmitButton';
import FromHeading from '../Form/FromHeading';

type Inputs = {
	name: string;
	warehouseName: string;
	warehouseAddress: string;
};

function OrganizationCreateForm() {
	const { register, handleSubmit } = useForm<Inputs>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	function onSubmit(inputs: Inputs) {
		setLoading(true);
		setError(null);

		const dto: ICreateOrganizationDto = {
			name: inputs.name,
			warehouse: {
				name: inputs.warehouseName,
				address: inputs.warehouseAddress,
			},
		};

		axios
			.post<OrganizationDto>(`/api/organizations`, dto)
			.then((response) => {
				const org = response.data;
				navigate(`/dashboard/${org.id}/${org.warehouses[0].id}`);
				toast.success(`Successfully created new organization: ${org.name}`);
			})
			.catch((err) => setError(Utils.requestErrorToString(err)))
			.finally(() => setLoading(false));
	}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit)}
			loading={loading}
		>
			<FromHeading>Organization Information</FromHeading>

			<FormField
				label="Organization name"
				required
			>
				<FormInput
					placeholder="My company"
					required
					{...register('name', { required: true, setValueAs: FieldTransformers.string })}
				/>
			</FormField>

			<FromHeading
				description="We are going to create first warehouse for your organization. 
                            Please provide details about one of your physical warehouses"
			>
				Warehouse information
			</FromHeading>

			<FormField
				label="Warehouse Name"
				required
			>
				<FormInput
					placeholder="US West Main"
					required
					{...register('warehouseName', { required: true, setValueAs: FieldTransformers.string })}
				/>
			</FormField>

			<FormField label="Warehouse address">
				<FormInput
					placeholder="18 Milton Street"
					{...register('warehouseAddress', { setValueAs: FieldTransformers.string })}
				/>
			</FormField>

			<FormError>{error}</FormError>
			<FormSubmitButton>Create organization</FormSubmitButton>
		</Form>
	);
}
export default OrganizationCreateForm;
