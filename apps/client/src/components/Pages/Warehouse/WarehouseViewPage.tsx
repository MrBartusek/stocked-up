import { useContext } from 'react';
import { BsCheckCircle, BsPencil, BsTrash } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import useWarehouseDetails from '../../../hooks/useWarehouseDetails';
import { Utils } from '../../../utils';
import { CurrentAppContext } from '../../Context/CurrentAppContext';
import EntityActionsRow from '../../Entity/EntityActionsRow';
import EntityInfoTable from '../../Entity/EntityInfoTable';
import IconButton from '../../IconButton';
import Loader from '../../Loader';

function WarehouseViewPage() {
	const { id } = useParams();
	const { warehouse, isLoading, error } = useWarehouseDetails(id);
	const appContext = useContext(CurrentAppContext);
	const navigate = useNavigate();

	const isCurrentWarehouse = id == appContext.currentWarehouse.id;

	return (
		<Loader
			isLoading={isLoading}
			isError={error != undefined}
		>
			<div className="mb-12 flex items-center gap-2">
				<h2 className="text-3xl">{warehouse?.name}</h2>
				<span className="text-muted">(warehouse)</span>
			</div>
			<EntityInfoTable
				properties={{
					name: warehouse.name,
					'internal ID': <code>{warehouse.id}</code>,
					organization: appContext.organization.name,
					address: warehouse.address,
				}}
				className="mb-8"
			/>
			<EntityActionsRow>
				<IconButton
					icon={BsCheckCircle}
					disabled={isCurrentWarehouse}
					onClick={() =>
						navigate(`${Utils.dashboardUrl(appContext.organization.id, id!)}/warehouses/`, {
							replace: true,
						})
					}
				>
					{isCurrentWarehouse ? 'This warehouse is already selected' : 'Switch to this warehouse'}
				</IconButton>
				<IconButton
					icon={BsPencil}
					onClick={() => navigate(`../update/${warehouse.id}`)}
				>
					Edit
				</IconButton>
				<IconButton
					icon={BsTrash}
					onClick={() => navigate(`../delete/${warehouse.id}`)}
				>
					Delete
				</IconButton>
			</EntityActionsRow>
		</Loader>
	);
}

export default WarehouseViewPage;
