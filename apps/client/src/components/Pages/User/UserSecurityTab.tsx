import { BsEnvelopeAt, BsShieldLock } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import IconButton from '../../IconButton';
import UserDangerZone from '../../User/UserDangerZone';

function UserSecurityTab() {
	return (
		<div className="mt-8">
			<h2 className="mb-4 text-3xl">Privacy & Security</h2>
			<p className="mb-6 text-muted">
				Manage options to secure your account and protect your privacy.
			</p>
			<div className="flex gap-4">
				<Link to="../change-password">
					<IconButton icon={BsShieldLock}>Change password</IconButton>
				</Link>
				<Link to="../change-email">
					<IconButton icon={BsEnvelopeAt}>Change E-mail</IconButton>
				</Link>
			</div>

			<UserDangerZone />
		</div>
	);
}
export default UserSecurityTab;
