import { useContext } from 'react';
import { BsCheckCircle, BsPencil, BsTrash } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { WarehouseDto } from 'shared-types';
import { CurrentAppContext } from './components/Context/CurrentAppContext';
import EntityActionsRow from './components/Entity/EntityActionsRow';
import EntityInfoTable from './components/Entity/EntityInfoTable';
import IconButton from './components/IconButton';
import { Utils } from './utils';

export interface WarehouseEntityInfoProps {
	warehouse: WarehouseDto;
}

function WarehouseEntityInfo({ warehouse }: WarehouseEntityInfoProps) {
	const appContext = useContext(CurrentAppContext);
	const navigate = useNavigate();

	const isCurrentWarehouse = warehouse.id == appContext.currentWarehouse.id;

	return (
		<>
			<div className="mb-12 flex items-center gap-2">
				<h2 className="text-3xl">{warehouse?.name}</h2>
				<span className="text-muted">(warehouse)</span>
			</div>
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
					{isCurrentWarehouse ? 'This warehouse is already selected' : 'Switch to this warehouse'}
				</IconButton>
				<Link to={`../update/${warehouse.id}`}>
					<IconButton icon={BsPencil}>Update</IconButton>
				</Link>
				<Link to={`../delete/${warehouse.id}`}>
					<IconButton icon={BsTrash}>Delete</IconButton>
				</Link>
			</EntityActionsRow>
		</>
	);
}
export default WarehouseEntityInfo;
