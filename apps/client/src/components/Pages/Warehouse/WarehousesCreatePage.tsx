import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrentAppContext } from '../../../context/CurrentAppContext';
import GoBackButton from '../../GoBackButton';
import TableTopBar from '../../TableTopBar';
import WarehouseCreateForm from '../../Warehouse/WarehouseCreateForm';

function WarehousesCreatePage() {
	const appContext = useContext(CurrentAppContext);

	return (
		<div>
			<TableTopBar header={`You are creating warehouse in ${appContext.organization.name}`}>
				<Link to="..">
					<GoBackButton />
				</Link>
			</TableTopBar>
			<WarehouseCreateForm />
		</div>
	);
}

export default WarehousesCreatePage;
