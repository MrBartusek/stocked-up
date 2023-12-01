import React, { useContext } from 'react';
import { BsInfoCircleFill, BsPencilFill, BsTrashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { BasicInventoryItemDto } from 'shared-types';
import ActionButton from '../ActionButton';
import { CurrentAppContext } from '../Context/CurrentAppContext';
import TableActionsWrapper from '../TableActionsWrapper';

export interface ProductActionsProps {
	item: BasicInventoryItemDto;
}

function InventoryItemActions({ item }: ProductActionsProps) {
	const appContext = useContext(CurrentAppContext);
	const navigate = useNavigate();

	function onClickEdit(event: React.MouseEvent<HTMLButtonElement>) {
		event.stopPropagation();
		navigate(`${appContext.baseUrl}/products/update/${item.id}`);
	}

	function onClickDelete(event: React.MouseEvent<HTMLButtonElement>) {
		event.stopPropagation();
		navigate(`${appContext.baseUrl}/products/delete/${item.id}`);
	}

	return (
		<TableActionsWrapper>
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
export default InventoryItemActions;
