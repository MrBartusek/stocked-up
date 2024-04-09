import { useContext } from 'react';
import {
	BsBoxArrowLeft,
	BsChevronDown,
	BsEnvelopeExclamation,
	BsExclamationOctagon,
	BsPerson,
} from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Badge from '../Badge';
import { UserContext } from '../context/UserContext';
import ConfirmLogoutButton from './ConfirmLogoutButton';
import Dropdown from './Dropdown/Dropdown';
import DropdownItem from './Dropdown/DropdownItem';
import DropdownMenu from './Dropdown/DropdownMenu';
import DropdownToggle from './Dropdown/DropdownToggle';
import UserAvatar from './UserAvatar';
import UserSettingsDropdownItem from './UserSettingsDropdownItem';

function UserInfo() {
	const { user } = useContext(UserContext);

	return (
		<Dropdown>
			<DropdownToggle className="custom-button-simple flex items-center gap-2">
				<UserAvatar
					user={user}
					variant="circle"
					className="hidden sm:block"
				/>
				<div>{user.username}</div>
				{user.isDemo && (
					<Badge>
						<BsPerson />
						Demo
					</Badge>
				)}
				{!user.isConfirmed && (
					<Badge>
						<BsEnvelopeExclamation />
						Unconfirmed
					</Badge>
				)}
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
				<ConfirmLogoutButton className="w-full">
					<DropdownItem icon={BsBoxArrowLeft}>Logout</DropdownItem>
				</ConfirmLogoutButton>
			</DropdownMenu>
		</Dropdown>
	);
}

export default UserInfo;
