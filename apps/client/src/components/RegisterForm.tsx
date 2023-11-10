import { useForm } from 'react-hook-form';
import { BsArrowLeft, BsEnvelopeAt, BsPerson, BsShieldLock } from 'react-icons/bs';
import Button from './Button';
import FancyInput from './Form/FancyInput';
import { Link, useNavigate } from 'react-router-dom';
import RegisterGoBack from './RegisterGoBack';
import { UserLoginDto, UserRegisterDto } from 'shared-types';
import { useContext, useState } from 'react';
import { Utils } from '../utils';
import { UserContext } from './Context/UserContext';
import toast from 'react-hot-toast';

type Inputs = {
	email: string;
	username: string;
	password: string;
	passwordConfirm: string;
};

function RegisterForm() {
	const { register, handleSubmit } = useForm<Inputs>();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { invalidateUser } = useContext(UserContext);

	function onSubmit(inputs: Inputs) {
		setLoading(true);

		const registerDto: UserRegisterDto = inputs;
		Utils.postFetcher(`/api/auth/register`, registerDto)
			.then(() => {
				const loginDto: UserLoginDto = { username: inputs.username, password: inputs.password };
				return Utils.postFetcher(`/api/auth/login`, loginDto);
			})
			.then(invalidateUser)
			.then(() => navigate('/dashboard'))
			.then(() => toast.success('Your registration was successful. Welcome to StockedUp!'))
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
			<RegisterGoBack />
			<FancyInput
				label="E-Mail"
				placeholder="Type your e-mail address"
				{...register('email', { required: true })}
				icon={BsEnvelopeAt}
				disabled={loading}
			/>
			<FancyInput
				label="Username"
				placeholder="Select new username"
				{...register('username', { required: true })}
				icon={BsPerson}
				disabled={loading}
			/>
			<FancyInput
				label="Password"
				type="password"
				placeholder="Type your password"
				{...register('password', { required: true })}
				icon={BsShieldLock}
				disabled={loading}
			/>
			<FancyInput
				label="Confirm password"
				type="password"
				placeholder="Re-type your password"
				{...register('passwordConfirm', { required: true })}
				icon={BsShieldLock}
				disabled={loading}
			/>
			<Button
				className="mt-8 w-full text-lg"
				type="submit"
				loading={loading}
			>
				Create new account
			</Button>
		</form>
	);
}
export default RegisterForm;
