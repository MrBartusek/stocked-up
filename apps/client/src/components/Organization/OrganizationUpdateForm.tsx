import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { OrganizationDto, UpdateOrganizationDto } from 'shared-types';
import { Utils } from '../../utils';
import Button from '../Button';
import FormError from '../Form/FormError';
import FormInput from '../Form/FormInput';

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
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormInput
				label="Organization name"
				placeholder="My company"
				disabled={loading}
				minLength={2}
				maxLength={32}
				required
				{...register('name', { required: true })}
			/>

			<FormInput
				label="Currency"
				placeholder="USD"
				disabled={loading}
				minLength={1}
				maxLength={16}
				required
				{...register('currency', { required: true })}
			/>

			<FormError>{error}</FormError>

			<Button
				role="submit"
				className="mt-4"
				loading={loading}
			>
				Update organization
			</Button>
		</form>
	);
}
export default OrganizationUpdateForm;
