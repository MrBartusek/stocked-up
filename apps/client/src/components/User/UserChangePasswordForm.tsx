import axios from 'axios';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IChangePasswordDto } from 'shared-types';
import { UserContext } from '../../context/UserContext';
import { Utils } from '../../utils/utils';
import Form from '../Form/Form';
import FormField from '../Form/FormField';
import FormInput from '../Form/FormInput';
import FormSubmitButton from '../Form/FormSubmitButton';
import Alert from '../Helpers/Alert';

type Inputs = {
	oldPassword: string;
	newPassword: string;
	newPasswordConfirm: string;
};

function UserChangePasswordForm() {
	const { register, handleSubmit } = useForm<Inputs>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const { logout } = useContext(UserContext);

	function onSubmit(inputs: Inputs) {
		setLoading(true);
		setError(null);

		const dto: IChangePasswordDto = inputs;

		axios
			.post<void>(`/api/auth/change-password`, dto)
			.then(async () => {
				await logout();
				toast.success(`Successfully changed password`);
			})
			.catch((err) => setError(Utils.requestErrorToString(err)))
			.finally(() => setLoading(false));
	}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit)}
			loading={loading}
		>
			{error && <Alert>{error}</Alert>}

			<FormField
				label="Current password"
				hint="Confirm your current password"
				required
			>
				<FormInput
					type="password"
					required
					{...register('oldPassword', { required: true })}
				/>
			</FormField>

			<FormField
				label="New password"
				required
			>
				<FormInput
					type="password"
					required
					{...register('newPassword', { required: true })}
				/>
			</FormField>

			<FormField
				label="Re-type new password"
				required
			>
				<FormInput
					type="password"
					required
					{...register('newPasswordConfirm', { required: true })}
				/>
			</FormField>

			<FormSubmitButton>Change password</FormSubmitButton>
			<span className="ms-4 text-muted">(You will be logged out)</span>
		</Form>
	);
}
export default UserChangePasswordForm;
