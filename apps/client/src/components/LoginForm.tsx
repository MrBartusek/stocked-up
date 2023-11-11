import { useForm } from 'react-hook-form';
import { BsPerson, BsShieldLock } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { UserLoginDto } from 'shared-types';
import { Utils } from '../utils';
import Button from './Button';
import TextInput from './Form/FancyInput';
import { useContext, useState } from 'react';
import { UserContext } from './Context/UserContext';

type Inputs = {
	username: string;
	password: string;
};

function LoginForm() {
	const { register, handleSubmit } = useForm<Inputs>();
	const navigate = useNavigate();
	const { invalidateUser } = useContext(UserContext);

	const [loading, setLoading] = useState(false);

	function onSubmit(inputs: Inputs) {
		setLoading(true);
		const dto: UserLoginDto = inputs;
		Utils.postFetcher(`/api/auth/login`, dto)
			.then(invalidateUser)
			.then(() => navigate('/dashboard'))
			.then(() => navigate(0))
			.catch((err) => {
				console.error(err);
				setLoading(false);
			});
	}

	return (
		<form
			className="mt-8"
			onSubmit={handleSubmit(onSubmit)}
		>
			<TextInput
				label="Username"
				placeholder="Type your username"
				{...register('username', { required: true })}
				disabled={loading}
				icon={BsPerson}
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