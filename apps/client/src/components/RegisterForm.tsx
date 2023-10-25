import { useForm } from 'react-hook-form';
import { BsArrowLeft, BsEnvelopeAt, BsPerson, BsShieldLock } from 'react-icons/bs';
import Button from './Button';
import TextInput from './Form/TextInput';
import { Link } from 'react-router-dom';
import RegisterGoBack from './RegisterGoBack';

type Inputs = {
	email: string;
	username: string;
	password: string;
	passwordConfirm: string;
};

function RegisterForm() {
	const { register, handleSubmit } = useForm<Inputs>();

	function onSubmit(data: Inputs) {
		console.log(data);
	}

	return (
		<form
			className="mt-8"
			onSubmit={handleSubmit(onSubmit)}
		>
			<RegisterGoBack />
			<TextInput
				label="E-Mail"
				placeholder="Type your e-mail address"
				{...(register('email'), { required: true })}
				icon={BsEnvelopeAt}
			/>
			<TextInput
				label="Username"
				placeholder="Select new username"
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
			<TextInput
				label="Confirm password"
				type="password"
				placeholder="Re-type your password"
				{...(register('passwordConfirm'), { required: true })}
				icon={BsShieldLock}
			/>
			<Button
				className="mt-8 w-full text-lg"
				type="submit"
			>
				Create new account
			</Button>
		</form>
	);
}
export default RegisterForm;
