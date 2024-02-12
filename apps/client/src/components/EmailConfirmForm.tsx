import { useEffect } from 'react';
import { BsCheckCircle } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import useEmailConfirm from '../hooks/useEmailConfirm';
import { Utils } from '../utils/utils';
import Button from './Button';
import Alert from './Helpers/Alert';
import Loader from './Loader';

export interface EmailConfirmFormProps {
	token: string;
	user: string;
}

function EmailConfirmForm({ token, user }: EmailConfirmFormProps) {
	const { confirmed, isLoading, error } = useEmailConfirm(token, user);
	const navigate = useNavigate();

	useEffect(() => {
		if (!confirmed) return;

		const timeout = setTimeout(() => {
			navigate('/dashboard');
			navigate(0);
		}, 3000);
		return () => clearTimeout(timeout);
	}, [confirmed]);

	return (
		<div className="my-12">
			{error ? (
				<div>
					<Alert className="mb-8 text-center">{Utils.requestErrorToString(error)}</Alert>
					<Link
						to="/dashboard"
						className="grid"
					>
						<Button>Back to dashboard</Button>
					</Link>
				</div>
			) : (
				<Loader isLoading={isLoading}>
					<div className="flex flex-col items-center gap-6 rounded-xl border border-gray-300 px-8 py-12">
						<div className="flex flex-col items-center justify-center gap-6 text-center text-xl">
							<BsCheckCircle className="text-5xl text-success" /> Successfully confirmed email
							address
						</div>
						<Link
							to="/dashboard"
							className="link-muted text-center"
						>
							Redirecting you to dashboard...
						</Link>
					</div>
				</Loader>
			)}
		</div>
	);
}
export default EmailConfirmForm;
