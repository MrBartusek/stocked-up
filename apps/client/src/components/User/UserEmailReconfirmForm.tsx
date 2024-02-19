import axios from 'axios';
import classNames from 'classnames';
import { useContext, useState } from 'react';
import { BsCheckCircle, BsXCircle } from 'react-icons/bs';
import { UserContext } from '../../context/UserContext';
import { Utils } from '../../utils/utils';
import Button from '../Button';
import Alert from '../Helpers/Alert';

function UserEmailReconfirmForm() {
	const { user } = useContext(UserContext);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<boolean>(false);

	function onSubmit() {
		setLoading(true);
		setError(null);
		setSuccess(false);

		axios
			.post('/api/auth-emails/confirm-email/start')
			.then(() => setSuccess(true))
			.catch((err) => setError(Utils.requestErrorToString(err)))
			.finally(() => setLoading(false));
	}

	return (
		<div>
			{error && <Alert>{error}</Alert>}
			{success && (
				<Alert variant="success">
					We&apos;ve sent e-mail confirmation instructions to the e-mail address you have provided.
					If you haven&apos;t received this email in few minutes, please check your spam folder.
				</Alert>
			)}
			<div className="mb-8 rounded-md border px-3 py-4">
				<div className="font-medium text-muted">Confirmation status:</div>
				<div
					className={classNames(
						'flex items-center gap-2',
						user.isConfirmed ? 'text-success' : 'text-danger',
					)}
				>
					{user.isConfirmed ? (
						<>
							<BsCheckCircle /> <span>E-mail address confirmed</span>
						</>
					) : (
						<>
							<BsXCircle /> <span>E-mail address not confirmed</span>
						</>
					)}
				</div>
			</div>

			<Button
				disabled={user.isConfirmed || success || loading}
				onClick={onSubmit}
			>
				Send confirmation email
			</Button>
		</div>
	);
}
export default UserEmailReconfirmForm;
