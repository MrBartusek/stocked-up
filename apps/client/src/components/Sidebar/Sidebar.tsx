import SidebarNavigation from './SidebarNavigation';
import StockedUpLogo from '../StockedUpLogo';
import WarehouseSelect from '../WarehouseSelect';

function Sidebar() {
	return (
		<div className="h-100 flex w-72 flex-col border-r border-gray-300 bg-gray-150 px-8 py-6">
			<div>
				<StockedUpLogo
					variant="black"
					className="h-auto w-full"
				/>
			</div>
			<WarehouseSelect />
			<SidebarNavigation />
		</div>
	);
}

export default Sidebar;
