import { useContext } from 'react';
import { BsChevronLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { CurrentAppContext } from '../Context/CurrentAppContext';
import IconButton from '../IconButton';
import TableTopBar from '../TableTopBar';
import WarehouseCreateForm from '../WarehouseCreateForm';

function WarehousesCreatePage() {
	const appContext = useContext(CurrentAppContext);

	return (
		<div>
			<TableTopBar header={`You are creating warehouse in ${appContext.organization.name}`}>
				<Link to="..">
					<IconButton icon={BsChevronLeft}>Go back</IconButton>
				</Link>
			</TableTopBar>
			<WarehouseCreateForm />
		</div>
	);
}

export default WarehousesCreatePage;