import { BsSliders } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { OrganizationDto } from 'shared-types';
import ActionButton from '../ActionButton';

export interface OrganizationSettingsButtonProps {
	organization: OrganizationDto;
}

function OrganizationSettingsButton({ organization }: OrganizationSettingsButtonProps) {
	return (
		<Link to={`/dashboard/view/${organization.id}`}>
			<ActionButton icon={BsSliders} />
		</Link>
	);
}
export default OrganizationSettingsButton;
