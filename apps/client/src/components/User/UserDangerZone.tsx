import { BsPersonXFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import IconButton from '../IconButton';

function UserDangerZone() {
	return (
		<div className="mt-8">
			<h2 className="mb-4 text-2xl">Danger Zone</h2>
			<p className="text-muted">Potentially destructive actions, be cautious!</p>
			<div className="mt-6 inline-flex flex-col gap-6">
				<Link to="../delete">
					<IconButton
						variant="danger"
						icon={BsPersonXFill}
					>
						Delete account
					</IconButton>
				</Link>
			</div>
		</div>
	);
}
export default UserDangerZone;
