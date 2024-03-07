import axios from 'axios';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { IImageDto, IUpdateUserDto, UserDto } from 'shared-types';
import { UserContext } from '../../context/UserContext';
import FieldTransformers from '../../utils/fieldTransformers';
import { Utils } from '../../utils/utils';
import Form from '../Form/Form';
import FormField from '../Form/FormField';
import FormImageInput from '../Form/FormImageInput';
import FormInput from '../Form/FormInput';
import FormSubmitButton from '../Form/FormSubmitButton';
import Alert from '../Helpers/Alert';

type Inputs = {
	username: string;
	image: IImageDto;
};

function UserDetailsForm() {
	const { user } = useContext(UserContext);

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<Inputs>({
		defaultValues: { username: user.username, image: user.image },
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
				errors={errors.username}
				demoLocked
			>
				<FormInput
					demoLocked
					{...register('username', { required: true, setValueAs: FieldTransformers.string })}
				/>
			</FormField>

			<FormSubmitButton>Update profile</FormSubmitButton>
		</Form>
	);
}
export default UserDetailsForm;
