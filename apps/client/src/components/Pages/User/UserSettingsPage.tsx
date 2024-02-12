import { BsSliders } from 'react-icons/bs';
import { Outlet } from 'react-router-dom';
import GoBackButton from '../../GoBackButton';
import DashboardLayout from '../../Layout/DasboardLayout';
import SettingsLayout from '../../Layout/SettingsLayout';
import { SecondaryNavbar } from '../../SecondaryNavbar';
import UserSettingsSidebar from './UserSettingsSidebar';

function UserSettingsPage() {
	return (
		<DashboardLayout>
			<SecondaryNavbar
				icon={BsSliders}
				title="User Settings"
			>
				<GoBackButton to="/dashboard" />
			</SecondaryNavbar>
			<SettingsLayout sidebar={<UserSettingsSidebar />}>
				<Outlet />
			</SettingsLayout>
		</DashboardLayout>
	);
}

export default UserSettingsPage;
