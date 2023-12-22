import { BsSliders } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { OrganizationDto } from 'shared-types';
import IconButton from './IconButton';

export interface OrganizationSettingsSectionProps {
	organization: OrganizationDto;
}

function OrganizationSettingsSection({ organization }: OrganizationSettingsSectionProps) {
	return (
		<div>
			<h2 className="mb-4 text-2xl">Settings</h2>
			<p className="mb-4 text-muted">Modify organization settings</p>
			<Link to={`../settings/${organization.id}`}>
				<IconButton icon={BsSliders}>Organization settings</IconButton>
			</Link>
		</div>
	);
}
export default OrganizationSettingsSection;
