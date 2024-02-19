import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { IUpdateEmailDto } from 'shared-types';
import { Utils } from '../../utils/utils';
import Form from '../Form/Form';
import FormField from '../Form/FormField';
import FormInput from '../Form/FormInput';
import FormSubmitButton from '../Form/FormSubmitButton';
import Alert from '../Helpers/Alert';

type Inputs = {
	password: string;
	email: string;
};

function UserEmailChangeForm() {
	const { register, handleSubmit } = useForm<Inputs>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const navigate = useNavigate();

	function onSubmit(inputs: Inputs) {
		setLoading(true);
		setError(null);

		const dto: IUpdateEmailDto = inputs;

		axios
			.post<void>(`/api/auth/change-email`, dto)
			.then(async () => {
				navigate('..');
				toast.success(`Successfully changed e-mail address`);
			})
			.catch((err) => setError(Utils.requestErrorToString(err)))
			.finally(() => setLoading(false));
	}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit)}
			loading={loading}
		>
			{error && <Alert>{error}</Alert>}

			<FormField
				label="Current password"
				hint="Confirm your current password"
				required
			>
				<FormInput
					type="password"
					required
					{...register('password', { required: true })}
				/>
			</FormField>

			<FormField
				label="New E-mail address"
				required
			>
				<FormInput
					type="email"
					required
					{...register('email', { required: true })}
				/>
			</FormField>

			<FormSubmitButton>Change E-mail address</FormSubmitButton>
			<span className="ms-4 text-muted">(You will need to confirm this e-mail)</span>
		</Form>
	);
}
export default UserEmailChangeForm;
