import { BsBuildingGear, BsChevronLeft, BsPencil, BsTrash } from 'react-icons/bs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import OrganizationSettingsSection from '../../OrganizationSettingsSection';
import useOrganizationDetails from '../../hooks/useOrganisationDetails';
import { Utils } from '../../utils';
import Button from '../Button';
import Container from '../Container';
import EntityActionsRow from '../Entity/EntityActionsRow';
import EntityInfoTable from '../Entity/EntityInfoTable';
import HeaderWithHint from '../HeaderWithHint';
import IconButton from '../IconButton';
import DashboardLayout from '../Layout/DasboardLayout';
import Loader from '../Loader';
import { SecondaryNavbar } from '../SecondaryNavbar';
import WarehousesList from '../WarehousesList';

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
