import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

function DashboardPage() {
	return (
		<div className="flex h-full flex-row">
			<Sidebar />
			<Outlet />
		</div>
	);
}

export default DashboardPage;
