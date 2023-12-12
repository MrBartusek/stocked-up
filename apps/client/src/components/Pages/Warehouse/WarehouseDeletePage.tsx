import { useParams } from 'react-router-dom';
import useWarehouseDetails from '../../../hooks/useWarehouseDetails';
import Loader from '../../Loader';
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
