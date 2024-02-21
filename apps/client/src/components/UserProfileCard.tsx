import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import UserAvatar from './UserAvatar';
import { Link } from 'react-router-dom';
import UserProfileRow from '../UserProfileRow';

function UserProfileCard() {
	const { user } = useContext(UserContext);

	return (
		<div className="my-4 flex flex-col overflow-hidden rounded-md border">
			<div className="flex gap-5 bg-gray-150 p-6">
				<UserAvatar
					user={user}
					variant="circle"
					size={22}
				/>
				<div className="flex flex-col justify-center">
					<div className="text-lg font-semibold">{user.username}</div>
					<div className="text-muted">{user.email}</div>
					{user.isDemo && <div className="text-danger">(Temporary demonstration account)</div>}
				</div>
			</div>
			<div className="flex flex-col gap-4 px-8 py-6">
				<UserProfileRow
					title="Username"
					editButtonTo="update"
				>
					{user.username}
				</UserProfileRow>
				<UserProfileRow
					title="E-mail"
					editButtonTo="change-email"
					action={
						!user.isConfirmed && (
							<Link
								to="confirm-email"
								className="link-primary"
							>
								[Confirm]
							</Link>
						)
					}
				>
					{user.email}
				</UserProfileRow>
				<UserProfileRow title="Internal ID">
					<code>{user.id}</code>
				</UserProfileRow>
			</div>
		</div>
	);
}
export default UserProfileCard;
