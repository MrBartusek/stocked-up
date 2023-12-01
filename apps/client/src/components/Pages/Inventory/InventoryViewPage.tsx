import { useContext } from 'react';
import { BsEye, BsPencil, BsTagFill, BsTrash } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import useInventoryItemDetails from '../../../hooks/useInventoryItemDetails';
import { Utils } from '../../../utils';
import { CurrentAppContext } from '../../Context/CurrentAppContext';
import EntityActionsRow from '../../Entity/EntityActionsRow';
import EntityContainer from '../../Entity/EntityContainer';
import EntityImageColumn from '../../Entity/EntityImageColumn';
import EntityInfoTable from '../../Entity/EntityInfoTable';
import HeaderWithHint from '../../HeaderWithHint';
import Blockquote from '../../Helpers/Blockquote';
import IconButton from '../../IconButton';
import Loader from '../../Loader';

function InventoryViewPage() {
	const appContext = useContext(CurrentAppContext);
	const { id } = useParams();
	const navigate = useNavigate();

	const { inventoryItem, isLoading, error } = useInventoryItemDetails(id!);

	return (
		<Loader
			isLoading={isLoading}
			isError={error != undefined}
		>
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
						<IconButton
							icon={BsEye}
							onClick={() =>
								navigate(
									Utils.dashboardUrl(appContext) + `/products/view/${inventoryItem?.productId}`,
								)
							}
						>
							See product
						</IconButton>
						<IconButton
							icon={BsPencil}
							onClick={() => navigate(`../update/${inventoryItem?.id}`)}
						>
							Edit
						</IconButton>
						<IconButton
							icon={BsTrash}
							onClick={() => navigate(`../remove/${inventoryItem.id}`)}
						>
							Remove
						</IconButton>
					</EntityActionsRow>
				</div>
			</EntityContainer>
		</Loader>
	);
}

export default InventoryViewPage;
