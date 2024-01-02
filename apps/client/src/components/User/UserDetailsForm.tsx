import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { UpdateUserDto, UserDto } from 'shared-types';
import { UserContext } from '../../context/UserContext';
import { Utils } from '../../utils';
import Form from '../Form/Form';
import FormField from '../Form/FormField';
import FormInput from '../Form/FormInput';
import FormSubmitButton from '../Form/FormSubmitButton';
import Alert from '../Helpers/Alert';

type Inputs = {
	username: string;
	email: string;
};

function UserDetailsForm() {
	const { user } = useContext(UserContext);

	const { register, handleSubmit, control } = useForm<Inputs>({
		defaultValues: { username: user.username, email: user.email },
	});
	const queryClient = useQueryClient();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	function onSubmit(inputs: Inputs) {
		setLoading(true);
		setError(null);

		const dto: UpdateUserDto = {
			username: inputs.username,
			email: inputs.email,
		};

		Utils.postFetcher<UserDto>(`/api/user`, dto, { method: 'UPDATE' })
			.then(() => {
				queryClient.invalidateQueries(['users', 'me']);
				toast.success(`Successfully updated user details!`);
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
				label="Username"
				required
			>
				<FormInput
					required
					{...register('username', { required: true })}
				></FormInput>
			</FormField>

			<FormField
				label="E-mail"
				required
			>
				<FormInput
					required
					type="email"
					{...register('email', { required: true })}
				></FormInput>
			</FormField>

			<FormSubmitButton>Update details</FormSubmitButton>
		</Form>
	);
}
export default UserDetailsForm;
