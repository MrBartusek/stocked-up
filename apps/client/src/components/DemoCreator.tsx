import axios from 'axios';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { PrivateUserDto, UserLoginDto } from 'shared-types';
import { UserContext } from '../context/UserContext';
import { Utils } from '../utils/utils';
import Button from './Button';
import Alert from './Helpers/Alert';

function DemoCreator() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { invalidateUser } = useContext(UserContext);

	function handleClick() {
		setLoading(true);
		setError(null);

		axios
			.post<PrivateUserDto>(`/api/demo/register`)
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
			<div className="my-8">
				{error && <Alert>{error}</Alert>}
				<p className="mb-2">
					We are going to create temporary demonstration StockedUp account. It will be filled with
					fake warehouses and products.
				</p>
				<p>This account will be removed in 24 hours</p>
			</div>

			<Button
				className="mt-3 w-full"
				onClick={handleClick}
				size="large"
				loading={loading}
			>
				Create demo account
			</Button>
		</div>
	);
}
export default DemoCreator;
