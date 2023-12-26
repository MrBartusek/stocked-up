import { useParams } from 'react-router-dom';
import useWarehouseDetails from '../../../hooks/useWarehouseDetails';
import Loader from '../../Loader';
import WarehouseEntityInfo from '../../WarehouseEntityInfo';

function WarehouseViewPage() {
	const { id } = useParams();
	const { warehouse, isLoading, error } = useWarehouseDetails(id);

	return (
		<Loader
			isLoading={isLoading}
			isError={error != undefined}
		>
			<WarehouseEntityInfo warehouse={warehouse} />
		</Loader>
	);
}

export default WarehouseViewPage;
