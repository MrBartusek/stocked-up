import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

function DashboardPage() {
	return (
		<div className="flex flex-row h-full">
			<Sidebar />
			<Outlet />
		</div>
	);
}

export default DashboardPage;
