import { Row } from '@tanstack/react-table';
import React from 'react';
import { BsInfoCircleFill, BsPencilFill, BsTrashFill } from 'react-icons/bs';
import { BasicProductDto } from 'shared-types';
import ActionButton from './ActionButton';
import TableActionsWrapper from './TableActionsWrapper';

export interface ProductActionsProps {
	row: Row<BasicProductDto>;
}

function ProductActions({ row }: ProductActionsProps) {
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
export default ProductActions;
