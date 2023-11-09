import { useContext } from 'react';
import {
	BsBoxArrowLeft,
	BsChevronDown,
	BsCode,
	BsCodeSlash,
	BsExclamationOctagon,
	BsSliders,
} from 'react-icons/bs';
import { UserContext } from './Context/UserContext';
import Dropdown from './Dropdown/Dropdown';
import DropdownItem from './Dropdown/DropdownItem';
import DropdownMenu from './Dropdown/DropdownMenu';
import DropdownToggle from './Dropdown/DropdownToggle';
import { Link } from 'react-router-dom';

function UserInfo() {
	const { user } = useContext(UserContext);

	return (
		<Dropdown>
			<DropdownToggle className="custom-button-simple flex items-center gap-2">
				<img
					className="h-6 rounded-full"
					src="https://dokurno.dev/avatar.webp"
				/>
				<div>{user.email}</div>
				<BsChevronDown />
			</DropdownToggle>
			<DropdownMenu>
				<DropdownItem icon={BsSliders}>Settings</DropdownItem>
				<Link
					to="https://github.com/MrBartusek/stocked-up/issues"
					target="_blank"
				>
					<DropdownItem icon={BsExclamationOctagon}>Report issue</DropdownItem>
				</Link>
				<DropdownItem icon={BsBoxArrowLeft}>Logout</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
}

export default UserInfo;
