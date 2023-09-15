import SidebarNavigation from './SidebarNavigation';
import StockedUpLogo from '../StockedUpLogo';
import WarehouseSelect from '../WarehouseSelect';

function Sidebar() {
	return (
		<div className="bg-gray-150 py-6 px-8 w-72 flex flex-col h-100 border-gray-300 border-r">
			<div>
				<StockedUpLogo variant="black" className="w-full h-auto" />
			</div>
			<WarehouseSelect />
			<SidebarNavigation />
		</div>
	);
}

export default Sidebar;
