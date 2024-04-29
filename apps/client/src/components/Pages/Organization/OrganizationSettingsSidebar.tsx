import { BsBuildingFill, BsGeoAltFill, BsLink45Deg, BsPersonFill, BsSliders } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import SidebarLink from '../../Sidebar/SidebarLink';
import SidebarSection from '../../Sidebar/SidebarSection';
import { SecurityUtils } from '../../../utils/securityUtils';
import useUserRole from '../../../hooks/useUserRole';

function OrganizationSettingsSidebar() {
	const { id } = useParams();
	const { role } = useUserRole(id!);

	const baseUrl = `/dashboard/settings/${id}`;
	const hasAdmin = role && SecurityUtils.isRoleEnough(role, 'admin');

	return (
		<nav className="my-3 flex flex-1 flex-col gap-5">
			<SidebarSection name="Organization">
				<SidebarLink
					to={`${baseUrl}`}
					icon={BsBuildingFill}
					text="Details"
				/>
				<SidebarLink
					to={`${baseUrl}/warehouses`}
					icon={BsGeoAltFill}
					text="Warehouses"
				/>
				{hasAdmin && (
					<SidebarLink
						to={`${baseUrl}/preferences`}
						icon={BsSliders}
						text="Preferences"
					/>
				)}
			</SidebarSection>
			<SidebarSection name="Members">
				<SidebarLink
					to={`${baseUrl}/members`}
					icon={BsPersonFill}
					text="Members"
				/>
				{hasAdmin && (
					<SidebarLink
						to={`${baseUrl}/members/invite`}
						icon={BsLink45Deg}
						text="Invite"
					/>
				)}
			</SidebarSection>
		</nav>
	);
}

export default OrganizationSettingsSidebar;
