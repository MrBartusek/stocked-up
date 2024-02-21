import {
	BsBoxFill,
	BsClipboard2DataFill,
	BsGeoAltFill,
	BsPlusSquareFill,
	BsTagFill,
} from 'react-icons/bs';
import usePageInfo from '../../hooks/usePageInfo';
import { Utils } from '../../utils/utils';
import SidebarLink from './SidebarLink';
import SidebarSection from './SidebarSection';

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
			</SidebarSection>
		</nav>
	);
}

export default SidebarNavigation;
