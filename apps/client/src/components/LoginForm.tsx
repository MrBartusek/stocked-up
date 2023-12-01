import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsPerson, BsShieldLock } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { UserLoginDto } from 'shared-types';
import { HTTPResponseError, Utils } from '../utils';
import Alert from './Helpers/Alert';
import Button from './Button';
import TextInput from './Form/FancyInput';

type Inputs = {
	username: string;
	password: string;
};

function LoginForm() {
	const { register, handleSubmit } = useForm<Inputs>();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	function onSubmit(inputs: Inputs) {
		setLoading(true);
		setError(null);

		const dto: UserLoginDto = inputs;
		Utils.postFetcher(`/api/auth/login`, dto)
			.then(() => navigate('/dashboard'))
			.then(() => navigate(0))
			.catch((err: HTTPResponseError) => {
				if (err.response.statusText == 'Unauthorized') {
					return setError('Provided username and password are not valid');
				}
				setError(Utils.requestErrorToString(err));
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
				{...register('username', { required: true })}
				disabled={loading}
				icon={BsPerson}
				autoFocus
			/>
			<TextInput
				label="Password"
				type="password"
				placeholder="Type your password"
				{...register('password', { required: true })}
				disabled={loading}
				icon={BsShieldLock}
			/>
			<Link
				to="password-reset"
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
