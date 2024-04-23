import { BsSliders } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { OrganizationDto } from 'shared-types';
import ActionButton from '../ActionButton';

export interface OrganizationSettingsButtonProps {
	organization: OrganizationDto;
}

function OrganizationSettingsButton({ organization }: OrganizationSettingsButtonProps) {
	return (
		<Link to={`/dashboard/settings/${organization.id}`}>
			<ActionButton
				icon={BsSliders}
				className="border border-gray-200"
				title="Settings"
			/>
		</Link>
	);
}
export default OrganizationSettingsButton;
