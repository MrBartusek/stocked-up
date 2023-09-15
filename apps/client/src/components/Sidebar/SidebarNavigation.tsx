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

function SidebarNavigation() {
	return (
		<nav className="my-3 flex flex-col gap-5">
			<SidebarSection name="Dashboard">
				<SidebarLink
					to="/dashboard"
					icon={BsClipboard2DataFill}
					text="Dashboard"
				/>
				<SidebarLink
					to="/dashboard/products"
					icon={BsTagFill}
					text="Products"
				/>
				<SidebarLink
					to="/dashboard/warehouses"
					icon={BsGeoAltFill}
					text="Warehouses"
				/>
			</SidebarSection>
			<SidebarSection name="Inventory">
				<SidebarLink
					to="/dashboard/inventory"
					icon={BsBoxFill}
					text="Inventory"
				/>
				<SidebarLink
					to="/dashboard/inventory/add"
					icon={BsPlusSquareFill}
					text="Add inventory"
				/>
				<SidebarLink
					to="/dashboard/inventory/remove"
					icon={BsDashSquareFill}
					text="Remove inventory"
				/>
				<SidebarLink
					to="/dashboard/inventory/move"
					icon={BsArrowLeftRight}
					text="Move inventory"
				/>
				<SidebarLink
					to="/dashboard/inventory/adjust"
					icon={BsPencilSquare}
					text="Adjust inventory"
				/>
			</SidebarSection>
			<SidebarSection name="Orders">
				<SidebarLink
					to="/dashboard/orders"
					icon={BsBoxSeamFill}
					text="Orders"
				/>
				<SidebarLink
					to="/dashboard/orders/add"
					icon={BsPlusSquareFill}
					text="Create order"
				/>
				<SidebarLink
					to="/dashboard/orders/customers"
					icon={BsPersonFill}
					text="Customers"
				/>
			</SidebarSection>
		</nav>
	);
}

export default SidebarNavigation;
