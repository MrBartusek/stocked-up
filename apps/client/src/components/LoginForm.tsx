import axios, { AxiosError } from 'axios';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsPerson, BsShieldLock } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { UserLoginDto } from 'shared-types';
import { UserContext } from '../context/UserContext';
import { Utils } from '../utils/utils';
import Button from './Button';
import TextInput from './Form/FancyInput';
import Alert from './Helpers/Alert';
import FieldTransformers from '../utils/fieldTransformers';

type Inputs = {
	username: string;
	password: string;
};

function LoginForm() {
	const { register, handleSubmit } = useForm<Inputs>();
	const { invalidateUser } = useContext(UserContext);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	function onSubmit(inputs: Inputs) {
		setLoading(true);
		setError(null);

		const dto: UserLoginDto = inputs;
		axios
			.post(`/api/auth/login`, dto)
			.then(invalidateUser)
			.catch((error: AxiosError) => {
				if (error?.response?.statusText == 'Unauthorized') {
					return setError('Provided username and password are not valid');
				}
				setError(Utils.requestErrorToString(error));
			})
			.finally(() => setLoading(false));
	}

	return (
		<form
			className="mt-8"
			onSubmit={handleSubmit(onSubmit)}
		>
			{error && <Alert>{error}</Alert>}

			<TextInput
				label="Username"
				placeholder="Type your username"
				{...register('username', { required: true, setValueAs: FieldTransformers.string })}
				disabled={loading}
				icon={BsPerson}
				autoComplete="on"
				autoFocus
			/>
			<TextInput
				label="Password"
				type="password"
				placeholder="Type your password"
				{...register('password', { required: true, setValueAs: FieldTransformers.string })}
				disabled={loading}
				icon={BsShieldLock}
				autoComplete="on"
			/>
			<Link
				to="/password-reset"
				className="block text-right text-sm text-muted"
			>
				Forgot Password?
			</Link>

			<Button
				className="mt-8 w-full text-lg"
				type="submit"
				loading={loading}
			>
				Login
			</Button>
		</form>
	);
}
export default LoginForm;
