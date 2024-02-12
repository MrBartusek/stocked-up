import axios from 'axios';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { IImageDto, IUpdateUserDto, UserDto } from 'shared-types';
import { UserContext } from '../../context/UserContext';
import { Utils } from '../../utils/utils';
import Form from '../Form/Form';
import FormField from '../Form/FormField';
import FormImageInput from '../Form/FormImageInput';
import FormInput from '../Form/FormInput';
import FormSubmitButton from '../Form/FormSubmitButton';
import Alert from '../Helpers/Alert';
import { useNavigate } from 'react-router-dom';

type Inputs = {
	username: string;
	email: string;
	image: IImageDto;
};

function UserDetailsForm() {
	const { user } = useContext(UserContext);

	const { register, handleSubmit, control } = useForm<Inputs>({
		defaultValues: { username: user.username, email: user.email, image: user.image },
	});

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const queryClient = useQueryClient();
	const navigate = useNavigate();

	function onSubmit(inputs: Inputs) {
		setLoading(true);
		setError(null);

		const { image, ...rest } = inputs;
		const dto: IUpdateUserDto = {
			image: {
				hasImage: image.hasImage,
				data: image.data,
			},
			...rest,
		};

		axios
			.put<UserDto>(`/api/users`, dto)
			.then(() => {
				queryClient.invalidateQueries(['users', 'me']);
				navigate('..');
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

			<FormField label="Profile picture">
				<FormImageInput
					control={control}
					name={'image'}
				/>
			</FormField>

			<FormField
				label="Username"
				required
			>
				<FormInput
					required
					{...register('username', { required: true })}
				/>
			</FormField>

			<FormField
				label="E-mail"
				required
			>
				<FormInput
					required
					type="email"
					{...register('email', { required: true })}
				/>
			</FormField>

			<FormSubmitButton>Update profile</FormSubmitButton>
		</Form>
	);
}
export default UserDetailsForm;
