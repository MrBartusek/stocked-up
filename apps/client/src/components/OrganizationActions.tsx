import { BsSliders } from 'react-icons/bs';
import { OrganizationDto } from 'shared-types';
import ActionButton from './ActionButton';
import { Link } from 'react-router-dom';

export interface OrganizationSettingsButtonProps {
	organization: OrganizationDto;
}

function OrganizationSettingsButton({ organization }: OrganizationSettingsButtonProps) {
	return (
		<Link to={organization.id + '/settings'}>
			<ActionButton icon={BsSliders} />
		</Link>
	);
}
export default OrganizationSettingsButton;
