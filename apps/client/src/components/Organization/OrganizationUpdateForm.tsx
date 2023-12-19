import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { OrganizationDto, UpdateOrganizationDto } from 'shared-types';
import { Utils } from '../../utils';
import Form from '../Form/Form';
import FormError from '../Form/FormError';
import FormField from '../Form/FormField';
import FormInput from '../Form/FormInput';
import FormSubmitButton from '../Form/FormSubmitButton';

export interface OrganizationUpdateFormProps {
	organization: OrganizationDto;
}

type Inputs = {
	name: string;
	currency: string;
};

function OrganizationUpdateForm({ organization }: OrganizationUpdateFormProps) {
	const { register, handleSubmit } = useForm<Inputs>({ defaultValues: organization });

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const navigate = useNavigate();
	const queryClient = useQueryClient();

	function onSubmit(inputs: Inputs) {
		setLoading(true);

		const dto: UpdateOrganizationDto = inputs;

		Utils.postFetcher(`/api/organizations/${organization.id}`, dto, { method: 'PUT' })
			.then(() => queryClient.invalidateQueries(['organizations', organization.id]))
			.then(() => navigate(`../view/${organization.id}`))
			.then(() => toast.success('Successfully updated organization'))
			.catch((err) => setError(Utils.requestErrorToString(err)))
			.finally(() => setLoading(false));
	}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit)}
			loading={loading}
		>
			<FormField
				label="Organization name"
				required
			>
				<FormInput
					placeholder="My company"
					required
					{...register('name', { required: true })}
				/>
			</FormField>

			<FormField
				label="Currency"
				required
			>
				<FormInput
					placeholder="USD"
					required
					{...register('currency', { required: true })}
				/>
			</FormField>

			<FormError>{error}</FormError>
			<FormSubmitButton>Update organization</FormSubmitButton>
		</Form>
	);
}
export default OrganizationUpdateForm;
