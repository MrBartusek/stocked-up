import { Link, useOutletContext } from 'react-router-dom';
import { OrganizationDto } from 'shared-types';
import { Utils } from '../../../utils/utils';
import WarehousesList from '../../Warehouse/WarehousesList';

function OrganizationWarehousesTab() {
	const organization = useOutletContext<OrganizationDto>();

	const dashboardUrl = Utils.dashboardUrl(organization.id, organization.warehouses[0].id);
	return (
		<div className="mt-8">
			<div className="flex items-baseline gap-2">
				<h2 className="mb-4 text-3xl">Warehouses</h2>
				<Link
					to={`${dashboardUrl}/warehouses/create`}
					className="link-primary"
				>
					[Create]
				</Link>
			</div>

			<p className="mb-4 text-muted">
				This list comprises all warehouses created within the organization. Warehouses store
				information about stock quantity and location for products. It is recommended to create a
				StockedUp warehouse corresponding to each physical warehouse.
			</p>

			<WarehousesList
				disableExpander
				organization={organization}
			/>
		</div>
	);
}
export default OrganizationWarehousesTab;
