import { useForm } from 'react-hook-form';
import { BsPerson, BsShieldLock } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { UserLoginDto } from 'shared-types';
import { Utils } from '../utils';
import Button from './Button';
import TextInput from './Form/TextInput';

type Inputs = {
	username: string;
	password: string;
};

function LoginForm() {
	const { register, handleSubmit } = useForm<Inputs>();
	const navigate = useNavigate();

	function onSubmit(inputs: Inputs) {
		const dto = new UserLoginDto(inputs.username, inputs.password);
		Utils.postFetcher(`/api/auth/login`, dto)
			.then(() => navigate('/dashboard'))
			.catch(console.error);
	}

	return (
		<form
			className="mt-8"
			onSubmit={handleSubmit(onSubmit)}
		>
			<TextInput
				label="Username"
				placeholder="Type your username"
				{...(register('username'), { required: true })}
				icon={BsPerson}
			/>
			<TextInput
				label="Password"
				type="password"
				placeholder="Type your password"
				{...(register('password'), { required: true })}
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
			>
				Login
			</Button>
		</form>
	);
}
export default LoginForm;
