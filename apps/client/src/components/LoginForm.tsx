import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsPerson, BsShieldLock } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { UserLoginDto } from 'shared-types';
import { HTTPResponseError, Utils } from '../utils';
import Button from './Button';
import TextInput from './Form/FancyInput';
import Alert from './Helpers/Alert';
import axios from 'axios';

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
		axios
			.post(`/api/auth/login`, dto)
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
				autoComplete="on"
				autoFocus
			/>
			<TextInput
				label="Password"
				type="password"
				placeholder="Type your password"
				{...register('password', { required: true })}
				disabled={loading}
				icon={BsShieldLock}
				autoComplete="on"
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
