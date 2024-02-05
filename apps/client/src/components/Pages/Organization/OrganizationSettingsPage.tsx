import { BsBuildingGear } from 'react-icons/bs';
import { Outlet, useParams } from 'react-router-dom';
import useOrganizationDetails from '../../../hooks/useOrganisationDetails';
import GoBackButton from '../../GoBackButton';
import DashboardLayout from '../../Layout/DasboardLayout';
import SettingsLayout from '../../Layout/SettingsLayout';
import Loader from '../../Loader';
import { SecondaryNavbar } from '../../SecondaryNavbar';
import OrganizationSettingsSidebar from './OrganizationSettingsSidebar';

function OrganizationSettingsPage() {
	const { id } = useParams();
	const { organization, isLoading, error } = useOrganizationDetails(id);

	return (
		<DashboardLayout>
			<SecondaryNavbar
				icon={BsBuildingGear}
				title="Organization Settings"
			>
				<GoBackButton />
			</SecondaryNavbar>
			<Loader
				isLoading={isLoading}
				isError={error != undefined}
			>
				<SettingsLayout sidebar={<OrganizationSettingsSidebar />}>
					<Outlet context={organization} />
				</SettingsLayout>
			</Loader>
		</DashboardLayout>
	);
}

export default OrganizationSettingsPage;
