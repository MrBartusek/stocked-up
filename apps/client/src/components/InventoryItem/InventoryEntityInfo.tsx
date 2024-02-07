import { useContext } from 'react';
import { BsPencil, BsTagFill, BsTrash } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { InventoryItemDto } from 'shared-types';
import { CurrentAppContext } from '../../context/CurrentAppContext';
import { Utils } from '../../utils/utils';
import EntityActionsRow from '../Entity/EntityActionsRow';
import EntityContainer from '../Entity/EntityContainer';
import EntityImageColumn from '../Entity/EntityImageColumn';
import EntityInfoTable from '../Entity/EntityInfoTable';
import HeaderWithHint from '../HeaderWithHint';
import Blockquote from '../Helpers/Blockquote';
import IconButton from '../IconButton';

export interface InventoryEntityInfoProps {
	inventoryItem: InventoryItemDto;
}

function InventoryEntityInfo({ inventoryItem }: InventoryEntityInfoProps) {
	const appContext = useContext(CurrentAppContext);

	return (
		<EntityContainer>
			<EntityImageColumn image={inventoryItem.image} />
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
						<IconButton icon={BsTagFill}>See product</IconButton>
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
