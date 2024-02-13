import { BsPencil } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import IconButton from '../../IconButton';
import UserProfileCard from '../../UserProfileCard';

function UserDetailsTab() {
	return (
		<div className="mt-8">
			<h2 className="mb-6 text-3xl">My account</h2>
			<UserProfileCard />
			<Link
				to="update"
				className="mt-2 inline-block"
			>
				<IconButton icon={BsPencil}>Edit profile</IconButton>
			</Link>
		</div>
	);
}
export default UserDetailsTab;
