import { BsBuildingX } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import useOrganizationDetails from '../../../hooks/useOrganisationDetails';
import Container from '../../Container';
import GoBackButton from '../../GoBackButton';
import DashboardLayout from '../../Layout/DasboardLayout';
import Loader from '../../Loader';
import { SecondaryNavbar } from '../../SecondaryNavbar';
import OrganizationDeleteForm from './OrganizationDeleteForm';

function OrganizationDeletePage() {
	const { id } = useParams();
	const { organization, isLoading, error } = useOrganizationDetails(id);

	return (
		<DashboardLayout>
			<SecondaryNavbar
				icon={BsBuildingX}
				title={`Delete: ${organization?.name}`}
			>
				<GoBackButton to={`../view/${organization?.id}`} />
			</SecondaryNavbar>
			<Loader
				isLoading={isLoading}
				isError={error != undefined}
			>
				<Container className="mt-8">
					<OrganizationDeleteForm organization={organization} />
				</Container>
			</Loader>
		</DashboardLayout>
	);
}

export default OrganizationDeletePage;
