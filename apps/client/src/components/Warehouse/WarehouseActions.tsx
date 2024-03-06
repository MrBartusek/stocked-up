import React, { useContext } from 'react';
import { BsFillCheckCircleFill, BsInfoCircleFill, BsPencilFill, BsTrashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { WarehouseDto } from 'shared-types';
import { CurrentAppContext } from '../../context/CurrentAppContext';
import { Utils } from '../../utils/utils';
import ActionButton from '../ActionButton';
import TableActionsWrapper from '../Helpers/Table/TableActionsWrapper';

export interface WarehouseActionsProps {
	warehouse: WarehouseDto;
}

function WarehouseActions({ warehouse }: WarehouseActionsProps) {
	const appContext = useContext(CurrentAppContext);
	const navigate = useNavigate();

	const isCurrentWarehouse = warehouse.id == appContext.currentWarehouse.id;
	const isLastWarehouse = appContext.organization.warehouses.length < 2;

	function onClickSelect(event: React.MouseEvent<HTMLButtonElement>) {
		event.stopPropagation();
		navigate(Utils.dashboardUrl(appContext.organization.id, warehouse.id) + '/warehouses');
	}

	function onClickEdit(event: React.MouseEvent<HTMLButtonElement>) {
		event.stopPropagation();
		navigate(`${appContext.baseUrl}/warehouses/update/${warehouse.id}`);
	}

	function onClickDelete(event: React.MouseEvent<HTMLButtonElement>) {
		event.stopPropagation();
		navigate(`${appContext.baseUrl}/warehouses/delete/${warehouse.id}`);
	}

	return (
		<TableActionsWrapper>
			<ActionButton
				icon={BsFillCheckCircleFill}
				onClick={onClickSelect}
				disabled={isCurrentWarehouse}
				className={isCurrentWarehouse ? 'text-gray-400' : 'text-green-600'}
				title="Switch to this warehouse"
			/>
			<ActionButton
				icon={BsInfoCircleFill}
				className="text-blue-600"
				title="View details"
			/>
			<ActionButton
				icon={BsPencilFill}
				onClick={onClickEdit}
				className="text-primary"
				title="Edit"
			/>
			<ActionButton
				icon={BsTrashFill}
				onClick={onClickDelete}
				disabled={isLastWarehouse}
				className="text-red-600"
				title="Delete"
			/>
		</TableActionsWrapper>
	);
}
export default WarehouseActions;
