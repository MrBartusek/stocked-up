import { Row } from '@tanstack/react-table';
import React, { useContext } from 'react';
import {
	BsCheck,
	BsCheckCircle,
	BsFillCheckCircleFill,
	BsInfoCircleFill,
	BsPencilFill,
	BsTrashFill,
} from 'react-icons/bs';
import { WarehouseDto } from 'shared-types';
import ActionButton from './ActionButton';
import TableActionsWrapper from './TableActionsWrapper';
import { CurrentAppContext } from './Context/CurrentAppContext';
import { useNavigate } from 'react-router-dom';
import { Utils } from '../utils';

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
		console.log(event);
	}

	function onClickDelete(event: React.MouseEvent<HTMLButtonElement>) {
		event.stopPropagation();
		console.log(event);
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
