import axios from 'axios';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { PrivateUserDto, UserLoginDto } from 'shared-types';
import { UserContext } from '../context/UserContext';
import { Utils } from '../utils';
import Button from './Button';
import Alert from './Helpers/Alert';
import RegisterGoBack from './RegisterGoBack';

function DemoCreator() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { invalidateUser } = useContext(UserContext);

	function handleClick() {
		setLoading(true);
		setError(null);

		axios
			.post<PrivateUserDto>(`/api/auth/demo`)
			.then((result) => {
				const loginDto: UserLoginDto = { username: result.data.email, password: 'demo' };
				return axios.post(`/api/auth/login`, loginDto);
			})
			.then(invalidateUser)
			.then(() => toast.success('Welcome to StockedUp demo!'))
			.catch((err) => setError(Utils.requestErrorToString(err)))
			.finally(() => setLoading(false));
	}

	return (
		<div className="mt-8">
			<RegisterGoBack />

			{error && <Alert>{error}</Alert>}

			<ul className="my-10 list-disc">
				<li>We are going to create an temporary demo StockedUp account</li>
				<li>We will fill it up with fake items, warehouses and employees</li>
				<li>
					You won&apos;t be able to login back when you log out and, it will be removed in 24 hours
				</li>
			</ul>
			<Button
				className="mt-3 w-full"
				onClick={handleClick}
				loading={loading}
			>
				Create demo account
			</Button>
		</div>
	);
}
export default DemoCreator;
