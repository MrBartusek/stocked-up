import { BsPersonXFill, BsTrashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { OrganizationDto } from 'shared-types';
import IconButton from './IconButton';

export interface OrganizationDangerZoneProps {
	organization: OrganizationDto;
}

function OrganizationDangerZone({ organization }: OrganizationDangerZoneProps) {
	return (
		<div className="mt-8">
			<h2 className="mb-4 text-2xl">Danger Zone</h2>
			<p className="mb-4 text-muted">Potentially destructive actions, be cautious!</p>
			<Link to="delete">
				<IconButton
					variant="danger"
					icon={BsTrashFill}
					className="mt-6"
				>
					Delete organization
				</IconButton>
			</Link>

			<IconButton
				icon={BsPersonXFill}
				variant="danger"
				className="mt-6"
				disabled
			>
				Leave organization
			</IconButton>
		</div>
	);
}
export default OrganizationDangerZone;
