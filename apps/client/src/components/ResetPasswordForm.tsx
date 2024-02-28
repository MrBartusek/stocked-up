import axios, { AxiosError } from 'axios';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsShieldLock } from 'react-icons/bs';
import { IResetPasswordDto } from 'shared-types';
import { UserContext } from '../context/UserContext';
import { Utils } from '../utils/utils';
import Button from './Button';
import FancyInput from './Form/FancyInput';
import Alert from './Helpers/Alert';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export interface ResetPasswordFormProps {
	user: string;
	token: string;
}

type Inputs = {
	password: string;
	passwordConfirm: string;
};

function ResetPasswordForm({ user, token }: ResetPasswordFormProps) {
	const { register, handleSubmit } = useForm<Inputs>();
	const { isAuthenticated, logout } = useContext(UserContext);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const navigate = useNavigate();

	function onSubmit(inputs: Inputs) {
		if (inputs.password != inputs.passwordConfirm) {
			setError('Your passwords confirmation does not match');
			return;
		}
		setLoading(true);
		setError(null);

		const dto: IResetPasswordDto = {
			user,
			token,
			password: inputs.password,
		};
		axios
			.post(`/api/auth-emails/reset-password/reset`, dto)
			.then(() => {
				toast.success('Your password have been changed, you can login now');
				if (isAuthenticated) {
					logout();
				}

				navigate('/login');
			})
			.catch((error: AxiosError) => {
				setError(Utils.requestErrorToString(error));
			})
			.finally(() => setLoading(false));
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{error && <Alert>{error}</Alert>}

			<FancyInput
				label="New password"
				type="password"
				minLength={4}
				maxLength={32}
				placeholder="Type your new password"
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
				Reset password
			</Button>
		</form>
	);
}
export default ResetPasswordForm;
