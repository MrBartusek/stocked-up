import { BsBuildingAdd } from 'react-icons/bs';
import Container from '../../Container';
import GoBackButton from '../../GoBackButton';
import DashboardLayout from '../../Layout/DasboardLayout';
import OrganizationCreateForm from '../../Organization/OrganizationCreateForm';
import { SecondaryNavbar } from '../../SecondaryNavbar';

function OrganizationCreatePage() {
	return (
		<DashboardLayout>
			<SecondaryNavbar
				icon={BsBuildingAdd}
				title="Create organization"
			>
				<GoBackButton to="/dashboard/select" />
			</SecondaryNavbar>
			<Container className="flex flex-col">
				<OrganizationCreateForm />
			</Container>
		</DashboardLayout>
	);
}

export default OrganizationCreatePage;
