import { useParams } from 'react-router-dom';
import WarehouseEntityInfo from '../../../WarehouseEntityInfo';
import useWarehouseDetails from '../../../hooks/useWarehouseDetails';
import Loader from '../../Loader';
import TableTopBar from '../../TableTopBar';
import GoBackButton from '../../GoBackButton';

function WarehouseViewPage() {
	const { id } = useParams();
	const { warehouse, isLoading, error } = useWarehouseDetails(id);

	return (
		<Loader
			isLoading={isLoading}
			isError={error != undefined}
		>
			<TableTopBar header={`You are viewing warehouse: ${warehouse?.name}`}>
				<GoBackButton />
			</TableTopBar>
			<WarehouseEntityInfo warehouse={warehouse} />
		</Loader>
	);
}

export default WarehouseViewPage;
