import axios from 'axios';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BsEnvelopeAt, BsPerson, BsShieldLock } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { IUserRegisterDto, UserLoginDto } from 'shared-types';
import { UserContext } from '../context/UserContext';
import { Utils } from '../utils/utils';
import Button from './Button';
import FancyInput from './Form/FancyInput';
import Alert from './Helpers/Alert';
import FieldTransformers from '../utils/fieldTransformers';

type Inputs = {
	email: string;
	username: string;
	password: string;
};

function RegisterForm() {
	const { register, handleSubmit } = useForm<Inputs>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();
	const { invalidateUser } = useContext(UserContext);

	function onSubmit(inputs: Inputs) {
		setLoading(true);
		setError(null);

		const registerDto: IUserRegisterDto = inputs;
		axios
			.post(`/api/auth/register`, registerDto)
			.then(() => {
				const loginDto: UserLoginDto = { username: inputs.username, password: inputs.password };
				return axios.post(`/api/auth/login`, loginDto);
			})
			.then(invalidateUser)
			.then(() => navigate('/dashboard'))
			.then(() => toast.success('Your registration was successful. Welcome to StockedUp!'))
			.catch((err) => setError(Utils.requestErrorToString(err)))
			.finally(() => setLoading(false));
	}

	return (
		<form
			className="mt-8"
			onSubmit={handleSubmit(onSubmit)}
		>
			{error && <Alert>{error}</Alert>}

			<FancyInput
				label="E-Mail"
				placeholder="Type your e-mail address"
				type="email"
				{...register('email', { required: true, setValueAs: FieldTransformers.string })}
				icon={BsEnvelopeAt}
				disabled={loading}
				autoFocus
			/>
			<FancyInput
				label="Username"
				placeholder="Select new username"
				{...register('username', { required: true, setValueAs: FieldTransformers.string })}
				icon={BsPerson}
				disabled={loading}
			/>
			<FancyInput
				label="Password"
				type="password"
				placeholder="Type your password"
				{...register('password', { required: true, setValueAs: FieldTransformers.string })}
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
