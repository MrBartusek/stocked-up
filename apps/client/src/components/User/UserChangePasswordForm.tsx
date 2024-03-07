import axios from 'axios';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IChangePasswordDto } from 'shared-types';
import { UserContext } from '../../context/UserContext';
import FieldTransformers from '../../utils/fieldTransformers';
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
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();
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
				errors={errors.oldPassword}
				required
			>
				<FormInput
					type="password"
					{...register('oldPassword', { required: true, setValueAs: FieldTransformers.string })}
				/>
			</FormField>

			<FormField
				label="New password"
				errors={errors.newPassword}
				required
			>
				<FormInput
					type="password"
					{...register('newPassword', { required: true, setValueAs: FieldTransformers.string })}
				/>
			</FormField>

			<FormField
				label="Re-type new password"
				errors={errors.newPasswordConfirm}
				required
			>
				<FormInput
					type="password"
					{...register('newPasswordConfirm', {
						required: true,
						validate: (val: string) => {
							if (watch('newPassword') != val) {
								return 'Your passwords confirmation does not match';
							}
						},
						setValueAs: FieldTransformers.string,
					})}
				/>
			</FormField>

			<FormSubmitButton>Change password</FormSubmitButton>
			<span className="ms-4 text-muted">(You will be logged out)</span>
		</Form>
	);
}
export default UserChangePasswordForm;
