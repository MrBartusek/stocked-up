import { useParams } from 'react-router-dom';
import useWarehouseDetails from '../../../hooks/useWarehouseDetails';
import GoBackButton from '../../GoBackButton';
import Loader from '../../Loader';
import TableTopBar from '../../TableTopBar';
import WarehouseUpdateForm from '../../Warehouse/WarehouseUpdateForm';

function WarehouseUpdatePage() {
	const { id } = useParams();
	const { warehouse, isLoading, error } = useWarehouseDetails(id);

	return (
		<Loader
			isLoading={isLoading}
			isError={error != undefined}
		>
			<TableTopBar header={`You are updating warehouse: ${warehouse?.name}`}>
				<GoBackButton to={`../view/${warehouse?.id}`} />
			</TableTopBar>
			<WarehouseUpdateForm warehouse={warehouse} />
		</Loader>
	);
}

export default WarehouseUpdatePage;
