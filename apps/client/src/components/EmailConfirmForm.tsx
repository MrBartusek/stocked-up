import axios from 'axios';
import { useEffect, useState } from 'react';
import { BsCheck } from 'react-icons/bs';
import { useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { Utils } from '../utils/utils';
import Button from './Button';
import Alert from './Helpers/Alert';
import Loader from './Loader';

export interface EmailConfirmFormProps {
	token: string;
}

function EmailConfirmForm({ token }: EmailConfirmFormProps) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const queryClient = useQueryClient();

	useEffect(() => {
		setLoading(true);
		setError(null);

		axios
			.post(`/api/auth/confirm-email/${token}`)
			.then(() => {
				queryClient.invalidateQueries(['users', 'me']);
			})
			.catch((err) => setError(Utils.requestErrorToString(err)))
			.finally(() => setLoading(false));
	}, [queryClient, token]);

	return (
		<div className="my-12">
			{error ? (
				<Alert className="text-center">{error}</Alert>
			) : (
				<Loader isLoading={loading}>
					<div className="flex flex-col items-center gap-4">
						<div className="flex items-center justify-center gap-1">
							<BsCheck className="text-4xl text-success" /> Successfully confirmed email address
						</div>

						<Link to="/dashboard">
							<Button variant="success">Navigate to dashboard</Button>
						</Link>
					</div>
				</Loader>
			)}
		</div>
	);
}
export default EmailConfirmForm;
