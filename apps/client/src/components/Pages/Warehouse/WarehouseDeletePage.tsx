import { useParams } from 'react-router-dom';
import useWarehouseDetails from '../../../hooks/useWarehouseDetails';
import GoBackButton from '../../GoBackButton';
import Loader from '../../Loader';
import TableTopBar from '../../TableTopBar';
import WarehouseDeleteForm from '../../Warehouse/WarehouseDeleteForm';

function WarehouseDeletePage() {
	const { id } = useParams();
	const { warehouse, isLoading, error } = useWarehouseDetails(id);

	return (
		<Loader
			isLoading={isLoading}
			isError={error != undefined}
		>
			<WarehouseDeleteForm warehouse={warehouse} />
		</Loader>
	);
}

export default WarehouseDeletePage;
