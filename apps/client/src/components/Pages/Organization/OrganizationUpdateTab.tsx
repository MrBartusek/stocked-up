import { useOutletContext } from 'react-router-dom';
import { OrganizationDto } from 'shared-types';
import HeaderWithHint from '../../HeaderWithHint';
import OrganizationUpdateForm from '../../Organization/OrganizationUpdateForm';

function OrganizationUpdateTab() {
	const organization = useOutletContext<OrganizationDto>();

	return (
		<div>
			<HeaderWithHint
				hint="organization"
				className="mt-8"
			>
				{organization?.name}
			</HeaderWithHint>

			<OrganizationUpdateForm organization={organization} />
		</div>
	);
}
export default OrganizationUpdateTab;
