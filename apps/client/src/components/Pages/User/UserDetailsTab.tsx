import { Link } from 'react-router-dom';
import IconButton from '../../IconButton';
import { BsPencil } from 'react-icons/bs';
import UserProfileCard from '../../UserProfileCard';

function UserDetailsTab() {
	return (
		<div className="mt-8">
			<h2 className="mb-6 text-3xl">My account</h2>
			<UserProfileCard />
			<div className="py-6">
				<Link
					to="update"
					className="inline-block"
				>
					<IconButton icon={BsPencil}>Edit profile</IconButton>
				</Link>
			</div>
		</div>
	);
}
export default UserDetailsTab;
