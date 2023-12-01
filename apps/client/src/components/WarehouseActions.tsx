import React, { useContext } from 'react';
import { BsFillCheckCircleFill, BsInfoCircleFill, BsPencilFill, BsTrashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { WarehouseDto } from 'shared-types';
import { Utils } from '../utils';
import ActionButton from './ActionButton';
import { CurrentAppContext } from './Context/CurrentAppContext';
import TableActionsWrapper from './TableActionsWrapper';

export interface WarehouseActionsProps {
	warehouse: WarehouseDto;
}

function WarehouseActions({ warehouse }: WarehouseActionsProps) {
	const appContext = useContext(CurrentAppContext);
	const navigate = useNavigate();

	const isCurrentWarehouse = warehouse.id == appContext.currentWarehouse.id;

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
			/>
			<ActionButton
				icon={BsInfoCircleFill}
				className="text-blue-600"
			/>
			<ActionButton
				icon={BsPencilFill}
				onClick={onClickEdit}
				className="text-primary"
			/>
			<ActionButton
				icon={BsTrashFill}
				onClick={onClickDelete}
				className="text-red-600"
			/>
		</TableActionsWrapper>
	);
}
export default WarehouseActions;
