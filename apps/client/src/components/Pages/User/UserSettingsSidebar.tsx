import { BsBoxArrowLeft, BsPersonFill, BsShieldLockFill } from 'react-icons/bs';
import ConfirmLogoutButton from '../../ConfirmLogoutButton';
import SidebarLink from '../../Sidebar/SidebarLink';
import SidebarSection from '../../Sidebar/SidebarSection';

function UserSettingsSidebar() {
	const baseUrl = `/dashboard/user/me`;

	return (
		<nav className="my-3 flex flex-1 flex-col gap-5">
			<SidebarSection name="My account">
				<SidebarLink
					to={`${baseUrl}`}
					icon={BsPersonFill}
					text="My account"
				/>
				<SidebarLink
					to={`${baseUrl}/security`}
					icon={BsShieldLockFill}
					text="Privacy & Security"
				/>
			</SidebarSection>
			<SidebarSection name="Actions">
				<ConfirmLogoutButton>
					<SidebarLink
						to="."
						icon={BsBoxArrowLeft}
						text="Logout"
					/>
				</ConfirmLogoutButton>
			</SidebarSection>
		</nav>
	);
}

export default UserSettingsSidebar;
