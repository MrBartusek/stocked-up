import { BsBuilding } from 'react-icons/bs';
import WarehouseInfoRow from './WarehouseInfoRow';

function OrganizationSelectSection() {
	return (
		<div className="mt-12 rounded-xl border border-gray-200 bg-gray-150 p-6">
			<div className="mb-8 flex items-center gap-4 text-xl">
				<div className="rounded-full bg-gray-300 p-4">
					<BsBuilding />
				</div>
				<h3>DokDev Corporation S.A.</h3>
			</div>
			<div>
				<WarehouseInfoRow />
				<WarehouseInfoRow />
				<WarehouseInfoRow />
			</div>
		</div>
	);
}
export default OrganizationSelectSection;
