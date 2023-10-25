import { BsPerson, BsShieldLock } from 'react-icons/bs';
import TextInput from './Form/TextInput';
import Button from './Button';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

type Inputs = {
	username: string;
	password: string;
};

function LoginForm() {
	const { register, handleSubmit } = useForm<Inputs>();

	function onSubmit(data: Inputs) {
		console.log(data);
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
