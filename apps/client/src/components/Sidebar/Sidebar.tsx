import SidebarNavigation from './SidebarNavigation';
import StockedUpLogo from '../StockedUpLogo';
import WarehouseSelect from '../WarehouseSelect';

function Sidebar() {
	const Separator = <div className="mb-3 border-b border-gray-300 pb-3"></div>;
	return (
		<div className="h-100 flex w-72 flex-col border-r border-gray-300 bg-gray-150 px-8 py-6">
			<div>
				<StockedUpLogo
					variant="black"
					className="h-auto w-full"
				/>
			</div>
			<WarehouseSelect />
			{Separator}
			<SidebarNavigation />
		</div>
	);
}

export default Sidebar;
