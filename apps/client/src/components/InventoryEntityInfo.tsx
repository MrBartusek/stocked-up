import { InventoryItemDto } from 'shared-types';
import EntityContainer from './Entity/EntityContainer';
import EntityImageColumn from './Entity/EntityImageColumn';
import HeaderWithHint from './HeaderWithHint';
import { useContext } from 'react';
import { CurrentAppContext } from './Context/CurrentAppContext';
import { BsEye, BsPencil, BsTagFill, BsTrash } from 'react-icons/bs';
import Blockquote from './Helpers/Blockquote';
import EntityInfoTable from './Entity/EntityInfoTable';
import EntityActionsRow from './Entity/EntityActionsRow';
import { Utils } from '../utils';
import IconButton from './IconButton';
import { Link } from 'react-router-dom';

export interface InventoryEntityInfoProps {
	inventoryItem: InventoryItemDto;
}

function InventoryEntityInfo({ inventoryItem }: InventoryEntityInfoProps) {
	const appContext = useContext(CurrentAppContext);

	return (
		<EntityContainer>
			<EntityImageColumn />
			<div>
				<HeaderWithHint
					hint="inventory item"
					className="mb-2"
				>
					{inventoryItem?.name}
				</HeaderWithHint>

				<div className="mb-8 flex items-center gap-2 text-primary">
					<BsTagFill /> in warehouse: {appContext.currentWarehouse.name}
				</div>

				<Blockquote>{inventoryItem?.description || 'No description provided'}</Blockquote>

				<EntityInfoTable
					properties={{
						name: inventoryItem?.name,
						'internal ID': <code>{inventoryItem?.id}</code>,
						quantity: `${inventoryItem?.quantity} ${inventoryItem?.unit}`,
						location: inventoryItem?.location,
					}}
				/>

				<EntityActionsRow>
					<Link to={Utils.dashboardUrl(appContext) + `/products/view/${inventoryItem?.productId}`}>
						<IconButton icon={BsEye}>See product</IconButton>
					</Link>
					<Link to={`../update/${inventoryItem?.id}`}>
						<IconButton icon={BsPencil}>Update</IconButton>
					</Link>
					<Link to={`../delete/${inventoryItem.id}`}>
						<IconButton icon={BsTrash}>Delete</IconButton>
					</Link>
				</EntityActionsRow>
			</div>
		</EntityContainer>
	);
}
export default InventoryEntityInfo;
