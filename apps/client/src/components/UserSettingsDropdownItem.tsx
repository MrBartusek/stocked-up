import { BsSliders } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';
import DropdownItem from './Dropdown/DropdownItem';

function UserSettingsDropdownItem() {
	const location = useLocation();
	const isCurrent = location.pathname == '/dashboard/user/me';

	return (
		<Link to="/dashboard/user/me">
			<DropdownItem
				active={isCurrent}
				icon={BsSliders}
			>
				Settings
			</DropdownItem>
		</Link>
	);
}
export default UserSettingsDropdownItem;
