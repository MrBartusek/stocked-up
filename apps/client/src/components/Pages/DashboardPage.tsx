import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import { CurrentAppContext } from '../Context/CurrentAppContext';
import useCurrentAppContext from '../../useAppContext';
import usePageInfo from '../../hooks/usePageInfo';
import Loader from '../Loader';

function DashboardPage() {
	const { warehouseId, organizationId } = usePageInfo();
	const appContext = useCurrentAppContext(organizationId, warehouseId);

	return (
		<CurrentAppContext.Provider value={appContext}>
			<Loader
				isLoading={appContext.isLoading}
				isError={appContext.error}
			>
				<div className="flex h-full flex-row">
					<Sidebar />
					<Outlet />
				</div>
			</Loader>
		</CurrentAppContext.Provider>
	);
}

export default DashboardPage;
