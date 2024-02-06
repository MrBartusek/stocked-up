import React, { useContext } from 'react';
import { BsInfoCircleFill, BsPencilFill, BsTrashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { BasicProductDto } from 'shared-types';
import { CurrentAppContext } from '../../context/CurrentAppContext';
import ActionButton from '../ActionButton';
import TableActionsWrapper from '../Helpers/Table/TableActionsWrapper';

export interface ProductActionsProps {
	product: BasicProductDto;
}

function ProductActions({ product }: ProductActionsProps) {
	const appContext = useContext(CurrentAppContext);
	const navigate = useNavigate();

	function onClickEdit(event: React.MouseEvent<HTMLButtonElement>) {
		event.stopPropagation();
		navigate(`${appContext.baseUrl}/products/update/${product.id}`);
	}

	function onClickDelete(event: React.MouseEvent<HTMLButtonElement>) {
		event.stopPropagation();
		navigate(`${appContext.baseUrl}/products/delete/${product.id}`);
	}

	return (
		<TableActionsWrapper>
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
				className="text-red-600"
				title="Delete"
			/>
		</TableActionsWrapper>
	);
}
export default ProductActions;
