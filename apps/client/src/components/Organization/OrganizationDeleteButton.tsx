import { BsTrashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import IconButton from '../IconButton';

function OrganizationDeleteButton() {
	return (
		<Link to="delete">
			<IconButton
				variant="danger"
				icon={BsTrashFill}
			>
				Delete organization
			</IconButton>
		</Link>
	);
}
export default OrganizationDeleteButton;
