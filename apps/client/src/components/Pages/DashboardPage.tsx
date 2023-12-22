import { Outlet } from 'react-router-dom';
import usePageInfo from '../../hooks/usePageInfo';
import useCurrentAppContext from '../../hooks/useAppContext';
import { CurrentAppContext } from '../../context/CurrentAppContext';
import Loader from '../Loader';
import Sidebar from '../Sidebar/Sidebar';

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
