import { BsChevronRight, BsGeoAltFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { WarehouseDto } from 'shared-types';

export interface WarehouseInfoRowProps {
	warehouse: WarehouseDto;
}

function WarehouseInfoRow({ warehouse }: WarehouseInfoRowProps) {
	return (
		<Link
			className="mb-3 flex items-center justify-between rounded-md bg-gray-200 px-8 py-6"
			to={`/dashboard/${warehouse.id}`}
		>
			<div className="flex items-center gap-5">
				<div className="text-xl text-primary">
					<BsGeoAltFill />
				</div>
				<div>
					<h4>{warehouse.name}</h4>
					<span className="text-sm text-muted">Łódź, ul. Zgierska</span>
				</div>
			</div>
			<BsChevronRight />
		</Link>
	);
}
export default WarehouseInfoRow;
