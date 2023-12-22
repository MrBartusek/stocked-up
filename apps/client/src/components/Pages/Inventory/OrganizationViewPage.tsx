import { BsBuildingGear, BsPencil, BsTrash } from 'react-icons/bs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useOrganizationDetails from '../../../hooks/useOrganisationDetails';
import { Utils } from '../../../utils';
import Container from '../../Container';
import EntityActionsRow from '../../Entity/EntityActionsRow';
import EntityInfoTable from '../../Entity/EntityInfoTable';
import GoBackButton from '../../GoBackButton';
import HeaderWithHint from '../../HeaderWithHint';
import IconButton from '../../IconButton';
import DashboardLayout from '../../Layout/DasboardLayout';
import Loader from '../../Loader';
import OrganizationSettingsSection from '../../OrganizationSettingsSection';
import { SecondaryNavbar } from '../../SecondaryNavbar';
import WarehousesList from '../../Warehouse/WarehousesList';

function OrganizationViewPage() {
	const { id } = useParams();
	const { organization, isLoading, error } = useOrganizationDetails(id);
	const navigate = useNavigate();

	const dashboardUrl = Utils.dashboardUrl(organization?.id, organization?.warehouses[0].id);

	return (
		<DashboardLayout>
			<SecondaryNavbar
				icon={BsBuildingGear}
				title={organization?.name}
			>
				<GoBackButton to="/dashboard/select" />
			</SecondaryNavbar>
			<Loader
				isLoading={isLoading}
				isError={error != undefined}
			>
				<Container>
					<div className="flex flex-col gap-14">
						<div>
							<HeaderWithHint
								hint="organization"
								className="mt-8"
							>
								{organization?.name}
							</HeaderWithHint>

							<EntityInfoTable
								properties={{
									name: organization?.name,
									'internal ID': <code>{organization?.id}</code>,
									currency: organization?.currency,
									warehouses: organization?.warehouses.length,
									'total value': Utils.humanizeCurrency(
										organization?.stats.totalValue,
										organization?.currency,
									),
								}}
							/>
						</div>

						<OrganizationSettingsSection organization={organization} />

						<div>
							<div className="flex items-baseline gap-2">
								<h2 className="mb-4 text-2xl">Warehouses</h2>
								<Link
									to={`${dashboardUrl}/warehouses/create`}
									className="link-primary"
								>
									[Create]
								</Link>
							</div>

							<p className="mb-4 text-muted">
								This list comprises all warehouses created within the organization. Warehouses store
								information about stock quantity and location for products. It is recommended to
								create a StockedUp warehouse corresponding to each physical warehouse.
							</p>
							<WarehousesList organization={organization} />
						</div>
					</div>

					<EntityActionsRow>
						<IconButton
							icon={BsPencil}
							onClick={() => navigate(`../update/${organization.id}`)}
						>
							Edit
						</IconButton>
						<IconButton
							icon={BsTrash}
							onClick={() => navigate(`../delete/${organization.id}`)}
						>
							Delete
						</IconButton>
					</EntityActionsRow>
				</Container>
			</Loader>
		</DashboardLayout>
	);
}

export default OrganizationViewPage;
