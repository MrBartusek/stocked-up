import { BsInfoCircleFill, BsPencilFill, BsTrashFill } from 'react-icons/bs';
import ActionButton from './ActionButton';
import TableActionsWrapper from './TableActionsWrapper';
import { Row } from '@tanstack/react-table';
import Product from '../types/product';

export interface ProductActionsProps {
	row: Row<Product>;
}

function ProductActions({ row }: ProductActionsProps) {
	return (
		<TableActionsWrapper>
			<ActionButton icon={BsInfoCircleFill} className="text-blue-600" />
			<ActionButton icon={BsPencilFill} className="text-primary" />
			<ActionButton icon={BsTrashFill} className="text-red-600" />
		</TableActionsWrapper>
	);
}
export default ProductActions;
