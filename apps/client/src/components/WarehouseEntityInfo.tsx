import { useContext } from 'react';
import { BsCheckCircle, BsPencil, BsTrash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { WarehouseDto } from 'shared-types';
import { CurrentAppContext } from '../context/CurrentAppContext';
import { Utils } from '../utils/utils';
import EntityActionsRow from './Entity/EntityActionsRow';
import EntityInfoTable from './Entity/EntityInfoTable';
import Alert from './Helpers/Alert';
import IconButton from './IconButton';

export interface WarehouseEntityInfoProps {
	warehouse: WarehouseDto;
}

function WarehouseEntityInfo({ warehouse }: WarehouseEntityInfoProps) {
	const appContext = useContext(CurrentAppContext);
	const navigate = useNavigate();

	const isCurrentWarehouse = warehouse.id == appContext.currentWarehouse.id;
	const isLastWarehouse = appContext.organization.warehouses.length < 2;

	return (
		<>
			<div className="mb-12 flex items-center gap-2">
				<h2 className="text-3xl">{warehouse?.name}</h2>
				<span className="text-muted">(warehouse)</span>
			</div>

			{isLastWarehouse && (
				<Alert
					variant="info"
					className="mb-8"
				>
					This warehouse is the only one left in this organization. Every organization needs to have
					at least one warehouse. In order to delete this warehouse, you need to delete whole
					organization.
				</Alert>
			)}
			<EntityInfoTable
				properties={{
					name: warehouse.name,
					'internal ID': <code>{warehouse.id}</code>,
					organization: appContext.organization.name,
					address: warehouse.address,
				}}
				className="mb-8"
			/>
			<EntityActionsRow>
				<IconButton
					icon={BsCheckCircle}
					disabled={isCurrentWarehouse}
					onClick={() =>
						navigate(
							`${Utils.dashboardUrl(appContext.organization.id, warehouse?.id)}/warehouses/`,
							{
								replace: true,
							},
						)
					}
				>
					{isCurrentWarehouse ? 'Selected' : 'Switch to this warehouse'}
				</IconButton>
				<IconButton
					icon={BsPencil}
					onClick={() => navigate(`../update/${warehouse.id}`)}
				>
					Update
				</IconButton>
				<IconButton
					disabled={isLastWarehouse}
					onClick={() => navigate(`../delete/${warehouse.id}`)}
					icon={BsTrash}
				>
					Delete
				</IconButton>
			</EntityActionsRow>
		</>
	);
}
export default WarehouseEntityInfo;
