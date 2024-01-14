import { BsBuildingSlash, BsPlusCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import IconButton from '../IconButton';

function NoOrganizationsInfo() {
	return (
		<div className="flex items-center justify-center px-8 py-32">
			<div className="flex flex-col items-center gap-4">
				<div className="flex flex-col items-center gap-5">
					<div className="text-7xl text-muted">
						<BsBuildingSlash />
					</div>
					<div className="text-2xl">No organizations found!</div>
				</div>
				<p className="max-w-lg text-center text-muted">
					You currently doesn&apos;t have access to any StockedUp organizations. Please wait for
					invite to existing organization or create one yourself.
				</p>
				<Link to="/dashboard/create">
					<IconButton
						icon={BsPlusCircle}
						className="mt-4"
					>
						Create organization
					</IconButton>
				</Link>
			</div>
		</div>
	);
}
export default NoOrganizationsInfo;
