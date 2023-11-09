import { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { UserContext } from './Context/UserContext';
import Loader from './Loader';

function DashboardContainer() {
	const { isLoading, isAuthenticated } = useContext(UserContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			console.error('AUTH: /me request failed - logging out...');
			navigate('/');
		}
	}, [isAuthenticated, isLoading, navigate]);

	return (
		<Loader isLoading={isLoading || !isAuthenticated}>
			<Outlet />
		</Loader>
	);
}
export default DashboardContainer;
