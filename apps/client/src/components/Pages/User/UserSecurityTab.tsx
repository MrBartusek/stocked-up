import { BsShieldLock } from 'react-icons/bs';
import IconButton from '../../IconButton';
import UserDangerZone from '../../User/UserDangerZone';
import { Link } from 'react-router-dom';

function UserSecurityTab() {
	return (
		<div className="mt-8">
			<h2 className="mb-4 text-3xl">Privacy & Security</h2>
			<p className="mb-6 text-muted">
				Manage options to secure your account and protect your privacy.
			</p>
			<Link to="../change-password">
				<IconButton icon={BsShieldLock}>Change password</IconButton>
			</Link>

			<UserDangerZone />
		</div>
	);
}
export default UserSecurityTab;
