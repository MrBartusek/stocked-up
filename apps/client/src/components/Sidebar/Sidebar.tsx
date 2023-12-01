import OrganizationSelect from '../Organization/OrganizationSelect';
import StockedUpLogo from '../StockedUpLogo';
import WarehouseSelect from '../Warehouse/WarehouseSelect';
import SidebarNavigation from './SidebarNavigation';

function Sidebar() {
	const Separator = <div className="mb-3 border-b border-gray-300 pb-4"></div>;
	return (
		<div className="h-100 flex w-72 flex-shrink-0 flex-col overflow-y-auto border-r border-gray-300 bg-gray-150 px-8 py-6">
			<div>
				<StockedUpLogo
					variant="black"
					className="h-auto w-full"
				/>
			</div>
			<WarehouseSelect />
			<OrganizationSelect />
			{Separator}
			<SidebarNavigation />
		</div>
	);
}

export default Sidebar;
