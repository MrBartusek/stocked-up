import { BsBuildingGear, BsChevronLeft } from 'react-icons/bs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useOrganizationDetails from '../../hooks/useOrganisationDetails';
import Button from '../Button';
import Container from '../Container';
import DashboardLayout from '../Layout/DasboardLayout';
import Loader from '../Loader';
import { SecondaryNavbar } from '../SecondaryNavbar';

function OrganizationSettingsPage() {
	const { id } = useParams();
	const { organization, isLoading, error } = useOrganizationDetails(id);
	const navigate = useNavigate();

	return (
		<DashboardLayout>
			<SecondaryNavbar
				icon={BsBuildingGear}
				title={`${organization?.name} - settings`}
				actions={
					<Link to="..">
						<Button className="flex items-center gap-3">
							<BsChevronLeft size={20} />
							Go back
						</Button>
					</Link>
				}
			/>
			<Loader
				isLoading={isLoading}
				isError={error != undefined}
			>
				<Container>
					<div>form</div>
				</Container>
			</Loader>
		</DashboardLayout>
	);
}

export default OrganizationSettingsPage;
