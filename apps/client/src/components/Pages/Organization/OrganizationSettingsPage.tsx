import { BsBuildingGear } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import useOrganizationDetails from '../../../hooks/useOrganisationDetails';
import Container from '../../Container';
import GoBackButton from '../../GoBackButton';
import DashboardLayout from '../../Layout/DasboardLayout';
import Loader from '../../Loader';
import OrganizationSettings from '../../Organization/OrganizationSettings';
import { SecondaryNavbar } from '../../SecondaryNavbar';

function OrganizationSettingsPage() {
	const { id } = useParams();
	const { organization, isLoading, error } = useOrganizationDetails(id);

	return (
		<DashboardLayout>
			<SecondaryNavbar
				icon={BsBuildingGear}
				title={`${organization?.name} - settings`}
			>
				<GoBackButton to={`../view/${organization.id}`} />
			</SecondaryNavbar>
			<Loader
				isLoading={isLoading}
				isError={error != undefined}
			>
				<Container>
					<OrganizationSettings organization={organization} />
				</Container>
			</Loader>
		</DashboardLayout>
	);
}

export default OrganizationSettingsPage;
