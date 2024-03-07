import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsEnvelopeAt } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import PasswordResetSuccessAlert from '../PasswordResetSuccessAlert';
import { Utils } from '../utils/utils';
import Button from './Button';
import FancyInput from './Form/FancyInput';
import Alert from './Helpers/Alert';
import FieldTransformers from '../utils/fieldTransformers';

type Inputs = {
	email: string;
};

function SendPasswordResetEmailForm() {
	const { register, handleSubmit } = useForm<Inputs>();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	function onSubmit(inputs: Inputs) {
		setLoading(true);
		setError(null);

		axios
			.post(`/api/auth-emails/reset-password/start?email=${inputs.email}`)
			.then(() => setSuccess(true))
			.catch((error: AxiosError) => {
				setError(Utils.requestErrorToString(error));
			})
			.finally(() => setLoading(false));
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{success ? (
				<PasswordResetSuccessAlert />
			) : (
				<>
					<p className="mb-4 text-center text-muted">
						Please enter the E-mail address that you have used to register to StockedUp. We will
						send you a link that you can use to reset your password
					</p>

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

					<div className="mt-10 flex gap-6">
						<Link to="/login">
							<Button
								className="text-lg"
								variant="secondary-outline"
								type="submit"
								loading={loading}
							>
								Cancel
							</Button>
						</Link>

						<Button
							className="flex-1 text-lg"
							type="submit"
							loading={loading}
						>
							Reset password
						</Button>
					</div>
				</>
			)}
		</form>
	);
}
export default SendPasswordResetEmailForm;
