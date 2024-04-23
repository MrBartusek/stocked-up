import classNames from 'classnames';
import { BsBoxSeamFill, BsChevronRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { BasicWarehouseDto } from 'shared-types';
import { Utils } from '../../utils/utils';

export interface WarehouseInfoRowProps {
	organizationId: string;
	warehouse: BasicWarehouseDto;
}

function WarehouseInfoRow({ warehouse, organizationId }: WarehouseInfoRowProps) {
	return (
		<Link
			className={classNames(
				'flex items-center justify-between border-b border-gray-200',
				'px-4 py-5 hover:bg-gray-150',
			)}
			to={Utils.dashboardUrl(organizationId, warehouse.id)}
		>
			<div className="flex items-center gap-6">
				<div className="text-xl text-secondary">
					<BsBoxSeamFill />
				</div>
				<h4>{warehouse.name}</h4>
			</div>
			<BsChevronRight />
		</Link>
	);
}
export default WarehouseInfoRow;
