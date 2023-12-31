import { useContext } from 'react';
import { BsBoxArrowLeft, BsChevronDown, BsExclamationOctagon } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Dropdown from './Dropdown/Dropdown';
import DropdownItem from './Dropdown/DropdownItem';
import DropdownMenu from './Dropdown/DropdownMenu';
import DropdownToggle from './Dropdown/DropdownToggle';
import UserAvatar from './UserAvatar';
import UserSettingsDropdownItem from './UserSettingsDropdownItem';

function UserInfo() {
	const { user, logout } = useContext(UserContext);
	const navigate = useNavigate();

	async function logoutUser() {
		await logout();
		navigate('/');
	}

	return (
		<Dropdown>
			<DropdownToggle className="custom-button-simple flex items-center gap-2">
				<UserAvatar
					user={user}
					variant="circle"
				/>
				<div>{user.email}</div>
				<BsChevronDown />
			</DropdownToggle>
			<DropdownMenu>
				<UserSettingsDropdownItem />
				<Link
					to="https://github.com/MrBartusek/stocked-up/issues"
					target="_blank"
				>
					<DropdownItem
						icon={BsExclamationOctagon}
						externalLink
					>
						Report issue
					</DropdownItem>
				</Link>
				<DropdownItem
					icon={BsBoxArrowLeft}
					onClick={logoutUser}
				>
					Logout
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
}

export default UserInfo;
