import { BsTrashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { OrganizationDto } from 'shared-types';
import useUserRole from '../../hooks/useUserRole';
import IconButton from '../IconButton';

export interface OrganizationDeleteButtonProps {
	organization: OrganizationDto;
}

function OrganizationDeleteButton({ organization }: OrganizationDeleteButtonProps) {
	const { role } = useUserRole(organization.id);
	const navigate = useNavigate();

	return (
		<IconButton
			variant="danger"
			icon={BsTrashFill}
			disabled={role != 'owner'}
			onClick={() => navigate('delete')}
		>
			Delete organization
		</IconButton>
	);
}
export default OrganizationDeleteButton;
