import { BsBuildingFill, BsGeoAltFill, BsLink45Deg, BsPersonFill, BsSliders } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import SidebarLink from '../../Sidebar/SidebarLink';
import SidebarSection from '../../Sidebar/SidebarSection';

function OrganizationSettingsSidebar() {
	const { id } = useParams();
	const baseUrl = `/dashboard/settings/${id}`;

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
				<SidebarLink
					to={`${baseUrl}/options`}
					icon={BsSliders}
					text="Settings"
				/>
			</SidebarSection>
			<SidebarSection name="Members">
				<SidebarLink
					to={`${baseUrl}/members`}
					icon={BsPersonFill}
					text="Members"
				/>
				<SidebarLink
					to={`${baseUrl}/members/invite`}
					icon={BsLink45Deg}
					text="Invite"
				/>
			</SidebarSection>
		</nav>
	);
}

export default OrganizationSettingsSidebar;
