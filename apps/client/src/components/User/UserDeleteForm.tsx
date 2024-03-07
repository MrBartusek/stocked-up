import axios from 'axios';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { IDeleteAccountDto } from 'shared-types';
import { UserContext } from '../../context/UserContext';
import FieldTransformers from '../../utils/fieldTransformers';
import { Utils } from '../../utils/utils';
import Button from '../Button';
import Form from '../Form/Form';
import FormField from '../Form/FormField';
import FormInput from '../Form/FormInput';
import FormSubmitButton from '../Form/FormSubmitButton';
import Alert from '../Helpers/Alert';

type Inputs = {
	password: string;
};

function UserDeleteForm() {
	const { register, handleSubmit, watch } = useForm<Inputs>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const { logout } = useContext(UserContext);
	const navigate = useNavigate();

	const passwordValue = watch('password');

	function onSubmit(inputs: Inputs) {
		setLoading(true);
		setError(null);

		const dto: IDeleteAccountDto = inputs;

		axios
			.delete(`/api/auth/delete`, { data: dto })
			.then(async () => {
				navigate('/');
				await logout();
				toast.success(`Successfully deleted user account`);
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
				label="Confirm your password to delete account"
				required
			>
				<FormInput
					type="password"
					required
					{...register('password', { required: true, setValueAs: FieldTransformers.string })}
				/>
			</FormField>

			<div className="flex items-center gap-4">
				<FormSubmitButton
					variant="danger"
					disableTopMargin
					disabled={!passwordValue || passwordValue.length < 4}
				>
					Delete my account
				</FormSubmitButton>
				<Link to="..">
					<Button variant="secondary">Cancel</Button>
				</Link>
				<span className="text-muted">(This action is not reversible)</span>
			</div>
		</Form>
	);
}
export default UserDeleteForm;
