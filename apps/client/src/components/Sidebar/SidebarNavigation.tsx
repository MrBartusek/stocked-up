import {
	BsArrowLeftRight,
	BsBoxFill,
	BsBoxSeamFill,
	BsClipboard2DataFill,
	BsDashSquareFill,
	BsGeoAltFill,
	BsPencilSquare,
	BsPersonFill,
	BsPlusSquareFill,
	BsTagFill,
} from 'react-icons/bs';
import SidebarLink from './SidebarLink';
import SidebarSection from './SidebarSection';
import usePageInfo from '../../hooks/usePageInfo';
import { Utils } from '../../utils';

function SidebarNavigation() {
	const { organizationId, warehouseId } = usePageInfo();
	const baseUrl = Utils.dashboardUrl(organizationId, warehouseId);

	return (
		<nav className="my-3 flex flex-col gap-5">
			<SidebarSection name="Dashboard">
				<SidebarLink
					to={`${baseUrl}`}
					icon={BsClipboard2DataFill}
					text="Dashboard"
				/>
				<SidebarLink
					to={`${baseUrl}/products`}
					icon={BsTagFill}
					text="Products"
				/>
				<SidebarLink
					to={`${baseUrl}/warehouses`}
					icon={BsGeoAltFill}
					text="Warehouses"
				/>
			</SidebarSection>
			<SidebarSection name="Inventory">
				<SidebarLink
					to={`${baseUrl}/inventory`}
					icon={BsBoxFill}
					text="Inventory"
				/>
				<SidebarLink
					to={`${baseUrl}/inventory/add`}
					icon={BsPlusSquareFill}
					text="Add inventory"
				/>
				<SidebarLink
					to={`${baseUrl}/inventory/move`}
					icon={BsArrowLeftRight}
					text="Move inventory"
				/>
			</SidebarSection>
			<SidebarSection name="Orders">
				<SidebarLink
					to={`${baseUrl}/orders`}
					icon={BsBoxSeamFill}
					text="Orders"
				/>
				<SidebarLink
					to={`${baseUrl}/orders/add`}
					icon={BsPlusSquareFill}
					text="Create order"
				/>
				<SidebarLink
					to={`${baseUrl}/orders/customers`}
					icon={BsPersonFill}
					text="Customers"
				/>
			</SidebarSection>
		</nav>
	);
}

export default SidebarNavigation;
