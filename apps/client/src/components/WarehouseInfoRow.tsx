import { BsChevronRight, BsGeoAltFill } from 'react-icons/bs';

function WarehouseInfoRow() {
	return (
		<div className="mb-3 flex items-center justify-between rounded-md bg-gray-200 px-8 py-6">
			<div className="flex items-center gap-5">
				<div className="text-xl text-primary">
					<BsGeoAltFill />
				</div>
				<div>
					<h4>Main storage</h4>
					<span className="text-sm text-muted">Łódź, ul. Zgierska</span>
				</div>
			</div>
			<BsChevronRight />
		</div>
	);
}
export default WarehouseInfoRow;
