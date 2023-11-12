import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useWarehouseDetails from '../../hooks/useWarehouseDetails';
import { CurrentAppContext } from '../Context/CurrentAppContext';
import EntityInfoTable from '../EntityInfoTable';
import IconButton from '../IconButton';
import Loader from '../Loader';
import { BsCheckCircle } from 'react-icons/bs';
import { Utils } from '../../utils';

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
					'internal ID': warehouse.id,
					name: warehouse.name,
					organization: appContext.organization.name,
					address: warehouse.address,
				}}
				className="mb-8"
			/>
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
		</Loader>
	);
}

export default WarehouseViewPage;
