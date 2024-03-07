import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { ICreateSecurityRuleDto, OrganizationDto } from 'shared-types';
import useUserRole from '../../hooks/useUserRole';
import { SecurityUtils } from '../../utils/securityUtils';
import { Utils } from '../../utils/utils';
import Form from '../Form/Form';
import FormField from '../Form/FormField';
import FormInput from '../Form/FormInput';
import FormSubmitButton from '../Form/FormSubmitButton';
import Alert from '../Helpers/Alert';
import NoPermissionsAlert from '../NoPermisionsAlert';

export interface MemberAddFormProps {
	organization: OrganizationDto;
}

type Inputs = {
	email: string;
};

function MemberAddForm({ organization }: MemberAddFormProps) {
	const { register, handleSubmit } = useForm<Inputs>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const { role } = useUserRole(organization.id);

	const queryClient = useQueryClient();
	const navigate = useNavigate();

	function onSubmit(inputs: Inputs) {
		setLoading(true);
		setError(null);

		const dto: ICreateSecurityRuleDto = {
			organization: organization.id,
			...inputs,
		};

		axios
			.post<void>(`/api/security`, dto)
			.then(() => {
				queryClient.invalidateQueries(['security', organization.id]);
				navigate('..');
				toast.success(`Successfully invited new member to organization`);
			})
			.catch((err) => setError(Utils.requestErrorToString(err)))
			.finally(() => setLoading(false));
	}

	const canInvite = role && SecurityUtils.isRoleEnough(role, 'admin');

	if (role && !canInvite) {
		return <NoPermissionsAlert />;
	}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit)}
			loading={loading || !role}
		>
			{error && <Alert className="mb-2">{error}</Alert>}

			<FormField
				label="Email"
				required
			>
				<FormInput
					placeholder="employee@example.com"
					type="email"
					required
					{...register('email', { required: true })}
				/>
			</FormField>

			<FormSubmitButton>Invite member</FormSubmitButton>
		</Form>
	);
}
export default MemberAddForm;
