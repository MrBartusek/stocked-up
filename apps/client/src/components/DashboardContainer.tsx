import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Loader from './Loader';

function DashboardContainer() {
	const { isLoading, isAuthenticated } = useContext(UserContext);
	return (
		<Loader isLoading={isLoading || !isAuthenticated}>
			<Outlet />
		</Loader>
	);
}
export default DashboardContainer;
